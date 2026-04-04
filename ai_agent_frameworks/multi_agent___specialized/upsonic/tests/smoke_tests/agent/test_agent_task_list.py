"""
Smoke tests for Agent task-list input support.

Validates end-to-end that Agent.do / Agent.do_async / Agent.print_do /
Agent.print_do_async correctly handle list[str], list[Task], single str,
and single Task inputs with real LLM API calls.

Run with: python3 -m pytest tests/smoke_tests/agent/test_agent_task_list.py -v -s
"""

from typing import Any, List

import pytest

from upsonic import Agent, Task
from upsonic.run.agent.output import AgentRunOutput


# ---------------------------------------------------------------------------
# do — synchronous, list of strings
# ---------------------------------------------------------------------------

def test_do_list_of_strings() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    results: List[str] = agent.do(["What is 2+2?", "What is 3+3?"])

    assert isinstance(results, list)
    assert len(results) == 2
    for r in results:
        assert isinstance(r, str)
        assert len(r) > 0


# ---------------------------------------------------------------------------
# do — synchronous, list of Task objects
# ---------------------------------------------------------------------------

def test_do_list_of_tasks() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    tasks: List[Task] = [Task("What is the capital of France?"), Task("What is the capital of Germany?")]
    results: List[str] = agent.do(tasks)

    assert isinstance(results, list)
    assert len(results) == 2
    assert "paris" in results[0].lower()
    assert "berlin" in results[1].lower()


# ---------------------------------------------------------------------------
# do — synchronous, list with return_output=True
# ---------------------------------------------------------------------------

def test_do_list_return_output() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    results: List[AgentRunOutput] = agent.do(
        ["Say hello", "Say goodbye"], return_output=True,
    )

    assert isinstance(results, list)
    assert len(results) == 2
    for item in results:
        assert isinstance(item, AgentRunOutput)
        assert item.output is not None
        assert isinstance(item.output, str)
        assert len(item.output) > 0


# ---------------------------------------------------------------------------
# do — single-element list returns scalar
# ---------------------------------------------------------------------------

def test_do_single_element_list_returns_scalar() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    result: str = agent.do(["What is 5+5?"])

    assert isinstance(result, str)
    assert not isinstance(result, list)
    assert len(result) > 0


# ---------------------------------------------------------------------------
# do — empty list returns empty list
# ---------------------------------------------------------------------------

def test_do_empty_list() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    result: List[Any] = agent.do([])

    assert isinstance(result, list)
    assert len(result) == 0


# ---------------------------------------------------------------------------
# do — mixed list (str + Task)
# ---------------------------------------------------------------------------

def test_do_mixed_list() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    results: List[str] = agent.do(["What is 1+1?", Task("What is 2+2?")])

    assert isinstance(results, list)
    assert len(results) == 2
    for r in results:
        assert isinstance(r, str)
        assert len(r) > 0


# ---------------------------------------------------------------------------
# do_async — list of strings
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_do_async_list_of_strings() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    results: List[str] = await agent.do_async(["What is 10+10?", "What is 20+20?"])

    assert isinstance(results, list)
    assert len(results) == 2
    for r in results:
        assert isinstance(r, str)
        assert len(r) > 0


# ---------------------------------------------------------------------------
# do_async — list with return_output=True
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_do_async_list_return_output() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    results: List[AgentRunOutput] = await agent.do_async(
        [Task("Say yes"), Task("Say no")], return_output=True,
    )

    assert isinstance(results, list)
    assert len(results) == 2
    for item in results:
        assert isinstance(item, AgentRunOutput)
        assert item.output is not None


# ---------------------------------------------------------------------------
# do_async — single-element list returns scalar
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_do_async_single_element_list() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    result: str = await agent.do_async(["What is 7+7?"])

    assert isinstance(result, str)
    assert not isinstance(result, list)
    assert len(result) > 0


# ---------------------------------------------------------------------------
# do_async — empty list
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_do_async_empty_list() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    result: List[Any] = await agent.do_async([])

    assert isinstance(result, list)
    assert len(result) == 0


# ---------------------------------------------------------------------------
# print_do — list of strings
# ---------------------------------------------------------------------------

def test_print_do_list_of_strings() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    results: List[str] = agent.print_do(["Say hi", "Say bye"])

    assert isinstance(results, list)
    assert len(results) == 2
    for r in results:
        assert isinstance(r, str)
        assert len(r) > 0


# ---------------------------------------------------------------------------
# print_do_async — list of strings
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_print_do_async_list_of_strings() -> None:
    agent: Agent = Agent(model="anthropic/claude-sonnet-4-5", name="ListTester")
    results: List[str] = await agent.print_do_async(["Say hi", "Say bye"])

    assert isinstance(results, list)
    assert len(results) == 2
    for r in results:
        assert isinstance(r, str)
        assert len(r) > 0
