"""
Smoke test for Team streaming in coordinate mode with mixed Agent and Team entities.
Verifies stream() yields non-empty text and leader header appears.
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


def test_coordinate_streaming_mixed_entities() -> None:
    """Coordinate mode: stream leader output; header and content should be present."""
    _reset_console()
    data_analyst = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Data Analyst",
        role="Data Analysis Expert",
        goal="Analyze data and extract insights",
    )
    report_writer = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Report Writer",
        role="Business Report Specialist",
        goal="Create professional business reports",
    )
    report_team = Team(
        entities=[report_writer],
        mode="sequential",
        name="ReportTeam",
    )
    team = Team(
        entities=[data_analyst, report_team],
        mode="coordinate",
        model="anthropic/claude-sonnet-4-5",
    )
    tasks = [
        Task(description="Analyze Q4 sales data and identify trends"),
        Task(description="Create executive summary of findings"),
    ]
    chunks: list[str] = []
    for chunk in team.stream(tasks):
        chunks.append(chunk)
    output = "".join(chunks)
    assert output, "Stream output should be non-empty"
    assert "--- [" in output, "Leader stream header (--- [...) should appear in output"
