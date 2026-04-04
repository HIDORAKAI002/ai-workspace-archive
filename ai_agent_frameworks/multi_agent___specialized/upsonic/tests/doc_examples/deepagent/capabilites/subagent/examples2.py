import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Agent, Task

async def main():
    # Create specialized subagents
    researcher = Agent(
        model="openai/gpt-4o-mini",
        name="researcher",
        role="Research Specialist",
        system_prompt="You are a research expert focused on gathering information"
    )
    
    writer = Agent(
        model="openai/gpt-4o-mini",
        name="writer",
        role="Technical Writer",
        system_prompt="You are a technical writing expert"
    )
    
    # Create DeepAgent with subagents
    agent = DeepAgent(
        model="openai/gpt-4o",
        subagents=[researcher, writer]
    )
    
    task = Task(description="""
    Research AI trends and write a technical report based on research
    
    Save the final report to /reports/ai_trends.txt
    """)
    
    result = await agent.do_async(task)
    print(result)

asyncio.run(main())