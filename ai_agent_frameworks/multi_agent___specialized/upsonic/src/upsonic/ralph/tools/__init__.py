"""
RalphLoop-specific tools.

These tools are used by the primary agent during RalphLoop execution:
- SubagentSpawner: Spawn disposable worker agents
- PlanUpdater: Update fix_plan.md
- LearningsUpdater: Update AGENT.md
- BackpressureExecutor: Run build/test validation
- RalphFilesystemToolKit: File operations for subagents
"""

from __future__ import annotations

from typing import Any, TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.ralph.tools.subagent_spawner import SubagentSpawnerToolKit
    from upsonic.ralph.tools.plan_updater import PlanUpdaterToolKit
    from upsonic.ralph.tools.learnings_updater import LearningsUpdaterToolKit
    from upsonic.ralph.tools.backpressure import BackpressureToolKit
    from upsonic.ralph.tools.filesystem import RalphFilesystemToolKit


def _get_subagent_spawner():
    """Lazy import of SubagentSpawnerToolKit."""
    from upsonic.ralph.tools.subagent_spawner import SubagentSpawnerToolKit
    return SubagentSpawnerToolKit


def _get_plan_updater():
    """Lazy import of PlanUpdaterToolKit."""
    from upsonic.ralph.tools.plan_updater import PlanUpdaterToolKit
    return PlanUpdaterToolKit


def _get_learnings_updater():
    """Lazy import of LearningsUpdaterToolKit."""
    from upsonic.ralph.tools.learnings_updater import LearningsUpdaterToolKit
    return LearningsUpdaterToolKit


def _get_backpressure_toolkit():
    """Lazy import of BackpressureToolKit."""
    from upsonic.ralph.tools.backpressure import BackpressureToolKit
    return BackpressureToolKit


def _get_filesystem_toolkit():
    """Lazy import of RalphFilesystemToolKit."""
    from upsonic.ralph.tools.filesystem import RalphFilesystemToolKit
    return RalphFilesystemToolKit


def __getattr__(name: str) -> Any:
    """Lazy loading of tool classes."""
    if name == "SubagentSpawnerToolKit":
        return _get_subagent_spawner()
    elif name == "PlanUpdaterToolKit":
        return _get_plan_updater()
    elif name == "LearningsUpdaterToolKit":
        return _get_learnings_updater()
    elif name == "BackpressureToolKit":
        return _get_backpressure_toolkit()
    elif name == "RalphFilesystemToolKit":
        return _get_filesystem_toolkit()
    
    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")


__all__ = [
    "SubagentSpawnerToolKit",
    "PlanUpdaterToolKit",
    "LearningsUpdaterToolKit",
    "BackpressureToolKit",
    "RalphFilesystemToolKit",
]
