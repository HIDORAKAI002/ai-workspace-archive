# 使用 MCP 實作 Azure Content Safety

> **OWASP MCP 解決的風險**: [MCP06 - 透過上下文負載的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

為強化 MCP 對提示注入、工具污染與其他 AI 專有漏洞的防護，強烈建議整合 Azure Content Safety。本實作指南與 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3：I/O 安全性相符。

## 與 MCP 伺服器整合

要將 Azure Content Safety 整合至您的 MCP 伺服器，請將內容安全過濾器作為中介軟件加入請求處理流程：

1. 在伺服器啟動時初始化過濾器
2. 在處理前驗證所有進入的工具請求
3. 在回應客戶端前檢查所有出去的回應
4. 記錄並警示安全違規行為
5. 實作適當的錯誤處理以應對內容安全檢查失敗

此措施可有效防禦：
- 提示注入攻擊
- 工具污染嘗試
- 透過惡意輸入進行的資料外洩
- 產生有害內容

## Azure Content Safety 整合最佳實務

1. **自訂封鎖清單**：為 MCP 注入模式特別建立自訂封鎖清單
2. **嚴重性調整**：根據您的特定使用情境與風險承受度調整嚴重性門檻
3. **全面覆蓋**：對所有輸入與輸出套用內容安全檢查
4. **效能優化**：考慮為重複的內容安全檢查實作快取機制
5. **後備機制**：定義內容安全服務無法使用時的明確後備行為
6. **使用者回饋**：當內容因安全考量被封鎖時提供清晰回饋給使用者
7. **持續改進**：根據新興威脅定期更新封鎖清單與模式

## 額外資源

### OWASP MCP 安全指引
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - 全面 OWASP MCP 十大與 Azure 實作
- [MCP06 - 提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 詳盡的提示注入緩解模式
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - 實作 Camp 3：I/O 安全涵蓋內容安全

### Azure 文件
- [Azure Content Safety 概覽](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety 快速入門](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## 下一步

- 回到：[Security Module Overview](./README.md)
- 繼續到：[Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件是使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用此翻譯而引致的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->