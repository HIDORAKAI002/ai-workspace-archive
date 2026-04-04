from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.agent.pipeline.step import StepStatus
    
from enum import Enum


class RunStatus(str, Enum):
    """Status enum for Agent/Team/Workflow runs."""
    
    running = "RUNNING"
    completed = "COMPLETED"
    paused = "PAUSED"
    cancelled = "CANCELLED"
    error = "ERROR"
    
    def to_dict(self) -> str:
        """
        Convert RunStatus to a storable string value.
        
        Returns:
            The string value of the enum
        """
        return self.value
    
    @classmethod
    def from_dict(cls, data: str) -> "RunStatus":
        """
        Reconstruct RunStatus from a string value.
        
        Args:
            data: The string value (e.g., "RUNNING", "COMPLETED")
            
        Returns:
            The corresponding RunStatus enum member
        """
        return cls(data)
    
    @staticmethod
    def from_step_status(step_status: "StepStatus") -> "RunStatus":
        """
        Map StepStatus to RunStatus.
        
        Args:
            step_status: Step status to convert
            
        Returns:
            Corresponding RunStatus
        """
        from upsonic.agent.pipeline.step import StepStatus
        
        mapping = {
            StepStatus.RUNNING: RunStatus.running,
            StepStatus.COMPLETED: RunStatus.completed,
            StepStatus.PAUSED: RunStatus.paused,
            StepStatus.CANCELLED: RunStatus.cancelled,
            StepStatus.ERROR: RunStatus.error,
            StepStatus.SKIPPED: RunStatus.completed,
        }
        return mapping.get(step_status, RunStatus.running)



