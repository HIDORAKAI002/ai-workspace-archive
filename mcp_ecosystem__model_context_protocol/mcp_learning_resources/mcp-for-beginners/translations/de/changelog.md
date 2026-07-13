# Änderungsprotokoll: MCP für Anfänger Curriculum

Dieses Dokument dient als Aufzeichnung aller bedeutenden Änderungen am Model Context Protocol (MCP) für Anfänger Curriculum. Änderungen werden in umgekehrter chronologischer Reihenfolge dokumentiert (neueste Änderungen zuerst).

## 2. Juli 2026

### Neue Lektion: Der MCP-Spezifikations-Release-Kandidat vom 28.07.2026

Abdeckung des bevorstehenden `2026-07-28` MCP-Spezifikations-Release-Kandidaten hinzugefügt (angekündigt am 21. Mai 2026; endgültige Veröffentlichung geplant für den 28. Juli 2026), zusammengefasst aus dem [offiziellen Ankündigungs-Blogpost](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Die Basis des Curriculums bleibt **MCP Specification 2025-11-25** bis zur Auslieferung der neuen Version, daher wird dies als zukunftsgerichtete Orientierung und nicht als Umschreibung bestehender Lektionen dargestellt.

- **Neu**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — eine vollständige Lektion, die den zustandslosen Protokollkern behandelt (Entfernung des `initialize` Handshakes und `Mcp-Session-Id`), die neuen `Mcp-Method`/`Mcp-Name` Routing-Header, `ttlMs`/`cacheScope` Caching-Metadaten, W3C Trace Context in `_meta`, das formale Erweiterungsframework (MCP Apps und die neue Tasks-Erweiterung), sechs Authorisierungs-Härtungs-SEPs, die Veraltung von Roots/Sampling/Logging und den Umstieg auf vollständiges JSON Schema 2020-12 für Werkzeug-Schemata.
- **Aktualisiert** mit zukunftsgerichteten Hinweisen mit Verlinkungen zur neuen Lektion:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): Protokollversionshinweis, Sampling/Roots/Logging/Tasks Abschnitte und "Was kommt als Nächstes"
  - [02-Security/README.md](./02-Security/README.md): Hinweis zur Autorisierungshärtung
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): Verweis auf zustandslosen Transport
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Hinweis zur Sampling-Abkündigung
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Hinweis zur Logging-Abkündigung und Tasks-Erweiterung
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): Hinweis zum zustandslosen/session Routing
  - [README.md](./README.md): Hinweis „In die Zukunft blicken“ im Spezifikationsabschnitt und neuer Eintrag `1.1` in der Curriculums-Modultabelle
  - [study_guide.md](./study_guide.md): zukunftsgerichteter Bulletpunkt unter der Übersicht „Kernkonzepte“ und ein datierter Nachtragshinweis
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): Hinweis zur `mcp-session-id` Transportmap vor dem Modell der zustandslosen Anfrage
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): Modulumriss-Hinweis zu Root-Kontexten/Sampling-Abkündigungen und zur Tasks-Erweiterung
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): Hinweis zur Autorisierungshärtung

## 24. Juni 2026

### Neue Lektion: Verwendung von MCP in der Copilot-App

- [Tooling Abschnitt](./12-tooling/README.md) Tooling-Abschnitt hinzugefügt.
- [MCP in der Copilot-App](./12-tooling/01-copilot-app/README.md)

## 16. Juni 2026

### MCP Spezifikationsausrichtung & Beispielvalidierung

Das Curriculum wurde gegen die aktuelle **MCP Specification 2025-11-25** und die neuesten offiziellen SDKs validiert, anschließend wurden verbleibende veraltete Spezifikationsreferenzen korrigiert und bestätigt, dass die Kernbeispiele weiterhin kompilieren und laufen.

#### Korrekturen der Spezifikationsversion (2025-06-18 / 2025-03-26 → 2025-11-25)

Englischen Inhalt aktualisiert, wo noch behauptet wurde, eine ältere Spezifikationsrevision sei der *aktuelle/neuste* Standard, und Links auf die kanonischen `modelcontextprotocol.io` Spezifikationspfade umgestellt:
- **05-AdvancedTopics/mcp-security/README.md**: Banner „Current Standard“, Einführung, Überschrift der Kernprinzipien der Sicherheit, Überschrift Pflichtanforderungen, Abschnitt Microsoft Entra ID, Referenzen & Ressourcen Links und abschließender Sicherheitshinweis (8 Referenzen) auf 2025-11-25 aktualisiert
- **05-AdvancedTopics/mcp-transport/README.md**: Zusätzlicher Ressourcen-Spezifikationslink und Banner „Current Standard“ auf 2025-11-25 aktualisiert
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Veralteten `2025-03-26` Link zu Sicherheit und Vertrauen durch aktuelle Seite der Sicherheitsbest Practices 2025-11-25 ersetzt
- **03-GettingStarted/14-sampling/README.md**: Offiziellen Sampling-Dokumentationslink auf 2025-11-25 aktualisiert
- **03-GettingStarted/05-stdio-server/README.md**: Gegenwartsform-Verweis auf „aktuelle MCP-Spezifikation“ und zusätzlicher Ressourcen-Spezifikationslink auf 2025-11-25 aktualisiert (Historische SSE-Abkündigungshinweise bleiben für Genauigkeit erhalten)

#### Beispielvalidierung gegen aktuelle SDKs

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` löste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` ohne Typfehler bestanden — vorhandene `McpServer`/`StdioServerTransport` APIs bleiben gültig
- **Python (03-GettingStarted/01-first-server/solution/python)**: In isoliertem `.venv` mit `mcp[cli]` (1.27.2) validiert; `py_compile` bestanden und `FastMCP.list_tools()` gab korrekt die Tools `add` und `subtract` zurück
- Bestätigt, dass alle Beispiel-`@modelcontextprotocol/sdk` Versionsbereiche (`>=1.26.0` / `^1.26.0` / `^1.27.0`) sauber auf das aktuelle `1.29.0` auflösen ohne breaking API-Änderungen

#### Abhängigkeits-Pin-Angleichung (Schließung von Versionslücken)

Veraltete SDK-Pins angehoben, sodass alle Beispiele die aktuelle MCP-Version nachverfolgen, passend zur repo-weiten Konvention:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` von `^1.8.0` auf `>=1.26.0` angehoben und veraltete Paketbeschreibung `"updated for MCP 2025-06-18"` auf `"aligned with MCP Specification 2025-11-25"` aktualisiert
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** und **lab4/code/github_mcp_server/pyproject.toml**: Exakten Pin `mcp==1.23.0` auf `mcp>=1.26.0` angehoben; beide `uv.lock`-Dateien neu generiert (`uv lock`), sodass die Lockfiles auf das aktuelle `mcp 1.27.2` auflösen und synchron mit den Manifests bleiben

#### Analyse von Curriculum-Lücken — Abdeckung der neuesten Spezifikationsfeatures

Bestätigt, dass das Curriculum alle primitiven Funktionen abdeckt, die in MCP 2025-11-25 eingeführt/erweitert wurden, sodass keine Inhaltslücken bestehen:
- **Sampling**: Lektionen 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-Modus)**: Dokumentiert in 01-CoreConcepts und 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumentiert in 00-Introduction, 01-CoreConcepts und 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimentell, langlaufende Operationen)**: Dokumentiert in 01-CoreConcepts und 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotations** (`readOnlyHint` / `destructiveHint`): Dokumentiert in 01-CoreConcepts und 05-AdvancedTopics/mcp-protocol-features

### Sicherheitshärtung & Behebung von Abhängigkeits-Schwachstellen

Eine vollständige Sicherheitsüberprüfung jeder Abhängigkeitsmanifestdatei und des Beispiel-Quellcodes durchgeführt und alle gemeldeten npm-Warnungen sowie einen Fehler auf Codeebene behoben. Nach der Behebung meldet `npm audit` **0 Schwachstellen** in jedem geprüften Verzeichnis.

#### npm-Abhängigkeits-Schwachstellen (transitiv) — behoben

Alle 15 festgeschriebenen `package-lock.json` Dateien auditiert. Schwachstellen beschränkten sich auf transitive Abhängigkeiten, die durch das MCP Inspector Dev Tool, den OpenAI-Client und das MCP SDK geladen werden; alle sind jetzt ohne Brüche in den Beispielen behoben:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** und **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`) angehoben, womit die Warnungen zu gebündelten `ajv`, `brace-expansion`, `diff`, `path-to-regexp` und `ws` beigelegt wurden. Ein npm-Overrides-Eintrag hinzugefügt, der das gepatchte `shell-quote@1.8.4` erzwingt, um die verbleibende kritische Warnung durch `concurrently` zu eliminieren; beide Lockfiles neu generiert (jetzt 0 Schwachstellen)
- **03-GettingStarted/samples/typescript**: `npm audit fix` hat die transitive `qs` (mittel) auf eine gepatchte Version aktualisiert
- **03-GettingStarted/samples/javascript**: `npm audit fix` hat die transitive `hono` (mittel) auf eine gepatchte Version aktualisiert
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` hat die transitive `form-data` (hoch) auf eine gepatchte Version aktualisiert
- **03-GettingStarted/11-simple-auth/solution/typescript**: Fehlende `package-lock.json` generiert, sodass das Projekt reproduzierbar und auditierbar ist (0 Schwachstellen)

#### Sicherheitspatch auf Codeebene (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `shell=True` beim `open_in_vscode` Tool entfernt. Das vorherige `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` erlaubte Shell-Metazeichen im Ordnerpfad, die von `cmd.exe` interpretiert wurden (Command-Injection-Risiko). Jetzt wird `Code.exe` direkt mit dem Ordner als Argument gestartet — keine Shell — was funktional äquivalent und sicher ist

#### Python-Abhängigkeitsprüfung

- Jede Python-Anforderungssituation mit `pip-audit` geprüft. `05-AdvancedTopics` und `03-GettingStarted/samples/python` meldeten **keine bekannten Schwachstellen** (deren `mcp` / `httpx` / `pydantic` / `python-dotenv` Bereiche lösen auf aktuelle gepatchte Versionen auf)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` meldete bei der transitiven Abhängigkeit **`werkzeug` 3.1.1** drei `safe_join` Windows-Gerätename DoS-Warnungen — `CVE-2025-66221`, `CVE-2026-21860` und `CVE-2026-27199` (alle in 3.1.6 behoben). Einen expliziten Sicherheitspin `werkzeug>=3.1.6` hinzugefügt, damit die gepatchte Version aufgelöst wird; validiert, dass die Einschränkung mit dem `chainlit` / `mcp` / `semantic-kernel` Stack sauber aufgelöst wird

### Umbenennung des Produktnamens

Alle Curriculuminhalte wurden aktualisiert, um die Umbenennung von Microsofts Produkt widerzuspiegeln:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord Community-Link aktualisiert
- **AGENTS.md**: Discord Server-Verweis aktualisiert
- **README.md**: Verweise auf Technologie-Ökosystem aktualisiert
- **study_guide.md**: Verweise in der Fallstudie aktualisiert
- **05-AdvancedTopics/README.md**: Titel und Beschreibung von Modul 5.13 aktualisiert
- **05-AdvancedTopics/mcp-integration/README.md**: Abschnittsüberschrift und Beschreibung aktualisiert
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Gesamter Modul-Titel und Inhalt aktualisiert
- **05-AdvancedTopics/mcp-security-entra/README.md**: Querverweis-Link aktualisiert
- **07-LessonsfromEarlyAdoption/README.md**: Verweise in der Fallstudie aktualisiert
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Abschnitt 9 Überschrift, Abzeichen und Funktionen aktualisiert
- **08-BestPractices/README.md**: Discord Community-Link aktualisiert
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord-Kanal-Verweis aktualisiert
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Verweis zum Modell-Deployment aktualisiert
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI Services Tabelle aktualisiert
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Ressourcenverweise aktualisiert

#### AI Toolkit / AITK → Microsoft Foundry Toolkit-Erweiterung für VS Code

- **README.md**: Aktualisierte Hauptcurriculum-Verweise
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aktualisierter Modultitel, Übersicht und alle Modulüberschriften
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aktualisierter Titel, Lernziele, Einrichtungshinweise und Ressourcen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aktualisierter Titel, Lernziele, MCP Hosts Tabelle und Querverweise
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aktualisierter Titel, Abzeichen, Voraussetzungen und Ressourcen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aktualisierte Agent Builder Verweise und Feedback-Link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aktualisierte Voraussetzungen und Erweiterungsreferenzen

---

## 11. April 2026

### Neue Lektion, Dokumentationskorrekturen und Abhängigkeitsupdates

#### Neue Curriculum-Inhalte hinzugefügt

**Modul 05 - Erweiterte Themen**
- **Lektion 5.17: Adversariales Multi-Agenten-Denken mit MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Neuer umfassender Leitfaden zum adversarialen Debattenmuster für Multi-Agenten-Systeme
  - Mermaid Architekturdiagramm: zwei Agenten → gemeinsamer MCP-Server → Debattenprotokoll → Richter → Urteil
  - Gemeinsamer MCP-Tool-Server (`web_search` + `run_python`) in Python und TypeScript implementiert
  - Gegensätzliche System-Prompts (FÜR / GEGEN / Richter) mit expliziten Werkzeugnutzungsanforderungen
  - Debatten-Orchestrator in Python, TypeScript und C# verwaltet Runden und argumentiert Routing
  - MCP `ClientSession` Vernetzung für Orchestrator mit echten Werkzeugaufrufen
  - Anwendungsfalltabelle (Halluzinations-Erkennung, Bedrohungsmodellierung, API-Design-Review, Faktenprüfung, Technik-Auswahl)
  - Sicherheitsüberlegungen: Sandbox-Ausführung, Werkzeugaufrufvalidierung, Ratenbegrenzung, Audit-Logging
  - Strukturierte Übung mit drei praktischen Szenarien (Code-Review, Architekturentscheidung, Inhaltsmoderation)

#### Dokumentationskorrekturen

**Modul 03 - Erste Schritte**
- **05-stdio-server/README.md**: Behebung unvollständiges TypeScript-stdio-Server-Beispiel — fehlende Transport-Instanziierung (`new StdioServerTransport()`) und `server.connect(transport)` Aufruf hinzugefügt, um den Python- und .NET-Beispielen im selben Abschnitt zu entsprechen
- **14-sampling/README.md**: Tippfehler behoben — korrigiert `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Curriculum-Aktualisierungen

**Haupt-README.md**
- Eintrag 5.17 (Adversariales Multi-Agenten-Denken mit MCP) in die Curriculums-Tabelle mit Direktlink zur neuen Lektion hinzugefügt

**05-AdvancedTopics/README.md**
- Lektion 5.17 Zeile zur Lektionentabelle hinzugefügt

**study_guide.md**
- Thema Adversariales Multi-Agenten-Denken zum Mindmap und zur ausführlichen Beschreibung von Advanced Topics hinzugefügt

#### Code- und Sicherheitskorrekturen

**Modul 05 - Adversariale Agenten (`mcp-adversarial-agents`)**
- **Sicherheitsfix — Befehlsinjektion**: Ersetzte `execSync` Shell-Interpolation durch `execFile` + `promisify` im TypeScript-`run_python` Werkzeug, wodurch die Angriffsfläche für Befehlsinjektion entfällt (LLM-gesteuerter Code wird nun als Literal-argv-Element ohne Shell-Beteiligung übergeben)
- **MCP Werkzeug-Schleifenverkabelung**: Aktualisierte den Python-Debatten-Orchestrator zur Nutzung des `AsyncAnthropic` Clients (ersetzt blockierenden Sync `Anthropic`), Übergabe einer Live-`ClientSession` direkt an jede Agentenrunde, Abruf der Werkzeugdefinitionen via `session.list_tools()` in jeder Runde und Versand von `tool_use` Blöcken via `session.call_tool()` in einer Schleife, bis das Modell eine finale Textantwort sendet

#### Abhängigkeitsupdates

- `hono` auf Version 4.12.12 in mehreren Paketen erhöht (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- `@hono/node-server` von 1.19.11 auf 1.19.13 in TypeScript-Paketen erhöht
- `cryptography` von 46.0.5 auf 46.0.7 in den Python-Paketen erhöht (10-StreamliningAIWorkflows Labs 3 und 4)
- `lodash` von 4.17.23 auf 4.18.1 im 10-StreamliningAIWorkflows Inspector aktualisiert

#### Übersetzungen

- Übersetzungen für 48+ Sprachen mit den neuesten Quelländerungen synchronisiert (i18n-Update)

---

## 5. Februar 2026

### Repository-übergreifende Validierungs- und Navigationsverbesserungen

#### Neue Curriculum-Inhalte hinzugefügt

**Modul 03 - Erste Schritte**
- **12-mcp-hosts/README.md**: Neuer umfassender Leitfaden zur Einrichtung von MCP Hosts
  - Konfigurationsbeispiele für Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-Konfigurationstemplates für alle wichtigen Hosts
  - Vergleichstabelle der Transporttypen (stdio, SSE/HTTP, WebSocket)
  - Fehlerbehebung bei häufigen Verbindungsproblemen
  - Sicherheitsbest Practices für Host-Konfiguration

- **13-mcp-inspector/README.md**: Neuer Debugging-Leitfaden für MCP Inspector
  - Installationsmethoden (npx, npm global, aus dem Quellcode)
  - Verbindung zu Servern über stdio und HTTP/SSE
  - Testwerkzeuge, Ressourcen und Prompt-Workflows
  - VS Code-Integration mit MCP Inspector
  - Übliche Debugging-Szenarien mit Lösungen

**Modul 04 - Praktische Umsetzung**
- **pagination/README.md**: Neuer Leitfaden zur Paginierungsimplementierung
  - Cursor-basierte Paginierungsmuster in Python, TypeScript, Java
  - Clientseitige Paginierungsbehandlung
  - Cursor-Designstrategien (opaque vs. strukturiert)
  - Empfehlungen zur Leistungsoptimierung

**Modul 05 - Erweiterte Themen**
- **mcp-protocol-features/README.md**: Neue detaillierte Beschreibung der Protokollfunktionen
  - Implementierung von Fortschrittsbenachrichtigungen
  - Muster zur Anfragestornierung
  - Ressourcentemplates mit URI-Mustern
  - Server-Lifecycle-Management
  - Steuerung des Protokollierungslevels
  - Fehlerbehandlungsmuster mit JSON-RPC-Codes

#### Navigationskorrekturen (24+ Dateien aktualisiert)

**Hauptmodul-READMEs**
 Nun Verlinkungen sowohl zur ersten Lektion ALS AUCH zum nächsten Modul

**02-Security Unterdateien**
- Alle 5 ergänzenden Sicherheitsdokumente verfügen jetzt über "Was kommt als Nächstes"-Navigation:

**09-CaseStudy Dateien**
- Alle Case-Study-Dateien haben jetzt sequentielle Navigation:

**10-StreamliningAI Labs**
"Was kommt als Nächstes" Abschnitt im Überblick von Modul 10 und Modul 11 hinzugefügt

#### Code- und Inhaltskorrekturen

**SDK- und Abhängigkeitsupdates**
Leere openai-Version auf `^4.95.0` festgelegt
SDK von `^1.8.0` auf `>=1.26.0` aktualisiert
MCP-Versions-Pins auf `>=1.26.0` aktualisiert

**Codekorrekturen**
Ungültiges Modell `gpt-4o-mini` auf `gpt-4.1-mini` korrigiert

**Inhaltskorrekturen**
Defekten Link `READMEmd` → `README.md` behoben, Curriculumsüberschrift `Module 1-3` → `Module 0-3` korrigiert, Groß-/Kleinschreibung des Pfads angepasst
Beschädigten doppelten Case Study 5 Inhalt entfernt

**Verbesserungen für Einsteigeranleitung**
Einführung, Lernziele und Voraussetzungen für Anfänger ordnungsgemäß ergänzt

#### Curriculum-Aktualisierungen

**Haupt-README.md**
- Einträge 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) zur Curriculums-Tabelle hinzugefügt

**Modul-READMEs**
Lektionen 12 und 13 zur Lektionenliste hinzugefügt
Abschnitt Praktische Leitfäden mit Paginierungslink hinzugefügt
Lektionen 5.15 (Custom Transport) und 5.16 (Protocol Features) hinzugefügt

**study_guide.md**
- Mindmap um alle neuen Themen aktualisiert: Einrichtung MCP Hosts, MCP Inspector, Paginierungsstrategien, Protokollfunktionen im Detail

## 28. Januar 2026

### MCP Spezifikation 2025-11-25 Konformitätsprüfung

#### Kernkonzepte-Verbesserung (01-CoreConcepts/)
- **Neues Client-Primitive - Roots**: Umfassende Dokumentation zum Roots Client-Primitive hinzugefügt, das Servern ermöglicht, Dateisystemgrenzen und Zugriffsrechte zu verstehen
- **Werkzeugannotationen**: Dokumentation zu Werkzeug-Verhaltensannotationen (`readOnlyHint`, `destructiveHint`) für bessere Werkzeugausführungsentscheidungen hinzugefügt
- **Werkzeugaufruf im Sampling**: Sampling-Dokumentation zur Aufnahme von `tools` und `toolChoice` Parametern für modellgesteuerte Werkzeugaufrufe bei Sampling-Anfragen aktualisiert
- **URL-Modus-Auslösung**: Dokumentation zur URL-basierten Auslösung für serverinitiierte externe Webinteraktionen hinzugefügt
- **Tasks (Experimentell)**: Neuer Abschnitt zur Dokumentation der experimentellen Tasks-Funktion für dauerhafte Ausführungshüllen und verzögerte Ergebnisabfrage hinzugefügt
- **Icons Support**: Vermerkt, dass Werkzeuge, Ressourcen, Ressourcentemplates und Prompts nun Icons als zusätzliche Metadaten enthalten können

#### Dokumentationsupdates
- **README.md**: MCP Spezifikation 2025-11-25 Versionsreferenz und datumsbasierte Versionierungserklärung hinzugefügt
- **study_guide.md**: Curriculum-Karte aktualisiert, um Tasks und Tool Annotationen im Abschnitt Kernkonzepte einzuschließen; Dokument-Zeitstempel aktualisiert

#### Spezifikationskonformität-Verifikation
- **Protokollversion**: Alle Dokumentationsreferenzen auf aktuelle MCP Spezifikation 2025-11-25 überprüft
- **Architekturausrichtung**: Zwei-Schicht-Architektur (Datenebene + Transporteebene) Dokumentationsgenauigkeit bestätigt
- **Primitives Dokumentation**: Server-Primitives (Ressourcen, Prompts, Werkzeuge) und Client-Primitives (Sampling, Auslösung, Logging, Roots) validiert
- **Transportmechanismen**: STDIO- und Streamable HTTP-Transportdokumentation überprüft
- **Sicherheitsanleitungen**: Übereinstimmung mit aktuellen MCP Sicherheits-Best-Practices bestätigt

#### Wesentliche MCP 2025-11-25 Features dokumentiert
- **OpenID Connect Discovery**: Auth-Server-Erkennung über OIDC
- **OAuth Client ID Metadatendokumente**: Empfohlenes Client-Registrierungsverfahren
- **JSON Schema 2020-12**: Standarddialekt für MCP Schema-Definitionen
- **SDK Stufen-System**: Formalisierte Anforderungen an SDK Feature-Support und Wartung
- **Governance-Struktur**: Formalisierte Arbeitsgruppen und Interessengruppen in MCP Governance

### Große Aktualisierung der Sicherheitsdokumentation (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Integration
- **Neue Hands-On Trainingsressource**: Umfassende Integration mit dem [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) in allen Sicherheitsdokumenten hinzugefügt
- **Expeditionsstrecken-Abdeckung**: Kompletten Camp-zu-Camp Fortschritt vom Basislager bis zum Gipfel dokumentiert
- **OWASP Ausrichtung**: Alle Sicherheitsanleitungen jetzt auf OWASP MCP Azure Security Guide Risiken abgestimmt

#### OWASP MCP Top 10 Integration
- **Neuer Abschnitt**: OWASP MCP Top 10 Sicherheitsrisiken-Tabelle mit Azure-Minderungsmaßnahmen zur Hauptsicherheits-README hinzugefügt
- **Risiko-basierte Dokumentation**: mcp-security-controls-2025.md mit OWASP MCP Risiko-Referenzen für jeden Sicherheitsbereich aktualisiert
- **Referenzarchitektur**: Verknüpfung zur OWASP MCP Azure Security Guide Referenzarchitektur und Implementierungsmustern

#### Aktualisierte Sicherheitsdateien
- **README.md**: Übersicht des Sherpa Workshops, Expeditionsrouten-Tabelle, Übersicht OWASP MCP Top 10 Risiken und Hands-On Trainingsabschnitt hinzugefügt
- **mcp-security-controls-2025.md**: Kopfzeile auf Februar 2026 aktualisiert, OWASP Risiko-Referenzen (MCP01-MCP08) hinzugefügt, Inkonsistenz der Spezifikationsversion behoben
- **mcp-security-best-practices-2025.md**: Sherpa- und OWASP-Ressourcenabschnitt hinzugefügt, Zeitstempel aktualisiert
- **mcp-best-practices.md**: Hands-On Trainingsabschnitt mit Sherpa- und OWASP-Links ergänzt
- **azure-content-safety-implementation.md**: OWASP MCP06 Referenz, Sherpa Camp 3 Ausrichtung und zusätzlichen Ressourcenabschnitt hinzugefügt

#### Neue Ressourcen-Links hinzugefügt
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuelle OWASP MCP Risiko-Seiten (MCP01-MCP10)

### Curriculum-weite MCP Spezifikation 2025-11-25 Ausrichtung

#### Modul 03 - Erste Schritte
- **SDK Dokumentation**: Go SDK in die offizielle SDK-Liste aufgenommen; alle SDK-Referenzen an MCP Spezifikation 2025-11-25 angepasst
- **Transport-Klarstellung**: STDIO- und HTTP Streaming Transportbeschreibungen mit expliziten Spezifikationsverweisen aktualisiert

#### Modul 04 - Praktische Umsetzung
- **SDK Updates**: Go SDK hinzugefügt; SDK-Liste mit Spezifikationsversionsverweis aktualisiert
- **Autorisierungsspezifikation**: MCP Autorisierungsspezifikation Link auf aktuelle Version 2025-11-25 aktualisiert

#### Modul 05 - Erweiterte Themen
- **Neue Funktionen**: Hinweis auf neue MCP Spezifikation 2025-11-25 Features (Tasks, Tool Annotations, URL Mode Elicitation, Roots) hinzugefügt
- **Sicherheitsressourcen**: OWASP MCP Top 10 und Sherpa Workshop Links zu zusätzlichen Referenzen hinzugefügt

#### Modul 06 - Community-Beiträge
- **SDK Liste**: Swift und Rust SDKs hinzugefügt; Spezifikationslink auf 2025-11-25 aktualisiert
- **Spezifikationsreferenz**: MCP Spezifikation Link auf direkte Spezifikations-URL aktualisiert

#### Modul 07 - Lektionen aus der frühen Einführung

- **Ressourcen-Aktualisierungen**: Hinzugefügt MCP Spezifikation 2025-11-25 Link und OWASP MCP Top 10 zu zusätzlichen Ressourcen

#### Modul 08 - Best Practices
- **Spec Version**: Aktualisierte MCP Spezifikation Referenz auf 2025-11-25
- **Sicherheitsressourcen**: Hinzugefügt OWASP MCP Top 10 und Sherpa Workshop zu zusätzlichen Verweisen

#### Modul 10 - Optimierung von KI-Workflows
- **Abzeichen-Aktualisierung**: MCP Versions-Abzeichen von SDK-Version (1.9.3) auf Spezifikationsversion (2025-11-25) geändert
- **Ressourcennlinks**: Aktualisiert MCP Spezifikation Link; Hinzugefügt OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Spec Referenz**: Aktualisiert MCP Spezifikation Link auf Version 2025-11-25
- **Sicherheitsressourcen**: Hinzugefügt OWASP MCP Top 10 zu offiziellen Ressourcen

## 18. Dezember 2025

### Sicherheitsdokumentation Aktualisierung - MCP Spezifikation 2025-11-25

#### MCP Sicherheits-Best Practices (02-Security/mcp-best-practices.md) - Versionsupdate Spezifikation
- **Protokollversions-Update**: Aktualisiert auf Verweis der neuesten MCP Spezifikation 2025-11-25 (veröffentlicht am 25. November 2025)
  - Alle Spezifikationsversionsverweise von 2025-06-18 auf 2025-11-25 aktualisiert
  - Dokumentdatumsverweise von 18. August 2025 auf 18. Dezember 2025 aktualisiert
  - Alle Spezifikations-URLs weisen auf aktuelle Dokumentation
- **Inhaltsvalidierung**: Umfassende Validierung der Sicherheits-Best-Practices gegenüber den neuesten Standards
  - **Microsoft Sicherheitslösungen**: Überprüft aktuelle Terminologie und Links für Prompt Shields (früher "Jailbreak Risikoerkennung"), Azure Content Safety, Microsoft Entra ID und Azure Key Vault
  - **OAuth 2.1 Sicherheit**: Bestätigung der Übereinstimmung mit den neuesten OAuth Sicherheits-Best Practices
  - **OWASP Standards**: Validierung, dass OWASP Top 10 für LLMs Verweise aktuell bleiben
  - **Azure Dienste**: Überprüft alle Microsoft Azure Dokumentationslinks und Best Practices
- **Standard-Übereinstimmung**: Alle referenzierten Sicherheitsstandards wurden als aktuell bestätigt
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure Sicherheits- und Compliance-Frameworks
- **Implementierungsressourcen**: Validierte alle Implementierungsleitfaden-Links und Ressourcen
  - Azure API Management Authentifizierungsmuster
  - Microsoft Entra ID Integrationsanleitungen
  - Azure Key Vault Geheimnisverwaltung
  - DevSecOps Pipelines und Überwachungslösungen

### Dokumentations-Qualitätssicherung
- **Spezifikations-Compliance**: Sicherstellung, dass alle obligatorischen MCP Sicherheitsanforderungen (MUSS/MUSS NICHT) mit der neuesten Spezifikation übereinstimmen
- **Ressourcen-Aktualität**: Überprüfung aller externen Links zu Microsoft-Dokumentation, Sicherheitsstandards und Implementierungsleitfäden
- **Abdeckung Best Practices**: Bestätigung umfassender Abdeckung von Authentifizierung, Autorisierung, KI-spezifischen Bedrohungen, Lieferkettensicherheit und Enterprise-Mustern

## 6. Oktober 2025

### Erweiterung des Getting Started Abschnitts – Erweiterte Servernutzung & Einfache Authentifizierung

#### Erweiterte Servernutzung (03-GettingStarted/10-advanced)
- **Neues Kapitel hinzugefügt**: Einführung eines umfassenden Leitfadens zur erweiterten Nutzung des MCP Servers, inklusive regulärer und Low-Level Server-Architekturen.
  - **Regulärer vs. Low-Level Server**: Detaillierter Vergleich und Codebeispiele in Python und TypeScript für beide Ansätze.
  - **Handler-basierte Gestaltung**: Erklärung der handlerbasierten Werkzeug-/Ressourcen-/Prompt-Verwaltung für skalierbare und flexible Serverimplementierungen.
  - **Praktische Muster**: Anwendungsfälle in der Praxis, bei denen Low-Level Server Muster vorteilhaft für erweiterte Funktionen und Architektur sind.

#### Einfache Authentifizierung (03-GettingStarted/11-simple-auth)
- **Neues Kapitel hinzugefügt**: Schritt-für-Schritt-Anleitung zur Implementierung einfacher Authentifizierung in MCP Servern.
  - **Auth-Konzepte**: Klare Erläuterung von Authentifizierung vs. Autorisierung und Umgang mit Zugangsdaten.
  - **Grundlegende Auth-Implementierung**: Middleware-basierte Authentifizierungs-Muster in Python (Starlette) und TypeScript (Express) mit Codebeispielen.
  - **Weiterentwicklung zu erweiterter Sicherheit**: Anleitung vom einfachen Auth bis zu OAuth 2.1 und RBAC, mit Verweisen auf erweiterte Sicherheitsmodule.

Diese Ergänzungen bieten praktische, praxisnahe Anleitungen zur Erstellung robuster, sicherer und flexibler MCP-Server-Implementierungen und verbinden Grundlagenkonzepte mit fortgeschrittenen Produktionsmustern.

## 29. September 2025

### MCP Server Datenbank-Integrations-Labs - Umfassender Hands-On Lernpfad

#### 11-MCPServerHandsOnLabs - Neuer kompletter Lehrplan zur Datenbankintegration
- **Vollständiger 13-Lab Lernpfad**: Umfassender Hands-On-Lehrplan zum Aufbau produktionsreifer MCP Server mit PostgreSQL Datenbankintegration
  - **Praxisbeispiel**: Zava Retail Analytics Use Case mit Enterprise-Mustern
  - **Strukturierte Lernprogression**:
    - **Labs 00-03: Grundlagen** - Einführung, Kernarchitektur, Sicherheit & Multi-Tenancy, Umgebungseinrichtung
    - **Labs 04-06: Aufbau des MCP Servers** - Datenbankdesign & Schema, MCP Server Implementierung, Werkzeugentwicklung  
    - **Labs 07-09: Erweiterte Funktionen** - Semantische Suchintegration, Testen & Debugging, VS Code Integration
    - **Labs 10-12: Produktion & Best Practices** - Bereitstellungsstrategien, Monitoring & Beobachtbarkeit, Best Practices & Optimierung
  - **Enterprise-Technologien**: FastMCP Framework, PostgreSQL mit pgvector, Azure OpenAI Embeddings, Azure Container Apps, Application Insights
  - **Erweiterte Funktionen**: Row Level Security (RLS), semantische Suche, Mehrmandantenfähigkeit im Datenzugriff, Vektor-Embeddings, Echtzeit-Monitoring

#### Terminologie-Standardisierung - Umstellung von Modul auf Lab
- **Umfassendes Dokumentationsupdate**: Systematische Aktualisierung aller README-Dateien in 11-MCPServerHandsOnLabs, um „Lab“-Terminologie statt „Modul“ zu verwenden
  - **Abschnittsüberschriften**: „Was dieses Modul abdeckt“ zu „Was dieses Lab abdeckt“ bei allen 13 Labs geändert
  - **Inhaltsbeschreibung**: „Dieses Modul stellt bereit...“ zu „Dieses Lab stellt bereit...“ im gesamten Dokument geändert
  - **Lernziele**: „Am Ende dieses Moduls...“ zu „Am Ende dieses Labs...“ aktualisiert
  - **Navigationsverweise**: Alle „Modul XX:“ Verweise zu „Lab XX:“ in Querverweisen und Navigation geändert
  - **Abschlussverfolgung**: „Nach Abschluss dieses Moduls...“ zu „Nach Abschluss dieses Labs...“ aktualisiert
  - **Technische Verweise erhalten**: Python-Modulverweise in Konfigurationsdateien beibehalten (z. B. `"module": "mcp_server.main"`)

#### Studienleitfaden-Verbesserung (study_guide.md)
- **Visuelle Lehrplanübersicht**: Neuer Abschnitt „11. Datenbank-Integrations-Labs“ mit umfassender Lab-Strukturvisualisierung hinzugefügt
- **Repository-Struktur**: Von zehn auf elf Hauptabschnitte mit detailreicher Beschreibung von 11-MCPServerHandsOnLabs aktualisiert
- **Lernpfadführung**: Navigationserklärungen erweitert, um Abschnitte 00-11 abzudecken
- **Technologieabdeckung**: FastMCP, PostgreSQL, Azure-Dienste Integrationsdetails hinzugefügt
- **Lernergebnisse**: Betonung produktionsreifer Serverentwicklung, Muster der Datenbankintegration und Enterprise-Sicherheit

#### Haupt-README Strukturverbesserung
- **Lab-basierte Terminologie**: Haupt-README.md in 11-MCPServerHandsOnLabs für einheitliche Verwendung der Lab-Struktur aktualisiert
- **Lernpfad-Organisation**: Klarer Fortschritt von Grundlagen über fortgeschrittene Implementierung bis Deployment in die Produktion
- **Praxisfokus**: Betonung praxisnahes Lernen mit Enterprise-Mustern und Technologien

### Verbesserungen der Dokumentationsqualität & Konsistenz
- **Hands-On Lernansatz**: Praktischer, Lab-basierter Ansatz in der gesamten Dokumentation verstärkt
- **Enterprise-Musterfokus**: Betonung produktionsreifer Implementierungen und Enterprise-Sicherheitsaspekte
- **Technologieintegration**: Umfassende Abdeckung moderner Azure-Dienste und KI-Integrationsmuster
- **Lernprogression**: Klar strukturierter Pfad von Grundkonzepten bis hin zu produktionsreifem Deployment

## 26. September 2025

### Case Studies Erweiterung - GitHub MCP Registry Integration

#### Case Studies (09-CaseStudy/) - Fokus auf Ökosystem-Entwicklung
- **README.md**: Umfangreiche Erweiterung mit ausführlicher GitHub MCP Registry Case Study
  - **GitHub MCP Registry Case Study**: Neue umfassende Fallstudie zur Einführung der GitHub MCP Registry im September 2025
    - **Problemanalyse**: Detaillierte Untersuchung fragmentierter MCP Server Erkennung und Bereitstellungsprobleme
    - **Lösungsarchitektur**: GitHub’s zentrales Registry-Konzept mit One-Click VS Code Installation
    - **Geschäftlicher Einfluss**: Messbare Verbesserungen bei Developer Onboarding und Produktivität
    - **Strategischer Wert**: Fokus auf modulare Agentenbereitstellung und Werkzeugintegration
    - **Ökosystem-Entwicklung**: Positionierung als grundlegende Plattform für agentische Integration
  - **Verbesserte Fallstudienstruktur**: Alle sieben Case Studies mit einheitlichem Format und umfassenden Beschreibungen aktualisiert
    - Azure AI Travel Agents: Multi-Agenten-Orchestrierungs-Schwerpunkt
    - Azure DevOps Integration: Workflow-Automatisierungsschwerpunkt
    - Echtzeit-Dokumentenabruf: Python Konsolen-Client Umsetzung
    - Interaktiver Studienplan-Generator: Chainlit Konversations-Web-App
    - Dokumentation im Editor: VS Code und GitHub Copilot Integration
    - Azure API Management: Unternehmens-API-Integrationsmuster
    - GitHub MCP Registry: Ökosystementwicklung und Community-Plattform
  - **Umfassendes Fazit**: Überarbeiteter Abschnitt zur Zusammenfassung der sieben Fallstudien mit mehreren MCP Implementierungsdimensionen
    - Enterprise Integration, Multi-Agenten-Orchestrierung, Entwicklerproduktivität
    - Ökosystementwicklung, Bildungsanwendungen Kategorisierung
    - Verbessertes Verständnis architektonischer Muster, Implementierungsstrategien und Best Practices
    - Betonung von MCP als ausgereiftes, produktionsbereites Protokoll

#### Studienleitfaden-Updates (study_guide.md)
- **Visualisierte Lehrplanübersicht**: Mindmap mit Aufnahme der GitHub MCP Registry im Bereich Case Studies aktualisiert
- **Fallstudienbeschreibung**: Von generischen Beschreibungen zu detaillierter Aufschlüsselung der sieben umfassenden Fallstudien erweitert
- **Repository-Struktur**: Abschnitt 10 zur vollständigen Case Study Abdeckung mit spezifischen Implementierungsdetails aktualisiert
- **Changelog-Integration**: Eintrag vom 26. September 2025 mit GitHub MCP Registry Aufnahme und Case Study Erweiterungen hinzugefügt
- **Datumsaktualisierung**: Fußzeile zeitgestempelt auf letzte Revision (26. September 2025) aktualisiert

### Verbesserungen der Dokumentationsqualität
- **Konsistenzsteigerung**: Einheitliche Formatierung und Struktur aller sieben Fallstudien
- **Umfassende Abdeckung**: Fallstudien umfassen jetzt Enterprise-, Produktivitäts- und Ökoszenarioentwicklungen
- **Strategische Positionierung**: Verstärkter Fokus auf MCP als grundlegende Plattform für agentische Systembereitstellung
- **Ressourcenintegration**: Zusätzliche Ressourcen um GitHub MCP Registry Link erweitert

## 15. September 2025

### Erweiterung fortgeschrittener Themen - Benutzerdefinierte Transports & Kontext-Engineering

#### MCP Benutzerdefinierte Transports (05-AdvancedTopics/mcp-transport/) - Neuer fortgeschrittener Implementierungsleitfaden
- **README.md**: Vollständiger Implementierungsleitfaden für benutzerdefinierte MCP Transportmechanismen
  - **Azure Event Grid Transport**: Umfassende serverlose, ereignisgesteuerte Transportimplementierung
    - Beispiele in C#, TypeScript und Python mit Azure Functions Integration
    - Ereignisgesteuerte Architektur-Muster für skalierbare MCP-Lösungen
    - Webhook-Empfänger und push-basierte Nachrichtenverarbeitung
  - **Azure Event Hubs Transport**: Hochdurchsatz-Streaming-Transport-Implementierung
    - Echtzeit-Streaming-Fähigkeiten für latenzarme Szenarien
    - Partitionierungsstrategien und Checkpoint-Verwaltung
    - Nachrichtenbündelung und Leistungsoptimierung
  - **Enterprise-Integrationsmuster**: Produktionsreife architektonische Beispiele
    - Verteilte MCP Verarbeitung über mehrere Azure Functions
    - Hybride Transportarchitekturen mit Kombination mehrerer Transporttypen
    - Nachrichtendauerhaftigkeit, Zuverlässigkeit und Fehlerbehandlungsstrategien
  - **Sicherheit & Überwachung**: Azure Key Vault Integration und Observability-Muster
    - Authentifizierung mit Managed Identity und Prinzip der geringsten Rechte
    - Application Insights Telemetrie und Leistungsüberwachung
    - Circuit Breaker und Fehlertoleranzmuster
  - **Testframeworks**: Umfassende Teststrategien für benutzerdefinierte Transports
    - Unit Tests mit Test-Doubles und Mocking-Frameworks
    - Integrationstests mit Azure Test Containers
    - Leistungs- und Lasttests Überlegungen

#### Kontext-Engineering (05-AdvancedTopics/mcp-contextengineering/) - Aufstrebendes KI-Disziplin
- **README.md**: Umfassende Erkundung von Kontext-Engineering als aufstrebendes Fachgebiet
  - **Kernprinzipien**: Vollständiges Kontextteilen, Bewusstsein für Aktionsentscheidungen und Kontextfensterverwaltung
  - **MCP Protokoll-Alignment**: Wie das MCP Design Herausforderungen des Kontext-Engineerings adressiert
    - Grenzen des Kontextfensters und progressive Ladestrategien
    - Relevanzbestimmung und dynamisches Kontextabruf
    - Multimodale Kontextverarbeitung und Sicherheitsaspekte
  - **Implementierungsansätze**: Einfädige vs. Multi-Agenten-Architekturen
    - Kontext-Segmentierung und Priorisierungstechniken
    - Progressives Laden und Komprimierungsstrategien für Kontext
    - Geschichtete Kontextansätze und Abrufoptimierung
  - **Messframework**: Neue Metriken zur Bewertung der Kontextwirksamkeit
    - Eingabeeffizienz, Leistung, Qualität und Nutzererfahrungsaspekte
    - Experimentelle Ansätze zur Kontextoptimierung
    - Fehleranalyse und Verbesserungsmethoden

#### Aktualisierungen der Lehrplannavigation (README.md)
- **Verbesserte Modulstruktur**: Lehrplantabelle aktualisiert für neue fortgeschrittene Themen
  - Hinzugefügt Kontext-Engineering (5.14) und Benutzerdefinierter Transport (5.15)
  - Einheitliches Format und Navigationslinks über alle Module
  - Beschreibungen wurden angepasst, um aktuellen Inhaltsumfang widerzuspiegeln

### Verbesserungen der Verzeichnisstruktur
- **Namensstandardisierung**: „mcp transport“ zu „mcp-transport“ umbenannt für Konsistenz mit anderen Advanced Topics Ordnern
- **Inhaltsorganisation**: Alle 05-AdvancedTopics Ordner folgen nun einem konsistenten Namensmuster (mcp-[thema])

### Verbesserungen der Dokumentationsqualität
- **MCP Spezifikations-Alignment**: Alle neuen Inhalte verweisen auf aktuelle MCP Spezifikation 2025-06-18
- **Beispiele in mehreren Sprachen**: Umfassende Codebeispiele in C#, TypeScript und Python

- **Unternehmensfokus**: Produktionsreife Muster und Azure-Cloud-Integration durchgängig
- **Visuelle Dokumentation**: Mermaid-Diagramme für Architektur- und Ablaufvisualisierung

## 18. August 2025

### Umfassendes Dokumentationsupdate - MCP 2025-06-18 Standards

#### MCP Sicherheits-Best-Practices (02-Security/) - Vollständige Modernisierung
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Komplette Neufassung gemäß MCP-Spezifikation 2025-06-18
  - **Verpflichtende Anforderungen**: Hinzufügen expliziter MUSS / DARF NICHT Anforderungen aus der offiziellen Spezifikation mit klaren visuellen Markierungen
  - **12 Kern-Sicherheitspraktiken**: Umstrukturierung von 15-Punkte-Liste zu umfassenden Sicherheitsdomänen
    - Token-Sicherheit & Authentifizierung mit Integration externer Identitätsanbieter
    - Sitzungsmanagement & Transportsicherheit mit kryptografischen Anforderungen
    - KI-spezifischer Bedrohungsschutz mit Microsoft Prompt Shields-Integration
    - Zugriffskontrolle & Berechtigungen mit dem Prinzip der geringsten Rechte
    - Inhalts-Sicherheit & Überwachung mit Azure Content Safety Integration
    - Lieferkettensicherheit mit umfassender Komponentenverifikation
    - OAuth-Sicherheit & Confused Deputy-Verhinderung mit PKCE-Implementierung
    - Vorfallreaktion & Wiederherstellung mit automatisierten Fähigkeiten
    - Compliance & Governance mit regulatorischer Ausrichtung
    - Erweiterte Sicherheitskontrollen mit Zero-Trust-Architektur
    - Microsoft Sicherheits-Ökosystem Integration mit umfassenden Lösungen
    - Kontinuierliche Sicherheitsevolution mit adaptiven Praktiken
  - **Microsoft Sicherheitslösungen**: Verbesserte Integrationsanweisungen für Prompt Shields, Azure Content Safety, Entra ID und GitHub Advanced Security
  - **Umsetzungsressourcen**: Kategorisierte umfassende Ressourcenlinks nach offizieller MCP-Dokumentation, Microsoft Sicherheitslösungen, Sicherheitsstandards und Implementierungsanleitungen

#### Erweiterte Sicherheitskontrollen (02-Security/) - Unternehmensimplementierung
- **MCP-SECURITY-CONTROLS-2025.md**: Vollständige Überarbeitung mit unternehmensgerechtem Sicherheitsrahmen
  - **9 Umfassende Sicherheitsdomänen**: Erweiterung von Basis-Kontrollen zu detailliertem Unternehmensrahmen
    - Erweiterte Authentifizierung & Autorisierung mit Microsoft Entra ID-Integration
    - Token-Sicherheit & Anti-Passthrough-Kontrollen mit umfassender Validierung
    - Sitzungs-Sicherheitskontrollen mit Hijacking-Prävention
    - KI-spezifische Sicherheitskontrollen mit Prompt Injection und Tool Poisoning-Prävention
    - Confused Deputy Angriffsprävention mit OAuth Proxy-Sicherheit
    - Tool-Ausführungs-Sicherheit mit Sandboxing und Isolation
    - Lieferkettensicherheitskontrollen mit Abhängigkeitsprüfung
    - Überwachungs- & Erkennungskontrollen mit SIEM-Integration
    - Vorfallreaktion & Wiederherstellung mit automatisierten Funktionen
  - **Implementierungsbeispiele**: Hinzufügung detaillierter YAML-Konfigurationsblöcke und Codebeispiele
  - **Microsoft Lösungsintegration**: Umfassende Abdeckung von Azure-Sicherheitsdiensten, GitHub Advanced Security und Unternehmens-Identitätsmanagement

#### Erweiterte Sicherheitsthemen (05-AdvancedTopics/mcp-security/) - Produktionsreife Implementierung
- **README.md**: Komplette Neufassung für Unternehmenssicherheitsimplementierung
  - **Aktuelle Spezifikationsausrichtung**: Aktualisiert auf MCP-Spezifikation 2025-06-18 mit verpflichtenden Sicherheitsanforderungen
  - **Erweiterte Authentifizierung**: Microsoft Entra ID-Integration mit umfassenden .NET- und Java Spring Security-Beispielen
  - **KI-Sicherheitsintegration**: Microsoft Prompt Shields und Azure Content Safety Implementierung mit detaillierten Python-Beispielen
  - **Erweiterte Bedrohungsminderung**: Umfassende Implementierungsbeispiele für
    - Confused Deputy-Angriffsprävention mit PKCE und Benutzerzustimmungsvalidierung
    - Token-Passthrough-Prävention mit Audience-Validierung und sicherem Token-Management
    - Sitzungs-Hijacking-Prävention mit kryptografischer Bindung und Verhaltensanalyse
  - **Unternehmenssicherheitsintegration**: Azure Application Insights-Monitoring, Bedrohungserkennungs-Pipelines und Lieferkettensicherheit
  - **Implementierungs-Checkliste**: Klare Trennung verpflichtender und empfohlener Sicherheitskontrollen mit Vorteilen des Microsoft-Sicherheitsökosystems

### Dokumentationsqualität & Standardsausrichtung
- **Spezifikationsreferenzen**: Alle Referenzen auf aktuelle MCP-Spezifikation 2025-06-18 aktualisiert
- **Microsoft Sicherheits-Ökosystem**: Verbesserte Integrationsanweisungen in allen Sicherheitsdokumentationen
- **Praktische Umsetzung**: Hinzufügung detaillierter Codebeispiele in .NET, Java und Python mit Unternehmensmustern
- **Ressourcenorganisation**: Umfassende Kategorisierung offizieller Dokumentation, Sicherheitsstandards und Umsetzungsanleitungen
- **Visuelle Indikatoren**: Klare Markierung verpflichtender Anforderungen gegenüber empfohlenen Praktiken


#### Kernkonzepte (01-CoreConcepts/) - Vollständige Modernisierung
- **Protokollversions-Update**: Aktualisiert zur Referenz der aktuellen MCP-Spezifikation 2025-06-18 mit datumsbasierter Versionierung (YYYY-MM-DD Format)
- **Architekturverfeinerung**: Verbesserte Beschreibungen von Hosts, Clients und Servern zur Abbildung aktueller MCP-Architekturpatterns
  - Hosts nun klar definiert als KI-Anwendungen, die mehrere MCP-Client-Verbindungen koordinieren
  - Clients beschrieben als Protokoll-Connectoren, die Eins-zu-Eins-Server-Beziehungen aufrechterhalten
  - Server erweitert mit lokalen vs. entfernten Bereitstellungsszenarien
- **Primitive Umstrukturierung**: Vollständige Überarbeitung von Server- und Client-Primitiven
  - Server-Primitives: Ressourcen (Datenquellen), Prompts (Vorlagen), Tools (ausführbare Funktionen) mit detaillierten Erklärungen und Beispielen
  - Client-Primitives: Sampling (LLM-Vervollständigungen), Elicitation (Benutzereingabe), Logging (Debugging/Monitoring)
  - Aktualisiert mit aktuellen Discovery- (`*/list`), Abruf- (`*/get`) und Ausführungs- (`*/call`) Methodenmustern
- **Protokollarchitektur**: Einführung eines zweischichtigen Architekturmodells
  - Datenschicht: JSON-RPC 2.0 Grundlage mit Lifecycle-Management und Primitiven
  - Transportschicht: STDIO (lokal) und Streamable HTTP mit SSE (remote) Transportmechanismen
- **Sicherheitsrahmen**: Umfassende Sicherheitsprinzipien einschließlich expliziter Benutzerzustimmung, Datenschutz, sichere Tool-Ausführung und Transportschichtsicherheit
- **Kommunikationsmuster**: Aktualisierte Protokollnachrichten mit Darstellung von Initialisierung, Discovery, Ausführung und Benachrichtigungsabläufen
- **Codebeispiele**: Erneuerte mehrsprachige Beispiele (.NET, Java, Python, JavaScript) zur Abbildung aktueller MCP SDK-Patterns

#### Sicherheit (02-Security/) - Umfassende Sicherheitsüberarbeitung  
- **Standardsausrichtung**: Volle Übereinstimmung mit den MCP-Sicherheitsanforderungen 2025-06-18
- **Authentifizierungsevolution**: Dokumentierte Entwicklung von kundenspezifischen OAuth-Servern zu Delegation externer Identitätsanbieter (Microsoft Entra ID)
- **KI-spezifische Bedrohungsanalyse**: Verbesserte Abdeckung moderner KI-Angriffsvektoren
  - Ausführliche Prompt Injection Angriffsszenarien mit realen Beispielen
  - Tool Poisoning-Mechanismen und „Rug Pull“-Angriffsmuster
  - Kontextfenster-Vergiftung und Modellverwirrungs-Angriffe
- **Microsoft KI-Sicherheitslösungen**: Umfassende Abdeckung des Microsoft-Sicherheitsökosystems
  - AI Prompt Shields mit fortgeschrittener Erkennung, Hervorhebung und Trennzeichentechniken
  - Azure Content Safety Integrationsmuster
  - GitHub Advanced Security zum Schutz der Lieferkette
- **Erweiterte Bedrohungsminderung**: Detaillierte Sicherheitskontrollen für
  - Session Hijacking mit MCP-spezifischen Angriffsszenarien und kryptografischen Session-ID-Anforderungen
  - Confused Deputy-Probleme in MCP-Proxy-Szenarien mit expliziten Zustimmungsanforderungen
  - Token-Passthrough-Schwachstellen mit verpflichtenden Validierungskontrollen
- **Lieferkettensicherheit**: Erweiterte KI-Lieferkettendeckung einschließlich Foundation Models, Embeddings Services, Kontextanbieter und Drittanbieter-APIs
- **Foundation-Sicherheit**: Verbesserte Integration mit Unternehmenssicherheitsmustern einschließlich Zero Trust Architektur und Microsoft Sicherheitsökosystem
- **Ressourcenorganisation**: Kategorisierte umfassende Ressourcenlinks nach Typ (Offizielle Docs, Standards, Forschung, Microsoft-Lösungen, Implementierungsleitfäden)

### Verbesserungen der Dokumentationsqualität
- **Strukturierte Lernziele**: Erweiterte Lernziele mit spezifischen, umsetzbaren Ergebnissen
- **Querverweise**: Hinzufügung von Links zwischen verwandten Sicherheits- und Kernkonzeptthemen
- **Aktuelle Informationen**: Aktualisierung aller Datumsangaben und Spezifikationslinks auf aktuelle Standards
- **Implementierungsanleitung**: Hinzufügung spezifischer, umsetzbarer Implementierungsrichtlinien in beiden Abschnitten

## 16. Juli 2025

### README und Navigation Verbesserungen
- Völlig neu gestaltete Curriculum-Navigation in README.md
- Ersetzung der `<details>`-Tags durch besser zugängliches tabellenbasiertes Format
- Erstellung alternativer Layoutoptionen im neuen „alternative_layouts“-Ordner
- Hinzufügung von navigationsbasierten Beispielen mit Karten-, Tab- und Akkordeon-Stilen
- Aktualisierung des Repository-Strukturabschnitts zur Aufnahme aller neuesten Dateien
- Erweiterung des Abschnitts „Wie man dieses Curriculum verwendet“ mit klaren Empfehlungen
- Aktualisierung der MCP-Spezifikationslinks auf korrekte URLs
- Hinzufügung des Abschnitts Kontexttechnologie (5.14) zur Curriculum-Struktur

### Aktualisierungen des Studienführers
- Völlige Überarbeitung des Studienführers zur Ausrichtung an der aktuellen Repository-Struktur
- Hinzufügung neuer Abschnitte zu MCP-Clients und Tools sowie beliebten MCP-Servern
- Aktualisierung der visuellen Curriculums-Karte zur genauen Abbildung aller Themen
- Erweiterte Beschreibungen der Fortgeschrittenenthemen zur Abdeckung aller Spezialgebiete
- Aktualisierung des Abschnitts Fallstudien zur Abbildung tatsächlicher Beispiele
- Hinzufügung dieses umfassenden Änderungsprotokolls

### Community-Beiträge (06-CommunityContributions/)
- Hinzufügung detaillierter Informationen zu MCP-Servern für die Bildgenerierung
- Umfassender Abschnitt zur Nutzung von Claude in VSCode hinzugefügt
- Hinzufügung von Cline-Terminal-Client-Einrichtungs- und Bedienungsanleitungen
- Aktualisierung des MCP-Client-Abschnitts zur Aufnahme aller populären Client-Optionen
- Verbesserung der Beitragsbeispiele mit genaueren Codebeispielen

### Fortgeschrittene Themen (05-AdvancedTopics/)
- Organisation aller spezialisierten Themenordner mit konsistenter Benennung
- Hinzufügung von Materialien und Beispielen zur Kontexttechnik
- Hinzufügung der Foundry Agent-Integrationsdokumentation
- Verbesserte Dokumentation der Entra ID Sicherheitsintegration

## 11. Juni 2025

### Erste Erstellung
- Veröffentlichung der ersten Version des MCP for Beginners Curriculums
- Erstellung der Grundstruktur für alle 10 Hauptabschnitte
- Implementierung der Visual Curriculum Map zur Navigation
- Hinzufügung erster Beispielprojekte in mehreren Programmiersprachen

### Einstieg (03-GettingStarted/)
- Erstellung erster Server-Implementierungsbeispiele
- Hinzufügung von Anleitungen zur Client-Entwicklung
- Aufnahme von Anweisungen zur LLM-Client-Integration
- Hinzufügung der VS Code-Integrationsdokumentation
- Implementierung von Server-Sent Events (SSE) Server-Beispielen

### Kernkonzepte (01-CoreConcepts/)
- Hinzufügung detaillierter Erklärungen der Client-Server-Architektur
- Erstellung von Dokumentation zu Schlüsselkomponenten des Protokolls
- Dokumentation der Messaging-Muster im MCP

## 23. Mai 2025

### Repository-Struktur
- Initialisierung des Repository mit grundlegender Ordnerstruktur
- Erstellung von README-Dateien für jeden Hauptabschnitt
- Aufbau der Übersetzungsinfrastruktur
- Hinzufügung von Bildmaterial und Diagrammen

### Dokumentation
- Erstellung der initialen README.md mit Curriculum-Übersicht
- Hinzufügung von CODE_OF_CONDUCT.md und SECURITY.md
- Erstellung von SUPPORT.md mit Hilfestellungen für Unterstützung
- Aufbau der vorläufigen Struktur des Studienführers

## 15. April 2025

### Planung und Rahmenwerk
- Erste Planung des MCP for Beginners Curriculums
- Definition von Lernzielen und Zielgruppen
- Gliederung der 10-Abschnitt-Struktur des Curriculums
- Entwicklung eines konzeptionellen Rahmens für Beispiele und Fallstudien
- Erstellung erster Prototyp-Beispiele für Schlüsselkonzepte

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->