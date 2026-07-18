[![AIエージェントフレームワークの探求](../../../translated_images/ja/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(上の画像をクリックするとこのレッスンのビデオが視聴できます)_

# AIエージェントフレームワークの探求

AIエージェントフレームワークは、AIエージェントの作成、展開、および管理を簡素化するために設計されたソフトウェアプラットフォームです。これらのフレームワークは、複雑なAIシステムの開発を効率化するための事前構築されたコンポーネント、抽象化、およびツールを開発者に提供します。

これらのフレームワークは、AIエージェント開発における共通課題に対する標準化されたアプローチを提供することで、開発者がアプリケーションの独自性に集中できるよう支援します。AIシステムのスケーラビリティ、アクセシビリティ、効率性を向上させます。

## はじめに

このレッスンで扱う内容は以下の通りです：

- AIエージェントフレームワークとは何か、そして開発者が何を達成できるのか？
- チームがこれらを使ってエージェントの能力を迅速にプロトタイピング、反復改善する方法は？
- マイクロソフトが提供するフレームワークとツール（<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> と <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>）の違いは？
- 既存のAzureエコシステムのツールを直接統合できるのか、それともスタンドアロンのソリューションが必要か？
- Microsoft Foundry Agent Serviceとは何か、そしてそれがどのように役立つのか？

## 学習目標

このレッスンの目標は次のことを理解していただくことです：

- AIエージェントフレームワークのAI開発における役割。
- AIエージェントフレームワークを活用してインテリジェントなエージェントを構築する方法。
- AIエージェントフレームワークが実現する主要な機能。
- Microsoft Agent FrameworkとMicrosoft Foundry Agent Serviceの違い。

## AIエージェントフレームワークとは何か、そして開発者が何をできるようになるのか？

従来のAIフレームワークは次のようにアプリにAIを統合し、アプリをより良くするのに役立ちます：

- <strong>パーソナライゼーション</strong>：AIはユーザーの行動や好みを分析し、パーソナライズされた推奨、コンテンツ、体験を提供します。
例：Netflixのようなストリーミングサービスは視聴履歴に基づき映画や番組を提案し、ユーザーのエンゲージメントと満足度を高めます。
- <strong>自動化と効率化</strong>：AIは反復作業を自動化し、ワークフローを簡素化し、運用効率を向上させます。
例：カスタマーサービスアプリは、AI搭載チャットボットを使って一般的な問い合わせに対応し、応答時間を短縮し、より複雑な問題に人間のエージェントを割り当てることができます。
- <strong>ユーザー体験の向上</strong>：AIは音声認識、自然言語処理、予測テキストなどのインテリジェントな機能を提供し、全体的なUXを向上させます。
例：SiriやGoogleアシスタントのような仮想アシスタントは音声コマンドを理解し応答することで、ユーザーがデバイスとの対話を容易にします。

### それは素晴らしいことですが、なぜAIエージェントフレームワークが必要なのでしょうか？

AIエージェントフレームワークは単なるAIフレームワーク以上のもので、ユーザーや他のエージェント、環境と対話し特定の目標を達成できるインテリジェントエージェントの作成を可能にします。これらのエージェントは自律的に振る舞い、意思決定し、変化する状況に適応します。AIエージェントフレームワークが実現する主な機能を見てみましょう：

- <strong>エージェントの協力と調整</strong>：複数のAIエージェントが連携し、通信し、複雑なタスクを協働で解決できます。
- <strong>タスクの自動化と管理</strong>：複数ステップのワークフロー自動化、タスク委任、エージェント間の動的なタスク管理のメカニズムを提供します。
- <strong>コンテキスト理解と適応</strong>：エージェントにコンテキストを理解し、環境変化に適応し、リアルタイム情報に基づき意思決定を行う能力を持たせます。

まとめると、エージェントはより多くのことを可能にし、自動化を次のレベルに引き上げ、環境から学習し適応できるよりインテリジェントなシステムを創造します。

## エージェントの能力を迅速にプロトタイプ、反復改善する方法は？

この分野は急速に進んでいますが、ほとんどのAIエージェントフレームワークに共通するものとして、モジュールコンポーネント、協働ツール、リアルタイム学習があります。これらについて詳しく見てみましょう：

- <strong>モジュラーコンポーネントの利用</strong>：AI SDKはAIやメモリコネクター、自然言語やコードプラグイン経由の関数呼び出し、プロンプトテンプレートなど事前構築されたコンポーネントを提供します。
- <strong>協働ツールの活用</strong>：エージェントに特定の役割やタスクを設計させ、協働ワークフローのテストや改善を可能にします。
- <strong>リアルタイムで学習</strong>：エージェントが対話から学び、行動を動的に調整するフィードバックループを実装します。

### モジュラーコンポーネントの利用

Microsoft Agent FrameworkのようなSDKはAIコネクター、ツール定義、エージェント管理などの事前構築コンポーネントを提供します。

<strong>チームの利用方法</strong>：チームはこれらのコンポーネントを迅速に組み合わせて機能的なプロトタイプを作成し、最初から開発を始めることなく迅速に実験と反復を行えます。

<strong>実際の使い方</strong>：ユーザー入力から情報を抽出するパーサー、データを格納・取得するメモリモジュール、ユーザーと対話するプロンプトジェネレーターを使い、それらをスクラッチから作る必要はありません。

<strong>例コード</strong>。Microsoft Agent Frameworkで`FoundryChatClient`を使い、ツール呼び出しでモデルにユーザー入力に応答させる例を見てみましょう：

``` python
# Microsoft Agent Framework Pythonの例

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# 旅行予約のためのサンプルツール関数を定義する
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # 例の出力: 2025年1月1日のニューヨーク行きのフライトが正常に予約されました。良い旅を！✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

この例から、ユーザー入力から出発地、目的地、日時など主要情報を抽出するために事前構築パーサーを活用できることがわかります。このモジュラーアプローチで高水準のロジックに集中可能です。

### 協働ツールの活用

Microsoft Agent Frameworkのようなフレームワークは複数のエージェントが協働できる仕組みを促進します。

<strong>チームの利用方法</strong>：チームは特定の役割やタスクを持つエージェントを設計し、協働ワークフローをテスト・改善し、システム全体の効率化を図れます。

<strong>実際の使い方</strong>：各エージェントがデータ取得、分析、意思決定などの専門機能を持つエージェントチームを作成できます。これらのエージェントが情報を共有し連携することで、ユーザーの問い合わせに答えたりタスクを完了したりします。

**例コード（Microsoft Agent Framework）**：

```python
# Microsoft Agent Framework を使用して協力する複数のエージェントを作成する

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# データ取得エージェント
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# データ分析エージェント
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# タスク上でエージェントを順番に実行する
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

上のコードでは、複数のエージェントが連携してデータを分析するタスクの作成方法を示しています。各エージェントが特定の役割を担い、目的達成のために調整されます。専門的な役割をもつエージェントを作成することで、タスクの効率性や性能を向上できます。

### リアルタイムで学習

高度なフレームワークはリアルタイムの文脈理解と適応機能を提供します。

<strong>チームの利用方法</strong>：チームはフィードバックループを実装し、エージェントが対話を通じて学習し動作を動的に調整して能力を継続的に改善します。

<strong>実際の使い方</strong>：エージェントはユーザーフィードバック、環境データ、タスク結果を分析し、知識ベースを更新し意思決定アルゴリズムを調整し、性能を継続的に向上させます。この反復的学習により、エージェントは変化する状況やユーザーの好みに適応し、全体のシステム効果を高めます。

## Microsoft Agent Framework と Microsoft Foundry Agent Service の違いは？

これらのアプローチを比較する方法は多くありますが、設計、機能、ターゲットユースケースの観点からの主な違いを見てみましょう：

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework は `FoundryChatClient` を使ったAIエージェント構築のための簡潔なSDKを提供します。組み込みのツール呼び出し、会話管理、Azure IDによるエンタープライズ品質のセキュリティで、Azure OpenAIモデルを活用したエージェント作成を可能にします。

<strong>ユースケース</strong>：ツール利用、多段階ワークフロー、エンタープライズ統合を備えた本番対応のAIエージェント構築。

Microsoft Agent Frameworkの重要なコアコンセプトは以下の通りです：

- <strong>エージェント</strong>。`FoundryChatClient` でエージェントを作成し、名前、指示、ツールを構成します。エージェントは：
  - <strong>ユーザーメッセージを処理</strong> し、Azure OpenAIモデルを用いて応答を生成。
  - <strong>会話の文脈に基づきツールを自動呼び出し</strong>。
  - <strong>複数回の対話にわたり会話状態を維持</strong>。

  エージェント作成のコードスニペット：

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- <strong>ツール</strong>。Python関数として定義可能なツールをエージェントが自動で呼び出せます。ツールはエージェント作成時に登録します：

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- <strong>マルチエージェント調整</strong>。異なる専門分野を持つ複数のエージェントを作成し、その作業を調整できます：

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Azure Identity統合**。`AzureCliCredential`（または `DefaultAzureCredential`）を利用し、安全なキーレス認証を実現し、APIキー管理を不要にします。

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Serviceは、Microsoft Ignite 2024で導入された新しいサービスです。Llama 3、Mistral、CohereなどのオープンソースLLMモデルを直接呼び出すなど、より柔軟なモデルでAIエージェントの開発・展開を可能にします。

Microsoft Foundry Agent Serviceは企業向けセキュリティ機構やデータ保存方法を強化しており、エンタープライズアプリケーションに適しています。 

Microsoft Agent Frameworkと統合してエージェント構築・展開をサポートします。

このサービスはパブリックプレビューであり、PythonとC#を用いたエージェント構築に対応しています。

Microsoft Foundry Agent Service Python SDKを使ってユーザー定義ツール付きのエージェントを作成できます：

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# ツール関数を定義する
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### コアコンセプト

Microsoft Foundry Agent Serviceのコアコンセプトは以下の通りです：

- <strong>エージェント</strong>。Microsoft Foundry Agent ServiceはMicrosoft Foundryと統合されており、AIエージェントは質問応答（RAG）、アクション実行、ワークフローの完全自動化などに有用な「スマート」マイクロサービスとして機能します。これは生成AIモデルの力と、実世界のデータソースにアクセスし対話するためのツールを組み合わせて実現します。例を示します：

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    この例では、モデル`gpt-4.1-mini`、名前`my-agent`、指示`You are helpful agent`でエージェントが作成され、コード解釈タスクを実行するツールとリソースが装備されています。

- <strong>スレッドとメッセージ</strong>。スレッドはエージェントとユーザー間の対話ややりとりを表す重要な概念です。会話進行を追跡し、文脈情報を保存し、対話状態を管理します。例を示します：

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # スレッド上でエージェントに作業を行うよう依頼する
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # エージェントの応答を見るためにすべてのメッセージを取得してログに記録する
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    前のコードでは、スレッドが作成され、その後メッセージが送信されます。`create_and_process_run`を呼び出すことでエージェントにスレッド上で作業を実行させています。最終的にメッセージを取得して応答をログ出力し、ユーザーとエージェントの会話進行を示しています。メッセージにはテキスト、画像、ファイルなどの異なるタイプがある可能性があり、例えばエージェントの作業結果として画像やテキスト応答が含まれます。開発者はこれを利用して応答をさらに処理したりユーザーに提示できます。

- **Microsoft Agent Frameworkとの統合**。Microsoft Foundry Agent ServiceはMicrosoft Agent Frameworkとシームレスに連携し、`FoundryChatClient`を使ったエージェントの構築とAgent Serviceでの本番展開が可能です。

<strong>ユースケース</strong>：Microsoft Foundry Agent Serviceは安全でスケーラブル、柔軟なAIエージェント展開を必要とするエンタープライズアプリケーション向けです。

## これらのアプローチの違いは？
 
重複があるように見えますが、設計、機能、ターゲットユースケースにおいて以下のような主な違いがあります：
 
- **Microsoft Agent Framework (MAF)**：AIエージェント構築のための本番対応SDK。ツール呼び出し、会話管理、Azure ID統合を備えた簡潔なAPIを提供。
- **Microsoft Foundry Agent Service**：Microsoft Foundry上のプラットフォーム及び展開サービス。Azure OpenAI、Azure AI検索、Bing検索、コード実行などへの組み込み接続機能を提供。
 
どちらを選べばいいか迷いますか？

### ユースケース
 
一般的なユースケースを通じて選択をサポートしましょう：
 
> Q：本番用のAIエージェントアプリケーションを構築し、すぐに開始したい
>

> A：Microsoft Agent Frameworkがお勧めです。`FoundryChatClient`を使ったシンプルでPython的なAPIが提供され、数行のコードでツールや指示を備えたエージェントを定義できます。

> Q：Azure検索やコード実行などの統合を含む企業レベルの展開が必要
>
> A：Microsoft Foundry Agent Serviceが最適です。複数モデル、Azure AI検索、Bing検索、Azure Functionsの組み込み機能を持つプラットフォームサービスで、Foundryポータルでエージェントを簡単に構築し大規模展開できます。
 
> Q：まだ迷っています。一つだけ教えてください
>
> A：まずMicrosoft Agent Frameworkでエージェントを構築し、展開やスケールが必要になったらMicrosoft Foundry Agent Serviceを使用しましょう。これによりエージェントロジックの迅速な反復とエンタープライズ展開への明確な道筋が得られます。
 
キーの違いを表にまとめましょう：

| フレームワーク | フォーカス | コアコンセプト | ユースケース |
| --- | --- | --- | --- |
| Microsoft Agent Framework | ツール呼び出しを備えた簡潔なエージェントSDK | エージェント、ツール、Azure ID | AIエージェント構築、ツール使用、多段階ワークフロー |
| Microsoft Foundry Agent Service | 柔軟なモデル、エンタープライズセキュリティ、コード生成、ツール呼び出し | モジュール性、協調、プロセスオーケストレーション | 安全でスケーラブルなAIエージェント展開 |

## 既存のAzureエコシステムのツールを直接統合できますか、それともスタンドアロンのソリューションが必要ですか？


答えははいです。既存のAzureエコシステムツールをMicrosoft Foundry Agent Serviceと直接統合できます。特に、このサービスは他のAzureサービスとシームレスに連携するように構築されています。例えば、Bing、Azure AI Search、Azure Functionsを統合することが可能です。また、Microsoft Foundryとの深い統合もあります。

Microsoft Agent Frameworkは `FoundryChatClient` とAzureのアイデンティティを通じてAzureサービスと統合されており、エージェントツールから直接Azureサービスを呼び出すことができます。

## サンプルコード

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## AIエージェントフレームワークに関する質問がありますか？

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)に参加して、他の学習者と交流したり、オフィスアワーに参加してAIエージェントに関する質問を解決しましょう。

## 参考文献

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## 前のレッスン

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

## 次のレッスン

[Understanding Agentic Design Patterns](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->