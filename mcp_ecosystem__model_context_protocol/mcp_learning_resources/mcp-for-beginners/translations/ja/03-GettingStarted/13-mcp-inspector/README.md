# MCP Inspectorでのデバッグ

**MCP Inspector**は、完全なAIホストアプリケーションを必要とせずに、インタラクティブにMCPサーバーのテストやトラブルシューティングを行うための重要なデバッグツールです。これを「MCPのためのPostman」と考えてください。リクエストの送信、レスポンスの表示、サーバーの挙動の理解に役立つ視覚的インターフェースを提供します。

## MCP Inspectorを使う理由

MCPサーバーを構築する際に、よく直面する課題は次の通りです：

- **「サーバーは動いているの？」** - Inspectorは接続状態を表示します
- **「ツールは正しく登録されている？」** - Inspectorは利用可能なすべてのツールを一覧表示します
- **「レスポンスの形式は？」** - Inspectorは完全なJSONレスポンスを表示します
- **「なぜこのツールは動作しないの？」** - Inspectorは詳細なエラーメッセージを表示します

## 前提条件

- Node.js 18以上がインストールされていること
- npm（Node.jsに付属）
- テストするMCPサーバー（[モジュール3.1 - 最初のサーバー](../01-first-server/README.md)を参照）

## インストール

### オプション1: npxで実行（クイックテストに推奨）

```bash
npx @modelcontextprotocol/inspector
```

### オプション2: グローバルインストール

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### オプション3: プロジェクトに追加

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

`package.json`に追加：
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## サーバーへの接続

### stdioサーバー（ローカルプロセス）

標準入力/出力で通信するサーバーの場合：

```bash
# Python サーバー
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js サーバー
npx @modelcontextprotocol/inspector node ./build/index.js

# 環境変数を使用して
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTPサーバー（ネットワーク）

HTTPサービスとして実行しているサーバーの場合：

1. まずサーバーを起動：
   ```bash
   python server.py  # http://localhost:8080 でサーバーが実行中
   ```

2. Inspectorを起動して接続：
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspectorインターフェースの概要

Inspectorが起動すると、Webインターフェースが表示されます（通常は `http://localhost:5173`）：

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ツールのテスト

### 利用可能なツールの一覧表示

1. **Tools**タブをクリック
2. Inspectorが自動的に`tools/list`を呼び出し
3. 登録されているすべてのツールが次の情報とともに表示されます：
   - ツール名
   - 説明
   - 入力スキーマ（パラメータ）

### ツールの呼び出し

1. リストからツールを選択
2. 必要なパラメータをフォームに入力
3. **Run Tool**をクリック
4. 結果パネルにレスポンスが表示されます

**例：計算機ツールのテスト**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### ツールのエラーのデバッグ

ツールが失敗した場合、Inspectorは以下を表示します：

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

よくあるエラーコード：
| コード | 意味 |
|------|---------|
| -32700 | パースエラー（無効なJSON） |
| -32600 | 無効なリクエスト |
| -32601 | メソッドが見つかりません |
| -32602 | 無効なパラメータ |
| -32603 | 内部エラー |

---

## リソースのテスト

### リソースの一覧表示

1. **Resources**タブをクリック
2. Inspectorが`resources/list`を呼び出し
3. 次のものが表示されます：
   - リソースURI
   - 名前と説明
   - MIMEタイプ

### リソースの読み取り

1. 読みたいリソースを選択
2. **Read Resource**をクリック
3. 返されたコンテンツを確認

**例の出力：**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## プロンプトのテスト

### プロンプトの一覧表示

1. **Prompts**タブをクリック
2. Inspectorが`prompts/list`を呼び出し
3. 利用可能なプロンプトテンプレートが表示されます

### プロンプトの取得

1. プロンプトを選択
2. 必要な引数を入力
3. **Get Prompt**をクリック
4. レンダリングされたプロンプトメッセージを確認

---

## メッセージログの解析

メッセージログはすべてのMCPプロトコルメッセージを表示します：

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### 注目すべきポイント

- **リクエスト/レスポンスのペア**：それぞれの`→`には対応する`←`があること
- **エラーメッセージ**：レスポンス内の`"error"`を探す
- **タイミング**：大きな間隔はパフォーマンス問題の可能性
- **プロトコルバージョン**：サーバーとクライアントでバージョンが合っていることを確認

---

## VS Codeとの連携

VS Codeから直接Inspectorを実行できます：

### launch.jsonの使用

`.vscode/launch.json`に追加：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### タスクの使用

`.vscode/tasks.json`に追加：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## よくあるデバッグシナリオ

### シナリオ1: サーバーに接続できない

**症状:** Inspectorが「Disconnected」と表示、または「Connecting...」で止まる

**チェックリスト:**
1. ✅ サーバーコマンドは正しいか？
2. ✅ 依存関係はすべてインストールされているか？
3. ✅ サーバーのパスは絶対パスか、現在のディレクトリに対して正しいか？
4. ✅ 必要な環境変数は設定されているか？

**デバッグ手順：**
```bash
# まず手動でサーバーをテストしてください
python -c "import your_server_module; print('OK')"

# インポートエラーを確認する
python -m your_server_module 2>&1 | head -20

# MCP SDKがインストールされていることを確認する
pip show mcp
```

### シナリオ2: ツールが表示されない

**症状:** Toolsタブに何も表示されない

**考えられる原因:**
1. サーバー初期化時にツールが登録されていない
2. 起動後にサーバーがクラッシュした
3. `tools/list`ハンドラーが空の配列を返している

**デバッグ手順:**
1. メッセージログで`tools/list`のレスポンスを確認
2. ツール登録コードにログを追加
3. Pythonの場合は`@mcp.tool()`デコレータが正しくついているか確認

### シナリオ3: ツールがエラーを返す

**症状:** ツールの呼び出しがエラー応答を返す

**デバッグアプローチ:**
1. エラーメッセージを注意深く読む
2. パラメータの型がスキーマに合っているか確認
3. 詳細なエラーメッセージを含むtry/catchを追加
4. サーバーログでスタックトレースを確認

**改善されたエラーハンドリングの例：**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # ここにツールのロジックを書く
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### シナリオ4: リソースの内容が空

**症状:** リソースが返ってくるが、内容が空またはnull

**チェックリスト:**
1. ✅ ファイルパスやURIは正しいか？
2. ✅ サーバーがリソースの読み取り権限を持っているか？
3. ✅ リソースの内容が正しく返されているか？

---

## 進んだInspectorの機能

### カスタムヘッダー（SSE）

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### 詳細ログ

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### セッションの記録

Inspectorはメッセージログをエクスポートして後で解析できます：
1. メッセージパネルで**Export Log**をクリック
2. JSONファイルを保存
3. チームメンバーと共有してデバッグ

---

## ベストプラクティス

1. **早期かつ頻繁にテストを行う** - 問題発生時だけでなく、開発中からInspectorを使う
2. **まずは簡単に始める** - 複雑なツール呼び出しの前に基本的な接続をテスト
3. **スキーマをチェックする** - 多くのエラーはパラメータ型の不一致による
4. **エラーメッセージをよく読む** - MCPのエラーは通常詳細
5. **Inspectorを開いたままにする** - 開発中の問題検出に役立つ

---

## 次のステップ

モジュール3: 基礎編を完了しました！学習を続けましょう：

- [モジュール4: 実践的実装](../../04-PracticalImplementation/README.md)

---

## 追加のリソース

- [MCP Inspector GitHubリポジトリ](https://github.com/modelcontextprotocol/inspector)
- [MCP仕様書 - プロトコルメッセージ](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0仕様](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：  
本書類はAI翻訳サービス「Co-op Translator」（https://github.com/Azure/co-op-translator）を使用して翻訳されています。正確性には努めておりますが、自動翻訳には誤りや不正確な部分が含まれる可能性があります。正式な情報は元の言語の原文を正式な情報源としてご参照ください。重要な内容については、専門の翻訳者による翻訳をお勧めします。本翻訳の利用により生じるいかなる誤解や解釈の相違についても当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->