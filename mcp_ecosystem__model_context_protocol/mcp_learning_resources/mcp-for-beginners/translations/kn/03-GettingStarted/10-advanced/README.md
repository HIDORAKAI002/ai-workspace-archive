# ಮೆರೆದ ಸರ್ವರ್ ಬಳಕೆ

MCP SDK ನಲ್ಲಿ ಎರಡು ವಿಭಿನ್ನ ವಿಧದ ಸರ್ವರ್‌ಗಳು ಬಹಿರಂಗಪಡಿಸಲ್ಪಟ್ಟಿವೆ, ನಿಮ್ಮ ಸಾಮಾನ್ಯ ಸರ್ವರ್ ಮತ್ತು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್. ಸಾಮಾನ್ಯವಾಗಿ, ನೀವು ಸಾಮಾನ್ಯ ಸರ್ವರ್ ಅನ್ನು ಅದಕ್ಕೆ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಸೇರಿಸಲು ಬಳಸುತ್ತೀರಿ. ಕೆಲವು ಸಂದರ್ಭಗಳಲ್ಲಿ, ನೀವು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಮೇಲೆ ಅವಲಂಬಿಸಬೇಕು, ಉದಾಹರಣೆಗೆ:

- ಉತ್ತಮ ವಾಸ್ತುಶಿಲ್ಪ. ಸಾಮಾನ್ಯ ಸರ್ವರ್ ಮತ್ತು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಎರಡನ್ನೂ ಬಳಸಿ ಶುದ್ಧ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ರಚಿಸುವುದು ಸಾಧ್ಯ ಆದರೆ ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್‌ನಿಂದ ಇದು ಸ್ವಲ್ಪ ಸುಲಭ ಎಂದು ಹೇಳಬಹುದಾಗಿದೆ.
- ವೈಶಿಷ್ಟ್ಯ ಲಭ್ಯತೆ. ಕೆಲವು ಮೆರೆದ ವೈಶಿಷ್ಠ್ಯಗಳನ್ನು ಮಾತ್ರ ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಬಳಸಿ ಬಳಸಬಹುದು. ನಾವು ನಂತರದ ಅಧ್ಯಾಯಗಳಲ್ಲಿ സാമ്പಲಿಂಗ್ ( deprecated in `2026-07-28` ಬಿಡುಗಡೆ ಅಭ್ಯರ್ಥಿ) ಮತ್ತು ಉತ್ತೇಜನೆಯನ್ನು ಸೇರಿಸುವಾಗ ಇದನ್ನು ನೋಡುತ್ತೀರಿ.

## ಸಾಮಾನ್ಯ ಸರ್ವರ್ ಮತ್ತು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್

ಸಾಮಾನ್ಯ ಸರ್ವರ್ ಬಳಸಿ MCP ಸರ್ವರ್ ರಚಿಸುವುದು ಹೀಗಿರುತ್ತದೆ

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

// ಒಂದು ಸೇರ್ಪಡೆ ಸಾಧನವನ್ನು ಸೇರಿಸಿ
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

ಅರ್ಥವೇನೆಂದರೆ ನೀವು ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತಿಯೊಂದು ಉಪಕರಣ, ಸಂಪನ್ಮೂಲ ಅಥವಾ ಪ್ರಾಂಪ್ಟ್ ಅನ್ನು ಸರ್ವರ್‌ಗೆ ಸೇರಿಸುತ್ತೀರಿ. ಇದರಲ್ಲಿ ಏನೂ ತಪ್ಪಿಲ್ಲ.  

### ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ವಿಧಾನ

ಆದರೆ, ನೀವು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ವಿಧಾನವನ್ನು ಬಳಸುವಾಗ ಇದನ್ನು ಬೇರೆ ರೀತಿಯಲ್ಲಿ ಯೋಚಿಸಬೇಕಾಗುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ವೈಶಿಷ್ಟ್ಯದ ಪ್ರಕಾರಕ್ಕೆ (ಉಪಕರಣಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಅಥವಾ ಪ್ರಾಂಪ್ಟ್ಗಳು) ಬದಲಾಗಿ ನೀವು ಇಬ್ಬರು ಹ್ಯಾಂಡ್ಲರ್‌ಗಳನ್ನು ರಚಿಸುವಿರಿ. ಉದಾಹರಣೆಗೆ, ಉಪಕರಣಗಳಿಗೆ ಕೇವಲ ಎರಡು ಫಂಕ್ಷನ್‌ಗಳು ಇರುತ್ತವೆ ಹೀಗಿದೆ:

- ಎಲ್ಲ ಉಪಕರಣಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುವುದು. ಒಂದು ಫಂಕ್ಷನ್ ಎಲ್ಲಾ ಪ್ರಯತ್ನಗಳನ್ನು ಉಪಕರಣಗಳ ಪಟ್ಟಿಗೊಳಿಸುವಿಕೆಗೆ ಹೊಣೆಗಾರರಾಗುತ್ತದೆ.
- ಎಲ್ಲ ಉಪಕರಣಗಳನ್ನು ಕರೆ ಮಾಡುವುದು. ಇಲ್ಲಿ ಕೂಡ, ಉಪಕರಣಕ್ಕೆ ಕರೆ ಮಾಡಲು ಕೇವಲ ಒಂದು ಫಂಕ್ಷನ್ ನೀತಿಸುತ್ತದೆ.

ಇದು ಕಡಿಮೆ ಕೆಲಸದಂತೆ ಕೇಳುತ್ತದೆ ಅಲ್ಲವೇ? ಆದ್ದರಿಂದ, ಉಪಕರಣವನ್ನು ನೋಂದಣಿ ಮಾಡಿಸುವ ಬದಲು, ನಾನು ಇಷ್ಟಾದ್ರೆ ಎಲ್ಲಾ ಉಪಕರಣಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿರುವಾಗ ಅದು ಸೇರಿಸಬೇಕೆಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ತೇನೆ ಮತ್ತು ಉಪಕರಣಕ್ಕೆ ಕರೆ ಬರುವಾಗ ಅದನ್ನು ಕರೆ ಮಾಡುವುದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುತ್ತೇನೆ.

ಈಗ ಈ ಕೋಡ್ ಹೇಗೆ ಕಾಣಿಸುತ್ತದೆೋ ನೋಡೋಣ:

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
  // ನೋಂದಾಯಿಸಿದ ಸಾಧನಗಳ ಪಟ್ಟಿಯನ್ನು ಹಿಂತಿರುಗಿಸಿ
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

ಇಲ್ಲಿ ಈಗ ನಮಗೆ ಒಂದು ಫಂಕ್ಷನ್ ಇದೆ ಅದು ವೈಶಿಷ್ಟ್ಯಗಳ ಪಟ್ಟಿ ಹಿಂತಿರುಗಿಸುತ್ತದೆ. ಉಪಕರಣಗಳ ಪಟ್ಟಿಯ ಪ್ರತಿಯೊಂದು ಎಂಟ್ರಿಯಲ್ಲಿ ಈಗ `name`, `description` ಮತ್ತು `inputSchema` ಎಂಬ ಕ್ಷೇತ್ರಗಳಿವೆ ಈ ಹಿಂದಿರುಗುವ ಪ್ರಕಾರಕ್ಕೆ ಹೊಂದಿಕೊಳ್ಳಲು. ಇದು ನಮ್ಮ ಉಪಕರಣಗಳು ಮತ್ತು ವೈಶಿಷ್ಟ್ಯ ವ್ಯಾಖ್ಯಾನಗಳನ್ನು ಬೇರೆಡೆ ಇಡುವುದಕ್ಕೆ ಅನುಮತಿಸುತ್ತದೆ. ಈಗ ನಾವು ಎಲ್ಲಾ ಉಪಕರಣಗಳನ್ನು tools ಫೋಲ್ಡರ್ ನಲ್ಲಿ ರಚಿಸಬಹುದು ಮತ್ತು ನಿಮ್ಮ ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳಿಗೂ ಇದೇ ರೀತಿ ಆಗಬಹುದು ಆದ್ದರಿಂದ ನಿಮ್ಮ ಯೋಜನೆ ಈ ರೀತಿ ಸರಿಯಾದ ರೀತಿಯಲ್ಲಿ ಒಗ್ಗೂಡಿಸಬಹುದು:

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

ಅದ್ಭುತ, ನಮ್ಮ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಸ್ವಚ್ಛವಾಗಿ ಕಾಣುವಂತೆ ಮಾಡಬಹುದು.

ಉಪಕರಣಗಳನ್ನು ಕರೆ ಮಾಡುವುದು ಹೇಗೆ? ಆಪ್ತ ಎಂದು ಹೋಲುತ್ತದೆ ಅಲ್ಲವೇ, ಯಾವುದೇ ಉಪಕರಣವನ್ನು ಕರೆ ಮಾಡುವ ಒಂದು ಹ್ಯಾಂಡ್ಲರ್? ಹೌದು, ಸರಿಹೊಂದುತ್ತದೆ, ಇದರ ಕೋಡ್ ಇದು:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ಎಂಬುದು ಸಾಧನದ ಹೆಸರುಗಳನ್ನು ಕೀಗಳಾಗಿ ಹೊಂದಿರುವ ನಿಘಂಟು.
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
    // TODO ಸಾಧನವನ್ನು ಕರೆ ಮಾಡು,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

ಮೇಲಿನ ಕೋಡ್‌ನಿಂದ ನೀವು ನೋಡಬಹುದು, ನಾವು ಕರೆಮಾಡಬೇಕಾದ ಉಪಕರಣವನ್ನು ಮತ್ತು ಅದರ ವಾದಗಳನ್ನು پار್ಸ್ ಮಾಡಬೇಕಾಗುತ್ತದೆ, ಆಮೇಲೆ ನಾವು ಆ ಉಪಕರಣವನ್ನು ಕರೆ ಮಾಡಬೇಕು.

## ಮಾನ್ಯತೆ ಹೆಚ್ಚಿಸುವ ಮೂಲಕ ವಿಧಾನ ಸುಧಾರಣೆ

ಈಗವರೆಗೆ, ನೀವು ನೋಡಿದಂತೆ ನಿಮ್ಮ ಎಲ್ಲಾ ನೋಂದಣೆಗಳು ಉಪಕರಣಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಪ್ರಾಂಪ್ಟ್‌ಗಳಿಗೆ ಈ ಎರಡು ಹ್ಯಾಂಡ್ಲರ್‌ಗಳು ಮೂಲಕ ಬದಲಾಗಬಹುದು. ಇನ್ನೇನು ಮಾಡಬೇಕು? ನಾವು ವಾದಗಳ ಸರಿಯಾದತೆಯನ್ನು ಖಚಿತಪಡಿಸುವುದಕ್ಕೆ ಮಾನ್ಯತೆ (validation) ಸೇರಿಸಬೇಕು. ಪ್ರತಿ ರನ್‌ಟೈಮ್ ತಮ್ಮದೇ ಪರಿಹಾರವನ್ನು ಬಳಸುತ್ತವೆ, ಉದಾಹರಣೆಗೆ Python ನಲ್ಲಿ Pydantic ಮತ್ತು TypeScript ನಲ್ಲಿ Zod ಬಳೆಯಲಾಗುತ್ತದೆ. ತ वर्तमान ಉದ್ದಿಮೆ ಹೀಗಿದೆ:

- ವೈಶಿಷ್ಟ್ಯ (ಉಪಕರಣ, ಸಂಪನ್ಮೂಲ ಅಥವಾ ಪ್ರಾಂಪ್ಟ್) ರಚಿಸುವ ತಂತ್ರವನ್ನು ಅದರ ಮೀಸಲಾದ ಫೋಲ್ಡರ್‌ಗೆ ಕರೆದೊಯ್ಯಿ.
- ಉದಾಹರಣೆಗೆ ಉಪಕರಣವನ್ನು ಕರೆ ಮಾಡಬೇಕೆಂದು ಬಂದಲ್ಲೋಷಿಸುವ ಅಪ್‌ಲಿಕೇಶನ್ ದೃಷ್ಟಿಯಿಂದ ಮಾನ್ಯತೆ ಸೇರಿಸಲು ಮಾರ್ಗ ಕಂಡುಹಿಡಿಯಿರಿ.

### ವೈಶಿಷ್ಟ್ಯ ರಚನೆ

ವೈಶಿಷ್ಟ್ಯ ರಚಿಸಲು, ನಾವು ಆ ವೈಶಿಷ್ಟ್ಯಕ್ಕೆ ಫೈಲ್ ರಚಿಸಬೇಕು ಮತ್ತು ಅದರಲ್ಲಿ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳು ಇರಬೇಕು. ಕ್ಷೇತ್ರಗಳು ಉಪಕರಣಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಪ್ರಾಂಪ್ಟ್‌ಗಳ ಜಾಗದಲ್ಲಿ ಸ್ವಲ್ಪ ಬದಲಾಗುತ್ತವೆ.

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
        # ಪಿಡ್ಯಾಂಟಿಕ್ ಮಾದರಿಯನ್ನು ಬಳಸಿ ಇನ್‌ಪುಟ್ ಮಾನ್ಯಗೊಳಿಸಿ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: ಪಿಡ್ಯಾಂಟಿಕ್ ಸೇರಿಸಿ, þannig ನಾವು AddInputModel ರಚಿಸಿ ಮತ್ತು ಆರ್ಗ್‌ಗಳನ್ನು ಮಾನ್ಯಗೊಳಿಸಬಹುದು

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ನೀವು ಇದು ಹೇಗೆ ಮಾಡುತ್ತೀರೋ ಈ ಕೆಳಗಿನಂತೆ ನೋಡಬಹುದು:

- Pydantic `AddInputModel` ಎಂಬ schema ಅನ್ನು *schema.py* ಫೈಲ್‌ನಲ್ಲಿ ಸ್ಥಾಪಿಸಿ, ಅದರೊಳಗೆ `a` ಮತ್ತು `b` ಎಂದು ಕ್ಷೇತ್ರಗಳಿವೆ.
- ಬಂದಿರುವ ಅಪೇಕ್ಷೆಯನ್ನು `AddInputModel` ಪ್ರಕಾರಕ್ಕೆ ಪಾರ್ಸ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸಿ, ಸಾಕಷ್ಟು ಸಮಮಾನದಿಲ್ಲವೇ ಅದಾದಲ್ಲಿ ಅಪ್ಲಿಕೇಶನ್ ವಿಫಲವಾಗುತ್ತದೆ:

   ```python
   # add.py
    try:
        # ಪೈಡ್ಯಾಂಟಿಕ್ ಮಾದರಿಯನ್ನು ಬಳಸಿ ಇನ್‌ಪುಟ್ ಪರಿಶೀಲಿಸಿ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

ನೀವು ಈ ಪಾರ್ಸಿಂಗ್ ಲಾಜಿಕ್ ಅನ್ನು ಉಪಕರಣ ಕರೆಯುವಿಕೆಯಲ್ಲಿಯೇ ಅಥವಾ ಹ್ಯಾಂಡ್ಲರ್ ಫಂಕ್ಷನ್ನಲ್ಲಿ ಇರಿಸಬಹುದಾಗಿದೆ.

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

       // @ts-ಅಗ್ನೆಕ್ಷೆ
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

// స్కೀಮ.ts
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

- ಎಲ್ಲ ಉಪಕರಣ ಕರೆಯುವಿಕೆಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತಿರುವ ಹ್ಯಾಂಡ್ಲರ್‌ನಲ್ಲಿ, ನಾವು ಈಗ ಬಂದಿರುವ ವಿನಂತಿಯನ್ನು ಉಪಕರಣದ ನಿರ್ದಿಷ್ಟ-schema ಗೆ ಪಾರ್ಸ್ ಮಾಡುತ್ತೇವೆ:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ಇದು ಕಾರ್ಯನಿರ್ವಹಿಸಿದರೆ, ನಾವು ನಿಜವಾದ ಉಪಕರಣವನ್ನು ಕರೆ ಮಾಡುತ್ತೇವೆ:

    ```typescript
    const result = await tool.callback(input);
    ```

ನೀವು ನೋಡಬಹುದು, ಈ ವಿಧಾನ ಒಂದು ಉತ್ತಮ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ ಏಕೆಂದರೆ ಪ್ರತಿಯೊಂದು ಅವಯವವಿಗೂ ತನ್ನ ಸ್ಥಳವಿದೆ, *server.ts* ಒಂದು ಬಹಳ ಸಣ್ಣ ಫೈಲ್ ಆಗಿದ್ದು ಕೇವಲ ವಿನಂತಿ ಹ್ಯಾಂಡ್ಲರ್ ಗಳನ್ನು ಜೋಡಿಸುತ್ತದೆ ಮತ್ತು ಪ್ರತಿ ವೈಶಿಷ್ಟ್ಯವು ತನ್ನ ಸಂಬಂಧಿಸಿದ ಫೋಲ್ಡರ್‌ನಲ್ಲಿದೆ ಉದಾ: tools/, resources/ ಅಥವಾ prompts/.

ಅದ್ಭುತ, ನಂತರದ ಹಂತಕ್ಕೆ ಬನ್ನಿ.

## ಅಭ್ಯಾಸ: ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ರಚನೆ

ಈ ಅಭ್ಯಾಸದಲ್ಲಿ ನಾವು ಈ ಕೆಳಕಂಡವುಗಳನ್ನು ಮಾಡುತ್ತೇವೆ:

1. ಉಪಕರಣಗಳ ಪಟ್ಟಿಯನ್ನು ನಿರ್ವಹಿಸುವ ಮತ್ತು ಉಪಕರಣಗಳನ್ನು ಕರೆ ಮಾಡುವ ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಅನ್ನು ರಚಿಸಿ.
1. ನೀವು ಆಧಾರವಾಗಿರಬಹುದಾದ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿ.
1. ನಿಮ್ಮ ಉಪಕರಣ ಕರೆದೊಯ್ಯುವಿಕೆಗಳನ್ನು ಸರಿಯಾಗಿ ಮಾನ್ಯಗೊಳಿಸುವುದಕ್ಕಾಗಿ ಮಾನ್ಯತೆ ಸೇರಿಸಿ.

### -1- ವಾಸ್ತುಶಿಲ್ಪ ರಚನೆ

ನಮಗೆ ಮೊದಲನೆಯದರಲ್ಲಿ ಏನಿದೆಂದರೆ, ನಾವು ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಸೇರಿಸುವಂತೆ ಪ್ರಮಾಣಿತವಾಗಿ ಸ್ಕೇಲ್ ಆಗಲು ಸಹಾಯ ಮಾಡುವ ವಾಸ್ತುಶಿಲ್ಪ. ಇದು ಹೀಗಿದೆ:

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

ಈಗ ನಾವು ಒಂದು ವಾಸ್ತುಶಿಲ್ಪವು ರಚಿಸಲಾಗಿದೆ ಅದು tools ಫೋಲ್ಡರ್ ನಲ್ಲಿ ಸುಲಭವಾಗಿ ಹೊಸ ಉಪಕರಣಗಳನ್ನು ಸೇರಿಸಬಹುದು ಎಂದು ಖಚಿತಪಡಿಸುತ್ತದೆ. ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಪ್ರಾಂಪ್ಟ್ ಗಾಗಿ ಉಪ ಡೈರೆಕ್ಟರಿ ಗಳನ್ನು ಸೇರಿಸಲು ಈ ಮಾದರಿಯನ್ನು ಅನುಸರಿಸಬಹುದು.

### -2- ಉಪಕರಣ ರಚನೆ

ಮುಂದಿನ ತಂತಿನಲ್ಲಿ ಉಪಕರಣ ರಚನೆ ಹೇಗೆ ಇರುವುದೆಂದು ನೋಡೋಣ. ಮೊದಲು, ಅದು ತನ್ನ *tool* ಉಪ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ ರಚಿಸಬೇಕಾಗುತ್ತದೆ ಹೀಗಿದೆ:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic ಮಾದರಿಯನ್ನು ಬಳಸಿ ಇನ್ಪುಟ್‌ ಅನ್ನು ಮಾನ್ಯಗೊಳಿಸಿ
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic ಸೇರಿಸಬೇಕು, ताकि ನಾವು AddInputModel ರಚಿಸಿ args ಅನ್ನು ಮಾನ್ಯಗೊಳಿಸಬಹುದು

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ಇಲ್ಲಿ ನಾವು ನೋಡುವುದು ಹೇಗೆ ಹೆಸರು, ವಿವರಣೆ ಮತ್ತು ಇನ್‌ಪುಟ್ ಸ್ಕೀಮಾ ಅನ್ನು Pydantic ಬಳಸಿ ವ್ಯಾಖ್ಯಾನಿಸುತ್ತೇವೆ ಹಾಗೂ ಉಪಕರಣ ಕರೆ ಮಾಡಲಾಗುವಾಗ ಕರೆದೊಯ್ಯುವ ಹ್ಯಾಂಡ್ಲರ್. ಕೊನೆಗೆ, `tool_add` ಅನ್ನು ವ್ಯಕ್ತಪಡಿಸುತ್ತೇವೆ ಅದು ಈ ಎಲ್ಲಾ ಗುಣಲಕ್ಷಣಗಳನ್ನು ಹೊಂದಿರುವ ಡಿಕ್ಷನರಿ.

*schema.py* ಕೂಡ ಇದೆ ಅದು ನಮ್ಮ ಉಪಕರಣ ಬಳಸುವ ಇನ್‌ಪುಟ್ ಸ್ಕೀಮಾವನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಲು ಬಳೆಯಲಾಗುತ್ತದೆ:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

ನಾವು *__init__.py* ಅನ್ನು ಕೂಡ ತುಂಬಿಸಬೇಕು ಇದರಿಂದ tools ಡೈರೆಕ್ಟರಿ ಒಂದು ಮೋಡ್ಯೂಲ್ ಆಗಿ ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ. ಜೊತೆಗೆ, ನಾವು ಅದರೊಳಗಿನ ಮೋಡ್ಯೂಲ್‌ಗಳನ್ನು ಹಾಗೆಯೇ ಬಹಿರಂಗಪಡಿಸಬೇಕು:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

ನಾವು ಹೆಚ್ಚುವರಿ ಉಪಕರಣಗಳನ್ನು ಸೇರಿಸುವಾಗ ಈ ಫೈಲ್‌ಗೆ ಹೆಚ್ಚಿಸಲು ಮುಂದುವರಿಸಬಹುದು.

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

ಇಲ್ಲಿ ನಾವು ಗುಣಲಕ್ಷಣಗಳಿದ್ದ ಡಿಕ್ಷನರಿಯನ್ನು ರಚಿಸುತ್ತೇವೆ:

- name, ಇದು ಉಪಕರಣದ ಹೆಸರು.
- rawSchema, ಇದು Zod ಸ್ಕೀಮಾ ಆಗಿದ್ದು, ಈ ಉಪಕರಣವನ್ನು ಕರೆ ಮಾಡುವ ವಿನಂತಿಗಳನ್ನು ಮಾನ್ಯಗೊಳಿಸಲು ಬಳಸಲಾಗುತ್ತದೆ.
- inputSchema, ಈ ಸ್ಕೀಮಾ ಹ್ಯಾಂಡ್ಲರ್ ಓಡಿಸುವಾಗ ಬಳಸಲಾಗುತ್ತದೆ.
- callback, ಉಪಕರಣವನ್ನು ಕರೆ ಮಾಡಲು ಬಳಸಲಾಗುತ್ತದೆ.

`Tool` ಕೂಡ ಇದೆ ಇದು ಈ ಡಿಕ್ಷನರಿಯನ್ನು mcp ಸರ್ವರ್ ಹ್ಯಾಂಡ್ಲರ್ ಸ್ವೀಕರಿಸಲು ಆದ ಪ್ರಕಾರಕ್ಕೆ ಪರಿವರ್ತಿಸುತ್ತದೆ ಹೀಗಿದೆ:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

ಮತ್ತು *schema.ts* ಇದೆ ನಾವು ಪ್ರತಿ ಉಪಕರಣಕ್ಕೆ ಇನ್‌ಪುಟ್ ಸ್ಕೀಮಾಗಳನ್ನು ಇರುತ್ತದೆ, ಈಗ ಒಂದು ಸ್ಕೀಮಾ ಮಾತ್ರ ಇದೆ ಆದರೆ ನಾವು ಹೊಸ ಉಪಕರಣಗಳನ್ನು ಸೇರಿಸಿದಂತೆ ಹೆಚ್ಚು ಎಂಟ್ರಿಗಳು ಸೇರಿಸಬಹುದು:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ಅದ್ಭುತ, ಮುಂದಿನ ಹಂತಕ್ಕೆ ಬನ್ನಿ ಉಪಕರಣಗಳ ಪಟ್ಟಿ ನಿರ್ವಹಿಸುವುದಕ್ಕೆ.

### -3- ಉಪಕರಣಗಳ ಪಟ್ಟಿ ನಿರ್ವಹಣೆ

ಮುಂದಿನದಾಗಿ, ಉಪಕರಣಗಳ ಪಟ್ಟಿ ನಿರ್ವಹಿಸಲು, ನಾವು ಅದಕ್ಕಾಗಿ ವಿನಂತಿ ನಿರ್ವಹಣಿಯನ್ನು ಹೊಂದಬೇಕು. ಸರ್ವರ್ ಫೈಲ್‌ಗೆ ನಾವು ಸೇರಿಸಬೇಕಾಗಿತ್ತು ಇದು ಹೀಗಿದೆ:

**Python**

```python
# ಸರಳತೆಗೆ ಕೋಡ್​​​​ನ್ನು ತೆಗೆದುಹಾಕಲಾಗಿದೆ
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

ಇಲ್ಲಿ, ನಾವು `@server.list_tools` ಡೆಕಾರೇಟರ್ ಮತ್ತು `handle_list_tools` ಫಂಕ್ಷನ್ ಅನ್ನು ಸೇರಿಸುತ್ತೇವೆ. ಈ ನಂತರ ನಾವು ಉಪಕರಣಗಳ ಪಟ್ಟಿ ತಯಾರಿಸಬೇಕು. ಪ್ರತಿಯೊಂದು ಉಪಕರಣಕ್ಕೂ ಹೆಸರು, ವಿವರಣೆ ಮತ್ತು inputSchema ಇರಬೇಕು.

**TypeScript**

ಉಪಕರಣ ಪಟ್ಟಿ ನಿರ್ವಹಣೆಗೆ ವಿನಂತಿ ನಿರ್ವಹಣಿಯನ್ನು ಏರ್ಪಡಿಸಲು, ಸರ್ವರ್‌ನಲ್ಲಿ `setRequestHandler` ಅನ್ನು ಕರೆ ಮಾಡಬೇಕು, ಈ ಪ್ರಕಾರ `ListToolsRequestSchema` ಅನ್ನು ಪ್ರಯೋಜನಪಡಿಸಬೇಕು.

```typescript
// ಇಂಡೆಕ್ಸ್.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// ಸರ್ವರ್.ts
// ತುಂಬು ವಿವರಣೆಗಾಗಿ ಕೋಡ್ ತೆಗೆದುಕೊಂಡಿದೆ
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // ನೋಂದಾಯಿತ ಸಾಧನಗಳ ಪಟ್ಟಿ ಹಿಂತಿರುಗಿಸಿ
  return {
    tools: tools
  };
});
```

ಅದ್ಭುತ, ಈಗ ನಾವು ಉಪಕರಣಗಳ ಪಟ್ಟಿ ಕುರಿತು ಸಮಸ್ಯೆಗಳಿಗೆ ಪರಿಹಾರ ಕಂಡುಕೊಂಡಿದ್ದೇವೆ, ಮುಂದಿನದಾಗಿ ಉಪಕರಣಗಳನ್ನು ಕರೆ ಮಾಡುವುದನ್ನು ನೋಡೋಣ.

### -4- ಉಪಕರಣ ಕರೆ ನಿರ್ವಹಣೆ

ಉಪಕರಣವನ್ನು ಕರೆ ಮಾಡಲು, ನಾವು ಇನ್ನೊಂದು ವಿನಂತಿ ನಿರ್ವಹಣೆಯನ್ನು ಹೊಂದಬೇಕು, ಇದು ಯಾವ ವೈಶಿಷ್ಟ್ಯವನ್ನು ಮತ್ತು ಯಾವ ವಾದಗಳೊಂದಿಗೆ ಕರೆಯಬೇಕೆಂದು ನಿರ್ಧಾರ ಮಾಡುತ್ತದೆ.

**Python**

`@server.call_tool` ಡೆಕಾರೇಟರ್ ಬಳಸಿ ಮತ್ತು `handle_call_tool` ಎಂಬ ಫಂಕ್ಷನ್ ನಿಂದ ಇದನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸೋಣ. ಆ ಫಂಕ್ಷನ್ ಒಳಗೆ ನಾವು ಉಪಕರಣದ ಹೆಸರನ್ನು, ಅದರ ವಾದಗಳನ್ನು ಪಾರ್ಸ್ ಮಾಡಬೇಕು ಮತ್ತು ವಾದಗಳು ಸರಿ ಎಂದು ಖಚಿತಪಡಿಸಬೇಕು. ನಾವು ಈ ಮಾನ್ಯತೆಗಳನ್ನು ಈ ಫಂಕ್ಷನ್ನಲ್ಲಿ ಅಥವಾ ನಿಜವಾದ ಉಪಕರಣದೊಳಗೆ ಮಾನ್ಯಪಡಿಸಬಹುದು.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools ಎಂಬುದು ಸಾಧನದ ಹೆಸರುಗಳನ್ನು ಕೀಲಿಗಳಾಗಿ ಹೊಂದಿರುವ ಡಿಕ್ಷನರಿ
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ಸಾಧನವನ್ನು ಕರೆಸಿ
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

ಇಲ್ಲಿ ಏನು ನಡೆಯುತ್ತದೆ:

- ನಮ್ಮ ಉಪಕರಣದ ಹೆಸರು ಈಗಾಗಲೇ `name` ಎಂದು ಇನ್‌ಪುಟ್ ಪರಿಮಾಣವಾಗಿ ಇದೆ ಮತ್ತು ನಮ್ಮ ವಾದಗಳು `arguments` ಡಿಕ್ಷನರಿ ರೂಪದಲ್ಲಿವೆ.

- ಉಪಕರಣವನ್ನು `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` ಮೂಲಕ ಕರೆ ಮಾಡಲಾಗುತ್ತದೆ. ವಾದಗಳ ಮಾನ್ಯತೆ `handler` ಗುಣಲಕ್ಷಣದಲ್ಲಿನ ಫಂಕ್ಷನ್ನಲ್ಲಿಯೇ ನಡೆಯುತ್ತದೆ, ಅದು ವಿಫಲವಾದರೆ ಹೊರತಾಗುವ ಸಭೆಯು ಉಂಟಾಗುತ್ತದೆ.

ಹೀಗಾಗಿ, ನಾವು ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ಬಳಸಿ ಉಪಕರಣಗಳ ಪಟ್ಟಿ ಮಾಡುವುದು ಮತ್ತು ಕರೆ ಮಾಡುವುದು ಪೂರ್ಣವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇವೆ.

ಸಂಪೂರ್ಣ ಉದಾಹರಣೆಯನ್ನು ನೋಡಿ: [full example](./code/README.md)

## ನಿಯೋಜನೆ

ನಿಮಗೆ ನೀಡಲಾದ ಕೋಡ್‌ಗೆ ಹಲವಾರು ಉಪಕರಣಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ವಿಸ್ತರಿಸಿ ಮತ್ತು ನೀವು ಗಮನಿಸುವಂತೆ ನೀವು ಕೇವಲ tools ಡೈರೆಕ್ಟರಿಯಲ್ಲಿನ ಫೈಲ್‌ಗಳನ್ನು ಸೇರಿಸುವುದು ಮಾತ್ರ ಬೇಕೆಂದು ತಿಳಿದುಕೊಳ್ಳಿ.

*ಯಾವುದೇ ಪರಿಹಾರ ನೀಡಲಾಗಿಲ್ಲ*

## ಸಾರಾಂಶ

ಈ ಅಧ್ಯಾಯದಲ್ಲಿ, ಕಡಿಮೆ ಮಟ್ಟದ ಸರ್ವರ್ ವಿಧಾನ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಮತ್ತು ಅದರಿಂದ ನಾವು ಸುಂದರವಾದ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಹೇಗೆ ರಚಿಸಬಹುದು ಎಂದು ನೋಡಿದ್ದೇವೆ. ನಾವು ಮಾನ್ಯತೆ ಕುರಿತು ಚರ್ಚೆಮಾಡಿದ್ದೇವೆ ಮತ್ತು ನೀವು ಮಾನ್ಯತೆ ಗ್ರಂಥಾಲಯಗಳೊಂದಿಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುವುದಕ್ಕೆ ಹೇಗೆ ಸ್ಕೀಮಾಗಳನ್ನು ರಚಿಸುವುದೆಂದು ಪ್ರದರ್ಶಿಸಲ್ಪಟ್ಟಿರುತ್ತೀರಿ.

## ಮುಂದಿನದು ಏನು

- ಮುಂದಿನದು: [Simple Authentication](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->