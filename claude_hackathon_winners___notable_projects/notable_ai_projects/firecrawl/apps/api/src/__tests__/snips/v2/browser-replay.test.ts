import crypto from "crypto";
import { config } from "../../../config";
import {
  ALLOW_TEST_SUITE_WEBSITE,
  HAS_FIRE_ENGINE,
  TEST_PRODUCTION,
  TEST_SELF_HOST,
  TEST_SUITE_WEBSITE,
  itIf,
} from "../lib";
import {
  Identity,
  idmux,
  browserCreateRaw,
  browserExecuteRaw,
  browserDeleteRaw,
  browserReplayRaw,
  browserReplayPageRaw,
  scrapeTimeout,
} from "./lib";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe("Interact session replay", () => {
  let identity: Identity;
  let otherIdentity: Identity;

  beforeAll(async () => {
    identity = await idmux({
      name: "browser-replay",
      concurrency: 20,
      credits: 1_000_000,
    });
    otherIdentity = await idmux({
      name: "browser-replay-other",
      concurrency: 10,
      credits: 1_000_000,
    });
  }, 10000 + scrapeTimeout);

  const canRunReplayHappyPath =
    ALLOW_TEST_SUITE_WEBSITE &&
    !!config.BROWSER_SERVICE_URL &&
    (TEST_PRODUCTION || HAS_FIRE_ENGINE);

  itIf(canRunReplayHappyPath)(
    "records a session and serves replay metadata + HLS playlist after destroy",
    async () => {
      let sessionId: string | null = null;

      try {
        const createResponse = await browserCreateRaw(
          { ttl: 120, activityTtl: 120 },
          identity,
        );
        expect(createResponse.statusCode).toBe(200);
        expect(createResponse.body.success).toBe(true);
        sessionId = createResponse.body.id as string;

        // Generate on-screen activity so the screencast has frames to record.
        const executeResponse = await browserExecuteRaw(
          sessionId,
          {
            language: "node",
            timeout: 60,
            code: `
              await page.goto("${TEST_SUITE_WEBSITE}?testId=${crypto.randomUUID()}");
              console.log("navigated");
            `,
          },
          identity,
        );
        expect(executeResponse.statusCode).toBe(200);
        expect(executeResponse.body.success).toBe(true);

        // Wait past a segment boundary (10s) so at least one segment uploads.
        await sleep(15_000);
      } finally {
        if (sessionId) {
          await browserDeleteRaw(sessionId, identity);
        }
      }

      // Replay must be available after the session is destroyed.
      let replayResponse = await browserReplayRaw(sessionId!, identity);
      for (let i = 0; i < 10 && replayResponse.statusCode === 404; i++) {
        await sleep(2000);
        replayResponse = await browserReplayRaw(sessionId!, identity);
      }

      expect(replayResponse.statusCode).toBe(200);
      expect(replayResponse.body.success).toBe(true);
      expect(replayResponse.body.pageCount).toBeGreaterThan(0);
      expect(Array.isArray(replayResponse.body.pages)).toBe(true);

      const page = replayResponse.body.pages[0];
      expect(typeof page.pageId).toBe("string");
      expect(page.url).toBe(
        `/v2/interact/${sessionId}/replay/${page.pageId}`,
      );
      // pageUrl is the recorded page URL — should reflect where we navigated.
      expect(typeof page.pageUrl).toBe("string");
      expect(page.pageUrl).toContain(TEST_SUITE_WEBSITE);
      expect(page.endTimeMs).toBeGreaterThan(page.startTimeMs);

      const playlistResponse = await browserReplayPageRaw(
        sessionId!,
        page.pageId,
        identity,
      );
      expect(playlistResponse.statusCode).toBe(200);
      expect(playlistResponse.headers["content-type"]).toContain(
        "application/vnd.apple.mpegurl",
      );
      const playlist = playlistResponse.text as string;
      expect(playlist).toContain("#EXTM3U");
      expect(playlist).toContain("#EXT-X-ENDLIST");
      expect(playlist).toContain("https://");
    },
    scrapeTimeout + 60_000,
  );

  itIf(!TEST_SELF_HOST)(
    "returns 404 when the session does not exist",
    async () => {
      const response = await browserReplayRaw(crypto.randomUUID(), identity);

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Browser session not found.");
    },
  );

  itIf(!TEST_SELF_HOST)(
    "returns 400 for an invalid pageId",
    async () => {
      const response = await browserReplayPageRaw(
        crypto.randomUUID(),
        "not-a-page",
        identity,
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Invalid pageId.");
    },
  );

  itIf(canRunReplayHappyPath && !!config.IDMUX_URL)(
    "returns 403 when the session belongs to another team",
    async () => {
      if (identity.teamId === otherIdentity.teamId) {
        return;
      }

      let sessionId: string | null = null;
      try {
        const createResponse = await browserCreateRaw(
          { ttl: 60, activityTtl: 60 },
          identity,
        );
        expect(createResponse.statusCode).toBe(200);
        sessionId = createResponse.body.id as string;

        const response = await browserReplayRaw(sessionId, otherIdentity);
        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe("Forbidden.");
      } finally {
        if (sessionId) {
          await browserDeleteRaw(sessionId, identity);
        }
      }
    },
    scrapeTimeout,
  );
});
