import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Task

async def main():
    agent = DeepAgent(model="openai/gpt-4o")
    
    task = Task(description="""
    Research Python web frameworks and return a summary.
    
    Then create /reports/frameworks.txt with the summary.
    """)
    
    result = await agent.do_async(task)
    print(result)

asyncio.run(main())