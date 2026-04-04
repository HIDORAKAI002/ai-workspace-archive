import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Agent, Task

async def main():
    # Create multiple specialized subagents
    python_expert = Agent(
        model="openai/gpt-4o-mini",
        name="python-expert",
        system_prompt="Python programming expert"
    )
    
    js_expert = Agent(
        model="openai/gpt-4o-mini",
        name="js-expert",
        system_prompt="JavaScript programming expert"
    )
    
    agent = DeepAgent(
        model="openai/gpt-4o",
        subagents=[python_expert, js_expert]
    )
    
    task = Task(description="""
    Research Python web frameworks and JavaScript web frameworks in parallel.
    
    Then synthesize findings into /reports/comparison.txt
    """)
    
    result = await agent.do_async(task)
    print(result)

asyncio.run(main())