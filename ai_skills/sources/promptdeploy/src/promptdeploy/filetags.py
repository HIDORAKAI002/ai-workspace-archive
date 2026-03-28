"""Filetag parsing for filename-embedded deployment labels."""

from __future__ import annotations

from typing import List, Tuple

# Filetags separator: space-dash-dash-space
_SEPARATOR = " -- "


def parse_filetags(name: str) -> Tuple[str, List[str]]:
    """Parse filetags from a name string.

    The filetags utility embeds labels in filenames using the format:
    ``basename -- tag1 tag2``.  The separator is `` -- `` (space-dash-dash-space).
    Tags after the separator are space-separated.

    Uses ``rsplit`` so that if `` -- `` appears in the basename itself,
    only the rightmost occurrence is treated as the tag separator.

    Returns:
        A tuple of (clean_base_name, list_of_tags).

    Examples::

        parse_filetags("heavy -- positron")
        # => ("heavy", ["positron"])

        parse_filetags("heavy -- positron local")
        # => ("heavy", ["positron", "local"])

        parse_filetags("heavy")
        # => ("heavy", [])

        parse_filetags("foo -- bar -- positron")
        # => ("foo -- bar", ["positron"])
    """
    if _SEPARATOR not in name:
        return name, []

    base, tag_part = name.rsplit(_SEPARATOR, 1)
    base = base.strip()
    tags = tag_part.split()

    if not base or not tags:
        return name, []

    return base, tags
