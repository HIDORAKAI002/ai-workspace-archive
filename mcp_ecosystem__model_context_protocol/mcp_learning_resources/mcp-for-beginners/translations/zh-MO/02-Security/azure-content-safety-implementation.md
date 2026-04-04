# 在 MCP 中實作 Azure 內容安全

> **OWASP MCP 風險對應**：[MCP06 - 透過上下文負載的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

為加強 MCP 對提示注入、工具污染及其他 AI 特定漏洞的安全防護，強烈建議整合 Azure 內容安全。此實作指南與 [MCP 安全高峰研討會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) 的第三營：I/O 安全 內容保持一致。

## 與 MCP 伺服器整合

要將 Azure 內容安全整合至您的 MCP 伺服器，請於請求處理流程中加入內容安全過濾器作為中介軟體：

1. 在伺服器啟動時初始化過濾器  
2. 驗證所有傳入工具請求，確認其安全性  
3. 在回傳客戶端前檢查所有傳出回應  
4. 記錄並提示安全違規事件  
5. 實作適當的錯誤處理以應對內容安全檢查失敗

此防禦提供對以下攻擊的強健保護：  
- 提示注入攻擊  
- 工具污染嘗試  
- 透過惡意輸入進行的資料外洩  
- 生成有害內容

## Azure 內容安全整合最佳實踐

1. **自訂封鎖清單**：建立專為 MCP 注入模式設計的自訂封鎖清單  
2. **嚴重性調整**：根據您的具體應用場景和風險容忍度調整嚴重性門檻  
3. **全面覆蓋**：對所有輸入與輸出施行內容安全檢查  
4. **效能優化**：考慮對重複內容安全檢查實施快取機制  
5. **備援機制**：當內容安全服務無法使用時，定義明確的備援行為  
6. **用戶回饋**：當因安全考量封鎖內容時，向用戶提供清楚的回饋訊息  
7. **持續改進**：根據最新威脅定期更新封鎖清單和檢測模式

## 其他資源

### OWASP MCP 安全指引
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 完整 OWASP MCP 十大風險與 Azure 實作  
- [MCP06 - 提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 詳盡的提示注入緩解範例  
- [MCP 安全高峰研討會工作坊](https://azure-samples.github.io/sherpa/) - 實作營第三營：I/O 安全涵蓋內容安全

### Azure 文件
- [Azure 內容安全概覽](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI 內容安全快速入門](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## 接下來的步驟

- 返回：[安全模組總覽](./README.md)
- 繼續前進：[模組 3：快速入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件乃使用人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於準確，但請注意，自動翻譯可能存在錯誤或不準確之處。原始文件的原文版本應被視為權威來源。如涉及關鍵資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或誤釋負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->