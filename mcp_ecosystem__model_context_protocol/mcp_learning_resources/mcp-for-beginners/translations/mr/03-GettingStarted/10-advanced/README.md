# प्रगत सर्व्हर वापर

MCP SDK मध्ये दोन वेगवेगळ्या प्रकारचे सर्व्हर खुले आहेत, तुमचा सामान्य सर्व्हर आणि लो-लेव्हल सर्व्हर. सामान्यतः, तुम्ही त्यात वैशिष्ट्ये जोडण्यासाठी सामान्य सर्व्हर वापराल. काही प्रसंगी, तुम्हाला लो-लेव्हल सर्व्हरवर अवलंबून राहायचे असते जसे:

- चांगली आर्किटेक्चर. सामान्य सर्व्हर आणि लो-लेव्हल सर्व्हर दोन्हींसह स्वच्छ आर्किटेक्चर तयार करणे शक्य आहे परंतु असे म्हणता येईल की लो-लेव्हल सर्व्हरमध्ये ते थोडे सोपे आहे.
- वैशिष्ट्य उपलब्धता. काही प्रगत वैशिष्ट्ये फक्त लो-लेव्हल सर्व्हरसह वापरली जाऊ शकतात. नंतरचे फक्तन किंवा elicitation जोडताना तुम्हाला हे दिसेल.

## सामान्य सर्व्हर विरुद्ध लो-लेव्हल सर्व्हर

सामान्य सर्व्हरसह MCP Server कसा तयार होतो ते येथे आहे

**Python**

```python
mcp = FastMCP("Demo")

# बेडगी जोडण्यासाठी साधन जोडा
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

// एक बेरीज साधन जोडा
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

म्हणजे तुम्ही स्पष्टपणे प्रत्येक साधन, स्त्रोत किंवा प्रॉम्प्ट जोडा ज्याची तुम्हाला सर्व्हरमध्ये गरज आहे. यात काही वाईट नाही.  

### लो-लेव्हल सर्व्हर पद्धत

परंतु, जेव्हा तुम्ही लो-लेव्हल सर्व्हर पद्धत वापरता तेव्हा तुम्हाला वेगळ्या प्रकारे विचार करावा लागतो. प्रत्येक साधन नोंदवण्याऐवजी, तुम्ही प्रत्येकी वैशिष्ट्य प्रकारासाठी (साधने, स्रोत किंवा प्रॉम्प्ट्स) दोन हँडलर तयार करता. उदाहरणार्थ, साधनांसाठी फक्त दोन फंक्शन्स असतील:

- सर्व साधनांची यादी करणे. एक फंक्शन सर्व साधने यादी करण्याच्या प्रयत्नांसाठी जबाबदार असेल.
- सर्व साधनांना कॉल हँडल करणे. येथे देखील, एकच फंक्शन साधन कॉलसाठी जबाबदार आहे.

हे किंचित कमी काम वाटते होय का?तर साधन नोंदवण्याऐवजी, मला फक्त पाहिजे की जेव्हा मी सर्व साधने यादी करतो तेव्हा साधनांची यादी असावी आणि जेव्हा कॉल करण्यासाठी विनंती येते तेव्हा ते कॉल केले जावे.

आता पाहूया कोड कसा दिसतो:

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
  // नोंदणीकृत साधनांची यादी परत करा
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

इथे आमच्याकडे आता वैशिष्ट्यांची यादी परत करणारे एक फंक्शन आहे. साधने यादीतील प्रत्येक नोंदीला आता `name`, `description` आणि `inputSchema` सारखे फील्ड्स आहेत जे परताव्याच्या प्रकाराचे पालन करतात. यामुळे आम्हाला आमची साधने आणि वैशिष्ट्य परिभाषा दुसर्‍या ठिकाणी ठेवता येतात. आता आम्ही सर्व साधने `tools` फोल्डरमध्ये तयार करू शकतो आणि तुम्हाला सर्व वैशिष्ट्यांसाठी देखील तसेच प्रोजेक्ट अशा प्रकारे व्यवस्थित करता येऊ शकते:

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

छान आहे, आमची आर्किटेक्चर खूप स्वच्छ दिसू शकते.

साधने कॉल करण्याबाबत काय, तेच कल्पना आहे का, एका हँडलरद्वारे कोणतीही साधन कॉल करणे? हो, अगदीच, ह्याचा कोड असा आहे:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools हा एक शब्दकोश आहे ज्यात टूल नावे की म्हणून आहेत
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
    // TODO टूल कॉल करा,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

वरचा कोड पाहिल्यास, आपण कोणते साधन कॉल करायचे आहे आणि कोणत्या आर्ग्युमेंटसह आणि नंतर त्या साधनाला कॉल करण्यास कसे पुढे जावे हे पार्स करावे लागते.

## व्हॅलिडेशनसह पद्धत सुधारित करणे

आत्तापर्यंत, तुम्हाला कसे सर्व नोंदी (tools, resources, prompts) या दोन हँडलरसह बदली करता येतात ते पाहिले. आणखी काय करायचे आहे? साधनांवर योग्य आर्ग्युमेंटसह कॉल होत आहे याची खात्री करण्यासाठी कोणत्यातरी प्रकारचे व्हॅलिडेशन जोडले पाहिजे. प्रत्येक रनटाइम यासाठी त्यांचा स्वतःचा उपाय आहे, उदा. Python मध्ये Pydantic वापरतो आणि TypeScript मध्ये Zod वापरतो. कल्पना अशी आहे की आपण खालील करतो:

- वैशिष्ट्य (साधन, स्रोत किंवा प्रॉम्प्ट) तयार करण्याची लॉजिक त्याच्या समर्पित फोल्डरमध्ये हलवणे.
- येणारी विनंती जसे की साधन कॉल करण्यासाठी तुम्हाला आलेली विनंती व्हॅलिडेट करण्याचा मार्ग जोडणे.

### वैशिष्ट्य तयार करा

वैशिष्ट्य तयार करण्यासाठी, त्या वैशिष्ट्यासाठी एक फाइल तयार करावी लागेल आणि त्यात त्यांच्या आवश्यक फील्ड्स असाव्यात, जे साधने, स्रोत आणि प्रॉम्प्टमध्ये थोडे वेगळे असतात.

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
        # Pydantic मॉडेल वापरून इनपुटची प्रमाणीकरण करा
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic जोडा, जेणेकरून आपण AddInputModel तयार करू शकू आणि args चे प्रमाणीकरण करू शकू

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

येथे आपण खालील प्रमाणे करतो:

- Pydantic `AddInputModel` वापरून स्कीमा तयार करतो ज्यात `a` आणि `b` फील्ड्स असतात फाईल *schema.py* मध्ये.
- येणारी विनंती `AddInputModel` प्रकारात पार्स करण्याचा प्रयत्न करतो, जर पॅरामीटर्समध्ये विसंगती असेल तर हा क्रॅश होईल:

   ```python
   # add.py
    try:
        # Pydantic मॉडेल वापरून इनपुटची पडताळणी करा
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

तुम्ही हे पार्सिंग लॉजिक साधन कॉल फंक्शनमध्ये ठेवू शकता किंवा हँडलर फंक्शनमध्ये ठेवू शकता.

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

- सर्व साधन कॉल्स हाताळणाऱ्या हँडलरमध्ये, येणारी विनंती साधनाच्या स्कीमामध्ये पार्स करण्याचा प्रयत्न करतो:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    जर ते यशस्वी झाले तर प्रत्यक्ष साधन कॉल करता येते:

    ```typescript
    const result = await tool.callback(input);
    ```

जसे दिसते, ही पद्धत उत्कृष्ट आर्किटेक्चर तयार करते कारण प्रत्येक गोष्टीचा त्याचा स्वतःचा ठिकाण आहे, *server.ts* एक लहान फाइल आहे जी फक्त रिक्वेस्ट हँडलर्स कनेक्ट करते आणि प्रत्येक वैशिष्ट्य आपल्या संबंधित फोल्डरमध्ये आहे म्हणजे tools/, resources/ किंवा /prompts.

छान, यानंतर आपण हे तयार करूया.

## सराव: लो-लेव्हल सर्व्हर तयार करणे

या सरावात, आपण खालील करणार आहोत:

1. साधने यादी करण्यासाठी आणि साधने कॉल करण्यासाठी लो-लेव्हल सर्व्हर तयार करणे.
1. अशी आर्किटेक्चर राबविणे ज्यावर तुम्ही तयार करू शकता.
1. व्हॅलिडेशन जोडणे जेणेकरून तुमचे साधन कॉल योग्य प्रकारे सत्यापित होतील.

### -1- आर्किटेक्चर तयार करा

सर्वप्रथम आपल्याला एक आर्किटेक्चर तयार करायची आहे जी आम्हाला अधिक वैशिष्ट्ये जोडताना स्केल करण्यात मदत करेल, हे असे दिसते:

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

आता आपण अशी आर्किटेक्चर तयार केली आहे जी साधने फोल्डरमध्ये नवे साधने सहजपणे जोडू देते. स्रोत आणि प्रॉम्प्टसाठी सबडिरेक्टरीज तयार करण्यासाठी तुमची मर्जी आहे.

### -2- साधन तयार करणे

पुढचं पाहूया साधन तयार कसं करायचं. प्रथम, ते त्याच्या *tool* सबडिरेक्टरीमध्ये तयार करावं असं पाहिजे:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic मॉडेल वापरून इनपुट सत्यापित करा
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic जोडा, जेणेकरून आपण AddInputModel तयार करू आणि args सत्यापित करू शकू

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

येथे आपण पाहतो की कसे नाव, वर्णन आणि इनपुट स्कीमा Pydantic वापरून परिभाषित केले आहे आणि एक हँडलर जे कॉल केल्यावर कार्यान्वित होईल. अखेर, `tool_add` नावाने एक डिक्शनरी उघडली आहे जी हे सर्व गुणधर्म राखते.

*schema.py* देखील आहे ज्यात इनपुट स्कीमा परिभाषित केली आहे जी आपले साधन वापरते:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

आपल्याला *__init__.py* देखील populate करावी लागेल जेणेकरून tools डिरेक्टरी मॉड्यूल म्हणून वागेल. शिवाय, त्यातील मोड्यूलस देखील पुढीलप्रमाणे एक्सपोज करावे लागतात:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

जसं आपण अधिक साधने जोडतो तसं आपण या फाइलमध्ये अधिक नोंदी जोडू शकतो.

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

इथे आपण गुणधर्मांची डिक्शनरी तयार करतो:

- name, साधनाचे नाव.
- rawSchema, Zod स्कीमा जी येणाऱ्या विनंत्यांना सत्यापित करण्यासाठी वापरली जाईल.
- inputSchema, ही स्कीमा हँडलरद्वारे वापरली जाईल.
- callback, साधन कॉल करण्यासाठी वापरली जाईल.

`Tool` नावाचाही प्रकार आहे जो या डिक्शनरीला अशा प्रकारात रूपांतरित करतो जे mcp सर्व्हर हँडलर स्वीकारू शकतो आणि त्याचा प्रकार असा दिसतो:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

आणि *schema.ts* आहे जिथे आपण प्रत्येक साधनासाठी इनपुट स्कीमा साठवतो, सध्या फक्त एक स्कीमा आहे परंतु साधने वाढविल्यास आपण अधिक नोंदी जोडू शकतो:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

छान, आता साधने यादी करणं कसं हाताळायचं ते पाहूया.

### -3- साधनांची यादी हाताळा

आता, साधने यादी करण्यासाठी, आम्हाला त्यासाठी विनंती हँडलर तयार करायचा आहे. हे आपल्याला सर्व्हर फाइलमध्ये जोडायचे आहे:

**Python**

```python
# संक्षिप्ततेसाठी कोड वगळलेला आहे
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

इथे आपण `@server.list_tools` डेकोरेटर आणि ते कार्यान्वित करणारे `handle_list_tools` फंक्शन जोडतो. या फंक्शनमध्ये एक साधने यादी तयार करावी लागते. प्रत्येक साधनासाठी नाव, वर्णन आणि inputSchema आवश्यक आहे हे लक्षात घ्या.   

**TypeScript**

साधने यादीसाठी विनंती हँडलर सेट करण्यासाठी, आपल्या सर्व्हरवर `setRequestHandler` कॉल करा आणि त्या योजनेसाठी योग्य स्कीमा देणे आवश्यक आहे, या वेळी `ListToolsRequestSchema` वापरा.

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
// संक्षिप्ततेसाठी कोड वगळले
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // नोंदणीकृत साधनांची यादी परत करा
  return {
    tools: tools
  };
});
```

छान, आता आपण साधने यादी करणं सोडवलं आहे, पुढचं पाहूया साधने कॉल करणं कसं करायचं.

### -4- साधन कॉल हाताळा

साधन कॉल करण्यासाठी, आणखी एक विनंती हँडलर सेट करणे आवश्यक आहे जो कोणते वैशिष्ट्य कॉल करायचे आहे आणि कोणत्या आर्ग्युमेंटसह हे सांगणाऱ्या विनंतीवर लक्ष केंद्रित करेल.

**Python**

`@server.call_tool` डेकोरेटर वापरूया आणि `handle_call_tool` नावाचे फंक्शन तयार करूया. त्या फंक्शनमध्ये आपण साधनाचे नाव, त्याचे आर्ग्युमेंट पार्स करावे लागेल आणि ते आर्ग्युमेंट त्या साधनासाठी योग्य आहेत का हे तपासावे लागेल. आर्ग्युमेंट्सची पडताळणी आपण या फंक्शनमध्ये किंवा प्रत्यक्ष साधनात करू शकतो.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ही टूल नावांसह कीसह एक शब्दकोश आहे
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # टूल वापरा
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

हे काय होते:

- आपले साधन नाव आधीच `name` इनपुट पॅरामीटर म्हणून आहे आणि `arguments` डिक्शनरीमधील आर्ग्युमेंट्स देखील आहेत.

- साधन `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` वापरून कॉल होते. आर्ग्युमेंट्सची व्हॅलिडेशन `handler` प्रॉपर्टीमध्ये होते, जी एका फंक्शनकडे निर्देश करते, जर ती अयशस्वी झाली तर त्यातून अपवाद उभा राहतो.

आशा आहे आता आपल्याला लो-लेव्हल सर्व्हर वापरून साधने यादी आणि कॉल कसे करायचे याची संपूर्ण समज झाली आहे.

[पूर्ण उदाहरण](./code/README.md) येथे पहा

## असाइनमेंट

तुम्हाला दिलेल्या कोडमध्ये अनेक साधने, स्रोत आणि प्रॉम्प्ट जोडा आणि लक्षात ठेवा की तुम्हाला फक्त tools डायरेक्टरीत फाईल्स जोडायच्या आहेत आणि इतर कुठेही नाही.

*कोणताही सोल्यूशन नाही*

## सारांश

या अध्यायात, आपण पाहिलं की लो-लेव्हल सर्व्हर पद्धत कशी काम करते आणि ती आपल्याला एक छान आर्किटेक्चर कसे तयार करण्यात मदत करते ज्यावर आपण वाढ करू शकतो. आपण व्हॅलिडेशनबद्दलही चर्चा केली आणि कसे इनपुट व्हॅलिडेशनसाठी स्कीमा तयार करायच्या ते स्पष्ट करण्यात आले.

## पुढचं काय

- पुढे: [सोपं प्रमाणीकरण](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
हा दस्तऐवज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) या माध्यमातून अनुवादित करण्यात आला आहे. आम्ही अचूकतेसाठी प्रयत्नशील असलं तरी, कृपया लक्षात ठेवा की स्वयंचलित अनुवादांमध्ये चुका किंवा अचूकतेच्या त्रुटी असू शकतात. मूळ दस्तऐवज त्याच्या स्थानिक भाषेत अधिकृत स्रोत मानला जावा. महत्त्वपूर्ण माहितीसाठी व्यावसायिक मानवी अनुवाद करण्याची शिफारस केली जाते. या अनुवादाच्या वापरातून होणाऱ्या कोणत्याही गैरसमजुती किंवा चुकीच्या अर्थलाभासाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->