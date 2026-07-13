```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web-App<br/>(ContentSafetyController)
    participant SafetyService as Content-Sicherheitsdienst
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP-Client
    participant McpServer as MCP-Rechner-Server<br/>(Port 8080)
    participant CalcService as Rechnerdienst

    %% Benutzerinteraktion
    User->>WebApp: Berechnungsaufforderung eingeben
    WebApp->>WebApp: PromptRequest erstellen

    %% Inhalts-Sicherheitsprüfung
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Prüfen, ob Inhalt sicher ist<br/>(Schweregrad < 2 für alle Kategorien)

    %% Verarbeitungsablauf – sicherer Inhalt
    alt Inhalt ist sicher
        SafetyService->>LangChain: Aufforderung an Bot.chat() weitergeben
        LangChain->>McpClient: Aufforderung verarbeiten
        McpClient->>McpServer: Passendes Rechnerwerkzeug via SSE aufrufen
        McpServer->>CalcService: Berechnung ausführen<br/>(addieren, subtrahieren, multiplizieren usw.)
        CalcService-->>McpServer: Berechnungsergebnis
        McpServer-->>McpClient: Ergebnis der Werkzeugausführung
        McpClient-->>LangChain: Werkzeugergebnis
        LangChain-->>SafetyService: Bot-Antwort
        SafetyService-->>WebApp: Ergebnis-Map zurückgeben<br/>{isSafe: "true", botResponse: Ergebnis, safetyResult: Details}
        WebApp-->>User: Berechnungsergebnis und Sicherheitsinfo anzeigen
    else Inhalt ist unsicher
        SafetyService-->>WebApp: Ergebnis-Map zurückgeben<br/>{isSafe: "false", safetyResult: Details}
        WebApp-->>User: Sicherheitswarnung anzeigen<br/>(ohne Berechnung)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->