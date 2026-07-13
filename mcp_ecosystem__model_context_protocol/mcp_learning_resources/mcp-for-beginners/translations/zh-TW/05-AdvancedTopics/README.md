# MCP 進階主題

[![進階 MCP：安全、可擴展且多模態的 AI 代理人](../../../translated_images/zh-TW/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(點擊上方圖片觀看本課程的影片)_

本章涵蓋了 Model Context Protocol (MCP) 實作中的一系列進階主題，包括多模態整合、可擴展性、安全最佳實踐與企業整合。這些主題對於建立穩健且可用於生產的 MCP 應用程式，滿足現代 AI 系統需求至關重要。

## 概覽

本課程探討 Model Context Protocol 實作中的進階概念，聚焦多模態整合、可擴展性、安全最佳實踐與企業整合。這些主題對於構建可用於企業環境中，能處理複雜需求的生產級 MCP 應用至關重要。

> <strong>前瞻提醒：</strong>以下多個主題受 `2026-07-28` MCP 規範候選版本影響 — 根上下文（5.4）與抽樣（5.6）建立在該候選版本標記為已棄用的原語之上，協議功能（5.16）中提及的實驗性任務功能將移至專門的任務擴充。詳情請參閱 [MCP 變更更新：2026-07-28 候選版本](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 學習目標

本課程結束後，你將能夠：

- 在 MCP 架構中實作多模態能力
- 設計適用於高需求場景的可擴展 MCP 架構
- 應用與 MCP 安全原則協調一致的安全最佳實踐
- 整合 MCP 與企業 AI 系統及框架
- 在生產環境中優化效能與可靠性

## 課程及範例專案

| 連結 | 標題 | 說明 |
|------|-------|-------------|
| [5.1 與 Azure 整合](./mcp-integration/README.md) | 與 Azure 整合 | 學習如何在 Azure 上整合你的 MCP 伺服器 |
| [5.2 多模態範例](./mcp-multi-modality/README.md) | MCP 多模態範例 | 音訊、影像及多模態回應範例 |
| [5.3 MCP OAuth2 範例](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 展示 | 簡易 Spring Boot 應用，展示 MCP 中的 OAuth2 授權與資源伺服器，用於示範安全的權杖發行、保護端點、Azure 容器應用部署及 API 管理整合。 |
| [5.4 根上下文](./mcp-root-contexts/README.md) | 根上下文 | 瞭解根上下文及其實作方式 |
| [5.5 路由](./mcp-routing/README.md) | 路由 | 學習不同類型的路由 |
| [5.6 抽樣](./mcp-sampling/README.md) | 抽樣 | 學習如何處理抽樣 |
| [5.7 擴展](./mcp-scaling/README.md) | 擴展 | 了解擴展技術 |
| [5.8 安全](./mcp-security/README.md) | 安全 | 保護你的 MCP 伺服器 |
| [5.9 網頁搜尋範例](./web-search-mcp/README.md) | 網頁搜尋 MCP | Python MCP 伺服器與客戶端整合 SerpAPI，支援即時網頁、新聞、產品搜尋及問答，展現多工具協作、外部 API 整合及強健錯誤處理。 |
| [5.10 即時串流](./mcp-realtimestreaming/README.md) | 串流 | 即時資料串流已成為當今資料驅動世界的關鍵，企業和應用程序藉此迅速取得資訊，做出即時決策。|
| [5.11 即時網頁搜尋](./mcp-realtimesearch/README.md) | 網頁搜尋 | MCP 如何透過標準化上下文管理，改變跨 AI 模型、搜尋引擎及應用的即時網頁搜尋。 | 
| [5.12 Model Context Protocol 伺服器的 Entra ID 驗證](./mcp-security-entra/README.md) | Entra ID 驗證 | Microsoft Entra ID 提供強固的雲端身份與存取管理解決方案，確保只有授權使用者及應用程式能與你的 MCP 伺服器互動。|
| [5.13 Microsoft Foundry Agent 整合](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 整合 | 學習如何將 MCP 伺服器與 Microsoft Foundry 代理整合，實現強大的工具協作及企業 AI 功能，並透過標準化外部資料源連結強化功能。|
| [5.14 上下文工程](./mcp-contextengineering/README.md) | 上下文工程 | 探討 MCP 伺服器上下文工程技術的未來機會，包括上下文優化、動態上下文管理及 MCP 框架內有效提示工程策略。|
| [5.15 MCP 自訂傳輸](./mcp-transport/README.md) | 自訂傳輸 | 學習如何為特殊 MCP 通信場景實作自訂傳輸機制。|
| [5.16 協議功能深入探討](./mcp-protocol-features/README.md) | 協議功能 | 精通進階協議功能，包括進度通知、請求取消、資源範本及錯誤處理模式。|
| [5.17 對抗性多代理推理](./mcp-adversarial-agents/README.md) | 對抗代理 | 透過兩個持相反立場、共用單一 MCP 工具集的代理，捕捉幻覺、揭示邊緣情況，並透過結構化辯論產生更精確的輸出。|

> **MCP 規範 2025-11-25 新增**：規範現包含對 <strong>任務</strong>（具進度追蹤的長時間執行操作）、<strong>工具註解</strong>（關於工具行為的安全元資料）、**URL 模式引導**（從客戶端請求特定 URL 內容）及強化 <strong>根</strong>（用於工作區上下文管理）的實驗性支援。詳見 [MCP 規範變更日誌](https://spec.modelcontextprotocol.io/)。

## 其他參考資料

最新的進階 MCP 主題資訊可參考：
- [MCP 文件](https://modelcontextprotocol.io/)
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 倉庫](https://github.com/modelcontextprotocol)
- [OWASP MCP 前十安全風險](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全風險與緩解措施
- [MCP 安全峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - 實作安全訓練

## 主要重點

- 多模態 MCP 實作擴展 AI 能力，超越純文字處理
- 可擴展性是企業部署的關鍵，可透過水平與垂直擴展達成
- 全面安全措施保護資料並確保正確的存取控制
- 與 Azure OpenAI 及 Microsoft AI Foundry 等平台整合，提升 MCP 能力
- 進階 MCP 實作受益於優化架構及謹慎的資源管理

## 練習

為特定使用案例設計企業級 MCP 實作：

1. 確認多模態需求
2. 概述保護敏感資料所需的安全控管
3. 設計可因應負載變化的可擴展架構
4. 規劃與企業 AI 系統的整合點
5. 紀錄可能的效能瓶頸及緩解策略

## 額外資源

- [Azure OpenAI 文件](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 文件](https://learn.microsoft.com/en-us/ai-services/)

---

## 下一步

探索本模組的課程，從 [5.1 MCP 整合](./mcp-integration/README.md) 開始

完成本模組後，繼續前往：[第 6 模組：社群貢獻](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->