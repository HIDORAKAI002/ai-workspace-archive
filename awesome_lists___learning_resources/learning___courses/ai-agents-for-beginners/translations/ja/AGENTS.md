# AGENTS.md

## プロジェクト概要

このリポジトリには「初心者のためのAIエージェント」- AIエージェント構築に必要なことをすべて学べる包括的な教育コースが含まれています。コースは基礎、デザインパターン、フレームワーク、本番展開、ローカル/デバイス上エージェント、AIエージェントのセキュリティに関する18のレッスン（00〜18番号付け）で構成されています。

**主要技術：**
- Python 3.12+
- 対話型学習のためのJupyterノートブック
- AIフレームワーク: Microsoft Agent Framework (MAF)
- Azure AIサービス: Microsoft Foundry, Microsoft Foundry Agent Service V2

**アーキテクチャ:**
- レッスンベースの構造（00-15以上のディレクトリ）
- 各レッスンに: READMEドキュメント、コードサンプル（Jupyterノートブック）、画像を含む
- 自動翻訳システムによる多言語対応
- 各レッスンにつき1つのMicrosoft Agent Frameworkを使ったPythonノートブック

## セットアップコマンド

### 前提条件
- Python 3.12以上
- Azureサブスクリプション（Microsoft Foundry用）
- Azure CLIがインストールされログイン済み（`az login`）

### 初期セットアップ

1. **リポジトリをクローンまたはフォークする：**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # または
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Pythonの仮想環境を作成し有効化する：**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Windowsの場合: venv\Scripts\activate
   ```

3. **依存関係をインストールする：**
   ```bash
   pip install -r requirements.txt
   ```

4. **環境変数を設定する：**
   ```bash
   cp .env.example .env
   # APIキーとエンドポイントを含む.envを編集してください
   ```

### 必須環境変数

**Microsoft Foundry用**（必須）：
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundryプロジェクトのエンドポイント
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - モデル展開名（例: gpt-4.1-mini）

**Azure AI Search用**（レッスン05 - RAG）：
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI Searchのエンドポイント
- `AZURE_SEARCH_API_KEY` - Azure AI SearchのAPIキー

認証: ノートブック実行前に `az login` を実行してください（`AzureCliCredential` を使用）。

## 開発ワークフロー

### Jupyterノートブックの実行

各レッスンには複数のフレームワーク用Jupyterノートブックが含まれます：

1. **Jupyterを起動：**
   ```bash
   jupyter notebook
   ```

2. <strong>レッスンディレクトリに移動</strong>（例: `01-intro-to-ai-agents/code_samples/`）

3. **ノートブックを開き実行：**
   - `*-python-agent-framework.ipynb` - Microsoft Agent Framework使用（Python）
   - `*-dotnet-agent-framework.ipynb` - Microsoft Agent Framework使用（.NET）

### Microsoft Agent Frameworkの使用

**Microsoft Agent Framework + Microsoft Foundry：**
- Azureサブスクリプションが必要
- Agent Service V2用に `FoundryChatClient` を使用（Foundryポータルでエージェントが確認可能）
- 本番環境対応の組み込み可観測性あり
- ファイルパターン: `*-python-agent-framework.ipynb`

## テスト方法

本リポジトリは教育用で自動テスト付きの本番コードではありません。セットアップや変更の検証には：

### 手動テスト

1. **Python環境のテスト：**
   ```bash
   python --version  # 3.12以上である必要があります
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **ノートブックの実行テスト：**
   ```bash
   # ノートブックをスクリプトに変換して実行する（テストのインポート）
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **環境変数の確認：**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### 個別ノートブックの実行

Jupyterでノートブックを開き順番にセルを実行してください。各ノートブックは自己完結型で以下を含みます：
- インポート文
- 設定の読み込み
- 例示的なエージェント実装
- 期待される出力がマークダウンセルで記載

### 配備済みエージェントのスモークテスト

Microsoft Foundryホスト型エージェントとして配備されるレッスン（01、04、05、16）では、`tests/`下にスモークテスト用カタログを備えています。これは `.github/workflows/smoke-test.yml` ワークフローにより[AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test)アクションを通じて実行されます。これは軽量の配備後ゲート（エージェントにアクセス可能か、基本プロンプト期待に従っているか）であり、レッスン10と16の評価パイプラインを補完します。カタログとレッスン、エージェントの対応は[tests/README.md](./tests/README.md)をご覧ください。レッスン17はFoundry Localを用いてローカル実行しホスト型エンドポイントがないため、ノートブックを直接実行することで検証します。

## コードスタイル

### Python規約

- **Pythonバージョン**: 3.12以上
- <strong>コードスタイル</strong>: 標準Python PEP 8規約に従う
- <strong>ノートブック</strong>: 概念説明には明確なマークダウンセルを使用
- <strong>インポート</strong>: 標準ライブラリ、サードパーティ、ローカルインポートごとにグループ化

### Jupyterノートブック規約

- コードセルの前に説明的なマークダウンセルを含める
- 参照用にノートブックに出力例を追加
- レッスンの概念に合った明確な変数名を使う
- ノートブックの実行順序は線形（セル1→2→3...）を保つ

### ファイル構成

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## ビルドと展開

### ドキュメントの構築

本リポジトリはMarkdownをドキュメントに使用しています：
- 各レッスンフォルダ内のREADME.mdファイル
- リポジトリルートのメインREADME.md
- GitHub Actionsによる自動翻訳システム

### CI/CDパイプライン

`.github/workflows/`にあります：

1. **co-op-translator.yml** - 50以上の言語へ自動翻訳
2. **welcome-issue.yml** - 新規Issue投稿者を歓迎
3. **welcome-pr.yml** - 新規プルリクエスト投稿者を歓迎

### 展開

教育用リポジトリのため展開プロセスはありません。利用者は：
1. リポジトリをフォークまたはクローン
2. ノートブックをローカルまたはGitHub Codespacesで実行
3. 例を変更・実験しながら学習

## プルリクエストガイドライン

### 提出前に

1. **変更をテストする：**
   - 関連するノートブックを完全に実行
   - すべてのセルがエラーなく実行されることを確認
   - 出力が適切であることをチェック

2. **ドキュメントの更新：**
   - 新しい概念を追加した場合はREADME.mdを更新
   - 複雑なコードにはノートブック内にコメント追加
   - マークダウンセルが目的を説明するようにする

3. **ファイルの変更：**
   - `.env`ファイルはコミットしない（`.env.example`を使用）
   - `venv/`や`__pycache__/`ディレクトリはコミット不可
   - 概念を示すノートブック出力は保持
   - 一時ファイルやバックアップノートブック（`*-backup.ipynb`）は削除

### PRタイトルの書式

説明的なタイトルを使う：
- `[Lesson-XX] <概念>の新しい例を追加`
- `[Fix] lesson-XX READMEの誤植修正`
- `[Update] lesson-XXのコードサンプルを改善`
- `[Docs] セットアップ手順の更新`

### 必須チェック

- ノートブックはエラーなく実行できること
- READMEファイルは明確かつ正確であること
- リポジトリ内の既存コードパターンに従うこと
- 他のレッスンとの一貫性を保つこと

## その他の注意点

### よくある落とし穴

1. **Pythonバージョンの不一致：**
   - Python 3.12+を使用していることを確認
   - 古いバージョンでは一部パッケージが動作しない可能性
   - `python3 -m venv`を使い明示的にPythonバージョンを指定

2. **環境変数：**
   - いつも `.env.example` から `.env` を作成
   - `.env` ファイルはコミットしない（`.gitignore`に含む）
   - キーレスEntra ID認証には `az login` によるサインインが必要

3. **パッケージの競合：**
   - 新しい仮想環境を使用する
   - 個別インストールより`requirements.txt`からインストール
   - 一部ノートブックはマークダウンセルで追加パッケージを必要とすることがある

4. **Azureサービス：**
   - Azure AIサービスには有効なサブスクリプションが必要
   - 一部の機能はリージョン限定
   - Azure OpenAIモデルの展開はResponses API対応であることを確認

### 学習の進め方

推奨されるレッスンの進行順：
1. **00-course-setup** - ここから環境セットアップを開始
2. **01-intro-to-ai-agents** - AIエージェントの基礎を理解
3. **02-explore-agentic-frameworks** - 各種フレームワークを学習
4. **03-agentic-design-patterns** - コアデザインパターン
5. 番号順にレッスンを継続

### フレームワーク選択

目的に応じてフレームワークを選択：
- <strong>すべてのレッスン</strong>: `FoundryChatClient`を使ったMicrosoft Agent Framework (MAF)
- **エージェントはサーバー側でMicrosoft Foundry Agent Service V2に登録され、Foundryポータルで閲覧可能**

### サポート利用方法

- [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)に参加
- 各レッスンのREADMEファイルで詳細指示を確認
- コース概要はメインの[README.md](./README.md)参照
- 詳細セットアップは[Course Setup](./00-course-setup/README.md)参照

### 貢献について

これはオープンな教育プロジェクトです。貢献を歓迎します：
- コードサンプルの改善
- 誤植やエラーの修正
- 分かりやすいコメントの追加
- 新しいレッスントピックの提案
- 追加言語への翻訳

現在のニーズは[GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues)を参照。

## プロジェクト固有のコンテキスト

### 多言語対応

本リポジトリは自動翻訳システムを使用：
- 50以上の言語に対応
- `/translations/<lang-code>/`ディレクトリに翻訳を格納
- GitHub Actionsワークフローが翻訳の更新を管理
- ソースファイルは英語でリポジトリルートにある

### レッスン構成

各レッスンは一貫したパターンに従う：
1. 動画のサムネイルとリンク
2. 文章によるレッスン内容（README.md）
3. 複数フレームワークのコードサンプル
4. 学習目標と前提条件
5. 追加学習リソースのリンク

### コードサンプルの命名規則

形式: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - レッスン1、MAF Python
- `14-sequential.ipynb` - レッスン14、MAFの高度なパターン
- `16-python-agent-framework.ipynb` - レッスン16、本番カスタマーサポートエージェント
- `17-local-agent-foundry-local.ipynb` - レッスン17、Foundry Local + Qwenを使ったローカルエージェント

### 特別ディレクトリ

- `translated_images/` - ローカライズ済み画像
- `images/` - 英語版オリジナル画像
- `.devcontainer/` - VS Code開発コンテナ設定
- `.github/` - GitHub Actionsワークフローとテンプレート

### 依存パッケージ

`requirements.txt`での主なパッケージ：
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-to-Agentプロトコルサポート
- `azure-ai-inference`, `azure-ai-projects` - Azure AIサービス
- `azure-identity` - Azure認証（AzureCliCredential）
- `azure-search-documents` - Azure AI Search連携
- `mcp[cli]` - Model Context Protocolサポート

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->