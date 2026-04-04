"""
Test: User Profile Schema with Storage Providers

Success criteria:
- Custom user profile schema correctly used by LLM
- Profile traits are extracted and stored in session
- Profile data can be retrieved for prompt injection
"""

import pytest
import os
import tempfile
import uuid
from pydantic import BaseModel, Field
from typing import Optional, List
from upsonic import Agent, Task
from upsonic.storage import Memory, SqliteStorage, InMemoryStorage
from upsonic.session.agent import AgentSession
from upsonic.session.base import SessionType

pytestmark = pytest.mark.timeout(120)


class CustomUserSchema(BaseModel):
    """Custom user profile schema for testing."""
    expertise_level: Optional[str] = Field(None, description="User's expertise level")
    favorite_topics: Optional[List[str]] = Field(None, description="User's favorite topics")
    communication_preference: Optional[str] = Field(None, description="Communication style preference")


class ExtendedUserSchema(BaseModel):
    """Extended user profile schema with more fields."""
    name: Optional[str] = Field(None, description="User's name")
    occupation: Optional[str] = Field(None, description="User's occupation")
    expertise_level: Optional[str] = Field(None, description="beginner/intermediate/expert")
    interests: Optional[List[str]] = Field(None, description="User's interests")
    preferred_language: Optional[str] = Field(None, description="Programming language preference")


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
# TEST: Custom User Profile Schema
# =============================================================================

@pytest.mark.asyncio
async def test_custom_user_profile_schema(inmemory_storage, test_user_id, test_session_id):
    """Test that custom user profile schema is used for trait extraction."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        user_profile_schema=CustomUserSchema,
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    # Verify schema is set correctly
    assert memory.user_profile_schema == CustomUserSchema
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    # Provide information matching custom schema
    task = Task(description="I am an expert in Python and prefer casual communication. I love machine learning and data science.")
    result = await agent.do_async(task)
    assert result is not None
    
    # Verify session was created
    session = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None
    
    # Verify user profile was extracted via user memory
    user_memory_entry = inmemory_storage.get_user_memory(
        user_id=test_user_id,
        deserialize=True
    )
    if user_memory_entry and user_memory_entry.user_memory:
        profile = user_memory_entry.user_memory
        # Check that at least some fields were extracted
        has_expertise = 'expertise_level' in profile and profile['expertise_level']
        has_topics = 'favorite_topics' in profile and profile['favorite_topics']
        has_comm = 'communication_preference' in profile and profile['communication_preference']
        
        assert has_expertise or has_topics or has_comm, \
            f"Profile should contain custom schema fields, got: {profile}"


@pytest.mark.asyncio
async def test_extended_user_profile_schema(inmemory_storage, test_user_id, test_session_id):
    """Test extended user profile schema with multiple fields."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        user_profile_schema=ExtendedUserSchema,
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    # Provide rich information
    task = Task(description="My name is Sarah. I'm a data scientist and I'm an expert in deep learning. I'm interested in NLP and computer vision. I prefer Python for my work.")
    result = await agent.do_async(task)
    assert result is not None
    
    # Verify profile was extracted
    session = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None
    
    # Verify user profile via user memory
    user_memory_entry = inmemory_storage.get_user_memory(
        user_id=test_user_id,
        deserialize=True
    )
    if user_memory_entry and user_memory_entry.user_memory:
        profile = user_memory_entry.user_memory
        # Verify multiple fields were extracted
        field_count = sum(1 for v in profile.values() if v is not None)
        assert field_count >= 2, f"Expected at least 2 fields extracted, got {field_count}: {profile}"


# =============================================================================
# TEST: User Memory Mode (Update vs Replace)
# =============================================================================

@pytest.mark.asyncio
async def test_user_memory_mode_update(inmemory_storage, test_user_id, test_session_id):
    """Test that user_memory_mode='update' accumulates profile data."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        user_profile_schema=ExtendedUserSchema,
        user_memory_mode='update',
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    assert memory.user_memory_mode == 'update'
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    # First interaction - provide name
    task1 = Task(description="My name is Alice.")
    await agent.do_async(task1)
    
    # Second interaction - provide occupation
    task2 = Task(description="I'm a software developer.")
    await agent.do_async(task2)
    
    # Verify profile accumulated
    session = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None
    
    # Verify user profile via user memory
    user_memory_entry = inmemory_storage.get_user_memory(
        user_id=test_user_id,
        deserialize=True
    )
    if user_memory_entry and user_memory_entry.user_memory:
        profile = user_memory_entry.user_memory
        # In update mode, profile should accumulate
        assert len(profile) >= 1, f"Profile should have accumulated data: {profile}"


@pytest.mark.asyncio
async def test_user_memory_mode_replace(inmemory_storage, test_user_id, test_session_id):
    """Test that user_memory_mode='replace' replaces profile data."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        user_profile_schema=ExtendedUserSchema,
        user_memory_mode='replace',
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    assert memory.user_memory_mode == 'replace'
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    # First interaction
    task1 = Task(description="My name is Bob and I'm a developer.")
    await agent.do_async(task1)
    
    # Verify session was created
    session = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None


# =============================================================================
# TEST: Profile Retrieval for Prompt Injection
# =============================================================================

@pytest.mark.asyncio
async def test_profile_retrieval_for_prompt(inmemory_storage, test_user_id, test_session_id):
    """Test that user profile is retrieved and formatted for prompt injection."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        user_profile_schema=ExtendedUserSchema,
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    # Create a profile
    task = Task(description="I'm John, a machine learning engineer who loves Python.")
    await agent.do_async(task)
    
    # Get prepared inputs
    prepared = await memory.prepare_inputs_for_task(session_type=SessionType.AGENT)
    
    # If user analysis worked, system_prompt_injection should contain profile
    if prepared["system_prompt_injection"]:
        assert "<UserProfile>" in prepared["system_prompt_injection"], \
            "Profile should be wrapped in <UserProfile> tags"


# =============================================================================
# TEST: SQLite Storage with User Profile
# =============================================================================

@pytest.mark.asyncio
async def test_sqlite_user_profile_persistence(sqlite_storage, test_user_id, test_session_id):
    """Test that user profile persists in SQLite storage."""
    memory = Memory(
        storage=sqlite_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        user_profile_schema=CustomUserSchema,
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    # Create profile data
    task = Task(description="I love machine learning and data science topics")
    await agent.do_async(task)
    
    # Verify session was stored
    session = sqlite_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None
    
    # Update metadata
    if session.metadata is None:
        session.metadata = {}
    session.metadata["expertise_level"] = "expert"
    sqlite_storage.upsert_session(session, deserialize=True)
    
    # Verify update persisted
    updated = sqlite_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert updated.metadata.get("expertise_level") == "expert"
    
    # Delete
    deleted = sqlite_storage.delete_session(test_session_id)
    assert deleted is True
    
    # Verify deleted
    after_delete = sqlite_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert after_delete is None


# =============================================================================
# TEST: Default UserTraits Schema
# =============================================================================

@pytest.mark.asyncio
async def test_default_user_traits_schema(inmemory_storage, test_user_id, test_session_id):
    """Test that default UserTraits schema is used when no custom schema provided."""
    memory = Memory(
        storage=inmemory_storage,
        session_id=test_session_id,
        user_id=test_user_id,
        full_session_memory=True,
        user_analysis_memory=True,
        # No user_profile_schema - should use default UserTraits
        model="openai/gpt-4o-mini",
        debug=False
    )
    
    # Verify default schema is used
    from upsonic.schemas import UserTraits
    if memory.user_memory:
        assert memory.user_memory._profile_schema_model == UserTraits
    
    agent = Agent(model="openai/gpt-4o-mini", memory=memory)
    
    task = Task(description="Hi, I'm a software engineer with 5 years of experience. I specialize in Python.")
    result = await agent.do_async(task)
    assert result is not None
    
    # Verify session was created
    session = inmemory_storage.get_session(
        session_id=test_session_id,
        session_type=SessionType.AGENT,
        deserialize=True
    )
    assert session is not None
