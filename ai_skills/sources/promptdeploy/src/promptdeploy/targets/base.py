from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Optional


class Target(ABC):
    @property
    @abstractmethod
    def id(self) -> str: ...

    @abstractmethod
    def exists(self) -> bool: ...

    def prepare(self, *, verbose: bool = False) -> None:
        """Called before any deploy/read operations. No-op for local targets."""

    def finalize(self, *, verbose: bool = False) -> None:
        """Called after all deploy operations complete. No-op for local targets."""

    def cleanup(self) -> None:
        """Called to release resources (e.g. temp dirs) without pushing changes."""

    def rsync_includes(self) -> list[str] | None:
        """Return rsync include patterns for managed paths.

        When non-None, only these paths are synced to/from the remote.
        Returning None (the default) syncs the entire directory.
        """
        return None

    def should_skip(
        self,
        item_type: str,
        name: str,
        content: Optional[bytes] = None,
        metadata: Optional[dict] = None,
    ) -> bool:
        """Return True if this target would no-op the deploy for this item.

        When True, the deploy loop will not call the deploy method and will
        not record the item in the manifest -- ensuring idempotency for
        items that a target silently ignores.
        """
        return False

    @abstractmethod
    def deploy_agent(self, name: str, content: bytes) -> None: ...

    @abstractmethod
    def deploy_command(self, name: str, content: bytes) -> None: ...

    @abstractmethod
    def deploy_skill(self, name: str, source_dir: Path) -> None: ...

    @abstractmethod
    def deploy_mcp_server(self, name: str, config: dict) -> None: ...

    @abstractmethod
    def deploy_models(self, config: dict) -> None: ...

    @abstractmethod
    def deploy_hook(self, name: str, config: dict) -> None: ...

    @abstractmethod
    def remove_agent(self, name: str) -> None: ...

    @abstractmethod
    def remove_command(self, name: str) -> None: ...

    @abstractmethod
    def remove_skill(self, name: str) -> None: ...

    @abstractmethod
    def remove_mcp_server(self, name: str) -> None: ...

    @abstractmethod
    def remove_models(self) -> None: ...

    @abstractmethod
    def remove_hook(self, name: str) -> None: ...

    @abstractmethod
    def item_exists(self, item_type: str, name: str) -> bool:
        """Check if an item already exists at the deploy target path.

        Used to detect pre-existing items that were not deployed by
        promptdeploy and should not be overwritten or removed.
        """
        ...

    @abstractmethod
    def manifest_path(self) -> Path: ...
