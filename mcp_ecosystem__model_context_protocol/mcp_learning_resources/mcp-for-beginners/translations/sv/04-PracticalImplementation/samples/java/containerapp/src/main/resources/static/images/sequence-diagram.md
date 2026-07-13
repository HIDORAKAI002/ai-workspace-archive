```mermaid
sequenceDiagram
    actor User
    participant WebApp as Webbapp<br/>(ContentSafetyController)
    participant SafetyService as Innehållssäkerhetstjänst
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP-klient
    participant McpServer as MCP Calculator Server<br/>(Port 8080)
    participant CalcService as Kalkylatortjänst

    %% Användarinteraktion
    User->>WebApp: Ange kalkylprompt
    WebApp->>WebApp: Skapa PromptRequest

    %% Innehållssäkerhetskontroll
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Kontrollera om innehållet är säkert<br/>(allvarlighetsgrad < 2 för alla kategorier)

    %% Bearbetningsflöde - Säkert innehåll
    alt Innehållet är säkert
        SafetyService->>LangChain: Skicka prompt till Bot.chat()
        LangChain->>McpClient: Bearbeta prompt
        McpClient->>McpServer: Anropa lämpligt kalkylatortool via SSE
        McpServer->>CalcService: Utför beräkning<br/>(addera, subtrahera, multiplicera, etc.)
        CalcService-->>McpServer: Beräkningsresultat
        McpServer-->>McpClient: Tool-utföranderesultat
        McpClient-->>LangChain: Tool-resultat
        LangChain-->>SafetyService: Bots svar
        SafetyService-->>WebApp: Returnera resultatkarta<br/>{isSafe: "true", botResponse: resultat, safetyResult: detaljer}
        WebApp-->>User: Visa beräkningsresultat och säkerhetsinformation
    else Innehållet är osäkert
        SafetyService-->>WebApp: Returnera resultatkarta<br/>{isSafe: "false", safetyResult: detaljer}
        WebApp-->>User: Visa säkerhetsvarning<br/>(utan beräkning)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->