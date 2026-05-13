import { fetchVideo } from "../video";
import { config } from "../../../../config";

describe("fetchVideo", () => {
  const originalFetch = global.fetch;
  const originalAvgrabServiceUrl = config.AVGRAB_SERVICE_URL;

  afterEach(() => {
    global.fetch = originalFetch;
    config.AVGRAB_SERVICE_URL = originalAvgrabServiceUrl;
    jest.clearAllMocks();
  });

  function mockSuccessfulAvgrab() {
    const fetchSpy = jest.fn(async (url: string, _init?: RequestInit) => {
      if (url.endsWith("/supported-urls")) {
        return {
          ok: true,
          json: async () => ({ regex: "https://example\\.com/video" }),
        };
      }

      return {
        ok: true,
        json: async () => ({ public_url: "https://storage.example/video.mp4" }),
      };
    });

    global.fetch = fetchSpy as any;
    config.AVGRAB_SERVICE_URL = "https://avgrab.example";
    return fetchSpy;
  }

  it("does not issue any fetch when lockdown is true, even if video format is requested", async () => {
    const fetchSpy = jest.fn();
    global.fetch = fetchSpy as any;

    const meta: any = {
      url: "https://example.com/video",
      options: {
        lockdown: true,
        formats: [{ type: "video" }],
      },
      logger: { warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
    };
    const document: any = { markdown: "cached" };

    const result = await fetchVideo(meta, document);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result).toBe(document);
    expect(result.video).toBeUndefined();
  });

  it("returns early when video format is not requested regardless of lockdown", async () => {
    const fetchSpy = jest.fn();
    global.fetch = fetchSpy as any;

    const meta: any = {
      url: "https://example.com/video",
      options: {
        lockdown: false,
        formats: [{ type: "markdown" }],
      },
      logger: { warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
    };
    const document: any = { markdown: "cached" };

    await fetchVideo(meta, document);

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns a warning when avgrab is not configured", async () => {
    const fetchSpy = jest.fn();
    global.fetch = fetchSpy as any;
    config.AVGRAB_SERVICE_URL = undefined;

    const meta: any = {
      url: "https://example.com/video",
      options: {
        lockdown: false,
        formats: [{ type: "video" }],
      },
      logger: { warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
    };
    const document: any = {};

    const result = await fetchVideo(meta, document);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(meta.logger.warn).toHaveBeenCalledWith(
      "AVGRAB_SERVICE_URL is not configured",
    );
    expect(result.warning).toMatch(/Video format is not available/);
  });

  it("forwards browser cookies to avgrab when video cookies are available", async () => {
    const fetchSpy = mockSuccessfulAvgrab();
    const cookies = [
      {
        name: "VISITOR_INFO1_LIVE",
        value: "visitor",
        domain: ".youtube.com",
        path: "/",
        secure: true,
        httpOnly: true,
      },
    ];

    const meta: any = {
      url: "https://example.com/video",
      audioCookies: cookies,
      options: {
        lockdown: false,
        formats: [{ type: "video" }],
      },
      logger: { warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
    };
    const document: any = {};

    await fetchVideo(meta, document);

    const downloadCall = fetchSpy.mock.calls.find(([url]) =>
      String(url).endsWith("/download-video"),
    );
    expect(downloadCall).toBeDefined();
    const body = downloadCall![1]?.body;
    expect(typeof body).toBe("string");
    expect(JSON.parse(body as string)).toEqual({
      url: "https://example.com/video",
      cookies,
    });
    expect(document.video).toBe("https://storage.example/video.mp4");
  });

  it("omits cookies from the avgrab request when no video cookies are available", async () => {
    const fetchSpy = mockSuccessfulAvgrab();

    const meta: any = {
      url: "https://example.com/video",
      options: {
        lockdown: false,
        formats: [{ type: "video" }],
      },
      logger: { warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
    };
    const document: any = {};

    await fetchVideo(meta, document);

    const downloadCall = fetchSpy.mock.calls.find(([url]) =>
      String(url).endsWith("/download-video"),
    );
    expect(downloadCall).toBeDefined();
    const body = downloadCall![1]?.body;
    expect(typeof body).toBe("string");
    expect(JSON.parse(body as string)).toEqual({
      url: "https://example.com/video",
    });
  });

  it("rejects unsupported URLs", async () => {
    mockSuccessfulAvgrab();

    const meta: any = {
      url: "https://example.com/unsupported",
      options: {
        lockdown: false,
        formats: [{ type: "video" }],
      },
      logger: { warn: jest.fn(), info: jest.fn(), debug: jest.fn() },
    };
    const document: any = {};

    await expect(fetchVideo(meta, document)).rejects.toThrow(/video/i);
  });
});
