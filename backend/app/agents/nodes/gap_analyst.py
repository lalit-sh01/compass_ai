"""
Node B: The Gap Analyst (Logic Layer)
Evaluates fundamental feasibility and identifies negotiation paths.
Model: GPT-4o (High Reasoning) - will be swapped to Claude 3.5 Sonnet later
"""

from typing import Dict, Any, List, Optional
from app.agents.models import UserContext, StrategyBrief
from app.core.llm import call_openai_json
from app.core.config import get_settings
from openai import AsyncOpenAI
import json


GAP_ANALYST_SYSTEM_PROMPT = """You are The Gap Analyst, a strict feasibility architect. Your primary function is mathematical.

**Input:** `UserContext` JSON.

**Algorithm:**
1. **Effort Estimation:** Based on `current_skill` -> `target_skill`, estimate the `Required_Effort` hours.
   - Beginner→Competent: ~200-400 hours
   - Beginner→Proficient: ~500-800 hours
   - Beginner→Master: ~1000-2000 hours
   - Intermediate→Competent: ~100-200 hours
   - Intermediate→Proficient: ~300-500 hours
   - Intermediate→Master: ~800-1200 hours
   - Advanced→Competent: ~50-100 hours
   - Advanced→Proficient: ~200-300 hours
   - Advanced→Master: ~500-800 hours
   Add 20% buffer for real-world setbacks.

2. **Capacity Calculation:** `User_Capacity` = `weekly_hours_cap` * 4 * `deadline_months`

3. **Feasibility Check:** This comparison determines the next state transition:
   - If `Required` > `Capacity` * 1.2: Status = IMPOSSIBLE (High Risk of Burnout)
   - If `Required` > `Capacity` * 1.0: Status = TIGHT (Achievable only with perfect adherence)
   - Else: Status = OPTIMAL

**Negotiation Logic:**
If Status is IMPOSSIBLE, you must halt execution and provide precise `negotiation_options`:
- Option A (Time): "Extend deadline to X months to fit the curriculum."
- Option B (Scope): "Reduce target goal to [Intermediate Level] to fit the timeline."

**Output:** JSON object with:
{
  "status": "OPTIMAL|TIGHT|IMPOSSIBLE",
  "required_effort_hours": int,
  "user_capacity_hours": int,
  "discrepancy_percentage": float (if > 100%),
  "negotiation_options": [{
    "choice": "extend_time|reduce_scope",
    "description": "...",
    "extended_months": int (if time option),
    "reduced_target": str (if scope option)
  }]
}"""


def estimate_effort_hours(
    current_level: str,
    target_level: str,
    goal_domain: Optional[str] = None
) -> int:
    """
    Estimate required hours based on skill progression.

    NOTE: This uses a simplified matrix for backward compatibility.
    For more accurate estimates, the Gap Analyst LLM should analyze
    the specific_goal directly instead of relying on categorization.
    """
    # Base effort estimates (simplified baseline)
    effort_matrix = {
        "Beginner": {
            "Competent": 300,
            "Proficient": 650,
            "Master": 1500
        },
        "Intermediate": {
            "Competent": 150,
            "Proficient": 400,
            "Master": 1000
        },
        "Advanced": {
            "Competent": 75,
            "Proficient": 250,
            "Master": 650
        }
    }

    base_effort = effort_matrix.get(current_level, {}).get(target_level, 500)

    # Optional domain multiplier (deprecated - defaults to 1.0 if not provided)
    domain_multiplier = 1.0
    if goal_domain:
        domain_multiplier = {
            "Cognitive": 1.0,
            "Physical": 1.2,
            "Market": 1.1
        }.get(goal_domain, 1.0)

    # Add 20% buffer for setbacks
    total_effort = int(base_effort * domain_multiplier * 1.2)
    return total_effort


async def estimate_effort_via_llm(
    user_context: UserContext
) -> int:
    """
    Use LLM (GPT-4o) to estimate required effort hours based on open-ended descriptions.

    This provides much more accurate estimates than the hardcoded matrix because:
    - Analyzes actual current state vs desired outcome
    - Considers domain-specific learning curves
    - Accounts for nuance (e.g., "built 2 React apps" is different from "read one tutorial")
    """

    estimation_prompt = f"""You are an expert learning scientist and skill acquisition analyst.

**Task**: Estimate the total hours required for this learner to achieve their goal.

**Current State**: {user_context.current_state_description or 'Beginner level'}
**Desired Outcome**: {user_context.desired_outcome or user_context.specific_goal}
**Specific Goal**: {user_context.specific_goal}

**Analysis Guidelines**:
1. Consider the actual skill gap (not just Beginner/Advanced labels)
2. Account for domain-specific learning curves:
   - Physical skills (sports, music): Require more practice time, slower progress
   - Cognitive skills (programming, languages): Faster initial learning, plateaus later
   - Market skills (sales, networking): High variance, external factors matter
3. Add 20-30% buffer for:
   - Setbacks and plateaus
   - Review and reinforcement
   - Real-world application struggles
4. Be realistic - most people overestimate what they can learn in 3 months

**Output**: JSON with ONLY these fields:
{{
  "required_effort_hours": int,
  "reasoning": str (2-3 sentences explaining the estimate)
}}

Examples:
- "Learn Python basics" (never coded) → 300-400 hours
- "Build production SaaS" (2 apps experience) → 400-600 hours
- "Win local tennis tournament" (can rally) → 200-300 hours
- "Get first 10 B2B customers" (never sold) → 400-500 hours
"""

    try:
        settings = get_settings()
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

        result = await call_openai_json(
            client=client,
            system_prompt="You are a learning scientist specializing in skill acquisition time estimation.",
            user_prompt=estimation_prompt,
            model="gpt-4o",
            temperature=0.3,  # Lower temperature for consistent estimates
            max_tokens=500
        )

        if isinstance(result, str):
            result = json.loads(result)

        estimated_hours = result.get("required_effort_hours", 500)
        reasoning = result.get("reasoning", "LLM estimation")

        print(f"  LLM Estimate: {estimated_hours} hours")
        print(f"  Reasoning: {reasoning}")

        return estimated_hours

    except Exception as e:
        print(f"  ⚠ LLM estimation failed: {str(e)}")
        print(f"  Falling back to matrix estimation")
        # Fall back to matrix if LLM fails
        return estimate_effort_hours(
            user_context.current_skill_level or "Beginner",
            user_context.target_skill_level or "Competent",
            user_context.goal_domain
        )


async def process(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Node B: Gap Analyst

    Evaluates feasibility of the goal and provides negotiation options if needed.

    Input:
    - user_context: Complete UserContext from Node A

    Output:
    - strategy_brief: StrategyBrief with status and negotiation options
    """

    user_context: UserContext = state.get("user_context")

    if not user_context:
        raise ValueError("User context required for Gap Analyst")

    print(f"\n{'='*70}")
    print(f"NODE B: GAP ANALYST")
    print(f"{'='*70}")
    print(f"Analyzing feasibility...")
    print(f"  Goal: {user_context.specific_goal}")

    # STEP 1: Estimate required effort
    # Use LLM-based estimation if user provided open-ended descriptions
    if user_context.current_state_description or user_context.desired_outcome:
        print(f"  Using LLM-based effort estimation (open-ended descriptions provided)")
        print(f"  Current: {user_context.current_state_description or 'Not specified'}")
        print(f"  Desired: {user_context.desired_outcome or user_context.specific_goal}")
        required_effort_hours = await estimate_effort_via_llm(user_context)
    else:
        # Fall back to matrix-based estimation
        print(f"  Using matrix-based estimation (legacy mode)")
        print(f"  Current: {user_context.current_skill_level} → Target: {user_context.target_skill_level}")
        required_effort_hours = estimate_effort_hours(
            user_context.current_skill_level or "Beginner",
            user_context.target_skill_level or "Competent",
            user_context.goal_domain
        )
        print(f"  Required effort: {required_effort_hours} hours")

    # STEP 2: Calculate user capacity
    user_capacity_hours = (
        user_context.weekly_hours_cap * 4 * user_context.deadline_months
    )
    print(f"  User capacity: {user_capacity_hours} hours ({user_context.weekly_hours_cap}h/week × 4 weeks × {user_context.deadline_months} months)")

    # STEP 3: Feasibility check
    buffer_120_percent = user_capacity_hours * 1.2
    discrepancy_percentage = None
    negotiation_options = None
    status = "OPTIMAL"

    if required_effort_hours > buffer_120_percent:
        status = "IMPOSSIBLE"
        discrepancy_percentage = round((required_effort_hours / user_capacity_hours - 1) * 100, 1)
        print(f"  ✗ IMPOSSIBLE: Need {discrepancy_percentage}% more hours")

        # Generate negotiation options
        negotiation_options = []

        # Option A: Extend deadline
        months_needed = (required_effort_hours / user_context.weekly_hours_cap) / 4
        extended_months = int(months_needed) + 1
        if extended_months > user_context.deadline_months:
            negotiation_options.append({
                "option": "extend_deadline",
                "description": f"Extend deadline from {user_context.deadline_months} months to {extended_months} months for a comfortable pace"
            })

        # Option B: Reduce scope
        if user_context.target_skill_level != "Competent":
            negotiation_options.append({
                "option": "reduce_scope",
                "description": f"Reduce target from {user_context.target_skill_level} to Competent to fit within {user_context.deadline_months} months"
            })

    elif required_effort_hours > user_capacity_hours:
        status = "TIGHT"
        discrepancy_percentage = round((required_effort_hours / user_capacity_hours - 1) * 100, 1)
        print(f"  ⚠ TIGHT: Need {discrepancy_percentage}% more hours (achievable with perfect adherence)")

    else:
        print(f"  ✓ OPTIMAL: Goal is achievable with comfortable margin")

    strategy_brief = StrategyBrief(
        status=status,
        required_effort_hours=required_effort_hours,
        user_capacity_hours=user_capacity_hours,
        discrepancy_percentage=discrepancy_percentage,
        negotiation_options=negotiation_options
    )

    print(f"  Status: {status}")

    return {
        "strategy_brief": strategy_brief,
        "user_context": user_context  # Pass through for next nodes
    }
