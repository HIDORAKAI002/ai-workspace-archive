# 進階 MCP 安全與 Azure 內容安全

> **OWASP MCP 風險解決方案**：[MCP06 - 意圖流程顛覆](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure 內容安全提供多種強大工具，可提升您的 MCP 實作安全性。欲取得實作經驗，請參閱 [MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) 第三營：輸入/輸出安全。

## 提示保護

微軟的 AI 提示保護提供強大的防護，抵禦直接及間接的提示注入攻擊，具體作法包括：

1. <strong>先進偵測</strong>：利用機器學習識別內容中嵌入的惡意指令。
2. <strong>聚焦呈現</strong>：轉換輸入文字，協助 AI 系統分辨有效指令與外部輸入。
3. <strong>分隔符與數據標記</strong>：標示可信與不可信資料之間的界限。
4. <strong>內容安全整合</strong>：與 Azure AI 內容安全協作，偵測越獄嘗試及有害內容。
5. <strong>持續更新</strong>：微軟定期更新防護機制以因應新威脅。

## 在 MCP 中實作 Azure 內容安全

此方案提供多層次保護：
- 處理前掃描輸入
- 返回前驗證輸出
- 對已知有害模式使用封鎖清單
- 利用 Azure 持續更新的內容安全模型

## Azure 內容安全資源

欲了解如何將 Azure 內容安全整合至 MCP 伺服器，請參考以下官方資源：

1. [Azure AI 內容安全文件](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure 內容安全官方說明。
2. [提示保護文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - 如何防範提示注入攻擊。
3. [內容安全 API 參考](https://learn.microsoft.com/rest/api/contentsafety/) - 內容安全實作的詳細 API 參考。
4. [快速開始：Azure 內容安全 C# 範例](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - 使用 C# 的快速實作指南。
5. [內容安全用戶端程式庫](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - 適用多種程式語言的用戶端程式庫。
6. [偵測越獄嘗試](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 偵測與防止越獄嘗試的專門指引。
7. [內容安全最佳實務](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - 內容安全有效實作的最佳實務。

欲深入了解實作細節，請參閱我們的 [Azure 內容安全實作指南](./azure-content-safety-implementation.md)。

## 接下來做什麼

- 閱讀：[Azure 內容安全實作](./azure-content-safety-implementation.md)
- 返回：[安全模組總覽](./README.md)
- 繼續前往：[模組 3：入門指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->