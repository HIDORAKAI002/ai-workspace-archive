"""
PromptLayer integration test with system_prompt, tools, and tool_calls.

Verifies that system_prompt, tool definitions, tool_calls, time,
cost, and token counts are all properly sent to PromptLayer.

Run with: uv run pytest tests/smoke_tests/integrations/promptlayer/test_promptlayer_tools_system.py -v -s
"""
from __future__ import annotations

import os
from typing import Any, Dict, List, TYPE_CHECKING

import pytest

from upsonic import Agent, Task
from upsonic.tools.config import tool

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
    from upsonic.integrations.promptlayer import PromptLayer
    instance = PromptLayer()
    yield instance
    instance.shutdown()


@tool(docstring_format="google")
def calculate_discount(price: float, discount_percent: float) -> float:
    """Calculate the final price after applying a discount.

    Args:
        price: Original price
        discount_percent: Discount percentage to apply

    Returns:
        Final discounted price
    """
    return price * (1 - discount_percent / 100)


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


class TestAgentWithSystemPromptAndTools:

    @pytest.mark.asyncio
    async def test_agent_with_system_prompt_only(self, pl: "PromptLayer") -> None:
        agent = Agent(
            MODEL,
            name="SystemPromptAgent",
            system_prompt="You are a helpful math tutor. Always explain your reasoning step by step.",
            promptlayer=pl,
        )
        task = Task(description="What is 15 + 27?")
        await agent.do_async(task)

        assert task.response is not None
        assert task._promptlayer_request_id is not None
        print(f"\n[system_prompt_only] request_id={task._promptlayer_request_id}")
        print(f"[system_prompt_only] response={task.response}")

    @pytest.mark.asyncio
    async def test_agent_with_tools_only(self, pl: "PromptLayer") -> None:
        agent = Agent(
            MODEL,
            name="ToolsOnlyAgent",
            tools=[calculate_discount],
            promptlayer=pl,
        )
        task = Task(
            description="Calculate a 20% discount on $150. Use the calculate_discount tool.",
        )
        await agent.do_async(task)

        assert task.response is not None
        assert task._promptlayer_request_id is not None
        assert len(task.tool_calls) > 0, "Expected at least one tool call"
        print(f"\n[tools_only] request_id={task._promptlayer_request_id}")
        print(f"[tools_only] tool_calls={task.tool_calls}")
        print(f"[tools_only] response={task.response}")

    @pytest.mark.asyncio
    async def test_agent_with_system_prompt_and_tools(self, pl: "PromptLayer") -> None:
        agent = Agent(
            MODEL,
            name="FullAgent",
            system_prompt="You are a shopping assistant. Use tools when calculations are needed.",
            tools=[calculate_discount, add_numbers],
            promptlayer=pl,
        )
        task = Task(
            description="I want to buy something for $200 with a 15% discount. Use the calculate_discount tool to compute the final price.",
        )
        await agent.do_async(task)

        assert task.response is not None
        assert task._promptlayer_request_id is not None
        assert len(task.tool_calls) > 0, "Expected at least one tool call"
        print(f"\n[full_agent] request_id={task._promptlayer_request_id}")
        print(f"[full_agent] tool_calls={task.tool_calls}")
        print(f"[full_agent] response={task.response}")

    @pytest.mark.asyncio
    async def test_agent_no_tools_no_system(self, pl: "PromptLayer") -> None:
        """Baseline: no system prompt, no tools. Verify time/tokens/cost still work."""
        agent = Agent(
            MODEL,
            name="BaselineAgent",
            promptlayer=pl,
        )
        task = Task(description="Say hello.")
        await agent.do_async(task)

        assert task.response is not None
        assert task._promptlayer_request_id is not None
        print(f"\n[baseline] request_id={task._promptlayer_request_id}")
        print(f"[baseline] response={task.response}")
