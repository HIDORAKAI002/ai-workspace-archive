# 고급 서버 사용법

MCP SDK에는 일반 서버와 저수준(low-level) 서버라는 두 가지 유형의 서버가 있습니다. 일반적으로는 기능을 추가하기 위해 일반 서버를 사용합니다. 그러나 다음과 같은 경우에는 저수준 서버에 의존하는 것이 좋습니다:

- 더 나은 아키텍처. 일반 서버와 저수준 서버를 함께 사용해 깔끔한 아키텍처를 만드는 것이 가능하지만, 저수준 서버가 약간 더 쉽다고 할 수 있습니다.
- 기능 제공. 일부 고급 기능은 저수준 서버에서만 사용할 수 있습니다. 샘플링(sampling) 및 이라이테이션(elicitation)을 추가할 때 이러한 내용을 후속 장에서 보게 될 것입니다.

## 일반 서버 vs 저수준 서버

일반 서버로 MCP 서버를 생성하는 방식은 다음과 같습니다.

**Python**

```python
mcp = FastMCP("Demo")

# 덧셈 도구를 추가하세요
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

// 추가 도구를 추가하세요
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

핵심은 서버에 원하는 각 도구, 리소스 또는 프롬프트를 명시적으로 추가한다는 점입니다. 문제가 되지 않습니다.

### 저수준 서버 접근법

하지만 저수준 서버 접근법을 사용할 경우 생각하는 방식이 달라집니다. 각 도구를 등록하는 대신 각 기능 유형(도구, 리소스, 프롬프트)에 대해 두 개의 핸들러만 만듭니다. 예를 들어 도구의 경우 두 가지 함수만 있습니다:

- 모든 도구 나열. 하나의 함수가 모든 도구 나열 시도를 처리합니다.
- 모든 도구 호출 처리. 또한 호출되는 도구를 처리하는 하나의 함수만 있습니다.

생각해 보면 더 적은 작업 같습니다, 그렇죠? 도구를 등록하기보다 도구를 나열할 때 목록에 포함되고 호출 요청이 들어오면 호출되도록만 하면 됩니다.

이제 코드가 어떻게 보이는지 살펴봅시다.

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
  // 등록된 도구 목록을 반환합니다
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

이제 기능 리스트를 반환하는 함수가 있습니다. 도구 리스트의 각 항목에는 `name`, `description` 및 `inputSchema` 와 같은 필드가 포함되어 반환 타입을 준수합니다. 이를 통해 도구와 기능 정의를 다른 곳에 둘 수 있습니다. 이제 모든 도구를 tools 폴더에 만들 수 있으며, 다른 기능도 해당되어 프로젝트가 다음과 같이 조직될 수 있습니다.

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

훌륭합니다. 아키텍처가 꽤 깔끔해질 수 있습니다.

도구 호출은 어떨까요, 같은 개념인가요? 모든 도구를 호출하는 하나의 핸들러인가요? 네, 정확히 그렇습니다. 호출하는 코드가 다음과 같습니다.

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools는 도구 이름을 키로 갖는 딕셔너리입니다
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
    // TODO 도구 호출,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

위 코드를 보면 호출할 도구와 인자를 파싱해야 하며, 그다음 도구를 호출합니다.

## 검증을 통한 접근법 향상

지금까지 도구, 리소스 및 프롬프트를 추가하기 위한 모든 등록이 기능 유형별 두 개의 핸들러로 대체되는 방법을 보았습니다. 그럼 무엇을 더 해야 할까요? 도구가 올바른 인자와 함께 호출되는지 검증하는 절차를 추가해야 합니다. 각 런타임은 이를 위한 자체 솔루션을 사용합니다. 예를 들어 Python은 Pydantic, TypeScript는 Zod를 씁니다. 아이디어는 다음과 같습니다.

- 기능(도구, 리소스 또는 프롬프트) 생성을 전담하는 폴더로 로직을 이동합니다.
- 예를 들어 도구 호출 요청에 대해 검증할 수 있는 방식을 추가합니다.

### 기능 만들기

기능을 만들려면 해당 기능용 파일을 만들고 필수 필드를 갖추었는지 확인해야 합니다. 필드는 도구, 리소스, 프롬프트마다 약간 다릅니다.

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
        # Pydantic 모델을 사용하여 입력 값 검증
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic 추가, AddInputModel을 만들고 인수들을 검증할 수 있도록 하기 위해

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

여기서 다음을 수행합니다.

- *schema.py* 파일에 필드 `a` 와 `b` 를 갖는 Pydantic `AddInputModel` 스키마를 만듭니다.
- 들어온 요청을 `AddInputModel` 타입으로 파싱 시도하며, 파라미터 불일치가 있으면 오류가 발생합니다.

   ```python
   # add.py
    try:
        # Pydantic 모델을 사용하여 입력값 검증
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

이 파싱 로직을 도구 호출 함수 내에 둘지 핸들러 함수에 둘지는 선택 가능합니다.

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

- 모든 도구 호출을 다루는 핸들러에서 들어오는 요청을 도구에 정의된 스키마로 파싱하려 시도합니다.

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    성공하면 실제 도구를 호출합니다:

    ```typescript
    const result = await tool.callback(input);
    ```

보시다시피 이 방식은 모든 것이 자리 잡은 훌륭한 아키텍처를 만듭니다. *server.ts* 는 요청 핸들러를 연결해 주는 아주 작은 파일이고, 각 기능은 자신 폴더에 존재합니다. 즉 tools/, resources/, prompts/입니다.

좋습니다, 이제 이걸 빌드를 해봅시다.

## 연습: 저수준 서버 만들기

이번 연습에서는 다음 작업을 수행합니다:

1. 도구 나열과 호출을 처리하는 저수준 서버 생성.
1. 기반이 될 수 있는 아키텍처 구현.
1. 도구 호출이 올바르게 검증되도록 검증 기능 추가.

### -1- 아키텍처 만들기

가장 먼저 해결할 것은 기능을 추가하면서 확장 가능한 아키텍처입니다. 다음과 같습니다.

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

이제 tools 폴더에 새 도구를 쉽게 추가할 수 있는 아키텍처가 구축되었습니다. 리소스와 프롬프트용 하위 디렉터리를 추가해도 됩니다.

### -2- 도구 만들기

다음은 도구 생성 예입니다. 먼저 *tool* 하위 디렉터리에 만들어야 합니다.

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic 모델을 사용하여 입력값 검증
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic 추가하여 AddInputModel 생성 및 args 검증 가능하게 하기

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

여기서는 Pydantic으로 이름, 설명, 입력 스키마를 정의하고, 호출 시 실행되는 핸들러를 만듭니다. 마지막으로 `tool_add` 라는 딕셔너리를 공개하여 이 속성을 모두 담습니다.

또한 도구가 사용하는 입력 스키마를 정의하는 <em>schema.py</em>가 있습니다.

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

tools 디렉터리를 모듈로 처리하려면 <em>__init__.py</em>도 작성해야 하며 내부 모듈을 노출해야 합니다.

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

도구가 더 추가되면 이 파일을 계속 갱신할 수 있습니다.

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

여기서는 다음 속성으로 구성된 딕셔너리를 만듭니다:

- name: 도구 이름
- rawSchema: Zod 스키마, 들어오는 호출 요청 검증용
- inputSchema: 핸들러에서 사용할 스키마
- callback: 도구를 실행하는 함수

그리고 `Tool` 타입을 변환하는 용도의 타입 변환기가 있습니다.

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

각 도구 입력 스키마가 저장되는 *schema.ts* 도 있습니다. 현재는 하나의 스키마지만 도구가 증가함에 따라 항목을 추가할 수 있습니다.

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

좋습니다, 이제 도구 목록을 처리해 보겠습니다.

### -3- 도구 목록 처리

다음은 도구 목록 처리를 위한 요청 핸들러를 설정하는 예입니다. 서버 파일에 다음을 추가합니다.

**Python**

```python
# 간결성을 위해 코드가 생략되었습니다
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

여기서는 `@server.list_tools` 데코레이터와 이를 구현하는 `handle_list_tools` 함수를 추가합니다. 함수에서 도구 목록을 생성해야 하며, 각 도구는 이름, 설명, inputSchema 필드를 가져야 함을 주의하세요.

**TypeScript**

도구 목록 요청 핸들러를 설정하려면, 서버에서 요청 처리기를 `ListToolsRequestSchema`에 맞게 호출해야 합니다.

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
// 간결함을 위한 코드 생략
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 등록된 도구 목록 반환
  return {
    tools: tools
  };
});
```

좋습니다, 도구 나열 부분을 해결했습니다. 이제 다음은 도구 호출을 살펴봅니다.

### -4- 도구 호출 처리

도구를 호출하려면 어떤 기능을 호출하고 어떤 인자로 호출할지 지정하는 요청을 다루는 다른 요청 핸들러를 설정해야 합니다.

**Python**

`@server.call_tool` 데코레이터를 사용하고 `handle_call_tool` 같은 함수로 구현합시다. 이 함수에서는 도구 이름과 인자를 파싱하고, 인자가 해당 도구에 유효한지 확인해야 합니다. 인자 검증은 여기서 하거나 실제 도구 내부에서 할 수 있습니다.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools는 도구 이름을 키로 가지는 딕셔너리입니다
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # 도구를 호출합니다
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

작동 방식은:

- 도구 이름은 입력 파라미터 `name` 에 있습니다. `arguments` 딕셔너리 안에 도구 인자가 들어 있습니다.

- 도구 호출은 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` 로 처리되며, 인자 검증은 `handler` 함수 내부에서 실행됩니다. 실패 시 예외가 발생합니다.

이제 저수준 서버를 이용해 도구 나열과 호출을 완전히 이해했습니다.

[전체 예제](./code/README.md)를 보세요.

## 과제

지금까지 받은 코드를 다양하게 도구, 리소스, 프롬프트를 추가해 확장해 보세요. tools 디렉터리에 파일만 추가하면 되고 다른 곳은 변경할 필요가 없다는 점을 느껴보세요.

*해답은 제공하지 않습니다*

## 요약

이번 장에서는 저수준 서버 접근법이 어떻게 동작하는지, 이를 통해 유지 보수하기 좋은 아키텍처를 만드는 방법을 배웠습니다. 그뿐 아니라 검증에 대해서도 알아보고 입력 검증용 스키마 생성을 위한 라이브러리 사용법을 확인했습니다.

## 다음 내용

- 다음: [간단한 인증](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 최선을 다하고 있으나, 자동 번역은 오류나 부정확성이 있을 수 있음을 유의해 주시기 바랍니다. 원문 언어로 된 원본 문서를 권위 있는 출처로 간주해야 합니다. 중요한 정보의 경우 전문 인간 번역을 권장합니다. 본 번역 사용으로 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->