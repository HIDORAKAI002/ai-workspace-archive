import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Task

async def main():
    agent = DeepAgent(model="openai/gpt-4o")
    
    task = Task(description="""
    Research Python frameworks, compare their features, and write a comparison report.
    
    Execute all tasks and ensure everything is completed.
    Save findings to /research/frameworks.txt and report to /reports/comparison.txt
    """)
    
    result = await agent.do_async(task)
    
    # Get current todos
    todos = agent.get_current_plan()
    
    print(f"\nTodo Status:")
    completed = sum(1 for t in todos if t['status'] == 'completed')
    total = len(todos)
    print(f"  Completed: {completed}/{total}")
    
    for todo in todos:
        status_icon = "✅" if todo['status'] == 'completed' else "⏳"
        print(f"  {status_icon} [{todo['status']}] {todo['content']}")

asyncio.run(main())