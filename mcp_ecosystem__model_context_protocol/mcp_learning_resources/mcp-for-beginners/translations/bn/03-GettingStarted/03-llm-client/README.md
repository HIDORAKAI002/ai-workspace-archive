# LLM সহ ক্লায়েন্ট তৈরি করা

এখন পর্যন্ত, আপনি দেখেছেন কীভাবে একটি সার্ভার এবং একটি ক্লায়েন্ট তৈরি করতে হয়। ক্লায়েন্টটি স্পষ্টভাবে সার্ভারকে কল করতে পেরেছে যাতে তার টুলস, রিসোর্স এবং প্রম্পটগুলি তালিকাভুক্ত করা যায়। তবে, এটি খুবই ব্যবহারিক পদ্ধতি নয়। আপনার ব্যবহারকারীরা এজেন্টিক যুগে বাস করেন এবং তারা প্রম্পট ব্যবহার করতে এবং একটি LLM-এর সাথে যোগাযোগ করার প্রত্যাশা করেন। তারা এর কোনও ঝামেলা করে না যে আপনি MCP ব্যবহার করছেন আপনার সক্ষমতাগুলি সংরক্ষণ করার জন্য; তারা কেবল প্রাকৃতিক ভাষা ব্যবহার করে যোগাযোগ করতে চায়। তাহলে আমরা এটা কীভাবে সমাধান করব? সমাধান হলো ক্লায়েন্টে একটি LLM যোগ করা।

## সারসংক্ষেপ

এই পাঠে আমরা মনোযোগ দেবো ক্লায়েন্টে একটি LLM যোগ করতে এবং দেখাবো কীভাবে এটি আপনার ব্যবহারকারীর জন্য একটি অনেক ভালো অভিজ্ঞতা প্রদান করে।

## শেখার উদ্দেশ্যসমূহ

এই পাঠের শেষে, আপনি সক্ষম হবেন:

- একটি LLM সহ ক্লায়েন্ট তৈরি করতে।
- একটি MCP সার্ভারের সাথে একটি LLM ব্যবহার করে সহজে যোগাযোগ করতে।
- ক্লায়েন্ট পাশে একটি উন্নততর শেষ ব্যবহারকারীর অভিজ্ঞতা দিতে।

## পদ্ধতি

চলুন বুঝি আমরা কী পদ্ধতি গ্রহণ করব। একটি LLM যোগ করা সহজ শোনালেও, আমরা কি সেটি বাস্তবে করব?

ক্লায়েন্ট কিভাবে সার্ভারের সাথে ইন্টারঅ্যাক্ট করবে তা হলো:

1. সার্ভারের সাথে সংযোগ স্থাপন করা।

1. সক্ষমতা, প্রম্পট, রিসোর্স এবং টুলস তালিকাভুক্ত করা এবং তাদের স্কিমা সংরক্ষণ করা।

1. একটি LLM যোগ করা এবং সংরক্ষিত সক্ষমতা ও স্কিমা একটি উপায়ে LLM-কে দেওয়া যা সে বোঝে।

1. একটি ব্যবহারকারীর প্রম্পট হ্যান্ডেল করা এবং এটি LLM-কে প্রেরণ করা একসাথে ক্লায়েন্টের তালিকাভুক্ত টুলস পাঠিয়ে।

দারুণ, এখন আমরা উচ্চ স্তরে বুঝেছি কীভাবে এটি করা যায়, নিচের অনুশীলনে এটি চেষ্টা করি।

## অনুশীলন: একটি LLM সহ ক্লায়েন্ট তৈরি করা

এই অনুশীলনে, আমরা শিখব কীভাবে আমাদের ক্লায়েন্টে একটি LLM যোগ করতে হয়।

### GitHub পার্সোনাল অ্যাক্সেস টোকেন ব্যবহার করে প্রমাণীকরণ

GitHub টোকেন তৈরি করা একটি সরল প্রক্রিয়া। এটি কীভাবে করবেন:

- GitHub সেটিংসে যান – ওপর ডান কর্নারে আপনার প্রোফাইল ছবি ক্লিক করুন এবং সেটিংস নির্বাচন করুন।
- ডেভেলপার সেটিংসে যান – স্ক্রল করে নিচে ডেভেলপার সেটিংসে ক্লিক করুন।
- পার্সোনাল অ্যাক্সেস টোকেন নির্বাচন করুন – ফাইন-গ্রেইনড টোকেনস-এ ক্লিক করুন এবং তারপর নতুন টোকেন তৈরি করুন।
- আপনার টোকেন কনফিগার করুন – রেফারেন্সের জন্য একটি নোট যোগ করুন, একটি মেয়াদ নির্ধারণ করুন, এবং প্রয়োজনীয় স্কোপ (অনুমতিসমূহ) নির্বাচন করুন। এখানে অবশ্যই Models পারমিশন যোগ করতে ভুলবেন না।
- টোকেন তৈরি করুন এবং কপি করুন – জেনারেট টোকেন-এ ক্লিক করুন এবং তা অবিলম্বে কপি করে নিন, কারণ পরে এটি আর দেখতে পাবেন না।

### -1- সার্ভারের সাথে সংযোগ করা

আসুন প্রথমে আমাদের ক্লায়েন্ট তৈরি করি:

#### টাইপসক্রিপ্ট

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // স্কিমা ভ্যালিডেশনের জন্য zod ইমপোর্ট করুন

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

উপরের কোডে আমরা:

- প্রয়োজনীয় লাইব্রেরিগুলো ইম্পোর্ট করেছি
- একটি ক্লাস তৈরি করেছি যার দুইটি সদস্য রয়েছে, `client` এবং `openai`, যেগুলো যথাক্রমে একটি ক্লায়েন্ট পরিচালনা করতে এবং একটি LLM-এর সাথে ইন্টারঅ্যাক্ট করতে সাহায্য করবে।
- আমাদের LLM ইনস্ট্যান্স কনফিগার করেছি GitHub Models ব্যবহার করার জন্য, `baseUrl` সেট করে যা ইনফারেন্স এপিআই নির্দেশ করে।

#### পাইথন

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdio সংযোগের জন্য সার্ভার প্যারামিটার তৈরি করুন
server_params = StdioServerParameters(
    command="mcp",  # 실행যোগ্য
    args=["run", "server.py"],  # ঐচ্ছিক কমান্ড লাইন আর্গুমেন্ট
    env=None,  # ঐচ্ছিক পরিবেশ ভেরিয়েবল
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # সংযোগ আরম্ভ করুন
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

উপরের কোডে আমরা:

- MCP এর জন্য প্রয়োজনীয় লাইব্রেরি ইম্পোর্ট করেছি
- একটি ক্লায়েন্ট তৈরি করেছি

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

#### জাভা

প্রথমে, আপনাকে আপনার `pom.xml` ফাইলে LangChain4j ডিপেন্ডেন্সিগুলি যোগ করতে হবে। MCP ইন্টিগ্রেশন এবং GitHub Models সাপোর্ট সক্ষম করতে এই ডিপেন্ডেন্সিগুলো যোগ করুন:

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

তারপর আপনার জাভা ক্লায়েন্ট ক্লাস তৈরি করুন:

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
    
    public static void main(String[] args) throws Exception {        // LLM কে GitHub মডেল ব্যবহার করার জন্য কনফিগার করুন
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // সার্ভারে সংযোগের জন্য MCP ট্রান্সপোর্ট তৈরি করুন
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP ক্লায়েন্ট তৈরি করুন
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

উপরের কোডে আমরা:

- **LangChain4j ডিপেন্ডেন্সি যোগ করেছি**: MCP ইন্টিগ্রেশন, OpenAI অফিসিয়াল ক্লায়েন্ট এবং GitHub Models সাপোর্টের জন্য
- **LangChain4j লাইব্রেরি ইম্পোর্ট করেছি**: MCP ইন্টিগ্রেশন এবং OpenAI চ্যাট মডেল কার্যকারিতার জন্য
- **একটি `ChatLanguageModel` তৈরি করেছি**: GitHub Models ব্যবহার করার জন্য আপনার GitHub টোকেন সহ কনফিগার করা হয়েছে
- **HTTP ট্রান্সপোর্ট সেটআপ করেছি**: MCP সার্ভারের সাথে সংযোগের জন্য Server-Sent Events (SSE) ব্যবহার করে
- **একটি MCP ক্লায়েন্ট তৈরি করেছি**: যেটি সার্ভারের সাথে যোগাযোগ পরিচালনা করবে
- **LangChain4j এর বিল্ট-ইন MCP সাপোর্ট ব্যবহার করেছি**: যা LLM এবং MCP সার্ভারের মধ্যে ইন্টিগ্রেশন সহজ করে তোলে

#### রাস্ট

এই উদাহরণে ধরে নেওয়া হয়েছে আপনার কাছে একটি রাস্ট ভিত্তিক MCP সার্ভার চলছে। যদি না থাকে, তাহলে [01-first-server](../01-first-server/README.md) পাঠে ফিরে গিয়ে সার্ভার তৈরি করুন।

আপনার রাস্ট MCP সার্ভার থাকার পরে, একটি টার্মিনাল খুলুন এবং সার্ভারের একই ডিরেক্টরিতে যান। এরপর নীচের কমান্ডটি চালিয়ে একটি নতুন LLM ক্লায়েন্ট প্রকল্প তৈরি করুন:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

আপনার `Cargo.toml` ফাইলে নিচের নির্ভরতাগুলো যোগ করুন:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> OpenAI এর জন্য অফিসিয়াল কোনো রাস্ট লাইব্রেরি নেই, তবে `async-openai` ক্রেট একটি [কমিউনিটি রক্ষণাবেক্ষিত লাইব্রেরি](https://platform.openai.com/docs/libraries/rust#rust) যা ব্যাপক ব্যবহৃত।

`src/main.rs` ফাইলটি খুলুন এবং এর বিষয়বস্তু নিচের কোড দিয়ে প্রতিস্থাপন করুন:

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
    // প্রাথমিক বার্তা
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI ক্লায়েন্ট সেটআপ
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP ক্লায়েন্ট সেটআপ
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

    // TODO: MCP টুল তালিকা পান

    // TODO: টুল কল সহ LLM কথোপকথন

    Ok(())
}
```

এই কোড একটি বেসিক রাস্ট অ্যাপ্লিকেশন সেটআপ করে যা MCP সার্ভার এবং GitHub Models এর সাথে LLM যোগাযোগ স্থাপন করবে।

> [!IMPORTANT]
> অ্যাপ্লিকেশন চালানোর আগে অবশ্যই `OPENAI_API_KEY` পরিবেশ ভেরিয়েবলে আপনার GitHub টোকেন সেট করুন।

দারুণ, আমাদের পরবর্তী ধাপ হলো সার্ভারের সক্ষমতাগুলি তালিকাভুক্ত করা।

### -2- সার্ভারের সক্ষমতাগুলি তালিকাভুক্ত করা

এখন আমরা সার্ভারের সাথে সংযোগ করব এবং তার সক্ষমতাগুলি জানতে চাইব:

#### টাইপসক্রিপ্ট

একই ক্লাসে, নিম্নলিখিত মেথডগুলো যোগ করুন:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // সরঞ্জাম তালিকা তৈরি করছে
    const toolsResult = await this.client.listTools();
}
```

উপরের কোডে আমরা:

- সার্ভারের সাথে সংযোগের জন্য `connectToServer` কোড যোগ করেছি।
- একটি `run` মেথড তৈরি করেছি যা অ্যাপ ফ্লো পরিচালনা করে। আপাতত এটি শুধু টুলস তালিকাভুক্ত করে, কিন্তু শীঘ্রই আমরা এখানে আরও যুক্ত করব।

#### পাইথন

```python
# উপলব্ধ সম্পদ তালিকা করুন
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# উপলব্ধ সরঞ্জাম তালিকা করুন
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

আমরা যা করেছি:

- রিসোর্স এবং টুলস তালিকাভুক্ত করেছি এবং প্রিন্ট করেছি। টুলসমূহের জন্য আমরা `inputSchema` ও তালিকাভুক্ত করেছি যা পরে ব্যবহার করব।

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

উপরের কোডে আমরা:

- MCP সার্ভারে উপলব্ধ টুলস তালিকাভুক্ত করেছি
- প্রতিটি টুলের নাম, বর্ণনা এবং তার স্কিমা তালিকাভুক্ত করেছি। পরবর্তীতে এটি টুল কল করার জন্য ব্যবহার করব।

#### জাভা

```java
// একটি টুল প্রদানকারী তৈরি করুন যা স্বয়ংক্রিয়ভাবে MCP টুলগুলি আবিষ্কার করে
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP টুল প্রদানকারী স্বয়ংক্রিয়ভাবে পরিচালনা করে:
// - MCP সার্ভার থেকে উপলভ্য টুলগুলির তালিকা
// - MCP টুল স্কিমাগুলি LangChain4j ফরম্যাটে রূপান্তর করা
// - টুলের কার্যকরকরণ এবং প্রতিক্রিয়াগুলির পরিচালনা
```

উপরের কোডে আমরা:

- একটি `McpToolProvider` তৈরি করেছি যা স্বয়ংক্রিয়ভাবে MCP সার্ভার থেকে সব টুল আবিষ্কার এবং নিবন্ধন করে
- টুল প্রোভাইডার MCP টুল স্কিমা এবং LangChain4j এর টুল ফরম্যাটের মধ্যে রূপান্তর নিয়ন্ত্রণ করে
- এই পদ্ধতি ম্যানুয়াল টুল তালিকা ও রূপান্তর থেকে মুক্তি দেয়

#### রাস্ট

MCP সার্ভার থেকে টুলস পুনরুদ্ধার করা হয় `list_tools` মেথড ব্যবহার করে। আপনার `main` ফাংশনে MCP ক্লায়েন্ট সেটআপ করার পর নিচের কোড যোগ করুন:

```rust
// MCP টুল তালিকা পান
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- সার্ভারের সক্ষমতাগুলো LLM টুলসে রূপান্তর করা

পরবর্তী ধাপ হলো সার্ভারের সক্ষমতাগুলোকে এমন একটি ফরম্যাটে রূপান্তর করা যা LLM বুঝতে পারে। একবার এটি করলে, আমরা এই সক্ষমতাগুলো LLM এর টুলস হিসেবে ব্যবহার করতে পারব।

#### টাইপসক্রিপ্ট

1. MCP সার্ভারের রেসপন্সকে এমন টুল ফরম্যাটে রূপান্তর করার জন্য নিচের কোড যোগ করুন যা LLM ব্যবহার করতে পারে:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // ইনপুট_স্কিমার উপর ভিত্তি করে একটি জোড স্কিমা তৈরি করুন
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // স্পষ্টভাবে টাইপ "ফাংশন" সেট করুন
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

    উপরের কোড MCP সার্ভারের রেসপন্স গ্রহণ করে এবং সেটি LLM বুঝতে পারা টুল ডেফিনিশনে রূপান্তর করে।

2. পরবর্তী, `run` মেথড আপডেট করে সার্ভারের সক্ষমতাগুলি তালিকাভুক্ত করি:

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

    উপরের কোডে, `run` মেথড আপডেট করেছি যাতে রেজাল্টের প্রতি এন্ট্রিতে `openAiToolAdapter` কল করা হয়।

#### পাইথন

1. প্রথমে নিম্নলিখিত কনভার্টার ফাংশন তৈরি করি

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

    উপরের ফাংশনে `convert_to_llm_tools` MCP টুল রেসপন্সকে এমন ফরম্যাটে রূপান্তর করে যা LLM বুঝতে পারে।

2. এরপর, ক্লায়েন্ট কোড আপডেট করে এই ফাংশন ব্যবহার করি:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    এখানে আমরা MCP টুল রেসপন্স রূপান্তরের জন্য `convert_to_llm_tool` কল যোগ করেছি যাতে এটি LLM কে প্রদান করা যায়।

#### .NET

1. MCP টুল রেসপন্সকে LLM বুঝতে পারার মতো ফরম্যাটে রূপান্তর করার কোড যোগ করি:

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

উপরের কোডে আমরা:

- `ConvertFrom` নামে একটি ফাংশন তৈরি করেছি যা নাম, বর্ণনা এবং ইনপুট স্কিমা নেয়।
- একটি FunctionDefinition তৈরি করার জন্য যা ChatCompletionsDefinition এ যায়, যা LLM বুঝতে পারে।

2. এখন এই ফাংশনটি ব্যবহার করতে বিদ্যমান কোড আপডেট করি:

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

#### জাভা

```java
// প্রাকৃতিক ভাষা আলাপচারিতার জন্য একটি বট ইন্টারফেস তৈরি করুন
public interface Bot {
    String chat(String prompt);
}

// LLM এবং MCP সরঞ্জাম সহ AI পরিষেবা কনফিগার করুন
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

উপরের কোডে আমরা:

- প্রাকৃতিক ভাষায় যোগাযোগের জন্য একটি সাধারণ `Bot` ইন্টারফেস সংজ্ঞায়িত করেছি
- LangChain4j এর `AiServices` ব্যবহার করেছি LLM এবং MCP টুল প্রোভাইডারকে স্বয়ংক্রিয়ভাবে যুক্ত করতে
- ফ্রেমওয়ার্ক স্বয়ংক্রিয়ভাবে টুল স্কিমা রূপান্তর এবং ফাংশন কলিং হ্যান্ডেল করে
- এই পদ্ধতি ম্যানুয়াল টুল রূপান্তর দূর করে - LangChain4j MCP টুলসকে LLM-অনুকূল ফরম্যাটে রূপান্তর করার সমস্ত জটিলতা হ্যান্ডেল করে

#### রাস্ট

MCP টুল রেসপন্সকে LLM বুঝার ফরম্যাটে রূপান্তর করতে আমরা একটি হেল্পার ফাংশন যোগ করব যা টুলস তালিকাকে ফরম্যাট করবে। আপনার `main.rs` ফাইলে `main` ফাংশনের নিচে নিচের কোড যোগ করুন। এটি LLM কে রিকোয়েস্ট করার সময় কল করা হবে:

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

দারুণ, এখন আমরা ব্যবহারকারীর অনুরোধ হ্যান্ডেল করার জন্য প্রস্তুত, তাই এটিই পরবর্তী ধাপ।

### -4- ব্যবহারকারীর প্রম্পট হ্যান্ডেল করা

কোডের এই অংশে, আমরা ব্যবহারকারীর অনুরোধ হ্যান্ডেল করব।

#### টাইপসক্রিপ্ট

1. একটি মেথড যোগ করুন যা আমাদের LLM কল করার জন্য ব্যবহৃত হবে:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // ২. সার্ভারের টুল কল করুন
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ৩. ফলাফলের সাথে কিছু করুন
        // TODO

        }
    }
    ```

    উপরের কোডে আমরা:

    - একটি মেথড `callTools` যোগ করেছি।
    - মেথডটি LLM রেসপন্স গ্রহণ করে দেখে কোন টুল কল হয়েছে কি না:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // কল টুল
        }
        ```

    - যদি LLM নির্দেশ করে টুল কল করতে, তাহলে সেই টুল কল করুন:

        ```typescript
        // ২. সার্ভারের টুল কল করুন
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // ৩. ফলাফল নিয়ে কিছু করুন
        // করণীয়
        ```

2. `run` মেথড আপডেট করুন যাতে LLM কল এবং `callTools` কল অন্তর্ভুক্ত হয়:

    ```typescript

    // 1. বার্তাগুলি তৈরি করুন যা LLM-এর ইনপুট
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. LLM কল করা হচ্ছে
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. LLM-এর প্রতিক্রিয়া যাচাই করুন, প্রতিটি পছন্দের জন্য দেখুন এটা টুল কল রয়েছে কিনা
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

দারুণ, পুরো কোডটি নিচে দেওয়া হলো:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // স্কিমা যাচাইয়ের জন্য zod আমদানি করুন

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // ভবিষ্যতে এই URL টি পরিবর্তন করতে হতে পারে: https://models.github.ai/inference
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
          // ইনপুট_স্কিমার উপর ভিত্তি করে একটি zod স্কিমা তৈরি করুন
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // স্পষ্টভাবে টাইপকে "function" সেট করুন
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
    
    
          // 2. সার্ভারের টুল কল করুন
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. ফলাফলের সাথে কিছু করুন
          // করণীয়
    
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
    
        // 3. LLM প্রতিক্রিয়ার মাধ্যমে যান, প্রতিটি পছন্দের জন্য, দেখুন এতে টুল কল আছে কিনা
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

#### পাইথন

1. LLM কল করার জন্য প্রয়োজনীয় কিছু ইম্পোর্ট যোগ করি

    ```python
    # এলএলএম
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. LLM কল করার ফাংশন যোগ করি:

    ```python
    # এলএলএম

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
            # ঐচ্ছিক প্যারামিটারসমূহ
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

    উপরের কোডে আমরা:

    - MCP সার্ভারে পাওয়া এবং রূপান্তরিত ফাংশনগুলো LLM কে পাস করেছি।
    - তারপর ঐ ফাংশনগুলো দিয়ে LLM কে কল করেছি।
    - ফলাফল পরিদর্শন করেছি দেখে কোন ফাংশন কল করা উচিত কি না।
    - অবশেষে, কল করার জন্য ফাংশনগুলোর অ্যারে পাস করেছি।

3. শেষ ধাপ, মূল কোড আপডেট করি:

    ```python
    prompt = "Add 2 to 20"

    # LLM কে জিজ্ঞাসা করুন কোন টুলস প্রয়োজন, যদি থাকে
    functions_to_call = call_llm(prompt, functions)

    # প্রস্তাবিত ফাংশনগুলিকে কল করুন
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    উপরের কোডে আমরা:

    - `call_tool` দিয়ে MCP টুল কল করছি যেটি LLM সিদ্ধান্ত অনুসারে কল করা উচিৎ।
    - MCP সার্ভারে টুল কলের ফলাফল প্রিন্ট করছি।

#### .NET

1. LLM প্রম্পট রিকোয়েস্টের কোড দেখাই:

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

    উপরের কোডে আমরা:

    - MCP সার্ভার থেকে টুলস ফেচ করেছি, `var tools = await GetMcpTools()`.
    - ব্যবহারকারীর প্রম্পট নির্ধারণ করেছি `userMessage`.
    - মডেল এবং টুলস নির্দিষ্ট করে একটি অপশন অবজেক্ট তৈরি করেছি।
    - LLM এর দিকে রিকোয়েস্ট পাঠিয়েছি।

2. শেষ ধাপ, দেখি LLM কি কোন ফাংশন কল করা উচিত মনে করে:

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

    উপরের কোডে আমরা:

    - ফাংশন কলের তালিকা লুপ করেছি।
    - প্রতিটি টুল কলের জন্য নাম এবং আর্গুমেন্ট পার্স করে MCP ক্লায়েন্ট ব্যবহার করে টুল কল করেছি। শেষে ফলাফল প্রিন্ট করেছি।

পুরো কোড নিচে দেওয়া হলো:

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

#### জাভা

```java
try {
    // স্বয়ংক্রিয়ভাবে MCP টুল ব্যবহার করে প্রাকৃতিক ভাষার অনুরোধ সম্পাদন করুন
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

উপরের কোডে আমরা:

- MCP সার্ভারের টুলসের সাথে সহজ প্রাকৃতিক ভাষা প্রম্পট ব্যবহার করেছি
- LangChain4j ফ্রেমওয়ার্ক স্বয়ংক্রিয়ভাবে:
  - প্রয়োজনে ব্যবহারকারীর প্রম্পটকে টুল কল এ রূপান্তর করে
  - LLM-এর সিদ্ধান্ত অনুযায়ী MCP টুলস কল করে
  - LLM এবং MCP সার্ভারের মধ্যে কথোপকথন প্রবাহ পরিচালনা করে
- `bot.chat()` মেথড প্রাকৃতিক ভাষার উত্তর দেয় যা MCP টুল এক্সিকিউশনের ফলাফলও অন্তর্ভুক্ত করতে পারে
- এই পদ্ধতি ব্যবহারকারীদের জন্য একটি সিমলেস অভিজ্ঞতা প্রদান করে যেখানে তাদের MCP এর অন্তর্নিহিত বাস্তবায়ন জানতে হয় না

সম্পূর্ণ কোড উদাহরণ:

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

#### রাস্ট

এখানেই অধিকাংশ কাজ হয়। আমরা প্রথমে ব্যবহারকারীর প্রাথমিক প্রম্পট সহ LLM কল করব, তারপর রেসপন্স বিশ্লেষণ করব যদি কোন টুল কল করতে হয়। হয়তো কল করতে হবে, তাহলে সেগুলো কল করব এবং কথোপকথন চালিয়ে যাব LLM এর সাথে যতক্ষণ না আর কোন টুল কলের প্রয়োজন হয় না এবং আমাদের একটি চূড়ান্ত উত্তর আসে।

আমরা LLM এ একাধিক কল করব, তাই একটি ফাংশন ডিফাইন করি যা LLM কল হ্যান্ডেল করবে। আপনার `main.rs` ফাইলে নিচের ফাংশনটি যোগ করুন:

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

এই ফাংশনটি LLM ক্লায়েন্ট, মেসেজের তালিকা (ব্যবহারকারীর প্রম্পটসহ), MCP সার্ভারের টুলস নেয় এবং LLM কে রিকোয়েস্ট পাঠায়, রেসপন্স রিটার্ন করে।
LLM থেকে প্রাপ্ত রেসপন্সে একটি `choices` অ্যারে থাকবে। আমাদের ফলাফলটি প্রক্রিয়াকরণ করতে হবে যাতে দেখতে পারি কোনো `tool_calls` উপস্থিত আছে কিনা। এটি আমাদের জানান দেবে যে LLM নির্দিষ্ট কোনো টুল কল করার জন্য আর্গুমেন্ট সহ অনুরোধ করছে। `main.rs` ফাইলের নিচে নিম্নলিখিত কোড যোগ করুন একটি ফাংশন সংজ্ঞায়িত করার জন্য যা LLM রেসপন্স হ্যান্ডেল করবে:

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

    // কনটেন্ট পাওয়া গেলে মুদ্রণ করুন
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // টুল কলগুলি পরিচালনা করুন
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // সহকারী বার্তা যুক্ত করুন

        // প্রতিটি টুল কল কার্যকর করুন
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // বার্তাসমূহে টুল ফলাফল যুক্ত করুন
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // টুল ফলাফল নিয়ে কথোপকথন চালিয়ে যান
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

যদি `tool_calls` উপস্থিত থাকে, এটি টুলের তথ্য বের করে, টুল রিকোয়েস্ট সহ MCP সার্ভারে কল করে, এবং ফলাফলগুলি কনভারসেশন মেসেজে যোগ করে। পরে এটি LLM এর সাথে কথোপকথন চালিয়ে যায় এবং মেসেজগুলি আপডেট হয় সহকারী উত্তর এবং টুল কল ফলাফল সহ।

LM থেকে MCP কলগুলির জন্য টুল কল তথ্য বের করার জন্য আমরা আরেকটি সাহায্যকারী ফাংশন যোগ করব যা কল করার জন্য প্রয়োজনীয় সবকিছু বের করবে। `main.rs` ফাইলের নিচে নিম্নলিখিত কোড যোগ করুন:

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

সব অংশ প্রস্তুত, এখন আমরা প্রাথমিক ইউজার প্রম্পট হ্যান্ডেল করতে পারব এবং LLM কল করব। আপনার `main` ফাংশন আপডেট করুন নিম্নলিখিত কোড সহ:

```rust
// টুল কল সহ এলএলএম কথোপকথন
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

এটি প্রাথমিক ইউজার প্রম্পট দিয়ে LLM কে জিজ্ঞাসা করবে দুটি সংখ্যার যোগফল সম্পর্কে, এবং টুল কল ডায়নামিকভাবে হ্যান্ডেল করার জন্য রেসপন্স প্রক্রিয়াকরণ করবে।

দারুণ, আপনি এটি সম্পন্ন করেছেন!

## অ্যাসাইনমেন্ট

ব্যায়াম থেকে কোড নিয়ে সার্ভারটি আরও কিছু টুল সহ তৈরি করুন। তারপর একটি ক্লায়েন্ট তৈরি করুন LLM সহ, যেমন ব্যায়ামে ছিল, এবং বিভিন্ন প্রম্পট দিয়ে পরীক্ষা করুন যাতে নিশ্চিত হওয়া যায় আপনার সব সার্ভার টুল ডায়নামিকভাবে কল হচ্ছে। এই ধরণের ক্লায়েন্ট নির্মাণ অর্থ হলো শেষ ব্যবহারকারীর জন্য একটি চমৎকার ব্যবহারকারীর অভিজ্ঞতা থাকবে কারণ তারা প্রম্পট ব্যবহার করতে পারবে, সঠিক ক্লায়েন্ট কমান্ডের পরিবর্তে, এবং MCP সার্ভার কল হওয়া সম্পর্কে সচেতন থাকবে না।

## সমাধান

[Solution](./solution/README.md)

## মূল বক্তব্য

- আপনার ক্লায়েন্টে একটি LLM যোগ করলে MCP সার্ভারগুলির সাথে ব্যবহারকারীদের ইন্টারঅ্যাকশন আরও ভালো হয়।
- MCP সার্ভার রেসপন্স এমন কিছুতে রূপান্তর করতে হবে যা LLM বুঝতে পারে।

## নমুনা

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## অতিরিক্ত সম্পদ

## পরবর্তী কি

- পরবর্তী: [Visual Studio Code ব্যবহার করে একটি সার্ভার কনজিউম করা](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->