"""Test that all agent modules can be imported successfully."""

import pytest


def test_graph_state_model():
    """Test GraphState model can be imported."""
    from app.agents.models import GraphState

    assert GraphState is not None


# DEPRECATED: These tests are for the old 8-node architecture
# The system now uses PRD v4.1 5-node architecture (Nov 2025):
# Inquisitor → Gap Analyst → Curator → Enricher → Validator
#
# def test_cognitive_profile_models():
#     """Test cognitive profile models."""
#     from app.agents.models import CognitiveProfileTechnical, CognitiveProfileFriendly
#     assert CognitiveProfileTechnical is not None
#     assert CognitiveProfileFriendly is not None
#
# def test_all_nodes_can_be_imported():
#     """Test all node modules can be imported."""
#     from app.agents.nodes import (
#         profiler,
#         pedagogy_architect,
#         cognitive_adapter,
#         tech_lead,
#         career_coach,
#         meta_coach,
#         integrator,
#         validator,
#     )
#     assert hasattr(profiler, 'process')
#     assert hasattr(pedagogy_architect, 'process')
#     assert hasattr(cognitive_adapter, 'process')
#     assert hasattr(tech_lead, 'process')
#     assert hasattr(career_coach, 'process')
#     assert hasattr(meta_coach, 'process')
#     assert hasattr(integrator, 'process')
#     assert hasattr(validator, 'process')


def test_graph_builder():
    """Test that graph builder can be imported and called."""
    from app.agents.graph import build_roadmap_generation_graph, generate_roadmap

    assert build_roadmap_generation_graph is not None
    assert generate_roadmap is not None

    # Try to build the graph
    graph = build_roadmap_generation_graph()
    assert graph is not None


def test_repository_service():
    """Test RepositoryService can be imported."""
    from app.services.repository_service import RepositoryService

    assert RepositoryService is not None


def test_llm_utilities():
    """Test LLM utilities are available."""
    from app.core.llm import stream_openai_json, stream_openai_text

    assert stream_openai_json is not None
    assert stream_openai_text is not None
