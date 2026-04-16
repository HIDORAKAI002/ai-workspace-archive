import type { TeamFlags } from "../controllers/v2/types";

type OrgFlagMode = "disabled" | "allowed" | "forced";

type ZDRMode = OrgFlagMode;

/**
 * Resolves the effective ZDR mode for scrape endpoints from team flags.
 *
 * Handles both the new enum format (scrapeZDR) and the legacy boolean
 * format (forceZDR/allowZDR) for backward compatibility during the
 * cache migration window.
 */
export function getScrapeZDR(flags: TeamFlags | undefined): ZDRMode {
  if (flags?.scrapeZDR === "forced" || flags?.forceZDR) return "forced";
  if (flags?.scrapeZDR === "allowed" || flags?.allowZDR) return "allowed";
  return "disabled";
}

/**
 * Resolves the effective ZDR mode for search endpoints from team flags.
 *
 * Handles both the new enum format (searchZDR) and the legacy boolean
 * format (forceZDR/allowZDR) for backward compatibility during the
 * cache migration window.
 */
export function getSearchZDR(flags: TeamFlags | undefined): ZDRMode {
  if (flags?.searchZDR === "forced" || flags?.forceZDR) return "forced";
  if (flags?.searchZDR === "allowed" || flags?.allowZDR) return "allowed";
  return "disabled";
}

/**
 * Resolves the effective ignoreRobots mode from team flags.
 */
export function getIgnoreRobots(flags: TeamFlags | undefined): OrgFlagMode {
  if (flags?.ignoreRobots === "forced") return "forced";
  if (flags?.ignoreRobots === "allowed") return "allowed";
  return "disabled";
}

/**
 * Resolves the effective customRobotsAgent mode from team flags.
 * Only supports "disabled" (default) and "allowed" — no "forced" mode.
 */
export function getCustomRobotsAgent(
  flags: TeamFlags | undefined,
): "disabled" | "allowed" {
  if (flags?.customRobotsAgent === "allowed") return "allowed";
  return "disabled";
}
