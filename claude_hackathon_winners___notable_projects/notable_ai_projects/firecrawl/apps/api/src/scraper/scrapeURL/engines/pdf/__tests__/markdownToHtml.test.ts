import { safeMarkdownToHtml } from "../markdownToHtml";

const noopLogger = {
  warn: jest.fn(),
} as any;

describe("safeMarkdownToHtml", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    noopLogger.warn.mockClear();
  });

  it("converts simple markdown to HTML", async () => {
    const html = await safeMarkdownToHtml("# Hello", noopLogger, "test-1");
    expect(html).toContain("<h1>");
    expect(html).toContain("Hello");
  });

  it("does not throw on pathologically deep or large markdown", async () => {
    // 50,000 nested blockquotes
    const deep = "> ".repeat(50_000) + "content";
    const htmlDeep = await safeMarkdownToHtml(deep, noopLogger, "test-deep");
    expect(typeof htmlDeep).toBe("string");
    expect(htmlDeep.length).toBeGreaterThan(0);

    // ~200KB markdown table
    const row = "| " + "cell | ".repeat(10) + "\n";
    const header = row + "| " + "--- | ".repeat(10) + "\n";
    const table = header + row.repeat(5_000);
    expect(table.length).toBeGreaterThan(200_000);

    const htmlTable = await safeMarkdownToHtml(table, noopLogger, "test-table");
    expect(typeof htmlTable).toBe("string");
    expect(htmlTable.length).toBeGreaterThan(0);
  });

  it("falls back to escaped <pre> and logs a warning when marked.parse throws", async () => {
    // monkey-patch required since marked exports are non-configurable (can't use jest.spyOn)
    const markedModule = require("marked");
    const originalParse = markedModule.parse;
    markedModule.parse = () => {
      throw new RangeError("Maximum call stack size exceeded");
    };

    try {
      const input = '<script>alert("xss")</script> & "quotes" \'apos\'';
      const html = await safeMarkdownToHtml(input, noopLogger, "test-escape");

      expect(html.startsWith("<pre>")).toBe(true);
      expect(html).toContain("&lt;script&gt;");
      expect(html).toContain("&amp;");
      expect(html).toContain("&quot;quotes&quot;");
      expect(html).toContain("&#39;apos&#39;");
      expect(html).not.toContain("<script>");

      expect(noopLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining("marked.parse failed"),
        expect.objectContaining({
          scrapeId: "test-escape",
          markdownLength: expect.any(Number),
        }),
      );
    } finally {
      markedModule.parse = originalParse;
    }
  });
});
