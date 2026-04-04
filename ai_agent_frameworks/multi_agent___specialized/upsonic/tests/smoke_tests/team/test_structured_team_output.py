"""
Smoke test for Structured Team Output.

Tests that Team objects with response_format return structured output for all modes:
- sequential
- coordinate  
- route
"""

import sys
import pytest
from rich.console import Console
from pydantic import BaseModel
from upsonic import Agent, Task, Team
from io import StringIO
from contextlib import redirect_stdout

pytestmark = pytest.mark.timeout(120)


def _enable_print_capture() -> None:
    import upsonic.utils.printing as _printing
    _printing.console = Console(file=sys.stdout)


class TeamReport(BaseModel):
    """Structured output model for team results."""
    summary: str
    findings: list[str]
    conclusion: str


@pytest.mark.asyncio
async def test_structured_team_output_sequential():
    """Test structured output for Team in sequential mode."""
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
        mode="sequential",
        response_format=TeamReport
    )
    
    tasks = [
        Task(description="Research the latest developments in quantum computing"),
        Task(description="Write a summary report about quantum computing")
    ]
    
    result = await team.multi_agent_async([researcher, writer], tasks, _print_method_default=True)
    
    # Verify result is structured
    assert result is not None, "Result should not be None"
    assert isinstance(result, TeamReport), f"Result should be TeamReport instance, got {type(result)}"
    
    # Verify all required fields
    assert isinstance(result.summary, str), "summary should be a string"
    assert isinstance(result.findings, list), "findings should be a list"
    assert all(isinstance(f, str) for f in result.findings), "all findings should be strings"
    assert isinstance(result.conclusion, str), "conclusion should be a string"


@pytest.mark.asyncio
async def test_structured_team_output_coordinate():
    """Test structured output for Team in coordinate mode."""
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
        model="anthropic/claude-sonnet-4-5",
        response_format=TeamReport
    )
    
    tasks = [
        Task(description="Analyze Q4 sales data and identify trends"),
        Task(description="Create executive summary of findings")
    ]
    
    result = await team.multi_agent_async([data_analyst, report_writer], tasks, _print_method_default=True)
    
    # Verify result is structured
    assert result is not None, "Result should not be None"
    assert isinstance(result, TeamReport), f"Result should be TeamReport instance, got {type(result)}"
    
    # Verify all required fields
    assert isinstance(result.summary, str), "summary should be a string"
    assert isinstance(result.findings, list), "findings should be a list"
    assert all(isinstance(f, str) for f in result.findings), "all findings should be strings"
    assert isinstance(result.conclusion, str), "conclusion should be a string"


@pytest.mark.asyncio
async def test_structured_team_output_route():
    """Test structured output for Team in route mode."""
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
        model="anthropic/claude-sonnet-4-5",
        response_format=TeamReport
    )
    
    task = Task(description="What are the best practices for implementing OAuth 2.0?")
    
    result = await team.multi_agent_async([legal_expert, tech_expert], [task], _print_method_default=True)
    
    # Verify result is structured
    assert result is not None, "Result should not be None"
    assert isinstance(result, TeamReport), f"Result should be TeamReport instance, got {type(result)}"
    
    # Verify all required fields
    assert isinstance(result.summary, str), "summary should be a string"
    assert isinstance(result.findings, list), "findings should be a list"
    assert all(isinstance(f, str) for f in result.findings), "all findings should be strings"
    assert isinstance(result.conclusion, str), "conclusion should be a string"

