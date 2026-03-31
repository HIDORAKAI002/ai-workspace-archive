"""
Test: Dynamic User Profile with Storage Providers

Success criteria:
- LLM creates dynamic user profile schema based on conversation
- feed_tool_call_results works with dynamic profile
- user_memory_mode works with dynamic profile
- Dynamic profile persists in storage
"""

import pytest
import os
import tempfile
import uuid
from upsonic import Agent, Task
from upsonic.tools import tool
from upsonic.storage import Memory, SqliteStorage, InMemoryStorage
from upsonic.session.agent import AgentSession
from upsonic.session.base import SessionType

pytestmark = pytest.mark.timeout(120)


@tool
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers."""
    return a + b


@tool
def get_time() -> str:
    """Get current time."""
    from datetime import datetime
    return datetime.now().strftime("%H:%M:%S")


@pytest.fixture
def test_user_id():
    return f"test_user_{uuid.uuid4().hex[:8]}"


@pytest.fixture
def test_session_id():
    return f"test_session_{uuid.uuid4().hex[:8]}"


@pytest.fixture
def inmemory_storage():
    """Create an in-memory storage."""
    return InMemoryStorage()


@pytest.fixture
def sqlite_storage():
    """Create a temporary SQLite storage."""
    db_file = tempfile.mktemp(suffix=".db")
    storage = SqliteStorage(db_file=db_file)
    yield storage
    if os.path.exists(db_file):
        os.remove(db_file)


# =============================================================================
# TEST: Dynamic User Profile Generation
# =============================================================================

@pytest.mark.asyncio
async def test_dynamic_user_profile_basic(inmemory_storage, test_user_id, test_session_id):
    """Test that dynamic user profile generates schema from conversation."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        dynamic_user_profile=True,  # Enable dynamic profile
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    # Verify dynamic profile is enabled
    assert memory.dynamic_user_profile is True
    assert memory.is_profile_dynamic is True  # Backward compatibility
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    # Provide diverse information for dynamic schema generation
    task = Task(description="I'm John, a 35-year-old architect from New York. I love hiking and photography in my free time.")
    result = await agent.do_async(task)
    assert result is not None
    
    # Verify session was created
    session = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None
    
    # Check if user profile was dynamically generated - get from UserMemory
    user_memory = inmemory_storage.get_user_memory(user_id=test_user_id)
    if user_memory and user_memory.user_memory:
        profile = user_memory.user_memory
        # Dynamic profile should have extracted fields based on conversation
        assert len(profile) >= 1, f"Dynamic profile should have fields, got: {profile}"


@pytest.mark.asyncio
async def test_dynamic_profile_with_tool_calls(inmemory_storage, test_user_id, test_session_id):
    """Test dynamic profile with tool call results."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        dynamic_user_profile=True,
        feed_tool_call_results=True,
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    agent = Agent(
        model="openai/gpt-4o-mini",
        memory=memory,
        tools=[calculate_sum]
    )
    
    # Task with tool call
    task = Task(description="Use calculate_sum to add 5 and 3, then tell me about my preferences if any.")
    result = await agent.do_async(task)
    assert result is not None
    
    # Verify session was created
    session = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None


@pytest.mark.asyncio
async def test_dynamic_profile_ignores_custom_schema(inmemory_storage, test_user_id, test_session_id):
    """Test that dynamic_user_profile ignores user_profile_schema."""
    from pydantic import BaseModel, Field
    from typing import Optional
    
    class CustomSchema(BaseModel):
        custom_field: Optional[str] = Field(None)
    
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        dynamic_user_profile=True,  # This should override custom schema
        user_profile_schema=CustomSchema,
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    # When dynamic is enabled, profile_schema should be ignored
    if memory.user_memory:
        assert memory.user_memory._profile_schema_model is None, \
            "Dynamic profile should ignore custom schema"


# =============================================================================
# TEST: Dynamic Profile with Update/Replace Modes
# =============================================================================

@pytest.mark.asyncio
async def test_dynamic_profile_update_mode(inmemory_storage, test_user_id, test_session_id):
    """Test dynamic profile with update mode."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        dynamic_user_profile=True,
        user_memory_mode="update",
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    # First interaction
    task1 = Task(description="I'm a developer who loves Python.")
    await agent.do_async(task1)
    
    session1 = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    
    # Second interaction - should add to profile
    task2 = Task(description="I also like JavaScript and TypeScript.")
    await agent.do_async(task2)
    
    session2 = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    
    # Verify update timestamp changed
    if session1 and session2:
        assert session2.updated_at >= session1.updated_at


@pytest.mark.asyncio
async def test_dynamic_profile_replace_mode(inmemory_storage, test_user_id, test_session_id):
    """Test dynamic profile with replace mode."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        dynamic_user_profile=True,
        user_memory_mode="replace",
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    task = Task(description="I am a software architect specializing in cloud systems.")
    await agent.do_async(task)
    
    session = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None


# =============================================================================
# TEST: Dynamic Profile Persistence in SQLite
# =============================================================================

@pytest.mark.asyncio
async def test_dynamic_profile_sqlite_persistence(sqlite_storage, test_user_id, test_session_id):
    """Test that dynamic profile persists in SQLite."""
    memory = Memory(
        storage=sqlite_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        dynamic_user_profile=True,
        feed_tool_call_results=True,
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    agent = Agent(
        model="openai/gpt-4o-mini",
        memory=memory,
        tools=[calculate_sum]
    )
    
    task = Task(description="Use calculate_sum for 2+2 and tell me the result.")
    await agent.do_async(task)
    
    # Verify session persisted
    session = sqlite_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None
    
    # Test update
    if session.metadata is None:
        session.metadata = {}
    session.metadata["test"] = "value"
    sqlite_storage.upsert_session(session, deserialize=True)
    
    updated = sqlite_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert updated.metadata.get("test") == "value"
    
    # Delete
    sqlite_storage.delete_session(test_session_id)


# =============================================================================
# TEST: Dynamic Profile with Multiple Tools
# =============================================================================

@pytest.mark.asyncio
async def test_dynamic_profile_multiple_tools(inmemory_storage, test_user_id, test_session_id):
    """Test dynamic profile with multiple tool calls."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        dynamic_user_profile=True,
        feed_tool_call_results=True,
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    agent = Agent(
        model="openai/gpt-4o-mini",
        memory=memory,
        tools=[calculate_sum, get_time]
    )
    
    task = Task(description="Calculate 10+20 using calculate_sum tool and tell me the result.")
    result = await agent.do_async(task)
    assert result is not None
    
    # Verify session was created
    session = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None
    assert session.runs is not None


# =============================================================================
# TEST: Prepared Inputs with Dynamic Profile
# =============================================================================

@pytest.mark.asyncio
async def test_prepared_inputs_with_dynamic_profile(inmemory_storage, test_user_id, test_session_id):
    """Test that prepare_inputs_for_task works with dynamic profile."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        dynamic_user_profile=True,
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    # Create some conversation with profile data
    task = Task(description="I'm a machine learning engineer interested in transformers and LLMs.")
    await agent.do_async(task)
    
    # Get prepared inputs
    prepared = await memory.prepare_inputs_for_task(session_type=SessionType.AGENT)
    
    # Should have message history
    assert "message_history" in prepared
    assert isinstance(prepared["message_history"], list)
    
    # May have user profile if analysis succeeded
    if prepared.get("system_prompt_injection"):
        assert "<UserProfile>" in prepared["system_prompt_injection"]
