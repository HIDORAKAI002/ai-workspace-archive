import { TeamFlags } from "../controllers/v2/types";
import {
  getScrapeZDR,
  getIgnoreRobots,
  getCustomRobotsAgent,
} from "./zdr-helpers";

type LocationOptions = { country?: string };

interface APIRequest {
  zeroDataRetention?: boolean;
  location?: LocationOptions;
  scrapeOptions?: {
    location?: LocationOptions;
  };
  crawlerOptions?: {
    ignoreRobotsTxt?: boolean;
    robotsUserAgent?: string;
  };
}

const SUPPORT_EMAIL = "support@firecrawl.com";

export function checkPermissions(
  request: APIRequest,
  flags?: TeamFlags,
): { error?: string } {
  // zdr perms — scrapeZDR must be 'allowed' or 'forced' for request-scoped ZDR
  const scrapeMode = getScrapeZDR(flags);
  if (
    request.zeroDataRetention &&
    scrapeMode !== "allowed" &&
    scrapeMode !== "forced"
  ) {
    return {
      error: `Zero Data Retention (ZDR) is not enabled for your team. Contact ${SUPPORT_EMAIL} to enable this feature.`,
    };
  }

  // robots perms — ignoreRobots must be 'allowed' or 'forced'
  const robotsMode = getIgnoreRobots(flags);
  if (
    request.crawlerOptions?.ignoreRobotsTxt &&
    robotsMode !== "allowed" &&
    robotsMode !== "forced"
  ) {
    return {
      error: `The ignoreRobotsTxt parameter is an enterprise feature. Contact ${SUPPORT_EMAIL} to explore whether it can be enabled for your team.`,
    };
  }
  // customRobotsAgent perms — separate flag for robotsUserAgent
  const customAgentMode = getCustomRobotsAgent(flags);
  if (
    request.crawlerOptions?.robotsUserAgent &&
    customAgentMode !== "allowed"
  ) {
    return {
      error: `The robotsUserAgent parameter is an enterprise feature. Contact ${SUPPORT_EMAIL} to explore whether it can be enabled for your team.`,
    };
  }

  // ip whitelist perms
  const needsWhitelist =
    request.location?.country === "us-whitelist" ||
    request.scrapeOptions?.location?.country === "us-whitelist";

  if (needsWhitelist && !flags?.ipWhitelist) {
    return {
      error: `Static IP addresses are not enabled for your team. Contact ${SUPPORT_EMAIL} to get a dedicated set of IP addresses you can whitelist.`,
    };
  }

  return {};
}
