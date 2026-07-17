> [KHÔNG KHUYẾN KHÍCH SỬ DỤNG: 2026-07-28 BẢN PHÁT HÀNH ỨNG CỬ](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Lấy mẫu trong Model Context Protocol

> **Thông báo ngừng hỗ trợ:** bản ứng cử đặc tả MCP `2026-07-28` đánh dấu Lấy mẫu là không được ưu tiên nữa nhằm chuyển sang tích hợp trực tiếp với API nhà cung cấp LLM. Lấy mẫu vẫn hoạt động trong `2025-11-25` và ít nhất một năm sau bất kỳ ngừng hỗ trợ chính thức nào, vì vậy mọi thứ trong bài học này vẫn còn hiệu lực - nhưng thiết kế máy chủ mới nên đánh giá mẫu thay thế. Xem [Những thay đổi trong MCP: Bản phát hành ứng cử 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Lấy mẫu là một tính năng mạnh mẽ của MCP cho phép máy chủ yêu cầu các hoàn thành của LLM thông qua khách hàng, tạo điều kiện cho các hành vi tác nhân tinh vi trong khi duy trì bảo mật và quyền riêng tư. Cấu hình lấy mẫu phù hợp có thể cải thiện đáng kể chất lượng phản hồi và hiệu suất. MCP cung cấp một cách chuẩn hóa để kiểm soát cách mô hình tạo ra văn bản với các tham số cụ thể ảnh hưởng đến tính ngẫu nhiên, sáng tạo, và tính mạch lạc.

## Giới thiệu

Trong bài học này, chúng ta sẽ khám phá cách cấu hình các tham số lấy mẫu trong các yêu cầu MCP và hiểu các cơ chế giao thức nền tảng của lấy mẫu.

## Mục tiêu học tập

Đến cuối bài học, bạn sẽ có khả năng:

- Hiểu các tham số lấy mẫu chính có trong MCP.
- Cấu hình các tham số lấy mẫu cho các trường hợp sử dụng khác nhau.
- Triển khai lấy mẫu xác định để có kết quả có thể tái tạo.
- Điều chỉnh tham số lấy mẫu một cách động dựa trên bối cảnh và sở thích người dùng.
- Áp dụng các chiến lược lấy mẫu để nâng cao hiệu suất mô hình trong nhiều kịch bản.
- Hiểu cách lấy mẫu hoạt động trong luồng khách-hàng máy chủ của MCP.

## Cách hoạt động của Lấy mẫu trong MCP

Luồng lấy mẫu trong MCP theo các bước sau:

1. Máy chủ gửi yêu cầu `sampling/createMessage` đến khách hàng
2. Khách hàng xem xét yêu cầu và có thể sửa đổi nó
3. Khách hàng lấy mẫu từ LLM
4. Khách hàng xem lại kết quả hoàn thành
5. Khách hàng trả kết quả về máy chủ

Thiết kế có sự can thiệp của con người này đảm bảo người dùng duy trì quyền kiểm soát những gì LLM nhìn thấy và tạo ra.

## Tổng quan về các Tham số Lấy mẫu

MCP định nghĩa các tham số lấy mẫu sau có thể cấu hình trong các yêu cầu của khách hàng:

| Tham số | Mô tả | Phạm vi điển hình |
|-----------|-------------|---------------|
| `temperature` | Kiểm soát tính ngẫu nhiên trong lựa chọn token | 0.0 - 1.0 |
| `maxTokens` | Số lượng token tối đa để tạo ra | Giá trị nguyên |
| `stopSequences` | Các chuỗi tùy chỉnh dừng sinh khi gặp phải | Mảng các chuỗi |
| `metadata` | Tham số bổ sung đặc thù nhà cung cấp | Đối tượng JSON |

Nhiều nhà cung cấp LLM hỗ trợ các tham số bổ sung thông qua trường `metadata`, có thể bao gồm:

| Tham số Mở rộng Thông dụng | Mô tả | Phạm vi điển hình |
|-----------|-------------|---------------|
| `top_p` | Lấy mẫu hạt nhân - giới hạn token vào xác suất tích lũy hàng đầu | 0.0 - 1.0 |
| `top_k` | Giới hạn lựa chọn token chỉ vào top K lựa chọn | 1 - 100 |
| `presence_penalty` | Phạt token dựa trên sự xuất hiện của nó trong văn bản hiện tại | -2.0 - 2.0 |
| `frequency_penalty` | Phạt token dựa trên tần suất xuất hiện trong văn bản hiện tại | -2.0 - 2.0 |
| `seed` | Hạt ngẫu nhiên cố định để tái tạo kết quả | Giá trị nguyên |

## Ví dụ Định dạng Yêu cầu

Dưới đây là ví dụ yêu cầu lấy mẫu từ khách hàng trong MCP:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## Định dạng Phản hồi

Khách hàng trả về một kết quả hoàn thành:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## Kiểm soát con người trong vòng lặp

MCP lấy mẫu được thiết kế với sự giám sát của con người:

- **Đối với lời nhắc**:
  - Khách hàng nên hiển thị lời nhắc đề xuất cho người dùng
  - Người dùng nên có khả năng sửa đổi hoặc từ chối lời nhắc
  - Lời nhắc hệ thống có thể được lọc hoặc sửa đổi
  - Việc đưa ngữ cảnh được kiểm soát bởi khách hàng

- **Đối với kết quả hoàn thành**:
  - Khách hàng nên hiển thị kết quả hoàn thành cho người dùng
  - Người dùng nên có khả năng sửa đổi hoặc từ chối kết quả hoàn thành
  - Khách hàng có thể lọc hoặc sửa đổi kết quả hoàn thành
  - Người dùng kiểm soát mô hình được sử dụng

Với các nguyên tắc này, hãy cùng xem cách triển khai lấy mẫu trong các ngôn ngữ lập trình khác nhau, tập trung vào các tham số được nhiều nhà cung cấp LLM hỗ trợ.

## Các cân nhắc về bảo mật

Khi triển khai lấy mẫu trong MCP, xem xét các thực hành bảo mật tốt sau:

- **Xác thực toàn bộ nội dung tin nhắn** trước khi gửi cho khách hàng
- **Làm sạch thông tin nhạy cảm** khỏi lời nhắc và kết quả
- **Triển khai giới hạn tốc độ** để ngăn chặn lạm dụng
- **Giám sát việc sử dụng lấy mẫu** để phát hiện các mẫu bất thường
- **Mã hóa dữ liệu khi truyền** bằng các giao thức an toàn
- **Xử lý quyền riêng tư dữ liệu người dùng** theo các quy định liên quan
- **Kiểm tra yêu cầu lấy mẫu** về tuân thủ và bảo mật
- **Kiểm soát chi phí phơi bày** với giới hạn phù hợp
- **Thực hiện thời gian chờ** cho các yêu cầu lấy mẫu
- **Xử lý lỗi mô hình một cách nhẹ nhàng** với các phương án dự phòng phù hợp

Các tham số lấy mẫu cho phép điều chỉnh hành vi của mô hình ngôn ngữ để đạt được sự cân bằng mong muốn giữa đầu ra xác định và sáng tạo.

Hãy cùng xem cách cấu hình các tham số này trong các ngôn ngữ lập trình khác nhau.

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

Trong đoạn mã trước, chúng ta đã:

- Tạo một khách hàng MCP với URL máy chủ cụ thể.
- Cấu hình một yêu cầu với các tham số lấy mẫu như `temperature`, `top_p`, và `top_k`.
- Gửi yêu cầu và in ra văn bản được tạo.
- Đã sử dụng:
    - `allowedTools` để chỉ định các công cụ mà mô hình có thể sử dụng trong quá trình tạo văn bản. Trong trường hợp này, chúng ta cho phép công cụ `ideaGenerator` và `marketAnalyzer` hỗ trợ tạo ý tưởng ứng dụng sáng tạo.
    - `frequencyPenalty` và `presencePenalty` để kiểm soát sự lặp lại và đa dạng trong kết quả.
    - `temperature` để kiểm soát tính ngẫu nhiên của đầu ra, giá trị cao hơn dẫn đến phản hồi sáng tạo hơn.
    - `top_p` để giới hạn lựa chọn token vào những token góp phần vào xác suất tích lũy hàng đầu, nâng cao chất lượng văn bản tạo ra.
    - `top_k` để hạn chế mô hình chỉ chọn trong top K token có xác suất cao nhất, giúp tạo các phản hồi mạch lạc hơn.
    - `frequencyPenalty` và `presencePenalty` để giảm trùng lặp và khuyến khích đa dạng trong văn bản sinh ra.

# [JavaScript](#tab/javascript)

```javascript
// Ví dụ JavaScript: Cấu hình nhiệt độ và lấy mẫu Top-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Khởi tạo client MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Cấu hình yêu cầu với các tham số lấy mẫu khác nhau
  const creativeSampling = {
    temperature: 0.9,    // Nhiệt độ cao hơn = ngẫu nhiên/sáng tạo hơn
    topP: 0.92,          // Xem xét các token có khối xác suất top 92%
    frequencyPenalty: 0.6, // Giảm lặp lại chuỗi token
    presencePenalty: 0.4   // Phạt các token đã xuất hiện trong văn bản cho đến nay
  };
  
  const factualSampling = {
    temperature: 0.2,    // Nhiệt độ thấp hơn = xác định hơn/dựa trên sự thật hơn
    topP: 0.85,          // Lựa chọn token tập trung hơn một chút
    frequencyPenalty: 0.2, // Hình phạt lặp lại tối thiểu
    presencePenalty: 0.1   // Hình phạt hiện diện tối thiểu
  };
  
  try {
    // Gửi hai yêu cầu với các cấu hình lấy mẫu khác nhau
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

Trong đoạn mã trước, chúng ta đã:

- Khởi tạo một khách hàng MCP với URL máy chủ và khóa API.
- Cấu hình hai bộ tham số lấy mẫu: một cho các tác vụ sáng tạo và một cho các tác vụ thực tế.
- Gửi các yêu cầu với các cấu hình này, cho phép mô hình sử dụng các công cụ cụ thể cho từng tác vụ.
- In các phản hồi được tạo ra để trình bày hiệu quả của các tham số lấy mẫu khác nhau.
- Đã sử dụng `allowedTools` để chỉ định công cụ mà mô hình có thể sử dụng trong quá trình tạo văn bản. Ở đây, chúng ta cho phép công cụ `ideaGenerator` và `environmentalImpactTool` cho các tác vụ sáng tạo, và `factChecker` cùng `dataAnalysisTool` cho các tác vụ thực tế.
- Sử dụng `temperature` để kiểm soát tính ngẫu nhiên của đầu ra, giá trị cao hơn cho phản hồi sáng tạo hơn.
- Sử dụng `top_p` để giới hạn lựa chọn token vào các token góp phần vào xác suất tích lũy hàng đầu, nâng cao chất lượng văn bản tạo ra.
- Sử dụng `frequencyPenalty` và `presencePenalty` để giảm trùng lặp và khuyến khích đa dạng.
- Sử dụng `top_k` để giới hạn mô hình chỉ chọn trong top K token có xác suất cao nhất, giúp tạo phản hồi mạch lạc hơn.

---

## Lấy mẫu xác định

Đối với các ứng dụng cần đầu ra nhất quán, lấy mẫu xác định đảm bảo kết quả có thể tái tạo. Cách làm là sử dụng hạt ngẫu nhiên cố định và đặt tham số temperature bằng 0.

Hãy xem ví dụ triển khai dưới đây để chứng minh lấy mẫu xác định trong các ngôn ngữ lập trình khác nhau.

# [Java](#tab/java)

```java
// Ví dụ Java: Phản hồi xác định với hạt giống cố định
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Sử dụng hạt giống cố định cho kết quả xác định
        
        // Yêu cầu đầu tiên với hạt giống cố định
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nhiệt độ bằng không để đạt độ xác định tối đa
            .build();
            
        // Yêu cầu thứ hai với cùng hạt giống
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Thực thi cả hai yêu cầu
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Phản hồi nên giống hệt nhau do cùng hạt giống và nhiệt độ=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Trong đoạn mã trước, chúng ta đã:

- Tạo một khách hàng MCP với URL máy chủ được chỉ định.
- Cấu hình hai yêu cầu với cùng một lời nhắc, hạt ngẫu nhiên cố định và nhiệt độ bằng 0.
- Gửi cả hai yêu cầu và in ra văn bản tạo ra.
- Minh họa rằng các phản hồi giống hệt nhau do tính chất xác định của cấu hình lấy mẫu (cùng hạt và temperature).
- Sử dụng `setSeed` để chỉ định hạt ngẫu nhiên cố định, đảm bảo mô hình tạo ra đầu ra giống nhau cho cùng một đầu vào mỗi lần.
- Đặt `temperature` bằng 0 để đảm bảo tối đa tính xác định, nghĩa là mô hình luôn chọn token khả thi nhất kế tiếp mà không có ngẫu nhiên.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Ví dụ JavaScript: Phản hồi xác định với điều khiển seed
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Yêu cầu đầu tiên với seed cố định
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Nhiệt độ bằng 0 để đạt tính xác định tối đa
    });
    
    // Yêu cầu thứ hai với cùng seed và nhiệt độ
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Yêu cầu thứ ba với seed khác nhưng cùng nhiệt độ
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

Trong đoạn mã trước, chúng ta đã:

- Khởi tạo một khách hàng MCP với URL máy chủ.
- Cấu hình hai yêu cầu với cùng một lời nhắc, hạt ngẫu nhiên cố định và nhiệt độ bằng 0.
- Gửi cả hai yêu cầu và in ra văn bản tạo ra.
- Minh họa rằng các phản hồi giống hệt nhau do tính xác định của cấu hình lấy mẫu (cùng hạt và temperature).
- Sử dụng `seed` để chỉ định hạt ngẫu nhiên cố định, đảm bảo mô hình tạo ra đầu ra giống nhau cho cùng một đầu vào mỗi lần.
- Đặt `temperature` bằng 0 để đảm bảo tối đa tính xác định, nghĩa là mô hình luôn chọn token khả thi nhất kế tiếp mà không có ngẫu nhiên.
- Sử dụng một hạt khác cho yêu cầu thứ ba để minh họa rằng thay đổi hạt dẫn đến đầu ra khác nhau, ngay cả với cùng lời nhắc và nhiệt độ.

---

## Cấu hình Lấy mẫu Động

Lấy mẫu thông minh điều chỉnh các tham số dựa trên bối cảnh và yêu cầu của mỗi yêu cầu. Điều đó có nghĩa là điều chỉnh động các tham số như temperature, top_p, và các hình phạt dựa trên loại tác vụ, sở thích người dùng, hoặc hiệu suất lịch sử.

Hãy xem cách triển khai lấy mẫu động trong các ngôn ngữ lập trình khác nhau.

# [Python](#tab/python)

```python
# Ví dụ Python: Lấy mẫu động dựa trên ngữ cảnh yêu cầu
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Định nghĩa các mẫu thiết lập trước cho các loại nhiệm vụ khác nhau
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Chọn mẫu thiết lập cơ bản
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Điều chỉnh dựa trên sở thích người dùng nếu có
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Thay đổi nhiệt độ dựa trên sở thích sáng tạo (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Điều chỉnh top_p dựa trên mức độ đa dạng câu trả lời mong muốn
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Tạo và gửi yêu cầu với các tham số lấy mẫu tùy chỉnh
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Trả về phản hồi cùng với siêu dữ liệu lấy mẫu để minh bạch thông tin
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Trong đoạn mã trước, chúng ta đã:

- Tạo lớp `DynamicSamplingService` quản lý lấy mẫu thích ứng.
- Định nghĩa các thiết lập lấy mẫu cho các loại tác vụ khác nhau (sáng tạo, thực tế, mã, phân tích).
- Chọn một thiết lập lấy mẫu cơ bản dựa trên loại tác vụ.
- Điều chỉnh các tham số lấy mẫu dựa trên sở thích người dùng, chẳng hạn mức độ sáng tạo và đa dạng.
- Gửi yêu cầu với các tham số lấy mẫu được cấu hình động.
- Trả về văn bản tạo ra cùng với các tham số lấy mẫu áp dụng và loại tác vụ để minh bạch.
- Sử dụng `temperature` để kiểm soát tính ngẫu nhiên của đầu ra, giá trị cao hơn dẫn đến phản hồi sáng tạo hơn.
- Sử dụng `top_p` để giới hạn lựa chọn token vào các token góp phần vào xác suất tích lũy hàng đầu, nâng cao chất lượng văn bản tạo ra.
- Sử dụng `frequency_penalty` để giảm trùng lặp và khuyến khích đa dạng trong đầu ra.
- Sử dụng `user_preferences` cho phép tùy chỉnh các tham số lấy mẫu dựa trên mức độ sáng tạo và đa dạng do người dùng xác định.
- Sử dụng `task_type` để xác định chiến lược lấy mẫu thích hợp cho yêu cầu, cho phép tạo ra phản hồi phù hợp hơn dựa trên bản chất nhiệm vụ.
- Sử dụng phương thức `send_request` để gửi lời nhắc với các tham số lấy mẫu đã cấu hình, đảm bảo mô hình tạo văn bản theo yêu cầu đã chỉ định.
- Sử dụng `generated_text` để lấy phản hồi của mô hình, rồi trả về cùng các tham số lấy mẫu và loại tác vụ để phân tích hoặc hiển thị thêm.
- Sử dụng các hàm `min` và `max` để đảm bảo sở thích người dùng được giới hạn trong phạm vi hợp lệ, ngăn cấu hình lấy mẫu không hợp lệ.

# [JavaScript Động](#tab/javascript-dynamic)

```javascript
// Ví dụ JavaScript: Cấu hình lấy mẫu động dựa trên ngữ cảnh người dùng
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Định nghĩa hồ sơ lấy mẫu cơ bản
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Theo dõi hiệu suất lịch sử
    this.performanceHistory = [];
  }
  
  // Phát hiện loại tác vụ từ lời nhắc
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Phát hiện đơn giản theo quy tắc - có thể cải thiện bằng phân loại ML
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // Mặc định chuyển sang hội thoại nếu không phát hiện rõ loại
    return 'conversational';
  }
  
  // Tính toán tham số lấy mẫu dựa trên ngữ cảnh và sở thích người dùng
  getSamplingParameters(prompt, context = {}) {
    // Phát hiện loại tác vụ
    const taskType = this.detectTaskType(prompt, context);
    
    // Lấy hồ sơ cơ bản
    let params = {...this.samplingProfiles[taskType]};
    
    // Điều chỉnh dựa trên sở thích người dùng
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Tỉ lệ từ 1-10 sang khoảng nhiệt độ phù hợp
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Độ chính xác cao hơn có nghĩa là topP thấp hơn (lựa chọn tập trung hơn)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Độ nhất quán cao hơn nghĩa là ít hình phạt hơn
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Áp dụng điều chỉnh đã học từ lịch sử hiệu suất
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Logic thích ứng đơn giản - có thể cải thiện với thuật toán tinh vi hơn
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Chỉ xem xét lịch sử gần đây
    
    if (relevantHistory.length > 0) {
      // Tính điểm hiệu suất trung bình
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Nếu hiệu suất dưới ngưỡng, điều chỉnh tham số
      if (avgScore < 0.7) {
        // Điều chỉnh nhẹ về giá trị an toàn hơn
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Ghi lại hiệu suất để điều chỉnh trong tương lai
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Đánh giá 0-1 về chất lượng phản hồi
    });
    
    // Giới hạn kích thước lịch sử
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Lấy tham số lấy mẫu tối ưu
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Gửi yêu cầu với tham số tối ưu
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Nếu người dùng cung cấp phản hồi, ghi lại để tối ưu hóa sau
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// Ví dụ sử dụng
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Tác vụ sáng tạo với sở thích người dùng tùy chỉnh
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Độ sáng tạo cao (1-10)
          consistency: 3  // Độ nhất quán thấp (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Tác vụ tạo mã
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Độ sáng tạo thấp
          precision: 8,   // Độ chính xác cao
          consistency: 9  // Độ nhất quán cao
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

Trong đoạn mã trước, chúng ta đã:

- Tạo lớp `AdaptiveSamplingManager` quản lý lấy mẫu động dựa trên loại tác vụ và sở thích người dùng.
- Định nghĩa các hồ sơ lấy mẫu cho các loại tác vụ khác nhau (sáng tạo, thực tế, mã, hội thoại).
- Triển khai phương pháp để phát hiện loại tác vụ từ lời nhắc sử dụng các quy tắc đơn giản.
- Tính toán các tham số lấy mẫu dựa trên loại tác vụ phát hiện được và sở thích người dùng.
- Áp dụng các điều chỉnh học được dựa trên hiệu suất lịch sử để tối ưu tham số lấy mẫu.
- Ghi lại hiệu suất để điều chỉnh trong tương lai, cho phép hệ thống học hỏi từ các tương tác trước.
- Gửi yêu cầu với các tham số lấy mẫu cấu hình động và trả lại văn bản tạo ra cùng các tham số áp dụng và loại tác vụ phát hiện.
- Đã sử dụng:
    - `userPreferences` cho phép tùy chỉnh tham số lấy mẫu dựa trên mức độ sáng tạo, chính xác và nhất quán do người dùng xác định.
    - `detectTaskType` để xác định bản chất tác vụ dựa trên lời nhắc, giúp tạo phản hồi phù hợp hơn.
    - `recordPerformance` để ghi lại hiệu suất của các phản hồi được tạo ra, cho phép hệ thống thích ứng và cải thiện theo thời gian.
    - `applyLearnedAdjustments` để điều chỉnh tham số lấy mẫu dựa trên hiệu suất lịch sử, nâng cao khả năng tạo phản hồi chất lượng của mô hình.
    - `generateResponse` để đóng gói toàn bộ quá trình tạo phản hồi với lấy mẫu thích ứng, giúp gọi dễ dàng với các lời nhắc và bối cảnh khác nhau.
    - `allowedTools` để chỉ định các công cụ mô hình có thể sử dụng khi tạo văn bản, giúp tạo các phản hồi có ngữ cảnh hơn.
    - `feedbackScore` để cho phép người dùng cung cấp phản hồi về chất lượng phản hồi được tạo ra, có thể dùng để tinh chỉnh hiệu suất mô hình theo thời gian.
    - `performanceHistory` để duy trì hồ sơ các tương tác trước đây, cho phép hệ thống học hỏi từ thành công và thất bại trước đó.
    - `getSamplingParameters` để điều chỉnh tham số lấy mẫu động dựa trên bối cảnh yêu cầu, cho phép hành vi mô hình linh hoạt và đáp ứng hơn.
    - `detectTaskType` để phân loại tác vụ dựa trên lời nhắc, giúp hệ thống áp dụng các chiến lược lấy mẫu phù hợp cho các loại yêu cầu khác nhau.
    - `samplingProfiles` để định nghĩa các cấu hình lấy mẫu cơ bản cho từng loại tác vụ, giúp điều chỉnh nhanh chóng dựa trên bản chất yêu cầu.

---

## Tiếp theo là gì

- [5.7 Mở rộng quy mô](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->