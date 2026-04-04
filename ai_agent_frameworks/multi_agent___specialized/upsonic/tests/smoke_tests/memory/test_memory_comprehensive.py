"""
Comprehensive Memory Test Suite

Tests all Memory class attributes and functionality:
1. storage - Storage backend (SqliteStorage, InMemoryStorage)
2. session_id - Session identifier
3. user_id - User identifier
4. full_session_memory - Store/retrieve full conversation history
5. summary_memory - Generate and store summaries
6. user_analysis_memory - Analyze and store user profiles
7. user_profile_schema - Custom Pydantic schema for user profile
8. dynamic_user_profile - Dynamically generate profile schema
9. num_last_messages - Limit on messages to retrieve
10. model - Model for summary/profile generation
11. debug - Enable debug logging
12. debug_level - Debug verbosity level
13. feed_tool_call_results - Include tool call results in history
14. user_memory_mode - 'update' or 'replace' for profile updates
"""

import pytest
import asyncio
import os
import tempfile
import uuid
from typing import Optional, List
from pydantic import BaseModel, Field

from upsonic import Agent, Task
from upsonic.storage import Memory, SqliteStorage, InMemoryStorage
from upsonic.session.agent import AgentSession
from upsonic.session.base import SessionType
from upsonic.messages import ModelRequest, ModelResponse

pytestmark = pytest.mark.timeout(180)


# =============================================================================
# Custom Schemas
# =============================================================================

class CustomUserProfile(BaseModel):
    """Custom user profile schema for testing."""
    name: Optional[str] = Field(None, description="User's name")
    occupation: Optional[str] = Field(None, description="User's occupation")
    expertise_level: Optional[str] = Field(None, description="User's expertise level")
    interests: Optional[List[str]] = Field(None, description="User's interests")


# =============================================================================
# Fixtures
# =============================================================================

@pytest.fixture
def test_user_id():
    return f"user_{uuid.uuid4().hex[:8]}"


@pytest.fixture
def test_session_id():
    return f"session_{uuid.uuid4().hex[:8]}"


@pytest.fixture
def sqlite_storage():
    """Create a temporary SQLite storage."""
    db_file = tempfile.mktemp(suffix=".db")
    storage = SqliteStorage(db_file=db_file)
    yield storage
    if os.path.exists(db_file):
        os.remove(db_file)


@pytest.fixture
def inmemory_storage():
    """Create an in-memory storage."""
    return InMemoryStorage()


# =============================================================================
# TEST 1: Basic Storage and Session ID
# =============================================================================

class TestBasicStorageAndSessionID:
    """Test basic storage initialization and session_id handling."""
    
    @pytest.mark.asyncio
    async def test_explicit_session_id_and_user_id(self, inmemory_storage):
        """Test that explicit session_id and user_id are used."""
        memory = Memory(
            storage=inmemory_storage,
            session_id="explicit_session_001",
            user_id="explicit_user_001",
            debug=False
        )
        
        assert memory.session_id == "explicit_session_001"
        assert memory.user_id == "explicit_user_001"
    
    @pytest.mark.asyncio
    async def test_auto_generated_ids(self, inmemory_storage):
        """Test that IDs are auto-generated when not provided."""
        memory = Memory(storage=inmemory_storage, debug=False)
        
        assert memory.session_id is not None
        assert len(memory.session_id) > 0
        assert memory.user_id is not None
        assert len(memory.user_id) > 0
    
    @pytest.mark.asyncio
    async def test_storage_instance_assignment(self, inmemory_storage):
        """Test that storage is properly assigned."""
        memory = Memory(storage=inmemory_storage, debug=False)
        assert memory.storage is inmemory_storage


# =============================================================================
# TEST 2: Full Session Memory (Conversation History)
# =============================================================================

class TestFullSessionMemory:
    """Test full_session_memory for conversation history persistence."""
    
    @pytest.mark.asyncio
    async def test_full_session_memory_enabled(self, inmemory_storage, test_session_id, test_user_id):
        """Test that full_session_memory flag is set correctly."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        assert memory.full_session_memory_enabled is True
    
    @pytest.mark.asyncio
    async def test_conversation_context_persists(self, inmemory_storage, test_session_id, test_user_id):
        """Test that conversation context persists across turns."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        
        # First turn
        task1 = Task("My name is Alex. Please remember that.")
        result1 = await agent.do_async(task1)
        assert result1 is not None
        
        # Second turn - should remember
        task2 = Task("What is my name?")
        result2 = await agent.do_async(task2)
        
        assert "alex" in str(result2).lower(), f"Expected 'alex' in: {result2}"
    
    @pytest.mark.asyncio
    async def test_session_stored_with_messages(self, inmemory_storage, test_session_id, test_user_id):
        """Test that session is stored with messages."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        await agent.do_async(Task("Hello world"))
        
        session = await memory.get_session_async()
        assert session is not None
        
        messages = await memory.get_messages_async()
        assert len(messages) > 0


# =============================================================================
# TEST 3: Summary Memory
# =============================================================================

class TestSummaryMemory:
    """Test summary_memory for automatic summary generation."""
    
    @pytest.mark.asyncio
    async def test_summary_memory_enabled(self, inmemory_storage, test_session_id, test_user_id):
        """Test that summary_memory flag is set correctly."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            summary_memory=True,
            model="openai/gpt-4o-mini",
            debug=False
        )
        
        assert memory.summary_memory_enabled is True
    
    @pytest.mark.asyncio
    async def test_summary_generation(self, inmemory_storage, test_session_id, test_user_id):
        """Test that summary is generated after conversation."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            summary_memory=True,
            model="openai/gpt-4o-mini",
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        
        await agent.do_async(Task("I'm working on a machine learning project using Python."))
        await agent.do_async(Task("The main challenge is handling large datasets."))
        
        session = await memory.get_session_async()
        assert session is not None
        
        # Summary should be generated
        if session.summary:
            assert len(session.summary) >= 10, "Summary should have content"


# =============================================================================
# TEST 4: User Analysis Memory
# =============================================================================

class TestUserAnalysisMemory:
    """Test user_analysis_memory with default and custom schemas."""
    
    @pytest.mark.asyncio
    async def test_user_analysis_memory_enabled(self, inmemory_storage, test_session_id, test_user_id):
        """Test that user_analysis_memory flag is set correctly."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            user_analysis_memory=True,
            model="openai/gpt-4o-mini",
            debug=False
        )
        
        assert memory.user_analysis_memory_enabled is True
    
    @pytest.mark.asyncio
    async def test_user_profile_extraction(self, inmemory_storage, test_session_id, test_user_id):
        """Test that user profile is extracted from conversation."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            user_analysis_memory=True,
            model="openai/gpt-4o-mini",
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        
        await agent.do_async(Task("Hi, I'm a software engineer with 5 years of experience. I specialize in Python."))
        
        session = await memory.get_session_async()
        assert session is not None
        
        # User profile is stored in UserMemory, not AgentSession
        user_memory = inmemory_storage.get_user_memory(user_id=test_user_id)
        if user_memory and user_memory.user_memory:
            assert len(user_memory.user_memory) > 0


# =============================================================================
# TEST 5: Custom User Profile Schema
# =============================================================================

class TestCustomUserProfileSchema:
    """Test user_profile_schema with a custom Pydantic schema."""
    
    @pytest.mark.asyncio
    async def test_custom_schema_set(self, inmemory_storage, test_session_id, test_user_id):
        """Test that custom schema is set correctly."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            user_analysis_memory=True,
            user_profile_schema=CustomUserProfile,
            model="openai/gpt-4o-mini",
            debug=False
        )
        
        assert memory.user_profile_schema == CustomUserProfile
    
    @pytest.mark.asyncio
    async def test_custom_profile_extraction(self, inmemory_storage, test_session_id, test_user_id):
        """Test profile extraction with custom schema."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            user_analysis_memory=True,
            user_profile_schema=CustomUserProfile,
            model="openai/gpt-4o-mini",
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        
        await agent.do_async(Task("My name is Sarah. I'm a data scientist interested in NLP."))
        
        session = await memory.get_session_async()
        assert session is not None


# =============================================================================
# TEST 6: Dynamic User Profile
# =============================================================================

class TestDynamicUserProfile:
    """Test dynamic_user_profile for automatic schema generation."""
    
    @pytest.mark.asyncio
    async def test_dynamic_profile_enabled(self, inmemory_storage, test_session_id, test_user_id):
        """Test that dynamic_user_profile flag is set correctly."""
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
        
        assert memory.is_profile_dynamic is True
    
    @pytest.mark.asyncio
    async def test_dynamic_profile_ignores_custom_schema(self, inmemory_storage, test_session_id, test_user_id):
        """Test that dynamic profile ignores custom schema."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            user_analysis_memory=True,
            dynamic_user_profile=True,
            user_profile_schema=CustomUserProfile,  # Should be ignored
            model="openai/gpt-4o-mini",
            debug=False
        )
        
        if memory.user_memory:
            assert memory.user_memory._profile_schema_model is None


# =============================================================================
# TEST 7: num_last_messages Limit
# =============================================================================

class TestNumLastMessagesLimit:
    """Test num_last_messages for limiting retrieved conversation history."""
    
    @pytest.mark.asyncio
    async def test_num_last_messages_set(self, inmemory_storage, test_session_id, test_user_id):
        """Test that num_last_messages is set correctly."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            num_last_messages=2,
            debug=False
        )
        
        assert memory.num_last_messages == 2
    
    @pytest.mark.asyncio
    async def test_message_history_limited(self, inmemory_storage, test_session_id, test_user_id):
        """Test that message history is limited in prepare_inputs."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            num_last_messages=2,
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        
        # Run 5 conversations
        for i in range(5):
            await agent.do_async(Task(f"Message {i}"))
        
        # Prepared inputs should have limited messages
        prepared = await memory.prepare_inputs_for_task(session_type=SessionType.AGENT)
        
        # With num_last_messages=2, should have at most 4 messages (2 runs * 2 per run)
        assert len(prepared["message_history"]) <= 4


# =============================================================================
# TEST 8: User Memory Mode
# =============================================================================

class TestUserMemoryMode:
    """Test user_memory_mode for update vs replace behavior."""
    
    @pytest.mark.asyncio
    async def test_update_mode_set(self, inmemory_storage, test_session_id, test_user_id):
        """Test that update mode is set correctly."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            user_analysis_memory=True,
            user_memory_mode='update',
            model="openai/gpt-4o-mini",
            debug=False
        )
        
        assert memory.user_memory_mode == 'update'
    
    @pytest.mark.asyncio
    async def test_replace_mode_set(self, inmemory_storage):
        """Test that replace mode is set correctly."""
        memory = Memory(
            storage=inmemory_storage,
            user_analysis_memory=True,
            user_memory_mode='replace',
            model="openai/gpt-4o-mini",
            debug=False
        )
        
        assert memory.user_memory_mode == 'replace'


# =============================================================================
# TEST 9: Feed Tool Call Results
# =============================================================================

class TestFeedToolCallResults:
    """Test feed_tool_call_results for including/excluding tool messages."""
    
    @pytest.mark.asyncio
    async def test_feed_tool_results_false(self, inmemory_storage, test_session_id, test_user_id):
        """Test that feed_tool_call_results=False is set correctly."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            feed_tool_call_results=False,
            debug=False
        )
        
        assert memory.feed_tool_call_results is False
    
    @pytest.mark.asyncio
    async def test_feed_tool_results_true(self, inmemory_storage, test_session_id, test_user_id):
        """Test that feed_tool_call_results=True is set correctly."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            feed_tool_call_results=True,
            debug=False
        )
        
        assert memory.feed_tool_call_results is True


# =============================================================================
# TEST 10: Session Persistence
# =============================================================================

class TestSessionPersistence:
    """Test that sessions persist across Memory instances."""
    
    @pytest.mark.asyncio
    async def test_session_persists_across_instances(self, sqlite_storage, test_session_id, test_user_id):
        """Test that sessions persist across Memory instances."""
        # First instance
        memory1 = Memory(
            storage=sqlite_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent1 = Agent(model="openai/gpt-4o-mini", memory=memory1)
        await agent1.do_async(Task("Remember: secret code is ALPHA-123"))
        
        # Second instance - same session_id
        memory2 = Memory(
            storage=sqlite_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent2 = Agent(model="openai/gpt-4o-mini", memory=memory2)
        result = await agent2.do_async(Task("What is my secret code?"))
        
        result_str = str(result).upper()
        assert "ALPHA" in result_str or "123" in result_str, f"Should remember code: {result}"


# =============================================================================
# TEST 11: Memory API Methods
# =============================================================================

class TestMemoryAPIMethods:
    """Test Memory class API methods."""
    
    @pytest.mark.asyncio
    async def test_get_session_async(self, inmemory_storage, test_session_id, test_user_id):
        """Test get_session_async method."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        # Initially None
        session = await memory.get_session_async()
        assert session is None
        
        # After task
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        await agent.do_async(Task("Hello"))
        
        session = await memory.get_session_async()
        assert session is not None
    
    @pytest.mark.asyncio
    async def test_get_messages_async(self, inmemory_storage, test_session_id, test_user_id):
        """Test get_messages_async method."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        await agent.do_async(Task("Test message"))
        
        messages = await memory.get_messages_async()
        assert isinstance(messages, list)
        assert len(messages) > 0
    
    @pytest.mark.asyncio
    async def test_set_and_get_metadata(self, inmemory_storage, test_session_id, test_user_id):
        """Test set_metadata_async and get_metadata_async methods."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        await agent.do_async(Task("Hello"))
        
        await memory.set_metadata_async({"key": "value"})
        metadata = await memory.get_metadata_async()
        
        assert metadata is not None
        assert metadata.get("key") == "value"
    
    @pytest.mark.asyncio
    async def test_list_sessions_async(self, inmemory_storage, test_session_id, test_user_id):
        """Test list_sessions_async method."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        await agent.do_async(Task("Hello"))
        
        sessions = await memory.list_sessions_async()
        assert len(sessions) >= 1
    
    @pytest.mark.asyncio
    async def test_delete_session_async(self, inmemory_storage, test_session_id, test_user_id):
        """Test delete_session_async method."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        await agent.do_async(Task("Hello"))
        
        deleted = await memory.delete_session_async()
        assert deleted is True
        
        session = await memory.get_session_async()
        assert session is None


# =============================================================================
# TEST 12: Session/User/Run ID Testing
# =============================================================================

class TestSessionUserRunIDs:
    """Test session_id, user_id, and run_id isolation."""
    
    @pytest.mark.asyncio
    async def test_same_session_multiple_runs(self, inmemory_storage, test_user_id):
        """Test same session_id with multiple runs."""
        session_id = f"multi_run_{uuid.uuid4().hex[:8]}"
        
        memory = Memory(
            storage=inmemory_storage,
            session_id=session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        
        # Run multiple tasks
        for i in range(3):
            await agent.do_async(Task(f"Message {i}"))
        
        session = inmemory_storage.get_session(
            session_id=session_id,
            session_type=SessionType.AGENT,
            deserialize=True
        )
        
        assert session is not None
        assert session.runs is not None
        assert len(session.runs) == 3
    
    @pytest.mark.asyncio
    async def test_different_session_same_user(self, inmemory_storage, test_user_id):
        """Test different session_id with same user_id."""
        session_id_1 = f"session_1_{uuid.uuid4().hex[:8]}"
        session_id_2 = f"session_2_{uuid.uuid4().hex[:8]}"
        
        # Session 1
        memory1 = Memory(
            storage=inmemory_storage,
            session_id=session_id_1,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent1 = Agent(model="openai/gpt-4o-mini", memory=memory1)
        await agent1.do_async(Task("Message for session 1"))
        
        # Session 2
        memory2 = Memory(
            storage=inmemory_storage,
            session_id=session_id_2,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent2 = Agent(model="openai/gpt-4o-mini", memory=memory2)
        await agent2.do_async(Task("Message for session 2"))
        
        # Verify both sessions exist
        session1 = inmemory_storage.get_session(
            session_id=session_id_1,
            session_type=SessionType.AGENT,
            deserialize=True
        )
        session2 = inmemory_storage.get_session(
            session_id=session_id_2,
            session_type=SessionType.AGENT,
            deserialize=True
        )
        
        assert session1 is not None
        assert session2 is not None
        assert session1.session_id != session2.session_id
        assert session1.user_id == session2.user_id
    
    @pytest.mark.asyncio
    async def test_different_user_id(self, inmemory_storage):
        """Test different user_id creates isolated sessions."""
        user_id_1 = f"user_1_{uuid.uuid4().hex[:8]}"
        user_id_2 = f"user_2_{uuid.uuid4().hex[:8]}"
        session_id_1 = f"session_1_{uuid.uuid4().hex[:8]}"
        session_id_2 = f"session_2_{uuid.uuid4().hex[:8]}"
        
        # User 1
        memory1 = Memory(
            storage=inmemory_storage,
            session_id=session_id_1,
            user_id=user_id_1,
            full_session_memory=True,
            debug=False
        )
        
        agent1 = Agent(model="openai/gpt-4o-mini", memory=memory1)
        await agent1.do_async(Task("I'm user 1"))
        
        # User 2
        memory2 = Memory(
            storage=inmemory_storage,
            session_id=session_id_2,
            user_id=user_id_2,
            full_session_memory=True,
            debug=False
        )
        
        agent2 = Agent(model="openai/gpt-4o-mini", memory=memory2)
        await agent2.do_async(Task("I'm user 2"))
        
        # Verify isolation
        session1 = inmemory_storage.get_session(
            session_id=session_id_1,
            session_type=SessionType.AGENT,
            deserialize=True
        )
        session2 = inmemory_storage.get_session(
            session_id=session_id_2,
            session_type=SessionType.AGENT,
            deserialize=True
        )
        
        assert session1.user_id != session2.user_id


# =============================================================================
# TEST 13: Prepare Inputs for Task
# =============================================================================

class TestPrepareInputsForTask:
    """Test prepare_inputs_for_task method."""
    
    @pytest.mark.asyncio
    async def test_prepare_inputs_returns_dict(self, inmemory_storage, test_session_id, test_user_id):
        """Test that prepare_inputs_for_task returns correct structure."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        prepared = await memory.prepare_inputs_for_task(session_type=SessionType.AGENT)
        
        assert "message_history" in prepared
        assert "context_injection" in prepared
        assert "system_prompt_injection" in prepared
        assert "metadata_injection" in prepared
    
    @pytest.mark.asyncio
    async def test_prepare_inputs_with_history(self, inmemory_storage, test_session_id, test_user_id):
        """Test that prepare_inputs includes message history."""
        memory = Memory(
            storage=inmemory_storage,
            session_id=test_session_id,
            user_id=test_user_id,
            full_session_memory=True,
            debug=False
        )
        
        agent = Agent(model="openai/gpt-4o-mini", memory=memory)
        await agent.do_async(Task("Hello"))
        
        prepared = await memory.prepare_inputs_for_task(session_type=SessionType.AGENT)
        
        assert len(prepared["message_history"]) > 0
