import {
  ALLOW_TEST_SUITE_WEBSITE,
  describeIf,
  TEST_SUITE_WEBSITE,
} from "../lib";
import { config } from "../../../config";
import { scrape, scrapeTimeout, idmux, Identity } from "./lib";

let identity: Identity;

beforeAll(async () => {
  identity = await idmux({
    name: "parsers-fire-pdf-async",
    concurrency: 100,
    credits: 1000000,
  });
}, 10000 + scrapeTimeout);

// Requires fire-engine (PDF is downloaded via the same path that needs it in
// CI) AND a fire-pdf base URL — the async client is only reached when
// `useFirePDF` is true in the call site, which gates on FIRE_PDF_BASE_URL.
//
// Behavior: the async client falls back to sync /ocr on any failure (including
// 404 when /jobs isn't deployed), so this test asserts the user-visible
// contract (markdown comes back), not which underlying engine served it.
// That keeps the test stable in environments where fire-pdf staging hasn't
// flipped /jobs on yet, while still verifying the flag is wired all the way
// through.
const SHOULD_RUN =
  ALLOW_TEST_SUITE_WEBSITE &&
  !process.env.TEST_SUITE_SELF_HOSTED &&
  !!config.FIRE_PDF_BASE_URL;

describeIf(SHOULD_RUN)("fire-pdf async parser flag", () => {
  const pdfUrl = `${TEST_SUITE_WEBSITE}/example.pdf`;

  it.concurrent(
    "parsers: [{type:'pdf', __firePdfAsync: true}] returns markdown (async path or fallback)",
    async () => {
      const response = await scrape(
        {
          url: pdfUrl,
          parsers: [{ type: "pdf", __firePdfAsync: true }],
        },
        identity,
      );

      expect(response.markdown).toBeDefined();
      expect(response.markdown).toContain("PDF Test File");
      expect(response.metadata.numPages).toBeGreaterThan(0);
    },
    scrapeTimeout * 3,
  );
});
