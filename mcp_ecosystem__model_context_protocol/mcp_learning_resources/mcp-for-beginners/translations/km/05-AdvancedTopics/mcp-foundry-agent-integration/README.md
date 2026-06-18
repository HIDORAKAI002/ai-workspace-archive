# ការរួមបញ្ចូល Model Context Protocol (MCP) ជាមួយ Microsoft Foundry

មគ្គុទេសក៍នេះបង្ហាញពីរបៀបរួមបញ្ចូលម៉ូឌែល Context Protocol (MCP) server ជាមួយភ្នាក់ងារខាង Microsoft Foundry ដែលអាចអនុញ្ញាតឱ្យមានការប្រតិបត្តិឧបករណ៍ប្រកបដោយឥទ្ធិពល និងសមត្ថភាព AI សម្រាប់ស្ថាប័ន។

## ការណែនាំ

Model Context Protocol (MCP) គឺជា​ស្តង់ដារបើក ដែលអនុញ្ញាតឱ្យកម្មវិធី AI តភ្ជាប់យ៉ាងសុវត្ថិភាពទៅកាន់ប្រភពទិន្នន័យ និងឧបករណ៍ខាងក្រៅ។ នៅពេលបានរួមបញ្ចូលជាមួយ Microsoft Foundry MCP អនុញ្ញាតឱ្យភ្នាក់ងារចូលប្រើ និងអាជីពភាពជាមួយសេវាកម្មខាងក្រៅ API និងប្រភពទិន្នន័យជាច្រើនដោយប្រើវិធីសាស្ត្រស្តង់ដារ។

ការរួមបញ្ចូលនេះបញ្ចូលភាពបត់បែននៃប្រព័ន្ធឧបករណ៍ MCP ជាមួយសមត្ថភាពភ្នាក់ងារប្រហែលនៅ Microsoft Foundry ផ្តល់ដល់ដំណោះស្រាយ AI សម្រាប់ស្ថាប័នដែលមានកម្រិតខ្ពស់ និងអាចប្រើប្រាស់តាមការកំណត់រចនាសម្ព័ន្ធបានយ៉ាងទូលំទូលាយ។

**បញ្ជាក់៖** ប្រសិនបើអ្នកចង់ប្រើ MCP នៅក្នុង Microsoft Foundry Agent Service សព្វថ្ងៃគ្រាន់តែបណ្ដាប្រទេសខាងក្រោមត្រូវបានគាំទ្រ៖ westus, westus2, uaenorth, southindia និង switzerlandnorth

## គោលបំណងការរៀន

នៅចប់មគ្គុទេសក៍នេះ អ្នកនឹងអាច៖

- យល់ដឹងអំពី Model Context Protocol និងអត្ថប្រយោជន៍របស់វា
- តំឡើង MCP server សម្រាប់ប្រើជាមួយភ្នាក់ងារខាង Microsoft Foundry
- បង្កើត និងកំណត់ភ្នាក់ងារជាមួយការរួមបញ្ចូលឧបករណ៍ MCP
- អនុវត្តឧទាហរណ៍ពិតប្រាកដដោយប្រើ MCP server ពិតប្រាកដ
- គ្រប់គ្រងចម្លើយឧបករណ៍ និងការចំណាំនៅក្នុងសន្ទស្សន៍ភ្នាក់ងារ

## តម្រូវការមុនពេល

មុនចាប់ផ្តើម សូមប្រាកដថាអ្នកមាន៖

- ការជាវសេវា Azure ជាមួយការចូលប្រើ Microsoft Foundry
- Python 3.10+ ឬ .NET 8.0+
- Azure CLI ត្រូវបានដំឡើង និងកំណត់រចនាសម្ព័ន្ធ
- សិទ្ធិគ្រប់គ្រាន់សម្រាប់បង្កើតធនធាន AI

## Model Context Protocol (MCP) ជាអ្វី?

Model Context Protocol ជាវិធីស្នូលស្តង់ដារសម្រាប់កម្មវិធី AI ក្នុងការតភ្ជាប់ទៅប្រភពទិន្នន័យ និងឧបករណ៍ខាងក្រៅ។ អត្ថប្រយោជន៍សំខាន់រួមមាន៖

- **ការរួមបញ្ចូលដោយស្តង់ដារ**៖ សេវាកម្ម និងឧបករណ៍ទាំងអស់មានចំណុចប្រសព្វតែមួយ
- **សុវត្ថិភាព**៖ មានមេកានិចផ្ទៀងផ្ទាត់សុវត្ថិភាព និងឧណ្ហាការណ៍
- **ភាពបត់បែន**៖ គាំទ្រដល់ប្រភព​ទិន្នន័យ API និងឧបករណ៍បត់បែនផ្សេងៗ
- **អាចពង្រីកបាន**៖ ការបន្ថែមសមត្ថភាព និងការរួមបញ្ចូលថ្មីៗ ងាយស្រួល

## ការកំណត់ MCP ជាមួយ Microsoft Foundry

### ការកំណត់បរិយាកាស

ជ្រើសរើសបរិយាកាសអភិវឌ្ឍដែលអ្នកចូលចិត្ត៖

- [ការអនុវត្ត Python](#ការអនុវត្ត-python)
- [ការអនុវត្ត .NET](#codeblock5)

---

## ការអនុវត្ត Python

***បញ្ជាក់*** អ្នកអាចរត់ [notebook](./mcp_support_python.ipynb) នេះបាន

### 1. ដំឡើងកញ្ចប់ដែលត្រូវការ

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. នាំចូលឧបករណ៍ជំនួយ

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. កំណត់ការកំណត់ MCP

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. ចាប់ផ្តើម Project Client

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. បង្កើតឧបករណ៍ MCP

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # ជាជម្រើស: បញ្ជាក់ឧបករណ៍ដែលបានអនុញ្ញាត
)
```

### 6. ឧទាហរណ៍ពេញលេញ Python

```python
with project_client:
    agents_client = project_client.agents

    # បង្កើតភ្នាក់ងារថ្មីជាមួយឧបករណ៍ MCP
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # បង្កើតខ្សែរចងសម្រាប់ការទំនាក់ទំនង
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # បង្កើតសារទៅខ្សែរចង
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # ដោះស្រាយការអនុម័តឧបករណ៍ និង​រត់ភ្នាក់ងារ
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

    # បង្ហាញការពិភាក្សា
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

## ការអនុវត្ត .NET

***បញ្ជាក់*** អ្នកអាចរត់ [notebook](./mcp_support_dotnet.ipynb) នេះបាន

### 1. ដំឡើងកញ្ចប់ដែលត្រូវការ

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. នាំចូលឧបករណ៍ជំនួយ

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. កំណត់ការកំណត់

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. បង្កើត គោលការណ៍ឧបករណ៍ MCP

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. បង្កើតភ្នាក់ងារជាមួយឧបករណ៍ MCP

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. ឧទាហរណ៍ពេញលេញ .NET

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

## ជម្រើសកំណត់តម្លៃឧបករណ៍ MCP

នៅពេលកំណត់តម្លៃឧបករណ៍ MCP សម្រាប់ភ្នាក់ងារ អ្នកអាចបញ្ជាក់ប៉ារ៉ាម៉ែត្រសំខាន់ៗដូចខាងក្រោម៖

### ការកំណត់តម្លៃ Python

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # អត្តសញ្ញាណ​សម្រាប់ម៉ាស៊ីនបម្រើ MCP
    server_url="https://api.example.com/mcp", # ចំណុចបញ្ចប់ម៉ាស៊ីនបម្រើ MCP
    allowed_tools=[],                       # ផ្លូវជំនួយ៖ កំណត់ឧបករណ៍ដែលអនុញ្ញាត
)
```

### ការកំណត់តម្លៃ .NET

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ និងក្បាលសំណុំទិន្នន័យ

ការអនុវត្តទាំងពីរគាំទ្រក្បាលសំណុំទិន្នន័យតាមបែបផ្ទាល់ខ្លួនសម្រាប់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ៖

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## ដោះស្រាយបញ្ហាទូទៅ

### 1. បញ្ហាការតភ្ជាប់
- ពិនិត្យ URL MCP server អាចចូលប្រើបាន
- ពិនិត្យអត្តសញ្ញាណអ្នកប្រើ
- បញ្ជាក់ការតភ្ជាប់បណ្ដាញមានស្ថិរភាព

### 2. ជួបបញ្ហាការហៅឧបករណ៍
- ពិនិត្យអាគុយម៉ង់ និងទ្រង់ទ្រាយឧបករណ៍
- ពិនិត្យតម្រូវការច្បាស់លាស់របស់ server
- អនុវត្តការគ្រប់គ្រងកំហុសត្រឹមត្រូវ

### 3. បញ្ហាប្រសិទ្ធភាព
- បង្កើនប្រសិទ្ធភាពសង្គ្រោះហៅឧបករណ៍
- អនុវត្តកំណត់តម្រង់បន្ថែមបើមាន
- ត្រួតពិនិត្យពេលវេលាចម្លើយ server

## ជំហានបន្ទាប់

ដើម្បីពង្រឹងការរួមបញ្ចូល MCP អ្នក៖

1. **ស្វែងយល់អំពីកម្មវិធី MCP ផ្ទាល់ខ្លួន**៖ បង្កើត MCP server ផ្ទាល់ខ្លួនសម្រាប់ប្រភពទិន្នន័យអាជីវកម្ម
2. **អនុវត្តសុវត្ថិភាពកម្រិតខ្ពស់**៖ បន្ថែម OAuth2 ឬមេកានិចផ្ទៀងផ្ទាត់ផ្ទាល់ខ្លួន
3. **ត្រួតពិនិត្យ និងវិភាគ**៖ អនុវត្តការចុះបញ្ជី និងត្រួតពិនិត្យការប្រើប្រាស់ឧបករណ៍
4. **បង្កើនទំហំដំណោះស្រាយ**៖ ពិចារណាការប្រមូលផ្ដុំបន្ទុក និងរចនាសម្ព័ន្ធមូលដ្ឋាន MCP server ចែកចាយ

## ឯកសារបន្ថែម

- [ឯកសារ Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- [គំរូ Model Context Protocol](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [ទិដ្ឋភាពទូទៅនៃភ្នាក់ងារ Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [ការបញ្ជាក់ MCP](https://spec.modelcontextprotocol.io/)

## គាំទ្រ

សម្រាប់ការគាំទ្របន្ថែម និងសំណួរ៖
- សូមមើលឯកសាររបស់ [Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- ពិនិត្យមើលធនធានសហគមន៍ [MCP](https://modelcontextprotocol.io/)

## ជាដំណាក់កាលបន្ទាប់

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->