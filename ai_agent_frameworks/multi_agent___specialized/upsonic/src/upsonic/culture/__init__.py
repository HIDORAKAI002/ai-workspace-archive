"""
Culture module for Upsonic AI Agent Framework.

This module provides culture management capabilities that enable
agents to follow specific behavioral guidelines, communication styles,
and interaction principles defined by users.

"""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .culture import Culture
    from .manager import CultureManager


def _get_culture_classes():
    """Lazy import of culture classes."""
    from .culture import Culture
    from .manager import CultureManager
    
    return {
        'Culture': Culture,
        'CultureManager': CultureManager,
    }


def __getattr__(name: str) -> Any:
    """Lazy loading of culture classes."""
    culture_classes = _get_culture_classes()
    if name in culture_classes:
        return culture_classes[name]
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Available: {list(culture_classes.keys())}"
    )


__all__ = [
    "Culture",
    "CultureManager",
]
