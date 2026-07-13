```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web App<br/>(ContentSafetyController)
    participant SafetyService as Serbisyo ng Kaligtasan ng Nilalaman
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP Client
    participant McpServer as MCP Calculator Server<br/>(Port 8080)
    participant CalcService as Serbisyo ng Calculator

    %% Interaksyon ng Gumagamit
    User->>WebApp: Maglagay ng prompt para sa kalkulasyon
    WebApp->>WebApp: Gumawa ng PromptRequest

    %% Pagsusuri ng Kaligtasan ng Nilalaman
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Suriin kung ligtas ang nilalaman<br/>(severity < 2 para sa lahat ng kategorya)

    %% Daloy ng Proseso - Ligtas na Nilalaman
    alt Ligtas ang nilalaman
        SafetyService->>LangChain: Ipasa ang prompt sa Bot.chat()
        LangChain->>McpClient: Proseso ang prompt
        McpClient->>McpServer: Tawagan ang angkop na calculator tool sa pamamagitan ng SSE
        McpServer->>CalcService: Isagawa ang kalkulasyon<br/>(dagdag, bawas, multiply, atbp.)
        CalcService-->>McpServer: Resulta ng kalkulasyon
        McpServer-->>McpClient: Resulta ng tool execution
        McpClient-->>LangChain: Resulta ng tool
        LangChain-->>SafetyService: Tugon ng Bot
        SafetyService-->>WebApp: Ibalik ang result map<br/>{isSafe: "true", botResponse: resulta, safetyResult: detalye}
        WebApp-->>User: Ipakita ang resulta ng kalkulasyon at impormasyon sa kaligtasan
    else Hindi ligtas ang nilalaman
        SafetyService-->>WebApp: Ibalik ang result map<br/>{isSafe: "false", safetyResult: detalye}
        WebApp-->>User: Ipakita ang babala sa kaligtasan<br/>(nang walang kalkulasyon)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->