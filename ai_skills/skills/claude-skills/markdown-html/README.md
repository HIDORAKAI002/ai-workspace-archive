# markdown-html — Markdown to interactive HTML converter

> "I generated a 200-line implementation plan in Claude Code last month. Markdown. … I skimmed the first 20 lines, scrolled past the diagram I could not actually parse, and closed the file. I never read the rest."
> — Thariq Shihipar, *Claude Code HTML output* (Medium, 2026)

Convert long markdown files in a Claude project into single-file, lightly-interactive HTML that respects your brand. One-time design-system onboarding captures brand primary + accent + typography + layout style + default save location. Every conversion reads that config and renders consistently.

## Status — v2.10.0 (foundation)

| Skill | Purpose | Status |
|---|---|---|
| `markdown-html-orchestrator` | Routes long markdown → converter sub-skill (`context: fork`) | ✓ live |
| `design-system` | Onboarding wizard + WCAG-AA-validated brand palette + shared config | ✓ live |
| `md-document` | Long-form: sticky TOC + collapsibles + search + code-copy + scrollspy | v2.10.1 (next PR) |
| `md-review` | Code review: 2-col diff + severity-tagged margin annotations + jump-nav | v2.10.1 (next PR) |
| `md-slides` | Slide deck: arrow-key nav + presenter mode + print-to-PDF | v2.10.1 (next PR) |

## Quick start

```bash
# 1. One-time onboarding (10 questions, ~60 seconds)
python3 markdown-html/skills/design-system/scripts/onboard.py

# 2. (or zero-touch defaults for first-test)
python3 markdown-html/skills/design-system/scripts/onboard.py --defaults

# 3. Inspect the saved config
python3 markdown-html/skills/design-system/scripts/config_loader.py --status

# 4. Classify a markdown file and see the routing decision
python3 markdown-html/skills/markdown-html-orchestrator/scripts/doctype_classifier.py \
    --input ./my-report.md --output json \
  | python3 markdown-html/skills/markdown-html-orchestrator/scripts/route_explainer.py

# 5. Resolve where it would save (foundation; converters in v2.10.1)
python3 markdown-html/skills/markdown-html-orchestrator/scripts/output_path_resolver.py \
    --input ./my-report.md --doctype document
```

## Slash commands

- `/cs:markdown-html <path>.md` — top-level router (classify + route + recommend)
- `/cs:grill-markdown-html <path>.md` — Matt-style 5-question grill before conversion
- `/cs:design-system` — surface the onboarding wizard

## Hard rules

1. **Refuses input < 100 lines** — markdown still wins below the threshold (Shihipar). Keep short docs as markdown.
2. **Refuses without onboarding** — without a captured brand, output renders with placeholder defaults. Run onboarding once.
3. **Refuses unwritable save location** — onboarding asks where to save; the orchestrator honors it; collisions get suffixed (`-2`, `-3`, …).
4. **Single-file HTML only** — all CSS + JS inline. The only external CDN entries are Google Fonts + Prism.js. No build step, no bundler, no JS framework.
5. **Never silently chain** — "convert this AND make slides AND a code review" is three operations, asked explicitly.
6. **WCAG AA enforced** — body-text contrast must reach 4.5:1. Onboarding refuses any combination that fails.

## Distinct from

- **Anthropic Playground plugin** (`/playground`) — builds interactive prompt-tuning controls (sliders, knobs, prompt-copy-back). Different tool entirely.
- **`marketing/landing/`** — generates landing pages from scratch. Doesn't take markdown input.
- **`engineering/handoff/` + `productivity/handoff/`** — session continuity briefs. Different artifact type.

## File layout

```
markdown-html/
├── .claude-plugin/
│   └── plugin.json
├── agents/
│   └── cs-markdown-html-orchestrator.md
├── commands/
│   ├── cs-markdown-html.md          # router
│   ├── cs-design-system.md          # onboarding surface
│   └── cs-grill-markdown-html.md    # 5-question grill
└── skills/
    ├── markdown-html-orchestrator/  # context: fork
    │   ├── SKILL.md
    │   ├── scripts/
    │   │   ├── doctype_classifier.py
    │   │   ├── route_explainer.py
    │   │   └── output_path_resolver.py
    │   └── references/
    │       ├── information_density_canon.md
    │       ├── orchestrator_routing_patterns.md
    │       └── single_file_html_discipline.md
    └── design-system/
        ├── SKILL.md
        ├── scripts/
        │   ├── onboard.py
        │   ├── config_loader.py
        │   └── brand_palette_validator.py
        ├── references/
        │   ├── design_token_canon.md
        │   ├── wcag_accessibility.md
        │   └── typography_pairing.md
        └── assets/
            └── design_system_schema.json
```

## License

MIT. See repo `LICENSE`.

## Spec

Thariq Shihipar — *Claude Code HTML output: Why Markdown Lost and How to Switch* (Medium, 2026). The plugin operationalizes the article's central claim — markdown collapses past ~100 lines for agent-generated artifacts; HTML restores density, clarity, shareability, and lightweight interaction.
