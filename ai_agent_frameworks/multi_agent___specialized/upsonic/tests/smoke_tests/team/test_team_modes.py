"""
Smoke test for Team sequential, coordinate, and route mode logging.

Tests that:
- Sequential mode logs show corresponding Agent names
- Coordinate mode logs show agent names (leader and members)
- Route mode logs show the selected agent name
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
async def test_sequential_mode_agent_name_logging(capsys: pytest.CaptureFixture[str]):
    """Test that sequential mode logs show corresponding Agent names.
    
    In sequential mode:
    - Task 1 goes to Agent 1
    - Task 2 goes to Agent 2
    - We need the same number of tasks as agents
    """
    _enable_print_capture()
    researcher = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Researcher",
        role="Research Specialist",
        goal="Find accurate information and data"
    )
    
    writer = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Writer",
        role="Content Writer",
        goal="Create clear and engaging content"
    )
    
    team = Team(
        entities=[researcher, writer],
        mode="sequential"
    )
    
    tasks = [
        Task(description="Research the latest developments in quantum computing"),
        Task(description="Write a blog post about quantum computing for general audience")
    ]
    
    assert len(tasks) == len([researcher, writer]), "Sequential mode requires same number of tasks as agents"
    
    result = await team.multi_agent_async([researcher, writer], tasks, _print_method_default=True)
    
    captured = capsys.readouterr()
    output = captured.out
    
    assert result is not None, "Result should not be None"
    
    assert "Researcher" in output or "researcher" in output.lower(), f"Researcher name should appear in logs (Task 1 → Agent 1). Output: {output[:500]}"
    assert "Writer" in output or "writer" in output.lower(), f"Writer name should appear in logs (Task 2 → Agent 2). Output: {output[:500]}"


@pytest.mark.asyncio
async def test_route_mode_selected_agent_logging(capsys: pytest.CaptureFixture[str]):
    """Test that route mode logs show the selected agent name."""
    _enable_print_capture()
    legal_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Legal Expert",
        role="Legal Advisor",
        goal="Provide legal guidance and compliance information",
        system_prompt="You are an expert in corporate law and regulations"
    )
    
    tech_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Tech Expert",
        role="Technology Specialist",
        goal="Provide technical solutions and architecture advice",
        system_prompt="You are an expert in software architecture and cloud systems"
    )
    
    team = Team(
        entities=[legal_expert, tech_expert],
        mode="route",
        model="anthropic/claude-sonnet-4-5"
    )
    
    task = Task(description="What are the best practices for implementing OAuth 2.0?")
    
    result = await team.multi_agent_async([legal_expert, tech_expert], [task], _print_method_default=True)
    
    captured = capsys.readouterr()
    output = captured.out
    
    assert result is not None, "Result should not be None"
    
    agent_names_in_output = (
        "Tech Expert" in output or "tech expert" in output.lower() or
        "Legal Expert" in output or "legal expert" in output.lower()
    )
    assert agent_names_in_output, f"At least one agent name (Tech Expert or Legal Expert) should appear in logs. Output: {output[:500]}"


@pytest.mark.asyncio
async def test_coordinate_mode_agent_name_logging(capsys: pytest.CaptureFixture[str]):
    """Test that coordinate mode logs show agent names (leader and members)."""
    _enable_print_capture()
    data_analyst = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Data Analyst",
        role="Data Analysis Expert",
        goal="Analyze data and extract insights"
    )
    
    report_writer = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Report Writer",
        role="Business Report Specialist",
        goal="Create professional business reports"
    )
    
    team = Team(
        entities=[data_analyst, report_writer],
        mode="coordinate",
        model="anthropic/claude-sonnet-4-5"
    )
    
    tasks = [
        Task(description="Analyze Q4 sales data and identify trends"),
        Task(description="Create executive summary of findings")
    ]
    
    result = await team.multi_agent_async([data_analyst, report_writer], tasks, _print_method_default=True)
    
    captured = capsys.readouterr()
    output = captured.out
    
    assert result is not None, "Result should not be None"
    
    agent_names_in_output = (
        "Data Analyst" in output or "data analyst" in output.lower() or
        "Report Writer" in output or "report writer" in output.lower()
    )
    assert agent_names_in_output, f"At least one agent name (Data Analyst or Report Writer) should appear in logs. Output: {output[:500]}"
