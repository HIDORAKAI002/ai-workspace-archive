"""Token efficiency benchmark: compares naive, standard, and graph-based token counts."""

from __future__ import annotations

import json
import logging
import subprocess
from pathlib import Path

logger = logging.getLogger(__name__)


def _count_tokens(text: str) -> int:
    """Approximate token count (1 token ~ 4 chars)."""
    return len(text) // 4


def _get_changed_files(repo_path: Path, sha: str) -> list[str]:
    """Get list of changed files for a commit."""
    result = subprocess.run(
        ["git", "diff", "--name-only", f"{sha}~1", sha],
        cwd=str(repo_path),
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        # Fallback: diff against parent
        result = subprocess.run(
            ["git", "diff", "--name-only", "HEAD~1", "HEAD"],
            cwd=str(repo_path),
            capture_output=True,
            text=True,
        )
    return [f.strip() for f in result.stdout.strip().splitlines() if f.strip()]


def _count_file_tokens(repo_path: Path, files: list[str]) -> int:
    """Count tokens from full file contents (naive approach)."""
    total = 0
    for f in files:
        fp = repo_path / f
        if fp.is_file():
            try:
                total += _count_tokens(fp.read_text(encoding="utf-8", errors="replace"))
            except OSError:
                pass
    return total


def _count_diff_tokens(repo_path: Path, sha: str) -> int:
    """Count tokens from git diff output (standard approach)."""
    result = subprocess.run(
        ["git", "diff", f"{sha}~1", sha],
        cwd=str(repo_path),
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        result = subprocess.run(
            ["git", "diff", "HEAD~1", "HEAD"],
            cwd=str(repo_path),
            capture_output=True,
            text=True,
        )
    return _count_tokens(result.stdout)


def run(repo_path: Path, store, config: dict) -> list[dict]:
    """Run token efficiency benchmark."""
    results = []
    for tc in config.get("test_commits", []):
        changed = _get_changed_files(repo_path, tc["sha"])
        if not changed:
            continue

        naive_tokens = _count_file_tokens(repo_path, changed)
        standard_tokens = _count_diff_tokens(repo_path, tc["sha"])

        # Graph-based: use get_review_context
        try:
            from code_review_graph.tools import get_review_context
            ctx = get_review_context(
                changed_files=changed, repo_root=str(repo_path)
            )
            graph_tokens = _count_tokens(json.dumps(ctx))
        except Exception as exc:
            logger.warning("get_review_context failed: %s", exc)
            graph_tokens = 0

        results.append({
            "repo": config["name"],
            "commit": tc["sha"],
            "description": tc.get("description", ""),
            "changed_files": len(changed),
            "naive_tokens": naive_tokens,
            "standard_tokens": standard_tokens,
            "graph_tokens": graph_tokens,
            "naive_to_graph_ratio": round(
                naive_tokens / max(graph_tokens, 1), 1
            ),
            "standard_to_graph_ratio": round(
                standard_tokens / max(graph_tokens, 1), 1
            ),
        })
    return results
