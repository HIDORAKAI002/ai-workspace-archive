# Chainlit と Microsoft Learn Docs MCP を使った学習計画ジェネレーター

## 前提条件

- Python 3.8 以上
- pip（Python パッケージマネージャー）
- Microsoft Learn Docs MCP サーバーに接続するためのインターネットアクセス

## インストール

1. このリポジトリをクローンするか、プロジェクトファイルをダウンロードします。
2. 必要な依存関係をインストールします：

   ```bash
   pip install -r requirements.txt
   ```

## 使用方法

### シナリオ 1: Docs MCP へのシンプルなクエリ
Docs MCP サーバーに接続し、クエリを送信して結果を表示するコマンドラインクライアント。

1. スクリプトを実行します：
   ```bash
   python scenario1.py
   ```
2. プロンプトでドキュメントに関する質問を入力します。

### シナリオ 2: 学習計画ジェネレーター（Chainlit ウェブアプリ）
技術トピックに対してパーソナライズされた週ごとの学習計画を生成できるウェブベースのインターフェース（Chainlit 使用）。

1. Chainlit アプリを起動します：
   ```bash
   chainlit run scenario2.py
   ```
2. ターミナルに表示されるローカル URL（例: http://localhost:8000）をブラウザで開きます。
3. チャットウィンドウに学習したいトピックと週数を入力します（例:「AI-900 認定、8週間」）。
4. アプリが週ごとの学習計画を表示し、関連する Microsoft Learn ドキュメントへのリンクを提供します。

**必要な環境変数:**

シナリオ 2（Azure OpenAI と連携した Chainlit ウェブアプリ）を使用するには、`python` ディレクトリ内の `.env` ファイルに以下の環境変数を設定する必要があります：

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

実行前にこれらの値を Azure OpenAI リソースの詳細で埋めてください。

> [!TIP]
> [Microsoft Foundry](https://ai.azure.com/) を使えば、簡単に独自モデルをデプロイできます。

### シナリオ 3: VS Code で MCP サーバーを使ったエディター内ドキュメント

ブラウザのタブを切り替える代わりに、MCP サーバーを使って Microsoft Learn Docs を VS Code に直接呼び込みます。これにより：
- VS Code 内でドキュメントを検索・閲覧できて、コーディング環境を離れずに済みます。
- ドキュメントを参照しながら README やコースファイルに直接リンクを挿入できます。
- GitHub Copilot と MCP を組み合わせて、シームレスな AI 支援付きドキュメントワークフローを実現します。

**利用例：**
- コースやプロジェクトドキュメントを書きながら、README に素早く参照リンクを追加する。
- Copilot でコードを生成し、MCP で関連ドキュメントを即座に見つけて引用する。
- エディターに集中しながら生産性を向上させる。

> [!IMPORTANT]
> 有効な [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) 設定ファイルがワークスペースにあることを確認してください（場所は `.vscode/mcp.json`）。

## なぜシナリオ 2 に Chainlit を使うのか？

Chainlit は、会話型ウェブアプリケーションを構築するためのモダンなオープンソースフレームワークです。Microsoft Learn Docs MCP サーバーのようなバックエンドサービスと接続するチャットベースの UI を簡単に作成できます。このプロジェクトでは、Chainlit を利用することで、パーソナライズされた学習計画をリアルタイムに生成するシンプルかつインタラクティブな方法を提供しています。Chainlit を活用すれば、生産性と学習効果を高めるチャット型ツールを迅速に構築・展開できます。

## このアプリの機能

このアプリは、トピックと期間を入力するだけでパーソナライズされた学習計画を作成できます。入力内容を解析し、Microsoft Learn Docs MCP サーバーに関連コンテンツを問い合わせて、週ごとに構成されたプランとして結果を整理します。各週の推奨事項はチャット画面に表示され、簡単に進捗を追跡可能です。この統合により、常に最新かつ最適な学習リソースを得ることができます。

## サンプルクエリ

チャットウィンドウで以下のクエリを試して、アプリの応答を確認してみてください：

- `AI-900 認定、8週間`
- `Learn Azure Functions、4週間`
- `Azure DevOps、6週間`
- `Azure でのデータエンジニアリング、10週間`
- `Microsoft セキュリティ基礎、5週間`
- `Power Platform、7週間`
- `Azure AI サービス、12週間`
- `クラウドアーキテクチャ、9週間`

これらの例は、さまざまな学習目標と期間に対応できるアプリの柔軟性を示しています。

## 参照

- [Chainlit Documentation](https://docs.chainlit.io/)
- [MCP Documentation](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->