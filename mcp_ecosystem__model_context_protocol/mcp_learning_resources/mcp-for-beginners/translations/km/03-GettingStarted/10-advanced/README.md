# ការប្រើប្រាស់ម៉ាស៊ីនមេកម្រិតខ្ពស់

មានម៉ាស៊ីនមេពីរប្រភេទផ្សេងគ្នាត្រូវបានបង្ហាញក្នុង MCP SDK ជាម៉ាស៊ីនមេធម្មតារបស់អ្នក និងម៉ាស៊ីនមេកម្រិតទាប។ ជាទូទៅ អ្នកនឹងប្រើម៉ាស៊ីនមេធម្មតាដើម្បីបន្ថែមមុខងារចូលក្នុងវា។ ប៉ុន្តែក្នុងករណីខ្លះ អ្នកចង់ពឹងផ្អែកលើម៉ាស៊ីនមេកម្រិតទាប ដូចជា៖

- សំណង់ល្អជាង។ វាអាចបង្កើតសំណង់ស្អាតដោយមានទាំងម៉ាស៊ីនមេធម្មតា និងម៉ាស៊ីនមេកម្រិតទាប ប៉ុន្តែអាចត្រូវបានអះអាងថាការប្រើម៉ាស៊ីនមេកម្រិតទាបមានភាពងាយស្រួលបន្តិច។
- ការចូលប្រើមុខងារកម្រិតខ្ពស់ខ្លះអាចប្រើបានតែក្នុងម៉ាស៊ីនមេកម្រិតទាបប៉ុណ្ណោះ។ អ្នកនឹងឃើញវានៅក្នុងជំពូកក្រោយពេលយើងបន្ថែមការសរុប និងការទាញយកមតិយោបល់។

## ម៉ាស៊ីនមេធម្មតា vs ម៉ាស៊ីនមេកម្រិតទាប

នេះគឺជារូបមន្តបង្កើត MCP Server ជាមួយម៉ាស៊ីនមេធម្មតា

**Python**

```python
mcp = FastMCP("Demo")

# បន្ថែមឧបករណ៍បូក
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

// បន្ថែមឧបករណ៍បូក
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

គោលបំណងគឺថាអ្នកបញ្ចូលឧបករណ៍ ទិន្នន័យឬសោភ័ណកម្មណាមួយដែលអ្នកចង់ឲ្យម៉ាស៊ីនមេមានយ៉ាងច្បាស់។ មិនមានបញ្ហារបស់រឿងនេះទេ។

### វិធីសាស្រ្តម៉ាស៊ីនមេកម្រិតទាប

ទោះយ៉ាងណា ប្រើវិធីសាស្រ្តម៉ាស៊ីនមេកម្រិតទាប អ្នកត្រូវតែគិតថ្មី។ ជំនួសការចុះបញ្ជីឧបករណ៍មួយៗ អ្នកបង្កើតអ្នកដោះស្រាយពីរនាក់សម្រាប់ប្រភេទមុខងារ (ឧបករណ៍ ទិន្នន័យ ឬសោភ័ណកម្ម)។ ដូចជា សម្រាប់ឧបករណ៍ គេមានមុខងារពីរតែប៉ុណ្ណោះ៖

- ចង្អុលបង្ហាញឧបករណ៍ទាំងអស់។ មុខងារមួយទទួលខុសត្រូវចាំបាច់សម្រាប់ការបញ្ជីឧបករណ៍ទាំងអស់។
- រៀបចំការហៅឧបករណ៍ទាំងអស់។ នៅទីនេះអីចឹង មានមុខងារតែមួយដែលរៀបចំការហៅឧបករណ៍មួយ។

វាដូចជាការងារតិចជាងមែនទេ? ដូច្នេះ ជំនួសការចុះបញ្ជីឧបករណ៍មួយខ្ញុំគ្រាន់តែត្រូវធានាថាឧបករណ៍ត្រូវបានបញ្ជីពេលខ្ញុំបញ្ជីឧបករណ៍ទាំងអស់ ហើយវាត្រូវបានហៅពេលមានសំណើបម្រុងមកហៅឧបករណ៍។

អោយយើងមើលកូដដែលមានទ្រង់ទ្រាយឥឡូវនេះ៖

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
  // បញ្ចេញបញ្ជីឧបករណ៍ដែលបានចុះឈ្មោះ
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

ទីនេះយើងមានមុខងារមួយដែលត្រឡប់បញ្ជីនៃមុខងារ។ ការបញ្ចូលនីមួយៗនៅក្នុងបញ្ជីឧបករណ៍មានវាលដូចជា `name`, `description` និង `inputSchema` ដើម្បីអនុវត្តតាមប្រភេទត្រឡប់។ វាអនុញ្ញាតឲ្យយើងដាក់ឧបករណ៍ និងនិយមន័យមុខងាររបស់យើងនៅកន្លែងផ្សេងទៀត។ ឥឡូវនេះយើងអាចបង្កើតឧបករណ៍ទាំងអស់នៅក្នុងថតឧបករណ៍ ហើយដូចគ្នាសម្រាប់មុខងារទាំងអស់ ដូច្នេះគម្រោងរបស់អ្នកអាចត្រូវបានរៀបចំដូចខាងក្រោម៖

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

វាល្អណាស់ សំណង់របស់យើងអាចធ្វើឲ្យស្អាតនិងអាចរៀបចំបាន។

តើការហៅឧបករណ៍មានដូចគ្នា? មុខងារមួយដោះស្រាយសម្រាប់ហៅឧបករណ៍ណាមួយ? បាទ ត្រឹមត្រូវ ខាងក្រោមគឺជាកូដសម្រាប់ការនេះ៖

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools គឺជាថតសន្ទន្ទដែលមានឈ្មោះឧបករណ៍ជាគន្លឹះ
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
    // TODO ហៅឧបករណ៍,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

ដូចអ្នកឃើញពីកូដខាងលើ យើងត្រូវបកស្រាយឧបករណ៍ដែលត្រូវហៅ និងលម្អិតជាមួយអាគុយម៉ង់ ហើយបន្ទាប់មកយើងត្រូវដំណើរការហៅឧបករណ៍។

## កែលម្អវិធីសាស្រ្តជាមួយការត្រួតពិនិត្យ

រហូតមកដល់ម៉ោងនេះ អ្នកបានដឹងរបៀបសរសេរការចុះបញ្ជីទាំងអស់សម្រាប់បន្ថែមឧបករណ៍ ទិន្នន័យ និងសោភ័ណកម្មដោយផ្លាស់ប្ដូរជាមួយអ្នកដោះស្រាយពីរនាក់សម្រាប់មុខងារតែមួយ។ តើត្រូវផ្សេងទៀតទេ? យើងគួរតែបន្ថែមវិធីសាស្រ្តមួយសម្រាប់ត្រួតពិនិត្យដើម្បីធានាថាឧបករណ៍ត្រូវបានហៅជាមួយអាគុយម៉ង់ត្រឹមត្រូវ។ រាល់ runtime មានដំណោះស្រាយផ្ទាល់ខ្លួនសម្រាប់គោលបំណងនេះ ដូចជា Python ប្រើ Pydantic និង TypeScript ប្រើ Zod។ គំនិតគឺយើងធ្វើដូចខាងក្រោម៖

- ផ្លាស់ប្ដូរពិចារណាសម្រាប់បង្កើតមុខងារ (ឧបករណ៍ ទិន្នន័យ ឬសោភ័ណកម្ម) ទៅផ្ទុកនៅថតមួយផ្ទាល់។
- បញ្ចូលវិធីសាស្រ្តមួយសម្រាប់ត្រួតពិនិត្យសំណើបញ្ចូលមក ដើម្បីឧទាហរណ៍ហៅឧបករណ៍។

### បង្កើតមុខងារ

ដើម្បីបង្កើតមុខងារ អ្នកត្រូវបង្កើតឯកសារដល់មុខងារនោះ ហើយធានាថាវាមានវាលគន្លឹះដែលមុខងារនោះទាមទារពិតប្រាកដ។ វាលផ្សេងគ្នារវាងឧបករណ៍ ទិន្នន័យ និងសោភ័ណកម្ម។

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
        # បញ្ជាក់អំពីការបញ្ចូលដោយប្រើម៉ូដែល Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: បន្ថែម Pydantic ដើម្បីយើងអាចបង្កើត AddInputModel និងបញ្ជាក់ args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ទីនេះអ្នកអាចមើលឃើញយើងធ្វើដូចខាងក្រោម៖

- បង្កើត schema ប្រើ Pydantic ជា `AddInputModel` មានវាល `a` និង `b` នៅក្នុងឯកសារ *schema.py*។
- ព្យាយាមបកស្រាយសំណើបញ្ចូលមកថាជាប្រភេទ `AddInputModel` ប្រសិនបើមិនត្រូវគ្នា នេះនឹងប៉ះពាល់បញ្ហា (crash)៖

   ```python
   # add.py
    try:
        # បញ្ជាក់អាជ្ញាប័ណ្ណការបញ្ចូលដោយប្រើគំរូ Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

អ្នកអាចជ្រើសរើសដាក់វីធីសាស្រ្តបកស្រាយនៅក្នុងការហៅឧបករណ៍ឬនៅក្នុងមុខងារអ្នកដោះស្រាយ។

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

- ក្នុងអ្នកដោះស្រាយដែលដោះស្រាយការហៅឧបករណ៍ទាំងអស់ ឥឡូវនេះយើងព្យាយាមបកស្រាយសំណើបញ្ចូលទៅ schema លេខាាះដោយឧបករណ៍៖

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ប្រសិនបើវាសម្រេច នោះយើងត្រូវបន្តហៅឧបករណ៍ពិតប្រាកដ៖

    ```typescript
    const result = await tool.callback(input);
    ```

ដូចដែលអ្នកឃើញ ផ្លូវជ្រើសរើសនេះបង្កើតសំណង់ល្អ ពោលគឺមានកន្លែងគ្រប់គ្រាន់សម្រាប់មុខងារនីមួយៗ។ *server.ts* គឺជា​ឯកសារ​តូចដែលតែរៀបចំអ្នកដោះស្រាយសំណើ និងមុខងារ​នីមួយៗមាននៅក្នុងថតផ្ទាល់ខ្លួន tools/, resources/ ឬ /prompts ។

ល្អហើយ ទៅបន្តសាកល្បងសម្រួលនេះបន្ទាប់មក។

## បទហាត់៖ បង្កើតម៉ាស៊ីនមេកម្រិតទាប

ក្នុងបទហាត់នេះ យើងនឹងធ្វើការដូចខាងក្រោម៖

1. បង្កើតម៉ាស៊ីនមេកម្រិតទាប ដោះស្រាយបញ្ជីឧបករណ៍ និងការហៅឧបករណ៍។
1. អនុវត្តសំណង់ដែលអ្នកអាចបន្ថែមលើ។
1. បន្ថែមការត្រួតពិនិត្យ ដើម្បីធានាថាការហៅឧបករណ៍របស់អ្នកត្រូវបានត្រួតពិនិត្យត្រឹមត្រូវ។

### -1- បង្កើតសំណង់

របស់ដំបូងដែលយើងត្រូវដោះស្រាយគឺ សំណង់ដែលជួយឲ្យយើងអាចពង្រីកមុខងារ មានរូបរាងដូចខាងក្រោម៖

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

ឥឡូវនេះយើងបានបង្កើតសំណង់ដែលធានាថាអាចបន្ថែមឧបករណ៍ថ្មីៗនៅក្នុងថត tools បានយ៉ាងងាយស្រួល។ អ្នកអាចបន្ថែមថតរងសម្រាប់ resources និង prompts ផងដែរ។

### -2- បង្កើតឧបករណ៍

មកមើលរបៀបបង្កើតឧបករណ៍ក្រោយ។ ជាដំបូង វាត្រូវបានបង្កើតនៅក្នុងថតរង *tool* ដូចខាងក្រោម៖

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # ផ្ទៀងផ្ទាត់ការបញ្ចូលដោយប្រើម៉ូដែល Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: បន្ថែម Pydantic ដូច្នេះយើងអាចបង្កើត AddInputModel និងផ្ទៀងផ្ទាត់ args បាន

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

អ្វីដែលយើងឃើញនៅទីនេះគឺរបៀបកំណត់ឈ្មោះ សេចក្ដីពិពណ៌នា និងស្កីម៉ាអ៊ីនបញ្ចូលដោយប្រើ Pydantic ហើយមានអ្នកដោះស្រាយម្នាក់ដែលនឹងត្រូវហៅពេលឧបករណ៍នេះត្រូវបានហៅ។ ចុងក្រោយ យើងបង្ហាញ `tool_add` ដែលជាដិចសិនណារីដែលផ្ទុកគ្រប់អចិន្ត្រៃយ៍ទាំងនេះ។

មាន *schema.py* ដែលប្រើសម្រាប់កំណត់ schema នៃទិន្នន័យបញ្ចូលសម្រាប់ឧបករណ៍៖

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

យើងត្រូវបញ្ចូល *__init__.py* ផងដើម្បីធានាថាថតឧបករណ៍ត្រូវបានគ្រប់គ្រងជា​ម៉ូឌុល។ បន្តិចទៀត យើងត្រូវបង្ហាញម៉ូឌុលក្នុងវា ដូចខាងក្រោម៖

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

យើងអាចបន្តបន្ថែមឯកសារនេះពេលបន្ថែមឧបករណ៍ថ្មី។

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

នៅទីនេះ យើងបង្កើតឌិចសិនណារីដែលមានអចិន្ត្រៃយ៍៖

- name វាជាឈ្មោះឧបករណ៍។
- rawSchema វាជា schema Zod ដែលត្រូវប្រើសម្រាប់ត្រួតពិនិត្យសំណើបញ្ចូល ហៅឧបករណ៍នេះ។
- inputSchema schema នេះត្រូវប្រើដោយអ្នកដោះស្រាយ។
- callback ដែលប្រើដើម្បីហៅឧបករណ៍។

មាន `Tool` ដែលប្រើបំលែងឌិចសិនណារីនេះទៅប្រភេទដែលអ្នកដោះស្រាយ mcp server អាចទទួលបាន ដូចខាងក្រោម៖

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

មាន *schema.ts* ដែលជាកន្លែងផ្ទុកស្គម៉ាអ៊ីនបញ្ចូលសម្រាប់ឧបករណ៍នីមួយៗ ដូចខាងក្រោម ដែលមាន schema មួយប៉ុណ្ណោះនៅពេលនេះ ប៉ុន្តែពេលបន្ថែមឧបករណ៍ អាចបន្ថែមជួរថ្មីៗបាន៖

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ល្អហើយ ទៅបន្តសម្ងាត់សម្រាប់ការបញ្ជីឧបករណ៍បន្ទាប់។

### -3- ដោះស្រាយការបញ្ជីឧបករណ៍

បន្ទាប់មក ដើម្បីដោះស្រាយការបញ្ជីឧបករណ៍ យើងត្រូវកំណត់អ្នកដោះស្រាយសំណើសម្រាប់វា។ យ៉ាងនេះជាអ្វីដែលត្រូវបន្ថែមទៅឯកសារម៉ាស៊ីនមេ៖

**Python**

```python
# កូដបានលុបចេញសម្រាប់ភាពសង្ខេប
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

ទីនេះយើងបន្ថែម decorator `@server.list_tools` និងមុខងារ `handle_list_tools` ដើម្បីអនុវត្ត។ ក្នុងមុខងារនេះ យើងត្រូវបង្កើតបញ្ជីឧបករណ៍។ សូមចំណាំថារាល់ឧបករណ៍ត្រូវមានវាល name, description និង inputSchema។

**TypeScript**

ដើម្បីកំណត់អ្នកដោះស្រាយសំណើសម្រាប់បញ្ជីឧបករណ៍ អ្នកត្រូវហៅ `setRequestHandler` លើម៉ាស៊ីនមេជាមួយ schema ដែលសមរម្យសម្រាប់អ្វីដែលយើងត្រូវធ្វើ ម្ដងនេះគឺ `ListToolsRequestSchema`។ 

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
// កូដបានលុបចេញសម្រាប់ការតូចតាច
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // ត្រឡប់បញ្ជីឧបករណ៍ដែលបានចុះបញ្ជី
  return {
    tools: tools
  };
});
```

ល្អហើយ ឥឡូវនេះយើងដោះស្រាយផ្នែកបញ្ជីឧបករណ៍រួចហើយ តោះមកមើលរបៀបហៅឧបករណ៍បន្ទាប់។

### -4- ដោះស្រាយការហៅឧបករណ៍

ដើម្បីហៅឧបករណ៍ យើងត្រូវកំណត់អ្នកដោះស្រាយសំណើផ្សេងមួយ ដែលផ្តោតលើសំណើបញ្ចាក់មុខងារណាដែលត្រូវហៅ និងជាមួយអាគុយម៉ង់អ្វី។

**Python**

យើងប្រើ decorator `@server.call_tool` និងអនុវត្តវាដោយមុខងារ `handle_call_tool`។ នៅក្នុងមុខងារនេះ យើងត្រូវបកស្រាយឈ្មោះឧបករណ៍ អាគុយម៉ង់របស់វា ហើយធានាថាអាគុយម៉ង់ទាំងនេះត្រឹមត្រូវសម្រាប់ឧបករណ៍។ អ្នកអាច validate អាគុយម៉ង់នៅក្នុងមុខងារនេះ ឬនៅមុខងារឧបករណ៍ផ្ទាល់។

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools គឺជាថតទីតាំងដែលមានឈ្មោះឧបករណ៍ជាកូនសោ
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ហៅឧបករណ៍
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

អ្វីដែលកើតឡើងមានដូចជា៖

- ឈ្មោះឧបករណ៍មានស្រាប់ជា input parameter `name` ដែលជា argument ពិតប្រាកដនៅក្នុង dictionary `arguments`។

- ឧបករណ៍ត្រូវបានហៅជាមួយ `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`។ ការត្រួតពិនិត្យអាគុយម៉ង់កើតឡើងក្នុង property `handler` ដែលបង្ហាញទៅមុខងារ មិនល្អនោះវានឹងបោះបង់ការបញ្ចូល។

ទាំងនេះ ឥឡូវនេះយើងបានយល់ដឹងពេញលេញអំពីការបញ្ជី និងការហៅឧបករណ៍ដោយប្រើម៉ាស៊ីនមេកម្រិតទាប។

មើល [ឧទាហរណ៍ពេញលេញ](./code/README.md) នៅទីនេះ

## ការចាត់ចែងចំណេះដឹកនាំ

ពង្រីកកូដដែលអ្នកទទួលបានជាមួយឧបករណ៍ ចំណុចប្រយោជន៍ និងសោភ័ណកម្មជាច្រើន ហើយពិចារណាថាអ្នកទាមទារជាច្រើនត្រឹមតែបន្ថែមឯកសារនៅក្នុងថតឧបករណ៍តែប៉ុណ្ណោះ ហើយមិនចាំបាច់នៅកន្លែងផ្សេងទៀត។

*គ្មានដំណោះស្រាយផ្តល់ជូន*

## សង្ខេប

នៅក្នុងជំពូកនេះ យើងបានឃើញរបៀបដែលវិធីសាស្រ្តម៉ាស៊ីនមេកម្រិតទាបដំណើរការ និងរបៀបដែលវាជួយបង្កើតសំណង់ល្អដែលអាចបន្តកសាងបាន។ យើងបានពិភាក្សាអំពីការត្រួតពិនិត្យ និងអ្នកត្រូវបានបង្ហាញរបៀបធ្វើការជាមួយបណ្ណាល័យត្រួតពិនិត្យដើម្បីបង្កើត schema សម្រាប់ការត្រួតពិនិត្យទិន្នន័យបញ្ចូល។

## តើបន្ទាប់មកជាអ្វី

- បន្ទាប់៖ [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:  
ឯកសារនេះត្រូវបានបកប្រែដោយប្រើសេវាបកប្រែ AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ បើទោះបីយើងខិតខំរក្សាការបកប្រែឲ្យបានត្រឹមត្រូវ ក៏សូមយល់ថាការបកប្រែដោយស្វ័យប្រវត្តិអាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមក្នុងភាសាតិជាដើមគួរត្រូវបានពិចារណาว่า ជា​ឯកសារដែលមានអំណាចផ្លូវការជាចម្បង។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមផ្តល់អាទិភាពការបកប្រែដោយមនុស្សជំនាញ។ យើងមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំនិងការបកប្រែខុសពីការប្រើប្រាស់ការបកប្រែនេះឡើយ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->