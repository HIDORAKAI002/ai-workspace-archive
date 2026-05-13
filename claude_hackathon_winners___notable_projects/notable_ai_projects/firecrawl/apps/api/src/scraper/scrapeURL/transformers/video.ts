import { Meta } from "..";
import { Document } from "../../../controllers/v2/types";
import { config } from "../../../config";
import { hasFormatOfType } from "../../../lib/format-utils";
import { VideoUnsupportedUrlError } from "../error";

let cachedUrlRegex: RegExp | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function getSupportedUrlRegex(): Promise<RegExp> {
  if (cachedUrlRegex && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    return cachedUrlRegex;
  }

  const res = await fetch(`${config.AVGRAB_SERVICE_URL}/supported-urls`);
  if (!res.ok) {
    throw new Error(
      "Failed to fetch supported URL patterns from video service",
    );
  }

  const data = await res.json().catch(() => null);
  if (!data || typeof data.regex !== "string") {
    throw new Error("Video service returned invalid supported URL patterns");
  }

  try {
    cachedUrlRegex = new RegExp(data.regex);
  } catch {
    throw new Error("Video service returned invalid supported URL patterns");
  }
  cacheTimestamp = Date.now();
  return cachedUrlRegex;
}

export async function fetchVideo(
  meta: Meta,
  document: Document,
): Promise<Document> {
  if (!hasFormatOfType(meta.options.formats, "video")) {
    return document;
  }

  // Lockdown forbids outbound requests that touch the target URL. avgrab
  // fetches the source on our behalf, so skip it here.
  if (meta.options.lockdown) {
    return document;
  }

  if (!config.AVGRAB_SERVICE_URL) {
    meta.logger.warn("AVGRAB_SERVICE_URL is not configured");
    document.warning =
      "Video format is not available (service not configured)." +
      (document.warning ? " " + document.warning : "");
    return document;
  }

  const urlRegex = await getSupportedUrlRegex();
  if (!urlRegex.test(meta.url)) {
    throw new VideoUnsupportedUrlError();
  }

  const requestBody = {
    url: meta.url,
    ...(meta.audioCookies && meta.audioCookies.length > 0
      ? { cookies: meta.audioCookies }
      : {}),
  };

  const response = await fetch(`${config.AVGRAB_SERVICE_URL}/download-video`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Unknown error" }));
    throw new Error(`Video download failed: ${error.detail}`);
  }

  const data = await response.json().catch(() => null);

  if (!data || !data.public_url || typeof data.public_url !== "string") {
    throw new Error(
      "Video download failed: avgrab service returned an invalid response (missing public_url)",
    );
  }

  document.video = data.public_url;
  return document;
}
