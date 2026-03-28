"""Environment filtering for selective deployment."""

from typing import List, Optional, Set

from .config import Config


class FilterError(Exception):
    """Raised when environment filtering configuration is invalid."""


def expand_group(env_id: str, config: Config) -> List[str]:
    """Expand a group ID to its member environments using config.groups."""
    if env_id in config.groups:
        return config.groups[env_id]
    return [env_id]


def expand_list(env_list: Optional[List[str]], config: Config) -> Set[str]:
    """Expand a list of environment IDs, resolving any groups."""
    if env_list is None:
        return set()
    result: Set[str] = set()
    for env_id in env_list:
        result.update(expand_group(env_id, config))
    return result


def validate_environments(
    env_list: Optional[List[str]], config: Config, source_path: str
) -> None:
    """Validate all environment IDs are valid targets or groups."""
    if env_list is None:
        return
    valid = set(config.targets.keys()) | set(config.groups.keys())
    for env_id in env_list:
        if env_id not in valid:
            raise FilterError(
                f"Invalid environment ID '{env_id}' in {source_path}. "
                f"Valid IDs: {', '.join(sorted(valid))}"
            )


def _filetags_match(
    target_id: str,
    filetags: List[str],
    config: Config,
    source_path: str,
) -> bool:
    """Check if ALL filetags match the target's labels.

    Each filetag is treated as a label/group name.  The target must be
    a member of *every* tag's expanded group for the match to succeed.
    """
    validate_environments(filetags, config, source_path)
    target_labels = set(config.targets[target_id].labels)
    for tag in filetags:
        if (
            tag == target_id
            or tag in target_labels
            or tag in config.groups
            and target_id in expand_list([tag], config)
        ):
            continue
        # Tag doesn't match this target
        return False
    return True


def should_deploy_to(
    target_id: str,
    metadata: Optional[dict],
    config: Config,
    source_path: str,
    filetags: Optional[List[str]] = None,
) -> bool:
    """Determine if an item should be deployed to a target.

    Rules:
    - Filetags (if present) act as implicit ``only`` labels with AND
      semantics: the target must match ALL tags.
    - No metadata or no only/except keys: deploy everywhere.
    - only: deploy only to listed environments (groups expanded).
    - except: deploy everywhere except listed environments.
    - Both only and except: raises FilterError.
    - Filetags AND-compose with frontmatter only/except.
    """
    # Check filetags first — they restrict independently of metadata
    if filetags:
        if not _filetags_match(target_id, filetags, config, source_path):
            return False

    if metadata is None:
        return True

    only = metadata.get("only")
    except_ = metadata.get("except")

    if only is not None and except_ is not None:
        raise FilterError(f"Cannot specify both 'only' and 'except' in {source_path}")

    validate_environments(only, config, source_path)
    validate_environments(except_, config, source_path)

    if only is None and except_ is None:
        return True

    if only is not None:
        return target_id in expand_list(only, config)

    return target_id not in expand_list(except_, config)
