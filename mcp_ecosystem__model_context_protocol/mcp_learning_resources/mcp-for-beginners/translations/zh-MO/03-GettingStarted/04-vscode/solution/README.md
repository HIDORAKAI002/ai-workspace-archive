# 運行示範

這裡假設你已經有一個可運作的伺服器代碼。請從之前的章節中找到一個伺服器。

## 設定 mcp.json

這是一個供參考的檔案，[mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json)。

根據需要更改 server 項目，以指出伺服器的絕對路徑，包括執行所需的完整命令。

在上述參考的範例檔案中，server 項目看起來是這樣的：

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

你可能需要輸入 GitHub 儲存庫的根目錄，可以從命令 `git rev-parse --show-toplevel` 獲取。

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

這相當於執行命令：`node build/index.js`。

- 根據你選擇的執行環境和伺服器位置，調整該 server 項目以符合你的伺服器檔案位置或者啟動伺服器所需的內容。

## 使用伺服器的功能

- 一旦你將 *mcp.json* 加入到 *./vscode* 資料夾中，點擊 `play` 圖示，

    你會看到工具圖示變化，可使用的工具數量增加。工具圖示位於 GitHub Copilot 的聊天欄正上方。

## 運行工具

- 在聊天視窗輸入符合你的工具描述的提示。例如要觸發 `add` 工具，可以輸入「add 3 to 20」。

    你應該會看到工具顯示在聊天文字框上方，等待你選擇以運行工具，如這個畫面：

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/zh-MO/vscode-agent.d5a0e0b897331060.webp)

    選擇工具後，會得出數字結果「23」，如果你的提示如前面所述。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->