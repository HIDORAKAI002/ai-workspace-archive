"""
User Confirmation HITL Usage Examples

Demonstrates how to use tools that require user confirmation before execution.
The agent pauses, the user approves or rejects, then the agent resumes.

Note: HITL continuation (continue_run_async) only supports direct call mode.
Streaming mode is not supported for continuation.
"""

import pytest
import asyncio
import os
from upsonic import Agent, Task
from upsonic.tools import tool
from upsonic.db.database import SqliteDatabase

pytestmark = pytest.mark.timeout(300)


def cleanup_db() -> None:
    """Clean up test database files."""
    if os.path.exists("confirmation.db"):
        os.remove("confirmation.db")


# ============================================================================
# TOOLS REQUIRING CONFIRMATION
# ============================================================================

@tool(requires_confirmation=True)
def sensitive_operation(data: str) -> str:
    """
    Perform a sensitive operation that requires user confirmation.

    Args:
        data: Data to process

    Returns:
        Operation result
    """
    print(f"sensitive_operation called with data '{data}'")
    return f"Sensitive operation completed on: {data}"


@tool(requires_confirmation=True)
def delete_records(table: str, condition: str) -> str:
    """
    Delete records from a database table - requires user confirmation.

    Args:
        table: Table name
        condition: WHERE condition for deletion

    Returns:
        Deletion result
    """
    print(f"delete_records called with table '{table}', condition '{condition}'")
    return f"Deleted records from {table} where {condition}"


@tool(requires_confirmation=True)
def deploy_to_production(version: str, environment: str) -> str:
    """
    Deploy application to production - requires user confirmation.

    Args:
        version: Version to deploy
        environment: Target environment

    Returns:
        Deployment result
    """
    print(f"deploy_to_production called with version '{version}', environment '{environment}'")
    return f"Deployed version {version} to {environment}"


# ============================================================================
# HITL HANDLER
# ============================================================================

def hitl_handler(requirement) -> None:
    """
    Unified HITL handler that auto-confirms every confirmation requirement.
    """
    if requirement.needs_confirmation:
        requirement.confirm()


def hitl_handler_reject(requirement) -> None:
    """
    Unified HITL handler that rejects every confirmation requirement.
    """
    if requirement.needs_confirmation:
        requirement.reject(note="Rejected by automated handler")


# ============================================================================
# VARIANT 1A: Direct Call with run_id - Same Agent (APPROVE)
# ============================================================================

async def confirmation_approve_with_run_id_same_agent():
    """
    Confirm a tool call using run_id and same agent instance.
    """
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent")
    task = Task(
        description="Perform a sensitive operation on the data 'user_records_2024'.",
        tools=[sensitive_operation]
    )

    output = await agent.print_do_async(task, return_output=True)

    assert output.is_paused, f"Expected paused, got {output.status}"
    assert output.pause_reason == "confirmation"

    for requirement in output.active_requirements:
        if requirement.needs_confirmation:
            requirement.confirm()

    result = await agent.continue_run_async(run_id=output.run_id, return_output=True)
    return result


# ============================================================================
# VARIANT 1B: Direct Call with task - Same Agent (APPROVE)
# ============================================================================

async def confirmation_approve_with_task_same_agent():
    """
    Confirm a tool call using task and same agent instance.
    """
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent")
    task = Task(
        description="Perform a sensitive operation on the data 'user_records_2024'.",
        tools=[sensitive_operation]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_confirmation:
            requirement.confirm()

    result = await agent.continue_run_async(task=task, return_output=True)
    return result


# ============================================================================
# VARIANT 1C: Direct Call with run_id - Same Agent (REJECT)
# ============================================================================

async def confirmation_reject_with_run_id_same_agent():
    """
    Reject a tool call. The agent should receive a rejection message and
    complete without executing the tool.
    """
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent")
    task = Task(
        description="Perform a sensitive operation on the data 'user_records_2024'.",
        tools=[sensitive_operation]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_confirmation:
            requirement.reject(note="Not authorized to run this operation")

    result = await agent.continue_run_async(run_id=output.run_id, return_output=True)
    return result


# ============================================================================
# VARIANT 2A: Direct Call with task - New Agent (Cross-process)
# ============================================================================

async def confirmation_with_task_new_agent():
    """
    Confirm a tool call using a new agent instance and task parameter.
    Simulates cross-process resumption with in-memory context.
    """
    cleanup_db()
    db = SqliteDatabase(db_file="confirmation.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent", db=db)
    task = Task(
        description="Perform a sensitive operation on the data 'user_records_2024'.",
        tools=[sensitive_operation]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_confirmation:
            requirement.confirm()

    new_agent = Agent("openai/gpt-4o-mini", name="confirmation_agent", db=db)
    result = await new_agent.continue_run_async(
        task=task,
        requirements=output.requirements,
        return_output=True
    )
    return result


# ============================================================================
# VARIANT 2B: Direct Call with run_id - New Agent (Cross-process)
# ============================================================================

async def confirmation_with_run_id_new_agent():
    """
    Confirm a tool call using a new agent instance and run_id.
    Simulates cross-process resumption from storage.
    """
    cleanup_db()
    db = SqliteDatabase(db_file="confirmation.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent", db=db)
    task = Task(
        description="Perform a sensitive operation on the data 'user_records_2024'.",
        tools=[sensitive_operation]
    )

    output = await agent.print_do_async(task, return_output=True)
    run_id = output.run_id

    for requirement in output.active_requirements:
        if requirement.needs_confirmation:
            requirement.confirm()

    new_agent = Agent("openai/gpt-4o-mini", name="confirmation_agent", db=db)
    result = await new_agent.continue_run_async(
        run_id=run_id,
        requirements=output.requirements,
        return_output=True
    )
    return result


# ============================================================================
# VARIANT 3A: Using hitl_handler with task
# ============================================================================

async def confirmation_with_hitl_handler_task():
    """
    Use hitl_handler to auto-confirm tool calls with task parameter.
    """
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent")
    task = Task(
        description="Perform a sensitive operation on the data 'user_records_2024'.",
        tools=[sensitive_operation]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_confirmation:
            requirement.confirm()

    result = await agent.continue_run_async(
        task=task,
        return_output=True,
        hitl_handler=hitl_handler,
    )
    return result


# ============================================================================
# VARIANT 3B: Using hitl_handler with run_id
# ============================================================================

async def confirmation_with_hitl_handler_run_id():
    """
    Use hitl_handler to auto-confirm tool calls with run_id parameter.
    """
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent")
    task = Task(
        description="Perform a sensitive operation on the data 'user_records_2024'.",
        tools=[sensitive_operation]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_confirmation:
            requirement.confirm()

    result = await agent.continue_run_async(
        run_id=output.run_id,
        return_output=True,
        hitl_handler=hitl_handler,
    )
    return result


# ============================================================================
# VARIANT 4A: Multiple Confirmation Tools - Loop with task
# ============================================================================

async def confirmation_multiple_tools_loop_task():
    """
    Multiple confirmation tools using a while-loop with task parameter.
    """
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent")
    task = Task(
        description=(
            "First, delete records from the 'users' table where status='inactive'. "
            "Then deploy version '2.1.0' to the 'production' environment."
        ),
        tools=[delete_records, deploy_to_production]
    )

    output = await agent.print_do_async(task, return_output=True)

    while output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_confirmation:
                requirement.confirm()

        output = await agent.continue_run_async(task=task, return_output=True)

    return output


# ============================================================================
# VARIANT 4B: Multiple Confirmation Tools - Loop with run_id
# ============================================================================

async def confirmation_multiple_tools_loop_run_id():
    """
    Multiple confirmation tools using a while-loop with run_id.
    """
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent")
    task = Task(
        description=(
            "First, delete records from the 'users' table where status='inactive'. "
            "Then deploy version '2.1.0' to the 'production' environment."
        ),
        tools=[delete_records, deploy_to_production]
    )

    output = await agent.print_do_async(task, return_output=True)

    while output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_confirmation:
                requirement.confirm()

        output = await agent.continue_run_async(
            run_id=output.run_id,
            return_output=True
        )

    return output


# ============================================================================
# VARIANT 4C: Multiple Confirmation Tools - hitl_handler with task
# ============================================================================

async def confirmation_multiple_tools_handler_task():
    """
    Multiple confirmation tools with hitl_handler and task parameter.
    The handler auto-confirms all subsequent pauses.
    """
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent")
    task = Task(
        description=(
            "First, delete records from the 'users' table where status='inactive'. "
            "Then deploy version '2.1.0' to the 'production' environment."
        ),
        tools=[delete_records, deploy_to_production]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_confirmation:
            requirement.confirm()

    result = await agent.continue_run_async(
        task=task,
        return_output=True,
        hitl_handler=hitl_handler,
    )
    return result


# ============================================================================
# VARIANT 4D: Multiple Confirmation Tools - hitl_handler with run_id
# ============================================================================

async def confirmation_multiple_tools_handler_run_id():
    """
    Multiple confirmation tools with hitl_handler and run_id.
    The handler auto-confirms all subsequent pauses.
    """
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent")
    task = Task(
        description=(
            "First, delete records from the 'users' table where status='inactive'. "
            "Then deploy version '2.1.0' to the 'production' environment."
        ),
        tools=[delete_records, deploy_to_production]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_confirmation:
            requirement.confirm()

    result = await agent.continue_run_async(
        run_id=output.run_id,
        return_output=True,
        hitl_handler=hitl_handler,
    )
    return result


# ============================================================================
# VARIANT 5A: Cross-process Confirmation with task
# ============================================================================

async def confirmation_cross_process_task():
    """
    Cross-process confirmation handling using task parameter.

    1. Process A: do_async pauses for confirmation
    2. User confirms the requirement
    3. Process B: new agent continues with task + resolved requirements
    """
    cleanup_db()

    db = SqliteDatabase(db_file="confirmation.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent", db=db)
    task = Task(
        description="Perform a sensitive operation on the data 'audit_logs'.",
        tools=[sensitive_operation]
    )

    output = await agent.print_do_async(task, return_output=True)
    run_id = output.run_id

    if output.is_paused and output.active_requirements:
        print(f"Run {run_id} paused for confirmation:")
        for req in output.active_requirements:
            if req.tool_execution:
                print(f"  - Tool: {req.tool_execution.tool_name}")
                print(f"    Args: {req.tool_execution.tool_args}")

    for req in output.active_requirements:
        if req.needs_confirmation:
            req.confirm()
            print(f"  Confirmed: {req.tool_execution.tool_name}")

    new_db = SqliteDatabase(db_file="confirmation.db", session_id="session_1", user_id="user_1")
    new_agent = Agent("openai/gpt-4o-mini", name="confirmation_agent", db=new_db)
    result = await new_agent.continue_run_async(
        task=task,
        requirements=output.requirements,
        return_output=True
    )
    print(f"Final result: {result.output}")
    return result


# ============================================================================
# VARIANT 5B: Cross-process Confirmation with run_id
# ============================================================================

async def confirmation_cross_process_run_id():
    """
    Cross-process confirmation handling using run_id.

    1. Process A: do_async pauses for confirmation
    2. User confirms the requirement
    3. Process B: new agent loads from storage and continues
    """
    cleanup_db()

    db = SqliteDatabase(db_file="confirmation.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="confirmation_agent", db=db)
    task = Task(
        description="Perform a sensitive operation on the data 'audit_logs'.",
        tools=[sensitive_operation]
    )

    output = await agent.print_do_async(task, return_output=True)
    run_id = output.run_id

    if output.is_paused and output.active_requirements:
        print(f"Run {run_id} paused for confirmation:")
        for req in output.active_requirements:
            if req.tool_execution:
                print(f"  - Tool: {req.tool_execution.tool_name}")
                print(f"    Args: {req.tool_execution.tool_args}")

    for req in output.active_requirements:
        if req.needs_confirmation:
            req.confirm()
            print(f"  Confirmed: {req.tool_execution.tool_name}")

    new_db = SqliteDatabase(db_file="confirmation.db", session_id="session_1", user_id="user_1")
    new_agent = Agent("openai/gpt-4o-mini", name="confirmation_agent", db=new_db)
    result = await new_agent.continue_run_async(
        run_id=run_id,
        requirements=output.requirements,
        return_output=True
    )
    print(f"Final result: {result.output}")
    return result


# ============================================================================
# PYTEST TESTS
# ============================================================================

@pytest.mark.asyncio
async def test_confirmation_approve_with_run_id_same_agent():
    """Test: Approve with run_id - Same Agent"""
    result = await confirmation_approve_with_run_id_same_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_approve_with_task_same_agent():
    """Test: Approve with task - Same Agent"""
    result = await confirmation_approve_with_task_same_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_reject_with_run_id_same_agent():
    """Test: Reject with run_id - Same Agent"""
    result = await confirmation_reject_with_run_id_same_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_with_task_new_agent():
    """Test: Approve with task - New Agent (Cross-process)"""
    result = await confirmation_with_task_new_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_with_run_id_new_agent():
    """Test: Approve with run_id - New Agent (Cross-process)"""
    result = await confirmation_with_run_id_new_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_with_hitl_handler_task():
    """Test: hitl_handler with task"""
    result = await confirmation_with_hitl_handler_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_with_hitl_handler_run_id():
    """Test: hitl_handler with run_id"""
    result = await confirmation_with_hitl_handler_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_multiple_tools_loop_task():
    """Test: Multiple tools - Loop with task"""
    result = await confirmation_multiple_tools_loop_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_multiple_tools_loop_run_id():
    """Test: Multiple tools - Loop with run_id"""
    result = await confirmation_multiple_tools_loop_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_multiple_tools_handler_task():
    """Test: Multiple tools - hitl_handler with task"""
    result = await confirmation_multiple_tools_handler_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_multiple_tools_handler_run_id():
    """Test: Multiple tools - hitl_handler with run_id"""
    result = await confirmation_multiple_tools_handler_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_cross_process_task():
    """Test: Cross-process Confirmation (task)"""
    result = await confirmation_cross_process_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_confirmation_cross_process_run_id():
    """Test: Cross-process Confirmation (run_id)"""
    result = await confirmation_cross_process_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


# ============================================================================
# TEST RUNNER (for manual execution)
# ============================================================================

async def run_all_tests():
    """Run all confirmation test variants."""

    print("\n" + "=" * 80)
    print("TEST 1: Approve with run_id - Same Agent")
    print("=" * 80)
    result = await confirmation_approve_with_run_id_same_agent()
    assert result.is_complete, f"TEST 1 FAILED: Expected complete, got {result.status}"
    print("TEST 1 PASSED")

    print("\n" + "=" * 80)
    print("TEST 2: Approve with task - Same Agent")
    print("=" * 80)
    result = await confirmation_approve_with_task_same_agent()
    assert result.is_complete, f"TEST 2 FAILED: Expected complete, got {result.status}"
    print("TEST 2 PASSED")

    print("\n" + "=" * 80)
    print("TEST 3: Reject with run_id - Same Agent")
    print("=" * 80)
    result = await confirmation_reject_with_run_id_same_agent()
    assert result.is_complete, f"TEST 3 FAILED: Expected complete, got {result.status}"
    print("TEST 3 PASSED")

    print("\n" + "=" * 80)
    print("TEST 4: Approve with task - New Agent (Cross-process)")
    print("=" * 80)
    result = await confirmation_with_task_new_agent()
    assert result.is_complete, f"TEST 4 FAILED: Expected complete, got {result.status}"
    print("TEST 4 PASSED")

    print("\n" + "=" * 80)
    print("TEST 5: Approve with run_id - New Agent (Cross-process)")
    print("=" * 80)
    result = await confirmation_with_run_id_new_agent()
    assert result.is_complete, f"TEST 5 FAILED: Expected complete, got {result.status}"
    print("TEST 5 PASSED")

    print("\n" + "=" * 80)
    print("TEST 6: hitl_handler with task")
    print("=" * 80)
    result = await confirmation_with_hitl_handler_task()
    assert result.is_complete, f"TEST 6 FAILED: Expected complete, got {result.status}"
    print("TEST 6 PASSED")

    print("\n" + "=" * 80)
    print("TEST 7: hitl_handler with run_id")
    print("=" * 80)
    result = await confirmation_with_hitl_handler_run_id()
    assert result.is_complete, f"TEST 7 FAILED: Expected complete, got {result.status}"
    print("TEST 7 PASSED")

    print("\n" + "=" * 80)
    print("TEST 8: Multiple tools - Loop with task")
    print("=" * 80)
    result = await confirmation_multiple_tools_loop_task()
    assert result.is_complete, f"TEST 8 FAILED: Expected complete, got {result.status}"
    print("TEST 8 PASSED")

    print("\n" + "=" * 80)
    print("TEST 9: Multiple tools - Loop with run_id")
    print("=" * 80)
    result = await confirmation_multiple_tools_loop_run_id()
    assert result.is_complete, f"TEST 9 FAILED: Expected complete, got {result.status}"
    print("TEST 9 PASSED")

    print("\n" + "=" * 80)
    print("TEST 10: Multiple tools - hitl_handler with task")
    print("=" * 80)
    result = await confirmation_multiple_tools_handler_task()
    assert result.is_complete, f"TEST 10 FAILED: Expected complete, got {result.status}"
    print("TEST 10 PASSED")

    print("\n" + "=" * 80)
    print("TEST 11: Multiple tools - hitl_handler with run_id")
    print("=" * 80)
    result = await confirmation_multiple_tools_handler_run_id()
    assert result.is_complete, f"TEST 11 FAILED: Expected complete, got {result.status}"
    print("TEST 11 PASSED")

    print("\n" + "=" * 80)
    print("TEST 12: Cross-process Confirmation (task)")
    print("=" * 80)
    result = await confirmation_cross_process_task()
    assert result.is_complete, f"TEST 12 FAILED: Expected complete, got {result.status}"
    print("TEST 12 PASSED")

    print("\n" + "=" * 80)
    print("TEST 13: Cross-process Confirmation (run_id)")
    print("=" * 80)
    result = await confirmation_cross_process_run_id()
    assert result.is_complete, f"TEST 13 FAILED: Expected complete, got {result.status}"
    print("TEST 13 PASSED")

    cleanup_db()

    print("\n" + "=" * 80)
    print("ALL CONFIRMATION TESTS PASSED!")
    print("=" * 80)


if __name__ == "__main__":
    asyncio.run(run_all_tests())
