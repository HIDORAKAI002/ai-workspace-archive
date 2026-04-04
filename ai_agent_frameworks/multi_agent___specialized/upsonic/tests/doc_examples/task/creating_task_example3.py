from upsonic import Agent, Task

def validate_output(result):
    """Custom guardrail function."""
    if isinstance(result, str) and len(result) > 10:
        return True
    return False

# Create agent and task with advanced features
agent = Agent(model="openai/gpt-4o")
task = Task(
    description="Generate a comprehensive report on AI trends",
    enable_cache=True,
    cache_method="vector_search",
    cache_threshold=0.8,
    cache_duration_minutes=120,
    guardrail=validate_output,
    guardrail_retries=3,
    enable_thinking_tool=True
)

# Execute task
result = agent.do(task)
print(result)