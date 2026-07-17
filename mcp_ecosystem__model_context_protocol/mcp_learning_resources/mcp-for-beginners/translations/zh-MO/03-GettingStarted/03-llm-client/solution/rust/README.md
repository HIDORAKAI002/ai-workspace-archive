# 運行此範例

這是 LLM 客戶端範例的 Rust 解決方案。你需要安裝 Rust 工具鏈；詳見[官方安裝指南](https://www.rust-lang.org/tools/install)。

該客戶端通過 GitHub Models 推論端點（`https://models.github.ai/inference/chat`）呼叫模型，並從 `OPENAI_API_KEY` 環境變數讀取你的 GitHub 個人訪問令牌 (PAT)。

> [!NOTE]
> 本儲存庫中的其他解決方案使用 `GITHUB_TOKEN`。對於 Rust，將 `OPENAI_API_KEY` 設成相同值，以匹配 OpenAI 客戶端配置。

## -0- 設置你的 GitHub 令牌

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- 建立範例

```bash
cargo build
```

## -2- 執行範例

```bash
cargo run
```

客戶端啟動計算器 MCP 伺服器，擷取其工具清單，並使用模型 (`openai/gpt-5-mini`) 呼叫 `add` 工具。你應該會看到顯示工具呼叫的輸出（例如，「Calling tool: add」）及該呼叫的結果。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->