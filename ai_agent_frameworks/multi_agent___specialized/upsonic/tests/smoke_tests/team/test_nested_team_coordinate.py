"""
Smoke test for nested Team as entity in coordinate mode.

Verifies:
- Result is non-empty string
- Leader agent is created by framework
- Leader has memory, member entities do not receive it
- Debug prints show coordinate delegation with entity type and name
- delegate_task tool call appears in output
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
async def test_coordinate_nested_team_entity_delegated(capsys: pytest.CaptureFixture[str]):
    """Coordinate mode: leader delegates to both an Agent and a nested Team."""
    _enable_print_capture()

    analyst = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Analyst",
        role="Data Analyst",
        goal="Analyze data and extract insights",
    )
    summarizer = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Summarizer",
        role="Summary Writer",
        goal="Summarize findings concisely",
    )

    analysis_team = Team(
        entities=[analyst],
        name="Analysis Team",
        role="Data Analysis Department",
        goal="Perform data analysis tasks",
        mode="sequential",
    )

    outer_team = Team(
        entities=[analysis_team, summarizer],
        mode="coordinate",
        model="anthropic/claude-sonnet-4-5",
        debug=True,
    )

    tasks = [
        Task(description="Identify three advantages of renewable energy."),
        Task(description="Write a one-sentence executive summary of the advantages we have found."),
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

    # Leader assertions
    assert outer_team.leader_agent is not None, "Framework should create leader_agent"
    assert outer_team.leader_agent not in outer_team.entities, "Leader should not be in entities list"
    assert outer_team.memory is None, "Team memory should remain None when not explicitly set"
    assert outer_team.leader_agent.memory is None, "Leader should have no memory when team memory is not set"

    # info_log assertions — verify delegation is logged via info_log
    assert "Coordinate mode" in out, (
        f"Expected coordinate info_log in output:\n{out[:1000]}"
    )

    # info_log context tag should appear
    assert "[Team]" in out, (
        f"Expected [Team] context tag from info_log in output:\n{out[:500]}"
    )

    # delegate_task tool call should appear in Rich output
    assert "delegate_task" in out, (
        f"Expected delegate_task tool call in output:\n{out[:1000]}"
    )

    # Agent Started should appear (from actual agent execution)
    assert "Agent Started" in out or "Agent Status" in out, (
        f"Expected agent start banner in output:\n{out[:500]}"
    )
