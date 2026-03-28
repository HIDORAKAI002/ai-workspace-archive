"""Tests for the OpenCode target implementation."""

import json
from pathlib import Path

import pytest

from promptdeploy.frontmatter import parse_frontmatter
from promptdeploy.manifest import MANIFEST_FILENAME
from promptdeploy.targets.opencode import (
    OpenCodeTarget,
    _convert_claude_tools_string,
    _transform_for_opencode,
)


def _make_target(tmp_path: Path) -> OpenCodeTarget:
    config = tmp_path / ".opencode"
    config.mkdir()
    return OpenCodeTarget("my-target", config)


# ------------------------------------------------------------------
# Agents
# ------------------------------------------------------------------


class TestDeployAgent:
    def test_creates_file_with_transformed_content(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = b"---\nname: helper\nonly:\n  - other\n---\nAgent body.\n"
        target.deploy_agent("helper", content)

        dest = tmp_path / ".opencode" / "agents" / "helper.md"
        assert dest.exists()
        meta, body = parse_frontmatter(dest.read_bytes())
        assert meta is not None
        assert "only" not in meta
        assert meta["name"] == "helper"
        assert body == b"Agent body.\n"

    def test_creates_agents_directory(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_agent("a", b"plain content")
        assert (tmp_path / ".opencode" / "agents" / "a.md").exists()


class TestRemoveAgent:
    def test_removes_existing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_agent("a", b"content")
        target.remove_agent("a")
        assert not (tmp_path / ".opencode" / "agents" / "a.md").exists()

    def test_no_error_if_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.remove_agent("nonexistent")


# ------------------------------------------------------------------
# Commands
# ------------------------------------------------------------------


class TestDeployCommand:
    def test_creates_file(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = b"---\nname: fix\nexcept:\n  - x\n---\nFix things.\n"
        target.deploy_command("fix", content)

        dest = tmp_path / ".opencode" / "commands" / "fix.md"
        assert dest.exists()
        meta, body = parse_frontmatter(dest.read_bytes())
        assert meta is not None
        assert "except" not in meta
        assert body == b"Fix things.\n"


class TestRemoveCommand:
    def test_removes_existing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_command("fix", b"content")
        target.remove_command("fix")
        assert not (tmp_path / ".opencode" / "commands" / "fix.md").exists()

    def test_no_error_if_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.remove_command("nonexistent")


# ------------------------------------------------------------------
# Skills
# ------------------------------------------------------------------


class TestDeploySkill:
    def test_copies_directory_and_transforms_skill_md(self, tmp_path: Path):
        target = _make_target(tmp_path)

        src = tmp_path / "src-skill"
        src.mkdir()
        (src / "SKILL.md").write_bytes(
            b"---\nname: my-skill\nonly:\n  - t\n---\nSkill body.\n"
        )
        (src / "helper.py").write_text("print('hi')")

        target.deploy_skill("my-skill", src)

        dest = tmp_path / ".opencode" / "skills" / "my-skill"
        assert dest.is_dir()
        assert (dest / "helper.py").read_text() == "print('hi')"

        meta, body = parse_frontmatter((dest / "SKILL.md").read_bytes())
        assert meta is not None
        assert "only" not in meta
        assert meta["name"] == "my-skill"
        assert body == b"Skill body.\n"

    def test_overwrites_existing_skill(self, tmp_path: Path):
        target = _make_target(tmp_path)

        src_v1 = tmp_path / "v1"
        src_v1.mkdir()
        (src_v1 / "SKILL.md").write_bytes(b"v1")

        src_v2 = tmp_path / "v2"
        src_v2.mkdir()
        (src_v2 / "SKILL.md").write_bytes(b"v2")

        target.deploy_skill("s", src_v1)
        target.deploy_skill("s", src_v2)
        assert (
            tmp_path / ".opencode" / "skills" / "s" / "SKILL.md"
        ).read_bytes() == b"v2"

    def test_overwrites_symlinked_skill(self, tmp_path: Path):
        target = _make_target(tmp_path)

        # Create a symlink where the skill directory would be deployed.
        real_dir = tmp_path / "real-skill"
        real_dir.mkdir()
        (real_dir / "SKILL.md").write_bytes(b"old")

        dest = tmp_path / ".opencode" / "skills" / "s"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.symlink_to(real_dir)

        src = tmp_path / "new-skill"
        src.mkdir()
        (src / "SKILL.md").write_bytes(b"new")

        target.deploy_skill("s", src)
        assert dest.is_dir()
        assert not dest.is_symlink()
        assert (dest / "SKILL.md").read_bytes() == b"new"


class TestRemoveSkill:
    def test_removes_existing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        src = tmp_path / "src-skill"
        src.mkdir()
        (src / "SKILL.md").write_bytes(b"body")
        target.deploy_skill("s", src)
        target.remove_skill("s")
        assert not (tmp_path / ".opencode" / "skills" / "s").exists()

    def test_removes_symlinked_skill(self, tmp_path: Path):
        target = _make_target(tmp_path)
        real_dir = tmp_path / "real-skill"
        real_dir.mkdir()

        dest = tmp_path / ".opencode" / "skills" / "s"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.symlink_to(real_dir)

        target.remove_skill("s")
        assert not dest.exists()
        assert not dest.is_symlink()
        # Original directory should be untouched
        assert real_dir.is_dir()

    def test_no_error_if_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.remove_skill("nonexistent")


# ------------------------------------------------------------------
# MCP Servers
# ------------------------------------------------------------------


class TestDeployMcpServer:
    def test_merges_into_opencode_json(self, tmp_path: Path):
        target = _make_target(tmp_path)

        config = {
            "name": "my-server",
            "description": "A server",
            "scope": "project",
            "enabled": True,
            "command": "npx",
            "args": ["-y", "my-server"],
            "env": {"API_KEY": "xxx"},
        }
        target.deploy_mcp_server("my-server", config)

        oc_path = tmp_path / ".opencode" / "opencode.json"
        assert oc_path.exists()
        result = json.loads(oc_path.read_text())
        srv = result["mcp"]["my-server"]
        # type is "local" for command-based servers.
        assert srv["type"] == "local"
        # command is an array: command + args combined.
        assert srv["command"] == ["npx", "-y", "my-server"]
        # "environment" key, not "env".
        assert srv["environment"] == {"API_KEY": "xxx"}
        assert "env" not in srv
        assert "args" not in srv
        # Deployment metadata stripped.
        for key in ("name", "description", "scope", "enabled", "only", "except"):
            assert key not in srv

    def test_command_without_args(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo"})

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        assert result["mcp"]["srv"]["command"] == ["echo"]

    def test_creates_opencode_json_if_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo", "args": []})

        oc_path = tmp_path / ".opencode" / "opencode.json"
        assert oc_path.exists()
        result = json.loads(oc_path.read_text())
        assert "srv" in result["mcp"]

    def test_disabled_server_not_written(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo", "enabled": False})

        oc_path = tmp_path / ".opencode" / "opencode.json"
        result = json.loads(oc_path.read_text())
        assert "srv" not in result.get("mcp", {})

    def test_disabled_server_removed_if_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo"})
        target.deploy_mcp_server("srv", {"command": "echo", "enabled": False})

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        assert "srv" not in result.get("mcp", {})

    def test_no_environment_key_when_env_empty(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo", "env": {}})

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        srv = result["mcp"]["srv"]
        assert "environment" not in srv

    def test_remote_server_type(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "url": "https://mcp.example.com/mcp",
            "headers": {"Authorization": "Bearer token"},
        }
        target.deploy_mcp_server("remote", config)

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        srv = result["mcp"]["remote"]
        assert srv["type"] == "remote"
        assert srv["url"] == "https://mcp.example.com/mcp"
        assert srv["headers"] == {"Authorization": "Bearer token"}

    def test_preserves_other_servers(self, tmp_path: Path):
        target = _make_target(tmp_path)
        oc_path = tmp_path / ".opencode" / "opencode.json"
        oc_path.write_text(json.dumps({"mcp": {"existing": {"command": ["keep"]}}}))

        target.deploy_mcp_server("new", {"command": "added"})

        result = json.loads(oc_path.read_text())
        assert result["mcp"]["existing"] == {"command": ["keep"]}
        assert "new" in result["mcp"]


class TestRemoveMcpServer:
    def test_removes_existing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo"})
        target.remove_mcp_server("srv")

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        assert "srv" not in result.get("mcp", {})

    def test_no_error_if_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.remove_mcp_server("nonexistent")

    def test_no_error_if_opencode_json_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.remove_mcp_server("anything")


# ------------------------------------------------------------------
# Properties / metadata
# ------------------------------------------------------------------


# ------------------------------------------------------------------
# Models
# ------------------------------------------------------------------


class TestDeployModels:
    def test_basic_provider_with_opencode_config(self, tmp_path: Path, monkeypatch):
        monkeypatch.setenv("OC_KEY", "sk-oc")
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "acme": {
                    "display_name": "Acme",
                    "base_url": "https://api.acme.com/v1",
                    "api_key": "${OC_KEY}",
                    "opencode": {
                        "npm": "@ai-sdk/openai",
                        "name": "Acme Provider",
                    },
                    "models": {
                        "gpt-4": {"display_name": "GPT-4"},
                    },
                },
            },
        }
        target.deploy_models(config)

        oc_path = tmp_path / ".opencode" / "opencode.json"
        result = json.loads(oc_path.read_text())
        assert "acme" in result["provider"]
        prov = result["provider"]["acme"]
        assert prov["npm"] == "@ai-sdk/openai"
        assert prov["name"] == "Acme Provider"
        assert prov["options"]["baseURL"] == "https://api.acme.com/v1"
        assert prov["options"]["apiKey"] == "sk-oc"
        assert "gpt-4" in prov["models"]
        assert prov["models"]["gpt-4"]["name"] == "GPT-4"

    def test_provider_without_opencode_config_skipped(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "no-oc": {
                    "display_name": "No OC",
                    "base_url": "https://nooc.com",
                    "api_key": "key",
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        oc_path = tmp_path / ".opencode" / "opencode.json"
        result = json.loads(oc_path.read_text())
        assert result["provider"] == {}

    def test_npm_name_options_correctly_mapped(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "prov": {
                    "display_name": "Prov",
                    "base_url": "https://prov.com",
                    "api_key": "key",
                    "opencode": {
                        "npm": "@custom/sdk",
                        "name": "Custom Name",
                    },
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        prov = result["provider"]["prov"]
        assert prov["npm"] == "@custom/sdk"
        assert prov["name"] == "Custom Name"
        assert prov["options"]["baseURL"] == "https://prov.com"
        assert prov["options"]["apiKey"] == "key"

    def test_timeout_option_included(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "prov": {
                    "display_name": "Prov",
                    "base_url": "https://prov.com",
                    "api_key": "key",
                    "opencode": {"timeout": 30000},
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        assert result["provider"]["prov"]["options"]["timeout"] == 30000

    def test_model_limits_context_and_output(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "prov": {
                    "display_name": "Prov",
                    "base_url": "https://prov.com",
                    "api_key": "key",
                    "opencode": {"npm": "@ai-sdk/openai-compatible"},
                    "models": {
                        "m": {
                            "display_name": "M",
                            "context_limit": 128000,
                            "output_limit": 4096,
                        },
                    },
                },
            },
        }
        target.deploy_models(config)

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        model = result["provider"]["prov"]["models"]["m"]
        assert model["limit"]["context"] == 128000
        assert model["limit"]["output"] == 4096

    def test_model_with_only_context_limit(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "prov": {
                    "display_name": "Prov",
                    "base_url": "https://prov.com",
                    "api_key": "key",
                    "opencode": {"npm": "@ai-sdk/openai-compatible"},
                    "models": {
                        "m": {"context_limit": 64000},
                    },
                },
            },
        }
        target.deploy_models(config)

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        model = result["provider"]["prov"]["models"]["m"]
        assert model["limit"]["context"] == 64000
        assert "output" not in model["limit"]

    def test_model_without_limits_has_no_limit_key(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "prov": {
                    "display_name": "Prov",
                    "base_url": "https://prov.com",
                    "api_key": "key",
                    "opencode": {"npm": "@ai-sdk/openai-compatible"},
                    "models": {"m": {"display_name": "M"}},
                },
            },
        }
        target.deploy_models(config)

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        model = result["provider"]["prov"]["models"]["m"]
        assert "limit" not in model

    def test_env_var_expansion_in_api_key(self, tmp_path: Path, monkeypatch):
        monkeypatch.setenv("OC_SECRET", "real-key")
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "prov": {
                    "display_name": "Prov",
                    "base_url": "https://prov.com",
                    "api_key": "${OC_SECRET}",
                    "opencode": {"npm": "@ai-sdk/openai-compatible"},
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        assert result["provider"]["prov"]["options"]["apiKey"] == "real-key"

    def test_empty_providers_dict(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_models({"providers": {}})

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        assert result["provider"] == {}

    def test_none_model_value_handled(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "prov": {
                    "display_name": "Prov",
                    "base_url": "https://prov.com",
                    "api_key": "key",
                    "opencode": {"npm": "@ai-sdk/openai-compatible"},
                    "models": {"m": None},
                },
            },
        }
        target.deploy_models(config)

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        assert "m" in result["provider"]["prov"]["models"]

    def test_existing_opencode_json_fields_preserved(self, tmp_path: Path):
        target = _make_target(tmp_path)
        oc_path = tmp_path / ".opencode" / "opencode.json"
        oc_path.write_text(json.dumps({"theme": "dark", "editor": "vim"}))

        config = {
            "providers": {
                "prov": {
                    "display_name": "Prov",
                    "base_url": "https://prov.com",
                    "api_key": "key",
                    "opencode": {"npm": "@ai-sdk/openai-compatible"},
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        result = json.loads(oc_path.read_text())
        assert result["theme"] == "dark"
        assert result["editor"] == "vim"
        assert "prov" in result["provider"]

    def test_default_npm_and_name(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "prov": {
                    "display_name": "My Provider",
                    "base_url": "https://prov.com",
                    "api_key": "key",
                    "opencode": {"npm": "@ai-sdk/openai-compatible"},
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        result = json.loads((tmp_path / ".opencode" / "opencode.json").read_text())
        prov = result["provider"]["prov"]
        # Default npm from opencode config
        assert prov["npm"] == "@ai-sdk/openai-compatible"
        # Name falls back to display_name from provider
        assert prov["name"] == "My Provider"


class TestRemoveModels:
    def test_removes_provider_section(self, tmp_path: Path):
        target = _make_target(tmp_path)
        oc_path = tmp_path / ".opencode" / "opencode.json"
        oc_path.write_text(
            json.dumps(
                {
                    "provider": {"acme": {"npm": "test"}},
                    "theme": "dark",
                }
            )
        )

        target.remove_models()

        result = json.loads(oc_path.read_text())
        assert "provider" not in result
        assert result["theme"] == "dark"

    def test_no_op_when_opencode_json_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        # Should not raise
        target.remove_models()

    def test_preserves_other_config_keys(self, tmp_path: Path):
        target = _make_target(tmp_path)
        oc_path = tmp_path / ".opencode" / "opencode.json"
        oc_path.write_text(
            json.dumps(
                {
                    "provider": {},
                    "mcp": {"srv": {}},
                    "theme": "light",
                }
            )
        )

        target.remove_models()

        result = json.loads(oc_path.read_text())
        assert "provider" not in result
        assert result["mcp"] == {"srv": {}}
        assert result["theme"] == "light"


class TestExtraConfigKeys:
    def test_extra_keys_copied_to_config(self, tmp_path: Path):
        """Non-metadata, non-command/args/env keys are copied to the output."""
        target = _make_target(tmp_path)
        config = {
            "command": "npx",
            "args": ["-y", "server"],
            "custom_key": "custom_value",
            "timeout": 30,
        }
        target.deploy_mcp_server("srv", config)

        oc_path = tmp_path / ".opencode" / "opencode.json"
        result = json.loads(oc_path.read_text())
        srv = result["mcp"]["srv"]
        assert srv["custom_key"] == "custom_value"
        assert srv["timeout"] == 30


class TestSaveJsonError:
    def test_cleanup_on_replace_failure(self, tmp_path: Path):
        """When os.replace fails in _save_json, temp file is cleaned up."""
        from unittest.mock import patch

        target = _make_target(tmp_path)

        with patch("os.replace", side_effect=OSError("mock failure")):
            with pytest.raises(OSError, match="mock failure"):
                target.deploy_mcp_server("srv", {"command": "echo"})

        config_dir = tmp_path / ".opencode"
        tmp_files = list(config_dir.glob("*.tmp"))
        assert tmp_files == []

    def test_cleanup_on_replace_failure_unlink_also_fails(self, tmp_path: Path):
        """When both os.replace and os.unlink fail, original error propagates."""
        import os
        from unittest.mock import patch

        target = _make_target(tmp_path)

        original_unlink = os.unlink

        def failing_unlink(p):
            if str(p).endswith(".tmp"):
                raise OSError("unlink failed")
            return original_unlink(p)

        with patch("os.replace", side_effect=OSError("replace failed")):
            with patch("os.unlink", side_effect=failing_unlink):
                with pytest.raises(OSError, match="replace failed"):
                    target.deploy_mcp_server("srv", {"command": "echo"})


class TestItemExists:
    def test_agent_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert not target.item_exists("agent", "a")
        target.deploy_agent("a", b"content")
        assert target.item_exists("agent", "a")

    def test_command_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert not target.item_exists("command", "c")
        target.deploy_command("c", b"content")
        assert target.item_exists("command", "c")

    def test_skill_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert not target.item_exists("skill", "s")
        src = tmp_path / "src-skill"
        src.mkdir()
        (src / "SKILL.md").write_bytes(b"body")
        target.deploy_skill("s", src)
        assert target.item_exists("skill", "s")

    def test_skill_symlink_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        real_dir = tmp_path / "real-skill"
        real_dir.mkdir()
        dest = tmp_path / ".opencode" / "skills" / "s"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.symlink_to(real_dir)
        assert target.item_exists("skill", "s")

    def test_mcp_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert not target.item_exists("mcp", "srv")
        target.deploy_mcp_server("srv", {"command": "x", "args": []})
        assert target.item_exists("mcp", "srv")

    def test_models_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert not target.item_exists("models", "models")
        target.deploy_models(
            {
                "providers": {
                    "p": {
                        "opencode": {"npm": "@ai-sdk/openai-compatible"},
                        "models": {"m": {"display_name": "M"}},
                    }
                }
            }
        )
        assert target.item_exists("models", "models")

    def test_unknown_type_returns_false(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert not target.item_exists("unknown", "x")


class TestTargetProperties:
    def test_id(self, tmp_path: Path):
        target = OpenCodeTarget("my-id", tmp_path)
        assert target.id == "my-id"

    def test_exists_true(self, tmp_path: Path):
        config = tmp_path / ".opencode"
        config.mkdir()
        target = OpenCodeTarget("t", config)
        assert target.exists()

    def test_exists_false(self, tmp_path: Path):
        target = OpenCodeTarget("t", tmp_path / "nonexistent")
        assert not target.exists()

    def test_manifest_path(self, tmp_path: Path):
        config = tmp_path / ".opencode"
        config.mkdir()
        target = OpenCodeTarget("t", config)
        assert target.manifest_path() == config / MANIFEST_FILENAME

    def test_rsync_includes(self, tmp_path: Path):
        config = tmp_path / ".opencode"
        config.mkdir()
        target = OpenCodeTarget("t", config)
        includes = target.rsync_includes()
        assert includes is not None
        assert "agents/" in includes
        assert "agents/**" in includes
        assert "commands/" in includes
        assert "opencode.json" in includes
        assert MANIFEST_FILENAME in includes


# ------------------------------------------------------------------
# Hooks (no-op for OpenCode)
# ------------------------------------------------------------------


class TestDeployHookNoop:
    def test_deploy_hook_is_noop(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "name": "git-ai",
            "hooks": {
                "PostToolUse": [
                    {
                        "matcher": "Write",
                        "hooks": [{"command": "echo", "type": "command"}],
                    }
                ],
            },
        }
        # Should not raise or create any files related to hooks
        target.deploy_hook("git-ai", config)
        # opencode.json may or may not exist but should not have hooks
        oc_path = tmp_path / ".opencode" / "opencode.json"
        if oc_path.exists():
            import json

            data = json.loads(oc_path.read_text())
            assert "hooks" not in data


class TestRemoveHookNoop:
    def test_remove_hook_is_noop(self, tmp_path: Path):
        target = _make_target(tmp_path)
        # Should not raise
        target.remove_hook("git-ai")


class TestShouldSkip:
    def test_skips_hooks(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("hook", "my-hook") is True

    def test_does_not_skip_agents(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("agent", "helper") is False

    def test_does_not_skip_commands(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("command", "fix") is False

    def test_does_not_skip_models(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("models", "models") is False


# ------------------------------------------------------------------
# Frontmatter transformation for OpenCode
# ------------------------------------------------------------------


class TestConvertClaudeToolsString:
    def test_basic_tool_names(self):
        result = _convert_claude_tools_string("Read, Grep, Glob")
        assert result == {"read": True, "grep": True, "glob": True}

    def test_bash_with_qualifiers(self):
        result = _convert_claude_tools_string(
            "Read, Grep, Glob, Bash(grep:*), Bash(wc:*)"
        )
        assert result == {"read": True, "grep": True, "glob": True, "bash": True}

    def test_unknown_tools_dropped(self):
        result = _convert_claude_tools_string(
            "mcp__perplexity__perplexity_search_web, mcp__perplexity__perplexity_fetch_web"
        )
        assert result == {}

    def test_mixed_known_and_unknown(self):
        result = _convert_claude_tools_string("Read, mcp__foo__bar, Bash(git:*)")
        assert result == {"read": True, "bash": True}

    def test_empty_string(self):
        result = _convert_claude_tools_string("")
        assert result == {}

    def test_whitespace_handling(self):
        result = _convert_claude_tools_string("  Read ,  Grep  ,  Glob  ")
        assert result == {"read": True, "grep": True, "glob": True}

    def test_all_known_tools(self):
        result = _convert_claude_tools_string(
            "bash, edit, glob, grep, list, lsp, patch, read, skill, "
            "todoread, todowrite, webfetch, websearch, write, task, question"
        )
        assert len(result) == 16
        for tool in [
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
        ]:
            assert result[tool] is True


class TestTransformForOpencode:
    def test_converts_tools_string_to_object(self):
        content = (
            b"---\nname: reviewer\ntools: Read, Grep, Glob, Bash(grep:*)\n"
            b"model: sonnet\n---\nBody.\n"
        )
        result = _transform_for_opencode(content, "opencode")
        meta, body = parse_frontmatter(result)
        assert meta is not None
        assert meta["tools"] == {"read": True, "grep": True, "glob": True, "bash": True}
        assert "model" not in meta
        assert meta["name"] == "reviewer"
        assert body == b"Body.\n"

    def test_strips_model_field(self):
        content = b"---\nname: agent\nmodel: sonnet\n---\nBody.\n"
        result = _transform_for_opencode(content, "opencode")
        meta, body = parse_frontmatter(result)
        assert meta is not None
        assert "model" not in meta
        assert meta["name"] == "agent"

    def test_strips_deployment_fields(self):
        content = b"---\nname: agent\nonly:\n  - opencode\n---\nBody.\n"
        result = _transform_for_opencode(content, "opencode")
        meta, body = parse_frontmatter(result)
        assert meta is not None
        assert "only" not in meta

    def test_tools_already_object_preserved(self):
        content = b"---\nname: agent\ntools:\n  bash: false\n  read: true\n---\nBody.\n"
        result = _transform_for_opencode(content, "opencode")
        meta, body = parse_frontmatter(result)
        assert meta is not None
        # Object-valued tools should pass through unchanged.
        assert meta["tools"] == {"bash": False, "read": True}

    def test_tools_string_all_unknown_removed(self):
        content = b"---\nname: agent\ntools: mcp__foo__bar, mcp__baz__qux\n---\nBody.\n"
        result = _transform_for_opencode(content, "opencode")
        meta, body = parse_frontmatter(result)
        assert meta is not None
        assert "tools" not in meta

    def test_no_frontmatter_unchanged(self):
        content = b"No frontmatter here.\n"
        result = _transform_for_opencode(content, "opencode")
        assert result == content

    def test_no_tools_or_model_unchanged(self):
        content = b"---\nname: agent\ndescription: test\n---\nBody.\n"
        result = _transform_for_opencode(content, "opencode")
        meta, body = parse_frontmatter(result)
        assert meta is not None
        assert meta == {"name": "agent", "description": "test"}


class TestDeployAgentTransformation:
    """Verify that deploy_agent applies the OpenCode-specific transformation."""

    def test_tools_converted_in_deployed_agent(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = (
            b"---\nname: reviewer\ndescription: A reviewer\n"
            b"tools: Read, Grep, Glob, Bash(grep:*), Bash(wc:*)\n"
            b"model: sonnet\n---\nReview body.\n"
        )
        target.deploy_agent("reviewer", content)

        dest = tmp_path / ".opencode" / "agents" / "reviewer.md"
        meta, body = parse_frontmatter(dest.read_bytes())
        assert meta is not None
        assert isinstance(meta["tools"], dict)
        assert meta["tools"]["read"] is True
        assert meta["tools"]["bash"] is True
        assert "model" not in meta
        assert body == b"Review body.\n"

    def test_command_tools_converted(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = (
            b"---\nname: cmd\ntools: Read, Bash(git:*)\nmodel: sonnet\n---\nCmd.\n"
        )
        target.deploy_command("cmd", content)

        dest = tmp_path / ".opencode" / "commands" / "cmd.md"
        meta, body = parse_frontmatter(dest.read_bytes())
        assert meta is not None
        assert isinstance(meta["tools"], dict)
        assert "model" not in meta

    def test_skill_tools_converted(self, tmp_path: Path):
        target = _make_target(tmp_path)
        src = tmp_path / "src-skill"
        src.mkdir()
        (src / "SKILL.md").write_bytes(
            b"---\nname: sk\ntools: Read, Grep\nmodel: sonnet\n---\nSkill.\n"
        )
        target.deploy_skill("sk", src)

        dest = tmp_path / ".opencode" / "skills" / "sk" / "SKILL.md"
        meta, body = parse_frontmatter(dest.read_bytes())
        assert meta is not None
        assert isinstance(meta["tools"], dict)
        assert meta["tools"] == {"read": True, "grep": True}
        assert "model" not in meta
