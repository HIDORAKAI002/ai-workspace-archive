import type { Logger } from "winston";
import { type SearchVerdict, verdictJsonSchema, buildJudgePrompt } from "./judge";
import type { EventResolution } from "./llm";
import { canonicalizeUrl, stableSerpFingerprint } from "./dedupe";
import { scrapeRequestSchema } from "../../../controllers/v2/types";

// vi.mock is hoisted above declarations, so the mocks its factories reference
// are created in vi.hoisted() (also hoisted) to avoid any TDZ surprises.
const { searchMock, scrapePageMock, resolveEventMock, summarizeRunMock, materialDevMock } =
  vi.hoisted(() => ({
    searchMock: vi.fn(),
    scrapePageMock: vi.fn(),
    resolveEventMock: vi.fn(),
    summarizeRunMock: vi.fn(),
    materialDevMock: vi.fn(),
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
}));
vi.mock("./tuning", () => ({
  hasLlmProvider: () => false,
  googleProviderOptions: () => ({}),
}));

import { runSearchTarget, type KnownPage } from "./run";

const logger = {
  warn: vi.fn(),
  info: vi.fn(),
  error: vi.fn(),
} as unknown as Logger;

const verdict = (over: Partial<SearchVerdict> = {}): SearchVerdict => ({
  relevant: true,
  alertAction: "alert",
  concept: "openai-ipo",
  rationale: "filing confirmed",
  ...over,
});

const okScrape = (v: SearchVerdict) => ({
  json: v,
  markdown: "",
  metadata: {},
});

function setSearchResults(
  results: Array<{ url: string; title: string; description: string }>,
) {
  searchMock.mockResolvedValue(results);
}

function setVerdictsByUrl(map: Record<string, SearchVerdict>) {
  scrapePageMock.mockImplementation(({ url }: { url: string }) => {
    const v = map[url];
    if (!v) return Promise.resolve(null);
    return Promise.resolve(okScrape(v));
  });
}

const baseTarget = {
  id: "t1",
  queries: ["openai ipo"],
  searchWindow: "24h",
  alertMode: "first_match" as const,
  maxResults: 10,
};

const baseMonitor = {
  id: "m1",
  teamId: "team1",
  goal: "Alert when OpenAI files for IPO",
  subject: "OpenAI",
  judgeEnabled: true,
};

function run(
  over: {
    target?: Partial<typeof baseTarget> & { recheckAfter?: string };
    knownPages?: Map<string, KnownPage>;
    knownEvents?: EventResolution[] extends never
      ? never
      : { key: string; label: string }[];
    goalVersion?: string;
    alertMode?: "first_match" | "every_new_result" | "material_dev";
  } = {},
) {
  return runSearchTarget({
    monitor: baseMonitor,
    target: {
      ...baseTarget,
      ...over.target,
      alertMode: over.alertMode ?? baseTarget.alertMode,
    },
    monitorCheckId: "check-1",
    scrapePage: (...a: unknown[]) => scrapePageMock(...a),
    goalVersion: over.goalVersion ?? "gv1",
    knownPages: over.knownPages ?? new Map(),
    knownEvents: over.knownEvents ?? [],
    zeroDataRetention: false,
    logger,
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  resolveEventMock.mockResolvedValue({
    matchedKey: null,
    isNew: true,
    label: "OpenAI IPO",
    reason: "",
  });
  summarizeRunMock.mockResolvedValue({
    label: "meaningful",
    summary: "OpenAI filed for IPO.",
  });
  materialDevMock.mockResolvedValue({ material: false, reason: "" });
});

describe("runSearchTarget orchestration", () => {
  it("alerts on a new, relevant, fresh result", async () => {
    setSearchResults([
      {
        url: "https://sec.gov/openai",
        title: "OpenAI S-1",
        description: "filing",
      },
    ]);
    setVerdictsByUrl({ "https://sec.gov/openai": verdict() });

    const out = await run();

    expect(out.matches).toBe(1);
    expect(out.sources[0].status).toBe("alert");
    expect(out.sources[0].eventKey).toBeTruthy();
    expect(out.pageUpserts[0].status).toBe("alert");
    expect(out.summary).toBe("OpenAI filed for IPO.");
    expect(scrapePageMock).toHaveBeenCalledTimes(1);
  });

  it("skips scrape/judge for an already-seen unchanged page (same goalVersion)", async () => {
    setSearchResults([
      {
        url: "https://sec.gov/openai",
        title: "OpenAI S-1",
        description: "filing",
      },
    ]);
    const canonical = canonicalizeUrl("https://sec.gov/openai");
    const fingerprint = stableSerpFingerprint({
      url: "https://sec.gov/openai",
      title: "OpenAI S-1",
      snippet: "filing",
    });
    const knownPages = new Map<string, KnownPage>([
      [canonical, { fingerprint, goalVersion: "gv1", lastStatus: "alert" }],
    ]);

    const out = await run({ knownPages });

    expect(out.sources[0].status).toBe("already_seen");
    expect(out.pageUpserts[0].status).toBe("already_seen");
    expect(scrapePageMock).not.toHaveBeenCalled();
    expect(out.matches).toBe(0);
  });

  it("reuse upsert preserves prior event metadata (eventKey survives unchanged pages)", async () => {
    setSearchResults([
      {
        url: "https://sec.gov/openai",
        title: "OpenAI S-1",
        description: "filing",
      },
    ]);
    const canonical = canonicalizeUrl("https://sec.gov/openai");
    const fingerprint = stableSerpFingerprint({
      url: "https://sec.gov/openai",
      title: "OpenAI S-1",
      snippet: "filing",
    });
    const knownPages = new Map<string, KnownPage>([
      [
        canonical,
        {
          fingerprint,
          goalVersion: "gv1",
          lastStatus: "alert",
          metadata: {
            fingerprint,
            goalVersion: "gv1",
            searchStatus: "alert",
            eventKey: "evt-1",
            eventLabel: "OpenAI IPO",
            eventSatisfiedAt: "2026-06-01T00:00:00Z",
            eventAlertCount: 2,
          },
        },
      ],
    ]);

    const out = await run({ knownPages });

    expect(scrapePageMock).not.toHaveBeenCalled();
    expect(out.pageUpserts[0].status).toBe("already_seen");
    expect(out.pageUpserts[0].metadata).toMatchObject({
      eventKey: "evt-1",
      eventLabel: "OpenAI IPO",
      eventSatisfiedAt: "2026-06-01T00:00:00Z",
      eventAlertCount: 2,
      fingerprint,
      goalVersion: "gv1",
      searchStatus: "already_seen",
    });
  });

  it("mirrors the search-internal status into metadata and marks deep judgments scraped", async () => {
    setSearchResults([
      {
        url: "https://sec.gov/openai",
        title: "OpenAI S-1",
        description: "filing",
      },
      {
        url: "https://old.com/openai",
        title: "OpenAI old news",
        description: "2019",
      },
      {
        url: "https://spam.com/x",
        title: "irrelevant",
        description: "noise",
      },
    ]);
    setVerdictsByUrl({
      "https://sec.gov/openai": verdict(),
      "https://old.com/openai": verdict({ alertAction: "watch" }),
      "https://spam.com/x": verdict({ relevant: false }),
    });

    const out = await run();

    const byStatus = (status: string) =>
      out.pageUpserts.find(u => u.status === status)!;
    for (const status of ["alert", "watching", "ignored"]) {
      expect(byStatus(status).metadata.searchStatus).toBe(status);
      expect(byStatus(status).scraped).toBe(true);
    }
  });

  it("re-evaluates a known page when the goalVersion changed (stale memory)", async () => {
    setSearchResults([
      {
        url: "https://sec.gov/openai",
        title: "OpenAI S-1",
        description: "filing",
      },
    ]);
    setVerdictsByUrl({ "https://sec.gov/openai": verdict() });
    const canonical = canonicalizeUrl("https://sec.gov/openai");
    const fingerprint = stableSerpFingerprint({
      url: "https://sec.gov/openai",
      title: "OpenAI S-1",
      snippet: "filing",
    });
    const knownPages = new Map<string, KnownPage>([
      [canonical, { fingerprint, goalVersion: "gv1" }],
    ]);

    const out = await run({ knownPages, goalVersion: "gv2" });

    expect(scrapePageMock).toHaveBeenCalledTimes(1);
    expect(out.sources[0].status).toBe("alert");
  });

  it("first_match: suppresses a second result resolving to the same event", async () => {
    setSearchResults([
      {
        url: "https://sec.gov/openai",
        title: "OpenAI S-1",
        description: "filing",
      },
      {
        url: "https://nytimes.com/openai-ipo",
        title: "OpenAI to IPO",
        description: "report",
      },
    ]);
    setVerdictsByUrl({
      "https://sec.gov/openai": verdict(),
      "https://nytimes.com/openai-ipo": verdict({ concept: "openai-ipo" }),
    });
    resolveEventMock
      .mockResolvedValueOnce({
        matchedKey: null,
        isNew: true,
        label: "OpenAI IPO",
        reason: "",
      })
      .mockResolvedValueOnce({
        matchedKey: "00000000-0000-7000-8000-000000000000",
        isNew: false,
        label: "OpenAI IPO",
        reason: "same",
      });

    const out = await run({ alertMode: "first_match" });

    const statuses = out.sources.map(s => s.status);
    expect(statuses).toContain("alert");
    expect(statuses).toContain("already_seen");
    expect(out.matches).toBe(1);
    // the suppressed result was still deep-scraped and judged
    const seen = out.pageUpserts.find(u => u.status === "already_seen")!;
    expect(seen.scraped).toBe(true);
    expect(seen.metadata.searchStatus).toBe("already_seen");
  });

  it("mints a stable opaque key for new events (not a label slug)", async () => {
    setSearchResults([
      {
        url: "https://sec.gov/openai",
        title: "OpenAI S-1",
        description: "filing",
      },
    ]);
    setVerdictsByUrl({ "https://sec.gov/openai": verdict() });
    resolveEventMock.mockResolvedValue({
      matchedKey: null,
      isNew: true,
      label: "OpenAI's IPO Filing!!!",
      reason: "",
    });
    const out = await run();
    expect(out.sources[0].eventKey).toBe(
      "00000000-0000-7000-8000-000000000000",
    );
    expect(out.pageUpserts[0].metadata.eventLabel).toBe(
      "OpenAI's IPO Filing!!!",
    );
  });

  it("reuses a matched event's key even when the new label differs (no drift)", async () => {
    setSearchResults([
      {
        url: "https://reuters.com/openai",
        title: "Reuters: OpenAI IPO",
        description: "report",
      },
    ]);
    setVerdictsByUrl({ "https://reuters.com/openai": verdict() });
    resolveEventMock.mockResolvedValue({
      matchedKey: "evt-stable-123",
      isNew: false,
      label: "A completely reworded label",
      reason: "same event",
    });
    const out = await run({
      knownEvents: [{ key: "evt-stable-123", label: "OpenAI IPO" }],
    });
    expect(out.sources[0].eventKey).toBe("evt-stable-123");
    expect(out.pageUpserts[0].metadata.eventLabel).toBe("OpenAI IPO");
  });

  it("keeps a judge-watched (e.g. old-news) verdict at watch (no notify)", async () => {
    setSearchResults([
      {
        url: "https://old.com/openai",
        title: "OpenAI old news",
        description: "2019",
      },
    ]);
    setVerdictsByUrl({
      "https://old.com/openai": verdict({ alertAction: "watch" }),
    });

    const out = await run();

    expect(out.sources[0].status).toBe("watching");
    expect(out.matches).toBe(0);
    expect(resolveEventMock).not.toHaveBeenCalled();
  });

  it("marks a result skipped when the scrape fails", async () => {
    setSearchResults([
      { url: "https://dead.com/x", title: "x", description: "y" },
    ]);
    scrapePageMock.mockResolvedValue(null);

    const out = await run();

    expect(out.sources[0].status).toBe("skipped");
    expect(out.skipped).toBe(1);
    expect(out.matches).toBe(0);
  });

  it("dedups the same canonical URL returned by two queries", async () => {
    setSearchResults([
      {
        url: "https://sec.gov/openai",
        title: "OpenAI S-1",
        description: "filing",
      },
      {
        url: "https://www.SEC.gov/openai/",
        title: "OpenAI S-1",
        description: "filing",
      },
    ]);
    setVerdictsByUrl({ "https://sec.gov/openai": verdict() });

    const out = await run();

    expect(out.resultCount).toBe(1);
    expect(scrapePageMock).toHaveBeenCalledTimes(1);
  });
});

describe("scrape payload validity (real validator, no mocks)", () => {
  it("scrapeRequestSchema accepts the verdict json format the runner sends", () => {
    const parsed = scrapeRequestSchema.parse({
      url: "https://example.com",
      formats: [
        {
          type: "json",
          schema: verdictJsonSchema,
          prompt: buildJudgePrompt("goal", "subject", "24h"),
        },
      ],
      timeout: 20000,
      origin: "monitor",
    });
    const jsonFormat = (parsed.formats as Array<{ type: string }>).find(
      f => f.type === "json",
    );
    expect(jsonFormat).toBeTruthy();
    expect((jsonFormat as { prompt?: string }).prompt).toContain("goal");
  });
});

describe("material_dev alert mode", () => {
  const serp = [
    {
      url: "https://reuters.com/openai",
      title: "OpenAI prices IPO",
      description: "priced",
    },
  ];
  beforeEach(() => {
    setSearchResults(serp);
    setVerdictsByUrl({ "https://reuters.com/openai": verdict() });
    resolveEventMock.mockResolvedValue({
      matchedKey: "evt-1",
      isNew: false,
      label: "OpenAI IPO",
      reason: "same",
    });
  });

  it("re-alerts on a material development of a known event", async () => {
    materialDevMock.mockResolvedValue({ material: true, reason: "now priced" });
    const out = await run({
      alertMode: "material_dev",
      knownEvents: [{ key: "evt-1", label: "OpenAI IPO" }],
    });
    expect(out.matches).toBe(1);
    expect(out.sources[0].status).toBe("alert");
  });

  it("suppresses a non-material retelling of a known event", async () => {
    materialDevMock.mockResolvedValue({
      material: false,
      reason: "just a retelling",
    });
    const out = await run({
      alertMode: "material_dev",
      knownEvents: [{ key: "evt-1", label: "OpenAI IPO" }],
    });
    expect(out.matches).toBe(0);
    expect(out.sources[0].status).toBe("already_seen");
  });
});

describe("re-judge cadence", () => {
  const url = "https://sec.gov/openai";
  const fp = stableSerpFingerprint({
    url,
    title: "OpenAI S-1",
    snippet: "filing",
  });
  const serp = [{ url, title: "OpenAI S-1", description: "filing" }];
  const old = new Date(Date.now() - 48 * 3600_000).toISOString();
  const recent = new Date(Date.now() - 1000).toISOString();

  it("re-judges a live page whose last check is older than recheckAfter (SERP unchanged)", async () => {
    setSearchResults(serp);
    setVerdictsByUrl({ [url]: verdict() });
    const knownPages = new Map<string, KnownPage>([
      [
        canonicalizeUrl(url),
        {
          fingerprint: fp,
          goalVersion: "gv1",
          lastCheckedAt: old,
          lastStatus: "watching",
        },
      ],
    ]);
    const out = await run({ target: { recheckAfter: "24h" }, knownPages });
    expect(scrapePageMock).toHaveBeenCalledTimes(1);
    expect(out.sources[0].status).toBe("alert");
  });

  it("does NOT re-judge when the last check is within recheckAfter", async () => {
    setSearchResults(serp);
    setVerdictsByUrl({ [url]: verdict() });
    const knownPages = new Map<string, KnownPage>([
      [
        canonicalizeUrl(url),
        {
          fingerprint: fp,
          goalVersion: "gv1",
          lastCheckedAt: recent,
          lastStatus: "watching",
        },
      ],
    ]);
    const out = await run({ target: { recheckAfter: "24h" }, knownPages });
    expect(scrapePageMock).not.toHaveBeenCalled();
    expect(out.sources[0].status).toBe("watching");
  });
});

describe("domain scoping", () => {
  beforeEach(() => setSearchResults([]));

  it("includeDomains and excludeDomains combine; exclude wins in the query", async () => {
    await run({
      target: {
        includeDomains: ["reuters.com", "spam.example"],
        excludeDomains: ["spam.example"],
      } as Partial<typeof baseTarget>,
    });
    const sentQuery = searchMock.mock.calls[0][0].query as string;
    expect(sentQuery).toContain("(site:reuters.com OR site:spam.example)");
    expect(sentQuery).toContain("-site:spam.example");
  });

  it("excluded hosts returned by the provider are dropped before judging", async () => {
    setSearchResults([
      {
        url: "https://www.pinterest.com/pin/1",
        title: "pin",
        description: "x",
      },
      {
        url: "https://boards.pinterest.com/pin/2",
        title: "pin",
        description: "x",
      },
      {
        url: "https://news.com/openai",
        title: "OpenAI files S-1",
        description: "x",
      },
    ]);
    setVerdictsByUrl({ "https://news.com/openai": verdict() });
    const out = await run({
      target: { excludeDomains: ["pinterest.com"] } as Partial<
        typeof baseTarget
      >,
    });
    expect(out.resultCount).toBe(1);
    expect(out.sources.map(s => s.url)).toEqual(["https://news.com/openai"]);
    expect(scrapePageMock).toHaveBeenCalledTimes(1);
  });
});
