# サンプルの実行

ここでは、すでに動作するサーバーコードがあることを想定しています。前の章のいずれかからサーバーを見つけてください。

## mcp.json の設定

参照用のファイルはこちらです、[mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json)。

サーバーエントリを必要に応じて変更し、実行に必要な完全なコマンドを含めた絶対パスを指定してください。

上記の参照ファイルの例では、サーバーエントリは次のようになっています：

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

GitHub リポジトリのルートを入力する必要があるかもしれません。これは、`git rev-parse --show-toplevel` コマンドで取得できます。

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

これは次のようなコマンドを実行することに対応します：`node build/index.js`。

- 選択したランタイムやサーバーの場所に応じて、サーバーファイルがある場所やサーバー起動に必要な内容に合わせて、このサーバーエントリを変更してください。

## サーバーの機能を利用する

- *mcp.json* を *./vscode* フォルダーに追加したら、`play` アイコンをクリックします。

    GitHub Copilot のチャットフィールドのすぐ上にあるツールアイコンの変化を観察してください。利用可能なツールの数が増えます。

## ツールを実行する

- ツールの説明に合ったプロンプトをチャットウィンドウに入力します。例えば、ツール `add` を起動するには「add 3 to 20」のように入力します。

    チャットテキストボックスの上にツールを選択して実行するように促す表示が見えるはずです。次の画像のように：

    ![ツールを実行したいことを示す VS Code](../../../../../translated_images/ja/vscode-agent.d5a0e0b897331060.webp)

    ツールを選択すると、もし先ほどのようにプロンプトを入力していれば「23」という数値結果が得られます。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->