"""Core deploy orchestration for promptdeploy."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import List, Optional, Set

from .config import Config
from .filters import should_deploy_to
from .manifest import (
    Manifest,
    ManifestItem,
    compute_directory_hash,
    compute_file_hash,
    has_changed,
    load_manifest,
    save_manifest,
)
from .source import SourceDiscovery, SourceItem
from .targets import create_target
from .targets.base import Target

# Maps SourceItem.item_type -> manifest category key
_TYPE_TO_CATEGORY = {
    "agent": "agents",
    "command": "commands",
    "skill": "skills",
    "mcp": "mcp_servers",
    "models": "models",
    "hook": "hooks",
}

# Maps CLI --only-type values (plural) -> SourceItem.item_type (singular)
_CLI_TYPE_TO_ITEM_TYPE = {
    "agents": "agent",
    "commands": "command",
    "skills": "skill",
    "mcp": "mcp",
    "models": "models",
    "hooks": "hook",
}


@dataclass
class DeployAction:
    """Records a single deploy action taken (or planned)."""

    action: str  # 'create', 'update', 'remove', 'skip'
    item_type: str
    name: str
    target_id: str
    source_path: Optional[str] = None


def _filter_models_config(config_dict: dict, target_id: str, config: Config) -> dict:
    """Filter a models.yaml config dict, keeping only matching providers/models.

    Applies should_deploy_to() at both provider and model level so that
    only/except filtering works for the models item type (which is a single
    SourceItem containing many providers and models).
    """
    filtered_providers: dict = {}
    for prov_key, prov in config_dict.get("providers", {}).items():
        if not should_deploy_to(target_id, prov, config, "models.yaml"):
            continue
        # Filter individual models within the provider
        filtered_models: dict = {}
        for model_id, model in prov.get("models", {}).items():
            if model is None:
                model = {}
            if not should_deploy_to(target_id, model, config, "models.yaml"):
                continue
            filtered_models[model_id] = model
        if filtered_models:
            filtered_prov = dict(prov)
            filtered_prov["models"] = filtered_models
            filtered_providers[prov_key] = filtered_prov
    return {"providers": filtered_providers}


def _compute_hash(item: SourceItem) -> str:
    if item.item_type == "skill":
        return compute_directory_hash(item.path.parent.resolve())
    return compute_file_hash(item.content)


def _deploy_item(
    target: Target,
    item: SourceItem,
    *,
    filtered_models_config: Optional[dict] = None,
) -> None:
    """Deploy a single source item to a target."""
    if item.item_type == "agent":
        target.deploy_agent(item.name, item.content)
    elif item.item_type == "command":
        target.deploy_command(item.name, item.content)
    elif item.item_type == "skill":
        target.deploy_skill(item.name, item.path.parent)
    elif item.item_type == "mcp":
        target.deploy_mcp_server(item.name, item.metadata or {})
    elif item.item_type == "models":
        target.deploy_models(filtered_models_config or {})
    elif item.item_type == "hook":
        target.deploy_hook(item.name, item.metadata or {})


def _remove_item(target: Target, category: str, name: str) -> None:
    """Remove a single item from a target by manifest category."""
    if category == "agents":
        target.remove_agent(name)
    elif category == "commands":
        target.remove_command(name)
    elif category == "skills":
        target.remove_skill(name)
    elif category == "mcp_servers":
        target.remove_mcp_server(name)
    elif category == "models":
        target.remove_models()
    elif category == "hooks":
        target.remove_hook(name)


def deploy(
    config: Config,
    target_ids: Optional[List[str]] = None,
    dry_run: bool = False,
    verbose: bool = False,
    quiet: bool = False,
    item_types: Optional[List[str]] = None,
    force: bool = False,
) -> List[DeployAction]:
    """Deploy source items to targets.

    Args:
        config: Loaded Config.
        target_ids: Specific targets to deploy to (None = all).
        dry_run: If True, compute actions without writing anything.
        verbose: Print extra detail.
        quiet: Suppress output.
        item_types: CLI --only-type values (plural) to filter by.
        force: If True, deploy all items regardless of checksum or
            pre-existing state.

    Returns:
        List of DeployAction records describing what was done.
    """
    if target_ids is None:
        target_ids = list(config.targets.keys())

    # Resolve --only-type filter to singular item_type values
    allowed_types: Optional[Set[str]] = None
    if item_types:
        allowed_types = {_CLI_TYPE_TO_ITEM_TYPE[t] for t in item_types}

    discovery = SourceDiscovery(config.source_root)
    all_items = list(discovery.discover_all())

    actions: List[DeployAction] = []

    for target_id in target_ids:
        target_config = config.targets[target_id]
        target = create_target(target_config)
        try:
            target.prepare(verbose=verbose)
            manifest = load_manifest(target.manifest_path())
            new_manifest = Manifest(deployed_at=datetime.now(timezone.utc).isoformat())

            # Track which (category, name) pairs we process for stale detection
            deployed_names: set[tuple[str, str]] = set()

            for item in all_items:
                # Apply --only-type filter
                if allowed_types is not None and item.item_type not in allowed_types:
                    continue

                # Apply environment filters (filetags + only/except)
                if not should_deploy_to(
                    target_id,
                    item.metadata,
                    config,
                    str(item.path),
                    filetags=item.filetags,
                ):
                    continue

                # Skip items the target would no-op
                if target.should_skip(
                    item.item_type, item.name, item.content, item.metadata
                ):
                    continue

                category = _TYPE_TO_CATEGORY[item.item_type]
                current_hash = _compute_hash(item)
                deployed_names.add((category, item.name))

                changed = has_changed(manifest, category, item.name, current_hash)
                exists_on_target = target.item_exists(item.item_type, item.name)

                if force or changed or not exists_on_target:
                    # Determine if create or update
                    is_update = (
                        category in manifest.items
                        and item.name in manifest.items[category]
                    )

                    # Detect pre-existing: new item but target already has something
                    if not force and not is_update and exists_on_target:
                        actions.append(
                            DeployAction(
                                action="pre-existing",
                                item_type=item.item_type,
                                name=item.name,
                                target_id=target_id,
                                source_path=str(item.path),
                            )
                        )
                        continue

                    action_type = "update" if is_update else "create"

                    if not dry_run:
                        if item.item_type == "models":
                            filtered = _filter_models_config(
                                item.metadata or {}, target_id, config
                            )
                            _deploy_item(target, item, filtered_models_config=filtered)
                        else:
                            _deploy_item(target, item)

                    actions.append(
                        DeployAction(
                            action=action_type,
                            item_type=item.item_type,
                            name=item.name,
                            target_id=target_id,
                            source_path=str(item.path),
                        )
                    )
                else:
                    actions.append(
                        DeployAction(
                            action="skip",
                            item_type=item.item_type,
                            name=item.name,
                            target_id=target_id,
                            source_path=str(item.path),
                        )
                    )

                # Record in new manifest regardless of action
                new_manifest.items.setdefault(category, {})[item.name] = ManifestItem(
                    source_hash=current_hash
                )

            # Detect stale items: in old manifest but not in new source
            for category, items_dict in manifest.items.items():
                for name in items_dict:
                    if (category, name) in deployed_names:
                        continue
                    # If --only-type is active, only remove items of matching types
                    if allowed_types is not None:
                        cat_type = {v: k for k, v in _TYPE_TO_CATEGORY.items()}.get(
                            category
                        )
                        if cat_type not in allowed_types:
                            # Preserve unfiltered items in new manifest
                            new_manifest.items.setdefault(category, {})[name] = (
                                items_dict[name]
                            )
                            continue

                    if not dry_run:
                        _remove_item(target, category, name)

                    actions.append(
                        DeployAction(
                            action="remove",
                            item_type={v: k for k, v in _TYPE_TO_CATEGORY.items()}.get(
                                category, category
                            ),
                            name=name,
                            target_id=target_id,
                        )
                    )

            # Save updated manifest (atomic write)
            if not dry_run:
                save_manifest(new_manifest, target.manifest_path())
                target.finalize(verbose=verbose)
            else:
                target.cleanup()
        except BaseException:
            target.cleanup()
            raise

    return actions
