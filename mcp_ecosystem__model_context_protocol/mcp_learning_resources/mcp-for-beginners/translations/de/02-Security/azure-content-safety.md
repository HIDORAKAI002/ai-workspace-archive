# Erweiterte MCP-Sicherheit mit Azure Content Safety

> **Behandelte OWASP MCP-Risiken**: [MCP06 - Prompt Injection durch kontextuelle Nutzlasten](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety bietet mehrere leistungsstarke Tools, die die Sicherheit Ihrer MCP-Implementierungen verbessern können. Für praktische Umsetzungserfahrungen siehe [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsofts AI Prompt Shields bieten robusten Schutz vor direkten und indirekten Prompt Injection-Angriffen durch:

1. **Erweiterte Erkennung**: Verwendet Machine Learning, um bösartige Anweisungen, die im Inhalt eingebettet sind, zu identifizieren.
2. **Spotlighting**: Transformiert Eingabetext, um KI-Systemen zu helfen, gültige Anweisungen von externen Eingaben zu unterscheiden.
3. **Begrenzer und Datenmarkierung**: Markiert Grenzen zwischen vertrauenswürdigen und nicht vertrauenswürdigen Daten.
4. **Content Safety-Integration**: Arbeitet mit Azure AI Content Safety zusammen, um Jailbreak-Versuche und schädliche Inhalte zu erkennen.
5. **Kontinuierliche Updates**: Microsoft aktualisiert regelmäßig Schutzmechanismen gegen aufkommende Bedrohungen.

## Implementierung von Azure Content Safety mit MCP

Dieser Ansatz bietet mehrschichtigen Schutz:
- Scannen der Eingaben vor der Verarbeitung
- Validierung der Ausgaben vor der Rückgabe
- Verwendung von Blocklists für bekannte schädliche Muster
- Nutzung der kontinuierlich aktualisierten Content Safety-Modelle von Azure

## Azure Content Safety Ressourcen

Um mehr über die Implementierung von Azure Content Safety mit Ihren MCP-Servern zu erfahren, konsultieren Sie diese offiziellen Ressourcen:

1. [Azure AI Content Safety Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Offizielle Dokumentation zu Azure Content Safety.
2. [Prompt Shield Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Lernen Sie, wie Sie Prompt Injection-Angriffe verhindern.
3. [Content Safety API Referenz](https://learn.microsoft.com/rest/api/contentsafety/) - Ausführliche API-Referenz für die Implementierung von Content Safety.
4. [Quickstart: Azure Content Safety mit C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Schnelle Implementierungsanleitung mit C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Client-Bibliotheken für verschiedene Programmiersprachen.
6. [Erkennung von Jailbreak-Versuchen](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Spezifische Hinweise zur Erkennung und Verhinderung von Jailbreak-Versuchen.
7. [Best Practices für Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Best Practices für eine effektive Umsetzung von Content Safety.

Für eine vertiefte Implementierung siehe unseren [Azure Content Safety Implementierungsleitfaden](./azure-content-safety-implementation.md).

## Was kommt als Nächstes

- Lesen: [Azure Content Safety Implementierung](./azure-content-safety-implementation.md)
- Zurück zu: [Übersicht Sicherheitsmodul](./README.md)
- Weiter zu: [Modul 3: Erste Schritte](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ausgangssprache gilt als verbindliche Quelle. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->