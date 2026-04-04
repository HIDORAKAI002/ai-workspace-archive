from upsonic import Agent, Task
from upsonic.tools import tool

# Create a simple tool
@tool
def calculator(operation: str, a: float, b: float) -> str:
    """Perform basic mathematical operations."""
    if operation == "add":
        return f"Result: {a + b}"
    elif operation == "multiply":
        return f"Result: {a * b}"
    return "Invalid operation"

# Create agent and task with tools
agent = Agent(model="openai/gpt-4o")
task = Task(
    description="Calculate 10 + 5 using the calculator tool",
    tools=[calculator]
)

# Execute task
result = agent.do(task)
print(result)