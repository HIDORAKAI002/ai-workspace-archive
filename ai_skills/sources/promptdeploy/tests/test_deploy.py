"""Integration tests for the deploy orchestration."""

import json
from pathlib import Path


from promptdeploy.config import Config, TargetConfig
from promptdeploy.deploy import deploy
from promptdeploy.manifest import MANIFEST_FILENAME, load_manifest


def _make_source(tmp_path: Path) -> Path:
    """Create a minimal source tree with one agent, one command, one skill."""
    src = tmp_path / "source"
    src.mkdir()

    agents = src / "agents"
    agents.mkdir()
    (agents / "helper.md").write_bytes(b"---\nname: helper\n---\nAgent body.\n")

    commands = src / "commands"
    commands.mkdir()
    (commands / "fix.md").write_bytes(b"---\nname: fix\n---\nFix things.\n")

    skills = src / "skills"
    skills.mkdir()
    skill_dir = skills / "my-skill"
    skill_dir.mkdir()
    (skill_dir / "SKILL.md").write_bytes(
        b"---\nname: my-skill\ndescription: A skill\n---\nSkill body.\n"
    )
    (skill_dir / "helper.py").write_text("print('hi')")

    return src


def _make_config(source_root: Path, targets: dict[str, TargetConfig]) -> Config:
    return Config(source_root=source_root, targets=targets, groups={})


def _make_claude_target(tmp_path: Path, target_id: str = "test-claude") -> TargetConfig:
    target_dir = tmp_path / target_id
    target_dir.mkdir()
    return TargetConfig(id=target_id, type="claude", path=target_dir)


class TestFullDeploy:
    """Deploy all items to a fresh target."""

    def test_creates_all_items(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        actions = deploy(config)

        creates = [a for a in actions if a.action == "create"]
        assert len(creates) == 3
        names = {a.name for a in creates}
        assert names == {"helper", "fix", "my-skill"}

        # Verify files exist on disk
        assert (tc.path / "agents" / "helper.md").exists()
        assert (tc.path / "commands" / "fix.md").exists()
        assert (tc.path / "skills" / "my-skill" / "SKILL.md").exists()
        assert (tc.path / "skills" / "my-skill" / "helper.py").exists()

    def test_manifest_created(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        deploy(config)

        manifest = load_manifest(tc.path / MANIFEST_FILENAME)
        assert "helper" in manifest.items["agents"]
        assert "fix" in manifest.items["commands"]
        assert "my-skill" in manifest.items["skills"]


class TestIdempotency:
    """Second deploy with no changes should produce all skips."""

    def test_second_deploy_all_skips(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        deploy(config)
        actions = deploy(config)

        skips = [a for a in actions if a.action == "skip"]
        non_skips = [a for a in actions if a.action != "skip"]
        assert len(skips) == 3
        assert len(non_skips) == 0


class TestUpdate:
    """Modifying source content triggers update, not create."""

    def test_changed_content_produces_update(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        deploy(config)

        # Modify the agent content
        (src / "agents" / "helper.md").write_bytes(
            b"---\nname: helper\n---\nUpdated body.\n"
        )

        actions = deploy(config)
        updates = [a for a in actions if a.action == "update"]
        assert len(updates) == 1
        assert updates[0].name == "helper"
        assert updates[0].item_type == "agent"

        # Verify content on disk is updated
        deployed = (tc.path / "agents" / "helper.md").read_bytes()
        assert b"Updated body." in deployed


class TestRemoval:
    """Items removed from source get removed from target."""

    def test_removes_deleted_source(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        deploy(config)
        assert (tc.path / "agents" / "helper.md").exists()

        # Remove the agent from source
        (src / "agents" / "helper.md").unlink()

        actions = deploy(config)
        removes = [a for a in actions if a.action == "remove"]
        assert len(removes) == 1
        assert removes[0].name == "helper"
        assert removes[0].item_type == "agent"

        # Verify removed from disk
        assert not (tc.path / "agents" / "helper.md").exists()

    def test_removal_updates_manifest(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        deploy(config)
        (src / "agents" / "helper.md").unlink()
        deploy(config)

        manifest = load_manifest(tc.path / MANIFEST_FILENAME)
        assert "helper" not in manifest.items.get("agents", {})


class TestDryRun:
    """Dry run computes actions without writing."""

    def test_dry_run_makes_no_changes(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        actions = deploy(config, dry_run=True)

        creates = [a for a in actions if a.action == "create"]
        assert len(creates) == 3

        # Nothing written to disk
        assert not (tc.path / "agents" / "helper.md").exists()
        assert not (tc.path / MANIFEST_FILENAME).exists()

    def test_dry_run_removal_no_delete(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        deploy(config)
        (src / "agents" / "helper.md").unlink()

        actions = deploy(config, dry_run=True)
        removes = [a for a in actions if a.action == "remove"]
        assert len(removes) == 1

        # File still on disk because dry run
        assert (tc.path / "agents" / "helper.md").exists()


class TestTargetFilter:
    """--target limits deployment to specific targets."""

    def test_deploy_to_single_target(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc1 = _make_claude_target(tmp_path, "target-a")
        tc2 = _make_claude_target(tmp_path, "target-b")
        config = _make_config(src, {tc1.id: tc1, tc2.id: tc2})

        actions = deploy(config, target_ids=["target-a"])

        target_ids = {a.target_id for a in actions}
        assert target_ids == {"target-a"}

        assert (tc1.path / "agents" / "helper.md").exists()
        assert not (tc2.path / "agents").exists()


class TestOnlyType:
    """--only-type limits which item types are deployed."""

    def test_only_agents(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        actions = deploy(config, item_types=["agents"])

        types = {a.item_type for a in actions}
        assert types == {"agent"}
        assert (tc.path / "agents" / "helper.md").exists()
        assert not (tc.path / "commands").exists()
        assert not (tc.path / "skills").exists()

    def test_only_type_preserves_other_manifest_items(self, tmp_path: Path):
        """When using --only-type, items of other types stay in manifest."""
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        # Deploy everything first
        deploy(config)
        # Now deploy only agents
        deploy(config, item_types=["agents"])

        manifest = load_manifest(tc.path / MANIFEST_FILENAME)
        # Agent should still be in manifest
        assert "helper" in manifest.items["agents"]
        # Other types should be preserved (not removed)
        assert "fix" in manifest.items["commands"]
        assert "my-skill" in manifest.items["skills"]


class TestEnvironmentFilters:
    """Frontmatter only/except filters control target selection."""

    def test_only_filter_excludes_target(self, tmp_path: Path):
        src = tmp_path / "source"
        src.mkdir()
        agents = src / "agents"
        agents.mkdir()
        (agents / "limited.md").write_bytes(
            b"---\nname: limited\nonly:\n  - target-a\n---\nLimited agent.\n"
        )

        tc_a = _make_claude_target(tmp_path, "target-a")
        tc_b = _make_claude_target(tmp_path, "target-b")
        config = _make_config(src, {tc_a.id: tc_a, tc_b.id: tc_b})

        actions = deploy(config)

        a_actions = [a for a in actions if a.target_id == "target-a"]
        b_actions = [a for a in actions if a.target_id == "target-b"]
        assert len(a_actions) == 1
        assert a_actions[0].action == "create"
        assert len(b_actions) == 0

    def test_except_filter_excludes_target(self, tmp_path: Path):
        src = tmp_path / "source"
        src.mkdir()
        agents = src / "agents"
        agents.mkdir()
        (agents / "wide.md").write_bytes(
            b"---\nname: wide\nexcept:\n  - target-b\n---\nWide agent.\n"
        )

        tc_a = _make_claude_target(tmp_path, "target-a")
        tc_b = _make_claude_target(tmp_path, "target-b")
        config = _make_config(src, {tc_a.id: tc_a, tc_b.id: tc_b})

        actions = deploy(config)

        a_actions = [a for a in actions if a.target_id == "target-a"]
        b_actions = [a for a in actions if a.target_id == "target-b"]
        assert len(a_actions) == 1
        assert len(b_actions) == 0


class TestMultipleTargets:
    """Deploy to multiple targets simultaneously."""

    def test_deploys_to_all_targets(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc1 = _make_claude_target(tmp_path, "t1")
        tc2 = _make_claude_target(tmp_path, "t2")
        config = _make_config(src, {tc1.id: tc1, tc2.id: tc2})

        actions = deploy(config)

        creates = [a for a in actions if a.action == "create"]
        # 3 items * 2 targets = 6
        assert len(creates) == 6

        for tc in [tc1, tc2]:
            assert (tc.path / "agents" / "helper.md").exists()
            assert (tc.path / "commands" / "fix.md").exists()


class TestMcpDeploy:
    """Deploy MCP server items through the deploy orchestration."""

    def test_deploys_mcp_server(self, tmp_path: Path):
        src = tmp_path / "source"
        src.mkdir()
        mcp_dir = src / "mcp"
        mcp_dir.mkdir()
        (mcp_dir / "my-server.yaml").write_bytes(
            b"name: my-server\ncommand: npx\nargs:\n  - my-server\n"
        )

        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})
        actions = deploy(config)

        creates = [a for a in actions if a.action == "create"]
        assert any(a.name == "my-server" and a.item_type == "mcp" for a in creates)

        # Verify MCP server was written to settings.json
        settings = json.loads((tc.path / "settings.json").read_text())
        assert "my-server" in settings["mcpServers"]

    def test_removes_stale_mcp_server(self, tmp_path: Path):
        src = tmp_path / "source"
        src.mkdir()
        mcp_dir = src / "mcp"
        mcp_dir.mkdir()
        (mcp_dir / "server.yaml").write_bytes(b"name: server\ncommand: echo\n")

        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})
        deploy(config)

        # Remove MCP source
        (mcp_dir / "server.yaml").unlink()
        actions = deploy(config)

        removes = [a for a in actions if a.action == "remove"]
        assert any(a.name == "server" and a.item_type == "mcp" for a in removes)


class TestRemoveCommands:
    """Removal of commands from target."""

    def test_removes_stale_command(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})
        deploy(config)

        (src / "commands" / "fix.md").unlink()
        actions = deploy(config)

        removes = [a for a in actions if a.action == "remove"]
        assert any(a.name == "fix" and a.item_type == "command" for a in removes)


class TestRemoveSkills:
    """Removal of skills from target."""

    def test_removes_stale_skill(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})
        deploy(config)

        import shutil

        shutil.rmtree(src / "skills" / "my-skill")
        actions = deploy(config)

        removes = [a for a in actions if a.action == "remove"]
        assert any(a.name == "my-skill" and a.item_type == "skill" for a in removes)


class TestUnmanagedFiles:
    """Pre-existing files not in manifest are left alone."""

    def test_unmanaged_files_preserved(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        # Create an unmanaged file in the target
        agents_dir = tc.path / "agents"
        agents_dir.mkdir(parents=True)
        unmanaged = agents_dir / "custom.md"
        unmanaged.write_text("my custom agent")

        deploy(config)

        # Unmanaged file should still be there
        assert unmanaged.exists()
        assert unmanaged.read_text() == "my custom agent"


class TestPreExisting:
    """Pre-existing items at the target are not overwritten."""

    def test_pre_existing_agent_skipped(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        # Place a pre-existing agent file before first deploy
        agents_dir = tc.path / "agents"
        agents_dir.mkdir(parents=True)
        (agents_dir / "helper.md").write_text("I was here first")

        actions = deploy(config)

        pre = [a for a in actions if a.action == "pre-existing"]
        assert len(pre) == 1
        assert pre[0].name == "helper"
        assert pre[0].item_type == "agent"

        # Pre-existing file should not be overwritten
        assert (agents_dir / "helper.md").read_text() == "I was here first"

    def test_pre_existing_skill_symlink_skipped(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        # Place a pre-existing symlink for the skill
        skills_dir = tc.path / "skills"
        skills_dir.mkdir(parents=True)
        real_dir = tmp_path / "real-skill"
        real_dir.mkdir()
        (skills_dir / "my-skill").symlink_to(real_dir)

        actions = deploy(config)

        pre = [a for a in actions if a.action == "pre-existing"]
        assert any(a.name == "my-skill" for a in pre)

        # Symlink should be left alone
        assert (skills_dir / "my-skill").is_symlink()

    def test_pre_existing_not_in_manifest(self, tmp_path: Path):
        """Pre-existing items are not recorded in the manifest."""
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        agents_dir = tc.path / "agents"
        agents_dir.mkdir(parents=True)
        (agents_dir / "helper.md").write_text("pre-existing")

        deploy(config)

        manifest = load_manifest(tc.path / MANIFEST_FILENAME)
        # helper was pre-existing, should not be in manifest
        assert "helper" not in manifest.items.get("agents", {})


class TestHookDeploy:
    """Deploy hook items through the deploy orchestration."""

    def test_deploys_hook(self, tmp_path: Path):
        src = tmp_path / "source"
        src.mkdir()
        hooks_dir = src / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / "my-hook.yaml").write_bytes(
            b"name: my-hook\nhooks:\n  PostToolUse:\n    - matcher: 'Write'\n      hooks:\n        - command: 'echo hi'\n          type: command\n"
        )

        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})
        actions = deploy(config)

        creates = [a for a in actions if a.action == "create"]
        assert any(a.name == "my-hook" and a.item_type == "hook" for a in creates)

        # Verify hook was written to settings.json
        settings = json.loads((tc.path / "settings.json").read_text())
        assert "hooks" in settings
        assert "PostToolUse" in settings["hooks"]

    def test_removes_stale_hook(self, tmp_path: Path):
        src = tmp_path / "source"
        src.mkdir()
        hooks_dir = src / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / "hook.yaml").write_bytes(
            b"name: hook\nhooks:\n  Stop:\n    - matcher: ''\n      hooks:\n        - command: 'echo'\n          type: command\n"
        )

        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})
        deploy(config)

        # Remove hook source
        (hooks_dir / "hook.yaml").unlink()
        actions = deploy(config)

        removes = [a for a in actions if a.action == "remove"]
        assert any(a.name == "hook" and a.item_type == "hook" for a in removes)


class TestShouldSkipIntegration:
    """Items that a target would no-op are excluded from deploy and manifest."""

    def test_droid_skips_plain_commands_and_hooks(self, tmp_path: Path):
        src = tmp_path / "source"
        src.mkdir()

        # Create an agent (should deploy), a plain command (should skip),
        # and a hook (should skip).
        agents = src / "agents"
        agents.mkdir()
        (agents / "helper.md").write_bytes(b"---\nname: helper\n---\nAgent.\n")

        commands = src / "commands"
        commands.mkdir()
        (commands / "fix.md").write_bytes(b"---\nname: fix\n---\nFix things.\n")

        hooks = src / "hooks"
        hooks.mkdir()
        (hooks / "my-hook.yaml").write_bytes(
            b"name: my-hook\nhooks:\n  Stop:\n    - matcher: ''\n      hooks:\n        - command: 'echo'\n          type: command\n"
        )

        target_dir = tmp_path / "droid-target"
        target_dir.mkdir()
        tc = TargetConfig(id="droid-t", type="droid", path=target_dir)
        config = _make_config(src, {tc.id: tc})

        actions = deploy(config)
        creates = [a for a in actions if a.action == "create"]
        # Only the agent should be created
        assert len(creates) == 1
        assert creates[0].name == "helper"

        # Second deploy should be fully idempotent
        actions2 = deploy(config)
        non_skips = [a for a in actions2 if a.action != "skip"]
        assert len(non_skips) == 0

        # Skipped items should not be in manifest
        manifest = load_manifest(target_dir / MANIFEST_FILENAME)
        assert "fix" not in manifest.items.get("commands", {})
        assert "my-hook" not in manifest.items.get("hooks", {})

    def test_claude_skips_models(self, tmp_path: Path):
        src = tmp_path / "source"
        src.mkdir()

        agents = src / "agents"
        agents.mkdir()
        (agents / "helper.md").write_bytes(b"---\nname: helper\n---\nAgent.\n")

        # Create a models.yaml
        (src / "models.yaml").write_bytes(
            b"providers:\n  acme:\n    display_name: Acme\n    base_url: https://acme.com\n    api_key: key\n    models:\n      m1:\n        display_name: Model 1\n"
        )

        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        actions = deploy(config)
        creates = [a for a in actions if a.action == "create"]
        # Only agent, not models
        assert len(creates) == 1
        assert creates[0].name == "helper"

        # Second deploy should be fully idempotent
        actions2 = deploy(config)
        non_skips = [a for a in actions2 if a.action != "skip"]
        assert len(non_skips) == 0


class TestFiletagDeploy:
    """Filetags in filenames control which targets receive items."""

    def test_filetag_restricts_deployment(self, tmp_path: Path):
        """A tagged file only deploys to targets with matching labels."""
        src = tmp_path / "source"
        src.mkdir()
        commands = src / "commands"
        commands.mkdir()
        # Create a command tagged for positron only
        (commands / "heavy -- positron.md").write_bytes(b"Heavy command body.\n")

        tc_personal = _make_claude_target(tmp_path, "claude-personal")
        tc_positron = _make_claude_target(tmp_path, "claude-positron")

        targets = {
            tc_personal.id: TargetConfig(
                id=tc_personal.id,
                type="claude",
                path=tc_personal.path,
                labels=["claude", "personal", "local"],
            ),
            tc_positron.id: TargetConfig(
                id=tc_positron.id,
                type="claude",
                path=tc_positron.path,
                labels=["claude", "positron", "local"],
            ),
        }
        groups: dict[str, list[str]] = {}
        for tid, tc in targets.items():
            for label in tc.labels:
                groups.setdefault(label, [])
                if tid not in groups[label]:
                    groups[label].append(tid)
        config = Config(source_root=src, targets=targets, groups=groups)

        actions = deploy(config)

        # Should only deploy to positron
        positron_actions = [a for a in actions if a.target_id == "claude-positron"]
        personal_actions = [a for a in actions if a.target_id == "claude-personal"]
        assert len(positron_actions) == 1
        assert positron_actions[0].action == "create"
        assert positron_actions[0].name == "heavy"
        assert len(personal_actions) == 0

        # File should exist on positron as heavy.md (not heavy -- positron.md)
        assert (tc_positron.path / "commands" / "heavy.md").exists()
        assert not (tc_personal.path / "commands").exists()

    def test_filetag_removal_on_tag_change(self, tmp_path: Path):
        """When tags change, item is removed from previously matching targets."""
        src = tmp_path / "source"
        src.mkdir()
        commands = src / "commands"
        commands.mkdir()
        # Initially untagged — deploys everywhere
        (commands / "heavy.md").write_bytes(b"Heavy body.\n")

        tc_personal = _make_claude_target(tmp_path, "claude-personal")
        tc_positron = _make_claude_target(tmp_path, "claude-positron")

        targets = {
            tc_personal.id: TargetConfig(
                id=tc_personal.id,
                type="claude",
                path=tc_personal.path,
                labels=["claude", "personal"],
            ),
            tc_positron.id: TargetConfig(
                id=tc_positron.id,
                type="claude",
                path=tc_positron.path,
                labels=["claude", "positron"],
            ),
        }
        groups: dict[str, list[str]] = {}
        for tid, tc in targets.items():
            for label in tc.labels:
                groups.setdefault(label, [])
                if tid not in groups[label]:
                    groups[label].append(tid)
        config = Config(source_root=src, targets=targets, groups=groups)

        # First deploy — untagged, goes to both
        deploy(config)
        assert (tc_personal.path / "commands" / "heavy.md").exists()
        assert (tc_positron.path / "commands" / "heavy.md").exists()

        # Now rename with a tag — only positron
        (commands / "heavy.md").rename(commands / "heavy -- positron.md")

        actions = deploy(config)

        # Personal should get a remove, positron should skip (same content)
        personal_removes = [
            a
            for a in actions
            if a.target_id == "claude-personal" and a.action == "remove"
        ]
        assert len(personal_removes) == 1
        assert personal_removes[0].name == "heavy"

        # File removed from personal
        assert not (tc_personal.path / "commands" / "heavy.md").exists()
        # File still on positron
        assert (tc_positron.path / "commands" / "heavy.md").exists()


class TestForce:
    """--force bypasses checksum and pre-existing checks."""

    def test_force_redeploys_unchanged_items(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        deploy(config)
        actions = deploy(config, force=True)

        updates = [a for a in actions if a.action == "update"]
        skips = [a for a in actions if a.action == "skip"]
        assert len(updates) == 3
        assert len(skips) == 0

    def test_force_overwrites_pre_existing(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        agents_dir = tc.path / "agents"
        agents_dir.mkdir(parents=True)
        (agents_dir / "helper.md").write_text("I was here first")

        actions = deploy(config, force=True)

        creates = [a for a in actions if a.action == "create"]
        pre = [a for a in actions if a.action == "pre-existing"]
        assert any(a.name == "helper" for a in creates)
        assert len(pre) == 0

        # File should be overwritten
        assert (agents_dir / "helper.md").read_text() != "I was here first"

    def test_force_records_in_manifest(self, tmp_path: Path):
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})

        agents_dir = tc.path / "agents"
        agents_dir.mkdir(parents=True)
        (agents_dir / "helper.md").write_text("pre-existing")

        deploy(config, force=True)

        manifest = load_manifest(tc.path / MANIFEST_FILENAME)
        assert "helper" in manifest.items.get("agents", {})
