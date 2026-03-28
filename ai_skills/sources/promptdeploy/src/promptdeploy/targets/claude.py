"""Claude Code target implementation."""

from __future__ import annotations

import json
import os
import shutil
import tempfile
from pathlib import Path
from typing import Optional

from ..frontmatter import transform_for_target
from ..manifest import MANIFEST_FILENAME
from .base import Target

# Keys that are deployment metadata, not part of the Claude MCP server config.
_MCP_STRIP_KEYS = frozenset(
    {"name", "description", "scope", "enabled", "only", "except"}
)


class ClaudeTarget(Target):
    """Deploy prompts and MCP servers into a Claude Code configuration directory."""

    def __init__(self, target_id: str, config_path: Path) -> None:
        self._id = target_id
        self._config_path = config_path.expanduser().resolve()

    @property
    def id(self) -> str:
        return self._id

    def exists(self) -> bool:
        return self._config_path.is_dir()

    def manifest_path(self) -> Path:
        return self._config_path / MANIFEST_FILENAME

    def rsync_includes(self) -> list[str] | None:
        return [
            "agents/",
            "agents/**",
            "commands/",
            "commands/**",
            "skills/",
            "skills/**",
            "settings.json",
            MANIFEST_FILENAME,
        ]

    # ------------------------------------------------------------------
    # Deploy
    # ------------------------------------------------------------------

    def deploy_agent(self, name: str, content: bytes) -> None:
        dest = self._config_path / "agents" / f"{name}.md"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(transform_for_target(content, self._id))

    def deploy_command(self, name: str, content: bytes) -> None:
        dest = self._config_path / "commands" / f"{name}.md"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(transform_for_target(content, self._id))

    def deploy_skill(self, name: str, source_dir: Path) -> None:
        dest = self._config_path / "skills" / name
        if dest.is_symlink():
            dest.unlink()
        elif dest.exists():
            shutil.rmtree(dest)
        # Resolve symlinks so the deployed copy is self-contained.
        shutil.copytree(source_dir.resolve(), dest, symlinks=False)
        # Transform the SKILL.md inside the deployed copy.
        skill_md = dest / "SKILL.md"
        if skill_md.exists():
            skill_md.write_bytes(transform_for_target(skill_md.read_bytes(), self._id))

    def should_skip(
        self,
        item_type: str,
        name: str,
        content: Optional[bytes] = None,
        metadata: Optional[dict] = None,
    ) -> bool:
        return item_type == "models"

    def deploy_models(self, config: dict) -> None:
        pass  # Claude Code does not support custom models

    def deploy_hook(self, name: str, config: dict) -> None:
        settings = self._load_json(self._settings_path())
        hooks_config = config.get("hooks", {})
        settings_hooks = settings.setdefault("hooks", {})

        # Remove ALL existing entries from this hook group across every
        # event type -- not just the ones in the new config.  This handles
        # the case where a hook group previously contributed to an event
        # type that is no longer present in the updated YAML.
        empty_event_types = []
        for event_type, entries in settings_hooks.items():
            filtered = [e for e in entries if e.get("_source") != name]
            if filtered:
                settings_hooks[event_type] = filtered
            else:
                empty_event_types.append(event_type)
        for event_type in empty_event_types:
            del settings_hooks[event_type]

        # Add new entries with _source tag, removing any pre-existing
        # duplicates that match ignoring the _source field.
        for event_type, matchers in hooks_config.items():
            event_list = settings_hooks.setdefault(event_type, [])
            for entry in matchers:
                new_entry = dict(entry)
                new_entry["_source"] = name
                content = {k: v for k, v in new_entry.items() if k != "_source"}
                event_list[:] = [
                    e
                    for e in event_list
                    if {k: v for k, v in e.items() if k != "_source"} != content
                ]
                event_list.append(new_entry)

        if not settings_hooks:
            settings.pop("hooks", None)

        self._save_json(self._settings_path(), settings)

    def deploy_mcp_server(self, name: str, config: dict) -> None:
        settings = self._load_json(self._settings_path())

        if not config.get("enabled", True):
            settings.get("mcpServers", {}).pop(name, None)
        else:
            claude_config = {
                k: v for k, v in config.items() if k not in _MCP_STRIP_KEYS
            }
            if "env" in claude_config:
                from ..envsubst import expand_env_in_dict

                claude_config["env"] = expand_env_in_dict(claude_config["env"])
            settings.setdefault("mcpServers", {})[name] = claude_config

        self._save_json(self._settings_path(), settings)

    # ------------------------------------------------------------------
    # Remove
    # ------------------------------------------------------------------

    def remove_agent(self, name: str) -> None:
        self._remove_file(self._config_path / "agents" / f"{name}.md")

    def remove_command(self, name: str) -> None:
        self._remove_file(self._config_path / "commands" / f"{name}.md")

    def remove_skill(self, name: str) -> None:
        dest = self._config_path / "skills" / name
        if dest.is_symlink():
            dest.unlink()
        elif dest.exists():
            shutil.rmtree(dest)

    def remove_models(self) -> None:
        pass  # Claude Code does not support custom models

    def remove_hook(self, name: str) -> None:
        path = self._settings_path()
        if not path.exists():
            return
        settings = self._load_json(path)
        hooks = settings.get("hooks")
        if not isinstance(hooks, dict):
            return
        empty_event_types = []
        for event_type, entries in hooks.items():
            filtered = [e for e in entries if e.get("_source") != name]
            if filtered:
                hooks[event_type] = filtered
            else:
                empty_event_types.append(event_type)
        for event_type in empty_event_types:
            del hooks[event_type]
        if not hooks:
            del settings["hooks"]
        self._save_json(path, settings)

    def remove_mcp_server(self, name: str) -> None:
        path = self._settings_path()
        if not path.exists():
            return
        settings = self._load_json(path)
        settings.get("mcpServers", {}).pop(name, None)
        self._save_json(path, settings)

    # ------------------------------------------------------------------
    # Pre-existing detection
    # ------------------------------------------------------------------

    def item_exists(self, item_type: str, name: str) -> bool:
        if item_type == "agent":
            return (self._config_path / "agents" / f"{name}.md").exists()
        if item_type == "command":
            return (self._config_path / "commands" / f"{name}.md").exists()
        if item_type == "skill":
            dest = self._config_path / "skills" / name
            return dest.exists() or dest.is_symlink()
        if item_type == "hook":
            settings = self._load_json(self._settings_path())
            hooks = settings.get("hooks")
            if not isinstance(hooks, dict):
                return False
            return any(
                e.get("_source") == name for entries in hooks.values() for e in entries
            )
        if item_type == "mcp":
            settings = self._load_json(self._settings_path())
            return name in settings.get("mcpServers", {})
        return False

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    def _settings_path(self) -> Path:
        return self._config_path / "settings.json"

    @staticmethod
    def _remove_file(path: Path) -> None:
        try:
            path.unlink()
        except FileNotFoundError:
            pass

    @staticmethod
    def _load_json(path: Path) -> dict:
        if not path.exists():
            return {}
        return json.loads(path.read_text("utf-8"))

    @staticmethod
    def _save_json(path: Path, data: dict) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        fd, tmp = tempfile.mkstemp(dir=path.parent, suffix=".tmp")
        try:
            with os.fdopen(fd, "w") as f:
                json.dump(data, f, indent=2)
                f.write("\n")
            os.replace(tmp, path)
        except BaseException:
            try:
                os.unlink(tmp)
            except OSError:
                pass
            raise
