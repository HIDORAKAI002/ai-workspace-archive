"""MCP server that exposes a math-focused Upsonic Agent."""
from upsonic import Agent

agent: Agent = Agent(
    name="Math Expert",
    role="Mathematics specialist",
    goal="Solve math problems accurately",
)

if __name__ == "__main__":
    agent.as_mcp().run()
