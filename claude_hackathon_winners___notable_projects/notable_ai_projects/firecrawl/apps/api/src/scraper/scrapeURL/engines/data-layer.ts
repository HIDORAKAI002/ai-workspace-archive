import { z } from "zod";

import { Meta } from "..";
import { EngineScrapeResult } from ".";
import {
  getDataLayerRequestLogContext,
  getDataLayerResponseLogContext,
  isSuccessfulDataLayerStatusCode,
} from "../../../lib/data-layer";
import { setSpanAttributes, withSpan } from "../../../lib/otel-tracer";
import { robustFetch } from "../lib/fetch";
import { EngineError } from "../error";
import { fireEngineURL } from "./fire-engine/scrape";

const dataLayerResultSchema = z
  .object({
    content: z.string().optional(),
    json: z.unknown().optional(),
    url: z.string().optional(),
    pageStatusCode: z.number().optional(),
    pageError: z.string().optional(),
    responseHeaders: z.record(z.string(), z.string()).optional(),
    meta: z.record(z.string(), z.unknown()).optional(),
    error: z.string().optional(),
  })
  .passthrough();

const dataLayerScrapeResponseSchema = z.union([
  z
    .object({
      handled: z.literal(false),
    })
    .passthrough(),
  z
    .object({
      handled: z.literal(true),
      statusCode: z.number(),
      integrationId: z.string().optional(),
      credits: z.number().optional(),
      result: dataLayerResultSchema.optional(),
    })
    .passthrough(),
]);

function getContentType(headers?: Record<string, string>): string {
  return (
    Object.entries(headers ?? {}).find(
      ([key]) => key.toLowerCase() === "content-type",
    )?.[1] ?? ""
  );
}

export function dataLayerMaxReasonableTime(meta: Meta): number {
  return meta.options.timeout ?? 60_000;
}

export async function scrapeURLWithDataLayer(
  meta: Meta,
): Promise<EngineScrapeResult> {
  return withSpan("engine.data-layer.scrape", async span => {
    const startTime = Date.now();
    const url = meta.rewrittenUrl ?? meta.url;
    const requestLogContext = getDataLayerRequestLogContext(url);
    const logger = meta.logger.child({ method: "scrapeURLWithDataLayer" });

    setSpanAttributes(span, {
      "engine.type": "data-layer",
      "engine.url": url,
      "engine.team_id": meta.internalOptions.teamId,
    });

    logger.info("Data layer scrape started", {
      ...requestLogContext,
      scrapeId: meta.id,
      teamId: meta.internalOptions.teamId,
      maxAge: meta.options.maxAge,
    });

    try {
      const response = await robustFetch({
        url: `${fireEngineURL}/v1/data-layer/scrape`,
        method: "POST",
        body: {
          url,
          formats: meta.options.formats,
          maxAge: meta.options.maxAge,
          zeroDataRetention: meta.internalOptions.zeroDataRetention,
          scrapeId: meta.id,
          teamId: meta.internalOptions.teamId,
          source: "firecrawl",
        },
        logger: logger.child({ method: "dataLayerScrape/robustFetch" }),
        tryCount: 2,
        ignoreFailureStatus: true,
        mock: meta.mock,
        abort: meta.abort.asSignal(),
        schema: dataLayerScrapeResponseSchema,
      });

      if (!response.handled) {
        logger.info("Data layer scrape was not handled", {
          ...requestLogContext,
          scrapeId: meta.id,
          teamId: meta.internalOptions.teamId,
          durationMs: Date.now() - startTime,
        });
        throw new EngineError("Data layer did not handle URL");
      }

      const responseLogContext = getDataLayerResponseLogContext(
        response.result?.meta,
      );
      const pageStatusCode =
        response.result?.pageStatusCode ?? response.statusCode;

      if (
        !isSuccessfulDataLayerStatusCode(response.statusCode) ||
        !isSuccessfulDataLayerStatusCode(pageStatusCode) ||
        !response.result
      ) {
        logger.warn("Data layer scrape failed", {
          ...requestLogContext,
          ...responseLogContext,
          scrapeId: meta.id,
          teamId: meta.internalOptions.teamId,
          integrationId: response.integrationId,
          statusCode: response.statusCode,
          pageStatusCode,
          durationMs: Date.now() - startTime,
        });
        throw new EngineError("Data layer request failed");
      }

      const contentType = getContentType(response.result.responseHeaders);

      logger.info("Data layer scrape completed", {
        ...requestLogContext,
        ...responseLogContext,
        scrapeId: meta.id,
        teamId: meta.internalOptions.teamId,
        integrationId: response.integrationId,
        statusCode: response.statusCode,
        durationMs: Date.now() - startTime,
      });

      setSpanAttributes(span, {
        "data-layer.integration_id": response.integrationId,
        "data-layer.status_code": response.statusCode,
        "data-layer.page_status_code": pageStatusCode,
        "data-layer.cache_state": responseLogContext.cacheState,
        "data-layer.cache_age_ms": responseLogContext.cacheAgeMs,
        "data-layer.duration_ms": Date.now() - startTime,
      });

      return {
        url: response.result.url ?? url,
        html: response.result.content ?? "",
        markdown: contentType.includes("text/markdown")
          ? response.result.content
          : undefined,
        json: response.result.json,
        error: response.result.pageError,
        statusCode: pageStatusCode,
        contentType,
        proxyUsed: "basic",
        dataLayer: {
          handled: true,
          integrationId: response.integrationId,
        },
      };
    } catch (error) {
      logger.warn("Data layer scrape errored", {
        ...requestLogContext,
        scrapeId: meta.id,
        teamId: meta.internalOptions.teamId,
        durationMs: Date.now() - startTime,
        errorMessage: error instanceof Error ? error.message : String(error),
        error,
      });
      throw error;
    }
  });
}
