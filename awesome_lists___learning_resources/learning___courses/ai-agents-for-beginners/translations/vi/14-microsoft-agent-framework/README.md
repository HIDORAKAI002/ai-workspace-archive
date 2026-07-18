# Khám phá Microsoft Agent Framework

![Agent Framework](../../../translated_images/vi/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Giới thiệu

Bài học này sẽ bao gồm:

- Hiểu về Microsoft Agent Framework: Các Tính năng Chính và Giá trị  
- Khám phá Các Khái niệm Chính của Microsoft Agent Framework
- Các Mẫu nâng cao của MAF: Quy trình làm việc, Middleware và Bộ nhớ

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ biết cách:

- Xây dựng các đại lý AI sẵn sàng sản xuất bằng Microsoft Agent Framework
- Áp dụng các tính năng cốt lõi của Microsoft Agent Framework cho các trường hợp sử dụng đại lý của bạn
- Sử dụng các mẫu nâng cao bao gồm quy trình làm việc, middleware và khả năng quan sát

## Mẫu mã code

Mẫu mã cho [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) có thể tìm thấy trong kho lưu trữ này dưới các tệp `xx-python-agent-framework` và `xx-dotnet-agent-framework`.

## Hiểu về Microsoft Agent Framework

![Framework Intro](../../../translated_images/vi/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) là framework hợp nhất của Microsoft để xây dựng các đại lý AI. Nó cung cấp sự linh hoạt để giải quyết nhiều trường hợp sử dụng đại lý khác nhau được thấy trong cả môi trường sản xuất và nghiên cứu bao gồm:

- **Điều phối đại lý theo trình tự** trong các kịch bản cần quy trình từng bước.
- **Điều phối đồng thời** trong các kịch bản nơi các đại lý cần hoàn thành nhiệm vụ cùng lúc.
- **Điều phối nhóm trò chuyện** trong các kịch bản nơi các đại lý có thể hợp tác cùng thực hiện một nhiệm vụ.
- **Điều phối bàn giao** trong các kịch bản nơi các đại lý chuyển giao nhiệm vụ cho nhau khi các nhiệm vụ con được hoàn thành.
- **Điều phối từ tính** trong các kịch bản nơi đại lý quản lý tạo và chỉnh sửa danh sách nhiệm vụ và xử lý điều phối các đại lý phụ để hoàn thành nhiệm vụ.

Để cung cấp các đại lý AI trong sản xuất, MAF cũng bao gồm các tính năng cho:

- **Khả năng quan sát** thông qua việc sử dụng OpenTelemetry, nơi mọi hành động của đại lý AI bao gồm gọi công cụ, bước điều phối, luồng suy luận và theo dõi hiệu năng qua bảng điều khiển Microsoft Foundry.
- **Bảo mật** bằng cách lưu trữ các đại lý trực tiếp trên Microsoft Foundry với các kiểm soát bảo mật như truy cập dựa trên vai trò, xử lý dữ liệu riêng tư và an toàn nội dung tích hợp sẵn.
- **Độ bền** khi các luồng và quy trình làm việc của đại lý có thể tạm dừng, tiếp tục và phục hồi sau lỗi giúp cho quy trình chạy lâu dài.
- **Kiểm soát** khi quy trình làm việc có con người trong vòng lặp được hỗ trợ, nơi các nhiệm vụ được đánh dấu là cần sự phê duyệt của con người.

Microsoft Agent Framework cũng tập trung vào tính tương tác bằng cách:

- **Không phụ thuộc vào đám mây** - Các đại lý có thể chạy trong container, tại chỗ và trên nhiều đám mây khác nhau.
- **Không phụ thuộc nhà cung cấp** - Các đại lý có thể được tạo thông qua SDK mà bạn ưa thích bao gồm Azure OpenAI và OpenAI
- **Tích hợp các chuẩn mở** - Các đại lý có thể sử dụng các giao thức như Agent-to-Agent (A2A) và Model Context Protocol (MCP) để khám phá và sử dụng các đại lý cũng như công cụ khác.
- **Plugin và Kết nối** - Kết nối có thể được tạo đến các dịch vụ dữ liệu và bộ nhớ như Microsoft Fabric, SharePoint, Pinecone và Qdrant.

Hãy xem cách các tính năng này được áp dụng vào một số khái niệm cốt lõi của Microsoft Agent Framework.

## Các Khái niệm Chính của Microsoft Agent Framework

### Đại lý

![Agent Framework](../../../translated_images/vi/agent-components.410a06daf87b4fef.webp)

**Tạo Đại lý**

Việc tạo đại lý được thực hiện bằng cách định nghĩa dịch vụ suy luận (Nhà cung cấp LLM), một
bộ chỉ thị mà đại lý AI sẽ tuân theo, và một `name` được gán:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Ví dụ trên sử dụng `Azure OpenAI` nhưng đại lý có thể được tạo bằng nhiều dịch vụ khác nhau bao gồm `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

Các API `Responses`, `ChatCompletion` của OpenAI

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

hoặc [MiniMax](https://platform.minimaxi.com/), cung cấp API tương thích OpenAI với cửa sổ ngữ cảnh lớn (tối đa 204K token):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

hoặc các đại lý từ xa sử dụng giao thức A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Chạy Đại lý**

Đại lý được chạy bằng các phương thức `.run` hoặc `.run_stream` nhằm lấy phản hồi không phát trực tiếp hoặc phát trực tiếp.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Mỗi lần chạy đại lý cũng có thể có các tùy chọn để tùy chỉnh tham số như `max_tokens` sử dụng bởi đại lý, `tools` mà đại lý có thể gọi, và thậm chí chính `model` được sử dụng cho đại lý.

Điều này hữu ích trong trường hợp yêu cầu các mô hình hoặc công cụ cụ thể để hoàn thành nhiệm vụ của người dùng.

**Công cụ**

Công cụ có thể được định nghĩa cả khi định nghĩa đại lý:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Khi tạo một ChatAgent trực tiếp

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

và cũng có thể khi chạy đại lý:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Công cụ chỉ được cung cấp cho lần chạy này )
```

**Luồng Đại lý**

Luồng đại lý được dùng để xử lý các cuộc hội thoại nhiều lượt. Luồng có thể được tạo bằng cách:

- Sử dụng `get_new_thread()` cho phép lưu luồng theo thời gian
- Tự động tạo một luồng khi chạy đại lý và luồng chỉ tồn tại trong lần chạy hiện tại.

Để tạo một luồng, mã nguồn trông như sau:

```python
# Tạo một luồng mới.
thread = agent.get_new_thread() # Chạy agent với luồng đó.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Bạn có thể tuần tự hóa luồng để lưu trữ sử dụng sau:

```python
# Tạo một luồng mới.
thread = agent.get_new_thread() 

# Chạy agent với luồng.

response = await agent.run("Hello, how are you?", thread=thread) 

# Tuần tự hóa luồng để lưu trữ.

serialized_thread = await thread.serialize() 

# Giải tuần tự trạng thái luồng sau khi tải từ lưu trữ.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Middleware Đại lý**

Đại lý tương tác với công cụ và LLM để hoàn thành nhiệm vụ của người dùng. Trong một số trường hợp, chúng ta muốn thực thi hoặc theo dõi giữa các tương tác này. Middleware đại lý cho phép làm điều này thông qua:

*Middleware hàm*

Middleware này cho phép chúng ta thực thi một hành động giữa đại lý và một hàm/công cụ mà nó sẽ gọi. Ví dụ khi bạn muốn ghi nhật ký cuộc gọi hàm.

Trong mã dưới, `next` xác định có nên gọi middleware tiếp theo hoặc hàm thực tế hay không.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Tiền xử lý: Ghi nhật ký trước khi thực hiện hàm
    print(f"[Function] Calling {context.function.name}")

    # Tiếp tục đến middleware tiếp theo hoặc thực hiện hàm
    await next(context)

    # Hậu xử lý: Ghi nhật ký sau khi thực hiện hàm
    print(f"[Function] {context.function.name} completed")
```

*Middleware trò chuyện*

Middleware này cho phép chúng ta thực thi hoặc ghi nhật ký hành động giữa đại lý và các yêu cầu giữa LLM.

Điều này chứa thông tin quan trọng như các `messages` được gửi đến dịch vụ AI.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Tiền xử lý: Ghi nhật ký trước khi gọi AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Tiếp tục đến middleware hoặc dịch vụ AI tiếp theo
    await next(context)

    # Hậu xử lý: Ghi nhật ký sau phản hồi của AI
    print("[Chat] AI response received")

```

**Bộ nhớ Đại lý**

Như đã đề cập trong bài học `Agentic Memory`, bộ nhớ là yếu tố quan trọng để cho phép đại lý hoạt động trên các ngữ cảnh khác nhau. MAF cung cấp nhiều loại bộ nhớ khác nhau:

*Lưu trữ trong bộ nhớ*

Đây là bộ nhớ lưu trong các luồng trong thời gian chạy ứng dụng.

```python
# Tạo một luồng mới.
thread = agent.get_new_thread() # Chạy tác nhân với luồng.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Tin nhắn bền vững*

Bộ nhớ này được dùng khi lưu trữ lịch sử hội thoại giữa các phiên khác nhau. Nó được định nghĩa sử dụng `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Tạo một kho tin nhắn tùy chỉnh
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Bộ nhớ động*

Bộ nhớ này được thêm vào ngữ cảnh trước khi chạy đại lý. Bộ nhớ này có thể lưu trữ trong các dịch vụ bên ngoài như mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Sử dụng Mem0 cho các khả năng bộ nhớ nâng cao
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

**Khả năng Quan sát của Đại lý**

Khả năng quan sát quan trọng để xây dựng hệ thống đại lý đáng tin cậy và dễ bảo trì. MAF tích hợp với OpenTelemetry để cung cấp theo dõi và đo đạc cho khả năng quan sát tốt hơn.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # làm gì đó
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Quy trình làm việc

MAF cung cấp các quy trình làm việc là các bước được định nghĩa sẵn để hoàn thành một nhiệm vụ và bao gồm các đại lý AI như thành phần trong các bước đó.

Quy trình làm việc được tạo thành từ các thành phần khác nhau cho phép kiểm soát luồng tốt hơn. Quy trình cũng hỗ trợ **điều phối đa đại lý** và **đánh dấu điểm kiểm tra** để lưu trạng thái quy trình.

Các thành phần cốt lõi của một quy trình làm việc là:

**Người thực thi**

Người thực thi nhận các tin nhắn đầu vào, thực hiện các nhiệm vụ được giao và sau đó tạo ra tin nhắn đầu ra. Điều này giúp quy trình tiến tới hoàn thành nhiệm vụ lớn hơn. Người thực thi có thể là đại lý AI hoặc logic tùy chỉnh.

**Đường nối**

Đường nối dùng để định nghĩa luồng tin nhắn trong quy trình làm việc. Chúng có thể là:

*Đường nối trực tiếp* - Kết nối một-một đơn giản giữa các người thực thi:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Đường nối điều kiện* - Kích hoạt sau khi thỏa điều kiện nhất định. Ví dụ, khi phòng khách sạn không còn, một người thực thi có thể gợi ý các lựa chọn khác.

*Đường nối chuyển đổi* - Định tuyến tin nhắn tới các người thực thi khác nhau dựa trên điều kiện đã định. Ví dụ nếu khách du lịch có quyền truy cập ưu tiên và nhiệm vụ của họ được xử lý qua một quy trình khác.

*Đường nối phân nhánh* - Gửi một tin nhắn tới nhiều đích khác nhau.

*Đường nối tập hợp* - Thu thập nhiều tin nhắn từ các người thực thi khác nhau và gửi tới một đích duy nhất.

**Sự kiện**

Để cung cấp khả năng quan sát tốt hơn cho quy trình làm việc, MAF cung cấp các sự kiện tích hợp sẵn cho việc thực thi bao gồm:

- `WorkflowStartedEvent`  - Bắt đầu thực thi quy trình
- `WorkflowOutputEvent` - Quy trình tạo ra đầu ra
- `WorkflowErrorEvent` - Quy trình gặp lỗi
- `ExecutorInvokeEvent`  - Người thực thi bắt đầu xử lý
- `ExecutorCompleteEvent`  -  Người thực thi hoàn thành xử lý
- `RequestInfoEvent` - Yêu cầu được phát hành

## Mẫu MAF Nâng cao

Các phần trên đề cập các khái niệm chính của Microsoft Agent Framework. Khi bạn xây dựng các đại lý phức tạp hơn, đây là một số mẫu nâng cao để xem xét:

- **Tích hợp Middleware**: Chuỗi nhiều trình xử lý middleware (ghi nhật ký, xác thực, giới hạn tốc độ) sử dụng middleware hàm và cuộc trò chuyện để kiểm soát hành vi đại lý chi tiết.
- **Đánh dấu điểm kiểm tra quy trình**: Sử dụng sự kiện quy trình và tuần tự hóa để lưu và tiếp tục các quy trình đại lý chạy lâu.
- **Lựa chọn công cụ động**: Kết hợp RAG dựa trên mô tả công cụ với đăng ký công cụ của MAF để chỉ trình bày các công cụ liên quan cho mỗi truy vấn.
- **Bàn giao đa đại lý**: Sử dụng đường nối quy trình và định tuyến có điều kiện để điều phối bàn giao giữa các đại lý chuyên môn hóa.

## Lưu trữ Đại lý LangChain / LangGraph trên Microsoft Foundry

Microsoft Agent Framework là **framework tương tác được** — bạn không bị giới hạn bởi các đại lý viết bằng MAF. Nếu bạn đã có đại lý xây dựng bằng **LangChain** hoặc **LangGraph**, bạn có thể chạy nó như một **đại lý được lưu trữ trên Microsoft Foundry** để Foundry quản lý runtime, phiên làm việc, mở rộng, nhận dạng và các điểm cuối giao thức cho bạn, trong khi logic đại lý vẫn ở LangGraph.

Điều này được thực hiện bằng package `langchain_azure_ai.agents.hosting`, ở đó cung cấp một đồ thị LangGraph biên dịch qua các giao thức mà các đại lý lưu trữ Foundry sử dụng.

**1. Cài đặt phần mở rộng hosting:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

Phần mở rộng `hosting` cài đặt các thư viện giao thức Foundry: `azure-ai-agentserver-responses` (điểm cuối `/responses` tương thích OpenAI) và `azure-ai-agentserver-invocations` (điểm cuối `/invocations` chung).

**2. Chọn giao thức hosting:**

| Giao thức | Lớp host | Điểm cuối | Sử dụng khi |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Bạn muốn hội thoại tương thích OpenAI, phát trực tiếp, lịch sử phản hồi, và luồng hội thoại — đây là mặc định được khuyến nghị cho các đại lý hội thoại. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Bạn cần hình dạng JSON tùy chỉnh, điểm cuối kiểu webhook, hoặc xử lý không hội thoại. |

Vì **API Responses là API chính cho phát triển đại lý kiểu agent trong Foundry**, hãy bắt đầu với `ResponsesHostServer` cho đa số đại lý.

**3. Cấu hình biến môi trường** (`az login` trước để `DefaultAzureCredential` có thể xác thực):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Khi đại lý chạy sau này như một đại lý lưu trữ trong Foundry, nền tảng sẽ tự động chèn `FOUNDRY_PROJECT_ENDPOINT`.

**4. Phơi bày đại lý LangGraph qua giao thức Responses:**

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

    # ChatOpenAI ở đây nhắm đến điểm cuối (Responses) tương thích với OpenAI của dự án Foundry.
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

Chạy nó cục bộ với `python main.py`, sau đó gửi yêu cầu Responses tới `http://localhost:8088/responses`.

**Hành vi chính:**

- **Hội thoại**: Khách hàng tiếp tục một hội thoại bằng cách truyền `previous_response_id` hoặc `conversation` ID. Nếu đồ thị của bạn được biên dịch với bộ đánh dấu kiểm tra LangGraph, Foundry sẽ khóa trạng thái hội thoại vào điểm kiểm tra (sử dụng bộ đánh dấu kiểm tra bền vững trong sản xuất; `MemorySaver` phù hợp cho thử nghiệm cục bộ).
- **Con người trong vòng lặp**: Nếu đồ thị của bạn dùng `interrupt()` của LangGraph, `ResponsesHostServer` sẽ hiện interrupt đang chờ như một mục `function_call` / `mcp_approval_request` của Responses, và khách hàng tiếp tục với `function_call_output` / `mcp_approval_response` tương ứng.
- **Triển khai vào Foundry**: Sử dụng Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (cục bộ, cần Docker), rồi `azd provision` và `azd deploy`. Việc triển khai đại lý lưu trữ đòi hỏi vai trò **Foundry Project Manager**.

Một phiên bản chạy được của ví dụ này nằm trong [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Để xem hướng dẫn đầy đủ (giao thức Invocations, schema yêu cầu tùy chỉnh và khắc phục sự cố), xem [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Mẫu mã code

Mẫu mã cho Microsoft Agent Framework có thể tìm thấy trong kho lưu trữ này dưới các tệp `xx-python-agent-framework` và `xx-dotnet-agent-framework`.

## Có câu hỏi thêm về Microsoft Agent Framework?

Tham gia [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) để gặp gỡ các người học khác, tham dự giờ làm việc, và được giải đáp các câu hỏi về đại lý AI.
## Bài học trước

[Bộ nhớ cho Đại lý AI](../13-agent-memory/README.md)

## Bài học tiếp theo

[Xây dựng Đại lý Sử dụng Máy tính (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->