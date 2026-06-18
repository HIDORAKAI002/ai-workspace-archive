# AIワークフローの効率化：Microsoft Foundry ToolkitでMCPサーバーを構築する

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/ja/logo.ec93918ec338dadd.webp)

## 🎯 概要

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/ja/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(上の画像をクリックして本レッスンの動画を視聴できます)_

<strong>Model Context Protocol (MCP) ワークショップ</strong>へようこそ！この包括的なハンズオンワークショップは、AIアプリケーション開発を革新する2つの最先端技術を組み合わせています：

- **🔗 Model Context Protocol (MCP)**: シームレスなAIツール統合のためのオープンスタンダード
- **🛠️ Microsoft Foundry Toolkit for VS Code**: Microsoftによる強力なAI開発拡張機能

### 🎓 学習内容

このワークショップの終了時には、AIモデルと現実のツール・サービスをつなぐ知的アプリケーションの構築スキルを習得します。自動テストからカスタムAPI統合まで、複雑なビジネス課題を解決する実践力を身につけます。

## 🏗️ 技術スタック

### 🔌 Model Context Protocol (MCP)

MCPはAIのための<strong>「USB-C」</strong>－AIモデルを外部ツールやデータソースに接続するための汎用規格です。

**✨ 主な特徴：**

- 🔄 <strong>標準化された統合</strong>：AIとツールの接続に共通インターフェースを提供
- 🏛️ <strong>柔軟なアーキテクチャ</strong>：stdio/SSEトランスポートを介したローカル・リモートサーバー対応
- 🧰 <strong>豊富なエコシステム</strong>：ツール、プロンプト、リソースが一つのプロトコル内に
- 🔒 <strong>エンタープライズ対応</strong>：セキュリティと信頼性を内蔵

**🎯 MCPの重要性：**
USB-Cがケーブルの混乱を終わらせたように、MCPはAI統合の複雑さを解消します。1つのプロトコルで無限の可能性を。

### 🤖 Microsoft Foundry Toolkit for VS Code

Microsoftの代表的なAI開発拡張機能で、VS CodeをAI開発の強力なツールに変えます。

**🚀 コア機能：**

- 📦 <strong>モデルカタログ</strong>：Azure AI、GitHub、Hugging Face、Ollamaからモデルにアクセス
- ⚡ <strong>ローカル推論</strong>：ONNX最適化CPU/GPU/NPUでの実行
- 🏗️ <strong>エージェントビルダー</strong>：MCP統合によるビジュアルAIエージェント開発
- 🎭 <strong>マルチモーダル</strong>：テキスト、ビジョン、構造化出力対応

**💡 開発メリット：**

- 設定不要のモデル配備
- ビジュアルプロンプトエンジニアリング
- リアルタイムテストプレイグラウンド
- シームレスなMCPサーバー統合

## 📚 学習の道筋

### [🚀 モジュール1: Microsoft Foundry Toolkitの基本](./lab1/README.md)

<strong>時間</strong>：15分

- 🛠️ VS Code向けMicrosoft Foundry Toolkitのインストールと設定
- 🗂️ モデルカタログの探索（GitHub、ONNX、OpenAI、Anthropic、Googleの100以上のモデル）
- 🎮 インタラクティブプレイグラウンドでのリアルタイムモデルテスト
- 🤖 エージェントビルダーで初のAIエージェント作成
- 📊 内蔵メトリクス（F1、関連性、類似性、一貫性）でモデル性能評価
- ⚡ バッチ処理とマルチモーダル対応の習得

**🎯 学習成果**：Microsoft Foundry Toolkitの機能を包括的に理解し、機能的なAIエージェントを作成する

### [🌐 モジュール2: MCPとMicrosoft Foundry Toolkitの基本](./lab2/README.md)

<strong>時間</strong>：20分

- 🧠 Model Context Protocol（MCP）のアーキテクチャと概念の習得
- 🌐 MicrosoftのMCPサーバーエコシステムを探る
- 🤖 Playwright MCPサーバーを使ったブラウザ自動化エージェント構築
- 🔧 MCPサーバーとMicrosoft Foundry Toolkitエージェントビルダーの統合
- 📊 エージェント内でのMCPツールの設定とテスト
- 🚀 MCP搭載エージェントのエクスポートと本番展開

**🎯 学習成果**：MCPを活用した外部ツール強化型AIエージェントのデプロイ

### [🔧 モジュール3: Microsoft Foundry Toolkitによる高度なMCP開発](./lab3/README.md)

<strong>時間</strong>：20分

- 💻 Microsoft Foundry Toolkitを使ったカスタムMCPサーバー作成
- 🐍 最新MCP Python SDK（v1.9.3）設定と利用
- 🔍 MCP Inspectorを使ったデバッグ環境の設定と活用
- 🛠️ プロフェッショナルなデバッグワークフローで天気情報MCPサーバー構築
- 🧪 エージェントビルダーとInspectorの両環境でMCPサーバーをデバッグ

**🎯 学習成果**：モダンツールを使ったカスタムMCPサーバー開発とデバッグ技術習得

### [🐙 モジュール4: 実践的MCP開発 - カスタムGitHubクローンサーバー](./lab4/README.md)

<strong>時間</strong>：30分

- 🏗️ 開発ワークフローのための実用的GitHubクローンMCPサーバー作成
- 🔄 バリデーションおよびエラーハンドリング実装によるスマートリポジトリクローン
- 📁 インテリジェントなディレクトリ管理とVS Code連携
- 🤖 カスタムMCPツールと組み合わせたGitHub Copilotエージェントモード活用
- 🛡️ 本番対応の信頼性とクロスプラットフォーム互換性の適用

**🎯 学習成果**：実際の開発ワークフローを効率化する本番対応MCPサーバーの展開

## 💡 実世界での応用と影響

### 🏢 エンタープライズユースケース

#### 🔄 DevOps自動化

スマートな自動化で開発ワークフローを変革：

- <strong>スマートリポジトリ管理</strong>：AIによるコードレビューとマージ判断
- **インテリジェントCI/CD**：コード変更に基づくパイプラインの自動最適化
- <strong>課題トリアージ</strong>：バグの自動分類と割り当て

#### 🧪 品質保証の革新

AI駆動によるテスト自動化で品質向上：

- <strong>インテリジェントテスト生成</strong>：包括的なテストスイートを自動作成
- <strong>ビジュアルリグレッションテスト</strong>：UI変更のAI検知
- <strong>パフォーマンス監視</strong>：問題の事前検知と解決

#### 📊 データパイプラインのインテリジェンス

より賢くデータ処理ワークフローを構築：

- **適応型ETLプロセス**：自己最適化型データ変換
- <strong>異常検知</strong>：リアルタイムのデータ品質監視
- <strong>インテリジェントルーティング</strong>：スマートなデータフロー管理

#### 🎧 顧客体験の向上

卓越した顧客対応の創出：

- <strong>コンテキスト認識サポート</strong>：顧客履歴にアクセス可能なAIエージェント
- <strong>先回りした問題解決</strong>：予測型カスタマーサービス
- <strong>マルチチャネル統合</strong>：プラットフォーム横断の統一AI体験

## 🛠️ 前提条件とセットアップ

### 💻 システム要件

| コンポーネント | 要件 | 備考 |
|-----------|-------------|-------|
| **OS** | Windows 10+, macOS 10.15+, Linux | 最新のモダンOS |
| **Visual Studio Code** | 最新安定版 | Microsoft Foundry Toolkit必須 |
| **Node.js** | v18.0+ と npm | MCPサーバー開発用 |
| **Python** | 3.10+ | PythonによるMCPサーバーはオプション |
| <strong>メモリ</strong> | 最低8GB RAM | ローカルモデル用は16GB推奨 |

### 🔧 開発環境

#### 推奨VS Code拡張機能

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - オプションながら役立つ

#### オプションツール

- **uv**：最新のPythonパッケージマネージャー
- **MCP Inspector**：MCPサーバー向け視覚デバッグツール
- **Playwright**：ウェブ自動化サンプル用

## 🎖️ 学習成果と認定ルート

### 🏆 スキルマスタリーチェックリスト

本ワークショップ修了で以下のマスタリーを達成します：

#### 🎯 コア能力

- [ ] **MCPプロトコルの習熟**：アーキテクチャと実装パターンの深い理解
- [ ] **Microsoft Foundry Toolkit熟練**：迅速開発のためのツール使用の専門技術
- [ ] <strong>カスタムサーバー開発</strong>：本番向けMCPサーバーの構築、デプロイ、保守
- [ ] <strong>ツール統合の卓越性</strong>：AIと既存開発ワークフローのシームレス連携
- [ ] <strong>問題解決応用</strong>：習得スキルのビジネス課題への適用力

#### 🔧 技術スキル

- [ ] VS CodeでMicrosoft Foundry Toolkitをセットアップし設定
- [ ] カスタムMCPサーバーの設計・実装
- [ ] GitHubモデルとMCPアーキテクチャの統合
- [ ] Playwrightを使った自動テストワークフロー構築
- [ ] 本番環境用AIエージェントの展開
- [ ] MCPサーバーのデバッグと性能最適化

#### 🚀 高度な能力

- [ ] エンタープライズ規模のAI統合設計
- [ ] AIアプリケーションのセキュリティベストプラクティス実装
- [ ] 拡張可能なMCPサーバーアーキテクチャ設計
- [ ] 特定ドメイン向けカスタムツールチェーンの作成
- [ ] AIネイティブ開発のメンター育成

## 📖 追加リソース

- [MCP仕様書（2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHubリポジトリ](https://github.com/microsoft/vscode-ai-toolkit)
- [サンプルMCPサーバー集](https://github.com/modelcontextprotocol/servers)
- [ベストプラクティスガイド](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP トップ10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - セキュリティベストプラクティス

---

**🚀 AI開発ワークフローを革新する準備はできましたか？**

MCPとMicrosoft Foundry Toolkitで知的アプリケーションの未来をともに築きましょう！

## 次に進む

続けて：[モジュール11：MCPサーバーハンズオンラボ](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->