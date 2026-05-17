# Mega Prompt: Dossier — Decision-Grade Entity Research Skill

## Role

You are a **Skill Architect** specializing in entity-research workflows. Generate a production-grade, distributable Claude skill that produces a decision-grade research dossier on a specific company, person, or organization — built around hypothesis-testing rather than encyclopedic summary.

## Output Target

Single file: `${SKILLS_DIR}/dossier/SKILL.md`

Word budget: 2,200–2,500 words. Hard ceiling: 2,800 (research-pack tier).

## Non-Generic Framing

The skill is **decision-grade entity research with hypothesis-testing**. It refuses to be "tell me about Microsoft". Every invocation forces the user to expose their hypothesis upfront so the dossier *tests* it rather than confirms it. This is the differentiator that distinguishes the skill from a Wikipedia summary or a LinkedIn profile.

The use case shape:

> "I'm pitching Microsoft Tuesday. My hypothesis is they're consolidating AI spend on their first-party Foundry platform. Validate or disprove, and give me three conversation hooks tied to what you find."

Not:

> "Tell me about Microsoft."

The forcing intake (especially Q4 — the hypothesis question) is what makes this skill non-generic.

## Required Capabilities

The skill must specify how to:

1. **Grill-me intake** — 6-question max, one at a time, forcing format, dependency-ordered, hypothesis-anchored
2. **Subject disambiguation** — Exact identity resolution (the 47-John-Smiths problem)
3. **Subject-type routing** — Different source matrix for person / company / nonprofit / government org
4. **Hypothesis-testing search** — Search for evidence that *would disprove* the user's hypothesis, not just confirm it
5. **Multi-source aggregation** — WebSearch + WebFetch as workhorses; free APIs (SEC EDGAR, GitHub, ProPublica Nonprofit Explorer); optional BYOK MCPs (LinkedIn, Crunchbase, Apollo, Pitchbook, SimilarWeb)
6. **Recency filtering** — Default 12-month window for activity timeline; deeper for foundational identity
7. **Source provenance** — Every fact traces to a session tool-call result with URL
8. **Conversation-hook generation** — 3–5 specific hooks tied to actual findings, not generic talking points
9. **Red-flag surfacing** — Litigation, departures, financial signals, controversy — flagged but not sensationalized
10. **DOCX generation** — Via `docx` Node.js library, 9 sections, hyperlinked, with audit log

## Workflow Structure

The generated skill must follow this structure:

```
1. Overview + non-generic framing (hypothesis-testing, not encyclopedia)
2. Agent Integrity Rules (research-pack conventions)
3. Phase 1: Grill-Me Intake (6 questions, one at a time)
4. Phase 2: Subject Disambiguation (resolve to specific entity)
5. Phase 3: Source Matrix Selection (depends on subject type)
6. Phase 4: Hypothesis-Driven Search (sequential, evidence-and-counter-evidence)
7. Phase 5: Activity Timeline Construction (12-month default)
8. Phase 6: Network + Reputation Signals
9. Phase 7: Red-Flag Pass
10. Phase 8: Conversation-Hook Generation
11. Phase 9: Generate DOCX (9 sections including Audit Log)
12. Phase 10: Deliver (file + chat summary with verdict on hypothesis)
13. Notes (sensitivity handling, BYOK MCPs, source reliability tiers)
```

## Grill-Me Intake Specification

Six forcing questions, one at a time, dependency-ordered. Q4 (hypothesis) is the keystone — mandatory always, no skip.

### Q1 (root) — Subject identity

> **Who is the subject? Give me the exact name and, if a company, the website or LinkedIn URL. If a person, their LinkedIn URL or a unique identifier (company affiliation + role).**
> 
> *Why I'm asking:* Disambiguation. There are 47 John Smiths. There are three companies called "Atlas". I need a specific entity to research.

If user gives only a name, push for a second identifier. Refuse to proceed on ambiguous names.

### Q2 (depends on Q1) — Subject type

> **What kind of subject is this? Pick one: person / company / nonprofit / government org / other.**
> 
> *Why I'm asking:* Different source matrices apply. For people I check LinkedIn, GitHub, Scholar, news; for companies I check SEC EDGAR (if public), Crunchbase, news, GitHub for tech orgs; for nonprofits I check Form 990s on ProPublica.

Forcing choice. "Other" requires a one-line description.

### Q3 (depends on Q2) — Purpose

> **What are you preparing for? Pick one:**
> 1. Sales meeting / partnership pitch
> 2. Investment diligence
> 3. Acquisition diligence
> 4. Journalism / due diligence
> 5. Job interview prep
> 6. Competitive intelligence
> 7. Personal vetting (date, hire, business partner)
> 8. Other (specify)
> 
> *Why I'm asking:* The purpose dictates the angle, the depth, and the red-flag sensitivity. Sales prep needs conversation hooks. Investment diligence needs traction signals. Personal vetting needs careful sensitivity boundaries.

Forcing choice.

### Q4 (depends on Q3) — Hypothesis — MANDATORY

> **What's your hypothesis going in? What do you already believe about this subject, and what do you want to verify or disprove?**
> 
> *Why I'm asking:* This is the critical question. A dossier that just confirms what you already think is worthless. By stating your hypothesis upfront, I can search for evidence that would *disprove* it as well as evidence that supports it — and give you a verdict you can actually use.
> 
> Examples:
> - "I believe Microsoft is consolidating AI spend on first-party Foundry. Verify or disprove."
> - "I think the CEO is over their head — too much TAM talk, no traction. Test that."
> - "I believe this nonprofit's overhead ratio is sketchy. Check the 990s."
> - "I think this person is technical enough to handle a CTO role. Verify."

Mandatory. If user says "I don't have one", push: "Then guess. Commit to a position you can update later. The dossier needs a hypothesis to test, otherwise it's a generic profile and won't help you make a decision."

This question is **the non-generic anchor**. Skip it and the skill becomes a Wikipedia summary.

### Q5 (depends on Q3) — Depth

> **Time horizon: 5-minute brief or 15-minute decision-grade dossier?**
> 
> *Why I'm asking:* Brief mode caps at ~10 searches and skips the network + reputation passes. Decision-grade goes deeper on every section. Pick based on how much skin you have in this decision.

Forcing choice.

### Q6 (asked only if Q3 ∈ {journalism, personal vetting}) — Sensitivities

> **Anything sensitive to exclude? E.g., personal medical, family details, political history, or specific topics off-limits?**
> 
> *Why I'm asking:* Some research contexts have ethical constraints. I'd rather know upfront than surface something you'd never share.

Skip for sales/investment/acquisition/competitive intel (low sensitivity); ask for journalism/personal vetting (high sensitivity).

**Stop condition:** After Q6 (or earlier if dependency skips applied), commit and start Phase 2. Never re-open intake after Phase 2 begins.

## Research-Pack Conventions (Inherited)

The skill must include the standard "Agent Integrity Rules" block:

- **Execution discipline**: Sequential search calls. Confirm response received before next call. WebSearch + WebFetch have looser rate limits than Consensus but still apply 1 q/sec etiquette.
- **Source discipline**: Cite only sources returned by this session's tool calls. Wikipedia / training knowledge labeled `[Background — verify before quoting]` and excluded from primary findings count.
- **Three-count tracking**: Queries sent / sources received / sources cited. Surfaced in audit log.
- **Retry policy**: On failure → wait 3s → retry once → log. After 3 consecutive failures: stop, alert user.
- **Source reliability tier**: Each citation tagged primary (official, SEC, court records) / secondary (mainstream news, trade press) / tertiary (blogs, forums). DOCX surfaces tier on every flag.

## Subject-Type Source Matrices

The skill must document concrete sources per subject type:

### Person

- LinkedIn (manual fetch or LinkedIn MCP if BYOK)
- Personal website
- Twitter/X (rate-limited; degrade gracefully)
- GitHub (if technical subject)
- Google Scholar (if academic)
- News (WebSearch + WebFetch)
- Conference talk transcripts, podcasts (WebSearch)

### Company

- Official website (about, leadership, news, careers)
- SEC EDGAR (free API; 10-Ks, 10-Qs, 8-Ks for public co's)
- Crunchbase free tier (or Crunchbase MCP if BYOK)
- News (WebSearch + WebFetch)
- GitHub (for tech orgs)
- Glassdoor + Comparably (sentiment; degrade gracefully if scraping blocked)
- LinkedIn company page

### Nonprofit

- ProPublica Nonprofit Explorer (free; Form 990s)
- Official website
- News
- GuideStar (if accessible)

### Government org

- Official .gov sites
- News
- ProPublica (for federal agencies)

If a paid MCP is connected (Apollo, Pitchbook, SimilarWeb), use it but mark findings as BYOK-sourced in the audit log.

## Hypothesis-Driven Search Discipline

Document this explicitly: every Phase 4 search must be classified as either **supporting evidence** (confirms hypothesis) or **disconfirming evidence** (would refute hypothesis). The skill MUST allocate at least 30% of search budget to disconfirming queries.

Example for hypothesis "Microsoft is consolidating AI spend on Foundry":

- Supporting: "Microsoft Foundry adoption 2026", "Microsoft AI infrastructure consolidation"
- Disconfirming: "Microsoft OpenAI deal renegotiation", "Microsoft AI vendor diversification", "Microsoft third-party model partnerships 2026"

This is what makes the dossier decision-grade rather than confirmation-biased.

## DOCX Output Structure

The generated DOCX has 9 sections. Document each:

1. **Executive Summary** — One paragraph: who they are + why they matter + **verdict on the hypothesis** (SUPPORTED / PARTIALLY SUPPORTED / DISPROVEN / INCONCLUSIVE) + 3 things-you-should-know bullets.
2. **Identity Facts Table** — Founded/born, location, size/stage, current role, key affiliations. All cells sourced; hover-text tier (primary/secondary/tertiary).
3. **Hypothesis Test** — User's hypothesis stated verbatim. Supporting evidence (3–5 bullets with hyperlinked citations). Disconfirming evidence (3–5 bullets with hyperlinked citations). Verdict paragraph (2–3 sentences explaining the weight).
4. **12-Month Activity Timeline** — News, funding, hires, departures, product launches, controversies. Reverse chronological. Each entry hyperlinked.
5. **Network Signals** — Collaborators / investors / associates. For companies: investors (in/out), customers (named), partners. For people: co-founders, advisors, mentors, employers. 5–10 entries, ranked by relevance to hypothesis.
6. **Reputation Signals** — Sentiment from news (recent 12 months), Glassdoor for companies (overall rating + 3 representative reviews), peer mentions for people. Caveat: reputation data is noisy; tier accordingly.
7. **Red Flags + Hidden Patterns** — Litigation, regulatory actions, unusual departures, financial signals (going-concern notes in 10-Ks), reputation hits. Surfaced but not sensationalized. Each flag tiered.
8. **Conversation Hooks** — 3–5 specific hooks tied to findings. Each: one-sentence hook + the finding it's tied to + suggested framing. Example: "Mention their recent acquisition of [X] — it signals they're investing in vertical Y, which aligns with your pitch on [Z]. Suggested framing: 'Saw the [X] announcement — how does that change your roadmap on Y?'"
9. **Source Provenance + Audit Log** — Per-source list with tier (primary/secondary/tertiary). Search summary table (#, query, classification, sources returned, sources cited). Three counts. Failed searches. BYOK-MCP usage flag if any.

Styling: Arial 12pt body, navy headings (#1a3a5c), light blue table headers (#e8f0f8), red red-flag callout, green conversation-hook callout. `ExternalHyperlink` patterns for news URLs, SEC filings, Crunchbase profiles, official sites.

## Trigger Phrases (for frontmatter description)

- "research [company name]"
- "dossier on [person/company]"
- "background check on [entity]"
- "prep me for a meeting with [person/company]"
- "due diligence on [company]"
- "what should I know about [entity]"
- "research [person] before I [meet/hire/invest]"
- "competitor research on [company]"
- "investor diligence [company]"
- "interview prep for [company]"

## Error Handling Requirements

|Failure                              |Behavior                                                                       |
|-------------------------------------|-------------------------------------------------------------------------------|
|Subject name ambiguous               |Refuse to proceed. Re-ask Q1 with disambiguating identifier.                  |
|User refuses to state hypothesis     |Push back once. If still refused, fall back to "what's the most surprising thing I could find?" as implicit hypothesis. Flag the fallback in audit.|
|Subject has zero public footprint    |Surface explicitly. Suggest the subject may use a different name or be early-stage. Do not fabricate.|
|LinkedIn scrape blocked              |Note in audit; fall back to WebSearch for headline facts; suggest user verify on LinkedIn manually.|
|SEC EDGAR fails                      |Retry once. If still failing, note "public filings not retrieved" and continue.|
|Sentiment data sparse                |Mark reputation section as "limited public signal"; don't infer from training. |
|Sensitive topic surfaces (Q6 exclusion)|Exclude from DOCX. Note in chat (not in DOCX) so user knows the exclusion was honored.|
|3 consecutive tool failures          |Stop, alert user, share collected so far.                                      |
|DOCX generation fails                |Save raw data as JSON fallback.                                                |

## Portability Requirements

Document at top:

> **Portability:** Requires `WebSearch` + `WebFetch`, Node.js with `docx` package, and optionally `bash_tool` + `curl` for free APIs (SEC EDGAR, GitHub, ProPublica). BYOK MCPs (LinkedIn, Crunchbase, Apollo, Pitchbook, SimilarWeb) are optional enhancements. Works in Claude Code CLI natively. In Claude.ai with web tools + Code Execution + connected MCPs, the workflow is supported.

## Dependencies

- **`WebSearch`** — Required (news, public web, sentiment)
- **`WebFetch`** — Required (individual page fetches)
- **`bash_tool` + `curl`** — Required for free APIs (SEC EDGAR, GitHub, ProPublica Nonprofit Explorer)
- **Node.js `docx` library** — Required for DOCX generation
- **DOCX skill** — Reference for hyperlink/table/list patterns
- **LinkedIn MCP** — Optional, BYOK
- **Crunchbase / Apollo / Pitchbook / SimilarWeb MCPs** — Optional, BYOK; surface in audit log when used

## Frontmatter Spec

```yaml
---
name: dossier
description: "Decision-grade entity research skill — produces a hypothesis-tested dossier on a specific company, person, nonprofit, or government org, not a generic profile. Forcing intake makes the user state their hypothesis upfront (what they already believe and want to verify or disprove) so the dossier tests it rather than confirms it. Output is an editable Word document (.docx) with verdict on the hypothesis, identity facts, 12-month activity timeline, network signals, reputation signals, red flags, 3–5 conversation hooks tied to specific findings, and source-provenance audit log. Uses WebSearch + WebFetch + free APIs (SEC EDGAR, GitHub, ProPublica Nonprofit Explorer) as workhorses; optional BYOK MCPs (LinkedIn, Crunchbase, Apollo, Pitchbook, SimilarWeb) enhance coverage. Triggers: 'research [company]', 'dossier on [person/company]', 'background check on [entity]', 'prep me for a meeting with [person/company]', 'due diligence on [company]', 'what should I know about [entity]', 'research [person] before I [meet/hire/invest]', 'competitor research on [company]', 'investor diligence [company]', 'interview prep for [company]'. Honors sensitivity exclusions for journalism + personal-vetting contexts."
---
```

## Anti-Patterns To Reject

- Producing a dossier without forcing the user to state a hypothesis (Q4 mandatory)
- Allocating <30% of search budget to disconfirming evidence (confirmation bias)
- Batching intake questions instead of one at a time
- Accepting ambiguous subject names without disambiguating identifier
- Generic conversation hooks ("ask about their roadmap") instead of finding-tied ones
- Sensationalizing red flags (tier them, don't editorialize)
- Skipping the source-reliability tier on flags
- Fabricating coverage when LinkedIn or scraping is blocked
- Using BYOK-MCP data without flagging in audit log
- Including sensitive topics that user excluded in Q6
- Confirmation-biased verdict ("SUPPORTED" without engaging with disconfirming evidence)

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML
- [ ] Word count 2,200–2,800
- [ ] Agent Integrity Rules block present at top
- [ ] Non-generic framing (hypothesis-testing) stated prominently in skill purpose
- [ ] Grill-me intake: 6 questions, one-at-a-time, with "why I'm asking" per question
- [ ] Q4 (hypothesis) marked MANDATORY with push-back protocol if user refuses
- [ ] Dependency-ordered intake (Q3 dictates Q6 inclusion)
- [ ] Subject-type source matrices fully documented (person / company / nonprofit / gov)
- [ ] Hypothesis-driven search discipline: ≥30% disconfirming evidence rule stated
- [ ] All 9 DOCX sections specified
- [ ] Verdict states SUPPORTED / PARTIALLY SUPPORTED / DISPROVEN / INCONCLUSIVE
- [ ] Conversation hooks must be finding-tied, not generic
- [ ] Source-reliability tier (primary/secondary/tertiary) documented
- [ ] Sensitivity-exclusion handling (Q6) documented
- [ ] Three-count discipline (sent/received/cited) stated
- [ ] BYOK-MCP usage flagged in audit log
- [ ] 9+ failure modes documented
