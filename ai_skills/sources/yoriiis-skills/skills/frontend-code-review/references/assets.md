# Images & SVG Assets

Reference standards for image and SVG asset optimization.

---

## Images

- Excessively heavy images (obvious oversizing). [Suggestion]
- Missing `width` and `height` (or aspect-ratio) on images (prevents CLS). [Important]
- Heavy images without `loading="lazy"` below the fold. [Suggestion]
- Prefer modern formats when supported: WebP, AVIF over PNG/JPEG when the project supports them. [Suggestion]
- PNG used where WebP/AVIF could achieve similar quality at lower size (project/build context permitting). [Suggestion]

## SVG

- SVG not optimized with SVGO (or equivalent) — remove metadata, unnecessary attributes, default values. [Suggestion]
- SVG not minified — unnecessary whitespace, non-compact attributes. [Minor]
- Inline SVG with redundant `xmlns` when HTML5 parser handles it. [Minor]
- SVG sprites using fixed `width`/`height` instead of `viewBox`. [Important]
- Sprite symbol or use element with fixed width/height — use `viewBox` only, size via CSS on `<use>` or wrapper. [Important]
- Sprite container not hidden from layout (e.g. position absolute, width 0, height 0, overflow hidden). [Suggestion]
- SVG icons/decorative elements missing `aria-hidden="true"`. [Important]

## Fonts

- Fonts without `font-display: swap` (or project-appropriate value) — avoid FOIT, improve LCP/CLS. [Suggestion]
- Critical fonts above the fold without `<link rel="preload">` when relevant. [Suggestion]
- Blocking fonts on immediately visible text without `font-display`. [Important]

### Critical verification checkpoints

- Could this image be served in a more efficient format (WebP/AVIF)?
- Has this SVG been run through SVGO?
- Is this sprite symbol using only viewBox (no width/height)?
