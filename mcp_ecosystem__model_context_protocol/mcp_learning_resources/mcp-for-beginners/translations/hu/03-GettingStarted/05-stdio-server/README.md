# MCP szerver stdio transzporttal

> **⚠️ Fontos frissítés**: Az MCP specifikáció 2025-06-18 alapján a különálló SSE (Server-Sent Events) transzport **elavulttá vált**, helyette a „Streamable HTTP” transzportot vezették be. A jelenlegi MCP specifikáció két elsődleges transzport mechanizmust határoz meg:
> 1. **stdio** - Szabványos bemenet/kimenet (helyi szerverekhez ajánlott)
> 2. **Streamable HTTP** - Távoli szerverekhez, amelyek belsőleg SSE-t használhatnak
>
> Ez a lecke a **stdio transzportra** fókuszál, amely a legtöbb MCP szerver megvalósításhoz ajánlott megközelítés.

A stdio transzport lehetővé teszi az MCP szerverek számára, hogy a klienssel a szabványos bemenet és kimenet segítségével kommunikáljanak. Ez a leggyakrabban használt és ajánlott transzport mechanizmus a jelenlegi MCP specifikációban, mely egyszerű és hatékony módot kínál MCP szerverek építésére, amelyek könnyen integrálhatók különböző kliens alkalmazásokkal.

## Áttekintés

Ez a lecke bemutatja, hogyan lehet MCP szervert építeni és használni stdio transzporttal.

## Tanulási célok

A lecke végére képes leszel:

- MCP szervert építeni stdio transzporttal.
- Hibakeresni egy MCP szervert az Inspectorral.
- Felhasználni egy MCP szervert Visual Studio Code-ból.
- Megérteni a jelenlegi MCP transzport mechanizmusokat és hogy miért ajánlott a stdio.

## stdio transzport - Hogyan működik

A stdio transzport a jelenlegi MCP specifikáció (2025-11-25) két támogatott transzport típusa közül az egyik. Így működik:

- **Egyszerű kommunikáció**: A szerver JSON-RPC üzeneteket olvas a szabványos bemenetről (`stdin`) és üzeneteket küld a szabványos kimenetre (`stdout`).
- **Folyamat alapú**: A kliens alfolyamatként indítja az MCP szervert.
- **Üzenetformátum**: Az üzenetek egyedi JSON-RPC kérések, értesítések vagy válaszok, amelyek új sorral vannak elválasztva.
- **Naplózás**: A szerver LEHETŐSÉG szerint UTF-8 stringeket írhat a szabványos hiba kimenetre (`stderr`) naplózási célból.

### Fő követelmények:
- Az üzeneteket új sorral kell elválasztani, és nem tartalmazhatnak beágyazott új sorokat
- A szerver NEM írhat a `stdout`-ra nem érvényes MCP üzenetet
- A kliens NEM írhat a szerver `stdin`-jére nem érvényes MCP üzenetet

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

Az előző kódban:

- importáljuk a `Server` osztályt és a `StdioServerTransport`-ot az MCP SDK-ból
- létrehozunk egy szerver példányt alap konfigurációval és képességekkel
- létrehozunk egy `StdioServerTransport` példányt és összekapcsoljuk a szervert vele, lehetővé téve a kommunikációt stdin/stdout-on keresztül

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Szerver példány létrehozása
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

Az előző kódban:

- létrehozunk egy szerver példányt az MCP SDK használatával
- eszközöket definiálunk dekorátorokkal
- a stdio_server kontextusmenedzsert használjuk a transzport kezelésére

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

Az SSE-vel szembeni fő különbség, hogy a stdio szerverek:

- nem igényelnek webszerver beállítást vagy HTTP végpontokat
- a kliens alfolyamatként indítja őket
- a stdin/stdout csatornákon keresztül kommunikálnak
- egyszerűbbek a megvalósításban és hibakeresésben

## Gyakorlat: stdio szerver létrehozása

Szerverünk létrehozásához két dolgot kell szem előtt tartanunk:

- Webszervert kell használnunk végpontok megosztásához a csatlakozáshoz és üzenetekhez.

## Labor: Egyszerű MCP stdio szerver készítése

Ebben a laborban egy egyszerű MCP szervert hozunk létre az ajánlott stdio transzport használatával. Ez a szerver olyan eszközöket fog megosztani, amelyeket a kliensek a szabványos Model Context Protocol segítségével hívhatnak.

### Előfeltételek

- Python 3.8 vagy újabb
- MCP Python SDK: `pip install mcp`
- Alapvető aszinkron programozási ismeretek

Kezdjük első MCP stdio szerverünk megalkotásával:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Naplózás konfigurálása
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Szerver létrehozása
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
    # stdio szállítás használata
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Fő különbségek az elavult SSE megközelítéstől

**Stdio transzport (jelenlegi szabvány):**
- Egyszerű alfolyamat modell – a kliens alfolyamként indítja a szervert
- Kommunikáció stdin/stdout-on keresztül JSON-RPC üzenetekkel
- Nincs szükség HTTP szerver beállításra
- Jobb teljesítmény és biztonság
- Könnyebb hibakeresés és fejlesztés

**SSE transzport (elavult MCP 2025-06-18-tól):**
- HTTP szerver szükséges SSE végpontokkal
- Összetettebb webszerver infrastruktúra beállítás
- További biztonsági szempontok HTTP végpontoknál
- Web alapú esetekre helyette a Streamable HTTP-t használjuk

### Szerver létrehozása stdio transzporttal

Szerverünk létrehozásához a következőket kell tennünk:

1. **Szükséges könyvtárak importálása** – Szükségünk van az MCP szerver komponensekre és stdio transzportra
2. **Szerver példány létrehozása** – Definiáljuk a szervert a képességeivel együtt
3. **Eszközök definiálása** – Hozzáadjuk a megosztani kívánt funkcionalitást
4. **Transzport beállítása** – Konfiguráljuk a stdio kommunikációt
5. **Szerver futtatása** – Elindítjuk a szervert és kezeljük az üzeneteket

Építsük ezt lépésről lépésre:

### 1. lépés: Alap stdio szerver készítése

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Naplózás konfigurálása
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Szerver létrehozása
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

### 2. lépés: További eszközök hozzáadása

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

### 3. lépés: A szerver futtatása

Mentse el a kódot `server.py` néven, majd futtassa a parancssorból:

```bash
python server.py
```

A szerver elindul és várakozik a stdin bemenetre. JSON-RPC üzenetekkel kommunikál a stdio transzport felett.

### 4. lépés: Tesztelés az Inspector segítségével

Tesztelheti szerverét az MCP Inspector használatával:

1. Telepítse az Inspectort: `npx @modelcontextprotocol/inspector`
2. Indítsa el az Inspectort és irányítsa a szerverére
3. Tesztelje az elkészített eszközöket

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```


## Hibakeresés stdio szerverrel

### MCP Inspector használata

Az MCP Inspector értékes eszköz MCP szerverek hibakeresésére és tesztelésére. Így használhatja stdio szerverrel:

1. **Inspector telepítése**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Inspector futtatása**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Tesztelje a szervert**: Az Inspector webes felületet biztosít, ahol:
   - Megtekintheti a szerver képességeit
   - Különböző paraméterekkel tesztelheti az eszközöket
   - Figyelheti a JSON-RPC üzeneteket
   - Hibakeresheti a kapcsolati problémákat

### VS Code használata

Közvetlenül a VS Code-ban is hibakeresheti MCP szerverét:

1. Hozzon létre indítási konfigurációt a `.vscode/launch.json` fájlban:
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

2. Helyezzen el töréspontokat a szerver kódban
3. Indítsa el a hibakeresőt és teszteljen az Inspectorral

### Gyakori hibakeresési tippek

- Használja a `stderr`-t naplózásra – soha ne írjon a `stdout`-ra, mert az MCP üzenetekre fenntartott
- Győződjön meg arról, hogy minden JSON-RPC üzenet új sorral van elválasztva
- Először egyszerű eszközökkel teszteljen, mielőtt összetett funkciókat ad hozzá
- Az Inspector segítségével ellenőrizze az üzenetformátumot

## stdio szerver használata VS Code-ban

Miután elkészítette MCP stdio szerverét, integrálhatja azt VS Code-dal, hogy Claude vagy más MCP-kompatibilis kliensekkel használhassa.

### Konfiguráció

1. **Hozzon létre egy MCP konfigurációs fájlt** a `%APPDATA%\Claude\claude_desktop_config.json` (Windows) vagy `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) helyen:

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

2. **Indítsa újra Claude-ot**: Zárja be és nyissa meg újra Claude-ot, hogy betöltse az új szerver konfigurációt.

3. **Tesztelje a kapcsolatot**: Indítson beszélgetést Claude-dal és próbálja ki a szerver eszközeit:
   - „Tudsz köszönteni a köszöntő eszközzel?”
   - „Számold ki a 15 és 27 összegét”
   - „Mi a szerver info?”

### TypeScript stdio szerver példa

Íme egy teljes TypeScript példa referenciaként:

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

// Eszközök hozzáadása
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

### .NET stdio szerver példa

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

## Összefoglaló

Ebben a frissített leckében megtanultad, hogyan:

- MCP szervereket építs a jelenlegi **stdio transzport** használatával (ajánlott megközelítés)
- Megértsd, miért váltotta fel a stdio és Streamable HTTP az SSE transzportot
- Eszközöket hozz létre, amelyeket MCP kliensek hívhatnak
- Hibakeresd szervered az MCP Inspectorral
- Integráld stdio szervered VS Code-dal és Claude-dal

A stdio transzport egyszerűbb, biztonságosabb és jobb teljesítményű módot nyújt MCP szerverek építésére az elavult SSE megközelítéshez képest. A 2025-06-18-as specifikáció óta ez a legtöbb MCP szerver megvalósításhoz ajánlott transzport.

### .NET

1. Először készítsünk néhány eszközt, ehhez hozzunk létre egy *Tools.cs* fájlt az alábbi tartalommal:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Gyakorlat: stdio szerver tesztelése

Most, hogy elkészítetted a stdio szervered, teszteljük le, hogy megfelelően működik-e.

### Előfeltételek

1. Győződj meg róla, hogy az MCP Inspector telepítve van:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. A szerver kódjának elmentve kell lennie (pl. `server.py`)

### Tesztelés Inspectorral

1. **Indítsd el az Inspectort a szerverrel**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Nyisd meg a webes felületet**: Az Inspector megnyit egy böngészőablakot, amely megjeleníti a szerver képességeit.

3. **Teszteld az eszközöket**:
   - Próbáld ki a `get_greeting` eszközt különböző nevekkel
   - Teszteld a `calculate_sum` eszközt különféle számokkal
   - Hívd meg a `get_server_info` eszközt a szerver metaadatainak megtekintéséhez

4. **Figyeld a kommunikációt**: Az Inspector mutatja a kliens és szerver közti JSON-RPC üzeneteket.

### Amit látnod kell

Ha a szerver helyesen elindul, a következőket kell látnod:
- A szerver képességei listázva az Inspectorban
- Elérhető eszközök tesztelésre
- Sikeres JSON-RPC üzenetváltások
- Az eszköz válaszai megjelenítve a felületen

### Gyakori problémák és megoldások

**Nem indul a szerver:**
- Ellenőrizd, hogy minden függőség telepítve van: `pip install mcp`
- Ellenőrizd a Python szintaxist és behúzásokat
- Nézd meg a konzolon az esetleges hibákat

**Nem jelennek meg az eszközök:**
- Győződj meg róla, hogy az `@server.tool()` dekorátorok jelen vannak
- Ellenőrizd, hogy az eszköz függvények a `main()` előtt vannak definiálva
- Ellenőrizd, hogy a szerver helyesen van konfigurálva

**Kapcsolati problémák:**
- Bizonyosodj meg arról, hogy a szerver helyesen használja a stdio transzportot
- Ellenőrizd, hogy nem fut más folyamat, ami zavarhatja
- Ellenőrizd az Inspector parancs szintaxisát

## Feladat

Próbáld meg tovább bővíteni a szervered képességeit. Nézd meg [ezt az oldalt](https://api.chucknorris.io/), hogy például hozzáadj egy eszközt, amely egy API-t hív. Te döntöd el, milyen legyen a szerver. Jó szórakozást :)

## Megoldás

[Megoldás](./solution/README.md) Itt egy lehetséges megoldás működő kóddal.

## Főbb pontok

A fejezet legfontosabb tanulságai:

- A stdio transzport az ajánlott mechanizmus helyi MCP szerverekhez.
- A stdio transzport zökkenőmentes kommunikációt biztosít MCP szerverek és kliensek között a szabványos bemenet és kimenet használatával.
- Mind az Inspector, mind a Visual Studio Code közvetlenül képes fogyasztani stdio szervereket, megkönnyítve ezzel a hibakeresést és az integrációt.

## Minták

- [Java számológép](../samples/java/calculator/README.md)
- [.Net számológép](../../../../03-GettingStarted/samples/csharp)
- [JavaScript számológép](../samples/javascript/README.md)
- [TypeScript számológép](../samples/typescript/README.md)
- [Python számológép](../../../../03-GettingStarted/samples/python)

## További források

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Mi következik

## Következő lépések

Most, hogy megtanultad, hogyan kell MCP szervereket készíteni stdio transzporttal, további haladóbb témákat fedezhetsz fel:

- **Következő**: [HTTP Streaming MCP-vel (Streamable HTTP)](../06-http-streaming/README.md) – A másik támogatott transzport mechanizmus távoli szerverekhez
- **Haladó**: [MCP biztonsági legjobb gyakorlatok](../../02-Security/README.md) – Biztonságot megvalósítani MCP szerverekben
- **Éles használat**: [Telepítési stratégiák](../09-deployment/README.md) – Szerverek bevetése termelési környezetben

## További források

- [MCP specifikáció 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) – Hivatalos specifikáció
- [MCP SDK dokumentáció](https://github.com/modelcontextprotocol/sdk) – SDK referencia minden nyelvhez
- [Közösségi példák](../../06-CommunityContributions/README.md) – Több szerver példa a közösségtől

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->