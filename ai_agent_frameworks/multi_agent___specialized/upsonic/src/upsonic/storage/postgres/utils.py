"""Utility functions for PostgreSQL storage implementations."""
from typing import Any, Dict, List, Optional, Set

try:
    from sqlalchemy import Table, func
    from sqlalchemy.engine import Engine
    from sqlalchemy.exc import NoSuchTableError
    from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession
    from sqlalchemy.inspection import inspect
    from sqlalchemy.orm import Session
    from sqlalchemy.sql.expression import text
except ImportError:
    raise ImportError(
        "`sqlalchemy` not installed. Please install it using "
        "`pip install sqlalchemy asyncpg`"
    )

from upsonic.storage.postgres.schemas import get_table_schema_definition
from upsonic.utils.logging_config import get_logger

_logger = get_logger("upsonic.storage.postgres.utils")


# ======================== Schema Creation ========================

def create_schema(session: Session, db_schema: str) -> None:
    """
    Create the database schema if it doesn't exist (sync).
    
    Args:
        session: SQLAlchemy session
        db_schema: Schema name to create
    """
    try:
        _logger.debug(f"Creating schema if not exists: {db_schema}")
        session.execute(text(f'CREATE SCHEMA IF NOT EXISTS "{db_schema}";'))
    except Exception as e:
        _logger.warning(f"Could not create schema {db_schema}: {e}")


async def acreate_schema(session: AsyncSession, db_schema: str) -> None:
    """
    Create the database schema if it doesn't exist (async).
    
    Args:
        session: SQLAlchemy async session
        db_schema: Schema name to create
    """
    try:
        _logger.debug(f"Creating schema if not exists: {db_schema}")
        await session.execute(text(f'CREATE SCHEMA IF NOT EXISTS "{db_schema}";'))
    except Exception as e:
        _logger.warning(f"Could not create schema {db_schema}: {e}")


# ======================== Table Availability ========================

def is_table_available(session: Session, table_name: str, db_schema: str) -> bool:
    """
    Check if a table with the given name exists in the given schema (sync).
    
    Args:
        session: SQLAlchemy session
        table_name: Name of the table to check
        db_schema: PostgreSQL schema name
    
    Returns:
        True if table exists, False otherwise
    """
    try:
        exists_query = text(
            "SELECT 1 FROM information_schema.tables "
            "WHERE table_schema = :schema AND table_name = :table"
        )
        exists = session.execute(
            exists_query, 
            {"schema": db_schema, "table": table_name}
        ).scalar() is not None
        return exists
    except Exception as e:
        _logger.error(f"Error checking if table exists: {e}")
        return False


async def ais_table_available(session: AsyncSession, table_name: str, db_schema: str) -> bool:
    """
    Check if a table with the given name exists in the given schema (async).
    
    Args:
        session: SQLAlchemy async session
        table_name: Name of the table to check
        db_schema: PostgreSQL schema name
    
    Returns:
        True if table exists, False otherwise
    """
    try:
        exists_query = text(
            "SELECT 1 FROM information_schema.tables "
            "WHERE table_schema = :schema AND table_name = :table"
        )
        result = await session.execute(
            exists_query, 
            {"schema": db_schema, "table": table_name}
        )
        exists = result.scalar() is not None
        return exists
    except Exception as e:
        _logger.error(f"Error checking if table exists: {e}")
        return False


# ======================== Table Validation ========================

def _get_table_columns(conn: Any, table_name: str, db_schema: str) -> Set[str]:
    """Helper function to get table columns using sync inspector."""
    inspector = inspect(conn)
    columns_info = inspector.get_columns(table_name, schema=db_schema)
    return {col["name"] for col in columns_info}


def is_valid_table(
    db_engine: Engine, 
    table_name: str, 
    table_type: str, 
    db_schema: str
) -> bool:
    """
    Check if the existing table has the expected column names (sync).
    
    Args:
        db_engine: SQLAlchemy engine
        table_name: Name of the table to validate
        table_type: Type of table for schema lookup
        db_schema: Database schema name
    
    Returns:
        True if table has all expected columns, False otherwise
    """
    try:
        expected_table_schema = get_table_schema_definition(table_type)
        expected_columns = {
            col_name for col_name in expected_table_schema.keys() 
            if not col_name.startswith("_")
        }

        # Get existing columns using inspector
        inspector = inspect(db_engine)
        existing_columns_info = inspector.get_columns(table_name, schema=db_schema)
        existing_columns = {col["name"] for col in existing_columns_info}

        # Check if all expected columns exist
        missing_columns = expected_columns - existing_columns
        if missing_columns:
            _logger.warning(
                f"Missing columns {missing_columns} in table {db_schema}.{table_name}"
            )
            return False

        return True
    except NoSuchTableError:
        _logger.error(f"Table {db_schema}.{table_name} does not exist")
        return False
    except Exception as e:
        _logger.error(f"Error validating table schema for {db_schema}.{table_name}: {e}")
        return False


async def ais_valid_table(
    db_engine: AsyncEngine, 
    table_name: str, 
    table_type: str, 
    db_schema: str
) -> bool:
    """
    Check if the existing table has the expected column names (async).
    
    Args:
        db_engine: SQLAlchemy async engine
        table_name: Name of the table to validate
        table_type: Type of table for schema lookup
        db_schema: Database schema name
    
    Returns:
        True if table has all expected columns, False otherwise
    """
    try:
        expected_table_schema = get_table_schema_definition(table_type)
        expected_columns = {
            col_name for col_name in expected_table_schema.keys() 
            if not col_name.startswith("_")
        }

        # Get existing columns from the async engine
        async with db_engine.connect() as conn:
            existing_columns = await conn.run_sync(
                _get_table_columns, 
                table_name, 
                db_schema
            )

        # Check if all expected columns exist
        missing_columns = expected_columns - existing_columns
        if missing_columns:
            _logger.warning(
                f"Missing columns {missing_columns} in table {db_schema}.{table_name}"
            )
            return False

        return True
    except NoSuchTableError:
        _logger.error(f"Table {db_schema}.{table_name} does not exist")
        return False
    except Exception as e:
        _logger.error(f"Error validating table schema for {db_schema}.{table_name}: {e}")
        return False


# ======================== Sorting ========================

def apply_sorting(
    stmt: Any,
    table: Table,
    sort_by: Optional[str],
    sort_order: Optional[str],
) -> Any:
    """
    Apply sorting to the given SQLAlchemy statement.
    
    Args:
        stmt: The SQLAlchemy statement to modify
        table: The table being queried
        sort_by: The field to sort by
        sort_order: The sort order ('asc' or 'desc')
    
    Returns:
        The modified statement with sorting applied
    
    Note:
        For 'updated_at' sorting, uses COALESCE(updated_at, created_at) to fall back
        to created_at when updated_at is NULL. This ensures records that may
        have NULL updated_at are sorted correctly by their creation time.
    """
    if sort_by is None:
        # Default sort by created_at desc if no sort_by specified
        if hasattr(table.c, "created_at"):
            return stmt.order_by(table.c.created_at.desc())
        return stmt

    if not hasattr(table.c, sort_by):
        _logger.debug(f"Invalid sort field: '{sort_by}'. Will not apply any sorting.")
        return stmt

    # For updated_at, use COALESCE to fall back to created_at if updated_at is NULL
    # This handles records that may have NULL updated_at values
    if sort_by == "updated_at" and hasattr(table.c, "created_at"):
        sort_column = func.coalesce(table.c.updated_at, table.c.created_at)
    else:
        sort_column = getattr(table.c, sort_by)

    if sort_order and sort_order.lower() == "asc":
        return stmt.order_by(sort_column.asc())
    else:
        return stmt.order_by(sort_column.desc())


# ======================== Sanitization ========================

def sanitize_postgres_string(value: Optional[str]) -> Optional[str]:
    """
    Sanitize a string for PostgreSQL by removing null bytes.
    
    PostgreSQL does not allow null bytes (\\x00) in text fields.
    This function removes them to prevent database errors.
    
    Args:
        value: String to sanitize
    
    Returns:
        Sanitized string with null bytes removed
    """
    if value is None:
        return None
    return value.replace("\x00", "")


def sanitize_postgres_dict(data: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """
    Recursively sanitize a dictionary for PostgreSQL by removing null bytes from strings.
    
    Args:
        data: Dictionary to sanitize
    
    Returns:
        Sanitized dictionary
    """
    if data is None:
        return None
    
    result: Dict[str, Any] = {}
    for key, value in data.items():
        if isinstance(value, str):
            result[key] = sanitize_postgres_string(value)
        elif isinstance(value, dict):
            result[key] = sanitize_postgres_dict(value)
        elif isinstance(value, list):
            result[key] = sanitize_postgres_list(value)
        else:
            result[key] = value
    return result


def sanitize_postgres_list(data: Optional[List[Any]]) -> Optional[List[Any]]:
    """
    Recursively sanitize a list for PostgreSQL by removing null bytes from strings.
    
    Args:
        data: List to sanitize
    
    Returns:
        Sanitized list
    """
    if data is None:
        return None
    
    result: List[Any] = []
    for item in data:
        if isinstance(item, str):
            result.append(sanitize_postgres_string(item))
        elif isinstance(item, dict):
            result.append(sanitize_postgres_dict(item))
        elif isinstance(item, list):
            result.append(sanitize_postgres_list(item))
        else:
            result.append(item)
    return result
