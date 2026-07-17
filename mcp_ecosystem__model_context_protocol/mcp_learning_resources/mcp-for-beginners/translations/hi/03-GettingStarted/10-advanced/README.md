# उन्नत सर्वर उपयोग

MCP SDK में दो प्रकार के सर्वर उपलब्ध हैं, आपका सामान्य सर्वर और निम्न-स्तर सर्वर। सामान्यतः, आप इसके लिए फ़ीचर जोड़ने के लिए नियमित सर्वर का उपयोग करेंगे। हालांकि कुछ मामलों में, आप निम्न-स्तर सर्वर पर निर्भर रहना चाहेंगे, जैसे:

- बेहतर वास्तुकला। यह संभव है कि नियमित सर्वर और निम्न-स्तर सर्वर दोनों के साथ एक साफ़-सुथरी वास्तुकला बनाई जाए, लेकिन यह तर्क दिया जा सकता है कि निम्न-स्तर सर्वर के साथ इसे थोड़ा आसान बनाया जा सकता है।
- फ़ीचर उपलब्धता। कुछ उन्नत फ़ीचर केवल निम्न-स्तर सर्वर के साथ ही उपयोग किए जा सकते हैं। आप इसे आगे के अध्यायों में देखेंगे जैसे कि सैम्पलिंग (जो `2026-07-28` रिलीज़ कैंडिडेट में अप्रचलित हो गया है) और उत्सर्जन।

## नियमित सर्वर बनाम निम्न-स्तर सर्वर

एक MCP सर्वर बनाने का उदाहरण नियमित सर्वर के साथ कुछ इस प्रकार दिखता है

**पाइथन**

```python
mcp = FastMCP("Demo")

# एक जोड़ उपकरण जोड़ें
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b
```

**टाइपस्क्रिप्ट**

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

मुद्दा यह है कि आप स्पष्ट रूप से प्रत्येक टूल, स्रोत या प्रांप्ट जोड़ते हैं जिसे आप चाहते हैं कि सर्वर में हो। इसमें कुछ भी गलत नहीं है।  

### निम्न-स्तर सर्वर दृष्टिकोण

हालांकि, जब आप निम्न-स्तर सर्वर दृष्टिकोण का उपयोग करते हैं, तो आपको इसे अलग तरीके से सोचना होगा। प्रत्येक टूल पंजीकृत करने के बजाय, आप प्रत्येक फ़ीचर प्रकार (टूल, संसाधन या प्रांप्ट) के लिए दो हैंडलर बनाते हैं। उदाहरण के लिए, टूल्स के लिए केवल दो फ़ंक्शन होते हैं:

- सभी टूल्स की सूची बनाना। एक फ़ंक्शन सभी टूल्स की सूची बनाने के प्रयासों के लिए जिम्मेदार होगा।
- सभी टूल कॉल को संभालना। यहाँ भी, केवल एक फ़ंक्शन टूल कॉल को संभालता है। 

यह संभावित रूप से कम काम जैसा लग रहा है, है ना? इसलिए टूल पंजीकृत करने के बजाय, मुझे केवल यह सुनिश्चित करना है कि टूल सभी टूल्स की सूची में हो और जब टूल को कॉल करने का अनुरोध हो तो उसे कॉल किया जाए। 

आइए देखें अब कोड कैसा दिखता है:

**पाइथन**

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

**टाइपस्क्रिप्ट**

```typescript
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // पंजीकृत उपकरणों की सूची लौटाएं
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

अब हमारे पास एक फ़ंक्शन है जो फ़ीचर्स की सूची लौटाता है। टूल्स की सूची में प्रत्येक प्रविष्टि में `name`, `description` और `inputSchema` जैसे क्षेत्र होते हैं ताकि यह अपेक्षित प्रकार का पालन करे। इससे हमें अपने टूल्स और फ़ीचर परिभाषा कहीं और रखने की सुविधा मिलती है। अब हम अपने सभी टूल्स को एक टूल्स फ़ोल्डर में रख सकते हैं और आपके सभी फ़ीचर्स के लिए भी वैसा ही कर सकते हैं, ताकि आपका प्रोजेक्ट इस प्रकार संगठित हो सके:

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

यह बहुत अच्छा है, हमारी वास्तुकला काफी साफ ​​सुथरी दिख सकती है।

टूल कॉल करने के बारे में क्या? क्या यह भी वही विचार है, एक हैंडलर टूल कॉल करने के लिए, जो भी टूल हो? हाँ, बिल्कुल, यहाँ उसका कोड है:

**पाइथन**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools एक शब्दकोष है जिसमें टूल के नाम कुंजी के रूप में हैं
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

**टाइपस्क्रिप्ट**

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
    
    // तर्क: request.params.arguments
    // TODO उपकरण को कॉल करें,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

ऊपर दिए गए कोड से आप देख सकते हैं कि हमें कॉल करने वाले टूल और उसके तर्क पार्स करने की जरूरत है, और फिर टूल कॉल करना होता है।

## सत्यापन के साथ दृष्टिकोण में सुधार

अब तक, आपने देखा कि टूल, संसाधन और प्रांप्ट जोड़ने के लिए आपके सभी पंजीकरणों को फ़ीचर प्रकार के अनुसार दो हैंडलरों से बदला जा सकता है। अब हमें और क्या करना चाहिए? हमें कुछ सत्यापन जोड़ना चाहिए ताकि टूल सही तर्कों के साथ कॉल हो। प्रत्येक रनटाइम इसका अपना समाधान रखता है, उदाहरण के लिए पाइथन Pydantic का उपयोग करता है और टाइपस्क्रिप्ट Zod का। विचार यह है कि हम निम्न करें:

- फ़ीचर (टूल, संसाधन या प्रांप्ट) बनाने की तर्क को उसके समर्पित फ़ोल्डर में ले जाएं।
- उदाहरण के लिए टूल कॉल करने का अनुरोध सत्यापित करने का तरीका जोड़ें।

### फ़ीचर बनाएँ

एक फ़ीचर बनाने के लिए, हमें उस फ़ीचर के लिए एक फ़ाइल बनाएँगे और सुनिश्चित करेंगे कि उसमें आवश्यक क्षेत्र हों जो उस फ़ीचर के लिए जरूरी हों। ये क्षेत्र टूल्स, संसाधनों और प्रांप्ट्स के बीच थोड़े अलग हो सकते हैं।

**पाइथन**

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
        # इनपुट को Pydantic मॉडल का उपयोग करके मान्य करें
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

यहाँ आप देख सकते हैं कि हम निम्न करते हैं:

- Pydantic `AddInputModel` का उपयोग करते हुए स्कीमा बनाएं जिसमें फ़ील्ड `a` और `b` हैं, फ़ाइल *schema.py* में।
- आने वाले अनुरोध को `AddInputModel` प्रकार में पार्स करने का प्रयास करें, अगर पैरामीटर मेल नहीं खाते हैं तो यह क्रैश कर जाएगा:

   ```python
   # add.py
    try:
        # Pydantic मॉडल का उपयोग करके इनपुट जांचें
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

आप चुन सकते हैं कि इस पार्सिंग लॉजिक को टूल कॉल में ही रखें या हैंडलर फ़ंक्शन में।

**टाइपस्क्रिप्ट**

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

       // @ts-अवगणना
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

- सभी टूल कॉल को संभालने वाले हैंडलर में, अब हम आने वाले अनुरोध को टूल द्वारा परिभाषित स्कीमा में पार्स करने का प्रयास करते हैं:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    अगर यह सफल हो जाता है तो हम वास्तविक टूल को कॉल करते हैं:

    ```typescript
    const result = await tool.callback(input);
    ```

जैसा कि आप देख सकते हैं, यह दृष्टिकोण एक बेहतरीन वास्तुकला बनाता है क्योंकि सब कुछ अपने स्थान पर होता है, *server.ts* एक बहुत छोटी फ़ाइल है जो केवल अनुरोध हैंडलर जोड़ती है और प्रत्येक फीचर उनके संबंधित फोल्डर में होते हैं जैसे tools/, resources/ या prompts/.

बढ़िया, चलिए अब इसे बनाते हैं।

## अभ्यास: निम्न-स्तर सर्वर बनाना

इस अभ्यास में, हम निम्न करेंगे:

1. एक निम्न-स्तर सर्वर बनाएँ जो टूल्स की सूची और टूल्स कॉल को संभाले।
1. एक वास्तुकला लागू करें जिस पर आप आगे निर्माण कर सकें।
1. सत्यापन जोड़ें ताकि आपके टूल कॉल उचित रूप से सत्यापित हों।

### -1- एक वास्तुकला बनाएँ

हमें सबसे पहले एक ऐसी वास्तुकला बनानी है जो अधिक फ़ीचर्स जोड़ने पर विस्तार करने में मदद करे, यह कुछ इस तरह दिखती है:

**पाइथन**

```text
server.py
--| tools
----| __init__.py
----| add.py
----| schema.py
client.py
```

**टाइपस्क्रिप्ट**

```text
server.ts
--| tools
----| add.ts
----| schema.ts
client.ts
```

अब हमने ऐसी वास्तुकला स्थापित कर ली है जो सुनिश्चित करती है कि हम आसानी से एक tools फ़ोल्डर में नए टूल्स जोड़ सकें। संसाधनों और प्रांप्ट्स के लिए सबडायरेक्टरीज़ भी बना सकते हैं।

### -2- टूल बनाना

अब देखते हैं कि एक टूल बनाना कैसा दिखता है। पहले इसे अपने *tool* उपनिर्देशिका में बनाना होगा, कुछ इस तरह:

**पाइथन**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic मॉडल का उपयोग करके इनपुट को मान्य करें
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic जोड़ें, ताकि हम एक AddInputModel बना सकें और आर्ग्स को मान्य कर सकें

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

यहाँ आप देख सकते हैं कि हम नाम, विवरण और इनपुट स्कीमा Pydantic का उपयोग करके परिभाषित करते हैं और एक हैंडलर होता है जो तब कॉल होगा जब यह टूल कॉल किया जाएगा। अंत में, हम `tool_add` को दर्शाते हैं जो इन सभी गुणों को रखता है।

एक *schema.py* भी है जो हमारे टूल द्वारा उपयोग किए जाने वाले इनपुट स्कीमा को परिभाषित करता है:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

हमें *__init__.py* को भी भरना होता है ताकि tools निर्देशिका को एक मॉड्यूल माना जाए। इसके अतिरिक्त, हमें मॉड्यूल को इस तरह प्रदर्शित करना होगा:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

जैसे-जैसे हम और टूल जोड़ेंगे, हम इस फ़ाइल को बढ़ाते रहेंगे।

**टाइपस्क्रिप्ट**

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

यहाँ हम एक शब्दकोश बनाते हैं जिसमें गुण होते हैं:

- नाम, यह टूल का नाम है।
- rawSchema, यह Zod स्कीमा है, जिसका उपयोग इस टूल को कॉल करने वाले आने वाले अनुरोधों को सत्यापित करने में किया जाएगा।
- inputSchema, यह स्कीमा हैंडलर द्वारा उपयोग की जाएगी।
- callback, इसका उपयोग टूल को कॉल करने के लिए किया जाता है।

एक `Tool` भी है जिसका उपयोग इस शब्दकोश को उस प्रकार में बदलने के लिए किया जाता है जिसे mcp सर्वर हैंडलर स्वीकार कर सकता है, और यह कुछ इस तरह दिखता है:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

और एक *schema.ts* है जहाँ हम प्रत्येक टूल के लिए इनपुट स्कीमा रखते हैं, जो फिलहाल सिर्फ एक स्कीमा के साथ दिखता है, लेकिन नया टूल जोड़ने पर हम इससे अधिक प्रविष्टियाँ जोड़ सकते हैं:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

बढ़िया, अब आगे चलते हैं और हमारे टूल्स की सूची प्रबंधित करें।

### -3- टूल सूची को संभालना

अब, टूल्स की सूची को संभालने के लिए, हमें इसके लिए एक अनुरोध हैंडलर सेट करना होगा। इसे सर्वर फ़ाइल में जोड़ने के लिए:

**पाइथन**

```python
# संक्षिप्तता के लिए कोड छोड़ दिया गया है
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

यहाँ, हम `@server.list_tools` डेकोरेटर जोड़ते हैं और कार्यान्वयन फ़ंक्शन `handle_list_tools` देते हैं। इसमें हमें टूल्स की एक सूची तैयार करनी होती है। ध्यान दें कि प्रत्येक टूल में नाम, विवरण और inputSchema होना चाहिए।   

**टाइपस्क्रिप्ट**

टूल्स की सूची के लिए अनुरोध हैंडलर सेट करने के लिए, हमें सर्वर पर `setRequestHandler` कॉल करना होगा जो उस स्कीमा के अनुरूप हो जिसे हम करना चाहते हैं, इस मामले में `ListToolsRequestSchema`। 

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
// संक्षिप्तता के लिए कोड छोड़ा गया
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // पंजीकृत टूल्स की सूची लौटाएं
  return {
    tools: tools
  };
});
```

बढ़िया, अब हमने टूल सूची के हिस्से को हल कर लिया है, चलिए देखते हैं कि अगला टूल कॉल को कैसे हैंडल किया जाए।

### -4- टूल कॉल को संभालना

टूल को कॉल करने के लिए, हमें एक अन्य अनुरोध हैंडलर सेट करना होगा, जो विशेष रूप से निर्धारित करता हो कि कौन सा फ़ीचर कॉल करना है और किन तर्कों के साथ।

**पाइथन**

चलिए `@server.call_tool` डेकोरेटर का उपयोग करते हैं और इसे `handle_call_tool` फ़ंक्शन के साथ लागू करते हैं। इस फ़ंक्शन के भीतर, हमें टूल का नाम, उसके तर्क पार्स करने होते हैं और यह सुनिश्चित करना होता है कि तर्क उस टूल के लिए मान्य हों। हम तर्कों को या तो इस फ़ंक्शन में या टूल के भीतर बाद में सत्यापित कर सकते हैं।

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

- हमारा टूल नाम पहले से इनपुट पैरामीटर `name` के रूप में मौजूद है, और हमारे तर्क `arguments` शब्दकोश के रूप में हैं।

- टूल को कॉल किया जाता है `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` से। तर्कों का सत्यापन `handler` गुण में होता है जो एक फ़ंक्शन को बिंदु करता है, और अगर यह विफल होता है तो यह अपवाद उठाएगा। 

तो, अब हमारे पास निम्न-स्तर सर्वर का उपयोग करके टूल्स की सूची बनाने और कॉल करने की पूरी समझ है।

पूरा उदाहरण देखने के लिए देखें [full example](./code/README.md)

## असाइनमेंट

आपने जो कोड दिया गया है, उसमें कई टूल्स, संसाधन और प्रांप्ट्स जोड़ें और देखें कि आपको केवल tools निर्देशिका में नई फ़ाइलें जोड़नी होती हैं, कहीं और नहीं। 

*कोई समाधान नहीं दिया गया*

## सारांश

इस अध्याय में, हमने देखा कि निम्न-स्तर सर्वर दृष्टिकोण कैसे काम करता है और यह कैसे हमें एक अच्छी वास्तुकला बनाने में मदद करता है जिस पर हम निर्माण जारी रख सकते हैं। हमने सत्यापन पर भी चर्चा की और दिखाया कि कैसे आप इनपुट सत्यापन के लिए स्कीमा बनाने के लिए सत्यापन पुस्तकालयों के साथ काम कर सकते हैं।

## आगे क्या है

- अगला: [सरल प्रमाणीकरण](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->