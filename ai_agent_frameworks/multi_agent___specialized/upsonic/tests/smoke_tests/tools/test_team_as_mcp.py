import sys

import pytest
from upsonic import Agent, Task, Team
from upsonic.tools.mcp import MCPHandler


@pytest.fixture
def team_mcp_handler() -> MCPHandler:
    """Create an MCPHandler pointing at the team MCP server."""
    return MCPHandler(
        command=f"{sys.executable} tests/smoke_tests/tools/_team_server.py",
    )


@pytest.fixture
def consumer_agent() -> Agent:
    """Create the agent that will consume the MCP tool."""
    return Agent(
        name="Consumer Agent",
        role="General-purpose assistant",
        goal="Use available tools to answer questions accurately",
    )


class TestTeamAsMCP:
    """Verify that a Team exposed via as_mcp() can be consumed by another Agent."""

    def test_team_as_mcp_tool(self, team_mcp_handler: MCPHandler, consumer_agent: Agent) -> None:
        task: Task = Task(
            description="Use the do tool to ask: Write a one-sentence summary about Python programming.",
            tools=[team_mcp_handler],
        )

        result = consumer_agent.do(task)
        assert result is not None
        assert len(str(result)) > 10
