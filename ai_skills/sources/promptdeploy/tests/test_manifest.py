"""Tests for manifest tracking system."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from promptdeploy.manifest import (
    MANIFEST_FILENAME,
    MANIFEST_VERSION,
    Manifest,
    ManifestItem,
    compute_directory_hash,
    compute_file_hash,
    has_changed,
    load_manifest,
    save_manifest,
)


class TestComputeFileHash:
    def test_consistent_for_same_content(self) -> None:
        content = b"hello world"
        assert compute_file_hash(content) == compute_file_hash(content)

    def test_differs_for_different_content(self) -> None:
        assert compute_file_hash(b"hello") != compute_file_hash(b"world")

    def test_sha256_prefix(self) -> None:
        result = compute_file_hash(b"test")
        assert result.startswith("sha256:")

    def test_empty_content(self) -> None:
        result = compute_file_hash(b"")
        assert result.startswith("sha256:")
        assert len(result) > len("sha256:")


class TestComputeDirectoryHash:
    def test_deterministic(self, tmp_path: Path) -> None:
        (tmp_path / "a.txt").write_bytes(b"aaa")
        (tmp_path / "b.txt").write_bytes(b"bbb")
        assert compute_directory_hash(tmp_path) == compute_directory_hash(tmp_path)

    def test_order_independent_of_creation(self, tmp_path: Path) -> None:
        """Hash is based on sorted paths, not creation order."""
        d1 = tmp_path / "d1"
        d1.mkdir()
        (d1 / "b.txt").write_bytes(b"bbb")
        (d1 / "a.txt").write_bytes(b"aaa")

        d2 = tmp_path / "d2"
        d2.mkdir()
        (d2 / "a.txt").write_bytes(b"aaa")
        (d2 / "b.txt").write_bytes(b"bbb")

        assert compute_directory_hash(d1) == compute_directory_hash(d2)

    def test_differs_with_different_content(self, tmp_path: Path) -> None:
        d1 = tmp_path / "d1"
        d1.mkdir()
        (d1 / "a.txt").write_bytes(b"aaa")

        d2 = tmp_path / "d2"
        d2.mkdir()
        (d2 / "a.txt").write_bytes(b"zzz")

        assert compute_directory_hash(d1) != compute_directory_hash(d2)

    def test_includes_subdirectories(self, tmp_path: Path) -> None:
        sub = tmp_path / "sub"
        sub.mkdir()
        (sub / "file.txt").write_bytes(b"nested")
        h1 = compute_directory_hash(tmp_path)

        (sub / "file.txt").write_bytes(b"changed")
        h2 = compute_directory_hash(tmp_path)

        assert h1 != h2

    def test_empty_directory(self, tmp_path: Path) -> None:
        result = compute_directory_hash(tmp_path)
        assert result.startswith("sha256:")


class TestLoadManifest:
    def test_nonexistent_returns_empty(self, tmp_path: Path) -> None:
        manifest = load_manifest(tmp_path / "nope.json")
        assert manifest.version == MANIFEST_VERSION
        assert "agents" in manifest.items
        assert "commands" in manifest.items
        assert "skills" in manifest.items
        assert "mcp_servers" in manifest.items
        for entries in manifest.items.values():
            assert entries == {}

    def test_loads_valid_json(self, tmp_path: Path) -> None:
        data = {
            "version": 1,
            "deployed_at": "2025-01-01T00:00:00+00:00",
            "items": {
                "agents": {
                    "rust-pro": {
                        "source_hash": "sha256:abc123",
                        "target_path": "/home/.claude/agents/rust-pro.md",
                    }
                },
                "commands": {},
                "skills": {},
                "mcp_servers": {},
            },
        }
        path = tmp_path / MANIFEST_FILENAME
        path.write_text(json.dumps(data))

        manifest = load_manifest(path)
        assert manifest.version == 1
        assert manifest.deployed_at == "2025-01-01T00:00:00+00:00"
        assert "rust-pro" in manifest.items["agents"]
        item = manifest.items["agents"]["rust-pro"]
        assert item.source_hash == "sha256:abc123"
        assert item.target_path == "/home/.claude/agents/rust-pro.md"
        assert item.config_key is None


class TestSaveManifest:
    def test_creates_parent_directories(self, tmp_path: Path) -> None:
        path = tmp_path / "a" / "b" / "c" / MANIFEST_FILENAME
        manifest = Manifest()
        save_manifest(manifest, path)
        assert path.exists()

    def test_atomic_write_no_temp_file_left(self, tmp_path: Path) -> None:
        path = tmp_path / MANIFEST_FILENAME
        save_manifest(Manifest(), path)
        tmp_files = list(tmp_path.glob("*.tmp"))
        assert tmp_files == []

    def test_writes_valid_json(self, tmp_path: Path) -> None:
        path = tmp_path / MANIFEST_FILENAME
        manifest = Manifest()
        manifest.items["agents"]["test-agent"] = ManifestItem(
            source_hash="sha256:deadbeef",
            target_path="/dest/agent.md",
        )
        save_manifest(manifest, path)

        data = json.loads(path.read_text())
        assert data["version"] == MANIFEST_VERSION
        assert "test-agent" in data["items"]["agents"]
        agent = data["items"]["agents"]["test-agent"]
        assert agent["source_hash"] == "sha256:deadbeef"
        assert agent["target_path"] == "/dest/agent.md"
        # config_key is None, should be omitted
        assert "config_key" not in agent


class TestSaveManifestError:
    def test_cleanup_on_replace_failure(self, tmp_path: Path) -> None:
        """When os.replace fails, temp file is cleaned up and error is raised."""
        from unittest.mock import patch

        path = tmp_path / MANIFEST_FILENAME
        manifest = Manifest()
        manifest.items["agents"]["test"] = ManifestItem(source_hash="sha256:abc")

        with patch("os.replace", side_effect=OSError("mock failure")):
            with pytest.raises(OSError, match="mock failure"):
                save_manifest(manifest, path)

        # Temp file should be cleaned up
        tmp_files = list(tmp_path.glob("*.tmp"))
        assert tmp_files == []
        # Original manifest should not exist
        assert not path.exists()

    def test_cleanup_on_replace_failure_unlink_fails(self, tmp_path: Path) -> None:
        """When both os.replace and os.unlink fail, the original error propagates."""
        import os
        from unittest.mock import patch

        path = tmp_path / MANIFEST_FILENAME
        manifest = Manifest()

        original_unlink = os.unlink

        def failing_unlink(p):
            if str(p).endswith(".tmp"):
                raise OSError("unlink failed too")
            return original_unlink(p)

        with patch("os.replace", side_effect=OSError("replace failed")):
            with patch("os.unlink", side_effect=failing_unlink):
                with pytest.raises(OSError, match="replace failed"):
                    save_manifest(manifest, path)


class TestRoundTrip:
    def test_save_load_preserves_data(self, tmp_path: Path) -> None:
        path = tmp_path / MANIFEST_FILENAME
        original = Manifest(
            version=MANIFEST_VERSION,
            deployed_at="2025-06-15T12:00:00+00:00",
        )
        original.items["agents"]["my-agent"] = ManifestItem(
            source_hash="sha256:aaa",
            target_path="/agents/my-agent.md",
        )
        original.items["skills"]["my-skill"] = ManifestItem(
            source_hash="sha256:bbb",
            config_key="skills.my-skill",
        )
        original.items["mcp_servers"]["server1"] = ManifestItem(
            source_hash="sha256:ccc",
            target_path="/mcp/server1.json",
            config_key="mcp.server1",
        )
        save_manifest(original, path)

        loaded = load_manifest(path)
        assert loaded.version == original.version
        assert loaded.deployed_at == original.deployed_at

        agent = loaded.items["agents"]["my-agent"]
        assert agent.source_hash == "sha256:aaa"
        assert agent.target_path == "/agents/my-agent.md"
        assert agent.config_key is None

        skill = loaded.items["skills"]["my-skill"]
        assert skill.source_hash == "sha256:bbb"
        assert skill.target_path is None
        assert skill.config_key == "skills.my-skill"

        server = loaded.items["mcp_servers"]["server1"]
        assert server.source_hash == "sha256:ccc"
        assert server.target_path == "/mcp/server1.json"
        assert server.config_key == "mcp.server1"


class TestHasChanged:
    def test_new_item(self) -> None:
        manifest = Manifest()
        assert has_changed(manifest, "agents", "new-agent", "sha256:xyz")

    def test_unknown_category(self) -> None:
        manifest = Manifest()
        assert has_changed(manifest, "unknown_cat", "item", "sha256:xyz")

    def test_changed_hash(self) -> None:
        manifest = Manifest()
        manifest.items["agents"]["my-agent"] = ManifestItem(source_hash="sha256:old")
        assert has_changed(manifest, "agents", "my-agent", "sha256:new")

    def test_unchanged(self) -> None:
        manifest = Manifest()
        manifest.items["agents"]["my-agent"] = ManifestItem(source_hash="sha256:same")
        assert not has_changed(manifest, "agents", "my-agent", "sha256:same")
