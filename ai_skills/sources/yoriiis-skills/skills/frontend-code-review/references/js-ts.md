# JavaScript / TypeScript

Reference standards for JS/TS review. Only enforce rules that match the target project's conventions.

---

## Module format

- New files not using the project's module format (ESM or CJS) — check `package.json` and existing imports. [Important]
- Mixing `require` and `import` in the same project. [Important]

## TypeScript rules

- Use `interface` for types without inheritance; prefer `type` for declarations. [Suggestion]
- Types declared in a separate location when only used in one function — declare where used. [Suggestion]
- New files not `.ts` / `.tsx` when project has TypeScript. [Important]
- Exported functions without explicit return types (including `: void` when returning nothing). [Important]
- Array types using `Array<Element>` instead of `Element[]`. [Minor]
- `as` assertions instead of type guards or narrowing. [Suggestion]
- Use of `any` — use `unknown` + narrowing or proper generics. [Important]
- Packages without declaration files not declared in `modules.d.ts`. [Suggestion]

## Code hygiene

- `console.log` / `console.info` / `console.debug` containing PII or sensitive data. [Blocking]
- `console.log` / `console.info` / `console.debug` (no PII) when linter does not catch them. [Minor]
- Commented-out code left in place. [Minor]
- Unused imports. [Minor]
- Prefer `const` over `let`, never `var` — Suggestion if linter present, Important if no linter. [Suggestion]
- Nested `else` blocks instead of early returns. [Suggestion]
- Function with more than 2 parameters without destructuring syntax. [Suggestion]
- Timer values as magic numbers instead of descriptive named variables. [Suggestion]
- Functions longer than ~30 lines or with multiple nesting levels not extracted into smaller functions. [Important]
- Code duplication — factor shared logic. [Important]
- Mutating state, arrays, or objects directly — prefer pure functions, copying (spread), or project state management. [Important]
- Native `addEventListener` with anonymous handler (named handler required for `removeEventListener`). [Important]
- Complex calculations or data manipulation in inline handlers that should be named and exportable for tests. [Important]
- Prefer `getAttribute('data-*')` over `dataset` in critical paths or loops. [Suggestion]
- Use `setAttribute` / `getAttribute` for attribute manipulation. [Suggestion]
- NodeList not converted to Array with `[...nodeList]` or `Array.from(nodeList)` when iteration or array methods needed. [Minor]

## DOM & Events

- JavaScript hooks not using data attributes (e.g. `[data-bookmark-button]`, `getAttribute('data-bookmark-id')`). [Suggestion]

## Modern syntax (ES6+)

- Long chains of `&&` for nested property access instead of optional chaining (`?.`). [Suggestion]
- Using `||` when `0`, `""`, `false` are valid values instead of nullish coalescing (`??`). [Suggestion]
- Missing destructuring for function parameters, return values, or variable declaration when it improves readability. [Suggestion]

## Structured units (modules, hooks, classes)

- Class structure not following project convention: constructor → init → addEvents → handlers → utilities. [Suggestion]
- Event handlers needing `this` context not bound in constructor. [Important]

## JSX/TSX

- Use `className` (not `class`) for CSS classes in JSX. [Important]
- jsx-dom: dependency (SVG, CSS, JS) not explicitly imported in the component that uses it. [Important]

## Naming conventions

- Non-descriptive names (`data`, `item`, `x`, `handle()`, `process()`). [Important]
- Generic class names (`Manager`, `Helper`, `Service`). [Important]

## Semantic function naming

- Function prefix/return type mismatch (e.g. `isXxx` / `hasXxx` returning non-boolean). [Important]
- `getXxx()` / `fetchXxx()` with no return statement or explicitly returns `undefined`/`void` (outside reactive component context). [Important]
- `validateXxx()` that returns boolean — rename to `isXxxValid`. [Important]
- `getXxx()` / `fetchXxx()` returning wrong type (e.g. `getUser()` returns `Car`). [Important]
- `fetchXxx()` that does not make a network call. [Important]
- `calculateXxx()` / `computeXxx()` not returning derived value. [Important]
- `updateXxx()` / `setXxx()` not modifying object or returning void. [Important]
- `getXxx()` returning `{ user, metadata }` instead of single value — flag as Suggestion. [Suggestion]
- `toXxx()` / `asXxx()` not returning converted type. [Suggestion]
- `createXxx()` / `buildXxx()` not returning new instance. [Suggestion]

## JSDoc

- Exported functions without JSDoc comments. [Suggestion]
- In JS: JSDoc missing `@param`, `@returns`, `@async` tags with types. [Suggestion]
- In TS: JSDoc duplicating type annotations — keep description only, omit `@param {string}`. [Minor]

### Critical verification checkpoints

- Does the function name match its return type and side effects?
- Is state mutated directly instead of via copy or pure functions?
- Are event handlers named when removeEventListener is needed?
- Is dataset used in hot loops or critical path (prefer getAttribute)?
- Would optional chaining or nullish coalescing simplify this code?
