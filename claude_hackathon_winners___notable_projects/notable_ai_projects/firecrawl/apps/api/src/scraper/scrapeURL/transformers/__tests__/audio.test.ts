import { fetchAudio } from "../audio";

describe("fetchAudio lockdown guard", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("does not issue any fetch when lockdown is true, even if audio format is requested", async () => {
    const fetchSpy = jest.fn();
    global.fetch = fetchSpy as any;

    const meta: any = {
      url: "https://example.com/audio",
      options: {
        lockdown: true,
        formats: [{ type: "audio" }],
      },
      logger: { warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
    };
    const document: any = { markdown: "cached" };

    const result = await fetchAudio(meta, document);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result).toBe(document);
    expect(result.audio).toBeUndefined();
  });

  it("returns early when audio format is not requested regardless of lockdown", async () => {
    const fetchSpy = jest.fn();
    global.fetch = fetchSpy as any;

    const meta: any = {
      url: "https://example.com/audio",
      options: {
        lockdown: false,
        formats: [{ type: "markdown" }],
      },
      logger: { warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
    };
    const document: any = { markdown: "cached" };

    await fetchAudio(meta, document);

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
