"""Base session types and utilities for Upsonic agent framework."""
from __future__ import annotations

from enum import Enum
from typing import TYPE_CHECKING, Any, Dict, Optional, Union

if TYPE_CHECKING:
    from upsonic.session.agent import AgentSession


class SessionType(str, Enum):
    """Enumeration of session types supported by the framework."""
    
    AGENT = "agent"
    TEAM = "team"
    WORKFLOW = "workflow"
    
    def to_dict(self) -> Dict[str, str]:
        """Convert to dictionary representation."""
        return {"session_type": self.value}
    
    @classmethod
    def from_dict(
        cls,
        data: Optional[Union[str, Dict[str, Any]]],
    ) -> "SessionType":
        """
        Create SessionType from dictionary or string.
        
        Args:
            data: Either a string value, dict with 'session_type' key, or None.
        
        Returns:
            SessionType enum value. Defaults to AGENT if data is None or invalid.
        """
        if data is None:
            return cls.AGENT
        
        if isinstance(data, str):
            try:
                return cls(data)
            except ValueError:
                return cls.AGENT
        
        if isinstance(data, dict):
            type_value = data.get("session_type", "agent")
            try:
                return cls(type_value)
            except ValueError:
                return cls.AGENT
        
        return cls.AGENT
    
    @classmethod
    def from_string(cls, value: str) -> "SessionType":
        """
        Create SessionType from string value.
        
        Args:
            value: String representation of session type.
        
        Returns:
            SessionType enum value.
        
        Raises:
            ValueError: If value is not a valid session type.
        """
        try:
            return cls(value.lower())
        except ValueError:
            valid_types = [t.value for t in cls]
            raise ValueError(
                f"Invalid session type: '{value}'. "
                f"Valid types: {valid_types}"
            )


Session = Union["AgentSession"]
