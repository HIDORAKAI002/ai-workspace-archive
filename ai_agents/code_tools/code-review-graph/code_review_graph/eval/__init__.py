"""Evaluation framework for code-review-graph.

Provides scoring metrics (token efficiency, MRR, precision/recall),
benchmark runners, and report generators for benchmarking graph-based code reviews.
"""

from __future__ import annotations

from .reporter import generate_full_report, generate_markdown_report, generate_readme_tables
from .scorer import compute_mrr, compute_precision_recall, compute_token_efficiency


def __getattr__(name: str):
    """Lazy-import runner functions (require pyyaml)."""
    _runner_names = {"load_all_configs", "load_config", "run_eval", "write_csv"}
    if name in _runner_names:
        from . import runner
        return getattr(runner, name)
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")


__all__ = [
    "compute_mrr",
    "compute_precision_recall",
    "compute_token_efficiency",
    "generate_full_report",
    "generate_markdown_report",
    "generate_readme_tables",
    "load_all_configs",
    "load_config",
    "run_eval",
    "write_csv",
]
