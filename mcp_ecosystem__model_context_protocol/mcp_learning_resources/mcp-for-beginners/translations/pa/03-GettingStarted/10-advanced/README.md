# ਉੱਚ ਸਤਰ ਦਾ ਸਰਵਰ ਵਰਤੋਂ

MCP SDK ਵਿੱਚ ਦੋ ਵکھਰੇ ਪ੍ਰਕਾਰ ਦੇ ਸਰਵਰ ਪ੍ਰਦਰਸ਼ਿਤ ਹਨ, ਤੁਹਾਡਾ ਸਧਾਰਣ ਸਰਵਰ ਅਤੇ ਨੀਵੇਂ ਪੱਧਰ ਦਾ ਸਰਵਰ। ਆਮ ਤੌਰ 'ਤੇ, ਤੁਸੀਂ ਰੁਟੀਨ ਸਰਵਰ ਨੂੰ ਇਸ ਦੇ ਫੀਚਰਾਂ ਵਧਾਉਣ ਲਈ ਵਰਤਦੇ ਹੋ। ਕੁਝ ਮਾਮਲਿਆਂ ਵਿੱਚ, ਤੁਸੀਂ ਨੀਵੇਂ ਪੱਧਰ ਦੇ ਸਰਵਰ `ਤੇ ਭਰੋਸਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਜਿਵੇਂ ਕਿ:

- ਬਿਹਤਰੀਨ ਢਾਂਚਾ। ਦੋਹਾਂ ਰੁਟੀਨ ਸਰਵਰ ਅਤੇ ਨੀਵੇਂ ਪੱਧਰ ਦੇ ਸਰਵਰ ਨਾਲ ਸਾਫ਼ ਸੰਗਠਿਤ ਢਾਂਚਾ ਬਣਾਉਣਾ ਸੰਭਵ ਹੈ ਪਰ ਇਹ ਦਲੀਲ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ ਕਿ ਨੀਵੇਂ ਪੱਧਰ ਦੇ ਸਰਵਰ ਨਾਲ ਇਹ ਥੋੜ੍ਹਾ ਅਸਾਨ ਹੁੰਦਾ ਹੈ।
- ਫੀਚਰ ਉਪਲਬਧਤਾ। ਕੁਝ ਅਡਵਾਂਸ ਫੀਚਰ ਸਿਰਫ ਨੀਵੇਂ ਪੱਧਰ ਦੇ ਸਰਵਰ ਨਾਲ ਹੀ ਵਰਤੋਂ ਜੋਗੇ ਹੁੰਦੇ ਹਨ। ਤੁਸੀਂ ਇਹ ਅੱਗਲੇ ਅਧਿਆਇਆਂ ਵਿੱਚ ਵੇਖੋਗੇ ਜਦੋਂ ਅਸੀਂ ਸੈਂਪਲਿੰਗ ਅਤੇ ਇਲੀਸੀਟੇਸ਼ਨ ਜੋੜਾਂਗੇ।

## ਰੈਗੂਲਰ ਸਰਵਰ vs ਨੀਵੇਂ ਪੱਧਰ ਦਾ ਸਰਵਰ

ਇੱਥੇ ਇੱਕ MCP ਸਰਵਰ ਦੀ ਸਿਰਜਣਾ ਕਿਵੇਂ ਹੁੰਦੀ ਹੈ ਰੈਗੂਲਰ ਸਰਵਰ ਨਾਲ

**Python**

```python
mcp = FastMCP("Demo")

# ਇੱਕ ਜੋੜੋ ਸੰਦ ਜੋੜੋ
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

// ਇੱਕ ਜੋੜ ਟੂਲ ਸ਼ਾਮਿਲ ਕਰੋ
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

ਮਕਸਦ ਇਹ ਹੈ ਕਿ ਤੁਸੀਂ ਖਾਸ ਤੌਰ 'ਤੇ ਹਰ ਟੂਲ, ਸਰੋਤ ਜਾਂ ਪ੍ਰੰਪਟ ਜੋ ਤੁਸੀਂ ਸਰਵਰ ਵਿੱਚ ਸ਼ਾਮਿਲ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਉਸਨੂੰ ਜੋੜਦੇ ਹੋ। ਇਸ ਵਿੱਚ ਕੋਈ ਗਲਤੀ ਨਹੀਂ।  

### ਨੀਵੇਂ ਪੱਧਰ ਸਰਵਰ ਦ੍ਰਿਸ਼ਟੀਕੋਣ

ਪਰ ਜਦੋਂ ਤੁਸੀਂ ਨੀਵੇਂ ਪੱਧਰ ਦਾ ਸਰਵਰ ਵਰਤੋਂਗੇ, ਤਾਂ ਤੁਹਾਨੂੰ ਇਸ ਬਾਰੇ ਸੋਚ ਵੱਖਰਾ ਕਰਨ ਦੀ ਲੋੜ ਹੈ। ਹਰ ਟੂਲ ਰਜਿਸਟਰ ਕਰਨ ਦੀ ਥਾਂ, ਤੁਸੀਂ ਪ੍ਰਤੀ ਫੀਚਰ ਕਿਸਮ (ਟੂਲ, ਸਰੋਤਾਂ ਜਾਂ ਪ੍ਰੰਪਟਾਂ) ਲਈ ਦੋ ਹੈਂਡਲਰ ਬਣਾਉਂਦੇ ਹੋ। ਉਦਾਹਰਨ ਦੇ ਤੌਰ ਤੇ ਟੂਲਾਂ ਲਈ ਸਿਰਫ ਦੋ ਫੰਕਸ਼ਨ ਹੁੰਦੇ ਹਨ:

- ਸਾਰੇ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਬਣਾਉਣਾ। ਇੱਕ ਫੰਕਸ਼ਨ ਸਾਰੇ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਬਣਾਉਣ ਦੀ ਜ਼ਿੰਮੇਵਾਰੀ ਸੰਭਾਲੇਗਾ।
- ਸਾਰੇ ਟੂਲਾਂ ਨੂੰ ਕਾਲ ਕਰਨ ਨੂੰ ਸੰਭਾਲਣਾ। ਇੱਥੇ ਵੀ ਸਿਰਫ ਇੱਕ ਫੰਕਸ਼ਨ ਹੈ ਜੋ ਕਿਸੇ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨ ਦੀ ਸੰਭਾਲ ਕਰਦਾ ਹੈ।

ਇਹ ਸੰਭਾਵਤ ਤੌਰ 'ਤੇ ਘੱਟ ਕੰਮ ਜਾਪਦਾ ਹੈ, ਹੈ ਨਾ? ਇਸ ਲਈ ਟੂਲ ਨੂੰ ਰਜਿਸਟਰ ਕਰਨ ਦੀ ਥਾਂ, ਮੈਨੂੰ ਸਿਰਫ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣਾ ਹੈ ਕਿ ਸਾਰੇ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਬਣਾਉਂਦੇ ਸਮੇਂ ਉਹ ਟੂਲ ਉੱਥੇ ਹੈ ਅਤੇ ਜਦੋਂ ਟੂਲ ਕਾਲ ਕਰਨ ਲਈ ਕੋਈ ਬੀਨਤੀ ਆਉਂਦੀ ਹੈ ਤਾਂ ਉਹ ਕਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। 

ਆਓ ਹੁਣ ਦੇਖੀਏ ਕੋਡ ਹੁਣ ਕਿਵੇਂ ਦਿਸਦਾ ਹੈ:

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
  // ਰਜਿਸਟਰਡ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਵਾਪਸ ਕਰੋ
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

ਇੱਥੇ ਸਾਡੇ ਕੋਲ ਹੁਣ ਇੱਕ ਫੰਕਸ਼ਨ ਹੈ ਜੋ ਫੀਚਰਾਂ ਦੀ ਸੂਚੀ ਵਾਪਸ ਕਰਦਾ ਹੈ। ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਵਿੱਚ ਇੱਕੋ ਇੱਕ ਅਦਾਨ-ਪ੍ਰਦਾਨ ਹੁੰਦੇ ਹਨ ਜਿਵੇਂ `name`, `description` ਅਤੇ `inputSchema` ਤੱਕ ਮੁਕਾਬਲਾ ਕਰਨ ਲਈ। ਇਹ ਸਾਡੇ ਟੂਲਾਂ ਅਤੇ ਫੀਚਰ ਪਰਿਭਾਸ਼ਾ ਨੂੰ ਕਿਸੇ ਹੋਰ ਥਾਂ ਤੇ ਰੱਖਣ ਲਈ ਸਮਰੱਥ ਬਣਾਉਂਦਾ ਹੈ। ਹੁਣ ਅਸੀਂ ਸਾਰੇ ਟੂਲ ਮਾਪਾ ਹੇਠਾਂ ਟੂਲਜ਼ ਫੋਲਡਰ ਵਿੱਚ ਰੱਖ ਸਕਦੇ ਹਾਂ ਅਤੇ ਇਹੀ ਗੱਲ ਤੁਹਾਡੇ ਸਾਰੇ ਫੀਚਰਾਂ ਲਈ ਵੀ ਹੈ ਤਾਕੀ ਤੁਹਾਡਾ ਪ੍ਰੋਜੈਕਟ ਇਸ ਤਰ੍ਹਾਂ ਜੁੜਿਆ ਹੋਇਆ ਲੱਗੇ:

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

ਵਧੀਆ ਹੈ, ਸਾਡਾ ਢਾਂਚਾ ਕਾਫੀ ਸਾਫ਼ ਦਿੱਸ ਸਕਦਾ ਹੈ।

ਟੂਲ ਕਾਲ ਕਰਨ ਬਾਰੇ ਕੀ, ਕੀ ਇਹੋ ਹੀ ਵਿਚਾਰ ਹੈ, ਇੱਕ ਹੈਂਡਲਰ ਟੂਲ ਕਾਲ ਕਰਨ ਲਈ, ਜਿਸ ਵੀ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨਾ ਹੋਵੇ? ਹਾਂ, ਬ bilਕੁਲ, ਇਹ ਰਹਾ ਕੋਡ:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ਇੱਕ ਡਿਕਸ਼ਨਰੀ ਹੈ ਜਿਸ ਵਿੱਚ ਟੂਲ ਦੇ ਨਾਮ ਕੁੰਜੀਆਂ ਵੱਜੋਂ ਹਨ
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
    // ਕਰਨਾ ਹੈ ਟੂਲ ਨੂੰ ਕਾਲ,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

ਜਿਵੇਂ ਤੁਸੀਂ ਉਪਰੋਕਤ ਕੋਡ ਵਿੱਚ ਦੇਖ ਸਕਦੇ ਹੋ, ਸਾਨੂੰ ਕਾਲ ਕਰਨ ਲਈ ਟੂਲ ਨੂੰ ਅਤੇ ਕਿਹੜੇ ਆਰਗੁਮੈਂਟਸ ਨਾਲ ਕਾਲ ਕਰਨਾ ਹੈ ਉਸ ਨੂੰ ਵਿਭਾਜਿਤ ਕਰਨਾ ਪੈਂਦਾ ਹੈ, ਅਤੇ ਫਿਰ ਅਸੀਂ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨ ਲਈ ਅੱਗੇ ਵਧਦੇ ਹਾਂ।

## ਵੈਰੀਫਿਕੇਸ਼ਨ ਨਾਲ ਦ੍ਰਿਸ਼ਟੀਕੋਣ ਸੁਧਾਰਨਾ

ਹੁਣ ਤੱਕ, ਤੁਸੀਂ ਵੇਖਿਆ ਕਿ ਤੁਸੀਂ ਟੂਲ, ਸਰੋਤ ਅਤੇ ਪ੍ਰੰਪਟ ਨੂੰ ਸ਼ਾਮਿਲ ਕਰਨ ਲਈ ਹਰ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੂੰ ਦੋ ਹੈਂਡਲਰਾਂ ਨਾਲ ਬਦਲ ਸਕਦੇ ਹੋ। ਹੋਰ ਕੀ ਕਰਨ ਦੀ ਲੋੜ ਹੈ? ਸਾਡੇ ਕੋਲ ਕਿਸੇ ਨਾ ਕਿਸੇ ਪਰਕਾਰ ਦੀ ਵੈਲਿਡੇਸ਼ਨ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ ਤਾਂ ਜੋ ਇਹ ਯਕੀਨੀ ਬਣਾਇਆ ਜਾ ਸਕੇ ਕਿ ਟੂਲ ਨੂੰ ਸਹੀ ਤਰ੍ਹਾਂ ਆਰਗੁਮੈਂਟ ਦੇ ਕੇ ਕਾਲ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ। ਹਰ ਰਨਟਾਈਮ ਦਾ ਆਪਣਾ ਹੱਲ ਹੁੰਦਾ ਹੈ, ਉਦਾਹਰਨ ਲਈ Python ਵਿੱਚ Pydantic ਵਰਤੀ ਜਾਂਦੀ ਹੈ ਅਤੇ TypeScript ਵਿੱਚ Zod। ਵਿਚਾਰ ਇਹ ਹੈ ਕਿ ਅਸੀਂ ਹੇਠ ਲਿਖੇ ਕਾਰਜ ਕਰੀਏ:

- ਫੀਚਰ (ਟੂਲ, ਸਰੋਤ ਜਾਂ ਪ੍ਰੰਪਟ) ਬਣਾਉਣ ਦੀ ਲਾਜਿਕ ਨੂੰ ਇਸਦੇ ਸਮਰਪਿਤ ਫੋਲਡਰ ਵਿੱਚ ਲਿਜਾਓ।
- ਕਿਸੇ ਆਉਂਦੇ ਬੀਨਤੀ ਨੂੰ ਵੈਲਿਡੇਟ ਕਰਨ ਦਾ ਤਰੀਕਾ ਜੋ ਕਿ ਉਦਾਹਰਨ ਲਈ ਟੂਲ ਕਾਲ ਕਰਨ ਦੀ ਬੀਨਤੀ ਹੋਵੇ।

### ਫੀਚਰ ਬਣਾਉਣਾ

ਫੀਚਰ ਬਣਾਉਣ ਲਈ, ਸਾਨੂੰ ਉਸ ਫੀਚਰ ਲਈ ਇੱਕ ਫਾਈਲ ਬਣਾਉਣੀ ਹੋਵੇਗੀ ਅਤੇ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣਾ ਹੋਵੇਗਾ ਕਿ ਇਸ ਵਿੱਚ ਫੀਚਰ ਲਈ ਲਾਜ਼ਮੀ ਫੀਲਡ ਹਨ। ਜਿਹੜੇ ਫੀਲਡ ਟੂਲਾਂ, ਸਰੋਤਾਂ ਅਤੇ ਪ੍ਰੰਪਟਾਂ ਵਿੱਚ ਥੋੜ੍ਹੇ ਵੱਖਰੇ ਹੁੰਦੇ ਹਨ।

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
        # ਪਾਇਡੈਂਟਿਕ ਮਾਡਲ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇਨਪੁੱਟ ਦੀ ਜਾਂਚ ਕਰੋ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # ਕਰਨਾ ਹੈ: ਪਾਇਡੈਂਟਿਕ ਸ਼ਾਮਲ ਕਰੋ, ਤਾਂ ਜੋ ਅਸੀਂ ਇੱਕ AddInputModel ਬਣਾ ਸਕੀਏ ਅਤੇ ਆਰਗਜ਼ ਦੀ ਜਾਂਚ ਕਰ ਸਕੀਏ

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ਇੱਥੇ ਤੁਸੀਂ ਵੇਖ ਸਕਦੇ ਹੋ ਕਿ ਅਸੀਂ ਹੇਠ ਲਿਖੇ ਕੰਮ ਕਰ ਰਹੇ ਹਾਂ:

- Pydantic ਦਾ ਵਰਤੋਂ ਕਰਕੇ `AddInputModel` ਨਾਮ ਦਾ ਸਕੀਮਾ ਬਣਾਇਆ ਗਿਆ ਹੈ ਜਿਸ ਵਿੱਚ ਫੀਲਡ `a` ਤੇ `b` ਹਨ ਜਿਹੜਾ *schema.py* ਫਾਈਲ ਵਿੱਚ ਹੈ।
- ਆਉਣ ਵਾਲੀ ਬੀਨਤੀ ਨੂੰ `AddInputModel` ਪ੍ਰਕਾਰ ਦੇ ਤੌਰ 'ਤੇ ਪੈਰਸ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਹਾਂ, ਜੇ ਕਿਸੇ ਮਾਪਦੰਡ ਵਿੱਚ ਅੰਤਰ ਹੋਵੇ ਤਾਂ ਇਹ ਪਾਰਸ ਕਰਦਿਆਂ ਗਲਤੀ ਆਵੇਗੀ:

   ```python
   # add.py
    try:
        # ਪਾਇਡੈਂਟਿਕ ਮਾਡਲ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋਏ ਇੰਪੁੱਟ ਦੀ ਵੈਧਤਾ ਦੱਸੋ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

ਤੁਸੀਂ ਇਹ ਪਾਰਸਿੰਗ ਲਾਜਿਕ ਟੂਲ ਕਾਲ ਦੇ ਅੰਦਰ ਜਾਂ ਹੈਂਡਲਰ ਫੰਕਸ਼ਨ ਵਿੱਚ ਰੱਖ ਸਕਦੇ ਹੋ।

**TypeScript**

```typescript
// ਸਰਵਰ.ts
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

// ਸਕੀਮਾ.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// ਜੋੜੋ.ts
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

- ਸਾਰੇ ਟੂਲ ਕਾਲ ਦੇ ਹੈਂਡਲਰ ਵਿੱਚ, ਹੁਣ ਅਸੀਂ ਆਉਣ ਵਾਲੀ ਬੀਨਤੀ ਨੂੰ ਟੂਲ ਦੇ ਪਰਿਭਾਸ਼ਿਤ ਸਕੀਮਾ ਵਿੱਚ ਪੈਰਸ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਹਾਂ:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ਜੇ ਇਹ ਸਫਲ ਹੁੰਦਾ ਹੈ ਤਾਂ ਅਸੀਂ ਅਸਲ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਦੇ ਹਾਂ:

    ```typescript
    const result = await tool.callback(input);
    ```

ਤੁਸੀਂ ਦੇਖ ਸਕਦੇ ਹੋ ਕਿ ਇਹ ਦ੍ਰਿਸ਼ਟੀਕੋਣ ਇਕ ਬਹੁਤ ਵਧੀਆ ਢਾਂਚਾ ਬਣਾਉਂਦਾ ਹੈ ਕਿਉਂਕਿ ਹਰ ਚੀਜ਼ ਦਾ ਆਪਣਾ ਥਾਂ ਹੈ, *server.ts* ਇੱਕ ਛੋਟੀ ਫਾਈਲ ਹੈ ਜਿਸ ਵਿੱਚ ਸਿਰਫ ਬੀਨਤੀ ਹੈਂਡਲਰ ਵਾਇਰਿੰਗ ਹੈ ਅਤੇ ਹਰੇਕ ਫੀਚਰ ਆਪਣੇ ਆਪਣੀ ਫੋਲਡਰ ਵਿਚ ਹੁੰਦਾ ਹੈ ਜਿਵੇਂ ਕਿ tools/, resources/ ਜਾਂ prompts/।

ਵਧੀਆ, ਆਓ ਹੁਣ ਇਸ ਨੂੰ ਬਣਾਉਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੀਏ।

## ਕਸਰਤ: ਨੀਵੇਂ ਪੱਧਰ ਦਾ ਸਰਵਰ ਬਣਾਉਣਾ

ਇਸ ਕਸਰਤ ਵਿੱਚ, ਅਸੀਂ ਹੇਠ ਲਿਖੇ ਕਰਾਂਗੇ:

1. ਨੀਵੇਂ ਪੱਧਰ ਦਾ ਸਰਵਰ ਬਣਾਉਣਾ ਜੋ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਅਤੇ ਟੂਲਾਂ ਨੂੰ ਕਾਲ ਕਰਨ ਦੀ ਸੰਭਾਲ ਕਰੇ।
1. ਇੱਕ ਢਾਂਚਾ ਲਾਗੂ ਕਰਨਾ ਜਿਸ 'ਤੇ ਤੁਸੀਂ ਆਗੇ ਬਣਾਉਂ ਸਕੋ।
1. ਵੈਲਿਡੇਸ਼ਨ ਜੋੜਨਾ ਤਾਂ ਜੋ ਤੁਹਾਡੇ ਟੂਲ ਕਾਲ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਵੈਰੀਫਾਈ ਕੀਤੇ ਜਾ ਸਕਣ।

### -1- ਢਾਂਚਾ ਬਣਾਉਣਾ

ਸਭ ਤੋਂ ਪਹਿਲਾਂ, ਅਸੀਂ ਐਸਾ ਢਾਂਚਾ ਬਣਾਉਣਾ ਹੈ ਜੋ ਸਾਡੇ ਲਈ ਮੁਹੱਈਆ ਕਰੇ ਕਿ ਜਿੰਨੇ ਵੀ ਫੀਚਰ ਅਸੀਂ ਜੋੜ ਰਹੇ ਹਾਂ ਉਹ ਸੌਖੀ ਤਰ੍ਹਾਂ ਵਧ ਸਕਣ, ਇਹ ਇਸ ਤਰ੍ਹਾਂ ਦਿਸਦਾ ਹੈ:

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

ਹੁਣ ਅਸੀਂ ਇੱਕ ਢਾਂਚਾ ਸਜਾਇਆ ਹੈ ਜੋ ਯਕੀਨ ਦਿਲਾਊਂਦਾ ਹੈ ਕਿ ਅਸੀਂ ਆਸਾਨੀ ਨਾਲ ਨਵੇਂ ਟੂਲਾਂ ਨੂੰ tools ਫੋਲਡਰ ਵਿੱਚ ਜੋੜ ਸਕਦੇ ਹਾਂ। ਬੇਝਿਜਕ ਇਸਦਾ ਪਾਲਣ ਕਰਦੇ ਹੋਏ ਸਰੋਤਾਂ ਅਤੇ ਪ੍ਰੰਪਟਾਂ ਲਈ ਵੀ ਸਬਡਾਇਰੈਕਟਰੀ ਬਣਾਓ।

### -2- ਟੂਲ ਬਣਾਉਣਾ

ਅੱਗੇ ਦੇਖੀਏ ਕਿ ਟੂਲ ਬਣਾਉਣਾ ਕਿਵੇਂ ਲੱਗਦਾ ਹੈ। ਪਹਿਲਾਂ ਇਹ ਆਪਣੇ *tool* ਸਬਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਬਣਾਇਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ ਇਸ ਤਰ੍ਹਾਂ:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic ਮਾਡਲ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇਨਪੁਟ ਨੂੰ ਵੈਧ ਕਰੋ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ਜੋੜੋ, ਤਾਂ ਜੋ ਅਸੀਂ AddInputModel ਬਣਾ ਸਕੀਏ ਅਤੇ args ਦੀ ਸਹੀਤ ਜਾਂਚ ਕਰ ਸਕੀਏ

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ਇੱਥੇ ਅਸੀਂ ਦੇਖਦੇ ਹਾਂ ਕਿ ਅਸੀਂ ਨਾਂ, ਵੇਰਵਾ ਅਤੇ ਇਨਪੁਟ ਸਕੀਮਾ Pydantic ਵਰਤ ਕੇdefine ਕਰਦੇ ਹਾਂ ਅਤੇ ਹੈਂਡਲਰ ਜੋ ਇਸ ਟੂਲ ਨੂੰ ਕਾਲ ਕੀਤੇ ਜਾਣ ਤੇ ਚਲੇਗਾ। ਆਖਰਕਾਰ, ਅਸੀਂ `tool_add` ਨੂੰ ਇੱਕ ਡਿਕਸ਼ਨਰੀ ਵਜੋਂ ਸਾਂਝਾ ਕਰਦੇ ਹਾਂ ਜਿਸ ਵਿੱਚ ਇਹ ਸਾਰੇ ਗੁਣ ਹਨ।

ਇੱਥੇ *schema.py* ਵੀ ਹੈ ਜੋ ਸਾਡੇ ਟੂਲ ਲਈ ਇਨਪੁਟ ਸਕੀਮਾ ਪਰਿਭਾਸ਼ਿਤ ਕਰਨ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

ਸਾਨੂੰ *__init__.py* ਨੂੰ ਵੀ Populate ਕਰਨਾ ਪੈਂਦਾ ਹੈ ਤਾਂ ਜੋ ਟੂਲ ਡਾਇਰੈਕਟਰੀ ਮਾਡਿਊਲ ਵਜੋਂ ਮੰਨੀ ਜਾਵੇ। ਨਾਲ ਹੀ, ਅਸੀਂ ਅੰਦਰਲੀ ਮਾਡਿਊਲਜ਼ ਨੂੰ ਐਜ ਤਰ੍ਹਾਂ ਐਕਸਪੋਰਟ ਕਰਦੇ ਹਾਂ:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

ਅਸੀਂ ਇਸ ਫਾਈਲ ਵਿੱਚ ਜਿਵੇਂ ਜਿਵੇਂ ਜ਼ਰੂਰਤ ਹੋਵੇ ਟੂਲ ਸ਼ਾਮਿਲ ਕਰਦੇ ਜਾ ਸਕਦੇ ਹਾਂ।

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

ਇੱਥੇ ਅਸੀਂ ਇੱਕ ਡਿਕਸ਼ਨਰੀ ਬਣਾਉਂਦੇ ਹਾਂ ਜਿਸਦੇ ਅੰਦਰ ਇਹ ਗੁਣ ਹਨ:

- name, ਇਹ ਟੂਲ ਦਾ ਨਾਮ ਹੈ।
- rawSchema, ਇਹ Zod ਸਕੀਮਾ ਹੈ ਜੋ ਆਉਣ ਵਾਲੇ ਬੀਨਤੀਆਂ ਨੂੰ ਇਹ ਟੂਲ ਕਾਲ ਕਰਨ ਲਈ ਵੈਲਿਡੇਟ ਕਰੇਗਾ।
- inputSchema, ਇਹ ਸਕੀਮਾ ਹੈ ਜੋ ਹੈਂਡਲਰ ਦੁਆਰਾ ਵਰਤਿਆ ਜਾਵੇਗਾ।
- callback, ਇਹ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।

ਇੱਥੇ `Tool` ਹੈ ਜੋ ਇਸ ਡਿਕਸ਼ਨਰੀ ਨੂੰ MCP ਸਰਵਰ ਹੈਂਡਲਰ ਲਈ ਮਨਜ਼ੂਰਯੋਗ ਟਾਈਪ ਵਿੱਚ ਬਦਲਦਾ ਹੈ ਅਤੇ ਇਹ ਐਸਾ ਦਿਸਦਾ ਹੈ:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

ਅਤੇ *schema.ts* ਹੈ ਜਿੱਥੇ ਅਸੀਂ ਹਰ ਟੂਲ ਲਈ ਇਨਪੁਟ ਸਕੀਮਾਜ਼ ਸਾਂਭਦੇ ਹਾਂ ਜੋ ਇਸ ਤਰ੍ਹਾਂ ਦਿਸਦੇ ਹਨ, ਹਾਲਾਂਕਿ ਇਸ ਵਕਤ ਸਿਰਫ ਇੱਕ ਸਕੀਮਾ ਹੈ ਪਰ ਜਿਵੇਂ ਜਿਵੇਂ ਟੂਲ ਵੱਧਦੇ ਜਾਣਗੇ, ਜ਼ਰੂਰ ਹੋਰ ਸਕੀਮਾ ਵੀ ਸ਼ਾਮਿਲ ਕੀਤੇ ਜਾ ਸਕਦੇ ਹਨ:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ਵਧੀਆ, ਹੁਣ ਅਸੀਂ ਸਾਡੇ ਟੂਲਾਂ ਦੀ ਸੁਚੀ ਬਣਾਉਣ ਦੀ ਸੰਭਾਲ ਕਰਦੇ ਹਾਂ।

### -3- ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਸੰਭਾਲਣਾ

ਹੁਣ ਸਾਨੂੰ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਲਈ ਇੱਕ ਬੀਨਤੀ ਹੈਂਡਲਰ ਲਗਾਉਣਾ ਹੋਵੇਗਾ। ਸਾਡੇ ਸਰਵਰ ਫਾਈਲ에 ਹੇਠ ਲਿਖੜਾ ਜੋੜਨਾ ਹੈ:

**Python**

```python
# ਸੁਖਮਤਾ ਲਈ ਕੋਡ ਨੂੰ ਛੱਡ ਦਿੱਤਾ ਗਿਆ ਹੈ
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

ਇੱਥੇ ਅਸੀਂ ਡੈਕੋਰੇਟਰ `@server.list_tools` ਅਤੇ ਲਾਗੂ ਕਰਨ ਵਾਲਾ ਫੰਕਸ਼ਨ `handle_list_tools` ਜੋੜਦੇ ਹਾਂ। ਪਹਿਲੀ ਵਿਚ, ਸਾਨੂੰ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਤਿਆਰ ਕਰਨੀ ਹੁੰਦੀ ਹੈ। ਧਿਆਨ ਦੇਖੋ ਕਿ ਹਰ ਇੱਕ ਟੂਲ ਨੂੰ ਨਾਂਮ, ਵੇਰਵਾ ਅਤੇ inputSchema ਲੋੜੀਂਦੇ ਹਨ।   

**TypeScript**

ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਲਈ ਬੀਨਤੀ ਹੈਂਡਲਰ ਲਗਾਉਣ ਲਈ ਸਾਨੂੰ `setRequestHandler` ਨੂੰ ਸਰਵਰ ਤੇ ਕਾਲ ਕਰਨਾ ਪੈਂਦਾ ਹੈ ਜਿਸ ਵਿੱਚ ਸਕੀਮਾ ਹੁੰਦਾ ਹੈ ਜੋ ਅਸੀਂ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹਾਂ, ਇਸ ਕੇਸ ਵਿੱਚ `ListToolsRequestSchema`। 

```typescript
// ਇੰਡੈਕਸ.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// ਸਰਵਰ.ts
// ਸਾਰ ਸੰਕੁਚਿਤ ਕਰਨ ਲਈ ਕੋਡ ਛੱਡ ਦਿੱਤਾ
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // ਦਰਜ ਕਰਵਾਏ ਗਏ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਵਾਪਸ ਕਰੋ
  return {
    tools: tools
  };
});
```

ਵਧੀਆ, ਹੁਣ ਅਸੀਂ ਟੂਲਾਂ ਦੀ ਲਿਸਟਿੰਗ ਹੱਲ ਕਰ ਲਈ ਹੈ, ਦੂਜੇ ਪਾਸੇ ਦੇਖੀਏ ਕਿ ਅਸੀਂ ਕਿਵੇਂ ਟੂਲਾਂ ਨੂੰ ਕਾਲ ਕਰ ਸਕਦੇ ਹਾਂ।

### -4- ਟੂਲ ਕਾਲ ਕਰਨ ਦੀ ਸੰਭਾਲ

ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨ ਲਈ, ਸਾਨੂੰ ਇੱਕ ਹੋਰ ਬੀਨਤੀ ਹੈਂਡਲਰ ਲਗਾਉਣਾ ਪੈਂਦਾ ਹੈ, ਜੋ ਇਸ ਵਾਰੀ ਕਿਸ ਫੀਚਰ ਨੂੰ ਕਾਲ ਕਰਨਾ ਹੈ ਅਤੇ ਕਿਸ ਤਰ੍ਹਾਂ ਦੇ ਆਰਗੁਮੈਂਟਾਂ ਨਾਲ ਹੈ ਫੋਕਸ ਕਰਦਾ ਹੈ।

**Python**

ਆਓ ਡੈਕੋਰੇਟਰ `@server.call_tool` ਵਰਤ ਕੇ ਇਸ ਦਾ ਲਾਗੂ ਕਰੀਏ ਜਿਵੇਂ `handle_call_tool`। ਇਸ ਫੰਕਸ਼ਨ ਦੇ ਅੰਦਰ, ਸਾਨੂੰ ਟੂਲ ਦਾ ਨਾਮ, ਇਸ ਦਾ ਅਰਗੁਮੈਂਟ ਅਤੇ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣਾ ਪੈਂਦਾ ਹੈ ਕਿ ਆਰਗੁਮੈਂਟ ਟੂਲ ਲਈ ਵੈਧ ਹਨ। ਅਸੀਂ ਆਰਗੁਮੈਂਟ ਦੀ ਵੈਲਿਡੇਸ਼ਨ ਇਸ ਫੰਕਸ਼ਨ ਵਿੱਚ ਹੀ ਕਰ ਸਕਦੇ ਹਾਂ ਜਾਂ ਅਸਲ ਟੂਲ ਵਿੱਚ ਕਰਵਾ ਸਕਦੇ ਹਾਂ।

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ਇੱਕ ਡਿਕਸ਼ਨਰੀ ਹੈ ਜਿਸ ਵਿੱਚ ਟੂਲਾਂ ਦੇ ਨਾਮ ਕੁੰਜੀਆਂ ਵਜੋਂ ਹਨ
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ਟੂਲ ਨੂੰ ਕਾਲ ਕਰੋ
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

ਇੱਥੇ ਕੀ ਹੁੰਦਾ ਹੈ:

- ਸਾਡਾ ਟੂਲ ਨਾਮ ਪਹਿਲਾਂ ਹੀ ਇਨਪੁਟ ਪੈਰਾਮੀਟਰ `name` ਵਜੋਂ ਮੌਜੂਦ ਹੈ ਜੋ ਸਾਡੇ argument ਡਿੱਕਸ਼ਨਰੀ ਵਿੱਚ ਹੈ।

- ਟੂਲ ਕਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` ਨਾਲ। ਆਰਗੁਮੈਂਟ ਦੀ ਵੈਲਿਡੇਸ਼ਨ `handler` ਸੰਪਤੀ ਵਿੱਚ ਹੁੰਦੀ ਹੈ ਜੋ ਕਿ ਇੱਕ ਫੰਕਸ਼ਨ ਨੂੰ ਸੂਚਿਤ ਕਰਦਾ ਹੈ, ਜੇ ਇਹ ਅਸਫਲ ਰਹਿੰਦਾ ਹੈ ਤਾਂ ਇਹ ਇੱਕ ਗਲਤੀ_throw_ ਕਰਦਾ ਹੈ।

ਹੁਣ ਸਾਡੇ ਕੋਲ ਨੀਵੇਂ ਪੱਧਰ ਦੇ ਸਰਵਰ ਦੁਆਰਾ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਅਤੇ ਕਾਲ ਕਰਨ ਦੀ ਪੂਰੀ ਸਮਝ ਹੈ।

ਪੂਰਾ ਉਦਾਹਰਨ ਦੇਖੋ [ਇੱਥੇ](./code/README.md)

## ਅਸਾਈਨਮੈਂਟ

ਜੋ ਕੋਡ ਤੁਹਾਨੂੰ ਦਿੱਤਾ ਗਿਆ ਹੈ ਉਸਨੂੰ ਵਧਾਓ ਕਈ ਟੂਲਾਂ, ਸਰੋਤਾਂ ਅਤੇ ਪ੍ਰੰਪਟਾਂ ਨਾਲ ਅਤੇ ਵਿਚਾਰ ਕਰੋ ਕਿ ਕੇਵਲ ਤੁਹਾਨੂੰ tools ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਫਾਇਲਾਂ ਜੋੜਣ ਦੀ ਜ਼ਰੂਰਤ ਕਿਵੇਂ ਪੈਂਦੀ ਹੈ ਅਤੇ ਹੋਰ ਕਿੱਥੇ ਨਹੀਂ।

*ਕੋਈ ਹੱਲ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ*

## ਸਾਰ

ਇਸ ਅਧਿਆਇ ਵਿੱਚ, ਅਸੀਂ ਵੇਖਿਆ ਕਿ ਨੀਵੇਂ ਪੱਧਰ ਦੇ ਸਰਵਰ ਦਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ ਅਤੇ ਕਿਵੇਂ ਇਹ ਸਾਡੇ ਲਈ ਇੱਕ ਵਧੀਆ ਢਾਂਚਾ ਬਣਾਉਂਦਾ ਹੈ ਜਿਸ 'ਤੇ ਅਸੀਂ ਅੱਗੇ ਬਣਾਉਂ ਸਕਦੇ ਹਾਂ। ਅਸੀਂ ਵੈਲਿਡੇਸ਼ਨ ਬਾਰੇ ਵੀ ਚਰਚਾ ਕੀਤੀ ਅਤੇ ਦਰਸਾਇਆ ਕਿ ਕਿਵੇਂ ਵੈਲਿਡੇਸ਼ਨ ਲਾਇਬ੍ਰੇਰੀਜ਼ ਨਾਲ ਕੰਮ ਕਰਕੇ ਇਨਪੁਟ ਵੈਲਿਡੇਸ਼ਨ ਦੇ ਸਕੀਮਾਜ਼ ਬਣਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ।

## ਅੱਗੇ ਕੀ ਹੈ

- ਅੱਗੇ: [ਸਧਾਰਣ ਪ੍ਰਮਾਣਕਰਨ](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਡਿਸਕਲੇਮਰ**:  
ਇਹ ਦਸਤਾਵੇਜ਼ AI ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਨੁਵਾਦ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸ਼ੁੱਧਤਾ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮਰਥਤਾਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਪ੍ਰਮਾਣਿਕ ਸਰੋਤ ਵਜੋਂ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਗੰਭੀਰ ਜਾਣਕਾਰੀ ਲਈ ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਪ੍ਰਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤ ਫਹਿਮੀ ਜਾਂ ਭ੍ਰਮ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->