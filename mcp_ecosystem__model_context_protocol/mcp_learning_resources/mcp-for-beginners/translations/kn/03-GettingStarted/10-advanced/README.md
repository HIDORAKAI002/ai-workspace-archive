# ಪ್ರಗತಿಶೀಲ ಸರ್ವರ್ ಬಳಕೆ

MCP SDK ನಲ್ಲಿ ಎರಡು ವಿಭಿನ್ನ ರೀತಿಯ ಸರ್ವರ್‌ಗಳು ಅನಾವರಣಗೊಂಡಿವೆ, ನಿಮ್ಮ ಸಾಮಾನ್ಯ ಸರ್ವರ್ ಮತ್ತು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್. ಸಾಮಾನ್ಯವಾಗಿ, ನೀವು ಸಾಮಾನ್ಯ ಸರ್ವರ್ ಅನ್ನು ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಸೇರಿಸಲು ಬಳಸುತ್ತೀರಿ. ಆದರೆ ಕೆಲವು ಸಂದರ್ಭಗಳಲ್ಲಿ, ನೀವು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಮೇಲೆ ಅವಲಂಬಿಸಲು ಇಚ್ಛಿಸುತ್ತೀರಿ, ಉದಾಹರಣೆಗೆ:

- ಉತ್ತಮ ವಾಸ್ತುಶಿಲ್ಪ: ಸಾಮಾನ್ಯ ಸರ್ವರ್ ಮತ್ತು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಎರಡನ್ನೂ ಬಳಸಿಕೊಂಡು ಸ್ವಚ್ಛವಾದ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಸೃಷ್ಟಿಸುವುದು ಸಾಧ್ಯವಾಗಿದ್ದರೂ, ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಬಳಕೆಗಾಗಿ ಅದು ಸ್ವಲ್ಪ ಸುಲಭವಾಗಿದೆ ಎಂದು ಹೇಳಬಹುದು.
- ವೈಶಿಷ್ಟ್ಯಗಳ ಲಭ್ಯತೆ: ಕೆಲ ಪ್ರಗತಿಶೀಲ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಕೇವಲ ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಮೂಲಕ ಮಾತ್ರ ಉಪಯೋಗಿಸಬಹುದು. ನಾವು ಸ್ವಲ್ಪ ನಂತರದ ಅಧ್ಯಾಯಗಳಲ್ಲಿ ಮಾದರೀಕರಣ ಮತ್ತು ಪ್ರೇರಣೆಯನ್ನು ಸೇರಿಸುವಾಗ ಇದನ್ನು ಕಾಣುವಿರಿ.

## ಸಾಮಾನ್ಯ ಸರ್ವರ್ ವಿರುದ್ಧ ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್

ಸಾಮಾನ್ಯ ಸರ್ವರ್ ಬಳಸಿ MCP ಸರ್ವರ್ ಸೃಷ್ಟಿಸುವುದು ಹೀಗಿದೆ:

**Python**

```python
mcp = FastMCP("Demo")

# ಒಂದು ಸೇರ್ಪಡೆ ಸಾಧನವನ್ನು ಸೇರಿಸಿ
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

// ಒಂದು ಸೇರಿಸುವ ಸಾಧನೆಯನ್ನು ಸೇರಿಸಿ
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

ಮುಖ್ಯ ವಿಷಯವೆಂದರೆ ನೀವು ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತಿಯೊಂದು ಟೂಲ್, ಸಂಪನ್ಮೂಲ ಅಥವಾ ಪ್ರಾಂಪ್ಟ್ ಅನ್ನು ಸರ್ವರ್‌ಗೆ ಸೇರಿಸುತ್ತೀರಿ. ಇದರಲ್ಲಿ ಯಾವುದೇ ತೊಂದರೆ ಇಲ್ಲ.

### ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ವಿಧಾನ

ಆದರೆ, ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ವಿಧಾನವನ್ನು ಬಳಸುವಾಗ ನೀವು ವಿಭಿನ್ನವಾಗಿ ಯೋಚಿಸಬೇಕಾಗುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಟೂಲ್ ಅನ್ನು ನೊಂದಾಯಿಸುವ ಬದಲು, ವೈಶಿಷ್ಟ್ಯ ಪ್ರಕಾರಕ್ಕೆ (ಟೂಲ್‌ಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಅಥವಾ ಪ್ರಾಂಪ್ಟ್‌ಗಳು) ಪ್ರತಿ ಎರಡು ಹ್ಯಾಂಡಲರ್‌ಗಳನ್ನು ಸೃಷ್ಟಿಸಿ. ಉದಾಹರಣೆಗೆ, ಟೂಲ್‌ಗಳಿಗಾಗಿ ಕೇವಲ ಎರಡು ಕಾರ್ಯಗಳನ್ನು ಮಾತ್ರ ಇರುತ್ತವೆ:

- ಎಲ್ಲಾ ಟೂಲ್‌ಗಳ ಪಟ್ಟಿ ಮಾಡುವುದು: ಒಂದು ಕಾರ್ಯವು ಎಲ್ಲಾ ಟೂಲ್ ಪಟ್ಟಿ ಮಾಡುವ ಪ್ರಯತ್ನಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.
- ಎಲ್ಲಾ ಟೂಲ್‌ಗಳ ಕಾಲ್‌ಗಳನ್ನು ಕರೆದಣೆ: ಇಲ್ಲಿ ಕೂಡ, ಕೇವಲ ಒಂದು ಕಾರ್ಯ ಮಾತ್ರ ಟೂಲ್ ಗೆ ಕಾಲ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.

ಇದು ಅವಕಾಶವಿರುವಷ್ಟು ಕಡಿಮೆ ಕೆಲಸ ಪ್ರಪಂಚದಲ್ಲಿ ಆಗಬಹುದು ಎನ್ನಲಾಗುತ್ತದೆ. ಆದ್ದರಿಂದ ಟೂಲ್ ನೊಂದಾಯಿಸಲು ಬದಲು, ನಾನು ಎಲ್ಲ ಟೂಲ್ ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿದಾಗ ಟೂಲ್ ಪಟ್ಟಿ ಆಗಿರಬೇಕು ಮತ್ತು ಟೂಲ್ ಅನ್ನು ಕಾಲ್ ಮಾಡುವ ವಿನಂತಿ ಬಂದಾಗ ಟೂಲ್ ಕಾಲ್ ಆಗಬೇಕು ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುವ ಅಗತ್ಯ ಇದೆ.

ಈಗ ಕೋಡ್ ಹೇಗಿದೆ ನೋಡೋಣ:

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
  // ನೋಂದಾಯಿಸಿದ ಸಲಕರಣೆಗಳ ಪಟ್ಟಿಯನ್ನು ಹಿಂತಿರುಗಿಸಿ
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

ಈಗ ನಾವು ವೈಶಿಷ್ಟ್ಯಗಳ ಪಟ್ಟಿ ನೀಡುವ ಕಾರ್ಯವನ್ನು ಹೊಂದಿದ್ದೇವೆ. ಟೂಲ್ ಪಟ್ಟಿ ಪ್ರತಿ ಎಂಟ್ರಿಗೆ `name`, `description` ಮತ್ತು `inputSchema` ಕ್ಷೇತ್ರಗಳಿವೆ, ಇದು ಮರಳುವ ಪ್ರಕಾರವನ್ನು ಅನುಸರಿಸುತ್ತದೆ. ಇದು ನಮ್ಮ ಟೂಲ್‌ಗಳು ಮತ್ತು ವೈಶಿಷ್ಟ್ಯ ವ್ಯಾಖ್ಯಾನವನ್ನು ಬೇರೆ ಕಡೆ ಇರಿಸಲು ಅನುಮತಿಸುತ್ತದೆ. ಈಗ ನಾವು ಎಲ್ಲಾ ಟೂಲ್‌ಗಳನ್ನು `tools` ಫೋಲ್ಡರ್‌ನಲ್ಲಿ ಮತ್ತು ನಿಮ್ಮ ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಬೇರೆ ಜಾಗಗಳಲ್ಲಿ ಸೃಷ್ಟಿಸಬಹುದು, ಹೀಗಾಗಿ ನಿಮ್ಮ ಪ್ರಾಜೆಕ್ಟ್ ಹೀಗಿರಬಹುದು:

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

ಒಳ್ಳೆಯದು, ನಮ್ಮ ವಾಸ್ತುಶಿಲ್ಪ ಸ್ವಚ್ಛವಾಗಿರಿಸಬಹುದು.

ಟೂಲ್‌ಗಳಿಗೆ ಕಾಲ್ ಮಾಡುವುದು ಏನು, ಅದೇ ಆದರ್ಶವೇ, ಯಾವುದಾದರೂ ಟೂಲ್ ಅನ್ನು ಕಾಲ್ ಮಾಡಲು ಒಂದು ಹ್ಯಾಂಡಲರ್ ಇದೆಯೇ? ಹೌದು, ಖಂಡಿತವಾಗಿ, ಇದು ಈ ಕೆಳಗಿನ ಕೋಡ್:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ಎಂಬುದು ಸಾಧನಗಳಿಗೆ ಹೆಸರುಗಳನ್ನು ಕೀಗಳಾಗಿ ಬಳಸಿಕೊಂಡಿರುವ ನಿಘಂಟು (ಡಿಕ್ಷನರಿ) ಆಗಿದೆ
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
    
    // ಆರ್ಗ್ಸ್: request.params.arguments
    // TODO ಸಲಕರಣೆ ಅನ್ನು ಕರೆಯಿರಿ,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

ಮೇಲು ಕೋಡ್‌ನಿಂದ ನೀವು ಕಾಣಬಹುದು, ನಾವು ಯಾವ ಟೂಲ್ ಅನ್ನು ಕಾಲ್ ಮಾಡಬೇಕೆಂದು ಹಾಗೂ ಯಾವ ಆರ್ಗ್ಯುಮೆಂಟ್‌ಗಳೊಂದಿಗೆ ಕಾಲ್ ಮಾಡಬೇಕೆಂಬುದನ್ನು ವಿಶ್ಲೇಷಿಸಿ, ನಂತರ ಟೂಲ್ ಅನ್ನು ಕಾಲ್ ಮಾಡಬೇಕಾಗುತ್ತದೆ.

## ಮಾನ್ಯತೆ ಜೊತೆಗೆ ವಿಧಾನವನ್ನು ಸುಧಾರಿಸುವುದು

ಇದಲ್ಲದೆ, ನೀವು ಎಲ್ಲ ಟೂಲ್‌, ಸಂಪನ್ಮೂಲ ಮತ್ತು ಪ್ರಾಂಪ್ಟ್ ನೊಂದಣಿಗಳನ್ನು ಈ ಎರಡು ಹ್ಯಾಂಡಲರ್‌ಗಳು ಮೂಲಕ ಬದಲಾಯಿಸಬಹುದು ಎಂದು ನೋಡಿದ್ದಾರೆ. ಮುಂದಿನ ಕಾರಣ ಏನು? ನಾವು ಟೂಲ್ ಸರಿ ಬಂದ ಆರ್ಗ್ಯುಮೆಂಟ್‍ಗಳೊಂದಿಗೆ ಮಾತ್ರ ಕಾಲ್ ಆಗುವುದಾಗಿ ಖಚಿತಪಡಿಸಲು ಮಾನ್ಯತೆ ಸೇರಿಸಬೇಕಾಗಿದೆ. ಪ್ರತಿ ರನ್‌ಟೈಮ್ ಇದಕ್ಕೆ ವಿಭಿನ್ನ ಪರಿಹಾರ ಹೊಂದಿದೆ, ಉದಾಹರಣೆಗೆ Python ನಲ್ಲಿ Pydantic ಉಪಯೋಗವಾಗುತ್ತದೆ ಮತ್ತು TypeScript ನಲ್ಲಿ Zod ಬಳಕೆಯಾಗುತ್ತದೆ. ಧ್ಯೇಯವೆಂದರೆ ನಾವು ಈ ಕೆಳಗಿನ ಕೆಲಸಗಳನ್ನು ಮಾಡುತ್ತೇವೆ:

- ವೈಶಿಷ್ಟ್ಯ (ಟೂಲ್, ಸಂಪನ್ಮೂಲ ಅಥವಾ ಪ್ರಾಂಪ್ಟ್) ಸೃಷ್ಟಿಸುವ ಲಾಜಿಕ್ ಅನ್ನು ಅದರ ತುದಿಹೊಂದಿದ ಫೋಲ್ಡರ್‌ಗೆ ಸರಿಸಿ.
- ಟೂಲ್ ಅನ್ನು ಕಾಲ್ ಮಾಡಲು ಆದೇಶಿಸುವ ಇನ್‌ಕಮಿಂಗ್ ವಿನಂತಿಯ ಮಾನ್ಯತೆ ಪರಿಶೀಲಿಸುವುದು.

### ವೈಶಿಷ್ಟ್ಯ ಸೃಷ್ಟಿಸುವುದು

ವೈಶಿಷ್ಟ್ಯ ಸೃಷ್ಟಿಸಲು, ಆ ವೈಶಿಷ್ಟ್ಯಕ್ಕೆ ಫೈಲ್ ಸೃಷ್ಟಿಸಿ ಅದರ ಅಗತ್ಯವಿರುವ ಕ್ಷೇತ್ರಗಳನ್ನು ಸೇರಿಸಬೇಕು. ಟೂಲ್, ಸಂಪನ್ಮೂಲ ಮತ್ತು ಪ್ರಾಂಪ್ಟ್‌ನಲ್ಲಿ ಕೆಲವು ಕ್ಷೇತ್ರಗಳು ಭಿನ್ನವಾಗಿರುತ್ತವೆ.

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
        # ಪೈಡ್ಯಾಂಟಿಕ್ ಮಾದರಿಯನ್ನು ಬಳಸಿಕೊಂಡು ಇನ್‌ಪುಟ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: ಪೈಡ್ಯಾಂಟಿಕ್ ಅನ್ನು ಸೇರಿಸಿ, ಆದ್ದರಿಂದ ನಾವು AddInputModel ರಚಿಸಿ ಮತ್ತು ಆರ್ಗ್ಗಳನ್ನು ಪರಿಶೀಲಿಸಬಹುದು

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ಇಲ್ಲಿ ನಾವು ಈ ಕೆಳಗಿನಕಾರ್ಯಗಳನ್ನು ನೋಡಬಹುದು:

- Pydantic ಉಪಯೋಗಿಸಿ `AddInputModel` ಸ್ಕೀಮಾ ಸೃಷ್ಟಿಸುವುದು, `a` ಮತ್ತು `b` ಕ್ಷೇತ್ರಗಳೊಂದಿಗೆ *schema.py* ಫೈಲ್ ನಲ್ಲಿ.
- ಇನ್‌ಕಮಿಂಗ್ ವಿನಂತಿಯನ್ನು `AddInputModel` ಪ್ರಕಾರ ಮ್ಯಾಚ್ ಮಾಡಬಹುದು ಎಂದು ಪ್ರಯತ್ನಿಸುವುದು, параметры ಗಳು ಸರಿಯಲ್ಲದಿದ್ದರೆ ಕ್ರ್ಯಾಶ್ ಆಗುತ್ತದೆ:

   ```python
   # add.py
    try:
        # Pydantic ಮಾದರಿಯನ್ನು ಬಳಸಿ ಇನಪುಟ್ ಮಾನ್ಯತೆ ಮಾಡು
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

ನೀವು ಈ ಪಾರ್ಸಿಂಗ್ ಲಾಜಿಕ್ ಅನ್ನು ಟೂಲ್ ಕಾಲ್‌ನಲ್ಲಿ ಅಥವಾ ಹ್ಯಾಂಡಲರ್ ಕಾರ್ಯದಲ್ಲಿ ಇರಿಸಬಹುದು.

**TypeScript**

```typescript
// ಸರ್ವರ್.ts
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

       // @ts-ಅಂಗೀಕರಿಸಿ
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

// ಯೋಜನೆ.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// ಸೇರಿಸಿ.ts
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

- ಎಲ್ಲಾ ಟೂಲ್ ಕಾಲ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸುವ ಹ್ಯಾಂಡಲರ್‌ನಲ್ಲಿ, ಈಗ ನಾವು ಇನ್‌ಕಮಿಂಗ್ ವಿನಂತಿಯನ್ನು ಟೂಲ್ ವಿನಿಯೋಗಿಸಿದ ಸ್ಕೀಮಾಗೆ ಪಾರ್ಸ್ ಮಾಡುವುದಕ್ಕೆ ಪ್ರಯತ್ನಿಸುತ್ತೇವೆ:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ಇದು ಯಶಸ್ವಿಯಾದರೆ ನಾವು ನಿಜವಾದ ಟೂಲ್ ಅನ್ನು ಕಾಲ್ ಮಾಡುತ್ತೇವೆ:

    ```typescript
    const result = await tool.callback(input);
    ```

ನೀವು ನೋಡಿದಂತೆ, ಈ ವಿಧಾನವು ಅತ್ಯುತ್ತಮ ವಾಸ್ತುಶಿಲ್ಪ ಸೃಷ್ಟಿಸುತ್ತದೆ ಏಕೆಂದರೆ ಪ್ರತಿಯೊಂದು ಬಗೆಯ ವೈಶಿಷ್ಟ್ಯಗಳು ತಮ್ಮ ಸ್ಥಾನ ಹೊಂದಿವೆ; *server.ts* ಅತ್ಯಂತ ಸಣ್ಣ ಫೈಲ್ ಆಗಿದ್ದು ವಿನಂತಿ ಹ್ಯಾಂಡಲರ್‌ಗಳನ್ನು ವಿತರಿಸುತ್ತದೆ ಮತ್ತು ಪ್ರತಿಯೊಂದು ವೈಶಿಷ್ಟ್ಯವು ಅದರ ತೊಂದರೆಡಿಲಿ ಫೋಲ್ಡರ್‌ನಲ್ಲಿ ಇರುತ್ತದೆ, ಉದಾ: tools/, resources/, ಅಥವಾ /prompts.

ಚೆನ್ನಾಗಿದೆ, ಹೀಗಾಗಿ ನಾವು ಮುಂದಿನ ಬಾಗವನ್ನು ನಿರ್ಮಿಸಲು ಪ್ರಯತ್ನಿಸೋಣ.

## ವ್ಯಾಯಾಮ: ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಸೃಷ್ಟಿಸುವುದು

ಈ ವ್ಯಾಯಾಮದಲ್ಲಿ ನಾವು ಈ ಕೆಳಗಿನ ವಿಚಾರಗಳನ್ನು ಮಾಡುತ್ತೇವೆ:

1. ಟೂಲ್ ಪಟ್ಟಿ ಮಾಡುವುದು ಮತ್ತು ಟೂಲ್ ಕಾಲ್ ಅನ್ನು ನಿರ್ವಹಿಸುವ ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಸೃಷ್ಟಿಸುವುದು.
2. ನೀವು ನಿರ್ಮಿಸಬಹುದಾದ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸುವುದು.
3. ನಿಮ್ಮ ಟೂಲ್ ಕಾಲ್‌ಗಳು ಸರಿಯಾಗಿ ಮಾನ್ಯಗೊಳ್ಳುತ್ತವೆ ಎಂದು ಖಚಿತಪಡಿಸಲು ಮಾನ್ಯತೆ ಸೇರಿಸುವುದು.

### -1- ವಾಸ್ತುಶಿಲ್ಪ ಸೃಷ್ಟಿಸುವುದು

ನಾವು ಮೊದಲಿಗೆ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಗಮನಿಸುವುದು ಅಗತ್ಯವಿದೆ, ಇದು ನಾವು ಬಿಡುವಾಯ್ತುಗಳನ್ನು ಜೋಡಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ, ಹೀಗಿದೆ:

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

ನಾವು ಈಗ ಟೂಲ್‌ಗಳನ್ನು tools ಫೋಲ್ಡರ್‌ನಲ್ಲಿ ಸುಲಭವಾಗಿ ಸೇರಿಸಬಹುದಾದ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಹೊಂದಿದ್ದೇವೆ. ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಪ್ರಾಂಪ್ಟ್‌ಗಳಿಗೆ ಉಪಡೈರೆಕ್ಟರಿಗಳನ್ನು ಸೇರಿಸುವುದು ಮುಕ್ತವಾಗಿದೆ.

### -2- ಟೂಲ್ ಸೃಷ್ಟಿಸುವುದು

ಮುಂದೆ, ಟೂಲ್ ಸೃಷ್ಟಿಸುವುದೇನೆಂದು ನೋಡೋಣ. ಮೊದಲು, ಇದು ಅದರ *tool* ಉಪಡೈರೆಕ್ಟರಿಯಲ್ಲಿ ಹೀಗೆ ಸೃಷ್ಟಿಸಲಾಗಬೇಕು:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic ಮಾದರಿಯನ್ನು ಬಳಸಿ ಇನ್ಪುಟ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ಅನ್ನು ಸೇರಿಸಲಿ, ಹೀಗಾಗಿ ನಾವು AddInputModel ರಚಿಸಿ ಅರ್ಗ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಬಹುದು

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ಇಲ್ಲಿ ನಾವು ಪೈಡಂಟಿಕ್ ಬಳಸಿ ಹೆಸರನ್ನೂ ವರ್ಣನೆ, ಮತ್ತು ಇನ್‌ಪುಟ್ ಸ್ಕೀಮಾವನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುತ್ತಿದ್ದೇವೆ ಮತ್ತು ಈ ಟೂಲ್ ಅನ್ನು ಕಾಲ್ ಮಾಡಿದಾಗ ಕರೆಯಲಾದ ಹ್ಯಾಂಡಲರ್ ಇದೆ. ಕೊನೆಗೆ, ಎಲ್ಲಾ ಗುಣಲಕ್ಷಣವನ್ನೂ ಹೋಲುವ `tool_add` ಎಂಬ ಡಿಕ್ಷನರಿ ಕುರಿತು ಬಹಿರಂಗಪಡಿಸುತ್ತೇವೆ.

ಇದಲ್ಲದೆ *schema.py* ಇದೆ, ನಾವು ಟೂಲ್ ಉಪಯೋಗಿಸುವ ಇನ್‌ಪುಟ್ ಸ್ಕೀಮಾವನ್ನು ಇಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸುತ್ತೇವೆ:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

ಟೂಲ್ ಡೈರೆಕ್ಟರಿ ಮೋಡ್ಯೂಲ್ ಆಗಿ ಪರಿಗಣಿಸಲು *__init__.py* ಅನ್ನು ಪೂರ್ಣಗೊಳಿಸುವ ಅಗತ್ಯವಿದೆ. ಜೊತೆಗೆ, ಅದರ ಒಳಗಿನ ಮೋಡ್ಯೂಲ್‌ಗಳನ್ನು ಹೀಗಾಗಿ ಬಹಿರಂಗಪಡಿಸುತ್ತೇವೆ:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

ನಾವು ಹೆಚ್ಚು ಟೂಲ್‌ಗಳನ್ನು ಸೇರಿಸುವಾಗ ಈ ಫೈಲ್‌ಗಾಗಿ ಕೂಡ ಹೆಚ್ಚಿಸುವುದು ಸಾಧ್ಯ.

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

ಇಲ್ಲಿ ನಾವು ಈ ಗುಣಲಕ್ಷಣಗಳ ಡಿಕ್ಷನರಿಯನ್ನು ಸೃಷ್ಟಿಸುತ್ತೇವೆ:

- name: ಟೂಲ್ ಹೆಸರು.
- rawSchema: Zod ಸ್ಕೀಮಾ, ಟೂಲ್ ಕಾಲ್ ಮಾಡುವ ಇನ್‌ಕಮಿಂಗ್ ವಿನಂತಿಗಳನ್ನು ಮಾನ್ಯಗೊಳಿಸಲು ಬಳಕೆ ಮಾಡುವುದು.
- inputSchema: ಹ್ಯಾಂಡಲರ್ ಬಳಕೆ ಮಾಡುವ ಸ್ಕೀಮಾ.
- callback: ಟೂಲ್ ಅನ್ನು ಕರೆ ಮಾಡಲು ಬಳಸುವುದು.

ಇದಲ್ಲದೆ `Tool` ಇದೆ, ಇದು ಈ ಡಿಕ್ಷನರಿಯನ್ನು mcp ಸರ್ವರ್ ಹ್ಯಾಂಡಲರ್‌ಗಳು ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರಕ್ಕೆ ಪರಿವರ್ತಿಸುತ್ತದೆ ಮತ್ತು ಹೀಗಿದೆ:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

ಮತ್ತು *schema.ts* ಇದೆ, ಇಲ್ಲಿ ಪ್ರತಿಯೊಂದು ಟೂಲ್‌ಗೆ ಇನ್‌ಪುಟ್ ಸ್ಕೀಮಾವನ್ನು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ, ಈಗ ಒಂದು ಮಾತ್ರ ಸ್ಕೀಮಾ ಇದೆ, ಆದರೆ ಟೂಲ್‌ಗಳನ್ನು ಸೇರಿಸುವಂತೆ ನಾವು ಹೆಚ್ಚಿನ ದಾಖಲೆಗಳನ್ನು ಸೇರಿಸಬಹುದು:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ಚೆನ್ನಾಗಿದೆ, ಈಗ ನಮಗಿರುವ ಟೂಲ್ ಪಟ್ಟಿ ನಿರ್ವಹಣೆಯನ್ನು ಮುಂದುವರೆಸೋಣ.

### -3- ಟೂಲ್ ಪಟ್ಟಿ ನಿರ್ವಹಣೆ

ನಂತರ, ಟೂಲ್ ಪಟ್ಟಿ ನಿರ್ವಹಿಸಲು, ವಿನಂತಿ ಹ್ಯಾಂಡಲರ್ ಅನ್ನು ಸಿದ್ಧಪಡಿಸಬೇಕಾಗುತ್ತದೆ. ನಮ್ಮ ಸರ್ವರ್ ಫೈಲ್‌ಗೆ ಇದನ್ನು ಸೇರಿಸೋಣ:

**Python**

```python
# ಸಾಂಕೇತಿಕತೆಗಾಗಿ ಕೋಡ್ ತೆಗೆದಿದೆ
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

ಇಲ್ಲಿ, ನಾವು `@server.list_tools` ಡೆಕೊರೇಟರ್ ಮತ್ತು ಅದನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸುವ `handle_list_tools` ಕಾರ್ಯವನ್ನು ಸೇರಿಸುತ್ತೇವೆ. ನಂತರ, ಟೂಲ್ ಪಟ್ಟಿ ಸೃಷ್ಟಿಸಬೇಕು, ಪ್ರತಿಯೊಂದು ಟೂಲ್‌ಗೆ ಹೆಸರು, ವರ್ಣನೆ ಮತ್ತು inputSchema ಬೇಕಾಗಿವೆ ಎಂಬುದನ್ನು ಗಮನಿಸಿರಿ.

**TypeScript**

ಟೂಲ್ ಪಟ್ಟಿ ಮಾಡಬೇಕಾದ ವಿನಂತಿಗೆ ಹ್ಯಾಂಡಲರ್ ಸೆಟ್ ಮಾಡಲು, ನಾವು ಸರ್ವರ್ ಮೇಲೆ `setRequestHandler` ಅನ್ನು ಕರೆದಿಟ್ಟು ಅದರ ಸ್ಕೀಮಾ ಆಗಿರುವ `ListToolsRequestSchema` ಅನ್ನು ಪಾಸು ಮಾಡಬೇಕು.

```typescript
// ಸೂಚ್ಯಂಕ.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// ಸರ್ವರ್.ts
// ಸರಳತೆಯಿಗಾಗಿ ಕೋಡ್ bodily
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // ನೊಂದಾಯಿತ ಉಪಕರಣಗಳ ಪಟ್ಟಿ ಹಿಂತಿರುಗಿಸಿ
  return {
    tools: tools
  };
});
```

ಒಳ್ಳೆಯದು, ಈಗ ನಮಗೆ ಟೂಲ್ ಪಟ್ಟಿ ಭಾಗ ಮುಗಿದಿದೆ, ಮುಂದಾಗಿ ನಾವು ಹೇಗೆ ಟೂಲ್‌ಗಳನ್ನು ಕಾಲ್ ಮಾಡಬಹುದು ನೋಡೋಣ.

### -4- ಟೂಲ್ ಕಾಲ್ ನಿರ್ವಹಣೆ

ಒಂದು ಟೂಲ್ ಕಾಲ್ ಮಾಡಲು, ಮತ್ತೊಂದು ವಿನಂತಿ ಹ್ಯಾಂಡಲರ್ ಅನ್ನು ಸಿದ್ಧಪಡಿಸುವ ಅಗತ್ಯವಿದೆ, ಇದರಲ್ಲಿ ಸೂಚನೆಯಿಲ್ಲದ ವೈಶಿಷ್ಟ್ಯವನ್ನು ಯಾವುದು ಕಾಲ್ ಮಾಡಬೇಕೆಂದು ಹಾಗೂ ಯಾವ ಆರ್ಗ್ಯುಮೆಂಟ್ ಗಳೊಂದಿಗೆ ಎಂಬುದನ್ನು ನಿರ್ವಹಿಸುತ್ತೇವೆ.

**Python**

`@server.call_tool` ಡೆಕೊರೇಟರ್ ಬಳಸಿ `handle_call_tool` ಎಂಬ ಕಾರ್ಯಣ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸೋಣ. ಆ ಕಾರ್ಯದಲ್ಲಿ, ಟೂಲ್ ಹೆಸರು, ಅದರ ಆರ್ಗ್‌ಗಳು ಹೊರತೆಗಿ ඒ ಟೂಲ್ ಗೆ ಸೂಕ್ತವಾಗಿರುವಂತೆ ಆರ್ಗ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಮಾನ್ಯಗೊಳಿಸುವ ಅಗತ್ಯವಿದೆ. ಈ ಮಾನ್ಯತೆಯನ್ನು ಈ ಕಾರ್ಯದಲ್ಲಿ ಅಥವಾ ನಿಜವಾದ ಟೂಲ್‌ನಲ್ಲಿ ನಿರ್ವಹಿಸಬಹುದು.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # ಸಾಧನಗಳು ಸಾಧನದ ಹೆಸರುಗಳನ್ನು ಕೀಗಳಾಗಿ ಹೊಂದಿರುವ ಪದಕೋಶವಾಗಿದೆ
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ಸಾಧನವನ್ನು ಕರೆಮಾಡಿ
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

ನನ್ನಂತಿದೆ:

- ನಮ್ಮ ಟೂಲ್ ಹೆಸರು ಈಗಲೂ `name` ಇನ್‌ಪುಟ್ ಪರಿಮಾಣವಾಗಿ ಇರುತ್ತದೆ ಮತ್ತು `arguments` ಡಿಕ್ಷನರಿಯಲ್ಲಿ ನಮ್ಮ ಆರ್ಗ್ಯುಮೆಂಟ್‌ಗಳಿವೆ.

- ಟೂಲ್ ಅನ್ನು `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` ಮೂಲಕ ಕರೆ ಮಾಡಲಾಗುತ್ತದೆ. ಆರ್ಗ್ಯೂಮೆಂಟ್‌ಗಳ ಮಾನ್ಯತೆ `handler` ಗುಣಲಕ್ಷಣದಲ್ಲಿ ಈ ಕಾರ್ಯವನ್ನು ಮಾಡುತ್ತದೆ, ವಿಫಲವಾದರೆ ಅಪವ್ಯಕ್ತಿಯನ್ನು ರೇಸ್ ಮಾಡುತ್ತದೆ.

ಹೀಗಾಗಿ, ನಾವು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಬಳಸಿ ಟೂಲ್‌ಗಳ ಪಟ್ಟಿ ಮತ್ತು ಕಾಲ್‌ಗಳ ಪೂರ್ಣ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇವೆ.

ಮೂಲ ತೋರಣೆ [ಪೂರ್ಣ ಉದಾಹರಣೆ](./code/README.md) ಇಲ್ಲಿ ಇದೆ

## ನಿಯೋಜನೆ

ನೀವು ಪಡೆದಿರುವ ಕೋಡ್‌ಗೆ ಹಲವಾರು ಟೂಲ್‌ಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ವಿಸ್ತರಿಸಿ ಮತ್ತು ನೀವು ಗಮನಿಸುವುದು ಏನೆಂದರೆ ನೀವು ಟೂಲ್ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ ಮಾತ್ರ ಫೈಲ್‌ಗಳನ್ನು ಸೇರಿಸುವುದು ಮಾತ್ರ ಬಹುಪದ್ಧತಿಯಾಗುತ್ತದೆ, ಬೇರೆಡೆಗೆ ಸೇರಿದುದಿಲ್ಲ.

*ಯಾವುದೇ ಪರಿಹಾರ ನೀಡಿಲ್ಲ*

## ಸಾರಾಂಶ

ಈ ಅಧ್ಯಾಯದಲ್ಲಿ, ನಾವು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ವಿಧಾನವು ಹೇಗೆ ಕೆಲಸಮಾಡುತ್ತದೆ ಮತ್ತು ಅದನ್ನು ಸುಂದರವಾದ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ನಿರ್ಮಿಸಲು ಹೇಗೆ ಸಹಾಯಮಾಡುತ್ತದೆಯೇಂಬುದನ್ನು ನೋಡಿದೆವು. ನಾವು ಮಾನ್ಯತೆಯನ್ನೂ ಚರ್ಚೆಮಾಡಿದ್ದೇವೆ ಮತ್ತು ನೀವು ಮಾನ್ಯತೆ ಗ್ರಂಥಾಲಯಗಳೊಂದಿಗೆ ಕೆಲಸಮಾಡುತ್ತಾ ಇನ್‌ಪುಟ್ ಮಾನ್ಯತೆಗಾಗಿ ಸ್ಕೀಮಾಗಳನ್ನು ಹೇಗೆ ಸೃಷ್ಟಿಸುವುದನ್ನು ನೋಡಿದ್ದೀರಿ.

## ಮುಂದೇನು

- ಮುಂದಿನ ಅಧ್ಯಾಯ: [ಸರಳ ದೃಢೀಕರಣ](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ಪಷ್ಟತೆ**:  
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಮ್ಮ ಪ್ರಯತ್ನ ಸತ್ಯದತ್ತ ಇದ್ದರೂ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ತಪ್ಪುಗಳು ಅಥವಾ ಅಸൈറ്റತೆಗಳು ಇರಬಹುದು ಎಂಬುದನ್ನು ದಯವಿಟ್ಟು ಗಮನಿಸಿ. ಮೂಲ ಭಾಷೆಯ ದಸ್ತಾವೇಜನ್ನು ಅಧಿಕೃತ ಮೂಲ ಎಂದು ಪರಿಗಣಿಸಬೇಕು. ಗಂಭೀರ ಮಾಹಿತಿಗಾಗಿ ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ನಿಮಿಷಿಸುವುದು ಶಿಫಾರಸ್ಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದದ ಬಳಕೆಯಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಅಥವಾ ವಿವರಗಳಲ್ಲಿ ನಮಗೆ ಹೊಣೆಗಾರಿಕೆ ಇಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->