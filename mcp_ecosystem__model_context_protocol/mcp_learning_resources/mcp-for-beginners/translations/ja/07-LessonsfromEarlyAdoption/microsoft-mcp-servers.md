# 🚀 開発者の生産性を変革する 10 の Microsoft MCP サーバー

## 🎯 本ガイドで学べること

この実践的なガイドでは、開発者が AI アシスタントと連携して作業する方法を実際に変革している 10 の Microsoft MCP サーバーを紹介します。MCP サーバーが「何ができるか」を説明するだけでなく、Microsoft およびその先の現場で日々の開発ワークフローに大きな違いをもたらしているサーバーの実例をお見せします。

本ガイドに掲載されている各サーバーは、実際の利用状況と開発者のフィードバックを基に選定されています。各サーバーが何をするのかだけでなく、なぜ重要なのか、そして自分のプロジェクトで最大限に活用する方法を発見できます。MCP が全く初めてでも、既存の環境を拡張したい場合でも、本ガイドのサーバーは Microsoft エコシステムで利用できる最も実用的で効果的なツールの一部を代表しています。

> **💡 クイックスタートのヒント**
> 
> MCP が初めてですか？ご安心ください！このガイドは初心者にも分かりやすい設計になっています。進めながら概念も説明しますし、いつでも[Introduction to MCP](../00-Introduction/README.md)および[Core Concepts](../01-CoreConcepts/README.md)モジュールに戻って詳細を参照可能です。

## 概要

本ガイドでは、開発者が AI アシスタントや外部ツールと連携する方法を変革している 10 の Microsoft MCP サーバーについて詳しく紹介します。Azure リソース管理から文書処理まで、これらのサーバーは Model Context Protocol の力を活かし、シームレスで生産性の高い開発ワークフローを実現しています。

## 学習目標

本ガイドを読み終える頃には、以下を理解できます：
- MCP サーバーが開発者の生産性をどのように向上させるか
- Microsoft の最も効果的な MCP サーバー実装について
- 各サーバーの実用的な利用ケースの発見
- VS Code および Visual Studio でのこれらサーバーの設定と構成方法
- 広範な MCP エコシステムと今後の展望の探究

## 🔧 MCP サーバーの理解：初心者ガイド

### MCP サーバーとは？

Model Context Protocol (MCP) の初心者として、「MCP サーバーとは何か、なぜ重要なのか？」と疑問に思うかもしれません。ここでは簡単な例えで説明しましょう。

MCP サーバーは、AI コーディングアシスタント（例えば GitHub Copilot）が外部ツールやサービスに接続できるようにする特化型アシスタントのようなものです。スマホで天気予報用アプリ、ナビゲーション用アプリ、銀行用アプリなど用途ごとに異なるアプリを使い分けるのと同様に、MCP サーバーは AI アシスタントに様々な開発ツールやサービスと連携する能力を与えます。

### MCP サーバーが解決する問題

MCP サーバーがなければ、例えば：
- Azure リソースの確認
- GitHub イシューの作成
- データベースのクエリ
- ドキュメントの検索

といった作業は、コーディングを中断してブラウザーを開き、該当サイトにアクセスし、手動で操作する必要があります。この頻繁なコンテキスト切り替えはワークフローを阻害し、生産性を下げます。

### MCP サーバーが開発体験を変える仕組み

MCP サーバーを使うと、VS Code や Visual Studio などの開発環境内で AI アシスタントにこれらの作業を依頼できます。具体例：

**従来の流れ：**
1. コーディングを中断
2. ブラウザを開く
3. Azure ポータルにアクセス
4. ストレージアカウントの詳細を調べる
5. VS Code に戻る
6. コーディング再開

**今はこうなります：**
1. AI に尋ねる：「Azure ストレージアカウントの状況はどうなっていますか？」
2. 取得した情報をもとにコーディングを続ける

### 初心者にとっての主な利点

#### 1. 🔄 <strong>作業の集中状態を維持</strong>
- 複数のアプリケーション間の切り替えが不要
- 書いているコードに集中できる
- 複数ツール管理の負荷を軽減

#### 2. 🤖 <strong>複雑なコマンドではなく自然言語で操作</strong>
- SQL 構文を覚えなくても必要なデータを説明するだけ
- Azure CLI のコマンドを暗記せずに実現したいことを伝えられる
- 技術的な詳細は AI に任せて、ロジックに集中できる

#### 3. 🔗 <strong>複数ツールを連携させる</strong>
- サービスを組み合わせて強力なワークフロー作成が可能
- 例：「最近の GitHub イシューをすべて取得し、対応する Azure DevOps ワークアイテムを作成する」
- 複雑なスクリプトを書かずに自動化を構築

#### 4. 🌐 <strong>拡大するエコシステムにアクセス</strong>
- Microsoft、GitHub、その他ベンダーが提供するサーバーを利用
- 異なるベンダーのツールをシームレスに組み合わせ可能
- さまざまな AI アシスタントで動作する標準化されたエコシステム参加

#### 5. 🛠️ <strong>実践で学ぶ</strong>
- まず既存のサーバーで概念を理解
- 慣れてきたら自作サーバーの構築にも挑戦
- 利用可能な SDK やドキュメントを通じて学習支援

### 初心者向けの実例

例えば、ウェブ開発を始めたばかりで最初のプロジェクトに取り組んでいる場合、MCP サーバーの助けで：

**従来のやり方：**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**MCP サーバーを使う場合：**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### エンタープライズ標準の利点

MCP は業界標準になりつつあり、次の特徴があります：
- <strong>一貫性</strong>：異なるツールや会社で類似した体験を提供
- <strong>相互運用性</strong>：異なるベンダーのサーバーが連携可能
- <strong>将来性</strong>：スキルや設定が異なる AI アシスタント間で継続利用可能
- <strong>コミュニティ</strong>：豊富な知識やリソースの大規模エコシステム

### はじめに：学べる内容

本ガイドでは、あらゆるレベルの開発者に役立つ 10 の Microsoft MCP サーバーを紹介します。各サーバーは以下を目標に設計されています：
- よくある開発の課題を解決
- 繰り返し作業を軽減
- コード品質を向上
- 学習機会を拡充

> **💡 学習のヒント**
> 
> MCP が全く初めてなら、まず[Introduction to MCP](../00-Introduction/README.md)と[Core Concepts](../01-CoreConcepts/README.md)モジュールをご覧ください。その後、本ガイドに戻って Microsoft の実際のツールでの活用例を確認しましょう。
>
> MCP の重要性に関する追加情報は、Maria Naggaga の投稿も参考にしてください：[Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps)。

## VS Code と Visual Studio での MCP の始め方 🚀

GitHub Copilot と一緒に Visual Studio Code または Visual Studio 2022 を使う場合、これらの MCP サーバーのセットアップは簡単です。

### VS Code のセットアップ

VS Code での基本的な流れは以下の通りです：

1. <strong>エージェントモードを有効化</strong>：VS Code の Copilot Chat ウィンドウでエージェントモードに切り替え
2. **MCP サーバーの設定**：VS Code の `settings.json` にサーバー構成を追加
3. <strong>サーバー起動</strong>：使いたいサーバーごとに「Start」ボタンをクリック
4. <strong>ツール選択</strong>：現在のセッションで有効にする MCP サーバーを選択

詳細な設定手順は[VS Code MCP ドキュメント](https://code.visualstudio.com/docs/copilot/copilot-mcp)を参照してください。

> **💡 プロのヒント：MCP サーバー管理をもっと簡単に！**
> 
> VS Code の拡張機能ビューには[インストール済み MCP サーバーを管理する便利な新 UI](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)が追加されました。起動、停止、管理を直感的なインターフェースで素早く操作可能です。ぜひお試しください！

### Visual Studio 2022 のセットアップ

Visual Studio 2022（バージョン 17.14 以降）では：

1. <strong>エージェントモードを有効化</strong>：GitHub Copilot Chat ウィンドウの「Ask」ドロップダウンから「Agent」を選択
2. <strong>設定ファイル作成</strong>：ソリューションディレクトリに `.mcp.json` ファイルを作成（推奨場所：`<SOLUTIONDIR>\.mcp.json`）
3. <strong>サーバー設定</strong>：標準の MCP 形式でサーバー設定を追加
4. <strong>ツール承認</strong>：ツール使用時に求められるスコープ権限を付与して承認

詳細は[Visual Studio MCP ドキュメント](https://learn.microsoft.com/visualstudio/ide/mcp-servers)を参照してください。

MCP サーバーごとに接続文字列や認証情報など固有の設定はありますが、両 IDE でセットアップパターンは一貫しています。

## Microsoft MCP サーバーから学んだ教訓 🛠️

### 1. 📚 Microsoft Learn Docs MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>概要</strong>: Microsoft Learn Docs MCP サーバーは、Model Context Protocol を介して AI アシスタントに Microsoft の公式ドキュメントへのリアルタイムアクセスを提供するクラウドホスティングサービスです。`https://learn.microsoft.com/api/mcp` に接続し、Microsoft Learn、Azure ドキュメント、Microsoft 365 ドキュメントなどの公式情報を意味検索可能にします。

<strong>利点</strong>: 「ただのドキュメント」ように見えますが、Microsoft テクノロジーを使うすべての開発者にとって極めて重要です。AI コーディングアシスタントに対し、最新の .NET および C# のリリース情報が更新されていないという不満がよく聞かれます。Microsoft Learn Docs MCP サーバーは、最新のドキュメント、API リファレンス、ベストプラクティスをリアルタイムで提供し、この問題を解決します。最新の Azure SDK、C# 13 の新機能、最先端の .NET Aspire パターンを使用している場合でも、このサーバーがあれば AI アシスタントは正確で最新の情報に基づくコードを生成できます。

<strong>実際の利用例</strong>：「公式 Microsoft Learn ドキュメントによると、Azure コンテナーアプリを作成する az cli コマンドは？」や「ASP.NET Core で依存性注入を使って Entity Framework を設定する方法は？」、さらには「このコードが Microsoft Learn ドキュメントのパフォーマンス推奨に沿っているか確認して」といった質問に対応します。サーバーは高度な意味検索を使い、Microsoft Learn、Azure ドキュメント、Microsoft 365 ドキュメントを包括的にカバーし、最大 10 件の高品質なコンテンツチャンク（記事タイトルと URL）を提供し、常に最新のドキュメントにアクセスします。

<strong>注目の例</strong>: サーバーは `microsoft_docs_search` ツールを公開しており、Microsoft の公式技術ドキュメントに対する意味検索を実行します。設定後、「ASP.NET Core で JWT 認証を実装するには？」などの質問に対し、詳細かつ公式の回答と出典リンクが得られます。検索品質は非常に高く、文脈を理解します。たとえば「containers」という用語でも、Azure の文脈なら Azure Container Instances ドキュメントが、.NET の文脈なら C# コレクションの情報が返されます。

これは特に頻繁に更新されるライブラリやユースケースで有用です。最近のプロジェクトでは最新の .NET Aspire と Microsoft.Extensions.AI のリリース機能を活用したい場面がありましたが、Microsoft Learn Docs MCP サーバーを利用することで、API ドキュメントだけでなく最新のウォークスルーやガイダンスも役立てられました。

> **💡 プロのヒント**
> 
> ツールに対応したモデルでも MCP ツールを使うよう誘導が必要です。例えば以下のようなシステムプロンプトや[コパイロット用カスタム指示ファイル](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot)を追加してみましょう：「`microsoft.docs.mcp` にアクセスできます。C#、Azure、ASP.NET Core、Entity Framework など Microsoft 技術に関する質問の際は、このツールを使って最新の公式ドキュメントを検索してください。」
>
> 実例として、Awesome GitHub Copilot リポジトリの[C# .NET Janitor チャットモード](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md)をご覧ください。このモードは Microsoft Learn Docs MCP サーバーを活用し、最新のパターンとベストプラクティスで C# コードのクリーンアップとモダナイズを支援します。

### 2. ☁️ Azure MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

<strong>何をするのか</strong>: Azure MCPサーバーは、Azureエコシステム全体をAIワークフローに取り込む、15以上の専門的なAzureサービスコネクターからなる包括的なスイートです。これは単なるサーバーではなく、リソース管理やデータベース接続（PostgreSQL、SQL Server）、KQLによるAzure Monitorのログ分析、Cosmos DB統合などを含む強力なコレクションです。

<strong>なぜ便利か</strong>: Azureリソースの管理だけでなく、このサーバーはAzure SDKを使用する際のコード品質を大幅に向上させます。Azure MCPをAgentモードで使用すると、コードを「書く手助け」をするだけでなく、最新の認証パターン、エラーハンドリングのベストプラクティス、最新SDK機能を活かした<em>より良い</em>Azureコードを書く支援をします。動作する可能性のある一般的なコードではなく、Azureでの本番ワークロード向け推奨パターンに準拠するコードを得られます。

<strong>主なモジュールには以下が含まれます</strong>:
- **🗄️ データベースコネクター**: Azure Database for PostgreSQLとSQL Serverへの自然言語による直接アクセス
- **📊 Azure Monitor**: KQLによるログ分析と運用インサイト
- **🌐 リソース管理**: フルAzureリソースのライフサイクル管理
- **🔐 認証**: DefaultAzureCredentialとマネージドIDパターン
- **📦 ストレージサービス**: Blob Storage、Queue Storage、Table Storageの操作
- **🚀 コンテナサービス**: Azure Container Apps、Container Instances、AKSの管理
- <strong>その他多くの専門コネクター</strong>

<strong>実際の利用例</strong>: 「私のAzureストレージアカウントを一覧表示して」「過去1時間のエラーをLog Analyticsワークスペースでクエリして」「Node.jsで適切な認証を使ったAzureアプリケーションの作成を手伝って」

<strong>完全なデモシナリオ</strong>: ここでは、Azure MCPとGitHub Copilot for Azure拡張機能をVS Codeで組み合わせる力を示す完全なウォークスルーを紹介します。両方がインストールされている状態で以下のプロンプトを入力すると：

> 「DefaultAzureCredential認証を使用してAzure Blob StorageにファイルをアップロードするPythonスクリプトを作成してください。スクリプトは'mycompanystorage'という名前のAzureストレージアカウントに接続し、'documents'というコンテナにアップロードします。現在のタイムスタンプでテストファイルを作成し、エラー処理を適切に行い、情報量の多い出力を提供し、Azureの認証とエラーハンドリングのベストプラクティスに従い、DefaultAzureCredential認証の仕組みを説明するコメントを含め、関数とドキュメンテーションで構造化されたスクリプトにしてください。」

Azure MCPサーバーは完全な本番対応のPythonスクリプトを生成します。このスクリプトは：
- 最新のAzure Blob Storage SDKを適切な非同期パターンで使用
- DefaultAzureCredentialを包括的なフォールバックチェーンの説明と共に実装
- 特定のAzure例外型を用いた堅牢なエラーハンドリングを含む
- Azure SDKのリソース管理と接続処理のベストプラクティスに従う
- 詳細なログと情報提供のコンソール出力を実装
- 関数、ドキュメント、型ヒントで適切に構造化

このスクリプトの優れている点は、Azure MCPを使わなければ、動くかもしれない一般的なBlobストレージコードしか得られない可能性が高いところです。Azure MCPを使うことで最新の認証方法を活かし、Azure固有のエラーシナリオを処理し、Microsoft推奨の本番アプリケーション用プラクティスに従うコードが得られます。

<strong>特典の例</strong>: azやazd CLIの具体的なコマンドを覚えておくのに苦労していました。いつもまず構文を調べてからコマンドを実行する二段階のプロセスでした。CLI構文を覚えていないことを認めたくなくて、ポータルでクリックして済ませていたこともあります。やりたいことを自然に説明できるのは素晴らしく、しかもIDEから離れずにできるのはさらに良いです！

開始するには[Azure MCPリポジトリ](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server)の豊富なユースケース一覧を見ると良いでしょう。セットアップガイドや高度な設定については[公式Azure MCPドキュメント](https://learn.microsoft.com/azure/developer/azure-mcp-server/)を参照してください。

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

<strong>何をするのか</strong>: 公式GitHub MCPサーバーはGitHubの全エコシステムとシームレスに統合し、ホストされたリモートアクセスおよびローカルDocker展開の両方のオプションを提供します。単なる基本的なリポジトリ操作に留まらず、GitHub Actionsの管理、プルリクエストワークフロー、イシュートラッキング、セキュリティスキャン、通知、そして高度な自動化機能を含む包括的なツールキットです。

<strong>なぜ便利か</strong>: このサーバーはGitHubとのやりとりの仕方を変革し、プラットフォームの全機能を直接開発環境に持ち込みます。VS CodeとGitHub.comを行き来してプロジェクト管理、コードレビュー、CI/CDの監視をする代わりに、自然言語コマンドで全てを扱いながらコードに集中できます。

> **ℹ️ 注意：異なる種類の「エージェント」について**
> 
> このGitHub MCPサーバーはGitHubのCoding Agent（GitHub課題に割り当てて自動コーディングを行うAIエージェント）とは別物です。GitHub MCPサーバーはVS CodeのAgentモード内でGitHub API統合を提供し、Coding AgentはGitHub課題に割り当てられた場合にプルリクエストを作成する別の機能です。

<strong>主な機能</strong>:
- **⚙️ GitHub Actions**: 完全なCI/CDパイプライン管理、ワークフローモニタリング、アーティファクトの操作
- **🔀 プルリクエスト**: PRの作成、レビュー、マージ、包括的なステータストラッキング
- **🐛 イシュー**: イシューのライフサイクル管理、コメント、ラベル付与、担当者管理
- **🔒 セキュリティ**: コードスキャン警告、秘密情報検出、Dependabot統合
- **🔔 通知**: スマート通知管理とリポジトリの購読制御
- **📁 リポジトリ管理**: ファイル操作、ブランチ管理、リポジトリ運用
- **👥 コラボレーション**: ユーザー・組織検索、チーム管理、アクセス制御

<strong>実際の利用例</strong>: 「フィーチャーブランチからプルリクエストを作成して」「今週の失敗したCIランを全部見せて」「リポジトリのオープンなセキュリティアラートを一覧表示して」「自分に割り当てられている全イシューを組織横断で探して」

<strong>完全なデモシナリオ</strong>: GitHub MCPサーバーの機能を示す強力なワークフローはこちら：

> 「スプリントレビューの準備が必要です。今週私が作成したすべてのプルリクエストを表示し、CI/CDパイプラインのステータスを確認し、対処すべきセキュリティ警告をまとめて作成し、'feature'ラベルの付いたマージ済みPRからリリースノートの草案を手伝ってほしい。」

GitHub MCPサーバーは：
- 直近のプルリクエストを詳細なステータス情報付きで取得
- ワークフロー実行を分析し失敗やパフォーマンス問題を強調
- セキュリティスキャン結果をまとめ、重要な警告を優先表示
- マージ済みPRから情報を抽出し包括的なリリースノートを生成
- スプリント計画とリリース準備に向けた実行可能な次のステップを提案

<strong>特典の例</strong>: コードレビューのワークフローで重宝しています。VS Code、GitHub通知、プルリクエストページを行き来せず、「今レビュー待ちのPRを全部見せて」と言い、「PR #123にエラーハンドリングについてのコメントを追加して」と続けるだけです。サーバーはGitHub APIコールを処理し、会話の文脈を保持し、より建設的なレビューコメントの作成まで支援してくれます。

<strong>認証オプション</strong>: OAuth（VS Code内でシームレス）と個人アクセストークンの両方をサポートし、必要なGitHub機能だけを有効にするツールセット設定が可能です。リモートホスト型サービスとしてすぐにセットアップできるほか、Dockerでローカル実行して完全制御も可能です。

> **💡 プロのコツ**
> 
> MCPサーバー設定の`--toolsets`パラメータを調整して必要なツールセットだけを有効化し、コンテキストサイズを減らしAIツール選択を最適化しましょう。例えばコア開発ワークフローには`"--toolsets", "repos,issues,pull_requests,actions"`を、主にGitHub監視用途なら`"--toolsets", "notifications, security"`を設定します。
### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

<strong>何をするのか</strong>: Azure DevOpsサービスに接続し、プロジェクト管理、作業項目追跡、ビルドパイプライン管理、リポジトリ操作を包括的に行えます。

<strong>なぜ便利か</strong>: Azure DevOpsをメインのDevOpsプラットフォームとして使うチームにとって、このMCPサーバーは開発環境とAzure DevOpsのWebインターフェイス間での面倒なタブ切り替えをなくします。作業項目管理やビルドステータス確認、リポジトリ照会、プロジェクト管理作業をAIアシスタントから直接行えます。

<strong>実際の利用例</strong>: 「WebAppプロジェクトの現在のスプリントでアクティブな作業項目を全部見せて」「今見つけたログイン問題のバグ報告を作成して」「私たちのビルドパイプラインの状態を確認し最近の失敗を教えて」

<strong>特典の例</strong>: 「WebAppプロジェクトの現在のスプリントでアクティブな作業項目を全部見せて」や「今見つけたログイン問題のバグ報告を作成して」といった簡単なクエリでチームのスプリント状況を手軽にチェックできます。開発環境を離れる必要がありません。

### 5. 📝 MarkItDown MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

<strong>内容</strong>: MarkItDown は、多様なファイル形式を高品質な Markdown に変換する包括的なドキュメント変換サーバーであり、LLM の活用やテキスト分析ワークフローに最適化されています。

<strong>役立つ理由</strong>: 現代のドキュメントワークフローに不可欠な存在です！ MarkItDown は見出し、リスト、表、リンクなどの重要なドキュメント構造を維持しつつ、多種多様なファイル形式を処理します。単純なテキスト抽出ツールとは異なり、AI 処理および人間の可読性の両方に価値のある意味情報と形式を保つことに注力しています。

<strong>対応ファイル形式</strong>:
- <strong>オフィス文書</strong>: PDF、PowerPoint（PPTX）、Word（DOCX）、Excel（XLSX/XLS）
- <strong>メディアファイル</strong>: 画像（EXIF メタデータおよび OCR 対応）、音声（EXIF メタデータおよび音声転写対応）
- <strong>ウェブコンテンツ</strong>: HTML、RSS フィード、YouTube URL、Wikipedia ページ
- <strong>データ形式</strong>: CSV、JSON、XML、ZIP ファイル（内容を再帰的に処理）
- <strong>出版形式</strong>: EPub、Jupyter ノートブック（.ipynb）
- <strong>メール</strong>: Outlook メッセージ（.msg）
- <strong>高度な機能</strong>: PDF 処理強化のための Azure Document Intelligence 統合対応

<strong>高度な機能</strong>: MarkItDown は OpenAI クライアント提供時に LLM による画像説明をサポートし、Azure Document Intelligence による高度な PDF 処理、音声内容の文字起こし、および追加のファイル形式拡張のためのプラグインシステムを備えています。

<strong>実際の活用例</strong>: 「この PowerPoint プレゼンテーションをドキュメントサイト用の Markdown に変換する」「この PDF から適切な見出し構造でテキストを抽出する」「この Excel スプレッドシートを読みやすい表形式に変換する」など。

<strong>注目の例</strong>: [MarkItDown ドキュメント](https://github.com/microsoft/markitdown#why-markdown)から引用：

> Markdown はシンプルなテキストに非常に近く、最小限のマークアップまたは書式設定ながら、重要なドキュメント構造を表現できます。OpenAI の GPT-4o などの主流 LLM は、Markdown をネイティブに「話し」、しばしば応答に無意識のうちに Markdown を組み込んでいます。これは大量の Markdown 形式テキストを学習して理解していることを示唆しています。副次的に、Markdown の文法はトークン効率も非常に高いです。

MarkItDown はドキュメントの構造を保持することに非常に優れており、AI ワークフローで重要な役割を果たします。例えば PowerPoint プレゼンテーションを変換するときは、スライドの整理を適切な見出しで維持し、表は Markdown 表として抽出し、画像の alt テキストも含み、発表者ノートも処理します。チャートは読みやすいデータ表に変換され、生成された Markdown は元のプレゼンテーションの論理的な流れを保ちます。これにより、発表内容を AI システムに供給したり、既存スライドからドキュメントを作成したりするのに最適です。
### 6. 🗃️ SQL Server MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

<strong>内容</strong>: SQL Server データベース（オンプレミス、Azure SQL、Fabric）への対話型アクセスを提供します

<strong>役立つ理由</strong>: PostgreSQL サーバーと同様ですが、Microsoft SQL エコシステム向けです。簡単な接続文字列で接続し、自然言語でクエリを開始できます。コンテキスト切り替えが不要です！

<strong>実際の活用例</strong>: 「過去30日間に未完了の注文をすべて見つける」という要求を適切な SQL クエリに翻訳し、フォーマット済み結果を返します

<strong>注目の例</strong>: データベース接続を設定すれば、すぐにデータとの対話が始められます。ブログ投稿では「どのデータベースに接続していますか？」という簡単な質問で紹介しています。MCP サーバーは適切なデータベースツールを呼び出し、SQL Server インスタンスに接続し、現在のデータベース接続の詳細を返します。SQL 文を書かずにこれが可能です。サーバーはスキーマ管理からデータ操作まで包括的なデータベース操作を自然言語プロンプトでサポートしています。VS Code と Claude Desktop での完全なセットアップ手順および構成例は、[Introducing MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/) を参照してください。


### 7. 🎭 Playwright MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

<strong>内容</strong>: AI エージェントがテストや自動化のためにウェブページと対話できるようにする

> **ℹ️ GitHub Copilot を支援**
> 
> Playwright MCP Server は GitHub Copilot のコーディングエージェントにウェブ閲覧機能を提供しています！[この機能について詳しくはこちら](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/)。

<strong>役立つ理由</strong>: 自然言語の説明に基づいた自動テストに最適です。AI はウェブサイトをナビゲートし、フォームに入力し、構造化されたアクセシビリティスナップショットを通じたデータ抽出が可能です。非常に強力な機能です！

<strong>実際の活用例</strong>: 「ログインフローをテストしてダッシュボードが正しく読み込まれることを検証する」や「製品を検索して結果ページを検証するテストを生成する」など、アプリケーションのソースコードなしで実行可能。

<strong>注目の例</strong>: チームメイトの Debbie O'Brien は Playwright MCP Server を使って素晴らしい仕事をしています。例えば、アプリのソースコードにアクセスできなくても完全な Playwright テストを生成できる方法を最近示しました。彼女のケースでは、Copilot に映画検索アプリのテスト作成を依頼しました。サイトにアクセスし、「Garfield」を検索、結果に映画が表示されることを確認するテストです。MCP はブラウザセッションを起動し、DOM スナップショットでページ構造を調査、適切なセレクターを特定し、一度の実行で成功した完全な TypeScript テストコードを生成しました。

この強力な点は、自然言語指示と実行可能なテストコードの橋渡しをすることです。従来は手動でのテスト作成かコードベースのアクセスが必要でしたが、Playwright MCP なら外部サイトやクライアントアプリ、ブラックボックステストシナリオでコードアクセスがなくてもテストできます。


### 8. 💻 Dev Box MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>内容</strong>: 自然言語で Microsoft Dev Box 環境を管理

<strong>役立つ理由</strong>: 開発環境管理を非常に簡素化します！特定コマンドを覚えずに開発環境の作成、設定、管理が可能です。

<strong>実際の活用例</strong>: 「最新の .NET SDK 付きの新しい Dev Box をセットアップし、プロジェクト用に設定する」「自分のすべての開発環境の状態を確認する」「チームのプレゼン用に標準化されたデモ環境を作成する」など。

<strong>注目の例</strong>: 私は個人開発用に Dev Box の利用が大好きです。印象に残ったのは James Montemagno が、会議やホテル、飛行機の WiFi が不安定な場合でも超高速イーサネット接続が利用できるため、会議デモに Dev Box が非常に優れていると説明した時です。実際、私は最近、バスでブルージュからアントワープへ移動中にスマホのホットスポットにラップトップを接続して会議用デモ練習をしました！次の課題は複数の開発環境管理や標準化されたチームデモ環境の運用を掘り下げることです。また、多くの顧客や同僚から聞く大きな用途は、事前設定済みの開発環境の利用です。どちらの場合でも、MCP を使って Dev Box の設定・管理を自然言語で行い、開発環境内で完結できます。

### 9. 🤖 Microsoft Foundry MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

<strong>機能概要</strong>: Microsoft Foundry MCP サーバーは、モデルカタログ、デプロイ管理、Azure AI Search を用いた知識インデックス作成、評価ツールなど、Azure の AI エコシステムへの包括的なアクセスを開発者に提供します。この実験的サーバーは AI 開発と Azure の強力な AI インフラストラクチャとのギャップを埋め、AI アプリケーションの構築、デプロイ、評価を容易にします。

<strong>有用性</strong>: このサーバーは、エンタープライズレベルの AI 機能を直接開発ワークフローに取り入れることで、Azure AI サービスの利用方法を変革します。Azure ポータル、ドキュメント、IDE 間を行き来する代わりに、自然言語コマンドを使ってモデルの発見、サービスのデプロイ、知識ベースの管理、AI のパフォーマンス評価が可能です。特に RAG (Retrieval-Augmented Generation) アプリケーションの構築、多数モデルのデプロイ管理、包括的な AI 評価パイプラインの実装に強力です。

<strong>主な開発者機能</strong>:
- **🔍 モデルの探索とデプロイ**: Microsoft Foundry のモデルカタログを探索し、コードサンプル付きの詳細モデル情報を取得し、Azure AI サービスへモデルをデプロイ
- **📚 知識管理**: Azure AI Search のインデックス作成と管理、ドキュメントの追加、インデクサー設定、洗練された RAG システムの構築
- **⚡ AI エージェント連携**: Azure AI エージェントと接続し、既存エージェントを照会、運用シナリオでのエージェント性能評価
- **📊 評価フレームワーク**: 文章およびエージェントの包括的な評価実行、マークダウンレポート生成、AI アプリケーションの品質保証実装
- **🚀 プロトタイピングツール**: GitHub ベースのプロトタイピング設定方法を提供し、Microsoft Foundry Labs の最先端研究モデルにアクセス

<strong>実用例</strong>: 「Phi-4 モデルを自分のアプリ用に Azure AI サービスへデプロイする」「ドキュメント RAG システム用に新しい検索インデックスを作成する」「エージェントの応答を品質指標で評価する」「複雑な分析タスクに最適な推論モデルを探す」

<strong>フルデモシナリオ</strong>: 効果的な AI 開発ワークフロー例:

> 「カスタマーサポートエージェントを構築中。モデルカタログから優れた推論モデルを見つけて Azure AI サービスへデプロイし、ドキュメントから知識ベースを作成、応答品質テスト用の評価フレームワークをセットアップし、GitHub トークンを用いた統合プロトタイプも試したい。」

Microsoft Foundry MCP サーバーは以下を実施します：
- 要件に基づき最適な推論モデルをモデルカタログから推薦
- 選択した Azure リージョン向けのデプロイコマンドとクォータ情報を提供
- ドキュメントに最適なスキーマの Azure AI Search インデックスを設定
- 品質指標と安全チェックを備えた評価パイプラインを構成
- 即時テスト用の GitHub 認証を含むプロトタイピングコード生成
- 利用技術スタックに合わせた包括的セットアップガイドを提供

<strong>注目の例</strong>: 私はこれまで多数の LLM モデルを追いきれていませんでした。知っている主要モデルは数点ですが、生産性や効率向上を逃している感覚があります。トークンやクォータ管理もストレスで、適切なタスクに適切なモデルを選べているのか、予算を無駄遣いしているのか分からず不安でした。今回チームメイトから MCP サーバーの話を聞いて James Montemagno から紹介を受け、導入を楽しみにしています。モデル探索機能は、普段使われるモデル以外の特定用途に最適化されたモデルを探りたい私のニーズに非常にマッチしています。評価フレームワークは、単に新しいことを試すだけでなく、本当に結果が向上しているか検証するのに役立ちます。

> **ℹ️ 実験的ステータス**
> 
> 本 MCP サーバーは実験的であり、活発に開発中です。機能や API は変更される可能性があります。Azure AI 機能の探索やプロトタイプ作成に最適ですが、本番利用時は安定性を必ず検証してください。
### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

<strong>機能概要</strong>: Microsoft 365 および Microsoft 365 Copilot と統合する AI エージェントやアプリケーション構築のために、スキーマ検証、サンプルコード取得、トラブルシューティング支援などの必須ツールを開発者に提供します。

<strong>有用性</strong>: Microsoft 365 および Copilot 向け開発は複雑なマニフェストスキーマや特定の開発パターンを伴います。本 MCP サーバーは必須の開発リソースをコーディング環境に直接もたらし、スキーマ検証、サンプルコード探索、よくある問題のトラブルシューティングをドキュメント参照なしで支援します。

<strong>実用例</strong>: 「宣言型エージェントマニフェストの検証とスキーマエラーの修正」「Microsoft Graph API プラグイン実装のサンプルコード表示」「Teams アプリ認証問題のトラブルシューティング支援」

<strong>注目の例</strong>: Build イベントで M365 エージェントについて友人の John Miller と話した際、この MCP を勧められました。ドキュメントに埋もれずに入門できるテンプレートやサンプルコード、スキャフォールディングがあるので M365 エージェント初心者に最適だと思います。スキーマ検証機能はマニフェスト構造の誤りによる長時間のデバッグ回避に特に有用そうです。

> **💡 プロのヒント**
> 
> 本サーバーは Microsoft Learn Docs MCP サーバーと併用すると包括的な M365 開発支援が得られます。一方が公式ドキュメントを提供し、もう一方が実用的な開発ツールとトラブルシューティング支援を提供します。


## 次は？ 🔮

## 📋 結論

モデルコンテキストプロトコル (MCP) は、開発者が AI アシスタントや外部ツールとやり取りする方法を変革しています。これら 10 の Microsoft MCP サーバーは、標準化された AI 統合の力を示し、強力な外部機能にアクセスしつつ開発者が作業の流れを維持できるシームレスなワークフローを実現します。

包括的な Azure エコシステムとの統合から、ブラウザ自動化の Playwright やドキュメント処理の MarkItDown といった専門ツールまで、これらのサーバーは多様な開発シナリオでの生産性向上に MCP がどのように寄与するかを明示しています。標準化されたプロトコルにより、これらのツールは互いに連携し、統一された開発体験を創出します。

MCP エコシステムは引き続き進化しており、コミュニティとの関わり、新たなサーバーの探索、カスタムソリューションの構築が開発生産性最大化の鍵となります。MCP はオープンスタンダードであるため、異なるベンダーのツールを組み合わせて特定ニーズに最適なワークフローを作成可能です。

## 🔗 追加リソース

- [Official Microsoft MCP Repository](https://github.com/microsoft/mcp)
- [MCP Community & Documentation](https://modelcontextprotocol.io/introduction)
- [VS Code MCP Documentation](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP Documentation](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP Documentation](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP Events](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot Customizations](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days Live 29th/30th July or watch on Demand ](https://aka.ms/mcpdevdays)

## 🎯 演習課題

1. <strong>インストールと設定</strong>: VS Code 環境にいずれかの MCP サーバーをセットアップし、基本機能をテストする。
2. <strong>ワークフロー統合</strong>: 少なくとも 3 つの異なる MCP サーバーを組み合わせた開発ワークフローを設計する。
3. <strong>カスタムサーバー計画</strong>: 日常の開発タスクでカスタム MCP サーバーが役立つ場面を特定し、その仕様を作成する。
4. <strong>パフォーマンス分析</strong>: MCP サーバー利用と従来手法の共通開発タスクにおける効率を比較する。
5. <strong>セキュリティ評価</strong>: MCP サーバーを開発環境で利用する際のセキュリティ影響を評価し、ベストプラクティスを提案する。


Next:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->