"""Comprehensive test suite for AsyncMongoStorage.

This test suite verifies ALL methods and attributes of AsyncMongoStorage:
- Initialization (db_url, db_client, db_name, custom collections, id)
- Collection management (creation, existence checks)
- Session operations (upsert, get, delete, bulk operations)
- User memory operations (upsert, get, delete, bulk operations)
- Utility methods (clear_all, close)
- Edge cases and error handling
- Deserialize flag behavior
- Filtering, pagination, and sorting
- Event loop handling
- Client type detection (Motor vs PyMongo async)
"""
import asyncio
import os
import sys
import time
import uuid
from typing import Any, Dict, List, Optional

from upsonic.session.agent import AgentSession, RunData
from upsonic.session.base import SessionType
from upsonic.storage.schemas import UserMemory
from upsonic.storage.mongo import AsyncMongoStorage
from upsonic.run.agent.output import AgentRunOutput
from upsonic.run.base import RunStatus
from upsonic.messages.messages import ModelRequest, ModelResponse, TextPart, UserPromptPart, ToolCallPart, ThinkingPart
import pytest

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


async def cleanup_mongo_collections(storage: AsyncMongoStorage) -> None:
    """Clean up test collections."""
    try:
        await storage.aclear_all()
        await storage.close()
    except Exception:
        pass


def get_mongo_url() -> str:
    """Get MongoDB URL from environment or use default."""
    return os.getenv(
        "MONGO_URL",
        "mongodb://upsonic_test:test_password@localhost:27017"
    )


def create_test_agentsession(
    session_id: str,
    agent_id: Optional[str] = None,
    user_id: Optional[str] = None,
    session_type: SessionType = SessionType.AGENT,
) -> AgentSession:
    """Create a test AgentSession with comprehensive runs and messages using REAL classes."""
    current_time = int(time.time())
    
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
        updated_at=current_time,
    )


async def check_mongo_available() -> bool:
    """Check if MongoDB is available."""
    try:
        db_url = get_mongo_url()
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name="test_connection_check",
        )
        # Try to access database
        _ = storage.database
        await storage.close()
        return True
    except Exception:
        return False


# ============================================================================
# TEST 1: Initialization
# ============================================================================
@pytest.mark.asyncio
async def test_initialization():
    """Test AsyncMongoStorage initialization with various configurations."""
    print_separator("TEST 1: Initialization")
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    # Test 1.1: Default initialization with db_url
    try:
        db_name = f"test_init_default_{uuid.uuid4().hex[:8]}"
        db_url = get_mongo_url()
        
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        assert storage.db_url == db_url
        assert storage.db_name == db_name
        assert storage.session_table_name == "upsonic_sessions"
        assert storage.user_memory_table_name == "upsonic_user_memories"
        assert storage.id is not None
        assert storage.db_client is not None
        log_test_result("Default initialization (db_url)", True)
        
        await storage.close()
    except Exception as e:
        log_test_result("Default initialization (db_url)", False, str(e))
        raise
    
    # Test 1.2: Custom collection names
    try:
        db_name = f"test_init_custom_collections_{uuid.uuid4().hex[:8]}"
        db_url = get_mongo_url()
        
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
            session_collection="custom_sessions",
            user_memory_collection="custom_memories",
        )
        assert storage.session_table_name == "custom_sessions"
        assert storage.user_memory_table_name == "custom_memories"
        log_test_result("Custom collection names", True)
        
        await storage.close()
    except Exception as e:
        log_test_result("Custom collection names", False, str(e))
        raise
    
    # Test 1.3: Custom ID
    try:
        db_name = f"test_init_custom_id_{uuid.uuid4().hex[:8]}"
        db_url = get_mongo_url()
        
        custom_id = "test_storage_123"
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
            id=custom_id,
        )
        assert storage.id == custom_id
        log_test_result("Custom ID", True)
        
        await storage.close()
    except Exception as e:
        log_test_result("Custom ID", False, str(e))
        raise
    
    # Test 1.4: Initialization without db_url or db_client (should raise ValueError)
    try:
        storage = AsyncMongoStorage()
        log_test_result("Initialization validation", False, "Should raise ValueError")
    except ValueError:
        log_test_result("Initialization validation", True)
    except Exception as e:
        log_test_result("Initialization validation", False, f"Unexpected error: {e}")


# ============================================================================
# TEST 2: Collection Management
# ============================================================================
@pytest.mark.asyncio
async def test_collection_management():
    """Test collection creation and existence checks."""
    print_separator("TEST 2: Collection Management")
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_collection_mgmt_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        
        # Test 2.1: table_exists before creation
        exists = await storage.table_exists(storage.session_table_name)
        assert exists is False, "Collection should not exist initially"
        log_test_result("table_exists (before creation)", True)
        
        # Test 2.2: Create all collections
        await storage._create_all_tables()
        log_test_result("_create_all_tables", True)
        
        # Test 2.3: table_exists after creation
        exists = await storage.table_exists(storage.session_table_name)
        assert exists is True, "Session collection should exist"
        exists = await storage.table_exists(storage.user_memory_table_name)
        assert exists is True, "User memory collection should exist"
        log_test_result("table_exists (after creation)", True)
        
        # Test 2.4: Re-create collections (should not fail)
        await storage._create_all_tables()
        log_test_result("Re-create collections (idempotent)", True)
        
        await storage.close()
        
    except Exception as e:
        log_test_result("Collection Management", False, str(e))
        raise


# ============================================================================
# TEST 3: Session Operations - Upsert
# ============================================================================
@pytest.mark.asyncio
async def test_session_upsert():
    """Test session upsert operations."""
    print_separator("TEST 3: Session Upsert Operations")
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_session_upsert_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
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
        session_agent2 = create_test_agentsession("session_agent2", session_type=SessionType.AGENT)
        result_agent2 = await storage.aupsert_session(session_agent2, deserialize=True)
        assert result_agent2.session_type == SessionType.AGENT
        log_test_result("aupsert_session (AGENT type persistence)", True)
        
        # CRITICAL - Verify runs and messages are correctly preserved
        session_with_data = create_test_agentsession("session_full_data")
        result_full = await storage.aupsert_session(session_with_data, deserialize=True)
        
        # Verify runs are correctly preserved
        assert result_full.runs is not None, "runs should not be None"
        assert isinstance(result_full.runs, dict), "runs should be a dict"
        assert len(result_full.runs) == 2, f"runs should have 2 entries, got {len(result_full.runs)}"
        assert "run_001" in result_full.runs, "run_001 should be in runs"
        
        run_001 = result_full.runs["run_001"]
        assert isinstance(run_001, RunData), f"run_001 should be RunData, got {type(run_001)}"
        assert run_001.output is not None, "run_001.output should not be None"
        assert isinstance(run_001.output, AgentRunOutput), f"run_001.output should be AgentRunOutput"
        assert run_001.output.run_id == "run_001", f"run_id mismatch"
        assert run_001.output.status == RunStatus.completed, f"status mismatch"
        
        run_002 = result_full.runs["run_002"]
        assert run_002.output.status == RunStatus.paused, f"status mismatch"
        log_test_result("runs field round-trip verification", True)
        
        # Verify messages are correctly preserved
        assert result_full.messages is not None, "messages should not be None"
        assert isinstance(result_full.messages, list), "messages should be a list"
        assert len(result_full.messages) == 3, f"messages should have 3 entries, got {len(result_full.messages)}"
        
        msg_0 = result_full.messages[0]
        assert isinstance(msg_0, ModelRequest), f"messages[0] should be ModelRequest, got {type(msg_0)}"
        
        msg_1 = result_full.messages[1]
        assert isinstance(msg_1, ModelResponse), f"messages[1] should be ModelResponse, got {type(msg_1)}"
        
        has_tool_call = any(isinstance(p, ToolCallPart) for p in msg_1.parts)
        assert has_tool_call, "messages[1] should have a ToolCallPart"
        
        msg_2 = result_full.messages[2]
        has_thinking = any(isinstance(p, ThinkingPart) for p in msg_2.parts)
        assert has_thinking, "messages[2] should have a ThinkingPart"
        log_test_result("messages field round-trip verification", True)
        
        await storage.close()
        
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
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_session_bulk_upsert_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
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
            create_test_agentsession(f"bulk_session2_{i}", user_id=f"user2_{i}")
            for i in range(3)
        ]
        results2 = await storage.aupsert_sessions(sessions2, deserialize=False)
        assert len(results2) == 3
        assert all(isinstance(r, dict) for r in results2)
        log_test_result("aupsert_sessions (bulk, deserialize=False)", True)
        
        # Test 4.3: Bulk upsert empty list
        results3 = await storage.aupsert_sessions([], deserialize=True)
        assert len(results3) == 0
        log_test_result("aupsert_sessions (empty list)", True)
        
        # Test 4.4: Bulk upsert with missing session_id (should raise ValueError)
        try:
            bad_sessions = [
                create_test_agentsession("valid_session"),
                AgentSession(session_id=None),
            ]
            await storage.aupsert_sessions(bad_sessions)
            log_test_result("aupsert_sessions (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("aupsert_sessions (validation)", True)
        
        await storage.close()
        
    except Exception as e:
        log_test_result("Session Bulk Upsert", False, str(e))
        raise


# ============================================================================
# TEST 5: Session Operations - Get Single
# ============================================================================
@pytest.mark.asyncio
async def test_session_get():
    """Test single session retrieval operations."""
    print_separator("TEST 5: Session Get Operations")
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_session_get_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        await storage._create_all_tables()
        
        # Setup: Create test sessions
        session1 = create_test_agentsession("get_session_1", user_id="user_1", agent_id="agent_1")
        session2 = create_test_agentsession("get_session_2", user_id="user_2", agent_id="agent_2")
        await storage.aupsert_session(session1)
        await storage.aupsert_session(session2)
        
        # Test 5.1: Get session by session_id
        result = await storage.aget_session(session_id="get_session_1", deserialize=True)
        assert result is not None
        assert isinstance(result, AgentSession)
        assert result.session_id == "get_session_1"
        log_test_result("aget_session (by session_id, deserialize=True)", True)
        
        # Test 5.2: Get session with deserialize=False
        result2 = await storage.aget_session(session_id="get_session_2", deserialize=False)
        assert result2 is not None
        assert isinstance(result2, dict)
        assert result2["session_id"] == "get_session_2"
        log_test_result("aget_session (deserialize=False)", True)
        
        # Test 5.3: Get non-existent session
        result3 = await storage.aget_session(session_id="non_existent")
        assert result3 is None
        log_test_result("aget_session (non-existent)", True)
        
        # Test 5.4: Get latest session (no session_id)
        result4 = await storage.aget_session(session_id=None, deserialize=True)
        assert result4 is not None
        assert isinstance(result4, AgentSession)
        log_test_result("aget_session (latest, no session_id)", True)
        
        # Test 5.5: Get session with user_id filter
        result5 = await storage.aget_session(
            session_id=None,
            user_id="user_1",
            deserialize=True
        )
        assert result5 is not None
        assert result5.user_id == "user_1"
        log_test_result("aget_session (with user_id filter)", True)
        
        # Test 5.6: Get session with agent_id filter
        result6 = await storage.aget_session(
            session_id=None,
            agent_id="agent_1",
            deserialize=True
        )
        assert result6 is not None
        assert result6.agent_id == "agent_1"
        log_test_result("aget_session (with agent_id filter)", True)
        
        # Test 5.7: Get session with session_type filter
        result7 = await storage.aget_session(
            session_id="get_session_1",
            session_type=SessionType.AGENT,
            deserialize=True
        )
        assert result7 is not None
        assert result7.session_type == SessionType.AGENT
        log_test_result("aget_session (with session_type filter)", True)
        
        await storage.close()
        
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
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_session_get_multiple_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        await storage._create_all_tables()
        
        # Setup: Create test sessions
        for i in range(10):
            session = create_test_agentsession(
                f"multi_session_{i}",
                user_id=f"user_{i % 3}",
                agent_id=f"agent_{i % 2}",
            )
            await storage.aupsert_session(session)
        
        # Test 6.1: Get all sessions
        all_sessions = await storage.aget_sessions(session_ids=None, deserialize=True)
        assert isinstance(all_sessions, list)
        assert len(all_sessions) == 10
        assert all(isinstance(s, AgentSession) for s in all_sessions)
        log_test_result("aget_sessions (all, deserialize=True)", True)
        
        # Test 6.2: Get sessions by IDs
        session_ids = ["multi_session_0", "multi_session_1", "multi_session_2"]
        results = await storage.aget_sessions(session_ids=session_ids, deserialize=True)
        assert len(results) == 3
        assert all(s.session_id in session_ids for s in results)
        log_test_result("aget_sessions (by IDs, deserialize=True)", True)
        
        # Test 6.3: Get sessions with deserialize=False
        results2, count = await storage.aget_sessions(
            session_ids=None,
            deserialize=False
        )
        assert isinstance(results2, list)
        assert isinstance(count, int)
        assert len(results2) == 10
        assert count == 10
        assert all(isinstance(r, dict) for r in results2)
        log_test_result("aget_sessions (deserialize=False)", True)
        
        # Test 6.4: Get sessions with user_id filter
        results3 = await storage.aget_sessions(
            session_ids=None,
            user_id="user_0",
            deserialize=True
        )
        assert all(s.user_id == "user_0" for s in results3)
        log_test_result("aget_sessions (with user_id filter)", True)
        
        # Test 6.5: Get sessions with agent_id filter
        results4 = await storage.aget_sessions(
            session_ids=None,
            agent_id="agent_0",
            deserialize=True
        )
        assert all(s.agent_id == "agent_0" for s in results4)
        log_test_result("aget_sessions (with agent_id filter)", True)
        
        # Test 6.6: Get sessions with session_type filter
        results5 = await storage.aget_sessions(
            session_ids=None,
            session_type=SessionType.AGENT,
            deserialize=True
        )
        assert all(s.session_type == SessionType.AGENT for s in results5)
        log_test_result("aget_sessions (with session_type filter)", True)
        
        # Test 6.7: Get sessions with limit
        results6 = await storage.aget_sessions(
            session_ids=None,
            limit=3,
            deserialize=True
        )
        assert len(results6) == 3
        log_test_result("aget_sessions (with limit)", True)
        
        # Test 6.8: Get sessions with offset
        results7 = await storage.aget_sessions(
            session_ids=None,
            limit=3,
            offset=3,
            deserialize=True
        )
        assert len(results7) == 3
        log_test_result("aget_sessions (with offset)", True)
        
        # Test 6.9: Get sessions with sorting
        results8 = await storage.aget_sessions(
            session_ids=None,
            sort_by="created_at",
            sort_order="desc",
            limit=5,
            deserialize=True
        )
        assert len(results8) == 5
        # Verify descending order
        for i in range(len(results8) - 1):
            assert results8[i].created_at >= results8[i + 1].created_at
        log_test_result("aget_sessions (with sorting)", True)
        
        # Test 6.10: Get sessions with empty IDs list
        results9 = await storage.aget_sessions(session_ids=[], deserialize=True)
        assert len(results9) == 0
        log_test_result("aget_sessions (empty IDs list)", True)
        
        await storage.close()
        
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
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_session_delete_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        await storage._create_all_tables()
        
        # Setup: Create test sessions
        for i in range(5):
            session = create_test_agentsession(f"delete_session_{i}")
            await storage.aupsert_session(session)
        
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
        results = await storage.aget_sessions(
            session_ids=["delete_session_1", "delete_session_2", "delete_session_3"],
            deserialize=True
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
        assert deleted_count2 == 1
        log_test_result("adelete_sessions (with non-existent)", True)
        
        await storage.close()
        
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
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_user_memory_upsert_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        await storage._create_all_tables()
        
        # Test 8.1: Upsert single user memory - deserialize=True returns UserMemory
        user_id = "test_user_001"
        user_memory = {"preference": "blue", "favorite_food": "pizza"}
        
        result = await storage.aupsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=user_memory, agent_id="agent_1", team_id="team_1"),
            deserialize=True,
        )
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == user_id
        assert result.user_memory == user_memory
        log_test_result("aupsert_user_memory (single)", True)
        
        # Test 8.2: Update existing user memory - deserialize=True returns UserMemory
        updated_memory = {"preference": "red", "favorite_food": "sushi"}
        result2 = await storage.aupsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=updated_memory),
            deserialize=True,
        )
        assert isinstance(result2, UserMemory)
        assert result2.user_memory == updated_memory
        log_test_result("aupsert_user_memory (update existing)", True)
        
        # Test 8.3: Upsert without user_id (should raise ValueError)
        try:
            await storage.aupsert_user_memory(
                user_memory=UserMemory(user_id="", user_memory={"test": "data"})
            )
            log_test_result("aupsert_user_memory (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("aupsert_user_memory (validation)", True)
        
        await storage.close()
        
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
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_user_memory_bulk_upsert_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        await storage._create_all_tables()
        
        # Test 9.1: Bulk upsert multiple user memories - deserialize=True returns UserMemory
        user_memories = [
            UserMemory(
                user_id=f"bulk_user_{i}",
                user_memory={"data": f"memory_{i}"},
                agent_id=f"agent_{i % 2}",
                team_id=f"team_{i % 3}",
            )
            for i in range(5)
        ]
        
        results = await storage.aupsert_user_memories(user_memories, deserialize=True)
        assert len(results) == 5
        assert all(isinstance(r, UserMemory) for r in results)
        assert all(r.user_id in [m.user_id for m in user_memories] for r in results)
        log_test_result("aupsert_user_memories (bulk)", True)
        
        # Test 9.2: Bulk upsert empty list
        results2 = await storage.aupsert_user_memories([], deserialize=True)
        assert len(results2) == 0
        log_test_result("aupsert_user_memories (empty list)", True)
        
        # Test 9.3: Bulk upsert with missing user_id (should raise ValueError)
        try:
            bad_memories = [
                UserMemory(user_id="valid_user", user_memory={"test": "data"}),
                UserMemory(user_id="", user_memory={"test": "data"}),
            ]
            await storage.aupsert_user_memories(bad_memories)
            log_test_result("aupsert_user_memories (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("aupsert_user_memories (validation)", True)
        
        await storage.close()
        
    except Exception as e:
        log_test_result("User Memory Bulk Upsert", False, str(e))
        raise


# ============================================================================
# TEST 10: User Memory Operations - Get Single
# ============================================================================
@pytest.mark.asyncio
async def test_user_memory_get():
    """Test single user memory retrieval operations."""
    print_separator("TEST 10: User Memory Get Operations")
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_user_memory_get_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
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
        
        # Test 10.1: Get user memory by user_id - deserialize=True returns UserMemory
        result = await storage.aget_user_memory(user_id="get_user_0", deserialize=True)
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == "get_user_0"
        log_test_result("aget_user_memory (by user_id)", True)
        
        # Test 10.2: Get non-existent user memory
        result2 = await storage.aget_user_memory(user_id="non_existent", deserialize=True)
        assert result2 is None
        log_test_result("aget_user_memory (non-existent)", True)
        
        # Test 10.3: Get latest user memory (no user_id) - deserialize=True returns UserMemory
        result3 = await storage.aget_user_memory(user_id=None, deserialize=True)
        assert result3 is not None
        assert isinstance(result3, UserMemory)
        assert result3.user_id is not None
        log_test_result("aget_user_memory (latest, no user_id)", True)
        
        # Test 10.4: Get user memory with agent_id filter - deserialize=True returns UserMemory
        result4 = await storage.aget_user_memory(
            user_id=None,
            agent_id="agent_0",
            deserialize=True
        )
        assert result4 is not None
        assert isinstance(result4, UserMemory)
        assert result4.agent_id == "agent_0"
        log_test_result("aget_user_memory (with agent_id filter)", True)
        
        # Test 10.5: Get user memory with team_id filter - deserialize=True returns UserMemory
        result5 = await storage.aget_user_memory(
            user_id=None,
            team_id="team_0",
            deserialize=True
        )
        assert result5 is not None
        assert isinstance(result5, UserMemory)
        assert result5.team_id == "team_0"
        log_test_result("aget_user_memory (with team_id filter)", True)
        
        await storage.close()
        
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
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_user_memory_get_multiple_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
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
        
        # Test 11.1: Get all user memories - deserialize=False returns (list, count)
        all_memories, count = await storage.aget_user_memories(user_ids=None, deserialize=False)
        assert isinstance(all_memories, list)
        assert isinstance(count, int)
        assert len(all_memories) == 10
        assert count == 10
        log_test_result("aget_user_memories (all)", True)
        
        # Test 11.2: Get user memories by IDs - deserialize=False returns (list, count)
        user_ids = ["multi_user_0", "multi_user_1", "multi_user_2"]
        results, count2 = await storage.aget_user_memories(user_ids=user_ids, deserialize=False)
        assert len(results) == 3
        assert all(r["user_id"] in user_ids for r in results)
        log_test_result("aget_user_memories (by IDs)", True)
        
        # Test 11.3: Get user memories with agent_id filter - deserialize=False returns (list, count)
        results2, count3 = await storage.aget_user_memories(
            user_ids=None,
            agent_id="agent_0",
            deserialize=False
        )
        assert all(r["agent_id"] == "agent_0" for r in results2)
        assert count3 >= len(results2)
        log_test_result("aget_user_memories (with agent_id filter)", True)
        
        # Test 11.4: Get user memories with team_id filter - deserialize=False returns (list, count)
        results3, count4 = await storage.aget_user_memories(
            user_ids=None,
            team_id="team_0",
            deserialize=False
        )
        assert all(r["team_id"] == "team_0" for r in results3)
        log_test_result("aget_user_memories (with team_id filter)", True)
        
        # Test 11.5: Get user memories with limit - deserialize=False returns (list, count)
        results4, count5 = await storage.aget_user_memories(
            user_ids=None,
            limit=3,
            deserialize=False
        )
        assert len(results4) == 3
        assert count5 == 10
        log_test_result("aget_user_memories (with limit)", True)
        
        # Test 11.6: Get user memories with offset - deserialize=False returns (list, count)
        results5, count6 = await storage.aget_user_memories(
            user_ids=None,
            limit=3,
            offset=3,
            deserialize=False
        )
        assert len(results5) == 3
        assert count6 == 10
        log_test_result("aget_user_memories (with offset)", True)
        
        # Test 11.7: Get user memories with empty IDs list - deserialize=False returns (list, count)
        results6, count7 = await storage.aget_user_memories(user_ids=[], deserialize=False)
        assert len(results6) == 0
        assert count7 == 0
        log_test_result("aget_user_memories (empty IDs list)", True)
        
        await storage.close()
        
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
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_user_memory_delete_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        await storage._create_all_tables()
        
        # Setup: Create test user memories
        for i in range(5):
            await storage.aupsert_user_memory(
                user_memory=UserMemory(user_id=f"delete_user_{i}", user_memory={"data": f"memory_{i}"})
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
        results, _ = await storage.aget_user_memories(
            user_ids=["delete_user_1", "delete_user_2", "delete_user_3"],
            deserialize=False
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
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_utility_methods_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        await storage._create_all_tables()
        
        # Setup: Create test data
        session = create_test_agentsession("utility_session")
        await storage.aupsert_session(session)
        
        await storage.aupsert_user_memory(
            user_memory=UserMemory(user_id="utility_user", user_memory={"test": "data"})
        )
        
        # Test 13.1: Verify data exists
        result = await storage.aget_session(session_id="utility_session")
        assert result is not None
        result2 = await storage.aget_user_memory(user_id="utility_user")
        assert result2 is not None
        log_test_result("Data setup verification", True)
        
        # Test 13.2: Clear all data
        await storage.aclear_all()
        
        result3 = await storage.aget_session(session_id="utility_session")
        assert result3 is None
        result4 = await storage.aget_user_memory(user_id="utility_user")
        assert result4 is None
        log_test_result("aclear_all", True)
        
        # Test 13.3: Close storage
        await storage.close()
        assert storage._client is None or storage._client is None
        log_test_result("close", True)
        
    except Exception as e:
        log_test_result("Utility Methods", False, str(e))
        raise


# ============================================================================
# TEST 14: Event Loop Handling
# ============================================================================
@pytest.mark.asyncio
async def test_event_loop_handling():
    """Test event loop change handling."""
    print_separator("TEST 14: Event Loop Handling")
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_event_loop_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        # Test 14.1: Create storage in one event loop
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        await storage._create_all_tables()
        
        # Create a session
        session = create_test_agentsession("event_loop_session")
        await storage.aupsert_session(session)
        
        # Verify it works
        result = await storage.aget_session(session_id="event_loop_session")
        assert result is not None
        log_test_result("Event loop handling (basic)", True)
        
        await storage.close()
        
    except Exception as e:
        log_test_result("Event Loop Handling", False, str(e))
        raise


# ============================================================================
# TEST 15: Client Type Detection
# ============================================================================
@pytest.mark.asyncio
async def test_client_type_detection():
    """Test MongoDB client type detection (Motor vs PyMongo async)."""
    print_separator("TEST 15: Client Type Detection")
    
    if not await check_mongo_available():
        log_test_result("MongoDB availability check", False, "MongoDB not available - skipping tests")
        return
    
    db_name = f"test_client_type_{uuid.uuid4().hex[:8]}"
    db_url = get_mongo_url()
    
    try:
        # Test 15.1: Auto-detect client type from URL
        storage = AsyncMongoStorage(
            db_url=db_url,
            db_name=db_name,
        )
        assert storage._client_type in [
            storage.CLIENT_TYPE_MOTOR,
            storage.CLIENT_TYPE_PYMONGO_ASYNC,
        ]
        log_test_result("Client type auto-detection", True)
        
        await storage.close()
        
    except Exception as e:
        log_test_result("Client Type Detection", False, str(e))
        raise


# ============================================================================
# Main Test Runner
# ============================================================================
async def run_all_tests():
    """Run all tests."""
    print("\n" + "=" * 80, flush=True)
    print("  COMPREHENSIVE ASYNC MONGODB STORAGE TEST SUITE", flush=True)
    print("=" * 80 + "\n", flush=True)
    
    tests = [
        test_initialization,
        test_collection_management,
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
        test_event_loop_handling,
        test_client_type_detection,
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
    print("  TEST SUMMARY", flush=True)
    print("=" * 80 + "\n", flush=True)
    
    passed = sum(1 for r in test_results if r["passed"])
    failed = len(test_results) - passed
    total = len(test_results)
    
    print(f"Total Tests: {total}", flush=True)
    print(f"✅ Passed: {passed}", flush=True)
    print(f"❌ Failed: {failed}", flush=True)
    print(f"Success Rate: {(passed/total*100):.1f}%" if total > 0 else "N/A", flush=True)
    
    if failed > 0:
        print("\nFailed Tests:", flush=True)
        for result in test_results:
            if not result["passed"]:
                print(f"  - {result['name']}: {result.get('message', 'No message')}", flush=True)
    
    print("\n" + "=" * 80 + "\n", flush=True)
    
    return failed == 0


if __name__ == "__main__":
    success = asyncio.run(run_all_tests())
    sys.exit(0 if success else 1)

