# उन्नत सर्भर प्रयोग

MCP SDK मा दुइ प्रकारका सर्भरहरू छन्, तपाईँको सामान्य सर्भर र लो-लेवल सर्भर। सामान्यतया, तपाईँले साधारण सर्भर प्रयोग गर्नुहुन्छ जसमा सुविधाहरू थप्न। तर केही अवस्थाहरूमा, तपाईँ लो-लेवल सर्भरमा निर्भर रहन चाहनुहुन्छ जस्तै:

- राम्रो वास्तुकला। दुवै साधारण सर्भर र लो-लेवल सर्भर प्रयोग गरेर सफा वास्तुकला बनाउनु सम्भव छ तर केही भन्छन् कि लो-लेवल सर्भरसँग उपकरण बनाउन केही सजिलो हुन्छ।
- सुविधा उपलब्धता। केहि उन्नत सुविधाहरू मात्र लो-लेवल सर्भरमा मात्र प्रयोग गर्न सकिन्छ। तपाईँले यो पछि अध्यायहरूमा देख्नु हुनेछ जब हामी sampling र elicitation थप्नेछौं।

## सामान्य सर्भर र लो-लेवल सर्भर बीच

साधारण सर्भरसँग MCP सर्भर सिर्जनाको झलक यस्तो हुन्छ:

**Python**

```python
mcp = FastMCP("Demo")

# एउटा जोड्ने उपकरण थप्नुहोस्
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

// एक थप उपकरण थप्नुहोस्
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

महत्त्वपूर्ण कुरा के हो भने तपाईँले स्पष्ट रूपमा प्रत्येक उपकरण, स्रोत वा प्रम्प्ट जुन सर्भरमा हुन आवश्यक छ ती थप्नुपर्छ। यसमा कुनै गल्ती छैन।  

### लो-लेवल सर्भर विधि

तर, जब तपाईँ लो-लेवल सर्भर प्रयोग गर्नुहुन्छ, तपाईँले यसलाई फरक तरिकाले सोच्नुपर्छ। प्रत्येक उपकरण दर्ता गर्ने सट्टा, तपाईँले प्रत्येक सुविधा प्रकार (उपकरण, स्रोत वा प्रम्प्ट) का लागि दुई हैन्डलरहरू सिर्जना गर्नुहुन्छ। जस्तै उपकरणहरूको लागि दुई फङ्क्शनहरू मात्र हुन्छन्:

- सबै उपकरणहरूको सूची। एउटा फङ्क्शन सम्पूर्ण उपकरणहरू सूचीबद्ध गर्न مسؤول हुन्छ।
- सबै उपकरणहरू कल गर्ने प्रक्रियालाई सम्हाल्ने। यहाँ पनि एउटा मात्र फङ्क्शन उपकरणहरूलाई कल गर्ने काम गर्छ।

यो सायद काम कम होला जस्तो लाग्छ, हैन? एक उपकरण दर्ता गर्ने सट्टा, मलाई मात्र यो सुनिश्चित गर्नुपर्छ कि जब म उपकरणहरू सूचीबद्ध गर्छु, तब त्यो उपकरण सूचीमा छ र जब उपकरण कल गर्न अनुरोध आउँछ, त्यो उपकरणलाई कल गरिन्छ।

अब कोड कस्तो देखिन्छ हेरौं:

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
  // दर्ता गरिएका उपकरणहरूको सूची फिर्ता गर्नुहोस्
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

यहाँ अब यस्तो फङ्क्शन छ जुन सुविधाहरूको सूची फर्काउँछ। प्रत्येक प्रविष्टिमा उपकरणहरूको सूचीमा `name`, `description` र `inputSchema` जस्ता फिल्डहरू छन् जुन फर्काइने प्रकार पालना गर्छ। यसले हामीलाई हाम्रो उपकरणहरू र सुविधा परिभाषालाई अन्यत्र राख्न अनुमति दिन्छ। अब हामी हाम्रो उपकरणहरू सबै tools फोल्डरमा राख्न सक्छौं र तपाईंका सबै सुविधाहरूको लागि पनि यसैगरी, तपाईँको परियोजना यस्तै व्यवस्थित हुन सक्छ:

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

यो राम्रो छ, हाम्रो वास्तुकला सफा देखिन सक्छ।

उपकरणहरू कल गर्ने कुरा के हो, त्यो पनि उस्तै हो, एउटा हैन्डलरले जुनसुकै उपकरणलाई कल गर्ने? हो, बिल्कुल, यो कोड हो:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools उपकरण नामहरू कुञ्जीको रूपमा भएको शब्दकोश हो
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
    // TODO उपकरण कल गर्नुहोस्,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

माथिको कोडबाट देख्न सकिन्छ कि हामीले कल गर्नुपर्ने उपकरण र त्यसका आर्गुमेन्टहरू पार्स गर्नुपर्छ र त्यसपछि उपकरणलाई कल गर्न अघि बढ्नुपर्छ।

## भ्यालिडेसनसहित विधि सुधार

अहिलेसम्म, तपाईँले कसरी उपकरण, स्रोत र प्रम्प्टहरू थप्नका लागि भएको सबै दर्ता यी दुई हैन्डलरहरुले प्रतिस्थापन गर्न सकिन्छ देख्नुभयो। अनि के गर्न बाँकी छ? हामीले कुनै प्रकारको भ्यालिडेसन थप्नुपर्छ जसले सुनिश्चित गर्दछ कि उपकरण सही आर्गुमेन्टहरूसँग कल गरिएको छ। प्रत्येक रनटाइमको लागि फरक समाधान हुन्छ, जस्तै Python मा Pydantic प्रयोग हुन्छ भने TypeScript मा Zod प्रयोग हुन्छ। विचार यस्तो छ:

- सुविधा (उपकरण, स्रोत वा प्रम्प्ट) बनाउनको लागि यसको समर्पित फोल्डरमा लगिक सार्नुहोस्।
- कुनै अनुरोध जसले एउटा उपकरण कल गर्न भन्छ, त्यसलाई मान्य गर्ने तरिका थप गर्नुहोस्।

### सुविधा सिर्जना

सुविधा बनाउन, हामीले त्यो सुविधाको लागि फाइल बनाउनुपर्छ र सुनिश्चित गर्नुपर्छ कि आवश्यक फिल्डहरू त्यो सुविधामा छन्। कुन फिल्डहरू फरक पर्दछन् जस्तै उपकरण, स्रोत र प्रम्प्टहरूमा।

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
        # Pydantic मोडेल प्रयोग गरी इनपुट मान्य गर्नुहोस्
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic थप्नुहोस्, ताकि हामी AddInputModel सिर्जना गर्न सकियोस् र args मान्य गर्न सकियोस्

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

यहाँ तल देख्न सकिन्छ हामीले के गर्छौं:

- Pydantic `AddInputModel` स्किमामा `a` र `b` फिल्ड राखेर स्किमा बनाउँछौं *schema.py* फाइलमा।
- आउँदो अनुरोधलाई `AddInputModel` मा पार्स गर्ने प्रयास गर्छौं, यदि प्यारामिटरहरूमा मिल्दोजुल्दो छैन भने यो क्र्यास हुनेछ:

   ```python
   # add.py
    try:
        # Pydantic मोडेल प्रयोग गरेर इनपुट प्रमाणित गर्नुहोस्
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

यो पार्सिङ्ग लगिकलाई उपकरण कलमा राख्न वा हैन्डलर फंक्शनमा राख्न सक्नुहुन्छ।

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

       // @ts-अग्न Ignore गर्‍यो
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

// स्कीमा.ts
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

- सबै उपकरण कलहरू सम्हाल्ने हैन्डलरमा, हामी आउँदो अनुरोधलाई सम्बन्धित उपकरणको परिभाषित स्किमामा पार्स गर्ने प्रयास गर्छौं:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    यदि सफल भयो भने हामी वास्तविक उपकरण कल गर्न अघि बढ्छौं:

    ```typescript
    const result = await tool.callback(input);
    ```

जस्तो देख्नुभयो, यस विधिले उत्कृष्ट वास्तुकला बनाउँछ किनभने सबै कुराको आफ्नै ठाउँ छ, *server.ts* निकै सानो फाइल हो जुन केवल अनुरोध हैन्डलरहरू जोड्दछ र प्रत्येक सुविधा आफ्नो सम्बद्ध फोल्डरमा हुन्छ: tools/, resources/ वा /prompts।

राम्रो छ, अब यसलाई निर्माण गर्न प्रयास गरौं। 

## अभ्यास: लो-लेवल सर्भर बनाउने

यस अभ्यासमा, हामी यसरी गरौं:

1. उपकरणहरूको सूची र कल सम्हाल्ने लो-लेवल सर्भर बनाउने।
1. यस्तो वास्तुकला कार्यान्वयन गर्ने जस्मा पछि थप सुविधा थप्न सकिन्छ।
1. तपाईँका उपकरण कलहरू सही तरिकाले मान्य हुने सुनिश्चित गर्न भ्यालिडेसन थप्ने।

### -1- वास्तुकला बनाउने

पहिलो गर्नु पर्ने वास्तुकला हो जुन विस्तार गर्न मद्दत गर्नेछ, यस्तो देखिन्छ:

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

अब हामीले एउटा वास्तुकला सेटअप गरिसकेका छौं जसले हामीलाई सजिलै नयाँ उपकरणहरू tools फोल्डरमा थप्न अनुमति दिन्छ। स्रोत र प्रम्प्टका लागि पनि उप-डाइरेक्टोरी थप्न यो पछ्याउन सक्नुहुन्छ।

### -2- उपकरण बनाउने

अर्को, उपकरण बनाउँदा कस्तो देखिन्छ जाँचौं। पहिलो, यो *tool* उप-डाइरेक्टरीमा बनाउनु पर्छ यसरी:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic मोडेल प्रयोग गरेर इनपुट मान्य गर्नुहोस्
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic थप्नुहोस्, ताकि हामी AddInputModel सिर्जना गरी आर्गुमेन्टहरू मान्य गर्न सकौं

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

यहाँ हामीले नाम, विवरण र इनपुट स्किमा Pydantic प्रयोग गरेर परिभाषित गरेको छौं र एउटा हैन्डलर छ जुन उपकरण कल हुँदा चल्नेछ। अन्तमा, हामीले `tool_add` लाई एक्स्पोज गरेका छौं जुन सबै यी गुणहरू समात्छ।

त्यसमा *schema.py* पनि छ जुन उपकरणले प्रयोग गर्ने इनपुट स्किमा परिभाषित गर्छ:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

हामीले *__init__.py* पनि भर्नुपर्छ ताकि tools डाइरेक्टरीलाई मोड्युलको रूपमा मानिन्छ। साथै यसमा रहेका मोड्युलहरू एक्स्पोज गर्नुपर्छ यसरी:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

अझ धेरै उपकरणहरू थप्दै जान यस फाइललाई विस्तार गर्न सकिन्छ।

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

यहाँ हामी गुणहरूको डिक्सनरी बनाउँछौं:

- name, उपकरणको नाम।
- rawSchema, Zod स्किमा, यो उपकरण call गर्ने अनुरोधहरूलाई मान्य गर्न प्रयोग हुन्छ।
- inputSchema, हैन्डलरले प्रयोग गर्ने स्किमा।
- callback, यो उपकरणलाई invoke गर्न प्रयोग।

त्यसैगरी `Tool` छ जुन डिक्सनरीलाई mcp सर्भर हैन्डलरले स्वीकार्न सक्ने प्रकारमा रूपान्तरण गर्छ जुन यसरी देखिन्छ:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

र *schema.ts* छ जहाँ हामी प्रत्येक उपकरणको लागि इनपुट स्किमा राख्छौं जुन अहिले एउटा छ, तर उपकरण थप्दै जाँदा थप प्रबिष्टि थप्न सकिन्छ:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

राम्रो छ, अब हामी उपकरणहरूको सूची सम्हाल्न आगाडि बढौँ।

### -3- उपकरण सूची सम्हाल्ने

अर्को, उपकरणहरू सूचीबद्ध गर्नको लागि अनुरोध हैन्डलर सेटअप गर्ने। यसको लागि हामीलाई सर्भर फाइलमा निम्न थप्न आवश्यक छ:

**Python**

```python
# कोड छोटो पार्नका लागि हटाइएको छ
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

यहाँ, हामीले `@server.list_tools` डेकोरेटर र त्यो कार्यान्वयन गर्ने `handle_list_tools` फङ्क्शन थपेका छौं। त्यसमा, हामीलाई उपकरणहरूको सूची तयार पार्नुपर्छ। ध्यान दिनुहोस् प्रत्येक उपकरणमा नाम, विवरण र inputSchema हुनुपर्छ।   

**TypeScript**

उपकरण सूचीबद्ध गर्ने अनुरोध हैन्डलर सेटअप गर्न, हामीले सर्भरमा `setRequestHandler` कल गर्नुपर्छ जसमा स्किमा हुन्छ जस्तै `ListToolsRequestSchema`।

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
// संक्षिप्तताको लागि कोड हटाइएको
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // दर्ता गरिएका उपकरणहरूको सूची फिर्ता गर्नुहोस्
  return {
    tools: tools
  };
});
```

असाध्यै राम्रो, अब हामीले उपकरणहरू सूचीबद्ध गर्ने भाग समाधान गर्यौं, अब कस्तो गरी उपकरणहरू कल गर्ने थाहा पाउनुहोस्।

### -4- उपकरण कल सम्हाल्ने

उपकरण कल गर्न, अर्को अनुरोध हैन्डलर सेटअप गर्न आवश्यक छ जुन कुन सुविधा कल गर्नुपर्ने र कुन तर्कहरूसँग भनेर सम्हाल्छ।

**Python**

`@server.call_tool` डेकोरेटर प्रयोग गरौं र `handle_call_tool` जस्तो फङ्क्शन कार्यान्वयन गरौं। यसमा, हामी उपकरणको नाम, त्यसका आर्गुमेन्टहरू पार्स गर्न र तर्कहरू उपकरण अनुसार मान्य छन् कि छैनन् भनेर जाँच्नुपर्छ। हामीले तर्कहरू यो फङ्क्शन वा उपकरणकै भित्र पक्रन सक्छौं।

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools एउटा शब्दकोश हो जसमा उपकरण नामहरू कुञ्जीहरूका रूपमा हुन्छन्
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # उपकरणलाई बोलाउनुहोस्
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

यो के हुन्छ:

- हाम्रो उपकरण नाम पहिले नै इनपुट प्यारामिटर `name` मा छ जुन सही छ, र तर्कहरू `arguments` डिक्सनरी स्वरूप छन्।

- उपकरण यसरी कल हुन्छ: `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`। तर्कहरूको भ्यालिडेसन `handler` प्रोपर्टी भित्र हुन्छ जुन फङ्क्शन हो, यदि यो फेल भयो भने एक्सेप्सन आउँछ।

त्यसैले, अब हामीसँग लो-लेवल सर्भरसँग उपकरणहरू सूचीबद्ध र कल गर्ने पूर्ण समझ छ।

[पूर्ण उदाहरण](./code/README.md) यहाँ हेर्नुहोस्

## असाइनमेन्ट

तपाईँलाई दिइएको कोडमा थप उपकरणहरू, स्रोतहरू र प्रम्प्टहरू थप्नुहोस् र कसरी तपाईँले केवल tools डाइरेक्टरीमा फाइलहरू मात्र थप्न आवश्यक हुन्छ र अरू कहीं थप्न पर्दैन भन्ने कुरा महसुस गर्नुहोस्।

*कुनै समाधान दिइएको छैन*

## सारांश

यस अध्यायमा, हामीले लो-लेवल सर्भर विधि कसरी काम गर्छ र कसरी त्यसले राम्रो वास्तुकला बनाउन मद्दत गर्छ देख्यौं। हामीले भ्यालिडेसनको कुरा पनि गर्यौं र कसरी भ्यालिडेसन पुस्तकालयहरू प्रयोग गरेर इनपुट भ्यालिडेसनका लागि स्किमा बनाउने देख्यौं।

## के छ भोलि

- अर्को: [साधारण प्रमाणीकरण](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकृति**:  
यस कागजातलाई AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी शुद्धताको प्रयास गर्छौं, तर कृपया सावधान रहनुहोस् कि स्वचालित अनुवादमा त्रुटिहरू वा गलतफहमिहरू हुन सक्छन्। मूल कागजातलाई यसको मातृभाषामा आधिकारिक स्रोतको रूपमा विचार गर्नु पर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानवीय अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा गलत व्याख्याका लागि हामी जिम्मेवार हुँदैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->