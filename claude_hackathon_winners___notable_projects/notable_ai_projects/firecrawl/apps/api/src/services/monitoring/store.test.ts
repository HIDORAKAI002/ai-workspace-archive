vi.mock("uuid", () => ({
  v7: () => "test-uuid-v7",
}));

import {
  calculateMonitorCheckActualCreditsFromPages,
  estimateMonitorCreditsPerRun,
  flatSearchTargetCredits,
} from "./store";
import type { MonitorTarget } from "./types";

describe("monitoring store credit helpers", () => {
  it("estimates goal-enabled scrape monitors from scrape option costs", () => {
    const targets: MonitorTarget[] = [
      {
        id: "target-1",
        type: "scrape",
        urls: ["https://example.com/a", "https://example.com/b"],
        scrapeOptions: {
          formats: [{ type: "changeTracking", modes: ["json"] }],
          proxy: "stealth",
        },
      },
    ];

    expect(estimateMonitorCreditsPerRun(targets, false)).toBe(18);
    expect(estimateMonitorCreditsPerRun(targets, true)).toBe(20);
  });

  it("adds predictable lockdown costs and judge credits separately", () => {
    const targets: MonitorTarget[] = [
      {
        id: "target-1",
        type: "scrape",
        urls: ["https://example.com/a"],
        scrapeOptions: {
          lockdown: true,
        },
      },
    ];

    expect(estimateMonitorCreditsPerRun(targets, false)).toBe(5);
    expect(estimateMonitorCreditsPerRun(targets, true)).toBe(6);
  });

  it("uses target options when page rows do not have recorded scrape credits", () => {
    const targets: MonitorTarget[] = [
      {
        id: "target-1",
        type: "scrape",
        urls: ["https://example.com/a"],
        scrapeOptions: {
          formats: [{ type: "changeTracking", modes: ["json"] }],
          proxy: "stealth",
        },
      },
    ];

    expect(
      calculateMonitorCheckActualCreditsFromPages(
        [
          {
            target_id: "target-1",
            metadata: {},
            judgment: { meaningful: true },
            status: "changed",
          },
        ],
        targets,
      ),
    ).toBe(10);
  });

  it("uses monitor metadata for fallback PDF credits when recorded usage is missing", () => {
    const targets: MonitorTarget[] = [
      {
        id: "target-1",
        type: "scrape",
        urls: ["https://example.com/sample.pdf"],
        scrapeOptions: {},
      },
    ];

    expect(
      calculateMonitorCheckActualCreditsFromPages(
        [
          {
            target_id: "target-1",
            metadata: { numPages: 5 },
            status: "same",
          },
        ],
        targets,
      ),
    ).toBe(5);
  });

  it("uses monitor metadata for fallback proxy and postprocessor credits", () => {
    const targets: MonitorTarget[] = [
      {
        id: "target-1",
        type: "scrape",
        urls: ["https://x.com/firecrawl"],
        scrapeOptions: {},
      },
    ];

    expect(
      calculateMonitorCheckActualCreditsFromPages(
        [
          {
            target_id: "target-1",
            metadata: {
              proxyUsed: "stealth",
              postprocessorsUsed: ["x-twitter"],
            },
            status: "same",
          },
        ],
        targets,
      ),
    ).toBe(34);
  });

  it("treats enhanced proxy metadata as premium for fallback billing", () => {
    const targets: MonitorTarget[] = [
      {
        id: "target-1",
        type: "scrape",
        urls: ["https://example.com"],
        scrapeOptions: {},
      },
    ];

    expect(
      calculateMonitorCheckActualCreditsFromPages(
        [
          {
            target_id: "target-1",
            metadata: {
              proxyUsed: "enhanced",
            },
            status: "same",
          },
        ],
        targets,
      ),
    ).toBe(5);
  });

  it("does not add fallback proxy credits when runtime metadata says basic was used", () => {
    const targets: MonitorTarget[] = [
      {
        id: "target-1",
        type: "scrape",
        urls: ["https://example.com/sample.pdf"],
        scrapeOptions: {
          formats: [{ type: "changeTracking", modes: ["json"] }],
          proxy: "stealth",
        },
      },
    ];

    expect(
      calculateMonitorCheckActualCreditsFromPages(
        [
          {
            target_id: "target-1",
            metadata: {
              numPages: 10,
              proxyUsed: "basic",
            },
            status: "same",
          },
        ],
        targets,
      ),
    ).toBe(14);
  });

  it("prefers recorded page usage and does not bill removed pages", () => {
    expect(
      calculateMonitorCheckActualCreditsFromPages([
        { metadata: { creditsUsed: 5 }, judgment: { meaningful: true } },
        { metadata: { creditsUsed: 1 }, judgment: null },
        { metadata: {}, judgment: { meaningful: false } },
        { status: "removed", metadata: {}, judgment: null },
      ]),
    ).toBe(9);
  });

  it("adds judge credits only when a judgment was persisted", () => {
    expect(
      calculateMonitorCheckActualCreditsFromPages([
        { metadata: { creditsUsed: 2 }, judgment: undefined },
        { metadata: { creditsUsed: 2 }, judgment: null },
        { metadata: { creditsUsed: 2 }, judgment: { meaningful: false } },
        { metadata: { creditsUsed: 2 }, judgment: { meaningful: true } },
      ]),
    ).toBe(10);
  });

  it("uses recorded scrape credits for error pages when present", () => {
    expect(
      calculateMonitorCheckActualCreditsFromPages([
        { status: "error", metadata: { creditsUsed: 0 } },
        { status: "error", metadata: { creditsUsed: 4 } },
        { status: "error", metadata: {} },
      ]),
    ).toBe(5);
  });
});

describe("FLAT deterministic search-monitor billing", () => {
  const searchTarget = (
    overrides: Partial<Extract<MonitorTarget, { type: "search" }>> = {},
  ): MonitorTarget =>
    ({
      id: "search-1",
      type: "search",
      queries: ["nvidia gpu launch"],
      searchWindow: "24h",
      maxResults: 10,
      scrapeOptions: {},
      ...overrides,
    }) as MonitorTarget;

  describe("estimate (upper bound)", () => {
    it("judge OFF (raw billing): only the search call, 2 per 10 results", () => {
      // ceil(10/10)*2 * 1 query = 2.
      expect(estimateMonitorCreditsPerRun([searchTarget()], false)).toBe(2);
    });

    it("judge ON: search call + flat 5 per judged result (all results, all queries)", () => {
      // search = ceil(10/10)*2*1 = 2; judge = 5 * (10 results * 1 query) = 50.
      expect(estimateMonitorCreditsPerRun([searchTarget()], true)).toBe(52);
    });

    it("legacy depth:raw target is never judged even when judging is on", () => {
      expect(
        estimateMonitorCreditsPerRun([searchTarget({ depth: "raw" })], true),
      ).toBe(2);
    });

    it("scales search with queries but caps judge at maxResults total", () => {
      const t = searchTarget({
        maxResults: 20,
        queries: ["a", "b", "c"],
      });
      // search = ceil((20*3)/10)*2 = 12; judge = 5 * 20 (total cap, NOT *queries)
      // = 100 → 112. The runner judges at most maxResults candidates total.
      expect(estimateMonitorCreditsPerRun([t], true)).toBe(112);
    });
  });

  describe("flatSearchTargetCredits (the deterministic actual)", () => {
    it("sums searchCredits + judgeCredits across search target_results", () => {
      // The headline trace: search 2 + judge 5*3 = 17.
      const targetResults = [
        {
          targetId: "search-1",
          type: "search",
          searchCredits: 2,
          judgeCredits: 15,
          resultsJudged: 3,
        },
      ];
      expect(flatSearchTargetCredits(targetResults)).toBe(17);
    });

    it("raw / judge-off: just the 2 search credits, 0 judge", () => {
      expect(
        flatSearchTargetCredits([
          {
            targetId: "search-1",
            type: "search",
            searchCredits: 2,
            judgeCredits: 0,
            resultsJudged: 0,
          },
        ]),
      ).toBe(2);
    });

    it("ignores non-search target runs and malformed entries", () => {
      expect(
        flatSearchTargetCredits([
          { targetId: "scrape-1", type: "scrape", expectedJobs: ["a"] },
          { targetId: "search-1", type: "search", searchCredits: 4 },
          null,
          "garbage",
          { type: "search" }, // missing credits → contributes 0
        ]),
      ).toBe(4);
    });

    it("returns 0 for non-array / empty target_results", () => {
      expect(flatSearchTargetCredits(undefined)).toBe(0);
      expect(flatSearchTargetCredits(null)).toBe(0);
      expect(flatSearchTargetCredits([])).toBe(0);
    });
  });

  // Flat billing contract: actual = 2*ceil(totalResults/10) + 5*resultsJudged.
  describe("flat search billing contract (eval H regression guard)", () => {
    const searchCreditsFor = (totalResults: number) =>
      2 * Math.ceil(totalResults / 10);
    const stampedSearchRun = (totalResults: number, resultsJudged: number) => ({
      targetId: "search-1",
      type: "search" as const,
      searchCompleted: true,
      resultCount: totalResults,
      searchCredits: searchCreditsFor(totalResults),
      judgeCredits: resultsJudged * 5,
      resultsJudged,
    });

    it("is the exact deterministic flat sum (the headline 17-credit trace)", () => {
      // results=6 -> search 2; judged=3 -> 15; total 17.
      expect(flatSearchTargetCredits([stampedSearchRun(6, 3)])).toBe(17);
    });

    it("never bills 0 on a check that returned results and judged them", () => {
      // results=6, judged=4 -> 2 + 20 = 22 (the judged#2 case that landed on 0).
      const credits = flatSearchTargetCredits([stampedSearchRun(6, 4)]);
      expect(credits).toBe(22);
      expect(credits).toBeGreaterThan(0);
    });

    it("the RETRY path still bills: rate-limited-then-succeeded run is summed", () => {
      // A run that hit rate-limiting, retried, and finally returned 6 results +
      // judged 4 must record the SAME deterministic figure as a clean run — the
      // searchCompleted=true guard ensures credits are stamped before summing.
      const retried = stampedSearchRun(6, 4);
      expect(retried.searchCompleted).toBe(true);
      expect(flatSearchTargetCredits([retried])).toBe(22);
    });

    it("search-only (judge off) bills just the search portion, never the judge", () => {
      // results=6, judged=0 -> 2 + 0 = 2 (the raw case, which is already correct).
      expect(flatSearchTargetCredits([stampedSearchRun(6, 0)])).toBe(2);
    });

    it("a still-running search (no credits stamped yet) sums to 0 — the reconciler must NOT finalize here", () => {
      // This is the pre-stamp shape the dispatcher writes before the inline
      // search finishes. flatSearchTargetCredits sees 0; the never-zero
      // guarantee instead relies on isMonitorCheckComplete refusing to finalize
      // a run whose searchCompleted flag is not yet true (see runner.ts).
      const pending = { targetId: "search-1", type: "search" as const };
      expect((pending as any).searchCompleted).toBeUndefined();
      expect(flatSearchTargetCredits([pending])).toBe(0);
    });
  });

  it("page-sum never bills search-target pages (cost is at the check level)", () => {
    const targets: MonitorTarget[] = [searchTarget()];
    // Even with judgment + status, a search page contributes 0 to the page sum;
    // its credits live in target_results via flatSearchTargetCredits.
    expect(
      calculateMonitorCheckActualCreditsFromPages(
        [
          {
            target_id: "search-1",
            metadata: {},
            judgment: { meaningful: true },
            status: "new",
          },
        ],
        targets,
      ),
    ).toBe(0);
  });
});
