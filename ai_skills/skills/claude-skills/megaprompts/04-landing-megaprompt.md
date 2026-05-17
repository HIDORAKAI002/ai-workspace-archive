# Mega Prompt: Landing — Premium HTML Landing Page Generator Skill

## Role

You are a **Skill Architect** specializing in frontend generation workflows. Generate a production-grade, distributable Claude skill that produces premium single-file HTML landing pages with 3D CSS animations, scroll-triggered effects, and mouse-parallax depth.

## Output Target

Single file: `${SKILLS_DIR}/landing/SKILL.md`

Word budget: 2,000–2,400 words. Hard ceiling: 2,500.

## Skill Purpose

Generate a polished, self-contained `.html` landing page from a text prompt or brief. The output is one HTML file: all CSS inline in `<style>`, all JS inline in `<script>`, only external dependencies being Google Fonts + GSAP via CDN. The page is visually distinctive, animated, and production-quality.

## Required Capabilities

The skill must specify how to:

1. **Extract content from input** — Product name, hero headline, subtext, features, CTA text, closing copy.
1. **Apply a configurable brand system** — Default to a polished dark theme, but accept brand overrides (colors, fonts, accent).
1. **Build three required sections** — Hero, Features, Closing CTA.
1. **Apply animations** — GSAP entrance, ScrollTrigger reveals, mouse parallax, CSS floating shapes.
1. **Output a single self-contained HTML file** — Configurable path, kebab-case filename.

## Workflow Structure

The generated skill must follow this structure:

```
1. Phase 0: Grill-Me Intake (3–4 forcing questions before generation)
2. Content extraction (with fallback strategy)
3. Brand system selection (default + override path)
4. Section 1: Hero (structure + depth layers + animations)
5. Section 2: Features (structure + card spec + reveal animation)
6. Section 3: Closing CTA (structure + ambient glow)
7. Brand system reference (colors, typography, components)
8. Required CDN dependencies
9. Animation patterns (entrance, parallax, scroll-triggered, floating)
10. Layout rules (responsive grid, viewport behavior)
11. Output spec (path, naming, file format)
```

## Grill-Me Intake Specification

Four forcing questions, one at a time, dependency-ordered. Each carries "why I'm asking". Goal: lock down product, audience, and brand before writing copy or markup. Skipping intake produces generic landing pages that miss the actual positioning.

### Q1 (root) — Product / service

> **What's the product or service? Give me the name + a 1–2 sentence elevator pitch — what does it do, and who's it for?**
>
> *Why I'm asking:* The headline, subtext, and feature copy all derive from this. "App for productivity" produces generic boilerplate; "Async standup tool for remote engineering teams who hate Zoom" produces a landing page that converts.

Refuse mush. If user gives just a name with no pitch, push: "What does it do? Who's it for?"

### Q2 (depends on Q1) — Audience register

> **Who's the audience? Pick one:**
> 1. Technical buyers (engineers, ops, security)
> 2. Business buyers (PMs, execs, ops leaders)
> 3. Consumers (general public, hobbyists)
> 4. Internal (employees, partners — not for public sale)
>
> *Why I'm asking:* Audience dictates copy register, jargon level, social-proof choices, and CTA framing. Technical buyers want specifics; consumers want benefits; internal pages can skip persuasion.

Forcing choice.

### Q3 (always) — Brand overrides

> **Brand colors / fonts to override the default (dark navy + teal + Inter)? Provide as: primary HEX, accent HEX, optional bg HEX. Or say "default" if you want the polished default.**
>
> *Why I'm asking:* The default is intentionally beautiful, but matching your brand makes the page feel native to your existing site. Even just a primary color override goes a long way.

Accept "default" or partial overrides (e.g., just primary). If only primary provided, derive accent algorithmically (lighten/darken).

### Q4 (depends on Q1) — Tone

> **Tone — pick one:**
> 1. Professional — confident, restrained, B2B-friendly
> 2. Playful — warm, light, occasional humor
> 3. Authoritative — expert, data-forward, trust-building
> 4. Minimal — terse, design-led, low copy density
>
> *Why I'm asking:* Tone affects every sentence — headlines, microcopy, button text, closing copy. Picking upfront prevents tonal whiplash across sections.

Forcing choice. Recommended default: professional if Q2 = technical/business; playful if Q2 = consumer; minimal if the product is design-led.

**Stop condition:** After Q4, commit and generate. No follow-up questions during generation.

## Critical Improvements Over Naive Implementation

The skill MUST address these production concerns:

1. **Configurable color system** — Don’t hardcode one brand palette. Provide a default (dark navy + teal accent) AND document override syntax for users to swap in their brand colors via CSS custom properties.
1. **Configurable output path** — Use `${OUTPUT_DIR}` variable, default to `./landing-pages/`. No hardcoded absolute paths.
1. **Content fallback strategy** — When input is sparse, document how to invent compelling content from context rather than stalling.
1. **Responsive by default** — Document breakpoints: 900px (tablet → 2-col), 580px (mobile → 1-col).
1. **Accessibility minimum** — Document: alt text on icons via aria-label, semantic HTML5 (header, section, footer), keyboard-navigable CTA buttons.
1. **No FOUC** — Mandate `gsap.set()` to hide elements BEFORE entrance animations.

## Brand System Specification (Must Be Fully Documented)

### Default Color Palette (Dark Navy + Teal)

```css
--navy:       #0A1628;
--navy-mid:   #0D1F38;
--teal:       #00D4AA;
--teal-glow:  rgba(0, 212, 170, 0.12);
--amber:      #F5A623;
--off-white:  #F7F7F2;
--text-muted: rgba(247, 247, 242, 0.68);
--card-bg:    rgba(0, 212, 170, 0.06);
--card-border:rgba(0, 212, 170, 0.15);
```

### Override Pattern (Must Document)

The skill must explain: users can override by passing a custom palette object. Example:

```
Brand override:
- primary: #FF6B35
- accent:  #2EC4B6
- bg:      #011627
- text:    #FDFFFC
```

### Typography

- Font family: Inter (via Google Fonts)
- Weight scale: 400, 500, 600, 700, 800
- Size scale documented per use (Hero H1, Section H2, card titles, body, eyebrow, CTA)

### Components (Must Specify CSS)

- `.btn-primary` — CTA button with hover state
- `.feature-card` — Card with hover lift
- `.eyebrow` — Letter-spaced category label

## Section Specifications

### Section 1: Hero

- `100vh`, centered content
- Optional eyebrow label
- H1 (68–82px, 800 weight)
- Subtitle (1–2 sentences)
- CTA button
- Scroll-down indicator (animated chevron)
- **Depth layers**: `.hero-shapes-back` and `.hero-shapes-mid` with absolute-positioned decorative shapes

### Section 2: Features

- 3 columns default (2-col if exactly 4 features, 1-col on mobile)
- Each card: SVG icon (28px, accent stroke) → title → description
- Hover state: lift + border brighten

### Section 3: Closing CTA

- Full-width, dark background
- Large closing headline (52–62px, 800 weight)
- Short subtext
- CTA button with ambient radial-gradient glow behind it

## Animation Patterns (Must Be Fully Specified)

The skill must include these patterns as concrete code blocks:

### 1. Hero Entrance (GSAP timeline)

- `gsap.set()` to hide everything first (prevents FOUC)
- Staggered timeline with overlap timings

### 2. Mouse Parallax

- Mousemove listener on hero
- Two depth layers move at different speeds (back: ±45/22, mid: ±22/11)
- Content layer moves subtly in same direction (±8/5)

### 3. Scroll-Triggered Feature Cards

- Initial state: `opacity: 0, y: 55, rotateX: 18`
- ScrollTrigger reveal with `power2.out` ease
- Stagger 0.11s

### 4. Floating Decorative Shapes (CSS keyframes, not GSAP)

- `floatA`, `floatB`, `floatC` with varied durations and rotation
- Use CSS for ambient motion (smoother, cheaper than GSAP)

### 5. Scroll Indicator (CSS bounce)

## Required CDN Dependencies

Skill must specify exactly these (no exceptions):

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

## Output Spec

- Path: `${OUTPUT_DIR}/<product-name-kebab>.html`
- Default `${OUTPUT_DIR}`: `./landing-pages/`
- Filename: lowercase kebab-case from product name ("Quill AI" → `quill-ai.html`)
- Self-contained: all CSS in `<style>`, all JS in `<script>`, only Google Fonts + GSAP CDN external

## Trigger Phrases (for frontmatter description)

- “create a landing page”
- “build a landing page”
- “make a landing page for X”
- “I need a web page for Y”
- “promotional page”
- “product page”
- “one-pager”
- “web presence”
- “sales page”

## Error Handling Requirements

|Situation                                      |Behavior                                                                     |
|-----------------------------------------------|-----------------------------------------------------------------------------|
|Input is just a name with no context           |Invent compelling content from name semantics; flag as inferred              |
|Input file is large or PDF                     |Read fully before generating; don’t truncate                                 |
|Brand colors are insufficient (only 1 provided)|Use that as primary; derive secondary/accent algorithmically (lighten/darken)|
|Features count not specified                   |Default to 4                                                                 |
|Output dir doesn’t exist                       |Create it                                                                    |
|Existing file at output path                   |Append timestamp suffix or ask user                                          |

## Portability Requirements

- **Claude Code CLI**: Native — writes HTML file directly to filesystem.
- **Claude.ai web**: Native — produces HTML as an artifact instead of file.

The skill must document both delivery modes:

> **Delivery mode**: In Claude Code CLI, write the file to disk at the specified path. In Claude.ai web, create an HTML artifact with the same content.

## Frontmatter Spec

```yaml
---
name: landing
description: "Generates a premium single-page HTML landing page with 3D CSS animations, GSAP scroll effects, and mouse-parallax depth. Forcing intake (product + elevator pitch, audience register, brand overrides, tone) locks down positioning before any copy or markup is written, so the page reflects the actual product rather than generic boilerplate. Use whenever the user says 'landing for X', 'create a landing page', 'build a landing page', 'make a landing page for X', 'I need a web page for Y', or provides product/service details and wants a polished website. Also triggers on 'promotional page', 'product page', 'one-pager', 'web presence', 'sales page'. Outputs a single self-contained HTML file (Claude Code) or HTML artifact (Claude.ai). Supports configurable brand colors via CSS custom property overrides."
---
```

## Anti-Patterns To Reject

- Hardcoded absolute paths in output directory
- Single brand palette without override documentation
- Outlining before writing — write in one pass
- External CSS or JS files (must be inline)
- Skipping `gsap.set()` initial states (causes FOUC)
- More than 6 features in default grid (becomes unscannable)
- Brand-specific content references in the skill itself

## Validation Checklist (Run Before Delivery)

- [ ] Frontmatter parses as YAML (name: landing)
- [ ] Output target path uses `${SKILLS_DIR}/landing/SKILL.md`
- [ ] Word count 2,000–2,500
- [ ] Grill-me intake: 3–4 questions, one-at-a-time, with "why I'm asking" per question
- [ ] Q1 (product) refuses vague answers
- [ ] Q2 (audience) forcing choice across 4 options
- [ ] Q4 (tone) forcing choice across 4 options
- [ ] Default color palette documented as CSS custom properties
- [ ] Override pattern documented
- [ ] All 3 sections fully specified
- [ ] All 5 animation patterns included with code
- [ ] CDN dependencies listed
- [ ] Output path uses variable, not hardcoded absolute path
- [ ] Responsive breakpoints documented
- [ ] Both CLI and web delivery modes documented
- [ ] No FOUC instruction explicit
