# MCP 高級主題

[![高級 MCP：安全、可擴展且多模態的 AI 代理](../../../translated_images/zh-TW/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(點擊上方圖片觀看本課程影片)_

本章涵蓋模型上下文協議 (MCP) 實作中的一系列高級主題，包括多模態整合、可擴展性、安全最佳實踐及企業整合。這些主題對於建置穩健且適用於生產的 MCP 應用程式，達成現代 AI 系統的需求至關重要。

## 概覽

本課程探討模型上下文協議實作中的高級概念，重點包括多模態整合、可擴展性、安全最佳實踐與企業整合。這些主題對於建構能應付企業環境中複雜需求的生產等級 MCP 應用程式非常重要。

> **展望未來：** 以下多個主題受 `2026-07-28` MCP 規範 RC（Release Candidate）影響 — 根上下文 (5.4) 和採樣 (5.6) 建立於該 RC 標記為過時的基元上，而協議功能 (5.16) 中參考的實驗性任務功能將移至專屬任務擴充。詳細資訊請參閱 [MCP 變更內容：2026-07-28 RC](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 學習目標

完成本課程後，您將能夠：

- 在 MCP 框架內實現多模態功能
- 設計可擴展的 MCP 架構以滿足高需求場景
- 套用符合 MCP 安全原則的安全最佳實踐
- 將 MCP 整合進企業 AI 系統與框架
- 在生產環境中優化效能與可靠性

## 課程與範例專案

| 連結 | 標題 | 說明 |
|------|-------|-------------|
| [5.1 與 Azure 整合](./mcp-integration/README.md) | 與 Azure 整合 | 學習如何在 Azure 上整合您的 MCP 伺服器 |
| [5.2 多模態範例](./mcp-multi-modality/README.md) | MCP 多模態範例 | 音訊、影像與多模態回應範例 |
| [5.3 MCP OAuth2 範例](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 示範 | 簡易 Spring Boot 應用示範 MCP OAuth2 作為授權及資源伺服器。展示安全令牌發行、受保護端點、Azure Container Apps 部署與 API 管理解決方案。 |
| [5.4 根上下文](./mcp-root-contexts/README.md) | 根上下文 | 深入了解根上下文及其實作方法（在 `2026-07-28` RC 中已過時；對 `2025-11-25` 仍有效） |
| [5.5 路由](./mcp-routing/README.md) | 路由 | 學習不同類型的路由方法 |
| [5.6 採樣](./mcp-sampling/README.md) | 採樣 | 學習如何使用採樣（在 `2026-07-28` RC 中已過時；對 `2025-11-25` 仍有效） |
| [5.7 擴展](./mcp-scaling/README.md) | 擴展 | 學習擴展方法 |
| [5.8 安全](./mcp-security/README.md) | 安全 | 保護您的 MCP 伺服器安全 |
| [5.9 網路搜尋範例](./web-search-mcp/README.md) | 網路搜尋 MCP | Python MCP 伺服器與客戶端整合 SerpAPI，實現即時網路、新聞、商品搜尋及問答。展示多工具協調、外部 API 整合及穩健錯誤處理。 |
| [5.10 即時串流](./mcp-realtimestreaming/README.md) | 串流 | 即時資料串流已成為現今數據驅動世界的關鍵，企業與應用需即時取得資訊以作出時效決策。 |
| [5.11 即時網路搜尋](./mcp-realtimesearch/README.md) | 網路搜尋 | MCP 如何改變即時網路搜尋，透過標準化的上下文管理方式，聯繫 AI 模型、搜尋引擎及應用程式。 |
| [5.12 Model Context Protocol 伺服器的 Entra ID 驗證](./mcp-security-entra/README.md) | Entra ID 驗證 | Microsoft Entra ID 提供強固的雲端身份與存取管理解決方案，確保僅授權的使用者與應用能與您的 MCP 伺服器互動。 |
| [5.13 Microsoft Foundry 代理整合](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 整合 | 學習如何將 Model Context Protocol 伺服器與 Microsoft Foundry 代理整合，啟用強大的工具協調與企業 AI 能力，並支援標準化外部資料來源連接。 |
| [5.14 上下文工程](./mcp-contextengineering/README.md) | 上下文工程 | MCP 伺服器上下文工程技術的未來機會，包括上下文優化、動態上下文管理及 MCP 框架中有效提示工程策略。 |
| [5.15 MCP 自訂傳輸](./mcp-transport/README.md) | 自訂傳輸 | 學習如何實作自訂傳輸機制，以應對特殊 MCP 通訊場景。 |
| [5.16 協議功能深度解析](./mcp-protocol-features/README.md) | 協議功能 | 精通進階協議功能，包括進度通知、請求取消、資源範本與錯誤處理範式。 |
| [5.17 對抗性多代理推理](./mcp-adversarial-agents/README.md) | 對抗性代理 | 透過兩個立場相反的代理，共用單一 MCP 工具組，捕捉幻覺，揭露邊緣案例，並透過結構化辯論產生更精準的輸出結果。 |

> **MCP 規範 2025-11-25 新增**：規範新增實驗性支援 <strong>任務</strong>（帶進度追蹤的長時運算）、<strong>工具註解</strong>（關於工具行為以確保安全）、**URL 模式引導**（請求客戶端特定 URL 內容）及加強 <strong>根節點</strong>（用於工作區上下文管理）。詳見 [MCP 規範變更日誌](https://spec.modelcontextprotocol.io/)。

## 補充參考資料

有關進階 MCP 主題的最新資訊，請參考：
- [MCP 文件](https://modelcontextprotocol.io/)
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 儲存庫](https://github.com/modelcontextprotocol)
- [OWASP MCP 前十大](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全風險與緩解
- [MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - 實作安全訓練

## 重要重點

- 多模態 MCP 實作擴展 AI 能力至文本處理之外
- 可擴展性是企業部署的關鍵，透過水平與垂直擴展加以應對
- 全面安全措施保護資料並確保適當的存取控制
- 與 Azure OpenAI 及 Microsoft AI Foundry 等平台的企業整合增強 MCP 能力
- 進階 MCP 實作受益於優化架構及謹慎的資源管理

## 練習

為特定使用案例設計企業級 MCP 實作：

1. 確認您的使用案例中的多模態需求
2. 勾勒保護敏感資料所需的安全控管
3. 設計可應付變動負載的可擴展架構
4. 規劃與企業 AI 系統的整合點
5. 紀錄潛在效能瓶頸及緩解策略

## 附加資源

- [Azure OpenAI 文件](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 文件](https://learn.microsoft.com/en-us/ai-services/)

---

## 下一步

從本模組開始學習課程：[5.1 MCP 整合](./mcp-integration/README.md)

完成本模組後，繼續前往：[模組 6：社群貢獻](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->