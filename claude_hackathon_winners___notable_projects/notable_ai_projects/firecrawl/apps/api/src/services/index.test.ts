import { vi } from "vitest";

const { file, bucket, getSavedPayload, setSavedPayload } = vi.hoisted(() => {
  let savedPayload = "";
  const getSavedPayload = () => savedPayload;
  const setSavedPayload = (value: string) => {
    savedPayload = value;
  };
  const file = vi.fn(() => ({
    save: vi.fn(async (payload: string) => {
      savedPayload = payload;
    }),
    download: vi.fn(async () => [Buffer.from(savedPayload)]),
  }));
  const bucket = vi.fn(() => ({ file }));

  return { file, bucket, getSavedPayload, setSavedPayload };
});

vi.mock("../config", () => ({
  config: {
    GCS_INDEX_BUCKET_NAME: "index-bucket",
    GCS_MEDIA_BUCKET_NAME: "media-bucket",
  },
}));

vi.mock("../lib/gcs-jobs", () => ({
  storage: { bucket },
}));

vi.mock("../lib/otel-tracer", () => ({
  withSpan: vi.fn(async (_name, fn) => fn({})),
  setSpanAttributes: vi.fn(),
}));

vi.mock("../db/connection", () => ({
  dbIndex: {},
}));

vi.mock("../db/rpc", () => ({
  insertOmceJobIfNeeded: vi.fn(),
  queryIndexAtSplitLevel: vi.fn(),
  queryIndexAtDomainSplitLevel: vi.fn(),
  queryOmceSignatures: vi.fn(),
  queryEngpickerVerdict: vi.fn(),
  queryIndexAtSplitLevelWithMeta: vi.fn(),
  queryIndexAtDomainSplitLevelWithMeta: vi.fn(),
  queryDomainPriority: vi.fn(),
}));

vi.mock("./redis", () => ({
  redisEvictConnection: {},
}));

vi.mock("./index-cache", () => ({
  deriveIndexVariantKey: vi.fn(),
  upsertCachedIndexEntries: vi.fn(),
  useIndexCache: false,
}));

vi.mock("../db/schema", () => ({}));

import { getIndexFromGCS, saveIndexToGCS } from "./index";

describe("index GCS documents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setSavedPayload("");
  });

  it("persists native JSON payloads with cached index documents", async () => {
    await saveIndexToGCS("idx-1", {
      url: "https://www.example.com/profile",
      html: "# Example",
      json: { id: "person-1", full_name: "Example Person" },
      statusCode: 200,
      contentType: "text/markdown; charset=utf-8",
      proxyUsed: "basic",
    });

    expect(file).toHaveBeenCalledWith("idx-1.json");
    expect(JSON.parse(getSavedPayload()).json).toEqual({
      id: "person-1",
      full_name: "Example Person",
    });
  });

  it("reads native JSON payloads from cached index documents", async () => {
    setSavedPayload(
      JSON.stringify({
        url: "https://www.example.com/profile",
        html: "# Example",
        json: { id: "person-1", full_name: "Example Person" },
        statusCode: 200,
      }),
    );

    const doc = await getIndexFromGCS("idx-1.json");

    expect(doc?.json).toEqual({
      id: "person-1",
      full_name: "Example Person",
    });
  });
});
