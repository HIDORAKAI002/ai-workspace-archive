"""
Smoke tests for AccuracyEvaluator across Agent, Team, and Graph entities.
Covers all three entity types with attribute verification, score validation,
and logging output checks.
"""
import sys
import pytest
from rich.console import Console
from io import StringIO
from contextlib import redirect_stdout

from upsonic import Agent, Task, Team, Graph
from upsonic.eval import AccuracyEvaluator, AccuracyEvaluationResult, EvaluationScore

pytestmark = pytest.mark.timeout(300)


def _enable_print_capture() -> None:
    import upsonic.utils.printing as _printing
    _printing.console = Console(file=sys.stdout)


def _validate_accuracy_result(
    result: AccuracyEvaluationResult,
    expected_num_scores: int,
    expected_query: str,
    expected_output: str,
) -> None:
    """Shared validation logic for accuracy evaluation results."""
    assert result is not None, "Evaluation result should not be None"
    assert isinstance(result, AccuracyEvaluationResult), "Result should be AccuracyEvaluationResult"

    assert isinstance(result.evaluation_scores, list), "Scores should be a list"
    assert len(result.evaluation_scores) == expected_num_scores, (
        f"Should have {expected_num_scores} score(s)"
    )

    for score in result.evaluation_scores:
        assert isinstance(score, EvaluationScore), "Each score should be EvaluationScore"
        assert isinstance(score.score, (int, float)), "Score value should be numeric"
        assert 1 <= score.score <= 10, "Score should be between 1 and 10"
        assert isinstance(score.reasoning, str) and len(score.reasoning) > 0, (
            "Reasoning should be a non-empty string"
        )
        assert isinstance(score.is_met, bool), "is_met should be boolean"
        assert isinstance(score.critique, str), "critique should be a string"

    assert isinstance(result.average_score, (int, float)), "Average score should be numeric"
    assert 1 <= result.average_score <= 10, "Average score should be between 1 and 10"

    assert result.user_query == expected_query, "user_query should match"
    assert result.expected_output == expected_output, "expected_output should match"

    assert isinstance(result.generated_output, str), "Generated output should be a string"
    assert len(result.generated_output) > 0, "Generated output should not be empty"


# ---------------------------------------------------------------------------
# Agent
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_accuracy_eval_agent() -> None:
    """AccuracyEvaluator with a single Agent entity."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="TestAgent",
        role="Knowledge Assistant",
        goal="Answer geography questions accurately",
        debug=True,
    )

    judge: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="Judge",
        debug=True,
    )

    query: str = "What is the capital of Japan?"
    expected: str = "Tokyo is the capital of Japan."

    evaluator: AccuracyEvaluator = AccuracyEvaluator(
        judge_agent=judge,
        agent_under_test=agent,
        query=query,
        expected_output=expected,
        additional_guidelines="Check if the answer correctly identifies Tokyo as the capital.",
        num_iterations=1,
    )

    assert evaluator.judge_agent == judge
    assert evaluator.agent_under_test == agent
    assert evaluator.query == query
    assert evaluator.expected_output == expected
    assert evaluator.num_iterations == 1
    assert len(evaluator._results) == 0

    output_buffer: StringIO = StringIO()
    with redirect_stdout(output_buffer):
        result: AccuracyEvaluationResult = await evaluator.run(print_results=True)

    _validate_accuracy_result(result, 1, query, expected)
    assert "tokyo" in result.generated_output.lower(), "Output should mention Tokyo"

    output: str = output_buffer.getvalue()
    assert len(output) > 0, "Should have logging output"


@pytest.mark.asyncio
async def test_accuracy_eval_agent_multi_iteration() -> None:
    """AccuracyEvaluator with Agent using multiple iterations."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="TestAgent",
        debug=True,
    )

    judge: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="Judge",
        debug=True,
    )

    query: str = "What is 2 + 2?"
    expected: str = "4"

    evaluator: AccuracyEvaluator = AccuracyEvaluator(
        judge_agent=judge,
        agent_under_test=agent,
        query=query,
        expected_output=expected,
        num_iterations=2,
    )

    assert evaluator.num_iterations == 2

    result: AccuracyEvaluationResult = await evaluator.run(print_results=False)

    _validate_accuracy_result(result, 2, query, expected)

    avg: float = sum(s.score for s in result.evaluation_scores) / len(result.evaluation_scores)
    assert abs(result.average_score - avg) < 0.01, "Average score should match manual calculation"


@pytest.mark.asyncio
async def test_accuracy_eval_agent_with_output() -> None:
    """AccuracyEvaluator.run_with_output on pre-existing Agent output."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="TestAgent",
        debug=True,
    )

    judge: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="Judge",
        debug=True,
    )

    query: str = "What is the capital of Germany?"
    expected: str = "Berlin is the capital of Germany."
    pre_existing_output: str = "The capital of Germany is Berlin."

    evaluator: AccuracyEvaluator = AccuracyEvaluator(
        judge_agent=judge,
        agent_under_test=agent,
        query=query,
        expected_output=expected,
        num_iterations=1,
    )

    result: AccuracyEvaluationResult = await evaluator.run_with_output(
        output=pre_existing_output, print_results=False
    )

    _validate_accuracy_result(result, 1, query, expected)
    assert result.generated_output == pre_existing_output


# ---------------------------------------------------------------------------
# Team – sequential
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_accuracy_eval_team_sequential() -> None:
    """AccuracyEvaluator with Team in sequential mode."""
    _enable_print_capture()

    researcher: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="Researcher",
        role="Research Specialist",
        goal="Find accurate information",
        debug=True,
    )
    writer: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="Writer",
        role="Content Writer",
        goal="Create concise summaries",
        debug=True,
    )

    team: Team = Team(
        entities=[researcher, writer],
        mode="sequential",
        debug=True,
    )

    judge: Agent = Agent(model="openai/gpt-4o-mini", name="Judge", debug=True)

    query: str = "What is the capital of France?"
    expected: str = "Paris is the capital of France."

    evaluator: AccuracyEvaluator = AccuracyEvaluator(
        judge_agent=judge,
        agent_under_test=team,
        query=query,
        expected_output=expected,
        additional_guidelines="Check if the answer correctly identifies Paris.",
        num_iterations=1,
    )

    assert evaluator.agent_under_test == team

    output_buffer: StringIO = StringIO()
    with redirect_stdout(output_buffer):
        result: AccuracyEvaluationResult = await evaluator.run(print_results=True)

    _validate_accuracy_result(result, 1, query, expected)
    assert "paris" in result.generated_output.lower(), "Output should mention Paris"

    output: str = output_buffer.getvalue()
    assert len(output) > 0, "Should have logging output"


# ---------------------------------------------------------------------------
# Team – coordinate
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_accuracy_eval_team_coordinate() -> None:
    """AccuracyEvaluator with Team in coordinate mode."""
    _enable_print_capture()

    analyst: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="Analyst",
        role="Data Analyst",
        goal="Analyze questions",
        debug=True,
    )
    reporter: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="Reporter",
        role="Report Writer",
        goal="Write clear reports",
        debug=True,
    )

    team: Team = Team(
        entities=[analyst, reporter],
        mode="coordinate",
        model="openai/gpt-4o-mini",
        debug=True,
    )

    judge: Agent = Agent(model="openai/gpt-4o-mini", name="Judge", debug=True)

    query: str = "What is the largest ocean on Earth?"
    expected: str = "The Pacific Ocean is the largest ocean on Earth."

    evaluator: AccuracyEvaluator = AccuracyEvaluator(
        judge_agent=judge,
        agent_under_test=team,
        query=query,
        expected_output=expected,
        num_iterations=1,
    )

    result: AccuracyEvaluationResult = await evaluator.run(print_results=False)

    _validate_accuracy_result(result, 1, query, expected)
    assert "pacific" in result.generated_output.lower(), "Output should mention Pacific"


# ---------------------------------------------------------------------------
# Team – route
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_accuracy_eval_team_route() -> None:
    """AccuracyEvaluator with Team in route mode."""
    _enable_print_capture()

    science_expert: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="ScienceExpert",
        role="Science Expert",
        goal="Answer science questions",
        debug=True,
    )
    history_expert: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="HistoryExpert",
        role="History Expert",
        goal="Answer history questions",
        debug=True,
    )

    team: Team = Team(
        entities=[science_expert, history_expert],
        mode="route",
        model="openai/gpt-4o-mini",
        debug=True,
    )

    judge: Agent = Agent(model="openai/gpt-4o-mini", name="Judge", debug=True)

    query: str = "What is the boiling point of water?"
    expected: str = "The boiling point of water is 100 degrees Celsius at standard atmospheric pressure."

    evaluator: AccuracyEvaluator = AccuracyEvaluator(
        judge_agent=judge,
        agent_under_test=team,
        query=query,
        expected_output=expected,
        num_iterations=1,
    )

    result: AccuracyEvaluationResult = await evaluator.run(print_results=False)

    _validate_accuracy_result(result, 1, query, expected)
    assert "100" in result.generated_output, "Output should mention 100"


# ---------------------------------------------------------------------------
# Graph
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_accuracy_eval_graph() -> None:
    """AccuracyEvaluator with Graph entity."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="GraphAgent",
        debug=True,
    )

    graph: Graph = Graph(
        default_agent=agent,
        show_progress=False,
        debug=True,
    )

    task1: Task = Task(description="What is the capital of Italy?")
    graph.add(task1)

    judge: Agent = Agent(model="openai/gpt-4o-mini", name="Judge", debug=True)

    query: str = "What is the capital of Italy?"
    expected: str = "Rome is the capital of Italy."

    evaluator: AccuracyEvaluator = AccuracyEvaluator(
        judge_agent=judge,
        agent_under_test=graph,
        query=query,
        expected_output=expected,
        additional_guidelines="Check if the answer correctly identifies Rome.",
        num_iterations=1,
    )

    assert evaluator.agent_under_test == graph

    output_buffer: StringIO = StringIO()
    with redirect_stdout(output_buffer):
        result: AccuracyEvaluationResult = await evaluator.run(print_results=True)

    _validate_accuracy_result(result, 1, query, expected)
    assert "rome" in result.generated_output.lower(), "Output should mention Rome"

    output: str = output_buffer.getvalue()
    assert len(output) > 0, "Should have logging output"


# ---------------------------------------------------------------------------
# Graph – multi-node chain
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_accuracy_eval_graph_chain() -> None:
    """AccuracyEvaluator with a multi-node Graph chain."""
    _enable_print_capture()

    agent: Agent = Agent(
        model="openai/gpt-4o-mini",
        name="GraphChainAgent",
        debug=True,
    )

    graph: Graph = Graph(
        default_agent=agent,
        show_progress=False,
        debug=True,
    )

    task1: Task = Task(description="Name a popular programming language.")
    task2: Task = Task(description="Describe one key feature of that programming language.")
    graph.add(task1 >> task2)

    judge: Agent = Agent(model="openai/gpt-4o-mini", name="Judge", debug=True)

    query: str = "Name a popular programming language and describe one key feature."
    expected: str = "Python is a popular programming language known for its readable syntax."

    evaluator: AccuracyEvaluator = AccuracyEvaluator(
        judge_agent=judge,
        agent_under_test=graph,
        query=query,
        expected_output=expected,
        additional_guidelines="Accept any valid programming language with a correct key feature.",
        num_iterations=1,
    )

    result: AccuracyEvaluationResult = await evaluator.run(print_results=False)

    _validate_accuracy_result(result, 1, query, expected)


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def test_accuracy_eval_validation() -> None:
    """Parameter validation for AccuracyEvaluator."""
    agent: Agent = Agent(model="openai/gpt-4o-mini", name="Agent1")
    judge: Agent = Agent(model="openai/gpt-4o-mini", name="Judge")

    with pytest.raises(TypeError, match="judge_agent.*Agent"):
        AccuracyEvaluator(
            judge_agent="not_an_agent",
            agent_under_test=agent,
            query="test",
            expected_output="test",
        )

    with pytest.raises(TypeError, match="agent_under_test"):
        AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test="not_valid",
            query="test",
            expected_output="test",
        )

    with pytest.raises(ValueError, match="num_iterations"):
        AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="test",
            expected_output="test",
            num_iterations=0,
        )

    with pytest.raises(ValueError, match="num_iterations"):
        AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="test",
            expected_output="test",
            num_iterations=-1,
        )
