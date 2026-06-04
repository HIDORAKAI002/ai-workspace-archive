import { Response } from "express";
import { logger } from "../../lib/logger";
import {
  getCrawl,
  getCrawlJobs,
  saveCrawl,
  StoredCrawl,
} from "../../lib/crawl-redis";
import * as Sentry from "@sentry/node";
import { configDotenv } from "dotenv";
import { RequestWithAuth, scrapeOptions } from "./types";
import { crawlGroup } from "../../services/worker/nuq";
import { removeConcurrencyLimitedJobs } from "../../lib/concurrency-limit";
configDotenv();

export async function crawlCancelController(
  req: RequestWithAuth<{ jobId: string }>,
  res: Response,
) {
  try {
    const group = await crawlGroup.getGroup(req.params.jobId);
    if (!group) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (group.ownerId !== req.auth.team_id) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (group.status === "completed") {
      return res.status(409).json({ error: "Crawl is already completed" });
    }

    const sc: StoredCrawl = (await getCrawl(req.params.jobId)) ?? {
      team_id: group.ownerId,
      createdAt: Date.now(),
      crawlerOptions: null,
      scrapeOptions: scrapeOptions.parse({}),
      internalOptions: {
        teamId: group.ownerId,
      },
    };

    try {
      sc.cancelled = true;
      await saveCrawl(req.params.jobId, sc);
    } catch (error) {
      logger.error(error);
    }

    const jobIds = await getCrawlJobs(req.params.jobId);
    await removeConcurrencyLimitedJobs(sc.team_id, jobIds);

    res.json({
      status: "cancelled",
    });
  } catch (error) {
    Sentry.captureException(error);
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
}
