# Sử dụng máy chủ nâng cao

Có hai loại máy chủ khác nhau được cung cấp trong MCP SDK, máy chủ bình thường và máy chủ cấp thấp. Thông thường, bạn sẽ sử dụng máy chủ bình thường để thêm tính năng cho nó. Tuy nhiên, trong một số trường hợp, bạn muốn dựa vào máy chủ cấp thấp như:

- Kiến trúc tốt hơn. Có thể tạo ra một kiến trúc sạch với cả máy chủ bình thường và máy chủ cấp thấp nhưng có thể tranh luận rằng nó hơi dễ hơn với máy chủ cấp thấp.
- Tính năng có sẵn. Một số tính năng nâng cao chỉ có thể sử dụng với máy chủ cấp thấp. Bạn sẽ thấy điều này trong các chương sau khi chúng ta thêm việc lấy mẫu và khơi gợi.

## Máy chủ bình thường và máy chủ cấp thấp

Dưới đây là cách tạo một Máy chủ MCP với máy chủ bình thường

**Python**

```python
mcp = FastMCP("Demo")

# Thêm một công cụ cộng
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

// Thêm một công cụ cộng
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

Điều quan trọng là bạn phải thêm rõ ràng từng công cụ, tài nguyên hoặc prompt mà bạn muốn máy chủ có. Điều đó không có gì sai cả.

### Cách tiếp cận máy chủ cấp thấp

Tuy nhiên, khi bạn sử dụng cách tiếp cận máy chủ cấp thấp, bạn cần suy nghĩ khác. Thay vì đăng ký từng công cụ, bạn sẽ tạo hai trình xử lý cho mỗi loại tính năng (công cụ, tài nguyên hoặc prompt). Ví dụ, các công cụ chỉ có hai hàm như sau:

- Liệt kê tất cả công cụ. Một hàm sẽ chịu trách nhiệm cho tất cả các cố gắng liệt kê công cụ.
- Xử lý gọi tất cả các công cụ. Ở đây cũng chỉ có một hàm xử lý các cuộc gọi tới một công cụ.

Nghe có vẻ ít công việc hơn đúng không? Thay vì đăng ký một công cụ, mình chỉ cần đảm bảo công cụ được liệt kê khi mình liệt kê tất cả công cụ và nó được gọi khi có yêu cầu gọi công cụ đến.

Hãy xem đoạn mã giờ đây trông thế nào:

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
  // Trả về danh sách các công cụ đã đăng ký
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

Ở đây chúng ta có một hàm trả về danh sách các tính năng. Mỗi mục trong danh sách công cụ bây giờ có các trường như `name`, `description` và `inputSchema` để tuân theo kiểu trả về. Điều này cho phép chúng ta đặt các công cụ và định nghĩa tính năng ở nơi khác. Bây giờ chúng ta có thể tạo tất cả các công cụ trong thư mục tools và tương tự với tất cả các tính năng để dự án của bạn có thể bất ngờ được tổ chức như sau:

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

Tuyệt vời, kiến trúc của chúng ta có thể được làm cho trông rất gọn gàng.

Còn việc gọi công cụ thì sao, cũng là một ý tưởng như vậy phải không, một trình xử lý để gọi một công cụ, bất kể là công cụ nào? Chính xác rồi, đây là mã cho điều đó:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools là một từ điển với tên công cụ làm khóa
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
    // TODO gọi công cụ,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Như bạn có thể thấy từ đoạn mã trên, chúng ta cần phân tích để xác định công cụ cần gọi, và với các tham số nào, sau đó chúng ta tiến hành gọi công cụ đó.

## Cải thiện cách tiếp cận với xác thực

Cho đến nay, bạn đã thấy cách tất cả việc đăng ký công cụ, tài nguyên và prompt có thể được thay thế bằng hai trình xử lý này cho mỗi loại tính năng. Vậy còn gì nữa chúng ta cần làm? Chúng ta nên thêm một hình thức xác thực để đảm bảo rằng công cụ được gọi với các đối số đúng. Mỗi runtime đều có giải pháp riêng cho vấn đề này, ví dụ Python sử dụng Pydantic và TypeScript sử dụng Zod. Ý tưởng là chúng ta làm những việc sau:

- Di chuyển logic để tạo một tính năng (công cụ, tài nguyên hoặc prompt) vào thư mục riêng của nó.
- Thêm cách để xác thực một yêu cầu đến, ví dụ như yêu cầu gọi một công cụ.

### Tạo tính năng

Để tạo một tính năng, chúng ta cần tạo một tệp cho tính năng đó và đảm bảo nó có các trường bắt buộc của tính năng. Những trường này khác nhau một chút giữa công cụ, tài nguyên và prompt.

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
        # Xác thực đầu vào bằng mô hình Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: thêm Pydantic, để chúng ta có thể tạo một AddInputModel và xác thực các đối số

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Ở đây bạn có thể thấy cách chúng ta làm những việc sau:

- Tạo schema sử dụng Pydantic `AddInputModel` với các trường `a` và `b` trong tệp *schema.py*.
- Cố gắng phân tích yêu cầu đến thành kiểu `AddInputModel`, nếu có sự không phù hợp về tham số sẽ gây lỗi:

   ```python
   # add.py
    try:
        # Xác thực đầu vào sử dụng mô hình Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Bạn có thể chọn đặt logic phân tích này trong chính cuộc gọi công cụ hoặc trong hàm trình xử lý.

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

- Trong trình xử lý xử lý tất cả các cuộc gọi công cụ, giờ đây chúng ta cố gắng phân tích yêu cầu đến vào schema đã định nghĩa của công cụ:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    nếu thành công thì ta tiến hành gọi công cụ thực sự:

    ```typescript
    const result = await tool.callback(input);
    ```

Như bạn thấy, cách tiếp cận này tạo ra một kiến trúc tuyệt vời vì mọi thứ đều có vị trí riêng, *server.ts* là một tệp rất nhỏ chỉ để kết nối các trình xử lý yêu cầu và mỗi tính năng ở trong thư mục tương ứng tức là tools/, resources/ hoặc /prompts.

Tuyệt, hãy thử xây dựng điều này tiếp theo.

## Bài tập: Tạo một máy chủ cấp thấp

Trong bài tập này, chúng ta sẽ làm những việc sau:

1. Tạo một máy chủ cấp thấp xử lý liệt kê công cụ và gọi công cụ.
1. Triển khai kiến trúc bạn có thể xây dựng dựa trên đó.
1. Thêm xác thực để đảm bảo các cuộc gọi công cụ của bạn được xác thực đúng cách.

### -1- Tạo kiến trúc

Điều đầu tiên chúng ta cần giải quyết là kiến trúc giúp chúng ta dễ dàng mở rộng khi thêm nhiều tính năng hơn, nó trông như sau:

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

Bây giờ chúng ta đã thiết lập kiến trúc đảm bảo rằng chúng ta có thể dễ dàng thêm các công cụ mới trong thư mục tools. Bạn có thể thêm các thư mục con cho resources và prompts.

### -2- Tạo công cụ

Hãy xem tạo một công cụ trông thế nào. Đầu tiên, nó cần được tạo trong thư mục con *tool* như sau:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Xác thực đầu vào sử dụng mô hình Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: thêm Pydantic, để chúng ta có thể tạo AddInputModel và xác thực các đối số

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Chúng ta thấy cách định nghĩa tên, mô tả và input schema sử dụng Pydantic và một trình xử lý sẽ được gọi khi công cụ này được gọi. Cuối cùng, ta xuất `tool_add` là một dictionary chứa tất cả các thuộc tính này.

Ngoài ra còn có *schema.py* được dùng để định nghĩa input schema cho công cụ của chúng ta:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Chúng ta cũng cần điền *__init__.py* để đảm bảo thư mục tools được coi là một module. Thêm vào đó, ta cần xuất các module bên trong nó như sau:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Chúng ta có thể tiếp tục thêm vào tệp này khi thêm nhiều công cụ hơn.

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

Ở đây chúng ta tạo một dictionary gồm các thuộc tính:

- name, là tên của công cụ.
- rawSchema, đây là schema Zod, được dùng để xác thực các yêu cầu gọi công cụ này.
- inputSchema, schema này sẽ được handler sử dụng.
- callback, dùng để gọi công cụ.

Cũng có `Tool` được dùng để chuyển dictionary này thành kiểu mà trình xử lý máy chủ mcp có thể chấp nhận, trông như sau:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Và cũng có *schema.ts* nơi chúng ta lưu các input schema cho từng công cụ, trông như sau với hiện tại chỉ có một schema nhưng khi thêm công cụ ta có thể thêm nhiều mục hơn:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Tuyệt, hãy tiếp tục xử lý việc liệt kê công cụ kế tiếp.

### -3- Xử lý liệt kê công cụ

Tiếp theo, để xử lý liệt kê các công cụ, ta cần thiết lập một trình xử lý yêu cầu cho việc đó. Đây là những gì cần thêm vào tệp server:

**Python**

```python
# mã đã bị bỏ qua để ngắn gọn
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

Ở đây, ta thêm decorator `@server.list_tools` và hàm triển khai `handle_list_tools`. Trong đó, ta cần tạo một danh sách các công cụ. Chú ý rằng mỗi công cụ cần có name, description và inputSchema.

**TypeScript**

Để thiết lập trình xử lý yêu cầu liệt kê công cụ, ta cần gọi `setRequestHandler` trên server với một schema phù hợp với việc chúng ta muốn làm, trong trường hợp này là `ListToolsRequestSchema`.

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
// mã bị bỏ qua để ngắn gọn
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Trả về danh sách các công cụ đã đăng ký
  return {
    tools: tools
  };
});
```

Tuyệt, giờ ta đã giải quyết phần liệt kê công cụ, hãy xem cách ta gọi công cụ tiếp theo.

### -4- Xử lý gọi công cụ

Để gọi một công cụ, ta cần thiết lập một trình xử lý yêu cầu khác, lần này tập trung vào xử lý yêu cầu xác định tính năng cần gọi và với các tham số nào.

**Python**

Hãy dùng decorator `@server.call_tool` và triển khai nó với một hàm như `handle_call_tool`. Trong hàm này, ta cần phân tích tên công cụ, đối số của nó và đảm bảo các đối số hợp lệ cho công cụ đó. Ta có thể xác thực đối số ở đây hoặc bên trong công cụ thực tế.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools là một từ điển với tên công cụ làm khóa
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # gọi công cụ
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Đây là những gì diễn ra:

- Tên công cụ của chúng ta đã có sẵn như tham số đầu vào `name` và đối số của ta có dạng dictionary `arguments`.

- Công cụ được gọi với `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Việc xác thực đối số diễn ra trong thuộc tính `handler` trỏ tới một hàm, nếu không hợp lệ sẽ ném ra ngoại lệ.

Vậy là giờ ta đã hiểu đầy đủ cách liệt kê và gọi công cụ sử dụng máy chủ cấp thấp.

Xem [ví dụ đầy đủ](./code/README.md) ở đây

## Bài tập

Mở rộng mã nguồn bạn được cung cấp với một số công cụ, tài nguyên và prompt và cảm nhận cách bạn chỉ cần thêm tệp trong thư mục tools mà không cần chỗ khác.

*Không có lời giải*

## Tóm tắt

Trong chương này, chúng ta đã thấy cách tiếp cận máy chủ cấp thấp hoạt động và cách nó giúp chúng ta tạo một kiến trúc đẹp mà có thể tiếp tục mở rộng. Chúng ta cũng bàn về xác thực và bạn được hướng dẫn cách làm việc với các thư viện xác thực để tạo schema cho việc xác thực đầu vào.

## Tiếp theo

- Kế tiếp: [Xác thực đơn giản](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ gốc của nó nên được coi là nguồn chính xác và đáng tin cậy. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hoặc diễn giải sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->