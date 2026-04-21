import { sendDocumentToSearchIndex } from "../sendToSearchIndex";
import { indexDocumentIfEnabled } from "../../../../lib/search-index-client";
import { config } from "../../../../config";

jest.mock("../../../../lib/search-index-client", () => ({
  indexDocumentIfEnabled: jest.fn(),
}));

const mockedIndex = indexDocumentIfEnabled as jest.MockedFunction<
  typeof indexDocumentIfEnabled
>;

describe("sendDocumentToSearchIndex lockdown guard", () => {
  const originalEnabled = config.ENABLE_SEARCH_INDEX;
  const originalServiceUrl = config.SEARCH_SERVICE_URL;
  const originalSampleRate = config.SEARCH_INDEX_SAMPLE_RATE;

  beforeEach(() => {
    // Force the transformer past the "enabled" and "sampling" early-returns so
    // only the lockdown / should-index checks can stop it.
    (config as any).ENABLE_SEARCH_INDEX = true;
    (config as any).SEARCH_SERVICE_URL = "https://search.internal";
    (config as any).SEARCH_INDEX_SAMPLE_RATE = 1;
    mockedIndex.mockClear();
  });

  afterAll(() => {
    (config as any).ENABLE_SEARCH_INDEX = originalEnabled;
    (config as any).SEARCH_SERVICE_URL = originalServiceUrl;
    (config as any).SEARCH_INDEX_SAMPLE_RATE = originalSampleRate;
  });

  const baseDocument: any = {
    markdown: "a".repeat(500),
    rawHtml: "<html><body>x</body></html>",
    metadata: {
      statusCode: 200,
      indexId: "idx-123",
    },
  };

  const baseMeta = (overrides: Partial<Record<string, unknown>> = {}) =>
    ({
      url: "https://example.com/page",
      options: {
        lockdown: false,
        headers: undefined,
        mobile: false,
      },
      internalOptions: {
        isParse: false,
        zeroDataRetention: false,
      },
      logger: {
        warn: jest.fn(),
        info: jest.fn(),
        debug: jest.fn(),
        error: jest.fn(),
      },
      ...overrides,
    }) as any;

  it("does not forward the URL to the search service when lockdown is true", async () => {
    const meta = baseMeta({
      options: { lockdown: true, headers: undefined, mobile: false },
    });

    await sendDocumentToSearchIndex(meta, { ...baseDocument });

    // Fire-and-forget promise: give it a tick to settle.
    await new Promise(r => setImmediate(r));

    expect(mockedIndex).not.toHaveBeenCalled();
  });

  it("still forwards normal (non-lockdown) documents to the search service", async () => {
    const meta = baseMeta();

    await sendDocumentToSearchIndex(meta, { ...baseDocument });

    await new Promise(r => setImmediate(r));

    expect(mockedIndex).toHaveBeenCalledTimes(1);
    expect(mockedIndex.mock.calls[0][0].url).toBe("https://example.com/page");
  });
});
