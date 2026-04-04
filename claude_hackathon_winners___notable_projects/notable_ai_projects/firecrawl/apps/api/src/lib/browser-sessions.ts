import { deleteKey, getValue, setValue } from "../services/redis";
import { isPostgrestNoRowsError, supabase_service } from "../services/supabase";
import { logger as _logger } from "./logger";

const logger = _logger.child({ module: "browser-sessions" });

function activeBrowserCountKey(teamId: string): string {
  return `browser_sessions:active_count:${teamId}`;
}

type BrowserSessionStatus = "active" | "destroyed" | "error";

interface BrowserSessionRow {
  id: string;
  team_id: string;
  scrape_id?: string | null; // linked scrape job id for /scrape/:jobId/interact sessions
  browser_id: string; // browser service sessionId
  workspace_id: string; // unused (legacy), stored as ""
  context_id: string; // unused (legacy), stored as ""
  cdp_url: string; // full CDP WebSocket URL from browser service
  cdp_path: string; // repurposed: stores the view WebSocket URL
  cdp_interactive_path: string; // repurposed: stores the interactive view WebSocket URL
  stream_web_view: boolean;
  status: BrowserSessionStatus;
  ttl_total: number;
  ttl_without_activity: number | null;
  credits_used: number | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

const TABLE = "browser_sessions";

// ---------------------------------------------------------------------------
// CRUD helpers
// ---------------------------------------------------------------------------

export async function insertBrowserSession(
  row: Omit<BrowserSessionRow, "created_at" | "updated_at">,
): Promise<BrowserSessionRow> {
  const now = new Date().toISOString();
  const full: BrowserSessionRow = {
    ...row,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase_service
    .from(TABLE)
    .insert(full)
    .select()
    .single();

  if (error) {
    logger.error("Failed to insert browser session", { error, id: row.id });
    throw new Error(`Failed to insert browser session: ${error.message}`);
  }

  return data as BrowserSessionRow;
}

export async function getBrowserSession(
  id: string,
): Promise<BrowserSessionRow | null> {
  const { data, error } = await supabase_service
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (isPostgrestNoRowsError(error)) return null;
    logger.error("Failed to get browser session", { error, id });
    throw new Error(`Failed to get browser session: ${error.message}`);
  }

  return data as BrowserSessionRow;
}

export async function getBrowserSessionFromScrape(
  id: string,
): Promise<BrowserSessionRow | null> {
  const { data, error } = await supabase_service
    .from(TABLE)
    .select("*")
    .eq("scrape_id", id)
    .single();

  if (error) {
    if (isPostgrestNoRowsError(error)) return null;
    logger.error("Failed to get browser session from scrape", { error, id });
    throw new Error(
      `Failed to get browser session from scrape: ${error.message}`,
    );
  }

  return data as BrowserSessionRow;
}

export async function listBrowserSessions(
  teamId: string,
  opts?: { status?: BrowserSessionStatus },
): Promise<BrowserSessionRow[]> {
  let query = supabase_service
    .from(TABLE)
    .select("*")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false });

  if (opts?.status) {
    query = query.eq("status", opts.status);
  }

  const { data, error } = await query;

  if (error) {
    logger.error("Failed to list browser sessions", { error, teamId });
    throw new Error(`Failed to list browser sessions: ${error.message}`);
  }

  return (data ?? []) as BrowserSessionRow[];
}

export async function updateBrowserSessionActivity(id: string): Promise<void> {
  const { error } = await supabase_service
    .from(TABLE)
    .update({ updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    logger.warn("Failed to update browser session activity", { error, id });
  }
}

export async function getBrowserSessionByBrowserId(
  browserId: string,
): Promise<BrowserSessionRow | null> {
  const { data, error } = await supabase_service
    .from(TABLE)
    .select("*")
    .eq("browser_id", browserId)
    .single();

  if (error) {
    if (isPostgrestNoRowsError(error)) return null;
    logger.error("Failed to get browser session by browser_id", {
      error,
      browserId,
    });
    throw new Error(
      `Failed to get browser session by browser_id: ${error.message}`,
    );
  }

  return data as BrowserSessionRow;
}

export async function updateBrowserSessionStatus(
  id: string,
  status: BrowserSessionStatus,
): Promise<void> {
  const { error } = await supabase_service
    .from(TABLE)
    .update({
      status,
      updated_at: new Date().toISOString(),
      deleted_at: status === "destroyed" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) {
    logger.warn("Failed to update browser session status", { error, id });
  }
}

export async function claimBrowserSessionDestroyed(
  id: string,
): Promise<boolean> {
  const now = new Date().toISOString();
  const { data, error } = await supabase_service
    .from(TABLE)
    .update({
      status: "destroyed" as BrowserSessionStatus,
      updated_at: now,
      deleted_at: now,
    })
    .eq("id", id)
    .eq("status", "active")
    .select("id");

  if (error) {
    logger.warn("Failed to claim browser session destroyed", { error, id });
    return false;
  }

  return (data?.length ?? 0) > 0;
}

export async function updateBrowserSessionScrapeId(
  id: string,
  scrapeId: string,
): Promise<void> {
  const { error } = await supabase_service
    .from(TABLE)
    .update({ scrape_id: scrapeId, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    logger.warn("Failed to update browser session scrape_id", {
      error,
      id,
      scrapeId,
    });
  }
}

export async function updateBrowserSessionCreditsUsed(
  id: string,
  creditsUsed: number,
): Promise<void> {
  const { error } = await supabase_service
    .from(TABLE)
    .update({ credits_used: creditsUsed, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    logger.warn("Failed to update browser session credits_used", {
      error,
      id,
      creditsUsed,
    });
  }
}

// ---------------------------------------------------------------------------
// Prompt usage tracking (Redis)
// ---------------------------------------------------------------------------

const PROMPT_FLAG_TTL_SECONDS = 7200; // 2 hours, well beyond max session TTL

function promptFlagKey(sessionId: string): string {
  return `browser_session:used_prompt:${sessionId}`;
}

export async function markBrowserSessionUsedPrompt(
  sessionId: string,
): Promise<void> {
  try {
    await setValue(promptFlagKey(sessionId), "1", PROMPT_FLAG_TTL_SECONDS);
  } catch {
    // Redis down — non-fatal, will fall back to standard rate at billing time
  }
}

export async function didBrowserSessionUsePrompt(
  sessionId: string,
): Promise<boolean> {
  try {
    const val = await getValue(promptFlagKey(sessionId));
    return val === "1";
  } catch {
    return false;
  }
}

export async function clearBrowserSessionPromptFlag(
  sessionId: string,
): Promise<void> {
  try {
    await deleteKey(promptFlagKey(sessionId));
  } catch {
    // non-fatal
  }
}

// ---------------------------------------------------------------------------
// Active session count (cached)
// ---------------------------------------------------------------------------

/**
 * Invalidate the cached active session count for a team.
 * Call after creating or destroying a session.
 */
export async function invalidateActiveBrowserSessionCount(
  teamId: string,
): Promise<void> {
  try {
    await deleteKey(activeBrowserCountKey(teamId));
  } catch {
    // Redis down — non-fatal
  }
}
