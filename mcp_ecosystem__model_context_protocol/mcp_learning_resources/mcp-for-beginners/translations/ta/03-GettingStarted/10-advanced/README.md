# மேம்பட்ட சர்வர் பயன்பாடு

MCP SDK இல் இரண்டு விதமான சர்வர்கள் உள்ளன, உங்கள் சாதாரண சர்வரும் திறந்த அடிப்படையிலான குறைந்தநிலை சர்வரும். பொதுவாக, நீங்கள் அதில் இணைப்பதற்கான அம்சங்களை சேர்க்க சாதாரண சர்வரைப் பயன்படுத்துவீர்கள். ஆனால் சில சூழல்களில், குறைந்தநிலை சர்வருக்கு நம்பிக்கை வைக்க விரும்புகிறீர்கள், உதாரணமாக:

- சிறந்த கட்டமைப்பு. சாதாரண சர்வர் மற்றும் குறைந்தநிலை சர்வர் இரண்டும் இணைந்த ஒரு தூயிய கட்டமைப்பை உருவாக்கக்கூடும், ஆனால் குறைந்தநிலை சர்வருடன் இது கொஞ்சமாக எளிதாக இருக்கும் என்று வாதிடலாம்.
- அம்சக் கிடைப்புத்தன்மை. சில மேம்பட்ட அம்சங்கள் குறைந்தநிலை சர்வருடன் மட்டுமே பயன்படுத்தப்படலாம். புதிய அத்தியாயங்களில் நாம் எடுத்துக்காட்டிற்று தற்போது எடுக்கப்படும் மாதிரிமுறை (2026-07-28 வெளியீட்டு சிறப்புக் குறிப்பில் புறக்கணிக்கப்பட்டது) மற்றும் ஈசிகிறைப்பு.

## சாதாரண சர்வர் மற்றும் குறைந்தநிலை சர்வர்

சாதாரண சர்வர் மூலம் MCP சர்வர் உருவாக்கப்படுவது இதுவாக இருக்கும்

**Python**

```python
mcp = FastMCP("Demo")

# ஒரு கூட்டல் கருவியைச் சேர்க்கவும்
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

// ஒரு கூடுதல் கருவியைச் சேர்
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

முக்கியமானது, நீங்கள் சர்வர் உடையதாக வேண்டும் என்று விரும்பும் ஒவ்வொரு கருவி, வளம் அல்லது முன்மொழியலை தற்செயல்படுத்தி சேர்க்கிறீர்கள். இதில் எதுவும் தவறல்ல.  

### குறைந்தநிலை சர்வர் அணுகுமுறை

ஆனால், குறைந்தநிலை சர்வர் அணுகுமுறை பயன்படுத்தும்போது நீங்கள் வேறுபாடாகவே சிந்திக்க வேண்டும். ஒவ்வொரு கருவி வகை (கருவிகள், வளங்கள் அல்லது முன்மொழியல்கள்) க்கும் இரண்டு ஹாண்ட்லர்களை உருவாக்க வேண்டும். உதாரணமாக, கருவிகளுக்கான இரண்டு செயல்பாடுகள் இருக்கும்:

- அனைத்து கருவிகளையும் பட்டியலிடுதல். ஒரே செயல்பாடு அனைத்து கருவிகள் பட்டியலிட முயற்சிகளையும் கவனிக்கும்.
- எல்லா கருவிகளையும் அழைக்க பராமரித்தல். இதிலும் ஒரு செயல்பாடு மட்டும் ஒரு கருவியை அழைப்பதைக் கவனிக்கும்.

இது குறைவான வேலை போலத் தெரிகிறதா? எனவே ஒரு கருவியை பதிவு செய்வதைப் பதிலாக, நான் கருவிகள் பட்டியலில் இருக்க வேண்டும் என்பதை உறுதிப்படுத்த வேண்டும் மற்றும் கருவி அழைக்க வேண்டுமானால் அழைக்கப்பட வேண்டும்.

இப்போது குறைந்தநிலை சர்வர் குறியீடு இந்த மாதிரி இருக்கும்:

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
  // பதிவுசெய்யப்பட்ட கருவிகள் பட்டியலை திருப்பிக் கொடு
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

இங்கே ஒரு செயல்பாடு அம்சங்களுக்கான பட்டியலை திருப்பி அளிக்கிறது. கருவிகள் பட்டியலில் ஒவ்வொரு நுழைவிலும் `name`, `description` மற்றும் `inputSchema` போன்ற புலங்கள் உள்ளன. இது திரும்பும் வகையை பின்பற்றுகிறது. இதனால் கருவிகள் மற்றும் அம்ச வரைவுகளை வேறு இடங்களில் வைக்க எங்கள் வாய்ப்பு ஏற்படுகிறது. இப்போது எல்லா கருவிகளும் tools என்ற கோப்புறையில் மற்றும் அதேபோல் உங்கள் அனைத்து அம்சங்களும் தனித்தனியாக ஒழுங்குபடுத்தப்பட்டுள்ளதாம் போல உங்கள் திட்டம் அமைக்கலாம்:

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

இதன் மூலம் நமது கட்டமைப்பு மிகவும் தூய்மையானதாக இருக்கும்.

கருவிகள் அழைப்பது எப்படி, அதுவே ஒரே யோசனைகளா? ஆம், சரி, அதற்கான குறியீடு இங்கே உள்ளது:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools என்பது சாதனங்களின் பெயர்கள் விசைகளாக உள்ள அகராதி ஆகும்
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
    // செய்யவேண்டும் கருவியை அழைக்கவும்,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

மேலே உள்ள குறியீட்டில், எந்த கருவி அழைக்கப்படுவதை மற்றும் எந்த அளவுருக்களுடன் அழைக்கப்பட வேண்டும் என்பதைக் கோரிக்கையை பிசாசாக்க வேண்டும். பின்னர் அந்த கருவியை அழைக்கவேண்டும்.

## சரிபார்ப்புடன் அணுகுமுறையை மேம்படுத்துதல்

இதுவரை நீங்கள் கருவிகள், வளங்கள் மற்றும் முன்மொழியல்கள் சேர்ப்பதற்கான பதிவுகளை இந்த இரண்டு ஹாண்ட்லர்களால் மாற்ற முடியும் என்று பார்த்தீர்கள். இன்னும் என்ன செய்ய வேண்டும்? கருவியை சரியான அளவுருக்கள் கொண்டு அழைக்கப்படுவதை உறுதிப்படுத்த ஒரு வகை சரிபார்ப்பை சேர்க்க வேண்டும். ஒவ்வொரு ரன்டைம்க்கும் தனித்தனி தீர்வு உள்ளது, உதாரணமாக Python பைடன்டிக், TypeScript Zod பயன்படுத்துகிறது. நாம் செய்ய வேண்டியது:

- ஒரு அம்சத்தை (கருவி, வளம் அல்லது முன்மொழியல்) உருவாக்குவதற்கான கட்டளை அதற்கு ஒதுக்கப்பட்ட கோப்புறையில் நகர்த்துதல்.
- ஒரு கருவி அழைக்கப்படும் கோரிக்கையை சரிபார்க்கும் முறையைச் சேர்க்குதல்.

### ஒரு அம்சத்தை உருவாக்குதல்

ஒரு அம்சத்தை உருவாக்க, அந்த அம்சத்திற்கான கோப்பை உருவாக்கி அவசியமான புலங்கள் உள்ளதா என்று உறுதிப்படுத்த வேண்டும். கருவிகள், வளங்கள் மற்றும் முன்மொழியல்கள் ஆக சில புலங்கள் வேறுபடும்.

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

    # செயல்: Pydantic ஐச் சேர்க்கவும், அதனால் நாம் AddInputModel ஐ உருவாக்கி அளவுருக்களை சரிபார்க்க முடியும்

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

இங்கு நாம் என்ன செய்கிறோம் என்று காணலாம்:

- பைடன்டிகை பயன்படுத்தி `AddInputModel` எனும் ஸ்கீமாவை *schema.py* கோப்பில் புலங்கள் `a` மற்றும் `b` உடன் உருவாக்குதல்.
- வரவிருக்கும் கோரிக்கையை `AddInputModel` வகையாக பிசாசாக்க முயற்சித்தல், அளவுருக்கள் பொருந்தாவிட்டால் இது தோல்வி அடைகிறது:

   ```python
   # add.py
    try:
        # Pydantic மாதிரியைப் பயன்படுத்தி உள்ளீட்டை சரிபார்க்கவும்
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

இந்த பிசாசாக்கும் முறையை கருவி அழைப்பு செயல்பாட்டிலோ அல்லது ஹாண்ட்லர் செயல்பாட்டிலோ வைக்கலாம்.

**TypeScript**

```typescript
// சர்வர்.ts
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

       // @ts-கவனிக்காதீர்கள்
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

// விவரம்.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// சேர்.ts
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

- அனைத்து கருவி அழைப்புகளையும் கையாளும் ஹாண்ட்லரில், வரவிருக்கும் கோரிப்பை கருவி வரையறுத்த ஸ்கீமாவில் பிசாசாக்க முயற்சி செய்கிறோம்:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    அது வெற்றி எனில் பின்னர் கருவியை அழைக்கிறோம்:

    ```typescript
    const result = await tool.callback(input);
    ```

இதனுடைய மூலம் ஒரு சிறந்த கட்டமைப்பு உருவாகிறது, *server.ts* மிகவும் சிறிய கோப்பு என அனைவரையும் கோரிக்கை ஹாண்ட்லர்கள் இணைக்கின்றது, மற்றும் ஒவ்வொரு அம்சமும் அவர்களின் தனியான கோப்புறையில் tools/, resources/ அல்லது /prompts இருக்கிறது.

அருமை, அடுத்ததாக இதனை கட்டமைக்க முயற்சிப்போம். 

## பயிற்சி: குறைந்தநிலை சர்வர் உருவாக்குதல்

இந்த பயிற்சியில் நாம் செய்யப்போகும் வேலைகள்:

1. கருவிகள் பட்டியல் கையாளுதல் மற்றும் கருவிகள் அழைப்பை கையாளும் குறைந்தநிலை சர்வர் உருவாக்குதல்.
1. நீங்கள் கட்டமைக்கக்கூடிய கட்டமைப்பை நடைமுறைப்படுத்துதல்.
1. உங்களுடைய கருவி அழைப்புகளை சரியான வகையில் சரிபார்க்கும் சரிபார்ப்பைச் சேர்க்குதல்.

### -1- கட்டமைப்பு உருவாக்குதல்

நாம் திரும்பச் சொல்ல வேண்டியது ஒரு கட்டமைப்பை உருவாக்குவது ஆகும், இது மேலதிக அம்சங்களை சேர்க்கும்போது எங்களுக்குத் தேவையை பூர்த்தி செய்யும், இது எப்படி இருக்கும்:

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

இப்போது நாம் ஒரு கட்டமைப்பை அமைத்துள்ளோம், இது கருவிகளை tools என்ற கோப்புறையில் எளிதாகச் சேர்க்க உதவும். resources மற்றும் prompts க்கான துணைநிரலாணைகளை நீங்கள் விரும்பினால் சேர்க்கலாம்.

### -2- கருவி உருவாக்குதல்

அடுத்ததாக ஒரு கருவி உருவாக்குவது எப்படி என்பதை பார்ப்போம். முதலில் அது அதன் *tool* துணை கோப்புறையில் உருவாக்கப்பட வேண்டும்:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic மாதிரியைப் பயன்படுத்தி உள்ளீட்டை சரிபார்க்கவும்
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # செய்ய வேண்டியது: Pydantic ஐ சேர், அதனால் நாம ஒரு AddInputModel ஐ உருவாக்கி args ஐ சரிபார்க்கலாம்

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

இங்கே நாம் பெயர், விளக்கம் மற்றும் உள்ளீட்டு ஸ்கீமா என்று பைடன்டிக்கைப் பயன்படுத்திக் குறிப்பிடுகிறோம் மற்றும் இந்த கருவி அழைக்கப்படும் போது இயங்கும் ஹாண்ட்லர் உள்ளது. இறுதியில் `tool_add` என்ற அகராதி அனைத்து பண்புகளையும் கொண்டு வெளிப்படுத்தப்படுகிறது.

மேலும் *schema.py* உள்ளீட்டு ஸ்கீமானை வரையறுத்து கருவிக்கு பயன்படுத்தப்படுகிறது:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

மேலும் *__init__.py* கோப்பினை நிரப்பி tools கோப்புறையை ஒரு தொகுப்பாகக் கணிக்க வேண்டும். கூடுதலாக, அதில் உள்ள தொகுப்புகளை வெளியிடும் வகையிலும்:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

நாம் எப்போதும் புதிய கருவிகள் சேர்க்கும் போதும் இந்த கோப்பில் தொடர்ச்சியாக சேர்க்கலாம்.

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

இங்கே பண்புகளைக் கொண்ட அகரத்தொகுதி உருவாக்கப்பட்டுள்ளது:

- name, இது கருவி பெயர்.
- rawSchema, இது Zod ஸ்கீமா, கருவியை அழைக்க வருமாறு கோரிக்கைகளை சரிபார்க்க பயன்படுத்தப்படும்.
- inputSchema, இது ஹாண்ட்லர் பயன்படுத்தும் ஸ்கீமா.
- callback, இது கருவியை அழைக்கும் செயல்பாடு.

`Tool` என்ற வகையும் இதன் மூலம் அகரத்தொகுதியை mcp சர்வர் ஹாண்ட்லர் ஏற்றுக்கொள்ளக்கூடிய வகையாக மாற்ற பயன்படுகிறது, இது இந்த மாதிரி தோற்றம்:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

மற்றும் *schema.ts* இல் ஒவ்வொரு கருவிக்குமான உள்ளீட்டு ஸ்கீமாக்கள் சேமிக்கப்படுகின்றன, இப்போது ஒன்றே உள்ளது ஆனால் புதிய கருவிகள் சேர்க்கும் பொழுது நுழைவுகள் கூடும்:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

அருமை, அடுத்து நாம் கருவி பட்டியலை கையாள்வது எப்படி என்று பார்ப்போம்.

### -3- கருவி பட்டியலை கையாளுதல்

அடுத்து, கருவிகள் பட்டியலை கையாள, கோரிக்கை ஹாண்ட்லரை நமது சர்வர் கோப்பில் சேர்க்க வேண்டும்:

**Python**

```python
# சுருக்கத்துக்காக குறியீடு நீக்கப்பட்டது
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

இங்கே, `@server.list_tools` என்ற டெகாரேட்டரைச் சேர்த்து `handle_list_tools` என்ற செயல்பாட்டை நடைமுறைப்படுத்துகிறோம். அங்கு, கருவிகள் பட்டியலை உருவாக்க வேண்டும். ஒவ்வொரு கருவிக்கும் பெயர், விளக்கம் மற்றும் inputSchema இருக்க வேண்டும்.   

**TypeScript**

கருவிகள் பட்டியலை கையாள கோரிக்கை ஹாண்ட்லர் அமைக்க சர்வரில் `setRequestHandler` ஐ `ListToolsRequestSchema` என வடிவமைக்கப்பட்ட ஸ்கீமாவுடன் அழைக்க வேண்டும். 

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
// குறுக்கமான குறியீடு நீக்கப்பட்டது
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // பதிவு செய்யப்பட்ட கருவிகளின் பட்டியலை திருப்பி கொடு
  return {
    tools: tools
  };
});
```

அருமை, இப்போது கருவிகள் பட்டியலை தீர்வு செய்துவிட்டோம். கருவி அழைப்பது எப்படி என்பதைப் பார்ப்போம்.

### -4- கருவி அழைப்பை கையாளுதல்

ஒரு கருவியை அழைக்க, வேறு ஒரு கோரிக்கை ஹாண்ட்லரை அமைக்க வேண்டும், இதில் எந்த அம்சத்தை எந்த அளவுருக்களுடன் அழைக்க வேண்டும் என்பது குறிப்பிடப்படும்.

**Python**

`@server.call_tool` டெகாரேட்டரைப் பயன்படுத்தி `handle_call_tool` என்ற செயல்பாட்டை உருவாக்குவோம். அந்தப் பணி கருவி பெயர், அதன் அளவுருக்கள் பிசாசாக்கப்பட வேண்டும் மற்றும் அவை சரியானவையாக இருக்க வேண்டும் என்பதை உறுதி செய்ய வேண்டும். அவை இந்த செயல்பாட்டிலோ அல்லது கருவியின் உள்பிரிவினிலோ சரிபார்க்கப்படலாம்.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools என்பது கருவி பெயர்கள் விசைகளாக உள்ள ஒரு நெறிமுறை
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

இதோ என்ன நடக்கிறது:

- கருவி பெயர் ஏற்கனவே உள்ளீட்டு அளவுரு `name` என்றும், `arguments` அகராதி வடிவில் அளவுருக்கள் உண்மையாக இருக்கின்றன.

- கருவியை `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` என்றால் அழைக்கப்படுகிறது. அளவுரு சரிபார்ப்பு `handler` பண்பில் ஒரு செயல்பாட்டை அழைக்கும், அது தோன்றாதால் பிழை எழும். 

இவ்வாறு, நாம் குறைந்தநிலை சர்வர் பயன்படுத்தி கருவிகள் பட்டியலும் அழைப்பும் எப்படி செயல்படுவதாக இருப்பதை முழுமையாகப் புரிந்துகொண்டோம்.

முழு உதாரணத்தை [இங்கே](./code/README.md) காணவும்

## பணிதுவாரம்

நீங்கள் பெற்ற குறியீட்டுக்கு பல கருவிகள், வளங்கள் மற்றும் முன்மொழியல்கள் சேர்க்கவும்; அது tools கோப்புறையில் கோப்புகளை மட்டும் சேர்க்கவேண்டியதையே எப்படி கவனிப்பீர்கள் என்பதை எண்ணி பாருங்கள். 

*தீர்வு இல்லை*

## சுருக்கம்

இந்த அத்தியாயத்தில், குறைந்தநிலை சர்வர் வேலை எப்படி என்பதை மற்றும் நாமும் தொடர்ந்து கட்டமைக்கக்கூடிய தூயண கட்டமைப்பை உருவாக்குவது எப்படி என்று கற்றுக்கொண்டோம். சரிபார்ப்பு பற்றி காணப்பட்டோம் மற்றும் உள்ளீட்டுக்கான சரிபார்ப்பு ஸ்கீமாவைப் பயன்படுத்து கொடுத்து validation நூலகங்களை எவ்வாறு செயல்படுத்துவது என்று கற்றோம்.

## அடுத்தது என்ன

- அடுத்து: [எளிய அங்கீகாரம்](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->