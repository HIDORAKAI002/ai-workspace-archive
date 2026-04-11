# Разширено използване на сървъра

В MCP SDK са изложени два различни вида сървъри — вашият обикновен сървър и ниско ниво сървър. Обикновено бихте използвали обикновения сървър, за да добавите функции към него. В някои случаи обаче искате да разчитате на ниско ниво сървъра, например:

- По-добра архитектура. Възможно е да се създаде чиста архитектура както с обикновен сървър, така и с ниско ниво сървър, но може да се твърди, че е малко по-лесно с ниско ниво сървър.
- Наличност на функции. Някои разширени функции могат да се използват само с ниско ниво сървър. Това ще видите в по-късни глави, когато добавяме извличане и пробиране.

## Обикновен сървър срещу ниско ниво сървър

Ето как изглежда създаването на MCP сървър с обикновения сървър

**Python**

```python
mcp = FastMCP("Demo")

# Добавете инструмент за събиране
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

// Добавете инструмент за събиране
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

Идеята е, че изрично добавяте всеки инструмент, ресурс или подсказка, които искате сървърът да има. Няма нищо лошо в това.  

### Подход с ниско ниво сървър

Обаче, когато използвате подхода с ниско ниво сървър, трябва да мислите по различен начин. Вместо да регистрирате всеки инструмент, вие създавате два обработващи метода за всеки тип функция (инструменти, ресурси или подсказки). Например инстурментите имат само две функции, като:

- Листинг на всички инструменти. Една функция отговаря за всички опити за изброяване на инструменти.
- Обработване на извикването на всички инструменти. Там също има само една функция, която обработва извиквания към инструмент.

Звучи като по-малко работа, нали? Вместо да регистрирам инструмент, просто трябва да се уверя, че инструментът е изброен, когато изброявам всички инструменти, и че се извиква при входяща заявка за извикване на инструмент. 

Нека видим как изглежда кодът сега:

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
  // Върнете списъка с регистрирани инструменти
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

Сега имаме функция, която връща списък с функции. Във всеки запис от списъка на инструментите вече има полета като `name`, `description` и `inputSchema`, съобразени с типа на връщането. Това ни позволява да поставим нашите инструменти и дефиниции на функции на друго място. Сега можем да създадем всички инструменти в папка tools, както и всички ваши функции, така че проектът ви изведнъж да може да се организира така:

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

Това е страхотно, архитектурата ни може да изглежда доста чиста.

А какво да кажем за извикване на инструменти, същата ли е идеята — един обработващ метод за извикване на всеки инструмент? Да, точно така, ето кода за това:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools е речник с имена на инструменти като ключове
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
    
    // аргументи: request.params.arguments
    // TODO извикайте инструмента,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Както виждате от горния код, трябва да разберем кой инструмент да се извика и с какви аргументи, след което трябва да преминем към извикване на инструмента.

## Подобряване на подхода с валидация

До момента видяхте как всички ваши регистрации за добавяне на инструменти, ресурси и подсказки могат да бъдат заменени с тези два обработващи метода за всеки тип функция. Какво друго трябва да направим? Трябва да добавим някаква форма на валидация, за да се уверим, че инструментът се извиква с правилните аргументи. Всеки runtime има собствено решение за това, например Python използва Pydantic, а TypeScript използва Zod. Идеята е да направим следното:

- Преместим логиката за създаване на функция (инструмент, ресурс или подсказка) в отделна папка.
- Добавим начин за валидиране на входяща заявка, която например ще извика инструмент.

### Създаване на функция

За да създадем функция, ще трябва да създадем файл за тази функция и да се уверим, че има задължителните полета, изисквани за тази функция. Полетата се различават леко между инструменти, ресурси и подсказки.

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
        # Валидирайте входните данни с помощта на Pydantic модел
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: добавете Pydantic, за да можем да създадем AddInputModel и да валидираме аргументите

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Тук можете да видите как правим следното:

- Създаваме схема с Pydantic `AddInputModel` с полета `a` и `b` във файл *schema.py*.
- Опитваме се да парснем входящата заявка в тип `AddInputModel`, ако има несъответствие в параметрите, това ще доведе до грешка:

   ```python
   # add.py
    try:
        # Валидиране на входа с помощта на Pydantic модел
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Можете да изберете дали да поставите тази логика на парсване в самото извикване на инструмента или в обработващата функция.

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

- В обработващия метод за всички извиквания на инструменти сега се опитваме да парснем входящата заявка според дефинираната от инструмента схема:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    Ако това се получи, продължаваме към извикване на самия инструмент:

    ```typescript
    const result = await tool.callback(input);
    ```

Както виждате, този подход създава чудесна архитектура, защото всичко си има място, *server.ts* е много малък файл, който само свързва обработващите за заявки, а всяка функция е в съответната си папка — tools/, resources/ или /prompts.

Страхотно, нека опитаме да изградим това.

## Упражнение: Създаване на ниско ниво сървър

В това упражнение ще направим следното:

1. Създадем ниско ниво сървър, който обработва изброяване на инструменти и извикване на инструменти.
1. Изпълним архитектура, върху която можете да надграждате.
1. Добавим валидация, за да гарантираме, че извикванията на инструментите са правилно валидирани.

### -1- Създаване на архитектура

Първото, което трябва да решим, е архитектура, която да ни помага да мащабираме, докато добавяме повече функции, ето как изглежда:

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

Сега сме настроили архитектура, която ни гарантира, че лесно можем да добавяме нови инструменти в папка tools. Можете да добавите поддиректории за ресурси и подсказки.

### -2- Създаване на инструмент

Нека видим как изглежда създаването на инструмент. Първо, той трябва да се създаде в неговата поддиректория *tool*, например:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Валидиране на входа с помощта на Pydantic модел
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: добавяне на Pydantic, за да можем да създадем AddInputModel и да валидираме аргументите

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Тук виждаме как определяме име, описание и входна схема с Pydantic и обработващ метод, който ще бъде извикан, когато инструментът бъде извикан. Накрая експонираме `tool_add`, което е речник, съдържащ всички тези свойства.

Има и *schema.py*, който се използва за дефиниране на входната схема, която използва нашият инструмент:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Също трябва да попълним *__init__.py*, за да се уверим, че директорията с инструменти се третира като модул. Допълнително трябва да експонираме модулите в нея, например:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Можем да продължим да добавяме във този файл, докато добавяме повече инструменти.

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

Тук създаваме речник с свойства:

- name — името на инструмента.
- rawSchema — Zod схемата, която ще се използва за валидиране на входящите заявки, които извикват този инструмент.
- inputSchema — тази схема се използва от обработващия метод.
- callback — това се използва за извикване на инструмента.

Има и тип `Tool`, който преобразува този речник в тип, който обработващият MCP сървър може да приеме, и изглежда така:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Има и *schema.ts*, където пазим входните схеми за всеки инструмент, като в момента има само една, но с добавяне на инструменти можем да добавяме още:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Страхотно, нека да преминем към обработка на изброяване на инструментите.

### -3- Обработване на изброяване на инструменти

За да обработим изброяването на инструментите, трябва да настроим обработващ метод за заявка за това. Ето какво трябва да добавим във файла на сървъра:

**Python**

```python
# кодът е пропуснат за краткост
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

Тук добавяме декоратора `@server.list_tools` и реализиращата функция `handle_list_tools`. В последната трябва да създадем списък от инструменти. Забележете, че всеки инструмент трябва да има име, описание и inputSchema.   

**TypeScript**

За да настроим обработващ метод за изброяване на инструменти, трябва да извикаме `setRequestHandler` върху сървъра със схема, отговаряща на заявката, в този случай `ListToolsRequestSchema`.

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
// кодът е пропуснат за краткост
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Върнете списъка с регистрирани инструменти
  return {
    tools: tools
  };
});
```

Страхотно, сега имаме решена частта с изброяване на инструментите, нека видим как може да извикваме инструментите след това.

### -4- Обработване на извикване на инструмент

За да извикаме инструмент, трябва да настроим още един обработващ метод, този път за входящи заявки, които специфицират коя функция да се извика и с какви аргументи.

**Python**

Използваме декоратора `@server.call_tool` и го реализираме с функция като `handle_call_tool`. В тази функция трябва да вземем името на инструмента, аргументите му и да се уверим, че аргументите са валидни за конкретния инструмент. Можем да валидираме аргументите тук или в самия инструмент.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools е речник с имена на инструменти като ключове
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # извикайте инструмента
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Ето какво се случва:

- Името на инструмента вече е налично като параметър на входа `name`, също както и аргументите във вид на речник `arguments`.

- Инструментът се извиква с `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Валидацията на аргументите става в свойството `handler`, което сочи към функция. Ако не успее, ще хвърли изключение.

Ето го, вече разбираме напълно как да изброяваме и извикваме инструменти с ниско ниво сървър.

Вижте [пълния пример](./code/README.md) тук

## Задача

Разширете предоставения код с няколко инструмента, ресурси и подсказки и обмислете как забелязвате, че трябва да добавяте файлове само в папката tools и никъде другаде.

*Не е дадено решение*

## Обобщение

В тази глава видяхме как работи подходът с ниско ниво сървър и как той може да ни помогне да създадем хубава архитектура, върху която можем да надграждаме. Обсъдихме и валидацията и ви показахме как да използвате библиотеки за валидация, за да създавате схеми за входна валидация.

## Какво следва

- Следва: [Проста автентикация](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:  
Този документ е преведен с помощта на AI преводаческа услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля, имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия оригинален език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->