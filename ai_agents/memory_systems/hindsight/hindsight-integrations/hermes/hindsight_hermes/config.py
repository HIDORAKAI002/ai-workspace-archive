"""Configuration management for Hindsight-Hermes plugin.

Loads settings from ``~/.hindsight/hermes.json`` merged with environment
variable overrides. Follows the same conventions as the openclaw and
claude-code integrations.

Loading order (later entries win):
    1. Built-in defaults
    2. User config  (``~/.hindsight/hermes.json``)
    3. Environment variable overrides
"""

from __future__ import annotations

import json as _json
import logging
import os
import sys
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)

USER_CONFIG_PATH = Path.home() / ".hindsight" / "hermes.json"

# ---------------------------------------------------------------------------
# Defaults — same field names as openclaw / claude-code settings.json
# ---------------------------------------------------------------------------

DEFAULTS: dict[str, Any] = {
    # Connection
    "hindsightApiUrl": None,
    "hindsightApiToken": None,
    "apiPort": 9077,
    "daemonIdleTimeout": 0,
    "embedVersion": "latest",
    "embedPackagePath": None,
    # Bank
    "bankId": None,
    "bankIdPrefix": "",
    "bankMission": "",
    "retainMission": None,
    # Recall
    "autoRecall": True,
    "recallBudget": "mid",
    "recallMaxTokens": 4096,
    "recallTypes": ["world", "experience"],
    "recallContextTurns": 1,
    "recallMaxQueryChars": 800,
    "recallRoles": ["user", "assistant"],
    "recallPromptPreamble": (
        "Relevant memories from past conversations (prioritize recent when "
        "conflicting). Only use memories that are directly useful to continue "
        "this conversation; ignore the rest:"
    ),
    "recallTopK": None,
    # Retain
    "autoRetain": True,
    "retainRoles": ["user", "assistant"],
    "retainEveryNTurns": 1,
    "retainOverlapTurns": 2,
    "retainContext": "hermes",
    # LLM (for daemon mode)
    "llmProvider": None,
    "llmModel": None,
    "llmApiKeyEnv": None,
    # Misc
    "debug": False,
}

# ---------------------------------------------------------------------------
# Env var → config key mapping (same convention as claude-code)
# ---------------------------------------------------------------------------

ENV_OVERRIDES: dict[str, tuple[str, type]] = {
    "HINDSIGHT_API_URL": ("hindsightApiUrl", str),
    "HINDSIGHT_API_TOKEN": ("hindsightApiToken", str),
    "HINDSIGHT_API_KEY": ("hindsightApiToken", str),  # alias
    "HINDSIGHT_BANK_ID": ("bankId", str),
    "HINDSIGHT_AUTO_RECALL": ("autoRecall", bool),
    "HINDSIGHT_AUTO_RETAIN": ("autoRetain", bool),
    "HINDSIGHT_RECALL_BUDGET": ("recallBudget", str),
    "HINDSIGHT_RECALL_MAX_TOKENS": ("recallMaxTokens", int),
    "HINDSIGHT_RECALL_MAX_QUERY_CHARS": ("recallMaxQueryChars", int),
    "HINDSIGHT_API_PORT": ("apiPort", int),
    "HINDSIGHT_DAEMON_IDLE_TIMEOUT": ("daemonIdleTimeout", int),
    "HINDSIGHT_EMBED_VERSION": ("embedVersion", str),
    "HINDSIGHT_EMBED_PACKAGE_PATH": ("embedPackagePath", str),
    "HINDSIGHT_BANK_MISSION": ("bankMission", str),
    "HINDSIGHT_LLM_PROVIDER": ("llmProvider", str),
    "HINDSIGHT_LLM_MODEL": ("llmModel", str),
    "HINDSIGHT_DEBUG": ("debug", bool),
}


# ---------------------------------------------------------------------------
# Loading
# ---------------------------------------------------------------------------


def _cast_env(value: str, typ: type) -> Any:
    """Cast environment variable string to target type. Returns None on failure."""
    try:
        if typ is bool:
            return value.lower() in ("true", "1", "yes")
        if typ is int:
            return int(value)
        return value
    except (ValueError, AttributeError):
        return None


def _load_json_file(path: Path | str) -> dict[str, Any]:
    """Read a JSON file, returning {} on any error."""
    p = Path(path)
    if not p.exists():
        return {}
    try:
        return _json.loads(p.read_text(encoding="utf-8")) or {}
    except Exception as exc:
        _debug_log(None, f"Failed to read {p}: {exc}")
        return {}


def load_config(config_path: Path | str | None = None) -> dict[str, Any]:
    """Load plugin configuration.

    Loading order (later entries win):
        1. Built-in defaults
        2. User config  (``~/.hindsight/hermes.json``)
        3. Environment variable overrides

    Args:
        config_path: Override the user config path (for testing).

    Returns:
        A plain dict with all configuration values.
    """
    config = dict(DEFAULTS)

    # User config — stable, version-independent
    user_path = Path(config_path) if config_path else USER_CONFIG_PATH
    file_cfg = _load_json_file(user_path)
    config.update({k: v for k, v in file_cfg.items() if v is not None})

    # Environment variable overrides (highest priority)
    for env_name, (key, typ) in ENV_OVERRIDES.items():
        val = os.environ.get(env_name)
        if val is not None:
            cast_val = _cast_env(val, typ)
            if cast_val is not None:
                config[key] = cast_val

    return config


def write_config(data: dict[str, Any], config_path: Path | str | None = None) -> None:
    """Write configuration to the user config file."""
    p = Path(config_path) if config_path else USER_CONFIG_PATH
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(
        _json.dumps(data, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def _debug_log(config: dict | None, *args: Any) -> None:
    """Log to stderr if debug mode is enabled."""
    if config and config.get("debug"):
        print("[Hindsight]", *args, file=sys.stderr)
