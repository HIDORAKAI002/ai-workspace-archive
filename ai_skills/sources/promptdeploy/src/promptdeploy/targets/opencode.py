"""OpenCode target implementation."""

from __future__ import annotations

import json
import os
import re
import shutil
import tempfile
from pathlib import Path
from typing import Optional

from ..frontmatter import (
    parse_frontmatter,
    serialize_frontmatter,
    strip_deployment_fields,
)
from ..manifest import MANIFEST_FILENAME
from .base import Target

# Keys that are deployment metadata, not part of the MCP server config.
_MCP_STRIP_KEYS = frozenset(
    {"name", "description", "scope", "enabled", "only", "except"}
)

# Frontmatter fields that use Claude Code format and are incompatible
# with OpenCode's schema.  These are stripped after being converted
# (where possible) to OpenCode equivalents.
_CLAUDE_ONLY_FIELDS = frozenset({"model"})

# Known OpenCode built-in tool names (lowercase).
_OPENCODE_TOOL_NAMES = frozenset(
    {
        "bash",
        "edit",
        "glob",
        "grep",
        "list",
        "lsp",
        "patch",
        "read",
        "skill",
        "todoread",
        "todowrite",
        "webfetch",
        "websearch",
        "write",
        "task",
        "question",
    }
)


def _convert_claude_tools_string(tools_value: str) -> dict[str, bool]:
    """Convert a Claude Code ``tools`` string to an OpenCode tools object.

    Claude Code format examples::

        "Read, Grep, Glob, Bash(grep:*), Bash(wc:*)"
        "mcp__perplexity__perplexity_search_web, mcp__perplexity__perplexity_fetch_web"

    OpenCode expects a mapping of tool names to booleans::

        {"read": true, "grep": true, "glob": true, "bash": true}

    Tool names are lowercased and de-duplicated.  ``Bash(...)`` variants
    collapse to a single ``bash: true`` entry.  Unknown/MCP tool names are
    silently dropped since they cannot be represented as OpenCode built-in
    tool booleans.
    """
    result: dict[str, bool] = {}
    # Split on commas, strip whitespace.
    for token in re.split(r"\s*,\s*", tools_value.strip()):
        if not token:
            continue
        # Strip Bash(...) qualifiers -> "bash"
        base = re.sub(r"\(.*\)$", "", token).strip().lower()
        if base in _OPENCODE_TOOL_NAMES:
            result[base] = True
    return result


def _transform_for_opencode(content: bytes, target_id: str) -> bytes:
    """Transform frontmatter for OpenCode targets.

    In addition to stripping deployment fields (``only``/``except``), this:

    * Converts a string-valued ``tools`` field (Claude Code format) to an
      OpenCode-compatible object with boolean values.
    * Removes ``model`` (Claude Code uses short aliases like ``sonnet``
      which are not valid OpenCode model identifiers).
    """
    metadata, body = parse_frontmatter(content)
    if metadata is None:
        return content

    cleaned = strip_deployment_fields(metadata)

    # Convert tools: string -> tools: {name: true, ...}
    tools_val = cleaned.get("tools")
    if isinstance(tools_val, str):
        converted = _convert_claude_tools_string(tools_val)
        if converted:
            cleaned["tools"] = converted
        else:
            # No recognisable tools; remove the field entirely.
            del cleaned["tools"]

    # Strip Claude-only fields that have no OpenCode equivalent.
    for field in _CLAUDE_ONLY_FIELDS:
        cleaned.pop(field, None)

    return serialize_frontmatter(cleaned, body)


class OpenCodeTarget(Target):
    """Deploy prompts and MCP servers into an OpenCode configuration directory."""

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
            "opencode.json",
            MANIFEST_FILENAME,
        ]

    def should_skip(
        self,
        item_type: str,
        name: str,
        content: Optional[bytes] = None,
        metadata: Optional[dict] = None,
    ) -> bool:
        return item_type == "hook"

    # ------------------------------------------------------------------
    # Deploy
    # ------------------------------------------------------------------

    def deploy_agent(self, name: str, content: bytes) -> None:
        dest = self._config_path / "agents" / f"{name}.md"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(_transform_for_opencode(content, self._id))

    def deploy_command(self, name: str, content: bytes) -> None:
        dest = self._config_path / "commands" / f"{name}.md"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(_transform_for_opencode(content, self._id))

    def deploy_skill(self, name: str, source_dir: Path) -> None:
        dest = self._config_path / "skills" / name
        if dest.is_symlink():
            dest.unlink()
        elif dest.exists():
            shutil.rmtree(dest)
        shutil.copytree(source_dir.resolve(), dest, symlinks=False)
        skill_md = dest / "SKILL.md"
        if skill_md.exists():
            skill_md.write_bytes(
                _transform_for_opencode(skill_md.read_bytes(), self._id)
            )

    def deploy_hook(self, name: str, config: dict) -> None:
        pass

    def remove_hook(self, name: str) -> None:
        pass

    def deploy_models(self, config: dict) -> None:
        from ..envsubst import expand_env_vars

        oc_path = self._opencode_path()
        data = self._load_json(oc_path)

        providers: dict = {}

        for prov_key, prov in config.get("providers", {}).items():
            oc_cfg = prov.get("opencode", {})
            if not oc_cfg:
                continue

            api_key = expand_env_vars(prov.get("api_key", ""))
            base_url = prov.get("base_url", "")

            provider_entry: dict = {
                "npm": oc_cfg.get("npm", "@ai-sdk/openai-compatible"),
                "name": oc_cfg.get("name", prov.get("display_name", prov_key)),
                "options": {
                    "baseURL": base_url,
                    "apiKey": api_key,
                },
            }
            # Add timeout option if specified
            timeout = oc_cfg.get("timeout")
            if timeout is not None:
                provider_entry["options"]["timeout"] = timeout

            models_dict: dict = {}
            for model_id, model in prov.get("models", {}).items():
                if model is None:
                    model = {}
                model_entry: dict = {
                    "name": model.get("display_name", model_id),
                }
                # Add limits if specified
                context_limit = model.get("context_limit")
                output_limit = model.get("output_limit")
                if context_limit is not None or output_limit is not None:
                    limit: dict = {}
                    if context_limit is not None:
                        limit["context"] = context_limit
                    if output_limit is not None:
                        limit["output"] = output_limit
                    model_entry["limit"] = limit
                models_dict[model_id] = model_entry

            if models_dict:
                provider_entry["models"] = models_dict
                providers[prov_key] = provider_entry

        data["provider"] = providers
        self._save_json(oc_path, data)

    def deploy_mcp_server(self, name: str, config: dict) -> None:
        oc_path = self._opencode_path()
        data = self._load_json(oc_path)

        # Disabled servers are not written at all.
        if not config.get("enabled", True):
            data.get("mcp", {}).pop(name, None)
        else:
            oc_config: dict = {}
            # Determine type based on presence of url vs command.
            cmd = config.get("command")
            args = config.get("args", [])
            if "url" in config:
                oc_config["type"] = "remote"
            elif cmd is not None:
                oc_config["type"] = "local"
            # command is an array: command + args combined.
            if cmd is not None:
                oc_config["command"] = [cmd] + list(args)
            # "environment" key, not "env".
            env = config.get("env")
            if env:
                oc_config["environment"] = dict(env)
            # Copy any remaining non-metadata, non-handled keys.
            for k, v in config.items():
                if k not in _MCP_STRIP_KEYS and k not in (
                    "command",
                    "args",
                    "env",
                ):
                    oc_config[k] = v
            data.setdefault("mcp", {})[name] = oc_config

        self._save_json(oc_path, data)

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
        path = self._opencode_path()
        if not path.exists():
            return
        data = self._load_json(path)
        data.pop("provider", None)
        self._save_json(path, data)

    def remove_mcp_server(self, name: str) -> None:
        path = self._opencode_path()
        if not path.exists():
            return
        data = self._load_json(path)
        data.get("mcp", {}).pop(name, None)
        self._save_json(path, data)

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
        if item_type == "mcp":
            data = self._load_json(self._opencode_path())
            return name in data.get("mcp", {})
        if item_type == "models":
            data = self._load_json(self._opencode_path())
            return bool(data.get("provider"))
        return False

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    def _opencode_path(self) -> Path:
        return self._config_path / "opencode.json"

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
