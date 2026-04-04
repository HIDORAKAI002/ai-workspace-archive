"""MongoDB storage module for Upsonic agent framework.

This module provides both sync and async MongoDB storage backends for persisting
agent sessions and user memory data.
"""
from __future__ import annotations

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .async_mongo import AsyncMongoStorage
    from .mongo import MongoStorage


def _get_mongo_storage_classes() -> dict[str, Any]:
    """Lazy import of MongoDB storage classes."""
    from .async_mongo import AsyncMongoStorage
    from .mongo import MongoStorage

    return {
        "AsyncMongoStorage": AsyncMongoStorage,
        "MongoStorage": MongoStorage,
    }


def __getattr__(name: str) -> Any:
    """Lazy loading of heavy modules and classes."""
    mongo_classes = _get_mongo_storage_classes()
    if name in mongo_classes:
        return mongo_classes[name]

    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Please import from the appropriate sub-module."
    )


__all__ = [
    "AsyncMongoStorage",
    "MongoStorage",
]

