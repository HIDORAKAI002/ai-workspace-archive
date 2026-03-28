"""Deployment status comparison between source items and manifests."""

from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional

from .config import Config
from .filters import should_deploy_to
from .manifest import (
    compute_directory_hash,
    compute_file_hash,
    has_changed,
    load_manifest,
)
from .source import SourceDiscovery, SourceItem
from .targets import create_target


@dataclass
class StatusEntry:
    """Status of a single item relative to a target."""

    item_type: str
    name: str
    target_id: str
    state: str  # 'current', 'changed', 'new', 'pending_removal'


_TYPE_TO_CATEGORY = {
    "agent": "agents",
    "command": "commands",
    "skill": "skills",
    "mcp": "mcp_servers",
    "models": "models",
    "hook": "hooks",
}

_CATEGORY_TO_TYPE = {v: k for k, v in _TYPE_TO_CATEGORY.items()}


def get_status(
    config: Config, target_ids: Optional[List[str]] = None
) -> List[StatusEntry]:
    """Compare source items against deployed manifests for each target."""
    if target_ids is None:
        target_ids = list(config.targets.keys())

    entries: List[StatusEntry] = []
    discovery = SourceDiscovery(config.source_root)
    items = list(discovery.discover_all())

    for target_id in target_ids:
        target_config = config.targets[target_id]
        target = create_target(target_config)
        try:
            target.prepare()
            manifest = load_manifest(target.manifest_path())

            deployed_names: set[tuple[str, str]] = set()
            for item in items:
                if not should_deploy_to(
                    target_id, item.metadata, config, str(item.path)
                ):
                    continue

                category = _TYPE_TO_CATEGORY[item.item_type]
                current_hash = _compute_hash(item)
                deployed_names.add((category, item.name))

                if has_changed(manifest, category, item.name, current_hash):
                    if (
                        category in manifest.items
                        and item.name in manifest.items[category]
                    ):
                        state = "changed"
                    else:
                        state = "new"
                else:
                    state = "current"

                entries.append(StatusEntry(item.item_type, item.name, target_id, state))

            # Check for items in manifest but no longer in source
            for category, items_dict in manifest.items.items():
                for name in items_dict:
                    if (category, name) not in deployed_names:
                        item_type = _CATEGORY_TO_TYPE.get(category, category)
                        entries.append(
                            StatusEntry(item_type, name, target_id, "pending_removal")
                        )
        finally:
            target.cleanup()

    return entries


def _compute_hash(item: SourceItem) -> str:
    """Compute the appropriate hash for an item based on its type."""
    if item.item_type == "skill":
        return compute_directory_hash(item.path.parent.resolve())
    return compute_file_hash(item.content)
