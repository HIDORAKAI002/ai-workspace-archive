"""
Time step utilities for simulation framework.

This module provides time step handling for different simulation granularities.
"""

from __future__ import annotations

from datetime import datetime, timedelta
from enum import Enum
from typing import Any, Dict, List, Optional


class TimeStep(Enum):
    """
    Enumeration of supported time step units.
    
    Each value represents a granularity level for simulation steps.
    """
    HOURLY = "hourly"
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    YEARLY = "yearly"
    
    @classmethod
    def from_string(cls, value: str) -> "TimeStep":
        """
        Convert a string to a TimeStep enum value.
        
        Args:
            value: String representation of time step
            
        Returns:
            TimeStep: The corresponding enum value
            
        Raises:
            ValueError: If the string doesn't match any time step
        """
        normalized = value.lower().strip()
        for step in cls:
            if step.value == normalized:
                return step
        raise ValueError(
            f"Invalid time step: {value}. "
            f"Must be one of: {', '.join(s.value for s in cls)}"
        )
    
    @property
    def display_name(self) -> str:
        """Get human-readable display name."""
        return self.value.capitalize()
    
    @property
    def singular_unit(self) -> str:
        """Get singular form of time unit."""
        mapping = {
            TimeStep.HOURLY: "hour",
            TimeStep.DAILY: "day",
            TimeStep.WEEKLY: "week",
            TimeStep.MONTHLY: "month",
            TimeStep.QUARTERLY: "quarter",
            TimeStep.YEARLY: "year",
        }
        return mapping[self]
    
    @property
    def plural_unit(self) -> str:
        """Get plural form of time unit."""
        mapping = {
            TimeStep.HOURLY: "hours",
            TimeStep.DAILY: "days",
            TimeStep.WEEKLY: "weeks",
            TimeStep.MONTHLY: "months",
            TimeStep.QUARTERLY: "quarters",
            TimeStep.YEARLY: "years",
        }
        return mapping[self]
    
    def get_timedelta(self, steps: int = 1) -> timedelta:
        """
        Get a timedelta for the given number of steps.
        
        Note: Monthly, quarterly, and yearly are approximations
        since they vary in actual duration.
        
        Args:
            steps: Number of steps
            
        Returns:
            timedelta: The time duration
        """
        mapping = {
            TimeStep.HOURLY: timedelta(hours=steps),
            TimeStep.DAILY: timedelta(days=steps),
            TimeStep.WEEKLY: timedelta(weeks=steps),
            TimeStep.MONTHLY: timedelta(days=30 * steps),  # Approximation
            TimeStep.QUARTERLY: timedelta(days=91 * steps),  # Approximation
            TimeStep.YEARLY: timedelta(days=365 * steps),  # Approximation
        }
        return mapping[self]


class TimeStepManager:
    """
    Manages time step calculations for a simulation run.
    
    This class handles:
    - Converting step numbers to timestamps
    - Formatting time information for prompts
    - Generating time-based context
    """
    
    def __init__(
        self,
        time_step: TimeStep,
        start_date: Optional[datetime] = None
    ):
        """
        Initialize the time step manager.
        
        Args:
            time_step: The time step granularity
            start_date: The simulation start date (defaults to now)
        """
        self._time_step = time_step
        self._start_date = start_date or datetime.now()
    
    @property
    def time_step(self) -> TimeStep:
        """Get the time step granularity."""
        return self._time_step
    
    @property
    def start_date(self) -> datetime:
        """Get the simulation start date."""
        return self._start_date
    
    def get_timestamp_for_step(self, step: int) -> datetime:
        """
        Calculate the timestamp for a given step.
        
        Args:
            step: The step number (0-indexed)
            
        Returns:
            datetime: The timestamp for that step
        """
        delta = self._time_step.get_timedelta(step)
        return self._start_date + delta
    
    def format_timestamp(self, step: int) -> str:
        """
        Format the timestamp for display in prompts.
        
        Args:
            step: The step number
            
        Returns:
            str: Formatted timestamp string
        """
        timestamp = self.get_timestamp_for_step(step)
        
        if self._time_step == TimeStep.HOURLY:
            return timestamp.strftime("%Y-%m-%d %H:%M")
        elif self._time_step == TimeStep.DAILY:
            return timestamp.strftime("%Y-%m-%d")
        elif self._time_step == TimeStep.WEEKLY:
            return f"Week of {timestamp.strftime('%Y-%m-%d')}"
        elif self._time_step == TimeStep.MONTHLY:
            return timestamp.strftime("%B %Y")
        elif self._time_step == TimeStep.QUARTERLY:
            quarter = (timestamp.month - 1) // 3 + 1
            return f"Q{quarter} {timestamp.year}"
        elif self._time_step == TimeStep.YEARLY:
            return str(timestamp.year)
        
        return timestamp.isoformat()
    
    def get_step_description(self, step: int) -> str:
        """
        Get a human-readable description of a step.
        
        Args:
            step: The step number
            
        Returns:
            str: Description of the step
        """
        unit = self._time_step.singular_unit if step == 1 else self._time_step.plural_unit
        timestamp = self.format_timestamp(step)
        return f"{self._time_step.display_name} step {step} ({timestamp})"
    
    def get_time_context(self, step: int) -> Dict[str, Any]:
        """
        Get time-related context for a step.
        
        This can be used to inject time-based information into prompts.
        
        Args:
            step: The step number
            
        Returns:
            Dict[str, Any]: Time context information
        """
        timestamp = self.get_timestamp_for_step(step)
        
        return {
            "step": step,
            "timestamp": self.format_timestamp(step),
            "datetime": timestamp,
            "year": timestamp.year,
            "month": timestamp.month,
            "month_name": timestamp.strftime("%B"),
            "day": timestamp.day,
            "day_of_week": timestamp.strftime("%A"),
            "quarter": (timestamp.month - 1) // 3 + 1,
            "is_weekend": timestamp.weekday() >= 5,
            "is_month_start": timestamp.day <= 7,
            "is_month_end": timestamp.day >= 24,
            "is_year_start": timestamp.month == 1 and timestamp.day <= 15,
            "is_year_end": timestamp.month == 12 and timestamp.day >= 15,
        }
    
    def generate_timeline(self, total_steps: int) -> List[Dict[str, Any]]:
        """
        Generate a complete timeline for the simulation.
        
        Args:
            total_steps: Total number of steps in the simulation
            
        Returns:
            List[Dict[str, Any]]: Timeline with context for each step
        """
        return [self.get_time_context(step) for step in range(total_steps + 1)]
