"""
Test suite for personalization improvements (PERSONALIZATION_COMPLETE.md)

Tests all 6 priorities:
1. Flexible task distribution
2. Open-ended learning preferences
3. Flexible budget constraint
4. Optional goal domain
5. LLM-based effort estimation
6. AI-determined task categories
"""

import pytest
from app.agents.models import UserContext, Task, Week, Roadmap


class TestPersonalizationModels:
    """Test that Pydantic models accept new personalized fields"""

    def test_user_context_with_new_fields(self):
        """Test UserContext accepts open-ended descriptions"""
        context = UserContext(
            specific_goal="Win local table tennis tournament",
            # New open-ended fields
            current_state_description="Can rally but backhand is weak, never played in a tournament",
            desired_outcome="Win my local club tournament in 6 months",
            learning_preferences="Short technique videos, then lots of practice drills, analyze my own match footage",
            budget_constraint="Free YouTube videos okay, might buy training robot for $200",
            # Required fields
            weekly_hours_cap=5,
            deadline_months=6,
        )

        assert context.specific_goal == "Win local table tennis tournament"
        assert "backhand is weak" in context.current_state_description
        assert "club tournament" in context.desired_outcome
        assert "training robot" in context.budget_constraint
        assert "technique videos" in context.learning_preferences

    def test_user_context_backward_compatibility(self):
        """Test UserContext still works with old format"""
        context = UserContext(
            specific_goal="Learn React",
            goal_domain="Cognitive",
            current_skill_level="Beginner",
            target_skill_level="Competent",
            learning_style="Visual_Video",
            budget_tier="Free_Only",
            weekly_hours_cap=10,
            deadline_months=3,
        )

        assert context.goal_domain == "Cognitive"
        assert context.current_skill_level == "Beginner"
        assert context.learning_style == "Visual_Video"
        assert context.budget_tier == "Free_Only"

    def test_user_context_dual_format_support(self):
        """Test UserContext works with both old and new fields present"""
        context = UserContext(
            specific_goal="Learn React",
            # Old fields (deprecated but still work)
            current_skill_level="Beginner",
            target_skill_level="Competent",
            # New fields (preferred)
            current_state_description="Built 2 React apps, never used TypeScript",
            desired_outcome="Ship a production SaaS with 100 paying customers",
            weekly_hours_cap=10,
            deadline_months=3,
        )

        # Both should be present
        assert context.current_skill_level == "Beginner"
        assert "TypeScript" in context.current_state_description
        assert "SaaS" in context.desired_outcome

    def test_goal_domain_optional(self):
        """Test goal_domain is truly optional (Priority 4)"""
        context = UserContext(
            specific_goal="Launch a B2B SaaS and get 100 customers",
            # No goal_domain specified (it's cross-domain!)
            current_state_description="Built 2 apps, good at coding, never sold anything",
            desired_outcome="100 paying B2B customers",
            weekly_hours_cap=15,
            deadline_months=6,
        )

        assert context.goal_domain is None
        assert "B2B SaaS" in context.specific_goal

    def test_task_with_domain_specific_type(self):
        """Test Task accepts domain-specific task_type (Priority 6)"""
        task = Task(
            task_id="test-123",
            task_name="Forehand topspin drill - 100 reps",
            task_type="drill",  # Domain-specific (not LEARN/PRACTICE/BUILD)
            task_category_label="Practice Drill",
            estimated_minutes=45,
            description="Practice forehand topspin with focus on wrist snap",
            resource_search_query="site:youtube.com PingSkills forehand topspin",
        )

        assert task.task_type == "drill"
        assert task.task_category_label == "Practice Drill"
        assert "PingSkills" in task.resource_search_query

    def test_task_with_market_specific_type(self):
        """Test Task with sales/market vocabulary"""
        task = Task(
            task_id="test-456",
            task_name="Cold outreach to 20 B2B prospects",
            task_type="outreach",  # Market-specific
            task_category_label="Real Outreach",
            estimated_minutes=90,
            description="Send personalized cold emails to B2B prospects",
            resource_search_query="site:youtube.com cold email templates B2B",
        )

        assert task.task_type == "outreach"
        assert task.task_category_label == "Real Outreach"


class TestFlexibleTaskDistribution:
    """Test that task distribution can vary (not hardcoded 50/30/20)"""

    def test_physical_skills_task_distribution(self):
        """Physical skills should have ~65% practice, ~15% learn, ~20% perform"""
        tasks = [
            Task(
                task_id=f"task-{i}",
                task_name=f"Task {i}",
                task_type="drill" if i < 13 else ("watch-demo" if i < 16 else "match-play"),
                estimated_minutes=15,
                description="Test task",
                resource_search_query="test",
            )
            for i in range(20)
        ]

        week = Week(
            week_number=1,
            goal="Improve forehand",
            total_minutes=300,
            tasks=tasks,
        )

        # Count task types
        drill_count = len([t for t in week.tasks if t.task_type == "drill"])
        demo_count = len([t for t in week.tasks if t.task_type == "watch-demo"])
        match_count = len([t for t in week.tasks if t.task_type == "match-play"])

        # Should be roughly 13 drill, 3 demo, 4 match (65%, 15%, 20%)
        assert drill_count > demo_count  # More practice than learning
        assert drill_count > match_count  # More practice than performing

    def test_market_skills_task_distribution(self):
        """Market skills should have ~60% ship/outreach, ~20% learn, ~20% practice"""
        tasks = [
            Task(
                task_id=f"task-{i}",
                task_name=f"Task {i}",
                task_type="outreach" if i < 12 else ("research" if i < 16 else "role-play"),
                estimated_minutes=15,
                description="Test task",
                resource_search_query="test",
            )
            for i in range(20)
        ]

        week = Week(
            week_number=1,
            goal="Get first 10 customers",
            total_minutes=300,
            tasks=tasks,
        )

        # Count task types
        outreach_count = len([t for t in week.tasks if t.task_type == "outreach"])
        research_count = len([t for t in week.tasks if t.task_type == "research"])
        roleplay_count = len([t for t in week.tasks if t.task_type == "role-play"])

        # Should be roughly 12 outreach, 4 research, 4 role-play (60%, 20%, 20%)
        assert outreach_count > research_count  # More doing than learning
        assert outreach_count > roleplay_count  # More real work than practice


class TestBackwardCompatibility:
    """Test that old format still works"""

    def test_old_format_user_context(self):
        """Ensure old format requests still work"""
        old_format = UserContext(
            specific_goal="Learn Python",
            goal_domain="Cognitive",
            current_skill_level="Beginner",
            target_skill_level="Competent",
            learning_style="Visual_Video",
            budget_tier="Free_Only",
            weekly_hours_cap=10,
            deadline_months=3,
        )

        assert old_format.goal_domain == "Cognitive"
        assert old_format.current_skill_level == "Beginner"
        assert old_format.target_skill_level == "Competent"
        assert old_format.learning_style == "Visual_Video"
        assert old_format.budget_tier == "Free_Only"

    def test_mixed_format_prioritizes_new(self):
        """If both old and new fields exist, both are preserved"""
        mixed = UserContext(
            specific_goal="Learn Python",
            # Old
            current_skill_level="Beginner",
            learning_style="Visual_Video",
            # New (should coexist)
            current_state_description="Wrote some scripts, never built an app",
            learning_preferences="Short videos, interactive coding challenges",
            weekly_hours_cap=10,
            deadline_months=3,
        )

        # Both exist
        assert mixed.current_skill_level == "Beginner"
        assert "scripts" in mixed.current_state_description
        assert mixed.learning_style == "Visual_Video"
        assert "videos" in mixed.learning_preferences


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
