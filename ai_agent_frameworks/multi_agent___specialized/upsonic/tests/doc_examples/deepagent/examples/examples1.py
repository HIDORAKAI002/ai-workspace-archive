import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Task

async def main():
    # Create a Deep Agent
    agent = DeepAgent(model="openai/gpt-4o")
    
    # Complex task that benefits from planning
    task = Task(description="""
    Analyze Python web frameworks and create a comprehensive report.
    
    Requirements:
    1. Research Django, Flask, and FastAPI
    2. Compare their features
    3. Create /reports/frameworks_analysis.txt with:
       - Executive summary
       - Feature comparison
       - Recommendations
    
    Ensure all tasks are completed.
    """)
    
    # Execute
    result = await agent.do_async(task)
    print(result)
    
    # Check plan created
    plan = agent.get_current_plan()
    print(f"\n📋 Execution Plan ({len(plan)} tasks):")
    for todo in plan:
        status_icon = "✅" if todo['status'] == 'completed' else "⏳"
        print(f"  {status_icon} [{todo['status']}] {todo['content']}")
    
    # Check files created
    files = await agent.filesystem_backend.glob("/**/*.txt")
    print(f"\n📁 Files Created: {files}")

asyncio.run(main())