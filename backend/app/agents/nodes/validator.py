"""
Node E: The Validator (Quality Layer)
Final quality control audit before releasing the roadmap.
Model: GPT-4o-mini (Pattern Matching)
"""

from typing import Dict, Any, List, Optional
from app.agents.models import UserContext, Roadmap, Task
from app.core.llm import call_openai_json
import json


VALIDATOR_SYSTEM_PROMPT = """You are The Validator. You function as the final unit test script for the roadmap JSON.

**Input:** `Roadmap` (Enriched with URLs) and `UserContext`.

**Validation Checklist:**

1. **Time Audit (Rigorous):** Sum `estimated_minutes` for every week. Is it within +/-10% of the `weekly_hours_cap` converted to minutes?
   - If NO: Return Error "Week X is underloaded/overloaded."

2. **Quality Audit (Semantic Review):** Check `quality_warning` flags.
   - If `quality_warning` == "LOW_CONFIDENCE": You must perform a semantic check on the resource.
   - Check if the resource_title and resource_author make sense for the task.
   - *Example Error:* "Resource quality failed for Task Y. Search query 'tennis footwork' returned a golf video."
   - If the resource seems valid despite low confidence score, you may approve it with a note.

3. **Prerequisite Logic:** Ensure the logical flow is sound (e.g., no 'Advanced TensorFlow' in Week 1 for a beginner).
   - Check that tasks build progressively within phases.
   - Check that LEARN tasks precede PRACTICE tasks for the same concept.

4. **Completeness Check:** Ensure all tasks have required fields:
   - task_id, task_name, task_type, estimated_minutes, description must all be present
   - resource_search_query must be present
   - At least 80% of tasks should have resource_url populated (some may legitimately fail)

**Output:**
- If Pass: Return {"status": "APPROVED", "feedback": "All checks passed."}
- If Fail: Return {"status": "REJECTED", "feedback": "Detailed list of issues found", "issues": [list of specific issues]}

When you identify issues, be SPECIFIC. Include:
- Week number
- Task name
- Exact problem
- Suggested fix

Output ONLY valid JSON, nothing else.
"""


async def process(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Node E: Validator

    Final quality control audit of the enriched roadmap.

    Input:
    - roadmap: Roadmap (enriched with URLs)
    - user_context: UserContext
    - strategy_brief: StrategyBrief

    Output:
    - validation_result: Dict with status (APPROVED/REJECTED) and feedback
    - If APPROVED: roadmap is final
    - If REJECTED: error_log contains specific issues for Curator to fix
    """

    roadmap: Roadmap = state.get("roadmap")
    user_context: UserContext = state.get("user_context")
    strategy_brief = state.get("strategy_brief")

    if not roadmap or not user_context:
        raise ValueError("Roadmap and User Context required for Validator")

    print(f"\n{'='*70}")
    print(f"NODE E: VALIDATOR")
    print(f"{'='*70}")
    print(f"Validating roadmap: {roadmap.roadmap_title}")

    # Perform automated checks first
    automated_issues = []

    # CHECK 1: Time Audit
    weekly_minutes_expected = user_context.weekly_hours_cap * 60
    tolerance = weekly_minutes_expected * 0.10  # 10% tolerance

    for phase_dict in roadmap.phases:
        for phase_name, weeks in phase_dict.items():
            for week in weeks:
                week_total = sum(task.estimated_minutes for task in week.tasks)
                lower_bound = weekly_minutes_expected - tolerance
                upper_bound = weekly_minutes_expected + tolerance

                if week_total < lower_bound:
                    automated_issues.append(
                        f"Week {week.week_number} ({phase_name}): UNDERLOADED - "
                        f"{week_total} minutes (expected {weekly_minutes_expected}±{tolerance:.0f})"
                    )
                elif week_total > upper_bound:
                    automated_issues.append(
                        f"Week {week.week_number} ({phase_name}): OVERLOADED - "
                        f"{week_total} minutes (expected {weekly_minutes_expected}±{tolerance:.0f})"
                    )

    # CHECK 2: Resource Completeness
    total_tasks = 0
    tasks_with_urls = 0
    low_confidence_tasks = []

    for phase_dict in roadmap.phases:
        for phase_name, weeks in phase_dict.items():
            for week in weeks:
                for task in week.tasks:
                    total_tasks += 1
                    if task.resource_url:
                        tasks_with_urls += 1
                    if task.quality_warning == "LOW_CONFIDENCE":
                        low_confidence_tasks.append((week.week_number, task.task_name, task))

    resource_completion_rate = (tasks_with_urls / total_tasks * 100) if total_tasks > 0 else 0

    if resource_completion_rate < 80:
        automated_issues.append(
            f"Resource completion rate: {resource_completion_rate:.1f}% (expected >80%)"
        )

    # CHECK 3: Completeness Check (required fields)
    for phase_dict in roadmap.phases:
        for phase_name, weeks in phase_dict.items():
            for week in weeks:
                for task in week.tasks:
                    if not task.task_id:
                        automated_issues.append(f"Week {week.week_number}: Task missing task_id")
                    if not task.task_name:
                        automated_issues.append(f"Week {week.week_number}: Task missing task_name")
                    if not task.estimated_minutes or task.estimated_minutes <= 0:
                        automated_issues.append(
                            f"Week {week.week_number}, Task '{task.task_name}': Invalid estimated_minutes"
                        )

    # If automated checks fail significantly, reject immediately
    if len(automated_issues) > 5:
        print(f"  ✗ REJECTED: {len(automated_issues)} critical automated issues found")
        for issue in automated_issues[:10]:
            print(f"    - {issue}")

        return {
            "validation_result": {
                "status": "REJECTED",
                "feedback": f"Roadmap failed automated validation with {len(automated_issues)} issues.",
                "issues": automated_issues
            },
            "error_log": automated_issues,
            "roadmap": roadmap,
            "user_context": user_context,
            "strategy_brief": strategy_brief,
        }

    # If we have low confidence tasks, perform LLM semantic review
    if low_confidence_tasks:
        print(f"  Performing semantic review for {len(low_confidence_tasks)} LOW_CONFIDENCE tasks...")

        # Build context for LLM review
        review_context = f"""
**UserContext:**
Goal: {user_context.specific_goal}
Domain: {user_context.goal_domain}
Skill Level: {user_context.current_skill_level} → {user_context.target_skill_level}

**Roadmap Overview:**
Title: {roadmap.roadmap_title}
Duration: {roadmap.total_duration_weeks} weeks

**Low Confidence Tasks Requiring Review:**
"""

        for week_num, task_name, task in low_confidence_tasks[:10]:  # Limit to 10 for token efficiency
            review_context += f"""
Week {week_num}: {task_name}
- Type: {task.task_type}
- Description: {task.description}
- Resource Query: {task.resource_search_query}
- Resource Found: {task.resource_title or 'NONE'} by {task.resource_author or 'UNKNOWN'}
- Quality Score: {task.quality_score}

"""

        review_context += """
For each task above, determine if the resource is acceptable despite the low confidence score.
Consider:
1. Does the resource title match the task intent?
2. Is the author/source relevant to the topic?
3. Is the resource search query well-formed?

Identify specific tasks that have genuinely bad resources (wrong topic, irrelevant author, or no resource found).
"""

        try:
            llm_review = await call_openai_json(
                system_prompt=VALIDATOR_SYSTEM_PROMPT,
                user_prompt=review_context,
                model="gpt-4o-mini",
                temperature=0.3,
                max_tokens=2000,
            )

            if isinstance(llm_review, str):
                llm_review = json.loads(llm_review)

            # Merge LLM issues with automated issues
            if llm_review.get("status") == "REJECTED":
                automated_issues.extend(llm_review.get("issues", []))

        except Exception as e:
            print(f"  ⚠ LLM review failed: {str(e)}")
            # Continue with automated checks only

    # Final decision
    if automated_issues:
        print(f"  ✗ REJECTED: {len(automated_issues)} issues found")
        for issue in automated_issues[:10]:
            print(f"    - {issue}")

        return {
            "validation_result": {
                "status": "REJECTED",
                "feedback": f"Roadmap validation failed with {len(automated_issues)} issues.",
                "issues": automated_issues
            },
            "error_log": automated_issues,
            "roadmap": roadmap,
            "user_context": user_context,
            "strategy_brief": strategy_brief,
        }
    else:
        print(f"  ✓ APPROVED: All validation checks passed!")
        print(f"    Total tasks: {total_tasks}")
        print(f"    Resource completion: {resource_completion_rate:.1f}%")
        print(f"    Low confidence tasks reviewed: {len(low_confidence_tasks)}")

        return {
            "validation_result": {
                "status": "APPROVED",
                "feedback": "All validation checks passed. Roadmap is ready for delivery."
            },
            "roadmap": roadmap,
            "user_context": user_context,
            "strategy_brief": strategy_brief,
            "is_complete": True,  # Signal that workflow is done
        }
