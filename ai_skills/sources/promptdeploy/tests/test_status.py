"""Tests for promptdeploy deployment status."""

import json
from pathlib import Path

import pytest

from promptdeploy.config import Config, TargetConfig
from promptdeploy.manifest import MANIFEST_FILENAME, compute_file_hash
from promptdeploy.status import (
    StatusEntry,
    get_status,
    _TYPE_TO_CATEGORY,
    _CATEGORY_TO_TYPE,
)


@pytest.fixture
def source_root(tmp_path: Path) -> Path:
    """Create a minimal source tree."""
    root = tmp_path / "src"
    agents = root / "agents"
    agents.mkdir(parents=True)
    (agents / "alpha.md").write_bytes(b"---\nname: alpha\n---\nAlpha agent")

    commands = root / "commands"
    commands.mkdir()
    (commands / "deploy.md").write_bytes(b"---\nname: deploy\n---\nDeploy cmd")

    mcp = root / "mcp"
    mcp.mkdir()
    (mcp / "server.yaml").write_bytes(b"name: server\ncommand: npx\nargs:\n  - srv\n")

    return root


@pytest.fixture
def target_path(tmp_path: Path) -> Path:
    return tmp_path / "target"


@pytest.fixture
def config(source_root: Path, target_path: Path) -> Config:
    target_path.mkdir(parents=True, exist_ok=True)
    targets = {
        "local": TargetConfig(id="local", type="claude", path=target_path),
    }
    return Config(source_root=source_root, targets=targets, groups={})


class TestMappings:
    def test_type_to_category(self) -> None:
        assert _TYPE_TO_CATEGORY["agent"] == "agents"
        assert _TYPE_TO_CATEGORY["command"] == "commands"
        assert _TYPE_TO_CATEGORY["skill"] == "skills"
        assert _TYPE_TO_CATEGORY["mcp"] == "mcp_servers"
        assert _TYPE_TO_CATEGORY["hook"] == "hooks"

    def test_category_to_type(self) -> None:
        assert _CATEGORY_TO_TYPE["agents"] == "agent"
        assert _CATEGORY_TO_TYPE["commands"] == "command"
        assert _CATEGORY_TO_TYPE["skills"] == "skill"
        assert _CATEGORY_TO_TYPE["mcp_servers"] == "mcp"
        assert _CATEGORY_TO_TYPE["hooks"] == "hook"


class TestGetStatusNoManifest:
    """All items should be 'new' when no manifest exists."""

    def test_all_new(self, config: Config) -> None:
        entries = get_status(config)
        assert len(entries) == 3
        assert all(e.state == "new" for e in entries)

    def test_entry_fields(self, config: Config) -> None:
        entries = get_status(config)
        names = {e.name for e in entries}
        assert "alpha" in names
        assert "deploy" in names
        assert "server" in names
        for e in entries:
            assert e.target_id == "local"

    def test_types(self, config: Config) -> None:
        entries = get_status(config)
        types = {e.name: e.item_type for e in entries}
        assert types["alpha"] == "agent"
        assert types["deploy"] == "command"
        assert types["server"] == "mcp"


class TestGetStatusWithManifest:
    def _write_manifest(self, target_path: Path, items: dict) -> None:
        manifest_data = {
            "version": 1,
            "deployed_at": "2025-01-01T00:00:00+00:00",
            "items": items,
        }
        (target_path / MANIFEST_FILENAME).write_text(json.dumps(manifest_data))

    def test_current_items(
        self, config: Config, source_root: Path, target_path: Path
    ) -> None:
        # Write manifest with matching hashes
        alpha_hash = compute_file_hash(
            (source_root / "agents" / "alpha.md").read_bytes()
        )
        deploy_hash = compute_file_hash(
            (source_root / "commands" / "deploy.md").read_bytes()
        )
        server_hash = compute_file_hash(
            (source_root / "mcp" / "server.yaml").read_bytes()
        )
        self._write_manifest(
            target_path,
            {
                "agents": {"alpha": {"source_hash": alpha_hash}},
                "commands": {"deploy": {"source_hash": deploy_hash}},
                "mcp_servers": {"server": {"source_hash": server_hash}},
            },
        )

        entries = get_status(config)
        assert all(e.state == "current" for e in entries), [e.state for e in entries]

    def test_changed_items(self, config: Config, target_path: Path) -> None:
        self._write_manifest(
            target_path,
            {
                "agents": {"alpha": {"source_hash": "sha256:old_hash"}},
            },
        )
        entries = get_status(config)
        alpha = [e for e in entries if e.name == "alpha"][0]
        assert alpha.state == "changed"

    def test_pending_removal(self, config: Config, target_path: Path) -> None:
        self._write_manifest(
            target_path,
            {
                "agents": {
                    "alpha": {"source_hash": "sha256:whatever"},
                    "deleted-agent": {"source_hash": "sha256:old"},
                },
            },
        )
        entries = get_status(config)
        removed = [e for e in entries if e.name == "deleted-agent"]
        assert len(removed) == 1
        assert removed[0].state == "pending_removal"
        assert removed[0].item_type == "agent"
        assert removed[0].target_id == "local"


class TestGetStatusTargetFiltering:
    def test_specific_target(self, source_root: Path, tmp_path: Path) -> None:
        t1 = tmp_path / "t1"
        t2 = tmp_path / "t2"
        t1.mkdir()
        t2.mkdir()
        config = Config(
            source_root=source_root,
            targets={
                "t1": TargetConfig(id="t1", type="claude", path=t1),
                "t2": TargetConfig(id="t2", type="claude", path=t2),
            },
            groups={},
        )
        entries = get_status(config, target_ids=["t1"])
        assert all(e.target_id == "t1" for e in entries)
        assert len(entries) == 3

    def test_default_all_targets(self, source_root: Path, tmp_path: Path) -> None:
        t1 = tmp_path / "t1"
        t2 = tmp_path / "t2"
        t1.mkdir()
        t2.mkdir()
        config = Config(
            source_root=source_root,
            targets={
                "t1": TargetConfig(id="t1", type="claude", path=t1),
                "t2": TargetConfig(id="t2", type="claude", path=t2),
            },
            groups={},
        )
        entries = get_status(config)
        target_ids = {e.target_id for e in entries}
        assert target_ids == {"t1", "t2"}
        # 3 items per target
        assert len(entries) == 6


class TestGetStatusWithFilters:
    def test_only_filter_respected(self, tmp_path: Path) -> None:
        root = tmp_path / "src"
        agents = root / "agents"
        agents.mkdir(parents=True)
        (agents / "restricted.md").write_bytes(
            b"---\nname: restricted\nonly:\n  - t1\n---\n"
        )

        t1 = tmp_path / "t1"
        t2 = tmp_path / "t2"
        t1.mkdir()
        t2.mkdir()
        config = Config(
            source_root=root,
            targets={
                "t1": TargetConfig(id="t1", type="claude", path=t1),
                "t2": TargetConfig(id="t2", type="claude", path=t2),
            },
            groups={},
        )
        entries = get_status(config)
        # Should only appear for t1
        assert len(entries) == 1
        assert entries[0].target_id == "t1"
        assert entries[0].name == "restricted"


class TestStatusEntry:
    def test_fields(self) -> None:
        entry = StatusEntry(
            item_type="agent", name="test", target_id="local", state="new"
        )
        assert entry.item_type == "agent"
        assert entry.name == "test"
        assert entry.target_id == "local"
        assert entry.state == "new"


class TestGetStatusSkills:
    def test_skill_status(self, tmp_path: Path) -> None:
        root = tmp_path / "src"
        skill_dir = root / "skills" / "my-skill"
        skill_dir.mkdir(parents=True)
        (skill_dir / "SKILL.md").write_bytes(
            b"---\nname: my-skill\ndescription: test\n---\nBody"
        )

        target = tmp_path / "target"
        target.mkdir()
        config = Config(
            source_root=root,
            targets={"local": TargetConfig(id="local", type="claude", path=target)},
            groups={},
        )
        entries = get_status(config)
        assert len(entries) == 1
        assert entries[0].item_type == "skill"
        assert entries[0].name == "my-skill"
        assert entries[0].state == "new"
