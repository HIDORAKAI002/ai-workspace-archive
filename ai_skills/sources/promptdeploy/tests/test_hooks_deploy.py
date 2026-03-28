"""Integration tests for hook deploy/remove in the Claude target."""

import json
from pathlib import Path


from promptdeploy.targets.claude import ClaudeTarget


def _make_target(tmp_path: Path) -> ClaudeTarget:
    config = tmp_path / ".claude"
    config.mkdir()
    return ClaudeTarget("my-target", config)


_GIT_AI_CONFIG = {
    "name": "git-ai",
    "description": "Git AI checkpoint hooks",
    "only": ["claude"],
    "hooks": {
        "PostToolUse": [
            {
                "matcher": "Write|Edit|MultiEdit",
                "hooks": [
                    {
                        "command": "git-ai checkpoint claude --hook-input stdin",
                        "type": "command",
                    }
                ],
            }
        ],
        "PreToolUse": [
            {
                "matcher": "Write|Edit|MultiEdit",
                "hooks": [
                    {
                        "command": "git-ai checkpoint claude --hook-input stdin",
                        "type": "command",
                    }
                ],
            }
        ],
    },
}

_COZEMPIC_CONFIG = {
    "name": "cozempic",
    "description": "Cozempic hooks",
    "hooks": {
        "PostToolUse": [
            {
                "matcher": "Task",
                "hooks": [{"command": "cozempic checkpoint", "type": "command"}],
            }
        ],
        "Stop": [
            {
                "matcher": "",
                "hooks": [{"command": "cozempic checkpoint", "type": "command"}],
            }
        ],
    },
}


class TestDeployHook:
    def test_creates_hooks_in_settings(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        assert "hooks" in settings
        post = settings["hooks"]["PostToolUse"]
        assert len(post) == 1
        assert post[0]["matcher"] == "Write|Edit|MultiEdit"
        assert post[0]["_source"] == "git-ai"

    def test_creates_settings_if_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)

        settings_path = tmp_path / ".claude" / "settings.json"
        assert settings_path.exists()
        settings = json.loads(settings_path.read_text())
        assert "hooks" in settings

    def test_merges_with_existing_settings(self, tmp_path: Path):
        target = _make_target(tmp_path)
        settings_path = tmp_path / ".claude" / "settings.json"
        settings_path.write_text(json.dumps({"allowedTools": ["Edit"]}))

        target.deploy_hook("git-ai", _GIT_AI_CONFIG)

        settings = json.loads(settings_path.read_text())
        assert settings["allowedTools"] == ["Edit"]
        assert "hooks" in settings

    def test_preserves_other_hook_sources(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)
        target.deploy_hook("cozempic", _COZEMPIC_CONFIG)

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        post = settings["hooks"]["PostToolUse"]
        sources = {e["_source"] for e in post}
        assert "git-ai" in sources
        assert "cozempic" in sources

    def test_replaces_existing_entries_on_redeploy(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        post = settings["hooks"]["PostToolUse"]
        # Only one entry per event type (no duplicates)
        git_ai_entries = [e for e in post if e.get("_source") == "git-ai"]
        assert len(git_ai_entries) == 1

    def test_deploy_empty_hooks_config(self, tmp_path: Path):
        target = _make_target(tmp_path)
        config = {"name": "empty", "hooks": {}}
        target.deploy_hook("empty", config)

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        # hooks key should be absent when empty
        assert "hooks" not in settings

    def test_redeploy_cleans_stale_event_types(self, tmp_path: Path):
        """If a hook group drops an event type in a new version, the old
        entries for that event type are cleaned up during redeploy."""
        target = _make_target(tmp_path)
        # Deploy with both PostToolUse and PreToolUse
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        assert "PreToolUse" in settings["hooks"]

        # Redeploy with only PostToolUse (PreToolUse dropped)
        hooks = _GIT_AI_CONFIG["hooks"]
        assert isinstance(hooks, dict)
        updated = {
            "hooks": {
                "PostToolUse": hooks["PostToolUse"],
            },
        }
        target.deploy_hook("git-ai", updated)

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        assert "PostToolUse" in settings["hooks"]
        assert "PreToolUse" not in settings["hooks"]

    def test_deploy_adds_source_tag_to_each_entry(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        for event_entries in settings["hooks"].values():
            for entry in event_entries:
                assert "_source" in entry
                assert entry["_source"] == "git-ai"

    def test_deploy_removes_pre_existing_duplicates(self, tmp_path: Path):
        """Pre-existing entries without _source that match new entries are removed."""
        target = _make_target(tmp_path)
        settings_path = tmp_path / ".claude" / "settings.json"

        # Simulate a manually-installed hook (no _source tag)
        manual_hooks = {
            "hooks": {
                "PostToolUse": [
                    {
                        "matcher": "Write|Edit|MultiEdit",
                        "hooks": [
                            {
                                "command": "git-ai checkpoint claude --hook-input stdin",
                                "type": "command",
                            }
                        ],
                    }
                ]
            }
        }
        settings_path.write_text(json.dumps(manual_hooks))

        # Deploy the same hook via promptdeploy
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)

        settings = json.loads(settings_path.read_text())
        post = settings["hooks"]["PostToolUse"]
        # Should have exactly one entry (with _source), not two
        assert len(post) == 1
        assert post[0]["_source"] == "git-ai"

    def test_deploy_no_hooks_key_in_config(self, tmp_path: Path):
        """When config has no 'hooks' key, nothing is written to hooks."""
        target = _make_target(tmp_path)
        config = {"name": "minimal"}
        target.deploy_hook("minimal", config)

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        # Empty hooks dict is cleaned up
        assert "hooks" not in settings


class TestRemoveHook:
    def test_removes_entries_by_source(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)
        target.deploy_hook("cozempic", _COZEMPIC_CONFIG)

        target.remove_hook("git-ai")

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        post = settings["hooks"].get("PostToolUse", [])
        sources = {e.get("_source") for e in post}
        assert "git-ai" not in sources
        assert "cozempic" in sources

    def test_removes_empty_event_type_keys(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)

        target.remove_hook("git-ai")

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        # Both PostToolUse and PreToolUse should be removed
        assert "PostToolUse" not in settings.get("hooks", {})
        assert "PreToolUse" not in settings.get("hooks", {})

    def test_removes_hooks_key_when_all_empty(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)

        target.remove_hook("git-ai")

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        assert "hooks" not in settings

    def test_no_error_if_settings_missing(self, tmp_path: Path):
        target = _make_target(tmp_path)
        # No settings.json created - remove_hook should be safe
        target.remove_hook("nonexistent")

    def test_no_error_if_hook_not_present(self, tmp_path: Path):
        target = _make_target(tmp_path)
        target.deploy_hook("cozempic", _COZEMPIC_CONFIG)
        # Remove a hook that was never deployed
        target.remove_hook("git-ai")

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        assert "hooks" in settings  # cozempic hooks still there

    def test_no_error_if_hooks_key_not_a_dict(self, tmp_path: Path):
        """If settings.json has 'hooks' as non-dict, remove_hook is safe."""
        target = _make_target(tmp_path)
        settings_path = tmp_path / ".claude" / "settings.json"
        settings_path.write_text(json.dumps({"hooks": "not-a-dict"}))

        target.remove_hook("git-ai")  # should not raise

    def test_preserves_other_settings_on_remove(self, tmp_path: Path):
        target = _make_target(tmp_path)
        settings_path = tmp_path / ".claude" / "settings.json"
        settings_path.write_text(json.dumps({"allowedTools": ["Edit"]}))

        target.deploy_hook("git-ai", _GIT_AI_CONFIG)
        target.remove_hook("git-ai")

        settings = json.loads(settings_path.read_text())
        assert settings["allowedTools"] == ["Edit"]
        assert "hooks" not in settings

    def test_partial_removal_keeps_other_event_types(self, tmp_path: Path):
        """Removing one hook source keeps other event types intact."""
        target = _make_target(tmp_path)
        target.deploy_hook("git-ai", _GIT_AI_CONFIG)
        target.deploy_hook("cozempic", _COZEMPIC_CONFIG)

        target.remove_hook("cozempic")

        settings = json.loads((tmp_path / ".claude" / "settings.json").read_text())
        # git-ai entries should still be there
        assert "PostToolUse" in settings["hooks"]
        post_sources = {e["_source"] for e in settings["hooks"]["PostToolUse"]}
        assert "git-ai" in post_sources
        # cozempic Stop should be gone
        stop = settings["hooks"].get("Stop", [])
        cozempic_stop = [e for e in stop if e.get("_source") == "cozempic"]
        assert cozempic_stop == []
