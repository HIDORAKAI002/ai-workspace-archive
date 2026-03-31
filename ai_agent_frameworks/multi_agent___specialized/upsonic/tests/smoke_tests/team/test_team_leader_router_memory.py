"""
Smoke tests for Team coordinate/route modes: custom leader, custom router, and memory handling.

Real API (OpenAI) and real requests only — no mocks.
Uses print-enabled execution (Rich console) and capsys to assert on terminal output and logs.
Covers:
- Coordinate: framework-created leader (model only)
- Coordinate: custom leader without memory (framework sets memory)
- Coordinate: custom leader with memory (unchanged)
- Coordinate: no leader, team memory set (internal leader uses it)
- Route: framework-created router (model only)
- Route: custom router
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

try:
    from upsonic.storage import Memory, InMemoryStorage
except ImportError:
    Memory = None
    InMemoryStorage = None


def _require_storage() -> None:
    if Memory is None or InMemoryStorage is None:
        pytest.skip("Storage (Memory/InMemoryStorage) not available")


# ---------------------------------------------------------------------------
# Coordinate: framework creates leader (no custom leader, model only)
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_coordinate_framework_creates_leader(capsys: pytest.CaptureFixture[str], caplog: pytest.LogCaptureFixture):
    """Coordinate mode with model only: framework creates leader without memory by default."""
    _enable_print_capture()
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
    team = Team(
        entities=[data_analyst, report_writer],
        mode="coordinate",
        model="anthropic/claude-sonnet-4-5",
    )
    tasks = [
        Task(description="List three key metrics for sales analysis."),
        Task(description="Write one sentence executive summary."),
    ]
    result = await team.multi_agent_async(
        [data_analyst, report_writer], tasks, _print_method_default=True
    )
    captured = capsys.readouterr()
    out = captured.out

    assert result is not None, "Result should not be None"
    assert isinstance(result, str), f"Result should be str, got {type(result)}"
    assert len(result.strip()) > 0, "Result should be non-empty"
    assert team.leader_agent is not None, "Framework should set leader_agent"
    assert team.leader_agent not in team.entities, "Leader should not be in members list"
    assert team.memory is None, "Team memory should remain None when not explicitly set"
    assert team.leader_agent.memory is None, "Leader should have no memory when team memory is not set"
    assert "Agent Started" in out or "Agent Status" in out, f"Expected agent start in output: {out[:500]}"
    assert "Data Analyst" in out or "Report Writer" in out or "data analyst" in out.lower() or "report writer" in out.lower(), (
        f"Expected agent names in output: {out[:500]}"
    )
    assert "Task Result" in out or "Result:" in out or "Total Estimated Cost" in out or "Task Metrics" in out, (
        f"Expected result/cost in output: {out[:500]}"
    )
    assert any(getattr(r, "name", "").startswith("upsonic") for r in caplog.records), "Expected upsonic log records"


# ---------------------------------------------------------------------------
# Coordinate: custom leader without memory (framework sets memory on leader)
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_coordinate_custom_leader_no_memory(capsys: pytest.CaptureFixture[str]):
    """Coordinate mode with custom leader that has no memory: leader stays without memory when team has none."""
    _enable_print_capture()
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
    custom_leader = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Custom Coordinator",
        role="Coordinator",
        goal="Delegate and coordinate tasks",
    )
    assert custom_leader.memory is None, "Precondition: leader has no memory"

    team = Team(
        entities=[data_analyst, report_writer],
        mode="coordinate",
        leader=custom_leader,
    )
    tasks = [
        Task(description="List two key metrics for sales."),
        Task(description="Write one sentence summary."),
    ]
    result = await team.multi_agent_async(
        [data_analyst, report_writer], tasks, _print_method_default=True
    )
    captured = capsys.readouterr()
    out = captured.out

    assert result is not None, "Result should not be None"
    assert isinstance(result, str), f"Result should be str, got {type(result)}"
    assert team.leader_agent is custom_leader, "team.leader_agent should be the provided leader"
    assert custom_leader.memory is None, "Leader memory should remain None when team has no memory"
    assert team.memory is None, "Team memory should remain None when not explicitly set"
    assert "Agent Started" in out or "Custom Coordinator" in out or "Data Analyst" in out or "Report Writer" in out, (
        f"Expected agent/leader name in output: {out[:500]}"
    )


# ---------------------------------------------------------------------------
# Coordinate: custom leader with memory (unchanged)
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_coordinate_custom_leader_with_memory(capsys: pytest.CaptureFixture[str]):
    """Coordinate mode with custom leader that already has memory: leader memory unchanged."""
    _require_storage()
    _enable_print_capture()
    storage = InMemoryStorage()
    leader_memory = Memory(
        storage=storage,
        full_session_memory=True,
        session_id="smoke_leader_session",
    )
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
    custom_leader = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Coordinator With Memory",
        role="Coordinator",
        goal="Delegate and coordinate tasks",
        memory=leader_memory,
    )
    assert custom_leader.memory is leader_memory, "Precondition: leader has memory"

    team = Team(
        entities=[data_analyst, report_writer],
        mode="coordinate",
        leader=custom_leader,
    )
    tasks = [
        Task(description="List two sales metrics."),
        Task(description="One sentence summary."),
    ]
    result = await team.multi_agent_async(
        [data_analyst, report_writer], tasks, _print_method_default=True
    )
    captured = capsys.readouterr()
    out = captured.out

    assert result is not None, "Result should not be None"
    assert isinstance(result, str), f"Result should be str, got {type(result)}"
    assert team.leader_agent is custom_leader, "team.leader_agent should be the provided leader"
    assert custom_leader.memory is leader_memory, "Leader memory should be unchanged (same object)"
    assert "Agent Started" in out or "Coordinator With Memory" in out or "Data Analyst" in out or "Report Writer" in out, (
        f"Expected agent/leader name in output: {out[:500]}"
    )


# ---------------------------------------------------------------------------
# Coordinate: no leader, team memory set (internal leader uses team memory)
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_coordinate_team_memory_set_no_leader(capsys: pytest.CaptureFixture[str]):
    """Coordinate mode with no custom leader but team memory set: internal leader uses team memory."""
    _require_storage()
    _enable_print_capture()
    storage = InMemoryStorage()
    team_memory = Memory(
        storage=storage,
        full_session_memory=True,
        session_id="smoke_team_session",
    )
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
    team = Team(
        entities=[data_analyst, report_writer],
        mode="coordinate",
        model="anthropic/claude-sonnet-4-5",
        memory=team_memory,
    )
    assert team.memory is team_memory, "Precondition: team memory is set"

    tasks = [
        Task(description="List two sales metrics."),
        Task(description="One sentence summary."),
    ]
    result = await team.multi_agent_async(
        [data_analyst, report_writer], tasks, _print_method_default=True
    )
    captured = capsys.readouterr()
    out = captured.out

    assert result is not None, "Result should not be None"
    assert isinstance(result, str), f"Result should be str, got {type(result)}"
    assert team.leader_agent is not None, "Framework should create leader"
    assert team.memory is team_memory, "Team memory should remain the one we set"
    assert team.leader_agent.memory is team_memory, "Internal leader should use team memory"
    assert "Agent Started" in out or "Data Analyst" in out or "Report Writer" in out, (
        f"Expected agent names in output: {out[:500]}"
    )


# ---------------------------------------------------------------------------
# Route: framework creates router (model only)
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_route_framework_creates_router(capsys: pytest.CaptureFixture[str]):
    """Route mode with model only: framework creates router."""
    _enable_print_capture()
    legal_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Legal Expert",
        role="Legal Advisor",
        goal="Provide legal guidance",
        system_prompt="You are an expert in corporate law.",
    )
    tech_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Tech Expert",
        role="Technology Specialist",
        goal="Provide technical solutions",
        system_prompt="You are an expert in software architecture.",
    )
    team = Team(
        entities=[legal_expert, tech_expert],
        mode="route",
        model="anthropic/claude-sonnet-4-5",
    )
    task = Task(description="What are the best practices for implementing OAuth 2.0?")
    result = await team.multi_agent_async(
        [legal_expert, tech_expert], [task], _print_method_default=True
    )
    captured = capsys.readouterr()
    out = captured.out

    assert result is not None, "Result should not be None"
    assert isinstance(result, str), f"Result should be str, got {type(result)}"
    assert len(result.strip()) > 0, "Result should be non-empty"
    assert team.leader_agent is not None, "Framework should set router as leader_agent"
    assert team.leader_agent not in team.entities, "Router should not be in members list"
    assert "Agent Started" in out or "Legal Expert" in out or "Tech Expert" in out, (
        f"Expected router/agent in output: {out[:500]}"
    )


# ---------------------------------------------------------------------------
# Route: custom router
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_route_custom_router(capsys: pytest.CaptureFixture[str]):
    """Route mode with custom router agent."""
    _enable_print_capture()
    legal_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Legal Expert",
        role="Legal Advisor",
        goal="Provide legal guidance",
        system_prompt="You are an expert in corporate law.",
    )
    tech_expert = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Tech Expert",
        role="Technology Specialist",
        goal="Provide technical solutions",
        system_prompt="You are an expert in software architecture.",
    )
    custom_router = Agent(
        model="anthropic/claude-sonnet-4-5",
        name="Request Router",
        role="Router",
        goal="Route queries to the best specialist",
        system_prompt="You route to Legal Expert or Tech Expert.",
    )
    team = Team(
        entities=[legal_expert, tech_expert],
        mode="route",
        router=custom_router,
    )
    task = Task(description="What are OAuth 2.0 best practices?")
    result = await team.multi_agent_async(
        [legal_expert, tech_expert], [task], _print_method_default=True
    )
    captured = capsys.readouterr()
    out = captured.out

    assert result is not None, "Result should not be None"
    assert isinstance(result, str), f"Result should be str, got {type(result)}"
    assert team.leader_agent is custom_router, "team.leader_agent should be the provided router"
    assert "Agent Started" in out or "Request Router" in out or "Legal Expert" in out or "Tech Expert" in out, (
        f"Expected router/expert in output: {out[:500]}"
    )
