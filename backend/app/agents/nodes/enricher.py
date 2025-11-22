"""
Node D: The Enricher (Tool Layer - Python)
Executes search queries in parallel and populates resource URLs.
This is a PYTHON TOOL, not an LLM.
"""

import asyncio
from typing import Dict, Any
from app.agents.models import Roadmap, Task
from app.agents.tools.quality_resource_fetcher import QualityResourceFetcher, get_quality_warning


async def process(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Node D: Enricher

    Takes Roadmap with resource_search_query strings from Curator.
    Executes parallel searches and populates resource URLs with quality scores.

    Input:
    - roadmap: Roadmap (with empty resource URLs)
    - user_context: UserContext (for goal_domain)

    Output:
    - roadmap: Roadmap (with populated resource URLs and quality scores)
    """

    roadmap: Roadmap = state.get("roadmap")
    user_context = state.get("user_context")

    if not roadmap or not user_context:
        raise ValueError("Roadmap and User Context required for Enricher")

    print(f"\n{'='*70}")
    print(f"NODE D: ENRICHER (Python Tool)")
    print(f"{'='*70}")
    print(f"Enriching resources for roadmap: {roadmap.roadmap_title}")

    # Initialize QualityResourceFetcher with goal domain
    fetcher = QualityResourceFetcher(goal_domain=user_context.goal_domain)

    # Collect all tasks that need enrichment
    tasks_to_enrich = []
    for phase_dict in roadmap.phases:
        for phase_name, weeks in phase_dict.items():
            for week in weeks:
                for task in week.tasks:
                    if task.resource_search_query and not task.resource_url:
                        tasks_to_enrich.append(task)

    print(f"  Found {len(tasks_to_enrich)} tasks needing resource enrichment")

    # Execute searches in parallel (with concurrency limit)
    semaphore = asyncio.Semaphore(5)  # Limit to 5 concurrent searches

    async def enrich_task(task: Task):
        async with semaphore:
            try:
                print(f"  Fetching: {task.task_name[:50]}...")
                resource_data, quality_score = await fetcher.fetch_and_score(
                    task.resource_search_query,
                    top_k=5
                )

                if resource_data:
                    task.resource_url = resource_data["resource_url"]
                    task.resource_title = resource_data["resource_title"]
                    task.resource_author = resource_data["resource_author"]
                    task.quality_score = quality_score
                    task.quality_warning = get_quality_warning(quality_score)

                    if task.quality_warning:
                        print(f"    ⚠ LOW_CONFIDENCE: {task.task_name[:40]} (score: {quality_score:.1f})")
                    else:
                        print(f"    ✓ Found: {task.resource_title[:50]} (score: {quality_score:.1f})")
                else:
                    print(f"    ✗ No resources found for: {task.task_name[:40]}")
                    task.quality_warning = "LOW_CONFIDENCE"
                    task.quality_score = 0.0

            except Exception as e:
                print(f"    ✗ Error fetching resource for {task.task_name[:40]}: {str(e)}")
                task.quality_warning = "LOW_CONFIDENCE"
                task.quality_score = 0.0

    # Run all enrichment tasks in parallel
    await asyncio.gather(*[enrich_task(task) for task in tasks_to_enrich])

    # Count results
    enriched_count = sum(1 for task in tasks_to_enrich if task.resource_url)
    low_confidence_count = sum(1 for task in tasks_to_enrich if task.quality_warning == "LOW_CONFIDENCE")

    print(f"\n  Enrichment complete:")
    print(f"    Total tasks: {len(tasks_to_enrich)}")
    print(f"    Successfully enriched: {enriched_count}")
    print(f"    Low confidence warnings: {low_confidence_count}")

    return {
        "roadmap": roadmap,
        "strategy_brief": state.get("strategy_brief"),
        "user_context": user_context,
    }
