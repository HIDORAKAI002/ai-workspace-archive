"""Build performance benchmark: measures timing of graph operations."""

from __future__ import annotations

import logging
import time
from pathlib import Path

logger = logging.getLogger(__name__)


def run(repo_path: Path, store, config: dict) -> list[dict]:
    """Run build performance benchmark."""
    stats = store.get_stats()

    # Time flow detection
    try:
        from code_review_graph.flows import store_flows, trace_flows
        t0 = time.perf_counter()
        flows = trace_flows(store)
        store_flows(store, flows)
        flow_time = time.perf_counter() - t0
    except Exception as exc:
        logger.warning("Flow detection failed: %s", exc)
        flow_time = 0.0

    # Time community detection
    try:
        from code_review_graph.communities import detect_communities, store_communities
        t0 = time.perf_counter()
        comms = detect_communities(store)
        store_communities(store, comms)
        community_time = time.perf_counter() - t0
    except Exception as exc:
        logger.warning("Community detection failed: %s", exc)
        community_time = 0.0

    # Time search (average of queries)
    search_times: list[float] = []
    for sq in config.get("search_queries", [])[:10]:
        t0 = time.perf_counter()
        store.search_nodes(sq["query"], limit=20)
        search_times.append(time.perf_counter() - t0)

    avg_search_ms = round(
        sum(search_times) / max(len(search_times), 1) * 1000, 1
    )

    return [{
        "repo": config["name"],
        "file_count": stats.files_count,
        "node_count": stats.total_nodes,
        "edge_count": stats.total_edges,
        "flow_detection_seconds": round(flow_time, 3),
        "community_detection_seconds": round(community_time, 3),
        "search_avg_ms": avg_search_ms,
        "nodes_per_second": round(
            stats.total_nodes / max(flow_time, 0.001)
        ),
    }]
