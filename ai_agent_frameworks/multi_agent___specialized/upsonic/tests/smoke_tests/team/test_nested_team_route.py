"""
Smoke test for nested Team as entity in route mode.

Verifies:
- Result is non-empty string
- Router correctly selects the tech-related entity (Agent or nested Team)
- Debug prints show route mode with correct entity type and name
- Agent Started prints appear for actual agents
"""

import sys
import pytest
from rich.console import Console

from upsonic import Agent, Task, Team

pytestmark = pytest.mark.timeout(120)


def _enable_print_capture() -> None:
    """Patch Rich console to use current sys.stdout so capsys captures agent/team prints."""
    import upsonic.utils.printing as _printing
    _printing.console = Console(file=sys.stdout)


@pytest.mark.asyncio
async def test_route_nested_team_entity_routed(capsys: pytest.CaptureFixture[str]):
    """Route mode: router selects a nested Team for a technical documentation task."""
    _enable_print_capture()

    legal_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Legal Expert",
        role="Legal Advisor",
        goal="Provide legal guidance",
    )
    tech_writer = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Tech Writer",
        role="Technical Writer",
        goal="Write technical documentation",
    )

    tech_team = Team(
        entities=[tech_writer],
        name="Tech Team",
        role="Technical Documentation Department",
        goal="Produce technical content and documentation",
        mode="sequential",
    )

    outer_team = Team(
        entities=[legal_expert, tech_team],
        mode="route",
        model="anthropic/claude-sonnet-4-5",
        debug=True,
    )

    task = Task(description="Write a brief explanation of how API rate limiting works.")

    result = await outer_team.multi_agent_async(
        outer_team.entities, [task], _print_method_default=True
    )
    captured = capsys.readouterr()
    out = captured.out

    # Result assertions
    assert result is not None, "Result should not be None"
    assert isinstance(result, str), f"Result should be str, got {type(result)}"
    assert len(result.strip()) > 0, "Result should be non-empty"

    # info_log assertions — verify route is logged via info_log
    assert "Route mode" in out, (
        f"Expected route info_log in output:\n{out[:1000]}"
    )

    # The routed entity should be identified
    assert "Routed to" in out, (
        f"Expected 'Routed to' in route info_log output:\n{out[:1000]}"
    )

    # info_log context tag should appear
    assert "[Team]" in out, (
        f"Expected [Team] context tag from info_log in output:\n{out[:500]}"
    )

    # Agent Started should appear (from actual agent execution)
    assert "Agent Started" in out or "Agent Status" in out, (
        f"Expected agent start banner in output:\n{out[:500]}"
    )


@pytest.mark.asyncio
async def test_route_selects_tech_team_for_technical_task(capsys: pytest.CaptureFixture[str]):
    """Route mode: verify the router prefers the Tech Team for a technical question."""
    _enable_print_capture()

    legal_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Legal Expert",
        role="Legal Advisor",
        goal="Provide legal guidance and compliance information",
    )
    tech_writer = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Tech Writer",
        role="Technical Writer",
        goal="Write technical documentation",
    )

    tech_team = Team(
        entities=[tech_writer],
        name="Tech Team",
        role="Technical Documentation Department",
        goal="Produce technical content and documentation",
        mode="sequential",
    )

    outer_team = Team(
        entities=[legal_expert, tech_team],
        mode="route",
        model="anthropic/claude-sonnet-4-5",
        debug=True,
    )

    task = Task(description="Explain the difference between REST and GraphQL APIs.")

    result = await outer_team.multi_agent_async(
        outer_team.entities, [task], _print_method_default=True
    )
    captured = capsys.readouterr()
    out = captured.out

    assert result is not None
    assert len(result.strip()) > 0

    # Expect routing to Tech Team (not Legal Expert) for a pure-tech question
    assert "Routed to Team 'Tech Team'" in out, (
        f"Expected router to select Tech Team for a technical task. Output:\n{out[:1000]}"
    )
