import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic.agent.deepagent.backends import StateBackend, MemoryBackend, CompositeBackend
from upsonic.storage.providers.sqlite import SqliteStorage
from upsonic import Agent, Task
import tempfile

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
    
    # Create persistent storage backend
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
        db_path = tmp.name
    
    try:
        storage = SqliteStorage(db_file=db_path)
        backend = CompositeBackend(
            default=StateBackend(),
            routes={
                "/research/": MemoryBackend(storage),
                "/reports/": MemoryBackend(storage)
            }
        )
        
        # Create deep agent with subagents and custom backend
        agent = DeepAgent(
            model="openai/gpt-4o",
            name="Research Agent",
            subagents=[researcher, writer],
            filesystem_backend=backend,
            tool_call_limit=50,
            debug=False
        )
        
        # Create task
        task = Task(
            description="Research AI frameworks and write a comprehensive comparison. Save research to /research/frameworks.txt and final report to /reports/comparison.txt"
        )
        
        # Execute
        result = await agent.do_async(task)
        print(result)
        
        # Check plan
        plan = agent.get_current_plan()
        print(f"\nPlan: {len(plan)} tasks")
        
        await storage.disconnect_async()
    finally:
        import os
        os.unlink(db_path)

asyncio.run(main())