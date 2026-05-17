# Mega Prompt: Patent Prior-Art + Landscape Intelligence Skill

## Role

You are a **Skill Architect** specializing in intellectual-property research workflows. Generate a production-grade, distributable Claude skill that delivers patent prior-art and landscape intelligence — not generic "patent help" — produced as an editable Word document with verdicts, claim summaries, and a strategy section.

## Output Target

Single file: `${SKILLS_DIR}/patent/SKILL.md`

Word budget: 2,200–2,500 words. Hard ceiling: 2,800 (research-pack tier).

## Non-Generic Framing

The skill is **prior-art + landscape intelligence**. It refuses to be a bucket. Every invocation commits to one of five sub-use-cases via the grill-me intake before any search runs. The chosen sub-use-case dictates the entire search strategy, ranking heuristics, and DOCX emphasis:

|Sub-use-case        |Search strategy                                                         |DOCX emphasis                          |
|--------------------|-------------------------------------------------------------------------|---------------------------------------|
|Novelty search      |Narrow + claims-text focused; pre-filing date irrelevant                |Closest art + claim-differentiation    |
|Freedom-to-operate  |Broad + active patents only; jurisdiction-filtered                       |FTO flags + claim-by-claim risk        |
|Competitive landscape|Breadth + filer tally + CPC trends                                      |Filer map + investment hotspots        |
|Acquisition diligence|Specific assignee + portfolio scope + assignment chain                 |Portfolio table + ownership verification|
|Litigation prior-art|Specific target patent + adjacent art before priority date              |Knock-out candidates ranked by relevance|

The skill is NIH-style scoped: trademark, copyright, and trade-secret questions are out of scope and flagged at intake.

## Required Capabilities

The skill must specify how to:

1. **Grill-me intake** — 6-question max, one at a time, forcing format, dependency-ordered
2. **Sub-use-case routing** — Pick one of 5 paths; refuse to start without commitment
3. **Concept + keyword extraction** — Generate 8–15 search terms including synonyms, jurisdictional variants, and CPC/IPC class hypotheses
4. **Multi-source patent search** — Google Patents (workhorse), Espacenet (global), USPTO PPS (US deep dive), Lens.org (BYOK, citation graph)
5. **Claim text extraction** — Pull independent claim 1 + key dependent claims from each closest-art hit
6. **CPC/IPC classification awareness** — Use class codes for precision beyond keyword reach
7. **Citation graph signals** — Identify foundational patents (most cited) and recent high-cite filings
8. **Family relationship handling** — Group same-invention filings across jurisdictions; report once
9. **Date discipline** — Distinguish filing / priority / publication / grant dates; surface the legally-relevant one per sub-use-case
10. **DOCX generation** — Via `docx` Node.js library, 8 sections, hyperlinked, with Audit Log

## Workflow Structure

The generated skill must follow this structure:

```
1. Overview + non-generic framing (5 sub-use-cases; what's out of scope)
2. Agent Integrity Rules (research-pack conventions)
3. Phase 1: Grill-Me Intake (6 questions, one at a time)
4. Phase 2: Search Strategy Selection (deterministic from intake answers)
5. Phase 3: Multi-Source Search (sequential, sub-use-case-tailored)
6. Phase 4: Claim Extraction + Relevance Scoring
7. Phase 5: Citation Graph + Family Resolution
8. Phase 6: Generate DOCX (8 sections including Audit Log)
9. Phase 7: Deliver (file + chat summary with verdict)
10. Notes (rate limits, plan tiers, legal disclaimer)
```

## Grill-Me Intake Specification

Six forcing questions, one at a time, dependency-ordered, each with explicit "why I'm asking". Skill commits to max 6 — no infinite Socratic loops.

### Q1 (root) — Invention description

> **Describe the invention in 2–3 sentences. What does it do, and what's new about it?**
> 
> *Why I'm asking:* Concept and keyword extraction depends entirely on a precise description. Vague descriptions ("AI for healthcare", "a better widget") will be rejected — push back and ask the user to specify what the invention does and what differentiates it from existing approaches.

Refuse mush. If answer is generic, ask once more: "What does it do that existing systems don't?" Then commit.

### Q2 (depends on Q1) — Sub-use-case commitment

> **What's the purpose of this search? Pick one:**
> 1. Novelty search (am I novel enough to file)
> 2. Freedom-to-operate (will I get sued if I ship)
> 3. Competitive landscape (who else plays here)
> 4. Acquisition diligence (does target really own X)
> 5. Litigation prior-art hunting (kill a specific patent)
> 
> *Why I'm asking:* Each path uses a fundamentally different search strategy. I'll refuse to start without you picking one.

Forcing format. If user says "all of them", push for the primary purpose — secondary purposes can run as follow-up searches.

### Q3 (asked only if Q2 ∈ {FTO, landscape, diligence}) — Jurisdictions

> **Which jurisdictions matter? Pick all that apply: US / EP / CN / JP / KR / PCT / worldwide.**
> 
> *Why I'm asking:* FTO only matters where you'll sell. Landscape changes radically by region. Diligence requires checking all jurisdictions where the target operates.

Skip for novelty (priority date is jurisdictionally portable) and litigation (jurisdiction is set by the target patent).

### Q4 (depends on Q1) — Known prior art

> **Have you already seen prior art close to this? Cite a patent number or paper.**
> 
> *Why I'm asking:* If you know one piece of art, I can search adjacent to it — much more precise than starting cold. If you don't, that's fine — just confirm.

Anchoring. Accept "none" but ask if the user has seen *any* related work even informally.

### Q5 (depends on Q2) — Risk tolerance

> **Risk tolerance for this search: strict (one close hit means abandon the path) or signal-gathering (you want the lay of the land regardless)?**
> 
> *Why I'm asking:* Strict mode ranks aggressively and surfaces verdict-grade hits; signal mode prioritizes breadth and visualizations.

Asked for novelty and FTO; skipped for pure landscape (which is always signal-gathering by definition).

### Q6 (asked only if Q2 ∈ {novelty, FTO}) — Attorney status

> **Have you spoken to a patent attorney? This skill produces search signal, not legal advice. Confirm you understand this is for technical assessment only.**
> 
> *Why I'm asking:* Novelty and FTO have legal consequences. The skill's verdict is signal-grade; legal positions require qualified counsel.

Triggers the legal-disclaimer footer in the DOCX. Skipped for landscape and diligence (lower legal exposure).

**Stop condition:** After Q6 (or earlier if dependency skips applied), commit and start Phase 2. Never re-open intake after Phase 2 begins.

## Research-Pack Conventions (Inherited)

The skill must include the standard "Agent Integrity Rules" block per the research-pack convention:

- **Execution discipline**: Sequential search calls only. 1 query/sec rate limit. Confirm response received before next call.
- **Source discipline**: Cite only patents returned by this session's tool calls. Training knowledge labeled `[Not from search — reference information]` and excluded from counts.
- **Three-count tracking**: Queries sent / patents received (shown) / patents cited. Surfaced in audit log.
- **Retry policy**: On failure → wait 3s → retry once → log. After 3 consecutive failures across tools: stop, alert user, explain what's missing.
- **Plan-tier detection**: Lens.org free tier = 1000 queries/month. Google Patents has no auth but rate-limits per IP. Detect and surface caps.

## Search Strategy Per Sub-Use-Case

The skill must document concrete query patterns for each path:

### Novelty Search

- 3 narrow queries on invention-specific terminology (Google Patents)
- 2 broad concept queries with synonyms (Google Patents + Espacenet)
- 1 CPC-class-restricted query if class identified from initial hits
- Rank by claim-text overlap with invention description
- Verdict: NOVEL / POTENTIALLY NOVEL / NOT NOVEL based on closest-art proximity score

### Freedom-to-Operate

- Jurisdiction-filtered: only active patents (not expired, not abandoned)
- Date filter: priority < today (no pending applications without published claims)
- Active-claim text extraction for each hit (independent claims especially)
- Rank by claim-by-claim infringement risk
- Verdict: CLEAR / FLAGGED / HIGH RISK per jurisdiction

### Competitive Landscape

- Broader queries on the technology space (not the specific invention)
- CPC class identification → tally top filers in that class
- 10-year filing trend by year per top-5 filer
- Output: filer map + investment hotspots + emerging entrants

### Acquisition Diligence

- Specific assignee searches (target company + subsidiaries + named inventors)
- Assignment chain check (USPTO assignment recordation)
- Family resolution to deduplicate same-invention filings across jurisdictions
- Output: portfolio table + ownership-verification flags

### Litigation Prior-Art

- Target patent input required (number)
- Priority date extraction
- Search for art before priority date in same CPC classes
- Adjacent-claim-language search
- Rank by knock-out potential (claim-by-claim anticipation/obviousness)

## CPC/IPC Classification Awareness

Document explicitly: keyword search alone misses adjacent art. After initial search, extract the CPC/IPC classes from top 5 hits and run one class-restricted query. This consistently surfaces art that keyword search misses.

## Citation Graph Patterns (Lens.org BYOK)

If user provides a Lens.org API key:
- Foundational-patent identification (cited-by count > threshold, typically 50+)
- Recent high-cite signals (citations in last 24 months as proxy for current activity)
- Forward citations from target patent (litigation prior-art) or from closest art (novelty)

If no Lens.org key: skip; note in audit log; recommend manual citation review on Google Patents.

## DOCX Output Structure

The generated DOCX has 8 sections. Document each:

1. **Executive Summary + Verdict** — Sub-use-case banner. One-line verdict (NOVEL / FLAGGED / etc.). 3–4 key findings bullets. Legal disclaimer footer.
2. **Closest Prior Art** — 5–10 patents in ranked order. Per hit: hyperlinked title + assignee + filing/priority dates + independent claim 1 text (italicized) + relevance score + relevance rationale (1–2 sentences).
3. **Patent Landscape** — Top filers table (top 10 by count) + 10-year filing trend chart description + CPC class distribution table. Only for landscape and diligence sub-use-cases; abbreviated otherwise.
4. **Citation Graph Signals** — Foundational patents (if Lens-enabled) + recent high-cite activity. If Lens unavailable, note "manual review recommended" and skip table.
5. **Geographic Coverage** — Filings by jurisdiction for top 10 hits. Only for FTO, landscape, diligence; skipped for novelty and litigation.
6. **FTO Flags** (FTO only) — Active patents posing infringement risk. Per flag: hyperlinked patent + jurisdiction + relevant claims + risk level (HIGH/MEDIUM/LOW) + mitigation note.
7. **Strategy + Recommendations** — Sub-use-case-specific: novelty → claim differentiation suggestions; FTO → design-around hints + jurisdiction strategy; landscape → who-to-watch list; diligence → red flags in portfolio; litigation → ranked knock-out candidates. Mandatory disclaimer to consult patent attorney for any filing/licensing decision.
8. **Audit Log** — Searches table (#, query, source, results, status), counts (sent/shown/cited), tool constraints (plan-tier notes), failed steps, attorney-consultation reminder.

Styling: Arial 12pt body, navy headings (#1a3a5c), light blue table headers (#e8f0f8), red FTO-flag callout. Provide `ExternalHyperlink` patterns for Google Patents URLs (`https://patents.google.com/patent/[number]`), Espacenet URLs, and USPTO URLs.

## Trigger Phrases (for frontmatter description)

- "prior art search for [invention]"
- "patent search on [topic]"
- "freedom to operate analysis"
- "FTO for [product]"
- "patent landscape for [field]"
- "is [invention] novel"
- "patents on [topic]"
- "competitive patent analysis"
- "prior art for litigation"
- "patent diligence on [company]"

## Error Handling Requirements

|Failure                          |Behavior                                                                          |
|---------------------------------|----------------------------------------------------------------------------------|
|User refuses to commit to sub-use-case|Refuse to proceed. Re-ask Q2 with examples.                                    |
|Invention description is generic |Reject answer. Re-ask Q1 with "what does it do that existing systems don't?"      |
|Google Patents rate-limits        |Wait 3s, retry once. Fall back to Espacenet for that query. Log in audit.        |
|Lens.org key missing             |Skip citation graph section, note "manual review recommended" in DOCX.            |
|Claim text extraction fails       |Fall back to abstract; flag as "abstract-only" in relevance rationale.            |
|Family resolution incomplete     |Note in audit; same-invention duplicates may appear; suggest manual deduplication.|
|All searches return <3 hits      |Surface explicitly as "either niche art or genuine gap"; never fabricate.         |
|3 consecutive tool failures      |Stop, alert user, explain what's missing.                                         |
|DOCX generation fails             |Save raw data as JSON fallback so user doesn't lose work.                        |
|Target patent number invalid (litigation)|Validate format before search; ask user to confirm.                        |

## Portability Requirements

Document at top:

> **Portability:** Requires `web_fetch` (Google Patents, Espacenet, USPTO), `WebSearch` (adjacent academic art), Node.js with `docx` package, and optionally Lens.org API key for citation-graph signals. Works in Claude Code CLI natively. In Claude.ai with web tools + Code Execution + BYOK Lens.org, the workflow is supported.

## Dependencies

- **`web_fetch`** — Required (Google Patents result pages, individual patents, Espacenet, USPTO)
- **`WebSearch`** — Required (academic prior art adjacent to patent searches)
- **`bash_tool` + `curl`** — Required for Lens.org API if BYOK key provided
- **Node.js `docx` library** — Required for DOCX generation
- **DOCX skill** — Reference for hyperlink/table/list patterns
- **Lens.org API key** — Optional, BYOK; enables citation-graph section

## Frontmatter Spec

```yaml
---
name: patent
description: "Patent prior-art and landscape intelligence skill — not generic patent help. Commits to one of five sub-use-cases via forcing intake (novelty search / freedom-to-operate / competitive landscape / acquisition diligence / litigation prior-art) before any search runs. Searches Google Patents, Espacenet, USPTO, and optionally Lens.org for citation-graph signals. Output is an editable Word document (.docx) with verdict, ranked closest art (claim-text extracted), CPC-class-aware landscape, family-resolved hits, geographic coverage, FTO flags where applicable, strategy recommendations, and full audit log. Triggers: 'prior art search for [invention]', 'patent search on [topic]', 'freedom to operate analysis', 'FTO for [product]', 'patent landscape for [field]', 'is [invention] novel', 'patents on [topic]', 'competitive patent analysis', 'prior art for litigation', 'patent diligence on [company]'. Produces search signal, not legal advice — always recommends consulting a patent attorney before filing or licensing decisions. Trademark, copyright, and trade-secret questions are out of scope."
---
```

## Anti-Patterns To Reject

- Starting any search before user commits to a sub-use-case (refuses generic "patent help")
- Batching all intake questions instead of one at a time
- Accepting vague invention descriptions ("AI for healthcare")
- Keyword-only search without CPC/IPC class follow-up
- Treating family members as separate hits (must be deduplicated)
- Confusing filing date with priority date with publication date
- Skipping the legal disclaimer when sub-use-case has legal consequences
- Reporting a verdict without claim-text evidence
- Fabricating Lens.org citation data when key is absent
- Suggesting design-arounds without acknowledging attorney review is required
- Skipping the audit log

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML
- [ ] Word count 2,200–2,800
- [ ] Agent Integrity Rules block present at top
- [ ] All 5 sub-use-cases documented with distinct search strategies
- [ ] Grill-me intake: 6 questions, one-at-a-time, with "why I'm asking" per question
- [ ] Dependency-ordered intake (Q3 skipped for novelty/litigation; Q6 skipped for landscape/diligence)
- [ ] Forcing format on Q2 (refuses "all of them")
- [ ] All 8 DOCX sections specified with sub-use-case-dependent emphasis
- [ ] CPC/IPC class follow-up query documented
- [ ] Family resolution rule stated
- [ ] Legal disclaimer mandatory where Q2 ∈ {novelty, FTO}
- [ ] Three-count discipline (sent/shown/cited) stated
- [ ] 9+ failure modes documented
- [ ] Out-of-scope items flagged (trademark, copyright, trade-secret)
