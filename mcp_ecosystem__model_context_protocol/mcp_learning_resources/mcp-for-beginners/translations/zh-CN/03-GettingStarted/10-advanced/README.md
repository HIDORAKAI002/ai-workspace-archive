# 高级服务器使用

MCP SDK 中暴露了两种不同类型的服务器，普通服务器和低级服务器。通常情况下，你会使用普通服务器来添加功能。但在某些情况下，你可能想依赖低级服务器，比如：

- 更好的架构设计。既可以用普通服务器也可以用低级服务器创建干净的架构，但有人可能会认为低级服务器稍微更简单一些。
- 功能可用性。一些高级功能只能使用低级服务器。稍后章节中你会看到这些功能，比如添加采样（在 `2026-07-28` 版本候选中已弃用）和引导。

## 普通服务器 vs 低级服务器

下面是使用普通服务器创建 MCP 服务器的样式

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

重点是你显式地添加每个你想让服务器拥有的工具、资源或提示。这样做没问题。  

### 低级服务器方法

但是，当你使用低级服务器方法时，需要以不同的思路考虑。你不再注册每个工具，而是为每种功能类型（工具、资源或提示）创建两个处理函数。例如工具就只有两个函数，如下：

- 列出所有工具。一个函数负责处理所有列出工具的尝试。
- 处理调用所有工具。在这里也只有一个函数负责处理调用工具的请求。

听起来似乎工作量更小，对吧？所以我不需要注册工具，只需确保当我列出所有工具时它被列出，同时当有调用工具请求时它会被调用。

来看看现在的代码长什么样：

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

现在我们有一个函数返回功能列表。工具列表中的每个条目都包含 `name`、`description` 和 `inputSchema` 字段以符合返回类型。这使得我们可以把工具和功能定义放在别处。我们现在可以在一个 tools 文件夹中创建所有工具，所有功能也是如此，这样你的项目结构就可以组织成这样：

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

这很好，我们的架构可以变得非常干净。

那调用工具呢？也是一个处理函数调用任何工具吗？没错，代码如下：

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

从上面代码可以看到，我们需要解析出要调用的工具及传入的参数，然后进行调用。

## 用验证改进方法

到目前为止，你已经看到添加工具、资源和提示的注册都可以用每种功能类型的两个处理函数替代。那我们还需要做什么呢？我们应该加入某种形式的验证，确保工具调用时使用了正确的参数。每个运行时环境有各自的解决方案，比如 Python 用 Pydantic，TypeScript 用 Zod。思路是：

- 把创建功能（工具、资源或提示）的逻辑转移到专门的文件夹。
- 添加对传入请求进行验证的方式，比如调用工具请求。

### 创建一个功能

创建功能时，我们需要为该功能创建一个文件，并确保它包含该功能必需的字段。不同功能间字段有些不同。

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

这里你可以看到我们做了以下事情：

- 在 *schema.py* 文件中用 Pydantic 创建 `AddInputModel` 模式，包含字段 `a` 和 `b`。
- 尝试将传入请求解析为 `AddInputModel` 类型，如果参数不匹配会崩溃：

   ```python
   # add.py
    try:
        # 使用Pydantic模型验证输入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

你可以选择把解析逻辑放在工具调用里或者处理函数里。

**TypeScript**

```typescript
// 服务器.ts
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

       // @ts-忽略
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

// 模式.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// 添加.ts
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

- 在处理所有工具调用的处理函数里，尝试把传入请求解析成工具定义的模式：

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    如果成功则继续调用实际工具：

    ```typescript
    const result = await tool.callback(input);
    ```

如你所见，这种方法创造了很好的架构，所有东西各有其处，*server.ts* 是个很小的文件，仅用来连线请求处理函数，每个功能均在各自文件夹里面，即 tools/、resources/ 或 prompts/。

太好了，我们开始构建这个吧。

## 练习：创建低级服务器

这个练习中，我们将：

1. 创建一个低级服务器处理工具的列出和调用。
1. 实现一个可以扩展的架构。
1. 添加验证确保工具调用得到妥善验证。

### -1- 创建架构

我们首先需要一个有助于扩展的架构，方便后续添加更多功能，架构如下：

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

现在我们建立了一个架构，能轻松在 tools 文件夹新增工具。你也可以为资源和提示分别建立子目录。

### -2- 创建一个工具

接下来看看创建工具长什么样。工具先在其 *tool* 子目录中创建，如下：

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # 使用 Pydantic 模型验证输入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # 待办事项：添加 Pydantic，以便我们可以创建一个 AddInputModel 并验证参数

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

这里可以看到如何用 Pydantic 定义名称、描述和输入模式，以及工具被调用时触发的处理函数。最后，`tool_add` 是个字典，持有所有属性。

还有 *schema.py* 文件用来定义工具的输入模式：

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

还需填充 *__init__.py* 来确保 tools 目录作为模块处理，同时暴露模块如下：

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

我们可以随着添加更多工具继续扩展此文件。

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

这里我们创建了包含属性的字典：

- name，工具名称。
- rawSchema，Zod 模式，用于验证调用此工具的请求。
- inputSchema，这个模式供处理函数使用。
- callback，用于调用这个工具。

还有 `Tool`，它用来把字典转换为 MCP 服务器处理函数可接受的类型，样例如下：

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

*schema.ts* 中存放每个工具输入模式，目前只有一个模式，添加更多工具时可以增加：

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

好了，接下来处理工具列表的部分。

### -3- 处理工具列表

接下来，要处理工具列表请求，需为其设置请求处理函数。需要在服务器文件中添加如下：

**Python**

```python
# 代码省略以简洁显示
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

这里添加了装饰器 `@server.list_tools` 和实现函数 `handle_list_tools`。后者需要返回工具列表。注意每个工具都须有名称、描述和输入架构。   

**TypeScript**

设定列出工具请求处理函数，需要在服务器上调用 `setRequestHandler`，用符合功能的模式，这里是 `ListToolsRequestSchema`。 

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
// 代码省略以简洁
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 返回注册工具的列表
  return {
    tools: tools
  };
});
```

好了，工具列表部件下来，让我们看看如何调用工具。

### -4- 处理调用工具

调用工具时，我们需要再设置一个请求处理函数，这次针对请求中指定调用哪一个功能及参数进行处理。

**Python**

用装饰器 `@server.call_tool` 实现，如用 `handle_call_tool` 函数。函数内部我们需解析工具名称和参数，并确保参数对该工具有效。可以在此函数或实际工具里验证参数。

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

具体如下：

- 工具名已作为参数 `name` 输入，而参数是 `arguments` 字典形式。

- 使用 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` 调用工具。参数验证在 `handler` 属性指向的函数中进行，失败会抛异常。

这样，我们就完全理解了如何用低级服务器列出和调用工具。

[完整示例](./code/README.md) 请查看这里

## 任务

在已有代码基础上添加多个工具、资源和提示，体会仅需在 tools 目录添加文件即可，其它地方无需改动。

<em>未提供解决方案</em>

## 总结

本章介绍了低级服务器方法及其如何帮助创建良好架构。我们还讨论了验证，并演示了如何使用验证库创建输入验证模式。

## 后续内容

- 下一步：[简单认证](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->