import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Agent, Task

async def main():
    # Create content creation team
    researcher = Agent(
        model="openai/gpt-4o-mini",
        name="researcher",
        role="Research Specialist",
        system_prompt="You are a research and fact-checking expert"
    )
    
    writer = Agent(
        model="openai/gpt-4o-mini",
        name="writer",
        role="Content Writer",
        system_prompt="You are a content writing and editing expert"
    )
    
    reviewer = Agent(
        model="openai/gpt-4o-mini",
        name="reviewer",
        role="Content Reviewer",
        system_prompt="You are a content review and quality assurance expert"
    )
    
    # Create Deep Agent with content team
    agent = DeepAgent(
        model="openai/gpt-4o",
        subagents=[researcher, writer, reviewer]
    )
    
    # Execute content creation project
    task = Task(description="""
    Create a comprehensive blog post about machine learning.
    
    PHASE 1 - PLANNING:
    Create a plan covering:
    1. Research latest ML trends
    2. Write article content
    3. Add code examples
    4. Review for accuracy
    
    PHASE 2 - RESEARCH:
    Gather information on:
    - Latest ML trends
    - Popular frameworks
    - Use cases
    
    Save research to /research/ml_trends.txt
    
    PHASE 3 - WRITING:
    Create:
    - Main article content
    - Code examples in Python
    - Tutorial sections
    
    Save to /content/article.md
    
    PHASE 4 - REVIEW:
    Review the article for:
    - Accuracy
    - Clarity
    - Completeness
    
    Save review notes to /reviews/feedback.txt
    
    PHASE 5 - FINAL:
    Create /published/final_article.md with the complete, reviewed article.
    
    Ensure all tasks are completed.
    """)
    
    result = await agent.do_async(task)
    print(result)
    
    # Check content created
    files = await agent.filesystem_backend.glob("/**/*")
    print(f"\n📁 Content Files: {files}")

asyncio.run(main())