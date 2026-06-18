# אינטגרציה של פרוטוקול הקשר למודל (MCP) עם Microsoft Foundry

מדריך זה מדגים כיצד לאינטגרציה של שרתי Model Context Protocol (MCP) עם סוכני Microsoft Foundry, המאפשר אורכסטרציה מתקדמת של כלים ויכולות AI ארגוניות חזקות.

## מבוא

Model Context Protocol (MCP) הוא תקן פתוח המאפשר לאפליקציות AI להתחבר בצורה מאובטחת למקורות נתונים וכלים חיצוניים. בעת אינטגרציה עם Microsoft Foundry, MCP מאפשר לסוכנים לגשת לאינטראקציה עם שירותים חיצוניים שונים, ממשקי API ומקורות נתונים בצורה סטנדרטית.

אינטגרציה זו משלבת את הגמישות של אקוסיסטם הכלים של MCP עם מסגרת הסוכנים החזקה של Microsoft Foundry, ומספקת פתרונות AI מדרגת ארגון עם יכולות התאמה אישית נרחבות.

**הערה:** אם ברצונך להשתמש ב-MCP בשירות סוכן Microsoft Foundry, כרגע נתמכים רק האזורים הבאים: westus, westus2, uaenorth, southindia ו-switzerlandnorth

## יעדי הלמידה

עם סיום מדריך זה, תוכל:

- להבין את פרוטוקול הקשר למודל ואת יתרונותיו
- להגדיר שרתי MCP לשימוש עם סוכני Microsoft Foundry
- ליצור ולהגדיר סוכנים עם אינטגרציית כלי MCP
- ליישם דוגמאות מעשיות באמצעות שרתי MCP אמיתיים
- לטפל בתגובות כלים וציטוטים בשיחות סוכן

## דרישות מוקדמות

לפני שתתחיל, ודא שיש לך:

- מנוי Azure עם גישה ל-Microsoft Foundry
- Python 3.10+ או .NET 8.0+
- Azure CLI מותקן ומוגדר
- הרשאות מתאימות ליצירת משאבי AI

## מהו פרוטוקול הקשר למודל (MCP)?

Model Context Protocol הוא דרך סטנדרטית לאפליקציות AI להתחבר למקורות נתונים וכלים חיצוניים. היתרונות המרכזיים כוללים:

- **אינטגרציה סטנדרטית**: ממשק עקבי בין כלים ושירותים שונים
- **אבטחה**: מנגנוני אימות והרשאה מאובטחים
- **גמישות**: תמיכה במקורות נתונים שונים, ממשקי API וכלים מותאמים אישית
- **הרחבה**: קלות הוספת יכולות ואינטגרציות חדשות

## הגדרת MCP עם Microsoft Foundry

### הגדרת סביבה

בחר את סביבת הפיתוח המועדפת עליך:

- [יישום ב-Python](#יישום-ב-python)
- [יישום ב-.NET](#codeblock5)

---

## יישום ב-Python

***הערה*** ניתן להריץ את [פנקס הרשימות](./mcp_support_python.ipynb)

### 1. התקנת חבילות נדרשות

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. ייבוא תלויות

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. קביעת הגדרות MCP

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. התחלת לקוח פרויקט

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. יצירת כלי MCP

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # אופציונלי: ציין את הכלים המותרים
)
```

### 6. דוגמה מלאה ב-Python

```python
with project_client:
    agents_client = project_client.agents

    # צור סוכן חדש עם כלים של MCP
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # צור נושא לתקשורת
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # צור הודעה לנושא
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # נהל אישורי כלים והפעל את הסוכן
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

    # הצג שיחה
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

## יישום ב-.NET

***הערה*** ניתן להריץ את [פנקס הרשימות](./mcp_support_dotnet.ipynb)

### 1. התקנת חבילות נדרשות

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. ייבוא תלויות

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. קביעת הגדרות

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. יצירת הגדרת כלי MCP

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. יצירת סוכן עם כלי MCP

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. דוגמה מלאה ב-.NET

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

## אפשרויות קונפיגורציית כלי MCP

בעת קונפיגורציית כלי MCP עבור הסוכן שלך, תוכל לציין כמה פרמטרים חשובים:

### קונפיגורציית Python

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # מזהה עבור שרת MCP
    server_url="https://api.example.com/mcp", # נקודת הקצה של שרת MCP
    allowed_tools=[],                       # אופציונלי: ציין כלים מותרים
)
```

### קונפיגורציית .NET

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## אימות וכותרות

שתי היישומים תומכים בכותרות מותאמות אישית לאימות:

### Python
```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET
```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## פתרון בעיות נפוצות

### 1. בעיות חיבור
- ודא שכתובת ה-URL של שרת MCP נגישה
- בדוק את אישורי האימות
- וודא קישוריות רשת

### 2. כישלונות קריאת הכלי
- בדוק ארגומנטים וכללי עיצוב של הכלי
- בדוק דרישות ספציפיות לשרת
- טפל בשגיאות כראוי

### 3. בעיות ביצועים
- אופטימיזציה של תדירות קריאת הכלים
- יישום זיכרון מטמון במידת הצורך
- נטר זמני תגובת שרת

## הצעדים הבאים

להרחבת האינטגרציה עם MCP:

1. **חקור שרתי MCP מותאמים אישית**: בנה שרתי MCP משלך למקורות נתונים פרטיים
2. **יישם אבטחה מתקדמת**: הוסף מנגנוני OAuth2 או אימות מותאמים אישית
3. **ניטור וניתוח**: יישם רישום ומעקב על שימוש בכלים
4. **סקייל את הפתרון שלך**: שקול איזון עומסים וארכיטקטורות שרתים מפוזרים של MCP

## משאבים נוספים

- [תיעוד Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- [דוגמאות פרוטוקול הקשר למודל](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [סקירת סוכני Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [מפרט MCP](https://spec.modelcontextprotocol.io/)

## תמיכה

לתמיכה ושאלות נוספות:
- עיין ב-[תיעוד Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/)
- בדוק את [משאבי קהילת MCP](https://modelcontextprotocol.io/)

## מה הלאה

- [5.14 הנדסת הקשר MCP](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->