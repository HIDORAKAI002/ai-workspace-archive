```mermaid
sequenceDiagram
    actor User
    participant WebApp as 网络应用<br/>(ContentSafetyController)
    participant SafetyService as 内容安全服务
    participant AzureAPI as Azure 内容安全 API
    participant LangChain as LangChain4j
    participant McpClient as MCP 客户端
    participant McpServer as MCP 计算服务器<br/>(端口 8080)
    participant CalcService as 计算服务

    %% 用户交互
    User->>WebApp: 输入计算提示
    WebApp->>WebApp: 创建 PromptRequest

    %% 内容安全检查
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: 检查内容是否安全<br/>(所有类别严重性均小于 2)

    %% 处理流程 - 安全内容
    alt 内容安全
        SafetyService->>LangChain: 将提示传递给 Bot.chat()
        LangChain->>McpClient: 处理提示
        McpClient->>McpServer: 通过 SSE 调用相应计算器工具
        McpServer->>CalcService: 执行计算<br/>(加、减、乘等)
        CalcService-->>McpServer: 计算结果
        McpServer-->>McpClient: 工具执行结果
        McpClient-->>LangChain: 工具结果
        LangChain-->>SafetyService: 机器人响应
        SafetyService-->>WebApp: 返回结果映射<br/>{isSafe: "true", botResponse: 结果, safetyResult: 详情}
        WebApp-->>User: 显示计算结果和安全信息
    else 内容不安全
        SafetyService-->>WebApp: 返回结果映射<br/>{isSafe: "false", safetyResult: 详情}
        WebApp-->>User: 显示安全警告<br/>(不进行计算)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->