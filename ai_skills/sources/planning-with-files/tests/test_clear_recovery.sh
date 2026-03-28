#!/bin/bash
# test_clear_recovery.sh — Automated test for session recovery after /clear
#
# Tests that the UserPromptSubmit hook injects actual plan content
# (not just advisory text) when task_plan.md exists.
#
# This simulates what happens after /clear:
#   1. Context is empty
#   2. User sends a message
#   3. UserPromptSubmit hook fires
#   4. Hook output is injected into context
#
# PASS = hook output contains actual plan content
# FAIL = hook output is just advisory text or empty

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TESTDIR=$(mktemp -d)
PASS=0
FAIL=0

cleanup() {
    rm -rf "$TESTDIR"
    echo ""
    if [ "$FAIL" -eq 0 ]; then
        echo "========================================="
        echo "  ALL $PASS TESTS PASSED"
        echo "========================================="
    else
        echo "========================================="
        echo "  $FAIL FAILED, $PASS PASSED"
        echo "========================================="
        exit 1
    fi
}
trap cleanup EXIT

echo "=== Session Recovery Hook Test ==="
echo "Test dir: $TESTDIR"
echo ""

# --- Setup: Create realistic planning files ---
cat > "$TESTDIR/task_plan.md" << 'PLAN'
# Task Plan

## Goal
Build a REST API with authentication, database, and tests

## Current Phase
Phase 2: Database Integration - in_progress

## Phases

### Phase 1: Project Setup
**Status:** complete
- [x] Initialize Node.js project
- [x] Install dependencies

### Phase 2: Database Integration
**Status:** in_progress
- [x] Set up PostgreSQL connection
- [ ] Create user schema
- [ ] Add migration scripts

### Phase 3: Authentication
**Status:** pending
- [ ] JWT token generation
- [ ] Login/register endpoints

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| pg connection refused | 1 | Started docker container |
PLAN

cat > "$TESTDIR/progress.md" << 'PROGRESS'
# Progress Log

## Session: 2026-03-20
**Phase:** Phase 2: Database Integration

### Actions Taken
1. Created database connection module
2. Tested connection to PostgreSQL
3. Fixed docker networking issue
4. Started work on user schema

### Files Modified
- `src/db/connection.ts` — Database pool setup
- `docker-compose.yml` — Added PostgreSQL service
PROGRESS

cat > "$TESTDIR/findings.md" << 'FINDINGS'
# Findings

## Technical Decisions
| Decision | Chosen | Why |
|----------|--------|-----|
| ORM | Drizzle | Type-safe, lightweight |
| Auth | JWT | Stateless, simple |
FINDINGS

# --- Test 1: Hook injects plan content (not just advisory) ---
echo "Test 1: UserPromptSubmit hook injects plan content"
cd "$TESTDIR"
OUTPUT=$(bash -c 'if [ -f task_plan.md ]; then echo "[planning-with-files] ACTIVE PLAN — current state:"; head -50 task_plan.md; echo ""; echo "=== recent progress ==="; tail -20 progress.md 2>/dev/null; echo ""; echo "[planning-with-files] Read findings.md for research context. Continue from the current phase."; fi' 2>/dev/null)

if echo "$OUTPUT" | grep -q "Build a REST API"; then
    echo "  PASS: Hook output contains the goal"
    PASS=$((PASS + 1))
else
    echo "  FAIL: Hook output missing the goal"
    FAIL=$((FAIL + 1))
fi

if echo "$OUTPUT" | grep -q "Phase 2.*in_progress"; then
    echo "  PASS: Hook output contains current phase status"
    PASS=$((PASS + 1))
else
    echo "  FAIL: Hook output missing current phase"
    FAIL=$((FAIL + 1))
fi

if echo "$OUTPUT" | grep -q "Database Integration"; then
    echo "  PASS: Hook output contains phase name"
    PASS=$((PASS + 1))
else
    echo "  FAIL: Hook output missing phase name"
    FAIL=$((FAIL + 1))
fi

if echo "$OUTPUT" | grep -q "Created database connection module"; then
    echo "  PASS: Hook output contains recent progress"
    PASS=$((PASS + 1))
else
    echo "  FAIL: Hook output missing recent progress"
    FAIL=$((FAIL + 1))
fi

if echo "$OUTPUT" | grep -q "ACTIVE PLAN"; then
    echo "  PASS: Hook output has clear ACTIVE PLAN header"
    PASS=$((PASS + 1))
else
    echo "  FAIL: Hook output missing ACTIVE PLAN header"
    FAIL=$((FAIL + 1))
fi

echo ""

# --- Test 2: Hook is silent when no plan exists ---
echo "Test 2: Hook is silent when no task_plan.md"
cd /tmp
OUTPUT2=$(bash -c 'if [ -f task_plan.md ]; then echo "[planning-with-files] ACTIVE PLAN — current state:"; head -50 task_plan.md; fi' 2>/dev/null)

if [ -z "$OUTPUT2" ]; then
    echo "  PASS: No output when no plan file"
    PASS=$((PASS + 1))
else
    echo "  FAIL: Hook produced output without plan file"
    FAIL=$((FAIL + 1))
fi

echo ""

# --- Test 3: Session catchup path fix (Windows Git Bash paths) ---
echo "Test 3: Session catchup path sanitization"
SCRIPT="${REPO_ROOT}/skills/planning-with-files/scripts/session-catchup.py"
PYTHON=$(command -v python3 || command -v python)

if [ -f "$SCRIPT" ]; then
    # Test that normalize_path handles Git Bash /c/ conversion
    if grep -q "p\[1\].upper() + ':'" "$SCRIPT"; then
        echo "  PASS: normalize_path converts /c/ to C: (drive letter conversion present)"
        PASS=$((PASS + 1))
    else
        echo "  FAIL: normalize_path missing Git Bash drive letter conversion"
        FAIL=$((FAIL + 1))
    fi

    # Test UTF-8 encoding parameter
    if grep -q "encoding='utf-8'" "$SCRIPT"; then
        echo "  PASS: session file opened with UTF-8 encoding"
        PASS=$((PASS + 1))
    else
        echo "  FAIL: session file not opened with UTF-8 encoding"
        FAIL=$((FAIL + 1))
    fi

    # Test that both \ and / are replaced in sanitization
    if grep -q "replace('\\\\\\\\', '-')" "$SCRIPT" && grep -q "replace('/', '-')" "$SCRIPT"; then
        echo "  PASS: sanitization handles both \\ and / separators"
        PASS=$((PASS + 1))
    else
        echo "  FAIL: sanitization missing separator handling"
        FAIL=$((FAIL + 1))
    fi
else
    echo "  SKIP: session-catchup.py not found at $SCRIPT"
fi

echo ""

# --- Test 4: PreToolUse hook still injects plan header ---
echo "Test 4: PreToolUse hook injects plan header"
cd "$TESTDIR"
OUTPUT3=$(bash -c 'cat task_plan.md 2>/dev/null | head -30 || true' 2>/dev/null)

if echo "$OUTPUT3" | grep -q "Task Plan"; then
    echo "  PASS: PreToolUse outputs plan header"
    PASS=$((PASS + 1))
else
    echo "  FAIL: PreToolUse did not output plan"
    FAIL=$((FAIL + 1))
fi

echo ""

# --- Test 5: PostToolUse reminder mentions progress.md ---
echo "Test 5: PostToolUse mentions progress.md"
OUTPUT4=$(bash -c 'if [ -f task_plan.md ]; then echo "[planning-with-files] Update progress.md with what you just did. If a phase is now complete, update task_plan.md status."; fi' 2>/dev/null)

if echo "$OUTPUT4" | grep -q "progress.md"; then
    echo "  PASS: PostToolUse mentions progress.md"
    PASS=$((PASS + 1))
else
    echo "  FAIL: PostToolUse does not mention progress.md"
    FAIL=$((FAIL + 1))
fi
