"""
Upsonic Simulation Framework

A powerful LLM-powered simulation system for time-series forecasting and scenario analysis.

Example:
    ```python
    from upsonic.simulation import Simulation
    from upsonic.simulation.scenarios import MerchantRevenueForecastSimulation

    simulation = Simulation(
        MerchantRevenueForecastSimulation(
            merchant_name="TechCo",
            shareholders=["Alice", "Bob"],
            sector="E-commerce",
            location="San Francisco",
            current_monthly_revenue_usd=50000
        ),
        model="openai/gpt-4o",
        time_step="daily",
        simulation_duration=100,
        metrics_to_track=["monthly recurring revenue"]
    )
    
    result = simulation.run()
    result.report("summary").to_pdf("summary.pdf")
    result.report("visual").show()
    ```
"""

from __future__ import annotations

import importlib
from typing import Any

_lazy_imports: dict[str, Any] = {}


def _lazy_import(module_name: str, class_name: str) -> Any:
    """Lazy import function to defer heavy imports until actually needed."""
    def _import() -> Any:
        if module_name not in _lazy_imports:
            _lazy_imports[module_name] = importlib.import_module(module_name)
        return getattr(_lazy_imports[module_name], class_name)
    return _import


def _get_Simulation() -> type:
    return _lazy_import("upsonic.simulation.simulation", "Simulation")()


def _get_BaseSimulationObject() -> type:
    return _lazy_import("upsonic.simulation.base", "BaseSimulationObject")()


def _get_SimulationResult() -> type:
    return _lazy_import("upsonic.simulation.result", "SimulationResult")()


def _get_TimeStep() -> type:
    return _lazy_import("upsonic.simulation.time_step", "TimeStep")()


def __getattr__(name: str) -> Any:
    """Lazy loading of simulation classes."""
    if name == "Simulation":
        return _get_Simulation()
    elif name == "BaseSimulationObject":
        return _get_BaseSimulationObject()
    elif name == "SimulationResult":
        return _get_SimulationResult()
    elif name == "TimeStep":
        return _get_TimeStep()
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Please import from the appropriate sub-module."
    )


__all__ = [
    "Simulation",
    "BaseSimulationObject",
    "SimulationResult",
    "TimeStep",
]
