# ケーススタディ：API Management で REST API を MCP サーバーとして公開する

Azure API Management は、API エンドポイントの上にゲートウェイを提供するサービスです。Azure API Management は API の前面でプロキシのように動作し、受信リクエストに対してどのように処理するかを決定します。

これを利用することで、以下のような多くの機能を追加できます。

- **セキュリティ**：API キー、JWT、マネージド ID などあらゆる方法を使用できます。
- **レート制限**：一定時間内に通過できる呼び出し数を決定できる優れた機能です。これによりすべてのユーザーが良好な体験を得られ、サービスが過剰なリクエストで圧倒されるのを防げます。
- **スケーリング & ロードバランシング**：複数のエンドポイントを設定して負荷を分散でき、「ロードバランス」の方法も選択可能です。
- **意味的キャッシングなどの AI 機能**、トークン制限やトークン監視などがあります。これらは応答性を向上させる優れた機能であり、トークン使用量を管理するのに役立ちます。[詳しくはこちら](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)。

## なぜ MCP と Azure API Management の組み合わせなのか？

Model Context Protocol は、エージェント型 AI アプリケーションやツール・データを一貫した方法で公開する標準になりつつあります。Azure API Management は API を「管理」する必要がある場合に自然な選択肢です。MCP サーバーはツールへのリクエストを解決するために他の API と統合されることが多いため、Azure API Management と MCP を組み合わせることは非常に理にかなっています。

## 概要

本使用例では、API エンドポイントを MCP サーバーとして公開する方法を学びます。これにより、これらのエンドポイントをエージェント型アプリケーションの一部に簡単に組み込みながら、Azure API Management の機能も活用できます。

## 主な機能

- 公開したいエンドポイントのメソッドを選択できます。
- 追加される機能は API のポリシー設定に依存しますが、ここではレート制限の追加方法を紹介します。

## 事前ステップ：API をインポートする

既に Azure API Management に API があればこのステップはスキップできます。まだの場合は、[Azure API Management への API インポート](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api) のリンクを参照してください。

## API を MCP サーバーとして公開する

API エンドポイントを公開するには、以下の手順に従います：

1. Azure ポータルに移動し、次のアドレスにアクセスします <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
API Management インスタンスに移動します。

1. 左メニューから [APIs] > [MCP Servers] > [+ Create new MCP Server] を選択します。

1. API で MCP サーバーとして公開したい REST API を選択します。

1. 1つ以上の API 操作をツールとして公開するために選択します。すべての操作を選択するか、特定の操作だけを選べます。

    ![公開するメソッドを選択](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. **作成** を選択します。

1. メニューの **APIs** と **MCP Servers** に移動すると、次のように表示されます：

    ![メインペインに MCP サーバーが表示される](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP サーバーが作成され、API 操作がツールとして公開されています。MCP サーバーは MCP Servers ペインにリストされ、URL 列にはテストやクライアントアプリ内で呼び出せる MCP サーバーのエンドポイントが表示されます。

## オプション：ポリシーの設定

Azure API Management では、API エンドポイントに対してレート制限や意味的キャッシュなどのさまざまなルールを設定できるポリシーという概念があります。ポリシーは XML で記述されます。

MCP サーバーの呼び出しをレート制限するポリシーを設定する手順は以下の通りです：

1. ポータルの APIs で **MCP Servers** を選択します。

1. 作成した MCP サーバーを選択します。

1. 左メニューの MCP 配下の **Policies** を選択します。

1. ポリシーエディターで MCP サーバーのツールに適用したいポリシーを追加・編集します。ポリシーは XML 形式で定義します。例えば、クライアント IP アドレスごとに30秒間に最大5回の呼び出しに制限するポリシーは以下の XML です。

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    ポリシーエディターの画面例：

    ![ポリシーエディター](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## 試してみる

MCP サーバーが期待通り機能しているか確認します。

ここでは Visual Studio Code と GitHub Copilot の Agent モードを使用します。MCP サーバーを *mcp.json* に追加します。こうすることで Visual Studio Code がエージェント機能付きクライアントとして動作し、エンドユーザーはプロンプトを入力してサーバーと対話できます。

Visual Studio Code に MCP サーバーを追加する方法は以下の通りです：

1. コマンドパレットから MCP: **Add Server** コマンドを使用します。

1. 案内に従い、サーバータイプを選択：**HTTP (HTTP または Server Sent Events)**。

1. API Management の MCP サーバーの URL を入力します。例：**https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse**（SSE エンドポイントの場合）または **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp**（MCP エンドポイントの場合）。トランスポートの違いは `/sse` または `/mcp` の部分です。

1. 任意のサーバー ID を入力します。重要な値ではありませんが、サーバーの識別に役立ちます。

1. 設定をワークスペース設定またはユーザー設定のどちらに保存するか選択します。

  - **ワークスペース設定** – サーバー設定は現在のワークスペース内の `.vscode/mcp.json` ファイルにのみ保存されます。

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    ストリーミング HTTP をトランスポートとして選択すると、内容が少し異なります：

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **ユーザー設定** – サーバー設定はグローバルな *settings.json* に追加され、すべてのワークスペースで利用可能です。設定内容は以下のようになります：

    ![ユーザー設定](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. 認証のために Azure API Management に正しくアクセスできるようヘッダーを追加する必要があります。**Ocp-Apim-Subscription-Key** というヘッダーを使用します。

    - これを設定に追加する方法：

    ![認証用のヘッダー追加](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)  
    これにより Azure ポータル上で見つかる API キーの値を入力するプロンプトが表示されます。

    - 代わりに *mcp.json* に次のように追加することもできます：

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Agent モードを使う

設定や *.vscode/mcp.json* のどちらかが完了したら、試してみましょう。

以下のように、公開されたツールの一覧が表示されるツールアイコンがあります：

![サーバーのツール](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. ツールアイコンをクリックすると、ツールの一覧が表示されます：

    ![ツール](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. チャットにプロンプトを入力しツールを呼び出します。例えば、注文情報を取得するツールを選択した場合、エージェントに注文のことを尋ねます。以下は例です：

    ```text
    get information from order 2
    ```

    するとツールを実行するかどうかのツールアイコンが表示されます。続行を選ぶと、以下のような結果が表示されます：

    ![プロンプトの結果](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **上に表示される内容は設定したツールによりますが、基本的には上記のようなテキストレスポンスが得られます**


## 参考文献

さらに詳しく学ぶには以下をご覧ください：

- [Azure API Management と MCP のチュートリアル](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python サンプル：Azure API Management を利用した安全なリモート MCP サーバー (実験的)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP クライアント認証ラボ](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [VS Code 用 Azure API Management 拡張機能で API をインポート・管理](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API Center でリモート MCP サーバーを登録・検出する](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Azure API Management を活用した多くの AI 機能を示す優れたリポジトリ
- [AI Gateway ワークショップ](https://azure-samples.github.io/AI-Gateway/) Azure ポータルを使用したワークショップを含み、AI 機能の評価を始めるのに最適

## 次に進む

- 戻る: [ケーススタディ概要](./README.md)
- 次へ: [Azure AI トラベルエージェント](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：  
本書類はAI翻訳サービス「Co-op Translator」（https://github.com/Azure/co-op-translator）を使用して翻訳されました。正確性の確保に努めておりますが、自動翻訳には誤りや不正確な表現が含まれる場合があります。原文の言語によるオリジナル文書が公式の情報源とみなされるべきです。重要な情報については、専門の人間による翻訳をお勧めします。本翻訳の利用により生じた誤解や誤訳について、当方は一切責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->