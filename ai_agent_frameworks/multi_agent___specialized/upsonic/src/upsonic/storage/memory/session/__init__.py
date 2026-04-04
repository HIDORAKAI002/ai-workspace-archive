"""Session memory module for Upsonic agent framework."""
from __future__ import annotations
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .base import BaseSessionMemory, PreparedSessionInputs
    from .agent import AgentSessionMemory


def __getattr__(name: str) -> Any:
    """Lazy loading of session memory classes."""
    if name == "BaseSessionMemory":
        from .base import BaseSessionMemory
        return BaseSessionMemory
    
    if name == "PreparedSessionInputs":
        from .base import PreparedSessionInputs
        return PreparedSessionInputs
    
    if name == "AgentSessionMemory":
        from .agent import AgentSessionMemory
        return AgentSessionMemory
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
    )


__all__ = [
    "BaseSessionMemory",
    "PreparedSessionInputs",
    "AgentSessionMemory",
]

