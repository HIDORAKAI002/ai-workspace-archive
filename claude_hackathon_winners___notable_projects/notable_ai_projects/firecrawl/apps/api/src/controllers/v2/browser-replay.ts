import { Response } from "express";
import { logger as _logger } from "../../lib/logger";
import { config } from "../../config";
import { getBrowserSession } from "../../lib/browser-sessions";
import {
  browserServiceRequest,
  browserServiceRequestText,
  BrowserServiceError,
} from "../../lib/scrape-interact/browser-service-client";
import { RequestWithAuth } from "./types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BrowserServiceRecordingPage {
  pageId: string;
  url: string;
  startTimeMs: number;
  endTimeMs: number;
}

interface BrowserServiceRecordingResponse {
  pages: BrowserServiceRecordingPage[];
  pageCount: number;
}

interface BrowserReplayResponse {
  success: boolean;
  pages?: Array<{
    pageId: string;
    /** Path (relative to the API origin) serving this page's HLS playlist. */
    url: string;
    /** First page URL recorded on this tab. */
    pageUrl: string;
    /** Milliseconds from session start, not Unix epoch. */
    startTimeMs: number;
    endTimeMs: number;
  }>;
  pageCount?: number;
  error?: string;
}

const PAGE_ID_RE = /^\d{1,3}$/;

// ---------------------------------------------------------------------------
// Shared session resolution
// ---------------------------------------------------------------------------

async function resolveReplaySession(
  req: RequestWithAuth<{ sessionId: string }, any, any>,
  res: Response,
): Promise<{ browserId: string } | null> {
  if (!config.BROWSER_SERVICE_URL) {
    res.status(503).json({
      success: false,
      error:
        "Browser feature is not configured (BROWSER_SERVICE_URL is missing).",
    });
    return null;
  }

  const session = await getBrowserSession(req.params.sessionId);

  if (!session) {
    res.status(404).json({
      success: false,
      error: "Browser session not found.",
    });
    return null;
  }

  if (session.team_id !== req.auth.team_id) {
    res.status(403).json({
      success: false,
      error: "Forbidden.",
    });
    return null;
  }

  // Note: destroyed sessions are intentionally allowed — replay is most
  // useful after the session has ended.
  return { browserId: session.browser_id };
}

// ---------------------------------------------------------------------------
// Controllers
// ---------------------------------------------------------------------------

/**
 * GET /v2/interact/:sessionId/replay
 *
 * Lists the recorded pages (tabs) of a session. Each page has its own HLS
 * playlist; timestamps are milliseconds from session start on a shared
 * timeline across tabs.
 */
export async function browserReplayController(
  req: RequestWithAuth<{ sessionId: string }, BrowserReplayResponse>,
  res: Response<BrowserReplayResponse>,
) {
  const logger = _logger.child({
    sessionId: req.params.sessionId,
    teamId: req.auth.team_id,
    module: "api/v2",
    method: "browserReplayController",
  });

  const resolved = await resolveReplaySession(req, res);
  if (!resolved) return;

  let recording: BrowserServiceRecordingResponse;
  try {
    recording = await browserServiceRequest<BrowserServiceRecordingResponse>(
      "GET",
      `/browsers/${resolved.browserId}/recording`,
    );
  } catch (err) {
    if (err instanceof BrowserServiceError && err.status === 404) {
      return res.status(404).json({
        success: false,
        error: "Replay not found.",
      });
    }
    logger.error("Failed to fetch recording metadata", { error: err });
    return res.status(502).json({
      success: false,
      error: "Failed to fetch session replay.",
    });
  }

  // The browser service response is only type-asserted (no runtime schema
  // validation), so defend against a well-formed 200 that omits `pages`
  // (e.g. version skew) — turn a would-be TypeError/500 into an empty list.
  const pages = recording.pages ?? [];

  return res.status(200).json({
    success: true,
    pages: pages.map(page => ({
      pageId: page.pageId,
      url: `/v2/interact/${req.params.sessionId}/replay/${page.pageId}`,
      pageUrl: page.url,
      startTimeMs: page.startTimeMs,
      endTimeMs: page.endTimeMs,
    })),
    pageCount: recording.pageCount ?? pages.length,
  });
}

/**
 * GET /v2/interact/:sessionId/replay/:pageId
 *
 * Returns the HLS VOD playlist (.m3u8) for one recorded page. Segment URLs
 * inside the playlist are pre-signed and expire (~6h); re-request the
 * playlist to mint fresh ones. Hand the body to any HLS-capable player.
 */
export async function browserReplayPageController(
  req: RequestWithAuth<{ sessionId: string; pageId: string }, any>,
  res: Response,
) {
  const logger = _logger.child({
    sessionId: req.params.sessionId,
    teamId: req.auth.team_id,
    module: "api/v2",
    method: "browserReplayPageController",
  });

  if (!PAGE_ID_RE.test(req.params.pageId)) {
    return res.status(400).json({
      success: false,
      error: "Invalid pageId.",
    });
  }

  const resolved = await resolveReplaySession(req, res);
  if (!resolved) return;

  try {
    const { body } = await browserServiceRequestText(
      "GET",
      `/browsers/${resolved.browserId}/recording/${req.params.pageId}`,
    );
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(body);
  } catch (err) {
    if (err instanceof BrowserServiceError && err.status === 404) {
      return res.status(404).json({
        success: false,
        error: "Replay not found.",
      });
    }
    logger.error("Failed to fetch recording playlist", { error: err });
    return res.status(502).json({
      success: false,
      error: "Failed to fetch session replay.",
    });
  }
}
