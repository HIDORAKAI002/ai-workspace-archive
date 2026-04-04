import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic.agent.deepagent.backends import StateBackend
from upsonic import Task

async def main():
    backend = StateBackend()
    agent = DeepAgent(
        model="openai/gpt-4o",
        filesystem_backend=backend
    )
    
    task = Task(description="Create /tmp/scratch.txt with temporary data")
    result = await agent.do_async(task)
    
    # Files exist only during this session
    exists = await backend.exists("/tmp/scratch.txt")
    print(f"File exists: {exists}")

asyncio.run(main())