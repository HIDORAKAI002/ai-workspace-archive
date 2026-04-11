# Напредна употреба сервера

У MCP SDK-у постоје два различита типа сервера, ваш уобичајени сервер и сервер ниског нивоа. Обично бисте користили регуларан сервер да бисте му додали функционалности. Ипак, у неким случајевима желите да се ослоните на сервер ниског нивоа, као што су:

- Боља архитектура. Могуће је креирати чисту архитектуру и са регуларним сервером и са сервером ниског нивоа, али може се тврдити да је то мало лакше са сервером ниског нивоа.
- Доступност функционалности. Неке напредне функције могу се користити само са сервером ниског нивоа. Ово ћете видети у каснијим поглављима како додајемо узорковање и упит.

## Регуларан сервер у односу на сервер ниског нивоа

Ево како изгледа креирање MCP сервера са регуларним сервером

**Python**

```python
mcp = FastMCP("Demo")

# Додајте алат за сабирање
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

// Додај алат за додавање
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

Поента је да експлицитно додајете сваки алат, ресурс или упит који желите да сервер има. Није ништа лоше у томе.

### Приступ серверу ниског нивоа

Међутим, када користите приступ сервера ниског нивоа, потребно је размишљати другачије. Уместо регистрације сваког алата, уместо тога креирате два обрађивача по типу функције (алати, ресурси или упити). На пример, алати имају само две функције као што су:

- Листа свих алата. Једна функција би била одговорна за све покушаје листања алата.
- Обрада позива свих алата. Овде је такође само једна функција која обрађује позиве ка алату.

То звучи као потенцијално мање посла, зар не? Дакле уместо регистрације алата, само треба да се уверим да је алат наведен када листам све алате и да се позове када стигне захтев за позив алата.

Погледајмо како код сада изгледа:

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
  // Вратите листу регистрованих алата
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

Овде сада имамо функцију која враћа листу функција. Свакa ставкa у листи алата сада има поља као што су `name`, `description` и `inputSchema` да одговарају типу повратне вредности. Ово нам омогућава да поставимо наше алате и дефиницију функција на друго место. Сада можемо креирати све наше алате у фасцикли tools и исто важи и за све ваше функције тако да ваш пројекат изненада може бити организован овако:

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

То је сјајно, наша архитектура може бити прилично чиста.

А шта је са позивима алата, да ли је онда иста идеја, један обрађивач да позове алат, било који алат? Да, управо тако, ево кода за то:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools је речник у којем су кључеви имена алата
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
    
    // аргс: request.params.arguments
    // TODO позвати алатку,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Као што видите из горњег кода, потребно је издвојити који алат се позива и са којим аргументима, а затим наставити са позивом алата.

## Побољшање приступа валидацијом

До сада сте видели како све ваше регистрације за додавање алата, ресурса и упита могу бити замењене са овим два обрађивача по типу функције. Шта још треба да урадимо? Па, требало би да додамо неки облик валидације да бисмо осигурали да је алат позван са правим аргументима. Сваки runtime има своје решење за ово, на пример Python користи Pydantic а TypeScript користи Zod. Идеја је следећа:

- Померите логику за креирање функције (алат, ресурс или упит) у њен посебан фолдер.
- Додајте начин за валидацију долазног захтева, нпр. за позив алата.

### Креирање функције

Да бисмо креирали функцију, потребно је направити датотеку за ту функцију и осигурати да има обавезна поља која су потребна за ту функцију. Која поља се мало разликују између алата, ресурса и упита.

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
        # Валидација уноса коришћењем Пидантик модела
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # ЗАУРЕДНО: додати Пидантик, тако да можемо креирати AddInputModel и валидацију аргумената

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Овде можете видети како радимо следеће:

- Креирамо шему користећи Pydantic `AddInputModel` са пољима `a` и `b` у датотеци *schema.py*.
- Покушавамо да парсирамо долазни захтев као тип `AddInputModel`, ако постоји неусаглашеност у параметрима, ово ће изазвати пад:

   ```python
   # add.py
    try:
        # Валидација улаза коришћењем Пјидантик модела
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Можете изабрати да ли ову логику парсирања ставите у сам позив алата или у функцију обраде.

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

// шема.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// додај.ts
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

- У обрађивачу који рукује свим позивима алата, сада покушавамо да парсирамо долазни захтев у дефинисану шему алата:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ако то успе, онда настављамо са позивом стварног алата:

    ```typescript
    const result = await tool.callback(input);
    ```

Као што видите, овај приступ креира одличну архитектуру јер све има своје место, *server.ts* је врло мали фајл који само повезује обрађиваче захтева, и свака функција је у свом фолдеру, нпр. tools/, resources/ или prompts/.

Одлично, хајде да следеће то изградимо.

## Вежба: Креирање сервера ниског нивоа

У овој вежби, урадићемо следеће:

1. Креирати сервер ниског нивоа који рукује листањем алата и позивима алата.
1. Имплементирати архитектуру на коју можете надоградити.
1. Додати валидацију како би ваши позиви алата били правилно проверени.

### -1- Креирајте архитектуру

Прва ствар коју треба решити је архитектура која нам помаже да скалирамо како додајемо више функција, ево како изгледа:

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

Сада смо поставили архитектуру која нам омогућава лако додавање нових алата у фолдер tools. Слободно наставите да додате потфолдере за resources и prompts.

### -2- Креирање алата

Погледајмо како изгледа креирање алата. Прво, потребно је да буде креиран у свом *tool* потфолдеру овако:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Валидација улаза користећи Пидањтик модел
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # ЗА УРАДИТИ: додати Пидањтик, тако да можемо креирати AddInputModel и валидацију аргумената

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Овде видимо како дефинишемо име, опис и улазну шему помоћу Pydantic-а и обрађивач који ће бити позван када се овај алат позове. На крају, излажемо `tool_add` који је речник који држи сва ова својства.

Постоји такође *schema.py* који дефинише улазну шему која се користи за наш алат:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Такође треба попунити *__init__.py* да би се фасцикла tools третирала као модул. Поред тога, морамо излагати модуле у њој овако:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Можемо наставити са додавањем у овај фајл како додамо више алата.

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

Овде креирамо речник који садржи својства:

- name, ово је име алата.
- rawSchema, ово је Zod шема која ће се користити за проверу улазних захтева за позив овог алата.
- inputSchema, ова шема ће се користити у обрађивачу.
- callback, ово се користи за позив алата.

Постоји и `Tool` који се користи да претвори овај речник у тип који MCP серверски обрађивач може прихватити и изгледа овако:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Постоји и *schema.ts* где чувамо улазне шеме за сваки алат, које изгледа овако са само једном шемом тренутно, али како додамо алате можемо додати више уноса:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Одлично, сада ћемо наставити са обрадом листања алата.

### -3- Обрада листања алата

Следеће, да бисмо обрадили листање наших алата, потребно је да подесимо обрађивач захтева за то. Ево шта треба да додамо у наш сервера фајл:

**Python**

```python
# код изостављен због краткоће
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

Овде додајемо декоратер `@server.list_tools` и имплементациону функцију `handle_list_tools`. У њој треба да произведемо листу алата. Обратите пажњу да сваки алат треба да има име, опис и inputSchema.

**TypeScript**

Да поставимо обрађивач захтева за листање алата, потребно је да позовемо `setRequestHandler` на серверу са шемом која одговара том захтеву, у овом случају `ListToolsRequestSchema`.

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
// код изостављен ради краткоће
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Врати листу регистрованих алата
  return {
    tools: tools
  };
});
```

Одлично, сада смо решили део листања алата, хајде да видимо како можемо да зовемо алате.

### -4- Обрада позива алата

Да позовемо алат, потребно је да поставимо други обрађивач захтева, овога пута фокусиран на захтев који специфицира коју функцију звати и са којим аргументима.

**Python**

Хајде да користимо декоратер `@server.call_tool` и имплементирамо га функцијом као `handle_call_tool`. У тој функцији треба издвојити име алата, његов аргумент и осигурати да су аргументи валидни за тај алат. Можемо валидацију аргумената урадити у овој функцији или касније, у самом алату.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools је речник са именима алата као кључевима
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # позови алат
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Ево шта се догађа:

- Име нашег алата је већ присутно као улазни параметар `name`, што важи и за наше аргументе у облику речника `arguments`.

- Алат се позива са `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Валидација аргумената се дешава у својству `handler` које указује на функцију, ако то не успе, изазваће изузетак.

Ето, сада имамо потпуно разумевање листања и позивања алата користећи сервер ниског нивоа.

Види [пуни пример](./code/README.md) овде

## Задатак

Проширите код који сте добили са неколико алата, ресурса и упита и размислите како примећујете да треба да додате фајлове само у фолдер tools и нигде друго.

*Решење није дато*

## Резиме

У овом поглављу смо видели како приступ сервера ниског нивоа функционише и како нам то може помоћи да креирамо лепу архитектуру на којој можемо наставити да градимо. Такође смо разговарали о валидацији и показано вам је како радити са библиотекама за валидацију да бисте креирали шеме за валидирање улаза.

## Шта следи

- Следеће: [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ограничење одговорности**:
Овај документ је преведен коришћењем AI сервиса за превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако се трудимо да буде прецизно, имајте у виду да аутоматизовани преводи могу садржати грешке или нетачности. Изворни документ на свом оригиналном језику треба сматрати ауторитетом. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква непоразумевања или погрешне тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->