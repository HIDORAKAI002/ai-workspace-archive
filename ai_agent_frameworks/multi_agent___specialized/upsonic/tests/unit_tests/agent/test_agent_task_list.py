"""
Unit tests for Agent task-list handling.

Tests the _handle_task_list / _handle_task_list_async helper methods and
verifies that do / do_async correctly dispatch list inputs without making
real API calls.

Run with: python3 -m pytest tests/unit_tests/agent/test_agent_task_list.py -v
"""

import unittest
from typing import Any, List
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from upsonic import Agent, Task
from upsonic.run.agent.output import AgentRunOutput
from upsonic.models import ModelResponse, TextPart


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _make_mock_model() -> MagicMock:
    mock_model: MagicMock = MagicMock()
    mock_model.model_name = "test-model"
    mock_response: ModelResponse = ModelResponse(
        parts=[TextPart(content="mock answer")],
        model_name="test-model",
        timestamp="2024-01-01T00:00:00Z",
        usage=None,
        provider_name="test-provider",
        provider_response_id="test-id",
        provider_details={},
        finish_reason="stop",
    )
    mock_model.request = AsyncMock(return_value=mock_response)
    return mock_model


# ---------------------------------------------------------------------------
# _handle_task_list (synchronous)
# ---------------------------------------------------------------------------

class TestHandleTaskListSync(unittest.TestCase):
    """Unit tests for Agent._handle_task_list (synchronous helper)."""

    def setUp(self) -> None:
        self._infer_patcher: Any = patch("upsonic.models.infer_model")
        mock_infer: MagicMock = self._infer_patcher.start()
        mock_infer.return_value = MagicMock()
        self.addCleanup(self._infer_patcher.stop)
        self.agent: Agent = Agent(name="TestAgent")

    def test_non_list_returns_unhandled(self) -> None:
        task: Task = Task("single task")
        executor: MagicMock = MagicMock()

        handled, result = self.agent._handle_task_list(task, executor)

        self.assertFalse(handled)
        self.assertIs(result, task)
        executor.assert_not_called()

    def test_string_returns_unhandled(self) -> None:
        executor: MagicMock = MagicMock()

        handled, result = self.agent._handle_task_list("hello", executor)

        self.assertFalse(handled)
        self.assertEqual(result, "hello")
        executor.assert_not_called()

    def test_empty_list_returns_handled_empty(self) -> None:
        executor: MagicMock = MagicMock()

        handled, result = self.agent._handle_task_list([], executor)

        self.assertTrue(handled)
        self.assertEqual(result, [])
        executor.assert_not_called()

    def test_single_element_list_unwraps(self) -> None:
        task: Task = Task("only task")
        executor: MagicMock = MagicMock()

        handled, result = self.agent._handle_task_list([task], executor)

        self.assertFalse(handled)
        self.assertIs(result, task)
        executor.assert_not_called()

    def test_single_element_string_list_unwraps(self) -> None:
        executor: MagicMock = MagicMock()

        handled, result = self.agent._handle_task_list(["only string"], executor)

        self.assertFalse(handled)
        self.assertEqual(result, "only string")
        executor.assert_not_called()

    def test_multi_element_list_calls_executor_per_task(self) -> None:
        task_a: Task = Task("task A")
        task_b: Task = Task("task B")
        task_c: Task = Task("task C")
        executor: MagicMock = MagicMock(side_effect=["result_A", "result_B", "result_C"])

        handled, results = self.agent._handle_task_list(
            [task_a, task_b, task_c], executor, "extra_arg", key="kwarg_val",
        )

        self.assertTrue(handled)
        self.assertEqual(results, ["result_A", "result_B", "result_C"])
        self.assertEqual(executor.call_count, 3)
        executor.assert_any_call(task_a, "extra_arg", key="kwarg_val")
        executor.assert_any_call(task_b, "extra_arg", key="kwarg_val")
        executor.assert_any_call(task_c, "extra_arg", key="kwarg_val")

    def test_multi_element_mixed_list(self) -> None:
        executor: MagicMock = MagicMock(side_effect=["r1", "r2"])

        handled, results = self.agent._handle_task_list(
            ["string task", Task("task obj")], executor,
        )

        self.assertTrue(handled)
        self.assertEqual(results, ["r1", "r2"])
        self.assertEqual(executor.call_count, 2)

    def test_args_and_kwargs_forwarded(self) -> None:
        executor: MagicMock = MagicMock(side_effect=["x", "y"])
        tasks: List[str] = ["a", "b"]

        self.agent._handle_task_list(
            tasks, executor, "pos1", "pos2", debug=True, retry=3,
        )

        executor.assert_any_call("a", "pos1", "pos2", debug=True, retry=3)
        executor.assert_any_call("b", "pos1", "pos2", debug=True, retry=3)


# ---------------------------------------------------------------------------
# _handle_task_list_async (asynchronous)
# ---------------------------------------------------------------------------

class TestHandleTaskListAsync(unittest.TestCase):
    """Unit tests for Agent._handle_task_list_async (asynchronous helper)."""

    def setUp(self) -> None:
        self._infer_patcher: Any = patch("upsonic.models.infer_model")
        mock_infer: MagicMock = self._infer_patcher.start()
        mock_infer.return_value = MagicMock()
        self.addCleanup(self._infer_patcher.stop)
        self.agent: Agent = Agent(name="TestAgent")

    @pytest.mark.asyncio
    async def test_non_list_returns_unhandled(self) -> None:
        task: Task = Task("single task")
        executor: AsyncMock = AsyncMock()

        handled, result = await self.agent._handle_task_list_async(task, executor)

        self.assertFalse(handled)
        self.assertIs(result, task)
        executor.assert_not_called()

    @pytest.mark.asyncio
    async def test_string_returns_unhandled(self) -> None:
        executor: AsyncMock = AsyncMock()

        handled, result = await self.agent._handle_task_list_async("hello", executor)

        self.assertFalse(handled)
        self.assertEqual(result, "hello")
        executor.assert_not_called()

    @pytest.mark.asyncio
    async def test_empty_list_returns_handled_empty(self) -> None:
        executor: AsyncMock = AsyncMock()

        handled, result = await self.agent._handle_task_list_async([], executor)

        self.assertTrue(handled)
        self.assertEqual(result, [])
        executor.assert_not_called()

    @pytest.mark.asyncio
    async def test_single_element_list_unwraps(self) -> None:
        task: Task = Task("only task")
        executor: AsyncMock = AsyncMock()

        handled, result = await self.agent._handle_task_list_async([task], executor)

        self.assertFalse(handled)
        self.assertIs(result, task)
        executor.assert_not_called()

    @pytest.mark.asyncio
    async def test_multi_element_list_awaits_executor_per_task(self) -> None:
        task_a: Task = Task("task A")
        task_b: Task = Task("task B")
        executor: AsyncMock = AsyncMock(side_effect=["result_A", "result_B"])

        handled, results = await self.agent._handle_task_list_async(
            [task_a, task_b], executor, "arg1", kw="val",
        )

        self.assertTrue(handled)
        self.assertEqual(results, ["result_A", "result_B"])
        self.assertEqual(executor.call_count, 2)
        executor.assert_any_call(task_a, "arg1", kw="val")
        executor.assert_any_call(task_b, "arg1", kw="val")

    @pytest.mark.asyncio
    async def test_multi_element_mixed_list(self) -> None:
        executor: AsyncMock = AsyncMock(side_effect=["r1", "r2"])

        handled, results = await self.agent._handle_task_list_async(
            ["str_task", Task("task_obj")], executor,
        )

        self.assertTrue(handled)
        self.assertEqual(results, ["r1", "r2"])
        self.assertEqual(executor.call_count, 2)


# ---------------------------------------------------------------------------
# do / do_async end-to-end with mocked model
# ---------------------------------------------------------------------------

class TestDoTaskListDispatch(unittest.TestCase):
    """Verify do / do_async correctly delegate list inputs."""

    @patch("upsonic.models.infer_model")
    def test_do_single_string(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        result: str = agent.do("single prompt")

        self.assertIsInstance(result, str)
        self.assertEqual(result, "mock answer")

    @patch("upsonic.models.infer_model")
    def test_do_single_task(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        result: str = agent.do(Task("single task"))

        self.assertIsInstance(result, str)
        self.assertEqual(result, "mock answer")

    @patch("upsonic.models.infer_model")
    def test_do_list_of_two_strings(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        results: List[str] = agent.do(["prompt A", "prompt B"])

        self.assertIsInstance(results, list)
        self.assertEqual(len(results), 2)
        self.assertEqual(results[0], "mock answer")
        self.assertEqual(results[1], "mock answer")

    @patch("upsonic.models.infer_model")
    def test_do_list_of_two_tasks(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        results: List[str] = agent.do([Task("A"), Task("B")])

        self.assertIsInstance(results, list)
        self.assertEqual(len(results), 2)

    @patch("upsonic.models.infer_model")
    def test_do_single_element_list_returns_scalar(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        result: str = agent.do(["only one"])

        self.assertIsInstance(result, str)
        self.assertNotIsInstance(result, list)
        self.assertEqual(result, "mock answer")

    @patch("upsonic.models.infer_model")
    def test_do_empty_list_returns_empty(self, mock_infer_model: MagicMock) -> None:
        mock_infer_model.return_value = MagicMock()
        agent: Agent = Agent(name="TestAgent")

        result: List[Any] = agent.do([])

        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 0)

    @patch("upsonic.models.infer_model")
    def test_do_list_return_output_true(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        results: List[AgentRunOutput] = agent.do(
            [Task("A"), Task("B")], return_output=True,
        )

        self.assertIsInstance(results, list)
        self.assertEqual(len(results), 2)
        for item in results:
            self.assertIsInstance(item, AgentRunOutput)

    @patch("upsonic.models.infer_model")
    def test_do_single_return_output_true(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        result: AgentRunOutput = agent.do(Task("single"), return_output=True)

        self.assertIsInstance(result, AgentRunOutput)

    @pytest.mark.asyncio
    @patch("upsonic.models.infer_model")
    async def test_do_async_list_of_two(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        results: List[str] = await agent.do_async(["prompt A", "prompt B"])

        self.assertIsInstance(results, list)
        self.assertEqual(len(results), 2)

    @pytest.mark.asyncio
    @patch("upsonic.models.infer_model")
    async def test_do_async_single_element_list(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        result: str = await agent.do_async(["only one"])

        self.assertIsInstance(result, str)
        self.assertNotIsInstance(result, list)

    @pytest.mark.asyncio
    @patch("upsonic.models.infer_model")
    async def test_do_async_empty_list(self, mock_infer_model: MagicMock) -> None:
        mock_infer_model.return_value = MagicMock()
        agent: Agent = Agent(name="TestAgent")

        result: List[Any] = await agent.do_async([])

        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 0)

    @pytest.mark.asyncio
    @patch("upsonic.models.infer_model")
    async def test_do_async_list_return_output_true(self, mock_infer_model: MagicMock) -> None:
        mock_model: MagicMock = _make_mock_model()
        mock_infer_model.return_value = mock_model
        agent: Agent = Agent(name="TestAgent", model=mock_model)

        results: List[AgentRunOutput] = await agent.do_async(
            [Task("A"), Task("B")], return_output=True,
        )

        self.assertIsInstance(results, list)
        self.assertEqual(len(results), 2)
        for item in results:
            self.assertIsInstance(item, AgentRunOutput)


if __name__ == "__main__":
    unittest.main()
