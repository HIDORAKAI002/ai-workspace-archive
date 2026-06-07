#!/usr/bin/env node
/**
 * Strategic Compact Suggester
 *
 * Cross-platform (Windows, macOS, Linux)
 *
 * Runs on PreToolUse or periodically to suggest manual compaction at logical intervals
 *
 * Why manual over auto-compact:
 * - Auto-compact happens at arbitrary points, often mid-task
 * - Strategic compacting preserves context through logical phases
 * - Compact after exploration, before execution
 * - Compact after completing a milestone, before starting next
 */

const fs = require('fs');
const path = require('path');
const {
  getTempDir,
  writeFile,
  readStdinJson,
  log,
  output
} = require('../lib/utils');

const COUNTER_FILE_PREFIX = 'claude-tool-count-';
const DEFAULT_COMPACT_STATE_TTL_DAYS = 14;

function getCounterRetentionDays() {
  const raw = process.env.COMPACT_STATE_TTL_DAYS;
  if (!raw) return DEFAULT_COMPACT_STATE_TTL_DAYS;
  const parsed = Number.parseInt(raw, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_COMPACT_STATE_TTL_DAYS;
}

/**
 * Sweep stale counter files from the temp dir.
 *
 * Each session writes `claude-tool-count-<sessionId>` into the OS temp
 * dir; nothing else removes them. Without a sweep these files accumulate
 * one-per-session forever. This helper removes counters whose mtime is
 * older than `retentionDays`, while preserving the active session's
 * counter (which is about to be re-written by the caller).
 *
 * The helper never throws; per the always-exit-0 hook contract any
 * filesystem failure is swallowed and logged to stderr.
 *
 * @param {string} tempDir - The temp directory to sweep.
 * @param {number} retentionDays - Files older than this many days are removed.
 * @param {string} currentCounterFile - Absolute path of the active session's
 *   counter file; preserved unconditionally.
 */
function cleanupOldCounters(tempDir, retentionDays, currentCounterFile) {
  let entries;
  try {
    entries = fs.readdirSync(tempDir, { withFileTypes: true });
  } catch (err) {
    log(`[StrategicCompact] Skipping counter sweep; readdir failed: ${err.message}`);
    return;
  }

  const cutoffMs = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  const currentBasename = path.basename(currentCounterFile);

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.startsWith(COUNTER_FILE_PREFIX)) continue;
    if (entry.name === currentBasename) continue;

    const fullPath = path.join(tempDir, entry.name);
    let stats;
    try {
      stats = fs.statSync(fullPath);
    } catch {
      continue;
    }

    // Strict "older than" semantics per the docstring: a file whose mtime
    // sits exactly on the cutoff boundary has age == retentionDays, which
    // is not *older than* retentionDays, so preserve it. Use >= so only
    // strictly older files (mtimeMs < cutoffMs) fall through to deletion.
    if (stats.mtimeMs >= cutoffMs) continue;

    try {
      fs.rmSync(fullPath, { force: true });
    } catch (err) {
      log(`[StrategicCompact] Warning: failed to prune stale counter ${fullPath}: ${err.message}`);
    }
  }
}

async function resolveSessionId() {
  // Claude Code passes hook input via stdin JSON; session_id is the
  // canonical field. Fall back to the legacy env var, then 'default'.
  try {
    const input = await readStdinJson({ timeoutMs: 1000 });
    if (input && typeof input.session_id === 'string' && input.session_id) {
      return input.session_id;
    }
  } catch {
    /* fall through to env */
  }
  return process.env.CLAUDE_SESSION_ID || 'default';
}

async function main() {
  // Track tool call count (increment in a temp file)
  // Use a session-specific counter file based on session ID from stdin JSON,
  // legacy env var, or 'default' as fallback.
  const rawSessionId = await resolveSessionId();
  const sessionId = rawSessionId.replace(/[^a-zA-Z0-9_-]/g, '') || 'default';
  const tempDir = getTempDir();
  const counterFile = path.join(tempDir, `${COUNTER_FILE_PREFIX}${sessionId}`);

  // Sweep stale counter files (concern 1 of #2156). Cheap, swallows errors,
  // skips the active session's file. See cleanupOldCounters for details.
  cleanupOldCounters(tempDir, getCounterRetentionDays(), counterFile);

  const rawThreshold = parseInt(process.env.COMPACT_THRESHOLD || '50', 10);
  const threshold = Number.isFinite(rawThreshold) && rawThreshold > 0 && rawThreshold <= 10000
    ? rawThreshold
    : 50;

  let count = 1;

  // Read existing count or start at 1
  // Use fd-based read+write to reduce (but not eliminate) race window
  // between concurrent hook invocations
  try {
    const fd = fs.openSync(counterFile, 'a+');
    try {
      const buf = Buffer.alloc(64);
      const bytesRead = fs.readSync(fd, buf, 0, 64, 0);
      if (bytesRead > 0) {
        const parsed = parseInt(buf.toString('utf8', 0, bytesRead).trim(), 10);
        // Clamp to reasonable range — corrupted files could contain huge values
        // that pass Number.isFinite() (e.g., parseInt('9'.repeat(30)) => 1e+29)
        count = (Number.isFinite(parsed) && parsed > 0 && parsed <= 1000000)
          ? parsed + 1
          : 1;
      }
      // Truncate and write new value
      fs.ftruncateSync(fd, 0);
      fs.writeSync(fd, String(count), 0);
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    // Fallback: just use writeFile if fd operations fail
    writeFile(counterFile, String(count));
  }

  // Suggest compact after threshold tool calls.
  //
  // log() writes to stderr (debug log). Per the Claude Code hooks guide,
  // non-blocking PreToolUse stderr (exit 0) is only written to the debug log;
  // it does not reach the model. To inject a user-facing suggestion without
  // blocking the tool call, emit structured JSON to stdout with
  // hookSpecificOutput.additionalContext — the documented mechanism for
  // PreToolUse hooks to add context to the next model turn.
  if (count === threshold) {
    const msg = `[StrategicCompact] ${threshold} tool calls reached - consider /compact if transitioning phases`;
    log(msg);
    output({ hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: msg } });
  }

  // Suggest at regular intervals after threshold (every 25 calls from threshold)
  if (count > threshold && (count - threshold) % 25 === 0) {
    const msg = `[StrategicCompact] ${count} tool calls - good checkpoint for /compact if context is stale`;
    log(msg);
    output({ hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: msg } });
  }

  process.exit(0);
}

main().catch(err => {
  console.error('[StrategicCompact] Error:', err.message);
  process.exit(0);
});
