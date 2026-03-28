"""Validation for source items and configuration."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import List, Optional

import yaml

from .config import Config
from .frontmatter import FrontmatterError, parse_frontmatter
from .source import SourceDiscovery, SourceItem


@dataclass
class ValidationIssue:
    """A single validation problem found in a source item."""

    level: str  # 'error' or 'warning'
    message: str
    file_path: Path
    line: Optional[int] = None


def validate_all(config: Config) -> List[ValidationIssue]:
    """Validate all discoverable source items against the config."""
    issues: List[ValidationIssue] = []
    discovery = SourceDiscovery(config.source_root)

    all_items: List[SourceItem] = []

    # Discover each type separately, catching parse errors during discovery
    for discover_fn, dir_name in [
        (discovery.discover_agents, "agents"),
        (discovery.discover_commands, "commands"),
        (discovery.discover_skills, "skills"),
        (discovery.discover_mcp_servers, "mcp"),
        (discovery.discover_models, "models"),
        (discovery.discover_hooks, "hooks"),
    ]:
        try:
            for item in discover_fn():
                all_items.append(item)
                issues.extend(validate_item(item, config))
        except (FrontmatterError, yaml.YAMLError) as e:
            # Discovery itself failed on a file - report as validation error
            issues.append(
                ValidationIssue(
                    level="error",
                    message=f"Discovery failed in {dir_name}/: {e}",
                    file_path=config.source_root / dir_name,
                )
            )

    # Detect duplicate resolved names within each item type
    seen: dict[tuple[str, str], Path] = {}
    for item in all_items:
        key = (item.item_type, item.name)
        if key in seen:
            issues.append(
                ValidationIssue(
                    level="error",
                    message=(
                        f"Duplicate {item.item_type} name '{item.name}' "
                        f"(also defined by {seen[key]})"
                    ),
                    file_path=item.path,
                )
            )
        else:
            seen[key] = item.path

    return issues


def validate_item(item: SourceItem, config: Config) -> List[ValidationIssue]:
    """Validate a single source item."""
    issues: List[ValidationIssue] = []

    _VALID_HOOK_EVENTS = frozenset(
        {
            "PreToolUse",
            "PostToolUse",
            "PostToolUseFailure",
            "PermissionRequest",
            "Notification",
            "SubagentStart",
            "SubagentStop",
            "Stop",
            "TeammateIdle",
            "TaskCompleted",
            "SessionStart",
            "SessionEnd",
            "PreCompact",
            "UserPromptSubmit",
            "InstructionsLoaded",
            "ConfigChange",
            "WorktreeCreate",
            "WorktreeRemove",
        }
    )

    # Parse metadata
    try:
        if item.item_type in ("mcp", "models", "hook"):
            metadata = yaml.safe_load(item.content.decode("utf-8"))
            if not isinstance(metadata, dict):
                metadata = None
        else:
            metadata, _ = parse_frontmatter(item.content)
    except (yaml.YAMLError, FrontmatterError) as e:
        return [
            ValidationIssue(
                level="error",
                message=f"Invalid YAML: {e}",
                file_path=item.path,
            )
        ]

    # Validate filetag labels
    if item.filetags:
        valid_ids = set(config.targets.keys()) | set(config.groups.keys())
        for tag in item.filetags:
            if tag not in valid_ids:
                issues.append(
                    ValidationIssue(
                        level="error",
                        message=f"Invalid filetag label '{tag}'",
                        file_path=item.path,
                    )
                )

    if metadata is None:
        return issues

    # Check only/except mutual exclusivity
    only = metadata.get("only")
    except_ = metadata.get("except")
    if only is not None and except_ is not None:
        issues.append(
            ValidationIssue(
                level="error",
                message="Cannot specify both 'only' and 'except'",
                file_path=item.path,
            )
        )

    # Validate environment IDs
    valid_ids = set(config.targets.keys()) | set(config.groups.keys())
    for env_list, field_name in [(only, "only"), (except_, "except")]:
        if env_list is not None:
            if not isinstance(env_list, list):
                issues.append(
                    ValidationIssue(
                        level="error",
                        message=f"'{field_name}' must be a list",
                        file_path=item.path,
                    )
                )
                continue
            for env_id in env_list:
                if env_id not in valid_ids:
                    issues.append(
                        ValidationIssue(
                            level="error",
                            message=f"Invalid environment ID '{env_id}' in '{field_name}'",
                            file_path=item.path,
                        )
                    )

    # MCP-specific validations
    if item.item_type == "mcp":
        if "name" not in metadata:
            issues.append(
                ValidationIssue(
                    level="error",
                    message="MCP server missing 'name' field",
                    file_path=item.path,
                )
            )
        if "command" not in metadata and "url" not in metadata:
            issues.append(
                ValidationIssue(
                    level="error",
                    message="MCP server missing 'command' or 'url'",
                    file_path=item.path,
                )
            )

    # Hook-specific validations
    if item.item_type == "hook":
        if "name" not in metadata:
            issues.append(
                ValidationIssue(
                    level="error",
                    message="Hook group missing 'name' field",
                    file_path=item.path,
                )
            )
        hooks_field = metadata.get("hooks")
        if not isinstance(hooks_field, dict):
            issues.append(
                ValidationIssue(
                    level="error",
                    message="Hook group missing or invalid 'hooks' field (must be a dict)",
                    file_path=item.path,
                )
            )
        else:
            for event_type, entries in hooks_field.items():
                if event_type not in _VALID_HOOK_EVENTS:
                    issues.append(
                        ValidationIssue(
                            level="error",
                            message=f"Invalid hook event type '{event_type}'",
                            file_path=item.path,
                        )
                    )
                if not isinstance(entries, list) or len(entries) == 0:
                    issues.append(
                        ValidationIssue(
                            level="error",
                            message=f"Hook event '{event_type}' must be a non-empty list",
                            file_path=item.path,
                        )
                    )

    # Models-specific validations
    if item.item_type == "models":
        providers = metadata.get("providers")
        if not isinstance(providers, dict) or not providers:
            issues.append(
                ValidationIssue(
                    level="error",
                    message="models.yaml missing or empty 'providers'",
                    file_path=item.path,
                )
            )
        else:
            for prov_key, prov in providers.items():
                if not isinstance(prov, dict):
                    issues.append(
                        ValidationIssue(
                            level="error",
                            message=f"Provider '{prov_key}' must be a mapping",
                            file_path=item.path,
                        )
                    )
                    continue
                for required in ("display_name", "base_url", "api_key"):
                    if required not in prov:
                        issues.append(
                            ValidationIssue(
                                level="error",
                                message=f"Provider '{prov_key}' missing required field '{required}'",
                                file_path=item.path,
                            )
                        )
                models = prov.get("models")
                if not isinstance(models, dict) or not models:
                    issues.append(
                        ValidationIssue(
                            level="error",
                            message=f"Provider '{prov_key}' has no models defined",
                            file_path=item.path,
                        )
                    )
                # Validate provider-level only/except
                p_only = prov.get("only")
                p_except = prov.get("except")
                if p_only is not None and p_except is not None:
                    issues.append(
                        ValidationIssue(
                            level="error",
                            message=f"Provider '{prov_key}': cannot specify both 'only' and 'except'",
                            file_path=item.path,
                        )
                    )
                for env_list, field_name in [(p_only, "only"), (p_except, "except")]:
                    if env_list is not None:
                        if not isinstance(env_list, list):
                            issues.append(
                                ValidationIssue(
                                    level="error",
                                    message=f"Provider '{prov_key}': '{field_name}' must be a list",
                                    file_path=item.path,
                                )
                            )
                        else:
                            for env_id in env_list:
                                if env_id not in valid_ids:
                                    issues.append(
                                        ValidationIssue(
                                            level="error",
                                            message=f"Provider '{prov_key}': invalid environment ID '{env_id}' in '{field_name}'",
                                            file_path=item.path,
                                        )
                                    )
                # Validate model-level only/except
                if isinstance(models, dict):
                    for model_id, model in models.items():
                        if not isinstance(model, dict):
                            continue
                        m_only = model.get("only")
                        m_except = model.get("except")
                        if m_only is not None and m_except is not None:
                            issues.append(
                                ValidationIssue(
                                    level="error",
                                    message=f"Model '{model_id}' in '{prov_key}': cannot specify both 'only' and 'except'",
                                    file_path=item.path,
                                )
                            )
                        for env_list, field_name in [
                            (m_only, "only"),
                            (m_except, "except"),
                        ]:
                            if env_list is not None:
                                if not isinstance(env_list, list):
                                    issues.append(
                                        ValidationIssue(
                                            level="error",
                                            message=f"Model '{model_id}' in '{prov_key}': '{field_name}' must be a list",
                                            file_path=item.path,
                                        )
                                    )
                                else:
                                    for env_id in env_list:
                                        if env_id not in valid_ids:
                                            issues.append(
                                                ValidationIssue(
                                                    level="error",
                                                    message=f"Model '{model_id}' in '{prov_key}': invalid environment ID '{env_id}' in '{field_name}'",
                                                    file_path=item.path,
                                                )
                                            )

    return issues
