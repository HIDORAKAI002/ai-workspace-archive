# 使用 MCP 實作 Azure 內容安全

> **OWASP MCP 風險對應**：[MCP06 - 透過上下文有效載荷的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

為強化 MCP 對提示注入、工具污染以及其他 AI 特有漏洞的安全防護，強烈建議整合 Azure 內容安全。本實作指南與 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 的第 3 隊營「I/O 安全」相符。

## 與 MCP 伺服器整合

要將 Azure 內容安全整合到您的 MCP 伺服器中，請在請求處理流程中，將內容安全過濾器作為中介軟體加入：

1. 在伺服器啟動時初始化過濾器
2. 在處理前驗證所有進來的工具請求
3. 在回應客戶端前檢查所有外送回應
4. 記錄並警示安全違規事項
5. 對未通過內容安全檢查的錯誤實作適當錯誤處理

這為以下威脅提供強固防護：
- 提示注入攻擊
- 工具污染嘗試
- 透過惡意輸入的資料外洩
- 有害內容產生

## Azure 內容安全整合最佳實踐

1. **自訂封鎖清單**：針對 MCP 注入模式建立專用自訂封鎖清單
2. **嚴重性調整**：根據具體使用案例和風險容忍度調整嚴重性閾值
3. **全面覆蓋**：對所有輸入與輸出應用內容安全檢查
4. **效能優化**：考慮對重複的內容安全檢查實作快取機制
5. **後備機制**：定義在內容安全服務不可用時的明確後備行為
6. **用戶回饋**：當內容因安全疑慮遭阻擋時，提供清晰的用戶回饋
7. **持續改進**：定期根據新興威脅更新封鎖清單與模式

## 額外資源

### OWASP MCP 安全指引
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 具 Azure 實作的 OWASP MCP Top 10 全面指南
- [MCP06 - 提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 詳細提示注入緩解模式
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - 實作營第三隊「I/O 安全」涵蓋內容安全

### Azure 文件
- [Azure 內容安全概覽](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI 內容安全快速入門](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## 後續步驟

- 返回：[Security Module Overview](./README.md)
- 繼續：[Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力確保準確性，請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用此翻譯而導致的任何誤解或誤譯負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->