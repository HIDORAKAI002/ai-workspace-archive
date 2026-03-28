# System Prompt: verifying-cli-change-json-output

- Source: inline

## Summary

Steps to verify CLI changes with JSON output.

# Raw Prompt Text
# Verifying a CLI change

The handle is direct invocation. The evidence is stdout${PATH} code.

## Pattern

${NUM}. Build (if the CLI needs building)
${NUM}. Run with arguments that exercise the changed code
${NUM}. Capture output and exit code
${NUM}. Compare to expected

CLIs are usually the simplest to verify — no lifecycle, no ports.

## Worked example

**Diff:** adds a `--json` flag to the `status` subcommand. New flag
parsing in `cmd${PATH}`, new output branch.

**Claim (commit msg):** "machine-readable status output."

**Inference:** `tool status --json` now exists, emits valid JSON with
the same fields the human output shows. `tool status` without the flag
is unchanged.

**Plan:**
${NUM}. Build
${NUM}. `tool status` → human output, same as before (non-regression)
${NUM}. `tool status --json` → valid JSON, parseable
${NUM}. JSON fields match human output fields

**Execute:**
```bash
go build -o ${PATH} .${PATH}

${PATH} status
# → Status: healthy
# → Uptime: 3h12m
# → Connections: ${NUM}

${PATH} status --json
# → {"status":"healthy","uptime_seconds":${NUM},"connections":${NUM}}

${PATH} status --json | jq -e .status
# → "healthy"
# (jq -e exits nonzero if the path is null${PATH} — cheap validity check)

echo $?
# → ${NUM}
```

**Verdict:** PASS — flag works, JSON is valid, fields line up.

## What FAIL looks like

- `unknown flag: --json` → not wired up, or you're running a stale build
- Output isn't valid JSON (`jq` errors) → serialization bug
- `tool status` (no flag) changed → regression; the diff touched more
  than it should
- JSON has different field names than expected → claim${PATH} mismatch,
  might be fine, note it

## Reading from stdin, destructive commands

If the CLI reads stdin → pipe in test data.
If it writes files / hits a network / deletes things → point it at a
tmp dir / a mock / a dry-run flag. If there's no safe mode and the
diff touches the destructive path, say so and verify what you can
around it.
