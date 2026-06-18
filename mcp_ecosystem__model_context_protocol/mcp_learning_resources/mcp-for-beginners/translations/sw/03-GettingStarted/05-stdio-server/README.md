# MCP Server na usafirishaji wa stdio

> **⚠️ Sasisho Muhimu**: Kuanzia MCP Specification 2025-06-18, usafirishaji wa SSE (Server-Sent Events) wa kuendesha peke yake umefutwa na kuongezwa kwa usafirishaji wa "Streamable HTTP". Maelezo ya MCP ya sasa yanaeleza aina mbili kuu za usafirishaji:
> 1. **stdio** - Ingizo/Matokeo ya kawaida (inapendekezwa kwa seva za ndani)
> 2. **Streamable HTTP** - Kwa seva za mbali zinazoweza kutumia SSE ndani
>
> Somo hili limeboreshwa kuzingatia usafirishaji wa **stdio**, ambao ndio njia inayopendekezwa kwa utekelezaji nyingi za seva za MCP.

Usafirishaji wa stdio unaruhusu seva za MCP kuwasiliana na wateja kupitia mtiririko wa ingizo na matokeo wa kawaida. Hii ni njia inayotumika zaidi na inayopendekezwa katika utekelezaji wa sasa wa MCP, ikitoa njia rahisi na yenye ufanisi ya kujenga seva za MCP zinazoweza kuunganishwa kwa urahisi na programu mbalimbali za wateja.

## Muhtasari

Somo hili linaelezea jinsi ya kujenga na kutumia seva za MCP kwa kutumia usafirishaji wa stdio.

## Malengo ya Kujifunza

Mwisho wa somo hili, utaweza:

- Kujenga seva ya MCP kwa kutumia usafirishaji wa stdio.
- Kufafanua kosa katika seva ya MCP kwa kutumia Inspector.
- Kutumia seva ya MCP kupitia Visual Studio Code.
- Kuelewa aina za usafirishaji za MCP zilizopo na kwa nini stdio inapendekezwa.


## Usafirishaji wa stdio - Jinsi Inavyofanya Kazi

Usafirishaji wa stdio ni mojawapo ya aina mbili za usafirishaji zinazotungwa katika MCP ya sasa (2025-11-25). Hivi ndivyo unavyofanya kazi:

- **Mawasiliano Rahisi**: Seva husoma ujumbe za JSON-RPC kutoka kwenye ingizo la kawaida (`stdin`) na kutuma ujumbe kwenye matokeo ya kawaida (`stdout`).
- **Inayotumia mchakato**: Mteja huanzisha seva ya MCP kama mchakato mdogo.
- **Muundo wa Ujumbe**: Ujumbe ni maombi, taarifa, au majibu ya JSON-RPC yamegawanyika kwa mistari mipya.
- **Kurekodi**: Seva INAWEZA kuandika nyuzi za UTF-8 kwenye kosa la kawaida (`stderr`) kwa madhumuni ya kurekodi.

### Mahitaji Muhimu:
- Ujumbe LAZIMA ugawanywe kwa mistari mipya na USIZUWE mistari mipya ndani yake
- Seva HAIPASWI kuandika chochote kwenye `stdout` ambacho si ujumbe halali wa MCP
- Mteja HAIPASWI kuandika chochote kwenye `stdin` ya seva ambacho si ujumbe halali wa MCP

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

Katika msimbo uliotangulia:

- Tunaingiza darasa `Server` na `StdioServerTransport` kutoka MCP SDK
- Tunaunda mfano wa seva na usanidi na uwezo wa msingi
- Tunaunda mfano wa `StdioServerTransport` na kuunganisha seva nayo, kuwezesha mawasiliano kupitia stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Tengeneza mfano wa seva
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

Katika msimbo uliotangulia:

- Tunaandika mfano wa seva kwa kutumia MCP SDK
- Tunaeleza zana kwa kutumia decorators
- Tunatumia meneja wa muktadha `stdio_server` kushughulikia usafirishaji

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

Tofauti kuu na SSE ni kwamba seva za stdio:

- Hazihitaji usanidi wa seva ya wavuti wala vichwa vya HTTP
- Huanzishwa kama mchakato mdogo na mteja
- Husafirisha data kupitia mtiririko wa stdin/stdout
- Ni rahisi kutekeleza na kufafanua kosa

## Zoef: Kuunda Seva ya stdio

Ili kuunda seva yetu, tunapaswa kuzingatia mambo mawili:

- Tunahitaji kutumia seva ya wavuti kufungua vifungu vya muunganisho na ujumbe.
## Lab: Kuunda seva rahisi ya MCP stdio

Katika maabara hii, tutaunda seva rahisi ya MCP kwa kutumia usafirishaji wa stdio unaopendekezwa. Seva hii itafungua zana ambazo wateja wanaweza kuitumia kwa kutumia Mkataba wa Muktadha wa Mfano wa kawaida.

### Mahitaji

- Python 3.8 au baadaye
- MCP Python SDK: `pip install mcp`
- Uelewa wa msingi wa programu zisizo na mfululizo wa muda (async)

Tuanze kwa kuunda seva yetu ya kwanza ya MCP stdio:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Sanidi uandishi wa kumbukumbu
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Unda seva
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
    # Tumia usafirishaji wa stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Tofauti kuu na njia ya SSE iliyofutwa

**Usafirishaji wa Stdio (Kiwango cha Sasa):**
- Mfano rahisi wa mchakato mdogo - mteja huanzisha seva kama mchakato mdogo
- Mawasiliano kwa kupitia stdin/stdout kwa kutumia ujumbe za JSON-RPC
- Hakuna haja ya usanidi wa seva ya HTTP
- Ufanisi na usalama bora
- Rahisi kufanya debugging na kuendeleza

**Usafirishaji wa SSE (Umegawanyika kuanzia MCP 2025-06-18):**
- Ulipasa seva ya HTTP na vifungu vya SSE
- Usanidi mgumu zaidi na miundombinu ya seva ya wavuti
- Mambo mengine ya usalama kwa vifungu vya http
- Sasa imebadilishwa na Streamable HTTP kwa matukio ya wavuti

### Kuunda seva kwa usafirishaji wa stdio

Ili kuunda seva yetu ya stdio, tunapaswa:

1. **Kuingiza maktaba zinazohitajika** - Tunahitaji vipengele vya seva MCP na usafirishaji wa stdio
2. **Kuumba mfano wa seva** - Eleza seva na uwezo wake
3. **Eleza zana** - Ongeza utendaji tunayotaka kuufungua
4. **Sanidi usafirishaji** - Weka mawasiliano ya stdio
5. **Endesha seva** - Anzisha seva na shughulikia ujumbe

Tujenge hatua kwa hatua:

### Hatua ya 1: Tengeneza seva rahisi ya stdio

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Sanidi uandikishaji wa kumbukumbu
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Unda seva
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

### Hatua ya 2: Ongeza zana zaidi

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

### Hatua ya 3: Kuendesha seva

Hifadhi msimbo huu kama `server.py` kisha uendeshe kutoka kwenye mstari wa amri:

```bash
python server.py
```

Seva itaanza na kusubiri taarifa kutoka stdin. Husafirisha data kwa ujumbe wa JSON-RPC kupitia usafirishaji wa stdio.

### Hatua ya 4: Kuicheki na Inspector

Unaweza kujaribu seva yako kwa kutumia MCP Inspector:

1. Sakinisha Inspector: `npx @modelcontextprotocol/inspector`
2. Endesha Inspector na uelekeze kwa seva yako
3. Jaribu zana ulizozitengeneza

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Kufafanua kosa kwenye seva yako ya stdio

### Kutumia MCP Inspector

MCP Inspector ni chombo muhimu kwa kufafanua kosa na kujaribu seva za MCP. Hapa ni jinsi ya kuitumia na seva yako ya stdio:

1. **Sakinisha Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Endesha Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Jaribu seva yako**: Inspector hutoa kiolesura cha wavuti ambacho unaweza:
   - Kuona uwezo wa seva
   - Kujaribu zana kwa vigezo tofauti
   - Kufuatilia ujumbe wa JSON-RPC
   - Kufafanua matatizo ya muunganisho

### Kutumia VS Code

Pia unaweza kufafanua seva yako ya MCP moja kwa moja katika VS Code:

1. Tengeneza usanidi wa kuanzisha ndani ya `.vscode/launch.json`:
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

2. Weka sehemu za kusimamisha katika msimbo wa seva
3. Endesha debug na jaribu kwa Inspector

### Vidokezo vya kawaida vya ufafanuzi kosa

- Tumia `stderr` kwa ajili ya kurekodi - usiandike chochote kwenye `stdout` ambacho ni kwa ujumbe wa MCP pekee
- Hakikisha ujumbe wote wa JSON-RPC una sehemu ya mwisho ya mistari mipya
- Jaribu kwanza zana rahisi kabla ya kuongeza zana tata
- Tumia Inspector kuthibitisha muundo wa ujumbe

## Kutumia seva yako ya stdio katika VS Code

Ukimaliza kujenga seva yako ya MCP kwa usafirishaji wa stdio, unaweza kuunganisha na VS Code kuitumia na Claude au wateja wengine wa MCP.

### Mipangilio

1. **Tengeneza faili la usanidi la MCP** katika `%APPDATA%\Claude\claude_desktop_config.json` (Windows) au `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Anzisha upya Claude**: Funga na fungua Claude upya ili upate usanidi mpya wa seva.

3. **Jaribu muunganisho**: Anza mazungumzo na Claude na jaribu kutumia zana za seva yako:
   - "Unaweza kunikaribisha kwa kutumia zana ya salamu?"
   - "Hesabu jumla ya 15 na 27"
   - "Nipe taarifa za seva?"

### Mfano wa seva ya stdio kwa TypeScript

Hapa kuna mfano kamili wa TypeScript kwa rejea:

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

// Ongeza zana
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

### Mfano wa seva ya stdio kwa .NET

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

## Muhtasari

Katika somo hili lililosasishwa, ulijifunza jinsi ya:

- Kujenga seva za MCP kwa kutumia usafirishaji wa sasa wa **stdio** (njia inayopendekezwa)
- Kuelewa kwa nini usafirishaji wa SSE ulifutwa na stdio na Streamable HTTP
- Kuunda zana zinazoweza kuitwa na wateja wa MCP
- Kufafanua kosa kwenye seva yako kwa kutumia MCP Inspector
- Kuunganisha seva yako ya stdio na VS Code pamoja na Claude

Usafirishaji wa stdio unatoa njia rahisi, salama, na yenye ufanisi zaidi ya kujenga seva za MCP ikilinganishwa na njia ya SSE iliyofutwa. Ni njia inayopendekezwa kwa utekelezaji mwingi wa seva za MCP kuanzia maelezo ya 2025-06-18.


### .NET

1. Kwanza, tuunde zana, kwa hili tutaunda faili *Tools.cs* yenye maudhui yafuatayo:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Zoef: Kujaribu seva yako ya stdio

Sasa umejenga seva yako ya stdio, hebu tuijaribu kuhakikisha inafanya kazi kama inavyostahili.

### Mahitaji

1. Hakikisha MCP Inspector imewekwa:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Msimbo wa seva unapaswa kuhifadhiwa (mfano, kama `server.py`)

### Kupitia jaribio na Inspector

1. **Anzisha Inspector pamoja na seva yako**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Fungua kiolesura cha wavuti**: Inspector itafungua dirisha la kivinjari linaonyesha uwezo wa seva yako.

3. **Jaribu zana**: 
   - Jaribu zana ya `get_greeting` kwa majina tofauti
   - Jaribu zana ya `calculate_sum` kwa nambari mbalimbali
   - Piga simu zana ya `get_server_info` kupata metadata ya seva

4. **Fuatilia mawasiliano**: Inspector inaonyesha ujumbe wa JSON-RPC unaobadilishanwa kati ya mteja na seva.

### Unapaswa kuona nini

Unapoanzisha seva yako kwa usahihi, utapata:
- Orodha ya uwezo wa seva kwenye Inspector
- Zana zinapatikana kwa majaribio
- Kubadilishana kwa ujumbe wa JSON-RPC kwa mafanikio
- Majibu ya zana yanaonyeshwa kwenye kiolesura

### Masuala ya kawaida na suluhisho

**Seva haianzi:**
- Angalia kama utegemezi wote umewekwa: `pip install mcp`
- Hakikisha sintaksia ya Python na upangaji ni sahihi
- Angalia ujumbe wa makosa kwenye koni

**Zana haziwezi kuonekana:**
- Hakikisha decorators `@server.tool()` zipo
- Hakikisha zana zimeelezwa kabla ya `main()`
- Thibitisha seva imewekwa vizuri

**Matatizo ya muunganisho:**
- Hakikisha seva inatumia usafirishaji wa stdio kwa usahihi
- Hakikisha hakuna michakato mingine inayozusha usumbufu
- Angalia matumizi ya amri ya Inspector ni sahihi

## Kazi ya nyumbani

Jaribu kuongeza uwezo zaidi kwa seva yako. Angalia [ukurasa huu](https://api.chucknorris.io/) kwa mfano, ongeza zana inayopiga API. Uamuzi uko kwako jinsi seva inavyotakiwa kuonekana. Furahia :)

## Suluhisho

[Suluhisho](./solution/README.md) Hapa ni suluhisho linalowezekana na msimbo unaofanya kazi.

## Muhimu wa Kumbuka

Mambo muhimu ya kukumbuka katika sura hii ni:

- Usafirishaji wa stdio ndio njia inayopendekezwa kwa seva za MCP za ndani.
- Usafirishaji wa stdio unaruhusu mawasiliano rahisi kati ya seva za MCP na wateja kwa kutumia mtiririko wa ingizo na matokeo wa kawaida.
- Unaweza kutumia Inspector pamoja na Visual Studio Code moja kwa moja kutumia seva za stdio, kuwezesha ufafanuzi kosa na ushirikiano rahisi.

## Sampuli 

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python) 

## Rasilimali Zaidi

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Nini Kinachofuata

## Hatua Zifuatazo

Sasa umejifunza jinsi ya kujenga seva za MCP kwa usafirishaji wa stdio, unaweza kuchunguza mada za hali ya juu zaidi:

- **Ifuatayo**: [HTTP Streaming na MCP (Streamable HTTP)](../06-http-streaming/README.md) - Jifunze kuhusu usafirishaji mwingine unaoungwa mkono kwa seva za mbali
- **Juu Zaidi**: [MCP Usalama Mazoea Bora](../../02-Security/README.md) - Tekeleza usalama kwenye seva zako za MCP
- **Kutengenezwa**: [Mikakati ya Kuwasambaza](../09-deployment/README.md) - Sambaza seva zako kwa matumizi ya uzalishaji

## Rasilimali Zaidi

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Maelezo rasmi
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk) - Marejeleo ya SDK kwa lugha zote
- [Mifano ya Jamii](../../06-CommunityContributions/README.md) - Mifano zaidi ya seva kutoka jamii

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->