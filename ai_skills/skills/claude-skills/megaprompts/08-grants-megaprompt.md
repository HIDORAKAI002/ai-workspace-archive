# Mega Prompt: Grants — NIH Funding Intelligence Skill

## Role

You are a **Skill Architect** specializing in research-funding workflows. Generate a production-grade, distributable Claude skill that helps clinical researchers scope the NIH funding landscape for a research idea — combining academic literature analysis (via Consensus) with funded-project intelligence (via NIH RePORTER) to produce an editable Word document.

## Output Target

Single file: `${SKILLS_DIR}/grants/SKILL.md`

Word budget: 2,200–2,500 words. Hard ceiling: 2,800 (this skill is information-dense; some overrun is acceptable).

## Skill Purpose

For a clinical researcher with a research idea, produce a strategic NIH funding overview as an editable `.docx`:

1. **Research positioning analysis** — 5-facet Consensus search producing gap quotes and draft Significance/Innovation language
1. **Institute mapping** — Which NIH institutes are actually funding this area (via RePORTER)
1. **Targeted grant discovery** — NOSIs, open FOAs, and funded overlap filtered to mapped institutes
1. **Strategic recommendations** — Career-stage + project-scope mechanism matching, program officer guidance, submission timeline

Output is a Word document the researcher can edit, copy sections from into their application, and share with their mentor.

## Required Capabilities

The skill must specify how to:

1. **Intake** — Get research idea + 3 multi-select context questions (career stage, prelim data, environment)
1. **Run 5 sequential Consensus searches** — Established / Stakes / Current Approaches / Adjacent Methods / Gaps
1. **Run RePORTER POST queries** — Narrow (AND) + broad (OR) via `bash_tool` + `curl` (required — RePORTER is POST-only)
1. **Detect plan-tier caps** — Parse Consensus responses for “Found X, showing top Y” language
1. **Map institutes + study sections** — Tally `agency_ic_admin` and `study_section` from RePORTER results
1. **Fetch NOSIs** — `web_fetch` for any `NOT-*` opportunity numbers found in project results
1. **Match mechanisms to scope + career stage** — Not just stage; project size matters
1. **Generate styled DOCX** — Via Node.js + `docx` library, with clickable hyperlinks throughout, including an Audit Log section

## Workflow Structure

The generated skill must follow this structure:

```
1. Overview + scope (NIH-only; non-NIH funders noted as out-of-scope)
2. Agent Integrity Rules (execution discipline, sourcing, counts, errors, audit)
3. Phase 1: Grill-Me Intake (6 forcing questions, one at a time)
4. Phase 2A: Research Positioning (5 Consensus searches + synthesis)
5. Phase 2B: Institute Mapping + Grant Discovery (RePORTER + NOSI + mechanisms)
6. Phase 3: Generate DOCX (9 sections including Audit Log)
7. Phase 4: Deliver (file + chat summary)
8. Notes (rate limits, plan tiers, API patterns)
```

## Grill-Me Intake Specification

Six forcing questions, one at a time, dependency-ordered. Each carries "why I'm asking". Stop condition: max 6.

### Q1 (root) — Research idea

> **Describe the research idea in 2–3 sentences. What's the question, what's new, and what's the clinical relevance? Vague answers ("AI for healthcare", "biomarkers for disease X") will be rejected — push for specificity.**
>
> *Why I'm asking:* Five Consensus searches (established / stakes / current approaches / adjacent methods / gaps) depend on a precise research idea. Vague ideas produce vague gap quotes and useless positioning narrative.

Refuse mush. Re-ask once with examples if user is too broad.

### Q2 (depends on Q1) — Career stage

> **Career stage — pick one:**
> 1. Pre-doctoral (PhD student, T32 trainee)
> 2. Postdoctoral fellow (F32, K99 candidate)
> 3. Early career (K-award candidate, first R01)
> 4. Independent investigator (multiple R01s, established lab)
> 5. Senior PI (R35, P-series, U01 leadership)
>
> *Why I'm asking:* Career stage filters mechanism recommendations. F-series for trainees, K-series for early career, R-series for independent. Picking the wrong stage produces unfundable mechanism suggestions.

Forcing choice.

### Q3 (depends on Q2) — Preliminary data status

> **Preliminary data — pick one:**
> 1. None (de novo project, no pilot data yet)
> 2. Pilot data (early findings, single-site)
> 3. Strong preliminary (multi-experiment, ready for R01-scale)
> 4. Validated and ready (multi-site, publication-ready)
>
> *Why I'm asking:* Prelim data status drives mechanism budget. No data → R03 / R21 pilot scope. Strong prelim → R01 / U01 multi-site scale. Mismatch produces uncompetitive applications.

Forcing choice.

### Q4 (depends on Q2) — Environment

> **Research environment — pick one:**
> 1. R01-eligible (research-intensive institution with NIH base funding)
> 2. Mid-tier (regional academic medical center, modest NIH portfolio)
> 3. Resource-constrained (smaller institution, minimal NIH base)
> 4. Industry-collaborative (academic + industry partnership)
>
> *Why I'm asking:* Environment affects scope realism (multi-site U01 requires R01-eligible) and which mechanism categories are competitive (R15 specifically targets resource-constrained).

Forcing choice.

### Q5 (depends on Q1) — Submission posture

> **Submission posture — pick one:**
> 1. New application (first submission, no prior reviews)
> 2. Resubmission (A1 with reviewer responses needed)
> 3. Exploring (haven't decided yet whether to submit)
>
> *Why I'm asking:* Resubmissions need reviewer-response guidance in the DOCX (Section 7). New applications skip that. Exploring shifts emphasis to landscape over strategy.

Forcing choice.

### Q6 (depends on Q1) — Known institute targets

> **Are you already considering specific NIH institutes? List names (NCI / NHLBI / NIMH / NINDS / NIDDK / etc.) or say "no preference — find the right ones".**
>
> *Why I'm asking:* If you have an institute hypothesis, I'll validate it against RePORTER data. If not, I'll surface the top-3 institutes funding adjacent work from the institute-tally.

Accept "no preference" as the common case.

**Stop condition:** After Q6, commit and start Phase 2A. Never re-open intake after Phase 2A begins.

## Critical Improvements Over Naive Implementation

The skill MUST address these concerns:

1. **Sequential execution discipline** — Consensus rate limit is 1 query/sec. Document explicitly: NEVER parallelize Consensus calls. Sleep 1 second between calls. Confirm response received before next call.
1. **RePORTER is POST-only** — Document prominently: must use `bash_tool` + `curl`, NOT `web_fetch` (which is GET-only). Provide exact `curl` command templates.
1. **Plan-tier detection** — Parse Consensus response for “Found N, showing top M” pattern. Tier inference: ~3 results = unauthenticated, ~10 = free, ~20 = premium. Log detected tier in audit. Surface to user when sparse results may reflect tier ceiling rather than literature gap.
1. **Source discipline** — Hard rule: only cite what tool calls returned this session. Training knowledge labeled `[Not from Consensus/RePORTER — reference information]` and excluded from counts.
1. **Three separate counts** — Track: queries sent / results received (shown) / results cited. Never conflate.
1. **Dynamic fiscal year window** — Compute current year + 3 prior years at runtime. Never hardcode years.
1. **Scope-aware mechanism matching** — Mechanism recommendation considers BOTH career stage AND project scope. A pilot scope → R21/R03; a multi-site trial → R01/U01.
1. **Mandatory program officer recommendation** — Single most valuable advice for any applicant. Always include with NIH staff page URL pattern.
1. **Submission timeline note** — Standard NIH receipt dates by mechanism. Include the table so researchers can plan backwards.
1. **NOSI handling** — `web_fetch` each detected `NOT-*` opportunity. If fetch fails, log and skip (don’t fabricate). If none found, omit section.

## Source Discipline Rules (Must Be Stated)

The skill must include these as an explicit “Agent Integrity Rules” block:

- **Execution discipline**: A step isn’t complete until result is confirmed received. Consensus calls sequential with 1+ sec pause. RePORTER calls sequential.
- **Data sourcing**: Count only what tool calls returned this session. Never supplement with training knowledge.
- **Counts & attribution**: Queries sent vs. results shown vs. results cited — three separate numbers, never conflate. Every cited paper has a retrievable URL from this session.
- **Error handling**: On failure: wait 3s, retry once, log. After 3 consecutive failures across tools: stop, alert researcher, explain what’s missing. Never silently skip.
- **Transparency**: Audit Log section in the DOCX. Apply same standards to chat summary as to document.

## DOCX Output Structure

The generated DOCX has 9 sections. Document each:

1. **Executive Summary** — Title, date, career stage, environment + 3-4 key findings bullets
1. **Research Positioning** — Lead with 3-5 gap quotes (italicized, inline citations to Consensus). Then 2-3 paragraph positioning narrative (draft Significance/Innovation tone). Then supporting evidence table.
1. **Target Institutes** — Ranking table + 2-3 sentence interpretation
1. **Grant Opportunities** — Bold NOSI callout if any. Top 3 grants table with hyperlinked FOAs. Per-grant paragraph on scope/budget fit.
1. **Funded Overlap** — Top 5 projects table + differentiation paragraph
1. **Study Sections** — Ranking table + best-match interpretation
1. **Strategic Recommendations & Next Steps** — 3-4 numbered recs + mandatory program officer rec + submission timeline note + (if resubmission) reviewer-response guidance + closing paragraph
1. **References** — Numbered bibliography, hyperlinked to Consensus
1. **Audit Log** — Consensus searches table, plan-tier note, RePORTER searches table, NOSI fetches table, summary stats, tool constraints note, failed steps

Document the styling expectations: Arial 12pt body, navy headings (#1a3a5c), light blue table headers (#e8f0f8), amber NOSI callout. Provide concrete `ExternalHyperlink` patterns for paper citations, FOA links, and Reporter project links.

## Submission Timeline Reference (Must Be Embedded)

Include this table in the skill so the generated DOCX can include it:

|Mechanism                    |Standard receipt dates|
|-----------------------------|----------------------|
|R01, R21, R03                |Feb 5, Jun 5, Oct 5   |
|K awards (K01, K08, K23, K99)|Feb 12, Jun 12, Oct 12|
|R34, R61/R33                 |Feb 16, Jun 16, Oct 16|
|F31, F32                     |Apr 8, Aug 8, Dec 8   |

## Mechanism Reference Table (Must Be Embedded)

Include the full mechanism table: F31/F32, T32, R03, R21, K01/K08/K23, K99/R00, R01, R34, R61/R33, R35, P01, U01, DP1/DP2 — with typical budget, duration, best-for, and prelim-data-needed columns.

## Trigger Phrases (for frontmatter description)

- "grants for [topic]"
- "find grants for my research idea"
- "what grants match my research"
- "help me find NIH funding"
- "grant opportunities for my research"
- "NIH funding for [topic]"
- Any grant-related request where speed and clarity matter

## Error Handling Requirements

|Failure                              |Behavior                                                                     |
|-------------------------------------|-----------------------------------------------------------------------------|
|Consensus rate-limit hit             |Wait 3s, retry once, log; if still failing, alert researcher                 |
|Consensus returns 0 for a facet      |Surface explicitly; never fill with training knowledge                       |
|Consensus plan-tier cap detected     |Log tier, note in audit, surface to researcher                               |
|RePORTER POST returns error          |Retry once after 3s; if still failing, log and continue with what’s available|
|RePORTER returns <5 results on narrow|Document; broad OR search should compensate; surface low count               |
|NOSI fetch fails                     |Log `[NOSI {number} — fetch failed, not included]`, continue                 |
|3 consecutive tool failures          |Stop, alert researcher with what’s missing                                   |
|DOCX generation fails                |Save raw data as JSON fallback so researcher doesn’t lose work               |

## Portability Requirements

This skill is **primarily Claude Code CLI**. Document at top:

> **Portability:** Requires `bash_tool` (for RePORTER POST via curl), Node.js with `docx` package (for document generation), and a Consensus MCP connection. Works in Claude Code CLI natively. In Claude.ai with Code Execution + Consensus MCP, the workflow is supported but slower; document this as a viable alternate path.

## Dependencies

- **Consensus MCP** — Required for literature search
- **`docx` Node.js library** — Required for DOCX generation (`npm install -g docx`)
- **`bash_tool` + `curl`** — Required for RePORTER POST queries
- **`web_fetch`** — Used for NOSI HTML pages
- **DOCX skill** — Reference at `/mnt/skills/public/docx/SKILL.md` (or equivalent) for hyperlink/table/list patterns

## Frontmatter Spec

```yaml
---
name: grants
description: "NIH grant research skill for clinical researchers. Grill-me intake (research idea + career stage + preliminary data + environment + submission posture + known institute targets) locks down the funding strategy before any search runs. Runs a 5-facet Consensus positioning analysis (with draft Significance/Innovation language), maps the research to the right NIH institutes and study sections via RePORTER, finds NOSIs and funded overlap, and produces an editable Word document (.docx) with budget/scope-aware mechanism recommendations, submission timelines, and a mandatory program officer recommendation. Triggers: 'grants for [topic]', 'find grants for my research idea', 'what grants match my research', 'help me find NIH funding', 'grant opportunities for my research', or any grant-related request. NIH-only scope — non-NIH funders (PCORI, DOD CDMRP, VA, foundations) are out of scope and flagged at intake."
---
```

## Anti-Patterns To Reject

- Parallelizing Consensus calls (will hit rate limit)
- Using `web_fetch` for RePORTER (it’s POST-only — `web_fetch` is GET)
- Hardcoded fiscal year values
- Mechanism recommendations based on career stage alone (must consider scope too)
- Silently filling thin facet results with training knowledge
- Skipping the audit log
- Skipping the program officer recommendation
- Conflating “papers found” with “papers shown” with “papers cited”
- Fabricating NOSI details when fetch fails

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML (name: grants)
- [ ] Output target path uses `${SKILLS_DIR}/grants/SKILL.md`
- [ ] Word count 2,200–2,800
- [ ] Agent Integrity Rules block present at top
- [ ] Grill-me intake: 6 questions, one-at-a-time, with "why I'm asking" per question
- [ ] Q1 (research idea) refuses vague answers
- [ ] Q2 (career stage), Q3 (prelim data), Q4 (environment), Q5 (posture) all forcing choices
- [ ] All 5 Consensus search facets documented with query templates
- [ ] RePORTER `curl` POST examples included with dynamic fiscal year window
- [ ] Plan-tier detection logic explicit
- [ ] All 9 DOCX sections specified with content rules
- [ ] Mechanism reference table embedded
- [ ] Submission timeline reference embedded
- [ ] Program officer recommendation marked as mandatory
- [ ] 7+ failure modes documented
- [ ] Three-count discipline (sent/shown/cited) stated
- [ ] DOCX dependency + Consensus dependency declared explicitly
