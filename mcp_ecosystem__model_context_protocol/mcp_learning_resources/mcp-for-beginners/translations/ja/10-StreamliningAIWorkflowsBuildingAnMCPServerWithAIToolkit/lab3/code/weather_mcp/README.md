# Weather MCP Server

これはモックレスポンスを用いた気象ツールを実装したPythonのサンプルMCPサーバーです。ご自身のMCPサーバーの足掛かりとして使用できます。以下の機能が含まれています:

- **Weather Tool**: 指定された場所に基づいたモックの天気情報を提供するツール。
- **Agent Builderへの接続**: テストとデバッグのためにMCPサーバーをAgent Builderに接続する機能。
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector)でのデバッグ**: MCP Inspectorを使ってMCPサーバーをデバッグする機能。

## Weather MCP Server テンプレートの使い始め

> **前提条件**
>
> ローカル開発環境でMCPサーバーを実行するには、以下が必要です:
>
> - [Python](https://www.python.org/)
> - (*任意 - uvを好む場合*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 環境の準備

このプロジェクト用の環境設定には2つの方法があります。お好みの方法を選択してください。

> 注意: 仮想環境を作成後、VSCodeやターミナルをリロードし、仮想環境のPythonが使用されていることを確認してください。

| アプローチ | 手順 |
| -------- | ----- |
| `uv`使用 | 1. 仮想環境を作成: `uv venv` <br>2. VSCodeのコマンド "***Python: Select Interpreter***" を実行し、作成した仮想環境のPythonを選択 <br>3. 依存関係（開発依存含む）をインストール: `uv pip install -r pyproject.toml --extra dev` |
| `pip`使用 | 1. 仮想環境を作成: `python -m venv .venv` <br>2. VSCodeのコマンド "***Python: Select Interpreter***" を実行し、作成した仮想環境のPythonを選択 <br>3. 依存関係（開発依存含む）をインストール: `pip install -e .[dev]` | 

環境設定後、Agent BuilderをMCPクライアントとして利用しローカル開発環境でサーバーを開始できます:
1. VS Codeのデバッグパネルを開きます。`Debug in Agent Builder`を選択、もしくは`F5`を押してMCPサーバーのデバッグを開始します。
2. AI Toolkit Agent Builderを使用し、[このプロンプト](../../../../../../../../../../../open_prompt_builder)でサーバーをテストします。サーバーは自動的にAgent Builderに接続されます。
3. `Run`をクリックしてプロンプトでサーバーをテストします。

**おめでとうございます**！ Agent BuilderをMCPクライアントとして使用し、ローカル開発環境でWeather MCP Serverを正常に実行できました。
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## テンプレートに含まれるもの

| フォルダー/ファイル | 内容                                   |
| ------------ | ---------------------------------------- |
| `.vscode`    | デバッグ用のVSCode設定ファイル              |
| `.aitk`      | AI Toolkitの設定ファイル                     |
| `src`        | Weather MCPサーバーのソースコード              |

## Weather MCP Serverのデバッグ方法

> 注意事項:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector)はMCPサーバーのテストとデバッグのための視覚的な開発者ツールです。
> - すべてのデバッグモードはブレークポイントに対応しているので、ツール実装コードにブレークポイントを追加できます。

| デバッグモード | 説明 | デバッグ手順 |
| ---------- | ----------- | --------------- |
| Agent Builder | AI ToolkitのAgent Builder上でMCPサーバーをデバッグします。 | 1. VS Codeのデバッグパネルを開きます。`Debug in Agent Builder`を選択し、`F5`を押してMCPサーバーのデバッグを開始します。<br>2. AI Toolkit Agent Builderを使い、[このプロンプト](../../../../../../../../../../../open_prompt_builder)でサーバーをテスト。サーバーは自動でAgent Builderに接続されます。<br>3. `Run`をクリックしてプロンプトでサーバーをテストします。 |
| MCP Inspector | MCP Inspectorを使ってMCPサーバーをデバッグします。 | 1. [Node.js](https://nodejs.org/)をインストール <br> 2. Inspectorをセットアップ: `cd inspector` && `npm install` <br> 3. VS Codeのデバッグパネルを開き、`Debug SSE in Inspector (Edge)`または`Debug SSE in Inspector (Chrome)`を選択。`F5`を押してデバッグ開始。<br> 4. ブラウザでMCP Inspectorが起動したら、`Connect`ボタンをクリックしてこのMCPサーバーに接続。<br> 5. その後、`List Tools`でツール一覧を表示し、ツールを選択、パラメーターを入力し、`Run Tool`でサーバーコードをデバッグ可能。<br> |

## デフォルトポートとカスタマイズ

| デバッグモード | ポート | 定義 | カスタマイズ | 備考 |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json)を編集してこれらのポートを変更可能 | なし |
| MCP Inspector | 3001 (サーバー); 5173 と 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json)を編集してこれらのポートを変更可能 | なし |

## フィードバック

このテンプレートについてフィードバックや提案があれば、[AI Toolkit GitHubリポジトリ](https://github.com/microsoft/vscode-ai-toolkit/issues)にIssueを開いてください。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：  
本書類はAI翻訳サービス[Co-op Translator](https://github.com/Azure/co-op-translator)を使用して翻訳されました。正確性を期しておりますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文が正本であり、正式な情報源としてご利用ください。重要な情報については、専門の人間翻訳を推奨いたします。本翻訳の使用により生じた誤解や誤読について、一切の責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->