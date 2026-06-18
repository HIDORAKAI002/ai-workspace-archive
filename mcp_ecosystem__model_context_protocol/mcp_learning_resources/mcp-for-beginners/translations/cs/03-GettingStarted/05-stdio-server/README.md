# MCP server se stdio transportem

> **⚠️ Důležitá aktualizace**: Od specifikace MCP 2025-06-18 byl samostatný SSE (Server-Sent Events) transport **zrušen** a nahrazen transportem "Streamable HTTP". Současná MCP specifikace definuje dva primární transportní mechanismy:
> 1. **stdio** - Standardní vstup/výstup (doporučeno pro lokální servery)
> 2. **Streamable HTTP** - Pro vzdálené servery, které mohou interně používat SSE
>
> Tato lekce byla aktualizována s důrazem na **stdio transport**, který je doporučeným přístupem pro většinu implementací MCP serverů.

Stdion transport umožňuje MCP serverům komunikovat s klienty prostřednictvím standardních vstupních a výstupních proudů. Jedná se o nejčastěji používaný a doporučený transportní mechanismus v aktuální specifikaci MCP, který poskytuje jednoduchý a efektivní způsob, jak vytvářet MCP servery snadno integrovatelné s různými klientskými aplikacemi.

## Přehled

Tato lekce popisuje, jak vytvářet a používat MCP servery pomocí stdio transportu.

## Výukové cíle

Na konci této lekce budete schopni:

- Vytvořit MCP server pomocí stdio transportu.
- Ladit MCP server pomocí Inspektoru.
- Používat MCP server ve Visual Studio Code.
- Rozumět současným MCP transportním mechanismům a důvodu, proč je stdio doporučováno.


## stdio transport - Jak to funguje

Stdion transport je jedním ze dvou podporovaných transportních typů v aktuální MCP specifikaci (2025-11-25). Funguje takto:

- **Jednoduchá komunikace**: Server čte JSON-RPC zprávy z standardního vstupu (`stdin`) a posílá zprávy do standardního výstupu (`stdout`).
- **Procesový model**: Klient spouští MCP server jako podproces.
- **Formát zpráv**: Zprávy jsou jednotlivé JSON-RPC požadavky, notifikace nebo odpovědi oddělené novými řádky.
- **Logování**: Server MŮŽE zapisovat UTF-8 řetězce do standardního chybového výstupu (`stderr`) pro účely logování.

### Klíčové požadavky:
- Zprávy MUSÍ být odděleny novými řádky a NESMÍ obsahovat vložené nové řádky
- Server NESMÍ zapisovat do `stdout` nic, co není platná MCP zpráva
- Klient NESMÍ zapisovat do `stdin` serveru nic, co není platná MCP zpráva

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

V uvedeném kódu:

- Importujeme třídu `Server` a `StdioServerTransport` z MCP SDK
- Vytvoříme instanci serveru se základní konfigurací a schopnostmi
- Vytvoříme instanci `StdioServerTransport` a připojíme k ní server, což umožňuje komunikaci přes stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Vytvořit instanci serveru
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

V uvedeném kódu:

- Vytvoříme instanci serveru pomocí MCP SDK
- Definujeme nástroje pomocí dekorátorů
- Používáme kontextový manažer stdio_server pro správu transportu

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

Klíčový rozdíl oproti SSE je, že stdio servery:

- Nepotřebují nastavení webového serveru ani HTTP endpointů
- Jsou spouštěny klientem jako podprocesy
- Komunikují přes stdin/stdout proudy
- Jsou jednodušší na implementaci a ladění

## Cvičení: Vytvoření stdio serveru

K vytvoření našeho serveru potřebujeme mít na paměti dvě věci:

- Potřebujeme použít webový server k vystavení endpointů pro připojení a zprávy.
## Lab: Vytvoření jednoduchého MCP stdio serveru

V tomto labu vytvoříme jednoduchý MCP server používající doporučený stdio transport. Tento server bude vystavovat nástroje, které mohou klienti volat pomocí standardního Model Context Protocolu.

### Požadavky

- Python 3.8 nebo novější
- MCP Python SDK: `pip install mcp`
- Základní znalost asynchronního programování

Začněme vytvořením našeho prvního MCP stdio serveru:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Nastavit protokolování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Vytvořit server
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
    # Použít stdio přenos
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Klíčové rozdíly oproti zastaralému SSE přístupu

**Stdio transport (aktuální standard):**
- Jednoduchý model podprocesu – klient spouští server jako dětský proces
- Komunikace přes stdin/stdout pomocí JSON-RPC zpráv
- Nepotřebuje nastavení HTTP serveru
- Lepší výkon a bezpečnost
- Snazší ladění a vývoj

**SSE transport (zrušeno od MCP 2025-06-18):**
- Vyžadoval HTTP server s SSE endpointy
- Složitější nastavení s webovou serverovou infrastrukturou
- Další bezpečnostní požadavky na HTTP endpointy
- Nyní nahrazen Streamable HTTP pro webové scénáře

### Vytvoření serveru se stdio transportem

Pro vytvoření našeho stdio serveru je potřeba:

1. **Importovat potřebné knihovny** – Potřebujeme komponenty MCP serveru a stdio transportu
2. **Vytvořit instanci serveru** – Definovat server s jeho schopnostmi
3. **Definovat nástroje** – Přidat funkce, které chceme zpřístupnit
4. **Nastavit transport** – Nakonfigurovat stdio komunikaci
5. **Spustit server** – Server spustit a zpracovávat zprávy

Pojďme to stavět krok po kroku:

### Krok 1: Vytvoření základního stdio serveru

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Nastavit protokolování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Vytvořit server
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

### Krok 2: Přidání dalších nástrojů

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

### Krok 3: Spuštění serveru

Uložte kód jako `server.py` a spusťte ho z příkazové řádky:

```bash
python server.py
```

Server se spustí a bude čekat na vstup z stdin. Komunikuje pomocí JSON-RPC zpráv přes stdio transport.

### Krok 4: Testování pomocí Inspektora

Můžete si otestovat váš server pomocí MCP Inspektora:

1. Nainstalujte Inspektora: `npx @modelcontextprotocol/inspector`
2. Spusťte Inspektora a nasměrujte ho na váš server
3. Otestujte nástroje, které jste vytvořili

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Ladění vašeho stdio serveru

### Použití MCP Inspektora

MCP Inspektor je užitečný nástroj pro ladění a testování MCP serverů. Jak ho používat se stdio serverem:

1. **Nainstalujte Inspektora**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Spusťte Inspektora**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Otestujte server**: Inspektor nabízí webové rozhraní, kde můžete:
   - Zobrazit schopnosti serveru
   - Testovat nástroje s různými parametry
   - Sledovat JSON-RPC zprávy
   - Ladit problémy s připojením

### Použití VS Code

Můžete také ladit váš MCP server přímo ve VS Code:

1. Vytvořte launch konfiguraci v `.vscode/launch.json`:
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

2. Nastavte breakpointy v kódu serveru
3. Spusťte debugger a testujte s Inspektorem

### Běžné tipy pro ladění

- Používejte `stderr` pro logování – nikdy nezapisujte do `stdout`, protože je vyhrazen pro MCP zprávy
- Ujistěte se, že všechny JSON-RPC zprávy jsou oddělené novými řádky
- Nejprve testujte jednoduché nástroje před přidáním složitější funkcionality
- Používejte Inspektora pro ověření formátu zpráv

## Použití vašeho stdio serveru ve VS Code

Jakmile vytvoříte svůj MCP stdio server, můžete ho integrovat s VS Code pro použití s Claude nebo jinými MCP kompatibilními klienty.

### Konfigurace

1. **Vytvořte MCP konfigurační soubor** v `%APPDATA%\Claude\claude_desktop_config.json` (Windows) nebo `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Restartujte Claude**: Zavřete a znovu otevřete Claude pro načtení nové konfigurace serveru.

3. **Otestujte připojení**: Začněte konverzaci s Claude a vyzkoušejte nástroje vašeho serveru:
   - „Můžeš mě pozdravit pomocí nástroje greet?“
   - „Spočítej součet 15 a 27“
   - „Jaké jsou informace o serveru?“

### Příklad TypeScript stdio serveru

Zde je kompletní příklad v TypeScriptu pro referenci:

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

// Přidat nástroje
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

### Příklad .NET stdio serveru

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

## Shrnutí

V této aktualizované lekci jste se naučili:

- Vytvářet MCP servery pomocí současného **stdio transportu** (doporučený přístup)
- Pochopit, proč byl SSE transport zrušen ve prospěch stdio a Streamable HTTP
- Vytvářet nástroje, které mohou klienti MCP volat
- Ladit svůj server pomocí MCP Inspektora
- Integrovat svůj stdio server s VS Code a Claude

Stdion transport poskytuje jednodušší, bezpečnější a výkonnější způsob, jak vytvářet MCP servery ve srovnání se zrušeným přístupem SSE. Je doporučeným transportem pro většinu MCP serverových implementací od specifikace 2025-06-18.


### .NET

1. Nejprve vytvoříme některé nástroje, k tomu vytvoříme soubor *Tools.cs* s následujícím obsahem:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Cvičení: Testování vašeho stdio serveru

Nyní, když jste vytvořili svůj stdio server, otestujeme ho, abychom se ujistili, že funguje správně.

### Požadavky

1. Ujistěte se, že máte nainstalovaný MCP Inspektor:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Váš serverový kód by měl být uložen (např. jako `server.py`)

### Testování pomocí Inspektora

1. **Spusťte Inspektora s vaším serverem**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Otevřete webové rozhraní**: Inspektor otevře okno prohlížeče, kde uvidíte schopnosti vašeho serveru.

3. **Otestujte nástroje**: 
   - Vyzkoušejte nástroj `get_greeting` s různými jmény
   - Otestujte `calculate_sum` s různými čísly
   - Zavolejte nástroj `get_server_info` pro zobrazení metadat serveru

4. **Sledujte komunikaci**: Inspektor zobrazuje JSON-RPC zprávy vyměňované mezi klientem a serverem.

### Co byste měli vidět

Když se server správně spustí, měli byste vidět:
- Výpis schopností serveru v Inspektoru
- Dostupné nástroje pro testování
- Úspěšné výměny JSON-RPC zpráv
- Zobrazené odpovědi nástrojů v rozhraní

### Běžné problémy a řešení

**Server se nespustí:**
- Zkontrolujte, že jsou všechny závislosti nainstalované: `pip install mcp`
- Ověřte správnost syntaxe Pythonu a odsazení
- Sledujte chybové zprávy v konzoli

**Nástroje se nezobrazují:**
- Ujistěte se, že jsou použity dekorátory `@server.tool()`
- Kontrolujte, jestli jsou funkce nástrojů definovány před `main()`
- Ověřte, že je server správně nakonfigurován

**Problémy s připojením:**
- Ujistěte se, že server používá stdio transport správně
- Zkontrolujte, zda žádný jiný proces nezasahuje do portů
- Ověřte syntax příkazu, kterým spouštíte Inspektora

## Zadání

Zkuste rozšířit server o více funkcionalit. Podívejte se na [tuto stránku](https://api.chucknorris.io/), například přidejte nástroj, který volá API. Vy rozhodnete, jak by měl server vypadat. Hodně štěstí :)
## Řešení

[Řešení](./solution/README.md) Zde je možné řešení s funkčním kódem.

## Hlavní poznatky

Hlavní poznatky z této kapitoly jsou:

- Stdio transport je doporučený mechanismus pro lokální MCP servery.
- Stdio transport umožňuje bezproblémovou komunikaci mezi MCP servery a klienty pomocí standardních vstupních a výstupních proudů.
- Pro spotřebu stdio serverů můžete používat jak Inspektora, tak Visual Studio Code, což usnadňuje ladění a integraci.

## Ukázky

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python) 

## Další zdroje

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Co dál

## Další kroky

Nyní, když jste se naučili vytvářet MCP servery se stdio transportem, můžete prozkoumat pokročilejší témata:

- **Další**: [HTTP streaming s MCP (Streamable HTTP)](../06-http-streaming/README.md) - Naučte se o dalším podporovaném transportním mechanismu pro vzdálené servery
- **Pokročilé**: [Bezpečnostní postupy MCP](../../02-Security/README.md) - Implementace bezpečnosti ve vašich MCP serverech
- **Provoz**: [Strategie nasazení](../09-deployment/README.md) - Nasazení serverů pro produkční použití

## Další zdroje

- [MCP Specifikace 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Oficiální specifikace
- [Dokumentace MCP SDK](https://github.com/modelcontextprotocol/sdk) - Reference SDK pro všechny jazyky
- [Příklady z komunity](../../06-CommunityContributions/README.md) - Další příklady serverů od komunity

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->