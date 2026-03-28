# CSS / PostCSS

Reference standards for CSS review. Do not impose any CSS style; new or modified CSS must respect the convention already present. Detect from `postcss.config`, `.stylelintrc`, and existing CSS/HTML — enforce consistency. If no convention found, propose as Suggestion only.

---

## Detection & convention matching

- Diff CSS changes not matching project convention (BEM, utility-first, custom). [Important]
- Notation or naming not matching existing CSS (e.g. BEM `block__element--modifier`). [Important]

## Recommendations

- `!important` used when an alternative exists (fix specificity or cascade). [Suggestion]
- Multiple `!important` in a file or used as default — Important when used habitually as shortcut. [Important]
- Z-index magic numbers (e.g. `9999`) — prefer centralized system (CSS variables, stacking contexts). [Suggestion]
- Hex colors in uppercase (`#FF6600`) — use lowercase. [Minor]
- Hardcoded hex values when project uses CSS variables for colors. [Suggestion]
- Nesting deeper than 2–3 levels when project uses nesting. [Suggestion]
- Spacing between components using `margin-top` when component is not optional — prefer `margin-bottom`. [Suggestion]
- Font-size, line-height, letter-spacing in non-px when project prefers px. [Suggestion]
- Font-weight using `normal`/`bold` instead of numeric values (`400`, `700`). [Minor]
- Components not 100% width or not adapting to parent container. [Suggestion]

## Rendering performance

- JavaScript used for simple animations when CSS (transitions, keyframes) would suffice. [Suggestion]
- Complex animations that stutter without `will-change` or `translateZ(0)` for compositing. [Suggestion]
- `will-change` applied globally (e.g. on `*` or `body`) or on too many elements. [Important]
- Animated properties triggering reflow (`top`/`left`, `width`/`height`) on hot paths — prefer `transform` and `opacity`. [Important]
- Reflow-causing properties animated outside hot paths. [Suggestion]

## File organization

- File organization not matching project structure (detect from existing CSS and components). [Suggestion]

### Critical verification checkpoints

- Does this CSS match the project's existing naming and structure?
- Is specificity or cascade fixable instead of using !important?
- Are animated properties limited to transform/opacity on hot paths?
- Is will-change used sparingly on specific elements only?
