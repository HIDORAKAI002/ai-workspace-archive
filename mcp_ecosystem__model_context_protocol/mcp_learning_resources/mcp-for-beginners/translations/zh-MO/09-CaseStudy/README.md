# MCP 實戰：真實案例研究

[![MCP 實戰：真實案例研究](../../../translated_images/zh-MO/10.3262cc80b4de5071.webp)](https://youtu.be/IxshWb2Az5w)

_(點擊上方圖片觀看本課視頻)_

模型上下文協定（MCP）正在改變 AI 應用如何與數據、工具和服務互動。本節展示了多個真實案例，說明 MCP 在各種企業場景中的實際應用。

## 概述

本節展示了 MCP 實施的具體範例，突顯組織如何利用此協定來解決複雜的業務挑戰。通過研究這些案例，您將獲悉 MCP 在真實場景中的多樣性、可擴展性及實用價值。

## 主要學習目標

透過探索這些案例，您將能夠：

- 理解 MCP 如何應用於解決特定業務問題
- 了解不同的整合模式和架構方法
- 認識企業環境中實施 MCP 的最佳實踐
- 探索現實實施中遇到的挑戰與解決方案
- 識別在自身項目中應用類似模式的機會

## 精選案例研究

### 1. [Azure AI 旅遊代理 — 參考實作](./travelagentsample.md)

本案例探討微軟的綜合參考解決方案，展示如何使用 MCP、Azure OpenAI 和 Azure AI 搜索建立多代理的 AI 驅動旅遊規劃應用。項目亮點：

- 通過 MCP 進行多代理協調
- 企業數據整合以 Azure AI 搜索為核心
- 使用 Azure 服務構建安全且可擴展的架構
- 可擴展的工具支持與可重用 MCP 元件
- 由 Azure OpenAI 支持的對話式使用者體驗

架構與實作細節提供了使用 MCP 作為協調層來構建複雜多代理系統的寶貴見解。

### 2. [從 YouTube 數據更新 Azure DevOps 項目](./UpdateADOItemsFromYT.md)

本案例展示 MCP 在自動化工作流程中的實際應用，說明 MCP 工具如何用於：

- 從線上平台（YouTube）提取數據
- 更新 Azure DevOps 系統中的工作項目
- 建立可重複的自動化流程
- 整合跨異系統數據

該範例展現即使是相對簡單的 MCP 實施，也能透過自動化例行任務與提升系統數據一致性帶來顯著效率提升。

### 3. [使用 MCP 實現即時文件檢索](./docs-mcp/README.md)

本案例引導您如何將 Python 終端客戶端連接至模型上下文協定（MCP）伺服器，即時檢索並記錄具有上下文智能的微軟文件。您將學會：

- 使用 Python 客戶端與官方 MCP SDK 連接 MCP 伺服器
- 利用串流 HTTP 客戶端實現高效即時數據獲取
- 調用伺服器上的文件工具並將回應直接記錄於終端
- 在不離開終端的情況下整合最新的微軟文件進入工作流

本章節附有實作任務、極簡示範代碼及深度學習資源連結。詳見連結章節中的完整步驟與代碼，了解 MCP 如何革新基於終端的文件存取與開發者生產力。

### 4. [基於 MCP 的互動式學習計劃生成器 Web 應用](./docs-mcp/README.md)

本案例展示如何使用 Chainlit 和模型上下文協定（MCP）構建互動式網頁應用，為任意主題生成個人化學習計劃。使用者可指定主題（如「AI-900 認證」）及學習時長（例如 8 週），應用將按週詳列推薦內容。Chainlit 提供聊天室式的對話界面，讓體驗生動且具適應性。

- 由 Chainlit 推動的對話式網頁應用
- 使用者驅動的主題及時長提示
- 依據 MCP 提供逐週內容推薦
- 於聊天介面實時適應回應

該項目展示如何結合對話式 AI 及 MCP 創建動態、使用者主導的現代網頁教育工具。

### 5. [在 VS Code 中使用 MCP 伺服器實現編輯器內文件](./docs-mcp/README.md)

本案例展示如何利用 MCP 伺服器將 Microsoft Learn 文檔直接帶入 VS Code 環境，省去頻繁切換瀏覽器標籤的麻煩。您將看到如何：

- 使用 MCP 面板或命令面板在 VS Code 內即時搜尋和閱讀文檔
- 在 README 或課程 Markdown 文件中直接引用文檔並插入連結
- 結合 GitHub Copilot 與 MCP，實現無縫的 AI 驅動文檔與代碼工作流
- 實時檢驗並提升文檔品質，保證微軟官方準確性
- 整合 MCP 與 GitHub 工作流程，實現持續文檔驗證

實施內容包括：

- 範例 `.vscode/mcp.json` 配置，方便設置
- 編輯器體驗的截圖式說明
- 結合 Copilot 與 MCP 的生產力提升技巧

本場景適合課程作者、文檔撰寫者及開發者，助其在編輯器中專注完成文檔、Copilot協同及驗證工作，全面由 MCP 支持。

### 6. [APIM MCP 伺服器建立](./apimsample.md)

本案例提供使用 Azure API 管理（APIM）建立 MCP 伺服器的逐步指南，涵蓋：

- 在 Azure API 管理中設置 MCP 伺服器
- 將 API 操作暴露為 MCP 工具
- 配置速率限制與安全政策
- 使用 Visual Studio Code 和 GitHub Copilot 測試 MCP 伺服器

此範例示範如何利用 Azure 的能力構建強健 MCP 伺服器，促進 AI 系統與企業 API 的整合。

### 7. [GitHub MCP Registry — 加速代理集成](https://github.com/mcp)

本案例剖析 GitHub MCP Registry，該平台於 2025 年 9 月推出，解決 AI 生態中一個關鍵痛點：MCP 伺服器分散發現與部署的困難。

#### 概覽
**MCP Registry** 針對 MCP 伺服器散佈在多個倉庫與註冊中心，整合難以快速而準確整合的問題提供解決方案。這些伺服器使 AI 代理能與外部系統如 API、資料庫和文檔來源互動。

#### 問題陳述
開發者在打造代理工作流程時面臨多重挑戰：
- MCP 伺服器在不同平台間難以發現
- 設置重複問題分散於論壇和文件中
- 不受信任或未驗證來源帶來的安全風險
- 伺服器品質與相容性缺乏標準化

#### 解決架構
GitHub MCP Registry 集中可信任的 MCP 伺服器，具備關鍵特性：
- 透過 VS Code 一鍵安裝整合，簡化設置
- 以星星數、活動度和社群驗證進行噪音過濾排序
- 與 GitHub Copilot 及其他 MCP 兼容工具直接整合
- 開放社群及企業合作者共建模式

#### 商業影響
該註冊中心帶來明顯效益：
- 加快開發者上手速度，如 Microsoft Learn MCP 伺服器能直接串流官方文檔至代理
- 專用伺服器如 `github-mcp-server` 促進自然語言的 GitHub 自動化（PR 建立、CI 重新運行、代碼掃描）
- 透過策展清單與透明配置標準提升生態系信任度

#### 策略價值
對專攻代理生命週期管理和可重現工作流程的實務者，MCP Registry 提供：
- 標準元件的模組化代理部署能力
- 註冊中心支持的評測管線，確保一致測試驗證
- 跨工具互操作性，促進不同 AI 平台的無縫整合

本案例顯示 MCP Registry 不僅是目錄平台，更是實現可擴展、真實模型整合及代理系統部署的基礎平台。

## 總結

這七個完整案例充分展示了模型上下文協定在多元真實場景中的卓越多樣性與實用價值。從複雜多代理旅遊規劃系統和企業 API 管理，到精簡文檔工作流以及革命性的 GitHub MCP Registry，這些範例展示 MCP 如何提供標準化、可擴展的方式，連接 AI 系統與工具、數據和服務，進而帶來卓越價值。

這些案例涵蓋 MCP 實施的多重面向：
- **企業整合**：Azure API 管理與 Azure DevOps 自動化
- **多代理協調**：協調 AI 代理的旅遊規劃
- **開發者生產力**：VS Code 整合與即時文檔存取
- **生態系發展**：GitHub MCP Registry 作為基礎平台
- **教育應用**：互動式學習計劃生成器與對話介面

透過研究這些實作，您將深入獲得：
- 各種規模和用例的架構範式
- 平衡功能性和可維護性的實作策略
- 用於正式部署的安全性與可擴展性考量
- MCP 伺服器開發與客戶端整合的最佳實踐
- 建構互連 AI 解決方案的生態思維

這些範例共同證明 MCP 不單是理論框架，而是成熟的、可投入生產的協定，支援解決複雜業務挑戰的實際方案。無論是構建簡單自動化工具還是先進的多代理系統，這裡展現的模式與方法都為您自己的 MCP 項目奠定堅實基礎。

## 額外資源

- [Azure AI Travel Agents GitHub 倉庫](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure DevOps MCP 工具](https://github.com/microsoft/azure-devops-mcp)
- [Playwright MCP 工具](https://github.com/microsoft/playwright-mcp)
- [Microsoft Docs MCP 伺服器](https://github.com/MicrosoftDocs/mcp)
- [GitHub MCP Registry — 加速代理集成](https://github.com/mcp)
- [MCP 社群範例](https://github.com/microsoft/mcp)

## 後續學習

- 上一章節：[第 8 章：最佳實踐](../08-BestPractices/README.md)
- 下一章節：[第 10 章：簡化 AI 工作流：使用 AI 工具包構建 MCP 伺服器](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。儘管我們力求準確，請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們對因使用本翻譯而引起的任何誤解或誤譯概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->