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

    %% Interazione Utente
    User->>WebApp: Inserisci prompt di calcolo
    WebApp->>WebApp: Crea PromptRequest

    %% Verifica Sicurezza del Contenuto
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Verifica se il contenuto è sicuro<br/>(gravità < 2 per tutte le categorie)

    %% Flusso di Elaborazione - Contenuto Sicuro
    alt Il contenuto è sicuro
        SafetyService->>LangChain: Passa il prompt a Bot.chat()
        LangChain->>McpClient: Elabora prompt
        McpClient->>McpServer: Chiama lo strumento calcolatore appropriato via SSE
        McpServer->>CalcService: Esegui calcolo<br/>(somma, sottrai, moltiplica, ecc.)
        CalcService-->>McpServer: Risultato del calcolo
        McpServer-->>McpClient: Risultato dell'esecuzione dello strumento
        McpClient-->>LangChain: Risultato dello strumento
        LangChain-->>SafetyService: Risposta del bot
        SafetyService-->>WebApp: Restituisci mappa dei risultati<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Mostra risultato del calcolo e informazioni di sicurezza
    else Il contenuto non è sicuro
        SafetyService-->>WebApp: Restituisci mappa dei risultati<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Mostra avviso di sicurezza<br/>(senza calcolo)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->