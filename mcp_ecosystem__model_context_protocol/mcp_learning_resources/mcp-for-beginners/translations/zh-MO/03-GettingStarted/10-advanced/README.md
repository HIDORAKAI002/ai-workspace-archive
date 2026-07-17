# 進階服務器使用

MCP SDK 中公開了兩種類型的服務器，分別是一般服務器和低階服務器。通常，你會使用一般服務器來新增功能。但在某些情況下，你會想依賴低階服務器，例如：

- 更佳的架構。可以用一般服務器和低階服務器打造清晰的架構，但可以說用低階服務器稍微簡單一些。
- 功能可用性。有些進階功能只能用低階服務器。你會在後面章節看到，我們會新增採樣（在 `2026-07-28` 發行候選版本中已被棄用）和引導功能。

## 一般服務器 vs 低階服務器

下面是使用一般服務器建立 MCP 服務器的範例

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

重點在於你明確地新增每個工具、資源或提示給服務器。這沒有問題。  

### 低階服務器方法

不過使用低階服務器方法時，需要用不同角度思考。與其註冊每個工具，不如針對每種功能類型（工具、資源或提示）建立兩個處理函式。舉例來說，工具只有兩個函式，如下：

- 列出所有工具。一個函式負責所有列出工具的嘗試。
- 處理呼叫所有工具。這裡也是只有一個函式處理工具呼叫。

聽起來似乎工作量較少對吧？所以跟註冊工具不同，我只要確保在列出所有工具時有列出工具，且當有來自外部的工具呼叫需求時工具會被呼叫。 

讓我們看看現在代碼長什麼樣：

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

這裡我們有一個函式會回傳一份功能列表。工具列表的每筆項目現在都有 `name`、`description` 和 `inputSchema` 等欄位，以符合回傳型別。這讓我們可以將工具和功能定義放在別處。我們現在可以把所有工具建立於 tools 資料夾，其他功能也是如此，專案就會被組織成如下結構：

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

這太棒了，我們的架構可以變得很乾淨。

那呼叫工具呢，是同樣的理念嗎，一個處理函式呼叫一個工具，不論是哪個工具？是的，正是如此，以下是呼叫工具的程式碼：

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

從上面的代碼可以看出，我們需要解析要呼叫的工具名稱以及參數，然後執行呼叫。

## 透過驗證改進方法

到目前為止，你已看到如何用每種功能類型的兩個處理函式取代所有新增工具、資源和提示的註冊。接著我們還需要做什麼呢？我們應該加上一些驗證，確保工具呼叫帶入正確的參數。每個執行環境都有自己的解決方案，例如 Python 使用 Pydantic，TypeScript 使用 Zod。理念是如此：

- 將建立功能（工具、資源或提示）的邏輯移到各自的專屬資料夾。
- 新增方式驗證傳入的請求，例如呼叫工具的請求。

### 建立功能

建立功能時，需要建立該功能的檔案，並確保其包含功能所需的必要欄位。不同工具、資源和提示欄位會稍有不同。

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

    # TODO：加入 Pydantic，令我哋可以建立 AddInputModel 同驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

這裡展示了以下內容：

- 在 *schema.py* 文件中用 Pydantic 建立 `AddInputModel` Schema，欄位有 `a` 和 `b`。
- 嘗試將傳入請求解析成 `AddInputModel` 類型，參數不符時會當機：

   ```python
   # add.py
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

你可以選擇將此解析邏輯放在工具呼叫本體裡或放在處理函式中。

**TypeScript**

```typescript
// 伺服器.ts
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

// 架構.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// 新增.ts
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

- 在處理所有工具呼叫的函式裡，試著將傳入請求解析成工具定義的 Schema：

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    如果成功，則呼叫實際工具：

    ```typescript
    const result = await tool.callback(input);
    ```

如你所見，這個方法會創造出良好的架構，因為所有東西都有其位置，*server.ts* 是非常小的檔案，只負責串接請求處理函式，而每個功能也放在各自資料夾，即 tools/、resources/ 或 /prompts。

太好了，接著試著建立這個吧。

## 練習：建立低階服務器

在此練習中，我們會做以下事情：

1. 建立低階服務器處理工具列表及工具呼叫。
1. 實作一個可以持續擴充的架構。
1. 新增驗證，確保工具呼叫經過正確驗證。

### -1- 建立架構

我們首先要建立一個能隨著功能增加而擴展的架構，模樣如下：

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

現在我們設計了能輕鬆於 tools 資料夾新增工具的架構。你也可以依此方式增加資源和提示的子目錄。

### -2- 建立工具

接著看看建立工具長什麼樣。首先要把它建立在 *tool* 子目錄裡，如下：

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

這裡展示我們如何定義名稱、描述及輸入 Schema（用 Pydantic 實作）及呼叫工具時會觸發的處理函式。最後，我們建立 `tool_add` 字典，包含上述所有屬性。

還有 *schema.py* 用來定義工具的輸入 Schema：

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

我們還需要在 *__init__.py* 裡面填入內容，以確保 tools 資料夾被視作模組。此外，我們需要將它裡面的模組匯出，如下：

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

每新增一個工具，我們都能持續增加此檔案內容。

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

這裡我們建立一個字典，包含以下屬性：

- name，工具名稱。
- rawSchema，Zod Schema，用來驗證傳入呼叫此工具的請求。
- inputSchema，處理函式用的 Schema。
- callback，呼叫工具所用的函式。

還有 `Tool`，用以將字典轉成 mcp 服務器處理函式能接受的型別，如下：

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

而 *schema.ts* 中，我們儲存各工具的輸入 Schema，現在只有一個 Schema，未來可新增更多：

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

太棒了，接著處理工具列表吧。

### -3- 處理工具列表

接著，要處理列出工具，我們需要為此設置請求處理函式。以下是要加入服務器檔案的內容：

**Python**

```python
# 為簡潔起見省略代碼
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

這裡我們添加了裝飾器 `@server.list_tools`  及實作函式 `handle_list_tools`。在後者中，我們產生工具列表。注意每個工具都需有名稱、描述和 inputSchema。   

**TypeScript**

要設置列出工具的請求處理函式，我們需要使用適合動作的 schema（這裡是 `ListToolsRequestSchema`），並在服務器上呼叫 `setRequestHandler`。

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
// 代碼省略以簡潔呈現
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 回傳已註冊工具的清單
  return {
    tools: tools
  };
});
```

太好了，我們已經解決工具列出部分，接著看看如何呼叫工具。

### -4- 處理呼叫工具

為了呼叫工具，我們要設置另一個請求處理函式，此次重點在於處理指定功能及帶入參數的請求。

**Python**

我們使用裝飾器 `@server.call_tool`，並用函式 `handle_call_tool` 實作。該函式會解析工具名稱及參數，確保參數對應該工具有效。我們可在此函式內或工具裏驗證參數。

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

以下說明：

- 我們的工具名稱是輸入參數 `name`，參數存在 `arguments` 字典。

- 工具透過 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` 呼叫。參數驗證發生在指向函式的 `handler` 屬性中，失敗時會拋出例外。

到此，我們完整了解了使用低階服務器的工具列出與呼叫。

在此參閱[完整範例](./code/README.md)

## 作業

擴充你手上的程式碼，新增多個工具、資源和提示，並體驗只需在 tools 目錄新增檔案，其他地方都不必變動。 

<em>未提供解答</em>

## 總結

本章展示了低階服務器方法的運作，及其如何幫助我們建構良好架構持續擴充。我們也討論了驗證，並示範如何搭配驗證函式庫建立輸入驗證 Schema。

## 接下來

- 下一章：[簡單驗證](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->