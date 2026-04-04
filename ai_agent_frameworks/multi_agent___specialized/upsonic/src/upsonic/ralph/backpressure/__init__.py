"""
Backpressure system for RalphLoop.

Backpressure gates ensure code changes pass validation (build, test, lint)
before the loop iteration can complete.
"""

from __future__ import annotations

from typing import Any, TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.ralph.backpressure.gate import BackpressureGate, BackpressureResult


def _get_backpressure_gate():
    """Lazy import of BackpressureGate."""
    from upsonic.ralph.backpressure.gate import BackpressureGate
    return BackpressureGate


def _get_backpressure_result():
    """Lazy import of BackpressureResult."""
    from upsonic.ralph.backpressure.gate import BackpressureResult
    return BackpressureResult


def __getattr__(name: str) -> Any:
    """Lazy loading of backpressure classes."""
    if name == "BackpressureGate":
        return _get_backpressure_gate()
    elif name == "BackpressureResult":
        return _get_backpressure_result()
    
    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")


__all__ = [
    "BackpressureGate",
    "BackpressureResult",
]
