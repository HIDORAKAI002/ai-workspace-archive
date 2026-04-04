import sys

import pytest
from upsonic import Agent, Task
from upsonic.tools.mcp import MCPHandler


@pytest.fixture
def math_agent_mcp_handler() -> MCPHandler:
    """Create an MCPHandler pointing at the math-agent MCP server."""
    return MCPHandler(
        command=f"{sys.executable} tests/smoke_tests/tools/_math_agent_server.py",
    )


@pytest.fixture
def consumer_agent() -> Agent:
    """Create the agent that will consume the MCP tool."""
    return Agent(
        name="Consumer Agent",
        role="General-purpose assistant",
        goal="Use available tools to answer questions accurately",
    )


class TestAgentAsMCP:
    """Verify that an Agent exposed via as_mcp() can be consumed by another Agent."""

    def test_agent_as_mcp_tool(self, math_agent_mcp_handler: MCPHandler, consumer_agent: Agent) -> None:
        task: Task = Task(
            description="Use the do tool to ask: What is 2 + 2? Return only the number.",
            tools=[math_agent_mcp_handler],
        )

        result = consumer_agent.do(task)
        assert result is not None
        assert "4" in str(result)
