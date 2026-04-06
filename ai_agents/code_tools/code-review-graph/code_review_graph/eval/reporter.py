"""Markdown report generator for evaluation benchmark results.

Takes a list of benchmark result dicts and produces a formatted markdown table
suitable for inclusion in documentation or CI output.
"""

from __future__ import annotations

import csv
from pathlib import Path
from typing import Any


def generate_markdown_report(results: list[dict[str, Any]]) -> str:
    """Generate a markdown report from benchmark results.

    Each result dict should contain at minimum a ``benchmark`` key identifying
    the benchmark name, plus any metric keys (e.g. ``ratio``,
    ``reduction_percent``, ``mrr``, ``precision``, ``recall``, ``f1``).

    Args:
        results: List of result dicts from benchmark runs.

    Returns:
        A markdown string containing a summary table and per-benchmark details.
    """
    if not results:
        return "# Evaluation Report\n\nNo benchmark results to report.\n"

    lines: list[str] = []
    lines.append("# Evaluation Report")
    lines.append("")

    # Collect all metric keys across results (excluding 'benchmark')
    all_keys: list[str] = []
    seen: set[str] = set()
    for r in results:
        for k in r:
            if k != "benchmark" and k not in seen:
                all_keys.append(k)
                seen.add(k)

    # Summary table
    lines.append("## Summary")
    lines.append("")

    header = "| Benchmark | " + " | ".join(all_keys) + " |"
    separator = "| --- | " + " | ".join("---" for _ in all_keys) + " |"
    lines.append(header)
    lines.append(separator)

    for r in results:
        name = r.get("benchmark", "unknown")
        values = [str(r.get(k, "-")) for k in all_keys]
        lines.append(f"| {name} | " + " | ".join(values) + " |")

    lines.append("")

    # Per-benchmark detail sections
    lines.append("## Details")
    lines.append("")
    for r in results:
        name = r.get("benchmark", "unknown")
        lines.append(f"### {name}")
        lines.append("")
        for k in all_keys:
            v = r.get(k, "-")
            lines.append(f"- **{k}**: {v}")
        lines.append("")

    return "\n".join(lines)


def _read_csvs(results_dir: Path, prefix: str) -> list[dict[str, str]]:
    """Read all CSV files matching a prefix from the results directory."""
    rows: list[dict[str, str]] = []
    for p in sorted(results_dir.glob(f"*_{prefix}_*.csv")):
        with open(p, newline="") as f:
            reader = csv.DictReader(f)
            rows.extend(reader)
    return rows


def _md_table(headers: list[str], rows: list[list[str]]) -> str:
    """Build a markdown table from headers and rows."""
    lines = []
    lines.append("| " + " | ".join(headers) + " |")
    lines.append("| " + " | ".join("---" for _ in headers) + " |")
    for row in rows:
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def generate_full_report(results_dir: str | Path) -> str:
    """Generate a full markdown evaluation report from CSV result files.

    Reads all CSV files in *results_dir*, groups them by benchmark type,
    and produces a markdown report with methodology notes and per-benchmark
    result tables.

    Args:
        results_dir: Directory containing CSV result files.

    Returns:
        Markdown string with the full report.
    """
    results_dir = Path(results_dir)
    lines: list[str] = []
    lines.append("# Evaluation Report")
    lines.append("")
    lines.append("## Methodology")
    lines.append("")
    lines.append("Benchmarks are run against real open-source repositories.")
    lines.append("Token counts use a consistent `len(text) // 4` approximation.")
    lines.append("Impact accuracy uses graph edges as ground truth.")
    lines.append("")

    benchmark_types = [
        "token_efficiency",
        "impact_accuracy",
        "flow_completeness",
        "search_quality",
        "build_performance",
    ]

    for btype in benchmark_types:
        rows = _read_csvs(results_dir, btype)
        if not rows:
            continue

        title = btype.replace("_", " ").title()
        lines.append(f"## {title}")
        lines.append("")

        headers = list(rows[0].keys())
        table_rows = [[r.get(h, "-") for h in headers] for r in rows]
        lines.append(_md_table(headers, table_rows))
        lines.append("")

    if len(lines) <= 6:
        lines.append("No benchmark results found.")
        lines.append("")

    return "\n".join(lines)


def generate_readme_tables(results_dir: str | Path) -> str:
    """Generate concise README-ready tables from CSV result files.

    Produces three tables:
    - Table A: Token Efficiency
    - Table B: Accuracy & Quality
    - Table C: Performance

    Args:
        results_dir: Directory containing CSV result files.

    Returns:
        Markdown string with the three tables.
    """
    results_dir = Path(results_dir)
    lines: list[str] = []

    # Table A: Token Efficiency
    te_rows = _read_csvs(results_dir, "token_efficiency")
    if te_rows:
        lines.append("### Token Efficiency")
        lines.append("")
        headers = [
            "Repo", "Files", "Naive Tokens", "Standard Tokens",
            "Graph Tokens", "Naive/Graph", "Std/Graph",
        ]
        table_rows = []
        for r in te_rows:
            table_rows.append([
                r.get("repo", "-"),
                r.get("changed_files", "-"),
                r.get("naive_tokens", "-"),
                r.get("standard_tokens", "-"),
                r.get("graph_tokens", "-"),
                r.get("naive_to_graph_ratio", "-"),
                r.get("standard_to_graph_ratio", "-"),
            ])
        lines.append(_md_table(headers, table_rows))
        lines.append("")

    # Table B: Accuracy & Quality
    ia_rows = _read_csvs(results_dir, "impact_accuracy")
    fc_rows = _read_csvs(results_dir, "flow_completeness")
    sq_rows = _read_csvs(results_dir, "search_quality")

    if ia_rows or fc_rows or sq_rows:
        lines.append("### Accuracy & Quality")
        lines.append("")
        headers = ["Repo", "Impact F1", "Flow Recall", "Search MRR"]
        # Build a per-repo summary
        repo_data: dict[str, dict[str, object]] = {}
        mrr_accum: dict[str, list[float]] = {}
        for r in ia_rows:
            repo_data.setdefault(r.get("repo", "?"), {})["f1"] = r.get("f1", "-")
        for r in fc_rows:
            repo_data.setdefault(r.get("repo", "?"), {})["recall"] = r.get("recall", "-")
        for r in sq_rows:
            repo = r.get("repo", "?")
            repo_data.setdefault(repo, {})
            try:
                mrr_accum.setdefault(repo, []).append(float(r.get("reciprocal_rank", 0)))
            except (ValueError, TypeError):
                pass

        table_rows = []
        for repo, d in sorted(repo_data.items()):
            mrr_vals = mrr_accum.get(repo, [])
            mrr = (
                str(round(sum(mrr_vals) / len(mrr_vals), 3))
                if mrr_vals
                else "-"
            )
            table_rows.append([
                repo,
                str(d.get("f1", "-")),
                str(d.get("recall", "-")),
                mrr,
            ])
        lines.append(_md_table(headers, table_rows))
        lines.append("")

    # Table C: Performance
    bp_rows = _read_csvs(results_dir, "build_performance")
    if bp_rows:
        lines.append("### Performance")
        lines.append("")
        headers = ["Repo", "Files", "Nodes", "Flow Det. (s)", "Search (ms)"]
        table_rows = []
        for r in bp_rows:
            table_rows.append([
                r.get("repo", "-"),
                r.get("file_count", "-"),
                r.get("node_count", "-"),
                r.get("flow_detection_seconds", "-"),
                r.get("search_avg_ms", "-"),
            ])
        lines.append(_md_table(headers, table_rows))
        lines.append("")

    if not lines:
        return "No benchmark results found.\n"

    return "\n".join(lines)
