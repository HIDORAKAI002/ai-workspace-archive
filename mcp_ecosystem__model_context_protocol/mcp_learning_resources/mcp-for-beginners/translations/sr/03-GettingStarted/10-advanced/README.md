# Напредна употреба сервера

У MCP SDK постоје два различита типа изложених сервера, ваш нормални сервер и ниско-нивоски сервер. Обично бисте користили редован сервер да бисте додавали функције. Међутим, у неким случајевима желите да се ослоните на ниско-нивоски сервер као што су:

- Боља архитектура. Могуће је направити чисту архитектуру са оба, редовним и ниско-нивоским сервером, али може се тврдити да је мало лакше са ниско-нивоским сервером.
- Доступност функција. Неке напредне функције могу се користити само са ниско-нивоским сервером. Ово ћете видети у каснијим поглављима када додајемо узорковање (депрецирано у `2026-07-28` кандидату за издање) и елицитацију.

## Редован сервер vs ниско-нивоски сервер

Ево како изгледа креирање MCP сервера са редовним сервером

**Python**

```python
mcp = FastMCP("Demo")

# Додај алат за сабирање
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

// Додај алат за сабирање
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

Главна поента је да експлицитно додате сваки алат, ресурс или подсетник који желите да сервер има. Нема ништа лоше у томе.  

### Приступ ниско-нивоског сервера

Међутим, када користите приступ ниско-нивоског сервера, потребно је другачије размишљати. Уместо регистрације сваког алата, направите два обрађивача по типу функције (алатке, ресурси или подсетници). На пример, алатку сада имају само две функције овако:

- Листање свих алата. Једна функција је задужена за све покушаје да се алатке поброје.
- Обрада позивања свих алата. Такође, ту је само једна функција која обрађује позиве алатки.

Звуче као потенцијално мање посла, зар не? Дакле, уместо регистрације алатке, само треба да обезбедим да је алатка подата у листи када набрајам све алатке и да се позове када стигне захтев за позив алатке.

Погледајмо како сада изгледа код:

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

Овде сада имамо функцију која враћа листу функција. Сваки унос у листи алата садржи поља као што су `name`, `description` и `inputSchema` да би се придржавали типа повратних података. Ово нам омогућава да алатке и дефиниције функција чувамо на другом месту. Сада можемо креирати све алатке у фасцикли tools, и исто важи за све ваше функције па пројекат може одједном бити организован овако:

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

А шта је са позивом алата, да ли је идеја иста, један обрађивач који позива било који алат? Да, управо тако, ево кода за то:

**Python**

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
    // TODO позвати алат,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Као што видите из горњег кода, потребно је издвојити који алат се позива и са којим аргументима, а онда наставити са позивом алата.

## Побољшање приступа валидацијом

До сада сте видели како све ваше регистрације за додавање алата, ресурса и подсетника могу бити замењене овим двема функцијама по типу функције. Шта још треба да урадимо? Требало би да додамо неки облик валидације да бисмо обезбедили да се алат позива са исправним аргументима. Сваки програмски језик има своје решење за то, на пример Python користи Pydantic, а TypeScript користи Zod. Идеја је да урадимо следеће:

- Померимо логику креирања функције (алата, ресурса или подсетника) у њен посебан фолдер.
- Додамо начин за валидацију долазног захтева који, на пример, тражи позив алата.

### Креирање функције

Да бисмо креирали функцију, мораћемо да направимо фајл за ту функцију и да обезбедимо да има обавезна поља која та функција захтева. Која се поља разликују између алата, ресурса и подсетника.

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

    # TODO: додати Пидантик, тако да можемо креирати AddInputModel и валидирати аргументе

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

овде можете видети како радимо следеће:

- Креирамо шему користећи Pydantic `AddInputModel` са пољима `a` и `b` у фајлу *schema.py*.
- Покушавамо да парсирамо долазни захтев као тип `AddInputModel`, ако постоји неслагање параметара, ово ће изазвати грешку:

   ```python
   # add.py
    try:
        # Валидација уноса користећи Пидантик модел
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Можете да одлучите да ли ћете ову логику парсирања ставити у сам позив алата или у функцију обраде.

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

- У обрађивачу који се бави свим позивима алата, сада покушавамо да парсирамо долазни захтев у дефинисану шему за тај алат:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ако то успе, онда настављамо са позивом стварног алата:

    ```typescript
    const result = await tool.callback(input);
    ```

Као што видите, овај приступ ствара одличну архитектуру јер све има своје место, *server.ts* је врло мали фајл који само повезује обрађиваче захтева, а свака функција је у свом одговарајућем фолдеру, односно tools/, resources/ или prompts/.

Одлично, хајде да покушамо да ово изградимо следеће.

## Вежба: Креирање ниско-нивоског сервера

У овој вежби урадићемо следеће:

1. Креирати ниско-нивоски сервер који се бави листањем и позивом алатки.
1. Имплементирати архитектуру на којој можете градити.
1. Додати валидацију да би ваш позив алата био исправно валидиран.

### -1- Креирање архитектуре

Прва ствар коју треба да решимо је архитектура која нам помаже да се скалирамо како додајемо више функција, ево како изгледа:

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

Сада смо поставили архитектуру која омогућава лако додавање нових алата у фолдер tools. Слободно пратите овај пример да додате подфасцикле за ресурсе и подсетнике.

### -2- Креирање алата

Хајде да видимо како изгледа креирање алатке. Пре свега, мора бити креирана у свом *tool* поддиректорјуму овако:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Валидација уноса користећи Пидантик модел
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: додај Пидантик, да можемо креирати AddInputModel и валидирати аргументе

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Овде видимо како дефинишемо име, опис и шему улаза користећи Pydantic и обрађивач који ће бити позван када се овај алат позове. На крају, изложимо `tool_add` који је речник који држи сва ова својства.

Постоји и *schema.py* који се користи да дефинише улазну шему коју наш алат користи:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Такође морамо попунити *__init__.py* да бисмо осигурали да се фолдер tools третира као модул. Додатно, морамо изложити модуле унутар њега овако:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Можемо наставити додавање у овај фајл како додајемо више алата.

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
- rawSchema, ово је Zod шема, користиће се за валидацију долазних захтева да се позове овај алат.
- inputSchema, ову шему користи обрађивач.
- callback, користи се за позив алата.

Постоји и `Tool` који служи да претвори овај речник у тип који MCP сервер обрађивач може прихватити и изгледа овако:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Постоји и *schema.ts* у којем чувамо улазне шеме за сваки алат који тренутно изгледа овако са само једном шемом, али како додајемо алатке можемо додавати више уноса:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Одлично, идемо даље са обрадом листања наших алата.

### -3- Обрада листања алата

Затим, да бисмо обрадили листање алата, морамо поставити обрађивач захтева за то. Ево шта морамо додати у наш серверски фајл:

**Python**

```python
# код изостављен ради краткоће
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

Овде додајемо декоратор `@server.list_tools` и функцију која га имплементира `handle_list_tools`. У овој функцији потребно је произвести листу алатки. Обратите пажњу да сваки алат мора имати име, опис и inputSchema.   

**TypeScript**

Да поставимо обрађивач захтева за листање алата, позивамо `setRequestHandler` на серверу са шемом која одговара оно што покушавамо да урадимо, у овом случају `ListToolsRequestSchema`. 

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
  // Вратити листу регистрованих алата
  return {
    tools: tools
  };
});
```

Одлично, сада смо решили део листања алата, погледајмо како можемо позивати алате.

### -4- Обрада позива алата

Да бисмо позвали алат, морамо поставити још један обрађивач захтева, овај пут фокусираан на обраду захтева који одређује коју функцију позвати и са каквим аргументима.

**Python**

Користимо декоратор `@server.call_tool` и имплементирамо га функцијом као што је `handle_call_tool`. Унутар те функције морамо издвојити име алата, његов аргумент и осигурати да су аргументи исправни за тај алат. Можемо или да валидамо аргументе у овој функцији или касније у самом алату.

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

Ево шта се дешава:

- Име нашег алата је већ присутно као улазни параметар `name`, што важи и за аргументе у облику речника `arguments`.

- Алат се позива са `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Валидација аргумената се дешава у пољу `handler` које показује на функцију, ако то не успе, бациће изузетак.

Ето, сада имамо пуну слику како да набрајамо и позивамо алате користећи ниско-нивоски сервер.

Погледајте [пун пример](./code/README.md) овде

## Задатак

Проширите добијени код са више алатки, ресурса и подсетника и размотрите како примећујете да треба да додате фајлове само у фолдер tools и нигде више. 

*Решење није дато*

## Резиме

У овом поглављу смо видели како приступ ниско-нивоског сервера функционише и како нам може помоћи да направимо лепу архитектуру на коју можемо наставити да градимо. Такође смо разговарали о валидацији и показано вам је како радити са библиотекама за валидацију да бисте креирали шеме за валидацију улаза.

## Шта следи

- Следеће: [Једноставна аутентификација](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->