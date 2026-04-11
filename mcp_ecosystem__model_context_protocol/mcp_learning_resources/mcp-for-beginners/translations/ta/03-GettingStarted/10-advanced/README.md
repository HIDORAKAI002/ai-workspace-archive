# மேம்பட்ட சேவையகம் பயன்பாடு

MCP SDK-இல் இரண்டு விதமான சேவையகங்கள் கொடுக்கப்பட்டுள்ளன, உங்கள் சாதாரண சேவையகம் மற்றும் குறைந்த மட்ட சேவையகம். சாதாரணமாக, நீங்கள் அதற்குத் திறன்களைச் சேர்க்க சாதாரண சேவையகத்தைப் பயன்படுத்துவீர்கள். ஆனால் சில வழிகளில், நீங்கள் குறைந்த மட்ட சேவையகத்தின் நிரம்பி இருக்க வேண்டும், உதாரணமாக:

- சிறந்த கட்டமைப்பு. சாதாரண சேவையகம் மற்றும் குறைந்த மட்ட சேவையகம் இரண்டிலும் சுத்தமான கட்டமைப்பை உருவாக்க இயலும், ஆனாலும் குறைந்த மட்ட சேவையகத்துடன் செய்வது கொஞ்சம் எளிதானதாக இருக்கலாம்.
- திறன்கள் கிடைப்பில். சில மேம்பட்ட திறன்கள் மட்டுமே குறைந்த மட்ட சேவையகத்துடன் பயன்படுத்தக்கூடும். பார்வையாளர்கள் அடுத்த அத்தியாயங்களில் எடுத்துக்காட்டப்படும் மாதிரிகள் மற்றும் நிகழ்த்தல் வசதிகளைச் சேர்க்கும்போது இதைக் காண்பீர்கள்.

## சாதாரண சேவையகம் மற்றும் குறைந்த மட்ட சேவையகம்

சாதாரண சேவையகம் கொண்டு MCP சேவையகத்தை உருவாக்குவது இங்கே எப்படி இருக்கும்:

**Python**

```python
mcp = FastMCP("Demo")

# ஒரு சேர்க்கை கருவியைச் சேர்க்கவும்
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

// ஒரு கூட்டுதல் கருவியைச் சேர்க்கவும்
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

நீங்கள் சேவையகத்தில் சேர்க்க விரும்பும் ஒவ்வொரு கருவியும், வளரும் அல்லது தூண்டுதலும் நீங்கள் தெரிவிப்பதுதான் இங்குள்ள நோக்கம். இதில் தவறு என்னும் ஒன்று இல்லை.  

### குறைந்த மட்ட சேவையக அணுகுமுறை

ஆனால், குறைந்த மட்ட சேவையக அணுகுமுறையைப் பயன்படுத்தும் போது, அதை வேறுபடியாக எண்ண வேண்டும். ஒவ்வொரு கருவி வகைக்கு (கருவிகள், வளங்கள் அல்லது தூண்டுதல்கள்) இரண்டு கையாளர்களை உருவாக்க வேண்டும். உதாரணமாக கருவிகள் இரண்டு செயல்பாடுகள் தான் கொண்டிருக்கும்:

- அனைத்து கருவிகளையும் பட்டியலிடுதல். ஒரு செயல்பாடு அனைத்து கருவிகளையும் பட்டியலிடும் முயற்சிகளுக்குப் பொறுப்பேற்கிறது.
- அனைத்து கருவிகளுக்கும் அழைப்பையை கையாளுதல். இங்கே ஒரே செயல்பாடு ஒரு கருவியை அழைக்கக் கூடிய அழைப்புகளை கையாள்கிறது.

இது குறைவான வேலை போல் தெரிகிறதா? ஆகவே, ஒரு கருவியை பதிவு செய்யுவதற்கு பதிலாக, அனைத்து கருவிகளையும் பட்டியலிடும் போது அது பட்டியலிடப்படுவதை உறுதி செய்ய வேண்டும், மேலும் ஒரு கருவியை அழைக்க வேண்டிய கோரிக்கை வந்தால் அது அழைக்கப்பட வேண்டும். 

இப்போது குறைந்த மட்ட சேவையகக் கோட் எப்படி இருக்கும் பார்ப்போம்:

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
  // பதிவு செய்யப்பட்ட கருவிகள் பட்டியலைத் திருப்பி வழங்கவும்
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

இங்கே தற்போது ஒரு செயல்பாடு திறன்களை பட்டியலிடும் பட்டியலை திருப்புகிறது. கருவிகள் பட்டியலின் ஒவ்வொரு இடுகையும் `name`, `description` மற்றும் `inputSchema` போன்ற புலங்களை கொண்டுள்ளது, அவை திருப்பும் வகையை பின்பற்றின்றன. இதனால் கருவிகளும் திறன் வரையறைகளும் வேறு இடத்தில் வைக்க முடியும். இப்போது நாம் அனைத்து கருவிகளையும் tools என்ற கோப்புறையில் உருவாக்கி, போன்றவையும் உங்கள் அனைவரும் உங்கள் திட்டத்தை இப்படி அமைக்கலாம்:

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

அது அருமை, நம் கட்டமைப்பை மிகவும் சுத்தமாக அமைக்கலாம்.

கருவிகளை அழைப்பது எப்படி, அதே கருத்தா, ஒரு கையாளர் எந்த கருவியையும் அழைக்கும்? ஆம், அதே, இதோ அதற்கான கோட்:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools என்பது கருவி பெயர்களை விசைகளாக கொண்ட ஒரு அகராதி ஆகும்
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
    // TODO கருவியை அழைக்கவும்,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

மேலுள்ளக் கோட்டில் பார்க்க முடியும், நாம் அழைக்க வேண்டிய கருவி மற்றும் அதன் வாதங்களைப் பகுப்பாய்வு செய்ய வேண்டும், பின்னர் கருவியை அழைக்க வேண்டும்.

## சரிபார்ப்புடன் அணுகுமுறையை மேம்படுத்துதல்

இதுவரை, கருவிகள், வளங்கள் மற்றும் தூண்டுதல்களைச் சேர்க்கும் உங்கள் அனைத்து பதிவுகளையும் இவ்வாறு இரண்டு கையாளர்களால் மாற்ற முடியும் என்பதைப் பார்த்துள்ளீர்கள். இன்னும் என்ன செய்ய வேண்டும்? நல்லது, கருவி சரியான வாதங்களுடன் அழைக்கப்படுகிறது என்பதை உறுதி செய்ய ஒரு விதமான சரிபார்ப்பை சேர்க்க வேண்டும். ஒவ்வொரு ரன்டைமுக்கும் தனித்துவமான தீர்வு உள்ளது, உதாரணமாக Python-ல் Pydantic பயன்படுத்தப்படுகிறது மற்றும் TypeScript-ல் Zod பயன்படுத்தப்படுகிறது. கருத்து இது:

- திறன் ஒன்றை உருவாக்கும் (கருவி, வளம் அல்லது தூண்டுதல்) புதிய கோப்பை அதன் சிறப்பு கோப்புறையில் உருவாக்கு.
- கருவியை அழைக்குமாறு கோரிக்கை வந்தால் அதை சரிபார்க்கும் வழியை சேர்க்கவும்.

### திறனைக் உருவாக்குதல்

திறனைக் உருவாக்க, அந்த திறனுக்கு கோப்பை உருவாக்கி அவற்றில் தகுதியான புலங்களை உள்ளிட வேண்டும். கருவிகள், வளங்கள் மற்றும் தூண்டுதல்களுக்கு புலங்கள் சிறிது மாறுபடும்.

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
        # Pydantic மாதிரியைப் பயன்படுத்தி உள்ளீட்டை சரிபார்க்கவும்
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ஐச் சேர்க்கவும், ஆகவே நாம் ஒரு AddInputModel ஐ உருவாக்கி மாறி வலிமையைச் சரிபார்க்க முடியும்

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

இதோ நாம் இதை எப்படி செய்கிறோம்:

- Pydantic மூலம் *schema.py* கோப்பில் நேர்முக புல்களை கொண்ட `AddInputModel` எனும் ஸ்கீமா உருவாக்குதல்.
- வரும் கோரிக்கையை `AddInputModel` வகையாகப் பகுப்பாய்வு செய்ய முயற்சி செய்தல், வாதங்களில் பிழை இருந்தால் அது பிழையை ஏற்படுத்தும்:

   ```python
   # add.py
    try:
        # Pydantic மாடலைப் பயன்படுத்தி உள்ளீட்டைச் சரிபார்க்கவும்
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

இந்த பகுப்பாய்வு முறையை கருவி அழைப்பில் நேரடியாகவும் அல்லது கையாளர் செயல்பாட்டில் வைக்கலாம்.

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

- அனைத்து கருவி அழைப்புக்களை கையாளும் கையாளரின் உள்ளே, வரும் கோரிக்கையை கருவியின் வரையறுக்கப்பட்ட ஸ்கீமாவாக மாற்ற முயற்சி செய்கிறோம்:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    அது சரியாக நடக்குமானால் அப்போதுதான் கருவியை அழைக்கும்:

    ```typescript
    const result = await tool.callback(input);
    ```

இந்த அணுகுமுறை சிறந்த கட்டமைப்பை உருவாக்குகிறது, ஏனெனில் அனைத்தும் தங்களுடைய இடங்களில் இருக்கின்றன, *server.ts* ஒரு மிகச் சிறிய கோப்பு ஆகும், அது கோரிக்கைக் கையாளர்களைக் குறி करता மற்றும் ஒவ்வொரு திறனும் முறையான துறைகளில் உள்ளது: tools/, resources/ அல்லது /prompts/.

நன்று, இதை அடுத்து உருவாக்க முயற்சிப்போம். 

## பயிற்சி: குறைந்த மட்ட சேவையகத்தை உருவாக்குதல்

இந்த பயிற்சியில், இதை மேற்கொள்வோம்:

1. கருவிகள் பட்டியலிடுதலும் அழைப்பதும் கையாளும் குறைந்த மட்ட சேவையகத்தை உருவாக்கு.
2. மேலோட்டமாக கட்டமைப்பை செயல்படுத்து.
3. உங்கள் கருவி அழைப்புக்கள் சரியாக சரிபார்க்கபட்டு இருப்பதைக் கண்டுகொள்ள சரிபார்ப்பைச் சேர்த்து.

### -1- கட்டமைப்பை உருவாக்கு

முதலில், நாம் எண்ண வேண்டியது இது: மேலும் திறன்களைச் சேர்க்கும்போது எளிதில் பராமரிக்கப்படக்கூடிய கட்டமைப்பு. இதோ அது எப்படி உள்ளது:

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

இப்போது நாம் ஒரு கட்டமைப்பை அமைத்துள்ளோம், இது tools என்ற கோப்புறையில் புதிய கருவிகளை எளிதில் சேர்க்கச் செய்கிறது. வளங்கள் மற்றும் தூண்டுதல்களுக்கு துணைக்கோப்புறைகளை சேர்க்க விரும்பினால் இதற்குப் பின்பற்றவும்.

### -2- கருவியை உருவாக்குதல்

அடுத்தம், கருவியை உருவாக்குவது எப்படி உள்ளது பார்ப்போம். முதலில் அது அதன் *tool* துணைக் கோப்புறையில் உருவாக்கப்பட வேண்டும்.

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic மாதிரியை பயன்படுத்தி உள்ளீட்டை சரிபார்க்கவும்
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # செய்யவேண்டியது: Pydantic ஐச் சேர்க்கவும், அதனால் நாம் ஒரு AddInputModel ஐ உருவாக்கி args ஐ சரிபார்க்க முடியும்

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

இங்கே நாம் பெயர், விளக்கம் மற்றும் உள்ளீடு ஸ்கீமாவைப் Pydantic கொண்டு வரையறுத்து, கருவி அழைக்கப்படும் போது இயக்கப்படும் கையாளரைக் குறிப்பிடுகிறோம். இறுதியில், அனைத்து இந்த பண்புகளையும் கொண்ட `tool_add` என்ற அகராதி வெளிப்படுத்துகிறது.

மேலும், கருவியின் உள்ளீடு ஸ்கீமாவுக்காக பயன்படும் *schema.py* உள்ளது:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

*__init__.py* யிலும், tools கோப்புறை ஒரு MODULE ஆக கருதப்படுவதற்குத் தேவையான உள்ளடக்கம் சேர்க்க வேண்டும். மேலும், அதிலுள்ள தொகுதிகளையும் வெளிப்படுத்த வேண்டும்:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

கருவிகளைச் சேர்க்கும் போதே இந்த கோப்பினை தொடர்ந்தும் புதுப்பிக்கலாம்.

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

இங்கே நாம் பண்புகளைக் கொண்ட ஒரு அகராதியை உருவாக்குகிறோம்:

- name: கருவியின் பெயர்.
- rawSchema: இது Zod ஸ்கீமா, இந்த கருவியை அழைக்க வரும் கோரிக்கைகளை சரிபார்க்க பயன்படுத்தப்படும்.
- inputSchema: கையாளரால் பயன்படுத்தப்படும் ஸ்கீமா.
- callback: கருவியை அழைக்க பயன்படும்.

`Tool` என்ற வகையை இதனை மாற்ற பயன்படுத்துகிறோம், மேலும் அது MCP சேவையக கையாளர்கள் ஏற்கும் வகையில் இருக்கிறது:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

மற்றும் *schema.ts* உள்ளது, இது ஒவ்வொரு கருவிக்கும் உள்ளீடு ஸ்கீமாவைச் சேமிக்கிறது; இப்போது ஒன்றே உள்ளது, ஆனால் புதிய கருவிகளைச் சேர்க்கும்போது இங்கு நுழைவுகள் கூடுதலாகச் சேர்க்கலாம்:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

நன்று, அடுத்து கருவிகளின் பட்டியலை கையாள்வதற்குச் செல்லலாம்.

### -3- கருவி பட்டியலை கையாளுதல்

அடுத்ததாக, கருவிகள் பட்டியலிடுவதற்கான கோரிக்கையை கையாளும் கையாளரை அமைக்க வேண்டும். இது சேவையகக் கோப்பில் சேர்க்கவேண்டியது:

**Python**

```python
# சுருக்கத்திற்காக குறியீடு அகற்றப்பட்டது
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

இங்கே, `@server.list_tools` அலங்காரியைச் சேர்த்து, `handle_list_tools` செயல்பாட்டை எழுதுகிறோம். இதில், கருவிகளின் பட்டியலை உருவாக்க வேண்டும். ஒவ்வொரு கருவிக்கும் `name`, `description` மற்றும் `inputSchema` தேவை என்பதைக் கவனிக்கும்.   

**TypeScript**

கருவிகள் பட்டியலிடுவதற்கான கோரிக்கைக்கான கையாளரை அமைக்க, `setRequestHandler` ஐ சரியான ஸ்கீமாவுடன் சேவையகத்தில் அழைக்க வேண்டும்; இங்கு அது `ListToolsRequestSchema`.

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
// சுருக்கத்துக்காக குறியீடு விடப்பட்டுள்ளது
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // பதிவுசெய்யப்பட்ட கருவிகளின் பட்டியலைத் திருப்பி அளிக்கவும்
  return {
    tools: tools
  };
});
```

நன்று, இப்பொழுது கருவிகள் பட்டியலிடல் கையாளப்பட்டது, அடுத்ததாக கருவிகளை அழைக்கும் முறையை பார்ப்போம்.

### -4- கருவி அழைப்பைப் கையாளுதல்

ஒரு கருவியை அழைக்க, மற்றொரு கோரிக்கை கையாளரை அமைக்க வேண்டும். இது, எந்தக் குணப்பொருளை எந்த வாதங்களுடன் அழைக்க வேண்டும் என்பதைக் குறிப்பதாக இருக்கும்.

**Python**

`@server.call_tool` அலங்காரியைப் பயன்படுத்தி, `handle_call_tool` என்ற செயல்பாட்டை எழுதுவோம். இவ்விளக்கத்தில் கருவி பெயர், அதன் வாதங்களை பகுப்பாய்வு செய்து, அவை சரியானவையாக உள்ளதா என்பதை உறுதி செய்ய வேண்டும். இதைப் இந்த செயல்பாட்டிலோ அல்லது கருவியின் உள்ளே சரிபார்க்கலாம்.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools என்பது கருவி பெயர்களை விசைகளாக கொண்ட ஒரு அகராதி ஆகும்
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # கருவியை இயக்குக
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

இதோ என்ன நடக்கின்றது:

- `name` என்பது உள்ளீடு அளவுருவாக கருவிப் பெயரை வைத்திருக்கிறது; `arguments` என்ற அகராதியில் அவை உள்ளன.

- கருவி `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` மூலம் அழைக்கிறது. வாதங்களின் சரிபார்ப்பு `handler` என்ற பண்பில் நடைபெறுகிறது; அது ஒரு செயல்பாட்டை குறிக்கிறது, அது தோல்வியடைந்தால் ஒரு தவறு எழுப்பப்படும்.

இதோ, குறைந்த மட்ட சேவையகம் கொண்டு கருவிகளை பட்டியலிட்டு, அழைப்பது எப்படி என்பதை முழுமையாக புரிந்துகொண்டோம்.

[முழு எடுத்துக்காட்டு](./code/README.md) இங்கே உள்ளது

## பணிவிதி

உங்களிடம் கொடுக்கப்பட்டுள்ளக் கோட்டில் பல கருவிகள், வளங்கள் மற்றும் தூண்டுதல்கள் சேர்க்கிறது, மேலும் tools கோப்புறையில் கோப்புகளை மட்டுமே சேர்க்கவேண்டியதெப்படி தெரிகிறது என்பதை கருத்தில் கொள்ளுங்கள். 

*ப 해결책 இல்லை*

## சுருக்கம்

இந்த அத்தியாயத்தில் குறைந்த மட்ட சேவையகத்தின் செயல்பாடு மற்றும் அதை கொண்டு நல்ல கட்டமைப்பை உருவாக்குவது எவ்வாறு என்பதைப் பார்த்தோம். சரிபார்ப்பு பற்றி பேசினோம் மற்றும் உள்ளீடு சரிபார்ப்புக்கான ஸ்கீமாக்களை உருவாக்க சரிபார்ப்பு நூலகங்களைப் பயன்படுத்துவது எப்படி என்பதை கண்டோம்.

## அடுத்தது என்ன

- அடுத்து: [எளிய அங்கீகாரம்](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**தவறான விளக்கம்**:  
இந்த ஆவணம் [Co-op Translator](https://github.com/Azure/co-op-translator) என்ற AI மொழி பெயர்ப்பு சேவையை பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயல்கிறோம், எனினும் தானியங்கி மொழிபெயர்ப்புகள் தவறுகள் அல்லது சிக்கல்கள் கொண்டிருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். இ原始 ஆவணம் அதன் உள்ளூர்மொழியில் செல்வாக்கு வாய்ந்த மூலமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்காக, தொழில்முறை மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதன் மூலம் ஏற்படும் ஏதாவது தவறான புரிதல்கள் அல்லது தவறான விளக்கங்களுக்கு எங்கள் பொறுப்பு இல்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->