# 高階伺服器使用

MCP SDK 中暴露了兩種不同類型的伺服器，分別是一般伺服器和低階伺服器。通常，你會使用一般伺服器來新增功能。但在某些情況下，你可能會依賴低階伺服器，例如：

- 更好的架構。使用一般伺服器和低階伺服器都能創造乾淨的架構，但可以說使用低階伺服器會稍微簡單一些。
- 功能可用性。有些進階功能只能用低階伺服器才能使用。你會在後面的章節看到我們如何加入取樣和誘導。

## 一般伺服器 vs 低階伺服器

以下是在一般伺服器上創建 MCP Server 的樣子：

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

重點是你明確地新增你想讓伺服器擁有的每個工具、資源或提示。這樣做沒什麼問題。

### 低階伺服器方法

然而，當你使用低階伺服器方法時，你需要以不同的方式思考。你不是註冊每個工具，而是為每種功能類型（工具、資源或提示）建立兩個處理程序。例如工具只有兩個函數：

- 列出所有工具。一個函數負責所有嘗試列出工具的操作。
- 處理呼叫所有工具。這裡也只有一個函數處理對工具的呼叫。

聽起來好像工作量比較少，對吧？所以不用註冊一個工具，我只需要確保它在列出工具時會被列出，且當有工具呼叫請求時能呼叫它。

讓我們看看程式碼現在長什麼樣：

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

這裡我們有一個函數回傳功能列表。工具清單中的每個項目都有像是 `name`, `description` 和 `inputSchema` 等欄位以符合回傳類型。這讓我們可以把工具和功能定義放到其他地方。我們現在可以在 tools 資料夾裡創建所有工具，其他功能也是一樣，這樣你的專案可以突然被組織成如下所示：

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

這太好了，我們的架構可以做得很乾淨。

那呼叫工具呢？是不是也是一個處理程序負責呼叫任何工具？是的，完全正確，這是相應的程式碼：

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
    // 待辦事項 呼叫工具，

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

如上面程式碼所示，我們需要解析要呼叫的工具以及帶入的參數，然後才進行呼叫。

## 用驗證改善方法

到目前為止，你已經看到如何用每種功能兩個處理程序取代註冊所有工具、資源和提示。那我們還需要做什麼？我們應該加入某種驗證機制，確保工具呼叫時帶入正確的參數。每個執行環境都有自己的解決方案，例如 Python 使用 Pydantic，而 TypeScript 使用 Zod。理念如下：

- 將建立功能（工具、資源或提示）的邏輯移到專屬的資料夾裡。
- 加入驗證方式，驗證請求是否符合呼叫工具的需求。

### 創建一個功能

要創建功能，我們需要建立一個檔案，並確保它擁有該功能所需的強制欄位。工具、資源和提示中需要的欄位略有不同。

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

    # 待辦事項: 添加 Pydantic，這樣我們可以創建 AddInputModel 並驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

這裡你可以看到我們如何做：

- 使用 Pydantic 的 `AddInputModel` 在 *schema.py* 建立 schema，裡面有欄位 `a` 和 `b`。
- 嘗試將傳入請求解析為 `AddInputModel`，如果參數不符合會直接崩潰：

   ```python
   # add.py
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

你可以選擇把解析邏輯放在工具呼叫本身或處理程序裡。

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

- 在處理所有工具呼叫的 handler 裡，我們嘗試將傳入請求解析為該工具定義的 schema：

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    如果解析成功，我們就呼叫真正的工具：

    ```typescript
    const result = await tool.callback(input);
    ```

如你所見，這種方法創造了一個良好的架構，每個東西都有自己的位置，*server.ts* 只是一個非常小的檔案，僅連接請求處理程序，而且每個功能都有各自的資料夾，例如 tools/、resources/ 或 /prompts。

很好，接下來讓我們嘗試建構它。

## 練習：創建一個低階伺服器

在此練習中，我們將做以下幾件事：

1. 創建一個低階伺服器，處理工具的列舉和呼叫。
1. 實作一個你可以擴充的架構。
1. 加入驗證，確保你的工具呼叫被完整驗證。

### -1- 建立架構

我們先建立一個架構，幫助隨著新增更多功能時能容易擴展，架構如下所示：

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

現在我們已建立一個架構，確保可以輕鬆地在 tools 資料夾加入新工具。你也可以依此實作新增資源和提示的子目錄。

### -2- 創建一個工具

接著看看創建工具長什麼樣。首先，它需要放在其 *tool* 子目錄，如下：

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # 待辦事項: 添加 Pydantic，以便我們可以創建 AddInputModel 並驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

這裡我們看到如何定義名稱、描述和使用 Pydantic 的輸入 schema，還有一個會在工具被呼叫時執行的處理程序。最後我們對外暴露 `tool_add`，是一個包含這些屬性的字典。

還有 *schema.py*，定義了該工具的輸入 schema：

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

同時我們需要填寫 *__init__.py*，確保 tools 資料夾被視為模組。此外，我們還需要對外暴露裡面的模組，如下所示：

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

隨著加入更多工具，可以繼續擴充這個檔案。

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

這裡我們建立一個包含以下屬性的字典：

- name：工具名稱。
- rawSchema：Zod schema，用來驗證呼叫此工具的傳入請求。
- inputSchema：此 schema 由處理程序使用。
- callback：用來呼叫此工具的函數。

還有 `Tool`，用來將此字典轉換成 MCP 伺服器處理程序可接受的類型，長得像這樣：

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

還有 *schema.ts*，我們將每個工具的輸入 schema 存在這裡，目前只有一個 schema，後續新增工具時可以持續擴充：

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

很好，接著我們來處理工具列舉。

### -3- 處理工具列舉

接下來，要處理工具列舉，我們要設定一個請求處理程序。以下是在 server 檔案需要加入的程式碼：

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

這裡我們加上裝飾器 `@server.list_tools` 和實作函數 `handle_list_tools`。在此函數中，我們要產生工具清單。注意每個工具都需要包含名稱、描述和 inputSchema。

**TypeScript**

要設定列舉工具的請求處理程序，我們需要在伺服器呼叫 `setRequestHandler`，並帶入適合操作的 schema，這裡為 `ListToolsRequestSchema`。

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
  // 返回已註冊工具的列表
  return {
    tools: tools
  };
});
```

很好，現在工具列舉功能搞定，接著看看我們如何呼叫工具。

### -4- 處理呼叫工具

要呼叫工具，必須設定另一個請求處理程序，專門處理指明要呼叫哪個功能與使用什麼參數的請求。

**Python**

我們使用裝飾器 `@server.call_tool` 並實作函數 `handle_call_tool`。在此函數內，我們要解析工具名稱、參數，並確保所帶參數對該工具是有效的。我們可以選擇在這裡或實際工具中完成參數驗證。

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
        # 調用該工具
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

下列是流程解說：

- 工具名稱已經存在於輸入參數 `name` 中，參數則是在 `arguments` 字典裡。

- 呼叫工具為 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`。參數驗證在 `handler` 屬性指向的函數中完成，如果失敗將拋出異常。

如此一來，我們已完整理解使用低階伺服器列舉與呼叫工具。

完整範例請參考 [full example](./code/README.md)

## 作業

在你已有的程式碼基礎上，新增許多工具、資源和提示，並思考你是否發現只需要在 tools 目錄新增檔案，幾乎不需動到其他地方。

<em>未提供解答</em>

## 總結

本章介紹了低階伺服器方法的運作原理，以及如何幫助我們創造可持續擴充的良好架構。我們也討論了驗證，並示範如何使用驗證函式庫創建輸入驗證的 schema。

## 接下來是什麼

- 下一章節：[簡單驗證](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用此翻譯而引起的任何誤解或誤譯負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->