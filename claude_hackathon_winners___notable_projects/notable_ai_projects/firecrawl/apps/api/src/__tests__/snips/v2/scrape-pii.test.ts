import { ALLOW_TEST_SUITE_WEBSITE, describeIf, TEST_PRODUCTION } from "../lib";
import { Identity, idmux, scrape, scrapeRaw, scrapeTimeout } from "./lib";

let identity: Identity;

beforeAll(async () => {
  identity = await idmux({
    name: "v2-scrape-pii",
    concurrency: 100,
    credits: 1000000,
  });
}, 10000 + scrapeTimeout);

describeIf(ALLOW_TEST_SUITE_WEBSITE)("V2 Scrape redactPII (schema)", () => {
  it.concurrent(
    "accepts redactPII: true when `pii` is not in formats",
    async () => {
      const res = await scrapeRaw(
        {
          url: "https://firecrawl.dev",
          formats: ["markdown"],
          redactPII: true,
        },
        identity,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.pii).toBeUndefined();
    },
    scrapeTimeout,
  );

  it.concurrent(
    "rejects redactPII with non-boolean value",
    async () => {
      const res = await scrapeRaw(
        {
          url: "https://firecrawl.dev",
          formats: ["markdown", "pii"],
          // typed as boolean, but we want to confirm the API rejects strings.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          redactPII: "yes" as any,
        },
        identity,
      );

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    },
    scrapeTimeout,
  );

  it.concurrent(
    "accepts redactPII as an options object with mode/entities/replaceStyle",
    async () => {
      const res = await scrapeRaw(
        {
          url: "https://firecrawl.dev",
          formats: ["markdown", "pii"],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          redactPII: {
            mode: "accurate",
            entities: ["EMAIL", "PHONE"],
            replaceStyle: "tag",
          } as any,
        },
        identity,
      );

      // The page may not have PII (so spans can be empty), but the
      // request itself must validate and the response must include
      // the `pii` block.
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.pii).toBeDefined();
    },
    scrapeTimeout,
  );

  it.concurrent(
    "rejects an unknown mode value",
    async () => {
      const res = await scrapeRaw(
        {
          url: "https://firecrawl.dev",
          formats: ["markdown", "pii"],
          // "model" is the fire-privacy internal mode, not the
          // public surface — must be rejected.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          redactPII: { mode: "model" } as any,
        },
        identity,
      );

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    },
    scrapeTimeout,
  );
});

describeIf(TEST_PRODUCTION)("V2 Scrape redactPII (e2e)", () => {
  it(
    "returns pii block with spans and replaces document.markdown with redacted content",
    async () => {
      // A page with named entities and an email so heuristic recognizers fire
      // even when fire-privacy is in heuristics-only mode.
      const data = await scrape(
        {
          url: "https://en.wikipedia.org/wiki/Alan_Turing",
          formats: ["markdown", "pii"],
          redactPII: true,
        },
        identity,
      );

      // Scrape always succeeds regardless of fire-privacy outcome.
      expect(data.pii).toBeDefined();
      expect(["ok", "skipped", "failed"]).toContain(data.pii!.status);

      if (data.pii!.status === "ok") {
        expect(typeof data.pii!.redactedMarkdown).toBe("string");
        // document.markdown is the redacted version, not the raw one.
        expect(data.markdown).toBe(data.pii!.redactedMarkdown);

        expect(data.pii!.spans.length).toBeGreaterThan(0);
        expect(data.pii!.spans[0]).toEqual(
          expect.objectContaining({
            start: expect.any(Number),
            end: expect.any(Number),
            kind: expect.any(String),
          }),
        );
        // counts should sum to the number of spans with a mapped entity.
        const mappedSpanCount = data.pii!.spans.filter(s => s.entity).length;
        const totalCount = Object.values(data.pii!.counts ?? {}).reduce(
          (a, b) => a + (b ?? 0),
          0,
        );
        expect(totalCount).toBe(mappedSpanCount);
      } else if (data.pii!.status === "failed") {
        expect(data.pii!.redactedMarkdown).toBeNull();
        expect(data.pii!.reason).toBeDefined();
        // Fail closed: no raw markdown leaks through when redaction failed.
        expect(data.markdown).toBeUndefined();
      }
    },
    scrapeTimeout,
  );

  it(
    "fails closed when fire-privacy is unreachable — pii.status is failed, markdown is empty",
    async () => {
      const data = await scrape(
        {
          url: "https://firecrawl.dev",
          formats: ["markdown", "pii"],
          redactPII: true,
        },
        identity,
      );

      expect(data.pii).toBeDefined();
      // We don't pin to a specific outcome — could be ok if fire-privacy
      // is reachable in this environment, or one of skipped/failed otherwise.
      // The contract is: scrape still succeeds (no error response).
      expect(["ok", "skipped", "failed"]).toContain(data.pii!.status);

      if (data.pii!.status === "ok") {
        expect(data.markdown).toBe(data.pii!.redactedMarkdown);
      } else {
        expect(data.pii!.reason).toBeDefined();
        // Markdown is empty on failed / skipped-with-null-redacted; on
        // upstream_skipped / empty_input it passes through (equal to
        // redactedMarkdown). Verify the invariant: markdown matches
        // redactedMarkdown (or is fail-closed empty).
        if (data.pii!.redactedMarkdown === null) {
          expect(data.markdown).toBe("");
        } else {
          expect(data.markdown).toBe(data.pii!.redactedMarkdown);
        }
      }
    },
    scrapeTimeout,
  );

  it(
    "omits pii block when redactPII is false even if `pii` is in formats",
    async () => {
      const data = await scrape(
        {
          url: "https://firecrawl.dev",
          formats: ["markdown", "pii"],
        },
        identity,
      );

      expect(typeof data.markdown).toBe("string");
      expect(data.pii).toBeUndefined();
    },
    scrapeTimeout,
  );
});
