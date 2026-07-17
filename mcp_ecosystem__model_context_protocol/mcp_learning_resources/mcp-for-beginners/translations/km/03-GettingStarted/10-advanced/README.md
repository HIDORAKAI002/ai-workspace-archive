# ការប្រើប្រាស់ម៉ាស៊ីនបម្រើកម្រិតខ្ពស់

មានម៉ាស៊ីនបម្រើពីរប្រភេទផ្សេងគ្នាត្រូវបានបង្ហាញក្នុង MCP SDK ជា ម៉ាស៊ីនបម្រើធម្មតារបស់អ្នក និង ម៉ាស៊ីនបម្រើកម្រិតទាប។ ជាទូទៅ អ្នកនឹងប្រើម៉ាស៊ីនបម្រើធម្មតា ដើម្បីបន្ថែមមុខងារ។ ប៉ុន្តែក្នុងករណីខ្លះ អ្នកចង់ពឹងផ្អែកលើម៉ាស៊ីនបម្រើកម្រិតទាប ដូចជា៖

- ស្ថាបត្យកម្មល្អប្រសើរ។ វាអាចបង្កើតស្ថាបត្យកម្មស្អាតជាមួយម៉ាស៊ីនបម្រើធម្មតា និងម៉ាស៊ីនបម្រើកម្រិតទាប ប៉ុន្តិត្រូវអាចអះអាងថាវាងាយស្រួលខ្លះជាមួយម៉ាស៊ីនបម្រើកម្រិតទាប។
- ការចូលដំណើរការមុខងារ។ មុខងារខ្ពស់ខ្លះអាចប្រើបានតែជាមួយម៉ាស៊ីនបម្រើកម្រិតទាប។ អ្នកនឹងឃើញវានៅក្នុងជំពូកក្រោយ ខណៈពេលយើងបន្ថែមសេងយ៉ាង (sampling) (ដែលបានដាច់នៅ `2026-07-28` កំណែបញ្ចប់) និងការបណ្ដេញ។

## ម៉ាស៊ីនបម្រើធម្មតា ប្រៀបធៀបជាមួយម៉ាស៊ីនបម្រើកម្រិតទាប

នេះគឺជារបៀបបង្កើតម៉ាស៊ីនបម្រើ MCP ជាមួយម៉ាស៊ីនបម្រើធម្មតា

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

គំនិតគឺអ្នកបញ្ចូលឧបករណ៍ ធនធាន ឬបណ្ដាញផ្សព្វផ្សាយដែលអ្នកចង់ឲ្យម៉ាស៊ីនបម្រើមានដោយច្បាស់លាស់។ មិនមានអ្វីខុសទេ។  

### វិធីសាស្រ្តម៉ាស៊ីនបម្រើកម្រិតទាប

ទោះយ៉ាងណា ពេលអ្នកប្រើវិធីសាស្រ្តម៉ាស៊ីនបម្រើកម្រិតទាប អ្នកត្រូវគិតខុសពីមុន។ មិនចុះបញ្ជីឧបករណ៍នីមួយៗទេ តែអ្នកបង្កើតអ្នកដំណើរការពីរនាយសម្រាប់ប្រភេទមុខងារ (ឧបករណ៍ ធនធាន ឬបណ្ដាញផ្សព្វផ្សាយ)។ ដូច្នេះឧទាហរណ៍ ឧបករណ៍មានត្រឹមពីរមុខងារដូចជា៖

- បញ្ចីឧបករណ៍ទាំងអស់។ មុខងារមួយនឹងទទួលខុសត្រូវសម្រាប់រាល់ការព្យាយាមបញ្ចីឧបករណ៍ទាំងអស់។
- ដំណើរការហៅឧបករណ៍ទាំងអស់។ នៅទីនេះក៏មានមុខងារតែមួយ ដែលទទួលខុសត្រូវហៅឧបករណ៍។

វាសម្លេងមើលទៅជា ការងារថយក្រោយមែនទេ? ដូច្នេះជំនួសការចុះបញ្ជីឧបករណ៍ ខ្ញុំគ្រាន់តែត្រូវធានាថាឧបករណ៍ត្រូវបានបញ្ចូលបញ្ជីនៅពេលខ្ញុំបញ្ជីឧបករណ៍ទាំងអស់ ហើយវាត្រូវបានហៅនៅពេលមានសំណើមកហៅឧបករណ៍។

មកមើលរបៀបកូដឥឡូវនេះ៖

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
  // ត្រឡប់បញ្ជីឧបករណ៍ដែលបានចុះបញ្ជី
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

នៅទីនេះ ឥឡូវនេះយើងមានមុខងារមួយដែលរាយត្រឡប់បញ្ជីមុខងារ។ អនុស្សរណៈក្នុងបញ្ជីឧបករណ៍មានវាលដូចជា `name`, `description` និង `inputSchema` ដើម្បីបំពេញតម្រូវការប្រភេទត្រឡប់។ នេះអនុញ្ញាតឲ្យយើងដាក់ឧបករណ៍និងការបញ្ជាក់មុខងាររបស់យើងនៅកន្លែងផ្សេងទៀត។ យើងអាចបង្កើតឧបករណ៍ទាំងអស់ក្នុងថតtools ហើយដូចគ្នាសម្រាប់មុខងារទាំងអស់ ដូច្នេះគម្រោងរបស់អ្នកអាចត្រូវបានរៀបចំដូចខាងក្រោម៖

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

វាល្អណាស់ ស្ថាបត្យកម្មរបស់យើងអាចធ្វើឲ្យស្អាតបានយ៉ាងច្បាស់។

តើការហៅឧបករណ៍ វាជាគំនិតដូចគ្នាឫទេ មុខងារពីរមុខសម្រាប់ហៅឧបករណ៍ មិនថាជាឧបករណ៍ណា? មែនហើយ តើនេះជាកូដសម្រាប់វា៖

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools គឺជាថតសន្ទស្សន៍ដែលមានឈ្មោះឧបករណ៍ជាពាក្យគន្លឹះ
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

ដូចដែលអ្នកមើលឃើញពីកូដខាងលើ យើងត្រូវតែលែងដោះស្រាយឧបករណ៍ដែលត្រូវហៅ ហើយជាមួយអា៊បទាំងណា ក៏បន្ទាប់មកយើងត្រូវបន្តហៅឧបករណ៍។

## កែលម្អវិធីសាស្រ្តជាមួយការផ្ទៀងផ្ទាត់

រហូតមកដល់ពេលនេះ អ្នកបានឃើញវិធីរាល់ការចុះបញ្ជីរបស់អ្នកដើម្បីបន្ថែមឧបករណ៍ ធនធាន និងបណ្ដាញផ្សព្វផ្សាយអាចត្រូវបានប្ដូរជាមុខងារពីរនៅក្នុងមុខងារ មួយនាក់មួយប្រភេទ។ តើមានអ្វីអាចបន្ថែមទៀត? ពិតណាស់ យើងគួរបន្ថែមមុខងារផ្ទៀងផ្ទាត់ ទើបធានាថាឧបករណ៍ត្រូវបានហៅជាមួយអាគុយម៉ង់ត្រឹមត្រូវ។ រាល់ runtime មានដំណោះស្រាយរបស់ខ្លួន សម្រាប់ Python ប្រើ Pydantic និង TypeScript ប្រើ Zod។ គំនិតគឺយើងធ្វើដូចខាងក្រោម៖

- ផ្លាស់ប្តូរឡូជិកសម្រាប់បង្កើតមុខងារ (ឧបករណ៍ ធនធាន ឬបណ្ដាញផ្សព្វផ្សាយ) ទៅថតចាស្តាលរបស់វា។
- បន្ថែមវិធីផ្ទៀងផ្ទាត់សំណើមកដើម្បីឲ្យហៅឧបករណ៍។

### បង្កើតមុខងារ

ដើម្បីបង្កើតមុខងារ យើងត្រូវបង្កើតឯកសារសម្រាប់មុខងារនោះ ហើយធានាថាវាមានវាលដែលត្រូវការសម្រាប់មុខងារនោះ។ វាលដែលខុសគ្នា បន្តិចរវាងឧបករណ៍ ធនធាន និងបណ្ដាញផ្សព្វផ្សាយ។

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

នៅទីនេះ អ្នកអាចឃើញពីរបៀបយើងធ្វើដូចខាងក្រោម៖

- បង្កើតស្គីម៉ាសំរាប់ប្រើប្រាស់ Pydantic `AddInputModel` ដែលមានវាល `a` និង `b` នៅក្នុងឯកសារ *schema.py*។
- ព្យាយាមដោះស្រាយសំណើមកចូលទៅជាប្រភេទ `AddInputModel` ប្រសិនបើអាគុយម៉ង់ខុស វានឹងបង្ហាញកំហុស។

   ```python
   # add.py
    try:
        # ផ្ទៀងផ្ទាត់ការបញ្ចូលដោយប្រើម៉ូដែល Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

អ្នកអាចជ្រើសរើសដាក់លូជិកការដោះស្រាយនេះនៅក្នុងហៅឧបករណ៍ឬនៅក្នុងមុខងារក្នុងអ្នកដំណើរការ។

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

- នៅក្នុងអ្នកដំណើរការដែលដោះស្រាយហៅឧបករណ៍ទាំងអស់ យើងព្យាយាមដោះស្រាយសំណើមកចូលទៅក្នុងស្គីម៉ាកំណត់របស់ឧបករណ៍៖

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ប្រសិនបើវាស្ថិតនៅក្នុងលំដាប់ យើងបន្តហៅឧបករណ៍ពិតប្រាកដ៖

    ```typescript
    const result = await tool.callback(input);
    ```

ដូចដែលអ្នកឃើញ វិធីសាស្រ្តនេះបង្កើតស្ថាបត្យកម្មល្អព្រោះគ្រប់យ៉ាងមានទីតាំង រួមគ្នានៅក្នុង *server.ts* គឺជាឯកសារមួយស្រាលដែលភ្ជាប់អ្នកដំណើរការសំណើ និងមុខងារ​នីមួយៗមាននៅក្នុងថត របស់ខ្លួន គឺ tools/, resources/ ឬ /prompts។

ល្អណាស់ មកសាកល្បងកសាងនេះបន្ត។

## សម្ងាត់: បង្កើតម៉ាស៊ីនបម្រើកម្រិតទាប

នៅក្នុងសម្ងាត់នេះ យើងនឹងធ្វើដូចខាងក្រោម៖

1. បង្កើតម៉ាស៊ីនបម្រើកម្រិតទាប ដើម្បីដោះស្រាយបញ្ចីឧបករណ៍ និងហៅឧបករណ៍។
1. អនុវត្តស្ថាបត្យកម្មមួយដែលអ្នកអាចតវ៉ាទៅ។
1. បន្ថែមការផ្ទៀងផ្ទាត់ ដើម្បីធានាថាការហៅឧបករណ៍បានផ្ទៀងផ្ទាត់ត្រឹមត្រូវ។

### -1- បង្កើតស្ថាបត្យកម្ម

អ្វីដែលយើងត្រូវដោះស្រាយជាមុនគឺ ស្ថាបត្យកម្មដែលជួយឲ្យយើងអាចអភិវឌ្ឍន៍បានលឿននៅពេលបន្ថែមមុខងារច្រើនឡើង មើលលើការរៀបចំដូចខាងក្រោម៖

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

ឥឡូវនេះយើងបានបង្កើតស្ថាបត្យកម្មដែលធានាថាអ្នកអាចបន្ថែមឧបករណ៍ថ្មីៗក្នុងថត tools បានយ៉ាងងាយស្រួល។ អ្នកអាចបន្ថែមថតរងសម្រាប់ resources និង prompts បានផងដែរ។

### -2- បង្កើតឧបករណ៍

មកមើលរបៀបបង្កើតឧបករណ៍បន្ទាប់។ ជាចំណុចដំបូង វាត្រូវបានបង្កើតក្នុងថតរង *tool* ដូច្នេះ៖

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # ផ្ទៀងផ្ទាត់ទិន្នន័យបញ្ចូលដោយប្រើម៉ូដែល Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: បន្ថែម Pydantic ដើម្បីឲ្យយើងអាចបង្កើត AddInputModel និងផ្ទៀងផ្ទាត់ args បាន

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

អ្វីដែលយើងឃើញនៅទីនេះ គឺរបៀបដែលយើងកំណត់ឈ្មោះ ការពណ៌នា និងស្គីម៉ាផ្នែកបញ្ចូលប្រើ Pydantic និងអ្នកដំណើរការមួយដែលនឹងត្រូវហៅនៅពេលឧបករណ៍នេះត្រូវបានហៅ។ ចុងក្រោយ យើងបង្ហាញ `tool_add` ដែលជាថតតារាងផ្ទុកអចិន្ត្រៃយ៍ទាំងនេះ។

មានក៏ *schema.py* ដែលប្រើកំណត់ស្គីម៉ាផ្នែកបញ្ចូលរបស់ឧបករណ៍របស់យើង៖

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

យើងត្រូវបញ្ចូល *__init__.py* ដើម្បីធានាថាតំណាងថតtools ជាម៉ូឌុល។ បន្ថែមពីនេះ យើងត្រូវបង្ហាញម៉ូឌុលនៅក្នុងវាដូចខាងក្រោម៖

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

យើងអាចបន្ថែមបន្ថែមទៅឯកសារនេះនៅពេលបន្ថែមឧបករណ៍ថ្មីៗ។

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

នៅទីនេះយើងបង្កើតថតតារាងជាមួយអចិន្ត្រៃយ៍៖

- name, នេះជាឈ្មោះឧបករណ៍។
- rawSchema, នេះជាស្គីម៉ា Zod ដែលប្រើផ្ទៀងផ្ទាត់សំណើមកចូលសម្រាប់ហៅឧបករណ៍។
- inputSchema, ស្គីម៉ានេះត្រូវបានអ្នកដំណើរការប្រើ។
- callback, ប្រើសម្រាប់ហៅឧបករណ៍។

មាន `Tool` ដែលប្រើបម្លែងថតតារាងនេះទៅជាប្រភេទដែលម៉ាស៊ីនបម្រើ mcp អាចទទួលបាន និងវាមើលទៅដូចនេះ៖

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

មានក៏ *schema.ts* ដែលយើងរក្សាស្គីម៉ាផ្នែកបញ្ចូលសម្រាប់ឧបករណ៍នីមួយៗ ដែលមើលទៅដូចនេះ មានតែស្គីម៉ាមួយប៉ុណ្ណោះ ប៉ុន្តែពេលបន្ថែមឧបករណ៍ យើងអាចបន្ថែមចំណុចផ្សេងទៀត៖

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ល្អណាស់ មកបន្តដោះស្រាយបញ្ចីឧបករណ៍របស់យើងបន្ទាប់។

### -3- ដោះស្រាយបញ្ចីឧបករណ៍

បន្ទាប់ ដើម្បីដោះស្រាយបញ្ចីឧបករណ៍ យើងត្រូវរៀបចំអ្នកដំណើរការសំណើសម្រាប់រឿងនេះ។ អ្វីដែលយើងត្រូវបន្ថែមទៅក្នុងឯកសារ server របស់យើងគឺ៖

**Python**

```python
# កូដបានលុបចេញសម្រាប់ការសង្ខេប
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

នៅទីនេះ យើងបន្ថែម decorator `@server.list_tools` និងមុខងារអនុវត្ត `handle_list_tools`។ នៅក្នុងមុខងារនេះ យើងត្រូវបង្កើតបញ្ជីឧបករណ៍មួយ។ សូមចំណាំថាឧបករណ៍នីមួយៗត្រូវមាន name, description និង inputSchema។   

**TypeScript**

ដើម្បីរៀបចំអ្នកដំណើរការសំណើសម្រាប់បញ្ចីឧបករណ៍ យើងត្រូវហៅ `setRequestHandler` លើម៉ាស៊ីនបម្រើ ជាមួយស្គីម៉ាដែលសមស្របសម្រាប់សកម្មភាពដែលយើងកំពុងធ្វើ ក្នុងករណីនេះគឺ `ListToolsRequestSchema`។ 

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
// កូដបានដកចេញសម្រាប់ភាពខ្លី
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // ត្រឡប់បញ្ជីឧបករណ៍ដែលបានចុះបញ្ជី
  return {
    tools: tools
  };
});
```

ល្អហើយ ឥឡូវយើងបានដោះស្រាយការបញ្ចីឧបករណ៍ យើងមកមើលរបៀបហៅឧបករណ៍បន្ទាប់។

### -4- ដោះស្រាយហៅឧបករណ៍

ដើម្បីហៅឧបករណ៍ យើងត្រូវរៀបចំអ្នកដំណើរការសំណើមួយទៀត ដែលផ្ដោតទៅលើការដោះស្រាយសំណើ ដែលបញ្ជាក់មុខងារណាដែលត្រូវហៅ និងជាមួយអាគុយម៉ង់អ្វី។

**Python**

យើងប្រើ decorator `@server.call_tool` ហើយអនុវត្តមុខងារដូចជា `handle_call_tool`។ នៅក្នុងមុខងារនេះ យើងត្រូវដោះស្រាយឈ្មោះឧបករណ៍ អាគុយម៉ង់របស់វា និងធានាថាអាគុយម៉ង់ត្រឹមត្រូវសម្រាប់ឧបករណ៍នោះ។ អ្នកអាចផ្ទៀងផ្ទាត់អាគុយម៉ង់ក្នុងមុខងារនេះ ឬក្រោមមុខងារហៅឧបករណ៍។

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools គឺជា វចនានុក្រម ដែលមានឈ្មោះឧបករណ៍ជា key
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

វាជារឿងដែលកើតឡើង៖

- ឈ្មោះឧបករណ៍របស់យើងបានបង្ហាញជាម៉ូនៅក្នុងប៉ារ៉ាម៉ែត្រ `name` ដែលជាការពិតសម្រាប់អាគុយម៉ង់របស់យើងនៅក្នុងទម្រង់រាជធានី `arguments`។

- ឧបករណ៍ត្រូវបានហៅជាមួយ `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`។ ការផ្ទៀងផ្ទាត់អាគុយម៉ង់កើតឡើងនៅក្នុងគុណសម្បត្តិ `handler` ដែលមានបង្ហាញមុខងារ ប្រសិនបើមិនត្រឹមត្រូវវានឹងលេចបញ្ហា។

វិញហើយ ឥឡូវនេះយើងយល់ដឹងពេញលេញអំពីការបញ្ចី និងហៅឧបករណ៍ដោយប្រើម៉ាស៊ីនបម្រើកម្រិតទាប។

មើល [ឧទាហរណ៍ពេញលេញ](./code/README.md) នៅទីនេះ

## បេសកកម្ម

ពង្រីកកូដដែលអ្នកបានទទួលជាមួយឧបករណ៍ទាំងឡាយធនធាន និងបណ្ដាញផ្សព្វផ្សាយ ហើយយល់ពីរបៀបដែលអ្នកត្រូវតែបន្ថែមឯកសារនៅក្នុងថត tools តែប៉ុណ្ណោះមិនមែននៅកន្លែងផ្សេងទៀតទេ។ 

*មិនមានដំណោះស្រាយផ្តល់ជូន*

## សង្ខេប

នៅក្នុងជំពូកនេះ យើងបានឃើញរបៀបវិធីសាស្រ្តម៉ាស៊ីនបម្រើកម្រិតទាបដំណើរការ និងរបៀបវាអាចជួយឲ្យយើងបង្កើតស្ថាបត្យកម្មល្អដែលយើងអាចបន្តសាងសង់បាន។ យើងក៏បានពិភាក្សាអំពីការផ្ទៀងផ្ទាត់ ហើយអ្នកត្រូវបានបង្ហាញ។ របៀបធ្វើការជាមួយបណ្ណាល័យផ្ទៀងផ្ទាត់ ដើម្បីបង្កើតស្គីម៉ាសម្រាប់ការផ្ទៀងផ្ទាត់ការបញ្ចូល។

## អ្វីខាងមុខ

- បន្ទាប់ៈ [ការផ្ទៀងផ្ទាត់សាមញ្ញ](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->