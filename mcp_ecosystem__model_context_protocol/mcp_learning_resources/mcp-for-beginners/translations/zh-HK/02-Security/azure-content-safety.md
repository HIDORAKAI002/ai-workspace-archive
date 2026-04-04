# 使用 Azure Content Safety 的進階 MCP 安全性

> **OWASP MCP 風險對應**: [MCP06 - 透過上下文載荷的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety 提供多種強大工具，可增強您的 MCP 實作安全性。欲獲得實作經驗，請參閱 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3：I/O 安全性。

## 提示防護

微軟的 AI 提示防護提供強大保護，抵禦直接與間接的提示注入攻擊，透過：

1. **進階偵測**：使用機器學習辨識內容中嵌入的惡意指令。
2. **聚光燈技術**：轉換輸入文字，協助 AI 系統區分合法指令與外部輸入。
3. **邊界符號與資料標記**：標示受信任與不受信資料的界線。
4. **Content Safety 整合**：搭配 Azure AI Content Safety 偵測越獄嘗試和有害內容。
5. **持續更新**：微軟定期更新保護機制，以應付新興威脅。

## 在 MCP 中實作 Azure Content Safety

此方法提供多層保護：
- 在處理前掃描輸入
- 回傳前驗證輸出
- 使用已知有害模式的黑名單
- 利用 Azure 持續更新的 Content Safety 模型

## Azure Content Safety 資源

欲了解更多如何在 MCP 伺服器上實作 Azure Content Safety，請參考這些官方資源：

1. [Azure AI Content Safety 文件](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety 官方文件。
2. [提示防護文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - 了解如何防止提示注入攻擊。
3. [Content Safety API 參考](https://learn.microsoft.com/rest/api/contentsafety/) - 詳細的 Content Safety API 參考資料。
4. [快速開始：使用 C# 的 Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - 使用 C# 的快速實作指南。
5. [Content Safety 用戶端程式庫](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - 提供多種程式語言的用戶端程式庫。
6. [偵測越獄嘗試](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 偵測與防止越獄嘗試的具體指導。
7. [Content Safety 最佳實務](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - 有效實作 Content Safety 的最佳實務。

欲深入實作說明，請參閱我們的 [Azure Content Safety 實作指南](./azure-content-safety-implementation.md)。

## 下一步

- 閱讀：[Azure Content Safety 實作](./azure-content-safety-implementation.md)
- 返回至：[安全模組總覽](./README.md)
- 繼續至：[模組 3：入門指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件透過 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。如涉及重要資訊，建議採用專業人工翻譯。對因使用本翻譯而引起的任何誤解或誤釋，我們概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->