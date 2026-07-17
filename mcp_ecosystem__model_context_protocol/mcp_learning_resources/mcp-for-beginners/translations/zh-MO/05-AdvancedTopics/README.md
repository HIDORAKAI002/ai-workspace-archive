# MCP 進階主題

[![進階 MCP：安全、可擴展及多模態 AI 代理](../../../translated_images/zh-MO/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(點擊上方圖片觀看本課程視頻)_

本章節涵蓋 Model Context Protocol (MCP) 實作中的一系列進階主題，包括多模態整合、可擴展性、安全最佳實踐及企業整合。這些主題對於構建能夠滿足現代 AI 系統需求的穩健且適合生產環境的 MCP 應用至關重要。

## 概覽

本課程探討 Model Context Protocol 實作中的進階概念，重點包括多模態整合、可擴展性、安全最佳實踐及企業整合。這些主題對於構建能在企業環境中處理複雜需求的生產級 MCP 應用非常重要。

> **前瞻提示：** 以下多個主題受到 `2026-07-28` MCP 規範釋出候選版的影響——Root Contexts (5.4) 和 Sampling (5.6) 建立在該候選版標示為棄用的原語之上，而 Protocol Features (5.16) 中提及的實驗性 Tasks 功能則移至專門的 Tasks 擴展。詳情請參見 [MCP 規範變更：2026-07-28 釋出候選版](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 學習目標

完成本課程後，您將能夠：

- 在 MCP 框架內實作多模態能力
- 設計可支援高需求場景的可擴展 MCP 架構
- 應用符合 MCP 安全原則的安全最佳實踐
- 將 MCP 整合於企業 AI 系統和框架中
- 優化生產環境中的效能和可靠性

## 課程與範例專案

| 連結 | 標題 | 說明 |
|------|-------|-------------|
| [5.1 與 Azure 整合](./mcp-integration/README.md) | 與 Azure 整合 | 學習如何將 MCP 伺服器整合至 Azure |
| [5.2 多模態範例](./mcp-multi-modality/README.md) | MCP 多模態範例 | 音頻、影像與多模態回應範例 |
| [5.3 MCP OAuth2 範例](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 範例 | 以最簡 Spring Boot 應用展示 OAuth2 結合 MCP，包含授權伺服器及資源伺服器。示範安全的令牌簽發、受保護端點、Azure 容器應用部署以及 API 管理整合。 |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts | 深入了解 Root context 及其實作方法（在 `2026-07-28` 釋出候選版中棄用；仍適用於 `2025-11-25`） |
| [5.5 Routing](./mcp-routing/README.md) | Routing | 學習不同類型的路由 |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | 學習如何使用 sampling（在 `2026-07-28` 釋出候選版中棄用；仍適用於 `2025-11-25`） |
| [5.7 Scaling](./mcp-scaling/README.md) | Scaling | 學習擴展 |
| [5.8 Security](./mcp-security/README.md) | Security | 保護您的 MCP 伺服器安全 |
| [5.9 網絡搜尋範例](./web-search-mcp/README.md) | Web Search MCP | Python MCP 伺服器與用戶端結合 SerpAPI 進行實時網絡、新聞、產品搜尋及問答。展示多工具協調、外部 API 整合及強健錯誤處理。 |
| [5.10 實時串流](./mcp-realtimestreaming/README.md) | Streaming | 實時數據串流已成為當今數據驅動世界的核心，企業與應用需要即時獲取資訊以作出及時決策。|
| [5.11 實時網頁搜尋](./mcp-realtimesearch/README.md) | Web Search | MCP 如何透過為 AI 模型、搜尋引擎與應用提供標準化的上下文管理，轉變實時網頁搜尋。| 
| [5.12 Model Context Protocol 伺服器的 Entra ID 認證](./mcp-security-entra/README.md) | Entra ID 認證 | Microsoft Entra ID 提供強大的雲端身份與存取管理解決方案，確保只有授權用戶與應用能與您的 MCP 伺服器互動。|
| [5.13 Microsoft Foundry Agent 整合](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 整合 | 學習如何將 Model Context Protocol 伺服器與 Microsoft Foundry 代理整合，實現強大的工具協調與企業 AI 功能，並透過標準化外部資料源連接。|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | MCP 伺服器上下文工程技術的未來機會，包括上下文優化、動態上下文管理及 MCP 框架內有效提示工程策略。|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | 學習如何針對特定 MCP 通訊場景實作自訂傳輸機制。|
| [5.16 Protocol Features 深度探討](./mcp-protocol-features/README.md) | Protocol Features | 精通進階協定功能，包括進度通知、請求取消、資源範本及錯誤處理模式。|
| [5.17 對抗式多代理推理](./mcp-adversarial-agents/README.md) | Adversarial Agents | 透過兩個持相反立場且共用單一 MCP 工具集的代理進行結構化辯論，捕捉幻覺、揭露邊緣案例，並產出更準確的結果。|

> **MCP 規範 2025-11-25 新增內容**：規範現已包含對<strong>任務</strong>（帶進度追蹤的長時執行操作）、<strong>工具註解</strong>（關於工具行為的安全元資料）、**URL 模式誘導**（向客戶端請求特定 URL 內容）及增強<strong>Roots</strong>（用於工作區上下文管理）的實驗性支持。詳情請參考 [MCP 規範更新日誌](https://spec.modelcontextprotocol.io/)。

## 額外參考資源

欲取得進階 MCP 主題的最新資訊，請參閱：
- [MCP 文件](https://modelcontextprotocol.io/)
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 倉庫](https://github.com/modelcontextprotocol)
- [OWASP MCP 十大安全風險](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全風險與緩解措施
- [MCP 安全峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - 實作安全訓練

## 主要要點

- 多模態 MCP 實作擴展 AI 能力，超越文字處理
- 可擴展性對企業部署至關重要，可透過水平與垂直擴展解決
- 全面安全措施可保護資料並確保妥善存取控制
- 與 Azure OpenAI 及 Microsoft AI Foundry 等平台的企業整合，提升 MCP 能力
- 進階 MCP 實作受益於優化的架構及細心的資源管理

## 練習

為特定使用案例設計企業級 MCP 實作：

1. 確認您的使用案例之多模態需求
2. 列出保護敏感資料所需的安全控管
3. 設計可應對負載波動的可擴展架構
4. 規劃與企業 AI 系統的整合點
5. 記錄可能的效能瓶頸及緩解策略

## 額外資源

- [Azure OpenAI 文件](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 文件](https://learn.microsoft.com/en-us/ai-services/)

---

## 下一步

從本模組中的課程開始探索：[5.1 MCP 整合](./mcp-integration/README.md)

完成本模組後，繼續前往：[模組 6：社群貢獻](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->