"""Tests for the list subcommand."""

from pathlib import Path

from promptdeploy.config import Config, TargetConfig
from promptdeploy.deploy import deploy


def _make_source(tmp_path: Path) -> Path:
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
    return src


def _make_config(source_root: Path, targets: dict[str, TargetConfig]) -> Config:
    return Config(source_root=source_root, targets=targets, groups={})


def _make_claude_target(tmp_path: Path, target_id: str = "test-claude") -> TargetConfig:
    target_dir = tmp_path / target_id
    target_dir.mkdir()
    return TargetConfig(id=target_id, type="claude", path=target_dir)


class TestListWithManifest:
    """List items from targets that have been deployed to."""

    def test_lists_deployed_items(self, tmp_path: Path, capsys) -> None:

        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})
        deploy(config)

        # Now test the list logic directly
        from promptdeploy.manifest import load_manifest
        from promptdeploy.targets import create_target

        target = create_target(tc)
        manifest = load_manifest(target.manifest_path())

        assert "helper" in manifest.items["agents"]
        assert "fix" in manifest.items["commands"]
        assert "my-skill" in manifest.items["skills"]

    def test_lists_grouped_by_category(self, tmp_path: Path, capsys) -> None:
        """Verify items are printed grouped by category."""
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path)
        config = _make_config(src, {tc.id: tc})
        deploy(config)

        # Simulate list output
        from promptdeploy.manifest import load_manifest
        from promptdeploy.targets import create_target

        target = create_target(tc)
        manifest = load_manifest(target.manifest_path())

        # Verify the manifest has all three categories populated
        assert len(manifest.items["agents"]) == 1
        assert len(manifest.items["commands"]) == 1
        assert len(manifest.items["skills"]) == 1


class TestListNoManifest:
    """Targets with no manifest show no managed items."""

    def test_no_manifest(self, tmp_path: Path) -> None:
        from promptdeploy.manifest import load_manifest
        from promptdeploy.targets import create_target

        tc = _make_claude_target(tmp_path)
        target = create_target(tc)
        manifest = load_manifest(target.manifest_path())

        total = sum(len(items) for items in manifest.items.values())
        assert total == 0


class TestListNonExistentTarget:
    """Targets that don't exist show (not installed)."""

    def test_not_installed(self, tmp_path: Path) -> None:
        from promptdeploy.targets import create_target

        tc = TargetConfig(id="missing", type="claude", path=tmp_path / "nonexistent")
        target = create_target(tc)
        assert not target.exists()


class TestListMultipleTargets:
    """List works across multiple targets."""

    def test_multiple_targets(self, tmp_path: Path) -> None:
        src = _make_source(tmp_path)
        tc1 = _make_claude_target(tmp_path, "t1")
        tc2 = _make_claude_target(tmp_path, "t2")
        config = _make_config(src, {tc1.id: tc1, tc2.id: tc2})

        deploy(config)

        from promptdeploy.manifest import load_manifest
        from promptdeploy.targets import create_target

        for tc in [tc1, tc2]:
            target = create_target(tc)
            manifest = load_manifest(target.manifest_path())
            total = sum(len(items) for items in manifest.items.values())
            assert total == 3


class TestRunListIntegration:
    """Integration test calling _run_list through CLI-like path."""

    def test_cli_list_output(self, tmp_path: Path, capsys, monkeypatch) -> None:
        src = _make_source(tmp_path)
        tc = _make_claude_target(tmp_path, "my-target")
        config = _make_config(src, {tc.id: tc})
        deploy(config)

        # Patch load_config to return our config
        monkeypatch.setattr("promptdeploy.cli.load_config", lambda *a, **kw: config)

        import argparse
        from promptdeploy.cli import _run_list

        args = argparse.Namespace(target=None, target_root=None)
        _run_list(args)

        captured = capsys.readouterr()
        assert "my-target:" in captured.out
        assert "Agents:" in captured.out
        assert "helper" in captured.out
        assert "Commands:" in captured.out
        assert "fix" in captured.out
        assert "Skills:" in captured.out
        assert "my-skill" in captured.out

    def test_cli_list_shows_hooks(self, tmp_path: Path, capsys, monkeypatch) -> None:
        """Hooks deployed to target appear in the list output."""
        src = tmp_path / "source"
        src.mkdir()
        hooks_dir = src / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / "my-hook.yaml").write_bytes(
            b"name: my-hook\nhooks:\n  Stop:\n    - matcher: ''\n      hooks:\n        - command: echo\n          type: command\n"
        )
        tc = _make_claude_target(tmp_path, "hook-target")
        config = _make_config(src, {tc.id: tc})
        deploy(config)

        monkeypatch.setattr("promptdeploy.cli.load_config", lambda *a, **kw: config)

        import argparse
        from promptdeploy.cli import _run_list

        args = argparse.Namespace(target=None, target_root=None)
        _run_list(args)

        captured = capsys.readouterr()
        assert "Hooks:" in captured.out
        assert "my-hook" in captured.out

    def test_cli_list_not_installed(self, tmp_path: Path, capsys, monkeypatch) -> None:
        src = _make_source(tmp_path)
        tc = TargetConfig(id="ghost", type="claude", path=tmp_path / "nope")
        config = _make_config(src, {tc.id: tc})

        monkeypatch.setattr("promptdeploy.cli.load_config", lambda *a, **kw: config)

        import argparse
        from promptdeploy.cli import _run_list

        args = argparse.Namespace(target=None, target_root=None)
        _run_list(args)

        captured = capsys.readouterr()
        assert "not installed" in captured.out

    def test_cli_list_empty_manifest(self, tmp_path: Path, capsys, monkeypatch) -> None:
        tc = _make_claude_target(tmp_path, "empty-target")
        config = _make_config(tmp_path / "source", {tc.id: tc})

        monkeypatch.setattr("promptdeploy.cli.load_config", lambda *a, **kw: config)

        import argparse
        from promptdeploy.cli import _run_list

        args = argparse.Namespace(target=None, target_root=None)
        _run_list(args)

        captured = capsys.readouterr()
        assert "no managed items" in captured.out
