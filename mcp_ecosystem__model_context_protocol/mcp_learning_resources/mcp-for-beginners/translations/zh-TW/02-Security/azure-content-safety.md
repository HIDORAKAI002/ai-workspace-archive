# 使用 Azure 內容安全性實現進階 MCP 安全性

> **OWASP MCP 風險防範**: [MCP06 - 透過上下文載荷的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure 內容安全性提供多種強大的工具，可增強您的 MCP 實作安全性。欲取得實作經驗，請參閱 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 第 3 領域：I/O 安全性。

## 提示防護盾

微軟的 AI 提示防護盾透過以下方法，提供針對直接及間接提示注入攻擊的強力防護：

1. **進階偵測**：利用機器學習辨識內容中隱藏的惡意指示。
2. **聚焦顯示**：轉換輸入文字，協助 AI 系統辨識有效指示與外部輸入。
3. **分隔符與資料標記**：標示可信與不可信資料之間的界線。
4. **內容安全整合**：與 Azure AI 內容安全配合，偵測越獄嘗試及有害內容。
5. **持續更新**：微軟定期更新防護機制，以對抗新出現的威脅。

## 使用 MCP 實作 Azure 內容安全性

此方法提供多層保護：
- 處理前掃描輸入
- 回傳前驗證輸出
- 使用封鎖清單過濾已知有害模式
- 利用 Azure 持續更新的內容安全模型

## Azure 內容安全性資源

欲瞭解如何在您的 MCP 伺服器中實作 Azure 內容安全性，請參閱以下官方資源：

1. [Azure AI 內容安全性文件](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure 內容安全性的官方文件。
2. [提示防護盾文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - 瞭解如何防範提示注入攻擊。
3. [內容安全性 API 參考](https://learn.microsoft.com/rest/api/contentsafety/) - 實作內容安全性的詳細 API 參考。
4. [快速入門：使用 C# 的 Azure 內容安全性](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - 使用 C# 的快速實作指南。
5. [內容安全性用戶端函式庫](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - 各種程式語言的用戶端函式庫。
6. [偵測越獄嘗試](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 有關偵測與防範越獄嘗試的特定指引。
7. [內容安全性最佳實務](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - 有效實作內容安全性的最佳作法。

欲取得更深入的實作指南，請參閱我們的 [Azure 內容安全性實作指南](./azure-content-safety-implementation.md)。

## 下一步

- 閱讀：[Azure 內容安全性實作](./azure-content-safety-implementation.md)
- 返回：[安全性模組總覽](./README.md)
- 繼續：[模組 3：入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保翻譯內容的準確性，但自動翻譯仍可能包含錯誤或不準確之處。原始語言文件應視為具權威性的版本。對於重要資訊，建議聘請專業人工翻譯。我們不對因使用本翻譯所引起的任何誤解或誤釋負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->