# MCP сервер са stdio транспортом

> **⚠️ Важна напомена**: Од MCP спецификације 2025-06-18, самостални SSE (Server-Sent Events) транспорт је **застарео** и замењен је са "Streamable HTTP" транспортом. Тренутна MCP спецификација дефинише два главна транспортна механизма:
> 1. **stdio** - Стандардни улаз/излаз (препоручено за локалне сервере)
> 2. **Streamable HTTP** - За удаљене сервере који могу користити SSE интерно
>
> Ова лекција је ажурирана да се фокусира на **stdio транспорт**, који је препоручени приступ за већину MCP серверских имплементација.

Stdio транспорт омогућава MCP серверима комуникацију са клијентима преко стандардних улазних и излазних токова. Ово је најчешће коришћени и препоручени транспортни механизам у тренутној MCP спецификацији, пружајући једноставан и ефикасан начин за изградњу MCP сервера који се лако могу интегрисати са различитим клијентским апликацијама.

## Преглед

Ова лекција покрива како изградити и користити MCP сервере користећи stdio транспорт.

## Циљеви учења

На крају ове лекције, моћи ћете да:

- Изградите MCP сервер користећи stdio транспорт.
- Откажете грешке (debug) MCP сервера користећи Inspector.
- Користите MCP сервер у Visual Studio Code-у.
- Разумете тренутне MCP транспортне механизме и зашто је stdio препоручен.

## stdio транспорт - како ради

Stdio транспорт је један од два подржана транспортна типа у тренутној MCP спецификацији (2025-11-25). Ево како функционише:

- **Једноставна комуникација**: сервер чита JSON-RPC поруке са стандардног улаза (`stdin`) и шаље поруке на стандардни излаз (`stdout`).
- **Процес-базирано**: клијент покреће MCP сервер као под-процес.
- **Формат поруке**: поруке су појединачни JSON-RPC захтеви, обавештења или одговори, разграничени новим линијама.
- **Логовање**: сервер МОЖЕ писати UTF-8 низове на стандардну грешку (`stderr`) ради логовања.

### Кључни захтеви:
- Поруке МОРАЈУ бити раздељене новим линијама и НЕ СМЕЈУ садржавати уграђене нове линије
- Сервер НЕ СМЕ писати било шта на `stdout` што није валидна MCP порука
- Клијент НЕ СМЕ писати било шта на серверов `stdin` што није валидна MCP порука

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

У претходном коду:

- Увозимо класу `Server` и `StdioServerTransport` из MCP SDK-а
- Креирамо инстанцу сервера са базичном конфигурацијом и капацитетима
- Креирамо инстанцу `StdioServerTransport` и повезујемо сервер са њим, омогућавајући комуникацију преко stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Креирај инстанцу сервера
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

У претходном коду:

- Креирамо инстанцу сервера користећи MCP SDK
- Дефинишемо алате користећи декораторе
- Користимо stdio_server менаџер контекста за руковање транспортом

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

Кључна разлика у односу на SSE је да stdio сервери:

- Не захтевају подешавање веб сервера или HTTP крајње тачке
- Покрећу се као под-процеси од стране клијента
- Комуницирају преко stdin/stdout токова
- Једноставнији су за имплементацију и отклањање грешака

## Вежба: Креирање stdio сервера

Да бисмо направили наш сервер, треба да имамо две ствари на уму:

- Морамо користити web сервер за излагање крајњих тачака за конекцију и поруке.

## Лабораторија: Креирање једноставног MCP stdio сервера

У овој лабораторији, направићемо једноставан MCP сервер користећи препоручени stdio транспорт. Тај сервер ће излагати алате које клијенти могу позивати користећи стандардни Model Context Protocol.

### Предуслови

- Python 3.8 или новији
- MCP Python SDK: `pip install mcp`
- Основно разумевање асинхроног програмирања

Хајде да почнемо креирањем нашег првог MCP stdio сервера:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Конфигуришите бележење логова
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Креирајте сервер
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
    # Користите stdio транспорт
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```


## Кључне разлике у односу на застарели SSE приступ

**Stdio транспорт (тренутни стандард):**
- Једноставан модел под-процеса - клијент покреће сервер као дете процес
- Комуникација преко stdin/stdout користећи JSON-RPC поруке
- Нема потребе за подешавањем HTTP сервера
- Боља перформанса и безбедност
- Лакше отклањање грешака и развој

**SSE транспорт (застарело од MCP 2025-06-18):**
- Захтеван HTTP сервер са SSE крајњим тачкама
- Комплексније подешавање са веб инфраструктуром
- Додатне безбедносне мере за HTTP крајње тачке
- Сада замењен Streamable HTTP за сценарије базиране на вебу

### Креирање сервера са stdio транспортом

За креирање нашег stdio сервера морамо:

1. **Увести потребне библиотеке** - Потребни су нам MCP серверске компоненте и stdio транспорт
2. **Креирати инстанцу сервера** - Дефинисати сервер са његовим капацитетима
3. **Дефинисати алате** - Додати функционалности које желимо излагати
4. **Подесити транспорт** - Конфигурисати stdio комуникацију
5. **Покренути сервер** - Стартовати сервер и обрађивати поруке

Хајде да градимо корак по корак:

### Корак 1: Креирање основног stdio сервера

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Конфигуришите евиденцију
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Креирајте сервер
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


### Корак 2: Додавање више алата

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


### Корак 3: Покретање сервера

Сачувајте код као `server.py` и покрените га из командне линије:

```bash
python server.py
```

Сервер ће почети и чекати унос са stdin. Комуницира користећи JSON-RPC поруке преко stdio транспорта.

### Корак 4: Тестирање са Inspector-ом

Можете тестирати свој сервер користећи MCP Inspector:

1. Инсталирајте Inspector: `npx @modelcontextprotocol/inspector`
2. Покрените Inspector и усмерите га на свој сервер
3. Тестирајте алате које сте креирали

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```


## Отklanjaње грешака на вашем stdio серверу

### Коришћење MCP Inspector-а

MCP Inspector је вредан алат за отklanjaње грешака и тестирање MCP сервера. Ево како га користити са вашим stdio сервером:

1. **Инсталирајте Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Покрените Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Тестирајте сервер**: Inspector пружа веб интерфејс где можете:
   - Прегледати капацитете сервера
   - Тестирати алате са различитим параметрима
   - Пратити JSON-RPC поруке
   - Отklанјати проблеме са везом

### Коришћење VS Code

Такође можете отklанјати грешке свог MCP сервера директно у VS Code:

1. Креирајте launch конфигурацију у `.vscode/launch.json`:
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

2. Поставите breakpoint-ове у свом serverskom коду
3. Покрените дебагер и тестирајте са Inspector-ом

### Уобичајени савети за отklањање грешака

- Користите `stderr` за логовање - никада не пишите на `stdout` јер је резервиран за MCP поруке
- Осигурајте да све JSON-RPC поруке буду раздвојене новим линијама
- Прво тествајте једноставне алате пре додавања сложеније функционалности
- Користите Inspector да бисте проверили формате порука

## Коришћење вашег stdio сервера у VS Code

Када сте израдили MCP stdio сервер, можете га интегрисати у VS Code како бисте га користили са Claude-ом или другим MCP компатибилним клијентима.

### Конфигурација

1. **Креирајте MCP конфигурациони фајл** на `%APPDATA%\Claude\claude_desktop_config.json` (Windows) или `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Поново покрените Claude**: Затворите и поново покрените Claude да учита нову конфигурацију сервера.

3. **Тестирајте конекцију**: Започните разговор са Claude-ом и покушајте да користите серверске алате:
   - "Можеш ли ми пожелети добродошлицу помоћу алата за поздрав?"
   - "Израчунај збир 15 и 27"
   - "Које су информације о серверу?"

### Пример TypeScript stdio сервера

Ево комплетног TypeScript примера за референцу:

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

// Додај алате
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


### Пример .NET stdio сервера

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


## Резиме

У овој ажурираној лекцији сте научили како да:

- Изградите MCP сервере користећи тренутни **stdio транспорт** (препоручени приступ)
- Разумете зашто је SSE транспорт застарео и замењен stdio и Streamable HTTP
- Креирате алате који могу бити позвани од стране MCP клијената
- Отklањате грешке вашег сервера користећи MCP Inspector
- Интегришете ваш stdio сервер са VS Code-ом и Claude-ом

Stdio транспорт пружа једноставнији, безбеднији и перформантнији начин за изградњу MCP сервера у односу на застарели SSE приступ. То је препоручени транспорт за већину MCP серверских имплементација од спецификације 2025-06-18.

### .NET

1. Прво хајде да креирамо неке алате, за то ћемо направити фајл *Tools.cs* са следећим садржајем:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```


## Вежба: Тестирање вашег stdio сервера

Сада када сте направили свој stdio сервер, хајде да га тестирамо како бисмо били сигурни да ради исправно.

### Предуслови

1. Осигурајте да имате инсталиран MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Ваш серверски код треба бити сачуван (нпр. као `server.py`)

### Тестирање са Inspector-ом

1. **Покрените Inspector са вашим сервером**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Отворите веб интерфејс**: Inspector ће отворити прегледач који приказује капацитете вашег сервера.

3. **Тестирајте алате**:
   - Испробајте алат `get_greeting` са различитим именима
   - Тестирајте алат `calculate_sum` са разним бројевима
   - Позовите алат `get_server_info` да бисте видели метаподатке сервера

4. **Пратите комуникацију**: Inspector приказује JSON-RPC поруке које се размењују између клијента и сервера.

### Шта треба да видите

Када се сервер успешно покрене, требало би да видите:
- Приказане капацитете сервера у Inspector-у
- Алате доступне за тестирање
- Успешну размену JSON-RPC порука
- Приказ одговора алата у интерфејсу

### Уобичајени проблеми и решења

**Сервер неће да се покрене:**
- Проверите да ли су све зависности инсталиране: `pip install mcp`
- Проверите Python синтаксу и уроњење
- Потражите поруке о грешци у конзоли

**Алати се не појављују:**
- Осигурајте да декоратори `@server.tool()` постоје
- Проверите да су функције алата дефинисане пре `main()`
- Уверите се да је сервер исправно конфигурисан

**Проблеми са конекцијом:**
- Проверите да сервер користи правилно stdio транспорт
- Уверите се да други процеси не ометају
- Проверите синтаксу Inspector команде

## Домашћи задатак

Покушајте да проширите ваш сервер са више капацитета. Погледајте [ову страницу](https://api.chucknorris.io/) да, на пример, додате алат који позива неки API. Ви одлучујете како ваш сервер треба да изгледа. Уживајте :)

## Решење

[Решење](./solution/README.md) Ево могућег решења са радним кодом.

## Кључне поуке

Кључне поуке из овог поглавља су следеће:

- stdio транспорт је препоручени механизам за локалне MCP сервере.
- Stdio транспорт омогућава беспрекорну комуникацију између MCP сервера и клијената користећи стандардне улазне и излазне токове.
- Можете користити и Inspector и Visual Studio Code за директно коришћење stdio сервера, што олакшава отklањање грешака и интеграцију.

## Примери

- [Java Калкулатор](../samples/java/calculator/README.md)
- [.Net Калкулатор](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Калкулатор](../samples/javascript/README.md)
- [TypeScript Калкулатор](../samples/typescript/README.md)
- [Python Калкулатор](../../../../03-GettingStarted/samples/python)

## Додатни ресурси

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Шта следи

## Следећи кораци

Сада када сте научили како да градите MCP сервере са stdio транспортом, можете истражити напредније теме:

- **Следеће**: [HTTP Streaming са MCP (Streamable HTTP)](../06-http-streaming/README.md) - Сазнајте о другом подржаном транспортном механизму за удаљене сервере
- **Напредно**: [MCP најбоље праксе безбедности](../../02-Security/README.md) - Имплементирајте безбедност у вашим MCP серверима
- **Продукција**: [Стратегије постављања](../09-deployment/README.md) - Распоредите ваше сервере за продукцијску употребу

## Додатни ресурси

- [MCP спецификација 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Званична спецификација
- [MCP SDK документација](https://github.com/modelcontextprotocol/sdk) - SDK референце за све језике
- [Примери из заједнице](../../06-CommunityContributions/README.md) - Још примера сервера из заједнице

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->