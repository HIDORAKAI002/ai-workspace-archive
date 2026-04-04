"""Shared helpers for extracting PromptLayer-related data from agents."""
from __future__ import annotations

from typing import Any, Dict, Optional, Tuple, TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.agent.agent import Agent


def extract_model_parameters(agent: "Agent") -> Optional[Dict[str, Any]]:
    """Return the agent's model settings dict for PromptLayer parameters."""
    settings: Any = getattr(agent.model, "_settings", None)
    if settings is not None and isinstance(settings, dict) and settings:
        return dict(settings)
    return None


def accumulate_agent_usage(agent: "Agent") -> Tuple[int, int, float]:
    """Extract token usage and cost from the agent's last run.

    Returns ``(input_tokens, output_tokens, price)``.
    """
    input_tokens: int = 0
    output_tokens: int = 0
    price: float = 0.0

    run_output: Any = getattr(agent, "_agent_run_output", None)
    run_usage: Any = getattr(run_output, "usage", None) if run_output else None
    if run_usage is not None:
        if getattr(run_usage, "input_tokens", 0) > 0:
            input_tokens = int(run_usage.input_tokens)
        if getattr(run_usage, "output_tokens", 0) > 0:
            output_tokens = int(run_usage.output_tokens)

    total_cost: Optional[float] = agent._calculate_aggregated_cost()
    if total_cost is not None:
        price = float(total_cost)

    return input_tokens, output_tokens, price
