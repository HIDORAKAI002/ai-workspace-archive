# LLM ನೊಂದಿಗೆ ಕ್ಲೈಂಟ್ ರಚನೆ

ಈವರೆಗೆ, ನೀವು ಹೇಗೆ ಸರ್ವರ್ ಮತ್ತು ಕ್ಲೈಂಟ್ ರಚಿಸುವುದು ಎಂದು ನೋಡಿದ್ದೀರಿ. ಕ್ಲೈಂಟ್ ಸ್ಪಷ್ಟವಾಗಿ ಸರ್ವರ್ ಅನ್ನು ಕರೆಸುತ್ತಿತ್ತು ಅದರ ಟೂಲ್‌ಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಲು. ಆದರೆ, ಇದು ಬಹಳ ಪ್ರಾಯೋಗಿಕವಾದ ದೃಷ್ಠಿಕೋನವಲ್ಲ. ನಿಮ್ಮ ಬಳಕೆದಾರರು ಏಜೆಂಟಿಕ್ ಕಾಲದವರೆ ಮತ್ತು ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ಬಳಸಲು ಮತ್ತು LLM ಜೊತೆಗೆ ಸಂವಹನ ಮಾಡಲು ನಿರೀಕ್ಷಿಸುತ್ತಾರೆ. ಅವರು ನೀವು MCP ಅನ್ನು ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಸಂಗ್ರಹಿಸಲು ಬಳಸುತ್ತೀರಾ ಇಲ್ಲವೆ ಅದಕ್ಕೆ ಗಮನಕೊಡುವುದಿಲ್ಲ; ಅವರು ನೈಸರ್ಗಿಕ ಭಾಷೆ ಬಳಸಿ ಸಂವಹನ ಮಾಡಲು ನಿರೀಕ್ಷಿಸುತ್ತಾರೆ. ಹಾಗಾದ್ರೆ ನಾವು ಇದನ್ನೇನು ಮಾಡಿ ಪರಿಹರಿಸೋಣ? ಪರಿಹಾರ ಎಂದರೆ ಕ್ಲೈಂಟ್‌ಗೆ LLM ಸೇರಿಸುವುದು.

## ಅವಲೋಕನ

ಈ ಪಾಠದಲ್ಲಿ ನಾವು ನಿಮ್ಮ ಕ್ಲೈಂಟ್‌ಗೆ LLMನ್ನು ಸೇರಿಸುವ ಮತ್ತು ಅದು ನಿಮ್ಮ ಬಳಕೆದಾರರಿಗೆ 훨씬 ಉತ್ತಮ ಅನುಭವವನ್ನು ಹೇಗೆ ಒದಗಿಸುತ್ತದೆ ಎಂಬುದರ ಮೇಲೆ ಗಮನ ಹರಿಸುತ್ತೇವೆ.

## ಕಲಿಕೆಯ ಉದ್ದೇಶಗಳು

ಈ ಪಾಠದ ಅಂತ್ಯಕ್ಕೆ, ನೀವು ಈ ಕೆಳಗಿನ ವಿಷಯಗಳನ್ನು ಮಾಡಬಲ್ಲಿರಿ:

- LLM ಹೊಂದಿರುವ ಕ್ಲೈಂಟ್ ರಚಿಸುವುದು.
- MCP ಸರ್ವರ್‌ನೊಂದಿಗೆ LLM ಬಳಸಿ ಸುಗಮವಾಗಿ ಸಂವಹನ ಮಾಡುವುದು.
- ಕ್ಲೈಂಟ್ ಬದಿಯಲ್ಲಿ ಉತ್ತಮ ಅಂತಿಮ ಬಳಕೆದಾರ ಅನುಭವ ಒದಗಿಸುವುದು.

## ವಿಧಾನ

ನಾವು ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ವಿಧಾನವನ್ನು ತಿಳಿದುಕೊಳ್ಳೋಣ. LLM ನ್ನು ಸೇರಿಸುವುದು ಸರಳವಾಗಿ ಕಾಣುತ್ತದೆ, ಆದರೆ ನಾವು ನಿಜವಾಗಿಯೂ ಇದನ್ನು ಹೇಗೆ ಮಾಡುತ್ತೇವೆ?

ಇಂತಾಗಿ ಕ್ಲೈಂಟ್ ಸರ್ವರ್ ಜೊತೆ ಸಂವಹನ ಮಾಡುತ್ತದೆ:

1. ಸರ್ವರ್ ಜೊತೆಗೆ ಸಂಪರ್ಕ ಸ್ಥಾಪಿಸುವುದು.

1. ಸಾಮರ್ಥ್ಯಗಳು, ಪ್ರಾಂಪ್ಟ್‌ಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಉಪಕರಣಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ, ಅವುಗಳ ಸ್ಕೀಮಾವನ್ನು ಉಳಿಸುವುದು.

1. LLM ಸೇರಿಸಿ ಮತ್ತು ಉಳಿಸಿದ ಸಾಮರ್ಥ್ಯಗಳು ಮತ್ತು ಅವುಗಳ ಸ್ಕೀಮಾಗಳನ್ನು LLM ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಸ್ವರೂಪದಲ್ಲಿ ನೀಡುವುದು.

1. ಬಳಕೆದಾರ ಪ್ರಾಂಪ್ಟ್ ಅನ್ನು LLM ಗೆ, ಜೊತೆಗೆ ಕ್ಲೈಂಟ್ ಪಟ್ಟ ಮಾಡಿರುವ ಉಪಕರಣಗಳೊಂದಿಗೆ ನೀಡುವುದು.

ಅತ್ಯುತ್ತಮ, ಈಗ ನಾವು ಹೇಗೆ ಇದನ್ನು ಹೆಚ್ಚು ಮಟ್ಟದಲ್ಲಿ ಮಾಡುವುದು ಎಂದು ತಿಳಿದಿದೆವು, ಹೀಗಾಗಿ ಕೆಳಗಿನ ವ್ಯಾಯಾಮದಲ್ಲಿ ಪ್ರಯತ್ನಿಸಿ ನೋಡಿ.

## ವ್ಯಾಯಾಮ: LLM ಹೊಂದಿರುವ ಕ್ಲೈಂಟ್ ರಚನೆ

ಈ ವ್ಯಾಯಾಮದಲ್ಲಿ, ನಾವು LLM ನ್ನು ನಮ್ಮ ಕ್ಲೈಂಟ್ ಗೆ ಸೇರಿಸುವುದನ್ನು ಕಲಿಯೋಣ.

### GitHub ವೈಯಕ್ತಿಕ ಪ್ರವೇಶ ಟೋಕನ್ ಬಳಸಿ ಪ್ರಾಮಾಣೀಕರಣ

GitHub ಟೋಕನ್ ರಚಿಸುವುದು ಸರಳ ಪ್ರಕ್ರಿಯೆಯಾಗಿದ್ದು, ಹೀಗಿದೆ:

- GitHub ಸೆಟ್ಟಿಂಗ್ಗಳಿಗೆ ಹೋಗಿ – ಮೇಲ್ಭಾಗದ ಬಲ ಬದಿಯ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಚಿತ್ರವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.
- ಡೆವಲಪರ್ ಸೆಟ್ಟಿಂಗ್ಗಳಿಗೆ ನಾವಿಗೇಟ್ ಮಾಡಿ – ಕೆಳಗೆ ಸ್ಕ್ರೋಲ್ ಮಾಡಿ ಮತ್ತು ಡೆವಲಪರ್ ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.
- ವೈಯಕ್ತಿಕ ಪ್ರವೇಶ ಟೋಕನ್‌ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ – ಫೈನ್-ಗ್ರೇನ್ಡ್ ಟೋಕನ್ಸ್ ಕ್ಲಿಕ್ ಮಾಡಿ ನಂತರ ಹೊಸ ಟೋಕನ್ ರಚಿಸಿ.
- ನಿಮ್ಮ ಟೋಕನ್ ಕಾನ್ಫಿಗರ್ ಮಾಡಿ – ಸೂಚನೆ ನೀಡಿದ ರೂಜು, ಅವಧಿ ಮತ್ತು ಅಗತ್ಯ ಪರವಾನಗಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಈ ಸಂದರ್ಭದಲ್ಲಿ Models ಅನುಮತಿ ಸೇರಿಸುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.
- ಟೋಕನ್ ರಚಿಸಿ ಮತ್ತು ನಕಲಿಸಿ – Generate ಟೋಕನ್ ಕ್ಲಿಕ್ ಮಾಡಿ, ಮತ್ತು ಫಟಾಫಟ ಅದರ ನಕಲಿಸಿಕೊಳ್ಳಿ, ಇದನ್ನು ಮತ್ತೆ ನೋಡಲು ಸಾಧ್ಯವಿಲ್ಲ.

### -1- ಸರ್ವರ್ ಗೆ ಸಂಪರ್ಕಿಸಲು

ನಾವು ಮೊದಲು ನಮ್ಮ ಕ್ಲೈಂಟ್ ರಚಿಸೋಣ:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // ವೃತ್ತಾಂತ ಪರಿಶೀಲನೆಗಾಗಿ ಜೋಡ್ ಅನ್ನು ಆಮದುಮಾಡಿ

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

ಮುಂಬರುವ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಅಗತ್ಯ ಲೈಬ್ರರಿಗಳನ್ನು ಆಮದು ಮಾಡಿದ್ದೇವೆ
- `client` ಮತ್ತು `openai` ಎಂಬ ಎರಡು ಸದಸ್ಯರೊಂದಿಗೆ ಕ್ಲಾಸ್ ರಚಿಸಿರುವುದು, ಇದರಿಂದ ನಾವು ಕ್ಲೈಂಟ್ ಅನ್ನು ನಿರ್ವಹಿಸಿ LLM ಜೊತೆಗೆ ಸಂವಹನ ಮಾಡಬಹುದು.
- ನಮ್ಮ LLM ಇನ್ಸ್ಟಾನ್ಸ್ ಅನ್ನು GitHub Models ಬಳಸಲು `baseUrl` ನಲ್ಲಿ Inference API ಗೆ ಸೂಚಿಸಿದೆವು.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdio ಸಂಪರ್ಕಕ್ಕಾಗಿ ಸರ್ವರ್ ಪ್ಯಾರಾಮೀಟರ್‌ಗಳನ್ನು ರಚಿಸಿ
server_params = StdioServerParameters(
    command="mcp",  # ಕಾರ್ಯಗತಗೊಳಿಸಲು ಸಾಧ್ಯವಾದದು
    args=["run", "server.py"],  # ಐಚ್ಛಿಕ ಕಮಾಂಡ್ ಲೈನ್ ಆರ್ಗ್ಯುಮೆಂಟ್‌ಗಳು
    env=None,  # ಐಚ್ಛಿಕ ಪರಿಸರ ಚರಗಳು
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # ಸಂಪರ್ಕವನ್ನು ಆರಂಭಿಸಿ
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

ಮುಂಬರುವ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- MCP ಗಾಗಿ ಅಗತ್ಯ ಲೈಬ್ರರಿಗಳನ್ನು ಆಮದು ಮಾಡಿದ್ದೇವೆ
- ಕ್ಲೈಂಟ್ ರಚಿಸಿದ್ದೇವೆ

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

ಮೊದಲು, ನಿಮ್ಮ `pom.xml` ಫೈಲ್ ಗೆ LangChain4j ಅವಲಂಬನೆಗಳನ್ನು ಸೇರಿಸಲು ಅಗತ್ಯವಿದೆ. MCP ಒಳಗೊಂಡಿಕೆ ಮತ್ತು GitHub Models ಬೆಂಬಲದಿಗಾಗಿ ಈ ಅವಲಂಬನೆಗಳನ್ನು ಸೇರಿಸಿ:

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

ಆಮೇಲೆ ನಿಮ್ಮ Java ಕ್ಲೈಂಟ್ ಕ್ಲಾಸ್ ರಚಿಸಿ:

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
    
    public static void main(String[] args) throws Exception {        // GitHub ಮಾದರಿಗಳನ್ನು ಬಳಸಲು LLM ಅನ್ನು ಸಂರಚಿಸಿ
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು MCP ಸಾರಿಗೆ ರಚಿಸಿ
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP ಗ್ರಾಹಕ ರಚಿಸಿ
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

ಮುಂಬರುವ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- **LangChain4j ಅವಲಂಬನೆಗಳನ್ನು ಸೇರಿಸಿದ್ದೇವೆ**: MCP ಒಳಗೊಂಡಿಕೆ, OpenAI ಅಧಿಕೃತ ಕ್ಲೈಂಟ್ ಮತ್ತು GitHub Models ಬೆಂಬಲಕ್ಕಾಗಿ
- **LangChain4j ಲೈಬ್ರರಿಗಳನ್ನು ಆಮದು ಮಾಡಿದ್ದೇವೆ**: MCP ಒಳಗೊಂಡಿಕೆ ಮತ್ತು OpenAI ಚಾಟ್ ಮಾದರಿ ಕಾರ್ಯಗತಿಗೊಳಿಸಲು
- **`ChatLanguageModel` ರಚಿಸಿದ್ದೇವೆ**: GitHub Models ಬಳಸಲು GitHub ಟೋಕನ್‌ನೊಂದಿಗೆ ಶಿಕ್ಷಿತವಾಗಿ
- **HTTP ಟ್ರಾನ್ಸ್‌ಪೋರ್ಟ್ ವ್ಯವಸ್ಥೆ ಮಾಡಿದ್ದೇವೆ**: Server-Sent Events (SSE) ಬಳಸಿ MCP ಸರ್ವರ್ ಗೆ ಸಂಪರ್ಕ
- **MCP ಕ್ಲೈಂಟ್ ರಚಿಸಿದ್ದೇವೆ**: ಸರ್ವರ್ ಜೊತೆಗೆ ಸಂವಹನ ನಿರ್ವಹಿಸಲು
- **LangChain4j ಬಿಲ್ಟ್-ಇನ್ MCP ಬೆಂಬಲ ಬಳಸದಿದೇವೆ**: ಇದು LLM ಗಳ ಮತ್ತು MCP ಸರ್ವರ್‌ಗಳ ಮಧ್ಯೆ ಸಂಯೋಜನೆಯನ್ನು ಸರಳಗೊಳಿಸುತ್ತದೆ

#### Rust

ಈ ಉದಾಹರಣೆಯು ನಿಮ್ಮ ಬಳಿ Rust ಆಧಾರಿತ MCP ಸರ್ವರ್ ಇದೆಯೆಂದು ನಿರೀಕ್ಷಿಸುತ್ತದೆ. ಇಲ್ಲದಿದ್ರೆ, [01-first-server](../01-first-server/README.md) ಪಾಠವನ್ನು ನೋಡಿಕೊಂಡು ಸರ್ವರ್ ರಚಿಸಿ.

Rust MCP ಸರ್ವರ್ ಹೊಂದಿದ್ದರೆ, ಟರ್ಮಿನಲ್ ತೆರೆಯಿರಿ ಮತ್ತು ಸರ್ವರ್ ಇರುವ ಡೈರೆಕ್ಟರಿಗೆ ತೆರಳಿ. ನಂತರ ಕೆಳಗಿನ ಆಜ್ಞೆಯನ್ನು ರನ್ ಮಾಡಿ ಹೊಸ LLM ಕ್ಲೈಂಟ್ ಪ್ರಾಜೆಕ್ಟ್ ರಚಿಸಲು:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

ನಿಮ್ಮ `Cargo.toml` ಫೈಲ್ ಗೆ ಈ ಅವಲಂಬನೆಗಳನ್ನು ಸೇರಿಸಿ:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> OpenAI ಗಾಗಿ ಅಧಿಕೃತ Rust ಲೈಬ್ರರಿ ಇಲ್ಲ, ಆದರೆ `async-openai` ಕ್ರೇಟ್ ಏರ್ಪಡಿಸಲಾಗಿದೆ ಅದು ಹೀಗೊಂದು [ಸಮುದಾಯ ನಿರ್ವಹಿತ ಲೈಬ್ರರಿ](https://platform.openai.com/docs/libraries/rust#rust) ಆಗಿದ್ದು, ಸಾಮಾನ್ಯವಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.

`src/main.rs` ಫೈಲ್ ತೆರೆಯಿರಿ ಮತ್ತು ಈ ಕೆಳಗಿನ ಕೋಡಿನಿಂದ ಅದನ್ನು ಮರುಬರೆಯಿರಿ:

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
    // ಪ್ರಾಥಮಿಕ ಸಂದೇಶ
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI ಗ್ರಾಹಕವನ್ನು ಸೆಟ್‌ಅಪ್ ಮಾಡಿ
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP ಗ್ರಾಹಕವನ್ನು ಸೆಟ್‌ಅಪ್ ಮಾಡಿ
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

    // TODO: MCP ಸಲಕರಣೆಯ ಲಿಸ್ಟಿಂಗ್ ಪಡೆದುಕೊಳ್ಳಿ

    // TODO: ಸಲಕರಣೆ ಕರೆದೊಯ್ಯುವ ಮೂಲಕ LLM ಸಂಭಾಷಣೆ

    Ok(())
}
```

ಈ ಕೋಡ್ ಒಂದು ಮೂಲಭೂತ Rust ಅಪ್ಲಿಕೇಶನ್ನನ್ನು ಸ್ಥಾಪಿಸುತ್ತದೆ ಅದು MCP ಸರ್ವರ್ ಮತ್ತು GitHub Models ಜೊತೆಗೆ LLM ಸಂವಹನಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸುತ್ತದೆ.

> [!IMPORTANT]
> ಅಪ್ಲಿಕೇಶನ್ ರನ್ ಮಾಡುವ ಮುನ್ನ `OPENAI_API_KEY` ಪರಿಸರ ಚರವನ್ನು ನಿಮ್ಮ GitHub ಟೋಕನ್ ನೊಂದಿಗೆ ಸೆಟ್ ಮಾಡಿರಬೇಕು.

ಚೆನ್ನಾಗಿದೆ, ಮುಂದಿನ ಹಂತಕ್ಕೆ ಹೋಗೋಣ, ಸರ್ವರ್‌ನ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡೋಣ.

### -2- ಸರ್ವರ್ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ

ಈಗ ನಾವು ಸರ್ವರ್ ಗೆ ಸಂಪರ್ಕಿಸಿ ಅದರ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಕೇಳುತ್ತೇವೆ:

#### Typescript

ಅದೇ ಕ್ಲಾಸಿನಲ್ಲಿ, ಕೆಳಗಿನ ಮೆತೋಡ್ಗಳನ್ನು ಸೇರಿಸಿ:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // ಉಪಕರಣಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುವುದು
    const toolsResult = await this.client.listTools();
}
```

ಮುಂಬರುವ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಸರ್ವರ್ ಗೆ ಸಂಪರ್ಕಿಸುವ `connectToServer` ಕೋಡ್ ಸೇರಿಸಿದ್ದೇವೆ.
- ನಮ್ಮ ಅಪ್ಲಿಕೇಶನ್ ಫ್ಲೋವನ್ನು ನಿರ್ವಹಿಸುವ `run` ಮೆತೋಡ್ ರಚಿಸಿದ್ದೇವೆ; ಇದೀಗ ಅದು ಕೇವಲ ಉಪಕರಣಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ, ಆದರೆ ಎಲ್ಲವೂ ಸ್ವಲ್ಪ ಬಳಿಕ ಸೇರಿಸಲಾಗುತ್ತದೆ.

#### Python

```python
# ಲಭ್ಯವಿರುವ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# ಲಭ್ಯವಿರುವ ಉಪಕರಣಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

ನಾವು ಸೇರಿಸಿರುವದು:

- ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಉಪಕರಣಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ ಆಗ ಮುದ್ರಣ ಮಾಡಿಕೊಂಡಿದೆವು. ಉಪಕರಣಗಳಿಗಾಗಿ ನಾವು `inputSchema` ಕೂಡ ಪಟ್ಟಿ ಮಾಡಿದ್ದೇವೆ ನಂತರ ಬಳಕೆ ಮಾಡಲು.

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

ಮುಂಬರುವ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- MCP ಸರ್ವರ್‌ನಲ್ಲಿ ಲಭ್ಯವಿರುವ ಉಪಕರಣಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿದ್ದೇವೆ
- ಪ್ರತಿ ಉಪಕರಣದ ಹೆಸರು, ವಿವರಣೆ ಮತ್ತು ಅದರ ಸ್ಕೀಮಾವನ್ನು ಪಟ್ಟಿ ಮಾಡಿದ್ದೇವೆ. ನಾವು ಈ ಸ್ಕೀಮಾವನ್ನು ಬಳಕೆ ಮಾಡಲು ಮುಂದಿನ ಹಂತದಲ್ಲಿ ಉಪಯೋಗಿಸುವುದು.

#### Java

```java
// ಸ್ವಯಂಚಾಲಿತವಾಗಿ MCP ಸೇವೆಕರಿಂದ ಟೂಲ್‌ಗಳನ್ನು ಕಂಡುಹಿಡಿಯುವ ಟೂಲ್ಗಳನ್ನು ಒದಗಿಸುವವರನ್ನು ರಚಿಸಿ
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP ಟೂಲ್ ಒದಗಿಸುವವರು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿರ್ವಹಿಸುತ್ತದೆ:
// - MCP ಸರ್ವರ್‌ನಿಂದ ಲಭ್ಯವಿರುವ ಟೂಲ್ಗಳನ್ನು ಪಟ್ಟಿಮಾಡುವುದು
// - MCP ಟೂಲ್ ರೂಪರೇಖೆಗಳನ್ನು LangChain4j ಸ್ವರೂಪಕ್ಕೆ ಪರಿವರ್ತನೆ ಮಾಡುವುದು
// - ಟೂಲ್ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ನಿರ್ವಹಿಸುವುದು
```

ಮುಂಬರುವ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- MCP ಸರ್ವರ್‌ನಿಂದ ಎಲ್ಲಾ ಉಪಕರಣಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕಂಡುಹಿಡಿದು ನೋಂದಣಿ ಮಾಡುವ `McpToolProvider` ರಚಿಸಿದ್ದೇವೆ
- ಉಪಕರಣದ ಸ್ಕೀಮಾಗಳನ್ನು MCP ಟೂಲ್ ರೂಪದಿಂದ LangChain4j ಟೂಲ್ ಸ್ವರೂಪಕ್ಕೆ ಆಂತರಿಕವಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ
- ಈ ವಿಧಾನವು ಕೈಯಿಂದ ಉಪಕರಣ ಪಟ್ಟಿಯನ್ನು ಮಾಡುವುದು ಮತ್ತು ಪರಿವರ್ತಿಸುವ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸರಳಗೊಳಿಸುತ್ತದೆ

#### Rust

MCP ಸರ್ವರ್‌ನಿಂದ ಉಪಕರಣಗಳನ್ನು ಪಡೆಯಲು `list_tools` ಮೆತೋಡ್ ಬಳಸಲಾಗುತ್ತದೆ. ನಿಮ್ಮ `main` ಫಂಕ್ಷನ್‌ನಲ್ಲಿ MCP ಕ್ಲೈಂಟ್ ಸೆಟ್ ಅಪ್ ಮಾಡಿದ ಮೇಲೆ, ಕೆಳಗಿನ ಕೋಡ್ ಸೇರಿಸಿ:

```rust
// MCP ಸಾಧನ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ಪಡೆಯಿರಿ
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- ಸರ್ವರ್ ಸಾಮರ್ಥ್ಯಗಳನ್ನು LLM ಉಪಕರಣಗಳಿಗೆ ಪರಿವರ್ತಿಸಿ

ಸರ್ವರ್ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿದ ನಂತರದ ಹಂತವೇ ಅವುಗಳನ್ನು LLM ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಸ್ವರೂಪಕ್ಕೆ ಪರಿವರ್ತಿಸುವುದು. ಇದರಿಂದ ನಾವು ಈ ಸಾಮರ್ಥ್ಯಗಳನ್ನು LLM ಗೆ ಉಪಕರಣಗಳಾಗಿ ಒದಗಿಸಬಹುದು.

#### TypeScript

1. MCP ಸರ್ವರ್ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು LLM ಬಳಸಬಹುದಾದ ಉಪಕರಣ ಸ್ವರೂಪಕ್ಕೆ ಪರಿವರ್ತಿಸಲು ಕೆಳಗಿನ ಕೋಡ್ ಸೇರಿಸಿ:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // ಇನ್ಪುಟ್_ಸ್ಕೀಮಾ ಆಧರಿಸಿದ ಜೋಡ್ ಸ್ಕೀಮಾ ರಚಿಸಿ
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // ಪ್ರಕಾರವನ್ನು "function" ಎಂದು ಸ್ಪಷ್ಟವಾಗಿ ನಿಗದಿಪಡಿಸಿ
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

    ಮೇಲಿನ ಕೋಡ್ MCP ಸರ್ವರ್‌ನಿಂದ ಪ್ರತಿಕ್ರಿಯೆ ತೆಗೆದುಕೊಂಡು ಅದನ್ನು LLM ಗೆ ಅರ್ಥವಾಗುವ ಉಪಕರಣ ವಿವರಣೆ ಸ್ವರೂಪಕ್ಕೆ ಪರಿವರ್ತಿಸುತ್ತದೆ.

2. `run` ಮೆತೋಡ್ ಅನ್ನು ಇದುವರೆಗೂ ನಮೂದಿಸಿ ಸರ್ವರ್ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಲು ಅಪ್ಡೇಟ್ ಮಾಡೋಣ:

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

    ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ, ನಾವು `run` ಮೆತೋಡ್ ಅನ್ನು ಅಪ್‌ಡೇಟ್ ಮಾಡಿದ್ದು ಪ್ರತಿಯೊಂದು ದಾಖಲೆಗೆ `openAiToolAdapter` ಅನ್ನು ಕರೆಯುತ್ತದೆ.

#### Python

1. ಮೊದಲು, ಕೆಳಗಿನ ಪರಿವರ್ತಕ ಫಂಕ್ಷನ್ ರಚಿಸೋಣ

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

    `convert_to_llm_tools` ಫಂಕ್ಷನ್ ನಲ್ಲಿ, MCP ಉಪಕರಣ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು LLM ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಸ್ವರೂಪಕ್ಕೆ ಪರಿವರ್ತಿಸಲಾಗುತ್ತದೆ.

2. ನಂತರ, ನಮ್ಮ ಕ್ಲೈಂಟ್ ಕೋಡ್ ಅನ್ನು ಈ ಫಂಕ್ಷನ್ ಬಳಸಿ ಅಪ್ಡೇಟ್ ಮಾಡೋಣ:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    ಇಲ್ಲಿ, ಅಂದರೆ MCP ಉಪಕರಣ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು LLM ಗೆ ಬಳಸುವದರಾಗಿ `convert_to_llm_tool` ಕರೆ ಮಾಡಲಾಗಿದೆ.

#### .NET

1. MCP ಉಪಕರಣ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು LLM ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಸ್ವರೂಪಕ್ಕೆ ಪರಿವರ್ತಿಸಲು ಕೋಡ್ ಸೇರಿಸೋಣ

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

ಮುಂಬರುವ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- `ConvertFrom` ಫಂಕ್ಷನ್ ರಚಿಸಿದ್ದೇವೆ, ಇದು ಹೆಸರು, ವಿವರಣೆ ಮತ್ತು ಇನ್ಪುಟ್ ಸ್ಕೀಮಾ ಸ್ವೀಕರಿಸುತ್ತದೆ.
- ಅದು `FunctionDefinition` ರಚಿಸಿ ಅದನ್ನು `ChatCompletionsDefinition` ಗೆ ಪಾಸ್ ಮಾಡುತ್ತದೆ. ಇದು LLM ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ರೂಪವಾಗಿದೆ.

2. ಈಗ ಈ ಫಂಕ್ಷನ್ ಉಪಯೋಗಿಸಿ ಕೆಲವು ಇನ್ನು-existing ಕೋಡ್ ಅಪ್ಡೇಟ್ ಮಾಡೋಣ:

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
// ಸ್ವಾಭಾವಿಕ ಭಾಷೆ ಸಂವಹನಕ್ಕಾಗಿ ಬಾಟ್ ಇಂಟರ್‌ಫೇಸ್ ರಚಿಸಿ
public interface Bot {
    String chat(String prompt);
}

// LLM ಮತ್ತು MCP ಟೂಲ್ಸ್‌ನೊಂದಿಗೆ AI ಸೇವೆಯನ್ನು ಸಂರಚಿಸಿ
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

ಮುಂಬರುವ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ನೈಸರ್ಗಿಕ ಭಾಷೆ ಸಂವಹನಕ್ಕಾಗಿ ಸರಳ `Bot` ಇಂಟರ್ಫೇಸ್ ಪರಿಭಾಷಿಸಿದ್ದೇವೆ
- LangChain4j ನ `AiServices` ಬಳಸಿ LLM ಮತ್ತು MCP ಟೂಲ್ ಪೂರೈಕೆದಾರರನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಬಂಧಿಸಿದ್ದೇವೆ
- ಈ ಫ್ರೆಂವರ್ಕ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಟೂಲ್ ಸ್ಕೀಮಾ ಪರಿವರ್ತನೆ ಮತ್ತು ಫಂಕ್ಷನ್ ಕಾಲಿಂಗ್ ಅನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ
- ಈ ವಿಧಾನವು ಕೈಯಿಂದ ಟೂಲ್ ಪರಿವರ್ತನೆ ಅವಶ್ಯಕತೆವನ್ನು ತೆಗೆದು ಹಾಕುತ್ತದೆ - LangChain4j MCP ಉಪಕರಣಗಳನ್ನು LLM- uyğun ಸ್ವರೂಪಕ್ಕೆ ಪರಿವರ್ತಿಸುವ ಎಲ್ಲಾ ಸಖ್ಯತೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ

#### Rust

MCP ಉಪಕರಣ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು LLM ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಸ್ವರೂಪಕ್ಕೆ ಪರಿವರ್ತಿಸಲು, ನಾವು ಟೂಲ್ ಪಟ್ಟಿ ರೂಪಿಸುವ ಸಹಾಯಕ ಫಂಕ್ಷನ್ ಸೇರಿಸುವುದಾಗಿ ನಿರ್ಧರಿಸಿದ್ದೇವೆ. ಕೆಳಗಿನ ಕೋಡ್ ಅನ್ನು `main.rs` ಫೈಲ್‌ನಲ್ಲಿ `main` ಫಂಕ್ಷನ್ ಕೆಳಗೆ ಸೇರಿಸಿ. ಇದು LLM ಕ್ಕೆ ವಿನಂತಿಗಳು ಮಾಡುತ್ತಿರುವಾಗ ಕರೆಗೊಳ್ಳುತ್ತದೆ:

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

ಚೆನ್ನಾಗಿದೆ, ನಾವು ಬಳಕೆದಾರ ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಸಿದ್ಧರಲ್ಲ, ಆದ್ದರಿಂದ ಮುಂದುವರಿಯೋಣ.

### -4- ಬಳಕೆದಾರ ಪ್ರಾಂಪ್ಟ್ ವಿನಂತಿಯನ್ನು ನಿರ್ವಹಿಸಿ

ಈ ಭಾಗದಲ್ಲಿ, ನಾವು ಬಳಕೆದಾರ ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸುವೆವು.

#### TypeScript

1. LLM ಅನ್ನು ಕರೆಸಲು ಬಳಸುವ ಮೆತೋಡ್ ಸೇರಿಸಿ:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. ಸರ್ವರ್‌ನ ಉಪಕರಣವನ್ನು ಕರೆಮಾಡಿ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ಫಲಿತಾಂಶದೊಂದಿಗೆ ಏನಾದರೂ ಮಾಡಿರಿ
        // ಮಾಡಬೇಕಿದೆ

        }
    }
    ```

    ಈ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

    - `callTools` ಎಂಬ ಮೆತೋಡ್ ಸೇರಿಸಿದ್ದೇವೆ.
    - LLM ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ತೆಗೆದು ಇಲ್ಲಿಯವರೆ ತಲುಪಲಾದ ಉಪಕರಣಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // ಟೂಲ್ ಕರೆ ಮಾಡಿ
        }
        ```

    - LLM ಸೂಚಿಸಿದರೆ ಉಪಕರಣವನ್ನು ಕರೆಸುತ್ತದೆ:

        ```typescript
        // 2. ಸರ್ವರ್‌ನ ಉಪಕರಣವನ್ನು ಕರೆಸಿರಿ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ಫಲಿತಾಂಶದಿಂದ ಏನಾದರೂ ಮಾಡಿ
        // ಮಾಡಲು ಬಾಕಿ
        ```

2. `run` ಮೇಳೋಡ್ ಎಡಿಟ್ ಮಾಡಿ LLM ಮತ್ತು `callTools` ಕರೆಗಳನ್ನು ಸೇರಿಸೋಣ:

    ```typescript

    // 1. LLMಗೆ ಒಳಗಾಗುವ ಸಂದೇಶಗಳನ್ನು ರಚಿಸಿ
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. LLM ಅನ್ನು ಕರೆಮಾಡುವುದು
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. LLM ರೆಸ್ಪಾನ್ಸ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ, ಪ್ರತ್ಯೇಕ ಆಯ್ಕೆಗಳಿಗೆ, ಟೂಲ್ ಕಾಲ್‌ಗಳಿರುವುದನ್ನು ಪರಿಶೀಲಿಸಿ
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

ಚೆನ್ನಾಗಿದೆ, ಪೂರ್ಣ ಕೋಡ್ ಪಟ್ಟಿ:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // ಸ್ಕೀಮಾ ಮಾನ್ಯತೆಗಾಗಿ zod ಅನ್ನು ಆಮದುಮಾಡಿ

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // ಭವಿಷ್ಯದಲ್ಲಿ ಈ URL ಗೆ ಬದಲಾಗಿಸಬೇಕಾಗಬಹುದು: https://models.github.ai/inference
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
          // ಇನ್ಪುಟ್_ಸ್ಕೀಮಾವನ್ನು ಆಧರಿಸಿ zod ಸ್ಕೀಮಾ ರಚಿಸಿ
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರಕಾರವನ್ನು "ಕಾರ್ಯ" ಎಂದು ಸ್ಥಾನಗೊಳಿಸಿ
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
    
    
          // 2. ಸರ್ವರ್‌ನ ಉಪಕರಣವನ್ನು ಕರೆ ಮಾಡಿ
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. ಫಲಿತಾಂಶದೊಂದಿಗೆ ಏನೋ ಮಾಡಿರಿ
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
    
        // 3. LLM ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ, ಪ್ರತಿ ಆಯ್ಕೆಗೆ ಉಪಕರಣ ಕರೆದಿರೋದು ಇದೆಯೇ ಎಂದು ತಪಾಸಿಸಿ
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

1. LLM ಅನ್ನು ಕರೆಸಲು ಅಗತ್ಯವಿರುವ ಇಂಪೋರ್ಟ್‌ಗಳನ್ನು ಸೇರಿಸೋಣ

    ```python
    # ಎಲ್‌ಎಲ್‌ಎಮ್
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. ನಂತರ, LLM ಅನ್ನು ಕರೆಸುವ ಫಂಕ್ಷನ್ ಸೇರಿಸೋಣ:

    ```python
    # ಎಲ್‌ಎಲ್‌ಎಂ

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
            # ಐಚ್ಛಿಕ ಗುಣಧರ್ಮಗಳು
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

    ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

    - MCP ಸರ್ವರ್‌ನಲ್ಲಿ ಕಂಡು ಪರಿವರ್ತಿಸಿದ ಮರುವಿನ್ಯಾಸಗಳನ್ನು LLM ಗೆ ಕೊಡಲು.
    - ನಂತರ, ಆ ಫಂಕ್ಷನ್ ಗಳೊಂದಿಗೆ LLM ಗೆ ಕರೆ ಮಾಡಿದೆವು.
    - ಫಲಿತಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಿ ಯಾವ ಫಂಕ್ಷನ್‌ಗಳನ್ನು ಕರೆಸಬೇಕೆಂದು ನಿರ್ಧರಿಸುತ್ತೇವೆ.
    - ಕೊನೆಗೆ ಕರೆ ಮಾಡಬೇಕಾದ ಫಂಕ್ಷನ್ ಗಳ ಸರಣಿಯನ್ನು ಪಾಸ್ ಮಾಡುತ್ತೇವೆ.

3. ಕೊನೆಯ ಹಂತ, ಮುಖ್ಯ ಕೋಡ್ ಅಪ್ಡೇಟ್ ಮಾಡೋಣ:

    ```python
    prompt = "Add 2 to 20"

    # ಎಲ್ಲಕ್ಕೆ ಯಾವವು ಉಪಕರಣಗಳಿವೆ ಎಂದು LLM ಗಿಂತ ಕೇಳಿ, ಇದ್ದರೆ
    functions_to_call = call_llm(prompt, functions)

    # ಸೂಚಿಸಲಾಗಿರುವ ಕಾರ್ಯಗಳನ್ನು ಕರೆ ಮಾಡು
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    ಇಲ್ಲಿ ಕೊನೆ ಹಂತ, ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

    - LLM ಸೂಚಿಸಿದ ಫಂಕ್ಷನ್ ಆಧಾರದಲ್ಲಿ MCP ಉಪಕರಣವನ್ನು `call_tool` ಮೂಲಕ ಕರೆ ಮಾಡುತ್ತಿದ್ದೇವೆ.
    - ಉಪಕರಣದ ಕರೆ ಫಲಿತಾಂಶವನ್ನು MCP ಸರ್ವರ್‍ಗೆ ಮುದ್ರಿಸುತ್ತೇವೆ.

#### .NET

1. LLM ಪ್ರಾಂಪ್ಟ್ ವಿನಂತಿಗೆ ಸಂಬಂದಿಸಿದ ಕೋಡ್ ಇಲ್ಲಿದೆ:

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

    ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

    - MCP ಸರ್ವರ್‌ನಿಂದ ಉಪಕರಣಗಳನ್ನು ಪಡೆದಿದ್ದೇವೆ, `var tools = await GetMcpTools()`.
    - ಬಳಕೆದಾರ ಪ್ರಾಂಪ್ಟ್ ನಿಗದಿಪಡಿಸಿದ್ದೇವೆ, `userMessage`.
    - ಮಾದರಿ ಮತ್ತು ಉಪಕರಣಗಳನ್ನು ಸೂಚಿಸುವ ಆಯ್ಕೆಗಳುಳ್ಳ ಆಬ್‌ಜೆಕ್ಟ್ ರಚಿಸಿದ್ದೇವೆ.
    - LLM ಗೆ ವಿನಂತಿ ಮಾಡಿದ್ದಾರೆ.

2. ಕೊನೆಯ ಹೆಜ್ಜೆ, LLM function callನೆ ಯಾಕುಣಿ ಪರಿಶೀಲನೆ ಮಾಡೋಣ:

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

    ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

    - ಫಂಕ್ಷನ್ ಕಾಲ್‌ಗಳ ಪಟ್ಟಿಯಲ್ಲಿ ಲೂಪ್ ಮಾಡುತ್ತೇವೆ.
    - ಪ್ರತಿ ಉಪಕರಣ ಕರೆಯುವಿಕೆಯಲ್ಲಿ ಹೆಸರು ಮತ್ತು ಆರ್ಗ್ಯೂಮೆಂಟ್‌ಗಳನ್ನು ಅನಾಲೈಸಿಸಿ MCP ಕ್ಲೈಂಟ್ ಮೂಲಕ ಉಪಕರಣವನ್ನು ಕರೆಸುತ್ತೇವೆ. ಕೊನೆಯಲ್ಲಿ ಫಲಿತಾಂಶವನ್ನು ಮುದ್ರಿಸುತ್ತೇವೆ.

ಪೂರ್ಣ ಕೋಡ್:

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
    // MCP ಸಾಧನಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಬಳಸುವ ಸಹಜ ಭಾಷೆಯ ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ
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

ಮುಂಬರುವ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಸರಳ ನೈಸರ್ಗಿಕ ಭಾಷೆ ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ಬಳಸಿ MCP ಸರ್ವರ್ ಉಪಕರಣಗಳೊಂದಿಗೆ ಸಂವಹನ ಮಾಡಿದೆವು
- LangChain4j ಫ್ರೆಂವರ್ಕ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿರ್ವಹಿಸುತ್ತದೆ:
  - ಉಪಯೋಗದಾರ ಪ್ರಾಂಪ್ಟ್ ಲಾಜಿಕ್ ಅನುಸಾರ ಉಪಕರಣ ಕರೆಯುವ ಕಾರ್ಯ ರೂಪಾಂತರ
  - LLM ನಿರ್ಧಾರ ಆಧಾರದಲ್ಲಿ ಸೂಕ್ತ MCP ಉಪಕರಣಗಳನ್ನು ಕರೆಸುವುದು
  - LLM ಮತ್ತು MCP ಸರ್ವರ್ ನಡುವಿನ ಸಂಭಾಷಣೆ ನಿರ್ವಹಣೆ
- `bot.chat()` ವಿಧಾನವು ನೈಸರ್ಗಿಕ ಭಾಷೆ ಉತ್ತರಗಳನ್ನು ನೀಡುತ್ತದೆ, ಆಗ MCP ಉಪಕರಣಗಳ ಫಲಿತಾಂಶಗಳು ಒಳಗೊಂಡಿರಬಹುದು
- ಈ ವಿಧಾನ ಬಳಕೆದಾರರಿಗೆ MCP ಕೈಗೆಟಕದ ಅನುಭವವನ್ನು ಒದಗಿಸುತ್ತದೆ

ಪೂರ್ಣ ಕೋಡ್ ಉದಾಹರಣೆ:

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

ಅಲ್ಲಿ ಬಹುಮತಿಯ ಕಾರ್ಯಗಳು ನಡೆಯುತ್ತವೆ. ಪ್ರಾರಂಭಿಕ ಬಳಕೆದಾರ ಪ್ರಾಂಪ್ಟ್ ಜೊತೆ LLM ಅನ್ನು ಕರೆಸುತ್ತೇವೆ, ನಂತರ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಯಾವುದೇ ಟೂಲು ಕರೆ ಬೇಕಾದರೆ ಅದನ್ನು ಕರೆದು ಸಂಭಾಷಣೆ ಮುಂದುವರೆಸುತ್ತೇವೆ LLM ಜೊತೆಗೆ ಟೆರ್ಮಿನೇಟ್ ಆಗುವವರೆಗೆ ಮತ್ತು ಅಂತಿಮ ಪ್ರತಿಕ್ರಿಯೆ ತಾಗುವವರೆಗೆ.

ನಾವು LLM ಗೆ ಬಹಳ ಬಾರಿ ಕರೆ ಮಾಡಬೇಕಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಅದನ್ನು ನಿರ್ವಹಿಸುವ ಫಂಕ್ಷನ್ ಡಿಫೈನ್ ಮಾಡೋಣ. ಕೆಳಗಿನ ಫಂಕ್ಷನ್ ಅನ್ನು ನಿಮ್ಮ `main.rs` ಫೈಲ್ ಗೆ ಸೇರಿಸಿ:

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

ಈ ಫಂಕ್ಷನ್ LLM ಕ್ಲೈಂಟ್, ಸಂದೇಶಗಳ ಪಟ್ಟಿ (ಬಳಕೆದಾರ ಪ್ರಾಂಪ್ಟ್ ಸಹಿತ), MCP ಸರ್ವರ್‌ನಿಂದ টೂಲ್‌ಗಳು ತೆಗೆದುಕೊಂಡು LLM ಗೆ ವಿನಂತಿ ಕಳುಹಿಸಿ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.
LLM ನಿಂದ ಬರುವ ಪ್ರತಿಕ್ರಿಯೆಯಲ್ಲಿ `choices` ಎಂಬ ಅರೆ ಇರುತ್ತದೆ. ಯಾವುದೇ `tool_calls` ಇರುವುದೇ ಎಂದು ಫಲಿತಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಲು ನಾವು ಪ್ರಕ್ರಿಯೆಯನ್ನು ಇರಿಸಲಾಗುತ್ತದೆ. LLM ಒಂದು ನಿರ್ದಿಷ್ಟ ಉಪಕರಣವನ್ನು ಆರ್ಜುಮೆಂಟ್ಗಳೊಂದಿಗೆ ಕರೆಮಾಡಬೇಕಾಗಿದೆ ಎಂದು ತಿಳಿಯಲು ಇದನ್ನು ಬಳಸುತ್ತೇವೆ. LLM ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನಿರ್ವಹಿಸುವ ಫಂಕ್ಷನ್ ಅನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಲು ಕೆಳಗಿನ ಕೋಡ್ ಅನ್ನು ನಿಮ್ಮ `main.rs` ಫೈಲ್‌ನ ಅಡಿಯಲ್ಲಿ ಸೇರಿಸಿ:

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

    // ಹೊಂದಿದ್ದರೆ ವಿಷಯವನ್ನು ಮುದ್ರಿಸಿ
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // ಉಪಕರಣ ಕರೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // ಸಹಾಯಕ ಸಂದೇಶವನ್ನು ಸೇರಿಸಿ

        // ಪ್ರತಿಯೊಂದು ಉಪಕರಣ ಕರೆಗಳನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಿ
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // ಸಂದೇಶಗಳಿಗೆ ಉಪಕರಣ ಫಲಿತಾಂಶವನ್ನು ಸೇರಿಸಿ
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // ಉಪಕರಣ ಫಲಿತಾಂಶಗಳೊಂದಿಗೆ ಸಂಭಾಷಣೆಯನ್ನು ಮುಂದುವರಿಸಿ
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
  
`tool_calls` ಇದ್ದರೆ, ಅದು ಉಪಕರಣ ಮಾಹಿತಿಯನ್ನು ತೆಗೆದು, MCP ಸರ್ವರ್‌ಗೆ ಉಪಕರಣ ವಿನಂತಿಯನ್ನು ಕರೆದೊಯ್ಯುತ್ತದೆ ಮತ್ತು ಫಲಿತಾಂಶಗಳನ್ನು ಸಂಭಾಷಣೆ ಸಂದೇಶಗಳಿಗೆ ಸೇರಿಸುತ್ತದೆ. ನಂತರ ಅದು LLM ಜೊತೆ ಸಂಭಾಷಣೆಯನ್ನು ಮುಂದುವರೆಸುತ್ತದೆ ಮತ್ತು ಸಹಾಯಕನ ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ಉಪಕರಣ ಕರೆ ಫಲಿತಾಂಶಗಳೊಂದಿಗೆ ಸಂದೇಶಗಳನ್ನು ನವೀಕರಿಸುತ್ತದೆ.

MCP ಕರೆಗಳಿಗೆ LLM ನೀಡುವ ಉಪಕರಣ ಕರೆ ಮಾಹಿತಿಯನ್ನು ಹೊರತೆಗೆಯಲು, ಕರೆ ಮಾಡಲು ಬೇಕಾಗಿರುವ ಎಲ್ಲವನ್ನೂ ತೋರುವ ಮತ್ತೊಂದು ಸಹಾಯಕ ಫಂಕ್ಷನ್ ಅನ್ನು `main.rs` ಫೈಲ್‌ನ ಅಡಿಯಲ್ಲಿ ಸೇರಿಸುವುದು:  

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
  
ಎಲ್ಲಾ ತುದಿಗಳನ್ನು ವ್ಯವಸ್ಥೆ ಮಾಡಿರುವುದರಿಂದ, ಪ್ರಾಥಮಿಕ ಬಳಕೆದಾರ ಪ್ರಾಂಪ್ಟ್ ಅನ್ನು ನಿರ್ವಹಿಸಿ LLM ಅನ್ನು ಕರೆಮಾಡಬಹುದು. ನಿಮ್ಮ `main` ಫಂಕ್ಷನ್ನ್ನು ಕೆಳಗಿನ ಕೋಡ್ ಸೇರಿಸಿ ನವೀಕರಿಸಿ:

```rust
// ಉಪಕರಣ ಕರೆದೊಂದಿಗೆ ಎಲ್‌ಎಲ್‌ಎಂ ಸಂಭಾಷಣೆ
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
  
ಇದು LLM ನನ್ನು ಎರಡು ಸಂಖ್ಯೆಗಳ ಮೊತ್ತ ಕೇಳುವ ಪ್ರಾಥಮಿಕ ಬಳಕೆದಾರ ಪ್ರಾಂಪ್ಟ್‌ನೊಂದಿಗೆ ಕೇಳುತ್ತದೆ ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪ್ರಕ್ರಿಯೆಮಾಡಿ ಉಪಕರಣ ಕರೆಗಳನ್ನು ಡೈನಾಮಿಕ್ ಗೂ ಕರೆ ಮಾಡುತ್ತದೆ.

ಚೆನ್ನಾಗಿದೆ, ನೀವು ಯಶಸ್ವಿಯಾದಿರಿ!

## ಕಾರ್ಯ

ವ್ಯಾಯಾಮದಿಂದ ಕೋಡ್ ತೆಗೆದು ಸರ್ವರ್‌ಗೆ ಮತ್ತಷ್ಟು ಉಪಕರಣಗಳನ್ನು ಸೇರಿಸಿ. ಬಳಿಕ ವ್ಯಾಯಾಮದಂತೆ LLM ಹೊಂದಿರುವ ಕ್ಲೈಂಟ್ ರಚಿಸಿ ಮತ್ತು ವಿಭಿನ್ನ ಪ್ರಾಂಪ್ಟ್‌ಗಳೊಂದಿಗೆ ಪ್ರಯೋಗ ಮಾಡಿ ನಿಮ್ಮ ಎಲ್ಲಾ ಸರ್ವರ್ ಉಪಕರಣಗಳು ಡೈನಾಮಿಕ್ ಗಾಗಿ ಕರೆಯಲ್ಪಡುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಈ ರೀತಿಯ ಕ್ಲೈಂಟ್ ನಿರ್ಮಾಣ ಬಳಕೆದಾರರಿಗೆ ಉತ್ತಮ ಅನುಭವವನ್ನು ನೀಡುತ್ತದೆ, ಏಕೆಂದರೆ ಅವರು ನಿಖರ ಕ್ಲೈಂಟ್ ಆದೇಶಗಳ ಬದಲು ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ಬಳಸಬಹುದು ಮತ್ತು ಯಾವುದೇ MCP ಸರ್ವರ್ ಕರೆಗೇರೆಯಾಗುವುದನ್ನು ತಿಳಿಯದೆ ಇರಬಲ್ಲರು.

## ಪರಿಹಾರ

[Solution](./solution/README.md)

## ಮುಖ್ಯ ತಿರುವುಗಳು

- ನಿಮ್ಮ ಕ್ಲೈಂಟ್‌ಗೆ LLM ಸೇರಿಸುವುದು ಬಳಕೆದಾರರಿಗೆ MCP ಸರ್ವರ್‌ಗಳೊಂದಿಗೆ ಉತ್ತಮ ಸಂವಹನವನ್ನು ನೀಡುತ್ತದೆ.
- MCP ಸರ್ವರ್ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು LLMಗೆ ಅರ್ಥವಾಗುವಂತಹುದಾಗಿ ಪರಿವರ್ತಿಸುವ ಅಗತ್ಯವಿದೆ.

## ಮಾದರಿಗಳು

- [ಜಾವಾ ಕ್ಯಾಲ್ಕುಲೇಟರ್](../samples/java/calculator/README.md)
- [.Net ಕ್ಯಾಲ್ಕುಲೇಟರ್](../../../../03-GettingStarted/samples/csharp)
- [ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್](../samples/javascript/README.md)
- [ಟೈಪ್ಸ್ಕ್ರಿಪ್ಟ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್](../samples/typescript/README.md)
- [ಪೈಥಾನ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್](../../../../03-GettingStarted/samples/python)
- [ರಸ್ಟ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್](../../../../03-GettingStarted/samples/rust)

## ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳು

## ಮುಂದೇನು

- ಮುಂದಿನ: [Visual Studio Code ಬಳಸಿ ಸರ್ವರ್ ಉಪಯೋಗಿಸುವುದು](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->