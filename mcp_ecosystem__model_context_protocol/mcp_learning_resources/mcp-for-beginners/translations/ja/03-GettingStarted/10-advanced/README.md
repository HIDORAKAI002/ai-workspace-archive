# 高度なサーバーの使用

MCP SDKには通常のサーバーと低レベルサーバーという2種類のサーバーが存在します。通常は機能を追加するために通常のサーバーを使用しますが、次のような場合には低レベルサーバーを利用したいことがあります。

- より良いアーキテクチャ。通常のサーバーと低レベルサーバーの両方できれいなアーキテクチャを作ることは可能ですが、低レベルサーバーの方がわずかに簡単だと言えます。
- 機能の利用可能性。一部の高度な機能は低レベルサーバーでのみ使用可能です。サンプリングやエリシテーションを追加する次の章でこれが見られます。

## 通常サーバーと低レベルサーバーの違い

通常サーバーでMCPサーバーを作成する例は次のようになります。

**Python**

```python
mcp = FastMCP("Demo")

# 追加ツールを追加する
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

// 追加ツールを追加する
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

重要なのは、サーバーに持たせたいツールやリソース、プロンプトをそれぞれ明示的に追加していることです。これに問題はありません。

### 低レベルサーバーのアプローチ

しかし低レベルサーバーのアプローチを使う場合は考え方が異なります。各ツールを登録する代わりに、機能タイプ（ツール、リソース、プロンプト）ごとに2つのハンドラーを作成します。例としてツールの場合、次の2つの関数だけになります。

- すべてのツールをリストアップする。一つの関数がツールのリスト取得を一括して処理します。
- すべてのツール呼び出しを処理する。ここでも一つの関数がツール呼び出しを処理します。

これなら作業が減るように思えますよね？ツールを登録する代わりに、すべてのツールをリストする時にリストに入っていることと、呼び出しリクエストが来た時にはそのツールが呼ばれることだけを保証すればよいのです。

コードがどのようになるか見てみましょう。

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
  // 登録されているツールのリストを返します
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

ここでは機能のリストを返す関数があります。ツールリストの各エントリは、返り値の型に沿って `name`、`description`、`inputSchema`などのフィールドを持っています。これによりツールや機能定義を別の場所に置くことが可能になります。ツールをtoolsフォルダにまとめて配置でき、他の機能も同様に整理できるのでプロジェクトは次のような構成になります。

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

素晴らしいですね、アーキテクチャをきれいに整えることができます。

ツール呼び出しはどうでしょうか？同じ考え方で、一つのハンドラーでどのツール呼び出しも処理しますか？はい、その通りで、呼び出し用のコードはこのようになります。

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools はツール名をキーとする辞書です
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
    // TODO ツールを呼び出す,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

上記のコードを見ると、呼び出すツールと引数を抽出し、その後そのツールを呼び出す処理が必要ということがわかります。

## バリデーションによるアプローチの改善

これまではツール、リソース、プロンプトの登録を機能タイプごとに2つのハンドラーで置き換える方法を見ました。次に何が必要でしょうか？ツールが正しい引数で呼ばれることを保証するための何らかのバリデーションを追加するべきです。ランタイムごとに異なるソリューションがあり、たとえばPythonではPydantic、TypeScriptではZodを使用します。考え方としては以下の通りです。

- 機能（ツール、リソース、プロンプト）作成のロジックを専用フォルダに移動する。
- 呼び出しリクエストを受けた時にバリデーションを行う仕組みを追加する。

### 機能の作成

機能を作成するには、その機能用のファイルを作成し、必須フィールドを持つようにします。ツール、リソース、プロンプトで必須フィールドは少し異なります。

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
        # Pydanticモデルを使用して入力を検証する
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydanticを追加し、AddInputModelを作成して引数を検証できるようにする

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ここでは次のことを行っています。

- <em>schema.py</em>にPydanticを用いて `AddInputModel` というスキーマを作成し、フィールド `a` と `b` を定義。
- 受け取ったリクエストを `AddInputModel` 型にパースしようと試み、パラメーターが違うとクラッシュします。

   ```python
   # add.py
    try:
        # Pydanticモデルを使用して入力を検証する
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

このパースロジックをツール呼び出し内に書くか、ハンドラー関数内に書くかは選択可能です。

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

全ツール呼び出し対応ハンドラーでは、受け取ったリクエストをツールの定義したスキーマにパースしようとします。

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

パースが成功すれば実際のツールを呼び出します。

    ```typescript
    const result = await tool.callback(input);
    ```

この方法だとすべてがきちんと配置されるため、*server.ts* はリクエストハンドラーの組み立てだけの非常に小さなファイルになり、各機能はそれぞれのフォルダ（tools/, resources/, prompts/）に分かれていて非常に良いアーキテクチャになります。

さあ、これを次に作ってみましょう。

## 演習：低レベルサーバーの作成

この演習で行うことは次の通りです。

1. ツールのリスト取得と呼び出しを扱う低レベルサーバーを作成する。
1. そこから構築可能なアーキテクチャを実装する。
1. ツール呼び出しが適切にバリデーションされるように検証を追加する。

### -1- アーキテクチャの作成

まず最初に扱うのは、機能が増えた時にスケールしやすいアーキテクチャの構築です。次のようになります。

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

こうしてtoolsフォルダに新しいツールを簡単に追加できるアーキテクチャができました。resourcesやpromptsのためにサブディレクトリを追加しても構いません。

### -2- ツールの作成

次にツールの作成を見てみましょう。まず *tool* サブディレクトリに作成します。

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydanticモデルを使用して入力を検証する
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydanticを追加して、AddInputModelを作成し、引数を検証できるようにする

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ここではPydanticを使って name、description、input schema を定義し、このツールを呼び出された際のハンドラーも用意します。最後に `tool_add` を公開しています。これはこれらのプロパティをまとめた辞書です。

またツールで使う入力スキーマは *schema.py* に定義しています。

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

さらに<em>__init__.py</em>を用意し、toolsディレクトリをモジュール扱いにし、次のように中のモジュールを公開します。

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

ツールが増えればこのファイルにどんどん追加していけばよいです。

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

ここでは次のプロパティを持つ辞書を作成しています。

- name: ツール名。
- rawSchema: Zodスキーマで、呼び出しリクエストを検証するのに使う。
- inputSchema: ハンドラーで使うスキーマ。
- callback: ツールを実行するための関数。

これをmcpサーバーハンドラーが受け付ける型に変換する `Tool` があります。それは次のようなものです。

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

さらに *schema.ts* に個々のツールの入力スキーマを格納します。現在はひとつのスキーマだけですが、ツールが増えればエントリーも増やします。

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

次にツールのリスト取得を処理しましょう。

### -3- ツールのリスト取得を処理

ツール一覧を扱うリクエストハンドラーを用意します。サーバーファイルに次を追加します。

**Python**

```python
# 簡潔にするためコードを省略しました
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

ここで `@server.list_tools` デコレーターと、実装関数 `handle_list_tools` を追加します。`handle_list_tools` はツールのリストを返さなければなりません。各ツールは必ず name、description、inputSchema を持つ必要があります。

**TypeScript**

ツールリスト取得のリクエストハンドラーはサーバーの `setRequestHandler` に対して、ここでは `ListToolsRequestSchema` 型に合わせたスキーマでセットします。

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
// 簡潔のためコードを省略
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 登録されたツールのリストを返す
  return {
    tools: tools
  };
});
```

これでツール一覧取得は解決しました。次にツール呼び出しを見てみましょう。

### -4- ツール呼び出しを処理

ツールを呼び出すために、どの機能をどんな引数で呼び出すかを扱う別のリクエストハンドラーをセットアップします。

**Python**

`@server.call_tool` デコレーターを使い、関数として `handle_call_tool` を実装します。その中でツール名、引数を解析し、引数が正しいかどうかを確認します。バリデーションはここで行うか、ツール側で行うこともできます。

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # toolsはツール名をキーとする辞書です
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # ツールを起動する
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

処理内容は次の通りです。

- ツール名は入力パラメータ `name` にすでにあり、引数は `arguments` 辞書形式で渡されます。
- ツールは `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` で呼び出されます。引数のバリデーションは `handler` プロパティの関数内で行い、失敗すると例外が発生します。

これで低レベルサーバーを使ってのツール一覧取得と呼び出しの仕組みが完全に理解できました。

[完全な例](./code/README.md)はこちら

## 課題

与えられたコードに複数のツール、リソース、プロンプトを追加し、ツールディレクトリにファイルを追加するだけでよいことを体感してください。

<em>解答例はありません</em>

## まとめ

本章では低レベルサーバーアプローチがどのように機能し、構築を続けられるきれいなアーキテクチャが作れるかを見ました。またバリデーションについても議論し、入力検証用のスキーマ作成にバリデーションライブラリを使う方法を示しました。

## 次に学ぶこと

- 次へ: [簡単な認証](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**:  
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確さを期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の母国語版が正式な情報源とみなされます。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用による誤解や誤訳について、当方は一切の責任を負いません。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->