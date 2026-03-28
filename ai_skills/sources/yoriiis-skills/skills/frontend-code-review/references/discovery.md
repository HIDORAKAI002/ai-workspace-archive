# Discovery & conventions (Step 0)

**Before reviewing any code**, analyze the project to understand its conventions and tooling. This determines WHAT you review and WHAT you skip.

## What to discover

Use `search` (scope: `merge_requests`, project scoped, state: `merged`, per_page: 5) to check recent merged MRs:

- **Labels**: does the project use labels? Which ones?
- **Squash**: are MRs squashed on merge?
- **Reviewers**: are reviewers systematically assigned?
- **Description style**: do MRs reference tickets? How detailed?
- **Branch naming**: what pattern? (`feat/`, `fix/`, ticket IDs, etc.)

Use `search` (scope: `blobs`, project scoped) to detect project tooling:

- **Language**: `tsconfig.json` → TypeScript? Pure JS?
- **Linter**: `biome.json` or `.eslintrc` or `eslint.config` → which linter?
- **Formatter**: Biome, Prettier, or none?
- **Test framework**: `jest.config`
- **Package type**: `"type": "module"` in `package.json` → ESM or CJS?
- **CHANGELOG**: does `CHANGELOG.md` exist?
- **Node/npm version**: does the project expose it? (e.g. `.nvmrc`, `.node-version`, `engines` in `package.json`, or README/CONTRIBUTING)
- **CI**: check `.gitlab-ci.yml` or `.github/workflows/*` for pipeline structure
- **Build stripping**: does the build strip `console.log`? (check rspack/webpack config or Biome config)

## Linter & formatter detection

Use `search` (scope: `blobs`, project scoped) to detect presence of these config files:

- **Linter**: `biome.json`, `.eslintrc`, `.eslintrc.js`, `eslint.config.js`, `eslint.config.mjs`, `.stylelintrc`
- **Formatter**: `biome.json`, `.prettierrc`, `prettier.config.js`

When linter and formatter are detected, trust them for style and format — see **Tooling calibration** under **Reference loading** in `SKILL.md`.

## Project-specific rules

Check if the project has its own coding rules or conventions:

- **Cursor rules**: search for `.cursor/rules/` in the project — if present, read them and use them as additional review context
- **Cursor skills**: search for `.cursor/skills/` in the project
- **Documentation**: check for `CONTRIBUTING.md`, `CODING_STANDARDS.md`, or similar

These project-specific rules take precedence over the generic references in this skill. **In case of conflict between a local project rule (e.g., `.cursor/rules/*`, `.github/copilot-instructions.md`, `.claude/rules/*`, `CLAUDE.md`, or any internal standard) and a generic skill reference, the local rule MUST take precedence over the generic one.**

## Coding style detection

Detect the project's coding conventions from its configuration files (don't guess — read the config):

- **`.editorconfig`**: indentation style (tabs/spaces), indent size per file type, final newline, charset
- **`biome.json`** / **`.prettierrc`**: quotes, semicolons, trailing commas, indent style
- **`.code-workspace`** or **`.vscode/settings.json`**: editor-level settings
- **`.eslintrc`** / **`eslint.config`**: code style rules
- **`.stylelintrc`**: CSS style rules

If none of these files exist, analyze actual source files to infer conventions.

If a file in the MR/PR uses a different style than what the project config enforces, flag it. The MR/PR must match the project's existing conventions, not an external standard.

## Convention profile

Build this profile before reviewing:

```text
Project: [name]
Language: TypeScript | JavaScript | Mixed
Module: ESM | CJS | Unknown
Linter: Biome | ESLint | Stylelint | None detected
Formatter: Biome | Prettier | None detected
Tests: Jest | None detected
Build strips console: Yes | No | Unknown
Uses labels: Yes (list) | No
Squash on merge: Yes | No
CHANGELOG: Yes | No
Node/npm version documented: Yes | No
Branch convention: feat/<ticket> | <TICKET-ID> | free-form
```

## Tooling calibration

Based on the profile, adjust what you report: when a safety net is missing (no linter, no tests), issues that tools would normally catch become **Important** (not Minor), since there is no automated backup. When linter and formatter are present, trust them for style — focus on what tools cannot catch.

**CI detection**: If a CI pipeline is present (`.gitlab-ci.yml`, `.github/workflows/*`) and runs linter/formatter, lighten or empty the Minor section for style items (trailing whitespace, `const`/`let`, imports). Focus human review on semantics and architecture.
