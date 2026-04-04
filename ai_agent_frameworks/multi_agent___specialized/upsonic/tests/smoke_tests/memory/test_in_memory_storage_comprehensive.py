"""Comprehensive test suite for InMemoryStorage.

This test suite verifies ALL methods and attributes of InMemoryStorage:
- Initialization (custom tables, id)
- Table management (existence checks)
- Session operations (upsert, get, delete, bulk operations)
- User memory operations (upsert, get, delete, bulk operations)
- Utility methods (clear_all, close)
- Edge cases and error handling
- Deserialize flag behavior
- Filtering, pagination, and sorting
"""
import sys
import time
from typing import Any, Dict, List, Optional

from upsonic.session.agent import AgentSession, RunData
from upsonic.session.base import SessionType
from upsonic.storage.schemas import UserMemory
from upsonic.storage.in_memory import InMemoryStorage
from upsonic.run.agent.output import AgentRunOutput
from upsonic.run.base import RunStatus
from upsonic.messages.messages import ModelRequest, ModelResponse, TextPart, UserPromptPart, ToolCallPart, ThinkingPart

# Force unbuffered output
sys.stdout.reconfigure(line_buffering=True) if hasattr(sys.stdout, 'reconfigure') else None

# Test result tracking
test_results: List[Dict[str, Any]] = []


def log_test_result(test_name: str, passed: bool, message: str = "") -> None:
    """Log test result."""
    status = "✅ PASSED" if passed else "❌ FAILED"
    result = f"{status}: {test_name}"
    if message:
        result += f" - {message}"
    print(result, flush=True)
    test_results.append({"name": test_name, "passed": passed, "message": message})


def print_separator(title: str) -> None:
    """Print test section separator."""
    print("\n" + "=" * 80, flush=True)
    print(f"  {title}", flush=True)
    print("=" * 80 + "\n", flush=True)


def create_test_agentsession(
    session_id: str,
    agent_id: Optional[str] = None,
    user_id: Optional[str] = None,
    session_type: SessionType = SessionType.AGENT,
    created_at: Optional[int] = None,
) -> AgentSession:
    """Create a test AgentSession with comprehensive runs and messages using REAL classes."""
    current_time = created_at or int(time.time())
    
    # Create REAL AgentRunOutput objects
    run_output_1 = AgentRunOutput(
        run_id="run_001",
        session_id=session_id,
        user_id=user_id or f"user_{session_id}",
        agent_id=agent_id or f"agent_{session_id}",
        agent_name="TestAgent",
        status=RunStatus.completed,
        accumulated_text="Analysis complete.",
        output="Result: Strong growth.",
    )
    
    run_output_2 = AgentRunOutput(
        run_id="run_002",
        session_id=session_id,
        user_id=user_id or f"user_{session_id}",
        agent_id=agent_id or f"agent_{session_id}",
        agent_name="TestAgent",
        status=RunStatus.paused,
    )
    
    # Create REAL RunData objects
    test_runs = {
        "run_001": RunData(output=run_output_1),
        "run_002": RunData(output=run_output_2),
    }
    
    # Create REAL ModelRequest and ModelResponse objects
    test_messages = [
        ModelRequest(parts=[UserPromptPart(content="Analyze data")], run_id="run_001"),
        ModelResponse(
            parts=[
                TextPart(content="I'll analyze the data."),
                ToolCallPart(tool_name="calculate", tool_call_id="call_1", args={"data": [1, 2, 3]}),
            ],
            model_name="gpt-4",
        ),
        ModelResponse(
            parts=[
                TextPart(content="Analysis complete."),
                ThinkingPart(content="Data shows consistent values."),
            ],
            model_name="gpt-4",
        ),
    ]
    
    return AgentSession(
        session_id=session_id,
        agent_id=agent_id or f"agent_{session_id}",
        user_id=user_id or f"user_{session_id}",
        session_type=session_type,
        session_data={"test": "data", "nested": {"level1": {"array": [1, 2, {"inner": "dict"}]}}},
        agent_data={"agent_name": "TestAgent", "model": "gpt-4"},
        metadata={"key": "value", "tags": ["test"]},
        runs=test_runs,
        messages=test_messages,
        summary="Test session with REAL classes",
        created_at=current_time,
        updated_at=int(time.time()),
    )


# ============================================================================
# TEST 1: Initialization
# ============================================================================
def test_initialization():
    """Test InMemoryStorage initialization with various configurations."""
    print_separator("TEST 1: Initialization")
    
    # Test 1.1: Default initialization
    try:
        storage = InMemoryStorage()
        assert storage.session_table_name == "upsonic_sessions"
        assert storage.user_memory_table_name == "upsonic_user_memories"
        assert storage.id is not None
        assert isinstance(storage.id, str)
        assert len(storage.id) > 0
        log_test_result("Default initialization", True)
    except Exception as e:
        log_test_result("Default initialization", False, str(e))
        raise
    
    # Test 1.2: Custom table names
    try:
        storage = InMemoryStorage(
            session_table="custom_sessions",
            user_memory_table="custom_memories",
        )
        assert storage.session_table_name == "custom_sessions"
        assert storage.user_memory_table_name == "custom_memories"
        log_test_result("Custom table names", True)
    except Exception as e:
        log_test_result("Custom table names", False, str(e))
        raise
    
    # Test 1.3: Custom ID
    try:
        custom_id = "test_storage_123"
        storage = InMemoryStorage(id=custom_id)
        assert storage.id == custom_id
        log_test_result("Custom ID", True)
    except Exception as e:
        log_test_result("Custom ID", False, str(e))
        raise
    
    # Test 1.4: Verify internal storage is initialized
    try:
        storage = InMemoryStorage()
        assert isinstance(storage._sessions, list)
        assert isinstance(storage._user_memories, list)
        assert len(storage._sessions) == 0
        assert len(storage._user_memories) == 0
        log_test_result("Internal storage initialization", True)
    except Exception as e:
        log_test_result("Internal storage initialization", False, str(e))
        raise


# ============================================================================
# TEST 2: Table Management
# ============================================================================
def test_table_management():
    """Test table existence checks."""
    print_separator("TEST 2: Table Management")
    
    try:
        storage = InMemoryStorage()
        
        # Test 2.1: table_exists (always returns True for in-memory)
        exists = storage.table_exists(storage.session_table_name)
        assert exists is True, "table_exists should always return True for in-memory storage"
        log_test_result("table_exists (always True)", True)
        
        # Test 2.2: table_exists with any name
        exists2 = storage.table_exists("any_table_name")
        assert exists2 is True
        log_test_result("table_exists (any name)", True)
        
        # Test 2.3: Verify no actual table creation needed
        assert len(storage._sessions) == 0
        assert len(storage._user_memories) == 0
        log_test_result("No table creation needed", True)
        
    except Exception as e:
        log_test_result("Table Management", False, str(e))
        raise


# ============================================================================
# TEST 3: Session Operations - Upsert
# ============================================================================
def test_session_upsert():
    """Test session upsert operations."""
    print_separator("TEST 3: Session Upsert Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Test 3.1: Upsert single session
        session_id = "test_session_001"
        session = create_test_agentsession(session_id)
        
        result = storage.upsert_session(session, deserialize=True)
        assert result is not None
        assert isinstance(result, AgentSession)
        assert result.session_id == session_id
        assert result.agent_id == session.agent_id
        log_test_result("upsert_session (single, deserialize=True)", True)
        
        # Test 3.2: Upsert with deserialize=False
        session_id2 = "test_session_002"
        session2 = create_test_agentsession(session_id2)
        result2 = storage.upsert_session(session2, deserialize=False)
        assert result2 is not None
        assert isinstance(result2, dict)
        assert result2["session_id"] == session_id2
        log_test_result("upsert_session (deserialize=False)", True)
        
        # Test 3.3: Upsert without session_id (should raise ValueError)
        try:
            session_no_id = AgentSession(session_id="")
            storage.upsert_session(session_no_id)
            log_test_result("upsert_session (no session_id validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("upsert_session (no session_id validation)", True)
        
        # Test 3.4: Update existing session
        session.agent_data = {"agent_name": "UpdatedAgent"}
        session.summary = "Updated summary"
        updated = storage.upsert_session(session, deserialize=True)
        assert updated is not None
        assert updated.summary == "Updated summary"
        assert updated.agent_data["agent_name"] == "UpdatedAgent"
        log_test_result("upsert_session (update existing)", True)
        
        # Test 3.5: Upsert with different session types
        session_agent = create_test_agentsession("session_agent", session_type=SessionType.AGENT)
        result_agent = storage.upsert_session(session_agent, deserialize=True)
        assert result_agent.session_type == SessionType.AGENT
        log_test_result("upsert_session (AGENT type)", True)
        
        # Note: AgentSession is always stored as AGENT type regardless of session_type parameter
        # TeamSession and WorkflowSession classes are not yet implemented
        session_agent2 = create_test_agentsession("session_agent2", session_type=SessionType.AGENT)
        result_agent2 = storage.upsert_session(session_agent2, deserialize=True)
        assert result_agent2.session_type == SessionType.AGENT
        log_test_result("upsert_session (AGENT type persistence)", True)
        
        # Test 3.6: Preserve created_at on update
        original_created_at = session.created_at
        original_updated_at = session.updated_at
        time.sleep(1)  # Delay to ensure updated_at changes
        updated2 = storage.upsert_session(session, deserialize=True)
        assert updated2.created_at == original_created_at, "created_at should be preserved"
        assert updated2.updated_at >= original_updated_at, "updated_at should be updated or equal"
        assert updated2.updated_at > original_created_at, "updated_at should be greater than original created_at"
        log_test_result("upsert_session (preserve created_at)", True)
        
        # Test 3.7: Verify session is stored
        assert storage.get_session_count() > 0
        log_test_result("upsert_session (verify storage)", True)
        
        # Test 3.8: CRITICAL - Verify runs and messages are correctly preserved
        session_with_data = create_test_agentsession("session_full_data")
        result_full = storage.upsert_session(session_with_data, deserialize=True)
        
        # Verify runs are correctly preserved
        assert result_full.runs is not None, "runs should not be None"
        assert isinstance(result_full.runs, dict), "runs should be a dict"
        assert len(result_full.runs) == 2, f"runs should have 2 entries, got {len(result_full.runs)}"
        assert "run_001" in result_full.runs, "run_001 should be in runs"
        assert "run_002" in result_full.runs, "run_002 should be in runs"
        
        # Verify RunData and AgentRunOutput structure
        run_001 = result_full.runs["run_001"]
        assert isinstance(run_001, RunData), f"run_001 should be RunData, got {type(run_001)}"
        assert run_001.output is not None, "run_001.output should not be None"
        assert isinstance(run_001.output, AgentRunOutput), f"run_001.output should be AgentRunOutput"
        assert run_001.output.run_id == "run_001", f"run_id mismatch: {run_001.output.run_id}"
        assert run_001.output.status == RunStatus.completed, f"status mismatch: {run_001.output.status}"
        
        run_002 = result_full.runs["run_002"]
        assert isinstance(run_002, RunData), f"run_002 should be RunData, got {type(run_002)}"
        assert run_002.output.status == RunStatus.paused, f"status mismatch: {run_002.output.status}"
        log_test_result("runs field round-trip verification", True)
        
        # Verify messages are correctly preserved
        assert result_full.messages is not None, "messages should not be None"
        assert isinstance(result_full.messages, list), "messages should be a list"
        assert len(result_full.messages) == 3, f"messages should have 3 entries, got {len(result_full.messages)}"
        
        # Verify message types
        msg_0 = result_full.messages[0]
        assert isinstance(msg_0, ModelRequest), f"messages[0] should be ModelRequest, got {type(msg_0)}"
        
        msg_1 = result_full.messages[1]
        assert isinstance(msg_1, ModelResponse), f"messages[1] should be ModelResponse, got {type(msg_1)}"
        assert msg_1.model_name == "gpt-4", f"model_name mismatch: {msg_1.model_name}"
        
        has_tool_call = any(isinstance(p, ToolCallPart) for p in msg_1.parts)
        assert has_tool_call, "messages[1] should have a ToolCallPart"
        
        msg_2 = result_full.messages[2]
        has_thinking = any(isinstance(p, ThinkingPart) for p in msg_2.parts)
        assert has_thinking, "messages[2] should have a ThinkingPart"
        log_test_result("messages field round-trip verification", True)
        
    except Exception as e:
        log_test_result("Session Upsert", False, str(e))
        raise


# ============================================================================
# TEST 4: Session Operations - Bulk Upsert
# ============================================================================
def test_session_bulk_upsert():
    """Test bulk session upsert operations."""
    print_separator("TEST 4: Session Bulk Upsert Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Test 4.1: Bulk upsert multiple sessions
        sessions = [
            create_test_agentsession(f"bulk_session_{i}", user_id=f"user_{i}")
            for i in range(5)
        ]
        
        results = storage.upsert_sessions(sessions, deserialize=True)
        assert len(results) == 5
        assert all(isinstance(r, AgentSession) for r in results)
        log_test_result("upsert_sessions (bulk, deserialize=True)", True)
        
        # Test 4.2: Bulk upsert with deserialize=False
        sessions2 = [
            create_test_agentsession(f"bulk_session2_{i}")
            for i in range(3)
        ]
        results2 = storage.upsert_sessions(sessions2, deserialize=False)
        assert len(results2) == 3
        assert all(isinstance(r, dict) for r in results2)
        log_test_result("upsert_sessions (bulk, deserialize=False)", True)
        
        # Test 4.3: Bulk upsert empty list
        results3 = storage.upsert_sessions([], deserialize=True)
        assert results3 == []
        log_test_result("upsert_sessions (empty list)", True)
        
        # Test 4.4: Bulk upsert with missing session_id (should raise ValueError)
        try:
            invalid_sessions = [
                create_test_agentsession("valid_session"),
                AgentSession(session_id=""),
            ]
            storage.upsert_sessions(invalid_sessions)
            log_test_result("upsert_sessions (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("upsert_sessions (validation)", True)
        
        # Test 4.5: Bulk upsert update existing
        sessions[0].summary = "Bulk updated summary"
        updated_results = storage.upsert_sessions([sessions[0]], deserialize=True)
        assert updated_results[0].summary == "Bulk updated summary"
        log_test_result("upsert_sessions (update existing)", True)
        
        # Test 4.6: Bulk upsert mix of new and existing
        new_sessions = [
            create_test_agentsession(f"new_bulk_{i}")
            for i in range(2)
        ]
        mixed_sessions = [sessions[0]] + new_sessions
        mixed_results = storage.upsert_sessions(mixed_sessions, deserialize=True)
        assert len(mixed_results) == 3
        log_test_result("upsert_sessions (mix new/existing)", True)
        
    except Exception as e:
        log_test_result("Session Bulk Upsert", False, str(e))
        raise


# ============================================================================
# TEST 5: Session Operations - Get
# ============================================================================
def test_session_get():
    """Test session retrieval operations."""
    print_separator("TEST 5: Session Get Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Setup: Create test sessions
        sessions = [
            create_test_agentsession(f"get_session_{i}", user_id="user_001", agent_id=f"agent_{i}")
            for i in range(5)
        ]
        storage.upsert_sessions(sessions)
        
        # Test 5.1: Get session by ID
        result = storage.get_session(session_id="get_session_0", deserialize=True)
        assert result is not None
        assert isinstance(result, AgentSession)
        assert result.session_id == "get_session_0"
        log_test_result("get_session (by ID, deserialize=True)", True)
        
        # Test 5.2: Get session with deserialize=False
        result2 = storage.get_session(session_id="get_session_1", deserialize=False)
        assert result2 is not None
        assert isinstance(result2, dict)
        assert result2["session_id"] == "get_session_1"
        log_test_result("get_session (by ID, deserialize=False)", True)
        
        # Test 5.3: Get non-existent session
        result3 = storage.get_session(session_id="non_existent", deserialize=True)
        assert result3 is None
        log_test_result("get_session (non-existent)", True)
        
        # Test 5.4: Get latest session (no session_id)
        result4 = storage.get_session(session_id=None, deserialize=True)
        assert result4 is not None
        assert isinstance(result4, AgentSession)
        log_test_result("get_session (latest, no ID)", True)
        
        # Test 5.5: Get session with user_id filter
        result5 = storage.get_session(
            session_id=None,
            user_id="user_001",
            deserialize=True
        )
        assert result5 is not None
        assert result5.user_id == "user_001"
        log_test_result("get_session (with user_id filter)", True)
        
        # Test 5.6: Get session with agent_id filter
        result6 = storage.get_session(
            session_id=None,
            agent_id="agent_2",
            deserialize=True
        )
        assert result6 is not None
        assert result6.agent_id == "agent_2"
        log_test_result("get_session (with agent_id filter)", True)
        
        # Test 5.7: Get session with session_type filter
        result7 = storage.get_session(
            session_id="get_session_0",
            session_type=SessionType.AGENT,
            deserialize=True
        )
        assert result7 is not None
        assert result7.session_type == SessionType.AGENT
        log_test_result("get_session (with session_type filter)", True)
        
        # Test 5.8: Get latest with no sessions (empty storage)
        empty_storage = InMemoryStorage()
        result8 = empty_storage.get_session(deserialize=True)
        assert result8 is None
        log_test_result("get_session (latest, empty storage)", True)
        
        # Test 5.9: Get session with wrong filter (should return None)
        result9 = storage.get_session(
            session_id="get_session_0",
            user_id="wrong_user",
            deserialize=True
        )
        assert result9 is None
        log_test_result("get_session (wrong filter returns None)", True)
        
    except Exception as e:
        log_test_result("Session Get", False, str(e))
        raise


# ============================================================================
# TEST 6: Session Operations - Get Multiple
# ============================================================================
def test_session_get_multiple():
    """Test multiple session retrieval operations."""
    print_separator("TEST 6: Session Get Multiple Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Setup: Create test sessions with different attributes
        sessions = []
        for i in range(10):
            session = create_test_agentsession(
                f"multi_session_{i}",
                user_id=f"user_{i % 3}",  # 3 different users
                agent_id=f"agent_{i % 2}",  # 2 different agents
            )
            sessions.append(session)
        storage.upsert_sessions(sessions)
        
        # Test 6.1: Get all sessions
        all_sessions, count = storage.get_sessions(
            session_ids=None,
            deserialize=False
        )
        assert isinstance(all_sessions, list)
        assert isinstance(count, int)
        assert len(all_sessions) == 10
        assert count == 10
        log_test_result("get_sessions (all, deserialize=False)", True)
        
        # Test 6.2: Get all sessions with deserialize=True
        all_sessions2 = storage.get_sessions(
            session_ids=None,
            deserialize=True
        )
        assert isinstance(all_sessions2, list)
        assert all(isinstance(s, AgentSession) for s in all_sessions2)
        assert len(all_sessions2) == 10
        log_test_result("get_sessions (all, deserialize=True)", True)
        
        # Test 6.3: Get sessions by IDs
        session_ids = ["multi_session_0", "multi_session_1", "multi_session_2"]
        results = storage.get_sessions(
            session_ids=session_ids,
            deserialize=True
        )
        assert len(results) == 3
        assert all(s.session_id in session_ids for s in results)
        log_test_result("get_sessions (by IDs)", True)
        
        # Test 6.4: Get sessions with user_id filter
        results2 = storage.get_sessions(
            session_ids=None,
            user_id="user_0",
            deserialize=True
        )
        assert all(s.user_id == "user_0" for s in results2)
        log_test_result("get_sessions (with user_id filter)", True)
        
        # Test 6.5: Get sessions with agent_id filter
        results3 = storage.get_sessions(
            session_ids=None,
            agent_id="agent_0",
            deserialize=True
        )
        assert all(s.agent_id == "agent_0" for s in results3)
        log_test_result("get_sessions (with agent_id filter)", True)
        
        # Test 6.6: Get sessions with session_type filter
        results4 = storage.get_sessions(
            session_ids=None,
            session_type=SessionType.AGENT,
            deserialize=True
        )
        assert all(s.session_type == SessionType.AGENT for s in results4)
        log_test_result("get_sessions (with session_type filter)", True)
        
        # Test 6.7: Get sessions with limit
        results5 = storage.get_sessions(
            session_ids=None,
            limit=3,
            deserialize=True
        )
        assert len(results5) == 3
        log_test_result("get_sessions (with limit)", True)
        
        # Test 6.8: Get sessions with offset
        results6 = storage.get_sessions(
            session_ids=None,
            offset=2,
            deserialize=True
        )
        assert len(results6) <= 8  # Should skip first 2
        log_test_result("get_sessions (with offset)", True)
        
        # Test 6.9: Get sessions with limit and offset
        results7 = storage.get_sessions(
            session_ids=None,
            limit=2,
            offset=3,
            deserialize=True
        )
        assert len(results7) == 2
        log_test_result("get_sessions (with limit and offset)", True)
        
        # Test 6.10: Get sessions with sorting (asc)
        results8 = storage.get_sessions(
            session_ids=None,
            sort_by="created_at",
            sort_order="asc",
            deserialize=True
        )
        assert len(results8) == 10
        # Verify sorting (created_at should be in ascending order)
        created_ats = [s.created_at for s in results8 if s.created_at is not None]
        if len(created_ats) > 1:
            assert created_ats == sorted(created_ats)
        log_test_result("get_sessions (sort asc)", True)
        
        # Test 6.11: Get sessions with sorting (desc)
        results9 = storage.get_sessions(
            session_ids=None,
            sort_by="updated_at",
            sort_order="desc",
            deserialize=True
        )
        assert len(results9) == 10
        # Verify sorting (updated_at should be in descending order)
        updated_ats = [s.updated_at for s in results9 if s.updated_at is not None]
        if len(updated_ats) > 1:
            assert updated_ats == sorted(updated_ats, reverse=True)
        log_test_result("get_sessions (sort desc)", True)
        
        # Test 6.12: Get sessions with non-existent IDs
        results10 = storage.get_sessions(
            session_ids=["non_existent_1", "non_existent_2"],
            deserialize=True
        )
        assert len(results10) == 0
        log_test_result("get_sessions (non-existent IDs)", True)
        
    except Exception as e:
        log_test_result("Session Get Multiple", False, str(e))
        raise


# ============================================================================
# TEST 7: Session Operations - Delete
# ============================================================================
def test_session_delete():
    """Test session deletion operations."""
    print_separator("TEST 7: Session Delete Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Setup: Create test sessions
        sessions = [
            create_test_agentsession(f"delete_session_{i}")
            for i in range(5)
        ]
        storage.upsert_sessions(sessions)
        assert storage.get_session_count() == 5
        
        # Test 7.1: Delete single session
        deleted = storage.delete_session("delete_session_0")
        assert deleted is True
        assert storage.get_session_count() == 4
        log_test_result("delete_session (single)", True)
        
        # Test 7.2: Delete non-existent session
        deleted2 = storage.delete_session("non_existent")
        assert deleted2 is False
        assert storage.get_session_count() == 4
        log_test_result("delete_session (non-existent)", True)
        
        # Test 7.3: Delete with empty session_id (should raise ValueError)
        try:
            storage.delete_session("")
            log_test_result("delete_session (empty ID validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_session (empty ID validation)", True)
        
        # Test 7.4: Delete multiple sessions
        deleted_count = storage.delete_sessions(["delete_session_1", "delete_session_2"])
        assert deleted_count == 2
        assert storage.get_session_count() == 2
        log_test_result("delete_sessions (multiple)", True)
        
        # Test 7.5: Delete multiple with some non-existent
        deleted_count2 = storage.delete_sessions(["delete_session_3", "non_existent"])
        assert deleted_count2 == 1  # Only one actually deleted
        assert storage.get_session_count() == 1
        log_test_result("delete_sessions (with non-existent)", True)
        
        # Test 7.6: Delete multiple with empty list (should raise ValueError)
        try:
            storage.delete_sessions([])
            log_test_result("delete_sessions (empty list validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_sessions (empty list validation)", True)
        
        # Test 7.7: Verify remaining session
        remaining = storage.get_session("delete_session_4", deserialize=True)
        assert remaining is not None
        assert remaining.session_id == "delete_session_4"
        log_test_result("delete_sessions (verify remaining)", True)
        
    except Exception as e:
        log_test_result("Session Delete", False, str(e))
        raise


# ============================================================================
# TEST 8: User Memory Operations - Upsert
# ============================================================================
def test_user_memory_upsert():
    """Test user memory upsert operations."""
    print_separator("TEST 8: User Memory Upsert Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Test 8.1: Upsert single user memory (deserialize=True returns UserMemory)
        user_id = "user_001"
        memory_data = {"key": "value", "data": "test"}
        result = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=memory_data, agent_id="agent_001"),
            deserialize=True
        )
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == user_id
        assert result.user_memory == memory_data
        assert result.agent_id == "agent_001"
        log_test_result("upsert_user_memory (single, deserialize=True)", True)
        
        # Test 8.2: Upsert without user_id (should raise ValueError)
        try:
            storage.upsert_user_memory(
                user_memory=UserMemory(user_id="", user_memory={"test": "data"})
            )
            log_test_result("upsert_user_memory (empty user_id validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("upsert_user_memory (empty user_id validation)", True)
        
        # Test 8.3: Update existing user memory
        updated_memory = {"key": "updated_value", "new_data": "new_test"}
        result2 = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=updated_memory, agent_id="agent_001"),
            deserialize=True
        )
        assert isinstance(result2, UserMemory)
        assert result2.user_memory == updated_memory
        assert result2.user_id == user_id
        log_test_result("upsert_user_memory (update existing)", True)
        
        # Test 8.4: Upsert with team_id
        result3 = storage.upsert_user_memory(
            user_memory=UserMemory(user_id="user_002", user_memory={"team_data": "test"}, team_id="team_001"),
            deserialize=True
        )
        assert isinstance(result3, UserMemory)
        assert result3.team_id == "team_001"
        log_test_result("upsert_user_memory (with team_id)", True)
        
        # Test 8.5: Verify created_at and updated_at
        assert result.created_at is not None
        assert result.updated_at is not None
        log_test_result("upsert_user_memory (timestamps)", True)
        
        # Test 8.6: Preserve created_at on update
        original_created_at = result.created_at
        time.sleep(1)
        result4 = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory={"preserved": "test"}, agent_id="agent_001"),
            deserialize=True
        )
        assert isinstance(result4, UserMemory)
        assert result4.created_at == original_created_at
        assert result4.updated_at > original_created_at
        log_test_result("upsert_user_memory (preserve created_at)", True)
        
    except Exception as e:
        log_test_result("User Memory Upsert", False, str(e))
        raise


# ============================================================================
# TEST 9: User Memory Operations - Bulk Upsert
# ============================================================================
def test_user_memory_bulk_upsert():
    """Test bulk user memory upsert operations."""
    print_separator("TEST 9: User Memory Bulk Upsert Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Test 9.1: Bulk upsert multiple user memories
        memories = [
            UserMemory(
                user_id=f"bulk_user_{i}",
                user_memory={"data": f"memory_{i}"},
                agent_id=f"agent_{i % 2}",
            )
            for i in range(5)
        ]
        
        results = storage.upsert_user_memories(memories, deserialize=True)
        assert len(results) == 5
        assert all(isinstance(r, UserMemory) for r in results)
        log_test_result("upsert_user_memories (bulk)", True)
        
        # Test 9.2: Bulk upsert empty list
        results2 = storage.upsert_user_memories([])
        assert results2 == []
        log_test_result("upsert_user_memories (empty list)", True)
        
        # Test 9.3: Bulk upsert with missing user_id (should raise ValueError)
        try:
            invalid_memories = [
                UserMemory(user_id="valid_user", user_memory={"test": "data"}),
                UserMemory(user_id=None, user_memory={"test": "data"}),  # Missing user_id
            ]
            storage.upsert_user_memories(invalid_memories)
            log_test_result("upsert_user_memories (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("upsert_user_memories (validation)", True)
        
        # Test 9.4: Bulk upsert update existing
        memories[0].user_memory = {"updated": "data"}
        updated_results = storage.upsert_user_memories([memories[0]], deserialize=True)
        assert isinstance(updated_results[0], UserMemory)
        assert updated_results[0].user_memory["updated"] == "data"
        log_test_result("upsert_user_memories (update existing)", True)
        
        # Test 9.5: Verify all memories are stored
        all_memories, count = storage.get_user_memories(deserialize=False)
        assert count >= 5
        log_test_result("upsert_user_memories (verify storage)", True)
        
    except Exception as e:
        log_test_result("User Memory Bulk Upsert", False, str(e))
        raise


# ============================================================================
# TEST 10: User Memory Operations - Get
# ============================================================================
def test_user_memory_get():
    """Test user memory retrieval operations."""
    print_separator("TEST 10: User Memory Get Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Setup: Create test memories
        storage.upsert_user_memory(
            user_memory=UserMemory(user_id="get_user_001", user_memory={"data": "test1"}, agent_id="agent_001")
        )
        storage.upsert_user_memory(
            user_memory=UserMemory(user_id="get_user_002", user_memory={"data": "test2"}, agent_id="agent_002")
        )
        
        # Test 10.1: Get user memory by user_id (deserialize=True returns UserMemory)
        result = storage.get_user_memory(user_id="get_user_001", deserialize=True)
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == "get_user_001"
        assert result.user_memory["data"] == "test1"
        log_test_result("get_user_memory (by user_id, deserialize=True)", True)
        
        # Test 10.2: Get non-existent user memory
        result2 = storage.get_user_memory(user_id="non_existent", deserialize=True)
        assert result2 is None
        log_test_result("get_user_memory (non-existent)", True)
        
        # Test 10.3: Get latest user memory (no user_id)
        result3 = storage.get_user_memory(user_id=None, deserialize=True)
        assert result3 is not None
        assert isinstance(result3, UserMemory)
        assert result3.user_id is not None
        log_test_result("get_user_memory (latest, no user_id)", True)
        
        # Test 10.4: Get user memory with agent_id filter
        result4 = storage.get_user_memory(
            user_id="get_user_001",
            agent_id="agent_001",
            deserialize=True
        )
        assert result4 is not None
        assert isinstance(result4, UserMemory)
        assert result4.agent_id == "agent_001"
        log_test_result("get_user_memory (with agent_id filter)", True)
        
        # Test 10.5: Get user memory with wrong agent_id filter (should return None)
        result5 = storage.get_user_memory(
            user_id="get_user_001",
            agent_id="wrong_agent",
            deserialize=True
        )
        assert result5 is None
        log_test_result("get_user_memory (wrong agent_id filter)", True)
        
        # Test 10.6: Get user memory with team_id filter
        storage.upsert_user_memory(
            user_memory=UserMemory(user_id="get_user_003", user_memory={"data": "test3"}, team_id="team_001")
        )
        result6 = storage.get_user_memory(
            user_id="get_user_003",
            team_id="team_001",
            deserialize=True
        )
        assert result6 is not None
        assert isinstance(result6, UserMemory)
        assert result6.team_id == "team_001"
        log_test_result("get_user_memory (with team_id filter)", True)
        
    except Exception as e:
        log_test_result("User Memory Get", False, str(e))
        raise


# ============================================================================
# TEST 11: User Memory Operations - Get Multiple
# ============================================================================
def test_user_memory_get_multiple():
    """Test multiple user memory retrieval operations."""
    print_separator("TEST 11: User Memory Get Multiple Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Setup: Create test memories
        for i in range(10):
            user_memory_dict = {"user_id": f"multi_user_{i}", "user_memory": {"data": f"memory_{i}"}, "agent_id": f"agent_{i % 2}"}
            if i % 2 == 0:
                user_memory_dict["team_id"] = f"team_{i % 3}"
            storage.upsert_user_memory(user_memory=UserMemory(**user_memory_dict))
        
        # Test 11.1: Get all user memories (deserialize=True returns List[UserMemory])
        all_memories = storage.get_user_memories(deserialize=True)
        assert isinstance(all_memories, list)
        assert len(all_memories) >= 10
        assert all(isinstance(m, UserMemory) for m in all_memories)
        log_test_result("get_user_memories (all, deserialize=True)", True)
        
        # Test 11.2: Get all user memories (deserialize=False returns tuple)
        all_memories_raw, count = storage.get_user_memories(deserialize=False)
        assert isinstance(all_memories_raw, list)
        assert isinstance(count, int)
        assert count >= 10
        log_test_result("get_user_memories (all, deserialize=False)", True)
        
        # Test 11.3: Get user memories by user_ids
        user_ids = ["multi_user_0", "multi_user_1", "multi_user_2"]
        memories = storage.get_user_memories(user_ids=user_ids, deserialize=True)
        assert len(memories) == 3
        assert all(isinstance(m, UserMemory) for m in memories)
        assert all(m.user_id in user_ids for m in memories)
        log_test_result("get_user_memories (by user_ids)", True)
        
        # Test 11.4: Get user memories with agent_id filter
        memories2 = storage.get_user_memories(agent_id="agent_0", deserialize=True)
        assert all(isinstance(m, UserMemory) for m in memories2)
        assert all(m.agent_id == "agent_0" for m in memories2)
        log_test_result("get_user_memories (with agent_id filter)", True)
        
        # Test 11.5: Get user memories with team_id filter
        memories3 = storage.get_user_memories(team_id="team_0", deserialize=True)
        assert all(isinstance(m, UserMemory) for m in memories3)
        assert all(m.team_id == "team_0" for m in memories3)
        log_test_result("get_user_memories (with team_id filter)", True)
        
        # Test 11.6: Get user memories with limit (deserialize=False for count)
        memories4, count5 = storage.get_user_memories(limit=3, deserialize=False)
        assert len(memories4) == 3
        log_test_result("get_user_memories (with limit)", True)
        
        # Test 11.7: Get user memories with offset
        memories5, count6 = storage.get_user_memories(offset=2, deserialize=False)
        assert len(memories5) <= count6 - 2
        log_test_result("get_user_memories (with offset)", True)
        
        # Test 11.8: Get user memories with limit and offset
        memories6, count7 = storage.get_user_memories(limit=2, offset=3, deserialize=False)
        assert len(memories6) == 2
        log_test_result("get_user_memories (with limit and offset)", True)
        
        # Test 11.9: Get user memories with non-existent user_ids
        memories7 = storage.get_user_memories(user_ids=["non_existent_1", "non_existent_2"], deserialize=True)
        assert len(memories7) == 0
        log_test_result("get_user_memories (non-existent user_ids)", True)
        
    except Exception as e:
        log_test_result("User Memory Get Multiple", False, str(e))
        raise


# ============================================================================
# TEST 12: User Memory Operations - Delete
# ============================================================================
def test_user_memory_delete():
    """Test user memory deletion operations."""
    print_separator("TEST 12: User Memory Delete Operations")
    
    try:
        storage = InMemoryStorage()
        
        # Setup: Create test memories
        for i in range(5):
            storage.upsert_user_memory(
                user_memory=UserMemory(user_id=f"delete_user_{i}", user_memory={"data": f"memory_{i}"})
            )
        assert storage.get_user_memory_count() == 5
        
        # Test 12.1: Delete single user memory
        deleted = storage.delete_user_memory("delete_user_0")
        assert deleted is True
        assert storage.get_user_memory_count() == 4
        log_test_result("delete_user_memory (single)", True)
        
        # Test 12.2: Delete non-existent user memory
        deleted2 = storage.delete_user_memory("non_existent")
        assert deleted2 is False
        assert storage.get_user_memory_count() == 4
        log_test_result("delete_user_memory (non-existent)", True)
        
        # Test 12.3: Delete with empty user_id (should raise ValueError)
        try:
            storage.delete_user_memory("")
            log_test_result("delete_user_memory (empty ID validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_user_memory (empty ID validation)", True)
        
        # Test 12.4: Delete multiple user memories
        deleted_count = storage.delete_user_memories(["delete_user_1", "delete_user_2"])
        assert deleted_count == 2
        assert storage.get_user_memory_count() == 2
        log_test_result("delete_user_memories (multiple)", True)
        
        # Test 12.5: Delete multiple with some non-existent
        deleted_count2 = storage.delete_user_memories(["delete_user_3", "non_existent"])
        assert deleted_count2 == 1
        assert storage.get_user_memory_count() == 1
        log_test_result("delete_user_memories (with non-existent)", True)
        
        # Test 12.6: Delete multiple with empty list (should raise ValueError)
        try:
            storage.delete_user_memories([])
            log_test_result("delete_user_memories (empty list validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_user_memories (empty list validation)", True)
        
        # Test 12.7: Verify remaining memory
        remaining = storage.get_user_memory("delete_user_4", deserialize=True)
        assert remaining is not None
        assert isinstance(remaining, UserMemory)
        assert remaining.user_id == "delete_user_4"
        log_test_result("delete_user_memories (verify remaining)", True)
        
    except Exception as e:
        log_test_result("User Memory Delete", False, str(e))
        raise


# ============================================================================
# TEST 13: Utility Methods
# ============================================================================
def test_utility_methods():
    """Test utility methods."""
    print_separator("TEST 13: Utility Methods")
    
    try:
        storage = InMemoryStorage()
        
        # Setup: Add some data
        sessions = [
            create_test_agentsession(f"util_session_{i}")
            for i in range(3)
        ]
        storage.upsert_sessions(sessions)
        
        for i in range(3):
            storage.upsert_user_memory(
                user_memory=UserMemory(user_id=f"util_user_{i}", user_memory={"data": f"memory_{i}"})
            )
        
        # Test 13.1: get_session_count
        count = storage.get_session_count()
        assert count == 3
        log_test_result("get_session_count", True)
        
        # Test 13.2: get_user_memory_count
        mem_count = storage.get_user_memory_count()
        assert mem_count == 3
        log_test_result("get_user_memory_count", True)
        
        # Test 13.3: clear_all
        storage.clear_all()
        assert storage.get_session_count() == 0
        assert storage.get_user_memory_count() == 0
        log_test_result("clear_all", True)
        
        # Test 13.4: close
        storage2 = InMemoryStorage()
        storage2.upsert_session(create_test_agentsession("close_session"))
        storage2.upsert_user_memory(user_memory=UserMemory(user_id="close_user", user_memory={"test": "data"}))
        storage2.close()
        assert storage2.get_session_count() == 0
        assert storage2.get_user_memory_count() == 0
        log_test_result("close", True)
        
        # Test 13.5: table_exists (always True)
        exists = storage.table_exists("any_table")
        assert exists is True
        log_test_result("table_exists (always True)", True)
        
    except Exception as e:
        log_test_result("Utility Methods", False, str(e))
        raise


# ============================================================================
# TEST 14: Edge Cases
# ============================================================================
def test_edge_cases():
    """Test edge cases and error handling."""
    print_separator("TEST 14: Edge Cases")
    
    try:
        storage = InMemoryStorage()
        
        # Test 14.1: Upsert None session (should handle gracefully)
        try:
            result = storage.upsert_session(None)
            assert result is None
            log_test_result("upsert_session (None)", True)
        except Exception:
            # If it raises, that's also acceptable
            log_test_result("upsert_session (None)", True, "Raises exception (acceptable)")
        
        # Test 14.2: Upsert sessions with None in list
        sessions_with_none = [
            create_test_agentsession("valid_1"),
            None,
            create_test_agentsession("valid_2"),
        ]
        results = storage.upsert_sessions(sessions_with_none)
        assert len(results) == 2  # None should be skipped
        log_test_result("upsert_sessions (with None)", True)
        
        # Test 14.3: Get sessions with empty storage
        empty_storage = InMemoryStorage()
        results = empty_storage.get_sessions(deserialize=True)
        assert len(results) == 0
        log_test_result("get_sessions (empty storage)", True)
        
        # Test 14.4: Get user memories with empty storage
        memories, count = empty_storage.get_user_memories(deserialize=False)
        assert len(memories) == 0
        assert count == 0
        log_test_result("get_user_memories (empty storage)", True)
        
        # Test 14.5: Large number of sessions
        large_sessions = [
            create_test_agentsession(f"large_session_{i}")
            for i in range(100)
        ]
        results3 = storage.upsert_sessions(large_sessions)
        assert len(results3) == 100
        all_sessions = storage.get_sessions(deserialize=True)
        assert len(all_sessions) >= 100
        log_test_result("Large number of sessions", True)
        
        # Test 14.6: Large number of user memories
        large_memories = [
            UserMemory(
                user_id=f"large_user_{i}",
                user_memory={"data": f"memory_{i}"},
            )
            for i in range(100)
        ]
        results4 = storage.upsert_user_memories(large_memories, deserialize=True)
        assert len(results4) == 100
        all_memories, count2 = storage.get_user_memories(deserialize=False)
        assert count2 >= 100
        log_test_result("Large number of user memories", True)
        
        # Test 14.7: Session with None values
        session_with_none = create_test_agentsession("none_session")
        session_with_none.summary = None
        session_with_none.metadata = None
        result5 = storage.upsert_session(session_with_none, deserialize=True)
        assert result5.summary is None
        assert result5.metadata is None
        log_test_result("Session with None values", True)
        
        # Test 14.8: Empty strings in filters
        result6 = storage.get_sessions(user_id="", deserialize=True)
        assert len(result6) == 0  # Should return empty (no match)
        log_test_result("Empty string filters", True)
        
        # Test 14.9: Sorting with None values
        session_none_time = create_test_agentsession("none_time_session")
        session_none_time.created_at = None
        session_none_time.updated_at = None
        storage.upsert_session(session_none_time)
        results7 = storage.get_sessions(sort_by="created_at", sort_order="asc", deserialize=True)
        # Should not crash, None values should be handled
        assert len(results7) > 0
        log_test_result("Sorting with None values", True)
        
        # Test 14.10: Pagination beyond available data
        results8 = storage.get_sessions(limit=10, offset=1000, deserialize=True)
        assert len(results8) == 0
        log_test_result("Pagination beyond data", True)
        
    except Exception as e:
        log_test_result("Edge Cases", False, str(e))
        raise


# ============================================================================
# Main Test Runner
# ============================================================================
def run_all_tests():
    """Run all tests."""
    print("\n" + "=" * 80, flush=True)
    print("  InMemory Storage Comprehensive Test Suite", flush=True)
    print("=" * 80 + "\n", flush=True)
    
    try:
        test_initialization()
        test_table_management()
        test_session_upsert()
        test_session_bulk_upsert()
        test_session_get()
        test_session_get_multiple()
        test_session_delete()
        test_user_memory_upsert()
        test_user_memory_bulk_upsert()
        test_user_memory_get()
        test_user_memory_get_multiple()
        test_user_memory_delete()
        test_utility_methods()
        test_edge_cases()
        
        # Print summary
        print("\n" + "=" * 80, flush=True)
        print("  Test Summary", flush=True)
        print("=" * 80 + "\n", flush=True)
        
        passed = sum(1 for r in test_results if r["passed"])
        failed = sum(1 for r in test_results if not r["passed"])
        total = len(test_results)
        
        print(f"Total Tests: {total}", flush=True)
        print(f"✅ Passed: {passed}", flush=True)
        print(f"❌ Failed: {failed}", flush=True)
        print(f"Success Rate: {(passed/total*100):.1f}%\n", flush=True)
        
        if failed > 0:
            print("Failed Tests:", flush=True)
            for result in test_results:
                if not result["passed"]:
                    print(f"  - {result['name']}: {result['message']}", flush=True)
        
        return failed == 0
        
    except Exception as e:
        print(f"\n❌ CRITICAL ERROR: {e}", flush=True)
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)

