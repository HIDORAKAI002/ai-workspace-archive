# 探索 Microsoft Agent Framework

![Agent Framework](../../../translated_images/zh-MO/lesson-14-thumbnail.90df0065b9d234ee.webp)

### 介紹

本課程將涵蓋：

- 了解 Microsoft Agent Framework：主要功能與價值  
- 探索 Microsoft Agent Framework 的關鍵概念
- 進階 MAF 模式：工作流程、中介軟體與記憶體

## 學習目標

完成本課程後，你將知道如何：

- 使用 Microsoft Agent Framework 建立生產就緒的 AI 代理
- 將 Microsoft Agent Framework 的核心功能應用於你的代理使用情境
- 使用包括工作流程、中介軟體與可觀察性在內的進階模式

## 範例程式碼

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) 的範例程式碼可在本儲存庫中 `xx-python-agent-framework` 與 `xx-dotnet-agent-framework` 檔案找到。

## 了解 Microsoft Agent Framework

![Framework Intro](../../../translated_images/zh-MO/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) 是微軟用於建構 AI 代理的統一框架。它提供靈活性，以應對生產和研究環境中各種代理使用情境，包括：

- <strong>序列代理編排</strong>：在需要逐步工作流程的情況下使用。
- <strong>同步編排</strong>：在代理需要同時完成多項任務的情況下使用。
- <strong>群組聊天編排</strong>：在代理可以合作處理單一任務的情況下使用。
- <strong>任務交接編排</strong>：在代理完成子任務後互相交接任務的情況下使用。
- <strong>磁性編排</strong>：由管理代理建立和修改任務清單，並處理子代理協調以完成任務的情況下使用。

為了在生產環境中提供 AI 代理，MAF 也包含以下功能：

- <strong>可觀察性</strong>：透過 OpenTelemetry，監視 AI 代理的每個行動，包括工具調用、編排步驟、推理流程，以及透過 Microsoft Foundry 儀表板的性能監控。
- <strong>安全性</strong>：代理原生託管於 Microsoft Foundry，包含角色基礎存取控制、私人資料處理和內建內容安全等安全控管。
- <strong>耐久性</strong>：代理線程及工作流程可暫停、恢復及錯誤復原，支持長時間運行流程。
- <strong>控制能力</strong>：支援人機互動工作流程，任務可標記為需人工核准。

Microsoft Agent Framework 亦致力於互通性：

- <strong>雲端中立性</strong>：代理可在容器、本地端及多種不同雲端環境運行。
- <strong>供應商中立性</strong>：代理可透過你偏好的 SDK 建立，包括 Azure OpenAI 及 OpenAI。
- <strong>整合開放標準</strong>：代理可使用 Agent-to-Agent(A2A) 與 Model Context Protocol (MCP) 等協議，探索並使用其他代理和工具。
- <strong>插件與連接器</strong>：可連接至 Microsoft Fabric、SharePoint、Pinecone 與 Qdrant 等資料及記憶體服務。

讓我們來看看這些功能如何應用於 Microsoft Agent Framework 的核心概念。

## Microsoft Agent Framework 的關鍵概念

### 代理

![Agent Framework](../../../translated_images/zh-MO/agent-components.410a06daf87b4fef.webp)

<strong>建立代理</strong>

代理建立是透過定義推理服務（LLM 提供者）、
一組 AI 代理需遵循的指令，以及指派 `name` 來完成：


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

上述是使用 `Azure OpenAI`，但代理（agents）可以使用各種服務來創建，包括 `Microsoft Foundry Agent Service`：

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

或 [MiniMax](https://platform.minimaxi.com/)，它提供與 OpenAI 相容且具有大型上下文窗口（最高 204K 令牌）的API：

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

或使用 A2A 協議的遠程代理：

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

<strong>執行代理</strong>

代理透過 `.run` 或 `.run_stream` 方法執行，分別對應非串流或串流回應。

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

每次代理執行也可設定選項以自訂代理使用的參數，如 `max_tokens`、代理能呼叫的 `tools`，甚至使用的 `model` 本身。

這在需要特定模型或工具來完成用戶任務時非常有用。

<strong>工具</strong>

工具既可在定義代理時設定：

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# 當直接建立 ChatAgent 時

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

也可以在執行代理時設定：

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # 僅為此次運行提供的工具 )
```

<strong>代理對話線程</strong>

代理對話線程用於處理多輪對話。線程可以透過以下方式建立：

- 使用 `get_new_thread()`，這讓線程可被長期保存
- 在執行代理時自動建立線程，且該線程只存在於當前執行期間。

建立線程的程式碼如下：

```python
# 建立一個新執行緒。
thread = agent.get_new_thread() # 用該執行緒運行代理。
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

你之後可以將線程序列化以便稍後使用：

```python
# 建立一個新執行緒。
thread = agent.get_new_thread() 

# 使用該執行緒運行代理。

response = await agent.run("Hello, how are you?", thread=thread) 

# 將執行緒序列化以儲存。

serialized_thread = await thread.serialize() 

# 從儲存中載入後反序列化執行緒狀態。

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

<strong>代理中介軟體</strong>

代理與工具和大語言模型互動以完成用戶任務。在某些情景中，我們希望在這些互動之間執行或追蹤操作。代理中介軟體使我們能做到這一點，透過：

<em>函式中介軟體</em>

這種中介軟體允許我們在代理與將被呼叫的函式/工具之間執行動作。這在你可能想對函式呼叫進行紀錄時特別有用。

以下程式碼中，`next` 用來定義是調用下一個中介軟體還是實際函式。

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # 預處理：執行函數前記錄日誌
    print(f"[Function] Calling {context.function.name}")

    # 繼續到下一個中介軟件或函數執行
    await next(context)

    # 後處理：執行函數後記錄日誌
    print(f"[Function] {context.function.name} completed")
```

<em>聊天中介軟體</em>

這種中介軟體允許我們在代理和大語言模型之間的請求中執行或紀錄操作。

它包含重要資訊，如傳送給 AI 服務的 `messages`。

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # 預處理：在 AI 呼叫前記錄日誌
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # 繼續到下一個中介軟件或 AI 服務
    await next(context)

    # 後處理：在 AI 回應後記錄日誌
    print("[Chat] AI response received")

```

<strong>代理記憶</strong>

如同 `Agentic Memory` 教學中所述，記憶是使代理能在不同上下文中操作的重要元素。MAF 提供了幾種不同類型的記憶：

<em>內存儲存</em>

這是應用程序運行期間在線程中儲存的記憶。

```python
# 建立一個新執行緒。
thread = agent.get_new_thread() # 用該執行緒執行代理。
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

<em>持久化訊息</em>

此記憶用於跨不同會話儲存對話歷史。它是透過 `chat_message_store_factory` 定義：

```python
from agent_framework import ChatMessageStore

# 建立自訂的訊息儲存庫
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

<em>動態記憶</em>

這種記憶在代理執行前被添加到上下文中。這些記憶可以存儲於外部服務，如 mem0：

```python
from agent_framework.mem0 import Mem0Provider

# 使用 Mem0 以獲得進階記憶體功能
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

<strong>代理可觀察性</strong>


可觀察性對於構建可靠且可維護的代理系統非常重要。MAF 與 OpenTelemetry 整合，以提供追蹤和計量，從而提升可觀察性。

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # 做啲嘢
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### 工作流程

MAF 提供預定義步驟的工作流程，以完成任務，並在這些步驟中包含 AI 代理作為組件。

工作流程由不同組件組成，允許更好的控制流程。工作流程還支持<strong>多代理協調</strong>和<strong>檢查點</strong>功能，以保存工作流程狀態。

工作流程的核心組件包括：

<strong>執行者</strong>

執行者接收輸入訊息，執行指定任務，然後產生輸出訊息。這推動工作流程向完成較大任務前進。執行者可以是 AI 代理或自定義邏輯。

<strong>邊緣</strong>

邊緣用於定義工作流程中訊息的流向。這些可以是：

<em>直接邊緣</em> - 執行者之間的簡單一對一連接：

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

<em>條件邊緣</em> - 在滿足特定條件後啟動。例如，當酒店房間不可用時，執行者可以建議其他選擇。

<em>分支邊緣</em> - 根據定義條件將訊息路由到不同執行者。例如，若旅遊客戶擁有優先權限，他們的任務將通過另一個工作流程處理。

<em>擴散出邊緣</em> - 將一條訊息發送至多個目標。

<em>匯聚入邊緣</em> - 收集來自不同執行者的多條訊息並發送給一個目標。

<strong>事件</strong>

為了提供更好的工作流程可觀察性，MAF 提供執行過程的內建事件，包括：

- `WorkflowStartedEvent` － 工作流程執行開始
- `WorkflowOutputEvent` － 工作流程產生輸出
- `WorkflowErrorEvent` － 工作流程遇到錯誤
- `ExecutorInvokeEvent` － 執行者開始處理
- `ExecutorCompleteEvent` － 執行者完成處理
- `RequestInfoEvent` － 發出請求

## 高階 MAF 模式

以上部分涵蓋了 Microsoft Agent Framework 的主要概念。當你打造更複雜的代理時，以下是一些值得考慮的高階模式：

- <strong>中間件組合</strong>：使用函數和聊天中間件鏈接多個中間件處理程序（記錄、身份驗證、速率限制），以對代理行為進行細粒度控制。
- <strong>工作流程檢查點</strong>：利用工作流程事件和序列化來保存和恢復長時間運行的代理進程。
- <strong>動態工具選擇</strong>：結合基於工具描述的 RAG 與 MAF 的工具註冊功能，針對每次查詢只呈現相關工具。
- <strong>多代理交接</strong>：使用工作流程邊緣和條件路由來協調專門代理之間的交接。

## 在 Microsoft Foundry 上托管 LangChain / LangGraph 代理

Microsoft Agent Framework 是<strong>框架互通的</strong> —— 你不限於使用 MAF 編寫的代理。如果你已經有用 **LangChain** 或 **LangGraph** 建立的代理，可以將其作為 **Microsoft Foundry 托管代理** 運行，由 Foundry 管理執行時、會話、擴展、身份和協議端點，而你的代理邏輯仍保留在 LangGraph。

這是透過 `langchain_azure_ai.agents.hosting` 套件實現的，該套件釋出經編譯的 LangGraph 圖形，並使用 Foundry 托管代理相同的協議。

**1. 安裝 hosting 額外套件：**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` 額外套件會安裝 Foundry 協議庫：`azure-ai-agentserver-responses`（OpenAI 相容的 `/responses` 端點）及 `azure-ai-agentserver-invocations`（通用 `/invocations` 端點）。

**2. 選擇一種 hosting 協議：**

| 協議 | 主機類別 | 端點 | 適用情境 |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | 想要 OpenAI 相容的聊天、串流、回應歷史及會話線程 — 推薦用於對話型代理的預設方案。 |
| **Invocations** | `InvocationsHostServer` | `/invocations` | 需要自訂 JSON 結構、Webhook 風格端點或非對話式處理。 |

因為 **Responses API 是 Foundry 中代理風格開發的主要 API**，所以絕大多數代理建議先使用 `ResponsesHostServer`。

**3. 配置環境變數**（先 `az login` 以便 `DefaultAzureCredential` 驗證身份）：

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

當代理以托管代理身份在 Foundry 運行時，平台會自動注入 `FOUNDRY_PROJECT_ENDPOINT`。

**4. 透過 Responses 協議暴露 LangGraph 代理：**

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

    # ChatOpenAI 這裡針對 Foundry 項目中與 OpenAI 兼容的（回應）端點。
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

本地用 `python main.py` 執行，然後送出 Responses 請求到 `http://localhost:8088/responses`。

**主要行為特點：**

- <strong>會話</strong>：客戶端可透過傳遞 `previous_response_id` 或 `conversation` ID 延續會話。如果你的圖形是使用 LangGraph 檢查點編譯，Foundry 會將會話狀態與檢查點鍵結（在正式環境使用持久檢查點；本地測試可用 `MemorySaver` 即可）。
- <strong>人類介入環節</strong>：若你的圖形使用 LangGraph `interrupt()`，`ResponsesHostServer` 會將待處理的中斷事件呈現為 Responses 的 `function_call` / `mcp_approval_request` 項目，客戶端再以相應的 `function_call_output` / `mcp_approval_response` 回應繼續。
- **部署到 Foundry**：使用 Azure Developer CLI — `azd ext install azure.ai.agents`、`azd ai agent init -m <manifest>`、`azd ai agent run`（本地，需 Docker），接著 `azd provision` 和 `azd deploy`。托管代理部署需要 **Foundry 項目管理員** 角色。

此範例的可執行版本位於 [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py)。完整教學（包含 Invocations 協議、自訂請求架構及故障排除）請參考 [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)。

## 程式碼範例

Microsoft Agent Framework 的程式碼範例可在本倉庫中 `xx-python-agent-framework` 和 `xx-dotnet-agent-framework` 檔案下找到。

## 還有更多關於 Microsoft Agent Framework 的問題嗎？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) 與其他學習者互動，參加辦公時間，並獲得 AI 代理的相關問題解答。
## 前一課程

[AI 代理的記憶](../13-agent-memory/README.md)

## 下一課程

[建構電腦使用代理 (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->