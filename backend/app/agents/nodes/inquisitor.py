"""
Node A: The Inquisitor (Interaction Layer)
Conducts dynamic, adaptive multi-turn interview to populate UserContext.
Model: GPT-4o-mini (Low Cost)
"""

from typing import Dict, Any, Optional, List
from app.agents.models import UserContext, InquisitorMessage
from app.core.llm import stream_openai_text
import json


INQUISITOR_SYSTEM_PROMPT = """You are The Inquisitor, an advanced diagnostic agent.

**Objective:** Conduct a dynamic, adaptive interview to populate the `UserContext` schema.

**Operating Procedure:**
1. **Analyze State:** Look at the current `UserContext` JSON. Identify which fields are still null/missing.
2. **Formulate Question:** Ask ONE concise question to fill the most critical missing field.
   - *Constraint 1:* Do not ask for everything at once.
   - *Constraint 2:* If the user provides a vague goal (e.g., "I want to learn AI"), probe deeper with follow-ups.
   - *Constraint 3:* Infer `learning_style` or `motivation_anchor` from their language patterns.
3. **Constraint Verification:** If a user gives a conflicting answer (e.g., "Expert level" but "newbie"), clarify.
4. **Termination:** When all fields in `UserContext` are filled and valid, output ONLY the final UserContext JSON (no text).

**Tone:** Professional, encouraging, concise. Adapt to the domain (e.g., energetic for sports, analytical for tech).

**Required Fields in UserContext:**
- specific_goal (str): The user's exact learning objective - be as specific as possible
- goal_domain (Optional[str]): You MAY infer this (Cognitive/Physical/Market) but it's not required
- current_state_description (str): Ask "What's your current level?" and capture their FULL response
  Examples: "Built 2 React apps, comfortable with hooks and state, never used TypeScript"
  "Can rally in table tennis but my backhand is weak, never played in a tournament"
  "Managed a team of 5, never hired before"
  DO NOT force into Beginner/Intermediate/Advanced - capture exactly what they say
- desired_outcome (str): Ask "What do you want to achieve?" and capture their FULL response
  Examples: "Ship a production SaaS with auth, payments, and 100 paying customers"
  "Win my local table tennis club tournament"
  "Get promoted to Senior PM at my company"
  More specific than just "Competent/Proficient/Master"
- weekly_hours_cap (int)
- deadline_months (int)
- budget_constraint (str): Ask "What's your budget for learning resources?" and capture their FULL response
  Examples: "Only free resources", "$100/month maximum", "My company will pay for courses", "I have a $500 one-time budget"
  DO NOT force into 3 tiers - capture exactly what they say
- learning_preferences (str): Ask "How do you prefer to learn?" and capture their FULL response
  Examples: "Videos for concepts, docs for deep dives", "Podcasts while commuting, interactive exercises at desk", "Hands-on projects, skip theory"
  DO NOT force into 3 categories - capture exactly what they say
- motivation_anchor (Optional[str])

When complete, output ONLY valid JSON matching UserContext schema."""


def build_initial_question() -> str:
    """Opening question from The Inquisitor."""
    return """Hello! I'm The Inquisitor, and I'm here to understand your learning goal and design a personalized roadmap.

Let's start simple: **What's the main skill or goal you want to master?**
(e.g., "Learn React", "Get better at tennis", "Understand cryptocurrency")"""


def build_inquisitor_context(conversation_history: List[InquisitorMessage], user_context: Optional[UserContext] = None) -> str:
    """
    Build the context prompt that includes conversation history.
    Used to keep the agent aware of previous exchanges.
    """
    context_parts = ["## Conversation So Far:\n"]
    for msg in conversation_history:
        context_parts.append(f"{msg.role.upper()}: {msg.content}\n")

    if user_context:
        context_parts.append("\n## Current UserContext Fields Collected:\n")
        context_dict = user_context.model_dump(exclude_none=True)
        for field, value in context_dict.items():
            context_parts.append(f"- {field}: {value}\n")

        # Identify missing fields
        all_fields = {
            "goal_domain", "specific_goal", "current_skill_level",
            "target_skill_level", "weekly_hours_cap", "deadline_months",
            "budget_tier", "learning_style", "motivation_anchor"
        }
        missing = all_fields - set(context_dict.keys())
        if missing:
            context_parts.append(f"\n## Still Need: {', '.join(missing)}\n")

    return "".join(context_parts)


async def process(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Node A: Inquisitor

    Takes conversation history, generates next question or returns complete UserContext.

    Input:
    - conversation_history: List of previous messages
    - user_context: Partially-filled UserContext (may be None initially)

    Output:
    - assistant_message: Next question OR complete UserContext JSON
    - user_context: Updated UserContext (if complete)
    - is_complete: Boolean indicating if interview is finished
    """

    conversation_history = state.get("conversation_history", [])
    user_context = state.get("user_context")

    # Build context for the LLM
    context_prompt = build_inquisitor_context(conversation_history, user_context)

    # Stream response from GPT-4o-mini
    full_response = ""
    async for chunk in stream_openai_text(
        system_prompt=INQUISITOR_SYSTEM_PROMPT,
        user_prompt=context_prompt,
        model="gpt-4o-mini",
        temperature=0.8,
        max_tokens=1500,
    ):
        full_response += chunk

    print(f"\n{'='*70}")
    print(f"NODE A: INQUISITOR")
    print(f"{'='*70}")
    print(f"Inquisitor response: {full_response[:200]}...")

    # Try to parse as JSON (indicates interview complete)
    try:
        json_response = json.loads(full_response)
        if "goal_domain" in json_response:
            # This is a complete UserContext
            try:
                complete_context = UserContext(**json_response)
                print(f"✓ Interview complete!")
                print(f"  Goal: {complete_context.specific_goal}")
                print(f"  Deadline: {complete_context.deadline_months} months")
                print(f"  Capacity: {complete_context.weekly_hours_cap} hours/week")

                return {
                    "user_context": complete_context,
                    "assistant_message": full_response,
                    "is_interview_complete": True
                }
            except Exception as e:
                print(f"✗ JSON parsing error: {str(e)}")
                # Not valid UserContext, treat as question
                return {
                    "user_context": user_context,
                    "assistant_message": full_response,
                    "is_interview_complete": False
                }
    except json.JSONDecodeError:
        # Not JSON, treat as question
        pass

    # Response is a question, not complete yet
    return {
        "user_context": user_context,
        "assistant_message": full_response,
        "is_interview_complete": False
    }
