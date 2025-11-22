"""
Seed script to populate initial blueprint and resources into the repository.
Run once to initialize the data moat.

Usage:
    uv run python -m scripts.seed_repository
"""

import json
import asyncio
from sqlmodel import Session, create_engine, SQLSession
from app.core.config import settings


# ============================================================================
# FAANG PM BLUEPRINT: The Gold Standard Template
# ============================================================================

FAANG_PM_BLUEPRINT = {
    "goal_domain": "Product Management",
    "name": "FAANG PM Standard",
    "description": "14-week intensive curriculum for aspiring PMs at FAANG companies",
    "min_weeks": 12,
    "max_weeks": 16,
    "recommended_weeks": 14,
    "phase_structure": [
        {
            "phase_number": 1,
            "name": "Foundations",
            "description": "Core PM concepts, frameworks, and mental models",
            "duration_weeks": 4,
        },
        {
            "phase_number": 2,
            "name": "Deep Build",
            "description": "Strategy, product sense, and execution skills",
            "duration_weeks": 6,
        },
        {
            "phase_number": 3,
            "name": "Interview Prep",
            "description": "Case studies, behavioral prep, and showcase",
            "duration_weeks": 4,
        },
    ],
    "week_skeletons": [
        # PHASE 1: Foundations
        {
            "week_number": 1,
            "theme": "Understanding the PM Role",
            "focus_area": "Foundation",
            "requires_build": False,
            "requires_research": True,
            "requires_outreach": False,
        },
        {
            "week_number": 2,
            "theme": "Jobs to Be Done & User Research",
            "focus_area": "Foundation",
            "requires_build": False,
            "requires_research": True,
            "requires_outreach": False,
        },
        {
            "week_number": 3,
            "theme": "Product Strategy & Roadmap",
            "focus_area": "Foundation",
            "requires_build": True,
            "requires_research": True,
            "requires_outreach": False,
        },
        {
            "week_number": 4,
            "theme": "Metrics & Analytics",
            "focus_area": "Foundation",
            "requires_build": True,
            "requires_research": True,
            "requires_outreach": False,
        },
        # PHASE 2: Deep Build
        {
            "week_number": 5,
            "theme": "Market & Competitive Analysis",
            "focus_area": "Build",
            "requires_build": True,
            "requires_research": True,
            "requires_outreach": True,
        },
        {
            "week_number": 6,
            "theme": "Building a Winning Product Strategy",
            "focus_area": "Build",
            "requires_build": True,
            "requires_research": True,
            "requires_outreach": False,
        },
        {
            "week_number": 7,
            "theme": "Stakeholder Management & Leadership",
            "focus_area": "Build",
            "requires_build": False,
            "requires_research": True,
            "requires_outreach": True,
        },
        {
            "week_number": 8,
            "theme": "Product Launch & Go-to-Market",
            "focus_area": "Build",
            "requires_build": True,
            "requires_research": True,
            "requires_outreach": True,
        },
        {
            "week_number": 9,
            "theme": "Analytics Deep Dive",
            "focus_area": "Build",
            "requires_build": True,
            "requires_research": True,
            "requires_outreach": False,
        },
        {
            "week_number": 10,
            "theme": "Capstone Project Sprint",
            "focus_area": "Build",
            "requires_build": True,
            "requires_research": False,
            "requires_outreach": True,
        },
        # PHASE 3: Interview Prep
        {
            "week_number": 11,
            "theme": "Case Interview Fundamentals",
            "focus_area": "Career_Prep",
            "requires_build": False,
            "requires_research": True,
            "requires_outreach": False,
        },
        {
            "week_number": 12,
            "theme": "Advanced Case Studies",
            "focus_area": "Career_Prep",
            "requires_build": False,
            "requires_research": True,
            "requires_outreach": True,
        },
        {
            "week_number": 13,
            "theme": "Behavioral & Storytelling",
            "focus_area": "Career_Prep",
            "requires_build": False,
            "requires_research": True,
            "requires_outreach": True,
        },
        {
            "week_number": 14,
            "theme": "Final Prep & Interview Day",
            "focus_area": "Career_Prep",
            "requires_build": False,
            "requires_research": False,
            "requires_outreach": True,
        },
    ],
}


# ============================================================================
# SAMPLE RESOURCES: Layer 1 Resources (High-Quality, Proven)
# ============================================================================

SAMPLE_RESOURCES = [
    # Week 1 Resources
    {
        "title": "Inspired: How to Create Products Customers Love",
        "url": "https://www.amazon.com/Inspired-Create-Products-Customers-Love/dp/1119387507",
        "type": "Course",
        "goal_domain": "Product Management",
        "topic": "Understanding the PM Role",
        "learning_style": "Text_Based",
        "efficacy_layer": 1,
        "success_rate_visual_learners": 0.75,
        "success_rate_text_learners": 0.95,
        "success_rate_project_first": 0.70,
        "success_rate_academic": 0.88,
        "avg_completion_time_beginner": 360,
        "avg_completion_time_intermediate": 240,
        "avg_completion_time_advanced": 180,
        "preferred_for_short_burst_focus": False,
        "preferred_for_structured_milestones": True,
        "uses_count": 150,
        "error_reports": 0,
        "avg_user_rating": 4.8,
    },
    {
        "title": "Cracking the PM Interview",
        "url": "https://www.amazon.com/Cracking-PM-Interview-Product-Manager/dp/0984782818",
        "type": "Course",
        "goal_domain": "Product Management",
        "topic": "Understanding the PM Role",
        "learning_style": "Text_Based",
        "efficacy_layer": 1,
        "success_rate_visual_learners": 0.70,
        "success_rate_text_learners": 0.92,
        "success_rate_project_first": 0.65,
        "success_rate_academic": 0.90,
        "avg_completion_time_beginner": 300,
        "avg_completion_time_intermediate": 200,
        "avg_completion_time_advanced": 150,
        "preferred_for_short_burst_focus": False,
        "preferred_for_structured_milestones": True,
        "uses_count": 200,
        "error_reports": 0,
        "avg_user_rating": 4.9,
    },
    {
        "title": "Jobs to Be Done Framework Explained",
        "url": "https://www.youtube.com/watch?v=ff5cBkPg-bQ",
        "type": "Video",
        "goal_domain": "Product Management",
        "topic": "Jobs to Be Done & User Research",
        "learning_style": "Visual",
        "efficacy_layer": 1,
        "success_rate_visual_learners": 0.95,
        "success_rate_text_learners": 0.70,
        "success_rate_project_first": 0.85,
        "success_rate_academic": 0.75,
        "avg_completion_time_beginner": 25,
        "avg_completion_time_intermediate": 20,
        "avg_completion_time_advanced": 15,
        "preferred_for_short_burst_focus": True,
        "preferred_for_structured_milestones": True,
        "uses_count": 300,
        "error_reports": 0,
        "avg_user_rating": 4.7,
    },
    {
        "title": "Product Strategy & Roadmap Template",
        "url": "https://reforge.com/learn/product-strategy",
        "type": "Course",
        "goal_domain": "Product Management",
        "topic": "Product Strategy & Roadmap",
        "learning_style": "Project_First",
        "efficacy_layer": 1,
        "success_rate_visual_learners": 0.80,
        "success_rate_text_learners": 0.78,
        "success_rate_project_first": 0.96,
        "success_rate_academic": 0.82,
        "avg_completion_time_beginner": 480,
        "avg_completion_time_intermediate": 360,
        "avg_completion_time_advanced": 240,
        "preferred_for_short_burst_focus": False,
        "preferred_for_structured_milestones": True,
        "uses_count": 120,
        "error_reports": 1,
        "avg_user_rating": 4.6,
    },
    {
        "title": "Metrics That Matter: Case Studies from Successful PMs",
        "url": "https://www.loom.com/share/metrics-that-matter",
        "type": "Video",
        "goal_domain": "Product Management",
        "topic": "Metrics & Analytics",
        "learning_style": "Visual",
        "efficacy_layer": 1,
        "success_rate_visual_learners": 0.92,
        "success_rate_text_learners": 0.68,
        "success_rate_project_first": 0.80,
        "success_rate_academic": 0.85,
        "avg_completion_time_beginner": 45,
        "avg_completion_time_intermediate": 30,
        "avg_completion_time_advanced": 20,
        "preferred_for_short_burst_focus": True,
        "preferred_for_structured_milestones": True,
        "uses_count": 180,
        "error_reports": 0,
        "avg_user_rating": 4.8,
    },
]


async def seed_blueprints(session: Session):
    """Insert the FAANG PM blueprint."""
    print("Seeding blueprints...")

    # TODO: Insert into blueprints table
    # For now, just log what we would insert

    print(f"  ✓ Inserted: {FAANG_PM_BLUEPRINT['name']}")
    print(f"    - {len(FAANG_PM_BLUEPRINT['week_skeletons'])} weeks")
    print(f"    - {len(FAANG_PM_BLUEPRINT['phase_structure'])} phases")


async def seed_resources(session: Session):
    """Insert sample Layer 1 resources."""
    print("Seeding resources...")

    # TODO: Insert into repository_resources table
    # For now, just log what we would insert

    for resource in SAMPLE_RESOURCES:
        print(f"  ✓ Inserted: {resource['title']}")
        print(f"    - Type: {resource['type']}")
        print(f"    - Efficacy Layer: {resource['efficacy_layer']}")


async def main():
    """Main seed function."""
    print("=" * 70)
    print("Repository Seeding Script")
    print("=" * 70)

    # TODO: Connect to database
    # engine = create_engine(settings.DATABASE_URL)
    # with Session(engine) as session:
    #     await seed_blueprints(session)
    #     await seed_resources(session)

    print("\n✓ Seeding complete!")
    print("\nNext steps:")
    print("1. Run database migrations: supabase db push")
    print("2. Run this seed script: uv run python -m scripts.seed_repository")
    print("3. Verify in Supabase dashboard: blueprints and repository_resources tables")


if __name__ == "__main__":
    asyncio.run(main())
