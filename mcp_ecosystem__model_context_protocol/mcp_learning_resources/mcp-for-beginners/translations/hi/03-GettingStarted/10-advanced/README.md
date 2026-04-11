# उन्नत सर्वर उपयोग

MCP SDK में दो अलग-अलग प्रकार के सर्वर उपलब्ध हैं, आपका सामान्य सर्वर और निम्न-स्तर का सर्वर। सामान्यतः, आप फीचर्स जोड़ने के लिए नियमित सर्वर का उपयोग करेंगे। हालांकि कुछ मामलों में, आप निम्न-स्तर के सर्वर पर भरोसा करना चाहेंगे, जैसे:

- बेहतर संरचना। यह संभव है कि आप नियमित सर्वर और निम्न-स्तर सर्वर दोनों के साथ एक साफ-सुथरी संरचना बना सकें, लेकिन यह कहा जा सकता है कि निम्न-स्तर सर्वर के साथ यह थोड़ा आसान होता है।
- फीचर की उपलब्धता। कुछ उन्नत फीचर्स केवल निम्न-स्तर के सर्वर के साथ ही उपयोग किए जा सकते हैं। आप इसे बाद के अध्यायों में देखेंगे जैसे कि सैंपलिंग और एलिसिटेशन जोड़ते समय।

## नियमित सर्वर बनाम निम्न-स्तर सर्वर

यहाँ यह दिखाया गया है कि एक MCP सर्वर का निर्माण नियमित सर्वर के साथ कैसा दिखता है

**Python**

```python
mcp = FastMCP("Demo")

# एक जोड़ने का उपकरण जोड़ें
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

// एक जोड़ उपकरण जोड़ें
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

यहाँ बात यह है कि आप स्पष्ट रूप से हर टूल, संसाधन या प्रॉम्प्ट को जोड़ते हैं जिसे आप चाहते हैं कि सर्वर के पास हो। इसमें कोई समस्या नहीं है।  

### निम्न-स्तर सर्वर दृष्टिकोण

हालांकि, जब आप निम्न-स्तर सर्वर दृष्टिकोण का उपयोग करते हैं, तो आपको इसे अलग तरीके से सोचना पड़ता है। हर टूल को पंजीकृत करने के बजाय, आप प्रत्येक फीचर प्रकार (tools, resources या prompts) के लिए दो हैंडलर बनाते हैं। उदाहरण के लिए, टूल्स के लिए केवल दो फ़ंक्शन होते हैं:

- सभी टूल्स की सूची बनाना। एक फ़ंक्शन सभी प्रयासों के लिए ज़िम्मेदार होगा जिसमें टूल्स को सूचीबद्ध करने का प्रयास किया जाता है।
- सभी टूल्स को कॉल करना। यहाँ भी, एक ही फ़ंक्शन एक टूल को कॉल करने के लिए संभालता है।

यह संभवतः कम काम जैसा लगता है, है ना? तो टूल को पंजीकृत करने के बजाय, मुझे केवल यह सुनिश्चित करना है कि टूल तब सूची में हो जब मैं सभी टूल्स की सूची देखूं और जब टूल को कॉल करने के लिए अनुरोध आए तब उसे कॉल किया जाए।

आइए देखें कि अब कोड कैसा दिखता है:

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
  // पंजीकृत उपकरणों की सूची लौटाएं
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

यहाँ हमारे पास एक फ़ंक्शन है जो फीचर्स की एक सूची लौटाता है। टूल्स सूची में प्रत्येक प्रविष्टि के पास अब `name`, `description` और `inputSchema` जैसे फ़ील्ड होते हैं ताकि वापसी प्रकार का पालन किया जा सके। इससे हमें हमारे टूल्स और फीचर परिभाषा को कहीं और रखने में सुविधा मिलती है। अब हम अपने सभी टूल्स को एक tools फ़ोल्डर में बना सकते हैं और इसी तरह आपके सभी फीचर्स के लिए भी, इसलिए आपका प्रोजेक्ट अचानक इस तरह व्यवस्थित हो सकता है:

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

यह बहुत अच्छा है, हमारी संरचना काफी साफ दिख सकती है।

टूल्स को कॉल करने का क्या? क्या यह भी वही विचार है, एक हैंडलर किसी भी टूल को कॉल करने के लिए? हाँ, बिल्कुल, यहाँ उसका कोड है:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools एक शब्दकोश है जिसमें टूल नाम कुंजियों के रूप में हैं
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
    // TODO टूल को कॉल करें,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

जैसा आप उपरोक्त कोड से देख सकते हैं, हमें उस टूल को पार्स करना होगा जिसे कॉल करना है, और किन तर्कों के साथ, और फिर हमें टूल को कॉल करने के लिए आगे बढ़ना होगा।

## सत्यापन के साथ दृष्टिकोण में सुधार

अब तक, आपने देखा कि कैसे टूल्स, संसाधन और प्रॉम्प्ट जोड़ने के लिए आपकी सभी पंजीकरणों को प्रत्येक फीचर प्रकार के लिए दो हैंडलर्स से बदल दिया जा सकता है। हमें और क्या करने की आवश्यकता है? ठीक है, हमें कुछ प्रकार का सत्यापन जोड़ना चाहिए ताकि यह सुनिश्चित किया जा सके कि टूल को सही तर्कों के साथ कॉल किया जाता है। प्रत्येक रनटाइम का इस समस्या के लिए अपनी ही समाधान है, उदाहरण के लिए Python Pydantic का उपयोग करता है और TypeScript Zod का। विचार यह है कि हम निम्नलिखित करें:

- एक फीचर (टूल, संसाधन या प्रॉम्प्ट) बनाने के लिए लॉजिक को उसके समर्पित फ़ोल्डर में स्थानांतरित करें।
- एक तरीका जोड़ें जिससे इनकमिंग अनुरोध, जो उदाहरण के लिए टूल कॉल करने की मांग करता है, को सत्यापित किया जा सके।

### एक फीचर बनाना

एक फीचर बनाने के लिए, हमें उस फीचर के लिए एक फ़ाइल बनानी होगी और यह सुनिश्चित करना होगा कि उसमें उस फीचर के लिए आवश्यक अनिवार्य फ़ील्ड्स हों। कौन से फ़ील्ड्स टूल्स, संसाधनों और प्रॉम्प्ट्स के बीच थोड़ा अलग हो सकते हैं।

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
        # Pydantic मॉडल का उपयोग करके इनपुट मान्य करें
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic जोड़ें, ताकि हम एक AddInputModel बना सकें और तर्कों को मान्य कर सकें

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

यहाँ आप देख सकते हैं कि हम निम्नलिखित कैसे करते हैं:

- Pydantic `AddInputModel` का उपयोग करके *schema.py* फ़ाइल में `a` और `b` फील्ड्स के साथ एक स्कीमा बनाते हैं।
- इनकमिंग अनुरोध को `AddInputModel` प्रकार के रूप में पार्स करने का प्रयास करते हैं, यदि पैरामीटरों में असंगति है तो यह क्रैश हो जाएगा:

   ```python
   # add.py
    try:
        # Pydantic मॉडल का उपयोग करके इनपुट मान्य करें
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

आप चुन सकते हैं कि आप इस पार्सिंग लॉजिक को टूल कॉल में ही रखें या हैंडलर फ़ंक्शन में।

**TypeScript**

```typescript
// सर्वर.ts
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

// स्कीमा.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// जोड़ें.ts
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

- सभी टूल कॉल्स से निपटने वाले हैंडलर में, हम अब इनकमिंग अनुरोध को टूल के परिभाषित स्कीमा में पार्स करने का प्रयास करते हैं:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    यदि यह सफल होता है तो हम वास्तविक टूल को कॉल करते हैं:

    ```typescript
    const result = await tool.callback(input);
    ```

जैसा कि आप देख सकते हैं, यह दृष्टिकोण एक उत्कृष्ट संरचना बनाता है क्योंकि सब कुछ अपनी जगह पर होता है, *server.ts* एक बहुत छोटी फ़ाइल होती है जो केवल अनुरोध हैंडलर्स को जोड़ती है और प्रत्येक फीचर अपने संबंधित फ़ोल्डर में होता है जैसे tools/, resources/ या /prompts।

बहुत बढ़िया, आइए अगला निर्माण करते हैं। 

## व्यायाम: एक निम्न-स्तर सर्वर बनाना

इस व्यायाम में, हम निम्नलिखित करेंगे:

1. एक निम्न-स्तर सर्वर बनाएंगे जो टूल्स की सूची बनाना और टूल्स को कॉल करना संभाले।
1. एक ऐसी वास्तुकला लागू करेंगे जिस पर आप आगे बढ़ सकते हैं।
1. सत्यापन जोड़ेंगे ताकि आपके टूल कॉल सही तरीके से सत्यापित किए जाएं।

### -1- एक वास्तुकला बनाएँ

पहली बात जो हमें संबोधित करनी है वह एक ऐसी वास्तुकला है जो हमें अधिक फीचर्स जोड़ने पर स्केल करने में मदद करें, यह कुछ इस तरह दिखती है:

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

अब हमने एक ऐसी वास्तुकला सेटअप की है जो सुनिश्चित करती है कि हम आसानी से टूल्स को tools फ़ोल्डर में जोड़ सकते हैं। संसाधनों और प्रॉम्प्ट्स के लिए भी आप उपडायरेक्टरीज़ जोड़ सकते हैं।

### -2- एक टूल बनाना

आइए देखें कि एक टूल बनाना कैसा दिखता है। सबसे पहले, इसे अपने *tool* उपनिर्देशिका में बनाना होगा, कुछ इस तरह:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic मॉडल का उपयोग करके इनपुट सत्यापित करें
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic जोड़ें, ताकि हम एक AddInputModel बना सकें और args को सत्यापित कर सकें

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

यहाँ हम देख रहे हैं कि हम नाम, विवरण और इनपुट स्कीमा को Pydantic के साथ परिभाषित करते हैं और एक हैंडलर जो इस टूल के कॉल होने पर invoke होगा। अंत में, हम `tool_add` एक्सपोज़ करते हैं जो इन सभी गुणों को रखता है।

*schema.py* भी है जो हमारे टूल द्वारा उपयोग किए जाने वाले इनपुट स्कीमा को परिभाषित करता है:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

हमें *__init__.py* को भी भरना होगा ताकि tools डायरेक्टरी को एक मॉड्यूल माना जाए। इसके अलावा, हमें इसमें मौजूद मॉड्यूल्स को इस तरह से एक्सपोज़ करना होगा:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

जैसे-जैसे हम और टूल्स जोड़ते हैं, हम इस फ़ाइल में जोड़ सकते हैं।

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

यहाँ हम एक डिक्शनरी बनाते हैं जिसमें गुण होते हैं:

- name, यह टूल का नाम है।
- rawSchema, यह Zod स्कीमा है, इसका उपयोग इनकमिंग अनुरोधों को वैध करने के लिए किया जाएगा ताकि टूल को कॉल किया जा सके।
- inputSchema, यह स्कीमा हैंडलर द्वारा उपयोग किया जाएगा।
- callback, यह टूल को invoke करने के लिए उपयोग किया जाता है।

`Tool` भी है जिसका उपयोग इस डिक्शनरी को उस प्रकार में कन्वर्ट करने के लिए किया जाता है जिसे MCP सर्वर हैंडलर स्वीकार कर सकता है और यह कुछ इस तरह दिखता है:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

और *schema.ts* है जहाँ हम प्रत्येक टूल के लिए इनपुट स्कीमा संचित करते हैं, जो अभी केवल एक स्कीमा के साथ दिखता है, लेकिन टूल्स जोड़ने के साथ इसमें और प्रविष्टियाँ जोड़ सकते हैं:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

बहुत बढ़िया, अब आइए अपने टूल्स की सूची को संभालना शुरू करें।

### -3- टूल सूची संभालना

अगला, अपने टूल्स की सूची को संभालने के लिए, हमें एक अनुरोध हैंडलर सेट करना होगा। इसे हमारे सर्वर फ़ाइल में इस तरह जोड़ना होगा:

**Python**

```python
# संक्षिप्तता के लिए कोड छोड़ा गया है
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

यहाँ, हम डेकोरेटर `@server.list_tools` और उसे लागू करने वाले फ़ंक्शन `handle_list_tools` जोड़ते हैं। बाद वाले में, हमें टूल्स की एक सूची बनानी होती है। ध्यान दें कि प्रत्येक टूल के पास नाम, विवरण और inputSchema होना आवश्यक है।   

**TypeScript**

टूल्स की सूची बनाने के लिए अनुरोध हैंडलर सेटअप करने के लिए, हमें सर्वर पर `setRequestHandler` कॉल करनी होगी जो उस स्कीमा के अनुरूप हो जिसे हम कार्यान्वित कर रहे हैं, इस मामले में `ListToolsRequestSchema`। 

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
// संक्षिप्तता के लिए कोड छोड़ दिया गया
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // पंजीकृत उपकरणों की सूची लौटाएं
  return {
    tools: tools
  };
});
```

बहुत बढ़िया, अब हमने टूल्स की सूची बनाने का हिस्सा हल कर लिया है, आइए देखें कि हम टूल्स को कॉल कैसे कर सकते हैं।

### -4- टूल कॉल करना संभालना

टूल को कॉल करने के लिए, हमें एक और अनुरोध हैंडलर सेट करना होगा, जो विशेष रूप से एक अनुरोध को संभाले जो निर्दिष्ट करता है कि कौन सा फीचर कॉल करना है और किन तर्कों के साथ।

**Python**

डेकोरेटर `@server.call_tool` का उपयोग करें और इसे एक फ़ंक्शन जैसे `handle_call_tool` के साथ लागू करें। उस फ़ंक्शन के भीतर, हमें टूल का नाम, इसके तर्क पार्स करने होंगे और यह सुनिश्चित करना होगा कि तर्क उस टूल के लिए मान्य हैं। हम इस फ़ंक्शन में तर्कों का सत्यापन कर सकते हैं या बाद में वास्तविक टूल में कर सकते हैं।

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools एक शब्दकोश है जिसमें टूल के नाम कुंजी के रूप में हैं
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # टूल को कॉल करें
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

यहाँ क्या होता है:

- हमारा टूल नाम इनपुट पैरामीटर `name` के रूप में मौजूद होता है जो `arguments` डिक्शनरी में हमारे तर्कों के लिए सही है।

- टूल को `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` के साथ कॉल किया जाता है। तर्कों का सत्यापन `handler` गुण में होता है जो एक फ़ंक्शन को इंगित करता है, यदि यह विफल होता है तो यह एक अपवाद उठाएगा।

तो, अब हमारे पास टूल्स की सूची बनाने और कॉल करने की पूरी समझ है निम्न-स्तर सर्वर का उपयोग करते हुए।

[यहाँ पूरा उदाहरण देखें](./code/README.md)

## असाइनमेंट

आपके दिये गए कोड को कई टूल्स, संसाधन और प्रॉम्प्ट के साथ विस्तारित करें और सोचें कि आप केवल tools डायरेक्टरी में फाइलें जोड़ते हैं और कहीं और नहीं। 

*कोई समाधान नहीं दिया गया*

## सारांश

इस अध्याय में, हमने देखा कि कैसे निम्न-स्तर सर्वर दृष्टिकोण काम करता है और यह कैसे हमें एक अच्छी संरचना बनाने में मदद करता है जिस पर हम बना सकते हैं। हमने सत्यापन पर भी चर्चा की और आपको दिखाया गया कि आप इनपुट सत्यापन के लिए स्कीमा बनाने हेतु सत्यापन पुस्तकालयों के साथ कैसे काम कर सकते हैं।

## आगे क्या है

- अगला: [साधारण प्रमाणीकरण](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
यह दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके अनूदित किया गया है। जबकि हम सटीकता के लिए प्रयासरत हैं, कृपया ध्यान रखें कि स्वचालित अनुवाद में त्रुटियां या असंगतियां हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में प्राधिकारी स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से होने वाली किसी भी गलतफहमी या गलत व्याख्या की ज़िम्मेदारी हम पर नहीं होगी।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->