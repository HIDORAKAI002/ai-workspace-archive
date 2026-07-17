# उन्नत सर्भर उपयोग

MCP SDK मा दुई फरक प्रकार का सर्भरहरू प्रदर्शित छन्, तपाईंको सामान्य सर्भर र तल्लो-स्तर सर्भर। सामान्यतया, तपाईं नियमित सर्भर प्रयोग गर्नुहुन्छ यसमा सुविधाहरू थप्न। तर केही अवस्थामा, तपाईं तल्लो-स्तर सर्भरमा निर्भर रहन चाहनुहुन्छ, जस्तै:

- राम्रो आर्किटेक्चर। दुवै नियमित सर्भर र तल्लो-स्तर सर्भरसँग सफा आर्किटेक्चर बनाउन सम्भव छ, तर यो तर्क गर्न सकिन्छ कि तल्लो-स्तर सर्भरले अलि सजिलो हुन्छ।
- सुविधा उपलब्धता। केही उन्नत सुविधाहरू केवल तल्लो-स्तर सर्भरमा मात्र प्रयोग गर्न सकिन्छ। तपाईंले यसलाई पछिल्ला अध्यायहरूमा देख्नुहुनेछ जब हामीले नमूना संकलन (deprecated in `2026-07-28` release candidate) र elicitation थप्छौं।

## नियमित सर्भर बनाम तल्लो-स्तर सर्भर

यहाँ नियमित सर्भरसँग MCP सर्भर कसरी सिर्जना गरिन्छ देखाइएको छ

**Python**

```python
mcp = FastMCP("Demo")

# एउटा थप उपकरण थप्नुहोस्
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

// एक थप्ने उपकरण थप्नुहोस्
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

यसमा कुरा यो हो कि तपाईं स्पष्ट रूपमा प्रत्येक उपकरण, स्रोत वा प्रॉम्प्ट थप्नुहुन्छ जुन सर्भरमा हुन चाहिन्छ। यसमा केही गलत छैन।  

### तल्लो-स्तर सर्भर दृष्टिकोण

तर जब तपाईं तल्लो-स्तर सर्भर दृष्टिकोण प्रयोग गर्नुहुन्छ, तपाईंलाई यसलाई फरक तरिकाले सोच्न आवश्यक छ। प्रत्येक उपकरण दर्ता गर्ने सट्टा, तपाईं प्रत्येक सुविधा प्रकार (उपकरणहरू, स्रोतहरू वा प्रॉम्प्टहरू) का लागि दुइजना ह्यान्डलरहरू बनाउनुहुन्छ। जस्तै उपकरणहरूको लागि मात्र दुई कार्यहरू हुन्छन्:

- सबै उपकरणहरू सूचीकृत गर्ने। एउटा कार्य सबै प्रयासहरूका लागि जिम्मेवार हुन्छ उपकरणहरू सूचीबद्ध गर्न।
- सबै उपकरणहरूलाई कल गर्ने सम्हाल्ने। यहाँ पनि, एउटा मात्र कार्य उपकरणलाई कल गर्ने काम सम्हाल्छ।

यसले सम्भवत कम काम लाग्छ, होइन र? त्यसैले उपकरण दर्ता गर्ने सट्टा, मलाई सुनिश्चित गर्नु पर्छ कि जब म सबै उपकरणहरू सूचीबद्ध गर्छु तब उपकरण सूचीमा छ र जब उपकरण कल गर्न अनुरोध आउँछ तब यो कल गरिन्छ। 

अब हेर्नुहोस् कोड अब कस्तो देखिन्छ:

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
  // दर्ता गरिएको उपकरणहरूको सूची फर्काउनुहोस्
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

अब हामीसँग एउटा कार्य छ जुन सुविधाहरूको सूची फर्काउँछ। प्रत्येक प्रविष्टिमा `name`, `description` र `inputSchema` जस्ता फिल्डहरू छन् जसले रिटर्न प्रकार पालना गर्छ। यसले हामीलाई उपकरणहरू र सुविधा परिभाषा अन्यत्र राख्न सक्षम बनाउँछ। अब हामी हाम्रा सबै उपकरणहरू टूल्स फोल्डरमा बनाउन सक्छौं र सबै सुविधाहरूका लागि पनि, जसले तपाईंको परियोजना यसरी व्यवस्थित हुन सक्छ:

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

यो राम्रो छ, हाम्रो आर्किटेक्चर सफा देखिन सक्छ।

उपकरणहरू कल गर्ने कुरा के हो, के त्यो पनि त्यही विचार हो, एउटा ह्यान्डलर कुनै पनि उपकरण कल गर्न? हो, बिल्कुल, यसका लागि कोड यस्तो छ:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools एक शब्दकोश हो जसमा उपकरण नामहरू कुञ्जीको रूपमा छन्
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
    
    // args: अनुरोध.params.तर्कहरू
    // TODO उपकरणलाई कल गर्नुहोस्,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

माथिको कोडबाट देख्न सकिन्छ, हामीलाई कल गर्नुपर्ने उपकरण र यसको आर्गुमेन्टहरू पार्स गर्नुपर्छ, र त्यसपछि उपकरण कल गर्न अघि बढ्नुपर्छ।

## मान्यकरणसहित दृष्टिकोण सुधार

अहिलेसम्म, तपाईंले देख्नुभयो कि कसरी तपाईंका सबै दर्ताहरू, उपकरणहरू, स्रोतहरू र प्रॉम्प्टहरू दुई ह्यान्डलरहरूद्वारा प्रतिस्थापन गर्न सकिन्छ। अब के थप गर्नुपर्छ? हामीले केही प्रकारको मान्यकरण थप्नुपर्छ ताकि उपकरण सहि आर्गुमेन्टहरूसँग कल होस् भन्ने सुनिश्चित गर्न। हरेक रनटाइमले यसको आफ्नै समाधान छ, जस्तै Python ले Pydantic प्रयोग गर्छ र TypeScript ले Zod प्रयोग गर्छ। विचार यस प्रकार छ:

- एउटा सुविधा (उपकरण, स्रोत वा प्रॉम्प्ट) सृजना गर्ने लॉजिक त्यसको समर्पित फोल्डरमा सार्ने।
- एउटा तरिका थप्ने जुन आउने अनुरोध पार्स गरी उपकरण कल गर्न अनुरोध भएमा यसको मान्यकरण गर्छ।

### सुविधा सिर्जना गर्नुहोस्

सुविधा सिर्जना गर्न, हामीले त्यस सुविधाको लागि फाइल बनाउनु पर्छ र सुनिश्चित गर्नु पर्छ कि त्यसमा सुविधा आवश्यक अनिवार्य फिल्डहरू छन्। यी फिल्डहरू उपकरण, स्रोत र प्रॉम्प्टमा केही फरक हुन्छन्।

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
        # Pydantic मोडेलको प्रयोग गरेर इनपुट मान्य गर्नुहोस्
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic थप्नुहोस्, ताकि हामी AddInputModel बनाउन र args मान्य गर्न सकून्

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

यहाँ हामी यो गर्छौं:

- Pydantic मार्फत `AddInputModel` स्कीमा बनाउने, `a` र `b` फिल्डहरू सहित *schema.py* फाइलमा।
- आउँदो अनुरोधलाई `AddInputModel` प्रकारमा पार्स गर्ने प्रयास, यदि प्यारामिटरहरू मेल नखाएमा क्र्यास हुन्छ:

   ```python
   # add.py
    try:
        # Pydantic मोडेल प्रयोग गरी इनपुट प्रमाणित गर्नुहोस्
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

तपाईंले यो पार्सिङ लॉजिक टूल कलमा वा ह्यान्डलर फंक्शन भित्र राख्न सक्नुहुन्छ।

**TypeScript**

```typescript
// सर्भर.ts
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

// स्किमा.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// थप्नुहोस्.ts
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

- सबै उपकरण कल सम्हाल्ने ह्यान्डलरमा, आउँदो अनुरोधलाई उपकरणको स्कीमामा पार्स गर्ने प्रयास:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    यदि यो सफल भयो भने हामी वास्तविक उपकरण कल गर्न अघि बढ्छौं:

    ```typescript
    const result = await tool.callback(input);
    ```

देख्न सकिन्छ, यो दृष्टिकोणले राम्रो आर्किटेक्चर बनाउँछ किनकि सबै कुरा आफ्नो स्थानमा छ, *server.ts* एउटा सानो फाइल हो जसले केवल अनुरोध ह्यान्डलरहरू वायर गर्दछ र प्रत्येक सुविधा आफ्नो निर्दिष्ट फोल्डरमा हुन्छ जस्तै tools/, resources/ वा /prompts।

राम्रो छ, अब यो निर्माण गर्ने प्रयास गरौं। 

## अभ्यास: तल्लो-स्तर सर्भर सिर्जना गर्नुहोस्

यस अभ्यासमा, हामी निम्न गर्न जाँदैछौं:

1. उपकरणहरूको सूचीकरण र उपकरण कल सम्हाल्ने तल्लो-स्तर सर्भर सिर्जना गर्ने।
1. तपाईंले स्थापना गर्न सक्ने आर्किटेक्चर कार्यान्वयन गर्ने।
1. तपाईंका उपकरण कलहरूको ठीक-ठाक मान्यकरण सुनिश्चित गर्न मान्यकरण थप्ने।

### -1- आर्किटेक्चर सिर्जना गर्नुहोस्

पहिलो कुरा जसमा ध्यान दिनु पर्छ त्यो हो यस्तो आर्किटेक्चर जुन हामीलाई थप सुविधाहरू थप्दा सजिलै स्केल गर्न मद्दत गर्छ, यसरी देखिन्छ:

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

अब हामीले एउटा आर्किटेक्चर सेटअप गरिसकेका छौं जसले सजिलै नयाँ उपकरणहरू tools फोल्डरमा थप्न सक्छौं। स्रोतहरू र प्रॉम्प्टहरूका लागि पनि उप-निर्देशिका थप्न स्वतन्त्र हुनुहोस्।

### -2- उपकरण सिर्जना गर्नुहोस्

अब उपकरण कसरी सिर्जना गर्ने हेर्नुहोस्। पहिले यो *tool* उपनिर्देशिकामा सिर्जना गर्नुपर्छ यसरी:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic मोडेल प्रयोग गरेर इनपुट प्रमाणित गर्नुहोस्
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic थप्नुहोस्, ताकि हामी AddInputModel बनाउन सकौं र args प्रमाणित गर्न सकौं

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

यहाँ हामीले नाम, विवरण, र इनपुट स्कीमा Pydantic प्रयोग गरेर परिभाषित गरेको देख्यौं र उपकरण कल हुँदा बोलाइने ह्यान्डलर। अन्त्यमा, हामी `tool_add` उजागर गर्छौं जुन यी सबै गुणहरू राख्ने डिक्शनरी हो।

त्यस्तै, *schema.py* छ जुन हाम्रो उपकरणले प्रयोग गर्ने इनपुट स्कीमा परिभाषित गर्न प्रयोग हुन्छ:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

हामीले __init__.py पनि भर्नुपर्छ ताकि tools डायरेक्टरीलाई मोड्युलको रूपमा व्यवहार गरियोस्। साथै, हामी यसअन्तर्गतका मोड्युलहरू यसरी उजागर गर्छौं:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

हामी यो फाइलमा उपकरणहरू थप्दै जान सक्छौं।

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

यहाँ डिक्शनरी सिर्जना भैरहेको छ जसमा गुणहरू छन्:

- name, यो उपकरणको नाम हो।
- rawSchema, यो Zod स्कीमा हो, आउँदो अनुरोधहरूलाई उपकरण कल गर्न मान्य पार्न प्रयोग हुन्छ।
- inputSchema, यो स्कीमाले ह्यान्डलरले प्रयोग गर्ने इनपुट निर्धारण गर्छ।
- callback, यो उपकरणलाई कल गर्न प्रयोग हुन्छ।

त्यस्तै एउटा `Tool` छ जुन यो डिक्शनरीलाई mcp सर्भर ह्यान्डलरले स्वीकार गर्न सक्ने प्रकारमा बदल्छ र यसप्रकार देखिन्छ:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

र *schema.ts* छ जहाँ हामी प्रत्येक उपकरणको इनपुट स्कीमा राख्छौं, हालमा केवल एउटै स्कीमा छ तर उपकरणहरू थप्दै जाँदा थप प्रविष्टिहरू थप्न सकिन्छ:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

राम्रो छ, अब उपकरणहरूको सूचीको ह्यान्डलिंगमा अगाडि बढ़ौं।

### -3- उपकरण सूचीको ह्यान्डल गर्ने

अब हामी उपकरणहरूको सूची ह्यान्डल गर्न अनुरोध ह्यान्डलर सेटअप गर्नुपर्छ। यसलाई हाम्रो सर्भर फाइलमा यसरी थप्नुपर्छ:

**Python**

```python
# संक्षिप्तताको लागि कोड हटाइयो
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

यहाँ, हामीले `@server.list_tools` डेकोरेटर थप्यौं र `handle_list_tools` कार्यान्वयन गर्यौं। पछि, हामीलाई उपकरणहरूको सूची उत्पादन गर्नुपर्छ। प्रत्येक उपकरणसँग नाम, विवरण र inputSchema अवश्य हुनु पर्छ।   

**TypeScript**

उपकरण सूची को लागि अनुरोध ह्यान्डलर सेटअप गर्न, हामीले सर्भरमा `setRequestHandler` कल गर्नुपर्छ जुन स्कीमाले मेल खान्छ, यस अवस्थामा `ListToolsRequestSchema`। 

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
// छोटकरीको लागि कोड हटाइएको
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // दर्ता गरिएको उपकरणहरूको सूची फर्काउनुहोस्
  return {
    tools: tools
  };
});
```

राम्रो छ, अब हामीले उपकरण सूचीको टुक्रा समाधान गर्यौं, अब हेर्नुहोस् उपकरण कल कसरी गर्न सकिन्छ।

### -4- उपकरण कल ह्यान्डल गर्ने

उपकरण कल गर्न, हामी अर्को अनुरोध ह्यान्डलर सेटअप गर्नुपर्छ, जसले कुन सुविधा कसरी र कुन आर्गुमेन्टहरूसहित कल गर्ने भन्ने ह्यान्डल गर्छ।

**Python**

हामी `@server.call_tool` डेकोरेटर प्रयोग करू र `handle_call_tool` नामक फंक्शन कार्यान्वयन गरौं। यस फंक्शनमा, हामी उपकरण नाम र आर्गुमेन्टहरू पार्स गर्नुपर्छ र तिनीहरू यो उपकरणका लागि मान्य छन् भनेर सुनिश्चित गर्नुपर्छ। हामी आर्गुमेन्टहरूलाई यो फंक्शनमा वा उपकरणमा तल(validate) गर्न सक्छौं।

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # उपकरणहरू नामहरू कुञ्जीहरू भएका शब्दकोश हुन्
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # उपकरणलाई निमन्त्रणा गर्नुहोस्
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

यहाँ यसरी हुन्छ:

- हाम्रो उपकरण नाम इनपुट प्यारामिटर `name` को रूपमा पहिले नै छ जुन हाम्रो आर्गुमेन्टहरू `arguments` डिक्शनरीमा पनि छ।

- उपकरण `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` मार्फत कल गरिन्छ। आर्गुमेन्टहरूको मान्यकरण `handler` सम्पत्तिमा हुने फंक्शनमा हुन्छ, यदि यसले असफल भयो भने अपवाद उठाउँछ। 

यो भएर हामीले तल्लो-स्तर सर्भर प्रयोग गरी उपकरणहरूको सूची र कल कसरी गर्ने पूर्ण समझ पायौँ।

यहाँ [पूरा उदाहरण](./code/README.md) हेर्नुहोस्

## असाइनमेन्ट

तपाईंले दिइएको कोडलाई थुप्रै उपकरणहरू, स्रोतहरू र प्रॉम्प्टहरूसँग विस्तार गर्नुहोस् र महसुस गर्नुहोस् कि तपाईंले केवल tools डिरेक्टरीमा फाइलहरू मात्र थप्नुपर्छ, अर्को कुनै ठाउँमा होइन। 

*कोई समाधान दिइएको छैन*

## सारांश

यस अध्यायमा, हामीले तल्लो-स्तर सर्भर दृष्टिकोण कसरी काम गर्छ भनेर हेर्यौं र कसरी यसले हाम्रो बनाउने आर्किटेक्चर राम्रो बनाउन मद्दत गर्छ कुरा सिक्यौं। हामीले मान्यकरणबारे पनि छलफल गर्यौं र कसरी मान्यकरण पुस्तकालयहरूसँग स्कीमा बनाई इनपुट मान्य पार्ने देख्यौं।

## के आउनेछ

- अर्को: [साधारण प्रमाणीकरण](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->