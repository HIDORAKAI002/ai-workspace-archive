# サンプルを実行する

## 仮想環境を作成する

```sh
python -m venv venv
source ./venv/bin/activate
```

## 依存関係をインストールする

```sh
pip install "mcp[cli]"
```

## サーバーを実行する

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot と VS Code でサーバーをテストする

mcp.json に次のようにエントリを追加してください:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

サーバーの「start」を必ずクリックしてください。

GitHub Copilot に以下のプロンプトを貼り付けます:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

初回は Sampling アクションを受け入れるかどうか尋ねられ、その後「create_blog」を実行するツールを受け入れるかどうか尋ねられます。次のような応答が表示されるはずです:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：  
本書類はAI翻訳サービス[Co-op Translator](https://github.com/Azure/co-op-translator)を使用して翻訳されました。正確性の向上に努めておりますが、自動翻訳には誤りや不正確な表現が含まれる可能性があります。正式な情報は原文のオリジナル文書を正としてください。重要な内容については、専門の人間翻訳を推奨いたします。本翻訳の利用により生じたいかなる誤解や誤訳に関しても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->