"""
Smoke test for Team streaming in route mode with mixed Agent and Team entities.
Verifies stream() yields non-empty text and chosen-entity header appears.
"""

import sys
import pytest
from rich.console import Console
from upsonic import Agent, Task, Team

pytestmark = pytest.mark.timeout(120)


def _reset_console() -> None:
    """Reset Rich console to current sys.stdout to avoid stale file references."""
    import upsonic.utils.printing as _printing
    _printing.console = Console(file=sys.stdout)


def test_route_streaming_mixed_entities() -> None:
    """Route mode: stream chosen entity output; header and content should be present."""
    _reset_console()
    legal_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Legal Expert",
        role="Legal Advisor",
        goal="Provide legal guidance and compliance information",
        system_prompt="You are an expert in corporate law and regulations",
    )
    tech_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Tech Expert",
        role="Technology Specialist",
        goal="Provide technical solutions and architecture advice",
        system_prompt="You are an expert in software architecture and cloud systems",
    )
    tech_team = Team(
        entities=[tech_expert],
        mode="sequential",
        name="TechTeam",
    )
    team = Team(
        entities=[legal_expert, tech_team],
        mode="route",
        model="anthropic/claude-sonnet-4-5",
    )
    tasks = [
        Task(description="What are the best practices for implementing OAuth 2.0?"),
        Task(description="How should we handle token refresh securely?"),
    ]
    chunks: list[str] = []
    for chunk in team.stream(tasks):
        chunks.append(chunk)
    output = "".join(chunks)
    assert output, "Stream output should be non-empty"
    assert "--- [" in output, "Chosen entity stream header (--- [...) should appear in output"
