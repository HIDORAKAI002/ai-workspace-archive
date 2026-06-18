# মডেল কনটেক্সট প্রোটোকল (MCP) মাইক্রোসফট ফাউন্ড্রির সাথে ইন্টিগ্রেশন

এই গাইডটি দেখায় কিভাবে মডেল কনটেক্সট প্রোটোকল (MCP) সার্ভারগুলি মাইক্রোসফট ফাউন্ড্রি এজেন্টদের সাথে ইন্টিগ্রেট করা যায়, যা শক্তিশালী টুল অর্কেস্ট্রেশন এবং এন্টারপ্রাইজ AI ক্ষমতা সক্ষম করে।

## পরিচিতি

মডেল কনটেক্সট প্রোটোকল (MCP) একটি ওপেন স্ট্যান্ডার্ড যা AI অ্যাপ্লিকেশনগুলোকে নিরাপদে বহিরাগত ডেটা সোর্স এবং টুলের সাথে সংযুক্ত হতে সক্ষম করে। মাইক্রোসফট ফাউন্ড্রির সাথে ইন্টিগ্রেট করলে, MCP এজেন্টদের বিভিন্ন বহিরাগত পরিষেবা, API এবং ডেটা সোর্সে স্ট্যান্ডার্ডাইজড উপায়ে প্রবেশাধিকার এবং ইন্টারঅ্যাকশন করার সুযোগ দেয়।

এই ইন্টিগ্রেশন MCP এর টুল ইকোসিস্টেমের নমনীয়তাকে মাইক্রোসফট ফাউন্ড্রির শক্তিশালী এজেন্ট ফ্রেমওয়ার্কের সাথে মিলিয়ে এন্টারপ্রাইজ-গ্রেড AI সমাধান প্রদান করে যা ব্যাপক কাস্টমাইজেশনের সুবিধা দেয়।

**দ্রষ্টব্য:** আপনি যদি মাইক্রোসফট ফাউন্ড্রি এজেন্ট সার্ভিসে MCP ব্যবহার করতে চান, বর্তমানে শুধুমাত্র নিম্নলিখিত অঞ্চলগুলো সমর্থিত: westus, westus2, uaenorth, southindia এবং switzerlandnorth

## শেখার উদ্দেশ্যসমূহ

এই গাইডের শেষে আপনি সক্ষম হবেন:

- মডেল কনটেক্সট প্রোটোকল এবং এর সুবিধাসমূহ বুঝতে
- মাইক্রোসফট ফাউন্ড্রি এজেন্টদের সাথে ব্যবহারের জন্য MCP সার্ভার সেটআপ করতে
- MCP টুল ইন্টিগ্রেশন সহ এজেন্ট তৈরি এবং কনফিগার করতে
- বাস্তব MCP সার্ভার ব্যবহার করে কার্যকরী উদাহরণ বাস্তবায়ন করতে
- এজেন্ট কথোপকথনে টুলের প্রতিক্রিয়া এবং উদ্ধৃতিগুলো পরিচালনা করতে

## পূর্ব শর্ত

শুরু করার আগে নিশ্চিত করুন আপনার কাছে রয়েছে:

- মাইক্রোসফট ফাউন্ড্রি অ্যাক্সেসসহ একটি Azure সাবস্ক্রিপশন
- Python 3.10+ বা .NET 8.0+
- Azure CLI ইনস্টল ও কনফিগার করা
- AI সম্পদ তৈরি করার জন্য উপযুক্ত অনুমতিসমূহ

## মডেল কনটেক্সট প্রোটোকল (MCP) কী?

মডেল কনটেক্সট প্রোটোকল হল AI অ্যাপ্লিকেশনগুলোর জন্য বহিরাগত ডেটা সোর্স এবং টুলের সাথে সংযোগ করার স্ট্যান্ডার্ডাইজড পদ্ধতি। প্রধান সুবিধাসমূহ হলো:

- **স্ট্যান্ডার্ডাইজড ইন্টিগ্রেশন**: বিভিন্ন টুল এবং সার্ভিসের মধ্যে অভিন্ন ইন্টারফেস
- **নিরাপত্তা**: নিরাপদ প্রমাণীকরণ এবং অনুমোদন ব্যবস্থাপনা
- **নমনীয়তা**: বিভিন্ন ডেটা সোর্স, API, এবং কাস্টম টুল সমর্থন
- **বর্ধনযোগ্যতা**: নতুন সক্ষমতা এবং ইন্টিগ্রেশন সহজে যোগ করার সুযোগ

## মাইক্রোসফট ফাউন্ড্রির সাথে MCP সেটআপ

### পরিবেশ কনফিগারেশন

আপনার পছন্দসই ডেভেলপমেন্ট পরিবেশ নির্বাচন করুন:

- [Python বাস্তবায়ন](#python-বাস্তবায়ন)
- [.NET বাস্তবায়ন](#codeblock5)

---

## Python বাস্তবায়ন

***দ্রষ্টব্য*** আপনি এই [নোটবুকটি](./mcp_support_python.ipynb) চালাতে পারেন

### ১. প্রয়োজনীয় প্যাকেজ ইনস্টল করুন

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### ২. নির্ভরশীলতাগুলো ইমপোর্ট করুন

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### ৩. MCP সেটিংস কনফিগার করুন

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### ৪. প্রজেক্ট ক্লায়েন্ট ইনিশিয়ালাইজ করুন

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### ৫. MCP টুল তৈরি করুন

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # ঐচ্ছিক: অনুমোদিত সরঞ্জাম নির্দিষ্ট করুন
)
```

### ৬. সম্পূর্ণ Python উদাহরণ

```python
with project_client:
    agents_client = project_client.agents

    # MCP টুলসহ একটি নতুন এজেন্ট তৈরি করুন
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # যোগাযোগের জন্য থ্রেড তৈরি করুন
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # থ্রেডে মেসেজ তৈরি করুন
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # টুল অনুমোদন পরিচালনা করুন এবং এজেন্ট চালান
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

    # সংলাপ প্রদর্শন করুন
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

## .NET বাস্তবায়ন

***দ্রষ্টব্য*** আপনি এই [নোটবুকটি](./mcp_support_dotnet.ipynb) চালাতে পারেন

### ১. প্রয়োজনীয় প্যাকেজ ইনস্টল করুন

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### ২. নির্ভরশীলতাগুলো ইমপোর্ট করুন

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### ৩. সেটিংস কনফিগার করুন

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### ৪. MCP টুল সংজ্ঞা তৈরি করুন

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### ৫. MCP টুলসহ এজেন্ট তৈরি করুন

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### ৬. সম্পূর্ণ .NET উদাহরণ

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

## MCP টুল কনফিগারেশন অপশনসমূহ

আপনার এজেন্টের জন্য MCP টুল কনফিগার করার সময়, আপনি বেশ কিছু গুরুত্বপূর্ণ প্যারামিটার নির্দিষ্ট করতে পারেন:

### Python কনফিগারেশন

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP সার্ভারের শনাক্তকারী
    server_url="https://api.example.com/mcp", # MCP সার্ভার এন্ডপয়েন্ট
    allowed_tools=[],                       # ঐচ্ছিক: অনুমোদিত টুলগুলি নির্দিষ্ট করুন
)
```

### .NET কনফিগারেশন

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## প্রমাণীকরণ এবং হেডারসমূহ

উভয় বাস্তবায়নেই প্রমাণীকরণের জন্য কাস্টম হেডার সমর্থিত:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## সাধারণ সমস্যার সমাধান

### ১. কানেকশন সমস্যা
- MCP সার্ভারের URL অ্যাক্সেসযোগ্য কিনা যাচাই করুন
- প্রমাণীকরণ তথ্য চেক করুন
- নেটওয়ার্ক সংযোগ নিশ্চিত করুন

### ২. টুল কল ব্যর্থতা
- টুল আর্গুমেন্ট এবং ফরম্যাটিং পর্যালোচনা করুন
- সার্ভার-নির্দিষ্ট শর্তাবলী যাচাই করুন
- সঠিক ত্রুটি পরিচালনা বাস্তবায়ন করুন

### ৩. কার্যকারিতা সমস্যা
- টুল কলের ফ্রিকোয়েন্সি অপ্টিমাইজ করুন
- যেখানে প্রযোজ্য ক্যাশিং ব্যবহার করুন
- সার্ভার প্রতিক্রিয়া সময় পর্যবেক্ষণ করুন

## পরবর্তী ধাপ

আপনার MCP ইন্টিগ্রেশন আরও উন্নত করতে:

1. **কাস্টম MCP সার্ভার অন্বেষণ করুন**: আপনার নিজস্ব MCP সার্ভার তৈরি করুন বাণিজ্যিক ডেটা সোর্সের জন্য
2. **উন্নত সিকিউরিটি বাস্তবায়ন করুন**: OAuth2 বা কাস্টম প্রমাণীকরণ পদ্ধতি যোগ করুন
3. **মনিটরিং এবং অ্যানালিটিকস**: টুল ব্যবহারের জন্য লগিং এবং পর্যবেক্ষণ বাস্তবায়ন করুন
4. **আপনার সমাধান স্কেল করুন**: লোড ব্যালান্সিং এবং বিতরণকৃত MCP সার্ভার আর্কিটেকচার বিবেচনা করুন

## অতিরিক্ত রিসোর্সসমূহ

- [মাইক্রোসফট ফাউন্ড্রি ডকুমেন্টেশন](https://learn.microsoft.com/azure/ai-foundry/)
- [মডেল কনটেক্সট প্রোটোকল স্যাম্পলস](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [মাইক্রোসফট ফাউন্ড্রি এজেন্টস ওভারভিউ](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP স্পেসিফিকেশন](https://spec.modelcontextprotocol.io/)

## সাপোর্ট

অতিরিক্ত সহায়তার জন্য এবং প্রশ্নের জন্য:
- [মাইক্রোসফট ফাউন্ড্রি ডকুমেন্টেশন](https://learn.microsoft.com/azure/ai-foundry/) পর্যালোচনা করুন
- [MCP কমিউনিটি রিসোর্স](https://modelcontextprotocol.io/) চেক করুন

## পরবর্তীতে কী

- [5.14 MCP কনটেক্সট ইঞ্জিনিয়ারিং](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->