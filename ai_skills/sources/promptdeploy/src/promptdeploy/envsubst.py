"""Environment variable expansion for ${VAR} references."""

from __future__ import annotations

import os
import re
from pathlib import Path
from typing import Any


_ENV_PATTERN = re.compile(r"\$\{([A-Za-z_][A-Za-z0-9_]*)\}")


def load_dotenv(path: Path) -> None:
    """Load KEY=value pairs from a .env file into os.environ.

    Skips blank lines and comments (#). Does not overwrite existing
    environment variables so that the real environment takes precedence.
    """
    if not path.is_file():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip()
        # Strip optional surrounding quotes
        if len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
            value = value[1:-1]
        if key and key not in os.environ:
            os.environ[key] = value


def expand_env_vars(value: str) -> str:
    """Replace ${VAR} references with values from os.environ.

    Returns the original string if the variable is not set.
    """

    def _replace(match: re.Match) -> str:
        var_name = match.group(1)
        return os.environ.get(var_name, match.group(0))

    return _ENV_PATTERN.sub(_replace, value)


def expand_env_in_dict(data: dict) -> dict:
    """Recursively expand ${VAR} references in all string values of a dict."""
    result: dict[str, Any] = {}
    for key, value in data.items():
        if isinstance(value, str):
            result[key] = expand_env_vars(value)
        elif isinstance(value, dict):
            result[key] = expand_env_in_dict(value)
        elif isinstance(value, list):
            result[key] = [
                expand_env_vars(v) if isinstance(v, str) else v for v in value
            ]
        else:
            result[key] = value
    return result
