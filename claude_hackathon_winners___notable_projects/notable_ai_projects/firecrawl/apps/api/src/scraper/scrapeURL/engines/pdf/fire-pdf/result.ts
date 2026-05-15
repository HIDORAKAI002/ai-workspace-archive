import type { Meta } from "../../..";
import type { PDFProcessorResult } from "../types";
import { fetch as undiciFetch } from "undici";
import { AbortManagerThrownError } from "../../../lib/abortManager";
import {
  POLL_FLOOR_MS,
  resultResponseSchema,
  type ResultResponse,
} from "./schema";
import type { Fallback } from "./utils";

export type ResultDeps = {
  baseUrl: string;
  scrapeId: string;
  meta: Meta;
  fetchImpl: typeof undiciFetch;
  sleep: (ms: number, signal?: AbortSignal) => Promise<void>;
  fallback: Fallback;
};

export type ResultOutcome =
  | { kind: "ok"; result: ResultResponse }
  | { kind: "fallback"; result: PDFProcessorResult };

export async function fetchResult(deps: ResultDeps): Promise<ResultOutcome> {
  const { baseUrl, scrapeId, meta, fetchImpl, sleep, fallback } = deps;
  let retried409 = 0;

  while (true) {
    let resp;
    try {
      resp = await fetchImpl(`${baseUrl}/jobs/${scrapeId}/result`, {
        method: "GET",
        signal: meta.abort.asSignal(),
      });
    } catch (error) {
      if (error instanceof AbortManagerThrownError) throw error;
      return {
        kind: "fallback",
        result: await fallback("network_error", { error: String(error) }),
      };
    }

    const status = resp.status;
    const body = await resp.json().catch(() => ({}));

    if (status === 503) {
      return {
        kind: "fallback",
        result: await fallback("result_503", { body }),
      };
    }

    if (status === 409) {
      retried409++;
      if (retried409 > 1) {
        return {
          kind: "fallback",
          result: await fallback("http_5xx", {
            status: 409,
            body,
            note: "result endpoint kept returning 409",
          }),
        };
      }
      meta.logger.info("FirePDF async result returned 409, re-polling once", {
        scrapeId,
      });
      await sleep(POLL_FLOOR_MS, meta.abort.asSignal());
      continue;
    }

    if (status !== 200) {
      return {
        kind: "fallback",
        result: await fallback("http_5xx", { status, body }),
      };
    }

    const parsed = resultResponseSchema.safeParse(body);
    if (!parsed.success) {
      return {
        kind: "fallback",
        result: await fallback("http_5xx", {
          error: String(parsed.error),
          body,
        }),
      };
    }
    return { kind: "ok", result: parsed.data };
  }
}
