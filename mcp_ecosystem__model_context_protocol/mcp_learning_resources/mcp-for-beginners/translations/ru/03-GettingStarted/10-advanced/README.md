# Продвинутое использование сервера

В MCP SDK представлены два различных типа серверов: обычный сервер и низкоуровневый сервер. Обычно для добавления функциональности используется обычный сервер. Но в некоторых случаях стоит полагаться на низкоуровневый сервер, например:

- Лучшая архитектура. Возможно создать чистую архитектуру с использованием как обычного, так и низкоуровневого сервера, но можно утверждать, что с низкоуровневым сервером это чуть проще.
- Доступность функций. Некоторые продвинутые функции можно использовать только с низкоуровневым сервером. Вы увидите это в следующих главах, когда мы добавим выборку (устарело в релизе-кандидате `2026-07-28`) и вызовы.

## Обычный сервер vs низкоуровневый сервер

Вот как создаётся сервер MCP с использованием обычного сервера

**Python**

```python
mcp = FastMCP("Demo")

# Добавить инструмент сложения
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b
```

**TypeScript**

```typescript
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Добавить инструмент сложения
server.registerTool("add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);
```

Суть в том, что вы явным образом добавляете каждый инструмент, ресурс или запрос, который хотите видеть на сервере. Нет ничего плохого в таком подходе.  

### Подход с низкоуровневым сервером

Однако, используя подход низкоуровневого сервера, нужно мыслить иначе. Вместо регистрации каждого инструмента, вы создаёте по два обработчика на каждый тип функции (инструменты, ресурсы или запросы). Например, для инструментов будет всего две функции:

- Функция для перечисления всех инструментов. Она отвечает за все попытки получить список инструментов.
- Функция для вызова инструмента. Здесь тоже всего одна функция, которая обрабатывает вызовы инструментов.

Звучит как менее трудоёмкий способ, верно? Вместо регистрации инструмента, нужно лишь убедиться, что он перечислен при получении списока и что он вызывается при запросе на вызов.

Давайте посмотрим, как теперь выглядит код:

**Python**

```python
@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available tools."""
    return [
        types.Tool(
            name="add",
            description="Add two numbers",
            inputSchema={
                "type": "object",
                "properties": {
                    "a": {"type": "number", "description": "number to add"}, 
                    "b": {"type": "number", "description": "number to add"}
                },
                "required": ["query"],
            },
        )
    ]
```

**TypeScript**

```typescript
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Вернуть список зарегистрированных инструментов
  return {
    tools: [{
        name: "add",
        description: "Add two numbers",
        inputSchema: {
            "type": "object",
            "properties": {
                "a": {"type": "number", "description": "number to add"},
                "b": {"type": "number", "description": "number to add"}
            },
            "required": ["query"],
        }
    }]
  };
});
```

Теперь у нас есть функция, которая возвращает список функций. В каждом элементе списка инструментов есть поля `name`, `description` и `inputSchema`, чтобы соответствовать возвращаемому типу. Это позволяет нам отдельно помещать определения инструментов и функций. Теперь мы можем создавать все инструменты в папке tools, то же самое касается и всех функций, так что проект может выглядеть примерно так:

```text
app
--| tools
----| add
----| substract
--| resources
----| products
----| schemas
--| prompts
----| product-description
```

Это замечательно, архитектуру можно сделать достаточно чистой.

А что с вызовом инструментов, та же идея — один обработчик для вызова любого инструмента? Да, именно так, вот код для этого:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools - это словарь с названиями инструментов в качестве ключей
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

**TypeScript**

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if(!tool) {
        return {
            error: {
                code: "tool_not_found",
                message: `Tool ${name} not found.`
            }
       };
    }
    
    // args: request.params.arguments
    // TODO вызвать инструмент,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Как видно из кода выше, нам нужно определить, какой инструмент вызвать и с какими аргументами, а затем уже вызвать инструмент.

## Улучшение подхода с помощью валидации

До сих пор вы видели, как все регистрации инструментов, ресурсов и запросов можно заменить этими двумя обработчиками на тип функции. Что ещё нужно сделать? Нужно добавить какую-то форму валидации, чтобы гарантировать вызов инструмента с правильными аргументами. У каждого языка исполнения есть своё решение, например, Python использует Pydantic, а TypeScript — Zod. Суть в следующем:

- Логика создания функции (инструмента, ресурса или запроса) перемещается в выделенную папку.
- Добавляется способ валидации входящих запросов, например, на вызов инструмента.

### Создание функции

Чтобы создать функцию, нужно создать файл для неё и убедиться, что он содержит обязательные поля, отличающиеся для инструментов, ресурсов и запросов.

**Python**

```python
# schema.py
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float

# add.py

from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Проверка входных данных с использованием модели Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: добавить Pydantic, чтобы мы могли создать AddInputModel и валидировать аргументы

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Здесь показано, как делается следующее:

- Создаётся схема Pydantic `AddInputModel` с полями `a` и `b` в файле *schema.py*.
- Пытаемся разобрать входящий запрос как тип `AddInputModel`, при несоответствии параметров будет ошибка:

   ```python
   # add.py
    try:
        # Проверьте ввод с помощью модели Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Можете выбрать, размещать эту логику парсинга внутри вызова инструмента или в обработчике.

**TypeScript**

```typescript
// server.ts
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if (!tool) {
       return {
        error: {
            code: "tool_not_found",
            message: `Tool ${name} not found.`
        }
       };
    }
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);

       // @ts-ignore
       const result = await tool.callback(input);

       return {
          content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
      };
    } catch (error) {
       return {
          error: {
             code: "invalid_arguments",
             message: `Invalid arguments for tool ${name}: ${error instanceof Error ? error.message : String(error)}`
          }
    };
   }

});

// schema.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// add.ts
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

- В обработчике, обрабатывающем все вызовы инструментов, пытаемся разобрать входящий запрос на схему инструмента:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    если анализ прошёл успешно, продолжаем вызов самого инструмента:

    ```typescript
    const result = await tool.callback(input);
    ```

Как видите, такой подход создаёт отличную архитектуру: *server.ts* — очень маленький файл, который только подключает обработчики запросов, а каждая функция находится в своей папке, например tools/, resources/ или prompts/.

Отлично, давайте попробуем это построить дальше. 

## Упражнение: Создание низкоуровневого сервера

В этом упражнении мы сделаем следующее:

1. Создадим низкоуровневый сервер, обрабатывающий перечисление инструментов и вызов инструментов.
1. Реализуем архитектуру, на которую можно опираться.
1. Добавим валидацию для корректной проверки вызовов инструментов.

### -1- Создаём архитектуру

Первое, что нужно продумать — это архитектура, которая поможет масштабироваться с добавлением функций, вот как она выглядит:

**Python**

```text
server.py
--| tools
----| __init__.py
----| add.py
----| schema.py
client.py
```

**TypeScript**

```text
server.ts
--| tools
----| add.ts
----| schema.ts
client.ts
```

Теперь у нас есть архитектура, которая позволяет легко добавлять новые инструменты в папку tools. Не стесняйтесь сделать что-то подобное для ресурсов и запросов.

### -2- Создание инструмента

Далее посмотрим, как создаётся инструмент. Сначала он должен быть создан в своей подсекции *tool* так:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Проверить ввод с помощью модели Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: добавить Pydantic, чтобы мы могли создать AddInputModel и проверить аргументы

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Здесь мы видим, как определяются имя, описание и схема ввода с помощью Pydantic, а также обработчик, который вызывается при вызове инструмента. Наконец, мы экспортируем `tool_add` — словарь со всеми этими свойствами.

Также есть *schema.py*, где определяется входная схема для нашего инструмента:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Нужно также наполнить *__init__.py*, чтобы папка tools была модулем. Кроме того, нужно экспортировать модули внутри неё так:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Этот файл можно дополнять по мере добавления инструментов.

**TypeScript**

```typescript
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

Здесь создаётся словарь со свойствами:

- name — имя инструмента.
- rawSchema — схема Zod, используемая для валидации входящих запросов на вызов этого инструмента.
- inputSchema — схема, используемая обработчиком.
- callback — функция, вызывающая инструмент.

Также есть `Tool`, который преобразует этот словарь в тип, который может принять обработчик сервера mcp, и выглядит так:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

А в *schema.ts* хранится входная схема для каждого инструмента, сейчас в ней только одна схема, но с ростом количества инструментов мы можем добавить больше:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Отлично, теперь перейдём к обработке перечисления наших инструментов.

### -3- Обработка списка инструментов

Далее, чтобы обработать список инструментов, нужно настроить обработчик запроса. Вот что нужно добавить в наш сервер:

**Python**

```python
# код опущен для краткости
from tools import tools

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    tool_list = []
    print(tools)

    for tool in tools.values():
        tool_list.append(
            types.Tool(
                name=tool["name"],
                description=tool["description"],
                inputSchema=pydantic_to_json(tool["input_schema"]),
            )
        )
    return tool_list
```

Здесь мы добавляем декоратор `@server.list_tools` и реализуем функцию `handle_list_tools`. В ней возвращается список инструментов. Обратите внимание, что каждый инструмент должен иметь имя, описание и inputSchema.   

**TypeScript**

Чтобы настроить обработчик запроса на перечисление инструментов, нужно вызвать `setRequestHandler` на сервере с подходящей схемой, в нашем случае `ListToolsRequestSchema`. 

```typescript
// index.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// server.ts
// код опущен для краткости
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Возвращает список зарегистрированных инструментов
  return {
    tools: tools
  };
});
```

Отлично, задачи перечисления инструментов решены, теперь посмотрим, как мы можем вызывать инструменты.

### -4- Обработка вызова инструмента

Для вызова инструмента создадим ещё один обработчик запроса, который будет разбирать, какой инструмент надо вызвать и с какими аргументами.

**Python**

Используем декоратор `@server.call_tool` и реализуем функцию `handle_call_tool`. Внутри этой функции нужно узнать имя инструмента, его аргументы и удостовериться, что они валидны для данного инструмента. Валидацию можно выполнять здесь или уже внутри самого инструмента.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools — это словарь с именами инструментов в качестве ключей
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # вызвать инструмент
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Вот что происходит:

- Имя инструмента уже содержится во входном параметре `name`, аргументы — в словаре `arguments`.

- Инструмент вызывается командой `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Валидация аргументов происходит в функции, на которую указывает свойство `handler`, при ошибке выбрасывается исключение. 

Теперь у нас полное понимание, как работает перечисление и вызов инструментов с использованием низкоуровневого сервера.

Смотрите [полный пример](./code/README.md) здесь

## Задание

Расширьте данный код рядом инструментов, ресурсов и запросов и обратите внимание, что вам нужно будет добавлять файлы только в папку tools, и больше нигде. 

*Решение не предоставляется*

## Итоги

В этой главе мы узнали, как работает подход с низкоуровневым сервером и как он помогает создавать удобную архитектуру, которую можно развивать. Мы также поговорили о валидации и показали, как пользоваться библиотеками валидации для создания схем проверки ввода.

## Что дальше

- Далее: [Простая аутентификация](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->