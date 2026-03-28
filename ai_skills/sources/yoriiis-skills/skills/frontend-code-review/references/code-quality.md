# Code Quality

Checklist for code quality review: error handling, front-end performance, boundary conditions, control flow, and function size.

---

## Control flow & function size

- Deeply nested `else` blocks instead of early returns. [Important]
- Complex guard conditions not extracted into a named helper. [Suggestion]
- Redundant `else` when the `if` branch returns. [Minor]
- When an if/else has no early return, prefer putting the truthy branch first when possible — improves readability. [Suggestion]
- Functions longer than ~30 lines (business/procedural logic) not extracted — declarative code (HTML templates, JSX, config objects) exempt. [Important]
- Multiple nesting levels (3+) without early returns or extraction. [Important]

## Readability

- Magic numbers or unexplained hardcoded strings — extract to named variables or constants. [Suggestion]
- Loop variables with generic names (e.g. `item`) in nested loops — use context-specific names (e.g. `article in articles`). [Suggestion]

## Error handling

- Error-handling pattern inconsistent with project (try/catch vs .catch()). [Important]
- Empty catch blocks or catch with only `console.log`. [Important]
- Catching generic `Error` instead of specific error types. [Suggestion]
- No try/catch around `fetch`, DOM APIs, `JSON.parse`, or async operations. [Important]
- Missing `.catch()` or no try/catch in async functions. [Important]
- Operations that fail without any visible feedback to user or developer. [Important]
- Errors not caught at appropriate boundaries. [Important]
- Async errors not propagated or handled. [Important]
- Recoverable errors without fallback behavior (e.g. default image, retry button). [Suggestion]
- Error context missing component name and method (e.g. `[ComponentName] methodName error`). [Suggestion]
- Non-critical errors logged with `console.log` instead of `console.warn`. [Minor]

## Performance

- DOM manipulation inside loops (use `DocumentFragment`). [Important]
- Selectors queried repeatedly instead of cached as constants/properties. [Important]
- Layout thrashing: interleaving DOM reads and writes in a loop — batch reads first, then writes. [Important]
- Listeners on individual repeated elements instead of event delegation on parent. [Important]
- Scroll/resize handlers without throttle or `requestAnimationFrame`. [Suggestion]
- Event listeners added but never removed (memory leak on navigation/destroy). [Important]
- Scroll/touch listeners without `{ passive: true }`. [Suggestion]
- Large images without lazy loading (`loading="lazy"`). [Suggestion]
- Render-blocking scripts (missing `defer`). [Important]
- Unused CSS/JS loaded on every page. [Important]
- Missing image optimization or modern formats (WebP, AVIF). [Suggestion]
- Imports that prevent tree-shaking (e.g. `import { last } from 'lodash'`) — prefer targeted imports or native. [Suggestion]
- Heavy computation on main thread without Web Worker. [Suggestion]
- Pure functions called repeatedly with same inputs without memoization. [Suggestion]
- Unnecessary re-computation on every event/render cycle. [Important]

## Boundary conditions

- Accessing properties on potentially null DOM query results (`querySelector` can return `null`). [Important]
- Truthy/falsy confusion: `if (value)` fails for `0`, `""`, `false` which may be valid. [Important]
- Optional chaining overuse (`a?.b?.c?.d`) hiding structural issues. [Suggestion]
- Missing null check on function parameters from external input. [Important]
- Array operations (`.map`, `.filter`, `[0]`) without empty-array guard. [Important]
- `arr[arr.length - 1]` without length check. [Important]
- `for...in` or `Object.keys` assumptions on empty objects. [Suggestion]
- Division by zero without guard. [Important]
- Integer overflow on large counters or IDs exceeding `Number.MAX_SAFE_INTEGER`. [Suggestion]
- Floating-point comparison with `===` instead of epsilon. [Suggestion]
- Off-by-one errors in loop bounds, array slicing, pagination. [Important]
- Empty string not handled as edge case. [Important]
- Whitespace-only string passes truthy check but is effectively empty. [Suggestion]
- Very long strings without length limits (layout/memory issues). [Suggestion]
- Unicode edge cases (emoji, RTL, combining characters) not considered. [Suggestion]

### Critical verification checkpoints

- What happens when this fetch/operation fails?
- Will the user see a broken UI, or is there a fallback?
- How does this behave with 100 elements? 1000?
- Is this computation triggered on every scroll/resize event?
- Is this listener cleaned up?
- What if `querySelector` returns `null` here?
- What if this array is empty?
- What if this value is `0` or an empty string — is that valid?
