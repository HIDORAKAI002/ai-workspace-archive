# MCP 資料庫整合簡介

## 🎯 本實驗涵蓋內容

本入門實驗提供建置具有資料庫整合的模型上下文協定（Model Context Protocol，MCP）伺服器的完整概述。您將透過 Zava Retail 零售分析案例（https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail），理解業務需求、技術架構及實際應用。

## 概觀

**模型上下文協定 (MCP)** 使 AI 助理能即時安全地存取並與外部資料來源互動。結合資料庫整合後，MCP 開啟了資料驅動 AI 應用的強大功能。

本學習路徑將教您建置生產級 MCP 伺服器，連接 AI 助理與零售銷售資料庫 PostgreSQL，並實作企業模式如列級安全（Row Level Security）、語意搜尋及多租戶資料存取。

## 學習目標

完成本實驗後，您將能夠：

- <strong>定義</strong> 模型上下文協定及其資料庫整合的核心優勢
- <strong>辨認</strong> 帶資料庫的 MCP 伺服器架構關鍵元件
- <strong>理解</strong> Zava Retail 案例及其業務需求
- <strong>認識</strong> 企業等級安全且可擴充資料存取模式
- <strong>列出</strong> 在本學習路徑中使用的工具與技術

## 🧭 挑戰：AI 與真實世界資料的交會

### 傳統 AI 限制

現代 AI 助理非常強大，但在處理真實商業資料時仍面臨重大限制：

| <strong>挑戰</strong> | <strong>描述</strong> | <strong>商業影響</strong> |
|----------|-----------|--------------|
| <strong>靜態知識</strong> | AI 模型訓練於固定資料集，無法取得即時商業資料 | 資訊過時，錯失商機 |
| <strong>資料孤島</strong> | 資料封閉於資料庫、API 及系統，AI 無法讀取 | 分析不完整，工作流程斷裂 |
| <strong>安全限制</strong> | 直接資料庫存取存在安全與合規疑慮 | 部署受限，需人工資料準備 |
| <strong>複雜查詢</strong> | 商業用戶需技術知識以擷取資料洞見 | 採用率低，流程低效 |

### MCP 解決方案

模型上下文協定透過以下方式克服挑戰：

- <strong>即時資料存取</strong>：AI 助理查詢即時資料庫與 API
- <strong>安全整合</strong>：透過認證及權限控制存取
- <strong>自然語言介面</strong>：商業用戶以簡單英文提問
- <strong>標準協定</strong>：適用多種 AI 平台與工具

## 🏪 認識 Zava Retail：本學習案例 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

在本學習路徑中，我們將建立一個針對 **Zava Retail** 的 MCP 伺服器，該虛構 DIY 零售連鎖擁有多個實體店面。此真實情境展示企業級 MCP 實作。

### 業務背景

**Zava Retail** 經營：
- **8 間實體店**，分佈於華盛頓州（西雅圖、貝爾維尤、塔科馬、斯波坎、埃弗雷特、雷德蒙、柯克蘭）
- **1 間線上商店**，販售電子商務商品
- <strong>多元產品目錄</strong>：工具、五金、園藝用品、建材等
- <strong>多層級管理</strong>：店長、區域經理和高階主管

### 業務需求

店長與高階主管需 AI 驅動分析來：

1. <strong>分析銷售表現</strong>，涵蓋不同門市及時段
2. <strong>追蹤庫存水位</strong>，識別補貨需求
3. <strong>了解顧客行為</strong> 與購買模式
4. <strong>透過語意搜尋</strong> 探索產品洞見
5. <strong>用自然語言查詢生成報告</strong>
6. <strong>角色分級存取</strong> 確保資料安全

### 技術需求

MCP 伺服器需提供：

- <strong>多租戶資料存取</strong>，店長僅見其所屬門市資料
- <strong>彈性查詢</strong>，支援複雜 SQL 操作
- <strong>語意搜尋</strong>，促進產品發掘與推薦
- <strong>即時資料</strong>，反映當前營運狀態
- <strong>安全驗證</strong>，含列級安全機制
- <strong>可擴充架構</strong>，支援多重使用者併發

## 🏗️ MCP 伺服器架構概述

我們的 MCP 伺服器採用分層架構，優化資料庫整合：

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### 主要元件

#### **1. MCP 伺服器層**
- **FastMCP 框架**：現代 Python MCP 伺服器實作
- <strong>工具註冊</strong>：具型別安全的宣告式工具定義
- <strong>請求上下文</strong>：使用者身份與會話管理
- <strong>錯誤處理</strong>：強健的錯誤管理與日誌記錄

#### **2. 資料庫整合層**
- <strong>連線池管理</strong>：高效 asyncpg 連線管理
- <strong>結構提供者</strong>：動態發現資料表結構
- <strong>查詢執行器</strong>：帶 RLS 上下文的安全 SQL 執行
- <strong>交易管理</strong>：具 ACID 特性與回滾處理

#### **3. 安全層**
- <strong>列級安全</strong>：PostgreSQL RLS 支援多租戶資料隔離
- <strong>使用者身份</strong>：店長認證與授權
- <strong>存取控制</strong>：細粒度權限與審計追蹤
- <strong>輸入驗證</strong>：防止 SQL 注入與查詢檢核

#### **4. AI 增強層**
- <strong>語意搜尋</strong>：產品探索用向量嵌入
- **Azure OpenAI 整合**：文字嵌入產生
- <strong>相似度演算法</strong>：pgvector 餘弦相似搜尋
- <strong>搜尋優化</strong>：索引與效能調校

## 🔧 技術棧

### 核心技術

| <strong>元件</strong> | <strong>技術</strong> | <strong>用途</strong> |
|----------|----------|----------|
| **MCP 框架** | FastMCP (Python) | 現代 MCP 伺服器實作 |
| <strong>資料庫</strong> | PostgreSQL 17 + pgvector | 關聯資料與向量搜尋 |
| **AI 服務** | Azure OpenAI | 文字嵌入與語言模型 |
| <strong>容器化</strong> | Docker + Docker Compose | 開發環境 |
| <strong>雲端平台</strong> | Microsoft Azure | 生產部署 |
| **IDE 整合** | VS Code | AI 聊天與開發流程 |

### 開發工具

| <strong>工具</strong> | <strong>用途</strong> |
|----------|----------|
| **asyncpg** | 高效能 PostgreSQL 驅動 |
| **Pydantic** | 資料驗證與序列化 |
| **Azure SDK** | 雲端服務整合 |
| **pytest** | 測試框架 |
| **Docker** | 容器化與部署 |

### 生產環境堆疊

| <strong>服務</strong> | **Azure 資源** | <strong>用途</strong> |
|----------|----------------|----------|
| <strong>資料庫</strong> | Azure Database for PostgreSQL | 托管資料庫服務 |
| <strong>容器</strong> | Azure Container Apps | 無伺服器容器託管 |
| **AI 服務** | Microsoft Foundry | OpenAI 模型與端點 |
| <strong>監控</strong> | Application Insights | 可觀察性與診斷 |
| <strong>安全</strong> | Azure Key Vault | 機密與設定管理 |

## 🎬 真實世界使用場景

來看看不同使用者如何與 MCP 伺服器互動：

### 場景 1：店長銷售績效檢視

<strong>使用者</strong>：Sarah，西雅圖店長  
<strong>目標</strong>：分析 2024 年第 4 季的銷售績效

<strong>自然語言查詢</strong>：
> 「顯示我店鋪在 2024 第四季營收排名前 10 的產品」

<strong>流程</strong>：
1. VS Code AI Chat 將查詢送至 MCP 伺服器
2. MCP 伺服器辨識 Sarah 的店鋪上下文（西雅圖）
3. RLS 政策過濾為僅西雅圖門市資料
4. 產生並執行 SQL 查詢
5. 格式化結果回傳給 AI 聊天
6. AI 提供分析與見解

### 場景 2：產品發掘語意搜尋

<strong>使用者</strong>：Mike，庫存經理  
<strong>目標</strong>：尋找客戶要求相似之產品

<strong>自然語言查詢</strong>：
> 「我們有什麼產品類似『適用戶外的防水電源接頭』？」

<strong>流程</strong>：
1. 透過語意搜尋工具處理查詢
2. Azure OpenAI 產生文字向量嵌入
3. pgvector 執行相似度搜尋
4. 依關聯性排序相關產品
5. 結果含產品詳細資訊及庫存狀況
6. AI 建議替代品與組合銷售方案

### 場景 3：跨店鋪分析

<strong>使用者</strong>：Jennifer，區域經理  
<strong>目標</strong>：比較所有門市過去六個月銷售表現

<strong>自然語言查詢</strong>：
> 「比較過去六個月所有店鋪按品類的銷售情況」

<strong>流程</strong>：
1. 設定區域經理的 RLS 上下文權限
2. 產生跨多店複雜查詢
3. 統整各店銷售數據
4. 結果呈現趨勢與比較
5. AI 識別洞見與建議

## 🔒 安全與多租戶深度探討

我們的實作重視企業級安全：

### 列級安全 (RLS)

PostgreSQL RLS 確保資料隔離：

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### 使用者身份管理

每個 MCP 連線包含：
- **店長 ID**：RLS 上下文的唯一識別碼
- <strong>角色分配</strong>：權限與存取層級
- <strong>會話管理</strong>：安全認證憑證
- <strong>稽核日誌</strong>：完整存取紀錄

### 資料保護

多層安全機制：
- <strong>連線加密</strong>：資料庫連線全程 TLS 加密
- **SQL 注入防護**：僅使用參數化查詢
- <strong>輸入驗證</strong>：完整請求檢核
- <strong>錯誤處理</strong>：錯誤訊息不洩露敏感資料

## 🎯 重點摘要

完成本介紹後，您將了解：

✅ **MCP 價值主張**：MCP 如何連結 AI 助理與現實資料  
✅ <strong>業務背景</strong>：Zava Retail 的需求與挑戰  
✅ <strong>架構概述</strong>：主要元件與彼此的互動  
✅ <strong>技術棧</strong>：所用工具與框架  
✅ <strong>安全模型</strong>：多租戶資料存取與保護  
✅ <strong>使用範例</strong>：真實查詢場景與流程  

## 🚀 接下來

準備深入學習？繼續閱讀：

**[實驗 01：核心架構概念](../01-Architecture/README.md)**

學習 MCP 伺服器架構模式、資料庫設計原則及驅動零售分析解決方案的詳細技術實作。

## 📚 附加資源

### MCP 文件
- [MCP 規範](https://modelcontextprotocol.io/docs/) - 官方協定文件
- [MCP 初學者指南](https://aka.ms/mcp-for-beginners) - 全面學習資源
- [FastMCP 文件](https://github.com/modelcontextprotocol/python-sdk) - Python SDK 文件

### 資料庫整合
- [PostgreSQL 文件](https://www.postgresql.org/docs/) - 詳盡 PostgreSQL 參考資料
- [pgvector 指南](https://github.com/pgvector/pgvector) - 向量擴充套件說明
- [列級安全](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS 指南

### Azure 服務
- [Azure OpenAI 文件](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI 服務整合
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - 托管資料庫服務
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - 無伺服器容器

---

<strong>免責聲明</strong>：本練習使用虛構零售資料。實際在生產環境實作類似解決方案時，請務必遵循組織的資料治理與安全策略。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->