# 🔧 モジュール 3: AI Toolkitを使った高度なMCP開発

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![AI Toolkit](https://img.shields.io/badge/AI_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 学習目標

このラボを終える頃には、以下ができるようになります：

- ✅ AI Toolkitを使ってカスタムMCPサーバーを作成する
- ✅ 最新のMCP Python SDK（v1.9.3）を設定・利用する
- ✅ MCP Inspectorをセットアップしてデバッグに活用する
- ✅ Agent BuilderとInspectorの両環境でMCPサーバーをデバッグする
- ✅ 高度なMCPサーバー開発のワークフローを理解する

## 📋 前提条件

- ラボ2（MCP基礎）の完了
- AI Toolkit拡張機能がインストールされたVS Code
- Python 3.10以上の環境
- Inspectorセットアップ用のNode.jsとnpm

## 🏗️ 作成するもの

このラボでは、以下を示す**Weather MCP Server**を作成します：

- カスタムMCPサーバーの実装
- AI Toolkit Agent Builderとの統合
- プロフェッショナルなデバッグワークフロー
- 最新のMCP SDKの利用パターン

---

## 🔧 コアコンポーネント概要

### 🐍 MCP Python SDK  
Model Context ProtocolのPython SDKはカスタムMCPサーバー構築の基盤です。バージョン1.9.3を使い、強化されたデバッグ機能を活用します。

### 🔍 MCP Inspector  
強力なデバッグツールで、以下を提供します：  
- リアルタイムのサーバーモニタリング  
- ツール実行の可視化  
- ネットワークリクエスト／レスポンスの検査  
- インタラクティブなテスト環境

---

## 📖 ステップバイステップ実装

### ステップ1: Agent BuilderでWeatherAgentを作成

1. AI Toolkit拡張機能からVS Codeで**Agent Builderを起動**  
2. 以下の設定で**新しいエージェントを作成**：  
   - エージェント名：`WeatherAgent`

![Agent Creation](../../../../translated_images/ja/Agent.c9c33f6a412b4cde.webp)

### ステップ2: MCPサーバープロジェクトの初期化

1. Agent Builderの**Tools → Add Tool**に移動  
2. 利用可能なオプションから **「MCP Server」** を選択  
3. **「Create A new MCP Server」** を選ぶ  
4. **`python-weather`テンプレートを選択**  
5. サーバー名を`weather_mcp`に設定

![Python Template Selection](../../../../translated_images/ja/Pythontemplate.9d0a2913c6491500.webp)

### ステップ3: プロジェクトを開いて確認

1. 生成されたプロジェクトをVS Codeで**開く**  
2. プロジェクト構成を**確認する**：  
   ```
   weather_mcp/
   ├── src/
   │   ├── __init__.py
   │   └── server.py
   ├── inspector/
   │   ├── package.json
   │   └── package-lock.json
   ├── .vscode/
   │   ├── launch.json
   │   └── tasks.json
   ├── pyproject.toml
   └── README.md
   ```

### ステップ4: 最新MCP SDKへアップグレード

> **🔍 なぜアップグレード？**  
> 最新のMCP SDK（v1.9.3）とInspectorサービス（0.14.0）を使い、機能強化とデバッグ性能向上を図るためです。

#### 4a. Python依存関係の更新

**`pyproject.toml`を編集：** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)を更新

#### 4b. Inspector設定の更新

**`inspector/package.json`を編集：** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)を更新

#### 4c. Inspector依存関係の更新

**`inspector/package-lock.json`を編集：** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)を更新

> **📝 注意：** このファイルは膨大な依存関係定義を含みます。以下は主要な構造のみ示しています。完全な依存関係解決には提供されたファイルを使用してください。

> **⚡ 完全なパッケージロック：** package-lock.jsonは約3000行の依存関係定義を含みます。上記は主要構造の例示です。完全な依存関係解決には元ファイルを利用してください。

### ステップ5: VS Codeデバッグ設定

*注：指定されたパスのファイルをコピーして、対応するローカルファイルを置き換えてください*

#### 5a. 起動構成の更新

**`.vscode/launch.json`を編集：**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Local MCP",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen",
      "postDebugTask": "Terminate All Tasks"
    },
    {
      "name": "Launch Inspector (Edge)",
      "type": "msedge",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Launch Inspector (Chrome)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    }
  ],
  "compounds": [
    {
      "name": "Debug in Agent Builder",
      "configurations": [
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Open Agent Builder",
    },
    {
      "name": "Debug in Inspector (Edge)",
      "configurations": [
        "Launch Inspector (Edge)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    },
    {
      "name": "Debug in Inspector (Chrome)",
      "configurations": [
        "Launch Inspector (Chrome)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    }
  ]
}
```

**`.vscode/tasks.json`を編集：**

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Server",
      "type": "shell",
      "command": "python -m debugpy --listen 127.0.0.1:5678 src/__init__.py sse",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}",
        "env": {
          "PORT": "3001"
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".*",
          "endsPattern": "Application startup complete|running"
        }
      }
    },
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npm run dev:inspector",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}/inspector",
        "env": {
          "CLIENT_PORT": "6274",
          "SERVER_PORT": "6277",
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Starting MCP inspector",
          "endsPattern": "Proxy server listening on port"
        }
      },
      "dependsOn": [
        "Start MCP Server"
      ]
    },
    {
      "label": "Open Agent Builder",
      "type": "shell",
      "command": "echo ${input:openAgentBuilder}",
      "presentation": {
        "reveal": "never"
      },
      "dependsOn": [
        "Start MCP Server"
      ],
    },
    {
      "label": "Terminate All Tasks",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "openAgentBuilder",
      "type": "command",
      "command": "ai-mlstudio.agentBuilder",
      "args": {
        "initialMCPs": [ "local-server-weather_mcp" ],
        "triggeredFrom": "vsc-tasks"
      }
    },
    {
      "id": "terminate",
      "type": "command",
      "command": "workbench.action.tasks.terminate",
      "args": "terminateAll"
    }
  ]
}
```

---

## 🚀 MCPサーバーの起動とテスト

### ステップ6: 依存関係のインストール

設定変更後、以下のコマンドを実行してください：

**Python依存関係のインストール：**  
```bash
uv sync
```

**Inspector依存関係のインストール：**  
```bash
cd inspector
npm install
```

### ステップ7: Agent Builderでデバッグ

1. **F5キーを押す**か、**「Debug in Agent Builder」** 構成を選択  
2. デバッグパネルから**compound構成を選択**  
3. サーバー起動とAgent Builderの起動を待つ  
4. 自然言語クエリでWeather MCPサーバーをテスト

以下のような入力プロンプトを使用

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/ja/Result.6ac570f7d2b1d538.webp)

### ステップ8: MCP Inspectorでデバッグ

1. **「Debug in Inspector」** 構成を使用（EdgeまたはChrome）  
2. `http://localhost:6274`でInspectorインターフェースを開く  
3. インタラクティブなテスト環境を探索：  
   - 利用可能なツールの確認  
   - ツール実行のテスト  
   - ネットワークリクエストの監視  
   - サーバーレスポンスのデバッグ

![MCP Inspector Interface](../../../../translated_images/ja/Inspector.5672415cd02fe873.webp)

---

## 🎯 主要な学習成果

このラボを完了して、以下を達成しました：

- [x] AI Toolkitテンプレートを使った**カスタムMCPサーバーの作成**  
- [x] 機能強化のための**最新MCP SDK（v1.9.3）へのアップグレード**  
- [x] Agent BuilderとInspector両方の**プロフェッショナルなデバッグワークフローの設定**  
- [x] インタラクティブなサーバーテストのための**MCP Inspectorのセットアップ**  
- [x] MCP開発のための**VS Codeデバッグ構成の習得**

## 🔧 探索した高度な機能

| 機能 | 説明 | 利用例 |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | 最新のプロトコル実装 | モダンなサーバー開発 |
| **MCP Inspector 0.14.0** | インタラクティブなデバッグツール | リアルタイムサーバーテスト |
| **VS Codeデバッグ** | 統合開発環境 | プロフェッショナルなデバッグワークフロー |
| **Agent Builder統合** | AI Toolkitとの直接連携 | エンドツーエンドのエージェントテスト |

## 📚 追加リソース

- [MCP Python SDKドキュメント](https://modelcontextprotocol.io/docs/sdk/python)  
- [AI Toolkit拡張機能ガイド](https://code.visualstudio.com/docs/ai/ai-toolkit)  
- [VS Codeデバッグドキュメント](https://code.visualstudio.com/docs/editor/debugging)  
- [Model Context Protocol仕様](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 おめでとうございます！** ラボ3を無事に完了し、プロフェッショナルな開発ワークフローでカスタムMCPサーバーの作成、デバッグ、デプロイができるようになりました。

### 🔜 次のモジュールへ進む

実際の開発ワークフローでMCPスキルを活かす準備はできましたか？  
続けて **[モジュール4: 実践的MCP開発 - カスタムGitHubクローンサーバー](../lab4/README.md)** へ進みましょう。ここでは：  
- GitHubリポジトリ操作を自動化する本番対応MCPサーバーを構築  
- MCP経由でGitHubリポジトリのクローン機能を実装  
- VS CodeとGitHub Copilot Agent Modeとの統合  
- 本番環境でのカスタムMCPサーバーのテストとデプロイ  
- 開発者向けの実践的なワークフロー自動化を学習します

**免責事項**：  
本書類はAI翻訳サービス「[Co-op Translator](https://github.com/Azure/co-op-translator)」を使用して翻訳されました。正確性の向上に努めておりますが、自動翻訳には誤りや不正確な部分が含まれる可能性があります。原文の言語によるオリジナル文書が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や誤訳についても、当方は責任を負いかねます。
