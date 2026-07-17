# ਉੱਨਤ ਸਰਵਰ ਵਰਤੋਂ

MCP SDK ਵਿੱਚ ਦੋ ਵੱਖ-ਵੱਖ ਕਿਸਮ ਦੇ ਸਰਵਰ ਉਪਲਬਧ ਹਨ, ਤੁਹਾਡਾ ਆਮ ਸਰਵਰ ਅਤੇ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ। ਆਮ ਤੌਰ 'ਤੇ, ਤੁਸੀਂ ਆਮ ਸਰਵਰ ਨੂੰ ਫੀਚਰ ਸ਼ਾਮਲ ਕਰਨ ਲਈ ਵਰਤੋਂ ਕਰਦੇ ਹੋ। ਪਰ ਕੁਝ ਹਾਲਤਾਂ ਵਿੱਚ, ਤੁਸੀਂ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ 'ਤੇ ਨਿਰਭਰ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਜਿਵੇਂ ਕਿ:

- ਬਿਹਤਰ ਆਰਕੀਟੈਕਚਰ। ਆਮ ਸਰਵਰ ਅਤੇ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ ਦੋਵਾਂ ਨਾਲ ਇੱਕ ਸਾਫ਼ ਆਰਕੀਟੈਕਚਰ ਬਣਾਈ ਜਾ ਸਕਦੀ ਹੈ ਪਰ ਕਹਿ ਸਕਦੇ ਹਾਂ ਕਿ ਇਹ ਥੋੜ੍ਹਾ ਅਸਾਨ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ ਨਾਲ ਹੁੰਦਾ ਹੈ।
- ਫੀਚਰ ਉਪਲਬਧਤਾ। ਕੁਝ ਉੱਨਤ ਫੀਚਰਾਂ ਸਿਰਫ਼ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ ਨਾਲ ਹੀ ਵਰਤੇ ਜਾ ਸਕਦੇ ਹਨ। ਤੁਸੀਂ ਇਹ ਬਾਅਦਲੇ ਅਧਿਆਇਆਂ ਵਿੱਚ ਵੇਖੋਗੇ ਜਦੋਂ ਅਸੀਂ ਸੈਂਪਲਿੰਗ (ਜੋ `2026-07-28` ਰਿਲੀਜ਼ ਉਮੀਦਵਾਰ ਵਿੱਚ ਡਿਪ੍ਰੀਕੇਟਡ ਹੈ) ਅਤੇ ਐਲਿਸੀਟੇਸ਼ਨ ਸ਼ਾਮਲ ਕਰਾਂਗੇ।

## ਆਮ ਸਰਵਰ ਬਨਾਮ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ

ਇਹ ਹੈ ਕਿਸ ਤਰ੍ਹਾਂ MCP ਸਰਵਰ ਬਣਾਉਣ ਲਈ ਆਮ ਸਰਵਰ ਵਰਤਨਾ ਦਿੱਸਦਾ ਹੈ

**Python**

```python
mcp = FastMCP("Demo")

# ਇੱਕ ਜੋੜਣ ਵਾਲਾ ਸੰਦ ਸ਼ਾਮਲ ਕਰੋ
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

ਮੁੱਦਾ ਇਹ ਹੈ ਕਿ ਤੁਸੀਂ ਖੁਦ ਵਿਸ਼ੇਸ਼ ਤੌਰ 'ਤੇ ਹਰ ਟੂਲ, ਸਰੋਤ ਜਾਂ ਪ੍ਰਾਂਪਟ ਜੁੜਦੇ ਹੋ ਜੋ ਤੁਸੀਂ ਸਰਵਰ 'ਚ ਦਿਖਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ। ਇਸ ਵਿੱਚ ਕੋਈ ਗਲਤ ਨਹੀਂ ਹੈ।  

### ਲੋਅ-ਲੇਵਲ ਸਰਵਰ ਅਪ੍ਰੋਚ

ਪਰ ਜਦੋਂ ਤੁਸੀਂ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ ਅਪ੍ਰੋਚ ਵਰਤਦੇ ਹੋ ਤਾਂ ਤੁਹਾਨੂੰ ਇਸ ਨੂੰ ਵੱਖਰੇ ਤਰੀਕੇ ਨਾਲ ਸੋਚਣਾ ਪੈਂਦਾ ਹੈ। ਹਰ ਫੀਚਰ ਕਿਸਮ (ਟੂਲ, ਸਰੋਤ ਜਾਂ ਪ੍ਰਾਂਪਟ) ਲਈ ਤੁਸੀਂ ਦੋ ਹੈਂਡਲਰ ਬਣਾਉਂਦੇ ਹੋ। ਉਦਾਹਰਨ ਵਜੋਂ ਟੂਲਾਂ ਲਈ ਸਿਰਫ ਦੋ ਫੰਕਸ਼ਨ ਹੁੰਦੇ ਹਨ:

- ਸਾਰੀਆਂ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਬਣਾਉਣਾ। ਇੱਕ ਫੰਕਸ਼ਨ ਸਾਰੇ ਟੂਲਾਂ ਨੂੰ ਸੂਚੀਬੱਧ ਕਰਨ ਦੀ ਜ਼ਿੰਮੇਵਾਰੀ ਲੈਂਦਾ ਹੈ।
- ਸਾਰੀਆਂ ਟੂਲਾਂ ਨੂੰ ਕਾਲ ਕਰਨ ਨੂੰ ਸੰਭਾਲਣਾ। ਇੱਥੇ ਵੀ, ਸਿਰਫ ਇੱਕ ਫੰਕਸ਼ਨ ਇੱਕ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨ ਦਾ ਕੰਮ ਕਰਦਾ ਹੈ।

ਇਹ ਸ਼ਾਇਦ ਘੱਟ ਕੰਮ ਵਾਂਗ ਲੱਗਦਾ ਹੈ, ਹੈ ਨਾ? ਇਸ ਲਈ ਟੂਲ ਨੂੰ ਰਜਿਸਟਰ ਕਰਨ ਦੀ ਬਜਾਏ, ਮੈਂ ਸਿਰਫ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹਾਂ ਕਿ ਜਦੋਂ ਸਭ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਬਣਾਈ ਜਾਵੇ ਉਸ ਵਿੱਚ ਟੂਲ ਲਿਸਟ ਕੀਤਾ ਹੋਵੇ ਅਤੇ ਜਦੋਂ ਟੂਲ ਕਾਲ ਕਰਨ ਦੀ ਬੇਨਤੀ ਆਵੇ ਤਾਂ ਉਹ ਕਾਲ ਕੀਤਾ ਜਾਵੇ। 

ਆਓ ਦੇਖੀਏ ਕਿ ਹੁਣ ਕੋਡ ਕਿਵੇਂ ਦਿੱਸਦਾ ਹੈ:

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
  // ਦਰਜ ਕੀਤੇ ਗਏ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਵਾਪਸ ਕਰੋ
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

ਹੁਣ ਸਾਡੇ ਕੋਲ ਇੱਕ ਫੰਕਸ਼ਨ ਹੈ ਜੋ ਫੀਚਰਾਂ ਦੀ ਸੂਚੀ ਵਾਪਸ ਕਰਦਾ ਹੈ। ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਵਿੱਚ ਹਰ ਐਂਟ੍ਰੀ ਵਿੱਚ ਓਹਲੇ ਖੇਤਰ ਹਨ ਜਿਵੇਂ `name`, `description` ਅਤੇ `inputSchema` ਜੋ ਵਾਪਸੀ ਕ੍ਰਮ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹਨ। ਇਸ ਨਾਲ ਸਾਡੇ ਟੂਲਾਂ ਅਤੇ ਫੀਚਰ ਪਰਿਭਾਸ਼ਾ ਨੂੰ ਕਿਸੇ ਹੋਰ ਜਗ੍ਹਾ ਰੱਖਣਾ ਸੌਖਾ ਹੁੰਦਾ ਹੈ। ਹੁਣ ਅਸੀਂ ਆਪਣੇ ਸਾਰੇ ਟੂਲਾਂ ਨੂੰ tools ਫੋਲਡਰ ਵਿੱਚ ਬਣਾਈਏ ਅਤੇ ਉਹੀ ਤਰ੍ਹਾਂ ਤੁਹਾਡੇ ਸਾਰੇ ਫੀਚਰ ਲਈ ਵੀ, ਤਾਂ ਜੋ ਤੁਹਾਡਾ ਪ੍ਰੋਜੈਕਟ ਅਚਾਨਕ ਇੰਝ ਸਜਿਆ ਜਾ ਸਕੇ:

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

ਇਹ ਵਧੀਆ ਹੈ, ਸਾਡੀ ਆਰਕੀਟੈਕਚਰ ਕਾਫ਼ੀ ਸਾਫ਼ ਦਿਸ ਸਕਦੀ ਹੈ।

ਟੂਲਾਂ ਨੂੰ ਕਾਲ ਕਰਨ ਦਾ ਕੀ? ਕੀ ਇਹੀ ਖ਼ਿਆਲ ਹੈ, ਸਿਰਫ਼ ਇੱਕ ਹੈਂਡਲਰ ਜੋ ਕਿਸੇ ਵੀ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਦਾ ਹੈ? ਹਾਂ, ਬਿਲਕੁਲ, ਇਹਦਾ ਕੋਡ ਇੱਥੇ ਹੈ:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ਇੱਕ ਡਿਕਸ਼ਨੇਰੀ ਹੈ ਜਿਸ ਵਿੱਚ ਟੂਲ ਦੇ ਨਾਂ ਕੁੰਜੀਆਂ ਵਜੋਂ ਹਨ
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
    // TODO ਸੰਦ ਨੂੰ ਕਾਲ ਕਰੋ,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

ਉੱਪਰ ਦਿੱਤੇ ਕੋਡ 'ਚ ਤੁਸੀਂ ਵੇਖ ਸਕਦੇ ਹੋ ਕਿ ਸਾਨੂੰ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨ ਲਈ ਤੇ ਉਸਦੇ ਕਿਸ ਆਰਗੁਮੇੰਟ ਨਾਲ ਹੋਣ ਦਾ ਪਾਰਸ ਕਰਨਾ ਪੈਂਦਾ ਹੈ, ਅਤੇ ਫਿਰ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨਾ ਪੈਂਦਾ ਹੈ।

## ਵੈਧਤਾ ਨਾਲ ਅਪ੍ਰੋਚ ਨੂੰ ਸੁਧਾਰਨਾ

ਤਕ, ਤੁਸੀਂ ਵੇਖਿਆ ਕਿ ਤੁਸੀਂ ਟੂਲ, ਸਰੋਤ ਅਤੇ ਪ੍ਰਾਂਪਟ ਸ਼ਾਮਲ ਕਰਨ ਲਈ ਦੋ ਹੈਂਡਲਰ ਜੋੜ ਸਕਦੇ ਹੋ ਜੋ ਹਰ ਇੱਕ ਫੀਚਰ ਕਿਸਮ ਲਈ। ਹੋਰ ਕੀ ਕਰਨ ਦੀ ਲੋੜ ਹੈ? ਸਾਨੂੰ ਇੱਕ ਕਿਸਮ ਦੀ ਵੈਧਤਾ ਜੋੜਣੀ ਚਾਹੀਦੀ ਹੈ ਤਾਂ ਜੋ ਯਕੀਨ ਬਣ ਸਕੇ ਟੂਲ ਸਹੀ ਆਰਗੁਮੇੰਟ ਨਾਲ ਕਾਲ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ। ਹਰ ਰਨਟਾਈਮ ਦਾ ਖੁਦ ਦਾ ਹੱਲ ਹੈ, ਉਦਾਹਰਨ ਵਜੋਂ Python ਪਾਇਡੈਂਟਿਕ ਵਰਤਦਾ ਹੈ ਅਤੇ TypeScript Zod ਵਰਤਦਾ ਹੈ। ਵਿਚਾਰ ਇਹ ਹੈ ਕਿ ਅਸੀਂ ਹੇਠਾਂ ਦਿੱਤੇ ਕਰੀਏ:

- ਕਿਸੇ ਫੀਚਰ (ਟੂਲ, ਸਰੋਤ ਜਾਂ ਪ੍ਰਾਂਪਟ) ਬਣਾਉਣ ਲਈ ਲਾਜ਼ਮੀ ਫੋਲਡਰ ਵਿੱਚ ਲਾਜਿਕ ਲਿਜਾਇਏ।
- ਆਉਣ ਵਾਲੀ ਬੇਨਤੀ ਦੀ ਵੈਧਤਾ ਕਰਨ ਦੀ ਤਰੀਕਾ ਜੋੜੋ, ਜਿਵੇਂ ਕਿ ਟੂਲ ਕਾਲ ਕਰਨ ਦੀ ਬੇਨਤੀ।

### ਫੀਚਰ ਬਣਾਓ

ਫੀਚਰ ਬਣਾਉਣ ਲਈ, ਅਸੀਂ ਉਸ ਫੀਚਰ ਲਈ ਇੱਕ ਫਾਇਲ ਬਣਾਉਣੀ ਪਏਗੀ ਅਤੇ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣਾ ਪਏਗਾ ਕਿ ਇਸ ਵਿੱਚ ਲਾਜ਼ਮੀ ਖੇਤਰ ਹਨ ਜੋ ਫੀਚਰ ਲਈ ਚਾਹੀਦੇ ਹਨ। ਇਹ ਖੇਤਰ ਟੂਲਾਂ, ਸਰੋਤਾਂ ਅਤੇ ਪ੍ਰਾਂਪਟਾਂ ਵਿੱਚ ਥੋੜ੍ਹੇ ਜਿਹੇ ਵੱਖਰੇ ਹੁੰਦੇ ਹਨ।

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
        # Pydantic ਮਾਡਲ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇਨਪੁੱਟ ਦੀ ਤਸਦੀਕ ਕਰੋ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ਸ਼ਾਮਲ ਕਰੋ, ਤਾਂ ਜੋ ਅਸੀਂ AddInputModel ਬਣਾਉਂ ਅਤੇ args ਦੀ ਤਸਦੀਕ ਕਰ ਸਕੀਏ

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ਇੱਥੇ ਤੁਸੀਂ ਦੇਖ ਸਕਦੇ ਹੋ ਕਿ ਅਸੀਂ ਥੱਲੇ ਕੀ ਕਰ ਰਹੇ ਹਾਂ:

- ਪਾਇਡੈਂਟਿਕ ਨਾਲ `AddInputModel` ਸਕੀਮਾ ਬਣਾਉਣਾ ਜਿਸ ਵਿੱਚ ਖੇਤਰ `a` ਅਤੇ `b` ਹਨ ਫਾਇਲ *schema.py* ਵਿੱਚ।
- ਆਉਣ ਵਾਲੀ ਬੇਨਤੀ ਨੂੰ `AddInputModel` ਕਿਸਮ ਵਿੱਚ ਪਾਰਸ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ, ਜੇ ਪੈਰਾਮੀਟਰਾਂ ਵਿੱਚ ਨਾ ਮਿਲਾਪ ਹੋਵੇ ਤਾਂ ਇਹ ਟੁੱਟ ਜਾਵੇਗਾ:

   ```python
   # add.py
    try:
        # Pydantic ਮਾਡਲ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇਨਪੁੱਟ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

ਤੁਸੀਂ ਚੁਣ ਸਕਦੇ ਹੋ ਕਿ ਇਹ ਪਾਰਸਿੰਗ ਲਾਜ਼ਿਕ ਟੂਲ ਕਾਲ ਵਿੱਚ ਰੱਖਨੀ ਹੈ ਜਾਂ ਹੈਂਡਲਰ ਫੰਕਸ਼ਨ ਵਿੱਚ।

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

- ਸਾਰੇ ਟੂਲ ਕਾਲਾਂ ਨੂੰ ਹੈਂਡਲ ਕਰਨ ਵਾਲੇ ਹੈਂਡਲਰ ਵਿੱਚ, ਹੁਣ ਅਸੀਂ ਆਉਣ ਵਾਲੀ ਬੇਨਤੀ ਨੂੰ ਟੂਲ ਦੇ ਪਰਿਭਾਸ਼ਿਤ ਸਕੀਮਾ ਵਿੱਚ ਪਾਰਸ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਹਾਂ:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ਜੇ ਇਹ ਸਫਲ ਹੋ ਜਾਵੇ ਤਾਂ ਅਸੀਂ ਵਾਸਤਵਿਕ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਦੇ ਹਾਂ:

    ```typescript
    const result = await tool.callback(input);
    ```

ਜਿਵੇਂ ਤੁਸੀਂ ਵੇਖ ਸਕਦੇ ਹੋ, ਇਹ ਅਪ੍ਰੋਚ ਇੱਕ ਵਧੀਆ ਆਰਕੀਟੈਕਚਰ ਬਣਾਉਂਦੀ ਹੈ ਕਿਉਂਕਿ ਹਰ ਚੀਜ਼ ਲਈ ਜਗ੍ਹਾ ਹੈ, *server.ts* ਇੱਕ ਬਹੁਤ ਛੋਟੀ ਫਾਇਲ ਹੈ ਜੋ ਸਿਰਫ ਬੇਨਤੀ ਹੈਂਡਲਰਾਂ ਨੂੰ ਜੋੜਦਾ ਹੈ ਅਤੇ ਹਰ ਫੀਚਰ ਆਪਣੇ ਅਪਨੀ ਫੋਲਡਰ ਵਿੱਚ ਹੈ ਯਾਨੀ tools/, resources/ ਜਾਂ /prompts ਵਿੱਚ।

ਵਧੀਆ, ਚਲੋ ਅੱਗੇ ਇਸ ਨੂੰ ਬਣਾਉਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੀਏ। 

## ਅਭਿਆਸ: ਇੱਕ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ ਬਣਾਉਣਾ

ਇਸ ਅਭਿਆਸ ਵਿੱਚ, ਅਸੀਂ ਹੇਠਾਂ ਦਿੱਤੇ ਕੰਮ ਕਰਾਂਗੇ:

1. ਇੱਕ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ ਬਣਾਉਣਾ ਜੋ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਅਤੇ ਕਾਲਿੰਗ ਦਾ ਪ੍ਰਬੰਧ ਕਰਦਾ ਹੋਵੇ।
1. ਇੱਕ ਅਜਿਹਾ ਆਰਕੀਟੈਕਚਰ ਲਾਗੂ ਕਰਨਾ ਜਿਸ 'ਤੇ ਤੁਸੀਂ ਅੱਗੇ ਤਾਂਅਰ ਕਰ ਸਕੋ।
1. ਵੈਧਤਾ ਜੋੜੋ ਤਾਂ ਜੋ ਤੁਹਾਡੇ ਟੂਲ ਕਾਲ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਵੈਧ ਹੋਣ।

### -1- ਇੱਕ ਆਰਕੀਟੈਕਚਰ ਬਣਾਉਣਾ

ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਸਾਨੂੰ ਇੱਕ ਐਸਾ ਆਰਕੀਟੈਕਚਰ ਬਣਾਉਣਾ ਹੈ ਜੋ ਜਦੋਂ ਅਸੀਂ ਹੋਰ ਫੀਚਰ ਸ਼ਾਮਲ ਕਰੀਏ ਤਾਂ ਅਸਾਨੀ ਨਾਲ ਵਧ ਸਕੇ, ਇਸ ਤਰ੍ਹਾਂ ਇਹ ਦਿਸਦਾ ਹੈ:

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

ਹੁਣ ਅਸੀਂ ਇੱਕ ਐਸਾ ਆਰਕੀਟੈਕਚਰ ਸੈਟਅਪ ਕਰ ਚੁੱਕੇ ਹਾਂ ਜੋ ਯਕੀਨ ਦਿਵਾਉਂਦਾ ਹੈ ਕਿ ਅਸੀਂ ਆਸਾਨੀ ਨਾਲ ਨਵੇਂ ਟੂਲਆਂ ਨੂੰ tools ਫੋਲਡਰ ਵਿੱਚ ਜੋੜ ਸਕਦੇ ਹਾਂ। ਤੁਸੀਂ ਇਸ ਤਰ੍ਹਾਂ ਹੀ resources ਅਤੇ prompts ਲਈ ਸਬਡਾਇਰੈਕਟਰੀਆਂ ਵੀ ਜੋੜ ਸਕਦੇ ਹੋ।

### -2- ਇੱਕ ਟੂਲ ਬਣਾਉਣਾ

ਆਓ ਵੇਖੀਏ ਅਗਲਾ ਟੂਲ ਬਣਾਉਣਾ ਕਿਵੇਂ ਦਿਸਦਾ ਹੈ। ਪਹਿਲਾਂ ਇਹ Apੂਰੇ ਟੂਲ ਦੀ ਸਬਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਬਣਾਉਣਾ ਪੈਂਦਾ ਹੈ ਜਿਵੇਂ:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # ਪਾਈਡੈਂਟਿਕ ਮਾਡਲ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇਨਪੁਟ ਨੂੰ ਸਹੀ ਜਾਂਚੋ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: ਪਾਈਡੈਂਟਿਕ ਸ਼ਾਮਲ ਕਰੋ, ਤਾਂ ਜੋ ਅਸੀਂ ਇੱਕ AddInputModel ਬਣਾ ਸਕੀਏ ਅਤੇ ਆਰਗਾਂ ਨੂੰ ਵੈਧ ਕਰ ਸਕੀਏ

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ਇੱਥੇ ਅਸੀਂ ਦੇਖਦੇ ਹਾਂ ਕਿ ਅਸੀਂ ਨਾਮ, ਵਰਣਨ ਅਤੇ ਇਨਪੁੱਟ ਸਕੀਮਾ ਪਾਇਡੈਂਟਿਕ ਨਾਲ ਕਿਵੇਂ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦੇ ਹਾਂ ਅਤੇ ਇੱਕ ਹੈਂਡਲਰ ਜੋ ਟੂਲ ਕਾਲ ਹੋਣ ਤੇ ਚਲਦਾ ਹੈ। ਇੰਨਾਂ ਗੁਣਾਂ ਨੂੰ `tool_add` ਵਿੱਚ ਦਿੱਤਾ ਗਿਆ ਹੈ ਜੋ ਇੱਕ ਡਿਕਸ਼ਨਰੀ ਹੈ।

ਇੱਥੇ *schema.py* ਵੀ ਹੈ ਜੋ ਟੂਲ ਵੱਲੋਂ ਵਰਤੇ ਜਾਣ ਵਾਲੇ ਇਨਪੁੱਟ ਸਕੀਮਾ ਨੂੰ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦਾ ਹੈ:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

ਅਸੀਂ *__init__.py* ਫਾਇਲ ਭਰਣੀ ਪਈ ਜਾਂਦੀ ਹੈ ਤਾਂ ਜੋ tools ਡਾਇਰੈਕਟਰੀ ਨੂੰ ਮੋਡੀਊਲ ਵਜੋਂ ਮੰਨਿਆ ਜਾ ਸਕੇ। ਨਾਲ ਹੀ ਅਸੀਂ ਮੋਡੀਊਲਾਂ ਨੂੰ ਬਾਹਰ ਖੋਲ੍ਹਦੇ ਹਾਂ ਜਿਵੇਂ:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

ਜਿਵੇਂ ਅਸੀਂ ਹੋਰ ਟੂਲ ਜੋੜਦੇ ਜਾਵਾਂਗੇ, ਅਸੀਂ ਇਸ ਫਾਇਲ ਵਿੱਚ ਹੋਰ ਗੁਣ ਵੀ ਸ਼ਾਮਲ ਕਰਾਂਗੇ।

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

ਇੱਥੇ ਅਸੀਂ ਉਹ ਗੁਣ ਡਿਕਸ਼ਨਰੀ ਵਿੱਚ ਰੱਖਦੇ ਹਾਂ ਜੋ ਕਿ ਹਨ:

- name, ਇਹ ਟੂਲ ਦਾ ਨਾਮ ਹੈ।
- rawSchema, ਇਹ Zod ਸਕੀਮਾ ਹੈ ਜੋ ਆਉਣ ਵਾਲੀ ਟੂਲ ਕਾਲ ਬੇਨਤੀ ਦੀ ਪ੍ਰਮਾਣਿਕਤਾ ਲਈ ਵਰਤੀ ਜਾਵੇਗੀ।
- inputSchema, ਇਹ ਹੈਂਡਲਰ ਵੱਲੋਂ ਵਰਤੀ ਜਾਵੇਗੀ।
- callback, ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨ ਲਈ।

ਇੱਥੇ `Tool` ਵੀ ਹੈ ਜੋ ਇਸ ਡਿਕਸ਼ਨਰੀ ਨੂੰ ਉਸ ਕਿਸਮ ਵਿੱਚ ਬਦਲਦਾ ਹੈ ਜੋ MCP ਸਰਵਰ ਹੈਂਡਲਰ ਸਵੀਕਾਰ ਕਰ ਸਕਦਾ ਹੈ ਅਤੇ ਇਹ ਇਸ ਤਰ੍ਹਾਂ ਹੈ:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

ਅਤੇ ਇੱਥੇ *schema.ts* ਹੈ ਜਿੱਥੇ ਅਸੀਂ ਹਰ ਟੂਲ ਦੇ ਇਨਪੁੱਟ ਸਕੀਮਾਂ ਸਟੋਰ ਕਰਦੇ ਹਾਂ, ਇਸ ਸਮੇਂ ਇਕੱਲਾ ਇੱਕ ਸਕੀਮਾ ਹੈ ਪਰ ਜਿਵੇਂ ਅਸੀਂ ਹੋਰ ਟੂਲ ਸ਼ਾਮਲ ਕਰਾਂਗੇ ਐਸਾ ਕਰਾਂਗੇ:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ਸੋ, ਚਲੋ ਅਗਲਾ ਕੰਮ ਕਰੀਏ - ਸਾਡੇ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਦਾ ਸੰਭਾਲ ਕਰਨਾ।

### -3- ਟੂਲ ਸੂਚੀ ਦਾ ਸੰਭਾਲ

ਹੁਣ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਸੰਭਾਲਣ ਲਈ ਅਸੀਂ ਇੱਕ ਬੇਨਤੀ ਹੈਂਡਲਰ ਸੈੱਟ ਕਰਨਾ ਹੈ। ਏਹੋ ਕੰਮ ਕਰਨ ਲਈ ਸਾਡੀ ਸਰਵਰ ਫਾਇਲ ਵਿੱਚ ਇਹ ਜੋੜਨਾ ਹੁੰਦਾ ਹੈ:

**Python**

```python
# ਸੰਖੇਪ ਲਈ ਕੋਡ ਛੱਡ ਦਿੱਤਾ ਗਿਆ
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

ਇੱਥੇ ਅਸੀਂ ਡੈਕੋਰੇਟਰ `@server.list_tools` ਜੋੜਦੇ ਹਾਂ ਅਤੇ ਇਸਦੇ ਥੱਲੇ `handle_list_tools` ਫੰਕਸ਼ਨ ਲਿਖਦੇ ਹਾਂ। ਇਸਨੂੰ ਸਾਰੀਆਂ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਤਿਆਰ ਕਰਨੀ ਪੈਂਦੀ ਹੈ। ਧਿਆਨ ਦਿਓ ਹਰ ਟੂਲ ਵਿੱਚ ਨਾਮ, ਵਰਣਨ ਅਤੇ inputSchema ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।   

**TypeScript**

ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਲਈ ਬੇਨਤੀ ਹੈਂਡਲਰ ਸੈੱਟ ਕਰਨ ਲਈ, ਅਸੀਂ ਸਰਵਰ 'ਤੇ `setRequestHandler` ਕਾਲ ਕਰਦੇ ਹਾਂ ਜਿਸ ਵਿੱਚ ਉਹ ਸਕੀਮਾ ਹੁੰਦਾ ਹੈ ਜੋ ਸਾਡੀ ਬੇਨਤੀ ਲਈ ਅਨੁਕੂਲ ਹੁੰਦਾ ਹੈ, ਇੱਥੇ `ListToolsRequestSchema` ਵਰਤਿਆ ਜਾ ਰਿਹਾ ਹੈ। 

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
// ਸੰਖੇਪ ਲਈ ਕੋਡ ਛੱਡ ਦਿੱਤਾ ਗਿਆ
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // ਦਰਜ ਕੀਤੀਆਂ ਟੂਲਜ਼ ਦੀ ਸੂਚੀ ਵਾਪਸ ਕਰੋ
  return {
    tools: tools
  };
});
```

ਵਧੀਆ, ਹੁਣ ਸਾਨੂੰ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਕਰਨ ਦਾ ਹੱਲ ਮਿਲ ਗਿਆ ਹੈ, ਚਲੋ ਦੇਖੀਏ ਕਿਵੇਂ ਅਸੀਂ ਟੂਲਾਂ ਨੂੰ ਕਾਲ ਕਰ ਸਕਦੇ ਹਾਂ।

### -4- ਟੂਲ ਕਾਲ ਦਾ ਸੰਭਾਲ

ਟੂਲ ਕਾਲ ਕਰਨ ਲਈ, ਅਸੀਂ ਇੱਕ ਹੋਰ ਬੇਨਤੀ ਹੈਂਡਲਰ ਸੈੱਟ ਕਰਨਾ ਹੈ ਜੋ ਇਹ ਪਤਾ ਲਗਾਉਂਦਾ ਹੈ ਕਿ ਕਿਹੜਾ ਫੀਚਰ ਕਾਲ ਕਰਨਾ ਹੈ ਅਤੇ ਕਿਹੜੇ ਆਰਗੁਮੇੰਟ ਹਨ।

**Python**

ਚਲੋ ਡੈਕੋਰੇਟਰ `@server.call_tool` ਵਰਤਦੇ ਹਾਂ ਅਤੇ ਇਸ ਨੂੰ ਲਿਖੀਏ ਇਕ ਫੰਕਸ਼ਨ `handle_call_tool` ਜਿਸ ਵਿੱਚ ਅਸੀਂ ਟੂਲ ਦਾ ਨਾਮ, ਇਸਦਾ ਆਰਗੁਮੇੰਟ ਪਾਰਸ ਕਰਦੇ ਹਾਂ ਅਤੇ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਾਂ ਕਿ ਇਹ ਆਰਗੁਮੇੰਟ ਟੂਲ ਲਈ ਵੈਧ ਹਨ। ਅਸੀਂ ਚਾਹੇ ਤਾਂ ਇਸ ਵੈਧਤਾ ਨੂੰ ਇਸ ਫੰਕਸ਼ਨ ਵਿੱਚ ਕਰ ਸਕਦੇ ਹਾਂ ਜਾਂ ਅਸਲੀ ਟੂਲ 'ਚ ਵੀ ਕਰ ਸਕਦੇ ਹਾਂ।

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ਇੱਕ ਡਿਕਸ਼ਨਰੀ ਹੈ ਜਿਸ ਵਿੱਚ ਟੂਲ ਦੇ ਨਾਮ ਕੁੰਜੀਆਂ ਵਜੋਂ ਹਨ
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

ਇਹ ਹੈ ਜੋ ਹੋ ਰਿਹਾ ਹੈ:

- ਸਾਡਾ ਟੂਲ ਨਾਮ ਪਹਿਲਾਂ ਹੀ ਇਨਪੁੱਟ ਪੈਰਾਮੀਟਰ `name` ਵਜੋਂ ਹੈ ਜੋ ਸਾਡੇ arguments ਡਿਕਸ਼ਨਰੀ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ।

- ਟੂਲ ਨੂੰ ਕਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` ਨਾਲ। ਆਰਗੁਮੇੰਟ ਦੀ ਵੈਧਤਾ `handler` ਗੁਣ ਵਿੱਚ ਹੁੰਦੀ ਹੈ ਜੋ ਫੰਕਸ਼ਨ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ, ਜੇ ਨਾਕਾਮ ਹੋਇਆ ਤਾਂ ਇਹ ਇੱਕ ਐਕਸਪਸ਼ਨ ਉੱਠਾਏਗਾ। 

ਹੁਣ ਸਾਡੇ ਕੋਲ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ ਨਾਲ ਟੂਲਾਂ ਦੀ ਸੂਚੀ ਅਤੇ ਕਾਲ ਕਰਨ ਦਾ ਪੂਰਾ ਸਮਝ ਹੈ।

ਪੂਰਾ ਉਦਾਹਰਨ ਇੱਥੇ ਵੇਖੋ: [full example](./code/README.md)

## ਅਸਾਈਨਮੈਂਟ

ਤੁਸੀਂ ਦਿੱਤੇ ਕੋਡ ਨੂੰ ਕੁਝ ਹੋਰ ਟੂਲ, ਸਰੋਤ ਅਤੇ ਪ੍ਰਾਂਪਟ ਨਾਲ ਵਧਾਓ ਅਤੇ ਧਿਆਨ ਦਿਓ ਕਿ ਤੁਹਾਨੂੰ ਸਿਰਫ tools ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਫਾਇਲਾਂ ਜੋੜਣੀਆਂ ਪੈਂਦੀਆਂ ਹਨ ਤੇ ਕਿਸੇ ਹੋਰ ਜਗ੍ਹਾ ਨਹੀਂ। 

*ਕੋਈ ਹੱਲ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ*

## ਸਾਰ

ਇਸ ਅਧਿਆਇ ਵਿੱਚ, ਅਸੀਂ ਵੇਖਿਆ ਕਿ ਲੋਅ-ਲੇਵਲ ਸਰਵਰ ਅਪ੍ਰੋਚ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ ਅਤੇ ਇਹ ਕਿਵੇਂ ਸਾਡੇ ਲਈ ਇੱਕ ਵਧੀਆ ਆਰਕੀਟੈਕਚਰ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ ਜਿਸ 'ਤੇ ਅਸੀਂ ਅੱਗੇ ਵੀ ਕੰਮ ਜਾਰੀ ਰੱਖ ਸਕਦੇ ਹਾਂ। ਅਸੀਂ ਵੈਧਤਾ ਬਾਰੇ ਵੀ ਗੱਲ ਕੀਤੀ ਅਤੇ ਤੁਹਾਨੂੰ ਦਿਖਾਇਆ ਕਿ ਕਿਵੇਂ ਵੈਧਤਾ ਲਾਇਬ੍ਰੇਰੀਆਂ ਨਾਲ ਕੰਮ ਕਰਕੇ ਇਨਪੁੱਟ ਵੈਧਤਾ ਲਈ ਸਕੀਮਾਂ ਬਣਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ।

## ਅਗਲਾ ਕੀ ਹੈ

- ਅਗਲਾ: [ਸਾਦਾ ਪ੍ਰਮਾਣੀਕਰਨ](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->