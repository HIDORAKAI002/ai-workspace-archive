"""
State management for RalphLoop.

This module handles reading/writing state files (PROMPT.md, specs/, fix_plan.md, AGENT.md)
that persist across loop iterations.
"""

from __future__ import annotations

from typing import Any, TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.ralph.state.manager import StateManager
    from upsonic.ralph.state.models import RalphState


def _get_state_manager():
    """Lazy import of StateManager."""
    from upsonic.ralph.state.manager import StateManager
    return StateManager


def _get_ralph_state():
    """Lazy import of RalphState."""
    from upsonic.ralph.state.models import RalphState
    return RalphState


def __getattr__(name: str) -> Any:
    """Lazy loading of state module classes."""
    if name == "StateManager":
        return _get_state_manager()
    elif name == "RalphState":
        return _get_ralph_state()
    
    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")


__all__ = [
    "StateManager",
    "RalphState",
]
