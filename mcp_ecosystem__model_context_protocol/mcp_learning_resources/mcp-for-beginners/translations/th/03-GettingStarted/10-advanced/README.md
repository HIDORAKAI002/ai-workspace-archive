# การใช้งานเซิร์ฟเวอร์ขั้นสูง

มีเซิร์ฟเวอร์สองประเภทที่เปิดเผยใน MCP SDK คือ เซิร์ฟเวอร์ปกติและเซิร์ฟเวอร์ระดับต่ำ โดยปกติแล้วคุณจะใช้เซิร์ฟเวอร์ปกติเพื่อเพิ่มฟีเจอร์ลงไป แต่ในบางกรณีคุณอาจต้องพึ่งพาเซิร์ฟเวอร์ระดับต่ำ เช่น:

- สถาปัตยกรรมที่ดีขึ้น สามารถสร้างสถาปัตยกรรมที่สะอาดได้ด้วยเซิร์ฟเวอร์ปกติและเซิร์ฟเวอร์ระดับต่ำ แต่บางทีอาจจะง่ายกว่าเล็กน้อยถ้าใช้เซิร์ฟเวอร์ระดับต่ำ
- ความพร้อมใช้งานของฟีเจอร์ บางฟีเจอร์ขั้นสูงสามารถใช้ได้เฉพาะกับเซิร์ฟเวอร์ระดับต่ำเท่านั้น คุณจะเห็นสิ่งนี้ในบทต่อไปเมื่อเราเพิ่มการสุ่มตัวอย่างและการยืนยันตัวตน

## เซิร์ฟเวอร์ปกติ กับ เซิร์ฟเวอร์ระดับต่ำ

นี่คือลักษณะการสร้าง MCP Server ด้วยเซิร์ฟเวอร์ปกติ

**Python**

```python
mcp = FastMCP("Demo")

# เพิ่มเครื่องมือบวก
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

// เพิ่มเครื่องมือการบวก
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

ประเด็นก็คือว่าคุณต้องเพิ่มแต่ละเครื่องมือ, ทรัพยากร หรือพร้อมท์ที่คุณต้องการให้เซิร์ฟเวอร์มีอย่างชัดเจน ไม่มีอะไรผิดกับวิธีนี้  

### แนวทางเซิร์ฟเวอร์ระดับต่ำ

อย่างไรก็ตาม เมื่อคุณใช้แนวทางเซิร์ฟเวอร์ระดับต่ำ คุณต้องคิดต่างออกไป แทนที่จะลงทะเบียนแต่ละเครื่องมือ คุณจะสร้างผู้จัดการสองตัวต่อลักษณะฟีเจอร์ (เครื่องมือ, ทรัพยากร หรือพร้อมท์) ดังนั้น ตัวอย่างเช่น เครื่องมือจะมีเพียงสองฟังก์ชันเท่านั้น เช่น:

- การแสดงรายการเครื่องมือทั้งหมด ฟังก์ชันหนึ่งจะรับผิดชอบการพยายามแสดงรายการเครื่องมือทั้งหมด
- การจัดการการเรียกใช้เครื่องมือทั้งหมด ที่นี่ก็เช่นกัน มีเพียงฟังก์ชันเดียวที่จัดการการเรียกใช้เครื่องมือ

ฟังดูน่าจะลดงานให้น้อยลงใช่ไหม? ดังนั้นแทนที่จะลงทะเบียนเครื่องมือ วิธีนี้คุณเพียงแค่ต้องแน่ใจว่าเครื่องมือถูกแสดงเมื่อคุณแสดงรายการเครื่องมือทั้งหมด และถูกเรียกใช้เมื่อมีคำขอเรียกใช้เครื่องมือนั้น 

มาดูว่ารหัสตอนนี้เป็นอย่างไร:

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
  // ส่งกลับรายการของเครื่องมือที่ลงทะเบียนไว้
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

ที่นี่เรามีฟังก์ชันที่ส่งคืนรายการฟีเจอร์ แต่ละรายการในรายการเครื่องมือตอนนี้มีฟิลด์ เช่น `name`, `description` และ `inputSchema` เพื่อให้ตรงกับชนิดที่ส่งคืน สิ่งนี้ช่วยให้เราสามารถวางเครื่องมือและนิยามฟีเจอร์ไว้ที่อื่นได้ เราสามารถสร้างเครื่องมือทั้งหมดในโฟลเดอร์ tools และทำแบบเดียวกันสำหรับฟีเจอร์ทั้งหมด ดังนั้นโปรเจกต์ของคุณจึงสามารถจัดระเบียบได้ดังนี้:

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

เยี่ยมมาก สถาปัตยกรรมของเราสามารถดูสะอาดขึ้นมาก

แล้วเกี่ยวกับการเรียกใช้เครื่องมือ ล่ะ มันคือไอเดียวเดียวกันใช่ไหม คือมีผู้จัดการเพียงตัวเดียวสำหรับเรียกใช้เครื่องมือใดก็ได้? ใช่เลย นี่คือรหัสสำหรับตรงนั้น:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools เป็นพจนานุกรมที่ใช้ชื่อเครื่องมือเป็นคีย์
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
    // TODO โทรหาเครื่องมือ,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

ดังที่เห็นจากรหัสข้างต้น เราต้องแยกเครื่องมือที่จะเรียกออกมา และอาร์กิวเมนต์ที่ใช้ จากนั้นเราต้องดำเนินการเรียกใช้เครื่องมือนั้น

## การปรับปรุงแนวทางด้วยการตรวจสอบความถูกต้อง

จนถึงตอนนี้ คุณได้เห็นว่า การลงทะเบียนเพื่อเพิ่มเครื่องมือ ทรัพยากร และพร้อมท์ทั้งหมด สามารถแทนที่ด้วยผู้จัดการสองตัวต่อลักษณะฟีเจอร์ เราต้องทำอะไรอีก? ก็เพิ่มการตรวจสอบความถูกต้องเพื่อให้แน่ใจว่าเครื่องมือถูกเรียกใช้ด้วยอาร์กิวเมนต์ที่ถูกต้อง แต่ละภาษารันไทม์มีโซลูชันของตัวเอง เช่น Python ใช้ Pydantic และ TypeScript ใช้ Zod แนวคิดคือเราทำดังนี้:

- ย้ายตรรกะการสร้างฟีเจอร์ (เครื่องมือ, ทรัพยากร หรือพร้อมท์) ไปยังโฟลเดอร์เฉพาะของฟีเจอร์นั้น
- เพิ่มวิธีการตรวจสอบความถูกต้องของคำขอที่เข้ามา เช่น การเรียกใช้เครื่องมือ

### การสร้างฟีเจอร์

การสร้างฟีเจอร์ เราจะต้องสร้างไฟล์สำหรับฟีเจอร์นั้นและมั่นใจว่ามีฟิลด์บังคับที่ฟีเจอร์นั้นต้องการ ฟิลด์เหล่านี้แตกต่างกันเล็กน้อยระหว่างเครื่องมือ ทรัพยากร และพร้อมท์

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
        # ตรวจสอบความถูกต้องของข้อมูลนำเข้าด้วยโมเดล Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: เพิ่ม Pydantic เพื่อให้เราสามารถสร้าง AddInputModel และตรวจสอบความถูกต้องของ args ได้

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ที่นี่คุณจะเห็นว่าทำดังนี้:

- สร้าง schema โดยใช้ Pydantic `AddInputModel` โดยมีฟิลด์ `a` และ `b` ในไฟล์ *schema.py*
- พยายามแยกคำขอที่เข้ามาให้อยู่ในประเภท `AddInputModel` ถ้ามีความไม่ตรงกันของพารามิเตอร์ นี่จะทำให้เกิดข้อผิดพลาด:

   ```python
   # add.py
    try:
        # ตรวจสอบข้อมูลนำเข้าด้วยแบบจำลอง Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

คุณสามารถเลือกว่าจะใส่ตรรกะการแยกนี้ในฟังก์ชันเรียกเครื่องมือเอง หรือในฟังก์ชันผู้จัดการก็ได้

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

- ในผู้จัดการที่จัดการการเรียกใช้เครื่องมือทั้งหมด เราจะลองแยกคำขอที่เข้ามาให้อยู่ใน schema ที่เครื่องมือกำหนด:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ถ้าสำเร็จ เราจะดำเนินการเรียกใช้เครื่องมือ:

    ```typescript
    const result = await tool.callback(input);
    ```

ดังที่เห็น แนวทางนี้สร้างสถาปัตยกรรมที่ดีมาก เพราะทุกอย่างมีที่ของมัน *server.ts* เป็นไฟล์เล็กที่เชื่อมต่อผู้จัดการคำขอ และแต่ละฟีเจอร์อยู่ในโฟลเดอร์ของตัวเอง คือ tools/, resources/ หรือ /prompts

ดีมาก มาลองสร้างสิ่งนี้กัน

## แบบฝึกหัด: การสร้างเซิร์ฟเวอร์ระดับต่ำ

ในแบบฝึกหัดนี้ เราจะทำดังนี้:

1. สร้างเซิร์ฟเวอร์ระดับต่ำที่จัดการการแสดงรายการเครื่องมือและการเรียกใช้เครื่องมือ
2. นำเสนอสถาปัตยกรรมที่สามารถสร้างต่อยอดได้
3. เพิ่มการตรวจสอบความถูกต้องเพื่อให้แน่ใจว่าการเรียกใช้เครื่องมือของคุณได้รับการตรวจสอบถูกต้อง

### -1- สร้างสถาปัตยกรรม

สิ่งแรกที่ต้องจัดการคือสถาปัตยกรรมที่ช่วยให้เราขยายได้เมื่อเพิ่มฟีเจอร์มากขึ้น ดังนี้:

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

ตอนนี้เราได้ตั้งค่าสถาปัตยกรรมที่ช่วยให้เราสามารถเพิ่มเครื่องมือใหม่ได้ง่ายในโฟลเดอร์ tools อย่าลังเลที่จะทำซับไดเรกทอรีสำหรับ resources และ prompts ด้วย

### -2- การสร้างเครื่องมือ

มาดูว่าการสร้างเครื่องมือเป็นอย่างไร ก่อนอื่น ต้องสร้างในซับไดเรกทอรี *tool* ดังนี้:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # ตรวจสอบข้อมูลนำเข้าด้วยโมเดล Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: เพิ่ม Pydantic เพื่อให้เราสามารถสร้าง AddInputModel และตรวจสอบ args ได้

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ที่นี่เราเห็นว่ากำหนดชื่อ, คำอธิบาย และ schema อินพุตโดยใช้ Pydantic และมี handler ที่จะถูกเรียกเมื่อเครื่องมือนี้ถูกใช้งาน สุดท้ายเราเปิดเผย `tool_add` ซึ่งเป็นพจนานุกรมที่ถือคุณสมบัติเหล่านี้ทั้งหมด

ยังมี *schema.py* ที่ใช้กำหนด schema อินพุตที่เครื่องมือใช้:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

เรายังต้องเติม *__init__.py* เพื่อให้ไดเรกทอรี tools ถูกมองเป็นโมดูล และต้องเปิดเผยโมดูลภายในเหมือนนี้:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

เราสามารถเพิ่มเข้าไปเรื่อย ๆ ในไฟล์นี้เมื่อเพิ่มเครื่องมือมากขึ้น

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

ที่นี่เราสร้างพจนานุกรมที่ประกอบด้วยคุณสมบัติ:

- name, ชื่อของเครื่องมือ
- rawSchema, เป็น schema ของ Zod ใช้ในการตรวจสอบคำขอที่เข้ามาให้เรียกใช้เครื่องมือนี้
- inputSchema, schema นี้จะถูกใช้โดย handler
- callback, ใช้เรียกใช้เครื่องมือ

ยังมี `Tool` ที่ใช้แปลงพจนานุกรมนี้เป็นชนิดที่ผู้จัดการของ mcp server รับได้ และมันดูแบบนี้:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

และยังมี *schema.ts* ที่เก็บ schema อินพุตสำหรับแต่ละเครื่องมือ ลักษณะนี้ตอนนี้มี schema เดียว แต่เมื่อเพิ่มเครื่องมือ เราสามารถเพิ่มรายการได้:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ดีมาก ต่อไปเราจะจัดการกับการแสดงรายการเครื่องมือ

### -3- จัดการการแสดงรายการเครื่องมือ

ต่อไปในการจัดการการแสดงรายการเครื่องมือ เราต้องตั้งค่าผู้จัดการคำขอสำหรับเรื่องนี้ นี่คือสิ่งที่ต้องเพิ่มในไฟล์เซิร์ฟเวอร์ของเรา:

**Python**

```python
# โค้ดถูกตัดออกเพื่อความกระชับ
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

ที่นี่เราเพิ่ม decorator `@server.list_tools` และฟังก์ชันที่ใช้งาน `handle_list_tools` ในฟังก์ชันนี้ เราต้องสร้างรายการเครื่องมือ สังเกตว่าแต่ละเครื่องมือต้องมีชื่อ, คำอธิบาย และ inputSchema  

**TypeScript**

เพื่อสร้างผู้จัดการคำขอสำหรับการแสดงรายการเครื่องมือ เราต้องเรียก `setRequestHandler` บนเซิร์ฟเวอร์พร้อม schema ที่เหมาะสมในกรณีนี้คือ `ListToolsRequestSchema`

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
// ตัดโค้ดออกเพื่อความกระชับ
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // ส่งคืนรายชื่อเครื่องมือที่ลงทะเบียนแล้ว
  return {
    tools: tools
  };
});
```

เยี่ยม ตอนนี้เราแก้ไขการแสดงรายการเครื่องมือเสร็จแล้ว ต่อไปมาดูว่าการเรียกใช้เครื่องมือเป็นอย่างไร

### -4- จัดการการเรียกใช้เครื่องมือ

การเรียกใช้เครื่องมือ เราต้องตั้งค่าผู้จัดการคำขออีกตัวที่เน้นจัดการคำขอที่ระบุฟีเจอร์ที่จะเรียกและอาร์กิวเมนต์ที่ใช้

**Python**

เราจะใช้ decorator `@server.call_tool` และนำไปใช้งานด้วยฟังก์ชันอย่าง `handle_call_tool` ในฟังก์ชันนี้ เราต้องแยกชื่อเครื่องมือ, อาร์กิวเมนต์และตรวจสอบให้อาร์กิวเมนต์ถูกต้องสำหรับเครื่องมือที่ระบุ เราสามารถตรวจสอบอาร์กิวเมนต์ในฟังก์ชันนี้หรือตรวจในเครื่องมือจริงก็ได้

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools คือพจนานุกรมที่ใช้ชื่อเครื่องมือเป็นคีย์
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # เรียกใช้เครื่องมือ
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

นี่คือสิ่งที่เกิดขึ้น:

- ชื่อเครื่องมือของเราอยู่ในพารามิเตอร์ input `name` ซึ่งเป็นจริงสำหรับอาร์กิวเมนต์ในรูปของพจนานุกรม `arguments`

- เครื่องมือถูกเรียกด้วย `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` การตรวจสอบอาร์กิวเมนต์เกิดขึ้นในคุณสมบัติ `handler` ซึ่งชี้ไปที่ฟังก์ชัน หากล้มเหลวจะเกิดข้อยกเว้น

เท่านี้เราก็เข้าใจครบเรื่องการแสดงรายการและการเรียกใช้เครื่องมือด้วยเซิร์ฟเวอร์ระดับต่ำ

ดู [ตัวอย่างเต็ม](./code/README.md) ที่นี่

## งานที่ได้รับมอบหมาย

ขยายโค้ดที่ได้รับด้วยเครื่องมือ ทรัพยากร และพร้อมท์จำนวนหนึ่ง แล้วสะท้อนว่าคุณจะสังเกตได้ว่าคุณแค่เพิ่มไฟล์ในไดเรกทอรี tools เท่านั้น ไม่ต้องไปที่อื่น

*ไม่มีคำตอบ*

## สรุป

ในบทนี้ เราเห็นว่าแนวทางเซิร์ฟเวอร์ระดับต่ำทำงานอย่างไรและช่วยให้เราสร้างสถาปัตยกรรมที่ดีที่เราสามารถสร้างต่อยอดได้ นอกจากนี้ยังพูดถึงการตรวจสอบความถูกต้องและคุณได้รับการสอนวิธีใช้ไลบรารีตรวจสอบความถูกต้องเพื่อสร้าง schema สำหรับตรวจสอบข้อมูลเข้า

## ต่อไป

- ถัดไป: [การยืนยันตัวตนง่าย ๆ](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ข้อจำกัดความรับผิด**:  
เอกสารฉบับนี้ได้รับการแปลโดยใช้บริการแปลด้วย AI [Co-op Translator](https://github.com/Azure/co-op-translator) แม้เราจะพยายามให้ความถูกต้องสูงสุด แต่โปรดทราบว่าการแปลอัตโนมัติอาจมีข้อผิดพลาดหรือความคลาดเคลื่อน เอกสารต้นฉบับในภาษาต้นทางถือเป็นแหล่งข้อมูลที่มีอำนาจสูงสุด สำหรับข้อมูลที่สำคัญ ขอแนะนำให้ใช้บริการแปลโดยมืออาชีพที่เป็นมนุษย์ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความผิดใด ๆ ที่เกิดจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->