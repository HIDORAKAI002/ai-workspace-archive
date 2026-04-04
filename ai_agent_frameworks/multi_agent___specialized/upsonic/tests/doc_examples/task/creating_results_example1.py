from upsonic import Agent, Task

# Create agent and execute task
agent = Agent(model="openai/gpt-4o")
task = Task(description="What is the capital of France?")
result = agent.do(task)

# Access the response
print(f"Task result: {result}")
print(f"Task response: {task.response}")