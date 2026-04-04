import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic.agent.deepagent.backends import MemoryBackend
from upsonic.storage.providers.sqlite import SqliteStorage
from upsonic import Task
import tempfile

async def main():
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
        db_path = tmp.name
    
    try:
        storage = SqliteStorage(db_file=db_path)
        backend = MemoryBackend(storage)
        
        agent = DeepAgent(
            model="openai/gpt-4o",
            filesystem_backend=backend
        )
        
        task = Task(description="Research latest AI trends. Save important research findings to /memory/research.txt")
        result = await agent.do_async(task)
        
        # Files persist across sessions
        content = await backend.read("/memory/research.txt")
        print(f"Persistent content: {content[:50]}...")
        
        await storage.disconnect_async()
    finally:
        import os
        os.unlink(db_path)

asyncio.run(main())