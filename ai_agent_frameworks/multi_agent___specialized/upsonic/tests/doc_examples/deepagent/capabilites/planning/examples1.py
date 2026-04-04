import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Task

async def main():
    agent = DeepAgent(model="openai/gpt-4o")
    
    task = Task(description="""
Create a complete web application with:
- User authentication system
- Product catalog with search
- Shopping cart functionality
- Payment processing

Plan the implementation, then execute all tasks.
Save each component to separate files in /app/ directory.
""")

    result = await agent.do_async(task)
    print(result)
    
    # Check the plan created
    plan = agent.get_current_plan()
    print(f"\nExecution Plan ({len(plan)} tasks):")
    for todo in plan:
        print(f"  [{todo['status']}] {todo['content']}")

asyncio.run(main())