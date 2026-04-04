import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Agent, Task

async def main():
    agent = DeepAgent(model="openai/gpt-4o")
    
    # Add subagent after creation
    analyst = Agent(
        model="openai/gpt-4o-mini",
        name="analyst",
        role="AI Analyst",
        system_prompt="Data analysis expert"
    )
    agent.add_subagent(analyst)
    
    task = Task(description="""
    Analyze AI trends.
    Save results to /analysis/trends.txt
    """)
    
    result = await agent.do_async(task)
    print(result)

asyncio.run(main())