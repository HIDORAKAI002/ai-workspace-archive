# 於 MCP 實作 Azure 內容安全

> **OWASP MCP 涉及風險**: [MCP06 - 意圖流程劫持](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

為加強 MCP 針對提示注入、工具中毒及其他人工智能特有漏洞的安全防護，強烈建議整合 Azure 內容安全。此實作指南符合[ MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) 第三營：輸入/輸出保安。

## 與 MCP 服務器整合

要將 Azure 內容安全整合到您的 MCP 服務器中，於請求處理流程中加入內容安全過濾器作為中介軟體：

1. 在服務器啟動時初始化過濾器
2. 處理所有收到的工具請求前進行驗證
3. 返回客戶端前檢查所有傳出回應
4. 當發生安全違規時記錄並發出警報
5. 針對未通過內容安全檢測的情況實施適當錯誤處理

此舉可針對以下威脅提供嚴密防護：
- 提示注入攻擊
- 工具中毒嘗試
- 透過惡意輸入進行數據外洩
- 生成有害內容

## Azure 內容安全整合最佳實務

1. <strong>自訂封鎖清單</strong>：專門為 MCP 注入樣板建立自訂封鎖清單
2. <strong>嚴重程度調整</strong>：根據您的具體用例與風險接受度調整嚴重性閾值
3. <strong>全面覆蓋</strong>：對所有輸入及輸出套用內容安全檢查
4. <strong>效能優化</strong>：考慮對重複內容安全檢查實施快取
5. <strong>後備機制</strong>：定義內容安全服務無法使用時的明確後備行為
6. <strong>用戶反饋</strong>：當內容因安全疑慮被封鎖時，向用戶提供清晰反饋
7. <strong>持續改進</strong>：根據新興威脅定期更新封鎖清單和樣板

## 額外資源

### OWASP MCP 安全指南
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 綜合性的 OWASP MCP 前 10 名及 Azure 實作
- [MCP06 - 提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 詳細的提示注入緩解模式
- [MCP 安全高峰工作坊](https://azure-samples.github.io/sherpa/) - 實作體驗營第3營：輸入/輸出保安涵蓋內容安全

### Azure 文件
- [Azure 內容安全概覽](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [提示盾牌文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI 內容安全快速入門](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## 往後方向

- 返回: [安全模組概覽](./README.md)
- 前往: [模組3: 入門指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->