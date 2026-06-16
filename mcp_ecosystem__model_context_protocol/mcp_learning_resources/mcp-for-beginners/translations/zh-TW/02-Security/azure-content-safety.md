# 使用 Azure Content Safety 進階強化 MCP 安全性

> **解決的 OWASP MCP 風險**：[MCP06 - 意圖流程顛覆](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety 提供多項強大工具，可提升您 MCP 實作的安全性。若想親手操作，請參考 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 第三營：I/O 安全。

## Prompt Shields

Microsoft 的 AI Prompt Shields 透過以下方式，對抗直接和間接的 prompt 注入攻擊，提供強大保護：

1. <strong>先進偵測</strong>：利用機器學習技術識別內容中嵌入的惡意指令。
2. <strong>聚光燈機制</strong>：轉換輸入文字，協助 AI 系統區分有效指令與外部輸入。
3. <strong>分隔符與資料標記</strong>：標示受信與不受信資料的邊界。
4. <strong>內容安全整合</strong>：與 Azure AI Content Safety 協同運作，偵測越獄嘗試及有害內容。
5. <strong>持續更新</strong>：Microsoft 定期更新防護機制，應對新興威脅。

## 在 MCP 中實作 Azure Content Safety

此方法提供多層防護：
- 處理前掃描輸入
- 回傳前驗證輸出
- 以黑名單過濾已知有害模式
- 利用 Azure 持續更新的內容安全模型

## Azure Content Safety 資源

欲瞭解如何將 Azure Content Safety 與您的 MCP 伺服器整合，請參考以下官方資源：

1. [Azure AI Content Safety 文件](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety 官方文件。
2. [Prompt Shield 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - 防止 prompt 注入攻擊。
3. [Content Safety API 參考](https://learn.microsoft.com/rest/api/contentsafety/) - 內容安全 API 詳細參考。
4. [快速入門：使用 C# 的 Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# 快速實作指南。
5. [Content Safety 用戶端函式庫](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - 多種程式語言用的函式庫。
6. [偵測越獄嘗試](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 專門指引偵測與防止越獄行為。
7. [內容安全最佳實務](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - 有效實施內容安全的最佳做法。

若想更深入了解實作細節，請參考我們的 [Azure Content Safety 實作指南](./azure-content-safety-implementation.md)。

## 接下來的步驟

- 閱讀：[Azure Content Safety 實作指南](./azure-content-safety-implementation.md)
- 返回：[安全模組總覽](./README.md)
- 繼續至：[模組 3：快速開始](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->