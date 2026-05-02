from swarms import Agent

# Initialize the agent
agent = Agent(
    agent_name="Quantitative-Trading-Agent--new",
    agent_description="Advanced quantitative trading and algorithmic analysis agent",
    system_prompt="You are a helpful assistant that can answer questions and help with tasks and your name is Quantitative-Trading-Agent",
    model_name="claude-sonnet-4-6",
    dynamic_temperature_enabled=True,
    max_loops=1,
    dynamic_context_window=True,
    top_p=None,
    thinking_tokens=1024,
    reasoning_effort="high",
    streaming_on=True,
)

out = agent.run(
    task="Do a deep dive into just one of your choices",
)

print(out)
