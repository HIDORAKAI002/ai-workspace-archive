# উন্নত সার্ভার ব্যবহার

MCP SDK তে দুই ধরনের সার্ভার উপলব্ধ আছে, আপনার সাধারণ সার্ভার এবং লো-লেভেল সার্ভার। সাধারণত, আপনি বৈশিষ্ট্য যুক্ত করার জন্য সাধারণ সার্ভার ব্যবহার করবেন। তবে কিছু ক্ষেত্রে, আপনি লো-লেভেল সার্ভারের উপর নির্ভর করতে চাইবেন যেমন:

- উন্নত স্থাপত্য। সাধারণ সার্ভার এবং লো-লেভেল সার্ভার দুইটিকেই ব্যবহার করে একটি পরিষ্কার স্থাপত্য তৈরি করা সম্ভব কিন্তু বলা যেতে পারে যে লো-লেভেল সার্ভারের মাধ্যমে এটা সামান্য সহজ।
- বৈশিষ্ট্যের উপলব্ধতা। কিছু উন্নত বৈশিষ্ট্য শুধুমাত্র লো-লেভেল সার্ভার দিয়ে ব্যবহার করা যায়। আপনি এই পরবর্তী অধ্যায়ে দেখতে পাবেন যেমন আমরা স্যাম্পলিং এবং ইলিসিটেশন যোগ করব।

## সাধারণ সার্ভার বনাম লো-লেভেল সার্ভার

এখানে দেখানো হলো MCP সার্ভার তৈরির একটি উদাহরণ সাধারণ সার্ভার ব্যবহার করে

**Python**

```python
mcp = FastMCP("Demo")

# একটি যোগ করার সরঞ্জাম যুক্ত করুন
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

// একটি যোগ টুল যোগ করুন
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

বিষয় হলো, আপনি স্পষ্টভাবে প্রতিটি টুল, রিসোর্স অথবা প্রম্পট যোগ করেন যা আপনি সার্ভারে চান। এতে কোনো সমস্যা নেই।  

### লো-লেভেল সার্ভার পদ্ধতি

তবে যখন আপনি লো-লেভেল সার্ভার পদ্ধতি ব্যবহার করেন তখন এটা অন্যভাবে ভাবতে হবে। প্রতিটি টুল নিবন্ধন করার বদলে, আপনি বৈশিষ্ট্যের ধরন অনুযায়ী (টুলস, রিসোর্স অথবা প্রম্পট) দুটি হ্যান্ডলার বানাবেন। তাই উদাহরণস্বরূপ টুলসের ক্ষেত্রে শুধু দুটি ফাংশন থাকবে এরকম:

- সমস্ত টুল তালিকা করা। একটি ফাংশন থাকবে যা সমস্ত টুল তালিকা করার চেষ্টা পরিচালনা করবে।
- সমস্ত টুল কল হ্যান্ডেল করা। এখানে শুধু একটি ফাংশন থাকবে যা টুল কলগুলো হ্যান্ডল করবে।

এটা কাজ কম হতে পারে শোনাচ্ছে, তাই না? তাই টুল নিবন্ধন করার পরিবর্তে, আমাকে শুধু নিশ্চিত করতে হবে টুল তালিকাভুক্ত যখন আমি সমস্ত টুল তালিকা করি এবং টুল কলের অনুরোধ আসলে কল করা হয়। 

এখন কোডগুলো কেমন দেখাচ্ছে দেখি:

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
  // নিবন্ধিত সরঞ্জামের তালিকা ফেরত দিন
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

এখানে এখন একটি ফাংশন আছে যা বৈশিষ্ট্যের তালিকা ফেরত দেয়। টুলস তালিকার প্রতিটি এন্ট্রিতে থাকে যেমন `name`, `description` এবং `inputSchema` যা রিটার্ন টাইপ অনুসরণ করে। এটি আমাদের টুল এবং বৈশিষ্ট্য সংজ্ঞায়িত অন্য কোথাও রাখতে সক্ষম করে। এখন আমরা আমাদের সব টুলস একটি টুলস ফোল্ডারে রাখতে পারি এবং একইভাবে আপনার সব বৈশিষ্ট্যর জন্যও, তাই আপনার প্রকল্প হঠাৎ করে এমন সাজাতে পারে:

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

দারুণ, আমাদের স্থাপত্য বেশ পরিষ্কার হতে পারে।

টুল কল করার ব্যাপারে কি একই ধারণা, এক হ্যান্ডলার সব টুল কল করাবে, যেকোনো টুল? হ্যাঁ, ঠিক আছে, নিচে তাও দেখুন:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools হলো একটি অভিধান যাতে টুল নামগুলি কী হিসেবে রয়েছে
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
    
    // আর্গুমেন্টস: request.params.arguments
    // TODO টুলটি কল করুন,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

উপরের কোড থেকে দেখা যাচ্ছে, আমাদের টুলের নাম এবং কোন আর্গুমেন্ট দিয়ে টুল কল করা হবে সেটা পার্স করতে হবে, তারপর টুল কল করতে হবে।

## যাচাইকরণের মাধ্যমে পদ্ধতি উন্নতি করা

এখন পর্যন্ত, আপনি দেখেছেন কিভাবে আপনার টুল, রিসোর্স এবং প্রম্পট যোগ করার নিবন্ধনগুলো এই দুইটি হ্যান্ডলারে প্রতিস্থাপিত হতে পারে বৈশিষ্ট্যের ধরণের জন্য। আর কি করা দরকার? আমাদের কিছু যাচাইকরণ যুক্ত করা উচিত যাতে নিশ্চিত হয় টুল সঠিক আর্গুমেন্ট নিয়ে কল হচ্ছে। প্রতিটি রানটাইমের নিজস্ব সমাধান আছে, উদাহরণস্বরূপ Python uses Pydantic এবং TypeScript uses Zod। ধারনাটি হলো:

- একটি বৈশিষ্ট্য (টুল, রিসোর্স অথবা প্রম্পট) তৈরি করার লজিক তার নিজস্ব ফোল্ডারে সরানো।
- একটি পদ্ধতি যোগ করা যাতে ইনকামিং রিকোয়েস্ট যাচাই করা যায় যেমন টুল কলের জন্য।

### একটি বৈশিষ্ট্য তৈরি করা

বৈশিষ্ট্য তৈরি করতে, আমাদের ওই বৈশিষ্ট্যের জন্য একটি ফাইল তৈরি করতে হবে এবং নিশ্চিত করতে হবে সেই বৈশিষ্ট্যের জন্য প্রয়োজনীয় বাধ্যতামূলক ক্ষেত্র আছে। যে ক্ষেত্রগুলো টুলস, রিসোর্স এবং প্রম্পটের জন্য একটু ভিন্ন।

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
        # Pydantic মডেল ব্যবহার করে ইনপুট যাচাই করুন
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic যোগ করুন, যাতে আমরা একটি AddInputModel তৈরি করতে পারি এবং আর্গুমেন্ট যাচাই করতে পারি

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

এখানে দেখা যাচ্ছে আমরা নিচের কাজগুলো করলাম:

- Pydantic ব্যবহার করে `AddInputModel` নামক একটি স্কিমা তৈরি করলাম যে স্কিমার ক্ষেত্র `a` এবং `b` আছে *schema.py* ফাইলে।
- ইনকামিং রিকোয়েস্ট `AddInputModel` টাইপে পার্স করার চেষ্টা করলাম, যদি প্যারামিটারে অসামঞ্জস্য থাকে তাহলে এটি ক্রাশ করবে:

   ```python
   # add.py
    try:
        # Pydantic মডেল ব্যবহার করে ইনপুট যাচাই করুন
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

আপনি পার্সিং লজিক টুল কলের ভিতর বা হ্যান্ডলার ফাংশনে রাখতে পারেন।

**TypeScript**

```typescript
// সার্ভার.ts
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

// স্কিমা.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// যোগ করুন.ts
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

- সমস্ত টুল কলকেই হ্যান্ডল করা হ্যান্ডলায়, আমরা ইনকামিং রিকোয়েস্ট টুলের সংজ্ঞায়িত স্কিমাতে পার্স করার চেষ্টা করছি:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    যদি কাজ করে তাহলে আসল টুল কল করার দিকে এগোবে:

    ```typescript
    const result = await tool.callback(input);
    ```

আপনি দেখছেন, এই পদ্ধতি একটি চমৎকার স্থাপত্য তৈরি করে কারণ সবকিছুর নিজস্ব জায়গা থাকে, *server.ts* একটি খুব ছোট ফাইল যা শুধু রিকোয়েস্ট হ্যান্ডলারগুলো ওয়্যার করছে এবং প্রতিটি বৈশিষ্ট্য তাদের নিজ নিজ ফোল্ডারে যেমন tools/, resources/ অথবা /prompts থাকে।

দারুণ, এবার এটি তৈরি করার চেষ্টা করি।

## অনুশীলন: একটি লো-লেভেল সার্ভার তৈরি করা

এই অনুশীলনে আমরা করব:

1. একটি লো-লেভেল সার্ভার তৈরি করা যা টুলসের তালিকা এবং টুল কল হ্যান্ডল করবে।
2. এমন একটি স্থাপত্য বাস্তবায়ন করা যাতে আপনি এর ওপর ভিত্তি করে আরও তৈরি করতে পারেন।
3. যাচাইকরণ যোগ করা যাতে নিশ্চিত হয় টুল কল সঠিকভাবে যাচাই করা হচ্ছে।

### -1- একটি স্থাপত্য তৈরি করা

প্রথমেই আমাদের এমন একটি স্থাপত্য থাকতে হবে যা সাহায্য করবে বৈশিষ্ট্য যোগের সময় ভালোভাবে স্কেল করতে, এটি এরকম দেখায়:

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

এখন এমন একটি স্থাপত্য তৈরি হয়েছে যা নিশ্চিত করে আমরা সহজেই টুলস ফোল্ডারে নতুন টুল যোগ করতে পারি। রিসোর্স এবং প্রম্পটের জন্য সাবডিরেক্টরি যোগ করতে পারেন।

### -2- একটি টুল তৈরি করা

পরবর্তী দেখুন টুল তৈরি কেমন। প্রথমে, এটি তার *tool* সাবডিরেক্টরিতে তৈরি করতে হবে এরকম:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # ইনপুট যাচাই করুন Pydantic মডেল ব্যবহার করে
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic যোগ করুন, যাতে আমরা একটি AddInputModel তৈরি করতে পারি এবং আর্গুমেন্টগুলি যাচাই করতে পারি

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

এখানে দেখা যাচ্ছে কিভাবে আমরা Pydantic ব্যবহার করে নাম, বিবরণ, এবং ইনপুট স্কিমা সংজ্ঞায়িত করি এবং একটি হ্যান্ডলার যা কল হলে কাজ করবে। শেষে `tool_add` নামে একটি ডিকশনারি প্রকাশ করি যা এই সব প্রপার্টি ধারণ করে।

আছেও *schema.py* যেখানে আমাদের টুলের জন্য ইনপুট স্কিমা সংজ্ঞায়িত:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

আমাদের *__init__.py* ফাইলটিও পূরণ করতে হবে যাতে টুলস ডিরেক্টরি একটি মডিউল হিসেবে ধরা হয়। এছাড়া এর ভিতরের মডিউলগুলো নিচের মতো প্রকাশ করতে হবে:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

টুল আরও যোগ করার সময় আমরা এই ফাইলে কন্টিনিউ করতে পারি।

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

এখানে আমরা একটি ডিকশনারি তৈরি করছি যা নিম্নলিখিত প্রপার্টি নিয়ে গঠিত:

- name, এটি টুলের নাম।
- rawSchema, এটি Zod স্কিমা যা ইনকামিং টুল কল রিকোয়েস্ট যাচাই করবে।
- inputSchema, এই স্কিমাটি হ্যান্ডলার দ্বারা ব্যবহৃত হবে।
- callback, যা টুল ইনভোক করতে ব্যবহৃত হয়।

আছে `Tool` যা এই ডিকশনারি টাইপকে MCP সার্ভার হ্যান্ডলার গ্রহণযোগ্য টাইপে রূপান্তর করে এবং দেখাচ্ছে এরকম:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

এবং *schema.ts* যেখানে আমরা প্রত্যেক টুলের ইনপুট স্কিমা রাখি, এখন শুধুমাত্র একটি স্কিমা আছে কিন্তু টুল বাড়ার সাথে আমরা আরো এন্ট্রি যোগ করতে পারবো:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

দারুণ, এখন টুল তালিকা হ্যান্ডল করা শুরু করিঃ

### -3- টুল তালিকা হ্যান্ডল করা

টুল তালিকা হ্যান্ডল করার জন্য একটি রিকোয়েস্ট হ্যান্ডলার সেটআপ করতে হবে। আমাদের সার্ভার ফাইলে যা যোগ করতে হবে:

**Python**

```python
# সংক্ষেপের জন্য কোড বাদ দেওয়া হয়েছে
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

এখানে আমরা `@server.list_tools` ডেকোরেটর এবং `handle_list_tools` ফাংশন ব্যবহার করেছি। সেখানে একটি টুল তালিকা তৈরি করতে হবে। লক্ষ্য করুন প্রতিটি টুলের নাম, বিবরণ এবং inputSchema থাকতে হবে।   

**TypeScript**

টুল তালিকা করার রিকোয়েস্ট হ্যান্ডলার সেটআপ করতে, আমাদের সার্ভারে `setRequestHandler` কল করতে হবে একটি স্কিমা সহ যা আমরা করতে চাই, এই ক্ষেত্রে `ListToolsRequestSchema`।

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
// সংক্ষিপ্ততার জন্য কোড বাদ দেওয়া হয়েছে
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // নিবন্ধিত টুলগুলির তালিকা ফেরত দিন
  return {
    tools: tools
  };
});
```

দারুণ, এখন আমরা টুল তালিকা করার অংশ সল্ভ করলাম, আসুন দেখি টুল কল কিভাবে হয়।

### -4- টুল কল হ্যান্ডল করা

একটি টুল কল করার জন্য, আরেকটি রিকোয়েস্ট হ্যান্ডলার সেট আপ করতে হবে যেটি কোন বৈশিষ্ট্য কল করা হবে এবং কি আর্গুমেন্ট নিয়ে, তা দেখবে।

**Python**

`@server.call_tool` ডেকোরেটর ব্যবহার করি এবং `handle_call_tool` ফাংশন লিখি। সেখানে আমাদের টুল নাম, তার আর্গুমেন্ট পার্স করতে হবে এবং যাচাই করতে হবে আর্গুমেন্ট অবৈধ না। আর্গুমেন্ট যাচাই আমরা এখানে বা টুলের ভিতর উভয় জায়গায় করতে পারি।

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools হল একটি অভিধান যার চাবি হিসাবে টুলের নাম রয়েছে
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # টুলটি আহ্বান করুন
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

এখানে যা হচ্ছে:

- আমাদের টুল নাম ইতিমধ্যেই ইনপুট প্যারামিটার `name` হিসাবে আছে, এবং আর্গুমেন্টগুলো একটি `arguments` ডিকশনারির মধ্যে দেয়া আছে।

- টুল কল করা হচ্ছে `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` দিয়ে। আর্গুমেন্ট যাচাই `handler` প্রপার্টিতে যেটি একটি ফাংশন, সেখানে হয়, ব্যর্থ হলে এক্সসেপশন দেয়।

এখন আমরা সম্পূর্ণ বুঝে গেছি কিভাবে লো-লেভেল সার্ভার ব্যবহার করে টুল তালিকা এবং কল করা হয়।

সম্পূর্ণ উদাহরণ এখানে দেখুন: [full example](./code/README.md)

## অ্যাসাইনমেন্ট

আপনাকে দেওয়া কোডে একটি সংখ্যা টুল, রিসোর্স এবং প্রম্পট যোগ করুন এবং দেখুন কিভাবে শুধু tools ডিরেক্টরিতে ফাইল যোগ করলেই হয়, অন্য কোথাও করণীয় থাকে না। 

*কোনো সমাধান দেয়া হয়নি*

## সারসংক্ষেপ

এ অধ্যায়ে আমরা দেখেছি কিভাবে লো-লেভেল সার্ভার পদ্ধতি কাজ করে এবং কিভাবে এটি আমাদের একটি সুন্দর স্থাপত্য তৈরি করতে সাহায্য করে যার ওপর আমরা আরও তৈরি করতে পারি। এছাড়া যাচাইকরণের ব্যাপারে আলোচনা করেছি এবং দেখা হয়েছে কিভাবে যাচাইকরণ লাইব্রেরি দিয়ে ইনপুট যাচাইয়ের জন্য স্কিমা তৈরি করা যায়।

## পরবর্তী কি

- পরবর্তী: [সরল প্রমাণীকরণ](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকারোক্তি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনুবাদ করা হয়েছে। আমরা যথাসাধ্য সঠিকতার চেষ্টা করি, কিন্তু অনুগ্রহ করে জানুন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথির আদি ভাষাটি কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ করার পরামর্শ দেওয়া হয়। এই অনুবাদের ব্যবহারে উদ্ভূত যেকোনো ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়ী নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->