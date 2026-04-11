# Advanced server usage

Dem get two types server wey dey inside MCP SDK, normal server and low-level server. Normally, you go use the normal server add features for am. But for some cases, you go want use the low-level server like:

- Better architecture. E fit possible to build clean architecture wit both the normal server and low-level server but some pipu fit talk sey e easy small for low-level server.
- Feature availability. Some advanced features fit only work wit low-level server. You go see dis for the next chapters as we add sampling and elicitation.

## Normal server vs low-level server

Dis na how e look wen you create MCP Server wit normal server

**Python**

```python
mcp = FastMCP("Demo")

# Add one addition tool
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

// Add one add tool
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

The main tins be sey you dey add every tool, resource or prompt wey you want make server get. No wahala wit dat. 

### Low-level server way

But if you use low-level server way, you go need think am different. Instead make you dey register every tool, you go dey create two handlers for each feature type (tools, resources or prompts). Like for tools, e go get two functions:

- To list all tools. One function go dey responsible for all di times wey you wan list tools.
- To handle call all tools. Here e still one function wey dey handle tool call.

E mean sey e fit be less work na? So instead make I dey register tool, I just go make sure say the tool dey inside tools list when I list all tools and call am when request drop to call tool.

Make we see how di code dey now:

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
  // Comot di list of registered tools
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

Now we get function wey dey return list of features. Every tool for tools list get fields like `name`, `description` and `inputSchema` wey go follow di return type. Dis one make us fit put tools and feature definitions for other place dem. We fit create all tools inside tools folder and same for features dem, so project go fit dey organized like:

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

Chiney, our architecture fit dey clean.

How about di tools call, na di same approach? One handler to call any tool? Yes, na so e be, here na di code:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools na dictionary wey get tool names as keys
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
    // TODO call di tool,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

From di code, we need parse tool to call and di arguments, then go call di tool.

## Make di way beta wit validation

So far, you don see how to replace all your registrations wey dey add tools, resources and prompts wit two handlers for every feature type. Wetin we go do next? We suppose add validation make sure say tool call get correct arguments. Every runtime get their solution, Python dey use Pydantic, TypeScript dey use Zod. Idea be to do di following:

- Move logic for creating feature (tool, resource or prompt) to im own folder.
- Add way to validate request wey wan call tool.

### Create feature

To create feature, you need create file for dat feature and make sure e get required fields. Some fields dey different for tools, resources and prompts.

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
        # Make sure say the input correct using Pydantic model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: add Pydantic, make we fit create AddInputModel and check args well well

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Here you fit see how we do:

- Create schema wit Pydantic `AddInputModel` get fields `a` and `b` inside *schema.py*.
- Try parse incoming request to type `AddInputModel`, if parameters no match, e go crash:

   ```python
   # add.py
    try:
        # Check say input dey correct wit Pydantic model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

You fit choose to put this parsing code inside tool call or handler function.

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

- Inside handler wey dey handle all tool call, we dey try parse incoming request with tool schema:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

  If e work, we go proceed call actual tool:

    ```typescript
    const result = await tool.callback(input);
    ```

From this approach, e create clear architecture as every tins dey their place. *server.ts* be small file wey just connect handlers and feature dey their own folders like tools/, resources/ or /prompts/.

Sharp, make we try build this next.

## Exercise: Creating a low-level server

For dis exercise, we go do:

1. Create low-level server to handle listing and calling of tools.
1. Implement architecture wey you fit build on top.
1. Add validation to make sure tool calls dey validated well.

### -1- Create architecture

First ting, we need architecture wey fit help us scale as we add more features, e go be like:

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

Now we don arrange architecture wey make am easy to add new tools inside tools folder. You fit add subdirectories for resources and prompts as you like.

### -2- Create tool

Make we see how to create tool next. First, you go create am inside *tool* subdirectory like:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Check di input wit Pydantic model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: add Pydantic, make we fit create AddInputModel and check di args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Here we define name, description and input schema wit Pydantic, plus handler wey go run when tool dey called. Last last, we expose `tool_add` wey be dictionary holding all dis things.

Also, *schema.py* dey to define input schema wey tool go use:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

We need also fill *__init__.py* make sure tools directory dey treated as module. We also expose modules inside am like dis:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

We fit still keep adding to this file as we add more tools.

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

Here we create dictionary wey get properties:

- name, na tool name.
- rawSchema, na Zod schema wey go validate incoming request to call tool.
- inputSchema, schema wey handler go use.
- callback, na function wey go run tool.

We also get `Tool` wey convert dictionary to type wey mcp server handler fit accept, e be like:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

And *schema.ts* be place wey we keep input schemas for tools. Dis schema get one tool now but as we add more tools, we fit add more:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Cool, make we continue to handle tool listing.

### -3- Handle tool listing

To handle list tools, we set request handler for am. Inside server file, we add:

**Python**

```python
# code no show make e short
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

Here we add decorator `@server.list_tools` and function `handle_list_tools`. Inside, we produce list of tools. Make sure each tool get name, description and inputSchema.

**TypeScript**

To set request handler for listing tools, we call `setRequestHandler` on server with correct schema, which is `ListToolsRequestSchema` for this case.

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
// code we comot make e short
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Comot give back di list of tools wey don register
  return {
    tools: tools
  };
});
```

Cool, now we don handle list tools, make we see how call tools go look.

### -4- Handle calling a tool

To call tool, we need another request handler that fit handle request wey talk which tool to call and with which arguments.

**Python**

Make we use decorator `@server.call_tool` and implement wit function like `handle_call_tool`. Inside, we parse tool name and arguments, make sure arguments correct for tool. We fit validate arguments here or inside tool itself.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools na one kain dictionary wey get tool names as keys
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # make you use the tool
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Here na wetin dey happen:

- Tool name dey input parameter `name`. Arguments dey inside `arguments` dictionary.

- Tool dey called wit `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Argument validation dey inside `handler` function, if e fail, e go throw exception.

Now we sabi how to list and call tools wit low-level server.

See [full example](./code/README.md) here

## Assignment

Add more tools, resources and prompt to di code. Notice sey you go only add files inside tools directory, no need add anywhere else.

*No solution given*

## Summary

For dis chapter, we see how low-level server approach work and how e fit help build nice architecture we go fit expand. We also talk about validation and show how to use validation libraries to create schemas for input validation.

## Wetin Dekam

- Next: [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dis dokument don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am accurate, abeg make you sabi say automated translations fit get error or wahala. Di original dokument for im own language na di correct source. If na important info, make person wey sabi human translation do am. We no go responsible for any confusion or wrong meaning wey fit come from using dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->