# AGENTS.md

## 專案概覽

此倉庫包含「初學者 AI 代理人」- 一個全面的教育課程，教導建立 AI 代理人所需的所有知識。課程包含 18 節課程（編號 00-18），涵蓋基礎知識、設計模式、框架、正式部署、本地/設備端代理人及 AI 代理人的安全性。

**關鍵技術：**
- Python 3.12+
- 用於互動學習的 Jupyter 筆記本
- AI 框架：Microsoft Agent Framework (MAF)
- Azure AI 服務：Microsoft Foundry、Microsoft Foundry Agent Service V2

**架構：**
- 以課程為基礎的結構（00-15+ 資料夾）
- 每個課程包含：README 文件、程式碼範例（Jupyter 筆記本），及圖片
- 透過自動翻譯系統支援多語言
- 每節課使用 Microsoft Agent Framework 有一個 Python 筆記本

## 設定指令

### 預備條件
- Python 3.12 或以上版本
- Azure 訂閱（用於 Microsoft Foundry）
- 已安裝並完成驗證的 Azure CLI（`az login`）

### 初始設定

1. **複製或分支此倉庫：**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # 或
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **建立並啟用 Python 虛擬環境：**
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
   # 用你的 API 金鑰和端點編輯 .env
   ```

### 必須的環境變數

用於 **Microsoft Foundry**（必填）：
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry 專案端點
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - 模型部署名稱（例如 gpt-4.1-mini）

用於 **Azure AI 搜尋**（第 05 節課 - RAG）：
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI 搜尋端點
- `AZURE_SEARCH_API_KEY` - Azure AI 搜尋 API 金鑰

驗證：執行筆記本前請先執行 `az login`（使用 `AzureCliCredential`）。

## 開發流程

### 執行 Jupyter 筆記本

每節課包含多個用於不同框架的 Jupyter 筆記本：

1. **啟動 Jupyter：**
   ```bash
   jupyter notebook
   ```

2. <strong>瀏覽至課程資料夾</strong>（例如 `01-intro-to-ai-agents/code_samples/`）

3. **打開並執行筆記本：**
   - `*-python-agent-framework.ipynb` - 使用 Microsoft Agent Framework（Python）
   - `*-dotnet-agent-framework.ipynb` - 使用 Microsoft Agent Framework（.NET）

### 使用 Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry：**
- 需要 Azure 訂閱
- 使用 `FoundryChatClient` 連接 Agent Service V2（代理人在 Foundry 入口網站可見）
- 生產級別並且具備內建觀察功能
- 檔案命名規則：`*-python-agent-framework.ipynb`

## 測試指引

這是教育用倉庫，提供範例程式碼，非具備自動化測試的正式生產代碼。驗證設定和修改方式：

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

### 執行單一筆記本

在 Jupyter 中開啟筆記本並依序執行每個儲存格。每本筆記本自包含如下：
- 匯入語句
- 設定載入
- 範例代理人實作
- 預期輸出在 markdown 儲存格中

### 已部署代理人的快速測試

對於以 Microsoft Foundry 托管的代理人（課程 01、04、05、16），倉庫中提供 `tests/` 下的快速測試目錄，並由 `.github/workflows/smoke-test.yml` 工作流程透過 [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) 動作執行。這些是輕量級的部署後測試（代理人是否可達且符合基本提示預期？），補充第 10 和 16 節課的評估管線。詳見 [tests/README.md](./tests/README.md) 中的目錄與課程及代理人對應。課程 17 在本地與 Foundry Local 執行，無託管端點，因此以直接執行其筆記本作驗證。

## 程式碼風格

### Python 約定

- **Python 版本**：3.12+
- <strong>程式碼風格</strong>：遵循標準 Python PEP 8 約定
- <strong>筆記本</strong>：使用清楚的 markdown 儲存格解說概念
- <strong>匯入陳述</strong>：分類為標準庫、第三方、本地匯入

### Jupyter 筆記本約定

- 在程式碼前加入描述性 markdown 儲存格
- 筆記本內包含輸出範例供參考
- 使用符合課程概念的清楚變數命名
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

### 建置文件

此倉庫使用 Markdown 作為文件格式：
- 各課程資料夾內的 README.md 檔
- 倉庫根目錄的主 README.md
- 透過 GitHub Actions 的自動翻譯系統

### CI/CD 流程

位於 `.github/workflows/`：

1. **co-op-translator.yml** - 自動翻譯超過 50 種語言
2. **welcome-issue.yml** - 歡迎新問題提交者
3. **welcome-pr.yml** - 歡迎新拉取請求貢獻者

### 部署

這是教育用倉庫，沒有部署流程。使用者：
1. 分支或複製此倉庫
2. 在本地或 GitHub Codespaces 執行筆記本
3. 透過修改與實驗範例學習

## 拉取請求指引

### 提交前

1. **測試你的變更：**
   - 完整執行受影響的筆記本
   - 確認所有儲存格無錯誤執行
   - 檢查輸出是否合理

2. **文件更新：**
   - 新增概念時更新 README.md
   - 複雜程式碼加註筆記本內部註解
   - 確保 markdown 儲存格能解說目的

3. **檔案更動：**
   - 避免提交 `.env` 檔 (使用 `.env.example`)
   - 不提交 `venv/` 或 `__pycache__/` 目錄
   - 示範概念的筆記本輸出可以保留
   - 移除臨時檔案和備份筆記本(`*-backup.ipynb`)

### PR 標題格式

使用描述性標題：
- `[Lesson-XX] 新增 <concept> 範例`
- `[Fix] 修正 lesson-XX README 的錯字`
- `[Update] 改進 lesson-XX 範例程式碼`
- `[Docs] 更新設定說明`

### 必要檢查

- 筆記本應能無誤執行
- README 文件需清楚且準確
- 遵循倉庫內既有程式碼風格
- 與其他課程保持一致性

## 附加說明

### 常見問題

1. **Python 版本不符合：**
   - 請確保使用 Python 3.12+ 版本
   - 部分套件在較舊版本可能無法正常工作
   - 使用 `python3 -m venv` 明確指定 Python 版本

2. **環境變數設定：**
   - 請由 `.env.example` 建立 `.env`
   - 不要提交 `.env` 檔（已加入 `.gitignore`）
   - 使用 `az login` 進行無金鑰 Entra ID 登入

3. **套件衝突：**
   - 建議使用乾淨虛擬環境
   - 依 `requirements.txt` 安裝套件，不逐個安裝
   - 部分筆記本在 markdown 中會提及額外需要的套件

4. **Azure 服務：**
   - Azure AI 服務需要有效訂閱
   - 部分功能僅在特定地區可用
   - 請確認 Azure OpenAI 模型部署支援 Responses API

### 學習路徑

建議依序進行課程：
1. **00-course-setup** - 從此設定環境開始
2. **01-intro-to-ai-agents** - 理解 AI 代理人基本概念
3. **02-explore-agentic-frameworks** - 學習不同框架
4. **03-agentic-design-patterns** - 核心設計模式
5. 依序繼續完成後續課程

### 框架選擇

根據目標選擇框架：
- <strong>所有課程</strong>：使用 Microsoft Agent Framework (MAF) 搭配 `FoundryChatClient`
- <strong>代理人伺服器端註冊</strong> 在 Microsoft Foundry Agent Service V2，可於 Foundry 入口網站查看代理人

### 尋求協助

- 加入 [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- 查看各課程 README 文件以取得具體指導
- 查閱主 README.md 以取得課程總覽
- 詳見 [Course Setup](./00-course-setup/README.md) 取得詳細設定說明

### 貢獻

這是開放教育專案，歡迎貢獻：
- 改善範例程式碼
- 修正錯字或錯誤
- 新增註釋以增進理解
- 建議新增課程主題
- 翻譯成更多語言

請參閱 [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) 了解目前需求。

## 專案特定內容

### 多語言支援

此倉庫使用自動翻譯系統：
- 支援超過 50 種語言
- 翻譯存於 `/translations/<lang-code>/` 資料夾
- GitHub Actions 工作流程負責翻譯更新
- 原始英文檔案位於倉庫根目錄

### 課程結構

每個課程遵循一致模式：
1. 影片縮圖及連結
2. 課程書面內容（README.md）
3. 多框架程式碼範例
4. 學習目標與預備知識
5. 連結額外學習資源

### 程式碼範例命名

格式：`<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - 第 1 課，MAF Python
- `14-sequential.ipynb` - 第 14 課，MAF 進階模式
- `16-python-agent-framework.ipynb` - 第 16 課，生產級客服代理人
- `17-local-agent-foundry-local.ipynb` - 第 17 課，本地代理結合 Foundry Local + Qwen

### 特殊資料夾

- `translated_images/` - 翻譯用本地化圖片
- `images/` - 英文原始圖片
- `.devcontainer/` - VS Code 開發容器設定
- `.github/` - GitHub Actions 工作流程及範本

### 依賴套件

`requirements.txt` 中的關鍵套件：
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-to-Agent 協議支援
- `azure-ai-inference`、`azure-ai-projects` - Azure AI 服務
- `azure-identity` - Azure 驗證（AzureCliCredential）
- `azure-search-documents` - Azure AI 搜尋整合
- `mcp[cli]` - 模型上下文協議支援

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->