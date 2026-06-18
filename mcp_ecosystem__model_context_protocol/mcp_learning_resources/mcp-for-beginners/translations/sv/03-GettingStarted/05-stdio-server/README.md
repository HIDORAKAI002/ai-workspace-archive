# MCP-server med stdio-transport

> **⚠️ Viktig uppdatering**: Från och med MCP-specifikationen 2025-06-18 har den fristående SSE (Server-Sent Events)-transporten **avvecklats** och ersatts av "Streamable HTTP"-transporten. Den nuvarande MCP-specifikationen definierar två primära transportmekanismer:
> 1. **stdio** – Standard in-/utmatning (rekommenderas för lokala servrar)
> 2. **Streamable HTTP** – För fjärrservrar som eventuellt använder SSE internt
>
> Den här lektionen har uppdaterats för att fokusera på **stdio-transporten**, som är den rekommenderade metoden för de flesta MCP-serverimplementationer.

Stdio-transporten gör det möjligt för MCP-servrar att kommunicera med klienter via standard in- och utströmmar. Detta är den mest använda och rekommenderade transportmekanismen i den aktuella MCP-specifikationen, som erbjuder ett enkelt och effektivt sätt att bygga MCP-servrar som lätt kan integreras med olika klientapplikationer.

## Översikt

Denna lektion täcker hur man bygger och använder MCP-servrar med stdio-transport.

## Inlärningsmål

I slutet av lektionen ska du kunna:

- Bygga en MCP-server med stdio-transport.
- Felsöka en MCP-server med Inspector.
- Använda en MCP-server i Visual Studio Code.
- Förstå de nuvarande MCP-transportmekanismerna och varför stdio rekommenderas.

## stdio-transport – Hur det fungerar

Stdio-transporten är en av två stödda transporttyper i den aktuella MCP-specifikationen (2025-11-25). Så här fungerar den:

- **Enkel kommunikation**: Servern läser JSON-RPC-meddelanden från standard in (`stdin`) och skickar meddelanden till standard ut (`stdout`).
- **Processbaserad**: Klienten startar MCP-servern som en underprocess.
- **Meddelandeformat**: Meddelanden är individuella JSON-RPC-förfrågningar, notifikationer eller svar, avgränsade med radbrytningar.
- **Loggning**: Servern KAN skriva UTF-8-strängar till standard fel (`stderr`) för loggändamål.

### Viktiga krav:
- Meddelanden SKA vara avgränsade med radbrytningar och FÅR INTE innehålla inbäddade radbrytningar
- Servern FÅR INTE skriva något till `stdout` som inte är ett giltigt MCP-meddelande
- Klienten FÅR INTE skriva något till serverns `stdin` som inte är ett giltigt MCP-meddelande

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

I ovanstående kod:

- Importerar vi `Server`-klassen och `StdioServerTransport` från MCP SDK
- Skapar en serverinstans med grundläggande konfiguration och kapaciteter
- Skapar en `StdioServerTransport`-instans och kopplar servern till den, vilket möjliggör kommunikation via stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Skapa serverinstans
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

I koden ovan:

- Skapar vi en serverinstans med MCP SDK
- Definierar verktyg med dekoratorer
- Använder kontextmanagern stdio_server för att hantera transporten

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

Den viktigaste skillnaden från SSE är att stdio-servrar:

- Kräver ingen webbserveruppsättning eller HTTP-endpoints
- Startas som underprocesser av klienten
- Kommunicerar via stdin/stdout-strömmar
- Är enklare att implementera och felsöka

## Övning: Skapa en stdio-server

För att skapa vår server behöver vi ha två saker i åtanke:

- Vi behöver använda en webbserver för att exponera endpoints för anslutning och meddelanden.

## Laboration: Skapa en enkel MCP stdio-server

I denna laboration skapar vi en enkel MCP-server med den rekommenderade stdio-transporten. Denna server kommer att exponera verktyg som klienter kan anropa med standard Model Context Protocol.

### Förutsättningar

- Python 3.8 eller senare
- MCP Python SDK: `pip install mcp`
- Grundläggande kunskaper i asynkron programmering

Låt oss börja med att skapa vår första MCP stdio-server:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Konfigurera loggning
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Skapa servern
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
    # Använd stdio-transport
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Viktiga skillnader från den avvecklade SSE-metoden

**Stdio Transport (nuvarande standard):**
- Enkel underprocessmodell – klienten startar servern som en barnprocess
- Kommunikation via stdin/stdout med JSON-RPC-meddelanden
- Inget behov av att sätta upp HTTP-server
- Bättre prestanda och säkerhet
- Enklare att felsöka och utveckla

**SSE Transport (avvecklad från MCP 2025-06-18):**
- Kräver HTTP-server med SSE-endpoints
- Mer komplex installation med webbserverinfrastruktur
- Ytterligare säkerhetsaspekter för HTTP-endpoints
- Ersatt av Streamable HTTP för webbaserade scenarion

### Skapa en server med stdio-transport

För att skapa vår stdio-server behöver vi:

1. **Importera nödvändiga bibliotek** – MCP-serverkomponenter och stdio-transport
2. **Skapa en serverinstans** – Definiera servern med dess kapaciteter
3. **Definiera verktyg** – Lägg till funktionalitet att exponera
4. **Ställ in transporten** – Konfigurera stdio-kommunikationen
5. **Kör servern** – Starta servern och hantera meddelanden

Vi bygger detta steg för steg:

### Steg 1: Skapa en grundläggande stdio-server

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Konfigurera loggning
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Skapa servern
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

### Steg 2: Lägg till fler verktyg

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

### Steg 3: Köra servern

Spara koden som `server.py` och kör den från kommandoraden:

```bash
python server.py
```

Servern startar och väntar på input från stdin. Den kommunicerar med JSON-RPC-meddelanden över stdio-transporten.

### Steg 4: Testa med Inspector

Du kan testa din server med MCP Inspector:

1. Installera Inspector: `npx @modelcontextprotocol/inspector`
2. Kör Inspector och peka den mot din server
3. Testa verktygen du skapat

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```


## Felsökning av din stdio-server

### Använda MCP Inspector

MCP Inspector är ett värdefullt verktyg för att felsöka och testa MCP-servrar. Så här använder du det med din stdio-server:

1. **Installera Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Starta Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testa din server**: Inspector ger ett webbgränssnitt där du kan:
   - Se serverns kapaciteter
   - Testa verktyg med olika parametrar
   - Övervaka JSON-RPC-meddelanden
   - Felsöka anslutningsproblem

### Använda VS Code

Du kan också felsöka din MCP-server direkt i VS Code:

1. Skapa en launch-konfiguration i `.vscode/launch.json`:
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

2. Sätt brytpunkter i serverkoden
3. Kör debuggern och testa med Inspector

### Vanliga tips för felsökning

- Använd `stderr` för loggning – skriv aldrig till `stdout` då det är reserverat för MCP-meddelanden
- Se till att alla JSON-RPC-meddelanden är avgränsade med radbrytningar
- Testa med enkla verktyg först innan du lägger till komplex funktionalitet
- Använd Inspector för att verifiera meddelandeformat

## Använda din stdio-server i VS Code

När du byggt din MCP stdio-server kan du integrera den med VS Code för att använda den tillsammans med Claude eller andra MCP-kompatibla klienter.

### Konfiguration

1. **Skapa en MCP-konfigurationsfil** vid `%APPDATA%\Claude\claude_desktop_config.json` (Windows) eller `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Starta om Claude**: Stäng och öppna Claude på nytt för att ladda den nya serverkonfigurationen.

3. **Testa anslutningen**: Starta en konversation med Claude och prova dina serververktyg:
   - "Kan du hälsa på mig med hälsningsverktyget?"
   - "Beräkna summan av 15 och 27"
   - "Vad är serverinformationen?"

### Exempel på TypeScript stdio-server

Här är ett komplett TypeScript-exempel för referens:

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

// Lägg till verktyg
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

### Exempel på .NET stdio-server

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

## Sammanfattning

I denna uppdaterade lektion har du lärt dig att:

- Bygga MCP-servrar med nuvarande **stdio-transport** (rekommenderat tillvägagångssätt)
- Förstå varför SSE-transporten avvecklades till förmån för stdio och Streamable HTTP
- Skapa verktyg som kan anropas av MCP-klienter
- Felsöka servern med MCP Inspector
- Integrera din stdio-server med VS Code och Claude

Stdio-transporten erbjuder ett enklare, säkrare och mer presterande sätt att bygga MCP-servrar jämfört med den avvecklade SSE-metoden. Det är den rekommenderade transporten för de flesta MCP-serverimplementationer enligt specifikationen från 2025-06-18.

### .NET

1. Låt oss skapa några verktyg först, för detta skapar vi en fil *Tools.cs* med följande innehåll:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Övning: Testa din stdio-server

Nu när du byggt din stdio-server, låt oss testa att den fungerar korrekt.

### Förutsättningar

1. Säkerställ att du har MCP Inspector installerad:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Din serverkod ska vara sparad (t.ex. som `server.py`)

### Testa med Inspector

1. **Starta Inspector med din server**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Öppna webbgränssnittet**: Inspector öppnar ett webbläsarfönster som visar serverns kapaciteter.

3. **Testa verktygen**: 
   - Prova verktyget `get_greeting` med olika namn
   - Testa verktyget `calculate_sum` med olika tal
   - Anropa verktyget `get_server_info` för att se metadata om servern

4. **Övervaka kommunikationen**: Inspector visar JSON-RPC-meddelandena som skickas mellan klient och server.

### Vad du bör se

När din server startar korrekt bör du se:
- Serverkapaciteter listade i Inspector
- Verktyg tillgängliga för testning
- Framgångsrika JSON-RPC-meddelandeutbyten
- Verktygsvar visade i gränssnittet

### Vanliga problem och lösningar

**Servern startar inte:**
- Kontrollera att alla beroenden är installerade: `pip install mcp`
- Verifiera Python-syntax och indentering
- Leta efter felmeddelanden i konsolen

**Verktyg syns inte:**
- Kontrollera att `@server.tool()`-dekoratorer finns
- Kontrollera att verktygsfunktioner definieras före `main()`
- Säkerställ att servern är korrekt konfigurerad

**Anslutningsproblem:**
- Kontrollera att servern använder stdio-transport korrekt
- Se till att inga andra processer stör
- Verifiera Inspector-kommandots syntax

## Uppgift

Försök bygga ut din server med fler kapaciteter. Se [den här sidan](https://api.chucknorris.io/) för att exempelvis lägga till ett verktyg som anropar ett API. Du bestämmer hur servern ska se ut. Ha kul :)

## Lösning

[Lösning](./solution/README.md) Här är en möjlig lösning med fungerande kod.

## Viktiga lärdomar

De viktigaste lärdomarna från detta kapitel är:

- Stdio-transporten är den rekommenderade mekanismen för lokala MCP-servrar.
- Stdio-transport tillåter sömlös kommunikation mellan MCP-servrar och klienter via standard in- och utströmmar.
- Du kan använda både Inspector och Visual Studio Code för att konsumera stdio-servrar direkt, vilket gör felsökning och integration enkel.

## Exempel

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python) 

## Ytterligare resurser

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Vad händer härnäst

## Nästa steg

Nu när du har lärt dig hur man bygger MCP-servrar med stdio-transporten kan du utforska mer avancerade ämnen:

- **Nästa**: [HTTP Streaming med MCP (Streamable HTTP)](../06-http-streaming/README.md) – Lär dig om den andra stödda transportmekanismen för fjärrservrar
- **Avancerat**: [MCP:s säkerhetsbästa praxis](../../02-Security/README.md) – Implementera säkerhet i dina MCP-servrar
- **Produktion**: [Driftsättningsstrategier](../09-deployment/README.md) – Distribuera dina servrar för produktionsbruk

## Ytterligare resurser

- [MCP-specifikation 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) – Officiell specifikation
- [MCP SDK-dokumentation](https://github.com/modelcontextprotocol/sdk) – SDK-referenser för alla språk
- [Community-exempel](../../06-CommunityContributions/README.md) – Fler serverexempel från communityn

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->