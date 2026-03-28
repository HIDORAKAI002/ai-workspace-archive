from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional

import yaml


@dataclass
class TargetConfig:
    id: str
    type: str  # 'claude', 'droid', 'opencode'
    path: Path
    host: Optional[str] = None
    labels: List[str] = None  # type: ignore[assignment]

    def __post_init__(self) -> None:
        if self.labels is None:
            self.labels = []


@dataclass
class Config:
    source_root: Path
    targets: Dict[str, TargetConfig]
    groups: Dict[str, List[str]]


def find_config_file(start_dir: Optional[Path] = None) -> Path:
    if start_dir is None:
        start_dir = Path.cwd()
    current = start_dir.resolve()
    while current != current.parent:
        config_path = current / "deploy.yaml"
        if config_path.exists():
            return config_path
        current = current.parent
    raise FileNotFoundError(
        f"Could not find deploy.yaml in {start_dir} or any parent directory"
    )


def load_config(config_path: Optional[Path] = None) -> Config:
    if config_path is None:
        config_path = find_config_file()
    with open(config_path, "r") as f:
        data = yaml.safe_load(f)

    source_root = Path(data.get("source_root", config_path.parent))
    if not source_root.is_absolute():
        source_root = (config_path.parent / source_root).resolve()
    else:
        source_root = source_root.expanduser().resolve()

    targets = {}
    for target_id, target_data in data.get("targets", {}).items():
        host = target_data.get("host")
        path = Path(target_data["path"])
        if host is None:
            path = path.expanduser()
        labels = target_data.get("labels", [])
        targets[target_id] = TargetConfig(
            id=target_id,
            type=target_data["type"],
            path=path,
            host=host,
            labels=labels,
        )

    groups: Dict[str, List[str]] = dict(data.get("groups", {}))

    # Auto-generate groups from target labels (merge with explicit groups)
    for target_id, tc in targets.items():
        for label in tc.labels:
            groups.setdefault(label, [])
            if target_id not in groups[label]:
                groups[label].append(target_id)

    return Config(source_root=source_root, targets=targets, groups=groups)


def remap_targets_to_root(config: Config, root: Path) -> Config:
    """Return a new Config with all target paths remapped under root.

    Each target's path is replaced with ``root / target_id``, allowing
    deployment to be previewed in a scratch directory without touching real
    configuration files.

    Args:
        config: The original configuration.
        root: The directory under which all targets will be remapped.

    Returns:
        A new :class:`Config` instance with remapped target paths.

    Example::

        new_cfg = remap_targets_to_root(config, Path("/tmp/preview"))
        # config.targets["claude-personal"].path == Path("/tmp/preview/claude-personal")
    """
    new_targets = {}
    for tid, tc in config.targets.items():
        new_targets[tid] = TargetConfig(
            id=tc.id, type=tc.type, path=root / tid, host=None, labels=list(tc.labels)
        )
    return Config(
        source_root=config.source_root,
        targets=new_targets,
        groups=config.groups,
    )


def expand_target_arg(targets_arg: Optional[List[str]], config: Config) -> List[str]:
    if targets_arg is None:
        return list(config.targets.keys())
    result = []
    for t in targets_arg:
        if t in config.groups:
            result.extend(config.groups[t])
        elif t in config.targets:
            result.append(t)
        else:
            raise ValueError(f"Unknown target: {t}")
    return result
