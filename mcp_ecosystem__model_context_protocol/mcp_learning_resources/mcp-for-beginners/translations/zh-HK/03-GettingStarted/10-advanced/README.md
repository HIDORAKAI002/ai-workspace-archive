# 進階伺服器使用

MCP SDK 中公開了兩種類型的伺服器，分別是一般伺服器和低階伺服器。通常，你會使用一般伺服器來添加功能。但在某些情況下，你會想依賴低階伺服器，例如：

- 更佳架構。使用一般伺服器與低階伺服器都能建立乾淨的架構，但可以說使用低階伺服器會稍微簡單一些。
- 功能可用性。有些進階功能只能用低階伺服器，稍後我們會在加入取樣（在 `2026-07-28` 發行候選版已廢止）與引導時看到這點。

## 一般伺服器 vs 低階伺服器

下面是使用一般伺服器創建 MCP 伺服器的範例

**Python**

```python
mcp = FastMCP("Demo")

# 新增一個加法工具
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

// 添加一個加法工具
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

這裡重點是你需要明確添加你想要伺服器擁有的每個工具、資源或提示。這樣做沒有問題。  

### 低階伺服器方法

不過，使用低階伺服器時需要換個思考方式。不是註冊每個工具，而是每種功能類型（工具、資源或提示）建立兩個處理函式。例如工具只有兩個函式，如下：

- 列出所有工具。一個函式負責所有列出工具的嘗試。
- 呼叫所有工具。這裡也只有一個函式處理對工具的呼叫。

聽起來工作量可能比較少對吧？所以不用註冊工具，而是確保當列出工具時，工具會在列表裡；當收到呼叫工具請求時，會呼叫它。

讓我們看看現在的程式碼長什麼樣子：

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

這裡我們有一個回傳功能列表的函式。工具列表的每項目現在有 `name`、`description` 與 `inputSchema` 等欄位以符合回傳型別。這讓我們可以把工具與功能定義放到其他地方。我們現在可以在 tools 資料夾裡建立全部工具，其他功能也是一樣，專案組織會像這樣：

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

這很好，我們的架構可以很乾淨。

那呼叫工具呢？還是一個處理器負責呼叫任一工具嗎？是的，以下是程式碼：

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools 是一個以工具名稱作為鍵的字典
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
    // 待辦事項 呼叫工具，

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

從上面程式碼可以看到，我們需要解析要呼叫的工具和參數，然後執行該工具。

## 把方法改進加上驗證

到目前為止，你看到所有註冊工具、資源與提示都能用每種功能類型的兩個處理函式替代。還需要做什麼？應該加入某種驗證來確保呼叫工具的參數正確。每種執行時有自己的方案，例如 Python 用 Pydantic，TypeScript 用 Zod。想法如下：

- 把建立功能（工具、資源或提示）的邏輯移到專屬資料夾。
- 加入驗證機制，驗證呼叫工具等請求。

### 建立一個功能

建立功能時，需要為該功能建立檔案，確保有功能必要欄位。欄位對工具、資源與提示稍有不同。

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

    # TODO: 加入 Pydantic，讓我哋可以建立 AddInputModel 並驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

你可以看到我們做了以下事情：

- 在 *schema.py* 使用 Pydantic 建立 `AddInputModel`，有欄位 `a` 與 `b`。
- 嘗試解析收到的請求成為 `AddInputModel` 型別，若參數不符就會崩潰：

   ```python
   # add.py
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

你可以選擇把解析放在工具呼叫本身或是處理函式中。

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

- 在處理所有工具呼叫的處理器裡，我們試著把收到請求解析成該工具定義的 schema：

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    如果成功就接著呼叫實際工具：

    ```typescript
    const result = await tool.callback(input);
    ```

如你所見，這方法創造良好架構，*server.ts* 是個很小的檔案，只用來串接請求處理函式，每個功能分別放在工具、資源或提示資料夾裡。

很好，接著我們試著建立這個吧。 

## 練習：建立低階伺服器

在本練習中，我們將：

1. 建立低階伺服器，負責列出工具和呼叫工具。
1. 實作可繼續擴展的架構。
1. 加入驗證，確保工具呼叫有效。

### -1- 建立架構

我們首先需要一個有助擴展的架構，隨著功能增加維持方便。架構如下：

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

現在我們已建立一個架構，確保能輕鬆在 tools 資料夾中新增工具。同理你也可以為 resources 和 prompts 加子目錄。

### -2- 建立工具

接著看看如何建立工具。首先它必須在 *tool* 子目錄內建立，像這樣：

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: 添加 Pydantic，這樣我們可以建立 AddInputModel 並驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

這裡顯示如何使用 Pydantic 定義名稱、說明和輸入 schema，以及被呼叫時的處理函式。最後，我們暴露出 `tool_add`，這是一個字典包含上述屬性。

還有 *schema.py* 定義了工具入力的 schema：

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

我們還須填寫 *__init__.py*，確保 tools 目錄被當作模組。另外還需像下面這樣暴露其中的模組：

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

隨著新工具加入，我們可以持續新增至此檔案。

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

這裡我們建立一個字典，包含屬性：

- name，工具名稱。
- rawSchema，Zod schema，用於驗證呼叫該工具的請求。
- inputSchema，處理函式使用的 schema。
- callback，用來執行工具。

還有 `Tool`，用來將此字典轉成 mcp 伺服器處理函式可接受的型別，如下：

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

*schema.ts* 儲存各工具的輸入 schema，目前只有一個 schema，往後加入更多工具可新增多筆：

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

太好了，接下來處理工具列出功能。

### -3- 處理工具列出

接著要處理工具列表的請求，我們需要為此設定請求處理函式。伺服器檔案新增如下：

**Python**

```python
# 為簡潔起見，已省略代碼
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

這裡我們加入裝飾器 `@server.list_tools` 與實作函式 `handle_list_tools`，在後者產生工具列表。注意每個工具需有名稱、描述與 inputSchema。   

**TypeScript**

建立工具列表的請求處理函式，我們需要對伺服器呼叫 `setRequestHandler`，傳入對應的 schema，在此為 `ListToolsRequestSchema`。

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
// 為簡潔起見省略代碼
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 返回已註冊工具的清單
  return {
    tools: tools
  };
});
```

很好，現在我們完成工具列出功能，接著看看如何呼叫工具。

### -4- 處理呼叫工具

要呼叫工具，我們需要設定另一個請求處理函式，處理指定呼叫哪個功能及其參數的請求。

**Python**

我們使用裝飾器 `@server.call_tool`，實作函式如 `handle_call_tool`。在此函式中，需要解析工具名稱、輸入參數，並確保參數對該工具有效。參數驗證可以這裡進行，也可以放到實際工具中。

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
        # 調用工具
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

內容如下：

- 輸入參數中 `name` 即為工具名稱，`arguments` 字典則為工具參數。

- 呼叫工具使用 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`。參數驗證在 `handler` 函式中進行，失敗時會拋出例外。 

到此，我們已完整理解低階伺服器中列出與呼叫工具的流程。

請參閱完整範例 [full example](./code/README.md)

## 作業

擴充你現在的程式碼，加上多個工具、資源與提示，回想一下你只需在 tools 目錄新增檔案而不用改動其他地方。

<em>無提供解答</em>

## 總結

本章節我們了解了低階伺服器的運作方式，以及如何建立可持續擴展的良好架構。我們也討論了驗證，並示範如何使用驗證函式庫建立輸入驗證的 schema。

## 接下來

- 接下來：[簡易認證](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->