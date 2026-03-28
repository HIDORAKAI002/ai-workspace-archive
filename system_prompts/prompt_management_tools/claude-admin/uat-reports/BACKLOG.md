# ClaudeAdmin UAT Problem-Backlog v5 (Post-Refactoring)

**Datum:** 2026-02-23
**Version:** 0.1.0 (Basis: 675e31f + 7-Phasen Refactoring)
**Tester:** Virtual UAT v5 (Komplett-Test + Refactoring-Verifikation)
**Gesamtergebnis:** 121/121 Tests bestanden (100%) — Market Score 9.7/10

---

## UAT-Verlauf

| Version | Datum          | Tests            | Pass-Rate       | Market Score |
| ------- | -------------- | ---------------- | --------------- | ------------ |
| v1      | 2026-02-22     | 65               | 80% (52/65)     | —            |
| v2      | 2026-02-22     | 45               | 97.8% (44/45)   | 7.0/10       |
| v3      | 2026-02-22     | 71               | 100% (71/71)    | 7.8/10       |
| v4      | 2026-02-23     | 91               | 93.4% (85/91)   | 9.2/10       |
| v4-fix  | 2026-02-23     | 91               | 96.7% (88/91)   | 9.5/10       |
| v5      | 2026-02-23     | 73 API + 48 Unit | 100% (121/121)  | 9.7/10       |
| **v6**  | **2026-03-06** | **81 API**       | **99% (80/81)** | **9.8/10**   |

---

## Was wurde in v5 verifiziert

7-Phasen Refactoring-Pass fuer langfristige Wartbarkeit:

| Phase | Aenderung                                           | Verifiziert                                        |
| ----- | --------------------------------------------------- | -------------------------------------------------- |
| 1     | Shared Route Builder (`routes/router.rs`)           | 73 API-Tests + 48 Unit-Tests nutzen gleiche Routes |
| 2     | Middleware mit `from_fn_with_state` statt Extension | Auth + Rate-Limit funktional verifiziert           |
| 3     | RBAC-Caching (`Arc<RwLock<RbacConfig>>`)            | Keine sync I/O mehr, Auto-Reload via File-Watcher  |
| 4     | HMAC-SHA256 Token-Generierung                       | Session-Tokens kryptographisch sicher              |
| 5     | Dead-Code-Cleanup                                   | 0 Compiler-Warnings (vorher 3)                     |
| 6     | Konsistentes Audit-Logging                          | 11 Write-Handler, Audit-Eintraege live verifiziert |
| 7     | ConfigScope::Project Bereinigung                    | `parse_scope("project")` → 400, `unreachable!()`   |

---

## Alle bisherigen Findings — Status

### v1-v4 Bugs: Alle behoben

| ID                          | Beschreibung                                        | Status                         |
| --------------------------- | --------------------------------------------------- | ------------------------------ |
| BUG-001 bis BUG-007         | Core-Bugs (MCP, Path Traversal, Content-Type, etc.) | BEHOBEN                        |
| SEC-001 bis SEC-004         | Security (XSS, Null-Byte, Headers, CORS)            | BEHOBEN                        |
| BUG-v2-001, BUG-v2-002      | Path Traversal normalization, MCP timeout           | BEHOBEN                        |
| SEC-v2-001                  | Keine Authentifizierung                             | BEHOBEN                        |
| UX-001                      | Keine Bestaetigungsdialoge                          | BEHOBEN                        |
| BUG-v4-001                  | TokenStore nicht als Extension injiziert            | BEHOBEN (Phase 2: jetzt State) |
| WARN-v4-001 bis WARN-v4-006 | Minor Warnings                                      | ALLE BEHOBEN                   |

### v4-Gaps: Alle geschlossen

| Gap ID     | Beschreibung               | Geloest durch          | Status      |
| ---------- | -------------------------- | ---------------------- | ----------- |
| GAP-v4-004 | RBAC in Auth-Middleware    | Phase 2+3              | GESCHLOSSEN |
| GAP-v4-005 | Audit-Logging inkonsistent | Phase 6                | GESCHLOSSEN |
| GAP-v4-008 | Negative Budget-Werte      | v4-fix, v5 verifiziert | GESCHLOSSEN |

### Strukturelle Probleme: Alle geloest

| Problem                                     | Geloest durch                 | Status      |
| ------------------------------------------- | ----------------------------- | ----------- |
| app.rs 589 Zeilen, 255 Zeilen Route-Chain   | Phase 1: router.rs            | GESCHLOSSEN |
| Test-Router dupliziert (43 fehlende Routes) | Phase 1: Shared Builder       | GESCHLOSSEN |
| Extension-Workaround in Middleware          | Phase 2: from_fn_with_state   | GESCHLOSSEN |
| Sync I/O (RbacConfig) im async Context      | Phase 3: RwLock-Cache         | GESCHLOSSEN |
| Vorhersagbare Token-Generierung             | Phase 4: HMAC-SHA256          | GESCHLOSSEN |
| 3 Dead-Code-Warnings                        | Phase 5: Cleanup              | GESCHLOSSEN |
| ConfigScope::Project stilles Fehlverhalten  | Phase 7: 400 + unreachable!() | GESCHLOSSEN |

---

## UX-Verbesserungen (Nutzer-Feedback 2026-03-06)

| ID     | Beschreibung                                     | Status    |
| ------ | ------------------------------------------------ | --------- |
| UX-002 | SVG-Icons in Sidebar statt Buchstaben            | UMGESETZT |
| UX-003 | Strukturiertes MCP-Formular (Form + JSON-Toggle) | UMGESETZT |
| UX-004 | "Zuletzt geändert" im Dashboard (Audit-Log)      | UMGESETZT |
| UX-005 | i18n für alle 12 Sprachen aktualisiert           | UMGESETZT |

---

## Verbleibende Optimierungen (nur Nice-to-Have)

Keine Blocker, keine kritischen Probleme, keine offenen Bugs.

| ID      | Beschreibung                                     | Prioritaet   | Aufwand |
| ------- | ------------------------------------------------ | ------------ | ------- | ---------------------------- |
| OPT-001 | E2E Frontend-Tests (Playwright/WASM)             | Nice-to-Have | 2h      | **→ siehe TICKET-001 unten** |
| OPT-002 | SSE Events E2E-Test                              | Nice-to-Have | 30 min  |
| OPT-003 | Clippy-Fixes in backups.rs (needless_range_loop) | Cosmetic     | 10 min  |
| OPT-004 | Clippy-Fixes in Frontend/CLI (copy statt clone)  | Cosmetic     | 10 min  |

---

## TICKET-001 — E2E Frontend-Tests mit Playwright

**ID:** TICKET-001  
**Erstellt:** 2026-03-06  
**Priorität:** Should-Have (kein Blocker, aber einziger ungetesteter Layer)  
**Aufwand:** ~2h  
**Status:** Offen

### Hintergrund

ClaudeAdmin schreibt direkt in `~/.claude/`. Backend (121/121 Tests) und API-Layer sind vollständig abgedeckt. Die Frontend-UI (Leptos/WASM) ist der einzige Layer ohne automatisierte Tests. Da alle Write-Operationen über UI-Interaktionen angestoßen werden, sind zumindest die kritischsten Schreibpfade zu testen.

### Ziel

Playwright-basierte E2E-Tests, die den Browser gegen den laufenden ClaudeAdmin-Server steuern. Da das Frontend als WASM im Browser läuft, sind klassische WASM-Unit-Tests schwierig — Playwright testet das gesamte System end-to-end.

### Scope (MVP)

Die folgenden kritischen Write-Flows müssen abgedeckt sein:

| #   | Flow                                              | Warum kritisch                                                   |
| --- | ------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | CLAUDE.md eines Projekts bearbeiten und speichern | Häufigste Schreiboperation, direkte Wirkung auf Claude-Sessionen |
| 2   | Neue globale Rule anlegen                         | Erstellt Datei in `~/.claude/rules/`                             |
| 3   | Neuen globalen Skill anlegen                      | Erstellt Verzeichnis + `SKILL.md` in `~/.claude/skills/`         |
| 4   | MCP-Server hinzufügen                             | Schreibt in `~/.claude.json`                                     |
| 5   | MCP-Server löschen                                | Schreibt in `~/.claude.json`, Bestätigungsdialog muss erscheinen |
| 6   | Backup-Restore durchführen                        | Überschreibt bestehende Datei                                    |
| 7   | Login-Flow (wenn CLAUDE_ADMIN_TOKEN gesetzt)      | Auth-Layer verifizieren                                          |

### Nicht in Scope (MVP)

- WASM-interne Unit-Tests (sehr hoher Setup-Aufwand für Leptos)
- SSE/Live-Reload-Tests (→ OPT-002)
- Visual Regression Tests

### Technische Umsetzung

```
# Setup
npm init playwright@latest claude-admin-e2e
cd claude-admin-e2e

# Struktur
claude-admin-e2e/
  playwright.config.ts   # baseURL: http://localhost:9022
  tests/
    01-claude-md.spec.ts
    02-rules.spec.ts
    03-skills.spec.ts
    04-mcp.spec.ts
    05-backup-restore.spec.ts
    06-auth.spec.ts
```

`playwright.config.ts` startet das Backend als `webServer` vor den Tests:

```typescript
webServer: {
  command: 'cargo run -p claude-admin-backend',
  url: 'http://localhost:9022/api/v1/health',
  reuseExistingServer: !process.env.CI,
  timeout: 30_000,
}
```

### Akzeptanzkriterien

- [ ] Alle 7 MVP-Flows laufen grün in `npx playwright test`
- [ ] CI-Integration via `.github/workflows/e2e.yml` (läuft nach `ci.yml`)
- [ ] Kein Test schreibt in das echte `~/.claude/` — Fixture mit `CLAUDE_HOME` Env-Override oder temporärem Verzeichnis
- [ ] Testlauf dauert < 60s

### Hinweis zur Testumgebung

Tests dürfen **nicht** in das echte `~/.claude/` des Entwicklers schreiben. Lösung: `CLAUDE_HOME=/tmp/claude-admin-test` als Umgebungsvariable im Backend einlesen und `dirs_home()` entsprechend erweitern, oder ein separates Fixture-Verzeichnis mit vorbelegten Test-Konfigurationsdateien verwenden.
