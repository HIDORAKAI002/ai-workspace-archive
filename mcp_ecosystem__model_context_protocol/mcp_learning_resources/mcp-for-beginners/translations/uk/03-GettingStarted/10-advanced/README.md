# Розширене використання сервера

У MCP SDK існують два різні типи серверів: ваш звичайний сервер і сервер низького рівня. Зазвичай ви використовуєте звичайний сервер, щоб додати до нього функції. Однак у деяких випадках варто зосередитись на сервері низького рівня, наприклад:

- Краща архітектура. Можливо створити чисту архітектуру як зі звичайним сервером, так і з сервером низького рівня, але можна стверджувати, що з сервером низького рівня це трохи простіше.
- Доступність функцій. Деякі розширені функції можна використовувати лише із сервером низького рівня. Це буде показано у наступних главах, коли ми додамо вибірку (deprecated у випробувальному релізі `2026-07-28`) та виклик.

## Звичайний сервер проти сервера низького рівня

Ось як виглядає створення MCP сервера зі звичайним сервером

**Python**

```python
mcp = FastMCP("Demo")

# Додати інструмент додавання
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

// Додати інструмент додавання
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

Суть у тому, що ви явно додаєте кожен інструмент, ресурс або підказку, які хочете, щоб сервер мав. У цьому немає нічого поганого.  

### Підхід із сервером низького рівня

Проте при використанні підходу з сервером низького рівня потрібно мислити інакше. Замість реєстрації кожного інструмента ви створюєте дві обробні функції на кожен тип функції (інструменти, ресурси або підказки). Наприклад, інструменти тоді мають лише дві функції:

- Виведення усіх інструментів. Одна функція відповідає за всі спроби вивести список інструментів.
- Обробка виклику всіх інструментів. Тут також лише одна функція обробляє виклики до інструменту.

Звучить як потенційно менше роботи, правда? Тож замість реєстрації інструменту мені лише потрібно впевнитися, що інструмент перелічується серед усіх інструментів і що він викликається, коли надходить запит на виклик інструмента.

Давайте подивимось, як тепер виглядає код:

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
  // Повернути список зареєстрованих інструментів
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

Тут тепер функція повертає список функцій. Кожен запис у списку інструментів має поля як `name`, `description` та `inputSchema` відповідно до типу повернення. Це дає змогу винести визначення інструментів і функцій в окремі місця. Тепер ми можемо створити всі наші інструменти в папці tools, і те ж саме стосується всіх ваших функцій, тож ваш проєкт може бути організований так:

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

Це чудово, наша архітектура може виглядати дуже чистою.

А що з викликом інструментів, це та ж ідея, один обробник для виклику будь-якого інструменту? Так, саме так, ось код для цього:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools — це словник з назвами інструментів як ключами
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
    // TODO викликати інструмент,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Як бачите з наведеного коду, нам потрібно розпарсити, який інструмент викликати і з якими аргументами, після чого потрібно викликати інструмент.

## Покращення підходу за допомогою валідації

До цього моменту ви бачили, як усі реєстрації для додавання інструментів, ресурсів та підказок можна замінити цими двома обробниками на кожен тип функції. Що ще нам потрібно зробити? Ну, ми повинні додати якусь форму валідації, щоб переконатися, що інструмент викликається з правильними аргументами. Кожне середовище виконання має власне рішення для цього, наприклад Python використовує Pydantic, а TypeScript — Zod. Ідея полягає в тому, щоб зробити наступне:

- Перемістити логіку створення функції (інструменту, ресурсу або підказки) в її власну папку.
- Додати спосіб валідувати вхідний запит, наприклад, на виклик інструмента.

### Створення функції

Щоб створити функцію, нам потрібно створити для неї файл і впевнитися, що він має обов’язкові поля, необхідні для цієї функції. Які саме поля, трохи відрізняються між інструментами, ресурсами та підказками.

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
        # Перевіряйте вхідні дані за допомогою моделі Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: додати Pydantic, щоб ми могли створити AddInputModel і перевірити аргументи

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

тут ви бачите, як ми робимо наступне:

- Створюємо схему за допомогою Pydantic `AddInputModel` з полями `a` та `b` у файлі *schema.py*.
- Проводимо спробу розпарсити вхідний запит як тип `AddInputModel`, якщо параметри не співпадають, це призведе до помилки:

   ```python
   # add.py
    try:
        # Перевірка введених даних за допомогою моделі Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Ви можете вибрати, чи розміщувати цю логіку розбору безпосередньо в виклику інструменту, чи у функції-обробнику.

**TypeScript**

```typescript
// сервер.ts
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

       // @ts-ігнорувати
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

// схема.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// додати.ts
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

- У обробнику, що обробляє всі виклики інструментів, ми тепер намагаємося розпарсити вхідний запит відповідно до схеми інструменту:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    якщо це вдається, тоді ми переходимо до виклику самого інструмента:

    ```typescript
    const result = await tool.callback(input);
    ```

Як бачите, цей підхід створює чудову архітектуру, бо все має своє місце. Файл *server.ts* є дуже маленьким і лише підключає обробники запитів, а кожна функція розміщена у відповідній папці, наприклад tools/, resources/ або prompts/.

Чудово, давайте спробуємо тепер це побудувати. 

## Вправа: створення сервера низького рівня

У цій вправі ми зробимо наступне:

1. Створимо сервер низького рівня, який обробляє виведення списку інструментів та виклики інструментів.
1. Реалізуємо архітектуру, на яку можна буде опиратися.
1. Додамо валідацію, щоб переконатися, що виклики інструментів належно перевіряються.

### -1- Створення архітектури

Перше, що нам потрібно зробити — це архітектура, яка допоможе нам масштабуватись у міру додавання більшої кількості функцій, ось як вона виглядає:

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

Тепер ми налаштували архітектуру, яка забезпечує легке додавання нових інструментів у папці tools. Не соромтеся додавати підпапки для ресурсів і підказок.

### -2- Створення інструмента

Далі подивимось, як створити інструмент. Спочатку його потрібно створити у піддиректорії *tool* так:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Перевірте вхідні дані за допомогою моделі Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: додати Pydantic, щоб ми могли створити AddInputModel та перевірити аргументи

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Тут ми бачимо, як визначаємо ім'я, опис та схему введення з Pydantic і обробник, що викликається при виклику цього інструмента. Нарешті, ми експортуємо `tool_add`, який є словником з усіма цими властивостями.

Також є *schema.py*, який використовується для визначення схеми введення нашого інструмента:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Також нам потрібно наповнити *__init__.py*, щоб забезпечити, що директорія tools розглядається як модуль. Крім того, потрібно експортувати модулі всередині так:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Ми можемо продовжувати доповнювати цей файл у міру додавання нових інструментів.

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

Тут ми створюємо словник, що складається з властивостей:

- name — це ім'я інструменту.
- rawSchema — це схема Zod, яка використовується для валідації вхідних запитів на виклик цього інструменту.
- inputSchema — ця схема використовується обробником.
- callback — використовується для виклику інструменту.

Є також тип `Tool`, який слугує для конвертації цього словника в тип, який може прийняти обробник сервера mcp, він виглядає так:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

А є *schema.ts*, де зберігаються схеми введення для кожного інструменту. На даний момент є тільки одна схема, але в міру додавання інструментів можна додавати більше записів:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Чудово, тепер перейдемо до обробки виведення списку інструментів.

### -3- Обробка виведення інструментів

Далі, для обробки виведення списку інструментів, нам потрібно налаштувати обробник запитів. Ось що нам потрібно додати до нашого серверного файлу:

**Python**

```python
# код опущено для стислості
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

Тут ми додаємо декоратор `@server.list_tools` і функцію-реалізацію `handle_list_tools`. У цій функції нам потрібно сформувати список інструментів. Зверніть увагу, що кожен інструмент повинен мати name, description і inputSchema.   

**TypeScript**

Щоб налаштувати обробник запиту для виведення інструментів, нам потрібно викликати `setRequestHandler` на сервері з відповідною схемою, у нашому випадку `ListToolsRequestSchema`. 

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
// код опущено для стислості
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Повернути список зареєстрованих інструментів
  return {
    tools: tools
  };
});
```

Чудово, тепер ми вирішили частину з виведенням інструментів, давайте подивимось, як можна викликати інструменти.

### -4- Обробка виклику інструменту

Щоб викликати інструмент, нам потрібно налаштувати ще один обробник запитів, який зосереджується на обробці запиту, що вказує яку функцію викликати і з якими аргументами.

**Python**

Використаємо декоратор `@server.call_tool` та імплементуємо його функцією, наприклад `handle_call_tool`. У цій функції потрібно розпарсити ім’я інструменту, його аргументи і переконатися, що аргументи валідні для даного інструменту. Валідацію ми можемо робити або у цій функції, або надалі безпосередньо в інструменті.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools — це словник з назвами інструментів як ключі
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # викликати інструмент
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Ось що відбувається:

- Наше ім’я інструменту вже є у вхідному параметрі `name`, так само як і аргументи у словнику `arguments`.

- Інструмент викликається рядком `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Валідація аргументів відбувається у властивості `handler`, яка є функцією; якщо вона не проходить, викликається виняток.

Ось і все, тепер ми маємо повне розуміння виведення списку інструментів і їх виклику за допомогою сервера низького рівня.

Детальний [повний приклад](./code/README.md) тут

## Завдання

Розширте наданий код кількома інструментами, ресурсами та підказками і подумайте, що вам потрібно додавати лише файли у директорію tools, і ніде більше.

*Рішення не надається*

## Підсумок

У цій главі ми побачили, як працює підхід сервера низького рівня і як це допомагає створити гарну архітектуру, на якій можна продовжувати будувати. Ми також обговорили валідацію і показали, як працювати з бібліотеками валідації для створення схем для перевірки введення.

## Що далі

- Далі: [Проста автентифікація](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->