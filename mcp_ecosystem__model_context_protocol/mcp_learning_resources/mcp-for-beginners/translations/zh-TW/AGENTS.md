# AGENTS.md

## 專案概覽

**MCP for Beginners** 是一個開放原始碼的教育課程，用於學習 Model Context Protocol (MCP) —— 一個標準化的 AI 模型與客戶端應用程式間互動框架。本倉庫提供全面的學習資源，包含多種程式語言的實作範例。

### 主要技術

- <strong>程式語言</strong>：C#、Java、JavaScript、TypeScript、Python、Rust
- **框架與 SDK**： 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- <strong>資料庫</strong>：PostgreSQL 搭配 pgvector 擴充
- <strong>雲端平台</strong>：Azure（容器應用、OpenAI、內容安全、應用洞察）
- <strong>建置工具</strong>：npm、Maven、pip、Cargo
- <strong>文件</strong>：Markdown 支援自動多語言翻譯（超過 48 種語言）

### 架構

- **11 個核心模組 (00-11)**：由基礎到進階的循序漸進學習路線
- <strong>實作實驗</strong>：多語言完整解答的實務練習
- <strong>範例專案</strong>：可運作的 MCP 伺服器與客戶端實作
- <strong>翻譯系統</strong>：自動化 GitHub Actions 工作流程支援多語言
- <strong>圖像資源</strong>：集中管理圖像目錄並提供翻譯版本

## 設定指令

此為以文件為主的倉庫，大多數設定都在各範例專案與實驗中進行。

### 倉庫設定

```bash
# 複製儲存庫
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### 使用範例專案

範例專案位置：
- `03-GettingStarted/samples/` - 依程式語言分類範例
- `03-GettingStarted/01-first-server/solution/` - 第一個伺服器實作
- `03-GettingStarted/02-client/solution/` - 客戶端實作
- `11-MCPServerHandsOnLabs/` - 完整的資料庫整合實驗

每個範例專案都包含自己的設定指示：

#### TypeScript/JavaScript 專案
```bash
cd <project-directory>
npm install
npm start
```

#### Python 專案
```bash
cd <project-directory>
pip install -r requirements.txt
# 或者
pip install -e .
python main.py
```

#### Java 專案
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## 開發工作流程

### 文件結構

- **模組 00-11**：核心課程內容，循序排列
- **translations/**：語言版本（自動產生，請勿直接編輯）
- **translated_images/**：本地化圖像版本（自動產生）
- **images/**：原始圖像與示意圖

### 修改文件流程

1. 僅修改根模組資料夾（00-11）中的英文 markdown 檔案
2. 需要時更新 `images/` 目錄中的圖像
3. co-op-translator GitHub Action 會自動生成翻譯
4. 推送至 main 分支時自動重新生成翻譯

### 使用翻譯

- <strong>自動翻譯</strong>：GitHub Actions 工作流程負責所有翻譯工作
- <strong>請勿手動修改</strong> `translations/` 目錄中的檔案
- 翻譯元資料含於每個翻譯檔案中
- 支援語言超過 48 種，包括阿拉伯文、中文、法文、德文、印地文、日文、韓文、葡萄牙文、俄文、西班牙文等

## 測試說明

### 文件驗證

主要為文件倉庫，測試重點在：

1. <strong>連結驗證</strong>：確保所有內部連結有效
```bash
# 檢查損壞的 Markdown 連結
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. <strong>程式範例驗證</strong>：確認範例程式可編譯/執行
```bash
# 導航到特定範例並執行其測試
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown 格式檢查**：確保格式一致性
```bash
# 如有需要，請使用 markdownlint
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### 範例專案測試

各語言範例包含以下測試方式：

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## 程式碼風格指南

### 文件風格

- 使用清晰且適合初學者理解的語言
- 適用時包含多語言程式碼範例
- 遵守 markdown 最佳實踐：
  - 使用 ATX 風格標題 (`#` 語法)
  - 使用帶語言標記的括欄程式碼區塊
  - 圖像附帶描述性替代文字
  - 行長適中（無硬性限制，但保持合理）

### 程式碼範例風格

#### TypeScript/JavaScript
- 使用 ES 模組 (`import`/`export`)
- 遵循 TypeScript 嚴格模式慣例
- 包含型別註解
- 目標版本 ES2022

#### Python
- 遵循 PEP 8 風格指南
- 適用時使用型別提示
- 函式與類別包含 docstring
- 使用現代 Python 功能（3.8 以上）

#### Java
- 遵循 Spring Boot 慣例
- 使用 Java 21 功能
- 遵循標準 Maven 專案結構
- 包含 Javadoc 註解

### 檔案組織

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## 建置與部署

### 文件部署

倉庫使用 GitHub Pages 或類似服務進行文件托管（如適用）。main 分支變更會觸發：

1. 翻譯工作流程（`.github/workflows/co-op-translator.yml`）
2. 對所有英文 markdown 檔案的自動翻譯
3. 需要時的圖像本地化

### 無需建置流程

此倉庫主要為 markdown 文件，核心課程無需編譯或建置步驟。

### 範例專案部署

個別範例專案可能包含部署指示：
- `03-GettingStarted/09-deployment/` 包含 MCP 伺服器部署指導
- `11-MCPServerHandsOnLabs/` 提供 Azure 容器應用部署範例

## 貢獻指南

### Pull Request 流程

1. **Fork 並 Clone**：Fork 倉庫並在本機 Clone
2. <strong>建立分支</strong>：使用具描述性的分支名稱（例如 `fix/typo-module-3`、`add/python-example`）
3. <strong>進行修改</strong>：僅編輯英文 markdown 檔（非翻譯版本）
4. <strong>本機測試</strong>：確認 markdown 正確呈現
5. **提交 PR**：使用清晰的 PR 標題與說明
6. **簽署 CLA**：當系統提示時簽署微軟貢獻者授權協議

### PR 標題格式

使用清楚且描述性的標題：
- `[Module XX] 簡短描述` 用於模組相關改動
- `[Samples] 描述` 用於範例程式碼改動
- `[Docs] 描述` 用於一般文件更新

### 可貢獻內容

- 文件或程式碼範例錯誤修正
- 新增其他語言的程式碼範例
- 現有內容的說明與改進
- 新增案例研究或實務範例
- 發現或報告不清楚或錯誤內容

### 不可為之

- 請勿直接編輯 `translations/` 目錄中的檔案
- 請勿編輯 `translated_images/` 目錄
- 未經討論勿新增大型二進位檔案
- 未經協調勿變更翻譯工作流程文件

## 附加說明

### 倉庫維護

- <strong>更新日誌</strong>：所有重要變更記錄於 `changelog.md`
- <strong>學習指南</strong>：使用 `study_guide.md` 瀏覽課程架構
- <strong>議題範本</strong>：使用 GitHub 議題範本回報錯誤或建議
- <strong>行為準則</strong>：所有貢獻者皆須遵守微軟開源行為準則

### 學習路徑

依序遵循 00-11 模組以達最佳學習效果：
1. **00-02**：基礎（介紹、核心概念、安全）
2. **03**：起步與實作
3. **04-05**：實務與進階主題
4. **06-10**：社群、最佳實踐與實際應用
5. **11**：完整資料庫整合實驗（13 個循序實驗）

### 支援資源

- <strong>文件</strong>：https://modelcontextprotocol.io/
- <strong>規範</strong>：https://spec.modelcontextprotocol.io/
- <strong>社群</strong>：https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**：Microsoft Foundry Discord 伺服器
- <strong>相關課程</strong>：請見 README.md 其他微軟學習路徑

### 常見問題排除

**Q: 我的 PR 無法通過翻譯檢查**  
A: 請確認只修改了根模組資料夾內的英文 markdown 檔案，未修改翻譯版本。

**Q: 如何新增語言支援？**  
A: 語言管理由 co-op-translator 工作流程處理。請開啟議題討論新增語言。

**Q: 程式範例無法正常運作**  
A: 確認已依照該範例 README 的設定指示操作，並檢查相依套件版本是否正確。

**Q: 圖像未顯示**  
A: 確認圖像路徑為相對路徑且使用正斜線，圖像應放在 `images/` 或 `translated_images/`（本地化版本）。

### 效能考量

- 翻譯工作流程執行可能需數分鐘
- 大型圖像請事先優化再提交
- 保持單一 markdown 文件專注且適中
- 使用相對連結增強可攜性

### 專案管理規範

本專案遵守微軟開源慣例：  
- 程式碼和文件使用 MIT 授權  
- 微軟開源行為準則  
- 貢獻需簽署 CLA  
- 安全議題依 SECURITY.md 指南處理  
- 支援資源請見 SUPPORT.md

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->