"""Mem0 storage module for Upsonic agent framework.

This module provides storage backends using Mem0 for persisting
agent sessions and user memory data.

Supports both:
- Self-hosted Mem0 (via Memory/AsyncMemory class)
- Mem0 Platform (via MemoryClient/AsyncMemoryClient class)
"""
from __future__ import annotations
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .async_mem0 import AsyncMem0Storage
    from .mem0 import Mem0Storage


def _get_mem0_classes() -> dict[str, Any]:
    """Lazy import of Mem0 storage classes."""
    from .async_mem0 import AsyncMem0Storage
    from .mem0 import Mem0Storage
    
    return {
        "Mem0Storage": Mem0Storage,
        "AsyncMem0Storage": AsyncMem0Storage,
    }


def __getattr__(name: str) -> Any:
    """Lazy loading of Mem0 storage classes."""
    classes = _get_mem0_classes()
    if name in classes:
        return classes[name]
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'"
    )


__all__ = [
    "Mem0Storage",
    "AsyncMem0Storage",
]

