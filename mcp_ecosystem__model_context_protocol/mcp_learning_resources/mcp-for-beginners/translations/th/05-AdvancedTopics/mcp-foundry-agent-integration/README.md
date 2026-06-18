# การรวมโปรโตคอลบริบทของโมเดล (MCP) กับ Microsoft Foundry

คำแนะนำนี้แสดงวิธีการรวมเซิร์ฟเวอร์ Model Context Protocol (MCP) กับตัวแทน Microsoft Foundry เพื่อเปิดใช้งานการจัดระเบียบเครื่องมือที่ทรงพลังและความสามารถ AI ระดับองค์กร

## บทนำ

Model Context Protocol (MCP) เป็นมาตรฐานเปิดที่ช่วยให้นำ AI สามารถเชื่อมต่อกับแหล่งข้อมูลภายนอกและเครื่องมือต่างๆ ได้อย่างปลอดภัย เมื่อรวมกับ Microsoft Foundry MCP ช่วยให้ตัวแทนสามารถเข้าถึงและโต้ตอบกับบริการ, API และแหล่งข้อมูลภายนอกในรูปแบบมาตรฐาน

การรวมนี้ผสมผสานความยืดหยุ่นของระบบนิเวศเครื่องมือ MCP กับโครงสร้างตัวแทนที่มั่นคงของ Microsoft Foundry เพื่อมอบโซลูชัน AI ระดับองค์กรที่มีความสามารถในการปรับแต่งอย่างกว้างขวาง

**หมายเหตุ:** หากคุณต้องการใช้ MCP ใน Microsoft Foundry Agent Service ขณะนี้รองรับเฉพาะในภูมิภาคต่อไปนี้: westus, westus2, uaenorth, southindia และ switzerlandnorth

## วัตถุประสงค์การเรียนรู้

เมื่อจบคำแนะนำนี้ คุณจะสามารถ:

- เข้าใจโปรโตคอลบริบทของโมเดลและข้อดีของมัน
- ติดตั้งเซิร์ฟเวอร์ MCP สำหรับใช้งานกับตัวแทน Microsoft Foundry
- สร้างและกำหนดค่าตัวแทนที่รวมเครื่องมือ MCP
- นำตัวอย่างปฏิบัติที่ใช้เซิร์ฟเวอร์ MCP จริงมาใช้
- จัดการการตอบกลับของเครื่องมือและการอ้างอิงในบทสนทนาของตัวแทน

## ข้อกำหนดเบื้องต้น

ก่อนเริ่มต้น กรุณาตรวจสอบว่าคุณมี:

- การสมัครสมาชิก Azure พร้อมการเข้าถึง Microsoft Foundry
- Python 3.10+ หรือ .NET 8.0+
- ติดตั้งและตั้งค่า Azure CLI เรียบร้อยแล้ว
- สิทธิ์ที่เหมาะสมในการสร้างทรัพยากร AI

## โปรโตคอลบริบทของโมเดล (MCP) คืออะไร?

Model Context Protocol เป็นวิธีการมาตรฐานสำหรับแอปพลิเคชัน AI ในการเชื่อมต่อกับแหล่งข้อมูลและเครื่องมือต่างๆ ข้อดีที่สำคัญได้แก่:

- **การรวมที่เป็นมาตรฐาน**: อินเทอร์เฟซที่สอดคล้องกันสำหรับเครื่องมือและบริการหลากหลาย
- **ความปลอดภัย**: กลไกการพิสูจน์ตัวตนและการอนุญาตที่ปลอดภัย
- **ความยืดหยุ่น**: รองรับแหล่งข้อมูล, API และเครื่องมือแบบกำหนดเองหลากหลายประเภท
- **การขยายขอบเขต**: เพิ่มความสามารถและการรวมระบบใหม่ๆ ได้ง่าย

## การตั้งค่า MCP กับ Microsoft Foundry

### การกำหนดค่าสภาพแวดล้อม

เลือกสภาพแวดล้อมการพัฒนาที่คุณต้องการ:

- [การใช้งาน Python](#การใช้งาน-python)
- [การใช้งาน .NET](#codeblock5)

---

## การใช้งาน Python

***หมายเหตุ*** คุณสามารถรัน [notebook](./mcp_support_python.ipynb) นี้ได้

### 1. ติดตั้งแพ็กเกจที่จำเป็น

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. นำเข้าไลบรารี

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. กำหนดค่า MCP

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. เริ่มต้นใช้งาน Project Client

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. สร้างเครื่องมือ MCP

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # ไม่บังคับ: ระบุเครื่องมือที่ได้รับอนุญาต
)
```

### 6. ตัวอย่าง Python สมบูรณ์

```python
with project_client:
    agents_client = project_client.agents

    # สร้างเอเย่นต์ใหม่ด้วยเครื่องมือ MCP
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # สร้างเธรดสำหรับการสื่อสาร
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # สร้างข้อความไปยังเธรด
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # จัดการการอนุมัติเครื่องมือและรันเอเย่นต์
    mcp_tool.update_headers("SuperSecret", "123456")
    run = agents_client.runs.create(thread_id=thread.id, agent_id=agent.id, tool_resources=mcp_tool.resources)
    print(f"Created run, ID: {run.id}")

    while run.status in ["queued", "in_progress", "requires_action"]:
        time.sleep(1)
        run = agents_client.runs.get(thread_id=thread.id, run_id=run.id)

        if run.status == "requires_action" and isinstance(run.required_action, SubmitToolApprovalAction):
            tool_calls = run.required_action.submit_tool_approval.tool_calls
            if not tool_calls:
                print("No tool calls provided - cancelling run")
                agents_client.runs.cancel(thread_id=thread.id, run_id=run.id)
                break

            tool_approvals = []
            for tool_call in tool_calls:
                if isinstance(tool_call, RequiredMcpToolCall):
                    try:
                        print(f"Approving tool call: {tool_call}")
                        tool_approvals.append(
                            ToolApproval(
                                tool_call_id=tool_call.id,
                                approve=True,
                                headers=mcp_tool.headers,
                            )
                        )
                    except Exception as e:
                        print(f"Error approving tool_call {tool_call.id}: {e}")

            if tool_approvals:
                agents_client.runs.submit_tool_outputs(
                    thread_id=thread.id, run_id=run.id, tool_approvals=tool_approvals
                )

        print(f"Current run status: {run.status}")

    print(f"Run completed with status: {run.status}")

    # แสดงการสนทนา
    messages = agents_client.messages.list(thread_id=thread.id)
    print("\nConversation:")
    print("-" * 50)
    for msg in messages:
        if msg.text_messages:
            last_text = msg.text_messages[-1]
            print(f"{msg.role.upper()}: {last_text.text.value}")
            print("-" * 50)
```

---

## การใช้งาน .NET

***หมายเหตุ*** คุณสามารถรัน [notebook](./mcp_support_dotnet.ipynb) นี้ได้

### 1. ติดตั้งแพ็กเกจที่จำเป็น

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. นำเข้าไลบรารี

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. กำหนดค่า

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. สร้างคำนิยามเครื่องมือ MCP

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. สร้างตัวแทนที่ใช้ MCP Tools

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. ตัวอย่าง .NET สมบูรณ์

```csharp
// Create thread and message
PersistentAgentThread thread = await agentClient.Threads.CreateThreadAsync();

PersistentThreadMessage message = await agentClient.Messages.CreateMessageAsync(
    thread.Id,
    MessageRole.User,
    "What's difference between Azure OpenAI and OpenAI?");

// Configure tool resources with headers
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
ToolResources toolResources = mcpToolResource.ToToolResources();

// Create and handle run
ThreadRun run = await agentClient.Runs.CreateRunAsync(thread, agent, toolResources);

while (run.Status == RunStatus.Queued || run.Status == RunStatus.InProgress || run.Status == RunStatus.RequiresAction)
{
    await Task.Delay(TimeSpan.FromMilliseconds(1000));
    run = await agentClient.Runs.GetRunAsync(thread.Id, run.Id);

    if (run.Status == RunStatus.RequiresAction && run.RequiredAction is SubmitToolApprovalAction toolApprovalAction)
    {
        var toolApprovals = new List<ToolApproval>();
        foreach (var toolCall in toolApprovalAction.SubmitToolApproval.ToolCalls)
        {
            if (toolCall is RequiredMcpToolCall mcpToolCall)
            {
                Console.WriteLine($"Approving MCP tool call: {mcpToolCall.Name}");
                toolApprovals.Add(new ToolApproval(mcpToolCall.Id, approve: true)
                {
                    Headers = { ["SuperSecret"] = "123456" }
                });
            }
        }

        if (toolApprovals.Count > 0)
        {
            run = await agentClient.Runs.SubmitToolOutputsToRunAsync(thread.Id, run.Id, toolApprovals: toolApprovals);
        }
    }
}

// Display messages
using Azure;

AsyncPageable<PersistentThreadMessage> messages = agentClient.Messages.GetMessagesAsync(
    threadId: thread.Id,
    order: ListSortOrder.Ascending
);

await foreach (PersistentThreadMessage threadMessage in messages)
{
    Console.Write($"{threadMessage.CreatedAt:yyyy-MM-dd HH:mm:ss} - {threadMessage.Role,10}: ");
    foreach (MessageContent contentItem in threadMessage.ContentItems)
    {
        if (contentItem is MessageTextContent textItem)
        {
            Console.Write(textItem.Text);
        }
        else if (contentItem is MessageImageFileContent imageFileItem)
        {
            Console.Write($"<image from ID: {imageFileItem.FileId}>");
        }
        Console.WriteLine();
    }
}
```

---

## ตัวเลือกการกำหนดค่าเครื่องมือ MCP

เมื่อกำหนดค่าเครื่องมือ MCP สำหรับตัวแทนของคุณ คุณสามารถระบุพารามิเตอร์สำคัญหลายอย่างได้:

### การกำหนดค่า Python

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # ตัวระบุสำหรับเซิร์ฟเวอร์ MCP
    server_url="https://api.example.com/mcp", # จุดสิ้นสุดเซิร์ฟเวอร์ MCP
    allowed_tools=[],                       # ตัวเลือก: ระบุเครื่องมือที่อนุญาตใช้ได้
)
```

### การกำหนดค่า .NET

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## การพิสูจน์ตัวตนและส่วนหัว HTTP

ทั้งสองการใช้งานรองรับส่วนหัวกำหนดเองสำหรับการพิสูจน์ตัวตน:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## การแก้ไขปัญหาที่พบบ่อย

### 1. ปัญหาการเชื่อมต่อ
- ตรวจสอบว่า URL ของเซิร์ฟเวอร์ MCP สามารถเข้าถึงได้
- ตรวจสอบข้อมูลรับรองการพิสูจน์ตัวตน
- ตรวจสอบการเชื่อมต่อเครือข่าย

### 2. การเรียกเครื่องมือไม่สำเร็จ
- ตรวจสอบอาร์กิวเมนต์และรูปแบบของเครื่องมือ
- ตรวจสอบความต้องการเฉพาะของเซิร์ฟเวอร์
- ใช้การจัดการข้อผิดพลาดอย่างเหมาะสม

### 3. ปัญหาด้านประสิทธิภาพ
- ปรับเวลาการเรียกเครื่องมือให้เหมาะสม
- ใช้การแคชเมื่อเหมาะสม
- ติดตามเวลาตอบสนองของเซิร์ฟเวอร์

## ขั้นตอนถัดไป

เพื่อเพิ่มประสิทธิภาพการผสาน MCP ของคุณ:

1. **สำรวจเซิร์ฟเวอร์ MCP แบบกำหนดเอง**: สร้างเซิร์ฟเวอร์ MCP ของคุณเองสำหรับแหล่งข้อมูลเฉพาะ
2. **ใช้ความปลอดภัยขั้นสูง**: เพิ่ม OAuth2 หรือกลไกการพิสูจน์ตัวตนแบบกำหนดเอง
3. **ติดตามและวิเคราะห์**: ใช้การบันทึกและตรวจสอบการใช้งานเครื่องมือ
4. **ปรับขนาดโซลูชันของคุณ**: พิจารณาการโหลดบาลานซ์และโครงสร้างเซิร์ฟเวอร์ MCP แบบกระจาย

## แหล่งข้อมูลเพิ่มเติม

- [เอกสาร Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- [ตัวอย่าง Model Context Protocol](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [ภาพรวมตัวแทน Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [ข้อกำหนด MCP](https://spec.modelcontextprotocol.io/)

## การสนับสนุน

สำหรับการสนับสนุนและคำถามเพิ่มเติม:
- อ่าน [เอกสาร Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- ตรวจสอบ [แหล่งข้อมูลชุมชน MCP](https://modelcontextprotocol.io/)

## สิ่งที่ต้องทำต่อไป

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->