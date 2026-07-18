[![良いAIエージェントの設計方法](../../../translated_images/ja/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(上の画像をクリックすると、このレッスンのビデオが表示されます)_

# ツール使用デザインパターン

ツールは、AIエージェントにより広範な能力を持たせるため、興味深い存在です。エージェントが実行できるアクションが限定される代わりに、ツールを追加することで、エージェントはさまざまなアクションを実行できるようになります。この章では、AIエージェントが特定の目標を達成するために特定のツールを使用する方法を説明するツール使用デザインパターンについて見ていきます。

## はじめに

このレッスンでは、以下の質問に答えようとしています：

- ツール使用デザインパターンとは何か？
- どのようなユースケースに適用できるか？
- デザインパターンを実装するために必要な要素・構成要素は何か？
- ツール使用デザインパターンを使って信頼できるAIエージェントを構築する際の特別な考慮点は何か？

## 学習目標

このレッスンを修了すると、以下ができるようになります：

- ツール使用デザインパターンとその目的を定義する。
- ツール使用デザインパターンが適用できるユースケースを特定する。
- デザインパターンを実装するために必要な主要な要素を理解する。
- このデザインパターンを使用するAIエージェントの信頼性を確保するための考慮点を認識する。

## ツール使用デザインパターンとは何か？

<strong>ツール使用デザインパターン</strong>は、LLMが特定の目標を達成するために外部ツールと連携する能力を与えることに焦点を当てています。ツールとは、エージェントがアクションを実行するために実行できるコードのことです。ツールは電卓のような単純な関数であったり、株価検索や天気予報のようなサードパーティサービスへのAPIコールであったりします。AIエージェントの文脈では、ツールは<strong>モデル生成の関数呼び出し</strong>に応じてエージェントが実行するよう設計されています。

## どのようなユースケースに適用できるか？

AIエージェントはツールを有効活用して複雑なタスクを完了したり、情報を取得したり、意思決定を行ったりできます。ツール使用デザインパターンは、動的に外部システム（データベース、ウェブサービス、コードインタプリタなど）とやりとりする必要があるシナリオでよく使われます。この能力は以下のようなさまざまなユースケースに役立ちます：

- **動的情報取得：** エージェントは外部APIやデータベースに問い合わせ、最新のデータを取得できる（例：SQLiteデータベースのデータ分析、株価や天気情報の取得）。
- **コードの実行と解釈：** エージェントはコードやスクリプトを実行し、数学問題の解決、レポート作成、シミュレーション実行が可能。
- **ワークフローの自動化：** タスクスケジューラ、メールサービス、データパイプラインなどのツールを統合し、繰り返しや多段階のワークフローを自動化。
- **カスタマーサポート：** CRMシステム、チケッティングプラットフォーム、ナレッジベースと連携してユーザーの問い合わせを解決。
- **コンテンツ生成・編集：** 文法チェッカー、テキスト要約ツール、コンテンツ安全評価ツールなどを活用し、コンテンツ制作を支援。

## ツール使用デザインパターンを実装するために必要な要素・構成要素は？

これらの構成要素によって、AIエージェントが幅広いタスクを実行できるようになります。ツール使用デザインパターンを実装するために必要な主要な要素を見ていきましょう：

- **関数／ツールスキーマ**：利用可能なツールの詳細な定義（関数名、目的、必要なパラメータ、期待される出力など）。これらのスキーマにより、LLMは利用可能なツールを理解し、正しいリクエストを構築することができます。

- <strong>関数実行ロジック</strong>：ユーザーの意図や会話の文脈に基づいて、ツールがいつどのように呼び出されるかを制御します。プランナー・モジュール、ルーティング機構、条件フローなど、ツール使用を動的に決定するものが含まれます。

- <strong>メッセージ処理システム</strong>：ユーザー入力、LLM応答、ツール呼び出し、ツール出力の間の会話の流れを管理するコンポーネント。

- <strong>ツール統合フレームワーク</strong>：エージェントを単純な関数や複雑な外部サービスなどさまざまなツールに接続するインフラストラクチャ。

- <strong>エラー処理とバリデーション</strong>：ツール実行の失敗を処理し、パラメータを検証し、予期しない応答を管理する仕組み。

- <strong>状態管理</strong>：会話の文脈、過去のツールインタラクション、永続的データを追跡し、多ターンのやりとりで整合性を保つ。

次に、関数／ツール呼び出しについて詳しく見ていきましょう。
 
### 関数／ツール呼び出し

関数呼び出しは、大規模言語モデル（LLM）がツールと連携するための主要な方法です。よく「関数」と「ツール」が同じ意味で使われることがありますが、関数（再利用可能なコードのブロック）がそのままエージェントがタスクを実行するための「ツール」となります。関数のコードを呼び出すためには、LLMがユーザーのリクエストを関数の説明と照合する必要があります。そのため、利用可能なすべての関数の説明を含むスキーマをLLMに送ります。LLMはその中から最も適切な関数を選択し、その名前と引数を返します。選択された関数が呼び出され、その応答が再びLLMに送られ、ユーザーのリクエストに対する応答に活用されます。

開発者がエージェント用の関数呼び出しを実装するには、以下が必要です：

1. 関数呼び出しをサポートするLLMモデル
2. 関数の説明を含むスキーマ
3. 各関数の実装コード

例として都市の現在時刻を取得する例を使って説明します：

1. **関数呼び出しをサポートするLLMを初期化する：**

    すべてのモデルが関数呼び出しをサポートしているわけではないため、使用するLLMがサポートしているか確認することが重要です。 <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a>は関数呼び出しをサポートしています。Azure OpenAIの<strong>Responses API</strong>（安定版`/openai/v1/`エンドポイント、`api_version`不要）を使ってOpenAIクライアントを起動するところから始めることができます。

    ```python
    # Azure OpenAI（Responses API、v1エンドポイント）用のOpenAIクライアントを初期化する
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. <strong>関数スキーマを作成する</strong>：

    次に、関数名、関数の説明、および関数パラメータの名前と説明を含むJSONスキーマを定義します。
    このスキーマを先ほど作成したクライアントに渡し、サンフランシスコの時刻を知りたいというユーザーのリクエストも同時に渡します。重要なのは、<strong>ツール呼び出し</strong>が返されるのであり、質問への最終回答が直接返されるわけではないということです。先に述べたように、LLMはタスクに選んだ関数名と引数を返します。

    ```python
    # モデルが読むための関数説明（Responses APIフラットツール形式）
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # 初期ユーザーメッセージ
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # 最初のAPI呼び出し：モデルに関数を使用するよう依頼
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses APIは、tool callsをresponse.output内のfunction_call項目として返します。
    # 次のターンでモデルが完全な文脈を持つように、それらを会話に追加します。
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **タスクを実行するための関数コード：**

    LLMが実行すべき関数を選択したので、そのタスクを実行するコードを実装し実行する必要があります。
    Pythonで現在時刻を取得するコードを実装しましょう。また、応答メッセージから関数名と引数を抽出し最終結果を得るコードも必要です。

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # 関数呼び出しを処理する
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # ツールの結果を function_call_output アイテムとして返す
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # 2回目のAPI呼び出し：モデルから最終応答を取得する
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

関数呼び出しはほとんど、場合によってはすべてのエージェントツール使用デザインの中心ですが、ゼロから実装するのは時に難しいこともあります。
[レッスン2](../../../02-explore-agentic-frameworks)で学んだように、エージェントフレームワークはツール使用を実装するためのビルディングブロックを提供してくれます。
 
## エージェントフレームワークでのツール使用例

異なるエージェントフレームワークを使ってツール使用デザインパターンを実装する方法の例をいくつか紹介します：

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a>はAIエージェント構築のためのオープンソースフレームワークです。`@tool`デコレーターを使ってPython関数としてツールを定義できるため、関数呼び出しの処理を簡素化します。フレームワークはモデルとコード間の双方向通信を管理し、`FoundryChatClient`を通じてファイル検索やコードインタプリタなどの事前構築ツールにもアクセスできます。

以下の図はMicrosoft Agent Frameworkでの関数呼び出しの流れを示しています：

![function calling](../../../translated_images/ja/functioncalling-diagram.a84006fc287f6014.webp)

Microsoft Agent Frameworkでは、ツールはデコレートされた関数として定義されます。先に見た`get_current_time`関数を`@tool`デコレーターでツールに変換できます。フレームワークは関数とそのパラメータを自動的にシリアライズし、LLMに送るスキーマを作成します。

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# クライアントを作成する
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# エージェントを作成し、ツールで実行する
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>は、開発者が基盤となる計算やストレージリソースを管理する必要なく、安全に高品質で拡張可能なAIエージェントを構築、デプロイ、スケールできるように設計された新しいエージェントフレームワークです。企業向けの完全マネージドサービスであり、エンタープライズグレードのセキュリティを備えているため特に企業アプリケーションに有用です。

LLM APIを直接使う場合と比べて、Microsoft Foundry Agent Serviceには以下のような利点があります：

- 自動ツール呼び出し：ツール呼び出しのパース、実行、応答処理が不要になり、すべてサーバー側で行われます
- 安全に管理されたデータ：独自に会話状態を管理せず、`threads`により必要な情報をすべて保管できます
- すぐに使えるツール：Bing、Azure AI Search、Azure Functionsなどのデータソースと連携可能なツール

Microsoft Foundry Agent Serviceで利用できるツールは次の2種類に分けられます：

1. 知識ツール：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing検索によるグラウンディング</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">ファイル検索</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI 検索</a>

2. アクションツール：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">関数呼び出し</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">コードインタプリタ</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI 定義ツール</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

このエージェントサービスでは、これらのツールを`toolset`としてまとめて使用できます。また、`threads`を利用し特定の会話履歴を追跡しています。

たとえば、Contosoという会社の営業担当者であると想像してください。営業データに関する質問に答えられる会話型エージェントを開発したいとします。

以下の画像はMicrosoft Foundry Agent Serviceを使って営業データを分析する例を示しています：

![Agentic Service In Action](../../../translated_images/ja/agent-service-in-action.34fb465c9a84659e.webp)

これらのツールをサービスで使用するには、クライアントを作成しツールまたはツールセットを定義します。実際の実装例として、以下のPythonコードを使えます。LLMはツールセットを見て、ユーザーのリクエストに応じてユーザー作成の関数`fetch_sales_data_using_sqlite_query`か、事前構築済みのコードインタプリタを使うか判断します。

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_functions.py ファイルにある fetch_sales_data_using_sqlite_query 関数。
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# ツールセットを初期化
toolset = ToolSet()

# fetch_sales_data_using_sqlite_query 関数で関数呼び出しエージェントを初期化し、ツールセットに追加
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# コードインタープリター・ツールを初期化し、ツールセットに追加。
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## ツール使用デザインパターンを使って信頼できるAIエージェントを構築する際の特別な考慮点は？

LLMが動的に生成するSQLに関する一般的な懸念はセキュリティであり、特にSQLインジェクションや悪意のある操作（データベースの削除や改ざんなど）のリスクです。これらの懸念は、データベースアクセスの権限を適切に構成することで効果的に軽減できます。多くのデータベースでは読み取り専用として構成することが推奨されます。PostgreSQLやAzure SQLのようなデータベースサービスでは、アプリに読み取り専用（SELECT）ロールを割り当てるべきです。

アプリを安全な環境で実行することも保護を強化します。企業シナリオでは通常、運用システムからデータを抽出・変換し、ユーザーフレンドリーなスキーマを持つ読み取り専用データベースまたはデータウェアハウスに格納します。この方法により、データの安全性と性能・アクセシビリティの最適化が保証され、アプリには制限された読み取り専用アクセス権が与えられます。

## サンプルコード

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## ツール使用デザインパターンに関してさらに質問がありますか？

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)に参加して、他の学習者と交流したり、オフィスアワーに参加したり、AIエージェントに関する質問をしてみましょう。

## 追加リソース

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service ワークショップ</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer マルチエージェントワークショップ</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework 概要</a>


## このエージェントのスモークテスト（任意）

[レッスン16](../16-deploying-scalable-agents/README.md) でエージェントのデプロイ方法を学んだ後、このレッスンの `TravelToolAgent` がまだツールを呼び出して応答するかどうかを [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) でスモークテストできます。実行方法については [`tests/README.md`](../tests/README.md) を参照してください。

## 前のレッスン

[エージェント設計パターンの理解](../03-agentic-design-patterns/README.md)

## 次のレッスン

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->