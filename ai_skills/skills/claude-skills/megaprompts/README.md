# Claude Skills Mega Prompts (v2 — 13 skills)

Production-grade mega prompts for generating a polished, distributable Claude skills library. Each mega prompt instructs Claude Code (or Claude.ai) to produce one skill file, with consistent quality standards, error handling, **grill-me intake discipline**, and portability across CLI + web contexts.

The v2 expansion groups skills into two user-facing domains — **productivity** and **research** — adds three new skills (patent, dossier, research as a hybrid router), renames the others for concision, and retrofits grill-me forcing-question discipline across every intake.

## Files

### Orchestrator

|File                       |Purpose                                                              |
|---------------------------|---------------------------------------------------------------------|
|`00-master-orchestrator.md`|Chains all 13 mega prompts; supports full/pack/single modes          |

### Productivity Pack (6 skills)

|File                              |Purpose                                                       |
|----------------------------------|--------------------------------------------------------------|
|`02-reflect-megaprompt.md`        |Mid-conversation reassessment (5-dimension framework)         |
|`05-capture-megaprompt.md`        |Brain-dump organizer with zero information loss               |
|`04-landing-megaprompt.md`        |Premium HTML landing page generator (GSAP, 3D animations)     |
|`06-inbox-setup-megaprompt.md`    |Email triage onboarding via grill-me interview (paired with #07)|
|`07-inbox-triage-megaprompt.md`   |Email recurring execution — drafts only, never sends (paired with #06)|
|`03-notebooklm-megaprompt.md`     |NotebookLM browser automation (read / add source / Studio output / create)|

### Research Pack (7 skills)

|File                              |Purpose                                                       |
|----------------------------------|--------------------------------------------------------------|
|`13-research-megaprompt.md`       |**Default research entry point** — hybrid router + fallback   |
|`01-pulse-megaprompt.md`          |Multi-source recency research (Reddit + HN + Web + X)         |
|`08-grants-megaprompt.md`         |NIH grant funding intelligence (Consensus + RePORTER + NOSIs) |
|`09-litreview-megaprompt.md`      |Academic literature orientation (PICO / SPIDER / Decomposition)|
|`10-syllabus-megaprompt.md`       |Course supplementary reading list (syllabus → curated papers) |
|`11-patent-megaprompt.md`         |Patent prior-art + landscape intelligence (5 sub-use-cases)   |
|`12-dossier-megaprompt.md`        |Decision-grade entity research with hypothesis-testing        |

## Quality Standards (Applied Across All 13)

1. **Token efficiency** — Each generated skill targets ~2,000 words; research-pack skills allowed up to 2,800 (information-dense by nature)
1. **Grill-me intake discipline** — One question at a time. Forcing format (multi-choice over open-ended). Each question carries explicit "why I'm asking". Dependency-ordered (skip questions when upstream answers make them moot). Explicit max-question stop condition. Recommendations alongside questions
1. **Distributable** — No personal references, no hardcoded paths, no brand-specific content
1. **Production error handling** — Every external dependency has documented failure modes + recovery
1. **Portable** — Works in both Claude Code CLI and Claude.ai web (with explicit notices when CLI-only)
1. **Convention consistency** — Same frontmatter format, section structure, tone within domains
1. **Research-pack conventions** — Skills 01, 08, 09, 10, 11, 12, 13 share Consensus / Google Patents / web rate-limiting (1 q/sec), plan-tier detection, source discipline, three-count audit log standards

## How to Use

### Option A: Generate the full library

```bash
# From your skills project root
claude-code "Execute the master orchestrator at ./megaprompts/00-master-orchestrator.md. Set SKILLS_DIR=./claude-skills. Mode: full."
```

### Option B: Generate a specific pack

```bash
# Productivity pack (6 skills): reflect, capture, landing, inbox-setup, inbox-triage, notebooklm
claude-code "Execute the master orchestrator at ./megaprompts/00-master-orchestrator.md. Set SKILLS_DIR=./claude-skills. Mode: --pack=productivity."

# Research pack (7 skills): research, pulse, grants, litreview, syllabus, patent, dossier
claude-code "Execute the master orchestrator at ./megaprompts/00-master-orchestrator.md. Set SKILLS_DIR=./claude-skills. Mode: --pack=research."

# Email pair only (inbox-setup + inbox-triage — must run together)
claude-code "Execute the master orchestrator at ./megaprompts/00-master-orchestrator.md. Set SKILLS_DIR=./claude-skills. Mode: --pack=email-pair."
```

### Option C: Generate one skill at a time

```bash
claude-code "Execute the mega prompt at ./megaprompts/11-patent-megaprompt.md. Output to ./claude-skills/patent/SKILL.md."
```

### Option D: Use in Claude.ai web

Paste any mega prompt into a Claude.ai chat. The output skill will be delivered as an artifact. Save the artifact text to your local skills directory.

## Customization Points

Before running, override these as needed:

|Variable         |Default           |Purpose                                     |
|-----------------|------------------|--------------------------------------------|
|`${SKILLS_DIR}`  |`./claude-skills/`|Where generated skills land                 |
|`${OUTPUT_DIR}`  |`./landing-pages/`|(landing) Where generated HTML files go     |
|`${RESEARCH_DIR}`|`./research/`     |(pulse) Where briefings save                |
|`${WORKSPACE}`   |`./`              |(inbox-setup / inbox-triage) Where KB lives |

## Pack Notes

### Productivity Pack (6 skills)

General work-getting-done skills. Mostly tool-light. `reflect` and `capture` work without any external tools. `notebooklm` requires browser automation. `landing` outputs HTML. `inbox-setup` and `inbox-triage` are a paired duo — generate setup first, triage second.

### Research Pack (7 skills) — Shared Infrastructure

All seven research skills converge on:

- **Sequential execution** with 1 query/sec etiquette (Consensus + Google Patents + RePORTER + WebSearch)
- **Plan-tier detection** (where the source has tiers — Consensus / Lens.org)
- **Source discipline** (only cite session tool-call results; training knowledge labeled and excluded)
- **Three-count tracking** (sent / received / cited) surfaced in audit log
- **Retry policy** (3s wait, retry once, stop after 3 consecutive failures)
- **DOCX output patterns** (for skills 08, 09, 10, 11, 12 — `ExternalHyperlink` with full URLs, `LevelFormat.BULLET`, post-save validation)

The `research` skill (13) is the **default entry point** — it deterministically classifies any research question and either delegates to a specialist (pulse / grants / litreview / syllabus / patent / dossier) or runs its own plan-decompose-search-synthesize-cite fallback. Routing decisions are always surfaced so users can override.

The master orchestrator validates these conventions are consistent across all research-pack skills. Generate the pack together for best consistency.

Additional research-pack dependencies:

- 01 (pulse): `web_fetch` + `WebSearch` + browser automation for X (optional)
- 08 (grants): `bash_tool` + `curl` (RePORTER POST), `web_fetch` (NOSI HTML), Consensus MCP, `docx`
- 09 (litreview): Consensus MCP, `docx`, DOCX validation script
- 10 (syllabus): Consensus MCP, `docx`, bundled `scripts/generate_reading_list.js`
- 11 (patent): `web_fetch` (Google Patents, Espacenet, USPTO), `bash_tool` + `curl` for Lens.org (BYOK), `docx`
- 12 (dossier): `WebSearch` + `WebFetch`, `bash_tool` + `curl` for free APIs (SEC EDGAR, GitHub, ProPublica), `docx`, optional BYOK MCPs
- 13 (research): `WebSearch` + `WebFetch` for fallback; specialist skills (01, 08, 09, 10, 11, 12) for delegation

### Email Pair (06 + 07) — Knowledge Base Contract

The KB files produced by `inbox-setup` and consumed by `inbox-triage` must match exactly:

```
${WORKSPACE}/Email/
├── email-taxonomy.md          # Categories + report preferences (required)
├── email-patterns.md          # Voice, tone, templates, hard rules (required)
├── evaluation-framework.md    # Decision tree for opportunities (conditional)
├── rate-card.md               # Pricing, terms, negotiation (conditional)
├── blocklist.md               # Auto-skip senders (evolving)
├── tracker.md                 # Active follow-ups (evolving)
└── triage-log/                # Per-run logs
```

Always run `inbox-setup` before `inbox-triage` for the first time. Re-run setup when business / pricing / priorities change.

## Portability Notes Per Skill

|Skill        |Claude Code CLI|Claude.ai Web                               |
|-------------|---------------|--------------------------------------------|
|reflect      |✅ Full         |✅ Full (pure reasoning)                     |
|capture      |✅ Full         |✅ Full (workspace detection may differ)     |
|landing      |✅ Full (file)  |✅ Full (artifact)                           |
|inbox-setup  |✅ Full         |✅ With project files                        |
|inbox-triage |✅ Full         |✅ With Gmail/Outlook MCP                    |
|notebooklm   |✅ Full         |❌ Requires browser automation               |
|research     |✅ Full         |✅ With WebSearch + Code Execution + specialists|
|pulse        |✅ Full         |✅ Most phases; X requires browser automation|
|grants       |✅ Full         |✅ With Consensus MCP + Code Execution       |
|litreview    |✅ Full         |✅ With Consensus MCP + Code Execution       |
|syllabus     |✅ Full         |✅ With Consensus MCP + Code Execution       |
|patent       |✅ Full         |✅ With WebSearch + Code Execution           |
|dossier      |✅ Full         |✅ With WebSearch + Code Execution + BYOK MCPs|

## Cross-Skill Validation (Automatic via Master Orchestrator)

- No conflicting trigger phrases between skills
- `research` (13) classification signals do not collide with specialist trigger phrases
- `inbox-setup` ↔ `inbox-triage` file contracts align verbatim
- Research-pack conventions consistent (rate limit, plan tier, audit, sources, three-count tracking)
- Grill-me discipline present in every skill's intake spec
- Consistent voice and structure within each domain

## Naming Conventions (v2 renames)

| v1 name | v2 name | Rationale |
|---|---|---|
| `last-30-days` | `pulse` | Captures "what's happening now"; v1 named the parameter, not the purpose |
| `take-a-step-back` | `reflect` | Single verb; v1 was a phrase, not a name |
| `landing-page` | `landing` | Context makes "page" obvious |
| `brain-dump` | `capture` | Friendlier verb; matches the value (zero-loss intake) |
| `email-setup` | `inbox-setup` | "Inbox" extends cleanly to all providers |
| `email-triage` | `inbox-triage` | Pairs with inbox-setup |
| `consensus-grant-finder` | `grants` | Direct; NIH scope stays in description |
| `literature-review-helper` | `litreview` | All skills implicitly "help" — drop the suffix |
| `recommended-reading-list` | `syllabus` | Pivots to the input (memorable handle) |
| `notebooklm` | `notebooklm` | Unchanged — brand specificity is the value |

## Next Steps After Generation

1. Test triggers in a fresh conversation per skill
1. Add the skills to your Claude project or `~/.claude/skills/`
1. For the research pack: verify Consensus MCP connection (08, 09, 10) and `docx` install path; surface BYOK API keys where applicable (Lens.org for 11; LinkedIn / Crunchbase / Apollo / Pitchbook / SimilarWeb MCPs for 12)
1. For the `research` (13) skill: verify all 6 specialists generated and that their routing signals work as documented
1. Iterate based on real usage — the master orchestrator can re-generate any single skill
1. Consider publishing the library publicly once polished

## Anti-Patterns Already Rejected by Default

All mega prompts already filter out:

- Hardcoded absolute paths
- Personal/brand references
- Single-tool lock-in without fallbacks (where reasonable)
- Vague trigger phrases
- Wall-of-text sections
- Pseudocode that won't execute as written
- Inconsistent rate-limit / retry / audit conventions across the research pack
- Batching intake questions instead of one at a time
- Accepting vague answers ("AI", "tech", "patent help") without forcing specificity

The goal is to build these skills systematically with grill-me discipline at every intake and avoid duplicates.
