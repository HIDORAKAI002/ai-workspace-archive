# Erweiterte Themen in MCP

[![Erweiterte MCP: Sichere, skalierbare und multimodale KI-Agenten](../../../translated_images/de/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klicken Sie auf das obige Bild, um das Video zu dieser Lektion anzusehen)_

Dieses Kapitel behandelt eine Reihe von fortgeschrittenen Themen bei der Implementierung des Model Context Protocol (MCP), darunter multimodale Integration, Skalierbarkeit, Sicherheitsbest Practices und Unternehmensintegration. Diese Themen sind entscheidend für den Aufbau robuster und produktionsreifer MCP-Anwendungen, die den Anforderungen moderner KI-Systeme gerecht werden können.

## Überblick

In dieser Lektion werden fortgeschrittene Konzepte der Model Context Protocol-Implementierung untersucht, mit Fokus auf multimodale Integration, Skalierbarkeit, Sicherheitsbest Practices und Unternehmensintegration. Diese Themen sind unerlässlich, um produktionsreife MCP-Anwendungen zu erstellen, die komplexe Anforderungen in Unternehmensumgebungen bewältigen können.

> **Ausblick:** Mehrere unten genannte Themen sind von der MCP-Spezifikationsversion `2026-07-28` Release Candidate betroffen — Root Contexts (5.4) und Sampling (5.6) bauen auf Primitiven auf, die vom Release Candidate als veraltet markiert sind, und die experimentelle Tasks-Funktion, die in Protocol Features (5.16) erwähnt wird, wird in eine eigene Tasks-Erweiterung verschoben. Details finden Sie unter [Was ändert sich in MCP: Der Release Candidate 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Lernziele

Am Ende dieser Lektion werden Sie in der Lage sein:

- Multi-modale Fähigkeiten innerhalb von MCP-Frameworks zu implementieren
- Skalierbare MCP-Architekturen für anspruchsvolle Szenarien zu entwerfen
- Sicherheitsbest Practices anzuwenden, die auf den Sicherheitsprinzipien von MCP basieren
- MCP mit Unternehmens-KI-Systemen und -Frameworks zu integrieren
- Leistung und Zuverlässigkeit in Produktionsumgebungen zu optimieren

## Lektionen und Beispielprojekte

| Link | Titel | Beschreibung |
|------|-------|-------------|
| [5.1 Integration mit Azure](./mcp-integration/README.md) | Integration mit Azure | Lernen Sie, wie Sie Ihren MCP-Server auf Azure integrieren |
| [5.2 Multi-modal-Beispiel](./mcp-multi-modality/README.md) | MCP Multi-modale Beispiele | Beispiele für Audio, Bild und multimodale Antworten |
| [5.3 MCP OAuth2 Beispiel](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimalistische Spring Boot-App, die OAuth2 mit MCP zeigt, sowohl als Autorisierungs- als auch als Ressourcenserver. Demonstriert sichere Token-Ausgabe, geschützte Endpunkte, Azure Container Apps-Bereitstellung und API-Management-Integration. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root-Contexts | Erfahren Sie mehr über Root-Context und wie Sie ihn implementieren |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Lernen Sie verschiedene Arten des Routings kennen |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lernen Sie, wie mit Sampling gearbeitet wird |
| [5.7 Skalierung](./mcp-scaling/README.md) | Skalierung | Lernen Sie über Skalierung |
| [5.8 Sicherheit](./mcp-security/README.md) | Sicherheit | Sichern Sie Ihren MCP-Server |
| [5.9 Web-Suche Beispiel](./web-search-mcp/README.md) | Web-Suche MCP | Python MCP-Server und -Client, integriert mit SerpAPI für Echtzeit-Web-, Nachrichten-, Produktsuche und Q&A. Demonstriert Multi-Tool-Orchestrierung, externe API-Integration und robuste Fehlerbehandlung. |
| [5.10 Echtzeit-Streaming](./mcp-realtimestreaming/README.md) | Streaming | Echtzeit-Daten-Streaming ist in der heutigen datengetriebenen Welt unerlässlich, in der Unternehmen und Anwendungen sofortigen Zugriff auf Informationen benötigen, um zeitnahe Entscheidungen zu treffen. |
| [5.11 Echtzeit-Websuche](./mcp-realtimesearch/README.md) | Web-Suche | Echtzeit-Websuche: wie MCP die Echtzeit-Websuche transformiert, indem es einen standardisierten Ansatz für das Kontextmanagement über KI-Modelle, Suchmaschinen und Anwendungen bietet. |
| [5.12 Entra ID Authentifizierung für Model Context Protocol Server](./mcp-security-entra/README.md) | Entra ID Authentifizierung | Microsoft Entra ID bietet eine robuste cloudbasierte Identitäts- und Zugriffsverwaltungslösung, die sicherstellt, dass nur autorisierte Benutzer und Anwendungen mit Ihrem MCP-Server interagieren können. |
| [5.13 Microsoft Foundry Agent-Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integration | Erfahren Sie, wie Model Context Protocol Server mit Microsoft Foundry Agents integriert werden, um leistungsstarke Tool-Orchestrierung und Unternehmens-KI-Fähigkeiten mit standardisierten Verbindungen zu externen Datenquellen zu ermöglichen. |
| [5.14 Kontext-Engineering](./mcp-contextengineering/README.md) | Kontext-Engineering | Die zukünftigen Möglichkeiten von Kontext-Engineering-Techniken für MCP-Server, einschließlich Kontextoptimierung, dynamischem Kontextmanagement und Strategien für effektives Prompt Engineering innerhalb von MCP-Frameworks. |
| [5.15 MCP benutzerdefinierter Transport](./mcp-transport/README.md) | Benutzerdefinierter Transport | Lernen Sie, wie Sie benutzerdefinierte Transportmechanismen für spezielle MCP-Kommunikationsszenarien implementieren. |
| [5.16 Protokoll-Funktionstiefe](./mcp-protocol-features/README.md) | Protokoll-Funktionen | Beherrschen Sie erweiterte Protokollfunktionen einschließlich Fortschrittsbenachrichtigungen, Anforderungscancellation, Ressourcenvorlagen und Fehlerbehandlungsmustern. |
| [5.17 Gegnerschaftliches Multi-Agenten-Denken](./mcp-adversarial-agents/README.md) | Gegnerschaftliche Agenten | Verwenden Sie zwei Agenten mit gegensätzlichen Positionen, die ein einziges MCP-Werkzeugsatz teilen, um Halluzinationen zu erkennen, Randfälle aufzudecken und durch strukturierte Debatten besser kalibrierte Ausgaben zu erzeugen. |

> **Neu in der MCP-Spezifikation 2025-11-25**: Die Spezifikation beinhaltet nun experimentelle Unterstützung für **Tasks** (Langzeitoperationen mit Fortschrittsverfolgung), **Tool-Anmerkungen** (Metadaten zum Werkzeugverhalten für Sicherheit), **URL Mode Elicitation** (Anforderung spezifischer URL-Inhalte von Clients) und erweiterte **Roots** (für das Management von Arbeitsbereichskontexten). Details finden Sie im [MCP-Spezifikations-Änderungsprotokoll](https://spec.modelcontextprotocol.io/).

## Weitere Referenzen

Für die aktuellsten Informationen zu fortgeschrittenen MCP-Themen siehe:
- [MCP-Dokumentation](https://modelcontextprotocol.io/)
- [MCP-Spezifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub-Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sicherheitsrisiken und Gegenmaßnahmen
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktische Sicherheitsschulung

## Wichtige Erkenntnisse

- Multi-modale MCP-Implementierungen erweitern die KI-Fähigkeiten über die reine Textverarbeitung hinaus
- Skalierbarkeit ist essentiell für Unternehmenseinsätze und kann durch horizontale und vertikale Skalierung erreicht werden
- Umfassende Sicherheitsmaßnahmen schützen Daten und gewährleisten ordnungsgemäße Zugriffskontrolle
- Die Unternehmensintegration mit Plattformen wie Azure OpenAI und Microsoft AI Foundry erweitert MCP-Fähigkeiten
- Fortschrittliche MCP-Implementierungen profitieren von optimierten Architekturen und sorgfältigem Ressourcenmanagement

## Übung

Entwerfen Sie eine MCP-Implementierung auf Unternehmensebene für einen spezifischen Anwendungsfall:

1. Identifizieren Sie multimodale Anforderungen für Ihren Anwendungsfall
2. Skizzieren Sie die erforderlichen Sicherheitskontrollen zum Schutz sensibler Daten
3. Entwerfen Sie eine skalierbare Architektur, die unterschiedliche Lasten bewältigen kann
4. Planen Sie Integrationspunkte mit Unternehmens-KI-Systemen
5. Dokumentieren Sie mögliche Leistungsengpässe und Strategien zu deren Behebung

## Zusätzliche Ressourcen

- [Azure OpenAI Dokumentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Dokumentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Was kommt als Nächstes

Erkunden Sie die Lektionen in diesem Modul beginnend mit: [5.1 MCP Integration](./mcp-integration/README.md)

Nachdem Sie dieses Modul abgeschlossen haben, fahren Sie fort zu: [Modul 6: Community-Beiträge](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->