# 執行此範例

這是 LLM 用戶端範例的 Rust 解決方案。你需要安裝 Rust 工具鏈；請參閱[官方安裝指南](https://www.rust-lang.org/tools/install)。

用戶端透過 GitHub Models 推論端點（`https://models.github.ai/inference/chat`）調用模型，並從 `OPENAI_API_KEY` 環境變數讀取你的 GitHub 個人訪問令牌 (PAT)。

> [!NOTE]
> 其他此存放庫的解決方案使用 `GITHUB_TOKEN`。對於 Rust，請將 `OPENAI_API_KEY` 設為相同的值以符合 OpenAI 用戶端配置。

## -0- 設定你的 GitHub 令牌

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- 編譯範例

```bash
cargo build
```

## -2- 執行範例

```bash
cargo run
```

用戶端啟動計算器 MCP 伺服器，取得其工具列表，並使用模型（`openai/gpt-5-mini`）呼叫 `add` 工具。你應該會看到顯示工具呼叫的輸出（例如，「Calling tool: add」）以及該呼叫的結果。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->