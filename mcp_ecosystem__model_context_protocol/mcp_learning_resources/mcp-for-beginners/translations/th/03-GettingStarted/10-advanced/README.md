# การใช้งานเซิร์ฟเวอร์ขั้นสูง

ใน MCP SDK จะมีเซิร์ฟเวอร์สองประเภทที่เปิดให้ใช้งาน คือ เซิร์ฟเวอร์ปกติและเซิร์ฟเวอร์ระดับต่ำ โดยปกติแล้วคุณจะใช้เซิร์ฟเวอร์ปกติเพื่อเพิ่มฟีเจอร์ต่างๆ ให้กับมัน แต่ในบางกรณี คุณต้องพึ่งพาเซิร์ฟเวอร์ระดับต่ำ เช่น:

- สถาปัตยกรรมที่ดีขึ้น สามารถสร้างสถาปัตยกรรมที่สะอาดได้ทั้งกับเซิร์ฟเวอร์ปกติและเซิร์ฟเวอร์ระดับต่ำ แต่สามารถกล่าวได้ว่าง่ายกว่าเล็กน้อยหากใช้เซิร์ฟเวอร์ระดับต่ำ
- การใช้งานฟีเจอร์บางอย่าง ฟีเจอร์ขั้นสูงบางอย่างใช้ได้เฉพาะกับเซิร์ฟเวอร์ระดับต่ำเท่านั้น คุณจะเห็นสิ่งนี้ในบทถัดไปเมื่อเรานำการสุ่มตัวอย่าง (เลิกใช้ในตัวอย่างรุ่น `2026-07-28`) และการเรียกเสริมมาใช้

## เซิร์ฟเวอร์ปกติกับเซิร์ฟเวอร์ระดับต่ำ

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

// เพิ่มเครื่องมือบวก
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

จุดที่ต้องการสื่อคือ คุณต้องเพิ่มเครื่องมือ ทรัพยากร หรือพรอมต์ที่คุณต้องการให้เซิร์ฟเวอร์มีอย่างชัดเจน ไม่มีอะไรผิดปกติกับวิธีนี้  

### แนวทางเซิร์ฟเวอร์ระดับต่ำ

อย่างไรก็ตาม เมื่อใช้แนวทางเซิร์ฟเวอร์ระดับต่ำ คุณต้องคิดในทางที่แตกต่างแทน แทนที่จะลงทะเบียนเครื่องมือแต่ละชิ้น คุณจะสร้างตัวจัดการสองตัวต่อประเภทฟีเจอร์ (เครื่องมือ ทรัพยากร หรือพรอมต์) ดังนั้นตัวอย่างเช่น เครื่องมือจะมีเพียงสองฟังก์ชันดังนี้:

- แสดงรายการเครื่องมือทั้งหมด หนึ่งฟังก์ชันจะรับผิดชอบการแสดงรายการทุกความพยายามของเครื่องมือ
- จัดการการเรียกเครื่องมือ มีเพียงหนึ่งฟังก์ชันที่จัดการการเรียกเครื่องมือ

ฟังดูเหมือนจะทำงานน้อยลงใช่ไหม? ดังนั้นแทนที่จะลงทะเบียนเครื่องมือ ฉันแค่ต้องตรวจสอบว่าเครื่องมือนั้นถูกแสดงเมื่อฉันแสดงรายการเครื่องมือทั้งหมด และเครื่องมือนั้นจะถูกเรียกเมื่อมีคำขอเข้ามาเรียกใช้เครื่องมือ 

มาดูว่าโค้ดดูอย่างไรตอนนี้:

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
  // ส่งกลับรายการเครื่องมือที่ลงทะเบียนแล้ว
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

ตอนนี้เรามีฟังก์ชันที่คืนรายการฟีเจอร์ แต่ละรายการในรายการเครื่องมือมีฟิลด์ เช่น `name`, `description` และ `inputSchema` เพื่อยึดตามประเภทการคืนค่าที่กำหนดไว้ สิ่งนี้ช่วยให้เรานำเครื่องมือและการกำหนดฟีเจอร์ไว้ที่อื่น ๆ ได้ เราสามารถสร้างเครื่องมือทั้งหมดในโฟลเดอร์ tools และเช่นเดียวกับฟีเจอร์ทั้งหมด ดังนั้นโปรเจ็กต์ของคุณจึงถูกจัดระเบียบแบบนี้:

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

ดีมาก สถาปัตยกรรมของเราดูสะอาดตาขึ้นได้

แล้วการเรียกเครื่องมือ ลักษณะเดียวกันไหม หนึ่งตัวจัดการเรียกเครื่องมือใด ๆ ใช่ ถูกต้อง นี่คือตัวอย่างโค้ดสำหรับส่วนนี้:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools เป็นพจนานุกรมที่มีชื่อเครื่องมือเป็นคีย์
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
    // TODO เรียกใช้เครื่องมือ,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

จากโค้ดด้านบน คุณจะเห็นว่าเราต้องแยกแยะเครื่องมือที่จะเรียกและอาร์กิวเมนต์ จากนั้นจึงดำเนินการเรียกเครื่องมือ

## การปรับปรุงแนวทางด้วยการตรวจสอบความถูกต้อง

จนถึงตอนนี้ คุณได้เห็นว่าการลงทะเบียนเพิ่มเครื่องมือ ทรัพยากร และพรอมต์ทั้งหมดถูกแทนที่ด้วยสองตัวจัดการนี้ต่อประเภทฟีเจอร์ เราควรทำอะไรเพิ่มเติมไหม? เราควรเพิ่มรูปแบบการตรวจสอบความถูกต้องเพื่อให้แน่ใจว่าเครื่องมือถูกเรียกด้วยอาร์กิวเมนต์ที่ถูกต้อง รันไทม์แต่ละตัวมีวิธีแก้ของตัวเอง เช่น Python ใช้ Pydantic และ TypeScript ใช้ Zod แนวคิดคือเราจะทำดังนี้:

- ย้ายตรรกะการสร้างฟีเจอร์ (เครื่องมือ ทรัพยากร หรือพรอมต์) ไปยังโฟลเดอร์เฉพาะของฟีเจอร์นั้น ๆ
- เพิ่มวิธีการตรวจสอบความถูกต้องของคำขอที่เข้ามา เช่น การเรียกเครื่องมือ

### สร้างฟีเจอร์

ในการสร้างฟีเจอร์ เราจะต้องสร้างไฟล์สำหรับฟีเจอร์นั้นและตรวจสอบให้แน่ใจว่ามีฟิลด์บังคับที่ฟีเจอร์นั้นต้องมี ซึ่งฟิลด์จะแตกต่างกันเล็กน้อยระหว่างเครื่องมือ ทรัพยากร และพรอมต์

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
        # ตรวจสอบความถูกต้องของอินพุตโดยใช้โมเดล Pydantic
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

ที่นี่คุณจะเห็นว่าเราทำดังนี้:

- สร้างสกีมาโดยใช้ Pydantic ชื่อ `AddInputModel` โดยมีฟิลด์ `a` และ `b` ในไฟล์ *schema.py*.
- พยายามแยกวิเคราะห์คำขอที่เข้ามาให้เป็นประเภท `AddInputModel` หากมีพารามิเตอร์ไม่ตรงกัน โค้ดจะทำงานล้มเหลว:

   ```python
   # add.py
    try:
        # ตรวจสอบความถูกต้องของอินพุตโดยใช้โมเดล Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

คุณสามารถเลือกว่าจะใส่ตรรกะการแยกวิเคราะห์นี้ในตัวเรียกเครื่องมือเองหรือในฟังก์ชันตัวจัดการก็ได้

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

- ในตัวจัดการที่จัดการการเรียกเครื่องมือทั้งหมด เราจะพยายามแยกวิเคราะห์คำขอที่เข้ามาให้เป็นสกีมาที่เครื่องมือกำหนด:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    ถ้าทำได้ เราจะดำเนินการเรียกเครื่องมือ:

    ```typescript
    const result = await tool.callback(input);
    ```

ดังที่คุณเห็น แนวทางนี้สร้างสถาปัตยกรรมที่ยอดเยี่ยมโดยที่ทุกอย่างมีที่ของมัน *server.ts* เป็นไฟล์เล็ก ๆ แค่เชื่อมโยงตัวจัดการคำขอ และแต่ละฟีเจอร์จะอยู่ในโฟลเดอร์ของมัน คือ tools/, resources/ หรือ /prompts

ดีเลย ลองสร้างสิ่งนี้กันต่อไป

## แบบฝึกหัด: การสร้างเซิร์ฟเวอร์ระดับต่ำ

ในแบบฝึกหัดนี้ เราจะทำดังนี้:

1. สร้างเซิร์ฟเวอร์ระดับต่ำที่จัดการการแสดงรายการเครื่องมือและการเรียกเครื่องมือ
1. นำเสนอสถาปัตยกรรมที่คุณสามารถสร้างต่อยอดได้
1. เพิ่มการตรวจสอบความถูกต้องเพื่อให้แน่ใจว่าการเรียกเครื่องมือของคุณถูกตรวจสอบอย่างถูกต้อง

### -1- สร้างสถาปัตยกรรม

สิ่งแรกที่เราต้องแก้ไขคือ สถาปัตยกรรมที่ช่วยให้เราสามารถขยายได้เมื่อเพิ่มฟีเจอร์มากขึ้น นี่คือลักษณะของมัน:

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

ตอนนี้เราตั้งค่าสถาปัตยกรรมที่ทำให้เราสามารถเพิ่มเครื่องมือใหม่ในโฟลเดอร์ tools ได้อย่างง่ายดาย สามารถเพิ่มไดเรกทอรีย่อยสำหรับ resources และ prompts ตามต้องการ

### -2- สร้างเครื่องมือ

มาดูว่าการสร้างเครื่องมือเป็นอย่างไร ก่อนอื่น ต้องสร้างในไดเรกทอรีย่อย *tool* ดังนี้:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # ตรวจสอบข้อมูลนำเข้าด้วยโมเดล Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: เพิ่ม Pydantic เพื่อที่เราจะสามารถสร้าง AddInputModel และตรวจสอบ args ได้

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

สิ่งที่เห็นที่นี่คือการกำหนด name, description และ input schema โดยใช้ Pydantic และตัวจัดการที่จะถูกเรียกเมื่อมีการเรียกเครื่องมือนี้ สุดท้าย เราเปิดเผย `tool_add` ซึ่งเป็นพจนานุกรมที่เก็บคุณสมบัติเหล่านี้ทั้งหมด

นอกจากนี้ยังมี *schema.py* ที่ใช้กำหนด input schema สำหรับเครื่องมือของเรา:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

เรายังต้องเติม *__init__.py* เพื่อให้โฟลเดอร์เครื่องมือถูกปฏิบัติเป็นโมดูล นอกจากนี้ ต้องเปิดเผยโมดูลภายในดังนี้:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

เราสามารถเพิ่มในไฟล์นี้ต่อไปเมื่อเพิ่มเครื่องมือมากขึ้น

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

- name, ชื่อนี้คือชื่อเครื่องมือ
- rawSchema, นี่คือสกีมา Zod ที่ใช้ตรวจสอบความถูกต้องของคำขอที่เข้ามาเพื่อเรียกใช้เครื่องมือนี้
- inputSchema, สกีมานี้จะถูกใช้โดยตัวจัดการ
- callback, ใช้สำหรับเรียกเครื่องมือ

นอกจากนี้ยังมี `Tool` ที่ใช้แปลงพจนานุกรมนี้เป็นชนิดที่ตัวจัดการเซิร์ฟเวอร์ mcp สามารถรับได้ ลักษณะดังนี้:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

และมี *schema.ts* ที่เก็บ input schemas สำหรับแต่ละเครื่องมือดังนี้ โดยตอนนี้มีสกีมาเดียวแต่เมื่อเพิ่มเครื่องมือเราก็สามารถเพิ่มรายการได้มากขึ้น:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

ดีเลย เรามาดำเนินการจัดการการแสดงรายการเครื่องมือกันต่อ

### -3- จัดการการแสดงรายการเครื่องมือ

ต่อมา ในการจัดการการแสดงรายการเครื่องมือ เราต้องตั้งค่าตัวจัดการคำขอสำหรับสิ่งนี้ นี่คือตัวอย่างสิ่งที่ต้องเพิ่มในไฟล์เซิร์ฟเวอร์ของเรา:

**Python**

```python
# โค้ดถูกละไว้เพื่อความกระชับ
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

ที่นี่ เราเพิ่มดีคอเรเตอร์ `@server.list_tools` และฟังก์ชันที่ใช้งานจริง `handle_list_tools` ในฟังก์ชันหลังนี้ เราต้องสร้างรายการเครื่องมือ สังเกตว่าแต่ละเครื่องมือต้องมีชื่อ คำอธิบาย และ inputSchema  

**TypeScript**

ในการตั้งค่าตัวจัดการคำขอสำหรับการแสดงรายการเครื่องมือ เราต้องเรียก `setRequestHandler` บนเซิร์ฟเวอร์ พร้อมกับสกีมาที่เหมาะสมกับสิ่งที่เราจะทำ ในกรณีนี้คือ `ListToolsRequestSchema` 

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
// ตัดโค้ดเพื่อความกระชับ
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // คืนรายชื่อเครื่องมือที่ลงทะเบียนไว้
  return {
    tools: tools
  };
});
```

ดี ตอนนี้เราสามารถจัดการส่วนแสดงรายการเครื่องมือได้แล้ว มาดูการเรียกเครื่องมือต่อไปกัน

### -4- จัดการการเรียกเครื่องมือ

ในการเรียกเครื่องมือ เราต้องตั้งค่าตัวจัดการคำขออีกตัว โดยครั้งนี้จะเน้นเรื่องคำขอที่จะระบุว่าจะเรียกฟีเจอร์ไหนและด้วยอาร์กิวเมนต์อะไร

**Python**

เรามาใช้ดีคอเรเตอร์ `@server.call_tool` และทำการสร้างฟังก์ชัน `handle_call_tool` ภายในฟังก์ชันนี้ เราต้องแยกแยะชื่อเครื่องมือ อาร์กิวเมนต์ และตรวจสอบว่าอาร์กิวเมนต์ถูกต้องสำหรับเครื่องมือนั้น เราสามารถตรวจสอบความถูกต้องในฟังก์ชันนี้หรือที่ตัวเครื่องมือจริง ๆ ก็ได้

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools เป็นพจนานุกรมที่มีชื่อเครื่องมือเป็นคีย์
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # เรียกใช้งานเครื่องมือ
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

สิ่งที่เกิดขึ้นคือ:

- ชื่อเครื่องมือมีอยู่แล้วในพารามิเตอร์อินพุต `name` ซึ่งตรงกับอาร์กิวเมนต์ในรูปแบบพจนานุกรม `arguments`

- เครื่องมือถูกเรียกด้วย `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)` การตรวจสอบความถูกต้องของอาร์กิวเมนต์เกิดขึ้นในคุณสมบัติ `handler` ซึ่งชี้ไปที่ฟังก์ชัน หากล้มเหลวจะเกิด exception

ดังนั้นตอนนี้เราจึงเข้าใจอย่างเต็มที่เกี่ยวกับการแสดงรายการและการเรียกเครื่องมือโดยใช้เซิร์ฟเวอร์ระดับต่ำ

ดู [ตัวอย่างเต็ม](./code/README.md) ได้ที่นี่

## งานที่ได้รับมอบหมาย

ขยายโค้ดที่คุณได้รับด้วยเครื่องมือ ทรัพยากร และพรอมต์จำนวนมาก และสะท้อนให้เห็นว่าคุณจะต้องเพิ่มไฟล์ในไดเรกทอเครื่องมือเท่านั้น และไม่ต้องทำที่อื่น  

*ไม่มีวิธีแก้ไขให้*

## สรุป

ในบทนี้ เราได้เห็นว่าแนวทางเซิร์ฟเวอร์ระดับต่ำทำงานอย่างไร และช่วยให้เราสร้างสถาปัตยกรรมที่ดีที่สามารถต่อยอดได้อย่างไร นอกจากนี้เรายังพูดถึงเรื่องการตรวจสอบความถูกต้องและแสดงให้เห็นว่าทำงานกับไลบรารีตรวจสอบความถูกต้องเพื่อสร้างสกีมาในการตรวจสอบอินพุตอย่างไร

## ต่อไปคืออะไร

- ถัดไป: [การพิสูจน์ตัวตนอย่างง่าย](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->