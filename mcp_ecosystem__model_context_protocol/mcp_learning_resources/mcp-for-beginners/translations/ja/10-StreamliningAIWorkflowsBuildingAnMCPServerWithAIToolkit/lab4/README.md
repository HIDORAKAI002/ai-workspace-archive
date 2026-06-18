# 🐙 モジュール 4: 実践的 MCP 開発 - カスタム GitHub クローンサーバー

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ クイックスタート:** たった30分で、GitHubリポジトリのクローンとVS Code統合を自動化する本番対応のMCPサーバーを構築しましょう！

## 🎯 学習目標

このラボの終了時に、以下のことができるようになります：

- ✅ 実際の開発ワークフロー向けカスタムMCPサーバーの作成
- ✅ MCP経由でのGitHubリポジトリクローン機能の実装
- ✅ カスタムMCPサーバーをVS CodeおよびAgent Builderと統合
- ✅ カスタムMCPツールでGitHub Copilot Agent Modeを使用
- ✅ 本番環境でのカスタムMCPサーバーのテストとデプロイ

## 📋 前提条件

- ラボ1～3（MCPの基本と高度な開発）の完了
- GitHub Copilotサブスクリプション（[無料登録はこちら](https://github.com/github-copilot/signup)）
- Microsoft Foundry ToolkitとGitHub Copilot拡張機能がインストールされたVS Code
- Git CLIがインストールされ設定済み

## 🏗️ プロジェクト概要

### <strong>実際の開発課題</strong>
開発者はGitHubからリポジトリをクローンし、VS CodeやVS Code Insidersで開く作業を日常的に行います。この手動プロセスには：

1. ターミナル/コマンドプロンプトを開く
2. 目的のディレクトリに移動
3. `git clone`コマンドの実行
4. クローンしたディレクトリでVS Codeを開く

**当社のMCPソリューションは、これを1つのインテリジェントなコマンドに簡素化します！**

### <strong>構築するもの</strong>
**GitHub Clone MCP サーバー** (`git_mcp_server`) は下記を提供します：

| 機能 | 説明 | 利点 |
|---------|-------------|---------|
| 🔄 <strong>スマートリポジトリクローン</strong> | GitHubリポジトリの検証付きクローン | エラー検知の自動化 |
| 📁 <strong>インテリジェントなディレクトリ管理</strong> | ディレクトリの安全な確認と作成 | 上書き防止 |
| 🚀 **クロスプラットフォームVS Code統合** | VS Code/Insidersでプロジェクトを開く | シームレスなワークフロー移行 |
| 🛡️ <strong>堅牢なエラーハンドリング</strong> | ネットワーク・権限・パス問題の処理 | 本番環境対応の信頼性 |

---

## 📖 ステップバイステップ実装

### ステップ 1: Agent BuilderでGitHubエージェントを作成

1. Microsoft Foundry Toolkit拡張機能から **Agent Builder** を起動
2. 以下の設定で **新しいエージェントを作成：**
   ```
   Agent Name: GitHubAgent
   ```

3. **カスタムMCPサーバーの初期化：**
   - <strong>ツール</strong> → <strong>ツールを追加</strong> → **MCPサーバー**
   - **「新しい MCP サーバーを作成」** を選択
   - 柔軟性のために **Pythonテンプレート** を選択
   - **サーバー名:** `git_mcp_server`

### ステップ 2: GitHub Copilot Agent Modeの設定

1. VS Codeで **GitHub Copilot** を開く（Ctrl/Cmd + Shift + P → "GitHub Copilot: Open"）
2. Copilotのインターフェースで **Agent Model** を選択
3. 高度な推論機能のために **Claude 3.7モデル** を選択
4. ツールアクセスのために **MCP統合を有効化**

> **💡 プロのヒント:** Claude 3.7は開発ワークフロー理解とエラー処理パターンの把握に優れています。

### ステップ 3: 核心となるMCPサーバー機能の実装

**GitHub Copilot Agent Modeで以下の詳細プロンプトを使用：**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### ステップ 4: MCPサーバーのテスト

#### 4a. Agent Builderでのテスト

1. Agent Builderのデバッグ構成を起動
2. 以下のシステムプロンプトでエージェントを設定：

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. 現実的なユーザーシナリオでテスト：

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/ja/DebugAgent.81d152370c503241.webp)

**期待される結果：**
- ✅ 正常にクローンされパスが確認される
- ✅ 自動でVS Codeが起動される
- ✅ 誤ったシナリオで明確なエラーメッセージが表示
- ✅ エッジケースが適切に処理される

#### 4b. MCP Inspectorでのテスト


![MCP Inspector Testing](../../../../translated_images/ja/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 おめでとうございます！** 実務的で本番対応可能なMCPサーバーを完成させ、開発ワークフローの課題を解決しました。あなたのカスタムGitHubクローンサーバーは、開発者の生産性向上を自動化・強化するMCPの力を示しています。

### 🏆 実績解除：
- ✅ **MCP開発者** - カスタムMCPサーバーを作成
- ✅ <strong>ワークフロー自動化者</strong> - 開発プロセスの効率化  
- ✅ <strong>統合エキスパート</strong> - 複数開発ツールを連携
- ✅ <strong>本番対応</strong> - デプロイ可能なソリューションを構築

---

## 🎓 ワークショップ修了: Model Context Protocolでのあなたの旅

**ワークショップ参加者の皆さまへ、**

Model Context Protocolワークショップの全4モジュール修了、おめでとうございます！ Microsoft Foundry Toolkitの基本から始まり、実務で使える本番対応のMCPサーバー構築まで大きく成長しました。

### 🚀 あなたの学習経路の振り返り：

**[モジュール 1](../lab1/README.md)**：Microsoft Foundry Toolkitの基礎、モデルテスト、最初のAIエージェント作成を学びました。

**[モジュール 2](../lab2/README.md)**：MCPアーキテクチャ、Playwright MCP統合、最初のブラウザ自動化エージェント開発を習得。

**[モジュール 3](../lab3/README.md)**：Weather MCPサーバーでカスタムMCP開発を進め、デバッグツールをマスター。

**[モジュール 4](../lab4/README.md)**：実践的なGitHubリポジトリワークフロー自動化ツールを構築。

### 🌟 マスターしたこと：

- ✅ **Microsoft Foundry Toolkitエコシステム**：モデル、エージェント、統合パターン
- ✅ **MCPアーキテクチャ**：クライアント・サーバー設計、トランスポートプロトコル、セキュリティ
- ✅ <strong>開発者ツール</strong>：PlaygroundからInspector、本番デプロイまで
- ✅ <strong>カスタム開発</strong>：自分でMCPサーバーの構築、テスト、デプロイ
- ✅ <strong>実践アプリケーション</strong>：AIで現実のワークフロー問題を解決

### 🔮 次のステップ：

1. **自分のMCPサーバー構築**：スキルを活かし独自ワークフローを自動化
2. **MCPコミュニティ参加**：作品を共有し他者から学ぶ
3. <strong>高度な統合に挑戦</strong>：企業システムとMCPサーバーを連携
4. <strong>オープンソースに貢献</strong>：MCPツールとドキュメントの改善に協力

本ワークショップは始まりに過ぎません。Model Context Protocolのエコシステムは急速に進化中であり、あなたはAI駆動開発ツールの最前線にいます。

**ご参加と熱心な学習に感謝します！**

このワークショップが、開発の旅でAIツールを構築し活用する新たなアイデアのきっかけとなることを願っています。

**良いコーディングを！**

---

## 次に進む

モジュール10の全ラボ完了、おめでとうございます！

- 戻る: [モジュール 10 概要](../README.md)
- 続ける: [モジュール 11: MCPサーバー ハンズオンラボ](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->