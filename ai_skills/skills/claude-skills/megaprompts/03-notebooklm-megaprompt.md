# Mega Prompt: NotebookLM Automation Skill

## Role

You are a **Skill Architect** specializing in browser-automation workflows. Generate a production-grade, distributable Claude skill that controls Google’s NotebookLM (https://notebooklm.google.com) via browser automation — covering reading, source ingestion, Studio output generation, and notebook creation.

## Output Target

Single file: `${SKILLS_DIR}/notebooklm/SKILL.md`

Word budget: 1,800–2,200 words. Hard ceiling: 2,500.

## Critical Portability Notice

This skill REQUIRES browser automation and is **Claude Code CLI only** (or Claude with a Chrome extension / computer-use environment). The generated skill MUST open with this notice prominently:

> **Requires:** A browser automation environment (Claude Code CLI with computer-use, Claude Chrome Extension, or equivalent). Skill will gracefully fail in non-automation contexts with a clear “not supported” message.

## Skill Purpose

Allow Claude to operate NotebookLM on the user’s behalf across four core actions:

1. **Read/Extract** — Query a notebook’s content using its built-in chat
1. **Add Sources** — Push URLs, text, files, YouTube links, or synthesized content into a notebook
1. **Generate Studio Outputs** — Audio Overview, Study Guide, Briefing Doc, Timeline, FAQ, Infographic, Slides, Mind Map
1. **Create New Notebooks** — Initialize from scratch with title + sources

## Workflow Structure

The generated skill must follow this structure:

```
1. Portability notice + prerequisites
2. Step 0: Browser context setup (tab, screenshot, navigate)
3. Phase 0: Grill-Me Intake (2–4 forcing questions for action routing)
4. Notebook discovery (homepage → find → open)
5. Action: Read/Extract (chat-based extraction)
6. Action: Add Sources (URL, text, file, Google Doc, synthesized)
7. Action: Studio Outputs (with custom prompt requirement)
8. Action: Create New Notebook
9. Saving outputs to workspace
10. General tips (screenshot discipline, find-before-click, async waits)
11. Reporting back format
12. Troubleshooting
```

## Grill-Me Intake Specification

Action-routing intake. Up to 4 forcing questions, one at a time, dependency-ordered. Each carries explicit "why I'm asking". Most invocations route via Q1 + Q2 only.

### Q1 (root) — Action

> **What do you want me to do? Pick one:**
> 1. Read / extract — ask a question of an existing notebook
> 2. Add a source — push content (URL, text, file, Google Doc, or synthesized content) into a notebook
> 3. Generate a Studio output — Audio Overview, Study Guide, Briefing Doc, Timeline, FAQ, Infographic, Slides, or Mind Map
> 4. Create a new notebook — initialize with title + initial sources
>
> *Why I'm asking:* Each action takes a different path through the UI and requires different parameters. Naming the action upfront prevents wasted screenshots and lets me ask only the follow-up questions that apply.

Forcing choice. If the user says "open NotebookLM" without specifying an action, refuse to start and re-ask Q1.

### Q2 (depends on Q1) — Notebook identity

> **Which notebook?** [Asked for actions 1, 2, 3 — not for "create new"]
>
> *Why I'm asking:* If you give me a name, I'll search the homepage; if you give me a URL, I'll navigate directly. Names that are ambiguous will get a disambiguation prompt with screenshots.

For action 4 (create new): replace with "What's the title for the new notebook?"

### Q3 (depends on Q1) — Action-specific parameter

For action 1 (read/extract):
> **What's the question to ask the notebook?** Use natural phrasing — the notebook's chat handles it best.

For action 2 (add source):
> **What source type? Pick one:**
> 1. URL / website / YouTube link
> 2. Copied text (paste here or point at content)
> 3. File upload (provide absolute path)
> 4. Google Doc (link)
> 5. Synthesized content (I'll pre-process and add as "Copied text")
>
> *Why I'm asking:* Each source type goes through a different sub-flow in the Add Source dialog. Picking upfront saves a step.

For action 3 (Studio output):
> **Which Studio output? Audio Overview / Study Guide / Briefing Doc / Timeline / FAQ / Table of Contents / Infographic / Slides / Mind Map. And: any custom-prompt direction? (Default prompts produce mediocre output — I always open the customization menu and write a detailed prompt. Tell me the angle or audience.)**
>
> *Why I'm asking:* The output type sets the UI button to find. The custom prompt is mandatory for quality — defaults are too generic.

For action 4 (create new):
> **Initial sources? Provide URLs, file paths, or "I'll add later".**

### Q4 (depends on Q1 = action 3, Studio output) — Custom prompt detail

> **Tell me the angle, audience, and length for the Studio output. Examples:**
> - Audio Overview: "Two-host conversation for a non-technical executive, 8–10 min, focus on business implications not technical depth"
> - Infographic: "Decision-tree style, action-oriented, 6 panels max, monochrome navy"
> - Study Guide: "Undergrad-level, definitions + 3 practice questions per concept"
>
> *Why I'm asking:* This becomes the custom prompt. Default Studio prompts produce mediocre output — specific direction produces sharp output.

Asked only for Studio output generation. Skip otherwise.

**Stop condition:** After Q4 (or earlier with dependency skips), commit and start the action sequence. Most invocations stop at Q3.

## Critical Improvements Over Naive Implementation

The skill MUST address these production concerns:

1. **Tool-agnostic language** — Don’t hardcode “Claude Chrome Extension”. Use generic terms (“browser automation tool”, “screenshot tool”, “click tool”) with notes mapping to common implementations.
1. **Login wall handling** — Explicit: detect login screen via screenshot, stop, and tell the user. Never attempt to handle login automatically.
1. **Async wait discipline** — Studio generation and source ingestion are slow. Document explicit: do NOT wait for Audio Overview to finish; confirm generation started, notify user, and move on.
1. **Screenshot-first discipline** — Every action must be preceded by a screenshot. Document why: NotebookLM is a dynamic SPA where UI varies by account/rollout.
1. **find()-before-click** — Use semantic element finders before pixel coordinates wherever possible.
1. **Synthesized content as source** — Document the powerful pattern of pre-processing content and adding it as “Copied text” rather than raw URL.
1. **Custom Studio prompts** — Mandate that Studio output generation always opens the customization menu and writes a detailed custom prompt. Default prompts produce mediocre output. Provide example custom prompts per output type.

## Action Specifications (Must Be Fully Detailed)

### Action 1: Read/Extract

- Open the notebook
- Locate chat input (semantic find or screenshot coordinates)
- Type the question (use the user’s natural phrasing)
- Submit (Enter or send button)
- Wait 3–5 seconds
- Screenshot the response area
- Extract and present in clean format (not raw chat dump)

### Action 2: Add Sources

Sub-flows for each source type:

|Type                   |Method                                                                              |
|-----------------------|------------------------------------------------------------------------------------|
|URL / Website / YouTube|Add Source → Link → paste URL                                                       |
|Copied Text            |Add Source → Copied text → paste content                                            |
|File Upload            |Use file-upload tool with absolute path + input ref (never click native file picker)|
|Google Doc             |Add Source → Google Docs → Drive picker                                             |
|Synthesized content    |Pre-process content, then add as Copied text                                        |

After every add: wait for ingestion spinner, screenshot to confirm success.

### Action 3: Studio Outputs

Document all output types: Audio Overview, Study Guide, Briefing Doc, Timeline, FAQ, Table of Contents, Infographic, Slides, Mind Map.

**Mandatory workflow:**

1. Locate Studio panel (right side; may need toggle)
1. Find the specific output button
1. **Open customization menu** (chevron/arrow next to button) — NOT the main button
1. **Write detailed custom prompt** (provide examples per output type)
1. Confirm and submit
1. **Do NOT wait for completion** — confirm generation started, notify user, return

**Provide concrete custom prompt examples for at least 4 output types** (Audio Overview, Infographic, Study Guide, one more).

### Action 4: Create New Notebook

- Navigate to homepage
- Click “New notebook”
- Set title
- Add initial sources
- Wait for auto-summary generation

## Critical Async Behavior

Document this rule explicitly:

> **Async output rule**: For Studio generations (especially Audio Overview), DO NOT wait for completion. The user’s session will time out. Click Generate, confirm generation has started via screenshot, tell the user “Generation in progress — NotebookLM will notify you when ready”, and end the task.

## Output Format Spec

After completing any action:

1. Take final screenshot if visually relevant
1. Give clean summary: notebook used, action taken, result
1. Format extracted info readably (not raw chat dumps)
1. For generated outputs: describe what was created and where it is

## Trigger Phrases (for frontmatter description)

Include:

- “open NotebookLM”
- “check my [notebook name] notebook”
- “pull info from NotebookLM”
- “ask my notebook about X”
- “add [source] to NotebookLM”
- “create an infographic in NotebookLM”
- “use NotebookLM Studio”
- “generate a slide deck from my notebook”
- “what does my notebook say about X”
- Any variation involving NotebookLM

## Error Handling Requirements

|Failure                             |Behavior                                                                                  |
|------------------------------------|------------------------------------------------------------------------------------------|
|Browser automation unavailable      |Fail fast with “this skill requires browser automation” message                           |
|Login wall detected                 |Stop. Tell user to log in. Don’t attempt auto-login.                                      |
|Multiple notebooks match name       |Screenshot homepage, list options, ask user to specify                                    |
|Source ingestion spinner stuck > 60s|Note timeout, ask user if they want to retry                                              |
|Studio button not found in panel    |Scroll down or look for “Discover more”; if still missing, note feature may not be enabled|
|Chat response doesn’t appear in 10s |Screenshot, check for error state, retry once                                             |
|Page layout changed unexpectedly    |Screenshot, describe what’s visible, ask user for guidance                                |

## Portability Requirements

- **Claude Code CLI with computer-use**: Native support.
- **Claude.ai web**: Not supported. Skill must detect this and exit cleanly with a clear message.
- **Claude Chrome Extension**: Supported.

The skill must include a `Step 0` that verifies browser automation is available before attempting anything.

## Frontmatter Spec

```yaml
---
name: notebooklm
description: "Browser automation skill for controlling Google's NotebookLM. Handles reading and querying notebooks, adding sources (URLs, text, files, YouTube links, synthesized content), generating Studio outputs (Audio Overview, infographics, slide decks, study guides, briefing docs, mind maps, timelines, FAQs), and creating new notebooks. Triggers on any phrase involving NotebookLM — 'open NotebookLM', 'check my [name] notebook', 'pull info from NotebookLM', 'ask my notebook about X', 'add [source] to NotebookLM', 'create an infographic in NotebookLM', 'use NotebookLM Studio', 'generate a slide deck from my notebook', or any variation where the goal involves NotebookLM. Requires browser automation environment — fails gracefully when unavailable."
---
```

## Anti-Patterns To Reject

- Tool-specific tool names without abstraction
- Synchronous waiting on Studio generations (especially Audio Overview)
- Skipping screenshots between actions
- Using pixel coordinates when semantic find() is available
- Attempting to handle login flows automatically
- Generating Studio outputs without opening customization menu
- Using default Studio prompts (always write custom)

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML
- [ ] Word count 1,800–2,500
- [ ] Portability notice present at top
- [ ] Grill-me intake: 2–4 questions, one-at-a-time, with "why I'm asking" per question
- [ ] Q1 (action) forcing choice — refuses to start without action commitment
- [ ] Q3 branches per action (read / add source / Studio / create new)
- [ ] Q4 (Studio custom prompt) marked mandatory for action 3
- [ ] All 4 actions fully specified
- [ ] All 9+ Studio output types listed
- [ ] At least 4 concrete custom prompt examples provided
- [ ] Async wait rule documented (Studio generations don't block)
- [ ] Login wall handling explicit
- [ ] 7+ failure modes documented
- [ ] Tool-agnostic language used throughout
