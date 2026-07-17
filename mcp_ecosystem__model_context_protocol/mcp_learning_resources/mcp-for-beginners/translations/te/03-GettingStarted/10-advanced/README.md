# అభివృద్ధి చేసిన సర్వర్ వినియోగం

MCP SDK లో రెండు రకాల సర్వర్లు అందుబాటులో ఉంటాయి, మీ సాధారణ సర్వర్ మరియు తక్కువ స్థాయి సర్వర్. సాధారణంగా, మీరు సాధారణ సర్వర్‌ను ఉపయోగించి అందులో ఫీచర్లను చేర్చతారు. కొన్ని సందర్భాల్లో అయినా, మీరు తక్కువ స్థాయి సర్వర్‌పై ఆధారపడవలసి ఉంటుంది, ఉదాహరణకు:

- మెరుగైన వాస్తవవిధానం. సాధారణ సర్వర్ మరియు తక్కువ స్థాయి సర్వర్ రెండింటితో కూడ గొప్ప వాస్తవవిధానం సృష్టించడం సాధ్యమే కానీ కొంచెం సులభంగా తక్కువ స్థాయి సర్వర్‌తో కావొచ్చు.
- ఫీచర్ అందుబాటు. కొన్ని అభివృద్ధి చేయబడిన ఫీచర్లు కేవలం తక్కువ స్థాయి సర్వర్‌తో మాత్రమే ఉపయోగించవచ్చు. మీరు దీన్ని కావలిసిన సంచికల్లో చూడగలరు, ఉదా: సాంప్లింగ్ (2026-07-28 విడుదల అభ్యర్థిలో విరామం) మరియు ఎలిసిటేషన్ చేర్చటం.

## సాధారణ సర్వర్ మరియు తక్కువ స్థాయి సర్వర్ మధ్య తేడా

సాధారణ సర్వర్‌తో MCP సర్వర్ సృష్టించడం ఎలా ఉంటుందో ఇక్కడ ఉంది

**Python**

```python
mcp = FastMCP("Demo")

# ఒక జోడింపు సాధనాన్ని జోడించండి
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

// ఒక చేర్చే సాధనం జోడించండి
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

ముఖ్య విషయం ఏమిటంటే మీరు సర్వర్ కలిగి ఉండాలనుకుంటున్న ప్రతి టూల్, రీసోర్స్ లేదా ప్రాంప్ట్‌ను స్పష్టంగా జోడించడం. ఇది తప్పు కాకపోతోంది.

### తక్కువ స్థాయి సర్వర్ విధానం

అయితే, తక్కువ స్థాయి సర్వర్ విధానం ఉపయోగించినప్పుడు మీరు దీన్ని వేరుగా అనుకోవాలి. ప్రతి ఫీచర్ టైప్ (టూల్స్, రీసోర్సెస్ లేదా ప్రాంప్ట్స్) కోసం రెండు హ్యాండ్లర్లను సృష్టించాలి. ఉదాహరణకు టూల్స్ కు కేవలం ఇలాగే రెండు ఫంక్షన్లు ఉంటాయి:

- అన్ని టూల్స్ జాబితాను చూపించడం. ఒక ఫంక్షన్ అన్ని టూల్స్ జాబితా చేయటానికి బాధ్యత వహిస్తుంది.
- అన్ని టూల్స్ కాల్‌లను నిర్వహించడం. ఇక్కడ కూడా, ఒకే ఫంక్షన్ టూల్ కు కాల్‌లను హ్యాండిల్ చేస్తుంది.

ఇది తక్కువ పని అనిపించదా? అందువల్ల టూల్ రిజిస్టర్ చేయడానికి బదులు, టూల్స్ జాబితాలో ఉన్నట్లు నిర్ధారించాలి మరియు టూల్ కాల్ చేయాల్సిన అవసరం వచ్చినప్పుడు అది కాల్ కావాలి.

ఇప్పుడిది కోడ్ ఎలా ఉన్నదో చూద్దాం:

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
  // నమోదు చేసిన పరికరాల జాబితాను తిరిగి ఇవ్వండి
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

ఇక్కడ ఇప్పుడు ఒక ఫంక్షన్ ఉంది ఇది ఫీచర్ల జాబితాను తిరిగి ఇస్తుంది. టూల్స్ జాబితాలో ప్రతి ఎంట్రీకు `name`, `description` మరియు `inputSchema` వంటి ఫీల్డ్స్ ఉంటాయి, ఇవి రిటర్న్ టైప్‌కు అనుగుణంగా ఉంటాయి. దీని వల్ల మా టూల్స్ మరియు ఫీచర్ నిర్వచనాన్ని వేరే చోట ఉంచుకోవచ్చు. ఇప్పుడు అన్ని టూల్స్‌ను tools ఫోల్డర్లో సృష్టించవచ్చు, అలాగే మీ ప్రాజెక్ట్ ఈ విధంగా వ్యవస్థీకృతమవుతుంది:

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

చాలా మంచిది, మా వాస్తవవిధానాన్ని చాలా స్వచ్ఛంగా చేయవచ్చు.

టూల్స్ కాల్ చేయడం ఎలా ఉంటుంది? అదే ఆలోచనా విధానంనా, ఒకే హ్యాండ్లర్ ద్వారా ఏ టూల్ అయినా కాల్ చేయడం? అవును, ఖచ్చితంగా, ఇక్కడ దానికి సంబంధించిన కోడ్ ఉంది:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools అనేది టూల్ పేర్లను కీలు గా కలిగిన డిక్షనరీ ఉంది
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
    // TODO టూల్‌ను పిలవండి,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

పై కోడ్ నుండి మీరు చూడగలిగినట్లు, టూల్ కాల్ చేయడానికి ఏ టూల్ ఉందో, దాని ఆర్గ్యుమెంట్స్ తో పాటు పర్సింగ్ చేయాలి, తరువాత టూల్‌ని కాల్ చేయాలి.

## ధృవీకరణతో విధానాన్ని మెరుగుపరుచుకోవడం

ఇప్పటివరకు, మీరు మీ టూల్స్, రీసోర్సెస్ మరియు ప్రాంప్ట్స్ చేర్చడానికి చేసిన రిజిస్ట్రేషన్లు ఈ రెండు హ్యాండ్లర్స్ తో ప్రతీ ఫీచర్ టైప్ కి మార్చగలమని చూశారు. మిగిలిఉన్ కార్యం ఏమిటంటే? సరైన ఆర్గ్యుమెంట్స్ తో టూల్ కాల్ అవుతుందనే ధృవీకరణను జోడించడం. ప్రతి రన్‌టైమ్ దీనికి తగిన పరిష్కారం కలిగి ఉంటుంది, ఉదాహరణకు Python Pydantic వాడుతుంది, TypeScript Zod వాడుతుంది. భావన ఏమిటంటే:

- ఒక ఫీచర్ (టూల్, రీసోర్స్ లేదా ప్రాంప్ట్) సృష్టించే లాజిక్‌ను కేటాయించిన ఫొల్డర్‌కు మార్చడం.
- ఒక టూల్ కాల్ చేయమని వచ్చిన రిక్వెస్ట్‌ను ధృవీకరించడానికి ఒక విధానం జోడించడం.

### ఫీచర్ సృష్టించడం

ఒక ఫీచర్ సృష్టించడానికి ఆ ఫీచర్ కోసం ఒక ఫైల్ సృష్టించి, ఆ ఫీచర్‌కు కావలసిన తప్పనిసరి ఫీల్డ్స్ ఉన్నాయని నిర్ధారించాలి. టూల్స్, రీసోర్సెస్, ప్రాంప్ట్స్ మధ్య కొంత తేడా ఉంటుంది.

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
        # Pydantic మోడల్‌ను ఉపయోగించి ఇన్‌పుట్‌ను ధ్రువీకరించండి
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ను జోడించండి, తద్వారా మేము AddInputModel సృష్టించి ఆర్గ్స్‌ను ధ్రువీకరించగలము

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ఇక్కడ మీరు ఇలా చేస్తున్నారనే దృశ్యం ఉంటుంది:

- Pydantic ఉపయోగించి *schema.py* ఫైల్‌లో `AddInputModel` అనే స్కీమా సృష్టించడం, ఇందులో `a` మరియు `b` అనే ఫీల్డ్స్ ఉంటాయి.
- రిక్వెస్ట్‌ను `AddInputModel` టైప్‌గా పარს్ చేయాలని ప్రయత్నించడం, పారామీటర్స్ సరిపడకపోతే క్రాష్ అవుతుంది:

   ```python
   # add.py
    try:
        # Pydantic మోడల్ ఉపయోగించి ఇన్‌పుట్‌ను ధృవీకరించండి
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

మీరు ఈ పర్సింగ్ లాజిక్ ని టూల్ కాల్ ఫంక్షన్ లో పెట్టవచ్చు లేదా హ్యాండ్లర్ ఫంక్షన్ లో.

**TypeScript**

```typescript
// సర్వర్.ts
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

       // @ts-উపేక్షించండి
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

// స్కీమా.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// చేర్చండి.ts
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

- అన్ని టూల్ కాల్స్ ని హ్యాండిల్ చేసే హ్యాండ్లర్‌లో రిక్వెస్ట్‌ను టూల్ డిఫైన్డ్ స్కీమాలో పარს్ చేయడానికి ప్రయత్నించటం:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ఇది సాఫీగా జరిగితే, మనం అసలు టూల్‌ను కాల్ చేయడానికి ముందుకు సాగుతాము:

    ```typescript
    const result = await tool.callback(input);
    ```

మీరు చూడగలిగింది, ఈ విధానం గొప్ప వాస్తవవిధానం సృష్టిస్తుంది, ఎందుకంటే *server.ts* అనేది request హ్యాండ్లర్లను మాత్రమే వైర్ చేస్తుంది మరియు ప్రతి ఫీచర్ తమ ఫోల్డర్‌లలో ఉంటాయి: tools/, resources/, లేదా /prompts/.

బాగున్నది, ఇప్పుడు దీన్ని కనిష్టం నిర్మించడానికి ప్రయత్నిద్దాం.

## శిక్షణ: తక్కువ స్థాయి సర్వర్ సృష్టించడం

ఈ శిక్షణలో, మేము ఈ పని చేస్తాం:

1. టూల్స్ జాబితా చేయడం మరియు టూల్‌లను కాల్ చేయడం నిర్వహించే తక్కువ స్థాయి సర్వర్ సృష్టించడం.
1. మీరు నిర్మించగల వాస్తవవిధానాన్ని అమలు చేయడం.
1. మీ టూల్ కాల్స్ సరైన ధృవీకరణతో కలుగుననే నిర్ధారించడానికి ధృవీకరణ జోడించడం.

### -1- ఒక వాస్తవవిధానం సృష్టించడం

మొదట చెయ్యాల్సింది scalabilityకి దోహదపడే వాస్తవవిధానం. ఇది ఇలా ఉంటుంది:

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

ఇప్పుడు మనం ఒక వాస్తవవిధానం ఏర్పరచుకున్నాము, ఇది tools ఫోల్డర్ లో సులభంగా కొత్త టూల్స్ జోడించగలగడం నిర్ధారిస్తుంది. resources మరియు prompts కోసం ఉప-డైరెక్టరీలు జోడించడానికి ఈ విధానం అనుసరించండి.

### -2- టూల్ సృష్టించడం

టూల్ సృష్టించడం ఎలా ఉంటుంది చూద్దాం. మొదట ఇది *tool* అనే ఉపడైరెక్టరీలో ఉండాలి:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic మోడల్ ఉపయోగించి ఇన్‌పుట్‌ను ధృవీకరించండి
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydanticను జతచేయండి, తద్వారా మనం AddInputModel సృష్టించి ఆర్గ్స్‌ను ధృవీకరించగలము

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ఇక్కడ మేము పేరు, వివరణ, మరియు నమోదు స్కీమాను Pydantic ఉపయోగించి నిర్వచించి, టూల్ కాల్ అయ్యేటప్పుడు హ్యాండ్లర్ ఎలా పిలవాలో నిర్వచించాము. చివరగా `tool_add` అనే డిక్షనరీని ఎక్స్‌పోజ్ చేస్తాము, ఇందులో అన్ని ఈ లక్షణాలు ఉంటాయి.

*schema.py* కూడా ఉంది, దీనిలో టూల్ కోసం ఉపయోగించే ఇన్‌పుట్ స్కీమాను నిర్వచిస్తారు:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

టూల్స్ డైరెక్టరీని మాడ్యూల్‌గా పరిగణించడానికి *__init__.py* ఫైల్‌ను పూరించాలి. అదనంగా, డైరెక్టరీలోని మాడ్యూల్స్‌ను అందుబాటులోకి తీసుకురావాలి:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

టూల్స్ పెరిగే కొద్దీ ఈ ఫైల్‌ను కొనసాగించి జోడించవచ్చు.

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

ఇక్కడ ఒక డిక్షనరీని సృష్టిస్తాం దీని లక్షణాలు:

- name, ఇది టూల్ పేరు.
- rawSchema, ఇది Zod స్కీమా, టూల్ కాల్ చేయమని వచ్చిన రిక్వెస్ట్‌లను ధృవీకరించడానికి వాడుతారు.
- inputSchema, ఇది హ్యాండ్లర్ ఉపయోగించే స్కీమా.
- callback, ఇది టూల్‌ను పిలవడానికి ఉపయోగిస్తారు.

`Tool` అనే టైప్ కూడా ఉంది, ఇది ఈ డిక్షనరీని MCP సర్వర్ హ్యాండ్లర్ అంగీకరించే టైప్‌గా మార్చుతుంది, ఇది ఇలా ఉంటుంది:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

*schema.ts* కూడా ఉంది, ఇందులో టూల్‌ల ఇన్‌పుట్ స్కీమాలు నిల్వ ఉంటాయి, ప్రస్తుతానికి ఒక్క స్కీమా ఉంటుంది కానీ టూల్స్ పెరిగితే మరిన్ని జోడించవచ్చు:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

బాగుంది, ఇప్పుడు మనం టూల్స్ జాబితా నిర్వహణ ఎలా చేస్తామో చూద్దాం.

### -3- టూల్స్ జాబితా నిర్వహణ

ఇప్పుడు, టూల్స్ జాబితాను నిర్వహించడానికి, రిక్వెస్ట్ హ్యాండ్లర్ సెట్ చేయాలి. ఇది మన సర్వర్ ఫైల్‌లో ఇలా జోడించాలి:

**Python**

```python
# సారాంశంగా కోడ్ తొలగించబడింది
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

ఇక్కడ `@server.list_tools` డెకరేటర్ జోడించి, `handle_list_tools` అనే అమలు ఫంక్షన్ ఉంటుంది. ఇందులో టూల్స్ జాబితాను తయారు చేయాలి. ప్రతి టూల్‌కు పేరు, వివరణ, మరియు inputSchema ఉండాలి.

**TypeScript**

టూల్స్ జాబితా కోసం రిక్వెస్ట్ హ్యాండ్లర్ సెట్ చేయడానికి, సర్వర్‌పై `setRequestHandler` పిలవాలి మరియు మన ఉద్దేశించేది పూరించేటట్లు స్కీమాను అందించాలి, ఈ సందర్భంలో అది `ListToolsRequestSchema`.

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
// సంక్షిప్తత కొరకు కోడ్ వదిలివేయబడింది
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // నమోదు చేయబడిన టూల్స్ జాబితాను తిరిగి ఇవ్వండి
  return {
    tools: tools
  };
});
```

బాగుంది, ఇప్పుడు టూల్స్ జాబితా సమస్య పరిష్కరించబడ్డాయి, తదుపరి టూల్స్ కాల్ ఎలా చేయాలో చూద్దాం.

### -4- టూల్ కాల్ నిర్వహణ

టూల్ కాల్ చేయడానికి మరో రిక్వెస్ట్ హ్యాండ్లర్ సెట్ చేయాలి, ఇది ఏ ఫీచర్‌ను ఏ ఆర్గ్యుమెంట్స్‌తో కాల్ చేయాలో చూపుతుంది.

**Python**

`@server.call_tool` డెకరేటర్ ఉపయోగించి, `handle_call_tool` వంటి ఫంక్షన్ అమలు చేయండి. ఈ ఫంక్షన్‌లో టూల్ పేరు, ఆర్గ్యుమెంట్లను పర్సింగ్ చేసి, వివరణాత్మకంగా ఆ ఆర్గ్యుమెంట్ల సరైనత నిర్ధారించాలి. మీరు ఈ ధృవీకరణను ఈ ఫంక్షన్‌లో లేదా టూల్‌లోనే చేయవచ్చు.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools అనేది టూల్ పేర్లను కీ గానూ కలిగి ఉన్న ఒక డిక్షనరీ
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # టూల్‌ను కాల్ చేయండి
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

ఇది చేస్తోన్నది:

- మా టూల్ పేరు కొన్ని ఇన్‌పుట్ పారామీటర్లుగా ఇప్పటికే ఉంది, అవి `name` మరియు `arguments` డిక్షనరీలో ఉన్నాయి.

- టూల్‌ను ఇలా కాల్ చేయబడుతుంది: `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. ఆర్గ్యుమెంట్ల ధృవీకరణ హ్యాండ్లర్ ఫంక్షన్ రూపంలో వస్తుంది, ఇది విఫలమైతే ఎక్సెప్షన్ రేజ్ చేస్తుంది.

ఇదే, ఆ తక్కువ స్థాయి సర్వర్ ద్వారా టూల్స్ జాబితా మరియు కాల్ చేయడం పూర్ణంగా అర్థమయింది.

[పూర్తి ఉదాహరణ](./code/README.md) ను ఇక్కడ చూడండి

## అసైన్‌మెంట్

మీకు ఇచ్చిన కోడ్‌లో టూల్స్, రీసోర్సెస్ మరియు ప్రాంప్ట్‌లు జోడించి చూస్తూ, మీరు గమనించేదేమిటంటే మీరు కేవలం tools డైరెక్టరీలో ఫైళ్లు జోడించడం మాత్రమే అవసరం అవుతుంది.

*ఏ పరిష్కారం ఇవ్వబడలేదు*

## సంగ్రహం

ఈ అధ్యాయంలో, తక్కువ స్థాయి సర్వర్ విధానం ఎలా పనిచేస్తుందో, ఎలా అందుతో కూడిన శుభ్రమైన వాస్తవవిధానం రూపొందించవచ్చో చూశాము. ధృవీకరణ గురించి కూడా చర్చించాము మరియు ఇన్‌పుట్ ధృవీకరణ కోసం స్కీమాలను సృష్టించడంలో ధృవీకరణ లైబ్రరీలను ఎలా ఉపయోగించాలో చూపించాము.

## తర్వాత ఏమిటి

- తర్వాత: [సాదా సంఖ్యాపత్రత](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->