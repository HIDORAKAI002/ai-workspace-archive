# MCP server so stdio transportom

> **⚠️ Dôležitá aktualizácia**: Od špecifikácie MCP 2025-06-18 je samostatný SSE (Server-Sent Events) transport **mimo platnosti** a bol nahradený transportom "Streamable HTTP". Aktuálna špecifikácia MCP definuje dva hlavné transportné mechanizmy:
> 1. **stdio** - štandardný vstup/výstup (odporúčaný pre lokálne servery)
> 2. **Streamable HTTP** - pre vzdialené servery, ktoré môžu využívať SSE interne
>
> Táto lekcia bola aktualizovaná, aby sa zamerala na **stdio transport**, ktorý je odporúčaným prístupom pre väčšinu implementácií MCP serverov.

Transport stdio umožňuje MCP serverom komunikovať s klientmi prostredníctvom štandardných vstupných a výstupných prúdov. Je to najčastejšie používaný a odporúčaný transportný mechanizmus v aktuálnej špecifikácii MCP, poskytujúci jednoduchý a efektívny spôsob, ako vytvárať MCP servery, ktoré sa dajú ľahko integrovať s rôznymi klientskymi aplikáciami.

## Prehľad

Táto lekcia pokrýva, ako vytvoriť a používať MCP servery pomocou stdio transportu.

## Ciele učenia

Na konci tejto lekcie budete schopní:

- Vytvoriť MCP server pomocou stdio transportu.
- Ladenie MCP servera pomocou nástroja Inspector.
- Používať MCP server vo Visual Studio Code.
- Pochopiť aktuálne transportné mechanizmy MCP a dôvody odporúčania stdio.

## stdio transport - ako funguje

Transport stdio je jedným z dvoch podporovaných typov transportu v aktuálnej špecifikácii MCP (2025-11-25). Funguje nasledovne:

- **Jednoduchá komunikácia**: server číta JSON-RPC správy zo štandardného vstupu (`stdin`) a posiela správy na štandardný výstup (`stdout`).
- **Procesovo založený**: klient spúšťa MCP server ako podproces.
- **Formát správ**: správy sú samostatné JSON-RPC požiadavky, oznámenia alebo odpovede, oddelené novými riadkami.
- **Logovanie**: server MÔŽE zapisovať UTF-8 reťazce na štandardný chybový výstup (`stderr`) na účely logovania.

### Kľúčové požiadavky:
- Správy MUSIA byť oddelené novými riadkami a NESMÚ obsahovať vložené nové riadky
- Server NESMIE zapisovať na `stdout` nič, čo nie je platná MCP správa
- Klient NESMIE zapisovať na serverov `stdin` nič, čo nie je platná MCP správa

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

V predchádzajúcom kóde:

- Importujeme triedu `Server` a `StdioServerTransport` z MCP SDK
- Vytvoríme inštanciu servera s základnou konfiguráciou a schopnosťami
- Vytvoríme inštanciu `StdioServerTransport` a prepojíme server s ňou, čím umožníme komunikáciu cez stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Vytvorte inštanciu servera
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

V predchádzajúcom kóde sme:

- Vytvorili inštanciu servera pomocou MCP SDK
- Definovali nástroje pomocou dekorátorov
- Použili kontextový manažér stdio_server pre transport

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

Hlavný rozdiel oproti SSE je, že stdio servery:

- Nepotrebujú nastavenie web servera ani HTTP endpointy
- Sú spúšťané ako podprocesy klientom
- Komunikujú cez stdin/stdout prúdy
- Sú jednoduchšie na implementáciu a ladenie

## Cvičenie: Vytvorenie stdio servera

Na vytvorenie nášho servera si treba uvedomiť dve veci:

- Na vystavenie endpointov pre pripojenie a správy potrebujeme web server.
## Lab: Vytvorenie jednoduchého MCP stdio servera

V tomto lab-e vytvoríme jednoduchý MCP server využívajúci odporúčaný stdio transport. Tento server vystaví nástroje, ktoré môžu klienti volať pomocou štandardného Model Context Protocol.

### Predpoklady

- Python 3.8 alebo novší
- MCP Python SDK: `pip install mcp`
- Základné znalosti asynchrónneho programovania

Začnime vytvorením nášho prvého MCP stdio servera:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Nakonfiguruj protokolovanie
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Vytvor server
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
    # Použi stdio transport
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Kľúčové rozdiely oproti zastaralému SSE prístupu

**Stdio transport (aktuálny štandard):**
- Jednoduchý model podprocesu - klient spúšťa server ako podradený proces
- Komunikácia cez stdin/stdout pomocou JSON-RPC správ
- Nie je potrebné nastavovať HTTP server
- Lepší výkon a bezpečnosť
- Jednoduchšie ladenie a vývoj

**SSE transport (zastaraný od MCP 2025-06-18):**
- Vyžadoval HTTP server s SSE endpointmi
- Zložitejšie nastavenie s infraštruktúrou web servera
- Dodatočné bezpečnostné aspekty pre HTTP endpointy
- Teraz nahradený Streamable HTTP pre webové scenáre

### Vytvorenie servera so stdio transportom

Pre vytvorenie nášho stdio servera potrebujeme:

1. **Importovať potrebné knižnice** - MCP server komponenty a stdio transport
2. **Vytvoriť inštanciu servera** - definovať server s jeho schopnosťami
3. **Definovať nástroje** - pridať funkcie, ktoré chceme sprístupniť
4. **Nastaviť transport** - nakonfigurovať stdio komunikáciu
5. **Spustiť server** - štartovať server a spracovávať správy

Postupujme krok za krokom:

### Krok 1: Vytvorenie základného stdio servera

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Konfigurácia logovania
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Vytvorte server
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

### Krok 2: Pridanie ďalších nástrojov

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

### Krok 3: Spustenie servera

Uložte kód ako `server.py` a spustite ho z príkazovej riadky:

```bash
python server.py
```

Server sa spustí a bude čakať na vstup zo stdin. Komunikuje pomocou JSON-RPC správ cez stdio transport.

### Krok 4: Testovanie pomocou Inspector

Server môžete testovať pomocou MCP Inspector:

1. Nainštalujte Inspector: `npx @modelcontextprotocol/inspector`
2. Spustite Inspector a nasmerujte ho na váš server
3. Testujte nástroje, ktoré ste vytvorili

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Ladenie vášho stdio servera

### Použitie MCP Inspectora

MCP Inspector je užitočný nástroj na ladenie a testovanie MCP serverov. Takto ho môžete použiť so svojím stdio serverom:

1. **Inštalácia Inspectora**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Spustenie Inspectora**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testovanie servera**: Inspector poskytuje webové rozhranie, kde môžete:
   - Zobraziť schopnosti servera
   - Testovať nástroje s rôznymi parametrami
   - Monitorovať JSON-RPC správy
   - Ladenie problémov s pripojením

### Použitie VS Code

Váš MCP server môžete ladiť aj priamo vo VS Code:

1. Vytvorte launch konfiguráciu v `.vscode/launch.json`:
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

2. Nastavte breakpointy v kóde servera
3. Spustite debugger a testujte s Inspector

### Bežné tipy na ladenie

- Používajte `stderr` na logovanie - nikdy nepíšte do `stdout`, ktorý je vyhradený na MCP správy
- Uistite sa, že všetky JSON-RPC správy sú oddelené novými riadkami
- Najskôr testujte jednoduché nástroje pred pridaním zložitej funkcionality
- Použite Inspector na overenie formátu správ

## Používanie vášho stdio servera vo VS Code

Keď máte postavený MCP stdio server, môžete ho integrovať do VS Code na použitie s Claude alebo inými klientmi kompatibilnými s MCP.

### Konfigurácia

1. **Vytvorte MCP konfiguračný súbor** v `%APPDATA%\Claude\claude_desktop_config.json` (Windows) alebo `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Reštartujte Claude**: zatvorte a znova otvorte Claude, aby načítal novú konfiguráciu servera.

3. **Otestujte pripojenie**: začnite konverzáciu s Claudom a vyskúšajte nástroje vášho servera:
   - "Môžeš ma pozdraviť pomocou nástroja greeting?"
   - "Vypočítaj súčet 15 a 27"
   - "Aké je info o serveri?"

### Príklad TypeScript stdio servera

Tu je kompletný príklad v TypeScript pre referenciu:

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

// Pridajte nástroje
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

### Príklad .NET stdio servera

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

## Zhrnutie

V tejto aktualizovanej lekcii ste sa naučili:

- Vytvoriť MCP servery pomocou súčasného **stdio transportu** (odporúčaný prístup)
- Pochopiť, prečo bol SSE transport nahradený stdio a Streamable HTTP
- Vytvárať nástroje, ktoré môžu byť volané MCP klientmi
- Ladiť server pomocou MCP Inspectora
- Integrovať váš stdio server s VS Code a Claude

Transport stdio poskytuje jednoduchší, bezpečnejší a výkonnejší spôsob vytvárania MCP serverov v porovnaní so zastaraným SSE prístupom. Je to odporúčaný transport pre väčšinu implementácií MCP serverov podľa špecifikácie z 2025-06-18.


### .NET

1. Najprv si vytvoríme nástroje, na to vytvoríme súbor *Tools.cs* s nasledovným obsahom:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Cvičenie: Testovanie vášho stdio servera

Keďže ste už vytvorili stdio server, otestujme ho, aby sme sa uistili, že funguje správne.

### Predpoklady

1. Uistite sa, že máte nainštalovaný MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Váš serverový kód by mal byť uložený (napr. ako `server.py`)

### Testovanie pomocou Inspectora

1. **Spustite Inspectora s vaším serverom**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Otvorte webové rozhranie**: Inspector otvorí prehliadač, kde uvidíte schopnosti vášho servera.

3. **Testujte nástroje**: 
   - Vyskúšajte nástroj `get_greeting` s rôznymi menami
   - Testujte nástroj `calculate_sum` s rôznymi číslami
   - Zavolajte nástroj `get_server_info`, aby ste videli metaúdaje servera

4. **Monitorujte komunikáciu**: Inspector zobrazuje JSON-RPC správy medzi klientom a serverom.

### Čo by ste mali vidieť

Keď sa váš server správne spustí, mali by ste vidieť:
- Zobrazené schopnosti servera v Inspectore
- Dostupné nástroje na testovanie
- Úspešné výmeny JSON-RPC správ
- Odpovede nástrojov zobrazené v rozhraní

### Bežné problémy a riešenia

**Server sa nespustí:**
- Skontrolujte, či sú všetky závislosti nainštalované: `pip install mcp`
- Overte syntax a odsadenie v Pythone
- Skontrolujte chybové hlásenia v konzole

**Nástroje sa neobjavujú:**
- Uistite sa, že sú použité dekorátory `@server.tool()`
- Skontrolujte, či funkcie nástrojov sú definované pred `main()`
- Overte správnu konfiguráciu servera

**Problémy s pripojením:**
- Skontrolujte, či server používa stdio transport správne
- Uistite sa, že žiadne iné procesy nezasahujú do pripojenia
- Overte syntax príkazu v Inspectore

## Úloha

Skúste rozšíriť server o ďalšie schopnosti. Pozrite si [túto stránku](https://api.chucknorris.io/), aby ste napríklad pridali nástroj, ktorý volá API. Vy sami rozhodnete, ako bude server vyzerať. Prajeme veľa zábavy :)
## Riešenie

[Riešenie](./solution/README.md) Tu je možné riešenie s funkčným kódom.

## Kľúčové poznatky

Kľúčové poznatky z tejto kapitoly sú:

- stdio transport je odporúčaný mechanizmus pre lokálne MCP servery.
- stdio transport umožňuje plynulú komunikáciu medzi MCP servermi a klientmi pomocou štandardných vstupných a výstupných prúdov.
- Môžete použiť Inspector aj Visual Studio Code na priamu prácu so stdio servermi, čo uľahčuje ladenie a integráciu.

## Ukážky 

- [Java kalkulačka](../samples/java/calculator/README.md)
- [.Net kalkulačka](../../../../03-GettingStarted/samples/csharp)
- [JavaScript kalkulačka](../samples/javascript/README.md)
- [TypeScript kalkulačka](../samples/typescript/README.md)
- [Python kalkulačka](../../../../03-GettingStarted/samples/python) 

## Dodatočné zdroje

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Čo ďalej

## Ďalšie kroky

Keď ste sa naučili, ako vytvárať MCP servery so stdio transportom, môžete preskúmať pokročilejšie témy:

- **Ďalej**: [HTTP Streaming s MCP (Streamable HTTP)](../06-http-streaming/README.md) - Naučte sa o druhom podporovanom transportnom mechanizme pre vzdialené servery
- **Pokročilé**: [Najlepšie bezpečnostné praktiky MCP](../../02-Security/README.md) - Implementujte zabezpečenie vo vašich MCP serveroch
- **Produkcia**: [Stratégie nasadenia](../09-deployment/README.md) - Nasadzujte servery do produkčného prostredia

## Dodatočné zdroje

- [Špecifikácia MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Oficiálna špecifikácia
- [Dokumentácia MCP SDK](https://github.com/modelcontextprotocol/sdk) - Referencie SDK pre všetky jazyky
- [Príklady komunity](../../06-CommunityContributions/README.md) - Viac príkladov serverov od komunity

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->