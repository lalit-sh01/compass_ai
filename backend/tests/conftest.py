"""Pytest configuration and fixtures."""

import pytest
import asyncio
from typing import Generator


@pytest.fixture(scope="session")
def event_loop() -> Generator:
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture
def sample_user_input():
    """Provide sample user input for testing."""
    return {
        "goal_domain": "PM",
        "target_role": "Senior Product Manager at Google",
        "background": "Software Engineer with 5 years experience",
        "skill_level": "Intermediate",
        "deadline_weeks": 14,
        "weekly_hours_cap": 12,
        "additional_context": "Prefer hands-on projects and structured learning with real examples",
    }
