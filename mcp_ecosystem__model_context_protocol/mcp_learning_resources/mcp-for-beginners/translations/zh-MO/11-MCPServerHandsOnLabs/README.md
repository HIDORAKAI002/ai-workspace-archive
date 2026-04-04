# 🚀 MCP 伺服器與 PostgreSQL - 完整學習指南

## 🧠 MCP 資料庫整合學習路徑概覽

本全方位學習指南教你如何透過實務零售分析應用，建立具備資料庫整合功能的生產等級 **Model Context Protocol (MCP) 伺服器**。你將學習企業級模式，包括 **列級安全 (Row Level Security, RLS)**、**語意搜尋**、**Azure AI 整合**及 **多租戶資料存取**。

無論你是後端開發者、AI 工程師或資料架構師，本指南皆提供結構化學習，結合實際範例與動手練習，帶你逐步完成以下 MCP 伺服器 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail 。

## 🔗 官方 MCP 資源

- 📘 [MCP 文件](https://modelcontextprotocol.io/) – 詳盡教學與使用指南  
- 📜 [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – 協議架構及技術參考  
- 🧑‍💻 [MCP GitHub 倉庫](https://github.com/modelcontextprotocol) – 開放原始碼 SDK、工具與程式碼範例  
- 🌐 [MCP 社群](https://github.com/orgs/modelcontextprotocol/discussions) – 參與討論並為社群貢獻  
- 🔒 [OWASP MCP 十大安全](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – 安全最佳實踐與風險防範  

## 🧭 MCP 資料庫整合學習路徑

### 📚 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail 完整學習架構

| 實驗室 | 主題 | 說明 | 連結 |
|--------|-------|-------------|------|
| **實驗室 1-3：基礎知識** | | | |
| 00 | [MCP 資料庫整合介紹](./00-Introduction/README.md) | MCP 與資料庫整合概覽及零售分析案例 | [從這開始](./00-Introduction/README.md) |
| 01 | [核心架構概念](./01-Architecture/README.md) | 了解 MCP 伺服器架構、資料庫層級與安全模式 | [學習](./01-Architecture/README.md) |
| 02 | [安全與多租戶](./02-Security/README.md) | 列級安全、身份驗證及多租戶資料存取 | [學習](./02-Security/README.md) |
| 03 | [環境設置](./03-Setup/README.md) | 開發環境設定、Docker 與 Azure 資源配置 | [設定](./03-Setup/README.md) |
| **實驗室 4-6：建立 MCP 伺服器** | | | |
| 04 | [資料庫設計與架構](./04-Database/README.md) | PostgreSQL 設定、零售架構設計與範例資料 | [建立](./04-Database/README.md) |
| 05 | [MCP 伺服器實作](./05-MCP-Server/README.md) | 建置整合資料庫的 FastMCP 伺服器 | [建立](./05-MCP-Server/README.md) |
| 06 | [工具開發](./06-Tools/README.md) | 創建資料庫查詢工具及架構探查 | [建立](./06-Tools/README.md) |
| **實驗室 7-9：進階功能** | | | |
| 07 | [語意搜尋整合](./07-Semantic-Search/README.md) | 使用 Azure OpenAI 和 pgvector 實作向量嵌入 | [進階](./07-Semantic-Search/README.md) |
| 08 | [測試與除錯](./08-Testing/README.md) | 測試策略、除錯工具與驗證方法 | [測試](./08-Testing/README.md) |
| 09 | [VS Code 整合](./09-VS-Code/README.md) | 配置 VS Code MCP 整合及 AI Chat 使用方式 | [整合](./09-VS-Code/README.md) |
| **實驗室 10-12：生產環境與最佳實踐** | | | |
| 10 | [部署策略](./10-Deployment/README.md) | Docker 部署、Azure Container Apps 與擴充考量 | [部署](./10-Deployment/README.md) |
| 11 | [監控與可觀察性](./11-Monitoring/README.md) | Application Insights、日誌紀錄及效能監控 | [監控](./11-Monitoring/README.md) |
| 12 | [最佳實踐與優化](./12-Best-Practices/README.md) | 效能優化、安全強化及生產環境建議 | [優化](./12-Best-Practices/README.md) |

### 💻 你將建立的系統

完成此學習路徑後，你將擁有完整的 **Zava 零售分析 MCP 伺服器**，特色包括：

- **多表零售資料庫**：客戶訂單、產品與庫存資料  
- **列級安全 (Row Level Security)**：基於門市的資料孤立  
- **語意商品搜尋**：採用 Azure OpenAI 嵌入向量技術  
- **VS Code AI Chat 整合**：自然語言查詢系統  
- **生產環境部署**：使用 Docker 與 Azure  
- **全面監控**：Application Insights 平台監測  

## 🎯 學習前置條件

為達最佳學習效果，建議具備：

- **程式經驗**：熟悉 Python（建議）或相似語言  
- **資料庫知識**：具備 SQL 基礎與關聯式資料庫認識  
- **API 概念**：了解 REST API 與 HTTP 原理  
- **開發工具**：熟悉命令列、Git 及程式編輯器  
- **雲端基礎**：（選擇性）具備 Azure 或類似雲平台基本認識  
- **Docker 認識**：（選擇性）了解容器化概念  

### 必備工具

- **Docker Desktop** - 用於執行 PostgreSQL 與 MCP 伺服器  
- **Azure CLI** - 用於部署雲端資源  
- **VS Code** - 開發與 MCP 整合工具  
- **Git** - 版本控制工具  
- **Python 3.8+** - MCP 伺服器開發使用  

## 📚 學習指南與資源

本學習路徑包含詳盡資源幫助你高效導航：

### 學習指南

每個實驗室含有：  
- **明確學習目標** – 你將獲得的知識與技能  
- **步驟詳解** – 實作指引說明  
- **程式碼範例** – 可運行範例及解說  
- **練習題目** – 動手操練機會  
- **故障排除指南** – 常見問題與解決方案  
- **附加資源** – 延伸閱讀與探索方向  

### 前置條件檢查

開始每個實驗室前，你會看到：  
- **必備知識** – 須具備的先備條件  
- **環境確認** – 如何驗證你的環境是否已準備就緒  
- **時間預估** – 預期完成時間  
- **學習成果** – 完成後你將了解什麼  

### 推薦學習路徑

依據你的經驗水平挑選合適路徑：

#### 🟢 **初學者路徑**（無 MCP 經驗）  
1. 確保先完成 [MCP for Beginners](https://aka.ms/mcp-for-beginners) 中 0-10 節  
2. 完成實驗室 00-03，鞏固基礎  
3. 跟隨實驗室 04-06 動手打造系統  
4. 體驗實驗室 07-09 實務應用  

#### 🟡 **中階路徑**（已有 MCP 經驗）  
1. 回顧實驗室 00-01 資料庫相關核心概念  
2. 著重實驗室 02-06 的系統實作  
3. 深入探索實驗室 07-12 的進階功能  

#### 🔴 **高階路徑**（熟悉 MCP）  
1. 瀏覽實驗室 00-03 以了解背景  
2. 專注實驗室 04-09 的資料庫整合  
3. 著重實驗室 10-12 生產部署相關  

## 🛠️ 如何有效使用此學習路徑

### 依序學習（推薦）

按順序進行實驗室，獲得完整理解：

1. **閱讀概述** – 理解你將學習的內容  
2. **確認前置條件** – 確保具備必需知識  
3. **依步驟實作** – 一邊學習一邊實作  
4. **完成練習題** – 強化理解與技能  
5. **回顧重點** – 鞏固學習成效  

### 針對性學習

若需特定技能，可聚焦：

- **資料庫整合**：專攻實驗室 04-06  
- **安全機制實作**：著重實驗室 02、08、12  
- **AI／語意搜尋**：深入實驗室 07  
- **生產環境部署**：研讀實驗室 10-12  

### 動手練習

每個實驗室包含：  
- **可運作的程式碼範例** – 複製、修改與實驗  
- **實務案例** – 以零售分析為例的情境問題  
- **逐步難度** – 從簡單至進階建構功能  
- **驗證步驟** – 確認實作成果符合預期  

## 🌟 社群與支援

### 尋求協助

- **Azure AI Discord**： [加入獲取專家支援](https://discord.com/invite/ByRwuEEgH4)  
- **GitHub 倉庫與範例**： [部署範例與資源](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)  
- **MCP 社群**： [參與廣泛 MCP 討論](https://github.com/orgs/modelcontextprotocol/discussions)  

## 🚀 準備好開始了嗎？

從 **[實驗室 00：MCP 資料庫整合介紹](./00-Introduction/README.md)** 啟程

---

*透過此全面且實務導向的學習經驗，成為能建構生產等級 MCP 伺服器並整合資料庫的高手。*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件乃使用人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件以其母語版本為準。對於重要資訊，建議尋求專業人工翻譯。本公司不對因使用此翻譯而造成之任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->