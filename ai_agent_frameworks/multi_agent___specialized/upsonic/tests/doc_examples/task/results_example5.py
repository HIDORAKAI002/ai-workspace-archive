from upsonic import Agent, Task

# Create agent and execute task with caching
agent = Agent(model="openai/gpt-4o")
task = Task(
    description="What is machine learning?",
    enable_cache=True,
    cache_method="vector_search",
    cache_threshold=0.8
)
result = agent.do(task)
print(result)

# Access cache statistics
cache_stats = task.get_cache_stats()
print(f"Cache hit: {cache_stats.get('cache_hit')}")
print(f"Cache method: {cache_stats.get('cache_method')}")
print(f"Cache threshold: {cache_stats.get('cache_threshold')}")