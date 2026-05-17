import { v7 as uuidv7 } from "uuid";
import { getJobFromGCS } from "../../lib/gcs-jobs";
import {
  MonitorDiffArtifact,
  monitorDiffGcsKey,
  saveMonitorDiffArtifact,
} from "../../lib/gcs-monitoring";
import {
  diffMonitorJson,
  diffMonitorMarkdown,
  formatsRequestGitDiff,
  formatsRequestJsonExtraction,
} from "./diff";

type MonitorPageDiffStatus = "same" | "new" | "changed";

type MonitorPageDiffResult = {
  status: MonitorPageDiffStatus;
  diffGcsKey: string | null;
  diffTextBytes: number | null;
  diffJsonBytes: number | null;
};

type PreviousPageRef = {
  last_scrape_id: string | null;
  is_removed: boolean | null;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Compute the page diff for a single monitored URL and persist the diff
 * artifact to GCS when content changed. Branches on whether the monitor
 * asked for JSON extraction (in which case the diff is over `doc.json`) or
 * the default markdown text diff.
 *
 * Returns the new status + GCS key/sizes for the caller to write into the
 * monitor pages row.
 */
export async function computeAndPersistPageDiff(params: {
  teamId: string;
  monitorId: string;
  checkId: string;
  url: string;
  scrapeId: string;
  doc: any;
  previous: PreviousPageRef | null;
  formats: unknown;
}): Promise<MonitorPageDiffResult> {
  const { teamId, monitorId, checkId, url, scrapeId, doc, previous, formats } =
    params;

  const wantsJson = formatsRequestJsonExtraction(formats);
  const wantsGitDiff = formatsRequestGitDiff(formats);

  if (!previous?.last_scrape_id || previous.is_removed) {
    return {
      status: "new",
      diffGcsKey: null,
      diffTextBytes: null,
      diffJsonBytes: null,
    };
  }

  const previousDoc = (await getJobFromGCS(previous.last_scrape_id))?.[0];

  if (wantsJson) {
    const previousJson = isPlainObject(previousDoc?.json)
      ? (previousDoc!.json as Record<string, unknown>)
      : undefined;
    const currentJson = isPlainObject(doc?.json)
      ? (doc.json as Record<string, unknown>)
      : undefined;

    // If the current scrape didn't produce a JSON document we can't
    // compute a JSON diff; treat as `changed` to be safe (matches the
    // markdown-missing branch's behavior).
    if (!currentJson) {
      return {
        status: "changed",
        diffGcsKey: null,
        diffTextBytes: null,
        diffJsonBytes: null,
      };
    }

    const result = diffMonitorJson(previousJson, currentJson);

    // Mixed-mode: also compute the markdown diff so a monitor that asked
    // for both ["json","git-diff"] modes reports `changed` whenever either
    // surface changed, with both diffs persisted side by side.
    let markdownSidecar: { text: string; json: unknown } | undefined;
    if (wantsGitDiff) {
      const previousMarkdown = previousDoc?.markdown;
      const currentMarkdown = doc?.markdown;
      if (previousMarkdown && currentMarkdown) {
        const md = diffMonitorMarkdown(previousMarkdown, currentMarkdown);
        if (md.status === "changed") {
          markdownSidecar = { text: md.text, json: md.json };
        }
      }
    }

    if (result.status === "same" && !markdownSidecar) {
      return {
        status: "same",
        diffGcsKey: null,
        diffTextBytes: null,
        diffJsonBytes: null,
      };
    }

    const diffGcsKey = monitorDiffGcsKey({
      teamId,
      monitorId,
      checkId,
      pageId: uuidv7(),
    });
    const artifact: MonitorDiffArtifact = {
      kind: "json",
      url,
      previousScrapeId: previous.last_scrape_id,
      currentScrapeId: scrapeId,
      generatedAt: new Date().toISOString(),
      // When only markdown changed, the per-field JSON diff is empty.
      json: result.status === "changed" ? result.json : {},
      snapshot: currentJson,
      ...(markdownSidecar ? { markdown: markdownSidecar } : {}),
    };
    const sizes = await saveMonitorDiffArtifact(diffGcsKey, artifact);
    return {
      status: "changed",
      diffGcsKey,
      diffTextBytes: sizes.textBytes,
      diffJsonBytes: sizes.jsonBytes,
    };
  }

  // Markdown path (existing behavior).
  const previousMarkdown = previousDoc?.markdown;
  const currentMarkdown = doc?.markdown;

  // Only treat genuinely missing markdown as the fallback "changed" case.
  // An empty string is a valid scrape result (e.g. a page that renders no
  // textual content) and should still flow through diffMonitorMarkdown so
  // we can correctly report "same" when both runs returned "".
  if (previousMarkdown == null || currentMarkdown == null) {
    return {
      status: "changed",
      diffGcsKey: null,
      diffTextBytes: null,
      diffJsonBytes: null,
    };
  }

  const diff = diffMonitorMarkdown(previousMarkdown, currentMarkdown);
  if (diff.status === "same") {
    return {
      status: "same",
      diffGcsKey: null,
      diffTextBytes: null,
      diffJsonBytes: null,
    };
  }

  const diffGcsKey = monitorDiffGcsKey({
    teamId,
    monitorId,
    checkId,
    pageId: uuidv7(),
  });
  const artifact: MonitorDiffArtifact = {
    kind: "markdown",
    url,
    previousScrapeId: previous.last_scrape_id,
    currentScrapeId: scrapeId,
    generatedAt: new Date().toISOString(),
    text: diff.text,
    json: diff.json,
  };
  const sizes = await saveMonitorDiffArtifact(diffGcsKey, artifact);
  return {
    status: "changed",
    diffGcsKey,
    diffTextBytes: sizes.textBytes,
    diffJsonBytes: sizes.jsonBytes,
  };
}
