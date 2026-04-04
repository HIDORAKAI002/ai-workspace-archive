import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic.agent.deepagent.backends import StateBackend, MemoryBackend, CompositeBackend
from upsonic.storage.providers.sqlite import SqliteStorage
from upsonic import Task
import tempfile

async def main():
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
        db_path = tmp.name
    
    try:
        storage = SqliteStorage(db_file=db_path)
        backend = CompositeBackend(
            default=StateBackend(),  # Ephemeral for /tmp/
            routes={
                "/research/": MemoryBackend(storage),  # Persistent
                "/reports/": MemoryBackend(storage)   # Persistent
            }
        )
        
        agent = DeepAgent(
            model="openai/gpt-4o",
            filesystem_backend=backend
        )
        
        task = Task(description="Examine the information-theoretic limits of federated learning, investigating communication-efficient aggregation protocols and differential privacy guarantees, then save temporary calculations to /tmp/computations.txt, research findings to /research/federated_analysis.txt, and final synthesis to /reports/federated_summary.txt")
        
        result = await agent.do_async(task)
        print(result)
        
    finally:
        import os
        os.unlink(db_path)

asyncio.run(main())