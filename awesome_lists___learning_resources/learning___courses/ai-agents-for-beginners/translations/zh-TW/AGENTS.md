# AGENTS.md

## 專案概覽

本儲存庫包含「初學者 AI 代理人」— 一個全面且教育性的課程，教導建構 AI 代理人所需的一切。課程共包含18個課程單元（編號00-18），涵蓋基礎知識、設計模式、框架、產品部署、本地/裝置代理人，以及 AI 代理人的安全性。

**主要技術：**
- Python 3.12+
- Jupyter 筆記本互動式學習環境
- AI 框架：Microsoft Agent Framework (MAF)
- Azure AI 服務：Microsoft Foundry，Microsoft Foundry Agent Service V2

**架構：**
- 以課程為基礎的結構 (00-15+ 資料夾)
- 每個課程包含：README 文件、程式碼範例（Jupyter 筆記本）、圖片
- 透過自動翻譯系統支援多語言
- 每課程一個使用 Microsoft Agent Framework 的 Python 筆記本

## 安裝指令

### 前置需求
- Python 3.12 或更高版本
- Azure 訂閱（用於 Microsoft Foundry）
- 已安裝並驗證身份的 Azure CLI (`az login`)

### 初始設定

1. **複製或分支此儲存庫：**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # 或者
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **建立並啟動 Python 虛擬環境：**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # 在 Windows 上：venv\Scripts\activate
   ```

3. **安裝相依套件：**
   ```bash
   pip install -r requirements.txt
   ```

4. **設定環境變數：**
   ```bash
   cp .env.example .env
   # 編輯 .env，填入您的 API 金鑰和端點
   ```

### 必填環境變數

對於 **Microsoft Foundry**（必填）：
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry 專案端點
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - 模型部署名稱（例如 gpt-4.1-mini）

對於 **Azure AI 搜尋**（課程 05 - RAG）：
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI 搜尋端點
- `AZURE_SEARCH_API_KEY` - Azure AI 搜尋 API 金鑰

身份驗證：於執行筆記本前先執行 `az login`（使用 `AzureCliCredential`）。

## 開發工作流程

### 執行 Jupyter 筆記本

每個課程包含多個針對不同框架的 Jupyter 筆記本：

1. **啟動 Jupyter：**
   ```bash
   jupyter notebook
   ```

2. <strong>切換至某課程資料夾</strong>（例如 `01-intro-to-ai-agents/code_samples/`）

3. **開啟並執行筆記本：**
   - `*-python-agent-framework.ipynb` - 使用 Microsoft Agent Framework（Python）
   - `*-dotnet-agent-framework.ipynb` - 使用 Microsoft Agent Framework（.NET）

### 使用 Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry：**
- 需要 Azure 訂閱
- 使用 `FoundryChatClient` 針對 Agent Service V2（代理人可在 Foundry 入口網站檢視）
- 生產等級並內建觀察性
- 檔案格式：`*-python-agent-framework.ipynb`

## 測試指引

此為教育用的儲存庫，內含範例程式碼，而非具自動化測試的生產代碼。為驗證您的設定與修改：

### 手動測試

1. **測試 Python 環境：**
   ```bash
   python --version  # 應該是 3.12 以上
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **測試筆記本執行：**
   ```bash
   # 將筆記本轉換為腳本並執行（測試匯入）
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **驗證環境變數：**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### 執行單一筆記本

在 Jupyter 中開啟筆記本並依序執行各儲存格。每本筆記本為獨立單元，並包含：
- 載入語句
- 設定讀取
- 範例代理人實作
- 預期產出於 markdown 儲存格中

### 部署後代理人的冒煙測試

對於以 Microsoft Foundry 托管代理人部署的課程（01、04、05、16），本儲存庫在 `tests/` 下提供冒煙測試目錄，並由 `.github/workflows/smoke-test.yml` 工作流程透過 [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) 動作執行。這些為輕量的部署後門檻（檢查代理人是否可連接及是否遵循基本提示預期），補足課程 10 與 16 中的評估流程。詳見 [tests/README.md](./tests/README.md) 以了解目錄與課程及代理人之對應。課程 17 為本地使用 Foundry Local 執行，無托管端點，因此透過直接執行其筆記本來驗證。

## 程式碼風格

### Python 規範

- **Python 版本**：3.12+
- <strong>程式碼風格</strong>：遵循標準 Python PEP 8 規範
- <strong>筆記本</strong>：使用清晰的 markdown 儲存格說明概念
- <strong>引用套件</strong>：依標準庫、第三方、本地引用分組

### Jupyter 筆記本慣例

- 在程式碼儲存格前加入說明性的 markdown
- 筆記本中加入輸出範例作參考
- 使用與課程概念相符的清楚變數名稱
- 保持筆記本執行順序線性（儲存格 1 → 2 → 3…）

### 檔案組織

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## 建置與部署

### 文件建置

本儲存庫文件以 Markdown 編寫：
- 每個課程資料夾中的 README.md 檔案
- 儲存庫根目錄的主 README.md
- 透過 GitHub Actions 自動翻譯系統

### CI/CD 流程

位於 `.github/workflows/`：

1. **co-op-translator.yml** - 自動翻譯成50多種語言
2. **welcome-issue.yml** - 歡迎新議題創建者
3. **welcome-pr.yml** - 歡迎新拉取請求貢獻者

### 部署

本儲存庫為教育用途，無部署流程。使用者：
1. Fork 或複製此儲存庫
2. 在本地或 GitHub Codespaces 執行筆記本
3. 透過修改和實驗範例學習

## 拉取請求指引

### 提交前

1. **測試您的修改：**
   - 完整執行受影響的筆記本
   - 確認所有儲存格無錯誤
   - 檢查輸出是否合適

2. **文件更新：**
   - 新增概念時更新 README.md
   - 於筆記本中為複雜程式碼新增註解
   - 確保 markdown 儲存格說明用途

3. **檔案變動：**
   - 避免提交 `.env` 檔案（使用 `.env.example`）
   - 不提交 `venv/` 或 `__pycache__/` 資料夾
   - 展示概念時保留筆記本輸出
   - 移除暫存檔和備份筆記本（`*-backup.ipynb`）

### PR 標題格式

使用具描述性的標題：
- `[Lesson-XX] 新增 <concept> 範例`
- `[Fix] 修正 lesson-XX README 拼字錯誤`
- `[Update] 改進 lesson-XX 代碼範例`
- `[Docs] 更新安裝說明`

### 必要檢查項目

- 筆記本應無錯誤地執行
- README 文件應清晰且準確
- 遵循儲存庫中既有的代碼模式
- 與其他課程保持一致性

## 其他說明

### 常見問題

1. **Python 版本不符：**
   - 確保使用 Python 3.12 以上版本
   - 部分套件在舊版本無法運作
   - 使用 `python3 -m venv` 可明確指定 Python 版本

2. **環境變數：**
   - 永遠從 `.env.example` 建立 `.env`
   - 不要提交 `.env`（此檔位於 `.gitignore`）
   - 使用 `az login` 進行無金鑰 Entra ID 驗證

3. **套件衝突：**
   - 使用全新虛擬環境
   - 從 `requirements.txt` 安裝，避免個別套件單獨安裝
   - 部分筆記本可能需額外套件，請參考其 markdown 輸出

4. **Azure 服務：**
   - 需啟用的 Azure AI 服務訂閱
   - 部分功能與區域相關
   - 確認您的 Azure OpenAI 模型部署支援 Responses API

### 學習路徑

推薦課程進度：
1. **00-course-setup** - 環境設定起點
2. **01-intro-to-ai-agents** - 理解 AI 代理人基礎
3. **02-explore-agentic-frameworks** - 認識不同框架
4. **03-agentic-design-patterns** - 核心設計模式
5. 繼續依序完成後續課程

### 框架選擇

根據您的目標選擇框架：
- <strong>所有課程</strong>：使用 Microsoft Agent Framework (MAF) 與 `FoundryChatClient`
- <strong>代理人伺服器端註冊</strong> 在 Microsoft Foundry Agent Service V2，代理人可於 Foundry 入口網站查看

### 求助管道

- 加入 [Microsoft Foundry 社群 Discord](https://aka.ms/ai-agents/discord)
- 探索課程 README 文件尋求具體指導
- 查看主 [README.md](./README.md) 了解課程全貌
- 參考 [Course Setup](./00-course-setup/README.md) 取得詳細安裝教學

### 貢獻說明

這是一個開放的教育專案，歡迎貢獻：
- 改善程式碼範例
- 修正拼字或錯誤
- 加入澄清註解
- 建議新課題
- 翻譯成更多語言

參見 [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) 了解目前需求。

## 專案特定背景

### 多語言支援

本儲存庫使用自動翻譯系統：
- 支援50多種語言
- 翻譯結果存放於 `/translations/<lang-code>/` 資料夾
- 採用 GitHub Actions 工作流程管理翻譯更新
- 原始文件為存放於儲存庫根目錄的英文版本

### 課程結構

每個課程遵循一致模式：
1. 影片縮圖與連結
2. 課程文件（README.md）
3. 多種框架程式碼範例
4. 學習目標與先備知識
5. 額外學習資源連結

### 代碼範例檔案命名

格式：`<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - 課程 1，MAF Python
- `14-sequential.ipynb` - 課程 14，MAF 進階模式
- `16-python-agent-framework.ipynb` - 課程 16，生產用客戶支援代理人
- `17-local-agent-foundry-local.ipynb` - 課程 17，本地代理人結合 Foundry Local 與 Qwen

### 特殊資料夾

- `translated_images/` - 本地化圖片
- `images/` - 英文原始圖片
- `.devcontainer/` - VS Code 開發容器設定
- `.github/` - GitHub Actions 工作流程與範本

### 相依套件

重要套件來自 `requirements.txt`：
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-to-Agent 通訊協定支援
- `azure-ai-inference`、`azure-ai-projects` - Azure AI 服務
- `azure-identity` - Azure 認證 (AzureCliCredential)
- `azure-search-documents` - Azure AI 搜尋整合
- `mcp[cli]` - 模型上下文協定支援

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->