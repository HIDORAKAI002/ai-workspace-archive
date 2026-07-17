# Sử dụng nâng cao máy chủ

Có hai loại máy chủ khác nhau được cung cấp trong MCP SDK, máy chủ thông thường của bạn và máy chủ cấp thấp. Thông thường, bạn sẽ dùng máy chủ thông thường để thêm tính năng cho nó. Tuy nhiên, trong một số trường hợp, bạn muốn dựa vào máy chủ cấp thấp như:

- Kiến trúc tốt hơn. Có thể tạo một kiến trúc sạch với cả máy chủ thông thường và máy chủ cấp thấp nhưng có thể nói rằng nó hơi dễ hơn với máy chủ cấp thấp.
- Khả năng tính năng. Một số tính năng nâng cao chỉ có thể sử dụng với máy chủ cấp thấp. Bạn sẽ thấy điều này ở các chương sau khi chúng ta thêm lấy mẫu (bị loại bỏ trong bản phát hành ứng viên `2026-07-28`) và thu thập dữ liệu.

## Máy chủ thông thường so với máy chủ cấp thấp

Đây là cách tạo một MCP Server với máy chủ thông thường

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

// Thêm một công cụ cộng thêm
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

Ý chính là bạn phải thêm rõ ràng từng công cụ, tài nguyên hoặc prompt mà bạn muốn máy chủ có. Không có gì sai với điều đó.  

### Phương pháp máy chủ cấp thấp

Tuy nhiên, khi bạn dùng phương pháp máy chủ cấp thấp bạn cần suy nghĩ khác đi. Thay vì đăng ký từng công cụ, bạn sẽ tạo hai bộ xử lý cho mỗi loại tính năng (công cụ, tài nguyên hoặc prompt). Ví dụ, công cụ chỉ có hai hàm như sau:

- Liệt kê tất cả công cụ. Một hàm chịu trách nhiệm cho tất cả các cố gắng liệt kê công cụ.
- Xử lý việc gọi tất cả công cụ. Ở đây cũng chỉ có một hàm xử lý các cuộc gọi đến công cụ

Nghe có vẻ ít công việc hơn đúng không? Vậy thay vì đăng ký công cụ, tôi chỉ cần chắc chắn rằng công cụ được liệt kê khi tôi liệt kê tất cả công cụ và được gọi khi có yêu cầu gọi công cụ.

Hãy cùng xem mã giờ trông như thế nào:

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

Đây giờ chúng ta có một hàm trả về danh sách các tính năng. Mỗi mục trong danh sách công cụ giờ có các trường như `name`, `description` và `inputSchema` để phù hợp với kiểu trả về. Điều này cho phép chúng ta đặt định nghĩa công cụ và tính năng ở chỗ khác. Bây giờ chúng ta có thể tạo tất cả công cụ trong thư mục tools và tương tự cho các tính năng khác giúp dự án của bạn bỗng nhiên được tổ chức như sau:

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

Thật tuyệt, kiến trúc của chúng ta có thể trông rất sạch sẽ.

Còn gọi công cụ thì sao, có phải cùng ý tưởng, một bộ xử lý gọi một công cụ, bất kể là công cụ nào? Đúng vậy, đây là mã cho phần đó:

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

Như bạn thấy từ đoạn mã trên, chúng ta cần phân tích công cụ cần gọi, và với các đối số nào, rồi sau đó ta tiến hành gọi công cụ đó.

## Cải thiện phương pháp với xác thực

Cho tới giờ, bạn đã thấy cách tất cả đăng ký thêm công cụ, tài nguyên, prompt có thể thay thế bằng hai bộ xử lý này cho mỗi loại tính năng. Còn gì nữa ta cần làm? Chúng ta nên thêm một dạng xác thực để đảm bảo công cụ được gọi với các đối số đúng. Mỗi runtime có cách giải quyết riêng, ví dụ Python dùng Pydantic còn TypeScript dùng Zod. Ý tưởng là ta làm như sau:

- Di chuyển logic tạo tính năng (công cụ, tài nguyên hoặc prompt) vào thư mục riêng của nó.
- Thêm cách xác thực yêu cầu vào ví dụ gọi một công cụ.

### Tạo một tính năng

Để tạo một tính năng, ta cần tạo một file cho tính năng đó và đảm bảo nó có các trường bắt buộc của tính năng. Các trường này có sự khác biệt nhỏ giữa công cụ, tài nguyên và prompt.

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
        # Xác thực đầu vào sử dụng mô hình Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: thêm Pydantic, để chúng ta có thể tạo AddInputModel và xác thực các tham số đầu vào

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ở đây bạn thấy cách chúng ta làm như sau:

- Tạo một schema dùng Pydantic `AddInputModel` với các trường `a` và `b` trong file *schema.py*.
- Thử phân tích yêu cầu đầu vào thành kiểu `AddInputModel`, nếu có sự sai lệch tham số sẽ gây lỗi:

   ```python
   # add.py
    try:
        # Xác thực đầu vào bằng cách sử dụng mô hình Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Bạn có thể chọn đặt logic phân tích này trong phần gọi công cụ hoặc trong hàm xử lý.

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

- Trong bộ xử lý xử lý tất cả cuộc gọi công cụ, ta thử phân tích yêu cầu đầu vào theo schema định nghĩa của công cụ:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    nếu thành công thì ta tiến tới gọi công cụ thật sự:

    ```typescript
    const result = await tool.callback(input);
    ```

Như bạn thấy, phương pháp này tạo ra kiến trúc tuyệt vời vì mọi thứ có vị trí rõ ràng, file *server.ts* rất nhỏ gọn chỉ dùng để kết nối các hàm xử lý yêu cầu và mỗi tính năng nằm trong thư mục riêng của nó như tools/, resources/ hoặc /prompts.

Tuyệt vời, chúng ta hãy thử xây dựng phần này tiếp theo.

## Bài tập: Tạo máy chủ cấp thấp

Trong bài tập này, chúng ta sẽ làm những việc sau:

1. Tạo một máy chủ cấp thấp xử lý việc liệt kê và gọi công cụ.
1. Thực hiện một kiến trúc có thể tiếp tục xây dựng.
1. Thêm xác thực để đảm bảo các cuộc gọi công cụ được xác thực đúng.

### -1- Tạo kiến trúc

Việc đầu tiên cần làm là tạo kiến trúc giúp chúng ta có thể mở rộng khi thêm nhiều tính năng, đây là cách nó trông như sau:

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

Giờ chúng ta đã thiết lập kiến trúc đảm bảo có thể dễ dàng thêm công cụ mới trong thư mục tools. Bạn cũng có thể thêm các thư mục con cho resources và prompts.

### -2- Tạo một công cụ

Hãy xem việc tạo một công cụ sẽ như thế nào tiếp theo. Đầu tiên, nó cần được tạo trong thư mục con *tool* như sau:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Xác thực đầu vào bằng mô hình Pydantic
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

Bạn thấy ở đây cách định nghĩa tên, mô tả và schema đầu vào dùng Pydantic cùng bộ xử lý sẽ được gọi khi công cụ được gọi. Cuối cùng, chúng ta xuất ra `tool_add` là một từ điển chứa tất cả các thuộc tính này.

Còn file *schema.py* dùng để định nghĩa schema đầu vào của công cụ:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Chúng ta cũng cần cập nhật *__init__.py* để thư mục tools được coi là một module. Thêm vào đó, phải xuất các module bên trong như sau:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Ta có thể tiếp tục thêm vào file này khi có thêm công cụ mới.

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

Ở đây chúng ta tạo một từ điển gồm các thuộc tính:

- name, đây là tên công cụ.
- rawSchema, là schema Zod dùng để xác thực yêu cầu vào khi gọi công cụ này.
- inputSchema, schema này sẽ được bộ xử lý dùng.
- callback, dùng để gọi công cụ.

Còn có `Tool` dùng để chuyển từ điển này thành kiểu mà bộ xử lý mcp server chấp nhận, trông như sau:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Và file *schema.ts* nơi lưu schema đầu vào của từng công cụ như thế này, hiện tại chỉ có một schema nhưng khi thêm công cụ mới có thể thêm các mục khác:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Tuyệt vời, giờ ta tiếp tục xử lý việc liệt kê công cụ.

### -3- Xử lý liệt kê công cụ

Tiếp theo, để xử lý việc liệt kê công cụ, ta cần thiết lập một bộ xử lý yêu cầu cho việc đó. Dưới đây là những gì cần thêm vào file máy chủ:

**Python**

```python
# mã nguồn bị loại bỏ để ngắn gọn
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

Ở đây, ta thêm decorator `@server.list_tools` và hàm cài đặt `handle_list_tools`. Trong hàm này, ta tạo danh sách công cụ. Lưu ý mỗi công cụ phải có tên, mô tả và inputSchema.   

**TypeScript**

Để thiết lập bộ xử lý yêu cầu liệt kê công cụ, ta gọi `setRequestHandler` trên server với schema phù hợp, trong trường hợp này là `ListToolsRequestSchema`. 

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
// mã đã bị bỏ qua để ngắn gọn
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Trả về danh sách các công cụ đã đăng ký
  return {
    tools: tools
  };
});
```

Tuyệt vời, ta đã giải quyết phần liệt kê công cụ, giờ hãy xem cách gọi công cụ tiếp theo.

### -4- Xử lý gọi công cụ

Để gọi công cụ, ta cần thiết lập một bộ xử lý yêu cầu khác, lần này tập trung vào yêu cầu chỉ định tính năng gọi và với các đối số nào.

**Python**

Hãy dùng decorator `@server.call_tool` và cài đặt hàm như `handle_call_tool`. Trong hàm này, ta cần phân tích tên công cụ, đối số và đảm bảo đối số hợp lệ cho công cụ đó. Ta có thể xác thực đối số ở đây hoặc ở bên trong công cụ.

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

Đây là những gì xảy ra:

- Tên công cụ đã có trong tham số đầu vào `name` và đối số ở dạng dictionary `arguments`.

- Công cụ được gọi bằng `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Việc xác thực đối số diễn ra trong `handler`, nếu không hợp lệ sẽ gây lỗi.

Vậy là, ta đã hiểu đầy đủ cách liệt kê và gọi công cụ khi dùng máy chủ cấp thấp.

Xem [ví dụ đầy đủ](./code/README.md) tại đây

## Bài tập về nhà

Mở rộng mã bạn nhận được với nhiều công cụ, tài nguyên và prompt và suy ngẫm về việc bạn chỉ cần thêm file trong thư mục tools mà không chỗ nào khác.

*Không có lời giải*

## Tóm tắt

Trong chương này, chúng ta đã xem cách phương pháp máy chủ cấp thấp hoạt động và nó giúp tạo ra một kiến trúc đẹp để tiếp tục phát triển. Chúng ta cũng bàn về xác thực và bạn đã được hướng dẫn cách làm việc với thư viện xác thực tạo các schema cho việc xác thực đầu vào.

## Tiếp theo

- Tiếp theo: [Xác thực đơn giản](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->