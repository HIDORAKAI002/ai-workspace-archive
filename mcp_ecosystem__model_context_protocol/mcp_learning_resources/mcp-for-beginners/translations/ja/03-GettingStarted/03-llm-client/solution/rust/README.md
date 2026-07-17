# サンプルの実行

これはLLMクライアントサンプルのRustソリューションです。Rustのツールチェインがインストールされている必要があります。詳細は[公式インストールガイド](https://www.rust-lang.org/tools/install)を参照してください。

クライアントはGitHub Modelsの推論エンドポイント（`https://models.github.ai/inference/chat`）を通じてモデルを呼び出し、`OPENAI_API_KEY`環境変数からGitHubのパーソナルアクセストークン（PAT）を読み取ります。

> [!NOTE]
> このリポジトリの他のソリューションは`GITHUB_TOKEN`を使用しています。Rustの場合はOpenAIクライアントの設定と合わせるため、`OPENAI_API_KEY`を同じ値に設定してください。

## -0- GitHubトークンの設定

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# パワーシェル
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- サンプルのビルド

```bash
cargo build
```

## -2- サンプルの実行

```bash
cargo run
```

クライアントは計算機MCPサーバーを起動し、ツールリストを取得して、モデル（`openai/gpt-5-mini`）を使って`add`ツールを呼び出します。ツール呼び出しを示す出力（例えば "Calling tool: add"）やその呼び出し結果が表示されるはずです。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->