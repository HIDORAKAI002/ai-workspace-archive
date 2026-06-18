# Änderungsprotokoll: MCP für Anfänger Curriculum

Dieses Dokument dient als Aufzeichnung aller bedeutenden Änderungen am Model Context Protocol (MCP) für Anfänger Curriculum. Änderungen werden in umgekehrt chronologischer Reihenfolge dokumentiert (neueste Änderungen zuerst).

## 16. Juni 2026

### MCP Spezifikationsausrichtung & Beispielvalidierung

Validierung des Curriculums gegen die aktuelle **MCP Spezifikation 2025-11-25** und die neuesten offiziellen SDKs, dann Korrektur der verbleibenden veralteten Spezifikationsverweise und Bestätigung, dass die Kernbeispiele weiterhin gebaut und ausgeführt werden.

#### Versionskorrekturen der Spezifikation (2025-06-18 / 2025-03-26 → 2025-11-25)

Englische Inhalte aktualisiert, wo noch behauptet wurde, eine ältere Spec-Revisions sei der *aktuelle/neuste* Standard, und Links auf die kanonischen `modelcontextprotocol.io` Spec-Pfade umgeleitet:
- **05-AdvancedTopics/mcp-security/README.md**: Aktualisierung des "Aktueller Standard" Banners, der Einführung, Überschrift der Kern-Sicherheitsprinzipien, Überschrift Pflichtanforderungen, Abschnitt Microsoft Entra ID, Referenzen & Ressourcen Links sowie abschließender Sicherheitshinweis (8 Verweise) auf 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aktualisierung des Spezifikationslinks für zusätzliche Ressourcen und des "Aktueller Standard" Banners auf 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Ersetzung des veralteten `2025-03-26` security-and-trust Links durch die aktuelle 2025-11-25 Seite zu Best Practices für Sicherheit
- **03-GettingStarted/14-sampling/README.md**: Aktualisierung des offiziellen Sampling-Dokumentationslinks auf 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Aktualisierung der Gegenwartsform "aktuelle MCP Spezifikation" Referenz sowie des Spezifikationslinks für zusätzliche Ressourcen auf 2025-11-25 (historische SSE-Deprecation Hinweise unverändert für Genauigkeit)

#### Validierung der Beispiele gegen aktuelle SDKs

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` löste `@modelcontextprotocol/sdk@1.29.0` auf; `tsc --noEmit` ohne Typfehler bestanden — bestehende `McpServer`/`StdioServerTransport` APIs bleiben gültig
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validierung in isoliertem `.venv` mit `mcp[cli]` (1.27.2); `py_compile` bestanden und `FastMCP.list_tools()` gab korrekt die Werkzeuge `add` und `subtract` zurück
- Bestätigung, dass alle Beispiel-`@modelcontextprotocol/sdk` Versionsbereiche (`>=1.26.0` / `^1.26.0` / `^1.27.0`) sauber auf die aktuelle `1.29.0` auflösen ohne inkompatible API-Änderungen

#### Abhängigkeits-Pin-Ausrichtung (Schließen von Versionslücken)

Veraltete SDK-Pins erhöht, sodass jedes Beispiel die aktuelle MCP-Version verfolgt und der repoweite Standard eingehalten wird:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Erhöhung von `@modelcontextprotocol/sdk` von `^1.8.0` auf `>=1.26.0` sowie Aktualisierung der veralteten Paketbeschreibung `"updated for MCP 2025-06-18"` zu `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** und **lab4/code/github_mcp_server/pyproject.toml**: Erhöhung des genauen Pins `mcp==1.23.0` auf `mcp>=1.26.0`; beide `uv.lock` Dateien (`uv lock`) erneut generiert, damit die Lockfiles auf das aktuelle `mcp 1.27.2` auflösen und synchron mit den Manifesten bleiben

#### Curriculum-Lücken-Analyse — Abdeckung der neuesten Spezifikationsmerkmale

Bestätigt, dass das Curriculum bereits alle in MCP 2025-11-25 eingeführten/erweiterten Primitiven abdeckt, sodass keine Inhaltslücken bestehen:
- **Sampling**: Lektion 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-Modus)**: Dokumentiert in 01-CoreConcepts und 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumentiert in 00-Introduction, 01-CoreConcepts und 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimentell, lang laufende Operationen)**: Dokumentiert in 01-CoreConcepts und 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotations** (`readOnlyHint` / `destructiveHint`): Dokumentiert in 01-CoreConcepts und 05-AdvancedTopics/mcp-protocol-features

### Sicherheitshärtung & Behebung von Abhängigkeits-Sicherheitslücken

Durchführung eines vollständigen Sicherheitsscans über jedes Abhängigkeitsmanifest und den Beispielquellcode, danach Behebung aller gemeldeten npm Advisories und eines sicherheitsrelevanten Findings im Code. Nach Behebung meldet `npm audit` **0 Sicherheitslücken** in allen geprüften Verzeichnissen.

#### npm Abhängigkeits-Sicherheitslücken (transitiv) — Behoben

Audit aller 15 committeten `package-lock.json` Dateien. Sicherheitslücken betrafen ausschließlich transitive Abhängigkeiten der MCP Inspector Dev-Tool, des OpenAI Client und des MCP SDK; alle wurden nun ohne Bruch der Beispiele gelöst:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** und **lab3/code/weather_mcp/inspector**: Erhöhung von `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), beseitigte die gebündelten Advisories für `ajv`, `brace-expansion`, `diff`, `path-to-regexp` und `ws`. Hinzugefügt ein npm `overrides` Eintrag, der das gepatchte `shell-quote@1.8.4` erzwingt und somit die letzte kritische Advisory von `concurrently` eliminiert; beide Lockfiles neu generiert (jetzt 0 Sicherheitslücken)
- **03-GettingStarted/samples/typescript**: `npm audit fix` aktualisierte die transitive moderate `qs` auf eine gepatchte Version
- **03-GettingStarted/samples/javascript**: `npm audit fix` aktualisierte die transitive moderate `hono` auf eine gepatchte Version
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` aktualisierte die transitive hohe `form-data` auf eine gepatchte Version
- **03-GettingStarted/11-simple-auth/solution/typescript**: Fehlende `package-lock.json` erzeugt, damit das Projekt reproduzierbar und auditierbar ist (0 Sicherheitslücken)

#### Sicherheitsreparatur auf Codeebene (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Entferntes `shell=True` aus dem `open_in_vscode` Werkzeug. Das vorherige `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` erlaubte, dass Shell-Metazeichen in einem Ordnerpfad von `cmd.exe` interpretiert werden (Befehlsinjektionsvektor). Nun wird das aufgelöste `Code.exe` direkt mit dem Ordner als Argument gestartet — keine Shell — was funktional gleichwertig und sicher ist

#### Python Abhängigkeitsprüfung

- Alle Python-Anforderungssätze mit `pip-audit` geprüft. `05-AdvancedTopics` und `03-GettingStarted/samples/python` meldeten **keine bekannten Sicherheitslücken** (deren `mcp` / `httpx` / `pydantic` / `python-dotenv` Bereiche lösen auf aktuelle gepatchte Versionen auf)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` meldete die transitive Abhängigkeit **`werkzeug` 3.1.1** mit drei `safe_join` Windows-Gerätenamen DoS Advisories — `CVE-2025-66221`, `CVE-2026-21860` und `CVE-2026-27199` (alle in 3.1.6 behoben). Expliziter Sicherheits-Pin `werkzeug>=3.1.6` hinzugefügt, sodass gepatchte Version aufgelöst wird; Nachweis, dass die Beschränkung sauber mit dem `chainlit` / `mcp` / `semantic-kernel` Stack aufgelöst wird

### Produktnamen-Rebranding

Alle Curriculum-Inhalte aktualisiert, um Microsofts Produkt-Rebranding widerzuspiegeln:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Aktualisierung des Discord-Community-Links
- **AGENTS.md**: Aktualisierung des Discord-Server-Verweises
- **README.md**: Aktualisierung der Technologie-Ökosystem-Verweise
- **study_guide.md**: Aktualisierung der Fallstudien-Verweise
- **05-AdvancedTopics/README.md**: Aktualisierung des Moduls 5.13 Titels und Beschreibung
- **05-AdvancedTopics/mcp-integration/README.md**: Aktualisierung des Abschnitt-Headers und Beschreibung
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Komplettes Modul-Titel- und Inhaltsupdate
- **05-AdvancedTopics/mcp-security-entra/README.md**: Aktualisierung der Querverweisliste
- **07-LessonsfromEarlyAdoption/README.md**: Aktualisierung der Fallstudien-Verweise
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Aktualisierung Abschnitt 9 Überschrift, Badges und Funktionalitäten
- **08-BestPractices/README.md**: Aktualisierung des Discord-Community-Links
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Aktualisierung des Discord-Kanal-Verweises
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Aktualisierung des Modellbereitstellungs-Verweises
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Aktualisierung der AI-Services-Tabelle
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Aktualisierung der Ressourcenverweise

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension für VS Code
- **README.md**: Aktualisierung der Haupt-Curriculum-Verweise
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aktualisierung des Modultitels, Überblicks und aller Modulüberschriften
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aktualisierung Titel, Lernziele, Setup-Anleitungen und Ressourcen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aktualisierung Titel, Lernziele, MCP Hosts Tabelle und Querverweise
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aktualisierung Titel, Badges, Voraussetzungen und Ressourcen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aktualisierung Verweise auf Agent Builder und Feedback-Link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aktualisierung Voraussetzungen und Erweiterungsverweise

---

## 11. April 2026

### Neue Lektion, Dokumentationskorrekturen und Abhängigkeitsaktualisierungen

#### Neuer Curriculum-Inhalt hinzugefügt

**Modul 05 – Fortgeschrittene Themen**
- **Lektion 5.17: Adversarial Multi-Agent Reasoning mit MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Neuer umfassender Leitfaden zum adversarial debate Pattern für Multi-Agent-Systeme
  - Mermaid Architekturdiagramm: zwei Agenten → geteilter MCP-Server → Debatten-Transkript → Richter → Urteil
  - Gemeinsamer MCP Tool-Server (`web_search` + `run_python`) in Python und TypeScript implementiert
  - Gegensätzliche System-Prompts (FÜR / GEGEN / Richter) mit expliziten Anforderungen an Tool-Nutzung
  - Debatten-Orchestrator in Python, TypeScript und C# verwaltet Runden und argumentativen Ablauf
  - MCP `ClientSession` Anbindung für den Orchestrator an reale Tool-Aufrufe
  - Anwendungsfall-Tabelle (Halluzinationserkennung, Bedrohungsmodellierung, API-Design-Review, Faktenprüfung, Technikauswahl)
  - Sicherheitsüberlegungen: Sandbox-Ausführung, Tool-Aufrufvalidierung, Ratenbegrenzung, Audit-Logging
  - Strukturierte Übung mit drei praktischen Szenarien (Code-Review, Architekturentscheidung, Inhaltsmoderation)

#### Dokumentationskorrekturen

**Modul 03 – Einstieg**
- **05-stdio-server/README.md**: Fehlerbehebung bei unvollständigem TypeScript stdio server Beispiel — fehlende Transport-Instanziierung (`new StdioServerTransport()`) und `server.connect(transport)` Aufruf hinzugefügt, um mit Python- und .NET-Beispielen im selben Abschnitt übereinzustimmen
- **14-sampling/README.md**: Tippfehler korrigiert — von `"Sampling is an davanced features"` zu `"Sampling is an advanced feature"`

#### Curriculum-Aktualisierungen

**Haupt-README.md**
- Eintrag 5.17 (Adversarial Multi-Agent Reasoning mit MCP) zur Curriculum-Tabelle mit direktem Link zur neuen Lektion hinzugefügt

**05-AdvancedTopics/README.md**
- Lektion 5.17 Zeile zur Lektionentabelle hinzugefügt

**study_guide.md**
- Thema Adversarial Multi-Agent Reasoning zur Mindmap und Fließtextbeschreibung der Fortgeschrittenen Themen hinzugefügt

#### Code- und Sicherheitsfixes

**Modul 05 – Adversarial Agents (`mcp-adversarial-agents`)**
- **Sicherheitsfix — Befehlsinjektion**: Ersetzung der `execSync` Shell-Interpolation durch `execFile` + `promisify` im TypeScript `run_python` Werkzeug, wodurch die Angriffsfläche für Befehlsinjektion entfällt (LLM-kontrollierter Code wird jetzt als Literal-argv-Element ohne Shell-Zwischenstufe übergeben)
- **MCP-Tool-Loop-Verdrahtung**: Den Python-Debattenorchestrator aktualisiert, um den `AsyncAnthropic`-Client zu verwenden (ersetzt das blockierende synchrone `Anthropic`), eine Live-`ClientSession` direkt an jede Agentenrunde zu übergeben, Tool-Definitionen über `session.list_tools()` in jeder Runde abzurufen und `tool_use`-Blöcke per `session.call_tool()` in einer Schleife zu senden, bis das Modell eine finale Textantwort ausgibt

#### Abhängigkeitsaktualisierungen

- `hono` auf 4.12.12 in mehreren Paketen erhöht (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- `@hono/node-server` von 1.19.11 auf 1.19.13 in TypeScript-Paketen erhöht
- `cryptography` von 46.0.5 auf 46.0.7 in Python-Paketen (10-StreamliningAIWorkflows Labs 3 und 4) erhöht
- `lodash` von 4.17.23 auf 4.18.1 im 10-StreamliningAIWorkflows Inspector erhöht

#### Übersetzungen

- Übersetzungen für 48+ Sprachen mit den neuesten Quelländerungen synchronisiert (i18n-Update)

---

## 5. Februar 2026

### Repository-weite Validierungs- und Navigationsverbesserungen

#### Neuer Curriculum-Inhalt hinzugefügt

**Modul 03 - Erste Schritte**
- **12-mcp-hosts/README.md**: Neuer umfassender Leitfaden zur Einrichtung von MCP Hosts
  - Konfigurationsbeispiele für Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-Konfigurationsvorlagen für alle großen Hosts
  - Vergleichstabelle der Transporttypen (stdio, SSE/HTTP, WebSocket)
  - Fehlerbehebung bei häufigen Verbindungsproblemen
  - Sicherheitsbest Practices für Host-Konfiguration

- **13-mcp-inspector/README.md**: Neuer Debugging-Leitfaden für MCP Inspector
  - Installationsmethoden (npx, globales npm, aus dem Quellcode)
  - Verbindung zu Servern via stdio und HTTP/SSE
  - Testwerkzeuge, Ressourcen und Prompts-Workflows
  - VS Code-Integration mit MCP Inspector
  - Häufige Debugging-Szenarien mit Lösungen

**Modul 04 - Praktische Umsetzung**
- **pagination/README.md**: Neuer Leitfaden zur Pagination-Implementierung
  - Cursor-basierte Paginierungsmuster in Python, TypeScript, Java
  - Client-seitige Paginierungshandhabung
  - Cursor-Designstrategien (opaque vs. strukturiert)
  - Empfehlungen zur Leistungsoptimierung

**Modul 05 - Fortgeschrittene Themen**
- **mcp-protocol-features/README.md**: Neue tiefgehend beschriebenen Protokollfeatures
  - Implementierung von Fortschrittsbenachrichtigungen
  - Muster zur Anfragestornierung
  - Ressourcentemplates mit URI-Mustern
  - Verwaltung des Server-Lebenszyklus
  - Steuerung der Protokollierungsebene
  - Muster zur Fehlerbehandlung mit JSON-RPC-Codes

#### Navigationskorrekturen (24+ Dateien aktualisiert)

**Hauptmodul-READMEs**  
Jetzt Verlinkungen zur ersten Lektion UND zum nächsten Modul

**02-Security Unterdateien**  
Alle 5 ergänzenden Sicherheitsdokumente haben jetzt "Was kommt als Nächstes" Navigation:

**09-CaseStudy Dateien**  
Alle Fallstudien-Dateien haben jetzt eine sequentielle Navigation:

**10-StreamliningAI Labs**  
"Hinzufügen der Abschnitt 'Was kommt als Nächstes' zur Modul 10 Übersicht und Modul 11

#### Code- und Inhaltskorrekturen

**SDK- und Abhängigkeitsupdates**  
Leerer openai Versionseintrag auf `^4.95.0` korrigiert  
SDK von `^1.8.0` auf `>=1.26.0` aktualisiert  
mcp Versionsbegrenzungen auf `>=1.26.0` erhöht

**Codekorrekturen**  
Ungültiges Modell `gpt-4o-mini` auf `gpt-4.1-mini` korrigiert

**Inhaltskorrekturen**  
Kaputter Link `READMEmd` → `README.md` korrigiert, Curriculum-Überschrift `Module 1-3` → `Module 0-3` korrigiert, Groß-/Kleinschreibung Pfadfehler korrigiert  
Korrupte Duplikate des Case Study 5-Inhalts entfernt

**Anfängernavigation verbessert**  
Richtige Einführung, Lernziele sowie Voraussetzungen für Anfänger hinzugefügt

#### Curriculum-Aktualisierungen

**Haupt README.md**  
Einträge 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginierung), 5.16 (Protokoll-Features) zur Curriculums-Tabelle hinzugefügt

**Modul-READMEs**  
Lektionen 12 und 13 zur Lektionenliste hinzugefügt  
Praktische Leitfaden-Sektion mit Link zu Paginierung hinzugefügt  
Lektionen 5.15 (Custom Transport) und 5.16 (Protocol Features) hinzugefügt

**study_guide.md**  
Mindmap mit allen neuen Themen aktualisiert: MCP Hosts Setup, MCP Inspector, Pagination-Strategien, Protokoll-Features Deep Dive

## 28. Januar 2026

### MCP-Spezifikation 2025-11-25 Compliance-Überprüfung

#### Verbesserung der Kernkonzepte (01-CoreConcepts/)  
- **Neues Client-Primitiv – Roots**: Umfassende Dokumentation zur Roots Client-Primitiv hinzugefügt, die es Servern erlaubt, Dateisystemgrenzen und Zugriffsrechte zu verstehen  
- **Tool-Anmerkungen**: Dokumentation zu Verhaltensanmerkungen von Tools (`readOnlyHint`, `destructiveHint`) für bessere Entscheidungen bei der Tool-Ausführung hinzugefügt  
- **Toolaufruf im Sampling**: Sampling-Dokumentation aktualisiert, um `tools` und `toolChoice` Parameter für modellgesteuerte Toolaufrufe während Sampling-Anfragen zu enthalten  
- **URL-Modus Elicitation**: Dokumentation zum URL-basierten Elicitation für serverinitiierte externe Webinteraktionen ergänzt  
- **Tasks (Experimentell)**: Neuer Abschnitt mit Dokumentation der experimentellen Tasks-Funktion für langlebige Ausführungshüllen und verzögerte Ergebnisausgabe hinzugefügt  
- **Icons-Unterstützung**: Hinweis hinzugefügt, dass Tools, Ressourcen, Ressourcentemplates und Prompts jetzt Symbole als zusätzliche Metadaten enthalten können

#### Dokumentations-Updates  
- **README.md**: MCP Spezifikation 2025-11-25 Versionsreferenz und erklärende Datumsbasierte Versionierung hinzugefügt  
- **study_guide.md**: Curriculum-Map aktualisiert, um Tasks und Tool-Anmerkungen im Core Concepts Abschnitt einzubeziehen; Dokumentzeitstempel aktualisiert

#### Spezifikationskonformität verifiziert  
- **Protokollversion**: Alle Dokumentationsreferenzen auf aktuelle MCP Spezifikation 2025-11-25 geprüft  
- **Architekturausrichtung**: Architektur zweischichtig (Daten- + Transportebene) bestätigt  
- **Primitiv-Dokumentation**: Server-Primitiven (Ressourcen, Prompts, Tools) und Client-Primitiven (Sampling, Elicitation, Logging, Roots) validiert  
- **Transportmechanismen**: STDIO- und HTTP Streaming-Transportdokumentation überprüft  
- **Sicherheitshinweise**: Übereinstimmung mit aktuellen MCP Sicherheitsbest Practices bestätigt

#### Wichtige MCP 2025-11-25 Features dokumentiert  
- **OpenID Connect Discovery**: Authentifizierungsserver Discovery via OIDC  
- **OAuth Client-ID Metadokumente**: Empfohlenes Client-Registrierungsverfahren  
- **JSON-Schema 2020-12**: Standarddialekt für MCP Schemadefinitionen  
- **SDK-Stufensystem**: Formalisierte Anforderungen für SDK Feature-Support und Wartung  
- **Governance-Struktur**: Formalisierte Arbeits- und Interessengruppen in MCP Governance

### Wichtige Sicherheitsdokumentationsaktualisierung (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Integration  
- **Neue praktische Trainingsressource**: Umfassende Integration mit dem [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) in allen Sicherheitsdokumentationen  
- **Expeditionsroutenabdeckung**: Vollständiger Camp-zu-Camp Fortschritt vom Basislager bis zum Gipfel dokumentiert  
- **OWASP-Übereinstimmung**: Alle Sicherheitshinweise auf Risiken im OWASP MCP Azure Security Guide abgebildet

#### OWASP MCP Top 10 Integration  
- **Neuer Abschnitt**: OWASP MCP Top 10 Sicherheitsrisiken Tabelle mit Azure-Minderungen in Haupt-Security README eingefügt  
- **Risiko-basierte Dokumentation**: mcp-security-controls-2025.md mit OWASP MCP Risiko-Referenzen für jedes Sicherheitsdomäne aktualisiert  
- **Referenzarchitektur**: Verlinkung auf OWASP MCP Azure Security Guide Referenzarchitektur und Implementierungsmuster

#### Aktualisierte Sicherheitsdateien  
- **README.md**: Sherpa Workshop Übersicht, Expeditionsroutentabelle, OWASP MCP Top 10 Risikosumme und Hands-On Trainingsabschnitt hinzugefügt  
- **mcp-security-controls-2025.md**: Header auf Februar 2026 aktualisiert, OWASP Risiko-Verweise (MCP01-MCP08) hinzugefügt, Inkonsistenz bei Spezifikationsversion behoben  
- **mcp-security-best-practices-2025.md**: Sherpa- und OWASP-Ressourcenabschnitt hinzugefügt, Zeitstempel aktualisiert  
- **mcp-best-practices.md**: Hands-On Trainingsabschnitt mit Sherpa- und OWASP-Links ergänzt  
- **azure-content-safety-implementation.md**: OWASP MCP06 Referenz, Sherpa Camp 3 Ausrichtung und zusätzlicher Ressourcenabschnitt ergänzt

#### Neue Ressourcen-Links hinzugefügt  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Einzelne OWASP MCP Risiko-Seiten (MCP01-MCP10)

### Curriculum-weite MCP Spezifikation 2025-11-25 Ausrichtung

#### Modul 03 - Erste Schritte  
- **SDK-Dokumentation**: Go SDK zur offiziellen SDK-Liste hinzugefügt; alle SDK-Referenzen an MCP Spezifikation 2025-11-25 angepasst  
- **Transport Klarstellung**: STDIO und HTTP Streaming Transportbeschreibungen mit expliziten Spezifikationsreferenzen aktualisiert

#### Modul 04 - Praktische Umsetzung  
- **SDK-Updates**: Go SDK hinzugefügt; SDK-Liste mit Spezifikationsversionsverweis aktualisiert  
- **Autorisierungspezifikation**: MCP-Autorisierungsspezifikation Link auf aktuelle 2025-11-25 Version aktualisiert

#### Modul 05 - Fortgeschrittene Themen  
- **Neue Features**: Hinweis zu neuen MCP Spezifikation 2025-11-25 Features (Tasks, Tool-Anmerkungen, URL Modus Elicitation, Roots) hinzugefügt  
- **Sicherheitsressourcen**: OWASP MCP Top 10 und Sherpa Workshop Links zu zusätzlichen Referenzen ergänzt

#### Modul 06 - Community-Beiträge  
- **SDK-Liste**: Swift und Rust SDKs hinzugefügt; Spezifikationslink auf 2025-11-25 aktualisiert  
- **Spec-Referenz**: MCP Spezifikationslink auf direkte Spezifikations-URL aktualisiert

#### Modul 07 - Lektionen aus früher Einführung  
- **Ressourcen-Updates**: MCP Spezifikation 2025-11-25 Link und OWASP MCP Top 10 zu zusätzlichen Ressourcen hinzugefügt

#### Modul 08 - Best Practices  
- **Spezifikationsversion**: MCP Spezifikationsreferenz auf 2025-11-25 aktualisiert  
- **Sicherheitsressourcen**: OWASP MCP Top 10 und Sherpa Workshop zu zusätzlichen Referenzen hinzugefügt

#### Modul 10 - Streamlining AI Workflows  
- **Abzeichenuppdate**: MCP Versions-Badge von SDK-Version (1.9.3) auf Spezifikationsversion (2025-11-25) geändert  
- **Ressourcen-Links**: MCP Spezifikationslink aktualisiert; OWASP MCP Top 10 hinzugefügt

#### Modul 11 - MCP Server Hands-On Labs  
- **Spec-Referenz**: MCP Spezifikationslink auf 2025-11-25 Version aktualisiert  
- **Sicherheitsressourcen**: OWASP MCP Top 10 zu offiziellen Ressourcen hinzugefügt

## 18. Dezember 2025

### Aktualisierung der Sicherheitsdokumentation - MCP Spezifikation 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Versionsupdate der Spezifikation  
- **Protokollversions-Update**: Verweis auf neueste MCP Spezifikation 2025-11-25 (veröffentlicht am 25. November 2025) aktualisiert  
  - Alle Versionsreferenzen von 2025-06-18 auf 2025-11-25 geändert  
  - Dokumentdatum von 18. August 2025 auf 18. Dezember 2025 aktualisiert  
  - Alle Spezifikations-URLs auf aktuelle Dokumentation überprüft  
- **Inhaltsvalidierung**: Umfassende Validierung der Sicherheitsbest Practices gegen neueste Standards  
  - **Microsoft Sicherheitslösungen**: Terminologie und Links zu Prompt Shields (früher „Jailbreak Risikoerkennung“), Azure Content Safety, Microsoft Entra ID und Azure Key Vault verifiziert  
  - **OAuth 2.1 Sicherheit**: Übereinstimmung mit aktuellen OAuth Sicherheitsbest Practices bestätigt  
  - **OWASP-Standards**: OWASP Top 10 für LLMs Referenzen als aktuell bestätigt  
  - **Azure-Dienste**: Alle Microsoft Azure Dokumentationslinks und Best Practices überprüft  
- **Standards-Ausrichtung**: Alle referenzierten Sicherheitsstandards als aktuell verifiziert  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 Security Best Practices  
  - Azure Sicherheits- und Compliance-Frameworks  
- **Implementierungsressourcen**: Alle Implementierungsleitfaden-Links und Ressourcen validiert  
  - Azure API Management Authentifizierungsmuster  
  - Microsoft Entra ID Integrationsanleitungen  
  - Azure Key Vault Geheimnismanagement  
  - DevSecOps-Pipelines und Monitoring-Lösungen

### Dokumentations-Qualitätssicherung  
- **Spezifikationskonformität**: Sicherstellung, dass alle vorgeschriebenen MCP Sicherheitsanforderungen (MUSS/MUSS NICHT) mit der neuesten Spezifikation übereinstimmen  
- **Ressourcenkontrolle**: Alle externen Links zu Microsoft-Dokumentationen, Sicherheitsstandards und Implementierungsleitfäden überprüft  
- **Best Practices Abdeckung**: Umfassende Abdeckung von Authentifizierung, Autorisierung, KI-spezifischen Bedrohungen, Lieferkettensicherheit und Unternehmensmustern bestätigt

## 6. Oktober 2025

### Erweiterung des Abschnitts Erste Schritte – Erweiterte Servernutzung & einfache Authentifizierung

#### Erweiterte Servernutzung (03-GettingStarted/10-advanced)  
- **Neues Kapitel hinzugefügt**: Umfassender Leitfaden zur erweiterten MCP-Servernutzung, der sowohl reguläre als auch Low-Level-Server-Architekturen abdeckt  
  - **Regulärer vs. Low-Level Server**: Detaillierter Vergleich und Codebeispiele in Python und TypeScript für beide Ansätze  
  - **Handler-basierte Gestaltung**: Erläuterung der handlerbasierten Werkzeug-/Ressourcen-/Promptverwaltung für skalierbare, flexible Serverimplementierungen  
  - **Praktische Muster**: Anwendungsbeispiele, bei denen Low-Level-Servermuster für fortgeschrittene Features und Architektur vorteilhaft sind
#### Einfache Authentifizierung (03-GettingStarted/11-simple-auth)
- **Neues Kapitel Hinzugefügt**: Schritt-für-Schritt-Anleitung zur Implementierung einfacher Authentifizierung in MCP-Servern.
  - **Auth-Konzepte**: Klare Erklärung von Authentifizierung vs. Autorisierung und Umgang mit Zugangsdaten.
  - **Basis-Auth-Implementierung**: Middleware-basierte Authentifizierungsmuster in Python (Starlette) und TypeScript (Express) mit Codebeispielen.
  - **Fortschritt zu Erhöhter Sicherheit**: Anleitung zum Einstieg mit einfacher Authentifizierung und Weiterentwicklung zu OAuth 2.1 und RBAC, mit Verweisen auf fortgeschrittene Sicherheitsmodule.

Diese Ergänzungen bieten praktische, praxisorientierte Anleitung zum Aufbau robusterer, sichererer und flexiblerer MCP-Serverimplementierungen und verbinden grundlegende Konzepte mit fortgeschrittenen Produktionsmustern.

## 29. September 2025

### MCP Server Datenbankintegration Labs – Umfassender praktischer Lernpfad

#### 11-MCPServerHandsOnLabs – Neue vollständige Datenbankintegrations-Lehrplan
- **Vollständiger 13-Lab Lernpfad**: Hinzugefügter umfassender Praxislehrplan zum Aufbau produktionsreifer MCP-Server mit PostgreSQL-Datenbankintegration
  - **Praxisnahe Umsetzung**: Zava Retail Analytics-Anwendungsfall mit Demonstration von Unternehmensmustern
  - **Strukturierter Lernfortschritt**:
    - **Labs 00–03: Grundlagen** – Einführung, Kernarchitektur, Sicherheit & Multi-Tenancy, Umgebungseinrichtung
    - **Labs 04–06: Aufbau des MCP-Servers** – Datenbankdesign & Schema, MCP-Server-Implementierung, Werkzeugentwicklung
    - **Labs 07–09: Erweiterte Funktionen** – Semantische Suche Integration, Testing & Debugging, VS Code Integration
    - **Labs 10–12: Produktion & Best Practices** – Bereitstellungsstrategien, Überwachung & Beobachtbarkeit, Best Practices & Optimierung
  - **Enterprise-Technologien**: FastMCP Framework, PostgreSQL mit pgvector, Azure OpenAI-Embeddings, Azure Container Apps, Application Insights
  - **Erweiterte Features**: Row Level Security (RLS), semantische Suche, mandantenfähiger Datenzugriff, Vektor-Embeddings, Echtzeit-Überwachung

#### Terminologiestandardisierung – Modul-zu-Lab-Konversion
- **Umfassendes Dokumentationsupdate**: Systematische Aktualisierung aller README-Dateien in 11-MCPServerHandsOnLabs zur Verwendung des Begriffs „Lab“ statt „Modul“
  - **Abschnittsüberschriften**: „Was dieses Modul abdeckt“ zu „Was dieses Lab abdeckt“ in allen 13 Labs geändert
  - **Inhaltsbeschreibung**: „Dieses Modul bietet...“ zu „Dieses Lab bietet...“ in der gesamten Dokumentation geändert
  - **Lernziele**: „Am Ende dieses Moduls...“ zu „Am Ende dieses Labs...“ aktualisiert
  - **Navigationslinks**: Alle „Modul XX:“ Verweise zu „Lab XX:“ in Querverweisen und Navigation geändert
  - **Abschlussverfolgung**: „Nach Abschluss dieses Moduls...“ zu „Nach Abschluss dieses Labs...“ angepasst
  - **Technische Verweise Beibehalten**: Python-Modulreferenzen in Konfigurationsdateien (z. B. `"module": "mcp_server.main"`) unverändert gelassen

#### Verbesserungen der Studienanleitung (study_guide.md)
- **Visuelle Lehrplanübersicht**: Neuer Abschnitt „11. Database Integration Labs“ mit umfassender Lab-Struktur-Visualisierung hinzugefügt
- **Repository-Struktur**: Von zehn auf elf Hauptabschnitte aktualisiert mit detaillierter Beschreibung von 11-MCPServerHandsOnLabs
- **Anleitungspfad**: Navigationshinweise erweitert zur Abdeckung der Abschnitte 00–11
- **Technologieabdeckung**: Details zu FastMCP, PostgreSQL, Azure-Diensteintegration hinzugefügt
- **Lernergebnisse**: Betonung auf produktionsfertige Serverentwicklung, Datenbankintegration und Unternehmenssicherheit

#### Strukturverbesserung der Haupt-README
- **Lab-basierte Terminologie**: Haupt-README.md in 11-MCPServerHandsOnLabs konsequent auf „Lab“ umgestellt
- **Lernpfad Organisation**: Klarer Fortschritt von Grundlagen über fortgeschrittene Implementierung bis zur Produktionsbereitstellung
- **Praxisfokus**: Betonung auf praktischem Lernen mit Unternehmensmustern und Technologien

### Verbesserungen in Dokumentationsqualität & Konsistenz
- **Praxisorientierter Ansatz**: Verstärkung des praktischen, lab-basierten Lernansatzes in der gesamten Dokumentation
- **Enterprise-Muster Schwerpunkt**: Hervorhebung produktionsreifer Implementierungen und Unternehmenssicherheitsaspekte
- **Technologieintegration**: Umfassende Berücksichtigung moderner Azure-Dienste und KI-Integrationsmuster
- **Lernprogression**: Klarer, strukturierter Weg von Basiswissen bis zur Produktionsbereitstellung

## 26. September 2025

### Fallstudien Erweiterung – GitHub MCP Registry Integration

#### Fallstudien (09-CaseStudy/) – Fokus auf Ökosystementwicklung
- **README.md**: Umfangreiche Erweiterung mit ausführlicher GitHub MCP Registry-Fallstudie
  - **GitHub MCP Registry Case Study**: Neue umfassende Fallstudie zur Einführung des GitHub MCP Registry im September 2025
    - **Problemanalyse**: Detaillierte Untersuchung fragmentierter MCP-Servererkennung und Bereitstellungsprobleme
    - **Lösungsarchitektur**: GitHubs zentraler Registry-Ansatz mit One-Click VS Code Installation
    - **Geschäftlicher Nutzen**: Messbare Verbesserungen bei Entwickler-Onboarding und Produktivität
    - **Strategischer Wert**: Fokus auf modulare Agentenbereitstellung und Werkzeuginteroperabilität
    - **Ökosystementwicklung**: Positionierung als grundlegende Plattform für agentische Integration
  - **Verbesserte Fallstudienstruktur**: Aktualisierung aller sieben Fallstudien mit einheitlicher Formatierung und ausführlichen Beschreibungen
    - Azure AI Reiseagenten: Fokus auf Multi-Agenten-Orchestrierung
    - Azure DevOps Integration: Workflow-Automatisierungsschwerpunkt
    - Echtzeit-Dokumentationsabruf: Python-Konsolenclient-Implementierung
    - Interaktiver Studienplan-Generator: Chainlit-Konversations-Web-App
    - In-Editor-Dokumentation: VS Code und GitHub Copilot Integration
    - Azure API Management: Enterprise-API-Integrationsmuster
    - GitHub MCP Registry: Ökosystementwicklung und Community-Plattform
  - **Umfassender Abschluss**: Neuer Abschnitt mit sieben Fallstudien, die unterschiedliche MCP-Implementierungsdimensionen abdecken
    - Unternehmensintegration, Multi-Agent-Orchestrierung, Entwicklerproduktivität
    - Ökosystementwicklung, Bildungskategorisierung
    - Erweiterte Einblicke in Architektur-, Implementierungsstrategien und Best Practices
    - Betonung MCP als ausgereiftes, produktionsbereites Protokoll

#### Updates in der Studienanleitung (study_guide.md)
- **Visuelle Lehrplanübersicht**: Mindmap mit GitHub MCP Registry in Fallstudiensektor erweitert
- **Fallstudienbeschreibung**: Von generischen zu detaillierten Beschreibungen von sieben umfassenden Fallstudien erweitert
- **Repository-Struktur**: Abschnitt 10 aktualisiert, um umfassende Fallstudien mit spezifizierten Implementierungsdetails abzubilden
- **Changelog Integration**: Eintrag vom 26. September 2025 zum Hinzufügen der GitHub MCP Registry und Fallstudienverbesserungen hinzugefügt
- **Datumsaktualisierung**: Fußzeilentimestamp auf letzte Überarbeitung (26. September 2025) gesetzt

### Verbesserungen in Dokumentationsqualität
- **Konsistenzsteigerung**: Vereinheitlichte Formatierung und Struktur aller sieben Fallstudien
- **Umfassende Abdeckung**: Fallstudien umfassen nun Unternehmens-, Entwicklerproduktivitäts- und Ökosystementwicklungsszenarien
- **Strategische Positionierung**: Stärkere Fokussierung auf MCP als fundamentale Plattform zur Deployment agenter Systeme
- **Ressourcenintegration**: Aktualisierung der Zusatzressourcen um Link zur GitHub MCP Registry

## 15. September 2025

### Erweiterung Fortgeschrittener Themen – Benutzerdefinierte Transports & Kontext-Engineering

#### MCP Benutzerdefinierte Transports (05-AdvancedTopics/mcp-transport/) – Neuer fortgeschrittener Implementierungsleitfaden
- **README.md**: Vollständiger Implementierungsleitfaden für benutzerdefinierte MCP-Transportmechanismen
  - **Azure Event Grid Transport**: Umfassende serverlose, ereignisgesteuerte Transportimplementierung
    - Beispiele in C#, TypeScript und Python mit Azure Functions Integration
    - Ereignisgesteuerte Architektur-Muster für skalierbare MCP-Lösungen
    - Webhook-Empfänger und push-basierte Nachrichtenverarbeitung
  - **Azure Event Hubs Transport**: Hochdurchsatz-Streaming-Transportimplementierung
    - Echtzeit-Streaming-Fähigkeiten für latenzarme Szenarien
    - Partitionierungsstrategien und Checkpoint-Verwaltung
    - Nachrichtensammlung und Performance-Optimierung
  - **Enterprise-Integrationsmuster**: Produktionsreife Architekturbespiele
    - Verteilte MCP-Verarbeitung über mehrere Azure Functions
    - Hybride Transportarchitekturen mit kombinierten Transporttypen
    - Nachrichtendauerhaftigkeit, Zuverlässigkeit und Fehlerbehandlungsstrategien
  - **Sicherheit & Monitoring**: Azure Key Vault Integration und Observability-Muster
    - Managed Identity Authentifizierung und Minimalprivilegienzugang
    - Application Insights Telemetrie und Performance-Überwachung
    - Circuit Breaker- und Fehlertoleranzmuster
  - **Testframeworks**: Umfassende Teststrategien für benutzerdefinierte Transporte
    - Unit-Tests mit Testdoubles und Mocking-Frameworks
    - Integrationstests mit Azure Test Containers
    - Performance- und Lasttestspezifika

#### Kontext-Engineering (05-AdvancedTopics/mcp-contextengineering/) – Aufstrebende KI-Disziplin
- **README.md**: Umfassende Erkundung von Kontext-Engineering als aufstrebendes Fachgebiet
  - **Kernprinzipien**: Vollständiges Teilen von Kontext, Bewusstsein für Handlungsentscheidungen und Kontextfensterverwaltung
  - **Ausrichtung am MCP-Protokoll**: Wie das MCP-Design Herausforderungen des Kontext-Engineerings adressiert
    - Begrenzungen von Kontextfenstern und progressive Ladestrategien
    - Relevanzbestimmung und dynamische Kontextabfrage
    - Multimodale Kontextbehandlung und Sicherheitsaspekte
  - **Implementierungsansätze**: Einzelfaden- vs. Multi-Agenten-Architekturen
    - Kontextaufteilung und Priorisierungstechniken
    - Progressives Kontextladen und Komprimierungsstrategien
    - Geschichtete Kontextansätze und Abfrageoptimierung
  - **Messrahmenwerk**: Entstehende Metriken zur Bewertung der Kontextwirksamkeit
    - Eingabeeffizienz, Leistung, Qualität und Nutzererlebnis
    - Experimentelle Ansätze zur Kontextoptimierung
    - Fehleranalyse und Verbesserungsmethoden

#### Lehrplan-Navigationsupdates (README.md)
- **Erweiterte Modulstruktur**: Aktualisierte Curriculum-Tabelle zur Aufnahme neuer fortgeschrittener Themen
  - Einträge zu Kontext-Engineering (5.14) und Benutzerdefinierter Transport (5.15) hinzugefügt
  - Einheitliche Formatierungen und Navigationslinks über alle Module
  - Beschreibungen auf aktuellen Inhaltsumfang angepasst

### Verzeichnisstruktur Verbesserungen
- **Benennungskonsistenz**: „mcp transport“ zu „mcp-transport“ umbenannt für Konsistenz mit anderen Advanced Topics Ordnern
- **Inhaltsorganisation**: Alle 05-AdvancedTopics Ordner folgen nun konsistentem Namensmuster (mcp-[thema])

### Verbesserungen der Dokumentationsqualität
- **MCP-Spezifikationsausrichtung**: Alle neuen Inhalte beziehen sich auf MCP-Spezifikation 2025-06-18
- **Mehrsprachige Beispiele**: Umfassende Codebeispiele in C#, TypeScript und Python
- **Enterprise-Fokus**: Produktionsreife Muster und Azure-Cloud-Integration durchgängig
- **Visuelle Dokumentation**: Mermaid-Diagramme zur Architektur- und Flussvisualisierung

## 18. August 2025

### Umfassendes Dokumentationsupdate – MCP 2025-06-18 Standards

#### MCP Security Best Practices (02-Security/) – Vollständige Modernisierung
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Vollständige Neufassung gemäß MCP-Spezifikation 2025-06-18
  - **Verbindliche Anforderungen**: Hinzufügung expliziter MUSS/MUSS NICHT Anforderungen aus offizieller Spezifikation mit klaren visuellen Indikatoren
  - **12 Kern Sicherheitspraktiken**: Umstrukturierung von 15-Punkte-Liste zu umfassenden Sicherheitsdomänen
    - Token-Sicherheit & Authentifizierung mit externer Identitätsanbieterintegration
    - Sitzungsverwaltung & Transportsicherheit mit kryptographischen Anforderungen
    - KI-spezifischer Bedrohungsschutz mit Microsoft Prompt Shields Integration
    - Zugriffskontrolle & Berechtigungen mit Prinzip der geringsten Rechte
    - Inhaltsicherheit & Überwachung mit Azure Content Safety Integration
    - Lieferkettensicherheit mit umfassender Komponentenverifikation
    - OAuth-Sicherheit & „Confused Deputy“ Prävention mit PKCE-Implementierung
    - Vorfallreaktion & Wiederherstellung mit automatisierten Möglichkeiten
    - Compliance & Governance mit regulatorischer Ausrichtung
    - Fortgeschrittene Sicherheitskontrollen mit Zero-Trust-Architektur
    - Microsoft Sicherheitsökosystem Integration mit umfassenden Lösungen
    - Kontinuierliche Sicherheitsevolution mit adaptiven Praktiken
  - **Microsoft-Sicherheitslösungen**: Verbesserte Integrationshinweise für Prompt Shields, Azure Content Safety, Entra ID und GitHub Advanced Security
  - **Implementierungsressourcen**: Kategorisierte umfassende Ressourcenlinks zu Offizieller MCP-Dokumentation, Microsoft Sicherheitslösungen, Sicherheitsstandards und Implementierungsleitfäden

#### Fortgeschrittene Sicherheitskontrollen (02-Security/) – Unternehmensimplementierung
- **MCP-SECURITY-CONTROLS-2025.md**: Vollständige Überarbeitung mit unternehmensgerechtem Sicherheitsrahmenwerk
  - **9 Umfassende Sicherheitsdomänen**: Erweiterung von Basis-Kontrollen zu detailliertem Enterprise-Rahmen
    - Fortgeschrittene Authentifizierung & Autorisierung mit Microsoft Entra ID Integration
    - Token-Sicherheit & Anti-Passthrough-Kontrollen mit umfassender Validierung
    - Sitzungssicherheitskontrollen mit Hijacking-Prävention
    - KI-spezifische Sicherheitskontrollen mit Prompt Injection und Tool Poisoning Prävention
    - Schutz vor Confused Deputy Angriffen mit OAuth-Proxy-Sicherheit
    - Tool-Ausführungssicherheit mit Sandboxing und Isolation
    - Lieferkettensicherheitskontrollen mit Abhängigkeitsverifikation
    - Überwachungs- & Erkennungskontrollen mit SIEM-Integration
    - Vorfallreaktion & Wiederherstellung mit automatisierten Fähigkeiten
  - **Implementierungsbeispiele**: Detaillierte YAML-Konfigurationsblöcke und Codebeispiele hinzugefügt
  - **Microsoft-Lösungsintegration**: Umfassende Abdeckung von Azure Sicherheitsdiensten, GitHub Advanced Security und Unternehmens-Identitätsmanagement

#### Fortgeschrittene Sicherheitsthemen (05-AdvancedTopics/mcp-security/) – Produktionsreife Implementierung
- **README.md**: Vollständige Neufassung zur Unternehmenssicherheitsimplementierung
  - **Aktuelle Spezifikationsausrichtung**: Aktualisiert auf MCP-Spezifikation 2025-06-18 mit verbindlichen Sicherheitsanforderungen
  - **Erweiterte Authentifizierung**: Microsoft Entra ID Integration mit umfassenden .NET- und Java Spring Security-Beispielen
  - **KI-Sicherheitsintegration**: Microsoft Prompt Shields und Azure Content Safety Implementierung mit detaillierten Python-Beispielen
  - **Fortgeschrittene Bedrohungsabwehr**: Umfassende Implementierungsbeispiele für
    - Confused Deputy Angriffsprävention mit PKCE und Nutzereinwilligungsvalidierung
    - Token-Passthrough-Prävention mit Audience-Validierung und sicherem Token-Management
    - Sitzungshijacking-Prävention mit kryptographischer Bindung und Verhaltensanalyse
  - **Unternehmenssicherheitsintegration**: Azure Application Insights Monitoring, Bedrohungserkennungs-Pipelines und Lieferkettensicherheit
  - **Implementierungscheckliste**: Klare Unterscheidung verbindlicher vs. empfohlener Sicherheitskontrollen mit Microsoft-Sicherheitsökosystem-Vorteilen

### Dokumentationsqualität & Standards-Ausrichtung
- **Spezifikationsverweise**: Alle Verweise auf die aktuelle MCP-Spezifikation 2025-06-18 aktualisiert  
- **Microsoft Sicherheitsökosystem**: Verbesserte Integrationsanleitungen in allen Sicherheitsdokumentationen  
- **Praktische Umsetzung**: Detaillierte Codebeispiele in .NET, Java und Python mit Unternehmensmustern hinzugefügt  
- **Ressourcenorganisation**: Umfassende Kategorisierung offizieller Dokumentation, Sicherheitsstandards und Umsetzungshilfen  
- **Visuelle Indikatoren**: Klare Kennzeichnung von verpflichtenden Anforderungen versus empfohlenen Praktiken  

#### Kernkonzepte (01-CoreConcepts/) – Vollständige Modernisierung  
- **Protokollversion-Aktualisierung**: Verweis aktualisiert auf aktuelle MCP-Spezifikation 2025-06-18 mit datumsbasierter Versionierung (YYYY-MM-DD-Format)  
- **Architekturverfeinerung**: Verbesserte Beschreibungen von Hosts, Clients und Servern zur Abbildung aktueller MCP-Architekturpatterns  
  - Hosts sind nun klar als KI-Anwendungen definiert, die mehrere MCP-Clientverbindungen koordinieren  
  - Clients werden als Protokoll-Connectoren beschrieben, die Eins-zu-eins-Serverbeziehungen verwalten  
  - Server wurden um lokale vs. Remote-Bereitstellungsszenarien erweitert  
- **Primitive Restrukturierung**: Komplette Überarbeitung der Server- und Client-Primitives  
  - Server-Primitives: Ressourcen (Datenquellen), Prompts (Vorlagen), Tools (ausführbare Funktionen) mit ausführlichen Erklärungen und Beispielen  
  - Client-Primitives: Sampling (LLM-Vervollständigungen), Elicitation (Benutzereingaben), Logging (Debugging/Überwachung)  
  - Aktualisiert mit aktuellen Discover-(`*/list`), Abruf-(`*/get`) und Ausführungs-(`*/call`) Methodenmuster  
- **Protokollarchitektur**: Einführung eines zweischichtigen Architekturmodells  
  - Datenschicht: JSON-RPC 2.0-Basis mit Lifecycle-Management und Primitives  
  - Transportschicht: STDIO (lokal) und Streamable HTTP mit SSE (remote) Transportmechanismen  
- **Sicherheitsrahmen**: Umfassende Sicherheitsprinzipien inklusive ausdrücklicher Nutzerzustimmung, Datenschutz, Sicherheit der Tool-Ausführung und Transportschichtsicherheit  
- **Kommunikationsmuster**: Aktualisierte Protokollnachrichten zur Darstellung von Initialisierung, Discovery, Ausführung und Benachrichtigungsabläufen  
- **Codebeispiele**: Erneuerte mehrsprachige Beispiele (.NET, Java, Python, JavaScript) zur Abbildung aktueller MCP SDK-Patterns  

#### Sicherheit (02-Security/) – Umfassende Sicherheitsüberarbeitung  
- **Standardkonformität**: Vollständige Angleichung an die Sicherheitsanforderungen der MCP-Spezifikation 2025-06-18  
- **Authentifizierungsentwicklung**: Dokumentierte Entwicklung von eigenen OAuth-Servern hin zur Delegation an externe Identitätsanbieter (Microsoft Entra ID)  
- **KI-spezifische Bedrohungsanalyse**: Erweiterte Behandlung moderner KI-Angriffsvektoren  
  - Detaillierte Szenarien zu Prompt Injection mit praxisnahen Beispielen  
  - Mechanismen der Tool-Vergiftung und "Rug Pull"-Angriffsmuster  
  - Kontextfenster-Vergiftung und Modellverwirrungsangriffe  
- **Microsoft KI-Sicherheitslösungen**: Umfassende Abdeckung des Microsoft Sicherheitsökosystems  
  - AI Prompt Shields mit fortschrittlicher Erkennung, Hervorhebung und Trennertechniken  
  - Integration von Azure Content Safety  
  - GitHub Advanced Security für Schutz der Lieferkette  
- **Erweiterte Bedrohungsminderung**: Detaillierte Sicherheitskontrollen für  
  - Session Hijacking mit MCP-spezifischen Angriffsszenarien und kryptographischen Session-ID-Anforderungen  
  - Confused Deputy-Probleme in MCP Proxy-Szenarien mit ausdrücklichen Zustimmungsanforderungen  
  - Token-Durchleitungs-Schwachstellen mit verpflichtenden Validierungskontrollen  
- **Lieferkettensicherheit**: Erweiterte Behandlung der KI-Lieferkette einschließlich Foundation Models, Embeddings-Dienste, Kontextprovider und Drittanbieter-APIs  
- **Grundlagensicherheit**: Verbesserte Integration mit Unternehmenssicherheitsmustern einschließlich Zero-Trust-Architektur und Microsoft Sicherheitsökosystem  
- **Ressourcenorganisation**: Kategorisierte umfassende Ressourcenlinks nach Typ (Offizielle Dokumente, Standards, Forschung, Microsoft-Lösungen, Implementierungsanleitungen)  

### Verbesserungen der Dokumentationsqualität  
- **Strukturierte Lernziele**: Verbessertes Lernzielsystem mit spezifischen, umsetzbaren Ergebnissen  
- **Querverweise**: Ergänzte Verlinkungen zwischen verwandten Sicherheits- und Kernkonzeptthemen  
- **Aktuelle Informationen**: Alle Datumsangaben und Spezifikationslinks auf aktuellen Stand gebracht  
- **Umsetzungsempfehlungen**: Spezifische, umsetzbare Implementierungshinweise in beiden Abschnitten ergänzt  

## 16. Juli 2025  

### README- und Navigationsverbesserungen  
- Vollständig neu gestaltete Curriculumsnavigation in README.md  
- Ersetzung von `<details>`-Tags durch ein zugänglicheres tabellenbasiertes Format  
- Neue Layoutoptionen im Ordner "alternative_layouts" erstellt  
- Navigationsexemplare in Karten-, Tab- und Akkordeon-Stil hinzugefügt  
- Aktualisierte Repositorystruktur-Sektion mit allen neuesten Dateien  
- Erweiterte Sektion "Wie man dieses Curriculum benutzt" mit klaren Empfehlungen  
- Aktualisierte MCP-Spezifikationslinks auf korrekte URLs  
- Hinzufügen des Abschnitts Kontext-Engineering (5.14) zur Curriculum-Struktur  

### Lernleitfaden-Aktualisierungen  
- Komplette Überarbeitung des Lernleitfadens zur Angleichung an aktuelle Repository-Struktur  
- Neue Sektionen für MCP Clients und Tools sowie beliebte MCP Server hinzugefügt  
- Visuelle Curriculumsübersicht aktualisiert, um alle Themen akkurat abzubilden  
- Verbesserte Beschreibung fortgeschrittener Themen zur Abdeckung aller Spezialgebiete  
- Fallstudien-Sektion aktuell mit realen Beispielen ergänzt  
- Dieses umfassende Änderungsprotokoll hinzugefügt  

### Community-Beiträge (06-CommunityContributions/)  
- Detaillierte Informationen über MCP-Server für Bildgenerierung hinzugefügt  
- Umfassende Sektion zur Verwendung von Claude in VSCode ergänzt  
- Anleitungen zur Einrichtung und Nutzung des Cline-Terminalclients hinzugefügt  
- MCP-Client-Sektion aktualisiert mit allen beliebten Clientoptionen  
- Beitragsexemplare mit präziseren Codebeispielen verbessert  

### Fortgeschrittene Themen (05-AdvancedTopics/)  
- Alle spezialisierten Themenordner konsistent benannt und organisiert  
- Kontext-Engineering-Materialien und Beispiele ergänzt  
- Dokumentation zur Foundry-Agent-Integration hinzugefügt  
- Dokumentation zur Entra ID Sicherheitsintegration verbessert  

## 11. Juni 2025  

### Erste Erstellung  
- Veröffentlichung der ersten Version des MCP für Anfänger Curriculums  
- Grundstruktur aller 10 Hauptabschnitte erstellt  
- Visuelle Curriculumsübersicht zur Navigation implementiert  
- Erste Beispielprojekte in mehreren Programmiersprachen hinzugefügt  

### Einstieg (03-GettingStarted/)  
- Erste Server-Implementierungsbeispiele erstellt  
- Anleitung zur Client-Entwicklung hinzugefügt  
- Integration von LLM-Clients dokumentiert  
- VS Code Integrationsdokumentation ergänzt  
- Server-Sent Events (SSE) Serverbeispiele implementiert  

### Kernkonzepte (01-CoreConcepts/)  
- Detaillierte Erklärung der Client-Server-Architektur hinzugefügt  
- Dokumentation zu Schlüsselkomponenten des Protokolls erstellt  
- Nachrichtenaustauschmuster im MCP dokumentiert  

## 23. Mai 2025  

### Repository-Struktur  
- Repository mit grundlegender Ordnerstruktur initialisiert  
- README-Dateien für alle Hauptabschnitte erstellt  
- Übersetzungsinfrastruktur eingerichtet  
- Bildmaterial und Diagramme hinzugefügt  

### Dokumentation  
- Erste README.md mit Curriculum-Übersicht erstellt  
- CODE_OF_CONDUCT.md und SECURITY.md hinzugefügt  
- SUPPORT.md mit Hilferichtlinien eingerichtet  
- Vorläufige Struktur des Lernleitfadens erstellt  

## 15. April 2025  

### Planung und Rahmen  
- Erste Planung des MCP für Anfänger Curriculums  
- Lernziele und Zielgruppe definiert  
- Zehn-Abschnitt-Struktur des Curriculums skizziert  
- Konzeptioneller Rahmen für Beispiele und Fallstudien entwickelt  
- Erste Prototypbeispiele für Schlüsselkonzepte erstellt

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->