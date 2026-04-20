/**
 * Sanity tests for the LangSmith wiring. The disabled-path block isolates
 * modules and strips LANGSMITH_* env vars so the tests don't depend on the
 * developer's local .env, where LANGSMITH_API_KEY may or may not be set.
 */
import * as ai from "ai";

describe("scrape-interact/langsmith (disabled — no API key)", () => {
  beforeEach(() => {
    jest.resetModules();
    // Mock config to ensure LANGSMITH_API_KEY is unset regardless of what's
    // in the developer's local .env file — this keeps the disabled-path
    // tests hermetic.
    jest.doMock("../../config", () => ({
      config: {
        LANGSMITH_API_KEY: undefined,
        LANGSMITH_TRACING: undefined,
        LANGSMITH_PROJECT: undefined,
        LANGSMITH_ENDPOINT: undefined,
      },
    }));
  });

  afterEach(() => {
    jest.dontMock("../../config");
  });

  it("reports disabled when LANGSMITH_API_KEY is unset", () => {
    const mod = require("./langsmith");
    expect(mod.isLangSmithEnabled).toBe(false);
  });

  it("re-exports raw ai SDK functions when disabled", () => {
    const freshAi = require("ai");
    const mod = require("./langsmith");
    expect(mod.generateText).toBe(freshAi.generateText);
    expect(mod.streamText).toBe(freshAi.streamText);
    expect(mod.generateObject).toBe(freshAi.generateObject);
    expect(mod.streamObject).toBe(freshAi.streamObject);
  });

  it("returns undefined providerOptions when disabled", () => {
    const mod = require("./langsmith");
    const opts = mod.buildLangSmithProviderOptions(
      {
        thread_id: "t1",
        session_id: "t1",
        scrape_id: "s1",
        team_id: "team1",
        mode: "prompt",
      },
      { name: "test" },
    );
    expect(opts).toBeUndefined();
  });

  it("traceInteract returns the original function unchanged when disabled", async () => {
    const mod = require("./langsmith");
    const original = async (x: number) => x * 2;
    const wrapped = mod.traceInteract(
      original,
      {
        thread_id: "t1",
        session_id: "t1",
        scrape_id: "s1",
        team_id: "team1",
        mode: "code",
      },
      { name: "test" },
    );
    expect(wrapped).toBe(original);
    await expect(wrapped(3)).resolves.toBe(6);
  });

  it("treats an API key alone (no LANGSMITH_TRACING) as disabled", () => {
    jest.resetModules();
    jest.doMock("../../config", () => ({
      config: {
        LANGSMITH_API_KEY: "real-looking-key",
        LANGSMITH_TRACING: undefined,
        LANGSMITH_PROJECT: undefined,
        LANGSMITH_ENDPOINT: undefined,
      },
    }));
    const mod = require("./langsmith");
    expect(mod.isLangSmithEnabled).toBe(false);
  });

  it("treats whitespace-only LANGSMITH_API_KEY as disabled", () => {
    jest.resetModules();
    jest.doMock("../../config", () => ({
      config: {
        LANGSMITH_API_KEY: "   \t\n  ",
        LANGSMITH_TRACING: true,
        LANGSMITH_PROJECT: undefined,
        LANGSMITH_ENDPOINT: undefined,
      },
    }));
    const mod = require("./langsmith");
    expect(mod.isLangSmithEnabled).toBe(false);
  });

  it("sanitizeUrlForTrace strips query strings and fragments", () => {
    const { sanitizeUrlForTrace } = require("./langsmith");
    expect(sanitizeUrlForTrace("https://example.com/page?token=abc#x")).toBe(
      "https://example.com/page",
    );
    expect(sanitizeUrlForTrace("https://example.com/")).toBe(
      "https://example.com/",
    );
    expect(sanitizeUrlForTrace(null)).toBeUndefined();
    expect(sanitizeUrlForTrace(undefined)).toBeUndefined();
    // Malformed URL still gets query/fragment stripped
    expect(sanitizeUrlForTrace("not a url?token=secret#frag")).toBe(
      "not a url",
    );
    expect(sanitizeUrlForTrace("not a url")).toBe("not a url");
  });
});

describe("scrape-interact/langsmith (enabled — mocked SDK)", () => {
  // These tests reset module state and provide fake langsmith modules so we
  // can exercise the wrap path without network calls or a real API key.

  const ORIGINAL_ENV = { ...process.env };
  const fakeWrappedFns = {
    generateText: jest.fn(),
    streamText: jest.fn(),
    generateObject: jest.fn(),
    streamObject: jest.fn(),
  };
  const createProviderOptionsSpy = jest.fn((opts: unknown) => ({
    __fake_langsmith_options__: true,
    payload: opts,
  }));
  const traceableSpy = jest.fn(
    (fn: (...args: unknown[]) => unknown, _opts: unknown) => {
      const wrapper = (...args: unknown[]) => fn(...args);
      (
        wrapper as unknown as { __fake_traceable__: boolean }
      ).__fake_traceable__ = true;
      return wrapper;
    },
  );

  beforeEach(() => {
    jest.resetModules();
    createProviderOptionsSpy.mockClear();
    traceableSpy.mockClear();
    // Mock config with only the fields the module reads so the test is
    // hermetic — it doesn't depend on the developer's local .env making it
    // through the zod schema at require time.
    jest.doMock("../../config", () => ({
      config: {
        LANGSMITH_API_KEY: "test-fake-key",
        LANGSMITH_TRACING: true,
        LANGSMITH_PROJECT: "test-project",
        LANGSMITH_ENDPOINT: undefined,
      },
    }));
    jest.doMock("langsmith/experimental/vercel", () => ({
      wrapAISDK: () => fakeWrappedFns,
      createLangSmithProviderOptions: createProviderOptionsSpy,
    }));
    jest.doMock("langsmith/traceable", () => ({
      traceable: traceableSpy,
    }));
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    jest.dontMock("../../config");
    jest.dontMock("langsmith/experimental/vercel");
    jest.dontMock("langsmith/traceable");
  });

  it("reports enabled and swaps generateText for the wrapped fn", () => {
    const mod = require("./langsmith");
    expect(mod.isLangSmithEnabled).toBe(true);
    expect(mod.generateText).toBe(fakeWrappedFns.generateText);
    expect(mod.generateText).not.toBe(ai.generateText);
  });

  it("builds provider options with thread_id + scrape context metadata", () => {
    const mod = require("./langsmith");
    const result = mod.buildLangSmithProviderOptions(
      {
        thread_id: "sess-abc",
        session_id: "sess-abc",
        scrape_id: "scrape-xyz",
        team_id: "team-42",
        browser_id: "browser-1",
        mode: "prompt",
        scrape_url: "https://example.com/pricing",
        target_url: "https://example.com/pricing/",
        scrape_wait_for_ms: 500,
        scrape_actions: 2,
        scrape_origin: "api",
      },
      { name: "interact:prompt", extra: { prompt_length: 123 } },
    );

    expect(createProviderOptionsSpy).toHaveBeenCalledTimes(1);
    const callArg = createProviderOptionsSpy.mock.calls[0][0] as {
      name: string;
      metadata: Record<string, unknown>;
      tags: string[];
    };
    expect(callArg.name).toBe("interact:prompt");
    expect(callArg.metadata).toMatchObject({
      thread_id: "sess-abc",
      session_id: "sess-abc",
      scrape_id: "scrape-xyz",
      team_id: "team-42",
      scrape_url: "https://example.com/pricing",
      target_url: "https://example.com/pricing/",
      scrape_wait_for_ms: 500,
      scrape_actions: 2,
      scrape_origin: "api",
      browser_id: "browser-1",
      mode: "prompt",
      prompt_length: 123,
    });
    expect(callArg.tags).toEqual(["interact", "mode:prompt"]);
    expect(result).toMatchObject({ __fake_langsmith_options__: true });
  });

  it("skips tracing when meta.zeroDataRetention is true", () => {
    const mod = require("./langsmith");
    const result = mod.buildLangSmithProviderOptions({
      thread_id: "sess-abc",
      session_id: "sess-abc",
      scrape_id: "scrape-xyz",
      team_id: "team-42",
      mode: "prompt",
      zeroDataRetention: true,
    });
    expect(result).toBeUndefined();
    expect(createProviderOptionsSpy).not.toHaveBeenCalled();

    const fn = async () => "should-still-run";
    const wrapped = mod.traceInteract(fn, {
      thread_id: "sess-abc",
      session_id: "sess-abc",
      scrape_id: "scrape-xyz",
      team_id: "team-42",
      mode: "code",
      zeroDataRetention: true,
    });
    expect(wrapped).toBe(fn);
    expect(traceableSpy).not.toHaveBeenCalled();
  });

  it("wraps functions via traceable when zeroDataRetention is not set", async () => {
    const mod = require("./langsmith");
    const fn = jest.fn(async (x: number) => x + 1);
    const wrapped = mod.traceInteract(
      fn,
      {
        thread_id: "sess-abc",
        session_id: "sess-abc",
        scrape_id: "scrape-xyz",
        team_id: "team-42",
        mode: "code",
      },
      { name: "interact:code" },
    );
    expect(traceableSpy).toHaveBeenCalledTimes(1);
    const traceableOpts = traceableSpy.mock.calls[0][1] as {
      name: string;
      run_type: string;
      metadata: Record<string, unknown>;
      tags: string[];
    };
    expect(traceableOpts.name).toBe("interact:code");
    expect(traceableOpts.run_type).toBe("chain");
    expect(traceableOpts.tags).toEqual(["interact", "mode:code"]);
    expect(traceableOpts.metadata).toMatchObject({
      thread_id: "sess-abc",
      mode: "code",
    });
    await expect(wrapped(5)).resolves.toBe(6);
    expect(fn).toHaveBeenCalledWith(5);
  });

  it("falls back to raw ai SDK when langsmith require() throws", () => {
    jest.resetModules();
    jest.doMock("langsmith/experimental/vercel", () => {
      throw new Error("simulated install breakage");
    });
    jest.doMock("langsmith/traceable", () => ({ traceable: traceableSpy }));
    // Re-require ai from the fresh module graph so the identity check lines up
    // with the module instance the langsmith helper imported.
    const freshAi = require("ai");
    const mod = require("./langsmith");
    expect(mod.generateText).toBe(freshAi.generateText);
    expect(
      mod.buildLangSmithProviderOptions({
        thread_id: "t",
        session_id: "t",
        scrape_id: "s",
        team_id: "x",
        mode: "prompt",
      }),
    ).toBeUndefined();
  });
});
