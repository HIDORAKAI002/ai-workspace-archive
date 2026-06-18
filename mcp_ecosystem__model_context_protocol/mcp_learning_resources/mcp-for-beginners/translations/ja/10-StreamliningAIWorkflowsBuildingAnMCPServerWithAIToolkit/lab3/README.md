# 🔧 モジュール 3: Microsoft Foundry Toolkit を用いた高度な MCP 開発

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 学習目標

このラボの終了時には、以下ができるようになります：

- ✅ Microsoft Foundry Toolkit を使用してカスタム MCP サーバーを作成する
- ✅ 最新の MCP Python SDK (v1.9.3) を設定および使用する
- ✅ MCP Inspector をセットアップしてデバッグに活用する
- ✅ Agent Builder と Inspector の両方の環境で MCP サーバーをデバッグする
- ✅ 高度な MCP サーバー開発ワークフローを理解する

## 📋 前提条件

- ラボ 2 (MCP 基礎) の完了
- Microsoft Foundry Toolkit 拡張機能がインストールされた VS Code
- Python 3.10+ 環境
- Inspector セットアップ用の Node.js と npm

## 🏗️ 作成するもの

このラボでは、以下を示す **Weather MCP サーバー** を作成します：
- カスタム MCP サーバーの実装
- Microsoft Foundry Toolkit Agent Builder との統合
- プロ仕様のデバッグワークフロー
- 最新の MCP SDK の使用パターン

---

## 🔧 主要コンポーネントの概要

### 🐍 MCP Python SDK
Model Context Protocol Python SDK は、カスタム MCP サーバー構築の基盤を提供します。デバッグ機能が強化されたバージョン 1.9.3 を使用します。

### 🔍 MCP Inspector
強力なデバッグツールで、以下を提供します：
- サーバーのリアルタイム監視
- ツール実行の可視化
- ネットワークのリクエスト/レスポンス検査
- インタラクティブなテスト環境

---

## 📖 ステップバイステップの実装

### ステップ 1: Agent Builder で WeatherAgent を作成

1. **VS Code の Microsoft Foundry Toolkit 拡張機能から Agent Builder を起動する**
2. **以下の設定で新しいエージェントを作成する：**
   - エージェント名：`WeatherAgent`

![Agent Creation](../../../../translated_images/ja/Agent.c9c33f6a412b4cde.webp)

### ステップ 2: MCP サーバープロジェクトの初期化

1. **Agent Builder の「Tools」→「Add Tool」へ進む**
2. **「MCP Server」を選択**
3. **「Create A new MCP Server」を選択**
4. **`python-weather` テンプレートを選択**
5. **サーバー名を入力：** `weather_mcp`

![Python Template Selection](../../../../translated_images/ja/Pythontemplate.9d0a2913c6491500.webp)

### ステップ 3: プロジェクトを開いて確認

1. **生成されたプロジェクトを VS Code で開く**
2. **プロジェクト構成を確認する：**
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

### ステップ 4: 最新 MCP SDK へのアップグレード

> **🔍 なぜアップグレード？** 最新の MCP SDK (v1.9.3) と Inspector サービス (0.14.0) を使用することで、機能強化と優れたデバッグ性能を得るためです。

#### 4a. Python 依存関係の更新

**`pyproject.toml` を編集：** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) を更新


#### 4b. Inspector 設定の更新

**`inspector/package.json` を編集：** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) を更新

#### 4c. Inspector 依存関係の更新

**`inspector/package-lock.json` を編集：** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) を更新

> **📝 注意：** このファイルは詳細な依存関係定義を含んでいます。以下は重要な構造の概要であり、完全な依存関係解決には提供されたファイルを使用してください。


> **⚡ 完全なパッケージロック：** 完全な package-lock.json は約3000行の依存関係定義を含みます。上記は主要な構造であり、完全な依存性解決には提供ファイルを利用してください。

### ステップ 5: VS Code デバッグ設定の構成

*注：指定されたパスのファイルをコピーしてローカルファイルを置き換えてください*

#### 5a. ランチ構成の更新

**`.vscode/launch.json` を編集：**

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

**`.vscode/tasks.json` を編集：**

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

## 🚀 MCP サーバーの実行とテスト

### ステップ 6: 依存関係のインストール

設定変更後、以下のコマンドを実行してください：

**Python 依存関係のインストール：**
```bash
uv sync
```

**Inspector 依存関係のインストール：**
```bash
cd inspector
npm install
```

### ステップ 7: Agent Builder でのデバッグ

1. **F5 キーを押すか、「Debug in Agent Builder」構成を使用**
2. <strong>デバッグパネルから複合構成を選択</strong>
3. **サーバーの起動と Agent Builder の起動を待つ**
4. **自然言語クエリで Weather MCP サーバーをテスト**

以下のように入力してください

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/ja/Result.6ac570f7d2b1d538.webp)

### ステップ 8: MCP Inspector でのデバッグ

1. **「Debug in Inspector」構成を使用（Edge または Chrome）**
2. **`http://localhost:6274` にて Inspector インターフェースを開く**
3. **インタラクティブなテスト環境を探索：**
   - 利用可能なツールの表示
   - ツール実行のテスト
   - ネットワークリクエストの監視
   - サーバーレスポンスのデバッグ

![MCP Inspector Interface](../../../../translated_images/ja/Inspector.5672415cd02fe873.webp)

---

## 🎯 主な学習成果

このラボを完了することで、以下を習得しました：

- [x] **Microsoft Foundry Toolkit テンプレートを用いたカスタム MCP サーバー作成**
- [x] **最新 MCP SDK (v1.9.3) へのアップグレードによる機能強化**
- [x] **Agent Builder と Inspector 双方のプロ仕様デバッグワークフローの構成**
- [x] **インタラクティブなサーバーテスト用 MCP Inspector のセットアップ**
- [x] **MCP 開発向け VS Code デバッグ構成のマスター**

## 🔧 探索した高度な機能

| 機能 | 説明 | ユースケース |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | 最新のプロトコル実装 | 最新サーバー開発 |
| **MCP Inspector 0.14.0** | インタラクティブデバッグツール | リアルタイムサーバーテスト |
| **VS Code デバッグ** | 統合開発環境 | プロ仕様デバッグワークフロー |
| **Agent Builder 統合** | Microsoft Foundry Toolkit との直接連携 | エンドツーエンドエージェントテスト |

## 📚 追加リソース

- [MCP Python SDK ドキュメント](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit 拡張機能ガイド](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code デバッグ ドキュメント](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol 仕様](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 おめでとうございます！** ラボ 3 を無事完了し、プロ仕様の開発ワークフローでカスタム MCP サーバーを作成、デバッグ、展開できるようになりました。

### 🔜 次のモジュールへ

MCP スキルを実際の開発ワークフローに適用する準備ができましたか？続けて **[モジュール 4: 実践的 MCP 開発 - カスタム GitHub クローンサーバー](../lab4/README.md)** で以下を学びます：
- GitHub リポジトリ操作を自動化する本番対応 MCP サーバーの構築
- MCP を介した GitHub リポジトリクローン機能の実装
- VS Code および GitHub Copilot Agent Mode とカスタム MCP サーバーの統合
- 本番環境でのカスタム MCP サーバーのテストとデプロイ
- 開発者向け実践的ワークフロー自動化の習得

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->