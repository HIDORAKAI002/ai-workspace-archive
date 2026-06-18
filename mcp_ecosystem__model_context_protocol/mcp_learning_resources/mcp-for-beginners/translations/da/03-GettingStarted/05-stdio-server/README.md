# MCP Server med stdio Transport

> **⚠️ Vigtig Opdatering**: Fra og med MCP-specifikationen 2025-06-18 er den standalone SSE (Server-Sent Events) transport **udgået** og erstattet af "Streamable HTTP" transport. Den nuværende MCP-specifikation definerer to primære transportmekanismer:
> 1. **stdio** - Standard input/output (anbefalet til lokale servere)
> 2. **Streamable HTTP** - Til fjernservere, der internt kan bruge SSE
>
> Denne lektion er opdateret til at fokusere på **stdio transport**, som er den anbefalede tilgang til de fleste MCP server-implementeringer.

Stdio transporten tillader MCP-servere at kommunikere med klienter via standard input og output streams. Dette er den mest udbredte og anbefalede transportmekanisme i den nuværende MCP-specifikation, som giver en simpel og effektiv måde at bygge MCP-servere, der let kan integreres med forskellige klientapplikationer.

## Oversigt

Denne lektion dækker, hvordan man bygger og bruger MCP-servere ved hjælp af stdio transport.

## Læringsmål

Når du har gennemført denne lektion, vil du kunne:

- Bygge en MCP-server med stdio transport.
- Fejlsøge en MCP-server med Inspector.
- Bruge en MCP-server med Visual Studio Code.
- Forstå de nuværende MCP-transportmekanismer, og hvorfor stdio er anbefalet.

## stdio Transport – Sådan fungerer det

Stdio transporten er en af to understøttede transporttyper i den nuværende MCP-specifikation (2025-11-25). Sådan fungerer den:

- **Simpel kommunikation**: Serveren læser JSON-RPC beskeder fra standard input (`stdin`) og sender beskeder til standard output (`stdout`).
- **Procesbaseret**: Klienten starter MCP-serveren som en underproces.
- **Beskedformat**: Beskeder er individuelle JSON-RPC anmodninger, notifikationer eller svar, afgrænset af linjeskift.
- **Logning**: Serveren KAN skrive UTF-8 strings til standard error (`stderr`) til logningsformål.

### Vigtige krav:
- Beskeder SKAL afgrænses med linjeskift og MÅ IKKE indeholde indlejrede linjeskift
- Serveren MÅ IKKE skrive noget til `stdout`, som ikke er en gyldig MCP-besked
- Klienten MÅ IKKE skrive noget til serverens `stdin`, som ikke er en gyldig MCP-besked

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

I den foregående kode:

- Importerer vi `Server` klassen og `StdioServerTransport` fra MCP SDK'en
- Opretter vi en serverinstans med grundlæggende konfiguration og kapabiliteter
- Opretter vi en `StdioServerTransport` instans og forbinder serveren til den, hvilket muliggør kommunikation over stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Opret serverinstans
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

I den foregående kode:

- Opretter vi en serverinstans ved brug af MCP SDK'en
- Definerer værktøjer ved hjælp af dekoratører
- Bruger stdio_server kontekstmanager til at håndtere transporten

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

Den væsentlige forskel fra SSE er, at stdio-servere:

- Ikke kræver opsætning af webserver eller HTTP-endpoints
- Startes som underprocesser af klienten
- Kommunikerer via stdin/stdout streams
- Er lettere at implementere og fejlsøge

## Øvelse: Oprette en stdio Server

For at oprette vores server skal vi have to ting i mente:

- Vi skal bruge en webserver til at eksponere endpoints for forbindelse og beskeder.
## Lab: Oprette en simpel MCP stdio server

I denne lab opretter vi en simpel MCP-server ved brug af den anbefalede stdio transport. Denne server vil eksponere værktøjer, som klienter kan kalde ved hjælp af standard Model Context Protocol.

### Forudsætninger

- Python 3.8 eller nyere
- MCP Python SDK: `pip install mcp`
- Grundlæggende forståelse af asynkron programmering

Lad os starte med at oprette vores første MCP stdio server:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Konfigurer logning
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Opret serveren
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
    # Brug stdio transport
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Vigtige forskelle fra den udfasede SSE tilgang

**Stdio Transport (Nuværende standard):**
- Simpelt underproces-model – klient starter server som en child process
- Kommunikation via stdin/stdout med JSON-RPC beskeder
- Ingen HTTP-server opsætning nødvendig
- Bedre ydeevne og sikkerhed
- Nemmere fejlsøgning og udvikling

**SSE Transport (Udfaset pr. MCP 2025-06-18):**
- Krævede HTTP-server med SSE endpoints
- Mere kompleks opsætning med webserver infrastruktur
- Yderligere sikkerhedsovervejelser for HTTP endpoints
- Er nu erstattet af Streamable HTTP til webbaserede scenarier

### Oprette en server med stdio transport

For at oprette vores stdio-server skal vi:

1. **Importere nødvendige biblioteker** – Vi skal bruge MCP serverkomponenterne og stdio transporten
2. **Oprette en serverinstans** – Definere serveren med dens kapabiliteter
3. **Definere værktøjer** – Tilføje den funktionalitet, vi vil eksponere
4. **Opsætte transporten** – Konfigurere stdio-kommunikationen
5. **Køre serveren** – Starte serveren og håndtere beskeder

Lad os bygge det trin for trin:

### Trin 1: Opret en basal stdio server

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Konfigurer logning
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Opret serveren
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

### Trin 2: Tilføj flere værktøjer

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

### Trin 3: Kør serveren

Gem koden som `server.py` og kør den fra kommandolinjen:

```bash
python server.py
```

Serveren vil starte og vente på input fra stdin. Den kommunikerer via JSON-RPC beskeder over stdio transporten.

### Trin 4: Test med Inspector

Du kan teste din server med MCP Inspector:

1. Installer Inspector: `npx @modelcontextprotocol/inspector`
2. Kør Inspector og peg den mod din server
3. Test de værktøjer, du har oprettet

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Fejlsøgning af din stdio-server

### Brug af MCP Inspector

MCP Inspector er et værdifuldt værktøj til fejlsøgning og test af MCP-servere. Sådan bruger du det med din stdio-server:

1. **Installer Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Kør Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Test din server**: Inspector tilbyder en webgrænseflade, hvor du kan:
   - Se serverens kapabiliteter
   - Teste værktøjer med forskellige parametre
   - Overvåge JSON-RPC beskeder
   - Fejlsøge forbindelsesproblemer

### Brug af VS Code

Du kan også debugge din MCP-server direkte i VS Code:

1. Opret en launch-konfiguration i `.vscode/launch.json`:
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

2. Sæt breakpoint i din serverkode
3. Kør debuggeren og test med Inspector

### Almindelige fejlsøgningstips

- Brug `stderr` til logning – skriv aldrig til `stdout`, da det er reserveret til MCP-beskeder
- Sørg for, at alle JSON-RPC beskeder er linjeskift-afgrænsede
- Test først med simple værktøjer før du tilføjer kompleks funktionalitet
- Brug Inspector til at verificere beskedformater

## Bruge din stdio-server i VS Code

Når du har bygget din MCP stdio-server, kan du integrere den med VS Code for at bruge den med Claude eller andre MCP-kompatible klienter.

### Konfiguration

1. **Opret en MCP konfigurationsfil** på `%APPDATA%\Claude\claude_desktop_config.json` (Windows) eller `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Genstart Claude**: Luk og åbn Claude igen for at indlæse den nye serverkonfiguration.

3. **Test forbindelsen**: Start en samtale med Claude og prøv at bruge dine serverværktøjer:
   - "Kan du hilse på mig med hilsensværktøjet?"
   - "Beregn summen af 15 og 27"
   - "Hvad er serverinformationerne?"

### TypeScript stdio server eksempel

Her er et komplet TypeScript eksempel til reference:

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

// Tilføj værktøjer
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

### .NET stdio server eksempel

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

## Opsummering

I denne opdaterede lektion lærte du at:

- Bygge MCP-servere ved hjælp af den nuværende **stdio transport** (anbefalet tilgang)
- Forstå hvorfor SSE transport blev udfaset til fordel for stdio og Streamable HTTP
- Oprette værktøjer, der kan kaldes af MCP-klienter
- Fejlsøge din server med MCP Inspector
- Integrere din stdio-server med VS Code og Claude

Stdio transporten giver en enklere, mere sikker og mere effektiv måde at bygge MCP-servere på sammenlignet med den udfasede SSE tilgang. Det er den anbefalede transport for de fleste MCP-serverimplementeringer ifølge specifikationen fra 2025-06-18.

### .NET

1. Lad os først lave nogle værktøjer, til dette opretter vi en fil *Tools.cs* med følgende indhold:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Øvelse: Test din stdio-server

Nu hvor du har bygget din stdio-server, lad os teste, at den fungerer korrekt.

### Forudsætninger

1. Sørg for at du har MCP Inspector installeret:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Din serverkode skal være gemt (fx som `server.py`)

### Test med Inspector

1. **Start Inspector med din server**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Åben webgrænsefladen**: Inspector vil åbne et browservindue, der viser serverens kapabiliteter.

3. **Test værktøjerne**:
   - Prøv `get_greeting` værktøjet med forskellige navne
   - Test `calculate_sum` værktøjet med forskellige tal
   - Kald `get_server_info` for at se servermetadata

4. **Overvåg kommunikationen**: Inspector viser de JSON-RPC beskeder, der udveksles mellem klient og server.

### Hvad du bør se

Når din server starter korrekt, bør du se:
- Serverkapabiliteter listet i Inspector
- Tilgængelige værktøjer til test
- Vellykkede JSON-RPC beskedudvekslinger
- Værktøjsresponser vist i interface

### Almindelige problemer og løsninger

**Serveren starter ikke:**
- Tjek at alle afhængigheder er installeret: `pip install mcp`
- Verificer Python syntaks og indrykninger
- Kig efter fejllogs i konsollen

**Værktøjer vises ikke:**
- Sørg for at `@server.tool()` dekoratører er til stede
- Tjek at værktøjsfunktioner er defineret før `main()`
- Bekræft at serveren er korrekt konfigureret

**Forbindelsesproblemer:**
- Sørg for serveren bruger stdio transport korrekt
- Kontroller at ingen andre processer forstyrrer
- Verificer Inspector kommando-syntaks

## Opgave

Prøv at udbygge din server med flere kapabiliteter. Se [denne side](https://api.chucknorris.io/) for eksempelvis at tilføje et værktøj, der kalder et API. Du bestemmer, hvordan serveren skal se ud. Hav det sjovt :)
## Løsning

[Løsning](./solution/README.md) Her er en mulig løsning med fungerende kode.

## Vigtige pointer

De vigtigste pointer fra dette kapitel er:

- Stdio transport er den anbefalede mekanisme for lokale MCP-servere.
- Stdio transport tillader problemfri kommunikation mellem MCP-servere og klienter via standard input og output streams.
- Du kan bruge både Inspector og Visual Studio Code til direkte at bruge stdio-servere, hvilket gør fejlsøgning og integration enkelt.

## Eksempler

- [Java Kalkulator](../samples/java/calculator/README.md)
- [.Net Kalkulator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Kalkulator](../samples/javascript/README.md)
- [TypeScript Kalkulator](../samples/typescript/README.md)
- [Python Kalkulator](../../../../03-GettingStarted/samples/python)

## Yderligere Ressourcer

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Hvad Så Nu

## Næste Skridt

Nu hvor du har lært at bygge MCP-servere med stdio transport, kan du udforske mere avancerede emner:

- **Næste:** [HTTP Streaming med MCP (Streamable HTTP)](../06-http-streaming/README.md) – Lær om den anden understøttede transportmekanisme for fjernservere
- **Avanceret:** [MCP Sikkerheds bedste praksis](../../02-Security/README.md) – Implementer sikkerhed i dine MCP-servere
- **Produktion:** [Deploy-strategier](../09-deployment/README.md) – Deploy dine servere til produktionsbrug

## Yderligere Ressourcer

- [MCP Specifikation 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) – Officiel specifikation
- [MCP SDK Dokumentation](https://github.com/modelcontextprotocol/sdk) – SDK referencer for alle sprog
- [Community Eksempler](../../06-CommunityContributions/README.md) – Flere servereksempler fra fællesskabet

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->