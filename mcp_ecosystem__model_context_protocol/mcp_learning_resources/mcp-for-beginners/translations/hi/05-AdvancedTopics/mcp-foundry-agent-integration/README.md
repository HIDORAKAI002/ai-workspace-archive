# मॉडल कॉन्टेक्स्ट प्रोटोकॉल (MCP) का Microsoft Foundry के साथ एकीकरण

यह गाइड दिखाता है कि Microsoft Foundry एजेंट्स के साथ मॉडल कॉन्टेक्स्ट प्रोटोकॉल (MCP) सर्वरों को कैसे एकीकृत किया जाए, जो शक्तिशाली टूल ओरकेस्ट्रेशन और एंटरप्राइज AI क्षमताओं को सक्षम बनाता है।

## परिचय

मॉडल कॉन्टेक्स्ट प्रोटोकॉल (MCP) एक खुला मानक है जो AI एप्लिकेशनों को बाहरी डेटा स्रोतों और टूल्स से सुरक्षित रूप से कनेक्ट करने में सक्षम बनाता है। Microsoft Foundry के साथ एकीकृत होने पर, MCP एजेंट्स को विभिन्न बाहरी सेवाओं, API, और डेटा स्रोतों तक मानकीकृत तरीके से पहुंच और संपर्क करने की अनुमति देता है।

यह एकीकरण MCP के टूल इकोसिस्टम की लचीलापन को Microsoft Foundry के मजबूत एजेंट फ्रेमवर्क के साथ जोड़ता है, जिससे एंटरप्राइज-ग्रेड AI समाधान व्यापक अनुकूलन क्षमताओं के साथ उपलब्ध होते हैं।

**ध्यान दें:** यदि आप Microsoft Foundry एजेंट सर्विस में MCP का उपयोग करना चाहते हैं, तो वर्तमान में केवल निम्नलिखित क्षेत्र समर्थित हैं: westus, westus2, uaenorth, southindia और switzerlandnorth

## सीखने के लक्ष्य

इस गाइड को पूरा करने के बाद आप कर पाएंगे:

- मॉडल कॉन्टेक्स्ट प्रोटोकॉल और इसके लाभों को समझना
- Microsoft Foundry एजेंट्स के लिए MCP सर्वरों की स्थापना करना
- MCP टूल इंटीग्रेशन के साथ एजेंट बनाना और कॉन्फ़िगर करना
- वास्तविक MCP सर्वरों का उपयोग करके व्यावहारिक उदाहरण लागू करना
- एजेंट संवादों में टूल प्रतिक्रिया और संदर्भ संभालना

## पूर्वापेक्षाएँ

शुरू करने से पहले सुनिश्चित करें कि आपके पास है:

- Microsoft Foundry एक्सेस के साथ एक Azure सब्सक्रिप्शन
- Python 3.10+ या .NET 8.0+
- Azure CLI इंस्टॉल और कॉन्फ़िगर किया हुआ
- AI संसाधन बनाने के लिए उपयुक्त अनुमतियाँ

## मॉडल कॉन्टेक्स्ट प्रोटोकॉल (MCP) क्या है?

मॉडल कॉन्टेक्स्ट प्रोटोकॉल AI एप्लिकेशनों के लिए बाहरी डेटा स्रोतों और टूल्स से जोड़ने का एक मानकीकृत तरीका है। इसके मुख्य लाभ हैं:

- **मानकीकृत एकीकरण**: विभिन्न टूल्स और सेवाओं के लिए सुसंगत इंटरफ़ेस
- **सुरक्षा**: सुरक्षित प्रमाणीकरण और प्राधिकरण तंत्र
- **लचीलापन**: विभिन्न डेटा स्रोतों, APIs, और कस्टम टूल्स का समर्थन
- **विस्तारशीलता**: नई क्षमताओं और एकीकरण को आसानी से जोड़ना

## Microsoft Foundry के साथ MCP सेटअप

### पर्यावरण कॉन्फ़िगरेशन

अपनी पसंदीदा विकास पर्यावरण चुनें:

- [Python कार्यान्वयन](#python-कार्यान्वयन)
- [.NET कार्यान्वयन](#codeblock5)

---

## Python कार्यान्वयन

***ध्यान दें*** आप इस [नोटबुक](./mcp_support_python.ipynb) को चला सकते हैं

### 1. आवश्यक पैकेज इंस्टॉल करें

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. निर्भरताएँ इम्पोर्ट करें

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP सेटिंग्स कॉन्फ़िगर करें

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. प्रोजेक्ट क्लाइंट प्रारंभ करें

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP टूल बनाएं

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # वैकल्पिक: अनुमत टूल निर्दिष्ट करें
)
```

### 6. पूरा Python उदाहरण

```python
with project_client:
    agents_client = project_client.agents

    # MCP टूल्स के साथ एक नया एजेंट बनाएं
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # संचार के लिए थ्रेड बनाएं
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # थ्रेड के लिए संदेश बनाएं
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # टूल अनुमोदनों को संभालें और एजेंट चलाएं
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

    # बातचीत दिखाएं
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

## .NET कार्यान्वयन

***ध्यान दें*** आप इस [नोटबुक](./mcp_support_dotnet.ipynb) को चला सकते हैं

### 1. आवश्यक पैकेज इंस्टॉल करें

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. निर्भरताएँ इम्पोर्ट करें

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. सेटिंग्स कॉन्फ़िगर करें

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP टूल परिभाषा बनाएँ

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. MCP टूल्स के साथ एजेंट बनाएं

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. पूरा .NET उदाहरण

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

## MCP टूल कॉन्फ़िगरेशन विकल्प

अपने एजेंट के लिए MCP टूल कॉन्फ़िगर करते समय आप कई महत्वपूर्ण पैरामीटर निर्दिष्ट कर सकते हैं:

### Python कॉन्फ़िगरेशन

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP सर्वर के लिए पहचानकर्ता
    server_url="https://api.example.com/mcp", # MCP सर्वर एंडपॉइंट
    allowed_tools=[],                       # वैकल्पिक: अनुमत उपकरण निर्दिष्ट करें
)
```

### .NET कॉन्फ़िगरेशन

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## प्रमाणीकरण और हेडर

दोनों कार्यान्वयन प्रमाणीकरण के लिए कस्टम हेडर का समर्थन करते हैं:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## सामान्य समस्याओं का निवारण

### 1. कनेक्शन समस्याएं
- सुनिश्चित करें कि MCP सर्वर URL सुलभ है
- प्रमाणीकरण प्रमाणपत्र जांचें
- नेटवर्क कनेक्टिविटी सुनिश्चित करें

### 2. टूल कॉल विफलताएँ
- टूल तर्क और स्वरूप की समीक्षा करें
- सर्वर-विशिष्ट आवश्यकताओं की जांच करें
- उचित त्रुटि हैंडलिंग लागू करें

### 3. प्रदर्शन समस्याएं
- टूल कॉल आवृत्ति अनुकूलित करें
- जहां उचित हो कैशिंग लागू करें
- सर्वर प्रतिक्रिया समय की निगरानी करें

## आगे के कदम

अपने MCP एकीकरण को और बेहतर बनाने के लिए:

1. **कस्टम MCP सर्वर एक्सप्लोर करें**: अपने स्वामित्व वाले डेटा स्रोतों के लिए अपने खुद के MCP सर्वर बनाएं
2. **उन्नत सुरक्षा लागू करें**: OAuth2 या कस्टम प्रमाणीकरण तंत्र जोड़ें
3. **निगरानी और विश्लेषण**: टूल उपयोग के लिए लॉगिंग और मॉनिटरिंग लागू करें
4. **अपने समाधान को स्केल करें**: लोड बैलेंसिंग और वितरित MCP सर्वर आर्किटेक्चर पर विचार करें

## अतिरिक्त संसाधन

- [Microsoft Foundry प्रलेखन](https://learn.microsoft.com/azure/ai-foundry/)
- [मॉडल कॉन्टेक्स्ट प्रोटोकॉल नमूने](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry एजेंट्स अवलोकन](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP विनिर्देशन](https://spec.modelcontextprotocol.io/)

## समर्थन

अतिरिक्त समर्थन और प्रश्नों के लिए:
- [Microsoft Foundry प्रलेखन](https://learn.microsoft.com/azure/ai-foundry/) देखें
- [MCP समुदाय संसाधन](https://modelcontextprotocol.io/) जांचें

## अगला क्या है

- [5.14 MCP कॉन्टेक्स्ट इंजीनियरिंग](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->