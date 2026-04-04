import type { TeamFlags } from "../controllers/v2/types";

type ZDRMode = "disabled" | "allowed" | "forced";

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
