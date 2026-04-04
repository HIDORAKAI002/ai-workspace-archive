# Hindsight Benchmarks

This directory contains benchmark suites for evaluating Hindsight's memory capabilities.

## Prerequisites

1. Set up your environment variables in `.env` at the project root:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

2. Make sure you have `uv` installed.

## Available Benchmarks

### LoComo

Tests conversational memory with multi-turn dialogues.

```bash
# Run from project root
./scripts/benchmarks/run-locomo.sh

# With options
./scripts/benchmarks/run-locomo.sh --max-conversations 10
./scripts/benchmarks/run-locomo.sh --skip-ingestion  # Reuse existing data
./scripts/benchmarks/run-locomo.sh --use-think       # Use think API
./scripts/benchmarks/run-locomo.sh --conversation conv-26  # Single conversation
```

**Options:**
- `--max-conversations N` - Limit number of conversations
- `--max-questions N` - Limit questions per conversation
- `--skip-ingestion` - Skip data ingestion, use existing
- `--use-think` - Use think API instead of search + LLM
- `--conversation NAME` - Run specific conversation only
- `--api-url URL` - Custom API URL (default: local memory)
- `--only-failed` - Retry only failed questions
- `--only-invalid` - Retry only invalid questions

### LongMemEval

Tests long-term memory across different categories.

```bash
# Run from project root
./scripts/benchmarks/run-longmemeval.sh

# With options
./scripts/benchmarks/run-longmemeval.sh --max-instances 50
./scripts/benchmarks/run-longmemeval.sh --category single-session-user
./scripts/benchmarks/run-longmemeval.sh --parallel 4  # Faster evaluation
```

**Options:**
- `--max-instances N` - Limit total questions
- `--max-instances-per-category N` - Limit per category
- `--skip-ingestion` - Skip data ingestion
- `--category NAME` - Filter by category:
  - `single-session-user`
  - `multi-session`
  - `single-session-preference`
  - `temporal-reasoning`
  - `knowledge-update`
  - `single-session-assistant`
- `--parallel N` - Parallel instances (default: 1)
- `--only-failed` - Retry failed questions
- `--fill` - Resume interrupted runs

### Consolidation Performance

Tests consolidation throughput and identifies bottlenecks.

```bash
./scripts/benchmarks/run-consolidation.sh

# With custom memory count
NUM_MEMORIES=200 ./scripts/benchmarks/run-consolidation.sh
```

### Retain Performance

Measures retain operation performance (throughput and token usage).

**Prerequisites:** API server must be running (`./scripts/dev/start-api.sh`)

```bash
# Basic usage
./scripts/benchmarks/run-retain-perf.sh \
    --document hindsight-dev/benchmarks/perf/test_data/sample_document.txt

# Save results to JSON
./scripts/benchmarks/run-retain-perf.sh \
    --document ./my_document.txt \
    --bank-id my-test-bank \
    --output results/retain_perf.json
```

**Options:**
- `--document PATH` - Document file to retain (required)
- `--bank-id ID` - Bank ID to use (default: perf-test)
- `--context TEXT` - Optional context
- `--api-url URL` - API URL (default: http://localhost:8000)
- `--timeout SECONDS` - Request timeout (default: 300)
- `--output PATH` - Save results to JSON file

See [perf/README.md](perf/README.md) for detailed documentation.

## Visualizer

View benchmark results in a web UI:

```bash
./scripts/benchmarks/start-visualizer.sh
# Opens at http://localhost:8001
```

## Results

Results are saved in JSON format in each benchmark's `results/` directory.
