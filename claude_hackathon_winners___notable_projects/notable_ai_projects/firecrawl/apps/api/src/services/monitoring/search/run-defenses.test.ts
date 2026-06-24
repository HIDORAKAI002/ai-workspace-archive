import type { Logger } from "winston";
import type { SearchVerdict } from "./judge";

// vi.mock is hoisted above declarations, so the mocks its factories reference
// are created in vi.hoisted() (also hoisted) to avoid any TDZ surprises.
const {
  searchMock,
  scrapeURLMock,
  resolveEventMock,
  summarizeRunMock,
  materialDevMock,
  reviewAlertMock,
  routeMock,
  snippetsMock,
  criteriaLlmMock,
} = vi.hoisted(() => ({
  searchMock: vi.fn(),
  scrapeURLMock: vi.fn(),
  resolveEventMock: vi.fn(),
  summarizeRunMock: vi.fn(),
  materialDevMock: vi.fn(),
  reviewAlertMock: vi.fn(),
  routeMock: vi.fn(),
  snippetsMock: vi.fn(),
  criteriaLlmMock: vi.fn(),
}));

vi.mock("uuid", () => ({ v7: () => "00000000-0000-7000-8000-000000000000" }));
vi.mock("../../../search/v2", () => ({
  // Tests set the mock to resolve a bare result array; the real search() returns
  // a SearchV2Response ({ web: [...] }), so wrap arrays to match that contract.
  search: async (...a: unknown[]) => {
    const r = await searchMock(...a);
    return Array.isArray(r) ? { web: r } : r;
  },
}));
vi.mock("./llm", () => ({
  resolveEvent: (...a: unknown[]) => resolveEventMock(...a),
  summarizeRun: (...a: unknown[]) => summarizeRunMock(...a),
  judgeMaterialDevelopment: (...a: unknown[]) => materialDevMock(...a),
  reviewAlert: (...a: unknown[]) => reviewAlertMock(...a),
  routeSearchResults: (...a: unknown[]) => routeMock(...a),
  judgeSnippets: (...a: unknown[]) => snippetsMock(...a),
}));
vi.mock("./tuning", () => ({
  hasLlmProvider: () => true,
  googleProviderOptions: () => ({}),
}));
vi.mock("./criteria", async importOriginal => ({
  ...(await importOriginal<typeof import("./criteria")>()),
  compileGoalCriteriaWithLlm: (...a: unknown[]) => criteriaLlmMock(...a),
}));

import { runSearchTarget } from "./run";

const logger = {
  warn: vi.fn(),
  info: vi.fn(),
  error: vi.fn(),
} as unknown as Logger;

const verdict = (over: Partial<SearchVerdict> = {}): SearchVerdict => ({
  relevant: true,
  alertAction: "alert",
  concept: "Firecrawl product launch",
  rationale: "Firecrawl announced a new product today.",
  ...over,
});

const llmCriteria = {
  goalVersion: "v1",
  generatedBy: "llm" as const,
  subjectAliases: ["Firecrawl"],
  mustConcern: ["launch", "launches", "launched", "product"],
  excludedSubjects: ["Parallel"],
  ownedHosts: ["firecrawl.dev"],
  thirdPartyOnly: false,
};

function runParams(
  targetOver: Record<string, unknown> = {},
  monitorOver: Record<string, unknown> = {},
) {
  return {
    monitor: {
      id: "mon_1",
      teamId: "team_1",
      goal: "Alert me when Firecrawl launches a new product",
      subject: "Firecrawl",
      judgeEnabled: true,
      ...monitorOver,
    },
    target: {
      id: "tgt_1",
      queries: ["Firecrawl launch"],
      searchWindow: "24h",
      alertMode: "first_match" as const,
      maxResults: 10,
      ...targetOver,
    },
    monitorCheckId: "check-1",
    // scrapeURLMock keeps the legacy { success, document } shape; adapt it to the
    // ScrapeSearchResult the injected scrapePage now returns.
    scrapePage: async (...a: unknown[]) => {
      const r = (await scrapeURLMock(...a)) as {
        success?: boolean;
        document?: {
          json: unknown;
          markdown?: string;
          metadata?: { publishedTime?: string; modifiedTime?: string };
        };
      } | null;
      return r && r.success && r.document
        ? {
            json: r.document.json ?? null,
            markdown: r.document.markdown ?? "",
            metadata: r.document.metadata ?? {},
          }
        : null;
    },
    goalVersion: "v1",
    knownPages: new Map(),
    knownEvents: [],
    zeroDataRetention: false,
    logger,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  criteriaLlmMock.mockResolvedValue(llmCriteria);
  resolveEventMock.mockResolvedValue({
    matchedKey: null,
    isNew: true,
    label: "Firecrawl product launch",
    reason: "",
  });
  summarizeRunMock.mockResolvedValue({ label: "meaningful", summary: "ok" });
  reviewAlertMock.mockResolvedValue({
    refuted: false,
    failureMode: "none",
    reason: "",
  });
});

const serpRow = (n: number) => ({
  url: `https://news${n}.example.com/story`,
  title: `Firecrawl launches product ${n}`,
  description: `Firecrawl announced product ${n} today.`,
});

describe("router gating (deep)", () => {
  it("scrapes only candidates the router selects", async () => {
    searchMock.mockResolvedValue([serpRow(1), serpRow(2), serpRow(3)]);
    routeMock.mockResolvedValue([
      { id: "result_2", decision: "scrape", priority: 1, reason: "promising" },
    ]);
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict(),
        markdown: "Firecrawl announced product 2 today in prose.",
        metadata: {},
      },
    });

    const result = await runSearchTarget(runParams());
    expect(scrapeURLMock).toHaveBeenCalledTimes(1);
    expect(scrapeURLMock.mock.calls[0][0].url).toBe(serpRow(2).url);
    expect(result.matches).toBe(1);
  });

  it("fails open to top-K when the router throws", async () => {
    searchMock.mockResolvedValue([serpRow(1), serpRow(2)]);
    routeMock.mockRejectedValue(new Error("router down"));
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict({ alertAction: "watch" }),
        markdown: "",
        metadata: {},
      },
    });

    const result = await runSearchTarget(runParams());
    expect(scrapeURLMock).toHaveBeenCalledTimes(2);
    expect(result.matches).toBe(0);
  });
});

describe("standard depth (snippet judging, no scrapes)", () => {
  it("judges from snippets without any page fetch", async () => {
    searchMock.mockResolvedValue([serpRow(1), serpRow(2)]);
    snippetsMock.mockResolvedValue([
      { id: "result_1", ...verdict() },
      { id: "result_2", ...verdict({ alertAction: "watch" }) },
    ]);

    const result = await runSearchTarget(runParams({ depth: "standard" }));
    expect(scrapeURLMock).not.toHaveBeenCalled();
    expect(routeMock).not.toHaveBeenCalled();
    expect(result.pagesChecked).toBe(2);
    expect(result.matches).toBe(1);
    expect(result.sources.map(s => s.status).sort()).toEqual([
      "alert",
      "watching",
    ]);
    // snippet-only judgments never bill a scrape
    expect(result.pageUpserts.every(u => u.scraped === false)).toBe(true);
  });

  it("skips results the snippet judge failed to cover", async () => {
    searchMock.mockResolvedValue([serpRow(1)]);
    snippetsMock.mockRejectedValue(new Error("batch failed"));

    const result = await runSearchTarget(runParams({ depth: "standard" }));
    expect(result.skipped).toBe(1);
    expect(result.matches).toBe(0);
  });
});

describe("alert boundary", () => {
  beforeEach(() => {
    searchMock.mockResolvedValue([serpRow(1)]);
    routeMock.mockResolvedValue([
      { id: "result_1", decision: "scrape", priority: 1, reason: "" },
    ]);
  });

  it("verifier downgrades a competitor-dominated story to watching", async () => {
    searchMock.mockResolvedValue([
      {
        url: "https://news.example.com/parallel",
        title: "Parallel launches Monitor API",
        description: "Parallel launched a product; Firecrawl is a competitor.",
      },
    ]);
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict({ concept: "Parallel Monitor API launch" }),
        markdown:
          "Parallel launched its Monitor API today. Firecrawl is named as a competitor.",
        metadata: {},
      },
    });

    const result = await runSearchTarget(runParams());
    expect(result.matches).toBe(0);
    expect(result.sources[0].status).toBe("watching");
    expect(reviewAlertMock).not.toHaveBeenCalled();
  });

  it("skeptic refutation downgrades to watching", async () => {
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict(),
        markdown: "Firecrawl announced a new product today in prose.",
        metadata: {},
      },
    });
    reviewAlertMock.mockResolvedValue({
      refuted: true,
      failureMode: "adjacent_event",
      reason: "funding, not a launch",
    });

    const result = await runSearchTarget(runParams());
    expect(result.matches).toBe(0);
    expect(result.sources[0].status).toBe("watching");
  });

  it("skeptic outage fails open (alert proceeds)", async () => {
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict(),
        markdown: "Firecrawl announced a new product today in prose.",
        metadata: {},
      },
    });
    reviewAlertMock.mockRejectedValue(new Error("skeptic down"));

    const result = await runSearchTarget(runParams());
    expect(result.matches).toBe(1);
  });

  it("resolver outage fails open to a new event (alert proceeds)", async () => {
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict(),
        markdown: "Firecrawl announced a new product today in prose.",
        metadata: {},
      },
    });
    resolveEventMock.mockRejectedValue(new Error("resolver down"));

    const result = await runSearchTarget(runParams());
    expect(result.matches).toBe(1);
    expect(result.sources[0].status).toBe("alert");
  });

  it("criteria LLM failure keeps the deterministic compile (run completes)", async () => {
    criteriaLlmMock.mockRejectedValue(new Error("criteria down"));
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict(),
        markdown: "Firecrawl announced a new product today in prose.",
        metadata: {},
      },
    });

    const result = await runSearchTarget(runParams());
    expect(result.matches).toBe(1);
  });
});

describe("event state stamps + judgment on alert pages", () => {
  it("stamps satisfiedAt/alertCount/lastAlertAt and a judgment on the alerting page", async () => {
    searchMock.mockResolvedValue([serpRow(1)]);
    routeMock.mockResolvedValue([
      { id: "result_1", decision: "scrape", priority: 1, reason: "" },
    ]);
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict(),
        markdown: "Firecrawl announced a new product today in prose.",
        metadata: {},
      },
    });

    const result = await runSearchTarget(runParams());
    const alertUpsert = result.pageUpserts.find(u => u.status === "alert")!;
    expect(alertUpsert.metadata.eventAlertCount).toBe(1);
    expect(typeof alertUpsert.metadata.eventSatisfiedAt).toBe("string");
    expect(typeof alertUpsert.metadata.eventLastAlertAt).toBe("string");
    expect(alertUpsert.judgment).toMatchObject({
      meaningful: true,
      confidence: "high",
      reason: "Firecrawl announced a new product today.",
    });
  });

  it("a later alert on a known satisfied event increments alertCount and keeps satisfiedAt", async () => {
    searchMock.mockResolvedValue([serpRow(1)]);
    routeMock.mockResolvedValue([
      { id: "result_1", decision: "scrape", priority: 1, reason: "" },
    ]);
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict(),
        markdown: "Firecrawl announced a new product today in prose.",
        metadata: {},
      },
    });
    resolveEventMock.mockResolvedValue({
      matchedKey: "evt-known",
      isNew: false,
      label: "Firecrawl product launch",
      reason: "",
    });
    materialDevMock.mockResolvedValue({ material: true, reason: "new stage" });

    const result = await runSearchTarget({
      ...runParams({ alertMode: "material_dev" }),
      knownEvents: [
        {
          key: "evt-known",
          label: "Firecrawl product launch",
          satisfiedAt: "2026-06-01T00:00:00Z",
          alertCount: 2,
        },
      ],
    });
    const alertUpsert = result.pageUpserts.find(u => u.status === "alert")!;
    expect(alertUpsert.metadata.eventAlertCount).toBe(3);
    expect(alertUpsert.metadata.eventSatisfiedAt).toBe("2026-06-01T00:00:00Z");
  });
});

describe("judgeEnabled gates the LLM judge", () => {
  it("judge OFF behaves like raw: no LLM stages, no LLM credits, no concept/rationale", async () => {
    // Monitor still has a goal and depth:"deep" — but judgeEnabled=false must
    // collapse to raw and skip every LLM stage.
    searchMock.mockResolvedValue([serpRow(1), serpRow(2)]);

    const result = await runSearchTarget(
      runParams({ depth: "deep" }, { judgeEnabled: false }),
    );

    // No LLM stage ran.
    expect(routeMock).not.toHaveBeenCalled();
    expect(snippetsMock).not.toHaveBeenCalled();
    expect(scrapeURLMock).not.toHaveBeenCalled();
    expect(reviewAlertMock).not.toHaveBeenCalled();
    expect(resolveEventMock).not.toHaveBeenCalled();
    expect(summarizeRunMock).not.toHaveBeenCalled();
    expect(criteriaLlmMock).not.toHaveBeenCalled();

    // No judge credits billed (raw → nothing judged); search still ran and was billed.
    expect(result.judgeCredits).toBe(0);
    expect(result.resultsJudged).toBe(0);
    expect(result.resultCount).toBe(2);

    // Raw alerts: deterministic searchStatus from dedup, but no LLM
    // concept/rationale on any upsert.
    for (const upsert of result.pageUpserts) {
      expect(upsert.scraped).toBe(false);
      expect(upsert.metadata.concept).toBeUndefined();
      expect(upsert.metadata.rationale).toBeUndefined();
      expect(upsert.metadata.searchStatus).toBeDefined();
    }
  });

  it("judge OFF with no goal still runs search and returns raw results (no throw)", async () => {
    searchMock.mockResolvedValue([serpRow(1)]);

    const result = await runSearchTarget(
      runParams({ depth: "deep" }, { judgeEnabled: false, goal: null }),
    );

    expect(result.resultCount).toBe(1);
    expect(result.judgeCredits).toBe(0);
    expect(result.resultsJudged).toBe(0);
    expect(scrapeURLMock).not.toHaveBeenCalled();
  });

  it("judge ON with depth:deep still runs the full judge", async () => {
    searchMock.mockResolvedValue([serpRow(1)]);
    routeMock.mockResolvedValue([
      { id: "result_1", decision: "scrape", priority: 1, reason: "" },
    ]);
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict(),
        markdown: "Firecrawl announced a new product today in prose.",
        metadata: {},
      },
    });

    const result = await runSearchTarget(
      runParams({ depth: "deep" }, { judgeEnabled: true }),
    );

    expect(routeMock).toHaveBeenCalled();
    expect(scrapeURLMock).toHaveBeenCalled();
    expect(result.matches).toBe(1);
    const alertUpsert = result.pageUpserts.find(u => u.status === "alert")!;
    expect(alertUpsert.metadata.concept).toBeDefined();
  });
});

describe("deep-path scrape failures mark the check degraded (no silent empty)", () => {
  beforeEach(() => {
    // Two candidates routed to scrape; scrape outcome varies per test.
    searchMock.mockResolvedValue([serpRow(1), serpRow(2)]);
    routeMock.mockResolvedValue([
      { id: "result_1", decision: "scrape", priority: 2, reason: "" },
      { id: "result_2", decision: "scrape", priority: 1, reason: "" },
    ]);
  });

  it("degraded=true when EVERY deep-path scrape fails (judging expected, nothing judged)", async () => {
    scrapeURLMock.mockResolvedValue({ success: false });

    const result = await runSearchTarget(runParams({ depth: "deep" }));

    // The false-negative we must surface: 0 judged / 0 alerts, but degraded.
    expect(result.resultsJudged).toBe(0);
    expect(result.matches).toBe(0);
    expect(result.judgeDegraded).toBe(true);
    expect(result.degradedReason).toMatch(/judged|incomplete/i);
    // A non-empty summary so the check never reads as a clean "nothing new".
    expect(result.summary).not.toBe("");
    // Each unscrapeable result is persisted as a "skipped" page so it surfaces
    // as an error check page (skipped -> error) instead of silently vanishing.
    const skippedUpserts = result.pageUpserts.filter(
      u => u.status === "skipped",
    );
    expect(skippedUpserts).toHaveLength(2);
    expect(skippedUpserts[0].metadata.searchStatus).toBe("skipped");
    expect(skippedUpserts[0].metadata.judgedThisRun).toBe(false);
  });

  it("degraded=true when scrapes throw", async () => {
    scrapeURLMock.mockRejectedValue(new Error("scrape timed out"));

    const result = await runSearchTarget(runParams({ depth: "deep" }));

    expect(result.resultsJudged).toBe(0);
    expect(result.judgeDegraded).toBe(true);
    expect(result.degradedReason).toMatch(/judged|incomplete/i);
  });

  it("NOT degraded when at least one scrape succeeds and is judged", async () => {
    scrapeURLMock.mockImplementation(({ url }: { url: string }) =>
      url === serpRow(1).url
        ? Promise.resolve({
            success: true,
            document: {
              json: verdict({ alertAction: "ignore" }),
              markdown: "prose",
              metadata: {},
            },
          })
        : Promise.resolve({ success: false }),
    );

    const result = await runSearchTarget(runParams({ depth: "deep" }));

    // One result was actually judged (ignored) — that's a real evaluation, not a
    // failure, so the check is NOT degraded even though a sibling scrape failed.
    expect(result.resultsJudged).toBe(1);
    expect(result.judgeDegraded).toBe(false);
    expect(result.degradedReason).toBeNull();
  });

  it("NOT degraded when the judge legitimately ignores every (scraped) result", async () => {
    scrapeURLMock.mockResolvedValue({
      success: true,
      document: {
        json: verdict({ alertAction: "ignore" }),
        markdown: "prose",
        metadata: {},
      },
    });

    const result = await runSearchTarget(runParams({ depth: "deep" }));

    // Everything scraped fine and was evaluated; judge ignored it all. Normal.
    expect(result.resultsJudged).toBe(2);
    expect(result.matches).toBe(0);
    expect(result.judgeDegraded).toBe(false);
    expect(result.degradedReason).toBeNull();
  });

  it("NOT degraded when search legitimately returns zero results", async () => {
    searchMock.mockResolvedValue([]);

    const result = await runSearchTarget(runParams({ depth: "deep" }));

    expect(result.resultCount).toBe(0);
    expect(result.judgeDegraded).toBe(false);
    expect(result.degradedReason).toBeNull();
    expect(scrapeURLMock).not.toHaveBeenCalled();
  });

  it("degraded=true when the standard snippet judge fails for every candidate", async () => {
    searchMock.mockResolvedValue([serpRow(1), serpRow(2)]);
    snippetsMock.mockRejectedValue(new Error("snippet judge outage"));

    const result = await runSearchTarget(runParams({ depth: "standard" }));

    expect(result.resultsJudged).toBe(0);
    expect(result.matches).toBe(0);
    expect(result.judgeDegraded).toBe(true);
    expect(result.degradedReason).toMatch(/judged|incomplete/i);
  });
});
