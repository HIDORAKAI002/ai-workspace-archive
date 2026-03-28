"""Tests for promptdeploy validation."""

from pathlib import Path

import pytest

from promptdeploy.config import Config, TargetConfig
from promptdeploy.source import SourceItem
from promptdeploy.validate import ValidationIssue, validate_all, validate_item


@pytest.fixture
def config() -> Config:
    targets = {
        "claude-personal": TargetConfig(
            id="claude-personal", type="claude", path=Path("/tmp/claude-personal")
        ),
        "droid": TargetConfig(id="droid", type="droid", path=Path("/tmp/droid")),
    }
    groups = {"claude": ["claude-personal"]}
    return Config(source_root=Path("/tmp/src"), targets=targets, groups=groups)


class TestValidateItem:
    def test_valid_agent_no_frontmatter(self, config: Config) -> None:
        item = SourceItem(
            "agent", "test", Path("/tmp/test.md"), None, b"No frontmatter"
        )
        issues = validate_item(item, config)
        assert issues == []

    def test_valid_agent_with_frontmatter(self, config: Config) -> None:
        content = b"---\nname: test\ndescription: A test agent\n---\nBody text"
        item = SourceItem(
            "agent", "test", Path("/tmp/test.md"), {"name": "test"}, content
        )
        issues = validate_item(item, config)
        assert issues == []

    def test_invalid_yaml_frontmatter(self, config: Config) -> None:
        content = b"---\ninvalid: yaml: [broken\n---\n"
        item = SourceItem("agent", "test", Path("/tmp/test.md"), None, content)
        issues = validate_item(item, config)
        assert len(issues) == 1
        assert issues[0].level == "error"
        assert "Invalid YAML" in issues[0].message

    def test_both_only_and_except(self, config: Config) -> None:
        content = b"---\nonly:\n  - droid\nexcept:\n  - claude-personal\n---\n"
        item = SourceItem("agent", "test", Path("/tmp/test.md"), None, content)
        issues = validate_item(item, config)
        assert any("Cannot specify both" in i.message for i in issues)

    def test_invalid_env_in_only(self, config: Config) -> None:
        content = b"---\nonly:\n  - nonexistent\n---\n"
        item = SourceItem("agent", "test", Path("/tmp/test.md"), None, content)
        issues = validate_item(item, config)
        assert len(issues) == 1
        assert "Invalid environment ID 'nonexistent'" in issues[0].message
        assert "'only'" in issues[0].message

    def test_invalid_env_in_except(self, config: Config) -> None:
        content = b"---\nexcept:\n  - bogus\n---\n"
        item = SourceItem("agent", "test", Path("/tmp/test.md"), None, content)
        issues = validate_item(item, config)
        assert len(issues) == 1
        assert "Invalid environment ID 'bogus'" in issues[0].message
        assert "'except'" in issues[0].message

    def test_only_not_a_list(self, config: Config) -> None:
        content = b"---\nonly: not-a-list\n---\n"
        item = SourceItem("agent", "test", Path("/tmp/test.md"), None, content)
        issues = validate_item(item, config)
        assert any("'only' must be a list" in i.message for i in issues)

    def test_except_not_a_list(self, config: Config) -> None:
        content = b"---\nexcept: not-a-list\n---\n"
        item = SourceItem("agent", "test", Path("/tmp/test.md"), None, content)
        issues = validate_item(item, config)
        assert any("'except' must be a list" in i.message for i in issues)

    def test_valid_only_with_group(self, config: Config) -> None:
        content = b"---\nonly:\n  - claude\n---\n"
        item = SourceItem("agent", "test", Path("/tmp/test.md"), None, content)
        issues = validate_item(item, config)
        assert issues == []

    def test_valid_except_with_target(self, config: Config) -> None:
        content = b"---\nexcept:\n  - droid\n---\n"
        item = SourceItem("agent", "test", Path("/tmp/test.md"), None, content)
        issues = validate_item(item, config)
        assert issues == []


class TestValidateItemMcp:
    def test_valid_mcp_with_command(self, config: Config) -> None:
        content = b"name: test-mcp\ncommand: npx\nargs:\n  - test-server\n"
        item = SourceItem("mcp", "test-mcp", Path("/tmp/mcp/test.yaml"), None, content)
        issues = validate_item(item, config)
        assert issues == []

    def test_valid_mcp_with_url(self, config: Config) -> None:
        content = b"name: test-mcp\nurl: https://example.com/mcp\n"
        item = SourceItem("mcp", "test-mcp", Path("/tmp/mcp/test.yaml"), None, content)
        issues = validate_item(item, config)
        assert issues == []

    def test_mcp_missing_name(self, config: Config) -> None:
        content = b"command: npx\nargs:\n  - test-server\n"
        item = SourceItem("mcp", "test-mcp", Path("/tmp/mcp/test.yaml"), None, content)
        issues = validate_item(item, config)
        assert any("missing 'name'" in i.message for i in issues)

    def test_mcp_missing_command_and_url(self, config: Config) -> None:
        content = b"name: test-mcp\nargs:\n  - test-server\n"
        item = SourceItem("mcp", "test-mcp", Path("/tmp/mcp/test.yaml"), None, content)
        issues = validate_item(item, config)
        assert any("missing 'command' or 'url'" in i.message for i in issues)

    def test_mcp_invalid_yaml(self, config: Config) -> None:
        content = b"name: [broken yaml\n"
        item = SourceItem("mcp", "test-mcp", Path("/tmp/mcp/test.yaml"), None, content)
        issues = validate_item(item, config)
        assert len(issues) == 1
        assert issues[0].level == "error"
        assert "Invalid YAML" in issues[0].message

    def test_mcp_non_dict_yaml(self, config: Config) -> None:
        content = b"just a string\n"
        item = SourceItem("mcp", "test-mcp", Path("/tmp/mcp/test.yaml"), None, content)
        issues = validate_item(item, config)
        # Non-dict metadata treated as None -> no issues (no metadata to validate)
        assert issues == []

    def test_mcp_with_only_filter(self, config: Config) -> None:
        content = b"name: test-mcp\ncommand: npx\nonly:\n  - droid\n"
        item = SourceItem("mcp", "test-mcp", Path("/tmp/mcp/test.yaml"), None, content)
        issues = validate_item(item, config)
        assert issues == []

    def test_mcp_with_invalid_only_filter(self, config: Config) -> None:
        content = b"name: test-mcp\ncommand: npx\nonly:\n  - nonexistent\n"
        item = SourceItem("mcp", "test-mcp", Path("/tmp/mcp/test.yaml"), None, content)
        issues = validate_item(item, config)
        assert any("Invalid environment ID" in i.message for i in issues)


class TestValidateItemModels:
    def _make_models_item(self, content_dict: dict) -> SourceItem:
        import yaml

        content = yaml.dump(content_dict).encode("utf-8")
        return SourceItem(
            "models", "models", Path("/tmp/models.yaml"), content_dict, content
        )

    def test_valid_models_yaml(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "sk-test",
                        "models": {"gpt-4": {"display_name": "GPT-4"}},
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert issues == []

    def test_missing_providers_key(self, config: Config) -> None:
        item = self._make_models_item({"something_else": "value"})
        issues = validate_item(item, config)
        assert any("missing or empty 'providers'" in i.message for i in issues)

    def test_empty_providers(self, config: Config) -> None:
        item = self._make_models_item({"providers": {}})
        issues = validate_item(item, config)
        assert any("missing or empty 'providers'" in i.message for i in issues)

    def test_provider_not_a_dict(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {"bad": "not-a-dict"},
            }
        )
        issues = validate_item(item, config)
        assert any("must be a mapping" in i.message for i in issues)

    def test_missing_required_fields(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "models": {"m": {}},
                    },
                },
            }
        )
        issues = validate_item(item, config)
        messages = [i.message for i in issues]
        assert any("'display_name'" in m for m in messages)
        assert any("'base_url'" in m for m in messages)
        assert any("'api_key'" in m for m in messages)

    def test_empty_models_in_provider(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {},
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any("no models defined" in i.message for i in issues)

    def test_provider_level_only_and_except_mutually_exclusive(
        self, config: Config
    ) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {"m": {}},
                        "only": ["droid"],
                        "except": ["claude-personal"],
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any(
            "cannot specify both 'only' and 'except'" in i.message for i in issues
        )

    def test_provider_level_only_not_a_list(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {"m": {}},
                        "only": "droid",
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any("'only' must be a list" in i.message for i in issues)

    def test_provider_level_invalid_environment_id(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {"m": {}},
                        "only": ["nonexistent-env"],
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any(
            "invalid environment ID 'nonexistent-env'" in i.message for i in issues
        )

    def test_provider_level_except_not_a_list(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {"m": {}},
                        "except": "droid",
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any("'except' must be a list" in i.message for i in issues)

    def test_model_level_only_and_except_mutually_exclusive(
        self, config: Config
    ) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {
                            "m": {
                                "only": ["droid"],
                                "except": ["claude-personal"],
                            },
                        },
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any(
            "cannot specify both 'only' and 'except'" in i.message for i in issues
        )

    def test_model_level_only_not_a_list(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {
                            "m": {"only": "droid"},
                        },
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any("'only' must be a list" in i.message for i in issues)

    def test_model_level_invalid_environment_id(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {
                            "m": {"only": ["bogus-env"]},
                        },
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any("invalid environment ID 'bogus-env'" in i.message for i in issues)

    def test_model_level_except_not_a_list(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {
                            "m": {"except": "droid"},
                        },
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any("'except' must be a list" in i.message for i in issues)

    def test_model_level_except_invalid_environment_id(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {
                            "m": {"except": ["nonexistent"]},
                        },
                    },
                },
            }
        )
        issues = validate_item(item, config)
        assert any("invalid environment ID 'nonexistent'" in i.message for i in issues)

    def test_model_not_a_dict_skipped_gracefully(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {
                            "m": "not-a-dict",
                        },
                    },
                },
            }
        )
        issues = validate_item(item, config)
        # Should not crash; no model-level only/except errors for non-dict models
        model_issues = [i for i in issues if "Model " in i.message]
        assert model_issues == []

    def test_providers_is_none(self, config: Config) -> None:
        item = self._make_models_item({"providers": None})
        issues = validate_item(item, config)
        assert any("missing or empty 'providers'" in i.message for i in issues)

    def test_valid_provider_level_only_with_group(self, config: Config) -> None:
        item = self._make_models_item(
            {
                "providers": {
                    "acme": {
                        "display_name": "Acme",
                        "base_url": "https://acme.com",
                        "api_key": "key",
                        "models": {"m": {}},
                        "only": ["claude"],
                    },
                },
            }
        )
        issues = validate_item(item, config)
        # "claude" is a valid group, so no environment ID errors
        env_issues = [i for i in issues if "invalid environment ID" in i.message]
        assert env_issues == []


class TestValidateAll:
    def test_empty_source(self, tmp_path: Path) -> None:
        config = Config(
            source_root=tmp_path,
            targets={"t": TargetConfig(id="t", type="claude", path=tmp_path)},
            groups={},
        )
        issues = validate_all(config)
        assert issues == []

    def test_finds_issues_across_types(self, tmp_path: Path) -> None:
        # Create an agent with invalid YAML frontmatter
        # Discovery raises FrontmatterError for this, so validate_all catches it
        agents_dir = tmp_path / "agents"
        agents_dir.mkdir()
        (agents_dir / "bad.md").write_bytes(b"---\ninvalid: yaml: [broken\n---\n")
        (agents_dir / "good.md").write_bytes(b"---\nname: good\n---\nBody")

        config = Config(
            source_root=tmp_path,
            targets={"t": TargetConfig(id="t", type="claude", path=tmp_path)},
            groups={},
        )
        issues = validate_all(config)
        assert len(issues) == 1
        assert issues[0].level == "error"
        assert "Discovery failed" in issues[0].message

    def test_finds_validation_issues_in_valid_items(self, tmp_path: Path) -> None:
        # Create agents with parseable but invalid env references
        agents_dir = tmp_path / "agents"
        agents_dir.mkdir()
        (agents_dir / "bad-env.md").write_bytes(
            b"---\nname: bad-env\nonly:\n  - nonexistent\n---\n"
        )
        (agents_dir / "good.md").write_bytes(b"---\nname: good\n---\nBody")

        config = Config(
            source_root=tmp_path,
            targets={"t": TargetConfig(id="t", type="claude", path=tmp_path)},
            groups={},
        )
        issues = validate_all(config)
        assert len(issues) == 1
        assert "Invalid environment ID" in issues[0].message
        assert issues[0].file_path == agents_dir / "bad-env.md"

    def test_duplicate_names_detected(self, tmp_path: Path) -> None:
        # Two commands with different filetags that resolve to the same name
        commands_dir = tmp_path / "commands"
        commands_dir.mkdir()
        (commands_dir / "deploy -- prod.md").write_bytes(b"Deploy to prod")
        (commands_dir / "deploy -- dev.md").write_bytes(b"Deploy to dev")

        config = Config(
            source_root=tmp_path,
            targets={
                "t": TargetConfig(
                    id="t", type="claude", path=tmp_path, labels=["prod", "dev"]
                )
            },
            groups={"prod": ["t"], "dev": ["t"]},
        )
        issues = validate_all(config)
        dup_issues = [i for i in issues if "Duplicate" in i.message]
        assert len(dup_issues) == 1
        assert "deploy" in dup_issues[0].message


class TestValidateItemHook:
    def _make_hook_item(self, content_dict: dict) -> SourceItem:
        import yaml

        content = yaml.dump(content_dict).encode("utf-8")
        return SourceItem(
            "hook",
            content_dict.get("name", "test-hook"),
            Path("/tmp/hooks/test.yaml"),
            content_dict,
            content,
        )

    def test_valid_hook(self, config: Config) -> None:
        item = self._make_hook_item(
            {
                "name": "my-hook",
                "hooks": {
                    "PostToolUse": [
                        {
                            "matcher": "Write",
                            "hooks": [{"command": "echo", "type": "command"}],
                        }
                    ],
                },
            }
        )
        issues = validate_item(item, config)
        assert issues == []

    def test_hook_missing_name(self, config: Config) -> None:
        item = self._make_hook_item(
            {
                "hooks": {
                    "PostToolUse": [{"matcher": "Write", "hooks": []}],
                },
            }
        )
        issues = validate_item(item, config)
        assert any("missing 'name'" in i.message for i in issues)

    def test_hook_missing_hooks_field(self, config: Config) -> None:
        item = self._make_hook_item({"name": "my-hook"})
        issues = validate_item(item, config)
        assert any("missing or invalid 'hooks'" in i.message for i in issues)

    def test_hook_hooks_not_a_dict(self, config: Config) -> None:
        item = self._make_hook_item({"name": "my-hook", "hooks": "not-a-dict"})
        issues = validate_item(item, config)
        assert any("missing or invalid 'hooks'" in i.message for i in issues)

    def test_hook_invalid_event_type(self, config: Config) -> None:
        item = self._make_hook_item(
            {
                "name": "my-hook",
                "hooks": {
                    "InvalidEvent": [{"matcher": "Write", "hooks": []}],
                },
            }
        )
        issues = validate_item(item, config)
        assert any(
            "Invalid hook event type 'InvalidEvent'" in i.message for i in issues
        )

    def test_hook_empty_event_list(self, config: Config) -> None:
        item = self._make_hook_item(
            {
                "name": "my-hook",
                "hooks": {
                    "PostToolUse": [],
                },
            }
        )
        issues = validate_item(item, config)
        assert any("must be a non-empty list" in i.message for i in issues)

    def test_hook_event_not_a_list(self, config: Config) -> None:
        item = self._make_hook_item(
            {
                "name": "my-hook",
                "hooks": {
                    "PostToolUse": "not-a-list",
                },
            }
        )
        issues = validate_item(item, config)
        assert any("must be a non-empty list" in i.message for i in issues)

    def test_hook_all_valid_event_types(self, config: Config) -> None:
        for event in [
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
        ]:
            item = self._make_hook_item(
                {
                    "name": "my-hook",
                    "hooks": {
                        event: [{"matcher": "", "hooks": []}],
                    },
                }
            )
            issues = validate_item(item, config)
            event_issues = [i for i in issues if "Invalid hook event type" in i.message]
            assert event_issues == [], (
                f"Unexpected error for event {event}: {event_issues}"
            )

    def test_hook_with_only_filter(self, config: Config) -> None:
        item = self._make_hook_item(
            {
                "name": "my-hook",
                "only": ["claude-personal"],
                "hooks": {
                    "Stop": [{"matcher": "", "hooks": []}],
                },
            }
        )
        issues = validate_item(item, config)
        assert issues == []

    def test_hook_invalid_yaml(self, config: Config) -> None:
        content = b"name: [broken yaml\n"
        item = SourceItem(
            "hook", "test-hook", Path("/tmp/hooks/test.yaml"), None, content
        )
        issues = validate_item(item, config)
        assert len(issues) == 1
        assert "Invalid YAML" in issues[0].message

    def test_hook_non_dict_yaml(self, config: Config) -> None:
        content = b"just a string\n"
        item = SourceItem(
            "hook", "test-hook", Path("/tmp/hooks/test.yaml"), None, content
        )
        issues = validate_item(item, config)
        # Non-dict metadata -> None -> no issues
        assert issues == []

    def test_validate_all_includes_hooks(self, tmp_path: Path) -> None:
        hooks_dir = tmp_path / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / "bad.yaml").write_bytes(b"name: bad\nhooks: not-a-dict\n")

        config = Config(
            source_root=tmp_path,
            targets={"t": TargetConfig(id="t", type="claude", path=tmp_path)},
            groups={},
        )
        issues = validate_all(config)
        assert any("missing or invalid 'hooks'" in i.message for i in issues)


class TestValidateFiletags:
    def test_valid_filetags(self, config: Config) -> None:
        item = SourceItem(
            "agent",
            "test",
            Path("/tmp/test.md"),
            None,
            b"No frontmatter",
            filetags=["claude"],
        )
        issues = validate_item(item, config)
        assert issues == []

    def test_invalid_filetag_label(self, config: Config) -> None:
        item = SourceItem(
            "agent",
            "test",
            Path("/tmp/test.md"),
            None,
            b"No frontmatter",
            filetags=["nonexistent"],
        )
        issues = validate_item(item, config)
        assert len(issues) == 1
        assert "Invalid filetag label 'nonexistent'" in issues[0].message

    def test_multiple_filetags_one_invalid(self, config: Config) -> None:
        item = SourceItem(
            "agent",
            "test",
            Path("/tmp/test.md"),
            None,
            b"No frontmatter",
            filetags=["claude", "bogus"],
        )
        issues = validate_item(item, config)
        assert len(issues) == 1
        assert "Invalid filetag label 'bogus'" in issues[0].message

    def test_empty_filetags_no_issues(self, config: Config) -> None:
        item = SourceItem(
            "agent", "test", Path("/tmp/test.md"), None, b"No frontmatter", filetags=[]
        )
        issues = validate_item(item, config)
        assert issues == []


class TestValidationIssue:
    def test_fields(self) -> None:
        issue = ValidationIssue(
            level="error", message="test", file_path=Path("/tmp/x"), line=42
        )
        assert issue.level == "error"
        assert issue.message == "test"
        assert issue.file_path == Path("/tmp/x")
        assert issue.line == 42

    def test_line_optional(self) -> None:
        issue = ValidationIssue(
            level="warning", message="warn", file_path=Path("/tmp/x")
        )
        assert issue.line is None
