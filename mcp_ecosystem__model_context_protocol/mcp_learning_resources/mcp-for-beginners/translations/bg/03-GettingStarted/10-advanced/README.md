# Разширена работа със сървъра

В MCP SDK има два различни типа сървъри, вашия обикновен сървър и ниско ниво сървър. Обикновено използвате обикновения сървър за добавяне на функционалности. В някои случаи обаче е по-добре да разчитате на ниско ниво сървър, като например:

- По-добра архитектура. Възможно е да се създаде чиста архитектура с обикновения сървър и ниско ниво сървър, но може да се твърди, че е малко по-лесно с ниско ниво сървър.
- Наличност на функции. Някои разширени функции могат да се използват само с ниско ниво сървър. Това ще видите в по-късните глави, когато добавяме семплиране (отхвърлено в кандидат за издание `2026-07-28`) и извличане.

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

// Добавяне на инструмент за събиране
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

Идеята е, че изрично добавяте всеки инструмент, ресурс или подсказка, които искате сървърът да притежава. Няма нищо лошо в това.  

### Подход с ниско ниво сървър

Обаче, когато използвате подход с ниско ниво сървър, трябва да мислите малко по-различно. Вместо да регистрирате всеки инструмент, създавате по два обработващи метода за всеки тип функция (инструменти, ресурси или подсказки). Така например инструментите имат само две функции, като:

- Изброяване на всички инструменти. Една функция отговаря за всички опити за изброяване на инструменти.
- Обработка на извикване на инструмент. И тук има само една функция, която обработва извикванията към инструмент.

Това звучи като потенциално по-малко работа нали? Значи вместо да регистрираш инструмент, просто трябва да се уверя, че инструментът е в списъка, когато избирам всички инструменти, и че е извикан, когато дойде заявка за извикване на инструмент.

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
  // Върнете списъка на регистрираните инструменти
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

Сега имаме функция, която връща списък с функции. Всяка позиция в списъка инструменти вече има полета като `name`, `description` и `inputSchema`, за да съответства на типа на връщане. Това ни позволява да поставим нашите инструменти и дефиниции на функции другаде. Можем сега да създадем всички инструменти в папка tools и същото важи и за всички функции, така че проектът ви може да бъде организиран така:

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

Това е страхотно, архитектурата ни може да бъде направена много чиста.

А за извикване на инструменти, същата ли е идеята, един обработващ метод за извикване на инструмент, който и инструмент да е? Да, точно така, ето кода за това:

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

Както виждате от горния код, трябва да разпарсим кой инструмент да се извика и с какви аргументи, след което трябва да продължим с извикването на инструмента.

## Подобряване на подхода с валидация

До момента видяхте как всички ваши регистрации за добавяне на инструменти, ресурси и подсказки могат да се заменят с тези два обработващи метода за всеки тип функция. Какво още трябва да направим? Трябва да добавим някаква форма на валидация, за да осигурим, че инструментът се извиква с правилните аргументи. Всеки runtime има свое решение за това, например Python използва Pydantic, а TypeScript използва Zod. Идеята е да направим следното:

- Да преместим логиката за създаване на функция (инструмент, ресурс или подсказка) в специална папка.
- Да добавим начин за валидиране на входящи заявки за извикване на например инструмент.

### Създаване на функция

За да създадем функция, трябва да създадем файл за тази функция и да се уверим, че има задължителните полета, изисквани за тази функция. Които полета се различават между инструменти, ресурси и подсказки.

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
        # Проверка на входните данни с помощта на модел Pydantic
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

тук можете да видите как правим следното:

- Създаване на схема с Pydantic `AddInputModel` с полета `a` и `b` във файл *schema.py*.
- Опитваме се да разпарсим входящата заявка като тип `AddInputModel`, ако има несъответствие в параметрите, това ще се счупи:

   ```python
   # add.py
    try:
        # Валидирайте входните данни, използвайки Pydantic модел
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Можете да изберете дали да сложите тази логика за разпарсване в извикването на инструмента или в обработващата функция.

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

- В обработващия метод, който се занимава с всички извиквания на инструменти, сега опитваме да разпарсим входящата заявка в дефинираната от инструмента схема:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ако това сработи, тогава продължаваме да извикваме самия инструмент:

    ```typescript
    const result = await tool.callback(input);
    ```

Както виждате, този подход създава страхотна архитектура, тъй като всичко си има място, *server.ts* е много малък файл, който само свързва обработващите функции и всяка функция е в съответната си папка, т.е tools/, resources/ или /prompts.

Страхотно, нека опитаме това да изградим след това.

## Упражнение: Създаване на ниско ниво сървър

В това упражнение ще направим следното:

1. Създаване на ниско ниво сървър, който обработва изброяването на инструменти и извикването на инструменти.
1. Имплементиране на архитектура, върху която може да се надгражда.
1. Добавяне на валидация, за да осигурите, че извикванията към инструментите са правилно валидирани.

### -1- Създаване на архитектура

Първото нещо, което трябва да адресираме, е архитектура, която ни помага да мащабираме, когато добавяме повече функции, ето как изглежда:

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

Сега сме настроили архитектура, която ни позволява лесно да добавяме нови инструменти в папката tools. Можете да последвате същото за ресурси и подсказки.

### -2- Създаване на инструмент

Нека видим как изглежда създаването на инструмент. Първо, той трябва да бъде създаден в неговата *tool* подпапка, като това:

**Python**

```python
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

Това, което виждаме тук, е как дефинираме име, описание и входна схема с Pydantic и обработващ метод, който ще бъде извикан, когато инструментът бъде извикан. Накрая излагаме `tool_add`, който е речник, съдържащ всички тези свойства.

Има и *schema.py* файл, който се използва да дефинира входната схема, използвана от нашия инструмент:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Трябва също така да попълним *__init__.py*, за да осигурим, че папката tools се третира като модул. Допълнително, трябва да излагаме модулите в него, така:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Можем да продължим да добавяме в този файл, докато добавяме нови инструменти.

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

Тук създаваме речник, състоящ се от свойства:

- name, това е името на инструмента.
- rawSchema, това е Zod схемата, която ще се използва за валидиране на входящи заявки за извикване на този инструмент.
- inputSchema, тази схема ще се използва от обработващия метод.
- callback, това се използва за извикване на инструмента.

Има и `Tool`, който преобразува този речник в тип, който MCP сървърният обработващ метод може да приеме и изглежда така:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

И има *schema.ts*, където се съхраняват входните схеми за всеки инструмент, което изглежда така сега само с една схема, но когато добавим повече инструменти, можем да добавим повече записи:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Страхотно, нека преминем към обработването на изброяването на инструментите.

### -3- Обработка на изброяване на инструменти

Следващото е да настроим обработващ метод за изброяване на инструментите. Ето какво трябва да добавим в сървърния файл:

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

Тук добавяме декоратора `@server.list_tools` и имплементиращата функция `handle_list_tools`. В нея трябва да върнем списък с инструменти. Обърнете внимание, че всеки инструмент трябва да има име, описание и inputSchema.   

**TypeScript**

За да зададем обработващ метод за заявка за изброяване на инструменти, извикваме `setRequestHandler` на сървъра с подходяща схема за това, което се опитваме да направим, в случая `ListToolsRequestSchema`. 

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
// кодът е опростен за краткост
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Върнете списъка с регистрирани инструменти
  return {
    tools: tools
  };
});
```

Страхотно, сега, след като решихме изброяването на инструменти, нека разгледаме как можем да извикваме инструменти.

### -4- Обработка на извикване на инструмент

За да извикаме инструмент, трябва да зададем друг обработващ метод, този път фокусиран върху обработката на заявка, която указва коя функция да се извика и с какви аргументи.

**Python**

Използваме декоратора `@server.call_tool` и го имплементираме с функция, като например `handle_call_tool`. В нея трябва да разпарсим името на инструмента, неговите аргументи и да осигурим, че аргументите са валидни за този инструмент. Можем да валидираме аргументите тук или по-надолу в самия инструмент.

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

- Името на инструмента вече присъства като входен параметър `name`, което е вярно и за аргументите като речник `arguments`.

- Инструментът се извиква с `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Валидацията на аргументите става в свойството `handler`, което сочи към функция, ако не успее ще вдигне изключение.

Така вече имаме пълно разбиране за изброяване и извикване на инструменти с ниско ниво сървър.

Вижте [пълния пример](./code/README.md) тук

## Задача

Разширете кода, който сте получили, с множество инструменти, ресурси и подсказки и се замислете как забелязвате, че трябва само да добавите файлове в директорията tools и никъде другаде. 

*Решение не е предоставено*

## Обобщение

В тази глава видяхме как работи подходът със сървър на ниско ниво и как това може да ни помогне да създадем хубава архитектура, върху която можем да надграждаме. Обсъдихме и валидацията и ви показахме как да работите с библиотеки за валидация, за да създавате схеми за валидиране на входните данни.

## Какво следва

- Следва: [Проста автентикация](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->