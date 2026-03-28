# PromptRepository Agent Notes

> **Policy inheritance:** Follow `../AGENTS.md` for language, naming, testing, and security conventions. This document narrows the focus to the prompt/driver library.

## Library Charter
- Provide reusable prompt templates, driver factories, and embedding utilities for both Node.js and browser runtimes.
- Keep the public API stable - `src/entry.ts` exports the full surface; any new module must be re-exported there.
- Ensure implementations remain environment-agnostic by guarding Node-only modules (`fs`, `path`) with dynamic imports or adapters.

## Prompts & Drivers
- Store canonical prompt metadata in JSON/TS files under `src/prompts`; include descriptions, parameter schemas, and version fields.
- Validate parameters before expansion with shared helpers; throw `InvalidParameterError` from `@jonverrier/assistant-common` when inputs fail validation.
- Driver factories (chat + embedding) must accept provider configs (OpenAI, Azure OpenAI) via typed enums, and expose streaming + non-streaming methods.
- When adding a new provider or model, update the enums, factory switch statements, and documentation (`README.md`, `CodeReview.md`).

## Testing & QA
- Mocha + `expect` tests should cover prompt expansion, parameter validation, error handling, and driver wiring for every supported provider.
- Provide browser compatibility tests (e.g., using jsdom) for modules that claim dual-runtime support.
- Keep golden prompt fixtures in `test/fixtures`; regenerate them intentionally when prompts change and include notes in the PR.

## Build & Distribution
- `npm run build` must emit CJS + `.d.ts` artifacts in `dist/`; wipe the folder before rebuilding to avoid stale files.
- Maintain semver discipline: prompt schema changes that break consumers require a minor/major bump as appropriate.
- Document linking instructions (`npm run link-local`) so downstream packages can test against unpublished prompt updates.
