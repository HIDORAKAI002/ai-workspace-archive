# Advanced server usage

Dem get two kain server wey MCP SDK show, your regular server and di low-level server. Normal normal, you go dey use di regular server add features. But for some kain case, you fit wan use di low-level server like:

- Better architecture. E possible to create clean architecture with regular server plus low-level server but e fit be say e dey little easy pass for low-level server.
- Feature availability. Some advanced features fit only use for low-level server. You go see am for later chapters as we add sampling (we no go use am again since `2026-07-28` release candidate) and elicitation.

## Regular server vs low-level server

Dis na how dem dey create MCP Server with regular server

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

// Add one addition tool
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

Point na say you go explicitly add each tool, resource or prompt wey you want your server get. Nothing wrong with dat.  

### Low-level server approach

But if you use low-level server approach, you go need think am different. Instead to dey register each tool, you go create two handlers per feature type (tools, resources or prompts). So example for tools, dem get only two functions:

- To list all tools. One function dey do all listing of tools.
- To handle calling tools. Here too, only one function dey handle calls for tool

E sound like less work abi? Instead of register tool, you just make sure say tool dey list when you list all tools and e dey call anything wey request come call am. 

Make we look how di code be now:

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
  // Return di list of tools wey dem don register
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

Here we get function wey dey return list of features. Every tool for tools list get `name`, `description` and `inputSchema` to match correct return type. This one go make us fit put our tools and feature definition for another place. Now we fit create all our tools for tools folder and e same with all features so our project fit arrange like this:

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

E good wella, our architecture fit clean well.

How we go do when we wan call tools, na di same idea? One handler go dey to call any tool? Yes, na so e be, here na di code for that:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools na one dictionary wey get tool names as keys
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
    // TODO make we call di tool,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

From di code wey dey above, you go see say we need parse which tool to call, with which arguments, then we go call di tool.

## Improving the approach with validation

So far, you don see how you fit use dis two handlers per feature type to do all your registers for tools, resources and prompts. Wetin else we need do? We suppose add some kind validation to make sure say tool dey call with correct arguments. Every runtime get their own way for dis, for example Python dey use Pydantic and TypeScript dey use Zod. Di idea be say we go do the following:

- Make di logic wey dey create feature (tool, resource or prompt) dey inside im own folder.
- Add way to validate incoming request, like request to call tool.

### Create a feature

To create feature, we go need create file for dat feature and make sure say e get mandatory fields wey the feature need. Dem fields differ small small between tools, resources and prompts.

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
        # Check input wit Pydantic model
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

Here you fit see how we do am:

- Create schema with Pydantic `AddInputModel` with fields `a` and `b` for *schema.py* file.
- Try parse incoming request as type `AddInputModel`, if parameter no match e go crash:

   ```python
   # add.py
    try:
        # Make sure sey di input correct wit Pydantic model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

You fit choose whether you wan put parsing logic inside tool call or inside handler function.

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

- Inside handler wey dey handle all tool calls, we de try parse incoming request into tool schema:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    if e work then we go call di tool:

    ```typescript
    const result = await tool.callback(input);
    ```

As you don see, this approach dey create correct architecture as everything get im place. The *server.ts* be small file wey just wired request handlers and every feature dem dey im own folder i.e tools/, resources/ or /prompts.

Good, make we try build this one next. 

## Exercise: Creating a low-level server

For dis exercise, we go do di following:

1. Create low-level server wey go manage listing tools and calling tools.
1. Build architecture wey you fit add more on top.
1. Add validation to make sure say your tool calls dey correct.

### -1- Create an architecture

The first tin we need na architecture wey go help us scale as we add more features, e be like dis:

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

Now we don build architecture wey go make am easy to add new tools inside tools folder. Feel free to add subdirectories for resources and prompts.

### -2- Creating a tool

Make we see how to create tool next. First e suppose dey inside *tool* subdirectory like dis:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Check di input wit Pydantic model
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: add Pydantic, so we fit create AddInputModel and check di args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Wetin we see here na how we define name, description, and input schema use Pydantic and handler wey go run once tool call happen. Last last, we expose `tool_add` wey be dictionary holding all dis properties.

Also get *schema.py* wey dey define input schema wey tool go use:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

We go also fill *__init__.py* to make sure tools directory treat like module. Plus, we need expose modules inside like dis:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

We fit keep adding for this file as we add more tools.

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

Here we create dictionary with dis properties:

- name, na di name of tool.
- rawSchema, na di Zod schema, e go validate incoming requests to call dis tool.
- inputSchema, dis schema go use inside handler.
- callback, dis dey call the tool.

Also get `Tool` wey dey convert dis dictionary to type wey mcp server handler fit accept and e look like dis:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Dem get *schema.ts* where we keep input schemas for each tool, e be like dis with only one schema now but as we add tools, we fit add more entries:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Good, make we continue to handle listing our tools next.

### -3- Handle tool listing

Next, to handle tool listing, we need setup request handler for dis. Dis na wetin we need add for our server file:

**Python**

```python
# code comot small make e short
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

Here, we add decorator `@server.list_tools` and function `handle_list_tools`. Inside the function, we need produce list of tools. Every tool need get name, description and inputSchema.   

**TypeScript**

To setup request handler for listing tools, we go call `setRequestHandler` on server with schema wey match wetin we wan do, for dis case na `ListToolsRequestSchema`. 

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
// code no show make e short
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Make e return di list of tools wey dem register
  return {
    tools: tools
  };
});
```

Good, now we don solve how to list tools, make we see how to call tools next.

### -4- Handle calling a tool

To call tool, we go setup another request handler, dis time na to handle request wey tell us which feature to call and with which arguments.

**Python**

Make we use decorator `@server.call_tool` and implement am with function `handle_call_tool`. For dis function, we go parse tool name, its arguments and make sure arguments valid for the tool. We fit either validate arguments for dis function or for inside actual tool.

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
        # use the tool
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Dis na wetin dey happen:

- Tool name dey as input parameter `name` and arguments dey inside `arguments` dictionary.

- Tool dey call with `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Arguments validation dey inside `handler` property wey point to function, if e fail e go throw exception. 

Now we don understand how to list and call tools using low-level server well well.

Check [full example](./code/README.md) here

## Assignment

Add plenty tools, resources and prompt to di code wey dem give you and notice how e be say you just dey add files inside tools directory, no need dey touch anywhere else. 

*No solution given*

## Summary

For dis chapter, we see how low-level server approach work and how e fit help us make nice architecture wey we fit keep add on top. We also talk about validation and show you how to work with validation libraries to create schemas for input validation.

## What's Next

- Next: [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->