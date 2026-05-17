# Mega Prompt: Capture — Brain-Dump Organizer Skill

## Role

You are a **Skill Architect** specializing in capture-and-organize workflows. Generate a production-grade, distributable Claude skill that ingests messy streams of mixed thoughts, tasks, and ideas and transforms them into a structured, actionable system with zero information loss.

## Output Target

Single file: `${SKILLS_DIR}/capture/SKILL.md`

Word budget: 1,400–1,800 words. Hard ceiling: 2,000.

## Skill Purpose

Catch an unstructured stream of consciousness from the user and organize it into a clean four-section format:

1. **Projects & Ideas** — Clustered themes with embedded questions/decisions
1. **Tasks** — Flat, scannable, action-oriented list
1. **Connections** — Real links to existing workspace content (no fabrication)
1. **How I Can Help** — Concrete next-step offers

The skill ends by asking the user which suggestion to act on next.

## Required Capabilities

The skill must specify how to:

1. **Recognize brain-dump invocations** — Both explicit phrases and implicit signals (long pasted blocks of mixed ideas without explicit framing).
1. **Capture everything** — Zero-loss intake. Even trivial-seeming items must be preserved.
1. **Cluster intelligently** — Group related items into project themes without forcing artificial structure on small dumps.
1. **Detect real workspace connections** — Search/inspect the user’s actual files and folders. Never fabricate connections.
1. **Offer concrete next actions** — Not abstract possibilities. Specific deliverables with specific destinations.

## Workflow Structure

The generated skill must follow this structure:

```
1. Invocation triggers (explicit + implicit)
2. Grill-me discipline (when applicable — see Intake Specification)
3. Section 1: Projects & Ideas (clustering logic)
4. Section 2: Tasks (flat action list)
5. Section 3: Connections (workspace detection)
6. Section 4: How I Can Help (concrete offers)
7. Operating principles (capture-all, voice preservation, complexity-matching)
8. Workspace detection strategy
9. Approval gate (no action without user pick)
```

## Grill-Me Intake Specification

Capture is intentionally **fast-to-action** — when the user dumps, the skill organizes immediately. No upfront intake. The grill-me discipline applies only as **mid-organization clarification** when ambiguity surfaces.

### Mid-organization clarifier (asked at most once per dump, only when needed)

> **Quick clarification — one item in your dump could go either way. Is [X] a one-shot task or a multi-step project? (Asking because tasks go to the flat list; projects get clustered with related items and embedded questions.)**
>
> *Why I'm asking:* If I guess wrong on a borderline item I either bury a project as a task or inflate a task into a project that doesn't need the structure. One question per dump prevents that.

Pattern: identify the single most ambiguous item; ask one forcing question about it; commit and continue. Do NOT ask multiple clarifying questions — that breaks the dump-and-organize flow that makes capture useful.

If the dump is unambiguous, skip the clarifier entirely.

**Stop condition:** Max 1 clarifying question per dump. After clarification (or no clarification needed), deliver the four sections.

## Critical Improvements Over Naive Implementation

The skill MUST address these concerns:

1. **Workspace detection strategy** — Document concrete tactics: Glob/Grep for filename patterns, read top-level directories, check known integration paths (e.g., Notion, Obsidian, Drive if available). Be explicit about how to find connections.
1. **No-fabrication discipline** — Hardcoded rule: only surface connections that actually exist. If workspace is inaccessible or no real connections found, say so explicitly.
1. **Complexity matching** — Document the rule: scale output to input. A 5-task dump shouldn’t be forced into elaborate 4-section format. Show what minimal output looks like.
1. **Voice preservation** — Concrete examples of what NOT to do (corporate-ifying user’s casual language). Preserve energy and intent in restatement.
1. **Approval gate** — Mandatory: present everything, get green light, then execute. The ONLY immediate action is the organization itself.
1. **Ambiguity flagging** — Don’t guess. If unsure what something means, flag it and ask before continuing.

## Section Specifications

### Section 1: Projects & Ideas

- Cluster related items into themed projects when natural clustering exists
- Standalone creative sparks, half-formed concepts, and “what if” thoughts also belong here
- Embed decisions and open questions *within* projects, not in a separate category
- For each project: list components + embedded questions/decisions

### Section 2: Tasks

- Flat, scannable
- Includes: explicit todos, decisions framed as “Decide: …”, open questions framed as “Resolve: …”
- If a task belongs to a project, note the link but don’t repeat context

### Section 3: Connections

This is the section where the skill earns its keep. Document the workflow:

1. **Inventory the workspace** — Glob for known patterns, read relevant directories, check connected systems
1. **Match dump items to existing content** — Files/folders relating to dumped items, prior thinking in documents, in-progress projects with overlap
1. **Surface dependencies within the dump** — Items that affect each other, themes, ordering implications
1. **Be honest about inaccessibility** — If you can’t inspect the workspace, say so and ask about the user’s setup

Document: NEVER fabricate connections. Only surface ones actually found.

### Section 4: How I Can Help

Concrete offers, not abstract possibilities. Examples of the right pattern:

- ✅ “I can research Consensus MCP integration patterns and give you 3 options”
- ❌ “You might want to look into integration approaches”

Each offer must specify: what would be produced + where it would go.

End with a directive question like: “Which of these should I tackle?”

## Workspace Detection Strategy (Must Be Documented)

Document specific tactics:

|Context                              |Detection method                                                                         |
|-------------------------------------|-----------------------------------------------------------------------------------------|
|Claude Code CLI                      |Glob for files matching dump keywords; Grep for content matches; read top-level structure|
|Claude.ai with project               |Check project knowledge files for thematic overlap                                       |
|Connected tools (Notion, Drive, etc.)|Search via MCP if available                                                              |
|No accessible workspace              |State limitation explicitly; ask user about setup                                        |

## Operating Principles (Must Be Stated Explicitly)

1. **Capture everything** — Zero loss. Trivial items go in; user discards later.
1. **Match complexity to input** — Don’t force 5 tasks into 4 sections.
1. **Preserve voice** — User said “build something crazy with AI”, not “Explore innovative AI-driven solutions.”
1. **Be honest about ambiguity** — Flag and ask, don’t guess.
1. **No action without approval** — Organization happens immediately; everything else waits for user pick.

## Trigger Phrases (for frontmatter description)

Explicit:

- “brain dump”
- “let me dump some ideas”
- “I’ve got a bunch of thoughts”
- “here’s everything on my mind”
- “idea dump”
- “let me just get this out of my head”
- “I need to organize my thoughts”
- “here’s what I’m thinking”

Implicit (recognized without phrase):

- User pastes/dictates a long unstructured block of mixed ideas, tasks, plans
- Multiple unrelated thoughts in one message without organizing framing

## Error Handling Requirements

|Situation                     |Behavior                                                |
|------------------------------|--------------------------------------------------------|
|Workspace inaccessible        |State this; skip Section 3 or ask user about their setup|
|Dump is very short (3-5 items)|Use compressed output; don’t force four full sections   |
|Items are highly ambiguous    |Flag in output, ask before continuing                   |
|Dump contains sensitive info  |Acknowledge but don’t echo verbatim if asked to organize|
|Conflicting items in the dump |Surface the conflict in Section 3 explicitly            |
|User says “go” before approval|Honor it, but note any items you weren’t sure about     |

## Portability Requirements

- **Claude Code CLI**: Native — uses Glob/Grep/Read for workspace inspection.
- **Claude.ai web**: Native — uses project files / connected tools / conversation context for workspace inspection. Skill must document the fallback path when filesystem isn’t available.

## Frontmatter Spec

```yaml
---
name: capture
description: "Captures and organizes chaotic brain dumps into a structured, actionable system with zero information loss. Use this skill whenever the user says 'capture this', 'brain dump', 'let me dump some ideas', 'I've got a bunch of thoughts', 'here's everything on my mind', 'idea dump', 'let me get this out of my head', 'I need to organize my thoughts', 'here's what I'm thinking', or any variation where someone is unloading a messy stream of ideas, tasks, thoughts, and plans wanting them turned into something coherent. Also trigger when the user pastes or dictates a long, unstructured block of mixed ideas — even without the exact phrase — the intent is the same. Fast-to-action by design: no upfront intake. Output is four sections (Projects/Ideas, Tasks, Connections, How I Can Help) ending with a directive question. Asks at most one mid-organization clarifying question when a single item is genuinely ambiguous between task and project."
---
```

## Anti-Patterns To Reject

- Fabricating workspace connections that weren’t actually verified
- Dropping items deemed “trivial” — capture everything, let user prune
- Corporate-ifying the user’s casual language
- Forcing 4-section structure when input is small (5 simple tasks doesn’t need it)
- Acting on dump items immediately without approval
- Splitting decisions/questions into separate categories instead of embedding them
- Vague offers in Section 4 (“you might want to consider…”)

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML (name: capture)
- [ ] Output target path uses `${SKILLS_DIR}/capture/SKILL.md`
- [ ] Word count 1,400–2,000
- [ ] All 4 sections fully specified
- [ ] No-fabrication rule explicitly stated for Connections
- [ ] Complexity-matching rule documented with example
- [ ] Workspace detection strategy documented per context
- [ ] Approval gate stated clearly
- [ ] 5 operating principles all included
- [ ] Implicit invocation signals documented
- [ ] Voice preservation rule with concrete example
- [ ] Grill-me mid-organization clarifier documented as MAX 1 per dump
- [ ] Fast-to-action discipline stated (no upfront intake; ask only when truly ambiguous)
