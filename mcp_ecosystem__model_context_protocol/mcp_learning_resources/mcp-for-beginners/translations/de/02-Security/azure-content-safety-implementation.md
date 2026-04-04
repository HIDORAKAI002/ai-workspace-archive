# Implementierung von Azure Content Safety mit MCP

> **Behandeltes OWASP MCP Risiko**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Um die Sicherheit von MCP gegen Prompt Injection, Tool-Vergiftung und andere KI-spezifische Schwachstellen zu stärken, wird die Integration von Azure Content Safety dringend empfohlen. Diese Implementierungsanleitung stimmt mit dem [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security überein.

## Integration mit MCP Server

Um Azure Content Safety in Ihren MCP-Server zu integrieren, fügen Sie den Content Safety-Filter als Middleware in Ihre Anfrageverarbeitungspipeline ein:

1. Initialisieren Sie den Filter beim Serverstart
2. Validieren Sie alle eingehenden Tool-Anfragen vor der Verarbeitung
3. Überprüfen Sie alle ausgehenden Antworten, bevor Sie diese an die Clients zurückgeben
4. Protokollieren und alarmieren Sie bei Sicherheitsverstößen
5. Implementieren Sie eine angemessene Fehlerbehandlung für fehlgeschlagene Content Safety-Prüfungen

Dies bietet einen robusten Schutz gegen:
- Prompt Injection Angriffe
- Versuche der Tool-Vergiftung
- Datenexfiltration durch bösartige Eingaben
- Erzeugung schädlicher Inhalte

## Best Practices für die Integration von Azure Content Safety

1. **Benutzerdefinierte Sperrlisten**: Erstellen Sie speziell für MCP Injection-Muster benutzerdefinierte Sperrlisten
2. **Schweregrad-Anpassung**: Passen Sie Schweregrad-Schwellenwerte je nach Ihrem spezifischen Anwendungsfall und Risikotoleranz an
3. **Umfassende Abdeckung**: Wenden Sie Content Safety-Prüfungen auf alle Eingaben und Ausgaben an
4. **Leistungsoptimierung**: Ziehen Sie die Implementierung von Caching für wiederholte Content Safety-Prüfungen in Betracht
5. **Fallback-Mechanismen**: Definieren Sie klare Fallback-Verhalten, wenn Content Safety-Dienste nicht verfügbar sind
6. **Nutzerfeedback**: Geben Sie Nutzern ein klares Feedback, wenn Inhalte aufgrund von Sicherheitsbedenken blockiert werden
7. **Kontinuierliche Verbesserung**: Aktualisieren Sie Sperrlisten und Muster regelmäßig basierend auf neuen Bedrohungen

## Zusätzliche Ressourcen

### OWASP MCP Security Guidance
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Umfassendes OWASP MCP Top 10 mit Azure-Implementierung
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) – Detaillierte Muster zur Vermeidung von Prompt Injection
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) – Praktisches Camp 3: I/O Security behandelt Content Safety

### Azure Dokumentation
- [Azure Content Safety Übersicht](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentation zu Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Was kommt als Nächstes

- Zurück zu: [Übersicht Sicherheitsmodul](./README.md)
- Weiter zu: [Modul 3: Erste Schritte](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mithilfe des KI-Übersetzungsdienstes [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir auf Genauigkeit achten, kann es sein, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten. Das Originaldokument in seiner Ursprungssprache ist als maßgebliche Quelle heranzuziehen. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->