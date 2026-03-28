import tempfile
from pathlib import Path

from .base import Target
from .claude import ClaudeTarget
from .droid import DroidTarget
from .opencode import OpenCodeTarget
from .remote import RemoteTarget


def create_target(target_config):
    """Create a Target instance from a TargetConfig.

    When the config has a ``host`` field, the inner target operates on a
    local staging directory and is wrapped in :class:`RemoteTarget` which
    handles rsync-based sync to/from the remote host.
    """
    from .claude import ClaudeTarget
    from .droid import DroidTarget
    from .opencode import OpenCodeTarget

    is_remote = target_config.host is not None
    if is_remote:
        staging_path = Path(
            tempfile.mkdtemp(prefix=f"promptdeploy-{target_config.id}-")
        )
    else:
        staging_path = target_config.path

    factories = {
        "claude": lambda tc, p: ClaudeTarget(tc.id, p),
        "droid": lambda tc, p: DroidTarget(tc.id, p),
        "opencode": lambda tc, p: OpenCodeTarget(tc.id, p),
    }
    factory = factories.get(target_config.type)
    if factory is None:
        raise ValueError(f"Unknown target type: {target_config.type}")

    inner = factory(target_config, staging_path)

    if is_remote:
        return RemoteTarget(inner, target_config.host, target_config.path, staging_path)

    return inner


__all__ = [
    "Target",
    "ClaudeTarget",
    "DroidTarget",
    "OpenCodeTarget",
    "RemoteTarget",
    "create_target",
]
