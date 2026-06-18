# Model Context Protocol (MCP) ကို Microsoft Foundry နှင့် ပေါင်းစပ်ခြင်း

ဤလမ်းညွှန်သည် Model Context Protocol (MCP) ဆာဗာများကို Microsoft Foundry အေးဂျင့်များနှင့် ပေါင်းစပ်၍ အင်မတန်အားကောင်းသော ကိရိယာစီစဉ်ခြင်းနှင့် စီးပွားရေးအဆင့် AI စွမ်းဆောင်ရည်များကို အသုံးပြုနိုင်ရန် ဖော်ပြသည်။

## နိဒါန်း

Model Context Protocol (MCP) သည် AI အက်ပလิเคရှင်းများကို အပြင်အဆင်ဒေတာအရင်းမြစ်များနှင့် ကိရိယာများသို့ လုံခြုံစိတ်ချစွာ ချိတ်ဆက်ပေးသော ဖွင့်လှစ်သော စံချိန်စံညွှန်းတစ်ခုဖြစ်သည်။ Microsoft Foundry နှင့် ပေါင်းစပ်စဉ် MCP သည် အေးဂျင့်များအား အပြင်အဆင်ဝန်ဆောင်မှုများ၊ API များနှင့် ဒေတာအရင်းမြစ်အမျိုးမျိုးကို စံချိန်တင်းစွာ လိုက်လျောညီထွေဖြင့် ဝင်ရောက် ဆက်သွယ် စက်မှုလုပ်ငန်းအသုံး AI ဖြေရှင်းချက်များ ပေးသည်။

ဤပေါင်းစပ်မှုသည် MCP ၏ ကိရိယာ ecosystem ၏ ရွေ့လျားနိုင်သည့် လွတ်လပ်မှုနှင့် Microsoft Foundry ၏ ခိုင်မာသော အေးဂျင့် ဖွဲ့စည်းပုံကို ပေါင်းစပ်စေ၍ စီးပွားရေးအဆင့် AI ဖြေရှင်းချက်များကို ကျယ်ပြန့်စွာ ချိန်ညှိနိုင်မှုများနှင့် ပေးစွမ်းသည်။

**မှတ်ချက်။** Microsoft Foundry Agent Service တွင် MCP ကို အသုံးပြုလိုပါက လက်ရှိတွင် အောက်ပါ ဒေသများသာ ပံ့ပိုးမှု ရှိပါသည်။ westus, westus2, uaenorth, southindia နှင့် switzerlandnorth

## သင်ယူရမည့် ရည်ရွယ်ချက်များ

ဤလမ်းညွှန်ကုန်ဆုံးချိန်တွင် အောက်ပါအရာများကို သိရှိနိုင်ပါမည် -

- Model Context Protocol နှင့် ၎င်း၏ အကျိုးကျေးဇူးများကို နားလည်ခြင်း
- Microsoft Foundry အေးဂျင့်များအတွက် MCP ဆာဗာများကို တပ်ဆင်ခြင်း
- MCP ကိရိယာ ပေါင်းစပ်ခြင်းဖြင့် အေးဂျင့်များဖန်တီးခြင်းနှင့် ဆက်တင်ပြုလုပ်ခြင်း
- အမှန်တကယ် MCP ဆာဗာများကို အသုံးပြု၍ လက်တွေ့ ဥပမာများ အကောင်အထည်ဖော်ခြင်း
- အေးဂျင့်တွေ အတွင်းကိရိယာတုံ့ပြန်မှုများနှင့် ကိုးကားချက်များကို ကိုင်တွယ်ခြင်း

## လိုအပ်ချက်များ

စတင်မတိုင်မီ မဖြစ်မနေရှိရမည့်အရာများမှာ -

- Microsoft Foundry အသုံးပြုခွင့်ပါရှိသော Azure စားသုံးသူ ဖြစ်ရပါမည်
- Python 3.10+ သို့မဟုတ် .NET 8.0+
- Azure CLI တပ်ဆင်ပြီး ပြင်ဆင်ထားရမည်
- AI အရင်းအမြစ်ဖန်တီးခွင့်များ ရရှိထားရမည်

## Model Context Protocol (MCP) ဆိုတာ ဘာလဲ?

Model Context Protocol သည် AI အက်ပလิเคရှင်းများအတွက် အပြင်အဆင်ဒေတာအရင်းမြစ်များနှင့် ကိရိယာများကို ချိတ်ဆက်ရန် စံချိန်စံညွှန်းထားသော နည်းလမ်းတစ်ခုဖြစ်သည်။ အရေးကြီးသော အကျိုးကျေးဇူးများမှာ -

- **စံချိန်တင်းသိပ်သည့် ပေါင်းစပ်မှု** - ကိရိယာများနှင့် ဝန်ဆောင်မှုများ အတူတူ ဂရုတစိုက် ဆက်သွယ်နိုင်ခြင်း
- **လုံခြုံရေး** - လုံခြုံစိတ်ချမှုနှင့် အတည်ပြုခြင်း စနစ်များ
- **ရွေ့လျားနိုင်မှု** - အမျိုးမျိုးသော ဒေတာအရင်းမြစ်များ၊ API များနှင့် ပုံမှန်မဟုတ်သော ကိရိယာများကို ထောက်ပံ့ခြင်း
- **တိုးချဲ့နိုင်မှု** - အသစ်သော စွမ်းအားများနှင့် ပေါင်းစပ်မှုများ လွယ်ကူစွာ ထည့်သွင်းနိုင်ခြင်း

## Microsoft Foundry နှင့် MCP တပ်ဆင်ခြင်း

### ပတ်ဝန်းကျင် သတ်မှတ်ခြင်း

သင့်အားနှစ်သက်ရာ ဖွံ့ဖြိုးရေး ပတ်ဝန်းကျင်ကို ရွေးပါ -

- [Python Implementation](#python-implementation)
- [.NET Implementation](#codeblock5)

---

## Python Implementation

***မှတ်ချက်*** သင်သည် ဤ [notebook](./mcp_support_python.ipynb) ကို လည်ပတ်နိုင်သည်။

### 1. လိုအပ်သော ပါကေ့များ တပ်ဆင်ခြင်း

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. လိုအပ်သော မျက်နှာပြင်များ import ပြုလုပ်ခြင်း

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP ဆက်တင်များ ပြင်ဆင်ခြင်း

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. Project Client စတင်တည်ဆောက်ခြင်း

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP Tool ဖန်တီးခြင်း

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # အလျော့အလလုတ်: ခွင့်ပြုထားသည့်ကိရိယာများကိုသတ်မှတ်ပါ
)
```

### 6. Python နမူနာ ပြည့်စုံ

```python
with project_client:
    agents_client = project_client.agents

    # MCP ကိရိယာများဖြင့် ကိရိယာအသစ်တစ်ခု ဖန်တီးပါ
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # ဆက်သွယ်မှုအတွက် အကြောင်းပြု တာဝတျဖစ် များဖန်တီးပါ
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # တာဝတျသို့ စာတယ်ပို့ပါ
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # ကိရိယာအတည်ပြုချက်များကို ကိုင်တွယ်ပြီး ကိရိယာကို အလုပ်လုပ်ပါ
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

    # စကားပြောပွဲကို ပြပါ
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

## .NET Implementation

***မှတ်ချက်*** သင်သည် ဤ [notebook](./mcp_support_dotnet.ipynb) ကို လည်ပတ်နိုင်သည်။

### 1. လိုအပ်သော ပါကေ့များ တပ်ဆင်ခြင်း

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. လိုအပ်သော မျက်နှာပြင်များ import ပြုလုပ်ခြင်း

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. ဆက်တင်များ ပြင်ဆင်ခြင်း

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP Tool သတ်မှတ်ချက် ဖန်တီးခြင်း

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. MCP Tool များပါဝင်သည့် အေးဂျင့် ဖန်တီးခြင်း

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. .NET နမူနာ ပြည့်စုံ

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

## MCP Tool ဆက်တင် ရွေးချယ်စရာများ

သင့်အေးဂျင့်အတွက် MCP Tool များကို ပြင်ဆင်စဉ် အရေးကြီးသော ပါရာမီတာများ ရွေးချယ်နိုင်ပါသည် -

### Python ဆက်တင်

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP ဆာဗာအတွက် အိုင်ဒင်တီဖိုင်ယာ
    server_url="https://api.example.com/mcp", # MCP ဆာဗာ အဆုံးအမှတ်
    allowed_tools=[],                       # ရွေးချယ်စရာ: ခွင့်ပြုထားသောကိရိယာများကို သတ်မှတ်ပါ
)
```

### .NET ဆက်တင်

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## အတည်ပြုခြင်းနှင့် Header များ

နှစ်ခုလုံးတွင် အတည်ပြုမှုအတွက် စိတ်တိုင်းကျ Header များကို ထောက်ပံ့သည် -

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## ရိုးရှင်းသော ပြဿနာများ ပြင်ဆင်နည်း

### 1. ချိတ်ဆက်မှု ပြဿနာများ
- MCP ဆာဗာ URL သက်ဆိုင်ရာ ဖွင့်လှစ်နိုင်မှုရှိမရှိ စစ်ဆေးပါ
- အတည်ပြုလက်မှတ် စစ်ဆေးပါ
- ကွန်ယက်ချိတ်ဆက်မှုရှိမှု သေချာစေပါ

### 2. ကိရိယာ ခေါ်ယူမှု မအောင်မြင်ခြင်း
- ကိရိယာအကြောင်းအရာများနှင့် ပုံစံစစ်ဆေးပါ
- ဆာဗာသည် ထူးခြားလိုအပ်ချက်များရှိမရှိ စစ်ဆေးပါ
- သင့်တော်သော အမှားစီမံခန့်ခွဲမှု ထည့်သွင်းပါ

### 3. စွမ်းဆောင်ရည် ပြဿနာများ
- ကိရိယာ ခေါ်ယူမှု အကြိမ်ရေ စနစ်တကျ ထိန်းချုပ်ပါ
- သင့်တော်သော cache ကို အသုံးပြုပါ
- ဆာဗာ တုံ့ပြန်ချိန်များကို ကြည့်ရှု စောင့်ကြည့်ပါ

## နောက်တစ်ဆင့်များ

MCP ပေါင်းစပ်မှုကို ထပ်မံတိုးတက်စေရန် -

1. **စိတ်ကြိုက် MCP ဆာဗာများ ရေးဆွဲခြင်း** - ကိုယ်ပိုင် ဒေတာအရင်းမြစ်များအတွက် MCP ဆာဗာများ ဖန်တီးပါ
2. **လုံခြုံရေး အဆင့်မြှင့်တင်ခြင်း** - OAuth2 သို့မဟုတ် စိတ်ကြိုက် အတည်ပြုစနစ်များ ထည့်သွင်းပါ
3. **စောင့်ကြည့်မှုနှင့် စစ်တမ်းများ** - ကိရိယာ အသုံးပြုမှုများနှင့် တုံ့ပြန်မှုများကို မှတ်တမ်းတင်ခြင်းနှင့် စောင့်ကြည့်မှုများ ပြုလုပ်ပါ
4. **ဖြေရှင်းချက်များ ကျယ်ပြန့်စေရန်** - အလုပ်ချိန် ချိန်ဆ သင့်တော်သော load balancing နှင့် ပြန်ဖြန့်ဖြူး MCP ဆာဗာ ဖွဲ့စည်းမှုများ ကို စဉ်းစားပါ

## အပိုင်းဆက်ဖတ်ရန် အရင်းအမြစ်များ

- [Microsoft Foundry စာတမ်းများ](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol နမူနာများ](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry Agents အကြောင်း](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP သတ်မှတ်ချက်](https://spec.modelcontextprotocol.io/)

## အထောက်အပံ့

ထပ်ဆောင်း အကူအညီများနှင့် မေးခွန်းများအတွက် -
- [Microsoft Foundry စာတမ်းများ](https://learn.microsoft.com/azure/ai-foundry/) ကို ပြန်လည်လေ့လာပါ။
- [MCP လူမှုအသိုင်းအဝိုင်း အရင်းအမြစ်များ](https://modelcontextprotocol.io/) ကို စစ်ဆေးကြည့်ပါ။

## နောက်ဆုံး အဆင့်

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->