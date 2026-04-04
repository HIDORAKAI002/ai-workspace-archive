"""
Dynamic User Input HITL Usage Examples

Demonstrates how to use UserControlFlowTools for dynamic user input.
The agent dynamically decides which fields it needs from the user by calling
the get_user_input tool. The framework pauses so the user can fill in values.

Unlike static @tool(requires_user_input=True), dynamic user input lets the
agent construct the field list at runtime based on conversation context.

Note: HITL continuation (continue_run_async) only supports direct call mode.
Streaming mode is not supported for continuation.
"""

import pytest
import asyncio
import os
from typing import Dict, List, Any
from upsonic import Agent, Task
from upsonic.tools import tool
from upsonic.tools.user_input import UserControlFlowTools
from upsonic.db.database import SqliteDatabase

pytestmark = pytest.mark.timeout(300)


def cleanup_db() -> None:
    """Clean up test database files."""
    if os.path.exists("dynamic_input.db"):
        os.remove("dynamic_input.db")


# ============================================================================
# REGULAR TOOLS (no HITL flags — the agent uses UserControlFlowTools to ask)
# ============================================================================

@tool
def send_email(subject: str, body: str, to_address: str) -> str:
    """
    Send an email to the given address.

    Args:
        subject: Email subject
        body: Email body content
        to_address: Recipient email address

    Returns:
        Confirmation message
    """
    print(f"send_email called with subject '{subject}', body '{body}', to_address '{to_address}'")
    return f"Email sent to {to_address} with subject '{subject}' and body '{body}'"


@tool
def get_emails(date_from: str, date_to: str) -> str:
    """
    Get all emails between the given dates.

    Args:
        date_from: Start date
        date_to: End date

    Returns:
        List of emails
    """
    print(f"get_emails called with date_from '{date_from}', date_to '{date_to}'")
    return str([
        {"subject": "Hello", "body": "Hello, world!", "to_address": "test@test.com", "date": date_from},
        {"subject": "Weekly update", "body": "Status update for this week", "to_address": "team@test.com", "date": date_to},
    ])


@tool
def create_document(title: str, content: str, author: str) -> str:
    """
    Create a document.

    Args:
        title: Document title
        content: Document content
        author: Document author

    Returns:
        Document creation confirmation
    """
    print(f"create_document called with title '{title}', content '{content}', author '{author}'")
    return f"Document '{title}' by {author} created successfully"


# ============================================================================
# HELPERS
# ============================================================================

_DYNAMIC_INPUT_VALUES: Dict[str, str] = {
    "to_address": "dynamic@example.com",
    "subject": "Dynamic Subject",
    "body": "Dynamic body content",
    "recipient": "recipient@example.com",
    "email_address": "dynamic@example.com",
    "author": "Test Author",
    "title": "Test Title",
}


def _fill_user_input(requirement) -> None:
    """Fill all user input fields on a requirement with predefined values."""
    if not requirement.user_input_schema:
        return
    for field_dict in requirement.user_input_schema:
        if isinstance(field_dict, dict) and field_dict.get("value") is None:
            name = field_dict["name"]
            field_dict["value"] = _DYNAMIC_INPUT_VALUES.get(name, f"test_{name}")
    requirement.tool_execution.answered = True


# ============================================================================
# HITL HANDLER
# ============================================================================

def hitl_handler(requirement) -> None:
    """
    Unified HITL handler that fills dynamic user input fields automatically.
    """
    if requirement.needs_user_input:
        _fill_user_input(requirement)


# ============================================================================
# VARIANT 1A: Direct Call with run_id - Same Agent
# ============================================================================

async def dynamic_input_with_run_id_same_agent():
    """
    Dynamic user input using run_id and same agent instance.

    The agent uses UserControlFlowTools to dynamically ask for missing info.
    Uses a while-loop because the agent may request multiple rounds of input.
    """
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent")
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)

    while output.is_paused and output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)
        output = await agent.continue_run_async(run_id=output.run_id, return_output=True)

    return output


# ============================================================================
# VARIANT 1B: Direct Call with task - Same Agent
# ============================================================================

async def dynamic_input_with_task_same_agent():
    """
    Dynamic user input using task and same agent instance.
    Uses a while-loop because the agent may request multiple rounds of input.
    """
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent")
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)

    while output.is_paused and output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)
        output = await agent.continue_run_async(task=task, return_output=True)

    return output


# ============================================================================
# VARIANT 2A: Direct Call with task - New Agent (Cross-process)
# ============================================================================

async def dynamic_input_with_task_new_agent():
    """
    Dynamic user input using a new agent instance and task parameter.
    Uses a while-loop because the agent may request multiple rounds of input.
    """
    cleanup_db()
    db = SqliteDatabase(db_file="dynamic_input.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent", db=db)
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)

    while output.is_paused and output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)
        new_agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent", db=db)
        output = await new_agent.continue_run_async(
            task=task,
            requirements=output.requirements,
            return_output=True
        )

    return output


# ============================================================================
# VARIANT 2B: Direct Call with run_id - New Agent (Cross-process)
# ============================================================================

async def dynamic_input_with_run_id_new_agent():
    """
    Dynamic user input using a new agent instance and run_id.
    Uses a while-loop because the agent may request multiple rounds of input.
    """
    cleanup_db()
    db = SqliteDatabase(db_file="dynamic_input.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent", db=db)
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)
    run_id = output.run_id

    while output.is_paused and output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)
        new_agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent", db=db)
        output = await new_agent.continue_run_async(
            run_id=run_id,
            requirements=output.requirements,
            return_output=True
        )

    return output


# ============================================================================
# VARIANT 3A: Using hitl_handler with task
# ============================================================================

async def dynamic_input_with_hitl_handler_task():
    """
    Dynamic user input with hitl_handler and task parameter.
    The handler auto-fills any dynamically requested fields.
    """
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent")
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)

    if output.is_paused:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)

        result = await agent.continue_run_async(
            task=task,
            return_output=True,
            hitl_handler=hitl_handler,
        )
    else:
        result = output

    return result


# ============================================================================
# VARIANT 3B: Using hitl_handler with run_id
# ============================================================================

async def dynamic_input_with_hitl_handler_run_id():
    """
    Dynamic user input with hitl_handler and run_id.
    """
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent")
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)

    if output.is_paused:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)

        result = await agent.continue_run_async(
            run_id=output.run_id,
            return_output=True,
            hitl_handler=hitl_handler,
        )
    else:
        result = output

    return result


# ============================================================================
# VARIANT 4A: While-loop for multi-round dynamic input with task
# ============================================================================

async def dynamic_input_loop_task():
    """
    Use a while-loop to handle multi-round dynamic input with task.

    The agent may request user input multiple times across rounds.
    """
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent")
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)

    while output.is_paused and output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)

        output = await agent.continue_run_async(task=task, return_output=True)

    return output


# ============================================================================
# VARIANT 4B: While-loop for multi-round dynamic input with run_id
# ============================================================================

async def dynamic_input_loop_run_id():
    """
    Use a while-loop to handle multi-round dynamic input with run_id.
    """
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent")
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)

    while output.is_paused and output.active_requirements:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)

        output = await agent.continue_run_async(
            run_id=output.run_id,
            return_output=True
        )

    return output


# ============================================================================
# VARIANT 4C: hitl_handler for multi-round dynamic input with task
# ============================================================================

async def dynamic_input_handler_task():
    """
    Use hitl_handler for auto-handling multi-round dynamic input with task.
    """
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent")
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)

    if output.is_paused:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)

        result = await agent.continue_run_async(
            task=task,
            return_output=True,
            hitl_handler=hitl_handler,
        )
    else:
        result = output

    return result


# ============================================================================
# VARIANT 4D: hitl_handler for multi-round dynamic input with run_id
# ============================================================================

async def dynamic_input_handler_run_id():
    """
    Use hitl_handler for auto-handling multi-round dynamic input with run_id.
    """
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent")
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)

    if output.is_paused:
        for requirement in output.active_requirements:
            if requirement.needs_user_input:
                _fill_user_input(requirement)

        result = await agent.continue_run_async(
            run_id=output.run_id,
            return_output=True,
            hitl_handler=hitl_handler,
        )
    else:
        result = output

    return result


# ============================================================================
# VARIANT 5A: Cross-process Dynamic User Input with task
# ============================================================================

async def dynamic_input_cross_process_task():
    """
    Cross-process dynamic user input handling using task parameter.

    1. Process A: do_async pauses when agent requests user input
    2. User fills the dynamically requested fields
    3. Process B: new agent continues with task + resolved requirements
    """
    cleanup_db()

    db = SqliteDatabase(db_file="dynamic_input.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent", db=db)
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)
    run_id = output.run_id

    if output.is_paused and output.active_requirements:
        print(f"Run {run_id} paused for dynamic user input:")
        for req in output.active_requirements:
            if req.user_input_schema:
                for field_dict in req.user_input_schema:
                    print(f"  Field: {field_dict.get('name')} (type={field_dict.get('field_type', 'str')})")

        for req in output.active_requirements:
            if req.needs_user_input:
                _fill_user_input(req)

        new_db = SqliteDatabase(db_file="dynamic_input.db", session_id="session_1", user_id="user_1")
        new_agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent", db=new_db)
        result = await new_agent.continue_run_async(
            task=task,
            requirements=output.requirements,
            return_output=True
        )
        print(f"Final result: {result.output}")
    else:
        result = output

    return result


# ============================================================================
# VARIANT 5B: Cross-process Dynamic User Input with run_id
# ============================================================================

async def dynamic_input_cross_process_run_id():
    """
    Cross-process dynamic user input handling using run_id.

    1. Process A: do_async pauses when agent requests user input
    2. User fills the dynamically requested fields
    3. Process B: new agent loads from storage and continues
    """
    cleanup_db()

    db = SqliteDatabase(db_file="dynamic_input.db", session_id="session_1", user_id="user_1")
    agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent", db=db)
    task = Task(
        description="Send an email with the body 'What is the weather in Tokyo?'",
        tools=[send_email, UserControlFlowTools()]
    )

    output = await agent.print_do_async(task, return_output=True)
    run_id = output.run_id

    if output.is_paused and output.active_requirements:
        print(f"Run {run_id} paused for dynamic user input:")
        for req in output.active_requirements:
            if req.user_input_schema:
                for field_dict in req.user_input_schema:
                    print(f"  Field: {field_dict.get('name')} (type={field_dict.get('field_type', 'str')})")

        for req in output.active_requirements:
            if req.needs_user_input:
                _fill_user_input(req)

        new_db = SqliteDatabase(db_file="dynamic_input.db", session_id="session_1", user_id="user_1")
        new_agent = Agent("openai/gpt-4o-mini", name="dynamic_input_agent", db=new_db)
        result = await new_agent.continue_run_async(
            run_id=run_id,
            requirements=output.requirements,
            return_output=True
        )
        print(f"Final result: {result.output}")
    else:
        result = output

    return result


# ============================================================================
# PYTEST TESTS
# ============================================================================

@pytest.mark.asyncio
async def test_dynamic_input_with_run_id_same_agent():
    """Test: Dynamic input with run_id - Same Agent"""
    result = await dynamic_input_with_run_id_same_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_with_task_same_agent():
    """Test: Dynamic input with task - Same Agent"""
    result = await dynamic_input_with_task_same_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_with_task_new_agent():
    """Test: Dynamic input with task - New Agent (Cross-process)"""
    result = await dynamic_input_with_task_new_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_with_run_id_new_agent():
    """Test: Dynamic input with run_id - New Agent (Cross-process)"""
    result = await dynamic_input_with_run_id_new_agent()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_with_hitl_handler_task():
    """Test: hitl_handler with task"""
    result = await dynamic_input_with_hitl_handler_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_with_hitl_handler_run_id():
    """Test: hitl_handler with run_id"""
    result = await dynamic_input_with_hitl_handler_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_loop_task():
    """Test: While-loop with task"""
    result = await dynamic_input_loop_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_loop_run_id():
    """Test: While-loop with run_id"""
    result = await dynamic_input_loop_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_handler_task():
    """Test: hitl_handler multi-round with task"""
    result = await dynamic_input_handler_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_handler_run_id():
    """Test: hitl_handler multi-round with run_id"""
    result = await dynamic_input_handler_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_cross_process_task():
    """Test: Cross-process Dynamic Input (task)"""
    result = await dynamic_input_cross_process_task()
    assert result.is_complete, f"Expected complete, got {result.status}"


@pytest.mark.asyncio
async def test_dynamic_input_cross_process_run_id():
    """Test: Cross-process Dynamic Input (run_id)"""
    result = await dynamic_input_cross_process_run_id()
    assert result.is_complete, f"Expected complete, got {result.status}"


# ============================================================================
# TEST RUNNER (for manual execution)
# ============================================================================

async def run_all_tests():
    """Run all dynamic user input test variants."""

    print("\n" + "=" * 80)
    print("TEST 1: Dynamic input with run_id - Same Agent")
    print("=" * 80)
    result = await dynamic_input_with_run_id_same_agent()
    assert result.is_complete, f"TEST 1 FAILED: Expected complete, got {result.status}"
    print("TEST 1 PASSED")

    print("\n" + "=" * 80)
    print("TEST 2: Dynamic input with task - Same Agent")
    print("=" * 80)
    result = await dynamic_input_with_task_same_agent()
    assert result.is_complete, f"TEST 2 FAILED: Expected complete, got {result.status}"
    print("TEST 2 PASSED")

    print("\n" + "=" * 80)
    print("TEST 3: Dynamic input with task - New Agent (Cross-process)")
    print("=" * 80)
    result = await dynamic_input_with_task_new_agent()
    assert result.is_complete, f"TEST 3 FAILED: Expected complete, got {result.status}"
    print("TEST 3 PASSED")

    print("\n" + "=" * 80)
    print("TEST 4: Dynamic input with run_id - New Agent (Cross-process)")
    print("=" * 80)
    result = await dynamic_input_with_run_id_new_agent()
    assert result.is_complete, f"TEST 4 FAILED: Expected complete, got {result.status}"
    print("TEST 4 PASSED")

    print("\n" + "=" * 80)
    print("TEST 5: hitl_handler with task")
    print("=" * 80)
    result = await dynamic_input_with_hitl_handler_task()
    assert result.is_complete, f"TEST 5 FAILED: Expected complete, got {result.status}"
    print("TEST 5 PASSED")

    print("\n" + "=" * 80)
    print("TEST 6: hitl_handler with run_id")
    print("=" * 80)
    result = await dynamic_input_with_hitl_handler_run_id()
    assert result.is_complete, f"TEST 6 FAILED: Expected complete, got {result.status}"
    print("TEST 6 PASSED")

    print("\n" + "=" * 80)
    print("TEST 7: While-loop with task")
    print("=" * 80)
    result = await dynamic_input_loop_task()
    assert result.is_complete, f"TEST 7 FAILED: Expected complete, got {result.status}"
    print("TEST 7 PASSED")

    print("\n" + "=" * 80)
    print("TEST 8: While-loop with run_id")
    print("=" * 80)
    result = await dynamic_input_loop_run_id()
    assert result.is_complete, f"TEST 8 FAILED: Expected complete, got {result.status}"
    print("TEST 8 PASSED")

    print("\n" + "=" * 80)
    print("TEST 9: hitl_handler multi-round with task")
    print("=" * 80)
    result = await dynamic_input_handler_task()
    assert result.is_complete, f"TEST 9 FAILED: Expected complete, got {result.status}"
    print("TEST 9 PASSED")

    print("\n" + "=" * 80)
    print("TEST 10: hitl_handler multi-round with run_id")
    print("=" * 80)
    result = await dynamic_input_handler_run_id()
    assert result.is_complete, f"TEST 10 FAILED: Expected complete, got {result.status}"
    print("TEST 10 PASSED")

    print("\n" + "=" * 80)
    print("TEST 11: Cross-process Dynamic Input (task)")
    print("=" * 80)
    result = await dynamic_input_cross_process_task()
    assert result.is_complete, f"TEST 11 FAILED: Expected complete, got {result.status}"
    print("TEST 11 PASSED")

    print("\n" + "=" * 80)
    print("TEST 12: Cross-process Dynamic Input (run_id)")
    print("=" * 80)
    result = await dynamic_input_cross_process_run_id()
    assert result.is_complete, f"TEST 12 FAILED: Expected complete, got {result.status}"
    print("TEST 12 PASSED")

    cleanup_db()

    print("\n" + "=" * 80)
    print("ALL DYNAMIC USER INPUT TESTS PASSED!")
    print("=" * 80)


if __name__ == "__main__":
    asyncio.run(run_all_tests())
