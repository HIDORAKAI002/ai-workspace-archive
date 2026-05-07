# Agent Collections — Changelog

Tracks updates to the AGENT COLLECTIONS table in `README.md`.

## Status Legend

- `COMPLETE (reason)` — action item executed successfully
- `INVALID (reason)` — action item determined to be unnecessary or incorrect
- `ON HOLD (reason)` — action item deferred for later

---

## [2026-05-07 08:47 PM PKT] Agent Collections Update

| # | Priority | Type  | Action                                                                          | Status                                                                                                                              |
|---|----------|-------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| 1 | MED      | Star  | Update msitarzewski/agency-agents ★ from 94k to 95k                             | COMPLETE (web scrape ~94,700 → rounds to 95k; base was 94k per prior run 2026-05-06)                                                |
| 2 | LOW      | Star  | VoltAgent/awesome-claude-code-subagents ★ unchanged (~19.3k rounds to 19k)      | INVALID (no change required)                                                                                                        |
| 3 | LOW      | Count | Update VoltAgent/awesome-claude-code-subagents agents from 144 to 145           | COMPLETE (direct traversal of 10 category dirs: 145 .md files, confidence 0.78)                                                     |
| 4 | LOW      | Count | Verify msitarzewski/agency-agents agent count (web scrape 184 vs tree-API 185)  | INVALID (within ±1 margin of error — web scraping vs git tree API methodology; 185 from prior tree-API run is more reliable; no change) |
| 5 | LOW      | Sort  | Verify sort order (stars descending)                                            | COMPLETE (msitarzewski 95k > VoltAgent 19k — order preserved)                                                                       |

---

## [2026-05-06 10:03 PM PKT] Agent Collections Update

| # | Priority | Type  | Action                                                                         | Status                                                              |
|---|----------|-------|--------------------------------------------------------------------------------|---------------------------------------------------------------------|
| 1 | LOW      | Star  | msitarzewski/agency-agents ★ unchanged (94k = ~94,300)                         | INVALID (no change required)                                        |
| 2 | LOW      | Count | msitarzewski/agency-agents agents ~184-186 vs current 185                      | INVALID (within margin of error — ±2 pagination artifact; no change) |
| 3 | LOW      | Star  | VoltAgent/awesome-claude-code-subagents ★ unchanged (19k = ~19,200)            | INVALID (no change required)                                        |
| 4 | LOW      | Count | Update VoltAgent/awesome-claude-code-subagents agents from 145 to 144          | COMPLETE (in-repo .md file count decreased by 1 across categories/) |
| 5 | LOW      | Sort  | Verify sort order (stars descending)                                           | COMPLETE (msitarzewski 94k > VoltAgent 19k — order preserved)       |

---

## [2026-05-06 08:48 PM PKT] Agent Collections Update

| # | Priority | Type  | Action                                                                 | Status                                  |
|---|----------|-------|------------------------------------------------------------------------|-----------------------------------------|
| 1 | MED      | Star  | Update msitarzewski/agency-agents ★ from 93k to 94k                    | COMPLETE (verified via GitHub API: 94,254) |
| 2 | HIGH     | Count | Update msitarzewski/agency-agents agents from 197 to 185               | COMPLETE (git tree recursive count: 185 agent .md files across 20 category dirs; excludes strategy/, examples/, integrations READMEs) |
| 3 | LOW      | Star  | VoltAgent/awesome-claude-code-subagents ★ unchanged (19k = 19,214)     | INVALID (no change required)            |
| 4 | LOW      | Count | Update VoltAgent/awesome-claude-code-subagents agents from 144 to 145  | COMPLETE (git tree count: 145 in-repo .md files; 3 README entries are external links) |
| 5 | LOW      | Sort  | Verify sort order (stars descending)                                   | COMPLETE (msitarzewski 94k > VoltAgent 19k — order preserved) |

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
