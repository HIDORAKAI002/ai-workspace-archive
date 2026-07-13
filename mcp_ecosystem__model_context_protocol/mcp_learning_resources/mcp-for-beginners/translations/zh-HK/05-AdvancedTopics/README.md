# MCP 進階主題

[![進階 MCP：安全、可擴展及多模態 AI 代理](../../../translated_images/zh-HK/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(點擊上方圖片觀看本課程影片)_

本章涵蓋 Model Context Protocol (MCP) 實作中的一系列進階主題，包括多模態整合、可擴展性、安全最佳實踐及企業整合。這些主題對於構建穩健且生產可用的 MCP 應用程式，滿足現代 AI 系統需求至關重要。

## 概覽

本課程探討 MCP 實作中的進階概念，重點在多模態整合、可擴展性、安全最佳實踐以及企業整合。這些主題對於建立能在企業環境中處理複雜需求的生產級 MCP 應用至關重要。

> **前瞻提醒：** 下列多個主題皆受 `2026-07-28` MCP 規格釋出候選版本影響 — 根上下文（5.4）與抽樣（5.6）基於該版本標示為棄用之原語，而實驗性任務功能（在協定特徵 5.16 中提及）則移至獨立的任務擴充。詳見 [MCP 變更：2026-07-28 釋出候選版本](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 學習目標

完成本課程後，您將能夠：

- 在 MCP 框架中實現多模態功能
- 設計用於高需求場景的可擴展 MCP 架構
- 應用符合 MCP 安全原則的安全最佳實踐
- 與企業 AI 系統及框架整合 MCP
- 優化生產環境中的效能與可靠性

## 課程與範例專案

| 連結 | 標題 | 說明 |
|------|-------|-------------|
| [5.1 與 Azure 整合](./mcp-integration/README.md) | 與 Azure 整合 | 學習如何在 Azure 上整合您的 MCP 服務 |
| [5.2 多模態範例](./mcp-multi-modality/README.md) | MCP 多模態範例 | 音頻、影像及多模態回應範例 |
| [5.3 MCP OAuth2 範例](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 演示 | 最簡型 Spring Boot 應用示範 MCP 的 OAuth2 身份驗證及資源伺服器功能。展示安全的令牌發行、受保護端點、Azure Container Apps 部署及 API 管理整合。 |
| [5.4 根上下文](./mcp-root-contexts/README.md) | 根上下文 | 進一步了解根上下文及其實作方式 |
| [5.5 路由](./mcp-routing/README.md) | 路由 | 學習不同類型的路由 |
| [5.6 抽樣](./mcp-sampling/README.md) | 抽樣 | 學習如何使用抽樣 |
| [5.7 擴展](./mcp-scaling/README.md) | 擴展 | 了解擴展方法 |
| [5.8 安全](./mcp-security/README.md) | 安全 | 保護您的 MCP 服務 |
| [5.9 網頁搜尋範例](./web-search-mcp/README.md) | 網頁搜尋 MCP | Python MCP 伺服器與客戶端整合 SerpAPI 實時搜尋網頁、新聞、產品及問答。展示多工具協調、外部 API 整合及健全的錯誤處理。 |
| [5.10 實時串流](./mcp-realtimestreaming/README.md) | 串流 | 實時資料串流在當今數據驅動世界中已成為必需，企業與應用需即時取得資訊以作出迅速決策。|
| [5.11 實時網頁搜尋](./mcp-realtimesearch/README.md) | 網頁搜尋 | MCP 如何透過跨 AI 模型、搜尋引擎及應用標準化上下文管理，轉化實時網頁搜尋。| 
| [5.12 Model Context Protocol 伺服器的 Entra ID 驗證](./mcp-security-entra/README.md) | Entra ID 驗證 | Microsoft Entra ID 提供強健的雲端身份與存取管理解決方案，確保僅授權用戶與應用可與您的 MCP 服務互動。|
| [5.13 Microsoft Foundry 代理整合](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 整合 | 學習如何將 Model Context Protocol 伺服器整合進 Microsoft Foundry 代理，實現強大的工具協調及企業 AI 功能，並標準化外部資料來源連接。|
| [5.14 上下文工程](./mcp-contextengineering/README.md) | 上下文工程 | 面向 MCP 伺服器的上下文工程技術未來機會，包括上下文優化、動態上下文管理及 MCP 框架內有效提示工程策略。|
| [5.15 MCP 自訂傳輸](./mcp-transport/README.md) | 自訂傳輸 | 學習如何為特定 MCP 通訊場景實作自訂傳輸機制。|
| [5.16 協定特徵深入探討](./mcp-protocol-features/README.md) | 協定特徵 | 精通進階協定特徵，包括進度通知、請求取消、資源模板及錯誤處理模式。|
| [5.17 對抗性多代理推理](./mcp-adversarial-agents/README.md) | 對抗性代理 | 使用兩個立場相反的代理，分享同一 MCP 工具組，捕捉幻覺、揭示邊緣案例，並透過結構化辯論產出更佳校準輸出。|

> **MCP 規格 2025-11-25 新增**：規格新增對 <strong>任務</strong>（具有進度追蹤的長時間作業）、<strong>工具註解</strong>（關於工具行為的安全元資料）、**URL 模式引導**（要求客戶端提供特定 URL 內容）及強化 <strong>根上下文</strong>（用於工作區上下文管理）的實驗性支援。詳見 [MCP 規格更新紀錄](https://spec.modelcontextprotocol.io/)。

## 額外參考資料

有關進階 MCP 主題的最新資訊，請參考：
- [MCP 文件](https://modelcontextprotocol.io/)
- [MCP 規格 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 倉庫](https://github.com/modelcontextprotocol)
- [OWASP MCP 十大](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全風險及應對措施
- [MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - 實作安全訓練

## 主要重點整理

- 多模態 MCP 實作擴展 AI 能力，超越純文字處理
- 可擴展性對企業部署至關重要，可通過水平與垂直擴展解決
- 全面安全措施保護資料並確保存取控制得當
- 與 Azure OpenAI 及 Microsoft AI Foundry 等平台的企業整合，強化 MCP 能力
- 進階 MCP 實作受益於優化架構與謹慎的資源管理

## 練習

為特定使用案例設計企業等級 MCP 實作：

1. 確認該使用案例的多模態需求
2. 勾勒出保護敏感資料所需的安全控制
3. 設計可因應負載變化的可擴展架構
4. 規劃與企業 AI 系統的整合點
5. 記錄潛在效能瓶頸及緩解策略

## 額外資源

- [Azure OpenAI 文件](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 文件](https://learn.microsoft.com/en-us/ai-services/)

---

## 接下來

從以下課程開始探索本模組：[5.1 MCP 整合](./mcp-integration/README.md)

完成本模組後，繼續進行：[模組 6：社群貢獻](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->