# MCP Server з транспортом stdio

> **⚠️ Важливе оновлення**: Починаючи з MCP Specification 2025-06-18, окремий SSE (Server-Sent Events) транспорт було **виведено з експлуатації** і замінено транспортом "Streamable HTTP". Поточна специфікація MCP визначає два основні механізми транспорту:
> 1. **stdio** - стандартний ввід/вивід (рекомендовано для локальних серверів)
> 2. **Streamable HTTP** - для віддалених серверів, які можуть внутрішньо використовувати SSE
>
> Цей урок оновлено, щоб зосередитися на **stdio транспорті**, який є рекомендованим підходом для більшості реалізацій MCP серверів.

Транспорт stdio дозволяє MCP серверам спілкуватися з клієнтами через стандартні потоки вводу і виводу. Це найчастіше використовуваний та рекомендований механізм транспорту в поточній специфікації MCP, який забезпечує простий і ефективний спосіб будувати MCP сервери, що легко інтегруються з різними клієнтськими застосунками.

## Огляд

Цей урок охоплює, як створювати та використовувати MCP сервери за допомогою транспорту stdio.

## Цілі навчання

До кінця цього уроку ви зможете:

- Створювати MCP сервер з транспортом stdio.
- Відлагоджувати MCP сервер за допомогою Inspector.
- Використовувати MCP сервер у Visual Studio Code.
- Розуміти поточні механізми транспорту MCP і чому рекомендується stdio.

## Транспорт stdio — як це працює

Транспорт stdio — один із двох підтримуваних типів транспорту в поточній специфікації MCP (2025-11-25). Ось як він працює:

- **Проста комунікація:** сервер читає JSON-RPC повідомлення з стандартного вводу (`stdin`) і відправляє повідомлення стандартним виводом (`stdout`).
- **Базується на процесах:** клієнт запускає MCP сервер як підпроцес.
- **Формат повідомлень:** повідомлення — це окремі JSON-RPC запити, нотифікації або відповіді, розділені новими рядками.
- **Логування:** сервер МОЖЕ писати UTF-8 рядки в стандартний помилковий потік (`stderr`) для логування.

### Ключові вимоги:
- Повідомлення ПОВИННІ бути розділені новими рядками і НЕ МАЮТЬ містити вкладених нових рядків
- Сервер НЕ ПОВИНЕН писати в `stdout` нічого, що не є валідним MCP повідомленням
- Клієнт НЕ ПОВИНЕН писати в `stdin` сервера нічого, що не є валідним MCP повідомленням

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

У попередньому коді:

- Ми імпортуємо клас `Server` і `StdioServerTransport` з MCP SDK
- Створюємо екземпляр сервера з базовою конфігурацією і можливостями
- Створюємо екземпляр `StdioServerTransport` і підключаємо сервер до нього для комунікації через stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Створити екземпляр сервера
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

У наведеному коді ми:

- Створюємо екземпляр сервера за допомогою MCP SDK
- Визначаємо інструменти за допомогою декораторів
- Використовуємо менеджер контексту stdio_server для роботи з транспортом

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

Головна відмінність від SSE в тому, що stdio сервери:

- Не потребують налаштування веб-сервера або HTTP endpoint-ів
- Запускаються підпроцесом клієнтом
- Спілкуються через потоки stdin/stdout
- Простіші у реалізації та налагодженні

## Вправа: Створення stdio серверу

Щоб створити наш сервер, потрібно пам’ятати про дві речі:

- Потрібно використовувати веб-сервер для відкриття endpoint-ів для підключення та повідомлень.

## Лабораторна робота: Створення простого MCP stdio серверу

У цій лабораторній роботі ми створимо простий MCP сервер з рекомендованим транспортом stdio. Цей сервер відкриє інструменти, які клієнти можуть викликати, використовуючи стандартний Протокол Контексту Моделі.

### Необхідні умови

- Python 3.8 або новіший
- MCP Python SDK: `pip install mcp`
- Базове розуміння асинхронного програмування

Почнемо зі створення першого MCP stdio серверу:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Налаштувати ведення журналу
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Створити сервер
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
    # Використовувати транспорт stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Основні відмінності від застарілого підходу SSE

**Stdio транспорт (поточний стандарт):**
- Проста модель підпроцесу – клієнт запускає сервер як дочірній процес
- Комунікація через stdin/stdout з використанням JSON-RPC повідомлень
- Не потрібно налаштування HTTP сервера
- Краща продуктивність і безпека
- Легша розробка та налагодження

**SSE транспорт (застарілий станом на MCP 2025-06-18):**
- Потрібен HTTP сервер з SSE endpoint-ами
- Складніша інфраструктура веб-сервера
- Додаткові вимоги безпеки для HTTP endpoint-ів
- Заміщений Streamable HTTP для веб-сценаріїв

### Створення серверу з транспортом stdio

Для створення нашого stdio серверу потрібно:

1. **Імпортувати потрібні бібліотеки** — потрібні компоненти MCP серверу і stdio транспорт
2. **Створити екземпляр серверу** — визначити сервер з його можливостями
3. **Визначити інструменти** — додати функціональність, яку хочемо відкрити
4. **Налаштувати транспорт** — сконфігурувати stdio комунікацію
5. **Запустити сервер** — стартувати сервер і обробляти повідомлення

Побудуємо це крок за кроком:

### Крок 1: Створення базового stdio серверу

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Налаштувати логування
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Створити сервер
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

### Крок 2: Додавання інструментів

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

### Крок 3: Запуск серверу

Збережіть код як `server.py` і запустіть з командного рядка:

```bash
python server.py
```

Сервер запуститься та чекатиме на ввід зі stdin. Він спілкується за допомогою JSON-RPC повідомлень через транспорт stdio.

### Крок 4: Тестування за допомогою Inspector

Ви можете тестувати ваш сервер за допомогою MCP Inspector:

1. Встановіть Inspector: `npx @modelcontextprotocol/inspector`
2. Запустіть Inspector і підключіться до вашого серверу
3. Тестуйте створені інструменти

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Відлагодження stdio серверу

### Використання MCP Inspector

MCP Inspector — цінний інструмент для відлагодження і тестування MCP серверів. Ось як його використовувати зі stdio сервером:

1. **Встановіть Inspector:**
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Запустіть Inspector:**
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Тестуйте сервер:** Inspector надає веб-інтерфейс, де можна:
   - Переглядати можливості серверу
   - Тестувати інструменти з різними параметрами
   - Моніторити JSON-RPC повідомлення
   - Відлагоджувати проблеми з підключенням

### Використання VS Code

Ви також можете відлагоджувати MCP сервер безпосередньо у VS Code:

1. Створіть конфігурацію запуску у `.vscode/launch.json`:
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

2. Встановіть точки зупину у коді серверу
3. Запустіть відлагоджувач і тестуйте разом з Inspector

### Поширені поради з відлагодження

- Використовуйте `stderr` для логів — ніколи не пишіть у `stdout`, він зарезервований для MCP повідомлень
- Переконайтесь, що всі JSON-RPC повідомлення розділені новими рядками
- Спершу тестуйте прості інструменти перед додаванням складної логіки
- Використовуйте Inspector для перевірки формату повідомлень

## Використання вашого stdio серверу у VS Code

Після створення MCP stdio серверу, ви можете інтегрувати його з VS Code для роботи з Claude або іншими сумісними MCP клієнтами.

### Конфігурація

1. **Створіть конфігураційний файл MCP** у `%APPDATA%\Claude\claude_desktop_config.json` (Windows) або `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Перезапустіть Claude:** закрийте і знову відкрийте Claude, щоб завантажити нову конфігурацію серверу.

3. **Перевірте підключення:** почніть розмову з Claude та спробуйте використати інструменти вашого серверу:
   - "Чи можеш привітати мене за допомогою інструменту вітання?"
   - "Обчисли суму 15 та 27"
   - "Яка інформація про сервер?"

### Приклад stdio серверу на TypeScript

Ось повний приклад на TypeScript для довідки:

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

// Додати інструменти
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

### Приклад stdio серверу на .NET

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

## Підсумок

В оновленому уроці ви навчились:

- Створювати MCP сервери за допомогою поточного **stdio транспорту** (рекомендований підхід)
- Розуміти, чому транспорт SSE був виведений з експлуатації на користь stdio і Streamable HTTP
- Створювати інструменти, які можна викликати MCP клієнтами
- Відлагоджувати сервер за допомогою MCP Inspector
- Інтегрувати stdio сервер з VS Code і Claude

Транспорт stdio забезпечує простіший, безпечніший та продуктивніший спосіб створення MCP серверів у порівнянні із застарілим підходом SSE. Це рекомендований транспорт для більшості реалізацій MCP серверів станом на специфікацію 2025-06-18.

### .NET

1. Спочатку створимо деякі інструменти. Для цього створимо файл *Tools.cs* з таким вмістом:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Вправа: Тестування вашого stdio серверу

Тепер, коли ви створили stdio сервер, давайте протестуємо його, щоб переконатися, що він працює коректно.

### Необхідні умови

1. Переконайтеся, що у вас встановлений MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Ваш код серверу збережений (наприклад, як `server.py`)

### Тестування за допомогою Inspector

1. **Запустіть Inspector із вашим сервером:**
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Відкрийте веб-інтерфейс:** Inspector відкриє вікно браузера з переліком можливостей вашого серверу.

3. **Перевірте інструменти:** 
   - Спробуйте інструмент `get_greeting` з різними іменами
   - Тестуйте `calculate_sum` з різними числами
   - Викликайте `get_server_info` для перегляду метаданих серверу

4. **Моніторинг комунікації:** Inspector показує JSON-RPC повідомлення, які обмінюються між клієнтом і сервером.

### Що ви маєте побачити

Коли сервер правильно запуститься, ви побачите:
- Перелік можливостей серверу в Inspector
- Доступні інструменти для тестування
- Успішний обмін JSON-RPC повідомленнями
- Відповіді інструментів у інтерфейсі

### Поширені проблеми і рішення

**Сервер не запускається:**
- Перевірте, що всі залежності встановлені: `pip install mcp`
- Перевірте синтаксис і відступи Python
- Дивіться на помилки у консолі

**Інструменти не з’являються:**
- Переконайтеся, що присутні декоратори `@server.tool()`
- Перевірте, що функції інструментів визначені перед `main()`
- Переконайтеся, що сервер правильно налаштований

**Проблеми підключення:**
- Переконайтеся, що сервер використовує stdio транспорт коректно
- Перевірте, що інші процеси не заважають
- Перевірте синтаксис команди Inspector

## Домашнє завдання

Спробуйте розширити сервер додатковими можливостями. Перегляньте [цю сторінку](https://api.chucknorris.io/) щоб, наприклад, додати інструмент, який викликає API. Ви вирішуєте, яким має бути сервер. Гарного настрою :)

## Розв’язок

[Розв’язок](./solution/README.md) Ось можливий розв’язок з робочим кодом.

## Основні висновки

Основні висновки з цієї глави:

- Транспорт stdio є рекомендованим механізмом для локальних MCP серверів.
- Транспорт stdio дозволяє безперервну комунікацію між MCP серверами та клієнтами через стандартні потоки вводу і виводу.
- Ви можете використовувати як Inspector, так і Visual Studio Code для безпосереднього споживання stdio серверів, що робить налагодження і інтеграцію простими.

## Приклади

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)

## Додаткові ресурси

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Що далі

## Наступні кроки

Тепер, коли ви навчились створювати MCP сервери з транспортом stdio, можете дослідити більш просунуті теми:

- **Далі:** [HTTP Streaming з MCP (Streamable HTTP)](../06-http-streaming/README.md) — дізнайтеся про інший підтримуваний механізм транспорту для віддалених серверів
- **Поглиблено:** [Кращі практики безпеки MCP](../../02-Security/README.md) — впроваджуйте безпеку у ваші MCP сервери
- **Виробництво:** [Стратегії розгортання](../09-deployment/README.md) — розгортайте ваші сервери для виробничого використання

## Додаткові ресурси

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) — офіційна специфікація
- [Документація MCP SDK](https://github.com/modelcontextprotocol/sdk) — посилання на SDK для всіх мов програмування
- [Приклади від спільноти](../../06-CommunityContributions/README.md) — більше прикладів серверів від спільноти

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->