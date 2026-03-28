# Architecture & Project Structure

Reference standards for project organization, package management, and front-end architecture (framework-agnostic).

---

## Single Responsibility Principle (SRP)

- Functions with side effects not explicitly indicated by their name. [Important]
- Functions doing two or more unrelated things (validation + API call + DOM manipulation) — split them. [Important]

## Dependency Inversion Principle (DIP)

- Instantiating heavy dependencies inside functions (prefer dependency injection). [Suggestion]
- Depend on abstractions, not concrete implementations. [Suggestion]

## Testability by Design

- Code written as if it will be tested: pure functions when possible, clear inputs/outputs, no hidden coupling. [Suggestion]
- Prefer explicit dependencies over implicit ones. [Suggestion]

## Component complexity

- Oversized or multi-responsibility templates/components — flag and suggest splitting. [Important]
- Changes that seem out of scope for the component's primary responsibility. [Important]

## Design patterns

- Tight coupling between components. [Suggestion]
- God objects/classes that know too much. [Suggestion]
- Deep inheritance hierarchies (prefer composition). [Suggestion]
- Feature envy. [Suggestion]

## Separation of Concerns (SoC)

- Separate business logic and data handling from DOM manipulation or UI rendering. [Important]

## Coupling & Cohesion

- Avoid strong coupling between distinct modules; prefer clear boundaries and high cohesion. [Suggestion]

## Data flow / data model

- Ensure predictable data flow and a clear data model; prefer single source of truth. [Important]

## Project structure & tooling

- Coverage directory committed to git. [Blocking]
- Project does not expose or document the Node/npm version to use (e.g. `.nvmrc`, `.node-version`, `engines` in `package.json`, `README` or `CONTRIBUTING`). [Suggestion]
- Dependency version format inconsistent with project convention — check existing `package.json`. [Important]
- For libraries: check `"exports"` and `"files"` fields if the package is published. [Suggestion]

## Dependency management

- Dependencies changed in manifest without lockfile update in the same MR. [Blocking]
- `package.json` changed (dependencies/devDependencies) without `package-lock.json` (or yarn/pnpm lock). [Blocking]
- `composer.json` require/require-dev changed without `composer.lock`. [Blocking]
- Requiring lockfile update when manifest change does not affect dependency tree. [Minor]

### Critical verification checkpoints

- Does this function do only what its name indicates?
- Are heavy dependencies injected rather than instantiated inside the function?
- Does this change belong in the current component's scope?
- Is business logic separated from DOM/UI rendering?
- Is data flow predictable and is there a single source of truth where relevant?
