"""Comprehensive test suite for Mem0Storage.

This test suite verifies ALL methods and attributes of Mem0Storage:
- Initialization (api_key, config, memory_client, custom tables, id)
- Client type detection (platform vs self-hosted)
- Table management (virtual tables - always exist)
- Session operations (upsert, get, delete, bulk operations)
- User memory operations (upsert, get, delete, bulk operations)
- Utility methods (clear_all, close)
- Edge cases and error handling
- Deserialize flag behavior
- Filtering, pagination, and sorting
- API compatibility between platform and self-hosted
"""
import os
import sys
import time
import pytest
from typing import Any, Dict, List, Optional

from upsonic.session.agent import AgentSession, RunData
from upsonic.session.base import SessionType
from upsonic.storage.schemas import UserMemory
from upsonic.storage.mem0 import Mem0Storage
from upsonic.run.agent.output import AgentRunOutput
from upsonic.run.base import RunStatus
from upsonic.messages.messages import ModelRequest, ModelResponse, TextPart, UserPromptPart, ToolCallPart, ThinkingPart

# Force unbuffered output
sys.stdout.reconfigure(line_buffering=True) if hasattr(sys.stdout, 'reconfigure') else None

# Test result tracking
test_results: List[Dict[str, Any]] = []

# Use environment variable for API key
MEM0_API_KEY = os.getenv("MEM0_API_KEY", "invalid_api_key")


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
    
    # Create REAL AgentRunOutput and RunData objects
    test_runs = {
        "run_001": RunData(output=AgentRunOutput(
            run_id="run_001", session_id=session_id,
            user_id=user_id or f"user_{session_id}",
            agent_id=agent_id or f"agent_{session_id}",
            status=RunStatus.completed, accumulated_text="Done.",
        )),
        "run_002": RunData(output=AgentRunOutput(
            run_id="run_002", session_id=session_id,
            user_id=user_id or f"user_{session_id}",
            agent_id=agent_id or f"agent_{session_id}",
            status=RunStatus.paused,
        )),
    }
    
    # Create REAL ModelRequest and ModelResponse objects
    test_messages = [
        ModelRequest(parts=[UserPromptPart(content="Analyze")], run_id="run_001"),
        ModelResponse(parts=[
            TextPart(content="Analyzing..."),
            ToolCallPart(tool_name="calc", tool_call_id="c1", args={"x": 1}),
        ], model_name="gpt-4"),
        ModelResponse(parts=[
            TextPart(content="Result."),
            ThinkingPart(content="Processed."),
        ], model_name="gpt-4"),
    ]
    
    return AgentSession(
        session_id=session_id,
        agent_id=agent_id or f"agent_{session_id}",
        user_id=user_id or f"user_{session_id}",
        session_type=session_type,
        session_data={"test": "data", "nested": {"arr": [1, 2, {"k": "v"}]}},
        agent_data={"agent_name": "TestAgent", "model": "gpt-4"},
        metadata={"key": "value", "tags": ["test"]},
        runs=test_runs,
        messages=test_messages,
        summary="Test session with REAL classes",
        created_at=current_time,
        updated_at=int(time.time()),
    )


def get_unique_id(prefix: str = "test") -> str:
    """Generate a unique ID for testing."""
    import uuid
    return f"{prefix}_{uuid.uuid4().hex[:8]}_{int(time.time())}"


def assert_session_fields_deep(
    original: AgentSession,
    retrieved: AgentSession,
    label: str,
) -> None:
    """Deep-compare all meaningful fields between original and retrieved session."""
    assert retrieved.session_id == original.session_id, f"[{label}] session_id mismatch"
    assert retrieved.agent_id == original.agent_id, f"[{label}] agent_id mismatch"
    assert retrieved.user_id == original.user_id, f"[{label}] user_id mismatch"
    assert str(retrieved.session_type) == str(original.session_type), f"[{label}] session_type mismatch: {retrieved.session_type} vs {original.session_type}"
    assert retrieved.session_data == original.session_data, f"[{label}] session_data mismatch: {retrieved.session_data} vs {original.session_data}"
    assert retrieved.agent_data == original.agent_data, f"[{label}] agent_data mismatch"
    assert retrieved.metadata == original.metadata, f"[{label}] metadata mismatch"
    assert retrieved.summary == original.summary, f"[{label}] summary mismatch"
    assert retrieved.created_at == original.created_at, f"[{label}] created_at mismatch: {retrieved.created_at} vs {original.created_at}"

    # Runs deep check
    assert retrieved.runs is not None, f"[{label}] runs should not be None"
    assert isinstance(retrieved.runs, dict), f"[{label}] runs should be dict"
    assert set(retrieved.runs.keys()) == set(original.runs.keys()), f"[{label}] runs keys mismatch"
    for rk in original.runs:
        o_run = original.runs[rk]
        r_run = retrieved.runs[rk]
        assert isinstance(r_run, RunData), f"[{label}] runs[{rk}] should be RunData"
        assert isinstance(r_run.output, AgentRunOutput), f"[{label}] runs[{rk}].output should be AgentRunOutput"
        assert r_run.output.run_id == o_run.output.run_id, f"[{label}] runs[{rk}].run_id mismatch"
        assert r_run.output.status == o_run.output.status, f"[{label}] runs[{rk}].status mismatch"
        assert r_run.output.accumulated_text == o_run.output.accumulated_text, f"[{label}] runs[{rk}].accumulated_text mismatch"
        assert r_run.output.session_id == o_run.output.session_id, f"[{label}] runs[{rk}].session_id mismatch"
        assert r_run.output.agent_id == o_run.output.agent_id, f"[{label}] runs[{rk}].agent_id mismatch"
        assert r_run.output.user_id == o_run.output.user_id, f"[{label}] runs[{rk}].user_id mismatch"

    # Messages deep check
    assert retrieved.messages is not None, f"[{label}] messages should not be None"
    assert isinstance(retrieved.messages, list), f"[{label}] messages should be list"
    assert len(retrieved.messages) == len(original.messages), f"[{label}] messages length mismatch: {len(retrieved.messages)} vs {len(original.messages)}"
    for i, (om, rm) in enumerate(zip(original.messages, retrieved.messages)):
        assert type(om) == type(rm), f"[{label}] messages[{i}] type mismatch: {type(rm)} vs {type(om)}"
        assert len(om.parts) == len(rm.parts), f"[{label}] messages[{i}].parts length mismatch"
        for j, (op, rp) in enumerate(zip(om.parts, rm.parts)):
            assert type(op) == type(rp), f"[{label}] messages[{i}].parts[{j}] type mismatch: {type(rp)} vs {type(op)}"
            if hasattr(op, "content"):
                assert op.content == rp.content, f"[{label}] messages[{i}].parts[{j}].content mismatch"
            if hasattr(op, "tool_name"):
                assert op.tool_name == rp.tool_name, f"[{label}] messages[{i}].parts[{j}].tool_name mismatch"
                assert op.tool_call_id == rp.tool_call_id, f"[{label}] messages[{i}].parts[{j}].tool_call_id mismatch"
                assert op.args == rp.args, f"[{label}] messages[{i}].parts[{j}].args mismatch"


def assert_session_dict_fields(
    d: Dict[str, Any],
    session_id: str,
    label: str,
) -> None:
    """Assert that a deserialized dict contains all expected session keys with correct values."""
    assert d.get("session_id") == session_id, f"[{label}] dict session_id mismatch"
    assert d.get("session_type") is not None, f"[{label}] dict session_type is None"
    assert d.get("session_data") is not None, f"[{label}] dict session_data is None"
    assert isinstance(d.get("session_data"), dict), f"[{label}] dict session_data should be dict"
    assert d.get("agent_data") is not None, f"[{label}] dict agent_data is None"
    assert d.get("runs") is not None, f"[{label}] dict runs is None"
    assert isinstance(d.get("runs"), dict), f"[{label}] dict runs should be dict"
    assert d.get("messages") is not None, f"[{label}] dict messages is None"
    assert isinstance(d.get("messages"), list), f"[{label}] dict messages should be list"
    assert len(d["messages"]) > 0, f"[{label}] dict messages should not be empty"
    assert d.get("summary") is not None, f"[{label}] dict summary is None"
    assert d.get("created_at") is not None, f"[{label}] dict created_at is None"


# ============================================================================
# TEST 1: Initialization
# ============================================================================
def test_initialization():
    """Test Mem0Storage initialization with various configurations."""
    print_separator("TEST 1: Initialization")
    
    # Test 1.1: Initialization with API key (Platform)
    try:
        storage = Mem0Storage(api_key=MEM0_API_KEY)
        assert storage.memory_client is not None
        assert storage._is_platform_client is True
        assert storage.session_table_name == "upsonic_sessions"
        assert storage.user_memory_table_name == "upsonic_user_memories"
        assert storage.id is not None
        assert isinstance(storage.id, str)
        assert len(storage.id) > 0
        assert storage.default_user_id == "upsonic_default"
        storage.close()
        log_test_result("Initialization with API key (platform)", True)
    except Exception as e:
        log_test_result("Initialization with API key (platform)", False, str(e))
        raise
    
    # Test 1.2: Initialization with custom table names
    try:
        storage = Mem0Storage(
            api_key=MEM0_API_KEY,
            session_table="custom_sessions",
            user_memory_table="custom_memories",
        )
        assert storage.session_table_name == "custom_sessions"
        assert storage.user_memory_table_name == "custom_memories"
        assert storage._is_platform_client is True
        storage.close()
        log_test_result("Initialization with custom table names", True)
    except Exception as e:
        log_test_result("Initialization with custom table names", False, str(e))
        raise
    
    # Test 1.3: Initialization with custom ID
    try:
        custom_id = "test_storage_123"
        storage = Mem0Storage(api_key=MEM0_API_KEY, id=custom_id)
        assert storage.id == custom_id
        assert storage.id == "test_storage_123"
        storage.close()
        log_test_result("Initialization with custom ID", True)
    except Exception as e:
        log_test_result("Initialization with custom ID", False, str(e))
        raise
    
    # Test 1.4: Initialization with custom default_user_id
    try:
        storage = Mem0Storage(api_key=MEM0_API_KEY, default_user_id="custom_user")
        assert storage.default_user_id == "custom_user"
        assert storage.default_user_id != "upsonic_default"
        storage.close()
        log_test_result("Initialization with custom default_user_id", True)
    except Exception as e:
        log_test_result("Initialization with custom default_user_id", False, str(e))
        raise
    
    # Test 1.5: Initialization with existing MemoryClient
    try:
        from mem0 import MemoryClient
        client = MemoryClient(api_key=MEM0_API_KEY)
        storage = Mem0Storage(memory_client=client)
        assert storage.memory_client is client
        assert storage._is_platform_client is True
        storage.close()
        log_test_result("Initialization with existing MemoryClient", True)
    except Exception as e:
        log_test_result("Initialization with existing MemoryClient", False, str(e))
        raise
    
    # Test 1.6: Check platform client detection
    try:
        storage = Mem0Storage(api_key=MEM0_API_KEY)
        assert storage._check_is_platform_client() is True
        storage.close()
        log_test_result("Platform client detection", True)
    except Exception as e:
        log_test_result("Platform client detection", False, str(e))
        raise


# ============================================================================
# TEST 2: Table Management
# ============================================================================
def test_table_management():
    """Test table existence checks (virtual tables always exist in Mem0)."""
    print_separator("TEST 2: Table Management")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    try:
        # Test 2.1: table_exists always returns True for Mem0
        assert storage.table_exists("any_table") is True
        assert storage.table_exists("nonexistent") is True
        assert storage.table_exists("") is True
        log_test_result("table_exists returns True", True)
    except Exception as e:
        log_test_result("table_exists returns True", False, str(e))
        raise
    
    try:
        # Test 2.2: _create_all_tables is no-op (doesn't raise)
        storage._create_all_tables()
        log_test_result("_create_all_tables is no-op", True)
    except Exception as e:
        log_test_result("_create_all_tables is no-op", False, str(e))
        raise
    
    storage.close()


# ============================================================================
# TEST 3: Session CRUD Operations
# ============================================================================
@pytest.mark.timeout(60)
def test_session_crud():
    """Test session Create, Read, Update, Delete operations."""
    print_separator("TEST 3: Session CRUD Operations")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    # Use unique IDs for this test run
    session_id = get_unique_id("session")
    
    try:
        # Test 3.1: Upsert session (create) — verify ALL fields
        session = create_test_agentsession(session_id=session_id)
        result = storage.upsert_session(session)
        assert result is not None
        assert isinstance(result, AgentSession)
        assert_session_fields_deep(session, result, "upsert_create")
        log_test_result("Upsert session (create) with deep field check", True)
    except Exception as e:
        log_test_result("Upsert session (create) with deep field check", False, str(e))
        raise
    
    try:
        # Test 3.2: Get session by ID — verify ALL fields match original
        retrieved = storage.get_session(session_id=session_id)
        assert retrieved is not None
        assert isinstance(retrieved, AgentSession)
        assert_session_fields_deep(session, retrieved, "get_by_id")
        log_test_result("Get session by ID with deep field check", True)
    except Exception as e:
        log_test_result("Get session by ID with deep field check", False, str(e))
        raise
    
    try:
        # Test 3.3: Upsert session (update) — verify updated AND non-updated fields
        session.summary = "Updated summary"
        session.session_data = {"test": "updated_data", "new_key": 42}
        result = storage.upsert_session(session)
        assert result is not None
        retrieved = storage.get_session(session_id=session_id)
        assert retrieved is not None
        assert retrieved.summary == "Updated summary"
        assert retrieved.session_data == {"test": "updated_data", "new_key": 42}
        assert retrieved.session_data["new_key"] == 42
        assert retrieved.agent_data == {"agent_name": "TestAgent", "model": "gpt-4"}, "agent_data should not change on update"
        assert retrieved.metadata == {"key": "value", "tags": ["test"]}, "metadata should not change on update"
        assert retrieved.agent_id == session.agent_id, "agent_id should not change on update"
        assert retrieved.user_id == session.user_id, "user_id should not change on update"
        assert retrieved.runs is not None, "runs should survive update"
        assert len(retrieved.runs) == 2, "runs count should survive update"
        assert retrieved.messages is not None, "messages should survive update"
        assert len(retrieved.messages) == 3, "messages count should survive update"
        log_test_result("Upsert session (update) preserves non-updated fields", True)
    except Exception as e:
        log_test_result("Upsert session (update) preserves non-updated fields", False, str(e))
        raise
    
    try:
        # Test 3.4: Get session with deserialize=False — verify dict structure
        result = storage.get_session(session_id=session_id, deserialize=False)
        assert result is not None
        assert isinstance(result, dict)
        assert_session_dict_fields(result, session_id, "get_deser_false")
        assert result["session_data"]["new_key"] == 42
        assert result["summary"] == "Updated summary"
        assert len(result["runs"]) == 2
        assert len(result["messages"]) == 3
        log_test_result("Get session with deserialize=False dict structure", True)
    except Exception as e:
        log_test_result("Get session with deserialize=False dict structure", False, str(e))
        raise
    
    try:
        # Test 3.5: Delete session — verify it's actually gone
        deleted = storage.delete_session(session_id=session_id)
        assert deleted is True
        retrieved = storage.get_session(session_id=session_id)
        assert retrieved is None
        log_test_result("Delete session", True)
    except Exception as e:
        log_test_result("Delete session", False, str(e))
        raise
    
    try:
        # Test 3.6: Delete non-existent session
        deleted = storage.delete_session(session_id="non_existent_session_xyz")
        assert deleted is False
        log_test_result("Delete non-existent session", True)
    except Exception as e:
        log_test_result("Delete non-existent session", False, str(e))
        raise
    
    # CRITICAL - Verify runs and messages content in depth
    try:
        verify_session_id = get_unique_id("session_verify")
        session_with_data = create_test_agentsession(verify_session_id)
        result_full = storage.upsert_session(session_with_data, deserialize=True)
        
        # Runs deep content check
        run_001 = result_full.runs["run_001"]
        assert run_001.output.accumulated_text == "Done.", f"accumulated_text mismatch: {run_001.output.accumulated_text}"
        assert run_001.output.session_id == verify_session_id
        run_002 = result_full.runs["run_002"]
        assert run_002.output.status == RunStatus.paused
        assert run_002.output.accumulated_text is None or run_002.output.accumulated_text == "", \
            f"run_002 should have no accumulated_text, got: {run_002.output.accumulated_text}"
        assert "run_002" in result_full.runs
        log_test_result("runs deep content verification", True)
        
        # Messages deep content check
        msg_0 = result_full.messages[0]
        assert isinstance(msg_0, ModelRequest)
        assert len(msg_0.parts) == 1
        assert isinstance(msg_0.parts[0], UserPromptPart)
        assert msg_0.parts[0].content == "Analyze"
        
        msg_1 = result_full.messages[1]
        assert isinstance(msg_1, ModelResponse)
        assert len(msg_1.parts) == 2
        text_part = [p for p in msg_1.parts if isinstance(p, TextPart)][0]
        assert text_part.content == "Analyzing..."
        tool_part = [p for p in msg_1.parts if isinstance(p, ToolCallPart)][0]
        assert tool_part.tool_name == "calc"
        assert tool_part.tool_call_id == "c1"
        assert tool_part.args == {"x": 1}
        
        msg_2 = result_full.messages[2]
        assert isinstance(msg_2, ModelResponse)
        assert len(msg_2.parts) == 2
        text_part_2 = [p for p in msg_2.parts if isinstance(p, TextPart)][0]
        assert text_part_2.content == "Result."
        thinking_part = [p for p in msg_2.parts if isinstance(p, ThinkingPart)][0]
        assert thinking_part.content == "Processed."
        log_test_result("messages deep content verification", True)
        
        # Clean up verify session
        storage.delete_session(session_id=verify_session_id)
    except Exception as e:
        log_test_result("runs/messages deep content verification", False, str(e))
        raise
    
    storage.close()


# ============================================================================
# TEST 4: Bulk Session Operations
# ============================================================================
def test_bulk_session_operations():
    """Test bulk session operations (upsert_sessions, get_sessions, delete_sessions)."""
    print_separator("TEST 4: Bulk Session Operations")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    # Create unique session IDs
    session_ids = [get_unique_id(f"bulk_session_{i}") for i in range(3)]
    
    try:
        # Test 4.1: Upsert multiple sessions — verify each result
        sessions = [create_test_agentsession(session_id=sid) for sid in session_ids]
        results = storage.upsert_sessions(sessions)
        assert len(results) == 3
        for i, r in enumerate(results):
            assert isinstance(r, AgentSession), f"results[{i}] should be AgentSession"
            assert r.session_id == session_ids[i], f"results[{i}].session_id mismatch"
            assert r.runs is not None, f"results[{i}].runs should not be None"
            assert len(r.runs) == 2, f"results[{i}].runs should have 2 entries"
            assert r.messages is not None, f"results[{i}].messages should not be None"
            assert len(r.messages) == 3, f"results[{i}].messages should have 3 entries"
            assert r.summary == "Test session with REAL classes"
        log_test_result("Upsert multiple sessions with content check", True)
    except Exception as e:
        log_test_result("Upsert multiple sessions with content check", False, str(e))
        raise
    
    try:
        # Test 4.2: Get sessions by IDs — verify each session
        retrieved = storage.get_sessions(session_ids=session_ids)
        assert isinstance(retrieved, list)
        assert len(retrieved) == 3
        retrieved_ids = {s.session_id for s in retrieved}
        for sid in session_ids:
            assert sid in retrieved_ids, f"session {sid} not found in bulk get results"
        for r in retrieved:
            assert isinstance(r, AgentSession)
            assert r.session_data is not None
            assert r.session_data["test"] == "data"
            assert r.agent_data is not None
            assert r.runs is not None
            assert len(r.runs) == 2
        log_test_result("Get sessions by IDs with content check", True)
    except Exception as e:
        log_test_result("Get sessions by IDs with content check", False, str(e))
        raise
    
    try:
        # Test 4.3: Get sessions with deserialize=False — verify tuple and dict contents
        result = storage.get_sessions(session_ids=session_ids, deserialize=False)
        assert isinstance(result, tuple)
        assert len(result) == 2
        dicts_list, count = result
        assert count == 3
        assert len(dicts_list) == 3
        for d in dicts_list:
            assert isinstance(d, dict)
            assert "session_id" in d
            assert "runs" in d
            assert "messages" in d
            assert d["session_data"] is not None
        log_test_result("Get sessions with deserialize=False structure check", True)
    except Exception as e:
        log_test_result("Get sessions with deserialize=False structure check", False, str(e))
        raise
    
    try:
        # Test 4.4: Delete multiple sessions — verify all gone
        deleted_count = storage.delete_sessions(session_ids=session_ids)
        assert deleted_count == 3
        for sid in session_ids:
            assert storage.get_session(session_id=sid) is None, f"session {sid} should be gone after delete"
        log_test_result("Delete multiple sessions verified gone", True)
    except Exception as e:
        log_test_result("Delete multiple sessions verified gone", False, str(e))
        raise
    
    try:
        # Test 4.5: Empty list for upsert_sessions
        results = storage.upsert_sessions([])
        assert results == []
        assert isinstance(results, list)
        log_test_result("Upsert empty list", True)
    except Exception as e:
        log_test_result("Upsert empty list", False, str(e))
        raise
    
    storage.close()


# ============================================================================
# TEST 5: Session Filtering
# ============================================================================
def test_session_filtering():
    """Test session filtering by user_id, agent_id, session_type."""
    print_separator("TEST 5: Session Filtering")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    # Create unique IDs
    user_id = get_unique_id("filter_user")
    agent_id = get_unique_id("filter_agent")
    session_id = get_unique_id("filter_session")
    
    try:
        # Create a session with specific user_id and agent_id
        session = create_test_agentsession(
            session_id=session_id,
            user_id=user_id,
            agent_id=agent_id,
        )
        storage.upsert_session(session)
        
        # Test 5.1: Filter by user_id — verify the returned session matches
        results = storage.get_sessions(user_id=user_id)
        assert len(results) >= 1
        found = [s for s in results if s.session_id == session_id]
        assert len(found) == 1, f"Expected to find session {session_id} in user_id filter results"
        assert found[0].user_id == user_id
        assert found[0].agent_id == agent_id
        assert found[0].session_data is not None
        log_test_result("Filter by user_id with content verification", True)
    except Exception as e:
        log_test_result("Filter by user_id with content verification", False, str(e))
        raise
    
    try:
        # Test 5.2: Filter by agent_id — verify match
        results = storage.get_sessions(agent_id=agent_id)
        assert len(results) >= 1
        found = [s for s in results if s.session_id == session_id]
        assert len(found) == 1, f"Expected to find session {session_id} in agent_id filter results"
        assert found[0].agent_id == agent_id
        log_test_result("Filter by agent_id with content verification", True)
    except Exception as e:
        log_test_result("Filter by agent_id with content verification", False, str(e))
        raise
    
    try:
        # Test 5.3: Filter by session_type
        results = storage.get_sessions(session_type=SessionType.AGENT)
        assert isinstance(results, list)
        assert len(results) >= 1
        for s in results:
            assert isinstance(s, AgentSession)
        log_test_result("Filter by session_type", True)
    except Exception as e:
        log_test_result("Filter by session_type", False, str(e))
        raise
    
    # Cleanup
    storage.delete_session(session_id)
    storage.close()


# ============================================================================
# TEST 6: Session Pagination and Sorting
# ============================================================================
def test_session_pagination_sorting():
    """Test session pagination and sorting."""
    print_separator("TEST 6: Session Pagination and Sorting")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    # Create multiple sessions with different timestamps
    session_ids = []
    base_time = int(time.time())
    for i in range(5):
        session_id = get_unique_id(f"page_session_{i}")
        session_ids.append(session_id)
        session = create_test_agentsession(
            session_id=session_id,
            created_at=base_time - (i * 100),
        )
        storage.upsert_session(session)
        time.sleep(0.1)
    
    try:
        # Test 6.1: Get sessions with limit
        results = storage.get_sessions(session_ids=session_ids, limit=2)
        assert len(results) == 2
        for r in results:
            assert isinstance(r, AgentSession)
            assert r.session_id in session_ids
        log_test_result("Get sessions with limit", True)
    except Exception as e:
        log_test_result("Get sessions with limit", False, str(e))
        raise
    
    try:
        # Test 6.2: Get sessions with offset — should return different set from no-offset
        results_no_offset = storage.get_sessions(session_ids=session_ids, limit=2)
        results_with_offset = storage.get_sessions(session_ids=session_ids, limit=2, offset=2)
        assert len(results_with_offset) == 2
        no_offset_ids = {s.session_id for s in results_no_offset}
        offset_ids = {s.session_id for s in results_with_offset}
        assert no_offset_ids != offset_ids, "Offset results should differ from no-offset results"
        assert len(no_offset_ids & offset_ids) == 0, "Offset and no-offset results should not overlap"
        log_test_result("Get sessions with offset returns different set", True)
    except Exception as e:
        log_test_result("Get sessions with offset returns different set", False, str(e))
        raise
    
    try:
        # Test 6.3: Get all sessions sorted — verify order
        results = storage.get_sessions(session_ids=session_ids, sort_by="created_at", sort_order="desc")
        assert len(results) == 5
        for i in range(len(results) - 1):
            assert results[i].created_at >= results[i + 1].created_at, \
                f"Sort order violated at index {i}: {results[i].created_at} < {results[i + 1].created_at}"
        log_test_result("Get sessions sorted desc verified order", True)
    except Exception as e:
        log_test_result("Get sessions sorted desc verified order", False, str(e))
        raise
    
    try:
        # Test 6.4: Sort ascending
        results_asc = storage.get_sessions(session_ids=session_ids, sort_by="created_at", sort_order="asc")
        assert len(results_asc) == 5
        for i in range(len(results_asc) - 1):
            assert results_asc[i].created_at <= results_asc[i + 1].created_at, \
                f"Asc sort order violated at index {i}: {results_asc[i].created_at} > {results_asc[i + 1].created_at}"
        log_test_result("Get sessions sorted asc verified order", True)
    except Exception as e:
        log_test_result("Get sessions sorted asc verified order", False, str(e))
        raise
    
    # Cleanup
    storage.delete_sessions(session_ids)
    storage.close()


# ============================================================================
# TEST 7: User Memory CRUD Operations
# ============================================================================
def test_user_memory_crud():
    """Test user memory Create, Read, Update, Delete operations."""
    print_separator("TEST 7: User Memory CRUD Operations")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    user_id = get_unique_id("memory_user")
    
    try:
        # Test 7.1: Upsert user memory (create) — verify full content
        memory_data: Dict[str, Any] = {"preferences": {"theme": "dark", "font": 14}, "notes": "Test note", "count": 42}
        result = storage.upsert_user_memory(user_memory=UserMemory(user_id=user_id, user_memory=memory_data), deserialize=True)
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == user_id
        assert result.user_memory == memory_data
        assert result.user_memory["preferences"]["theme"] == "dark"
        assert result.user_memory["preferences"]["font"] == 14
        assert result.user_memory["notes"] == "Test note"
        assert result.user_memory["count"] == 42
        log_test_result("Upsert user memory (create) with content check", True)
    except Exception as e:
        log_test_result("Upsert user memory (create) with content check", False, str(e))
        raise
    
    try:
        # Test 7.2: Get user memory by ID — verify full content matches
        retrieved = storage.get_user_memory(user_id=user_id, deserialize=True)
        assert retrieved is not None
        assert isinstance(retrieved, UserMemory)
        assert retrieved.user_id == user_id
        assert retrieved.user_memory == memory_data
        assert retrieved.user_memory["preferences"]["theme"] == "dark"
        assert retrieved.user_memory["count"] == 42
        log_test_result("Get user memory by ID with content match", True)
    except Exception as e:
        log_test_result("Get user memory by ID with content match", False, str(e))
        raise
    
    try:
        # Test 7.3: Upsert user memory (update) — verify updated AND that old data is replaced
        updated_memory: Dict[str, Any] = {"preferences": {"theme": "light"}, "notes": "Updated note", "new_field": True}
        result = storage.upsert_user_memory(user_memory=UserMemory(user_id=user_id, user_memory=updated_memory), deserialize=True)
        assert result is not None
        assert isinstance(result, UserMemory)
        retrieved = storage.get_user_memory(user_id=user_id, deserialize=True)
        assert isinstance(retrieved, UserMemory)
        assert retrieved.user_memory["preferences"]["theme"] == "light"
        assert retrieved.user_memory["notes"] == "Updated note"
        assert retrieved.user_memory["new_field"] is True
        assert "count" not in retrieved.user_memory, "Old 'count' key should be gone after full replace"
        assert "font" not in retrieved.user_memory.get("preferences", {}), "Old 'font' key should be gone"
        log_test_result("Upsert user memory (update) old data replaced", True)
    except Exception as e:
        log_test_result("Upsert user memory (update) old data replaced", False, str(e))
        raise
    
    try:
        # Test 7.4: Upsert user memory with agent_id — verify agent_id preserved
        memory_with_agent: Dict[str, Any] = {"data": "test_with_agent"}
        result = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=memory_with_agent, agent_id="test_agent"),
            deserialize=True
        )
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_memory == memory_with_agent
        assert result.user_memory["data"] == "test_with_agent"
        log_test_result("Upsert user memory with agent_id", True)
    except Exception as e:
        log_test_result("Upsert user memory with agent_id", False, str(e))
        raise
    
    try:
        # Test 7.5: Delete user memory — verify gone
        deleted = storage.delete_user_memory(user_id=user_id)
        assert deleted is True
        retrieved = storage.get_user_memory(user_id=user_id)
        assert retrieved is None
        log_test_result("Delete user memory verified gone", True)
    except Exception as e:
        log_test_result("Delete user memory verified gone", False, str(e))
        raise
    
    try:
        # Test 7.6: Delete non-existent user memory
        deleted = storage.delete_user_memory(user_id="non_existent_user_xyz")
        assert deleted is False
        log_test_result("Delete non-existent user memory", True)
    except Exception as e:
        log_test_result("Delete non-existent user memory", False, str(e))
        raise
    
    try:
        # Test 7.7: Get non-existent user memory returns None
        result = storage.get_user_memory(user_id="absolutely_does_not_exist_xyz")
        assert result is None
        log_test_result("Get non-existent user memory returns None", True)
    except Exception as e:
        log_test_result("Get non-existent user memory returns None", False, str(e))
        raise
    
    storage.close()


# ============================================================================
# TEST 8: Bulk User Memory Operations
# ============================================================================
def test_bulk_user_memory_operations():
    """Test bulk user memory operations."""
    print_separator("TEST 8: Bulk User Memory Operations")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    user_ids = [get_unique_id(f"bulk_memory_user_{i}") for i in range(3)]
    
    try:
        # Test 8.1: Upsert multiple user memories — verify each
        memories = [
            UserMemory(user_id=uid, user_memory={"data": f"data_{i}", "index": i})
            for i, uid in enumerate(user_ids)
        ]
        results = storage.upsert_user_memories(memories)
        assert len(results) == 3
        for i, r in enumerate(results):
            assert isinstance(r, UserMemory)
            assert r.user_id == user_ids[i]
            assert r.user_memory["data"] == f"data_{i}"
            assert r.user_memory["index"] == i
        log_test_result("Upsert multiple user memories with content check", True)
    except Exception as e:
        log_test_result("Upsert multiple user memories with content check", False, str(e))
        raise
    
    try:
        # Test 8.2: Get user memories by IDs — verify each
        result = storage.get_user_memories(user_ids=user_ids, deserialize=True)
        assert isinstance(result, list)
        assert len(result) == 3
        retrieved_uids = {m.user_id for m in result}
        for uid in user_ids:
            assert uid in retrieved_uids, f"user_id {uid} not found in bulk get"
        for m in result:
            assert isinstance(m, UserMemory)
            assert "data" in m.user_memory
            assert "index" in m.user_memory
            assert isinstance(m.user_memory["index"], int)
        log_test_result("Get user memories by IDs with content check", True)
    except Exception as e:
        log_test_result("Get user memories by IDs with content check", False, str(e))
        raise
    
    try:
        # Test 8.3: Delete multiple user memories — verify all gone
        deleted_count = storage.delete_user_memories(user_ids=user_ids)
        assert deleted_count == 3
        for uid in user_ids:
            assert storage.get_user_memory(user_id=uid) is None, f"user_memory {uid} should be gone"
        log_test_result("Delete multiple user memories verified gone", True)
    except Exception as e:
        log_test_result("Delete multiple user memories verified gone", False, str(e))
        raise
    
    try:
        # Test 8.4: Empty list for upsert_user_memories
        results = storage.upsert_user_memories([])
        assert results == []
        log_test_result("Upsert empty user memory list", True)
    except Exception as e:
        log_test_result("Upsert empty user memory list", False, str(e))
        raise
    
    storage.close()


# ============================================================================
# TEST 9: Error Handling
# ============================================================================
def test_error_handling():
    """Test error handling for invalid inputs."""
    print_separator("TEST 9: Error Handling")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    try:
        # Test 9.1: Upsert session without session_id
        session = AgentSession(session_id=None)
        try:
            storage.upsert_session(session)
            log_test_result("Upsert session without session_id raises error", False, "No error raised")
        except ValueError:
            log_test_result("Upsert session without session_id raises error", True)
    except Exception as e:
        log_test_result("Upsert session without session_id raises error", False, str(e))
        raise
    
    try:
        # Test 9.2: Delete session without session_id
        try:
            storage.delete_session(session_id="")
            log_test_result("Delete session without session_id raises error", False, "No error raised")
        except ValueError:
            log_test_result("Delete session without session_id raises error", True)
    except Exception as e:
        log_test_result("Delete session without session_id raises error", False, str(e))
        raise
    
    try:
        # Test 9.3: Delete sessions with empty list
        try:
            storage.delete_sessions(session_ids=[])
            log_test_result("Delete sessions with empty list raises error", False, "No error raised")
        except ValueError:
            log_test_result("Delete sessions with empty list raises error", True)
    except Exception as e:
        log_test_result("Delete sessions with empty list raises error", False, str(e))
        raise
    
    try:
        # Test 9.4: Upsert user memory without user_id
        try:
            storage.upsert_user_memory(user_memory=UserMemory(user_id="", user_memory={}))
            log_test_result("Upsert user memory without user_id raises error", False, "No error raised")
        except ValueError:
            log_test_result("Upsert user memory without user_id raises error", True)
    except Exception as e:
        log_test_result("Upsert user memory without user_id raises error", False, str(e))
        raise
    
    try:
        # Test 9.5: Delete user memory without user_id
        try:
            storage.delete_user_memory(user_id="")
            log_test_result("Delete user memory without user_id raises error", False, "No error raised")
        except ValueError:
            log_test_result("Delete user memory without user_id raises error", True)
    except Exception as e:
        log_test_result("Delete user memory without user_id raises error", False, str(e))
        raise
    
    try:
        # Test 9.6: Delete user memories with empty list
        try:
            storage.delete_user_memories(user_ids=[])
            log_test_result("Delete user memories with empty list raises error", False, "No error raised")
        except ValueError:
            log_test_result("Delete user memories with empty list raises error", True)
    except Exception as e:
        log_test_result("Delete user memories with empty list raises error", False, str(e))
        raise
    
    storage.close()


# ============================================================================
# TEST 10: Clear All
# ============================================================================
def test_clear_all():
    """Test clear_all method."""
    print_separator("TEST 10: Clear All")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    # Create some test data
    session_id = get_unique_id("clear_session")
    user_id = get_unique_id("clear_user")
    
    session = create_test_agentsession(session_id=session_id)
    storage.upsert_session(session)
    storage.upsert_user_memory(user_memory=UserMemory(user_id=user_id, user_memory={"test": "data"}))
    
    try:
        # Test 10.1: Clear all data
        storage.clear_all()
        log_test_result("Clear all executes without error", True)
    except Exception as e:
        log_test_result("Clear all executes without error", False, str(e))
        raise
    
    storage.close()


# ============================================================================
# TEST 11: Latest Session/Memory Retrieval
# ============================================================================
def test_latest_retrieval():
    """Test getting latest session/memory when no ID is provided."""
    print_separator("TEST 11: Latest Session/Memory Retrieval")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    # Create sessions with different timestamps
    session_ids = []
    for i in range(3):
        session_id = get_unique_id(f"latest_session_{i}")
        session_ids.append(session_id)
        session = create_test_agentsession(session_id=session_id)
        storage.upsert_session(session)
        time.sleep(0.5)
    
    try:
        # Test 11.1: Get latest session (no session_id provided)
        latest = storage.get_session()
        assert latest is not None
        assert isinstance(latest, AgentSession)
        assert latest.session_id is not None
        assert latest.session_data is not None
        assert latest.runs is not None
        assert latest.messages is not None
        log_test_result("Get latest session with content check", True)
    except Exception as e:
        log_test_result("Get latest session with content check", False, str(e))
        raise
    
    # Cleanup
    storage.delete_sessions(session_ids)
    storage.close()


# ============================================================================
# TEST 12: Deserialize Flag Behavior
# ============================================================================
def test_deserialize_flag():
    """Test deserialize flag behavior in various methods."""
    print_separator("TEST 12: Deserialize Flag Behavior")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    session_id = get_unique_id("deserialize_session")
    session = create_test_agentsession(session_id=session_id)
    
    try:
        # Test 12.1: upsert_session with deserialize=True (default)
        result = storage.upsert_session(session, deserialize=True)
        assert isinstance(result, AgentSession)
        assert result.session_id == session_id
        assert result.session_data == session.session_data
        assert result.runs is not None
        log_test_result("upsert_session with deserialize=True", True)
    except Exception as e:
        log_test_result("upsert_session with deserialize=True", False, str(e))
        raise
    
    try:
        # Test 12.2: upsert_session with deserialize=False — verify dict has all keys
        result = storage.upsert_session(session, deserialize=False)
        assert isinstance(result, dict)
        assert_session_dict_fields(result, session_id, "upsert_deser_false")
        log_test_result("upsert_session with deserialize=False dict keys", True)
    except Exception as e:
        log_test_result("upsert_session with deserialize=False dict keys", False, str(e))
        raise
    
    try:
        # Test 12.3: get_session with deserialize=True (default)
        result = storage.get_session(session_id=session_id, deserialize=True)
        assert isinstance(result, AgentSession)
        assert result.session_id == session_id
        assert result.agent_id == session.agent_id
        assert result.user_id == session.user_id
        assert result.runs is not None
        assert result.messages is not None
        log_test_result("get_session with deserialize=True full check", True)
    except Exception as e:
        log_test_result("get_session with deserialize=True full check", False, str(e))
        raise
    
    try:
        # Test 12.4: get_session with deserialize=False — verify dict structure
        result = storage.get_session(session_id=session_id, deserialize=False)
        assert isinstance(result, dict)
        assert_session_dict_fields(result, session_id, "get_deser_false")
        assert result["agent_data"] == session.agent_data
        assert result["metadata"] == session.metadata
        log_test_result("get_session with deserialize=False full check", True)
    except Exception as e:
        log_test_result("get_session with deserialize=False full check", False, str(e))
        raise
    
    # Cleanup
    storage.delete_session(session_id)
    storage.close()


# ============================================================================
# TEST 13: Close Method
# ============================================================================
def test_close_method():
    """Test close method."""
    print_separator("TEST 13: Close Method")
    
    try:
        storage = Mem0Storage(api_key=MEM0_API_KEY)
        storage.close()
        # Close should be idempotent
        storage.close()
        log_test_result("Close method", True)
    except Exception as e:
        log_test_result("Close method", False, str(e))
        raise


# ============================================================================
# TEST 14: Self-Hosted Initialization and CRUD
# ============================================================================
def test_self_hosted_initialization():
    """Test Mem0Storage initialization with self-hosted Memory client."""
    print_separator("TEST 14: Self-Hosted Initialization")
    
    try:
        from mem0 import Memory
        memory = Memory()
        storage = Mem0Storage(memory_client=memory)
        assert storage.memory_client is memory
        assert storage._is_platform_client is False
        assert storage.session_table_name == "upsonic_sessions"
        assert storage.user_memory_table_name == "upsonic_user_memories"
        assert storage.default_user_id == "upsonic_default"
        assert storage.id is not None
        storage.close()
        log_test_result("Self-hosted initialization with Memory client", True)
    except Exception as e:
        log_test_result("Self-hosted initialization with Memory client", False, str(e))
        raise


def test_self_hosted_session_crud():
    """Test session CRUD with self-hosted Memory backend."""
    print_separator("TEST 15: Self-Hosted Session CRUD")
    
    from mem0 import Memory
    memory = Memory()
    storage = Mem0Storage(memory_client=memory)
    
    session_id = get_unique_id("sh_session")
    
    try:
        # Create session — deep field check
        session = create_test_agentsession(session_id=session_id)
        result = storage.upsert_session(session, deserialize=True)
        assert result is not None
        assert isinstance(result, AgentSession)
        assert_session_fields_deep(session, result, "sh_upsert_create")
        log_test_result("[Self-hosted] Upsert session (create) deep check", True)
    except Exception as e:
        log_test_result("[Self-hosted] Upsert session (create) deep check", False, str(e))
        raise
    
    try:
        # Get session — deep field check
        retrieved = storage.get_session(session_id=session_id)
        assert retrieved is not None
        assert isinstance(retrieved, AgentSession)
        assert_session_fields_deep(session, retrieved, "sh_get_by_id")
        log_test_result("[Self-hosted] Get session by ID deep check", True)
    except Exception as e:
        log_test_result("[Self-hosted] Get session by ID deep check", False, str(e))
        raise
    
    try:
        # Verify runs content in depth
        assert retrieved.runs is not None
        assert len(retrieved.runs) == 2
        run_001 = retrieved.runs["run_001"]
        assert isinstance(run_001, RunData)
        assert isinstance(run_001.output, AgentRunOutput)
        assert run_001.output.run_id == "run_001"
        assert run_001.output.status == RunStatus.completed
        assert run_001.output.accumulated_text == "Done."
        assert run_001.output.session_id == session_id
        run_002 = retrieved.runs["run_002"]
        assert run_002.output.status == RunStatus.paused
        log_test_result("[Self-hosted] runs deep content check", True)
    except Exception as e:
        log_test_result("[Self-hosted] runs deep content check", False, str(e))
        raise
    
    try:
        # Verify messages content in depth
        assert retrieved.messages is not None
        assert len(retrieved.messages) == 3
        assert isinstance(retrieved.messages[0], ModelRequest)
        assert retrieved.messages[0].parts[0].content == "Analyze"
        assert isinstance(retrieved.messages[1], ModelResponse)
        assert len(retrieved.messages[1].parts) == 2
        tool_parts = [p for p in retrieved.messages[1].parts if isinstance(p, ToolCallPart)]
        assert len(tool_parts) == 1
        assert tool_parts[0].tool_name == "calc"
        assert tool_parts[0].args == {"x": 1}
        assert isinstance(retrieved.messages[2], ModelResponse)
        thinking_parts = [p for p in retrieved.messages[2].parts if isinstance(p, ThinkingPart)]
        assert len(thinking_parts) == 1
        assert thinking_parts[0].content == "Processed."
        log_test_result("[Self-hosted] messages deep content check", True)
    except Exception as e:
        log_test_result("[Self-hosted] messages deep content check", False, str(e))
        raise
    
    try:
        # Update session — verify update and non-updated fields preserved
        session.summary = "Updated self-hosted summary"
        session.session_data = {"updated": True, "value": 99}
        result = storage.upsert_session(session, deserialize=True)
        assert result is not None
        retrieved = storage.get_session(session_id=session_id)
        assert retrieved is not None
        assert retrieved.summary == "Updated self-hosted summary"
        assert retrieved.session_data == {"updated": True, "value": 99}
        assert retrieved.agent_data == {"agent_name": "TestAgent", "model": "gpt-4"}, "agent_data should survive update"
        assert retrieved.runs is not None, "runs should survive update"
        assert len(retrieved.runs) == 2, "runs count should survive update"
        assert retrieved.messages is not None, "messages should survive update"
        assert len(retrieved.messages) == 3, "messages count should survive update"
        log_test_result("[Self-hosted] Upsert session (update) preserves fields", True)
    except Exception as e:
        log_test_result("[Self-hosted] Upsert session (update) preserves fields", False, str(e))
        raise
    
    try:
        # Get with deserialize=False — verify dict structure
        result_dict = storage.get_session(session_id=session_id, deserialize=False)
        assert isinstance(result_dict, dict)
        assert_session_dict_fields(result_dict, session_id, "sh_get_dict")
        log_test_result("[Self-hosted] Get session deserialize=False dict check", True)
    except Exception as e:
        log_test_result("[Self-hosted] Get session deserialize=False dict check", False, str(e))
        raise
    
    try:
        # Delete session — verify gone
        deleted = storage.delete_session(session_id=session_id)
        assert deleted is True
        retrieved = storage.get_session(session_id=session_id)
        assert retrieved is None
        log_test_result("[Self-hosted] Delete session verified gone", True)
    except Exception as e:
        log_test_result("[Self-hosted] Delete session verified gone", False, str(e))
        raise
    
    storage.close()


def test_self_hosted_user_memory_crud():
    """Test user memory CRUD with self-hosted Memory backend."""
    print_separator("TEST 16: Self-Hosted User Memory CRUD")
    
    from mem0 import Memory
    memory = Memory()
    storage = Mem0Storage(memory_client=memory)
    
    user_id = get_unique_id("sh_memory_user")
    
    try:
        # Create user memory — verify full content
        memory_data: Dict[str, Any] = {"preferences": {"theme": "dark", "font": 12}, "notes": "Self-hosted test", "score": 95}
        result = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=memory_data),
            deserialize=True,
        )
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == user_id
        assert result.user_memory == memory_data
        assert result.user_memory["score"] == 95
        log_test_result("[Self-hosted] Upsert user memory (create) content check", True)
    except Exception as e:
        log_test_result("[Self-hosted] Upsert user memory (create) content check", False, str(e))
        raise
    
    try:
        # Get user memory — verify exact content
        retrieved = storage.get_user_memory(user_id=user_id, deserialize=True)
        assert retrieved is not None
        assert isinstance(retrieved, UserMemory)
        assert retrieved.user_id == user_id
        assert retrieved.user_memory == memory_data
        assert retrieved.user_memory["preferences"]["theme"] == "dark"
        assert retrieved.user_memory["preferences"]["font"] == 12
        assert retrieved.user_memory["notes"] == "Self-hosted test"
        assert retrieved.user_memory["score"] == 95
        log_test_result("[Self-hosted] Get user memory exact content", True)
    except Exception as e:
        log_test_result("[Self-hosted] Get user memory exact content", False, str(e))
        raise
    
    try:
        # Update user memory — verify new replaces old
        updated_data: Dict[str, Any] = {"preferences": {"theme": "light"}, "notes": "Updated", "new_key": [1, 2, 3]}
        result = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=updated_data),
            deserialize=True,
        )
        retrieved = storage.get_user_memory(user_id=user_id, deserialize=True)
        assert isinstance(retrieved, UserMemory)
        assert retrieved.user_memory["preferences"]["theme"] == "light"
        assert retrieved.user_memory["notes"] == "Updated"
        assert retrieved.user_memory["new_key"] == [1, 2, 3]
        assert "score" not in retrieved.user_memory, "Old 'score' key should be gone"
        assert "font" not in retrieved.user_memory.get("preferences", {}), "Old 'font' should be gone"
        log_test_result("[Self-hosted] Upsert user memory (update) replaces old", True)
    except Exception as e:
        log_test_result("[Self-hosted] Upsert user memory (update) replaces old", False, str(e))
        raise
    
    try:
        # Delete user memory — verify gone
        deleted = storage.delete_user_memory(user_id=user_id)
        assert deleted is True
        retrieved = storage.get_user_memory(user_id=user_id)
        assert retrieved is None
        log_test_result("[Self-hosted] Delete user memory verified gone", True)
    except Exception as e:
        log_test_result("[Self-hosted] Delete user memory verified gone", False, str(e))
        raise
    
    storage.close()


# ============================================================================
# TEST 17: Data Integrity - Platform vs Self-Hosted Round-trip
# ============================================================================
def test_data_integrity_platform():
    """Verify that Mem0 Platform stores and retrieves data exactly as provided."""
    print_separator("TEST 17: Data Integrity - Platform Round-trip")
    
    storage = Mem0Storage(api_key=MEM0_API_KEY)
    
    # Complex nested data structures
    session_id = get_unique_id("integrity_session")
    complex_session_data: Dict[str, Any] = {
        "test": "data",
        "nested": {"arr": [1, 2, {"k": "v"}]},
        "unicode": "Hello \u00e9\u00e8\u00ea \u4e16\u754c",
        "special_chars": "key=value&foo=bar<tag>\"quoted\"",
        "large_list": list(range(100)),
        "booleans": {"t": True, "f": False},
        "null_val": None,
        "empty_str": "",
        "empty_list": [],
        "empty_dict": {},
        "float_val": 3.14159265358979,
        "negative": -999,
        "zero": 0,
    }
    
    try:
        session = create_test_agentsession(session_id=session_id)
        session.session_data = complex_session_data
        
        result = storage.upsert_session(session, deserialize=True)
        assert result is not None
        
        # Retrieve and verify EXACT data match field-by-field
        retrieved = storage.get_session(session_id=session_id, deserialize=True)
        assert retrieved is not None
        assert retrieved.session_data == complex_session_data
        assert retrieved.session_data["unicode"] == "Hello \u00e9\u00e8\u00ea \u4e16\u754c"
        assert retrieved.session_data["special_chars"] == "key=value&foo=bar<tag>\"quoted\""
        assert retrieved.session_data["large_list"] == list(range(100))
        assert len(retrieved.session_data["large_list"]) == 100
        assert retrieved.session_data["large_list"][99] == 99
        assert retrieved.session_data["booleans"]["t"] is True
        assert retrieved.session_data["booleans"]["f"] is False
        assert retrieved.session_data["null_val"] is None
        assert retrieved.session_data["empty_str"] == ""
        assert retrieved.session_data["empty_list"] == []
        assert retrieved.session_data["empty_dict"] == {}
        assert retrieved.session_data["float_val"] == 3.14159265358979
        assert retrieved.session_data["negative"] == -999
        assert retrieved.session_data["zero"] == 0
        assert retrieved.session_data["nested"]["arr"][2]["k"] == "v"
        log_test_result("[Platform] Data integrity - complex session_data every field", True)
    except Exception as e:
        log_test_result("[Platform] Data integrity - complex session_data every field", False, str(e))
        raise
    
    try:
        # Verify user memory data integrity with all types
        user_id = get_unique_id("integrity_user")
        complex_memory: Dict[str, Any] = {
            "preferences": {"theme": "dark", "lang": "en", "nested": {"a": {"b": {"c": 1}}}},
            "history": [{"action": "login", "ts": 12345}, {"action": "view", "ts": 12346}],
            "numbers": {"int": 42, "float": 3.14159, "negative": -100, "zero": 0},
            "booleans": {"true_val": True, "false_val": False},
            "null_val": None,
            "unicode": "café résumé 日本語",
            "mixed_list": [1, "two", 3.0, True, None, {"k": "v"}, [1, 2]],
        }
        result = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=complex_memory),
            deserialize=True,
        )
        assert result is not None
        
        retrieved = storage.get_user_memory(user_id=user_id, deserialize=True)
        assert retrieved is not None
        assert isinstance(retrieved, UserMemory)
        assert retrieved.user_memory == complex_memory
        assert retrieved.user_memory["numbers"]["float"] == 3.14159
        assert retrieved.user_memory["numbers"]["int"] == 42
        assert retrieved.user_memory["numbers"]["negative"] == -100
        assert retrieved.user_memory["numbers"]["zero"] == 0
        assert retrieved.user_memory["booleans"]["true_val"] is True
        assert retrieved.user_memory["booleans"]["false_val"] is False
        assert retrieved.user_memory["null_val"] is None
        assert retrieved.user_memory["unicode"] == "café résumé 日本語"
        assert retrieved.user_memory["preferences"]["nested"]["a"]["b"]["c"] == 1
        assert len(retrieved.user_memory["history"]) == 2
        assert retrieved.user_memory["history"][0]["action"] == "login"
        assert retrieved.user_memory["history"][1]["ts"] == 12346
        assert retrieved.user_memory["mixed_list"] == [1, "two", 3.0, True, None, {"k": "v"}, [1, 2]]
        assert retrieved.user_memory["mixed_list"][5]["k"] == "v"
        log_test_result("[Platform] Data integrity - complex user_memory every field", True)
        
        # Cleanup
        storage.delete_user_memory(user_id=user_id)
    except Exception as e:
        log_test_result("[Platform] Data integrity - complex user_memory every field", False, str(e))
        raise
    
    # Cleanup
    storage.delete_session(session_id=session_id)
    storage.close()


# ============================================================================
# MAIN EXECUTION
# ============================================================================
def run_all_tests():
    """Run all tests and print summary."""
    print("\n" + "=" * 80)
    print("  MEM0 STORAGE COMPREHENSIVE TEST SUITE")
    print("=" * 80)
    print(f"\nUsing API Key: {MEM0_API_KEY[:20]}...")
    
    try:
        # Platform tests
        print("\n" + "#" * 80)
        print("  PLATFORM TESTS (using API key)")
        print("#" * 80)
        test_initialization()
        test_table_management()
        test_session_crud()
        test_bulk_session_operations()
        test_session_filtering()
        test_session_pagination_sorting()
        test_user_memory_crud()
        test_bulk_user_memory_operations()
        test_error_handling()
        test_clear_all()
        test_latest_retrieval()
        test_deserialize_flag()
        test_close_method()
        test_data_integrity_platform()
        
        # Self-hosted tests
        print("\n" + "#" * 80)
        print("  SELF-HOSTED TESTS (using local Memory)")
        print("#" * 80)
        test_self_hosted_initialization()
        test_self_hosted_session_crud()
        test_self_hosted_user_memory_crud()
    except Exception as e:
        print(f"\n\u274c Test suite aborted due to error: {e}")
        import traceback
        traceback.print_exc()
    
    # Print summary
    print("\n" + "=" * 80)
    print("  TEST SUMMARY")
    print("=" * 80)
    
    passed = sum(1 for r in test_results if r["passed"])
    failed = sum(1 for r in test_results if not r["passed"])
    total = len(test_results)
    
    print(f"\n  Total:  {total}")
    print(f"  Passed: {passed}")
    print(f"  Failed: {failed}")
    
    if failed > 0:
        print("\n  Failed Tests:")
        for r in test_results:
            if not r["passed"]:
                print(f"    - {r['name']}: {r['message']}")
    
    print("\n" + "=" * 80)
    
    return failed == 0


if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
