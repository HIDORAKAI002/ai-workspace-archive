"""JSON file storage module for Upsonic agent framework."""
from __future__ import annotations
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .json import JSONStorage


def _get_json_storage_classes() -> dict[str, Any]:
    """Lazy import of JSON storage classes."""
    from .json import JSONStorage
    
    return {
        "JSONStorage": JSONStorage,
    }


def __getattr__(name: str) -> Any:
    """Lazy loading of JSON storage classes."""
    json_classes = _get_json_storage_classes()
    if name in json_classes:
        return json_classes[name]
    
    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Please import from the appropriate sub-module."
    )


__all__ = [
    "JSONStorage",
]

