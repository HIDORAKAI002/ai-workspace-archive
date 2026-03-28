"""Tests for the targets package __init__ module."""

from pathlib import Path

import pytest

from promptdeploy.config import TargetConfig
from promptdeploy.targets import create_target
from promptdeploy.targets.base import Target
from promptdeploy.targets.claude import ClaudeTarget
from promptdeploy.targets.droid import DroidTarget
from promptdeploy.targets.opencode import OpenCodeTarget
from promptdeploy.targets.remote import RemoteTarget


class TestCreateTarget:
    def test_creates_claude_target(self, tmp_path: Path) -> None:
        tc = TargetConfig(id="t", type="claude", path=tmp_path)
        target = create_target(tc)
        assert isinstance(target, ClaudeTarget)

    def test_creates_droid_target(self, tmp_path: Path) -> None:
        tc = TargetConfig(id="t", type="droid", path=tmp_path)
        target = create_target(tc)
        assert isinstance(target, DroidTarget)

    def test_creates_opencode_target(self, tmp_path: Path) -> None:
        tc = TargetConfig(id="t", type="opencode", path=tmp_path)
        target = create_target(tc)
        assert isinstance(target, OpenCodeTarget)

    def test_unknown_target_type_raises(self, tmp_path: Path) -> None:
        tc = TargetConfig(id="t", type="unknown_tool", path=tmp_path)
        with pytest.raises(ValueError, match="Unknown target type: unknown_tool"):
            create_target(tc)

    def test_creates_remote_target_when_host_set(self, tmp_path: Path) -> None:
        tc = TargetConfig(
            id="remote-claude",
            type="claude",
            path=Path("/remote/path"),
            host="user@server",
        )
        target = create_target(tc)
        assert isinstance(target, RemoteTarget)
        assert target.id == "remote-claude"
        assert target._host == "user@server"
        assert target._remote_path == Path("/remote/path")
        # Inner target should be a ClaudeTarget operating on staging dir
        assert isinstance(target._inner, ClaudeTarget)
        # Staging path should be a temp dir, not the remote path
        assert target._staging_path != Path("/remote/path")
        assert target._staging_path.exists()
        # Clean up staging dir
        target.cleanup()

    def test_creates_remote_droid_target(self, tmp_path: Path) -> None:
        tc = TargetConfig(
            id="remote-droid",
            type="droid",
            path=Path("/remote/droid"),
            host="deploy@prod",
        )
        target = create_target(tc)
        assert isinstance(target, RemoteTarget)
        assert isinstance(target._inner, DroidTarget)
        target.cleanup()

    def test_creates_remote_opencode_target(self, tmp_path: Path) -> None:
        tc = TargetConfig(
            id="remote-oc",
            type="opencode",
            path=Path("/remote/oc"),
            host="deploy@prod",
        )
        target = create_target(tc)
        assert isinstance(target, RemoteTarget)
        assert isinstance(target._inner, OpenCodeTarget)
        target.cleanup()

    def test_no_remote_without_host(self, tmp_path: Path) -> None:
        tc = TargetConfig(id="t", type="claude", path=tmp_path, host=None)
        target = create_target(tc)
        assert isinstance(target, ClaudeTarget)
        assert not isinstance(target, RemoteTarget)

    def test_base_target_rsync_includes_returns_none(self, tmp_path: Path) -> None:
        tc = TargetConfig(id="t", type="claude", path=tmp_path)
        target = create_target(tc)
        # Call the base class default directly
        assert Target.rsync_includes(target) is None

    def test_base_target_should_skip_returns_false(self, tmp_path: Path) -> None:
        tc = TargetConfig(id="t", type="claude", path=tmp_path)
        target = create_target(tc)
        # Call the base class default directly
        assert Target.should_skip(target, "agent", "x") is False
