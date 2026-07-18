# 探索 Microsoft Agent Framework

![Agent Framework](../../../translated_images/zh-HK/lesson-14-thumbnail.90df0065b9d234ee.webp)

### 簡介

本課程將涵蓋：

- 理解 Microsoft Agent Framework：主要功能及價值  
- 探索 Microsoft Agent Framework 的重要概念
- 進階 MAF 範式：工作流程、中介軟體及記憶體

## 學習目標

完成本課程後，您將能夠：

- 使用 Microsoft Agent Framework 建立生產級 AI 代理人
- 將 Microsoft Agent Framework 的核心功能套用於您的代理方案
- 使用進階範式，包括工作流程、中介軟體及觀察能力

## 程式碼範例 

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) 的程式碼範例可在此儲存庫中 `xx-python-agent-framework` 及 `xx-dotnet-agent-framework` 檔案找到。

## 認識 Microsoft Agent Framework

![Framework Intro](../../../translated_images/zh-HK/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) 是微軟統一的 AI 代理人建構框架。它具有靈活性，可用於生產和研究環境中見到的各種類型代理方案，包括：

- <strong>順序式代理人編排</strong>，適用於需要逐步工作流程的場景。
- <strong>同時編排</strong>，適用於代理人需同時完成任務的場景。
- <strong>群組聊天編排</strong>，適用於代理人可共同協作完成一個任務的場景。
- <strong>任務交接編排</strong>，適用於代理人在子任務完成後互相交接任務的場景。
- <strong>磁吸編排</strong>，由管理代理人建立及修改任務清單，並協調子代理人完成任務的場景。

為了在生產中交付 AI 代理人，MAF 還包括以下功能：

- <strong>可觀察性</strong>，利用 OpenTelemetry 追蹤 AI 代理人每個動作，包括工具調用、編排步驟、推理流程，並透過 Microsoft Foundry 儀表板進行性能監控。
- <strong>安全性</strong>，代理人原生托管於 Microsoft Foundry，具備基於角色的存取控制、私密資料處理及內建內容安全等安全機制。
- <strong>持久性</strong>，代理人線程與工作流程可暫停、恢復及從錯誤中復原，支持長時間運作流程。
- <strong>控制能力</strong>，支持人機協同工作流程，標記任務需人工審核。

Microsoft Agent Framework 同時注重互操作性，具備：

- <strong>雲端中立性</strong> — 代理人可在容器、本地端及多種不同雲環境運行。
- <strong>供應商中立性</strong> — 代理人可透過您偏好的 SDK 創建，包括 Azure OpenAI 與 OpenAI。
- <strong>整合開放標準</strong> — 代理人可利用 Agent-to-Agent (A2A) 和 Model Context Protocol (MCP) 等協定，發現及使用其他代理人與工具。
- <strong>外掛和連接器</strong> — 可連接至 Microsoft Fabric、SharePoint、Pinecone 與 Qdrant 等資料及記憶服務。

接著看看這些功能如何應用於 Microsoft Agent Framework 的核心概念。

## Microsoft Agent Framework 核心概念

### 代理人

![Agent Framework](../../../translated_images/zh-HK/agent-components.410a06daf87b4fef.webp)

<strong>建立代理人</strong>

代理人建立是透過定義推理服務（LLM 供應商）、
一組供 AI 代理人遵循的指令，以及指定 `name`：

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

上方範例採用 `Azure OpenAI`，但代理人可透過多種服務建立，包括 `Microsoft Foundry Agent Service`：

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

或 [MiniMax](https://platform.minimaxi.com/)，提供 OpenAI 兼容 API 且上下文視窗可達 204K 代幣：

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

或使用 A2A 協定的遠端代理人：

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

<strong>執行代理人</strong>

代理人透過 `.run` 或 `.run_stream` 方法執行，分別用於非串流與串流回應。

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

執行代理人時亦可自訂參數選項，例如代理人使用的 `max_tokens`、可調用的 `tools`，甚至使用的 `model`。

在特定案例中，針對用戶任務需求選擇特定模型或工具非常有用。

<strong>工具</strong>

建立代理人時可定義工具：

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# 當直接建立一個 ChatAgent 時

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

執行代理人時也可定義工具：

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # 僅供本次執行使用的工具 )
```

<strong>代理人線程</strong>

代理人線程用來處理多輪對話。線程可由以下方式建立：

- 使用 `get_new_thread()`，讓線程得以隨時間保留
- 執行代理人時自動產生線程，且線程僅維持當前運行期間。

建立線程的範例如下：

```python
# 創建一個新執行緒。
thread = agent.get_new_thread() # 使用該執行緒運行代理。
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

可序列化線程以供後續使用：

```python
# 創建一個新線程。
thread = agent.get_new_thread() 

# 使用該線程運行代理。

response = await agent.run("Hello, how are you?", thread=thread) 

# 將線程序列化以進行儲存。

serialized_thread = await thread.serialize() 

# 從儲存中載入後反序列化線程狀態。

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

<strong>代理人中介軟體</strong>

代理人與工具及 LLM 互動以完成用戶任務。在某些情況下，我們需在互動過程中執行或追蹤動作。代理人中介軟體使我們能做到這點，包括：

<em>函數中介軟體</em>

此中介軟體允許我們在代理人與函數／工具呼叫之間執行動作。舉例來說，可用於記錄函數呼叫。

下方程式碼中的 `next` 定義是否呼叫下一個中介軟體或實際函數。

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # 預處理：在函數執行前記錄日誌
    print(f"[Function] Calling {context.function.name}")

    # 繼續下一個中介軟件或函數執行
    await next(context)

    # 後處理：在函數執行後記錄日誌
    print(f"[Function] {context.function.name} completed")
```

<em>聊天中介軟體</em>

此中介軟體允許我們在代理人與 LLM 請求間執行或記錄動作。

其中包含重要資訊如傳送給 AI 服務的 `messages`。

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # 前置處理：AI 調用前記錄日誌
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # 繼續執行下一個中介軟件或 AI 服務
    await next(context)

    # 後置處理：AI 回應後記錄日誌
    print("[Chat] AI response received")

```

<strong>代理人記憶體</strong>

如 `Agentic Memory` 課程中所述，記憶體是讓代理人能夠在不同上下文間運作的重要元素。MAF 提供多種不同類型的記憶體：

<em>記憶體內存儲</em>

這是運行時在線程中儲存的記憶體。

```python
# 建立一個新執行緒。
thread = agent.get_new_thread() # 使用該執行緒運行代理。
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

<em>持久訊息</em>

用於跨不同會話儲存對話歷史，由 `chat_message_store_factory` 定義：

```python
from agent_framework import ChatMessageStore

# 建立自訂訊息儲存庫
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

<em>動態記憶體</em>

於代理人執行前加入上下文的記憶體。此類記憶體可存於像 mem0 這樣的外部服務：

```python
from agent_framework.mem0 import Mem0Provider

# 使用 Mem0 以獲取進階記憶體功能
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

<strong>代理人可觀察性</strong>


可觀察性對於構建可靠且可維護的代理系統非常重要。MAF 與 OpenTelemetry 集成，提供追蹤和度量功能，以增強可觀察性。

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

### 工作流程

MAF 提供工作流程，這些是完成任務的預定義步驟，並在這些步驟中包含 AI 代理作為組件。

工作流程由不同的組件組成，以便更好地控制流程。工作流程還支持 <strong>多代理協調</strong> 及 <strong>檢查點</strong>，用於保存工作流程狀態。

工作流程的核心組件包括：

<strong>執行者</strong>

執行者接收輸入訊息，執行指定的任務，然後產生輸出訊息。這推動工作流程朝完成更大任務的方向前進。執行者可以是 AI 代理或自定義邏輯。

<strong>邊緣</strong>

邊緣用於定義工作流程中訊息的流動。這些可以是：

<em>直接邊緣</em> — 執行者間的一對一簡單連接：

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

<em>條件邊緣</em> — 在滿足某些條件後啟動。例如，當酒店房間不可用時，執行者可以建議其他選項。

<em>分支切換邊緣</em> — 根據定義條件將訊息路由到不同的執行者。例如，如果旅行客戶擁有優先訪問權，他們的任務將通過另一個工作流程處理。

<em>分發邊緣</em> — 向多個目標發送一條訊息。

<em>匯聚邊緣</em> — 收集來自不同執行者的多條訊息並發送至一個目標。

<strong>事件</strong>

為了提供更好的工作流程可觀察性，MAF 提供了內建的執行事件，包括：

- `WorkflowStartedEvent`  — 工作流程執行開始
- `WorkflowOutputEvent` — 工作流程產生輸出
- `WorkflowErrorEvent` — 工作流程遇到錯誤
- `ExecutorInvokeEvent`  — 執行者開始處理
- `ExecutorCompleteEvent`  — 執行者完成處理
- `RequestInfoEvent` — 發出請求

## 進階 MAF 範式

上述章節涵蓋了 Microsoft Agent Framework 的核心概念。當你構建更複雜的代理時，可考慮以下進階範式：

- <strong>中介軟體組合</strong>：使用函數和對話中介軟體串聯多個中介處理程序（記錄、認證、速率限制），以細緻掌控代理行為。
- <strong>工作流程檢查點</strong>：使用工作流程事件與序列化來保存和恢復長時間運行的代理流程。
- <strong>動態工具選擇</strong>：結合基於工具描述的 RAG 與 MAF 的工具註冊，針對查詢僅呈現相關工具。
- <strong>多代理交接</strong>：使用工作流程邊緣和條件路由來協調專業代理間的交接。

## 在 Microsoft Foundry 上承載 LangChain / LangGraph 代理

Microsoft Agent Framework 是 <strong>框架互通的</strong> — 你不需要限制於使用 MAF 編寫的代理。如果你已經有使用 **LangChain** 或 **LangGraph** 編寫的代理，你可以將它作為 **Microsoft Foundry 托管代理** 運行，讓 Foundry 管理執行時、會話、擴展、身份識別和協議端點，而代理邏輯保留在 LangGraph。

這是通過 `langchain_azure_ai.agents.hosting` 套件完成的，該套件以與 Foundry 托管代理相同的協議公開編譯好的 LangGraph 圖形。

**1. 安裝 hosting 額外套件：**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` 額外套件安裝 Foundry 協議庫：`azure-ai-agentserver-responses`（OpenAI 兼容的 `/responses` 端點）和 `azure-ai-agentserver-invocations`（通用的 `/invocations` 端點）。

**2. 選擇 hosting 協議：**

| 協議 | 主機類別 | 端點 | 使用情境 |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | 你需要 OpenAI 兼容的聊天、串流、回應歷史和會話串接 — 推薦預設，適合對話代理。 |
| **Invocations** | `InvocationsHostServer` | `/invocations` | 你需要自定義 JSON 格式，Webhook 風格端點，或非對話處理。 |

因為 **Responses API 是 Foundry 中代理式開發的主要 API**，大多數代理建議從 `ResponsesHostServer` 開始。

**3. 配置環境變數**（先執行 `az login`，以便 `DefaultAzureCredential` 完成身份驗證）：

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

當代理後續在 Foundry 作為托管代理運行時，平台會自動注入 `FOUNDRY_PROJECT_ENDPOINT`。

**4. 透過 Responses 協議公開 LangGraph 代理：**

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

    # ChatOpenAI 這度係針對 Foundry 項目嘅 OpenAI 相容（Responses）端點。
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

本地運行時用 `python main.py`，然後向 `http://localhost:8088/responses` 發送 Responses 請求。

**關鍵行為：**

- <strong>對話</strong>：客戶端可透過傳遞 `previous_response_id` 或 `conversation` ID 繼續對話。如果你的圖形已使用 LangGraph 檢查點編譯，Foundry 會將對話狀態綁定至檢查點（生產環境使用持久檢查點；本地測試則可用 `MemorySaver`）。
- <strong>人工參與流程</strong>：如果你的圖形使用 LangGraph 的 `interrupt()`，`ResponsesHostServer` 將待處理中斷顯示為 Responses `function_call` / `mcp_approval_request` 項目，客戶端則利用對應的 `function_call_output` / `mcp_approval_response` 繼續。
- **部署到 Foundry**：使用 Azure Developer CLI — `azd ext install azure.ai.agents`，`azd ai agent init -m <manifest>`，`azd ai agent run`（本地，需要 Docker），接著 `azd provision` 和 `azd deploy`。托管代理部署需要 **Foundry 專案管理員** 角色。

此範例的可運行版本位於 [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py)。完整教學（Invocations 協議、自定義請求架構及故障排除）請參閱 [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)。

## 程式碼範例 

Microsoft Agent Framework 的程式碼範例可在此存放庫下的 `xx-python-agent-framework` 和 `xx-dotnet-agent-framework` 檔案中找到。

## 對 Microsoft Agent Framework 有更多問題嗎？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)，與其他學習者交流、參加辦公時間並獲得 AI 代理相關疑問解答。
## 上一課程

[AI 代理的記憶](../13-agent-memory/README.md)

## 下一課程

[構建電腦使用代理 (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->