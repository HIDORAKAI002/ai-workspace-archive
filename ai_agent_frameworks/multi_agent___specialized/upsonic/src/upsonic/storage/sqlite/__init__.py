"""SQLite storage provider for Upsonic agent framework."""
from __future__ import annotations
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .async_sqlite import AsyncSqliteStorage
    from .sqlite import SqliteStorage


def _get_sqlite_classes() -> dict[str, Any]:
    """Lazy import of SQLite storage classes."""
    from .async_sqlite import AsyncSqliteStorage
    from .sqlite import SqliteStorage
    
    return {
        "AsyncSqliteStorage": AsyncSqliteStorage,
        "SqliteStorage": SqliteStorage,
    }


def __getattr__(name: str) -> Any:
    """Lazy loading of SQLite storage classes."""
    sqlite_classes = _get_sqlite_classes()
    if name in sqlite_classes:
        return sqlite_classes[name]
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Available: {list(sqlite_classes.keys())}"
    )


__all__ = [
    "AsyncSqliteStorage",
    "SqliteStorage",
]

