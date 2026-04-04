"""
Smoke tests for timeout and partial_on_timeout support in Agent.do() / do_async().

These tests use real API calls and require ANTHROPIC_API_KEY to be set.
"""

import pytest

from upsonic import Agent, Task
from upsonic.exceptions import ExecutionTimeoutError
from upsonic.run.agent.output import AgentRunOutput

pytestmark = pytest.mark.timeout(120)

MODEL: str = "anthropic/claude-sonnet-4-5"


# ---------------------------------------------------------------------------
# Parameter validation (real agent, no API call needed)
# ---------------------------------------------------------------------------

def test_partial_on_timeout_without_timeout_raises() -> None:
    """partial_on_timeout=True without timeout should raise ValueError."""
    agent: Agent = Agent(model=MODEL, name="ValidationAgent")
    task: Task = Task(description="Say hello")

    with pytest.raises(ValueError, match="partial_on_timeout=True requires timeout"):
        agent.do(task, partial_on_timeout=True)


def test_negative_timeout_raises() -> None:
    """Negative timeout should raise ValueError."""
    agent: Agent = Agent(model=MODEL, name="ValidationAgent")
    task: Task = Task(description="Say hello")

    with pytest.raises(ValueError, match="timeout must be a positive number"):
        agent.do(task, timeout=-1)


def test_zero_timeout_raises() -> None:
    """Zero timeout should raise ValueError."""
    agent: Agent = Agent(model=MODEL, name="ValidationAgent")
    task: Task = Task(description="Say hello")

    with pytest.raises(ValueError, match="timeout must be a positive number"):
        agent.do(task, timeout=0)


@pytest.mark.asyncio
async def test_partial_on_timeout_without_timeout_raises_async() -> None:
    """partial_on_timeout=True without timeout should raise ValueError (async)."""
    agent: Agent = Agent(model=MODEL, name="ValidationAgent")
    task: Task = Task(description="Say hello")

    with pytest.raises(ValueError, match="partial_on_timeout=True requires timeout"):
        await agent.do_async(task, partial_on_timeout=True)


@pytest.mark.asyncio
async def test_negative_timeout_raises_async() -> None:
    """Negative timeout should raise ValueError (async)."""
    agent: Agent = Agent(model=MODEL, name="ValidationAgent")
    task: Task = Task(description="Say hello")

    with pytest.raises(ValueError, match="timeout must be a positive number"):
        await agent.do_async(task, timeout=-1)


# ---------------------------------------------------------------------------
# Timeout without partial (raises ExecutionTimeoutError) — real API call
# ---------------------------------------------------------------------------

def test_timeout_raises_execution_timeout_error() -> None:
    """A very short timeout on a real request should raise ExecutionTimeoutError."""
    from upsonic.exceptions import UpsonicError

    agent: Agent = Agent(model=MODEL, name="TimeoutAgent")
    task: Task = Task(
        description="Write a very long and detailed essay about the entire history of computing."
    )

    with pytest.raises(ExecutionTimeoutError) as exc_info:
        agent.do(task, timeout=0.01)

    err: ExecutionTimeoutError = exc_info.value
    assert isinstance(err, UpsonicError), "Should be a subclass of UpsonicError"
    assert isinstance(err, ExecutionTimeoutError), "Should be ExecutionTimeoutError"
    assert err.timeout == 0.01, "timeout attribute should match the requested value"
    assert "timed out" in str(err), "Error message should contain 'timed out'"
    assert "0.01" in str(err), "Error message should contain the timeout value"


@pytest.mark.asyncio
async def test_timeout_raises_execution_timeout_error_async() -> None:
    """A very short timeout on a real request should raise ExecutionTimeoutError (async)."""
    from upsonic.exceptions import UpsonicError

    agent: Agent = Agent(model=MODEL, name="TimeoutAgent")
    task: Task = Task(
        description="Write a very long and detailed essay about the entire history of computing."
    )

    with pytest.raises(ExecutionTimeoutError) as exc_info:
        await agent.do_async(task, timeout=0.01)

    err: ExecutionTimeoutError = exc_info.value
    assert isinstance(err, UpsonicError), "Should be a subclass of UpsonicError"
    assert isinstance(err, ExecutionTimeoutError), "Should be ExecutionTimeoutError"
    assert err.timeout == 0.01, "timeout attribute should match the requested value"
    assert "timed out" in str(err), "Error message should contain 'timed out'"
    assert "0.01" in str(err), "Error message should contain the timeout value"


# ---------------------------------------------------------------------------
# partial_on_timeout=True — real API call with streaming capture
# ---------------------------------------------------------------------------

def test_partial_result_returned_on_timeout() -> None:
    """With partial_on_timeout=True, a short timeout returns partial text or None if nothing streamed yet."""
    agent: Agent = Agent(model=MODEL, name="PartialAgent")
    task: Task = Task(
        description=(
            "Write a very long, detailed, multi-paragraph essay about the complete history "
            "of artificial intelligence from the 1950s to today, covering every major milestone."
        )
    )

    result = agent.do(task, timeout=3, partial_on_timeout=True)

    assert result is None or isinstance(result, str), "Partial result should be None or string"


@pytest.mark.asyncio
async def test_partial_result_returned_on_timeout_async() -> None:
    """With partial_on_timeout=True, a short timeout returns partial text or None if nothing streamed yet (async)."""
    agent: Agent = Agent(model=MODEL, name="PartialAgent")
    task: Task = Task(
        description=(
            "Write a very long, detailed, multi-paragraph essay about the complete history "
            "of artificial intelligence from the 1950s to today, covering every major milestone."
        )
    )

    result = await agent.do_async(task, timeout=3, partial_on_timeout=True)

    assert result is None or isinstance(result, str), "Partial result should be None or string"


def test_partial_result_with_return_output() -> None:
    """With return_output=True, AgentRunOutput should contain timeout metadata; output may be None if no text yet."""
    agent: Agent = Agent(model=MODEL, name="PartialOutputAgent")
    task: Task = Task(
        description=(
            "Write a very long, detailed, multi-paragraph essay about the complete history "
            "of artificial intelligence from the 1950s to today, covering every major milestone."
        )
    )

    result = agent.do(task, timeout=3, partial_on_timeout=True, return_output=True)

    assert isinstance(result, AgentRunOutput), "Should return AgentRunOutput when return_output=True"
    assert result.metadata is not None, "Metadata must be populated on timeout"
    assert result.metadata.get("timeout") is True, "metadata['timeout'] must be True"
    assert result.metadata.get("timeout_seconds") == 3, "metadata['timeout_seconds'] must match input"
    assert isinstance(result.metadata.get("partial_result"), bool), "metadata['partial_result'] must be a bool"
    if result.metadata["partial_result"]:
        assert result.output is not None and isinstance(result.output, str) and len(result.output) > 0
    else:
        assert result.output is None or result.output == ""


@pytest.mark.asyncio
async def test_partial_result_with_return_output_async() -> None:
    """With return_output=True, AgentRunOutput should contain timeout metadata (async); output may be None if no text yet."""
    agent: Agent = Agent(model=MODEL, name="PartialOutputAgent")
    task: Task = Task(
        description=(
            "Write a very long, detailed, multi-paragraph essay about the complete history "
            "of artificial intelligence from the 1950s to today, covering every major milestone."
        )
    )

    result = await agent.do_async(task, timeout=3, partial_on_timeout=True, return_output=True)

    assert isinstance(result, AgentRunOutput), "Should return AgentRunOutput when return_output=True"
    assert result.metadata is not None, "Metadata must be populated on timeout"
    assert result.metadata.get("timeout") is True, "metadata['timeout'] must be True"
    assert result.metadata.get("timeout_seconds") == 3, "metadata['timeout_seconds'] must match input"
    assert isinstance(result.metadata.get("partial_result"), bool), "metadata['partial_result'] must be a bool"
    if result.metadata["partial_result"]:
        assert result.output is not None and isinstance(result.output, str) and len(result.output) > 0
    else:
        assert result.output is None or result.output == ""


# ---------------------------------------------------------------------------
# No timeout — backward compatibility with real API call
# ---------------------------------------------------------------------------

def test_do_without_timeout_completes_normally() -> None:
    """do() without timeout parameters should complete normally with a real response."""
    agent: Agent = Agent(model=MODEL, name="NormalAgent")
    task: Task = Task(description="What is 2 + 2? Reply with just the number.")

    result: str = agent.do(task)

    assert result is not None, "Result should not be None"
    assert isinstance(result, str), "Result should be a string"
    assert len(result) > 0, "Result should not be empty"
    assert "4" in result, "Result should contain the answer '4'"
    assert not isinstance(result, AgentRunOutput), "Without return_output, should return raw string"


def test_do_without_timeout_return_output() -> None:
    """do() without timeout but with return_output=True should return AgentRunOutput."""
    agent: Agent = Agent(model=MODEL, name="NormalAgent")
    task: Task = Task(description="What is 2 + 2? Reply with just the number.")

    result: AgentRunOutput = agent.do(task, return_output=True)

    assert isinstance(result, AgentRunOutput), "Should return AgentRunOutput"
    assert result.output is not None, "Output should be present"
    assert isinstance(result.output, str), "Output should be a string"
    assert "4" in result.output, "Output should contain the answer '4'"
    assert result.run_id is not None, "run_id should be populated"
    if result.metadata:
        assert result.metadata.get("timeout") is not True, "No timeout flag on normal run"


@pytest.mark.asyncio
async def test_do_async_without_timeout_completes_normally() -> None:
    """do_async() without timeout parameters should complete normally with a real response."""
    agent: Agent = Agent(model=MODEL, name="NormalAgent")
    task: Task = Task(description="What is 2 + 2? Reply with just the number.")

    result: str = await agent.do_async(task)

    assert result is not None, "Result should not be None"
    assert isinstance(result, str), "Result should be a string"
    assert len(result) > 0, "Result should not be empty"
    assert "4" in result, "Result should contain the answer '4'"
    assert not isinstance(result, AgentRunOutput), "Without return_output, should return raw string"


# ---------------------------------------------------------------------------
# Normal completion within timeout (task finishes before timeout)
# ---------------------------------------------------------------------------

def test_completion_within_timeout_returns_full_result() -> None:
    """If the task completes before the timeout, the full result is returned without error."""
    agent: Agent = Agent(model=MODEL, name="FastAgent")
    task: Task = Task(description="What is 2 + 2? Reply with just the number.")

    result: str = agent.do(task, timeout=60)

    assert result is not None, "Result should not be None on normal completion"
    assert isinstance(result, str), "Result should be a string"
    assert len(result) > 0, "Result should not be empty"
    assert "4" in result, "Result should contain the answer"


def test_completion_within_timeout_return_output_no_timeout_metadata() -> None:
    """Normal completion within timeout should NOT have timeout metadata flags."""
    agent: Agent = Agent(model=MODEL, name="FastAgent")
    task: Task = Task(description="What is 2 + 2? Reply with just the number.")

    result: AgentRunOutput = agent.do(task, timeout=60, return_output=True)

    assert isinstance(result, AgentRunOutput), "Should return AgentRunOutput"
    assert result.output is not None, "Output should be present"
    assert isinstance(result.output, str), "Output should be a string"
    assert "4" in result.output, "Output should contain the answer"
    if result.metadata:
        assert result.metadata.get("timeout") is not True, "timeout flag should not be True on normal completion"
        assert result.metadata.get("partial_result") is not True, "partial_result should not be True on normal completion"


def test_completion_within_timeout_with_partial_flag() -> None:
    """If task completes before timeout, partial_on_timeout=True still returns full result."""
    agent: Agent = Agent(model=MODEL, name="FastAgent")
    task: Task = Task(description="What is 2 + 2? Reply with just the number.")

    result: str = agent.do(task, timeout=60, partial_on_timeout=True)

    assert result is not None, "Result should not be None on normal completion"
    assert isinstance(result, str), "Result should be a string"
    assert len(result) > 0, "Result should not be empty"
    assert "4" in result, "Result should contain the answer"


@pytest.mark.asyncio
async def test_completion_within_timeout_with_partial_flag_async() -> None:
    """If task completes before timeout, partial_on_timeout=True still returns full result (async)."""
    agent: Agent = Agent(model=MODEL, name="FastAgent")
    task: Task = Task(description="What is 2 + 2? Reply with just the number.")

    result: str = await agent.do_async(task, timeout=60, partial_on_timeout=True)

    assert result is not None, "Result should not be None on normal completion"
    assert isinstance(result, str), "Result should be a string"
    assert len(result) > 0, "Result should not be empty"
    assert "4" in result, "Result should contain the answer"


# ---------------------------------------------------------------------------
# ExecutionTimeoutError exception contract
# ---------------------------------------------------------------------------

def test_execution_timeout_error_attributes() -> None:
    """ExecutionTimeoutError should carry timeout value and proper message."""
    err: ExecutionTimeoutError = ExecutionTimeoutError("test timeout", timeout=30.0)

    assert err.timeout == 30.0
    assert "test timeout" in str(err)


def test_execution_timeout_error_defaults() -> None:
    """ExecutionTimeoutError with defaults should have timeout=0 and sensible message."""
    err: ExecutionTimeoutError = ExecutionTimeoutError()

    assert err.timeout == 0
    assert "timed out" in str(err)


def test_execution_timeout_error_is_upsonic_error() -> None:
    """ExecutionTimeoutError should be a subclass of UpsonicError."""
    from upsonic.exceptions import UpsonicError

    err: ExecutionTimeoutError = ExecutionTimeoutError()

    assert isinstance(err, UpsonicError)
