# MCP 實戰：真實案例研究

[![MCP 實戰：真實案例研究](../../../translated_images/zh-HK/10.3262cc80b4de5071.webp)](https://youtu.be/IxshWb2Az5w)

_(點擊上方圖片觀看本課程影片)_

模型上下文協定（Model Context Protocol，MCP）正在改變 AI 應用如何與數據、工具及服務互動。本節介紹多個真實案例，展示 MCP 在各種企業場景中的實際應用。

## 概覽

本節展示 MCP 實施的具體範例，突顯組織如何利用此協定解決複雜的商業挑戰。透過檢視這些案例，您將深入了解 MCP 在真實場景中的多樣性、可擴展性及實際效益。

## 主要學習目標

透過探索這些案例，您將能：

- 理解 MCP 如何應用於解決特定商業問題
- 了解不同的整合範式及架構方法
- 認識在企業環境中實施 MCP 的最佳實踐
- 掌握真實實施中面臨的挑戰及解決方案
- 發掘在自有專案中應用類似模式的機會

## 精選案例研究

### 1. [Azure AI 旅遊代理 – 參考實作](./travelagentsample.md)

此案例探討微軟的完整參考解決方案，展示如何利用 MCP、Azure OpenAI 及 Azure AI Search 建構多代理 AI 旅遊規劃應用。專案亮點包括：

- 透過 MCP 實現多代理協調
- 企業數據整合與 Azure AI Search
- 使用 Azure 服務打造安全可擴展架構
- 可擴充工具鏈，復用 MCP 元件
- 以 Azure OpenAI 驅動的對話式用戶體驗

架構及實作細節提供了使用 MCP 作為協調層構建複雜多代理系統的寶貴見解。

### 2. [基於 YouTube 數據更新 Azure DevOps 項目](./UpdateADOItemsFromYT.md)

此案例展示 MCP 在自動化工作流的實際應用，示範如何：

- 從線上平台（YouTube）擷取數據
- 更新 Azure DevOps 系統中的工作項目
- 建立可重複的自動化流程
- 整合跨系統的數據

此範例顯示即使相對簡單的 MCP 實施，亦能透過自動化例行任務及提升數據一致性帶來顯著效能提升。

### 3. [使用 MCP 的即時文件擷取](./docs-mcp/README.md)

本案例引導您透過 Python 控制台客戶端連接 Model Context Protocol (MCP) 伺服器，即時檢索並記錄具上下文感知的 Microsoft 文件。您將學到：

- 使用 Python 客戶端及官方 MCP SDK 連接 MCP 伺服器
- 利用串流 HTTP 客戶端高效即時數據擷取
- 呼叫伺服器上的文件工具並直接將回應輸出至控制台
- 將最新的 Microsoft 文件整合至工作流程，無需離開終端機

本章包含實作作業、最小運作範例碼與深化學習資源連結。詳見連結章節完整操作指引，了解 MCP 如何改造文件存取和終端機開發者生產力。

### 4. [利用 MCP 建置互動式學習計劃產生器 Web App](./docs-mcp/README.md)

此案例示範如何使用 Chainlit 結合 Model Context Protocol (MCP) 建立互動式網頁應用，為任意主題產生個人化學習計劃。用戶可以指定科目（如「AI-900 認證」）與學習時長（例如 8 週），應用會提供逐週推薦內容。Chainlit 提供對話式聊天介面，使體驗生動且具適應性。

- 由 Chainlit 支援的對話式網頁應用
- 用戶驅動主題與時長提示
- 透過 MCP 逐週內容推薦
- 聊天介面實時且具適應性回應

此專案說明對話式 AI 與 MCP 如何結合，在現代網頁環境中打造動態且用戶導向的教育工具。

### 5. [VS Code 內嵌 MCP 伺服器文件](./docs-mcp/README.md)

此案例展示如何將 Microsoft Learn Docs 直接引入 VS Code 環境，透過 MCP 伺服器避免切換瀏覽器分頁。您將看到如何：

- 使用 MCP 面板或命令面板即時在 VS Code 內搜尋及閱讀文件
- 直接引用文件並插入連結到 README 或課程 Markdown 檔案
- 結合 GitHub Copilot 與 MCP，實現無縫的 AI 驅動文件與程式碼工作流程
- 以即時反饋及微軟來源的準確性驗證並提升文件品質
- 整合 MCP 與 GitHub 工作流程，實現持續文件驗證

實作包含：

- `.vscode/mcp.json` 範例設定方便快速部署
- 內嵌體驗截圖導覽
- 結合 Copilot 與 MCP 提升生產力的小技巧

這方案非常適合課程作者、文件撰寫者及開發者，讓他們在編輯器內聚焦工作，同時享用文件、Copilot 與驗證工具的便利，皆由 MCP 支持。

### 6. [APIM MCP 伺服器建置](./apimsample.md)

本案例依步驟指導如何利用 Azure API 管理（APIM）建立 MCP 伺服器，涵蓋：

- 在 Azure API 管理中設定 MCP 伺服器
- 將 API 操作暴露為 MCP 工具
- 配置限制速率與安全性的策略
- 使用 Visual Studio Code 和 GitHub Copilot 測試 MCP 伺服器

此範例展示如何運用 Azure 能力創建穩健 MCP 伺服器，提升 AI 系統與企業 API 的整合能力。

### 7. [GitHub MCP Registry — 加速 Agentic 整合](https://github.com/mcp)

本案例分析 GitHub 於 2025 年 9 月推出的 MCP Registry，解決 AI 生態系中一個關鍵難題：MCP 伺服器發現與部署零散難題。

#### 概覽
**MCP Registry** 解決了 MCP 伺服器分散於各庫及註冊表，導致整合緩慢且易錯的困境。這些伺服器讓 AI 代理能與外部系統如 API、資料庫及文件來源互動。

#### 問題陳述
建構 agentic 工作流的開發者面臨若干挑戰：
- 不同平台 MCP 伺服器的 **發現率低**
- 論壇及文件中分散的 **重複設定問題**
- 來源未驗證、引發的 **安全風險**
- 伺服器品質與相容性 **缺乏標準化**

#### 解決方案架構
GitHub MCP Registry 集中受信任的 MCP 伺服器，並具備以下特色：
- 可透過 VS Code 一鍵安裝，簡化部署
- 以星標、活動度及社群驗證實現訊號過濾雜訊排序
- 與 GitHub Copilot 及其他 MCP 相容工具直接整合
- 開放貢獻模式，鼓勵社群及企業合作夥伴參與

#### 商業影響
該註冊表帶來明顯改善：
- 開發者透過 Microsoft Learn MCP Server 等工具更快上手，其直接串流官方文件至代理
- 專業伺服器如 `github-mcp-server` 提升生產力，自然語言指令可自動化 GitHub (PR 建立、CI 重跑、程式碼掃描)
- 透過精選列表及透明設定標準，強化生態系信任感

#### 策略價值
對專注代理生命週期管理與可重複工作流的從業者，MCP Registry 提供：
- 模組化代理部署，含標準化元件
- 以註冊表為基礎的評估管線，確保測試與驗證一致性
- 跨工具互操作性，實現不同 AI 平台無縫整合

此案例證明 MCP Registry 不僅是個目錄，而是面向可擴展、實務模型整合及 agentic 系統部署的基礎平台。

## 結論

這七個全面的案例突顯模型上下文協定（MCP）於各種真實場景中的靈活性及實際應用。從複雜多代理旅遊規劃系統與企業 API 管理，到簡化文件工作流程及革命性 GitHub MCP Registry，這些示例演示 MCP 如何以標準化且可擴展的方式連接 AI 系統與所需工具、數據及服務，創造卓越價值。

這些案例涵蓋 MCP 實施的多維面向：
- **企業整合**：Azure API 管理及 Azure DevOps 自動化
- **多代理協調**：協調式 AI 代理旅遊規劃
- **開發者生產力**：VS Code 整合與實時文件擷取
- **生態系發展**：GitHub MCP Registry 作為基礎平台
- **教育應用**：互動式學習計劃產生器與對話介面

透過學習這些實施，您將掌握：
- 適合不同規模及用例的 **架構模式**
- 平衡功能與可維護性的 **實作策略**
- 生產部署的 **安全性與可擴展性** 考量
- MCP 伺服器開發及客戶端整合的 **最佳實踐**
- 構建互聯 AI 解決方案的 **生態系思維**

這些示例共同證明，MCP 不僅是理論架構，而是成熟的生產就緒協定，支援對複雜商務挑戰的實際解決方案。無論您是在構建簡單自動化工具或先進多代理系統，這裡所示範的模式與方法都為您的 MCP 專案奠定堅實基礎。

## 其他資源

- [Azure AI 旅遊代理 GitHub 倉庫](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure DevOps MCP 工具](https://github.com/microsoft/azure-devops-mcp)
- [Playwright MCP 工具](https://github.com/microsoft/playwright-mcp)
- [Microsoft Docs MCP 伺服器](https://github.com/MicrosoftDocs/mcp)
- [GitHub MCP Registry — 加速 Agentic 整合](https://github.com/mcp)
- [MCP 社群示例](https://github.com/microsoft/mcp)

## 下一步

- 上一章節：[模組 8：最佳實踐](../08-BestPractices/README.md)
- 下一章節：[模組 10：精簡 AI 工作流程：使用 AI 工具包建置 MCP 伺服器](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。雖然我們致力於提高準確度，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們對因使用此翻譯而引起的任何誤解或誤讀概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->