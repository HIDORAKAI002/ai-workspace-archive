from upsonic import Agent, Task
from upsonic.tools import tool

@tool
def get_weather(city: str) -> str:
    """Get weather for a city."""
    return f"Weather in {city}: Sunny, 25°C"

# Create agent and execute task with tools
agent = Agent(model="openai/gpt-4o")
task = Task(description="What's the weather in Paris?", tools=[get_weather])
result = agent.do(task)
print(result)

# Access tool call history
tool_calls = task.tool_calls
for i, tool_call in enumerate(tool_calls):
    print(f"Tool call {i+1}:")
    print(f"  Tool: {tool_call.get('tool_name')}")
    print(f"  Parameters: {tool_call.get('params')}")
    print(f"  Result: {tool_call.get('tool_result')}")