# Erweiterte MCP-Sicherheit mit Azure Content Safety

> **Behandeltes OWASP MCP-Risiko**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety bietet mehrere leistungsstarke Tools, die die Sicherheit Ihrer MCP-Implementierungen verbessern können. Für praktische Implementierungserfahrungen siehe [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Die AI Prompt Shields von Microsoft bieten einen robusten Schutz gegen direkte und indirekte Prompt Injection-Angriffe durch:

1. **Erweiterte Erkennung**: Verwendet maschinelles Lernen, um bösartige Anweisungen, die in Inhalten eingebettet sind, zu identifizieren.
2. **Spotlighting**: Verwandelt Eingabetexte, um AI-Systemen zu helfen, zwischen gültigen Anweisungen und externen Eingaben zu unterscheiden.
3. **Trennzeichen und Datamarkierung**: Markiert Grenzen zwischen vertrauenswürdigen und nicht vertrauenswürdigen Daten.
4. **Content Safety Integration**: Arbeitet mit Azure AI Content Safety zusammen, um Jailbreak-Versuche und schädliche Inhalte zu erkennen.
5. **Kontinuierliche Updates**: Microsoft aktualisiert regelmäßig Schutzmechanismen gegen aufkommende Bedrohungen.

## Implementierung von Azure Content Safety mit MCP

Dieser Ansatz bietet mehrschichtigen Schutz:
- Scannen von Eingaben vor der Verarbeitung
- Validierung von Ausgaben vor der Rückgabe
- Verwendung von Blocklisten für bekannte schädliche Muster
- Nutzung der kontinuierlich aktualisierten Content Safety-Modelle von Azure

## Ressourcen zu Azure Content Safety

Um mehr über die Implementierung von Azure Content Safety mit Ihren MCP-Servern zu erfahren, konsultieren Sie diese offiziellen Ressourcen:

1. [Azure AI Content Safety Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/) – Offizielle Dokumentation für Azure Content Safety.
2. [Prompt Shield Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) – Erfahren Sie, wie Sie Prompt Injection-Angriffe verhindern können.
3. [Content Safety API-Referenz](https://learn.microsoft.com/rest/api/contentsafety/) – Detaillierte API-Referenz zur Implementierung von Content Safety.
4. [Schnellstart: Azure Content Safety mit C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) – Schnelle Implementierungsanleitung mit C#.
5. [Content Safety Client-Bibliotheken](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) – Client-Bibliotheken für verschiedene Programmiersprachen.
6. [Erkennung von Jailbreak-Versuchen](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) – Spezifische Anleitungen zur Erkennung und Verhinderung von Jailbreak-Versuchen.
7. [Best Practices für Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) – Best Practices für eine effektive Implementierung von Content Safety.

Für eine ausführlichere Implementierung siehe unseren [Azure Content Safety Implementierungsleitfaden](./azure-content-safety-implementation.md).

## Was kommt als Nächstes

- Lesen: [Azure Content Safety Implementierung](./azure-content-safety-implementation.md)
- Zurück zu: [Überblick Sicherheitsmodul](./README.md)
- Weiter zu: [Modul 3: Erste Schritte](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->