# 探索 Microsoft Agent Framework

![Agent Framework](../../../translated_images/zh-MO/lesson-14-thumbnail.90df0065b9d234ee.webp)

### 簡介

本課程將涵蓋：

- 了解 Microsoft Agent Framework：主要功能與價值  
- 探索 Microsoft Agent Framework 的核心概念
- 高級 MAF 模式：工作流程、中介軟件及記憶

## 學習目標

完成本課程後，您將能：

- 使用 Microsoft Agent Framework 建立生產級的 AI 代理
- 將 Microsoft Agent Framework 的核心功能應用於您的代理用例
- 使用包括工作流程、中介軟件及可觀察性的進階模式

## 程式範例

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) 的程式範例可在本儲存庫中的 `xx-python-agent-framework` 和 `xx-dotnet-agent-framework` 檔案中找到。

## 了解 Microsoft Agent Framework

![Framework Intro](../../../translated_images/zh-MO/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) 是微軟用於建立 AI 代理的統一框架。它提供靈活性，以滿足生產環境及研究環境中所見的各種代理用例，包括：

- 需要逐步工作流程的情境下的 <strong>順序代理協作</strong>。
- 需要代理同時完成任務的情境下的 <strong>並行協作</strong>。
- 代理能共同協作完成任務的情境下的 <strong>群組聊天協作</strong>。
- 在子任務完成後代理輪流交接任務的情境下的 <strong>交接協作</strong>。
- 經理代理建立及修改任務清單並協調子代理完成任務的情境下的 <strong>磁性協作</strong>。

為了在生產環境中提供 AI 代理，MAF 還具備以下功能：

- 透過 OpenTelemetry 實現 <strong>可觀察性</strong>，涵蓋 AI 代理的每個動作，包括工具調用、協作流程、推理流程及透過 Microsoft Foundry 儀表板進行的效能監控。
- 透過在 Microsoft Foundry 上原生託管代理，保障 <strong>安全性</strong>，包括基於角色的存取控制、私人資料處理及內建內容安全。
- 代理線程及工作流程可暫停、恢復及從錯誤中恢復，確保 <strong>持久性</strong>，以支持更長時間運行的流程。
- 支援需人工審核的工作流程，以實現 <strong>控制</strong>。

Microsoft Agent Framework 同時專注於互操作性：

- <strong>雲端無關</strong>—代理能在容器、本地及多種不同雲端環境中運行。
- <strong>提供者無關</strong>—代理可透過您偏好的 SDK 創建，包括 Azure OpenAI 與 OpenAI。
- <strong>整合開放標準</strong>—代理可利用 Agent-to-Agent(A2A) 與 Model Context Protocol (MCP) 等協定，發現及利用其他代理與工具。
- <strong>外掛及連接器</strong>—可連接至 Microsoft Fabric、SharePoint、Pinecone 及 Qdrant 等資料與記憶服務。

讓我們看這些功能如何應用於 Microsoft Agent Framework 的核心概念。

## Microsoft Agent Framework 的核心概念

### 代理 (Agents)

![Agent Framework](../../../translated_images/zh-MO/agent-components.410a06daf87b4fef.webp)

<strong>建立代理</strong>

代理的建立是通過定義推理服務（LLM 提供者）、AI 代理需遵循的一組指令，以及分配 `name`：

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

上述範例使用 `Azure OpenAI`，但代理也可使用多種服務建立，包括 `Microsoft Foundry Agent Service`：

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI 的 `Responses`、`ChatCompletion` API

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

或 [MiniMax](https://platform.minimaxi.com/)，提供與 OpenAI 兼容且大型上下文視窗（最大 204K 令牌）的 API：

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

或使用 A2A 協定的遠端代理：

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

<strong>執行代理</strong>

代理使用 `.run` 或 `.run_stream` 方法運行，分別用於非串流或串流回應。

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

每次代理運行也可以自訂參數選項，例如代理所使用的 `max_tokens`、代理可以呼叫的 `tools`，甚至用於代理的 `model`。

這在需要特定模型或工具完成使用者任務時非常有用。

<strong>工具</strong>

工具可在定義代理時指定：

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# 當直接建立 ChatAgent 時

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

也可以在執行代理時指定：

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # 只為此次執行提供的工具 )
```

**代理線程 (Agent Threads)**

代理線程用於管理多輪對話。線程可通過以下方式建立：

- 使用 `get_new_thread()` 允許線程隨時間儲存
- 在運行代理時自動建立線程，且線程僅在當前執行期間存在。

建立線程的程式碼如下：

```python
# 建立一個新線程。
thread = agent.get_new_thread() # 使用該線程運行代理。
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

之後你可以序列化該線程以供後續使用：

```python
# 建立一個新執行緒。
thread = agent.get_new_thread() 

# 使用該執行緒執行代理。

response = await agent.run("Hello, how are you?", thread=thread) 

# 將執行緒序列化以便儲存。

serialized_thread = await thread.serialize() 

# 從儲存中載入後反序列化執行緒狀態。

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**代理中介軟件 (Agent Middleware)**

代理透過工具與 LLM 互動以完成使用者任務。在某些場景下，我們希望在這些互動之間執行或追蹤操作。代理中介軟件讓我們做到這點，包含：

<em>函數中介軟件</em>

此中介軟件允許在代理與它將呼叫的函數／工具之間執行動作。例如，當你想對函數呼叫做些日誌記錄時會使用。

下面程式碼中 `next` 定義是否呼叫下一個中介軟件或實際函數。

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # 前置處理：函式執行前的日誌記錄
    print(f"[Function] Calling {context.function.name}")

    # 繼續執行下一個中介軟件或函式
    await next(context)

    # 後置處理：函式執行後的日誌記錄
    print(f"[Function] {context.function.name} completed")
```

<em>聊天中介軟件</em>

此中介軟件允許在代理與 LLM 請求之間執行或紀錄動作。

它包含重要訊息如發送至 AI 服務的 `messages`。

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # 預處理：在 AI 呼叫之前記錄日誌
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # 繼續到下一個中介軟體或 AI 服務
    await next(context)

    # 後處理：在 AI 回應後記錄日誌
    print("[Chat] AI response received")

```

**代理記憶 (Agent Memory)**

如同在 `Agentic Memory` 課程中介紹，記憶是使代理能在不同上下文中運作的重要元素。MAF 提供多種不同類型的記憶：

<em>記憶體中儲存</em>

指的是在應用執行期間，記憶儲存在線程中。

```python
# 建立一個新執行緒。
thread = agent.get_new_thread() # 使用該執行緒運行代理。
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

<em>持久訊息</em>

用於跨多個會話存儲對話歷史。透過 `chat_message_store_factory` 定義：

```python
from agent_framework import ChatMessageStore

# 建立一個自訂訊息儲存庫
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

<em>動態記憶</em>

此記憶在代理運行前新增到上下文。這些記憶可儲存在外部服務如 mem0：

```python
from agent_framework.mem0 import Mem0Provider

# 使用 Mem0 以提供進階記憶體功能
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

**代理可觀察性 (Agent Observability)**

可觀察性對構建可靠且可維護的代理系統非常重要。MAF 整合 OpenTelemetry 提供追蹤與度量，增強可觀察性。

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # 做某事
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### 工作流程 (Workflows)

MAF 提供工作流程，為完成任務預先定義的步驟，並在步驟中包含 AI 代理作為組件。

工作流程由不同組件組成，以提供更佳的控制流程。工作流程同時支援 <strong>多代理協作</strong> 與 <strong>檢查點</strong> 以保存工作流程狀態。

工作流程的核心組件有：

**執行器 (Executors)**

執行器接收輸入訊息，執行分配任務，然後產生輸出訊息，使工作流程向完成更大任務邁進。執行器可以是 AI 代理或客製邏輯。

**邊 (Edges)**

邊用於定義工作流程中的訊息流向，可包含：

<em>直接邊</em> - 執行器間的簡單一對一連接：

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

<em>條件邊</em> - 滿足特定條件後啟動。例如，當旅館房間無法預訂時，執行器可建議其他選項。

<em>切換案例邊</em> - 根據定義條件將訊息導向不同執行器。例如，若旅遊客戶具有優先權，則其任務將透過其他工作流程處理。

<em>分發邊</em> - 將一則訊息送至多個目標。

<em>合併邊</em> - 集合多個執行器的訊息並送至單一目標。

**事件 (Events)**

為了增進對工作流程的可觀察性，MAF 提供內建執行事件，包括：

- `WorkflowStartedEvent`  - 工作流程開始執行
- `WorkflowOutputEvent` - 工作流程產生輸出
- `WorkflowErrorEvent` - 工作流程發生錯誤
- `ExecutorInvokeEvent`  - 執行器開始處理
- `ExecutorCompleteEvent`  - 執行器完成處理
- `RequestInfoEvent` - 發出請求

## 高級 MAF 模式

上述章節涵蓋了 Microsoft Agent Framework 的核心概念。當您建立更複雜的代理時，可以考慮以下一些高級模式：

- <strong>中介軟件組合</strong>：使用函數與聊天中介軟件串聯多個中介軟件處理程序（記錄、驗證、速率限制），以細粒度控制代理行為。
- <strong>工作流程檢查點</strong>：利用工作流程事件與序列化保存並恢復長時間運行的代理程序。
- <strong>動態工具選擇</strong>：結合以工具描述進行的 RAG 與 MAF 的工具註冊，僅呈現每次查詢相關的工具。
- <strong>多代理交接</strong>：使用工作流程邊與條件路由協調專門代理間的任務交接。

## 程式範例

Microsoft Agent Framework 的程式範例可在本儲存庫中的 `xx-python-agent-framework` 與 `xx-dotnet-agent-framework` 檔案中找到。

## 對 Microsoft Agent Framework 有更多疑問嗎？

加入 [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) 與其他學習者交流，參加線上辦公時間，並解答您的 AI 代理問題。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。雖然我們盡力確保準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->