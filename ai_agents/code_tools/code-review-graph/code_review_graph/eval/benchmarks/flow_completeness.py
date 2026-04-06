"""Flow completeness benchmark: evaluates entry point detection and flow tracing."""

from __future__ import annotations

import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def run(repo_path: Path, store, config: dict) -> list[dict]:
    """Run flow completeness benchmark."""
    from code_review_graph.flows import store_flows, trace_flows

    flows = trace_flows(store)
    count = store_flows(store, flows)

    # Get detected entry point names
    detected_entries = set()
    for flow in flows:
        detected_entries.add(flow.get("entry_point") or flow.get("name", ""))

    known = set(config.get("entry_points", []))
    found = sum(1 for ep in known if any(ep in d for d in detected_entries))

    depths = [f.get("depth", 0) for f in flows]

    return [{
        "repo": config["name"],
        "known_entry_points": len(known),
        "detected_entry_points": found,
        "recall": round(found / max(len(known), 1), 3),
        "detected_flows": count,
        "avg_flow_depth": round(sum(depths) / max(len(depths), 1), 1),
        "max_flow_depth": max(depths, default=0),
    }]
