# 変更履歴

**AI Agents for Beginners** コースのすべての重要な変更点はこのファイルに記録されています。

## [リリース済み] — 2026-07-13

このリリースでは、デプロイメントの流れを完結させる二つの新しいレッスン—Microsoft Foundry へのスケーリングと単一ワークステーションへの縮小—に加え、スモークテストパイプライン、刷新されたコースナビゲーション、新しい学習者スキル、更新されたブランディングが追加されました。

### 追加

- **レッスン16 — Microsoft Foundryを用いたスケーラブルエージェントのデプロイ。** 新レッスン [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) と実行可能なノートブック [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb)。プロダクションレベルのカスタマーサポートエージェント構築（ツール、RAG、メモリ、モデルルーティング、レスポンスキャッシュ、ヒューマン承認、評価ゲート、OpenTelemetryトレーシング）、開発／デプロイメント／ランタイムのMermaid図表、知識チェック、課題、チャレンジを含む。
- **レッスン17 — Foundry LocalとQwenを使ったローカルAIエージェントの作成。** 新レッスン [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) とノートブック [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb)。完全オンデバイスのエンジニアリングアシスタント構築（Foundry Local経由のQwen関数呼び出し、サンドボックス化されたファイルツール、Chromaを使ったローカルRAG、任意のローカルMCP）、ローカル限定／ローカルRAG／ツール呼び出しの図表、知識チェック、課題、チャレンジを含む。
- **スモークテストパイプライン。** 新しい [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) ワークフロー [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) と、レッスン01、04、05、16のデプロイ可能なエージェント用のカタログを [tests/](./tests/README.md) 配下に追加。インデックスREADMEが各カタログをレッスンとホストエージェント名にマッピング。レッスン16に「スモークテストを用いたデプロイ済みエージェントの検証」セクションを追加。レッスン01/04/05にオプションのスモークテスト案内を追加。
- **学習者スキル。** 新しいエージェントスキル `.agents/skills/` 配下に、[deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md)、[local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md)（レッスン16と17のガイダンスをまとめたもの）、および [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md)（Microsoft Foundry / Azure OpenAI 環境に対してノートブックサンプルを検証する方法）。
- **ノートブック検証ランナー。** 新しい [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) は `nbconvert` で全Pythonノートブックをヘッドレスで実行し、PASS/FAILマトリックス（および `results.json`）を出力。リポジトリルートとPythonを自動検出し、非コースノートブック（`.venv`、`site-packages`、`translations`、スキルテンプレート資産）および `.NET` ノートブックをデフォルトで除外。`-Filter`、`-Timeout`、`-List`、`-IncludeDotnet`、`-Python` をサポート。
- **コースナビゲーション。** レッスン11〜15に前後のレッスンリンクを追加（以前はなし），これでコース全体が00→18間で両方向つながりました。
- **新しいサムネイル。** レッスン16と17のサムネイル、新しいレポジトリソーシャル画像 [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png)（新レッスン2つと `aka.ms/ai-agents-beginners` URLの広告）。
- <strong>依存関係</strong> ([requirements.txt](../../requirements.txt))：レッスン17向けに `foundry-local-sdk` と `chromadb` を追加。

### 変更

- **メイン [README.md](./README.md) のレッスン表：** レッスン16と17が内容へのリンク付きに（以前は「準備中」）。リポジトリ画像を新しい `repo-thumbnailv3.png` に更新。
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)：** レッスン16と17をレッスン別ガイドと学習パスに追加、「スモークテストを用いたデプロイ済みエージェントの検証」セクションを追加。
- **[AGENTS.md](./AGENTS.md)：** レッスン数・説明（00–18）を更新、スモークテスト検証セクションを追加、レッスン16/17のサンプル命名例を追加。
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)：** 「前のレッスン」がレッスン17（旧15）を指すように変更、チェーンが閉じる。
- **非廃止モデルの標準モデル参照。** コース全体のすべての `gpt-4o` / `gpt-4o-mini` 参照（ドキュメント、`.env.example`、Python/.NETノートブックとサンプル）を `gpt-4.1-mini` に置換。2026年に `gpt-4o`（全バージョン）は廃止。レッスン16のモデルルーティング例は `gpt-4.1-mini`（小）と `gpt-4.1`（大）で小/大の対比を維持。Pythonノートブックはモデル名のハードコーディングをやめ、環境変数 (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) から選択。

### 注意事項と既知の制限

- **ライブAzureでの実行なし。** 新レッスンのノートブックは教育用サンプルで、自身のMicrosoft Foundry / Foundry Local 環境で実行・検証してください。スモークテストワークフローはレッスンのエージェントをデプロイし、Azure OIDCシークレット（`AZURE_CLIENT_ID`、`AZURE_TENANT_ID`、`AZURE_SUBSCRIPTION_ID`）を Foundry プロジェクトスコープで **Azure AI User** ロール付きで設定する必要があります。
- **レッスン17はローカル限定。** Foundry Responses エンドポイントがないためスモークテストアクションは適用されません。ワークステーションでノートブックを実行して検証してください。

## [リリース済み] — 2026-07-06

このリリースではコースを **Azure OpenAI Responses API** に移行し、製品名を **Microsoft Foundry** と **Microsoft Agent Framework (MAF)** に標準化、GitHub Modelsを廃止、SDKバージョンを更新、ローカルモデルとFoundry上での他のフレームワークホスティングに関する新内容を追加しました。

### 追加

- <strong>移行スキル</strong> — [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) エージェントスキル（[Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses) 由来）を `.agents/skills/` にインストール。参照とスキャナースクリプト含む。
- **Foundry Local（オンデバイスでのモデル実行）** — [00-course-setup/README.md](./00-course-setup/README.md) に新しい「代替プロバイダー：Foundry Local」セクションを追加。インストール（`winget`／`brew`）、`foundry model run`、`foundry-local-sdk`、Microsoft Agent Framework への `FoundryLocalManager` の接続を `OpenAIChatClient` 経由で解説。
- **Microsoft Foundry上でのLangChain / LangGraphエージェントのホスティング** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) に新セクション追加。`langchain-azure-ai[hosting]` と `ResponsesHostServer`（`/responses` プロトコル）を使った実行可能サンプル [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py)。内容は [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) に基づく。
- **Microsoft Project Opal** — [15-browser-use/README.md](./15-browser-use/README.md) に新「実例：Microsoft Project Opal」セクションを追加。Opalをエンタープライズのコンピュータ使用エージェントと位置づけ、コースの概念（ヒューマンインザループ、信頼・セキュリティ、計画、スキル）に結びつける。
- **第2のレッスン02 Pythonサンプル** — [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) を追加（「変更」参照 — 旧Semantic Kernelノートブックから移行）。レッスンREADMEにリンクも追加。
- **Models and Providers** セクションを [STUDY_GUIDE.md](./STUDY_GUIDE.md) に追加。

### 変更

- **Chat Completions → Responses API (Python)。** モデルを直接呼び出していたサンプルはChat CompletionsからResponses APIに移行（`client.responses.create(input=..., store=False)`, `resp.output_text`）、安定版Azure OpenAI `/openai/v1/` エンドポイントに `OpenAI` クライアントを使う（`api_version`なし）。対象サンプル：
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — 完全な関数呼び出しウォークスルー（ツールスキーマをResponses形式に変換、ツール結果を `function_call_output`, `max_output_tokens` などとして返す）。
- **GitHub Models → Azure OpenAI。** GitHub Modelsは廃止予定（**2026年7月**）、Responses APIは非対応。すべてのGitHub ModelsコードをPythonと.NETサンプルでAzure OpenAI / Microsoft Foundryに変換：
  - Python：レッスン08のワークフローノートブック（`01`～`03`）、レッスン14（`14-handoff`、`14-human-loop`、`hotel_booking_workflow_sample.py`）。
  - .NET：`01`～`04`、`07`、`08` `*-dotnet-agent-framework.cs` ＋関連 `.md` ドキュメント、レッスン08のdotNETワークフローノートブック／`.md`（`01`～`03`）は `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` と `AzureCliCredential`を使用。
- **Semantic Kernel → Microsoft Agent Framework。** 旧 `02-semantic-kernel.ipynb` はMicrosoft Agent FrameworkとAzure OpenAI（Responses API）を使うよう書き換えられ、`02-python-agent-framework-azure-openai.ipynb` に改名。
- **`FoundryChatClient` ＋ `as_agent` に標準化。** `AzureAIProjectAgentProvider` を参照していたREADMEとノートブックコードは、レッスン01やフレームワーク自身のサンプルで使われる標準パターン `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` と `provider.as_agent(...)` に統一。レッスン02～14のREADMEとノートブックに反映（例：レッスン13のメモリ、レッスン14すべてのノートブック、`11-agentic-protocols/code_samples/github-mcp/app.py`）。
- **製品名。** 英語コンテンツ全体でリネーム：
  - 「Azure AI Foundry」 / 「Azure AI Studio」→ **Microsoft Foundry**
  - 「Azure AI Agent Service」→ **Microsoft Foundry Agent Service**
  - （変更なし：「Azure OpenAI」、「Azure AI Search」、「Azure AI Inference」、および環境変数名）
- <strong>依存関係</strong> ([requirements.txt](../../requirements.txt))：
  - `agent-framework>=1.10.0`、`agent-framework-foundry>=1.10.0`、`agent-framework-openai>=1.10.0` を固定バージョン指定。
  - Responses API対応のため、`openai>=1.108.1` を固定バージョン指定。
  - 移行済みGitHub Modelsサンプルでのみ使われていた `azure-ai-inference` は削除。
- <strong>環境設定</strong> ([.env.example](../../.env.example))：GitHub Modelsの変数(`GITHUB_TOKEN`、`GITHUB_ENDPOINT`、`GITHUB_MODEL_ID`)を削除。`AZURE_OPENAI_ENDPOINT`、`AZURE_OPENAI_DEPLOYMENT`、任意の `AZURE_OPENAI_API_KEY` を追加。Microsoft Foundryに合わせて名称更新。
- <strong>ドキュメント</strong> — 上記に合わせて [00-course-setup/README.md](./00-course-setup/README.md)、[AGENTS.md](./AGENTS.md)、[README.md](./README.md)、[STUDY_GUIDE.md](./STUDY_GUIDE.md) を更新（環境変数設定、検証スニペット、プロバイダー案内、名称）。

### 削除

- GitHub Modelsのオンボーディング手順および環境変数をセットアップドキュメントから削除（Azure OpenAI / Microsoft Foundryに置き換え）。

### セキュリティ / プライバシー（公開共有のクリーンアップ）

- 以下でリアルな **AzureサブスクリプションID**、リソースグループ／リソース名、Bing接続ID、開発者のローカルファイルパスとユーザー名が漏れていたJupyterノートブックの実行結果を削除：
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- トラッキングされた英語の内容にAPIキー、トークン、サブスクリプションID、または個人パスが残っていないことを確認済みです（残っている `GITHUB_TOKEN` の参照は、ワークフロー内のGitHub Actionsトークンとレッスン11のセットアップにあるGitHub MCPサーバーPATであり、いずれも正当かつGitHub Modelsとは無関係です）。

### 注意事項と既知の制限

- **実行／コンパイルされていません。** これらはAPIや命名の正確性のために更新された教育用サンプルであり、ライブのAzureリソースで実行されたものではなく、この環境で.NETサンプルがコンパイルされたわけでもありません。自身のMicrosoft Foundry / Azure OpenAI展開で検証してください。
- **モデル展開はResponses APIをサポートしている必要があります。** `gpt-4.1-mini`、`gpt-4.1`、あるいは`gpt-5.x`モデルのような展開を使用してください。古いモデルは基本的なResponses機能をサポートしますが、すべての機能をサポートしているわけではありません。
- **エージェントフレームワークのバージョン。** サンプルは最新のMAF（`>=1.10.0`）を対象としています。標準的なエージェント作成呼び出しは `client.as_agent(...)` です。APIはフレームワークの公開ドキュメントとインストール済みビルドで検証済みです。異なるバージョンを指定する場合は、メソッドの有無（`as_agent` と `create_agent`）を確認してください。
- **レッスン08ワークフローノートブック04** は意図的に `AzureAIAgentClient`（`agent-framework-azure-ai`由来）を保持しています。これはMicrosoft Foundry Agent Serviceのホストツール（Bingグラウンディング、コードインタープリター）を使用しているためで、すでにResponsesベースです。
- **.NETのデフォルト展開。** 以前のレッスン08のdotNETワークフローサンプル2つは特定のモデルをハードコーディングしていましたが、今はデフォルトで `AZURE_OPENAI_DEPLOYMENT`（`gpt-4.1-mini`）を使用します。マルチモーダル／ビジョン入力を使う場合は、`AZURE_OPENAI_DEPLOYMENT` を適切なモデルに設定してください。
- **Foundry Local** はOpenAI互換の<strong>Chat Completions</strong>エンドポイントを公開しており、ローカル開発向けです。完全なResponses API機能セットを使うにはAzure OpenAI / Microsoft Foundryを使用してください。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->