"""MCP server that exposes a Upsonic Team."""
from upsonic import Agent, Team

researcher: Agent = Agent(
    name="Researcher",
    role="Research specialist",
    goal="Find accurate information",
)

writer: Agent = Agent(
    name="Writer",
    role="Technical writer",
    goal="Write clear and concise text",
)

team: Team = Team(
    entities=[researcher, writer],
    name="Research Team",
    role="Research and writing",
    goal="Produce well-written summaries",
    mode="sequential",
)

if __name__ == "__main__":
    team.as_mcp().run()
