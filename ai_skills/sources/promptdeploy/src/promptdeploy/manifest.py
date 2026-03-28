"""Manifest tracking for deployed prompts, agents, skills, and MCP servers."""

from __future__ import annotations

import hashlib
import json
import os
import tempfile
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional


MANIFEST_VERSION = 1
MANIFEST_FILENAME = ".prompt-deploy-manifest.json"


@dataclass
class ManifestItem:
    """Tracks a single deployed item."""

    source_hash: str
    target_path: Optional[str] = None
    config_key: Optional[str] = None


@dataclass
class Manifest:
    """Tracks all deployed items across categories."""

    version: int = MANIFEST_VERSION
    deployed_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )
    items: dict[str, dict[str, ManifestItem]] = field(default_factory=dict)

    def __post_init__(self) -> None:
        for category in ("agents", "commands", "skills", "mcp_servers"):
            self.items.setdefault(category, {})


def compute_file_hash(content: bytes) -> str:
    """Compute SHA256 hash of file content."""
    return f"sha256:{hashlib.sha256(content).hexdigest()}"


def compute_directory_hash(directory: Path) -> str:
    """Compute a deterministic hash of a directory's contents.

    Files are sorted by relative path. Each file contributes its
    relative path and content to the hash.
    """
    h = hashlib.sha256()
    entries: list[tuple[str, bytes]] = []
    for root, _dirs, files in os.walk(directory):
        for fname in files:
            fpath = Path(root) / fname
            rel = fpath.relative_to(directory).as_posix()
            entries.append((rel, fpath.read_bytes()))
    entries.sort(key=lambda e: e[0])
    for rel_path, content in entries:
        h.update(rel_path.encode())
        h.update(content)
    return f"sha256:{h.hexdigest()}"


def load_manifest(manifest_path: Path) -> Manifest:
    """Load a manifest from disk, returning an empty one if it doesn't exist."""
    if not manifest_path.exists():
        return Manifest()
    data = json.loads(manifest_path.read_text())
    items: dict[str, dict[str, ManifestItem]] = {}
    for category, entries in data.get("items", {}).items():
        items[category] = {name: ManifestItem(**vals) for name, vals in entries.items()}
    return Manifest(
        version=data.get("version", MANIFEST_VERSION),
        deployed_at=data.get("deployed_at", ""),
        items=items,
    )


def save_manifest(manifest: Manifest, manifest_path: Path) -> None:
    """Atomically write a manifest to disk."""
    manifest_path.parent.mkdir(parents=True, exist_ok=True)

    serialized: dict[str, dict[str, dict[str, object]]] = {}
    for category, entries in manifest.items.items():
        serialized[category] = {}
        for name, item in entries.items():
            entry: dict[str, object] = {"source_hash": item.source_hash}
            if item.target_path is not None:
                entry["target_path"] = item.target_path
            if item.config_key is not None:
                entry["config_key"] = item.config_key
            serialized[category][name] = entry

    data = {
        "version": manifest.version,
        "deployed_at": manifest.deployed_at,
        "items": serialized,
    }

    fd, tmp_path = tempfile.mkstemp(dir=manifest_path.parent, suffix=".tmp")
    try:
        with os.fdopen(fd, "w") as f:
            json.dump(data, f, indent=2)
            f.write("\n")
        os.replace(tmp_path, manifest_path)
    except BaseException:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise


def has_changed(
    manifest: Manifest, category: str, name: str, current_hash: str
) -> bool:
    """Check whether an item is new or its hash has changed."""
    cat = manifest.items.get(category)
    if cat is None:
        return True
    item = cat.get(name)
    if item is None:
        return True
    return item.source_hash != current_hash
