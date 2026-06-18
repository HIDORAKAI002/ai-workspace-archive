# AGENTS.md

## Project Overview

**MCP for Beginners** 是一個開源的教育課程，用於學習模型上下文協議（MCP）——一個標準化的框架，用於 AI 模型與客戶端應用程序之間的互動。本倉庫提供多種程式語言的綜合學習資料和實作範例代碼。

### Key Technologies

- <strong>程式語言</strong>：C#, Java, JavaScript, TypeScript, Python, Rust
- **框架與 SDK**： 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot（Java）
  - FastMCP（Python）
  - LangChain4j（Java）
- <strong>資料庫</strong>：配備 pgvector 擴充的 PostgreSQL
- <strong>雲端平台</strong>：Azure（Container Apps、OpenAI、內容安全、應用程式洞察）
- <strong>建置工具</strong>：npm、Maven、pip、Cargo
- <strong>文件管理</strong>：Markdown 及自動多語言翻譯（超過 48 種語言）

### Architecture

- **11 個核心模組（00-11）**：從基礎到進階的連續學習路徑
- <strong>實作實驗室</strong>：多語言完整解決方案代碼的實作練習
- <strong>範例專案</strong>：運作中的 MCP 伺服器及客戶端實作
- <strong>翻譯系統</strong>：自動化的 GitHub Actions 工作流程支援多語言
- <strong>圖片資源</strong>：集中管理圖片目錄及其翻譯版本

## Setup Commands

此倉庫以文件為主。大部分設置工作於個別範例專案與實驗室中進行。

### Repository Setup

```bash
# 複製儲存庫
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Working with Sample Projects

範例專案位於：
- `03-GettingStarted/samples/` - 依語言區分的範例
- `03-GettingStarted/01-first-server/solution/` - 首個伺服器實作
- `03-GettingStarted/02-client/solution/` - 客戶端實作
- `11-MCPServerHandsOnLabs/` - 全面資料庫整合實驗室

每個範例專案都含有各自的設置說明：

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

- **模組 00-11**：核心課程內容，排序連貫
- **translations/**：語言特定版本（自動建立，不可直接編輯）
- **translated_images/**：本地化圖片版本（自動建立）
- **images/**：原始圖片及圖示

### Making Documentation Changes

1. 僅編輯根模組目錄（00-11）中的英文 Markdown 文件
2. 若需要，更新 `images/` 目錄中的圖片
3. co-op-translator GitHub Action 將自動產生翻譯
4. 推送至 main 分支時會重新生成翻譯

### Working with Translations

- <strong>自動翻譯</strong>：GitHub Actions 工作流程負責所有翻譯
- <strong>切勿手動編輯</strong> `translations/` 目錄中文件
- 翻譯檔中包含翻譯元資料
- 支援超過 48 種語言，包括阿拉伯語、中文、法語、德語、印地語、日語、韓語、葡萄牙語、俄語、西班牙語等

## Testing Instructions

### Documentation Validation

由於此為主要文件倉庫，測試重點為：

1. <strong>連結驗證</strong>：確保所有內部連結正常
```bash
# 檢查損壞的 Markdown 連結
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. <strong>範例代碼驗證</strong>：測試代碼範例可編譯運行
```bash
# 導航到特定示例並執行其測試
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown 格式檢查**：確認格式一致性
```bash
# 如有需要，使用 markdownlint
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Sample Project Testing

各語言範例附帶專屬的測試方法：

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

- 使用清晰、初學者友善的語言
- 包含多語言的程式範例（如適用）
- 遵循 Markdown 最佳實務：
  - 使用 ATX 標題（`#` 語法）
  - 使用帶語言識別的程式碼區塊
  - 為圖片添加描述性替代文字
  - 行寬保持合理（無硬性限制，但需合理）

### Code Sample Style

#### TypeScript/JavaScript
- 使用 ES 模組（`import`/`export`）
- 遵守 TypeScript 嚴格模式慣例
- 包含型別註解
- 目標版本為 ES2022

#### Python
- 遵照 PEP 8 風格指南
- 適當使用型別提示
- 函數與類包含 docstring
- 使用現代 Python 功能（3.8+）

#### Java
- 遵循 Spring Boot 慣例
- 使用 Java 21 功能
- 遵守標準 Maven 專案結構
- 包含 Javadoc 註解

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

本倉庫使用 GitHub Pages 或類似服務來托管文件（如適用）。main 分支的變更會觸發：

1. 翻譯工作流程（`.github/workflows/co-op-translator.yml`）
2. 所有英文 Markdown 文件的自動翻譯
3. 需要時的圖片本地化

### No Build Process Required

此倉庫主要包含 Markdown 文件，核心課程內容不需編譯或建置。

### Sample Project Deployment

個別範例專案可能含有部署說明：
- 請參閱 `03-GettingStarted/09-deployment/` 的 MCP 伺服器部署指南
- `11-MCPServerHandsOnLabs/` 中的 Azure Container Apps 部署範例

## Contributing Guidelines

### Pull Request Process

1. **Fork 並 Clone**：Fork 本倉庫並在本地 clone
2. <strong>建立分支</strong>：使用描述性分支名稱（例如 `fix/typo-module-3`、`add/python-example`）
3. <strong>進行修改</strong>：僅編輯英文 Markdown 文件（勿編輯翻譯檔）
4. <strong>本地測試</strong>：確認 Markdown 正確渲染
5. **提交 PR**：使用清晰的 PR 標題與描述
6. **簽署 CLA**：系統提示時簽署微軟貢獻者許可協議

### PR Title Format

使用清楚描述的標題：
- `[Module XX] 簡短說明` 用於模組相關變更
- `[Samples] 說明` 範例代碼變更
- `[Docs] 說明` 一般文件更新

### What to Contribute

- 文件或代碼樣本中的錯誤修正
- 新增其他語言的代碼範例
- 釐清及改進現有內容
- 新增案例研究或實務範例
- 針對不清楚或錯誤內容的問題回報

### What NOT to Do

- 勿直接修改 `translations/` 目錄檔案
- 勿修改 `translated_images/` 目錄
- 無討論前勿新增大型二進位檔案
- 未協調前勿更改翻譯工作流程文件

## Additional Notes

### Repository Maintenance

- <strong>變更紀錄</strong>：所有重大變更均記錄於 `changelog.md`
- <strong>學習指南</strong>：使用 `study_guide.md` 瀏覽課程路徑總覽
- **Issue 範本**：使用 GitHub 的 Issue 範模板回報錯誤及功能需求
- <strong>行為守則</strong>：所有貢獻者須遵守微軟開源行為守則

### Learning Path

建議依序學習模組（00-11）以達最佳效果：
1. **00-02**：基礎（介紹、核心概念、安全性）
2. **03**：入門實作
3. **04-05**：實務實作與進階主題
4. **06-10**：社群、最佳實務及實際應用
5. **11**：全面資料庫整合實驗室（連續 13 個實驗）

### Support Resources

- <strong>文件</strong>：https://modelcontextprotocol.io/
- <strong>規範</strong>：https://spec.modelcontextprotocol.io/
- <strong>社群</strong>：https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**：Microsoft Foundry Discord 伺服器
- <strong>相關課程</strong>：請參閱 README.md 了解其他微軟學習路徑

### Common Troubleshooting

**Q: 我的 PR 未通過翻譯檢查**
A: 請確認您只編輯了根模組目錄中英文的 Markdown 檔，不是翻譯版本。

**Q: 如何新增語言支援？**
A: 語言支援由 co-op-translator 工作流程管理。請開啟問題進行討論。

**Q: 範例代碼無法正常運作**
A: 請檢查您是否依照該範例的 README 指示完成環境設置，且所需依賴版本正確。

**Q: 圖片無法顯示**
A: 請確認圖片路徑為相對並使用正斜線，圖片應置於 `images/` 或本地化版的 `translated_images/` 目錄。

### Performance Considerations

- 翻譯工作流程可能需數分鐘完成
- 大型圖片提交前請先優化
- 保持單一 Markdown 文件內容聚焦且合理大小
- 使用相對連結以便攜性

### Project Governance

此專案遵循微軟開源慣例：
- 採用 MIT 授權條款（代碼及文件）
- 遵守微軟開源行為守則
- 貢獻須簽署 CLA
- 安全漏洞請依 SECURITY.md 指引處理
- 支援請參閱 SUPPORT.md 資源說明

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->