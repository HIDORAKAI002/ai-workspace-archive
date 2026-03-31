# Changelog

## Unreleased

## 0.0.3 - 2026-03-29

### Changed

- npm now publishes built ESM JavaScript from `dist/` instead of exposing raw TypeScript source as the package entrypoint.
- TypeScript consumers now pick up shipped declaration files automatically from the published package, while plain JavaScript consumers can install and import the package without relying on dependency-side TypeScript transpilation.

## 0.0.2 - 2026-03-28

### Added

- `{ whiteSpace: 'pre-wrap' }` mode for textarea-like text, preserving ordinary spaces, tabs, and hard breaks.

## 0.0.1 - 2026-03-27

### Changed

- Safari line breaking now has a clearer browser-specific policy path for narrow soft-hyphen and breakable-run cases.
- Browser tooling is more stable: fresh per-run page ports, diagnostics derived from the public rich layout API, and a non-watch `bun start` by default.

## 0.0.0 - 2026-03-26

Initial public npm release of `@chenglou/pretext`.

### Added

- `prepare()` and `layout()` as the core fast path for DOM-free multiline text height prediction.
- Rich layout APIs including `prepareWithSegments()`, `layoutWithLines()`, `layoutNextLine()`, and `walkLineRanges()` for custom rendering and manual layout.
- Browser accuracy, benchmark, and corpus tooling with checked-in snapshots and representative canaries.
