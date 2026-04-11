# 高階伺服器使用

MCP SDK 裡面有兩種不同類型的伺服器，分別是一般的伺服器以及低階伺服器。通常，你會使用一般伺服器來新增功能。不過在某些情況下，你會想依賴低階伺服器，例如：

- 更佳的架構。用一般伺服器和低階伺服器都能建立乾淨的架構，但可以說低階伺服器會比較容易一點。
- 功能可用性。有些進階功能只能用低階伺服器。你會在後面章節看到這點，像是我們要加上抽樣和引導。

## 一般伺服器 vs 低階伺服器

使用一般伺服器建立 MCP Server 長得像這樣

**Python**

```python
mcp = FastMCP("Demo")

# 添加一個加法工具
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

// 新增一個加法工具
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

重點是你需要明確地加入每一個你要讓伺服器擁有的工具、資源或提示。這沒什麼問題。

### 低階伺服器的方式

不過使用低階伺服器方式時，你需要用不同的思維。你不是註冊每一個工具，而是針對每一項功能類型（工具、資源或提示）建立兩個處理器。例如工具就只有兩個函式：

- 列出所有工具。一個函式負責處理所有列出工具的請求。
- 處理呼叫所有工具的行為。在這裡也只有一個函式負責處理呼叫工具。

聽起來工作量會少一點對吧？所以不需要註冊工具，只需要確保工具有被列在工具清單裡，且當有呼叫工具的請求時能被呼叫。

我們來看看程式碼長什麼樣子：

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
  // 返回已註冊工具的列表
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

這裡有一個函式會回傳功能清單。每一筆工具清單的項目都有 `name`、`description` 與 `inputSchema` 這些欄位，以符合回傳類型。這讓我們可以把工具和功能定義放在其他地方。我們可以在 tools 資料夾建立所有工具，其他功能也一樣，這樣你的專案會變成像是這樣組織：

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

太好了，我們的架構就能變得非常乾淨。

那呼叫工具呢？是不是也是一個接收所有工具呼叫的處理器？沒錯，這是呼叫的程式碼：

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools 是一個以工具名稱為鍵的字典
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
    
    // 參數：request.params.arguments
    // 待辦事項，調用工具，

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

從以上程式碼可見，我們需要解析要呼叫的工具及參數，接著再執行呼叫。

## 用驗證改善方法

到目前為止，你已經看到如何用兩個處理器取代你新增工具、資源和提示的所有註冊。那我們還需要做什麼？我們應該加點驗證，確保呼叫工具時帶入的參數是正確的。每個 Runtime 都有自己的解決方案，例如 Python 使用 Pydantic，TypeScript 用 Zod。概念是：

- 將建立功能（工具、資源或提示）的邏輯移到專門的資料夾。
- 加入驗證機制，用來驗證進來的請求，比如呼叫工具時參數是否符合要求。

### 建立功能

建立功能時，我們會針對該功能建立一個檔案，並確保裡面有該功能必須的欄位。工具、資源和提示的欄位會有些差異。

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
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # 待辦事項：加入 Pydantic，讓我哋可以建立 AddInputModel 來驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

你可以看到我們做了以下事：

- 在 *schema.py* 裡用 Pydantic 建立 `AddInputModel` schema，帶有欄位 `a` 和 `b`。
- 嘗試把進來的請求解析成 `AddInputModel` 型別，參數不符就會當機：

   ```python
   # add.py
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

你可以選擇把解析邏輯放在工具本身呼叫中，或是放在處理器裡。

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

- 在處理所有工具呼叫的 handler 中，我們嘗試把進來的請求解析成該工具定義的 schema：

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    如果成功，我們就繼續呼叫該工具：

    ```typescript
    const result = await tool.callback(input);
    ```

如你所見，這樣的方式造就出良好的架構，所有東西都有自己的位置，*server.ts* 是一個非常小的檔案，只負責連接請求處理函式，每個功能都在它們的資料夾中，例如 tools/、resources/ 或 prompts/。

太好了，我們接著嘗試建立這個。

## 練習：建立低階伺服器

這個練習中，我們會做：

1. 建立低階伺服器，負責列出工具和呼叫工具。
2. 實作一個可以擴充的架構。
3. 加入驗證，確保工具呼叫被正確驗證。

### -1- 建立架構

第一件事是要建立一個可以隨著功能增加而擴展的架構，如下所示：

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

現在我們建立起的架構可以輕鬆地在 tools 資料夾中新增工具。你也可以照著這做，新增資源或提示的子資料夾。

### -2- 建立工具

接下來看看建立工具長怎樣。首先必須在 *tool* 子資料夾中建立：

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # 待辦事項：加入 Pydantic，以便我們可以建立 AddInputModel 並驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

這裡展示了如何使用 Pydantic 定義 name、description 與 input schema，以及定義當這個工具被呼叫時會被執行的處理器。最後我們用 `tool_add` 暴露一個包含所有這些內容的字典。

此外還有 *schema.py* 用來定義此工具使用的輸入 schema：

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

還需要填充 *__init__.py*，確保 tools 資料夾能被視為模組，同時我們要把裡面模組暴露出來，像這樣：

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

隨著新增更多工具，我們會持續往這個檔案裡加。

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

這裡我們建立一個包含屬性的字典：

- name，工具名稱。
- rawSchema，Zod schema，用來驗證進來的工具呼叫請求。
- inputSchema，handler 會使用的 schema。
- callback，用來執行該工具。

另外有個 `Tool`，用來把這個字典轉換成 mcp server handler 可接受的型別，長這樣：

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

另外 *schema.ts* 儲存了每個工具的輸入 schema，目前只有一個，但新增工具時會加更多：

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

很好，接著繼續處理工具列出功能。

### -3- 處理工具列出

接著要建立一個請求處理器來處理工具列出請求，伺服器檔案要加這段：

**Python**

```python
# 代碼略去以簡潔起見
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

這裡我們加上裝飾器 `@server.list_tools` 和實作函式 `handle_list_tools`，裡面要製造出工具清單。注意每個工具都需要有 name、description 和 inputSchema。

**TypeScript**

要建立列出工具的請求處理器，我們呼叫 server.setRequestHandler，並帶入適用的 schema，這裡是 `ListToolsRequestSchema`。

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
// 代碼為簡潔起見而省略
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 返回已註冊工具的列表
  return {
    tools: tools
  };
});
```

太好了，工具列出的部分解決了，接下來我們看如何呼叫工具。

### -4- 處理呼叫工具

要呼叫工具，我們得建立另一個請求處理器，處理會指定要呼叫哪個功能和帶入哪些參數的請求。

**Python**

我們使用裝飾器 `@server.call_tool`，並用 `handle_call_tool` 函式來實作。裡面要解析出工具名稱和參數，並確保參數是該工具可接受的。你可以選擇在這裡驗證參數或在工具內部做。

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools 是一個以工具名稱為鍵的字典
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # 調用該工具
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

流程如下：

- 工具名稱已存在於輸入參數的 `name` 中，參數在 `arguments` 字典裡。
- 呼叫工具使用 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`，參數驗證在該 handler 函式中，如果驗證失敗會丟例外。

這樣，我們就完整理解使用低階伺服器列出和呼叫工具的方法了。

參考這裡的[完整範例](./code/README.md)

## 作業

用你得到的程式碼擴充多個工具、資源和提示，體驗一下你發現只要在 tools 目錄新增檔案就能擴充，無需改動其他位置。

<em>沒有解答提供</em>

## 小結

本章節展示了低階伺服器的運作方式，以及它如何幫助我們建立可持續擴充的良好架構。我們也討論了驗證，並展示如何利用驗證庫建立輸入驗證的 schema。

## 下一步

- 下一章：[簡易認證](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件是使用人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的原文版本應被視為權威來源。對於重要資訊，建議使用專業人工翻譯。我們對因使用本翻譯而產生的任何誤解或誤釋概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->