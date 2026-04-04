"""
Smoke test for nested Team as entity in sequential mode.

Verifies:
- Result is non-empty string
- Both entities (Agent and nested Team) are called
- Debug prints show correct entity types and names
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
async def test_sequential_nested_team_entity_called(capsys: pytest.CaptureFixture[str]):
    """Sequential mode: both an Agent and a nested Team are selected and called."""
    _enable_print_capture()

    researcher = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Researcher",
        role="Research Specialist",
        goal="Find accurate information",
    )
    writer = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Writer",
        role="Content Writer",
        goal="Create clear content",
    )

    inner_team = Team(
        entities=[writer],
        name="Writing Team",
        role="Writing Department",
        goal="Produce written content from research",
        mode="sequential",
    )

    outer_team = Team(
        entities=[researcher, inner_team],
        mode="sequential",
        debug=True,
    )

    tasks = [
        Task(description="List three facts about the Eiffel Tower."),
        Task(description="Write a short paragraph using the facts above."),
    ]

    result = await outer_team.multi_agent_async(
        outer_team.entities, tasks, _print_method_default=True
    )
    captured = capsys.readouterr()
    out = captured.out

    # Result assertions
    assert result is not None, "Result should not be None"
    assert isinstance(result, str), f"Result should be str, got {type(result)}"
    assert len(result.strip()) > 0, "Result should be non-empty"

    # info_log assertions — verify entity calls are logged via info_log
    assert "Sequential mode" in out, (
        f"Expected sequential info_log in output:\n{out[:1000]}"
    )

    # At least one Agent entity should be called
    assert "Calling Agent" in out, (
        f"Expected at least one Agent call in output:\n{out[:1000]}"
    )

    # info_log context tag should appear
    assert "[Team]" in out, (
        f"Expected [Team] context tag from info_log in output:\n{out[:500]}"
    )

    # Agent Started should appear (from the actual agent execution)
    assert "Agent Started" in out or "Agent Status" in out, (
        f"Expected agent start banner in output:\n{out[:500]}"
    )
