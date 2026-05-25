"""Compact estimated context savings helpers.

The project intentionally labels these values as estimates: the helper uses a
conservative character-count approximation instead of model-specific tokenizers.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Iterable

CHARS_PER_TOKEN = 4


def estimate_tokens(value: Any) -> int:
    """Estimate token count with a conservative 4 chars/token approximation."""
    if value is None:
        return 0
    if isinstance(value, str):
        text = value
    else:
        text = json.dumps(
            value,
            default=str,
            ensure_ascii=True,
            separators=(",", ":"),
            sort_keys=True,
        )
    if not text:
        return 0
    return max(1, (len(text) + CHARS_PER_TOKEN - 1) // CHARS_PER_TOKEN)


def estimate_file_tokens(repo_root: Path, files: Iterable[str]) -> int:
    """Estimate tokens for changed files using file sizes, not file contents."""
    total = 0
    root = repo_root.resolve()
    for file_name in files:
        path = Path(file_name)
        full_path = path if path.is_absolute() else root / path
        try:
            if full_path.is_file():
                total += max(
                    1,
                    (full_path.stat().st_size + CHARS_PER_TOKEN - 1)
                    // CHARS_PER_TOKEN,
                )
        except OSError:
            continue
    return total


def estimate_context_savings(
    *,
    original_context: Any | None = None,
    returned_context: Any | None = None,
    original_tokens: int | None = None,
    returned_tokens: int | None = None,
) -> dict[str, int | bool] | None:
    """Return tiny savings metadata, or None when no baseline is available."""
    baseline = (
        original_tokens
        if original_tokens is not None
        else estimate_tokens(original_context)
    )
    returned = (
        returned_tokens
        if returned_tokens is not None
        else estimate_tokens(returned_context)
    )

    if baseline <= 0:
        return None

    saved = max(0, baseline - returned)
    percent = round((saved / baseline) * 100) if baseline else 0
    return {
        "estimated": True,
        "saved_tokens": int(saved),
        "saved_percent": int(percent),
    }


def attach_context_savings(
    result: dict[str, Any],
    *,
    original_context: Any | None = None,
    original_tokens: int | None = None,
    returned_context: Any | None = None,
    returned_tokens: int | None = None,
) -> dict[str, Any]:
    """Attach compact ``context_savings`` metadata when it can be estimated."""
    estimate = estimate_context_savings(
        original_context=original_context,
        returned_context=result if returned_context is None else returned_context,
        original_tokens=original_tokens,
        returned_tokens=returned_tokens,
    )
    if estimate is not None:
        result["context_savings"] = estimate
    return result


def format_context_savings(estimate: dict[str, Any] | None) -> str | None:
    """Format a one-line human summary for CLI output."""
    if not estimate:
        return None
    saved = int(estimate.get("saved_tokens", 0))
    percent = int(estimate.get("saved_percent", 0))
    return f"Estimated context saved: ~{saved:,} tokens (~{percent}%)"
