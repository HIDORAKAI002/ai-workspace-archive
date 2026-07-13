# 執行範例

這裡假設你已經有一個可運作的伺服器程式碼。請從前面的章節中找出一個伺服器。

## 設定 mcp.json

這是你用來參考的檔案，[mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json)。

根據需要變更 server 項目以指出伺服器的絕對路徑，並包含啟動伺服器所需完整指令。

在上述範例檔中，server 項目看起來像這樣：

<details>
<summary>node.js</summary>
```json
"hello-mcp": {
    "command": "node",
    "args": [
        "build/index.js"
    ]
}
```
</details>

<details>
<summary>.NET</summary>

你可能需要輸入 GitHub 儲存庫根目錄，可以用指令 `git rev-parse --show-toplevel` 取得。

```jsonc
{
  "inputs": [
    {
      "type": "promptString",
      "id": "repository-root",
      "description": "The absolute path to the repository root"
    }
  ],
  "servers": {
    "calculator-mcp-dotnet": {
      "type": "stdio",
      "command": "dotnet",
      "args": [
        "run",
        "--project",
        "${input:repository-root}/03-GettingStarted/02-client/solution/server/server.csproj"
      ]
    }
  }
}
```

</details>

這相當於執行像是 `node build/index.js` 的指令。

- 將此 server 項目更改為適合你的伺服器檔案位置，或依據所選執行環境和伺服器位置調整啟動伺服器所需指令。

## 使用伺服器中的功能

- 一旦你將 *mcp.json* 新增至 *./vscode* 資料夾，就點擊「播放」圖示，

    你會看到工具圖示變化，顯示可用工具數量增加。工具圖示位於 GitHub Copilot 的聊天欄正上方。

## 執行工具

- 在聊天視窗輸入與工具描述相符的提示。例如，要觸發 `add` 工具，可輸入類似「add 3 to 20」的文字。

    你應該會看到在聊天文字框上方出現一個工具提示，讓你選擇以執行該工具，如下圖所示：

    ![VS Code 表示它打算執行工具](../../../../../translated_images/zh-TW/vscode-agent.d5a0e0b897331060.webp)

    選擇該工具後，如果你的提示如前述，應該會產生數字結果「23」。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->