# 🌍 ตัวแทนท่องเที่ยว AI ด้วย Microsoft Agent Framework (.NET)

## 📋 ภาพรวมสถานการณ์

ตัวอย่างนี้แสดงให้เห็นวิธีการสร้างตัวแทนวางแผนการเดินทางอัจฉริยะโดยใช้ Microsoft Agent Framework สำหรับ .NET ตัวแทนสามารถสร้างแผนการเดินทางสำหรับทริปวันเดียวที่ปรับแต่งตามความชอบสำหรับจุดหมายปลายทางสุ่มทั่วโลกโดยอัตโนมัติ

### ความสามารถหลัก:

- 🎲 **การเลือกจุดหมายปลายทางแบบสุ่ม**: ใช้เครื่องมือที่กำหนดเองเพื่อเลือกสถานที่พักผ่อน
- 🗺️ **การวางแผนทริปอัจฉริยะ**: สร้างแผนการเดินทางโดยละเอียดรายวัน
- 🔄 **สตรีมมิ่งแบบเรียลไทม์**: รองรับการตอบสนองทันทีและแบบสตรีมมิ่ง
- 🛠️ **การผนวกเครื่องมือแบบกำหนดเอง**: แสดงวิธีขยายขีดความสามารถของตัวแทน

## 🔧 สถาปัตยกรรมทางเทคนิค

### เทคโนโลยีหลัก

- **Microsoft Agent Framework**: การใช้งาน .NET ล่าสุดสำหรับการพัฒนาตัวแทน AI
- **Azure OpenAI (Responses API)**: ใช้ Azure OpenAI Responses API สำหรับการวิเคราะห์โมเดล
- **Azure Identity**: การลงชื่อเข้าใช้ที่ปลอดภัยผ่าน `AzureCliCredential` (`az login`)
- **การจัดการการตั้งค่าอย่างปลอดภัย**: การจัดการปลายทางตามสภาพแวดล้อม

### ส่วนประกอบหลัก

1. **AIAgent**: ตัวจัดการหลักของตัวแทนที่ควบคุมการไหลของการสนทนา
2. **เครื่องมือกำหนดเอง**: ฟังก์ชัน `GetRandomDestination()` ที่สามารถใช้ได้กับตัวแทน
3. **ไคลเอนต์ Responses**: ส่วนติดต่อการสนทนาที่ใช้ Azure OpenAI Responses
4. **การรองรับสตรีมมิ่ง**: ความสามารถในการสร้างการตอบสนองแบบเรียลไทม์

### แบบแผนการผนวก

```mermaid
graph LR
    A[คำขอของผู้ใช้] --> B[ตัวแทน AI]
    B --> C[Azure OpenAI (API ตอบกลับ)]
    B --> D[เครื่องมือ GetRandomDestination]
    C --> E[แผนการเดินทาง]
    D --> E
```

## 🚀 การเริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) หรือสูงกว่า
- [การสมัครใช้งาน Azure](https://azure.microsoft.com/free/) พร้อมทรัพยากร Azure OpenAI และการปรับใช้โมเดล
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — ลงชื่อเข้าใช้ด้วย `az login`

### ตัวแปรสภาพแวดล้อมที่จำเป็น

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# จากนั้นลงชื่อเข้าใช้เพื่อให้ AzureCliCredential สามารถรับโทเค็นได้
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# จากนั้นลงชื่อเข้าใช้เพื่อให้ AzureCliCredential สามารถรับโทเค็นได้
az login
```

### ตัวอย่างโค้ด

เพื่อรันตัวอย่างโค้ด,

```bash
# zsh/bash
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

หรือใช้ dotnet CLI:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

ดู [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) สำหรับโค้ดเต็มรูปแบบ

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

## 🎓 ประเด็นสำคัญที่ได้รับ

1. **สถาปัตยกรรมตัวแทน**: Microsoft Agent Framework นำเสนอแนวทางที่สะอาดและปลอดภัยด้วยประเภทสำหรับการสร้างตัวแทน AI ใน .NET
2. **การผนวกเครื่องมือ**: ฟังก์ชันที่มีแอตทริบิวต์ `[Description]` จะกลายเป็นเครื่องมือที่ตัวแทนสามารถใช้ได้
3. **การจัดการการตั้งค่า**: ตัวแปรสภาพแวดล้อมและการจัดการข้อมูลรับรองที่ปลอดภัยเป็นไปตามแนวปฏิบัติที่ดีที่สุดของ .NET
4. **Azure OpenAI Responses API**: ตัวแทนใช้ Azure OpenAI Responses API ผ่าน SDK Azure.AI.OpenAI

## 🔗 แหล่งข้อมูลเพิ่มเติม

- [เอกสาร Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI ใน Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [แอปไฟล์เดี่ยว .NET](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->