# 🎯 使用 Azure OpenAI（响应 API）（.NET）的规划与设计模式

## 📋 学习目标

本笔记本演示了使用 Microsoft Agent Framework 和 Azure OpenAI（响应 API）在 .NET 中构建智能代理的企业级规划与设计模式。您将学习如何创建能够分解复杂问题、规划多步骤解决方案并利用 .NET 的企业功能执行复杂工作流程的代理。

## ⚙️ 前提条件与设置

**开发环境：**
- .NET 9.0 SDK 或更高版本
- Visual Studio 2022 或带有 C# 扩展的 VS Code
- 带有 Azure OpenAI 资源和模型部署的 Azure 订阅
- Azure CLI — 使用 `az login` 登录

**所需依赖项：**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**环境配置（.env 文件）：**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## 运行代码

本课程包含一个 .NET 单文件应用程序实现。运行方式如下：

```bash
# 使文件可执行（Linux/macOS）
chmod +x 07-dotnet-agent-framework.cs

# 运行应用程序
./07-dotnet-agent-framework.cs
```

或使用 dotnet run 命令：

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## 代码实现

完整实现可在 `07-dotnet-agent-framework.cs` 中找到，演示了：

- 使用 DotNetEnv 加载环境配置
- 配置 Azure OpenAI 客户端并使用 `GetChatClient().AsAIAgent()` 创建 AI 代理
- 定义带 JSON 序列化的结构化数据模型（Plan 和 TravelPlan）
- 使用 JSON 模式创建具有结构化输出的 AI 代理
- 使用类型安全响应执行规划请求

## 关键概念

### 使用类型安全模型进行结构化规划

代理使用 C# 类定义规划输出的结构：

```csharp
public class Plan
{
    [JsonPropertyName("assigned_agent")]
    public string? Assigned_agent { get; set; }

    [JsonPropertyName("task_details")]
    public string? Task_details { get; set; }
}

public class TravelPlan
{
    [JsonPropertyName("main_task")]
    public string? Main_task { get; set; }

    [JsonPropertyName("subtasks")]
    public IList<Plan> Subtasks { get; set; }
}
```

### 结构化输出的 JSON 模式

代理被配置为返回符合 TravelPlan 模式的响应：

```csharp
ChatClientAgentOptions agentOptions = new()
{
    Name = AGENT_NAME,
    Description = AGENT_INSTRUCTIONS,
    ChatOptions = new()
    {
        ResponseFormat = ChatResponseFormatJson.ForJsonSchema(
            schema: AIJsonUtilities.CreateJsonSchema(typeof(TravelPlan)),
            schemaName: "TravelPlan",
            schemaDescription: "Travel Plan with main_task and subtasks")
    }
};
```

### 规划代理说明

代理充当协调者，将任务分配给专业子代理：

- FlightBooking：负责预订航班和提供航班信息
- HotelBooking：负责预订酒店和提供酒店信息
- CarRental：负责预订汽车和提供汽车租赁信息
- ActivitiesBooking：负责预订活动和提供活动信息
- DestinationInfo：负责提供目的地信息
- DefaultAgent：负责处理通用请求

## 预期输出

当您运行带有旅行规划请求的代理时，它将分析请求并生成符合 TravelPlan 模式的结构化计划，以及适当的任务分配给专业代理，格式为 JSON。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->