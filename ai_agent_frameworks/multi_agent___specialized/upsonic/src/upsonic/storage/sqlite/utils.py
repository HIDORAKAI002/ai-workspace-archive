"""Utility functions for SQLite storage implementations."""
from typing import Any, Optional

from sqlalchemy import text
from sqlalchemy.schema import Table


async def is_table_available_async(
    session: Any,
    table_name: str,
) -> bool:
    """Check if a table exists in SQLite database (async)."""
    query = text(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=:table_name"
    )
    result = await session.execute(query, {"table_name": table_name})
    return result.scalar() is not None


def is_table_available_sync(
    session: Any,
    table_name: str,
) -> bool:
    """Check if a table exists in SQLite database (sync)."""
    query = text(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=:table_name"
    )
    result = session.execute(query, {"table_name": table_name})
    return result.scalar() is not None


def apply_sorting(
    stmt: Any,
    table: Table,
    sort_by: Optional[str],
    sort_order: Optional[str],
) -> Any:
    """Apply sorting to a SQLAlchemy statement."""
    if sort_by and hasattr(table.c, sort_by):
        column = getattr(table.c, sort_by)
        if sort_order and sort_order.lower() == "desc":
            stmt = stmt.order_by(column.desc())
        else:
            stmt = stmt.order_by(column.asc())
    else:
        # Default sort by created_at desc
        if hasattr(table.c, "created_at"):
            stmt = stmt.order_by(table.c.created_at.desc())
    return stmt