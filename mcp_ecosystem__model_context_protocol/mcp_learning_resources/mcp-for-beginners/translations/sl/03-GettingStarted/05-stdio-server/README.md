# MCP strežnik s stdio transportom

> **⚠️ Pomembna posodobitev**: Od specifikacije MCP 2025-06-18 je samostojni SSE (Server-Sent Events) transport **opozorjen** in nadomeščen s transportom "Streamable HTTP". Trenutna specifikacija MCP opredeljuje dva primarna transportna mehanizma:
> 1. **stdio** - standardni vhod/izhoda (priporočeno za lokalne strežnike)
> 2. **Streamable HTTP** - za oddaljene strežnike, ki lahko interno uporabljajo SSE
>
> Ta lekcija je posodobljena in se osredotoča na **stdio transport**, ki je priporočen pristop za večino implementacij MCP strežnikov.

StdIO transport omogoča MCP strežnikom komunikacijo s strankami preko standardnih tokov vnosa in izhoda. To je najpogosteje uporabljen in priporočen transportni mehanizem v trenutni specifikaciji MCP, ki zagotavlja preprost in učinkovit način za gradnjo MCP strežnikov, ki jih je mogoče enostavno vključiti v različne odjemalske aplikacije.

## Pregled

Ta lekcija zajema, kako zgraditi in uporabljati MCP strežnike z uporabo stdio transporta.

## Cilji učenja

Na koncu te lekcije boste znali:

- Zgraditi MCP strežnik z uporabo stdio transporta.
- Odpravljati napake MCP strežnika z uporabo Inspectorja.
- Uporabljati MCP strežnik z Visual Studio Code.
- Razumeti trenutne MCP transportne mehanizme in zakaj je stdio priporočen.

## stdio transport - Kako deluje

StdIO transport je eden od dveh podprtih transportnih tipov v trenutni MCP specifikaciji (2025-11-25). Tako deluje:

- **Preprosta komunikacija**: Strežnik bere JSON-RPC sporočila s standardnega vhoda (`stdin`) in pošilja sporočila na standardni izhod (`stdout`).
- **Procesno osnovan**: Odjemalec zažene MCP strežnik kot podproces.
- **Oblika sporočil**: Sporočila so posamezni JSON-RPC zahtevki, obvestila ali odgovori, ločeni z novimi vrsticami.
- **Dnevnik**: Strežnik LAHKO piše UTF-8 nize na standardni napaki (`stderr`) za namene beleženja.

### Ključne zahteve:
- Sporočila MORAJO biti ločena z novimi vrsticami in NE SMETE vsebovati vdelanih novih vrstic
- Strežnik NE SME pisati ničesar na `stdout`, kar ni veljavno MCP sporočilo
- Odjemalec NE SME pisati ničesar na `stdin` strežnika, kar ni veljavno MCP sporočilo

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

V prejšnji kodi:

- Uvažamo razred `Server` in `StdioServerTransport` iz MCP SDK-ja
- Ustvarimo instanco strežnika z osnovno konfiguracijo in zmožnostmi
- Ustvarimo instanco `StdioServerTransport` in povežemo strežnik z njim, kar omogoča komunikacijo preko stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Ustvari primerek strežnika
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

V prejšnji kodi smo:

- Ustvarili instanco strežnika z uporabo MCP SDK
- Definirali orodja z dekoratorji
- Uporabili kontekstni upravljalec stdio_server za obravnavo transporta

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

Ključna razlika od SSE je, da stdio strežniki:

- Ne zahtevajo nastavitev spletnega strežnika ali HTTP končnih točk
- So zagnani kot podprocesi odjemalca
- Komunicirajo preko stdin/stdout tokov
- So enostavnejši za implementacijo in odpravljanje napak

## Vaja: Ustvarjanje stdio strežnika

Za ustvarjanje strežnika moramo imeti v mislih dve stvari:

- Potrebujemo spletni strežnik, ki bo razkrival končne točke za povezavo in sporočila.

## Laboratorij: Ustvarjanje preprostega MCP stdio strežnika

V tem laboratoriju bomo ustvarili preprost MCP strežnik z uporabo priporočenega stdio transporta. Ta strežnik bo razkrival orodja, ki jih lahko kličejo klienti z uporabo standardnega Model Context Protocol.

### Predpogoji

- Python 3.8 ali novejši
- MCP Python SDK: `pip install mcp`
- Osnovno razumevanje asinhronega programiranja

Začnimo z ustvarjanjem našega prvega MCP stdio strežnika:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Konfiguriraj beleženje
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ustvari strežnik
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
    # Uporabi stdio prevoz
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Ključne razlike od opozorjenega SSE pristopa

**Stdio transport (trenutni standard):**
- Preprost model podprocesa - odjemalec zažene strežnik kot otroški proces
- Komunikacija preko stdin/stdout z uporabo JSON-RPC sporočil
- Ni potrebe po nastavitvi HTTP strežnika
- Boljša zmogljivost in varnost
- Lažje odpravljanje napak in razvoj

**SSE transport (opozorjen od MCP 2025-06-18):**
- Zahteva HTTP strežnik z SSE končnimi točkami
- Bolj zapletena nastavitev s spletno strežniško infrastrukturo
- Dodatne varnostne zahteve za HTTP končne točke
- Nadomeščen z Streamable HTTP za spletne scenarije

### Ustvarjanje strežnika z stdio transportom

Za ustvarjanje našega stdio strežnika moramo:

1. **Uvoziti potrebne knjižnice** - Potrebujemo MCP strežniške komponente in stdio transport
2. **Ustvariti instanco strežnika** - Definirati strežnik z njegovimi zmožnostmi
3. **Definirati orodja** - Dodati funkcionalnosti, ki jih želimo razkriti
4. **Nastaviti transport** - Konfigurirati stdio komunikacijo
5. **Zagnati strežnik** - Zagnati strežnik in obravnavati sporočila

Zgradimo ga korak za korakom:

### Korak 1: Ustvarite osnovni stdio strežnik

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Konfigurirajte beleženje
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ustvarite strežnik
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

### Korak 2: Dodajte več orodij

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

### Korak 3: Zagon strežnika

Kodo shranite kot `server.py` in jo zaženite iz ukazne vrstice:

```bash
python server.py
```

Strežnik se bo zagnal in čakal na vhod iz stdin. Komunicira s sporočili JSON-RPC preko stdio transporta.

### Korak 4: Testiranje z Inspectorjem

Strežnik lahko testirate z MCP Inspectorjem:

1. Namestite Inspector: `npx @modelcontextprotocol/inspector`
2. Zaženite Inspector in ga usmerite na vaš strežnik
3. Preizkusite ustvarjena orodja

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Odpravljanje napak vašega stdio strežnika

### Uporaba MCP Inspectorja

MCP Inspector je dragoceno orodje za odpravljanje napak in testiranje MCP strežnikov. Tako ga uporabite s svojim stdio strežnikom:

1. **Namestite Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Zaženite Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Preizkusite strežnik**: Inspector zagotavlja spletni vmesnik, kjer lahko:
   - Pregledate zmožnosti strežnika
   - Testirate orodja z različnimi parametri
   - Spremljate JSON-RPC sporočila
   - Odpravljate težave s povezavo

### Uporaba VS Code

Vaš MCP strežnik lahko tudi odpravljate neposredno v VS Code:

1. Ustvarite konfiguracijo zagona v `.vscode/launch.json`:
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

2. Nastavite točke prekinitve v svoji kodi strežnika
3. Zaženite razhroščevalnik in testirajte z Inspectorjem

### Pogosti nasveti za odpravljanje napak

- Uporabljajte `stderr` za beleženje - nikoli ne pišite na `stdout`, saj je rezerviran za MCP sporočila
- Poskrbite, da so vsa JSON-RPC sporočila ločena z novimi vrsticami
- Najprej testirajte z enostavnimi orodji, preden dodate kompleksno funkcionalnost
- Uporabljajte Inspector za preverjanje oblik sporočil

## Uporaba vašega stdio strežnika v VS Code

Ko ustvarite svoj MCP stdio strežnik, ga lahko integrirate z VS Code, da ga uporabljate s Claude ali drugimi MCP-kompatibilnimi odjemalci.

### Konfiguracija

1. **Ustvarite MCP konfiguracijsko datoteko** na `%APPDATA%\Claude\claude_desktop_config.json` (Windows) ali `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Znova zaženite Claude**: Zaprite in ponovno odprite Claude, da naložite novo konfiguracijo strežnika.

3. **Preizkusite povezavo**: Začnite pogovor s Claude in poskusite orodja vašega strežnika:
   - "Lahko pozdraviš z orodjem pozdrav?"
   - "Izračunaj vsoto 15 in 27"
   - "Kakšne so informacije o strežniku?"

### Primer TypeScript stdio strežnika

Tukaj je popoln primer v TypeScriptu za referenco:

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

// Dodaj orodja
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

### Primer .NET stdio strežnika

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

## Povzetek

V tej posodobljeni lekciji ste se naučili:

- Graditi MCP strežnike z uporabo trenutnega **stdio transporta** (priporočen pristop)
- Zakaj je bil SSE transport opozorjen v korist stdio in Streamable HTTP
- Ustvariti orodja, ki jih lahko kličejo MCP klienti
- Odpravljati težave vašega strežnika z MCP Inspectorjem
- Integrirati vaš stdio strežnik z VS Code in Claude

StdIO transport nudi enostavnejši, varnejši in zmogljivejši način gradnje MCP strežnikov v primerjavi z opozorjenim SSE pristopom. Je priporočen transport za večino MCP strežniških implementacij od specifikacije 2025-06-18.

### .NET

1. Najprej ustvarimo nekaj orodij, za to bomo ustvarili datoteko *Tools.cs* z naslednjo vsebino:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Vaja: Testiranje vašega stdio strežnika

Zdaj, ko ste zgradili svoj stdio strežnik, ga testirajmo, da se prepričamo, da pravilno deluje.

### Predpogoji

1. Poskrbite, da imate nameščen MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Vaša koda strežnika naj bo shranjena (npr. kot `server.py`)

### Testiranje z Inspectorjem

1. **Zaženite Inspector s svojim strežnikom**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Odprite spletni vmesnik**: Inspector bo odprl brskalnik s prikazom zmožnosti vašega strežnika.

3. **Testirajte orodja**: 
   - Preizkusite orodje `get_greeting` z različnimi imeni
   - Testirajte orodje `calculate_sum` z različnimi številkami
   - Pokličite orodje `get_server_info` za ogled metapodatkov strežnika

4. **Spremljajte komunikacijo**: Inspector prikazuje JSON-RPC sporočila, ki se izmenjujejo med odjemalcem in strežnikom.

### Kaj bi morali videti

Ko se vaš strežnik pravilno zažene, bi morali videti:
- Zmožnosti strežnika navedene v Inspectorju
- Orodja na razpolago za testiranje
- Uspešne izmenjave JSON-RPC sporočil
- Odzive orodij prikazane v vmesniku

### Pogoste težave in rešitve

**Strežnik se ne zažene:**
- Preverite, da so vse odvisnosti nameščene: `pip install mcp`
- Preverite sintakso in zamike v Pythonu
- Preverite sporočila o napakah v konzoli

**Orodja se ne pojavijo:**
- Preverite, da so prisotni dekoratorji `@server.tool()`
- Preverite, da so orodja definirana pred `main()`
- Preverite, ali je strežnik pravilno konfiguriran

**Težave s povezavo:**
- Prepričajte se, da strežnik uporablja stdio transport pravilno
- Preverite, da nobeni drugi procesi ne motijo
- Preverite sintakso ukaza za Inspector

## Naloga

Poskusite strežnik nadgraditi z več zmožnostmi. Oglejte si [to stran](https://api.chucknorris.io/) in na primer dodajte orodje, ki kliče API. Odločite se, kako naj strežnik izgleda. Zabavajte se :)

## Rešitev

[Rešitev](./solution/README.md) Tukaj je možna rešitev z delujočo kodo.

## Ključne ugotovitve

Ključne ugotovitve iz tega poglavja so:

- stdio transport je priporočen mehanizem za lokalne MCP strežnike.
- stdio transport omogoča nemoteno komunikacijo med MCP strežniki in klienti preko standardnih vhodnih in izhodnih tokov.
- Za uporabo stdio strežnikov lahko uporabite tako Inspector kot Visual Studio Code, kar omogoča enostavno odpravljanje napak in integracijo.

## Vzorci

- [Java Kalkulator](../samples/java/calculator/README.md)
- [.Net Kalkulator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Kalkulator](../samples/javascript/README.md)
- [TypeScript Kalkulator](../samples/typescript/README.md)
- [Python Kalkulator](../../../../03-GettingStarted/samples/python) 

## Dodatni viri

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Kaj sledi

## Naslednji koraki

Zdaj, ko ste se naučili graditi MCP strežnike s stdio transportom, lahko raziščete naprednejše teme:

- **Naslednje**: [HTTP Streaming z MCP (Streamable HTTP)](../06-http-streaming/README.md) - Spoznajte drugi podprti transportni mehanizem za oddaljene strežnike
- **Napredno**: [MCP varnostne prakse](../../02-Security/README.md) - Implementacija varnosti v MCP strežnikih
- **Proizvodnja**: [Strategije razmestitve](../09-deployment/README.md) - Razmestitev strežnikov za produkcijsko rabo

## Dodatni viri

- [MCP specifikacija 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Uradna specifikacija
- [MCP SDK dokumentacija](https://github.com/modelcontextprotocol/sdk) - SDK reference za vse jezike
- [Primeri skupnosti](../../06-CommunityContributions/README.md) - Več primerov strežnikov iz skupnosti

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->