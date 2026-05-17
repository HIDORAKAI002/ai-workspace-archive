# Mega Prompt: Inbox-Triage — Email Recurring Execution Skill

## Role

You are a **Skill Architect** specializing in recurring workflow automation. Generate a production-grade, distributable Claude skill that performs full inbox triage using a knowledge base produced by the companion `inbox-setup` skill.

## Output Target

Single file: `${SKILLS_DIR}/inbox-triage/SKILL.md`

Word budget: 2,000–2,400 words. Hard ceiling: 2,500.

## Critical Pairing Note

This skill is **paired with `inbox-setup`**. It consumes the knowledge base files that setup produces. The file contracts MUST match exactly. Generate this skill with that contract awareness.

## Skill Purpose

Run inbox triage on a recurring schedule (1–3x/day) or on demand. Classify recent emails, research new senders, generate decision recommendations, draft replies (never send), deliver a clean report, and update the knowledge base with what was learned this run.

## Required Capabilities

The skill must specify how to:

1. **Read knowledge base** — Load all required files at run start
1. **Determine search window** — Compute time range based on run cadence
1. **Search email provider** — Provider-agnostic with adapter pattern
1. **Classify emails** — Apply taxonomy from setup
1. **Research new senders** — Web search for context on unknowns
1. **Generate recommendations** — Apply evaluation framework if exists
1. **Draft replies** — Match user’s voice patterns; NEVER send
1. **Deliver report** — Honor user’s preferred format
1. **Update knowledge base** — Append learnings to evolving files
1. **Log internally** — Per-run log for continuity

## Workflow Structure

The generated skill must follow this structure:

```
1. Prerequisites (KB files to read; fail-fast if missing)
2. Step 0: Grill-Me Intake (light — 0-2 optional override questions)
3. Step 1: Determine search window (date math + run label)
4. Step 2: Search email provider (primary + secondary searches)
5. Step 3: Classify emails (apply taxonomy)
6. Step 4: Research new senders (web search, with skip logic)
7. Step 5: Generate recommendations (apply evaluation framework)
8. Step 6: Draft replies (with voice rules and NEVER-SEND rule)
9. Step 7: Deliver report (per user's preference)
10. Step 8: Update knowledge base
11. Step 9: Internal log
12. Step 10: Empty-inbox handling
13. Critical rules (drafts only, privacy, accuracy, transparency)
```

## Grill-Me Intake Specification

Inbox-triage is intentionally **light-intake** — it runs on a recurring cadence with preferences pre-baked into the knowledge base from `inbox-setup`. The grill-me discipline here is asking only the override questions that matter THIS run.

### Q1 (optional, asked only when on-demand run is outside normal cadence)

> **Override the default 9-hour search window? Pick: yes (specify hours) / no (use default). *Why I'm asking:* If you're running on-demand outside your normal 2x/day cadence, you may want a wider or narrower window — e.g., 24h after a long break, 2h for a quick check.**

Skip if cadence is normal.

### Q2 (optional, asked only when user invokes with category-skip intent)

> **Skip any categories this run? E.g., "skip newsletters", "skip financial". *Why I'm asking:* Sometimes you just want to scan opportunities or just want to clear active threads. Category skip narrows the run scope.**

Skip if user gave no category-skip signal.

**Stop condition:** Max 2 questions. Default invocations skip both questions and run with KB-default preferences. The skill is optimized for fast recurring execution; intake is the exception not the norm.

## Critical Improvements Over Naive Implementation

The skill MUST address these production concerns:

1. **Email-provider agnostic** — Define an adapter pattern: skill describes operations (“search emails after date X with filter Y”, “create draft in thread Z”) and notes the actual tool mapping per provider (Gmail MCP, Outlook MCP, IMAP, etc.).
1. **Fail-fast on missing KB** — If knowledge base files don’t exist, halt and direct user to run `inbox-setup` first. Don’t try to operate without it.
1. **Drafts only — never send** — Stated as non-negotiable rule, in multiple places in the skill. This is the safety property that makes the skill safe to run automatically.
1. **Privacy discipline** — Don’t store passwords, account numbers, sensitive credentials in KB files. Reference threads by ID, not content.
1. **Learning loop** — Document explicit pattern: after 5+ runs, review KB and suggest improvements to user based on observed override patterns.
1. **Date computation** — Provide explicit code/logic for computing search window. Use the current date in context, subtract hours/days.
1. **Time-window overlap** — Default 9-hour window for 2x/day cadence (slight overlap prevents missed emails between runs).
1. **Empty inbox handling** — Still produce a minimal report; check tracker for overdue items.

## Knowledge Base Files (Contract with email-setup)

The skill must declare these as required reads at start:

**Core (read every run):**

- `Email/email-taxonomy.md` — Classification + report preferences
- `Email/email-patterns.md` — Voice, persona, templates, hard rules

**Optional core (read if exists):**

- `Email/evaluation-framework.md`
- `Email/rate-card.md`

**Evolving (read AND update every run):**

- `Email/blocklist.md`
- `Email/tracker.md`

If any **core required** file is missing → halt, direct to setup.

## Step Specifications

### Step 1: Search Window

Compute via current date math. Default lookback: 9 hours (works for 2x/day cadence with slight overlap).

```
now = current_datetime
window_start = now - 9_hours
run_label = "Morning" if now.hour < 12 else "Afternoon" if now.hour < 17 else "Evening"
```

### Step 2: Email Search

Two queries:

- **Primary**: Inbox + sent after `window_start`
- **Secondary**: Starred unread (catch flagged items missed in primary)

Collect: sender, subject, date, snippet, thread ID, labels.

### Step 3: Classification

Apply taxonomy. For lowest-priority category (newsletters/automation/spam), skip thread reads entirely. For everything else, read full thread for context.

### Step 4: Sender Research

For senders not in tracker/blocklist/prior logs:

1. Check blocklist → auto-skip if matched
1. Check tracker → note existing context
1. Web search for opportunity senders (company legitimacy, social presence, intermediary status)

Skip research for: known senders, internal email, automated notifications, obvious low-priority.

### Step 5: Recommendations

For decision-required emails, apply evaluation framework. Categories:

- **TAKE IT** — Meets criteria, recommend engaging
- **WORTH CONSIDERING** — Has potential, needs user judgment
- **PASS** — Doesn’t meet criteria
- **FLAG FOR REVIEW** — Unusual; needs direct user decision

Each: brief “why” (1–3 sentences), relevant context, pricing/timeline comparison if applicable.

Skip step entirely if no `evaluation-framework.md` exists.

### Step 6: Drafts

For every reasonable reply candidate, create a draft using `email-patterns.md` voice rules.

**Draft for:** opportunity responses, active conversations needing reply, action items, important personal emails.

**Do NOT draft for:** clearly no-response emails, threads where user already replied, blocked senders (unless new info).

**Mechanics:**

- Draft only in existing thread when possible
- Set `to`, `subject` (`Re: [original]`)
- **NEVER call any send operation. Only create drafts.**

### Step 7: Report Delivery

Honor user’s preference from `email-taxonomy.md`. Default: email draft to self with HTML.

**Subject**: `Inbox Triage — [Day], [Month Date] ([Run Label])`

**Sections (in order):**

1. **Overview** — 2–3 sentences. What happened? Anything urgent?
1. **Stats** — Counts: processed, drafts created, action needed, skipped.
1. **Action Needed** — Overdue items, decisions, drafts to review, deadlines.
1. **Quick Reference** — One line per email, alphabetical by sender. **Sender** — one-sentence summary + recommendation.
1. **Detailed Cards** — Opportunities, active threads, flags. Each: sender/subject/category, recommendation + reasoning, key context. NO draft text previews.
1. **Footer** — Generation timestamp.

**Formatting (if HTML)**:

- Inline CSS only (Gmail strips `<style>`)
- Color-coded by recommendation: green (take it), amber (worth considering), red (pass), purple (flag), blue (active)

### Step 8: Knowledge Base Update

**`blocklist.md`**:

- New declined senders + reason + date
- New decline patterns from observed behavior
- Remove entries if user has overridden them

**`tracker.md`**:

- New follow-ups for emails needing future action
- Update existing follow-ups
- Mark resolved items complete
- Flag overdue items
- Remove resolved items older than 30 days
- Add entry to update log

**Learning patterns to observe over runs:**

- Drafts sent as-is vs. edited vs. deleted → tone calibration
- PASS recommendations user overrides → framework adjustment
- Engaged vs. ignored emails → taxonomy refinement
- New decline patterns → blocklist additions

After 5+ runs, suggest KB improvements to user (e.g., “You always decline X — add as auto-skip?”).

### Step 9: Internal Log

Save to `Email/triage-log/[YYYY-MM-DD]-[run-label].md`:

- Emails processed with classifications
- Recommendations made
- Drafts created (with IDs)
- KB updates made
- Follow-ups added/resolved
- Notable observations

### Step 10: Empty Inbox

Even with zero new emails:

1. Check tracker for due/overdue items today
1. Generate minimal report: “No new actionable emails since last run”
1. Flag any overdue items
1. Escalate per tracker rules

## Critical Rules (Must Be Stated Prominently)

1. **DRAFTS ONLY — NEVER SEND.** Stated multiple times. Non-negotiable.
1. **Privacy** — No passwords/credentials in KB. Reference threads by ID for sensitive content.
1. **Accuracy over speed** — When unsure, flag for review. A wrong auto-draft is worse than no draft.
1. **Respect the KB** — Documented preferences are source of truth. Don’t override with judgment.
1. **Transparency** — Note every KB change in the triage log.
1. **First runs need oversight** — Document this expectation for the user.

## Trigger Phrases (for frontmatter description)

- "triage my inbox"
- "inbox triage"
- "check my email"
- "run email triage"
- "process my inbox"
- "what's new in my email"
- "handle my email"
- "email triage"

## Error Handling Requirements

|Situation                                   |Behavior                                                                              |
|--------------------------------------------|--------------------------------------------------------------------------------------|
|KB files missing                            |Halt, direct user to run `inbox-setup`                                                |
|Email tool unavailable                      |Halt with clear message about required tool                                           |
|Web search unavailable for sender research  |Skip research step; note senders not researched                                       |
|Draft creation fails                        |Skip that draft; note in log; report continues                                        |
|Report delivery fails                       |Save report to file as fallback; notify user                                          |
|User has 100+ new emails                    |Stay within reasonable limits; flag volume; offer to focus on priority categories only|
|Sender appears in both blocklist and tracker|Tracker wins (active conversation); note inconsistency in log                         |

## Portability Requirements

- **Claude Code CLI**: Native — uses Gmail/Outlook MCP, file tools for KB, web search for research.
- **Claude.ai web**: Works when email MCP connector is connected (Gmail MCP available). Skill must check tool availability before assuming.

Document: skill auto-adapts based on which email tooling is available. If no email tool is available, skill halts with clear message.

## Frontmatter Spec

```yaml
---
name: inbox-triage
description: "Runs a full inbox triage using the knowledge base created by the 'inbox-setup' skill. Light-intake by design (most invocations skip questions and run with KB-default preferences); asks at most 2 grill-me override questions when invocation is outside normal cadence or includes category-skip intent. Searches recent emails, classifies them via the user's taxonomy, researches new senders, generates recommendations, drafts replies (NEVER sends), delivers a report in the user's preferred format, and updates the knowledge base with learnings. Designed to run on a recurring schedule (1-3x daily) or on demand. Triggers: 'triage my inbox', 'inbox triage', 'check my email', 'run email triage', 'process my inbox', 'what's new in my email', 'handle my email', 'email triage', or any variation where the user wants their inbox processed. Requires the inbox-setup skill to have been run first."
---
```

## Anti-Patterns To Reject

- Sending emails (drafts only — non-negotiable)
- Operating without knowledge base files
- Storing passwords or credentials in KB
- Skipping the learning loop (KB updates) at end of run
- Overriding user’s documented preferences with own judgment
- Reading lowest-priority threads (waste of context)
- Including draft previews in report (drafts are already in email client)
- Provider lock-in without adapter pattern
- Silently failing on missing tools

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML (name: inbox-triage)
- [ ] Output target path uses `${SKILLS_DIR}/inbox-triage/SKILL.md`
- [ ] Word count 2,000–2,500
- [ ] Grill-me intake: 0–2 OPTIONAL questions, light-intake discipline stated
- [ ] Q1 (window override) skipped for normal cadence
- [ ] Q2 (category skip) skipped when no skip-intent in invocation
- [ ] All 10 steps documented
- [ ] DRAFTS-ONLY rule stated in at least 2 places
- [ ] KB file contracts match `inbox-setup` output exactly
- [ ] Fail-fast behavior on missing KB documented (directs user to inbox-setup)
- [ ] Provider-agnostic adapter pattern documented
- [ ] Learning loop (after 5+ runs) documented
- [ ] 7+ failure modes covered
- [ ] Empty inbox handling included
- [ ] Privacy boundary explicit (no credentials in KB)
