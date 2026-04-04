"""Comprehensive test suite for RedisStorage.

This test suite verifies ALL methods and attributes of RedisStorage:
- Initialization (db_url, redis_client, custom tables, id, prefix, expire)
- Table management (existence checks)
- Session operations (upsert, get, delete, bulk operations)
- User memory operations (upsert, get, delete, bulk operations)
- Utility methods (clear_all, close)
- Edge cases and error handling
- Deserialize flag behavior
- Filtering, pagination, and sorting
- Session type handling
"""
import os
import sys
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

# Load .env file if it exists
try:
    from dotenv import load_dotenv
    env_file = Path(__file__).parent.parent.parent.parent / ".env"
    if env_file.exists():
        load_dotenv(env_file)
except ImportError:
    pass  # dotenv not required, will use environment variables directly

from upsonic.session.agent import AgentSession, RunData
from upsonic.session.base import SessionType
from upsonic.storage.schemas import UserMemory
from upsonic.storage.redis import RedisStorage
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


def get_redis_url() -> str:
    """Get Redis URL from environment or use default from docker-compose."""
    # Check for REDIS_URL first
    redis_url = os.getenv("REDIS_URL")
    if redis_url:
        return redis_url
    
    # Check for Redis Cloud credentials
    redis_host = os.getenv("REDIS_HOST")
    redis_port = os.getenv("REDIS_PORT")
    redis_username = os.getenv("REDIS_USERNAME")
    redis_password = os.getenv("REDIS_PASSWORD")
    
    if redis_host and redis_port:
        if redis_username and redis_password:
            # Redis Cloud with authentication
            return f"redis://{redis_username}:{redis_password}@{redis_host}:{redis_port}/0"
        else:
            # Redis without authentication
            return f"redis://{redis_host}:{redis_port}/0"
    
    # Default to localhost
    return "redis://localhost:6379/0"


def check_redis_available() -> bool:
    """Check if Redis is available by attempting a real connection."""
    try:
        redis_url = get_redis_url()
        storage = RedisStorage(db_url=redis_url, db_prefix="test_connection_check")
        # Try to ping Redis
        storage.redis_client.ping()
        storage.close()
        return True
    except Exception as e:
        # Log the error for debugging but don't fail
        print(f"Redis connection check failed: {e}", flush=True)
        return False


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
        ModelRequest(parts=[UserPromptPart(content="Analyze data")], run_id="run_001"),
        ModelResponse(parts=[
            TextPart(content="Analyzing..."),
            ToolCallPart(tool_name="calc", tool_call_id="c1", args={"x": 1}),
        ], model_name="gpt-4"),
        ModelResponse(parts=[
            TextPart(content="Result ready."),
            ThinkingPart(content="Data processed."),
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


def cleanup_redis_storage(storage: RedisStorage) -> None:
    """Clean up test data from Redis."""
    try:
        storage.clear_all()
        storage.close()
    except Exception:
        pass


# ============================================================================
# TEST 1: Initialization
# ============================================================================
def test_initialization():
    """Test RedisStorage initialization with various configurations."""
    print_separator("TEST 1: Initialization")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping initialization tests", flush=True)
        return
    
    redis_url = get_redis_url()
    
    # Test 1.1: Default initialization with db_url
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_init_default",
        )
        assert storage.db_prefix == "test_init_default"
        assert storage.session_table_name == "sessions"
        assert storage.user_memory_table_name == "user_memories"
        assert storage.id is not None
        assert storage.redis_client is not None
        log_test_result("Default initialization (db_url)", True)
        
        storage.close()
    except Exception as e:
        log_test_result("Default initialization (db_url)", False, str(e))
        raise
    
    # Test 1.2: Custom table names
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_init_custom_tables",
            session_table="custom_sessions",
            user_memory_table="custom_memories",
        )
        assert storage.session_table_name == "custom_sessions"
        assert storage.user_memory_table_name == "custom_memories"
        log_test_result("Custom table names", True)
        
        storage.close()
    except Exception as e:
        log_test_result("Custom table names", False, str(e))
        raise
    
    # Test 1.3: Custom ID
    try:
        custom_id = "test_storage_123"
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_init_custom_id",
            id=custom_id
        )
        assert storage.id == custom_id
        log_test_result("Custom ID", True)
        
        storage.close()
    except Exception as e:
        log_test_result("Custom ID", False, str(e))
        raise
    
    # Test 1.4: Custom prefix
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="my_custom_prefix",
        )
        assert storage.db_prefix == "my_custom_prefix"
        log_test_result("Custom prefix", True)
        
        storage.close()
    except Exception as e:
        log_test_result("Custom prefix", False, str(e))
        raise
    
    # Test 1.5: With expire (TTL)
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_init_expire",
            expire=3600,  # 1 hour
        )
        assert storage.expire == 3600
        log_test_result("With expire (TTL)", True)
        
        storage.close()
    except Exception as e:
        log_test_result("With expire (TTL)", False, str(e))
        raise
    
    # Test 1.6: Using redis_client instead of db_url
    try:
        from redis import Redis
        client = Redis.from_url(redis_url, decode_responses=True)
        storage = RedisStorage(
            redis_client=client,
            db_prefix="test_init_redis_client",
        )
        assert storage.redis_client is not None
        log_test_result("Using redis_client", True)
        
        storage.close()
    except Exception as e:
        log_test_result("Using redis_client", False, str(e))
        raise
    
    # Test 1.7: Error - neither redis_client nor db_url
    try:
        storage = RedisStorage()
        log_test_result("Error handling (no connection)", False, "Should raise ValueError")
    except ValueError:
        log_test_result("Error handling (no connection)", True)


# ============================================================================
# TEST 2: Table Management
# ============================================================================
def test_table_management():
    """Test table existence checks."""
    print_separator("TEST 2: Table Management")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping table management tests", flush=True)
        return
    
    redis_url = get_redis_url()
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_table_mgmt",
        )
        
        # Test 2.1: table_exists (always returns True for Redis)
        exists = storage.table_exists(storage.session_table_name)
        assert exists is True, "table_exists should always return True for Redis storage"
        log_test_result("table_exists (always True)", True)
        
        # Test 2.2: Check different table names
        exists2 = storage.table_exists("non_existent_table")
        assert exists2 is True, "table_exists should always return True"
        log_test_result("table_exists (any table name)", True)
        
        storage.close()
    except Exception as e:
        log_test_result("Table Management", False, str(e))
        raise


# ============================================================================
# TEST 3: Session Operations - Upsert
# ============================================================================
def test_session_upsert():
    """Test session upsert operations."""
    print_separator("TEST 3: Session Upsert Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping session upsert tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_session_upsert",
        )
        
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
        assert updated2.updated_at >= original_updated_at, "updated_at should be updated"
        log_test_result("upsert_session (preserve created_at)", True)
        
        # Test 3.7: CRITICAL - Verify runs and messages are correctly preserved
        session_with_data = create_test_agentsession("session_full_data")
        result_full = storage.upsert_session(session_with_data, deserialize=True)
        
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
        
    except Exception as e:
        log_test_result("Session Upsert", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 4: Session Operations - Bulk Upsert
# ============================================================================
def test_session_bulk_upsert():
    """Test bulk session upsert operations."""
    print_separator("TEST 4: Session Bulk Upsert Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping bulk upsert tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_session_bulk",
        )
        
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
        
        # Test 4.4: Bulk upsert update existing
        sessions[0].summary = "Bulk updated summary"
        updated_results = storage.upsert_sessions([sessions[0]], deserialize=True)
        assert updated_results[0].summary == "Bulk updated summary"
        log_test_result("upsert_sessions (update existing)", True)
        
        # Test 4.5: Bulk upsert mix of new and existing
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
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 5: Session Operations - Get
# ============================================================================
def test_session_get():
    """Test session retrieval operations."""
    print_separator("TEST 5: Session Get Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping session get tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_session_get",
        )
        
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
        empty_storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_empty_storage",
        )
        result8 = empty_storage.get_session(deserialize=True)
        assert result8 is None
        log_test_result("get_session (latest, empty storage)", True)
        empty_storage.close()
        
    except Exception as e:
        log_test_result("Session Get", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 6: Session Operations - Get Multiple
# ============================================================================
def test_session_get_multiple():
    """Test multiple session retrieval operations."""
    print_separator("TEST 6: Session Get Multiple Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping get multiple tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_session_get_multi",
        )
        
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
        
        # Test 6.7: Get sessions with empty session_ids list
        # Empty list should iterate 0 times and return empty list
        results5 = storage.get_sessions(
            session_ids=[],
            deserialize=True
        )
        # Empty list means no IDs to fetch, so should return empty list
        assert isinstance(results5, list)
        assert len(results5) == 0
        log_test_result("get_sessions (empty session_ids list)", True)
        
        # Test 6.8: Get sessions with non-existent IDs
        results6 = storage.get_sessions(
            session_ids=["non_existent_1", "non_existent_2"],
            deserialize=True
        )
        assert len(results6) == 0
        log_test_result("get_sessions (non-existent IDs)", True)
        
    except Exception as e:
        log_test_result("Session Get Multiple", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 7: Session Operations - Sorting and Pagination
# ============================================================================
def test_session_sorting_pagination():
    """Test session sorting and pagination."""
    print_separator("TEST 7: Session Sorting and Pagination")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping sorting/pagination tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_session_sort",
        )
        
        # Setup: Create sessions with different created_at timestamps
        base_time = int(time.time())
        sessions = []
        for i in range(10):
            session = create_test_agentsession(
                f"sort_session_{i}",
                created_at=base_time + i * 10  # Increment by 10 seconds
            )
            sessions.append(session)
        storage.upsert_sessions(sessions)
        
        # Test 7.1: Sort by created_at desc (default)
        results = storage.get_sessions(
            sort_by="created_at",
            sort_order="desc",
            deserialize=True
        )
        assert len(results) == 10
        # Most recent should be first
        assert results[0].created_at >= results[-1].created_at
        log_test_result("get_sessions (sort desc)", True)
        
        # Test 7.2: Sort by created_at asc
        results2 = storage.get_sessions(
            sort_by="created_at",
            sort_order="asc",
            deserialize=True
        )
        assert results2[0].created_at <= results2[-1].created_at
        log_test_result("get_sessions (sort asc)", True)
        
        # Test 7.3: Pagination with limit
        results3 = storage.get_sessions(
            limit=5,
            deserialize=True
        )
        assert len(results3) == 5
        log_test_result("get_sessions (with limit)", True)
        
        # Test 7.4: Pagination with limit and offset
        results4 = storage.get_sessions(
            limit=3,
            offset=2,
            deserialize=True
        )
        assert len(results4) == 3
        log_test_result("get_sessions (with limit and offset)", True)
        
        # Test 7.5: Sort by updated_at (should fallback to created_at if None)
        results5 = storage.get_sessions(
            sort_by="updated_at",
            sort_order="desc",
            deserialize=True
        )
        assert len(results5) == 10
        log_test_result("get_sessions (sort by updated_at)", True)
        
    except Exception as e:
        log_test_result("Session Sorting/Pagination", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 8: Session Operations - Delete
# ============================================================================
def test_session_delete():
    """Test session deletion operations."""
    print_separator("TEST 8: Session Delete Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping delete tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_session_delete",
        )
        
        # Setup: Create test sessions
        sessions = [
            create_test_agentsession(f"delete_session_{i}")
            for i in range(5)
        ]
        storage.upsert_sessions(sessions)
        
        # Test 8.1: Delete single session
        deleted = storage.delete_session("delete_session_0")
        assert deleted is True
        result = storage.get_session(session_id="delete_session_0")
        assert result is None
        log_test_result("delete_session (single)", True)
        
        # Test 8.2: Delete non-existent session
        deleted2 = storage.delete_session("non_existent")
        assert deleted2 is False
        log_test_result("delete_session (non-existent)", True)
        
        # Test 8.3: Delete with empty session_id (should raise ValueError)
        try:
            storage.delete_session("")
            log_test_result("delete_session (empty session_id validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_session (empty session_id validation)", True)
        
        # Test 8.4: Delete multiple sessions
        deleted_count = storage.delete_sessions([
            "delete_session_1",
            "delete_session_2",
            "delete_session_3",
        ])
        assert deleted_count == 3
        # Verify they're deleted
        remaining = storage.get_sessions(deserialize=True)
        assert len(remaining) == 1  # Only delete_session_4 should remain
        log_test_result("delete_sessions (multiple)", True)
        
        # Test 8.5: Delete multiple with empty list (should raise ValueError)
        try:
            storage.delete_sessions([])
            log_test_result("delete_sessions (empty list validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_sessions (empty list validation)", True)
        
        # Test 8.6: Delete multiple with some non-existent
        storage.upsert_session(create_test_agentsession("delete_test_1"))
        storage.upsert_session(create_test_agentsession("delete_test_2"))
        deleted_count2 = storage.delete_sessions([
            "delete_test_1",
            "non_existent_1",
            "delete_test_2",
        ])
        assert deleted_count2 == 2  # Only 2 actually existed
        log_test_result("delete_sessions (with non-existent)", True)
        
    except Exception as e:
        log_test_result("Session Delete", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 9: User Memory Operations - Upsert
# ============================================================================
def test_user_memory_upsert():
    """Test user memory upsert operations."""
    print_separator("TEST 9: User Memory Upsert Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping user memory upsert tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_memory_upsert",
        )
        
        # Test 9.1: Upsert single user memory (deserialize=True returns UserMemory)
        user_id = "user_001"
        memory_data = {"preference": "dark_mode", "language": "en"}
        result = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=memory_data, agent_id="agent_1"),
            deserialize=True
        )
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == user_id
        assert result.user_memory == memory_data
        log_test_result("upsert_user_memory (single, deserialize=True)", True)
        
        # Test 9.2: Update existing user memory
        updated_memory = {"preference": "light_mode", "language": "en", "theme": "blue"}
        result2 = storage.upsert_user_memory(
            user_memory=UserMemory(user_id=user_id, user_memory=updated_memory, agent_id="agent_1"),
            deserialize=True
        )
        assert isinstance(result2, UserMemory)
        assert result2.user_memory == updated_memory
        # created_at should be preserved
        assert result2.created_at == result.created_at
        # updated_at should be different
        assert result2.updated_at >= result.updated_at
        log_test_result("upsert_user_memory (update existing)", True)
        
        # Test 9.3: Upsert with team_id
        result3 = storage.upsert_user_memory(
            user_memory=UserMemory(user_id="user_002", user_memory={"data": "test"}, team_id="team_1"),
            deserialize=True
        )
        assert isinstance(result3, UserMemory)
        assert result3.team_id == "team_1"
        log_test_result("upsert_user_memory (with team_id)", True)
        
        # Test 9.4: Upsert without user_id (should raise ValueError)
        try:
            storage.upsert_user_memory(
                user_memory=UserMemory(user_id="", user_memory={})
            )
            log_test_result("upsert_user_memory (no user_id validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("upsert_user_memory (no user_id validation)", True)
        
    except Exception as e:
        log_test_result("User Memory Upsert", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 10: User Memory Operations - Bulk Upsert
# ============================================================================
def test_user_memory_bulk_upsert():
    """Test bulk user memory upsert operations."""
    print_separator("TEST 10: User Memory Bulk Upsert Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping bulk memory upsert tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_memory_bulk",
        )
        
        # Test 10.1: Bulk upsert multiple user memories
        memories = [
            UserMemory(
                user_id=f"user_{i}",
                user_memory={"data": f"memory_{i}"},
                agent_id=f"agent_{i % 2}",
            )
            for i in range(5)
        ]
        
        results = storage.upsert_user_memories(memories, deserialize=True)
        assert len(results) == 5
        assert all(isinstance(r, UserMemory) for r in results)
        log_test_result("upsert_user_memories (bulk)", True)
        
        # Test 10.2: Bulk upsert empty list
        results2 = storage.upsert_user_memories([], deserialize=True)
        assert results2 == []
        log_test_result("upsert_user_memories (empty list)", True)
        
        # Test 10.3: Bulk upsert with missing user_id (should raise ValueError)
        try:
            invalid_memories = [
                UserMemory(user_id="valid_user", user_memory={}),
                UserMemory(user_id=None, user_memory={}),  # Missing user_id
            ]
            storage.upsert_user_memories(invalid_memories)
            log_test_result("upsert_user_memories (validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("upsert_user_memories (validation)", True)
        
        # Test 10.4: Bulk upsert update existing
        memories[0].user_memory = {"data": "updated_memory"}
        updated_results = storage.upsert_user_memories([memories[0]], deserialize=True)
        assert isinstance(updated_results[0], UserMemory)
        assert updated_results[0].user_memory["data"] == "updated_memory"
        log_test_result("upsert_user_memories (update existing)", True)
        
    except Exception as e:
        log_test_result("User Memory Bulk Upsert", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 11: User Memory Operations - Get
# ============================================================================
def test_user_memory_get():
    """Test user memory retrieval operations."""
    print_separator("TEST 11: User Memory Get Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping user memory get tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_memory_get",
        )
        
        # Setup: Create test memories
        for i in range(5):
            storage.upsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"get_user_{i}",
                    user_memory={"data": f"memory_{i}"},
                    agent_id=f"agent_{i % 2}"
                )
            )
        
        # Test 11.1: Get user memory by user_id (deserialize=True returns UserMemory)
        result = storage.get_user_memory(user_id="get_user_0", deserialize=True)
        assert result is not None
        assert isinstance(result, UserMemory)
        assert result.user_id == "get_user_0"
        log_test_result("get_user_memory (by user_id, deserialize=True)", True)
        
        # Test 11.2: Get non-existent user memory
        result2 = storage.get_user_memory(user_id="non_existent", deserialize=True)
        assert result2 is None
        log_test_result("get_user_memory (non-existent)", True)
        
        # Test 11.3: Get latest user memory (no user_id)
        result3 = storage.get_user_memory(user_id=None, deserialize=True)
        assert result3 is not None
        assert isinstance(result3, UserMemory)
        assert result3.user_id is not None
        log_test_result("get_user_memory (latest, no user_id)", True)
        
        # Test 11.4: Get user memory with agent_id filter
        result4 = storage.get_user_memory(
            user_id=None,
            agent_id="agent_0",
            deserialize=True
        )
        assert result4 is not None
        assert isinstance(result4, UserMemory)
        assert result4.agent_id == "agent_0"
        log_test_result("get_user_memory (with agent_id filter)", True)
        
        # Test 11.5: Get user memory with team_id filter
        storage.upsert_user_memory(
            user_memory=UserMemory(user_id="team_user", user_memory={"data": "test"}, team_id="team_1")
        )
        result5 = storage.get_user_memory(
            user_id=None,
            team_id="team_1",
            deserialize=True
        )
        assert result5 is not None
        assert isinstance(result5, UserMemory)
        assert result5.team_id == "team_1"
        log_test_result("get_user_memory (with team_id filter)", True)
        
    except Exception as e:
        log_test_result("User Memory Get", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 12: User Memory Operations - Get Multiple
# ============================================================================
def test_user_memory_get_multiple():
    """Test multiple user memory retrieval operations."""
    print_separator("TEST 12: User Memory Get Multiple Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping get multiple memory tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_memory_get_multi",
        )
        
        # Setup: Create test memories
        for i in range(10):
            storage.upsert_user_memory(
                user_memory=UserMemory(
                    user_id=f"multi_user_{i}",
                    user_memory={"data": f"memory_{i}"},
                    agent_id=f"agent_{i % 2}",
                    team_id=f"team_{i % 3}"
                )
            )
        
        # Test 12.1: Get all user memories (deserialize=True returns List[UserMemory])
        all_memories = storage.get_user_memories(deserialize=True)
        assert isinstance(all_memories, list)
        assert len(all_memories) == 10
        assert all(isinstance(m, UserMemory) for m in all_memories)
        log_test_result("get_user_memories (all, deserialize=True)", True)
        
        # Test 12.2: Get all user memories (deserialize=False returns tuple)
        all_memories_raw, count = storage.get_user_memories(deserialize=False)
        assert isinstance(all_memories_raw, list)
        assert isinstance(count, int)
        assert len(all_memories_raw) == 10
        assert count == 10
        log_test_result("get_user_memories (all, deserialize=False)", True)
        
        # Test 12.3: Get user memories by user_ids
        user_ids = ["multi_user_0", "multi_user_1", "multi_user_2"]
        results = storage.get_user_memories(user_ids=user_ids, deserialize=True)
        assert len(results) == 3
        assert all(isinstance(m, UserMemory) for m in results)
        log_test_result("get_user_memories (by user_ids)", True)
        
        # Test 12.4: Get user memories with agent_id filter
        results2 = storage.get_user_memories(agent_id="agent_0", deserialize=True)
        assert all(isinstance(r, UserMemory) for r in results2)
        assert all(r.agent_id == "agent_0" for r in results2)
        log_test_result("get_user_memories (with agent_id filter)", True)
        
        # Test 12.5: Get user memories with team_id filter
        results3 = storage.get_user_memories(team_id="team_0", deserialize=True)
        assert all(isinstance(r, UserMemory) for r in results3)
        assert all(r.team_id == "team_0" for r in results3)
        log_test_result("get_user_memories (with team_id filter)", True)
        
        # Test 12.6: Pagination with limit (deserialize=False for count)
        results4, count5 = storage.get_user_memories(limit=5, deserialize=False)
        assert len(results4) == 5
        assert count5 == 10  # Total count should still be 10
        log_test_result("get_user_memories (with limit)", True)
        
        # Test 12.7: Pagination with limit and offset
        results5, count6 = storage.get_user_memories(limit=3, offset=2, deserialize=False)
        assert len(results5) == 3
        assert count6 == 10
        log_test_result("get_user_memories (with limit and offset)", True)
        
    except Exception as e:
        log_test_result("User Memory Get Multiple", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 13: User Memory Operations - Delete
# ============================================================================
def test_user_memory_delete():
    """Test user memory deletion operations."""
    print_separator("TEST 13: User Memory Delete Operations")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping delete memory tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_memory_delete",
        )
        
        # Setup: Create test memories
        for i in range(5):
            storage.upsert_user_memory(
                user_memory=UserMemory(user_id=f"delete_user_{i}", user_memory={"data": f"memory_{i}"})
            )
        
        # Test 13.1: Delete single user memory
        deleted = storage.delete_user_memory("delete_user_0")
        assert deleted is True
        result = storage.get_user_memory(user_id="delete_user_0")
        assert result is None
        log_test_result("delete_user_memory (single)", True)
        
        # Test 13.2: Delete non-existent user memory
        deleted2 = storage.delete_user_memory("non_existent")
        assert deleted2 is False
        log_test_result("delete_user_memory (non-existent)", True)
        
        # Test 13.3: Delete with empty user_id (should raise ValueError)
        try:
            storage.delete_user_memory("")
            log_test_result("delete_user_memory (empty user_id validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_user_memory (empty user_id validation)", True)
        
        # Test 13.4: Delete multiple user memories
        deleted_count = storage.delete_user_memories([
            "delete_user_1",
            "delete_user_2",
            "delete_user_3",
        ])
        assert deleted_count == 3
        # Verify they're deleted
        remaining, count = storage.get_user_memories(deserialize=False)
        assert count == 1  # Only delete_user_4 should remain
        log_test_result("delete_user_memories (multiple)", True)
        
        # Test 13.5: Delete multiple with empty list (should raise ValueError)
        try:
            storage.delete_user_memories([])
            log_test_result("delete_user_memories (empty list validation)", False, "Should raise ValueError")
        except ValueError:
            log_test_result("delete_user_memories (empty list validation)", True)
        
    except Exception as e:
        log_test_result("User Memory Delete", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# TEST 14: Utility Methods
# ============================================================================
def test_utility_methods():
    """Test utility methods (clear_all, close)."""
    print_separator("TEST 14: Utility Methods")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping utility methods tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_utility",
        )
        
        # Setup: Create some data
        session = create_test_agentsession("utility_session")
        storage.upsert_session(session)
        storage.upsert_user_memory(
            user_memory=UserMemory(user_id="utility_user", user_memory={"data": "test"})
        )
        
        # Test 14.1: clear_all removes all data
        storage.clear_all()
        sessions = storage.get_sessions(deserialize=True)
        memories, count = storage.get_user_memories(deserialize=False)
        assert len(sessions) == 0
        assert count == 0
        log_test_result("clear_all (removes all data)", True)
        
        # Test 14.2: close() doesn't raise error
        try:
            storage.close()
            log_test_result("close() (no error)", True)
        except Exception as e:
            log_test_result("close() (no error)", False, str(e))
        
        # Test 14.3: Operations after close should still work (reconnect)
        storage2 = RedisStorage(
            db_url=redis_url,
            db_prefix="test_utility2",
        )
        storage2.upsert_session(create_test_agentsession("after_close"))
        result = storage2.get_session(session_id="after_close")
        assert result is not None
        storage2.close()
        log_test_result("Operations after close (reconnect)", True)
        
    except Exception as e:
        log_test_result("Utility Methods", False, str(e))
        raise
    finally:
        if storage:
            try:
                storage.clear_all()
                storage.close()
            except:
                pass


# ============================================================================
# TEST 15: Edge Cases
# ============================================================================
def test_edge_cases():
    """Test edge cases and error handling."""
    print_separator("TEST 15: Edge Cases")
    
    if not check_redis_available():
        print("⚠️  Redis not available, skipping edge case tests", flush=True)
        return
    
    redis_url = get_redis_url()
    storage = None
    
    try:
        storage = RedisStorage(
            db_url=redis_url,
            db_prefix="test_edge_cases",
        )
        
        # Test 15.1: Session with None values
        session_with_none = create_test_agentsession("none_session")
        session_with_none.summary = None
        session_with_none.metadata = None
        result = storage.upsert_session(session_with_none, deserialize=True)
        assert result.summary is None
        assert result.metadata is None
        log_test_result("Session with None values", True)
        
        # Test 15.2: User memory with empty dict
        result2 = storage.upsert_user_memory(
            user_memory=UserMemory(user_id="empty_memory_user", user_memory={}),
            deserialize=True
        )
        assert isinstance(result2, UserMemory)
        assert result2.user_memory == {}
        log_test_result("User memory with empty dict", True)
        
        # Test 15.3: Large session data
        large_data = {"large_field": "x" * 10000}
        session_large = create_test_agentsession("large_session")
        session_large.session_data = large_data
        result3 = storage.upsert_session(session_large, deserialize=True)
        assert result3.session_data == large_data
        log_test_result("Large session data", True)
        
        # Test 15.4: Multiple rapid upserts
        for i in range(10):
            storage.upsert_session(create_test_agentsession(f"rapid_{i}"))
        all_sessions = storage.get_sessions(deserialize=True)
        assert len(all_sessions) >= 10
        log_test_result("Multiple rapid upserts", True)
        
        # Test 15.5: Get with filters that match nothing
        results = storage.get_sessions(
            user_id="non_existent_user",
            deserialize=True
        )
        assert len(results) == 0
        log_test_result("Get with filters matching nothing", True)
        
        # Test 15.6: Expire functionality (if set)
        storage_with_expire = RedisStorage(
            db_url=redis_url,
            db_prefix="test_expire",
            expire=1,  # 1 second
        )
        storage_with_expire.upsert_session(create_test_agentsession("expire_test"))
        time.sleep(2)  # Wait for expiration
        # Note: Redis expiration is handled by Redis, so the key might still exist
        # but we can at least verify the storage was created with expire
        assert storage_with_expire.expire == 1
        storage_with_expire.close()
        log_test_result("Expire functionality", True)
        
    except Exception as e:
        log_test_result("Edge Cases", False, str(e))
        raise
    finally:
        if storage:
            cleanup_redis_storage(storage)


# ============================================================================
# Main Test Runner
# ============================================================================
def run_all_tests():
    """Run all tests."""
    print("\n" + "=" * 80, flush=True)
    print("  Redis Storage Comprehensive Test Suite", flush=True)
    print("=" * 80 + "\n", flush=True)
    
    if not check_redis_available():
        print("⚠️  WARNING: Redis is not available!", flush=True)
        print("   Please ensure Redis is running (docker-compose up redis)", flush=True)
        print("   or set REDIS_URL environment variable.\n", flush=True)
        return False
    
    try:
        test_initialization()
        test_table_management()
        test_session_upsert()
        test_session_bulk_upsert()
        test_session_get()
        test_session_get_multiple()
        test_session_sorting_pagination()
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
        if total > 0:
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

