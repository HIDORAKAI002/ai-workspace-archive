# Интеграција протокола за контекст модела (MCP) са Microsoft Foundry

Овај водич показује како интегрисати сервере протокола за контекст модела (MCP) са агентима Microsoft Foundry, омогућавајући снажну оркестрацију алата и предузетничке AI могућности.

## Увод

Протокол за контекст модела (MCP) је отворени стандард који омогућава AI апликацијама да сигурно повежу екстерне изворе података и алате. Када се интегрише са Microsoft Foundry-ом, MCP омогућава агентима приступ и интеракцију са различитим екстерним сервисима, API-јима и изворима података на стандардан начин.

Ова интеграција комбинује флексибилност MCP-овог екосистема алата са робусним агенцијским оквиром Microsoft Foundry-а, пружајући предузетничка AI решења са опсежним могућностима прилагођавања.

**Напомена:** Ако желите да користите MCP у Microsoft Foundry Agent Service, тренутно су подржане само следеће регије: westus, westus2, uaenorth, southindia и switzerlandnorth

## Циљеви учења

На крају овог водича моћи ћете да:

- Разумете протокол за контекст модела и његове предности
- Подесите MCP сервере за употребу са агентима Microsoft Foundry
- Креирате и конфигуришете агенте са интеграцијом MCP алата
- Имплементирате практичне примере користећи стварне MCP сервере
- Обрадите одговоре алата и цитате у разговорима са агентима

## Захтеви

Пре него што почнете, уверите се да имате:

- Azure претплату са приступом Microsoft Foundry-у
- Python 3.10+ или .NET 8.0+
- Инсталиран и конфигурисан Azure CLI
- Одговарајуће дозволе за креирање AI ресурса

## Шта је протокол за контекст модела (MCP)?

Протокол за контекст модела је стандардизован начин за AI апликације да се повежу на екстерне изворе података и алате. Кључне предности укључују:

- **Стандардизована интеграција**: Конзистентан интерфејс преко различитих алата и сервиса
- **Безбедност**: Сигурни механизми аутентификације и ауторизације
- **Флексибилност**: Подршка за разне изворе података, API-је и прилагођене алате
- **Проширивост**: Једноставно додавање нових могућности и интеграција

## Подешавање MCP са Microsoft Foundry

### Конфигурација окружења

Одаберите жељено развојно окружење:

- [Python имплементација](#python-имплементација)
- [.NET имплементација](#codeblock5)

---

## Python имплементација

***Напомена*** Можете покренути овај [нотебук](./mcp_support_python.ipynb)

### 1. Инсталирајте потребне пакете

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. Унесите зависности

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. Конфигуришите MCP подешавања

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. Иницијализујте Project Client

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. Креирајте MCP алат

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # Опционо: наведите дозвољене алате
)
```

### 6. Комплетан Python пример

```python
with project_client:
    agents_client = project_client.agents

    # Направите новог агента са MCP алатима
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # Креирајте нит за комуникацију
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # Креирајте поруку за нит
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # Обрадите одобрења алата и покрените агента
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

    # Прикажи разговор
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

## .NET имплементација

***Напомена*** Можете покренути овај [нотебук](./mcp_support_dotnet.ipynb)

### 1. Инсталирајте потребне пакете

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. Унесите зависности

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. Конфигуришите подешавања

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. Креирајте дефиницију MCP алата

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. Креирајте агента са MCP алатима

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. Комплетан .NET пример

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

## Опције конфигурације MCP алата

При конфигурисању MCP алата за вашег агента, можете одредити неколико важних параметара:

### Python конфигурација

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # Идентификатор за MCP сервер
    server_url="https://api.example.com/mcp", # MCP сервер крајња тачка
    allowed_tools=[],                       # Опционално: наведите дозвољене алате
)
```

### .NET конфигурација

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## Аутентификација и заглавља

Обје имплементације подржавају прилагођена заглавља за аутентификацију:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## Решавање честих проблема

### 1. Проблеми са везом
- Проверите да ли је MCP URL сервера приступачан
- Проверите податке за аутентификацију
- Обезбедите мрежну повезаност

### 2. Неуспех позива алата
- Прегледајте аргументе и формат позива алата
- Проверите специфичне захтеве сервера
- Имплементирајте правилно руковање грешкама

### 3. Проблеми са перформансама
- Оптимизујте учесталост позива алата
- Користите кеширање када је то прикладно
- Практикујте праћење времена одговора сервера

## Следећи кораци

Даље унапредите своју MCP интеграцију:

1. **Истражите прилагођене MCP сервере**: Креирајте властите MCP сервере за власничке изворе података
2. **Имплементирајте напредну безбедност**: Додајте OAuth2 или прилагођене механизме аутентификације
3. **Праћење и аналитика**: Имплементирајте евидентирање и надзор коришћења алата
4. **Ширите своје решење**: Размислите о балансирању оптерећења и дистрибуираним MCP архитектурама сервера

## Додатни ресурси

- [Microsoft Foundry документација](https://learn.microsoft.com/azure/ai-foundry/)
- [Примери протокола за контекст модела](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Преглед Microsoft Foundry агената](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP спецификација](https://spec.modelcontextprotocol.io/)

## Подршка

За додатну подршку и питања:
- Прегледајте [Microsoft Foundry документацију](https://learn.microsoft.com/azure/ai-foundry/)
- Проверите [MCP заједничке ресурсе](https://modelcontextprotocol.io/)

## Шта следи

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->