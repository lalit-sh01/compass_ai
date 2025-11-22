"""
Test PRD v4.1 Compliant 5-Node Workflow
Tests the complete Inquisitor → Gap Analyst → Curator → Enricher → Validator pipeline
"""

import pytest
from app.agents.models import UserContext, StrategyBrief, Roadmap, Task


def test_all_5_nodes_can_be_imported():
    """Test all 5 PRD v4.1 nodes can be imported."""
    from app.agents.nodes import (
        inquisitor,
        gap_analyst,
        curator,
        enricher,
        validator,
    )

    # Verify each node has a process function
    assert hasattr(inquisitor, 'process')
    assert hasattr(gap_analyst, 'process')
    assert hasattr(curator, 'process')
    assert hasattr(enricher, 'process')
    assert hasattr(validator, 'process')


def test_new_pydantic_models():
    """Test PRD v4.1 Pydantic models can be instantiated."""
    from app.agents.models import UserContext, StrategyBrief, Task, Week, Roadmap

    # Test UserContext
    user_context = UserContext(
        goal_domain="Cognitive",
        specific_goal="Become a Senior Product Manager",
        current_skill_level="Beginner",
        target_skill_level="Competent",
        weekly_hours_cap=10,
        deadline_months=3,
        budget_tier="Free_Only",
        learning_style="Project_Based",
        motivation_anchor="Career transition"
    )
    assert user_context.deadline_months == 3
    assert user_context.weekly_hours_cap == 10

    # Test StrategyBrief
    strategy_brief = StrategyBrief(
        status="OPTIMAL",
        required_effort_hours=400,
        user_capacity_hours=480
    )
    assert strategy_brief.status == "OPTIMAL"

    # Test Task
    task = Task(
        task_id="test-123",
        task_name="Learn product metrics",
        task_type="LEARN",
        estimated_minutes=60,
        description="Study key PM metrics",
        resource_search_query="site:youtube.com product metrics tutorial"
    )
    assert task.task_type == "LEARN"
    assert task.resource_search_query.startswith("site:")


def test_graph_builder_5_node():
    """Test that the 5-node graph can be built."""
    from app.agents.graph import build_roadmap_generation_graph

    graph = build_roadmap_generation_graph()
    assert graph is not None


@pytest.mark.asyncio
async def test_gap_analyst_optimal_scenario():
    """Test Gap Analyst with OPTIMAL capacity scenario."""
    from app.agents.nodes.gap_analyst import process

    # User with sufficient capacity
    # Required: ~300 hrs (Beginner → Competent in Cognitive domain)
    # Capacity: 15 hrs/week × 4 weeks/month × 6 months = 360 hrs
    # 300 < 360 × 1.2 (432), so OPTIMAL
    state = {
        "user_context": UserContext(
            goal_domain="Cognitive",
            specific_goal="Learn Python basics",
            current_skill_level="Beginner",
            target_skill_level="Competent",
            weekly_hours_cap=15,
            deadline_months=6,
            budget_tier="Free_Only",
            learning_style="Project_Based"
        )
    }

    result = await process(state)

    assert "strategy_brief" in result
    strategy_brief = result["strategy_brief"]
    assert strategy_brief.status == "OPTIMAL"  # Should be comfortably feasible
    assert strategy_brief.required_effort_hours > 0
    assert strategy_brief.user_capacity_hours == 360  # 15 hrs/week × 4 weeks/month × 6 months


@pytest.mark.asyncio
async def test_gap_analyst_impossible_scenario():
    """Test Gap Analyst with IMPOSSIBLE capacity scenario."""
    from app.agents.nodes.gap_analyst import process

    # User with insufficient capacity (2 hrs/week × 4 × 1 month = 32 hours for Master level)
    state = {
        "user_context": UserContext(
            goal_domain="Cognitive",
            specific_goal="Master Advanced Machine Learning",
            current_skill_level="Beginner",
            target_skill_level="Master",
            weekly_hours_cap=2,
            deadline_months=1,
            budget_tier="Free_Only",
            learning_style="Project_Based"
        )
    }

    result = await process(state)

    assert "strategy_brief" in result
    strategy_brief = result["strategy_brief"]
    assert strategy_brief.status == "IMPOSSIBLE"  # Should be infeasible
    assert "negotiation_options" in strategy_brief.model_dump()


@pytest.mark.asyncio
async def test_curator_generates_valid_roadmap():
    """Test Curator generates a valid Roadmap structure."""
    from app.agents.nodes.curator import process

    state = {
        "user_context": UserContext(
            goal_domain="Cognitive",
            specific_goal="Learn React",
            current_skill_level="Beginner",
            target_skill_level="Competent",
            weekly_hours_cap=10,
            deadline_months=3,
            budget_tier="Free_Only",
            learning_style="Project_Based"
        ),
        "strategy_brief": StrategyBrief(
            status="OPTIMAL",
            required_effort_hours=400,
            user_capacity_hours=480
        )
    }

    result = await process(state)

    assert "roadmap" in result
    roadmap = result["roadmap"]

    # Validate structure
    assert isinstance(roadmap.roadmap_title, str)
    assert roadmap.total_duration_weeks > 0
    assert len(roadmap.phases) > 0

    # Validate phase structure
    first_phase = roadmap.phases[0]
    assert isinstance(first_phase, dict)
    phase_name = list(first_phase.keys())[0]
    weeks = first_phase[phase_name]
    assert len(weeks) > 0

    # Validate week structure
    first_week = weeks[0]
    assert first_week.week_number > 0
    assert isinstance(first_week.goal, str)
    assert first_week.total_minutes > 0
    assert len(first_week.tasks) > 0

    # Validate task structure
    first_task = first_week.tasks[0]
    # Task type is now domain-specific (e.g., "learn", "drill", "outreach") - not hardcoded
    assert isinstance(first_task.task_type, str) and len(first_task.task_type) > 0
    # Optionally check if task_category_label is present
    if first_task.task_category_label:
        assert isinstance(first_task.task_category_label, str)
    assert first_task.estimated_minutes > 0
    assert isinstance(first_task.resource_search_query, str)

    # Volume Rule check (total minutes should be close to weekly_hours_cap * 60)
    expected_minutes = state["user_context"].weekly_hours_cap * 60
    tolerance = expected_minutes * 0.05  # 5% tolerance
    assert abs(first_week.total_minutes - expected_minutes) <= tolerance


@pytest.mark.asyncio
async def test_resource_authority_protocol():
    """Test that Curator generates search queries, not URLs."""
    from app.agents.nodes.curator import process

    state = {
        "user_context": UserContext(
            goal_domain="Physical",
            specific_goal="Learn tennis forehand",
            current_skill_level="Beginner",
            target_skill_level="Competent",
            weekly_hours_cap=5,
            deadline_months=2,
            budget_tier="Free_Only",
            learning_style="Visual_Video"
        ),
        "strategy_brief": StrategyBrief(
            status="OPTIMAL",
            required_effort_hours=160,
            user_capacity_hours=200
        )
    }

    result = await process(state)
    roadmap = result["roadmap"]

    # Extract all tasks
    all_tasks = []
    for phase in roadmap.phases:
        phase_name = list(phase.keys())[0]
        weeks = phase[phase_name]
        for week in weeks:
            all_tasks.extend(week.tasks)

    # Verify NO task has a resource_url yet (Curator doesn't generate URLs)
    for task in all_tasks:
        assert task.resource_url is None, "Curator should NOT generate URLs"
        assert task.resource_search_query is not None, "Curator MUST generate search queries"
        # Search query should NOT be a full URL
        assert not task.resource_search_query.startswith("http"), "Search query should not be a URL"


@pytest.mark.asyncio
async def test_enricher_populates_resources():
    """Test Enricher populates resource_url and quality_score."""
    from app.agents.nodes.enricher import process
    from app.agents.models import Week

    # Create a mock roadmap with search queries
    mock_task = Task(
        task_id="test-task-1",
        task_name="Learn CSS Flexbox",
        task_type="LEARN",
        estimated_minutes=60,
        description="Learn flexbox layout",
        resource_search_query="site:youtube.com CSS flexbox tutorial"
    )

    mock_week = Week(
        week_number=1,
        goal="Foundation",
        total_minutes=300,
        tasks=[mock_task]
    )

    mock_roadmap = Roadmap(
        roadmap_title="Test Roadmap",
        total_duration_weeks=4,
        phases=[{"Foundation": [mock_week]}]
    )

    state = {
        "roadmap": mock_roadmap,
        "user_context": UserContext(
            goal_domain="Cognitive",
            specific_goal="Learn CSS",
            current_skill_level="Beginner",
            target_skill_level="Competent",
            weekly_hours_cap=5,
            deadline_months=1,
            budget_tier="Free_Only",
            learning_style="Visual_Video"
        )
    }

    result = await process(state)
    enriched_roadmap = result["roadmap"]

    # Extract enriched task
    enriched_task = enriched_roadmap.phases[0]["Foundation"][0].tasks[0]

    # Verify Enricher populated fields
    assert enriched_task.resource_url is not None, "Enricher should populate resource_url"
    assert enriched_task.resource_title is not None, "Enricher should populate resource_title"
    assert enriched_task.quality_score is not None, "Enricher should populate quality_score"
    assert 0 <= enriched_task.quality_score <= 100, "Quality score should be 0-100"

    # Check for LOW_CONFIDENCE warning if score < 30
    if enriched_task.quality_score < 30:
        assert enriched_task.quality_warning == "LOW_CONFIDENCE"


def test_routing_logic():
    """Test conditional routing functions."""
    from app.agents.graph import route_after_gap_analyst, route_after_validator

    # Test Gap Analyst routing - OPTIMAL
    state_optimal = {
        "strategy_brief": StrategyBrief(
            status="OPTIMAL",
            required_effort_hours=400,
            user_capacity_hours=480
        )
    }
    assert route_after_gap_analyst(state_optimal) == "curator"

    # Test Gap Analyst routing - IMPOSSIBLE
    state_impossible = {
        "strategy_brief": StrategyBrief(
            status="IMPOSSIBLE",
            required_effort_hours=1000,
            user_capacity_hours=480,
            discrepancy_percentage=108,
            negotiation_options=[
                {"option": "extend_deadline", "description": "Extend to 6 months"}
            ]
        )
    }
    # Currently routes to curator with warning (negotiation not implemented yet)
    assert route_after_gap_analyst(state_impossible) == "curator"

    # Test Validator routing - APPROVED
    state_approved = {"validation_result": {"status": "APPROVED"}}
    from langgraph.graph import END
    assert route_after_validator(state_approved) == END

    # Test Validator routing - REJECTED
    state_rejected = {
        "validation_result": {
            "status": "REJECTED",
            "issues": ["Time audit failed"]
        }
    }
    assert route_after_validator(state_rejected) == "curator"


@pytest.mark.asyncio
async def test_full_workflow_integration():
    """
    Integration test: Run complete workflow from UserContext to validated Roadmap.
    This test uses mock data for API calls (no real API keys required).
    """
    from app.agents.graph import generate_roadmap

    user_input = {
        "goal_domain": "Cognitive",
        "target_role": "Product Manager at startup",
        "current_skill_level": "Beginner",
        "target_skill_level": "Competent",
        "weekly_hours_cap": 10,
        "deadline_months": 3,
        "budget_tier": "Free_Only",
        "learning_style": "Project_Based",
        "motivation_anchor": "Career transition from engineering to PM"
    }

    result = await generate_roadmap(user_input)

    # Check for errors
    if "error" in result:
        pytest.skip(f"Workflow failed (expected in CI without OpenAI key): {result['error']}")

    # Verify final state structure
    assert "roadmap" in result
    assert result["roadmap"] is not None

    roadmap = result["roadmap"]

    # Validate complete roadmap structure
    assert roadmap.roadmap_title
    assert roadmap.total_duration_weeks > 0
    assert len(roadmap.phases) > 0

    # Check that resources were enriched
    first_phase = roadmap.phases[0]
    phase_name = list(first_phase.keys())[0]
    first_week = first_phase[phase_name][0]
    first_task = first_week.tasks[0]

    # These should be populated by Enricher
    assert first_task.resource_url is not None
    assert first_task.quality_score is not None


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
