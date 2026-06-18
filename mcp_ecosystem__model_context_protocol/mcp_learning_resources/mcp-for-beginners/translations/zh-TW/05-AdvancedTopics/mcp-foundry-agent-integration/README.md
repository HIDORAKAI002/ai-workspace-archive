# Model Context Protocol (MCP) 與 Microsoft Foundry 整合

本指南展示如何將 Model Context Protocol (MCP) 伺服器與 Microsoft Foundry 代理整合，實現強大的工具協同與企業級 AI 功能。

## 介紹

Model Context Protocol (MCP) 是一個開放標準，允許 AI 應用安全地連接到外部資料來源和工具。整合 Microsoft Foundry 後，MCP 使代理能以標準化方式存取和互動各種外部服務、API 和資料來源。

此整合結合了 MCP 工具生態系的彈性與 Microsoft Foundry 強大的代理框架，提供具有廣泛客製化能力的企業等級 AI 解決方案。

**注意：** 如果您想在 Microsoft Foundry 代理服務中使用 MCP，當前僅支援以下區域：westus、westus2、uaenorth、southindia 和 switzerlandnorth

## 學習目標

完成本指南後，您將能夠：

- 了解 Model Context Protocol 及其優點
- 設置 MCP 伺服器用於 Microsoft Foundry 代理
- 建立並配置整合 MCP 工具的代理
- 使用真實 MCP 伺服器實作實用範例
- 處理代理對話中的工具回應與引用

## 前置條件

開始前請確保您具備：

- 具 Microsoft Foundry 存取權的 Azure 訂閱
- Python 3.10 以上或 .NET 8.0 以上
- 已安裝並設定 Azure CLI
- 建立 AI 資源的適當權限

## 什麼是 Model Context Protocol (MCP)？

Model Context Protocol 是 AI 應用連接外部資料來源和工具的標準化方式。主要優點包括：

- <strong>標準化整合</strong>：不同工具和服務的一致介面
- <strong>安全性</strong>：安全驗證與授權機制
- <strong>彈性</strong>：支援各種資料來源、API 及自訂工具
- <strong>擴充性</strong>：輕鬆新增能力與整合

## 設定 MCP 與 Microsoft Foundry

### 環境設定

選擇您偏好的開發環境：

- [Python 實作](#python-實作)
- [.NET 實作](#codeblock5)

---

## Python 實作

<strong><em>注意</em></strong> 您可執行此 [notebook](./mcp_support_python.ipynb)

### 1. 安裝必要套件

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. 匯入相依套件

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. 設定 MCP 參數

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. 初始化專案客戶端

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. 建立 MCP 工具

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # 選擇性：指定允許的工具
)
```

### 6. 完整 Python 範例

```python
with project_client:
    agents_client = project_client.agents

    # 使用 MCP 工具建立新的代理程式
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # 建立用於通訊的執行緒
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # 建立發送給執行緒的訊息
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # 處理工具批准並執行代理程式
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

    # 顯示對話內容
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

## .NET 實作

<strong><em>注意</em></strong> 您可執行此 [notebook](./mcp_support_dotnet.ipynb)

### 1. 安裝必要套件

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. 匯入相依套件

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. 設定參數

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. 建立 MCP 工具定義

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. 建立整合 MCP 工具的代理

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. 完整 .NET 範例

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

## MCP 工具配置選項

設定代理的 MCP 工具時，可指定以下重要參數：

### Python 配置

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP 伺服器標識符
    server_url="https://api.example.com/mcp", # MCP 伺服器端點
    allowed_tools=[],                       # 選填：指定允許的工具
)
```

### .NET 配置

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## 驗證與標頭

兩種實作皆支援自訂標頭用於驗證：

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## 常見問題排解

### 1. 連線問題
- 確認 MCP 伺服器 URL 可存取
- 檢查驗證憑證
- 確保網路連線無虞

### 2. 工具呼叫失敗
- 檢查工具參數及格式
- 確認伺服器特定需求
- 實作適當錯誤處理

### 3. 效能問題
- 優化工具呼叫頻率
- 適當實作快取
- 監控伺服器回應時間

## 後續步驟

進一步強化您的 MCP 整合：

1. **探索自訂 MCP 伺服器**：為專有資料來源打造專屬 MCP 伺服器
2. <strong>實作進階安全性</strong>：新增 OAuth2 或自訂驗證機制
3. <strong>監控與分析</strong>：實作工具使用的日誌與監控
4. <strong>擴展解決方案</strong>：考慮負載平衡與分散式 MCP 伺服器架構

## 其他資源

- [Microsoft Foundry 文件](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol 範例](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry 代理總覽](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP 規範](https://spec.modelcontextprotocol.io/)

## 技術支援

如需更多支援與問題協助：
- 請參閱 [Microsoft Foundry 文件](https://learn.microsoft.com/azure/ai-foundry/)
- 查看 [MCP 社群資源](https://modelcontextprotocol.io/)

## 往後方向

- [5.14 MCP Context Engineering](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->