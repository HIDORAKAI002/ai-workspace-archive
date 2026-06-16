# LLM ਨਾਲ ਕਲਾਇੰਟ ਬਣਾਉਣਾ

ਹੁਣ ਤੱਕ, ਤੁਸੀਂ ਇੱਕ ਸਰਵਰ ਅਤੇ ਕਲਾਇੰਟ ਕਿਵੇਂ ਬਣਾਉਂਦੇ ਹੋ ਵੇਖਿਆ ਹੈ। ਕਲਾਇੰਟ ਸਰਵਰ ਨੂੰ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਕਾਲ ਕਰ ਸਕਦਾ ਸੀ ਤਾਂ ਕਿ ਉਹ ਆਪਣੇ ਟੂਲ, ਸਾਧਨ ਅਤੇ ਪ੍ਰਾਂਪਟਾਂ ਦੀ ਸੂਚੀ ਬਣਾ ਸਕੇ। ਹਾਲਾਂਕਿ, ਇਹ ਇਕ ਬਹੁਤ ਵਿਆਵਹਾਰਿਕ ਤਰੀਕਾ ਨਹੀਂ ਹੈ। ਤੁਹਾਡੇ ਉਪਭੋਗਤਾ ਏਜੈਂਟਿਕ ਯੁੱਗ ਵਿਚ ਰਹਿੰਦੇ ਹਨ ਅਤੇ ਪ੍ਰਾਂਪਟਾਂ ਦੀ ਵਰਤੋਂ ਕਰਨ ਅਤੇ ਇੱਕ LLM ਨਾਲ ਸੰਚਾਰ ਕਰਨ ਦੀ ਉਮੀਦ ਰੱਖਦੇ ਹਨ। ਉਹ ਇਹ ਨਹੀਂ ਪਰੇਸ਼ਾਨ ਹੁੰਦੇ ਕਿਉਂਕਿ ਤੁਸੀਂ ਆਪਣੇ ਯੋਗਤਾਵਾਂ ਨੂੰ ਸਟੋਰ ਕਰਨ ਲਈ MCP ਦਾ ਉਪਯੋਗ ਕਰਦੇ ਹੋ; ਉਹ ਸਿਰਫ ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਦੀ ਵਰਤੋਂ ਨਾਲ बातचीत ਕਰਨ ਦੀ ਉਮੀਦ ਕਰਦੇ ਹਨ। ਤਾਂ ਅਸੀਂ ਇਸ ਸਮੱਸਿਆ ਦਾ ਹੱਲ ਕਿਵੇਂ ਕਰੀਏ? ਹੱਲ ਇਹ ਹੈ ਕਿ ਕਲਾਇੰਟ ਵਿੱਚ ਇੱਕ LLM ਸ਼ਾਮਿਲ ਕੀਤਾ ਜਾਵੇ।

## ਜਾਣੂ ਕਰਵਾਉਣਾ

ਇਸ ਪਾਠ ਵਿੱਚ ਅਸੀਂ ਧਿਆਨ ਕੇਂਦਰਤ ਕਰਾਂਗੇ ਕਿ ਕਲਾਇੰਟ ਵਿੱਚ ਇੱਕ LLM ਸ਼ਾਮਿਲ ਕਰਕੇ ਕਿਸ ਤਰ੍ਹਾਂ ਤੁਹਾਡੇ ਉਪਭੋਗਤਾ ਲਈ ਬਿਹਤਰ ਤਜਰਬਾ ਦਿੱਤਾ ਜਾ ਸਕਦਾ ਹੈ।

## ਸਿੱਖਣ ਦੇ ਉਦੇਸ਼

ਇਸ ਪਾਠ ਦੇ ਅੰਤ ਵਿੱਚ ਤੁਸੀਂ ਸਮਰੱਥ ਹੋਵੋਗੇ:

- ਇੱਕ ਕਲਾਇੰਟ ਬਣਾਉਣਾ ਜਿਸ ਵਿੱਚ ਇੱਕ LLM ਸ਼ਾਮਿਲ ਹੋਵੇ।
- MCP ਸਰਵਰ ਨਾਲ ਇੱਕ LLM ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਹਿਮਤੀ ਪੂਰਵਕ ਸੰਚਾਰ ਕਰਨਾ।
- ਕਲਾਇੰਟ ਪਾਸੇ ਉਚਿਤ ਉਪਭੋਗਤਾ ਅਨੁਭਵ ਪ੍ਰਦਾਨ ਕਰਨਾ।

## ਤਰੀਕਾ

ਚਲੋ ਸਮਝਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੀਏ ਕਿ ਅਸੀਂ ਕਿਹੜਾ ਤਰੀਕਾ ਅਪਣਾਉਣਾ ਹੈ। ਇੱਕ LLM ਸ਼ਾਮਿਲ ਕਰਨਾ ਆਸਾਨ ਲੱਗਦਾ ਹੈ, ਪਰ ਅਸੀਂ ਇਹ ਸ਼ੁਰੂਵਾਤ ਕਿਵੇਂ ਕਰੀਏ?

ਇੱਥੇ ਦਿਖਾਇਆ ਗਿਆ ਹੈ ਕਿ ਕਲਾਇੰਟ ਸਰਵਰ ਨਾਲ ਕਿਵੇਂ ਇੰਟਰੈਕਟ ਕਰੇਗਾ:

1. ਸਰਵਰ ਨਾਲ ਕਨੈਕਸ਼ਨ ਸਥਾਪਿਤ ਕਰੋ।

1. ਯੋਗਤਾ, ਪ੍ਰਾਂਪਟਾਂ, ਸਾਧਨਾਂ ਅਤੇ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਕੀਮਾ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰੋ।

1. ਇੱਕ LLM ਸ਼ਾਮਿਲ ਕਰੋ ਅਤੇ ਸੁਰੱਖਿਅਤ ਕੀਤੀਆਂ ਯੋਗਤਾਵਾਂ ਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਕੀਮਾ ਨੂੰ ਇਸ ਤਰੀਕੇ ਨਾਲ ਦਿਓ ਜੋ LLM ਸਮਝ ਸਕੇ।

1. ਯੂਜ਼ਰ ਪ੍ਰਾਂਪਟ ਨੂੰ LLM ਨੂੰ ਦਿਓ ਉਹਨਾਂ ਟੂਲਾਂ ਨਾਲ ਮਿਲਾ ਕੇ ਜੋ ਕਲਾਇੰਟ ਨੇ ਲਿਸਟ ਕੀਤੇ ਹਨ।

ਵਧੀਆ, ਹੁਣ ਅਸੀਂ ਪਹਿਲਾ ਦਰਜੇ ਦਾ ਸਮਝ ਗਏ ਹਾਂ ਕਿ ਅਸੀਂ ਇਹ ਕਿਵੇਂ ਕਰ ਸਕਦੇ ਹਾਂ, ਚਲੋ ਹੇਠਾਂ ਦਿੱਤੇ ਘਟਕ ਵਿਚ ਇਸਨੂੰ ਅਮਲ ਕਰੀਏ।

## ਅਭਿਆਸ: LLM ਨਾਲ ਕਲਾਇੰਟ ਬਣਾਉਣਾ

ਇਸ ਅਭਿਆਸ ਵਿੱਚ ਅਸੀਂ ਸਿੱਖਾਂਗੇ ਕਿ ਕਲਾਇੰਟ ਵਿੱਚ LLM ਕਿਵੇਂ ਸ਼ਾਮਿਲ ਕਰੀਏ।

### ਗਿਟਹੱਬ ਪर्सਨਲ ਐਕਸੈੱਸ ਟੋਕਨ ਨਾਲ ਪ੍ਰਮਾਣਿਕਤਾ

ਗਿਟਹੱਬ ਟੋਕਨ ਬਣਾਉਣਾ ਇੱਕ ਸਿੱਧਾ ਪ੍ਰਕਿਰਿਆ ਹੈ। ਇੱਥੇ ਹੈ ਕਿ ਤੁਸੀਂ ਇਹ ਕਿਵੇਂ ਕਰ ਸਕਦੇ ਹੋ:

- GitHub Settings ਤੇ ਜਾਓ – ਆਪਣੇ ਪ੍ਰੋਫਾਈਲ ਚਿੱਤਰ 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਜਿਸਮੇਂ ਸੱਜੇ ਉਪਰਲੇ ਕੋਨੇ ਵਿੱਚ ਹੈ ਅਤੇ Settings ਚੁਣੋ।
- Developer Settings ਵੱਲ ਜਾਓ – ਹੇਠਾਂ ਸਕ੍ਰੋਲ ਕਰਕੇ Developer Settings 'ਤੇ ਕਲਿੱਕ ਕਰੋ।
- Personal Access Tokens ਚੁਣੋ – Fine-grained tokens 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਫਿਰ Generate new token ਕਰੋ।
- ਆਪਣਾ ਟੋਕਨ ਕਨ ਫਿਗਰ ਕਰੋ – ਸੰਦਰਭ ਲਈ ਨੋਟ ਜੋੜੋ, ਸਮਾਪਤੀ ਤਾਰੀਖ ਸੈੱਟ ਕਰੋ ਅਤੇ ਜਰੂਰੀ ਸਕੋਪ (ਪਰਮਿਸ਼ਨ) ਚੁਣੋ। ਇਸ ਮਾਮਲੇ ਵਿੱਚ Models ਪਰਮਿਸ਼ਨ ਜੋੜੋ।
- ਟੋਕਨ ਜਨਰੇਟ ਕਰੋ ਅਤੇ ਕਾਪੀ ਕਰੋ – Generate token ਤੇ ਕਲਿੱਕ ਕਰੋ, ਅਤੇ ਤੁਰੰਤ ਇਸਨੂੰ ਕਾਪੀ ਕਰੋ ਕਿਉਂਕਿ ਤੁਸੀਂ ਇਸਨੂੰ ਫਿਰ ਨਹੀਂ ਦੇਖ ਪਾਵੋਗੇ।

### -1- ਸਰਵਰ ਨਾਲ ਕਨੈਕਟ ਕਰੋ

ਚਲੋ ਪਹਿਲਾਂ ਆਪਣਾ ਕਲਾਇੰਟ ਬਣਾਈਏ:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // ਸਕੀਮਾ ਵੈਰੀਫਿਕੇਸ਼ਨ ਲਈ ਜ਼ੋਡ ਨੂੰ ਇੰਪੋਰਟ ਕਰੋ

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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਲੋੜੀਂਦੀਆਂ ਲਾਇਬ੍ਰੇਰੀਜ਼ ਇੰਪੋਰਟ ਕੀਤੀਆਂ
- ਇੱਕ ਕਲਾਸ ਬਣਾਈ ਜਿਸ ਵਿੱਚ ਦੋ ਮੈਂਬਰ ਹਨ, `client` ਅਤੇ `openai` ਜੋ ਸਾਡੇ ਲਈ ਕਲਾਇੰਟ ਨੂੰ ਸੰਭਾਲਣ ਅਤੇ LLM ਨਾਲ ਸੰਚਾਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ।
- ਆਪਣੇ LLM ਇੰਸਟੈਂਸ ਨੂੰ GitHub Models ਦੇ ਉਪਯੋਗ ਲਈ 'baseUrl' ਨੂੰ ਇੰਫਰੈਂਸ API ਵੱਲ ਸੈੱਟ ਕੀਤਾ।

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdio ਕਨੈਕਸ਼ਨ ਲਈ ਸਰਵਰ ਪੈਰਾਮੀਟਰ ਬਣਾਓ
server_params = StdioServerParameters(
    command="mcp",  # ਕਾਰਜਯੋਗ
    args=["run", "server.py"],  # ਵਿਕਲਪਿਕ ਕਮਾਂਡ ਲਾਈਨ ਦਰਸ਼ਾਵਾਂ
    env=None,  # ਵਿਕਲਪਿਕ ਵਾਤਾਵਰਣ ਚਲਕ
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # ਕਨੈਕਸ਼ਨ ਸ਼ੁਰੂ ਕਰੋ
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- MCP ਲਈ ਲੋੜੀਂਦੀਆਂ ਲਾਇਬ੍ਰੇਰੀਜ਼ ਇੰਪੋਰਟ ਕੀਤੀਆਂ
- ਇੱਕ ਕਲਾਇੰਟ ਬਣਾਇਆ

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

ਸਭ ਤੋਂ ਪਹਿਲਾਂ, ਤੁਹਾਨੂੰ ਆਪਣੇ `pom.xml` ਫਾਇਲ ਵਿੱਚ LangChain4j ਦੀਆਂ ਡਿਪੈਂਡੈਂਸੀਆਂ ਸ਼ਾਮਿਲ ਕਰਣੀਆਂ ਪੈਣਗੀਆਂ। MCP ਇੰਟਿਗ੍ਰੇਸ਼ਨ ਅਤੇ GitHub Models ਸਮਰਥਨ ਲਈ ਇਹ ਡਿਪੈਂਡੈਂਸੀਆਂ ਜੋੜੋ:

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

ਫਿਰ ਆਪਣੀ ਜਾਵਾ ਕਲਾਇੰਟ ਕਲਾਸ ਬਣਾਓ:

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
    
    public static void main(String[] args) throws Exception {        // LLM ਨੂੰ GitHub ਮਾਡਲਾਂ ਵਰਤਣ ਲਈ ਸੰਰਚਿਤ ਕਰੋ
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // ਸਰਵਰ ਨਾਲ ਜੁੜਨ ਲਈ MCP ਟ੍ਰਾਂਸਪੋਰਟ ਬਣਾਓ
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // MCP ਕਲਾਇੰਟ ਬਣਾਓ
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- **LangChain4j ਡਿਪੈਂਡੈਂਸੀਆਂ ਸ਼ਾਮਿਲ ਕੀਤੀਆਂ**: MCP ਇੰਟਿਗ੍ਰੇਸ਼ਨ, OpenAI ਅਧਿਕਾਰਤ ਕਲਾਇੰਟ, ਅਤੇ GitHub Models ਸਮਰਥਨ ਲਈ ਲੋੜੀਂਦੀਆਂ
- **LangChain4j ਲਾਇਬ੍ਰੇਰੀਜ਼ ਇੰਪੋਰਟ ਕੀਤੀਆਂ**: MCP ਇੰਟਿਰੈਸ਼ਨ ਅਤੇ OpenAI ਚੈਟ ਮਾਡਲ ਕਾਰਗੁਜਾਰੀ ਲਈ
- **`ChatLanguageModel` ਬਣਾਇਆ**: ਜੋ GitHub Models ਨੂੰ ਤੁਹਾਡੇ GitHub ਟੋਕਨ ਨਾਲ ਸੈੱਟ ਕੀਤਾ ਗਿਆ ਹੈ
- **HTTP ਟਰਾਂਸਪੋਰਟ ਸੈੱਟ ਕੀਤਾ**: Server-Sent Events (SSE) ਨੂੰ ਵਰਤਕੇ MCP ਸਰਵਰ ਨਾਲ ਕਨੈਕਟ ਕਰਨ ਲਈ
- **MCP ਕਲਾਇੰਟ ਬਣਾਇਆ**: ਜੋ ਸਰਵਰ ਨਾਲ ਸੰਚਾਰ ਦੀ ਸੰਭਾਲ ਕਰੇਗਾ
- **LangChain4j ਦਾ ਬਿਲਟ-ਇਨ MCP ਸਹਿਯੋਗ ਵਰਤਿਆ**: ਜੋ LLM ਅਤੇ MCP ਸਰਵਰਾਂ ਦੇ ਵਿਚਕਾਰ ਇੰਟਿਗ੍ਰੇਸ਼ਨ ਸਧਾਰਨ ਕਰਦਾ ਹੈ

#### Rust

ਇਹ ਉਦਾਹਰਨ ਉਮੀਦ ਕਰਦੀ ਹੈ ਕਿ ਤੁਹਾਡੇ ਕੋਲ Rust ਪਰ مبنی MCP ਸਰਵਰ ਚੱਲ ਰਿਹਾ ਹੈ। ਜੇ ਨਹੀਂ, ਤਾਂ ਪਹਿਲਾਂ [01-first-server](../01-first-server/README.md) ਪਾਠ ਨੂੰ ਬਲੌਕ ਕਰਕੇ ਸਰਵਰ ਬਣਾਓ।

ਜਦ ਤੁਹਾਡੇ ਕੋਲ Rust MCP ਸਰਵਰ ਹੋਵੇ, ਇੱਕ ਟਰਮੀਨਲ ਖੋਲ੍ਹੋ ਅਤੇ ਸਰਵਰ ਵਾਲੇ ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਜਾਓ। ਫਿਰ ਨਵਾਂ LLM ਕਲਾਇੰਟ ਪ੍ਰੋਜੈਕਟ ਬਣਾਉਣ ਲਈ ਹੇਠਾਂ ਦਿੱਤਾ ਕਮਾਂਡ ਚਲਾਓ:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

ਆਪਣੇ `Cargo.toml` ਫਾਇਲ ਵਿੱਚ ਹੇਠਾਂ ਦਿੱਤੀਆਂ ਡਿਪੈਂਡੈਂਸੀਆਂ ਜੋੜੋ:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> ਖ਼ੁਦ OpenAI ਲਈ ਕੋਈ ਅਧਿਕਾਰਤ Rust ਲਾਇਬ੍ਰੇਰੀ ਨਹੀਂ ਹੈ, ਪਰ `async-openai` ਕ੍ਰੇਟ ਇੱਕ [ਸਮੁਦਾਇ ਪ੍ਰਬੰਧਿਤ ਲਾਇਬ੍ਰੇਰੀ](https://platform.openai.com/docs/libraries/rust#rust) ਹੈ ਜੋ ਆਮ ਤੌਰ 'ਤੇ ਵਰਤੀ ਜਾਂਦੀ ਹੈ।

`src/main.rs` ਫਾਇਲ ਖੋਲ੍ਹੋ ਅਤੇ ਇਸ ਦੀ ਸਮੱਗਰੀ ਹੇਠਾਂ ਦਿੱਤੇ ਕੋਡ ਨਾਲ ਬਦਲ ਦਿਉ:

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
    // ਸ਼ੁਰੂਆਤੀ ਸੁਨੇਹਾ
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // OpenAI ਕਲਾਇੰਟ ਸੈਟਅਪ ਕਰੋ
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // MCP ਕਲਾਇੰਟ ਸੈਟਅਪ ਕਰੋ
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

    // TODO: MCP ਟੂਲ ਲਿਸਟਿੰਗ ਪ੍ਰਾਪਤ ਕਰੋ

    // TODO: ਟੂਲ ਕਾਲਾਂ ਨਾਲ LLM ਗੱਲਬਾਤ

    Ok(())
}
```

ਇਹ ਕੋਡ ਇੱਕ ਬੁਨਿਆਦੀ Rust ਐਪਲੀਕੇਸ਼ਨ ਸੈੱਟਅੱਪ ਕਰਦਾ ਹੈ ਜੋ MCP ਸਰਵਰ ਅਤੇ GitHub Models ਲਈ LLM ਇੰਟਰੈਕਸ਼ਨ ਨੂੰ ਸੰਭਾਲੇਗਾ।

> [!IMPORTANT]
> ਐਪਲੀਕੇਸ਼ਨ ਚਲਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੇ GitHub ਟੋਕਨ ਨਾਲ `OPENAI_API_KEY` ਮਾਹੌਲ ਵਾਰੀਏਬਲ ਸੈੱਟ ਕਰਨਾ ਯਕੀਨੀ ਬਣਾਓ।

ਵਧੀਆ, ਅਗਲਾ ਕਦਮ ਹੈ MCP ਸਰਵਰ ਤੇ ਯੋਗਤਾਵਾਂ ਦੀ ਸੂਚੀ ਬਨਾਉਣਾ।

### -2- ਸਰਵਰ ਯੋਗਤਾਵਾਂ ਦੀ ਸੂਚੀ

ਹੁਣ ਅਸੀਂ MCP ਸਰਵਰ ਨਾਲ ਜੁੜਾਂਗੇ ਅਤੇ ਇਸ ਦੀਆਂ ਯੋਗਤਾਵਾਂ ਨੂੰ ਮੰਗਾਂਗੇ:

#### Typescript

ਉਹੀ ਕਲਾਸ ਵਿੱਚ ਹੇਠਾਂ ਦਿੱਤੇ ਮੈਥਡ ਜੋੜੋ:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // ਸੰਦ ਦੀ ਸੂਚੀ ਬਣਾਉਣਾ
    const toolsResult = await this.client.listTools();
}
```

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਸਰਵਰ ਨਾਲ ਜੁੜਨ ਲਈ ਕੋਡ ਜੋੜਿਆ ਹੈ, `connectToServer`।
- ਇੱਕ `run` ਮੈਥਡ ਬਣਾਇਆ ਹੈ ਜੋ ਸਾਡੇ ਐਪ ਫਲੋ ਨੂੰ ਹੈਂਡਲ ਕਰਦਾ ਹੈ। ਹੁਣ ਤੱਕ ਇਹ ਸਿਰਫ ਟੂਲ ਦੀ ਸੂਚੀ ਦਿਖਾਉਂਦਾ ਹੈ ਪਰ ਅਸੀਂ ਜਲਦੀ ਹੀ ਇਸ ਵਿੱਚ ਹੋਰ ਸ਼ਾਮਿਲ ਕਰਾਂਗੇ।

#### Python

```python
# ਉਪਲਬਧ ਸਰੋਤਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# ਉਪਲਬਧ ਸੰਦਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

ਇੱਥੇ ਅਸੀਂ ਜੋੜਿਆ:

- ਸਾਧਨ ਅਤੇ ਟੂਲ ਦੀ ਸੂਚੀ ਬਣਾਈ ਅਤੇ ਪ੍ਰਿੰਟ ਕੀਤੇ। ਟੂਲਾਂ ਲਈ ਅਸੀਂ `inputSchema` ਵੀ ਲਿਸਟ ਕੀਤੀ ਜੋ ਅੱਗੇ ਵਰਤੀ ਜਾਵੇਗੀ।

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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- MCP ਸਰਵਰ 'ਤੇ ਉਪਲਬਧ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਬਣਾ ਲਈ
- ਹਰ ਟੂਲ ਲਈ, ਨਾਮ, ਵੇਰਵਾ ਅਤੇ ਇਸ ਦਾ ਸਕੀਮਾ ਲਿਸਟ ਕੀਤਾ। ਇਹ ਆਖਰੀ ਗੱਲ ਹੈ ਜੋ ਅਸੀਂ ਜਲਦੀ ਹੀ ਟੂਲਾਂ ਨੂੰ ਕਾਲ ਕਰਨ ਲਈ ਵਰਤਾਂਗੇ।

#### Java

```java
// ਇੱਕ ਟੂਲ ਪ੍ਰਦਾਤਾ ਬਣਾਓ ਜੋ ਆਪਣੇ ਆਪ MCP ਟੂਲਾਂ ਨੂੰ ਖੋਜਦਾ ਹੈ
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// MCP ਟੂਲ ਪ੍ਰਦਾਤਾ ਆਪਣੇ ਆਪ ਹੇਠਾਂ ਦਿੱਤੇ ਕੰਮ ਕਰਦਾ ਹੈ:
// - MCP ਸਰਵਰ ਤੋਂ ਉਪਲਬਧ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਬਨਾਉਣਾ
// - MCP ਟੂਲ ਸਕੀਮਾਂ ਨੂੰ ਲੈਂਗਚੇਨ4ਜੇ ਫਾਰਮੈਟ ਵਿੱਚ ਬਦਲਣਾ
// - ਟੂਲ ਚਲਾਉਣ ਅਤੇ ਪ੍ਰਤੀਕ੍ਰਿਆਵਾਂ ਦਾ ਪ੍ਰਬੰਧ ਕਰਨਾ
```

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ `McpToolProvider` ਬਣਾਇਆ ਜੋ MCP ਸਰਵਰ ਤੋਂ ਸਾਰੀਆਂ ਟੂਲਾਂ ਨੂੰ ਆਟੋਮੈਟਿਕ ਲੱਭਦਾ ਅਤੇ ਰਜਿਸਟਰ ਕਰਦਾ ਹੈ
- ਟੂਲ ਪ੍ਰੋਵਾਈਡਰ MCP ਟੂਲ ਸਕੀਮਾ ਅਤੇ LangChain4j ਦੇ ਟੂਲ ਫਾਰਮੈਟ ਵਿਚਕਾਰ ਕਨਵਰਜ਼ਨ ਅੰਦਰੂਨੀ ਤੌਰ 'ਤੇ ਸੰਭਾਲਦਾ ਹੈ
- ਇਹ ਤਰੀਕਾ ਹੱਥ ਨਾਲ ਟੂਲ ਲਿਸਟਿੰਗ ਅਤੇ ਬਦਲਾਵ ਨੂੰ ਛੁਪਾ ਦਿੰਦਾ ਹੈ

#### Rust

MCP ਸਰਵਰ ਤੋਂ ਟੂਲ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ `list_tools` ਮੈਥਡ ਵਰਤੋਂ। ਆਪਣੀ `main` ਫੰਕਸ਼ਨ ਵਿੱਚ MCP ਕਲਾਇੰਟ ਸੈੱਟਅੱਪ ਕਰਨ ਤੋਂ ਬਾਅਦ ਹੇਠਾਂ ਦਿੱਤਾ ਕੋਡ ਸ਼ਾਮਿਲ ਕਰੋ:

```rust
// MCP ਟੂਲ ਸੂਚੀ ਪ੍ਰਾਪਤ ਕਰੋ
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- ਸਰਵਰ ਯੋਗਤਾਵਾਂ ਨੂੰ LLM ਟੂਲਾਂ ਵਿੱਚ ਬਦਲਣਾ

ਸਰਵਰ ਯੋਗਤਾਵਾਂ ਦੀ ਸੂਚੀ ਬਣਾਏ ਜਾਣ ਤੋਂ ਬਾਅਦ ਅਗਲਾ ਕਦਮ ਹੈ ਉਨ੍ਹਾਂ ਨੂੰ ਐਸੇ ਫਾਰਮੈਟ ਵਿੱਚ ਬਦਲਣਾ ਜੋ LLM ਸਮਝ ਸਕੇ। ਜਦ ਅਸੀਂ ਇਹ ਕਰ ਲਏ, ਤਾਂ ਅਸੀਂ ਇਹ ਯੋਗਤਾਵਾਂ LLM ਨੂੰ ਟੂਲਾਂ ਵਜੋਂ ਪ੍ਰਦਾਨ ਕਰ ਸਕਦੇ ਹਾਂ।

#### TypeScript

1. MCP ਸਰਵਰ ਤੋਂ ਪ੍ਰਾਪਤ ਜਵਾਬ ਨੂੰ LLM द्वारा ਵਰਤੇ ਜਾ ਸਕਣ ਵਾਲੇ ਟੂਲ ਫਾਰਮੈਟ ਵਿੱਚ ਬਦਲਣ ਲਈ ਹੇਠਾਂ ਦਿੱਤਾ ਕੋਡ ਜੋੜੋ:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // ਇਨਪੁਟ_ਸਕੀਮਾ ਦੇ ਆਧਾਰ 'ਤੇ ਇੱਕ ਜ਼ੋਡ ਸਕੀਮਾ ਬਣਾਓ
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // ਕਿਸਮ ਨੂੰ ਖੁਲਾਸਾ ਕਰਕੇ "ਫੰਕਸ਼ਨ" ਸੈੱਟ ਕਰੋ
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

ਉਪਰੋਕਤ ਕੋਡ MCP ਸਰਵਰ ਤੋਂ ਪ੍ਰਾਪਤ ਜਵਾਬ ਨੂੰ ਇਸ ਤਰੀਕੇ ਨਾਲ ਟੂਲ ਡਿਫਿਨੀਸ਼ਨ ਵਿੱਚ ਬਦਲਦਾ ਹੈ ਜੋ LLM ਸਮਝ ਸਕੇ।

2. ਚਲੋ ਹੁਣ `run` ਮੈਥਡ ਅੱਪਡੇਟ ਕਰੀਏ ਜਿਸ ਵਿੱਚ ਸਰਵਰ ਯੋਗਤਾਵਾਂ ਦੀ ਸੂਚੀ ਲਾਉਣੀ ਹੈ:

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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ `run` ਮੈਥਡ ਅਪਡੇਟ ਕੀਤਾ ਹੈ ਜੋ ਨਤੀਜੇ ਵਿੱਚ ਲੋਪ ਕਰਦਾ ਹੈ ਅਤੇ ਹਰ ਐਂਟਰੀ ਲਈ `openAiToolAdapter` ਨੂੰ ਕਾਲ ਕਰਦਾ ਹੈ।

#### Python

1. ਪਹਿਲਾਂ ਹੇਠਾਂ ਦਿੱਤੀ ਕਨਵਰਟਰ ਫੰਕਸ਼ਨ ਬਣਾਈਏ

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

ਉਪਰ ਦਿੱਤੇ ਫੰਕਸ਼ਨ `convert_to_llm_tools` ਵਿੱਚ ਅਸੀਂ MCP ਟੂਲ ਜਵਾਬ ਲੈ ਕੇ ਉਸਨੂੰ LLM ਲਈ ਸਮਝਣ ਯੋਗ ਫਾਰਮੈਟ ਵਿੱਚ ਬਦਲਿਆ ਹੈ।

2. ਫਿਰ ਆਪਣਾ ਕਲਾਇੰਟ ਕੋਡ ਅਪਡੇਟ ਕਰਦੇ ਹਾਂ ਤਾਂ ਕਿ ਇਹ ਫੰਕਸ਼ਨ ਵਰਤ ਸਕੇ:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

ਇੱਥੇ ਅਸੀਂ `convert_to_llm_tool` ਨੂੰ ਕਾਲ ਕੀਤਾ ਹੈ ਤਾਂ ਕਿ MCP ਟੂਲ ਜਵਾਬ ਨੂੰ ਕੁਝ ਅਜਿਹਾ ਬਣਾਇਆ ਜਾ ਸਕੇ ਜੋ ਅਸੀਂ ਬਾਅਦ ਵਿੱਚ LLM ਨੂੰ ਦੇ ਸਕੀਏ।

#### .NET

1. MCP ਟੂਲ ਜਵਾਬ ਨੂੰ LLM ਲਈ ਸਮਝਣ ਯੋਗ ਬਣਾਉਣ ਲਈ ਕੋਡ ਜੋੜੋ:

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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ `ConvertFrom` ਫੰਕਸ਼ਨ ਬਣਾਇਆ ਜੋ ਨਾਮ, ਵੇਰਵਾ ਅਤੇ ਇਨਪੁਟ ਸਕੀਮਾ ਲੈਂਦਾ ਹੈ।
- ਜਿਹੜਾ ਇੱਕ `FunctionDefinition` ਤਿਆਰ ਕਰਦਾ ਹੈ ਜੋ `ChatCompletionsDefinition` ਨੂੰ ਪਾਸ ਹੁੰਦਾ ਹੈ। ਇਹ ਆਖਰੀ ਗੱਲ LLM ਨੂੰ ਸਮਝ ਆਉਂਦੀ ਹੈ।

2. ਹੁਣ ਦੇਖੀਏ ਕਿਵੇਂ ਮੌਜੂਦਾ ਕੋਡ ਨੂੰ ਇਸ ਫੰਕਸ਼ਨ ਦਾ ਫਾਇਦਾ ਉਠਾਉਣ ਲਈ ਅਪਡੇਟ ਕਰ ਸਕਦੇ ਹਾਂ:

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
// ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਇੰਟਰਐਕਸ਼ਨ ਲਈ ਬੋਟ ਇੰਟਰਫੇਸ ਬਣਾਓ
public interface Bot {
    String chat(String prompt);
}

// AI ਸੇਵਾ ਨੂੰ LLM ਅਤੇ MCP ਟੂਲਸ ਨਾਲ ਸੰਰਚਿਤ ਕਰੋ
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਸੰਵਾਦ ਲਈ ਇਕ ਸਧਾਰਨ `Bot` ਇੰਟਰਫੇਸ ਬਣਾਇਆ
- LangChain4j ਦੀ `AiServices` ਵਰਤੀ ਜੋ LLM ਨੂੰ MCP ਟੂਲ ਪ੍ਰੋਵਾਈਡਰ ਨਾਲ ਆਟੋਮੈਟਿਕ ਬਧਾਉਂਦੀ ਹੈ
- ਫਰੇਮਵਰਕ ਆਟੋਮੈਟਿਕ ਤੌਰ 'ਤੇ ਟੂਲ ਸਕੀਮਾ ਕਨਵਰਜ਼ਨ ਅਤੇ ਫੰਕਸ਼ਨ ਕਾਲਿੰਗ ਨੂੰ ਸੰਭਾਲਦਾ ਹੈ
- ਇਹ ਤਰੀਕਾ ਹੱਥ ਨਾਲ ਟੂਲ ਬਦਲਣ ਦੀ ਲੋੜ ਖਤਮ ਕਰਦਾ ਹੈ - LangChain4j MCP ਟੂਲਾਂ ਨੂੰ LLM-ਅਨੁਕੂਲ ਫਾਰਮੈਟ ਵਿੱਚ ਬਦਲਦਾ ਹੈ

#### Rust

MCP ਟੂਲ ਜਵਾਬ ਨੂੰ LLM ਲਈ ਸਮਝਣ ਯੋਗ ਫਾਰਮੈਟ ਵਿੱਚ ਬਦਲਣ ਲਈ ਅਸੀ ਇੱਕ ਸਹਾਇਤਾ ਕਾਰਜ ਬਣਾਵਾਂਗੇ ਜੋ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਨੂੰ ਫਾਰਮੈਟ ਕਰਦਾ ਹੈ। ਹੇਠਾਂ ਦਿੱਤਾ ਕੋਡ ਆਪਣੇ `main.rs` ਫਾਇਲ ਵਿੱਚ `main` ਫੰਕਸ਼ਨ ਤੋਂ ਬਾਅਦ ਸ਼ਾਮਿਲ ਕਰੋ। ਇਹ LLM ਨੂੰ ਬੇਨਤੀ ਕਰਦੇ ਸਮੇਂ ਕਾਲ ਕੀਤਾ ਜਾਵੇਗਾ:

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

ਵਧੀਆ, ਹੁਣ ਅਸੀਂ ਯੂਜ਼ਰ ਦੀਆਂ ਅਨੁਰੋਧਾਂ ਨੂੰ ਸੰਭਾਲਣ ਲਈ ਤਿਆਰ ਹਾਂ, ਤਾਂ ਚਲੋ ਅਗਲਾ ਕਦਮ ਕਰੀਏ।

### -4- ਯੂਜ਼ਰ ਪ੍ਰਾਂਪਟ ਅਨੁਰੋਧ ਸੰਭਾਲੋ

ਇਸ ਹਿੱਸੇ ਵਿੱਚ ਅਸੀਂ ਯੂਜ਼ਰ ਅਨੁਰੋਧ ਸੰਭਾਲਾਂਗੇ।

#### TypeScript

1. ਇੱਕ ਮੈਥਡ ਜੋੜੋ ਜਿਸ ਨਾਲ ਅਸੀਂ ਆਪਣੀ LLM ਨੂੰ ਕਾਲ ਕਰਾਂਗੇ:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. ਸਰਵਰ ਦੇ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰੋ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ਨਤੀਜੇ ਨਾਲ ਕੁਝ ਕਾਰਵਾਈ ਕਰੋ
        // ਕਰਨ ਲਈ ਬਾਕੀ

        }
    }
    ```

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ `callTools` ਮੈਥਡ ਜੋੜਿਆ ਹੈ।
- ਇਹ ਮੈਥਡ LLM ਜਵਾਬ ਲੈਂਦਾ ਹੈ ਅਤੇ ਜਾਂਚਦਾ ਹੈ ਕਿ ਕਿਹੜੇ ਟੂਲ ਕਾਲ ਕੀਤੇ ਗਏ ਹਨ, ਜੇ ਕਿਸੇ ਨੇ ਕਾਲ ਕੀਤਾ:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // ਟੂਲ ਨੂੰ ਕਾਲ ਕਰੋ
        }
        ```

- ਜੇ LLM ਦੱਸਦਾ ਹੈ ਕਿ ਕਿਸੇ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨਾ ਹੈ ਤਾਂ ਉਹ ਟੂਲ ਕਾਲ ਕਰਦਾ ਹੈ:

        ```typescript
        // 2. ਸਰਵਰ ਦੇ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰੋ
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. ਨਤੀਜੇ ਨਾਲ ਕੁਝ ਕਰੋ
        // ਕਰਨ ਲਈ
        ```

2. `run` ਮੈਥਡ ਨੂੰ ਅਪਡੇਟ ਕਰੋ ਤਾਂ ਕਿ LLM ਨੂੰ ਕਾਲ ਕਰੋ ਅਤੇ `callTools` ਨੂੰ ਕਾਲ ਕਰੋ:

    ```typescript

    // 1. ਐਲਐਲਐਮ ਲਈ ਇਨਪੁੱਟ ਮੈਸੇਜ ਬਣਾਓ
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. ਐਲਐਲਐਮ ਨੂੰ ਕਾਲ ਕਰਨਾ
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. ਐਲਐਲਐਮ ਜਵਾਬ ਨੂੰ ਵੇਖੋ, ਹਰ ਚੋਣ ਲਈ ਚੈੱਕ ਕਰੋ ਕਿ ਕੀ ਇਸ ਵਿੱਚ ਟੂਲ ਕਾਲ ਹੈ
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

ਵਧੀਆ, ਸਾਰਾ ਕੋਡ ਇਸ ਤਰ੍ਹਾਂ ਹੈ:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // ਸਕੀਮਾ ਵੈਰੀਫਿਕੇਸ਼ਨ ਲਈ zod ਆਯਾਤ ਕਰੋ

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // ਭਵਿੱਖ ਵਿੱਚ ਇਸ ਯੂਆਰਐਲ ਨੂੰ ਬਦਲਣ ਦੀ ਜਰੂਰਤ ਹੋ ਸਕਦੀ ਹੈ: https://models.github.ai/inference
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
          // ਇੰਪੁੱਟ ਸਕੀਮਾ ਦੇ ਆਧਾਰ 'ਤੇ zod ਸਕੀਮਾ ਬਣਾਓ
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // ਖਾਸ ਕਰਕੇ ਟਾਈਪ "function" ਸੈੱਟ ਕਰੋ
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
    
    
          // 2. ਸਰਵਰ ਦੇ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰੋ
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. ਨਤੀਜੇ ਨਾਲ ਕੁਝ ਕਰੋ
          // ਕਰਨਾ ਹੈ
    
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
    
        // 3. LLM ਜਵਾਬ ਦੇ ਜ਼ਰੀਏ ਜਾਓ, ਹਰ ਚੋਣ ਲਈ ਦੇਖੋ ਕਿ ਕੀ ਇਸ ਵਿੱਚ ਟੂਲ ਕਾਲਜ਼ ਹਨ
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

1. LLM ਨੂੰ ਕਾਲ ਕਰਨ ਲਈ ਕੁਝ ਲੋੜੀਂਦੇ ਇੰਪੋਰਟਸ ਜੋੜੋ

    ```python
    # ਐਲਐੱਲਐਮ
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. ਫਿਰ ਉਹ ਫੰਕਸ਼ਨ ਜੋੜੋ ਜੋ LLM ਨੂੰ ਕਾਲ ਕਰੇਗਾ:

    ```python
    # ਐਲਐਲਐਮ

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
            # ਵਿਕਲਪਿਕ ਪੈਰਾਮੀਟਰ
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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਉਹ ਫੰਕਸ਼ਨਾਂ ਨੂੰ LLM ਨੂੰ ਪ੍ਰਦਾਨ ਕੀਤਾ ਜੋ ਅਸੀਂ MCP ਸਰਵਰ 'ਤੇ ਲੱਭੇ ਅਤੇ ਬਦਲੇ।
- ਫਿਰ LLM ਨੂੰ ਫੰਕਸ਼ਨਾਂ ਸਮੇਤ ਕਾਲ ਕੀਤਾ।
- ਨਤੀਜੇ ਦੀ ਜਾਂਚ ਕੀਤੀ ਕਿ ਕਿਸ ਫੰਕਸ਼ਨ ਨੂੰ ਕਾਲ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ।
- ਆਖਿਰ ਵਿੱਚ ਕਾਲ ਕਰਨ ਲਈ ਫੰਕਸ਼ਨਾਂ ਦੀ ਲਿਸਟ ਦਿੱਤੀ।

3. ਆਖਰੀ ਕਦਮ, ਆਪਣਾ ਮੁੱਖ ਕੋਡ ਅਪਡੇਟ ਕਰੋ:

    ```python
    prompt = "Add 2 to 20"

    # LLM ਨੂੰ ਪੁੱਛੋ ਕਿ ਸਾਰੇ ਟੂਲ ਕਿਹੜੇ ਹਨ, ਜੇ ਕੋਈ ਹਨ
    functions_to_call = call_llm(prompt, functions)

    # ਸੁਝਾਏ ਗਏ ਫੰਕਸ਼ਨ ਨੂੰ ਕਾਲ ਕਰੋ
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

ਉੱਥੇ, ਇਹ ਆਖਰੀ ਕਦਮ ਸੀ, ਜਿੱਥੇ ਅਸੀਂ:

- MCP ਟੂਲ ਨੂੰ LLM ਦੇ ਸੂਚਨਾਤਮਕ ਫੰਕਸ਼ਨ ਅਨੁਸਾਰ ਕਾਲ ਕਰਦੇ ਹਾਂ।
- ਟੂਲ ਕਾਲ ਦਾ ਨਤੀਜਾ MCP ਸਰਵਰ 'ਤੇ ਪ੍ਰਿੰਟ ਕਰਦੇ ਹਾਂ।

#### .NET

1. LLM ਪ੍ਰਾਂਪਟ ਅਨੁਰੋਧ ਕਰਨ ਲਈ ਇੱਕ ਉਦਾਹਰਨ ਕੋਡ ਦਿਖਾਓ:

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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- MCP ਸਰਵਰ ਤੋਂ ਟੂਲਾਂ ਲੈ ਲਈਆਂ, `var tools = await GetMcpTools()`।
- ਇੱਕ ਉਪਭੋਗਤਾ ਪ੍ਰਾਂਪਟ ਬਣਾਇਆ `userMessage`.
- ਮਾਡਲ ਅਤੇ ਟੂਲਾਂ ਨੂੰ ਸੈਟ ਕਰਨ ਵਾਲਾ ఆప੍ਸ਼ਨ ਆਬਜੈਕਟ ਤਿਆਰ ਕੀਤਾ।
- LLM ਵੱਲੋਂ ਬੇਨਤੀ ਕੀਤੀ।

2. ਇਕ ਆਖਰੀ ਕਦਮ, ਚਲੋ ਵੇਖੀਏ ਕਿ LLM ਸੋਚਦਾ ਹੈ ਕਿ ਕੀ ਸਾਨੂੰ ਕਿਸੇ ਫੰਕਸ਼ਨ ਨੂੰ ਕਾਲ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ:

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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਫੰਕਸ਼ਨ ਕਾਲਾਂ ਦੀ ਲਿਸਟ ਵਿੱਚ ਲੂਪ ਕੀਤਾ।
- ਹਰ ਟੂਲ ਕਾਲ ਲਈ ਨਾਮ ਅਤੇ ਦਲੀਲਾਂ ਨੂੰ ਪਰਸ ਕਰਕੇ MCP ਸਰਵਰ 'ਤੇ ਟੂਲ ਕਾਲ ਕੀਤਾ ਅਤੇ ਆਖਰ ਵਿੱਚ ਨਤੀਜੇ ਪ੍ਰਿੰਟ ਕੀਤੇ।

ਸੰਪੂਰਨ ਕੋਡ:

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
    // ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਦੀਆਂ ਬੇਨਤੀਆਂ ਨੂੰ ਚਲਾਓ ਜੋ ਆਪਣੇ ਆਪ MCP ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਦੀਆਂ ਹਨ
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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਸਾਧਾਰਣ ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਪ੍ਰਾਂਪਟਾਂ ਨਾਲ MCP ਸਰਵਰ ਟੂਲਾਂ ਨਾਲ ਇੰਟਰੈਕਟ ਕੀਤਾ
- LangChain4j ਫਰੇਮਵਰਕ ਆਟੋਮੈਟਿਕ ਤੌਰ 'ਤੇ ਸੰਭਾਲਦਾ ਹੈ:
  - ਜਦ ਲੋੜ ਹੋਵੇ, ਤਾਂ ਉਪਭੋਗਤਾ ਪ੍ਰਾਂਪਟਾਂ ਨੂੰ ਟੂਲ ਕਾਲਾਂ ਵਿੱਚ ਬਦਲਨਾ
  - LLM ਦੇ ਫੈਸਲੇ ਮੁਤਾਬਕ ਯੋਗ MCP ਟੂਲਾਂ ਨੂੰ ਕਾਲ ਕਰਨਾ
  - LLM ਅਤੇ MCP ਸਰਵਰ ਵਿਚਕਾਰ ਗੱਲਬਾਤ ਦੇ ਪ੍ਰਵਾਹ ਦਾ ਪ੍ਰਬੰਧਨ
- `bot.chat()` ਮੈਥਡ ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਦੇ ਜਵਾਬ ਵਾਪਸ ਦਿੰਦਾ ਹੈ ਜਿਸ ਵਿੱਚ MCP ਟੂਲਾਂ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਨਤੀਜੇ ਸ਼ਾਮਿਲ ਹੋ ਸਕਦੇ ਹਨ
- ਇਹ ਤਰੀਕਾ ਇੱਕ ਲਗਾਤਾਰ ਉਪਭੋਗਤਾ ਅਨੁਭਵ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ ਜਿੱਥੇ ਉਪਭੋਗਤਾਵਾਂ ਨੂੰ MCP ਦੇ ਅੰਦਰੂਨੀ ਕਾਰਜ ਬਾਰੇ ਜਾਣਨ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ

ਸੰਪੂਰਨ ਕੋਡ ਉਦਾਹਰਨ:

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

ਇੱਥੇ ਜ਼ਿਆਦਾਤਰ ਕੰਮ ਹੁੰਦਾ ਹੈ। ਅਸੀਂ LLM ਨੂੰ ਸ਼ੁਰੂਆਤੀ ਯੂਜ਼ਰ ਪ੍ਰਾਂਪਟ ਨਾਲ ਕਾਲ ਕਰਾਂਗੇ, ਫਿਰ ਜਵਾਬ ਨੂੰ ਪ੍ਰਕਿਰਿਆ ਕਰਾਂਗੇ ਕਿ ਕਿਹੜੇ ਟੂਲ ਕਾਲ ਕਰਨੇ ਹਨ। ਜੇ ਲੋੜ ਹੋਵੇ, ਤਦ ਉਨ੍ਹਾਂ ਟੂਲਾਂ ਨੂੰ ਕਾਲ ਕਰਾਂਗੇ ਅਤੇ ਗੱਲਬਾਤ LLM ਨਾਲ ਜਾਰੀ ਰੱਖਾਂਗੇ ਜਦ ਤੱਕ ਹੋਰ ਟੂਲ ਕਾਲ ਦੀ ਲੋੜ ਨਾ ਰਹਿ ਜਾਵੇ ਅਤੇ ਸਾਡੇ ਕੋਲ ਆਖਰੀ ਜਵਾਬ ਨਾ ਹੋਵੇ।

ਅਸੀਂ LLM ਨੂੰ ਕਈ ਵਾਰ ਕਾਲ ਕਰਨੇ ਹੋਣਗੇ, ਇਸ ਲਈ ਇੱਕ ਫੰਕਸ਼ਨ ਬਣਾਈਏ ਜੋ LLM ਕਾਲ ਨੂੰ ਸੰਭਾਲੇ। ਹੇਠਾਂ ਦਿੱਤਾ ਕੋਡ ਆਪਣੇ `main.rs` ਫਾਇਲ ਵਿੱਚ ਜੋੜੋ:

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

ਇਹ ਫੰਕਸ਼ਨ LLM ਕਲਾਇੰਟ, ਮੈਸੇਜਾਂ ਦੀ ਲਿਸਟ (ਜਿਸ ਵਿੱਚ ਯੂਜ਼ਰ ਪ੍ਰਾਂਪਟ ਸ਼ਾਮਿਲ ਹੈ), MCP ਸਰਵਰ ਤੋਂ ਟੂਲਾਂ ਨੂੰ ਲੈਂਦਾ ਹੈ ਅਤੇ LLM ਨੂੰ ਬੇਨਤੀ ਭੇਜਦਾ ਹੈ, ਫਿਰ ਜਵਾਬ ਨੂੰ ਵਾਪਸ ਕਰਦਾ ਹੈ।
LLM ਤੋਂ ਪ੍ਰਾਪਤ ਜਵਾਬ ਵਿੱਚ `choices` ਦੀ ਇੱਕ ਐਰੇ ਸ਼ਾਮਿਲ ਹੋਵੇਗੀ। ਸਾਨੂੰ ਨਤੀਜੇ ਨੂੰ ਇਸ ਤਰ੍ਹਾਂ ਪ੍ਰੋਸੈਸ ਕਰਨ ਦੀ ਲੋੜ ਹੋਵੇਗੀ ਕਿ ਕੋਈ ਵੀ `tool_calls` ਮੌਜੂਦ ਹੈ ਜਾਂ ਨਹੀਂ। ਇਹ ਸਾਨੂੰ ਦੱਸਦਾ ਹੈ ਕਿ LLM ਕਿਸੇ ਵਿਸ਼ੇਸ਼ ਟੂਲ ਨੂੰ ਦਲੀਲਾਂ ਨਾਲ ਕਾਲ ਕਰਨ ਲਈ ਮੰਗ ਕਰ ਰਿਹਾ ਹੈ। ਇੱਕ ਫੰਕਸ਼ਨ ਪਰਿਭਾਸ਼ਿਤ ਕਰਨ ਲਈ ਹੇਠਾਂ ਦਿੱਤਾ ਕੋਡ ਆਪਣੇ `main.rs` ਫਾਇਲ ਦੇ ਤਲ ਵਿੱਚ ਸ਼ਾਮਿਲ ਕਰੋ:

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

    // ਜੇ ਉਪਲਬਧ ਹੋਵੇ ਤਾਂ ਸਮੱਗਰੀ ਪ੍ਰਿੰਟ ਕਰੋ
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // ਟੂਲ ਕਾਲਾਂ ਨੂੰ ਸੰਭਾਲੋ
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // ਸਹਾਇਕ ਸੁਨੇਹਾ ਜੋੜੋ

        // ਹਰ ਟੂਲ ਕਾਲ ਨੂੰ ਚਲਾਓ
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // ਸੁਨੇਹਿਆਂ ਵਿੱਚ ਟੂਲ ਨਤੀਜਾ ਜੋੜੋ
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // ਟੂਲ ਨਤੀਜਿਆਂ ਨਾਲ ਗੱਲਬਾਤ ਜਾਰੀ ਰੱਖੋ
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


ਜੇ `tool_calls` ਮੌਜੂਦ ਹੋਣ, ਤਾਂ ਇਹ ਟੂਲ ਜਾਣਕਾਰੀ ਕੱਢਦਾ ਹੈ, MCP ਸਰਵਰ ਨਾਲ ਟੂਲ ਬੇਨਤੀ ਕਰਦਾ ਹੈ, ਅਤੇ ਨਤੀਜੇ ਗੱਲਬਾਤ ਸੰਦੇਸ਼ਾਂ ਵਿੱਚ ਸ਼ਾਮਿਲ ਕਰਦਾ ਹੈ। ਫਿਰ ਇਹ LLM ਨਾਲ ਗੱਲਬਾਤ ਜਾਰੀ ਰੱਖਦਾ ਹੈ ਅਤੇ ਸੰਦੇਸ਼ ਅਸਿਸਟੈਂਟ ਦੇ ਜਵਾਬ ਅਤੇ ਟੂਲ ਕਾਲ ਨਤੀਜਿਆਂ ਨਾਲ ਅਪਡੇਟ ਹੋ ਜਾਂਦੇ ਹਨ।

ਜੋ ਕੁਝ LLM MCP ਕਾਲਾਂ ਲਈ ਟੂਲ ਕਾਲ ਜਾਣਕਾਰੀ ਵਾਪਸ ਕਰਦਾ ਹੈ, ਉਸ ਨੂੰ ਕੱਢਣ ਲਈ ਅੱਗੇ ਇੱਕ ਹੋਰ ਸਹਾਇਕ ਫੰਕਸ਼ਨ ਸ਼ਾਮਿਲ ਕਰਨ ਜਾ ਰਹੇ ਹਾਂ। ਇਸ ਲਈ ਹੇਠਾਂ ਦਿੱਤਾ ਕੋਡ ਆਪਣੇ `main.rs` ਫਾਇਲ ਦੇ ਤਲ ਵਿੱਚ ਸ਼ਾਮਿਲ ਕਰੋ:

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


ਸਾਰੇ ਹਿੱਸੇ ਠੀਕ ਢੰਗ ਨਾਲ ਹੋਣ ਦੇ ਨਾਲ, ਹੁਣ ਅਸੀਂ ਸ਼ੁਰੂਆਤੀ ਯੂਜ਼ਰ ਪ੍ਰੰਪਟ ਨੂੰ ਹੈਂਡਲ ਕਰ ਸਕਦੇ ਹਾਂ ਅਤੇ LLM ਨੂੰ ਕਾਲ ਕਰ ਸਕਦੇ ਹਾਂ। ਆਪਣੇ `main` ਫੰਕਸ਼ਨ ਨੂੰ ਹੇਠਾਂ ਦਿੱਤੇ ਕੋਡ ਨਾਲ ਅਪਡੇਟ ਕਰੋ:

```rust
// ਯੰਤਰ ਕਾਲਾਂ ਨਾਲ LLM ਗੱਲਬਾਤ
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


ਇਹ ਸ਼ੁਰੂਆਤੀ ਯੂਜ਼ਰ ਪ੍ਰੰਪਟ 'ਦੋ ਨੰਬਰਾਂ ਦੇ ਜੋੜ' ਲਈ LLM ਨਾਲ ਪੁੱਛਗਿੱਛ ਕਰੇਗਾ ਅਤੇ ਟੂਲ ਕਾਲਾਂ ਨੂੰ ਡਾਇਨਾਮਿਕ ਤਰੀਕੇ ਨਾਲ ਸੰਭਾਲਣ ਲਈ ਪ੍ਰਤੀਕ੍ਰਿਆ ਪ੍ਰੋਸੈਸ ਕਰੇਗਾ।

ਸ਼ਾਨਦਾਰ, ਤੁਸੀਂ ਇਹ ਕਰ ਲਿਆ!

## ਅਸਾਈਨਮੈਂਟ

ਐਕਸਰਸਾਈਜ਼ ਵਿੱਚ ਦਿੱਤਾ ਗਇਆ ਕੋਡ ਲੈ ਕੇ ਸਰਵਰ ਵਿੱਚ ਹੋਰ ਟੂਲ ਸ਼ਾਮਿਲ ਕਰੋ। ਫਿਰ ਇੱਕ LLM ਪ੍ਰਯੋਗ ਕਰਨ ਵਾਲਾ ਕਲਾਇਟ ਬਣਾਓ, ਐਕਸਰਸਾਈਜ਼ ਵਾਂਗ, ਅਤੇ ਵੱਖ-ਵੱਖ ਪ੍ਰੰਪਟ ਨਾਲ ਟੈਸਟ ਕਰੋ ਤਾਂ ਜੋ ਸਰਵਰ ਦੇ ਸਾਰੇ ਟੂਲ ਡਾਇਨਾਮਿਕ ਤਰੀਕੇ ਨਾਲ ਕਾਲ ਹੋ ਰਹੇ ਹਨ। ਇਸ ਤਰ੍ਹਾਂ ਕਲਾਇਟ ਦੀ ਬਣਾਉਟ ਦੇ ਨਾਲ ਅਖੀਰਲੀ ਯੂਜ਼ਰ ਨੂੰ ਬਿਹਤਰ ਅਨੁਭਵ ਮਿਲੇਗਾ ਕਿਉਂਕਿ ਉਹ ਸਿਰਫ਼ ਸਹੀ ਕਲਾਇਟ ਆਦੇਸ਼ਾਂ ਦੀ ਥਾਂ ਪ੍ਰੰਪਟ ਵਰਤ ਸਕਦਾ ਹੈ ਅਤੇ ਕਿਸੇ ਵੀ MCP ਸਰਵਰ ਕਾਲ ਤੋਂ ਬੇਖ਼ਬਰ ਰਹੇਗਾ।

## ਹੱਲ

[Solution](./solution/README.md)

## ਮੁੱਖ ਗੱਲਾਂ

- ਆਪਣੇ ਕਲਾਇਟ ਵਿੱਚ LLM ਦਾ ਜੋੜ MCP ਸਰਵਰਾਂ ਨਾਲ ਪ੍ਰਯੋਗਕਾਰਾਂ ਦੇ ਮੀਲ-ਜੁਲਣ ਦਾ ਇੱਕ ਬਿਹਤਰ ਤਰੀਕਾ ਦਿੰਦਾ ਹੈ।
- ਤੁਹਾਨੂੰ MCP ਸਰਵਰ ਦੀ ਪ੍ਰਤੀਕ੍ਰਿਆ ਨੂੰ ਉਸ ਰੂਪ ਵਿੱਚ ਬਦਲਣਾ ਪੈਂਦਾ ਹੈ ਜੋ LLM ਸਮਝ ਸਕੇ।

## ਨਮੂਨੇ

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## ਵਾਧੂ ਸਰੋਤ

## ਅਗਲਾ ਕੀ

- ਅਗਲਾ: [Visual Studio Code ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਰਵਰ ਨਾਲ ਕੰਮ ਕਰਨਾ](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->