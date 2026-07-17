# 進階伺服器使用

MCP SDK 中公開了兩種類型的伺服器，分別是常規伺服器和低階伺服器。通常，你會使用常規伺服器來新增功能。但在某些情況下，你會想依賴低階伺服器，例如：

- 較佳的架構。使用常規伺服器和低階伺服器皆可建立乾淨的架構，但有人認為使用低階伺服器會稍微簡單些。
- 功能可用性。某些進階功能只能用低階伺服器才能實現。你會在後面章節看到，當我們新增取樣（`2026-07-28` 發行候選版本中已棄用）和引導功能時。

## 常規伺服器與低階伺服器

以下是使用常規伺服器建立 MCP Server 的範例

**Python**

```python
mcp = FastMCP("Demo")

# 新增加法工具
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

重點是，你需要明確地新增每個你希望伺服器擁有的工具、資源或提示。這樣做沒問題。  

### 低階伺服器方法

然而，當你使用低階伺服器方法時，需要以不同方式思考。你不是註冊每個工具，而是為每種類型的功能（工具、資源或提示）建立兩個處理器。以工具為例，它們只需要兩個函式，如下：

- 列出所有工具。一個函式負責列出工具的所有請求。
- 處理呼叫所有工具的請求。在這裡也只有一個函式處理對工具的呼叫。

聽起來工作量似乎較少對吧？所以我不需要註冊工具，只要確保當列出所有工具時，有把工具列出，且在有呼叫工具的請求時，該工具會被呼叫就行了。

讓我們來看看這樣寫出來的程式碼長什麼樣子：

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
  // 回傳已註冊工具的清單
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

這裡，我們有一個回傳功能清單的函式。tools 列表中的每個條目現在都有 `name`、`description` 和 `inputSchema` 等欄位以符合回傳型態。這使我們可以將工具和功能定義放在其他地方。我們現在可在 tools 資料夾中建立所有工具，功能也同理，因此專案架構會變成如下：

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

這很棒，我們的架構看起來相當乾淨。

那呼叫工具呢？也是一個處理器呼叫任一工具？沒錯，就是這樣，下面是程式碼：

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
    
    // 引數：request.params.arguments
    // 待辦事項 呼叫工具，

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

從以上程式碼可知，我們需要解析要呼叫的工具名稱和參數，接著再呼叫該工具。

## 用驗證改善此方法

到目前為止，你已經看過如何用每種類型功能兩個處理器取代你註冊工具、資源和提示的作法。那接下來還需要做什麼呢？我們應該加上一些驗證方式，確保呼叫工具時帶入正確參數。各執行環境有各自的方案，比如 Python 使用 Pydantic，TypeScript 則用 Zod。其概念是如下：

- 將功能（工具、資源或提示）建立的邏輯移至專屬資料夾。
- 增加驗證方式，去驗證來自例如呼叫工具的請求。

### 建立功能

建立功能需要為該功能建立檔案，並確保其包含該功能必須的欄位。這些欄位在工具、資源和提示之間略有不同。

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

    # 待辦事項：新增 Pydantic，以便我們可以建立 AddInputModel 並驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

這裡可看到我們如何做到：

- 用 Pydantic 在 *schema.py* 建立帶有欄位 `a`、`b` 的 schema `AddInputModel`。
- 嘗試把傳入請求解析為 `AddInputModel` 類型，如果參數不匹配會出錯：

   ```python
   # add.py
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

你可選擇將此解析邏輯放在工具呼叫本身或處理器函式中。

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

- 在處理所有工具呼叫的處理器中，嘗試將傳入請求解析成工具定義好的 schema：

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    若成功，接著呼叫實際工具：

    ```typescript
    const result = await tool.callback(input);
    ```

如你所見，這種方式創建了良好的架構，所有東西各有其位，*server.ts* 是非常小的檔案，僅連接請求處理器，每個功能則在各自資料夾，如 tools/、resources/ 或 prompts/。

很好，讓我們接著嘗試建立這個架構。

## 練習：建立低階伺服器

在這個練習中，我們將執行以下事項：

1. 建立低階伺服器，處理列出工具與呼叫工具。
1. 實現一個可擴充的架構。
1. 添加驗證機制，確保工具呼叫經過嚴格驗證。

### -1- 建立架構

首先要建立一個架構，使我們能隨著功能增多輕鬆擴充，如下所示：

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

現在我們建立一個架構，能輕鬆在 tools 資料夾中新增新工具。你也可以依此新增子目錄來放資源和提示。

### -2- 建立工具

接下來看看如何建立工具。首先，它必須建在 *tool* 子目錄下，如下：

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # 使用 Pydantic 模型驗證輸入
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO：新增 Pydantic，以便我們能建立 AddInputModel 並驗證參數

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

這裡看到我們如何用 Pydantic 定義名稱、描述和輸入結構，還有一個處理函式會在這工具被呼叫時執行。最後，我們暴露 `tool_add` 字典，裡面持有這些屬性。

還有 *schema.py*，用來定義這個工具的輸入結構：

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

我們也需要填寫 *__init__.py*，確保 tools 目錄被視為模組。此外，需要暴露模組內的檔案，如下：

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

隨著繼續新增工具，就可以在此文件添加更多。

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
- rawSchema，Zod schema，會用來驗證呼叫此工具的傳入請求。
- inputSchema，供處理器使用的結構。
- callback，用於呼叫工具的函式。

還有 `Tool`，用於將此字典轉為 mcp 伺服器處理器可接受的型別，如下：

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

以及 *schema.ts*，用來儲存每個工具的輸入 schema，目前只有一組，未來新增工具可以加更多：

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

很好，接著我們來處理列出工具的功能。

### -3- 處理列出工具

要列出工具列表，我們需在伺服器設定請求處理器。以下是在伺服器檔案中要新增的內容：

**Python**

```python
# 代碼省略以簡潔呈現
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

這裡我們加上裝飾器 `@server.list_tools` 和實作函式 `handle_list_tools`。在此函式中，我們需要產生工具清單。注意每個工具要有 name、description 及 inputSchema。   

**TypeScript**

設定列出工具請求處理器，我們需使用伺服器的 `setRequestHandler`，並給它契合待完成需求的 schema，此案例為 `ListToolsRequestSchema`。

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
// 代碼為簡潔起見已省略
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 返回已註冊工具的列表
  return {
    tools: tools
  };
});
```

太好了，這樣我們解決了列出工具的部分，接著看看怎麼呼叫工具。

### -4- 處理呼叫工具

要呼叫工具，我們需要設一個請求處理器，專注處理請求指定呼叫哪個功能與帶入哪些參數。

**Python**

我們用裝飾器 `@server.call_tool` 實作 `handle_call_tool` 函式。在它裡面，我們解析工具名稱與參數，並確保參數對該工具是有效的。驗證參數可以在此函式或實際工具中完成。

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

運作過程如下：

- 我們的工具名稱已經在輸入參數 `name` 中，還有 `arguments` 字典形式的工具參數。

- 工具藉由 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` 呼叫。參數驗證發生在指向函式的 `handler` 屬性中，失敗時會拋出例外。

這樣，我們對利用低階伺服器的列出和呼叫工具機制有完整了解了。

參見此處的 [完整範例](./code/README.md)

## 作業

擴充你現有程式碼，加上多個工具、資源和提示，並注意你只需要在 tools 目錄新增檔案即可，其他地方不必修改。

<em>未提供解答</em>

## 小結

本章我們探討了低階伺服器的作法以及它如何幫助打造一個可延續的乾淨架構。我們也討論了驗證，並示範如何使用驗證庫建立輸入驗證的結構。

## 接下來的章節

- 下一章：[簡單驗證](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->