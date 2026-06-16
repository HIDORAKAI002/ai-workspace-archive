# 使用 Azure 內容安全性加強進階 MCP 安全性

> **OWASP MCP 風險對應**：[MCP06 - 意圖流程顛覆](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure 內容安全性提供多種強大工具，可提升您的 MCP 實作安全性。欲取得實作經驗，請參閱 [MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) 第 3 場：I/O 安全性。

## 提示防護罩

微軟的 AI 提示防護罩透過以下方式提供對直接及間接提示注入攻擊的強力防護：

1. <strong>先進偵測</strong>：使用機器學習識別內容中藏匿的惡意指令。
2. <strong>聚光燈效果</strong>：轉換輸入文字，協助 AI 系統區分有效指令與外部輸入。
3. <strong>分界符與資料標示</strong>：標記可信與不可信資料的界線。
4. <strong>內容安全整合</strong>：與 Azure AI 內容安全合作，偵測越獄嘗試與有害內容。
5. <strong>持續更新</strong>：微軟定期更新防護機制以因應新興威脅。

## 於 MCP 實作 Azure 內容安全性

此方法提供多層防護：
- 在處理前掃描輸入
- 返回結果前驗證輸出
- 使用封鎖清單阻擋已知有害模式
- 利用 Azure 持續更新的內容安全模型

## Azure 內容安全性資源

欲進一步了解如何結合 Azure 內容安全性與您的 MCP 伺服器，請參考下列官方資源：

1. [Azure AI 內容安全性文件](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure 內容安全性的官方說明文件。
2. [提示防護罩文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - 學習如何防止提示注入攻擊。
3. [內容安全 API 參考](https://learn.microsoft.com/rest/api/contentsafety/) - 內容安全的詳細 API 參考。
4. [快速入門：使用 C# 的 Azure 內容安全性](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - 使用 C# 的快速實作指南。
5. [內容安全用戶端函式庫](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - 支援多種程式語言的用戶端函式庫。
6. [偵測越獄嘗試](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 專門偵測並防止越獄嘗試的指引。
7. [內容安全最佳實務](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - 有效落實內容安全的最佳實務。

欲深入實作，請參考我們的 [Azure 內容安全性實作指南](./azure-content-safety-implementation.md)。

## 下一步

- 閱讀：[Azure 內容安全性實作](./azure-content-safety-implementation.md)
- 返回：[安全模組總覽](./README.md)
- 繼續：[模組 3：快速開始](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->