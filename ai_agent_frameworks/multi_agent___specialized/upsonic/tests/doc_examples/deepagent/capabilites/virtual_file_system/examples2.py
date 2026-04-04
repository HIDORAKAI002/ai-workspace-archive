import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Task

async def main():
    agent = DeepAgent(model="openai/gpt-4o")
    
    task = Task(description="""
    Create multiple files:
    1. /docs/python.md with content about Python
    2. /docs/javascript.md with content about JavaScript
    3. /scripts/helper.py with Python code
    
    Then:
    4. Find all .md files
    5. Find all files under /docs/
    6. Search for "Python" in all files
    7. Show matching lines with content output mode
    """)
    
    result = await agent.do_async(task)
    print(result)
    
    # List all files
    all_files = await agent.filesystem_backend.glob("/**/*")
    print(f"\nAll files: {all_files}")

asyncio.run(main())