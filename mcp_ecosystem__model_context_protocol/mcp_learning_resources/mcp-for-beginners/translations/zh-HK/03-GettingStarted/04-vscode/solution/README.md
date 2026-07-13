# 執行範例

這裡假設你已經有一個可運作的伺服器程式碼。請從前面章節中找一個伺服器。

## 設置 mcp.json

這是一個參考用的檔案 [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json)。

按需變更伺服器項以指向你的伺服器的絕對路徑，包括啟動所需的完整指令。

在上面提到的範例檔案中，伺服器項如下所示：

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

你可能需要輸入 GitHub 倉庫根目錄，它可透過指令 `git rev-parse --show-toplevel` 取得。

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

這相當於執行指令：`node build/index.js`。

- 請依照你的伺服器檔案位置，或依所選的執行環境與伺服器位置調整此伺服器項目以啟動伺服器。

## 使用伺服器中的功能

- 一旦你將 *mcp.json* 加入到 *./vscode* 資料夾，按下 `play` 圖示，

    會看到工具圖示變更，增加可用工具數量。工具圖示位於 GitHub Copilot 聊天欄上方。

## 執行工具

- 在聊天視窗中鍵入與你工具描述相符的提示，例如要觸發工具 `add`，輸入「add 3 to 20」。

    你會看到工具在聊天文字框上方顯示，提示你選擇以執行該工具，如下圖所示：

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/zh-HK/vscode-agent.d5a0e0b897331060.webp)

    選擇該工具後，如果提示如前述，你會得到顯示「23」的數字結果。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->