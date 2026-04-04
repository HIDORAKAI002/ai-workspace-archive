jest.mock("uuid", () => ({
  v7: jest.fn(() => "job-1"),
}));

import { scrapeSearchResults } from "./scrape";
import { getJobPriority } from "../lib/job-priority";
import { processJobInternal } from "../services/worker/scrape-worker";

jest.mock("../lib/job-priority", () => ({
  getJobPriority: jest.fn().mockResolvedValue(10),
}));

jest.mock("../services/worker/scrape-worker", () => ({
  processJobInternal: jest.fn().mockResolvedValue({
    markdown: "body",
    metadata: { creditsUsed: 1, statusCode: 200, proxyUsed: "basic" },
  }),
}));

describe("scrapeSearchResults", () => {
  it("preserves billing metadata on spawned scrape jobs", async () => {
    await scrapeSearchResults(
      [
        {
          url: "https://example.com",
          title: "Example",
          description: "Desc",
        },
      ],
      {
        teamId: "team-1",
        origin: "api",
        timeout: 60_000,
        scrapeOptions: {} as any,
        apiKeyId: 123,
        requestId: "req-1",
        billing: { endpoint: "agent" },
      },
      { debug: jest.fn(), info: jest.fn(), error: jest.fn() } as any,
      null as any,
    );

    expect(getJobPriority).toHaveBeenCalledWith({
      team_id: "team-1",
      basePriority: 10,
    });
    expect(processJobInternal).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          billing: { endpoint: "agent" },
        }),
      }),
    );
  });
});
