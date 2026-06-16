# 使用 MCP 實作 Azure 內容安全

> **OWASP MCP 解決的風險**: [MCP06 - 意圖流改寫](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

為了加強 MCP 對抗提示注入、工具中毒及其他 AI 特定漏洞的安全性，強烈建議整合 Azure 內容安全。此實作指南與 [MCP 安全峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) 第 3 期：I/O 安全保持一致。

## 與 MCP Server 的整合

要將 Azure 內容安全整合到您的 MCP 伺服器，請在您的請求處理管線中加入內容安全篩選器作為中介軟體：

1. 在伺服器啟動時初始化篩選器  
2. 處理前驗證所有傳入的工具請求  
3. 回傳給客戶端前檢查所有輸出回應  
4. 記錄並提醒安全違規事項  
5. 為內容安全檢查失敗實作適當的錯誤處理  

這提供了對以下攻擊的強固防禦：  
- 提示注入攻擊  
- 工具中毒嘗試  
- 透過惡意輸入的數據外洩  
- 生成有害內容  

## Azure 內容安全整合的最佳實踐

1. <strong>自訂封鎖清單</strong>：為 MCP 注入模式專門建立自訂封鎖清單  
2. <strong>嚴重程度調整</strong>：根據您的特定使用案例和風險容忍度調整嚴重程度閾值  
3. <strong>全面覆蓋</strong>：對所有輸入和輸出套用內容安全檢查  
4. <strong>效能優化</strong>：考慮對重複的內容安全檢查實作快取  
5. <strong>備援機制</strong>：當內容安全服務不可用時，定義明確的備援行為  
6. <strong>使用者反饋</strong>：當內容因安全疑慮被封鎖時，提供明確的使用者反饋  
7. <strong>持續改進</strong>：根據新興威脅定期更新封鎖清單和模式  

## 附加資源

### OWASP MCP 安全指導
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 詳盡的 OWASP MCP 前十大項目及 Azure 實作  
- [MCP06 - 提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 詳細的提示注入緩解模式  
- [MCP 安全峰會工作坊](https://azure-samples.github.io/sherpa/) - 實作營第 3 期：I/O 安全涵蓋內容安全  

### Azure 文件
- [Azure 內容安全概述](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [提示防護說明文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure AI 內容安全快速入門](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## 下一步

- 返回至: [安全模組總覽](./README.md)  
- 繼續至: [模組 3：入門指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->