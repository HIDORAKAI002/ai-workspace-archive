import { generateObject } from "ai";
import { z } from "zod";
import {
  googleModel,
  googleProviderOptions,
  type LlmUsageLabels,
} from "./tuning";
import type { GoalCriteria } from "./criteria";
import { recordLlmCall } from "./cost";
import type { CostTracking } from "../../../lib/cost-tracking";

const EVENT_MODEL = "gemini-flash-lite-latest";
const SUMMARY_MODEL = "gemini-flash-lite-latest";
const SKEPTIC_MODEL = "gemini-flash-lite-latest";
const ROUTER_MODEL = "gemini-3-flash-preview";

export type KnownEvent = {
  key: string;
  label: string;
  satisfiedAt?: string;
  alertCount?: number;
};

export type EventResolution = {
  matchedKey: string | null;
  isNew: boolean;
  label: string;
  reason: string;
};

const eventResolverSchema = z.object({
  matchedKey: z.string().nullable(),
  isNew: z.boolean(),
  label: z.string(),
  reason: z.string(),
});

export async function resolveEvent(params: {
  goal: string;
  subject: string;
  result: { title: string; url: string; evidence: string };
  candidates: KnownEvent[];
  costTracking?: CostTracking;
  labels?: LlmUsageLabels;
}): Promise<EventResolution> {
  const { object, usage } = await generateObject({
    model: googleModel(EVENT_MODEL),
    schema: eventResolverSchema,
    system:
      "You deduplicate real-world events for a monitoring product. Given a new meaningful result and a list of already-known events, decide if the result describes the SAME underlying event as one of them (a different outlet, headline, or wording still counts as the same event) or a genuinely NEW event. Match to an existing event whenever it is the same development. Return structured JSON only.",
    prompt: JSON.stringify({
      monitor: { goal: params.goal, subject: params.subject },
      knownEvents: params.candidates
        .slice(0, 20)
        .map(c => ({ key: c.key, label: c.label })),
      newResult: {
        title: params.result.title,
        url: params.result.url,
        evidence: (params.result.evidence || "").slice(0, 500),
      },
      instructions: `If newResult is the same underlying event as a knownEvent, set matchedKey to that event's key and isNew false.
Only set isNew true when this is a distinct development not represented by any knownEvent.
label: when matched, reuse the matched event's label; when new, write a short reusable label naming the company/product/event.
A new article from a different publisher about the same filing/launch/recall is NOT a new event.`,
    }),
    temperature: 0,
    ...googleProviderOptions("resolveEvent", params.labels),
  });

  if (params.costTracking) {
    recordLlmCall({
      costTracking: params.costTracking,
      model: EVENT_MODEL,
      usage,
      stage: "resolveEvent",
    });
  }

  return {
    matchedKey: object.matchedKey ?? null,
    isNew: object.matchedKey ? false : object.isNew !== false,
    label: object.label ?? "",
    reason: object.reason ?? "",
  };
}

const materialDevSchema = z.object({
  material: z.boolean(),
  reason: z.string(),
});

export async function judgeMaterialDevelopment(params: {
  goal: string;
  subject: string;
  eventLabel: string;
  result: { title: string; evidence: string };
  costTracking?: CostTracking;
  labels?: LlmUsageLabels;
}): Promise<{ material: boolean; reason: string }> {
  const { object, usage } = await generateObject({
    model: googleModel(EVENT_MODEL),
    schema: materialDevSchema,
    system:
      "You decide whether a new search result represents a MATERIAL development of an already-known, already-alerted event, versus a duplicate retelling that adds nothing new. Material = a concrete new stage, fact, or change in the event's status. A different outlet covering the same already-known facts is NOT material. Return structured JSON only.",
    prompt: JSON.stringify({
      monitor: { goal: params.goal, subject: params.subject },
      knownEvent: params.eventLabel,
      newResult: {
        title: params.result.title,
        evidence: (params.result.evidence || "").slice(0, 500),
      },
      instructions: `Set material true only when the new result reports a genuinely new development of the known event.
Set material false when it restates already-known facts, even from a new source or headline.`,
    }),
    temperature: 0,
    ...googleProviderOptions("judgeMaterialDevelopment", params.labels),
  });
  if (params.costTracking) {
    recordLlmCall({
      costTracking: params.costTracking,
      model: EVENT_MODEL,
      usage,
      stage: "judgeMaterialDevelopment",
    });
  }
  return { material: object.material === true, reason: object.reason ?? "" };
}

const alertSkepticSchema = z.object({
  refuted: z.boolean(),
  failureMode: z.enum([
    "wrong_subject",
    "listing_surface",
    "not_completed",
    "adjacent_event",
    "query_echo",
    "self_contradiction",
    "other",
    "none",
  ]),
  reason: z.string(),
});

export type SkepticVerdict = z.infer<typeof alertSkepticSchema>;

export async function reviewAlert(params: {
  goal: string;
  subject: string;
  criteria: GoalCriteria | null;
  result: {
    title: string;
    url: string;
    snippet: string;
    concept: string;
    judgeAnswer: string;
  };
  costTracking?: CostTracking;
  labels?: LlmUsageLabels;
}): Promise<SkepticVerdict> {
  const { object, usage } = await generateObject({
    model: googleModel(SKEPTIC_MODEL),
    schema: alertSkepticSchema,
    system:
      "You are the adversarial reviewer for a web-monitoring alert that is about to be sent to a paying user. Try to REFUTE it. Refute when any of these hold: (1) wrong_subject — the story's protagonist is a different entity than the monitored subject; the subject being name-dropped, compared against, or listed among others is NOT coverage of the subject; (2) listing_surface — the page is an aggregator, directory, category, calendar, homepage, or feed surface rather than a single story; (3) not_completed — the goal asks for a completed event but this is upcoming, rumored, or planned; (4) adjacent_event — a related-but-different event type OR an off-topic subject in the same broad field (funding news on a release monitor, a partnership on a lawsuit monitor, or a coding/productivity/impact study on a monitor that asks only for safety/alignment research). A credible source or the right organization is NOT enough if the core subject is merely adjacent to the goal's specific topic, or falls into a category the goal says to ignore; (5) query_echo — the only evidence is the search query's own wording reflected back in a snippet; (6) self_contradiction — the judge's own rationale undercuts the alert (admits the evidence is missing, insufficient, unconfirmed, or merely related). UPHOLD the alert (refuted=false, failureMode=none) when the result directly and concretely satisfies the goal — do not refute clear matches on technicalities. The subject's OWN official announcement satisfies an event goal (release, launch, filing, pricing change); never refute an official primary source unless the goal explicitly asks for third-party coverage. Return structured JSON only.",
    prompt: JSON.stringify({
      monitor: {
        goal: params.goal,
        subject: params.subject,
        ...(params.criteria
          ? {
              subjectAliases: params.criteria.subjectAliases,
              excludedSubjects: params.criteria.excludedSubjects,
              mustConcern: params.criteria.mustConcern,
            }
          : {}),
      },
      alertCandidate: {
        title: params.result.title,
        url: params.result.url,
        snippet: params.result.snippet.slice(0, 600),
        judgeConcept: params.result.concept,
        judgeAnswer: params.result.judgeAnswer.slice(0, 800),
      },
    }),
    temperature: 0,
    ...googleProviderOptions("reviewAlert", params.labels),
  });
  if (params.costTracking) {
    recordLlmCall({
      costTracking: params.costTracking,
      model: SKEPTIC_MODEL,
      usage,
      stage: "reviewAlert",
    });
  }
  return object;
}

const routerSchema = z.object({
  decisions: z.array(
    z.object({
      id: z.string(),
      decision: z.enum(["scrape", "skip"]),
      priority: z.number(),
      reason: z.string(),
    }),
  ),
});

export type RouteDecision = {
  id: string;
  decision: "scrape" | "skip";
  priority: number;
  reason: string;
};

export async function routeSearchResults(params: {
  goal: string;
  subject: string;
  searchWindow: string;
  maxResults: number;
  candidates: Array<{
    id: string;
    query: string;
    title: string;
    url: string;
    snippet: string;
  }>;
  costTracking?: CostTracking;
  labels?: LlmUsageLabels;
}): Promise<RouteDecision[]> {
  const candidates = params.candidates.slice(0, 50);
  const { object, usage } = await generateObject({
    model: googleModel(ROUTER_MODEL),
    schema: routerSchema,
    system:
      "You route search results for a monitoring product. Decide which indexed results are worth spending scrape/judge credits on. Use only the SERP title, URL, snippet, query, monitor goal, and search window. Return structured JSON only.",
    prompt: JSON.stringify({
      monitor: { goal: params.goal, subject: params.subject },
      searchWindow: params.searchWindow,
      maxResults: params.maxResults,
      instructions: `Select scrape only when the result could plausibly contain primary evidence or substantive discussion satisfying the monitor goal.
Skip obvious jobs, directories, tag pages, search pages, marketplaces, profiles, irrelevant foreign-language spam, generic tool lists, or pages where the monitored subject appears only as a skill, integration, or incidental keyword.
Do not use keyword overlap alone. Explain the user-facing reason.
Never select more than maxResults.`,
      candidates,
    }),
    temperature: 0,
    ...googleProviderOptions("routeSearchResults", params.labels),
  });
  if (params.costTracking) {
    recordLlmCall({
      costTracking: params.costTracking,
      model: ROUTER_MODEL,
      usage,
      stage: "routeSearchResults",
    });
  }
  const validIds = new Set(candidates.map(c => c.id));
  return object.decisions
    .filter(d => validIds.has(d.id))
    .map(d => ({
      id: d.id,
      decision: d.decision,
      priority: Math.min(1, Math.max(0, d.priority)),
      reason: d.reason.slice(0, 500),
    }));
}

const snippetVerdictSchema = z.object({
  verdicts: z.array(
    z.object({
      id: z.string(),
      relevant: z.boolean(),
      alertAction: z.enum(["alert", "watch", "ignore"]),
      concept: z.string(),
      rationale: z.string(),
    }),
  ),
});

export type SnippetVerdict = z.infer<
  typeof snippetVerdictSchema
>["verdicts"][number];

export async function judgeSnippets(params: {
  goal: string;
  subject: string;
  searchWindow: string;
  candidates: Array<{
    id: string;
    query: string;
    title: string;
    url: string;
    snippet: string;
  }>;
  costTracking?: CostTracking;
  labels?: LlmUsageLabels;
}): Promise<SnippetVerdict[]> {
  if (params.candidates.length === 0) return [];
  const { object, usage } = await generateObject({
    model: googleModel(ROUTER_MODEL),
    schema: snippetVerdictSchema,
    system:
      "You judge search results for a monitoring product using ONLY each result's SERP title, URL, and snippet — you cannot see the page. Be conservative: a snippet is thin evidence, so alertAction alert requires the snippet itself to concretely state a completed, recent event satisfying the goal, from a source credible for that claim (the subject itself or established reporting). The goal names a SPECIFIC topic/scope: the result's core subject must actually match that specific subject matter, not merely be related, adjacent, or in the same broad field — a credible source or the right organization on an adjacent topic is NOT enough. Treat any 'Ignore/except/not/exclude' clause in the goal as a hard exclusion. Query wording echoed in a snippet is not evidence. Rumors, content farms, competitors, look-alikes, listings, and old or unconfirmed results are watch/ignore. concept: a short reusable label naming the real-world event; describe what the result is actually about, do not reword it to match the goal. rationale: concrete snippet facts only, never references to the monitor or goal. Return one verdict per candidate id. Structured JSON only.",
    prompt: JSON.stringify({
      monitor: { goal: params.goal, subject: params.subject },
      searchWindow: params.searchWindow,
      candidates: params.candidates.slice(0, 50),
    }),
    temperature: 0,
    ...googleProviderOptions("judgeSnippets", params.labels),
  });
  if (params.costTracking) {
    recordLlmCall({
      costTracking: params.costTracking,
      model: ROUTER_MODEL,
      usage,
      stage: "judgeSnippets",
    });
  }
  const validIds = new Set(params.candidates.map(c => c.id));
  return object.verdicts.filter(v => validIds.has(v.id));
}

const runSummarySchema = z.object({
  label: z.enum(["meaningful", "already_satisfied", "not_meaningful"]),
  summary: z.string(),
});

export async function summarizeRun(params: {
  goal: string;
  subject: string;
  evidence: Array<{ title: string; url: string; rationale: string }>;
  costTracking?: CostTracking;
  labels?: LlmUsageLabels;
}): Promise<{ label: string; summary: string }> {
  const { object, usage } = await generateObject({
    model: googleModel(SUMMARY_MODEL),
    schema: runSummarySchema,
    system:
      "You write concise user-facing search-monitor check summaries. Use only the provided monitor goal and meaningful source evidence. Do not introduce facts not present in the evidence. Return structured JSON only.",
    prompt: JSON.stringify({
      monitor: { goal: params.goal, subject: params.subject },
      evidence: params.evidence.slice(0, 8),
      instructions: `Summarize why the meaningful sources satisfy the goal as a group, in one short sentence.
If sources are meaningful but already reported, say they are related evidence, not a new notification.`,
    }),
    temperature: 0,
    ...googleProviderOptions("summarizeRun", params.labels),
  });

  if (params.costTracking) {
    recordLlmCall({
      costTracking: params.costTracking,
      model: SUMMARY_MODEL,
      usage,
      stage: "summarizeRun",
    });
  }

  return { label: object.label, summary: object.summary };
}
