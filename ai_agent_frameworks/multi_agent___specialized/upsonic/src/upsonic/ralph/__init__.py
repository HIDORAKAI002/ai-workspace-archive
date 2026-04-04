"""
RalphLoop - Autonomous AI Development Loop

An implementation of the "Ralph/Groundhog" technique for autonomous, eventually-consistent
AI-driven software development. RalphLoop orchestrates an infinite loop where fresh Agent
instances execute one task per iteration, using subagents for expensive operations and
backpressure gates (build/test) for validation.

Usage:
    ```python
    from upsonic import RalphLoop
    
    loop = RalphLoop(
        goal="Build a FastAPI TODO app",
        model="openai/gpt-4o",
        test_command="pytest",
    )
    loop.run()
    ```
"""

from __future__ import annotations

from typing import Any, Dict, TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.ralph.loop import RalphLoop
    from upsonic.ralph.config import RalphConfig
    from upsonic.ralph.result import RalphLoopResult, IterationRecord


def _get_ralph_loop():
    """Lazy import of RalphLoop class."""
    from upsonic.ralph.loop import RalphLoop
    return RalphLoop


def _get_ralph_config():
    """Lazy import of RalphConfig class."""
    from upsonic.ralph.config import RalphConfig
    return RalphConfig


def _get_ralph_result():
    """Lazy import of RalphLoopResult class."""
    from upsonic.ralph.result import RalphLoopResult
    return RalphLoopResult


def __getattr__(name: str) -> Any:
    """Lazy loading of ralph module classes."""
    if name == "RalphLoop":
        return _get_ralph_loop()
    elif name == "RalphConfig":
        return _get_ralph_config()
    elif name == "RalphLoopResult":
        return _get_ralph_result()
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Available: RalphLoop, RalphConfig, RalphLoopResult"
    )


__all__ = [
    "RalphLoop",
    "RalphConfig",
    "RalphLoopResult",
]
