# Agent Collections — Changelog

Tracks updates to the AGENT COLLECTIONS table in `README.md`.

## Status Legend

- `COMPLETE (reason)` — action item executed successfully
- `INVALID (reason)` — action item determined to be unnecessary or incorrect
- `ON HOLD (reason)` — action item deferred for later

---

## [2026-05-05 09:26 PM PKT] Agent Collections Update

| # | Priority | Type  | Action                                                                 | Status                                  |
|---|----------|-------|------------------------------------------------------------------------|-----------------------------------------|
| 1 | MED      | Star  | Update msitarzewski/agency-agents ★ from 92k to 93k                    | COMPLETE (verified via GitHub API: 93,374) |
| 2 | MED      | Count | Update msitarzewski/agency-agents agents from 206 to 197               | COMPLETE (recursive tree count, agent .md files across 15 categories) |
| 3 | LOW      | Star  | VoltAgent/awesome-claude-code-subagents ★ unchanged (19k = 19,137)     | INVALID (no change required)            |
| 4 | MED      | Count | Update VoltAgent/awesome-claude-code-subagents agents from 148 to 144  | COMPLETE (recursive tree count under categories/, excluding tools/) |
| 5 | LOW      | Sort  | Verify sort order (stars descending)                                   | COMPLETE (msitarzewski 93k > VoltAgent 19k — order preserved) |
| 6 | MED      | Rule  | Confirm 10k+ stars threshold for table inclusion                       | COMPLETE (user confirmed; both listed repos pass — msitarzewski 93k, VoltAgent 19k; saved as feedback memory for future runs) |
