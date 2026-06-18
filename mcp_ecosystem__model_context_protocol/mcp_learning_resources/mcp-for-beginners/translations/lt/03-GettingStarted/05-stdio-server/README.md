# MCP serveris su stdio transportu

> **⚠️ Svarbus atnaujinimas**: Nuo MCP specifikacijos 2025-06-18, atskiras SSE (Server-Sent Events) transportas buvo **atsisakytas** ir pakeistas "Streamable HTTP" transportu. Dabartinė MCP specifikacija apibrėžia dvi pagrindines transporto mechanizmus:
> 1. **stdio** – standartinis įvesties/išvesties transportas (rekomenduojamas vietiniams serveriams)
> 2. **Streamable HTTP** – nuotoliniams serveriams, kurie gali naudoti SSE viduje
>
> Ši pamoka atnaujinta, kad sutelktų dėmesį į **stdio transportą**, kuris yra rekomenduojamas daugumai MCP serverių įgyvendinimų.

Stdio transportas leidžia MCP serveriams bendrauti su klientais per standartines įvesties ir išvesties sroves. Tai yra dažniausiai naudojamas ir rekomenduojamas transporto mechanizmas dabartinėje MCP specifikacijoje, suteikiantis paprastą ir efektyvų būdą kurti MCP serverius, lengvai integruojamus su įvairiomis klientų programomis.

## Apžvalga

Šioje pamokoje apžvelgiame, kaip kurti ir naudoti MCP serverius naudojant stdio transportą.

## Mokymosi tikslai

Pamokos pabaigoje jūs gebėsite:

- Kurti MCP serverį, naudojant stdio transportą.
- Derinti MCP serverį naudodami Inspector įrankį.
- Naudoti MCP serverį Visual Studio Code aplinkoje.
- Suprasti dabartinius MCP transporto mechanizmus ir kodėl rekomenduojamas stdio.

## stdio transportas – kaip tai veikia

Stdio transportas yra vienas iš dviejų transporto tipų, palaikomų dabartinėje MCP specifikacijoje (2025-11-25). Štai kaip jis veikia:

- **Paprasta komunikacija**: serveris skaito JSON-RPC žinutes iš standartinės įvesties (`stdin`) ir siunčia žinutes į standartinę išvestį (`stdout`).
- **Proceso pagrindu**: klientas paleidžia MCP serverį kaip subprocess'ą.
- **Žinučių formatas**: žinutės yra atskiros JSON-RPC užklausos, pranešimai arba atsakymai, atskirti naujomis eilutėmis.
- **Logavimas**: serveris GALI rašyti UTF-8 eilutes į standartinę klaidų išvestį (`stderr`) logavimui.

### Pagrindiniai reikalavimai:
- Žinutės TURI būti atskirtos naujomis eilutėmis ir NETURI turėti įterptų naujų eilučių
- Serveris NETURI rašyti į `stdout`, kas nėra galiojanti MCP žinutė
- Klientas NETURI rašyti serverio `stdin` kažko, kas nėra galiojanti MCP žinutė

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

Ankstesniame kode:

- Importuojame `Server` klasę ir `StdioServerTransport` iš MCP SDK
- Sukuriame serverio egzempliorių su pagrindine konfigūracija ir galimybėmis
- Sukuriame `StdioServerTransport` egzempliorių ir prijungiame prie jo serverį, leidžiant bendrauti per stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Sukurti serverio egzempliorių
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

Ankstesniame kode mes:

- Kuriame serverio egzempliorių naudodami MCP SDK
- Apibrėžiame įrankius naudojant dekoratorius
- Naudojame stdio_server kontekstinį valdiklį transportui valdyti

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

Pagrindinis skirtumas nuo SSE yra tai, kad stdio serveriai:

- Nereikalauja web serverio ar HTTP endpoint'ų
- Paleidžiami kaip kliento subprocess'ai
- Bendrauja per stdin/stdout sroves
- Yra paprastesni įgyvendinami ir derinami

## Užduotis: sukurti stdio serverį

Kad sukurtume serverį, turime atsiminti dvi dalis:

- Reikia naudoti web serverį, kad būtų atskleisti endpoint'ai prisijungimui ir žinutėms.

## Laboratorinis darbas: paprasto MCP stdio serverio kūrimas

Šiame laboratoriniame darbe sukursime paprastą MCP serverį, naudodami rekomenduojamą stdio transportą. Šis serveris atskleis įrankius, kuriuos klientai galės kviesti naudodami standartinį Model Context Protocol.

### Reikalavimai

- Python 3.8 arba naujesnė versija
- MCP Python SDK: `pip install mcp`
- Pagrindinės asynchroninės programavimo žinios

Pradėkime nuo pirmojo MCP stdio serverio sukūrimo:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Suconfigurekite žurnalo įrašymą
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sukurkite serverį
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
    # Naudokite stdio prievadą
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Pagrindiniai skirtumai nuo atsisakyto SSE metodo

**Stdio Transportas (dabartinis standartas):**
- Paprastas subprocess modelis – klientas paleidžia serverį kaip dukterinį procesą
- Komunikacija per stdin/stdout naudojant JSON-RPC žinutes
- HTTP serverio konfigūracija nereikalinga
- Geresnis našumas ir saugumas
- Lengvesnis derinimas ir plėtra

**SSE Transportas (atsisakytas nuo MCP 2025-06-18):**
- Reikalavo HTTP serverio su SSE endpoint'ais
- Daug sudėtingesnė instaliacija su web serverio infrastruktūra
- Papildomos saugumo priemonės HTTP endpoint’ams
- Dabar pakeistas Streamable HTTP web scenarijams

### Serverio kūrimas su stdio transportu

Kad sukurtume stdio serverį, turime:

1. **Importuoti reikiamas bibliotekas** – mums reikalingi MCP serverio komponentai ir stdio transportas
2. **Sukurti serverio egzempliorių** – apibrėžti serverį su jo galimybėmis
3. **Apibrėžti įrankius** – pridėti funkcionalumą, kurį norime atskleisti
4. **Sukurti transporto nustatymus** – sukonfigūruoti stdio komunikaciją
5. **Paleisti serverį** – pradėti serverį ir tvarkyti žinutes

Kurkime po žingsnį:

### 1 žingsnis: sukurti bazinį stdio serverį

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Konfigūruoti žurnalavimą
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sukurti serverį
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

### 2 žingsnis: pridėti daugiau įrankių

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

### 3 žingsnis: serverio paleidimas

Įrašykite kodą kaip `server.py` ir paleiskite komandų eilutėje:

```bash
python server.py
```

Serveris pradės darbą ir lauks įvesties iš stdin. Jis bendrauja naudodamas JSON-RPC žinutes per stdio transportą.

### 4 žingsnis: testavimas su Inspector

Galite išbandyti savo serverį naudodami MCP Inspector:

1. Įdiekite Inspector: `npx @modelcontextprotocol/inspector`
2. Paleiskite Inspector ir nukreipkite jį į savo serverį
3. Išbandykite sukurtus įrankius

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```

## Derinimas su stdio serveriu

### Naudojant MCP Inspector

MCP Inspector yra vertingas įrankis MCP serverių derinimui ir testavimui. Štai kaip jį naudoti su stdio serveriu:

1. **Įdiekite Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Paleiskite Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testuokite serverį**: Inspector suteikia žiniatinklio sąsają, kur galite:
   - Peržiūrėti serverio galimybes
   - Išbandyti įrankius su įvairiais parametrais
   - Stebėti JSON-RPC žinutes
   - Derinti ryšio problemas

### Naudojant VS Code

Taip pat galite tiesiogiai derinti MCP serverį VS Code aplinkoje:

1. Sukurkite paleidimo konfigūraciją faile `.vscode/launch.json`:
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

2. Įdėkite lūžio taškus serverio kode
3. Paleiskite derintuvą ir testuokite su Inspector

### Dažni derinimo patarimai

- Naudokite `stderr` logavimui – niekada nerašykite į `stdout`, nes jis skirtas MCP žinutėms
- Užtikrinkite, kad visos JSON-RPC žinutės būtų atskirtos naujomis eilutėmis
- Iš pradžių išbandykite paprastus įrankius prieš pridėdami sudėtingą funkcionalumą
- Naudokite Inspector formatų patikrinimui

## Naudojimas su VS Code

Kai sukūrėte MCP stdio serverį, galite integruoti jį su VS Code ir naudoti su Claude ar kitais MCP suderinamais klientais.

### Konfigūracija

1. **Sukurkite MCP konfigūracijos failą** `%APPDATA%\Claude\claude_desktop_config.json` (Windows) arba `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Perkraukite Claude**: uždarykite ir vėl atidarykite Claude, kad įkeltumėte naują serverio konfigūraciją.

3. **Išbandykite ryšį**: pradėkite pokalbį su Claude ir pabandykite naudoti savo serverio įrankius:
   - „Ar gali mane pasveikinti naudodamas sveikinimo įrankį?“
   - „Apskaičiuok sumą 15 ir 27“
   - „Kokia yra serverio informacija?“

### TypeScript stdio serverio pavyzdys

Čia pateiktas pilnas TypeScript pavyzdys:

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

// Pridėti įrankius
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

### .NET stdio serverio pavyzdys

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

## Santrauka

Šioje atnaujintoje pamokoje išmokote:

- Kurti MCP serverius naudojant dabartinį **stdio transportą** (rekomenduojamas metodas)
- Suprasti, kodėl SSE transportas buvo atsisakyta pasirenkant stdio ir Streamable HTTP
- Kurti įrankius, kuriuos gali kviesti MCP klientai
- Derinti serverį naudojant MCP Inspector
- Integruoti stdio serverį su VS Code ir Claude

Stdio transportas suteikia paprastesnį, saugesnį ir našesnį būdą kurti MCP serverius, palyginti su atsisakytu SSE metodu. Tai rekomenduojamas transportas daugumai MCP serverių įgyvendinimų nuo 2025-06-18 specifikacijos.

### .NET

1. Pirmiausia sukurkime keletą įrankių, tam sukursime failą *Tools.cs* su šiuo turiniu:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Užduotis: patikrinkite savo stdio serverį

Dabar, kai sukūrėte stdio serverį, išbandykite jį, kad įsitikintumėte, jog veikia teisingai.

### Reikalavimai

1. Įsitikinkite, kad MCP Inspector įdiegtas:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Jūsų serverio kodas turi biti išsaugotas (pvz., kaip `server.py`)

### Testavimas su Inspector

1. **Paleiskite Inspector nurodant savo serverį**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Atidarykite žiniatinklio sąsają**: Inspector atidarys naršyklės langą su rodoma serverio galimybėmis.

3. **Išbandykite įrankius**: 
   - Išbandykite įrankį `get_greeting` su įvairiais vardais
   - Testuokite `calculate_sum` įrankį su įvairiais skaičiais
   - Iškvieskite `get_server_info` įrankį, kad pamatytumėte serverio metaduomenis

4. **Stebėkite komunikaciją**: Inspector rodo JSON-RPC žinutes, kurios keičiasi tarp kliento ir serverio.

### Ko turėtumėte tikėtis

Kai serveris sėkmingai paleidžiamas, turėtumėte matyti:
- Serverio galimybių sąrašą Inspectoriuje
- Įrankius, kuriuos galima testuoti
- Sėkmingą JSON-RPC žinučių apsikeitimą
- Įrankių atsakymus sąsajoje

### Dažnos problemos ir sprendimai

**Serveris nepaleidžiamas:**
- Patikrinkite, ar įdiegti visi reikalavimai: `pip install mcp`
- Patikrinkite Python sintaksę ir įtrauką
- Peržiūrėkite klaidų pranešimus konsolėje

**Įrankiai nerodomi:**
- Įsitikinkite, kad yra `@server.tool()` dekoratoriai
- Patikrinkite, ar įrankių funkcijos apibrėžtos prieš `main()`
- Įsitikinkite, kad serveris tinkamai sukonfigūruotas

**Ryšio problemos:**
- Patikrinkite, ar serveris tinkamai naudoja stdio transportą
- Įsitikinkite, kad kiti procesai netrukdo
- Patikrinkite Inspectoriaus komandų sintaksę

## Užduotis

Išbandykite savo serverį papildomomis funkcijomis. Peržiūrėkite [šią svetainę](https://api.chucknorris.io/), pavyzdžiui, pridėti įrankį, kuris kviečia API. Jūs nusprendžiate, kaip turėtų atrodyti serveris. Sėkmės :)

## Sprendimas

[Sprendimas](./solution/README.md) Čia pateiktas galimas sprendimas su veikiamu kodu.

## Pagrindinės išvados

Šio skyriaus svarbiausios išvados:

- Stdio transportas yra rekomenduojamas mechanizmas vietiniams MCP serveriams.
- Stdio transportas leidžia sklandžiai bendrauti tarp MCP serverių ir klientų per standartines įvesties ir išvesties sroves.
- Galite naudoti tiek Inspector, tiek Visual Studio Code tiesiogiai naudojant stdio serverius, kas palengvina derinimą ir integraciją.

## Pavyzdžiai

- [Java skaičiuotuvas](../samples/java/calculator/README.md)
- [.Net skaičiuotuvas](../../../../03-GettingStarted/samples/csharp)
- [JavaScript skaičiuotuvas](../samples/javascript/README.md)
- [TypeScript skaičiuotuvas](../samples/typescript/README.md)
- [Python skaičiuotuvas](../../../../03-GettingStarted/samples/python) 

## Papildomi ištekliai

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Kas toliau

## Kiti žingsniai

Dabar, kai išmokote kurti MCP serverius su stdio transportu, galite tyrinėti pažangesnes temas:

- **Toliau**: [HTTP transliacija su MCP (Streamable HTTP)](../06-http-streaming/README.md) – sužinokite apie kitą palaikomą transporto mechanizmą nuotoliniams serveriams
- **Pažengusiems**: [MCP saugumo geriausios praktikos](../../02-Security/README.md) – įgyvendinkite saugumą savo MCP serveriuose
- **Produkcijai**: [Diegimo strategijos](../09-deployment/README.md) – diegkite savo serverius gamybiniam naudojimui

## Papildomi ištekliai

- [MCP specifikacija 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) – oficiali specifikacija
- [MCP SDK dokumentacija](https://github.com/modelcontextprotocol/sdk) – SDK nuorodos visoms programavimo kalboms
- [Bendruomenės pavyzdžiai](../../06-CommunityContributions/README.md) – daugiau serverių pavyzdžių iš bendruomenės

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->