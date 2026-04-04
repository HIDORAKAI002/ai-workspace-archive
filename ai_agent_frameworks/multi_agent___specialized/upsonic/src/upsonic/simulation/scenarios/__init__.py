"""
Pre-built simulation scenarios.

This module provides ready-to-use simulation scenarios for common use cases.
"""

from __future__ import annotations

import importlib
from typing import Any

_lazy_imports: dict[str, Any] = {}


def _lazy_import(module_name: str, class_name: str) -> Any:
    """Lazy import function."""
    def _import() -> Any:
        if module_name not in _lazy_imports:
            _lazy_imports[module_name] = importlib.import_module(module_name)
        return getattr(_lazy_imports[module_name], class_name)
    return _import


def _get_MerchantRevenueForecastSimulation() -> type:
    return _lazy_import(
        "upsonic.simulation.scenarios.merchant_revenue", 
        "MerchantRevenueForecastSimulation"
    )()


def _get_StockPriceForecastSimulation() -> type:
    return _lazy_import(
        "upsonic.simulation.scenarios.stock_price", 
        "StockPriceForecastSimulation"
    )()


def _get_UserGrowthSimulation() -> type:
    return _lazy_import(
        "upsonic.simulation.scenarios.user_growth", 
        "UserGrowthSimulation"
    )()


def __getattr__(name: str) -> Any:
    """Lazy loading of scenario classes."""
    if name == "MerchantRevenueForecastSimulation":
        return _get_MerchantRevenueForecastSimulation()
    elif name == "StockPriceForecastSimulation":
        return _get_StockPriceForecastSimulation()
    elif name == "UserGrowthSimulation":
        return _get_UserGrowthSimulation()
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'."
    )


__all__ = [
    "MerchantRevenueForecastSimulation",
    "StockPriceForecastSimulation",
    "UserGrowthSimulation",
]
