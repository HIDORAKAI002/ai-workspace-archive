# יצירת לקוח עם LLM

עד כה, ראית כיצד ליצור שרת ולקוח. הלקוח הצליח לקרוא לשרת במפורש כדי לרשום את הכלים, המשאבים, וההנחיות שלו. עם זאת, זה לא גישה פרקטית במיוחד. המשתמשים שלך חיים בעידן הסוכנים ומצפים להשתמש בהנחיות ולתקשר עם LLM במקום זאת. הם לא מתעניינים אם אתה משתמש ב-MCP לאחסון היכולות שלך; הם פשוט מצפים לתקשר בשפה טבעית. אז איך פותרים את זה? הפתרון הוא להוסיף LLM ללקוח.

## סקירה כללית

בשיעור זה נתמקד בהוספת LLM ללקוח שלך ונראה כיצד זה מספק חווית משתמש הרבה יותר טובה.

## מטרות הלמידה

בסיום השיעור, תוכל:

- ליצור לקוח עם LLM.
- לתקשר בצורה חלקה עם שרת MCP באמצעות LLM.
- לספק חווית משתמש טובה יותר בצד הלקוח.

## גישה

בוא ננסה להבין את הגישה שעלינו לנקוט. הוספת LLM נראית פשוטה, אבל האם באמת נעשה זאת?

ככה הלקוח יתקשר עם השרת:

1. יצירת חיבור עם השרת.

1. רישום יכולות, הנחיות, משאבים וכלים, ושמירת הסכימה שלהם.

1. הוספת LLM והעברת היכולות והשכימות השמורות בפורמט שה-LLM מבין.

1. טיפול בהנחיית משתמש על ידי העברתה ל-LLM יחד עם הכלים שרשום הלקוח.

יופי, עכשיו כשאנחנו מבינים איך זה עובד ברמה גבוהה, בוא ננסה את זה בתרגיל למטה.

## תרגיל: יצירת לקוח עם LLM

בתרגיל זה, נלמד להוסיף LLM ללקוח שלנו.

### אימות באמצעות טוקן גישת GitHub אישי

יצירת טוקן GitHub היא תהליך פשוט. הנה איך לעשות את זה:

- עבור ל-GitHub Settings – לחץ על תמונת הפרופיל שלך בפינה העליונה מימין ובחר ב-Settings.
- עבור ל-Developer Settings – גלול למטה ולחץ על Developer Settings.
- בחר Personal Access Tokens – לחץ על Fine-grained tokens ואז Generate new token.
- הגדר את הטוקן שלך – הוסף הערה להתייחסות, קבע תאריך תפוגה, ובחר את ההרשאות הנדרשות (scopes). במקרה הזה, ודא להוסיף את הרשאת Models.
- צור והעתק את הטוקן – לחץ Generate token, וודא להעתיק אותו מיד, כי לא תוכל לראות אותו שוב.

### -1- התחבר לשרת

בוא ניצור קודם כל את הלקוח שלנו:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // ייבא zod לאימות הסכמה

class MCPClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", 
            apiKey: process.env.GITHUB_TOKEN,
        });

        this.client = new Client(
            {
                name: "example-client",
                version: "1.0.0"
            },
            {
                capabilities: {
                prompts: {},
                resources: {},
                tools: {}
                }
            }
            );    
    }
}
```

בקוד שלפני כן:

- ייבאנו את הספריות הנדרשות
- יצירת כיתה עם שני משתנים, `client` ו-`openai` שיעזרו לנו לנהל לקוח ולקיים אינטראקציה עם LLM בהתאמה.
- קונפיגרנו את מופע ה-LLM שלנו להשתמש ב-GitHub Models על ידי הגדרת `baseUrl` לפנות ל-API ההסקה.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# צור פרמטרים של שרת לחיבור stdio
server_params = StdioServerParameters(
    command="mcp",  # ניתן להפעלה
    args=["run", "server.py"],  # ארגומנטים אופציונליים בשורת הפקודה
    env=None,  # משתני סביבה אופציונליים
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # אתחל את החיבור
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

בקוד שלפני כן:

- ייבאנו את הספריות הנדרשות ל-MCP
- יצרנו לקוח

#### .NET

```csharp
using Azure;
using Azure.AI.Inference;
using Azure.Identity;
using System.Text.Json;
using ModelContextProtocol.Client;
using System.Text.Json;

var clientTransport = new StdioClientTransport(new()
{
    Name = "Demo Server",
    Command = "/workspaces/mcp-for-beginners/03-GettingStarted/02-client/solution/server/bin/Debug/net8.0/server",
    Arguments = [],
});

await using var mcpClient = await McpClient.CreateAsync(clientTransport);
```

#### Java

ראשית, תצטרך להוסיף את התלויות של LangChain4j לקובץ `pom.xml`. הוסף את התלויות הללו כדי לאפשר אינטגרציה עם MCP ותמיכה ב-GitHub Models:

```xml
<properties>
    <langchain4j.version>1.0.0-beta3</langchain4j.version>
</properties>

<dependencies>
    <!-- LangChain4j MCP Integration -->
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-mcp</artifactId>
        <version>${langchain4j.version}</version>
    </dependency>
    
    <!-- OpenAI Official API Client -->
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-open-ai-official</artifactId>
        <version>${langchain4j.version}</version>
    </dependency>
    
    <!-- GitHub Models Support -->
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-github-models</artifactId>
        <version>${langchain4j.version}</version>
    </dependency>
    
    <!-- Spring Boot Starter (optional, for production apps) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>
```

לאחר מכן צור את מחלקת הלקוח שלך ב-Java:

```java
import dev.langchain4j.mcp.McpToolProvider;
import dev.langchain4j.mcp.client.DefaultMcpClient;
import dev.langchain4j.mcp.client.McpClient;
import dev.langchain4j.mcp.client.transport.McpTransport;
import dev.langchain4j.mcp.client.transport.http.HttpMcpTransport;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.openaiofficial.OpenAiOfficialChatModel;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.service.tool.ToolProvider;

import java.time.Duration;
import java.util.List;

public class LangChain4jClient {
    
    public static void main(String[] args) throws Exception {        // הגדר את ה-LLM לשימוש במודלים של GitHub
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // צור תחבורה של MCP לחיבור לשרת
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // צור לקוח MCP
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

בקוד שלפני כן:

- **הוספנו את תלות LangChain4j**: נדרש לאינטגרציה עם MCP, לקוח רשמי של OpenAI, ותמיכה ב-GitHub Models
- **ייבאנו את ספריות LangChain4j**: לאינטגרציה עם MCP ופונקציונליות של דגם צ'אט OpenAI
- **יצרנו `ChatLanguageModel`**: מוגדר להשתמש ב-GitHub Models עם טוקן ה-GitHub שלך
- **הגדרנו העברת HTTP**: באמצעות אירועי שרת (SSE) להתחבר לשרת MCP
- **יצרנו לקוח MCP**: אשר יטפל בתקשורת עם השרת
- **השתמשנו בתמיכה המובנית של LangChain4j ב-MCP**: שמפשטת את האינטגרציה בין LLM לשרתים של MCP

#### Rust

בדוגמה זו מניחים שיש לך שרת MCP מבוסס Rust פעיל. אם אין לך, חזור לשיעור [01-first-server](../01-first-server/README.md) כדי ליצור את השרת.

לאחר שיש לך שרת MCP מבוסס Rust, פתח טרמינל ועבור לתיקייה שבה נמצא השרת. ואז הרץ את הפקודה הבאה כדי ליצור פרויקט לקוח LLM חדש:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

הוסף את התלויות הבאות ל-Cargo.toml שלך:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> אין ספריית Rust רשמית ל-OpenAI, עם זאת, ה-crate `async-openai` היא [ספריה שנשמרת על ידי הקהילה](https://platform.openai.com/docs/libraries/rust#rust) ונמצאת בשימוש שכיח.

פתח את קובץ `src/main.rs` והחלף את תוכנו בקוד הבא:

```rust
use async_openai::{Client, config::OpenAIConfig};
use rmcp::{
    RmcpError,
    model::{CallToolRequestParam, ListToolsResult},
    service::{RoleClient, RunningService, ServiceExt},
    transport::{ConfigureCommandExt, TokioChildProcess},
};
use serde_json::{Value, json};
use std::error::Error;
use tokio::process::Command;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    // הודעה התחלתית
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // הגדר לקוח OpenAI
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // הגדר לקוח MCP
    let server_dir = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .join("calculator-server");

    let mcp_client = ()
        .serve(
            TokioChildProcess::new(Command::new("cargo").configure(|cmd| {
                cmd.arg("run").current_dir(server_dir);
            }))
            .map_err(RmcpError::transport_creation::<TokioChildProcess>)?,
        )
        .await?;

    // לעשות: לקבל רשימת כלים של MCP

    // לעשות: שיחה עם LLM עם קריאות כלי

    Ok(())
}
```

הקוד מגדיר אפליקציית Rust בסיסית שתחבר לשרת MCP ו-GitHub Models עבור אינטראקציות LLM.

> [!IMPORTANT]
> הקפד להגדיר את משתנה הסביבה `OPENAI_API_KEY` עם טוקן ה-GitHub שלך לפני הרצת האפליקציה.

יופי, לשלב הבא, בוא נרשום את היכולות של השרת.

### -2- רישום יכולות השרת

כעת נחבר לשרת ונבקש את היכולות שלו:

#### Typescript

באותה מחלקה, הוסף את המתודות הבאות:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // רישום כלים
    const toolsResult = await this.client.listTools();
}
```

בקוד שלפני כן:

- הוספנו קוד לחיבור לשרת, `connectToServer`.
- יצרנו מתודת `run` שאחראית על ניהול זרימת האפליקציה שלנו. עד כה היא רק רושמת את הכלים אבל נוסיף לה עוד בהמשך.

#### Python

```python
# רשום את המשאבים הזמינים
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# רשום את הכלים הזמינים
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

הנה מה שהוספנו:

- רישום משאבים וכלים והדפסתם. עבור כלים רשמנו גם `inputSchema` שנשתמש בו מאוחר יותר.

#### .NET

```csharp
async Task<List<ChatCompletionsToolDefinition>> GetMcpTools()
{
    Console.WriteLine("Listing tools");
    var tools = await mcpClient.ListToolsAsync();

    List<ChatCompletionsToolDefinition> toolDefinitions = new List<ChatCompletionsToolDefinition>();

    foreach (var tool in tools)
    {
        Console.WriteLine($"Connected to server with tools: {tool.Name}");
        Console.WriteLine($"Tool description: {tool.Description}");
        Console.WriteLine($"Tool parameters: {tool.JsonSchema}");

        // TODO: convert tool definition from MCP tool to LLm tool     
    }

    return toolDefinitions;
}
```

בקוד שלפני כן:

- רשמנו את הכלים הזמינים ב-MCP Server
- עבור כל כלי, רשמנו את השם, התיאור והסכימה שלו. את האחרונה נשתמש כדי לקרוא לכלים בקרוב.

#### Java

```java
// צור ספק כלים שמגלה באופן אוטומטי כלים של MCP
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// ספק הכלים של MCP מטפל באופן אוטומטי ב:
// - רישום כלים זמינים משרת MCP
// - המרת סכמות כלי MCP לפורמט LangChain4j
// - ניהול הפעלת הכלים והתגובות
```

בקוד שלפני כן:

- יצרנו `McpToolProvider` שמגלה אוטומטית ורושם את כל הכלים משרת MCP
- ספק הכלים מטפל בהמרה בין סכימות הכלים של MCP לפורמט הכלים של LangChain4j פנימית
- גישה זו מסתירה את התהליך הידני של רישום הכלים והמרה שלהם

#### Rust

שליפת כלים משרת MCP מתבצעת באמצעות המתודה `list_tools`. בפונקציית `main` שלך, אחרי שהגדרת את לקוח MCP, הוסף את הקוד הבא:

```rust
// קבל רשימת כלי MCP
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- המרת יכולות השרת לכלים עבור LLM

השלב הבא אחרי רישום יכולות השרת הוא להמיר אותם לפורמט שה-LLM מבין. ברגע שנעשה זאת, נוכל לספק את היכולות הללו ככלים ל-LLM שלנו.

#### TypeScript

1. הוסף את הקוד הבא להמרת תגובה משרת MCP לפורמט כלי שה-LLM יכול להשתמש בו:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // צור סכימת זוד מבוססת על input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // הגדר במפורש סוג ל-"function"
            function: {
            name: tool.name,
            description: tool.description,
            parameters: {
            type: "object",
            properties: tool.input_schema.properties,
            required: tool.input_schema.required,
            },
            },
        };
    }

    ```

    הקוד שלמעלה לוקח תגובה משרת MCP וממיר אותה להגדרת כלי ש-LLM יכול להבין.

2. נעודכן עכשיו את המתודה `run` לרשום יכולות השרת:

    ```typescript
    async run() {
        console.log("Asking server for available tools");
        const toolsResult = await this.client.listTools();
        const tools = toolsResult.tools.map((tool) => {
            return this.openAiToolAdapter({
            name: tool.name,
            description: tool.description,
            input_schema: tool.inputSchema,
            });
        });
    }
    ```

    בקוד שלפני כן, עדכנו את המתודה `run` לעבור על התוצאה ולקרוא ל-`openAiToolAdapter` עבור כל פריט.

#### Python

1. קודם כל, ניצור את פונקציית ההמרה הבאה

    ```python
    def convert_to_llm_tool(tool):
        tool_schema = {
            "type": "function",
            "function": {
                "name": tool.name,
                "description": tool.description,
                "type": "function",
                "parameters": {
                    "type": "object",
                    "properties": tool.inputSchema["properties"]
                }
            }
        }

        return tool_schema
    ```

    בפונקציה הזו `convert_to_llm_tools` אנו לוקחים תגובת כלי MCP וממירים אותה לפורמט שה-LLM יכול להבין.

2. הבא, נעשה עדכון בקוד הלקוח שלנו כדי להשתמש בפונקציה כזו:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    כאן, אנחנו מוסיפים קריאה ל-`convert_to_llm_tool` כדי להמיר את תגובת כלי MCP למשהו שנוכל להעביר ל-LLM מאוחר יותר.

#### .NET

1. נוסיף קוד להמרת תגובת כלי MCP למשהו שה-LLM יכול להבין

```csharp
ChatCompletionsToolDefinition ConvertFrom(string name, string description, JsonElement jsonElement)
{ 
    // convert the tool to a function definition
    FunctionDefinition functionDefinition = new FunctionDefinition(name)
    {
        Description = description,
        Parameters = BinaryData.FromObjectAsJson(new
        {
            Type = "object",
            Properties = jsonElement
        },
        new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase })
    };

    // create a tool definition
    ChatCompletionsToolDefinition toolDefinition = new ChatCompletionsToolDefinition(functionDefinition);
    return toolDefinition;
}
```

בקוד שלפני כן:

- יצרנו פונקציה `ConvertFrom` המקבלת שם, תיאור וסכימת קלט.
- הגדיר פונקציונליות שיוצרת `FunctionDefinition` שנשלחת ל-`ChatCompletionsDefinition`. האחרון הוא משהו שה-LLM יכול להבין.

2. נראה כיצד נעשה עדכון לקוד קיים כדי לנצל את הפונקציה הזו:

    ```csharp
    async Task<List<ChatCompletionsToolDefinition>> GetMcpTools()
    {
        Console.WriteLine("Listing tools");
        var tools = await mcpClient.ListToolsAsync();

        List<ChatCompletionsToolDefinition> toolDefinitions = new List<ChatCompletionsToolDefinition>();

        foreach (var tool in tools)
        {
            Console.WriteLine($"Connected to server with tools: {tool.Name}");
            Console.WriteLine($"Tool description: {tool.Description}");
            Console.WriteLine($"Tool parameters: {tool.JsonSchema}");

            JsonElement propertiesElement;
            tool.JsonSchema.TryGetProperty("properties", out propertiesElement);

            var def = ConvertFrom(tool.Name, tool.Description, propertiesElement);
            Console.WriteLine($"Tool definition: {def}");
            toolDefinitions.Add(def);

            Console.WriteLine($"Properties: {propertiesElement}");        
        }

        return toolDefinitions;
    }
    ```    In the preceding code, we've:

    - Update the function to convert the MCP tool response to an LLm tool. Let's highlight the code we added:

        ```csharp
        JsonElement propertiesElement;
        tool.JsonSchema.TryGetProperty("properties", out propertiesElement);

        var def = ConvertFrom(tool.Name, tool.Description, propertiesElement);
        Console.WriteLine($"Tool definition: {def}");
        toolDefinitions.Add(def);
        ```

        The input schema is part of the tool response but on the "properties" attribute, so we need to extract. Furthermore, we now call `ConvertFrom` with the tool details. Now we've done the heavy lifting, let's see how it call comes together as we handle a user prompt next.

#### Java

```java
// צור ממשק בוט לאינטראקציה בשפה טבעית
public interface Bot {
    String chat(String prompt);
}

// הגדר את שירות ה-AI עם כלים LLM ו-MCP
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

בקוד שלפני כן:

- הגדרנו ממשק פשוט `Bot` לאינטראקציות בשפה טבעית
- השתמשנו ב-`AiServices` של LangChain4j לכבילה אוטומטית של ה-LLM עם ספק כלי MCP
- המסגרת מטפלת אוטומטית בהמרת סכימות הכלים וקיום קריאות פונקציה מאחורי הקלעים
- גישה זו מבטלת המרה ידנית של כלים - LangChain4j מנהל את כל המורכבות של המרת כלי MCP לפורמט תואם LLM

#### Rust

להמרת תגובת כלי MCP לפורמט שה-LLM יכול להבין, נוסיף פונקציית עזר שמעצבת את רשימת הכלים. הוסף את הקוד הבא ל-main.rs שלך מתחת לפונקציית `main`. פונקציה זו תוקרא בעת ביצוע בקשות ל-LLM:

```rust
async fn format_tools(tools: &ListToolsResult) -> Result<Vec<Value>, Box<dyn Error>> {
    let tools_json = serde_json::to_value(tools)?;
    let Some(tools_array) = tools_json.get("tools").and_then(|t| t.as_array()) else {
        return Ok(vec![]);
    };

    let formatted_tools = tools_array
        .iter()
        .filter_map(|tool| {
            let name = tool.get("name")?.as_str()?;
            let description = tool.get("description")?.as_str()?;
            let schema = tool.get("inputSchema")?;

            Some(json!({
                "type": "function",
                "function": {
                    "name": name,
                    "description": description,
                    "parameters": {
                        "type": "object",
                        "properties": schema.get("properties").unwrap_or(&json!({})),
                        "required": schema.get("required").unwrap_or(&json!([]))
                    }
                }
            }))
        })
        .collect();

    Ok(formatted_tools)
}
```

יופי, אנחנו מוכנים לטפל בבקשות משתמש, בוא נתקדם לשלב הבא.

### -4- טיפול בבקשת הנחיית משתמש

בחלק זה של הקוד נטפל בבקשות משתמש.

#### TypeScript

1. הוסף מתודה שתשמש לקריאה ל-LLM שלנו:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. קרא לכלי של השרת
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. עשה משהו עם התוצאה
        // TODO

        }
    }
    ```

    בקוד שלפני כן:

    - הוספנו את המתודה `callTools`.
    - המתודה מקבלת תגובת LLM ובודקת אילו כלים נקראו, אם בכלל:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // קריאה לכלי
        }
        ```

    - קורא לכלי, אם ה-LLM מציין שיש לקרוא לו:

        ```typescript
        // 2. קרא לכלי השרת
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. עשה משהו עם התוצאה
        // לעשייה
        ```

2. עדכן את מתודת `run` לכלול קריאות ל-LLM וקריאה ל-`callTools`:

    ```typescript

    // 1. צור הודעות שהן קלט עבור ה-LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. קריאה ל-LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. עבור על תגובת ה-LLM, עבור כל בחירה, בדוק אם יש לה קריאות לכלים
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

יופי, נרשום את הקוד במלואו:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // ייבא את zod לאימות הסכמה

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // ייתכן שיהיה צורך לשנות לכתובת אתר זו בעתיד: https://models.github.ai/inference
            apiKey: process.env.GITHUB_TOKEN,
        });

        this.client = new Client(
            {
                name: "example-client",
                version: "1.0.0"
            },
            {
                capabilities: {
                prompts: {},
                resources: {},
                tools: {}
                }
            }
            );    
    }

    async connectToServer(transport: Transport) {
        await this.client.connect(transport);
        this.run();
        console.error("MCPClient started on stdin/stdout");
    }

    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
          }) {
          // צור סכמת zod המבוססת על input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // קבע במפורש את סוג ל-"function"
            function: {
              name: tool.name,
              description: tool.description,
              parameters: {
              type: "object",
              properties: tool.input_schema.properties,
              required: tool.input_schema.required,
              },
            },
          };
    }
    
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
      ) {
        for (const tool_call of tool_calls) {
          const toolName = tool_call.function.name;
          const args = tool_call.function.arguments;
    
          console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);
    
    
          // 2. התקשר לכלי של השרת
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. עשה משהו עם התוצאה
          // TODO
    
         }
    }

    async run() {
        console.log("Asking server for available tools");
        const toolsResult = await this.client.listTools();
        const tools = toolsResult.tools.map((tool) => {
            return this.openAiToolAdapter({
              name: tool.name,
              description: tool.description,
              input_schema: tool.inputSchema,
            });
        });

        const prompt = "What is the sum of 2 and 3?";
    
        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

        console.log("Querying LLM: ", messages[0].content);
        let response = this.openai.chat.completions.create({
            model: "gpt-4.1-mini",
            max_tokens: 1000,
            messages,
            tools: tools,
        });    

        let results: any[] = [];
    
        // 3. עבור דרך תגובת ה-LLM, עבור כל אפשרות, בדוק אם יש לה קריאות לכלים
        (await response).choices.map(async (choice: { message: any; }) => {
          const message = choice.message;
          if (message.tool_calls) {
              console.log("Making tool call")
              await this.callTools(message.tool_calls, results);
          }
        });
    }
    
}

let client = new MyClient();
 const transport = new StdioClientTransport({
            command: "node",
            args: ["./build/index.js"]
        });

client.connectToServer(transport);
```

#### Python

1. נוסיף כמה ייבואלים הנדרשים לקריאה ל-LLM

    ```python
    # למ"מ
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. לאחר מכן נוסיף את הפונקציה שתבצע את הקריאה ל-LLM:

    ```python
    # מודל שפה גדול

    def call_llm(prompt, functions):
        token = os.environ["GITHUB_TOKEN"]
        endpoint = "https://models.inference.ai.azure.com"

        model_name = "gpt-4o"

        client = ChatCompletionsClient(
            endpoint=endpoint,
            credential=AzureKeyCredential(token),
        )

        print("CALLING LLM")
        response = client.complete(
            messages=[
                {
                "role": "system",
                "content": "You are a helpful assistant.",
                },
                {
                "role": "user",
                "content": prompt,
                },
            ],
            model=model_name,
            tools = functions,
            # פרמטרים אופציונליים
            temperature=1.,
            max_tokens=1000,
            top_p=1.    
        )

        response_message = response.choices[0].message
        
        functions_to_call = []

        if response_message.tool_calls:
            for tool_call in response_message.tool_calls:
                print("TOOL: ", tool_call)
                name = tool_call.function.name
                args = json.loads(tool_call.function.arguments)
                functions_to_call.append({ "name": name, "args": args })

        return functions_to_call
    ```

    בקוד שלפני כן:

    - העברנו ל-LLM את הפונקציות שמצאנו בשרת MCP והמרנו.
    - לאחר מכן קראנו ל-LLM עם הפונקציות האלה.
    - אח"כ בודקים את התוצאה כדי לראות אילו פונקציות כדאי לקרוא, אם בכלל.
    - בסוף, מעבירים מערך של פונקציות לקריאה.

3. שלב סופי, נעשה עדכון בקוד הראשי שלנו:

    ```python
    prompt = "Add 2 to 20"

    # שאל את ה-LLM אילו כלים יש להשתמש, אם בכלל
    functions_to_call = call_llm(prompt, functions)

    # קרא לפונקציות שהומלצו
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    כך, זה השלב הסופי, בקוד שלמעלה אנחנו:

    - קוראים לכלי MCP דרך `call_tool` עם פונקציה שה-LLM חשב שצריך לקרוא בהתאם להנחיה שלנו.
    - מדפיסים את תוצאת הקריאה לכלי בשרת MCP.

#### .NET

1. נראה קוד לבקשת הנחיית LLM:

    ```csharp
    var tools = await GetMcpTools();

    for (int i = 0; i < tools.Count; i++)
    {
        var tool = tools[i];
        Console.WriteLine($"MCP Tools def: {i}: {tool}");
    }

    // 0. Define the chat history and the user message
    var userMessage = "add 2 and 4";

    chatHistory.Add(new ChatRequestUserMessage(userMessage));

    // 1. Define tools
    ChatCompletionsToolDefinition def = CreateToolDefinition();


    // 2. Define options, including the tools
    var options = new ChatCompletionsOptions(chatHistory)
    {
        Model = "gpt-4.1-mini",
        Tools = { tools[0] }
    };

    // 3. Call the model  

    ChatCompletions? response = await client.CompleteAsync(options);
    var content = response.Content;

    ```

    בקוד שלפני כן:

    - הבאת כלים משרת MCP, `var tools = await GetMcpTools()`.
    - הגדרת הנחיית משתמש `userMessage`.
    - בניית אובייקט אפשרויות שמציין דגם וכלים.
    - ביצוע בקשה ל-LLM.

2. שלב אחרון, נבדוק אם ה-LLM חושב שצריך לקרוא פונקציה:

    ```csharp
    // 4. Check if the response contains a function call
    ChatCompletionsToolCall? calls = response.ToolCalls.FirstOrDefault();
    for (int i = 0; i < response.ToolCalls.Count; i++)
    {
        var call = response.ToolCalls[i];
        Console.WriteLine($"Tool call {i}: {call.Name} with arguments {call.Arguments}");
        //Tool call 0: add with arguments {"a":2,"b":4}

        var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(call.Arguments);
        var result = await mcpClient.CallToolAsync(
            call.Name,
            dict!,
            cancellationToken: CancellationToken.None
        );

        Console.WriteLine(result.Content.First(c => c.Type == "text").Text);

    }
    ```

    בקוד שלפני כן:

    - עברנו בלולאה על רשימת קריאות הפונקציה.
    - לכל קריאת כלי, פירוק שם וארגומנטים וקריאה לכלי בשרת MCP באמצעות לקוח MCP. בסיום מדפיסים את התוצאות.

הנה הקוד במלואו:

```csharp
using Azure;
using Azure.AI.Inference;
using Azure.Identity;
using System.Text.Json;
using ModelContextProtocol.Client;
using ModelContextProtocol.Protocol;

var endpoint = "https://models.inference.ai.azure.com";
var token = Environment.GetEnvironmentVariable("GITHUB_TOKEN"); // Your GitHub Access Token
var client = new ChatCompletionsClient(new Uri(endpoint), new AzureKeyCredential(token));
var chatHistory = new List<ChatRequestMessage>
{
    new ChatRequestSystemMessage("You are a helpful assistant that knows about AI")
};

var clientTransport = new StdioClientTransport(new()
{
    Name = "Demo Server",
    Command = "/workspaces/mcp-for-beginners/03-GettingStarted/02-client/solution/server/bin/Debug/net8.0/server",
    Arguments = [],
});

Console.WriteLine("Setting up stdio transport");

await using var mcpClient = await McpClient.CreateAsync(clientTransport);

ChatCompletionsToolDefinition ConvertFrom(string name, string description, JsonElement jsonElement)
{ 
    // convert the tool to a function definition
    FunctionDefinition functionDefinition = new FunctionDefinition(name)
    {
        Description = description,
        Parameters = BinaryData.FromObjectAsJson(new
        {
            Type = "object",
            Properties = jsonElement
        },
        new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase })
    };

    // create a tool definition
    ChatCompletionsToolDefinition toolDefinition = new ChatCompletionsToolDefinition(functionDefinition);
    return toolDefinition;
}



async Task<List<ChatCompletionsToolDefinition>> GetMcpTools()
{
    Console.WriteLine("Listing tools");
    var tools = await mcpClient.ListToolsAsync();

    List<ChatCompletionsToolDefinition> toolDefinitions = new List<ChatCompletionsToolDefinition>();

    foreach (var tool in tools)
    {
        Console.WriteLine($"Connected to server with tools: {tool.Name}");
        Console.WriteLine($"Tool description: {tool.Description}");
        Console.WriteLine($"Tool parameters: {tool.JsonSchema}");

        JsonElement propertiesElement;
        tool.JsonSchema.TryGetProperty("properties", out propertiesElement);

        var def = ConvertFrom(tool.Name, tool.Description, propertiesElement);
        Console.WriteLine($"Tool definition: {def}");
        toolDefinitions.Add(def);

        Console.WriteLine($"Properties: {propertiesElement}");        
    }

    return toolDefinitions;
}

// 1. List tools on mcp server

var tools = await GetMcpTools();
for (int i = 0; i < tools.Count; i++)
{
    var tool = tools[i];
    Console.WriteLine($"MCP Tools def: {i}: {tool}");
}

// 2. Define the chat history and the user message
var userMessage = "add 2 and 4";

chatHistory.Add(new ChatRequestUserMessage(userMessage));


// 3. Define options, including the tools
var options = new ChatCompletionsOptions(chatHistory)
{
    Model = "gpt-4.1-mini",
    Tools = { tools[0] }
};

// 4. Call the model  

ChatCompletions? response = await client.CompleteAsync(options);
var content = response.Content;

// 5. Check if the response contains a function call
ChatCompletionsToolCall? calls = response.ToolCalls.FirstOrDefault();
for (int i = 0; i < response.ToolCalls.Count; i++)
{
    var call = response.ToolCalls[i];
    Console.WriteLine($"Tool call {i}: {call.Name} with arguments {call.Arguments}");
    //Tool call 0: add with arguments {"a":2,"b":4}

    var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(call.Arguments);
    var result = await mcpClient.CallToolAsync(
        call.Name,
        dict!,
        cancellationToken: CancellationToken.None
    );

    Console.WriteLine(result.Content.OfType<TextContentBlock>().First().Text);

}

// 6. Print the generic response
Console.WriteLine($"Assistant response: {content}");
```

#### Java

```java
try {
    // בצע בקשות בשפה טבעית המשתמשות באופן אוטומטי בכלי MCP
    String response = bot.chat("Calculate the sum of 24.5 and 17.3 using the calculator service");
    System.out.println(response);

    response = bot.chat("What's the square root of 144?");
    System.out.println(response);

    response = bot.chat("Show me the help for the calculator service");
    System.out.println(response);
} finally {
    mcpClient.close();
}
```

בקוד שלפני כן:

- השתמשנו בהנחיות בשפה טבעית פשוטה לאינטראקציה עם כלי שרת MCP
- מסגרת LangChain4j מטפלת אוטומטית ב:
  - המרת הנחיות משתמש לקריאות כלים כשצריך
  - קריאה לכלי MCP המתאים על בסיס החלטת ה-LLM
  - ניהול זרימת השיחה בין ה-LLM לשרת MCP
- המתודה `bot.chat()` מחזירה תגובות בשפה טבעית שעשויות לכלול תוצאות מביצוע כלים של MCP
- גישה זו מספקת חווית משתמש חלקה שבה המשתמשים לא צריכים לדעת על מימוש MCP שמתחת

דוגמת קוד מלאה:

```java
public class LangChain4jClient {
    
    public static void main(String[] args) throws Exception {        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .timeout(Duration.ofSeconds(60))
                .build();

        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();

        ToolProvider toolProvider = McpToolProvider.builder()
                .mcpClients(List.of(mcpClient))
                .build();

        Bot bot = AiServices.builder(Bot.class)
                .chatLanguageModel(model)
                .toolProvider(toolProvider)
                .build();

        try {
            String response = bot.chat("Calculate the sum of 24.5 and 17.3 using the calculator service");
            System.out.println(response);

            response = bot.chat("What's the square root of 144?");
            System.out.println(response);

            response = bot.chat("Show me the help for the calculator service");
            System.out.println(response);
        } finally {
            mcpClient.close();
        }
    }
}
```

#### Rust

פה מרוכז רוב העבודה. נקרא ל-LLM עם הנחיית המשתמש הראשונית, ואז נעבד את התגובה כדי לראות אם יש צורך לקרוא לכלים. אם כן, נקרא לכלים ונמשיך בשיחה עם ה-LLM עד שלא יידרשו קריאות נוספות ויש לנו תגובה סופית.

נבצע מספר קריאות ל-LLM, אז נגדיר פונקציה שתטפל בקריאת ה-LLM. הוסף את הפונקציה הבאה ל-main.rs שלך:

```rust
async fn call_llm(
    client: &Client<OpenAIConfig>,
    messages: &[Value],
    tools: &ListToolsResult,
) -> Result<Value, Box<dyn Error>> {
    let response = client
        .completions()
        .create_byot(json!({
            "messages": messages,
            "model": "openai/gpt-4.1",
            "tools": format_tools(tools).await?,
        }))
        .await?;
    Ok(response)
}
```

פונקציה זו מקבלת את לקוח ה-LLM, רשימת הודעות (כולל הנחיית המשתמש), כלים משרת MCP, ושולחת בקשה ל-LLM המחזירה את התגובה.
התשובה מה-LLM תכיל מערך של `choices`. נצטרך לעבד את התוצאה כדי לראות אם קיימים `tool_calls`. זה מאפשר לנו לדעת שה-LLM מבקש שיקל על כלי מסוים להיקרא עם ארגומנטים. הוסף את הקוד הבא לתחתית קובץ `main.rs` שלך כדי להגדיר פונקציה לטיפול בתשובת ה-LLM:

```rust
async fn process_llm_response(
    llm_response: &Value,
    mcp_client: &RunningService<RoleClient, ()>,
    openai_client: &Client<OpenAIConfig>,
    mcp_tools: &ListToolsResult,
    messages: &mut Vec<Value>,
) -> Result<(), Box<dyn Error>> {
    let Some(message) = llm_response
        .get("choices")
        .and_then(|c| c.as_array())
        .and_then(|choices| choices.first())
        .and_then(|choice| choice.get("message"))
    else {
        return Ok(());
    };

    // הדפס תוכן אם זמין
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // טיפול בקריאות כלי
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // הוסף הודעת עוזר

        // בצע כל קריאת כלי
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // הוסף את תוצאת הכלי להודעות
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // המשך שיחה עם תוצאות הכלי
        let response = call_llm(openai_client, messages, mcp_tools).await?;
        Box::pin(process_llm_response(
            &response,
            mcp_client,
            openai_client,
            mcp_tools,
            messages,
        ))
        .await?;
    }
    Ok(())
}
```

אם קיימים `tool_calls`, הפונקציה מבצעת חילוץ של מידע על הכלי, קוראת לשרת MCP עם בקשת הכלי, ומוסיפה את התוצאות אל הודעות השיחה. לאחר מכן השיחה ממשיכה עם ה-LLM וההודעות מתעדכנות עם תגובת העוזר ותוצאות קריאת הכלי.

כדי לחלץ מידע על קריאת הכלי שה-LLM מחזיר עבור קריאות MCP, נוסיף פונקציית עזר נוספת לחלץ את כל מה שצריך כדי לבצע את הקריאה. הוסף את הקוד הבא לתחתית קובץ `main.rs` שלך:

```rust
fn extract_tool_call_info(tool_call: &Value) -> Result<(String, String, String), Box<dyn Error>> {
    let tool_id = tool_call
        .get("id")
        .and_then(|id| id.as_str())
        .unwrap_or("")
        .to_string();
    let function = tool_call.get("function").ok_or("Missing function")?;
    let name = function
        .get("name")
        .and_then(|n| n.as_str())
        .unwrap_or("")
        .to_string();
    let args = function
        .get("arguments")
        .and_then(|a| a.as_str())
        .unwrap_or("{}")
        .to_string();
    Ok((tool_id, name, args))
}
```

כעת, כשהכל מרכיבים במקום, נוכל לטפל בקריאת המשתמש ההתחלתית ולקרוא ל-LLM. עדכן את פונקציית `main` שלך לכלול את הקוד הבא:

```rust
// שיחה של LLM עם קריאות כלים
let response = call_llm(&openai_client, &messages, &tools).await?;
process_llm_response(
    &response,
    &mcp_client,
    &openai_client,
    &tools,
    &mut messages,
)
.await?;
```

זה ישאל את ה-LLM עם קריאת המשתמש ההתחלתית המבקשת סיכום של שני מספרים, ויעבד את התגובה כדי לטפל בצורה דינמית בקריאות לכלים.

מעולה, עשית את זה!

## מטלה

קח את הקוד מהתרגיל ובנה את השרת עם עוד כלים. לאחר מכן צור לקוח עם LLM, כמו בתרגיל, ובצע בדיקות עם פקודות שונות כדי לוודא שכל כלי השרת שלך נקרא דינמית. דרך הבנייה הזו של הלקוח משמעותה שלמשתמש הקצה תהיה חווית משתמש מעולה כיוון שהוא יכול להשתמש בפקודות חופשיות במקום פקודות מדויקות, ולהיות בלתי מודע לכל קריאה לשרת MCP.

## פתרון

[פתרון](./solution/README.md)

## נקודות מרכזיות

- הוספת LLM ללקוח שלך מספקת דרך טובה יותר למשתמשים לתקשר עם שרתי MCP.
- עליך להמיר את תגובת שרת MCP למשהו שה-LLM יכול להבין.

## דוגמאות

- [מחשבון ג'אווה](../samples/java/calculator/README.md)
- [מחשבון .Net](../../../../03-GettingStarted/samples/csharp)
- [מחשבון JavaScript](../samples/javascript/README.md)
- [מחשבון TypeScript](../samples/typescript/README.md)
- [מחשבון Python](../../../../03-GettingStarted/samples/python)
- [מחשבון Rust](../../../../03-GettingStarted/samples/rust)

## משאבים נוספים

## מה הלאה

- הבא: [צריכת שרת באמצעות Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->