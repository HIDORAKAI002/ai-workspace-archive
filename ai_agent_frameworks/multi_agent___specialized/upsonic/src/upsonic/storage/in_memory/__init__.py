"""In-memory storage module for Upsonic agent framework.

This module provides in-memory storage implementations for agent sessions
and user memory data. Data is NOT persistent and will be lost when the
application terminates.

Example:
    ```python
    from upsonic.storage.in_memory import InMemoryStorage
    
    storage = InMemoryStorage()
    
    # Use with agents
    agent = Agent(storage=storage, ...)
    ```
"""

from upsonic.storage.in_memory.in_memory import InMemoryStorage
from upsonic.storage.in_memory.utils import (
    apply_pagination,
    apply_sorting,
    deep_copy_record,
    deep_copy_records,
    get_sort_value,
)

__all__ = [
    "InMemoryStorage",
    "apply_sorting",
    "apply_pagination",
    "get_sort_value",
    "deep_copy_record",
    "deep_copy_records",
]

