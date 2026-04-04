"""
User Input HITL Usage Examples

Demonstrates how to use tools decorated with @tool(requires_user_input=True).
The agent pauses, the user fills in the required field values, then the agent resumes.

Note: HITL continuation (continue_run_async) only supports direct call mode.
Streaming mode is not supported for continuation.
"""

import pytest
import asyncio
import os
from typing import Dict, List, Any
from upsonic import Agent, Task
from upsonic.tools import tool
from upsonic.db.database import SqliteDatabase

pytestmark = pytest.mark.timeout(300)


def cleanup_db() -> None:
    """Clean up test database files."""
    if os.path.exists("user_input.db"):
        os.remove("user_input.db")


# ============================================================================
# TOOLS REQUIRING USER INPUT
# ============================================================================

@tool(requires_user_input=True, user_input_fields=["to_address"])
def send_email(subject: str, body: str, to_address: str) -> str:
    """
    Send an email. The agent provides subject and body, the user provides the address.

    Args:
        subject: Email subject
        body: Email body content
        to_address: Recipient email address (provided by user)

    Returns:
        Confirmation message
    """
    print(f"send_email called with subject '{subject}', body '{body}', to_address '{to_address}'")
    return f"Email sent to {to_address} with subject '{subject}' and body '{body}'"


@tool(requires_user_input=True, user_input_fields=["priority", "assignee"])
def create_ticket(title: str, description: str, priority: str, assignee: str) -> str:
    """
    Create a support ticket. Agent provides title/description, user provides priority/assignee.

    Args:
        title: Ticket title
        description: Ticket description
        priority: Priority level (provided by user)
        assignee: Assignee name (provided by user)

    Returns:
        Ticket creation confirmation
    """
    print(f"create_ticket called with title '{title}', description '{description}', priority '{priority}', assignee '{assignee}'")
    return f"Ticket '{title}' created with priority={priority}, assignee={assignee}"


@tool(requires_user_input=True, user_input_fields=["date", "attendees"])
def schedule_meeting(topic: str, date: str, attendees: str) -> str:
    """
    Schedule a meeting. Agent provides topic, user provides date and attendees.

    Args:
        topic: Meeting topic
        date: Meeting date (provided by user)
        attendees: Comma-separated attendee list (provided by user)

    Returns:
        Meeting confirmation
    """
    print(f"schedule_meeting called with topic '{topic}', date '{date}', attendees '{attendees}'")
    return f"Meeting '{topic}' scheduled for {date} with attendees: {attendees}"


# ============================================================================
# HELPERS
# ============================================================================

_USER_INPUT_VALUES: Dict[str, str] = {
    "to_address": "user@example.com",
    "priority": "high",
    "assignee": "john.doe",
    "date": "2026-04-01",
    "attendees": "alice, bob, charlie",
}


def _fill_user_input(requirement) -> None:
    """Fill all user input fields on a requirement with predefined values."""
    if not requirement.user_input_schema:
        return
    for field_dict in requirement.user_input_schema:
        if isinstance(field_dict, dict) and field_dict.get("value") is None:
            name = field_dict["name"]
            field_dict["value"] = _USER_INPUT_VALUES.get(name, f"test_{name}")
    requirement.tool_execution.answered = True


# ============================================================================
# HITL HANDLER
# ============================================================================

def hitl_handler(requirement) -> None:
    """
    Unified HITL handler that fills user input fields automatically.
    """
    if requirement.needs_user_input:
        _fill_user_input(requirement)


# ============================================================================
# VARIANT 1A: Direct Call with run_id - Same Agent
# ============================================================================

async def user_input_with_run_id_same_agent():
    """
    Provide user input using run_id and same agent instance.
    """
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent")
    task = Task(
        description="Send an email with subject 'Hello' and body 'Hello, world!'.",
        tools=[send_email]
    )

    output = await agent.print_do_async(task, return_output=True)

    assert output.is_paused, f"Expected paused, got {output.status}"
    assert output.pause_reason == "user_input"

    for requirement in output.active_requirements:
        if requirement.needs_user_input:
            _fill_user_input(requirement)

    result = await agent.continue_run_async(run_id=output.run_id, return_output=True)
    return result


# ============================================================================
# VARIANT 1B: Direct Call with task - Same Agent
# ============================================================================

async def user_input_with_task_same_agent():
    """
    Provide user input using task and same agent instance.
    """
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent")
    task = Task(
        description="Send an email with subject 'Hello' and body 'Hello, world!'.",
        tools=[send_email]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_user_input:
            _fill_user_input(requirement)

    result = await agent.continue_run_async(task=task, return_output=True)
    return result


# ============================================================================
# VARIANT 2A: Direct Call with task - New Agent (Cross-process)
# ============================================================================

async def user_input_with_task_new_agent():
    """
    Provide user input using a new agent instance and task parameter.
    """
    cleanup_db()
    db = SqliteDatabase(db_file="user_input.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent", db=db)
    task = Task(
        description="Send an email with subject 'Hello' and body 'Hello, world!'.",
        tools=[send_email]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_user_input:
            _fill_user_input(requirement)

    new_agent = Agent("openai/gpt-4o-mini", name="user_input_agent", db=db)
    result = await new_agent.continue_run_async(
        task=task,
        requirements=output.requirements,
        return_output=True
    )
    return result


# ============================================================================
# VARIANT 2B: Direct Call with run_id - New Agent (Cross-process)
# ============================================================================

async def user_input_with_run_id_new_agent():
    """
    Provide user input using a new agent instance and run_id.
    """
    cleanup_db()
    db = SqliteDatabase(db_file="user_input.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent", db=db)
    task = Task(
        description="Send an email with subject 'Hello' and body 'Hello, world!'.",
        tools=[send_email]
    )

    output = await agent.print_do_async(task, return_output=True)
    run_id = output.run_id

    for requirement in output.active_requirements:
        if requirement.needs_user_input:
            _fill_user_input(requirement)

    new_agent = Agent("openai/gpt-4o-mini", name="user_input_agent", db=db)
    result = await new_agent.continue_run_async(
        run_id=run_id,
        requirements=output.requirements,
        return_output=True
    )
    return result


# ============================================================================
# VARIANT 3A: Using hitl_handler with task
# ============================================================================

async def user_input_with_hitl_handler_task():
    """
    Use hitl_handler to auto-fill user input fields with task parameter.
    """
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent")
    task = Task(
        description="Send an email with subject 'Hello' and body 'Hello, world!'.",
        tools=[send_email]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_user_input:
            _fill_user_input(requirement)

    result = await agent.continue_run_async(
        task=task,
        return_output=True,
        hitl_handler=hitl_handler,
    )
    return result


# ============================================================================
# VARIANT 3B: Using hitl_handler with run_id
# ============================================================================

async def user_input_with_hitl_handler_run_id():
    """
    Use hitl_handler to auto-fill user input fields with run_id.
    """
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent")
    task = Task(
        description="Send an email with subject 'Hello' and body 'Hello, world!'.",
        tools=[send_email]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_user_input:
            _fill_user_input(requirement)

    result = await agent.continue_run_async(
        run_id=output.run_id,
        return_output=True,
        hitl_handler=hitl_handler,
    )
    return result


# ============================================================================
# VARIANT 4A: Multiple User Input Tools - Loop with task
# ============================================================================

async def user_input_multiple_tools_loop_task():
    """
    Multiple user-input tools using a while-loop with task parameter.
    """
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent")
    task = Task(
        description=(
            "First, create a support ticket titled 'Bug Report' with description 'App crashes on login'. "
            "Then schedule a meeting about 'Bug Triage'."
        ),
        tools=[create_ticket, schedule_meeting]
    )

    output = await agent.print_do_async(task, return_output=True)

    while output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)

        output = await agent.continue_run_async(task=task, return_output=True)

    return output


# ============================================================================
# VARIANT 4B: Multiple User Input Tools - Loop with run_id
# ============================================================================

async def user_input_multiple_tools_loop_run_id():
    """
    Multiple user-input tools using a while-loop with run_id.
    """
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent")
    task = Task(
        description=(
            "First, create a support ticket titled 'Bug Report' with description 'App crashes on login'. "
            "Then schedule a meeting about 'Bug Triage'."
        ),
        tools=[create_ticket, schedule_meeting]
    )

    output = await agent.print_do_async(task, return_output=True)

    while output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)

        output = await agent.continue_run_async(
            run_id=output.run_id,
            return_output=True
        )

    return output


# ============================================================================
# VARIANT 4C: Multiple User Input Tools - hitl_handler with task
# ============================================================================

async def user_input_multiple_tools_handler_task():
    """
    Multiple user-input tools with hitl_handler and task parameter.
    """
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent")
    task = Task(
        description=(
            "First, create a support ticket titled 'Bug Report' with description 'App crashes on login'. "
            "Then schedule a meeting about 'Bug Triage'."
        ),
        tools=[create_ticket, schedule_meeting]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_user_input:
            _fill_user_input(requirement)

    result = await agent.continue_run_async(
        task=task,
        return_output=True,
        hitl_handler=hitl_handler,
    )
    return result


# ============================================================================
# VARIANT 4D: Multiple User Input Tools - hitl_handler with run_id
# ============================================================================

async def user_input_multiple_tools_handler_run_id():
    """
    Multiple user-input tools with hitl_handler and run_id.
    """
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent")
    task = Task(
        description=(
            "First, create a support ticket titled 'Bug Report' with description 'App crashes on login'. "
            "Then schedule a meeting about 'Bug Triage'."
        ),
        tools=[create_ticket, schedule_meeting]
    )

    output = await agent.print_do_async(task, return_output=True)

    for requirement in output.active_requirements:
        if requirement.needs_user_input:
            _fill_user_input(requirement)

    result = await agent.continue_run_async(
        run_id=output.run_id,
        return_output=True,
        hitl_handler=hitl_handler,
    )
    return result


# ============================================================================
# VARIANT 5A: Cross-process User Input with task
# ============================================================================

async def user_input_cross_process_task():
    """
    Cross-process user input handling using task parameter.

    1. Process A: do_async pauses for user input
    2. User fills required field values
    3. Process B: new agent continues with task + resolved requirements
    """
    cleanup_db()

    db = SqliteDatabase(db_file="user_input.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent", db=db)
    task = Task(
        description="Send an email with subject 'Report' and body 'Monthly report attached'.",
        tools=[send_email]
    )

    output = await agent.print_do_async(task, return_output=True)
    run_id = output.run_id

    if output.is_paused and output.active_requirements:
        print(f"Run {run_id} paused for user input:")
        for req in output.active_requirements:
            if req.tool_execution:
                print(f"  - Tool: {req.tool_execution.tool_name}")
                print(f"    Args: {req.tool_execution.tool_args}")
            if req.user_input_schema:
                for field_dict in req.user_input_schema:
                    print(f"    Field: {field_dict['name']} (type={field_dict.get('field_type', 'str')})")

    for req in output.active_requirements:
        if req.needs_user_input:
            _fill_user_input(req)
            print(f"  Filled input for: {req.tool_execution.tool_name}")

    new_db = SqliteDatabase(db_file="user_input.db", session_id="session_1", user_id="user_1")
    new_agent = Agent("openai/gpt-4o-mini", name="user_input_agent", db=new_db)
    result = await new_agent.continue_run_async(
        task=task,
        requirements=output.requirements,
        return_output=True
    )
    print(f"Final result: {result.output}")
    return result


# ============================================================================
# VARIANT 5B: Cross-process User Input with run_id
# ============================================================================

async def user_input_cross_process_run_id():
    """
    Cross-process user input handling using run_id.

    1. Process A: do_async pauses for user input
    2. User fills required field values
    3. Process B: new agent loads from storage and continues
    """
    cleanup_db()

    db = SqliteDatabase(db_file="user_input.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="user_input_agent", db=db)
    task = Task(
        description="Send an email with subject 'Report' and body 'Monthly report attached'.",
        tools=[send_email]
    )

    output = await agent.print_do_async(task, return_output=True)
    run_id = output.run_id

    if output.is_paused and output.active_requirements:
        print(f"Run {run_id} paused for user input:")
        for req in output.active_requirements:
            if req.tool_execution:
                print(f"  - Tool: {req.tool_execution.tool_name}")
            if req.user_input_schema:
                for field_dict in req.user_input_schema:
                    print(f"    Field: {field_dict['name']} (type={field_dict.get('field_type', 'str')})")

    for req in output.active_requirements:
        if req.needs_user_input:
            _fill_user_input(req)
            print(f"  Filled input for: {req.tool_execution.tool_name}")

    new_db = SqliteDatabase(db_file="user_input.db", session_id="session_1", user_id="user_1")
    new_agent = Agent("openai/gpt-4o-mini", name="user_input_agent", db=new_db)
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
async def test_user_input_with_run_id_same_agent():
    """Test: User input with run_id - Same Agent"""
    result = await user_input_with_run_id_same_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_with_task_same_agent():
    """Test: User input with task - Same Agent"""
    result = await user_input_with_task_same_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_with_task_new_agent():
    """Test: User input with task - New Agent (Cross-process)"""
    result = await user_input_with_task_new_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_with_run_id_new_agent():
    """Test: User input with run_id - New Agent (Cross-process)"""
    result = await user_input_with_run_id_new_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_with_hitl_handler_task():
    """Test: hitl_handler with task"""
    result = await user_input_with_hitl_handler_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_with_hitl_handler_run_id():
    """Test: hitl_handler with run_id"""
    result = await user_input_with_hitl_handler_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_multiple_tools_loop_task():
    """Test: Multiple tools - Loop with task"""
    result = await user_input_multiple_tools_loop_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_multiple_tools_loop_run_id():
    """Test: Multiple tools - Loop with run_id"""
    result = await user_input_multiple_tools_loop_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_multiple_tools_handler_task():
    """Test: Multiple tools - hitl_handler with task"""
    result = await user_input_multiple_tools_handler_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_multiple_tools_handler_run_id():
    """Test: Multiple tools - hitl_handler with run_id"""
    result = await user_input_multiple_tools_handler_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_cross_process_task():
    """Test: Cross-process User Input (task)"""
    result = await user_input_cross_process_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_user_input_cross_process_run_id():
    """Test: Cross-process User Input (run_id)"""
    result = await user_input_cross_process_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


# ============================================================================
# TEST RUNNER (for manual execution)
# ============================================================================

async def run_all_tests():
    """Run all user input test variants."""

    print("\n" + "=" * 80)
    print("TEST 1: User input with run_id - Same Agent")
    print("=" * 80)
    result = await user_input_with_run_id_same_agent()
    assert result.is_complete, f"TEST 1 FAILED: Expected complete, got {result.status}"
    print("TEST 1 PASSED")

    print("\n" + "=" * 80)
    print("TEST 2: User input with task - Same Agent")
    print("=" * 80)
    result = await user_input_with_task_same_agent()
    assert result.is_complete, f"TEST 2 FAILED: Expected complete, got {result.status}"
    print("TEST 2 PASSED")

    print("\n" + "=" * 80)
    print("TEST 3: User input with task - New Agent (Cross-process)")
    print("=" * 80)
    result = await user_input_with_task_new_agent()
    assert result.is_complete, f"TEST 3 FAILED: Expected complete, got {result.status}"
    print("TEST 3 PASSED")

    print("\n" + "=" * 80)
    print("TEST 4: User input with run_id - New Agent (Cross-process)")
    print("=" * 80)
    result = await user_input_with_run_id_new_agent()
    assert result.is_complete, f"TEST 4 FAILED: Expected complete, got {result.status}"
    print("TEST 4 PASSED")

    print("\n" + "=" * 80)
    print("TEST 5: hitl_handler with task")
    print("=" * 80)
    result = await user_input_with_hitl_handler_task()
    assert result.is_complete, f"TEST 5 FAILED: Expected complete, got {result.status}"
    print("TEST 5 PASSED")

    print("\n" + "=" * 80)
    print("TEST 6: hitl_handler with run_id")
    print("=" * 80)
    result = await user_input_with_hitl_handler_run_id()
    assert result.is_complete, f"TEST 6 FAILED: Expected complete, got {result.status}"
    print("TEST 6 PASSED")

    print("\n" + "=" * 80)
    print("TEST 7: Multiple tools - Loop with task")
    print("=" * 80)
    result = await user_input_multiple_tools_loop_task()
    assert result.is_complete, f"TEST 7 FAILED: Expected complete, got {result.status}"
    print("TEST 7 PASSED")

    print("\n" + "=" * 80)
    print("TEST 8: Multiple tools - Loop with run_id")
    print("=" * 80)
    result = await user_input_multiple_tools_loop_run_id()
    assert result.is_complete, f"TEST 8 FAILED: Expected complete, got {result.status}"
    print("TEST 8 PASSED")

    print("\n" + "=" * 80)
    print("TEST 9: Multiple tools - hitl_handler with task")
    print("=" * 80)
    result = await user_input_multiple_tools_handler_task()
    assert result.is_complete, f"TEST 9 FAILED: Expected complete, got {result.status}"
    print("TEST 9 PASSED")

    print("\n" + "=" * 80)
    print("TEST 10: Multiple tools - hitl_handler with run_id")
    print("=" * 80)
    result = await user_input_multiple_tools_handler_run_id()
    assert result.is_complete, f"TEST 10 FAILED: Expected complete, got {result.status}"
    print("TEST 10 PASSED")

    print("\n" + "=" * 80)
    print("TEST 11: Cross-process User Input (task)")
    print("=" * 80)
    result = await user_input_cross_process_task()
    assert result.is_complete, f"TEST 11 FAILED: Expected complete, got {result.status}"
    print("TEST 11 PASSED")

    print("\n" + "=" * 80)
    print("TEST 12: Cross-process User Input (run_id)")
    print("=" * 80)
    result = await user_input_cross_process_run_id()
    assert result.is_complete, f"TEST 12 FAILED: Expected complete, got {result.status}"
    print("TEST 12 PASSED")

    cleanup_db()

    print("\n" + "=" * 80)
    print("ALL USER INPUT TESTS PASSED!")
    print("=" * 80)


if __name__ == "__main__":
    asyncio.run(run_all_tests())
