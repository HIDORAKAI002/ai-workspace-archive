import type { Meta } from "../../..";
import type { PDFMode } from "../../../../../controllers/v2/types";
import type { PDFProcessorResult } from "../types";
import { fetch as undiciFetch } from "undici";
import { AbortManagerThrownError } from "../../../lib/abortManager";
import { firePdfAsyncSubmittedTotal } from "./metrics";
import { submitResponseSchema } from "./schema";
import type { Fallback } from "./utils";

export type SubmitOutcome =
  | {
      kind: "ok";
      lane: string | undefined;
      retryAfterMs: number | undefined;
      alreadyDone: boolean;
    }
  | { kind: "fallback"; result: PDFProcessorResult };

export type SubmitArgs = {
  meta: Meta;
  baseUrl: string;
  base64Content: string;
  maxPages: number | undefined;
  pagesProcessed: number | undefined;
  mode: PDFMode | undefined;
  deadlineAt: string;
  fetchImpl: typeof undiciFetch;
  fallback: Fallback;
};

export async function submitJob(args: SubmitArgs): Promise<SubmitOutcome> {
  const {
    meta,
    baseUrl,
    base64Content,
    maxPages,
    pagesProcessed,
    mode,
    deadlineAt,
    fetchImpl,
    fallback,
  } = args;
  const scrapeId = meta.id;

  const body = {
    pdf_b64: base64Content,
    scrape_id: scrapeId,
    source: "firecrawl" as const,
    zdr: false as const,
    deadline_at: deadlineAt,
    ...(meta.internalOptions.teamId && {
      team_id: meta.internalOptions.teamId,
    }),
    ...(meta.internalOptions.crawlId && {
      crawl_id: meta.internalOptions.crawlId,
    }),
    options: {
      ...(pagesProcessed !== undefined && { pages_estimate: pagesProcessed }),
      ...(maxPages !== undefined && { max_pages: maxPages }),
      ...(mode !== undefined && { mode }),
    },
  };

  let status: number;
  let json: unknown;
  try {
    const resp = await fetchImpl(`${baseUrl}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: meta.abort.asSignal(),
    });
    status = resp.status;
    json = await resp.json().catch(() => ({}));
  } catch (error) {
    if (error instanceof AbortManagerThrownError) throw error;
    return { kind: "fallback", result: await fallback("network_error", { error: String(error) }) };
  }

  if (status === 404) return { kind: "fallback", result: await fallback("http_404") };
  if (status === 413) return { kind: "fallback", result: await fallback("http_413") };
  if (status === 429) return { kind: "fallback", result: await fallback("http_429") };
  if (status === 503) return { kind: "fallback", result: await fallback("http_503") };

  if (status === 409) {
    meta.logger.error("FirePDF async POST /jobs returned 409 scrape_id_conflict", {
      scrapeId,
      body: json,
    });
    throw new Error(
      "fire-pdf async POST /jobs conflict: scrape_id reused with different inputs",
    );
  }

  if (status === 400) {
    meta.logger.error("FirePDF async POST /jobs returned 400 validation error", {
      scrapeId,
      body: json,
    });
    throw new Error("fire-pdf async POST /jobs validation error");
  }

  if (status !== 200 && status !== 202) {
    return {
      kind: "fallback",
      result: await fallback("http_5xx", { status, body: json }),
    };
  }

  const parsed = submitResponseSchema.safeParse(json);
  if (!parsed.success) {
    return {
      kind: "fallback",
      result: await fallback("http_5xx", {
        error: String(parsed.error),
        body: json,
        status,
      }),
    };
  }

  firePdfAsyncSubmittedTotal.labels(parsed.data.lane ?? "unknown").inc();
  meta.logger.info("FirePDF async POST /jobs accepted", {
    scrapeId,
    status: parsed.data.status,
    httpStatus: status,
    lane: parsed.data.lane,
    deadlineAt,
  });

  return {
    kind: "ok",
    lane: parsed.data.lane,
    retryAfterMs: parsed.data.retry_after_ms,
    alreadyDone: status === 200 && parsed.data.status === "done",
  };
}
