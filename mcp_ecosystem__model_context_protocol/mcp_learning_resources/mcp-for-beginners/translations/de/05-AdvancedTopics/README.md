# Erweiterte Themen in MCP

[![Fortgeschrittenes MCP: Sichere, skalierbare und multimodale KI-Agenten](../../../translated_images/de/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klicken Sie auf das obige Bild, um das Video dieser Lektion anzusehen)_

Dieses Kapitel behandelt eine Reihe fortgeschrittener Themen in der Implementierung des Model Context Protocol (MCP), einschließlich multimodaler Integration, Skalierbarkeit, bewährter Sicherheitspraktiken und Unternehmensintegration. Diese Themen sind entscheidend für den Aufbau robuster und produktionsreifer MCP-Anwendungen, die den Anforderungen moderner KI-Systeme gerecht werden können.

## Übersicht

Diese Lektion untersucht fortgeschrittene Konzepte der Implementierung des Model Context Protocol, mit Schwerpunkt auf multimodaler Integration, Skalierbarkeit, bewährten Sicherheitspraktiken und Unternehmensintegration. Diese Themen sind unerlässlich für den Aufbau von MCP-Anwendungen in Produktionsqualität, die komplexe Anforderungen in Unternehmensumgebungen bewältigen können.

## Lernziele

Am Ende dieser Lektion können Sie:

- Multimodale Fähigkeiten innerhalb von MCP-Frameworks implementieren
- Skalierbare MCP-Architekturen für Szenarien mit hoher Nachfrage entwerfen
- Sicherheits-Best-Practices anwenden, die den Sicherheitsprinzipien von MCP entsprechen
- MCP in Unternehmens-KI-Systeme und -Frameworks integrieren
- Leistung und Zuverlässigkeit in Produktionsumgebungen optimieren

## Lektionen und Beispielprojekte

| Link | Titel | Beschreibung |
|------|-------|-------------|
| [5.1 Integration mit Azure](./mcp-integration/README.md) | Integration mit Azure | Lernen Sie, wie Sie Ihren MCP-Server auf Azure integrieren |
| [5.2 Multimodales Beispiel](./mcp-multi-modality/README.md) | MCP Multimodale Beispiele  | Beispiele für Audio-, Bild- und multimodale Antworten |
| [5.3 MCP OAuth2 Beispiel](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimalistische Spring Boot-App, die OAuth2 mit MCP zeigt, sowohl als Autorisierungs- als auch Ressourcenserver. Demonstriert sichere Token-Ausgabe, geschützte Endpunkte, Azure Container Apps Deployment und API-Management-Integration. |
| [5.4 Root-Kontexte](./mcp-root-contexts/README.md) | Root-Kontexte  | Erfahren Sie mehr über Root-Kontexte und deren Implementierung |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Lernen Sie verschiedene Routing-Typen kennen |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lernen Sie den Umgang mit Sampling |
| [5.7 Skalierung](./mcp-scaling/README.md) | Skalierung  | Lernen Sie etwas über Skalierung |
| [5.8 Sicherheit](./mcp-security/README.md) | Sicherheit  | Sichern Sie Ihren MCP-Server |
| [5.9 Web-Suchbeispiel](./web-search-mcp/README.md) | Web Suche MCP | Python MCP-Server und Client, die SerpAPI für Echtzeit-Web-, Nachrichten-, Produkt-Suche und Q&A integrieren. Zeigt Multi-Tool-Orchestrierung, externe API-Integration und robuste Fehlerbehandlung. |
| [5.10 Echtzeit-Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Echtzeit-Datenstreaming ist in der heutigen datengetriebenen Welt essenziell, in der Unternehmen und Anwendungen sofortigen Zugriff auf Informationen benötigen, um zeitnahe Entscheidungen zu treffen.|
| [5.11 Echtzeit-Websuche](./mcp-realtimesearch/README.md) | Web Suche | Wie MCP die Echtzeit-Websuche durch einen standardisierten Ansatz für Kontextmanagement über KI-Modelle, Suchmaschinen und Anwendungen hinweg transformiert.| 
| [5.12 Entra ID Authentifizierung für Model Context Protocol Server](./mcp-security-entra/README.md) | Entra ID Authentifizierung | Microsoft Entra ID bietet eine robuste cloudbasierte Identitäts- und Zugriffsverwaltungslösung, die sicherstellt, dass nur autorisierte Benutzer und Anwendungen mit Ihrem MCP-Server interagieren können.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integration | Lernen Sie, wie Sie Model Context Protocol-Server mit Microsoft Foundry Agents integrieren, um leistungsfähige Tool-Orchestrierung und Unternehmens-KI-Fähigkeiten mit standardisierten Schnittstellen zu externen Datenquellen zu ermöglichen.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Die zukünftigen Möglichkeiten von Context Engineering-Techniken für MCP-Server, einschließlich Kontextoptimierung, dynamischem Kontextmanagement und Strategien für effektives Prompt Engineering innerhalb von MCP-Frameworks.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Benutzerdefinierter Transport | Lernen Sie, wie Sie maßgeschneiderte Transportmechanismen für spezialisierte MCP-Kommunikationsszenarien implementieren.|
| [5.16 Protokoll-Funktions-Deep-Dive](./mcp-protocol-features/README.md) | Protokoll-Funktionen | Beherrschen Sie erweiterte Protokollfunktionen einschließlich Fortschrittsbenachrichtigungen, Anfragestornierung, Ressourcentemplates und Fehlerbehandlungsmuster.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversariale Agenten | Verwenden Sie zwei Agenten mit gegensätzlichen Positionen, die ein einheitliches MCP-Toolset teilen, um Halluzinationen zu erkennen, Randfälle aufzudecken und besser kalibrierte Ausgaben durch strukturierte Debatte zu erzeugen.|

> **Neu in MCP-Spezifikation 2025-11-25**: Die Spezifikation enthält jetzt experimentelle Unterstützung für **Tasks** (lang laufende Operationen mit Fortschrittsverfolgung), **Tool-Anmerkungen** (Metadaten über Tool-Verhalten zur Sicherheit), **URL-Modus-Elicitation** (Anforderung spezifischer URL-Inhalte von Clients) und verbesserte **Roots** (für das Management von Arbeitsbereichskontexten). Siehe das [MCP-Spezifikations-Change-Log](https://spec.modelcontextprotocol.io/) für vollständige Details.

## Zusätzliche Referenzen

Für die aktuellsten Informationen zu fortgeschrittenen MCP-Themen siehe:
- [MCP Dokumentation](https://modelcontextprotocol.io/)
- [MCP Spezifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sicherheitsrisiken und Gegenmaßnahmen
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisches Sicherheitstraining

## Wichtige Erkenntnisse

- Multimodale MCP-Implementierungen erweitern KI-Fähigkeiten über die Textverarbeitung hinaus
- Skalierbarkeit ist für Unternehmenseinsätze unerlässlich und kann durch horizontale und vertikale Skalierung erreicht werden
- Umfassende Sicherheitsmaßnahmen schützen Daten und gewährleisten ordnungsgemäße Zugriffskontrolle
- Die Integration in Unternehmensplattformen wie Azure OpenAI und Microsoft AI Foundry verbessert die MCP-Fähigkeiten
- Fortgeschrittene MCP-Implementierungen profitieren von optimierten Architekturen und sorgfältigem Ressourcenmanagement

## Übung

Entwerfen Sie eine MCP-Implementierung in Unternehmensqualität für einen spezifischen Anwendungsfall:

1. Identifizieren Sie multimodale Anforderungen für Ihren Anwendungsfall
2. Skizzieren Sie die erforderlichen Sicherheitskontrollen zum Schutz sensibler Daten
3. Entwerfen Sie eine skalierbare Architektur, die unterschiedliche Lasten bewältigen kann
4. Planen Sie Integrationspunkte mit Unternehmens-KI-Systemen
5. Dokumentieren Sie mögliche Leistungsengpässe und Gegenmaßnahmen

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