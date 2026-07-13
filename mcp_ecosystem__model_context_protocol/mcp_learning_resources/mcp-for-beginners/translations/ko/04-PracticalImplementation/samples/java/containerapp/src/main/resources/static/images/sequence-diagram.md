```mermaid
sequenceDiagram
    actor User
    participant WebApp as 웹 앱<br/>(ContentSafetyController)
    participant SafetyService as 콘텐츠 안전 서비스
    participant AzureAPI as Azure 콘텐츠 안전 API
    participant LangChain as LangChain4j
    participant McpClient as MCP 클라이언트
    participant McpServer as MCP 계산기 서버<br/>(포트 8080)
    participant CalcService as 계산기 서비스

    %% 사용자 상호작용
    User->>WebApp: 계산 프롬프트 입력
    WebApp->>WebApp: PromptRequest 생성

    %% 콘텐츠 안전 검사
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: 콘텐츠 안전 여부 확인<br/>(모든 카테고리에서 심각도 < 2)

    %% 처리 흐름 - 안전한 콘텐츠
    alt 콘텐츠가 안전함
        SafetyService->>LangChain: 프롬프트를 Bot.chat()에 전달
        LangChain->>McpClient: 프롬프트 처리
        McpClient->>McpServer: SSE를 통해 적절한 계산기 도구 호출
        McpServer->>CalcService: 계산 실행<br/>(더하기, 빼기, 곱하기 등)
        CalcService-->>McpServer: 계산 결과
        McpServer-->>McpClient: 도구 실행 결과
        McpClient-->>LangChain: 도구 결과
        LangChain-->>SafetyService: 봇 응답
        SafetyService-->>WebApp: 결과 맵 반환<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: 계산 결과 및 안전 정보 표시
    else 콘텐츠가 안전하지 않음
        SafetyService-->>WebApp: 결과 맵 반환<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: 안전 경고 표시<br/>(계산 없이)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->