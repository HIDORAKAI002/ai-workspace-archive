```mermaid
sequenceDiagram
    actor User
    participant WebApp as 網頁應用程式<br/>(ContentSafetyController)
    participant SafetyService as 內容安全服務
    participant AzureAPI as Azure 內容安全 API
    participant LangChain as LangChain4j
    participant McpClient as MCP 用戶端
    participant McpServer as MCP 計算器伺服器<br/>(埠號 8080)
    participant CalcService as 計算器服務

    %% 使用者互動
    User->>WebApp: 輸入計算提示
    WebApp->>WebApp: 建立 PromptRequest

    %% 內容安全檢查
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: 檢查內容是否安全<br/>(所有類別嚴重性 < 2)

    %% 處理流程 - 安全內容
    alt 內容安全
        SafetyService->>LangChain: 將提示傳給 Bot.chat()
        LangChain->>McpClient: 處理提示
        McpClient->>McpServer: 藉由 SSE 調用適當的計算工具
        McpServer->>CalcService: 執行計算<br/>(加、減、乘等)
        CalcService-->>McpServer: 計算結果
        McpServer-->>McpClient: 工具執行結果
        McpClient-->>LangChain: 工具結果
        LangChain-->>SafetyService: 機器人回應
        SafetyService-->>WebApp: 回傳結果映射<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: 顯示計算結果及安全資訊
    else 內容不安全
        SafetyService-->>WebApp: 回傳結果映射<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: 顯示安全警告<br/>(不進行計算)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->