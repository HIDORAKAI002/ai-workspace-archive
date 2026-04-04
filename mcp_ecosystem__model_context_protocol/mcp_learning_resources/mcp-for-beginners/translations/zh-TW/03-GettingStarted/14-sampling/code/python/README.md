# 執行範例

## 建立虛擬環境

```sh
python -m venv venv
source ./venv/bin/activate
```

## 安裝相依套件

```sh
pip install "mcp[cli]"
```

## 執行伺服器

```sh
uvicorn server:app --port 8000
```

## 使用 GitHub Copilot 和 VS Code 測試伺服器

像這樣將條目新增到 mcp.json：

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

確定您已點擊伺服器上的「start」。

在 GitHub Copilot 中貼上以下提示：

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

第一次會詢問是否接受 Sampling 動作，接著會請您接受工具來執行 "create_blog"。您應該會看到類似以下的回應：

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議使用專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤譯負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->