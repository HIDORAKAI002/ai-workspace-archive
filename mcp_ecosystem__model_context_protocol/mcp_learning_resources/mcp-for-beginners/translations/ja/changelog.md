# 変更履歴: MCP for Beginners カリキュラム

この文書は Model Context Protocol (MCP) for Beginners カリキュラムに対して行われたすべての重要な変更の記録です。変更は逆時系列順（最新の変更が最初）で記録されています。

## 2026年7月2日

### 新しいレッスン: 2026-07-28 MCP仕様リリース候補

2026年7月28日リリース予定の新しい `2026-07-28` MCP仕様リリース候補（2026年5月21日発表）に関する内容を追加しました。内容は[公式発表ブログ投稿](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)から要約しています。カリキュラムの基準は新バージョンがリリースされるまでは引き続き **MCP Specification 2025-11-25** であり、これは既存レッスンの書き換えではなく将来展望として提示されています。

- <strong>新規</strong>: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — ステートレスプロトコルのコア（`initialize`ハンドシェイクと`Mcp-Session-Id`の削除）、新しい`Mcp-Method`/`Mcp-Name`ルーティングヘッダー、`ttlMs`/`cacheScope`キャッシュメタデータ、`_meta`内のW3C Trace Context、正式な拡張フレームワーク（MCP Apps と新しい Tasks 拡張機能）、6つの認可強化SEP、Roots/Sampling/Loggingの非推奨、ツールスキーマのJSON Schema 2020-12完全移行を網羅する完全なレッスン。
- <strong>更新</strong>: 新レッスンへのリンクを含む将来展望の注記を追加しました:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): プロトコルバージョンの注記、Sampling/Roots/Logging/Tasksセクション、「次に来るもの」
  - [02-Security/README.md](./02-Security/README.md): 認可強化の注記
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): ステートレストランスポート注記
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Sampling非推奨の注記
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Logging非推奨とTasks拡張の注記
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): ステートレス/セッションルーティング注記
  - [README.md](./README.md): 仕様セクションの「先を見据えて」注記とカリキュラムモジュール表に新しい`1.1`エントリー
  - [study_guide.md](./study_guide.md): コアコンセプト概要の将来展望の箇条書きと日付付き補遺注記
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): ステートレス要求モデルに先立つ`mcp-session-id`トランスポートマップの注記
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): Root Contexts/Sampling非推奨とTasks拡張のモジュール概要注記
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): 認可強化注記

## 2026年6月24日

### 新しいレッスン: CopilotアプリでのMCPの利用

- [ツーリングセクション](./12-tooling/README.md) ツーリングセクションを追加。
- [CopilotアプリでのMCP](./12-tooling/01-copilot-app/README.md)

## 2026年6月16日

### MCP仕様整合およびサンプル検証

カリキュラムを現行の **MCP Specification 2025-11-25** と最新の公式SDKに対して検証し、残っていた古い仕様参照を修正し、コアサンプルが依然としてビルドと実行が可能であることを確認。

#### 仕様バージョン修正 (2025-06-18 / 2025-03-26 → 2025-11-25)

古い仕様改定が「現在/最新」標準と主張されていた英語内容を更新し、リンクを正規の `modelcontextprotocol.io` 仕様パスに向け直しました:
- **05-AdvancedTopics/mcp-security/README.md**: 「現在の標準」バナー、紹介、コアセキュリティ原則ヘッダー、必須要件ヘッダー、Microsoft Entra IDセクション、参考文献＆リソースリンク、終了セキュリティ通知（8件参照）を2025-11-25に更新
- **05-AdvancedTopics/mcp-transport/README.md**: 追加リソース仕様リンクおよび「現在の標準」バナーを2025-11-25に更新
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: 古い `2025-03-26` セキュリティ＆信頼リンクを現在の2025-11-25セキュリティベストプラクティスページに置換
- **03-GettingStarted/14-sampling/README.md**: 公式Samplingドキュメントリンクを2025-11-25に更新
- **03-GettingStarted/05-stdio-server/README.md**: 現在時制の「現行MCP仕様」参照および追加リソース仕様リンクを2025-11-25に更新（履歴のSSE非推奨注記は正確性のため残す）

#### 最新SDKに対するサンプル検証

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` で `@modelcontextprotocol/sdk@1.29.0` が解決。`tsc --noEmit` は型エラーなしで通過。既存の `McpServer` / `StdioServerTransport` API は有効のまま
- **Python (03-GettingStarted/01-first-server/solution/python)**: 独立した `.venv` で `mcp[cli]` (1.27.2) により検証。`py_compile` 通過、`FastMCP.list_tools()` は正しく `add` と `subtract` ツールを返す
- すべてのサンプルの `@modelcontextprotocol/sdk` バージョン範囲 (`>=1.26.0` / `^1.26.0` / `^1.27.0`) が現在の `1.29.0` に問題なく解決し、API変更なしを確認

#### 依存関係ピンの調整（バージョンギャップの解消）

古くなっていたSDKのピンを更新し、すべてのサンプルが現行MCPリリースを追跡するようにし、リポジトリ全体の慣例に合わせました:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` を `^1.8.0` → `>=1.26.0` に更新し、古い「MCP 2025-06-18向けの更新」パッケージ説明を「MCP Specification 2025-11-25に合わせて調整」に変更
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** と **lab4/code/github_mcp_server/pyproject.toml**: 正確なピン `mcp==1.23.0` → `mcp>=1.26.0` に更新。両方の `uv.lock` ファイルを再生成 (`uv lock`) し、ロックファイルが最新の `mcp 1.27.2` に解決しマニフェストと同期するように

#### カリキュラムギャップ分析 — 最新仕様機能カバレッジ

カリキュラムはすでにMCP 2025-11-25で導入または拡張されたすべてのプリミティブをカバーしていることを確認し、内容のギャップはありません:
- **Sampling**: レッスン 03-GettingStarted/14-sampling と 05-AdvancedTopics/mcp-sampling
- **Elicitation（URLモード含む）**: 01-CoreConcepts と 05-AdvancedTopics/mcp-protocol-features に記載
- **Roots**: 00-Introduction、01-CoreConcepts、05-AdvancedTopics/mcp-root-contexts に記載
- **Tasks（実験的、長時間実行操作）**: 01-CoreConcepts と 05-AdvancedTopics/mcp-protocol-features に記載
- <strong>ツール注釈</strong> (`readOnlyHint` / `destructiveHint`): 01-CoreConcepts と 05-AdvancedTopics/mcp-protocol-features に記載

### セキュリティ強化および依存性脆弱性の修正

すべての依存マニフェストとサンプルソースコードに対しフルのセキュリティパスを実施し、報告されたすべてのnpmアドバイザリと1コードレベルの指摘を修正。修正後は `npm audit` が監査対象ディレクトリすべてで **0脆弱性** を報告。

#### npm依存脆弱性（トランジティブ） — 修正済み

コミット済みの15個の `package-lock.json` ファイルをすべて監査。脆弱性はMCP Inspector開発ツール、OpenAIクライアント、およびMCP SDKのトランジティブ依存関係に限定、すべてはサンプルを壊すことなく解決済み:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** と **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`) を更新、バンドルされた `ajv`、`brace-expansion`、`diff`、`path-to-regexp`、`ws` のアドバイザリを解消。`concurrently` による残るクリティカルなアドバイザリを排除するために修正済み `shell-quote@1.8.4` を強制するnpm `overrides` エントリを追加。両ロックファイルを再生成し（現在0脆弱性）
- **03-GettingStarted/samples/typescript**: `npm audit fix` によりトランジティブ依存の `qs` (moderate) を修正済みリリースに更新
- **03-GettingStarted/samples/javascript**: `npm audit fix` によりトランジティブ依存の `hono` (moderate) を修正済みリリースに更新
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` によりトランジティブ依存の `form-data` (high) を修正済みリリースに更新
- **03-GettingStarted/11-simple-auth/solution/typescript**: プロジェクトの再現性と監査可能性のために欠落していた `package-lock.json` を生成（0脆弱性）

#### コードレベルのセキュリティ修正（OWASP A03: インジェクション）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `open_in_vscode` ツールから `shell=True` を削除。以前は `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` がシェルのメタ文字を `cmd.exe` により解釈し（コマンドインジェクションのベクトル）、現在は直接解決済み `Code.exe` を引数付きで起動—シェルは不要—で機能的に同等かつ安全

#### Python依存性監査

- すべてのPython requirementsセットに `pip-audit` を実行。`05-AdvancedTopics` と `03-GettingStarted/samples/python` は <strong>既知の脆弱性なし</strong> を報告（`mcp` / `httpx` / `pydantic` / `python-dotenv` 範囲は現行の修正済リリースを解決）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` はトランジティブ依存の **`werkzeug` 3.1.1** に3件の `safe_join` Windowsデバイス名DoSアドバイザリ（`CVE-2025-66221`, `CVE-2026-21860`, `CVE-2026-27199` すべて3.1.6で修正）を報告。明示的なセキュリティピン `werkzeug>=3.1.6` を追加し修正済リリースを解決。`chainlit` / `mcp` / `semantic-kernel` スタックで制約が正しく解決することを確認

### 製品名称のリブランディング

Microsoftの製品リブランディングに合わせてカリキュラムのすべての内容を更新しました:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discordコミュニティリンクを更新
- **AGENTS.md**: Discordサーバー参照を更新
- **README.md**: 技術エコシステム参照を更新
- **study_guide.md**: ケーススタディ参照を更新
- **05-AdvancedTopics/README.md**: モジュール5.13のタイトルと説明を更新
- **05-AdvancedTopics/mcp-integration/README.md**: セクションヘッダーと説明を更新
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: 完全なモジュールタイトルと内容の更新
- **05-AdvancedTopics/mcp-security-entra/README.md**: クロスリファレンスリンクを更新
- **07-LessonsfromEarlyAdoption/README.md**: ケーススタディ参照を更新
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: セクション9のヘッダー、バッジ、能力を更新
- **08-BestPractices/README.md**: Discordコミュニティリンクを更新
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discordチャンネル参照を更新
- **09-CaseStudy/docs-mcp/solution/python/README.md**: モデル展開参照を更新
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AIサービスのテーブルを更新
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: リソース参照を更新

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code

- **README.md**: 主なカリキュラム参照を更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: モジュールタイトル、概要、すべてのモジュールヘッダーを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: タイトル、学習目標、セットアップ手順、リソースを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: タイトル、学習目標、MCPホスト表、および相互参照を更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: タイトル、バッジ、前提条件、リソースを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Agent Builder参照とフィードバックリンクを更新
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: 前提条件と拡張参照を更新

---

## 2026年4月11日

### 新規レッスン、ドキュメント修正、依存関係の更新

#### 新しいカリキュラムコンテンツ追加

**モジュール05 - 高度なトピック**
- **レッスン 5.17: MCPを用いた敵対的マルチエージェント推論** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): マルチエージェントシステムの敵対的討論パターンを網羅した新しいガイド
  - Mermaidアーキテクチャ図: 2つのエージェント → 共有MCPサーバー → 討論記録 → 審判 → 評決
  - PythonおよびTypeScriptで実装された共有MCPツールサーバー（`web_search` + `run_python`）
  - 相反するシステムプロンプト（賛成/反対/審判）と明示的なツール使用要件
  - Python、TypeScript、C#による討論オーケストレーターでラウンド管理と論点ルーティング
  - MCPの`ClientSession`ワイヤリングをオーケストレーターで実際のツール呼び出しに接続
  - 利用例テーブル（幻覚検出、脅威モデリング、API設計レビュー、事実検証、技術選定）
  - セキュリティ考慮事項：サンドボックス実行、ツール呼び出し検証、レート制限、監査ログ
  - 3つの実用的なシナリオを含む構造化演習（コードレビュー、アーキテクチャ決定、コンテンツモデレーション）

#### ドキュメント修正

**モジュール03 - はじめに**
- **05-stdio-server/README.md**: 未完成のTypeScript stdioサーバー例を修正 — 同セクションのPythonおよび.NET例と一致させるために、欠落していたトランスポートインスタンス（`new StdioServerTransport()`）および`server.connect(transport)`呼び出しを追加
- **14-sampling/README.md**: タイポ修正 — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### カリキュラム更新

**メインREADME.md**
- カリキュラム表にエントリ5.17（MCPを用いた敵対的マルチエージェント推論）を新規追加し、新しいレッスンへの直接リンクを設置

**05-AdvancedTopics/README.md**
- レッスン5.17行をレッスン表に追加

**study_guide.md**
- 高度なトピックのマインドマップと解説に敵対的マルチエージェント推論トピックを追加

#### コードおよびセキュリティ修正

**モジュール05 - 敵対的エージェント (`mcp-adversarial-agents`)**
- **セキュリティ修正 — コマンドインジェクション**: TypeScriptの`run_python`ツールで、`execSync`のシェル補間を`execFile` + `promisify`に置換し、コマンドインジェクションの脆弱性を排除（LLM制御のコードは、シェル介入なしのリテラルargv要素として渡されるように）
- **MCPツールループのワイヤリング**: Python討論オーケストレーターを更新し、ブロッキング同期の`Anthropic`から非同期`AsyncAnthropic`クライアントへ切替、各エージェントターンにライブの`ClientSession`を直接渡し、各ターンで`session.list_tools()`からツール定義を取得し、モデルが最終テキスト応答を生成するまで`session.call_tool()`をループで呼び出し

#### 依存関係の更新

- 複数パッケージ（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）で`hono`を4.12.12にアップデート
- TypeScriptパッケージの`@hono/node-server`を1.19.11から1.19.13にアップデート
- Pythonパッケージ（10-StreamliningAIWorkflowsラボ3と4）で`cryptography`を46.0.5から46.0.7にアップデート
- 10-StreamliningAIWorkflowsインスペクターで`lodash`を4.17.23から4.18.1にアップデート

#### 翻訳

- 最新のソース変更に合わせて48以上の言語の翻訳を同期（i18n更新）

---

## 2026年2月5日

### リポジトリ全体の検証とナビゲーション改善

#### 新しいカリキュラムコンテンツ追加

**モジュール03 - はじめに**
- **12-mcp-hosts/README.md**: MCPホストセットアップの包括的ガイド新規追加
  - Claude Desktop、VS Code、Cursor、Cline、Windsurfの設定例
  - 主要ホストすべてのJSON設定テンプレート
  - トランスポート種別比較表（stdio、SSE/HTTP、WebSocket）
  - 一般的な接続問題のトラブルシューティング
  - ホスト構成のセキュリティベストプラクティス

- **13-mcp-inspector/README.md**: MCPインスペクターの新規デバッグガイド
  - インストール方法（npx、npmグローバル、ソースから）
  - stdioおよびHTTP/SSE経由のサーバー接続
  - テストツール、リソース、プロンプトのワークフロー
  - VS Codeとの統合
  - よくあるデバッグシナリオと解決策

**モジュール04 - 実践的実装**
- **pagination/README.md**: 新規ページネーション実装ガイド
  - Python、TypeScript、Javaにおけるカーソルベースページネーションパターン
  - クライアント側のページネーション処理
  - カーソル設計戦略（不透明vs.構造化）
  - パフォーマンス最適化推奨事項

**モジュール05 - 高度なトピック**
- **mcp-protocol-features/README.md**: 新規プロトコル機能深堀
  - 進捗通知の実装
  - リクエストキャンセルパターン
  - URIパターンを用いたリソーステンプレート
  - サーバーライフサイクル管理
  - ロギングレベル制御
  - JSON-RPCコードによるエラーハンドリングパターン

#### ナビゲーション修正（24以上のファイルを更新）

**メインモジュールREADME**
 最初のレッスンと次のモジュールの両方へのリンクを追加

**02-Securityサブファイル**
- 5つすべての補助セキュリティ文書に「次は何？」ナビゲーションを追加

**09-CaseStudyファイル**
- すべてのケーススタディファイルに連続ナビゲーションを追加

**10-StreamliningAI Labs**
モジュール10の概要とモジュール11に「次は何？」セクションを追加

#### コードおよびコンテンツ修正

**SDKおよび依存関係更新**
openaiの空バージョンを`^4.95.0`に修正
SDKを`^1.8.0`から`>=1.26.0`に更新
mcpのバージョンピンを`>=1.26.0`に更新

<strong>コード修正</strong>
不正なモデル`gpt-4o-mini`を`gpt-4.1-mini`に修正

<strong>コンテンツ修正</strong>
壊れたリンク`READMEmd`→`README.md`を修正、カリキュラムヘッダー`Module 1-3`→`Module 0-3`を修正、大文字小文字区別のパスを修正
重複した破損ケーススタディ5コンテンツを削除

<strong>初心者向けガイダンス改善</strong>
初心者向けに適切な導入、学習目標、前提条件を追加

#### カリキュラム更新

**メインREADME.md**
- カリキュラム表にエントリ3.12（MCPホスト）、3.13（MCPインスペクター）、4.1（ページネーション）、5.16（プロトコル機能）を追加

**モジュールREADME**
レッスン12と13をレッスンリストに追加
実践ガイドセクションにページネーションリンクを追加
レッスン5.15（カスタムトランスポート）と5.16（プロトコル機能）を追加

**study_guide.md**
- 新トピック（MCPホストセットアップ、MCPインスペクター、ページネーション戦略、プロトコル機能深堀）をすべて追加してマインドマップを更新

## 2026年1月28日

### MCP仕様 2025-11-25 適合レビュー

#### コアコンセプト強化 (01-CoreConcepts/)
- **新しいクライアントプリミティブ - Roots**: サーバーがファイルシステム境界とアクセス権を理解できるようにするRootsクライアントプリミティブの詳細ドキュメントを追加
- <strong>ツール注釈</strong>: ツール実行の意思決定を改善するためのツール動作注釈（`readOnlyHint`、`destructiveHint`）のドキュメントを追加
- <strong>サンプリングにおけるツール呼び出し</strong>: モデル駆動ツール呼び出しのための`tools`および`toolChoice`パラメーターを含むサンプリングドキュメントを更新
- **URLモード誘発**: サーバー主導の外部WebインタラクションのためのURLベース誘発のドキュメントを追加
- **タスク（実験的）**: 耐久的実行ラッパーと遅延結果取得のための実験的タスク機能に関する新しいセクションを追加
- <strong>アイコン対応</strong>: ツール、リソース、リソーステンプレート、プロンプトでアイコンを追加メタデータとして含めることが可能であることを記載

#### ドキュメント更新
- **README.md**: MCP仕様2025-11-25バージョン参照と日付ベースのバージョン管理説明を追加
- **study_guide.md**: コアコンセプトセクションにタスクとツール注釈を含めるようにカリキュラムマップを更新、文書のタイムスタンプも更新

#### 仕様適合検証
- <strong>プロトコルバージョン</strong>: すべてのドキュメントが現在のMCP仕様2025-11-25に準拠していることを検証
- <strong>アーキテクチャ調整</strong>: 2層アーキテクチャ（データ層＋トランスポート層）の文書の正確性を確認
- <strong>プリミティブドキュメント</strong>: サーバープリミティブ（リソース、プロンプト、ツール）とクライアントプリミティブ（サンプリング、誘発、ロギング、Roots）を検証
- <strong>トランスポート機構</strong>: STDIOおよびストリーミングHTTPトランスポート文書の正確性を確認
- <strong>セキュリティ指針</strong>: 現行MCPセキュリティベストプラクティス文書との整合性を確認

#### 主要MCP 2025-11-25の機能文書化
- **OpenID Connectディスカバリー**: OIDCによる認証サーバーのディスカバリー
- **OAuthクライアントIDメタデータ文書**: 推奨されるクライアント登録メカニズム
- **JSON Schema 2020-12**: MCPスキーマ定義のデフォルト方言
- **SDKの階層システム**: SDK機能サポートとメンテナンスの正式要件
- <strong>ガバナンス構造</strong>: MCPガバナンスにおけるワーキンググループおよびインタレストグループの正式化

### セキュリティ文書の大幅更新 (02-Security/)

#### MCPセキュリティサミットワークショップ（Sherpa）統合
- <strong>新しいハンズオントレーニングリソース</strong>: 全てのセキュリティドキュメントにわたる[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)との包括的統合を追加
- <strong>航路カバー</strong>: ベースキャンプからサミットまでの完全なキャンプ間進行を文書化
- **OWASP整合性**: すべてのセキュリティ指針をOWASP MCP Azure Security Guideのリスクにマッピング

#### OWASP MCPトップ10統合
- <strong>新セクション</strong>: OWASP MCPトップ10セキュリティリスクの表とAzureによる軽減策をメインのセキュリティREADMEに追加
- <strong>リスクベースの文書化</strong>: 各セキュリティドメインのOWASP MCPリスク参照をmcp-security-controls-2025.mdに更新
- <strong>リファレンスアーキテクチャ</strong>: OWASP MCP Azure Security Guideのリファレンスアーキテクチャおよび実装パターンへのリンクを追加

#### 更新されたセキュリティファイル
- **README.md**: Sherpaワークショップ概要、航路表、OWASP MCPトップ10リスクサマリー、ハンズオントレーニングセクションを追加
- **mcp-security-controls-2025.md**: ヘッダーを2026年2月に更新、OWASPリスク参照（MCP01-MCP08）を追加、仕様バージョンの不整合を修正
- **mcp-security-best-practices-2025.md**: SherpaおよびOWASPリソースセクションを追加、タイムスタンプ更新
- **mcp-best-practices.md**: SherpaおよびOWASPリンクを含むハンズオントレーニングセクションを追加
- **azure-content-safety-implementation.md**: OWASP MCP06参照、Sherpaキャンプ3との整合、および追加リソースセクションを追加

#### 新しいリソースリンク追加
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 個別のOWASP MCPリスクページ（MCP01-MCP10）

### カリキュラム全体のMCP仕様2025-11-25整合

#### モジュール03 - はじめに
- **SDKドキュメント**: Go SDKを公式SDKリストに追加、すべてのSDK参照をMCP仕様2025-11-25に合わせて更新
- <strong>トランスポートの明確化</strong>: STDIOおよびHTTPストリーミングトランスポート説明を明示的な仕様参照付きで更新

#### モジュール04 - 実践的実装
- **SDK更新**: Go SDKを追加し、仕様バージョン参照を含めてSDKリストを更新
- <strong>認可仕様</strong>: MCP認可仕様リンクを最新の2025-11-25バージョンに更新

#### モジュール05 - 高度なトピック
- <strong>新機能</strong>: MCP仕様2025-11-25の新機能（タスク、ツール注釈、URLモード誘発、Roots）についての注記を追加
- <strong>セキュリティリソース</strong>: OWASP MCPトップ10およびSherpaワークショップのリンクを追加

#### モジュール06 - コミュニティ貢献
- **SDKリスト**: SwiftおよびRust SDKを追加、仕様リンクを2025-11-25に更新
- <strong>仕様参照</strong>: MCP仕様リンクを直接の仕様URLに更新

#### モジュール07 - 初期採用からの教訓

- <strong>リソースの更新</strong>: MCP仕様2025-11-25のリンクとOWASP MCP Top 10を追加リソースに追加

#### モジュール08 - ベストプラクティス
- <strong>仕様バージョン</strong>: MCP仕様の参照を2025-11-25に更新
- <strong>セキュリティリソース</strong>: OWASP MCP Top 10とSherpaワークショップを追加リファレンスに追加

#### モジュール10 - AIワークフローの効率化
- <strong>バッジ更新</strong>: MCPバージョンバッジをSDKバージョン(1.9.3)から仕様バージョン(2025-11-25)へ変更
- <strong>リソースリンク</strong>: MCP仕様のリンクを更新；OWASP MCP Top 10を追加

#### モジュール11 - MCPサーバーハンズオンラボ
- <strong>仕様参照</strong>: MCP仕様リンクを2025-11-25バージョンに更新
- <strong>セキュリティリソース</strong>: OWASP MCP Top 10を公式リソースに追加

## 2025年12月18日

### セキュリティドキュメント更新 - MCP仕様 2025-11-25

#### MCPセキュリティベストプラクティス (02-Security/mcp-best-practices.md) - 仕様バージョン更新
- <strong>プロトコルバージョン更新</strong>: 最新MCP仕様2025-11-25（2025年11月25日リリース）を参照に更新
  - すべての仕様バージョン参照を2025-06-18から2025-11-25に更新
  - ドキュメントの日付参照を2025年8月18日から2025年12月18日に更新
  - すべての仕様URLが現行ドキュメントを指していることを確認
- <strong>内容の検証</strong>: 最新標準に基づくセキュリティベストプラクティスの包括的検証
  - **Microsoftセキュリティソリューション**: Prompt Shields（旧「Jailbreakリスク検出」）、Azure Content Safety、Microsoft Entra ID、Azure Key Vaultの最新用語およびリンクを検証
  - **OAuth 2.1セキュリティ**: 最新OAuthセキュリティベストプラクティスとの整合を確認
  - **OWASP標準**: LLM向けOWASP Top 10の参照が最新であることを検証
  - **Azureサービス**: すべてのMicrosoft Azureドキュメントリンクとベストプラクティスを検証
- <strong>標準との整合</strong>: 参照するすべてのセキュリティ標準が最新であることを確認
  - NIST AIリスク管理フレームワーク
  - ISO 27001:2022
  - OAuth 2.1セキュリティベストプラクティス
  - Azureセキュリティおよびコンプライアンスフレームワーク
- <strong>実装リソース</strong>: すべての実装ガイドリンクとリソースを検証
  - Azure API Management認証パターン
  - Microsoft Entra ID統合ガイド
  - Azure Key Vaultのシークレット管理
  - DevSecOpsパイプラインと監視ソリューション

### ドキュメント品質保証
- <strong>仕様準拠</strong>: 最新仕様に沿ってすべての必須MCPセキュリティ要件（MUST/MUST NOT）を確認
- <strong>リソースの現況確認</strong>: Microsoftドキュメント、セキュリティ標準、実装ガイドへのすべての外部リンクを検証
- <strong>ベストプラクティスの網羅性</strong>: 認証、認可、AI特有の脅威、サプライチェーンセキュリティ、エンタープライズパターンを包括的にカバーしていることを確認

## 2025年10月6日

### はじめにセクション拡充 – 高度なサーバー利用とシンプル認証

#### 高度なサーバー利用 (03-GettingStarted/10-advanced)
- <strong>新章追加</strong>: 正規および低レベルサーバーアーキテクチャを網羅した高度なMCPサーバー利用の包括的ガイドを導入
  - **正規サーバー vs 低レベルサーバー**: 両アプローチの詳細比較とPython・TypeScriptのコード例
  - <strong>ハンドラーベース設計</strong>: 拡張性と柔軟性を持つサーバー実装のためのハンドラーベースのツール/リソース/プロンプト管理の説明
  - <strong>実用的なパターン</strong>: 高度な機能やアーキテクチャに役立つ低レベルサーバーパターンの実例

#### シンプル認証 (03-GettingStarted/11-simple-auth)
- <strong>新章追加</strong>: MCPサーバーにおけるシンプル認証実装のステップバイステップガイド
  - <strong>認証概念</strong>: 認証と認可の明快な説明と資格情報管理
  - <strong>基本認証実装</strong>: Python（Starlette）とTypeScript（Express）のミドルウェアベース認証パターンのコードサンプル付き
  - <strong>高度なセキュリティへの進展</strong>: シンプル認証からOAuth 2.1やRBACへの段階的ガイダンス、上級セキュリティモジュールへの参照

これらの追加により、基礎概念から高度な実運用パターンまで橋渡しする、より堅牢で安全かつ柔軟なMCPサーバー実装の実践的手引きを提供

## 2025年9月29日

### MCPサーバーデータベース統合ラボ - 包括的ハンズオン学習パス

#### 11-MCPServerHandsOnLabs - 新完全データベース統合カリキュラム
- **完全な13ラボ学習パス**: PostgreSQLデータベース統合による本番対応MCPサーバー構築の包括的ハンズオンカリキュラムを追加
  - <strong>実務的実装例</strong>: エンタープライズレベルのZava Retail分析ユースケース
  - <strong>体系的学習進行</strong>:
    - **ラボ00-03: 基礎** - イントロダクション、コアアーキテクチャ、セキュリティとマルチテナンシー、環境設定
    - **ラボ04-06: MCPサーバー構築** - データベース設計とスキーマ、MCPサーバー実装、ツール開発
    - **ラボ07-09: 高度機能** - セマンティックサーチ統合、テストとデバッグ、VS Code統合
    - **ラボ10-12: 本番運用とベストプラクティス** - 展開戦略、監視と可観測性、ベストプラクティスと最適化
  - <strong>企業技術</strong>: FastMCPフレームワーク、pgvector対応PostgreSQL、Azure OpenAI埋め込み、Azure Container Apps、Application Insights
  - <strong>高度機能</strong>: 行レベルセキュリティ(RLS)、セマンティックサーチ、マルチテナントデータアクセス、ベクトル埋め込み、リアルタイム監視

#### 用語標準化 - モジュールからラボへの変換
- <strong>包括的ドキュメント更新</strong>: 11-MCPServerHandsOnLabsのすべてのREADMEファイルで「モジュール」用語を「ラボ」に体系的に変更
  - <strong>セクション見出し</strong>: すべての13ラボで「このモジュールがカバーする内容」を「このラボがカバーする内容」に更新
  - <strong>内容説明</strong>: ドキュメント全体で「このモジュールは...」を「このラボは...」に変更
  - <strong>学習目標</strong>: 「このモジュールの終了時に...」を「このラボの終了時に...」に更新
  - <strong>ナビゲーションリンク</strong>: クロスリファレンスとナビゲーションのすべての「モジュールXX:」を「ラボXX:」に変換
  - <strong>完了追跡</strong>: 「このモジュールを完了した後...」を「このラボを完了した後...」に更新
  - <strong>技術的参照の保持</strong>: 設定ファイル内のPythonモジュール参照（例:`"module": "mcp_server.main"`）は維持

#### スタディガイド強化 (study_guide.md)
- <strong>視覚的カリキュラムマップ</strong>: 包括的ラボ構造の可視化付きで新セクション「11. データベース統合ラボ」を追加
- <strong>リポジトリ構造</strong>: 10から11のメインセクションに更新、詳細な11-MCPServerHandsOnLabs説明を追加
- <strong>学習パス案内</strong>: セクション00-11のナビゲーション指示を強化
- <strong>技術カバレッジ</strong>: FastMCP、PostgreSQL、Azureサービス統合の詳細を追加
- <strong>学習成果</strong>: 本番対応サーバー開発、データベース統合パターン、エンタープライズセキュリティを強調

#### メインREADME構造強化
- <strong>ラボベース用語</strong>: 11-MCPServerHandsOnLabs内のmain README.mdを一貫して「ラボ」構造に更新
- <strong>学習パス構成</strong>: 基礎概念から高度実装、本番展開へ明確な進行を示す
- <strong>実務重視</strong>: エンタープライズグレードのパターンおよび技術を用いた実践的ハンズオン学習を強調

### ドキュメント品質と一貫性の向上
- <strong>ハンズオン学習強調</strong>: ドキュメント全体で実践的ラボベースのアプローチを強化
- <strong>エンタープライズパターン重視</strong>: 本番対応実装とエンタープライズセキュリティ考慮点を強調
- <strong>技術統合</strong>: 先進的なAzureサービスおよびAI統合パターンの包括的カバー
- <strong>学習進行度</strong>: 基礎から本番展開までの明確で体系的な学習パス

## 2025年9月26日

### ケーススタディ拡充 - GitHub MCPレジストリ統合

#### ケーススタディ (09-CaseStudy/) - エコシステム開発に注力
- **README.md**: 包括的なGitHub MCPレジストリケーススタディで大幅拡充
  - **GitHub MCPレジストリケーススタディ**: 2025年9月のGitHub MCPレジストリ立ち上げを詳細に分析
    - <strong>課題分析</strong>: 分散したMCPサーバー検出および展開課題の詳細検証
    - <strong>解決策アーキテクチャ</strong>: GitHubの一元管理レジストリ方式およびワンクリックVS Codeインストール
    - <strong>ビジネス影響</strong>: 開発者オンボーディングと生産性の測定可能な改善
    - <strong>戦略的価値</strong>: モジュール式エージェント展開とクロスツール相互運用性に注目
    - <strong>エコシステム開発</strong>: エージェンシック統合の基盤プラットフォームとしての位置づけ
  - <strong>ケーススタディ構造の強化</strong>: 7つのケーススタディすべてをフォーマットと詳細な説明で更新
    - Azure AI旅行エージェント: マルチエージェントオーケストレーション重視
    - Azure DevOps統合: ワークフロー自動化に焦点
    - リアルタイムドキュメント取得: Pythonコンソールクライアント実装
    - インタラクティブ学習プランジェネレーター: Chainlit対話型ウェブアプリ
    - エディタ内ドキュメント: VS CodeとGitHub Copilot統合
    - Azure API Management: エンタープライズAPI統合パターン
    - GitHub MCPレジストリ: エコシステム開発とコミュニティプラットフォーム
  - <strong>包括的結論</strong>: 複数のMCP実装領域に跨る7つのケーススタディを強調した結論部を改訂
    - エンタープライズ統合、マルチエージェントオーケストレーション、開発者生産性
    - エコシステム開発、教育用途のカテゴライズ
    - アーキテクチャパターン、実装戦略、ベストプラクティスへの強化された洞察
    - MCPを成熟した本番対応プロトコルとして強調

#### スタディガイド更新 (study_guide.md)
- <strong>視覚的カリキュラムマップ</strong>: ケーススタディセクションにGitHub MCPレジストリを含めるためマインドマップを更新
- <strong>ケーススタディ説明</strong>: 一般的な説明から7件の詳細なケーススタディ解説へ強化
- <strong>リポジトリ構造</strong>: セクション10を包括的なケーススタディ範囲と具体的実装詳細に更新
- <strong>変更履歴統合</strong>: 2025年9月26日のGitHub MCPレジストリ追加およびケーススタディ拡充のエントリを追加
- <strong>日付更新</strong>: フッターのタイムスタンプを最新改訂日(2025年9月26日)に更新

### ドキュメント品質向上
- <strong>一貫性向上</strong>: 7件すべてのケーススタディでフォーマットと構造を標準化
- <strong>包括的カバー</strong>: 企業、開発者生産性、エコシステム開発シナリオにまたがるケーススタディ
- <strong>戦略的ポジショニング</strong>: MCPをエージェンシックシステム展開の基盤プラットフォームとして強調
- <strong>リソース統合</strong>: 追加リソースにGitHub MCPレジストリのリンクを更新

## 2025年9月15日

### 上級トピック拡張 - カスタムトランスポートとコンテキストエンジニアリング

#### MCPカスタムトランスポート (05-AdvancedTopics/mcp-transport/) - 新上級実装ガイド
- **README.md**: カスタムMCPトランスポートメカニズムの完全実装ガイド
  - **Azure Event Gridトランスポート**: 包括的なサーバーレスイベント駆動トランスポート実装
    - C#、TypeScript、Python例とAzure Functions統合
    - スケーラブルなMCPソリューションのイベント駆動アーキテクチャパターン
    - Webhookレシーバーおよびプッシュベースメッセージ処理
  - **Azure Event Hubsトランスポート**: 高スループットストリーミングトランスポート実装
    - 低レイテンシシナリオ向けのリアルタイムストリーミング機能
    - パーティショニング戦略およびチェックポイント管理
    - メッセージバッチ処理とパフォーマンス最適化
  - <strong>企業統合パターン</strong>: 本番運用例のアーキテクチャ
    - 複数のAzure Functionsに分散するMCP処理
    - 複数トランスポートタイプを組み合わせたハイブリッドトランスポートアーキテクチャ
    - メッセージの耐久性、信頼性、エラー処理戦略
  - <strong>セキュリティと監視</strong>: Azure Key Vault統合と可観測性パターン
    - マネージドID認証と最小権限アクセス
    - Application Insightsによるテレメトリとパフォーマンス監視
    - サーキットブレーカーとフォールトトレラントパターン
  - <strong>テストフレームワーク</strong>: カスタムトランスポートのための包括的テスト戦略
    - テストダブルとモッキングフレームワークによるユニットテスト
    - Azure Test Containersを用いた統合テスト
    - パフォーマンスおよび負荷テストの考慮事項

#### コンテキストエンジニアリング (05-AdvancedTopics/mcp-contextengineering/) - 新興AI分野
- **README.md**: 新興分野としてのコンテキストエンジニアリングの包括的探求
  - <strong>コア原則</strong>: 完全なコンテキスト共有、行動決定の意識、コンテキストウィンドウ管理
  - **MCPプロトコルとの整合**: MCP設計によるコンテキストエンジニアリング課題への対応方法
    - コンテキストウィンドウ制限と段階的ロード戦略
    - 関連性判定と動的コンテキスト取得
    - マルチモーダルコンテキスト処理とセキュリティ考慮
  - <strong>実装アプローチ</strong>: シングルスレッド対マルチエージェントアーキテクチャ
    - コンテキストチャンク分割と優先順位付け技術
    - 段階的コンテキストロードと圧縮戦略
    - 層状コンテキストアプローチおよび取得最適化
  - <strong>測定フレームワーク</strong>: コンテキスト有効性評価の新指標
    - 入力効率、パフォーマンス、品質、ユーザー体験の考慮
    - コンテキスト最適化の実験的アプローチ
    - 失敗分析と改善方法論

#### カリキュラムナビゲーション更新 (README.md)
- <strong>モジュール構造強化</strong>: 新上級トピックを加えたカリキュラム表の更新
  - コンテキストエンジニアリング (5.14) とカスタムトランスポート (5.15) の項目を追加
  - すべてのモジュールに一貫したフォーマットとナビゲーションリンクを適用
  - 現行コンテンツ範囲を反映した説明に更新

### ディレクトリ構造改善
- <strong>命名標準化</strong>: 「mcp transport」を他の上級トピックフォルダに合わせ「mcp-transport」に改名
- <strong>内容整理</strong>: すべての05-AdvancedTopicsフォルダが一貫した命名パターン(mcp-[topic])に準拠

### ドキュメント品質向上
- **MCP仕様との整合**: すべての新規コンテンツが最新MCP仕様2025-06-18を参照
- <strong>多言語例</strong>: C#、TypeScript、Pythonの包括的コード例

- <strong>エンタープライズフォーカス</strong>: プロダクション対応パターンとAzureクラウド統合を全体にわたって
- <strong>ビジュアルドキュメンテーション</strong>: アーキテクチャとフロー可視化のためのMermaidダイアグラム

## 2025年8月18日

### ドキュメント包括的更新 - MCP 2025-06-18基準

#### MCPセキュリティベストプラクティス (02-Security/) - 完全なモダナイゼーション
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP仕様 2025-06-18 に準拠した完全な書き直し
  - <strong>必須要件</strong>: 公式仕様からの明確なMUST/MUST NOT要件を視覚的指標付きで追加
  - **12のコアセキュリティプラクティス**: 15項目リストから包括的セキュリティドメインへ再構成
    - トークンセキュリティ & 外部IDプロバイダー統合による認証
    - セッション管理 & 暗号要件を含むトランスポートセキュリティ
    - Microsoft Prompt Shields統合によるAI特有の脅威防御
    - 最小権限の原則に基づくアクセス制御 & 権限管理
    - Azure Content Safety統合によるコンテンツ安全性 & 監視
    - 包括的なコンポーネント検証を含むサプライチェーンセキュリティ
    - PKCE実装を含むOAuthセキュリティ & Confused Deputy防止
    - 自動化対応のインシデント対応 & 復旧
    - 規制遵守とのアラインメントを含むコンプライアンス & ガバナンス
    - ゼロトラストアーキテクチャを含む高度なセキュリティコントロール
    - 包括的なMicrosoftセキュリティエコシステム統合
    - 適応的プラクティスによる継続的セキュリティ進化
  - **Microsoftセキュリティソリューション**: Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security の統合ガイダンス強化
  - <strong>実装リソース</strong>: 公式MCPドキュメント、Microsoftセキュリティソリューション、セキュリティ基準、実装ガイドに分類した包括的リソースリンク

#### 高度なセキュリティコントロール (02-Security/) - エンタープライズ実装
- **MCP-SECURITY-CONTROLS-2025.md**: エンタープライズグレードのセキュリティフレームワークに完全刷新
  - **9つの包括的セキュリティドメイン**: 基本コントロールから詳細なエンタープライズフレームワークへ拡張
    - Microsoft Entra ID統合を含む高度な認証 & 認可
    - 包括的検証を備えたトークンセキュリティ & 通過防止コントロール
    - ハイジャック防止を含むセッションセキュリティコントロール
    - プロンプトインジェクションおよびツールポイズニング防止を含むAI特有のセキュリティコントロール
    - OAuthプロキシセキュリティによるConfused Deputy攻撃防止
    - サンドボックス化と分離によるツール実行セキュリティ
    - 依存関係検証を含むサプライチェーンセキュリティコントロール
    - SIEM統合を含む監視 & 検出コントロール
    - 自動化対応のインシデント対応 & 復旧
  - <strong>実装例</strong>: 詳細なYAML構成ブロックとコード例を追加
  - **Microsoftソリューション統合**: Azureセキュリティサービス、GitHub Advanced Security、エンタープライズID管理の包括的カバー

#### 高度なトピックセキュリティ (05-AdvancedTopics/mcp-security/) - プロダクション対応実装
- **README.md**: エンタープライズセキュリティ実装のための完全書き直し
  - <strong>現行仕様へのアラインメント</strong>: MCP仕様 2025-06-18 に更新し必須セキュリティ要件を反映
  - <strong>強化された認証</strong>: Microsoft Entra ID統合と包括的な.NETおよびJava Spring Security例
  - **AIセキュリティ統合**: Microsoft Prompt ShieldsとAzure Content Safetyの詳細なPython例含む実装
  - <strong>高度な脅威緩和</strong>: 包括的な実装例
    - PKCEとユーザーコンセント検証を含むConfused Deputy攻撃防止
    - オーディエンス検証と安全なトークン管理によるトークン通過防止
    - 暗号結合と行動分析によるセッションハイジャック防止
  - <strong>エンタープライズセキュリティ統合</strong>: Azure Application Insights監視、脅威検出パイプライン、サプライチェーンセキュリティ
  - <strong>実装チェックリスト</strong>: 明確な必須対推奨セキュリティコントロールとMicrosoftセキュリティエコシステムの利点

### ドキュメント品質と基準アラインメント
- <strong>仕様参照</strong>: すべての参照を現行MCP仕様 2025-06-18 に更新
- **Microsoftセキュリティエコシステム**: 全セキュリティ文書で統合ガイダンスを強化
- <strong>実践的実装</strong>: .NET、Java、Pythonによる詳細なコード例とエンタープライズパターンを追加
- <strong>リソース構成</strong>: 公式ドキュメント、セキュリティ標準、実装ガイドの包括的分類
- <strong>視覚的指標</strong>: 必須要件と推奨プラクティスの明確なマーキング


#### コアコンセプト (01-CoreConcepts/) - 完全モダナイゼーション
- <strong>プロトコルバージョン更新</strong>: 日付ベースのバージョニング(YYYY-MM-DD形式)で現行MCP仕様 2025-06-18 を参照
- <strong>アーキテクチャの洗練</strong>: 現行MCPアーキテクチャパターンを反映したホスト、クライアント、サーバの説明強化
  - ホストは複数MCPクライアント接続を調整するAIアプリケーションとして明確に定義
  - クライアントはサーバと一対一関係を維持するプロトコルコネクタとして説明
  - サーバはローカル/リモート展開シナリオで強化
- <strong>プリミティブの再構成</strong>: サーバー・クライアントプリミティブを完全刷新
  - サーバープリミティブ: リソース(データソース), プロンプト(テンプレート), ツール(実行関数)の詳細説明と例
  - クライアントプリミティブ: サンプリング(LLMコンプリーション)、エリシテーション(ユーザー入力)、ロギング(デバッグ/監視)
  - 現行の発見(`*/list`)、取得(`*/get`)、実行(`*/call`)メソッドパターンに更新
- <strong>プロトコルアーキテクチャ</strong>: 2層アーキテクチャモデル導入
  - データ層: ライフサイクル管理とプリミティブを備えたJSON-RPC 2.0基盤
  - トランスポート層: STDIO(ローカル)およびStreamable HTTPやSSE(リモート)トランスポート機構
- <strong>セキュリティフレームワーク</strong>: 明示的なユーザー同意、データプライバシー保護、ツール実行の安全性、トランスポート層セキュリティなど包括的セキュリティ原則
- <strong>通信パターン</strong>: 初期化、発見、実行、通知フローを示すプロトコルメッセージの更新
- <strong>コード例</strong>: 現行MCP SDKパターンを反映したマルチ言語例(.NET、Java、Python、JavaScript)更新

#### セキュリティ (02-Security/) - 包括的セキュリティ刷新  
- <strong>基準整合</strong>: MCP仕様 2025-06-18 のセキュリティ要件と完全整合
- <strong>認証の進化</strong>: カスタムOAuthサーバーから外部IDプロバイダー委譲(Microsoft Entra ID)への進化を文書化
- **AI特有の脅威分析**: 現代のAI攻撃ベクターのカバレッジ強化
  - 実例を含む詳細なプロンプトインジェクション攻撃シナリオ
  - ツールポイズニングメカニズムおよび「ラグプル」攻撃パターン
  - コンテキストウィンドウポイズニングおよびモデル混乱攻撃
- **Microsoft AIセキュリティソリューション**: Microsoftセキュリティエコシステムの包括的カバレッジ
  - 高度な検出、スポットライト、区切り技術を備えたAI Prompt Shields
  - Azure Content Safety統合パターン
  - サプライチェーン保護のためのGitHub Advanced Security
- <strong>高度な脅威緩和</strong>: 詳細なセキュリティコントロール
  - MCP固有の攻撃シナリオと暗号セッションID要件を含むセッションハイジャック
  - 明示的同意要件を持つMCPプロキシシナリオのConfused Deputy問題
  - 必須検証コントロールを伴うトークン通過の脆弱性
- <strong>サプライチェーンセキュリティ</strong>: ファウンデーションモデル、埋め込みサービス、コンテキストプロバイダー、サードパーティAPIを含むAIサプライチェーンカバレッジ拡大
- <strong>基盤セキュリティ</strong>: ゼロトラストアーキテクチャおよびMicrosoftセキュリティエコシステムを含むエンタープライズセキュリティパターンとの統合強化
- <strong>リソース構成</strong>: タイプ別（公式ドキュメント、基準、研究、Microsoftソリューション、実装ガイド）で包括的リソースリンクを分類

### ドキュメント品質の向上
- <strong>構造化された学習目標</strong>: 具体的で実行可能な成果を伴う学習目標を強化
- <strong>相互参照</strong>: 関連するセキュリティおよびコアコンセプトトピック間にリンク追加
- <strong>最新情報</strong>: すべての日時参照および仕様リンクを現行基準に更新
- <strong>実装ガイダンス</strong>: 両セクションにわたる具体的かつ実行可能な実装指針を追加

## 2025年7月16日

### READMEおよびナビゲーションの改善
- README.mdのカリキュラムナビゲーションを完全再設計
- `<details>`タグをよりアクセスしやすいテーブルベース形式に置換
- 新規フォルダー "alternative_layouts" に代替レイアウトオプション作成
- カード型、タブ型、アコーディオン型ナビゲーション例を追加
- 最新ファイルを含むリポジトリ構造セクションを更新
- 「このカリキュラムの使い方」セクションを明確な推奨内容で強化
- MCP仕様リンクを正確なURLに更新
- カリキュラム構成にコンテキストエンジニアリングセクション(5.14)を追加

### 学習ガイド更新
- 現行リポジトリ構造に合わせて学習ガイドを完全改訂
- MCPクライアントとツール、人気のMCPサーバの新セクションを追加
- ビジュアルカリキュラムマップを正確にトピック全体を反映するよう更新
- 高度なトピックの説明をすべての専門分野をカバーするよう強化
- ケーススタディセクションを実例に沿うよう更新
- この包括的な変更ログを追加

### コミュニティ貢献 (06-CommunityContributions/)
- 画像生成用MCPサーバの詳細情報を追加
- VSCodeにおけるClaude利用法の包括的セクションを追加
- Cline端末クライアントのセットアップと使用方法を追加
- MCPクライアントセクションを人気のあるすべてのクライアントオプションに更新
- 貢献例をより正確なコードサンプルで強化

### 高度なトピック (05-AdvancedTopics/)
- 一貫した命名法で専門トピックフォルダーを整理
- コンテキストエンジニアリング教材と例を追加
- Foundryエージェント統合ドキュメントを追加
- Entra IDセキュリティ統合ドキュメントを強化

## 2025年6月11日

### 初期作成
- MCP for Beginnersカリキュラムの初版をリリース
- 10の主要セクションの基本構造を作成
- ナビゲーション用のビジュアルカリキュラムマップを実装
- 複数プログラミング言語の初期サンプルプロジェクトを追加

### はじめに (03-GettingStarted/)
- 最初のサーバー実装例を作成
- クライアント開発ガイダンスを追加
- LLMクライアント統合指示を含む
- VS Code統合ドキュメントを追加
- Server-Sent Events (SSE) サーバ例を実装

### コアコンセプト (01-CoreConcepts/)
- クライアント-サーバアーキテクチャの詳細説明を追加
- 主要プロトコルコンポーネントのドキュメントを作成
- MCPにおけるメッセージングパターンを文書化

## 2025年5月23日

### リポジトリ構成
- 基本フォルダー構造でリポジトリを初期化
- 主要セクションごとにREADMEファイルを作成
- 翻訳インフラをセットアップ
- 画像アセットとダイアグラムを追加

### ドキュメント
- カリキュラム概要を含む初期README.mdを作成
- CODE_OF_CONDUCT.mdとSECURITY.mdを追加
- SUPPORT.mdをセットアップし支援ガイダンスを提供
- 予備的な学習ガイド構造を作成

## 2025年4月15日

### 計画とフレームワーク
- MCP for Beginnersカリキュラムの初期計画
- 学習目標と対象読者を定義
- カリキュラムの10セクション構成を概要化
- 事例と例のための概念的フレームワークを開発
- 主要コンセプトの初期プロトタイプ例を作成

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->