# Розширене використання сервера

У MCP SDK представлені два різні типи серверів: ваш звичайний сервер та низькорівневий сервер. Зазвичай ви використовуєте звичайний сервер для додавання функцій. Проте в деяких випадках ви хочете покладатися на низькорівневий сервер, наприклад:

- Краща архітектура. Можна створити чисту архітектуру зі звичайним сервером і низькорівневим сервером, але можна стверджувати, що це трохи легше з низькорівневим сервером.
- Наявність функціональності. Деякі розширені функції можна використовувати лише з низькорівневим сервером. Це ви побачите в наступних розділах, коли ми додамо семплювання та еліцітацію.

## Звичайний сервер проти низькорівневого сервера

Ось як виглядає створення MCP Server зі звичайним сервером:

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

Суть у тому, що ви явно додаєте кожен інструмент, ресурс або підказку, які хочете бачити на сервері. Немає в цьому нічого поганого.

### Підхід низькорівневого сервера

Однак при використанні підходу низькорівневого сервера потрібно думати інакше. Замість реєстрації кожного інструмента, ви створюєте дві обробляючі функції для кожного типу функції (інструменти, ресурси або підказки). Наприклад, інструменти мають лише дві функції:

- Перелік усіх інструментів. Одна функція відповідає за всі спроби вивести список інструментів.
- Обробка виклику всіх інструментів. Тут також лише одна функція обробляє виклики до інструменту.

Здається, це потенційно менше роботи, чи не так? Замість реєстрації інструменту, потрібно лише переконатися, що інструмент є в списку при його виведенні та що він викликається при надходженні запиту на виклик інструменту.

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

Тут у нас функція, яка повертає список функцій. Кожен запис у списку інструментів тепер має такі поля, як `name`, `description` та `inputSchema` відповідно до типу повернення. Це дає змогу розміщувати визначення інструментів і функцій в іншому місці. Тепер ми можемо створити всі інструменти в папці tools, те саме стосується всіх функцій, тому ваш проєкт може раптово бути організований так:

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

Чудово, нашу архітектуру можна зробити доволі чистою.

Що щодо виклику інструментів, чи та сама ідея – один обробник для виклику будь-якого інструменту? Так, саме так, ось код для цього:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools є словником із назвами інструментів як ключами
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

Як бачимо з наведеного коду, нам потрібно розпарсити інструмент який треба викликати, з якими аргументами, а потім викликати цей інструмент.

## Покращення підходу за допомогою валідації

Поки що ви бачили, як усі ваші реєстрації для додавання інструментів, ресурсів та підказок можна замінити двома обробниками на тип функції. Що ще потрібно зробити? Нам слід додати якусь форму валідації, щоб впевнитися, що інструмент викликається з правильними аргументами. Для цього кожне середовище виконання має власне рішення: наприклад, Python використовує Pydantic, а TypeScript — Zod. Ідея в наступному:

- Перенести логіку створення функції (інструменту, ресурсу або підказки) до відповідної папки.
- Додати спосіб валідувати вхідний запит, наприклад, на виклик інструменту.

### Створення функції

Щоб створити функцію, нам потрібно створити файл для цієї функції і впевнитися, що в ньому є обов'язкові поля, необхідні для цієї функції. Поля трохи відрізняються між інструментами, ресурсами та підказками.

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
        # Валідувати вхідні дані за допомогою моделі Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: додати Pydantic, щоб ми могли створити AddInputModel і перевіряти аргументи

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Тут видно, як ми робимо наступне:

- Створюємо схему за допомогою Pydantic `AddInputModel` з полями `a` та `b` у файлі *schema.py*.
- Прагнемо розпарсити вхідний запит як тип `AddInputModel`, якщо параметри не збігаються – це призведе до помилки:

   ```python
   # add.py
    try:
        # Перевірка вхідних даних за допомогою моделі Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Ви можете вирішити, де розмістити цю логіку парсингу – безпосередньо у виклику інструмента або в функції обробника.

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

- У обробнику всіх викликів інструментів ми тепер намагаємося розпарсити вхідний запит у визначену для інструмента схему:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

Якщо це вдається, продовжуємо виклик фактичного інструменту:

    ```typescript
    const result = await tool.callback(input);
    ```

Як бачите, цей підхід створює відмінну архітектуру, адже все має своє місце, *server.ts* – дуже малий файл, який лише з'єднує обробники запитів, а кожна функція знаходиться в окремій папці, наприклад tools/, resources/ або prompts/.

Чудово, давайте спробуємо наступне.

## Вправа: Створення низькорівневого сервера

У цій вправі ми зробимо наступне:

1. Створимо низькорівневий сервер для обробки виведення списку інструментів та виклику інструментів.
2. Реалізуємо архітектуру, на якій можна збудувати проєкт.
3. Додамо валідацію, щоб переконатися, що виклики інструментів коректно перевіряються.

### -1- Створення архітектури

Перше, що нам потрібно, це архітектура, яка допоможе масштабуватись при додаванні більше функцій, ось як вона виглядає:

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

Тепер ми налаштували архітектуру, яка забезпечує легке додавання нових інструментів у папку tools. Так само можна додавати підпапки для ресурсів та підказок.

### -2- Створення інструмента

Далі подивимося, як створити інструмент. Спочатку його потрібно створити в підпапці *tool* ось так:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Перевірте вхідні дані за допомогою моделі Pydantic
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

Тут ми визначаємо ім'я, опис і схему вводу за допомогою Pydantic та обробник, який буде викликаний при зверненні до цього інструменту. Нарешті ми експортуємо `tool_add`, що є словником з усіма цими властивостями.

Також є *schema.py*, який визначає схему вводу для нашого інструмента:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Нам також потрібно заповнити *__init__.py*, щоб переконатися, що директорія tools розпізнається як модуль. Додатково потрібно експортувати модулі всередині так:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Ми можемо продовжувати додавати сюди, як додаємо більше інструментів.

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

Тут ми створюємо словник із властивостями:

- name — ім'я інструмента.
- rawSchema — схема Zod для перевірки вхідних запитів на виклик цього інструмента.
- inputSchema — схема, що використовується обробником.
- callback — функція виклику інструмента.

Також є `Tool`, який конвертує цей словник у тип, який приймає обробник MCP сервера, і він виглядає так:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Є також *schema.ts*, де зберігаються схеми вводу для кожного інструмента, наразі є лише одна схема, але з додаванням інструментів можна додати й інші:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Чудово, перейдемо до обробки виведення списку інструментів.

### -3- Обробка списку інструментів

Щоб обробити виведення списку інструментів, нам потрібно налаштувати обробник запиту для цього. Ось що потрібно додати у файл сервера:

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

Тут додаємо декоратор `@server.list_tools` та реалізуємо функцію `handle_list_tools`. У ній потрібно сформувати список інструментів. Зверніть увагу, що кожен інструмент має містити ім'я, опис та inputSchema.

**TypeScript**

Щоб налаштувати обробник запиту для списку інструментів, викликаємо `setRequestHandler` на сервері зі схемою, що відповідає нашій задачі, у цьому випадку `ListToolsRequestSchema`.

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
// код пропущено задля стислості
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Повернути список зареєстрованих інструментів
  return {
    tools: tools
  };
});
```

Чудово, ми вирішили задачу виведення списку інструментів, тепер подивимось, як можна викликати інструменти.

### -4- Обробка виклику інструмента

Для виклику інструмента потрібно налаштувати ще один обробник запиту, який буде обробляти запит із вказівкою, який функціонал викликати і з якими аргументами.

**Python**

Використаємо декоратор `@server.call_tool` і реалізуємо його функцією `handle_call_tool`. У ній потрібно витягти ім'я інструмента, його аргументи і впевнитися, що аргументи коректні для конкретного інструмента. Валідацію можна робити тут або в самій функції інструмента.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools — це словник з назвами інструментів у якості ключів
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

- Ім'я інструмента вже є у параметрі `name`, що також є в аргументах у вигляді словника `arguments`.
- Інструмент викликається як `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Валідація аргументів відбувається у властивості `handler`, яка вказує на функцію, якщо це не проходить — викидається виключення.

Отже, ми повністю зрозуміли, як виводити список і викликати інструменти за допомогою низькорівневого сервера.

Дивіться [повний приклад](./code/README.md) тут

## Завдання

Розширте наданий вам код кількома інструментами, ресурсами та підказками і поміркуйте над тим, як ви помічаєте, що потрібно додавати лише файли у директорії tools і ніде більше.

*Розв’язок не надається*

## Підсумок

У цьому розділі ми побачили, як працює підхід низькорівневого сервера і як це допомагає створити зручну архітектуру, на якій можна продовжувати будувати. Ми також обговорили валідацію і показали, як працювати з бібліотеками валідації для створення схем перевірки вводу.

## Що далі

- Далі: [Проста аутентифікація](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ був перекладений за допомогою сервісу автоматичного перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критичної інформації рекомендується звертатися до професійного людського перекладу. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникають унаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->