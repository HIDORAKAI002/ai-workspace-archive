[![Khám phá Các Khung Công Tác Đại Lý AI](../../../translated_images/vi/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Nhấp vào hình trên để xem video của bài học này)_

# Khám Phá Các Khung Công Tác Đại Lý AI

Các khung công tác đại lý AI là các nền tảng phần mềm được thiết kế để đơn giản hóa việc tạo, triển khai và quản lý các đại lý AI. Những khung công tác này cung cấp cho các nhà phát triển các thành phần, trừu tượng và công cụ có sẵn giúp hợp lý hóa việc phát triển các hệ thống AI phức tạp.

Những khung công tác này giúp các nhà phát triển tập trung vào các khía cạnh riêng biệt của ứng dụng của họ bằng cách cung cấp các phương pháp tiêu chuẩn cho các thách thức phổ biến trong phát triển đại lý AI. Chúng nâng cao khả năng mở rộng, dễ tiếp cận và hiệu quả trong xây dựng hệ thống AI.

## Giới thiệu 

Bài học này sẽ trình bày:

- Các Khung Công Tác Đại Lý AI là gì và chúng cho phép các nhà phát triển đạt được điều gì?
- Các nhóm có thể sử dụng chúng như thế nào để nhanh chóng tạo mẫu, lặp lại và cải thiện khả năng của đại lý?
- Sự khác biệt giữa các khung công tác và công cụ được Microsoft tạo ra (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> và <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>) là gì?
- Liệu tôi có thể tích hợp trực tiếp các công cụ hệ sinh thái Azure hiện có của mình hay tôi cần các giải pháp độc lập?
- Microsoft Foundry Agent Service là gì và nó giúp tôi như thế nào?

## Mục tiêu học tập

Mục tiêu của bài học này là giúp bạn hiểu:

- Vai trò của các Khung Công Tác Đại Lý AI trong phát triển AI.
- Cách tận dụng các Khung Công Tác Đại Lý AI để xây dựng các đại lý thông minh.
- Các khả năng chính được kích hoạt bởi các Khung Công Tác Đại Lý AI.
- Sự khác biệt giữa Microsoft Agent Framework và Microsoft Foundry Agent Service.

## Các Khung Công Tác Đại Lý AI là gì và chúng cho phép các nhà phát triển làm gì?

Các Khung Công Tác AI truyền thống có thể giúp bạn tích hợp AI vào ứng dụng của mình và nâng cao các ứng dụng này theo các cách sau:

- **Cá nhân hóa**: AI có thể phân tích hành vi và sở thích người dùng để đưa ra các đề xuất, nội dung và trải nghiệm cá nhân hóa.
Ví dụ: Các dịch vụ phát trực tuyến như Netflix sử dụng AI để gợi ý phim và chương trình dựa trên lịch sử xem, tăng sự tương tác và hài lòng của người dùng.
- **Tự động hóa và Hiệu quả**: AI có thể tự động hóa các tác vụ lặp đi lặp lại, hợp lý hóa quy trình làm việc và cải thiện hiệu quả vận hành.
Ví dụ: Các ứng dụng dịch vụ khách hàng sử dụng chatbot được trang bị AI để xử lý các yêu cầu thông thường, giảm thời gian phản hồi và giải phóng nhân viên cho các vấn đề phức tạp hơn.
- **Cải thiện Trải nghiệm Người dùng**: AI có thể nâng cao trải nghiệm người dùng tổng thể bằng cách cung cấp các tính năng thông minh như nhận diện giọng nói, xử lý ngôn ngữ tự nhiên và dự đoán văn bản.
Ví dụ: Các trợ lý ảo như Siri và Google Assistant sử dụng AI để hiểu và phản hồi các lệnh bằng giọng nói, giúp người dùng tương tác dễ dàng hơn với thiết bị.

### Nghe có vẻ tuyệt vời, vậy tại sao chúng ta cần Khung Công Tác Đại Lý AI?

Các khung công tác đại lý AI đại diện cho một thứ gì đó vượt hơn cả các khung công tác AI thông thường. Chúng được thiết kế để tạo ra các đại lý thông minh có thể tương tác với người dùng, các đại lý khác và môi trường để đạt các mục tiêu cụ thể. Những đại lý này có thể thể hiện hành vi tự chủ, quyết định và thích nghi với điều kiện thay đổi. Hãy xem một số khả năng chính mà các Khung Công Tác Đại Lý AI cung cấp:

- **Hợp tác và Phối hợp Đại lý**: Cho phép tạo nhiều đại lý AI có thể làm việc cùng nhau, giao tiếp và phối hợp để giải quyết các tác vụ phức tạp.
- **Tự động hóa và Quản lý Tác vụ**: Cung cấp cơ chế tự động hóa các quy trình nhiều bước, phân công tác vụ và quản lý tác vụ động giữa các đại lý.
- **Hiểu biết theo ngữ cảnh và Thích nghi**: Trang bị cho các đại lý khả năng hiểu ngữ cảnh, thích nghi với môi trường thay đổi và đưa ra quyết định dựa trên thông tin thời gian thực.

Tóm lại, các đại lý cho phép bạn làm được nhiều hơn, nâng cao tự động hóa lên cấp độ tiếp theo, tạo ra các hệ thống thông minh hơn có thể thích nghi và học hỏi từ môi trường.

## Cách nhanh chóng tạo mẫu, lặp lại và cải thiện khả năng của đại lý?

Đây là một lĩnh vực phát triển nhanh, nhưng có một số điểm chung trong hầu hết các Khung Công Tác Đại Lý AI giúp bạn nhanh chóng tạo mẫu và lặp lại, đó là các thành phần mô-đun, công cụ hợp tác và học tập theo thời gian thực. Hãy tìm hiểu những điều này:

- **Sử dụng các Thành phần Mô-đun**: SDK AI cung cấp các thành phần có sẵn như các liên kết AI và Bộ nhớ, gọi hàm qua ngôn ngữ tự nhiên hoặc plugin mã, mẫu nhắc, và nhiều hơn nữa.
- **Tận dụng các Công cụ Hợp tác**: Thiết kế các đại lý với vai trò và nhiệm vụ cụ thể, cho phép họ kiểm thử và tinh chỉnh các quy trình làm việc hợp tác.
- **Học theo thời gian thực**: Triển khai vòng phản hồi nơi các đại lý học từ các tương tác và điều chỉnh hành vi một cách động.

### Sử dụng các Thành phần Mô-đun

Các SDK như Microsoft Agent Framework cung cấp các thành phần có sẵn như liên kết AI, định nghĩa công cụ và quản lý đại lý.

**Cách nhóm sử dụng**: Các nhóm có thể nhanh chóng lắp ráp các thành phần này để tạo ra nguyên mẫu chức năng mà không cần bắt đầu từ đầu, cho phép thử nghiệm và lặp lại nhanh chóng.

**Cách hoạt động trong thực tế**: Bạn có thể sử dụng một bộ phân tích cú pháp có sẵn để trích xuất thông tin từ đầu vào người dùng, một mô-đun bộ nhớ để lưu trữ và truy xuất dữ liệu, và một bộ tạo nhắc để tương tác với người dùng, tất cả mà không cần xây dựng các thành phần này từ đầu.

**Ví dụ mã**. Hãy xem ví dụ về cách sử dụng Microsoft Agent Framework với `FoundryChatClient` để mô hình phản hồi đầu vào người dùng với việc gọi công cụ:

``` python
# Ví dụ về Framework Microsoft Agent bằng Python

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Định nghĩa một hàm công cụ mẫu để đặt chuyến đi
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
    # Ví dụ đầu ra: Chuyến bay đến New York vào ngày 1 tháng 1 năm 2025 của bạn đã được đặt thành công. Chúc bạn đi đường an toàn! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Những gì bạn có thể thấy từ ví dụ này là cách bạn có thể tận dụng bộ phân tích cú pháp có sẵn để trích xuất thông tin chính từ đầu vào người dùng, như điểm xuất phát, điểm đến và ngày của yêu cầu đặt vé máy bay. Cách tiếp cận mô-đun này giúp bạn tập trung vào logic cao hơn.

### Tận dụng Công cụ Hợp tác

Các khung như Microsoft Agent Framework hỗ trợ việc tạo ra nhiều đại lý làm việc cùng nhau.

**Cách nhóm sử dụng**: Các nhóm có thể thiết kế các đại lý với vai trò và nhiệm vụ nhất định, giúp họ kiểm thử và tinh chỉnh các quy trình làm việc hợp tác và cải thiện hiệu quả hệ thống tổng thể.

**Cách hoạt động trong thực tế**: Bạn có thể tạo nhóm đại lý trong đó mỗi đại lý có chức năng chuyên biệt như thu thập dữ liệu, phân tích hoặc ra quyết định. Các đại lý này có thể giao tiếp và chia sẻ thông tin để đạt mục tiêu chung, như trả lời câu hỏi người dùng hoặc hoàn thành nhiệm vụ.

**Ví dụ mã (Microsoft Agent Framework)**:

```python
# Tạo nhiều tác nhân làm việc cùng nhau sử dụng Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Tác nhân truy xuất dữ liệu
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Tác nhân phân tích dữ liệu
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Chạy các tác nhân theo thứ tự trên một nhiệm vụ
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Điều bạn thấy trong đoạn mã trước là cách tạo tác vụ có nhiều đại lý phối hợp phân tích dữ liệu. Mỗi đại lý thực hiện một chức năng cụ thể, và tác vụ được thực hiện bằng cách phối hợp các đại lý để đạt kết quả mong muốn. Bằng cách tạo các đại lý chuyên trách, bạn có thể nâng cao hiệu quả và hiệu suất tác vụ.

### Học theo thời gian thực

Các khung nâng cao cung cấp khả năng hiểu ngữ cảnh thời gian thực và thích nghi.

**Cách nhóm sử dụng**: Các nhóm có thể triển khai vòng phản hồi nơi các đại lý học từ tương tác và điều chỉnh hành vi một cách động, dẫn đến cải tiến và tinh chỉnh liên tục các khả năng.

**Cách hoạt động trong thực tế**: Các đại lý có thể phân tích phản hồi người dùng, dữ liệu môi trường và kết quả tác vụ để cập nhật cơ sở tri thức, điều chỉnh thuật toán ra quyết định và cải thiện hiệu suất theo thời gian. Quá trình học liên tục này giúp đại lý thích nghi với điều kiện và sở thích người dùng thay đổi, nâng cao hiệu quả hệ thống tổng thể.

## Sự khác biệt giữa Microsoft Agent Framework và Microsoft Foundry Agent Service là gì?

Có nhiều cách so sánh các phương pháp này, nhưng hãy xem một số điểm khác biệt chính về thiết kế, khả năng và trường hợp sử dụng mục tiêu:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework cung cấp một SDK tinh gọn để xây dựng đại lý AI sử dụng `FoundryChatClient`. Nó cho phép các nhà phát triển tạo đại lý tận dụng các mô hình Azure OpenAI với khả năng gọi công cụ tích hợp, quản lý hội thoại, và bảo mật cấp doanh nghiệp qua Azure identity.

**Trường hợp sử dụng**: Xây dựng đại lý AI sẵn sàng cho sản xuất với việc sử dụng công cụ, quy trình nhiều bước, và các kịch bản tích hợp doanh nghiệp.

Dưới đây là một số khái niệm cốt lõi quan trọng của Microsoft Agent Framework:

- **Đại lý**. Một đại lý được tạo thông qua `FoundryChatClient` và cấu hình với tên, hướng dẫn, và công cụ. Đại lý có thể:
  - **Xử lý tin nhắn người dùng** và tạo phản hồi sử dụng mô hình Azure OpenAI.
  - **Tự động gọi công cụ** dựa trên ngữ cảnh hội thoại.
  - **Duy trì trạng thái hội thoại** qua nhiều tương tác.

  Đây là đoạn mã minh họa cách tạo một đại lý:

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

- **Công cụ**. Khung hỗ trợ định nghĩa công cụ dưới dạng các hàm Python mà đại lý có thể gọi tự động. Công cụ được đăng ký khi tạo đại lý:

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

- **Phối hợp đa đại lý**. Bạn có thể tạo nhiều đại lý với các chuyên môn khác nhau và phối hợp công việc của họ:

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

- **Tích hợp Azure Identity**. Khung sử dụng `AzureCliCredential` (hoặc `DefaultAzureCredential`) cho xác thực bảo mật không cần khóa, loại bỏ nhu cầu quản lý trực tiếp các khóa API.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service là một bổ sung gần đây, được giới thiệu tại Microsoft Ignite 2024. Nó cho phép phát triển và triển khai đại lý AI với các mô hình linh hoạt hơn, như gọi trực tiếp các LLM mã nguồn mở như Llama 3, Mistral, và Cohere.

Microsoft Foundry Agent Service cung cấp cơ chế bảo mật doanh nghiệp mạnh mẽ và phương pháp lưu trữ dữ liệu, phù hợp với ứng dụng doanh nghiệp.

Nó hoạt động ngay khi triển khai với Microsoft Agent Framework để xây dựng và triển khai đại lý.

Dịch vụ này hiện đang ở chế độ Public Preview và hỗ trợ Python và C# để xây dựng đại lý.

Sử dụng SDK Python của Microsoft Foundry Agent Service, chúng ta có thể tạo một đại lý với công cụ do người dùng định nghĩa:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Định nghĩa các hàm công cụ
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

### Khái niệm cốt lõi

Microsoft Foundry Agent Service có các khái niệm cốt lõi sau:

- **Đại lý**. Microsoft Foundry Agent Service tích hợp với Microsoft Foundry. Trong Microsoft Foundry, một đại lý AI đóng vai trò như một "microservice" thông minh có thể được sử dụng để trả lời câu hỏi (RAG), thực hiện hành động hoặc tự động hóa hoàn toàn quy trình làm việc. Đại lý đạt được điều này bằng cách kết hợp sức mạnh của các mô hình AI sinh tạo với các công cụ cho phép truy cập và tương tác với các nguồn dữ liệu thực tế. Dưới đây là một ví dụ về đại lý:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    Trong ví dụ này, một đại lý được tạo với mô hình `gpt-4.1-mini`, tên `my-agent` và hướng dẫn `You are helpful agent`. Đại lý được trang bị công cụ và tài nguyên để thực hiện các tác vụ giải thích mã.

- **Luồng và tin nhắn**. Luồng là một khái niệm quan trọng khác. Nó đại diện cho một cuộc hội thoại hoặc tương tác giữa đại lý và người dùng. Luồng có thể được sử dụng để theo dõi tiến trình cuộc hội thoại, lưu trữ thông tin ngữ cảnh và quản lý trạng thái tương tác. Dưới đây là ví dụ về một luồng:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Yêu cầu đại lý thực hiện công việc trên chuỗi
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Lấy và ghi lại tất cả các tin nhắn để xem phản hồi của đại lý
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    Trong đoạn mã trước, một luồng được tạo ra. Sau đó, một tin nhắn được gửi vào luồng. Bằng cách gọi `create_and_process_run`, đại lý được yêu cầu thực hiện công việc trên luồng. Cuối cùng, các tin nhắn được lấy và ghi lại để xem phản hồi của đại lý. Các tin nhắn chỉ ra tiến trình cuộc hội thoại giữa người dùng và đại lý. Cũng cần hiểu rằng các tin nhắn có thể thuộc loại khác nhau như văn bản, hình ảnh hoặc tệp, đó là kết quả công việc của đại lý, ví dụ như một hình ảnh hoặc phản hồi văn bản. Là nhà phát triển, bạn có thể sử dụng thông tin này để xử lý thêm hoặc trình bày cho người dùng.

- **Tích hợp với Microsoft Agent Framework**. Microsoft Foundry Agent Service hoạt động mượt mà với Microsoft Agent Framework, có nghĩa là bạn có thể xây dựng đại lý bằng `FoundryChatClient` và triển khai chúng qua Agent Service cho các kịch bản sản xuất.

**Trường hợp sử dụng**: Microsoft Foundry Agent Service được thiết kế cho các ứng dụng doanh nghiệp yêu cầu triển khai đại lý AI an toàn, có khả năng mở rộng và linh hoạt.

## Sự khác biệt giữa các phương pháp này là gì?
 
Nghe có vẻ như có sự chồng chéo, nhưng có một số điểm khác biệt chính về thiết kế, khả năng và trường hợp sử dụng mục tiêu:
 
- **Microsoft Agent Framework (MAF)**: Là một SDK sẵn sàng cho sản xuất để xây dựng đại lý AI. Nó cung cấp API tinh gọn để tạo đại lý với khả năng gọi công cụ, quản lý hội thoại và tích hợp Azure identity.
- **Microsoft Foundry Agent Service**: Là một nền tảng và dịch vụ triển khai trong Microsoft Foundry dành cho đại lý. Nó cung cấp kết nối tích hợp đến các dịch vụ như Azure OpenAI, Azure AI Search, Bing Search và chạy mã.
 
Vẫn chưa chắc nên chọn cái nào?

### Trường hợp Sử dụng
 
Hãy xem liệu chúng tôi có thể giúp bạn thông qua các trường hợp sử dụng phổ biến:
 
> Hỏi: Tôi đang xây dựng các ứng dụng đại lý AI sản xuất và muốn bắt đầu nhanh chóng
>

>Đáp: Microsoft Agent Framework là lựa chọn tuyệt vời. Nó cung cấp API đơn giản, Pythonic qua `FoundryChatClient` cho phép bạn định nghĩa đại lý với công cụ và hướng dẫn chỉ trong vài dòng mã.

>Hỏi: Tôi cần triển khai cấp doanh nghiệp với các tích hợp Azure như Search và chạy mã
>
>Đáp: Microsoft Foundry Agent Service là phù hợp nhất. Đây là dịch vụ nền tảng cung cấp các khả năng tích hợp sẵn cho nhiều mô hình, Azure AI Search, Bing Search và Azure Functions. Nó giúp bạn xây dựng đại lý trong Foundry Portal và triển khai ở quy mô lớn dễ dàng.
 
> Hỏi: Tôi vẫn bối rối, chỉ cho tôi một lựa chọn
>
> Đáp: Bắt đầu với Microsoft Agent Framework để xây dựng đại lý, rồi sử dụng Microsoft Foundry Agent Service khi bạn cần triển khai và mở rộng chúng trong sản xuất. Cách tiếp cận này giúp bạn lặp lại nhanh logic đại lý đồng thời có lộ trình rõ ràng cho triển khai doanh nghiệp.
 
Hãy tóm tắt các điểm khác biệt chính trong bảng sau:

| Khung Công Tác | Trọng tâm | Khái niệm Cốt lõi | Trường hợp Sử Dụng |
| --- | --- | --- | --- |
| Microsoft Agent Framework | SDK đại lý tinh gọn với gọi công cụ | Đại lý, Công cụ, Azure Identity | Xây dựng đại lý AI, sử dụng công cụ, quy trình nhiều bước |
| Microsoft Foundry Agent Service | Mô hình linh hoạt, bảo mật doanh nghiệp, Tạo mã, Gọi công cụ | Mô-đun, Hợp tác, Điều phối quy trình | Triển khai đại lý AI an toàn, mở rộng và linh hoạt |

## Tôi có thể tích hợp trực tiếp các công cụ hệ sinh thái Azure hiện có của mình hay tôi cần các giải pháp độc lập?


Câu trả lời là có, bạn có thể tích hợp các công cụ hệ sinh thái Azure hiện có của mình trực tiếp với Dịch vụ Microsoft Foundry Agent đặc biệt, vì nó được xây dựng để hoạt động liền mạch với các dịch vụ Azure khác. Ví dụ, bạn có thể tích hợp Bing, Azure AI Search và Azure Functions. Cũng có tích hợp sâu với Microsoft Foundry.

Microsoft Agent Framework cũng tích hợp với các dịch vụ Azure thông qua `FoundryChatClient` và nhận diện Azure, cho phép bạn gọi các dịch vụ Azure trực tiếp từ công cụ agent của mình.

## Mã mẫu

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Có Thêm Câu Hỏi về AI Agent Frameworks?

Tham gia [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) để gặp gỡ các học viên khác, tham dự giờ làm việc và nhận câu trả lời cho các câu hỏi về AI Agents của bạn.

## Tài liệu Tham khảo

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Dịch vụ Azure Agent</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Bài Học Trước

[Giới thiệu về AI Agents và Các Trường Hợp Sử Dụng Agent](../01-intro-to-ai-agents/README.md)

## Bài Học Tiếp Theo

[Hiểu về Các Mẫu Thiết Kế Agentic](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->