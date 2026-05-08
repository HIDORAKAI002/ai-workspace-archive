import type { MonitorCheckRow } from "./types";

export const MONITOR_CHECK_STALE_TIMEOUT_MS = 60 * 60 * 1000;
export const MONITOR_CHECK_STALE_ERROR =
  "Monitor check exceeded the 1 hour running timeout.";

export function isMonitorCheckStale(
  check: Pick<MonitorCheckRow, "started_at" | "updated_at" | "created_at">,
  now: Date = new Date(),
): boolean {
  const startedAt = check.started_at ?? check.updated_at ?? check.created_at;
  const startedAtMs = Date.parse(startedAt);
  if (!Number.isFinite(startedAtMs)) return false;
  return now.getTime() - startedAtMs >= MONITOR_CHECK_STALE_TIMEOUT_MS;
}
