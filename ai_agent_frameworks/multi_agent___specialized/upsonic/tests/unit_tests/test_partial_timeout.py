"""
Tests for timeout and partial_on_timeout support in Agent.do() / do_async().
"""

import asyncio
import unittest
from unittest.mock import patch, AsyncMock, MagicMock, PropertyMock

from upsonic import Task, Agent
from upsonic.exceptions import ExecutionTimeoutError
from upsonic.run.agent.output import AgentRunOutput


class TestTimeoutParameterValidation(unittest.TestCase):
    """Test parameter validation for timeout and partial_on_timeout."""

    @patch('upsonic.models.infer_model')
    def test_partial_on_timeout_without_timeout_raises(self, mock_infer_model):
        """partial_on_timeout=True without timeout should raise ValueError."""
        mock_model = MagicMock()
        mock_infer_model.return_value = mock_model

        agent = Agent(name="Test", model=mock_model)
        task = Task("test task")

        with self.assertRaises(ValueError) as ctx:
            agent.do(task, partial_on_timeout=True)

        self.assertIn("partial_on_timeout=True requires timeout", str(ctx.exception))

    @patch('upsonic.models.infer_model')
    def test_negative_timeout_raises(self, mock_infer_model):
        """Negative timeout should raise ValueError."""
        mock_model = MagicMock()
        mock_infer_model.return_value = mock_model

        agent = Agent(name="Test", model=mock_model)
        task = Task("test task")

        with self.assertRaises(ValueError) as ctx:
            agent.do(task, timeout=-1)

        self.assertIn("timeout must be a positive number", str(ctx.exception))

    @patch('upsonic.models.infer_model')
    def test_zero_timeout_raises(self, mock_infer_model):
        """Zero timeout should raise ValueError."""
        mock_model = MagicMock()
        mock_infer_model.return_value = mock_model

        agent = Agent(name="Test", model=mock_model)
        task = Task("test task")

        with self.assertRaises(ValueError) as ctx:
            agent.do(task, timeout=0)

        self.assertIn("timeout must be a positive number", str(ctx.exception))


class TestTimeoutWithoutPartial(unittest.TestCase):
    """Test timeout without partial_on_timeout (raises ExecutionTimeoutError)."""

    @patch('upsonic.models.infer_model')
    def test_timeout_raises_execution_timeout_error(self, mock_infer_model):
        """When timeout fires and partial_on_timeout=False, ExecutionTimeoutError is raised."""
        mock_model = MagicMock()
        mock_infer_model.return_value = mock_model

        # Make the model request hang forever
        async def slow_request(*args, **kwargs):
            await asyncio.sleep(9999)

        mock_model.request = slow_request
        mock_model.model_name = "test-model"
        mock_model.system = None
        mock_model.profile = None
        mock_model.settings = None
        mock_model.customize_request_parameters = lambda p: p

        agent = Agent(name="Test", model=mock_model)
        task = Task("test task")

        with self.assertRaises(ExecutionTimeoutError) as ctx:
            agent.do(task, timeout=0.5)

        self.assertIn("timed out", str(ctx.exception))
        self.assertEqual(ctx.exception.timeout, 0.5)


class TestPartialOnTimeout(unittest.TestCase):
    """Test partial_on_timeout=True returns accumulated text on timeout."""

    @patch('upsonic.models.infer_model')
    def test_partial_result_returned_on_timeout(self, mock_infer_model):
        """When timeout fires with partial_on_timeout=True, partial text is returned."""
        from upsonic.run.events.events import TextDeltaEvent

        mock_model = MagicMock()
        mock_infer_model.return_value = mock_model
        mock_model.model_name = "test-model"
        mock_model.system = None
        mock_model.profile = None
        mock_model.settings = None
        mock_model.customize_request_parameters = lambda p: p

        agent = Agent(name="Test", model=mock_model)
        task = Task("test task")

        # We patch the streaming pipeline to simulate slow streaming with partial text
        original_create_streaming = agent._create_streaming_pipeline_steps

        class FakeStreamStep:
            """A fake streaming step that yields text slowly then hangs."""
            name = "fake_stream"
            description = "Fake streaming step"
            supports_streaming = True

            async def run(self, context, task, agent, model, step_index, pipeline_manager=None):
                from upsonic.agent.pipeline.step import StepResult, StepStatus
                return StepResult(
                    status=StepStatus.COMPLETED,
                    message="done",
                    execution_time=0.0
                )

            async def run_stream(self, context, task, agent, model, step_index, pipeline_manager=None):
                from upsonic.agent.pipeline.step import StepResult, StepStatus
                from upsonic.run.events.events import TextDeltaEvent

                run_id = context.run_id or ""

                # Yield some partial text quickly
                for word in ["Hello ", "partial ", "world "]:
                    yield TextDeltaEvent(run_id=run_id, content=word)
                    await asyncio.sleep(0.01)

                # Then hang (simulate slow LLM)
                await asyncio.sleep(9999)

                context.current_step_result = StepResult(
                    status=StepStatus.COMPLETED,
                    message="done",
                    execution_time=0.0
                )

        def mock_streaming_steps():
            return [FakeStreamStep()]

        agent._create_streaming_pipeline_steps = mock_streaming_steps

        result = agent.do(task, timeout=1.0, partial_on_timeout=True)

        self.assertIsNotNone(result)
        self.assertIn("Hello", result)
        self.assertIn("partial", result)

    @patch('upsonic.models.infer_model')
    def test_partial_result_with_return_output(self, mock_infer_model):
        """With return_output=True, AgentRunOutput has timeout metadata."""
        mock_model = MagicMock()
        mock_infer_model.return_value = mock_model
        mock_model.model_name = "test-model"
        mock_model.system = None
        mock_model.profile = None
        mock_model.settings = None
        mock_model.customize_request_parameters = lambda p: p

        agent = Agent(name="Test", model=mock_model)
        task = Task("test task")

        class FakeStreamStep:
            name = "fake_stream"
            description = "Fake streaming step"
            supports_streaming = True

            async def run(self, context, task, agent, model, step_index, pipeline_manager=None):
                from upsonic.agent.pipeline.step import StepResult, StepStatus
                return StepResult(status=StepStatus.COMPLETED, message="done", execution_time=0.0)

            async def run_stream(self, context, task, agent, model, step_index, pipeline_manager=None):
                from upsonic.run.events.events import TextDeltaEvent
                run_id = context.run_id or ""
                yield TextDeltaEvent(run_id=run_id, content="partial data")
                await asyncio.sleep(0.01)
                await asyncio.sleep(9999)

        agent._create_streaming_pipeline_steps = lambda: [FakeStreamStep()]

        result = agent.do(task, timeout=0.5, partial_on_timeout=True, return_output=True)

        self.assertIsInstance(result, AgentRunOutput)
        self.assertEqual(result.output, "partial data")
        self.assertIsNotNone(result.metadata)
        self.assertTrue(result.metadata.get("timeout"))
        self.assertTrue(result.metadata.get("partial_result"))
        self.assertEqual(result.metadata.get("timeout_seconds"), 0.5)

    @patch('upsonic.models.infer_model')
    def test_no_text_before_timeout_returns_none(self, mock_infer_model):
        """If timeout fires before any text is generated, return None."""
        mock_model = MagicMock()
        mock_infer_model.return_value = mock_model
        mock_model.model_name = "test-model"
        mock_model.system = None
        mock_model.profile = None
        mock_model.settings = None
        mock_model.customize_request_parameters = lambda p: p

        agent = Agent(name="Test", model=mock_model)
        task = Task("test task")

        class FakeStreamStep:
            name = "fake_stream"
            description = "Fake streaming step"
            supports_streaming = True

            async def run(self, context, task, agent, model, step_index, pipeline_manager=None):
                from upsonic.agent.pipeline.step import StepResult, StepStatus
                return StepResult(status=StepStatus.COMPLETED, message="done", execution_time=0.0)

            async def run_stream(self, context, task, agent, model, step_index, pipeline_manager=None):
                # Hang immediately - no text yielded
                await asyncio.sleep(9999)
                yield  # Make it a generator

        agent._create_streaming_pipeline_steps = lambda: [FakeStreamStep()]

        result = agent.do(task, timeout=0.5, partial_on_timeout=True)

        self.assertIsNone(result)


class TestNoTimeoutBackwardCompatibility(unittest.TestCase):
    """Ensure existing behavior is unchanged when timeout params are not provided."""

    @patch('upsonic.models.infer_model')
    def test_do_without_timeout_works_normally(self, mock_infer_model):
        """do() without timeout parameters uses original code path."""
        from upsonic.models import ModelResponse, TextPart

        mock_model = MagicMock()
        mock_infer_model.return_value = mock_model

        mock_response = ModelResponse(
            parts=[TextPart(content="Full response text.")],
            model_name="test-model",
            timestamp="2024-01-01T00:00:00Z",
            usage=None,
            provider_name="test-provider",
            provider_response_id="test-id",
            provider_details={},
            finish_reason="stop"
        )
        mock_model.request = AsyncMock(return_value=mock_response)

        agent = Agent(name="Test", model=mock_model)
        task = Task("Who developed you?")

        result = agent.do(task)

        self.assertIsInstance(result, str)
        self.assertNotEqual(result, "")


class TestExecutionTimeoutErrorException(unittest.TestCase):
    """Test the ExecutionTimeoutError exception class."""

    def test_exception_attributes(self):
        err = ExecutionTimeoutError("test timeout", timeout=30.0)
        self.assertEqual(err.timeout, 30.0)
        self.assertIn("test timeout", str(err))

    def test_exception_defaults(self):
        err = ExecutionTimeoutError()
        self.assertEqual(err.timeout, 0)
        self.assertIn("timed out", str(err))

    def test_is_upsonic_error(self):
        from upsonic.exceptions import UpsonicError
        err = ExecutionTimeoutError()
        self.assertIsInstance(err, UpsonicError)


if __name__ == "__main__":
    unittest.main()
