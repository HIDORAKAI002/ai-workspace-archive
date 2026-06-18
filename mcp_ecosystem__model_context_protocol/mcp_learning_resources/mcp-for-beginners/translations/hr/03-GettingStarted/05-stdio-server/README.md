# MCP Server sa stdio transportom

> **⚠️ Važna obavijest**: Od MCP specifikacije 2025-06-18, samostalni SSE (Server-Sent Events) transport je **zastarjel** i zamijenjen "Streamable HTTP" transportom. Trenutna MCP specifikacija definira dva primarna transportna mehanizma:
> 1. **stdio** - Standardni ulaz/izlaz (preporučeno za lokalne servere)
> 2. **Streamable HTTP** - Za udaljene servere koji mogu unutarnje koristiti SSE
>
> Ova lekcija je ažurirana da se fokusira na **stdio transport**, koji je preporučeni pristup za većinu MCP implementacija servera.

stdio transport omogućava MCP serverima komunikaciju s klijentima putem standardnih ulaznih i izlaznih tokova. Ovo je najčešće korišteni i preporučeni transportni mehanizam u trenutnoj MCP specifikaciji, pružajući jednostavan i učinkovit način za izgradnju MCP servera koji se lako integriraju s raznim klijentskim aplikacijama.

## Pregled

Ova lekcija pokriva kako izgraditi i koristiti MCP servere koristeći stdio transport.

## Ciljevi učenja

Do kraja ove lekcije moći ćete:

- Izgraditi MCP server koristeći stdio transport.
- Debugirati MCP server koristeći Inspector.
- Koristiti MCP server u Visual Studio Code-u.
- Razumjeti trenutne MCP transportne mehanizme i zašto je stdio preporučen.

## stdio transport - Kako radi

stdio transport je jedan od dva podržana tipa transporta u trenutnoj MCP specifikaciji (2025-11-25). Evo kako radi:

- **Jednostavna komunikacija**: Server čita JSON-RPC poruke sa standardnog ulaza (`stdin`) i šalje poruke na standardni izlaz (`stdout`).
- **Baziran na procesu**: Klijent pokreće MCP server kao podproces.
- **Format poruke**: Poruke su pojedinačni JSON-RPC zahtjevi, obavijesti ili odgovori, razdvojeni novim redovima.
- **Dnevnik događaja**: Server MOŽE pisati UTF-8 stringove na standardnu grešku (`stderr`) za potrebe logiranja.

### Ključni zahtjevi:
- Poruke MORAJU biti razdvojene novim redcima i NEMAJU sadržavati ugrađene nove redove
- Server NE SMIJE pisati ništa na `stdout` što nije valjana MCP poruka
- Klijent NE SMIJE pisati ništa na serverski `stdin` što nije valjana MCP poruka

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

U prethodnom kodu:

- Uvozimo `Server` klasu i `StdioServerTransport` iz MCP SDK-a
- Kreiramo instancu servera s osnovnom konfiguracijom i mogućnostima
- Kreiramo instancu `StdioServerTransport` i povezujemo server s njim, omogućujući komunikaciju preko stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Kreiraj instancu poslužitelja
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

U prethodnom kodu:

- Kreiramo instancu servera koristeći MCP SDK
- Definiramo alate koristeći dekoratore
- Koristimo context manager stdio_server za upravljanje transportom

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

Ključna razlika u odnosu na SSE je da stdio serveri:

- Ne zahtijevaju postavljanje web servera ili HTTP endpointa
- Pokreću se kao podprocesi od strane klijenta
- Komuniciraju putem stdin/stdout tokova
- Lakši su za implementaciju i debugiranje

## Vježba: Kreiranje stdio servera

Da bismo kreirali naš server, trebamo imati na umu dvije stvari:

- Potreban nam je web server za izlaganje endpointa za povezivanje i poruke.

## Laboratorij: Kreiranje jednostavnog MCP stdio servera

U ovom laboratoriju, stvorit ćemo jednostavan MCP server koristeći preporučeni stdio transport. Ovaj server će izložiti alate koje klijenti mogu pozivati koristeći standardni Model Context Protocol.

### Preduvjeti

- Python 3.8 ili noviji
- MCP Python SDK: `pip install mcp`
- Osnovno razumijevanje asinhronog programiranja

Započnimo s kreiranjem našeg prvog MCP stdio servera:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Konfiguriraj zapisivanje dnevnika
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Kreiraj poslužitelj
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
    # Koristi stdio transport
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Ključne razlike u odnosu na zastarjeli SSE pristup

**Stdio transport (trenutni standard):**
- Jednostavan model podprocesa - klijent pokreće server kao podproces
- Komunikacija preko stdin/stdout koristeći JSON-RPC poruke
- Nema potrebe za postavljanjem HTTP servera
- Bolje performanse i sigurnost
- Jednostavnije debugiranje i razvoj

**SSE transport (zastarjelo od MCP 2025-06-18):**
- Zahtijevao HTTP server s SSE endpointima
- Složenije postavljanje s web server infrastrukturom
- Dodatne sigurnosne mjere za HTTP endpointove
- Sada je zamijenjen Streamable HTTP-om za web scenarije

### Kreiranje servera sa stdio transportom

Za kreiranje našeg stdio servera trebamo:

1. **Uvesti potrebne biblioteke** – Potrebni su MCP server komponenti i stdio transport
2. **Kreirati instancu servera** – Definirati server s njegovim mogućnostima
3. **Definirati alate** – Dodati funkcionalnosti koje želimo izložiti
4. **Postaviti transport** – Konfigurirati stdio komunikaciju
5. **Pokrenuti server** – Startati server i obrađivati poruke

Izgradimo to korak po korak:

### Korak 1: Kreiraj osnovni stdio server

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Konfigurirajte zapisivanje logova
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Kreirajte poslužitelj
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

### Korak 2: Dodaj više alata

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

### Korak 3: Pokretanje servera

Spremi kod kao `server.py` i pokreni ga u naredbenom retku:

```bash
python server.py
```

Server će se pokrenuti i čekati ulaz sa stdin. Komunicira koristeći JSON-RPC poruke preko stdio transporta.

### Korak 4: Testiranje s Inspectorom

Možete testirati vaš server koristeći MCP Inspector:

1. Instalirajte Inspector: `npx @modelcontextprotocol/inspector`
2. Pokrenite Inspector i usmjerite ga na vaš server
3. Testirajte alate koje ste kreirali

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```

## Debugiranje vašeg stdio servera

### Korištenje MCP Inspectora

MCP Inspector je vrijedan alat za debugiranje i testiranje MCP servera. Evo kako ga koristiti s vašim stdio serverom:

1. **Instalirajte Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Pokrenite Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testirajte server**: Inspector daje web sučelje gdje možete:
   - Pregledati mogućnosti servera
   - Testirati alate s različitim parametrima
   - Pratiti JSON-RPC poruke
   - Debugirati probleme s povezivanjem

### Korištenje VS Code-a

Također možete debugirati vaš MCP server direktno u VS Code-u:

1. Kreirajte launch konfiguraciju u `.vscode/launch.json`:
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

2. Postavite breakpointe u kodu servera
3. Pokrenite debugger i testirajte sa Inspectorom

### Česti savjeti za debugiranje

- Koristite `stderr` za logiranje – nemojte pisati na `stdout` jer je rezerviran za MCP poruke
- Osigurajte da su sve JSON-RPC poruke razdvojene novim redovima
- Testirajte prvo s jednostavnim alatima prije dodavanja složenijih funkcionalnosti
- Koristite Inspector za potvrdu formata poruka

## Korištenje vašeg stdio servera u VS Code

Nakon što ste izgradili vaš MCP stdio server, možete ga integrirati s VS Code-om da biste ga koristili s Claudeom ili drugim MCP kompatibilnim klijentima.

### Konfiguracija

1. **Napravite MCP konfiguracijsku datoteku** na `%APPDATA%\Claude\claude_desktop_config.json` (Windows) ili `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Restartajte Claude**: Zatvorite i ponovno otvorite Claude da učita novu konfiguraciju servera.

3. **Testirajte vezu**: Zapocnite razgovor s Claudeom i isprobajte alate vašeg servera:
   - "Možeš li me pozdraviti koristeći alat za pozdrav?"
   - "Izračunaj zbroj 15 i 27"
   - "Koje su informacije o serveru?"

### Primjer TypeScript stdio servera

Evo kompletnog TypeScript primjera za referencu:

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

// Dodaj alate
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

### Primjer .NET stdio servera

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

## Sažetak

U ovoj ažuriranoj lekciji naučili ste:

- Izgraditi MCP servere koristeći trenutni **stdio transport** (preporučeni pristup)
- Razumjeti zašto je SSE transport zastarjelo u korist stdio i Streamable HTTP
- Kreirati alate koji se mogu pozvati od strane MCP klijenata
- Debugirati vaš server koristeći MCP Inspector
- Integrirati vaš stdio server s VS Code-om i Claudeom

stdio transport pruža jednostavniji, sigurniji i učinkovitiji način za izgradnju MCP servera u odnosu na zastarjeli SSE pristup. Preporučeni je transport za većinu MCP server implementacija sa specifikacijom od 2025-06-18.

### .NET

1. Prvo kreirajmo neke alate, za to ćemo napisati datoteku *Tools.cs* sa sljedećim sadržajem:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Vježba: Testiranje vašeg stdio servera

Nakon što ste izgradili vaš stdio server, testirajmo ga da bismo bili sigurni da ispravno radi.

### Preduvjeti

1. Provjerite imate li instaliran MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Vaš kod servera treba biti spremljen (npr. kao `server.py`)

### Testiranje s Inspectorom

1. **Pokrenite Inspector s vašim serverom**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Otvorite web sučelje**: Inspector će otvoriti preglednik koji prikazuje mogućnosti vašeg servera.

3. **Testirajte alate**: 
   - Isprobajte alat `get_greeting` s različitim imenima
   - Testirajte alat `calculate_sum` s raznim brojevima
   - Pozovite alat `get_server_info` za prikaz metapodataka servera

4. **Pratite komunikaciju**: Inspector prikazuje JSON-RPC poruke koje se razmjenjuju između klijenta i servera.

### Što biste trebali vidjeti

Kad se vaš server ispravno pokrene, trebali biste vidjeti:
- Mogućnosti servera navedene u Inspectoru
- Alate dostupne za testiranje
- Uspješne JSON-RPC razmjene poruka
- Odgovore alata prikazane u sučelju

### Česti problemi i rješenja

**Server se ne pokreće:**
- Provjerite da su sve ovisnosti instalirane: `pip install mcp`
- Provjerite Python sintaksu i uvlačenje koda
- Potražite poruke o greškama na konzoli

**Alati se ne pojavljuju:**
- Provjerite da su `@server.tool()` dekoratori prisutni
- Provjerite da su alatne funkcije definirane prije `main()`
- Provjerite da je server pravilno konfiguriran

**Problemi s vezom:**
- Provjerite da server koristi stdio transport ispravno
- Provjerite da nema drugih procesa koji ometaju
- Provjerite sintaksu naredbi Inspectora

## Zadatak

Pokušajte proširiti vaš server s više funkcionalnosti. Pogledajte [ovu stranicu](https://api.chucknorris.io/) da, na primjer, dodate alat koji poziva API. Vi odlučujete kako će server izgledati. Zabavite se :)

## Rješenje

[Rješenje](./solution/README.md) Evo jednog mogućeg rješenja s radnim kodom.

## Ključne spoznaje

Ključne spoznaje ovog poglavlja su:

- stdio transport je preporučeni mehanizam za lokalne MCP servere.
- stdio transport omogućava neprimjetnu komunikaciju između MCP servera i klijenata koristeći standardne ulazne i izlazne tokove.
- Možete koristiti i Inspector i Visual Studio Code za direktno korištenje stdio servera, čineći debugiranje i integraciju jednostavnima.

## Primjeri

- [Java kalkulator](../samples/java/calculator/README.md)
- [.Net kalkulator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript kalkulator](../samples/javascript/README.md)
- [TypeScript kalkulator](../samples/typescript/README.md)
- [Python kalkulator](../../../../03-GettingStarted/samples/python) 

## Dodatni resursi

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Što slijedi

## Sljedeći koraci

Sada kada ste naučili kako graditi MCP servere sa stdio transportom, možete istražiti naprednije teme:

- **Sljedeće**: [HTTP Streaming s MCP (Streamable HTTP)](../06-http-streaming/README.md) - Naučite o drugom podržanom transport mehanizmu za udaljene servere
- **Napredno**: [Najbolje sigurnosne prakse MCP-a](../../02-Security/README.md) - Implementirajte sigurnost u vaše MCP servere
- **Produkcija**: [Strategija postavljanja](../09-deployment/README.md) - Postavite servere za produkcijsku upotrebu

## Dodatni resursi

- [MCP Specifikacija 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Službena specifikacija
- [MCP SDK Dokumentacija](https://github.com/modelcontextprotocol/sdk) - SDK reference za sve jezike
- [Primjeri iz zajednice](../../06-CommunityContributions/README.md) - Više primjera servera iz zajednice

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->