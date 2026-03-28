#!/bin/bash

# Read JSON input from stdin
JSON=$(cat)

# Debug: save JSON to file for inspection (optional)
# echo "$JSON" > /tmp/statusline-debug.json 2>/dev/null || true

# Extract project directory and get basename
PROJECT_DIR=$(echo "$JSON" | jq -r '.workspace.project_dir // .cwd // "unknown"')
SHORT_PROJECT=$(basename "$PROJECT_DIR")

# Get git branch and dirty status if in a git repo
BRANCH="main"
DIRTY=""
if git -C "$PROJECT_DIR" rev-parse --git-dir > /dev/null 2>&1; then
    BRANCH=$(git -C "$PROJECT_DIR" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
    if ! git -C "$PROJECT_DIR" diff-index --quiet HEAD -- 2>/dev/null; then
        DIRTY="*"
    fi
fi

# Extract model name
MODEL=$(echo "$JSON" | jq -r '.model.display_name // "Opus"')

# Extract context window info
USED_PCT=$(echo "$JSON" | jq -r '.context_window.used_percentage // 0')
REMAINING_PCT=$(echo "$JSON" | jq -r '.context_window.remaining_percentage // 100')

# Generate context bar (11 blocks total) - show remaining percentage
FILLED=$(awk "BEGIN {printf \"%.0f\", ($REMAINING_PCT / 100) * 11}")
EMPTY=$((11 - FILLED))
CONTEXT_BAR=""
for ((i=0; i<FILLED; i++)); do CONTEXT_BAR="${CONTEXT_BAR}█"; done
for ((i=0; i<EMPTY; i++)); do CONTEXT_BAR="${CONTEXT_BAR}░"; done

# Context display (show remaining percentage like in example: 69%)
CONTEXT_DISPLAY="$CONTEXT_BAR ${REMAINING_PCT}%"

# TODO: Track compactions separately if needed
# COMPACTIONS=0
# if [ "$COMPACTIONS" -gt 0 ]; then
#     CONTEXT_DISPLAY="$CONTEXT_DISPLAY ⟳$COMPACTIONS"
# fi

# Extract token totals
INPUT_TOKENS=$(echo "$JSON" | jq -r '.context_window.total_input_tokens // 0')
OUTPUT_TOKENS=$(echo "$JSON" | jq -r '.context_window.total_output_tokens // 0')

# Format token totals
format_tokens() {
    local tokens=$1
    if [ "$tokens" -ge 1000000 ]; then
        awk "BEGIN {printf \"%.1fM\", $tokens / 1000000}"
    elif [ "$tokens" -ge 1000 ]; then
        awk "BEGIN {printf \"%.0fk\", $tokens / 1000}"
    else
        echo "$tokens"
    fi
}

INPUT_FMT=$(format_tokens $INPUT_TOKENS)
OUTPUT_FMT=$(format_tokens $OUTPUT_TOKENS)

# Calculate output ratio (output / input)
OUTPUT_RATIO=0
if [ "$INPUT_TOKENS" -gt 0 ]; then
    OUTPUT_RATIO=$(awk "BEGIN {printf \"%.1f\", ($OUTPUT_TOKENS / $INPUT_TOKENS) * 100}")
fi

TOKENS_DISPLAY="↓$INPUT_FMT ↑$OUTPUT_FMT ($OUTPUT_RATIO%)"

# Lines changed
LINES_ADDED=$(echo "$JSON" | jq -r '.cost.total_lines_added // 0')
LINES_REMOVED=$(echo "$JSON" | jq -r '.cost.total_lines_removed // 0')
LINES_DISPLAY="+$LINES_ADDED/-$LINES_REMOVED"

# Calculate cache hit rate from current usage
CACHE_READ=$(echo "$JSON" | jq -r '.context_window.current_usage.cache_read_input_tokens // 0')
TOTAL_INPUT=$(echo "$JSON" | jq -r '.context_window.current_usage.input_tokens // 1')
CACHE_CREATION=$(echo "$JSON" | jq -r '.context_window.current_usage.cache_creation_input_tokens // 0')
TOTAL_CACHE_INPUT=$((CACHE_READ + TOTAL_INPUT + CACHE_CREATION))

CACHE_HIT_RATE=0
if [ "$TOTAL_CACHE_INPUT" -gt 0 ]; then
    CACHE_HIT_RATE=$(awk "BEGIN {printf \"%.0f\", ($CACHE_READ / $TOTAL_CACHE_INPUT) * 100}")
fi

CACHE_DISPLAY="cache:${CACHE_HIT_RATE}%"

# Calculate throughput (output tokens / API time in seconds)
API_TIME_MS=$(echo "$JSON" | jq -r '.cost.total_api_duration_ms // 0')
API_TIME_SEC=$(awk "BEGIN {printf \"%.0f\", $API_TIME_MS / 1000}")

THROUGHPUT=0
if [ "$API_TIME_SEC" -gt 0 ] && [ "$OUTPUT_TOKENS" -gt 0 ]; then
    THROUGHPUT=$(awk "BEGIN {printf \"%.1f\", $OUTPUT_TOKENS / $API_TIME_SEC}")
fi

THROUGHPUT_DISPLAY="${THROUGHPUT} tok/s"

# Format API time
format_time() {
    local seconds=$1
    local hours=$((seconds / 3600))
    local minutes=$(((seconds % 3600) / 60))
    local secs=$((seconds % 60))

    if [ "$hours" -gt 0 ]; then
        printf "%dh%02dm" $hours $minutes
    elif [ "$minutes" -gt 0 ]; then
        printf "%dm%02ds" $minutes $secs
    else
        printf "%ds" $secs
    fi
}

API_TIME_DISPLAY=$(format_time $API_TIME_SEC)

# Extract cost
COST=$(echo "$JSON" | jq -r '.cost.total_cost_usd // 0')
COST_FORMATTED=$(awk "BEGIN {printf \"%.2f\", $COST}")

# Calculate hourly rate
HOURLY_RATE=0
if [ "$API_TIME_SEC" -gt 0 ]; then
    HOURLY_RATE=$(awk "BEGIN {printf \"%.0f\", ($COST / $API_TIME_SEC) * 3600}")
fi

COST_DISPLAY="\$${COST_FORMATTED} (\$${HOURLY_RATE}/hr)"

# Calculate efficiency grade
calculate_grade() {
    local cache=$1
    local output_ratio=$2

    # Simple grading: A+ if cache >= 95 and output >= 60
    if [ "$(awk "BEGIN {print ($cache >= 95 && $output_ratio >= 60)}")" = "1" ]; then
        echo "A+"
    elif [ "$(awk "BEGIN {print ($cache >= 90 && $output_ratio >= 50)}")" = "1" ]; then
        echo "A"
    elif [ "$(awk "BEGIN {print ($cache >= 80 && $output_ratio >= 40)}")" = "1" ]; then
        echo "B+"
    elif [ "$(awk "BEGIN {print ($cache >= 70 || $output_ratio >= 30)}")" = "1" ]; then
        echo "B"
    else
        echo "C"
    fi
}

GRADE=$(calculate_grade $CACHE_HIT_RATE $OUTPUT_RATIO)

# Output the status line
echo "$SHORT_PROJECT $BRANCH$DIRTY | $MODEL | $CONTEXT_DISPLAY | $TOKENS_DISPLAY | $LINES_DISPLAY | $CACHE_DISPLAY | $THROUGHPUT_DISPLAY | $API_TIME_DISPLAY | $COST_DISPLAY | $GRADE"
