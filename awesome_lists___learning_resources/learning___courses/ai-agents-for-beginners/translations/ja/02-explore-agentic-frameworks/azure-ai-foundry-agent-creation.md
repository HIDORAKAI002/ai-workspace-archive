# Microsoft Foundry エージェント サービス開発

この演習では、[Microsoft Foundry ポータル](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) の Microsoft Foundry エージェント サービスツールを使用して、フライト予約のためのエージェントを作成します。エージェントはユーザーと対話し、フライトに関する情報を提供できます。

## 前提条件

この演習を完了するには、以下が必要です:
1. 有効なサブスクリプションがある Azure アカウント。[無料でアカウント作成](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)。
2. Microsoft Foundry ハブを作成する権限があるか、作成済みのハブがあること。
    - ロールが Contributor または Owner の場合は、このチュートリアルの手順に従います。

## Microsoft Foundry ハブの作成

> **注意:** Microsoft Foundry は以前 Azure AI Studio と呼ばれていました。

1. [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ブログ投稿のガイドラインに従い、Microsoft Foundry ハブを作成します。
2. プロジェクトが作成されたら、表示されるチップを閉じ、Microsoft Foundry ポータルのプロジェクトページを確認します。以下の画像のようになっているはずです：

    ![Microsoft Foundry Project](../../../translated_images/ja/azure-ai-foundry.88d0c35298348c2f.webp)

## モデルのデプロイ

1. プロジェクト左側のペインで、<strong>マイ資産</strong> セクションの **モデル + エンドポイント** ページを選択します。
2. **モデル + エンドポイント** ページの <strong>モデルのデプロイ</strong> タブで、**+ モデルをデプロイ** メニューから <strong>ベースモデルをデプロイ</strong> を選択します。
3. 一覧から `gpt-4.1-mini` モデルを検索し、選択して確認します。

    > <strong>注意</strong>: TPM を下げることで、使用しているサブスクリプションのクォータの過剰使用を回避できます。

    ![Model Deployed](../../../translated_images/ja/model-deployment.3749c53fb81e18fd.webp)

## エージェントの作成

モデルをデプロイしたので、エージェントを作成できます。エージェントは、ユーザーと対話できる会話型AIモデルです。

1. プロジェクト左側のペインで、<strong>ビルドとカスタマイズ</strong> セクションの <strong>エージェント</strong> ページを選択します。
2. <strong>エージェントを作成</strong> をクリックして新しいエージェントを作成します。<strong>エージェント設定</strong> ダイアログボックスでは：
    - エージェント名に例として `FlightAgent` を入力します。
    - 先に作成した `gpt-4.1-mini` モデルのデプロイが選択されていることを確認します。
    - エージェントが従うプロンプトとして <strong>指示</strong> を設定します。例を次に示します：
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> 詳細なプロンプトについては、[このリポジトリ](https://github.com/ShivamGoyal03/RoamMind) を参照してください。
    
> さらに、<strong>ナレッジベース</strong> と <strong>アクション</strong> を追加して、ユーザーの要求に基づく情報提供や自動タスク実行機能を強化できます。この演習ではこれらのステップは省略できます。
    
![Agent Setup](../../../translated_images/ja/agent-setup.9bbb8755bf5df672.webp)

3. 新しいマルチAIエージェントを作成するには、単に <strong>新エージェント</strong> をクリックします。作成されたエージェントがエージェントページに表示されます。


## エージェントのテスト

エージェントを作成した後、Microsoft Foundry ポータルのプレイグラウンドでユーザーの問い合わせにどう応答するかテストできます。

1. エージェントの <strong>セットアップ</strong> ペイン上部で、<strong>プレイグラウンドで試す</strong> を選択します。
2. <strong>プレイグラウンド</strong> ペインでチャットウィンドウに問い合わせを入力してエージェントと対話します。例えば、「28日にシアトルからニューヨークへのフライトを探して」とエージェントに尋ねることができます。

    > <strong>注意</strong>: この演習では実データが使用されていないため、エージェントの応答が正確でない場合があります。目的は、指示に基づいてユーザーの質問を理解し応答する能力をテストすることです。

    ![Agent Playground](../../../translated_images/ja/agent-playground.dc146586de715010.webp)

3. テスト後に、さらに意図や学習データ、アクションを追加して機能を強化することも可能です。

## リソースのクリーンアップ

エージェントのテストが終わったら、追加料金発生を避けるためにエージェントを削除できます。
1. [Azure ポータル](https://portal.azure.com) を開き、この演習で使用したハブリソースをデプロイしたリソースグループを表示します。
2. ツールバーで <strong>リソースグループの削除</strong> を選択します。
3. リソースグループ名を入力して削除を確認します。

## 参考資料

- [Microsoft Foundry ドキュメント](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry ポータル](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry の始め方](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure における AI エージェントの基礎](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->