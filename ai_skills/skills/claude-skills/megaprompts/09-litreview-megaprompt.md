# Mega Prompt: Litreview — Academic Literature Orientation Skill

## Role

You are a **Skill Architect** specializing in academic research workflows. Generate a production-grade, distributable Claude skill that turns a user's research question into a strategically planned mini literature review, delivered as a researcher-friendly Word document (.docx).

## Output Target

Single file: `${SKILLS_DIR}/litreview/SKILL.md`

Word budget: 2,200–2,500 words. Hard ceiling: 2,800.

## Skill Purpose

Produce a **launching pad** — not a finished literature review, but an orientation document that gives a researcher entering an unfamiliar field everything they need to start reading and searching with confidence. Think: what a generous colleague who knows the field would tell you over coffee: lay of the land, key people, evolution of thinking, and what to read first.

## Required Capabilities

The skill must specify how to:

1. **Initial reconnaissance search** — One broad Consensus search to map themes, terminology, methodological distinctions
1. **Framework selection** — Default PICO; fallbacks SPIDER (social/qualitative) or Decomposition (technology); document hybrid framing
1. **Sub-area generation** — Map topic to framework components → produce sub-area questions
1. **Interactive checkpoint** — Show framework breakdown + sub-areas + depth-selector before searching
1. **Configurable search depth** — Quick (5) / Standard (10) / Deep (20) with budget allocation
1. **Cross-search intelligence** — Track repeat-hit papers, recurring authors, citation-per-year signals
1. **Era-gated searches** — Old (year_max) + new (year_min) for terminology and conclusion shifts
1. **DOCX generation** — 8-section guide with hyperlinked bibliography and audit log

## Workflow Structure

The generated skill must follow this structure:

```
1. Agent Integrity Rules (source / counting / tool constraints)
2. Error Handling rules
3. Phase 0: Grill-Me Intake (3 forcing questions before recon search)
4. Phase 1: Initial Reconnaissance (one broad search)
5. Phase 2: Choose Framework & Generate Sub-areas (PICO default + fallbacks)
6. Checkpoint: Confirm with User (framework table + depth selector + sub-area adjustment)
7. Phase 3: Execute Targeted Searches (sequential, by depth budget)
8. Phase 4: Produce the Research Guide (.docx)
9. Document Structure (8 sections)
10. docx Technical Requirements
```

## Grill-Me Intake Specification

Three forcing questions before the recon search. The existing interactive checkpoint after Phase 2 is preserved and re-described in grill-me discipline terms. Each question carries "why I'm asking".

### Q1 (root) — Research question specificity

> **State the research question in 1–2 sentences. Specific is better — "How do LLMs perform on clinical reasoning tasks compared to physicians?" beats "AI in medicine". Vague questions produce vague reviews.**
>
> *Why I'm asking:* The reconnaissance search hinges on precise terminology. Vague questions produce thin recon results that don't yield a useful framework breakdown.

Refuse mush. Re-ask once with examples if user is too broad.

### Q2 (depends on Q1) — Framework hint

> **Framework — pick one or say "you pick":**
> 1. PICO (Population / Intervention / Comparison / Outcome — most clinical questions)
> 2. SPIDER (Sample / Phenomenon / Design / Evaluation / Research-type — social/qualitative)
> 3. Decomposition (Problem / Solution / Evaluation / Limitations — technology-focused)
> 4. Hybrid (you pick which components from which framework)
> 5. You pick — analyze Q1 and recommend
>
> *Why I'm asking:* PICO is the default for ~70% of clinical questions but maps poorly to qualitative work or technology evaluation. Picking upfront saves the recon search from suggesting a misaligned framework.

Forcing choice with default ("you pick"). The skill should also surface its own framework recommendation after the recon search so user can override.

### Q3 (depends on Q1) — Depth tentative

> **Tentative depth — pick one. Final confirmation comes after the framework breakdown:**
> 1. Quick scan (5 searches)
> 2. Standard review (10 searches)
> 3. Deep dive (20 searches)
>
> *Why I'm asking:* I ask this twice — once now to calibrate the recon search emphasis, once after the framework breakdown to confirm. Tentative answer affects which sub-areas to surface first; final answer drives search budget allocation.

Forcing choice. The skill re-asks at the post-Phase-2 checkpoint after the user has seen the framework breakdown.

**Stop condition:** 3 questions max before Phase 1. The post-Phase-2 checkpoint is its own grill-me moment with the framework table + sub-area-adjustment + depth-reconfirmation.

## Critical Improvements Over Naive Implementation

The skill MUST address these concerns:

1. **Framework selection hierarchy** — PICO first (broadly applicable), not just “clinical questions”. SPIDER and Decomposition as fallbacks. Hybrid framing documented for topics that span frameworks.
1. **Plan-tier detection** — After first search, parse response. “Showing top 10” or upgrade message → free tier (10/search). Up to 20 returned → Pro (20/search). Record cap and report at checkpoint so user can calibrate (“Free tier: 10 searches × 10 results = ~100 papers max”).
1. **Sequential execution discipline** — Consensus rate limit is 1 query/sec. NEVER parallelize. Confirm response before next call. Wait 1+ sec between calls.
1. **Search budget allocation** — Document explicitly per depth: not just more of the same; deep dive uses extra budget for review articles, era-gated searches, follow-ups on high-cite papers.
1. **Cross-search intelligence** — Three trackers across ALL searches: repeat-hit papers (foundational signal), recurring authors (dominant groups), citations-per-year (seminal work). Document this is what transforms search results into field knowledge.
1. **Era-gated comparison** — Document the *purpose* explicitly: surface terminology shifts, conclusion shifts, methodological evolution. Researchers searching only modern terms miss foundational older work.
1. **Source discipline** — Hard rule: only cite what Consensus returned this session. Training knowledge labeled `[Not from Consensus — model knowledge]` and excluded from counts.
1. **Three-count tracking** — Searches executed / unique papers received (deduplicated) / papers cited.
1. **Interactive checkpoint** — Don’t run all searches without user confirmation. Show framework table, sub-areas, depth selector. Wait for response. Allow sub-area adjustments before searching.

## Source Discipline Rules (Must Be Stated)

The skill must include an explicit "Agent Integrity Rules" block (research-pack convention):

- **Source discipline**: Only cite Consensus-returned papers from this session. Training knowledge labeled and excluded from counts. Sparse results stated explicitly, never silently filled.
- **Counting discipline**: Three numbers tracked — searches executed / unique papers received / papers cited. Every cited paper has retrievable Consensus URL from this session.
- **Tool constraints**: Consensus per-query cap depends on plan tier. Detect at first search; report at checkpoint. Rate limit is 1 query/sec — sequential execution mandatory.

## Search Budget Allocation (Must Be Fully Documented)

The skill must specify exactly:

**Quick scan (5 searches):**

- 5 sub-area searches (one per sub-area)
- Skip era-gated and review-specific searches

**Standard review (10 searches):**

- 5 sub-area searches
- 2 review article searches (top 2 sub-areas): `"systematic review [topic]"` / `"meta-analysis [topic]"`
- 2 era-gated searches (most important sub-area): `year_max: 2015` + `year_min: 2021`
- 1 follow-up search on highest-cited paper using its key terms + `year_min` after its publication

**Deep dive (20 searches):**

- 5 sub-area searches
- 5 review article searches (one per sub-area)
- 4 era-gated searches (top 2 sub-areas, old + new each)
- 3 follow-ups on top 3 highest-cited papers
- 3 spare for emerging threads (surprising findings to chase down)

## Cross-Search Intelligence (Must Be Documented)

Three trackers across ALL search results:

1. **Repeat-hit papers** — Same paper in 3+ sub-area searches = likely foundational
1. **Recurring authors** — Same author in multiple searches = dominant research group; top 3-5 most frequent matter
1. **Citation-per-year heuristic** — A 2023 paper with 150 citations >> 2008 paper with 150 citations. Use for seminal-work identification.

## DOCX Output Structure

The generated DOCX has 8 sections. Document each:

1. **Topic Overview** — Single tight paragraph (4-6 sentences): what + why + framework + evidence landscape characterization
1. **Start Here — Priority Reading Order** — 5-7 papers ordered for newcomer: best recent review → foundational paper(s) → 2-3 frontier papers → gap/controversy paper. Each: hyperlinked title + authors/year + one-sentence contribution + one-sentence “what to look for”
1. **How the Field Got Here** — Chronological narrative (1-2 paragraphs) + timeline table (5-8 milestones: Year/Milestone/Significance) + terminology evolution note
1. **Sub-area Guides** (one per sub-area, 4 parts each):
- 4a. What the Research Shows (2-3 sentences synthesis with inline citations)
- 4b. Key Papers (3-5 hyperlinked papers with citation count, year, one-sentence importance)
- 4c. Key Search Terms (6-10 keywords, synonyms, MeSH, historical terms)
- 4d. Boolean Search Strings (2-3 ready-to-paste strings)
1. **Key Research Groups** — Top 3-5 authors/groups with affiliations, sub-area coverage, representative paper link
1. **Open Questions & Gaps** — Three categories: methodological / population-context / conceptual-theoretical. Each gap explains *why it matters*.
1. **Bibliography** — Alphabetical by first author. Every entry has clickable “View on Consensus” link. Every inline citation matches a bibliography entry.
1. **Audit Log** — Search summary table (#, query, filters, papers returned, status), counts block, coverage notes including detected tier and theoretical ceiling

## Interactive Checkpoint Specification (grill-me discipline)

After Phase 2, the skill runs a second grill-me moment — this one is a confirmation loop with forcing options:

1. Output 3-4 sentence summary of initial-search findings (themes, terminology, evidence landscape)
1. Output framework breakdown table:

| Framework Component | How It Maps to This Topic | Proposed Sub-area to Explore |

1. Include a 5th cross-cutting theme row
1. **Re-confirm depth** with forcing choice (Quick / Standard / Deep), surfacing the practical constraint (rate limit + per-query cap from plan-tier detection) so user can calibrate
1. **Sub-area forcing options** — one of:
   - "Looks good — proceed with these sub-areas"
   - "Adjust: add sub-area on [X]"
   - "Adjust: remove and replace [Y] with [Z]"
   - "Restart with different framework"
1. **Why I'm asking**: A wrong framework or sub-area set wastes the search budget. This is the last cheap moment to correct course.
1. Wait for user response before Phase 3. Refuse to start Phase 3 without explicit user choice.

If your environment supports interactive `sendPrompt`-style buttons, use them. Otherwise present as numbered options.

## DOCX Technical Requirements (Must Be Embedded)

Document the key `docx` library patterns:

- Page: US Letter, 1-inch margins
- Lists: `LevelFormat.BULLET` (never unicode bullets)
- Hyperlinks: `ExternalHyperlink` with `style: "Hyperlink"`, full URL (never truncated)
- Tables: dual widths (`columnWidths` + cell `width`), `ShadingType.CLEAR`
- Validation step after save

Reference the docx skill for setup patterns and best practices.

## Trigger Phrases (for frontmatter description)

- "litreview on [topic]"
- "literature review on [topic]"
- "I'm starting a literature review on X"
- "I'm writing a paper on X"
- "help me research X"
- "I'm doing research on X"
- "can you help me research X"

**Do NOT trigger for:** single one-off paper searches where user wants quick list — that's a plain Consensus search.

## Error Handling Requirements

|Failure                                  |Behavior                                                                       |
|-----------------------------------------|-------------------------------------------------------------------------------|
|Consensus rate-limit hit                 |Wait 3s, retry once, log outcome                                               |
|Search returns 0 results                 |Note explicitly; “either niche terminology or genuine gap”; never silently fill|
|Plan-tier cap detected                   |Log tier; report at checkpoint; surface in audit                               |
|3 consecutive failures                   |Stop searching, alert user, share what’s collected so far, ask how to proceed  |
|Sub-area returns thin results (<5 papers)|Flag in audit; suggest manual PubMed/Scholar supplementation                   |
|User wants to adjust sub-areas           |Update table, re-confirm before searching                                      |
|DOCX validation fails                    |Unpack XML, fix, repack                                                        |

## Portability Requirements

Document at top:

> **Portability:** Requires a Consensus MCP connection, Node.js with `docx` package for document generation, and (in CLI) `bash_tool`. Works in Claude Code CLI natively. In Claude.ai with Consensus MCP + Code Execution, the workflow is supported.

## Dependencies

- **Consensus MCP** — Required for literature search
- **`docx` Node.js library** — Required (`npm install docx`)
- **DOCX skill** — Reference for hyperlink/table/list/validation patterns
- **DOCX validation script** — `python scripts/office/validate.py output.docx` (from docx skill)

## Frontmatter Spec

```yaml
---
name: litreview
description: "Academic literature orientation skill that searches papers via Consensus, builds a strategic search plan using PICO (default) or SPIDER / Decomposition / hybrid as fallbacks, and synthesizes findings into a professionally formatted Word document (.docx) research guide. Grill-me intake (research question specificity + framework hint + tentative depth) before the recon search; a second forcing checkpoint after Phase 2 confirms framework + sub-areas + depth before searches consume budget. Configurable depth (5/10/20 queries) controls coverage vs. speed. Output is a 'launching pad' — not a finished review, but an orientation guide that lets a researcher dive in confidently. Triggers: 'litreview on [topic]', 'literature review on [topic]', 'I'm starting a literature review on X', 'I'm writing a paper on X', 'help me research X', 'I'm doing research on X', 'can you help me research X'. Do NOT trigger for single one-off paper searches where the user just wants a quick list — that's a plain Consensus search."
---
```

## Anti-Patterns To Reject

- Parallelizing Consensus calls
- Skipping the interactive checkpoint (running all searches without user confirmation)
- Padding thin results with training knowledge
- Defaulting to non-PICO framework without justification
- Citing papers in chat that didn’t come from Consensus this session
- Hardcoding plan tier instead of detecting from first response
- Skipping era-gated searches in standard/deep budgets
- Skipping cross-search intelligence (repeat-hits, recurring authors)
- Truncating Consensus URLs in hyperlinks

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML (name: litreview)
- [ ] Output target path uses `${SKILLS_DIR}/litreview/SKILL.md`
- [ ] Word count 2,200–2,800
- [ ] Agent Integrity Rules block present at top
- [ ] Grill-me Phase 0 intake: 3 forcing questions before recon search
- [ ] Q1 (research question) refuses vague answers
- [ ] Q2 (framework hint) forcing choice with "you pick" default
- [ ] Q3 (tentative depth) re-confirmed at post-Phase-2 checkpoint
- [ ] Three frameworks documented (PICO primary, SPIDER + Decomposition fallback, hybrid noted)
- [ ] Interactive checkpoint described as grill-me forcing-options moment (not free-text)
- [ ] All 3 search budgets (5/10/20) fully allocated with reasoning
- [ ] Cross-search intelligence (3 trackers) documented
- [ ] All 8 DOCX sections specified
- [ ] Plan-tier detection from first search documented
- [ ] Sequential execution + 1 query/sec rate limit stated
- [ ] DOCX technical patterns embedded (lists, hyperlinks, tables, validation)
- [ ] 6+ failure modes documented
