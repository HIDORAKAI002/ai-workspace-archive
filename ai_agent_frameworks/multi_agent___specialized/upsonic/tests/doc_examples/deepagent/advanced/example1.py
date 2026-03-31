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
    
    task = Task(description="Analyze the theoretical foundations of transformer attention mechanisms, comparing multi-head attention variants and their computational complexity trade-offs, then document your findings in /workspace/attention_analysis.txt")
    result = await agent.do_async(task)
    
    # Files exist only during this session
    exists = await backend.exists("/workspace/attention_analysis.txt")
    print(f"File exists: {exists}")

asyncio.run(main())