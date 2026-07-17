# प्रगत सर्व्हर वापर

MCP SDK मध्ये दोन वेगवेगळ्या प्रकारचे सर्व्हर उलगडले जातात, आपला सामान्य सर्व्हर आणि लो-लेव्हल सर्व्हर. सामान्यतः, तुम्ही त्यावर फिचर्स जोडण्यासाठी नियमित सर्व्हर वापरता. काही बाबतीत मात्र, तुम्हाला लो-लेव्हल सर्व्हरवर अवलंबून राहायचे असते जसे की:

- चांगली आर्किटेक्चर. नियमित सर्व्हर आणि लो-लेव्हल सर्व्हर दोन्ही वापरून स्वच्छ आर्किटेक्चर तयार करणे शक्य आहे, पण असे म्हटले जाऊ शकते की लो-लेव्हल सर्व्हरसह ते थोडे सोपे होते.
- फिचर उपलब्धता. काही प्रगत फिचर्स फक्त लो-लेव्हल सर्व्हरसहच वापरता येतात. तुम्हाला याचा अनुभव पुढील प्रकरणांमध्ये दिसेल, जसे सॅम्पलिंग (जे `2026-07-28` रिलीझ कँडिडेटमध्ये अप्रचलित केले आहे) आणि एलिसिटेशन.

## नियमित सर्व्हर व लो-लेव्हल सर्व्हर

नियमित सर्व्हर वापरून MCP सर्व्हर तयार कसे दिसते ते पाहूया

**पायथन**

```python
mcp = FastMCP("Demo")

# एक अ‍ॅडिशन टूल जोडा
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

मुद्दा असा आहे की तुम्ही स्पष्टपणे प्रत्येक टूल, रिसोर्स किंवा प्रम्प्ट सर्व्हरमध्ये जोडता ज्याची तुम्हाला गरज आहे. यात काहीच चुकीचे नाही.   

### लो-लेव्हल सर्व्हर पद्धत

मात्र, लो-लेव्हल सर्व्हर पद्धत वापरताना तुमच्या विचारसरणी वेगळी असावी लागते. प्रत्येक टूल नोंदणी करण्याऐवजी, तुम्हाला प्रत्येक फिचरप्रकारासाठी (टूल्स, रिसोर्सेस किंवा प्रम्प्ट्स) दोन हँडलर्स तयार करायचे असतात. उदाहरणार्थ, टूल्ससाठी फक्त दोन फंक्शन्स असतात:

- सर्व टूल्सची यादी देणारी एक फंक्शन. ही फंक्शन टूल्सची यादी करण्याचे सर्व प्रयत्न हाताळते.
- कॉल्ससाठी हँडलर. येथेही, फक्त एक फंक्शन टूल कॉल्स हाताळते.

यामुळे कदाचित काम कमी वाटते ना? टूल नोंदवण्याऐवजी, मला फक्त यादी करताना टूल दिसावे आणि कॉल करण्यासाठी येणारा रिक्वेस्ट योग्य टूलला पोहोचावा हे सुनिश्चित करायचे आहे. 

आता कोड कसा दिसतो ते पाहूया:

**पायथन**

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
  // नोंदणीकृत साधनांची यादी परत करा
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

येथे आपल्याकडे फिचर्सची यादी परत करणारी एक फंक्शन आहे. टूल्स यादीतील प्रत्येक एंट्रीमध्ये `name`, `description` आणि `inputSchema` सारखी फील्ड्स आहेत ज्यामुळे परतावा प्रकार पाळला जातो. यामुळे आपली टूल्स आणि फिचर व्याख्या इतरत्र ठेवणे शक्य होते. आता आपण सर्व टूल्स एका tools फोल्डरमध्ये तयार करू शकतो आणि सर्व फिचरसाठीही असेच करू शकतो, त्यामुळे तुमचे प्रोजेक्ट अचानक असे संघटित होऊ शकते:

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

छान, आपली आर्किटेक्चर स्वच्छ दिसायला तयार आहे.

टूल कॉल करण्याबाबत काय, हीच संकल्पना आहे का? एक हँडलर एका टूलला कॉल करण्यासाठी, कोणत्याही टूलला? होय, अगदी, त्यासाठी कोड असा आहे:

**पायथन**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools हा साधनांच्या नावांसह कीजसह शब्दकोश आहे
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
    
    // args: विनंती.params.arguments
    // TODO टूल कॉल करा,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

वरच्या कोडमध्ये पाहिलं तर, आपल्याला कॉल करायचा टूल आणि कोणत्या आर्ग्युमेंट्ससह हे पार्स करायचं असतं, आणि मग टूल कॉल करायचं असतं.

## वैधतेसह पद्धत सुधारणा करणे

आतापर्यंत, तुम्ही पाहिले की टूल्स, रिसोर्सेस आणि प्रम्प्ट जोडण्यासाठी तुमची सर्व नोंदणी या दोन हँडलर्सने किती हलकी करता येते. आणखी काय करायला हवे? आपण काही प्रकारची वैधता (validation) जोडायला हवी जेणेकरून टूल योग्य आर्ग्युमेंट्ससह कॉल होईल याची खात्री होईल. प्रत्येक रनटाइमची यासाठी स्वतःची सोल्यूशन आहे, उदाहरणार्थ पायथनमध्ये Pydantic आणि टाइपस्क्रिप्टमध्ये Zod वापरतात. विचार असा करतो:

- फिचर तयार करण्याची लॉजिक (टूल, रिसोर्स किंवा प्रम्प्ट) त्याच्या समर्पित फोल्डरमध्ये हलवा.
- येणाऱ्या रिक्वेस्टची नियमबद्ध पडताळणी करण्याचा उपाय जोडा, जसे टूल कॉलसाठी.

### फिचर तयार करा

फिचर तयार करण्यासाठी, आपण त्या फिचरसाठी फाइल तयार करावी लागेल आणि त्यात त्या फिचरसाठी आवश्यक अनिवार्य फील्ड्स असाव्यात. टूल्स, रिसोर्सेस आणि प्रम्प्ट्समध्ये फील्ड्स थोडे वेगवेगळे असतात.

**पायथन**

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
        # Pydantic मॉडेल वापरून इनपुट सत्यापित करा
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic जोडा, जेणेकरून आपण AddInputModel तयार करू शकू आणि args सत्यापित करू शकू

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

येथे आपण खालीलप्रमाणे काम करतो:

- Pydantic `AddInputModel` चा वापर करून *schema.py* फाईलमध्ये `a` आणि `b` या फील्डसह स्कीमा तयार करा.
- येणाऱ्या रिक्वेस्टला `AddInputModel` प्रकारात पार्स करण्याचा प्रयत्न करा, जर पॅरामीटर्समध्ये विसंगती असेल तर हे क्रॅश करेल:

   ```python
   # add.py
    try:
        # Pydantic मॉडेल वापरून इनपुटचे प्रमाणीकरण करा
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

तुम्ही हि पार्सिंग लॉजिक टूल कॉलमध्येच ठेऊ शकता किंवा हँडलर फंक्शनमध्ये ठेवू शकता.

**टाइपस्क्रिप्ट**

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

- टूल कॉल हाताळणाऱ्या हँडलरमध्ये, आपण येणाऱ्या रिक्वेस्टला टूलच्या स्कीमामध्ये पार्स करण्याचा प्रयत्न करतो:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    जर ते यशस्वी झाले तर आपण प्रत्यक्ष टूल कॉल करतो:

    ```typescript
    const result = await tool.callback(input);
    ```

तुम्ही पाहू शकता की ही पद्धत छान आर्किटेक्चर तयार करते कारण प्रत्येक गोष्टीचे ठिकाण ठरलेले असते, *server.ts* हे खूपच छोटे फाइल आहे जे फक्त रिक्वेस्ट हँडलर्स जोडते आणि प्रत्येक फिचर त्याच्या स्वतंत्र फोल्डरमध्ये असतो म्हणजे tools/, resources/ किंवा /prompts.

छान, चला पुढे हे तयार करूया.

## सराव: लो-लेव्हल सर्व्हर तयार करणे

या सरावात, आपण पुढील गोष्टी करणार आहोत:

1. टूल्सची यादी देणे आणि टूल कॉल करण्याचा लो-लेव्हल सर्व्हर तयार करा.
1. अशी आर्किटेक्चर अमलात आणा ज्यावर तुम्ही उभारणी करू शकता.
1. टूल कॉल्स योग्य प्रकारे पडताळून पाहण्यासाठी वैधता जोडा.

### -1- आर्किटेक्चर तयार करा

सर्वात पहिले आपण अशी आर्किटेक्चर तयार करू जी अधिक फिचर्स जोडताना आपल्याला स्केल करू देईल, अशी आर्किटेक्चर खाली दिली आहे:

**पायथन**

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

आता आपण अशी आर्किटेक्चर तयार केली आहे जी टूल्स फोल्डरमध्ये सहज नवे टूल्स जोडण्याची हमी देते. रिसोर्सेस आणि प्रम्प्टसाठीही तुम्ही उपनिर्देशिका तयार करू शकता.

### -2- टूल तयार करणे

आता पाहूया टूल तयार करणे कसे असते. प्रथम, ते त्याच्या *tool* उपनिर्देशिकेत तयार करावं लागेल, जसे खाली दिलं आहे:

**पायथन**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic मॉडेल वापरून इनपुट मान्य करा
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic जोडा, त्यामुळे आपण AddInputModel तयार करू शकू आणि args प्रमाणित करू शकू

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

आपण येथे पाहतो की आपण नाव, वर्णन आणि इनपुट स्कीमा Pydantic वापरून कशी व्याख्या करतो आणि एक हँडलर आहे जो या टूलला कॉल करताना चालविला जाईल. शेवटी, `tool_add` ही डिक्शनरी जी या सर्व गुणधर्मांना धरून ठेवते ती जाहीर करतो.

*schema.py* देखील आहे जे आमच्या टूलसाठी वापरल्या जाणाऱ्या इनपुट स्कीमा परिभाषित करण्यासाठी आहे:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

आपल्याला *__init__.py* देखील भरावे लागेल जेणेकरून tools निर्देशिका मॉड्यूल म्हणून वागेल. तसेच, त्यामधील मॉड्यूल्स जाहीर करणे आवश्यक आहे जसे की:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

आपण नवे टूल्स जोडत राहिल्यानुसार या फाइलमध्ये समावेश वाढवत जाऊ शकतो.

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

येथे आपण गुणधर्मांची एक डिक्शनरी तयार करतो:

- name, म्हणजे टूलचे नाव.
- rawSchema, ही Zod स्कीमा आहे, जी येणाऱ्या टूल कॉलसाठीची विनंत्या पडताळण्यासाठी वापरली जाते.
- inputSchema, ही स्कीमा हँडलरद्वारे वापरली जाते.
- callback, टूल कॉल करण्यासाठी वापरली जाते.

तसेच `Tool` आहे जो या डिक्शनरीला एका प्रकारात रुपांतरीत करतो ज्याला mcp सर्व्हर हँडलर स्विकारू शकतो, आणि तो असा दिसतो:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

आणि *schema.ts* आहे जिथे प्रत्येक टूलसाठी इनपुट स्कीमा साठवलेली असते, सध्या फक्त एक स्कीमा आहे पण ज्याप्रमाणे आपण टूल्स वाढवू तशाप्रमाणे नवे एंट्रीज जोडता येतील:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

छान, आता आपले टूल्स यादी कशी हाताळायची ते पाहूया.

### -3- टूल यादी हाताळा

पुढे, आपले टूल्स यादी करण्यासाठी रिक्वेस्ट हँडलर सेट करायचा आहे. तो कोड आपल्या सर्व्हर फाइलमध्ये असावा असा:

**पायथन**

```python
# संक्षेपासाठी कोड वगळलेला आहे
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

येथे ' @server.list_tools ' डेकोरेटर आणि ' handle_list_tools ' फंक्शन देण्यात आले आहे. यामध्ये टूल्सची यादी तयार करावी लागते. प्रत्येक टूलकडे नाव, वर्णन आणि inputSchema असावे हे नोंद घ्या.   

**टाइपस्क्रिप्ट**

टूल्सची यादी करण्यासाठी रिक्वेस्ट हँडलर सेट करण्यासाठी, आपल्याला सर्व्हरवर `setRequestHandler` कॉल करावा लागतो, आणि स्कीमा म्हणून आपल्याला `ListToolsRequestSchema` वापरायचा आहे.

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
// संक्षिप्ततेसाठी कोड काढला आहे
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // नोंदणीकृत साधनांची यादी परत करा
  return {
    tools: tools
  };
});
```

छान, आता आपण टूल्स यादीचा भाग सोडवला आहे, पाहूया आता टूल्स कॉल कसे करता येतील.

### -4- टूल कॉल हाताळा

टूल कॉल करण्यासाठी, आपल्याला दुसरा रिक्वेस्ट हँडलर सेट करावा लागेल, जो एखाद्या फिचरला कॉल करण्याची विनंती आणि त्याचे आर्ग्युमेंट तपासेल.

**पायथन**

आपण `@server.call_tool` डेकोरेटर वापरू आणि `handle_call_tool` फंक्शन तयार करू. या फंक्शनमध्ये, आपल्याला टूल नाव आणि आर्ग्युमेंट्स पार्स करावे लागतील आणि आर्ग्युमेंट्स योग्य आहेत का हे पाहावे लागेल. आपण हे पडताळणी येथे करू शकता किंवा खरा टूल फंक्शनमध्ये करू शकता.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ही एका शब्दकोशाची ज्यात साधनांची नावे की म्हणून आहेत
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # साधनाला कॉल करा
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

यामध्ये काय होते ते पाहा:

- आपला टूल नाव इनपुट पॅरामीटर `name` म्हणून उपलब्ध आहे, आणि आर्ग्युमेंट्स `arguments` डिक्शनरीमध्ये असतात.

- टूल कॉल केला जातो `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` द्वारे. आर्ग्युमेंटची पडताळणी `handler` प्रॉपर्टीमध्ये केली जाते जी फंक्शनकडे निर्देश करते, जर यशस्वी नसले तर अपवाद निर्माण होतो.

आता आपल्या कडे लो-लेव्हल सर्व्हरसह टूल्सची यादी कशी करायची आणि कॉल कशी करायची हे पूर्णपणे समजले.

[पूर्ण उदाहरण](./code/README.md) येथे पाहा

## असाइनमेंट

तुम्हाला दिलेल्या कोडमध्ये अनेक टूल्स, रिसोर्सेस आणि प्रम्प्ट्स जोडून बघा व तुम्हाला कसे दिसते की तुम्हाला फक्त tools निर्देशिकेत फाइल्सच वाढवायच्या आहेत, इतरत्र नाही.

*कोणतेही समाधान दिलेले नाही*

## सारांश

या प्रकरणात, आपण पाहिले की लो-लेव्हल सर्व्हर पद्धत कशी कार्य करते आणि ती आपल्याला कशी छान आर्किटेक्चर तयार करायला मदत करते ज्यावर आपण सतत बांधणी करू शकतो. तसेच आपण वैधतेबाबत चर्चा केली आणि तुम्हाला इनपुट पडताळणीसाठी स्कीमा तयार करण्यासाठी वैधता लायब्ररीसह कसे काम करायचे ते दाखवले.

## पुढे काय

- पुढे: [सोप्या ओळखीचा प्रकार](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->