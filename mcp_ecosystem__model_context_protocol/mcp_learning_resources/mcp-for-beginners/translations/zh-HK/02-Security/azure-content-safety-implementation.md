# 使用 MCP 實作 Azure 內容安全

> **OWASP MCP 針對的風險**：[MCP06 - 意圖流程顛覆](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

為了加強 MCP 在防範提示注入、工具污染及其他 AI 特定漏洞的安全性，強烈建議整合 Azure 內容安全。本實作指南與 [MCP 安全峰會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/) 第三營：I/O 安全保持一致。

## 與 MCP 伺服器整合

要將 Azure 內容安全與您的 MCP 伺服器整合，請在請求處理流程中加入內容安全過濾器作為中介軟件：

1. 在伺服器啟動時初始化過濾器
2. 在處理前驗證所有傳入的工具請求
3. 在返回客戶端前檢查所有傳出的回應
4. 對安全違規進行記錄及警示
5. 實作適當的錯誤處理以應對內容安全檢查失敗

此作法提供強健防禦以抵禦：
- 提示注入攻擊
- 工具污染嘗試
- 透過惡意輸入進行資料外洩
- 產生有害內容

## Azure 內容安全整合最佳實務

1. <strong>自訂封鎖清單</strong>：針對 MCP 注入模式建立自訂封鎖清單
2. <strong>嚴重性調整</strong>：根據具體使用案例和風險容忍度調整嚴重性閾值
3. <strong>全面覆蓋</strong>：對所有輸入和輸出套用內容安全檢查
4. <strong>效能優化</strong>：考慮對重複的內容安全檢查實作快取
5. <strong>備援機制</strong>：定義內容安全服務不可用時的明確備援行為
6. <strong>使用者反饋</strong>：當內容因安全考量被封鎖時，向使用者提供清楚反饋
7. <strong>持續改進</strong>：根據新興威脅定期更新封鎖清單與模式

## 其他資源

### OWASP MCP 安全指導
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 完整 OWASP MCP 十大風險與 Azure 實作說明
- [MCP06 - 提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 詳細提示注入緩解模式
- [MCP 安全峰會工作坊](https://azure-samples.github.io/sherpa/) - 第三營：I/O 安全實作涵蓋內容安全

### Azure 文件
- [Azure 內容安全總覽](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields 文件](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI 內容安全快速入門](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## 接下來做什麼

- 返回：[安全模組總覽](./README.md)
- 繼續：[模組 3：快速開始](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->