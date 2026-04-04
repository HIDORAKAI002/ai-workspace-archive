from __future__ import annotations

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .async_postgres import AsyncPostgresStorage
    from .postgres import PostgresStorage
    from .schemas import (
        SESSION_TABLE_SCHEMA,
        USER_MEMORY_TABLE_SCHEMA,
        get_table_schema_definition,
    )


def _get_async_postgres_storage() -> type:
    """Lazy import of AsyncPostgresStorage."""
    from .async_postgres import AsyncPostgresStorage
    return AsyncPostgresStorage


def _get_postgres_storage() -> type:
    """Lazy import of PostgresStorage (sync)."""
    from .postgres import PostgresStorage
    return PostgresStorage


def _get_schemas() -> dict[str, Any]:
    """Lazy import of schema definitions."""
    from .schemas import (
        SESSION_TABLE_SCHEMA,
        USER_MEMORY_TABLE_SCHEMA,
        get_table_schema_definition,
    )
    return {
        "SESSION_TABLE_SCHEMA": SESSION_TABLE_SCHEMA,
        "USER_MEMORY_TABLE_SCHEMA": USER_MEMORY_TABLE_SCHEMA,
        "get_table_schema_definition": get_table_schema_definition,
    }


def __getattr__(name: str) -> Any:
    """Lazy loading of heavy modules and classes."""
    if name == "AsyncPostgresStorage":
        return _get_async_postgres_storage()
    
    if name == "PostgresStorage":
        return _get_postgres_storage()
    
    schemas = _get_schemas()
    if name in schemas:
        return schemas[name]
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Available: AsyncPostgresStorage, PostgresStorage, SESSION_TABLE_SCHEMA, "
        f"USER_MEMORY_TABLE_SCHEMA, get_table_schema_definition"
    )


__all__ = [
    "AsyncPostgresStorage",
    "PostgresStorage",
    "SESSION_TABLE_SCHEMA",
    "USER_MEMORY_TABLE_SCHEMA",
    "get_table_schema_definition",
]

