"""
Base phase for RalphLoop.

This module defines the abstract base class for all phases.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

from upsonic.ralph.state.manager import StateManager


@dataclass
class PhaseResult:
    """Result of a phase execution."""
    
    phase_name: str
    success: bool
    message: str = ""
    data: Dict[str, Any] = field(default_factory=dict)
    errors: List[str] = field(default_factory=list)
    
    def is_complete(self) -> bool:
        """Check if phase completed successfully."""
        return self.success and not self.errors


class BasePhase(ABC):
    """
    Abstract base class for RalphLoop phases.
    
    Phases are distinct stages of execution:
    - RequirementsPhase: Generate specifications
    - TodoPhase: Create TODO list
    - IncrementalPhase: Main execution loop
    """
    
    def __init__(self, state_manager: StateManager, model: str):
        """
        Initialize phase.
        
        Args:
            state_manager: StateManager for state file access
            model: LLM model identifier
        """
        self.state_manager = state_manager
        self.model = model
    
    @property
    @abstractmethod
    def name(self) -> str:
        """Get phase name."""
        pass
    
    @abstractmethod
    def execute(self) -> PhaseResult:
        """
        Execute the phase synchronously.
        
        Returns:
            PhaseResult indicating success/failure
        """
        pass
    
    @abstractmethod
    async def aexecute(self) -> PhaseResult:
        """
        Execute the phase asynchronously.
        
        Returns:
            PhaseResult indicating success/failure
        """
        pass
