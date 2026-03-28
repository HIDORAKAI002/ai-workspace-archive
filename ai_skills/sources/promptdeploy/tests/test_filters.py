"""Tests for promptdeploy environment filtering."""

from pathlib import Path

import pytest

from promptdeploy.config import Config, TargetConfig
from promptdeploy.filters import (
    FilterError,
    expand_group,
    expand_list,
    should_deploy_to,
    validate_environments,
)

ALL_TARGETS = [
    "claude-personal",
    "claude-positron",
    "claude-git-ai",
    "droid",
    "opencode",
]
CLAUDE_TARGETS = ["claude-personal", "claude-positron", "claude-git-ai"]


@pytest.fixture
def config() -> Config:
    targets = {
        tid: TargetConfig(id=tid, type=t, path=Path(f"/tmp/{tid}"))
        for tid, t in [
            ("claude-personal", "claude"),
            ("claude-positron", "claude"),
            ("claude-git-ai", "claude"),
            ("droid", "droid"),
            ("opencode", "opencode"),
        ]
    }
    groups = {"claude": CLAUDE_TARGETS[:]}
    return Config(source_root=Path("/tmp"), targets=targets, groups=groups)


class TestExpandGroup:
    def test_known_group(self, config: Config) -> None:
        assert expand_group("claude", config) == CLAUDE_TARGETS

    def test_non_group_returns_singleton(self, config: Config) -> None:
        assert expand_group("droid", config) == ["droid"]

    def test_unknown_id_returns_singleton(self, config: Config) -> None:
        assert expand_group("unknown", config) == ["unknown"]


class TestExpandList:
    def test_none_returns_empty(self, config: Config) -> None:
        assert expand_list(None, config) == set()

    def test_single_target(self, config: Config) -> None:
        assert expand_list(["droid"], config) == {"droid"}

    def test_group_expansion(self, config: Config) -> None:
        assert expand_list(["claude"], config) == set(CLAUDE_TARGETS)

    def test_mixed(self, config: Config) -> None:
        result = expand_list(["claude", "droid"], config)
        assert result == set(CLAUDE_TARGETS) | {"droid"}

    def test_empty_list(self, config: Config) -> None:
        assert expand_list([], config) == set()


class TestValidateEnvironments:
    def test_none_is_valid(self, config: Config) -> None:
        validate_environments(None, config, "test.md")

    def test_valid_target(self, config: Config) -> None:
        validate_environments(["droid"], config, "test.md")

    def test_valid_group(self, config: Config) -> None:
        validate_environments(["claude"], config, "test.md")

    def test_invalid_raises(self, config: Config) -> None:
        with pytest.raises(FilterError, match="Invalid environment ID 'bogus'"):
            validate_environments(["bogus"], config, "test.md")

    def test_error_lists_valid_ids(self, config: Config) -> None:
        with pytest.raises(FilterError, match="Valid IDs:") as exc_info:
            validate_environments(["nope"], config, "test.md")
        msg = str(exc_info.value)
        assert "claude" in msg
        assert "droid" in msg
        assert "opencode" in msg

    def test_error_includes_source_path(self, config: Config) -> None:
        with pytest.raises(FilterError, match="agents/foo.md"):
            validate_environments(["bad"], config, "agents/foo.md")


class TestShouldDeployTo:
    def test_no_metadata_deploys_everywhere(self, config: Config) -> None:
        for target in ALL_TARGETS:
            assert should_deploy_to(target, None, config, "test.md") is True

    def test_no_only_or_except_deploys_everywhere(self, config: Config) -> None:
        metadata = {"name": "my-prompt"}
        for target in ALL_TARGETS:
            assert should_deploy_to(target, metadata, config, "test.md") is True

    def test_only_single_target(self, config: Config) -> None:
        metadata = {"only": ["claude-personal"]}
        assert should_deploy_to("claude-personal", metadata, config, "t.md") is True
        assert should_deploy_to("claude-positron", metadata, config, "t.md") is False
        assert should_deploy_to("droid", metadata, config, "t.md") is False

    def test_only_group_expansion(self, config: Config) -> None:
        metadata = {"only": ["claude"]}
        for target in CLAUDE_TARGETS:
            assert should_deploy_to(target, metadata, config, "t.md") is True
        assert should_deploy_to("droid", metadata, config, "t.md") is False
        assert should_deploy_to("opencode", metadata, config, "t.md") is False

    def test_except_single_target(self, config: Config) -> None:
        metadata = {"except": ["droid"]}
        assert should_deploy_to("droid", metadata, config, "t.md") is False
        for target in CLAUDE_TARGETS + ["opencode"]:
            assert should_deploy_to(target, metadata, config, "t.md") is True

    def test_except_group_excludes_all_members(self, config: Config) -> None:
        metadata = {"except": ["claude"]}
        for target in CLAUDE_TARGETS:
            assert should_deploy_to(target, metadata, config, "t.md") is False
        assert should_deploy_to("droid", metadata, config, "t.md") is True
        assert should_deploy_to("opencode", metadata, config, "t.md") is True

    def test_both_only_and_except_raises(self, config: Config) -> None:
        metadata = {"only": ["droid"], "except": ["opencode"]}
        with pytest.raises(FilterError, match="Cannot specify both"):
            should_deploy_to("droid", metadata, config, "t.md")

    def test_invalid_env_in_only_raises(self, config: Config) -> None:
        metadata = {"only": ["nonexistent"]}
        with pytest.raises(FilterError, match="Invalid environment ID 'nonexistent'"):
            should_deploy_to("droid", metadata, config, "t.md")

    def test_invalid_env_in_except_raises(self, config: Config) -> None:
        metadata = {"except": ["nonexistent"]}
        with pytest.raises(FilterError, match="Invalid environment ID 'nonexistent'"):
            should_deploy_to("droid", metadata, config, "t.md")

    def test_empty_only_deploys_nowhere(self, config: Config) -> None:
        metadata: dict[str, list[str]] = {"only": []}
        for target in ALL_TARGETS:
            assert should_deploy_to(target, metadata, config, "t.md") is False

    def test_empty_except_deploys_everywhere(self, config: Config) -> None:
        metadata: dict[str, list[str]] = {"except": []}
        for target in ALL_TARGETS:
            assert should_deploy_to(target, metadata, config, "t.md") is True


@pytest.fixture
def labeled_config() -> Config:
    """Config with targets that have labels, matching deploy.yaml structure."""
    targets = {
        "claude-personal": TargetConfig(
            id="claude-personal",
            type="claude",
            path=Path("/tmp/claude-personal"),
            labels=["claude", "personal", "local"],
        ),
        "claude-positron": TargetConfig(
            id="claude-positron",
            type="claude",
            path=Path("/tmp/claude-positron"),
            labels=["claude", "positron", "local"],
        ),
        "droid": TargetConfig(
            id="droid",
            type="droid",
            path=Path("/tmp/droid"),
            labels=["personal", "local"],
        ),
    }
    # Auto-generate groups from labels
    groups: dict[str, list[str]] = {}
    for tid, tc in targets.items():
        for label in tc.labels:
            groups.setdefault(label, [])
            if tid not in groups[label]:
                groups[label].append(tid)
    return Config(source_root=Path("/tmp"), targets=targets, groups=groups)


class TestFiletagFiltering:
    def test_empty_filetags_deploys_everywhere(self, labeled_config: Config) -> None:
        for target in labeled_config.targets:
            assert (
                should_deploy_to(target, None, labeled_config, "t.md", filetags=[])
                is True
            )

    def test_single_tag_filters_to_matching_targets(
        self, labeled_config: Config
    ) -> None:
        # positron tag should match only claude-positron
        assert (
            should_deploy_to(
                "claude-positron", None, labeled_config, "t.md", filetags=["positron"]
            )
            is True
        )
        assert (
            should_deploy_to(
                "claude-personal", None, labeled_config, "t.md", filetags=["positron"]
            )
            is False
        )
        assert (
            should_deploy_to(
                "droid", None, labeled_config, "t.md", filetags=["positron"]
            )
            is False
        )

    def test_multiple_tags_require_all(self, labeled_config: Config) -> None:
        # claude + personal = only claude-personal
        assert (
            should_deploy_to(
                "claude-personal",
                None,
                labeled_config,
                "t.md",
                filetags=["claude", "personal"],
            )
            is True
        )
        assert (
            should_deploy_to(
                "claude-positron",
                None,
                labeled_config,
                "t.md",
                filetags=["claude", "personal"],
            )
            is False
        )
        assert (
            should_deploy_to(
                "droid",
                None,
                labeled_config,
                "t.md",
                filetags=["claude", "personal"],
            )
            is False
        )

    def test_filetags_and_compose_with_frontmatter_only(
        self, labeled_config: Config
    ) -> None:
        # filetags=[local] matches all three targets, but only=[claude] narrows
        metadata = {"only": ["claude"]}
        assert (
            should_deploy_to(
                "claude-personal",
                metadata,
                labeled_config,
                "t.md",
                filetags=["local"],
            )
            is True
        )
        assert (
            should_deploy_to(
                "droid", metadata, labeled_config, "t.md", filetags=["local"]
            )
            is False
        )

    def test_filetags_and_compose_with_frontmatter_except(
        self, labeled_config: Config
    ) -> None:
        # filetags=[claude] matches both claude targets; except=[claude-personal]
        metadata = {"except": ["claude-personal"]}
        assert (
            should_deploy_to(
                "claude-positron",
                metadata,
                labeled_config,
                "t.md",
                filetags=["claude"],
            )
            is True
        )
        assert (
            should_deploy_to(
                "claude-personal",
                metadata,
                labeled_config,
                "t.md",
                filetags=["claude"],
            )
            is False
        )

    def test_filetags_group_expansion(self, labeled_config: Config) -> None:
        # "local" is a label on all three targets
        for target in labeled_config.targets:
            assert (
                should_deploy_to(
                    target, None, labeled_config, "t.md", filetags=["local"]
                )
                is True
            )

    def test_filetag_nonmatching_tag(self, labeled_config: Config) -> None:
        # "positron" label only on claude-positron
        assert (
            should_deploy_to(
                "droid", None, labeled_config, "t.md", filetags=["positron"]
            )
            is False
        )

    def test_invalid_filetag_raises(self, labeled_config: Config) -> None:
        with pytest.raises(FilterError, match="Invalid environment ID 'bogus'"):
            should_deploy_to("droid", None, labeled_config, "t.md", filetags=["bogus"])

    def test_filetag_target_id_match(self, labeled_config: Config) -> None:
        # A filetag equal to a target ID should match that specific target
        assert (
            should_deploy_to(
                "claude-personal",
                None,
                labeled_config,
                "t.md",
                filetags=["claude-personal"],
            )
            is True
        )
        assert (
            should_deploy_to(
                "claude-positron",
                None,
                labeled_config,
                "t.md",
                filetags=["claude-personal"],
            )
            is False
        )

    def test_none_filetags_deploys_everywhere(self, labeled_config: Config) -> None:
        for target in labeled_config.targets:
            assert (
                should_deploy_to(target, None, labeled_config, "t.md", filetags=None)
                is True
            )
