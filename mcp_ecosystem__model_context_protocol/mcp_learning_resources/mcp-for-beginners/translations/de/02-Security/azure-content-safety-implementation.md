# Implementierung von Azure Content Safety mit MCP

> **Behandeltes OWASP MCP-Risiko**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Um die MCP-Sicherheit gegen Prompt Injection, Tool Poisoning und andere KI-spezifische Schwachstellen zu stärken, wird die Integration von Azure Content Safety dringend empfohlen. Diese Implementierungsanleitung entspricht dem [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integration mit dem MCP-Server

Um Azure Content Safety in Ihren MCP-Server zu integrieren, fügen Sie den Content-Safety-Filter als Middleware in Ihre Anforderungsverarbeitungspipeline ein:

1. Initialisieren Sie den Filter während des Serverstarts
2. Validieren Sie alle eingehenden Tool-Anfragen vor der Verarbeitung
3. Prüfen Sie alle ausgehenden Antworten, bevor sie an die Clients zurückgegeben werden
4. Protokollieren und alarmieren Sie bei Sicherheitsverletzungen
5. Implementieren Sie eine angemessene Fehlerbehandlung für fehlgeschlagene Content-Safety-Prüfungen

Dies bietet einen robusten Schutz gegen:
- Prompt Injection-Angriffe
- Versuche des Tool Poisonings
- Datenexfiltration durch bösartige Eingaben
- Erzeugung schädlicher Inhalte

## Best Practices für die Integration von Azure Content Safety

1. **Benutzerdefinierte Blocklisten**: Erstellen Sie benutzerdefinierte Blocklisten speziell für MCP-Injektionsmuster
2. **Schweregrad-Anpassung**: Passen Sie die Schweregrenzwerte basierend auf Ihrem spezifischen Anwendungsfall und Risikoappetit an
3. **Umfassende Abdeckung**: Wenden Sie Content-Safety-Prüfungen auf alle Eingaben und Ausgaben an
4. **Leistungsoptimierung**: Erwägen Sie die Implementierung von Caching für wiederholte Content-Safety-Prüfungen
5. **Fallback-Mechanismen**: Definieren Sie klare Fallback-Verhalten, wenn Content-Safety-Dienste nicht verfügbar sind
6. **Benutzerfeedback**: Geben Sie den Nutzern klare Rückmeldungen, wenn Inhalte aufgrund von Sicherheitsbedenken blockiert werden
7. **Kontinuierliche Verbesserung**: Aktualisieren Sie regelmäßig Blocklisten und Muster basierend auf neuen Bedrohungen

## Zusätzliche Ressourcen

### OWASP MCP Sicherheitsrichtlinien
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Umfassende OWASP MCP Top 10 mit Azure-Implementierung
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detaillierte Muster zur Abmilderung von Prompt-Injection
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Hands-on Camp 3: I/O Security behandelt Content Safety

### Azure Dokumentation
- [Azure Content Safety Übersicht](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Schnellstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Was kommt als Nächstes

- Zurück zu: [Security Module Overview](./README.md)
- Weiter zu: [Modul 3: Erste Schritte](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->