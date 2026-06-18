# MCP server stdio-transporti abil

> **⚠️ Tähtis uuendus**: alates MCP spetsifikatsioonist 2025-06-18 on iseseisev SSE (Server-Sent Events) transport **väljajäetud** ja asendatud "Streamable HTTP" transpordiga. Praegune MCP spetsifikatsioon määratleb kaks peamist transpordimehhanismi:
> 1. **stdio** – standardne sisend/väljund (soovitatav kohalikeks serveriteks)
> 2. **Streamable HTTP** – kaugsüsteemide jaoks, mis võivad sisemiselt kasutada SSE-d
>
> See õppetund on uuendatud, keskendudes **stdio transpordile**, mis on soovituslik enamikus MCP serverite rakendustes.

Stdio transport võimaldab MCP serveritel suhelda klientidega standardse sisendi ja väljundi kaudu. See on praegu kõige enam kasutatav ja soovitatud transpordimehhanism MCP spetsifikatsioonis, pakkudes lihtsat ja tõhusat viisi MCP serverite ehitamiseks, mida saab hõlpsasti integreerida erinevate kliendirakendustega.

## Ülevaade

See õppetund keskendub MCP serverite loomisele ja tarbimisele stdio transpordi abil.

## Õpieesmärgid

Selle õppetunni lõpul saad osata:

- Ehita MCP server stdio transpordi abil.
- Silu MCP serverit Inspectoriga.
- Kasuta MCP serverit Visual Studio Code’is.
- Mõista praeguseid MCP transpordimehhanisme ja miks stdio on soovitatav.

## stdio transport – kuidas see töötab

Stdio transport on üks kahest toetatud transporditüübist MCP praeguses spetsifikatsioonis (2025-11-25). Nii see töötab:

- **Lihtne suhtlus**: server loeb JSON-RPC sõnumeid standardse sisendi (`stdin`) kaudu ja saadab sõnumeid standardse väljundi (`stdout`) kaudu.
- **Protsessipõhine**: klient käivitab MCP serveri alamprotsessina.
- **Sõnumite formaat**: sõnumid on üksikud JSON-RPC päringud, teated või vastused, mis on eraldatud reavahetustega.
- **Logimine**: server VÕIB kirjutada UTF-8 stringe standardesse veasse (`stderr`) logimise eesmärgil.

### Olulised nõuded:
- Sõnumid PEAVAD olema reavahetustega eraldatud ja EI TOHI sisaldada manustatud reavahetusi
- Server EI TOHI kirjutada `stdout`-i midagi, mis ei ole kehtiv MCP sõnum
- Klient EI TOHI kirjutada serveri `stdin`-i mittekehtivaid MCP sõnumeid

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

Eelnevas koodis:

- Impordime `Server` klassi ja `StdioServerTransport` MCP SDK-st
- Loome serveri instantsi põhikonfiguratsiooni ja võimekustega
- Loome `StdioServerTransport` instantsi ja ühendame serveri sellega, võimaldades kommunikatsiooni üle stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Loo serveri instants
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

Eelnevas koodis:

- Loome MCP SDK abil serveri instantsi
- Defineerime tööriistad dekoorijatena
- Kasutame stdio_server kontekstihaldurit transpordi käsitlemiseks

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

Peamine erinevus SSE-st on, et stdio serverid:

- Ei vaja veebiserveri seadistust ega HTTP lõpp-punkte
- Käivitatakse kliendi poolt alamprotsessina
- Suhtlevad stdin/stdout voogude kaudu
- On lihtsamad arendamisel ja silumisel

## Harjutus: stdio serveri loomine

Serveri loomiseks peame meeles pidama kahte asja:

- Peame kasutama veebiserverit, et avaldada ühendus- ja sõnumipunktid.

## Lab: Lihtsa MCP stdio serveri loomine

Selles laboris loome lihtsa MCP serveri, kasutades soovitatud stdio transporti. See server avaldab tööriistad, mida kliendid saavad kutsuda standardse Model Context Protocoli kaudu.

### Eeltingimused

- Python 3.8 või uuem
- MCP Python SDK: `pip install mcp`
- Asünkroonse programmeerimise põhiteadmised

Alustame esimese MCP stdio serveri loomisega:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Konfigureeri logimine
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Loo server
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
    # Kasuta stdio transporti
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Peamised erinevused vananenud SSE lähenemisest

**Stdio transport (praegune standard):**
- Lihtne alamprotsessimudel – klient käivitab serveri alamprotsessina
- Suhtlus stdin/stdout kaudu JSON-RPC sõnumitega
- HTTP serveri seadistus ei ole vajalik
- Parem jõudlus ja turvalisus
- Kergem siluda ja arendada

**SSE transport (väljajäetud alates MCP 2025-06-18):**
- Nõudis HTTP serverit ja SSE lõpp-punkte
- Keerukam seadistus veebiserveri infrastruktuuriga
- Täiendavad turvakaalutlused HTTP lõpp-punktide jaoks
- Asendatud Streamable HTTP-ga veebi-põhiste stsenaariumide jaoks

### Serveri loomine stdio transpordiga

Serveri loomiseks peame:

1. **Impordima vajalikud teegid** – MCP serveri komponendid ja stdio transport
2. **Looma serveri instantsi** – määratleme serveri koos selle võimekustega
3. **Määratlema tööriistad** – lisama funktsioonid, mida avaldada
4. **Seadistama transpordi** – konfigureerima stdio suhtlust
5. **Käivitage server** – alustama serverit ja sõnumite käsitlemist

Teeme selle sammhaaval:

### Samm 1: Lihtsa stdio serveri loomine

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Konfigureeri logimine
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Loo server
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

### Samm 2: Veel tööriistade lisamine

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

### Samm 3: Serveri käivitamine

Salvesta kood failina `server.py` ja käivita see käsurealt:

```bash
python server.py
```

Server käivitub ja ootab sisendit stdin-ist. Suhtlus toimub JSON-RPC sõnumite kaudu stdio transpordi peal.

### Samm 4: Testimine Inspectoriga

Serverit saab testida MCP Inspectoriga:

1. Paigalda Inspector: `npx @modelcontextprotocol/inspector`
2. Käivita Inspector ja suuna see oma serverile
3. Testi loodud tööriistu

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Sinu stdio serveri silumine

### MCP Inspectori kasutamine

MCP Inspector on väärtuslik tööriist MCP serverite silumiseks ja testimiseks. Kasutamiseks stdio serveriga:

1. **Paigalda Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Käivita Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testi serverit**: Inspector pakub veebiliidest, kus saad:
   - Vaadata serveri võimeid
   - Testida tööriistu eri parameetritega
   - Jälgida JSON-RPC sõnumeid
   - Siluda ühendusprobleeme

### VS Code'i kasutamine

Sa saad ka siluda MCP serverit otse VS Code’is:

1. Loo käivituskonfiguratsioon failis `.vscode/launch.json`:
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

2. Sea oma serveri koodis pausipunktid
3. Käivita silur ja testi Inspectoriga

### Levinud silumisnõuanded

- Kasuta logimiseks `stderr` – ära kirjuta `stdout`-i, mis on mõeldud MCP sõnumite jaoks
- Kontrolli, et kõik JSON-RPC sõnumid oleksid reavahetustega eraldatud
- Testi esmalt lihtsaid tööriistu, enne kui lisad keerulist funktsionaalsust
- Kasuta Inspectorit sõnumite formaadi kontrollimiseks

## Sinu stdio serveri kasutamine VS Code’is

Kui oled loonud MCP stdio serveri, saad selle integreerida VS Code’iga, et kasutada seda Claude’i või teiste MCP ühilduvate klientidega.

### Konfiguratsioon

1. **Loo MCP konfiguratsioonifail** aadressile `%APPDATA%\Claude\claude_desktop_config.json` (Windows) või `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Taaskäivita Claude**: Sule ja ava Claude uuesti, et laadida uus serveri konfiguratsioon.

3. **Testi ühendust**: Alusta vestlust Claude’iga ja kasuta oma serveri tööriistu:
   - „Kas saad mind tervitada tervitustööriista abil?“
   - „Arvuta 15 ja 27 summa.“
   - „Mis teavet server annab?“

### Näide TypeScripti stdio serverist

Siin on täielik TypeScripti näide:

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

// Lisa tööriistu
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

### Näide .NET stdio serverist

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

## Kokkuvõte

Selles uuendatud õppetunnis õppisid:

- MCP serverite ehitamist praeguse **stdio transpordiga** (soovitatav meetod)
- Miks SSE transport välja jäeti ja stdio ning Streamable HTTP kasutusele võeti
- Tööriistade loomist, mida MCP kliendid saavad kutsuda
- Serveri silumist MCP Inspectoriga
- Sinu stdio serveri integreerimist VS Code’i ja Claude’iga

Stdio transport pakub lihtsamat, turvalisemat ja parema jõudlusega lahendust MCP serverite loomiseks võrreldes vananenud SSE lähenemisega. See on alates 2025-06-18 spetsifikatsioonist enamikule MCP serveri rakendustele soovitatud transport.

### .NET

1. Loome esmalt mõned tööriistad, selleks loome faili *Tools.cs* järgmise sisuga:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Harjutus: Sinu stdio serveri testimine

Kui oled serveri valmis ehitanud, testime nüüd selle korrektsust.

### Eeltingimused

1. Veendu, et sul on paigaldatud MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Serveri kood peab olema salvestatud (nt `server.py`)

### Testimine Inspectoriga

1. **Käivita Inspector koos oma serveriga**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Ava veebiliides**: Inspector avab brauseriakna, kus näed serveri võimeid.

3. **Testi tööriistu**: 
   - Kasuta `get_greeting` tööriista eri nimedega
   - Testi `calculate_sum` tööriista erinevate arvudega
   - Kutsu `get_server_info` tööriist, et näha serveri metaandmeid

4. **Jälgi suhtlust**: Inspector kuvab kliendi ja serveri vahel vahetatavaid JSON-RPC sõnumeid.

### Mida sa peaksid nägema

Kui server käivitub korrektselt, näed:
- Serveri võimed Inspectoris
- Võimalust tööriistu testida
- Edukaid JSON-RPC sõnumivahetusi
- Tööriistade vastuseid liideses

### Levinud probleemid ja lahendused

**Server ei käivitu:**
- Kontrolli, et kõik sõltuvused on paigaldatud: `pip install mcp`
- Kontrolli Python'i süntaksit ja taanet
- Otsi konsoolist veateateid

**Tööriistad ei ilmu:**
- Veendu, et `@server.tool()` dekoorijad on olemas
- Kontrolli, et tööriista funktsioonid on määratletud enne `main()` funktsiooni
- Veendu, et server on õigesti konfigureeritud

**Ühendusprobleemid:**
- Veendu, et server kasutab õigesti stdio transporti
- Kontrolli, et teised protsessid ei segaks
- Kontrolli Inspectori käsu süntaksit

## Ülesanne

Proovi lisada serverisse rohkem võimekusi. Vaata [seda lehte](https://api.chucknorris.io/), et näiteks lisada tööriist, mis kutsub mõnda API-d. Otsusta ise, milline server peaks olema. Edu :)

## Lahendus

[Lahendus](./solution/README.md) Siin on võimalik lahendus töötava koodiga.

## Peamised mõtted

Selle peatüki olulisemad punktid on:

- Stdio transport on soovitatud mehhanism kohalike MCP serverite jaoks.
- Stdio transport võimaldab sujuvat suhtlust MCP serverite ja klientide vahel standardsete sisendi- ja väljundvoogude kaudu.
- Sa saad kasutada nii Inspectorit kui Visual Studio Code’i stdio serverite otseseks tarbimiseks, mis teeb silumise ja integreerimise lihtsaks.

## Näited

- [Java kalkulaator](../samples/java/calculator/README.md)
- [.Net kalkulaator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript kalkulaator](../samples/javascript/README.md)
- [TypeScript kalkulaator](../samples/typescript/README.md)
- [Python kalkulaator](../../../../03-GettingStarted/samples/python) 

## Lisamaterjalid

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Mis järgmiseks

## Järgmised sammud

Nüüd, kui tead, kuidas luua MCP servereid stdio transpordiga, saad uurida edasijõudnumaid teemasid:

- **Järgmine**: [HTTP voogedastus MCP-ga (Streamable HTTP)](../06-http-streaming/README.md) – Õpi teisest toetatud transpordimehhanismist kaugsüsteemidele
- **Edasijõudnutele**: [MCP turvalisuse parimad praktikad](../../02-Security/README.md) – Turvalisuse rakendamine MCP serverites
- **Tootmiskeskkond**: [Deploy strateegiad](../09-deployment/README.md) – Serverite kasutusele võtmine tootmiskeskkonnas

## Lisamaterjalid

- [MCP spetsifikatsioon 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) – ametlik spetsifikatsioon
- [MCP SDK dokumentatsioon](https://github.com/modelcontextprotocol/sdk) – SDK viited kõigile keeltele
- [Kogukonna näited](../../06-CommunityContributions/README.md) – Rohkem serverite näiteid kogukonnalt

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->