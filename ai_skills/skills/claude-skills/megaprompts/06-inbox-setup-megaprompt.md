# Mega Prompt: Inbox-Setup — Email Triage Onboarding Skill

## Role

You are a **Skill Architect** specializing in interview-driven setup workflows. Generate a production-grade, distributable Claude skill that interviews a user about their email patterns and produces a complete personalized knowledge base that powers a separate `inbox-triage` skill.

## Output Target

Single file: `${SKILLS_DIR}/inbox-setup/SKILL.md`

Word budget: 2,000–2,400 words. Hard ceiling: 2,500.

## Critical Pairing Note

This skill is **paired with `inbox-triage`**. The knowledge base it produces is consumed by `inbox-triage` on every run. The file contracts (names, sections, fields) MUST match between the two skills exactly. Generate this skill with that contract awareness.

## Skill Purpose

Run once (or re-run when business/priorities change). Interview the user about their email patterns, business context, reply style, and priorities. Generate a structured knowledge base — a set of markdown files in `${WORKSPACE}/Email/` — that captures everything `inbox-triage` needs to process the inbox effectively.

## Knowledge Base Contract (Files To Produce)

The skill must produce exactly these files at `${WORKSPACE}/Email/`:

|File                     |Purpose                                     |Required?                                  |
|-------------------------|--------------------------------------------|-------------------------------------------|
|`email-taxonomy.md`      |Classification system + report preferences  |Yes                                        |
|`email-patterns.md`      |Reply voice, tone, templates, hard rules    |Yes                                        |
|`evaluation-framework.md`|Decision tree for opportunity emails        |Only if user receives pitches/opportunities|
|`rate-card.md`           |Pricing, terms, negotiation posture         |Only if user has pricing                   |
|`blocklist.md`           |Auto-skip senders + learned decline patterns|Yes (seeded, grows over time)              |
|`tracker.md`             |Active follow-ups, overdue items, deadlines |Yes (starts mostly empty)                  |
|`triage-log/`            |Directory for per-run logs                  |Yes (created empty)                        |

## Workflow Structure

The generated skill must follow this structure:

```
1. Introduction (what this produces, when to re-run)
2. Conduct discipline (do NOT generate all files at once; walk through sections)
3. Section 1: The Big Picture (context-gathering interview)
4. Section 2: Email Categories (propose, confirm, generate taxonomy)
5. Section 3: Reply Style & Voice (interview + sample analysis)
6. Section 4: Evaluation Framework (only if opportunities exist)
7. Section 5: Blocklist & Patterns (initial seeding)
8. Section 6: Current State (active follow-ups)
9. Section 7: Report Preferences (delivery format)
10. Section 8: Confirmation & Handoff (final list + handoff to triage)
11. Privacy and ambiguity rules
```

## Critical Improvements Over Naive Implementation

The skill MUST address these concerns:

1. **Email-provider agnostic** — Don't hardcode Gmail. Reference "email provider" generically; document common ones (Gmail, Outlook, Fastmail, etc.). The companion triage skill will handle provider-specific tooling.
1. **Grill-me discipline throughout** — One question at a time, never batch. Forcing format where possible (multi-choice over open-ended). Every question carries its own "why I'm asking" so the user can answer well. Section boundaries don't relax the one-at-a-time rule.
1. **Modular knowledge base** — Skip sections that don't apply (e.g., no evaluation framework if user doesn't receive pitches). Document this skip-logic explicitly.
1. **Sample-based voice extraction** — Ask user to paste 3–5 real sent emails as the highest-quality input for voice patterns. Self-description is unreliable; demonstrated voice is reliable.
1. **Privacy boundary** — Document: never persist passwords, full account numbers, SSNs, or other sensitive credentials in knowledge base files.
1. **Re-run-safe** — Document that this skill can be re-run; existing files should be confirmed before overwriting, with the user choosing per-file behavior (replace, merge, skip).

## Section Specifications (Must Be Fully Documented)

All sections use grill-me discipline: one question at a time, dependency-ordered, each question carries "why I'm asking", forcing format where possible. Each section commits its file(s) at the end before moving to the next section.

**Stop condition for the full interview:** ~25–31 questions total across the 8 sections (depending on skip-logic). Hard ceiling: 35 questions including all sub-clarifications. Section 4 (Evaluation Framework) is skipped entirely when Section 1 surfaced no opportunity-email category, dropping the total by 6 questions and the rate-card file. After Section 8's confirmation + handoff message, intake is closed — never re-open it. To change preferences later, the user re-runs the skill (which detects existing files and asks per-file: replace / merge / skip). The grill-me one-at-a-time rule applies across section boundaries: do NOT batch questions even when moving from S{n} to S{n+1}.

### Section 1: The Big Picture

Six grill-me questions, one at a time:

**S1.Q1**: "What do you do? Give me your role and business in 1–2 sentences. *Why I'm asking:* Context shapes what email patterns to expect — a solo creator's inbox looks nothing like an enterprise PM's."

**S1.Q2**: "What dominates your inbox? Pick the top 1–2: sales pitches / client work / internal team / newsletters / customer support / financial / other. *Why I'm asking:* Dominant categories drive the taxonomy."

**S1.Q3**: "Rough volume split — e.g., '60% business inquiries, 20% ops, 20% noise'. *Why I'm asking:* The split tells me where to focus triage effort."

**S1.Q4**: "Which email address(es) should triage cover? *Why I'm asking:* If multiple, I'll set up per-address taxonomies."

**S1.Q5**: "Run frequency: once daily / 2x daily / 3x daily / on-demand only? *Why I'm asking:* Drives the default search window in triage (9h overlap for 2x/day)."

**S1.Q6**: "Anyone helping manage email — assistant, VA, team — or solo? *Why I'm asking:* Persona handling differs for delegated inboxes."

**Action**: Build mental model. Do NOT write files yet.

### Section 2: Email Categories

Propose 5–7 categories based on Section 1. Use this template set as a starting menu (the skill should pre-recommend a subset based on Q1.S1 answers, not present the whole list raw):

- New Opportunities
- Active Conversations
- Action Required
- Financial
- Important/Personal
- Informational
- Ignore/Low Priority

Then grill via three forcing questions, one at a time:

**S2.Q1**: "Here's my proposed taxonomy: [list]. Does this match your inbox reality — yes / mostly / no? *Why I'm asking:* If 'no', I need to redo the taxonomy before any other section makes sense."

**S2.Q2**: "Missing categories? List them. (Skip if none.) *Why I'm asking:* Missing categories produce uncategorized emails downstream, which hurts triage quality."

**S2.Q3**: "Which category takes the MOST time per email? *Why I'm asking:* That's where draft-reply effort needs to focus most."

**Action**: Generate `email-taxonomy.md` with categories, signals, default actions.

### Section 3: Reply Style & Voice

Six grill-me questions plus the critical sample request:

**S3.Q1**: "Register: formal / casual / in-between? *Why I'm asking:* Calibrates default voice; we'll refine from samples next."

**S3.Q2**: "Three communication pet peeves — phrases you hate, openings you avoid. *Why I'm asking:* I treat these as forbidden tokens in drafts."

**S3.Q3**: "Phrases or sign-offs you always use — list as many as come to mind. *Why I'm asking:* These are your voice fingerprints."

**S3.Q4**: "Different persona for different contexts — e.g., assistant replies as you? *Why I'm asking:* Persona context changes pronoun + signature handling."

**S3.Q5**: "Typical reply length — one-liner / short paragraph / longer? *Why I'm asking:* Length is the easiest voice signal to get wrong."

**S3.Q6**: "Hard rules — never X / always Y? (E.g., never emojis, always reply within 24h, never take calls without context.) *Why I'm asking:* Hard rules are enforced as non-negotiable in every draft."

**S3.SAMPLES** (the critical highest-quality input): "Paste 3–5 real sent emails from your inbox. *Why I'm asking:* Self-description of voice is unreliable. Real samples are the best signal — I'll analyze them for voice patterns that supplement everything above."

If user runs a business: ask about media kits, rate sheets, standard pitches, repeated replies.

**Action**: Generate `email-patterns.md` with tone description (with do/don't examples), persona rules, templates, signatures, hard rules.

### Section 4: Evaluation Framework (Conditional)

**Skip-logic**: only run this section if Section 1 surfaced opportunity emails as a meaningful inbox category. Otherwise jump to Section 5.

Six grill-me questions, one at a time:

**S4.Q1**: "First thing you check when pitched something — give me your gut filter. *Why I'm asking:* That's the top of the decision tree."

**S4.Q2**: "Three instant deal-breakers — things that make you decline immediately. *Why I'm asking:* These become PASS-auto signals."

**S4.Q3**: "Three things that make you immediately interested. *Why I'm asking:* These become TAKE-IT signals."

**S4.Q4**: "Standard pricing / terms — or 'no fixed pricing' if you negotiate every time. *Why I'm asking:* If you have a rate card, I'll generate one; if not, I'll skip."

**S4.Q5**: "Negotiation posture: firm / flexible / depends on context? *Why I'm asking:* Drives draft tone on counter-offers."

**S4.Q6**: "VIP senders or organizations that always get engagement — list names or domains. *Why I'm asking:* VIP list bypasses normal PASS filters."

**Action**: Generate `evaluation-framework.md` (decision tree + recommendation categories + VIP list) AND `rate-card.md` if pricing exists.

### Section 5: Blocklist & Patterns

Three grill-me questions, one at a time:

**S5.Q1**: "Senders or domains to always skip — list them. (Skip if none.) *Why I'm asking:* Auto-blocklist saves the most time per run."

**S5.Q2**: "Patterns in emails you always delete — e.g., 'unsubscribe' links from specific marketers, recruiter cold outreach, newsletters? *Why I'm asking:* Patterns let triage auto-skip variants without exact-match maintenance."

**S5.Q3**: "Specific companies / recruiters / newsletters wasting time — list any. *Why I'm asking:* These seed the blocklist; triage will add more as you override decisions."

**Action**: Generate `blocklist.md` (auto-maintained by triage thereafter).

### Section 6: Current State

Three grill-me questions, one at a time:

**S6.Q1**: "Active threads you're tracking — list with one-line context each. (Skip if none.) *Why I'm asking:* These become tracker entries so triage knows existing context."

**S6.Q2**: "Overdue replies — anything you should have responded to but haven't? *Why I'm asking:* Triage flags these as priority every run until resolved."

**S6.Q3**: "Time-sensitive items with deadlines — list with dates. *Why I'm asking:* Tracker enforces deadlines and surfaces them as overdue at the right time."

**Action**: Generate `tracker.md` with active follow-ups table, overdue section, resolved section (empty), update log (empty). Also create empty `triage-log/` directory.

### Section 7: Report Preferences

Three grill-me questions, one at a time:

**S7.Q1**: "Delivery format — pick one: email draft to self / file in workspace / chat summary only. *Why I'm asking:* The triage report goes here every run."

**S7.Q2**: "Detail level — pick one: 30-second scan / detailed breakdown / both (scan first, expand on request). *Why I'm asking:* Affects report length."

**S7.Q3**: "Anything always shown first — e.g., overdue payments, VIP messages? *Why I'm asking:* Custom 'top-of-report' rules surface what you care about above standard sections."

**Action**: Save these preferences into `email-taxonomy.md` under a "Report Preferences" section.

### Section 8: Confirmation & Handoff

- List every file created with one-sentence summary
- Tell user: "Your triage system is ready. Run the **inbox-triage** skill to process your inbox. First runs need oversight — system learns from your edits and overrides."
- Remind: re-run this setup anytime business/pricing/priorities change

## Trigger Phrases (for frontmatter description)

- "set up my inbox"
- "configure inbox triage"
- "set up my email system"
- "configure email triage"
- "build my email knowledge base"
- "initialize email management"
- "set up inbox triage"
- "onboard email triage"

## Error Handling Requirements

|Situation                          |Behavior                                                                       |
|-----------------------------------|-------------------------------------------------------------------------------|
|Workspace inaccessible             |Stop. Tell user where files would go and ask for permission/path               |
|User refuses to share samples      |Use self-description; flag in patterns file that calibration may need iteration|
|User says “skip this” mid-interview|Honor it; flag the gap in the file as `[needs follow-up]`                      |
|Sensitive info volunteered         |Acknowledge but don’t persist; note in file as `[stored separately by user]`   |
|Re-run on existing setup           |Detect existing files; ask user per-file: replace, merge, skip                 |
|User has no pricing / opportunities|Skip Section 4 entirely; don’t create empty files                              |

## Portability Requirements

- **Claude Code CLI**: Native — writes markdown files directly to filesystem.
- **Claude.ai web**: Works with project files / artifacts. Document the alternate path: generate files as artifacts, instruct user to save to their workspace, or use connected file system if available.

## Frontmatter Spec

```yaml
---
name: inbox-setup
description: "One-time setup skill that builds a personalized inbox triage knowledge base via interactive interview. Interviews the user about their email patterns, business context, reply style, and priorities using grill-me discipline (one question at a time, forcing format where possible, dependency-ordered, each question explains why I'm asking), then generates the knowledge base files that power the companion 'inbox-triage' skill. Run this once before using inbox-triage for the first time. Re-run when business, pricing, or priorities change significantly. Triggers: 'set up my inbox', 'configure inbox triage', 'set up my email system', 'configure email triage', 'build my email knowledge base', 'initialize email management', 'set up inbox triage', 'onboard email triage', or any variation where someone wants to get the email triage system running for the first time."
---
```

## Anti-Patterns To Reject

- Generating all files at once instead of walking through sections
- Asking all questions in one batch
- Hardcoded provider references (Gmail-only thinking)
- Persisting sensitive credentials in knowledge base
- Skipping the “why this question matters” explanation
- Skipping the sample-emails ask for voice (it’s the highest-quality input)
- Overwriting existing files without consent on re-run
- Forcing creation of `rate-card.md` or `evaluation-framework.md` when they don’t apply

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML (name: inbox-setup)
- [ ] Output target path uses `${SKILLS_DIR}/inbox-setup/SKILL.md`
- [ ] Word count 2,000–2,500
- [ ] Grill-me discipline stated as governing principle (one at a time, forcing, why-I'm-asking, dependency-ordered)
- [ ] All 8 interview sections documented with per-question structure (S{n}.Q{m})
- [ ] All 7 knowledge-base files specified with conditional logic
- [ ] Skip-logic for non-applicable sections documented (S4 skipped if no opportunities)
- [ ] Sample-email collection step (S3.SAMPLES) included as critical highest-quality input
- [ ] Privacy boundary explicit
- [ ] Re-run behavior documented
- [ ] Knowledge base file contracts match what `inbox-triage` expects (cross-validated)
- [ ] Handoff message references `inbox-triage` (not `email-triage`) by new name
