"""
Smoke test for task metrics via agent.do().
Requires OPENAI_API_KEY to be set.
"""
import pytest
from upsonic import Task, Agent
from upsonic.usage import TaskUsage


@pytest.fixture
def agent() -> Agent:
    return Agent(name="MetricsTestAgent", model="openai/gpt-4o-mini")


class TestTaskMetricsViaDo:

    @pytest.mark.asyncio
    async def test_all_task_metrics_after_do_async(self, agent: Agent) -> None:
        task = Task("What is 2+2? Answer with just the number.")
        await agent.do_async(task)

        # response
        assert task.response is not None
        assert isinstance(task.response, str)
        assert len(task.response) > 0

        # timing
        assert task.start_time is not None
        assert task.end_time is not None
        assert task.duration is not None
        assert task.duration >= 0

        # cost
        assert task.total_cost is not None
        assert isinstance(task.total_cost, float)
        assert task.total_cost >= 0

        # tokens
        assert task.total_input_token is not None
        assert isinstance(task.total_input_token, int)
        assert task.total_input_token > 0

        assert task.total_output_token is not None
        assert isinstance(task.total_output_token, int)
        assert task.total_output_token > 0

        # tool calls (no tools provided, should be empty list)
        assert isinstance(task.tool_calls, list)

        # usage is TaskUsage
        assert task.usage is not None
        assert isinstance(task.usage, TaskUsage)

    def test_all_task_metrics_after_do(self, agent: Agent) -> None:
        task = Task("What is 3+3? Answer with just the number.")
        agent.do(task)

        assert task.response is not None
        assert task.start_time is not None
        assert task.end_time is not None
        assert task.duration is not None and task.duration >= 0
        assert task.total_cost is not None and task.total_cost >= 0
        assert task.total_input_token is not None and task.total_input_token > 0
        assert task.total_output_token is not None and task.total_output_token > 0
        assert isinstance(task.usage, TaskUsage)

    @pytest.mark.asyncio
    async def test_all_task_metrics_after_print_do_async(self, agent: Agent) -> None:
        task = Task("What is 4+4? Answer with just the number.")
        await agent.print_do_async(task)

        assert task.response is not None
        assert task.start_time is not None
        assert task.end_time is not None
        assert task.duration is not None and task.duration >= 0
        assert task.total_cost is not None and task.total_cost >= 0
        assert task.total_input_token is not None and task.total_input_token > 0
        assert task.total_output_token is not None and task.total_output_token > 0

    def test_all_task_metrics_after_print_do(self, agent: Agent) -> None:
        task = Task("What is 5+5? Answer with just the number.")
        agent.print_do(task)

        assert task.response is not None
        assert task.start_time is not None
        assert task.end_time is not None
        assert task.duration is not None and task.duration >= 0
        assert task.total_cost is not None and task.total_cost >= 0
        assert task.total_input_token is not None and task.total_input_token > 0
        assert task.total_output_token is not None and task.total_output_token > 0

    @pytest.mark.asyncio
    async def test_metrics_independent_across_tasks(self, agent: Agent) -> None:
        """Two separate tasks should each have their own independent metrics."""
        task_a = Task("Say hello.")
        task_b = Task("Say goodbye.")

        await agent.do_async(task_a)
        await agent.do_async(task_b)

        assert task_a.price_id_ != task_b.price_id_
        assert task_a.total_cost is not None
        assert task_b.total_cost is not None
        assert task_a.total_input_token is not None
        assert task_b.total_input_token is not None
        assert task_a.usage is not task_b.usage
