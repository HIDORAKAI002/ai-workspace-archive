# Criar um cliente com LLM

Até agora, viu como criar um servidor e um cliente. O cliente foi capaz de chamar explicitamente o servidor para listar as suas ferramentas, recursos e prompts. No entanto, esta não é uma abordagem muito prática. Os seus utilizadores vivem na era agentiva e esperam usar prompts e comunicar com um LLM em vez disso. Eles não se importam se usa MCP para armazenar as suas capacidades; simplesmente esperam interagir utilizando linguagem natural. Então, como resolvemos isto? A solução é adicionar um LLM ao cliente.

## Visão geral

Nesta lição focamo-nos em adicionar um LLM ao seu cliente e mostrar como isso oferece uma experiência muito melhor para o seu utilizador.

## Objetivos de aprendizagem

No final desta lição, será capaz de:

- Criar um cliente com um LLM.
- Interagir sem falhas com um servidor MCP usando um LLM.
- Proporcionar uma melhor experiência ao utilizador final no lado do cliente.

## Abordagem

Vamos tentar entender a abordagem que precisamos adotar. Adicionar um LLM parece simples, mas será que realmente faremos isso?

Aqui está como o cliente irá interagir com o servidor:

1. Estabelecer ligação com o servidor.

1. Listar capacidades, prompts, recursos e ferramentas, e guardar o seu esquema.

1. Adicionar um LLM e passar as capacidades guardadas e os seus esquemas num formato que o LLM compreenda.

1. Tratar um prompt do utilizador passando-o para o LLM juntamente com as ferramentas listadas pelo cliente.

Ótimo, agora que entendemos como podemos fazer isso a um nível elevado, vamos experimentar isto no exercício abaixo.

## Exercício: Criar um cliente com um LLM

Neste exercício, vamos aprender a adicionar um LLM ao nosso cliente.

### Autenticação usando Token de Acesso Pessoal GitHub

Criar um token GitHub é um processo simples. Eis como pode fazê-lo:

- Vá a Definições do GitHub – Clique na sua foto de perfil no canto superior direito e selecione Definições.
- Navegue para Definições de Desenvolvedor – Desça e clique em Definições de Desenvolvedor.
- Selecione Tokens de Acesso Pessoal – Clique em Tokens de acesso refinado e depois em Gerar novo token.
- Configure o seu Token – Adicione uma nota para referência, defina uma data de expiração e selecione os escopos necessários (permissões). Neste caso, certifique-se de adicionar a permissão Models.
- Gere e Copie o Token – Clique em Gerar token e certifique-se de copiá-lo imediatamente, pois não poderá vê-lo novamente.

### -1- Conectar ao servidor

Vamos criar primeiro o nosso cliente:

#### TypeScript

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importar zod para validação do esquema

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

No código anterior nós:

- Importámos as bibliotecas necessárias
- Criámos uma classe com dois membros, `client` e `openai`, que nos ajudarão a gerir um cliente e a interagir com um LLM respetivamente.
- Configurámos a nossa instância LLM para usar os Modelos GitHub definindo `baseUrl` para apontar para a API de inferência.

#### Python

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Criar parâmetros do servidor para a ligação stdio
server_params = StdioServerParameters(
    command="mcp",  # Executável
    args=["run", "server.py"],  # Argumentos opcionais da linha de comandos
    env=None,  # Variáveis de ambiente opcionais
)


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write
        ) as session:
            # Inicializar a ligação
            await session.initialize()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())

```

No código anterior nós:

- Importámos as bibliotecas necessárias para MCP
- Criámos um cliente

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

Primeiro, precisará de adicionar as dependências LangChain4j ao seu ficheiro `pom.xml`. Adicione estas dependências para ativar a integração MCP e suporte a Modelos GitHub:

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

Depois, crie a sua classe cliente Java:

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
    
    public static void main(String[] args) throws Exception {        // Configurar o LLM para usar Modelos do GitHub
        ChatLanguageModel model = OpenAiOfficialChatModel.builder()
                .isGitHubModels(true)
                .apiKey(System.getenv("GITHUB_TOKEN"))
                .timeout(Duration.ofSeconds(60))
                .modelName("gpt-4.1-nano")
                .build();

        // Criar transporte MCP para ligar ao servidor
        McpTransport transport = new HttpMcpTransport.Builder()
                .sseUrl("http://localhost:8080/sse")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();

        // Criar cliente MCP
        McpClient mcpClient = new DefaultMcpClient.Builder()
                .transport(transport)
                .build();
    }
}
```

No código anterior nós:

- **Adicionámos as dependências LangChain4j**: necessárias para integração MCP, cliente oficial OpenAI, e suporte a Modelos GitHub
- **Importámos as bibliotecas LangChain4j**: para integração MCP e funcionalidade de modelo de chat OpenAI
- **Criámos um `ChatLanguageModel`**: configurado para usar Modelos GitHub com o seu token GitHub
- **Configurámos o transporte HTTP**: usando Server-Sent Events (SSE) para conectar ao servidor MCP
- **Criámos um cliente MCP**: que irá gerir a comunicação com o servidor
- **Usámos o suporte MCP incorporado do LangChain4j**: que simplifica a integração entre LLMs e servidores MCP

#### Rust

Este exemplo assume que tem um servidor MCP baseado em Rust a correr. Se não tiver um, consulte a lição [01-first-server](../01-first-server/README.md) para criar o servidor.

Depois de ter o seu servidor MCP Rust, abra um terminal e navegue até ao mesmo diretório do servidor. Depois execute o seguinte comando para criar um novo projeto de cliente LLM:

```bash
mkdir calculator-llmclient
cd calculator-llmclient
cargo init
```

Adicione as seguintes dependências ao seu ficheiro `Cargo.toml`:

```toml
[dependencies]
async-openai = { version = "0.29.0", features = ["byot"] }
rmcp = { version = "0.5.0", features = ["client", "transport-child-process"] }
serde_json = "1.0.141"
tokio = { version = "1.46.1", features = ["rt-multi-thread"] }
```

> [!NOTE]
> Não existe uma biblioteca Rust oficial para OpenAI, no entanto, a crate `async-openai` é uma [biblioteca mantida pela comunidade](https://platform.openai.com/docs/libraries/rust#rust) que é comumente usada.

Abra o ficheiro `src/main.rs` e substitua o seu conteúdo pelo seguinte código:

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
    // Mensagem inicial
    let mut messages = vec![json!({"role": "user", "content": "What is the sum of 3 and 2?"})];

    // Configurar cliente OpenAI
    let api_key = std::env::var("OPENAI_API_KEY")?;
    let openai_client = Client::with_config(
        OpenAIConfig::new()
            .with_api_base("https://models.github.ai/inference/chat")
            .with_api_key(api_key),
    );

    // Configurar cliente MCP
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

    // TODO: Obter lista de ferramentas MCP

    // TODO: Conversa LLM com chamadas de ferramentas

    Ok(())
}
```

Este código configura uma aplicação básica Rust que irá conectar a um servidor MCP e aos Modelos GitHub para interações LLM.

> [!IMPORTANT]
> Certifique-se de definir a variável de ambiente `OPENAI_API_KEY` com o seu token GitHub antes de executar a aplicação.

Ótimo, no próximo passo vamos listar as capacidades no servidor.

### -2- Listar capacidades do servidor

Agora vamos conectar ao servidor e pedir as suas capacidades:

#### Typescript

Na mesma classe, adicione os seguintes métodos:

```typescript
async connectToServer(transport: Transport) {
     await this.client.connect(transport);
     this.run();
     console.error("MCPClient started on stdin/stdout");
}

async run() {
    console.log("Asking server for available tools");

    // listando ferramentas
    const toolsResult = await this.client.listTools();
}
```

No código anterior nós:

- Adicionámos código para conectar ao servidor, `connectToServer`.
- Criámos um método `run` responsável por tratar o fluxo da nossa aplicação. Até agora só lista as ferramentas, mas vamos adicionar mais em breve.

#### Python

```python
# Listar recursos disponíveis
resources = await session.list_resources()
print("LISTING RESOURCES")
for resource in resources:
    print("Resource: ", resource)

# Listar ferramentas disponíveis
tools = await session.list_tools()
print("LISTING TOOLS")
for tool in tools.tools:
    print("Tool: ", tool.name)
    print("Tool", tool.inputSchema["properties"])
```

Aqui está o que adicionámos:

- Listagem de recursos e ferramentas e imprimimo-los. Para ferramentas também listamos `inputSchema` que usaremos mais à frente.

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

No código anterior nós:

- Listámos as ferramentas disponíveis no Servidor MCP
- Para cada ferramenta, listámos o nome, descrição e o seu esquema. Este último é algo que usaremos para chamar as ferramentas em breve.

#### Java

```java
// Criar um fornecedor de ferramentas que descubra automaticamente as ferramentas MCP
ToolProvider toolProvider = McpToolProvider.builder()
        .mcpClients(List.of(mcpClient))
        .build();

// O fornecedor de ferramentas MCP lida automaticamente com:
// - Listar as ferramentas disponíveis no servidor MCP
// - Converter esquemas de ferramentas MCP para o formato LangChain4j
// - Gerir a execução das ferramentas e as respostas
```

No código anterior nós:

- Criámos um `McpToolProvider` que descobre e regista automaticamente todas as ferramentas do servidor MCP
- O provedor de ferramentas trata internamente a conversão entre os esquemas das ferramentas MCP e o formato de ferramentas do LangChain4j
- Esta abordagem abstrai o processo manual de listagem e conversão das ferramentas

#### Rust

A recuperação das ferramentas do servidor MCP é feita usando o método `list_tools`. Na sua função `main`, após configurar o cliente MCP, adicione o seguinte código:

```rust
// Obter listagem da ferramenta MCP
let tools = mcp_client.list_tools(Default::default()).await?;
```

### -3- Converter capacidades do servidor para ferramentas LLM

O passo seguinte após listar as capacidades do servidor é convertê-las num formato que o LLM compreenda. Depois de o fazer, podemos fornecer estas capacidades como ferramentas ao nosso LLM.

#### TypeScript

1. Adicione o seguinte código para converter a resposta do Servidor MCP para um formato de ferramenta que o LLM possa usar:

    ```typescript
    openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
        }) {
        // Criar um esquema zod baseado no input_schema
        const schema = z.object(tool.input_schema);
    
        return {
            type: "function" as const, // Definir explicitamente o tipo como "function"
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

    O código acima recebe uma resposta do Servidor MCP e converte-a para um formato de definição de ferramenta que o LLM possa entender.

2. Vamos atualizar o método `run` a seguir para listar as capacidades do servidor:

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

    No código anterior, atualizámos o método `run` para percorrer o resultado e para cada entrada chamar `openAiToolAdapter`.

#### Python

1. Primeiro, vamos criar a seguinte função conversora

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

    Na função acima `convert_to_llm_tools` pegamos numa resposta de ferramenta MCP e convertemos para um formato que o LLM compreende.

2. Em seguida, vamos atualizar o nosso código cliente para aproveitar esta função da seguinte forma:

    ```python
    functions = []
    for tool in tools.tools:
        print("Tool: ", tool.name)
        print("Tool", tool.inputSchema["properties"])
        functions.append(convert_to_llm_tool(tool))
    ```

    Aqui, estamos a adicionar uma chamada para `convert_to_llm_tool` para converter a resposta da ferramenta MCP para algo que possamos alimentar ao LLM depois.

#### .NET

1. Vamos adicionar código para converter a resposta da ferramenta MCP para algo que o LLM possa compreender

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

No código anterior nós:

- Criámos uma função `ConvertFrom` que recebe o nome, descrição e esquema de entrada.
- Definimos funcionalidade que cria uma `FunctionDefinition` que é passada a uma `ChatCompletionsDefinition`. Esta última é algo que o LLM pode compreender.

2. Vamos ver como podemos atualizar algum código existente para aproveitar esta função acima:

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
// Criar uma interface Bot para interação em linguagem natural
public interface Bot {
    String chat(String prompt);
}

// Configurar o serviço de IA com as ferramentas LLM e MCP
Bot bot = AiServices.builder(Bot.class)
        .chatLanguageModel(model)
        .toolProvider(toolProvider)
        .build();
```

No código anterior nós:

- Definimos uma interface simples `Bot` para interações em linguagem natural
- Usámos os `AiServices` do LangChain4j para ligar automaticamente o LLM com o provedor de ferramentas MCP
- O framework trata automaticamente a conversão do esquema de ferramentas e chamadas de funções nos bastidores
- Esta abordagem elimina a conversão manual de ferramentas — o LangChain4j trata de toda a complexidade de converter ferramentas MCP para o formato compatível com LLM

#### Rust

Para converter a resposta da ferramenta MCP para um formato que o LLM possa compreender, vamos adicionar uma função auxiliar que formata a listagem das ferramentas. Adicione o seguinte código ao seu ficheiro `main.rs` abaixo da função `main`. Isto será chamado ao fazer pedidos ao LLM:

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

Ótimo, estamos preparados para tratar quaisquer pedidos do utilizador, então vamos abordar isso a seguir.

### -4- Lidar com pedido de prompt do utilizador

Nesta parte do código, vamos tratar pedidos do utilizador.

#### TypeScript

1. Adicione um método que será usado para chamar o nosso LLM:

    ```typescript
    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);


        // 2. Chamar a ferramenta do servidor
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Fazer algo com o resultado
        // POR FAZER

        }
    }
    ```

    No código anterior nós:

    - Adicionámos um método `callTools`.
    - O método recebe uma resposta do LLM e verifica que ferramentas foram chamadas, se houver:

        ```typescript
        for (const tool_call of tool_calls) {
        const toolName = tool_call.function.name;
        const args = tool_call.function.arguments;

        console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

        // chamar ferramenta
        }
        ```

    - Chama uma ferramenta, se o LLM indicar que deve ser chamada:

        ```typescript
        // 2. Chamar a ferramenta do servidor
        const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
        });

        console.log("Tool result: ", toolResult);

        // 3. Fazer algo com o resultado
        // A FAZER
        ```

2. Atualize o método `run` para incluir chamadas ao LLM e à chamada de `callTools`:

    ```typescript

    // 1. Criar mensagens que são a entrada para o LLM
    const prompt = "What is the sum of 2 and 3?"

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Chamar o LLM
    let response = this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        max_tokens: 1000,
        messages,
        tools: tools,
    });    

    let results: any[] = [];

    // 3. Percorrer a resposta do LLM, para cada opção, verificar se tem chamadas de ferramentas
    (await response).choices.map(async (choice: { message: any; }) => {
        const message = choice.message;
        if (message.tool_calls) {
            console.log("Making tool call")
            await this.callTools(message.tool_calls, results);
        }
    });
    ```

Ótimo, vamos listar o código completo:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import OpenAI from "openai";
import { z } from "zod"; // Importar zod para validação de esquema

class MyClient {
    private openai: OpenAI;
    private client: Client;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com", // poderá ser necessário mudar para esta url no futuro: https://models.github.ai/inference
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
          // Criar um esquema zod baseado no input_schema
          const schema = z.object(tool.input_schema);
      
          return {
            type: "function" as const, // Definir explicitamente o tipo para "função"
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
    
    
          // 2. Chamar a ferramenta do servidor
          const toolResult = await this.client.callTool({
            name: toolName,
            arguments: JSON.parse(args),
          });
    
          console.log("Tool result: ", toolResult);
    
          // 3. Fazer algo com o resultado
          // POR FAZER
    
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
    
        // 3. Analisar a resposta do LLM, para cada escolha, verificar se contém chamadas a ferramentas
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

1. Vamos adicionar algumas importações necessárias para chamar um LLM

    ```python
    # llm
    import os
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage
    from azure.core.credentials import AzureKeyCredential
    import json
    ```

2. De seguida, vamos adicionar a função que irá chamar o LLM:

    ```python
    # llm

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
            # Parâmetros opcionais
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

    No código anterior nós:

    - Passámos as nossas funções, que encontramos no servidor MCP e convertidas, para o LLM.
    - Depois chamámos o LLM com essas funções.
    - Em seguida, estamos a inspecionar o resultado para ver que funções devemos chamar, se houver.
    - Finalmente, passamos um array de funções para chamar.

3. Passo final, vamos atualizar o nosso código principal:

    ```python
    prompt = "Add 2 to 20"

    # perguntar ao LLM que ferramentas usar, se alguma
    functions_to_call = call_llm(prompt, functions)

    # chamar funções sugeridas
    for f in functions_to_call:
        result = await session.call_tool(f["name"], arguments=f["args"])
        print("TOOLS result: ", result.content)
    ```

    E foi o último passo, no código acima estamos:

    - A chamar uma ferramenta MCP via `call_tool` usando uma função que o LLM achou que deveríamos chamar com base no nosso prompt.
    - A imprimir o resultado da chamada da ferramenta ao servidor MCP.

#### .NET

1. Vamos mostrar algum código para fazer um pedido de prompt LLM:

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

    No código anterior nós:

    - Obtemos ferramentas do servidor MCP, `var tools = await GetMcpTools()`.
    - Definimos um prompt do utilizador `userMessage`.
    - Construímos um objeto options especificando modelo e ferramentas.
    - Fizemos um pedido ao LLM.

2. Um último passo, vamos ver se o LLM acha que devemos chamar uma função:

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

    No código anterior nós:

    - Percorremos uma lista de chamadas a funções.
    - Para cada chamada a ferramenta, extraímos o nome e argumentos e chamamos a ferramenta no servidor MCP usando o cliente MCP. Finalmente imprimimos os resultados.

Aqui está o código completo:

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
    // Execute pedidos em linguagem natural que utilizam automaticamente as ferramentas MCP
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

No código anterior nós:

- Usámos prompts simples em linguagem natural para interagir com as ferramentas do servidor MCP
- O framework LangChain4j trata automaticamente:
  - A conversão dos prompts dos utilizadores para chamadas a ferramentas quando necessário
  - Chamadas às ferramentas MCP apropriadas com base na decisão do LLM
  - Gestão do fluxo da conversa entre o LLM e o servidor MCP
- O método `bot.chat()` retorna respostas em linguagem natural que podem incluir resultados da execução de ferramentas MCP
- Esta abordagem proporciona uma experiência de utilizador fluida onde os utilizadores não precisam conhecer a implementação subjacente MCP

Exemplo completo de código:

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

Aqui é onde acontece a maior parte do trabalho. Vamos chamar o LLM com o prompt inicial do utilizador, depois processar a resposta para ver se alguma ferramenta precisa ser chamada. Se assim for, iremos chamar essas ferramentas e continuar a conversa com o LLM até que não sejam necessárias mais chamadas a ferramentas e tenhamos uma resposta final.

Vamos fazer várias chamadas ao LLM, então vamos definir uma função que tratará da chamada ao LLM. Adicione a seguinte função ao seu ficheiro `main.rs`:

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

Esta função recebe o cliente LLM, uma lista de mensagens (incluindo o prompt do utilizador), ferramentas do servidor MCP, e envia uma solicitação ao LLM, retornando a resposta.
A resposta do LLM irá conter um array de `choices`. Precisamos de processar o resultado para ver se há algum `tool_calls` presente. Isto permite-nos saber que o LLM está a pedir que uma ferramenta específica seja chamada com argumentos. Adicione o seguinte código no final do seu ficheiro `main.rs` para definir uma função que trate a resposta do LLM:

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

    // Imprimir conteúdo se disponível
    if let Some(content) = message.get("content").and_then(|c| c.as_str()) {
        println!("🤖 {}", content);
    }

    // Gerir chamadas de ferramentas
    if let Some(tool_calls) = message.get("tool_calls").and_then(|tc| tc.as_array()) {
        messages.push(message.clone()); // Adicionar mensagem do assistente

        // Executar cada chamada de ferramenta
        for tool_call in tool_calls {
            let (tool_id, name, args) = extract_tool_call_info(tool_call)?;
            println!("⚡ Calling tool: {}", name);

            let result = mcp_client
                .call_tool(CallToolRequestParam {
                    name: name.into(),
                    arguments: serde_json::from_str::<Value>(&args)?.as_object().cloned(),
                })
                .await?;

            // Adicionar resultado da ferramenta às mensagens
            messages.push(json!({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": serde_json::to_string_pretty(&result)?
            }));
        }

        // Continuar a conversa com resultados das ferramentas
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

Se existirem `tool_calls`, extrai a informação da ferramenta, chama o servidor MCP com o pedido da ferramenta, e adiciona os resultados às mensagens da conversa. Depois continua a conversa com o LLM e as mensagens são atualizadas com a resposta do assistente e os resultados da chamada da ferramenta.

Para extrair a informação da chamada à ferramenta que o LLM devolve para chamadas MCP, vamos adicionar outra função auxiliar para extrair tudo o que é necessário para fazer a chamada. Adicione o seguinte código no final do seu ficheiro `main.rs`:

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

Com todas as peças no lugar, podemos agora tratar o prompt inicial do utilizador e chamar o LLM. Atualize a sua função `main` para incluir o seguinte código:

```rust
// Conversa LLM com chamadas de ferramentas
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

Isto irá interrogar o LLM com o prompt inicial do utilizador a pedir a soma de dois números, e irá processar a resposta para lidar de forma dinâmica com chamadas de ferramentas.

Excelente, conseguiu!

## Tarefa

Pegue no código do exercício e construa o servidor com mais algumas ferramentas. Depois crie um cliente com um LLM, como no exercício, e teste com diferentes prompts para garantir que todas as ferramentas do servidor são chamadas de forma dinâmica. Esta forma de construir um cliente significa que o utilizador final terá uma ótima experiência, pois conseguirá usar prompts, em vez de comandos exatos do cliente, e ficará alheio a qualquer chamada ao servidor MCP.

## Solução

[Solution](./solution/README.md)

## Principais Aprendizagens

- Adicionar um LLM ao seu cliente oferece uma forma melhor dos utilizadores interagirem com os Servidores MCP.
- É necessário converter a resposta do Servidor MCP para algo que o LLM possa compreender.

## Exemplos

- [Calculadora em Java](../samples/java/calculator/README.md)
- [Calculadora em .Net](../../../../03-GettingStarted/samples/csharp)
- [Calculadora em JavaScript](../samples/javascript/README.md)
- [Calculadora em TypeScript](../samples/typescript/README.md)
- [Calculadora em Python](../../../../03-GettingStarted/samples/python)
- [Calculadora em Rust](../../../../03-GettingStarted/samples/rust)

## Recursos Adicionais

## O Que Segue

- Seguinte: [Consumir um servidor usando Visual Studio Code](../04-vscode/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->