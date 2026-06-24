import { generateObject } from "ai";
import { z } from "zod";
import {
  googleModel,
  googleProviderOptions,
  type LlmUsageLabels,
} from "./tuning";
import { recordLlmCall } from "./cost";
import type { CostTracking } from "../../../lib/cost-tracking";

const CRITERIA_MODEL = "gemini-flash-lite-latest";

export type GoalCriteria = {
  goalVersion: string;
  generatedBy: "deterministic" | "llm";
  subjectAliases: string[];
  mustConcern: string[];
  excludedSubjects: string[];
  ownedHosts: string[];
  thirdPartyOnly: boolean;
};

export function tokenizeContent(text: string | null | undefined): string[] {
  return (
    String(text ?? "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(token => token.length >= 2)
  );
}

function normalizeForContainment(text: string | null | undefined): string {
  return ` ${String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;
}

export function containsAlias(
  text: string | null | undefined,
  alias: string,
): boolean {
  const haystack = normalizeForContainment(text);
  const needle = normalizeForContainment(alias).trim();
  return needle.length > 0 && haystack.includes(` ${needle} `);
}

export function compileGoalCriteria(params: {
  goal: string;
  subject: string;
  goalVersion: string;
}): GoalCriteria {
  const subject = params.subject.trim();
  return {
    goalVersion: params.goalVersion,
    generatedBy: "deterministic",
    subjectAliases: subject ? [subject] : [],
    mustConcern: [],
    excludedSubjects: [],
    ownedHosts: [],
    thirdPartyOnly: false,
  };
}

const criteriaSchema = z.object({
  subjectAliases: z
    .array(z.string())
    .describe(
      "Every name the monitored subject goes by, INCLUDING its well-known products and brand names. Empty if the goal has no specific subject.",
    ),
  mustConcern: z
    .array(z.string())
    .describe(
      "Single lowercase content words that name the goal's SPECIFIC topic/scope — the subject matter a matching story must actually be about, not just the broad field. Derived from the goal's topic, not its phrasing. For a goal like 'AI safety or alignment research', use the precise topic words (safety, alignment, interpretability, evaluation) rather than broad-field words (ai, research) that adjacent off-topic stories would also share. Matching is EXACT string comparison, so include inflection variants explicitly (e.g. release, releases, released, launch, launches, launched).",
    ),
  excludedSubjects: z
    .array(z.string())
    .describe(
      "Entities whose OWN news must not trigger this monitor (e.g. competitors merely name-dropping the subject). Empty when the goal doesn't imply any.",
    ),
  ownedHosts: z
    .array(z.string())
    .describe(
      "Hostnames operated by the subject itself (official site, docs, blog).",
    ),
  thirdPartyOnly: z
    .boolean()
    .describe(
      "true ONLY when the goal asks for third-party coverage of the subject (mentions, press, discussion, reviews) — the subject's own pages then don't satisfy it. false when the subject's own announcements DO satisfy the goal (releases, launches, filings, pricing changes, changelogs).",
    ),
});

export function mergeCompiledCriteria(
  deterministic: GoalCriteria,
  llm: z.infer<typeof criteriaSchema>,
): GoalCriteria {
  const merged: GoalCriteria = {
    ...deterministic,
    generatedBy: "llm",
    subjectAliases: [
      ...new Set([
        ...deterministic.subjectAliases,
        ...llm.subjectAliases.map(s => s.trim()).filter(Boolean),
      ]),
    ],
    mustConcern: [...new Set(llm.mustConcern.flatMap(tokenizeContent))],
    excludedSubjects: [
      ...new Set(llm.excludedSubjects.map(s => s.trim()).filter(Boolean)),
    ],
    ownedHosts: [
      ...new Set(
        llm.ownedHosts
          .map(
            h =>
              String(h ?? "")
                .trim()
                .toLowerCase()
                .replace(/^https?:\/\//, "")
                .replace(/^www\./, "")
                .split("/")[0]
                .split(":")[0],
          )
          .filter(Boolean),
      ),
    ],
    thirdPartyOnly: llm.thirdPartyOnly === true,
  };
  merged.excludedSubjects = merged.excludedSubjects.filter(
    excluded =>
      !merged.subjectAliases.some(
        alias => alias.toLowerCase() === excluded.toLowerCase(),
      ),
  );
  return merged;
}

export async function compileGoalCriteriaWithLlm(params: {
  goal: string;
  subject: string;
  queries: string[];
  goalVersion: string;
  costTracking?: CostTracking;
  labels?: LlmUsageLabels;
}): Promise<GoalCriteria> {
  const deterministic = compileGoalCriteria(params);
  const { object, usage } = await generateObject({
    model: googleModel(CRITERIA_MODEL),
    schema: criteriaSchema,
    system:
      "You compile a web-monitoring goal into machine-checkable criteria. The criteria are evaluated with exact string containment and set membership — no interpretation happens later, so be complete (list product names, abbreviations, obvious competitors). Only include entries you are confident about; an empty list disables that check, which is always safe.",
    prompt: JSON.stringify({
      goal: params.goal,
      subject: params.subject,
      queries: params.queries,
    }),
    temperature: 0,
    ...googleProviderOptions("compileGoalCriteria", params.labels),
  });
  if (params.costTracking) {
    recordLlmCall({
      costTracking: params.costTracking,
      model: CRITERIA_MODEL,
      usage,
      stage: "compileGoalCriteria",
    });
  }
  return mergeCompiledCriteria(deterministic, object);
}
