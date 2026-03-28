"""YAML frontmatter parsing and serialization for prompt files."""

from __future__ import annotations

import re
from typing import Optional, Tuple

import yaml

FRONTMATTER_PATTERN = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


class FrontmatterError(Exception):
    """Raised when YAML frontmatter cannot be parsed."""


def parse_frontmatter(content: bytes) -> Tuple[Optional[dict], bytes]:
    """Parse YAML frontmatter from content bytes.

    Returns a tuple of (metadata dict or None, body content as bytes).
    Raises FrontmatterError on invalid YAML.
    """
    text = content.decode("utf-8")
    match = FRONTMATTER_PATTERN.match(text)
    if not match:
        return None, content

    yaml_text = match.group(1)
    try:
        metadata = yaml.safe_load(yaml_text)
    except yaml.YAMLError as exc:
        raise FrontmatterError(f"Invalid YAML frontmatter: {exc}") from exc

    if metadata is None:
        metadata = {}

    body = text[match.end() :]
    return metadata, body.encode("utf-8")


def strip_deployment_fields(metadata: dict) -> dict:
    """Remove 'only' and 'except' deployment keys from metadata."""
    return {k: v for k, v in metadata.items() if k not in ("only", "except")}


def serialize_frontmatter(metadata: dict, body: bytes) -> bytes:
    """Serialize metadata and body back into frontmatter-formatted bytes."""
    if not metadata:
        return body

    yaml_text = yaml.dump(
        metadata,
        default_flow_style=False,
        allow_unicode=True,
        sort_keys=False,
    )
    return b"---\n" + yaml_text.encode("utf-8") + b"---\n" + body


def transform_for_target(content: bytes, target_id: str) -> bytes:
    """Parse frontmatter, strip deployment fields, and re-serialize.

    Returns original content unchanged if no frontmatter is present.
    """
    metadata, body = parse_frontmatter(content)
    if metadata is None:
        return content

    cleaned = strip_deployment_fields(metadata)
    return serialize_frontmatter(cleaned, body)
