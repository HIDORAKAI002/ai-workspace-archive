"""Utility functions for Redis storage operations.

This module provides helper functions for:
- Key generation
- Data serialization/deserialization  
- Index management
- Filtering, sorting, and pagination
"""
from __future__ import annotations

import json
from datetime import date, datetime
from typing import TYPE_CHECKING, Any, Dict, List, Optional, Union
from uuid import UUID

from upsonic.utils.logging_config import get_logger

if TYPE_CHECKING:
    from redis import Redis, RedisCluster

_logger = get_logger("upsonic.storage.redis.utils")


def log_warning(msg: str) -> None:
    """Log warning message."""
    _logger.warning(msg)


# --- Serialization ---


class CustomEncoder(json.JSONEncoder):
    """
    Custom JSON encoder to handle non-standard JSON types.
    
    Handles:
        - UUID: Converted to string
        - date/datetime: Converted to ISO format string
    """
    
    def default(self, obj: Any) -> Any:
        """
        Encode non-standard types.
        
        Args:
            obj: Object to encode
        
        Returns:
            JSON-serializable representation
        """
        if isinstance(obj, UUID):
            return str(obj)
        elif isinstance(obj, (date, datetime)):
            return obj.isoformat()
        
        return super().default(obj)


def serialize_data(data: Dict[str, Any]) -> str:
    """
    Serialize a dictionary to JSON string for Redis storage.
    
    Uses CustomEncoder to handle UUID, date, datetime types.
    
    Args:
        data: Dictionary to serialize
    
    Returns:
        JSON string representation
    """
    return json.dumps(data, ensure_ascii=False, cls=CustomEncoder)


def deserialize_data(data: Union[str, bytes]) -> Dict[str, Any]:
    """
    Deserialize a JSON string/bytes from Redis to dictionary.
    
    Args:
        data: JSON string or bytes from Redis
    
    Returns:
        Deserialized dictionary
    """
    if isinstance(data, bytes):
        data = data.decode("utf-8")
    return json.loads(data)


# --- Key Generation ---


def generate_redis_key(
    prefix: str,
    table_type: str,
    key_id: str,
) -> str:
    """
    Generate a Redis key with consistent format.
    
    Format: {prefix}:{table_type}:{key_id}
    Example: "upsonic:sessions:abc123"
    
    Args:
        prefix: Database prefix (e.g., "upsonic")
        table_type: Type of table (e.g., "sessions", "user_memories")
        key_id: Unique identifier for the record
    
    Returns:
        Formatted Redis key string
    """
    return f"{prefix}:{table_type}:{key_id}"


def generate_index_key(
    prefix: str,
    table_type: str,
    field_name: str,
    field_value: str,
) -> str:
    """
    Generate an index key for field-based lookups.
    
    Format: {prefix}:{table_type}:index:{field_name}:{field_value}
    Example: "upsonic:sessions:index:user_id:user123"
    
    Args:
        prefix: Database prefix
        table_type: Type of table
        field_name: Name of the indexed field
        field_value: Value of the indexed field
    
    Returns:
        Formatted index key string
    """
    return f"{prefix}:{table_type}:index:{field_name}:{field_value}"


# --- Key Scanning ---


def get_all_keys_for_table(
    redis_client: Union["Redis", "RedisCluster"],
    prefix: str,
    table_type: str,
) -> List[str]:
    """
    Get all keys for a specific table type using SCAN.
    
    Uses scan_iter for memory-efficient iteration on large datasets.
    Filters out index keys automatically.
    
    Args:
        redis_client: Redis client instance
        prefix: Database prefix
        table_type: Type of table to scan
    
    Returns:
        List of matching Redis keys (excluding index keys)
    """
    pattern = f"{prefix}:{table_type}:*"
    relevant_keys: List[str] = []
    
    # Use scan_iter for memory-efficient iteration
    for key in redis_client.scan_iter(match=pattern):
        key_str = key.decode("utf-8") if isinstance(key, bytes) else key
        # Skip index keys
        if ":index:" not in key_str:
            relevant_keys.append(key_str)
    
    return relevant_keys


# --- Index Management ---


def create_index_entries(
    redis_client: Union["Redis", "RedisCluster"],
    prefix: str,
    table_type: str,
    record_id: str,
    record_data: Dict[str, Any],
    index_fields: List[str],
    expire: Optional[int] = None,
) -> None:
    """
    Create index entries for a record to enable field-based lookups.
    
    For each index field, creates a Redis SET that maps field values
    to record IDs, enabling efficient filtering.
    
    Args:
        redis_client: Redis client instance
        prefix: Database prefix
        table_type: Type of table
        record_id: ID of the record being indexed
        record_data: The full record data
        index_fields: List of field names to index
        expire: Optional TTL in seconds for index entries
    """
    for field in index_fields:
        if field in record_data and record_data[field] is not None:
            index_key = generate_index_key(prefix, table_type, field, str(record_data[field]))
            redis_client.sadd(index_key, record_id)
            if expire:
                redis_client.expire(index_key, expire)


def remove_index_entries(
    redis_client: Union["Redis", "RedisCluster"],
    prefix: str,
    table_type: str,
    record_id: str,
    record_data: Dict[str, Any],
    index_fields: List[str],
) -> None:
    """
    Remove index entries for a record being deleted.
    
    Args:
        redis_client: Redis client instance
        prefix: Database prefix
        table_type: Type of table
        record_id: ID of the record being removed
        record_data: The full record data (to find index values)
        index_fields: List of field names that were indexed
    """
    for field in index_fields:
        if field in record_data and record_data[field] is not None:
            index_key = generate_index_key(prefix, table_type, field, str(record_data[field]))
            redis_client.srem(index_key, record_id)


def get_records_by_index(
    redis_client: Union["Redis", "RedisCluster"],
    prefix: str,
    table_type: str,
    field_name: str,
    field_value: str,
) -> List[str]:
    """
    Get record IDs that match a specific field value using index.
    
    Args:
        redis_client: Redis client instance
        prefix: Database prefix
        table_type: Type of table
        field_name: Name of the indexed field
        field_value: Value to look up
    
    Returns:
        List of record IDs matching the field value
    """
    index_key = generate_index_key(prefix, table_type, field_name, field_value)
    members = redis_client.smembers(index_key)
    return [m.decode("utf-8") if isinstance(m, bytes) else m for m in members]


# --- Filtering ---


def apply_filters(
    records: List[Dict[str, Any]],
    conditions: Dict[str, Any],
) -> List[Dict[str, Any]]:
    """
    Filter records based on field conditions.
    
    Args:
        records: List of records to filter
        conditions: Dictionary of field_name -> expected_value
    
    Returns:
        Filtered list of records matching all conditions
    """
    if not conditions:
        return records
    
    filtered_records: List[Dict[str, Any]] = []
    for record in records:
        match = True
        for key, value in conditions.items():
            if key not in record or record[key] != value:
                match = False
                break
        if match:
            filtered_records.append(record)
    
    return filtered_records


# --- Sorting ---


def get_sort_value(
    record: Dict[str, Any],
    sort_by: str,
) -> Any:
    """
    Get the value to sort by from a record.
    
    Handles special case where sort_by is "updated_at" but the value
    is None - falls back to "created_at" in that case.
    
    Args:
        record: The record dictionary
        sort_by: The field to sort by
    
    Returns:
        The value to use for sorting
    """
    value = record.get(sort_by)
    
    # Fallback: if sorting by updated_at and it's None, use created_at
    if sort_by == "updated_at" and value is None:
        value = record.get("created_at")
    
    return value


def apply_sorting(
    records: List[Dict[str, Any]],
    sort_by: Optional[str] = None,
    sort_order: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Sort records by a specified field.
    
    Args:
        records: List of records to sort
        sort_by: Field name to sort by (default: "updated_at")
        sort_order: Sort order - "asc" or "desc" (default: "desc")
    
    Returns:
        Sorted list of records
    
    Note:
        If sorting by "updated_at" and value is None, falls back to "created_at".
    """
    if sort_by is None or not records:
        return records
    
    try:
        is_descending = sort_order == "desc"
        
        # Sort using the helper function that handles updated_at -> created_at fallback
        # The tuple (is_none, value) ensures None values are sorted last
        sorted_records = sorted(
            records,
            key=lambda x: (get_sort_value(x, sort_by) is None, get_sort_value(x, sort_by)),
            reverse=is_descending,
        )
        
        return sorted_records
    except Exception as e:
        log_warning(f"Error sorting records: {e}")
        return records


# --- Pagination ---


def apply_pagination(
    records: List[Dict[str, Any]],
    limit: Optional[int] = None,
    offset: Optional[int] = None,
    page: Optional[int] = None,
) -> List[Dict[str, Any]]:
    """
    Apply pagination (limit/offset or limit/page) to a list of records.
    
    Supports two pagination modes:
        1. Offset-based: Use limit + offset
        2. Page-based: Use limit + page (1-indexed)
    
    If both offset and page are provided, page takes precedence.
    
    Args:
        records: List of records to paginate
        limit: Maximum number of records to return
        offset: Number of records to skip (for offset-based pagination)
        page: Page number, 1-indexed (for page-based pagination)
    
    Returns:
        Paginated subset of records
    """
    if limit is None:
        return records
    
    # Page-based pagination takes precedence
    if page is not None and page > 0:
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        return records[start_idx:end_idx]
    
    # Offset-based pagination
    if offset is not None:
        start_idx = offset
        end_idx = offset + limit
        return records[start_idx:end_idx]
    
    # Just limit, no offset/page
    return records[:limit]
