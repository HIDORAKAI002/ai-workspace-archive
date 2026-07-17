# 고급 서버 사용법

MCP SDK에는 일반 서버와 저수준 서버, 두 가지 유형의 서버가 노출되어 있습니다. 보통은 일반 서버를 사용하여 기능을 추가하지만, 경우에 따라 다음과 같이 저수준 서버에 의존하고자 할 때도 있습니다:

- 더 나은 아키텍처. 일반 서버와 저수준 서버 모두로 깨끗한 아키텍처를 만드는 것이 가능하지만, 저수준 서버 쪽이 약간 더 쉽다고 할 수 있습니다.
- 기능 가용성. 일부 고급 기능은 저수준 서버에서만 사용할 수 있습니다. 추후 장에서 샘플링( `2026-07-28` 릴리스 후보에서 사용 중단 예정) 및 모집을 추가하면서 이 점을 확인할 수 있습니다.

## 일반 서버 vs 저수준 서버

일반 서버로 MCP 서버를 생성하는 모습은 다음과 같습니다.

**Python**

```python
mcp = FastMCP("Demo")

# 추가 도구를 추가하세요
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

// 덧셈 도구 추가
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

요점은, 서버에 갖추고 싶은 도구, 리소스 또는 프롬프트를 각각 명시적으로 추가한다는 점입니다. 이는 문제없습니다.  

### 저수준 서버 접근법

저수준 서버를 사용할 때는 다르게 생각해야 합니다. 각각의 도구를 등록하는 대신 기능 유형별(도구, 리소스, 프롬프트)로 두 개의 핸들러를 만듭니다. 예를 들어, 도구는 다음과 같이 두 함수만 가집니다:

- 모든 도구 나열. 모든 도구 목록 호출을 처리하는 함수 하나.
- 도구 호출 처리. 하나의 함수가 도구 호출을 처리.

더 적은 작업처럼 들리죠? 도구를 등록하는 대신, 도구 목록을 나열할 때 도구가 포함되어 있고 도구 호출 요청이 들어오면 호출되게 하면 됩니다. 

코드가 어떻게 바뀌었는지 봅시다:

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

여기에는 기능 목록을 반환하는 함수가 있습니다. 도구 목록 각 항목은 반환 타입에 맞게 `name`, `description` 및 `inputSchema` 같은 필드를 가집니다. 이를 통해 도구와 기능 정의를 다른 곳에 둘 수 있습니다. 이제 tools 폴더에 모든 도구를 만들고, 모든 기능도 마찬가지로 관리하여 프로젝트가 다음과 같이 정리될 수 있습니다:

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

훌륭합니다, 우리의 아키텍처가 꽤 깔끔해질 수 있습니다.

도구 호출은 어떻게 할까요? 역시 하나의 핸들러로 모든 도구를 호출하는 같은 아이디어인가요? 네, 맞습니다. 코드 예시는 다음과 같습니다:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools는 도구 이름을 키로 하는 딕셔너리입니다
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
    // TODO 도구 호출하기,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

위 코드에서 볼 수 있듯, 호출할 도구와 인자를 파싱하고, 도구 호출을 진행해야 합니다.

## 검증으로 접근법 개선하기

지금까지는 도구, 리소스, 프롬프트 추가 등록을 기능 유형별 두 핸들러로 대체하는 방법을 봤습니다. 다음으로 무엇을 해야 할까요? 올바른 인자로 도구가 호출되도록 검증을 추가해야 합니다. 각 실행 환경마다 해결책이 있습니다. 예를 들어 Python은 Pydantic, TypeScript는 Zod를 씁니다. 아이디어는 다음과 같습니다:

- 기능(도구, 리소스, 프롬프트) 생성을 해당 전용 폴더로 이동합니다.
- 도구 호출 같은 요청의 인자를 검증하는 방법을 추가합니다.

### 기능 만들기

기능을 만들려면 해당 기능의 파일을 만들고 필수 필드를 포함시켜야 합니다. 도구, 리소스, 프롬프트마다 약간씩 다릅니다.

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
        # Pydantic 모델을 사용하여 입력값을 검증합니다
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic을 추가하여 AddInputModel을 만들고 args를 검증할 수 있도록 합니다

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

여기서 다음을 수행하는 걸 볼 수 있습니다:

- *schema.py* 파일에 Pydantic `AddInputModel` 스키마를 필드 `a`, `b`와 함께 생성.
- 들어오는 요청을 `AddInputModel` 타입으로 파싱 시도, 파라미터가 맞지 않으면 실패:

   ```python
   # add.py
    try:
        # Pydantic 모델을 사용하여 입력을 검증합니다
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

이 파싱 로직을 도구 호출 내부에 두거나 핸들러 함수에 둘지 선택할 수 있습니다.

**TypeScript**

```typescript
// 서버.ts
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

       // @ts-무시
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

// 스키마.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// 추가.ts
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

- 모든 도구 호출을 다루는 핸들러에서 들어오는 요청을 도구의 정의된 스키마로 파싱하려 시도:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    성공하면 실제 도구 호출 진행:

    ```typescript
    const result = await tool.callback(input);
    ```

이 접근법은 훌륭한 아키텍처를 만듭니다. *server.ts* 파일은 요청 핸들러 연결만 하는 아주 작은 파일이고, 각 기능들은 각자의 폴더에 있습니다(예: tools/, resources/, prompts/).

좋습니다, 계속 진행해 봅시다.

## 연습문제: 저수준 서버 만들기

이 연습에서 할 일은 다음과 같습니다:

1. 도구 목록 나열과 도구 호출을 처리하는 저수준 서버 만들기.
1. 위에 구축할 수 있는 아키텍처 구현.
1. 도구 호출이 제대로 검증되도록 검증 추가.

### -1- 아키텍처 만들기

먼저, 더 많은 기능을 추가해도 확장되는 아키텍처가 필요합니다. 아래와 같습니다:

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

이제 tools 폴더에 새 도구를 쉽게 추가할 수 있는 아키텍처를 구축했습니다. 필요하다면 resources 및 prompts용 하위 디렉토리도 추가하세요.

### -2- 도구 만들기

도구 만드는 법을 봅시다. 우선 도구 하위 디렉토리에 만들어야 합니다:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Pydantic 모델을 사용하여 입력 값 검증
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: Pydantic을 추가하여 AddInputModel을 만들고 args를 검증할 수 있도록 하기

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

여기서 이름, 설명, 입력 스키마를 Pydantic으로 정의하고 호출될 때 실행되는 핸들러를 선언합니다. 마지막으로 모든 속성을 담은 사전 `tool_add`를 노출합니다.

또한 도구의 입력 스키마를 정의하는 <em>schema.py</em>가 있습니다:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

tools 디렉토리를 모듈로 인식시키려면 <em>__init__.py</em>를 채워야 하며, 다음처럼 내부 모듈 노출도 필요합니다:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

더 많은 도구를 추가하며 이 파일을 계속 업데이트할 수 있습니다.

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

여기서는 다음과 같은 속성을 가진 사전을 만듭니다:

- name, 도구 이름.
- rawSchema, Zod 스키마로 도구 호출 요청 검증에 사용.
- inputSchema, 핸들러가 사용하는 스키마.
- callback, 도구 호출에 사용되는 콜백.

`Tool`이라는 타입 변환기가 있어, mcp 서버 핸들러가 받을 수 있는 타입으로 변환합니다:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

<em>schema.ts</em>에서는 각 도구의 입력 스키마를 저장합니다. 현재는 스키마 하나지만, 도구가 늘어나면 항목도 더 늘어날 수 있습니다:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

좋습니다, 이제 도구 목록 나열을 처리해 봅시다.

### -3- 도구 목록 처리

도구 목록 처리를 위한 요청 핸들러 설정이 필요합니다. 서버 파일에 다음을 추가하세요:

**Python**

```python
# 간결함을 위해 코드 생략
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

`@server.list_tools` 데코레이터와 `handle_list_tools` 구현 함수가 포함됩니다. 이 함수는 도구 목록을 만들어야 하며, 각 도구는 이름, 설명, inputSchema를 가져야 합니다.   

**TypeScript**

도구 목록 요청 핸들러를 설정하려면 `setRequestHandler`를 서버에 호출하고, `ListToolsRequestSchema`와 같은 스키마를 지정해야 합니다.

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
// 간결함을 위해 코드 생략
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // 등록된 도구 목록을 반환합니다
  return {
    tools: tools
  };
});
```

도구 목록 나열 문제를 해결했으니, 도구 호출 방법을 살펴봅시다.

### -4- 도구 호출 처리

도구 호출을 처리할 또 다른 요청 핸들러가 필요합니다. 이번에는 어떤 기능을 어떤 인자로 호출하는지 다룹니다.

**Python**

`@server.call_tool` 데코레이터를 사용하고 `handle_call_tool` 함수로 구현합시다. 이 함수에서 도구 이름, 인자를 파싱하고, 인자가 유효한지 확인합니다. 검증은 여기서 하거나, 실제 도구에서 할 수 있습니다.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools는 도구 이름을 키로 하는 딕셔너리입니다
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

과정은 다음과 같습니다:

- 도구 이름은 입력 파라미터 `name`에 포함되고, 인자는 `arguments` 딕셔너리 형태입니다.

- 도구는 `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`로 호출되고, 인자 검증은 핸들러 함수 내에서 수행됩니다. 실패 시 예외 발생.

이렇게 해서 저수준 서버로 도구 목록과 호출을 완전히 이해했습니다.

[전체 예제](./code/README.md)를 참고하세요

## 과제

주어진 코드를 여러 도구, 리소스, 프롬프트로 확장하고, tools 디렉토리에 파일만 추가해 다른 곳을 수정할 필요가 없는 점을 확인해 보세요. 

*해답 없음*

## 요약

이번 장에서는 저수준 서버 접근법이 어떻게 작동하는지, 이를 통해 우리가 더 발전시켜 나갈 수 있는 깔끔한 아키텍처를 만드는 방법을 보았습니다. 또한 검증에 대해 논의하고, 입력 검증용 스키마를 만드는 검증 라이브러리 활용법도 배웠습니다.

## 다음 내용

- 다음: [간단한 인증](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->