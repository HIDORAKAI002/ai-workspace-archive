import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Agent, Task

async def main():
    # Create research team
    data_analyst = Agent(
        model="openai/gpt-4o-mini",
        name="data-analyst",
        role="Data Analyst",
        system_prompt="You are a data analysis and statistics expert"
    )
    
    researcher = Agent(
        model="openai/gpt-4o-mini",
        name="researcher",
        role="Research Specialist",
        system_prompt="You are a research and information gathering expert"
    )
    
    writer = Agent(
        model="openai/gpt-4o-mini",
        name="writer",
        role="Technical Writer",
        system_prompt="You are a technical writing and report creation expert"
    )
    
    # Create Deep Agent with research team
    agent = DeepAgent(
        model="openai/gpt-4o",
        subagents=[data_analyst, researcher, writer]
    )
    
    # Execute comprehensive research project
    task = Task(description="""
    Conduct comprehensive market research on AI tools.
    
    PHASE 1 - PLANNING:
    Create a plan covering:
    1. Market analysis
    2. Competitor research
    3. Data collection
    4. Report writing
    
    PHASE 2 - RESEARCH:
    Delegate research tasks:
    1. Gather information on AI tool market trends
    2. Analyze market data and user preferences
    
    Save research findings to /research/market_analysis.txt
    
    PHASE 3 - REPORT:
    Create a detailed report and save to /reports/market_research.txt with:
    - Executive summary
    - Market trends
    - Competitor analysis
    - Recommendations
    
    Ensure all tasks are completed.
    """)
    
    result = await agent.do_async(task)
    print(result)
    
    # Check deliverables
    plan = agent.get_current_plan()
    print(f"\n📋 Research Plan ({len(plan)} tasks):")
    for todo in plan:
        print(f"  [{todo['status']}] {todo['content']}")
    
    files = await agent.filesystem_backend.glob("/**/*.txt")
    print(f"\n📁 Research Files: {files}")

asyncio.run(main())