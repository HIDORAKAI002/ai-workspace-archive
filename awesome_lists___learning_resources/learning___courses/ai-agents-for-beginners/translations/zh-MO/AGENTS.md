# AGENTS.md

## 專案概覽

此儲存庫包含「初學者 AI 代理人」— 一個全面的教育課程，教授構建 AI 代理人所需的一切。課程包括 18 課（編號 00-18），涵蓋基礎知識、設計模式、框架、正式部署、本地/裝置代理人及 AI 代理人的安全。

**主要技術：**
- Python 3.12+
- 用於互動學習的 Jupyter 筆記本
- AI 框架：Microsoft Agent Framework (MAF)
- Azure AI 服務：Microsoft Foundry、Microsoft Foundry Agent Service V2

**架構：**
- 基於課程結構（00-15+ 目錄）
- 每課包含：README 文件、程式碼範例（Jupyter 筆記本）和圖片
- 通過自動翻譯系統支援多語言
- 每課一個使用 Microsoft Agent Framework 的 Python 筆記本

## 安裝指令

### 前置條件
- Python 3.12 或更高版本
- Azure 訂閱（用於 Microsoft Foundry）
- 安裝並登入 Azure CLI（`az login`）

### 初始設定

1. **克隆或分岔此儲存庫：**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # 或者
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **建立並啟用 Python 虛擬環境：**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # 在 Windows 上：venv\Scripts\activate
   ```

3. **安裝依賴項：**
   ```bash
   pip install -r requirements.txt
   ```

4. **設定環境變數：**
   ```bash
   cp .env.example .env
   # 編輯 .env，填入你的 API 金鑰及端點
   ```

### 必須的環境變數

對於 **Microsoft Foundry**（必需）：
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry 專案端點
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - 模型部署名稱（例如 gpt-4.1-mini）

對於 **Azure AI 搜尋**（課程 05 - RAG）：
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI 搜尋端點
- `AZURE_SEARCH_API_KEY` - Azure AI 搜尋 API 金鑰

認證：執行筆記本前請先執行 `az login`（使用 `AzureCliCredential`）。

## 開發流程

### 運行 Jupyter 筆記本

每課包含多個用於不同框架的 Jupyter 筆記本：

1. **啟動 Jupyter：**
   ```bash
   jupyter notebook
   ```

2. <strong>進入課程目錄</strong>（例如 `01-intro-to-ai-agents/code_samples/`）

3. **開啟並運行筆記本：**
   - `*-python-agent-framework.ipynb` - 使用 Microsoft Agent Framework（Python）
   - `*-dotnet-agent-framework.ipynb` - 使用 Microsoft Agent Framework（.NET）

### 使用 Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry：**
- 需要 Azure 訂閱
- 使用 `FoundryChatClient` 連接 Agent Service V2（代理人在 Foundry 入口網站可見）
- 具備生產級與內建可觀察性
- 檔案範本：`*-python-agent-framework.ipynb`

## 測試說明

這是一個教育儲存庫，包含示範程式碼而非帶自動化測試的正式程式碼。驗證設定與變更方式：

### 手動測試

1. **測試 Python 環境：**
   ```bash
   python --version  # 應該係 3.12 或以上
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **測試筆記本執行：**
   ```bash
   # 將筆記本轉換為腳本並執行（測試導入）
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **驗證環境變數：**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### 運行單個筆記本

在 Jupyter 中打開筆記本並依序執行每個程式碼區塊。每本筆記本為獨立完整，包含：
- 匯入語句
- 設定載入
- 範例代理人實作
- 預期輸出顯示於 markdown 區塊

### 部署代理人冒煙測試

對於以 Microsoft Foundry 托管部署的代理人課程（01、04、05、16），儲存庫在 `tests/` 下包含冒煙測試目錄，由 `.github/workflows/smoke-test.yml` 工作流程通過 [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) 動作執行。這些為輕量化的部署後防護（代理人是否可連接並符合基本提示期待？），補充第 10 和 16 課的評估流程。詳情請參閱 [tests/README.md](./tests/README.md) 了解目錄至課程與代理人的對應關係。第 17 課使用 Foundry Local 在本地運行，無託管端點，故直接執行其筆記本進行驗證。

## 程式碼風格

### Python 規範

- **Python 版本**：3.12+
- <strong>程式碼風格</strong>：遵循標準 Python PEP 8 規範
- <strong>筆記本</strong>：使用清晰的 markdown 區塊說明概念
- <strong>匯入</strong>：分組標準函式庫、第三方、本地匯入

### Jupyter 筆記本規範

- 代碼區塊前加入具描述性的 markdown 區塊
- 筆記本內提供輸出範例供參考
- 使用與課程概念相符的清晰變量名稱
- 保持筆記本執行順序線性（區塊 1 → 2 → 3...）

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

### 建置文件

此儲存庫使用 Markdown 作為文件格式：
- 每課程資料夾內的 README.md 文件
- 儲存庫根目錄的主要 README.md
- 透過 GitHub Actions 自動翻譯系統

### CI/CD 流程

位於 `.github/workflows/`：

1. **co-op-translator.yml** - 自動翻譯成 50 多種語言
2. **welcome-issue.yml** - 歡迎新議題建立者
3. **welcome-pr.yml** - 歡迎新的拉取請求貢獻者

### 部署

這是一個教育儲存庫—沒有部署程序。使用者：
1. 分岔或克隆儲存庫
2. 在本地或 GitHub Codespaces 運行筆記本
3. 透過修改和實驗範例學習

## 拉取請求指南

### 提交前

1. **測試您的變更：**
   - 完整執行受影響的筆記本
   - 確認所有區塊無錯誤執行
   - 檢查輸出是否適當

2. **文件更新：**
   - 新增概念時更新 README.md
   - 筆記本中複雜程式碼添加註解
   - 確定 markdown 區塊說明用途

3. **檔案更動：**
   - 避免提交 `.env` 文件（改用 `.env.example`）
   - 不提交 `venv/` 或 `__pycache__/` 目錄
   - 保留顯示概念的筆記本輸出
   - 移除臨時檔案與備份筆記本（`*-backup.ipynb`）

### PR 標題格式

使用具描述性的標題：
- `[Lesson-XX] 新增 <概念> 範例`
- `[Fix] 修正 lesson-XX README 打字錯誤`
- `[Update] 改進 lesson-XX 程式碼範例`
- `[Docs] 更新安裝說明`

### 必需檢查

- 筆記本應無錯誤執行
- README 文件需清楚且準確
- 遵循儲存庫現有程式碼模式
- 與其他課程保持一致性

## 其他說明

### 常見陷阱

1. **Python 版本不符：**
   - 確保使用 Python 3.12 以上
   - 部分套件可能不支援較舊版本
   - 使用 `python3 -m venv` 明確指定 Python 版本

2. **環境變數：**
   - 一定要從 `.env.example` 建立 `.env`
   - 不提交 `.env` 文件（已忽略）
   - 使用 `az login` 登入以無需金鑰方式驗證 Entra ID

3. **套件衝突：**
   - 使用全新虛擬環境
   - 從 `requirements.txt` 安裝，不要個別安裝套件
   - 部分筆記本可能需額外套件，詳見 markdown 區塊中說明

4. **Azure 服務：**
   - 需有效 Azure 訂閱才能使用 Azure AI 服務
   - 部分功能有區域限制
   - 確認 Azure OpenAI 模型部署支援 Responses API

### 學習路線

推薦依序學習課程：
1. **00-course-setup** - 從這裡開始完成環境設定
2. **01-intro-to-ai-agents** - 理解 AI 代理人基礎
3. **02-explore-agentic-frameworks** - 了解不同代理框架
4. **03-agentic-design-patterns** - 核心設計模式
5. 依編號逐課持續進行

### 框架選擇

根據目標選擇框架：
- <strong>所有課程</strong>：使用 Microsoft Agent Framework (MAF) 搭配 `FoundryChatClient`
- <strong>代理人伺服器端註冊</strong>於 Microsoft Foundry Agent Service V2，代理人可於 Foundry 入口顯示

### 尋求協助

- 加入 [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- 查閱課程 README 文件取得具體指引
- 瀏覽主 README.md 取得課程總覽
- 參考 [Course Setup](./00-course-setup/README.md) 取得詳細設定步驟

### 貢獻

這是一個開放教育專案，歡迎貢獻：
- 改進程式碼範例
- 修正錯字或錯誤
- 添加說明註解
- 建議新課程主題
- 翻譯至其他語言

請參考 [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) 瞭解當前需求。

## 專案特殊脈絡

### 多語言支持

此儲存庫採用自動翻譯系統：
- 支援超過 50 種語言
- 翻譯結果存放於 `/translations/<lang-code>/` 目錄
- 透過 GitHub Actions 工作流程處理翻譯更新
- 原始檔為英語，置於儲存庫根目錄

### 課程結構

每課採用一致模式：
1. 影片縮圖及連結
2. 書面課程內容（README.md）
3. 多框架程式碼範例
4. 學習目標與前置條件
5. 附加學習資源連結

### 程式碼範例命名

格式：`<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - 第 1 課，MAF Python
- `14-sequential.ipynb` - 第 14 課，MAF 進階模式
- `16-python-agent-framework.ipynb` - 第 16 課，正式上線客服代理人
- `17-local-agent-foundry-local.ipynb` - 第 17 課，Foundry Local + Qwen 本地代理人

### 特殊目錄

- `translated_images/` - 本地化圖片
- `images/` - 英語原始圖片
- `.devcontainer/` - VS Code 開發容器設定
- `.github/` - GitHub Actions 工作流程及模板

### 依賴套件

`requirements.txt` 主要套件：
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-to-Agent 通訊協定支援
- `azure-ai-inference`、`azure-ai-projects` - Azure AI 服務
- `azure-identity` - Azure 認證（AzureCliCredential）
- `azure-search-documents` - Azure AI 搜尋整合
- `mcp[cli]` - 模型上下文協定支援

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->