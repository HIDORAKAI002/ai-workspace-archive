# コースのセットアップ

## はじめに

このレッスンでは、本コースのコードサンプルの実行方法について説明します。

## 他の学習者と参加してサポートを受ける

リポジトリをクローンする前に、セットアップのサポートやコースに関する質問、他の学習者との交流のために[AI Agents For Beginners Discordチャンネル](https://aka.ms/ai-agents/discord)に参加してください。

## このリポジトリをクローンまたはフォークする

まずはGitHubリポジトリをクローンまたはフォークしてください。これでコースの教材の独自バージョンを作成し、コードの実行、テスト、調整ができるようになります！

<a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">リポジトリをフォークするリンク</a>をクリックしてこれを行うことができます。

これで、次のリンクにあなたのフォークしたコースのバージョンができているはずです：

![フォークしたリポジトリ](../../../translated_images/ja/forked-repo.33f27ca1901baa6a.webp)

### 浅いクローン（ワークショップ / Codespacesに推奨）

  >フル履歴と全ファイルをダウンロードするとリポジトリ全体が大きくなる場合があります（約3GB）。ワークショップ参加のみ、または一部のレッスンフォルダーだけ必要な場合は、浅いクローン（またはスパースクローン）で履歴を削減したりblobをスキップして大部分のダウンロードを回避できます。

#### クイック浅いクローン — 最小限の履歴、すべてのファイル

下記コマンド内の `<your-username>` をあなたのフォークURL（またはアップストリームURL）に置き換えてください。

最新コミット履歴だけをクローンするには：

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

特定のブランチをクローンするには：

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### 部分的（スパース）クローン — 最小限のblob + 選択したフォルダーのみ

Git 2.25+が必要で、部分クローンとスパースチェックアウトを使用（部分クローン対応の近代Git推奨）：

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

リポジトリフォルダーに移動：

```bash|powershell
cd ai-agents-for-beginners
```

次に、必要なフォルダーを指定します（下記例は2つのフォルダーの場合）：

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

クローンしてファイルを確認後、ファイルだけ必要で空き容量を増やしたい場合は（git履歴不要）、リポジトリのメタデータを削除してください（💀不可逆 — コミット、プル、プッシュ、履歴アクセスなどすべてのGit機能を失います）。

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### GitHub Codespacesの使用（ローカルの大容量ダウンロード回避に推奨）

- [GitHub UI](https://github.com/codespaces)からこのリポジトリの新しいCodespaceを作成します。  

- 新規作成したCodespaceのターミナルで、上記の浅いクローンまたはスパースクローンコマンドのいずれかを実行し、必要なレッスンフォルダーのみCodespaceの作業スペースに取り込みます。
- 任意: Codespaces内でクローン後、追加の空き容量確保のために.gitを削除してください（削除コマンドは上記を参照）。
- 注意: クローンせずにリポジトリを直接Codespacesで開く場合、Codespacesがdevcontainer環境を構築し、必要以上のプロビジョニングが行われる場合があります。新規Codespace内で浅いクローンをすると、ディスク使用量のコントロールがしやすくなります。

#### ヒント

- 編集やコミットを行いたい場合は常にクローンURLを自分のフォークのものに置き換えてください。
- 後で履歴やファイルがもっと必要になったら、フェッチしたりスパースチェックアウトの設定を追加フォルダーに調整できます。

## コードの実行

このコースでは、AIエージェントの構築を体験できる一連のJupyter Notebookを提供しています。

コードサンプルは **Microsoft Agent Framework (MAF)** の `FoundryChatClient` を使用し、**Microsoft Foundry Agent Service V2**（Responses API）と **Microsoft Foundry** を通じて接続しています。

すべてのPythonノートブックは `*-python-agent-framework.ipynb` とラベル付けされています。

## 必要条件

- Python 3.12+
  - <strong>注意</strong>: Python 3.12がインストールされていない場合はインストールしてください。その後、python3.12を使ってvenvを作成し、requirements.txtから正しいバージョンのパッケージをインストールしてください。
  
    >例

    Python venvディレクトリを作成：

    ```bash|powershell
    python -m venv venv
    ```

    その後、venv環境をアクティベート：

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NETを使うサンプルコード用に [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 以降をインストールしてください。インストール後、.NET SDKのバージョンを確認してください：

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — 認証に必須です。[aka.ms/installazurecli](https://aka.ms/installazurecli)からインストールしてください。
- **Azureサブスクリプション** — Microsoft FoundryおよびMicrosoft Foundry Agent Serviceにアクセスするために必要です。
- **Microsoft Foundryプロジェクト** — モデルがデプロイされたプロジェクト（例：`gpt-4.1-mini`）。詳細は以下の[ステップ1](#ステップ1-microsoft-foundryプロジェクトの作成)を参照してください。

このリポジトリのルートに、コードサンプルに必要なPythonパッケージをすべて含む `requirements.txt` ファイルが含まれています。

リポジトリルートのターミナルで以下のコマンドを実行してインストールできます：

```bash|powershell
pip install -r requirements.txt
```

パッケージの競合や問題を避けるために、Pythonの仮想環境作成を推奨します。

## VSCodeのセットアップ

VSCodeで適切なPythonバージョンを使用していることを確認してください。

![画像](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry および Microsoft Foundry Agent Service のセットアップ

### ステップ1: Microsoft Foundryプロジェクトの作成

ノートブックを実行するには、Microsoft Foundryの<strong>ハブ</strong>と<strong>プロジェクト</strong>、そしてデプロイされたモデルが必要です。

1. [ai.azure.com](https://ai.azure.com) にアクセスし、Azureアカウントでサインインします。
2. <strong>ハブ</strong>を作成するか、既存のものを使います。詳細は：[Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources) を参照。
3. ハブ内で<strong>プロジェクト</strong>を作成します。
4. **Models + Endpoints** → **Deploy model** からモデル（例：`gpt-4.1-mini`）をデプロイします。

### ステップ2: プロジェクトのエンドポイントとモデルデプロイ名を取得

Microsoft Foundryポータルのプロジェクトから：

- <strong>プロジェクトエンドポイント</strong> — **Overview** ページに移動し、エンドポイントURLをコピーします。

![プロジェクト接続文字列](../../../translated_images/ja/project-endpoint.8cf04c9975bbfbf1.webp)

- <strong>モデルデプロイ名</strong> — **Models + Endpoints** に移動し、デプロイしたモデルを選択して、**Deployment name**（例：`gpt-4.1-mini`）を確認します。

### ステップ3: `az login` でAzureにサインイン

すべてのノートブックは認証に **`AzureCliCredential`** を使用し、APIキーは不要です。そのためAzure CLIでサインインしている必要があります。

1. Azure CLIをまだインストールしていない場合はインストールしてください: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. 以下を実行してサインインします：

    ```bash|powershell
    az login
    ```

    ブラウザがないリモートまたはCodespace環境の場合：

    ```bash|powershell
    az login --use-device-code
    ```

3. プロンプトがあればサブスクリプションを選択 — Foundryプロジェクトを含むものを選んでください。

4. サインイン状態を確認：

    ```bash|powershell
    az account show
    ```

> **なぜ `az login`？** ノートブックは `azure-identity` パッケージの `AzureCliCredential` を使い認証を行います。つまりAzure CLIのセッションがクレデンシャルを提供し、`.env` ファイルにAPIキーやシークレットは不要です。これは[セキュリティのベストプラクティス](https://learn.microsoft.com/azure/developer/ai/keyless-connections)です。

### ステップ4: `.env` ファイルの作成

以下の例ファイルをコピー：

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

`.env` を開いて以下の2つの値を入力してください：

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| 変数 | 取得場所 |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundryポータル → プロジェクト → **Overview** ページ |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundryポータル → **Models + Endpoints** → デプロイしたモデル名 |

以上でほとんどのレッスンは準備完了です！ノートブックは `az login` セッションを通じて自動的に認証されます。

### ステップ5: Python依存関係のインストール

```bash|powershell
pip install -r requirements.txt
```

作成した仮想環境内での実行を推奨します。

## レッスン5（Agentic RAG）の追加セットアップ

レッスン5では、**Azure AI Search** を使ったリトリーバル補強型生成を使用します。このレッスンを実行する場合は、以下の変数を `.env` に追加してください：

| 変数 | 取得場所 |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azureポータル → お使いの **Azure AI Search** リソース → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azureポータル → お使いの **Azure AI Search** リソース → **Settings** → **Keys** → プライマリアドミンキー |

## Azure OpenAIを直接呼び出すレッスン向け追加セットアップ（レッスン6および8）

レッスン6および8の一部ノートブックは、Microsoft Foundryプロジェクトを経由せず直接 **Azure OpenAI** （<strong>Responses API</strong>使用）を呼び出します。これらのサンプルは以前GitHub Modelsを使っていましたが、これは廃止予定（2026年7月に終了）でResponses APIをサポートしていません。このサンプルを実行する場合は、以下の変数を `.env` に追加してください：

| 変数 | 取得場所 |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azureポータル → ご利用の **Azure OpenAI** リソース → **Keys and Endpoint** → エンドポイント (例: `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Responses APIに対応したデプロイ済みモデル名（例：`gpt-4.1-mini`） |
| `AZURE_OPENAI_API_KEY` | オプション — `az login` / Entra ID以外にキー認証を使う場合のみ |

> Responses APIは安定版の `/openai/v1/` エンドポイントを使用し、`api-version`は不要です。キー不要のEntra ID認証を使うには `az login` してください。

## 代替プロバイダー: MiniMax（OpenAI互換）

[MiniMax](https://platform.minimaxi.com/) は、最大204Kトークンの大規模コンテキストモデルをOpenAI互換APIで提供します。Microsoft Agent Frameworkの `OpenAIChatClient` は任意のOpenAI互換エンドポイントで動作するため、Azure OpenAIやOpenAIの代替としてMiniMaxを使用できます。

`.env` に以下の変数を追加してください：

| 変数 | 取得場所 |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → APIキー |
| `MINIMAX_BASE_URL` | `https://api.minimax.io/v1`（デフォルト値） |
| `MINIMAX_MODEL_ID` | 使用するモデル名（例：`MiniMax-M3`） |

<strong>例となるモデル</strong>：`MiniMax-M3`（推奨）、`MiniMax-M2.7`、`MiniMax-M2.7-highspeed`（高速応答）。モデル名や利用可能モデルは時期により変わる可能性があり、アカウントや地域によってアクセスできるモデルが異なります。最新のリストは[MiniMax Platform](https://platform.minimaxi.com/)でご確認ください。もし `MiniMax-M3` が利用できない場合は、アクセス可能なモデル名（例：`MiniMax-M2.7`）を `MINIMAX_MODEL_ID` に設定してください。

`OpenAIChatClient` を使用したコードサンプル（例：レッスン14のホテル予約ワークフロー）は、`MINIMAX_API_KEY` が設定されていると自動的にMiniMax設定を検知して使用します。

## 代替プロバイダー: Foundry Local（オンデバイスでモデル実行）

[Foundry Local](https://foundrylocal.ai) は、言語モデルを<strong>完全にご自身のマシン上で</strong>ダウンロード、管理、提供する軽量ランタイムで、OpenAI互換APIで動作します。クラウドやAzureサブスクリプション、APIキー不要です。オフライン開発やクラウドコストなしの実験、データをオンデバイスに保持したい場合に最適です。

Microsoft Agent Frameworkの `OpenAIChatClient` は任意のOpenAI互換エンドポイントと動作するため、Foundry LocalはAzure OpenAIのローカル代替として使用できます。

**1. Foundry Local をインストール**

```bash
# ウィンドウズ
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. モデルをダウンロードして実行**（ローカルサービスも起動します）：

```bash
foundry model list          # 利用可能なモデルを確認する
foundry model run phi-4-mini
```

**3. ローカルエンドポイントを検出するためのPython SDKをインストール**：

```bash
pip install foundry-local-sdk
```

**4. Microsoft Agent Framework にローカルモデルを指定：**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# モデルを（必要に応じて）ダウンロードしてローカルで提供し、その後エンドポイント/ポートを検出します。
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # 例: http://localhost:<port>/v1
    api_key=manager.api_key,        # Foundry Localでは常に「not-required」です。
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **注記:** Foundry Local はOpenAI互換の **Chat Completions** エンドポイントを公開しています。ローカル開発やオフライン用途に使ってください。状態管理会話や高度なツール連携、エージェント開発を含む完全な **Responses API** 機能は、レッスンで示すように **Azure OpenAI** や **Microsoft Foundry** プロジェクトを利用してください。最新のモデルカタログやプラットフォーム対応は[Foundry Localドキュメント](https://foundrylocal.ai)を参照してください。


## レッスン 8 の追加セットアップ（Bing グラウンディングワークフロー）

レッスン 8 の条件付きワークフローノートブックは、Microsoft Foundry 経由の **Bing グラウンディング** を使用します。そのサンプルを実行する予定がある場合は、`.env` ファイルにこの変数を追加してください:

| 変数 | 入手場所 |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry ポータル → プロジェクト → <strong>管理</strong> → <strong>接続されたリソース</strong> → Bing 接続 → 接続 ID をコピー |

## トラブルシューティング

### macOS での SSL 証明書検証エラー

macOS で次のようなエラーが発生した場合:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

これは macOS の Python における既知の問題で、システムの SSL 証明書が自動的に信頼されていません。次の解決策を順に試してください:

**オプション 1: Python の Install Certificates スクリプトを実行する（推奨）**

```bash
# インストールされているPythonバージョン（例：3.12 または 3.13）に3.XXを置き換えてください:
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**オプション 2: ノートブックで `connection_verify=False` を使う（GitHub Models ノートブックのみ）**

レッスン 6 のノートブック (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) には、コメントアウトされた回避策が既に含まれています。クライアントを作成する際に `connection_verify=False` のコメントを外してください:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # 証明書エラーが発生した場合は、SSL検証を無効にします
)
```

> **⚠️ 注意:** SSL 検証を無効にする (`connection_verify=False`) と証明書検証が省略されるためセキュリティが低下します。開発環境での一時的な回避策としてのみ使用し、本番環境では絶対に使用しないでください。

**オプション 3: `truststore` をインストールして使用する**

```bash
pip install truststore
```

その後、ネットワークコールを行う前にノートブックやスクリプトの先頭に以下を追加してください:

```python
import truststore
truststore.inject_into_ssl()
```

## どこかでつまずいた？

セットアップの実行に問題がある場合は、<a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI コミュニティ Discord</a> に参加するか、<a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">イシューを作成してください</a>。

## 次のレッスン

このコースのコードを実行する準備ができました。AI エージェントの世界をさらに学んで楽しんでください！

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->