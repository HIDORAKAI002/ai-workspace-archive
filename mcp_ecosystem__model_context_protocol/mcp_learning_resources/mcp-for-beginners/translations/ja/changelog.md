# 変更履歴: MCP for Beginners カリキュラム

このドキュメントは、Model Context Protocol (MCP) for Beginners カリキュラムに加えられた重要な変更をすべて記録したものです。変更は逆年代順（最新の変更が最初）で記録されています。

## 2026年6月16日

### MCP仕様の整合性確認とサンプル検証

カリキュラムを現在の **MCP Specification 2025-11-25** および最新の公式SDKに対して検証し、古くなった仕様参照を修正し、コアサンプルが引き続きビルドと実行に成功することを確認しました。

#### 仕様バージョンの修正（2025-06-18 / 2025-03-26 → 2025-11-25）

まだ古い仕様リビジョンが<em>現在/最新</em>標準として記述されている英語コンテンツを更新し、リンクを公式の `modelcontextprotocol.io` 仕様パスへ向け直しました：
- **05-AdvancedTopics/mcp-security/README.md**: 「Current Standard」バナー、イントロダクション、コアセキュリティ原則の見出し、必須要件の見出し、Microsoft Entra IDセクション、参照＆リソースリンク、セキュリティ通知（8箇所）を2025-11-25に更新
- **05-AdvancedTopics/mcp-transport/README.md**: 追加リソースの仕様リンクおよび「Current Standard」バナーを2025-11-25に更新
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: 古い `2025-03-26` の security-and-trust リンクを現在の2025-11-25 のセキュリティベストプラクティスページに置換
- **03-GettingStarted/14-sampling/README.md**: 公式サンプリングドキュメントリンクを2025-11-25に更新
- **03-GettingStarted/05-stdio-server/README.md**: 現在形の「現在のMCP仕様」参照および追加リソースの仕様リンクを2025-11-25に更新（過去のSSE廃止注記は正確さのためそのまま保持）

#### 最新SDKに対するサンプル検証

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` で `@modelcontextprotocol/sdk@1.29.0` が解決；`tsc --noEmit` は型エラーなしで合格 — 既存の `McpServer` / `StdioServerTransport` APIは引き続き有効
- **Python (03-GettingStarted/01-first-server/solution/python)**: `mcp[cli]` (1.27.2) を使い分離された `.venv` 環境で検証；`py_compile` 合格、`FastMCP.list_tools()` は正しく `add` と `subtract` ツールを返す
- サンプルのすべての `@modelcontextprotocol/sdk` バージョン範囲（`>=1.26.0` / `^1.26.0` / `^1.27.0`）が現在の `1.29.0` に問題なく解決し、APIの破壊的変更なしを確認

#### 依存関係のバージョン合わせ（バージョンギャップ解消）

古いSDKピンを引き上げてすべてのサンプルが現在のMCPリリースを追跡するようにし、リポジトリ全体の慣例に合わせました：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` を `^1.8.0` から `>=1.26.0` に更新し、古い「updated for MCP 2025-06-18」のパッケージ説明を「aligned with MCP Specification 2025-11-25」に改訂
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** および **lab4/code/github_mcp_server/pyproject.toml**: 厳密なピン `mcp==1.23.0` を `mcp>=1.26.0` に引き上げ；両方の `uv.lock` ファイルを再生成（`uv lock`）し、ロックファイルが現在の `mcp 1.27.2` に解決され、マニフェストと同期された状態に維持

#### カリキュラムギャップ分析 — 最新仕様の機能対応

カリキュラムはすでにMCP 2025-11-25で導入・拡充されたすべてのプリミティブをカバーしていることを確認し、内容上のギャップはなし：
- <strong>サンプリング</strong>：レッスン 03-GettingStarted/14-sampling と 05-AdvancedTopics/mcp-sampling
- **誘導（URLモード含む）**：01-CoreConcepts と 05-AdvancedTopics/mcp-protocol-features にドキュメントあり
- <strong>ルーツ</strong>：00-Introduction、01-CoreConcepts、05-AdvancedTopics/mcp-root-contexts にドキュメントあり
- **タスク（実験的、長時間処理）**：01-CoreConcepts と 05-AdvancedTopics/mcp-protocol-features にドキュメントあり
- <strong>ツール注釈</strong> (`readOnlyHint` / `destructiveHint`)：01-CoreConcepts と 05-AdvancedTopics/mcp-protocol-features にドキュメントあり

### セキュリティ強化および依存関係の脆弱性修正

すべての依存マニフェストとサンプルソースコードに対して完全なセキュリティチェックを行い、報告されたnpm警告および1件のコードレベルの指摘を修正。修正後、`npm audit` はすべての監査ディレクトリで<strong>脆弱性0件</strong>を報告。

#### npm依存関係の脆弱性（間接依存） — 修正済み

15個のコミット済み `package-lock.json` ファイルを監査。脆弱性はMCP Inspector開発ツール、OpenAIクライアント、およびMCP SDKが取り込む間接依存に限定されており、すべてがサンプルに影響なく解決：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** と **lab3/code/weather_mcp/inspector**：`@modelcontextprotocol/inspector` を (`0.16.6` / `0.14.1` → `0.22.0`) に引き上げ。これによりバンドルされた `ajv`、`brace-expansion`、`diff`、`path-to-regexp`、`ws` の警告が解消。さらに `concurrently` の残る重大警告を消すために npm の `overrides` エントリでパッチ済み `shell-quote@1.8.4` を強制。両ロックファイルを再生成（現在0脆弱性）
- **03-GettingStarted/samples/typescript**：`npm audit fix` で間接依存 `qs`（中程度）をパッチ済みリリースに更新
- **03-GettingStarted/samples/javascript**：`npm audit fix` で間接依存 `hono`（中程度）をパッチ済みリリースに更新
- **03-GettingStarted/03-llm-client/solution/typescript**：`npm audit fix` で間接依存 `form-data`（高リスク）をパッチ済みリリースに更新
- **03-GettingStarted/11-simple-auth/solution/typescript**：`package-lock.json` が欠落していたため生成、プロジェクトの再現性と監査性を確保（脆弱性0）

#### コードレベルのセキュリティ修正（OWASP A03: インジェクション）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：`open_in_vscode` ツールから `shell=True` を削除。以前は `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` がフォルダパスのシェルメタ文字を `cmd.exe` が解釈し（コマンドインジェクション経路）、直接フォルダを引数にとる `Code.exe` をシェルを使わず起動する仕様に修正。機能的には同等で安全

#### Python依存関係監査

- すべてのPython requirementsセットを `pip-audit` で監査。`05-AdvancedTopics` と `03-GettingStarted/samples/python` は<strong>既知の脆弱性なし</strong>（`mcp` / `httpx` / `pydantic` / `python-dotenv` 範囲は最新パッチ済みリリースに解決）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` が間接依存 `werkzeug` 3.1.1 のWindowsデバイス名DoS脆弱性3件 (`CVE-2025-66221`, `CVE-2026-21860`, `CVE-2026-27199`、3.1.6で修正済み) を検出。明示的なセキュリティピン `werkzeug>=3.1.6` を追加し、パッチリリースを解決；`chainlit` / `mcp` / `semantic-kernel` スタックでの動作確認済み。

### 製品名リブランディング対応

Microsoftの製品リブランディングにあわせてカリキュラムの全コンテンツを更新：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：Discordコミュニティリンク更新
- **AGENTS.md**：Discordサーバー参照更新
- **README.md**：技術エコシステム参照更新
- **study_guide.md**：ケーススタディ参照更新
- **05-AdvancedTopics/README.md**：モジュール5.13のタイトル・説明更新
- **05-AdvancedTopics/mcp-integration/README.md**：セクションヘッダー・説明更新
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：モジュール全体のタイトル・内容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：相互参照リンク更新
- **07-LessonsfromEarlyAdoption/README.md**：ケーススタディ参照更新
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：セクション9のヘッダー、バッジ、機能更新
- **08-BestPractices/README.md**：Discordコミュニティリンク更新
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：Discordチャンネル参照更新
- **09-CaseStudy/docs-mcp/solution/python/README.md**：モデル配布参照更新
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：AIサービス表更新
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：リソース参照更新

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**：メインカリキュラム参照更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：モジュールタイトル、概要、およびすべてのモジュールヘッダーを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：タイトル、学習目標、セットアップ指示、リソース更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：タイトル、学習目標、MCPホスト表、相互参照更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：タイトル、バッジ、前提条件、リソース更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：エージェントビルダー参照およびフィードバックリンク更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：前提条件と拡張機能参照更新

---

## 2026年4月11日

### 新規レッスン、ドキュメント修正、依存関係アップデート

#### 新規カリキュラムコンテンツ追加

**モジュール 05 - 高度なトピック**
- **レッスン 5.17: MCPを用いた敵対的マルチエージェント推論** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): マルチエージェントシステムの敵対的討論パターンを包括的に解説する新ガイド
  - Mermaid アーキテクチャ図：2つのエージェント → 共通MCPサーバー → 討論記録 → 審判 → 判定
  - Python と TypeScript で実装された共有MCPツールサーバー (`web_search` + `run_python`)
  - 賛成・反対・審判のシステムプロンプト（ツール使用条件を明示）
  - Python、TypeScript、C# による討論オーケストレーター（ラウンド管理と議論ルーティング）
  - MCP `ClientSession` を使用したオーケストレーターの実ツール呼び出し連携
  - 利用ケース一覧（幻覚検出、脅威モデリング、API設計レビュー、事実検証、技術選定）
  - セキュリティ考慮：サンドボックス実行、ツール呼び出し検証、レート制限、監査ログ
  - 3つの実践シナリオで構成された構造化演習（コードレビュー、アーキテクチャ決定、コンテンツモデレーション）

#### ドキュメント修正

**モジュール 03 - はじめに**
- **05-stdio-server/README.md**：不完全だったTypeScript stdioサーバー例を修正 — Pythonおよび.NET例と一致するように、欠落していたトランスポートのインスタンス化 (`new StdioServerTransport()`) および `server.connect(transport)` 呼び出しを追加
- **14-sampling/README.md**：タイプミス修正 — `"Sampling is an davanced features"` を `"Sampling is an advanced feature"` に訂正

#### カリキュラム更新

**メイン README.md**
- レッスン5.17（MCPを用いた敵対的マルチエージェント推論）をカリキュラム表に追加し、新レッスンへの直接リンクを含める

**05-AdvancedTopics/README.md**
- レッスン5.17の行をレッスン表に追加

**study_guide.md**
- 高度なトピックのマインドマップおよび本文説明に敵対的マルチエージェント推論を追加

#### コードおよびセキュリティ修正

**モジュール 05 - 敵対的エージェント (`mcp-adversarial-agents`)**
- **セキュリティ修正 — コマンドインジェクション**：TypeScriptの `run_python` ツールにおいて、コマンドインジェクションの脆弱性を削除するために `execSync` のシェルインターポレーションを `execFile` + `promisify` に置換。LLM制御コードは今後、シェルを介さずリテラルargv要素として渡されるよう変更。
- **MCPツールループ配線**: Pythonディベートオーケストレーターを`AsyncAnthropic`クライアント（同期の`Anthropic`を置換）に更新し、ライブの`ClientSession`を各エージェントターンに直接渡し、各ターンで`session.list_tools()`を通じてツール定義を取得し、モデルが最終テキストを返すまでループで`session.call_tool()`によって`tool_use`ブロックをディスパッチするように変更

#### 依存関係の更新

- `hono`を複数パッケージ（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）で4.12.12にアップデート
- TypeScriptパッケージの`@hono/node-server`を1.19.11から1.19.13にアップデート
- Pythonパッケージ（10-StreamliningAIWorkflows ラボ3および4）の`cryptography`を46.0.5から46.0.7にアップデート
- 10-StreamliningAIWorkflowsのinspectorで`lodash`を4.17.23から4.18.1にアップデート

#### 翻訳

- 最新のソース変更に合わせて48以上の言語の翻訳を同期（i18n更新）

---

## 2026年2月5日

### リポジトリ全体の検証およびナビゲーション改善

#### 新カリキュラムコンテンツ追加

**モジュール03 - はじめに**
- **12-mcp-hosts/README.md**: MCPホスト設定の包括的な新ガイド
  - Claude Desktop、VS Code、Cursor、Cline、Windsurfの設定例
  - 各主要ホスト用のJSON構成テンプレート
  - トランスポートタイプ比較表（stdio、SSE/HTTP、WebSocket）
  - 一般的な接続問題のトラブルシューティング
  - ホスト設定のセキュリティベストプラクティス

- **13-mcp-inspector/README.md**: MCP Inspectorの新しいデバッグガイド
  - インストール方法（npx、npmグローバル、ソースから）
  - stdioおよびHTTP/SSE経由のサーバー接続
  - ツールのテスト、リソース、プロンプトのワークフロー
  - VS Codeとの統合
  - 一般的なデバッグシナリオと解決策

**モジュール04 - 実践的な実装**
- **pagination/README.md**: 新規ページネーション実装ガイド
  - Python、TypeScript、Javaのカーソルベースページネーションパターン
  - クライアントサイドのページネーション処理
  - カーソル設計戦略（不透明 vs. 構造化）
  - パフォーマンス最適化の推奨

**モジュール05 - 上級トピック**
- **mcp-protocol-features/README.md**: 新プロトコル機能の詳細解説
  - 進行状況通知の実装
  - リクエストキャンセルパターン
  - URIパターンを持つリソーステンプレート
  - サーバーライフサイクル管理
  - ロギングレベル制御
  - JSON-RPCコードを使ったエラー処理パターン

#### ナビゲーション修正（24以上のファイル更新）

**メインモジュールのREADME**
 最初のレッスンと次モジュールの両方にリンクを追加

**02-Securityサブファイル**
 5つの補足セキュリティ文書すべてに「次は何？」ナビゲーションを追加

**09-CaseStudyファイル**
 ケーススタディファイルすべてに連続ナビゲーションを追加

**10-StreamliningAIラボ**
 モジュール10の概要およびモジュール11に「次は何？」セクションを追加

#### コードおよびコンテンツ修正

**SDKおよび依存関係の更新**
 空のopenaiバージョンを`^4.95.0`に修正
 SDKを`^1.8.0`から`>=1.26.0`に更新
 mcpバージョンピンを`>=1.26.0`に更新

<strong>コード修正</strong>
 無効なモデル`gpt-4o-mini`を`gpt-4.1-mini`に修正

<strong>コンテンツ修正</strong>
 壊れたリンク`READMEmd`→`README.md`を修正、カリキュラムヘッダー`Module 1-3`→`Module 0-3`を修正、ケース感度のパスを修正
 重複した破損したケーススタディ5のコンテンツを削除

<strong>初心者向け案内強化</strong>
 初心者向けの適切な紹介、学習目標、前提条件を追加

#### カリキュラム更新

**メインREADME.md**
- カリキュラムテーブルに3.12 (MCP Hosts)、3.13 (MCP Inspector)、4.1 (Pagination)、5.16 (Protocol Features)を追加

**モジュールREADME**
 レッスン12と13をレッスンリストに追加
 実践ガイドセクションにページネーションのリンクを追加
 レッスン5.15（カスタムトランスポート）と5.16（プロトコル機能）を追加

**study_guide.md**
 MCP Hostsセットアップ、MCP Inspector、ページネーション戦略、プロトコル機能の深掘りなどのすべての新トピックを含むマインドマップを更新

## 2026年1月28日

### MCP仕様2025-11-25準拠レビュー

#### コアコンセプト強化（01-CoreConcepts/）
- **新クライアントプリミティブ - Roots**: サーバーがファイルシステム境界やアクセス権を理解できるRootsクライアントプリミティブの包括的ドキュメントを追加
- <strong>ツール注釈</strong>: ツール実行の判断材料としての動作注釈（`readOnlyHint`、`destructiveHint`）についての文書を追加
- <strong>サンプリング時のツール呼出し</strong>: サンプリングドキュメントを更新し、サンプリング要求時にモデル駆動でツール呼び出しを行うための`tools`および`toolChoice`パラメーターを追加
- **URLモード呼び出し**: サーバー主導の外部WebインタラクションのためのURLベース呼び出しに関する文書を追加
- **Tasks（実験的）**: 耐久的実行ラッパーと遅延結果取得を実現する実験的機能Tasksの新セクションを追加
- <strong>アイコンサポート</strong>: ツール、リソース、リソーステンプレート、プロンプトが追加メタデータとしてアイコンを含められることを追記

#### ドキュメント更新
- **README.md**: MCP仕様2025-11-25のバージョン参照と日付ベースのバージョニング説明を追加
- **study_guide.md**: カリキュラムマップを更新し、コアコンセプトセクションにTasksとツール注釈を含める。ドキュメントタイムスタンプも更新

#### 仕様準拠検証
- <strong>プロトコルバージョン</strong>: すべての文書が最新のMCP仕様2025-11-25を参照していることを確認
- <strong>アーキテクチャの整合性</strong>: 2層アーキテクチャ（データ層 + トランスポート層）文書の正確性を検証
- <strong>プリミティブ文書</strong>: サーバープリミティブ（リソース、プロンプト、ツール）およびクライアントプリミティブ（サンプリング、呼び出し、ロギング、Roots）を検証
- <strong>トランスポート機構</strong>: STDIOおよびストリーム可能HTTPトランスポートの文書精度を確認
- <strong>セキュリティ指針</strong>: 最新のMCPセキュリティベストプラクティス文書との整合を確認

#### 主なMCP 2025-11-25機能の文書化
- **OpenID Connect Discovery**: 認証サーバー検出機能
- **OAuthクライアントIDメタデータ文書**: 推奨クライアント登録手法
- **JSON Schema 2020-12**: MCPスキーマ定義のデフォルト方言
- **SDKティアリングシステム**: SDK機能サポートとメンテナンス要件の標準化
- <strong>ガバナンス構造</strong>: ワーキンググループおよびインタレストグループの正式化

### セキュリティ文書大幅更新（02-Security/）

#### MCPセキュリティサミットワークショップ（Sherpa）統合
- <strong>新しいハンズオントレーニングリソース</strong>: [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)との包括的統合をすべてのセキュリティ文書に追加
- <strong>遠征ルートカバレッジ</strong>: ベースキャンプからサミットまでの全キャンプ間進行を文書化
- **OWASP整合**: すべてのセキュリティガイダンスがOWASP MCP Azure Security Guideのリスクにマッピングされている

#### OWASP MCP Top 10統合
- <strong>新規セクション</strong>: メインのセキュリティREADMEにOWASP MCP Top 10のセキュリティリスク表とAzureの緩和策を追加
- <strong>リスクベース文書</strong>: mcp-security-controls-2025.mdにOWASP MCPリスク参照（MCP01-MCP08）を更新
- <strong>リファレンスアーキテクチャ</strong>: OWASP MCP Azure Security Guideのリファレンスアーキテクチャおよび実装パターンへのリンクを追加

#### 更新されたセキュリティファイル
- **README.md**: Sherpaワークショップ概要、遠征ルート表、OWASP MCP Top 10リスク概要およびハンズオンセクションを追加
- **mcp-security-controls-2025.md**: ヘッダーを2026年2月に更新、OWASPリスク参照追加、仕様バージョン不整合修正
- **mcp-security-best-practices-2025.md**: SherpaおよびOWASPリソースセクション、タイムスタンプ更新
- **mcp-best-practices.md**: ハンズオンセクションにSherpaとOWASPリンクを追加
- **azure-content-safety-implementation.md**: OWASP MCP06参照、Sherpa Camp 3整合、追加リソースセクションを追加

#### 新規リソースリンク
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 各OWASP MCPリスクページ（MCP01-MCP10）

### カリキュラム全体のMCP仕様2025-11-25整合

#### モジュール03 - はじめに
- **SDKドキュメント**: Go SDKを公式SDKリストに追加、すべてのSDK参照をMCP仕様2025-11-25に合わせて更新
- <strong>トランスポート明確化</strong>: STDIOとHTTPストリーミングトランスポート説明に仕様明記を追加

#### モジュール04 - 実践的実装
- **SDK更新**: Go SDK追加、SDKリストに仕様バージョン参照を追加
- <strong>認可仕様</strong>: MCP認可仕様リンクを2025-11-25版に更新

#### モジュール05 - 上級トピック
- <strong>新機能</strong>: 新MCP仕様2025-11-25の機能（Tasks、ツール注釈、URLモード呼び出し、Roots）についての注記を追加
- <strong>セキュリティリソース</strong>: OWASP MCP Top 10およびSherpaワークショップリンクを追加

#### モジュール06 - コミュニティ貢献
- **SDKリスト**: SwiftおよびRust SDKを追加、仕様リンクを2025-11-25に更新

#### モジュール07 - 早期採用からの教訓
- <strong>リソース更新</strong>: MCP仕様2025-11-25リンクとOWASP MCP Top 10を追加

#### モジュール08 - ベストプラクティス
- <strong>仕様バージョン</strong>: MCP仕様参照を2025-11-25に更新
- <strong>セキュリティリソース</strong>: OWASP MCP Top 10およびSherpaワークショップを追加

#### モジュール10 - AIワークフローの効率化
- <strong>バッジ更新</strong>: MCPバージョンバッジをSDKバージョン（1.9.3）から仕様バージョン（2025-11-25）に変更
- <strong>リソースリンク</strong>: MCP仕様リンクを更新、OWASP MCP Top 10を追加

#### モジュール11 - MCPサーバーハンズオンラボ
- <strong>仕様参照</strong>: MCP仕様リンクを2025-11-25に更新
- <strong>セキュリティリソース</strong>: OWASP MCP Top 10を追加

## 2025年12月18日

### セキュリティ文書更新 - MCP仕様2025-11-25

#### MCPセキュリティベストプラクティス（02-Security/mcp-best-practices.md） - 仕様バージョン更新
- <strong>プロトコルバージョン更新</strong>: 最新のMCP仕様2025-11-25（2025年11月25日リリース）を参照に更新
  - すべての仕様参照を2025-06-18から2025-11-25に更新
  - ドキュメントの日付参照を2025年8月18日から2025年12月18日に更新
  - すべての仕様URLが最新文書を指していることを確認
- <strong>コンテンツ検証</strong>: 最新基準に沿ったセキュリティベストプラクティスの包括的検証
  - **Microsoftセキュリティソリューション**: Prompt Shields（旧「Jailbreakリスク検出」）、Azure Content Safety、Microsoft Entra ID、Azure Key Vaultの現在の用語とリンクを検証
  - **OAuth 2.1セキュリティ**: 最新OAuthセキュリティベストプラクティスとの整合を確認
  - **OWASP基準**: LLM向けOWASP Top 10参照が最新であることを検証
  - **Azureサービス**: すべてのMicrosoft Azure文書リンクとベストプラクティスを検証
- <strong>標準整合</strong>: 参照されているすべてのセキュリティ標準が現行であることを確認
  - NIST AIリスク管理フレームワーク
  - ISO 27001:2022
  - OAuth 2.1セキュリティベストプラクティス
  - Azureセキュリティおよびコンプライアンスフレームワーク
- <strong>実装リソース検証</strong>: すべての実装ガイドリンクとリソースを検証
  - Azure API Management認証パターン
  - Microsoft Entra ID統合ガイド
  - Azure Key Vault秘密管理
  - DevSecOpsパイプラインおよび監視ソリューション

### ドキュメント品質保証
- <strong>仕様準拠</strong>: 最新仕様に沿ったMCPセキュリティ必須要件（MUST/MUST NOT）を確認
- <strong>リソースの最新性</strong>: すべての外部リンク（Microsoft文書、セキュリティ標準、実装ガイド）を検証
- <strong>ベストプラクティスの網羅性</strong>: 認証、認可、AI固有の脅威、サプライチェーンセキュリティ、エンタープライズパターンの包括的カバーを確認

## 2025年10月6日

### はじめにセクション拡張 – 上級サーバー利用とシンプル認証

#### 上級サーバー利用（03-GettingStarted/10-advanced）
- <strong>新章追加</strong>: 通常のサーバーアーキテクチャと低レベルサーバーアーキテクチャの両面を網羅した上級MCPサーバー利用ガイドを導入
  - **通常 vs. 低レベルサーバー**: 両方式の詳細比較とPython、TypeScriptでのコード例
  - <strong>ハンドラベース設計</strong>: スケーラブルで柔軟なサーバー実装のためのハンドラベースのツール／リソース／プロンプト管理説明
  - <strong>実践的パターン</strong>: 低レベルサーバーパターンが高度な機能やアーキテクチャに有効な実際のシナリオ
#### シンプル認証 (03-GettingStarted/11-simple-auth)
- <strong>新章追加</strong>: MCPサーバーでのシンプル認証実装のステップバイステップガイド。
  - <strong>認証の概念</strong>: 認証と認可の違い、資格情報の取り扱いを明確に解説。
  - <strong>基本的な認証実装</strong>: Python（Starlette）とTypeScript（Express）でのミドルウェアベース認証パターン、コードサンプル付き。
  - <strong>高度なセキュリティへの進展</strong>: シンプル認証からOAuth 2.1やRBACへのステップアップ方法、上級セキュリティモジュールへの参照。

これらの追加により、基礎概念と高度な本番運用パターンをつなぐ、より堅牢で安全かつ柔軟なMCPサーバー実装の実践的かつハンズオンなガイダンスを提供します。

## 2025年9月29日

### MCPサーバーデータベース統合ラボ - 総合的ハンズオン学習パス

#### 11-MCPServerHandsOnLabs - 新完全データベース統合カリキュラム
- **包括的13ラボ学習パス**: PostgreSQLデータベース統合による本番対応のMCPサーバー構築の包括的ハンズオンカリキュラムを追加
  - <strong>実世界の実装例</strong>: Zava Retail分析ユースケースで企業グレードのパターンを実演
  - <strong>体系的な学習進行</strong>:
    - **ラボ00-03: 基礎** - 導入、コアアーキテクチャ、セキュリティ＆マルチテナンシー、環境セットアップ
    - **ラボ04-06: MCPサーバー構築** - データベース設計とスキーマ、MCPサーバー実装、ツール開発
    - **ラボ07-09: 高度機能** - セマンティック検索統合、テスト＆デバッグ、VS Code統合
    - **ラボ10-12: 本番導入＆ベストプラクティス** - デプロイ戦略、モニタリング＆可観測性、ベストプラクティス＆最適化
  - <strong>企業技術</strong>: FastMCPフレームワーク、pgvector付きPostgreSQL、Azure OpenAI埋め込み、Azureコンテナアプリ、Application Insights
  - <strong>高度機能</strong>: 行レベルセキュリティ（RLS）、セマンティック検索、マルチテナントデータアクセス、ベクトル埋め込み、リアルタイム監視

#### 用語標準化 - モジュールからラボへの変換
- <strong>包括的ドキュメント更新</strong>: 11-MCPServerHandsOnLabs内のすべてのREADMEファイルを系統的に更新し、「モジュール」表記を「ラボ」表記に変更
  - <strong>セクション見出し</strong>: 全13ラボで「このモジュールが扱う内容」を「このラボが扱う内容」に更新
  - <strong>内容説明</strong>: ドキュメント全体で「本モジュールでは...」を「本ラボでは...」に変更
  - <strong>学習目標</strong>: 「本モジュールの終了時に...」を「本ラボの終了時に...」に更新
  - <strong>ナビゲーションリンク</strong>: 全クロスリファレンスで「Module XX:」を「Lab XX:」に置換
  - <strong>完了追跡</strong>: 「モジュール完了後...」を「ラボ完了後...」に更新
  - <strong>技術参照保持</strong>: 設定ファイル中のPythonモジュール参照（例: `"module": "mcp_server.main"`）は維持

#### 学習ガイド強化 (study_guide.md)
- <strong>カリキュラムマップ可視化</strong>: 新「11. データベース統合ラボ」セクションを追加し、包括的なラボ構成図を掲載
- <strong>リポジトリ構成</strong>: 主要セクションを10から11に更新、詳細な11-MCPServerHandsOnLabs説明を追加
- <strong>学習パス案内</strong>: セクション00-11までのナビゲーション指示を強化
- <strong>技術カバレッジ</strong>: FastMCP、PostgreSQL、Azureサービス統合に関する詳細を追加
- <strong>学習成果</strong>: 本番対応サーバー開発、データベース統合パターン、企業セキュリティを強調

#### メインREADME構成の強化
- <strong>ラボベースの用語統一</strong>: 11-MCPServerHandsOnLabsのメインREADME.mdを「ラボ」構成で一貫使用
- <strong>学習パス構成</strong>: 基礎概念から高度実装、本番導入までの明確な進展を示す
- <strong>実世界重視</strong>: 企業グレードのパターンと技術を用いた実践的ハンズオン学習に重点

### ドキュメント品質・一貫性向上
- <strong>ハンズオン学習の強調</strong>: ドキュメント全体で実践的ラボベースアプローチを強化
- <strong>企業向けパターン重視</strong>: 本番対応実装と企業レベルのセキュリティ要件に重点
- <strong>技術統合</strong>: 最新AzureサービスとAI統合パターンを網羅
- <strong>学習進行</strong>: 基礎から本番導入までの明確で体系的なパスを示す

## 2025年9月26日

### ケーススタディ強化 - GitHub MCP Registry統合

#### ケーススタディ (09-CaseStudy/) - エコシステム開発への焦点
- **README.md**: 包括的GitHub MCP Registryケーススタディで大幅拡充
  - **GitHub MCP Registryケーススタディ**: 2025年9月のGitHub MCP Registry開始に関する詳細ケーススタディを新規追加
    - <strong>問題分析</strong>: 断片化されたMCPサーバー発見と展開課題の詳細解析
    - <strong>ソリューションアーキテクチャ</strong>: GitHubの集中型レジストリ方式とワンクリックVS Codeインストール
    - <strong>ビジネスインパクト</strong>: 開発者オンボーディングと生産性の計測可能な改善
    - <strong>戦略的価値</strong>: モジュラーエージェント展開とツール間相互運用性への注力
    - <strong>エコシステム開発</strong>: エージェント統合の基盤プラットフォームとしての位置付け
  - <strong>ケーススタディ構造強化</strong>: 7件すべてのケーススタディを一貫した書式と包括的説明で更新
    - Azure AI旅行エージェント: マルチエージェントオーケストレーション重視
    - Azure DevOps統合: ワークフロー自動化に焦点
    - リアルタイムドキュメント検索: Pythonコンソールクライアント実装
    - インタラクティブ学習計画生成: Chainlit対話型Webアプリ
    - エディタ内ドキュメント: VS CodeとGitHub Copilot統合
    - Azure API管理: 企業API統合パターン
    - GitHub MCP Registry: エコシステム開発とコミュニティプラットフォーム
  - <strong>包括的結論</strong>: 7件のケーススタディを総括する結論を改訂
    - 企業統合、マルチエージェントオーケストレーション、開発者生産性
    - エコシステム開発、教育用途での分類
    - アーキテクチャパターン、実装戦略、ベストプラクティスへの洞察強化
    - MCPを成熟した本番対応プロトコルとして強調

#### 学習ガイド更新 (study_guide.md)
- <strong>カリキュラムマップ</strong>: GitHub MCP Registryをケーススタディセクションに追加し更新
- <strong>ケーススタディ説明</strong>: 一般的な記述から7件の詳細なケーススタディ内容に強化
- <strong>リポジトリ構成</strong>: セクション10を包括的ケーススタディカバレッジに更新し、具体的実装詳細を反映
- <strong>変更履歴統合</strong>: 2025年9月26日のGitHub MCP Registry追加およびケーススタディ強化の記録を追加
- <strong>日付更新</strong>: フッターの日付を最新の2025年9月26日に更新

### ドキュメント品質向上
- <strong>一貫性強化</strong>: 7件すべてのケーススタディで書式と構造を標準化
- <strong>包括的カバレッジ</strong>: 企業向け、生産性向上、エコシステム開発シナリオを包含
- <strong>戦略的ポジショニング</strong>: MCPをエージェントシステム展開の基盤プラットフォームとして強調
- <strong>リソース統合</strong>: GitHub MCP Registryリンクを含む追加資料を更新

## 2025年9月15日

### 高度トピック拡張 - カスタムトランスポート＆コンテキストエンジニアリング

#### MCPカスタムトランスポート (05-AdvancedTopics/mcp-transport/) - 新高度実装ガイド
- **README.md**: カスタムMCPトランスポートメカニズムの完全実装ガイド
  - **Azure Event Gridトランスポート**: サーバーレスイベント駆動トランスポートの詳細実装
    - C#, TypeScript, PythonのAzure Functions統合サンプル
    - スケーラブルなMCPソリューション向けイベント駆動アーキテクチャパターン
    - Webhook受信とプッシュ型メッセージ処理
  - **Azure Event Hubsトランスポート**: 高スループットストリーミングトランスポート実装
    - 低遅延シナリオに対応したリアルタイムストリーミング機能
    - パーティショニング戦略とチェックポイント管理
    - メッセージバッチ処理とパフォーマンス最適化
  - <strong>企業統合パターン</strong>: 本番対応のアーキテクチャ例
    - 複数Azure Functionsによる分散MCP処理
    - 複数トランスポート併用のハイブリッドアーキテクチャ
    - メッセージ耐久性、信頼性、エラー処理戦略
  - **セキュリティ＆監視**: Azure Key Vault連携と可観測性パターン
    - マネージドID認証と最小権限アクセス
    - Application Insightsによるテレメトリとパフォーマンス監視
    - サーキットブレーカーとフォールトトレラントパターン
  - <strong>テストフレームワーク</strong>: カスタムトランスポートのための包括的テスト戦略
    - テストダブルとモッキングを用いた単体テスト
    - Azure Test Containersによる統合テスト
    - パフォーマンスおよび負荷テストの考慮事項

#### コンテキストエンジニアリング (05-AdvancedTopics/mcp-contextengineering/) - 新興AI分野
- **README.md**: 新興分野としてのコンテキストエンジニアリングの包括的考察
  - <strong>基本原則</strong>: 完全なコンテキスト共有、行動決定認識、コンテキストウィンドウ管理
  - **MCPプロトコルとの整合性**: MCP設計がコンテキストエンジニアリング課題に対応する方法
    - コンテキストウィンドウ制限と漸進的ロード戦略
    - 関連性判定と動的コンテキスト取得
    - マルチモーダルコンテキスト処理とセキュリティ考慮
  - <strong>実装アプローチ</strong>: シングルスレッド対マルチエージェントアーキテクチャ
    - コンテキストチャンク化と優先順位付け手法
    - 漸進的コンテキストロードと圧縮戦略
    - レイヤードコンテキストアプローチと取得最適化
  - <strong>測定フレームワーク</strong>: コンテキスト有効性評価の新興指標
    - 入力効率、パフォーマンス、品質、UX考慮
    - コンテキスト最適化の実験的手法
    - 失敗分析と改善方法論

#### カリキュラムナビゲーション更新 (README.md)
- <strong>モジュール構成強化</strong>: 新高度トピックを含むカリキュラム表を更新
  - コンテキストエンジニアリング（5.14）とカスタムトランスポート（5.15）を追加
  - すべてのモジュールで一貫した書式とナビゲーションリンク
  - 現行内容範囲を反映した説明に更新

### ディレクトリ構造改善
- <strong>命名規則標準化</strong>: 「mcp transport」を他高度トピックフォルダと整合する「mcp-transport」に改名
- <strong>内容整理</strong>: すべての05-AdvancedTopicsフォルダが「mcp-[topic]」命名パターンに準拠

### ドキュメント品質強化
- **MCP仕様整合**: 新規コンテンツはすべてMCP仕様2025-06-18準拠
- <strong>多言語サンプル</strong>: C#, TypeScript, Pythonで包括的コード例提供
- <strong>企業フォーカス</strong>: 本番対応パターンとAzureクラウド統合を全面展開
- <strong>ビジュアルドキュメント</strong>: アーキテクチャとフローのMermaid図を活用

## 2025年8月18日

### ドキュメント包括更新 - MCP 2025-06-18標準対応

#### MCPセキュリティベストプラクティス (02-Security/) - モダン化完全対応
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP仕様2025-06-18に完全準拠した全面書き換え
  - <strong>必須要件</strong>: 公式仕様で明示されたMUST/MUST NOT要件を視覚的指標付きで追加
  - **12の主要セキュリティプラクティス**: 旧15項目リストを再編し、包括的なセキュリティドメインに統合
    - トークンセキュリティ＆認証、外部IDプロバイダー統合
    - セッション管理＆トランスポートセキュリティ、暗号要件
    - AI特有脅威防御、Microsoft Prompt Shields統合
    - アクセス制御＆権限、最小権限原則
    - コンテンツ安全＆監視、Azure Content Safety統合
    - サプライチェーンセキュリティ、コンポーネント検証
    - OAuthセキュリティ＆Confused Deputy防止、PKCE実装
    - インシデント対応＆復旧、自動化支援
    - コンプライアンス＆ガバナンス、規制準拠
    - 高度セキュリティ管理、ゼロトラストアーキテクチャ
    - Microsoftセキュリティエコシステム統合、包括的ソリューション
    - 継続的セキュリティ進化、適応プラクティス
  - **Microsoftセキュリティソリューション**: Prompt Shields、Azure Content Safety、Entra ID、GitHub Advanced Securityの統合強化
  - <strong>実装リソース</strong>: 公式MCP文書、Microsoftセキュリティソリューション、セキュリティ標準、実装ガイド別に包括的リソースリンクを分類収録

#### 高度セキュリティコントロール (02-Security/) - 企業実装対応
- **MCP-SECURITY-CONTROLS-2025.md**: 企業グレードセキュリティフレームワークとして全面刷新
  - **9包括的セキュリティドメイン**: 基本制御から詳細な企業フレームワークへ拡張
    - 高度認証＆認可、Microsoft Entra ID統合
    - トークンセキュリティ＆アンチパススルー制御、包括的バリデーション
    - セッションセキュリティ制御、乗っ取り防止
    - AI特有セキュリティ制御、プロンプトインジェクション・ツール毒性防止
    - Confused Deputy攻撃防止、OAuthプロキシセキュリティ
    - ツール実行セキュリティ、サンドボックス＆分離
    - サプライチェーンセキュリティ制御、依存関係検証
    - 監視＆検出制御、SIEM統合
    - インシデント対応＆復旧、自動化
  - <strong>実装例</strong>: 詳細なYAML設定ブロックとコード例を追加
  - **Microsoftソリューション統合**: Azureセキュリティサービス、GitHub Advanced Security、企業ID管理の包括的カバー

#### 高度トピックセキュリティ (05-AdvancedTopics/mcp-security/) - 本番対応実装
- **README.md**: 企業向けセキュリティ実装向けに完全書き換え
  - <strong>現行仕様準拠</strong>: MCP仕様2025-06-18に基づく必須セキュリティ要件で更新
  - <strong>強化認証</strong>: Microsoft Entra ID統合、包括的な.NETおよびJava Spring Security例
  - **AIセキュリティ統合**: Microsoft Prompt ShieldsとAzure Content Safety実装、詳細なPython例付き
  - <strong>高度脅威緩和</strong>: 
    - Confused Deputy攻撃防止（PKCE、ユーザー同意検証付き）
    - トークンパススルー防止（オーディエンス検証と安全なトークン管理）
    - セッションハイジャック防止（暗号的バインディングと行動分析）
  - <strong>企業セキュリティ統合</strong>: Azure Application Insights監視、脅威検出パイプライン、サプライチェーンセキュリティ
  - <strong>実装チェックリスト</strong>: 明確な必須・推奨セキュリティ制御とMicrosoftセキュリティエコシステムの利点

### ドキュメント品質・標準整合性  

- <strong>仕様参照</strong>: 現行のMCP仕様2025-06-18へのすべての参照を更新  
- **Microsoftセキュリティエコシステム**: すべてのセキュリティドキュメントにわたる統合ガイダンスを強化  
- <strong>実践的実装</strong>: .NET、Java、Pythonにおけるエンタープライズパターンを含む詳細なコード例を追加  
- <strong>リソース整理</strong>: 公式ドキュメント、セキュリティ基準、実装ガイドの包括的な分類  
- <strong>視覚的指標</strong>: 必須要件と推奨プラクティスを明確に区別  

#### コアコンセプト (01-CoreConcepts/) - 完全近代化  
- <strong>プロトコルバージョンアップデート</strong>: 現行MCP仕様2025-06-18を参照するよう更新、日付ベースのバージョニング（YYYY-MM-DD形式）を採用  
- <strong>アーキテクチャの洗練</strong>: 現行MCPアーキテクチャパターンを反映するためホスト、クライアント、サーバーの説明を充実  
  - ホストは複数のMCPクライアント接続を調整するAIアプリケーションとして明確に定義  
  - クライアントは一対一のサーバー関係を維持するプロトコルコネクターとして説明  
  - サーバーはローカルとリモートの展開シナリオを強化  
- <strong>プリミティブの再構成</strong>: サーバー及びクライアントプリミティブを全面的に改訂  
  - サーバープリミティブ: リソース（データソース）、プロンプト（テンプレート）、ツール（実行可能関数）を詳細な説明と例付きで  
  - クライアントプリミティブ: サンプリング（LLM完了）、エリシテーション（ユーザー入力）、ロギング（デバッグ/モニタリング）  
  - 現行の検索（`*/list`）、取得（`*/get`）、実行（`*/call`）メソッドパターンに更新  
- <strong>プロトコルアーキテクチャ</strong>: 二層構造モデルを導入  
  - データ層: JSON-RPC 2.0基盤、ライフサイクル管理およびプリミティブ  
  - トランスポート層: STDIO（ローカル）およびSSE対応のストリーム可能HTTP（リモート）トランスポート機構  
- <strong>セキュリティフレームワーク</strong>: 明示的ユーザー同意、データプライバシー保護、ツール実行安全性、トランスポート層セキュリティを含む包括的なセキュリティ原則  
- <strong>通信パターン</strong>: 初期化、検索、実行、通知フローを示すプロトコルメッセージを更新  
- <strong>コード例</strong>: 現行MCP SDKパターンを反映した多言語例 (.NET, Java, Python, JavaScript) を刷新  

#### セキュリティ (02-Security/) - 包括的なセキュリティ刷新  
- <strong>標準準拠</strong>: MCP仕様2025-06-18のセキュリティ要件に完全準拠  
- <strong>認証の進化</strong>: カスタムOAuthサーバーから外部IDプロバイダー委任（Microsoft Entra ID）への進化を文書化  
- **AI特有の脅威分析**: 最新のAI攻撃ベクトルの解説を強化  
  - 実例付きの詳細なプロンプトインジェクション攻撃シナリオ  
  - ツールポイズニング機構および「ラグプル」攻撃パターン  
  - コンテキストウィンドウポイズニングとモデル混乱攻撃  
- **Microsoft AIセキュリティソリューション**: Microsoftセキュリティエコシステムの包括的カバレッジ  
  - 高度な検出、スポットライト、区切り手法を備えたAIプロンプトシールド  
  - Azure Content Safety 統合パターン  
  - サプライチェーン保護のためのGitHub Advanced Security  
- <strong>高度な脅威緩和</strong>: 詳細なセキュリティコントロールを提示  
  - MCP特有の攻撃シナリオを含むセッションハイジャックと暗号化セッションID要件  
  - MCPプロキシでの混乱代理問題と明示的同意要件  
  - トークンパススルー脆弱性に対する必須検証コントロール  
- <strong>サプライチェーンセキュリティ</strong>: 基盤モデル、埋め込みサービス、コンテキスト提供者、第三者APIを含むAIサプライチェーンの拡充  
- <strong>基盤セキュリティ</strong>: ゼロトラストアーキテクチャやMicrosoftセキュリティエコシステムを含むエンタープライズセキュリティパターンとの連携強化  
- <strong>リソース整理</strong>: 公式ドキュメント、基準、研究、Microsoftソリューション、実装ガイド別にリソースリンクを分類  

### ドキュメント品質向上  
- <strong>構造化された学習目標</strong>: 具体的で実践的な成果を含む学習目標を強化  
- <strong>相互参照</strong>: 関連するセキュリティおよびコアコンセプトトピック間のリンクを追加  
- <strong>最新情報</strong>: すべての日付参照および仕様リンクを現行標準に更新  
- <strong>実装ガイダンス</strong>: 両セクションにわたり特定かつ実践的な実装指針を追加  

## 2025年7月16日

### READMEおよびナビゲーションの改善  
- README.mdのカリキュラムナビゲーションを完全に再設計  
- `<details>`タグをよりアクセシブルなテーブル形式に置換  
- 新たな"alternative_layouts"フォルダに代替レイアウトオプションを作成  
- カード形式、タブ式、アコーディオン式ナビゲーション例を追加  
- すべての最新ファイルを含むリポジトリ構造セクションを更新  
- 「このカリキュラムの使い方」セクションを明確な推奨事項で強化  
- MCP仕様リンクを正しいURLに更新  
- カリキュラム構造にContext Engineeringセクション (5.14) を追加  

### 学習ガイド更新  
- 現行リポジトリ構造に沿うよう学習ガイドを全面改訂  
- MCPクライアントとツール、人気のMCPサーバー用の新セクションを追加  
- 視覚的カリキュラムマップをすべてのトピックに正確に反映  
- 全専門分野をカバーする高度なトピックの説明を強化  
- 実例を反映したケーススタディセクションを更新  
- この包括的な変更履歴を追加  

### コミュニティ貢献 (06-CommunityContributions/)  
- 画像生成用MCPサーバーに関する詳細情報を追加  
- VSCodeでのClaude利用に関する包括的セクションを追加  
- Clineターミナルクライアントのセットアップおよび使用手順を追加  
- 人気のMCPクライアントをすべて含むクライアントセクションを更新  
- より正確なコードサンプルで貢献例を強化  

### 高度なトピック (05-AdvancedTopics/)  
- 一貫した命名規則で専門トピックフォルダーを整理  
- コンテキストエンジニアリング資料と例を追加  
- Foundryエージェント統合ドキュメントを追加  
- Entra IDセキュリティ統合ドキュメントを強化  

## 2025年6月11日

### 初回作成  
- MCP for Beginnersカリキュラムの最初のバージョンをリリース  
- 10の主要セクションの基本構造を作成  
- ナビゲーション用の視覚的カリキュラムマップを実装  
- 複数プログラミング言語での初期サンプルプロジェクトを追加  

### はじめに (03-GettingStarted/)  
- 初期サーバー実装例を作成  
- クライアント開発ガイダンスを追加  
- LLMクライアント統合手順を含む  
- VS Code統合ドキュメントを追加  
- Server-Sent Events (SSE) サーバー例を実装  

### コアコンセプト (01-CoreConcepts/)  
- クライアント・サーバーアーキテクチャの詳細説明を追加  
- 主要なプロトコルコンポーネントに関するドキュメントを作成  
- MCPのメッセージングパターンを文書化  

## 2025年5月23日

### リポジトリ構造  
- 基本フォルダー構造でリポジトリを初期化  
- 各主要セクションのREADMEファイルを作成  
- 翻訳インフラを整備  
- 画像資産と図を追加  

### ドキュメント  
- カリキュラム概要を含む初期README.mdを作成  
- CODE_OF_CONDUCT.mdおよびSECURITY.mdを追加  
- 支援ガイダンス付きSUPPORT.mdを作成  
- 予備的な学習ガイド構造を作成  

## 2025年4月15日

### 計画とフレームワーク  
- MCP for Beginnersカリキュラムの初期計画  
- 学習目標および対象読者を定義  
- カリキュラムの10セクション構成を概要化  
- 例およびケーススタディのための概念的フレームワークを開発  
- 主要コンセプトの初期プロトタイプ例を作成

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->