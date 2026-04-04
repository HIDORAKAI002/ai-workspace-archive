"""Tests for MAKER (swarms.structs.maker) using real Agent instances and live LLMs."""

import os

import pytest
from dotenv import load_dotenv

from swarms.structs.agent import Agent
from swarms.structs.maker import MAKER

load_dotenv()

requires_openai = pytest.mark.skipif(
    not os.getenv("OPENAI_API_KEY"),
    reason="OPENAI_API_KEY required for live MAKER / LLM tests",
)


def _vote_agent(name_suffix: str) -> Agent:
    """One-shot agent suitable for MAKER vote sampling (matches micro-agent usage)."""
    return Agent(
        agent_name=f"MAKER-Vote-{name_suffix}",
        agent_description="Executes a single MAKER vote: follow the user message literally.",
        model_name="gpt-5.4",
        max_loops=1,
        verbose=False,
        print_on=False,
    )


def _strict_step_maker(*, k: int = 1, agents: list, **kwargs):
    """MAKER configured so the model is nudged toward identical short replies per step."""

    def format_prompt(task, state, step_idx, previous_result):
        prev = (
            f"\nPrevious step output was: {previous_result!r}"
            if previous_result is not None
            else ""
        )
        return (
            f"{task}\n"
            f"You are on step {step_idx + 1} only.{prev}\n"
            "Reply with exactly this single token and nothing else: STEP"
        )

    system_prompt = (
        "You follow instructions exactly. When asked for the single token STEP, "
        "output only the characters STEP with no punctuation, spaces, or explanation."
    )

    return MAKER(
        k=k,
        verbose=False,
        agents=agents,
        system_prompt=system_prompt,
        format_prompt=format_prompt,
        parse_response=lambda s: s.strip(),
        max_retries_per_step=40,
        max_tokens=256,
        **kwargs,
    )


# --- Configuration validation (no LLM calls) ---


def test_init_invalid_k():
    with pytest.raises(ValueError, match="k must be at least 1"):
        MAKER(k=0, verbose=False)


def test_init_invalid_max_tokens():
    with pytest.raises(
        ValueError, match="max_tokens must be at least 10"
    ):
        MAKER(k=1, max_tokens=5, verbose=False)


def test_init_invalid_temperature():
    with pytest.raises(
        ValueError, match="temperature must be between"
    ):
        MAKER(k=1, temperature=3.0, verbose=False)


def test_init_invalid_max_retries():
    with pytest.raises(ValueError, match="max_retries_per_step"):
        MAKER(k=1, max_retries_per_step=0, verbose=False)


def test_run_requires_task():
    m = MAKER(k=1, verbose=False, agents=[_vote_agent("a")])
    with pytest.raises(ValueError, match="task is required"):
        m.run(task="", max_steps=1)


def test_run_requires_max_steps():
    m = MAKER(k=1, verbose=False, agents=[_vote_agent("a")])
    with pytest.raises(ValueError, match="max_steps is required"):
        m.run(task="x", max_steps=None)


def test_run_until_condition_requires_stop():
    m = MAKER(k=1, verbose=False, agents=[_vote_agent("a")])
    with pytest.raises(ValueError, match="stop_condition"):
        m.run_until_condition(task="t", stop_condition=None)


def test_make_hashable_nested_no_llm():
    m = MAKER(k=1, verbose=False)
    h = m._make_hashable({"b": 2, "a": [1, 2]})
    assert isinstance(h, tuple)


def test_estimate_cost_structure():
    m = MAKER(k=2, verbose=False)
    est = m.estimate_cost(
        total_steps=10, target_success_probability=0.9
    )
    assert "current_k" in est
    assert "expected_total_samples" in est
    assert est["current_k"] == 2
    assert est["total_steps"] == 10


# --- Live LLM tests ---


@requires_openai
def test_maker_run_single_step_k1():
    agents = [_vote_agent("1")]
    maker = _strict_step_maker(k=1, agents=agents)
    out = maker.run(
        task="We are testing MAKER. Perform exactly one micro-step.",
        max_steps=1,
    )
    assert len(out) == 1
    assert isinstance(out[0], str)
    assert "STEP" in out[0].upper().replace(" ", "")
    assert maker.stats["steps_completed"] == 1
    assert maker.stats["total_samples"] >= 1


@requires_openai
def test_maker_run_multiple_steps_k1():
    agents = [_vote_agent("1")]
    maker = _strict_step_maker(k=1, agents=agents)
    out = maker.run(
        task="Multi-step MAKER test. One token per step.",
        max_steps=3,
    )
    assert len(out) == 3
    assert maker.stats["steps_completed"] == 3


@requires_openai
def test_maker_run_parallel_voting_k1():
    agents = [_vote_agent("p")]
    maker = _strict_step_maker(k=1, agents=agents, max_workers=2)
    out = maker.run_parallel_voting(
        task="Parallel vote path smoke test.",
        max_steps=2,
    )
    assert len(out) == 2


@requires_openai
def test_maker_run_until_condition():
    agents = [_vote_agent("u")]
    maker = _strict_step_maker(k=1, agents=agents)

    def stop(state, results, step_idx):
        return len(results) >= 2

    out = maker.run_until_condition(
        task="Stop after two completed steps.",
        stop_condition=stop,
        max_steps=8,
    )
    assert len(out) == 2


@requires_openai
def test_maker_update_state_with_real_run():
    agents = [_vote_agent("s")]
    update_calls = []

    def upd(state, result, step_idx):
        update_calls.append((step_idx, result))
        return (state or []) + [result]

    maker = _strict_step_maker(
        k=1,
        agents=agents,
        initial_state=[],
        update_state=upd,
    )
    maker.run(task="State accumulation test.", max_steps=2)
    assert len(update_calls) == 2
    assert update_calls[0][0] == 0 and update_calls[1][0] == 1


@requires_openai
def test_maker_custom_parse_integer():
    agents = [_vote_agent("n")]
    system_prompt = "Reply with a single digit only: output exactly one character 7 and nothing else."

    def format_prompt(task, state, step_idx, previous_result):
        return (
            f"{task}\nOutput one digit only for step {step_idx + 1}."
        )

    maker = MAKER(
        k=1,
        verbose=False,
        agents=agents,
        system_prompt=system_prompt,
        format_prompt=format_prompt,
        parse_response=lambda s: int(s.strip()[:1]),
        validate_response=lambda text, mt: len(text.strip()) >= 1
        and text.strip()[0].isdigit(),
        max_retries_per_step=25,
        max_tokens=64,
    )
    out = maker.run(task="Return the digit seven.", max_steps=1)
    assert len(out) == 1
    assert out[0] == 7


@requires_openai
def test_maker_two_agent_pool():
    agents = [_vote_agent("a"), _vote_agent("b")]
    maker = _strict_step_maker(k=1, agents=agents)
    out = maker.run(task="Pool rotation test.", max_steps=1)
    assert len(out) == 1
    assert maker.stats["total_samples"] >= 1


@requires_openai
def test_maker_k2_strict_consensus():
    """Higher k needs repeated agreement; strict STEP token keeps votes aligned."""
    agents = [_vote_agent("k2")]
    maker = _strict_step_maker(
        k=2, agents=agents, max_retries_per_step=60
    )
    out = maker.run(task="Consensus test with k=2.", max_steps=1)
    assert len(out) == 1


@requires_openai
def test_get_statistics_and_reset():
    agents = [_vote_agent("r")]
    maker = _strict_step_maker(k=1, agents=agents)
    conv_id = id(maker.conversation)
    maker.run(task="Stats and reset test.", max_steps=1)
    s = maker.get_statistics()
    assert s is not maker.stats
    assert s["steps_completed"] >= 1
    maker.reset()
    assert maker.stats["total_samples"] == 0
    assert maker.stats["steps_completed"] == 0
    assert id(maker.conversation) != conv_id


@requires_openai
def test_maker_default_microagents_no_pool():
    """MAKER may create its own micro-agents when agents=None (still uses gpt-4o + API)."""
    maker = _strict_step_maker(k=1, agents=None)
    out = maker.run(task="Built-in micro-agent path.", max_steps=1)
    assert len(out) == 1
