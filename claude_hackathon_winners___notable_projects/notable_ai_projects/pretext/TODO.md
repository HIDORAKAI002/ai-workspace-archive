# Current Priorities

## 1. Engine Work

- Use the separate `analyze()` and `measure()` benchmark rows when changing `prepare()`. Use the chunk-heavy rich-text rows when changing streaming APIs.
- Before changing Safari prefix-width behavior, run the synthetic long breakable text case. Lower retained memory does not justify a meaningful `prepare()` regression.
- Chinese is the most useful current CJK regression case. Until broader measurements show a rule that applies beyond those cases, treat strongly font- or shaping-sensitive differences in Chinese, Myanmar, and Urdu as limits of the current design.
- Keep `layout()` simple and allocation-light. Performance work for rich text and manual line layout belongs in the range and cursor APIs.

## 2. Regression Coverage

- Keep mixed app text as the main app-like regression case. Add only real text patterns that the current corpus misses.
- Add corpora only from clean source text. Expand the font matrix only around a case with a reproducible mismatch.
- Prefer a new Southeast Asian source that broadens coverage over another wrapped legal or raw-source artifact.

## 3. Demo Work

- Keep the editorial demos as the first real consumers of the rich line APIs, so they continue to test the APIs in complete layouts.
- Prefer `layoutNextLine()` / `walkLineRanges()` when a demo is really about streaming or obstacle-aware layout.
- Add a new demo only if it exposes something the current editorial demos do not already cover.

## Open Design Questions

- Should line-fit tolerance remain a browser-specific constant, or can it be calibrated at runtime without adding unstable behavior?
- Should `{ whiteSpace: 'pre-wrap' }` support more than ordinary spaces, tabs, and `\n`?
- Would real demand for `system-ui` justify a small DOM measurement during `prepare()` for the affected browser and font-size combinations?
- Should server canvas become a supported measurement backend?
- Is automatic hyphenation in scope beyond caller-provided soft hyphens?
- Are more intrinsic or logical-width APIs needed beyond `measureNaturalWidth()` and fixed-width layout?
- Should bidi selection and copy/paste behavior remain outside this package?
- Is a slower diagnostic verification mode useful enough to support without changing `layout()`?
