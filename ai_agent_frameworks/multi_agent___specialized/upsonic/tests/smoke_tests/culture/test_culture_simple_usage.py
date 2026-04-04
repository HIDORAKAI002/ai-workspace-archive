"""
Smoke Test: Culture Simple Usage Examples

This test demonstrates simple usage patterns:
- Culture with Agent and Task (no storage)
- Culture with Agent, Task, and Memory (with storage)

Usage:
    pytest tests/smoke_tests/culture/test_culture_simple_usage.py -v
"""

from upsonic import Agent, Task
from upsonic.culture import Culture
from upsonic.storage.memory import Memory
from upsonic.storage.sqlite import SqliteStorage


def test_example_1_culture_only():
    """
    Example 1: Simple Culture usage with Agent and Task (no storage)
    
    This demonstrates the basic usage pattern:
    - Create Culture with description
    - Create Agent with culture
    - Execute tasks with the agent
    """
    print("\n" + "=" * 70)
    print("EXAMPLE 1: Culture with Agent and Task (No Storage)")
    print("=" * 70)
    
    # Create Culture
    my_culture = Culture(
        description="You are a 5-star hotel receptionist",
        add_system_prompt=True,  # default true
        repeat=False,  # default false
        repeat_interval=5  # default 5
    )
    
    # Create Agent with Culture
    agent = Agent("openai/gpt-4o", culture=my_culture)
    
    # Execute task
    result = agent.do(Task("Greet me as I arrive at the hotel"))
    
    print(f"\nResult: {result}")
    print("\n✓ Example 1 completed successfully!")
    
    assert result is not None, "Task result should not be None"
    assert len(str(result)) > 0, "Result should not be empty"


def test_example_2_culture_with_storage():
    """
    Example 2: Culture with Agent, Task, and Memory (with storage)
    
    This demonstrates:
    - Creating storage backend
    - Creating memory with desired features
    - Adding Culture to agent with memory
    - Multiple interactions where agent remembers context
    """
    print("\n" + "=" * 70)
    print("EXAMPLE 2: Culture with Agent, Task, and Memory (With Storage)")
    print("=" * 70)
    
    # Create storage backend
    storage = SqliteStorage(db_file="memory_with_culture.db")
    
    # Create memory with desired features
    memory = Memory(
        storage=storage,
        session_id="session_001",
        user_id="user_123",
        full_session_memory=True,    # Enable chat history
        summary_memory=True,         # Enable summaries
        user_analysis_memory=True,   # Enable user profiles
        model="openai/gpt-4o"        # Required for summaries & user analysis
    )
    
    # Create Culture
    my_culture = Culture(
        description="You are a helpful assistant who remembers user information and provides personalized responses",
        add_system_prompt=True,
        repeat=False,
        repeat_interval=5
    )
    
    # Attach memory and culture to agent
    agent = Agent("openai/gpt-4o", memory=memory, culture=my_culture)
    
    # First interaction
    print("\n--- First Interaction ---")
    result1 = agent.do(Task("My name is Alice and I'm a Python developer"))
    print(f"Result 1: {result1}")
    
    # Second interaction - agent remembers context
    print("\n--- Second Interaction (Agent should remember context) ---")
    result2 = agent.do(Task("What's my name and expertise?"))
    print(f"Result 2: {result2}")
    
    # Verify agent remembers (check in a case-insensitive way)
    result2_str = str(result2).lower()
    assert "alice" in result2_str, f"Agent should remember the name Alice. Got: {result2}"
    assert "python" in result2_str or "developer" in result2_str, f"Agent should remember Python developer. Got: {result2}"
    
    print("\n✓ Example 2 completed successfully!")
    print("✓ Agent remembered user context (Alice, Python developer)")


def main():
    """Run both examples (for manual execution)."""
    print("\n" + "=" * 70)
    print("CULTURE FEATURE - SIMPLE USAGE EXAMPLES")
    print("=" * 70)
    
    try:
        print("\n[Running Example 1: Culture Only]")
        test_example_1_culture_only()
    except Exception as e:
        print(f"\n❌ Example 1 failed: {e}")
        import traceback
        traceback.print_exc()
    
    try:
        print("\n[Running Example 2: Culture with Storage]")
        test_example_2_culture_with_storage()
    except Exception as e:
        print(f"\n❌ Example 2 failed: {e}")
        import traceback
        traceback.print_exc()
    
    print("\n" + "=" * 70)
    print("✅ ALL EXAMPLES COMPLETED")
    print("=" * 70)


if __name__ == "__main__":
    main()
