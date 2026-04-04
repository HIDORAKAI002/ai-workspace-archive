"""
Smoke tests for ReliabilityEvaluator across Agent (Task), Team (List[Task]),
and Graph entities. Covers all supported run_result types with attribute
verification, tool-call checking, and logging output validation.
"""
import sys
import pytest
from rich.console import Console
from io import StringIO
from contextlib import redirect_stdout
from typing import List

from upsonic import Agent, Task, Team, Graph
from upsonic.eval import (
    ReliabilityEvaluator,
    ReliabilityEvaluationResult,
    ToolCallCheck,
)
from upsonic.tools import tool

pytestmark = pytest.mark.timeout(300)


def _enable_print_capture() -> None:
    import upsonic.utils.printing as _printing
    _printing.console = Console(file=sys.stdout)


@tool
def calculate_sum(a: int, b: int) -> int:
    """Add two numbers together."""
    return a + b


@tool
def calculate_product(a: int, b: int) -> int:
    """Multiply two numbers."""
    return a * b


@tool
def get_weather(city: str) -> str:
    """Get weather for a city."""
    return f"Weather in {city}: Sunny, 72°F"


def _validate_reliability_result(
    result: ReliabilityEvaluationResult,
    expected_tools: List[str],
) -> None:
    """Shared validation logic for reliability evaluation results."""
    assert result is not None, "Result should not be None"
    assert isinstance(result, ReliabilityEvaluationResult)

    assert isinstance(result.passed, bool)
    assert isinstance(result.summary, str) and len(result.summary) > 0
    assert isinstance(result.expected_tool_calls, list)
    assert result.expected_tool_calls == expected_tools
    assert isinstance(result.actual_tool_calls, list)
    assert isinstance(result.checks, list)
    assert len(result.checks) == len(expected_tools)
    assert isinstance(result.missing_tool_calls, list)
    assert isinstance(result.unexpected_tool_calls, list)

    for check in result.checks:
        assert isinstance(check, ToolCallCheck)
        assert isinstance(check.tool_name, str)
        assert isinstance(check.was_called, bool)
        assert isinstance(check.times_called, int)
        assert check.times_called >= 0


# ---------------------------------------------------------------------------
# Agent (Task)
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_reliability_eval_agent_basic() -> None:
    """ReliabilityEvaluator with Agent – basic tool call verification."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o",
        tools=[calculate_sum, calculate_product],
        debug=True,
    )

    task: Task = Task(
        description=(
            "First calculate 5 + 3 using calculate_sum, "
            "then multiply the result by 2 using calculate_product"
        )
    )

    await agent.print_do_async(task)

    expected_tools: List[str] = ["calculate_sum", "calculate_product"]
    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=expected_tools,
        order_matters=False,
        exact_match=False,
    )

    assert evaluator.expected_tool_calls == expected_tools
    assert evaluator.order_matters is False
    assert evaluator.exact_match is False

    output_buffer: StringIO = StringIO()
    with redirect_stdout(output_buffer):
        result: ReliabilityEvaluationResult = evaluator.run(task, print_results=True)

    _validate_reliability_result(result, expected_tools)

    assert result.passed is True, "Both tools should have been called"
    assert "calculate_sum" in result.actual_tool_calls
    assert "calculate_product" in result.actual_tool_calls
    assert len(result.missing_tool_calls) == 0

    output: str = output_buffer.getvalue()
    assert len(output) > 0, "Should have logging output"


@pytest.mark.asyncio
async def test_reliability_eval_agent_order_matters() -> None:
    """ReliabilityEvaluator with Agent – order_matters=True."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o",
        tools=[calculate_sum, calculate_product],
        debug=True,
    )

    task: Task = Task(
        description=(
            "First use calculate_sum to add 2 + 3, "
            "then use calculate_product to multiply 4 * 5"
        )
    )

    await agent.print_do_async(task)

    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["calculate_sum", "calculate_product"],
        order_matters=True,
        exact_match=False,
    )

    assert evaluator.order_matters is True

    result: ReliabilityEvaluationResult = evaluator.run(task, print_results=False)

    _validate_reliability_result(result, ["calculate_sum", "calculate_product"])


@pytest.mark.asyncio
async def test_reliability_eval_agent_exact_match() -> None:
    """ReliabilityEvaluator with Agent – exact_match=True."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o",
        tools=[calculate_sum, calculate_product, get_weather],
        debug=True,
    )

    task: Task = Task(description="Use calculate_sum to add 10 + 20")

    await agent.print_do_async(task)

    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["calculate_sum"],
        order_matters=False,
        exact_match=True,
    )

    assert evaluator.exact_match is True

    result: ReliabilityEvaluationResult = evaluator.run(task, print_results=False)

    _validate_reliability_result(result, ["calculate_sum"])

    if not result.passed:
        assert len(result.unexpected_tool_calls) > 0, (
            "If failed, should have unexpected tool calls"
        )


@pytest.mark.asyncio
async def test_reliability_eval_agent_assert_passed() -> None:
    """ReliabilityEvaluationResult.assert_passed() integration."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o",
        tools=[calculate_sum],
        debug=True,
    )

    task: Task = Task(description="Calculate 7 + 8 using calculate_sum")

    await agent.print_do_async(task)

    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["calculate_sum"],
        order_matters=False,
        exact_match=False,
    )

    result: ReliabilityEvaluationResult = evaluator.run(task, print_results=False)

    if result.passed:
        result.assert_passed()
    else:
        with pytest.raises(AssertionError, match="Reliability evaluation failed"):
            result.assert_passed()


@pytest.mark.asyncio
async def test_reliability_eval_agent_multiple_calls() -> None:
    """ReliabilityEvaluator tracking a tool called multiple times."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o",
        tools=[calculate_sum],
        debug=True,
    )

    task: Task = Task(
        description="Calculate: (1 + 2) + (3 + 4) + (5 + 6) using calculate_sum for each pair"
    )

    await agent.print_do_async(task)

    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["calculate_sum"],
        order_matters=False,
        exact_match=False,
    )

    result: ReliabilityEvaluationResult = evaluator.run(task, print_results=False)

    _validate_reliability_result(result, ["calculate_sum"])

    sum_check: ToolCallCheck = next(
        c for c in result.checks if c.tool_name == "calculate_sum"
    )
    assert sum_check.times_called >= 1, "calculate_sum should be called at least once"


# ---------------------------------------------------------------------------
# Team – sequential (List[Task])
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_reliability_eval_team_sequential() -> None:
    """ReliabilityEvaluator with Team in sequential mode."""
    _enable_print_capture()

    calculator_agent: Agent = Agent(
        model="openai/gpt-4o",
        name="Calculator",
        role="Math Calculator",
        tools=[calculate_sum],
        debug=True,
    )
    weather_agent: Agent = Agent(
        model="openai/gpt-4o",
        name="WeatherAgent",
        role="Weather Provider",
        tools=[get_weather],
        debug=True,
    )

    team: Team = Team(
        entities=[calculator_agent, weather_agent],
        mode="sequential",
    )

    tasks: List[Task] = [
        Task(description="Calculate 5 + 7 using calculate_sum"),
        Task(description="Get weather for San Francisco using get_weather"),
    ]

    await team.multi_agent_async(team.entities, tasks, _print_method_default=True)

    expected_tools: List[str] = ["calculate_sum", "get_weather"]
    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=expected_tools,
        order_matters=False,
        exact_match=False,
    )

    output_buffer: StringIO = StringIO()
    with redirect_stdout(output_buffer):
        result: ReliabilityEvaluationResult = evaluator.run(tasks, print_results=True)

    _validate_reliability_result(result, expected_tools)

    tool_names: List[str] = [check.tool_name for check in result.checks]
    assert "calculate_sum" in tool_names
    assert "get_weather" in tool_names

    if result.passed:
        assert len(result.missing_tool_calls) == 0

    output: str = output_buffer.getvalue()
    assert len(output) > 0, "Should have logging output"


# ---------------------------------------------------------------------------
# Team – coordinate (List[Task])
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_reliability_eval_team_coordinate() -> None:
    """ReliabilityEvaluator with Team in coordinate mode."""
    _enable_print_capture()

    math_agent: Agent = Agent(
        model="openai/gpt-4o",
        name="MathWorker",
        role="Math Calculator",
        goal="Perform calculations",
        tools=[calculate_sum, calculate_product],
        debug=True,
    )

    team: Team = Team(
        entities=[math_agent],
        mode="coordinate",
        model="openai/gpt-4o",
        debug=True,
    )

    tasks: List[Task] = [
        Task(description="Calculate 4 + 6 using calculate_sum"),
        Task(description="Calculate 3 * 7 using calculate_product"),
    ]

    await team.multi_agent_async(team.entities, tasks, _print_method_default=True)

    expected_tools: List[str] = ["calculate_sum", "calculate_product"]
    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=expected_tools,
        order_matters=False,
        exact_match=False,
    )

    result: ReliabilityEvaluationResult = evaluator.run(tasks, print_results=False)

    _validate_reliability_result(result, expected_tools)


# ---------------------------------------------------------------------------
# Team – route (List[Task])
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_reliability_eval_team_route() -> None:
    """ReliabilityEvaluator with Team in route mode."""
    _enable_print_capture()

    calculator: Agent = Agent(
        model="openai/gpt-4o",
        name="Calculator",
        role="Math Calculator",
        goal="Perform math calculations",
        tools=[calculate_sum],
        debug=True,
    )
    weather_provider: Agent = Agent(
        model="openai/gpt-4o",
        name="WeatherProvider",
        role="Weather Provider",
        goal="Provide weather information",
        tools=[get_weather],
        debug=True,
    )

    team: Team = Team(
        entities=[calculator, weather_provider],
        mode="route",
        model="openai/gpt-4o",
        debug=True,
    )

    tasks: List[Task] = [
        Task(description="Calculate 8 + 9 using calculate_sum"),
    ]

    await team.multi_agent_async(team.entities, tasks, _print_method_default=True)

    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["calculate_sum"],
        order_matters=False,
        exact_match=False,
    )

    result: ReliabilityEvaluationResult = evaluator.run(tasks, print_results=False)

    _validate_reliability_result(result, ["calculate_sum"])


# ---------------------------------------------------------------------------
# Graph
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_reliability_eval_graph() -> None:
    """ReliabilityEvaluator with Graph entity."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o",
        name="GraphReliabilityAgent",
        tools=[calculate_sum],
        debug=True,
    )

    graph: Graph = Graph(
        default_agent=agent,
        show_progress=False,
        debug=True,
    )

    graph_task: Task = Task(description="Calculate 12 + 15 using calculate_sum")
    graph.add(graph_task)

    state = await graph.run_async(verbose=False)

    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["calculate_sum"],
        order_matters=False,
        exact_match=False,
    )

    output_buffer: StringIO = StringIO()
    with redirect_stdout(output_buffer):
        result: ReliabilityEvaluationResult = evaluator.run(graph, print_results=True)

    _validate_reliability_result(result, ["calculate_sum"])

    assert result.passed is True, "calculate_sum should have been called"
    assert "calculate_sum" in result.actual_tool_calls

    output: str = output_buffer.getvalue()
    assert len(output) > 0, "Should have logging output"


@pytest.mark.asyncio
async def test_reliability_eval_graph_chain() -> None:
    """ReliabilityEvaluator with a multi-node Graph chain using tools."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o",
        name="GraphChainReliabilityAgent",
        tools=[calculate_sum, calculate_product],
        debug=True,
    )

    graph: Graph = Graph(
        default_agent=agent,
        show_progress=False,
        debug=True,
    )

    t1: Task = Task(description="Calculate 3 + 4 using calculate_sum")
    t2: Task = Task(description="Now multiply the result by 5 using calculate_product")
    graph.add(t1 >> t2)

    await graph.run_async(verbose=False)

    expected_tools: List[str] = ["calculate_sum", "calculate_product"]
    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=expected_tools,
        order_matters=False,
        exact_match=False,
    )

    result: ReliabilityEvaluationResult = evaluator.run(graph, print_results=False)

    _validate_reliability_result(result, expected_tools)


@pytest.mark.asyncio
async def test_reliability_eval_graph_exact_match() -> None:
    """ReliabilityEvaluator with Graph – exact_match=True."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o",
        name="GraphExactAgent",
        tools=[calculate_sum, get_weather],
        debug=True,
    )

    graph: Graph = Graph(
        default_agent=agent,
        show_progress=False,
        debug=True,
    )

    graph_task: Task = Task(description="Use calculate_sum to add 100 + 200")
    graph.add(graph_task)

    await graph.run_async(verbose=False)

    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["calculate_sum"],
        order_matters=False,
        exact_match=True,
    )

    result: ReliabilityEvaluationResult = evaluator.run(graph, print_results=False)

    _validate_reliability_result(result, ["calculate_sum"])

    if not result.passed:
        assert len(result.unexpected_tool_calls) > 0


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def test_reliability_eval_validation() -> None:
    """Parameter validation for ReliabilityEvaluator."""
    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["tool1", "tool2"]
    )
    assert evaluator.expected_tool_calls == ["tool1", "tool2"]
    assert evaluator.order_matters is False
    assert evaluator.exact_match is False

    with pytest.raises(TypeError, match="must be a list"):
        ReliabilityEvaluator(expected_tool_calls="not_a_list")

    with pytest.raises(TypeError, match="must be a list"):
        ReliabilityEvaluator(expected_tool_calls=["tool1", 123])

    with pytest.raises(ValueError, match="cannot be an empty list"):
        ReliabilityEvaluator(expected_tool_calls=[])


def test_reliability_eval_defaults() -> None:
    """ReliabilityEvaluator default values."""
    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["tool1"]
    )
    assert evaluator.order_matters is False
    assert evaluator.exact_match is False


def test_reliability_eval_custom_flags() -> None:
    """ReliabilityEvaluator with custom order_matters and exact_match."""
    evaluator: ReliabilityEvaluator = ReliabilityEvaluator(
        expected_tool_calls=["t1", "t2"],
        order_matters=True,
        exact_match=True,
    )
    assert evaluator.order_matters is True
    assert evaluator.exact_match is True
