```mermaid
sequenceDiagram
    actor User
    participant WebApp as ਵੈੱਬ ਐਪ<br/>(ContentSafetyController)
    participant SafetyService as ਸਮੱਗਰੀ ਸੁਰੱਖਿਆ ਸੇਵਾ
    participant AzureAPI as ਅਜ਼ੂਰ ਸਮੱਗਰੀ ਸੁਰੱਖਿਆ API
    participant LangChain as ਲੈਂਗਚੇਨ4ਜੈ
    participant McpClient as MCP ਕਲਾਇੰਟ
    participant McpServer as MCP ਕੈਲਕੂਲੇਟਰ ਸਰਵਰ<br/>(ਪੋਰਟ 8080)
    participant CalcService as ਕੈਲਕੂਲੇਟਰ ਸੇਵਾ

    %% ਉਪਭੋਗਤਾ ਇੰਟਰੇਕਸ਼ਨ
    User->>WebApp: ਕੈਲਕੂਲੇਸ਼ਨ ਪ੍ਰਾਂਪਟ ਦਾਖਲ ਕਰੋ
    WebApp->>WebApp: ਪ੍ਰਾਂਪਟਰਿਕਵੈਸਟ ਬਣਾਓ

    %% ਸਮੱਗਰੀ ਸੁਰੱਖਿਆ ਜਾਂਚ
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: ਜਾਂਚੋ ਕਿ ਸਮੱਗਰੀ ਸੁਰੱਖਿਅਤ ਹੈ<br/>(ਸਭ ਸ਼੍ਰੇਣੀਆਂ ਲਈ ਗੰਭੀਰਤਾ < 2)

    %% ਪ੍ਰਕਿਰਿਆ ਪ੍ਰਵਾਹ - ਸੁਰੱਖਿਅਤ ਸਮੱਗਰੀ
    alt ਸਮੱਗਰੀ ਸੁਰੱਖਿਅਤ ਹੈ
        SafetyService->>LangChain: ਪ੍ਰਾਂਪਟ ਨੂੰ Bot.chat() ਵੱਲ ਭੇਜੋ
        LangChain->>McpClient: ਪ੍ਰਾਂਪਟ ਪ੍ਰਕਿਰਿਆ ਕਰੋ
        McpClient->>McpServer: SSE ਰਾਹੀਂ موزوں ਕੈਲਕੂਲੇਟਰ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰੋ
        McpServer->>CalcService: ਗਣਨਾ ਕਰੋ<br/>(ਜੋੜੋ, ਘਟਾਓ, ਗੁਣਾ ਕਰੋ, ਆਦਿ)
        CalcService-->>McpServer: ਕੈਲਕੂਲੇਸ਼ਨ ਨਤੀਜਾ
        McpServer-->>McpClient: ਟੂਲ ਕਾਰਜ ਕਰਨ ਦਾ ਨਤੀਜਾ
        McpClient-->>LangChain: ਟੂਲ ਨਤੀਜਾ
        LangChain-->>SafetyService: ਬੋਟ ਜਵਾਬ
        SafetyService-->>WebApp: ਨਤੀਜਾ ਨਕਸ਼ਾ ਵਾਪਸ ਕਰੋ<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: ਕੈਲਕੂਲੇਸ਼ਨ ਨਤੀਜਾ ਅਤੇ ਸੁਰੱਖਿਆ ਜਾਣਕਾਰੀ ਦਿਖਾਓ
    else ਸਮੱਗਰੀ ਅਸੁਰੱਖਿਅਤ ਹੈ
        SafetyService-->>WebApp: ਨਤੀਜਾ ਨਕਸ਼ਾ ਵਾਪਸ ਕਰੋ<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: ਸੁਰੱਖਿਆ ਚੇਤਾਵਨੀ ਦਿਖਾਓ<br/>(ਬਿਨਾ ਕੈਲਕੂਲੇਸ਼ਨ ਦੇ)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->