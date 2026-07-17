# 執行此範例

這是用 Rust 實作的 LLM 用戶端範例。你需要安裝 Rust 工具鏈；請參考[官方安裝指南](https://www.rust-lang.org/tools/install)。

用戶端透過 GitHub Models 推論端點（`https://models.github.ai/inference/chat`）呼叫模型，並從 `OPENAI_API_KEY` 環境變數讀取你的 GitHub 個人存取權杖（PAT）。

> [!NOTE]
> 此倉庫中的其他解決方案使用 `GITHUB_TOKEN`。對於 Rust，請將 `OPENAI_API_KEY` 設定為相同的值，以符合 OpenAI 用戶端設定。

## -0- 設定你的 GitHub 權杖

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- 建置範例

```bash
cargo build
```

## -2- 執行範例

```bash
cargo run
```

用戶端啟動計算機 MCP 伺服器，取得其工具清單，並使用模型（`openai/gpt-5-mini`）呼叫 `add` 工具。你應該會看到顯示呼叫工具（例如，“Calling tool: add”）及該呼叫結果的輸出。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->