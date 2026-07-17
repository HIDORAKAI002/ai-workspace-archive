# অগ্রসর সার্ভারের ব্যবহার

MCP SDK-তে দুটি ধরণের সার্ভারের উপস্থাপন রয়েছে, আপনার সাধারণ সার্ভার এবং লো-লেভেল সার্ভার। সাধারণত, আপনি সাধারণ সার্ভার ব্যবহার করবেন তার মধ্যে বৈশিষ্ট্য যোগ করার জন্য। তবে কিছু ক্ষেত্রে, আপনি লো-লেভেল সার্ভারের ওপর নির্ভরশীল হতে পারেন যেমন:

- উন্নত আর্কিটেকচার। একসঙ্গে সাধারণ সার্ভার এবং লো-লেভেল সার্ভার দিয়ে পরিষ্কার একটি আর্কিটেকচার তৈরি সম্ভব, তবে বলা যায় লো-লেভেল সার্ভার দিয়ে এটি কিছুটা সহজ।
- বৈশিষ্ট্যের উপলব্ধতা। কিছু উন্নত বৈশিষ্ট্য শুধুমাত্র লো-লেভেল সার্ভার দিয়ে ব্যবহার করা যায়। আপনি পরবর্তী অধ্যায়গুলোতে এটি দেখতে পাবেন যেমন স্যাম্পলিং যোগ করা (সমাপ্ত  `2026-07-28` রিলিজ ক্যান্ডিডেটে) এবং এলিসিটেশন।

## সাধারণ সার্ভার বনাম লো-লেভেল সার্ভার

এটি কেমন দেখায় একটি MCP সার্ভার তৈরি করতে সাধারণ সার্ভার দিয়ে

**Python**

```python
mcp = FastMCP("Demo")

# একটি যোগ করার টুল যোগ করুন
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

// একটি যোগফল টুল যোগ করুন
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

উদ্দেশ্য হল আপনি স্পষ্টভাবে প্রতিটি টুল, রিসোর্স বা প্রম্পট যোগ করবেন যা আপনি চান সার্ভারে থাকুক। এতে কিছু ভুল নেই।  

### লো-লেভেল সার্ভার পদ্ধতি

তবে যখন আপনি লো-লেভেল সার্ভার পদ্ধতি ব্যবহার করেন তখন আপনাকে এটি ভিন্নভাবে চিন্তা করতে হবে। প্রতিটি টুল রেজিস্টার করার পরিবর্তে, আপনি প্রতিটি বৈশিষ্ট্যের জন্য দুটি হ্যান্ডলার তৈরি করবেন (টুল, রিসোর্স বা প্রম্পট)। উদাহরণস্বরূপ, টুলগুলোর ক্ষেত্রে কেবল দুটি ফাংশন থাকে:

- সমস্ত টুল তালিকা করা। একটি ফাংশন হবে সমস্ত টুল তালিকা করার চেষ্টা পরিচালনার জন্য।
- সমস্ত টুল কল পরিচালনা করা। এখানে কেবল একটি ফাংশন রয়েছে টুল কল পরিচালনার জন্য।

এটা সম্ভবত কম কাজ মনে হচ্ছে, তাই না? সুতরাং, একটি টুল রেজিস্টার করার পরিবর্তে, আমাকে শুধু নিশ্চিত করতে হবে যে টুলটি তালিকায় থাকে যখন আমি সমস্ত টুল তালিকা করি এবং এটি কল হওয়া উচিত যখন একটি ইনকামিং অনুরোধ টুল কল করার জন্য আসে। 

এখন দেখি কোড কেমন দেখাচ্ছে:

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
  // নিবন্ধিত সরঞ্জামগুলির তালিকা ফেরত দিন
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

এখানে আমাদের একটি ফাংশন আছে যা বৈশিষ্ট্যের তালিকা ফেরত দেয়। টুলস তালিকার প্রতিটি এন্ট্রিতে এখন `name`, `description` এবং `inputSchema` এর মতো ফিল্ড আছে যা রিটার্ন টাইপ অনুযায়ী। এটি আমাদের টুল এবং বৈশিষ্ট্য সংজ্ঞাগুলো অন্যত্র রাখতে দেয়। এখন আমরা সমস্ত টুল একটি টুলস ফোল্ডারে তৈরি করতে পারি এবং একইভাবে আপনার সমস্ত বৈশিষ্ট্যের জন্যও যাতে আপনার প্রকল্প হঠাৎ এইভাবে সংগঠিত হতে পারে:

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

দারুণ, আমাদের আর্কিটেকচার বেশ পরিষ্কার দেখাবে।

টুল কল করার ব্যাপারে কী, তাহলে কি একই ধারণা, একটি হ্যান্ডলার যেকোনো টুল কল করার জন্য? হ্যাঁ, ঠিকই, এটির কোড দেখুন:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools একটি ডিকশনারি যার কীগুলো টুল নাম হিসেবে রয়েছে
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
    
    // আর্গস: request.params.arguments
    // TODO টুলটি কল করুন,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

উপরে কোড থেকে আপনি দেখে পাচ্ছেন, আমাদের টুল কল করতে হলে টুলের নাম এবং কী আর্গুমেন্ট দিয়ে কল করতে হবে তা পার্স করতে হবে, তারপর টুলকে কল করতে হবে।

## যাচাই-বাচাই দিয়ে পদ্ধতিটি উন্নত করা

এখন পর্যন্ত, আপনি দেখেছেন কিভাবে আপনার সকল রেজিস্ট্রেশন যেমন টুল, রিসোর্স এবং প্রম্পট যোগ করা যায় এই দুই হ্যান্ডলার ব্যবহার করে প্রতিটি বৈশিষ্ট্যের জন্য। আর কী করতে হবে? অবশ্যই, টুল কল করার সময় সঠিক আর্গুমেন্ট দিয়ে কল হচ্ছে কিনা তা যাচাই করার জন্য কিছু যাচাই যোগ করা উচিত। প্রতিটি রানটাইমের নিজস্ব সমাধান আছে, উদাহরণস্বরূপ পায়থন ব্যবহার করে Pydantic এবং টাইপস্ক্রিপ্ট ব্যবহার করে Zod। ধারণা হল আমরা নিম্নলিখিত কাজ করবো:

- একটি ফিচার (টুল, রিসোর্স বা প্রম্পট) তৈরি করার লজিক তার নিজস্ব নিজস্ব ফোল্ডারে সরানো।
- একটি পদ্ধতি যোগ করা যা ইনকামিং অনুরোধ যাচাই করবে, যেমন টুল কলের জন্য।

### একটি ফিচার তৈরি করুন

একটি ফিচার তৈরি করতে, আপনাকে সেই ফিচারের একটি ফাইল তৈরি করতে হবে এবং নিশ্চিত করতে হবে যে এতে ফিচারের জন্য প্রয়োজনীয় বাধ্যতামূলক ফিল্ডগুলি রয়েছে। ফিল্ডগুলোর কিছু পার্থক্য থাকে টুলস, রিসোর্স এবং প্রম্পটের মধ্যে।

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

এখানে আপনি দেখতে পাচ্ছেন আমরা নিম্নলিখিত কাজ কি করে থাকি:

- Pydantic ব্যবহার করে একটি স্কিমা তৈরি করা `AddInputModel` নামে ফাইল *schema.py* তে, যেখানে ফিল্ড `a` এবং `b` আছে।
- ইনকামিং অনুরোধ `AddInputModel` টাইপ অনুযায়ী পার্স করার প্রচেষ্টা, যদি প্যারামিটার নেইম্বারে অসঙ্গতি থাকে তাহলে এটি ক্র্যাশ করবে:

   ```python
   # add.py
    try:
        # Pydantic মডেল ব্যবহার করে ইনপুট যাচাই করুন
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

আপনি পছন্দমতো পার্স করার লজিক সরাসরি টুল কল ফাংশনে বা হ্যান্ডলার ফাংশনে রাখতে পারেন।

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

- টুল কলগুলো পরিচালনা করা হ্যান্ডলারে, এখন ইনকামিং অনুরোধ টুলের সংজ্ঞায়িত স্কিমা অনুযায়ী পার্স করার চেষ্টা করা হয়:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    সফল হলে আসল টুল কল করার জন্য এগিয়ে যান:

    ```typescript
    const result = await tool.callback(input);
    ```

যেমন আপনি দেখতে পাচ্ছেন, এই পদ্ধতিটি একটি দুর্দান্ত আর্কিটেকচার তৈরি করে যেহেতু সবকিছু তার নিজ নিজ জায়গায় থাকে, *server.ts* একটি খুব ছোট ফাইল যা কেবল রিকুয়েস্ট হ্যান্ডলারগুলো সংযুক্ত করে এবং প্রতিটি ফিচার তাদের নিজ নিজ ফোল্ডারে থাকে যেমন tools/, resources/ বা /prompts।

দারুণ, চলুন এখন এটি তৈরি করার চেষ্টা করি।

## অনুশীলন: একটি লো-লেভেল সার্ভার তৈরি করা

এই অনুশীলনে, আমরা নিম্নলিখিত কাজ করব:

1. একটি লো-লেভেল সার্ভার তৈরি করা যা টুল তালিকা এবং টুল কল হ্যান্ডেল করে।
1. একটি আর্কিটেকচার তৈরি করা যা আপনি ভবিষ্যতে বাড়াতে পারবেন।
1. যাচাই যোগ করা যাতে টুল কল সঠিকভাবে যাচাই হয়।

### -1- একটি আর্কিটেকচার তৈরি করুন

প্রথমেই আমাদের একটি আর্কিটেকচার ঠিক করতে হবে যা আমাদের সুবিধা দেয় আরও বৈশিষ্ট্য যোগ করতে যা আমাদের স্কেল করতে সাহায্য করবে, এরা দেখতে কেমন:

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

এখন আমরা একটি আর্কিটেকচার তৈরি করেছি যা নিশ্চিত করে আমরা সহজেই টুলস ফোল্ডারে নতুন টুল যোগ করতে পারব। রিসোর্স এবং প্রম্পটের জন্য আপনার কাজ সাবডিরেক্টরি যোগ করতেও পারেন।

### -2- একটি টুল তৈরি করা

চলুন দেখি কেমন হবে একটি টুল তৈরি করা। প্রথমে, এটি তার নিজস্ব *tool* সাবডিরেক্টরিতে তৈরি করতে হবে এমনভাবে:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic মডেল ব্যবহার করে ইনপুট যাচাই করুন
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

এখানে আমরা দেখি কিভাবে নাম, বর্ণনা, এবং ইনপুট স্কিমা Pydantic দিয়ে সংজ্ঞায়িত করা হয় এবং একটি হ্যান্ডলার থাকে যা টুল কল করার সময় সক্রিয় হবে। সবশেষে, আমরা `tool_add` প্রকাশ করি যা একটি ডিকশনারি যা এই সব প্রপার্টি ধারণ করে।

এছাড়াও *schema.py* আছে যা আমাদের টুলে ব্যবহৃত ইনপুট স্কিমা সংজ্ঞায়িত করে:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

*__init__.py* ফাইলটিও প্রয়োজন যাতে টুলস ডিরেক্টরিকে একটি মডিউল হিসেবে গণ্য করা হয়। অতিরিক্তভাবে, আমরা এর মধ্যে থাকা মডিউলগুলোও প্রকাশ করি যেমন:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

আমরা এই ফাইলে আরও টুল যোগ করতে থাকলে আরো এন্ট্রি যোগ করতে পারি।

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

এখানে আমরা একটি ডিকশনারি তৈরি করছি যার প্রপার্টিগুলো:

- নাম, এটিই টুলের নাম।
- rawSchema, এটি Zod স্কিমা যা ইনকামিং টুল কল যাচাই করতে ব্যবহার হয়।
- inputSchema, এই স্কিমা হ্যান্ডলার দ্বারা ব্যবহৃত হবে।
- callback, এটি টুল চালানোর জন্য ব্যবহৃত হয়।

এছাড়াও `Tool` আছে যা এই ডিকশনারিকে mcp সার্ভার হ্যান্ডলার গ্রহণযোগ্য টাইপে রূপান্তর করে, যা দেখতে এরকম:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

এবং *schema.ts* আছে যেখানে প্রতিটি টুলের ইনপুট স্কিমাগুলো রাখা হয়, এখন শুধুমাত্র একটি স্কিমা আছে, কিন্তু আরো টুল যুক্ত হলে আমরা আরো এন্ট্রি যোগ করতে পারব:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

দারুণ, চলুন এবার আমাদের টুলের তালিকা হ্যান্ডলিং করি। 

### -3- টুল তালিকা হ্যান্ডলিং

এবার, আমাদের টুলসের তালিকা হ্যান্ডলিং এর জন্য একটি রিকুয়েস্ট হ্যান্ডলার সেটআপ করতে হবে। আমাদের সার্ভার ফাইলে যা যোগ করতে হবে তা হলো:

**Python**

```python
# কোড সংক্ষিপ্ত করার জন্য বাদ দেওয়া হয়েছে
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

এখানে, আমরা ডেকোরেটর `@server.list_tools` যোগ করাচ্ছি এবং বাস্তবায়িত ফাংশন `handle_list_tools`। এতে, আমাদের একটি টুলের তালিকা তৈরি করতে হবে। লক্ষ্য করুন প্রতিটি টুলের নাম, বর্ণনা ও ইনপুটস্কিমা থাকতে হবে।   

**TypeScript**

টুল তালিকা হ্যান্ডলার সেট আপ করতে, আমরা সার্ভারে `setRequestHandler` কল করব একটি স্কিমা দিয়ে যা আমাদের কাজ উপযোগী, এই ক্ষেত্রে `ListToolsRequestSchema`। 

```typescript
// ইনডেক্স.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// সার্ভার.ts
// সংক্ষিপ্ততার জন্য কোড বাদ দেওয়া হয়েছে
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // নিবন্ধিত সরঞ্জামগুলির তালিকা ফেরত দিন
  return {
    tools: tools
  };
});
```

দারুণ, এখন আমরা টুল তালিকা সমস্যাটি সমাধান করেছি, এবার দেখি আমরা টুল কল কিভাবে করতে পারি।

### -4- একটি টুল কল হ্যান্ডলিং

একটি টুল কল করতে, আমাদের আরেকটি রিকুয়েস্ট হ্যান্ডলার সেট আপ করতে হবে, যেটি ফিচার কল এবং আর্গুমেন্ট নিয়ে কাজ করবে।

**Python**

চলুন ডেকোরেটর `@server.call_tool` ব্যবহার করি এবং এটি একটি ফাংশন `handle_call_tool` দ্বারা বাস্তবায়িত করি। এই ফাংশনের মধ্যে, আমাদের টুলের নাম, তার আর্গুমেন্ট পার্স করতে হবে এবং নিশ্চিত করতে হবে আর্গুমেন্ট গুলো বৈধ। আমরা আর্গুমেন্ট যাচাই করতে পারি এই ফাংশনে বা নিচের টুল হ্যান্ডলারে।

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools হল একটি অভিধান যার কী হিসাবে টুলের নাম রয়েছে
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # টুলটি সক্রিয় করুন
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

এখানে কি হচ্ছে:

- আমাদের টুলের নাম ইতিমধ্যেই ইনপুট প্যারামিটার `name` হিসেবে আছে যা সত্যি আমাদের আর্গুমেন্টের `arguments` ডিকশনারিতে।

- টুল কল হয় `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` দিয়ে। আর্গুমেন্ট যাচাই হয় `handler` প্যারামিটারের ফাংশনের মাধ্যমে, যদি সেটি ব্যর্থ হয় তাহলে একটি এক্সসেপশন উঠবে। 

এবারে, আমরা লো-লেভেল সার্ভার ব্যবহার করে টুল তালিকা ও কল করার পূর্ণ ধারণা পেয়েছি।

সম্পূর্ণ উদাহরণ দেখতে এখানে দেখুন [full example](./code/README.md)

## নিয়োগ

আপনি যে কোড পেয়েছেন তা বিভিন্ন টুল, রিসোর্স এবং প্রম্পট যোগ করে বর্ধিত করুন এবং লক্ষ্য করুন যে আপনাকে শুধু টুলস ডিরেক্টরিতে ফাইল যোগ করতে হয় অন্য কোথাও নয়। 

*কোন সমাধান নেই*

## সারাংশ

এই অধ্যায়ে, আমরা দেখেছি কিভাবে লো-লেভেল সার্ভার পদ্ধতি কাজ করে এবং তা আমাদের একটি সুন্দর আর্কিটেকচার তৈরি করতে সাহায্য করে যা আমরা ক্রমাগত বাড়াতে পারি। আমরা যাচাই-বাচাই আলোচনা করেছি এবং আপনাকে দেখানো হয়েছে কিভাবে যাচাই লাইব্রেরি ব্যবহার করে ইনপুটের জন্য স্কিমাগুলি তৈরি করা যায়।

## পরবর্তী কী

- পরবর্তী: [সহজ অথেন্টিকেশন](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->