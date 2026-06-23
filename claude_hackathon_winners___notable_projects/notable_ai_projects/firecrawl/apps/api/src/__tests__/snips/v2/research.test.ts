import { config } from "../../../config";
import { describeIf, TEST_PRODUCTION } from "../lib";
import { creditUsage, idmux, researchRaw } from "./lib";
import { and, desc, eq } from "drizzle-orm";
import { db } from "../../../db/connection";
import * as schema from "../../../db/schema";

const HAS_RESEARCH = !!config.RESEARCH_PROXY_URL;
const KEYLESS_ENABLED =
  process.env.KEYLESS_REQUESTS_PER_DAY !== undefined &&
  process.env.KEYLESS_CREDITS_PER_DAY !== undefined;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const sleepForBilling = () => sleep(40000);

async function waitForSingleRow<T>(
  fetcher: () => Promise<T | null>,
  timeoutMs: number = 10000,
  intervalMs: number = 250,
): Promise<T | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const row = await fetcher();
    if (row) return row;
    await sleep(intervalMs);
  }
  return null;
}

describeIf(HAS_RESEARCH)("Research API", () => {
  it("serves paper search from the canonical mount", async () => {
    const identity = await idmux({
      name: "research/canonical paper search",
      credits: 100,
    });

    const res = await researchRaw(
      "/v2/search/research/papers",
      { query: "retrieval augmented generation", k: 2 },
      identity,
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.results)).toBe(true);
    expect(res.body.results.length).toBeGreaterThan(0);
    expect(res.body.results[0].paperId).toBeDefined();
    expect(res.body.results[0].paper_id).toBeUndefined();
  }, 120000);

  it("keeps the legacy research mount working", async () => {
    const identity = await idmux({
      name: "research/legacy paper search",
      credits: 100,
    });

    const res = await researchRaw(
      "/v2/research/papers",
      { query: "diffusion models", k: 1 },
      identity,
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.results)).toBe(true);
    expect(res.body.results[0].paperId).toBeDefined();
    expect(res.body.results[0].paper_id).toBe(res.body.results[0].paperId);
  }, 120000);

  it("rejects invalid endpoint-specific query params", async () => {
    const identity = await idmux({
      name: "research/invalid params",
      credits: 100,
    });

    const res = await researchRaw(
      "/v2/search/research/papers",
      { query: "rag", magic: "true" } as any,
      identity,
    );

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("rejects paper inspect k without read query", async () => {
    const identity = await idmux({
      name: "research/inspect rejects k",
      credits: 100,
    });

    const res = await researchRaw(
      "/v2/search/research/papers/1706.03762",
      { k: 1 },
      identity,
    );

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("logs research origin from X-Origin and integration from query", async () => {
    if (!config.USE_DB_AUTHENTICATION) return;

    const identity = await idmux({
      name: "research/logs metadata",
      credits: 100,
    });
    const query = `research metadata ${Date.now()}`;

    const res = await researchRaw(
      "/v2/search/research/papers",
      { query, k: 1, integration: "_research_test" },
      identity,
      { "X-Origin": "mcp" },
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const requestLog = await waitForSingleRow<{
      origin: string | null;
      integration: string | null;
    }>(async () => {
      const data = await db
        .select({
          origin: schema.requests.origin,
          integration: schema.requests.integration,
        })
        .from(schema.requests)
        .where(
          and(
            eq(schema.requests.team_id, identity.teamId),
            eq(schema.requests.kind, "research_paper_search"),
            eq(schema.requests.target_hint, query),
          ),
        )
        .orderBy(desc(schema.requests.created_at))
        .limit(1);
      return data[0] ?? null;
    });

    expect(requestLog).not.toBeNull();
    expect(requestLog?.origin).toBe("mcp");
    expect(requestLog?.integration).toBe("_research_test");
  }, 120000);

  it("rejects invalid research integration values", async () => {
    const identity = await idmux({
      name: "research/invalid integration",
      credits: 100,
    });

    const res = await researchRaw(
      "/v2/search/research/papers",
      { query: "rag", integration: "invalid-integration" },
      identity,
    );

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  describeIf(KEYLESS_ENABLED)("keyless research", () => {
    it("permits keyless access on the canonical research index", async () => {
      const res = await researchRaw("/v2/search/research/papers", {
        query: "transformers",
        k: 1,
      });

      expect(res.statusCode).not.toBe(401);
    }, 120000);
  });

  describeIf(TEST_PRODUCTION)("research billing", () => {
    it("bills read-paper as one scrape-like credit", async () => {
      const identity = await idmux({
        name: "research/bills read paper",
        credits: 100,
      });
      const before = (await creditUsage(identity)).remainingCredits;

      const res = await researchRaw(
        "/v2/search/research/papers/1706.03762",
        { query: "attention", k: 1 },
        identity,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      await sleepForBilling();
      const after = (await creditUsage(identity)).remainingCredits;
      expect(before - after).toBe(1);
    }, 180000);

    it("bills search-like endpoints by returned result count", async () => {
      const identity = await idmux({
        name: "research/bills search papers",
        credits: 100,
      });
      const before = (await creditUsage(identity)).remainingCredits;

      const res = await researchRaw(
        "/v2/search/research/papers",
        { query: "graph neural networks", k: 11 },
        identity,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.results.length).toBeGreaterThan(0);
      const expectedCredits = Math.ceil(res.body.results.length / 10) * 2;

      await sleepForBilling();
      const after = (await creditUsage(identity)).remainingCredits;
      expect(before - after).toBe(expectedCredits);
    }, 180000);
  });
});
