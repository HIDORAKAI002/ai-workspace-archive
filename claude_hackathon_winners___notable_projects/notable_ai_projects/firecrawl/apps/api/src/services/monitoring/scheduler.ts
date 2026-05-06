import { randomUUID } from "crypto";
import { logger as _logger } from "../../lib/logger";
import { addMonitorCheckJob } from "./queue";
import {
  advanceMonitorAfterSkippedCheck,
  claimDueMonitors,
  createMonitorCheck,
  dispatchScheduledMonitorCheck,
  updateMonitorCheck,
  updateMonitorScheduleAfterRun,
} from "./store";

const logger = _logger.child({ module: "monitoring-scheduler" });

export async function enqueueMonitorCheck(params: {
  monitorId: string;
  checkId: string;
  teamId: string;
}): Promise<void> {
  await addMonitorCheckJob(params);
}

export async function enqueueDueMonitorChecks(
  params: {
    workerId?: string;
    limit?: number;
    leaseSeconds?: number;
  } = {},
): Promise<number> {
  const workerId = params.workerId ?? `monitor-scheduler-${randomUUID()}`;
  const monitors = await claimDueMonitors({
    workerId,
    limit: params.limit ?? 10,
    leaseSeconds: params.leaseSeconds ?? 60,
  });

  let enqueued = 0;
  for (const monitor of monitors) {
    let check: Awaited<ReturnType<typeof createMonitorCheck>> | null = null;
    let dispatched = false;
    try {
      if (monitor.current_check_id) {
        const skipped = await createMonitorCheck({
          monitor,
          trigger: "scheduled",
          scheduledFor: monitor.next_run_at,
          status: "skipped_overlap",
        });
        const finished = await updateMonitorCheck(skipped.id, {
          status: "skipped_overlap",
          finished_at: new Date().toISOString(),
          error: "Previous monitor check is still running.",
        });
        await advanceMonitorAfterSkippedCheck({ monitor, check: finished });
        continue;
      }

      check = await createMonitorCheck({
        monitor,
        trigger: "scheduled",
        scheduledFor: monitor.next_run_at,
      });
      dispatched = await dispatchScheduledMonitorCheck({
        monitor,
        checkId: check.id,
      });
      if (!dispatched) {
        check = await updateMonitorCheck(check.id, {
          status: "skipped_overlap",
          finished_at: new Date().toISOString(),
          error: "Previous monitor check is still running.",
        });
        await advanceMonitorAfterSkippedCheck({ monitor, check });
        continue;
      }

      await enqueueMonitorCheck({
        monitorId: monitor.id,
        checkId: check.id,
        teamId: monitor.team_id,
      });
      enqueued++;
    } catch (error) {
      if (check) {
        const failed = await updateMonitorCheck(check.id, {
          status: "failed",
          finished_at: new Date().toISOString(),
          error: error instanceof Error ? error.message : String(error),
        }).catch(updateError => {
          logger.error("Failed to mark monitor check enqueue failure", {
            updateError,
            error,
            monitorId: monitor.id,
            checkId: check?.id,
            teamId: monitor.team_id,
          });
          return null;
        });

        if (failed && dispatched) {
          await updateMonitorScheduleAfterRun({
            monitor,
            check: failed,
          }).catch(updateError => {
            logger.error("Failed to clear failed dispatched monitor check", {
              updateError,
              error,
              monitorId: monitor.id,
              checkId: failed.id,
              teamId: monitor.team_id,
            });
          });
        }
      }

      logger.error("Failed to enqueue due monitor check", {
        error,
        monitorId: monitor.id,
        teamId: monitor.team_id,
      });
    }
  }

  return enqueued;
}
