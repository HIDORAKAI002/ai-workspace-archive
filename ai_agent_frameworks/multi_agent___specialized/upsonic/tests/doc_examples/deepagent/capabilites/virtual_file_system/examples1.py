import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Task

async def main():
    agent = DeepAgent(model="openai/gpt-4o")
    
    task = Task(description="""
    Create a file /workspace/notes.txt with content "Initial notes"
    Then read the file
    Then edit it to change "Initial" to "Updated"
    List all files in /workspace/
    """)
    
    result = await agent.do_async(task)
    print(result)
    
    # Verify file exists
    exists = await agent.filesystem_backend.exists("/workspace/notes.txt")
    print(f"\nFile exists: {exists}")
    
    if exists:
        content = await agent.filesystem_backend.read("/workspace/notes.txt")
        print(f"File content: {content}")

asyncio.run(main())