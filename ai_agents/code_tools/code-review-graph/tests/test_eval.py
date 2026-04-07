"""Tests for the evaluation framework (scorer, reporter, runner, benchmarks)."""

import csv
import os
import subprocess
import tempfile
from pathlib import Path

import pytest

from code_review_graph.eval.reporter import (
    generate_full_report,
    generate_markdown_report,
    generate_readme_tables,
)

try:
    import yaml as _yaml  # noqa: F401

    from code_review_graph.eval.runner import write_csv
    _HAS_YAML = True
except ImportError:
    _HAS_YAML = False
    write_csv = None  # type: ignore[assignment]
from code_review_graph.eval.scorer import (
    compute_mrr,
    compute_precision_recall,
    compute_token_efficiency,
)

# --- Existing scorer tests ---


def test_token_efficiency():
    result = compute_token_efficiency(10000, 3000)
    assert result["raw_tokens"] == 10000
    assert result["graph_tokens"] == 3000
    assert result["ratio"] == 0.3
    assert result["reduction_percent"] == 70.0


def test_token_efficiency_zero_raw():
    result = compute_token_efficiency(0, 100)
    assert result["ratio"] == 0.0
    assert result["reduction_percent"] == 0.0


def test_mrr_found_at_rank_2():
    result = compute_mrr("b", ["a", "b", "c"])
    assert result == 0.5


def test_mrr_found_at_rank_1():
    result = compute_mrr("a", ["a", "b", "c"])
    assert result == 1.0


def test_mrr_not_found():
    result = compute_mrr("z", ["a", "b", "c"])
    assert result == 0.0


def test_precision_recall():
    predicted = {"a", "b", "c", "d"}
    actual = {"b", "c", "e"}
    result = compute_precision_recall(predicted, actual)
    assert result["precision"] == 0.5
    assert result["recall"] == round(2 / 3, 4)
    expected_f1 = round(2 * 0.5 * (2 / 3) / (0.5 + 2 / 3), 4)
    assert result["f1"] == expected_f1


def test_precision_recall_empty_sets():
    result = compute_precision_recall(set(), set())
    assert result["precision"] == 1.0
    assert result["recall"] == 1.0
    assert result["f1"] == 1.0


def test_precision_recall_no_overlap():
    result = compute_precision_recall({"a"}, {"b"})
    assert result["precision"] == 0.0
    assert result["recall"] == 0.0
    assert result["f1"] == 0.0


def test_generate_markdown_report():
    results = [
        {
            "benchmark": "token_efficiency",
            "ratio": 0.3,
            "reduction_percent": 70.0,
        },
        {
            "benchmark": "search_mrr",
            "ratio": "-",
            "reduction_percent": "-",
        },
    ]
    report = generate_markdown_report(results)
    assert "# Evaluation Report" in report
    assert "## Summary" in report
    assert "token_efficiency" in report
    assert "search_mrr" in report
    assert "70.0" in report
    assert "| Benchmark |" in report


def test_generate_markdown_report_empty():
    report = generate_markdown_report([])
    assert "No benchmark results" in report


# --- New tests ---


@pytest.mark.skipif(not _HAS_YAML, reason="pyyaml not installed")
def test_load_config():
    """Load a temp YAML config and verify structure."""
    import yaml

    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".yaml", delete=False
    ) as f:
        yaml.dump(
            {
                "name": "test-repo",
                "url": "https://example.com/repo.git",
                "commit": "HEAD",
                "language": "python",
                "size_category": "small",
                "test_commits": [{"sha": "abc123", "description": "test"}],
                "entry_points": ["main.py::main"],
                "search_queries": [
                    {"query": "hello", "expected": "main.py::greet"}
                ],
            },
            f,
        )
        tmp_path = f.name

    try:
        import yaml as _yaml

        with open(tmp_path) as fh:
            config = _yaml.safe_load(fh)

        assert config["name"] == "test-repo"
        assert config["language"] == "python"
        assert len(config["test_commits"]) == 1
        assert len(config["entry_points"]) == 1
        assert len(config["search_queries"]) == 1
    finally:
        os.unlink(tmp_path)


@pytest.mark.skipif(not _HAS_YAML, reason="pyyaml not installed")
def test_write_csv():
    """Write results to CSV and read back."""
    with tempfile.TemporaryDirectory() as tmpdir:
        path = Path(tmpdir) / "results" / "test.csv"
        results = [
            {"repo": "foo", "tokens": 100, "ratio": 2.5},
            {"repo": "bar", "tokens": 200, "ratio": 1.5},
        ]
        write_csv(results, path)

        assert path.exists()
        with open(path, newline="") as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        assert len(rows) == 2
        assert rows[0]["repo"] == "foo"
        assert rows[1]["tokens"] == "200"


@pytest.mark.skipif(not _HAS_YAML, reason="pyyaml not installed")
def test_write_csv_empty():
    """Writing empty results should be a no-op."""
    with tempfile.TemporaryDirectory() as tmpdir:
        path = Path(tmpdir) / "empty.csv"
        write_csv([], path)
        assert not path.exists()


def test_generate_readme_tables():
    """Feed sample CSV data and verify table format."""
    with tempfile.TemporaryDirectory() as tmpdir:
        results_dir = Path(tmpdir)

        # Write token efficiency CSV
        te_path = results_dir / "test_token_efficiency_2026-01-01.csv"
        with open(te_path, "w", newline="") as f:
            w = csv.DictWriter(
                f,
                fieldnames=[
                    "repo", "commit", "description", "changed_files",
                    "naive_tokens", "standard_tokens", "graph_tokens",
                    "naive_to_graph_ratio", "standard_to_graph_ratio",
                ],
            )
            w.writeheader()
            w.writerow({
                "repo": "myrepo", "commit": "abc", "description": "test",
                "changed_files": "3", "naive_tokens": "1000",
                "standard_tokens": "500", "graph_tokens": "200",
                "naive_to_graph_ratio": "5.0",
                "standard_to_graph_ratio": "2.5",
            })

        tables = generate_readme_tables(results_dir)
        assert "### Token Efficiency" in tables
        assert "myrepo" in tables
        assert "1000" in tables


def test_generate_full_report():
    """Feed sample CSV data and verify report sections."""
    with tempfile.TemporaryDirectory() as tmpdir:
        results_dir = Path(tmpdir)

        # Write a build_performance CSV
        bp_path = results_dir / "test_build_performance_2026-01-01.csv"
        with open(bp_path, "w", newline="") as f:
            w = csv.DictWriter(
                f,
                fieldnames=[
                    "repo", "file_count", "node_count", "edge_count",
                    "flow_detection_seconds", "community_detection_seconds",
                    "search_avg_ms", "nodes_per_second",
                ],
            )
            w.writeheader()
            w.writerow({
                "repo": "testrepo", "file_count": "10", "node_count": "50",
                "edge_count": "30", "flow_detection_seconds": "0.1",
                "community_detection_seconds": "0.2",
                "search_avg_ms": "5.0", "nodes_per_second": "500",
            })

        report = generate_full_report(results_dir)
        assert "# Evaluation Report" in report
        assert "## Methodology" in report
        assert "## Build Performance" in report
        assert "testrepo" in report


@pytest.mark.skipif(not _HAS_YAML, reason="pyyaml not installed")
def test_runner_with_mock_repo():
    """Create a tiny git repo with 2 Python files, run benchmarks, verify output."""
    with tempfile.TemporaryDirectory() as tmpdir:
        repo_path = Path(tmpdir) / "mock_repo"
        repo_path.mkdir()

        # Init git repo
        subprocess.run(
            ["git", "init"], cwd=str(repo_path), capture_output=True
        )
        subprocess.run(
            ["git", "config", "user.email", "test@test.com"],
            cwd=str(repo_path), capture_output=True,
        )
        subprocess.run(
            ["git", "config", "user.name", "Test"],
            cwd=str(repo_path), capture_output=True,
        )

        # Create two Python files
        (repo_path / "main.py").write_text(
            'from helper import greet\n\ndef main():\n    greet("world")\n',
            encoding="utf-8",
        )
        (repo_path / "helper.py").write_text(
            'def greet(name):\n    print(f"Hello {name}")\n',
            encoding="utf-8",
        )

        subprocess.run(
            ["git", "add", "."], cwd=str(repo_path), capture_output=True
        )
        subprocess.run(
            ["git", "commit", "-m", "initial"],
            cwd=str(repo_path), capture_output=True,
        )

        # Second commit: modify helper.py
        (repo_path / "helper.py").write_text(
            'def greet(name):\n    print(f"Hi {name}!")\n',
            encoding="utf-8",
        )
        subprocess.run(
            ["git", "add", "."], cwd=str(repo_path), capture_output=True
        )
        subprocess.run(
            ["git", "commit", "-m", "update greeting"],
            cwd=str(repo_path), capture_output=True,
        )

        # Build graph
        from code_review_graph.graph import GraphStore
        from code_review_graph.incremental import full_build, get_db_path

        db_path = get_db_path(repo_path)
        store = GraphStore(db_path)
        full_build(repo_path, store)

        config = {
            "name": "mock",
            "language": "python",
            "test_commits": [
                {"sha": "HEAD", "description": "update greeting"},
            ],
            "entry_points": ["main.py::main"],
            "search_queries": [
                {"query": "greet", "expected": "helper.py::greet"},
            ],
        }

        # Run token_efficiency
        from code_review_graph.eval.benchmarks import token_efficiency
        te_results = token_efficiency.run(repo_path, store, config)
        assert len(te_results) >= 1
        assert "naive_tokens" in te_results[0]
        assert "graph_tokens" in te_results[0]

        # Run impact_accuracy
        from code_review_graph.eval.benchmarks import impact_accuracy
        ia_results = impact_accuracy.run(repo_path, store, config)
        assert len(ia_results) >= 1
        assert "precision" in ia_results[0]
        assert "f1" in ia_results[0]

        # Run search_quality
        from code_review_graph.eval.benchmarks import search_quality
        sq_results = search_quality.run(repo_path, store, config)
        assert len(sq_results) == 1
        assert "reciprocal_rank" in sq_results[0]

        # Run build_performance
        from code_review_graph.eval.benchmarks import build_performance
        bp_results = build_performance.run(repo_path, store, config)
        assert len(bp_results) == 1
        assert "node_count" in bp_results[0]
        assert bp_results[0]["node_count"] > 0

        store.close()


# --- Token benchmark tests ---


def test_estimate_tokens_basic():
    """estimate_tokens should return a reasonable approximation."""
    from code_review_graph.eval.token_benchmark import estimate_tokens

    # Simple string: "hello" => JSON '"hello"' (7 chars) => 7 // 4 = 1
    assert estimate_tokens("hello") == 1

    # Dict: {"a": 1} => '{"a": 1}' (8 chars) => 8 // 4 = 2
    assert estimate_tokens({"a": 1}) == 2

    # Longer content should scale proportionally
    long_text = "x" * 400
    tokens = estimate_tokens(long_text)
    # JSON adds 2 quote chars: (400 + 2) // 4 = 100
    assert tokens == 100


def test_estimate_tokens_nested():
    """estimate_tokens handles nested structures."""
    from code_review_graph.eval.token_benchmark import estimate_tokens

    nested = {"nodes": [{"name": "foo"}, {"name": "bar"}], "count": 2}
    tokens = estimate_tokens(nested)
    assert tokens > 0
    assert isinstance(tokens, int)


def test_estimate_tokens_non_serializable():
    """estimate_tokens uses default=str for non-serializable objects."""
    from pathlib import Path

    from code_review_graph.eval.token_benchmark import estimate_tokens

    # Path objects are not JSON-serializable but default=str handles them
    tokens = estimate_tokens({"path": Path("/tmp/test")})
    assert tokens > 0


def test_benchmark_review_workflow():
    """benchmark_review_workflow completes and returns expected structure."""
    from code_review_graph.eval.token_benchmark import benchmark_review_workflow

    with tempfile.TemporaryDirectory() as tmpdir:
        repo_path = Path(tmpdir) / "bench_repo"
        repo_path.mkdir()

        # Init git repo with two commits
        subprocess.run(
            ["git", "init"], cwd=str(repo_path), capture_output=True,
        )
        subprocess.run(
            ["git", "config", "user.email", "test@test.com"],
            cwd=str(repo_path), capture_output=True,
        )
        subprocess.run(
            ["git", "config", "user.name", "Test"],
            cwd=str(repo_path), capture_output=True,
        )

        (repo_path / "main.py").write_text(
            'from helper import greet\n\ndef main():\n    greet("world")\n',
            encoding="utf-8",
        )
        (repo_path / "helper.py").write_text(
            'def greet(name):\n    print(f"Hello {name}")\n',
            encoding="utf-8",
        )

        subprocess.run(
            ["git", "add", "."], cwd=str(repo_path), capture_output=True,
        )
        subprocess.run(
            ["git", "commit", "-m", "initial"],
            cwd=str(repo_path), capture_output=True,
        )

        # Second commit
        (repo_path / "helper.py").write_text(
            'def greet(name):\n    print(f"Hi {name}!")\n',
            encoding="utf-8",
        )
        subprocess.run(
            ["git", "add", "."], cwd=str(repo_path), capture_output=True,
        )
        subprocess.run(
            ["git", "commit", "-m", "update greeting"],
            cwd=str(repo_path), capture_output=True,
        )

        # Build graph
        from code_review_graph.graph import GraphStore
        from code_review_graph.incremental import full_build, get_db_path

        db_path = get_db_path(repo_path)
        store = GraphStore(db_path)
        full_build(repo_path, store)
        store.close()

        # Run the review benchmark
        result = benchmark_review_workflow(
            repo_root=str(repo_path), base="HEAD~1",
        )

        assert result["workflow"] == "review"
        assert result["total_tokens"] > 0
        assert result["tool_calls"] == 2
        assert len(result["calls"]) == 2
        assert result["calls"][0]["tool"] == "get_minimal_context"
        assert result["calls"][1]["tool"] == "detect_changes_minimal"
        for call in result["calls"]:
            assert call["tokens"] >= 0


def test_run_all_benchmarks():
    """run_all_benchmarks returns results for all workflows."""
    from code_review_graph.eval.token_benchmark import run_all_benchmarks

    with tempfile.TemporaryDirectory() as tmpdir:
        repo_path = Path(tmpdir) / "all_bench_repo"
        repo_path.mkdir()

        subprocess.run(
            ["git", "init"], cwd=str(repo_path), capture_output=True,
        )
        subprocess.run(
            ["git", "config", "user.email", "test@test.com"],
            cwd=str(repo_path), capture_output=True,
        )
        subprocess.run(
            ["git", "config", "user.name", "Test"],
            cwd=str(repo_path), capture_output=True,
        )

        (repo_path / "app.py").write_text(
            'def main():\n    print("hello")\n',
            encoding="utf-8",
        )

        subprocess.run(
            ["git", "add", "."], cwd=str(repo_path), capture_output=True,
        )
        subprocess.run(
            ["git", "commit", "-m", "initial"],
            cwd=str(repo_path), capture_output=True,
        )

        (repo_path / "app.py").write_text(
            'def main():\n    print("hi")\n',
            encoding="utf-8",
        )
        subprocess.run(
            ["git", "add", "."], cwd=str(repo_path), capture_output=True,
        )
        subprocess.run(
            ["git", "commit", "-m", "update"],
            cwd=str(repo_path), capture_output=True,
        )

        from code_review_graph.graph import GraphStore
        from code_review_graph.incremental import full_build, get_db_path

        db_path = get_db_path(repo_path)
        store = GraphStore(db_path)
        full_build(repo_path, store)
        store.close()

        results = run_all_benchmarks(repo_root=str(repo_path), base="HEAD~1")

        # Should have one result per workflow (5 total)
        assert len(results) == 5

        workflow_names = {r["workflow"] for r in results}
        assert workflow_names == {
            "review", "architecture", "debug", "onboard", "pre_merge",
        }

        # Each successful result should have total_tokens
        for r in results:
            if "error" not in r:
                assert r["total_tokens"] >= 0
                assert "calls" in r
