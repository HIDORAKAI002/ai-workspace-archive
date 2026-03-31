from upsonic import Agent, Task

# Create agent and execute task
agent = Agent(model="openai/gpt-4o")
task = Task(description="Write a short poem about technology")
result = agent.do(task)

# Access cost information
total_cost = task.total_cost
input_tokens = task.total_input_token
output_tokens = task.total_output_token

print(f"Total cost: ${total_cost}")
print(f"Input tokens: {input_tokens}")
print(f"Output tokens: {output_tokens}")