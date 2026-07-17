# MCP 高階主題

[![高階 MCP：安全、可擴展及多模態 AI 代理](../../../translated_images/zh-HK/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(點擊上方圖片觀看本課程視頻)_

本章涵蓋模型上下文協議（MCP）實作中的一系列高階主題，包括多模態整合、可擴展性、安全最佳實踐及企業整合。這些主題對於構建健全且準備投入生產的 MCP 應用程式以滿足現代 AI 系統需求至關重要。

## 概述

本課程探討模型上下文協議實作中的高階概念，重點包含多模態整合、可擴展性、安全最佳實踐及企業整合。這些主題對於建立能夠處理複雜需求的生產級 MCP 應用程式於企業環境至關重要。

> **展望未來：** 下列若干主題受 `2026-07-28` MCP 規範候選版本影響 — 根上下文（5.4）與采樣（5.6）基於候選版本標示為棄用的基本原件建立，而協議功能（5.16）中引用的實驗性任務功能已移至專門的任務擴展中。詳情請參考 [MCP 變更摘要：2026-07-28 發布候選版本](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 學習目標

完成本課程後，您將能夠：

- 在 MCP 框架內實作多模態功能
- 設計適用於高負載情境的可擴展 MCP 架構
- 應用符合 MCP 安全原則的安全最佳實踐
- 將 MCP 與企業 AI 系統及框架整合
- 在生產環境中優化效能與穩定性

## 課程與範例專案

| 連結 | 標題 | 描述 |
|------|-------|-------------|
| [5.1 與 Azure 整合](./mcp-integration/README.md) | 與 Azure 整合 | 學習如何在 Azure 上整合您的 MCP 伺服器 |
| [5.2 多模態範例](./mcp-multi-modality/README.md) | MCP 多模態範例  | 音訊、影像及多模態回應範例 |
| [5.3 MCP OAuth2 範例](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 演示 | 精簡的 Spring Boot 應用示範 MCP 的 OAuth2，用於授權與資源伺服器。展示安全的令牌發放、保護的端點、Azure Container Apps 部署及 API 管理整合。 |
| [5.4 根上下文](./mcp-root-contexts/README.md) | 根上下文  | 詳解根上下文及其實作方法（於 `2026-07-28` 發布候選版本中棄用；`2025-11-25` 版本仍適用） |
| [5.5 路由](./mcp-routing/README.md) | 路由 | 了解不同類型的路由 |
| [5.6 采樣](./mcp-sampling/README.md) | 采樣 | 學習如何處理采樣（於 `2026-07-28` 發布候選版本中棄用；`2025-11-25` 版本仍適用） |
| [5.7 縮放](./mcp-scaling/README.md) | 縮放  | 了解縮放 |
| [5.8 安全性](./mcp-security/README.md) | 安全性  | 保護您的 MCP 伺服器安全 |
| [5.9 網絡搜索範例](./web-search-mcp/README.md) | 網絡搜索 MCP | Python MCP 伺服器與客戶端，整合 SerpAPI 用於即時網絡、新聞、商品搜索及問答。展示多工具協作、外部 API 整合及穩健的錯誤處理。 |
| [5.10 即時串流](./mcp-realtimestreaming/README.md) | 串流  | 即時數據串流已成為當今數據驅動世界的必備，能讓企業與應用即時訪問資訊並做出及時決策。|
| [5.11 即時網絡搜索](./mcp-realtimesearch/README.md) | 網絡搜索 | 探討 MCP 如何透過為 AI 模型、搜尋引擎與應用提供標準化上下文管理，轉變即時網絡搜索體驗。| 
| [5.12 Model Context Protocol 伺服器的 Entra ID 驗證](./mcp-security-entra/README.md) | Entra ID 驗證 | Microsoft Entra ID 提供強大雲端身份及訪問管理方案，確保僅有授權用戶與應用程式可與您的 MCP 伺服器互動。|
| [5.13 Microsoft Foundry Agent 整合](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 整合 | 學習如何將模型上下文協議伺服器與 Microsoft Foundry 代理整合，實現強大的工具協調及企業 AI 功能，並標準化外部資料來源連接。|
| [5.14 上下文工程](./mcp-contextengineering/README.md) | 上下文工程 | MCP 伺服器未來的上下文工程技術機會，涵蓋上下文優化、動態上下文管理，及在 MCP 框架中有效提示工程策略。|
| [5.15 MCP 自訂傳輸](./mcp-transport/README.md) | 自訂傳輸 | 學習如何為特定 MCP 通訊場景實作自訂傳輸機制。|
| [5.16 協議功能深究](./mcp-protocol-features/README.md) | 協議功能 | 精通進階協議功能，包含進度通知、請求取消、資源模板及錯誤處理模式。|
| [5.17 對抗式多代理推理](./mcp-adversarial-agents/README.md) | 對抗代理 | 使用兩個持不同立場且共享 MCP 工具集的代理，以捕捉幻覺、揭示邊緣案例，並透過結構化辯論產生更佳校準輸出。|

> **MCP 規範 2025-11-25 新增：** 規範現包含實驗性支援的 <strong>任務</strong>（長時運行操作及進度追蹤）、<strong>工具註解</strong>（關於工具行為的安全元資料）、**URL 模式引導**（請求客戶端特定 URL 內容）及增強的 <strong>根上下文</strong>（用於工作區上下文管理）。完整細節請見 [MCP 規範變更日誌](https://spec.modelcontextprotocol.io/)。

## 其他參考資料

有關高階 MCP 主題的最新資訊，請參照：
- [MCP 文件](https://modelcontextprotocol.io/)
- [MCP 規範（2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 倉庫](https://github.com/modelcontextprotocol)
- [OWASP MCP 十大風險](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全風險與緩解策略
- [MCP 安全高峰研討會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/) - 實作安全訓練

## 重要重點

- 多模態 MCP 實作將 AI 能力延伸至文字處理之外
- 可擴展性對企業部署至關重要，可透過水平與垂直擴展實現
- 全面安全措施保障資料安全並確保正確存取控制
- 與 Azure OpenAI 及 Microsoft AI Foundry 等平台的企業整合，提升 MCP 能力
- 進階 MCP 實作受益於優化架構與謹慎的資源管理

## 練習

為特定用例設計企業級 MCP 實作：

1. 確認您的用例所需的多模態需求
2. 制訂保護敏感資料的安全控制措施
3. 設計可處理不同負載的可擴展架構
4. 規劃與企業 AI 系統的整合點
5. 文件化潛在效能瓶頸及緩解策略

## 額外資源

- [Azure OpenAI 文件](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 文件](https://learn.microsoft.com/en-us/ai-services/)

---

## 下一步

探索本模組課程，由此開始：[5.1 MCP 整合](./mcp-integration/README.md)

完成本模組後，請繼續前往：[模組 6：社群貢獻](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->