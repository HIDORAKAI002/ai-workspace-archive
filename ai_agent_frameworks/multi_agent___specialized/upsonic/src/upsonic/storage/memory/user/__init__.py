"""User memory module for Upsonic agent framework."""
from __future__ import annotations
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .base import BaseUserMemory
    from .user import UserMemory


def __getattr__(name: str) -> Any:
    """Lazy loading of user memory classes."""
    if name == "BaseUserMemory":
        from .base import BaseUserMemory
        return BaseUserMemory
    
    if name == "UserMemory":
        from .user import UserMemory
        return UserMemory
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
    )


__all__ = [
    "BaseUserMemory",
    "UserMemory",
]

