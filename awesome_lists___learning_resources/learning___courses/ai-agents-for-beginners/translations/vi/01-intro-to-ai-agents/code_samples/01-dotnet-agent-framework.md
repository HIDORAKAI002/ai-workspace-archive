# 🌍 Đại lý Du lịch AI với Microsoft Agent Framework (.NET)

## 📋 Tổng quan Kịch bản

Ví dụ này minh họa cách xây dựng một đại lý lập kế hoạch du lịch thông minh sử dụng Microsoft Agent Framework cho .NET. Đại lý này có thể tự động tạo lịch trình chuyến đi theo ngày được cá nhân hóa cho các điểm đến ngẫu nhiên trên khắp thế giới.

### Các Năng lực Chính:

- 🎲 **Chọn điểm đến ngẫu nhiên**: Sử dụng công cụ tùy chỉnh để chọn các điểm nghỉ dưỡng
- 🗺️ **Lập kế hoạch chuyến đi thông minh**: Tạo lịch trình chi tiết theo từng ngày
- 🔄 **Phát trực tiếp thời gian thực**: Hỗ trợ cả phản hồi ngay lập tức và phản hồi theo luồng
- 🛠️ **Tích hợp công cụ tùy chỉnh**: Minh họa cách mở rộng khả năng của đại lý

## 🔧 Kiến trúc Kỹ thuật

### Công nghệ cốt lõi

- **Microsoft Agent Framework**: Triển khai .NET mới nhất cho phát triển đại lý AI
- **Azure OpenAI (Responses API)**: Sử dụng API Azure OpenAI Responses cho suy luận mô hình
- **Azure Identity**: Đăng nhập bảo mật qua `AzureCliCredential` (`az login`)
- **Cấu hình Bảo mật**: Quản lý điểm cuối dựa trên môi trường

### Thành phần chính

1. **AIAgent**: Trình điều phối đại lý chính xử lý luồng cuộc trò chuyện
2. **Công cụ Tùy chỉnh**: Hàm `GetRandomDestination()` có sẵn cho đại lý
3. **Clients Responses**: Giao diện trò chuyện dựa trên Azure OpenAI Responses
4. **Hỗ trợ Phát trực tiếp**: Khả năng tạo phản hồi thời gian thực

### Mẫu Tích hợp

```mermaid
graph LR
    A[Yêu Cầu Người Dùng] --> B[Tác nhân AI]
    B --> C[Azure OpenAI (API Phản hồi)]
    B --> D[Công cụ GetRandomDestination]
    C --> E[Lịch Trình Du Lịch]
    D --> E
```

## 🚀 Bắt đầu

### Yêu cầu trước

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) hoặc cao hơn
- Một [đăng ký Azure](https://azure.microsoft.com/free/) với tài nguyên Azure OpenAI và triển khai mô hình
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — đăng nhập với `az login`

### Biến Môi trường Cần thiết

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Sau đó đăng nhập để AzureCliCredential có thể lấy token
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Sau đó đăng nhập để AzureCliCredential có thể lấy được token
az login
```

### Mẫu Mã

Để chạy ví dụ mã,

```bash
# zsh/bash
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

Hoặc sử dụng dotnet CLI:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

Xem [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) để xem mã đầy đủ.

```csharp
#!/usr/bin/dotnet run

#:package Microsoft.Extensions.AI@10.4.1
#:package Microsoft.Agents.AI.OpenAI@1.1.0
#:package Azure.AI.OpenAI@2.1.0
#:package Azure.Identity@1.13.1

using System.ComponentModel;

using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

using Azure.AI.OpenAI;
using Azure.Identity;

// Tool Function: Random Destination Generator
// This static method will be available to the agent as a callable tool
// The [Description] attribute helps the AI understand when to use this function
// This demonstrates how to create custom tools for AI agents
[Description("Provides a random vacation destination.")]
static string GetRandomDestination()
{
    // List of popular vacation destinations around the world
    // The agent will randomly select from these options
    var destinations = new List<string>
    {
        "Paris, France",
        "Tokyo, Japan",
        "New York City, USA",
        "Sydney, Australia",
        "Rome, Italy",
        "Barcelona, Spain",
        "Cape Town, South Africa",
        "Rio de Janeiro, Brazil",
        "Bangkok, Thailand",
        "Vancouver, Canada"
    };

    // Generate random index and return selected destination
    // Uses System.Random for simple random selection
    var random = new Random();
    int index = random.Next(destinations.Count);
    return destinations[index];
}

// Azure OpenAI with the Responses API (stable v1 endpoint). Sign in with `az login`.
var azureEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deployment = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT") ?? "gpt-4.1-mini";

var azureClient = new AzureOpenAIClient(new Uri(azureEndpoint), new AzureCliCredential());

// Create AI Agent with Travel Planning Capabilities
// Get the Responses client for the specified deployment and create the AI agent
// Configure agent with travel planning instructions and random destination tool
// The agent can now plan trips using the GetRandomDestination function
AIAgent agent = azureClient
    .GetChatClient(deployment)
    .AsAIAgent(
        instructions: "You are a helpful AI Agent that can help plan vacations for customers at random destinations",
        tools: [AIFunctionFactory.Create(GetRandomDestination)]
    );

// Execute Agent: Plan a Day Trip
// Run the agent with streaming enabled for real-time response display
// Shows the agent's thinking and response as it generates the content
// Provides better user experience with immediate feedback
await foreach (var update in agent.RunStreamingAsync("Plan me a day trip"))
{
    await Task.Delay(10);
    Console.Write(update);
}
```

## 🎓 Nhận định chính

1. **Kiến trúc Đại lý**: Microsoft Agent Framework cung cấp cách tiếp cận rõ ràng, an toàn kiểu để xây dựng đại lý AI trong .NET
2. **Tích hợp Công cụ**: Hàm được đánh dấu `[Description]` trở thành công cụ có sẵn cho đại lý
3. **Quản lý Cấu hình**: Biến môi trường và xử lý thông tin xác thực an toàn theo chuẩn tốt nhất .NET
4. **Azure OpenAI Responses API**: Đại lý sử dụng Azure OpenAI Responses API thông qua SDK Azure.AI.OpenAI

## 🔗 Tài nguyên Bổ sung

- [Tài liệu Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI trong Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [Ứng dụng .NET Single File](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->