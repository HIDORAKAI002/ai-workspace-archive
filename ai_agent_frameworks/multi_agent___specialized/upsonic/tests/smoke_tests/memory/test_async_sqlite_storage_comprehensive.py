"""Comprehensive test suite for AsyncSqliteStorage.

This test suite verifies ALL methods and attributes of AsyncSqliteStorage:
- Initialization (db_file, db_url, db_engine, custom tables, id)
- Table management (creation, existence checks)
- Session operations (upsert, get, delete, bulk operations)
- User memory operations (upsert, get, delete, bulk operations)
- Utility methods (clear_all, close)
- Edge cases and error handling
- Deserialize flag behavior
- Filtering, pagination, and sorting
"""
import asyncio
import os
import sys
import time
from typing import Any, Dict, List, Optional

import pytest

from upsonic.session.agent import AgentSession, RunData
from upsonic.session.base import SessionType
from upsonic.storage.schemas import UserMemory
from upsonic.storage.sqlite import AsyncSqliteStorage
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


async def cleanup_db(db_path: str) -> None:
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
        output="Analysis Result: Q3 showed strong growth.",
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
        ModelRequest(
            parts=[UserPromptPart(content="Hello, analyze this data")],
            run_id="run_001",
        ),
        ModelResponse(
            parts=[
                TextPart(content="I'll analyze the data for you."),
                ToolCallPart(tool_name="calculate_statistics", tool_call_id="call_123", args={"data": [1, 2, 3]}),
            ],
            model_name="gpt-4",
        ),
        ModelResponse(
            parts=[
                TextPart(content="Analysis complete: Mean=2, Trend=Stable"),
                ThinkingPart(content="The data shows consistent values."),
            ],
            model_name="gpt-4",
            provider_details={"finish_reason": "stop"},
        ),
    ]
    
    return AgentSession(
        session_id=session_id,
        agent_id=agent_id or f"agent_{session_id}",
        user_id=user_id or f"user_{session_id}",
        session_type=session_type,
        session_data={
            "test": "data",
            "nested": {"level1": {"level2": {"deep": "value", "array": [1, 2, {"inner": "dict"}]}}},
            "special_chars": "Test émojis 🚀 and spëcial çhars",
        },
        agent_data={
            "agent_name": "TestAgent",
            "model": "gpt-4",
            "tools": ["calculate_statistics", "web_search"],
        },
        metadata={"key": "value", "tags": ["test", "comprehensive"]},
        runs=test_runs,
        messages=test_messages,
        summary="Test session with REAL RunData and ModelRequest/ModelResponse objects",
        created_at=current_time,
        updated_at=current_time,
    )


# ============================================================================
# TEST 1: Initialization
# ============================================================================
@pytest.mark.asyncio
async def test_initialization():
    """Test AsyncSqliteStorage initialization with various configurations."""
    print_separator("TEST 1: Initialization")
    
    # Test 1.1: Default initialization (creates ./upsonic.db)
    try:
        db_path = "test_init_default.db"
        await cleanup_db(db_path)
        
        storage = AsyncSqliteStorage(db_file=db_path)
        assert storage.db_file == db_path or storage.db_file.endswith(db_path)
        assert storage.session_table_name == "upsonic_sessions"
        assert storage.user_memory_table_name == "upsonic_user_memories"
        assert storage.id is not None
        assert storage.db_engine is not None
        log_test_result("Default initialization", True)
        
        await storage.close()
        await cleanup_db(db_path)
    except Exception as e:
        log_test_result("Default initialization", False, str(e))
        raise
    
    # Test 1.2: Custom table names
    try:
        db_path = "test_init_custom_tables.db"
        await cleanup_db(db_path)
        
        storage = AsyncSqliteStorage(
            db_file=db_path,
            session_table="custom_sessions",
            user_memory_table="custom_memories",
        )
        assert storage.session_table_name == "custom_sessions"
        assert storage.user_memory_table_name == "custom_memories"
        log_test_result("Custom table names", True)
        
        await storage.close()
        await cleanup_db(db_path)
    except Exception as e:
        log_test_result("Custom table names", False, str(e))
        raise
    
    # Test 1.3: Custom ID
    try:
        db_path = "test_init_custom_id.db"
        await cleanup_db(db_path)
        
        custom_id = "test_storage_123"
        storage = AsyncSqliteStorage(db_file=db_path, id=custom_id)
        assert storage.id == custom_id
        log_test_result("Custom ID", True)
        
        await storage.close()
        await cleanup_db(db_path)
    except Exception as e:
        log_test_result("Custom ID", False, str(e))
        raise
    
    # Test 1.4: db_url initialization
    try:
        db_path = "test_init_db_url.db"
        await cleanup_db(db_path)
        
        db_url = f"sqlite+aiosqlite:///{os.path.abspath(db_path)}"
        storage = AsyncSqliteStorage(db_url=db_url)
        assert storage.db_url == db_url
        log_test_result("db_url initialization", True)
        
        await storage.close()
        await cleanup_db(db_path)
    except Exception as e:
        log_test_result("db_url initialization", False, str(e))
        raise


# ============================================================================
# TEST 2: Table Management
# ============================================================================
@pytest.mark.asyncio
async def test_table_management():
    """Test table creation and existence checks."""
    print_separator("TEST 2: Table Management")
    
    db_path = "test_table_mgmt.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        
        # Test 2.1: table_exists before creation
        exists = await storage.table_exists(storage.session_table_name)
        assert exists is False, "Table should not exist initially"
        log_test_result("table_exists (before creation)", True)
        
        # Test 2.2: Create all tables
        await storage._create_all_tables()
        log_test_result("_create_all_tables", True)
        
        # Test 2.3: table_exists after creation
        exists = await storage.table_exists(storage.session_table_name)
        assert exists is True, "Session table should exist"
        exists = await storage.table_exists(storage.user_memory_table_name)
        assert exists is True, "User memory table should exist"
        log_test_result("table_exists (after creation)", True)
        
        # Test 2.4: Re-create tables (should not fail)
        await storage._create_all_tables()
        log_test_result("Re-create tables (idempotent)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Table Management", False, str(e))
        raise


# ============================================================================
# TEST 3: Session Operations - Upsert
# ============================================================================
@pytest.mark.asyncio
async def test_session_upsert():
    """Test session upsert operations."""
    print_separator("TEST 3: Session Upsert Operations")
    
    db_path = "test_session_upsert.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Test 3.1: Upsert single session
        session_id = "test_session_001"
        session = create_test_agentsession(session_id)
        
        result = await storage.aupsert_session(session, deserialize=True)
        assert result is not None
        assert isinstance(result, AgentSession)
        assert result.session_id == session_id
        assert result.agent_id == session.agent_id
        log_test_result("aupsert_session (single, deserialize=True)", True)
        
        # Test 3.2: Upsert with deserialize=False
        session_id2 = "test_session_002"
        session2 = create_test_agentsession(session_id2)
        result2 = await storage.aupsert_session(session2, deserialize=False)
        assert result2 is not None
        assert isinstance(result2, dict)
        assert result2["session_id"] == session_id2
        log_test_result("aupsert_session (deserialize=False)", True)
        
        # Test 3.3: Upsert without session_id (should raise ValueError)
        try:
            session_no_id = AgentSession(session_id=None)
            await storage.aupsert_session(session_no_id)
            log_test_result("aupsert_session (no session_id validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("aupsert_session (no session_id validation)", True)
        
        # Test 3.4: Update existing session
        session.agent_data = {"agent_name": "UpdatedAgent"}
        session.summary = "Updated summary"
        updated = await storage.aupsert_session(session, deserialize=True)
        assert updated is not None
        assert updated.summary == "Updated summary"
        assert updated.agent_data["agent_name"] == "UpdatedAgent"
        log_test_result("aupsert_session (update existing)", True)
        
        # Test 3.5: Upsert with different session types
        session_agent = create_test_agentsession("session_agent", session_type=SessionType.AGENT)
        result_agent = await storage.aupsert_session(session_agent, deserialize=True)
        assert result_agent.session_type == SessionType.AGENT
        log_test_result("aupsert_session (AGENT type)", True)
        
        # Note: AgentSession is always stored as AGENT type regardless of session_type parameter
        # TeamSession and WorkflowSession classes are not yet implemented
        session_agent2 = create_test_agentsession("session_agent2", session_type=SessionType.AGENT)
        result_agent2 = await storage.aupsert_session(session_agent2, deserialize=True)
        assert result_agent2.session_type == SessionType.AGENT
        log_test_result("aupsert_session (AGENT type persistence)", True)
        
        # Test 3.6: CRITICAL - Verify runs and messages are correctly preserved
        session_with_data = create_test_agentsession("session_full_data")
        result_full = await storage.aupsert_session(session_with_data, deserialize=True)
        
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
        
        # Verify message parts contain expected types
        has_tool_call = any(isinstance(p, ToolCallPart) for p in msg_1.parts)
        assert has_tool_call, "messages[1] should have a ToolCallPart"
        
        msg_2 = result_full.messages[2]
        has_thinking = any(isinstance(p, ThinkingPart) for p in msg_2.parts)
        assert has_thinking, "messages[2] should have a ThinkingPart"
        log_test_result("messages field round-trip verification", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Upsert", False, str(e))
        raise


# ============================================================================
# TEST 4: Session Operations - Bulk Upsert
# ============================================================================
@pytest.mark.asyncio
async def test_session_bulk_upsert():
    """Test bulk session upsert operations."""
    print_separator("TEST 4: Session Bulk Upsert Operations")
    
    db_path = "test_session_bulk_upsert.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Test 4.1: Bulk upsert multiple sessions
        sessions = [
            create_test_agentsession(f"bulk_session_{i}", user_id=f"user_{i}")
            for i in range(5)
        ]
        
        results = await storage.aupsert_sessions(sessions, deserialize=True)
        assert len(results) == 5
        assert all(isinstance(r, AgentSession) for r in results)
        log_test_result("aupsert_sessions (bulk, deserialize=True)", True)
        
        # Test 4.2: Bulk upsert with deserialize=False
        sessions2 = [
            create_test_agentsession(f"bulk_session2_{i}")
            for i in range(3)
        ]
        results2 = await storage.aupsert_sessions(sessions2, deserialize=False)
        assert len(results2) == 3
        assert all(isinstance(r, dict) for r in results2)
        log_test_result("aupsert_sessions (bulk, deserialize=False)", True)
        
        # Test 4.3: Bulk upsert empty list
        results3 = await storage.aupsert_sessions([], deserialize=True)
        assert results3 == []
        log_test_result("aupsert_sessions (empty list)", True)
        
        # Test 4.4: Bulk upsert with missing session_id (should raise ValueError)
        try:
            invalid_sessions = [
                create_test_agentsession("valid_session"),
                AgentSession(session_id=None),
            ]
            await storage.aupsert_sessions(invalid_sessions)
            log_test_result("aupsert_sessions (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("aupsert_sessions (validation)", True)
        
        # Test 4.5: Bulk upsert update existing
        sessions[0].summary = "Bulk updated summary"
        updated_results = await storage.aupsert_sessions([sessions[0]], deserialize=True)
        assert updated_results[0].summary == "Bulk updated summary"
        log_test_result("aupsert_sessions (update existing)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Bulk Upsert", False, str(e))
        raise


# ============================================================================
# TEST 5: Session Operations - Get
# ============================================================================
@pytest.mark.asyncio
async def test_session_get():
    """Test session retrieval operations."""
    print_separator("TEST 5: Session Get Operations")
    
    db_path = "test_session_get.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Setup: Create test sessions
        sessions = [
            create_test_agentsession(f"get_session_{i}", user_id="user_001", agent_id=f"agent_{i}")
            for i in range(5)
        ]
        await storage.aupsert_sessions(sessions)
        
        # Test 5.1: Get session by ID
        result = await storage.aget_session(session_id="get_session_0", deserialize=True)
        assert result is not None
        assert isinstance(result, AgentSession)
        assert result.session_id == "get_session_0"
        log_test_result("aget_session (by ID, deserialize=True)", True)
        
        # Test 5.2: Get session with deserialize=False
        result2 = await storage.aget_session(session_id="get_session_1", deserialize=False)
        assert result2 is not None
        assert isinstance(result2, dict)
        assert result2["session_id"] == "get_session_1"
        log_test_result("aget_session (by ID, deserialize=False)", True)
        
        # Test 5.3: Get non-existent session
        result3 = await storage.aget_session(session_id="non_existent", deserialize=True)
        assert result3 is None
        log_test_result("aget_session (non-existent)", True)
        
        # Test 5.4: Get latest session (no session_id)
        result4 = await storage.aget_session(session_id=None, deserialize=True)
        assert result4 is not None
        assert isinstance(result4, AgentSession)
        log_test_result("aget_session (latest, no ID)", True)
        
        # Test 5.5: Get session with user_id filter
        result5 = await storage.aget_session(
            session_id=None,
            user_id="user_001",
            deserialize=True
        )
        assert result5 is not None
        assert result5.user_id == "user_001"
        log_test_result("aget_session (with user_id filter)", True)
        
        # Test 5.6: Get session with agent_id filter
        result6 = await storage.aget_session(
            session_id=None,
            agent_id="agent_2",
            deserialize=True
        )
        assert result6 is not None
        assert result6.agent_id == "agent_2"
        log_test_result("aget_session (with agent_id filter)", True)
        
        # Test 5.7: Get session with session_type filter
        result7 = await storage.aget_session(
            session_id="get_session_0",
            session_type=SessionType.AGENT,
            deserialize=True
        )
        assert result7 is not None
        assert result7.session_type == SessionType.AGENT
        log_test_result("aget_session (with session_type filter)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Get", False, str(e))
        raise


# ============================================================================
# TEST 6: Session Operations - Get Multiple
# ============================================================================
@pytest.mark.asyncio
async def test_session_get_multiple():
    """Test multiple session retrieval operations."""
    print_separator("TEST 6: Session Get Multiple Operations")
    
    db_path = "test_session_get_multiple.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Setup: Create test sessions with different attributes
        sessions = []
        for i in range(10):
            session = create_test_agentsession(
                f"multi_session_{i}",
                user_id=f"user_{i % 3}",  # 3 different users
                agent_id=f"agent_{i % 2}",  # 2 different agents
            )
            sessions.append(session)
        await storage.aupsert_sessions(sessions)
        
        # Test 6.1: Get all sessions
        all_sessions, count = await storage.aget_sessions(
            session_ids=None,
            deserialize=False
        )
        assert isinstance(all_sessions, list)
        assert isinstance(count, int)
        assert len(all_sessions) == 10
        assert count == 10
        log_test_result("aget_sessions (all, deserialize=False)", True)
        
        # Test 6.2: Get all sessions with deserialize=True
        all_sessions2 = await storage.aget_sessions(
            session_ids=None,
            deserialize=True
        )
        assert isinstance(all_sessions2, list)
        assert all(isinstance(s, AgentSession) for s in all_sessions2)
        assert len(all_sessions2) == 10
        log_test_result("aget_sessions (all, deserialize=True)", True)
        
        # Test 6.3: Get sessions by IDs
        session_ids = ["multi_session_0", "multi_session_1", "multi_session_2"]
        results = await storage.aget_sessions(
            session_ids=session_ids,
            deserialize=True
        )
        assert len(results) == 3
        assert all(s.session_id in session_ids for s in results)
        log_test_result("aget_sessions (by IDs)", True)
        
        # Test 6.4: Get sessions with user_id filter
        results2 = await storage.aget_sessions(
            session_ids=None,
            user_id="user_0",
            deserialize=True
        )
        assert all(s.user_id == "user_0" for s in results2)
        log_test_result("aget_sessions (with user_id filter)", True)
        
        # Test 6.5: Get sessions with agent_id filter
        results3 = await storage.aget_sessions(
            session_ids=None,
            agent_id="agent_0",
            deserialize=True
        )
        assert all(s.agent_id == "agent_0" for s in results3)
        log_test_result("aget_sessions (with agent_id filter)", True)
        
        # Test 6.6: Get sessions with session_type filter
        results4 = await storage.aget_sessions(
            session_ids=None,
            session_type=SessionType.AGENT,
            deserialize=True
        )
        assert all(s.session_type == SessionType.AGENT for s in results4)
        log_test_result("aget_sessions (with session_type filter)", True)
        
        # Test 6.7: Get sessions with limit
        results5 = await storage.aget_sessions(
            session_ids=None,
            limit=3,
            deserialize=True
        )
        assert len(results5) == 3
        log_test_result("aget_sessions (with limit)", True)
        
        # Test 6.8: Get sessions with offset
        results6 = await storage.aget_sessions(
            session_ids=None,
            limit=3,
            offset=3,
            deserialize=True
        )
        assert len(results6) == 3
        log_test_result("aget_sessions (with offset)", True)
        
        # Test 6.9: Get sessions with sorting
        results7 = await storage.aget_sessions(
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
        log_test_result("aget_sessions (with sorting)", True)
        
        # Test 6.10: Get sessions with empty IDs list
        results8 = await storage.aget_sessions(
            session_ids=[],
            deserialize=True
        )
        assert len(results8) == 0
        log_test_result("aget_sessions (empty IDs list)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Get Multiple", False, str(e))
        raise


# ============================================================================
# TEST 7: Session Operations - Delete
# ============================================================================
@pytest.mark.asyncio
async def test_session_delete():
    """Test session deletion operations."""
    print_separator("TEST 7: Session Delete Operations")
    
    db_path = "test_session_delete.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Setup: Create test sessions
        sessions = [
            create_test_agentsession(f"delete_session_{i}")
            for i in range(5)
        ]
        await storage.aupsert_sessions(sessions)
        
        # Test 7.1: Delete single session
        deleted = await storage.adelete_session("delete_session_0")
        assert deleted is True
        result = await storage.aget_session(session_id="delete_session_0")
        assert result is None
        log_test_result("adelete_session (single)", True)
        
        # Test 7.2: Delete non-existent session
        deleted2 = await storage.adelete_session("non_existent")
        assert deleted2 is False
        log_test_result("adelete_session (non-existent)", True)
        
        # Test 7.3: Delete without session_id (should raise ValueError)
        try:
            await storage.adelete_session("")
            log_test_result("adelete_session (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("adelete_session (validation)", True)
        
        # Test 7.4: Delete multiple sessions
        deleted_count = await storage.adelete_sessions(
            ["delete_session_1", "delete_session_2", "delete_session_3"]
        )
        assert deleted_count == 3
        results, _ = await storage.aget_sessions(
            session_ids=["delete_session_1", "delete_session_2", "delete_session_3"],
            deserialize=False
        )
        assert len(results) == 0
        log_test_result("adelete_sessions (bulk)", True)
        
        # Test 7.5: Delete multiple with empty list (should raise ValueError)
        try:
            await storage.adelete_sessions([])
            log_test_result("adelete_sessions (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("adelete_sessions (validation)", True)
        
        # Test 7.6: Delete multiple with some non-existent
        deleted_count2 = await storage.adelete_sessions(
            ["delete_session_4", "non_existent_1", "non_existent_2"]
        )
        assert deleted_count2 == 1  # Only one exists
        log_test_result("adelete_sessions (with non-existent)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Delete", False, str(e))
        raise


# ============================================================================
# TEST 8: User Memory Operations - Upsert
# ============================================================================
@pytest.mark.asyncio
async def test_user_memory_upsert():
    """Test user memory upsert operations."""
    print_separator("TEST 8: User Memory Upsert Operations")
    
    db_path = "test_user_memory_upsert.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Test 8.1: Upsert single user memory
        user_id = "user_001"
        user_memory = {"preferences": {"theme": "dark"}, "history": ["item1", "item2"]}
        
        result = await storage.aupsert_user_memory(
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
        log_test_result("aupsert_user_memory (single)", True)
        
        # Test 8.2: Upsert without user_id (should raise ValueError)
        try:
            await storage.aupsert_user_memory(
                user_memory=UserMemory(user_id="", user_memory={})
            )
            log_test_result("aupsert_user_memory (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("aupsert_user_memory (validation)", True)
        
        # Test 8.3: Update existing user memory
        updated_memory = {"preferences": {"theme": "light"}, "history": ["item1", "item2", "item3"]}
        result2 = await storage.aupsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=updated_memory)
        )
        assert isinstance(result2, UserMemory)
        assert result2.user_memory == updated_memory
        log_test_result("aupsert_user_memory (update existing)", True)
        
        # Test 8.4: Upsert with minimal fields
        user_id2 = "user_002"
        result3 = await storage.aupsert_user_memory(
            user_memory=UserMemory(user_id=user_id2, user_memory={"data": "test"})
        )
        assert isinstance(result3, UserMemory)
        assert result3.user_id == user_id2
        assert result3.user_memory == {"data": "test"}
        log_test_result("aupsert_user_memory (minimal fields)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Upsert", False, str(e))
        raise


# ============================================================================
# TEST 9: User Memory Operations - Bulk Upsert
# ============================================================================
@pytest.mark.asyncio
async def test_user_memory_bulk_upsert():
    """Test bulk user memory upsert operations."""
    print_separator("TEST 9: User Memory Bulk Upsert Operations")
    
    db_path = "test_user_memory_bulk_upsert.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Test 9.1: Bulk upsert multiple user memories
        user_memories = [
            UserMemory(
                user_id=f"bulk_user_{i}",
                user_memory={"data": f"memory_{i}"},
                agent_id=f"agent_{i % 2}",
            )
            for i in range(5)
        ]
        
        results = await storage.aupsert_user_memories(user_memories, deserialize=True)
        assert len(results) == 5
        assert all(isinstance(r, UserMemory) for r in results)
        assert all(r.user_id in [f"bulk_user_{i}" for i in range(5)] for r in results)
        log_test_result("aupsert_user_memories (bulk)", True)
        
        # Test 9.2: Bulk upsert empty list
        results2 = await storage.aupsert_user_memories([])
        assert results2 == []
        log_test_result("aupsert_user_memories (empty list)", True)
        
        # Test 9.3: Bulk upsert with missing user_id (should raise ValueError)
        try:
            invalid_memories = [
                UserMemory(user_id="valid_user", user_memory={}),
                UserMemory(user_id="", user_memory={}),  # Empty user_id
            ]
            await storage.aupsert_user_memories(invalid_memories)
            log_test_result("aupsert_user_memories (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("aupsert_user_memories (validation)", True)
        
        # Test 9.4: Bulk upsert update existing
        user_memories[0].user_memory = {"data": "updated_memory_0"}
        updated_results = await storage.aupsert_user_memories([user_memories[0]])
        assert isinstance(updated_results[0], UserMemory)
        assert updated_results[0].user_memory == {"data": "updated_memory_0"}
        log_test_result("aupsert_user_memories (update existing)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Bulk Upsert", False, str(e))
        raise


# ============================================================================
# TEST 10: User Memory Operations - Get
# ============================================================================
@pytest.mark.asyncio
async def test_user_memory_get():
    """Test user memory retrieval operations."""
    print_separator("TEST 10: User Memory Get Operations")
    
    db_path = "test_user_memory_get.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Setup: Create test user memories
        for i in range(5):
            await storage.aupsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"get_user_{i}",
                    user_memory={"data": f"memory_{i}"},
                    agent_id=f"agent_{i % 2}",
                    team_id=f"team_{i % 3}"
                )
            )
        
        # Test 10.1: Get user memory by user_id
        result = await storage.aget_user_memory(user_id="get_user_0")
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == "get_user_0"
        assert result.user_memory["data"] == "memory_0"
        log_test_result("aget_user_memory (by user_id)", True)
        
        # Test 10.2: Get non-existent user memory
        result2 = await storage.aget_user_memory(user_id="non_existent")
        assert result2 is None
        log_test_result("aget_user_memory (non-existent)", True)
        
        # Test 10.3: Get latest user memory (no user_id)
        result3 = await storage.aget_user_memory(user_id=None)
        assert result3 is not None
        assert isinstance(result3, UserMemory)
        assert result3.user_id is not None
        log_test_result("aget_user_memory (latest, no ID)", True)
        
        # Test 10.4: Get user memory with agent_id filter
        result4 = await storage.aget_user_memory(
            user_id=None,
            agent_id="agent_0"
        )
        assert result4 is not None
        assert isinstance(result4, UserMemory)
        assert result4.agent_id == "agent_0"
        log_test_result("aget_user_memory (with agent_id filter)", True)
        
        # Test 10.5: Get user memory with team_id filter
        result5 = await storage.aget_user_memory(
            user_id=None,
            team_id="team_0"
        )
        assert result5 is not None
        assert isinstance(result5, UserMemory)
        assert result5.team_id == "team_0"
        log_test_result("aget_user_memory (with team_id filter)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Get", False, str(e))
        raise


# ============================================================================
# TEST 11: User Memory Operations - Get Multiple
# ============================================================================
@pytest.mark.asyncio
async def test_user_memory_get_multiple():
    """Test multiple user memory retrieval operations."""
    print_separator("TEST 11: User Memory Get Multiple Operations")
    
    db_path = "test_user_memory_get_multiple.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Setup: Create test user memories
        for i in range(10):
            await storage.aupsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"multi_user_{i}",
                    user_memory={"data": f"memory_{i}"},
                    agent_id=f"agent_{i % 2}",
                    team_id=f"team_{i % 3}"
                )
            )
        
        # Test 11.1: Get all user memories (deserialize=True returns List[UserMemory])
        all_memories = await storage.aget_user_memories(user_ids=None, deserialize=True)
        assert isinstance(all_memories, list)
        assert len(all_memories) == 10
        assert all(isinstance(m, UserMemory) for m in all_memories)
        log_test_result("aget_user_memories (all, deserialize=True)", True)
        
        # Test 11.2: Get all user memories (deserialize=False returns tuple)
        all_memories_raw, count = await storage.aget_user_memories(user_ids=None, deserialize=False)
        assert isinstance(all_memories_raw, list)
        assert isinstance(count, int)
        assert len(all_memories_raw) == 10
        assert count == 10
        log_test_result("aget_user_memories (all, deserialize=False)", True)
        
        # Test 11.3: Get user memories by IDs
        user_ids = ["multi_user_0", "multi_user_1", "multi_user_2"]
        results = await storage.aget_user_memories(user_ids=user_ids, deserialize=True)
        assert len(results) == 3
        assert all(isinstance(r, UserMemory) for r in results)
        assert all(r.user_id in user_ids for r in results)
        log_test_result("aget_user_memories (by IDs)", True)
        
        # Test 11.4: Get user memories with agent_id filter
        results2 = await storage.aget_user_memories(
            user_ids=None,
            agent_id="agent_0",
            deserialize=True
        )
        assert all(isinstance(r, UserMemory) for r in results2)
        assert all(r.agent_id == "agent_0" for r in results2)
        log_test_result("aget_user_memories (with agent_id filter)", True)
        
        # Test 11.5: Get user memories with team_id filter
        results3 = await storage.aget_user_memories(
            user_ids=None,
            team_id="team_0",
            deserialize=True
        )
        assert all(isinstance(r, UserMemory) for r in results3)
        assert all(r.team_id == "team_0" for r in results3)
        log_test_result("aget_user_memories (with team_id filter)", True)
        
        # Test 11.6: Get user memories with limit (deserialize=False for count)
        results4, count5 = await storage.aget_user_memories(
            user_ids=None,
            limit=3,
            deserialize=False
        )
        assert len(results4) == 3
        assert count5 == 10
        log_test_result("aget_user_memories (with limit)", True)
        
        # Test 11.7: Get user memories with offset
        results5, count6 = await storage.aget_user_memories(
            user_ids=None,
            limit=3,
            offset=3,
            deserialize=False
        )
        assert len(results5) == 3
        assert count6 == 10
        log_test_result("aget_user_memories (with offset)", True)
        
        # Test 11.8: Get user memories with empty IDs list
        results6 = await storage.aget_user_memories(user_ids=[], deserialize=True)
        assert len(results6) == 0
        log_test_result("aget_user_memories (empty IDs list)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Get Multiple", False, str(e))
        raise


# ============================================================================
# TEST 12: User Memory Operations - Delete
# ============================================================================
@pytest.mark.asyncio
async def test_user_memory_delete():
    """Test user memory deletion operations."""
    print_separator("TEST 12: User Memory Delete Operations")
    
    db_path = "test_user_memory_delete.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Setup: Create test user memories
        for i in range(5):
            await storage.aupsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"delete_user_{i}",
                    user_memory={"data": f"memory_{i}"}
                )
            )
        
        # Test 12.1: Delete single user memory
        deleted = await storage.adelete_user_memory("delete_user_0")
        assert deleted is True
        result = await storage.aget_user_memory(user_id="delete_user_0")
        assert result is None
        log_test_result("adelete_user_memory (single)", True)
        
        # Test 12.2: Delete non-existent user memory
        deleted2 = await storage.adelete_user_memory("non_existent")
        assert deleted2 is False
        log_test_result("adelete_user_memory (non-existent)", True)
        
        # Test 12.3: Delete without user_id (should raise ValueError)
        try:
            await storage.adelete_user_memory("")
            log_test_result("adelete_user_memory (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("adelete_user_memory (validation)", True)
        
        # Test 12.4: Delete multiple user memories
        deleted_count = await storage.adelete_user_memories(
            ["delete_user_1", "delete_user_2", "delete_user_3"]
        )
        assert deleted_count == 3
        results = await storage.aget_user_memories(
            user_ids=["delete_user_1", "delete_user_2", "delete_user_3"],
            deserialize=True
        )
        assert len(results) == 0
        log_test_result("adelete_user_memories (bulk)", True)
        
        # Test 12.5: Delete multiple with empty list (should raise ValueError)
        try:
            await storage.adelete_user_memories([])
            log_test_result("adelete_user_memories (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("adelete_user_memories (validation)", True)
        
        # Test 12.6: Delete multiple with some non-existent
        deleted_count2 = await storage.adelete_user_memories(
            ["delete_user_4", "non_existent_1", "non_existent_2"]
        )
        assert deleted_count2 == 1
        log_test_result("adelete_user_memories (with non-existent)", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("User Memory Delete", False, str(e))
        raise


# ============================================================================
# TEST 13: Utility Methods
# ============================================================================
@pytest.mark.asyncio
async def test_utility_methods():
    """Test utility methods (clear_all, close)."""
    print_separator("TEST 13: Utility Methods")
    
    db_path = "test_utility_methods.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Setup: Create test data
        sessions = [
            create_test_agentsession(f"util_session_{i}")
            for i in range(3)
        ]
        await storage.aupsert_sessions(sessions)
        
        for i in range(3):
            await storage.aupsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"util_user_{i}",
                    user_memory={"data": f"memory_{i}"}
                )
            )
        
        # Verify data exists
        all_sessions = await storage.aget_sessions(deserialize=True)
        assert len(all_sessions) == 3
        all_memories = await storage.aget_user_memories(deserialize=True)
        assert len(all_memories) == 3
        
        # Test 13.1: Clear all data
        await storage.aclear_all()
        
        # Verify all data is cleared
        all_sessions2 = await storage.aget_sessions(deserialize=True)
        assert len(all_sessions2) == 0
        all_memories2 = await storage.aget_user_memories(deserialize=True)
        assert len(all_memories2) == 0
        log_test_result("aclear_all", True)
        
        # Test 13.2: Close storage
        await storage.close()
        # Should not raise exception
        log_test_result("close", True)
        
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Utility Methods", False, str(e))
        raise


# ============================================================================
# TEST 14: Edge Cases and Error Handling
# ============================================================================
@pytest.mark.asyncio
async def test_edge_cases():
    """Test edge cases and error handling."""
    print_separator("TEST 14: Edge Cases and Error Handling")
    
    db_path = "test_edge_cases.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Test 14.1: Operations on empty database
        all_sessions, count = await storage.aget_sessions(deserialize=False)
        assert len(all_sessions) == 0
        assert count == 0
        log_test_result("aget_sessions (empty database)", True)
        
        all_memories, count2 = await storage.aget_user_memories(deserialize=False)
        assert len(all_memories) == 0
        assert count2 == 0
        log_test_result("aget_user_memories (empty database)", True)
        
        # Test 14.2: Get latest when no data exists
        latest_session = await storage.aget_session(session_id=None)
        assert latest_session is None
        log_test_result("aget_session (latest, no data)", True)
        
        latest_memory = await storage.aget_user_memory(user_id=None)
        assert latest_memory is None
        log_test_result("aget_user_memory (latest, no data)", True)
        
        # Test 14.3: Complex JSON data in session
        complex_session = create_test_agentsession("complex_session")
        complex_session.session_data = {
            "nested": {"deep": {"value": 123}},
            "list": [1, 2, {"item": "test"}],
            "unicode": "测试 🚀",
        }
        complex_session.metadata = {"tags": ["tag1", "tag2"], "score": 95.5}
        
        result = await storage.aupsert_session(complex_session, deserialize=True)
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
        result2 = await storage.aupsert_user_memory(
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
        
        result3 = await storage.aupsert_session(large_session, deserialize=True)
        assert len(result3.session_data["data"]) == 10000
        log_test_result("Large data handling", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Edge Cases", False, str(e))
        raise


# ============================================================================
# TEST 15: Session Type Handling
# ============================================================================
@pytest.mark.asyncio
async def test_session_type_handling():
    """Test proper handling of different session types."""
    print_separator("TEST 15: Session Type Handling")
    
    db_path = "test_session_types.db"
    await cleanup_db(db_path)
    
    try:
        storage = AsyncSqliteStorage(db_file=db_path)
        await storage._create_all_tables()
        
        # Test 15.1: Store and retrieve AGENT session
        # Note: AgentSession always stores with session_type=AGENT regardless of the parameter
        agent_session = create_test_agentsession("agent_001", session_type=SessionType.AGENT)
        result = await storage.aupsert_session(agent_session, deserialize=True)
        assert result.session_type == SessionType.AGENT
        retrieved = await storage.aget_session(session_id="agent_001", deserialize=True)
        assert retrieved.session_type == SessionType.AGENT
        log_test_result("AGENT session type", True)
        
        # Test 15.2: Store another AGENT session
        agent_session2 = create_test_agentsession("agent_002", session_type=SessionType.AGENT)
        result2 = await storage.aupsert_session(agent_session2, deserialize=True)
        assert result2.session_type == SessionType.AGENT
        retrieved2 = await storage.aget_session(session_id="agent_002", deserialize=True)
        assert retrieved2.session_type == SessionType.AGENT
        log_test_result("AGENT session type persistence", True)
        
        # Test 15.3: Store agent session with different IDs
        agent_session3 = create_test_agentsession("agent_003", session_type=SessionType.AGENT)
        result3 = await storage.aupsert_session(agent_session3, deserialize=True)
        assert result3.session_type == SessionType.AGENT
        retrieved3 = await storage.aget_session(session_id="agent_003", deserialize=True)
        assert retrieved3.session_type == SessionType.AGENT
        log_test_result("AGENT session type consistency", True)
        
        # Test 15.4: Filter by session type
        agent_sessions = await storage.aget_sessions(
            session_type=SessionType.AGENT,
            deserialize=True
        )
        assert all(s.session_type == SessionType.AGENT for s in agent_sessions)
        assert len(agent_sessions) >= 1
        log_test_result("Filter by session type", True)
        
        await storage.close()
        await cleanup_db(db_path)
        
    except Exception as e:
        log_test_result("Session Type Handling", False, str(e))
        raise


# ============================================================================
# Main Test Runner
# ============================================================================
async def run_all_tests():
    """Run all tests and print summary."""
    print("\n" + "=" * 80, flush=True)
    print("  AsyncSqliteStorage Comprehensive Test Suite", flush=True)
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
    ]
    
    for test_func in tests:
        try:
            await test_func()
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
        success = asyncio.run(run_all_tests())
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n⚠ Tests interrupted by user", flush=True)
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Test runner error: {e}", flush=True)
        import traceback
        traceback.print_exc()
        sys.exit(1)

