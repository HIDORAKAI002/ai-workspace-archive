"""
Live PromptLayer integration tests with real LLM API calls.

Tests the PromptLayer integration end-to-end with Agent (do, do_async,
stream, astream) and all three evaluator types (AccuracyEvaluator,
ReliabilityEvaluator, PerformanceEvaluator).

Requires:
    - PROMPTLAYER_API_KEY env var
    - An LLM provider key (OPENAI_API_KEY or ANTHROPIC_API_KEY)

Run with: uv run pytest tests/smoke_tests/integrations/promptlayer/test_promptlayer_integration.py -v -s
"""

from __future__ import annotations

import os
from typing import Any, Dict, List, TYPE_CHECKING

import pytest

from upsonic import Agent, Task

if TYPE_CHECKING:
    from upsonic.integrations.promptlayer import PromptLayer

PROMPTLAYER_API_KEY: str = os.getenv("PROMPTLAYER_API_KEY", "")
HAS_PL_KEY: bool = bool(PROMPTLAYER_API_KEY)
HAS_LLM_KEY: bool = bool(os.getenv("OPENAI_API_KEY") or os.getenv("ANTHROPIC_API_KEY"))

MODEL: str = "anthropic/claude-sonnet-4-6"

pytestmark = pytest.mark.skipif(
    not (HAS_PL_KEY and HAS_LLM_KEY),
    reason="PROMPTLAYER_API_KEY and an LLM provider key are required",
)



@pytest.fixture()
def pl():
    """Create a PromptLayer instance and tear down after test."""
    from upsonic.integrations.promptlayer import PromptLayer

    instance = PromptLayer()
    yield instance
    instance.shutdown()


@pytest.fixture()
def pl_async():
    """Create a PromptLayer instance for async tests."""
    from upsonic.integrations.promptlayer import PromptLayer

    instance = PromptLayer()
    yield instance


# ===========================================================================
# Agent + PromptLayer auto-logging
# ===========================================================================

class TestAgentDoWithPromptLayer:
    """Test that agent.do() automatically logs to PromptLayer."""

    def test_do_logs_to_promptlayer(self, pl: "PromptLayer") -> None:
        agent = Agent(MODEL, name="TestAgent", promptlayer=pl)
        result = agent.do("What is 2 + 2? Reply with just the number.")

        assert result is not None
        assert "4" in str(result)

    def test_do_sets_promptlayer_request_id_on_task(self, pl: "PromptLayer") -> None:
        agent = Agent(MODEL, name="TaskIDAgent", promptlayer=pl)
        task = Task(description="What is the capital of France? One word.")
        agent.do(task)

        assert task._promptlayer_request_id is not None
        assert isinstance(task._promptlayer_request_id, int)
        assert task._promptlayer_request_id > 0

    def test_do_with_system_prompt(self, pl: "PromptLayer") -> None:
        agent = Agent(
            MODEL,
            name="SystemPromptAgent",
            system_prompt="You are a pirate. Always respond in pirate-speak.",
            promptlayer=pl,
        )
        result = agent.do("Say hello.")
        assert result is not None


class TestAgentDoAsyncWithPromptLayer:
    """Test that agent.do_async() automatically logs to PromptLayer."""

    @pytest.mark.asyncio
    async def test_do_async_logs(self, pl_async: "PromptLayer") -> None:
        agent = Agent(MODEL, name="AsyncAgent", promptlayer=pl_async)
        result = await agent.do_async("What is 3 + 3? Reply with just the number.")

        assert result is not None
        assert "6" in str(result)
        await pl_async.ashutdown()

    @pytest.mark.asyncio
    async def test_do_async_sets_request_id(self, pl_async: "PromptLayer") -> None:
        agent = Agent(MODEL, name="AsyncTaskIDAgent", promptlayer=pl_async)
        task = Task(description="What is the capital of Germany? One word.")
        await agent.do_async(task)

        assert task._promptlayer_request_id is not None
        assert task._promptlayer_request_id > 0
        await pl_async.ashutdown()


class TestAgentStreamWithPromptLayer:
    """Test that agent.stream() / agent.astream() log to PromptLayer."""

    def test_sync_stream_logs(self, pl: "PromptLayer") -> None:
        agent = Agent(MODEL, name="StreamAgent", promptlayer=pl)
        task = Task(description="Count from 1 to 3, one per line.")

        chunks: List[str] = []
        for chunk in agent.stream(task, events=False):
            chunks.append(chunk)

        assert len(chunks) > 0
        accumulated: str = "".join(chunks)
        assert len(accumulated) > 0

    @pytest.mark.asyncio
    async def test_async_stream_logs(self, pl_async: "PromptLayer") -> None:
        agent = Agent(MODEL, name="AStreamAgent", promptlayer=pl_async)
        task = Task(description="Say hello world.")

        chunks: List[str] = []
        async for chunk in agent.astream(task, events=False):
            chunks.append(chunk)

        assert len(chunks) > 0
        await pl_async.ashutdown()


class TestAgentManualScoring:
    """Test manual scoring and metadata on PromptLayer after agent.do()."""

    def test_manual_score_after_do(self, pl: "PromptLayer") -> None:
        agent = Agent(MODEL, name="ManualScoreAgent", promptlayer=pl)
        task = Task(description="What is 10 * 10? Reply with just the number.")
        agent.do(task)

        assert task._promptlayer_request_id is not None
        success: bool = pl.score(task._promptlayer_request_id, score=9, name="quality")
        assert isinstance(success, bool)

    def test_manual_metadata_after_do(self, pl: "PromptLayer") -> None:
        agent = Agent(MODEL, name="ManualMetaAgent", promptlayer=pl)
        task = Task(description="What is the speed of light? One sentence.")
        agent.do(task)

        assert task._promptlayer_request_id is not None
        success: bool = pl.add_metadata(
            task._promptlayer_request_id,
            {"domain": "physics", "reviewed": False},
        )
        assert isinstance(success, bool)

    def test_manual_score_and_metadata_combined(self, pl: "PromptLayer") -> None:
        agent = Agent(MODEL, name="CombinedAgent", promptlayer=pl)
        task = Task(description="What is H2O? One word.")
        agent.do(task)

        rid: int = task._promptlayer_request_id
        assert rid is not None

        pl.score(rid, score=10, name="accuracy")
        pl.score(rid, score=8, name="conciseness")
        pl.add_metadata(rid, {"domain": "chemistry"})


class TestMultipleAgentsSamePromptLayer:
    """Multiple agents sharing one PromptLayer instance."""

    def test_two_agents_both_log(self, pl: "PromptLayer") -> None:
        agent1 = Agent(MODEL, name="Agent1", promptlayer=pl)
        agent2 = Agent(MODEL, name="Agent2", promptlayer=pl)

        task1 = Task(description="Say A.")
        task2 = Task(description="Say B.")

        agent1.do(task1)
        agent2.do(task2)

        assert task1._promptlayer_request_id is not None
        assert task2._promptlayer_request_id is not None
        assert task1._promptlayer_request_id != task2._promptlayer_request_id


class TestAgentWithoutPromptLayer:
    """Ensure agents work normally when promptlayer is not set."""

    def test_do_without_promptlayer(self) -> None:
        agent = Agent(MODEL, name="NoPlAgent")
        result = agent.do("What is 1 + 1? Reply with just the number.")
        assert result is not None
        assert "2" in str(result)


# ===========================================================================
# AccuracyEvaluator + PromptLayer
# ===========================================================================

class TestAccuracyEvaluatorWithPromptLayer:
    """AccuracyEvaluator should auto-log evaluation results to PromptLayer."""

    @pytest.mark.asyncio
    async def test_accuracy_eval_logs_scores(self, pl_async: "PromptLayer") -> None:
        from upsonic.eval import AccuracyEvaluator

        agent = Agent(MODEL, name="AccuracyTestAgent", promptlayer=pl_async)
        judge = Agent(MODEL, name="Judge")

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is the capital of Japan?",
            expected_output="Tokyo is the capital of Japan.",
            additional_guidelines="Check if the answer correctly identifies Tokyo.",
            num_iterations=1,
            promptlayer=pl_async,
        )

        result = await evaluator.run(print_results=False)

        assert result is not None
        assert result.average_score > 0
        assert len(result.evaluation_scores) == 1
        assert result.generated_output is not None
        await pl_async.ashutdown()

    @pytest.mark.asyncio
    async def test_accuracy_eval_multi_iteration(self, pl_async: "PromptLayer") -> None:
        from upsonic.eval import AccuracyEvaluator

        agent = Agent(MODEL, name="AccuracyMultiAgent", promptlayer=pl_async)
        judge = Agent(MODEL, name="Judge")

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is 5 + 5?",
            expected_output="10",
            num_iterations=2,
            promptlayer=pl_async,
        )

        result = await evaluator.run(print_results=False)

        assert len(result.evaluation_scores) == 2
        assert result.average_score > 0
        await pl_async.ashutdown()

    @pytest.mark.asyncio
    async def test_accuracy_eval_run_with_output(self, pl_async: "PromptLayer") -> None:
        from upsonic.eval import AccuracyEvaluator

        agent = Agent(MODEL, name="AccuracyPreOutputAgent")
        judge = Agent(MODEL, name="Judge")

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is 2 + 2?",
            expected_output="4",
            num_iterations=1,
            promptlayer=pl_async,
        )

        result = await evaluator.run_with_output("4", print_results=False)

        assert result is not None
        assert result.average_score > 0
        assert result.generated_output == "4"
        await pl_async.ashutdown()


# ===========================================================================
# ReliabilityEvaluator + PromptLayer
# ===========================================================================

class TestReliabilityEvaluatorWithPromptLayer:
    """ReliabilityEvaluator should auto-log tool verification results to PromptLayer."""

    def test_reliability_eval_logs_passed(self, pl: "PromptLayer") -> None:
        from upsonic.eval import ReliabilityEvaluator
        from upsonic.tools.config import tool

        @tool(docstring_format="google")
        def add_numbers(a: int, b: int) -> int:
            """Add two numbers.

            Args:
                a: First number
                b: Second number

            Returns:
                Sum of a and b
            """
            return a + b

        agent = Agent(MODEL, name="ReliabilityAgent", tools=[add_numbers], promptlayer=pl)
        task = Task(description="Use the add_numbers tool to add 10 and 20. Return only the result.")
        agent.do(task)

        evaluator = ReliabilityEvaluator(
            expected_tool_calls=["add_numbers"],
            promptlayer=pl,
            agent_under_test=agent,
        )
        result = evaluator.run(task, print_results=False)

        assert result is not None
        assert result.passed is True
        assert len(result.checks) == 1
        assert result.checks[0].tool_name == "add_numbers"
        assert result.checks[0].was_called is True

    def test_reliability_eval_logs_failed(self, pl: "PromptLayer") -> None:
        from upsonic.eval import ReliabilityEvaluator

        agent = Agent(MODEL, name="ReliabilityFailAgent", promptlayer=pl)
        task = Task(description="What is 2 + 2? Just reply with the number.")
        agent.do(task)

        evaluator = ReliabilityEvaluator(
            expected_tool_calls=["nonexistent_tool"],
            promptlayer=pl,
            agent_under_test=agent,
        )
        result = evaluator.run(task, print_results=False)

        assert result is not None
        assert result.passed is False
        assert "nonexistent_tool" in result.missing_tool_calls


# ===========================================================================
# PerformanceEvaluator + PromptLayer
# ===========================================================================

class TestPerformanceEvaluatorWithPromptLayer:
    """PerformanceEvaluator should auto-log latency/memory metrics to PromptLayer."""

    @pytest.mark.asyncio
    async def test_performance_eval_logs_metrics(self, pl_async: "PromptLayer") -> None:
        from upsonic.eval import PerformanceEvaluator

        agent = Agent(MODEL, name="PerfAgent", promptlayer=pl_async)
        task = Task(description="What is 1 + 1? Reply with just the number.")

        evaluator = PerformanceEvaluator(
            agent_under_test=agent,
            task=task,
            num_iterations=2,
            warmup_runs=0,
            promptlayer=pl_async,
        )

        result = await evaluator.run(print_results=False)

        assert result is not None
        assert result.num_iterations == 2
        assert result.latency_stats["average"] > 0
        assert len(result.all_runs) == 2
        await pl_async.ashutdown()


# ===========================================================================
# Agent + Evaluator combined (full workflow)
# ===========================================================================

class TestFullWorkflow:
    """End-to-end: Agent with PromptLayer does task, then all 3 evaluators run."""

    @pytest.mark.asyncio
    async def test_full_accuracy_workflow(self, pl_async: "PromptLayer") -> None:
        from upsonic.eval import AccuracyEvaluator

        agent = Agent(
            MODEL,
            name="FullWorkflowAgent",
            role="Knowledge Assistant",
            goal="Answer questions accurately",
            promptlayer=pl_async,
        )
        judge = Agent(MODEL, name="Judge")

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is the chemical symbol for water?",
            expected_output="H2O",
            additional_guidelines="Check if the answer mentions H2O.",
            num_iterations=1,
            promptlayer=pl_async,
        )

        result = await evaluator.run(print_results=True)

        assert result.average_score > 0
        assert result.generated_output is not None
        print(f"Score: {result.average_score}/10")
        print(f"Passed: {result.evaluation_scores[0].is_met}")
        print(f"Output: {result.generated_output}")
        await pl_async.ashutdown()

    def test_full_reliability_workflow(self, pl: "PromptLayer") -> None:
        from upsonic.eval import ReliabilityEvaluator
        from upsonic.tools.config import tool

        @tool(docstring_format="google")
        def multiply(a: int, b: int) -> int:
            """Multiply two numbers.

            Args:
                a: First number
                b: Second number

            Returns:
                Product of a and b
            """
            return a * b

        agent = Agent(
            MODEL,
            name="FullReliabilityAgent",
            tools=[multiply],
            promptlayer=pl,
        )
        task = Task(description="Use the multiply tool to compute 7 times 8. Return only the result.")
        agent.do(task)

        evaluator = ReliabilityEvaluator(
            expected_tool_calls=["multiply"],
            exact_match=True,
            promptlayer=pl,
            agent_under_test=agent,
        )
        result = evaluator.run(task, print_results=True)

        assert result.passed is True
        print(f"Passed: {result.passed}")
        print(f"Summary: {result.summary}")

    @pytest.mark.asyncio
    async def test_full_performance_workflow(self, pl_async: "PromptLayer") -> None:
        from upsonic.eval import PerformanceEvaluator

        agent = Agent(
            MODEL,
            name="FullPerfAgent",
            promptlayer=pl_async,
        )
        task = Task(description="Reply with just 'ok'.")

        evaluator = PerformanceEvaluator(
            agent_under_test=agent,
            task=task,
            num_iterations=2,
            warmup_runs=1,
            promptlayer=pl_async,
        )

        result = await evaluator.run(print_results=True)

        assert result.num_iterations == 2
        assert result.latency_stats["average"] > 0
        print(f"Avg latency: {result.latency_stats['average']*1000:.2f}ms")
        await pl_async.ashutdown()


# ===========================================================================
# Task serialization round-trip with _promptlayer_request_id
# ===========================================================================

class TestTaskSerializationWithPromptLayer:
    """Ensure _promptlayer_request_id survives to_dict/from_dict round-trip."""

    def test_to_dict_includes_request_id(self, pl: "PromptLayer") -> None:
        agent = Agent(MODEL, name="SerializationAgent", promptlayer=pl)
        task = Task(description="Say hi.")
        agent.do(task)

        assert task._promptlayer_request_id is not None

        task_dict: Dict[str, Any] = task.to_dict()
        assert "_promptlayer_request_id" in task_dict
        assert task_dict["_promptlayer_request_id"] == task._promptlayer_request_id

    def test_from_dict_restores_request_id(self, pl: "PromptLayer") -> None:
        agent = Agent(MODEL, name="DeserializationAgent", promptlayer=pl)
        task = Task(description="Say bye.")
        agent.do(task)

        original_id: int = task._promptlayer_request_id
        assert original_id is not None

        task_dict: Dict[str, Any] = task.to_dict()
        restored_task: Task = Task.from_dict(task_dict)

        assert restored_task._promptlayer_request_id == original_id

    def test_from_dict_without_request_id_stays_none(self) -> None:
        task_dict: Dict[str, Any] = {"description": "Test task"}
        task: Task = Task.from_dict(task_dict)
        assert task._promptlayer_request_id is None


# ===========================================================================
# Agent with PromptLayer prompt + tools
# ===========================================================================

class TestAgentWithPromptLayerPromptAndTools:
    """Fetch a prompt from PromptLayer registry and run an agent with tools."""

    def test_get_prompt_and_run_agent_with_tools(self, pl: "PromptLayer") -> None:
        from upsonic.tools.config import tool

        @tool(docstring_format="google")
        def add_numbers(a: int, b: int) -> int:
            """Add two numbers together.

            Args:
                a: First number
                b: Second number

            Returns:
                Sum of a and b
            """
            return a + b

        @tool(docstring_format="google")
        def multiply_numbers(a: int, b: int) -> int:
            """Multiply two numbers together.

            Args:
                a: First number
                b: Second number

            Returns:
                Product of a and b
            """
            return a * b

        # Fetch the prompt from PromptLayer registry
        prompt_text = pl.get_prompt("upsonic-test-prompt")
        assert prompt_text is not None
        assert isinstance(prompt_text, str)
        assert len(prompt_text) > 0

        # Use the fetched prompt as system_prompt and run agent with tools
        agent = Agent(
            MODEL,
            name="PromptRegistryToolAgent",
            system_prompt=prompt_text,
            tools=[add_numbers, multiply_numbers],
            promptlayer=pl,
        )
        task = Task(
            description="Use the add_numbers tool to add 15 and 25, then use the multiply_numbers tool to multiply 6 and 7. Return both results."
        )
        result = agent.do(task)

        assert result is not None
        assert task._promptlayer_request_id is not None
        assert task._promptlayer_request_id > 0

    def test_get_prompt_with_metadata_and_run_agent(self, pl: "PromptLayer") -> None:
        from upsonic.tools.config import tool

        @tool(docstring_format="google")
        def get_length(text: str) -> int:
            """Get the length of a text string.

            Args:
                text: The text to measure

            Returns:
                Number of characters in the text
            """
            return len(text)

        # Fetch prompt with metadata
        prompt_text, metadata = pl.get_prompt(
            "upsonic-test-prompt", return_metadata=True
        )
        assert prompt_text is not None
        assert isinstance(prompt_text, str)
        assert len(prompt_text) > 0
        assert isinstance(metadata, dict)
        assert "id" in metadata
        assert "version" in metadata

        agent = Agent(
            MODEL,
            name="PromptMetadataToolAgent",
            system_prompt=prompt_text,
            tools=[get_length],
            promptlayer=pl,
        )
        task = Task(description="Use the get_length tool to find the length of the word 'hello'.")
        result = agent.do(task)

        assert result is not None
        assert task._promptlayer_request_id is not None

        # Score and add metadata linking back to the prompt version
        pl.score(task._promptlayer_request_id, score=9, name="quality")
        pl.add_metadata(
            task._promptlayer_request_id,
            {
                "prompt_name": "upsonic-test-prompt",
                "prompt_version": metadata.get("version"),
            },
        )
