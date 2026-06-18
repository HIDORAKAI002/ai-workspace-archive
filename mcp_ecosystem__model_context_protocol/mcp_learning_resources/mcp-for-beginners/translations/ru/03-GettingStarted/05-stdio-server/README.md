# MCP сервер с транспортом stdio

> **⚠️ Важное обновление**: Начиная с спецификации MCP 2025-06-18, отдельный транспорт SSE (Server-Sent Events) был **устаревшим** и заменён транспортом "Streamable HTTP". Текущая спецификация MCP определяет два основных механизма транспорта:
> 1. **stdio** - стандартный ввод/вывод (рекомендуется для локальных серверов)
> 2. **Streamable HTTP** - для удалённых серверов, которые могут использовать SSE внутренне
>
> Этот урок обновлён и теперь фокусируется на **транспорте stdio**, который является рекомендуемым подходом для большинства реализаций MCP серверов.

Транспорт stdio позволяет MCP серверам общаться с клиентами через стандартные потоки ввода и вывода. Это самый часто используемый и рекомендуемый механизм транспорта в текущей спецификации MCP, обеспечивающий простой и эффективный способ создания MCP серверов, которые легко интегрируются с различными клиентскими приложениями.

## Обзор

В этом уроке рассмотрено, как создавать и использовать MCP серверы с помощью транспорта stdio.

## Цели обучения

К концу этого урока вы сможете:

- Создавать MCP сервер с использованием транспорта stdio.
- Отлаживать MCP сервер с помощью инспектора (Inspector).
- Использовать MCP сервер с помощью Visual Studio Code.
- Понимать текущие механизмы транспорта MCP и почему рекомендуют stdio.

## Транспорт stdio - как это работает

Транспорт stdio — один из двух поддерживаемых типов транспорта в текущей спецификации MCP (2025-11-25). Вот как он работает:

- **Простая коммуникация**: сервер читает сообщения JSON-RPC из стандартного ввода (`stdin`) и отправляет сообщения в стандартный вывод (`stdout`).
- **Основан на процессе**: клиент запускает MCP сервер как подчинённый процесс.
- **Формат сообщений**: сообщения — отдельные запросы, уведомления или ответы JSON-RPC, разделённые символами новой строки.
- **Логирование**: сервер МОЖЕТ записывать UTF-8 строки в стандартный поток ошибок (`stderr`) для логирования.

### Ключевые требования:
- Сообщения ДОЛЖНЫ разделяться символами новой строки и НЕ ДОЛЖНЫ содержать встроенные новые строки
- Сервер НЕ ДОЛЖЕН писать в `stdout` ничего, что не является валидным сообщением MCP
- Клиент НЕ ДОЛЖЕН писать в `stdin` сервера ничего, что не является валидным сообщением MCP

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

В приведённом коде:

- Импортируется класс `Server` и транспорт `StdioServerTransport` из MCP SDK
- Создаётся экземпляр сервера с базовой конфигурацией и возможностями
- Создаётся экземпляр `StdioServerTransport` и сервер подключается к нему, что обеспечивает связь через stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Создать экземпляр сервера
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

В приведённом коде мы:

- Создаём экземпляр сервера с помощью MCP SDK
- Определяем инструменты с помощью декораторов
- Используем менеджер контекста stdio_server для работы с транспортом

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

Ключевое отличие от SSE в том, что stdio сервера:

- Не требуют настройки веб-сервера или HTTP эндпоинтов
- Запускаются клиентом как подчинённые процессы
- Общаются через потоки stdin/stdout
- Проще в реализации и отладке

## Практическое задание: создание stdio сервера

Для создания нашего сервера нужно учитывать два момента:

- Для подключения и обмена сообщениями потребуется веб-сервер.

## Лабораторная работа: создание простого MCP stdio сервера

В этой лабораторной работе мы создадим простой MCP сервер с использованием рекомендованного транспорта stdio. Этот сервер будет предоставлять инструменты, которые клиенты смогут вызывать с помощью стандартного протокола Model Context Protocol.

### Предварительные требования

- Python 3.8 или новее
- MCP Python SDK: `pip install mcp`
- Базовые знания асинхронного программирования

Начнём с создания нашего первого MCP stdio сервера:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Настроить логирование
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Создать сервер
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
    # Использовать транспорт stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Ключевые отличия от устаревшего подхода SSE

**Транспорт Stdio (текущий стандарт):**
- Простая модель подчинённого процесса — клиент запускает сервер как дочерний процесс
- Связь через stdin/stdout с использованием сообщений JSON-RPC
- Не требуется настройка HTTP сервера
- Лучшее быстродействие и безопасность
- Проще в отладке и разработке

**Транспорт SSE (устарел с MCP 2025-06-18):**
- Требовался HTTP сервер с SSE эндпоинтами
- Более сложная настройка с инфраструктурой веб-сервера
- Дополнительные соображения безопасности для HTTP эндпоинтов
- Сейчас заменён на Streamable HTTP для веб-сценариев

### Создание сервера с транспортом stdio

Чтобы создать наш stdio сервер, нужно:

1. **Импортировать необходимые библиотеки** — необходимы компоненты MCP сервера и транспорт stdio
2. **Создать экземпляр сервера** — определить сервер с его возможностями
3. **Определить инструменты** — добавить функциональность для вызова
4. **Настроить транспорт** — сконфигурировать связь stdio
5. **Запустить сервер** — стартовать сервер и обрабатывать сообщения

Построим это шаг за шагом:

### Шаг 1: Создание базового stdio сервера

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Настроить логирование
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Создать сервер
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

### Шаг 2: Добавление инструментов

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

### Шаг 3: Запуск сервера

Сохраните код в `server.py` и запустите его из командной строки:

```bash
python server.py
```

Сервер запустится и будет ждать ввода через stdin. Он общается с помощью сообщений JSON-RPC через транспорт stdio.

### Шаг 4: Тестирование с помощью Inspector

Вы можете протестировать ваш сервер с помощью MCP Inspector:

1. Установите Inspector: `npx @modelcontextprotocol/inspector`
2. Запустите Inspector и укажите ваш сервер
3. Проверьте созданные вами инструменты

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Отладка вашего stdio сервера

### Использование MCP Inspector

MCP Inspector — полезный инструмент для отладки и тестирования MCP серверов. Вот как использовать его с вашим stdio сервером:

1. **Установка Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Запуск Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Тестирование сервера**: Inspector предоставляет веб-интерфейс, где вы можете:
   - Просматривать возможности сервера
   - Тестировать инструменты с разными параметрами
   - Отслеживать сообщения JSON-RPC
   - Отлаживать проблемы подключения

### Использование VS Code

Вы также можете отлаживать MCP сервер непосредственно в VS Code:

1. Создайте конфигурацию запуска в `.vscode/launch.json`:
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

2. Установите точки останова в коде сервера
3. Запустите отладчик и тестируйте с Inspector

### Общие советы по отладке

- Используйте `stderr` для логов — никогда не пишите в `stdout`, так как он зарезервирован для сообщений MCP
- Убедитесь, что все сообщения JSON-RPC разделены символом новой строки
- Сначала тестируйте простые инструменты перед добавлением сложного функционала
- Используйте Inspector для проверки форматов сообщений

## Использование вашего stdio сервера в VS Code

После создания MCP stdio сервера вы можете интегрировать его с VS Code, чтобы использовать с Claude или другими клиентами, совместимыми с MCP.

### Конфигурация

1. **Создайте MCP конфигурационный файл** в `%APPDATA%\Claude\claude_desktop_config.json` (Windows) или `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Перезапустите Claude**: закройте и снова откройте Claude, чтобы применить новую конфигурацию сервера.

3. **Проверьте подключение**: начните разговор с Claude и попробуйте использовать инструменты вашего сервера:
   - «Можешь поздороваться со мной, используя инструмент приветствия?»
   - «Посчитай сумму 15 и 27»
   - «Какая информация о сервере?»

### Пример stdio сервера на TypeScript

Вот полный пример на TypeScript для справки:

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

// Добавить инструменты
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

### Пример stdio сервера на .NET

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

## Итоги

В этом обновлённом уроке вы научились:

- Создавать MCP серверы с использованием текущего **транспорта stdio** (рекомендуемый подход)
- Понимать, почему транспорт SSE был устаревшим в пользу stdio и Streamable HTTP
- Создавать инструменты, которые можно вызывать из MCP клиентов
- Отлаживать сервер с помощью MCP Inspector
- Интегрировать stdio сервер с VS Code и Claude

Транспорт stdio предоставляет более простой, безопасный и эффективный способ создания MCP серверов по сравнению с устаревшим подходом SSE. Это рекомендуемый транспорт для большинства реализаций MCP серверов на момент спецификации 2025-06-18.


### .NET

1. Сначала давайте создадим несколько инструментов, для этого создадим файл *Tools.cs* со следующим содержимым:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Практическое задание: тестирование вашего stdio сервера

Теперь, когда вы создали сервер stdio, давайте протестируем его, чтобы убедиться, что он работает правильно.

### Предварительные требования

1. Убедитесь, что у вас установлен MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Ваш код сервера должен быть сохранён (например, в `server.py`)

### Тестирование с Inspector

1. **Запустите Inspector с вашим сервером**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Откройте веб-интерфейс**: Inspector откроет окно браузера с возможностями вашего сервера.

3. **Тестируйте инструменты**: 
   - Попробуйте инструмент `get_greeting` с разными именами
   - Проверьте `calculate_sum` с разными числами
   - Вызовите `get_server_info` чтобы увидеть метаданные сервера

4. **Отслеживайте связь**: Inspector показывает JSON-RPC сообщения между клиентом и сервером.

### Что вы должны увидеть

Когда сервер корректно запущен, вы должны увидеть:
- Возможности сервера, отображённые в Inspector
- Доступные инструменты для тестирования
- Успешный обмен сообщениями JSON-RPC
- Ответы инструментов, отображаемые в интерфейсе

### Распространённые проблемы и решения

**Сервер не запускается:**
- Проверьте, что все зависимости установлены: `pip install mcp`
- Проверьте синтаксис и отступы Python
- Ищите сообщения об ошибках в консоли

**Инструменты не отображаются:**
- Убедитесь, что присутствуют декораторы `@server.tool()`
- Проверьте, что функции инструментов определены до `main()`
- Убедитесь, что сервер правильно сконфигурирован

**Проблемы с подключением:**
- Убедитесь, что сервер использует транспорт stdio корректно
- Проверьте, что другие процессы не мешают
- Проверьте синтаксис команды Inspector

## Домашнее задание

Попробуйте расширить ваш сервер, добавив больше возможностей. Смотрите [эту страницу](https://api.chucknorris.io/), чтобы, например, добавить инструмент, который вызывает API. Решайте, каким должен быть сервер. Удачи :)

## Решение

[Решение](./solution/README.md) Вот возможное решение с работающим кодом.

## Основные выводы

Ключевые моменты из этой главы:

- Транспорт stdio является рекомендуемым механизмом для локальных MCP серверов.
- Транспорт stdio обеспечивает беспрепятственную связь между MCP серверами и клиентами через стандартные потоки ввода и вывода.
- Для использования stdio серверов напрямую можно применять как Inspector, так и Visual Studio Code, что упрощает отладку и интеграцию.

## Примеры 

- [Калькулятор на Java](../samples/java/calculator/README.md)
- [Калькулятор на .Net](../../../../03-GettingStarted/samples/csharp)
- [Калькулятор на JavaScript](../samples/javascript/README.md)
- [Калькулятор на TypeScript](../samples/typescript/README.md)
- [Калькулятор на Python](../../../../03-GettingStarted/samples/python) 

## Дополнительные ресурсы

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Что дальше

## Следующие шаги

Теперь, когда вы знаете, как создавать MCP серверы с транспортом stdio, вы можете изучить более продвинутые темы:

- **Далее**: [HTTP Streaming с MCP (Streamable HTTP)](../06-http-streaming/README.md) - изучите другой поддерживаемый механизм транспорта для удалённых серверов
- **Продвинуто**: [Лучшие практики безопасности MCP](../../02-Security/README.md) - реализуйте безопасность в ваших MCP серверах
- **Для продакшна**: [Стратегии развертывания](../09-deployment/README.md) - развертывание серверов для продакшн использования

## Дополнительные ресурсы

- [Спецификация MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Официальная спецификация
- [Документация MCP SDK](https://github.com/modelcontextprotocol/sdk) - Справочник SDK по всем языкам
- [Примеры от сообщества](../../06-CommunityContributions/README.md) - Ещё больше примеров серверов от сообщества

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->