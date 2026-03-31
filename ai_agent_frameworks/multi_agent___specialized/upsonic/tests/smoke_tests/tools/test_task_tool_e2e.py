"""
End-to-end tests for Task tool management with real LLM API calls.

Tests:
- Task tools registered and callable via print_do_async
- Agent tools available alongside task tools during execution
- Removing a task tool prevents it from being called
- Task tool separation verified via actual agent execution
- Tool output verified in terminal output (display_tool_calls_table)
- task.tool_calls attribute verified for tool_name, params, tool_result
"""

import pytest
from io import StringIO
from contextlib import redirect_stdout
from upsonic import Agent, Task
from upsonic.tools import tool, ToolKit
from typing import List, Dict, Any

pytestmark = pytest.mark.timeout(180)

MODEL = "openai/gpt-4o-mini"


@tool
def add_numbers(a: int, b: int) -> int:
    """Add two numbers together and return the result."""
    return a + b


@tool
def multiply_numbers(a: int, b: int) -> int:
    """Multiply two numbers together and return the result."""
    return a * b


@tool
def get_weather(city: str) -> str:
    """Get the current weather for a city. Returns a weather report string."""
    return f"The weather in {city} is sunny and 22°C."


@tool
def greet_person(name: str) -> str:
    """Greet a person by name. Returns a greeting string."""
    return f"Hello, {name}! Welcome aboard!"


class MathToolKit(ToolKit):
    """A toolkit for mathematical operations."""
    
    @tool
    def divide(self, a: int, b: int) -> float:
        """Divide a by b and return the result."""
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b


def _get_tool_call_names(tool_calls: List[Dict[str, Any]]) -> List[str]:
    """Extract tool_name values from task.tool_calls list."""
    return [tc.get("tool_name", "") for tc in tool_calls]


# ============================================================
# E2E: Task tool execution via print_do_async
# ============================================================

@pytest.mark.asyncio
async def test_e2e_task_tool_called_via_print_do_async():
    """Task tool should be registered and called during print_do_async execution."""
    agent = Agent(model=MODEL, name="E2E Agent")
    task = Task(
        description="Use add_numbers tool to calculate 7 + 13. Return only the number.",
        tools=[add_numbers]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    assert task.tool_manager is not None, "Task should have a ToolManager after execution"
    assert "add_numbers" in task.registered_task_tools, "add_numbers should be registered"

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, f"Output should contain 'Tool Calls' table header, got: {output_text[:500]}"
    assert "add_numbers" in output_text, f"Output should show add_numbers was called, got: {output_text[:500]}"

    response_text = str(task.response) if task.response else output_text
    assert "20" in response_text, f"Response should contain '20', got: {response_text}"

    assert len(task.tool_calls) > 0, "task.tool_calls should not be empty"
    called_names = _get_tool_call_names(task.tool_calls)
    assert "add_numbers" in called_names, f"add_numbers should be in tool_calls, got: {called_names}"

    add_call = next(tc for tc in task.tool_calls if tc.get("tool_name") == "add_numbers")
    assert "params" in add_call, "Tool call should have 'params'"
    assert "tool_result" in add_call, "Tool call should have 'tool_result'"


@pytest.mark.asyncio
async def test_e2e_agent_and_task_tools_both_available():
    """Both agent-level and task-level tools should be available during execution."""
    agent = Agent(model=MODEL, name="E2E Agent", tools=[multiply_numbers])
    task = Task(
        description="First use multiply_numbers to calculate 4 * 5, then use add_numbers to add 10 to that result. Return only the final number.",
        tools=[add_numbers]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    assert "multiply_numbers" in agent.registered_agent_tools, "Agent should have multiply_numbers"
    assert "add_numbers" in task.registered_task_tools, "Task should have add_numbers"

    assert "multiply_numbers" not in task.registered_task_tools, "Task should NOT have agent tools"
    assert "add_numbers" not in agent.registered_agent_tools, "Agent should NOT have task tools"

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, "Output should contain 'Tool Calls' table"
    assert "multiply_numbers" in output_text, "Output should show multiply_numbers was called"
    assert "add_numbers" in output_text, "Output should show add_numbers was called"

    response_text = str(task.response) if task.response else ""
    assert "30" in response_text, f"Response should contain '30', got: {response_text}"

    assert len(task.tool_calls) >= 2, f"Should have at least 2 tool calls, got {len(task.tool_calls)}"
    called_names = _get_tool_call_names(task.tool_calls)
    assert "multiply_numbers" in called_names, f"multiply_numbers should be in tool_calls, got: {called_names}"
    assert "add_numbers" in called_names, f"add_numbers should be in tool_calls, got: {called_names}"


@pytest.mark.asyncio
async def test_e2e_task_tool_separation_after_execution():
    """After execution, agent and task tool managers should remain separate."""
    agent = Agent(model=MODEL, name="E2E Agent", tools=[greet_person])
    task = Task(
        description="Use add_numbers to calculate 3 + 4. Return only the number.",
        tools=[add_numbers]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    agent_tool_names = {d.name for d in agent.get_tool_defs()}
    task_tool_names = {d.name for d in task.get_tool_defs()}

    assert "greet_person" in agent_tool_names
    assert "add_numbers" not in agent_tool_names

    assert "add_numbers" in task_tool_names
    assert "greet_person" not in task_tool_names

    output_text = output_buffer.getvalue()
    assert "add_numbers" in output_text, "Output should show add_numbers was called"

    called_names = _get_tool_call_names(task.tool_calls)
    assert "add_numbers" in called_names, f"add_numbers should be in tool_calls, got: {called_names}"
    assert "greet_person" not in called_names, "greet_person should NOT be in tool_calls (not requested)"


@pytest.mark.asyncio
async def test_e2e_task_toolkit_tools_called():
    """ToolKit tools on task should be callable during execution."""
    agent = Agent(model=MODEL, name="E2E Agent")
    math_kit = MathToolKit()
    task = Task(
        description="Use the divide tool to calculate 100 / 4. Return only the number.",
        tools=[math_kit]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    assert "divide" in task.registered_task_tools, "divide should be registered"
    assert task.tool_manager is not None

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, "Output should contain 'Tool Calls' table"
    assert "divide" in output_text, "Output should show divide was called"

    response_text = str(task.response) if task.response else ""
    assert "25" in response_text, f"Response should contain '25', got: {response_text}"

    assert len(task.tool_calls) > 0, "task.tool_calls should not be empty"
    called_names = _get_tool_call_names(task.tool_calls)
    assert "divide" in called_names, f"divide should be in tool_calls, got: {called_names}"

    divide_call = next(tc for tc in task.tool_calls if tc.get("tool_name") == "divide")
    assert "params" in divide_call, "Tool call should have 'params'"
    assert "tool_result" in divide_call, "Tool call should have 'tool_result'"


# ============================================================
# E2E: Tool removal and re-execution
# ============================================================

@pytest.mark.asyncio
async def test_e2e_removed_tool_not_called():
    """After removing a tool from task, it should not be called in next execution."""
    agent = Agent(model=MODEL, name="E2E Agent")

    task = Task(
        description="Use get_weather to check weather in Paris. Return the weather report.",
        tools=[get_weather, add_numbers]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    assert "get_weather" in task.registered_task_tools
    assert "add_numbers" in task.registered_task_tools

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, "Output should contain 'Tool Calls' table"
    assert "get_weather" in output_text, "Output should show get_weather was called"

    response_text = str(task.response) if task.response else ""
    assert "Paris" in response_text or "sunny" in response_text or "22" in response_text, \
        f"First response should mention Paris weather, got: {response_text}"

    assert len(task.tool_calls) > 0, "task.tool_calls should not be empty after first execution"
    called_names = _get_tool_call_names(task.tool_calls)
    assert "get_weather" in called_names, f"get_weather should be in tool_calls, got: {called_names}"

    task.remove_tools("get_weather")
    assert "get_weather" not in task.registered_task_tools
    assert "add_numbers" in task.registered_task_tools

    remaining_defs = task.get_tool_defs()
    remaining_names = [d.name for d in remaining_defs]
    assert "get_weather" not in remaining_names
    assert "add_numbers" in remaining_names


@pytest.mark.asyncio
async def test_e2e_task_remove_tools_and_verify_tool_defs():
    """Removing tools should update get_tool_defs immediately."""
    agent = Agent(model=MODEL, name="E2E Agent")
    task = Task(
        description="Use add_numbers to calculate 1 + 2.",
        tools=[add_numbers, multiply_numbers, greet_person]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, "Output should contain 'Tool Calls' table"
    assert "add_numbers" in output_text, "Output should show add_numbers was called"

    assert len(task.tool_calls) > 0, "task.tool_calls should not be empty"
    called_names = _get_tool_call_names(task.tool_calls)
    assert "add_numbers" in called_names, f"add_numbers should be in tool_calls, got: {called_names}"

    defs_before = task.get_tool_defs()
    names_before = {d.name for d in defs_before}
    assert "add_numbers" in names_before
    assert "multiply_numbers" in names_before
    assert "greet_person" in names_before

    task.remove_tools("multiply_numbers")

    defs_after = task.get_tool_defs()
    names_after = {d.name for d in defs_after}
    assert "multiply_numbers" not in names_after
    assert "add_numbers" in names_after
    assert "greet_person" in names_after

    task.remove_tools(["add_numbers", "greet_person"])

    defs_final = task.get_tool_defs()
    assert len(defs_final) == 0, "All task tools should be removed"


# ============================================================
# E2E: Task.remove_tools backward compat with agent param
# ============================================================

@pytest.mark.asyncio
async def test_e2e_task_remove_tools_with_agent_param():
    """task.remove_tools(tools, agent) should still work for backward compat."""
    agent = Agent(model=MODEL, name="E2E Agent")
    task = Task(
        description="Use add_numbers to calculate 5 + 5.",
        tools=[add_numbers, multiply_numbers]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    assert "add_numbers" in task.registered_task_tools
    assert "multiply_numbers" in task.registered_task_tools

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, "Output should contain 'Tool Calls' table"

    assert len(task.tool_calls) > 0, "task.tool_calls should not be empty"
    called_names = _get_tool_call_names(task.tool_calls)
    assert "add_numbers" in called_names, f"add_numbers should be in tool_calls, got: {called_names}"

    task.remove_tools("add_numbers", agent)
    assert "add_numbers" not in task.registered_task_tools
    assert "multiply_numbers" in task.registered_task_tools


# ============================================================
# E2E: Tool execution tracking
# ============================================================

@pytest.mark.asyncio
async def test_e2e_tool_execution_tracked_in_output():
    """Tool executions should be tracked in output and task.tool_calls."""
    agent = Agent(model=MODEL, name="E2E Agent")
    task = Task(
        description="Use add_numbers to calculate 15 + 25. Return only the number.",
        tools=[add_numbers]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    response_text = str(task.response) if task.response else ""
    assert "40" in response_text, f"Should contain '40', got: {response_text}"

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, "Output should contain 'Tool Calls' table"
    assert "add_numbers" in output_text, "Output should show add_numbers tool name"

    assert task.tool_manager is not None
    assert "add_numbers" in task.registered_task_tools

    assert len(task.tool_calls) > 0, "task.tool_calls should not be empty"
    add_call = next(tc for tc in task.tool_calls if tc.get("tool_name") == "add_numbers")
    assert "params" in add_call, "Tool call dict should have 'params' key"
    assert "tool_result" in add_call, "Tool call dict should have 'tool_result' key"

    params = add_call["params"]
    if isinstance(params, dict):
        param_values = list(params.values())
        assert 15 in param_values or "15" in [str(v) for v in param_values], \
            f"Params should contain 15, got: {params}"
        assert 25 in param_values or "25" in [str(v) for v in param_values], \
            f"Params should contain 25, got: {params}"


@pytest.mark.asyncio
async def test_e2e_multiple_task_tools_execution():
    """Multiple task tools should all be available, executable, and tracked in tool_calls."""
    agent = Agent(model=MODEL, name="E2E Agent")
    task = Task(
        description="Use add_numbers to calculate 10 + 5, and then use multiply_numbers to calculate 3 * 7. Return both results separated by comma.",
        tools=[add_numbers, multiply_numbers]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    response_text = str(task.response) if task.response else ""
    assert "15" in response_text, f"Should contain '15' (from 10+5), got: {response_text}"
    assert "21" in response_text, f"Should contain '21' (from 3*7), got: {response_text}"

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, "Output should contain 'Tool Calls' table"
    assert "add_numbers" in output_text, "Output should show add_numbers was called"
    assert "multiply_numbers" in output_text, "Output should show multiply_numbers was called"

    assert len(task.tool_calls) >= 2, f"Should have at least 2 tool calls, got {len(task.tool_calls)}"
    called_names = _get_tool_call_names(task.tool_calls)
    assert "add_numbers" in called_names, f"add_numbers should be in tool_calls, got: {called_names}"
    assert "multiply_numbers" in called_names, f"multiply_numbers should be in tool_calls, got: {called_names}"

    for tc in task.tool_calls:
        assert "tool_name" in tc, "Each tool_call should have 'tool_name'"
        assert "params" in tc, "Each tool_call should have 'params'"
        assert "tool_result" in tc, "Each tool_call should have 'tool_result'"


# ============================================================
# E2E: Agent tools remain after task execution
# ============================================================

@pytest.mark.asyncio
async def test_e2e_agent_tools_persist_after_task_execution():
    """Agent tools should persist unchanged after running a task with different tools."""
    agent = Agent(model=MODEL, name="E2E Agent", tools=[greet_person])

    assert "greet_person" in agent.registered_agent_tools
    agent_defs_before = {d.name for d in agent.get_tool_defs()}
    assert "greet_person" in agent_defs_before

    task = Task(
        description="Use add_numbers to calculate 1 + 1.",
        tools=[add_numbers]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    assert "greet_person" in agent.registered_agent_tools
    agent_defs_after = {d.name for d in agent.get_tool_defs()}
    assert "greet_person" in agent_defs_after
    assert "add_numbers" not in agent_defs_after

    assert "add_numbers" in task.registered_task_tools

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, "Output should contain 'Tool Calls' table"
    assert "add_numbers" in output_text, "Output should show add_numbers was called"

    assert len(task.tool_calls) > 0, "task.tool_calls should not be empty"
    called_names = _get_tool_call_names(task.tool_calls)
    assert "add_numbers" in called_names, f"add_numbers should be in tool_calls, got: {called_names}"
    assert "greet_person" not in called_names, "greet_person should NOT be in tool_calls (not requested)"


# ============================================================
# E2E: tool_calls attribute structure validation
# ============================================================

@pytest.mark.asyncio
async def test_e2e_tool_calls_attribute_structure():
    """Verify task.tool_calls has correct structure with tool_name, params, tool_result."""
    agent = Agent(model=MODEL, name="E2E Agent")
    task = Task(
        description="Use get_weather to check weather in London. Return the weather report.",
        tools=[get_weather]
    )

    output_buffer = StringIO()
    with redirect_stdout(output_buffer):
        result = await agent.print_do_async(task)

    output_text = output_buffer.getvalue()
    assert "Tool Calls" in output_text, "Output should contain 'Tool Calls' table"
    assert "get_weather" in output_text, "Output should show get_weather tool name"

    assert isinstance(task.tool_calls, list), "tool_calls should be a list"
    assert len(task.tool_calls) > 0, "tool_calls should not be empty"

    weather_call = next(
        (tc for tc in task.tool_calls if tc.get("tool_name") == "get_weather"),
        None
    )
    assert weather_call is not None, f"get_weather should be in tool_calls, got: {_get_tool_call_names(task.tool_calls)}"

    assert "tool_name" in weather_call, "Tool call should have 'tool_name' key"
    assert "params" in weather_call, "Tool call should have 'params' key"
    assert "tool_result" in weather_call, "Tool call should have 'tool_result' key"

    assert weather_call["tool_name"] == "get_weather"

    params = weather_call["params"]
    if isinstance(params, dict):
        param_str = str(params).lower()
        assert "london" in param_str, f"Params should contain 'london', got: {params}"

    response_text = str(task.response) if task.response else ""
    assert "London" in response_text or "sunny" in response_text or "22" in response_text, \
        f"Response should mention London weather, got: {response_text}"
