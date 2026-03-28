"""Droid target implementation."""

from __future__ import annotations

import json
import os
import shutil
import tempfile
from pathlib import Path
from typing import Optional

from ..frontmatter import parse_frontmatter, transform_for_target
from ..manifest import MANIFEST_FILENAME
from .base import Target

# Keys that are deployment metadata, not part of the MCP server config.
_MCP_STRIP_KEYS = frozenset(
    {"name", "description", "scope", "enabled", "only", "except"}
)


class DroidTarget(Target):
    """Deploy prompts and MCP servers into a Droid configuration directory."""

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
            "droids/",
            "droids/**",
            "skills/",
            "skills/**",
            "settings.json",
            "mcp.json",
            MANIFEST_FILENAME,
        ]

    def should_skip(
        self,
        item_type: str,
        name: str,
        content: Optional[bytes] = None,
        metadata: Optional[dict] = None,
    ) -> bool:
        if item_type == "hook":
            return True
        if item_type == "command":
            if content is not None:
                fm, _ = parse_frontmatter(content)
                if fm and fm.get("droid_deploy") == "skill":
                    return False
            return True
        return False

    # ------------------------------------------------------------------
    # Deploy
    # ------------------------------------------------------------------

    def deploy_agent(self, name: str, content: bytes) -> None:
        dest = self._config_path / "droids" / f"{name}.md"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(transform_for_target(content, self._id))

    def deploy_command(self, name: str, content: bytes) -> None:
        # Commands are skipped by default on Droid. However, if
        # frontmatter contains droid_deploy: 'skill', wrap as a skill.
        metadata, body = parse_frontmatter(content)
        if metadata and metadata.get("droid_deploy") == "skill":
            dest = self._config_path / "skills" / name
            dest.mkdir(parents=True, exist_ok=True)
            skill_md = dest / "SKILL.md"
            skill_md.write_bytes(transform_for_target(content, self._id))
            return
        # Otherwise: skip silently.

    def deploy_skill(self, name: str, source_dir: Path) -> None:
        dest = self._config_path / "skills" / name
        if dest.is_symlink():
            dest.unlink()
        elif dest.exists():
            shutil.rmtree(dest)
        shutil.copytree(source_dir.resolve(), dest, symlinks=False)
        skill_md = dest / "SKILL.md"
        if skill_md.exists():
            skill_md.write_bytes(transform_for_target(skill_md.read_bytes(), self._id))

    def deploy_hook(self, name: str, config: dict) -> None:
        pass

    def remove_hook(self, name: str) -> None:
        pass

    def deploy_models(self, config: dict) -> None:
        from ..envsubst import expand_env_vars

        settings_path = self._config_path / "settings.json"
        data = self._load_json(settings_path)

        custom_models = []
        index = 0

        for prov_key, prov in config.get("providers", {}).items():
            display_prefix = prov.get("display_name", prov_key)
            base_url = prov.get("base_url", "")
            api_key = expand_env_vars(prov.get("api_key", ""))
            droid_cfg = prov.get("droid", {})
            provider_type = droid_cfg.get(
                "provider_type", "generic-chat-completion-api"
            )
            no_image_support = droid_cfg.get("no_image_support", False)
            extra_args = droid_cfg.get("extra_args")
            extra_headers = droid_cfg.get("extra_headers")

            for model_id, model in prov.get("models", {}).items():
                if model is None:
                    model = {}
                display_name = (
                    f"[{display_prefix}] {model.get('display_name', model_id)}"
                )
                slug = display_name.replace(" ", "-")
                entry: dict = {
                    "apiKey": api_key,
                    "baseUrl": base_url,
                    "displayName": display_name,
                    "id": f"custom:{slug}-{index}",
                    "index": index,
                    "model": model_id,
                    "noImageSupport": no_image_support,
                    "provider": provider_type,
                }
                max_output = model.get("max_output_tokens")
                if max_output is not None:
                    entry["maxOutputTokens"] = max_output
                if extra_args is not None:
                    entry["extraArgs"] = dict(extra_args)
                if extra_headers is not None:
                    entry["extraHeaders"] = dict(extra_headers)

                custom_models.append(entry)
                index += 1

        data["customModels"] = custom_models
        self._save_json(settings_path, data)

    def deploy_mcp_server(self, name: str, config: dict) -> None:
        mcp_path = self._mcp_path()
        data = self._load_json(mcp_path)

        if not config.get("enabled", True):
            data.get("mcpServers", {}).pop(name, None)
        else:
            droid_config: dict = {}
            # Determine type based on presence of url vs command.
            if "url" in config:
                droid_config["type"] = "http"
            else:
                droid_config["type"] = "stdio"
            # Copy non-metadata keys.
            for k, v in config.items():
                if k not in _MCP_STRIP_KEYS and k != "url":
                    droid_config[k] = v
                elif k == "url":
                    droid_config["url"] = v
            # Map enabled:false -> disabled:true (already handled above for
            # the removal case; here we handle explicitly-enabled servers).
            droid_config["disabled"] = False
            data.setdefault("mcpServers", {})[name] = droid_config

        self._save_json(mcp_path, data)

    # ------------------------------------------------------------------
    # Remove
    # ------------------------------------------------------------------

    def remove_agent(self, name: str) -> None:
        self._remove_file(self._config_path / "droids" / f"{name}.md")

    def remove_command(self, name: str) -> None:
        # Commands could have been deployed as skills.
        dest = self._config_path / "skills" / name
        if dest.is_symlink():
            dest.unlink()
        elif dest.exists():
            shutil.rmtree(dest)

    def remove_skill(self, name: str) -> None:
        dest = self._config_path / "skills" / name
        if dest.is_symlink():
            dest.unlink()
        elif dest.exists():
            shutil.rmtree(dest)

    def remove_models(self) -> None:
        settings_path = self._config_path / "settings.json"
        if not settings_path.exists():
            return
        data = self._load_json(settings_path)
        data.pop("customModels", None)
        self._save_json(settings_path, data)

    def remove_mcp_server(self, name: str) -> None:
        path = self._mcp_path()
        if not path.exists():
            return
        data = self._load_json(path)
        data.get("mcpServers", {}).pop(name, None)
        self._save_json(path, data)

    # ------------------------------------------------------------------
    # Pre-existing detection
    # ------------------------------------------------------------------

    def item_exists(self, item_type: str, name: str) -> bool:
        if item_type == "agent":
            return (self._config_path / "droids" / f"{name}.md").exists()
        if item_type in ("command", "skill"):
            dest = self._config_path / "skills" / name
            return dest.exists() or dest.is_symlink()
        if item_type == "mcp":
            data = self._load_json(self._mcp_path())
            return name in data.get("mcpServers", {})
        if item_type == "models":
            data = self._load_json(self._config_path / "settings.json")
            return bool(data.get("customModels"))
        return False

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    def _mcp_path(self) -> Path:
        return self._config_path / "mcp.json"

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
