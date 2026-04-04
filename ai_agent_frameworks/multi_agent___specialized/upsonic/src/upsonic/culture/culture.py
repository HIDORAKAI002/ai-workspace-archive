"""
Culture data model for agent behavior and communication guidelines.

This module provides the Culture dataclass that defines how an agent should
behave, communicate, and interact based on user-defined guidelines.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass
class Culture:
    """
    Model for defining agent culture and behavior guidelines.
    
    Culture represents how an agent should behave, communicate, and interact.
    It includes guidelines extracted from a user description that cover:
    - Tone of Speech
    - Topics to Avoid
    - Topics to Help With
    - Things to Pay Attention To
    
    Attributes:
        description: User-provided description of desired agent behavior
        add_system_prompt: Whether to add culture to the first system prompt (default: True)
        repeat: Whether to repeat culture in messages periodically (default: False)
        repeat_interval: Number of messages between culture repeats (default: 5)
    """
    
    description: str
    """User-provided description of desired agent behavior and communication style."""
    
    add_system_prompt: bool = True
    """Whether to add culture guidelines to the first system prompt."""
    
    repeat: bool = False
    """Whether to repeat culture guidelines periodically in messages."""
    
    repeat_interval: int = 5
    """Number of messages between culture guideline repeats."""
    
    def __post_init__(self) -> None:
        """Validate culture parameters after initialization."""
        if not self.description or not self.description.strip():
            raise ValueError("description must be a non-empty string")
        
        if self.repeat_interval < 1:
            raise ValueError("repeat_interval must be at least 1")
    
    def to_dict(self) -> dict[str, Any]:
        """
        Serialize the culture to a dictionary.
        
        Returns:
            Dictionary representation of the culture.
        """
        return {
            "description": self.description,
            "add_system_prompt": self.add_system_prompt,
            "repeat": self.repeat,
            "repeat_interval": self.repeat_interval,
        }
    
    @classmethod
    def from_dict(cls, data: dict[str, any]) -> "Culture":
        """
        Create a Culture instance from a dictionary.
        
        Args:
            data: Dictionary with culture fields.
            
        Returns:
            New Culture instance.
        """
        return cls(**data)
    
    def __repr__(self) -> str:
        """Return a readable representation of the culture."""
        return (
            f"Culture(description={self.description[:50]!r}..., "
            f"add_system_prompt={self.add_system_prompt}, "
            f"repeat={self.repeat}, repeat_interval={self.repeat_interval})"
        )
