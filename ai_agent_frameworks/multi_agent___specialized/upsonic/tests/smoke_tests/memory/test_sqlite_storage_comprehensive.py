"""Comprehensive test suite for SqliteStorage.

This test suite verifies ALL methods and attributes of SqliteStorage:
- Initialization (db_file, db_url, db_engine, custom tables, id)
- Table management (creation, existence checks)
- Session operations (upsert, get, delete, bulk operations)
- User memory operations (upsert, get, delete, bulk operations)
- Utility methods (clear_all, close)
- Edge cases and error handling
- Deserialize flag behavior
- Filtering, pagination, and sorting
"""
import os
import sys
import time
from typing import Any, Dict, List, Optional

from upsonic.session.agent import AgentSession, RunData
from upsonic.session.base import SessionType
from upsonic.storage.schemas import UserMemory
from upsonic.storage.sqlite import SqliteStorage
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


def cleanup_db(db_path: str) -> None:
    """Clean up test database file."""
    if os.path.exists(db_path):
        try:
            os.remove(db_path)
        except Exception:
            pass


def create_test_agentsession(
    session_id: str,
    agent_id: Optional[str] = None,
    user_id: Optional[str] = None,
    session_type: SessionType = SessionType.AGENT,
) -> AgentSession:
    """Create a test AgentSession with comprehensive runs and messages using REAL classes."""
    current_time = int(time.time())
    
    # Create REAL AgentRunOutput objects
    run_output_1 = AgentRunOutput(
        run_id="run_001",
        session_id=session_id,
        user_id=user_id or f"user_{session_id}",
        agent_id=agent_id or f"agent_{session_id}",
        agent_name="TestAgent",
        status=RunStatus.completed,
        accumulated_text="The data shows a 15% increase in Q3. Analysis complete.",
        output="Analysis Result: Q3 showed strong growth with 15% increase over Q2.",
    )
    
    run_output_2 = AgentRunOutput(
        run_id="run_002",
        session_id=session_id,
        user_id=user_id or f"user_{session_id}",
        agent_id=agent_id or f"agent_{session_id}",
        agent_name="TestAgent",
        status=RunStatus.paused,
        accumulated_text="Waiting for human input...",
    )
    
    # Create REAL RunData objects
    test_runs = {
        "run_001": RunData(output=run_output_1),
        "run_002": RunData(output=run_output_2),
    }
    
    # Create REAL ModelRequest and ModelResponse objects
    test_messages = [
        # User request 1
        ModelRequest(
            parts=[UserPromptPart(content="Hello, can you help me analyze this data?")],
            instructions="Be helpful and concise",
            run_id="run_001",
        ),
        # Assistant response 1
        ModelResponse(
            parts=[TextPart(content="Of course! I'd be happy to help you analyze the data. Please share the dataset.")],
            model_name="gpt-4",
        ),
        # User request 2
        ModelRequest(
            parts=[UserPromptPart(content="Here's the sales data for Q3: [100, 120, 115, 130, 125]")],
            run_id="run_001",
        ),
        # Assistant response 2 with tool call
        ModelResponse(
            parts=[
                TextPart(content="I'll analyze this sales data for you."),
                ToolCallPart(
                    tool_name="calculate_statistics",
                    tool_call_id="call_abc123",
                    args={"data": [100, 120, 115, 130, 125], "operation": "full_analysis"},
                ),
            ],
            model_name="gpt-4",
        ),
        # Assistant response 3 with thinking
        ModelResponse(
            parts=[
                TextPart(content="Based on the analysis:\n- Mean: 118\n- Trend: Upward (+15%)\n- Recommendation: Continue current strategy"),
                ThinkingPart(content="The data shows consistent growth with minor fluctuations. Q3 performance is strong."),
            ],
            model_name="gpt-4",
            provider_name="openai",
            provider_details={"finish_reason": "stop", "system_fingerprint": "fp_abc123"},
        ),
    ]
    
    return AgentSession(
        session_id=session_id,
        agent_id=agent_id or f"agent_{session_id}",
        user_id=user_id or f"user_{session_id}",
        session_type=session_type,
        session_data={
            "test": "data",
            "nested": {
                "level1": {
                    "level2": {
                        "deep_value": "This tests deep nesting",
                        "array": [1, 2, {"inner": "dict"}],
                    }
                }
            },
            "special_chars": "Test with émojis 🚀 and spëcial çharacters",
        },
        agent_data={
            "agent_name": "TestAgent",
            "model": "gpt-4",
            "temperature": 0.7,
            "tools": ["calculate_statistics", "web_search", "file_reader"],
            "system_prompt": "You are a helpful data analysis assistant.",
        },
        metadata={
            "key": "value",
            "environment": "test",
            "version": "1.0.0",
            "tags": ["test", "comprehensive", "storage"],
        },
        runs=test_runs,
        messages=test_messages,
        summary="Test session with REAL RunData/AgentRunOutput and ModelRequest/ModelResponse objects",
        created_at=current_time,
        updated_at=current_time,
    )


# ============================================================================
# TEST 1: Initialization
# ============================================================================
def test_initialization():
    """Test SqliteStorage initialization with various configurations."""
    print_separator("TEST 1: Initialization")
    
    # Test 1.1: Default initialization (creates ./upsonic.db)
    try:
        db_path = "test_init_default.db"
        cleanup_db(db_path)
        
        storage = SqliteStorage(db_file=db_path)
        assert storage.db_file == db_path or storage.db_file.endswith(db_path)
        assert storage.session_table_name == "upsonic_sessions"
        assert storage.user_memory_table_name == "upsonic_user_memories"
        assert storage.id is not None
        assert storage.db_engine is not None
        log_test_result("Default initialization", True)
        
        storage.close()
        cleanup_db(db_path)
    except Exception as e:
        log_test_result("Default initialization", False, str(e))
        raise
    
    # Test 1.2: Custom table names
    try:
        db_path = "test_init_custom_tables.db"
        cleanup_db(db_path)
        
        storage = SqliteStorage(
            db_file=db_path,
            session_table="custom_sessions",
            user_memory_table="custom_memories",
        )
        assert storage.session_table_name == "custom_sessions"
        assert storage.user_memory_table_name == "custom_memories"
        log_test_result("Custom table names", True)
        
        storage.close()
        cleanup_db(db_path)
    except Exception as e:
        log_test_result("Custom table names", False, str(e))
        raise
    
    # Test 1.3: Custom ID
    try:
        db_path = "test_init_custom_id.db"
        cleanup_db(db_path)
        
        custom_id = "test_storage_123"
        storage = SqliteStorage(db_file=db_path, id=custom_id)
        assert storage.id == custom_id
        log_test_result("Custom ID", True)
        
        storage.close()
        cleanup_db(db_path)
    except Exception as e:
        log_test_result("Custom ID", False, str(e))
        raise
    
    # Test 1.4: db_url initialization
    try:
        db_path = "test_init_db_url.db"
        cleanup_db(db_path)
        
        db_url = f"sqlite:///{os.path.abspath(db_path)}"
        storage = SqliteStorage(db_url=db_url)
        assert storage.db_url == db_url
        log_test_result("db_url initialization", True)
        
        storage.close()
        cleanup_db(db_path)
    except Exception as e:
        log_test_result("db_url initialization", False, str(e))
        raise


# ============================================================================
# TEST 2: Table Management
# ============================================================================
def test_table_management():
    """Test table creation and existence checks."""
    print_separator("TEST 2: Table Management")
    
    db_path = "test_table_mgmt.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        
        # Test 2.1: table_exists before creation
        exists = storage.table_exists(storage.session_table_name)
        assert exists is False, "Table should not exist initially"
        log_test_result("table_exists (before creation)", True)
        
        # Test 2.2: Create all tables
        storage._create_all_tables()
        log_test_result("_create_all_tables", True)
        
        # Test 2.3: table_exists after creation
        exists = storage.table_exists(storage.session_table_name)
        assert exists is True, "Session table should exist"
        exists = storage.table_exists(storage.user_memory_table_name)
        assert exists is True, "User memory table should exist"
        log_test_result("table_exists (after creation)", True)
        
        # Test 2.4: Re-create tables (should not fail)
        storage._create_all_tables()
        log_test_result("Re-create tables (idempotent)", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Table Management", False, str(e))
        raise


# ============================================================================
# TEST 3: Session Operations - Upsert
# ============================================================================
def test_session_upsert():
    """Test session upsert operations."""
    print_separator("TEST 3: Session Upsert Operations")
    
    db_path = "test_session_upsert.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
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
            session_no_id = AgentSession(session_id=None)
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
        
        # Test 3.6: CRITICAL - Verify runs and messages are correctly preserved
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
        assert isinstance(run_001.output, AgentRunOutput), f"run_001.output should be AgentRunOutput, got {type(run_001.output)}"
        assert run_001.output.run_id == "run_001", f"run_id mismatch: {run_001.output.run_id}"
        assert run_001.output.status == RunStatus.completed, f"status mismatch: {run_001.output.status}"
        
        run_002 = result_full.runs["run_002"]
        assert isinstance(run_002, RunData), f"run_002 should be RunData, got {type(run_002)}"
        assert run_002.output.status == RunStatus.paused, f"status mismatch: {run_002.output.status}"
        log_test_result("runs field round-trip verification", True)
        
        # Verify messages are correctly preserved
        assert result_full.messages is not None, "messages should not be None"
        assert isinstance(result_full.messages, list), "messages should be a list"
        assert len(result_full.messages) == 5, f"messages should have 5 entries, got {len(result_full.messages)}"
        
        # Verify message types
        msg_0 = result_full.messages[0]
        assert isinstance(msg_0, ModelRequest), f"messages[0] should be ModelRequest, got {type(msg_0)}"
        assert len(msg_0.parts) >= 1, "messages[0] should have at least 1 part"
        
        msg_1 = result_full.messages[1]
        assert isinstance(msg_1, ModelResponse), f"messages[1] should be ModelResponse, got {type(msg_1)}"
        assert msg_1.model_name == "gpt-4", f"model_name mismatch: {msg_1.model_name}"
        
        # Verify message parts contain expected types
        msg_3 = result_full.messages[3]  # Response with ToolCallPart
        assert isinstance(msg_3, ModelResponse), f"messages[3] should be ModelResponse, got {type(msg_3)}"
        has_tool_call = any(isinstance(p, ToolCallPart) for p in msg_3.parts)
        assert has_tool_call, "messages[3] should have a ToolCallPart"
        
        msg_4 = result_full.messages[4]  # Response with ThinkingPart
        assert isinstance(msg_4, ModelResponse), f"messages[4] should be ModelResponse, got {type(msg_4)}"
        has_thinking = any(isinstance(p, ThinkingPart) for p in msg_4.parts)
        assert has_thinking, "messages[4] should have a ThinkingPart"
        log_test_result("messages field round-trip verification", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Upsert", False, str(e))
        raise


# ============================================================================
# TEST 4: Session Operations - Bulk Upsert
# ============================================================================
def test_session_bulk_upsert():
    """Test bulk session upsert operations."""
    print_separator("TEST 4: Session Bulk Upsert Operations")
    
    db_path = "test_session_bulk_upsert.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
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
                AgentSession(session_id=None),
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
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Bulk Upsert", False, str(e))
        raise


# ============================================================================
# TEST 5: Session Operations - Get
# ============================================================================
def test_session_get():
    """Test session retrieval operations."""
    print_separator("TEST 5: Session Get Operations")
    
    db_path = "test_session_get.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
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
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Get", False, str(e))
        raise


# ============================================================================
# TEST 6: Session Operations - Get Multiple
# ============================================================================
def test_session_get_multiple():
    """Test multiple session retrieval operations."""
    print_separator("TEST 6: Session Get Multiple Operations")
    
    db_path = "test_session_get_multiple.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
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
            limit=3,
            offset=3,
            deserialize=True
        )
        assert len(results6) == 3
        log_test_result("get_sessions (with offset)", True)
        
        # Test 6.9: Get sessions with sorting
        results7 = storage.get_sessions(
            session_ids=None,
            sort_by="created_at",
            sort_order="asc",
            limit=5,
            deserialize=True
        )
        assert len(results7) == 5
        # Verify sorting (created_at should be ascending)
        created_ats = [s.created_at for s in results7 if s.created_at]
        assert created_ats == sorted(created_ats)
        log_test_result("get_sessions (with sorting)", True)
        
        # Test 6.10: Get sessions with empty IDs list
        results8 = storage.get_sessions(
            session_ids=[],
            deserialize=True
        )
        assert len(results8) == 0
        log_test_result("get_sessions (empty IDs list)", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Get Multiple", False, str(e))
        raise


# ============================================================================
# TEST 7: Session Operations - Delete
# ============================================================================
def test_session_delete():
    """Test session deletion operations."""
    print_separator("TEST 7: Session Delete Operations")
    
    db_path = "test_session_delete.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
        # Setup: Create test sessions
        sessions = [
            create_test_agentsession(f"delete_session_{i}")
            for i in range(5)
        ]
        storage.upsert_sessions(sessions)
        
        # Test 7.1: Delete single session
        deleted = storage.delete_session("delete_session_0")
        assert deleted is True
        result = storage.get_session(session_id="delete_session_0")
        assert result is None
        log_test_result("delete_session (single)", True)
        
        # Test 7.2: Delete non-existent session
        deleted2 = storage.delete_session("non_existent")
        assert deleted2 is False
        log_test_result("delete_session (non-existent)", True)
        
        # Test 7.3: Delete without session_id (should raise ValueError)
        try:
            storage.delete_session("")
            log_test_result("delete_session (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_session (validation)", True)
        
        # Test 7.4: Delete multiple sessions
        deleted_count = storage.delete_sessions(
            ["delete_session_1", "delete_session_2", "delete_session_3"]
        )
        assert deleted_count == 3
        results, _ = storage.get_sessions(
            session_ids=["delete_session_1", "delete_session_2", "delete_session_3"],
            deserialize=False
        )
        assert len(results) == 0
        log_test_result("delete_sessions (bulk)", True)
        
        # Test 7.5: Delete multiple with empty list (should raise ValueError)
        try:
            storage.delete_sessions([])
            log_test_result("delete_sessions (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_sessions (validation)", True)
        
        # Test 7.6: Delete multiple with some non-existent
        deleted_count2 = storage.delete_sessions(
            ["delete_session_4", "non_existent_1", "non_existent_2"]
        )
        assert deleted_count2 == 1  # Only one exists
        log_test_result("delete_sessions (with non-existent)", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Delete", False, str(e))
        raise


# ============================================================================
# TEST 8: User Memory Operations - Upsert
# ============================================================================
def test_user_memory_upsert():
    """Test user memory upsert operations."""
    print_separator("TEST 8: User Memory Upsert Operations")
    
    db_path = "test_user_memory_upsert.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
        # Test 8.1: Upsert single user memory
        user_id = "user_001"
        user_memory = {"preferences": {"theme": "dark"}, "history": ["item1", "item2"]}
        
        result = storage.upsert_user_memory(
            user_memory=UserMemory(
                user_id=user_id,
                user_memory=user_memory,
                agent_id="agent_001",
                team_id="team_001"
            ),
            deserialize=True
        )
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == user_id
        assert result.user_memory == user_memory
        assert result.agent_id == "agent_001"
        assert result.team_id == "team_001"
        assert result.created_at is not None
        assert result.updated_at is not None
        log_test_result("upsert_user_memory (single)", True)
        
        # Test 8.2: Upsert without user_id (should raise ValueError)
        try:
            storage.upsert_user_memory(
                user_memory=UserMemory(user_id="", user_memory={})
            )
            log_test_result("upsert_user_memory (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("upsert_user_memory (validation)", True)
        
        # Test 8.3: Update existing user memory
        updated_memory = {"preferences": {"theme": "light"}, "history": ["item1", "item2", "item3"]}
        result2 = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=updated_memory)
        )
        assert isinstance(result2, UserMemory)
        assert result2.user_memory == updated_memory
        log_test_result("upsert_user_memory (update existing)", True)
        
        # Test 8.4: Upsert with minimal fields
        user_id2 = "user_002"
        result3 = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id2, user_memory={"data": "test"})
        )
        assert isinstance(result3, UserMemory)
        assert result3.user_id == user_id2
        assert result3.user_memory == {"data": "test"}
        log_test_result("upsert_user_memory (minimal fields)", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Upsert", False, str(e))
        raise


# ============================================================================
# TEST 9: User Memory Operations - Bulk Upsert
# ============================================================================
def test_user_memory_bulk_upsert():
    """Test bulk user memory upsert operations."""
    print_separator("TEST 9: User Memory Bulk Upsert Operations")
    
    db_path = "test_user_memory_bulk_upsert.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
        # Test 9.1: Bulk upsert multiple user memories
        user_memories = [
            UserMemory(
                user_id=f"bulk_user_{i}",
                user_memory={"data": f"memory_{i}"},
                agent_id=f"agent_{i % 2}",
            )
            for i in range(5)
        ]
        
        results = storage.upsert_user_memories(user_memories, deserialize=True)
        assert len(results) == 5
        assert all(isinstance(r, UserMemory) for r in results)
        assert all(r.user_id in [f"bulk_user_{i}" for i in range(5)] for r in results)
        log_test_result("upsert_user_memories (bulk)", True)
        
        # Test 9.2: Bulk upsert empty list
        results2 = storage.upsert_user_memories([])
        assert results2 == []
        log_test_result("upsert_user_memories (empty list)", True)
        
        # Test 9.3: Bulk upsert with missing user_id (should raise ValueError)
        try:
            invalid_memories = [
                UserMemory(user_id="valid_user", user_memory={}),
                UserMemory(user_id="", user_memory={}),  # Empty user_id
            ]
            storage.upsert_user_memories(invalid_memories)
            log_test_result("upsert_user_memories (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("upsert_user_memories (validation)", True)
        
        # Test 9.4: Bulk upsert update existing
        user_memories[0].user_memory = {"data": "updated_memory_0"}
        updated_results = storage.upsert_user_memories([user_memories[0]])
        assert isinstance(updated_results[0], UserMemory)
        assert updated_results[0].user_memory == {"data": "updated_memory_0"}
        log_test_result("upsert_user_memories (update existing)", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Bulk Upsert", False, str(e))
        raise


# ============================================================================
# TEST 10: User Memory Operations - Get
# ============================================================================
def test_user_memory_get():
    """Test user memory retrieval operations."""
    print_separator("TEST 10: User Memory Get Operations")
    
    db_path = "test_user_memory_get.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
        # Setup: Create test user memories
        for i in range(5):
            storage.upsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"get_user_{i}",
                    user_memory={"data": f"memory_{i}"},
                    agent_id=f"agent_{i % 2}",
                    team_id=f"team_{i % 3}"
                )
            )
        
        # Test 10.1: Get user memory by user_id
        result = storage.get_user_memory(user_id="get_user_0")
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == "get_user_0"
        assert result.user_memory["data"] == "memory_0"
        log_test_result("get_user_memory (by user_id)", True)
        
        # Test 10.2: Get non-existent user memory
        result2 = storage.get_user_memory(user_id="non_existent")
        assert result2 is None
        log_test_result("get_user_memory (non-existent)", True)
        
        # Test 10.3: Get latest user memory (no user_id)
        result3 = storage.get_user_memory(user_id=None)
        assert result3 is not None
        assert isinstance(result3, UserMemory)
        assert result3.user_id is not None
        log_test_result("get_user_memory (latest, no ID)", True)
        
        # Test 10.4: Get user memory with agent_id filter
        result4 = storage.get_user_memory(
            user_id=None,
            agent_id="agent_0"
        )
        assert result4 is not None
        assert isinstance(result4, UserMemory)
        assert result4.agent_id == "agent_0"
        log_test_result("get_user_memory (with agent_id filter)", True)
        
        # Test 10.5: Get user memory with team_id filter
        result5 = storage.get_user_memory(
            user_id=None,
            team_id="team_0"
        )
        assert result5 is not None
        assert isinstance(result5, UserMemory)
        assert result5.team_id == "team_0"
        log_test_result("get_user_memory (with team_id filter)", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Get", False, str(e))
        raise


# ============================================================================
# TEST 11: User Memory Operations - Get Multiple
# ============================================================================
def test_user_memory_get_multiple():
    """Test multiple user memory retrieval operations."""
    print_separator("TEST 11: User Memory Get Multiple Operations")
    
    db_path = "test_user_memory_get_multiple.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
        # Setup: Create test user memories
        for i in range(10):
            storage.upsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"multi_user_{i}",
                    user_memory={"data": f"memory_{i}"},
                    agent_id=f"agent_{i % 2}",
                    team_id=f"team_{i % 3}"
                )
            )
        
        # Test 11.1: Get all user memories (deserialize=True returns List[UserMemory])
        all_memories = storage.get_user_memories(user_ids=None, deserialize=True)
        assert isinstance(all_memories, list)
        assert len(all_memories) == 10
        assert all(isinstance(m, UserMemory) for m in all_memories)
        log_test_result("get_user_memories (all, deserialize=True)", True)
        
        # Test 11.2: Get all user memories (deserialize=False returns tuple)
        all_memories_raw, count = storage.get_user_memories(user_ids=None, deserialize=False)
        assert isinstance(all_memories_raw, list)
        assert isinstance(count, int)
        assert len(all_memories_raw) == 10
        assert count == 10
        log_test_result("get_user_memories (all, deserialize=False)", True)
        
        # Test 11.3: Get user memories by IDs
        user_ids = ["multi_user_0", "multi_user_1", "multi_user_2"]
        results = storage.get_user_memories(user_ids=user_ids, deserialize=True)
        assert len(results) == 3
        assert all(isinstance(r, UserMemory) for r in results)
        assert all(r.user_id in user_ids for r in results)
        log_test_result("get_user_memories (by IDs)", True)
        
        # Test 11.4: Get user memories with agent_id filter
        results2 = storage.get_user_memories(
            user_ids=None,
            agent_id="agent_0",
            deserialize=True
        )
        assert all(isinstance(r, UserMemory) for r in results2)
        assert all(r.agent_id == "agent_0" for r in results2)
        log_test_result("get_user_memories (with agent_id filter)", True)
        
        # Test 11.5: Get user memories with team_id filter
        results3 = storage.get_user_memories(
            user_ids=None,
            team_id="team_0",
            deserialize=True
        )
        assert all(isinstance(r, UserMemory) for r in results3)
        assert all(r.team_id == "team_0" for r in results3)
        log_test_result("get_user_memories (with team_id filter)", True)
        
        # Test 11.6: Get user memories with limit (deserialize=False for count)
        results4, count5 = storage.get_user_memories(
            user_ids=None,
            limit=3,
            deserialize=False
        )
        assert len(results4) == 3
        assert count5 == 10
        log_test_result("get_user_memories (with limit)", True)
        
        # Test 11.7: Get user memories with offset
        results5, count6 = storage.get_user_memories(
            user_ids=None,
            limit=3,
            offset=3,
            deserialize=False
        )
        assert len(results5) == 3
        assert count6 == 10
        log_test_result("get_user_memories (with offset)", True)
        
        # Test 11.8: Get user memories with empty IDs list
        results6 = storage.get_user_memories(user_ids=[], deserialize=True)
        assert len(results6) == 0
        log_test_result("get_user_memories (empty IDs list)", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Get Multiple", False, str(e))
        raise


# ============================================================================
# TEST 12: User Memory Operations - Delete
# ============================================================================
def test_user_memory_delete():
    """Test user memory deletion operations."""
    print_separator("TEST 12: User Memory Delete Operations")
    
    db_path = "test_user_memory_delete.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
        # Setup: Create test user memories
        for i in range(5):
            storage.upsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"delete_user_{i}",
                    user_memory={"data": f"memory_{i}"}
                )
            )
        
        # Test 12.1: Delete single user memory
        deleted = storage.delete_user_memory("delete_user_0")
        assert deleted is True
        result = storage.get_user_memory(user_id="delete_user_0")
        assert result is None
        log_test_result("delete_user_memory (single)", True)
        
        # Test 12.2: Delete non-existent user memory
        deleted2 = storage.delete_user_memory("non_existent")
        assert deleted2 is False
        log_test_result("delete_user_memory (non-existent)", True)
        
        # Test 12.3: Delete without user_id (should raise ValueError)
        try:
            storage.delete_user_memory("")
            log_test_result("delete_user_memory (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_user_memory (validation)", True)
        
        # Test 12.4: Delete multiple user memories
        deleted_count = storage.delete_user_memories(
            ["delete_user_1", "delete_user_2", "delete_user_3"]
        )
        assert deleted_count == 3
        results = storage.get_user_memories(
            user_ids=["delete_user_1", "delete_user_2", "delete_user_3"],
            deserialize=True
        )
        assert len(results) == 0
        log_test_result("delete_user_memories (bulk)", True)
        
        # Test 12.5: Delete multiple with empty list (should raise ValueError)
        try:
            storage.delete_user_memories([])
            log_test_result("delete_user_memories (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_user_memories (validation)", True)
        
        # Test 12.6: Delete multiple with some non-existent
        deleted_count2 = storage.delete_user_memories(
            ["delete_user_4", "non_existent_1", "non_existent_2"]
        )
        assert deleted_count2 == 1
        log_test_result("delete_user_memories (with non-existent)", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Delete", False, str(e))
        raise


# ============================================================================
# TEST 13: Utility Methods
# ============================================================================
def test_utility_methods():
    """Test utility methods (clear_all, close)."""
    print_separator("TEST 13: Utility Methods")
    
    db_path = "test_utility_methods.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
        # Setup: Create test data
        sessions = [
            create_test_agentsession(f"util_session_{i}")
            for i in range(3)
        ]
        storage.upsert_sessions(sessions)
        
        for i in range(3):
            storage.upsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"util_user_{i}",
                    user_memory={"data": f"memory_{i}"}
                )
            )
        
        # Verify data exists
        all_sessions = storage.get_sessions(deserialize=True)
        assert len(all_sessions) == 3
        all_memories = storage.get_user_memories(deserialize=True)
        assert len(all_memories) == 3
        
        # Test 13.1: Clear all data
        storage.clear_all()
        
        # Verify all data is cleared
        all_sessions2 = storage.get_sessions(deserialize=True)
        assert len(all_sessions2) == 0
        all_memories2 = storage.get_user_memories(deserialize=True)
        assert len(all_memories2) == 0
        log_test_result("clear_all", True)
        
        # Test 13.2: Close storage
        storage.close()
        # Should not raise exception
        log_test_result("close", True)
        
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Utility Methods", False, str(e))
        raise


# ============================================================================
# TEST 14: Edge Cases and Error Handling
# ============================================================================
def test_edge_cases():
    """Test edge cases and error handling."""
    print_separator("TEST 14: Edge Cases and Error Handling")
    
    db_path = "test_edge_cases.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
        # Test 14.1: Operations on empty database
        all_sessions, count = storage.get_sessions(deserialize=False)
        assert len(all_sessions) == 0
        assert count == 0
        log_test_result("get_sessions (empty database)", True)
        
        all_memories, count2 = storage.get_user_memories(deserialize=False)
        assert len(all_memories) == 0
        assert count2 == 0
        log_test_result("get_user_memories (empty database)", True)
        
        # Test 14.2: Get latest when no data exists
        latest_session = storage.get_session(session_id=None)
        assert latest_session is None
        log_test_result("get_session (latest, no data)", True)
        
        latest_memory = storage.get_user_memory(user_id=None)
        assert latest_memory is None
        log_test_result("get_user_memory (latest, no data)", True)
        
        # Test 14.3: Complex JSON data in session
        complex_session = create_test_agentsession("complex_session")
        complex_session.session_data = {
            "nested": {"deep": {"value": 123}},
            "list": [1, 2, {"item": "test"}],
            "unicode": "测试 🚀",
        }
        complex_session.metadata = {"tags": ["tag1", "tag2"], "score": 95.5}
        
        result = storage.upsert_session(complex_session, deserialize=True)
        assert result.session_data["nested"]["deep"]["value"] == 123
        assert result.metadata["score"] == 95.5
        log_test_result("Complex JSON data in session", True)
        
        # Test 14.4: Complex JSON data in user memory
        complex_memory = {
            "preferences": {
                "theme": "dark",
                "language": "en",
                "notifications": {"email": True, "push": False}
            },
            "history": [
                {"action": "login", "timestamp": 1234567890},
                {"action": "logout", "timestamp": 1234567900}
            ]
        }
        result2 = storage.upsert_user_memory(
            user_memory=UserMemory(
                user_id="complex_user",
                user_memory=complex_memory
            )
        )
        assert isinstance(result2, UserMemory)
        assert result2.user_memory["preferences"]["theme"] == "dark"
        assert len(result2.user_memory["history"]) == 2
        log_test_result("Complex JSON data in user memory", True)
        
        # Test 14.5: Large data handling
        large_data = {"data": "x" * 10000}  # 10KB string
        large_session = create_test_agentsession("large_session")
        large_session.session_data = large_data
        
        result3 = storage.upsert_session(large_session, deserialize=True)
        assert len(result3.session_data["data"]) == 10000
        log_test_result("Large data handling", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Edge Cases", False, str(e))
        raise


# ============================================================================
# TEST 15: Session Type Handling
# ============================================================================
def test_session_type_handling():
    """Test proper handling of different session types."""
    print_separator("TEST 15: Session Type Handling")
    
    db_path = "test_session_types.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        storage._create_all_tables()
        
        # Test 15.1: Store and retrieve AGENT session
        # Note: AgentSession always stores with session_type=AGENT regardless of the parameter
        agent_session = create_test_agentsession("agent_001", session_type=SessionType.AGENT)
        result = storage.upsert_session(agent_session, deserialize=True)
        assert result.session_type == SessionType.AGENT
        retrieved = storage.get_session(session_id="agent_001", deserialize=True)
        assert retrieved.session_type == SessionType.AGENT
        log_test_result("AGENT session type", True)
        
        # Test 15.2: Store another AGENT session
        agent_session2 = create_test_agentsession("agent_002", session_type=SessionType.AGENT)
        result2 = storage.upsert_session(agent_session2, deserialize=True)
        assert result2.session_type == SessionType.AGENT
        retrieved2 = storage.get_session(session_id="agent_002", deserialize=True)
        assert retrieved2.session_type == SessionType.AGENT
        log_test_result("AGENT session type persistence", True)
        
        # Test 15.3: Store agent session with different IDs
        agent_session3 = create_test_agentsession("agent_003", session_type=SessionType.AGENT)
        result3 = storage.upsert_session(agent_session3, deserialize=True)
        assert result3.session_type == SessionType.AGENT
        retrieved3 = storage.get_session(session_id="agent_003", deserialize=True)
        assert retrieved3.session_type == SessionType.AGENT
        log_test_result("AGENT session type consistency", True)
        
        # Test 15.4: Filter by session type
        agent_sessions = storage.get_sessions(
            session_type=SessionType.AGENT,
            deserialize=True
        )
        assert all(s.session_type == SessionType.AGENT for s in agent_sessions)
        assert len(agent_sessions) >= 1
        log_test_result("Filter by session type", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Type Handling", False, str(e))
        raise


# ============================================================================
# TEST 16: Attributes and Properties
# ============================================================================
def test_attributes_and_properties():
    """Test all attributes and properties of SqliteStorage."""
    print_separator("TEST 16: Attributes and Properties")
    
    db_path = "test_attributes.db"
    cleanup_db(db_path)
    
    try:
        storage = SqliteStorage(db_file=db_path)
        
        # Test 16.1: id attribute
        assert hasattr(storage, "id")
        assert storage.id is not None
        assert isinstance(storage.id, str)
        log_test_result("id attribute", True)
        
        # Test 16.2: session_table_name attribute
        assert hasattr(storage, "session_table_name")
        assert storage.session_table_name == "upsonic_sessions"
        log_test_result("session_table_name attribute", True)
        
        # Test 16.3: user_memory_table_name attribute
        assert hasattr(storage, "user_memory_table_name")
        assert storage.user_memory_table_name == "upsonic_user_memories"
        log_test_result("user_memory_table_name attribute", True)
        
        # Test 16.4: db_engine attribute
        assert hasattr(storage, "db_engine")
        assert storage.db_engine is not None
        log_test_result("db_engine attribute", True)
        
        # Test 16.5: db_file attribute
        assert hasattr(storage, "db_file")
        assert storage.db_file is not None
        log_test_result("db_file attribute", True)
        
        # Test 16.6: metadata attribute
        assert hasattr(storage, "metadata")
        assert storage.metadata is not None
        log_test_result("metadata attribute", True)
        
        # Test 16.7: Session attribute (scoped_session)
        assert hasattr(storage, "Session")
        assert storage.Session is not None
        log_test_result("Session attribute", True)
        
        storage.close()
        cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Attributes and Properties", False, str(e))
        raise


# ============================================================================
# Main Test Runner
# ============================================================================
def run_all_tests():
    """Run all tests and print summary."""
    print("\n" + "=" * 80, flush=True)
    print("  SqliteStorage Comprehensive Test Suite", flush=True)
    print("=" * 80 + "\n", flush=True)
    
    tests = [
        test_initialization,
        test_table_management,
        test_session_upsert,
        test_session_bulk_upsert,
        test_session_get,
        test_session_get_multiple,
        test_session_delete,
        test_user_memory_upsert,
        test_user_memory_bulk_upsert,
        test_user_memory_get,
        test_user_memory_get_multiple,
        test_user_memory_delete,
        test_utility_methods,
        test_edge_cases,
        test_session_type_handling,
        test_attributes_and_properties,
    ]
    
    for test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"\n❌ Test {test_func.__name__} failed with exception: {e}", flush=True)
            import traceback
            traceback.print_exc()
    
    # Print summary
    print("\n" + "=" * 80, flush=True)
    print("  Test Summary", flush=True)
    print("=" * 80 + "\n", flush=True)
    
    passed = sum(1 for r in test_results if r["passed"])
    failed = len(test_results) - passed
    total = len(test_results)
    
    print(f"Total Tests: {total}", flush=True)
    print(f"✅ Passed: {passed}", flush=True)
    print(f"❌ Failed: {failed}", flush=True)
    print(f"Success Rate: {(passed/total*100):.1f}%\n", flush=True)
    
    if failed > 0:
        print("Failed Tests:", flush=True)
        for result in test_results:
            if not result["passed"]:
                print(f"  ❌ {result['name']}", flush=True)
                if result["message"]:
                    print(f"     └─ {result['message'][:100]}...", flush=True)
    
    print("\n" + "=" * 80, flush=True)
    
    return passed == total


if __name__ == "__main__":
    try:
        success = run_all_tests()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n⚠ Tests interrupted by user", flush=True)
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Test runner error: {e}", flush=True)
        import traceback
        traceback.print_exc()
        sys.exit(1)

