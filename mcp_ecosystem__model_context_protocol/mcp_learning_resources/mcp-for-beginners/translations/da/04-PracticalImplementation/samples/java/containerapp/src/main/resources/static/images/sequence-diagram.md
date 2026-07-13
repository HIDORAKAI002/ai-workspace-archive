```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web App<br/>(ContentSafetyController)
    participant SafetyService as Indholdssikkerhedstjeneste
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP Client
    participant McpServer as MCP Calculator Server<br/>(Port 8080)
    participant CalcService as Calculator Service

    %% Brugerkontakt
    User->>WebApp: Indtast beregningsprompt
    WebApp->>WebApp: Opret PromptRequest

    %% Kontrol af indholdssikkerhed
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Tjek om indholdet er sikkert<br/>(alvorlighed < 2 for alle kategorier)

    %% Behandlingsflow - Sikkert indhold
    alt Indholdet er sikkert
        SafetyService->>LangChain: Send prompt til Bot.chat()
        LangChain->>McpClient: Behandl prompt
        McpClient->>McpServer: Kald passende beregningsværktøj via SSE
        McpServer->>CalcService: Udfør beregning<br/>(plus, minus, gange, osv.)
        CalcService-->>McpServer: Beregningsresultat
        McpServer-->>McpClient: Resultat af værktøjsudførelse
        McpClient-->>LangChain: Værktøjsresultat
        LangChain-->>SafetyService: Bot-svar
        SafetyService-->>WebApp: Returner resultatskort<br/>{isSafe: "true", botResponse: resultat, safetyResult: detaljer}
        WebApp-->>User: Vis beregningsresultat og sikkerhedsinformation
    else Indholdet er usikkert
        SafetyService-->>WebApp: Returner resultatskort<br/>{isSafe: "false", safetyResult: detaljer}
        WebApp-->>User: Vis sikkerhedsadvarsel<br/>(uden beregning)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->