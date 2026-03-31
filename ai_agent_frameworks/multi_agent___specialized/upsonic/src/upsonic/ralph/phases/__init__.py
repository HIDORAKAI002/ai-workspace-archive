"""
Phase controllers for RalphLoop.

Phases represent distinct stages of the RalphLoop execution:
- RequirementsPhase: Generate specifications from goal
- TodoPhase: Create prioritized TODO list
- IncrementalPhase: Main loop executing one task per iteration
"""

from __future__ import annotations

from typing import Any, TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.ralph.phases.base import BasePhase, PhaseResult
    from upsonic.ralph.phases.requirements import RequirementsPhase
    from upsonic.ralph.phases.todo import TodoPhase
    from upsonic.ralph.phases.incremental import IncrementalPhase


def _get_base_phase():
    """Lazy import of BasePhase."""
    from upsonic.ralph.phases.base import BasePhase
    return BasePhase


def _get_requirements_phase():
    """Lazy import of RequirementsPhase."""
    from upsonic.ralph.phases.requirements import RequirementsPhase
    return RequirementsPhase


def _get_todo_phase():
    """Lazy import of TodoPhase."""
    from upsonic.ralph.phases.todo import TodoPhase
    return TodoPhase


def _get_incremental_phase():
    """Lazy import of IncrementalPhase."""
    from upsonic.ralph.phases.incremental import IncrementalPhase
    return IncrementalPhase


def __getattr__(name: str) -> Any:
    """Lazy loading of phase classes."""
    if name == "BasePhase":
        return _get_base_phase()
    elif name == "RequirementsPhase":
        return _get_requirements_phase()
    elif name == "TodoPhase":
        return _get_todo_phase()
    elif name == "IncrementalPhase":
        return _get_incremental_phase()
    
    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")


__all__ = [
    "BasePhase",
    "RequirementsPhase",
    "TodoPhase",
    "IncrementalPhase",
]
