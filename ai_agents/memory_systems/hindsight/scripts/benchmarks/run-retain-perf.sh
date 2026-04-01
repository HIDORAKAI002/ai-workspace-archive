#!/bin/bash
# Run retain performance benchmark

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

# Default values
DOCUMENT="${DOCUMENT:-}"
BANK_ID="${BANK_ID:-perf-test}"
API_URL="${API_URL:-http://localhost:8000}"
TIMEOUT="${TIMEOUT:-300}"
OUTPUT="${OUTPUT:-}"

# Help message
show_help() {
    cat << EOF
Run retain performance benchmark

Usage: $0 --document <path> [options]

Required:
  --document <path>       Path to document file to retain

Options:
  --bank-id <id>          Bank ID to use (default: perf-test)
  --context <text>        Optional context for the retain operation
  --api-url <url>         API base URL (default: http://localhost:8000)
  --timeout <seconds>     Request timeout (default: 300)
  --output <path>         Path to save results JSON (optional)
  --in-memory             Use in-memory MemoryEngine instead of HTTP
  -h, --help              Show this help message

Environment Variables:
  DOCUMENT                Document path (can be used instead of --document)
  BANK_ID                 Bank ID (default: perf-test)
  API_URL                 API URL (default: http://localhost:8000)
  TIMEOUT                 Timeout in seconds (default: 300)
  OUTPUT                  Output path for results JSON

Examples:
  # Basic usage
  $0 --document ./test_data/large_doc.txt

  # With custom bank ID and save results
  $0 --document ./test_data/large_doc.txt \\
     --bank-id my-test-bank \\
     --output results/retain_perf.json

  # Using environment variables
  DOCUMENT=./test_data/large_doc.txt \\
  BANK_ID=my-test-bank \\
  $0
EOF
}

# Parse arguments
CONTEXT=""
IN_MEMORY=""
while [[ $# -gt 0 ]]; do
    case $1 in
        --document)
            DOCUMENT="$2"
            shift 2
            ;;
        --bank-id)
            BANK_ID="$2"
            shift 2
            ;;
        --context)
            CONTEXT="$2"
            shift 2
            ;;
        --api-url)
            API_URL="$2"
            shift 2
            ;;
        --timeout)
            TIMEOUT="$2"
            shift 2
            ;;
        --output)
            OUTPUT="$2"
            shift 2
            ;;
        --in-memory)
            IN_MEMORY="--in-memory"
            shift 1
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Validate required arguments
if [ -z "$DOCUMENT" ]; then
    echo "Error: --document is required"
    echo "Use --help for usage information"
    exit 1
fi

# Build command
CMD="uv run python hindsight-dev/benchmarks/perf/retain_perf.py --document \"$DOCUMENT\" --bank-id \"$BANK_ID\" --api-url \"$API_URL\" --timeout $TIMEOUT"

if [ -n "$CONTEXT" ]; then
    CMD="$CMD --context \"$CONTEXT\""
fi

if [ -n "$OUTPUT" ]; then
    CMD="$CMD --output \"$OUTPUT\""
fi

if [ -n "$IN_MEMORY" ]; then
    CMD="$CMD --in-memory"
fi

# Run benchmark
echo "Running retain performance benchmark..."
echo "Document: $DOCUMENT"
echo "Bank ID: $BANK_ID"
echo "API URL: $API_URL"
echo ""

eval $CMD
