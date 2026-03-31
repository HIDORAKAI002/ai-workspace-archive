"""
Smoke tests for PerformanceEvaluator across Agent, Team, and Graph entities.
Covers all three entity types with latency/memory stats validation,
attribute verification, and logging output checks.
"""
import sys
import pytest
from rich.console import Console
from io import StringIO
from contextlib import redirect_stdout
from typing import Dict

from upsonic import Agent, Task, Team, Graph
from upsonic.eval import (
    PerformanceEvaluator,
    PerformanceEvaluationResult,
    PerformanceRunResult,
)

pytestmark = pytest.mark.timeout(600)


def _enable_print_capture() -> None:
    import upsonic.utils.printing as _printing
    _printing.console = Console(file=sys.stdout)


def _validate_performance_result(
    result: PerformanceEvaluationResult,
    expected_iterations: int,
    expected_warmups: int,
) -> None:
    """Shared validation logic for performance evaluation results."""
    assert result is not None, "Performance result should not be None"
    assert isinstance(result, PerformanceEvaluationResult)

    assert isinstance(result.all_runs, list)
    assert len(result.all_runs) == expected_iterations, (
        f"Should have {expected_iterations} runs"
    )
    assert result.num_iterations == expected_iterations
    assert result.warmup_runs == expected_warmups

    for run in result.all_runs:
        assert isinstance(run, PerformanceRunResult)
        assert isinstance(run.latency_seconds, (int, float))
        assert run.latency_seconds > 0, "Latency should be positive"
        assert isinstance(run.memory_increase_bytes, int)
        assert isinstance(run.memory_peak_bytes, int)

    _validate_stat_dict(result.latency_stats, "latency")
    _validate_stat_dict(result.memory_increase_stats, "memory_increase")
    _validate_stat_dict(result.memory_peak_stats, "memory_peak")


def _validate_stat_dict(stats: Dict[str, float], label: str) -> None:
    """Validate that a stats dictionary has all required keys and sane values."""
    assert isinstance(stats, dict), f"{label} stats should be a dict"
    for key in ("average", "median", "min", "max", "std_dev"):
        assert key in stats, f"{label} stats should have '{key}'"
        assert isinstance(stats[key], (int, float)), f"{label}[{key}] should be numeric"

    assert stats["min"] <= stats["average"] <= stats["max"], (
        f"{label}: min <= average <= max should hold"
    )
    assert stats["min"] <= stats["median"] <= stats["max"], (
        f"{label}: min <= median <= max should hold"
    )


# ---------------------------------------------------------------------------
# Agent
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_performance_eval_agent() -> None:
    """PerformanceEvaluator with a single Agent entity."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="PerfAgent",
        debug=True,
    )

    task: Task = Task(description="What is 5 + 5?")

    evaluator: PerformanceEvaluator = PerformanceEvaluator(
        agent_under_test=agent,
        task=task,
        num_iterations=2,
        warmup_runs=1,
    )

    assert evaluator.agent_under_test == agent
    assert evaluator.task == task
    assert evaluator.num_iterations == 2
    assert evaluator.warmup_runs == 1

    output_buffer: StringIO = StringIO()
    with redirect_stdout(output_buffer):
        result: PerformanceEvaluationResult = await evaluator.run(print_results=True)

    _validate_performance_result(result, expected_iterations=2, expected_warmups=1)

    assert result.latency_stats["average"] > 0, "Avg latency should be positive"

    output: str = output_buffer.getvalue()
    assert len(output) > 0, "Should have logging output"
    assert "Performance" in output or "Latency" in output or "latency" in output.lower(), (
        "Should log performance metrics"
    )


@pytest.mark.asyncio
async def test_performance_eval_agent_task_list() -> None:
    """PerformanceEvaluator with Agent and a list of tasks (uses first task)."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="PerfAgentList",
        debug=True,
    )

    tasks = [
        Task(description="What is 3 * 3?"),
        Task(description="What is 7 + 2?"),
    ]

    evaluator: PerformanceEvaluator = PerformanceEvaluator(
        agent_under_test=agent,
        task=tasks,
        num_iterations=2,
        warmup_runs=1,
    )

    result: PerformanceEvaluationResult = await evaluator.run(print_results=False)
    _validate_performance_result(result, expected_iterations=2, expected_warmups=1)


# ---------------------------------------------------------------------------
# Team – sequential
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_performance_eval_team_sequential() -> None:
    """PerformanceEvaluator with Team in sequential mode."""
    _enable_print_capture()

    analyst: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="Analyst",
        role="Data Analyst",
        goal="Analyze data",
        debug=True,
    )

    team: Team = Team(
        entities=[analyst],
        mode="sequential",
        debug=True,
    )

    task: Task = Task(description="Calculate 5 + 5")

    evaluator: PerformanceEvaluator = PerformanceEvaluator(
        agent_under_test=team,
        task=task,
        num_iterations=2,
        warmup_runs=1,
    )

    assert evaluator.agent_under_test == team

    output_buffer: StringIO = StringIO()
    with redirect_stdout(output_buffer):
        result: PerformanceEvaluationResult = await evaluator.run(print_results=True)

    _validate_performance_result(result, expected_iterations=2, expected_warmups=1)

    output: str = output_buffer.getvalue()
    assert len(output) > 0, "Should have logging output"


# ---------------------------------------------------------------------------
# Team – coordinate
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_performance_eval_team_coordinate() -> None:
    """PerformanceEvaluator with Team in coordinate mode."""
    _enable_print_capture()

    agent_a: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="WorkerA",
        role="Worker",
        goal="Do assigned work",
        debug=True,
    )
    agent_b: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="WorkerB",
        role="Worker",
        goal="Do assigned work",
        debug=True,
    )

    team: Team = Team(
        entities=[agent_a, agent_b],
        mode="coordinate",
        model="openai/gpt-4o-mini",
        debug=True,
    )

    task: Task = Task(description="What is the tallest mountain in the world?")

    evaluator: PerformanceEvaluator = PerformanceEvaluator(
        agent_under_test=team,
        task=task,
        num_iterations=2,
        warmup_runs=1,
    )

    result: PerformanceEvaluationResult = await evaluator.run(print_results=False)
    _validate_performance_result(result, expected_iterations=2, expected_warmups=1)


# ---------------------------------------------------------------------------
# Team – route
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_performance_eval_team_route() -> None:
    """PerformanceEvaluator with Team in route mode."""
    _enable_print_capture()

    math_agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="MathAgent",
        role="Math Solver",
        goal="Solve math problems",
        debug=True,
    )
    trivia_agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="TriviaAgent",
        role="Trivia Expert",
        goal="Answer trivia questions",
        debug=True,
    )

    team: Team = Team(
        entities=[math_agent, trivia_agent],
        mode="route",
        model="openai/gpt-4o-mini",
        debug=True,
    )

    task: Task = Task(description="What is 10 + 20?")

    evaluator: PerformanceEvaluator = PerformanceEvaluator(
        agent_under_test=team,
        task=task,
        num_iterations=2,
        warmup_runs=1,
    )

    result: PerformanceEvaluationResult = await evaluator.run(print_results=False)
    _validate_performance_result(result, expected_iterations=2, expected_warmups=1)


# ---------------------------------------------------------------------------
# Graph
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_performance_eval_graph() -> None:
    """PerformanceEvaluator with a single-node Graph entity."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="GraphPerfAgent",
        debug=True,
    )

    graph: Graph = Graph(
        default_agent=agent,
        show_progress=False,
        debug=True,
    )

    graph_task: Task = Task(description="What is 7 + 3?")
    graph.add(graph_task)

    perf_task: Task = Task(description="placeholder")

    evaluator: PerformanceEvaluator = PerformanceEvaluator(
        agent_under_test=graph,
        task=perf_task,
        num_iterations=2,
        warmup_runs=1,
    )

    assert evaluator.agent_under_test == graph

    output_buffer: StringIO = StringIO()
    with redirect_stdout(output_buffer):
        result: PerformanceEvaluationResult = await evaluator.run(print_results=True)

    _validate_performance_result(result, expected_iterations=2, expected_warmups=1)

    output: str = output_buffer.getvalue()
    assert len(output) > 0, "Should have logging output"


@pytest.mark.asyncio
async def test_performance_eval_graph_chain() -> None:
    """PerformanceEvaluator with a multi-node Graph chain."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="GraphChainPerfAgent",
        debug=True,
    )

    graph: Graph = Graph(
        default_agent=agent,
        show_progress=False,
        debug=True,
    )

    t1: Task = Task(description="What is the capital of Spain?")
    t2: Task = Task(description="What is a famous landmark in that city?")
    graph.add(t1 >> t2)

    perf_task: Task = Task(description="placeholder")

    evaluator: PerformanceEvaluator = PerformanceEvaluator(
        agent_under_test=graph,
        task=perf_task,
        num_iterations=2,
        warmup_runs=1,
    )

    result: PerformanceEvaluationResult = await evaluator.run(print_results=False)
    _validate_performance_result(result, expected_iterations=2, expected_warmups=1)


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def test_performance_eval_validation() -> None:
    """Parameter validation for PerformanceEvaluator."""
    agent: Agent = Agent(model="openai/gpt-4o-mini", name="Agent1")
    task: Task = Task(description="test")

    with pytest.raises(TypeError, match="agent_under_test"):
        PerformanceEvaluator(agent_under_test="not_valid", task=task)

    with pytest.raises(TypeError, match="task.*Task"):
        PerformanceEvaluator(agent_under_test=agent, task="not_a_task")

    with pytest.raises(ValueError, match="num_iterations"):
        PerformanceEvaluator(agent_under_test=agent, task=task, num_iterations=0)

    with pytest.raises(ValueError, match="warmup_runs"):
        PerformanceEvaluator(agent_under_test=agent, task=task, warmup_runs=-1)
