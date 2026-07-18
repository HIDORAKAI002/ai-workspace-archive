# Microsoft Agent Frameworkの探求

![Agent Framework](../../../translated_images/ja/lesson-14-thumbnail.90df0065b9d234ee.webp)

### はじめに

このレッスンで扱う内容：

- Microsoft Agent Frameworkの理解：主要な特徴と価値  
- Microsoft Agent Frameworkの主要コンセプトの探求
- 先進的なMAFパターン：ワークフロー、ミドルウェア、メモリ

## 学習目標

このレッスンを終えたあと、以下ができるようになります：

- Microsoft Agent Frameworkを使って生産準備完了のAIエージェントを構築する
- Microsoft Agent Frameworkのコア機能をYour Agentic Use Casesに適用する
- ワークフロー、ミドルウェア、オブザーバビリティを含む高度なパターンを使用する

## コードサンプル 

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework)のコードサンプルは、このリポジトリの`xx-python-agent-framework`および`xx-dotnet-agent-framework`ファイルにあります。

## Microsoft Agent Frameworkの理解

![Framework Intro](../../../translated_images/ja/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework)は、AIエージェント構築のためのマイクロソフトの統一フレームワークです。生産環境や研究環境で見られる多様なエージェントユースケースに対応するための柔軟性を提供し、例えば以下のようなシナリオを含みます：

- ステップバイステップのワークフローが必要な場合の<strong>順次エージェントオーケストレーション</strong>。
- エージェントが同時にタスクを完了する必要がある場合の<strong>並行オーケストレーション</strong>。
- エージェントが一つのタスクで協力する場合の<strong>グループチャットオーケストレーション</strong>。
- サブタスクの完了に応じてエージェントがタスクを引き継ぐ場合の<strong>ハンドオフオーケストレーション</strong>。
- マネージャーエージェントがタスクリストを作成・変更し、サブエージェントを調整してタスクを完了させる場合の<strong>マグネティックオーケストレーション</strong>。

生産環境でAIエージェントを提供するために、MAFは以下の機能も備えています：

- OpenTelemetryを用いた<strong>オブザーバビリティ</strong>。AIエージェントのツール呼び出し、オーケストレーションの各ステップ、推論フロー、Microsoft Foundryダッシュボードによるパフォーマンス監視などすべてのアクションがトレースされます。
- Microsoft Foundry上でのネイティブホスティングによる<strong>セキュリティ</strong>。ロールベースアクセス、プライベートデータ処理、組み込みのコンテンツ安全機能などのセキュリティ制御が含まれます。
- エージェントスレッドやワークフローが一時停止、再開、エラー回復できる<strong>耐久性</strong>。より長時間のプロセス実行を可能にします。
- タスクに対して人間の承認を必要とする<strong>ヒューマン・イン・ザ・ループ</strong>ワークフローをサポートする<strong>制御</strong>。

Microsoft Agent Frameworkは相互運用可能性にも注力しており：

- <strong>クラウド非依存</strong> - エージェントはコンテナ、オンプレミス、そして複数の異なるクラウド上で実行可能。
- <strong>プロバイダー非依存</strong> - Azure OpenAIやOpenAIなどお気に入りのSDKからエージェントを作成可能。
- <strong>オープン標準の統合</strong> - Agent-to-Agent (A2A)やModel Context Protocol (MCP)などのプロトコルで他のエージェントやツールを検出・利用可能。
- <strong>プラグインとコネクター</strong> - Microsoft Fabric、SharePoint、Pinecone、Qdrantなどのデータ・メモリサービスへ接続可能。

これらの機能がMicrosoft Agent Frameworkの主要なコンセプトにどのように適用されるかを見ていきましょう。

## Microsoft Agent Frameworkの主要コンセプト

### エージェント

![Agent Framework](../../../translated_images/ja/agent-components.410a06daf87b4fef.webp)

<strong>エージェントの作成</strong>

エージェント作成は推論サービス（LLMプロバイダー）、エージェントに従うべき一連の指示、および割り当てられた`name`を定義することで行います：


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

上記は`Azure OpenAI`を使用していますが、エージェントは`Microsoft Foundry Agent Service`を含むさまざまなサービスで作成可能です：

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAIの`Responses`、`ChatCompletion` API

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

あるいは、大きなコンテキストウィンドウ（最大204Kトークン）を持つOpenAI互換APIを提供する[MiniMax](https://platform.minimaxi.com/)を使用：

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

またはA2Aプロトコルを使ったリモートエージェント：

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

<strong>エージェントの実行</strong>

エージェントはノンストリーミング応答の場合は`.run`、ストリーミング応答の場合は`.run_stream`メソッドを使って実行されます。

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

各エージェント実行には、エージェントが使用する`max_tokens`、呼び出せる`tools`、さらにはエージェントに使用する`model`などのパラメーターをカスタマイズするオプションもあります。

これは特定のモデルやツールがユーザーのタスク完了に必要な場合に有効です。

<strong>ツール</strong>

ツールはエージェントを定義する際にも：

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# ChatAgent を直接作成する場合

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

またエージェントを実行する際にも定義できます：

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # この実行のみに提供されるツール )
```

<strong>エージェントスレッド</strong>

エージェントスレッドは多ターン対話を扱うために使用されます。スレッドは以下により作成可能です：

- 時間の経過とともにスレッドを保存可能にする`get_new_thread()`の使用
- エージェント実行時にスレッドを自動的に作成し、そのスレッドは現在の実行期間中のみ持続

スレッド作成のコード例は以下の通りです：

```python
# 新しいスレッドを作成します。
thread = agent.get_new_thread() # スレッドでエージェントを実行します。
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

その後、後で使用するためにスレッドをシリアライズして保存できます：

```python
# 新しいスレッドを作成します。
thread = agent.get_new_thread() 

# スレッドでエージェントを実行します。

response = await agent.run("Hello, how are you?", thread=thread) 

# スレッドを保存用にシリアライズします。

serialized_thread = await thread.serialize() 

# 保存から読み込んだ後にスレッドの状態をデシリアライズします。

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

<strong>エージェントミドルウェア</strong>

エージェントはツールやLLMとやりとりしてユーザーのタスクを完了します。あるシナリオではこれらのやりとりの間で処理や追跡を実行したい場合があります。エージェントミドルウェアでこれが可能です：

<em>関数ミドルウェア</em>

このミドルウェアは、エージェントと呼び出す関数/ツールの間にアクションを実行できます。例としては、関数呼び出しのログ記録が挙げられます。

下記コード内で`next`は次のミドルウェアまたは実際の関数を呼び出すかを決定します。

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # 前処理：関数実行前のログ
    print(f"[Function] Calling {context.function.name}")

    # 次のミドルウェアまたは関数実行へ続行
    await next(context)

    # 後処理：関数実行後のログ
    print(f"[Function] {context.function.name} completed")
```

<em>チャットミドルウェア</em>

このミドルウェアは、エージェントとLLM間のリクエストの間でアクションを実行またはログ記録します。

ここにはAIサービスに送られる`messages`など重要な情報が含まれます。

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # 前処理：AI呼び出し前のログ
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # 次のミドルウェアまたはAIサービスへ進む
    await next(context)

    # 後処理：AI応答後のログ
    print("[Chat] AI response received")

```

<strong>エージェントメモリ</strong>

`Agentic Memory`のレッスンで扱ったように、メモリはエージェントがさまざまなコンテキストで動作するための重要な要素です。MAFは複数の種類のメモリを提供します：

<em>インメモリストレージ</em>

これはアプリケーション実行中のスレッド内に保存されるメモリです。

```python
# 新しいスレッドを作成します。
thread = agent.get_new_thread() # スレッドでエージェントを実行します。
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

<em>永続メッセージ</em>

これは異なるセッション間で会話履歴を保存するために使用されます。`chat_message_store_factory`を使って定義します：

```python
from agent_framework import ChatMessageStore

# カスタムメッセージストアを作成する
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

<em>動的メモリ</em>

これはエージェント実行前にコンテキストに追加されるメモリです。mem0などの外部サービスに保存可能です：

```python
from agent_framework.mem0 import Mem0Provider

# Mem0を高度なメモリ機能のために使用しています
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

<strong>エージェントオブザーバビリティ</strong>


オブザーバビリティは信頼性が高くメンテナンス性のあるエージェントシステムを構築するために重要です。MAFはOpenTelemetryと統合し、より良いオブザーバビリティのためのトレースとメータリングを提供します。

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # 何かをする
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### ワークフロー

MAFは、タスクを完了するための事前定義されたステップであるワークフローを提供し、それらのステップにAIエージェントをコンポーネントとして含みます。

ワークフローはより良い制御フローを可能にするさまざまなコンポーネントで構成されています。ワークフローはまた、<strong>マルチエージェントのオーケストレーション</strong>や<strong>チェックポイント</strong>の保存によるワークフロー状態の保存を可能にします。

ワークフローの主要なコンポーネントは以下のとおりです:

**エグゼキューター（Executors）**

エグゼキューターは入力メッセージを受け取り、自分の割り当てられたタスクを実行して出力メッセージを生成します。これによりワークフローは大きなタスクの完了に向かって進みます。エグゼキューターはAIエージェントまたはカスタムロジックである場合があります。

**エッジ（Edges）**

エッジはワークフロー内のメッセージの流れを定義するために使われます。これには以下の種類があります:

<em>ダイレクトエッジ</em> - エグゼキューター間の単純な一対一の接続:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

<em>条件付きエッジ</em> - 特定の条件が満たされた後にアクティブ化されます。例えば、ホテルの部屋が利用できない場合、エグゼキューターは他の選択肢を提案できます。

<em>スイッチケースエッジ</em> - 定義された条件に基づいてメッセージを異なるエグゼキューターにルーティングします。例えば、旅行客が優先アクセスを持つ場合、そのタスクは別のワークフローで処理されます。

<em>ファンアウトエッジ</em> - 一つのメッセージを複数のターゲットに送信します。

<em>ファンインエッジ</em> - 複数のエグゼキューターからのメッセージを集約して一つのターゲットに送信します。

**イベント（Events）**

ワークフローのオブザーバビリティを向上させるため、MAFは実行に関する組み込みイベントを提供しています。以下はその例です:

- `WorkflowStartedEvent`  - ワークフローの実行開始
- `WorkflowOutputEvent` - ワークフローが出力を生成
- `WorkflowErrorEvent` - ワークフローでエラーが発生
- `ExecutorInvokeEvent`  - エグゼキューターが処理を開始
- `ExecutorCompleteEvent`  - エグゼキューターが処理を終了
- `RequestInfoEvent` - リクエストが発行される

## 高度なMAFパターン

上記のセクションではMicrosoft Agent Frameworkの主要な概念を解説しました。より複雑なエージェントを構築する際に検討すべき高度なパターンが以下です:

- <strong>ミドルウェアの合成</strong>: ロギング、認証、レート制限など複数のミドルウェアハンドラをチェーンし、関数やチャットミドルウェアを使ってエージェントの振る舞いを細かく制御。
- <strong>ワークフローチェックポイント</strong>: ワークフローイベントとシリアライズを用いて長時間実行されるエージェントプロセスの保存と再開を可能に。
- <strong>動的ツール選択</strong>: ツールの説明に基づくRAGとMAFのツール登録を組み合わせて、クエリごとに関連するツールのみを提示。
- <strong>マルチエージェントの引き継ぎ</strong>: ワークフローのエッジと条件付きルーティングを用い、専門化されたエージェント間のハンドオフをオーケストレーション。

## Microsoft FoundryでのLangChain / LangGraphエージェントのホスティング

Microsoft Agent Frameworkは<strong>フレームワーク互換</strong>であり、MAFで書かれていないエージェントにも制限されません。すでに<strong>LangChain</strong>や<strong>LangGraph</strong>で構築されたエージェントがある場合、それを<strong>Microsoft Foundryのホストエージェント</strong>として実行できます。これによりFoundryがランタイム、セッション、スケーリング、認証、プロトコルエンドポイントを管理し、エージェントロジックはLangGraphに留まります。

これは`langchain_azure_ai.agents.hosting`パッケージを使用して行い、Foundryのホストエージェントが使うのと同じプロトコルでコンパイル済みのLangGraphグラフを公開します。

**1. hostingエクストラをインストールする:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting`エクストラはFoundryのプロトコルライブラリである`azure-ai-agentserver-responses`（OpenAI互換の`/responses`エンドポイント）と`azure-ai-agentserver-invocations`（汎用`/invocations`エンドポイント）をインストールします。

**2. ホスティングプロトコルを選択する:**

| プロトコル | ホストクラス | エンドポイント | 使用時 |
|----------|--------------|--------------|--------|
| **Responses** | `ResponsesHostServer` | `/responses` | OpenAI互換のチャット、ストリーミング、レスポンス履歴、会話のスレッド機能が必要な場合 - 会話型エージェントの推奨デフォルト。 |
| **Invocations** | `InvocationsHostServer` | `/invocations` | カスタムJSON形式、Webhookスタイルエンドポイント、非会話型処理が必要な場合。 |

**Responses APIはFoundryにおけるエージェント開発の主要なAPIであるため、多くのエージェントは`ResponsesHostServer`で始めることを推奨します。**

**3. 環境変数を設定する**（`az login`して`DefaultAzureCredential`が認証できるように）:

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

エージェントが後でFoundryでホストエージェントとして実行されるとき、プラットフォームが自動的に`FOUNDRY_PROJECT_ENDPOINT`を注入します。

**4. ResponsesプロトコルでLangGraphエージェントを公開する:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # ChatOpenAI はこちらで Foundry プロジェクトの OpenAI 互換（Responses）エンドポイントを対象としています。
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

ローカルで`python main.py`を実行し、`http://localhost:8088/responses`にResponsesリクエストを送信します。

**主な動作:**

- <strong>会話</strong>: クライアントは`previous_response_id`または`conversation` IDを渡すことで会話を継続します。グラフがLangGraphチェッカーポイントでコンパイルされている場合、Foundryは会話状態をチェックポイントにキー付けします（実運用では永続的なチェッカーポイントを使用し、ローカルテストなら`MemorySaver`で十分です）。
- <strong>ヒューマンインザループ</strong>: グラフがLangGraphの`interrupt()`を使用している場合、`ResponsesHostServer`は保留中の割り込みをResponsesの`function_call` / `mcp_approval_request`アイテムとして公開し、クライアントは対応する`function_call_output` / `mcp_approval_response`で再開します。
- **Foundryへのデプロイ**: Azure Developer CLIを利用して`azd ext install azure.ai.agents`、`azd ai agent init -m <manifest>`、`azd ai agent run`（ローカル、Docker必要）、それから`azd provision`と`azd deploy`を行います。ホストエージェントのデプロイには<strong>Foundry Project Manager</strong>ロールが必要です。

この例の実行可能なバージョンは[code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py)にあります。フルウォークスルー（Invocationsプロトコル、カスタムリクエストスキーマ、トラブルシューティング）は[Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)をご覧ください。

## コードサンプル 

Microsoft Agent Frameworkのコードサンプルは、このリポジトリ内の`xx-python-agent-framework`および`xx-dotnet-agent-framework`ファイルにあります。

## Microsoft Agent Frameworkについてもっと質問がありますか？

学習者同士と交流したり、オフィスアワーに参加したり、AIエージェントに関する質問への回答を得たりするには、[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)に参加してください。
## 前のレッスン

[Memory for AI Agents](../13-agent-memory/README.md)

## 次のレッスン

[Building Computer Use Agents (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->