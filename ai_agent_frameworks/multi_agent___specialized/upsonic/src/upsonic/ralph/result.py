"""
Result models for RalphLoop.

This module contains models for tracking loop execution results.
"""

from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field, ConfigDict


class IterationRecord(BaseModel):
    """Record of a single iteration's execution."""
    
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    iteration: int = Field(description="Iteration number (1-indexed)")
    task_picked: str = Field(default="", description="Task that was worked on")
    success: bool = Field(default=False, description="Whether iteration succeeded")
    backpressure_passed: bool = Field(default=False, description="Whether validation passed")
    message: str = Field(default="", description="Result message")
    execution_time: float = Field(default=0.0, description="Execution time in seconds")
    learnings_added: List[str] = Field(default_factory=list, description="Learnings recorded")
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return {
            "iteration": self.iteration,
            "task_picked": self.task_picked,
            "success": self.success,
            "backpressure_passed": self.backpressure_passed,
            "message": self.message,
            "execution_time": self.execution_time,
            "learnings_added": self.learnings_added,
        }


class RalphLoopResult(BaseModel):
    """Result of a complete RalphLoop execution."""
    
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    goal: str = Field(description="Project goal")
    total_iterations: int = Field(default=0, description="Total iterations executed")
    successful_iterations: int = Field(default=0, description="Number of successful iterations")
    failed_iterations: int = Field(default=0, description="Number of failed iterations")
    final_status: Literal["completed", "max_iterations", "stopped", "error"] = Field(
        default="completed",
        description="How the loop ended"
    )
    iterations: List[IterationRecord] = Field(
        default_factory=list, 
        description="Records of each iteration"
    )
    start_time: Optional[datetime] = Field(default=None, description="When loop started")
    end_time: Optional[datetime] = Field(default=None, description="When loop ended")
    workspace: Optional[Path] = Field(default=None, description="Workspace path")
    specs_generated: List[str] = Field(
        default_factory=list, 
        description="Spec files generated"
    )
    error_message: Optional[str] = Field(default=None, description="Error if any")
    
    def duration(self) -> float:
        """
        Get total duration in seconds.
        
        Returns:
            Duration in seconds or 0 if times not set
        """
        if self.start_time and self.end_time:
            return (self.end_time - self.start_time).total_seconds()
        return 0.0
    
    def success_rate(self) -> float:
        """
        Calculate success rate of iterations.
        
        Returns:
            Success rate as percentage (0-100)
        """
        if self.total_iterations == 0:
            return 0.0
        return (self.successful_iterations / self.total_iterations) * 100
    
    def summary(self) -> str:
        """
        Generate human-readable summary.
        
        Returns:
            Formatted summary string
        """
        lines: List[str] = []
        lines.append("=" * 60)
        lines.append("RalphLoop Execution Summary")
        lines.append("=" * 60)
        lines.append(f"Goal: {self.goal}")
        lines.append(f"Status: {self.final_status.upper()}")
        lines.append(f"Workspace: {self.workspace}")
        lines.append("-" * 60)
        lines.append(f"Total Iterations: {self.total_iterations}")
        lines.append(f"Successful: {self.successful_iterations}")
        lines.append(f"Failed: {self.failed_iterations}")
        lines.append(f"Success Rate: {self.success_rate():.1f}%")
        lines.append(f"Duration: {self.duration():.1f}s")
        
        if self.specs_generated:
            lines.append("-" * 60)
            lines.append(f"Specs Generated: {len(self.specs_generated)}")
            for spec in self.specs_generated:
                lines.append(f"  - {spec}")
        
        if self.error_message:
            lines.append("-" * 60)
            lines.append(f"Error: {self.error_message}")
        
        lines.append("=" * 60)
        return "\n".join(lines)
    
    def add_iteration(self, record: IterationRecord) -> None:
        """
        Add an iteration record.
        
        Args:
            record: IterationRecord to add
        """
        self.iterations.append(record)
        self.total_iterations += 1
        if record.success:
            self.successful_iterations += 1
        else:
            self.failed_iterations += 1
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return {
            "goal": self.goal,
            "total_iterations": self.total_iterations,
            "successful_iterations": self.successful_iterations,
            "failed_iterations": self.failed_iterations,
            "final_status": self.final_status,
            "iterations": [i.to_dict() for i in self.iterations],
            "start_time": self.start_time.isoformat() if self.start_time else None,
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "workspace": str(self.workspace) if self.workspace else None,
            "specs_generated": self.specs_generated,
            "duration": self.duration(),
            "success_rate": self.success_rate(),
            "error_message": self.error_message,
        }
