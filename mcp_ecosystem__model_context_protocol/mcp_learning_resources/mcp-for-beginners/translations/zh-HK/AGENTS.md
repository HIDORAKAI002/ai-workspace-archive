# AGENTS.md

## Project Overview

**MCP for Beginners** 是一個開源教育課程，用於學習模型上下文協議（MCP）——一個 AI 模型與客戶端應用之間互動的標準化框架。本存儲庫提供包含多種程式語言的完整學習資料和實作範例。

### Key Technologies

- <strong>程式語言</strong>：C#, Java, JavaScript, TypeScript, Python, Rust
- **框架與 SDK**：
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot（Java）
  - FastMCP（Python）
  - LangChain4j（Java）
- <strong>資料庫</strong>：PostgreSQL 帶 pgvector 擴展
- <strong>雲端平台</strong>：Azure（容器應用、OpenAI、內容安全、應用程式洞察）
- <strong>建置工具</strong>：npm、Maven、pip、Cargo
- <strong>文件</strong>：Markdown，並具備自動多語言翻譯（超過 48 種語言）

### Architecture

- **11 個核心模組（00-11）**：從基礎到進階的循序漸進學習路徑
- <strong>實作實驗室</strong>：多語言完整解法的實際練習
- <strong>範例專案</strong>：可用的 MCP 伺服器及客戶端實作
- <strong>翻譯系統</strong>：自動 gitHub Actions 工作流程支援多語言
- <strong>圖片資產</strong>：集中管理的圖片目錄與翻譯版圖片

## Setup Commands

本存儲庫以文件為主。大部分設定在各個範例專案與實驗中完成。

### Repository Setup

```bash
# 複製倉庫
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Working with Sample Projects

範例專案位置：
- `03-GettingStarted/samples/` — 依語言分別的範例
- `03-GettingStarted/01-first-server/solution/` — 首個伺服器實作
- `03-GettingStarted/02-client/solution/` — 客戶端實作
- `11-MCPServerHandsOnLabs/` — 完整資料庫整合實驗室

每個範例專案附有其設置說明：

#### TypeScript/JavaScript Projects
```bash
cd <project-directory>
npm install
npm start
```

#### Python Projects
```bash
cd <project-directory>
pip install -r requirements.txt
# 或者
pip install -e .
python main.py
```

#### Java Projects
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Development Workflow

### Documentation Structure

- **模組 00-11**：循序漸進的課程核心內容
- **translations/**：語言版本（自動產生，不可直接編輯）
- **translated_images/**：本地化圖片版本（自動產生）
- **images/**：原始圖片和圖表

### Making Documentation Changes

1. 只編輯英文原始 Markdown 檔（位於模組根目錄 00-11）
2. 如需更新圖片，更新 `images/` 目錄內容
3. co-op-translator GitHub Action 會自動生成翻譯
4. 推送到主分支會重新生成翻譯

### Working with Translations

- <strong>自動翻譯</strong>：透過 GitHub Actions 工作流程管理所有翻譯
- <strong>不可手動修改</strong> `translations/` 目錄內檔案
- 翻譯檔案內嵌元資料
- 支援超過 48 種語言，包括阿拉伯語、中文、法語、德語、印地語、日語、韓語、葡萄牙語、俄語、西班牙語等

## Testing Instructions

### Documentation Validation

因本存儲庫主要為文件，測試重點為：

1. <strong>連結有效性檢查</strong>：確認所有內部連結正確
```bash
# 檢查損壞的 markdown 連結
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. <strong>程式碼範例測試</strong>：確保碼範例可編譯與執行
```bash
# 導航到指定樣本並運行其測試
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown 格式檢查**：格式一致性檢測
```bash
# 如有需要，請使用 markdownlint
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Sample Project Testing

各語言範例皆有其測試方式：

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

## Code Style Guidelines

### Documentation Style

- 使用清晰且適合初學者的語言
- 包含多語言程式碼範例（適用時）
- 遵守 Markdown 最佳實踐：
  - 使用 ATX 標題語法（#）
  - 使用帶語言標記的粗體代碼區塊
  - 圖片含描述性替代文字
  - 行寬合理（無硬性上限，但要合適）

### Code Sample Style

#### TypeScript/JavaScript
- 使用 ES 模組（import/export）
- 遵守 TypeScript 嚴格模式規範
- 含型別註解
- 目標為 ES2022

#### Python
- 遵循 PEP 8 風格指南
- 適當使用型別提示
- 函式與類別附帶 docstring
- 使用現代 Python 功能（3.8+）

#### Java
- 遵循 Spring Boot 慣例
- 使用 Java 21 功能
- 採標準 Maven 專案結構
- 含 Javadoc 註解

### File Organization

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

## Build and Deployment

### Documentation Deployment

本存儲庫文件託管使用 GitHub Pages 或類似平台（如適用）。主分支變更時觸發：

1. 翻譯工作流程（.github/workflows/co-op-translator.yml）
2. 自動翻譯所有英文 Markdown 檔案
3. 必要時執行圖片本地化

### No Build Process Required

本存儲庫主要為 Markdown 文檔，不需編譯或建置步驟。

### Sample Project Deployment

各範例專案可能有部署說明：
- 參見 `03-GettingStarted/09-deployment/` 中 MCP 伺服器部署指引
- Azure 容器應用部署範例在 `11-MCPServerHandsOnLabs/`

## Contributing Guidelines

### Pull Request Process

1. **Fork 並 Clone**：叉出本存儲庫並本地複製
2. <strong>建立分支</strong>：使用具描述性的分支名稱（如 `fix/typo-module-3`、`add/python-example`）
3. <strong>修改內容</strong>：只改英文原始文件（非翻譯檔）
4. <strong>本地測試</strong>：確保 Markdown 正確渲染
5. **提交 PR**：撰寫清晰的 PR 標題與描述
6. **CLA**：按提示簽署 Microsoft 貢獻者授權協議

### PR Title Format

使用明確有描述性的標題：
- `[Module XX] 簡述` 用於模組相關變更
- `[Samples] 描述` 用於範例程式碼變更
- `[Docs] 描述` 用於一般文件更新

### What to Contribute

- 文件或範例程式錯誤修正
- 新增其他語言程式碼範例
- 現有內容的澄清與優化
- 新的實例研究或實務範例
- 不清楚或錯誤內容的問題回報

### What NOT to Do

- 不可直接編輯 `translations/` 目錄內檔案
- 不可編輯 `translated_images/` 目錄內容
- 未經討論不新增大型二進制檔案
- 未協調，不可更動翻譯工作流程檔案

## Additional Notes

### Repository Maintenance

- **Changelog**：所有重要變更記錄在 `changelog.md`
- **Study Guide**：使用 `study_guide.md` 做課程導覽總覽
- **Issue Templates**：使用 GitHub 範本提交錯誤及新功能需求
- **Code of Conduct**：所有貢獻者須遵守 Microsoft 開源行為準則

### Learning Path

建議依序學習模組（00-11）：
1. **00-02**：基礎（介紹、核心概念、安全性）
2. **03**：實作入門
3. **04-05**：實務與進階主題
4. **06-10**：社群、最佳實務、實際應用
5. **11**：完整資料庫整合實驗室（連續 13 個實驗）

### Support Resources

- <strong>文件</strong>：https://modelcontextprotocol.io/
- <strong>規範</strong>：https://spec.modelcontextprotocol.io/
- <strong>社區</strong>：https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**：Microsoft Foundry Discord 伺服器
- <strong>相關課程</strong>：請參考 README.md 中其他 Microsoft 學習路徑

### Common Troubleshooting

**Q: 我的 PR 失敗翻譯檢查**  
A: 確認你只編輯了根目錄模組裡的英文 Markdown，不是翻譯版本。

**Q: 如何新增語言？**  
A: 語言支持由 co-op-translator 工作流程管理。請開 issue 討論新增語言。

**Q: 程式碼範例無法運作**  
A: 請確認依照範例 README 的設定說明操作，並安裝正確版本的依賴。

**Q: 圖片未顯示**  
A: 確認圖片路徑為相對且使用正斜線，圖片須位於 `images/` 或本地化`translated_images/`中。

### Performance Considerations

- 翻譯工作流程可能花數分鐘完成
- 大型圖片應先優化後提交
- 保持單一 Markdown 文件聚焦、大小適中
- 使用相對連結以提升可攜性

### Project Governance

本專案遵循 Microsoft 開源規範：
- 程式碼與文件採用 MIT 授權
- Microsoft 開源行為準則
- 貢獻需簽署 CLA
- 安全議題請遵循 SECURITY.md 指引
- 技術支援與資源見 SUPPORT.md

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->