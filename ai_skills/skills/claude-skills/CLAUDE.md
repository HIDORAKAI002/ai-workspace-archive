# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is a **comprehensive skills library** for Claude AI and Claude Code - reusable, production-ready skill packages that bundle domain expertise, best practices, analysis tools, and strategic frameworks. The repository provides modular skills that teams can download and use directly in their workflows.

**Current Scope:** 268 production-ready skills across 9 domains with 373 Python automation tools, 506 reference guides, 40 agents (33 `cs-*` + 7 personas), and 54 slash commands.

**Key Distinction**: This is NOT a traditional application. It's a library of skill packages meant to be extracted and deployed by users into their own Claude workflows.

## Navigation Map

This repository uses **modular documentation**. For domain-specific guidance, see:

| Domain | CLAUDE.md Location | Focus |
|--------|-------------------|-------|
| **Agent Development** | [agents/CLAUDE.md](agents/CLAUDE.md) | cs-* agent creation, YAML frontmatter, relative paths |
| **Marketing Skills** | [marketing-skill/CLAUDE.md](marketing-skill/CLAUDE.md) | Content creation, SEO, ASO, demand gen, campaign analytics |
| **Product Team** | [product-team/CLAUDE.md](product-team/CLAUDE.md) | RICE, OKRs, user stories, UX research, SaaS scaffolding |
| **Engineering (Core)** | [engineering-team/CLAUDE.md](engineering-team/CLAUDE.md) | Fullstack, AI/ML, DevOps, security, data, QA tools |
| **Engineering (POWERFUL)** | [engineering/](engineering/) | Agent design, RAG, MCP, CI/CD, database, observability |
| **C-Level Advisory** | [c-level-advisor/CLAUDE.md](c-level-advisor/CLAUDE.md) | CEO/CTO strategic decision-making |
| **Project Management** | [project-management/CLAUDE.md](project-management/CLAUDE.md) | Atlassian MCP, Jira/Confluence integration |
| **RA/QM Compliance** | [ra-qm-team/CLAUDE.md](ra-qm-team/CLAUDE.md) | ISO 13485, MDR, FDA, GDPR, ISO 27001 compliance |
| **Business & Growth** | [business-growth/CLAUDE.md](business-growth/CLAUDE.md) | Customer success, sales engineering, revenue operations |
| **Finance** | [finance/CLAUDE.md](finance/CLAUDE.md) | Financial analysis, DCF valuation, budgeting, forecasting, SaaS metrics |
| **Standards Library** | [standards/CLAUDE.md](standards/CLAUDE.md) | Communication, quality, git, security standards |
| **Templates** | [templates/CLAUDE.md](templates/CLAUDE.md) | Template system usage |

## Architecture Overview

### Repository Structure

```
claude-code-skills/
├── .claude-plugin/            # Plugin registry (marketplace.json)
├── agents/                    # 27 agents (20 cs-* + 7 personas)
├── commands/                  # 33 slash commands (changelog, tdd, saas-health, prd, code-to-prd, plugin-audit, sprint-plan, slo-design, etc.)
├── engineering-team/          # 32 core engineering skills + Playwright Pro + Self-Improving Agent + Security Suite
├── engineering/               # 40 POWERFUL-tier advanced skills (incl. AgentHub, self-eval, llm-wiki, tc-tracker, ship-gate, slo-architect)
├── product-team/              # 13 product skills (incl. apple-hig-expert) + Python tools
├── marketing-skill/           # 44 marketing skills (7 pods) + Python tools
├── c-level-advisor/           # 28 C-level advisory skills (10 roles + orchestration)
├── project-management/        # 9 PM skills + bundled Atlassian Remote MCP (.mcp.json)
├── ra-qm-team/                # 14 RA/QM compliance skills
├── business-growth/           # 5 business & growth skills + Python tools
├── finance/                   # 3 finance skills + Python tools
├── eval-workspace/            # Skill evaluation results (Tessl)
├── standards/                 # 5 standards library files
├── templates/                 # Reusable templates
├── docs/                      # MkDocs Material documentation site
├── scripts/                   # Build scripts (docs generation)
└── documentation/             # Implementation plans, sprints, delivery
```

### Skill Package Pattern

Each skill follows this structure:
```
skill-name/
├── SKILL.md              # Master documentation
├── scripts/              # Python CLI tools (no ML/LLM calls)
├── references/           # Expert knowledge bases
└── assets/               # User templates
```

**Design Philosophy**: Skills are self-contained packages. Each includes executable tools (Python scripts), knowledge bases (markdown references), and user-facing templates. Teams can extract a skill folder and use it immediately.

**Key Pattern**: Knowledge flows from `references/` → into `SKILL.md` workflows → executed via `scripts/` → applied using `assets/` templates.

## Git Workflow

**Branch Strategy:** feature → dev → main (PR only)

**Branch Protection Active:** Main branch requires PR approval. Direct pushes blocked.

### Quick Start

```bash
# 1. Always start from dev
git checkout dev
git pull origin dev

# 2. Create feature branch
git checkout -b feature/agents-{name}

# 3. Work and commit (conventional commits)
feat(agents): implement cs-{agent-name}
fix(tool): correct calculation logic
docs(workflow): update branch strategy

# 4. Push and create PR to dev
git push origin feature/agents-{name}
gh pr create --base dev --head feature/agents-{name}

# 5. After approval, PR merges to dev
# 6. Periodically, dev merges to main via PR
```

**Branch Protection Rules:**
- ✅ Main: Requires PR approval, no direct push
- ✅ Dev: Unprotected, but PRs recommended
- ✅ All: Conventional commits enforced

See [documentation/WORKFLOW.md](documentation/WORKFLOW.md) for complete workflow guide.
See [standards/git/git-workflow-standards.md](standards/git/git-workflow-standards.md) for commit standards.

## Development Environment

**No build system or test frameworks** - intentional design choice for portability.

**Python Scripts:**
- Use standard library only (minimal dependencies)
- CLI-first design for easy automation
- Support both JSON and human-readable output
- No ML/LLM calls (keeps skills portable and fast)

**If adding dependencies:**
- Keep scripts runnable with minimal setup (`pip install package` at most)
- Document all dependencies in SKILL.md
- Prefer standard library implementations

## Current Version

**Version:** v2.5.5 (latest)

**v2.5.5 Highlights — vpe-advisor: throughput-first VP of Engineering:**
- **vpe-advisor** skill (new, `./c-level-advisor/skills/vpe-advisor/`) — opinionated throughput-first VPE skill covering 4 specific decisions distinct from CTO. 3 stdlib Python tools with deterministic logic: `delivery_throughput_analyzer.py` (DORA 4 metrics with Elite/High/Medium/Low verdict per metric + cycle-time bottleneck identification with typical fix per stage), `eng_hiring_funnel_calculator.py` (7-stage funnel conversion + healthy/leaky verdict per stage + end-to-end conversion + required top-of-funnel volume + weakest-stage fixes), `eng_team_structure_designer.py` (headcount-to-structure map + squad-size assessment + manager-trigger + director-trigger + span-of-control). 4 in-depth references each citing 5+ authoritative sources (DORA / Forsgren / Kim, Spotify squad model, Conway's Law, Will Larson, Camille Fournier, Google SRE Workbook).
- **cs-vpe-advisor** agent (new) — throughput-first operator. Voice: "What's your cycle time, and where does the work spend most of its time waiting?" Distinguishes "what to build" (CTO) from "how to ship it" (VPE) with hard discipline.
- **/cs:vpe-review** (new slash command) — 6-question forcing interrogation: cycle time + waits, DORA 4 metrics, hiring funnel leakage, team structure health, production discipline maturity, VPE-vs-CTO scope.
- **Dual-published from the start:** standalone marketplace plugin AND bundled in c-level-skills.
- **Karpathy-coder discipline maintained (5th consecutive PR):** assumptions surfaced upfront, verifiable success criteria, deterministic tool logic, no scope creep into engineering tactical skills.

**Version:** v2.5.4

**v2.5.4 Highlights — chief-customer-officer-advisor: retention-obsessed CCO:**
- **chief-customer-officer-advisor** skill (new, `./c-level-advisor/skills/chief-customer-officer-advisor/`) — opinionated, retention-obsessed CCO skill covering 4 specific decisions. 3 stdlib Python tools with deterministic logic: `retention_decomposition_analyzer.py` (decomposes ARR retention into GRR / NRR / Logo by cohort, flags leaky-bucket pattern, categorizes churn into 7-category root-cause taxonomy with preventable %), `customer_segmentation_designer.py` (assigns 4-tier segment, scores ICP fit 0-10 across 7 weighted signals, surfaces kill list + upgrade candidates), `cs_coverage_calculator.py` (calculates CSM headcount per tier with ARR ratio + account count constraints, generates 12-month hiring plan with quarterly sequencing + manager-trigger thresholds). 4 in-depth references each citing 5+ authoritative sources (Mehta/Steinman/Murphy, BVP, TSIA, Skok, Tunguz).
- **cs-cco-advisor** agent (new) — retention-obsessed pragmatist orchestrating the skill via `/cs:cco-review`. Distinct voice: "What's your gross retention rate, and what's the #1 reason customers leave?" Trusts gross retention over NRR; refuses to recommend CS hires without naming the customer outcome they unblock.
- **/cs:cco-review** (new slash command) — 6-question forcing interrogation: GRR (not NRR) truth, top churn driver, time-to-value by segment, kill-list candidates, ARR-per-CSM ratio + coverage model, CS comp alignment.
- **Dual-published from the start:** standalone marketplace plugin AND bundled in c-level-skills.
- **Karpathy-coder discipline maintained:** assumptions surfaced upfront, verifiable success criteria, deterministic tool logic, no scope creep into business-growth tactical CS skills.

**Version:** v2.5.3
- **chief-ai-officer-advisor** skill (new, `./c-level-advisor/skills/chief-ai-officer-advisor/`) — opinionated, eval-demanding CAIO skill covering 4 specific decisions. 3 stdlib Python tools with deterministic logic: `model_buildvsbuy_calculator.py` (API vs fine-tune vs build with 3-year TCO, balances economic breakeven with practical feasibility), `ai_risk_classifier.py` (EU AI Act tier classification with Article-level citations + US state patchwork: NYC LL 144, CO AI Act, IL HB 53, CA SB 1001, IL BIPA + industry overlays for FDA/NYDFS/NAIC/ECOA), `ai_cost_economics.py` (API vs self-hosted breakeven with 2026 pricing across A100/H100, utilization reality, hidden costs). 4 in-depth references each citing 5+ authoritative sources: model build-vs-buy strategy (decision tree, 6 fine-tuning approaches, failure modes), AI risk governance (full EU AI Act tier map + NIST AI RMF + governance program checklist), AI cost economics (2026 pricing + GPU economics + migration cost + prompt caching), AI team org evolution (5-stage role map + 9-role definition table + AI team vs data team contrast + 7 anti-patterns).
- **cs-caio-advisor** agent (new) — eval-demanding realist orchestrating the skill via `/cs:caio-review`. Distinct voice: "What does this AI need to be good at, and how would you measure it?" Treats every AI use case as a hiring decision; demands eval set, SLO, and fallback before scale.
- **/cs:caio-review** (new slash command) — 6-question forcing interrogation: eval discipline, hallucination SLO, regulatory classification, model selection, cost trajectory, role-that-unblocks.
- **Karpathy-coder discipline maintained:** assumptions surfaced upfront, verifiable success criteria, deterministic tool logic, no scope creep into engineering AI/ML skills, complexity_checker + diff_surgeon clean on staged diff.

**Version:** v2.5.2
- **chief-data-officer-advisor** skill (new, `./c-level-advisor/skills/chief-data-officer-advisor/`) — opinionated, decision-driven CDO skill covering 4 specific decisions (no generic governance survey). 3 stdlib Python tools with deterministic logic: `ai_training_data_audit.py` (origin × class × use-case matrix → GO/MITIGATE/NO-GO with GDPR Art. 6 and EU AI Act citations), `data_product_strategy_picker.py` (warehouse/lakehouse/mesh recommendation + 6-layer build-vs-buy + 12-month sequencing), `data_asset_valuator.py` (strategic value 0-10, moat strength, M&A multiplier with carve-out penalties, 3 ranked productization paths). 4 references answering one decision each: training rights (decision tree + state patchwork), data product strategy (kill criteria per architecture), customer-data-as-asset (valuation + M&A diligence prep), data team org evolution (stage-to-role map). Karpathy-aligned: explicit anti-patterns, decision-driven (not topic-driven), surgical (does not duplicate engineering data skills).
- **cs-cdo-advisor** agent (new) — decision-driven realist orchestrating the skill via `/cs:cdo-review`. Distinct voice: "What decision does this data drive?" Refuses to recommend tooling before naming the consumer.
- **/cs:cdo-review** (new slash command) — 6-question forcing interrogation: decision being made, consent provenance, internal consumers, M&A diligence impact, model-without-this-source viability, role-that-unblocks-this.
- **Built with Karpathy-coder discipline:** explicit assumptions surfaced upfront, verifiable success criteria locked before code, surgical scope (no edits to unrelated files), deterministic tool logic (not pattern-match prose), kill criteria documented in every recommendation.

**Version:** v2.5.1
- **general-counsel-advisor** skill (new, `./c-level-advisor/skills/general-counsel-advisor/`) — full standalone C-role skill backing the existing `/cs:gc-review` command. 2 stdlib Python tools: `contract_risk_scanner.py` (scans contract text for 12 founder-killer patterns: auto-renew traps, uncapped indemnity, vague IP, aggressive non-compete, missing DPA, MFN pricing, perpetual license-back, etc.) and `term_sheet_analyzer.py` (scores term sheets 0-100 across 12 dimensions: liquidation preference, anti-dilution, option pool, board composition, vesting, pro-rata, drag-along, protective provisions, info rights, dividends, valuation/dilution, holistic). 3 references: contracts playbook (7 startup contract types), IP + regulatory landscape (patents, trademark, OSS compliance, HIPAA/GDPR/FDA/fintech triggers, SOC 2 → ISO sequencing), term sheet decoder (full glossary + founder-friendly defaults + negotiation strategy).
- **cs-general-counsel-advisor** agent (new) — risk-paranoid persona orchestrating the skill via `/cs:gc-review`. Distinct voice: "Before we sign, three things need to be settled in writing." Always escalates to outside counsel — never substitutes for it.
- **First plugin to outclass gstack on a domain it has zero coverage in.** Software-shipping personas don't include General Counsel; legal exposure is where startups most often discover problems after they're expensive to fix.
- **/cs:gc-review updated** to invoke the new tools and reference the skill.

**Version:** v2.5.0

**v2.5.0 Highlights — c-level-agents: Founder-Mode Executive Team:**
- **c-level-agents** plugin (new, `./c-level-advisor/c-level-agents/`) — 8 cs-* persona agents (CFO, CMO, CRO, CPO, COO, CHRO, CISO, Chief of Staff) with moderate voice differentiation, plus 17 /cs:* slash commands surfaced as sub-skills.
- **Forcing-question office hours (8):** `/cs:office-hours` (YC-style 6-Q intake), and per-role `/cs:cfo-review`, `/cs:cmo-review`, `/cs:cpo-review`, `/cs:cro-review`, `/cs:cto-review`, `/cs:ciso-review`, `/cs:gc-review` (General Counsel — a lane gstack lacks entirely).
- **Strategic sprint pipeline (5):** `/cs:brief` → `/cs:boardroom` (6-phase deliberation with Phase 2 isolation + devil's-advocate pass) → `/cs:decide` (two-layer memory + preserved dissent) → `/cs:execute` (90-day plan) → `/cs:post-mortem` (scored against pre-committed criteria).
- **Meta + safety (4):** `/cs:founder-mode` (auto-router), `/cs:onboard` (12-Q founder interview), `/cs:cross-eval` (multi-model consensus with graceful Claude-only fallback), `/cs:freeze` (cooldown lock on irreversible decisions).
- **References:** `persona-voices.md` (voice specs) and `llm-wiki-bridge.md` (Markdown-only persistent memory — answer to gstack's gbrain Postgres dependency).
- Positioned as the business-domain answer to YC Garry Tan's gstack: broader role coverage, real frameworks (RICE/JTBD/OKR/ADKAR/Wardley/8-dim health), compliance lane (ra-qm-team), explicit voice differentiation, and stdlib-only memory.

**Version:** v2.4.5

**v2.4.x Highlights — Reliability Portfolio (Phase 1–4):**
- **slo-architect** (Phase 4 — keystone) — SLO/SLI/error-budget discipline per Google SRE Workbook. 3 stdlib Python tools (`slo_designer`, `error_budget_calculator` with multi-window burn-rate alerts, `slo_review`), 4 reference docs, asset templates, `/slo-design` slash command. Engineering-advanced bundle 49 → 50.
- **chaos-engineering** (Phase 3) — experiment designer, blast-radius calculator, postmortem generator. `/chaos-experiment` command.
- **kubernetes-operator** (Phase 2) — CRD validator, reconcile linter, capability auditor. `/operator-audit` command.
- **feature-flags-architect** (Phase 1) — flag debt scanner, rollout planner, kill-switch audit. `/flag-cleanup` command.
- **ship-gate** — pre-production audit skill (89 checks across 8 categories, stdlib-only, MIT). External contribution.
- **Atlassian Remote MCP** — bundled `.mcp.json` in `project-management/` (SSE transport, OAuth handled by Claude Code, no env vars required).
- **Auditor + CI cleanup** — `.mcp.json` allowlist in skill-security-auditor, manifest-only PRs skip audit, README links (toprank).
- 246 total skills, 359 Python tools, 485 references, 27 agents, 33 commands.

**v2.3.0 Highlights:**
- **llm-wiki plugin** — new POWERFUL-tier skill implementing Karpathy's LLM Wiki pattern. Second brain for Claude Code + Obsidian where the LLM incrementally ingests sources into a persistent, interlinked markdown vault. Ships SKILL.md (with `context: fork`), 3 sub-agents (wiki-ingestor, wiki-librarian, wiki-linter), 5 slash commands (/wiki-init, /wiki-ingest, /wiki-query, /wiki-lint, /wiki-log), 8 stdlib-only Python tools, 8 reference guides, full vault templates, and a worked example. Cross-tool compatible with Claude Code, Codex CLI, Cursor, Antigravity, OpenCode, Gemini CLI.
- **tc-tracker** — new engineering skill: task context tracker with lifecycle, handoff format, schema, and 5 Python tools (tc_init, tc_create, tc_update, tc_status, tc_validator) plus `/tc` slash command
- **apple-hig-expert** — new product skill: Apple Human Interface Guidelines expert with Liquid Glass aesthetic focus. Audits iOS/macOS/visionOS apps with `hig_checker` Python tool and comprehensive reference docs on visual design, platform specifics, and accessibility
- 235 total skills, 314 Python tools, 435 references, 28 agents, 27 commands

**Version:** v2.2.0

**v2.2.0 Highlights:**
- **Security skills suite** — 6 new engineering-team skills: adversarial-reviewer, ai-security, cloud-security, incident-response, red-team, threat-detection (5 Python tools, 4 reference guides)
- **Self-eval skill** — Honest AI work quality evaluation with two-axis scoring, score inflation detection, and session persistence
- **Snowflake development** — Data warehouse development, SQL optimization, and data pipeline patterns
- 234 total skills across 9 domains, 306 Python tools, 427 references, 25 agents, 22 commands
- MkDocs docs site expanded to 269 generated pages (301 HTML pages)

**v2.1.2 (2026-03-10):**
- Landing page generator now outputs **Next.js TSX + Tailwind CSS** by default (4 design styles, 7 section generators)
- **Brand voice integration** — landing page workflow uses marketing brand voice analyzer to match copy tone to design style
- 25 Python scripts fixed across all domains (syntax, dependencies, argparse)
- 237/237 scripts verified passing `--help`

**v2.1.1 (2026-03-07):**
- 18 skills optimized from 66-83% to 85-100% via Tessl quality review
- YAML frontmatter (name + description) added to all SKILL.md files
- 6 new agents + 5 slash commands, Gemini CLI support, MkDocs docs site

**v2.0.0 (2026-02-16):**
- 25 POWERFUL-tier engineering skills added (engineering/ folder)
- Plugin marketplace infrastructure (.claude-plugin/marketplace.json)
- Multi-platform support: Claude Code, OpenAI Codex, OpenClaw, Hermes Agent, Gemini CLI, Cursor, and 6 more

**Past Sprints:** See [documentation/delivery/](documentation/delivery/) and [CHANGELOG.md](CHANGELOG.md) for history.

## Roadmap

**Phase 1-4 Complete:** 246 production-ready skills deployed across 9 domains
- Engineering Core (32), Engineering POWERFUL (40), Product (13), Marketing (44), PM (9), C-Level (28), RA/QM (14), Business & Growth (5), Finance (3)
- 359 Python automation tools, 485 reference guides, 27 agents, 33 commands
- Complete enterprise coverage from engineering through regulatory compliance, sales, customer success, and finance
- Reliability portfolio: feature-flags-architect, kubernetes-operator, chaos-engineering, slo-architect (Google SRE Workbook canon)
- MkDocs Material docs site with 293+ indexed pages for SEO

See domain-specific roadmaps in each skill folder's README.md or roadmap files.

## Key Principles

1. **Skills are products** - Each skill deployable as standalone package
2. **Documentation-driven** - Success depends on clear, actionable docs
3. **Algorithm over AI** - Use deterministic analysis (code) vs LLM calls
4. **Template-heavy** - Provide ready-to-use templates users customize
5. **Platform-specific** - Specific best practices > generic advice

## ClawHub Publishing Constraints

This repository publishes skills to **ClawHub** (clawhub.com) as the distribution registry. The following rules are **non-negotiable**:

1. **cs- prefix for slug conflicts only.** When a skill slug is already taken on ClawHub by another publisher, publish with the `cs-` prefix (e.g., `cs-copywriting`, `cs-seo-audit`). The `cs-` prefix applies **only on the ClawHub registry** — repo folder names, local skill names, and all other tools (Claude Code, Codex, Gemini CLI) remain unchanged.
2. **Never rename repo folders or local skill names** to match ClawHub slugs. The repo is the source of truth.
3. **No paid/commercial service dependencies.** Skills must not require paid third-party API keys or commercial services unless provided by the project itself. Free-tier APIs and BYOK (bring-your-own-key) patterns are acceptable.
4. **Rate limit: 5 new skills per hour** on ClawHub. Batch publishes must respect this. Use the drip timer (`clawhub-drip.timer`) for bulk operations.
5. **plugin.json schema** — ONLY these fields: `name`, `description`, `version`, `author`, `homepage`, `repository`, `license`, `skills`. No extra fields. The `skills` value depends on the plugin layout (Claude Code v2.1.107+ rejects bare `"./"`):
   - Single-skill plugin (SKILL.md at root): `"skills": ["./"]` (array form required).
   - Plugin with `./skills/` subdir: `"skills": "./skills"`.
   - Multi-skill domain plugin (skills are subfolders at root): `"skills": ["./sub1", "./sub2", ...]` (explicit list, omit `"./"` to avoid namespace collision with the index SKILL.md).
6. **Version follows repo versioning.** ClawHub package versions must match the repo release version (currently v2.2.0+).

## Anti-Patterns to Avoid

- Creating dependencies between skills (keep each self-contained)
- Adding complex build systems or test frameworks (maintain simplicity)
- Generic advice (focus on specific, actionable frameworks)
- LLM calls in scripts (defeats portability and speed)
- Over-documenting file structure (skills are simple by design)

## Working with This Repository

**Creating New Skills:** Follow the appropriate domain's roadmap and CLAUDE.md guide (see Navigation Map above).

**Editing Existing Skills:** Maintain consistency across markdown files. Use the same voice, formatting, and structure patterns.

**Quality Standard:** Each skill should save users 40%+ time while improving consistency/quality by 30%+.

## Additional Resources

- **.gitignore:** Excludes .vscode/, .DS_Store, AGENTS.md, PROMPTS.md, .env*
- **Plugin Registry:** [.claude-plugin/marketplace.json](.claude-plugin/marketplace.json) - Marketplace distribution
- **Standards Library:** [standards/](standards/) - Communication, quality, git, documentation, security
- **Implementation Plans:** [documentation/implementation/](documentation/implementation/)
- **Sprint Delivery:** [documentation/delivery/](documentation/delivery/)

---

**Last Updated:** May 11, 2026
**Version:** v2.4.5
**Status:** 246 skills deployed across 9 domains, 33 marketplace plugins, docs site live
