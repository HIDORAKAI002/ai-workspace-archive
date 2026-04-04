# 運行範例

## 建立虛擬環境

```sh
python -m venv venv
source ./venv/bin/activate
```

## 安裝相依套件

```sh
pip install "mcp[cli]"
```

## 啟動伺服器

```sh
uvicorn server:app --port 8000
```

## 使用 GitHub Copilot 與 VS Code 測試伺服器

將條目加入到 mcp.json，如下所示：

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

確保你已點擊伺服器上的「start」。

在 GitHub Copilot 中貼上以下提示：

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

首次會要求你是否接受 Sampling 動作，接著會要求你同意執行工具 "create_blog"。你應該會看到類似以下的回應：

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。應以文件原始語言版本為權威來源。對於重要資訊，建議採用專業人工翻譯。本公司不對因使用本翻譯而引起之任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->