# MCP Сървър със stdio Транспорт

> **⚠️ Важна актуализация**: От MCP Спецификация 2025-06-18, самостоятелният SSE (Server-Sent Events) транспорт е **отказан** и заменен с транспорт "Streamable HTTP". Текущата MCP спецификация дефинира два основни транспортни механизма:
> 1. **stdio** - Стандартен вход/изход (препоръчително за локални сървъри)
> 2. **Streamable HTTP** - За отдалечени сървъри, които могат да използват SSE вътрешно
>
> Този урок е обновен, за да се фокусира върху **stdio транспорта**, който е препоръчителният подход за повечето MCP сървърни реализации.

stdio транспортът позволява на MCP сървърите да комуникират с клиентите чрез стандартни входни и изходни потоци. Това е най-често използваният и препоръчван транспортен механизъм в настоящата MCP спецификация, осигурявайки прост и ефективен начин за изграждане на MCP сървъри, които лесно могат да бъдат интегрирани с различни клиентски приложения.

## Преглед

Този урок обхваща как да създадем и ползваме MCP сървъри, използвайки stdio транспорта.

## Учебни цели

Към края на този урок ще можете да:

- Създавате MCP сървър, използвайки stdio транспорта.
- Отстранявате грешки на MCP сървър чрез Inspector.
- Ползвате MCP сървър с Visual Studio Code.
- Разбирате текущите MCP транспортни механизми и защо stdio е препоръчван.

## stdio Транспорт - Как работи

stdio транспортът е един от двата поддържани транспортни типа в настоящата MCP спецификация (2025-11-25). Ето как работи:

- **Проста комуникация**: Сървърът чете JSON-RPC съобщения от стандартен вход (`stdin`) и изпраща съобщения към стандартен изход (`stdout`).
- **Базирано на процеси**: Клиентът стартира MCP сървъра като подпроцес.
- **Формат на съобщенията**: Съобщенията са отделни JSON-RPC заявки, нотификации или отговори, разделени с нови редове.
- **Логване**: Сървърът МОЖЕ да пише UTF-8 низове в стандартна грешка (`stderr`) с цел логване.

### Основни изисквания:
- Съобщенията ТРЯБВА да са разделени с нови редове и НЕ ТРЯБВА да съдържат вградени нови редове
- Сървърът НЕ ТРЯБВА да пише нищо в `stdout`, което не е валидно MCP съобщение
- Клиентът НЕ ТРЯБВА да пише нищо в `stdin` на сървъра, което не е валидно MCP съобщение

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

В предходния код:

- Импортираме класа `Server` и `StdioServerTransport` от MCP SDK
- Създаваме инстанция на сървър с базова конфигурация и възможности
- Създаваме инстанция на `StdioServerTransport` и свързваме сървъра с него, позволявайки комуникация през stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Създайте инстанция на сървъра
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

В предходния код:

- Създаваме инстанция на сървър чрез MCP SDK
- Дефинираме инструменти чрез декоратори
- Използваме контекстния мениджър stdio_server за управление на транспорта

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

Основната разлика от SSE е, че stdio сървърите:

- Не изискват настройка на уеб сървър или HTTP крайни точки
- Се стартират като подпроцеси от клиента
- Комуникират чрез stdin/stdout потоци
- Са по-прости за имплементация и отстраняване на грешки

## Упражнение: Създаване на stdio Сървър

За да създадем нашия сървър, трябва да имаме предвид две неща:

- Трябва да използваме уеб сървър, който да изложи крайни точки за връзка и съобщения.

## Лаборатория: Създаване на прост MCP stdio сървър

В тази лаборатория ще създадем прост MCP сървър, използвайки препоръчвания stdio транспорт. Този сървър ще изложи инструменти, които клиентите могат да извикват чрез стандартния Model Context Protocol.

### Изисквания

- Python 3.8 или по-нова версия
- MCP Python SDK: `pip install mcp`
- Основни познания по асинхронно програмиране

Нека започнем със създаването на първия ни MCP stdio сървър:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Конфигуриране на регистрацията
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Създаване на сървъра
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
    # Използване на stdio транспорт
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Основни разлики от отказания SSE подход

**Stdio Транспорт (Текущ стандарт):**
- Прост модел с подпроцеси - клиентът стартира сървъра като дъщерен процес
- Комуникация чрез stdin/stdout с JSON-RPC съобщения
- Не се изисква настройка на HTTP сървър
- По-добра производителност и сигурност
- По-лесен дебъг и разработка

**SSE Транспорт (Отказан от MCP 2025-06-18):**
- Изисква HTTP сървър с SSE крайни точки
- По-сложна настройка с уеб инфраструктура
- Допълнителни съображения за сигурност при HTTP крайни точки
- Сега заменен от Streamable HTTP за уеб-базирани сценарии

### Създаване на сървър със stdio транспорт

За да създадем нашия stdio сървър, трябва да:

1. **Импортираме нужните библиотеки** - Необходими са MCP сървърни компоненти и stdio транспорт
2. **Създадем инстанция на сървъра** - Дефинираме сървъра с неговите възможности
3. **Дефинираме инструменти** - Добавяме функционалността, която искаме да изложим
4. **Настроим транспорта** - Конфигурираме stdio комуникацията
5. **Стартираме сървъра** - Започваме сървъра и обработваме съобщенията

Нека го изградим стъпка по стъпка:

### Стъпка 1: Създаване на базов stdio сървър

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Конфигуриране на логването
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Създаване на сървъра
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

### Стъпка 2: Добавяне на още инструменти

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

### Стъпка 3: Стартиране на сървъра

Запазете кода като `server.py` и го стартирайте от командния ред:

```bash
python server.py
```

Сървърът ще се стартира и ще изчака вход от stdin. Комуникацията се осъществява чрез JSON-RPC съобщения върху stdio транспорта.

### Стъпка 4: Тестване с Inspector

Можете да тествате сървъра с MCP Inspector:

1. Инсталирайте Inspector: `npx @modelcontextprotocol/inspector`
2. Стартирайте Inspector и го насочете към вашия сървър
3. Тествайте създадените инструменти

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Отстраняване на грешки в stdio сървъра

### Използване на MCP Inspector

MCP Inspector е ценен инструмент за отстраняване на грешки и тестване на MCP сървъри. Ето как да го използвате със вашия stdio сървър:

1. **Инсталиране на Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Стартиране на Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Тестване на сървъра**: Inspector осигурява уеб интерфейс, където можете да:
   - Виждате възможностите на сървъра
   - Тествате инструментите с различни параметри
   - Следите JSON-RPC съобщения
   - Отстранявате проблеми с връзката

### Използване на VS Code

Можете да отстранявате грешки в MCP сървъра си директно в VS Code:

1. Създайте конфигурация за стартиране в `.vscode/launch.json`:
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

2. Поставете точки на прекъсване в кода на сървъра
3. Стартирайте дебъгера и тествайте с Inspector

### Често срещани съвети за отстраняване на грешки

- Използвайте `stderr` за логване - никога не пишете в `stdout`, тъй като е за MCP съобщения
- Убедете се, че всички JSON-RPC съобщения са разделени с нови редове
- Тествайте първо с прости инструменти преди да добавяте сложна функционалност
- Използвайте Inspector, за да проверите форматите на съобщенията

## Ползване на stdio сървъра в VS Code

След като сте създали MCP stdio сървъра, можете да го интегрирате с VS Code за използване с Claude или други съвместими MCP клиенти.

### Конфигурация

1. **Създайте MCP конфигурационен файл** на `%APPDATA%\Claude\claude_desktop_config.json` (Windows) или `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Рестартирайте Claude**: Затворете и стартирайте отново Claude, за да зареди новата сървърна конфигурация.

3. **Тествайте връзката**: Стартирайте разговор с Claude и тествайте инструментите на сървъра:
   - "Можеш ли да ме поздравиш с инструмента за поздрав?"
   - "Изчисли сумата на 15 и 27"
   - "Каква е информацията за сървъра?"

### TypeScript пример за stdio сървър

Ето пълен TypeScript пример за справка:

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

// Добавяне на инструменти
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

### .NET пример за stdio сървър

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

## Обобщение

В този обновен урок научихте как да:

- Създавате MCP сървъри, използвайки текущия **stdio транспорт** (препоръчителен подход)
- Разбирате защо SSE транспортът е отказан в полза на stdio и Streamable HTTP
- Създавате инструменти, които MCP клиентите могат да извикват
- Отстранявате грешки на сървъра чрез MCP Inspector
- Интегрирате stdio сървъра с VS Code и Claude

stdio транспортът осигурява по-прост, по-сигурен и по-производителен начин за създаване на MCP сървъри в сравнение с отказания SSE подход. Той е препоръчваният транспорт за повечето MCP сървърни реализации към спецификацията от 2025-06-18.

### .NET

1. Нека първо създадем някои инструменти, за това ще създадем файл *Tools.cs* със следното съдържание:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Упражнение: Тестване на вашия stdio сървър

Сега, след като сте създали stdio сървъра, нека го тестваме, за да сме сигурни, че работи правилно.

### Изисквания

1. Уверете се, че имате инсталиран MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Вашият сървърен код трябва да е запазен (напр. като `server.py`)

### Тестване с Inspector

1. **Стартирайте Inspector с вашия сървър**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Отворете уеб интерфейса**: Inspector ще отвори браузър, показващ възможностите на сървъра.

3. **Тествайте инструментите**: 
   - Изпробвайте инструмента `get_greeting` с различни имена
   - Тествайте `calculate_sum` с различни числа
   - Извикайте `get_server_info` за да видите метаданните на сървъра

4. **Следете комуникацията**: Inspector показва JSON-RPC съобщенията, обменяни между клиент и сървър.

### Какво трябва да видите

Когато сървърът стартира правилно, трябва да видите:
- Възможностите на сървъра, изброени в Inspector
- Инструменти, налични за тестване
- Успешен обмен на JSON-RPC съобщения
- Отговори от инструментите, показани в интерфейса

### Чести проблеми и решения

**Сървърът не стартира:**
- Проверете дали всички зависимости са инсталирани: `pip install mcp`
- Проверете синтаксиса и отстъпите в Python кода
- Потърсете съобщения за грешки в конзолата

**Инструментите не се появяват:**
- Убедете се, че сте добавили `@server.tool()` декораторите
- Проверете дали функциите за инструменти са дефинирани преди `main()`
- Проверьте дали сървърът е правилно конфигуриран

**Проблеми с връзката:**
- Убедете се, че сървърът използва правилно stdio транспорта
- Проверете дали няма други процеси, които пречат
- Проверете синтаксиса на командата за Inspector

## Задача

Опитайте да разширите сървъра с повече възможности. Вижте [тази страница](https://api.chucknorris.io/) за пример, как да добавите инструмент, който извиква API. Решете сами как да изглежда сървърът. Забавлявайте се :)
## Решение

[Решение](./solution/README.md) Ето едно възможно решение с работещ код.

## Основни изводи

Основните изводи от тази глава са следните:

- stdio транспортът е препоръчваният механизъм за локални MCP сървъри.
- stdio транспортът позволява безпроблемна комуникация между MCP сървъри и клиенти чрез стандартни вход и изход.
- Можете да използвате както Inspector, така и Visual Studio Code за директна консумация на stdio сървъри, което прави дебъгирането и интеграцията лесни.

## Примери

- [Java калкулатор](../samples/java/calculator/README.md)
- [.Net калкулатор](../../../../03-GettingStarted/samples/csharp)
- [JavaScript калкулатор](../samples/javascript/README.md)
- [TypeScript калкулатор](../samples/typescript/README.md)
- [Python калкулатор](../../../../03-GettingStarted/samples/python) 

## Допълнителни ресурси

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Какво следва

## Следващи стъпки

След като научихте как да създавате MCP сървъри със stdio транспорта, можете да разгледате по-напреднали теми:

- **Следващо**: [HTTP Streaming с MCP (Streamable HTTP)](../06-http-streaming/README.md) - Научете за другия поддържан транспортен механизъм за отдалечени сървъри
- **Разширено**: [Най-добри практики за сигурност в MCP](../../02-Security/README.md) - Имплементиране на сигурност в MCP сървърите
- **Продакшън**: [Стратегии за внедряване](../09-deployment/README.md) - Разгръщане на сървъри за продукционна среда

## Допълнителни ресурси

- [MCP Спецификация 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Официална спецификация
- [MCP SDK Документация](https://github.com/modelcontextprotocol/sdk) - Референции за SDK за всички езици
- [Общностни примери](../../06-CommunityContributions/README.md) - Още сървърни примери от общността

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->