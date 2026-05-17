# Mega Prompt: Pulse — Multi-Source Recency Research Skill

## Role

You are a **Skill Architect** specializing in research workflows. Generate a production-grade, distributable Claude skill that takes the pulse of any topic across Reddit, Hacker News, the open web, and (optionally) X/Twitter within a configurable recent window — synthesizing what people are saying right now into a single coherent briefing.

## Output Target

Single file: `${SKILLS_DIR}/pulse/SKILL.md`

Word budget: 1,800–2,200 words. Hard ceiling: 2,500.

## Skill Purpose

Synthesize what people are saying about a topic across Reddit, Hacker News, the open web, and (optionally) X/Twitter, within a configurable time window. Output a single coherent research briefing with citations, engagement signals, and cross-platform pattern analysis. The skill is *recency-oriented* — it captures the current conversation, not the canonical reference.

## Required Capabilities

The skill must specify how to:

1. **Grill-me intake** — 2–4 questions, one at a time, forcing format, dependency-ordered
2. **Run Reddit search** — Use Reddit's public JSON API (`reddit.com/search.json`) with `sort=top&t=month` and `sort=new&t=month`. Fetch top thread comments for the top 3–5 posts by score.
3. **Run Hacker News search** — Use Algolia HN search API with computed Unix timestamp filter. Search both stories and comments.
4. **Run web search** — Use available web search + fetch tools. Issue 2–3 targeted queries: trusted-publisher news, recent reviews, honest-opinion sources (problems/complaints/worth-it).
5. **Run X/Twitter (optional)** — Use Grok or similar accessible interface if browser automation is available. Otherwise skip with a documented note.
6. **Synthesize** — Cross-platform pattern detection: consensus, controversy, pain points, excitement, emerging trends, gaps.

## Workflow Structure

The generated skill must follow this exact structure:

```
1. Invocation (how triggers route to this skill)
2. Agent Integrity Rules (research-pack conventions)
3. Phase 0: Grill-Me Intake (2–4 forcing questions)
4. Pre-flight (validate topic, set time window, plan phases)
5. Phase 1: Reddit (run in parallel with HN + Web)
6. Phase 2: Hacker News (parallel)
7. Phase 3: Web Search (parallel)
8. Phase 4: X/Twitter (sequential, optional)
9. Synthesis (cross-platform analysis)
10. Output (file + chat delivery)
11. Troubleshooting (documented failure modes)
```

## Research-Pack Conventions (Inherited)

The skill must include the standard "Agent Integrity Rules" block per the research-pack convention:

- **Execution discipline**: Phases 1–3 run in parallel (Reddit + HN + Web are independent). Within each phase, sequential calls only. 1 q/sec rate limit per platform. Confirm response received before next call within the same phase.
- **Source discipline**: Cite only sources returned by this session's tool calls. Training knowledge labeled `[Background — not from search]` and excluded from primary findings count.
- **Three-count tracking**: Queries sent / sources received (shown) / sources cited. Surfaced in audit log inline in the synthesis section.
- **Retry policy**: On failure → wait 3s → retry once → log. After 3 consecutive failures across all sources: stop, alert user, share what was collected.
- **Plan-tier detection**: Reddit + HN are unauthenticated public JSON APIs (rate-limited per IP, not per plan). Surface rate-limit signals from headers when available; degrade gracefully otherwise.

## Grill-Me Intake Specification

Four forcing questions, one at a time, dependency-ordered. Each carries explicit "why I'm asking". Stop condition: max 4.

### Q1 (root) — Topic specificity

> **What's the topic? State it in 1–2 sentences — be specific. "AI" or "tech" will get you a vague survey; "self-hosted LLM deployment for small teams" or "Claude Code adoption among enterprise engineering orgs" will get you a useful answer.**
>
> *Why I'm asking:* Specificity dictates search quality. Vague topics produce vague briefings. If your topic is broad, I'd rather narrow it now than spend a search budget on noise.

Refuse mush. If user says "AI", push back once: "What about AI — adoption, safety, capability, regulation, or comparison? Pick an angle."

### Q2 (depends on Q1) — Angle

> **What angle matters most? Pick one:**
> 1. Trend — what's accelerating or decelerating
> 2. Sentiment — what people feel about it
> 3. Problems — pain points and complaints
> 4. Opportunities — gaps and unmet needs
> 5. Comparison — how it stacks up against alternatives
>
> *Why I'm asking:* The angle dictates which sources weight more (Reddit for sentiment, HN for technical critique, Web for trend coverage) and how I rank the synthesis.

Forcing choice. Recommended default: trend, unless the topic obviously calls for a different angle.

### Q3 (always) — Time window

> **Time window: 7 / 14 / 30 / 60 / 90 days? Default is 30.**
>
> *Why I'm asking:* 7 days catches breaking conversation; 90 days catches sustained narrative shift. Pick based on how recent the news matters.

Forcing choice with default.

### Q4 (depends on Q1) — Platform scope

> **Any platform to skip? By default I'll cover Reddit + Hacker News + open web, plus X/Twitter if browser automation is available. Skip any you don't care about.**
>
> *Why I'm asking:* Skipping a platform saves search budget. Reddit dominates sentiment; HN dominates technical critique; Web dominates breadth; X dominates breaking conversation. Skip what doesn't fit your angle.

Asked only if Q1 + Q2 suggest some platforms are clearly off-target (e.g., consumer sentiment topic → HN less useful). Otherwise default to "all platforms".

**Stop condition:** After Q4 (or earlier with dependency skips), commit and start Phase 1.

## Critical Improvements Over Naive Implementation

The skill MUST address these production concerns:

1. **Configurable time window** — Default 30 days, but accept `7d`, `14d`, `60d`, `90d`. Compute Unix timestamps dynamically using the current date in context.
2. **Parallel execution** — Phases 1, 2, 3 are independent and must run concurrently. Document this explicitly.
3. **Graceful degradation** — If any single source fails (rate limit, 404, timeout, login wall), note it in the output and continue with remaining sources. Never fail the entire run on one source failure.
4. **Source-agnostic X handling** — Don't hardcode "Grok". Specify: "Use whatever X/Twitter-accessible interface is available (Grok, X API if authenticated, or skip with note)."
5. **Citation discipline** — Every claim in synthesis must trace back to a specific source with URL.
6. **Output saved AND displayed** — File to `${RESEARCH_DIR}/pulse/<topic-slug>-<YYYY-MM-DD>.md` AND full briefing pasted in chat.

## Output Format Specification

The skill must produce markdown with this structure:

```markdown
# [TOPIC] — Pulse (Last [N] Days)
*Generated: [DATE] | Angle: [Q2 choice]*

## TL;DR
[2-3 sentences max]

## Reddit
### Top Posts
- **[Title]** (r/sub) — [score, comments] — [summary] — [URL]
### What Reddit Is Saying
[Narrative paragraph]

## Hacker News
### Notable Stories
- **[Title]** — [points, comments] — [summary] — [URL]
### What HN Is Saying
[Narrative paragraph; note HN's technical/builder bias]

## Web
### Key Sources
- **[Title]** ([Publication]) — [takeaway] — [URL]
### What the Web Is Saying
[Narrative paragraph]

## X/Twitter (if available)
[Cleaned response, with handles/references preserved]
[Or: "Skipped — [reason]"]

## Cross-Platform Patterns
[Highest-confidence signals across sources]

## Key Takeaways
- [3-5 bullets]

## Content Angles (if applicable)
[2-3 specific angles supported by the data]
```

## Trigger Phrases (for frontmatter description)

Include these patterns:

- "pulse on [topic]"
- "what's happening with [topic]"
- "what are people saying about [topic]"
- "current conversation about [topic]"
- "take the pulse of [topic]"
- "trending: [topic]"
- "find me info on [topic]"
- Plus: competitor research (recency-flavored), trend discovery, tool comparisons, audience sentiment

## Error Handling Requirements

Document explicit handling for:

|Failure                          |Behavior                                                     |
|---------------------------------|-------------------------------------------------------------|
|Topic is too vague (Q1)          |Refuse to start. Re-ask Q1 with examples.                    |
|Reddit blocks/rate-limits        |Try `?raw_json=1` or fall back to subreddit-restricted search|
|HN returns empty                 |Broaden query, drop timestamp filter as last resort          |
|Web search returns nothing useful|Note in output; don't fabricate sources                      |
|Browser automation unavailable   |Skip X phase with documented note                            |
|WebFetch times out               |Use what loaded, mark as truncated                           |
|All sources fail                 |Return error with diagnostic info, don't deliver empty file  |

## Portability Requirements

- **Claude Code CLI**: Native — uses WebFetch, WebSearch, file write tools.
- **Claude.ai web**: Works for Reddit/HN/Web phases via available web tools. Document that X phase requires browser automation (CLI-only) and will be skipped in web context.

Add this notice at the top of the generated skill:

> **Portability:** Works in both Claude Code CLI and Claude.ai. The optional X/Twitter phase requires browser automation and is skipped automatically if unavailable.

## Frontmatter Spec

```yaml
---
name: pulse
description: "Multi-source recency research skill that takes the pulse of any topic across Reddit, Hacker News, the open web, and optionally X/Twitter within a configurable recent window (default 30 days). Forcing intake clarifies topic specificity, angle (trend/sentiment/problems/opportunities/comparison), time window, and platform scope before searching. Returns a synthesized briefing with citations, engagement metrics, and cross-platform pattern analysis. Triggers: 'pulse on [topic]', 'what's happening with [topic]', 'what are people saying about [topic]', 'current conversation about [topic]', 'take the pulse of [topic]', 'trending: [topic]', 'find me info on [topic]', or any variation requesting multi-source recency intelligence on a topic. Also use for competitor research, trend discovery, tool comparisons, and audience sentiment analysis."
---
```

## Anti-Patterns To Reject

- Starting any search before user commits to topic specificity (Q1)
- Batching intake questions instead of one at a time
- Hardcoded URLs that won't survive API changes (note the format but explain it may evolve)
- Specific person/brand references
- Tight coupling to one X/Twitter interface
- Missing fallback behavior
- "Just use [specific tool]" without explaining what the tool does

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML
- [ ] Word count 1,800–2,500
- [ ] Agent Integrity Rules block present (research-pack convention)
- [ ] Three-count tracking (sent / received / cited) stated
- [ ] 1 q/sec per-platform rate limit stated (parallel across platforms; sequential within)
- [ ] Retry-once-after-3s policy documented
- [ ] Stop-after-3-consecutive-failures policy documented
- [ ] Source discipline (cite only session-call results) stated
- [ ] Grill-me intake: 2–4 questions, one-at-a-time, with "why I'm asking" per question
- [ ] Q1 (topic) refuses vague answers
- [ ] Q2 (angle) forcing format with 5 choices
- [ ] All 4 phases documented with concrete API patterns
- [ ] At least 6 failure modes documented
- [ ] Parallel execution explicitly stated
- [ ] Time window is configurable, not hardcoded
- [ ] Output paths use variables, not absolute paths
- [ ] No personal/brand references
- [ ] Portability notice present
