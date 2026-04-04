# 以 Azure 內容安全進階強化 MCP 安全性

> **OWASP MCP 風險對應**：[MCP06 - 透過情境負載的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure 內容安全提供多項強大工具，可提升您的 MCP 實作安全性。欲獲得實作經驗，請參閱 [MCP 安全高峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) 第 3 砦：輸入/輸出安全性。

## 提示盾牌

微軟的 AI 提示盾牌透過以下方式，提供針對直接及間接提示注入攻擊的強力保護：

1. **進階偵測**：利用機器學習辨識內容中夾帶的惡意指令。
2. **聚焦模式**：轉換輸入文字，協助 AI 系統區分有效指令與外部輸入。
3. **分隔符與資料標示**：標記可信資料與不可信資料的界線。
4. **內容安全整合**：與 Azure AI 內容安全合作，偵測越獄嘗試與有害內容。
5. **持續更新**：微軟定期更新保護機制，應對新興威脅。

## MCP 與 Azure 內容安全的實作

本方法提供多層防護：
- 處理前掃描輸入
- 回傳前驗證輸出
- 利用封鎖清單過濾已知有害模式
- 利用 Azure 持續更新的內容安全模型

## Azure 內容安全資源

欲瞭解更多如何於 MCP 伺服器中實作 Azure 內容安全，請參考這些官方資源：

1. [Azure AI 內容安全文件](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure 內容安全官方文件。
2. [提示盾牌文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - 學習如何防止提示注入攻擊。
3. [內容安全 API 參考](https://learn.microsoft.com/rest/api/contentsafety/) - 實作內容安全的詳細 API 參考。
4. [快速入門：使用 C# 的 Azure 內容安全](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# 的快速實作指南。
5. [內容安全用戶端函式庫](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - 多種程式語言的用戶端函式庫。
6. [偵測越獄嘗試](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 偵測與防止越獄嘗試的具體指引。
7. [內容安全最佳實務](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - 有效實作內容安全的最佳實務。

如需更深入的實作內容，請參閱我們的 [Azure 內容安全實作指南](./azure-content-safety-implementation.md)。

## 下一步

- 閱讀：[Azure 內容安全實作](./azure-content-safety-implementation.md)
- 回到：[安全模組總覽](./README.md)
- 繼續：[模組 3：入門指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯。雖然我們致力於保持準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始語言的文件應視為權威版本。對於重要資料，建議聘請專業人工翻譯。我們不對使用本翻譯所引起的任何誤解或誤讀承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->