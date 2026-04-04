"""Deferred and external tool execution handling."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

@dataclass
class PausedToolCall:
    """Represents a tool call paused for HITL handling (external execution, confirmation, or user input)."""
    
    tool_name: str
    """Name of the tool to execute."""
    
    tool_args: Dict[str, Any]
    """Arguments for the tool."""
    
    tool_call_id: str
    """Unique identifier for this tool call."""
    
    result: Optional[Any] = None
    """Result after external execution."""
    
    error: Optional[str] = None
    """Error message if execution failed."""
    
    metadata: Dict[str, Any] = field(default_factory=dict)
    """Additional metadata."""

    requires_confirmation: bool = False
    """Whether this call requires user confirmation before execution."""

    requires_user_input: bool = False
    """Whether this call requires user-provided input values."""

    user_input_schema: Optional[List[Dict[str, Any]]] = None
    """Schema of fields the user must fill in (list of UserInputField dicts)."""

    user_input_fields: Optional[List[str]] = None
    """Subset of field names that the user must provide."""

    @property
    def args(self) -> Dict[str, Any]:
        """Backward compatibility alias for tool_args."""
        return self.tool_args
    
    def args_as_dict(self) -> Dict[str, Any]:
        """Get arguments as dictionary."""
        return self.tool_args
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for serialization."""
        return {
            "tool_name": self.tool_name,
            "tool_args": self.tool_args,
            "tool_call_id": self.tool_call_id,
            "result": self.result,
            "error": self.error,
            "metadata": self.metadata,
            "requires_confirmation": self.requires_confirmation,
            "requires_user_input": self.requires_user_input,
            "user_input_schema": self.user_input_schema,
            "user_input_fields": self.user_input_fields,
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "PausedToolCall":
        """Reconstruct from dictionary."""
        return cls(
            tool_name=data["tool_name"],
            tool_args=data.get("tool_args", {}),
            tool_call_id=data["tool_call_id"],
            result=data.get("result"),
            error=data.get("error"),
            metadata=data.get("metadata", {}),
            requires_confirmation=data.get("requires_confirmation", False),
            requires_user_input=data.get("requires_user_input", False),
            user_input_schema=data.get("user_input_schema"),
            user_input_fields=data.get("user_input_fields"),
        )


class DeferredExecutionManager:
    """Manager for external tool execution."""
    
    def __init__(self):
        self.execution_history: List[PausedToolCall] = []
    
    def create_external_call(
        self,
        tool_name: str,
        args: Dict[str, Any],
        tool_call_id: str
    ) -> PausedToolCall:
        """Create an external tool call."""
        external_call = PausedToolCall(
            tool_name=tool_name,
            tool_args=args,
            tool_call_id=tool_call_id
        )
        
        self.execution_history.append(external_call)
        return external_call
    
    def has_pending_requests(self) -> bool:
        """Check if there are pending external tool calls."""
        return any(
            call.result is None and call.error is None
            for call in self.execution_history
        )
    
    def get_pending_calls(self) -> List[PausedToolCall]:
        """Get all pending external tool calls."""
        return [
            call for call in self.execution_history
            if call.result is None and call.error is None
        ]
    
    def update_call_result(
        self,
        tool_call_id: str,
        result: Any = None,
        error: Optional[str] = None
    ) -> Optional[PausedToolCall]:
        """
        Update the result of an external tool call.
        
        Args:
            tool_call_id: ID of the tool call to update
            result: The result of the execution
            error: Error message if execution failed
            
        Returns:
            The updated PausedToolCall or None if not found
        """
        for call in self.execution_history:
            if call.tool_call_id == tool_call_id:
                call.result = result
                call.error = error
                return call
        return None
    
    def clear_history(self) -> None:
        """Clear execution history."""
        self.execution_history.clear()
    
    def get_execution_history(self) -> List[PausedToolCall]:
        """Get the full execution history."""
        return self.execution_history.copy()
