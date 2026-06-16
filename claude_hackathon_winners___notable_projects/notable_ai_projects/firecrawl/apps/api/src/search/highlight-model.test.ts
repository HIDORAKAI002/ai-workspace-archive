vi.mock("../config", () => ({
  config: {
    HIGHLIGHT_MODEL_URL: "https://highlight.test",
    HIGHLIGHT_MODEL_TOKEN: "secret-token",
  },
}));

import { generateHighlightsBatch } from "./highlight-model";

const logger = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
} as any;

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("generateHighlightsBatch", () => {
  it("returns [] without calling the service for an empty batch", async () => {
    const fetchMock = mockFetchOnce({ results: [] });
    const out = await generateHighlightsBatch([], { logger });
    expect(out).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts each page's spans as `lines` to /batch_highlight with the bearer token", async () => {
    const fetchMock = mockFetchOnce({
      results: [{ highlights: [] }, { highlights: [] }],
    });

    await generateHighlightsBatch(
      [
        { query: "q1", lines: ["a one", "b one"] },
        { query: "q2", lines: ["a two"] },
      ],
      { logger },
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://highlight.test/batch_highlight");
    expect(init.method).toBe("POST");
    expect(init.headers.Authorization).toBe("Bearer secret-token");

    const sent = JSON.parse(init.body);
    expect(sent.requests).toHaveLength(2);
    expect(sent.requests[0]).toMatchObject({
      query: "q1",
      lines: ["a one", "b one"],
    });
    // Threshold + top_k are sent; char budgeting is done client-side (group-aware),
    // so max_highlight_chars is intentionally NOT sent.
    expect(typeof sent.requests[0].threshold).toBe("number");
    expect(typeof sent.requests[0].top_k).toBe("number");
    expect(sent.requests[0].max_highlight_chars).toBeUndefined();
  });

  it("returns the scored spans per page, aligned by request order", async () => {
    mockFetchOnce({
      results: [
        {
          highlights: [
            { index: 0, score: 0.9 },
            { index: 2, score: 0.5 },
          ],
        },
        { highlights: [{ index: 1, score: 0.7 }] },
      ],
    });

    const out = await generateHighlightsBatch(
      [
        { query: "q1", lines: ["l0", "l1", "l2"] },
        { query: "q2", lines: ["l0", "l1"] },
      ],
      { logger },
    );

    expect(out).toEqual([
      [
        { index: 0, score: 0.9 },
        { index: 2, score: 0.5 },
      ],
      [{ index: 1, score: 0.7 }],
    ]);
  });

  it("returns an empty array for a page with no selected spans", async () => {
    mockFetchOnce({ results: [{ highlights: [] }, {}] });

    const out = await generateHighlightsBatch(
      [
        { query: "q", lines: ["a"] },
        { query: "q", lines: ["b"] },
      ],
      { logger },
    );

    expect(out).toEqual([[], []]);
  });

  it("ignores malformed (non-integer index / missing score) spans", async () => {
    mockFetchOnce({
      results: [
        {
          highlights: [
            { index: 1, score: 0.9 },
            { index: 4 }, // missing score
            { index: 2.5, score: 0.7 }, // non-integer index
            { index: 3, score: 0.6 },
          ],
        },
      ],
    });

    const out = await generateHighlightsBatch(
      [{ query: "q", lines: ["a", "b", "c", "d", "e"] }],
      { logger },
    );

    expect(out).toEqual([
      [
        { index: 1, score: 0.9 },
        { index: 3, score: 0.6 },
      ],
    ]);
  });

  it("falls back to nulls (one per item) when the service errors", async () => {
    mockFetchOnce({ error: "boom" }, false, 500);

    const out = await generateHighlightsBatch(
      [
        { query: "q", lines: ["a"] },
        { query: "q", lines: ["b"] },
      ],
      { logger },
    );

    expect(out).toEqual([null, null]);
    expect(logger.warn).toHaveBeenCalled();
  });
});
