from swarms import Agent

Agent(
    agent_name="Stock-Analysis-Agent",
    model_name="gpt-5.4",
    max_loops=1,
    streaming_on=True,
).run("What are 5 hft algorithms")
