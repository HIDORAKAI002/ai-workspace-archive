"""Redis storage module for Upsonic agent framework.

This module provides Redis-based storage backend for persisting
agent sessions and user memory data.
"""
from __future__ import annotations
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .redis import RedisStorage
    from .schemas import SESSION_SCHEMA, USER_MEMORY_SCHEMA


def _get_redis_classes() -> dict[str, Any]:
    """Lazy import of Redis storage classes."""
    from .redis import RedisStorage
    
    return {
        "RedisStorage": RedisStorage,
    }


def _get_schema_classes() -> dict[str, Any]:
    """Lazy import of schema definitions."""
    from .schemas import SESSION_SCHEMA, USER_MEMORY_SCHEMA
    
    return {
        "SESSION_SCHEMA": SESSION_SCHEMA,
        "USER_MEMORY_SCHEMA": USER_MEMORY_SCHEMA,
    }


def __getattr__(name: str) -> Any:
    """Lazy loading of heavy modules and classes."""
    redis_classes = _get_redis_classes()
    if name in redis_classes:
        return redis_classes[name]
    
    schema_classes = _get_schema_classes()
    if name in schema_classes:
        return schema_classes[name]
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Available: RedisStorage, SESSION_SCHEMA, USER_MEMORY_SCHEMA"
    )


__all__ = [
    "RedisStorage",
    "SESSION_SCHEMA",
    "USER_MEMORY_SCHEMA",
]

