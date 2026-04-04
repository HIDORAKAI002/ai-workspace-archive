"""Telegram integration utility helpers."""

from __future__ import annotations

import html
import re


def sanitize_text_for_telegram(text: str) -> str:
    """Sanitize text to be safe for Telegram's sendMessage API.

    Strips HTML entities and control characters that may cause
    400 Bad Request errors.

    Args:
        text: Raw text that may contain problematic characters.

    Returns:
        Sanitized plain text safe for Telegram.
    """
    sanitized: str = html.unescape(text)
    sanitized = re.sub(r"<[^>]+>", "", sanitized)
    sanitized = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", sanitized)
    sanitized = sanitized.strip()
    return sanitized if sanitized else "(empty response)"
