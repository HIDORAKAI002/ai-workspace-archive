```mermaid
sequenceDiagram
    actor User
    participant WebApp as ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್<br/>(ContentSafetyController)
    participant SafetyService as ವಿಷಯ ಸುರಕ್ಷತಾ ಸೇವೆ
    participant AzureAPI as ಅಜುರ್ ವಿಷಯ ಸುರಕ್ಷತಾ API
    participant LangChain as LangChain4j
    participant McpClient as MCP ಕ್ಲೈಂಟ್
    participant McpServer as MCP ಕ್ಯಾಕ್‌್ಯುಲೇಟರ್ ಸರ್ವರ್<br/>(ಪೋರ್ಟ್ 8080)
    participant CalcService as ಕ್ಯಾಕ್‌್ಯುಲೇಟರ್ ಸೇವೆ

    %% ಬಳಕೆದಾರ ಸಂವಹನ
    User->>WebApp: ಲೆಕ್ಕಾಚಾರದ ಪ್ರಾಂಪ್ಟ್ ನಮೂದಿಸಿ
    WebApp->>WebApp: PromptRequest ರಚಿಸಿ

    %% ವಿಷಯ ಸುರಕ್ಷತಾ ಪರಿಶೀಲನೆ
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: ವಿಷಯ ಸುರಕ್ಷಿತವೇ ಎಂದು ಪರಿಶೀಲಿಸಿ<br/>(ಎಲ್ಲಾ ವಿಭಾಗಗಳಿಗೂ ತೀವ್ರತೆ < 2)

    %% ಪ್ರಕ್ರಿಯೆ ಪ್ರ بہಿತ - ಸುರಕ್ಷಿತ ವಿಷಯ
    alt ವಿಷಯ ಸುರಕ್ಷಿತವಾಗಿದೆ
        SafetyService->>LangChain: Prompt ಅನ್ನು Bot.chat() ಗೆ ಪಾಸುಮಾಡಿ
        LangChain->>McpClient: ಪ್ರಾಂಪ್ಟ್ ಪ್ರಕ್ರಿಯೆ ಮಾಡಿ
        McpClient->>McpServer: SSE ಮೂಲಕ ಸೂಕ್ತ ಕ್ಯಾಕ್‌್ಯುಲೇಟರ್ ಉಪಕರಣವನ್ನು ಕರೆ ಮಾಡಿ
        McpServer->>CalcService: ಲೆಕ್ಕಾಚಾರ ನಿರ್ವಹಿಸಿ<br/>(ಸೇರಿಸಿ, ಕಳೆವಿರು, ಗುಣಿಸಿ, ಇತ್ಯಾದಿ)
        CalcService-->>McpServer: ಲೆಕ್ಕಾಚಾರದ ಫಲಿತಾಂಶ
        McpServer-->>McpClient: ಉಪಕರಣನಿರ್ವಹಣೆಯ ಫಲಿತಾಂಶ
        McpClient-->>LangChain: ಉಪಕರಣ ಫಲಿತಾಂಶ
        LangChain-->>SafetyService: ಬಾಟ್ ಪ್ರತಿಕ್ರಿಯೆ
        SafetyService-->>WebApp: ಫಲಿತಾಂಶ ನಕ್ಷೆ ಹಿಂತಿರುಗಿಸಿ<br/>{isSafe: "true", botResponse: ಫಲಿತಾಂಶ, safetyResult: ವಿವರಗಳು}
        WebApp-->>User: ಲೆಕ್ಕಾಚಾರದ ಫಲಿತಾಂಶ ಮತ್ತು ಸುರಕ್ಷತಾ ಮಾಹಿತಿಯನ್ನು ತೋರಿಸಿ
    else ವಿಷಯ ಅಸುರಕ್ಷಿತವಾಗಿದೆ
        SafetyService-->>WebApp: ಫಲಿತಾಂಶ ನಕ್ಷೆ ಹಿಂತಿರುಗಿಸಿ<br/>{isSafe: "false", safetyResult: ವಿವರಗಳು}
        WebApp-->>User: ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆಯನ್ನು ತೋರಿಸಿ<br/>(ಲೆಕ್ಕಾಚಾರವಿಲ್ಲದೆ)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->