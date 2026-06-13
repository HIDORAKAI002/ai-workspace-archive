import "dotenv/config";
import { config } from "../../config";
import "../sentry";
import { setSentryServiceTag } from "../sentry";
import { logger as _logger } from "../../lib/logger";
import { processJobInternal } from "./scrape-worker";
import {
  nuqGetLocalMetrics,
  nuqHealthCheck,
  scrapeQueue as scrapeQueuePg,
} from "./nuq";
import { scrapeQueue, fdbQueueEnabled } from "./nuq-router";
import { getNuqFdbSweeper, nuqFdbHealthCheck } from "./nuq-fdb";
import { jobDurationSeconds } from "../../lib/job-metrics";
import { register } from "prom-client";
import Express from "express";
import { _ } from "ajv";
import { initializeBlocklist } from "../../scraper/WebScraper/utils/blocklist";
import { initializeEngineForcing } from "../../scraper/WebScraper/utils/engine-forcing";

(async () => {
  setSentryServiceTag("nuq-worker");

  try {
    await initializeBlocklist();
    initializeEngineForcing();
  } catch (error) {
    _logger.error("Failed to initialize blocklist and engine forcing", {
      error,
    });
    process.exit(1);
  }

  let isShuttingDown = false;

  const app = Express();

  app.get("/metrics", async (_, res) =>
    res
      .contentType("text/plain")
      .send(nuqGetLocalMetrics() + "\n" + (await register.metrics())),
  );
  app.get("/health", async (_, res) => {
    const pgHealthy = await nuqHealthCheck();
    const fdbHealthy =
      config.NUQ_BACKEND !== "fdb" || (await nuqFdbHealthCheck());
    if (pgHealthy && fdbHealthy) {
      res.status(200).send("OK");
    } else {
      res.status(500).send("Not OK");
    }
  });

  const server = app.listen(config.NUQ_WORKER_PORT, () => {
    _logger.info("NuQ worker metrics server started");
  });

  function shutdown() {
    isShuttingDown = true;
  }

  if (require.main === module) {
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  }

  let noJobTimeout = 1500;

  // the FDB backend has no pg_cron: one worker at a time holds the sweeper
  // lease and runs lease/timeout/group sweeps for everyone
  if (fdbQueueEnabled()) {
    try {
      getNuqFdbSweeper().start();
    } catch (error) {
      if (config.NUQ_BACKEND === "fdb") throw error;
      _logger.warn("Failed to start FDB sweeper, continuing with PG", {
        module: "nuq-worker",
        error,
      });
    }
  }

  while (!isShuttingDown) {
    const job = await scrapeQueue.getJobToProcess();

    if (job === null) {
      _logger.info("No jobs to process", { module: "nuq/metrics" });
      await new Promise(resolve => setTimeout(resolve, noJobTimeout));
      if (!config.NUQ_RABBITMQ_URL) {
        noJobTimeout = Math.min(noJobTimeout * 2, 10000);
      }
      continue;
    }

    noJobTimeout = 500;

    const logger = _logger.child({
      module: "nuq-worker",
      scrapeId: job.id,
      zeroDataRetention: job.data?.zeroDataRetention ?? false,
    });

    logger.info("Acquired job");

    const lockRenewInterval = setInterval(async () => {
      logger.info("Renewing lock");
      if (!(await scrapeQueue.renewLock(job.id, job.lock!, logger))) {
        logger.warn("Failed to renew lock");
        clearInterval(lockRenewInterval);
        return;
      }
      logger.info("Renewed lock");
    }, 15000);

    let processResult:
      | { ok: true; data: Awaited<ReturnType<typeof processJobInternal>> }
      | { ok: false; error: any };

    const endJobTimer = jobDurationSeconds.startTimer({ type: job.data.mode });

    try {
      processResult = { ok: true, data: await processJobInternal(job) };
    } catch (error) {
      processResult = { ok: false, error };
    }

    clearInterval(lockRenewInterval);

    if (processResult.ok) {
      endJobTimer({ status: "success" });
      if (
        !(await scrapeQueue.jobFinish(
          job.id,
          job.lock!,
          processResult.data,
          logger,
        ))
      ) {
        logger.warn("Could not update job status");
      }
    } else {
      endJobTimer({ status: "failed" });
      if (
        !(await scrapeQueue.jobFail(
          job.id,
          job.lock!,
          processResult.error instanceof Error
            ? processResult.error.message
            : typeof processResult.error === "string"
              ? processResult.error
              : JSON.stringify(processResult.error),
          logger,
        ))
      ) {
        logger.warn("Could not update job status");
      }
    }
  }

  _logger.info("NuQ worker shutting down");

  server.close(async () => {
    if (fdbQueueEnabled()) {
      try {
        getNuqFdbSweeper().stop();
      } catch (error) {
        _logger.warn("Failed to stop FDB sweeper", {
          module: "nuq-worker",
          error,
        });
      }
    }
    await scrapeQueuePg.shutdown();
    _logger.info("NuQ worker shut down");
    process.exit(0);
  });
})();
