import asyncio
from upsonic.agent.deepagent import DeepAgent
from upsonic import Agent, Task

async def main():
    # Create specialized development team
    frontend_dev = Agent(
        model="openai/gpt-4o-mini",
        name="frontend",
        role="Frontend Developer",
        system_prompt="You are a frontend development expert specializing in React and modern web technologies"
    )
    
    backend_dev = Agent(
        model="openai/gpt-4o-mini",
        name="backend",
        role="Backend Developer",
        system_prompt="You are a backend development expert specializing in Python, APIs, and database design"
    )
    
    tester = Agent(
        model="openai/gpt-4o-mini",
        name="tester",
        role="QA Engineer",
        system_prompt="You are a QA and testing expert focused on automation and comprehensive test coverage"
    )
    
    # Create Deep Agent with specialized team
    agent = DeepAgent(
        model="openai/gpt-4o",
        subagents=[frontend_dev, backend_dev, tester]
    )
    
    # Execute complex development project
    task = Task(description="""
    Build a complete task management application.
    
    PHASE 1 - PLANNING:
    Create a development plan covering:
    1. Design application architecture
    2. Implement backend API
    3. Create frontend interface
    4. Write tests
    5. Create documentation
    
    PHASE 2 - BACKEND:
    Create:
    - API endpoints for tasks (CRUD operations)
    - Database schema
    - Authentication system
    
    Save backend code to /backend/ directory:
    - /backend/api.py
    - /backend/models.py
    - /backend/auth.py
    
    PHASE 3 - FRONTEND:
    Create:
    - React components
    - Task list UI
    - Task creation form
    
    Save frontend code to /frontend/ directory:
    - /frontend/App.jsx
    - /frontend/TaskList.jsx
    - /frontend/TaskForm.jsx
    
    PHASE 4 - TESTING:
    Create:
    - Unit tests for backend
    - Component tests for frontend
    - Integration tests
    
    Save tests to /tests/ directory
    
    PHASE 5 - DOCUMENTATION:
    Create /docs/README.md with:
    - Setup instructions
    - API documentation
    - Usage examples
    
    Ensure all tasks are completed.
    """)
    
    result = await agent.do_async(task)
    print(result)
    
    # Check project structure
    all_files = await agent.filesystem_backend.glob("/**/*")
    print(f"\n📁 Project Files ({len(all_files)} files):")
    for file in sorted(all_files):
        print(f"  {file}")

asyncio.run(main())