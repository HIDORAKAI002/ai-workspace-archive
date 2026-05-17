# Mega Prompt: Research — Hybrid Router + Fallback Skill (autoresearch)

## Role

You are a **Skill Architect** specializing in research-orchestration workflows. Generate a production-grade, distributable Claude skill that serves as the default entry point for research requests — classifying the question deterministically, delegating to a specialist research skill when confidence is high, and falling back to its own plan-decompose-search-synthesize workflow when no specialist fits.

## Output Target

Single file: `${SKILLS_DIR}/research/SKILL.md`

Word budget: 2,200–2,500 words. Hard ceiling: 2,800 (research-pack tier).

## Architectural Pattern: Hybrid Router + Fallback (Architecture C)

This is **the runtime orchestrator for the research domain** — distinct from `00-master-orchestrator` which operates at skill-generation build time. The user invokes `research` as their default entry point for any research question. The skill then:

1. **Classifies the question deterministically** — keyword + intent signals, not LLM-only reasoning
2. **If a specialist matches with high confidence (≥2 signals)**: delegates to it. Returns specialist output verbatim.
3. **If no specialist fits**: runs its own plan → multi-source search → synthesize → cite workflow

The hybrid pattern is the answer to: *"How do users get to specialized skills without having to memorize 6 different skill names?"*

Specialist registry the router knows about:

|Specialist  |Routing signals                                                    |Domain                                |
|------------|-------------------------------------------------------------------|--------------------------------------|
|`pulse`     |reddit / hn / x / buzz / sentiment / trending / "what's people saying"|Multi-source recency research        |
|`grants`    |NIH / grant / R01 / K-award / RePORTER / NOSI / funding              |NIH grant-funding intelligence       |
|`litreview` |literature review / PICO / SPIDER / systematic review / "review papers on"|Academic literature orientation |
|`syllabus`  |syllabus attached / course outline / "reading list for my class"     |Course supplementary reading         |
|`patent`    |prior art / FTO / freedom to operate / patent / invention novelty    |Patent prior-art + landscape         |
|`dossier`   |"dossier on" / "due diligence" / "background check" / "competitor research" / "prep me for [meeting]"|Decision-grade entity research      |

## Non-Generic Framing

The skill is **a router with an honest fallback**. It refuses to be "Claude does research". Every invocation produces one of three outcomes:

1. **Delegation** — Classified as specialist-domain. Routes there. User sees the specialist's output.
2. **Fallback execution** — Classified as general research. Runs own workflow. Produces cited briefing.
3. **Clarification request** — Classification ambiguous. Asks one forcing question to disambiguate, then routes.

The skill never silently runs its fallback when a specialist would have done better. It always surfaces the routing decision so the user can correct.

## Required Capabilities

The skill must specify how to:

1. **Deterministic classification** — Keyword + intent signal matching, not LLM-only reasoning
2. **Confidence scoring** — Count matched signals; commit to specialist only at ≥2 signals
3. **Routing transparency** — Surface routing decision before executing ("Routing to `litreview` because you mentioned PICO. Correct or override.")
4. **Override handling** — Accept user override of routing decision
5. **Specialist delegation** — Hand off with the parsed parameters; let specialist run its own intake
6. **Own fallback workflow** — Plan → decompose → multi-source search → synthesize → cite
7. **Three-count tracking** — Sent / received / cited (research-pack convention)
8. **Source discipline** — Cite only this-session results
9. **Output adaptive** — Markdown brief by default; DOCX if user requests or fallback runs deep
10. **Grill-me intake** — Minimal, 2–4 questions; designed to clarify routing, not to slow delegation

## Workflow Structure

The generated skill must follow this structure:

```
1. Overview + hybrid architecture (router + fallback)
2. Specialist Registry (with routing signals per specialist)
3. Agent Integrity Rules (research-pack conventions)
4. Phase 1: Grill-Me Intake (2–4 questions, minimal)
5. Phase 2: Deterministic Classification (signal matching)
6. Phase 3a: Specialist Delegation (if confidence ≥2 signals)
7. Phase 3b: Own Fallback Workflow (if no specialist matches)
8. Routing Transparency Protocol (surface decision + accept override)
9. Fallback Workflow Specification (plan → search → synthesize → cite)
10. Output Format (markdown brief default; DOCX optional)
11. Audit Log Requirement
```

## Grill-Me Intake Specification

Intake is intentionally minimal — the goal is to route fast, not to interrogate. Max 4 questions, one at a time, only asked when needed.

### Q1 (always) — Research question

> **What's the research question? State it in 1–2 sentences. Specific is better than broad — "AI for healthcare" gets you a vague survey; "How are health systems integrating LLM-based clinical decision support in 2026?" gets you a useful answer.**
> 
> *Why I'm asking:* Specificity dictates classification accuracy and search precision. A vague question routes to fallback; a specific question often matches a specialist cleanly.

Refuse mush. If user says "research AI", push: "What about AI specifically — adoption, safety, capability, funding, regulation, comparison? Pick an angle."

### Q2 (always) — Output preference

> **What output do you want? Pick one:**
> 1. Quick chat briefing (5-min read, markdown in chat)
> 2. Standalone document (.docx with citations, shareable)
> 
> *Why I'm asking:* Document mode triggers deeper search budgets and full audit logs. Chat mode optimizes for fast delivery.

Forcing choice.

### Q3 (asked only if classification ambiguous — ≤1 signal) — Domain disambiguation

> **Quick clarification — pick the closest match:**
> 1. Academic literature (papers, peer-reviewed)
> 2. Industry / trends (what's the buzz, news, sentiment)
> 3. Specific entity (a company, person, organization)
> 4. Technology / patents (prior art, IP landscape)
> 5. Grant funding (NIH, foundations)
> 6. Course material (syllabus or curriculum)
> 7. None of the above — run general research
> 
> *Why I'm asking:* I couldn't classify confidently from your question alone. This routes you to the right specialist or confirms general-research fallback.

Skip if Q1 + Q2 produced clear specialist match (≥2 signals).

### Q4 (asked only if Q3 was needed AND user picked "none of the above") — General-research scope

> **For general research, what's your time horizon — quick scan (5 searches) or thorough (15 searches)?**
> 
> *Why I'm asking:* General research has no specialist budget; you pick it. Quick is good for "what's the lay of the land". Thorough is for "I'll make a decision based on this".

Skip if a specialist took over.

**Stop condition:** After Q4 (or earlier if dependency skips applied), commit and start Phase 2. Most invocations exit intake after Q1 + Q2.

## Deterministic Classification Algorithm

Document the classification logic explicitly. This is **deterministic, not LLM-reasoned** — for speed, debuggability, and consistency.

```
SIGNALS = {
  pulse:    ["reddit", "hn", "hacker news", "x.com", "twitter", "buzz",
             "sentiment", "trending", "what are people saying",
             "what's happening", "the conversation around",
             "pulse on", "take the pulse", "current conversation"],
  grants:   ["nih", "grant", "grants for", "r01", "r21", "k-award", "reporter",
             "nosi", "funding", "fda", "study section", "principal investigator"],
  litreview:["literature review", "lit review", "litreview", "pico", "spider",
             "systematic review", "review papers on", "research papers on",
             "papers about", "meta-analysis"],
  syllabus: ["syllabus", "course outline", "curriculum", "reading list",
             "for my class", "for my students", "course material"],
  patent:   ["prior art", "fto", "freedom to operate", "patent",
             "patent landscape", "invention", "novelty search",
             "patent search", "ip landscape"],
  dossier:  ["dossier on", "due diligence", "background check",
             "prep me for", "competitor research", "investor diligence",
             "interview prep", "research my competitor", "background on"]
}

# Signals are case-insensitive literal phrases (multi-word substring match).
# Bracketed placeholders (e.g., "research [company]") are intentionally NOT
# used as signals — they over-trigger on generic "research X" queries that
# should fall back to general research, not auto-route to dossier. Specific
# phrases pair the verb with the noun (e.g., "dossier on", "background on",
# "competitor research") and route reliably.

For each specialist S:
  score[S] = count of SIGNALS[S] phrases matched in user's question (case-insensitive substring)

if max(score) >= 2:
  route_to = argmax(score)
elif max(score) == 1 and only one specialist has score 1:
  route_to = that specialist  # weak match, single specialist
else:
  route_to = "fallback"  # ambiguous or no match — ask Q3
```

Document this as concrete pseudo-code in the skill. The deterministic approach makes the routing predictable and lets users learn what phrases route where.

## Routing Transparency Protocol

After classification, the skill must:

1. State the routing decision in one sentence: "Routing to `litreview` because you mentioned PICO and meta-analysis."
2. Offer override: "If you want general research instead or a different specialist, say so now."
3. Wait 1 turn for confirmation (or auto-proceed after 5 seconds in interactive contexts).
4. If user overrides, accept and re-route.

**Never delegate silently.** Routing visibility is what makes the hybrid architecture trustworthy.

## Specialist Delegation Pattern

When delegating, the skill must:

1. Pass the user's question verbatim plus the output preference (Q2)
2. Let the specialist run its own grill-me intake — do NOT pre-answer specialist questions
3. Return specialist output as the user-visible result
4. Tag the result with `[Delegated to: research → {specialist}]` in the chat output so the user knows what skill produced it
5. Tag the audit log with the delegation

## Own Fallback Workflow Specification

If routing produces no specialist match, run the fallback. Document it as a full workflow:

### Step 1: Decompose

Break the research question into 3–5 sub-questions. Use the framework: what / why / how / who / what's next. Show the decomposition to the user before searching.

### Step 2: Source Selection

For each sub-question, choose source(s) deterministically:

- **Recency-sensitive** → WebSearch + WebFetch + (optionally Reddit/HN if signal)
- **Technical specs / docs** → WebSearch + WebFetch
- **Academic** → Consensus MCP if connected; otherwise WebSearch with `scholar.google.com` site filter
- **Data / numbers** → WebSearch for sources; then WebFetch for primary documents
- **Person / company entity-level** → consider routing to `dossier` (offer override)

### Step 3: Search

Sequential per sub-question. 1 q/sec etiquette. Per source: 2–4 queries, broad-to-narrow.

### Step 4: Read + Extract

For each result that looks high-signal: WebFetch and extract the relevant section. Note the source URL.

### Step 5: Synthesize

Per sub-question: 2–4 paragraphs answering it with inline citations. Surface disagreement when sources disagree.

### Step 6: Cross-Cutting Patterns

After per-sub-question synthesis: 1–2 paragraphs of patterns across sub-questions — consensus, controversy, gaps.

### Step 7: Output

Markdown brief by default (Q2 choice). DOCX if user picked document mode.

### Step 8: Audit Log

Three-count summary (sent / received / cited) + per-source list with reliability tier (primary / secondary / tertiary).

## Research-Pack Conventions (Inherited)

The skill must include the standard "Agent Integrity Rules" block:

- **Execution discipline**: Sequential searches. 1 q/sec rate limit. Confirm response received before next call.
- **Source discipline**: Cite only sources returned by this session's tool calls. Training knowledge labeled `[Background — not from search]` and excluded from counts.
- **Three-count tracking**: Queries sent / sources received / sources cited.
- **Retry policy**: On failure → wait 3s → retry once → log. After 3 consecutive failures: stop, alert user.
- **Plan-tier detection**: If delegated to Consensus-using specialist, that specialist handles detection. In fallback mode, surface any rate-limit signals.

## Output Format Spec

### Markdown brief (Q2 = quick chat briefing)

```markdown
# [Research Question] — Briefing
*Generated: [DATE] | Routed: [delegated specialist | fallback]*

## TL;DR
[2-3 sentences]

## Findings
### [Sub-question 1]
[2-4 paragraphs with inline citations]

### [Sub-question 2]
...

## Cross-Cutting Patterns
[1-2 paragraphs]

## Sources
[Numbered list with hyperlinks, reliability tier per source]

## Audit
[Three counts + failures]
```

### DOCX (Q2 = standalone document)

Use the standard research-pack DOCX patterns: Arial 12pt, navy headings, blue table headers, hyperlinked sources, mandatory audit log section. Reference the docx skill for setup.

## Trigger Phrases (for frontmatter description)

- "research [topic]"
- "look into [topic]"
- "what do we know about [topic]"
- "investigate [topic]"
- "find me information on [topic]"
- "do some research on [topic]"
- "I need to understand [topic]"
- Plus: any research request that doesn't obviously match a more-specific specialist

## Error Handling Requirements

|Failure                              |Behavior                                                                      |
|-------------------------------------|------------------------------------------------------------------------------|
|Classification ambiguous (≤1 signal) |Ask Q3 (domain disambiguation).                                              |
|Specialist delegation fails          |Note in chat. Offer to retry or fall back to general research.               |
|User overrides routing               |Accept. Re-route to chosen specialist or fallback.                            |
|Fallback search returns thin results |Surface explicitly. Suggest the question may be too niche or too new. Do not fabricate.|
|3 consecutive tool failures in fallback|Stop, alert user, share what was collected.                                |
|Question is non-research (e.g., "write me code")|Decline politely. Suggest the user invoke an appropriate skill.       |
|Sub-question can't be answered       |Note in synthesis as "limited public signal on this"; don't omit silently.    |
|Output format mismatch               |Honor Q2 preference; if format unavailable, fall back to markdown with note.  |

## Portability Requirements

Document at top:

> **Portability:** Requires `WebSearch` + `WebFetch` for the fallback workflow; specialist skills must be present and properly configured for delegation to work. Node.js with `docx` package required if Q2 = document mode. Works in Claude Code CLI natively. In Claude.ai with web tools + Code Execution, the workflow is supported.

## Dependencies

- **`WebSearch`** — Required for fallback workflow
- **`WebFetch`** — Required for fallback workflow
- **Specialist skills** — Required for delegation (pulse, grants, litreview, syllabus, patent, dossier). If a specialist is missing, the router skips it in classification and routes to fallback instead.
- **Node.js `docx` library** — Required if user picks document output
- **Consensus MCP** — Optional; used in fallback if academic sub-questions surface

## Frontmatter Spec

```yaml
---
name: research
description: "Default entry point for any research request — a hybrid router that classifies the question deterministically and either delegates to a specialist research skill (pulse for trends/sentiment, grants for NIH funding, litreview for academic literature, syllabus for course reading, patent for prior-art + IP landscape, dossier for entity research) or runs its own plan-decompose-multi-source-search-synthesize-cite fallback workflow when no specialist matches. Always surfaces the routing decision so users can override. Triggers: 'research [topic]', 'look into [topic]', 'what do we know about [topic]', 'investigate [topic]', 'find me information on [topic]', 'do some research on [topic]', 'I need to understand [topic]', or any research request that doesn't obviously match a more-specific specialist skill. Output is a markdown briefing (default) or .docx document (on request) with full citations and an audit log."
---
```

## Anti-Patterns To Reject

- LLM-reasoned classification (must be deterministic keyword + intent matching)
- Silent delegation (always surface routing decision)
- Refusing to route to a specialist when ≥2 signals match
- Routing to a specialist when classification is genuinely ambiguous (≤1 signal across all)
- Pre-answering the specialist's grill-me intake (let it run its own)
- Running fallback when a specialist would clearly do better
- Fabricating sources in fallback when search is thin
- Skipping audit log in fallback mode
- Treating "dossier on [company]" or "background check on [entity]" as fallback when `dossier` is the right specialist (the verb-noun-paired phrase, not the generic "research X" form, is what routes)
- Treating "what are people saying about X" as fallback when `pulse` is the right specialist
- Auto-routing generic "research [topic]" queries to a specialist when the user hasn't paired the verb with a specialist-specific noun (e.g., "research Microsoft" alone is ambiguous — could be dossier or general; ask Q3 instead of guessing)

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML
- [ ] Word count 2,200–2,800
- [ ] Hybrid architecture (C — router + fallback) stated explicitly at top
- [ ] All 6 specialists registered with routing signals
- [ ] Deterministic classification algorithm documented as concrete pseudo-code
- [ ] Routing transparency protocol stated (surface + override)
- [ ] Grill-me intake: 2–4 questions, minimal, with skip-logic
- [ ] Q1 (research question) refuses vague answers
- [ ] Q3 (domain disambiguation) asked only when classification ≤1 signal
- [ ] Specialist delegation pattern documented (pass-through, no pre-answering)
- [ ] Fallback workflow specified in 8 steps (decompose → audit)
- [ ] Research-pack Agent Integrity Rules included
- [ ] 8+ failure modes documented
- [ ] Both markdown brief and DOCX output formats documented
- [ ] Anti-pattern: "LLM-reasoned classification" explicitly rejected
