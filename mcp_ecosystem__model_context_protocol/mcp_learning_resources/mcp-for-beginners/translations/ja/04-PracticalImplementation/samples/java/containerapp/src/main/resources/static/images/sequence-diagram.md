```mermaid
sequenceDiagram
    actor User
    participant WebApp as Webアプリ<br/>(ContentSafetyController)
    participant SafetyService as コンテンツセーフティサービス
    participant AzureAPI as AzureコンテンツセーフティAPI
    participant LangChain as LangChain4j
    participant McpClient as MCPクライアント
    participant McpServer as MCP計算サーバー<br/>(ポート8080)
    participant CalcService as 計算サービス

    %% ユーザーインタラクション
    User->>WebApp: 計算プロンプトを入力
    WebApp->>WebApp: PromptRequestを作成

    %% コンテンツセーフティチェック
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: コンテンツが安全か確認<br/>(すべてのカテゴリで重大度 < 2)

    %% 処理フロー - 安全なコンテンツ
    alt コンテンツは安全です
        SafetyService->>LangChain: Bot.chat()へプロンプトを渡す
        LangChain->>McpClient: プロンプトを処理
        McpClient->>McpServer: SSEを介して適切な計算ツールを呼び出す
        McpServer->>CalcService: 計算を実行<br/>(加算、減算、乗算など)
        CalcService-->>McpServer: 計算結果
        McpServer-->>McpClient: ツール実行結果
        McpClient-->>LangChain: ツール結果
        LangChain-->>SafetyService: Botの応答
        SafetyService-->>WebApp: 結果マップを返す<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: 計算結果と安全情報を表示
    else コンテンツは安全ではありません
        SafetyService-->>WebApp: 結果マップを返す<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: 安全警告を表示<br/>(計算なし)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->