```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web App<br/>(ContentSafetyController)
    participant SafetyService as Content Safety Service
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP Client
    participant McpServer as MCP Calculator Server<br/>(Port 8080)
    participant CalcService as Calculator Service

    %% Gebruikersinteractie
    User->>WebApp: Voer berekeningsprompt in
    WebApp->>WebApp: Maak PromptRequest aan

    %% Controle inhoudsveiligheid
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Controleer of inhoud veilig is<br/>(ernst < 2 voor alle categorieën)

    %% Verwerkingsstroom - Veilige inhoud
    alt Inhoud is veilig
        SafetyService->>LangChain: Geef prompt door aan Bot.chat()
        LangChain->>McpClient: Verwerk prompt
        McpClient->>McpServer: Roep gepaste rekenhulpmiddel aan via SSE
        McpServer->>CalcService: Voer berekening uit<br/>(optellen, aftrekken, vermenigvuldigen, etc.)
        CalcService-->>McpServer: Berekeningsresultaat
        McpServer-->>McpClient: Resultaat van hulpmiddeluitvoering
        McpClient-->>LangChain: Resultaat hulpmiddel
        LangChain-->>SafetyService: Bot reactie
        SafetyService-->>WebApp: Keer resultaatmap terug<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Toon berekeningsresultaat en veiligheidsinformatie
    else Inhoud is onveilig
        SafetyService-->>WebApp: Keer resultaatmap terug<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Toon veiligheidswaarschuwing<br/>(zonder berekening)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->