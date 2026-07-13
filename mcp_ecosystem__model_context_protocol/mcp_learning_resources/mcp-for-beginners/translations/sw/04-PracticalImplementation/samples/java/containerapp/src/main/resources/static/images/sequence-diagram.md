```mermaid
sequenceDiagram
    actor User
    participant WebApp as Tovuti ya Wavuti<br/>(ContentSafetyController)
    participant SafetyService as Huduma ya Usalama wa Maudhui
    participant AzureAPI as API ya Usalama wa Maudhui wa Azure
    participant LangChain as LangChain4j
    participant McpClient as Mteja wa MCP
    participant McpServer as Server ya Kihesabu ya MCP<br/>(Bandari 8080)
    participant CalcService as Huduma ya Kihesabu

    %% Mwingiliano wa Mtumiaji
    User->>WebApp: Ingiza kauli ya hesabu
    WebApp->>WebApp: Tengeneza Ombi la Kauli

    %% Ukaguzi wa Usalama wa Maudhui
    WebApp->>SafetyService: processPrompt(kauli)
    SafetyService->>AzureAPI: analyzeText(kauli)
    AzureAPI-->>SafetyService: Matokeo ya Kuchambua Maandishi
    SafetyService->>SafetyService: Angalia kama maudhui ni salama<br/>(ukali < 2 kwa kila aina)

    %% Mtiririko wa Usindikaji - Maudhui Salama
    alt Maudhui ni salama
        SafetyService->>LangChain: Pitia kauli kwa Bot.chat()
        LangChain->>McpClient: Fanyia kazi kauli
        McpClient->>McpServer: Piga simu zana sahihi ya kihesabu kupitia SSE
        McpServer->>CalcService: Tekeleza hesabu<br/>(ongeza, toa, zidisha, nk.)
        CalcService-->>McpServer: Matokeo ya hesabu
        McpServer-->>McpClient: Matokeo ya utekelezaji wa zana
        McpClient-->>LangChain: Matokeo ya zana
        LangChain-->>SafetyService: Jibu la bot
        SafetyService-->>WebApp: Rudisha ramani ya matokeo<br/>{isSafe: "kweli", botResponse: matokeo, safetyResult: maelezo}
        WebApp-->>User: Onyesha matokeo ya hesabu na taarifa za usalama
    else Maudhui si salama
        SafetyService-->>WebApp: Rudisha ramani ya matokeo<br/>{isSafe: "uongo", safetyResult: maelezo}
        WebApp-->>User: Onyesha onyo la usalama<br/>(bila hesabu)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->