[![Cách Thiết Kế Các Đại Lý AI Tốt](../../../translated_images/vi/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Nhấp vào hình ảnh bên trên để xem video bài học này)_

# Mẫu Thiết Kế Sử Dụng Công Cụ

Công cụ rất thú vị vì chúng cho phép các đại lý AI có phạm vi khả năng rộng hơn. Thay vì đại lý chỉ có một tập hợp hành động giới hạn mà nó có thể thực hiện, bằng cách thêm công cụ, đại lý giờ đây có thể thực hiện nhiều hành động khác nhau. Trong chương này, chúng ta sẽ xem xét Mẫu Thiết Kế Sử Dụng Công Cụ, mô tả cách các đại lý AI có thể sử dụng các công cụ cụ thể để đạt được mục tiêu của họ.

## Giới thiệu

Trong bài học này, chúng ta sẽ tìm câu trả lời cho các câu hỏi sau:

- Mẫu thiết kế sử dụng công cụ là gì?
- Các trường hợp sử dụng có thể áp dụng mẫu này là gì?
- Những yếu tố/khối xây dựng cần thiết để triển khai mẫu thiết kế là gì?
- Các lưu ý đặc biệt khi sử dụng Mẫu Thiết Kế Sử Dụng Công Cụ để xây dựng các đại lý AI đáng tin cậy là gì?

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ có thể:

- Định nghĩa Mẫu Thiết Kế Sử Dụng Công Cụ và mục đích của nó.
- Xác định các trường hợp sử dụng mà Mẫu Thiết Kế Sử Dụng Công Cụ có thể áp dụng.
- Hiểu các yếu tố chính cần thiết để triển khai mẫu thiết kế.
- Nhận biết các lưu ý để đảm bảo độ tin cậy cho các đại lý AI sử dụng mẫu thiết kế này.

## Mẫu Thiết Kế Sử Dụng Công Cụ là gì?

**Mẫu Thiết Kế Sử Dụng Công Cụ** tập trung vào việc trao cho các mô hình ngôn ngữ lớn (LLM) khả năng tương tác với các công cụ bên ngoài để đạt được các mục tiêu cụ thể. Công cụ là đoạn mã có thể được một đại lý thực thi để thực hiện hành động. Một công cụ có thể là một hàm đơn giản như máy tính, hoặc một cuộc gọi API đến dịch vụ bên thứ ba như tra cứu giá cổ phiếu hoặc dự báo thời tiết. Trong bối cảnh các đại lý AI, các công cụ được thiết kế để thực thi bởi các đại lý dựa trên **các cuộc gọi hàm do mô hình tạo ra**.

## Các trường hợp sử dụng mà nó có thể áp dụng?

Các Đại Lý AI có thể tận dụng công cụ để hoàn thành các nhiệm vụ phức tạp, truy xuất thông tin hoặc ra quyết định. Mẫu thiết kế sử dụng công cụ thường được dùng trong các kịch bản yêu cầu tương tác động với các hệ thống bên ngoài như cơ sở dữ liệu, dịch vụ web, hoặc trình thông dịch mã lệnh. Khả năng này hữu ích cho một số trường hợp sử dụng khác nhau bao gồm:

- **Truy xuất Thông tin Động:** Đại lý có thể truy vấn các API hoặc cơ sở dữ liệu bên ngoài để lấy dữ liệu cập nhật (ví dụ: truy vấn cơ sở dữ liệu SQLite để phân tích dữ liệu, lấy giá cổ phiếu hoặc thông tin thời tiết).
- **Thực thi và Giải thích Mã Lệnh:** Đại lý có thể thực thi mã hoặc kịch bản để giải quyết các bài toán toán học, tạo báo cáo hoặc thực hiện mô phỏng.
- **Tự động hóa Quy trình làm việc:** Tự động hóa các quy trình lặp đi lặp lại hoặc đa bước bằng cách tích hợp các công cụ như bộ lập lịch tác vụ, dịch vụ email hoặc đường ống dữ liệu.
- **Hỗ trợ Khách hàng:** Đại lý có thể tương tác với hệ thống CRM, nền tảng quản lý vé hoặc cơ sở tri thức để giải quyết thắc mắc của người dùng.
- **Tạo và Chỉnh sửa Nội dung:** Đại lý có thể tận dụng các công cụ như kiểm tra ngữ pháp, tóm tắt văn bản hoặc đánh giá an toàn nội dung để hỗ trợ các nhiệm vụ tạo nội dung.

## Những yếu tố/khối xây dựng cần thiết để triển khai mẫu thiết kế sử dụng công cụ là gì?

Những khối xây dựng này cho phép đại lý AI thực hiện nhiều nhiệm vụ khác nhau. Hãy cùng xem các yếu tố chính cần thiết để triển khai Mẫu Thiết Kế Sử Dụng Công Cụ:

- **Định nghĩa Hàm/Công Cụ**: Các định nghĩa chi tiết về công cụ có sẵn, bao gồm tên hàm, mục đích, tham số yêu cầu và kết quả mong đợi. Các định nghĩa này giúp LLM hiểu công cụ nào có sẵn và cách xây dựng các yêu cầu hợp lệ.

- **Logic Thực thi Hàm:** Quy định cách và khi nào các công cụ được gọi dựa trên ý định người dùng và ngữ cảnh cuộc trò chuyện. Điều này có thể bao gồm các module lập kế hoạch, cơ chế định tuyến hoặc các luồng điều kiện xác định việc sử dụng công cụ một cách linh hoạt.

- **Hệ thống Xử lý Tin nhắn:** Các thành phần quản lý luồng hội thoại giữa các đầu vào của người dùng, phản hồi của LLM, các cuộc gọi công cụ và các kết quả từ công cụ.

- **Khung Tích hợp Công cụ:** Hạ tầng kết nối đại lý với các công cụ khác nhau, dù đó là các hàm đơn giản hay dịch vụ phức tạp bên ngoài.

- **Xử lý Lỗi & Xác thực:** Các cơ chế xử lý lỗi khi thực thi công cụ, xác thực tham số và quản lý các phản hồi không mong muốn.

- **Quản lý Trạng thái:** Theo dõi ngữ cảnh cuộc trò chuyện, các tương tác công cụ trước đó và dữ liệu lưu trữ để đảm bảo tính nhất quán qua các tương tác đa lượt.

Tiếp theo, hãy xem chi tiết hơn về Gọi Hàm/Công Cụ.
 
### Gọi Hàm/Công Cụ

Gọi hàm là cách chính để chúng ta cho phép các Mô hình Ngôn ngữ Lớn (LLM) tương tác với các công cụ. Bạn thường thấy 'Hàm' và 'Công Cụ' được dùng thay thế cho nhau vì các 'hàm' (khối mã có thể tái sử dụng) là các 'công cụ' mà đại lý sử dụng để thực hiện nhiệm vụ. Để mã của một hàm được gọi, LLM phải so sánh yêu cầu của người dùng với mô tả các hàm. Để làm điều này, một schema chứa mô tả tất cả các hàm có sẵn sẽ được gửi đến LLM. LLM sau đó chọn hàm phù hợp nhất cho nhiệm vụ và trả về tên hàm cùng các đối số. Hàm được chọn được gọi, phản hồi của hàm được gửi lại cho LLM, LLM sử dụng thông tin đó để trả lời yêu cầu của người dùng.

Đối với các nhà phát triển muốn triển khai gọi hàm cho các đại lý, bạn sẽ cần:

1. Một mô hình LLM hỗ trợ gọi hàm
2. Một schema chứa mô tả các hàm
3. Mã cho từng hàm đã được mô tả

Hãy dùng ví dụ lấy giờ hiện tại tại một thành phố để minh họa:

1. **Khởi tạo một LLM hỗ trợ gọi hàm:**

    Không phải tất cả các mô hình đều hỗ trợ gọi hàm, vì vậy việc kiểm tra mô hình LLM bạn sử dụng có hỗ trợ hay không là rất quan trọng. <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> hỗ trợ gọi hàm. Chúng ta có thể bắt đầu bằng cách khởi tạo client OpenAI sử dụng API phản hồi của Azure OpenAI (điểm cuối ổn định `/openai/v1/` — không cần `api_version`).

    ```python
    # Khởi tạo client OpenAI cho Azure OpenAI (API Responses, điểm cuối v1)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Tạo Schema Hàm**:

    Tiếp theo, chúng ta sẽ định nghĩa schema JSON chứa tên hàm, mô tả chức năng của hàm, và tên cùng mô tả các tham số của hàm.
    Sau đó, chúng ta sẽ đưa schema này cùng yêu cầu của người dùng để tìm giờ hiện tại tại San Francisco vào client đã tạo trước đó. Điều quan trọng cần lưu ý là một **cuộc gọi công cụ** là thứ được trả về, **không phải** câu trả lời cuối cùng cho câu hỏi. Như đã đề cập trước đó, LLM trả về tên hàm được chọn cho nhiệm vụ và các đối số sẽ được truyền đến hàm đó.

    ```python
    # Mô tả chức năng cho mô hình đọc (định dạng công cụ phẳng API phản hồi)
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
  
    # Tin nhắn người dùng ban đầu
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Lần gọi API đầu tiên: Yêu cầu mô hình sử dụng chức năng
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # API Phản hồi trả về các cuộc gọi công cụ dưới dạng các mục function_call trong response.output.
    # Thêm chúng vào cuộc trò chuyện để mô hình có bối cảnh đầy đủ ở lượt tiếp theo.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Mã hàm cần thiết để thực hiện nhiệm vụ:**

    Bây giờ khi LLM đã chọn hàm cần chạy, mã để thực thi nhiệm vụ này cần được hiện thực và chạy.
    Chúng ta có thể hiện thực mã lấy giờ hiện tại bằng Python. Chúng ta cũng cần viết mã để trích xuất tên và đối số từ `response_message` để lấy kết quả cuối cùng.

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
    # Xử lý các cuộc gọi hàm
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Trả về kết quả công cụ dưới dạng một mục function_call_output
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Cuộc gọi API thứ hai: Lấy phản hồi cuối cùng từ mô hình
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

Gọi Hàm là lõi của hầu hết, nếu không muốn nói là tất cả, thiết kế sử dụng công cụ đại lý, tuy nhiên việc triển khai từ đầu có thể đôi khi là thách thức.
Như chúng ta đã học trong [Bài 2](../../../02-explore-agentic-frameworks), các framework đại lý cung cấp cho chúng ta các khối xây dựng sẵn để triển khai sử dụng công cụ.
 
## Ví dụ Sử Dụng Công Cụ với Các Framework Đại Lý

Dưới đây là một số ví dụ về cách bạn có thể triển khai Mẫu Thiết Kế Sử Dụng Công Cụ bằng cách sử dụng các framework đại lý khác nhau:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> là một framework AI mã nguồn mở để xây dựng các đại lý AI. Nó đơn giản hóa quá trình sử dụng gọi hàm bằng cách cho phép bạn định nghĩa công cụ như các hàm Python với `@tool` decorator. Framework quản lý việc giao tiếp hai chiều giữa mô hình và mã của bạn. Nó cũng cung cấp quyền truy cập vào các công cụ có sẵn như Tìm kiếm Tệp và Trình Thông Dịch Mã thông qua `FoundryChatClient`.

Sơ đồ sau minh họa quy trình gọi hàm với Microsoft Agent Framework:

![function calling](../../../translated_images/vi/functioncalling-diagram.a84006fc287f6014.webp)

Trong Microsoft Agent Framework, các công cụ được định nghĩa như các hàm đã được trang trí (decorated). Chúng ta có thể chuyển hàm `get_current_time` mà ta đã thấy trước đó thành một công cụ bằng cách sử dụng `@tool` decorator. Framework sẽ tự động tuần tự hóa hàm và tham số của nó, tạo schema gửi đến LLM.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Tạo khách hàng
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Tạo một đại lý và chạy với công cụ
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> là một framework đại lý mới hơn, được thiết kế để giúp các nhà phát triển xây dựng, triển khai và mở rộng đại lý AI chất lượng cao, có thể mở rộng một cách an toàn mà không cần quản lý tài nguyên tính toán và lưu trữ bên dưới. Nó đặc biệt hữu ích cho các ứng dụng doanh nghiệp vì đây là dịch vụ hoàn toàn quản lý với độ bảo mật cấp doanh nghiệp.

So với việc phát triển trực tiếp với API LLM, Microsoft Foundry Agent Service mang đến một số lợi thế như:

- Gọi công cụ tự động – không cần phân tích cuộc gọi công cụ, thực thi công cụ và xử lý phản hồi; tất cả việc này đều được thực hiện phía máy chủ
- Dữ liệu được quản lý an toàn – thay vì quản lý trạng thái cuộc trò chuyện của riêng bạn, bạn có thể dựa vào threads để lưu trữ tất cả thông tin cần thiết
- Các công cụ có sẵn ngay – Các công cụ bạn có thể dùng để tương tác với nguồn dữ liệu của bạn, như Bing, Azure AI Search, và Azure Functions.

Các công cụ có sẵn trong Microsoft Foundry Agent Service có thể được chia thành hai loại:

1. Công cụ Kiến Thức:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Nền tảng với Bing Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Tìm kiếm Tệp</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Công cụ Thao Tác:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Gọi Hàm</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Trình Thông Dịch Mã</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">Công cụ xác định bằng OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Dịch vụ Đại lý cho phép chúng ta sử dụng các công cụ này cùng nhau như một `toolset`. Nó cũng sử dụng `threads` để theo dõi lịch sử các tin nhắn trong một cuộc trò chuyện cụ thể.

Hãy tưởng tượng bạn là một đại lý bán hàng tại công ty Contoso. Bạn muốn phát triển một đại lý hội thoại có thể trả lời các câu hỏi về dữ liệu bán hàng của bạn.

Hình ảnh sau minh họa cách bạn có thể sử dụng Microsoft Foundry Agent Service để phân tích dữ liệu bán hàng:

![Agentic Service In Action](../../../translated_images/vi/agent-service-in-action.34fb465c9a84659e.webp)

Để sử dụng một trong các công cụ này với dịch vụ, chúng ta có thể tạo client và định nghĩa một công cụ hoặc bộ công cụ. Để thực hiện điều này một cách thực tế, chúng ta có thể dùng mã Python sau đây. LLM sẽ có khả năng xem xét bộ công cụ và quyết định sử dụng hàm do người dùng tạo, `fetch_sales_data_using_sqlite_query`, hoặc Trình Thông Dịch Mã đã được xây dựng sẵn tùy theo yêu cầu người dùng.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # hàm fetch_sales_data_using_sqlite_query có thể được tìm thấy trong file fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Khởi tạo bộ công cụ
toolset = ToolSet()

# Khởi tạo tác nhân gọi hàm với hàm fetch_sales_data_using_sqlite_query và thêm nó vào bộ công cụ
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Khởi tạo công cụ Trình thông dịch Mã và thêm nó vào bộ công cụ.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Các lưu ý đặc biệt khi sử dụng Mẫu Thiết Kế Sử Dụng Công Cụ để xây dựng đại lý AI đáng tin cậy?

Một mối quan tâm phổ biến với SQL được LLM tạo động là bảo mật, đặc biệt là nguy cơ SQL injection hoặc các hành động ác ý, như xóa hoặc can thiệp vào cơ sở dữ liệu. Mặc dù những lo ngại này là hợp lý, chúng có thể được giảm thiểu hiệu quả bằng cách cấu hình đúng quyền truy cập cơ sở dữ liệu. Đối với hầu hết các cơ sở dữ liệu, việc này liên quan đến việc cấu hình cơ sở dữ liệu ở chế độ chỉ đọc. Đối với các dịch vụ cơ sở dữ liệu như PostgreSQL hoặc Azure SQL, ứng dụng nên được gán quyền chỉ đọc (SELECT).

Việc chạy ứng dụng trong môi trường an toàn càng tăng cường thêm bảo vệ. Trong các kịch bản doanh nghiệp, dữ liệu thường được trích xuất và chuyển đổi từ hệ thống vận hành sang cơ sở dữ liệu hoặc kho dữ liệu chỉ đọc với schema thân thiện với người dùng. Phương pháp này đảm bảo dữ liệu được an toàn, được tối ưu cho hiệu suất và khả năng truy cập, đồng thời ứng dụng có quyền truy cập chỉ đọc hạn chế.

## Mã nguồn mẫu

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Còn câu hỏi nào thêm về Mẫu Thiết Kế Sử Dụng Công Cụ không?

Tham gia [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) để gặp gỡ các học viên khác, tham dự giờ làm việc và được giải đáp các câu hỏi về Đại lý AI.

## Tài nguyên bổ sung

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Hội thảo Azure AI Agents Service</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Hội thảo Multi-Agent Viết Sáng Tạo Contoso</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Tổng Quan Microsoft Agent Framework</a>


## Kiểm Tra Nhanh Agent Này (Tùy Chọn)

Sau khi bạn học cách triển khai các agent trong [Bài 16](../16-deploying-scalable-agents/README.md), bạn có thể kiểm tra nhanh `TravelToolAgent` của bài này (liệu nó còn gọi công cụ và trả lời không?) với [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Xem [`tests/README.md`](../tests/README.md) để biết cách chạy nó.

## Bài Trước

[Hiểu Các Mẫu Thiết Kế Agentic](../03-agentic-design-patterns/README.md)

## Bài Tiếp Theo

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->