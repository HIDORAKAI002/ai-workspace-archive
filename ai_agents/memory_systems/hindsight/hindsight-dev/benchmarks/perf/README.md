# Performance Benchmarks

## System Performance Test (`perf-test`)

Orchestrates independent benchmark suites using mock LLM + pg0 to produce
deterministic, LLM-independent performance baselines.

```bash
uv run perf-test                        # all suites, small scale
uv run perf-test --suite retain         # single suite
uv run perf-test --scale medium         # larger scale
uv run perf-test --output results.json  # save JSON results
```

### Suites

| Suite | What it measures |
|-------|-----------------|
| `retain` | Full retain pipeline with mock LLM: fact extraction callback, embedding generation, DB writes, entity linking |
| `recall` | Pre-populated bank recall: 4-way parallel retrieval (semantic, BM25, graph, temporal), RRF fusion, percentile latency |

### Scale Configurations

| Scale | Retain items | Recall bank size | Recall iterations | Recall concurrency |
|-------|-------------|-----------------|-------------------|-------------------|
| `tiny` | 20 | 20 | 5 | 1 |
| `small` | 200 | 200 | 20 | 4 |
| `medium` | 1,000 | 1,000 | 50 | 8 |
| `large` | 5,000 | 5,000 | 100 | 16 |

### CI

The `perf-test.yml` workflow runs daily and on manual dispatch. Scale is
configurable via workflow input (defaults to `small`). Results are uploaded as
artifacts with 90-day retention.

## Standalone Benchmarks

### `retain_perf.py`

Retain operation benchmark with two modes:

- **In-memory**: Direct `retain_batch_async` call (single file or directory)
- **Async**: Full async workflow with mock LLM, worker poller, and deadlock stress testing

```bash
uv run python hindsight-dev/benchmarks/perf/retain_perf.py \
    --document <file_path> --in-memory
```

### `recall_perf.py`

Large-bank recall load test. Generates synthetic banks with Zipf-distributed
entities, then benchmarks recall latency at scale with per-step breakdown.

```bash
# Generate bank
uv run python hindsight-dev/benchmarks/perf/recall_perf.py generate \
    --bank-id my-bank --scale small

# Benchmark
uv run python hindsight-dev/benchmarks/perf/recall_perf.py benchmark \
    --bank-id my-bank --query "database migration" --iterations 20

# Clean up
uv run python hindsight-dev/benchmarks/perf/recall_perf.py clean \
    --bank-id my-bank
```

Scales: `tiny` (1), `mini` (50), `small` (2K), `medium` (10K), `large` (33K), `very-large` (100K).
