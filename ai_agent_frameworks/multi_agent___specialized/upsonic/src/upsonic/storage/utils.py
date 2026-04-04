"""Common utility functions for storage operations."""
from __future__ import annotations

import json
from typing import TYPE_CHECKING, Any, Dict, List, Optional

if TYPE_CHECKING:
    from upsonic.session.base import Session, SessionType

# JSON fields in SESSION_TABLE_SCHEMA that need serialization/deserialization
SESSION_JSON_FIELDS: List[str] = [
    "session_data",
    "agent_data",
    "team_data",
    "workflow_data",
    "metadata",
    "runs",
    "messages",
]


def serialize_session_json_fields(session_dict: Dict[str, Any]) -> Dict[str, Any]:
    """
    Serialize JSON fields in a session dictionary for database storage.
    
    This function converts Python dict/list fields to JSON strings for
    database backends that require explicit JSON serialization.
    
    Args:
        session_dict: Session dictionary with potentially non-serialized JSON fields.
    
    Returns:
        Session dictionary with JSON fields serialized to strings.
    """
    result = session_dict.copy()
    
    for field in SESSION_JSON_FIELDS:
        if field in result and result[field] is not None:
            if not isinstance(result[field], str):
                try:
                    result[field] = json.dumps(result[field])
                except (TypeError, ValueError):
                    # Re-raise with context about which field failed
                    raise
    
    return result


def deserialize_session_json_fields(session_dict: Dict[str, Any]) -> Dict[str, Any]:
    """
    Deserialize JSON fields from a database session record.
    
    This function converts JSON string fields back to Python dict/list
    objects for use in application code.
    
    Args:
        session_dict: Session dictionary with JSON fields as strings.
    
    Returns:
        Session dictionary with JSON fields deserialized to Python objects.
    """
    result = session_dict.copy()
    
    for field in SESSION_JSON_FIELDS:
        if field in result and result[field] is not None:
            if isinstance(result[field], str):
                try:
                    result[field] = json.loads(result[field])
                except json.JSONDecodeError:
                    pass
    
    return result


def deserialize_session(
    session_dict: Dict[str, Any],
    session_type: Optional["SessionType"] = None,
) -> "Session":
    """
    Deserialize a session dictionary to the appropriate session type.
    
    This is a common utility function used by all storage providers to convert
    raw session dictionaries from storage into proper session objects.
    
    Args:
        session_dict: Raw session dictionary from storage.
        session_type: Optional session type override.
    
    Returns:
        Deserialized session object (AgentSession, TeamSession, or WorkflowSession).
    
    Raises:
        ValueError: If the session type is invalid.
    """
    from upsonic.session.agent import AgentSession
    from upsonic.session.base import SessionType as ST

    # Determine session type from dict if not provided
    if session_type is None:
        type_value = session_dict.get("session_type")
        if isinstance(type_value, str):
            try:
                session_type = ST(type_value)
            except ValueError:
                session_type = ST.AGENT
        elif isinstance(type_value, dict):
            try:
                session_type = ST(type_value.get("session_type", "agent"))
            except ValueError:
                session_type = ST.AGENT
        else:
            session_type = ST.AGENT

    if session_type == ST.AGENT:
        return AgentSession.from_dict(session_dict, deserialize_flag=True)
    elif session_type == ST.TEAM:
        # TeamSession not yet implemented - fallback to AgentSession
        return AgentSession.from_dict(session_dict, deserialize_flag=True)
    elif session_type == ST.WORKFLOW:
        # WorkflowSession not yet implemented - fallback to AgentSession
        return AgentSession.from_dict(session_dict, deserialize_flag=True)
    else:
        raise ValueError(f"Invalid session type: {session_type}")

