# అధునాతన సర్వర్ వినియోగం

MCP SDKలో రెండు వేర్వేరు రకాల సర్వర్లు అందజేయబడ్డాయి, మీ సాధారణ సర్వర్ మరియు లో-లెవెల్ సర్వర్. సాధారణంగా, మీరు ఫీచర్లు జోడించడానికి సాధారణ సర్వర్ ఉపయోగిస్తారు. అయితే కొన్ని సందర్భాల్లో, మీరు లో-లెవెల్ సర్వర్‌పై ఆధారపడాలనుకుంటారు, ఉదాహరణకు:

- మెరుగైన నిర్మాణం. సాధారణ సర్వర్ మరియు లో-లెవెల్ సర్వర్ ఇద్దరితో శుభ్రమైన ఆర్కిటెక్చర్ సృష్టించడం సాధ్యమే, కానీ కొద్దిగా సులభం అంటూ లో-లెవెల్ సర్వర్‌తో చేయటం మంచిది అని చెప్పవచ్చు.
- ఫీచర్ అందుబాటు. కొన్ని అధునాతన ఫీచర్లు కేవలం లో-లెవెల్ సర్వర్‌తో మాత్రమే ఉపయోగించుకోవచ్చు. మేము తరువాతి అధ్యాయాల్లో సాంప్లింగ్ మరియు ఎలిసిటేషన్ జోడిస్తున్నప్పుడు దీనిని చూడవచ్చు.

## సాధారణ సర్వర్ vs లో-లెవెల్ సర్వర్

సాధారణ సర్వర్‌తో MCP సర్వర్ సృష్టించడం ఎలా ఉంటుందో ఇది:

**Python**

```python
mcp = FastMCP("Demo")

# ఒక జోడింపు పరికరం జోడించండి
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

// ఒక జోడింపు సాధనాన్ని జోడించండి
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

ముఖ్యత ఏమిటంటే మీరు సర్వర్‌కు కావలసిన ప్రతి టూల్, వనరు లేదా ప్రాంప్ట్‌ను స్పష్టంగా జోడిస్తారు. ఇందులో తప్పేదేమీ లేదు.

### లో-లెవెల్ సర్వర్ దృష్టికోణం

కానీ, లో-లెవెల్ సర్వర్ దృష్టికోణాన్ని ఉపయోగించే సమయంలో మీరు దాన్ని వేరుగా ఆలోచించాలి. ప్రతి టూల్‌ను రిజిస్టర్ చేయకపోతే, మీరు ప్రతీ ఫీచర్ రకం (టూల్స్, వనరులు, లేదా ప్రాంప్ట్‌లు)కు రెండు హ్యాండ్లర్‌లను సృష్టిస్తారు. ఉదాహరణకు టూల్స్ కోసం కేవలం రెండు ఫంక్షన్లు ఉంటాయి:

- అన్ని టూల్స్‌ను జాబితా చేయడం. ఒక ఫంక్షన్ అన్ని టూల్స్ జాబితా చేయటానికి బాధ్యత వహిస్తుంది.
- అన్ని టూల్స్‌కి కాల్ హ్యాండిల్ చేయడం. ఇంకొక ఫంక్షన్ టూల్‌కి కాల్‌లను హ్యాండిల్ చేస్తుంది.

ఇది తక్కువ పని అనిపించకదా? కాబట్టి టూల్‌ను రిజిస్టర్ చేయకుండా, నేను లిస్ట్ చేసే సమయంలో టూల్ చేర్చబడిందేమో చూసుకోవాలి మరియు టూల్‌కి కాల్ రావటానికి ప్రతిస్పందించాలి.

ఇప్పుడు కోడ్ ఎలా కనిపిస్తుంది చూద్దాం:

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
  // నమోదు చేసిన సాధనాల జాబితాను తిరిగి ఇవ్వండి
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

ఇక్కడ మనకు ఫీచర్ల జాబితాను తిరిగి ఇస్తుంది ఒక ఫంక్షన్ ఉంది. టూల్స్ జాబితాలో ప్రతి ఎంట్రీకు `name`, `description` మరియు `inputSchema` వంటి ఫీల్డులు ఉండాలి. ఇది మన టూల్స్ మరియు ఫీచర్ నిర్వచనాన్ని వేరే చోట ఉంచడానికి అవకాశం ఇస్తుంది. ఇప్పుడు మనం అన్ని టూల్లను tools ఫోల్డర్‌లో సృష్టించవచ్చు మరియు మీ ప్రాజెక్ట్ క్రిందివి ఇలా ఉంటాయి:

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

ఇది గొప్పది, మన ఆర్కిటెక్చర్ చాలా శుభ్రమైనది కావచ్చు.

టూల్స్‌ను కాల్ చేయడం గురించి ఏంటి, అదే ఆలోచనా విధానమా? ఒక హ్యాండ్లర్ అన్ని టూల్‌లను కాల్ చేయాలా? అవును, ఖచ్చితంగా, ఇక్కడ ఆ కోడ్ ఉంది:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ఒక డిక్షనరీ, ఇందులో టూల్ పేర్లు కీలు గా ఉంటాయి
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
    
    // ఆర్గ్స్: request.params.arguments
    // TODO టూల్‌ను పిలవండి,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

పై కోడ్ నుండి మీరు చూడవచ్చు, టూల్‌ను ఎంచుకోవడానికి మరియు ఏ argumentsతో కాల్ చేయాలంటే వాటిని పార్స్ చేయాలి, అప్పుడు టూల్‌ను కాల్ చేయాలి.

## ధృవీకరణతో దృష్ఠి మెరుగుపరచడం

ఇప్పటివరకూ మీరు చూసినట్లుగా, టూల్స్, వనరులు మరియు ప్రాంప్ట్‌లను జోడించడానికి చేసిన రిజిస్ట్రేషన్లన్నీ ఈ రెండు హ్యాండ్లర్‌లతో భర్తీ చేయవచ్చు. మరెమామి చేయాలి? సరైన argumentsతో టూల్‌ను కాల్ చేసేలా ధృవీకరణ (validation) చేర్పడం అవసరం. ప్రతి రన్‌టైమ్ దీనికి ప్రత్యేక పరిష్కారం కలిగి ఉంది, ఉదాహరణకు Python ప్యాడాంటిక్ (Pydantic) ఉపయోగిస్తుంది, TypeScript జోడ్ని (Zod) ఉపయోగిస్తుంది. ఆలోచన ఇలాగే ఉంటుంది:

- ఫీచర్ (టూల్, వనరు, లేదా ప్రాంప్ట్) సృష్టించడానికి సంబంధిత ఫోల్డర్‌లో కోడ్‌ను మార్చడం.
- టూల్ కాల్ చేయమని వచ్చిన అభ్యర్థనను ధృవీకరించడానికి ఒక విధానాన్ని జోడించడం.

### ఫీచర్ సృష్టించడం

ఫీచర్ సృష్టించడానికి, ఆ ఫీచర్‌కు ఒక ఫైల్ సృష్టించాలి మరియు ఆ ఫీచర్‌కు అవసరమైన 必要మైన ఫీల్డులు ఉండాలి. టూల్స్, వనరులు, ప్రాంప్ట్‌లలో ఈ ఫీల్డులు కొంతమేర తేడా ఉంటుంది.

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
        # Pydantic మోడల్ ఉపయోగించి ఇన్‌పుట్‌ను ధ్రువీకరించండి
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ని జోడించండి, తద్వారా మేము AddInputModel ని సృష్టించి ఆర్గ్‌లను ధృవీకరించవచ్చు

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ఇక్కడ మీరు చూడవచ్చు:

- Pydantic `AddInputModel` ను ఉపయోగించి `a`, `b` ఫీల్డులతో schema సృష్టించడం *schema.py* ఫైల్‌లో.
- రిక్వెస్ట్‌ను `AddInputModel` టైప్‌గా పార్స్ చేయడం. ప్యారామీటర్లు సరిపోలకపోతే ఇది క్రాష్ అవుతుంది:

   ```python
   # add.py
    try:
        # Pydantic మోడల్ ఉపయోగించి ఇన్పుట్‌ను చెల్లుబాటుచేయండి
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

ఈ పార్సింగ్ లాజిక్‌ను టూల్ కాల్‌లో పెట్టాలా లేక హ్యాండ్లర్ ఫంక్షన్‌లో పెట్టాలా మీరు ఎంచుకోవచ్చు.

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

// స్కీమా.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// జతచేయి.ts
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

- అన్ని టూల్ కాల్స్ ని హ్యాండిల్ చేస్తున్న హ్యాండ్లర్‌లో, రిక్వెస్ట్‌ను టూల్ నిర్వచించిన schemaలో పార్స్ చేయడానికి ప్రయత్నిస్తాము:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    అది సక్సెస్ అయితే నిజమైన టూల్‌ను కాల్ చేస్తాము:

    ```typescript
    const result = await tool.callback(input);
    ```

ఈ దృష్టికోణం మంచి ఆర్కిటెక్చర్ సృష్టిస్తుంది, ఎందుకంటే *server.ts* ఒక చిన్న ఫైల్ మాత్రమే కాబట్టి ఇది రిక్వెస్ట్ హ్యాండ్లర్లను కేవలం లింక్ చేస్తుంది మరియు ప్రతి ఫీచర్ తమ ధరనలో ఉంటుంది, అంతేగాక tools/, resources/ లేదా prompts/ లో ఉంటాయి.

గొప్పది, దీన్ని తదుపరి మనం ఎలా నిర్మించాలో ప్రయత్నిద్దాం.

## వ్యాయామం: లో-లెవెల్ సర్వర్ సృష్టించటం

ఈ వ్యాయామంలో, మనం ఈ క్రింది పనులు చేస్తాము:

1. టూల్స్ జాబితా చేయడం మరియు టూల్స్ కాల్ చేయటానికి లో-లెవెల్ సర్వర్ హ్యాండ్లర్ సృష్టించాలి.
2. మీరు ఆర్కిటెక్చర్ రూపొందించాలి, దానిపై మీరు నిర్మించుకోవచ్చు.
3. మీ టూల్ కాల్స్ సరిగా ధృవీకరించబడ్డాయా అని చూసే validation ను జోడించాలి.

### -1- ఆర్కిటెక్చర్ సృష్టించండి

మొదటిగా మనం పరిష్కరించాల్సింది ఒక ఆర్కిటెక్చర్, ఇది మనకు మరిన్ని ఫీచర్లు జోడించేటప్పుడు సౌలభ్యం కల్పిస్తుంది, ఇది ఇలా ఉంటుంది:

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

ఇప్పుడు మనకు tools ఫోల్డర్‌లో కొత్త టూల్స్ సులభంగా జోడించగల ఆర్కిటెక్చర్ ఉంది. మీరు resources మరియు prompts కోసం సబ్ డైరెక్టరీలను జోడించడానికి ఈ విధానం పాటించండి.

### -2- ఒక టూల్ సృష్టించడం

ఇప్పుడు టూల్ సృష్టించడం ఎలా ఉందో చూద్దాం. మొదట ఇది *tool* సబ్‌డైరెక్టరీలో క్రింది విధంగా ఉండాలి:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic మోడల్ ను ఉపయోగించి ఇన్‌పుట్ ను ధృవీకరించండి
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic జోడించండి, దాంతో మేము AddInputModel సృష్టించి ఆర్గ్స్ ని ధృవీకరించగలం

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ఇక్కడ మీరు చూడవచ్చు, మనం Pydantic ఉపయోగించి name, description మరియు input schema నిర్వచించామయం, మరియు టూల్ కాల్ అయినప్పుడు ఆహ్వానించబడే హ్యాండ్లర్ ఉంది. చివరగా `tool_add` ఎక్స్‌పోజ్ చేస్తాం, ఇది propertyలు కలిగిన dictionary.

మరియు *schema.py* కూడా ఉంది, ఇది మన టూల్ ఇన్‌పుట్ స్కీమాను నిర్వచిస్తుంది:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

*__init__.py* కూడా భర్తీ చేయాలి, tools డైరెక్టరీని మాడ్యూల్‌గా పరిగణించేందుకు. అదనంగా, modules ను కూడా ఈ విధంగా ఎక్స్‌పోజ్ చేయాలి:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

మరిన్ని టూల్స్ జోడించినప్పుడు ఈ ఫైల్‌ను విస్తరించవచ్చు.

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

ప్రత్యేక ప్రాపర్టీలతో dictionary సృష్టిస్తాం:

- name, టూల్ పేరు.
- rawSchema, ఇది Zod schema, టూల్ కాల్ కోసం రౌండ్-ట్రిప్ ధృవీకరణకు.
- inputSchema, ఇది హ్యాండ్లర్ ఉపయోగించే schema.
- callback, టూల్‌ను ఏవ్వడానికి ఉపయోగిస్తారు.

మరియు `Tool` ఉందీ, ఇది ఈ dictionaryని MCP సర్వర్ హ్యాండ్లర్ అంగీకరించే టైప్‌గా మార్చుతుంది, ఇది ఇలా ఉంటుంది:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

మరియు *schema.ts*లో ప్రతి టూల్‌కి ఇన్‌పుట్ స్కీమాలు స్టోర్ చేస్తాం, ప్రస్తుతం కేవలం ఒక స్కీమా ఉంది కానీ టూల్స్ జోడిస్తే మరిన్ని ఉన్నాయి:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

గొప్పది, మన టూల్స్ జాబితా చేయడం ఎలా హ్యాండిల్ చేస్తామో చూద్దాం.

### -3- టూల్స్ జాబితాను హ్యాండిల్ చేయండి

మరుసటి టాస్క్, మన టూల్స్ జాబితా చేయడానికి రిక్వెస్ట్ హ్యాండ్లర్ సెటప్ చేయడం. ఈ కోడ్ మన సర్వర్ ఫైల్‌లో:

**Python**

```python
# సంక్షిప్తత కోసం కోడ్ మినహాయించబడింది
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

ఇక్కడ, `@server.list_tools` డెకొరేటర్ మరియు అమలు చేసే `handle_list_tools` ఫంక్షన్ జోడించాం. ఇందులో టూల్స్ జాబితా తయారు చేయాలి. ప్రతి టూల్‌కు name, description మరియు inputSchema ఉండాలి.

**TypeScript**

రిక్వెస్ట్ హ్యాండ్లర్ సెటప్ చేయడం కోసం, సర్వర్‌పై `setRequestHandler`ని కాల్ చేసి, మనం చేయదలచిన పనికి అనుగుణంగా schemaను (ఇక్కడ `ListToolsRequestSchema`) అందిస్తాము.

```typescript
// సూచిక.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// సర్వర్.ts
// సారాంశం కోసం కోడ్ తొలగించబడింది
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // నమోదు చేసిన పరికరాల జాబితాను తిరిగి ఇవ్వండి
  return {
    tools: tools
  };
});
```

గొప్పది, ఇప్పుడు మనం టూల్స్ జాబితా చేయడం పన్ను పరిష్కరించాము, దాని తర్వాత టూల్స్ కాల్ ఎలా చేస్తామో చూద్దాం.

### -4- టూల్ కాల్ చేయడాన్ని హ్యాండిల్ చేయండి

టూల్ కాల్ చేయడానికి, మరో రిక్వెస్ట్ హ్యాండ్లర్ సెటప్ చేయాలి, ఇది ఏ ఫీచర్ కాల్ చేయాలి మరియు ఏ ఆర్గ్యుమెంట్లతో చేయాలి అనేది హ్యాండిల్ చేయాలి.

**Python**

`@server.call_tool` డెకొరేటర్ ఉపయోగించి `handle_call_tool` వంటి ఫంక్షన్ అమలు చేయండి. ఈ ఫంక్షన్‌లో టూల్ పేరు, ఆర్గ్యుమెంట్లను పార్స్ చేసి, ఆ arguments టూల్‌కు సరిగా సరిపోతున్నాయో ధృవీకరించాలి. మీరు ఈ validation ఈ ఫంక్షన్‌లోనే చెయ్యవచ్చు లేదా నిజమైన టూల్‌లో కూడా చెయ్యవచ్చు.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools అనేది టూల్ పేర్లను కీలుగా కలిగిన డిక్షనరీ
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # టూల్‌ను పిలవండి
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

ఇక్కడ ఏమి జరుగుతుందంటే:

- మన టూల్ పేరు `name` అనే ఇన్‌పుట్ పారామీటరులో ఇప్పటికే ఉంది, మరియు మన arguments `arguments` డిక్షనరీగా ఉన్నాయి.

- టూల్ కాల్ `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` తో జరుగుతుంది. ఆర్గ్యుమెంట్ల validation `handler` ఫంక్షన్‌లో జరుగుతుంది, అది ఫెయిల్ అయితే exception త్రో చేస్తుంది.

ఇలా, మనకి లో-లెవెల్ సర్వర్ ఉపయోగించి టూల్స్ జాబితా చేయడం మరియు కాల్ చేయడం పూర్తిగా అర్థమైంది.

[పూర్తి నమూనా](./code/README.md) చూడండి

## అసైన్‌మెంట్

నిర్దేశించబడిన కోడ్‌కు మరిన్ని టూల్స్, వనరులు మరియు ప్రాంప్ట్‌లను జోడించి, మీరు గమనించినట్లు tools డైరెక్టరీలో మాత్రమే ఫైళ్లను జోడించడం అవసరమైందని అన్వేషించండి.

*ఎలాంటి పరిష్కారం ఇవ్వలేదు*

## సారాంశం

ఈ అధ్యాయంలో, లో-లెవెల్ సర్వర్ దృష్టికోణం ఎలా పనిచేస్తుందో మరియు ఇది ఎలా మంచి ఆర్కిటెక్చర్ సృష్టించడంలో సహాయం చేస్తుందో చూశాము. validation గురించి చర్చించి, validation లైబ్రరీలతో స్కీమాలు సృష్టించడం ఎలా జరిగిందో కూడా చూపించాం.

## తదుపరి

- తదుపరి: [సాదారణ ధృవీకరణ](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ముట్టడి**:  
ఈ డాక్యుమెంట్ [Co-op Translator](https://github.com/Azure/co-op-translator) అనే AI అనువాద సేవ ద్వారా అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తూనే ఉన్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు లోపాలు లేదా పొరపాట్లు ఉండొచ్చు అని దయచేసి గమనించండి. అసలు డాక్యుమెంట్ దాని స్వదేశి భాషలో అధికారిక మూలంగా పరిగణించాలి. కీలక సమాచారానికి, ప్రొఫెషనల్ మానవ అనువాదం తప్పనిసరి. ఈ అనువాదం వలన ఏర్పడిన ఏవైనా భ్రమలు లేదా తప్పైన అర్థాలు పట్ల మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->