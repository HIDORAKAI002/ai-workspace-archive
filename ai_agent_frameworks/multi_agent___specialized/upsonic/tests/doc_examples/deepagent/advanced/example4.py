import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Task

async def main():
    agent = DeepAgent(model="openai/gpt-4o")
    
    task = Task(description="Model the phase transitions in deep learning optimization landscapes, investigating critical phenomena in loss function geometry and gradient flow dynamics, then plan your analysis, execute the research, and save your findings to /analysis/phase_transitions.txt")
    
    result = await agent.do_async(task)
    
    # Get current plan
    plan = agent.get_current_plan()
    print(f"\nPlan Status:")
    for todo in plan:
        print(f"  [{todo['status']}] {todo['content']}")

asyncio.run(main())