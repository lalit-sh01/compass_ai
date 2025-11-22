"""
Node C: The Curator (Creative Layer)
Generates granular, time-boxed tasks with strict adherence to Volume Rule.
Model: GPT-4o (High Context/Coding) - will be swapped to Claude 3.5 Sonnet later
"""

from typing import Dict, Any, List
from app.agents.models import UserContext, StrategyBrief, Task, Week, Roadmap
from app.core.llm import call_openai_json
from app.core.config import get_settings
from openai import AsyncOpenAI
import json
import uuid


CURATOR_SYSTEM_PROMPT = """You are The Domain Curator, an expert instructional designer.

**Input:** `StrategyBrief` (approved), `UserContext`.

**Mandate:**
Generate the detailed `Roadmap` JSON. You must fill the user's `weekly_hours_cap` with time-boxed, granular tasks. This is non-negotiable: every minute of the user's available time must be allocated.

**Resource Authority Protocol (CRITICAL):**
You are FORBIDDEN from generating URLs or guessing link addresses. Your task is to provide precise, high-authority search query strings that the Python Enricher tool will execute.

**Query Construction Rules:**
1. **Identify the Authority:** Use your internal knowledge base of best-in-class instructional resources. For example:
   - YouTube: PingSkills (table tennis), Traversy Media (web dev), 3Blue1Brown (math)
   - Docs: developer.mozilla.org (web), docs.python.org (Python), official TypeScript docs
   - Platforms: LeetCode, HackerRank, Udemy (specific high-rated courses)

2. **Format:** The query must be restrictive to maximize quality filtering. Use platform-specific filters:
   - *Example (Bad):* "how to hit a forehand"
   - *Example (Good, targeting authority):* "site:youtube.com PingSkills forehand topspin"
   - *Example (Good, targeting documentation):* "site:developer.mozilla.org CSS flexbox tutorial"
   - *Example (Good, targeting course):* "Udemy React Hooks Andrew Mead"

**Volume Rule (Adherence to Capacity):**
The sum of `estimated_minutes` for all tasks in a given week MUST be within the defined `weekly_hours_cap` (converted to minutes).

Algorithm:
1. Convert `weekly_hours_cap` to minutes: `total_weekly_minutes = weekly_hours_cap * 60`
2. For each week, ensure: Sum(task.estimated_minutes) == total_weekly_minutes (±5% tolerance)
3. Task Distribution - DETERMINE OPTIMAL MIX based on goal type (do NOT use generic 50/30/20):

   **Physical Skills** (sports, music, dance, manual skills):
   - LEARN (10-20%): Watch demonstrations, study technique
   - PRACTICE (60-70%): Drills, repetitive practice, muscle memory
   - BUILD/PERFORM (20-30%): Matches, recitals, real-world application

   **Cognitive Skills** (programming, math, languages):
   - LEARN (40-50%): Study concepts, read documentation, watch tutorials
   - PRACTICE (30-40%): Exercises, problem sets, coding challenges
   - BUILD (20-30%): Projects, implementations, portfolios

   **Market Skills** (sales, marketing, networking, content creation):
   - LEARN (15-25%): Study frameworks, analyze examples
   - PRACTICE (20-30%): Role-play, mock scenarios, drafts
   - BUILD/SHIP (50-60%): Real conversations, published content, live campaigns

   **Progression Over Time** (adjust throughout roadmap):
   - Early weeks (Foundation): More LEARN, less BUILD
   - Middle weeks (Growth): Balanced distribution
   - Final weeks (Mastery): Less LEARN, more BUILD/SHIP

   **Adjust for User Context**:
   - Low weekly hours (< 10h): Favor passive LEARN tasks
   - High weekly hours (> 20h): Favor active BUILD tasks
   - Beginner skill level: More LEARN
   - Advanced skill level: More BUILD

4. If capacity is under-filled, ADD tasks matching the dominant category for this goal type.
5. If capacity is over-filled, REDUCE the least critical category for this goal type.

**Output:** Complete `Roadmap` JSON with the following structure:

CRITICAL: The "phases" array contains objects where THE KEY IS THE PHASE NAME (not a field called "phase_name").
Phase names must be personalized to the user's goal (e.g., "React Fundamentals" for React, "Forehand Basics" for tennis).

{
  "roadmap_title": str,
  "total_duration_weeks": int,
  "phases": [
    {
      "<DYNAMIC_PHASE_NAME>": [
        {
          "week_number": int,
          "goal": str,
          "total_minutes": int,
          "tasks": [
            {
              "task_id": str (UUID),
              "task_name": str,
              "task_type": str (domain-specific category - see guidelines below),
              "task_category_label": str (human-readable label for UI),
              "estimated_minutes": int,
              "description": str,
              "resource_search_query": str (AUTHORITY-BASED),
              "resource_url": null,
              "resource_title": null,
              "resource_author": null,
              "quality_score": null,
              "quality_warning": null
            }
          ]
        }
      ]
    }
  ]
}

**Example (for "Learn React" goal):**
{
  "roadmap_title": "React Mastery Roadmap",
  "total_duration_weeks": 12,
  "phases": [
    {"React Fundamentals": [...]},
    {"Hooks & State Management": [...]},
    {"Advanced Patterns & Performance": [...]}
  ]
}

**Example (for "Table Tennis Forehand" goal):**
{
  "roadmap_title": "Table Tennis Forehand Development",
  "total_duration_weeks": 8,
  "phases": [
    {"Grip & Stance Basics": [...]},
    {"Swing Mechanics & Footwork": [...]},
    {"Spin Control & Match Play": [...]}
  ]
}

**Task Category Guidelines (CRITICAL - Do NOT use generic LEARN/PRACTICE/BUILD):**

Determine optimal task categories based on the goal domain. Use vocabulary familiar to practitioners in that domain.

**Cognitive Skills** (programming, languages, math, design):
- "learn" / "Learn Concept" - Study theory, watch tutorials, read documentation
- "practice" / "Practice Exercise" - Coding challenges, problem sets, exercises
- "build" / "Build Project" - Create something real, implement features
- "review" / "Review & Refine" - Code review, refactoring, debugging
- "ship" / "Deploy & Share" - Publish to production, share publicly

**Physical Skills** (sports, music, dance, manual skills):
- "watch-demo" / "Watch Demonstration" - Study technique videos, analyze form
- "shadow-practice" / "Shadow Practice" - Practice movements without equipment
- "drill" / "Practice Drill" - Repetitive practice with equipment/instrument
- "scrimmage" / "Practice Match" - Simulated game/performance scenarios
- "perform" / "Real Performance" - Actual match, recital, live performance
- "analyze-footage" / "Analyze Recording" - Review own performance videos

**Market Skills** (sales, marketing, content creation, networking):
- "research" / "Market Research" - Study examples, analyze competitors
- "script" / "Create Script/Draft" - Write sales scripts, content drafts, emails
- "role-play" / "Practice Conversation" - Mock scenarios, practice pitches
- "outreach" / "Real Outreach" - Actual cold calls, emails, messages
- "publish" / "Publish Content" - Post articles, videos, social media
- "close" / "Close Deal" - Actual sales conversations, negotiations
- "analyze-metrics" / "Analyze Results" - Review analytics, conversion rates

Choose 3-5 task types that best fit THIS SPECIFIC GOAL and use them consistently throughout the roadmap.

**Critical Constraints:**
- Phase names MUST be goal-specific and descriptive (NOT generic like "Phase 1" or "Foundation")
- NEVER hallucinate URLs. Leave resource_url, resource_title, resource_author, quality_score, quality_warning as null
- Each task_id MUST be a unique UUID
- All estimated_minutes MUST be positive integers
- Total_minutes per week MUST equal weekly_hours_cap * 60 (±5% tolerance)
- Task descriptions MUST be actionable and specific
- Resource search queries MUST follow Authority Protocol (site: filters, known expert names)
"""


def generate_task_id() -> str:
    """Generate a unique task ID."""
    return str(uuid.uuid4())


def calculate_total_weekly_minutes(weekly_hours_cap: int) -> int:
    """Convert weekly hours cap to minutes."""
    return weekly_hours_cap * 60


async def process(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Node C: Curator

    Takes StrategyBrief (from Gap Analyst) and UserContext.
    Generates complete Roadmap with granular tasks.

    Input:
    - strategy_brief: StrategyBrief (approved)
    - user_context: UserContext (from Inquisitor)

    Output:
    - roadmap: Roadmap with all tasks (resource URLs empty for Enricher to fill)
    """

    strategy_brief: StrategyBrief = state.get("strategy_brief")
    user_context: UserContext = state.get("user_context")

    if not strategy_brief or not user_context:
        raise ValueError("Strategy Brief and User Context required for Curator")

    print(f"\n{'='*70}")
    print(f"NODE C: CURATOR")
    print(f"{'='*70}")
    print(f"Generating roadmap for: {user_context.specific_goal}")
    print(f"  Status: {strategy_brief.status}")
    print(f"  Duration: {user_context.deadline_months} months")
    print(f"  Capacity: {user_context.weekly_hours_cap} hours/week")

    # Build the context for Claude
    context_prompt = f"""
**UserContext:**
{json.dumps(user_context.model_dump(), indent=2)}

**StrategyBrief (Approved):**
{json.dumps(strategy_brief.model_dump(exclude_none=True), indent=2)}

Now generate the complete Roadmap JSON following all constraints specified in the system prompt.

Key reminders:
1. Calculate total weeks: {user_context.deadline_months} months ≈ {user_context.deadline_months * 4} weeks
2. Each week must have exactly {calculate_total_weekly_minutes(user_context.weekly_hours_cap)} minutes of tasks (±5% tolerance)
3. Task distribution: ANALYZE the goal "{user_context.specific_goal}" and determine optimal LEARN/PRACTICE/BUILD mix:
   - Physical skills → 10-20% LEARN, 60-70% PRACTICE, 20-30% BUILD/PERFORM
   - Cognitive skills → 40-50% LEARN, 30-40% PRACTICE, 20-30% BUILD
   - Market skills → 15-25% LEARN, 20-30% PRACTICE, 50-60% BUILD/SHIP
   - Adjust for skill level: {user_context.current_skill_level} (beginners need more LEARN)
   - Adjust for capacity: {user_context.weekly_hours_cap}h/week (low hours → more passive LEARN)
   - Progress over time: Early weeks more LEARN, final weeks more BUILD
4. FORBIDDEN: Generate URLs. Only provide resource_search_query with site: filters and authority names.
5. Every task_id must be a unique UUID.

Output ONLY the Roadmap JSON, nothing else.
"""

    print(f"  Requesting roadmap generation from OpenAI...")

    # Create OpenAI client
    settings = get_settings()
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    # Call OpenAI to generate the Roadmap
    full_response = ""
    try:
        # Using GPT-4o for now - will be swapped to Claude 3.5 Sonnet later
        full_response = await call_openai_json(
            client=client,
            system_prompt=CURATOR_SYSTEM_PROMPT,
            user_prompt=context_prompt,
            model="gpt-4o",
            temperature=0.7,
            max_tokens=8000,
        )

        # Parse the JSON response
        if isinstance(full_response, str):
            roadmap_data = json.loads(full_response)
        else:
            roadmap_data = full_response

        # Validate the roadmap structure
        roadmap = Roadmap(**roadmap_data)

        print(f"✓ Roadmap generated successfully!")
        print(f"  Title: {roadmap.roadmap_title}")
        print(f"  Total weeks: {roadmap.total_duration_weeks}")
        print(f"  Phases: {len(roadmap.phases)}")

        # Verify Volume Rule compliance (basic check)
        total_weekly_minutes = calculate_total_weekly_minutes(user_context.weekly_hours_cap)
        tolerance = total_weekly_minutes * 0.05

        for phase_dict in roadmap.phases:
            for phase_name, weeks in phase_dict.items():
                for week in weeks:
                    week_total = sum(task.estimated_minutes for task in week.tasks)
                    if not (total_weekly_minutes - tolerance <= week_total <= total_weekly_minutes + tolerance):
                        print(
                            f"  ⚠ Week {week.week_number}: {week_total} minutes "
                            f"(expected {total_weekly_minutes}±{tolerance:.0f})"
                        )

        return {
            "roadmap": roadmap,
            "strategy_brief": strategy_brief,
            "user_context": user_context,
        }

    except json.JSONDecodeError as e:
        print(f"✗ JSON parsing failed: {str(e)}")
        raise ValueError(f"Curator failed to generate valid Roadmap JSON: {str(e)}")
    except Exception as e:
        print(f"✗ Roadmap generation failed: {str(e)}")
        raise ValueError(f"Curator error: {str(e)}")
