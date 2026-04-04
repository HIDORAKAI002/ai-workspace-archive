"""Culture memory module for storing and retrieving cultural knowledge."""
from __future__ import annotations

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .base import BaseCultureMemory
    from .culture import CultureMemory


def _get_culture_memory_classes():
    """Lazy import of culture memory classes."""
    from .base import BaseCultureMemory
    from .culture import CultureMemory
    
    return {
        'BaseCultureMemory': BaseCultureMemory,
        'CultureMemory': CultureMemory,
    }


def __getattr__(name: str) -> Any:
    """Lazy loading of culture memory classes."""
    culture_classes = _get_culture_memory_classes()
    if name in culture_classes:
        return culture_classes[name]
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Available: {list(culture_classes.keys())}"
    )


__all__ = [
    "BaseCultureMemory",
    "CultureMemory",
]
