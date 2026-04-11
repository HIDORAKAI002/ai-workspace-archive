# 高级服务器使用

MCP SDK 中暴露了两种不同类型的服务器：普通服务器和低级服务器。通常情况下，您会使用普通服务器来添加功能。但在某些情况下，您可能想依赖低级服务器，例如：

- 更好的架构。使用普通服务器和低级服务器都可以创建干净的架构，但可以说用低级服务器稍微更容易一些。
- 功能可用性。某些高级功能只能通过低级服务器使用。后续章节中添加采样和诱导时您将看到这点。

## 普通服务器 vs 低级服务器

普通服务器创建 MCP Server 的示例如下：

**Python**

```python
mcp = FastMCP("Demo")

# 添加一个加法工具
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

// 添加一个加法工具
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

重点是您需要显式添加想要服务器具备的每个工具、资源或提示。这样做没有任何问题。

### 低级服务器方法

然而，使用低级服务器时，思考方式不同。不是注册每个工具，而是为每种功能类型（工具、资源或提示）创建两个处理器。例如，对于工具，只需要两个函数：

- 列出所有工具。一个函数负责所有列出工具的请求。
- 处理调用工具。这里也只有一个函数负责调用工具。

听起来工作量可能更少吧？所以不需要注册工具，只需要确保在列出所有工具时该工具被列出，并且在请求调用工具时被调用。

来看一下代码现在的写法：

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
  // 返回已注册工具的列表
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

这里有一个返回功能列表的函数。工具列表的每个条目都有 `name`、`description` 和 `inputSchema` 等字段以满足返回类型。这使得我们可以将工具和功能定义放到别处。现在可以在 tools 文件夹中创建所有工具，功能同理，这样项目结构就可以组织成这样：

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

很好，架构可以变得相当干净。

调用工具呢？也是同样的想法吗，有一个处理器调用任意工具？是的，完全正确，代码如下：

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools 是一个以工具名称为键的字典
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
    
    // 参数: request.params.arguments
    // 待办 调用工具，

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

如上面代码所示，我们需要解析出要调用的工具和参数，然后进行调用。

## 通过验证改进方法

到目前为止，您已经看到如何用这两个处理器代替所有添加工具、资源和提示的注册。接下来还需要做什么？我们应该添加某种验证方式，确保调用工具时参数正确。每个运行时有各自的解决方案，例如 Python 使用 Pydantic，TypeScript 使用 Zod。思路如下：

- 将创建功能（工具、资源或提示）的逻辑移到其专用文件夹。
- 添加对传入请求的验证，例如调用工具。

### 创建一个功能

创建功能时，需要为该功能创建一个文件，确保它包含该功能要求的必填字段。不同功能（工具、资源、提示）字段略有不同。

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
        # 使用 Pydantic 模型验证输入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # 待办事项：添加 Pydantic，这样我们可以创建 AddInputModel 并验证参数

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

这里可以看到如下操作：

- 在 *schema.py* 文件中使用 Pydantic 创建模式 `AddInputModel`，字段有 `a` 和 `b`。
- 尝试将传入请求解析为 `AddInputModel` 类型，如果参数不匹配会崩溃：

   ```python
   # add.py
    try:
        # 使用Pydantic模型验证输入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

可以选择将解析逻辑放在工具调用中或处理器函数中。

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

- 在处理所有工具调用的处理器中，尝试将传入请求解析为工具定义的模式：

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    如果解析成功，则继续调用实际工具：

    ```typescript
    const result = await tool.callback(input);
    ```

如您所见，这种方法构建出一种很好的架构，所有内容都有其位置，*server.ts* 是很小的文件，仅负责连接请求处理器，每个功能都放在各自的文件夹中：tools/、resources/ 或 prompts/。

很好，接下来我们尝试构建它。

## 练习：创建低级服务器

在本练习中，我们将：

1. 创建一个低级服务器，处理工具列表和工具调用。
2. 实现一个可继续构建的架构。
3. 添加验证，确保工具调用的参数经过验证。

### -1- 创建架构

首先需要处理一个帮助我们随着添加更多功能而扩展的架构，如下：

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

现在设置了一个架构，确保可以轻松在 tools 文件夹中添加新工具。您也可以按此方法为 resources 和 prompts 添加子目录。

### -2- 创建工具

接下来看看如何创建工具。首先，它需要在其 *tool* 子目录中创建，如下：

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # 使用 Pydantic 模型验证输入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # 待办：添加 Pydantic，这样我们可以创建一个 AddInputModel 并验证参数

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

这里定义了工具的名称、描述和通过 Pydantic 定义的输入模式，以及调用时触发的处理器。最后，暴露 `tool_add` 字典，包含所有这些属性。

还有 *schema.py* 用于定义工具的输入模式：

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

还需要填充 *__init__.py*，确保 tools 目录被视为模块。此外，需要像这样暴露其中的模块：

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

随着添加更多工具，可继续向此文件添加内容。

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

这里创建了一个包含属性的字典：

- name，工具名称。
- rawSchema，这是 Zod 模式，用于验证调用工具的传入请求。
- inputSchema，处理器使用的模式。
- callback，用于调用工具。

还有 `Tool` 类型，用于将该字典转换为 mcp 服务器处理器可接受的类型，如下：

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

还有 *schema.ts*，存储每个工具的输入模式，目前只有一个模式，添加工具时可以增加：

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

很好，接下来处理如何列出工具。

### -3- 处理工具列表

要处理工具列表，需要为此设置请求处理器。需要在服务器文件中添加：

**Python**

```python
# 代码为简洁起见而省略
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

这里使用装饰器 `@server.list_tools` 和实现函数 `handle_list_tools`。后者需要生成工具列表。注意每个工具都需要有 name、description 和 inputSchema。

**TypeScript**

设置工具列表请求处理器，需要在服务器上调用 `setRequestHandler`，使用符合需求的模式，这里是 `ListToolsRequestSchema`。

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
// 代码简略
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 返回已注册工具的列表
  return {
    tools: tools
  };
});
```

很好，现在解决了工具列表问题，接下来看看如何调用工具。

### -4- 处理调用工具

调用工具时，需要设置另一个请求处理器，处理指定调用哪个功能以及参数的请求。

**Python**

使用装饰器 `@server.call_tool`，实现函数如 `handle_call_tool`。在该函数中解析工具名、参数，并确保参数对该工具有效。验证参数可在此函数或实际工具内部完成。

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools 是一个以工具名称为键的字典
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # 调用该工具
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

流程如下：

- 工具名通过输入参数 `name` 获取，与参数的形式为 `arguments` 字典。
- 调用工具使用 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`。参数验证在 `handler` 属性指向的函数里完成，失败时抛异常。

至此，我们对使用低级服务器列出和调用工具有了完整理解。

请查看[完整示例](./code/README.md)

## 作业

在已有代码基础上，添加多个工具、资源和提示，观察您只需在 tools 目录添加文件，无需 elsewhere 其他地方。

<em>不提供解决方案</em>

## 总结

本章介绍了低级服务器方法如何工作，以及它如何帮助我们创建一个可持续构建的良好架构。还讨论了验证，并演示了如何使用验证库创建输入验证模式。

## 接下来内容

- 下一节：[简单身份验证](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文档由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 进行翻译。虽然我们努力确保准确性，但请注意自动翻译可能包含错误或不准确之处。原始语言的文档应被视为权威来源。对于关键信息，建议使用专业人工翻译。我们不对因使用本翻译而引起的任何误解或误释承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->