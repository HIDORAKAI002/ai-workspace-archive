"""Utility functions for in-memory storage operations."""
from copy import deepcopy
from typing import Any, Dict, List, Optional

from upsonic.utils.logging_config import get_logger

_logger = get_logger("upsonic.storage.in_memory")


def get_sort_value(record: Dict[str, Any], sort_by: str) -> Any:
    """
    Get the value to sort by from a record, with fallback handling.
    
    Args:
        record: The dictionary record to get value from.
        sort_by: The field name to sort by.
    
    Returns:
        The value to use for sorting.
    
    Note:
        If sorting by "updated_at", will fallback to "created_at" in case of None.
    """
    value = record.get(sort_by)
    
    if sort_by == "updated_at" and value is None:
        value = record.get("created_at")
    
    return value


def apply_sorting(
    data: List[Dict[str, Any]],
    sort_by: Optional[str] = None,
    sort_order: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Apply sorting to the given data list.

    Args:
        data: The list of dictionaries to sort.
        sort_by: The field to sort by.
        sort_order: The sort order ('asc' or 'desc').

    Returns:
        The sorted list.

    Note:
        If sorting by "updated_at", will fallback to "created_at" in case of None.
    """
    if sort_by is None or not data:
        return data

    if sort_by not in data[0]:
        _logger.debug(f"Invalid sort field: '{sort_by}'. Will not apply any sorting.")
        return data

    try:
        is_descending = sort_order != "asc" if sort_order else True

        sorted_records = sorted(
            data,
            key=lambda x: (get_sort_value(x, sort_by) is None, get_sort_value(x, sort_by)),
            reverse=is_descending,
        )

        return sorted_records
    except Exception as e:
        _logger.debug(f"Error sorting data by '{sort_by}': {e}")
        return data


def apply_pagination(
    data: List[Dict[str, Any]],
    limit: Optional[int] = None,
    offset: Optional[int] = None,
) -> List[Dict[str, Any]]:
    """
    Apply pagination to the given data list.
    
    Args:
        data: The list of dictionaries to paginate.
        limit: Maximum number of items to return.
        offset: Number of items to skip.
    
    Returns:
        The paginated list.
    """
    if not data:
        return data
    
    start_idx = offset or 0
    
    if limit is not None:
        return data[start_idx:start_idx + limit]
    
    return data[start_idx:]


def deep_copy_record(record: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create a deep copy of a record to prevent mutation.
    
    Args:
        record: The dictionary record to copy.
    
    Returns:
        A deep copy of the record.
    """
    return deepcopy(record)


def deep_copy_records(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Create deep copies of all records in a list.
    
    Args:
        records: The list of dictionary records to copy.
    
    Returns:
        A list of deep copies of the records.
    """
    return [deepcopy(record) for record in records]

