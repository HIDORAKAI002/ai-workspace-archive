# Servidor MCP com transporte stdio

> **⚠️ Atualização Importante**: A partir da Especificação MCP 2025-06-18, o transporte SSE (Server-Sent Events) autónomo foi **descontinuado** e substituído pelo transporte "Streamable HTTP". A especificação MCP atual define dois mecanismos principais de transporte:
> 1. **stdio** - Entrada/saída padrão (recomendado para servidores locais)
> 2. **Streamable HTTP** - Para servidores remotos que podem usar SSE internamente
>
> Esta lição foi atualizada para focar no **transporte stdio**, que é a abordagem recomendada para a maioria das implementações de servidores MCP.

O transporte stdio permite que os servidores MCP comuniquem com clientes através das streams de entrada e saída padrão. Este é o mecanismo de transporte mais utilizado e recomendado na especificação MCP atual, fornecendo uma forma simples e eficiente de construir servidores MCP que podem ser facilmente integrados com várias aplicações cliente.

## Visão Geral

Esta lição cobre como construir e consumir Servidores MCP utilizando o transporte stdio.

## Objetivos de Aprendizagem

No final desta lição, será capaz de:

- Construir um Servidor MCP usando o transporte stdio.
- Depurar um Servidor MCP usando o Inspector.
- Consumir um Servidor MCP usando o Visual Studio Code.
- Compreender os mecanismos de transporte MCP atuais e porque o stdio é recomendado.

## Transporte stdio - Como funciona

O transporte stdio é um dos dois tipos de transporte suportados na especificação MCP atual (2025-11-25). Eis como funciona:

- **Comunicação Simples**: O servidor lê mensagens JSON-RPC da entrada padrão (`stdin`) e envia mensagens para a saída padrão (`stdout`).
- **Baseado em processo**: O cliente lança o servidor MCP como um subprocesso.
- **Formato das mensagens**: As mensagens são pedidos, notificações ou respostas JSON-RPC individuais, delimitadas por linhas novas.
- **Registo (Logging)**: O servidor PODE escrever strings UTF-8 no erro padrão (`stderr`) para fins de registo.

### Requisitos principais:
- As mensagens DEVEM ser delimitadas por linhas novas e NÃO DEVEM conter novas linhas embutidas.
- O servidor NÃO PODE escrever nada no `stdout` que não seja uma mensagem MCP válida.
- O cliente NÃO PODE escrever nada no `stdin` do servidor que não seja uma mensagem MCP válida.

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

No código anterior:

- Importamos a classe `Server` e `StdioServerTransport` do SDK MCP
- Criamos uma instância do servidor com configuração básica e capacidades
- Criamos uma instância `StdioServerTransport` e ligamos o servidor a ela, permitindo a comunicação via stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Criar instância do servidor
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

No código anterior:

- Criamos uma instância do servidor usando o SDK MCP
- Definimos ferramentas com decoradores
- Usamos o gestor de contexto stdio_server para gerir o transporte

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

A principal diferença do SSE é que os servidores stdio:

- Não requerem configuração de servidor web nem endpoints HTTP
- São lançados como subprocessos pelo cliente
- Comunicam através das streams stdin/stdout
- São mais simples de implementar e depurar

## Exercício: Criar um servidor stdio

Para criar o nosso servidor, precisamos de ter em mente duas coisas:

- Precisamos usar um servidor web para expor endpoints para ligação e mensagens.

## Laboratório: Criar um servidor MCP stdio simples

Neste laboratório, vamos criar um servidor MCP simples utilizando o transporte stdio recomendado. Este servidor irá expor ferramentas que os clientes podem utilizar usando o Protocolo Modelo de Contexto padrão.

### Pré-requisitos

- Python 3.8 ou superior
- MCP Python SDK: `pip install mcp`
- Conhecimentos básicos de programação assíncrona

Vamos começar por criar o nosso primeiro servidor MCP stdio:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Configurar registo de eventos
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Criar o servidor
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # Usar transporte stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Diferenças chave relativamente ao método SSE descontinuado

**Transporte Stdio (Padrão Atual):**
- Modelo simples de subprocesso - o cliente lança o servidor como processo filho
- Comunicação via stdin/stdout usando mensagens JSON-RPC
- Não é necessária configuração de servidor HTTP
- Melhor desempenho e segurança
- Depuração e desenvolvimento facilitados

**Transporte SSE (Descontinuado desde MCP 2025-06-18):**
- Requeria servidor HTTP com endpoints SSE
- Configuração mais complexa com infraestrutura web
- Considerações adicionais de segurança para endpoints HTTP
- Agora substituído pelo Streamable HTTP para cenários web

### Criar um servidor com transporte stdio

Para criar o nosso servidor stdio, precisamos de:

1. **Importar as bibliotecas necessárias** - Precisamos dos componentes do servidor MCP e do transporte stdio
2. **Criar uma instância do servidor** - Definir o servidor com as suas capacidades
3. **Definir ferramentas** - Adicionar funcionalidades que queremos expor
4. **Configurar o transporte** - Configurar a comunicação stdio
5. **Executar o servidor** - Iniciar o servidor e gerir mensagens

Vamos construir isto passo a passo:

### Passo 1: Criar um servidor stdio básico

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Configurar o registo de eventos
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Criar o servidor
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Passo 2: Adicionar mais ferramentas

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Passo 3: Executar o servidor

Guarde o código como `server.py` e execute a partir da linha de comandos:

```bash
python server.py
```

O servidor vai iniciar e aguardar a entrada via stdin. Comunica usando mensagens JSON-RPC sobre o transporte stdio.

### Passo 4: Testar com o Inspector

Pode testar o seu servidor usando o MCP Inspector:

1. Instale o Inspector: `npx @modelcontextprotocol/inspector`
2. Execute o Inspector e aponte para o seu servidor
3. Teste as ferramentas que criou

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Depuração do seu servidor stdio

### Usar o MCP Inspector

O MCP Inspector é uma ferramenta valiosa para depurar e testar servidores MCP. Eis como usá-lo com o seu servidor stdio:

1. **Instalar o Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Executar o Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testar o servidor**: O Inspector fornece uma interface web onde pode:
   - Ver as capacidades do servidor
   - Testar ferramentas com diferentes parâmetros
   - Monitorizar mensagens JSON-RPC
   - Depurar problemas de conexão

### Usar o VS Code

Também pode depurar o seu servidor MCP diretamente no VS Code:

1. Crie uma configuração de lançamento em `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Defina pontos de interrupção no código do servidor
3. Inicie o depurador e teste com o Inspector

### Dicas comuns de depuração

- Use `stderr` para registo - nunca escreva no `stdout` que é reservado para mensagens MCP
- Garanta que todas as mensagens JSON-RPC são delimitadas por linhas novas
- Teste primeiro com ferramentas simples antes de adicionar funcionalidades complexas
- Use o Inspector para verificar formatos das mensagens

## Consumir o seu servidor stdio no VS Code

Uma vez construído o seu servidor MCP stdio, pode integrá-lo com o VS Code para usá-lo com Claude ou outros clientes compatíveis MCP.

### Configuração

1. **Crie um ficheiro de configuração MCP** em `%APPDATA%\Claude\claude_desktop_config.json` (Windows) ou `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Reinicie o Claude**: Feche e abra novamente o Claude para carregar a nova configuração do servidor.

3. **Teste a ligação**: Inicie uma conversa com o Claude e tente usar as ferramentas do seu servidor:
   - "Podes cumprimentar-me usando a ferramenta de cumprimento?"
   - "Calcula a soma de 15 e 27"
   - "Qual é a informação do servidor?"

### Exemplo de servidor stdio TypeScript

Aqui está um exemplo completo em TypeScript para referência:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Adicionar ferramentas
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### Exemplo de servidor stdio .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Resumo

Nesta lição atualizada, aprendeu a:

- Construir servidores MCP usando o transporte **stdio** atual (abordagem recomendada)
- Compreender porque o transporte SSE foi descontinuado em favor do stdio e Streamable HTTP
- Criar ferramentas que podem ser chamadas por clientes MCP
- Depurar o seu servidor usando o MCP Inspector
- Integrar o seu servidor stdio com VS Code e Claude

O transporte stdio fornece uma forma mais simples, segura e com melhor desempenho para construir servidores MCP comparado com o método SSE descontinuado. É o transporte recomendado para a maioria das implementações de servidor MCP a partir da especificação de 2025-06-18.

### .NET

1. Vamos criar algumas ferramentas primeiro, para isso vamos criar um ficheiro *Tools.cs* com o seguinte conteúdo:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Exercício: Testar o seu servidor stdio

Agora que criou o seu servidor stdio, vamos testá-lo para garantir que funciona corretamente.

### Pré-requisitos

1. Certifique-se de que tem o MCP Inspector instalado:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. O seu código do servidor deve estar guardado (ex.: como `server.py`)

### Testar com o Inspector

1. **Inicie o Inspector com o seu servidor**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Abra a interface web**: O Inspector abrirá uma janela no navegador mostrando as capacidades do seu servidor.

3. **Teste as ferramentas**:
   - Experimente a ferramenta `get_greeting` com diferentes nomes
   - Teste a ferramenta `calculate_sum` com vários números
   - Chame a ferramenta `get_server_info` para ver os metadados do servidor

4. **Monitorize a comunicação**: O Inspector mostra as mensagens JSON-RPC trocadas entre cliente e servidor.

### O que deverá ver

Quando o seu servidor arrancar corretamente, deverá ver:
- Capacidades do servidor listadas no Inspector
- Ferramentas disponíveis para teste
- Trocas bem-sucedidas de mensagens JSON-RPC
- Respostas das ferramentas exibidas na interface

### Problemas comuns e soluções

**Servidor não arranca:**
- Verifique se todas as dependências estão instaladas: `pip install mcp`
- Confirme a sintaxe e indentação Python
- Procure mensagens de erro na consola

**Ferramentas não aparecem:**
- Verifique se os decoradores `@server.tool()` estão presentes
- Confirme que as funções de ferramentas estão definidas antes da função `main()`
- Verifique se o servidor está corretamente configurado

**Problemas de ligação:**
- Assegure-se que o servidor está a usar o transporte stdio corretamente
- Verifique que não existem outros processos a interferir
- Confirme a sintaxe do comando do Inspector

## Trabalho de casa

Tente expandir o seu servidor com mais capacidades. Veja [esta página](https://api.chucknorris.io/) para, por exemplo, adicionar uma ferramenta que chame uma API. Você decide como o servidor deve ser. Divirta-se :)

## Solução

[Solução](./solution/README.md) Aqui está uma possível solução com código funcional.

## Principais Pontos a Reter

Os principais pontos a reter deste capítulo são os seguintes:

- O transporte stdio é o mecanismo recomendado para servidores MCP locais.
- O transporte stdio permite comunicação fluida entre servidores MCP e clientes utilizando as streams padrão de entrada e saída.
- Pode usar tanto o Inspector como o Visual Studio Code para consumir servidores stdio diretamente, tornando a depuração e integração simples.

## Exemplos

- [Calculadora Java](../samples/java/calculator/README.md)
- [Calculadora .Net](../../../../03-GettingStarted/samples/csharp)
- [Calculadora JavaScript](../samples/javascript/README.md)
- [Calculadora TypeScript](../samples/typescript/README.md)
- [Calculadora Python](../../../../03-GettingStarted/samples/python) 

## Recursos Adicionais

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## O que vem a seguir

## Próximos Passos

Agora que aprendeu a construir servidores MCP com transporte stdio, pode explorar tópicos mais avançados:

- **Seguir para**: [Streaming HTTP com MCP (Streamable HTTP)](../06-http-streaming/README.md) - Saiba mais sobre o outro mecanismo de transporte suportado para servidores remotos
- **Avançado**: [Boas Práticas de Segurança MCP](../../02-Security/README.md) - Implemente segurança nos seus servidores MCP
- **Produção**: [Estratégias de Deploy](../09-deployment/README.md) - Coloque os seus servidores em produção

## Recursos Adicionais

- [Especificação MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Especificação oficial
- [Documentação MCP SDK](https://github.com/modelcontextprotocol/sdk) - Referências SDK para todas as linguagens
- [Exemplos da Comunidade](../../06-CommunityContributions/README.md) - Mais exemplos de servidores da comunidade

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->