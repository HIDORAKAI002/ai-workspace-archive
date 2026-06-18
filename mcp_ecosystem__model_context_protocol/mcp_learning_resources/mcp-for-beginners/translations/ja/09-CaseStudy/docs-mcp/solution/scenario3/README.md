# シナリオ3：VS CodeでMCPサーバーを使ったエディタ内ドキュメント

## 概要

このシナリオでは、MCPサーバーを使用してMicrosoft Learn DocsをVisual Studio Code環境内に直接取り込む方法を学びます。ドキュメントを探すためにブラウザのタブを頻繁に切り替える代わりに、エディタ内で公式ドキュメントを検索・参照できます。この方法はワークフローを効率化し、集中力を維持し、GitHub Copilotなどのツールとのシームレスな統合を可能にします。

- VS Code内でドキュメントを検索・閲覧し、コーディング環境を離れる必要がありません。
- ドキュメントを参照し、READMEやコースファイルにリンクを直接挿入できます。
- GitHub CopilotとMCPを組み合わせて、シームレスでAI対応のドキュメント作成ワークフローを利用できます。

## 学習目標

この章の終わりまでに、VS Code内でMCPサーバーを設定・使用して、ドキュメントと開発のワークフローを強化する方法を理解できるようになります。以下が可能になります：

- ドキュメント検索のためにMCPサーバーを使用するようワークスペースを設定する。
- VS Code内から直接ドキュメントを検索・挿入する。
- GitHub CopilotとMCPの力を組み合わせて、生産性が向上したAI強化ワークフローを実現する。

これらのスキルは、集中力を維持し、ドキュメントの品質を向上させ、開発者や技術ライターとしての生産性を高めるのに役立ちます。

## ソリューション

エディタ内ドキュメントアクセスを実現するために、MCPサーバーをVS CodeおよびGitHub Copilotと統合する一連の手順に従います。このソリューションは、コース作成者、ドキュメント作成者、そしてドキュメントとCopilotを使いながらエディタに集中したい開発者に最適です。

- コースやプロジェクトのドキュメントを書きながらREADMEに参照リンクを素早く追加する。
- Copilotでコードを生成し、MCPで関連ドキュメントを即座に見つけて引用する。
- エディタに集中しつつ生産性を向上させる。

### ステップバイステップガイド

開始するには次の手順に従ってください。各ステップにはassetsフォルダーからのスクリーンショットを追加して、プロセスを視覚的に説明できます。

1. **MCP設定を追加する：**  
   プロジェクトルートに `.vscode/mcp.json` ファイルを作成し、次の設定を追加します:  
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   
   この設定は、VS Codeに [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp) への接続方法を伝えます。
   
   ![Step 1: Add mcp.json to .vscode folder](../../../../../../translated_images/ja/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **GitHub Copilot Chatパネルを開く：**  
   GitHub Copilot拡張機能がまだインストールされていない場合は、VS Codeの拡張機能ビューからインストールしてください。直接 [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) からダウンロードできます。サイドバーからCopilot Chatパネルを開きます。

   ![Step 2: Open Copilot Chat panel](../../../../../../translated_images/ja/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **エージェントモードを有効にしツールを確認する：**  
   Copilot Chatパネルでエージェントモードを有効にします。

   ![Step 3: Enable agent mode and verify tools](../../../../../../translated_images/ja/step3-agent-mode.cdc32520fd7dd1d1.webp)

   エージェントモードを有効にした後、MCPサーバーが利用可能なツールの一覧にあることを確認してください。これにより、Copilotエージェントが関連情報を取得するためにドキュメントサーバーにアクセスできるようになります。
   
   ![Step 3: Verify MCP server tool](../../../../../../translated_images/ja/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **新しいチャットを開始しエージェントに問い合わせる：**  
   Copilot Chatパネルで新しいチャットを開きます。ドキュメントの質問をエージェントに投げかけてください。エージェントはMCPサーバーを使って、Microsoft Learnの関連ドキュメントを直接エディタ内に取得・表示します。

   - *「トピックXの学習計画を作成しようとしています。8週間勉強する予定なので、各週ごとに取り組むべき内容を提案してください。」*

   ![Step 4: Prompt the agent in chat](../../../../../../translated_images/ja/step4-prompt-chat.12187bb001605efc.webp)

5. **ライブクエリ：**

   > Microsoft Foundry Discordの [#get-help](https://discord.gg/D6cRhjHWSC) セクションからライブクエリを取り上げます（[元のメッセージを見る](https://discord.com/channels/1113626258182504448/1385498306720829572)）：
   
   *「Azure AI Foundryで開発したAIエージェントを使ったマルチエージェントソリューションの展開方法について知りたいです。Copilot Studioチャネルのような直接的な展開方法はないようですが、エンタープライズユーザーが相互に連携して作業するための展開方法にはどのようなものがありますか？  
  MS TeamsとAzure AI Foundryエージェントの橋渡しとしてAzure Botサービスを使う方法を提案する記事やブログをいくつか見ました。Azure BotをセットアップしてAzure Function経由でOrchestrator Agentを接続すればうまくいくのでしょうか？それともマルチエージェントソリューションの各AIエージェントごとにAzure Functionを作成し、Bot Frameworkでオーケストレーションする必要がありますか？その他の提案も歓迎します。」*

   ![Step 5: Live queries](../../../../../../translated_images/ja/step5-live-queries.49db3e4a50bea273.webp)

   エージェントは関連するドキュメントリンクや要約で応答し、それをMarkdownファイルに直接挿入したりコードの参照として使用したりできます。
   
### サンプルクエリ

以下は試せるクエリの例です。これらのクエリを使うことで、MCPサーバーとCopilotが連携してVS Codeを離れずに即時にコンテキストに応じたドキュメントや参照を提供できることが示されます：

- 「Azure Functionsのトリガーの使い方を教えてください。」
- 「Azure Key Vaultの公式ドキュメントへのリンクを挿入してください。」
- 「Azureリソースを保護するためのベストプラクティスは何ですか？」
- 「Azure AIサービスのクイックスタートを見つけてください。」

これらのクエリは、MCPサーバーとCopilotが連携し、VS Codeを離れずに即座にコンテキストに適したドキュメントと参照を提供する方法を示します。

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->