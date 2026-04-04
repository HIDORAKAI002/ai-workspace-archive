"""Hindsight-Hermes: Persistent memory for Hermes agents.

Provides Hindsight retain/recall/reflect as native Hermes tools via the
plugin system or manual ``register_tools()`` call.  When running on a
Hermes build that supports lifecycle hooks, the plugin also:

- **pre_llm_call** — recalls relevant memories and injects them into the
  system prompt so the model has cross-session context on every turn.
- **post_llm_call** — retains the user/assistant exchange so it can be
  recalled in future sessions.

Plugin usage (auto-discovery)::

    pip install hindsight-hermes
    # Configure via ~/.hindsight/hermes.json:
    # {"hindsightApiUrl": "http://localhost:9077", "bankId": "my-agent"}

Manual usage::

    from hindsight_hermes import register_tools

    register_tools(
        bank_id="my-agent",
        hindsight_api_url="http://localhost:9077",
    )
"""

from .config import (
    USER_CONFIG_PATH,
    load_config,
    write_config,
)
from .errors import HindsightError
from .tools import (
    get_tool_definitions,
    memory_instructions,
    register,
    register_tools,
)

__version__ = "0.1.0"

__all__ = [
    "USER_CONFIG_PATH",
    "load_config",
    "write_config",
    "HindsightError",
    "register_tools",
    "register",
    "memory_instructions",
    "get_tool_definitions",
]
