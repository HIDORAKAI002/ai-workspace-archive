"""Firecrawl integration utility helpers."""

from __future__ import annotations

import json
from typing import Any


def serialize_firecrawl_response(result: Any) -> str:
    """Serialize a Firecrawl SDK response to a JSON string.

    firecrawl-py v4 returns Pydantic BaseModel objects. This helper calls
    model_dump() when available so json.dumps receives a plain dict/list
    instead of a Pydantic object (which would otherwise fall through to
    the default=str path and produce an opaque string representation).

    Args:
        result: The raw Firecrawl SDK response object.

    Returns:
        JSON-encoded string of the response.
    """
    if hasattr(result, "model_dump"):
        return json.dumps(result.model_dump(), default=str)
    return json.dumps(result, default=str)
