# HTML

Reference standards for HTML review. Only enforce rules that match the target project's conventions.

---

## Semantics

- Respect HTML element hierarchy (`ul > li`, not `ul > div`). [Important]
- Use `<ul>` / `<ol>` for lists. [Important]
- Use heading tags (`h1`–`h6`) for titles, respecting hierarchy. [Important]
- Use `<strong>` and `<em>` instead of `<b>` and `<i>` (semantic meaning over visual styling). [Suggestion]
- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`) over generic `<div>` when appropriate. [Suggestion]

## Semantic HTML

- Heading hierarchy skips break screen reader navigation (`h1` → `h3` without `h2`). [Important]
- Non-semantic interactive elements (`<div onclick>`) are invisible to assistive technologies — use `<button>` or `<a>`. [Important]

## Script loading

- Application scripts in `<head>` must use `defer`. No `async` for app scripts. [Important]
- Scripts in `<head>` without `defer` block rendering. [Important]
- `type="module"` scripts are deferred by default — do not add `defer` (redundant, invalid on some parsers). [Minor]
- `async` allowed for third-party scripts that are fully isolated and independent of the DOM (e.g. analytics, tracking pixels). [Suggestion]
- Non-critical scripts: place before `</body>` closing tag. [Suggestion]
- Inline `<script>` blocks that execute synchronously block parsing. [Important]
- Add `crossorigin` attribute on cross-origin scripts. [Important]
- Respect dependency order: a script that depends on another must load after it. [Important]

## Syntax

- No self-closing tags on void elements in HTML5: `<meta>` not `<meta />`, `<br>` not `<br />`. [Minor]
- W3C valid markup: structure should pass W3C validator without errors. [Important]

### Critical verification checkpoints

- Is element hierarchy correct (e.g. ul > li)?
- Is heading hierarchy continuous (no skip)?
- Are application scripts in head using defer (not async)?
- Are cross-origin scripts using crossorigin?
- Does markup pass W3C validation?
