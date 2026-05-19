# Business Operations + Commercial Domain Expansion — Master Plan

**Status:** Draft v1.0 — proposed under branch `claude/skills-plugins-framework-XjTjh`
**Date:** 2026-05-19
**Author:** Claude (claude-opus-4-7) under `/goal` directive

---

## 1. Why two new top-level domains

The repository already ships skills for:

- `business-growth/` (5 skills) — **sales & customer success motion** (CSM, sales engineering, RevOps, contracts, BizDev toolkit)
- `c-level-advisor/` (33 skills) — **strategic executive judgment** (CEO/CTO/CFO advisors, board prep, M&A)
- `finance/` (3 skills) — **financial analysis & forecasting**
- `project-management/` (9 skills) — **delivery coordination** (Jira/Confluence)

What is **missing** is the operational and commercial *muscle* between strategy (C-level) and execution (engineering / delivery). Two distinct surfaces:

| Domain | Job-to-be-done | Persona | Cadence |
|---|---|---|---|
| **business-operations** | Make the company *run* — processes, vendors, capacity, internal comms, SOPs | COO / BizOps lead / Head of Operations | Daily / weekly |
| **commercial** | Make every deal *profitable & repeatable* — pricing, deal desk, partners, channels, RFPs | CRO / Head of Commercial / Deal Desk | Per-deal / monthly |

These are **professional disciplines**, each with their own canon (Lean / Six Sigma / SaaSOps for BizOps; SaaS pricing canon, deal-desk playbooks, channel economics for Commercial). They deserve their own top-level domain folders, plugins, and orchestrators — same pattern as `productivity/`, `marketing/`, `research/` introduced in v2.7.0.

---

## 2. Domain shape

Each new domain ships as a **top-level folder** with the v2.7.0 Path-B 11-file layout per skill, plus a domain **orchestrator** skill that uses `context: fork` to chain sub-skills without polluting main context.

```
business-operations/
├── .claude-plugin/
│   └── plugin.json                       # marketplace registration
├── CLAUDE.md                             # navigation guide for the domain
├── README.md
├── skills/
│   ├── business-operations-skills/       # domain index skill (orchestrator)
│   │   └── SKILL.md                      # context: fork — routes to sub-skills
│   ├── process-mapper/                   # full Path-B skill
│   ├── vendor-management/
│   ├── capacity-planner/
│   ├── internal-comms/
│   ├── knowledge-ops/
│   └── procurement-optimizer/
├── agents/
│   └── cs-bizops-orchestrator.md
└── commands/
    ├── cs-bizops.md                      # top-level router
    ├── cs-process-map.md
    ├── cs-vendor-review.md
    ├── cs-capacity-plan.md
    ├── cs-internal-comms.md
    ├── cs-knowledge-ops.md
    └── cs-procurement.md

commercial/
├── .claude-plugin/
│   └── plugin.json
├── CLAUDE.md
├── README.md
├── skills/
│   ├── commercial-skills/                # domain orchestrator (context: fork)
│   ├── pricing-strategist/
│   ├── deal-desk/
│   ├── partnerships-architect/
│   ├── channel-economics/
│   ├── commercial-policy/
│   ├── rfp-responder/
│   └── commercial-forecaster/
├── agents/
│   └── cs-commercial-orchestrator.md
└── commands/
    └── (matching /cs:* commands)
```

---

## 3. The `context: fork` chaining pattern

`context: fork` is a frontmatter directive already used in `engineering/karpathy-coder` and `engineering/llm-wiki`. Semantics: when this skill is invoked, the agent **forks its conversation context** rather than continuing inline, so the skill can run heavy sub-operations (multi-skill orchestration, large file reads, deep reference loads) without polluting the parent thread. Two consequences relevant to our design:

1. **Orchestrators must be fork-marked.** Each domain orchestrator skill (`business-operations-skills`, `commercial-skills`) sets `context: fork` so it can sequentially invoke 3-7 sub-skills in a clean child context, then return a digest to the parent.
2. **Heavy sub-skills should also opt in.** Sub-skills that ingest large external artifacts (e.g., a vendor catalog, an RFP PDF, a competitor pricing scrape) should set `context: fork` so the noisy intake stays out of the main session.

| Skill | `context: fork`? | Reason |
|---|---|---|
| `business-operations-skills` (orchestrator) | YES | Chains multiple BizOps sub-skills |
| `commercial-skills` (orchestrator) | YES | Chains multiple Commercial sub-skills |
| `process-mapper` | YES | Ingests process docs / interview transcripts |
| `vendor-management` | YES | Ingests vendor catalog + contracts |
| `rfp-responder` | YES | Ingests multi-page RFP/RFI documents |
| `knowledge-ops` | YES | Multi-document SOP ingestion |
| `pricing-strategist` | NO | Decision-tool, lightweight inputs |
| `deal-desk` | NO | Per-deal scoring, lightweight |
| `commercial-policy` | NO | Authoring tool |
| `partnerships-architect` | NO | Authoring tool |
| `channel-economics` | NO | Calculator |
| `commercial-forecaster` | NO | Calculator |
| `capacity-planner` | NO | Calculator |
| `internal-comms` | NO | Authoring tool |
| `procurement-optimizer` | NO | Calculator |

---

## 4. Per-skill spec (v0 scope)

Each skill ships the **standard Path-B 11-file contract**:

```
skill-name/
├── SKILL.md                       # YAML frontmatter + workflow
├── scripts/
│   ├── tool_one.py               # stdlib-only CLI, --help + --sample
│   ├── tool_two.py
│   └── tool_three.py
├── references/
│   ├── primary_canon.md          # ≥ 7 authoritative sources cited
│   ├── decision_framework.md
│   └── anti_patterns.md
└── assets/
    └── template.md               # user-customizable starter
```

### 4.1 business-operations skills

| Skill | Purpose | 3 Python tools | Distinct from |
|---|---|---|---|
| **process-mapper** | BPMN-style process documentation + bottleneck + cycle-time analysis | `process_documenter.py`, `bottleneck_detector.py` (waiting-state %), `cycle_time_analyzer.py` | `engineering/slo-architect` (system reliability, not business process) |
| **vendor-management** | Vendor evaluation, SLA tracking, contract-risk scan | `vendor_scorer.py` (multi-criteria 0-100), `sla_compliance_tracker.py`, `vendor_risk_classifier.py` | `c-level-advisor/general-counsel-advisor` (contracts are legal-first, not operational) |
| **capacity-planner** | Headcount + tooling capacity modeling | `capacity_modeler.py`, `utilization_analyzer.py`, `hiring_sequencer.py` | `c-level-advisor/vpe-advisor` (engineering-specific, not org-wide) |
| **internal-comms** | All-hands deck, internal newsletter, change-management comms | `comms_template_filler.py`, `change_announcement_builder.py`, `comms_calendar_builder.py` | `marketing-skill/*` (external-facing) |
| **knowledge-ops** | SOP authoring, runbook templating, internal knowledge base ingestion | `sop_generator.py`, `runbook_validator.py`, `kb_ingester.py` | `engineering/llm-wiki` (personal PKM, not company SOPs) |
| **procurement-optimizer** | Spend categorization, purchasing cycle, supplier-tier rationalization | `spend_categorizer.py`, `purchasing_cycle_analyzer.py`, `supplier_consolidation.py` | `finance/*` (financial reporting, not procurement decisions) |

### 4.2 commercial skills

| Skill | Purpose | 3 Python tools | Distinct from |
|---|---|---|---|
| **pricing-strategist** | Pricing model selection (subscription / usage / value / hybrid), WTP analysis, packaging | `pricing_model_picker.py`, `wtp_analyzer.py` (Van Westendorp), `packaging_designer.py` | `c-level-advisor/cmo-advisor` (positioning, not pricing math) |
| **deal-desk** | Per-deal review: discount logic, T&Cs, margin guardrails | `deal_scorer.py` (margin + risk 0-100), `discount_approval_router.py`, `terms_redliner.py` | `business-growth/contract-and-proposal-writer` (authoring, not approval) |
| **partnerships-architect** | Partner tier model, joint GTM, revenue share economics | `partner_tier_classifier.py`, `joint_gtm_planner.py`, `revshare_modeler.py` | `business-growth/sales-engineer` (technical sale, not partnership structure) |
| **channel-economics** | Direct vs. partner-led economics, cost-to-serve, channel mix | `channel_mix_optimizer.py`, `cost_to_serve_calculator.py`, `channel_roi_analyzer.py` | `business-growth/revenue-operations` (process, not economics) |
| **commercial-policy** | Discount matrix, T&C library, exception policy | `discount_matrix_builder.py`, `exception_router.py`, `policy_linter.py` | none — new ground |
| **rfp-responder** | RFP/RFI/PFP structured response, win-theme injection | `rfp_parser.py`, `response_drafter.py`, `winrate_predictor.py` | `business-growth/contract-and-proposal-writer` (proposals ≠ RFPs; RFPs are structured response, proposals are free-form) |
| **commercial-forecaster** | Bookings / billings / ARR forecast with funnel + cohort math | `bookings_forecaster.py`, `cohort_arr_projector.py`, `funnel_confidence_scorer.py` | `finance/financial-analysis` (financial close, not commercial pipeline) |

---

## 5. Adoptability + customizability principles

Every skill MUST:

1. **Stdlib-only Python tools** — `pip install`-free; `--help` + `--sample` work out of the box.
2. **Deterministic logic, no LLM calls in scripts** — same input → same output, repeatable.
3. **Industry-tunable thresholds** — every scoring tool exposes a `--profile {saas|services|ecommerce|enterprise}` flag (mirrors AEO skill pattern) so users tune calibration to their context without editing code.
4. **Asset templates** — at least one user-customizable `.md` template per skill that users fill in for their org.
5. **Reference docs cite ≥ 7 authoritative sources** — Lean canon, SaaS pricing canon (Tunguz/Skok/Bessemer), DORA, Will Larson, Camille Fournier, etc.
6. **Cited anti-patterns** — every skill ships an `anti_patterns.md` with at least 5 specific things NOT to do, sourced.
7. **Karpathy-coder compliance** — every tool passes `complexity_checker.py` (target ≥ 80/100); explicit assumptions surfaced in SKILL.md `## Assumptions` block; verifiable success criteria locked before implementation.
8. **`distinct_from` field** in plugin.json `source` block — explicit disambiguation from sibling skills in `business-growth/`, `c-level-advisor/`, `finance/`, `marketing-skill/`.

---

## 6. Agents (cs-* persona)

One distinct cs-* persona agent per domain, plus one per high-stakes sub-skill (deal-desk, pricing-strategist):

| Agent | Persona voice | Forcing question (signature) |
|---|---|---|
| `cs-bizops-orchestrator` | Process-obsessed COO. "Where does the work spend most of its time waiting?" | Routes to BizOps sub-skills based on inquiry shape |
| `cs-commercial-orchestrator` | Margin-protective CRO. "What's the margin on this deal at full discount?" | Routes to Commercial sub-skills |
| `cs-pricing-strategist` | Value-pricing zealot. "What's your customer paying for, in their words?" | Distinct from CMO advisor — pricing math, not positioning |
| `cs-deal-desk` | Margin gate. "If this deal closes at this discount, what does next quarter's pipeline look like at the same terms?" | Distinct from contract-writer — approval gate, not authoring |

---

## 7. Slash commands

Each skill ships a `/cs:*` command for direct invocation. The two orchestrator commands route by intent:

```
/cs:bizops <inquiry>      # auto-routes: process / vendor / capacity / comms / SOP / procurement
/cs:commercial <inquiry>  # auto-routes: pricing / deal / partner / channel / policy / RFP / forecast
```

Plus 13 per-skill commands (one per non-orchestrator skill).

---

## 8. Plugin registration

Two new entries in `.claude-plugin/marketplace.json`:

```json
{
  "name": "business-operations-skills",
  "source": "./business-operations",
  "description": "6 BizOps skills: process mapping (BPMN + bottleneck), vendor management (SLA + risk), capacity planning, internal comms, knowledge ops (SOPs/runbooks), procurement optimization. 18 stdlib Python tools, 24 references. Orchestrator skill chains sub-skills via context: fork.",
  "version": "2.8.0",
  "category": "operations"
},
{
  "name": "commercial-skills",
  "source": "./commercial",
  "description": "7 Commercial skills: pricing strategy (Van Westendorp + packaging), deal desk (margin + discount routing), partnerships, channel economics, commercial policy, RFP responder, commercial forecaster. 21 stdlib Python tools, 28 references. Orchestrator skill chains sub-skills via context: fork.",
  "version": "2.8.0",
  "category": "commercial"
}
```

Marketplace plugins go **55 → 57**. Indexed skills go **313 → 328** (+13 sub-skills + 2 orchestrators).

---

## 9. Build sequence

### Sprint 1 (PR #688, MERGED 2026-05-19) — foundation ✅

1. ✅ Master plan doc
2. ✅ Directory scaffolding (both domains)
3. ✅ Both orchestrator skills (`business-operations-skills`, `commercial-skills`) wired with `context: fork`
4. ✅ Two priority sub-skills per domain wired:
   - bizops: `process-mapper`, `vendor-management`
   - commercial: `pricing-strategist`, `deal-desk`
5. ✅ Both `cs-*-orchestrator` agents
6. ✅ `/cs:bizops`, `/cs:commercial`, `/cs:grill-bizops`, `/cs:grill-commercial` + four per-skill commands
7. ✅ Marketplace registration for both new plugins (57 → 59 plugins)

### Sprint 2 (THIS PR — v2.8.0 completion) — fill out ✅

9. ✅ All 4 remaining bizops sub-skills: `capacity-planner` (Erlang-C), `internal-comms` (ADKAR+Kotter), `knowledge-ops` (5W2H, `context: fork`), `procurement-optimizer` (UNSPSC)
10. ✅ All 5 remaining commercial sub-skills: `partnerships-architect` (5-tier), `channel-economics` (CTS+ROI+mix), `commercial-policy` (matrix+exception+linter), `rfp-responder` (Shipley, `context: fork`), `commercial-forecaster` (4Q-weighted + cohort + funnel-confidence)
11. ✅ 9 new `/cs:*` slash commands (one per sub-skill)
12. ✅ Updated plugin.json + marketplace.json with full skills arrays + expanded keywords
13. ✅ Updated domain CLAUDE.md + README.md with all 7+8 skills
14. ✅ Root CLAUDE.md + marketplace.json metadata bumped to v2.8.0

### Sprint 3 (future, not in v2.8.0) — polish

15. Per-skill cs-* sub-agents for high-stakes skills (cs-pricing-strategist, cs-deal-desk) — only added if usage telemetry shows demand
16. Bulk plugin-audit pass; karpathy-check on all 30 new tools (Sprint 1 + Sprint 2)
17. Release notes for v2.8.0
18. Codex / Gemini / Hermes cross-platform sync
19. MkDocs docs site rebuild with new domain pages

---

## 10. Success criteria (verifiable)

- [ ] 2 new top-level domain folders created with full Path-B layout
- [ ] 2 orchestrator skills with `context: fork` declared
- [ ] At least 4 sub-skills fully wired (3 stdlib tools + 3 references + 1 asset template each)
- [ ] Every Python tool passes `--help` and `--sample` smoke test
- [ ] Both plugins registered in `.claude-plugin/marketplace.json`
- [ ] At least 2 cs-* agents added (one per domain orchestrator)
- [ ] At least 6 `/cs:*` slash commands added (2 orchestrator + 4 per-skill)
- [ ] Sprint 1 PR opened as draft against `claude/skills-plugins-framework-XjTjh`
- [ ] No skill duplicates a sibling in `business-growth/`, `c-level-advisor/`, `finance/`, `marketing-skill/` — `distinct_from` field explicitly documents the boundary

---

## 11. Anti-patterns to avoid (project-level)

- ❌ Creating skills that overlap with existing `business-growth/` sales motion → BizOps is **internal operations**, not external sales
- ❌ Making orchestrator skills do the work — they **route**, then return digest
- ❌ Pricing skill that picks a number — pricing-strategist picks **a model and a range**, the user picks the number
- ❌ Deal-desk skill that "approves" deals — it **scores + routes to a human approver**, never auto-approves
- ❌ Reference docs that don't cite sources — every reference needs ≥ 7 authoritative citations
- ❌ Python tools with external dependencies (`requests`, `pandas`) — stdlib only
- ❌ Tools that hide their thresholds — every score must expose `--profile` flag for industry tuning

---

## 12. Open questions (for future iteration, not blockers)

1. Should `commercial-forecaster` cross-link to `finance/financial-analysis` via `context: fork`? Probably yes in v2.8.1.
2. Should `rfp-responder` be merged with `business-growth/contract-and-proposal-writer`? Decision: **no** — RFPs are structured response with mandatory sections + scoring, proposals are free-form persuasion. Different muscles.
3. Should there be a separate `legal-ops/` domain or do `vendor-management` + `commercial-policy` cover the legal-ops surface enough? Decision: defer; cover via existing `c-level-advisor/general-counsel-advisor` for now.

---

**Plan version:** 1.0
**Next step:** Sprint 1 execution under this branch.
