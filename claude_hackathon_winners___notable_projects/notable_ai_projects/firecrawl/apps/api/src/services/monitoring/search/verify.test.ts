import {
  compileGoalCriteria,
  mergeCompiledCriteria,
  tokenizeContent,
  type GoalCriteria,
} from "./criteria";
import { verifyAlertCandidate } from "./verify";

const baseCriteria = (over: Partial<GoalCriteria> = {}): GoalCriteria => ({
  goalVersion: "v1",
  generatedBy: "llm",
  subjectAliases: ["Firecrawl"],
  mustConcern: ["launch", "launches", "launched", "product"],
  excludedSubjects: ["Parallel"],
  ownedHosts: ["firecrawl.dev"],
  thirdPartyOnly: false,
  ...over,
});

const evidence = (
  over: Partial<Parameters<typeof verifyAlertCandidate>[0]["evidence"]> = {},
) => ({
  url: "https://news.example.com/story",
  titleText: "Firecrawl launches a new product",
  claimText: "Firecrawl announced a new product today.",
  pageText: "Firecrawl announced a new product today. Details follow in prose.",
  ...over,
});

describe("criteria", () => {
  it("merge drops an excluded subject that is also an alias (alias wins)", () => {
    const deterministic = compileGoalCriteria({
      goal: "Alert me when Firecrawl launches a new product",
      subject: "Firecrawl",
      goalVersion: "v1",
    });
    const merged = mergeCompiledCriteria(deterministic, {
      subjectAliases: ["Firecrawl", "FIRE-1"],
      mustConcern: ["launch"],
      excludedSubjects: ["firecrawl", "Parallel"],
      ownedHosts: ["https://www.firecrawl.dev/blog"],
      thirdPartyOnly: false,
    });
    expect(merged.generatedBy).toBe("llm");
    expect(merged.excludedSubjects).toEqual(["Parallel"]);
    expect(merged.ownedHosts).toEqual(["firecrawl.dev"]);
    expect(merged.subjectAliases).toContain("FIRE-1");
  });

  it("strips ports when normalizing ownedHosts", () => {
    const deterministic = compileGoalCriteria({
      goal: "Alert me when Firecrawl launches a new product",
      subject: "Firecrawl",
      goalVersion: "v1",
    });
    const merged = mergeCompiledCriteria(deterministic, {
      subjectAliases: ["Firecrawl"],
      mustConcern: [],
      excludedSubjects: [],
      ownedHosts: ["https://firecrawl.dev:3000/blog", "localhost:8080"],
      thirdPartyOnly: true,
    });
    expect(merged.ownedHosts).toEqual(["firecrawl.dev", "localhost"]);
  });

  it("tokenizeContent keeps 2-char acronyms (AI, EU, Go) and drops 1-char noise", () => {
    expect(
      tokenizeContent("Go 1.0 released in the EU under the AI Act"),
    ).toEqual([
      "go",
      "released",
      "in",
      "the",
      "eu",
      "under",
      "the",
      "ai",
      "act",
    ]);
  });
});

describe("verifyAlertCandidate", () => {
  it("passes a clean alert", () => {
    const result = verifyAlertCandidate({
      criteria: baseCriteria(),
      concept: "Firecrawl product launch",
      evidence: evidence(),
    });
    expect(result.pass).toBe(true);
    expect(result.failures).toEqual([]);
  });

  it("fails subject containment when the subject never appears in page-backed evidence", () => {
    const result = verifyAlertCandidate({
      criteria: baseCriteria(),
      concept: "Firecrawl product launch",
      evidence: evidence({
        titleText: "A company shipped something",
        claimText: "Some launch happened.",
        pageText: "Some company shipped something today. Details follow.",
      }),
    });
    expect(result.failures.map(f => f.check)).toContain("subject_missing");
  });

  it("passes subject containment when the subject appears only in the page body", () => {
    const result = verifyAlertCandidate({
      criteria: baseCriteria(),
      concept: "Firecrawl product launch",
      evidence: evidence({
        titleText: "A scraping startup shipped something",
        claimText: "A new product launched today.",
        pageText: "The company behind Firecrawl announced a new product.",
      }),
    });
    expect(result.failures.map(f => f.check)).not.toContain("subject_missing");
  });

  it("skips subject containment for snippet-only results (no page content)", () => {
    const result = verifyAlertCandidate({
      criteria: baseCriteria(),
      concept: "Firecrawl product launch",
      evidence: evidence({
        titleText: "A company shipped something",
        claimText: "Some launch happened.",
        pageText: "",
      }),
    });
    expect(result.failures.map(f => f.check)).not.toContain("subject_missing");
  });

  it("fails excluded-subject dominance when a competitor owns the story", () => {
    const result = verifyAlertCandidate({
      criteria: baseCriteria(),
      concept: "Parallel launches Monitor API",
      evidence: evidence({
        titleText: "Parallel launches Monitor API",
        claimText:
          "Parallel launched its Monitor API; Firecrawl is named as a competitor.",
      }),
    });
    expect(result.failures.map(f => f.check)).toContain("excluded_subject");
  });

  it("fails concept relevance when the concept shares no goal terms (llm criteria only)", () => {
    const offGoal = verifyAlertCandidate({
      criteria: baseCriteria(),
      concept: "quarterly earnings beat",
      evidence: evidence(),
    });
    expect(offGoal.failures.map(f => f.check)).toContain("concept_off_goal");

    const deterministic = verifyAlertCandidate({
      criteria: baseCriteria({ generatedBy: "deterministic" }),
      concept: "quarterly earnings beat",
      evidence: evidence(),
    });
    expect(deterministic.failures.map(f => f.check)).not.toContain(
      "concept_off_goal",
    );
  });

  it("downgrades a subject-only concept that misses the topic (funding vs launch)", () => {
    // "Firecrawl funding" names the subject but not the goal's topic (launch);
    // a subject-alias token must NOT satisfy the must-concern gate.
    const result = verifyAlertCandidate({
      criteria: baseCriteria(),
      concept: "Firecrawl Series B funding",
      evidence: evidence(),
    });
    expect(result.failures.map(f => f.check)).toContain("concept_off_goal");
  });

  it("fails owned-surface only when the goal wants third-party coverage", () => {
    const owned = verifyAlertCandidate({
      criteria: baseCriteria({ thirdPartyOnly: true }),
      concept: "Firecrawl product launch",
      evidence: evidence({ url: "https://www.firecrawl.dev/blog/launch" }),
    });
    expect(owned.failures.map(f => f.check)).toContain("owned_surface");

    const eventGoal = verifyAlertCandidate({
      criteria: baseCriteria({ thirdPartyOnly: false }),
      concept: "Firecrawl product launch",
      evidence: evidence({ url: "https://www.firecrawl.dev/blog/launch" }),
    });
    expect(eventGoal.failures.map(f => f.check)).not.toContain("owned_surface");
  });

  it("empty criteria disables every check (fail-open for unknown goal shapes)", () => {
    const result = verifyAlertCandidate({
      criteria: baseCriteria({
        subjectAliases: [],
        mustConcern: [],
        excludedSubjects: [],
        ownedHosts: [],
      }),
      concept: "anything at all",
      evidence: evidence({ titleText: "unrelated", claimText: "unrelated" }),
    });
    expect(result.pass).toBe(true);
  });
});
