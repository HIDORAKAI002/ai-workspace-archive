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
            default=StateBackend(),  # Ephemeral for default paths
            routes={
                "/research/": MemoryBackend(storage),  # Persistent
                "/reports/": MemoryBackend(storage)   # Persistent
            }
        )
        
        agent = DeepAgent(
            model="openai/gpt-4o",
            filesystem_backend=backend
        )
        
        task = Task(description="""
        Create /tmp/temp.txt (ephemeral)
        Create /research/findings.txt (persistent)
        Create /reports/summary.txt (persistent)
        """)
        
        result = await agent.do_async(task)
        print(result)
        
        await storage.disconnect_async()
    finally:
        import os
        os.unlink(db_path)

asyncio.run(main())