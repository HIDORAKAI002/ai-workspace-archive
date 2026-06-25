# Changelog: MCP for Beginners カリキュラム

この文書は Model Context Protocol (MCP) for Beginners カリキュラムに行われたすべての重要な変更の記録です。変更は逆時系列（新しい変更順）で記録されています。

## 2026年6月24日

### 新しいレッスン: CopilotアプリでのMCP利用

- [Toolingセクション](./12-tooling/README.md) を追加しました。
- [CopilotアプリでのMCP](./12-tooling/01-copilot-app/README.md)

## 2026年6月16日

### MCP仕様の整合性確認とサンプル検証

カリキュラムが最新の **MCP Specification 2025-11-25** および最新の公式SDKに適合するか検証し、古い仕様への参照を修正、主要サンプルが正しくビルド・起動することを確認しました。

#### 仕様バージョンの修正（2025-06-18 / 2025-03-26 → 2025-11-25）

英語コンテンツにて古い仕様リビジョンを<em>現在/最新</em>の標準として言及していた箇所を更新し、公式の `modelcontextprotocol.io` 仕様パスにリンクを差し替えました：
- **05-AdvancedTopics/mcp-security/README.md**: 「Current Standard」バナー、導入、コアセキュリティ原則ヘッダー、必須要件ヘッダー、Microsoft Entra IDセクション、References & Resourcesリンク、結びのセキュリティ注意文（8つの参照）を2025-11-25に更新
- **05-AdvancedTopics/mcp-transport/README.md**: 追加リソースの仕様リンクと「Current Standard」バナーを2025-11-25に更新
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: 古い `2025-03-26` セキュリティ・信頼リンクを2025-11-25の最新セキュリティベストプラクティスページに置き換え
- **03-GettingStarted/14-sampling/README.md**: 公式サンプリングドキュメントのリンクを2025-11-25に更新
- **03-GettingStarted/05-stdio-server/README.md**: 現在形の「現行MCP仕様」参照と追加リソース仕様リンクを2025-11-25に更新（歴史的SSE廃止メモは正確性のためそのまま）

#### サンプルの最新SDKに対する検証

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install`で `@modelcontextprotocol/sdk@1.29.0` が解決。`tsc --noEmit` で型エラー無し。既存の `McpServer` / `StdioServerTransport` APIは有効
- **Python (03-GettingStarted/01-first-server/solution/python)**: 分離された `.venv`内で `mcp[cli]` (1.27.2)を利用。`py_compile`成功、`FastMCP.list_tools()` は `add` と `subtract` ツールを正しく返す
- すべてのサンプルの `@modelcontextprotocol/sdk` バージョン範囲 (`>=1.26.0` / `^1.26.0` / `^1.27.0`) が現在の `1.29.0` に問題なく解決され、APIの破壊的変更なしを確認

#### 依存ピンの整合性（バージョンギャップの解消）

古いSDKのピンを上げて、すべてのサンプルが最新のMCPリリースに追従し、リポジトリ全体の慣例に合わせました：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` を `^1.8.0` → `>=1.26.0` に引き上げ、「MCP 2025-06-18対応済み」のパッケージ説明を「MCP Specification 2025-11-25に沿う」に更新
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** と **lab4/code/github_mcp_server/pyproject.toml**: ピンの `mcp==1.23.0` を `mcp>=1.26.0` に引き上げ。両方の `uv.lock` ファイルを再生成してロックファイルが最新の `mcp 1.27.2` に解決され、マニフェストと同期

#### カリキュラムギャップ分析 — 最新仕様の機能カバー

カリキュラムは MCP 2025-11-25 で新規/拡張されたすべてのプリミティブを既にカバーしており、内容のギャップ無しを確認：
- **Sampling**：レッスン 03-GettingStarted/14-sampling と 05-AdvancedTopics/mcp-sampling
- **引き出し（URLモード含む）**：01-CoreConcepts と 05-AdvancedTopics/mcp-protocol-features で文書化
- <strong>ルート</strong>：00-Introduction、01-CoreConcepts、05-AdvancedTopics/mcp-root-contexts で文書化
- **タスク（実験的、長時間処理）**：01-CoreConcepts と 05-AdvancedTopics/mcp-protocol-features で文書化
- **ツール注釈 (`readOnlyHint` / `destructiveHint`)**：01-CoreConcepts と 05-AdvancedTopics/mcp-protocol-features で文書化

### セキュリティ強化と依存脆弱性修正

すべての依存マニフェストとサンプルコードにわたり完全なセキュリティチェックを実施し、報告されたnpmアドバイザリと1件のコードレベルの問題を修正。修正後、監査ディレクトリにて `npm audit` は <strong>脆弱性ゼロ</strong> を報告。

#### npm依存の脆弱性（推移的）— 修正済み

コミットされた15個の `package-lock.json` を監査。脆弱性はMCP Inspector開発ツール、OpenAIクライアント、MCP SDKの推移的依存に限定されており、すべて修正済みかつサンプルの破壊無：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** と **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`) を上げることで `ajv`、`brace-expansion`、`diff`、`path-to-regexp`、`ws` のアドバイザリを解消。追加でnpmの `overrides` エントリを追加し、`shell-quote@1.8.4` のパッチ版を強制的に指定、`concurrently` のクリティカルアドバイザリを解消。両ロックファイル再生成（脆弱性ゼロ）
- **03-GettingStarted/samples/typescript**: `npm audit fix` で `qs`（中程度）をパッチ版に更新
- **03-GettingStarted/samples/javascript**: `npm audit fix` で `hono`（中程度）をパッチ版に更新
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` で `form-data`（高）をパッチ版に更新
- **03-GettingStarted/11-simple-auth/solution/typescript**: 欠損していた `package-lock.json` を生成し、プロジェクトを再現および監査可能に（脆弱性ゼロ）

#### コードレベルのセキュリティ修正（OWASP A03: インジェクション）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `open_in_vscode` ツールから `shell=True` を除去。従来の `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` は、フォルダパスに含まれるシェルメタキャラクタを `cmd.exe` が解釈（コマンドインジェクションのベクター）可能だった。現在は解決済みの `Code.exe` を直接起動し、フォルダを引数に渡す方式にして安全かつ機能的に同等に改善

#### Python依存監査

- すべてのPython要求セットを `pip-audit` で監査。`05-AdvancedTopics` と `03-GettingStarted/samples/python` は <strong>既知の脆弱性なし</strong> （`mcp` / `httpx` / `pydantic` / `python-dotenv` の範囲が最新パッチに解決）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` が推移的依存の **`werkzeug` 3.1.1** に対して Windows デバイス名DoSの3つの `safe_join` アドバイザリを検出 — `CVE-2025-66221`、`CVE-2026-21860`、`CVE-2026-27199`（すべて3.1.6で修正）。明示的なセキュリティピン `werkzeug>=3.1.6` を追加し、パッチ版解決を保証。`chainlit` / `mcp` / `semantic-kernel` スタックで正常に解決を検証

### 製品名のリブランディング

Microsoftの製品リブランディングにともない、カリキュラム全体の内容を更新しました：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discordコミュニティリンクを更新
- **AGENTS.md**: Discordサーバー参照を更新
- **README.md**: 技術エコシステム参照を更新
- **study_guide.md**: ケーススタディ参照を更新
- **05-AdvancedTopics/README.md**: モジュール5.13のタイトルと説明を更新
- **05-AdvancedTopics/mcp-integration/README.md**: セクション見出しと説明を更新
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: モジュールタイトルおよび内容を全面更新
- **05-AdvancedTopics/mcp-security-entra/README.md**: クロスリファレンスリンクを更新
- **07-LessonsfromEarlyAdoption/README.md**: ケーススタディ参照を更新
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: セクション9ヘッダー、バッジ、機能を更新
- **08-BestPractices/README.md**: Discordコミュニティリンクを更新
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discordチャンネル参照を更新
- **09-CaseStudy/docs-mcp/solution/python/README.md**: モデル展開参照を更新
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AIサービス表を更新
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: リソース参照を更新

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: メインカリキュラム参照を更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: モジュールタイトル、概要、すべてのモジュール見出しを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: タイトル、学習目標、セットアップ指示、リソースを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: タイトル、学習目標、MCPホスト表、およびクロスリファレンスを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: タイトル、バッジ、前提条件、リソースを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: エージェントビルダー参照とフィードバックリンクを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: 前提条件および拡張機能参照を更新

---

## 2026年4月11日

### 新レッスン、ドキュメント修正、および依存更新

#### 新規カリキュラムコンテンツ追加

**モジュール05 - 高度トピック**
- **レッスン 5.17: MCPによる敵対的マルチエージェント推論** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): 敵対的討論パターンを扱うマルチエージェントシステムの包括的ガイド
  - Mermaid製アーキテクチャ図：2エージェント → 共有MCPサーバー → 討論記録 → 審判 → 判定
  - 共有MCPツールサーバー（`web_search` + `run_python`）はPythonとTypeScriptで実装
  - 対立するシステムプロンプト（賛成/反対/審判）に明示的なツール使用要件
  - Python、TypeScript、C#で実装された討論オーケストレータがラウンド管理と意見ルーティングを担当
  - オーケストレータ用MCP `ClientSession` の実ツール呼び出し接続
  - 利用例表（幻覚検出、脅威モデル、API設計レビュー、事実確認、技術選定）
  - セキュリティ考慮（サンドボックス実行、ツール呼び出し検証、レート制限、監査ログ）
  - 構造化演習で3つの実践シナリオ（コードレビュー、アーキテクチャ決定、コンテンツモデレーション）

#### ドキュメント修正

**モジュール03 - はじめに**
- **05-stdio-server/README.md**: TypeScript stdioサーバー例の不完全箇所を修正 — 交通インスタンスの生成（`new StdioServerTransport()`）と `server.connect(transport)` 呼び出しを追加し、同セクションのPython/.NET例と整合
- **14-sampling/README.md**: タイプミス修正 — `"Sampling is an davanced features"` を `"Sampling is an advanced feature"` に修正

#### カリキュラム更新

**Main README.md**
- カリキュラム表に項目 5.17（MCPによる敵対的マルチエージェント推論）を新規追加し、レッスンへの直接リンクを付与

**05-AdvancedTopics/README.md**
- レッスン表に5.17行を追加

**study_guide.md**
- 高度トピックのマインドマップと本文説明に敵対的マルチエージェント推論を追加

#### コードおよびセキュリティ修正

**モジュール05 - 敵対的エージェント (`mcp-adversarial-agents`)**
- **セキュリティ修正 — コマンドインジェクション**: TypeScriptの `run_python` ツールで `execSync` のシェル補間を `execFile` + `promisify` に置き換え、コマンドインジェクションのリスクを排除（LLM制御のコードはシェルを介さずリテラルのargv要素として渡されるようになりました）
- **MCPツールループ連携**: Pythonのディベートオーケストレーターを `AsyncAnthropic` クライアント（ブロッキング同期の `Anthropic` を置換）に更新し、各エージェントターンにライブの `ClientSession` を直接渡し、毎ターン `session.list_tools()` でツール定義を取得し、モデルが最終テキスト応答を出すまでループ内で `session.call_tool()` により `tool_use` ブロックをディスパッチするようにした

#### 依存関係の更新

- 複数のパッケージ（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）で `hono` を4.12.12にバンプ
- TypeScriptパッケージで `@hono/node-server` を1.19.11から1.19.13にバンプ
- Pythonパッケージ（10-StreamliningAIWorkflows ラボ3と4）で `cryptography` を46.0.5から46.0.7にバンプ
- 10-StreamliningAIWorkflowsのinspectorで `lodash` を4.17.23から4.18.1にバンプ

#### 翻訳

- 48以上の言語の翻訳を最新のソース変更に同期（i18n更新）

---

## 2026年2月5日

### リポジトリ全体の検証およびナビゲーション改善

#### 新しいカリキュラムコンテンツ追加

**モジュール03 - 入門**
- **12-mcp-hosts/README.md**: MCPホスト設定の包括的ガイドを新規追加
  - Claude Desktop、VS Code、Cursor、Cline、Windsurfの設定例
  - 主要ホストすべてのJSON設定テンプレート
  - トランスポートタイプの比較表（stdio、SSE/HTTP、WebSocket）
  - よくある接続問題のトラブルシューティング
  - ホスト設定に関するセキュリティのベストプラクティス

- **13-mcp-inspector/README.md**: MCP Inspectorの新しいデバッグガイド
  - インストール方法（npx、npmグローバル、ソースから）
  - stdioおよびHTTP/SSE経由でのサーバー接続
  - テストツール、リソース、およびプロンプトのワークフロー
  - VS Codeとの統合方法
  - よくあるデバッグシナリオと解決策

**モジュール04 - 実践的実装**
- **pagination/README.md**: ページネーション実装ガイド新規追加
  - Python、TypeScript、Javaのカーソルベースページネーションパターン
  - クライアント側のページネーション処理
  - カーソル設計戦略（不透明 vs. 構造化）
  - 性能最適化の推奨事項

**モジュール05 - 高度なトピック**
- **mcp-protocol-features/README.md**: 新プロトコル機能の詳細解説
  - 進捗通知の実装
  - リクエストキャンセルパターン
  - URIパターン付きリソーステンプレート
  - サーバーライフサイクル管理
  - ロギングレベル制御
  - JSON-RPCコードによるエラー処理パターン

#### ナビゲーション修正（24以上のファイル更新）

**メインモジュールREADME**
  初回レッスンと次のモジュールの両方へのリンクを追加

**02-Securityサブファイル**
- 5つの補足セキュリティ文書すべてに「次は何？」ナビゲーションを追加

**09-CaseStudyファイル**
- すべてのケーススタディファイルに連続ナビゲーションを追加

**10-StreamliningAIラボ**
モジュール10の概要とモジュール11に「次は何？」セクションを追加

#### コードおよびコンテンツ修正

**SDKおよび依存関係更新**
空のopenaiバージョンを `^4.95.0` に修正
SDKを `^1.8.0` から `>=1.26.0` に更新
mcpバージョンピンを `>=1.26.0` に更新

<strong>コード修正</strong>
無効なモデル `gpt-4o-mini` を `gpt-4.1-mini` に修正

<strong>コンテンツ修正</strong>
リンク切れ `READMEmd` → `README.md` を修正、カリキュラムヘッダー `Module 1-3` → `Module 0-3` を修正、ケースセンシティブなパスを修正
破損している重複ケーススタディ5の内容を削除

<strong>初心者向け案内改善</strong>
初心者向けに正しい導入、学習目標、前提条件を追加

#### カリキュラム更新

**メインREADME.md**
- カリキュラム表に3.12 (MCP Hosts)、3.13 (MCP Inspector)、4.1 (Pagination)、5.16 (Protocol Features) を追加

**モジュールREADME**
レッスン12と13をレッスンリストに追加
実践ガイドセクションにページネーションのリンクを追加
レッスン5.15（カスタムトランスポート）と5.16（プロトコル機能）を追加

**study_guide.md**
- MCPホスト設定、MCP Inspector、ページネーション戦略、プロトコル機能の新トピック全てを含むマインドマップを更新

## 2026年1月28日

### MCP仕様 2025-11-25 遵守レビュー

#### コアコンセプト強化 (01-CoreConcepts/)
- **新しいクライアントプリミティブ - Roots**: サーバーがファイルシステム境界やアクセス権限を理解可能にするRootsクライアントプリミティブの包括的ドキュメントを追加
- <strong>ツール注釈</strong>: 実行判断を改善するため `readOnlyHint`、`destructiveHint` などのツールの行動注釈に関するドキュメントを追加
- <strong>サンプリングにおけるツール呼び出し</strong>: モデル主導のサンプリング要求中にツールを呼び出せるように `tools` と `toolChoice` パラメータをサンプリングのドキュメントに追加
- **URLモード呼び出し**: サーバー起点の外部WebインタラクションのためのURLベースの呼び出しに関するドキュメントを追加
- **タスク（実験的）**: 耐久実行ラッパーおよび結果取得遅延機能のための実験的なTasks機能を新規ドキュメントに追加
- <strong>アイコンサポート</strong>: ツール、リソース、リソーステンプレート、プロンプトにアイコンをメタデータとして含められるようになったことを追記

#### ドキュメント更新
- **README.md**: MCP仕様 2025-11-25 版参照および日付ベースのバージョニング説明を追加
- **study_guide.md**: コアコンセプトにTasksとTool Annotationsを含むようカリキュラムマップを更新、文書タイムスタンプを更新

#### 仕様遵守検証
- <strong>プロトコルバージョン</strong>: すべてのドキュメントが最新のMCP仕様 2025-11-25を参照していることを検証
- <strong>アーキテクチャ整合性</strong>: 2層アーキテクチャ（データ層＋トランスポート層）のドキュメント整合性を確認
- <strong>プリミティブドキュメント</strong>: サーバープリミティブ（リソース、プロンプト、ツール）およびクライアントプリミティブ（サンプリング、呼び出し、ロギング、Roots）を検証
- <strong>トランスポート機構</strong>: STDIOおよびストリーム可能HTTPトランスポートのドキュメントを検証
- <strong>セキュリティガイド</strong>: 最新のMCPセキュリティベストプラクティスに沿っていることを確認

#### MCP 2025-11-25 の主な新機能ドキュメント化
- **OpenID Connect Discovery**: OIDCによる認証サーバー発見
- **OAuthクライアントIDメタデータ文書**: 推奨クライアント登録手法
- **JSON Schema 2020-12**: MCPスキーマ定義のデフォルト方言
- **SDKティアリングシステム**: SDK機能提供と保守の正式要件
- <strong>ガバナンス構造</strong>: MCPガバナンスの作業グループと利害関係グループの正式化

### セキュリティドキュメント大幅更新 (02-Security/)

#### MCPセキュリティサミットワークショップ（Sherpa）統合
- <strong>新しい実践トレーニング資料</strong>: [MCPセキュリティサミットワークショップ（Sherpa）](https://azure-samples.github.io/sherpa/) と全セキュリティドキュメントの包括的統合を追加
- <strong>遠征ルート対応</strong>: ベースキャンプからサミットまでの全キャンプ間進行を記録
- **OWASPとの整合**: すべてのセキュリティガイドがOWASP MCP Azureセキュリティガイドのリスクへマッピング

#### OWASP MCP Top 10 組み込み
- <strong>新セクション</strong>: 主要セキュリティREADMEにOWASP MCP Top 10リスク一覧とAzureでの緩和方法を追加
- <strong>リスク指向ドキュメント</strong>: mcp-security-controls-2025.md にOWASP MCPリスク参照（MCP01-MCP08）を追加
- <strong>参照アーキテクチャ</strong>: OWASP MCP Azureセキュリティガイドの参照アーキテクチャと実装パターンへのリンクを追加

#### 更新されたセキュリティファイル
- **README.md**: Sherpaワークショップ概要、遠征ルート表、OWASP MCP Top 10リスク要約、実践トレーニングセクションを追加
- **mcp-security-controls-2025.md**: ヘッダーを2026年2月に更新、OWASPリスク参照を追加（MCP01-MCP08）、仕様バージョン不整合を修正
- **mcp-security-best-practices-2025.md**: SherpaおよびOWASPリソースセクションを追加、タイムスタンプ更新
- **mcp-best-practices.md**: SherpaとOWASPリンクを含む実践トレーニングセクションを追加
- **azure-content-safety-implementation.md**: OWASP MCP06参照、Sherpaキャンプ3対応および追加リソースセクションを追加

#### 新規リソースリンク追加
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 個別のOWASP MCPリスクページ（MCP01-MCP10）

### カリキュラム全体のMCP仕様 2025-11-25適合

#### モジュール03 - 入門
- **SDKドキュメント**: Go SDKを公式SDKリストに追加。すべてのSDK参照をMCP仕様 2025-11-25に合わせて更新
- <strong>トランスポート説明</strong>: STDIOおよびHTTPストリーミングトランスポート説明に明示的な仕様参照を追加

#### モジュール04 - 実践的実装
- **SDK更新**: Go SDKを追加し、SDKリストに仕様バージョン参照を追加
- <strong>認可仕様</strong>: MCP認可仕様リンクを最新の2025-11-25版に更新

#### モジュール05 - 高度なトピック
- <strong>新機能</strong>: MCP仕様 2025-11-25の新機能（Tasks、ツール注釈、URLモード呼び出し、Roots）についての注記を追加
- <strong>セキュリティリソース</strong>: OWASP MCP Top 10およびSherpaワークショップリンクを追加

#### モジュール06 - コミュニティ貢献
- **SDKリスト**: SwiftおよびRust SDKを追加。仕様リンクを2025-11-25に更新
- <strong>仕様参照</strong>: MCP仕様リンクを直接仕様URLに更新

#### モジュール07 - 早期採用からの教訓
- <strong>リソース更新</strong>: MCP仕様 2025-11-25リンクとOWASP MCP Top 10を追加

#### モジュール08 - ベストプラクティス
- <strong>仕様バージョン</strong>: MCP仕様参照を2025-11-25に更新
- <strong>セキュリティリソース</strong>: OWASP MCP Top 10とSherpaワークショップを追加

#### モジュール10 - AIワークフロー効率化
- <strong>バッジ更新</strong>: MCPバージョンバッジをSDKバージョン（1.9.3）から仕様バージョン（2025-11-25）に変更
- <strong>リソースリンク</strong>: MCP仕様リンクを更新し、OWASP MCP Top 10を追加

#### モジュール11 - MCPサーバーハンズオンラボ
- <strong>仕様参照</strong>: MCP仕様リンクを2025-11-25版に更新
- <strong>セキュリティリソース</strong>: 公式リソースにOWASP MCP Top 10を追加

## 2025年12月18日

### セキュリティドキュメント更新 - MCP仕様 2025-11-25

#### MCPセキュリティベストプラクティス (02-Security/mcp-best-practices.md) - 仕様バージョン更新
- <strong>プロトコルバージョン更新</strong>: 最新のMCP仕様 2025-11-25（2025年11月25日リリース）を参照に更新
  - すべての仕様バージョン参照を2025-06-18から2025-11-25に更新
  - 文書の日付参照を2025年8月18日から2025年12月18日に更新
  - すべての仕様URLが最新ドキュメントを指していることを確認
- <strong>内容検証</strong>: 最新基準に基づくセキュリティベストプラクティスの包括的検証
  - **Microsoftセキュリティソリューション**: Prompt Shields（旧称「Jailbreakリスク検知」）、Azure Content Safety、Microsoft Entra ID、Azure Key Vaultの用語とリンクを確認
  - **OAuth 2.1セキュリティ**: 最新のOAuthセキュリティベストプラクティスとの整合を確認
  - **OWASP基準**: LLM用OWASP Top 10参照の最新性を検証
  - **Azureサービス**: すべてのMicrosoft Azureドキュメントリンクとベストプラクティスを検証
- <strong>標準整合</strong>: 参照されるすべてのセキュリティ標準が最新であることを確認
  - NIST AIリスクマネジメントフレームワーク
  - ISO 27001:2022
  - OAuth 2.1セキュリティベストプラクティス
  - Azureのセキュリティおよびコンプライアンスフレームワーク
- <strong>実装リソース検証</strong>: すべての実装ガイドリンクとリソースを確認
  - Azure API Management認証パターン
  - Microsoft Entra ID統合ガイド
  - Azure Key Vaultのシークレット管理
  - DevSecOpsパイプラインおよび監視ソリューション

### ドキュメンテーション品質保証
- <strong>仕様準拠</strong>: すべての必須MCPセキュリティ要件（MUST/MUST NOT）が最新仕様と整合していることを確認
- <strong>リソースの最新性</strong>: Microsoftドキュメント、セキュリティ標準、実装ガイドへの外部リンクの最新性を検証
- <strong>ベストプラクティス網羅</strong>: 認証、認可、AI特有脅威、サプライチェーンセキュリティ、エンタープライズパターンを網羅していることを確認

## 2025年10月6日

### 入門セクション拡張 – 高度なサーバー利用＆シンプル認証

#### 高度なサーバー利用 (03-GettingStarted/10-advanced)
- <strong>新章追加</strong>: 通常およびロー・レベルサーバーアーキテクチャ両方をカバーする高度なMCPサーバー利用に関する包括的ガイドを追加
  - **レギュラーサーバー vs. ローレベルサーバー**: 両アプローチの詳細比較とPythonおよびTypeScriptのコード例。
  - <strong>ハンドラーベースの設計</strong>: 拡張可能で柔軟なサーバー実装のためのハンドラーを用いたツール/リソース/プロンプト管理の説明。
  - <strong>実践的パターン</strong>: 高度な機能やアーキテクチャに有効なローレベルサーバーパターンの実例。

#### シンプル認証 (03-GettingStarted/11-simple-auth)
- <strong>新章追加</strong>: MCPサーバーでのシンプル認証を実装するステップバイステップガイド。
  - <strong>認証の概念</strong>: 認証と認可の違い、認証情報の取り扱いについての明確な説明。
  - <strong>基本的な認証実装</strong>: Python（Starlette）およびTypeScript（Express）でのミドルウェアベースの認証パターンとコードサンプル。
  - <strong>高度なセキュリティへの進展</strong>: シンプル認証からOAuth 2.1やRBACへの進め方、および高度なセキュリティモジュールへの参照。

これらの追加により、実践的かつ具体的なガイダンスを提供し、堅牢で安全かつ柔軟なMCPサーバー実装を構築するための基礎概念と高度な実運用パターンをつなげます。

## 2025年9月29日

### MCPサーバーデータベース統合ラボ - 包括的なハンズオン学習パス

#### 11-MCPServerHandsOnLabs - 完全なデータベース統合カリキュラム追加
- **13ラボの完全学習パス**: PostgreSQLデータベース統合によるプロダクション対応MCPサーバー構築の包括的ハンズオンカリキュラムを追加
  - <strong>実際の実装例</strong>: エンタープライズ向けのZava Retail分析ユースケースによるパターン紹介
  - <strong>構造化された学習進行</strong>:
    - **ラボ 00-03: 基礎** - 入門、コアアーキテクチャ、セキュリティとマルチテナンシー、環境設定
    - **ラボ 04-06: MCPサーバー構築** - データベース設計とスキーマ、MCPサーバー実装、ツール開発  
    - **ラボ 07-09: 高度な機能** - セマンティックサーチ統合、テストとデバッグ、VS Code連携
    - **ラボ 10-12: 本番環境とベストプラクティス** - デプロイ戦略、監視と可観測性、最適化と運用
  - <strong>企業技術</strong>: FastMCPフレームワーク、pgvector対応PostgreSQL、Azure OpenAI埋め込み、Azure Container Apps、Application Insights
  - <strong>高度機能</strong>: 行レベルセキュリティ（RLS）、セマンティックサーチ、多テナントデータアクセス、ベクトル埋め込み、リアルタイム監視

#### 用語の標準化 - モジュールからラボへの変換
- <strong>包括的ドキュメント更新</strong>: 11-MCPServerHandsOnLabs内の全READMEファイルを系統的に「ラボ」用語に更新
  - <strong>セクションヘッダー</strong>: すべての13ラボで「このモジュールで取り扱う内容」を「このラボで取り扱う内容」に更新
  - <strong>内容説明</strong>: すべての文書で「このモジュールは…」を「このラボは…」に変更
  - <strong>学習目標</strong>: 「このモジュールの終了時に…」を「このラボの終了時に…」へ修正
  - <strong>ナビゲーションリンク</strong>: 交差参照やナビゲーションで「Module XX:」をすべて「Lab XX:」に変換
  - <strong>達成追跡</strong>: 「このモジュールの完了後…」を「このラボの完了後…」に更新
  - <strong>技術的参照保持</strong>: 設定ファイル中のPythonモジュール参照（例: `"module": "mcp_server.main"`）は変更なし

#### 学習ガイド強化 (study_guide.md)
- <strong>ビジュアルカリキュラムマップ</strong>: 新しい「11. データベース統合ラボ」セクションを追加し、ラボ構造を視覚的に表示
- <strong>リポジトリ構成</strong>: メインセクションを10から11に更新し、11-MCPServerHandsOnLabsの詳細説明を追加
- <strong>学習パス案内</strong>: 00～11セクション全体をカバーするナビゲーション指示を拡充
- <strong>技術カバレッジ</strong>: FastMCP、PostgreSQL、Azureサービス統合の詳細を追加
- <strong>学習成果</strong>: プロダクション対応サーバー開発、データベース統合パターン、企業セキュリティの重要性を強調

#### メインREADME構成強化
- <strong>ラボベース用語</strong>: 11-MCPServerHandsOnLabs内のメインREADME.mdをすべて「ラボ」用語で統一
- <strong>学習パスの体系化</strong>: 基礎概念から高度実装、本番運用までの明確な進行を示す
- <strong>実践重視</strong>: エンタープライズグレードのパターンと技術を用いた実務中心の学習を強調

### ドキュメント品質と一貫性の向上
- <strong>ハンズオン学習強調</strong>: ドキュメント全体を通じて実践的ラボアプローチを強化
- <strong>エンタープライズパターン重視</strong>: プロダクション対応実装と企業セキュリティ配慮を強調
- <strong>技術統合</strong>: 最新のAzureサービスやAI統合パターンを網羅的にカバー
- <strong>学習進行</strong>: 基礎から本番運用までの体系的パスを明示

## 2025年9月26日

### ケーススタディ強化 - GitHub MCPレジストリ統合

#### ケーススタディ (09-CaseStudy/) - エコシステム開発に焦点
- **README.md**: GitHub MCPレジストリケーススタディを含む大幅拡充
  - **GitHub MCPレジストリケーススタディ**: 2025年9月のGitHub MCPレジストリ開始を詳細に分析
    - <strong>問題分析</strong>: 分散化されたMCPサーバー検出と展開課題の詳細検証
    - <strong>解決アーキテクチャ</strong>: GitHubの集中型レジストリアプローチとワンクリックVS Codeインストール
    - <strong>ビジネスインパクト</strong>: 開発者オンボーディングと生産性の計測可能な改善
    - <strong>戦略的価値</strong>: モジュール型エージェント展開とツール間相互運用性に焦点
    - <strong>エコシステム開発</strong>: エージェント統合の基盤プラットフォームとしての位置付け
  - <strong>ケーススタディ構成改善</strong>: 7つのケーススタディを一貫したフォーマットと包括的説明で更新
    - Azure AIトラベルエージェント: マルチエージェントオーケストレーション強調
    - Azure DevOps連携: ワークフロー自動化重視
    - リアルタイムドキュメント取得: Pythonコンソールクライアント実装
    - インタラクティブ学習計画ジェネレータ: Chainlit会話型Webアプリ
    - エディタ内ドキュメント表示: VS CodeおよびGitHub Copilot連携
    - Azure API管理: 企業API統合パターン
    - GitHub MCPレジストリ: エコシステム開発とコミュニティプラットフォーム
  - <strong>包括的結論</strong>: 7つのケーススタディを横断し、アーキテクチャパターン、実装戦略、ベストプラクティスの洞察を強調
    - エンタープライズ統合、マルチエージェントオーケストレーション、開発者生産性
    - エコシステム開発、教育応用の分類
    - MCPが成熟しプロダクション対応のプロトコルであることの強調

#### 学習ガイド更新 (study_guide.md)
- <strong>ビジュアルカリキュラムマップ</strong>: ケーススタディセクションにGitHub MCPレジストリを追加
- <strong>ケーススタディ詳細</strong>: ジェネリックな記述から7件の包括的ケーススタディの詳細な内訳に強化
- <strong>リポジトリ構成</strong>: セクション10を包括的ケーススタディカバレッジに更新し具体的実装詳細を反映
- <strong>更新履歴統合</strong>: 2025年9月26日エントリを追加しGitHub MCPレジストリ追加とケーススタディ強化を記録
- <strong>日付更新</strong>: フッターのタイムスタンプを最新の2025年9月26日に更新

### ドキュメント品質向上
- <strong>一貫性強化</strong>: 全7件のケーススタディでフォーマットと構成を標準化
- <strong>包括的カバレッジ</strong>: 企業、開発者生産性、エコシステム開発シナリオを網羅
- <strong>戦略的位置付け</strong>: Agenticシステム展開基盤としてのMCPの強調
- <strong>リソース統合</strong>: GitHub MCPレジストリリンク追加など追加リソース更新

## 2025年9月15日

### 高度トピック拡張 - カスタムトランスポート＆コンテキストエンジニアリング

#### MCPカスタムトランスポート (05-AdvancedTopics/mcp-transport/) - 新高度実装ガイド
- **README.md**: カスタムMCPトランスポートメカニズムの完全実装ガイド
  - **Azure Event Gridトランスポート**: サーバーレスイベント駆動トランスポート完全実装
    - C#、TypeScript、PythonのAzure Functions統合例
    - スケーラブルMCPソリューションのイベント駆動アーキテクチャパターン
    - Webhook受信およびプッシュ型メッセージ処理
  - **Azure Event Hubsトランスポート**: 高スループットストリーミングトランスポート実装
    - 低レイテンシーリアルタイムストリーミング機能
    - パーティショニング戦略とチェックポイント管理
    - メッセージバッチ処理と性能最適化
  - <strong>エンタープライズ統合パターン</strong>: プロダクション対応アーキテクチャ例
    - 複数Azure Functionsによる分散MCP処理
    - 複数トランスポートタイプを組み合わせたハイブリッド構成
    - メッセージ耐久性、信頼性、エラーハンドリング戦略
  - **セキュリティ＆監視**: Azure Key Vault統合と可観測性パターン
    - マネージドID認証と最小権限アクセス
    - Application Insightsによるテレメトリと性能監視
    - サーキットブレーカーや耐障害性パターン
  - <strong>テストフレームワーク</strong>: カスタムトランスポートのための包括的テスト戦略
    - テストダブルやモックフレームワークを用いた単体テスト
    - Azure Test Containersによる統合テスト
    - 性能および負荷テストの考慮事項

#### コンテキストエンジニアリング (05-AdvancedTopics/mcp-contextengineering/) - 新興AI分野
- **README.md**: 新興分野としてのコンテキストエンジニアリングの包括的探求
  - <strong>コア原則</strong>: 完全なコンテキスト共有、アクション決定の認識、コンテキストウィンドウ管理
  - **MCPプロトコル整合**: MCP設計がコンテキストエンジニアリング課題にどう対処しているか
    - コンテキストウィンドウ制限と漸進的ロード戦略
    - 関連性判定と動的コンテキスト取得
    - マルチモーダルコンテキスト処理とセキュリティ考慮
  - <strong>実装アプローチ</strong>: シングルスレッド対マルチエージェント構成
    - コンテキストチャンク分割と優先順位付け技術
    - 漸進的コンテキストロードと圧縮戦略
    - レイヤードコンテキストアプローチと取得最適化
  - <strong>測定フレームワーク</strong>: コンテキスト有効性評価の新指標
    - 入力効率、性能、品質、ユーザー体験考慮
    - 実験的コンテキスト最適化手法
    - 失敗解析と改善法

#### カリキュラムナビゲーション更新 (README.md)
- <strong>モジュール構成強化</strong>: 新高度トピックを含めたカリキュラム表更新
  - コンテキストエンジニアリング（5.14）とカスタムトランスポート（5.15）を追加
  - すべてのモジュールで一貫したフォーマットとナビゲーションリンク
  - 現コンテンツ範囲を反映した説明更新

### ディレクトリ構成改善
- <strong>命名規則統一</strong>: 「mcp transport」を「mcp-transport」に改名し他高度トピックフォルダと整合
- <strong>内容整理</strong>: 全05-AdvancedTopicsフォルダで一貫した命名パターン（mcp-[topic]）を適用

### ドキュメント品質向上
- **MCP仕様整合**: すべての新規コンテンツはMCP Specification 2025-06-18を参照
- <strong>多言語コード例</strong>: C#、TypeScript、Pythonによる包括的コード例
- <strong>企業対応</strong>: プロダクションレベルのパターンとAzureクラウド統合に注力
- <strong>視覚ドキュメント</strong>: アーキテクチャとフローのMermaid図解を追加

## 2025年8月18日

### ドキュメント総合更新 - MCP 2025-06-18標準準拠

#### MCPセキュリティベストプラクティス (02-Security/) - 完全モダナイズ
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP Specification 2025-06-18準拠の全面書き換え
  - <strong>必須要件</strong>: 公式仕様のMUST/MUST NOT要件を明示的に追加、視覚的インジケータ付加
  - **12のコアセキュリティ実践**: 15項目リストから包括的セキュリティドメインへ再構築
    - 外部IDプロバイダー連携によるトークンセキュリティ＆認証
    - 暗号化要件を含むセッション管理＆トランスポートセキュリティ
    - Microsoft Prompt Shields統合によるAI特有の脅威防御
    - 最小権限のアクセス制御＆許可管理
    - Azure Content Safety統合のコンテンツ安全性と監視
    - コンポーネント検証を含むサプライチェーンセキュリティ
    - PKCE実装を含むOAuthセキュリティ＆Confused Deputy防止
    - 自動化対応のインシデント対応＆リカバリープロセス
    - 規制順守・ガバナンス管理
    - ゼロトラストアーキテクチャを活用した高度なセキュリティ制御
    - Microsoftセキュリティエコシステム統合
    - 適応型の継続的セキュリティ進化
  - **Microsoftセキュリティソリューション**: Prompt Shields、Azure Content Safety、Entra ID、GitHub Advanced Securityの統合強化
  - <strong>実装リソース</strong>: 公式MCP文書、Microsoftセキュリティソリューション、セキュリティ標準、実装ガイドをカテゴリ別に整理

#### 高度セキュリティ制御 (02-Security/) - 企業向け実装
- **MCP-SECURITY-CONTROLS-2025.md**: 企業グレードのセキュリティフレームワークとして完全刷新
  - **9つの包括的セキュリティドメイン**: 基本制御から詳細な企業向けフレームワークへ拡張
    - Microsoft Entra ID連携の高度認証＆認可
    - 包括的検証を伴うトークンセキュリティ＆アンチパススルー制御
    - セッションの乗っ取り防止を含むセッションセキュリティ制御
    - プロンプト注入・ツール汚染防止などAI特有のセキュリティ制御
    - OAuthプロキシセキュリティを用いたConfused Deputy攻撃防止
    - サンドボックス化と分離によるツール実行のセキュリティ
    - 依存関係検証を含むサプライチェーンセキュリティ制御
    - SIEM連携による監視＆検知制御
    - 自動化対応のインシデント対応＆リカバリ
  - <strong>実装例</strong>: 詳細なYAML設定例とコードサンプル追加
  - **Microsoftソリューション統合**: Azureセキュリティサービス、GitHub Advanced Security、企業ID管理の包括的カバー

#### 高度トピックセキュリティ (05-AdvancedTopics/mcp-security/) - プロダクション対応実装
- **README.md**: 企業向けセキュリティ実装のために完全書き換え
  - <strong>最新仕様連携</strong>: MCP Specification 2025-06-18に準拠し必須のセキュリティ要件を反映
  - <strong>強化された認証</strong>: Microsoft Entra ID統合と、.NETおよびJava Spring Securityの包括的サンプル
  - **AIセキュリティ統合**: Microsoft Prompt ShieldsとAzure Content Safetyの詳細Python実装
  - <strong>高度脅威緩和</strong>: 
    - PKCEおよびユーザーコンセント検証を含むConfused Deputy攻撃防止の包括的実装例
    - オーディエンス検証と安全なトークン管理を組み合わせたトークンパススルー防止実装例
- セッションハイジャック防止：暗号的結合および行動解析による対策
- <strong>エンタープライズセキュリティ統合</strong>：Azure Application Insights の監視、脅威検出パイプライン、およびサプライチェーンセキュリティ
- <strong>実装チェックリスト</strong>：必須と推奨のセキュリティコントロールの明示と Microsoft セキュリティエコシステムの利点

### ドキュメント品質と基準整合性
- <strong>仕様参照</strong>：すべての参照を最新の MCP 仕様 2025-06-18 に更新
- **Microsoft セキュリティエコシステム**：すべてのセキュリティドキュメントに統合ガイダンスを強化
- <strong>実践的な実装</strong>：.NET、Java、Python の詳細なコード例とエンタープライズパターンを追加
- <strong>リソースの整理</strong>：公式ドキュメント、セキュリティ標準、実装ガイドの包括的な分類
- <strong>視覚的指標</strong>：必須要件と推奨プラクティスの明確な区別

#### コアコンセプト (01-CoreConcepts/) - 完全モダナイゼーション
- <strong>プロトコルバージョンの更新</strong>：現行 MCP 仕様 2025-06-18 を参照し、日付ベースのバージョニング（YYYY-MM-DD形式）を採用
- <strong>アーキテクチャ洗練化</strong>：ホスト、クライアント、サーバーの記述を現行 MCP アーキテクチャパターンに沿って強化
  - ホストは複数の MCP クライアント接続を調整する AI アプリケーションとして明確化
  - クライアントは一対一のサーバー関係を維持するプロトコルコネクタとして説明
  - サーバーはローカルとリモートの展開シナリオを強化
- <strong>プリミティブ再構築</strong>：サーバーとクライアントのプリミティブを完全改訂
  - サーバープリミティブ：リソース（データソース）、プロンプト（テンプレート）、ツール（実行関数）を詳細な説明と例で
  - クライアントプリミティブ：サンプリング（LLM 完了）、エリシテーション（ユーザー入力）、ロギング（デバッグ／監視）
  - 現行の発見（`*/list`）、取得（`*/get`）、実行（`*/call`）メソッドパターンを更新
- <strong>プロトコルアーキテクチャ</strong>：二層構造モデルを導入
  - データ層：ライフサイクル管理とプリミティブを備えた JSON-RPC 2.0 基盤
  - トランスポート層：STDIO（ローカル）および SSE 対応のストリーム可能 HTTP（リモート）のトランスポート機構
- <strong>セキュリティフレームワーク</strong>：明示的ユーザー同意、データプライバシー保護、ツール実行の安全性、トランスポート層セキュリティなど包括的な原則
- <strong>通信パターン</strong>：初期化、発見、実行、および通知フローを示すプロトコルメッセージを更新
- <strong>コード例</strong>：現行 MCP SDK パターンに沿った多言語例（.NET、Java、Python、JavaScript）を刷新

#### セキュリティ (02-Security/) - 包括的なセキュリティ刷新
- <strong>基準整合</strong>：MCP 仕様 2025-06-18 のセキュリティ要件に完全対応
- <strong>認証の進化</strong>：カスタム OAuth サーバーから外部 ID プロバイダー委任（Microsoft Entra ID）への進化を文書化
- **AI 特有脅威分析**：現代の AI 攻撃ベクトルを強化
  - 実例を伴う詳細なプロンプトインジェクション攻撃シナリオ
  - ツールポイズニング手法および「ラグプル」攻撃パターン
  - コンテキストウィンドウポイズニングおよびモデル混乱攻撃
- **Microsoft AI セキュリティソリューション**：Microsoft セキュリティエコシステムの包括的カバー
  - 高度検出、スポットライト、デリミタ技術を備えた AI プロンプトシールド
  - Azure Content Safety の統合パターン
  - サプライチェーン保護のための GitHub Advanced Security
- <strong>高度な脅威緩和</strong>：詳細なセキュリティコントロール
  - MCP 特有の攻撃シナリオと暗号的セッション ID 要件を伴うセッションハイジャック対策
  - MCP プロキシシナリオにおける混乱した代理問題と明示的同意要件
  - トークンパススルー脆弱性に必須の検証コントロール
- <strong>サプライチェーンセキュリティ</strong>：ファウンデーションモデル、埋め込みサービス、コンテキストプロバイダー、サードパーティ API を含む AI サプライチェーンの拡充
- <strong>基盤セキュリティ</strong>：ゼロトラストアーキテクチャや Microsoft セキュリティエコシステムを含むエンタープライズセキュリティパターンとの統合強化
- <strong>リソース整理</strong>：タイプ別（公式ドキュメント、標準、調査、Microsoft ソリューション、実装ガイド）に包括的なリソースリンクを分類

### ドキュメント品質の向上
- <strong>構造的な学習目標</strong>：具体的かつ実行可能な成果を含む学習目標を強化
- <strong>クロスリファレンス</strong>：関連するセキュリティおよびコアコンセプトトピック間のリンクを追加
- <strong>最新情報</strong>：すべての日時参照および仕様リンクを最新基準に更新
- <strong>実装ガイダンス</strong>：両セクション全体で具体的かつ実行可能な実装指針を追加

## 2025年7月16日

### README およびナビゲーションの改善
- README.md のカリキュラムナビゲーションを完全に再設計
- `<details>` タグをよりアクセスしやすい表形式に置換
- 新しい "alternative_layouts" フォルダーに代替レイアウトオプションを作成
- カードベース、タブスタイル、アコーディオンスタイルのナビゲーション例を追加
- 最新ファイルを含むリポジトリ構造セクションを更新
- 「このカリキュラムの使い方」セクションを明確な推奨とともに強化
- MCP 仕様リンクを正しい URL に更新
- カリキュラム構造にコンテキストエンジニアリングセクション（5.14）を追加

### 学習ガイドの更新
- 現行のリポジトリ構造に合わせてガイド全体を全面改訂
- MCP クライアントとツール、人気の MCP サーバーに関する新セクションを追加
- すべてのトピックを正確に反映した視覚的カリキュラムマップを更新
- 高度なトピックの説明を強化し、すべての専門領域をカバー
- ケーススタディセクションを最新の実例に更新
- 包括的なこの変更ログを追加

### コミュニティ貢献 (06-CommunityContributions/)
- 画像生成用 MCP サーバーの詳述を追加
- VSCode での Claude 利用に関する包括的なセクションを追加
- Cline ターミナルクライアントのセットアップおよび利用手順を追加
- MCP クライアントセクションにすべての人気クライアントオプションを含めて更新
- 貢献例をより正確なコードサンプルで強化

### 高度なトピック (05-AdvancedTopics/)
- 専門分野フォルダーを一貫した命名で整理
- コンテキストエンジニアリングの資料および例を追加
- Foundry エージェント統合ドキュメントを追加
- Entra ID セキュリティ統合ドキュメントを強化

## 2025年6月11日

### 初版作成
- MCP for Beginners カリキュラムの最初のバージョンをリリース
- 主要10セクションの基本構造を作成
- ナビゲーション用の視覚的カリキュラムマップを実装
- 複数プログラミング言語の初期サンプルプロジェクトを追加

### はじめに (03-GettingStarted/)
- 最初のサーバー実装例を作成
- クライアント開発ガイダンスを追加
- LLM クライアント統合手順を含む
- VS Code 統合ドキュメントを追加
- Server-Sent Events (SSE) サーバー例を実装

### コアコンセプト (01-CoreConcepts/)
- クライアントサーバーアーキテクチャの詳細説明を追加
- 主要プロトコルコンポーネントのドキュメントを作成
- MCP のメッセージパターンを文書化

## 2025年5月23日

### リポジトリ構造
- 基本的なフォルダ構造でリポジトリを初期化
- 主要セクションごとに README ファイルを作成
- 翻訳インフラをセットアップ
- 画像資産と図を追加

### ドキュメンテーション
- カリキュラム概要を含む初期 README.md を作成
- CODE_OF_CONDUCT.md と SECURITY.md を追加
- 支援案内を含む SUPPORT.md を設定
- 初期の学習ガイド構造を作成

## 2025年4月15日

### 計画とフレームワーク
- MCP for Beginners カリキュラムの初期計画
- 学習目標と対象読者を定義
- カリキュラムの10セクション構造を概説
- 例とケーススタディの概念フレームワークを策定
- 主要概念の初期プロトタイプ例を作成

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->