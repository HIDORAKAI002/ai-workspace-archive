# Azure AI エージェントサービス開発

この演習では、[Microsoft Foundry ポータル](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) の Azure AI エージェントサービスツールを使用して、フライト予約用のエージェントを作成します。エージェントはユーザーと対話し、フライトに関する情報を提供できるようになります。

## 前提条件

この演習を完了するには、次のものが必要です：
1. 有効なサブスクリプションを持つ Azure アカウント。[無料でアカウントを作成](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)。
2. Microsoft Foundry ハブを作成する権限があるか、代わりに作成してもらえること。
    - 役割が Contributor または Owner の場合は、このチュートリアルの手順に従えます。

## Microsoft Foundry ハブの作成

> **注意:** Microsoft Foundry は以前は Azure AI Studio と呼ばれていました。

1. [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) のブログ投稿にある Microsoft Foundry ハブ作成に関するガイドラインに従ってください。
2. プロジェクトが作成されたら、表示されるヒントを閉じ、Microsoft Foundry ポータルのプロジェクトページを確認してください。以下の画像のようになっているはずです：

    ![Microsoft Foundry Project](../../../translated_images/ja/azure-ai-foundry.88d0c35298348c2f.webp)

## モデルの展開

1. プロジェクトの左側ペインで、**My assets** セクションの **Models + endpoints** ページを選択します。
2. **Models + endpoints** ページの **Model deployments** タブで、**+ Deploy model** メニューから **Deploy base model** を選択します。
3. リストで `gpt-4o-mini` モデルを検索し、選択して確定します。

    > **注意**: TPM を下げることで、使用しているサブスクリプションの利用可能な割り当て超過を防げます。

    ![Model Deployed](../../../translated_images/ja/model-deployment.3749c53fb81e18fd.webp)

## エージェントの作成

モデルを展開したので、エージェントを作成できます。エージェントはユーザーと対話できる会話型 AI モデルです。

1. プロジェクトの左側ペインで、**Build & Customize** セクションの **Agents** ページを選択します。
2. **+ Create agent** をクリックして新しいエージェントを作成します。**Agent Setup** ダイアログボックスで：
    - エージェントの名前（例：`FlightAgent`）を入力します。
    - 先に作成した `gpt-4o-mini` モデルのデプロイメントが選択されていることを確認します。
    - エージェントに従わせたい指示を **Instructions** に設定します。例は以下の通りです：
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
> 詳細なプロンプトについては、[こちらのリポジトリ](https://github.com/ShivamGoyal03/RoamMind) をご覧ください。
    
> さらに、**Knowledge Base** や **Actions** を追加してエージェントの機能を強化し、ユーザーの要求に基づいた情報提供や自動化されたタスクの実行を可能にできます。この演習ではこれらのステップは省略できます。
    
![Agent Setup](../../../translated_images/ja/agent-setup.9bbb8755bf5df672.webp)

3. 新しいマルチ AI エージェントを作成するには、**New Agent** をクリックします。新しく作成されたエージェントが Agents ページに表示されます。

## エージェントのテスト

エージェント作成後、Microsoft Foundry ポータルのプレイグラウンドでユーザーの問い合わせに対する反応をテストできます。

1. エージェントの **Setup** ペインの上部で、**Try in playground** を選択します。
2. **Playground** ペインで、チャットウィンドウにクエリを入力してエージェントと対話します。例として、「シアトルからニューヨークへの28日のフライトを検索して」とエージェントに依頼できます。

    > **注意**: 本演習ではリアルタイムデータを使用していないため、エージェントの回答が正確ではない場合があります。目的は、エージェントが指示に基づいてユーザーのクエリを理解し応答する能力をテストすることです。

    ![Agent Playground](../../../translated_images/ja/agent-playground.dc146586de715010.webp)

3. エージェントをテストした後、意図やトレーニングデータ、アクションを追加して機能をさらにカスタマイズできます。

## リソースのクリーンアップ

エージェントのテストが完了したら、追加コストを避けるためにエージェントを削除できます。
1. [Azure ポータル](https://portal.azure.com) を開き、この演習で使用したハブリソースを展開したリソースグループの内容を表示します。
2. ツールバーで **Delete resource group** を選択します。
3. リソースグループ名を入力し、削除することを確認します。

## リソース

- [Microsoft Foundry ドキュメント](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry ポータル](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio 入門](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure における AI エージェントの基本](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：  
本書類はAI翻訳サービス[Co-op Translator](https://github.com/Azure/co-op-translator)を使用して翻訳されました。正確性を期しておりますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の言語による文書が正式な情報源とみなされます。重要な情報については、専門の人間翻訳を推奨いたします。本翻訳の利用に起因するいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->