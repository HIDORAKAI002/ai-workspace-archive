"""Tests for the Droid target implementation."""

import json
from pathlib import Path

import pytest

from promptdeploy.frontmatter import parse_frontmatter
from promptdeploy.manifest import MANIFEST_FILENAME
from promptdeploy.targets.droid import DroidTarget


def _make_target(tmp_path: Path) -> DroidTarget:
    config = tmp_path / ".droid"
    config.mkdir()
    return DroidTarget("my-target", config)


# ------------------------------------------------------------------
# Agents (deployed as "droids")
# ------------------------------------------------------------------


class TestDeployAgent:
    def test_creates_file_in_droids_directory(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = b"---\nname: helper\nonly:\n  - other\n---\nAgent body.\n"
        target.deploy_agent("helper", content)

        dest = tmp_path / ".droid" / "droids" / "helper.md"
        assert dest.exists()
        meta, body = parse_frontmatter(dest.read_bytes())
        assert meta is not None
        assert "only" not in meta
        assert meta["name"] == "helper"
        assert body == b"Agent body.\n"

    def test_creates_droids_directory(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_agent("a", b"plain content")
        assert (tmp_path / ".droid" / "droids" / "a.md").exists()


class TestRemoveAgent:
    def test_removes_existing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_agent("a", b"content")
        target.remove_agent("a")
        assert not (tmp_path / ".droid" / "droids" / "a.md").exists()

    def test_no_error_if_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.remove_agent("nonexistent")


# ------------------------------------------------------------------
# Commands (skipped by default, or deployed as skill)
# ------------------------------------------------------------------


class TestDeployCommand:
    def test_command_skipped_by_default(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = b"---\nname: fix\n---\nFix things.\n"
        target.deploy_command("fix", content)

        # No commands directory should be created.
        assert not (tmp_path / ".droid" / "commands").exists()
        # Not deployed as a skill either.
        assert not (tmp_path / ".droid" / "skills" / "fix").exists()

    def test_command_without_frontmatter_skipped(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_command("plain", b"Just plain text")
        assert not (tmp_path / ".droid" / "commands").exists()
        assert not (tmp_path / ".droid" / "skills" / "plain").exists()

    def test_command_with_droid_deploy_skill_wraps_as_skill(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = (
            b"---\nname: fix\ndroid_deploy: skill\nonly:\n  - x\n---\nFix things.\n"
        )
        target.deploy_command("fix", content)

        dest = tmp_path / ".droid" / "skills" / "fix"
        assert dest.is_dir()
        skill_md = dest / "SKILL.md"
        assert skill_md.exists()
        meta, body = parse_frontmatter(skill_md.read_bytes())
        assert meta is not None
        assert "only" not in meta
        assert body == b"Fix things.\n"


class TestRemoveCommand:
    def test_removes_skill_deployed_command(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = b"---\nname: fix\ndroid_deploy: skill\n---\nBody.\n"
        target.deploy_command("fix", content)
        assert (tmp_path / ".droid" / "skills" / "fix").exists()
        target.remove_command("fix")
        assert not (tmp_path / ".droid" / "skills" / "fix").exists()

    def test_removes_symlinked_command(self, tmp_path: Path):
        target = _make_target(tmp_path)
        real_dir = tmp_path / "real-cmd"
        real_dir.mkdir()

        dest = tmp_path / ".droid" / "skills" / "cmd"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.symlink_to(real_dir)

        target.remove_command("cmd")
        assert not dest.exists()
        assert not dest.is_symlink()
        # Original directory should be untouched
        assert real_dir.is_dir()

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

        dest = tmp_path / ".droid" / "skills" / "my-skill"
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
        assert (tmp_path / ".droid" / "skills" / "s" / "SKILL.md").read_bytes() == b"v2"

    def test_overwrites_symlinked_skill(self, tmp_path: Path):
        target = _make_target(tmp_path)

        # Create a symlink where the skill directory would be deployed.
        real_dir = tmp_path / "real-skill"
        real_dir.mkdir()
        (real_dir / "SKILL.md").write_bytes(b"old")

        dest = tmp_path / ".droid" / "skills" / "s"
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
        assert not (tmp_path / ".droid" / "skills" / "s").exists()

    def test_removes_symlinked_skill(self, tmp_path: Path):
        target = _make_target(tmp_path)
        real_dir = tmp_path / "real-skill"
        real_dir.mkdir()

        dest = tmp_path / ".droid" / "skills" / "s"
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
    def test_merges_into_mcp_json(self, tmp_path: Path):
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

        mcp_path = tmp_path / ".droid" / "mcp.json"
        assert mcp_path.exists()
        result = json.loads(mcp_path.read_text())
        srv = result["mcpServers"]["my-server"]
        assert srv["type"] == "stdio"
        assert srv["command"] == "npx"
        assert srv["args"] == ["-y", "my-server"]
        assert srv["env"] == {"API_KEY": "xxx"}
        assert srv["disabled"] is False
        # Deployment metadata stripped.
        for key in ("name", "description", "scope", "enabled", "only", "except"):
            assert key not in srv

    def test_url_based_server_gets_http_type(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {"url": "https://example.com/mcp", "enabled": True}
        target.deploy_mcp_server("web-srv", config)

        result = json.loads((tmp_path / ".droid" / "mcp.json").read_text())
        srv = result["mcpServers"]["web-srv"]
        assert srv["type"] == "http"
        assert srv["url"] == "https://example.com/mcp"
        assert srv["disabled"] is False

    def test_creates_mcp_json_if_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo", "args": []})

        mcp_path = tmp_path / ".droid" / "mcp.json"
        assert mcp_path.exists()
        result = json.loads(mcp_path.read_text())
        assert "srv" in result["mcpServers"]

    def test_disabled_server_not_written(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo", "enabled": False})

        mcp_path = tmp_path / ".droid" / "mcp.json"
        result = json.loads(mcp_path.read_text())
        assert "srv" not in result.get("mcpServers", {})

    def test_disabled_server_removed_if_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo"})
        target.deploy_mcp_server("srv", {"command": "echo", "enabled": False})

        result = json.loads((tmp_path / ".droid" / "mcp.json").read_text())
        assert "srv" not in result.get("mcpServers", {})

    def test_preserves_other_servers(self, tmp_path: Path):
        target = _make_target(tmp_path)
        mcp_path = tmp_path / ".droid" / "mcp.json"
        mcp_path.write_text(
            json.dumps({"mcpServers": {"existing": {"command": "keep"}}})
        )

        target.deploy_mcp_server("new", {"command": "added"})

        result = json.loads(mcp_path.read_text())
        assert result["mcpServers"]["existing"] == {"command": "keep"}
        assert "new" in result["mcpServers"]


class TestRemoveMcpServer:
    def test_removes_existing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_mcp_server("srv", {"command": "echo"})
        target.remove_mcp_server("srv")

        result = json.loads((tmp_path / ".droid" / "mcp.json").read_text())
        assert "srv" not in result.get("mcpServers", {})

    def test_no_error_if_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.remove_mcp_server("nonexistent")

    def test_no_error_if_mcp_json_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.remove_mcp_server("anything")


# ------------------------------------------------------------------
# Properties / metadata
# ------------------------------------------------------------------


class TestSaveJsonError:
    def test_cleanup_on_replace_failure(self, tmp_path: Path):
        """When os.replace fails in _save_json, temp file is cleaned up."""
        from unittest.mock import patch

        target = _make_target(tmp_path)

        with patch("os.replace", side_effect=OSError("mock failure")):
            with pytest.raises(OSError, match="mock failure"):
                target.deploy_mcp_server("srv", {"command": "echo"})

        config_dir = tmp_path / ".droid"
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


# ------------------------------------------------------------------
# Models
# ------------------------------------------------------------------


class TestDeployModels:
    def test_basic_model_with_all_fields(self, tmp_path: Path, monkeypatch):
        monkeypatch.setenv("ACME_KEY", "sk-secret")
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "acme": {
                    "display_name": "Acme",
                    "base_url": "https://api.acme.com/v1",
                    "api_key": "${ACME_KEY}",
                    "droid": {
                        "provider_type": "openai",
                    },
                    "models": {
                        "gpt-4": {
                            "display_name": "GPT-4",
                            "max_output_tokens": 4096,
                        },
                    },
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert len(settings["customModels"]) == 1
        m = settings["customModels"][0]
        assert m["apiKey"] == "sk-secret"
        assert m["baseUrl"] == "https://api.acme.com/v1"
        assert m["displayName"] == "[Acme] GPT-4"
        assert m["model"] == "gpt-4"
        assert m["provider"] == "openai"
        assert m["index"] == 0
        assert m["id"].startswith("custom:")
        assert m["maxOutputTokens"] == 4096
        assert m["noImageSupport"] is False

    def test_multiple_providers_multiple_models(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "prov_a": {
                    "display_name": "A",
                    "base_url": "https://a.com",
                    "api_key": "key-a",
                    "models": {
                        "m1": {"display_name": "Model 1"},
                        "m2": {"display_name": "Model 2"},
                    },
                },
                "prov_b": {
                    "display_name": "B",
                    "base_url": "https://b.com",
                    "api_key": "key-b",
                    "models": {
                        "m3": {},
                    },
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        models = settings["customModels"]
        assert len(models) == 3
        # Check sequential indices
        indices = [m["index"] for m in models]
        assert indices == [0, 1, 2]

    def test_auto_generated_id_and_index(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "acme": {
                    "display_name": "Acme",
                    "base_url": "https://acme.com",
                    "api_key": "key",
                    "models": {
                        "gpt-4": {},
                    },
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        m = settings["customModels"][0]
        assert m["id"] == "custom:[Acme]-gpt-4-0"
        assert m["index"] == 0

    def test_env_var_expansion_in_api_key(self, tmp_path: Path, monkeypatch):
        monkeypatch.setenv("SECRET_KEY", "expanded-key")
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "p": {
                    "display_name": "P",
                    "base_url": "https://p.com",
                    "api_key": "${SECRET_KEY}",
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert settings["customModels"][0]["apiKey"] == "expanded-key"

    def test_max_output_tokens_included_when_present(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "p": {
                    "display_name": "P",
                    "base_url": "https://p.com",
                    "api_key": "key",
                    "models": {"m": {"max_output_tokens": 8192}},
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert settings["customModels"][0]["maxOutputTokens"] == 8192

    def test_max_output_tokens_omitted_when_not_present(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "p": {
                    "display_name": "P",
                    "base_url": "https://p.com",
                    "api_key": "key",
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert "maxOutputTokens" not in settings["customModels"][0]

    def test_extra_args_included(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "p": {
                    "display_name": "P",
                    "base_url": "https://p.com",
                    "api_key": "key",
                    "droid": {"extra_args": {"temperature": 0.7}},
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert settings["customModels"][0]["extraArgs"] == {"temperature": 0.7}

    def test_extra_headers_included(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "p": {
                    "display_name": "P",
                    "base_url": "https://p.com",
                    "api_key": "key",
                    "droid": {"extra_headers": {"X-Custom": "value"}},
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert settings["customModels"][0]["extraHeaders"] == {"X-Custom": "value"}

    def test_no_image_support_flag(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "p": {
                    "display_name": "P",
                    "base_url": "https://p.com",
                    "api_key": "key",
                    "droid": {"no_image_support": True},
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert settings["customModels"][0]["noImageSupport"] is True

    def test_empty_providers_dict(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_models({"providers": {}})

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert settings["customModels"] == []

    def test_none_model_value(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "p": {
                    "display_name": "P",
                    "base_url": "https://p.com",
                    "api_key": "key",
                    "models": {"m": None},
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert len(settings["customModels"]) == 1
        assert settings["customModels"][0]["model"] == "m"

    def test_existing_settings_preserved(self, tmp_path: Path):
        target = _make_target(tmp_path)
        settings_path = tmp_path / ".droid" / "settings.json"
        settings_path.write_text(json.dumps({"theme": "dark", "fontSize": 14}))

        config = {
            "providers": {
                "p": {
                    "display_name": "P",
                    "base_url": "https://p.com",
                    "api_key": "key",
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads(settings_path.read_text())
        assert settings["theme"] == "dark"
        assert settings["fontSize"] == 14
        assert "customModels" in settings

    def test_default_provider_type(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {
            "providers": {
                "p": {
                    "display_name": "P",
                    "base_url": "https://p.com",
                    "api_key": "key",
                    "models": {"m": {}},
                },
            },
        }
        target.deploy_models(config)

        settings = json.loads((tmp_path / ".droid" / "settings.json").read_text())
        assert settings["customModels"][0]["provider"] == "generic-chat-completion-api"


class TestRemoveModels:
    def test_removes_custom_models_from_settings(self, tmp_path: Path):
        target = _make_target(tmp_path)
        settings_path = tmp_path / ".droid" / "settings.json"
        settings_path.write_text(
            json.dumps(
                {
                    "customModels": [{"id": "test"}],
                    "theme": "dark",
                }
            )
        )

        target.remove_models()

        settings = json.loads(settings_path.read_text())
        assert "customModels" not in settings
        assert settings["theme"] == "dark"

    def test_no_op_when_settings_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        # Should not raise even if settings.json does not exist
        target.remove_models()

    def test_preserves_other_keys(self, tmp_path: Path):
        target = _make_target(tmp_path)
        settings_path = tmp_path / ".droid" / "settings.json"
        settings_path.write_text(
            json.dumps(
                {
                    "customModels": [],
                    "theme": "light",
                    "fontSize": 12,
                }
            )
        )

        target.remove_models()

        settings = json.loads(settings_path.read_text())
        assert "customModels" not in settings
        assert settings["theme"] == "light"
        assert settings["fontSize"] == 12


class TestItemExists:
    def test_agent_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert not target.item_exists("agent", "a")
        target.deploy_agent("a", b"content")
        assert target.item_exists("agent", "a")

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
        dest = tmp_path / ".droid" / "skills" / "s"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.symlink_to(real_dir)
        assert target.item_exists("skill", "s")

    def test_command_exists(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert not target.item_exists("command", "c")
        content = b"---\nname: c\ndroid_deploy: skill\n---\nBody.\n"
        target.deploy_command("c", content)
        assert target.item_exists("command", "c")

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
                        "base_url": "http://x",
                        "api_key": "k",
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
        target = DroidTarget("my-id", tmp_path)
        assert target.id == "my-id"

    def test_exists_true(self, tmp_path: Path):
        config = tmp_path / ".droid"
        config.mkdir()
        target = DroidTarget("t", config)
        assert target.exists()

    def test_exists_false(self, tmp_path: Path):
        target = DroidTarget("t", tmp_path / "nonexistent")
        assert not target.exists()

    def test_manifest_path(self, tmp_path: Path):
        config = tmp_path / ".droid"
        config.mkdir()
        target = DroidTarget("t", config)
        assert target.manifest_path() == config / MANIFEST_FILENAME

    def test_rsync_includes(self, tmp_path: Path):
        config = tmp_path / ".droid"
        config.mkdir()
        target = DroidTarget("t", config)
        includes = target.rsync_includes()
        assert includes is not None
        assert "droids/" in includes
        assert "droids/**" in includes
        assert "skills/" in includes
        assert "mcp.json" in includes
        assert MANIFEST_FILENAME in includes


# ------------------------------------------------------------------
# Hooks (no-op for Droid)
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
        # Should not raise or create any files
        target.deploy_hook("git-ai", config)
        assert not (tmp_path / ".droid" / "settings.json").exists()


class TestRemoveHookNoop:
    def test_remove_hook_is_noop(self, tmp_path: Path):
        target = _make_target(tmp_path)
        # Should not raise
        target.remove_hook("git-ai")


# ------------------------------------------------------------------
# should_skip
# ------------------------------------------------------------------


class TestShouldSkip:
    def test_skips_hooks(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("hook", "my-hook") is True

    def test_skips_plain_command(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = b"---\nname: fix\n---\nFix things.\n"
        assert target.should_skip("command", "fix", content=content) is True

    def test_skips_command_without_content(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("command", "fix") is True

    def test_does_not_skip_droid_deploy_skill_command(self, tmp_path: Path):
        target = _make_target(tmp_path)
        content = b"---\nname: fix\ndroid_deploy: skill\n---\nFix things.\n"
        assert target.should_skip("command", "fix", content=content) is False

    def test_does_not_skip_agents(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("agent", "helper") is False

    def test_does_not_skip_skills(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("skill", "my-skill") is False

    def test_does_not_skip_mcp(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("mcp", "server") is False

    def test_does_not_skip_models(self, tmp_path: Path):
        target = _make_target(tmp_path)
        assert target.should_skip("models", "models") is False
