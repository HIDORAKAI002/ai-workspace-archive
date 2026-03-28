# Templates

Reference standards for server-side HTML template review. Generic rules applicable to server-side HTML templating engines (e.g. Twig).

---

## General principles

- Templates containing business logic, data manipulation, filtering, or business rules — keep presentational only. [Important]
- Oversized or multi-responsibility templates/components — flag and suggest splitting. [Important]
- Changes that do not belong in the current component's scope. [Important]

## Twig

### Include & isolation

- Using `{% include %}` tag instead of `include()` function in Twig. [Suggestion]
- Twig `include()` without `false` as third argument (variable leakage into included template). [Important]

### Variable defaults

- Variable defaults not defined at the top of the template, before any HTML. [Suggestion]
- Using `|default()` for booleans — use `??` (null coalescing); `|default()` treats `false`, `0`, `""`, `null` as empty. [Important]
- Using `|default('')` for non-string fallbacks. [Suggestion]
- Unnecessary ternary with empty string fallback (e.g. `isActive ? 'isActive' : ''`) — Twig handles falsy natively. [Minor]

### Security (XSS)

- User-controlled or dynamic data rendered without contextual escaping (`|e('html')`, `|e('html_attr')`, `|e('js')`); `|raw` only when explicitly trusted and sanitized. [Blocking]

## Component structure

- More than 2 levels of nesting for sub-components. [Suggestion]
- Macros not imported at the top of the file, before any HTML. [Minor]
- Using classes for JavaScript hooks instead of data attributes. [Suggestion]

## Class naming

- Class naming not matching existing template and CSS convention. [Important]

## Quotes & interpolation

- Static strings with double quotes when single quotes suffice. [Minor]
- Interpolation possible but concatenation used (e.g. `'Hello ' ~ name`). [Suggestion]

## Naming & formatting

- Variables with non-descriptive names (`a`, `b`, `e`, `item1`). [Important]
- Template not readable without external context. [Important]
- Inconsistent indentation or not aligned with HTML structure. [Minor]
- Indentation not following project convention (check existing `.twig` files). [Minor]
- Multi-line structures without trailing comma or single-line with trailing comma. [Minor]
- Missing final newline at end of file. [Minor]

### Critical verification checkpoints

- Is all output escaped for the correct context (html, html_attr, js)?
- Are boolean defaults using ?? rather than |default(true/false)?
- Does the template stay presentational (no business logic)?
- Are data attributes used for JS hooks instead of classes?
