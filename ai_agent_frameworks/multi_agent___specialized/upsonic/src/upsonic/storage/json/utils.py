"""Utility functions for JSON storage operations."""
from __future__ import annotations

from typing import Any, Dict, List, Optional

from upsonic.utils.logging_config import get_logger

_logger = get_logger("upsonic.storage.json")

def get_sort_value(record: Dict[str, Any], sort_by: str) -> Any:
    """
    Get the sort value for a record, with fallback to created_at for updated_at.
    
    When sorting by 'updated_at', this function falls back to 'created_at' if
    'updated_at' is None. This ensures records with NULL updated_at values
    are sorted correctly by their creation time.
    
    Args:
        record: The record dictionary to get the sort value from.
        sort_by: The field to sort by.
    
    Returns:
        The value to use for sorting.
    """
    value = record.get(sort_by)
    # For updated_at, fall back to created_at if updated_at is None
    if value is None and sort_by == "updated_at":
        value = record.get("created_at")
    return value


def apply_sorting(
    data: List[Dict[str, Any]],
    sort_by: Optional[str] = None,
    sort_order: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Apply sorting to a list of dictionaries.
    
    Args:
        data: List of dictionaries to sort.
        sort_by: Field name to sort by (e.g., "created_at", "updated_at").
        sort_order: Sort order - "asc" or "desc". Defaults to "desc" if not specified.
    
    Returns:
        Sorted list of dictionaries.
    
    Note:
        If sorting by "updated_at", will fallback to "created_at" in case of None.
        If sort_by is None or data is empty, returns the original data unchanged.
    """
    if sort_by is None or not data:
        return data

    # Check if the sort field exists in the first item
    if sort_by not in data[0]:
        _logger.debug(f"Invalid sort field: '{sort_by}'. Will not apply any sorting.")
        return data

    try:
        is_descending = sort_order != "asc" if sort_order else True

        # Sort using the helper function that handles updated_at -> created_at fallback
        # Tuple key (value is None, value) pushes None values to the end
        sorted_records = sorted(
            data,
            key=lambda x: (get_sort_value(x, sort_by) is None, get_sort_value(x, sort_by)),
            reverse=is_descending,
        )

        return sorted_records

    except Exception as e:
        _logger.debug(f"Error sorting data by '{sort_by}': {e}")
        return data


def filter_sessions(
    sessions: List[Dict[str, Any]],
    session_ids: Optional[List[str]] = None,
    session_type: Optional[str] = None,
    user_id: Optional[str] = None,
    agent_id: Optional[str] = None,
    team_id: Optional[str] = None,
    workflow_id: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Filter sessions based on provided criteria.
    
    Args:
        sessions: List of session dictionaries to filter.
        session_ids: Optional list of session IDs to filter by.
        session_type: Optional session type to filter by.
        user_id: Optional user ID to filter by.
        agent_id: Optional agent ID to filter by.
        team_id: Optional team ID to filter by.
        workflow_id: Optional workflow ID to filter by.
    
    Returns:
        Filtered list of session dictionaries.
    """
    filtered = sessions
    
    if session_ids is not None:
        if len(session_ids) == 0:
            # Empty list means return nothing
            return []
        filtered = [s for s in filtered if s.get("session_id") in session_ids]
    
    if session_type is not None:
        # Handle session_type as string or dict
        def matches_type(s: Dict[str, Any]) -> bool:
            st = s.get("session_type")
            if isinstance(st, dict):
                return st.get("session_type") == session_type
            return st == session_type
        
        filtered = [s for s in filtered if matches_type(s)]
    
    if user_id is not None:
        filtered = [s for s in filtered if s.get("user_id") == user_id]
    
    if agent_id is not None:
        filtered = [s for s in filtered if s.get("agent_id") == agent_id]
    
    if team_id is not None:
        filtered = [s for s in filtered if s.get("team_id") == team_id]
    
    if workflow_id is not None:
        filtered = [s for s in filtered if s.get("workflow_id") == workflow_id]
    
    return filtered


def filter_user_memories(
    memories: List[Dict[str, Any]],
    user_ids: Optional[List[str]] = None,
    agent_id: Optional[str] = None,
    team_id: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Filter user memories based on provided criteria.
    
    Args:
        memories: List of user memory dictionaries to filter.
        user_ids: Optional list of user IDs to filter by.
        agent_id: Optional agent ID to filter by.
        team_id: Optional team ID to filter by.
    
    Returns:
        Filtered list of user memory dictionaries.
    """
    filtered = memories
    
    if user_ids is not None:
        if len(user_ids) == 0:
            # Empty list means return nothing
            return []
        filtered = [m for m in filtered if m.get("user_id") in user_ids]
    
    if agent_id is not None:
        filtered = [m for m in filtered if m.get("agent_id") == agent_id]
    
    if team_id is not None:
        filtered = [m for m in filtered if m.get("team_id") == team_id]
    
    return filtered


def apply_pagination(
    data: List[Dict[str, Any]],
    limit: Optional[int] = None,
    offset: Optional[int] = None,
) -> List[Dict[str, Any]]:
    """
    Apply pagination to a list of dictionaries.
    
    Args:
        data: List of dictionaries to paginate.
        limit: Maximum number of items to return.
        offset: Number of items to skip.
    
    Returns:
        Paginated list of dictionaries.
    """
    if not data:
        return data
    
    if limit is None:
        return data
    
    start_idx = offset or 0
    end_idx = start_idx + limit
    
    return data[start_idx:end_idx]

