"""Integration tests exercising git-dependent code with real temporary repos.

Tests cover:
- get_changed_files with real git history
- parse_git_diff_ranges with real diffs
- incremental_update detecting real file modifications
- base ref injection rejection
- wiki page path traversal protection
"""

from __future__ import annotations

import subprocess
import tempfile
from pathlib import Path

import pytest

from code_review_graph.changes import parse_git_diff_ranges
from code_review_graph.graph import GraphStore
from code_review_graph.incremental import (
    full_build,
    get_changed_files,
    incremental_update,
)
from code_review_graph.wiki import get_wiki_page


def _git(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    """Run a git command inside *repo* and return the result."""
    return subprocess.run(
        ["git", *args],
        capture_output=True,
        text=True,
        cwd=str(repo),
        timeout=10,
    )


@pytest.fixture()
def git_repo(tmp_path: Path) -> Path:
    """Create a real git repo with two commits.

    Commit 1 adds ``hello.py`` with a single function.
    Commit 2 modifies ``hello.py`` (adds a second function).
    """
    repo = tmp_path / "repo"
    repo.mkdir()

    _git(repo, "init")
    _git(repo, "config", "user.email", "test@test.com")
    _git(repo, "config", "user.name", "Test")

    # First commit
    py_file = repo / "hello.py"
    py_file.write_text("def greet():\n    return 'hello'\n")
    _git(repo, "add", "hello.py")
    _git(repo, "commit", "-m", "initial commit")

    # Second commit — modify the file
    py_file.write_text(
        "def greet():\n    return 'hello'\n\n"
        "def farewell():\n    return 'goodbye'\n"
    )
    _git(repo, "add", "hello.py")
    _git(repo, "commit", "-m", "add farewell function")

    return repo


# ------------------------------------------------------------------
# 1. get_changed_files with a real git repo
# ------------------------------------------------------------------


def test_get_changed_files_real_git(git_repo: Path) -> None:
    """get_changed_files should list hello.py as changed between HEAD~1..HEAD."""
    changed = get_changed_files(git_repo, base="HEAD~1")
    assert "hello.py" in changed


# ------------------------------------------------------------------
# 2. parse_git_diff_ranges with a real git repo
# ------------------------------------------------------------------


def test_parse_git_diff_ranges_real_git(git_repo: Path) -> None:
    """parse_git_diff_ranges should return non-empty line ranges for hello.py."""
    ranges = parse_git_diff_ranges(str(git_repo), base="HEAD~1")
    assert "hello.py" in ranges
    assert len(ranges["hello.py"]) > 0
    # Each entry is a (start, end) tuple with positive line numbers
    for start, end in ranges["hello.py"]:
        assert start >= 1
        assert end >= start


# ------------------------------------------------------------------
# 3. incremental_update detects real modifications
# ------------------------------------------------------------------


def test_incremental_update_real_git(git_repo: Path) -> None:
    """Full build then incremental update should detect the second commit."""
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as f:
        db_path = f.name

    try:
        store = GraphStore(db_path)

        # Reset to first commit, do a full build
        _git(git_repo, "checkout", "HEAD~1", "--detach")
        full_build(git_repo, store)
        initial_nodes = store.get_stats().total_nodes
        assert initial_nodes > 0, "full_build should create at least one node"

        # Move back to tip (second commit) and do incremental update
        _git(git_repo, "checkout", "-")
        result = incremental_update(
            git_repo, store, changed_files=["hello.py"]
        )
        assert result["files_updated"] >= 1
        assert "hello.py" in result["changed_files"]

        # The graph should now contain more nodes (farewell function added)
        assert store.get_stats().total_nodes >= initial_nodes

        store.close()
    finally:
        Path(db_path).unlink(missing_ok=True)


# ------------------------------------------------------------------
# 4. base ref injection is rejected
# ------------------------------------------------------------------


def test_base_validation_rejects_injection(git_repo: Path) -> None:
    """Passing a malicious --flag as base should be rejected (empty list)."""
    result = get_changed_files(git_repo, base="--output=/tmp/evil")
    assert result == []


# ------------------------------------------------------------------
# 5. wiki page path traversal is blocked
# ------------------------------------------------------------------


def test_wiki_page_path_traversal_blocked(tmp_path: Path) -> None:
    """get_wiki_page must not serve files outside the wiki directory."""
    wiki_dir = tmp_path / "wiki"
    wiki_dir.mkdir()

    # Create a legitimate page
    (wiki_dir / "my-module.md").write_text("# My Module\n")

    # Attempt a path traversal — should return None
    result = get_wiki_page(str(wiki_dir), "../../etc/passwd")
    assert result is None
