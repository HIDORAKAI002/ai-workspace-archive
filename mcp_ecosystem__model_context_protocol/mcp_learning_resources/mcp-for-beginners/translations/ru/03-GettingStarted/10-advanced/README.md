# Расширенное использование сервера

В SDK MCP представлены два типа серверов: обычный сервер и низкоуровневый сервер. Обычно вы используете обычный сервер для добавления функций. Однако в некоторых случаях полезно опираться на низкоуровневый сервер, например:

- Лучшая архитектура. Можно создать чистую архитектуру с использованием как обычного, так и низкоуровневого сервера, но можно утверждать, что с низкоуровневым сервером это немного проще.
- Доступность функций. Некоторые расширенные функции можно использовать только с низкоуровневым сервером. Вы увидите это в дальнейших главах при добавлении выборки и elicitation.

## Обычный сервер против низкоуровневого сервера

Вот как создается MCP Server с обычным сервером

**Python**

```python
mcp = FastMCP("Demo")

# Добавить инструмент для сложения
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

Суть в том, что вы явно добавляете каждый инструмент, ресурс или запрос, который хотите иметь на сервере. В этом нет ничего плохого.

### Подход низкоуровневого сервера

Однако при использовании низкоуровневого сервера подход иной. Вместо регистрации каждого инструмента создаются по два обработчика на каждый тип функции (инструменты, ресурсы или запросы). Например, для инструментов имеется всего две функции:

- Получение списка всех инструментов. Одна функция отвечает за все попытки получить список инструментов.
- Обработка вызова инструментов. Здесь также всего одна функция отвечает за вызовы инструментов.

Звучит как меньшая работа, верно? Так что вместо регистрации инструмента нужно только убедиться, что он присутствует в списке при его выводе и вызывается при соответствующем запросе. 

Посмотрим, как теперь выглядит код:

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
  // Возвращает список зарегистрированных инструментов
  return {
    tools: [{
        name="add",
        description="Add two numbers",
        inputSchema={
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

Здесь у нас есть функция, возвращающая список функций. Каждый элемент в списке инструментов теперь имеет поля `name`, `description` и `inputSchema` в соответствии с типом возвращаемого значения. Это позволяет размещать инструменты и определение функций в другом месте. Теперь мы можем создавать все инструменты в папке tools, и то же самое справедливо для всех функций, так что ваш проект может быть организован так:

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

Отлично, наша архитектура может выглядеть вполне чисто.

А как насчет вызова инструментов, тоже одна функция для вызова любого инструмента? Да, именно так, вот код для этого:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools — это словарь с названиями инструментов в качестве ключей
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

Как видно из кода выше, нам нужно разобрать инструмент для вызова и аргументы, а затем выполнить вызов инструмента.

## Улучшение подхода с валидацией

Пока что вы видели, как все регистрации для добавления инструментов, ресурсов и запросов можно заменить двумя обработчиками на тип функции. Что еще нам нужно сделать? Добавить некоторую форму валидации, чтобы гарантировать, что инструмент вызывается с правильными аргументами. В каждом рантайме своё решение, например Python использует Pydantic, а TypeScript — Zod. Идея такова:

- Переместить логику создания функции (инструмента, ресурса или запроса) в выделенную папку.
- Добавить способ проверки входящего запроса на вызов инструмента.

### Создание функции

Для создания функции нужно создать файл для этой функции и убедиться, что он содержит обязательные поля, необходимые для этой функции. Эти поля немного различаются между инструментами, ресурсами и запросами.

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

Здесь мы делаем следующее:

- Создаем схему с помощью Pydantic `AddInputModel` с полями `a` и `b` в файле *schema.py*.
- Пытаемся распарсить входящий запрос как `AddInputModel`, при несовпадении параметров произойдет сбой:

   ```python
   # add.py
    try:
        # Проверить входные данные с помощью модели Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Вы можете решить, размещать ли эту логику разбора в вызове инструмента или в функции обработчика.

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

- В обработчике всех вызовов инструментов теперь пытаемся распарсить входящий запрос согласно схеме инструмента:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    если это удается, переходим к вызову самого инструмента:

    ```typescript
    const result = await tool.callback(input);
    ```

Как вы видите, этот подход формирует отличную архитектуру: всё на своих местах, *server.ts* — очень маленький файл, который только связывает обработчики запросов, а каждая функция расположена в соответствующей папке, например tools/, resources/ или /prompts.

Отлично, давайте попробуем построить это.

## Упражнение: создание низкоуровневого сервера

В этом упражнении мы сделаем следующее:

1. Создадим низкоуровневый сервер, который обрабатывает вывод списка инструментов и вызов инструментов.
1. Реализуем архитектуру, на которую можно опираться.
1. Добавим валидацию для проверки корректности вызовов инструментов.

### -1- Создание архитектуры

Первое, что нужно сделать — создать архитектуру, которая поможет масштабироваться при добавлении новых функций, вот как она выглядит:

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

Теперь у нас есть архитектура, которая обеспечивает простое добавление новых инструментов в папке tools. Можете по аналогии добавить подкаталоги для ресурсов и запросов.

### -2- Создание инструмента

Посмотрим, как создавать инструмент. Сначала его нужно создать в поддиректории *tool* так:

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

Здесь мы определяем имя, описание и схему ввода с помощью Pydantic, а также обработчик, который вызывается при вызове инструмента. В конце экспортируем `tool_add`, который представляет словарь со всеми этими свойствами.

Также есть *schema.py*, где определяется схема ввода для инструмента:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Нужно также заполнить *__init__.py*, чтобы каталог tools распознавался как модуль. Кроме того, нужно экспортировать модули так:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

В этот файл можно добавлять новые инструменты по мере необходимости.

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

Здесь создается объект со свойствами:

- name — имя инструмента.
- rawSchema — схема Zod, используется для валидации входящих запросов на вызов инструмента.
- inputSchema — схема, используемая обработчиком.
- callback — функция вызова инструмента.

Также есть `Tool`, который преобразует этот объект в тип, принимаемый обработчиком mcp сервера, и выглядит так:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

В *schema.ts* храним схемы ввода для каждого инструмента, например, так, пока с одной схемой, но по мере добавления инструментов можно расширять:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Отлично, теперь перейдем к обработке списка инструментов.

### -3- Обработка вывода инструментов

Для вывода списка инструментов нужно настроить обработчик запроса. Добавим в наш сервер следующий код:

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

Здесь мы добавляем декоратор `@server.list_tools` и функцию-обработчик `handle_list_tools`. В ней нужно сформировать список инструментов. Обратите внимание, что каждый инструмент должен иметь name, description и inputSchema.

**TypeScript**

Для создания обработчика запроса списка инструментов вызываем `setRequestHandler` на сервере с подходящей схемой, в данном случае `ListToolsRequestSchema`.

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

Отлично, теперь мы решили задачу вывода списка инструментов. Давайте посмотрим, как вызываются инструменты.

### -4- Обработка вызова инструмента

Для вызова инструмента нужно настроить еще один обработчик запроса, который укажет, какой именно инструмент вызвать и с какими аргументами.

**Python**

Используем декоратор `@server.call_tool` и реализуем функцию, например `handle_call_tool`. В этой функции нужно распарсить имя инструмента, аргументы и проверить их валидность для данного инструмента. Валидацию можно сделать здесь или непосредственно в инструменте.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools — это словарь с названиями инструментов в качестве ключей
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # вызов инструмента
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Вот что происходит:

- Имя инструмента присутствует в параметре `name`, аргументы — в словаре `arguments`.

- Инструмент вызывается через `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Валидация аргументов выполняется в функции `handler`, если она неудачна — выбрасывается исключение.

Теперь мы полностью понимаем, как происходит вывод списка и вызов инструментов с низкоуровневым сервером.

Смотрите [полный пример](./code/README.md) здесь

## Задание

Расширьте данный вам код несколькими инструментами, ресурсами и запросами и обратите внимание, что вам нужно добавлять файлы только в каталог tools и никуда больше.

*Решение не предоставляется*

## Резюме

В этой главе мы рассмотрели работу с низкоуровневым сервером и как это помогает создать хорошую архитектуру, на которой можно строить дальше. Также мы обсудили валидацию и показали, как работать с библиотеками валидации для создания схем и проверки вводных данных.

## Что дальше

- Далее: [Простая аутентификация](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:  
Этот документ был переведен с использованием сервиса автоматического перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его языке является авторитетным источником. Для критически важной информации рекомендуется профессиональный человеческий перевод. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->