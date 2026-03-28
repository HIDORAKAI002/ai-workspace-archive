🌍 [English](README.md) | [Deutsch](README.de.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | **日本語** | [한국어](README.ko.md) | [中文](README.zh.md) | [Polski](README.pl.md) | [Türkçe](README.tr.md)

# ClaudeAdmin

[Claude Code](https://claude.com/claude-code) の設定を管理するウェブベースの管理コンソールです。

複数のプロジェクトを扱うようになると、`~/.claude/` 全体にわたるスキル、ルール、メモリファイル、MCP サーバー、設定の管理が煩雑になります。ClaudeAdmin はそれらをすべて一元管理できる UI を提供します — JSON や YAML を手動で編集する手間はもうありません。

> **注意:** これは独立したコミュニティプロジェクトです。Anthropic との提携や推薦はありません。

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## 機能

- **ダッシュボード** — 統計、最近の変更、プロジェクトへのクイックアクセスを含む概要
- **プロジェクト** — プロジェクトの閲覧、CLAUDE.md の編集、プロジェクトごとのルール・スキル・メモリ・パーミッションの管理
- **プロジェクトアドバイザー** — ワンクリックアクション付き AI 分析（CLAUDE.md 作成、メモリ初期化、ルール追加）
- **スキル** — グローバルスキルの作成・編集・閲覧（YAML フロントマター + マークダウン）
- **スキルブラウザー** — ワンクリックでコミュニティスキルを検索・インストール
- **ルール** — 競合検出付きのグローバルおよびプロジェクトレベルのルール管理
- **メモリ** — プロジェクトごとのメモリファイルの表示・編集（MEMORY.md + トピックファイル）
- **MCP サーバー** — 構造化フォーム（command/args/env）または生 JSON による完全管理、ヘルスチェック、ツールエクスプローラー
- **MCP ブラウザー** — キュレーションされたカタログから人気の MCP サーバーを検索・インストール
- **エージェント** — 特定のプロンプトとツール設定でカスタム Claude エージェントを定義
- **プラグイン** — インストール済みの Claude Code プラグインを管理
- **起動プロファイル** — 再利用可能な CLI 設定（モデル、エフォート、ツール、バジェット）
- **システムプロンプト** — 再利用可能なシステムプロンプトの作成・管理
- **タイムライン** — Git ベースの `~/.claude/` 設定バージョン履歴（差分ビューアーと復元機能付き）
- **設定** — グローバル設定、フック、API キー、ストレージ概要の編集
- **パーミッション** — ツールのパーミッション、セキュリティ警告、設定の健全性の確認
- **プラン** — プランファイルの管理
- **セッション** — 検索機能付きセッション履歴の閲覧
- **アナリティクス** — 使用状況メトリクス、プロジェクトごとのインサイト、CSV/JSON エクスポート
- **ワークツリー** — プロジェクト横断で Git ワークツリーを表示・管理
- **検索** — スキル、ルール、設定の全文検索
- **ヘルプチャット** — 会話メモリ付きコンテキスト対応 AI アシスタント
- **バックアップ** — 自動バックアップの閲覧・比較・復元
- **12 言語** — 完全な国際化対応：英語、ドイツ語、スペイン語、フランス語、イタリア語、日本語、韓国語、中国語、オランダ語、ポーランド語、ポルトガル語、トルコ語

## アーキテクチャ

```
┌─────────────────────┐     ┌──────────────────────┐
│  claude-admin-       │     │  claude-admin-        │
│  backend             │◄────│  frontend             │
│  Rust + Axum 0.7     │     │  Leptos 0.6 CSR/WASM  │
│  Port 9022           │     │  Port 9023 (dev)       │
└──────────┬──────────┘     └──────────────────────┘
           │                         │
           │    claude-admin-shared  │
           │    (shared types)       │
           │                         │
           ▼                         │
   ~/.claude/  (filesystem)          │
                                     │
   In production, the WASM frontend  │
   is embedded into the backend      │
   binary via rust-embed.            │
```

- **データベース不要** — ファイルシステム（`~/.claude/`）への読み書きのみ
- **自動バックアップ** — すべての書き込み操作前に `~/.claude/backups/` へファイルごとのタイムスタンプ付きで作成
- **Claude API はオプション** — `ANTHROPIC_API_KEY` なしで完全に動作
- **シングルバイナリ** — プロダクションビルドは `rust-embed` でフロントエンドを埋め込み

## セキュリティ

ClaudeAdmin は**あなたのマシン上でローカルに**動作します。開発用ワークステーションでの単一ユーザー利用を想定して設計されています。

- `~/.claude/` および `~/.claude.json` 配下のみへの読み書き
- テレメトリなし、アナリティクスなし、外部通信なし（設定済みの場合の Anthropic API オプションを除く）
- **オプション認証** — `CLAUDE_ADMIN_TOKEN` を設定して Bearer トークン認証とセッション管理を有効化
- **RBAC** — `~/.claude/users.json` によるオプションのロールベースアクセス制御（Admin、Editor、Viewer）
- セキュリティヘッダー：CSP、X-Frame-Options DENY、X-Content-Type-Options nosniff
- すべての API エンドポイントにレート制限
- パストラバーサル保護

## はじめに

### 前提条件

- [Rust](https://rustup.rs/)（stable）
- WASM ビルド用 [Trunk](https://trunkrs.dev/)：`cargo install trunk`
- WASM ターゲット：`rustup target add wasm32-unknown-unknown`

### 開発

```bash
# リポジトリをクローンしてディレクトリに入る
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# バックエンドを起動
cargo run -p claude-admin-backend

# 別のターミナルで：ホットリロード付きフロントエンドを起動
cd claude-admin-frontend && trunk serve --port 9023
```

バックエンド：`http://localhost:9022` — フロントエンド：`http://localhost:9023`

### プロダクションビルド

```bash
# WASM フロントエンドをビルド
cd claude-admin-frontend && trunk build --release && cd ..

# バックエンドをビルド（フロントエンドを埋め込み）
cargo build --release -p claude-admin-backend

# シングルバイナリを実行
./target/release/claude-admin-backend
```

Linux、macOS、Windows 向けのビルド済みバイナリは [Releases](https://github.com/conradBruchmann/claude-admin/releases) ページからダウンロードできます。

### macOS インストール

最新リリースから `.dmg` をダウンロードし、開いて **ClaudeAdmin.app** を `/Applications` にドラッグします。

アプリは Apple Developer 証明書で署名されていないため、初回起動時に macOS Gatekeeper によってブロックされます。許可するには次のコマンドを実行してください：

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

その後アプリをダブルクリックすると、サーバーが起動し `http://localhost:9022` がブラウザで開きます。DMG には Intel および Apple Silicon Mac の両方でネイティブ動作するユニバーサルバイナリが含まれています。

### Windows インストール

最新リリースから `ClaudeAdmin-*-Setup.exe` をダウンロードしてインストーラーを実行します。ユーザープロファイルにインストールされ（管理者権限不要）、スタートメニューとデスクトップにショートカットが作成され、「アプリと機能」にアンインストール用として登録されます。

インストール後、スタートメニューまたはデスクトップから ClaudeAdmin を起動すると、サーバーが起動し `http://localhost:9022` がブラウザで開きます。

## 設定パス

ClaudeAdmin は標準の Claude Code 設定を読み書きします：

| パス                                   | 説明                                   |
| -------------------------------------- | -------------------------------------- |
| `~/.claude.json`                       | プロジェクトレジストリ、MCP サーバー   |
| `~/.claude/settings.json`              | グローバル設定、フック                 |
| `~/.claude/skills/`                    | グローバルスキル                       |
| `~/.claude/rules/`                     | グローバルルール                       |
| `~/.claude/plans/`                     | プランファイル                         |
| `~/.claude/projects/<encoded>/memory/` | プロジェクトごとのメモリ               |
| `~/.claude/projects/<encoded>/rules/`  | プロジェクトごとのルール               |
| `~/.claude/system-prompts/`            | 再利用可能なシステムプロンプト         |
| `~/.claude/agents/`                    | カスタムエージェント定義               |
| `~/.claude/launch-profiles/`           | CLI 起動プロファイル                   |
| `~/.claude/backups/`                   | 自動バックアップ（タイムスタンプ付き） |
| `~/.claude/users.json`                 | RBAC ユーザーロール（オプション）      |

## ライセンス

[MIT](LICENSE) — Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
