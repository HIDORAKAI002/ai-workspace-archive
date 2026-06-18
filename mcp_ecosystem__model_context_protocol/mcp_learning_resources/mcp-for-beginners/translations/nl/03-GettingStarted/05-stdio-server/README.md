# MCP-server met stdio-transport

> **⚠️ Belangrijke update**: Vanaf MCP-specificatie 2025-06-18 is de standalone SSE (Server-Sent Events) transport **verouderd** en vervangen door "Streamable HTTP" transport. De huidige MCP-specificatie definieert twee primaire transportmechanismen:
> 1. **stdio** - Standaard in-/uitvoer (aanbevolen voor lokale servers)
> 2. **Streamable HTTP** - Voor externe servers die SSE intern kunnen gebruiken
>
> Deze les is bijgewerkt om te focussen op de **stdio transport**, wat de aanbevolen aanpak is voor de meeste MCP-serverimplementaties.

De stdio transport stelt MCP-servers in staat om te communiceren met clients via standaard invoer- en uitvoerstromen. Dit is het meest gebruikte en aanbevolen transportmechanisme in de huidige MCP-specificatie en biedt een eenvoudige en efficiënte manier om MCP-servers te bouwen die gemakkelijk kunnen worden geïntegreerd met diverse clientapplicaties.

## Overzicht

In deze les leer je hoe je MCP-servers bouwt en gebruikt met de stdio transport.

## Leerdoelen

Aan het einde van deze les kun je:

- Een MCP-server bouwen met de stdio transport.
- Een MCP-server debuggen met de Inspector.
- Een MCP-server gebruiken in Visual Studio Code.
- De huidige MCP-transportmechanismen begrijpen en waarom stdio aanbevolen wordt.

## stdio Transport - Hoe het werkt

De stdio transport is een van de twee ondersteunde transporttypen in de huidige MCP-specificatie (2025-11-25). Zo werkt het:

- **Eenvoudige communicatie**: De server leest JSON-RPC-berichten van standaardinvoer (`stdin`) en verzendt berichten naar standaarduitvoer (`stdout`).
- **Procesgebaseerd**: De client start de MCP-server als een subprocess.
- **Berichtformaat**: Berichten zijn individuele JSON-RPC-aanvragen, notificaties of reacties, gescheiden door nieuwe regels.
- **Logging**: De server MAG UTF-8-strings naar standaardfout (`stderr`) schrijven voor loggingdoeleinden.

### Belangrijke vereisten:
- Berichten MOETEN gescheiden zijn door nieuwe regels en MOETEN geen ingesloten nieuwe regels bevatten
- De server MAG NIETS naar `stdout` schrijven dat geen geldig MCP-bericht is
- De client MAG NIETS naar de `stdin` van de server schrijven dat geen geldig MCP-bericht is

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

In bovenstaande code:

- Importeren we de `Server` klasse en `StdioServerTransport` uit de MCP SDK
- Maken we een serverinstance met basisconfiguratie en mogelijkheden
- Maken we een `StdioServerTransport` instance en verbinden de server daarmee, wat communicatie via stdin/stdout mogelijk maakt

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Maak serverinstantie aan
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

In bovenstaande code:

- Maken we een serverinstance met de MCP SDK
- Definiëren we tools met decorators
- Gebruiken we de stdio_server context manager om het transport te verwerken

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

Het belangrijkste verschil met SSE is dat stdio-servers:

- Geen webserverconfiguratie of HTTP-eindpunten nodig hebben
- Worden gestart als subprocesses door de client
- Communiceren via stdin/stdout-streams
- Eenvoudiger te implementeren en debuggen zijn

## Oefening: Een stdio-server maken

Om onze server te maken, moeten we twee dingen in gedachten houden:

- We hebben een webserver nodig om eindpunten voor verbinding en berichten beschikbaar te stellen.
## Lab: Een eenvoudige MCP stdio-server maken

In dit lab maken we een eenvoudige MCP-server met de aanbevolen stdio transport. Deze server stelt tools beschikbaar die clients kunnen aanroepen via het standaard Model Context Protocol.

### Vereisten

- Python 3.8 of hoger
- MCP Python SDK: `pip install mcp`
- Basiskennis van asynchrone programmering

Laten we beginnen met het maken van onze eerste MCP stdio-server:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Configureer logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Maak de server aan
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
    # Gebruik stdio transport
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Belangrijkste verschillen met de verouderde SSE-aanpak

**Stdio Transport (Huidige standaard):**
- Eenvoudig subprocessmodel - client start de server als kindproces
- Communicatie via stdin/stdout met JSON-RPC-berichten
- Geen HTTP-server setup nodig
- Betere performance en veiligheid
- Makkelijker debuggen en ontwikkelen

**SSE Transport (Verouderd sinds MCP 2025-06-18):**
- Vereiste HTTP-server met SSE-eindpunten
- Complexere setup met webserverinfrastructuur
- Extra beveiligingsoverwegingen voor HTTP-eindpunten
- Nu vervangen door Streamable HTTP voor scenario’s op het web

### Een server maken met stdio transport

Om onze stdio-server te maken, moeten we:

1. **De benodigde bibliotheken importeren** - We hebben MCP-servercomponenten en stdio transport nodig
2. **Een serverinstance maken** - Definieer de server met zijn mogelijkheden
3. **Tools definiëren** - Voeg functionaliteit toe die geëxposeerd wordt
4. **Transport instellen** - Configureer stdio-communicatie
5. **De server draaien** - Start de server en verwerk berichten

Laten we dit stap voor stap bouwen:

### Stap 1: Maak een basis stdio-server

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Logging configureren
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# De server aanmaken
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

### Stap 2: Voeg meer tools toe

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

### Stap 3: Server draaien

Sla de code op als `server.py` en voer deze uit vanaf de opdrachtregel:

```bash
python server.py
```

De server start en wacht op input van stdin. Hij communiceert via JSON-RPC-berichten over het stdio-transport.

### Stap 4: Testen met de Inspector

Je kunt je server testen met de MCP Inspector:

1. Installeer de Inspector: `npx @modelcontextprotocol/inspector`
2. Start de Inspector en richt deze op je server
3. Test de tools die je hebt gemaakt

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Je stdio-server debuggen

### Gebruik van de MCP Inspector

De MCP Inspector is een waardevol hulpmiddel voor het debuggen en testen van MCP-servers. Zo gebruik je hem met je stdio-server:

1. **Installeer de Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Start de Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Test je server**: De Inspector biedt een webinterface waarin je kunt:
   - Servermogelijkheden bekijken
   - Tools testen met verschillende parameters
   - JSON-RPC-berichten monitoren
   - Verbindingproblemen debuggen

### Gebruik van VS Code

Je kunt je MCP-server ook direct in VS Code debuggen:

1. Maak een launch-configuratie aan in `.vscode/launch.json`:
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

2. Zet breakpoints in je servercode
3. Start de debugger en test met de Inspector

### Veelvoorkomende debuginstructies

- Gebruik `stderr` voor logging - schrijf nooit naar `stdout` want dat is gereserveerd voor MCP-berichten
- Zorg dat alle JSON-RPC-berichten door een newline gescheiden zijn
- Test eerst met eenvoudige tools voordat je complexe functionaliteit toevoegt
- Gebruik de Inspector om berichtformaten te verifiëren

## Je stdio-server gebruiken in VS Code

Zodra je je MCP stdio-server hebt gebouwd, kun je deze integreren met VS Code om hem te gebruiken met Claude of andere MCP-compatibele clients.

### Configuratie

1. **Maak een MCP-configuratiebestand aan op** `%APPDATA%\Claude\claude_desktop_config.json` (Windows) of `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Herstart Claude**: Sluit Claude af en open het opnieuw om de nieuwe serverconfiguratie te laden.

3. **Test de verbinding**: Begin een gesprek met Claude en probeer de tools van je server te gebruiken:
   - "Kun je me begroeten met de begroetingstool?"
   - "Bereken de som van 15 en 27"
   - "Wat is de serverinformatie?"

### TypeScript stdio-server voorbeeld

Hier is een compleet TypeScript-voorbeeld ter referentie:

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

// Voeg gereedschappen toe
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

### .NET stdio-server voorbeeld

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

## Samenvatting

In deze bijgewerkte les heb je geleerd hoe je:

- MCP-servers bouwt met de huidige **stdio transport** (aanbevolen aanpak)
- Begrijpt waarom SSE transport verouderd is ten gunste van stdio en Streamable HTTP
- Tools maakt die door MCP-clients kunnen worden aangeroepen
- Je server debugt met de MCP Inspector
- Je stdio-server integreert met VS Code en Claude

De stdio transport biedt een eenvoudigere, veiligere en beter presterende manier om MCP-servers te bouwen vergeleken met de verouderde SSE-aanpak. Het is het aanbevolen transport voor de meeste MCP-serverimplementaties volgens de specificatie van 2025-06-18.


### .NET

1. Laten we eerst wat tools maken; hiervoor maken we een bestand *Tools.cs* aan met de volgende inhoud:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Oefening: Je stdio-server testen

Nu je je stdio-server hebt gebouwd, gaan we hem testen om te controleren of hij juist werkt.

### Vereisten

1. Zorg dat je de MCP Inspector hebt geïnstalleerd:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Je servercode moet opgeslagen zijn (bijv. als `server.py`)

### Testen met de Inspector

1. **Start de Inspector met je server**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Open de webinterface**: De Inspector opent een browservenster met de mogelijkheden van je server.

3. **Test de tools**: 
   - Probeer de `get_greeting` tool met verschillende namen
   - Test de `calculate_sum` tool met diverse getallen
   - Roep de `get_server_info` tool aan om servermetadata te zien

4. **Monitor de communicatie**: De Inspector toont de JSON-RPC-berichten die tussen client en server worden uitgewisseld.

### Wat je zou moeten zien

Als je server goed start, zou je moeten zien:
- Servermogelijkheden in de Inspector vermeld
- Tools beschikbaar voor testen
- Succesvolle JSON-RPC-berichtuitwisselingen
- Toolantwoorden getoond in de interface

### Veelvoorkomende problemen en oplossingen

**Server start niet:**
- Controleer of alle dependencies geïnstalleerd zijn: `pip install mcp`
- Controleer Python-syntaxis en indentatie
- Kijk voor foutmeldingen in de console

**Tools verschijnen niet:**
- Zorg dat `@server.tool()` decorators aanwezig zijn
- Controleer of toolfuncties gedefinieerd zijn vóór `main()`
- Verifieer of de server correct geconfigureerd is

**Verbindingsproblemen:**
- Zorg dat de server stdio transport juist gebruikt
- Controleer of geen andere processen storen
- Verifieer de syntax van de Inspector-opdracht

## Opdracht

Probeer je server uit te breiden met meer mogelijkheden. Zie [deze pagina](https://api.chucknorris.io/) om bijvoorbeeld een tool toe te voegen die een API aanroept. Jij bepaalt hoe de server eruit moet zien. Veel plezier :)
## Oplossing

[Oplossing](./solution/README.md) Hier is een mogelijke oplossing met werkende code.

## Belangrijke punten

De belangrijkste leerpunten van dit hoofdstuk zijn:

- De stdio transport is het aanbevolen mechanisme voor lokale MCP-servers.
- Stdio transport maakt naadloze communicatie mogelijk tussen MCP-servers en clients via standaard in- en uitvoerstromen.
- Je kunt zowel Inspector als Visual Studio Code gebruiken om stdio-servers direct te gebruiken, wat debuggen en integratie eenvoudig maakt.

## Voorbeelden 

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python) 

## Extra bronnen

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Wat is de volgende stap

## Volgende stappen

Nu je hebt geleerd hoe je MCP-servers bouwt met de stdio transport, kun je meer geavanceerde onderwerpen verkennen:

- **Volgende**: [HTTP Streaming met MCP (Streamable HTTP)](../06-http-streaming/README.md) - Leer over het andere ondersteunde transportmechanisme voor externe servers
- **Geavanceerd**: [MCP Security Best Practices](../../02-Security/README.md) - Implementeer beveiliging in je MCP-servers
- **Productie**: [Deployment Strategies](../09-deployment/README.md) - Zet je servers in productie

## Extra bronnen

- [MCP-specificatie 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Officiële specificatie
- [MCP SDK documentatie](https://github.com/modelcontextprotocol/sdk) - SDK-referenties voor alle talen
- [Community Voorbeelden](../../06-CommunityContributions/README.md) - Meer servervoorbeelden uit de community

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->