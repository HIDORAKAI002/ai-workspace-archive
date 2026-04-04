"""
Base abstract classes for the simulation framework.

This module provides the foundational abstract classes that all simulation
scenarios and components must inherit from.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Type, Union
from pydantic import BaseModel


class SimulationState(BaseModel):
    """
    Represents the state of a simulation at a specific time step.
    
    This is the base state model that all simulation-specific states should extend.
    """
    step: int
    timestamp: str
    metrics: Dict[str, Any] = {}
    
    class Config:
        arbitrary_types_allowed = True


class SimulationStepOutput(BaseModel):
    """
    Represents the output from an LLM for a single simulation step.
    
    Each simulation scenario should define its own step output schema that
    inherits from this base class.
    """
    step: int
    reasoning: str
    confidence: float = 0.0
    metrics: Dict[str, Any] = {}
    
    class Config:
        arbitrary_types_allowed = True


class BaseSimulationObject(ABC):
    """
    Abstract base class for all simulation scenario objects.
    
    A simulation object defines:
    - Initial parameters for the simulation
    - The prompt template for each step
    - The output schema for LLM responses
    - Metric extraction logic
    
    Example implementation:
        ```python
        class MerchantRevenueForecastSimulation(BaseSimulationObject):
            def __init__(
                self,
                merchant_name: str,
                shareholders: List[str],
                sector: str,
                location: str,
                current_monthly_revenue_usd: float
            ):
                self.merchant_name = merchant_name
                self.shareholders = shareholders
                self.sector = sector
                self.location = location
                self.current_monthly_revenue_usd = current_monthly_revenue_usd
                
            @property
            def name(self) -> str:
                return "MerchantRevenueForecast"
            
            @property
            def description(self) -> str:
                return f"Revenue forecast simulation for {self.merchant_name}"
            
            def get_initial_state(self) -> Dict[str, Any]:
                return {
                    "monthly_recurring_revenue": self.current_monthly_revenue_usd
                }
            
            def build_step_prompt(
                self,
                step: int,
                previous_state: Dict[str, Any],
                metrics_to_track: List[str]
            ) -> str:
                return f'''
                You are simulating the business trajectory of {self.merchant_name}.
                
                Current Step: Day {step}
                Previous MRR: ${previous_state.get("monthly_recurring_revenue", 0):,.2f}
                
                Based on realistic market dynamics, predict the next day's metrics.
                Consider seasonal factors, market trends, and growth patterns.
                '''
            
            def get_step_output_schema(self) -> Type[BaseModel]:
                return MerchantRevenueStepOutput
        ```
    """
    
    @property
    @abstractmethod
    def name(self) -> str:
        """
        Return a unique name for this simulation type.
        
        Returns:
            str: The simulation type name (e.g., "MerchantRevenueForecast")
        """
        raise NotImplementedError()
    
    @property
    @abstractmethod
    def description(self) -> str:
        """
        Return a human-readable description of this simulation.
        
        Returns:
            str: A description of what this simulation does
        """
        raise NotImplementedError()
    
    @abstractmethod
    def get_initial_state(self) -> Dict[str, Any]:
        """
        Return the initial state dictionary for the simulation.
        
        This should contain all metrics and values at step 0.
        
        Returns:
            Dict[str, Any]: Initial metric values
        """
        raise NotImplementedError()
    
    @abstractmethod
    def build_step_prompt(
        self,
        step: int,
        previous_state: Dict[str, Any],
        metrics_to_track: List[str],
        time_step_unit: str
    ) -> str:
        """
        Build the LLM prompt for a specific simulation step.
        
        Args:
            step: The current step number (1-indexed for simulation steps)
            previous_state: The state from the previous step
            metrics_to_track: List of metric names to predict
            time_step_unit: The time step unit (e.g., "daily", "weekly")
            
        Returns:
            str: The prompt to send to the LLM
        """
        raise NotImplementedError()
    
    @abstractmethod
    def get_step_output_schema(self) -> Type[BaseModel]:
        """
        Return the Pydantic model class for step outputs.
        
        This schema defines the structure of LLM responses for each step.
        The model should extend SimulationStepOutput.
        
        Returns:
            Type[BaseModel]: A Pydantic model class for step outputs
        """
        raise NotImplementedError()
    
    def extract_metrics(
        self,
        step_output: BaseModel,
        metrics_to_track: List[str]
    ) -> Dict[str, Any]:
        """
        Extract tracked metrics from a step output.
        
        Override this method to customize metric extraction logic.
        
        Args:
            step_output: The parsed output from the LLM
            metrics_to_track: List of metric names to extract
            
        Returns:
            Dict[str, Any]: Extracted metric values
        """
        result: Dict[str, Any] = {}
        
        # Try to get metrics from the step output
        if hasattr(step_output, 'metrics') and isinstance(step_output.metrics, dict):
            for metric in metrics_to_track:
                normalized_metric = metric.lower().replace(" ", "_")
                for key, value in step_output.metrics.items():
                    if key.lower().replace(" ", "_") == normalized_metric:
                        result[metric] = value
                        break
        
        # Also try to get directly from model attributes
        for metric in metrics_to_track:
            if metric not in result:
                normalized_metric = metric.lower().replace(" ", "_")
                if hasattr(step_output, normalized_metric):
                    result[metric] = getattr(step_output, normalized_metric)
                elif hasattr(step_output, metric):
                    result[metric] = getattr(step_output, metric)
        
        return result
    
    def validate_metrics(
        self,
        metrics: Dict[str, Any],
        step: int
    ) -> Dict[str, Any]:
        """
        Validate and potentially correct extracted metrics.
        
        Override this method to add custom validation logic.
        
        Args:
            metrics: The extracted metrics
            step: The current step number
            
        Returns:
            Dict[str, Any]: Validated/corrected metrics
        """
        return metrics
    
    def get_context_for_step(self, step: int) -> Optional[str]:
        """
        Return additional context for a specific step.
        
        Override this to inject external events or context into the simulation.
        For example, adding market news or seasonal events.
        
        Args:
            step: The current step number
            
        Returns:
            Optional[str]: Additional context string, or None
        """
        return None
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Serialize the simulation object to a dictionary.
        
        Returns:
            Dict[str, Any]: Serialized simulation object
        """
        result: Dict[str, Any] = {
            "name": self.name,
            "description": self.description,
            "type": self.__class__.__name__,
        }
        
        # Add all public attributes
        for key, value in self.__dict__.items():
            if not key.startswith("_"):
                result[key] = value
        
        return result


@dataclass
class SimulationConfig:
    """
    Configuration for a simulation run.
    
    Attributes:
        simulation_object: The simulation scenario object
        model: The LLM model to use (e.g., "openai/gpt-4o")
        time_step: The time unit for each step ("daily", "weekly", "monthly", etc.)
        simulation_duration: Number of steps to simulate
        metrics_to_track: List of metric names to track throughout the simulation
        temperature: LLM temperature (0.0-1.0)
        retry_on_error: Whether to retry failed LLM calls
        max_retries: Maximum number of retries per step
        show_progress: Whether to display progress during simulation
    """
    simulation_object: BaseSimulationObject
    model: str = "openai/gpt-4o"
    time_step: str = "daily"
    simulation_duration: int = 100
    metrics_to_track: List[str] = field(default_factory=list)
    temperature: float = 0.7
    retry_on_error: bool = True
    max_retries: int = 3
    show_progress: bool = True
    
    def __post_init__(self) -> None:
        """Validate configuration after initialization."""
        valid_time_steps = {"hourly", "daily", "weekly", "monthly", "quarterly", "yearly"}
        if self.time_step not in valid_time_steps:
            raise ValueError(
                f"Invalid time_step: {self.time_step}. "
                f"Must be one of: {', '.join(sorted(valid_time_steps))}"
            )
        
        if self.simulation_duration <= 0:
            raise ValueError("simulation_duration must be a positive integer")
        
        if not 0.0 <= self.temperature <= 2.0:
            raise ValueError("temperature must be between 0.0 and 2.0")
        
        if self.max_retries < 0:
            raise ValueError("max_retries must be non-negative")
