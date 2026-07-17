# 高度なサーバーの使い方

MCP SDKには通常のサーバーと低レベルサーバーの2種類のサーバーが公開されています。通常は、機能を追加するために通常のサーバーを使用します。ただし、以下のような場合には低レベルサーバーに依存したいこともあります。

- より良いアーキテクチャ。通常のサーバーと低レベルサーバーの両方でクリーンなアーキテクチャを作成することは可能ですが、低レベルサーバーのほうが若干簡単であると主張することができます。
- 機能の可用性。より高度な機能は低レベルサーバーでのみ利用可能なものがあります。これについては、サンプリング（`2026-07-28` リリース候補版で非推奨）やエリシテーションを追加する後の章で解説します。

## 通常のサーバーと低レベルサーバー

通常のサーバーでのMCPサーバーの作成は次のようになります。

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

ポイントは、サーバーに持たせたいツール、リソース、プロンプトをそれぞれ明示的に追加していることです。これは問題ありません。  

### 低レベルサーバー方式

しかし、低レベルサーバーの方式を使う場合は考え方が少し異なります。各機能タイプ（ツール、リソース、プロンプト）に対して2つのハンドラーを作成します。例えばツールの場合、関数はこの2つだけです：

- すべてのツールを一覧表示する関数。一つの関数がすべてのツールの一覧取得の要求に対応します。
- ツールへの呼び出しを処理する関数。こちらも一つの関数がすべてのツール呼び出しに対応します。

これなら作業が少なく済みそうですよね？ツールを登録する代わりに、ツールの一覧表示でリストに入っていることを確認し、呼び出し要求があったら呼び出せばいいわけです。

コードは以下のようになります：

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
  // 登録されたツールのリストを返します
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

ここでは、機能のリストを返す関数があります。toolsリストの各エントリは、返却型に従って`name`、`description`、`inputSchema`といったフィールドを持っています。これによりツールや機能定義を別の場所にまとめることが可能になりました。すべてのツールをtoolsフォルダにまとめ、機能も同様に整理できるため、プロジェクトは以下のように整理できます。

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

これでかなりクリーンなアーキテクチャが実現できます。

ツールの呼び出しはどうするか？同じ考え方で、どのツールでも呼び出すためのハンドラーが1つあるのでしょうか？はい、その通りです。コードは以下のようになります：

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

上記のコードからわかるように、呼び出すツールと引数を解析し、その後呼び出しを実行します。

## バリデーションで方式を改善する

今まで、ツール、リソース、プロンプトの登録を各機能タイプで2つのハンドラーに置き換える方法を見てきました。他に必要なものは？引数が正しく渡されているか確認するためのバリデーションを追加すべきです。各ランタイムはそれぞれの方法を持っています。例えばPythonはPydanticを使い、TypeScriptはZodを使用します。やるべきことは以下の通りです：

- 機能（ツール、リソース、プロンプト）を作成するロジックを専用フォルダに移動する。
- 例えばツール呼び出し要求が来た際にバリデーションする仕組みを追加する。

### 機能を作成する

機能を作成するには、その機能に対応するファイルを作成し、必要な必須フィールドを定義する必要があります。ツール、リソース、プロンプトによってフィールドは少し異なります。

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
        # Pydanticモデルを使って入力を検証する
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydanticを追加して、AddInputModelを作成し、引数を検証できるようにすること

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ここでやっていることは以下の通りです：

- Pydanticの`AddInputModel`というスキーマを<em>schema.py</em>に作成し、`a`と`b`のフィールドを定義。
- incoming requestを`AddInputModel`としてパースしようとし、パラメータにミスマッチがあると例外が発生する。

   ```python
   # add.py
    try:
        # Pydanticモデルを使用して入力を検証する
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

パース処理のロジックをツール呼び出し自体に置くか、ハンドラー関数内に置くかは選べます。

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

- すべてのツール呼び出しを処理するハンドラーで、incoming requestをツールの定義済みスキーマにパースしようとします。

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    パースに成功したらツールを呼び出します：

    ```typescript
    const result = await tool.callback(input);
    ```

ご覧のとおり、この方式は優れたアーキテクチャを生み出します。<em>server.ts</em>はリクエストハンドラーをまとめるだけの非常に小さなファイルで、各機能はtools/、resources/、prompts/などのそれぞれのフォルダに配置されています。

さあ、次にこれを実際に構築してみましょう。

## 演習：低レベルサーバーの作成

この演習では以下を行います：

1. ツールの一覧取得と呼び出しを処理する低レベルサーバーを作成する。
1. 拡張可能なアーキテクチャを実装する。
1. ツール呼び出しに対してバリデーションを追加する。

### -1- アーキテクチャの作成

まず、機能を追加しても拡張しやすいアーキテクチャを考えます。以下はその例です：

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

これでtoolsフォルダに新しいツールを簡単に追加できるアーキテクチャを整えました。resourcesやpromptsのサブディレクトリも同様に作成して構いません。

### -2- ツールの作成

次にツール作成の例を見てみましょう。まず<em>tool</em>サブディレクトリにツールを作成します：

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

ここではPydanticを使い、名前、説明、入力スキーマを定義し、呼び出された際に使うハンドラーを用意しています。最後に`tool_add`という辞書でこれらをまとめて公開しています。

また入力スキーマを定義する<em>schema.py</em>もあります：

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

<em>__init__.py</em>もtoolsディレクトリをモジュールとして扱うために用意します。さらにモジュールを公開するために以下のようにします：

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

ツールが増えたらここに追加していきます。

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

ここでは以下のプロパティからなる辞書を作成しています：

- name：ツール名です。
- rawSchema：Zodスキーマでツール呼び出しのリクエストを検証するために使います。
- inputSchema：ハンドラーが使用するスキーマ。
- callback：ツールの呼び出しに使われる関数。

またこの辞書をmcpサーバーハンドラーが受け取れる型に変換する`Tool`という型があります。見た目は次の通りです：

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

入力スキーマを格納する<em>schema.ts</em>もあります。現在は1つのスキーマですが、ツールが増えればエントリを追加できます：

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

では次にツール一覧取得の処理を実装しましょう。

### -3- ツール一覧取得の処理

ツール一覧取得を処理するリクエストハンドラーを設定します。サーバーファイルに次を追加します：

**Python**

```python
# 簡潔にするためにコードを省略しました
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

ここではデコレーター`@server.list_tools`と実装関数`handle_list_tools`を追加しています。後者でツールのリストを返します。各ツールは名前、説明、inputSchemaを持つ必要があります。   

**TypeScript**

ツール一覧取得用のリクエストハンドラーは、`setRequestHandler`をサーバーに呼び出し、ここでは`ListToolsRequestSchema`を指定します。

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
// 簡潔にするためコードを省略
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 登録されたツールのリストを返す
  return {
    tools: tools
  };
});
```

これでツール一覧取得部分は完了です。次にツール呼び出しの実装を見ていきましょう。

### -4- ツール呼び出しの処理

ツール呼び出しを処理するリクエストハンドラーも設定します。呼び出す機能と引数の指定を扱います。

**Python**

デコレーター`@server.call_tool`を使い、`handle_call_tool`のような関数を実装します。その中でツール名、引数を解析し、それらがそのツールに対して有効かチェックします。引数のバリデーションはこの関数内か、実際のツール側で行えます。

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
        # ツールを呼び出す
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

処理内容は次の通りです：

- ツール名は`name`という入力パラメータとして既にあります。引数は`arguments`辞書の形で渡っています。

- ツールは`result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`で呼ばれます。引数のバリデーションは`handler`に指定された関数で行われ、エラーがあれば例外が発生します。

これで、低レベルサーバーを使ったツールの一覧取得と呼び出しについて理解できました。

[完全な例](./code/README.md)はこちらをご覧ください。

## 課題

いくつかのツール、リソース、プロンプトを追加して、toolsディレクトリにファイルを追加するだけで他に何も追加場所がないことを実感してください。

<em>解答はありません</em>

## まとめ

この章では低レベルサーバーの方式がどのように機能し、拡張可能なアーキテクチャを作成するのに役立つかを見ました。またバリデーションについて解説し、入力検証のためのスキーマを作成する方法を示しました。

## 次のステップ

- 次へ：[シンプル認証](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->