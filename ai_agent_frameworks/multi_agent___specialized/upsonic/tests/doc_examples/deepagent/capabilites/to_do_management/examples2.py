import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Task

async def main():
    agent = DeepAgent(model="openai/gpt-4o", tool_call_limit=50)
    
    task = Task(description="Create a comprehensive plan to build a personal productivity web application with features for task management, calendar integration, and progress tracking. Break down the work into actionable todos and execute each step while tracking your progress.")
    result = await agent.do_async(task)
    
    # Get current todos
    todos = agent.get_current_plan()
    
    # Access todo details
    for todo in todos:
        print(f"ID: {todo['id']}")
        print(f"Content: {todo['content']}")
        print(f"Status: {todo['status']}")
        print()

asyncio.run(main())