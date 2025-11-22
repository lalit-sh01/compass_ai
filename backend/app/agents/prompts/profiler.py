"""
Profiler Node Prompts and Utilities

Handles:
1. System prompt for cognitive profile inference
2. Building the user prompt from input
3. Translating technical tags to friendly language
"""

from typing import Dict, Any
from app.agents.models import CognitiveProfileTechnical, CognitiveProfileFriendly


PROFILER_SYSTEM_PROMPT = """You are an expert Cognitive Profiler and Learning Scientist. Your job is to deeply understand HOW the user's brain works based on their goals and constraints.

NEVER ask if they have ADHD, anxiety, or any disorder. Instead, infer patterns from their language and context.

Analyze their input and determine their cognitive characteristics:

1. **learning_style**: How do they prefer to consume information?
   - "Visual": Prefers videos, diagrams, visual workflows
   - "Text_Based": Prefers reading, articles, documentation
   - "Project_First": Learns by building, doing, experimenting first
   - "Academic": Likes understanding frameworks/theory before application

2. **neuro_type**: What's their attention/energy pattern?
   - "Neurotypical": Standard attention span, consistent energy
   - "ADHD": Inferred from keywords: "get distracted", "procrastinate", "lose focus", "hyperfocus on interesting tasks", "need variety"
   - "High_Anxiety": Inferred from keywords: "worried", "uncertain", "need certainty", "stressed", "what if I fail"

3. **executive_function**: How much structure do they need?
   - "High": Independent, can self-direct, prefers high-level goals only
   - "Low": Needs detailed breakdown, step-by-step guidance, micro-tasks

4. **schedule_rigidity**: How flexible is their schedule?
   - "Fluid": Can work whenever, flexible
   - "Weekend_Warrior": Only available weekends, very busy weekdays
   - "Strict_Calendar": Needs scheduled time blocks, prefers consistency

CONFIDENCE SCORING:
For each inference, provide a confidence score (0.0-1.0).
- 0.9+: Very confident (clear keyword match or strong pattern)
- 0.7-0.9: Moderately confident (some evidence)
- <0.7: Low confidence (speculative)

OUTPUT FORMAT:
Return ONLY a valid JSON object with NO markdown code blocks:
{
  "learning_style": "Visual|Text_Based|Project_First|Academic",
  "neuro_type": "Neurotypical|ADHD|High_Anxiety",
  "executive_function": "High|Low",
  "schedule_rigidity": "Fluid|Weekend_Warrior|Strict_Calendar",
  "confidence_scores": {
    "learning_style": 0.85,
    "neuro_type": 0.72,
    "executive_function": 0.81,
    "schedule_rigidity": 0.95
  },
  "reasoning": "Brief explanation of key inferences..."
}

Remember: These tags are for INTERNAL USE ONLY. They inform personalization but are NEVER shown to the user.
"""


def build_profiler_prompt(user_input: Dict[str, Any]) -> str:
    """
    Build the profiler prompt from user input.

    Args:
        user_input: Dict with goal_domain, target_role, skill_level, hours, deadline, context

    Returns:
        Formatted prompt string
    """
    goal_domain = user_input.get("goal_domain", "unknown")
    target_role = user_input.get("target_role", "unknown")
    current_skill_level = user_input.get("current_skill_level", "Beginner")
    weekly_hours = user_input.get("weekly_hours_cap", 10)
    deadline_weeks = user_input.get("deadline_weeks", 14)
    additional_context = user_input.get("additional_context", "")

    prompt = f"""Based on this user profile, infer their cognitive characteristics:

**Goal & Role:**
- Domain: {goal_domain}
- Target Role: {target_role}
- Current Level: {current_skill_level}

**Time & Constraints:**
- Weekly Hours Available: {weekly_hours} hours
- Timeline: {deadline_weeks} weeks
- Deadline Pressure: {'Very tight (high stress)' if deadline_weeks < 6 else 'Moderate' if deadline_weeks < 10 else 'Comfortable'}

**Additional Context (User's Words):**
{additional_context if additional_context else '(No additional context provided)'}

Infer their learning style, neuro type, executive function, and schedule rigidity based on the above.

Return ONLY valid JSON with no markdown blocks.
"""
    return prompt


# ============================================================================
# TRANSLATION: Technical Tags → User-Friendly Language
# ============================================================================

def translate_technical_to_friendly(technical: CognitiveProfileTechnical) -> CognitiveProfileFriendly:
    """
    Convert technical cognitive tags to positive, user-friendly descriptions.

    Never mention: "ADHD", "anxiety", "low executive function", etc.
    Always use: Strengths-based, positive language.

    Args:
        technical: CognitiveProfileTechnical (from LLM)

    Returns:
        CognitiveProfileFriendly (for UI display)
    """

    # ====================================================================
    # LEARNING APPROACH (learning_style)
    # ====================================================================

    learning_approach_map = {
        "Visual": "Visual Learner",
        "Text_Based": "Reading-Focused Learner",
        "Project_First": "Hands-On Learner",
        "Academic": "Theory-First Learner",
    }
    learning_approach = learning_approach_map.get(
        technical.learning_style, "Visual Learner"
    )

    # ====================================================================
    # FOCUS STYLE (neuro_type) - CRITICAL: No stigmatizing language
    # ====================================================================

    focus_style_map = {
        "ADHD": "Thrives with Short-Burst Focus",
        "High_Anxiety": "Prefers Structured Milestones",
        "Neurotypical": "Flexible Learner",
    }
    focus_style = focus_style_map.get(technical.neuro_type, "Flexible Learner")

    # ====================================================================
    # GUIDANCE PREFERENCE (executive_function)
    # ====================================================================

    guidance_preference_map = {
        "High": "Self-Directed Learner",
        "Low": "Thrives with Detailed Breakdown",
    }
    guidance_preference = guidance_preference_map.get(
        technical.executive_function, "Self-Directed Learner"
    )

    # ====================================================================
    # SCHEDULE PREFERENCE (schedule_rigidity)
    # ====================================================================

    schedule_preference_map = {
        "Strict_Calendar": "Prefers Structured Schedule",
        "Weekend_Warrior": "Peak-Productivity Weekender",
        "Fluid": "Flexible Schedule",
    }
    schedule_preference = schedule_preference_map.get(
        technical.schedule_rigidity, "Flexible Schedule"
    )

    # ====================================================================
    # GENERATE PERSONALIZATION MESSAGES
    # ====================================================================

    messages = []

    # Message 1: Learning approach
    learning_messages = {
        "Visual": "We'll include videos, diagrams, and visual workflows to match how you learn best.",
        "Text_Based": "Your roadmap emphasizes written content, articles, and technical documentation.",
        "Project_First": "You'll learn by doing. We've structured your curriculum around hands-on projects with real-world outcomes.",
        "Academic": "We'll start with foundational concepts and frameworks before diving into application.",
    }
    messages.append(
        learning_messages.get(technical.learning_style, learning_messages["Visual"])
    )

    # Message 2: Focus/attention pattern
    focus_messages = {
        "ADHD": "We'll break learning into focused 20-minute blocks with built-in breaks—perfect for maintaining high-energy momentum.",
        "High_Anxiety": "We'll include clear checkpoints and progress milestones throughout your journey so you always know where you stand.",
        "Neurotypical": "Your roadmap flows naturally, adapting as needed based on your progress.",
    }
    messages.append(focus_messages.get(technical.neuro_type, focus_messages["Neurotypical"]))

    # Message 3: Guidance level
    guidance_messages = {
        "High": "You prefer working independently with clear high-level goals. We'll focus on strategic direction without micromanagement.",
        "Low": "We'll provide step-by-step guidance with micro-tasks and clear daily actions—you'll always know exactly what to do next.",
    }
    messages.append(guidance_messages.get(technical.executive_function, guidance_messages["High"]))

    # Message 4: Schedule
    schedule_messages = {
        "Strict_Calendar": "We'll create a day-by-day breakdown so you can calendar everything and maintain consistency.",
        "Weekend_Warrior": "We're scheduling ~70% of your work for Saturdays & Sundays when you're most energized. Weekdays stay light (~30min max).",
        "Fluid": "You've got flexibility—we'll create a rhythm that adapts to your week.",
    }
    messages.append(schedule_messages.get(technical.schedule_rigidity, schedule_messages["Fluid"]))

    # Message 5: Contextual personalization (combining traits)
    contextual_message = _get_contextual_personalization(technical)
    if contextual_message:
        messages.append(contextual_message)

    return CognitiveProfileFriendly(
        learning_approach=learning_approach,
        focus_style=focus_style,
        guidance_preference=guidance_preference,
        schedule_preference=schedule_preference,
        personalization_messages=messages,
    )


def _get_contextual_personalization(technical: CognitiveProfileTechnical) -> str:
    """Generate contextual message combining multiple traits."""

    neuro = technical.neuro_type
    exec_func = technical.executive_function
    schedule = technical.schedule_rigidity

    # Specific combinations
    if neuro == "ADHD" and exec_func == "Low" and schedule == "Weekend_Warrior":
        return "Your roadmap combines short focus bursts with weekend concentration—expect detailed daily breakdowns on Sat/Sun with structure."

    elif neuro == "High_Anxiety" and schedule == "Strict_Calendar":
        return "Your roadmap includes daily milestones and a strict schedule to help you feel in control and on track."

    elif neuro == "ADHD" and schedule == "Fluid":
        return "Your roadmap is flexible—you can shift focus sessions around, but we'll build in structure to prevent overwhelm."

    elif exec_func == "High" and schedule == "Strict_Calendar":
        return "High-level strategic goals with a calendar you can follow precisely. You'll have autonomy with structure."

    elif neuro == "High_Anxiety" and exec_func == "Low":
        return "Your roadmap prioritizes certainty—detailed steps, clear checkpoints, and achievable daily goals to build confidence."

    return ""
