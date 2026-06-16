# LLM ഉപയോഗിച്ച് ഒരു ക്ലയന്റ് സൃഷ്ടിക്കല്‍

ഇതുവരെ, നിങ്ങള്‍ ഒരു സെര്‍വറും ഒരു ക്ലയന്റും എങ്ങനെ സൃഷ്ടിക്കാമെന്ന് കണ്ടു. ക്ലയന്റ് സെര്‍വറിന്റെ ഉപകരണങ്ങള്‍, സ്രോതസ്സ്, പ്രോംപ്റ്റുകള്‍ വ്യക്തമാക്കിയിട്ട് സെര്‍വറിനെ വിളിച്ചറിയിക്കാനായിട്ടുണ്ട്. എന്നിരുന്നാലും, ഇത് വളരെ പ്രായോഗികമല്ല. നിങ്ങളുടെ ഉപയോക്താക്കള്‍ ഏജന്റ് കാലഘട്ടത്തില്‍ ജീവിക്കുന്നു, പ്രോംപ്റ്റുകളും LLM സന്നിഹിതവും ആശയവിനിമയം നടത്താനാണ് അവര്‍ പ്രതീക്ഷിക്കുന്നത്. അവരുടെ കഴിവുകള്‍ സൂക്ഷിക്കാന്‍ MCP ഉപയോഗിക്കണമെന്ന് അവര്‍ കണക്കാക്കുന്നില്ല; അവർ സ്വാഭാവിക ഭാഷ ഉപയോഗിച്ച് മാത്രമേ ആശയവിനിമയം നടത്താനാകൂ. എങ്കില്‍ ഇത് എങ്ങനെ പരിഹരിക്കാം? പരിഹാരം LLM ക്ലയന്റിലേക്കു കൂട്ടിച്ചേരുന്നതാണ്.

## അവലോകനം

ഈ പാഠത്തില്‍ നാം ക്ലയന്റില്‍ LLM ചേര്‍ക്കുന്നതില്‍ ശ്രദ്ധ കേന്ദ്രീകരിക്കുകയും അത് നിങ്ങളുടെ ഉപയോക്താവിന് വളരെ മൂല്യവത്തായ അനുഭവം നല്‍കുന്നതെങ്ങനെ ഉള്ളതെന്ന് കാണിക്കുകയും ചെയ്യും.

## പഠന ലക്ഷ്യങ്ങള്‍

ഈ പാഠം പൂര്‍ത്തിയാകുമ്പോള്‍, നിങ്ങൾ കഴിയും:

- LLM ഉള്ള ഒരു ക്ലയന്റ് സൃഷ്ടിക്കുക.
- LLM ഉപയോഗിച്ച് MCP സെര്‍വറുമായി സുതാര്യമാകും ആശയവിനിമയം നടത്തുക.
- ക്ലയന്റ് വശത്തു നല്ല ഉപയോക്തൃ അനുഭവം നല്‍കുക.

## സമീപനം

നാം സ്വീകരിക്കേണ്ട സമീപനം മനസിലാക്കാം. LLM ചേര്‍ക്കുന്നത് എളുപ്പമാണ്, പക്ഷേ നാം അത് എങ്ങനെ നടപ്പിലാക്കും?

ക്ലയന്റ് സെര്‍വറുമായി ഇങ്ങനെ ആയിരിക്കും ആശയവിനിമയം:

1. സെര്‍വറുമായി ബന്ധം സ്ഥാപിക്കുക.

1. കഴിവുകള്‍, പ്രോംപ്റ്റുകള്‍, സ്രോതസ്സുകളും ഉപകരണങ്ങളും നമ്പറിൽ സൂക്ഷിക്കുക.

1. LLM ചേർക്കുകയും സൂക്ഷിച്ച കഴിവുകൾ LLM മനസ്സിലാകുന്ന രീതിയിൽ അയയ്ക്കുകയും ചെയ്യുക.

1. ഉപയോക്തൃ പ്രോംപ്റ്റ് LLM-ന് നൽകുകയും ക്ലയന്റിനും LLM-നും ഇല്ലാതാകാതെ ഉപകരണങ്ങള്‍ കൈകാര്യം ചെയ്യുകയും ചെയ്യുക.

നല്ലതു, ഇപ്പോൾ മുകളിലുള്ളത് എങ്ങനെ ചെയ്യാമെന്ന് നമുക്ക് മനസ്സിലായി, താഴെ നൽകിയിരിക്കുന്ന അഭ്യാസത്തിൽ ഇത് പരീക്ഷിക്കാം.

## അഭ്യാസം: LLM ഉള്ള ഒരു ക്ലയന്റ് സൃഷ്ടിക്കല്‍

ഈ അഭ്യാസത്തില്‍, നമ്മുടെ ക്ലയന്റിലേക്ക് LLM എങ്ങനെ ചേർക്കാമെന്നു പഠിക്കാം.

### GitHub വ്യക്തിഗത ആക്‌സസ് ടോക്കൺ ഉപയോഗിച്ച് ഓതന്റിക്കേഷൻ

GitHub ടോക്കൺ സൃഷ്ടിക്കൽ സരളമാണ്. ഇതാണ് എങ്ങനെ ചെയ്യാമെന്ന്:

- GitHub സെറ്റിങ്ങുകൾ തുറക്കുക – മുകളില്‍ വലത്തുവശത്ത് നിങ്ങളുടെ പ്രൊഫൈല്‍ചിത്രം ക്ലിക്കുചെയ്ത് സെറ്റിങ്ങുകൾ തിരഞ്ഞെടുക്കുക.
- ഡെവലപ്പർ സെറ്റിങ്ങുകളിലേക്ക് പോകുക – താഴേക്ക് സ്ക്രോൾ ചെയ്ത് ഡെവലപ്പർ സെറ്റിങ്ങുകൾ ക്ലിക്ക് ചെയ്യുക.
- വ്യക്തിഗത ആക്‌സസ് ടോക്കൺസ് തിരഞ്ഞെടുക്കുക – ഫൈൻ-ഗ്രെയിൻഡ് ടോക്കണമുകൾ ക്ലിച്ച് ചെയ്ത് പുതിയ ടോക്കൺ ജനറേറ്റ് ചെയ്യുക.
- ടോക്കൺ കോൺഫിഗർ ചെയ്യുക – റഫറൻസിനായി ഒരു കുറിപ്പിടുക, മിയാദപരിധി സജ്ജമാക്കുക, ആവശ്യമായ സ്കോപ്പുകള്‍ (അനുമതികള്‍) തിരഞ്ഞെടുക്കുക. ഈ സാഹചര്യത്തിൽ Models അനുമതികൾ നിർബന്ധമാണ്.
- ടോക്കൺ ജനറേറ്റ് ചെയ്ത് കോപ്പി ചെയ്യുക – Generate token ക്ലിക്ക് ചെയ്ത് ഉടൻ കോപ്പി ചെയ്യുക, പിന്നീട് ടോക്കൺ കാണാനാകില്ല.

### -1- സെർവർക്ക് കണക്ട് ചെയ്യുക

നമുക്ക് ആദ്യം നമ്മുടെ ക്ലയന്റ് സൃഷ്ടിക്കാം:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // സ്കീമാ ശരിയാണോയെന്ന് പരിശോധിക്കാൻ zod ഇറക്കുമതി ചെയ്യുക

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

മുൻപ്പത്തിയ കോഡിൽ നാം:

- ആവശ്യമായ ലൈബ്രറികൾ ഇറക്കുമതി ചെയ്തിട്ടുണ്ട്
- `client` ഉം `openai` ഉം എന്ന രണ്ട് അംഗങ്ങളുള്ള ഒരു ക്ലാസ് സൃഷ്ടിച്ചു; ഇത് നമ്മുടെ ക്ലയന്റ് നിയന്ത്രിക്കാനും LLM-യുമായി സംവദിക്കാനും സഹായിക്കും.
- നമ്മുടെ LLM ഉദാഹരണത്തിന് GitHub Models ഉപയോഗിക്കാൻ `baseUrl` ഇൻഫരൻസ് API-യിലേക്ക് സെറ്റ് ചെയ്തു.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# സ്റ്റ്ഡിയോ കണക്ഷനു വേണ്ടി സെർവർ പാരാമീറ്ററുകൾ സൃഷ്ടിക്കുക
server_params = StdioServerParameters(
    command="mcp",  # എക്സിക്യൂട്ടബിൾ
    args=["run", "server.py"],  # ഐച്ഛിക കമാൻഡ് ലൈൻ_ARGUMENTS
    env=None,  # ഐച്ഛിക പരിസ്ഥിതി വേരിയബിളുകൾ
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # കണക്ഷൻ ആരംഭിക്കുക
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

മുൻപ് കാണിച്ചതുപോലെ:

- MCP ഉപയോഗിക്കുന്നതിനായി ആവശ്യമായ ലൈബ്രറികൾ ഇറക്കുമതി ചെയ്തു
- ഒരു ക്ലയന്റ് സൃഷ്ടിച്ചു

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

ആദ്യം, നിങ്ങളുടെ `pom.xml` ഫയലിലേക്ക് LangChain4j ആശ്രിതികൾ ചേർക്കണം. MCP ഇന്റഗ്രേഷൻ, GitHub Models പിന്തുണയ്ക്ക് ഇതു ചേർക്കുക:

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

ശേഷം, നിങ്ങളുടെ Java ക്ലയന്റ് ക്ലാസ്സ് സൃഷ്ടിക്കുക:

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
    
    public static void main(String[] args) throws Exception {        // GitHub മോഡലുകൾ ഉപയോഗിക്കാൻ LLM കൺഫിഗർ ചെയ്യുക
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // സെർവറിലേക്ക് ബന്ധിപ്പിക്കുന്നതിന് MCP ട്രാൻസ്പോർട്ട് സൃഷ്ടിക്കുക
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP ക്ലയന്റ് സൃഷ്ടിക്കുക
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

മുൻപ് ഇതു ചെയ്തിട്ടുണ്ട്:

- **LangChain4j ആശ്രിതികൾ ചേർത്തു**: MCP ഇന്റഗ്രേഷൻ, OpenAI ഔദ്യോഗിക ക്ലയന്റ്, GitHub Models പിന്തുണയ്ക്കായി
- **LangChain4j ലൈബ്രറികൾ ഇറക്കുമതി ചെയ്തു**: MCP ഇന്റഗ്രേഷനും OpenAI ചാറ്റ് മോഡൽ ഫംഗ്ഷണാലിറ്റിക്കും
- **`ChatLanguageModel` സൃഷ്ടിച്ചു**: GitHub Models നിങ്ങളുടെ GitHub ടോക്കൺ ഉപയോഗിച്ച് സജ്ജമാക്കി
- **HTTP ട്രാൻസ്പോർട്ട് സജ്ജീകരിച്ചു**: Server-Sent Events (SSE) ഉപയോഗിച്ച് MCP സെർവറുമായി ബന്ധിപ്പിച്ചു
- **MCP ക്ലയന്റ് സൃഷ്ടിച്ചു**: സെർവറുമായി ആശയവിനിമയം കൈകാര്യം ചെയ്യാൻ
- **LangChain4j-ന്റെ ഇന്‍ബില്‍ട്ട് MCP പിന്തുണ** ഉപയോഗിച്ചു: LLM-മാരും MCP സെർവറുകളും ഇടയിലെ ഇന്റഗ്രേഷൻ ലളിതമാക്കുന്നു

#### Rust

ഈ ഉദാഹരണം നിങ്ങളുടെ ഇവിടെ ഒരു Rust അടിസ്ഥാനമാക്കി MCP സെർവർ പ്രവർത്തിക്കുന്നതായി ধরেകൊള്ളുന്നു. ഇല്ലെങ്കിൽ [01-first-server](../01-first-server/README.md) പാഠത്തിൽ തിരിച്ചുപോയി സെർവർ സൃഷ്ടിക്കുക.

Rust MCP സെർവർ നിർമ്മിച്ചതിന് ശേഷം, ടെർമിനൽ തുറന്ന് സെർവറിന്റെ ഡയറക്ടറിയിലേക്ക് പോവുക. പിന്നെ പുതിയ LLM ക്ലയന്റ് പ്രോജക്ട് സൃഷ്ടിക്കാൻ താഴെക്കാണുന്ന കമാൻഡ് പ്രവർത്തിപ്പിക്കുക:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

`Cargo.toml` ഫയലിലേക്ക് താഴെ ഉത്തരവാദിത്തങ്ങൾ ചേർക്കുക:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> OpenAI-യ്ക്കുള്ള ഔദ്യോഗിക Rust ലൈബ്രറി നിലവിലില്ലെങ്കിലും, `async-openai` ക്രേറ്റ് [കമ്മ്യൂണിറ്റി പരിപാലിത ലൈബ്രറിയാണ്](https://platform.openai.com/docs/libraries/rust#rust) സാധാരണ ഉപയോഗിക്കുന്നതുണ്ട്.

`src/main.rs` ഫയൽ തുറന്ന് അതിലെ ഉള്ളടക്കം താഴെയുള്ള കോഡിലേക്ക് മാറ്റുക:

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
    // തുടക്ക സന്ദേശം
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI ക്ലയന്റ് സജ്ജീകരിക്കുക
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP ക്ലയന്റ് സജ്ജീകരിക്കുക
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

    // TODO: MCP ഉപകരണ ലിസ്റ്റിംഗ് നേടുക

    // TODO: ഉപകരണ കോൾസുകളുമായുള്ള LLM സംവാദം

    Ok(())
}
```

ഈ കോഡ് ഒരു അടിസ്ഥാന Rust അപ്ലിക്കേഷൻ സജ്ജീകരിക്കുന്നു, MCP സെർവറിനോടും GitHub Models-നോടും LLM ആശയവിനിമയത്തിനായി ബന്ധിപ്പിക്കും.

> [!IMPORTANT]
> അപ്ലിക്കേഷൻ ഓടിക്കുന്നതിന് മുൻപ് നിങ്ങളുടെ GitHub ടോക്കൺ ഉപയോഗിച്ച് `OPENAI_API_KEY` എന്വയോൺമെന്റ് വേരിയബിൾ സെറ്റ് ചെയ്യുക.

നല്ലതു, അടുത്ത ഘട്ടം സെർവറിലെ കഴിവുകൾ പട്ടികവത്കരിക്കുക.

### -2- സെർവർ കഴിവുകൾ പട്ടികവത്കരിക്കുക

ഇപ്പോൾ സെർവറിൽ കണക്ട് ചെയ്ത് അവന്റെ കഴിവുകൾ ചോദിക്കും:

#### Typescript

അതേ ക്ലാസിൽ ഈ മെത്തഡുകൾ ചേർക്കുക:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // ഉപകരണങ്ങൾ ലിസ്റ്റ് ചെയ്യുന്നു
    const toolsResult = await this.client.listTools();
}
```

ഇതിൽ നാം:

- സെർവറുമായി കണക്ട് ചെയ്യാനുള്ള കോഡ് ചേർത്തു, `connectToServer`.
- ആപ്പ് ഫ്ലോ കൈകാര്യം ചെയ്യുന്ന `run` മെത്തഡ് സൃഷ്ടിച്ചു. ഇപ്പോൾ അത് ഉപകരണങ്ങൾ മാത്രം പട്ടികവത്കരിക്കുന്നു, എന്നാൽ ഉടനെ കൂടുതലും ചേർക്കും.

#### Python

```python
# ലഭ്യമായ സ്രോതസ്സ് ലിസ്റ്റ് ചെയ്യുക
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# ലഭ്യമായ ഉപകരണങ്ങൾ ലിസ്റ്റ് ചെയ്യുക
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

നാം ചേർത്തത്:

- സ്രോതസ്സ്, ഉപകരണങ്ങൾ പട്ടികവത്കരിക്കുകയും പ്രിന്റ് ചെയ്യുകയും ചെയ്തു. ഉപകരണങ്ങൾക്ക് ഇൻപുട്ട് സ്കീമയും പട്ടികവത്കരിച്ചു, പിന്നീട് ഉപയോഗിക്കും.

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

ഇതിൽ:

- MCP സെർവറിൽ ലഭ്യമായ ഉപകരണങ്ങൾ പട്ടികവത്കരിച്ചു
- ഓരോ ഉപകരണത്തിലും പേര്, വിവരണം, സ്കീമ എന്നിവ പട്ടികവത്കരിച്ചു. പിന്നീട് ഉപകരണം വിളിക്കാനായി ഇത് ഉപയോഗിക്കും.

#### Java

```java
// MCP ടൂളുകൾ സ്വയമേവ കണ്ടെത്തുന്ന ഒരു ടൂൾ പ്രൊവൈഡർ സൃഷ്‌ടിക്കുക
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP ടൂൾ പ്രൊവൈഡർ സ്വയമേവ കൈകാര്യം ചെയ്യുന്നത്:
// - MCP സെർവറിൽ നിന്ന് ലഭ്യമായ ടൂളുകളുടെ പട്ടിക തയ്യാറാക്കൽ
// - MCP ടൂൾ സ്കീമാക്കളെ LangChain4j ഫോർമാറ്റിലേക്ക് മാറ്റൽ
// - ടൂൾ പ്രവർത്തനവും പ്രതികരണങ്ങളും നിയന്ത്രിക്കൽ
```

ഇതിൽ:

- MCP സെർവറിൽ നിന്നുള്ള എല്ലാ ഉപകരണങ്ങളും സ്വയം കണ്ടെത്തി രജിസ്റ്റർ ചെയ്യുന്ന `McpToolProvider` സൃഷ്ടിച്ചു
- MCP ഉപകരണം സ്കീമകളും LangChain4j ഉപകരണ ഫോർമാറ്റിലേക്കുള്ള പരിവർത്തനം ടൂള്പ്രവൈഡർ വഹിക്കുന്നു
- ഈ സമീപനം കൈമെയിലുള്ള ഉപകരണം പട്ടികവത്കരണവും പരിവർത്തനവും മറയ്ക്കുന്നു

#### Rust

MCP സെർവറിൽ നിന്നുള്ള ഉപകരണങ്ങൾ `list_tools` മെത്തഡ് ഉപയോഗിച്ച് തിരികെ ലഭിക്കും. `main` ഫംഗ്ഷനിൽ MCP ക്ലയന്റ് സജ്ജമാക്കിയതിന് ശേഷം താഴെക്കാണുന്ന കോഡ് ചേർക്കുക:

```rust
// MCP ടൂൾ ലിസ്റ്റിംഗ് നേടുക
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- സെർവർ കഴിവുകള്‍ LLM ഉപകരണങ്ങളായും മാറുക

കഴിഞ്ഞു സെർവറിലെ കഴിവുകൾ പട്ടികവത്കരിച്ചതിന് ശേഷം, അവ LLM മനസ്സിലാകുന്ന ഫോർമാറ്റിലേക്ക് മാറ്റണമോ. അങ്ങനെ പിന്നെ ഈ കഴിവുകൾ LLM-ന് ടൂളുകളായി നൽകാൻ കഴിയും.

#### TypeScript

1. MCP സെർവറിൽ നിന്നുള്ള പ്രതികരണത്തിനുള്ള LLM-ക്കാവശ്യമായ ടൂൾ ഫോർമാറ്റിലേക്ക് മാറ്റുന്ന കോഡ് ചേർക്കുക:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // ഇൻപുട്ട്_സ്കീമയിൻറെ അടിസ്ഥാനത്തിൽ ഒരു സോഡ് സ്കീമ സൃഷ്‌ടിക്കുക
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // സ്പഷ്ടമായി തരം "ഫങ്ഷൻ" ആയി സജ്ജമാക്കുക
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

മുകളിൽ കാണിക്കുന്ന കോഡ് MCP സെർവറിന്റെ അഭിമുഖമായുള്ള മറുപടി ടൂൾ നിർവചന ഫോർമാറ്റിലേക്കും അതായത് LLM മനസ്സിലാകുന്നതിലേക്കും മാറ്റുന്നു.

2. ഇനി `run` മെത്തഡ് അപ്ഡേറ്റ് ചെയ്ത് സെർവർ കഴിവുകൾ പട്ടികവത്കരിക്കാം:

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

ഇത് ചെയ്തത്, `run` മെത്തഡ് ലിസ്റ്റ് ഫലത്തിലൂടെ ലോം ചെയ്തു, ഓരോ എൻട്രിക്കും `openAiToolAdapter` വിളിക്കുന്നു.

#### Python

1. ആദ്യം താഴെ കാണുന്ന മാറ്റ് പ്രവർത്തനം സൃഷ്ടിക്കാം:

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

`convert_to_llm_tools` ഫംഗ്ഷൻ MCP ടൂൾ പ്രതികരണം എടുത്ത് LLM മനസ്സിലാകുന്ന ഫോർമാറ്റിലേക്കും മാറ്റുക.

2. തുടർന്ന് നമ്മുടെ ക്ലയന്റ് കോഡ് നമുക്ക് ഇങ്ങനെ അപ്ഡേറ്റ് ചെയ്യാം:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

ഇവിടെ MCP ടൂൾ മറുപടി LLM-ന് നൽകാനായി മാറ്റാൻ `convert_to_llm_tool` വിളിക്കുന്നു.

#### .NET

1. MCP ടൂൾ മറുപടി LLM മനസ്സിലാക്കുന്ന ഫോർമാറ്റിലേക്ക് മാറ്റുന്നതിനുള്ള കോഡ് ചേർക്കാം:

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

ഇതിൽ:

- പേര്, വിവരണം, ഇൻപുട്ട് സ്കീമ സ്വീകരിക്കുന്ന `ConvertFrom` ഫംഗ്ഷൻ നിർമ്മിച്ചു.
- ഫംഗ്ഷൻ ഡിഫിനിഷൻ (FunctionDefinition) സൃഷ്ടിച്ച് പിന്നീട് ChatCompletionsDefinition-ലേക്ക് നൽകുന്നു. ഇത് LLM മനസ്സിലാക്കും.

2. ഈ ഫംഗ്ഷൻ ഉപയോഗിച്ച് നിലവിലുള്ള ചില കോഡ് അപ്ഡേറ്റ് ചെയ്യാം:

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
// സ്വാഭാവിക ഭാഷാ ഇടപെടലിനായി ഒരു ബോട്ട് ഇന്റർഫേസ് ഉണ്ടാക്കുക
public interface Bot {
    String chat(String prompt);
}

// LLM மற்றும் MCP ഉപകരണങ്ങൾ ഉപയോഗിച്ച് AI സേവനം ക്രമീകരിക്കുക
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

ഇതിൽ:

- സ്വാഭാവിക ഭാഷ സംവാദത്തിനുള്ള ലളിതമായ `Bot` ഇന്റർഫേസ് നിർവ്വചിച്ചു
- LangChain4j-യുടെ `AiServices` ഉപയോഗിച്ചു LLM-നെ MCP ഉപകരണം പ്രൊവൈഡറുമായി ബന്ധിപ്പിച്ചു
- ഫ്രെയിംവർക്ക് സ്വയം ടൂൾ സ്കീമ പരിവർത്തനവും ഫംഗ്ഷൻ കോൾ ചെയ്യലും കൈകാര്യം ചെയ്യുന്നു
- ഇത് കൈമെയിൽ ടൂൾ പരിവർത്തനം ഒഴിവാക്കി—LangChain4j MCP ടൂളുകളെ LLM- സൗഹൃദ ഫോർമാറ്റിലേക്കു മാറ്റാനുള്ള എല്ലാ ബുദ്ധിമുട്ടുകളും കൈകാര്യം ചെയ്യുന്നു

#### Rust

MCP ടൂൾ മറുപടി LLM മനസ്സിലാകുന്ന ഫോർമാറ്റിലേക്കു മാറ്റാൻ ഒരു സഹായക ഫംഗ്ഷൻ കൂടി ചേർക്കാം. ഇടയിലെ സേവനത്തിന് താഴെ തെളിയുന്ന രീതിയിൽ ഫംഗ്ഷൻ ചേർക്കുക:

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

നല്ലതു, ഇനി ഉപയോക്തൃ അഭ്യര്‍ത്ഥന കൈകാര്യം ചെയ്യാൻ സജ്ജമാണ്.

### -4- ഉപയോക്തൃ പ്രോംപ്റ്റ് അഭ്യർത്ഥന കൈകാര്യം ചെയ്യുക

ഈ ഭാഗത്ത് ഉപയോക്തൃ അപേക്ഷകൾ കൈകാര്യം ചെയ്യും.

#### TypeScript

1. LLM വിളിക്കാൻ ഉപയോഗിക്കുന്ന ഒരു മെത്തഡ് ചേർക്കുക:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. സെർവറിന്റെ ടൂൾ کال ചെയ്യുക
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ഫലത്തോട് എന്തെങ്കിലും ചെയ്യുക
        // TODO

        }
    }
    ```

ഇതിൽ:

- `callTools` എന്ന മെത്തഡ് ചേർത്തു.
- ഈ മെത്തഡ് LLM മറുപടി പരിശോധിച്ച് ഏത് ഉപകരണങ്ങൾ വിളിക്കണമെന്ന് നോക്കുന്നു:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // ടൂൾ വിളിക്കുക
        }
        ```

- LLM ശുപാർശ иткәнുപോലെ ഉപകരണം വിളിക്കുന്നു:

        ```typescript
        // 2. സേർവറിന്റെ ഉപകരണം വിളിക്കുക
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ഫലത്തോടെ എന്തോ ചെയ്യുക
        // TODO
        ```

2. `run` മെത്തഡ് ഇപ്പഴേക്ക് LLM വിളികളും `callTools` വിളിപ്പിക്കുകയും ചേർക്കുക:

    ```typescript

    // 1. LLM-ന്റെ ഇൻപുട്ടായി ഉള്ള സന്ദേശങ്ങൾ സൃഷ്ടിക്കുക
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. LLM-നെ വിളിക്കുന്നു
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. ഓരോ തിരഞ്ഞെടുപ്പും പരിശോധിച്ച്, അതിൽ ടൂൾ കോൾ ഉണ്ടോ എന്ന് നോക്കുക, LLM പ്രതികരണം പരിശോധിക്കുക
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

നല്ലതു, കോഡ് പൂർണ്ണമായി കാണാം:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // സ്കീമാ സ്ഥിരീകരണത്തിനായി zod ഇറക്കുമതി ചെയ്യുക

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // ഭാവിയിൽ ഈ URL-ലേക്ക് മാറ്റേണ്ടതായിരിക്കും: https://models.github.ai/inference
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
          // input_schema അടിസ്ഥാനമാക്കി ഒരു zod സ്കീമ സൃഷ്ടിക്കുക
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // ടൈപ്പ് "function" ആയി വ്യക്തമാക്കുക
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
    
    
          // 2. സർവറിന്റെ ഉപകരണം വിളിക്കുക
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. ഫലത്തോടേന്തെങ്കിലും ചെയ്യുക
          // ചെയ്യേണ്ട കാര്യങ്ങൾ
    
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
    
        // 3. LLM പ്രതಿಕരണത്തിലൂടെ പോകുക, ഓരോ തിരഞ്ഞെടുപ്പിനും ഉപകരണം വിളികളുണ്ടോ എന്ന് പരിശോധിക്കുക
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

1. LLMക്ക് വിളിക്കാന്‍ ആവശ്യമുള്ള ഇമ്പോർട്ട്‌സ് ചേർക്കുക:

    ```python
    # എൽ.എൽ.എം
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. LLM വിളിക്കുന്ന പ്രവർത്തനം ചേർക്കുക:

    ```python
    # എൽഎൽഎംസിന്റെ

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
            # ഓപ്ഷണൽ പാരാമീറ്ററുകൾ
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

ഇവിടെ:

- MCP സെർവറിൽ നിന്നും കണ്ടെത്തിയ, മാറ്റിയ ചില ഫംഗ്ഷനുകൾ LLM-ന് നൽകി.
- LLM ആ ഫംഗ്ഷനുകളോടൊപ്പം വിളിച്ചു.
- ശേഷം ഫലം പരിശോധിച്ച് ഏതെല്ലാം ഫംഗ്ഷനുകൾ വിളിക്കണമെന്ന് നോക്കി.
- അവസാനത്തിന് വിളിക്കേണ്ട ഫംഗ്ഷനുകളുടെ അറെയ് നൽകുന്നു.

3. അവസാനമായി മുഖ്യ കോഡ് അപ്ഡേറ്റ് ചെയ്യാം:

    ```python
    prompt = "Add 2 to 20"

    # LLMനെ എത്രയും സാധനങ്ങൾ ചോദിക്കുക, ഉണ്ടെങ്കിൽ
    functions_to_call = call_llm(prompt, functions)

    # ശുപാർശ ചെയ്ത ഫംഗ്ഷനുകൾ വിളിക്കുക
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

ഇവിടെ:

- LLM നിർദേശിച്ച ഫംഗ്ഷൻ ഉപയോഗിച്ച് MCP ടൂൾ `call_tool` വഴി വിളിക്കുന്നു.
- MCP സെർവറിൽ ടൂൾ കോൾ ഫലം പ്രിന്റ് ചെയ്യുന്നു.

#### .NET

1. LLM പ്രോംപ്റ്റ് അഭ്യർത്ഥനയ്ക്കുള്ള കോഡ് കാണിക്കുക:

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

ഇതിൽ:

- MCP സെർവറിൽ നിന്നുള്ള ടൂളുകൾ എടുത്തു, `var tools = await GetMcpTools()` .
- ഉപയോക്തൃ പ്രോംപ്റ്റ് `userMessage` നിർവ്വചിച്ചു.
- മോഡൽ, ടൂൾ മാർ എന്നിവയും ഉൾപ്പെടുന്ന ഓപ്ഷൻസ് നിർമ്മിച്ചു.
- LLM-ന് അഭ്യർത്ഥന അയച്ചു.

2. LLM-ന് ഫംഗ്ഷൻ കോൾ ചെയ്യണോ എന്നത് പരിശോധിക്കും:

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

ഇത് ചെയ്തുണ്ട്:

- ഫംഗ്ഷൻ കോൾ ലിസ്റ്റിൽ ലൂപ്പ് ചെയ്തു.
- ഓരോ ടൂൾ കോൾക്കും പേര്, arguments അടക്കി MCP സെർവറിൽ ഈ ഉപകരണം MCP ക്ലയന്റ് ഉപയോഗിച്ച് വിളിച്ചു. ഫലം പ്രിന്റ് ചെയ്തു.

പൂർണ്ണ കോഡ്:

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
    // MCP ഉപകരണങ്ങൾ സ്വയം ഉപയോഗിക്കുന്ന സ്വാഭാവിക ഭാഷാ അഭ്യർത്ഥനകൾ നടപ്പിലാക്കുക
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

ഇതിൽ:

- ലളിതമായ സ്വാഭാവിക ഭാഷ പ്രോംപ്റ്റുകൾ MCP സെർവർ ടൂളുകളുമായി ആശയവിനിമയം നടത്താൻ ഉപയോഗിച്ചു.
- LangChain4j ഫ്രെയിംവർക്ക് സ്വയം കൈകാര്യം ചെയ്യുന്നു:
  - ഉപയോക്തൃ പ്രോംപ്റ്റുകൾ ആവശ്യാനുസരണം ടൂൾ കോൾ ആക്കൽ
  - LLM തീരുമാനിച്ച अनुसार MCP ടൂളുകൾ വിളിക്കൽ
  - LLM, MCP സെർവറിനിടയിലെ സംഭാഷണം നിയന്ത്രണം
- `bot.chat()` സ്വാഭാവിക ഭാഷ ഉത്തരങ്ങൾ മുംബൈ MCP ടൂൾ പ്രവർത്തന ഫലങ്ങൾ ഉൾക്കൊള്ളാം.
- ഈ സമീപനം seamless user experience നൽകുന്നു; ഉപയോക്താക്കള്‍ക്ക് MCP നിലപാടുകള്‍ അറിയേണ്ട ആവശ്യവുമില്ല.

പൂർണ്ണ കോഡ് ഉദാഹരണം:

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

ഇപ്പോൾ പ്രധാനഭാഗം. തുടക്ക ഉപയോക്തൃ പ്രോംപ്റ്റ് LLM-ന് അയച്ചും, LLM മറുപടി പരിശോധിച്ച് ടൂളുകൾ വിളിക്കേണ്ടതുണ്ടോ എന്ന് കണ്ടും, ട്രാക്ക് ചെയ്യുകയും ആവശ്യമെങ്കിൽ ടൂളുകൾ വിളിച്ച് സംഭാഷണം LLM-നുമായി തുടർക്കുകയും ചെയ്യും. ടൂൾ കോൾ ആവശ്യമില്ലാതേക്കും വരെ ഇത് ನಡೆಯും, പിന്നെ അന്തിമ മറുപടിയാകും.

LLM കാൾ സാധാരണയായി പലതവണ നടത്തും, അതിനാൽ LLM കാൾ കൈകാര്യം ചെയ്യുന്ന ഫംഗ്ഷൻ സജ്ജീകരിക്കാം. താഴെക്കാണുന്ന പദവി `main.rs` ഫയലിൽ ചേർക്കുക:

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

ഈ ഫംഗ്ഷൻ LLM ക്ലയന്റ്, സന്ദേശങ്ങൾ (ഉപയോക്തൃ പ്രോംപ്റ്റ് ഉൾപ്പെടെ), MCP സെർവറിലെ ടൂളുകൾ സ്വീകരിച്ച് LLM-ന് അഭ്യർത്ഥന അയയ്ക്കും, മറുപടി തിരിച്ചുകൊള്ളും.
LLM-ൽ നിന്നും വരുന്ന പ്രതികരണം `choices` എന്ന ഒരു അറേ ഉൾക്കൊള്ളും. എന്തെങ്കിലും `tool_calls` ഉണ്ടോ എന്ന് നോക്കുന്നതിനായി ഫലം പ്രോസസ് ചെയ്യേണ്ടതുണ്ട്. LLM ഒരു നിർദ്ദിഷ്ട ടൂൾ ആഗ്യങ്ങളോടെ വിളിക്കാമെന്ന് ആവശ്യപ്പെടുന്നുവെന്ന് ഇത് ഞങ്ങൾക്ക് അറിയിക്കുന്നു. LLM പ്രതികരണം കൈകാര്യം ചെയ്യുന്നതിന് ഒരു ഫംഗ്ഷൻ നിർവ്വചിക്കാൻ താഴെ കൊടുത്തിരിക്കുന്ന കോഡ് നിങ്ങളുടെ `main.rs` ഫയലിന്റെ അടിത്തട്ടിലേക്ക് ചേർക്കുക:

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

    // ഉള്ളടക്കമുണ്ടെങ്കിൽ പ്രിന്റ് ചെയ്യുക
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // ടൂൾ കോൾസ് കൈകാര്യംചെയ്യുക
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // അസിസ്റ്റന്റ് സന്ദേശം ചേർക്കുക

        // ഓരോ ടൂൾ കോലും പ്രവർത്തിപ്പിക്കുക
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // സന്ദേശങ്ങളിലേക്ക് ടൂൾ ഫലം ചേർക്കുക
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // ടൂൾ ഫലങ്ങളുമായി സംഭാഷണം തുടരുക
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

`tool_calls` ഉണ്ടായിരുന്നാൽ, അത് ടൂൾ വിവരങ്ങൾ എടുക്കുകയും, ആ ടൂൾ അഭ്യർത്ഥനയോടെ MCP സെർവറെ വിളിക്കുകയും, ഫലങ്ങൾ സംഭാഷണ സന്ദേശങ്ങളിൽ ചേർക്കുകയും ചെയ്യും. തുടർന്ന് LLM-ലുമായി സംവാദം തുടരുന്നു, സന്ദേശങ്ങൾ അസിസ്റ്റന്റിന്റെ പ്രതികരണം കൂടാതെ ടൂൾ കോൾ ഫലങ്ങളോടൊപ്പം അപ്ഡേറ്റ് ചെയ്യപ്പെടും.

LLM MCP കോൾസ്‌ക്കായി തിരിച്ചു നൽകുന്ന ടൂൾ കോൾ വിവരങ്ങൾ എടുക്കാൻ വേണ്ടിയുള്ള മറ്റൊരു സഹായക ഫംഗ്ഷൻ ഞങ്ങൾ കൂട്ടിച്ചേർക്കും. വിളിക്കാൻ ആവശ്യമായ എല്ലാ വിവരങ്ങളും എടുക്കുന്നതിന് താഴെ കൊടുത്തിരിക്കുന്ന കോഡ് നിങ്ങളുടെ `main.rs` ഫയലിന്റെ അടിത്തട്ടിലേക്ക് ചേർക്കുക:

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

എല്ലാ ഭാഗങ്ങളും സജ്ജമായതിനാൽ, പ്രാരംഭ ഉപയോക്തൃ പ്രോംപ്റ്റ് കൈകാര്യം ചെയ്തു LLM-നെ വിളിക്കാൻ ഇനി തയ്യാറാണ്. നിങ്ങളുടെ `main` ഫംഗ്ഷൻ താഴെ കൊടുത്തിരിക്കുന്ന കോഡോടെ അപ്ഡേറ്റ് ചെയ്യുക:

```rust
// ടൂൾ കോൾസുമായി LLM സംവാദം
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

ഇത് രണ്ട് സംഖ്യകളുടെ നിരക്കിന്റെ തുക ചോദിച്ച് പ്രാരംഭ ഉപയോക്തൃ പ്രോംപ്റ്റോട് LLM-നെ ചോദിക്കും, പ്രതികരണം പ്രോസസ് ചെയ്ത് ടൂൾ കോൾസ് ഡൈനാമിക്കായി കൈകാര്യം ചെയ്യും.

നല്ലത്, നിങ്ങൾ അത് ചെയ്തു!

## അസൈൻമെന്റ്

വഴികാട്ടിയിരിക്കുന്ന കോഡ് എടുത്ത് കൂടുതൽ ടൂളുകൾ ഉൾപ്പെടുത്തി സെർവർ നിർമ്മിക്കുക. തുടർന്ന് ഒരു LLM ഉള്ള ക്ലയന്റ് ഉണ്ടാക്കി വ്യത്യസ്ത പ്രോംപ്റ്റുകൾ ഉപയോഗിച്ച് പരിശോധിച്ച് നിങ്ങളുടെ സെർവർ ടൂളുകൾ ഡൈനാമിക്കായി വിളിക്കപ്പെടുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക. ഇതുപോലുള്ള ക്ലയന്റ് നിർമ്മാണം ഉപയോക്താവിന് മികച്ച അനുഭവം നൽകും, കാരണം അവർ കൃത്യമായ ക്ലയന്റ് കമാൻഡുകൾക്ക് പകരം പ്രോംപ്റ്റുകൾ ഉപയോഗിച്ച് പ്രവർത്തിക്കാനും MCP സെർവർ അമൽപ്പെടുത്തപ്പെടുന്നു എന്ന കാര്യം അവർക്കറിയാതെയും ഉണ്ടായിരിക്കും.

## പരിഹാരം

[Solution](./solution/README.md)

## പ്രധാന അറിവുകൾ

- നിങ്ങളുടെ ക്ലയന്റിലേക്ക് LLM ചേർത്താൽ MCP സെർവർസുമായി ഉപയോക്താക്കൾക്ക് കൂടുതൽ നല്ല ഇടപെടൽ ലഭിക്കും.
- MCP സെർവർ പ്രതികരണം LLM എളുപ്പത്തിൽ മനസിലാക്കുന്നതായി മാറ്റേണ്ടതുണ്ട്.

## സാമ്പിൾസ്

- [ജാവ കാൽക്കുലേറ്റർ](../samples/java/calculator/README.md)
- [.നെറ്റ് കാൽക്കുലേറ്റർ](../../../../03-GettingStarted/samples/csharp)
- [ജാവാസ്ക്ക്രിപ്റ്റ് കാൽക്കുലേറ്റർ](../samples/javascript/README.md)
- [ടൈപ്പ്‌സ്‌ക്രിപ്റ്റ് കാൽക്കുലേറ്റർ](../samples/typescript/README.md)
- [പൈതൺ കാൽക്കുലേറ്റർ](../../../../03-GettingStarted/samples/python)
- [റസ്റ്റ് കാൽക്കുലേറ്റർ](../../../../03-GettingStarted/samples/rust)

## അധികമായ വിഭവങ്ങൾ

## അടുത്തത്

- Next: [Visual Studio Code ഉപയോഗിച്ച് ഒരു സെർവർ ഉപഭോഗിക്കൽ](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->