```mermaid
sequenceDiagram
    actor User
    participant WebApp as Веб апликација<br/>(ContentSafetyController)
    participant SafetyService as Сервис за безбедност садржаја
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP клијент
    participant McpServer as MCP калькулатор сервер<br/>(Порт 8080)
    participant CalcService as Калькулатор сервис

    %% Комуникација са корисником
    User->>WebApp: Унесите упит за израчунавање
    WebApp->>WebApp: Креирај PromptRequest

    %% Провера безбедности садржаја
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Провери да ли је садржај безбедан<br/>(озбиљност < 2 за све категорије)

    %% Ток обраде - безбедан садржај
    alt Садржај је безбедан
        SafetyService->>LangChain: Проследи упит у Bot.chat()
        LangChain->>McpClient: Обради упит
        McpClient->>McpServer: Позови одговарајући калькулатор алат преко SSE
        McpServer->>CalcService: Изврши израчунавање<br/>(збир, одузимање, множење, итд.)
        CalcService-->>McpServer: Резултат израчунавања
        McpServer-->>McpClient: Резултат извршења алата
        McpClient-->>LangChain: Резултат алата
        LangChain-->>SafetyService: Одговор бота
        SafetyService-->>WebApp: Врати резултат мапу<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Прикажи резултат израчунавања и информације о безбедности
    else Садржај није безбедан
        SafetyService-->>WebApp: Врати резултат мапу<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Прикажи упозорење о безбедности<br/>(без израчунавања)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->