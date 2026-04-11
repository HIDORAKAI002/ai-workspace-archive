# 進階伺服器使用

MCP SDK 中暴露了兩種不同類型的伺服器：一般伺服器和低階伺服器。通常，你會使用一般伺服器來新增功能。不過，在某些情況下，你可能會依賴低階伺服器，例如：

- 更佳的架構。雖然可以同時使用一般伺服器和低階伺服器來創建良好的架構，但可以認為低階伺服器讓這件事稍微容易一些。
- 功能可用性。有些高級功能只能用低階伺服器來使用。後面章節會展示加入取樣和引導時的情況。

## 一般伺服器 vs 低階伺服器

以下是使用一般伺服器建立 MCP Server 的方式

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

重點是你明確地新增每個你想要伺服器擁有的工具、資源或提示。這樣沒什麼問題。  

### 低階伺服器方法

然而，當你使用低階伺服器方法時，你需要用不同思維來看待這件事。不再註冊每個工具，而是為每種功能類型（工具、資源或提示）建立兩個處理器。舉例來說，工具只有兩個函式：

- 列出所有工具。一個函式負責列出工具的所有嘗試。
- 處理調用所有工具。在這裡，也只有一個函式負責處理調用工具。

聽起來像是更少的工作，是不是？所以代替註冊工具，我只要確保列出工具時包含此工具，且有請求呼叫的時候會呼叫工具即可。

讓我們看看程式碼長什麼樣：

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

我們現在有一個函式回傳功能清單。工具列表中的每一項目都包含欄位如 `name`、`description` 和 `inputSchema`，以符合回傳型別。這使我們能將工具和功能定義放在別處。我們現在可以在 tools 資料夾中建立所有工具，其他功能也是如此，讓你的專案結構可以突然變得像這樣：

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

很棒，我們的架構可以做得相當乾淨。

那麼呼叫工具呢？也是同樣概念嗎？一個處理函式可以呼叫任意工具？是的，沒錯，這是程式碼：

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
    // 待辦 呼叫工具，

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

如上方程式碼所示，我們需要解析要呼叫哪個工具，以及使用什麼參數，接著進行呼叫。

## 使用驗證改進方法

到目前為止，你已經看到如何用這兩個處理器替代所有用於新增工具、資源和提示的註冊程式。還需要做什麼？我們應該加上一些驗證，確保工具以正確的參數被呼叫。各語言運行時有其解決方案，例如 Python 使用 Pydantic，TypeScript 使用 Zod。概念是：

- 將建立功能（工具、資源或提示）的邏輯移到專屬資料夾。
- 新增方式驗證收到的請求，例如呼叫工具時的請求。

### 建立功能

要建立功能，我們需要為該功能建立檔案，並確保它擁有該功能所需的必填欄位。各工具、資源和提示的欄位會略有不同。

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

    # 待辦事項：添加 Pydantic，以便我們可以創建 AddInputModel 並驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

這裡示範我們如何做到：

- 使用 Pydantic 以 `AddInputModel` 建立架構，欄位為 `a` 和 `b`，位於 *schema.py*。
- 嘗試將收到的請求解析成型別為 `AddInputModel`，如參數不符則會當機：

   ```python
   # add.py
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

你可以選擇把此解析邏輯放在工具呼叫中，或是在處理器函式中。

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

       // @忽略ts
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

// 結構.ts
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

- 在處理所有工具呼叫的 handler 中，我們嘗試將收到的請求解析為工具定義的 schema：

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    如果解析成功，則繼續呼叫實際的工具：

    ```typescript
    const result = await tool.callback(input);
    ```

如你所見，這個方法創造了良好架構，所有東西都有其位置，*server.ts* 是非常簡短的檔案，僅負責將請求處理器串接好，每個功能分別放在 tools/，resources/ 或 /prompts 中。

很好，接著我們嘗試建立它。

## 練習：建立低階伺服器

本練習將做以下幾件事：

1. 建立低階伺服器，負責工具列舉和工具呼叫
1. 實作可擴充的架構
1. 加入驗證，確保工具呼叫時通過驗證

### -1- 建立架構

首先，我們需要處理一個能隨著新增更多功能而擴充的架構，如下所示：

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

現在我們已經建立出可以輕鬆新增工具的架構，位於 tools 資料夾。你也可以照這個方式新增子目錄給 resources 和 prompts。

### -2- 建立工具

接著看看建立工具的樣子。首先，需要在 *tool* 子目錄中建立，如下：

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # 待辦事項：添加 Pydantic，以便我們可以創建 AddInputModel 並驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

這裡展示如何定義名稱、說明和使用 Pydantic 的輸入架構，還有一個處理器會在呼叫此工具時被呼叫。最後，我們將 `tool_add` 曝露出來，它是包含這些屬性的字典。

還有 *schema.py* 用來定義工具使用的輸入架構：

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

我們也需要填寫 *__init__.py*，確保 tools 目錄被視為模組。此外，我們要將其中的模組暴露出去，如下：

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

隨著加入更多工具，我們可以持續新增至此檔案。

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

這裡我們建立一個字典包含以下屬性：

- name，工具名稱
- rawSchema，Zod schema，用來驗證呼叫工具的請求
- inputSchema，此 schema 將由 handler 使用
- callback，用於呼叫工具

還有 `Tool` 用來將此字典轉成 MCP 伺服器 handler 可接受的型別，形式如下：

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

還有 *schema.ts* 用來儲存每個工具的輸入架構，目前只有一個 schema，未來新增工具時可加入更多項目：

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

很好，接著處理列出工具的部分。

### -3- 處理列出工具

現在，我們需要建立一個請求處理器來列出工具。以下是要加到伺服器檔案的程式：

**Python**

```python
# 為了簡潔省略的程式碼
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

這裡，我們加上裝飾器 `@server.list_tools` 和實作的函式 `handle_list_tools`。在此函式中，我們必須產生工具列表。請注意每個工具需具有名稱、說明和 inputSchema。   

**TypeScript**

要建立列出工具的請求處理器，我們需要於伺服器呼叫 `setRequestHandler`，並帶入符合需求的 schema，這裡是 `ListToolsRequestSchema`。

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
  // 返回已註冊工具的列表
  return {
    tools: tools
  };
});
```

太好了，如此我們已成功處理列出工具的部分，接著看看如何呼叫工具。

### -4- 處理呼叫工具

呼叫工具時，我們要建立另一個請求處理器，專注處理指定要呼叫哪個功能以及參數的請求。

**Python**

讓我們使用裝飾器 `@server.call_tool` 並實作函式如 `handle_call_tool`。在該函式中，我們解析出工具名稱及其參數，並確保參數對應的工具是有效的。你可以選擇在此函式驗證參數，或直接在工具內驗證。

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

執行流程如下：

- 工具名稱已由輸入參數 `name` 提供，且參數在 `arguments` 字典中。
- 透過 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` 呼叫工具。參數驗證由指向函式的 `handler` 屬性負責，若驗證失敗會拋出例外。

以上，我們已完整理解如何用低階伺服器來列出和呼叫工具。

請參考此處 [完整範例](./code/README.md)

## 作業

擴充你目前的程式碼，加入多個工具、資源和提示，並反思你只需要在 tools 目錄新增檔案，而不必在其它地方新增的便利性。

<em>本章節不給予解答</em>

## 小結

本章我們探討了低階伺服器的運作方式，以及如何藉此建立可持續擴充的良好架構。我們也談到了驗證方法，並示範如何借助驗證函式庫建立輸入驗證用的 schema。

## 接下來的內容

- 下一章： [簡易認證](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的原文版本應被視為權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->