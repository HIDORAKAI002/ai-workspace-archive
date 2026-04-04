# Changelog: MCP für Anfänger Curriculum

Dieses Dokument dient als Aufzeichnung aller bedeutenden Änderungen am Model Context Protocol (MCP) für Anfänger Curriculum. Änderungen werden in umgekehrt chronologischer Reihenfolge dokumentiert (neueste Änderungen zuerst).

## 5. Februar 2026

### Repository-weite Validierungs- und Navigationsverbesserungen

#### Neuer Curriculuminhalt hinzugefügt

**Modul 03 - Einstieg**
- **12-mcp-hosts/README.md**: Neuer umfassender Leitfaden zur Einrichtung von MCP Hosts
  - Konfigurationsbeispiele für Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-Konfigurationsvorlagen für alle wichtigen Hosts
  - Vergleichstabelle der Transporttypen (stdio, SSE/HTTP, WebSocket)
  - Fehlerbehebung bei häufigen Verbindungsproblemen
  - Sicherheitsbest Practices für Host-Konfiguration

- **13-mcp-inspector/README.md**: Neuer Debugging-Leitfaden für MCP Inspector
  - Installationsmethoden (npx, npm global, aus dem Quellcode)
  - Verbindung zu Servern über stdio und HTTP/SSE
  - Testwerkzeuge, Ressourcen und Prompts-Workflows
  - VS Code Integration mit MCP Inspector
  - Häufige Debugging-Szenarien mit Lösungen

**Modul 04 - Praktische Umsetzung**
- **pagination/README.md**: Neuer Leitfaden zur Pagination-Implementierung
  - Cursor-basierte Pagination-Muster in Python, TypeScript, Java
  - Handhabung von clientseitiger Pagination
  - Cursor-Designstrategien (opak vs. strukturiert)
  - Empfehlungen zur Leistungsoptimierung

**Modul 05 - Fortgeschrittene Themen**
- **mcp-protocol-features/README.md**: Neue tiefgehende Erläuterungen zu Protokollfunktionen
  - Implementierung von Fortschrittsbenachrichtigungen
  - Muster zur Anfrageabbruchsteuerung
  - Ressourcentemplates mit URI-Mustern
  - Verwaltung des Server-Lebenszyklus
  - Steuerung der Protokollierungsebenen
  - Fehlerbehandlungsmuster mit JSON-RPC-Codes

#### Navigationskorrekturen (über 24 Dateien aktualisiert)

**Hauptmodul-READMEs**  
Jetzt Verlinkungen sowohl zur ersten Lektion ALS AUCH zum nächsten Modul

**02-Sicherheit Unterdateien**  
- Alle 5 ergänzenden Sicherheitsdokumente besitzen jetzt „Was kommt als Nächstes“-Navigation:

**09-CaseStudy Dateien**  
- Alle Fallstudien-Dateien haben jetzt sequentielle Navigation:

**10-StreamliningAI Labs**  
„Was kommt als Nächstes“-Bereich zum Modul 10 Überblick und Modul 11 hinzugefügt

#### Code- und Inhaltskorrekturen

**SDK- und Abhängigkeitsupdates**  
Leere openai Version auf `^4.95.0` korrigiert  
SDK von `^1.8.0` auf `>=1.26.0` aktualisiert  
mcp Versionsangaben auf `>=1.26.0` aktualisiert

**Codekorrekturen**  
Ungültiges Modell `gpt-4o-mini` zu `gpt-4.1-mini` berichtigt

**Inhaltskorrekturen**  
Defekten Link `READMEmd` → `README.md` korrigiert, Curriculum-Header `Module 1-3` → `Module 0-3` berichtigt, Groß-/Kleinschreibung im Pfad korrigiert  
Beschädigten doppelten Case Study 5 Inhalt entfernt

**Verbesserungen für Anfängerführung**  
Ordentliche Einführung, Lernziele und Voraussetzungen für Anfänger hinzugefügt

#### Curriculum-Updates

**Haupt README.md**  
- Einträge 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) zur Curriculum-Tabelle hinzugefügt

**Modul-READMEs**  
Lektion 12 und 13 zur Lektionenliste hinzugefügt  
Abschnitt Praktische Leitfäden mit Pagination-Verlinkung hinzugefügt  
Lektionen 5.15 (Custom Transport) und 5.16 (Protocol Features) hinzugefügt

**study_guide.md**  
- Mindmap mit allen neuen Themen aktualisiert: MCP Hosts Setup, MCP Inspector, Pagination-Strategien, Protokollfunktionen tiefgehender Einblick

## 28. Januar 2026

### MCP Spezifikation 2025-11-25 Compliance-Review

#### Erweiterung der Kernkonzepte (01-CoreConcepts/)
- **Neues Client-Primitive – Roots**: Umfassende Dokumentation des Roots-Client-Primitives hinzugefügt, das Servern das Verständnis von Dateisystemgrenzen und Zugriffsrechten ermöglicht  
- **Tool-Anmerkungen**: Dokumentation zu Verhaltensanmerkungen der Tools (`readOnlyHint`, `destructiveHint`) für bessere Entscheidungen bei der Tool-Ausführung hinzugefügt  
- **Tool-Aufrufe im Sampling**: Sampling-Dokumentation aktualisiert zur Aufnahme der Parameter `tools` und `toolChoice` für modellgesteuerte Tool-Aufrufe während Sampling-Anfragen  
- **URL-Modus Elicitation**: Dokumentation zur URL-basierten Auslösung für serverinitiierte externe Webinteraktionen hinzugefügt  
- **Tasks (Experimentell)**: Neuer Abschnitt zur experimentellen Tasks-Funktion, die dauerhafte Ausführungshüllen und verzögerte Ergebnisabfragen beschreibt  
- **Icons-Unterstützung**: Hinweise, dass Tools, Ressourcen, Ressourcentemplates und Prompts jetzt Icons als zusätzliche Metadaten enthalten können

#### Dokumentationsaktualisierungen
- **README.md**: MCP Spezifikation 2025-11-25 Version Referenz und datumsbasierte Versionierungserklärung hinzugefügt  
- **study_guide.md**: Curriculum-Karte um Tasks und Tool-Anmerkungen im Bereich Kernkonzepte erweitert; Dokument-Zeitstempel aktualisiert

#### Spezifikationskonformitätsprüfung
- **Protokollversion**: Verifiziert, dass alle Dokumentationen auf die aktuelle MCP Spezifikation 2025-11-25 verweisen  
- **Architekturausrichtung**: Bestätigung der Dokumentationsgenauigkeit zur zweischichtigen Architektur (Daten- und Transportebene)  
- **Primitives Dokumentation**: Validierung der Serverprimitives (Ressourcen, Prompts, Tools) und Clientprimitives (Sampling, Elicitation, Logging, Roots)  
- **Transportmechanismen**: Überprüfung der Dokumentationsgenauigkeit zu STDIO und streambarem HTTP Transport  
- **Sicherheitsrichtlinien**: Bestätigung der Übereinstimmung mit aktuellen MCP Security Best Practices Dokumentationen

#### Wesentliche MCP 2025-11-25 Features dokumentiert
- **OpenID Connect Discovery**: Auth-Server-Erkennung über OIDC  
- **OAuth Client ID Metadaten-Dokumente**: Empfohlenes Registrierungsverfahren für Clients  
- **JSON Schema 2020-12**: Standard-Dialekt für MCP Schema-Definitionen  
- **SDK Tiering System**: Formalisierte Anforderungen an SDK Feature-Support und Wartung  
- **Governance-Struktur**: Formalisierte Arbeitsgruppen und Interessengruppen in MCP Governance

### Große Sicherheitsdokumentationsaktualisierung (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Integration
- **Neue praktische Trainingsressource**: Umfassende Integration des [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) in alle Sicherheitsdokumentationen  
- **Expeditionsroute dokumentiert**: Vollständige Camp-zu-Camp Progression vom Base Camp zum Gipfel dargestellt  
- **OWASP Ausrichtung**: Alle Sicherheitshinweise jetzt auf OWASP MCP Azure Security Guide Risiken abgestimmt

#### OWASP MCP Top 10 Integration
- **Neuer Abschnitt**: OWASP MCP Top 10 Security Risks Tabelle mit Azure-Minderungen im Haupt-Sicherheits-README ergänzt  
- **Risiko-basierte Dokumentation**: mcp-security-controls-2025.md mit OWASP MCP Risiko-Referenzen für jede Sicherheitsdomäne aktualisiert  
- **Referenzarchitektur**: Verlinkung zur OWASP MCP Azure Sicherheitsleitfaden Referenzarchitektur und Implementierungsmustern

#### Aktualisierte Sicherheitsdateien
- **README.md**: Sherpa Workshop Überblick, Expeditionsrouten-Tabelle, OWASP MCP Top 10 Risikosummary und praktische Trainingssektion hinzugefügt  
- **mcp-security-controls-2025.md**: Header auf Februar 2026 aktualisiert, OWASP Risiko-Referenzen (MCP01-MCP08) hinzugefügt, Versionsinkonsistenz behoben  
- **mcp-security-best-practices-2025.md**: Sherpa und OWASP Ressourcenabschnitt hinzugefügt, Zeitstempel aktualisiert  
- **mcp-best-practices.md**: Hand-on Training Sektion mit Sherpa und OWASP Links ergänzt  
- **azure-content-safety-implementation.md**: OWASP MCP06 Referenz, Sherpa Camp 3 Abgleich und weitere Ressourcen hinzugefügt

#### Neue Ressourcenlinks hinzugefügt
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Einzelne OWASP MCP Risiko-Seiten (MCP01-MCP10)

### Curriculum-weite MCP Spezifikation 2025-11-25 Ausrichtung

#### Modul 03 - Einstieg
- **SDK-Dokumentation**: Go SDK zur offiziellen SDK-Liste hinzugefügt; alle SDK-Verweise mit MCP Spezifikation 2025-11-25 abgeglichen  
- **Transportklärung**: STDIO und HTTP Streaming Transportbeschreibungen mit expliziten Spezifikationsbezügen aktualisiert

#### Modul 04 - Praktische Umsetzung
- **SDK Updates**: Go SDK hinzugefügt; SDK-Liste mit Spezifikationsversionsbezug aktualisiert  
- **Authorization Spec**: MCP Autorisierungsspezifikation-Link auf aktuelle Version 2025-11-25 aktualisiert

#### Modul 05 - Fortgeschrittene Themen
- **Neue Features**: Hinweis auf neue MCP Spezifikation 2025-11-25 Features (Tasks, Tool Annotations, URL Mode Elicitation, Roots) eingefügt  
- **Sicherheitsressourcen**: OWASP MCP Top 10 und Sherpa Workshop Links zu zusätzlichen Referenzen ergänzt

#### Modul 06 - Community-Beiträge
- **SDK-Liste**: Swift- und Rust-SDKs hinzugefügt; Spezifikationslink auf 2025-11-25 aktualisiert  
- **Spezifikationsreferenz**: MCP Spezifikationslink auf direkte Spezifikations-URL aktualisiert

#### Modul 07 - Lektionen aus früher Adoption
- **Ressourcen-Updates**: MCP Spezifikation 2025-11-25 Link und OWASP MCP Top 10 zu weiteren Ressourcen hinzugefügt

#### Modul 08 - Best Practices
- **Spezifikationsversion**: MCP Spezifikation Referenz auf 2025-11-25 aktualisiert  
- **Sicherheitsressourcen**: OWASP MCP Top 10 und Sherpa Workshop zu zusätzlichen Referenzen ergänzt

#### Modul 10 - AI Workflows optimieren
- **Badge Update**: MCP Versions-Badge von SDK Version (1.9.3) auf Spezifikationsversion (2025-11-25) geändert  
- **Ressourcenlinks**: MCP Spezifikationslink aktualisiert; OWASP MCP Top 10 hinzugefügt

#### Modul 11 - MCP Server Hands-On Labs
- **Spezifikationsreferenz**: MCP Spezifikationslink auf Version 2025-11-25 aktualisiert  
- **Sicherheitsressourcen**: OWASP MCP Top 10 zu offiziellen Ressourcen hinzugefügt

## 18. Dezember 2025

### Sicherheitsdokumentationsupdate - MCP Spezifikation 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Versionsupdate der Spezifikation
- **Protokollversionsaktualisierung**: Bezug auf neueste MCP Spezifikation 2025-11-25 (veröffentlicht 25. November 2025) aktualisiert  
  - Alle Versionsverweise von 2025-06-18 auf 2025-11-25 geändert  
  - Dokumentdatumsverweise von 18. August 2025 auf 18. Dezember 2025 aktualisiert  
  - Überprüft, dass alle Spezifikations-URLs auf aktuelle Dokumentation zeigen  
- **Inhaltsvalidierung**: Umfassende Validierung der Sicherheitsbest Practices gegen neueste Standards  
  - **Microsoft Sicherheitslösungen**: Überprüft auf aktuelle Terminologie und Links zu Prompt Shields (früher „Jailbreak Risikoerkennung“), Azure Content Safety, Microsoft Entra ID und Azure Key Vault  
  - **OAuth 2.1 Sicherheit**: Bestätigung der Übereinstimmung mit den neuesten OAuth-Sicherheitsbest Practices  
  - **OWASP Standards**: Validierung, dass OWASP Top 10 für LLMs Referenzen aktuell sind  
  - **Azure Services**: Überprüfung aller Microsoft Azure Dokumentationslinks und Best Practices  
- **Standardkonformität**: Alle referenzierten Sicherheitsstandards als aktuell bestätigt  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 Sicherheit Best Practices  
  - Azure Sicherheits- und Compliance-Frameworks  
- **Implementierungsressourcen**: Validierung aller Implementierungsleitfadenlinks und Ressourcen  
  - Azure API Management Authentifizierungsmuster  
  - Microsoft Entra ID Integrationsleitfäden  
  - Azure Key Vault Geheimnisverwaltung  
  - DevSecOps Pipelines und Überwachungslösungen

### Dokumentationsqualitätssicherung
- **Speziifikationskonformität**: Sicherstellung, dass alle zwingenden MCP Sicherheitsanforderungen (MUSS/NICHT) mit aktueller Spezifikation übereinstimmen  
- **Ressourcenzustand**: Überprüfung aller externen Links zu Microsoft Dokumentationen, Sicherheitsstandards und Implementierungsleitfäden  
- **Abdeckung der Best Practices**: Bestätigung umfassender Abdeckung von Authentifizierung, Autorisierung, KI-spezifischen Bedrohungen, Lieferketten-Sicherheit und Unternehmensmustern

## 6. Oktober 2025

### Erweiterung „Einstieg“ – Fortgeschrittene Servernutzung & einfache Authentifizierung

#### Fortgeschrittene Servernutzung (03-GettingStarted/10-advanced)
- **Neues Kapitel hinzugefügt**: Umfassender Leitfaden zur fortgeschrittenen Verwendung von MCP Servern, inklusive regulärer und Low-Level Serverarchitekturen  
  - **Regulärer vs. Low-Level Server**: Detaillierter Vergleich und Codebeispiele in Python und TypeScript für beide Ansätze  
  - **Handler-basiertes Design**: Erklärung der handlerbasierten Verwaltung von Tools/Ressourcen/Prompts für skalierbare, flexible Serverimplementierungen  
  - **Praktische Muster**: Anwendungsbeispiele, in denen Low-Level Servermuster für erweiterte Features und Architektur von Vorteil sind

#### Einfache Authentifizierung (03-GettingStarted/11-simple-auth)
- **Neues Kapitel hinzugefügt**: Schritt-für-Schritt Anleitung zur Implementierung einfacher Authentifizierung in MCP Servern  
  - **Auth-Konzepte**: Klare Erläuterung von Authentifizierung vs. Autorisierung und Umgang mit Zugangsdaten  
  - **Grundlegende Auth-Implementierung**: Middleware-basierte Authentifizierungsmuster in Python (Starlette) und TypeScript (Express) mit Codebeispielen  
  - **Weiterentwicklung zur erweiterten Sicherheit**: Anleitung zum Einstieg mit einfacher Auth und Fortschreiten zu OAuth 2.1 und RBAC, mit Verweisen auf fortgeschrittene Sicherheitsmodule

Diese Ergänzungen bieten praxisnahe, anwendungsorientierte Anleitung zum Aufbau robusterer, sichererer und flexibler MCP Serverimplementierungen und verbinden grundlegende Konzepte mit fortgeschrittenen Produktionsmustern.

## 29. September 2025

### MCP Server Datenbank-Integrationslabs – Umfassender praxisorientierter Lernpfad

#### 11-MCPServerHandsOnLabs - Neues vollständiges Datenbank-Integrationscurriculum  

- **Vollständiger 13-Lab-Lernpfad**: Hinzugefügter umfassender praxisorientierter Lehrplan zum Erstellen produktionsreifer MCP-Server mit PostgreSQL-Datenbankintegration  
  - **Praxisnahe Umsetzung**: Zava Retail Analytics Use Case mit Unternehmens-Patterns  
  - **Strukturierter Lernfortschritt**:  
    - **Labs 00-03: Grundlagen** – Einführung, Kernarchitektur, Sicherheit & Multi-Tenancy, Umgebungseinrichtung  
    - **Labs 04-06: Aufbau des MCP-Servers** – Datenbankdesign & Schema, MCP-Server-Implementierung, Tool-Entwicklung  
    - **Labs 07-09: Erweiterte Funktionen** – Semantische Suche Integration, Testing & Debugging, VS Code Integration  
    - **Labs 10-12: Produktion & Best Practices** – Deployment-Strategien, Monitoring & Observability, Best Practices & Optimierung  
  - **Enterprise-Technologien**: FastMCP Framework, PostgreSQL mit pgvector, Azure OpenAI Embeddings, Azure Container Apps, Application Insights  
  - **Erweiterte Features**: Row Level Security (RLS), semantische Suche, Multi-Tenant-Datenzugriff, Vektor-Embeddings, Echtzeit-Monitoring  

#### Terminologie-Standardisierung - Modul-zu-Lab-Umwandlung  
- **Umfassendes Dokumentationsupdate**: Systematisch alle README-Dateien in 11-MCPServerHandsOnLabs aktualisiert, um „Lab“-Terminologie anstelle von „Modul“ zu verwenden  
  - **Abschnittsüberschriften**: „Was dieses Modul abdeckt“ zu „Was dieses Lab abdeckt“ in allen 13 Labs geändert  
  - **Inhaltsbeschreibung**: „Dieses Modul bietet…“ zu „Dieses Lab bietet…“ in der gesamten Dokumentation geändert  
  - **Lernziele**: „Am Ende dieses Moduls…“ zu „Am Ende dieses Labs…“ aktualisiert  
  - **Navigationslinks**: Alle „Modul XX:“ Verweise in „Lab XX:“ umgewandelt in Querverweisen und Navigation  
  - **Abschluss-Nachverfolgung**: „Nach Abschluss dieses Moduls…“ zu „Nach Abschluss dieses Labs…“ angepasst  
  - **Konservierte technische Verweise**: Python-Modulreferenzen in Konfigurationsdateien unverändert belassen (z. B. `"module": "mcp_server.main"`)  

#### Studienführer-Erweiterung (study_guide.md)  
- **Visuelle Lehrplanübersicht**: Neuer Abschnitt „11. Database Integration Labs“ mit umfassender Lab-Strukturvisualisierung hinzugefügt  
- **Repository-Struktur**: Aktualisierung von zehn zu elf Hauptabschnitten mit detaillierter Beschreibung zu 11-MCPServerHandsOnLabs  
- **Lernpfad-Anleitung**: Verbessertes Navigations-Handling für Abschnitte 00-11  
- **Technologieabdeckung**: Hinzufügung von FastMCP, PostgreSQL, Azure Services Integration Details  
- **Lernergebnisse**: Betonung auf produktionsreife Serverentwicklung, Datenbankintegrations-Patterns und Unternehmenssicherheit  

#### Haupt-README-Struktur-Verbesserung  
- **Lab-basierte Terminologie**: Aktualisierung der Haupt-README.md in 11-MCPServerHandsOnLabs zur konsistenten Verwendung der „Lab“-Struktur  
- **Lernpfad-Organisation**: Klarer Fortschritt von Grundlagenthemen über fortgeschrittene Implementierung bis zur Produktionsbereitstellung  
- **Praxisorientierung**: Schwerpunkt auf praktisch anwendbares, hands-on Lernen mit Enterprise-Grade-Patterns und Technologien  

### Verbesserungen der Dokumentationsqualität & Konsistenz  
- **Hands-On-Lernfokus**: Verstärkung des praktischen, lab-basierten Ansatzes durch die gesamte Dokumentation  
- **Enterprise-Pattern-Schwerpunkt**: Hervorhebung produktionsbereiter Implementierungen und Unternehmenssicherheitsaspekte  
- **Technologieintegration**: Umfassende Abdeckung moderner Azure-Dienste und KI-Integrationsmuster  
- **Lernfortschritt**: Klarer, strukturierter Pfad von Grundkonzepten bis zum Production Deployment  

## 26. September 2025  

### Case Studies Erweiterung - GitHub MCP Registry Integration  

#### Case Studies (09-CaseStudy/) – Ökosystem-Entwicklung im Fokus  
- **README.md**: Große Erweiterung mit umfassender GitHub MCP Registry Fallstudie  
  - **GitHub MCP Registry Fallstudie**: Neue umfassende Fallstudie zur Einführung der GitHub MCP Registry im September 2025  
    - **Problem-Analyse**: Detaillierte Untersuchung fragmentierter MCP-Server-Discovery und Deployment-Herausforderungen  
    - **Lösungsarchitektur**: GitHubs zentraler Registry-Ansatz mit One-Click VS Code Installation  
    - **Geschäftlicher Nutzen**: Messbare Verbesserungen beim Onboarding und der Entwicklerproduktivität  
    - **Strategischer Wert**: Fokus auf modulare Agenten-Deployment und Tool-übergreifende Interoperabilität  
    - **Ökosystementwicklung**: Positionierung als fundamentale Plattform für agentische Integration  
  - **Verbesserte Fallstudienstruktur**: Alle sieben Fallstudien wurden mit konsistenter Formatierung und umfassenden Beschreibungen aktualisiert  
    - Azure AI Travel Agents: Multi-Agenten-Orchestrierung im Fokus  
    - Azure DevOps Integration: Workflow-Automatisierung  
    - Echtzeit-Dokumentenabruf: Python-Konsolen-Client-Implementierung  
    - Interaktiver Studienplan-Generator: Chainlit-konversationelle Web-App  
    - Editor-integrierte Dokumentation: VS Code und GitHub Copilot Integration  
    - Azure API Management: Unternehmens-API-Integrationsmuster  
    - GitHub MCP Registry: Ökosystementwicklung und Community-Plattform  
  - **Umfassender Abschluss**: Neu geschriebener Abschlussabschnitt mit Hervorhebung von sieben Fallstudien, die verschiedene MCP-Implementierungsdimensionen abdecken  
    - Enterprise Integration, Multi-Agent Orchestrierung, Entwicklerproduktivität  
    - Ökosystementwicklung, Bildungs-Anwendungsfälle Kategorisierung  
    - Verbesserte Einblicke in Architektur-Patterns, Implementierungsstrategien und Best Practices  
    - Betonung MCP als reifes, produktionsbereites Protokoll  

#### Studienführer-Aktualisierungen (study_guide.md)  
- **Visuelle Curriculum-Übersicht**: Mindmap ergänzt um GitHub MCP Registry im Case Studies Abschnitt  
- **Fallstudien-Beschreibung**: Ausbau von generischen zu detaillierten Beschreibungen der sieben umfassenden Fallstudien  
- **Repository-Struktur**: Abschnitt 10 aktualisiert zur vollständigen Fallstudienabdeckung mit spezifischen Implementierungsdetails  
- **Changelog Integration**: Eintrag 26. September 2025 mit Dokumentation der GitHub MCP Registry Ergänzung und Case Study Erweiterungen  
- **Datumsaktualisierung**: Footer-Timestamp auf neuesten Stand (26. September 2025) angepasst  

### Verbesserungen der Dokumentationsqualität  
- **Konsistenzförderung**: Standardisierte Formatierung und Struktur aller sieben Fallstudien  
- **Umfassende Abdeckung**: Fallstudien umfassen nun Unternehmens-, Entwicklerproduktivitäts- und Ökosystem-Entwicklungs-Szenarien  
- **Strategische Positionierung**: Hervorgehobener Fokus auf MCP als Plattformgrundlage für agentische Systembereitstellung  
- **Ressourcenintegration**: Aktualisierung zusätzlicher Ressourcen um Link zur GitHub MCP Registry  

## 15. September 2025  

### Erweiterung Fortgeschrittener Themen – Custom Transports & Context Engineering  

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) – Neuer Leitfaden zur erweiterten Implementierung  
- **README.md**: Vollständiger Implementierungsleitfaden für benutzerdefinierte MCP-Transportmechanismen  
  - **Azure Event Grid Transport**: Umfassende serverlose eventgesteuerte Transportimplementierung  
    - Beispiele in C#, TypeScript und Python mit Azure Functions Integration  
    - Event-getriebene Architektur-Pattern für skalierbare MCP-Lösungen  
    - Webhook-Empfänger und push-basierte Nachrichtenauslieferung  
  - **Azure Event Hubs Transport**: Hochdurchsatz Streaming-Transport-Implementierung  
    - Echtzeit-Streaming-Fähigkeiten für niedrige Latenz-Szenarien  
    - Partitionierungsstrategien und Checkpoint-Management  
    - Nachrichtengruppierung und Performanceoptimierung  
  - **Enterprise-Integrations-Pattern**: Produktreife Architekturbeispiele  
    - Verteilte MCP-Verarbeitung über mehrere Azure Functions  
    - Hybride Transportarchitekturen mit verschiedenen Transporttypen  
    - Nachrichtenhaltbarkeit, Zuverlässigkeit und Fehlerbehandlungsstrategien  
  - **Sicherheit & Monitoring**: Azure Key Vault Integration und Observability-Pattern  
    - Managed Identity Authentifizierung und Least-Privilege-Zugriff  
    - Application Insights Telemetrie und Performancemonitoring  
    - Circuit Breaker und Fehlertoleranz-Pattern  
  - **Testframeworks**: Umfassende Teststrategien für kundenspezifische Transports  
    - Unit Tests mit Test-Doubles und Mocking-Frameworks  
    - Integrationstests mit Azure Test Containers  
    - Performance- und Lasttests Überlegungen  

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) – Emerging AI Disziplin  
- **README.md**: Umfassende Erkundung des Context Engineerings als aufstrebendem Fachgebiet  
  - **Grundprinzipien**: Vollständige Kontextteilung, Entscheidungsbewusstheit der Aktionen, Kontextfensterverwaltung  
  - **Ausrichtung am MCP-Protokoll**: Wie das MCP-Design Herausforderungen des Context Engineering adressiert  
    - Beschränkungen des Kontextfensters und progressive Lade-Strategien  
    - Relevanzbestimmung und dynamischer Kontextabruf  
    - Multimodale Kontextverarbeitung und Sicherheitsaspekte  
  - **Implementierungsansätze**: Single-Threaded vs. Multi-Agent-Architekturen  
    - Kontext-Chunks und Priorisierungstechniken  
    - Progressives Kontextladen und Kompressionsstrategien  
    - Geschichtete Kontextansätze und Abrufoptimierung  
  - **Messframework**: Emerging Metriken zur Bewertung der Kontextwirksamkeit  
    - Eingabeeffizienz, Leistung, Qualität und Nutzererfahrungsbetrachtungen  
    - Experimentelle Ansätze zur Kontextoptimierung  
    - Fehleranalyse und Verbesserungsmethoden  

#### Aktualisierungen der Curriculum-Navigation (README.md)  
- **Erweiterte Modulstruktur**: Lehrplantabelle erweitert um neue fortgeschrittene Themen  
  - Hinzufügung von Context Engineering (5.14) und Custom Transport (5.15)  
  - Einheitliche Formatierung und Navigationslinks für alle Module  
  - Aktualisierte Beschreibungen zur aktuellen Inhaltsabdeckung  

### Verbesserungen der Verzeichnisstruktur  
- **Namensstandardisierung**: Umbenennung von „mcp transport“ zu „mcp-transport“ für Konsistenz mit anderen Ordnern für fortgeschrittene Themen  
- **Inhaltsorganisation**: Alle 05-AdvancedTopics Ordner folgen nun einem einheitlichen Namensmuster (mcp-[thema])  

### Verbesserungen der Dokumentationsqualität  
- **MCP-Spezifikationsausrichtung**: Alle neuen Inhalte beziehen sich auf MCP Specification 2025-06-18  
- **Mehrsprachige Beispiele**: Umfassende Codebeispiele in C#, TypeScript und Python  
- **Enterprise-Fokus**: Produktreife Muster und Azure Cloud Integration durchgängig  
- **Visuelle Dokumentation**: Mermaid-Diagramme für Architektur- und Ablaufvisualisierung  

## 18. August 2025  

### Umfassendes Dokumentationsupdate – MCP 2025-06-18 Standards  

#### MCP Security Best Practices (02-Security/) – Vollständige Modernisierung  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Vollständige Neufassung im Einklang mit der MCP-Spezifikation 2025-06-18  
  - **Verpflichtende Anforderungen**: Hinzugefügt explizite MUST/MUST NOT Anforderungen aus offizieller Spezifikation mit klaren visuellen Markern  
  - **12 Kern-Sicherheitspraktiken**: Umstrukturierung von 15-Punkte-Liste zu umfassenden Sicherheitsdomänen  
    - Token-Sicherheit & Authentifizierung mit externer Identity Provider Integration  
    - Sitzungsmanagement & Transportsicherheit mit kryptografischen Anforderungen  
    - KI-spezifischer Bedrohungsschutz mit Microsoft Prompt Shields Integration  
    - Zugriffskontrolle & Berechtigungen mit Prinzip der minimalen Rechte  
    - Inhaltssicherheit & Monitoring mit Azure Content Safety Integration  
    - Supply Chain Security mit umfassender Komponentenprüfung  
    - OAuth-Sicherheit & Verhinderung von Confused Deputy mit PKCE-Implementierung  
    - Incident Response & Recovery mit automatisierten Fähigkeiten  
    - Compliance & Governance mit Regulatorischer Ausrichtung  
    - Erweiterte Sicherheitskontrollen mit Zero Trust Architektur  
    - Integration des Microsoft Security Ökosystems mit umfassenden Lösungen  
    - Kontinuierliche Sicherheitsentwicklung mit adaptiven Praktiken  
  - **Microsoft Security Solutions**: Verbesserte Integrationshinweise für Prompt Shields, Azure Content Safety, Entra ID, und GitHub Advanced Security  
  - **Implementierungs-Ressourcen**: Kategorisierte umfassende Ressourcenlinks nach Offizieller MCP-Dokumentation, Microsoft Security Solutions, Sicherheitsstandards und Implementierungsleitfäden  

#### Advanced Security Controls (02-Security/) – Enterprise-Implementierung  
- **MCP-SECURITY-CONTROLS-2025.md**: Vollständige Überarbeitung mit Enterprise-Level Sicherheitsrahmen  
  - **9 Umfassende Sicherheitsdomänen**: Erweitert von Basissteuerelementen zu einem detaillierten Unternehmensrahmen  
    - Erweiterte Authentifizierung & Autorisierung mit Microsoft Entra ID Integration  
    - Token-Sicherheit & Anti-Passthrough-Kontrollen mit umfassender Validierung  
    - Sitzungssicherheitskontrollen mit Hijacking-Prävention  
    - KI-spezifische Sicherheitskontrollen gegen Prompt Injection und Tool Poisoning  
    - Schutz vor Confused Deputy Attacken mit OAuth Proxy-Sicherheit  
    - Tool-Ausführungssicherheit mit Sandboxing und Isolation  
    - Supply Chain Sicherheitskontrollen mit Abhängigkeitsprüfung  
    - Monitoring- & Erkennungskontrollen mit SIEM-Integration  
    - Incident Response & Wiederherstellung mit Automatisierung  
  - **Implementierungsbeispiele**: Detaillierte YAML Konfigurationsblöcke und Codebeispiele hinzugefügt  
  - **Microsoft Solutions Integration**: Umfassende Abdeckung von Azure Sicherheitsdiensten, GitHub Advanced Security und Enterprise Identity Management  

#### Advanced Topics Security (05-AdvancedTopics/mcp-security/) – Produktionsreife Implementierung  
- **README.md**: Vollständige Neufassung für Enterprise-Sicherheit-Implementierung  
  - **Aktuelle Spezifikationsausrichtung**: Aktualisiert auf MCP Specification 2025-06-18 mit verpflichtenden Sicherheitsanforderungen  
  - **Erweiterte Authentifizierung**: Microsoft Entra ID Integration mit umfassenden .NET und Java Spring Security Beispielen  
  - **KI-Sicherheitsintegration**: Microsoft Prompt Shields und Azure Content Safety Implementation mit detaillierten Python-Beispielen  
  - **Erweiterte Bedrohungsminderung**: Umfassende Implementierungsbeispiele für  
    - Schutz vor Confused Deputy Attacken mit PKCE und User Consent Validierung  
    - Token-Passthrough-Prävention mit Audience Validation und sicherer Tokenverwaltung  
    - Sitzungs-Hijacking-Schutz mit kryptografischer Bindung und Verhaltensanalyse  
  - **Enterprise Sicherheitsintegration**: Azure Application Insights Monitoring, Bedrohungserkennungs-Pipelines und Supply Chain Security  
  - **Implementierungs-Checklist**: Klare Verpflichtende vs. empfohlene Sicherheitskontrollen mit Microsoft Security Ökosystem Vorteilen  

### Verbesserungen der Dokumentationsqualität & Standardausrichtung  
- **Spezifikationsreferenzen**: Alle Verweise auf aktuelle MCP Specification 2025-06-18 aktualisiert  
- **Microsoft Security Ökosystem**: Verbesserte Integrationshinweise in allen Sicherheitsdokumentationen  
- **Praktische Implementierung**: Detaillierte Codebeispiele in .NET, Java und Python mit Enterprise-Patterns hinzugefügt  
- **Ressourcenorganisation**: Umfassende Kategorisierung offizieller Dokumentation, Sicherheitsstandards und Implementierungsleitfäden  
- **Visuelle Indikatoren**: Klare Markierung verpflichtender Anforderungen vs. empfohlener Praktiken  

#### Kernkonzepte (01-CoreConcepts/) – Vollständige Modernisierung  
- **Protokollversions-Update**: Aktualisierung auf MCP Specification 2025-06-18 mit Datumsbasierter Versionierung (JJJJ-MM-TT Format)  
- **Architekturverfeinerung**: Verbesserte Beschreibungen zu Hosts, Clients und Servern zur Abbildung aktueller MCP-Architekturpatterns
  - Hosts jetzt klar definiert als KI-Anwendungen, die mehrere MCP-Clientverbindungen koordinieren
  - Clients beschrieben als Protokoll-Connectoren mit eins-zu-eins-Serverbeziehungen
  - Server mit Szenarien für lokale vs. Remote-Bereitstellung erweitert
- **Primitive Umstrukturierung**: Vollständige Überarbeitung der Server- und Client-Primitiven
  - Server-Primitiven: Ressourcen (Datenquellen), Prompts (Vorlagen), Tools (ausführbare Funktionen) mit detaillierten Erklärungen und Beispielen
  - Client-Primitiven: Sampling (LLM-Abschlüsse), Elicitation (Benutzereingabe), Logging (Debugging/Überwachung)
  - Aktualisiert mit aktuellen Discovery-(`*/list`), Retrieval-(`*/get`) und Execution-(`*/call`) Methodenmustern
- **Protokollarchitektur**: Einführung eines Zwei-Schichten-Architekturmodells
  - Datenschicht: JSON-RPC 2.0 Grundlage mit Lebenszyklusmanagement und Primitiven
  - Transportschicht: STDIO (lokal) und Streamable HTTP mit SSE (remote) Transportmechanismen
- **Sicherheitsrahmen**: Umfassende Sicherheitsprinzipien einschließlich expliziter Nutzerzustimmung, Datenschutz, sichere Tool-Ausführung und Transportschichtsicherheit
- **Kommunikationsmuster**: Aktualisierte Protokollnachrichten zur Darstellung von Initialisierung, Discovery, Ausführung und Benachrichtigungsabläufen
- **Code-Beispiele**: Erneuerte Mehrsprachen-Beispiele (.NET, Java, Python, JavaScript) zur Abbildung aktueller MCP SDK-Muster

#### Sicherheit (02-Security/) – Umfassende Sicherheitsüberholung  
- **Standards-Ausrichtung**: Vollständige Übereinstimmung mit den Sicherheitsanforderungen der MCP-Spezifikation 2025-06-18
- **Authentifizierungsentwicklung**: Dokumentierte Entwicklung von eigenen OAuth-Servern hin zur Delegierung an externe Identitätsanbieter (Microsoft Entra ID)
- **KI-spezifische Bedrohungsanalyse**: Verbesserte Abdeckung moderner KI-Angriffsvektoren
  - Detaillierte Szenarien zu Prompt Injection mit praxisnahen Beispielen
  - Tool-Vergiftungsmechanismen und "Rug Pull"-Angriffsmuster
  - Kontextfensterverschmutzung und Modellverwirrungsangriffe
- **Microsoft KI-Sicherheitslösungen**: Umfassende Darstellung des Microsoft-Sicherheits-Ökosystems
  - AI Prompt Shields mit fortschrittlichen Erkennungs-, Fokus- und Trennzeichen-Techniken
  - Azure Content Safety Integrationsmuster
  - GitHub Advanced Security zur Schutz der Lieferkette
- **Erweiterte Bedrohungsabwehr**: Detaillierte Sicherheitskontrollen für
  - Session Hijacking mit MCP-spezifischen Angriffsszenarien und kryptografischen Session-ID-Anforderungen
  - Confused Deputy-Probleme in MCP Proxy-Szenarien mit expliziten Zustimmungsanforderungen
  - Token-Passthrough-Schwachstellen mit obligatorischen Validierungskontrollen
- **Lieferkettensicherheit**: Erweiterte Abdeckung der KI-Lieferkette einschließlich Foundation Models, Embeddings-Dienste, Kontextanbieter und Drittanbieter-APIs
- **Foundation Security**: Verbesserte Integration mit Unternehmenssicherheitsmustern einschließlich Zero Trust Architektur und Microsoft-Sicherheitsökosystem
- **Ressourcenorganisation**: Kategorisierte umfassende Ressourcenlinks nach Typ (Offizielle Dokumentationen, Standards, Forschung, Microsoft-Lösungen, Implementierungsanleitungen)

### Verbesserungen der Dokumentationsqualität
- **Strukturierte Lernziele**: Verbesserte Lernziele mit spezifischen, umsetzbaren Ergebnissen
- **Querverweise**: Hinzugefügte Links zwischen verwandten Sicherheits- und Kernkonzept-Themen
- **Aktuelle Informationen**: Aktualisierung aller Datumsangaben und Spezifikationslinks auf aktuelle Standards
- **Implementierungshinweise**: Über beide Abschnitte verteilte spezifische, umsetzbare Umsetzungsanleitungen

## 16. Juli 2025

### README- und Navigationsverbesserungen
- Komplette Neugestaltung der Curriculumnavigation in README.md
- Ersetzung der `<details>`-Tags durch ein zugänglicheres tabellarisches Format
- Neue alternative Layout-Optionen im Ordner „alternative_layouts“ erstellt
- Hinzugefügte kartenbasierte, tabbenorientierte und Akkordeon-Navigation-Beispiele
- Aktualisierte Repositorium-Struktur mit allen neuesten Dateien
- Erweiterte Sektion „Wie man dieses Curriculum verwendet“ mit klaren Empfehlungen
- Aktualisierte MCP-Spezifikationslinks mit korrekten URLs
- Hinzugefügte Sektion Context Engineering (5.14) zur Curriculum-Struktur

### Updates zum Lernleitfaden
- Komplett überarbeiteter Lernleitfaden mit Abstimmung auf aktuelle Repository-Struktur
- Neue Abschnitte zu MCP-Clients und Tools sowie beliebten MCP-Servern hinzugefügt
- Aktualisierte Visual Curriculum Map zur genauen Darstellung aller Themen
- Erweiterte Beschreibungen zu Advanced Topics zur Abdeckung aller Spezialgebiete
- Aktualisierte Case Studies Sektion mit tatsächlichen Beispielen
- Hinzugefügtes umfassendes Änderungsprotokoll

### Beiträge aus der Community (06-CommunityContributions/)
- Detaillierte Informationen zu MCP-Servern für Bildgenerierung ergänzt
- Umfassende Sektion zur Nutzung von Claude in VSCode hinzugefügt
- Cline-Terminal-Client-Einrichtung und Nutzungsanweisungen ergänzt
- MCP-Client-Sektion um alle populären Clientoptionen erweitert
- Beitragsbeispiele mit präziseren Code-Samples verbessert

### Erweiterte Themen (05-AdvancedTopics/)
- Alle spezialisierten Themenordner mit konsistenter Benennung organisiert
- Kontext-Engineering-Materialien und Beispiele ergänzt
- Dokumentation zur Foundry-Agent-Integration hinzugefügt
- Verbesserte Dokumentation zur Entra ID Sicherheitsintegration

## 11. Juni 2025

### Erste Erstellung
- Erste Version des MCP for Beginners Curriculums veröffentlicht
- Grundstruktur aller 10 Hauptabschnitte erstellt
- Visual Curriculum Map für Navigation implementiert
- Erste Beispielprojekte in mehreren Programmiersprachen hinzugefügt

### Erste Schritte (03-GettingStarted/)
- Erste Server-Implementierungsbeispiele erstellt
- Leitfaden für Client-Entwicklung hinzugefügt
- Anleitungen zur LLM-Client-Integration enthalten
- Dokumentation zur VS Code Integration ergänzt
- Beispielimplementierungen mit Server-Sent Events (SSE) Servern implementiert

### Kernkonzepte (01-CoreConcepts/)
- Detaillierte Erklärung der Client-Server-Architektur hinzugefügt
- Dokumentation zu Schlüsselprotokollkomponenten erstellt
- Messaging-Muster im MCP dokumentiert

## 23. Mai 2025

### Repositorium-Struktur
- Repository mit grundlegender Ordnerstruktur initialisiert
- README-Dateien für jeden Hauptabschnitt erstellt
- Übersetzungsinfrastruktur eingerichtet
- Bildmaterialien und Diagramme hinzugefügt

### Dokumentation
- Erste README.md mit Curriculum-Übersicht erstellt
- CODE_OF_CONDUCT.md und SECURITY.md hinzugefügt
- SUPPORT.md mit Hilfeseiten eingerichtet
- Vorläufige Struktur des Lernleitfadens erstellt

## 15. April 2025

### Planung und Rahmenwerk
- Erste Planung des MCP for Beginners Curriculums
- Lernziele und Zielgruppe definiert
- Struktur der 10 Curriculum-Abschnitte skizziert
- Konzeptuelles Rahmenwerk für Beispiele und Fallstudien entwickelt
- Erste Prototyp-Beispiele für Kernkonzepte erstellt

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mithilfe des KI-Übersetzungsdienstes [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, können automatische Übersetzungen Fehler oder Ungenauigkeiten enthalten. Das Originaldokument in seiner ursprünglichen Sprache ist als maßgebliche Quelle zu betrachten. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->