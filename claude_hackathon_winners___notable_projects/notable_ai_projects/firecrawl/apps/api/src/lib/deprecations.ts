import { NextFunction, Request, Response } from "express";

interface Deprecation {
  message: string;
  replacement?: string;
  sunset?: string;
  docs?: string;
}

const DEPRECATIONS = {
  v1_extract: {
    message:
      "/v1/extract is deprecated. Use /v2/scrape with formats including a 'json' format object.",
    replacement: "/v2/scrape",
  },
  v1_extract_status: {
    message:
      "/v1/extract/:jobId is deprecated. Use /v2/scrape with formats including a 'json' format object.",
    replacement: "/v2/scrape",
  },
  v2_extract: {
    message:
      "/v2/extract is deprecated. Use /v2/scrape with formats including a 'json' format object.",
    replacement: "/v2/scrape",
  },
  v2_extract_status: {
    message:
      "/v2/extract/:jobId is deprecated. Use /v2/scrape with formats including a 'json' format object.",
    replacement: "/v2/scrape",
  },
  v1_deep_research: {
    message: "/v1/deep-research is deprecated. Use /v2/search instead.",
    replacement: "/v2/search",
  },
  v1_deep_research_status: {
    message: "/v1/deep-research/:jobId is deprecated. Use /v2/search instead.",
    replacement: "/v2/search",
  },
  v1_llmstxt: {
    message: "/v1/llmstxt is deprecated and will not be replaced.",
  },
  v1_llmstxt_status: {
    message: "/v1/llmstxt/:jobId is deprecated and will not be replaced.",
  },
  v0_scrape: {
    message: "/v0/scrape is deprecated. Use /v2/scrape instead.",
    replacement: "/v2/scrape",
  },
  v0_crawl: {
    message: "/v0/crawl is deprecated. Use /v2/crawl instead.",
    replacement: "/v2/crawl",
  },
  v0_crawl_status: {
    message:
      "/v0/crawl/status/:jobId is deprecated. Use /v2/crawl/:jobId instead.",
    replacement: "/v2/crawl/:jobId",
  },
  v0_crawl_cancel: {
    message:
      "/v0/crawl/cancel/:jobId is deprecated. Use DELETE /v2/crawl/:jobId instead.",
    replacement: "/v2/crawl/:jobId",
  },
  v0_search: {
    message: "/v0/search is deprecated. Use /v2/search instead.",
    replacement: "/v2/search",
  },
} as const satisfies Record<string, Deprecation>;

type DeprecationKey = keyof typeof DEPRECATIONS;

// RFC 7234 quoted-string: escape backslash and double quote.
function quoteWarningText(s: string): string {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export function deprecationMiddleware(key: DeprecationKey) {
  const dep: Deprecation = DEPRECATIONS[key];
  return (req: Request, res: Response, next: NextFunction) => {
    // RFC 9745 Deprecation header.
    res.setHeader("Deprecation", "true");
    // RFC 8594 Sunset header.
    if (dep.sunset) res.setHeader("Sunset", dep.sunset);

    // RFC 8288 Link relations: "deprecation" (RFC 9745) for docs, and
    // "successor-version" (RFC 5829) for the replacement endpoint.
    const links: string[] = [];
    if (dep.docs) links.push(`<${dep.docs}>; rel="deprecation"`);
    if (dep.replacement) {
      links.push(`<${dep.replacement}>; rel="successor-version"`);
    }
    if (links.length > 0) res.setHeader("Link", links.join(", "));

    // RFC 7234 Warning header, code 299 = "Miscellaneous Persistent Warning".
    res.setHeader("Warning", `299 - ${quoteWarningText(dep.message)}`);

    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      if (body && typeof body === "object" && !Array.isArray(body)) {
        const existing = Array.isArray(body.warnings) ? body.warnings : [];
        body.warnings = [...existing, dep.message];
        if (dep.replacement && body.replacement === undefined) {
          body.replacement = dep.replacement;
        }
      }
      return originalJson(body);
    };
    next();
  };
}
