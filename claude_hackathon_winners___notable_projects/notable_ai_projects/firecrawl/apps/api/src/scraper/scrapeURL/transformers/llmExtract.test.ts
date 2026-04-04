import { removeDefaultProperty } from "./llmExtract";
import { trimToTokenLimit } from "./llmExtract";
import { performSummary } from "./llmExtract";
import { performCleanContent } from "./llmExtract";
import { encoding_for_model } from "@dqbd/tiktoken";

jest.mock("@dqbd/tiktoken", () => ({
  encoding_for_model: jest.fn(),
}));

describe("removeDefaultProperty", () => {
  it("should remove the default property from a simple object", () => {
    const input = { default: "test", test: "test" };
    const expectedOutput = { test: "test" };
    expect(removeDefaultProperty(input)).toEqual(expectedOutput);
  });

  it("should remove the default property from a nested object", () => {
    const input = {
      default: "test",
      nested: { default: "nestedTest", test: "nestedTest" },
    };
    const expectedOutput = { nested: { test: "nestedTest" } };
    expect(removeDefaultProperty(input)).toEqual(expectedOutput);
  });

  it("should remove the default property from an array of objects", () => {
    const input = {
      array: [
        { default: "test1", test: "test1" },
        { default: "test2", test: "test2" },
      ],
    };
    const expectedOutput = { array: [{ test: "test1" }, { test: "test2" }] };
    expect(removeDefaultProperty(input)).toEqual(expectedOutput);
  });

  it("should handle objects without a default property", () => {
    const input = { test: "test" };
    const expectedOutput = { test: "test" };
    expect(removeDefaultProperty(input)).toEqual(expectedOutput);
  });

  it("should handle null and non-object inputs", () => {
    expect(removeDefaultProperty(null)).toBeNull();
    expect(removeDefaultProperty("string")).toBe("string");
    expect(removeDefaultProperty(123)).toBe(123);
  });
});

describe("trimToTokenLimit", () => {
  const mockEncode = jest.fn();
  const mockFree = jest.fn();
  const mockEncoder = {
    encode: mockEncode,
    free: mockFree,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (encoding_for_model as jest.Mock).mockReturnValue(mockEncoder);
  });

  it("should return original text if within token limit", () => {
    const text = "This is a test text";
    mockEncode.mockReturnValue(new Array(5)); // Simulate 5 tokens

    const result = trimToTokenLimit(text, 10, "gpt-4o");

    expect(result).toEqual({
      text,
      numTokens: 5,
      warning: undefined,
    });
    expect(mockEncode).toHaveBeenCalledWith(text);
    expect(mockFree).toHaveBeenCalled();
  });

  it("should trim text and return warning when exceeding token limit", () => {
    const text = "This is a longer text that needs to be trimmed";
    mockEncode
      .mockReturnValueOnce(new Array(20)) // First call for full text
      .mockReturnValueOnce(new Array(8)); // Second call for trimmed text

    const result = trimToTokenLimit(text, 10, "gpt-4o");

    expect(result.text.length).toBeLessThan(text.length);
    expect(result.numTokens).toBe(8);
    expect(result.warning).toContain("automatically trimmed");
    expect(mockEncode).toHaveBeenCalledTimes(2);
    expect(mockFree).toHaveBeenCalled();
  });

  it("should append previous warning if provided", () => {
    const text = "This is a test text that is too long";
    const previousWarning = "Previous warning message";
    mockEncode
      .mockReturnValueOnce(new Array(15))
      .mockReturnValueOnce(new Array(8));

    const result = trimToTokenLimit(text, 10, "gpt-4o", previousWarning);

    expect(result.warning).toContain("automatically trimmed");
    expect(result.warning).toContain(previousWarning);
  });

  it("should use fallback approach when encoder throws error", () => {
    const text = "This is some text to test fallback";
    mockEncode.mockImplementation(() => {
      throw new Error("Encoder error");
    });

    const result = trimToTokenLimit(text, 10, "gpt-4o");

    expect(result.text.length).toBeLessThanOrEqual(30); // 10 tokens * 3 chars per token
    expect(result.numTokens).toBe(10);
    expect(result.warning).toContain("Failed to derive number of LLM tokens");
  });

  it("should handle empty text", () => {
    const text = "";
    mockEncode.mockReturnValue([]);

    const result = trimToTokenLimit(text, 10, "gpt-4o");

    expect(result).toEqual({
      text: "",
      numTokens: 0,
      warning: undefined,
    });
    expect(mockFree).toHaveBeenCalled();
  });

  it("should handle large token limits (128k)", () => {
    const text = "A".repeat(384000); // Assuming ~3 chars per token, this would be ~128k tokens
    mockEncode
      .mockReturnValueOnce(new Array(130000)) // First check shows it's too long
      .mockReturnValueOnce(new Array(127000)); // Second check shows it's within limit after trim

    const result = trimToTokenLimit(text, 128000, "gpt-4o");

    expect(result.text.length).toBeLessThan(text.length);
    expect(result.numTokens).toBe(127000);
    expect(result.warning).toContain("automatically trimmed");
    expect(mockEncode).toHaveBeenCalledTimes(2);
    expect(mockFree).toHaveBeenCalled();
  });

  it("should handle large token limits (512k) with 32k context window", () => {
    const text = "A".repeat(1536000); // Assuming ~3 chars per token, this would be ~512k tokens
    mockEncode
      .mockReturnValueOnce(new Array(520000)) // First check shows it's too long
      .mockReturnValueOnce(new Array(32000)); // Second check shows it's within context limit after trim

    const result = trimToTokenLimit(text, 32000, "gpt-4o");

    expect(result.text.length).toBeLessThan(text.length);
    expect(result.numTokens).toBe(32000);
    expect(result.warning).toContain("automatically trimmed");
    expect(mockEncode).toHaveBeenCalledTimes(2);
    expect(mockFree).toHaveBeenCalled();
  });

  it("should preserve text when under token limit", () => {
    const text = "Short text";
    mockEncode.mockReturnValue(new Array(5)); // 5 tokens

    const result = trimToTokenLimit(text, 10, "gpt-4o");

    expect(result.text).toBe(text);
    expect(result.numTokens).toBe(5);
    expect(result.warning).toBeUndefined();
    expect(mockFree).toHaveBeenCalled();
  });

  it("should append new warning to previous warning", () => {
    const text = "A".repeat(300);
    const previousWarning = "Previous warning message";
    mockEncode
      .mockReturnValueOnce(new Array(100))
      .mockReturnValueOnce(new Array(50));

    const result = trimToTokenLimit(text, 50, "gpt-4o", previousWarning);

    expect(result.warning).toContain("automatically trimmed");
    expect(result.warning).toContain(previousWarning);
    expect(mockFree).toHaveBeenCalled();
  });

  it("should handle encoder initialization failure gracefully", () => {
    const text = "Sample text";
    (encoding_for_model as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Encoder initialization failed");
    });

    const result = trimToTokenLimit(text, 10, "gpt-4o");

    expect(result.text.length).toBeLessThanOrEqual(30); // 10 tokens * 3 chars
    expect(result.warning).toContain("Failed to derive number of LLM tokens");
    expect(mockFree).not.toHaveBeenCalled();
  });

  it("should handle encoding errors during trimming", () => {
    const text = "Sample text";
    mockEncode.mockImplementation(() => {
      throw new Error("Encoding failed");
    });

    const result = trimToTokenLimit(text, 10, "gpt-4o");

    expect(result.text.length).toBeLessThanOrEqual(30);
    expect(result.warning).toContain("Failed to derive number of LLM tokens");
    expect(mockFree).toHaveBeenCalled();
  });

  it("should handle very small token limits", () => {
    const text = "This is a test sentence that should be trimmed significantly";
    mockEncode
      .mockReturnValueOnce(new Array(20))
      .mockReturnValueOnce(new Array(3));

    const result = trimToTokenLimit(text, 3, "gpt-4o");

    expect(result.text.length).toBeLessThan(text.length);
    expect(result.numTokens).toBe(3);
    expect(result.warning).toContain("automatically trimmed");
    expect(mockFree).toHaveBeenCalled();
  });

  it("should handle unicode characters", () => {
    const text = "Hello 👋 World 🌍";
    mockEncode
      .mockReturnValueOnce(new Array(8))
      .mockReturnValueOnce(new Array(4));

    const result = trimToTokenLimit(text, 4, "gpt-4o");

    expect(result.text.length).toBeLessThan(text.length);
    expect(result.numTokens).toBe(4);
    expect(result.warning).toContain("automatically trimmed");
    expect(mockFree).toHaveBeenCalled();
  });

  it("should handle multiple trimming iterations", () => {
    const text = "A".repeat(1000);
    mockEncode
      .mockReturnValueOnce(new Array(300))
      .mockReturnValueOnce(new Array(200))
      .mockReturnValueOnce(new Array(100))
      .mockReturnValueOnce(new Array(50));

    const result = trimToTokenLimit(text, 50, "gpt-4o");

    expect(result.text.length).toBeLessThan(text.length);
    expect(result.numTokens).toBe(50);
    expect(result.warning).toContain("automatically trimmed");
    expect(mockEncode).toHaveBeenCalledTimes(4);
    expect(mockFree).toHaveBeenCalled();
  });

  it("should handle exact token limit match", () => {
    const text = "Exact token limit text";
    mockEncode.mockReturnValue(new Array(10));

    const result = trimToTokenLimit(text, 10, "gpt-4o");

    expect(result.text).toBe(text);
    expect(result.numTokens).toBe(10);
    expect(result.warning).toBeUndefined();
    expect(mockFree).toHaveBeenCalled();
  });
});

describe("performSummary", () => {
  it("should skip summary generation and add warning when markdown is empty", async () => {
    const mockMeta = {
      options: { formats: [{ type: "summary" }] },
      internalOptions: { zeroDataRetention: false, teamId: "test-team" },
      logger: {
        child: jest.fn(() => ({
          info: jest.fn(),
        })),
      },
      costTracking: {},
      id: "test-id",
    } as any;

    const document = {
      markdown: "",
    } as any;

    const result = await performSummary(mockMeta, document);

    expect(result.summary).toBeUndefined();
    expect(result.warning).toContain(
      "Summary generation was skipped because the markdown content is empty",
    );
  });

  it("should skip summary generation when markdown is whitespace-only", async () => {
    const mockMeta = {
      options: { formats: [{ type: "summary" }] },
      internalOptions: { zeroDataRetention: false, teamId: "test-team" },
      logger: {
        child: jest.fn(() => ({
          info: jest.fn(),
        })),
      },
      costTracking: {},
      id: "test-id",
    } as any;

    const document = {
      markdown: "   \n\t  ",
    } as any;

    const result = await performSummary(mockMeta, document);

    expect(result.summary).toBeUndefined();
    expect(result.warning).toContain(
      "Summary generation was skipped because the markdown content is empty",
    );
  });
});

describe("performCleanContent", () => {
  const mockEncode = jest.fn();
  const mockFree = jest.fn();
  const mockEncoder = {
    encode: mockEncode,
    free: mockFree,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (encoding_for_model as jest.Mock).mockReturnValue(mockEncoder);
  });

  const makeMeta = (onlyCleanContent: boolean) =>
    ({
      options: { onlyCleanContent },
      internalOptions: { zeroDataRetention: false, teamId: "test-team" },
      logger: {
        child: jest.fn(() => ({ info: jest.fn() })),
        info: jest.fn(),
      },
      costTracking: {},
      id: "test-id",
    }) as any;

  it("should skip cleaning when input tokens exceed model max output tokens", async () => {
    const longMarkdown = "A".repeat(200000); // simulate a very long document
    // Simulate 80,000 tokens — well above gpt-4o-mini's 16,384 output limit
    mockEncode.mockReturnValue(new Array(80000));

    const document = { markdown: longMarkdown } as any;
    const result = await performCleanContent(makeMeta(true), document);

    // Should preserve original markdown
    expect(result.markdown).toBe(longMarkdown);
    // Should have a warning about skipping
    expect(result.warning).toContain("Content cleaning was skipped");
    expect(result.warning).toContain("too long");
    expect(result.warning).toContain("80000 tokens");
    expect(result.warning).toContain("original markdown has been preserved");
  });

  it("should not skip cleaning when input tokens are within model output limit", async () => {
    // Simulate 5,000 tokens — well within gpt-4o-mini's 16,384 output limit
    mockEncode.mockReturnValue(new Array(5000));

    const document = { markdown: "Short content for cleaning" } as any;

    // Track whether logger.child was called with the generateCompletions method,
    // which only happens after the guard passes (line 1180 in llmExtract.ts).
    const childLogger = { info: jest.fn(), error: jest.fn(), warn: jest.fn() };
    const loggerChild = jest.fn(() => childLogger);
    const meta = {
      options: { onlyCleanContent: true },
      internalOptions: { zeroDataRetention: false, teamId: "test-team" },
      logger: {
        child: loggerChild,
        info: jest.fn(),
        error: jest.fn(),
      },
      costTracking: {},
      id: "test-id",
    } as any;

    // The call will fail inside generateCompletions (no LLM provider configured),
    // but if it gets that far, it proves the guard didn't fire.
    try {
      await performCleanContent(meta, document);
    } catch (_e) {
      // Expected — no LLM available in test
    }

    // Verify the guard did NOT skip: logger.child should have been called with
    // the generateCompletions method, which only happens after the guard.
    expect(loggerChild).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "performCleanContent/generateCompletions",
      }),
    );
    expect(document.warning ?? "").not.toContain(
      "Content cleaning was skipped because the content is too long",
    );
  });

  it("should return document unchanged when onlyCleanContent is false", async () => {
    const document = { markdown: "Some content" } as any;
    const result = await performCleanContent(makeMeta(false), document);

    expect(result.markdown).toBe("Some content");
    expect(result.warning).toBeUndefined();
  });
});
