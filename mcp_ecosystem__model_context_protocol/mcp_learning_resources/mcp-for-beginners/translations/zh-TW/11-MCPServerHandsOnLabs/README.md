# 🚀 MCP 伺服器與 PostgreSQL - 完整學習指南

## 🧠 MCP 資料庫整合學習路線概覽

本完整學習指南將教您如何透過實務的零售分析實作，打造具備資料庫整合能力的生產等級 **Model Context Protocol (MCP)** 伺服器。您將學習企業級設計模式，包括 **列級安全 (RLS)**、**語意搜尋**、**Azure AI 整合**與**多租戶資料存取**。

無論您是後端開發人員、AI 工程師或資料架構師，本指南皆提供結構化學習、具體實務範例及操作練習，帶您逐步瞭解以下 MCP 伺服器範例 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail。

## 🔗 官方 MCP 資源

- 📘 [MCP 文件](https://modelcontextprotocol.io/) – 詳細教學及使用者指南  
- 📜 [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – 協定架構與技術參考  
- 🧑‍💻 [MCP GitHub 儲存庫](https://github.com/modelcontextprotocol) – 開源 SDK、工具及程式碼範例  
- 🌐 [MCP 社群](https://github.com/orgs/modelcontextprotocol/discussions) – 加入討論並貢獻社群  
- 🔒 [OWASP MCP 十大安全風險](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – 安全最佳實踐與風險緩解方案  

## 🧭 MCP 資料庫整合學習路線

### 📚 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail 的完整學習結構

| Lab | 主題 | 說明 | 連結 |
|--------|-------|-------------|------|
| **Lab 1-3：基礎篇** | | | |
| 00 | [MCP 資料庫整合介紹](./00-Introduction/README.md) | MCP 與資料庫整合概覽及零售分析案例 | [開始學習](./00-Introduction/README.md) |
| 01 | [核心架構概念](./01-Architecture/README.md) | MCP 伺服器架構、資料庫層與安全模式理解 | [學習](./01-Architecture/README.md) |
| 02 | [安全與多租戶](./02-Security/README.md) | 列級安全、多租戶資料存取與身份驗證 | [學習](./02-Security/README.md) |
| 03 | [環境設定](./03-Setup/README.md) | 開發環境設定、Docker、Azure 資源配置 | [設定](./03-Setup/README.md) |
| **Lab 4-6：MCP 伺服器建置** | | | |
| 04 | [資料庫設計與架構](./04-Database/README.md) | PostgreSQL 設定、零售資料庫架構設計與範例資料 | [建置](./04-Database/README.md) |
| 05 | [MCP 伺服器實作](./05-MCP-Server/README.md) | 使用資料庫整合建立 FastMCP 伺服器 | [建置](./05-MCP-Server/README.md) |
| 06 | [工具開發](./06-Tools/README.md) | 建立資料庫查詢工具與架構檢視 | [建置](./06-Tools/README.md) |
| **Lab 7-9：進階功能** | | | |
| 07 | [語意搜尋整合](./07-Semantic-Search/README.md) | 使用 Azure OpenAI 與 pgvector 實作向量嵌入 | [進階](./07-Semantic-Search/README.md) |
| 08 | [測試與除錯](./08-Testing/README.md) | 測試策略、除錯工具與驗證方式 | [測試](./08-Testing/README.md) |
| 09 | [VS Code 整合](./09-VS-Code/README.md) | VS Code MCP 整合及 AI 聊天功能設定 | [整合](./09-VS-Code/README.md) |
| **Lab 10-12：生產與最佳實踐** | | | |
| 10 | [部署策略](./10-Deployment/README.md) | Docker 部署、Azure Container Apps 及擴充考量 | [部署](./10-Deployment/README.md) |
| 11 | [監控與可觀察性](./11-Monitoring/README.md) | Application Insights、日誌管理、效能監控 | [監控](./11-Monitoring/README.md) |
| 12 | [最佳實踐與優化](./12-Best-Practices/README.md) | 效能優化、安全強化及生產環境建議 | [優化](./12-Best-Practices/README.md) |

### 💻 您將打造的系統

完成此學習路線後，您將建立完整的 **Zava 零售分析 MCP 伺服器**，包含：

- **多表零售資料庫**，囊括客戶訂單、產品及庫存資料  
- **列級安全**，確保店鋪資料隔離存取  
- **語意產品搜尋**，利用 Azure OpenAI 向量嵌入技術  
- **VS Code AI 聊天室整合**，支援自然語言查詢  
- **生產就緒部署**，使用 Docker 與 Azure  
- **全方位監控**，整合 Application Insights  

## 🎯 學習前置需求

為充分發揮本路線的學習效益，您應具備：

- **程式設計經驗**：熟悉 Python（首選）或類似語言  
- **資料庫知識**：基礎 SQL 與關聯式資料庫理解  
- **API 概念**：熟悉 REST API 與 HTTP 基礎  
- **開發工具**：操作命令列、Git 和程式編輯器經驗  
- **雲端基礎**：（選修）Azure 或類似雲端平台基礎知識  
- **Docker 認識**：（選修）容器化概念理解  

### 必備工具

- **Docker Desktop** - 用於執行 PostgreSQL 與 MCP 伺服器  
- **Azure CLI** - 用於部署雲端資源  
- **VS Code** - 開發與 MCP 整合使用  
- **Git** - 版本控制  
- **Python 3.8+** - MCP 伺服器開發  

## 📚 學習指南與資源

本學習路線包含豐富資源，協助您有效學習：

### 學習指南

每個實驗包含：
- **明確學習目標** - 您將達成什麼  
- **逐步指引** - 詳細實作說明  
- **程式碼範例** - 含說明的運作範例  
- **練習題** - 實務操作機會  
- **故障排除指導** - 常見問題與解決方法  
- **額外資源** - 延伸閱讀內容  

### 前置條件檢查

每個實驗開始前提供：
- **所需知識** - 您應具備的背景  
- **環境驗證** - 如何確保環境設定無誤  
- **時間估計** - 預期完成與投入時間  
- **學習成果** - 完成後的典型收穫  

### 建議學習路線

根據經驗選擇適合您的路線：

#### 🟢 **初學者路線**（新手 MCP）
1. 先完成 [MCP for Beginners](https://aka.ms/mcp-for-beginners) 的 0-10 單元  
2. 完成 Lab 00-03 強化基礎  
3. 跟隨 Lab 04-06 進行實作  
4. 嘗試 Lab 07-09 實際運用  

#### 🟡 **中階路線**（有 MCP 基礎）
1. 複習 Lab 00-01 聚焦資料庫概念  
2. 聚焦 Lab 02-06 進行開發  
3. 深入 Lab 07-12 探索進階功能  

#### 🔴 **進階路線**（MCP 高手）
1. 略讀 Lab 00-03 理解背景  
2. 聚焦 Lab 04-09 完成資料庫整合  
3. 專注 Lab 10-12 進行生產環境部署  

## 🛠️ 如何有效使用本學習路線

### 循序漸進學習（推薦）

依序操作實驗以獲得完整理解：

1. **閱讀概覽** - 了解學習目標  
2. **檢查前置條件** - 確保具備所需知識  
3. **跟隨逐步指導** - 實作並學習  
4. **完成練習題** - 鞏固所學  
5. **回顧重點** - 強化學習成果  

### 針對性學習

若鎖定特定技能：

- **資料庫整合**：專注 Lab 04-06  
- **安全實作**：主攻 Lab 02、08、12  
- **AI／語意搜尋**：深入 Lab 07  
- **生產部署**：研讀 Lab 10-12  

### 實務操作

每個實驗皆包含：
- **可運作的程式碼範例** - 複製、修改與實驗  
- **實際場景案例** - 具體零售分析應用  
- **漸進式難度** - 從簡單到進階建置  
- **驗證步驟** - 確認實作正確性  

## 🌟 社群與支援

### 尋求幫助

- **Azure AI Discord**：[加入專家支援](https://discord.com/invite/ByRwuEEgH4)  
- **GitHub 儲存庫與實作範例**：[部署範例與資源](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)  
- **MCP 社群**：[參與更廣泛的 MCP 討論](https://github.com/orgs/modelcontextprotocol/discussions)  

## 🚀 準備開始了嗎？

從 **[Lab 00：MCP 資料庫整合介紹](./00-Introduction/README.md)** 開始您的旅程  

---

*透過這個實務導向的完整學習體驗，掌握打造具資料庫整合能力的生產就緒 MCP 伺服器的技巧。*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保準確性，但請注意，機器翻譯可能包含錯誤或不準確之處。文件原文（母語版本）應視為權威版本。對於重要資訊，建議聘請專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤譯負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->