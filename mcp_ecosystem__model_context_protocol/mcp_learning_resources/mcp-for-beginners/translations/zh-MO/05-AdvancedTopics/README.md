# MCP 高級主題

[![高級 MCP：安全、可擴展及多模態 AI 代理](../../../translated_images/zh-MO/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(點擊上圖觀看本課程視頻)_

本章涵蓋模型上下文協議 (MCP) 實作中的一系列高級主題，包括多模態整合、可擴展性、安全最佳實踐及企業整合。這些主題對於建立穩健且可投入生產的 MCP 應用程式至關重要，以滿足現代 AI 系統的需求。

## 概述

本課程探討 MCP 實作中的進階概念，重點是多模態整合、可擴展性、安全最佳實踐及企業整合。這些主題對於構建能處理企業環境中複雜需求的生產級 MCP 應用程式至關重要。

> **前瞻提示：** 以下幾個主題受 `2026-07-28` MCP 規範發布候選版本影響——根上下文 (5.4) 與抽樣 (5.6) 基於被候選版本標記為過時的基本元件，且協議功能 (5.16) 中引用的實驗性任務功能將移至專門的任務擴展。詳情請參閱：[MCP 變更內容：2026-07-28 發布候選版](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 學習目標

本課結束時，您將能夠：

- 在 MCP 框架中實作多模態能力
- 設計具高需求應用場景可擴展性的 MCP 架構
- 應用符合 MCP 安全原則的安全最佳實踐
- 與企業 AI 系統及框架整合 MCP
- 優化生產環境中的效能與可靠性

## 課程與示例專案

| 連結 | 標題 | 說明 |
|------|-------|-------------|
| [5.1 與 Azure 整合](./mcp-integration/README.md) | 與 Azure 整合 | 學習如何在 Azure 上整合您的 MCP 伺服器 |
| [5.2 多模態示例](./mcp-multi-modality/README.md) | MCP 多模態示例 | 音訊、圖片及多模態回應示例 |
| [5.3 MCP OAuth2 示例](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 示範 | 簡潔的 Spring Boot 應用示範 MCP 的 OAuth2，涵蓋授權伺服器及資源伺服器。示範安全令牌發行、保護端點、Azure Container Apps 部署與 API 管理整合。 |
| [5.4 根上下文](./mcp-root-contexts/README.md) | 根上下文 | 深入了解根上下文及其實作 |
| [5.5 路由](./mcp-routing/README.md) | 路由 | 學習不同類型的路由 |
| [5.6 抽樣](./mcp-sampling/README.md) | 抽樣 | 學習如何處理抽樣 |
| [5.7 擴展](./mcp-scaling/README.md) | 擴展 | 認識可擴展性 |
| [5.8 安全](./mcp-security/README.md) | 安全 | 保護您的 MCP 伺服器 |
| [5.9 網絡搜尋示例](./web-search-mcp/README.md) | MCP 網絡搜尋 | Python MCP 伺服器及客户端接合 SerpAPI，提供即時網絡、新聞、產品搜尋及問答。示範多工具協同、外部 API 整合及強健錯誤處理。 |
| [5.10 即時串流](./mcp-realtimestreaming/README.md) | 串流 | 即時資料串流已成今日數據驅動世界的關鍵需求，企業及應用需即時取得資訊以做出及時決策。|
| [5.11 即時網絡搜尋](./mcp-realtimesearch/README.md) | 網絡搜尋 | MCP 如何透過標準化的上下文管理方法轉變即時網絡搜尋，涵蓋 AI 模型、搜尋引擎及應用程式。 |
| [5.12 Model Context Protocol 伺服器的 Entra ID 驗證](./mcp-security-entra/README.md) | Entra ID 驗證 | 微軟 Entra ID 提供強健的雲端身份與存取管理解決方案，確保僅授權使用者及應用可與您的 MCP 伺服器互動。|
| [5.13 Microsoft Foundry 代理整合](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 整合 | 學習如何將 MCP 伺服器與 Microsoft Foundry 代理整合，實現強大工具編排及企業 AI 能力，並標準化外部資料來源連結。|
| [5.14 上下文工程](./mcp-contextengineering/README.md) | 上下文工程 | MCP 伺服器上下文工程技術的未來機遇，包括上下文優化、動態上下文管理以及 MCP 框架中有效提示工程的策略。|
| [5.15 MCP 自訂傳輸](./mcp-transport/README.md) | 自訂傳輸 | 學習如何為特殊 MCP 通訊場景實作自訂傳輸機制。|
| [5.16 協議功能深入探討](./mcp-protocol-features/README.md) | 協議功能 | 精通進階協議功能，包括進度通知、請求取消、資源範本及錯誤處理模式。|
| [5.17 對抗性多代理推理](./mcp-adversarial-agents/README.md) | 對抗代理 | 使用持相反立場的兩個代理共用單一 MCP 工具集，透過結構化辯論捕捉幻覺、揭露邊緣案例並產出更佳校準輸出。|

> **MCP 規範 2025-11-25 新增**：規範現包含實驗性支援 <strong>任務</strong>（具進度追蹤的長時間運行作業）、<strong>工具標註</strong>（工具行為安全性元資料）、**URL 模式引導**（請求客戶端特定 URL 內容），以及增強的 <strong>根</strong>（用於工作區上下文管理）。詳細內容請參閱 [MCP 規範變更日誌](https://spec.modelcontextprotocol.io/)。

## 附加參考

有關 MCP 進階主題之最新資訊，請參考：
- [MCP 文件](https://modelcontextprotocol.io/)
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 倉庫](https://github.com/modelcontextprotocol)
- [OWASP MCP 十大](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全風險與緩解措施
- [MCP 安全峰會研討會 (Sherpa)](https://azure-samples.github.io/sherpa/) - 實作安全培訓

## 主要重點

- 多模態 MCP 實作擴展 AI 功能至文字處理之外
- 可擴展性對企業部署至關重要，可透過水平與垂直擴展實現
- 綜合安全措施保護資料並確保正確存取控制
- 與 Azure OpenAI 及 Microsoft AI Foundry 等平台進行企業整合，提升 MCP 功能
- 進階 MCP 實作從優化架構與謹慎資源管理中受益

## 練習

為特定使用案例設計一個企業級 MCP 實作：

1. 確定您的使用案例的多模態需求
2. 擬定保護敏感資料所需的安全控制措施
3. 設計能應對變化負載的可擴展架構
4. 規劃與企業 AI 系統的整合點
5. 文件化潛在效能瓶頸及緩解策略

## 附加資源

- [Azure OpenAI 文件](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 文件](https://learn.microsoft.com/en-us/ai-services/)

---

## 下一步

從本模組中的課程開始探索：[5.1 MCP 整合](./mcp-integration/README.md)

完成本模組後，繼續進行：[模組 6：社群貢獻](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->