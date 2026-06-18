# Model Context Protocol (MCP) Integration sa Microsoft Foundry

Ipinapakita ng gabay na ito kung paano i-integrate ang Model Context Protocol (MCP) servers sa Microsoft Foundry agents, na nagpapagana ng malakas na pagsasama ng mga tool at kakayahan sa enterprise AI.

## Panimula

Ang Model Context Protocol (MCP) ay isang bukas na pamantayan na nagpapahintulot sa mga AI application na ligtas na kumonekta sa mga panlabas na pinagkukunan ng data at mga tool. Kapag na-integrate sa Microsoft Foundry, pinapayagan ng MCP ang mga agent na ma-access at makipag-ugnayan sa iba't ibang panlabas na serbisyo, API, at pinagkukunan ng data sa isang standardized na paraan.

Pinagsasama ng integrasyong ito ang kakayahang umangkop ng MCP tool ecosystem sa matatag na agent framework ng Microsoft Foundry, na nagbibigay ng enterprise-grade na mga solusyon sa AI na may malawak na mga kakayahan sa pag-customize.

**Tandaan:** Kung nais mong gamitin ang MCP sa Microsoft Foundry Agent Service, kasalukuyang sinusuportahan lamang ang mga sumusunod na rehiyon: westus, westus2, uaenorth, southindia at switzerlandnorth

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng gabay na ito, magagawa mong:

- Maunawaan ang Model Context Protocol at ang mga benepisyo nito
- I-set up ang mga MCP server para sa paggamit sa Microsoft Foundry agents
- Gumawa at mag-configure ng mga agent na may integrasyon ng MCP tool
- Magpatupad ng mga praktikal na halimbawa gamit ang totoong MCP servers
- Pamahalaan ang mga tugon ng tool at mga sanggunian sa mga pag-uusap ng agent

## Mga Kinakailangan

Bago magsimula, tiyaking mayroon kang:

- Isang Azure subscription na may access sa Microsoft Foundry
- Python 3.10+ o .NET 8.0+
- Naka-install at na-configure ang Azure CLI
- Angkop na mga pahintulot para lumikha ng mga AI resources

## Ano ang Model Context Protocol (MCP)?

Ang Model Context Protocol ay isang standardized na paraan para sa mga AI application na kumonekta sa mga panlabas na pinagkukunan ng data at mga tool. Kabilang sa mga pangunahing benepisyo ang:

- **Standardized Integration**: Pare-parehong interface sa iba't ibang tool at serbisyo
- **Seguridad**: Ligtas na mga mekanismo ng authentication at authorization
- **Kakayahang Umangkop**: Suporta para sa iba't ibang pinagkukunan ng data, API, at custom na mga tool
- **Extensibility**: Madaling magdagdag ng mga bagong kakayahan at integrasyon

## Pagsasaayos ng MCP sa Microsoft Foundry

### Pag-configure ng Kapaligiran

Piliin ang nais mong development environment:

- [Python Implementation](#python-implementation)
- [.NET Implementation](#codeblock5)

---

## Python Implementation

***Tandaan*** Maaari mong patakbuhin ang [notebook](./mcp_support_python.ipynb) na ito

### 1. I-install ang Mga Kinakailangang Pakete

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. Import ang Mga Depedensya

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. I-configure ang Mga Setting ng MCP

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. I-initialize ang Project Client

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. Gumawa ng MCP Tool

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # Opsyonal: tukuyin ang mga pinapayagang kasangkapan
)
```

### 6. Kumpletong Halimbawang Python

```python
with project_client:
    agents_client = project_client.agents

    # Lumikha ng bagong ahente gamit ang mga MCP na kasangkapan
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # Lumikha ng thread para sa komunikasyon
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Lumikha ng mensahe para sa thread
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # Pangasiwaan ang mga pag-apruba ng kasangkapan at patakbuhin ang ahente
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

    # Ipakita ang pag-uusap
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

***Tandaan*** Maaari mong patakbuhin ang [notebook](./mcp_support_dotnet.ipynb) na ito

### 1. I-install ang Mga Kinakailangang Pakete

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. Import ang Mga Depedensya

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. I-configure ang Mga Setting

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. Gumawa ng MCP Tool Definition

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. Gumawa ng Agent na may MCP Tools

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. Kumpletong Halimbawang .NET

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

## Mga Opsyon sa Pag-configure ng MCP Tool

Kapag nag-configure ng MCP tools para sa iyong agent, maaari mong tukuyin ang ilang mahahalagang parameter:

### Pag-configure sa Python

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # Tagatukoy para sa MCP server
    server_url="https://api.example.com/mcp", # Endpoint ng MCP server
    allowed_tools=[],                       # Opsyonal: tukuyin ang mga pinapayagang kasangkapan
)
```

### Pag-configure sa .NET

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## Authentication at Headers

Sinusuportahan ng parehong implementasyon ang mga custom na header para sa authentication:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## Pagsasaayos sa Mga Karaniwang Suliranin

### 1. Mga Problema sa Koneksyon
- Tiyaking naa-access ang URL ng MCP server
- Suriin ang mga kredensyal sa authentication
- Siguraduhin ang koneksyon sa network

### 2. Pagkabigo sa Pagtawag sa Tool
- Suriin ang mga argumento ng tool at format nito
- Tingnan ang mga kinakailangan ng server
- Magpatupad ng tamang paghawak ng error

### 3. Mga Suliranin sa Performance
- I-optimize ang dalas ng pagtawag sa tool
- Magpatupad ng caching kung naaangkop
- Subaybayan ang oras ng pagtugon ng server

## Mga Susunod na Hakbang

Para lalo pang pagbutihin ang iyong integrasyon sa MCP:

1. **Suriin ang Custom MCP Servers**: Bumuo ng sarili mong MCP servers para sa proprietary na pinagkukunan ng data
2. **Magpatupad ng Advanced na Seguridad**: Magdagdag ng OAuth2 o mga custom na mekanismo ng authentication
3. **Subaybayan at Gumamit ng Analytics**: Magpatupad ng pag-log at pagsubaybay para sa paggamit ng tool
4. **I-scale ang Iyong Solusyon**: Isaalang-alang ang load balancing at distributadong arkitektura ng MCP server

## Karagdagang Mga Mapagkukunan

- [Microsoft Foundry Documentation](https://learn.microsoft.com/azure/ai-foundry/)
- [Mga Sample ng Model Context Protocol](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Pangkalahatang-ideya ng Microsoft Foundry Agents](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)

## Suporta

Para sa karagdagang suporta at mga katanungan:
- Suriin ang [dokumentasyon ng Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- Tingnan ang [komunidad ng MCP resources](https://modelcontextprotocol.io/)

## Ano ang susunod

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->