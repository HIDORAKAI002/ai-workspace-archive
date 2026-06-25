# Änderungsprotokoll: MCP für Anfänger Curriculum

Dieses Dokument dient als Aufzeichnung aller bedeutenden Änderungen am Model Context Protocol (MCP) für Anfänger Curriculum. Änderungen werden in umgekehrter chronologischer Reihenfolge dokumentiert (neueste Änderungen zuerst).

## 24. Juni 2026

### Neue Lektion: Verwendung von MCP in der Copilot-App

- [Werkzeugabschnitt](./12-tooling/README.md) Werkzeugabschnitt hinzugefügt.
- [MCP in der Copilot-App](./12-tooling/01-copilot-app/README.md)

## 16. Juni 2026

### MCP-Spezifikationsanpassung & Beispielvalidierung

Das Curriculum wurde gegen die aktuelle **MCP-Spezifikation 2025-11-25** und die neuesten offiziellen SDKs validiert, dann wurden verbliebene veraltete Spezifikationsverweise korrigiert und bestätigt, dass die Kernbeispiele weiterhin gebaut und ausgeführt werden.

#### Korrekturen der Spezifikationsversion (2025-06-18 / 2025-03-26 → 2025-11-25)

Englische Inhalte wurden aktualisiert, wenn sie noch behaupteten, dass eine ältere Spezifikationsrevision der *aktuelle/neuste* Standard sei, und Links wurden auf die kanonischen `modelcontextprotocol.io` Spezifikationspfade umgestellt:
- **05-AdvancedTopics/mcp-security/README.md**: Banner „Aktueller Standard“, Einführung, Überschrift Kernprinzipien Sicherheit, Überschrift Verpflichtende Anforderungen, Microsoft Entra ID Abschnitt, Referenzen & Ressourcen Links und abschließende Sicherheitshinweise (8 Referenzen) wurden auf 2025-11-25 aktualisiert
- **05-AdvancedTopics/mcp-transport/README.md**: Zusätzlicher Ressourcen-Link zur Spezifikation und Banner „Aktueller Standard“ auf 2025-11-25 aktualisiert
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Den veralteten `2025-03-26` security-and-trust Link durch die aktuelle 2025-11-25 Seite mit Sicherheitsbest-Practices ersetzt
- **03-GettingStarted/14-sampling/README.md**: Link zur offiziellen Sampling-Dokumentation auf 2025-11-25 aktualisiert
- **03-GettingStarted/05-stdio-server/README.md**: Gegenwärtige Bezugnahme auf die „aktuelle MCP-Spezifikation“ im Präsens und der Link zu zusätzlichen Ressourcen auf 2025-11-25 aktualisiert (historische SSE-Diskontinuierungs-Hinweise blieben zur Genauigkeit erhalten)

#### Beispielvalidierung gegen aktuelle SDKs

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` löste `@modelcontextprotocol/sdk@1.29.0` auf; `tsc --noEmit` bestand ohne Typfehler — bestehende `McpServer`/`StdioServerTransport` APIs bleiben gültig
- **Python (03-GettingStarted/01-first-server/solution/python)**: In einer isolierten `.venv` mit `mcp[cli]` (1.27.2) validiert; `py_compile` bestanden und `FastMCP.list_tools()` lieferte korrekt die Tools `add` und `subtract`
- Alle Beispiel-@modelcontextprotocol/sdk Versionsbereiche (`>=1.26.0` / `^1.26.0` / `^1.27.0`) laufen sauber auf die aktuelle `1.29.0` ohne brechende API-Änderungen heraus

#### Angleichung der Abhängigkeits-Pins (Schließen von Versionslücken)

Veraltete SDK-Pins wurden angehoben, sodass jedes Beispiel die aktuelle MCP-Version verwendet, entsprechend der Repositorium-weiten Konvention:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` von `^1.8.0` → `>=1.26.0` erhöht und die veraltete Paketbeschreibung `"updated for MCP 2025-06-18"` auf `"aligned with MCP Specification 2025-11-25"` geändert
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** und **lab4/code/github_mcp_server/pyproject.toml**: Exakte Pin `mcp==1.23.0` → `mcp>=1.26.0` angehoben; beide `uv.lock` Dateien mit `uv lock` neu generiert, damit diese Lockfiles auf das aktuelle `mcp 1.27.2` auflösen und mit den Manifesten synchron bleiben

#### Lückenanalyse des Curriculums — Abdeckung neuester Spezifikationsfunktionen

Es wurde bestätigt, dass das Curriculum bereits alle Primitiven abdeckt, die in MCP 2025-11-25 eingeführt oder erweitert wurden, daher bestehen keine inhaltlichen Lücken:
- **Sampling**: Lektionen 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-Modus)**: Dokumentiert in 01-CoreConcepts und 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumentiert in 00-Introduction, 01-CoreConcepts und 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimentell, langlaufende Operationen)**: Dokumentiert in 01-CoreConcepts und 05-AdvancedTopics/mcp-protocol-features
- **Werkzeuganmerkungen** (`readOnlyHint` / `destructiveHint`): Dokumentiert in 01-CoreConcepts und 05-AdvancedTopics/mcp-protocol-features

### Sicherheitsverstärkung & Behebung von Abhängigkeits-Schwachstellen

Ein vollständiger Sicherheitscheck wurde über alle Abhängigkeits-Metadaten und den Beispielquellcode durchgeführt, danach wurden alle gemeldeten npm-Sicherheitswarnungen und ein sicherheitsrelevanter Codebefund behoben. Nach der Behebung meldet `npm audit` **0 Schwachstellen** in allen geprüften Verzeichnissen.

#### npm-Abhängigkeits-Schwachstellen (transitive) — Behoben

Alle 15 erfassten `package-lock.json` Dateien wurden geprüft. Schwachstellen beschränkten sich auf transitive Abhängigkeiten, die durch das MCP Inspector Entwickler-Tool, den OpenAI Client und das MCP SDK eingebunden werden; alle wurden nun ohne Bruch der Beispiele behoben:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** und **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` von `0.16.6` / `0.14.1` auf `0.22.0` aktualisiert, wodurch die eingebundenen Advisories in `ajv`, `brace-expansion`, `diff`, `path-to-regexp` und `ws` entfernt wurden. Ein npm `overrides` Eintrag wurde hinzugefügt, der das gepatchte `shell-quote@1.8.4` erzwingt, um einen restlichen kritischen Advisory, der von `concurrently` getragen wurde, zu entfernen; beide Lockfiles wurden neu generiert (jetzt 0 Schwachstellen)
- **03-GettingStarted/samples/typescript**: `npm audit fix` hat die moderate transitive Schwachstelle in `qs` auf eine gepatchte Version aktualisiert
- **03-GettingStarted/samples/javascript**: `npm audit fix` hat die moderate transitive Schwachstelle in `hono` auf eine gepatchte Version aktualisiert
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` hat die hohe transitive Schwachstelle in `form-data` auf eine gepatchte Version aktualisiert
- **03-GettingStarted/11-simple-auth/solution/typescript**: Das fehlende `package-lock.json` wurde generiert, so dass das Projekt reproduzierbar und prüfbar ist (0 Schwachstellen)

#### Sicherheitsfix auf Code-Ebene (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `shell=True` wurde aus dem `open_in_vscode` Tool entfernt. Der vorherige Aufruf `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` erlaubte das Interpretieren von Shell-Metakommandos im Ordnerpfad über `cmd.exe` (Command-Injection-Vektor). Jetzt wird `Code.exe` direkt mit dem Ordner als Argument gestartet — keine Shell — funktional gleichwertig und sicher

#### Python-Abhängigkeits-Audit

- Alle Python-Anforderungs-Sets wurden mit `pip-audit` geprüft. `05-AdvancedTopics` und `03-GettingStarted/samples/python` meldeten **keine bekannten Schwachstellen** (deren `mcp` / `httpx` / `pydantic` / `python-dotenv` Bereiche lösen sich auf aktuelle gepatchte Versionen auf)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` meldete die transitive Abhängigkeit **`werkzeug` 3.1.1** mit drei `safe_join` Windows Geräte-Name DoS-Warnungen — `CVE-2025-66221`, `CVE-2026-21860` und `CVE-2026-27199` (alle in 3.1.6 behoben). Ein expliziter Sicherheitspin `werkzeug>=3.1.6` wurde hinzugefügt, sodass die gepatchte Version aufgelöst wird; geprüft wurde, dass die Einschränkung sauber mit dem `chainlit` / `mcp` / `semantic-kernel` Stack aufgelöst wird

### Produktnamen-Rebranding

Alle Curriculum-Inhalte wurden zur Reflektion des Microsoft Produkt-Rebrandings aktualisiert:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord Community Link aktualisiert
- **AGENTS.md**: Discord Server Referenz aktualisiert
- **README.md**: Technologisches Ökosystem aktualisiert
- **study_guide.md**: Fallstudienreferenzen aktualisiert
- **05-AdvancedTopics/README.md**: Modul 5.13 Titel und Beschreibung aktualisiert
- **05-AdvancedTopics/mcp-integration/README.md**: Abschnittsüberschrift und Beschreibung aktualisiert
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Vollständiger Modul-Titel und Inhaltsupdate
- **05-AdvancedTopics/mcp-security-entra/README.md**: Querverweis-Link aktualisiert
- **07-LessonsfromEarlyAdoption/README.md**: Fallstudienreferenzen aktualisiert
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Abschnitt 9 Überschrift, Badges und Fähigkeiten aktualisiert
- **08-BestPractices/README.md**: Discord Community Link aktualisiert
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord Kanal Referenz aktualisiert
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Modell-Deployment Referenz aktualisiert
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI Services Tabelle aktualisiert
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Ressourcenreferenzen aktualisiert

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension für VS Code
- **README.md**: Haupt-Curriculumreferenzen aktualisiert
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Modultitel, Überblick und alle Modulüberschriften aktualisiert
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Titel, Lernziele, Setup-Anleitungen und Ressourcen aktualisiert
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Titel, Lernziele, MCP-Hosts-Tabelle und Querverweise aktualisiert
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Titel, Badges, Voraussetzungen und Ressourcen aktualisiert
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Agent Builder Referenzen und Feedback-Link aktualisiert
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Voraussetzungen und Erweiterungsreferenzen aktualisiert

---

## 11. April 2026

### Neue Lektion, Dokumentationskorrekturen und Abhängigkeitsupdates

#### Neue Curriculumsinhalte hinzugefügt

**Modul 05 - Fortgeschrittene Themen**
- **Lektion 5.17: Gegenseitiges Multi-Agenten-Reasoning mit MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Neuer umfassender Leitfaden zum adversarial debate Muster für Multi-Agent-Systeme
  - Mermaid Architekturdiagramm: zwei Agenten → geteilter MCP-Server → Debattenprotokoll → Richter → Urteil
  - Gemeinsamer MCP-Tool-Server (`web_search` + `run_python`) in Python und TypeScript implementiert
  - Gegensätzliche System-Prompts (FÜR / GEGEN / Richter) mit expliziten Werkzeugnutzungsanforderungen
  - Debatten-Orchestrator in Python, TypeScript und C# zur Verwaltung der Runden und Steuerung der Argumente
  - MCP `ClientSession` Anbindung für den Orchestrator zu realen Werkzeugaufrufen
  - Anwendungsfalldarstellung (Halluzinations-Erkennung, Bedrohungsmodellierung, API Design Review, Faktenprüfung, Technikauswahl)
  - Sicherheitsüberlegungen: Sandbox-Ausführung, Werkzeugaufruf-Validierung, Ratenbegrenzung, Audit-Logging
  - Strukturierte Übung mit drei praktischen Szenarien (Code Review, Architekturentscheidung, Inhaltsmoderation)

#### Dokumentationskorrekturen

**Modul 03 - Erste Schritte**
- **05-stdio-server/README.md**: Unvollständiges TypeScript-stdio-Server-Beispiel korrigiert — fehlende Transportinstanzierung (`new StdioServerTransport()`) und `server.connect(transport)` Aufruf hinzugefügt, um mit den Python- und .NET-Beispielen im gleichen Abschnitt übereinzustimmen
- **14-sampling/README.md**: Tippfehler korrigiert — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Curriculum-Updates

**Haupt README.md**
- Eintrag 5.17 (Gegenseitiges Multi-Agenten-Reasoning mit MCP) zur Curriculum-Tabelle mit Link zur neuen Lektion hinzugefügt

**05-AdvancedTopics/README.md**
- Zeile Lektion 5.17 zur Lektionentabelle hinzugefügt

**study_guide.md**
- Thema Gegenseitiges Multi-Agenten-Reasoning zur Mindmap und prosaischen Beschreibung der Fortgeschrittenen Themen hinzugefügt

#### Code- und Sicherheitsfixes

**Modul 05 - Gegenseitige Agenten (`mcp-adversarial-agents`)**
- **Sicherheitsfix — Befehlsinjektion**: Ersetzte `execSync` Shell-Interpolation durch `execFile` + `promisify` im TypeScript `run_python` Tool und beseitigte so die Angriffsfläche für Befehlsinjektion (Vom LLM gesteuerter Code wird nun als wörtliches argv-Element ohne Shell-Beteiligung übergeben)
- **MCP Tool Loop Verdrahtung**: Aktualisierte den Python Debate Orchestrator, um den `AsyncAnthropic` Client zu verwenden (ersetzt blockierenden synchronen `Anthropic`), eine laufende `ClientSession` direkt an jede Agententurn zu übergeben, Werkzeugdefinitionen jeweils über `session.list_tools()` abzurufen und `tool_use` Blöcke über `session.call_tool()` in einer Schleife zu senden, bis das Modell eine finale Textantwort ausgibt

#### Abhängigkeitsaktualisierungen

- Aktualisierte `hono` auf Version 4.12.12 in mehreren Paketen (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Aktualisierte `@hono/node-server` von 1.19.11 auf 1.19.13 in TypeScript-Paketen
- Aktualisierte `cryptography` von 46.0.5 auf 46.0.7 in Python-Paketen (10-StreamliningAIWorkflows Labs 3 und 4)
- Aktualisierte `lodash` von 4.17.23 auf 4.18.1 im 10-StreamliningAIWorkflows Inspector

#### Übersetzungen

- Synchronisierte Übersetzungen für 48+ Sprachen mit den neuesten Quelländerungen (i18n Update)

---

## 5. Februar 2026

### Repository-weit Validierungs- und Navigationsverbesserungen

#### Neue Kursinhalte hinzugefügt

**Modul 03 - Erste Schritte**
- **12-mcp-hosts/README.md**: Neuer umfassender Leitfaden zur Einrichtung von MCP Hosts
  - Konfigurationsbeispiele für Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-Konfigurationsvorlagen für alle wichtigen Hosts
  - Vergleichstabelle der Transporttypen (stdio, SSE/HTTP, WebSocket)
  - Fehlerbehebung bei häufigen Verbindungsproblemen
  - Sicherheitsempfehlungen für Host-Konfigurationen

- **13-mcp-inspector/README.md**: Neuer Debugging-Leitfaden für MCP Inspector
  - Installationsmethoden (npx, global npm, aus Quellcode)
  - Verbindung zu Servern via stdio und HTTP/SSE
  - Testwerkzeuge, Ressourcen und Prompt-Workflows
  - VS Code Integration mit MCP Inspector
  - Häufige Debugging-Szenarien mit Lösungen

**Modul 04 - Praktische Umsetzung**
- **pagination/README.md**: Neuer Leitfaden zur Paginierungsimplementierung
  - Cursor-basierte Paginierungsmuster in Python, TypeScript, Java
  - Client-seitige Paginierungssteuerung
  - Strategien zur Gestaltung von Cursorn (opak vs. strukturiert)
  - Empfehlungen zur Leistungsoptimierung

**Modul 05 - Fortgeschrittene Themen**
- **mcp-protocol-features/README.md**: Neue tiefgehende Protokoll-Features
  - Implementierung von Fortschrittsbenachrichtigungen
  - Muster zum Abbrechen von Anfragen
  - Ressourcenvorlagen mit URI-Mustern
  - Verwaltung des Server-Lebenszyklus
  - Steuerung der Protokollierungsebene
  - Fehlerbehandlungs-Muster mit JSON-RPC Codes

#### Navigationskorrekturen (24+ Dateien aktualisiert)

**Hauptmodul-READMEs**
 Verlinken nun sowohl die erste Lektion ALS AUCH das nächste Modul

**02-Security Unterdateien**
- Alle 5 zusätzlichen Sicherheitsdokumente haben jetzt "Was kommt als Nächstes"-Navigation:

**09-CaseStudy Dateien**
- Alle Case Study Dateien enthalten jetzt eine sequentielle Navigation:

**10-StreamliningAI Labs**
"Haben Sie Was kommt als Nächstes"-Abschnitte zu Modul 10 Übersicht und Modul 11 hinzugefügt

#### Code- und Inhaltskorrekturen

**SDK- und Abhängigkeitsupdates**
Leere OpenAI-Version auf `^4.95.0` korrigiert
SDK von `^1.8.0` auf `>=1.26.0` aktualisiert
MCP Versionspins auf `>=1.26.0` gesetzt

**Codekorrekturen**
Ungültiges Modell `gpt-4o-mini` zu `gpt-4.1-mini` geändert

**Inhaltskorrekturen**
Defekten Link `READMEmd` → `README.md` korrigiert, Kursüberschrift `Module 1-3` → `Module 0-3` korrigiert, fallabhängigen Pfad korrigiert
Beschädigten doppelten Inhalt von Case Study 5 entfernt

**Verbesserungen für Anfänger**
Geeignete Einführung, Lernziele und Voraussetzungen für Einsteiger ergänzt

#### Kursupdates

**Haupt-README.md**
- Einträge 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) zur Kursübersicht hinzugefügt

**Modul-READMEs**
Lektionen 12 und 13 zur Lektionenliste hinzugefügt
Abschnitt Praktische Leitfäden mit Paginierungslink eingefügt
Lektionen 5.15 (Custom Transport) und 5.16 (Protocol Features) ergänzt

**study_guide.md**
- Mindmap mit allen neuen Themen aktualisiert: MCP Hosts Setup, MCP Inspector, Paginierungsstrategien, Protokoll-Features Deep Dive

## 28. Januar 2026

### MCP-Spezifikation 2025-11-25 Compliance-Überprüfung

#### Erweiterung der Kernkonzepte (01-CoreConcepts/)
- **Neues Client-Primitiv – Roots**: Umfassende Dokumentation des Roots-Client-Primitivs hinzugefügt, das Servern ermöglicht, Dateisystemgrenzen und Zugriffsrechte zu verstehen
- **Tool-Anmerkungen**: Dokumentation zu Werkzeugverhaltens-Anmerkungen (`readOnlyHint`, `destructiveHint`) für bessere Ausführungsentscheidungen hinzugefügt
- **Tool-Aufrufe in Sampling**: Sampling-Dokumentation aktualisiert, um `tools` und `toolChoice` Parameter für modellgesteuerte Werkzeugaufrufe bei Sampling-Anfragen einzuschließen
- **URL-Modus Elicitation**: Dokumentation zur URL-basierten Abfrage für serverinitiierte externe Webinteraktionen hinzugefügt
- **Tasks (Experimentell)**: Neuer Abschnitt zu experimenteller Tasks-Funktion für dauerhafte Ausführungswrapper und verzögerte Ergebnissabfrage hinzugefügt
- **Icons-Unterstützung**: Werkzeuge, Ressourcen, Ressourcenvorlagen und Prompts können nun auch Icons als zusätzliche Metadaten enthalten

#### Dokumentationsupdates
- **README.md**: MCP Spezifikation 2025-11-25 Versionsverweis und datumsbasierte Versionierung erläutert
- **study_guide.md**: Kursübersicht aktualisiert, um Tasks und Tool-Anmerkungen im Abschnitt Kernkonzepte einzuschließen; Dokument-Zeitstempel aktualisiert

#### Spezifikationskonformitätsprüfung
- **Protokollversion**: Sicherstellung, dass alle Dokumente die aktuelle MCP Spezifikation 2025-11-25 referenzieren
- **Architekturausrichtung**: Bestätigung der Genauigkeit der Zwei-Schichten-Architektur (Datenebene + Transporteebene)
- **Primitiv-Dokumentation**: Validierung der Server-Primitiven (Ressourcen, Prompts, Werkzeuge) und Client-Primitiven (Sampling, Elicitation, Logging, Roots)
- **Transportmechanismen**: Verifikation von STDIO und streambarem HTTP-Transport in der Dokumentation
- **Sicherheitshinweise**: Bestätigung der Übereinstimmung mit aktuellen MCP-Sicherheitsbest-Practices-Dokumenten

#### Wichtige MCP 2025-11-25 Funktionen dokumentiert
- **OpenID Connect Discovery**: Authentifizierungs-Server-Entdeckung per OIDC
- **OAuth Client ID Metadaten-Dokumente**: Empfohlenes Client-Registrierungsverfahren
- **JSON Schema 2020-12**: Standarddialekt für MCP Schema-Definitionen
- **SDK-Stufen-System**: Formalisierte Anforderungen an SDK-Funktionsunterstützung und Wartung
- **Governance-Struktur**: Formalisierte Arbeitsgruppen und Interessensgruppen in der MCP-Governance

### Große Sicherheitsdoku-Aktualisierung (02-Security/)

#### Integration MCP Security Summit Workshop (Sherpa)
- **Neue praxisorientierte Trainingsressource**: Umfassende Integration mit dem [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) in der gesamten Sicherheitsdokumentation
- **Expeditionsrouten-Abdeckung**: Dokumentation des vollständigen Camp-zu-Camp Fortschritts vom Base Camp bis zum Summit
- **OWASP-Ausrichtung**: Alle Sicherheitsempfehlungen sind nun auf Risiken des OWASP MCP Azure Security Guide abgestimmt

#### OWASP MCP Top 10 Integration
- **Neuer Abschnitt**: Tabelle mit den OWASP MCP Top 10 Sicherheitsrisiken inklusive Azure-Minderungsmaßnahmen im Haupt-Security-README hinzugefügt
- **Risiko-basierte Dokumentation**: Aktualisierung von mcp-security-controls-2025.md mit OWASP MCP Risiko-Verweisen für jede Sicherheitsdomäne
- **Referenzarchitektur**: Verlinkung auf OWASP MCP Azure Security Guide Referenzarchitektur und Implementierungsmuster

#### Aktualisierte Sicherheitsdateien
- **README.md**: Sherpa Workshop Übersicht, Expeditionsrouten-Tabelle, OWASP MCP Top 10 Risikosumme und Hands-on Training Abschnitt hinzugefügt
- **mcp-security-controls-2025.md**: Header auf Februar 2026 aktualisiert, OWASP Risiko-Verweise (MCP01-MCP08) ergänzt, Versionsinkonsistenz behoben
- **mcp-security-best-practices-2025.md**: Sherpa und OWASP Ressourcenabschnitt hinzugefügt, Zeitstempel aktualisiert
- **mcp-best-practices.md**: Hands-on Training Abschnitt mit Sherpa und OWASP Links ergänzt
- **azure-content-safety-implementation.md**: OWASP MCP06-Verweis, Sherpa Camp 3 Ausrichtung und zusätzliche Ressourcen ergänzt

#### Neue Ressourcenlinks hinzugefügt
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Einzelne OWASP MCP Risiko-Seiten (MCP01-MCP10)

### Curriculum-weite MCP Spezifikation 2025-11-25 Ausrichtung

#### Modul 03 - Erste Schritte
- **SDK-Dokumentation**: Go SDK zur offiziellen SDK-Liste hinzugefügt; alle SDK-Referenzen auf MCP Spezifikation 2025-11-25 abgeglichen
- **Transport-Klarstellung**: STDIO und HTTP Streaming Transportbeschreibungen mit expliziten Specs-Verweisen aktualisiert

#### Modul 04 - Praktische Umsetzung
- **SDK-Updates**: Go SDK hinzugefügt; SDK-Liste mit Versionsverweis auf Spezifikation aktualisiert
- **Autorisierungs-Spezifikation**: MCP Autorisierungs-Spezifikationslink auf aktuelle Version 2025-11-25 aktualisiert

#### Modul 05 - Fortgeschrittene Themen
- **Neue Features**: Hinweis auf neue MCP Spezifikation 2025-11-25 Features (Tasks, Tool Annotations, URL Mode Elicitation, Roots) hinzugefügt
- **Sicherheitsressourcen**: OWASP MCP Top 10 und Sherpa Workshop Links zu weiteren Referenzen ergänzt

#### Modul 06 - Beiträge der Community
- **SDK-Liste**: Swift und Rust SDKs hinzugefügt; Spezifikationslink auf 2025-11-25 aktualisiert
- **Specs-Referenz**: MCP Spezifikation Link auf direkte Spezifikations-URL aktualisiert

#### Modul 07 - Lektionen aus Frühadoption
- **Ressourcenupdates**: MCP Spezifikation 2025-11-25-Link und OWASP MCP Top 10 zu weiteren Ressourcen hinzugefügt

#### Modul 08 - Best Practices
- **Spec Version**: MCP Spezifikationsverweis auf 2025-11-25 aktualisiert
- **Sicherheitsressourcen**: OWASP MCP Top 10 und Sherpa Workshop zu weiteren Referenzen hinzugefügt

#### Modul 10 - Streamlining AI Workflows
- **Badge Update**: MCP Version Badge von SDK-Version (1.9.3) auf Spezifikationsversion (2025-11-25) geändert
- **Ressourcenlinks**: MCP Spezifikation Link aktualisiert; OWASP MCP Top 10 hinzugefügt

#### Modul 11 - MCP Server Hands-On Labs
- **Spec Referenz**: MCP Spezifikation Link auf 2025-11-25 Version aktualisiert
- **Sicherheitsressourcen**: OWASP MCP Top 10 zu offiziellen Ressourcen hinzugefügt

## 18. Dezember 2025

### Sicherheitsdokumentations-Update - MCP Spezifikation 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) – Versionsupdate
- **Protokollversionsupdate**: Referenz auf neueste MCP Spezifikation 2025-11-25 (veröffentlicht am 25. November 2025)
  - Alle Versionsreferenzen von 2025-06-18 auf 2025-11-25 geändert
  - Dokument-Datum von 18. August 2025 auf 18. Dezember 2025 aktualisiert
  - Alle Spezifikations-URLs überprüft und auf aktuelle Dokumentation gerichtet
- **Inhaltsvalidierung**: Umfassende Prüfung der Sicherheitsbest-Practices gegenüber aktuellen Standards
  - **Microsoft Security Lösungen**: Aktuelle Terminologie und Links für Prompt Shields (früher "Jailbreak Risk Detection"), Azure Content Safety, Microsoft Entra ID und Azure Key Vault verifiziert
  - **OAuth 2.1 Sicherheit**: Übereinstimmung mit aktuellen OAuth Sicherheitsbest-Practices bestätigt
  - **OWASP Standards**: OWASP Top 10 für LLMs Referenzen auf Aktualität überprüft
  - **Azure Services**: Alle Microsoft Azure Doku-Links und Best Practices überprüft
- **Standards-Ausrichtung**: Alle referenzierten Sicherheitsstandards sind aktuell
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure Sicherheits- und Compliance-Frameworks
- **Implementierungsressourcen**: Alle Implementierungsleitfäden und Ressourcen geprüft
  - Azure API Management Authentifizierungsmuster
  - Microsoft Entra ID Integrationsleitfäden
  - Azure Key Vault Geheimnisverwaltung
  - DevSecOps Pipelines und Monitoring Lösungen

### Dokumentations-Qualitätssicherung
- **Spezifikations-Compliance**: Sicherstellung, dass alle verpflichtenden MCP Sicherheitsanforderungen (MUSS/MUSS NICHT) mit der neuesten Spezifikation übereinstimmen
- **Ressourcen-Aktualität**: Prüfung aller externen Links zu Microsoft Dokumentation, Sicherheitsstandards und Implementierungsleitfäden
- **Abdeckung Best Practices**: Umfassende Abdeckung von Authentifizierung, Autorisierung, KI-spezifischen Bedrohungen, Lieferkettensicherheit und Unternehmensmustern bestätigt

## 6. Oktober 2025

### Erweiterung des Getting Started Abschnitts – Fortgeschrittene Servernutzung & Einfache Authentifizierung

#### Fortgeschrittene Servernutzung (03-GettingStarted/10-advanced)
- **Neues Kapitel hinzugefügt**: Umfassender Leitfaden zur fortgeschrittenen Nutzung des MCP Servers, der sowohl reguläre als auch Low-Level Server-Architekturen abdeckt.
  - **Regulärer vs. Low-Level-Server**: Detaillierter Vergleich und Codebeispiele in Python und TypeScript für beide Ansätze.
  - **Handler-basierte Gestaltung**: Erklärung des handler-basierten Werkzeug-/Ressourcen-/Prompt-Managements für skalierbare, flexible Serverimplementierungen.
  - **Praktische Muster**: Praxisbeispiele, bei denen Low-Level-Servermuster für fortgeschrittene Funktionen und Architektur vorteilhaft sind.

#### Einfache Authentifizierung (03-GettingStarted/11-simple-auth)
- **Neues Kapitel hinzugefügt**: Schritt-für-Schritt-Anleitung zur Implementierung einfacher Authentifizierung in MCP-Servern.
  - **Auth-Konzepte**: Klare Erklärung von Authentifizierung vs. Autorisierung und Umgang mit Zugangsdaten.
  - **Grundlegende Auth-Implementierung**: Middleware-basierte Authentifizierungsmuster in Python (Starlette) und TypeScript (Express) mit Codebeispielen.
  - **Fortschritt zu Erweitertem Schutz**: Anleitung zum Einstieg mit einfacher Auth und Weiterentwicklung zu OAuth 2.1 und RBAC, mit Verweisen auf fortgeschrittene Sicherheitsmodule.

Diese Ergänzungen bieten praxisnahe Anleitung für den Aufbau robusterer, sicherer und flexibler MCP-Serverimplementierungen, die grundlegende Konzepte mit fortgeschrittenen Produktionsmustern verbinden.

## 29. September 2025

### MCP-Server-Datenbankintegrationslabore – Umfassender praxisorientierter Lernpfad

#### 11-MCPServerHandsOnLabs – Neuer kompletter Lehrgang zur Datenbankintegration  
- **Kompletter 13-Lab-Lernpfad**: Hinzugefügter umfassender praxisorientierter Lehrplan für den Aufbau produktionsreifer MCP-Server mit PostgreSQL-Datenbankintegration  
  - **Praxisbeispiel**: Zava Retail Analytics Use Case mit Unternehmensmustern  
  - **Strukturierter Lernfortschritt**:  
    - **Labs 00-03: Grundlagen** – Einführung, Kernarchitektur, Sicherheit & Multi-Tenancy, Umgebungsaufbau  
    - **Labs 04-06: Aufbau des MCP-Servers** – Datenbankdesign & Schema, MCP-Server-Implementierung, Werkzeugentwicklung  
    - **Labs 07-09: Erweiterte Funktionen** – Semantische Suche-Integration, Testen & Debuggen, VS Code-Integration  
    - **Labs 10-12: Produktivbetrieb & Best Practices** – Deployment-Strategien, Monitoring & Beobachtbarkeit, Best Practices & Optimierung  
  - **Enterprise-Technologien**: FastMCP-Framework, PostgreSQL mit pgvector, Azure OpenAI-Embeddings, Azure Container Apps, Application Insights  
  - **Erweiterte Funktionen**: Row Level Security (RLS), semantische Suche, mandantenfähiger Datenzugriff, Vektor-Embeddings, Echtzeit-Monitoring

#### Terminologiestandardisierung – Modulumwandlung zu Labor
- **Umfassende Dokumentationsaktualisierung**: Systematische Anpassung aller README-Dateien in 11-MCPServerHandsOnLabs auf "Lab"-Terminologie statt "Modul"  
  - **Abschnittsüberschriften**: "What This Module Covers" wurde auf "What This Lab Covers" in allen 13 Labs angepasst  
  - **Inhaltsbeschreibung**: "This module provides..." wurde in der gesamten Dokumentation zu "This lab provides..." geändert  
  - **Lernziele**: "By the end of this module..." wurde zu "By the end of this lab..." angepasst  
  - **Navigationslinks**: Alle Verweise "Module XX:" wurden zu "Lab XX:" geändert  
  - **Abschlussverfolgung**: "After completing this module..." wurde zu "After completing this lab..." aktualisiert  
  - **Technische Referenzen unverändert**: Python-Modulreferenzen in Konfigurationsdateien (z. B. `"module": "mcp_server.main"`) wurden beibehalten  

#### Lernleitfaden-Erweiterung (study_guide.md)  
- **Visuelle Curriculumsübersicht**: Neuer Abschnitt "11. Database Integration Labs" mit umfassender Lab-Strukturvisualisierung hinzugefügt  
- **Repository-Struktur**: Von zehn auf elf Hauptabschnitte erweitert mit detaillierter Beschreibung von 11-MCPServerHandsOnLabs  
- **Lernpfad-Anleitung**: Navigationsanweisungen für Abschnitte 00–11 verbessert  
- **Technologieabdeckung**: Hinzugefügte Details zu FastMCP, PostgreSQL und Azure-Diensten  
- **Lernergebnisse**: Betonung von produktionsbereiter Serverentwicklung, Datenbankintegrationsmustern und Enterprise-Sicherheit  

#### Haupt-README-Strukturverbesserung  
- **Laborbasierte Terminologie**: Aktualisierung der Haupt-README.md in 11-MCPServerHandsOnLabs zur konsistenten Verwendung der "Lab"-Struktur  
- **Lernpfad-Organisation**: Klarer Fortschritt von Grundlagen über fortgeschrittene Implementierung bis zum Produktivbetrieb  
- **Praxisfokus**: Betonung von praktischem, praxisnahem Lernen mit Unternehmensmustern und -technologien  

### Verbesserungen bei Dokumentationsqualität & Konsistenz  
- **Betonung des praktischen Lernens**: Verstärkter praxisorientierter, laborbasierter Ansatz im gesamten Dokumentationsmaterial  
- **Fokus auf Enterprise-Muster**: Hervorhebung produktionsreifer Implementierungen und Enterprise-Sicherheitsaspekte  
- **Technologieintegration**: Umfassende Abdeckung moderner Azure-Dienste und KI-Integrationsmuster  
- **Lernprogression**: Klare, strukturierte Entwicklung von Grundkonzepten zum Produktionseinsatz  

## 26. September 2025

### Case Studies Erweiterung – GitHub MCP Registry Integration

#### Case Studies (09-CaseStudy/) – Fokus auf Ökosystementwicklung  
- **README.md**: Bedeutende Erweiterung mit umfassender Fallstudie zur GitHub MCP Registry  
  - **GitHub MCP Registry Fallstudie**: Neue umfassende Analyse des GitHub MCP Registry-Starts im September 2025  
    - **Problemanalyse**: Detaillierte Untersuchung fragmentierter MCP-Server-Erkennung und Deployment-Herausforderungen  
    - **Lösungsarchitektur**: GitHubs zentralisierter Registry-Ansatz mit One-Click-VS-Code-Installation  
    - **Geschäftlicher Einfluss**: Messbare Verbesserungen bei Entwickler-Onboarding und Produktivität  
    - **Strategischer Wert**: Fokus auf modulare Agentenbereitstellung und Tool-übergreifende Interoperabilität  
    - **Ökosystementwicklung**: Positionierung als grundlegende Plattform für agentische Integration  
  - **Erweiterte Case Study-Struktur**: Überarbeitung aller sieben Fallstudien mit konsistenter Formatierung und umfassenden Beschreibungen  
    - Azure AI Reiseagenten: Schwerpunkt Multi-Agenten-Orchestrierung  
    - Azure DevOps Integration: Fokus auf Workflow-Automatisierung  
    - Echtzeit-Dokumentationsabruf: Python-Konsolenclient-Implementierung  
    - Interaktiver Lernplan-Generator: Chainlit Conversational Web-App  
    - In-Editor-Dokumentation: VS Code- und GitHub Copilot-Integration  
    - Azure API Management: Unternehmens-API-Integrationsmuster  
    - GitHub MCP Registry: Ökosystementwicklung und Community-Plattform  
  - **Umfassender Abschluss**: Neu geschriebener Schlussteil mit Hervorhebung der sieben Fallstudien über MCP-Implementierungsdimensionen hinweg  
    - Unternehmensintegration, Multi-Agenten-Orchestrierung, Entwicklerproduktivität  
    - Ökosystementwicklung, Bildungsklassifikationen  
    - Verbesserte Einblicke in Architekturpattern, Implementierungsstrategien und Best Practices  
    - Betonung von MCP als ausgereiftes, produktionsreifes Protokoll  

#### Lernleitfaden-Aktualisierungen (study_guide.md)  
- **Visuelle Curriculumsübersicht**: Aktualisierung der Mindmap zur Aufnahme der GitHub MCP Registry im Abschnitt Case Studies  
- **Fallstudienbeschreibung**: Ausarbeitung von allgemeinen Beschreibungen zu detaillierter Aufbereitung von sieben umfassenden Fallstudien  
- **Repository-Struktur**: Abschnitt 10 wurde zur umfassenden Fallstudienabdeckung mit spezifischen Implementierungsdetails aktualisiert  
- **Changelog-Integration**: Eintrag vom 26. September 2025 zur Dokumentation der GitHub MCP Registry-Hinzufügung und Case Study-Erweiterungen hinzugefügt  
- **Datumsaktualisierungen**: Footer-Zeitstempel zur neuesten Überarbeitung (26. September 2025) angepasst  

### Verbesserungen der Dokumentationsqualität  
- **Konsistenzsteigerung**: Vereinheitlichung der Fallstudienformatierung und -struktur bei allen sieben Beispielen  
- **Umfassende Abdeckung**: Fallstudien umfassen nun Unternehmens-, Entwicklerproduktivitäts- und Ökosystementwicklungsszenarien  
- **Strategische Positionierung**: Verstärkter Fokus auf MCP als grundlegende Plattform für agentische Systembereitstellung  
- **Ressourcenintegration**: Aktualisierte Zusatzressourcen mit GitHub MCP Registry-Link  

## 15. September 2025

### Erweiterung fortgeschrittener Themen – Benutzerdefinierte Transports & Kontext-Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) – Neue erweiterte Implementierungsanleitung  
- **README.md**: Vollständige Implementierungsanleitung für benutzerdefinierte MCP-Transportmechanismen  
  - **Azure Event Grid Transport**: Umfassende serverlose ereignisgesteuerte Transportimplementierung  
    - C#, TypeScript und Python Beispiele mit Azure Functions-Integration  
    - Ereignisgesteuerte Architekturpattern für skalierbare MCP-Lösungen  
    - Webhook-Empfänger und pushbasierte Nachrichtenverarbeitung  
  - **Azure Event Hubs Transport**: Hochdurchsatz-Streaming-Transportimplementierung  
    - Echtzeit-Streaming-Fähigkeiten für latenzarme Szenarien  
    - Partitionierungsstrategien und Checkpoint-Verwaltung  
    - Nachrichten-Batching und Leistungsoptimierung  
  - **Enterprise-Integrationsmuster**: Produktionsreife Architekturbeispiele  
    - Verteilte MCP-Verarbeitung über mehrere Azure Functions  
    - Hybride Transportarchitekturen mit mehreren Transportarten  
    - Nachrichtenhaltbarkeit, Zuverlässigkeit und Fehlerbehandlungsstrategien  
  - **Sicherheit & Monitoring**: Azure Key Vault-Integration und Beobachtbarkeitsmuster  
    - Managed Identity Authentifizierung und Least-Privilege-Zugriff  
    - Application Insights-Telemetrie und Performanceüberwachung  
    - Circuit Breaker- und Fehlertoleranzpatterns  
  - **Testframeworks**: Umfassende Teststrategien für benutzerdefinierte Transports  
    - Unit Testing mit Testdoubles und Mocking Frameworks  
    - Integrationstests mit Azure Test Containers  
    - Leistungs- und Lasttests  

#### Kontext-Engineering (05-AdvancedTopics/mcp-contextengineering/) – Aufkommende KI-Disziplin  
- **README.md**: Umfassende Erkundung von Kontext-Engineering als aufkommendes Fachgebiet  
  - **Kernprinzipien**: Vollständiges Kontextteilen, Handlungsentscheidungsbewusstsein und Kontextfenstermanagement  
  - **MCP-Protokollausrichtung**: Wie MCP-Design Herausforderungen des Kontext-Engineerings adressiert  
    - Kontextfensterbeschränkungen und progressive Lade-Strategien  
    - Relevanzbestimmung und dynamische Kontextabrufe  
    - Multimodale Kontextbehandlung und Sicherheitsaspekte  
  - **Implementierungsansätze**: Einzell-Thread- vs. Multi-Agent-Architekturen  
    - Kontextstückelung und Priorisierungstechniken  
    - Progressives Kontextladen und Komprimierungsstrategien  
    - Geschichtete Kontextansätze und Abrufoptimierung  
  - **Messrahmenwerk**: Aufkommende Metriken zur Bewertung der Kontextwirksamkeit  
    - Eingabeeffizienz, Leistung, Qualität und Nutzererfahrung  
    - Experimentelle Ansätze zur Kontextoptimierung  
    - Fehlermusteranalyse und Verbesserungsmethoden  

#### Curriculum-Navigation Updates (README.md)  
- **Verbesserte Modulstruktur**: Aktualisierter Lehrplantable mit neuen erweiterten Themen  
  - Hinzugefügt Context Engineering (5.14) und Custom Transport (5.15)  
  - Einheitliche Formatierung und Navigationslinks für alle Module  
  - Beschreibungen aktualisiert zur genauen Abbildung des aktuellen Inhaltsumfangs  

### Verbesserungen der Verzeichnisstruktur  
- **Benennungsstandardisierung**: Umbenennung von „mcp transport“ zu „mcp-transport“ zur Angleichung an andere erweiterte Themenordner  
- **Inhaltsorganisation**: Alle 05-AdvancedTopics-Ordner folgen nun einheitlichem Namensmuster (mcp-[topic])  

### Verbesserungen der Dokumentationsqualität  
- **MCP-Spezifikationsausrichtung**: Alle neuen Inhalte beziehen sich auf MCP Specification 2025-06-18  
- **Mehrsprachige Beispiele**: Umfassende Codebeispiele in C#, TypeScript und Python  
- **Enterprise-Fokus**: Produktionsreife Muster und Azure-Cloud-Integration durchgängig  
- **Visuelle Dokumentation**: Mermaid-Diagramme zur Architektur- und Ablaufvisualisierung  

## 18. August 2025

### Umfassendes Update der Dokumentation – MCP 2025-06-18 Standards

#### MCP Security Best Practices (02-Security/) – Komplette Modernisierung  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Vollständige Neufassung in Übereinstimmung mit MCP Specification 2025-06-18  
  - **Pflichtanforderungen**: Hinzufügen expliziter MUSS/MUSS-NICHT-Anforderungen aus offizieller Spezifikation mit klaren visuellen Markierungen  
  - **12 Kern-Sicherheitspraktiken**: Umstrukturierung von 15-Punkte-Liste zu umfassenden Sicherheitsdomänen  
    - Token-Sicherheit & Authentifizierung mit Integration externer Identitätsprovider  
    - Sitzungsmanagement & Transportsicherheit mit kryptographischen Anforderungen  
    - AI-spezifischer Bedrohungsschutz mit Microsoft Prompt Shields Integration  
    - Zugriffskontrolle & Berechtigungen mit Prinzip der minimalen Rechte  
    - Inhaltsicherheit & Überwachung mit Azure Content Safety Integration  
    - Lieferkettensicherheit mit umfassender Komponentenprüfung  
    - OAuth-Sicherheit & Verhinderung des Confused Deputy-Problems mit PKCE-Implementierung  
    - Vorfallreaktion & Wiederherstellung mit automatisierten Fähigkeiten  
    - Compliance & Governance mit regulatorischer Ausrichtung  
    - Erweiterte Sicherheitskontrollen mit Zero-Trust-Architektur  
    - Integration Microsoft Security-Ökosystem mit umfassenden Lösungen  
    - Kontinuierliche Sicherheitsevolution mit adaptiven Praktiken  
  - **Microsoft-Sicherheitslösungen**: Verbesserte Integrationshinweise für Prompt Shields, Azure Content Safety, Entra ID und GitHub Advanced Security  
  - **Implementierungsressourcen**: Kategorisierte umfassende Ressourcenlinks nach offizieller MCP-Dokumentation, Microsoft Security-Lösungen, Sicherheitsstandards und Implementation Guides  

#### Advanced Security Controls (02-Security/) – Enterprise-Implementierung  
- **MCP-SECURITY-CONTROLS-2025.md**: Komplette Überarbeitung mit enterprise-tauglichem Sicherheitsrahmenwerk  
  - **9 umfassende Sicherheitsdomänen**: Erweiterung von Basis-Controls zu detailliertem Enterprise-Rahmenwerk  
    - Erweiterte Authentifizierung & Autorisierung mit Microsoft Entra ID Integration  
    - Token-Sicherheit & Anti-Passthrough-Controls mit umfassender Validierung  
    - Sitzungssicherheits-Controls mit Hijackingschutz  
    - AI-spezifische Sicherheits-Controls mit Schutz vor Prompt Injection und Tool Poisoning  
    - Schutz vor Confused Deputy-Attacken mit OAuth Proxy-Sicherheit  
    - Toolsicherheit durch Sandboxing und Isolation  
    - Lieferkettensicherheitskontrollen mit Abhängigkeitsprüfung  
    - Monitoring- & Detektionskontrollen mit SIEM-Integration  
    - Vorfallreaktion & Wiederherstellung mit automatisierten Abläufen  
  - **Implementierungsbeispiele**: Hinzugefügte detaillierte YAML-Konfigurationsblöcke und Codebeispiele  
  - **Integration Microsoft-Lösungen**: Umfassende Abdeckung von Azure-Sicherheitsdiensten, GitHub Advanced Security und Enterprise-Identity-Management  

#### Advanced Topics Security (05-AdvancedTopics/mcp-security/) – Produktionsreife Umsetzung  
- **README.md**: Vollständige Neufassung für Enterprise-Sicherheitsimplementierung  
  - **Aktuelle Spezifikationsausrichtung**: Aktualisiert auf MCP Specification 2025-06-18 mit verpflichtenden Sicherheitsanforderungen  
  - **Erweiterte Authentifizierung**: Microsoft Entra ID Integration mit umfassenden .NET- und Java Spring Security-Beispielen  
  - **AI-Sicherheitsintegration**: Microsoft Prompt Shields und Azure Content Safety mit detaillierten Python-Beispielen  
  - **Erweiterte Bedrohungsminderung**: Umfassende Implementierungsbeispiele für  
    - Schutz vor Confused Deputy-Angriffen mit PKCE und Benutzerzustimmungsvalidierung  
    - Verhinderung von Token-Passthrough mit Audience-Validierung und sicherer Tokenverwaltung
    - Sitzungshijacking-Prävention mit kryptografischer Bindung und Verhaltensanalyse
  - **Enterprise-Sicherheitsintegration**: Azure Application Insights Monitoring, Bedrohungserkennungspipelines und Sicherheit der Lieferkette
  - **Implementierungs-Checkliste**: Klare Unterscheidung zwischen verpflichtenden und empfohlenen Sicherheitskontrollen mit Vorteilen des Microsoft-Sicherheitsökosystems

### Dokumentationsqualität & Standardausrichtung
- **Spezifikationsverweise**: Alle Verweise auf die aktuelle MCP-Spezifikation 2025-06-18 aktualisiert
- **Microsoft-Sicherheitsökosystem**: Verbesserte Integrationsanleitungen in der gesamten Sicherheitsdokumentation
- **Praktische Umsetzung**: Detaillierte Codebeispiele in .NET, Java und Python mit Enterprise-Patterns hinzugefügt
- **Ressourcenorganisation**: Umfassende Kategorisierung offizieller Dokumentationen, Sicherheitsstandards und Implementierungsleitfäden
- **Visuelle Indikatoren**: Klare Kennzeichnung von verpflichtenden Anforderungen vs. empfohlenen Vorgehensweisen


#### Kernkonzepte (01-CoreConcepts/) – Vollständige Modernisierung
- **Protokollversions-Update**: Verweis auf die aktuelle MCP-Spezifikation 2025-06-18 mit datumsbasierter Versionierung (YYYY-MM-DD-Format) aktualisiert
- **Architekturverfeinerung**: Erweiterte Beschreibungen von Hosts, Clients und Servern zur Abbildung aktueller MCP-Architektur-Patterns
  - Hosts sind jetzt klar als KI-Anwendungen definiert, die mehrere MCP-Client-Verbindungen koordinieren
  - Clients werden als Protokoll-Connectors beschrieben, die Eins-zu-eins-Serverbeziehungen aufrechterhalten
  - Server wurden um lokale vs. entfernte Bereitstellungsszenarien ergänzt
- **Primitive Neustrukturierung**: Vollständige Überarbeitung der Server- und Client-Primitives
  - Serverprimitives: Ressourcen (Datenquellen), Prompts (Vorlagen), Tools (ausführbare Funktionen) mit detaillierten Erklärungen und Beispielen
  - Clientprimitives: Sampling (LLM-Vervollständigungen), Elicitation (Benutzereingaben), Logging (Debugging/Monitoring)
  - Aktualisiert mit aktuellen Entdeckungs- (`*/list`), Abruf- (`*/get`) und Ausführungs- (`*/call`) Methodenmuster
- **Protokollarchitektur**: Einführung eines Zwei-Schichten-Architekturmodells
  - Datenschicht: JSON-RPC 2.0-Basis mit Lifecycle-Management und Primitives
  - Transportschicht: STDIO (lokal) und Streamable HTTP mit SSE (remote) Transportmechanismen
- **Sicherheitsrahmen**: Umfassende Sicherheitsprinzipien einschließlich expliziter Nutzerzustimmung, Datenschutz, Toolsicherheitsausführung und Transportschichtsicherheit
- **Kommunikationsmuster**: Aktualisierte Protokollnachrichten, die Initialisierung, Entdeckung, Ausführung und Benachrichtigungsabläufe zeigen
- **Codebeispiele**: Aktualisierte mehrsprachige Beispiele (.NET, Java, Python, JavaScript) zur Abbildung aktueller MCP-SDK-Patterns

#### Sicherheit (02-Security/) – Umfassende Sicherheitsüberholung  
- **Standardausrichtung**: Vollständige Übereinstimmung mit den Sicherheitsanforderungen der MCP-Spezifikation 2025-06-18
- **Authentifizierungsentwicklung**: Dokumentierte Entwicklung von kundenspezifischen OAuth-Servern zur Delegation an externe Identitätsanbieter (Microsoft Entra ID)
- **AI-spezifische Bedrohungsanalyse**: Erweiterte Abdeckung moderner KI-Angriffsvektoren
  - Detaillierte Szenarien zu Prompt Injection Angriffen mit praxisnahen Beispielen
  - Mechanismen von Tool-Vergiftung und "Rug Pull"-Angriffsmustern
  - Context Window Vergiftung und Modell-Verwirrungs-Angriffe
- **Microsoft AI-Sicherheitslösungen**: Umfassende Abdeckung des Microsoft-Sicherheitsökosystems
  - AI Prompt Shields mit fortschrittlicher Erkennung, Hervorhebung und Trenntechniken
  - Azure Content Safety Integrationsmuster
  - GitHub Advanced Security zum Schutz der Lieferkette
- **Erweiterte Bedrohungsminderung**: Detaillierte Sicherheitskontrollen für
  - Sitzungsentführung mit MCP-spezifischen Angriffsszenarien und kryptografischen Session-ID-Anforderungen
  - Confused Deputy Probleme in MCP-Proxy-Szenarien mit expliziten Zustimmungsanforderungen
  - Token-Passthrough-Schwachstellen mit verpflichtenden Validierungskontrollen
- **Lieferkettensicherheit**: Erweiterte AI-Lieferkettenabdeckung einschließlich Foundation Models, Embeddings-Services, Kontextanbieter und Drittanbieter-APIs
- **Foundation Security**: Verbesserte Integration mit Enterprise-Sicherheitsmustern einschließlich Zero Trust Architektur und Microsoft Sicherheitsökosystem
- **Ressourcenorganisation**: Kategorisierung umfassender Ressourcenlinks nach Typ (Offizielle Docs, Standards, Forschung, Microsoft-Lösungen, Implementierungsleitfäden)

### Verbesserungen der Dokumentationsqualität
- **Strukturierte Lernziele**: Verbesserung der Lernziele mit spezifischen, umsetzbaren Ergebnissen
- **Querverweise**: Hinzugefügte Links zwischen verbundenen Sicherheits- und Kernkonzeptthemen
- **Aktuelle Informationen**: Aktualisierung aller Datumsreferenzen und Spezifikationslinks auf aktuelle Standards
- **Implementierungsanleitungen**: Spezifische, umsetzbare Implementierungsrichtlinien in beiden Abschnitten ergänzt

## 16. Juli 2025

### README und Navigationsverbesserungen
- Vollständige Neugestaltung der Curriculumsnavigation in README.md
- Ersetzung der `<details>`-Tags durch ein barrierefreieres tabellenbasiertes Format
- Erstellung alternativer Layoutoptionen im neuen Ordner "alternative_layouts"
- Hinzufügen von Karten-basierten, tab- und Akkordeon-Stil Navigationsbeispielen
- Aktualisierung des Repository-Strukturabschnitts zur Aufnahme aller neuesten Dateien
- Verbesserung des Abschnitts "Wie man dieses Curriculum verwendet" mit klaren Empfehlungen
- Aktualisierung der MCP-Spezifikationslinks auf korrekte URLs
- Hinzufügen des Abschnitts Kontext Engineering (5.14) zur Curriculum-Struktur

### Aktualisierungen des Studienleitfadens
- Vollständige Überarbeitung des Studienleitfadens zur Angleichung an die aktuelle Repository-Struktur
- Neue Abschnitte für MCP-Clients und Tools sowie populäre MCP-Server hinzugefügt
- Visual Curriculum Map zur genauen Abbildung aller Themen aktualisiert
- Erweiterte Beschreibungen von Advanced Topics zur Abdeckung aller Spezialgebiete
- Aktualisierung des Abschnitts Fallbeispiele zur Abbildung tatsächlicher Beispiele
- Hinzufügen dieses umfassenden Änderungsprotokolls

### Community-Beiträge (06-CommunityContributions/)
- Detaillierte Informationen zu MCP-Servern für Bilderzeugung hinzugefügt
- Umfassender Abschnitt zur Nutzung von Claude in VSCode ergänzt
- Anleitung zur Einrichtung und Nutzung des Cline-Terminalclients hinzugefügt
- Aktualisierung des MCP-Client-Abschnitts zur Einbeziehung aller populären Clientoptionen
- Verbesserte Beitragsbeispiele mit präziseren Codebeispielen

### Advanced Topics (05-AdvancedTopics/)
- Organisation aller spezialisierten Themenordner mit konsistenter Benennung
- Hinzufügen von Kontext-Engineering-Materialien und Beispielen
- Dokumentation zur Foundry-Agenten-Integration ergänzt
- Verbesserte Dokumentation zur Entra ID Sicherheitsintegration

## 11. Juni 2025

### Erste Erstellung
- Veröffentlichung der ersten Version des MCP-for-Beginners-Curriculums
- Grundstruktur für alle 10 Hauptabschnitte erstellt
- Visual Curriculum Map zur Navigation implementiert
- Erste Beispielprojekte in mehreren Programmiersprachen hinzugefügt

### Getting Started (03-GettingStarted/)
- Erste Serverimplementierungsbeispiele erstellt
- Anleitung zur Cliententwicklung hinzugefügt
- Anleitungen zur LLM-Clientintegration eingearbeitet
- Dokumentation zur VS Code Integration ergänzt
- Beispiele für Server-Sent Events (SSE) Server implementiert

### Kernkonzepte (01-CoreConcepts/)
- Detaillierte Erklärung der Client-Server-Architektur hinzugefügt
- Dokumentation zu Schlüsselkomponenten des Protokolls erstellt
- Dokumentation der Messaging-Muster im MCP

## 23. Mai 2025

### Repository-Struktur
- Repository mit grundlegender Ordnerstruktur initialisiert
- README-Dateien für alle Hauptabschnitte erstellt
- Übersetzungsinfrastruktur eingerichtet
- Bildmaterial und Diagramme hinzugefügt

### Dokumentation
- Erste README.md mit Curriculum-Übersicht erstellt
- CODE_OF_CONDUCT.md und SECURITY.md hinzugefügt
- SUPPORT.md mit Anleitung zur Hilfe erstellt
- Vorläufige Struktur des Studienleitfadens erstellt

## 15. April 2025

### Planung und Rahmenkonzept
- Erste Planung des MCP-for-Beginners-Curriculums
- Lernziele und Zielgruppe definiert
- 10-Abschnitts-Struktur des Curriculums skizziert
- Konzeptueller Rahmen für Beispiele und Fallstudien entwickelt
- Erste Prototyp-Beispiele zu Schlüsselkonzepten erstellt

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->