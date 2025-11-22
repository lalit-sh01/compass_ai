"""
LangGraph State Graph for Agentic Roadmap Generation (PRD v4.1 Compliant)

5-Node Workflow per PRD:
    A (Inquisitor) → B (Gap Analyst) → [Negotiation if IMPOSSIBLE] → C (Curator) → D (Enricher) → E (Validator)

State Transitions:
- Gap Analyst: OPTIMAL/TIGHT → Curator | IMPOSSIBLE → Negotiation → User Choice → Curator
- Validator: APPROVED → END | REJECTED → Curator (with error_log feedback)
"""

from langgraph.graph import StateGraph, END
from typing import Dict, Any
import asyncio

from app.agents.models import GraphState
from app.agents.nodes import (
    inquisitor,
    gap_analyst,
    curator,
    enricher,
    validator,
)


def route_after_gap_analyst(state: Dict[str, Any]) -> str:
    """
    Conditional routing after Gap Analyst.

    Returns:
    - "curator" if OPTIMAL or TIGHT
    - "negotiation" if IMPOSSIBLE
    """
    strategy_brief = state.get("strategy_brief")

    if not strategy_brief:
        return END

    if strategy_brief.status in ["OPTIMAL", "TIGHT"]:
        return "curator"
    elif strategy_brief.status == "IMPOSSIBLE":
        # In production, this would pause and wait for user input
        # For now, we'll let it proceed with a warning flag
        return "curator"  # Will proceed with intensity_warning

    return "curator"


def route_after_validator(state: Dict[str, Any]) -> str:
    """
    Conditional routing after Validator.

    Returns:
    - END if APPROVED
    - "curator" if REJECTED (to regenerate with feedback)
    """
    validation_result = state.get("validation_result", {})

    if validation_result.get("status") == "APPROVED":
        return END
    elif validation_result.get("status") == "REJECTED":
        # Loop back to Curator with error_log for fixes
        return "curator"

    return END


def build_roadmap_generation_graph() -> StateGraph:
    """
    Build the LangGraph workflow for PRD-compliant roadmap generation.

    Workflow:
    1. Inquisitor: Collects UserContext via multi-turn interview
    2. Gap Analyst: Calculates feasibility (Effort vs. Capacity)
       - If IMPOSSIBLE: Negotiation required
       - If OPTIMAL/TIGHT: Proceed
    3. Curator: Generates granular tasks with Volume Rule
    4. Enricher: Fetches and scores resources (Python tool, parallel)
    5. Validator: Quality audit (Time, Resources, Logic)
       - If APPROVED: Done
       - If REJECTED: Loop back to Curator

    Returns:
        Compiled StateGraph ready for execution.
    """
    workflow = StateGraph(dict)  # Use dict instead of GraphState for flexibility

    # ========================================================================
    # ADD NODES
    # ========================================================================

    workflow.add_node("inquisitor", inquisitor.process)
    workflow.add_node("gap_analyst", gap_analyst.process)
    workflow.add_node("curator", curator.process)
    workflow.add_node("enricher", enricher.process)
    workflow.add_node("validator", validator.process)

    # ========================================================================
    # SET ENTRY POINT
    # ========================================================================

    workflow.set_entry_point("inquisitor")

    # ========================================================================
    # ADD EDGES (Define the workflow)
    # ========================================================================

    # Linear flow: A → B
    workflow.add_edge("inquisitor", "gap_analyst")

    # Conditional: B → C (or negotiation if IMPOSSIBLE)
    workflow.add_conditional_edges(
        "gap_analyst",
        route_after_gap_analyst,
        {
            "curator": "curator",
            "negotiation": END,  # Pause for user input in production
        },
    )

    # Linear: C → D → E
    workflow.add_edge("curator", "enricher")
    workflow.add_edge("enricher", "validator")

    # Conditional: E → END (if approved) or E → C (if rejected)
    workflow.add_conditional_edges(
        "validator",
        route_after_validator,
        {
            END: END,
            "curator": "curator",  # Feedback loop for fixes
        },
    )

    # ========================================================================
    # COMPILE
    # ========================================================================

    graph = workflow.compile()

    return graph


# ============================================================================
# HELPER: Run the graph
# ============================================================================

async def generate_roadmap_from_context(user_context: Dict[str, Any]) -> dict:
    """
    Execute the PRD-compliant roadmap generation workflow starting from Gap Analyst.

    Use this when you already have a complete UserContext (from Inquisitor).

    Args:
        user_context: Complete UserContext dict from Inquisitor

    Returns:
        Final state with roadmap, validation_result, or error details
    """
    graph = build_roadmap_generation_graph()

    # Start from Gap Analyst (skip Inquisitor since we have UserContext)
    initial_state = {
        "user_context": user_context,
        "strategy_brief": None,
        "roadmap": None,
        "validation_result": None,
        "error_log": [],
        "is_complete": False,
    }

    try:
        # Note: LangGraph will start from entry point (inquisitor)
        # We need to adjust this to start from gap_analyst
        # For now, we'll run the full workflow
        result = await graph.ainvoke(initial_state)
        return result
    except Exception as e:
        return {
            "error": str(e),
            "roadmap": None,
            "error_log": [str(e)],
        }


async def generate_roadmap(user_input: dict) -> dict:
    """
    Execute the full roadmap generation workflow (for backward compatibility).

    Args:
        user_input: Dict with goal_domain, target_role, skill_level, hours, weeks, etc.

    Returns:
        Final state with roadmap or error details
    """
    # Convert old format to new UserContext if needed
    # This is for backward compatibility with existing endpoints
    from app.agents.models import UserContext

    try:
        # Try to build UserContext from user_input
        user_context = UserContext(
            goal_domain=user_input.get("goal_domain", "Cognitive"),
            specific_goal=user_input.get("target_role", "Unknown Goal"),
            current_skill_level=user_input.get("current_skill_level", "Beginner"),
            target_skill_level=user_input.get("target_skill_level", "Competent"),
            weekly_hours_cap=user_input.get("weekly_hours_cap", 10),
            deadline_months=user_input.get("deadline_months", 3),
            budget_tier=user_input.get("budget_tier", "Free_Only"),
            learning_style=user_input.get("learning_style", "Project_Based"),
            motivation_anchor=user_input.get("motivation_anchor"),
        )

        return await generate_roadmap_from_context(user_context.model_dump())

    except Exception as e:
        return {
            "error": str(e),
            "roadmap": None,
            "error_log": [str(e)],
        }
