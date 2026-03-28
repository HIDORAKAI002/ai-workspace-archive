# Accessibility

Reference standards for accessibility review.

---

## SVG

- Decorative SVGs without `aria-hidden="true"` and `focusable="false"`. [Important]
- SVG inside a button/link (icon-only) without a `<span class="sr-only">` with description. [Important]
- Informational SVGs (not in button/link) without `aria-hidden="false"`, `role="img"`, `aria-label`. [Important]
- SVG sprite parent without `aria-hidden="true"` and hidden from layout (e.g. position absolute, width 0, height 0, overflow hidden). [Important]
- SVGs without `viewBox` (fixed `width`/`height` instead) — consider sprite optimization and SVGO. [Important]

## Focus management

- When opening a modal/menu: move focus to an element inside it (e.g. close button). [Important]
- Set focus only when the target element is visible — wait for CSS transition to end before calling `.focus()`. [Important]
- Restrict keyboard navigation inside the modal (focus trap: first ↔ last focusable element). [Important]
- Return focus to the trigger element after closing a modal or menu. [Important]

## Interactive elements

- Use `<a>` for navigation, `<button>` for actions — never the opposite. [Important]
- Form field without a programmatically associated `<label>` (or `aria-label` / `aria-labelledby` if visual label impossible). [Important]
- Text or interactive elements not meeting WCAG AA contrast (4.5:1 for normal text); relying on color alone to convey information. [Important]
- Click/touch targets below minimum 44×44px (WCAG 2.1 AAA, Apple HIG). [Important]
- Custom interactive elements (e.g. onClick on `<div>` or `<span>`) without `tabindex="0"` and keyboard event listener (Enter/Space). [Important]

## Images

- `<img>` without `alt` attribute (use empty `alt=""` for decorative images). [Important]

## ARIA & dynamic content

- Dynamic content updates (toast, form validation, loading) without `aria-live="polite"` or `aria-live="assertive"` for critical alerts. [Important]
- Containers that update dynamically without `role="alert"` or `role="status"`. [Important]
- Hidden content toggled by JS without `aria-expanded` updated on the trigger element. [Important]

### Critical verification checkpoints

- Is focus moved into the modal on open and returned to the trigger on close?
- Are all interactive elements keyboard-accessible and correctly labeled?
- Do SVGs have appropriate roles and labels (or aria-hidden for decorative)?
- Is color contrast sufficient and is information not conveyed by color alone?
