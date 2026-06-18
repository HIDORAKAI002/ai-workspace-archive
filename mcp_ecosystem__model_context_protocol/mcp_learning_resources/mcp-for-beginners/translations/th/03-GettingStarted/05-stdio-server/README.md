# MCP Server with stdio Transport

> **⚠️ อัปเดตสำคัญ**: ตามข้อกำหนด MCP วันที่ 2025-06-18 การขนส่ง SSE (Server-Sent Events) แบบสแตนด์อโลนได้ถูก **เลิกใช้** และแทนที่ด้วยการขนส่ง "Streamable HTTP" ข้อกำหนด MCP ปัจจุบันกำหนดกลไกการขนส่งหลักสองแบบ:
> 1. **stdio** - อินพุต/เอาต์พุตมาตรฐาน (แนะนำสำหรับเซิร์ฟเวอร์ในเครื่อง)
> 2. **Streamable HTTP** - สำหรับเซิร์ฟเวอร์ระยะไกลที่อาจใช้ SSE ภายใน
>
> บทเรียนนี้ได้รับการอัปเดตเพื่อเน้นไปที่ **stdio transport** ซึ่งเป็นวิธีที่แนะนำสำหรับการใช้งานเซิร์ฟเวอร์ MCP ส่วนใหญ่

การขนส่ง stdio ช่วยให้เซิร์ฟเวอร์ MCP สื่อสารกับไคลเอนต์ผ่านสตรีมอินพุตและเอาต์พุตมาตรฐาน เป็นกลไกการขนส่งที่ใช้บ่อยที่สุดและแนะนำตามข้อกำหนด MCP ปัจจุบัน โดยให้วิธีที่ง่ายและมีประสิทธิภาพในการสร้างเซิร์ฟเวอร์ MCP ที่สามารถผนวกกับแอปพลิเคชันไคลเอนต์ต่างๆ ได้อย่างง่ายดาย

## ภาพรวม

บทเรียนนี้ครอบคลุมวิธีสร้างและใช้งาน MCP Servers โดยใช้ stdio transport

## วัตถุประสงค์การเรียนรู้

เมื่อสิ้นสุดบทเรียนนี้ คุณจะสามารถ:

- สร้าง MCP Server โดยใช้ stdio transport
- ดีบัก MCP Server โดยใช้ Inspector
- ใช้งาน MCP Server โดยใช้ Visual Studio Code
- เข้าใจกลไกการขนส่ง MCP ปัจจุบันและเหตุผลที่แนะนำให้ใช้ stdio

## stdio Transport - วิธีการทำงาน

stdio transport เป็นหนึ่งในสองประเภทการขนส่งที่รองรับตามข้อกำหนด MCP ปัจจุบัน (2025-11-25) วิธีการทำงานเป็นดังนี้:

- **การสื่อสารง่ายๆ**: เซิร์ฟเวอร์อ่านข้อความ JSON-RPC จากอินพุตมาตรฐาน (`stdin`) และส่งข้อความไปยังเอาต์พุตมาตรฐาน (`stdout`)
- **กระบวนการแบบ Process-based**: ไคลเอนต์เปิดตัวเซิร์ฟเวอร์ MCP เป็น subprocess
- **รูปแบบข้อความ**: ข้อความเป็นคำขอ แจ้งเตือน หรือการตอบสนอง JSON-RPC แยกด้วยบรรทัดใหม่
- **การบันทึก**: เซิร์ฟเวอร์สามารถเขียนข้อความ UTF-8 ไปยังเอาต์พุตข้อผิดพลาดมาตรฐาน (`stderr`) เพื่อวัตถุประสงค์ในการบันทึกได้

### ข้อกำหนดสำคัญ:
- ข้อความต้องแยกด้วยบรรทัดใหม่และต้องไม่มีบรรทัดใหม่ฝังอยู่ภายในข้อความ
- เซิร์ฟเวอร์ต้องไม่เขียนข้อมูลใดๆ ไปยัง `stdout` ที่ไม่ใช่ข้อความ MCP ที่ถูกต้อง
- ไคลเอนต์ต้องไม่เขียนข้อมูลใดๆ ไปยัง `stdin` ของเซิร์ฟเวอร์ที่ไม่ใช่ข้อความ MCP ที่ถูกต้อง

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

ในโค้ดข้างต้น:

- เรานำเข้า `Server` คลาสและ `StdioServerTransport` จาก MCP SDK
- สร้างอินสแตนซ์เซิร์ฟเวอร์พร้อมการกำหนดค่าและความสามารถพื้นฐาน
- สร้างอินสแตนซ์ `StdioServerTransport` และเชื่อมต่อเซิร์ฟเวอร์เข้ากับมันเพื่อเปิดใช้งานการสื่อสารผ่าน stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# สร้างอินสแตนซ์เซิร์ฟเวอร์
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

ในโค้ดข้างต้น:

- สร้างอินสแตนซ์เซิร์ฟเวอร์โดยใช้ MCP SDK
- กำหนดเครื่องมือโดยใช้ decorator
- ใช้บริบท stdio_server เพื่อจัดการการขนส่ง

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

ความแตกต่างหลักจาก SSE คือ stdio servers:

- ไม่ต้องตั้งค่าเว็บเซิร์ฟเวอร์หรือ HTTP endpoints
- ถูกเปิดเป็น subprocess โดยไคลเอนต์
- สื่อสารผ่านสตรีม stdin/stdout
- ง่ายต่อการติดตั้งและดีบัก

## แบบฝึกหัด: สร้าง stdio Server

เพื่อสร้างเซิร์ฟเวอร์ของเรา มีสองสิ่งที่ต้องจำไว้:

- เราต้องใช้เว็บเซิร์ฟเวอร์เพื่อเปิดเผย endpoints สำหรับการเชื่อมต่อและข้อความ
## ห้องปฏิบัติการ: สร้าง MCP stdio server ง่ายๆ

ในห้องปฏิบัติการนี้ เราจะสร้างเซิร์ฟเวอร์ MCP ง่ายๆ โดยใช้ stdio transport ที่แนะนำ เซิร์ฟเวอร์นี้จะเปิดเผยเครื่องมือที่ไคลเอนต์สามารถเรียกใช้ผ่านโปรโตคอล Model Context มาตรฐาน

### สิ่งที่ต้องเตรียม

- Python 3.8 หรือสูงกว่า
- MCP Python SDK: `pip install mcp`
- ความรู้พื้นฐานเกี่ยวกับโปรแกรมแบบ async

เริ่มด้วยการสร้าง MCP stdio server แรกของเรา:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# กำหนดค่าการบันทึกเหตุการณ์
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# สร้างเซิร์ฟเวอร์
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # ใช้การส่งผ่าน stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## ความแตกต่างหลักจากวิธี SSE ที่เลิกใช้แล้ว

**Stdio Transport (มาตรฐานปัจจุบัน):**
- แบบ subprocess ง่ายๆ - ไคลเอนต์เปิดเซิร์ฟเวอร์เป็นกระบวนการลูก
- สื่อสารผ่าน stdin/stdout โดยใช้ข้อความ JSON-RPC
- ไม่ต้องตั้งค่าเว็บเซิร์ฟเวอร์ HTTP
- ประสิทธิภาพและความปลอดภัยดีขึ้น
- ง่ายต่อการดีบักและพัฒนา

**SSE Transport (เลิกใช้งานตั้งแต่ MCP 2025-06-18):**
- ต้องมีเว็บเซิร์ฟเวอร์และ endpoints SSE
- ตั้งค่าซับซ้อนกว่าโดยมีโครงสร้างเว็บเซิร์ฟเวอร์
- ต้องพิจารณาด้านความปลอดภัยเพิ่มเติมสำหรับ HTTP endpoints
- ถูกแทนที่ด้วย Streamable HTTP สำหรับสถานการณ์เว็บ

### การสร้างเซิร์ฟเวอร์ด้วย stdio transport

เพื่อสร้างเซิร์ฟเวอร์ stdio เราต้อง:

1. **นำเข้าห้องสมุดที่ต้องการ** - ต้องใช้ส่วนประกอบเซิร์ฟเวอร์ MCP และ stdio transport
2. **สร้างอินสแตนซ์เซิร์ฟเวอร์** - กำหนดเซิร์ฟเวอร์และความสามารถ
3. **กำหนดเครื่องมือ** - เพิ่มฟังก์ชันที่ต้องการเผยแพร่
4. **ตั้งค่าการขนส่ง** - กำหนดการสื่อสาร stdio
5. **รันเซิร์ฟเวอร์** - เริ่มเซิร์ฟเวอร์และจัดการข้อความ

มาสร้างทีละขั้นตอน:

### ขั้นตอนที่ 1: สร้างเซิร์ฟเวอร์ stdio พื้นฐาน

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# กำหนดค่าการบันทึก
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# สร้างเซิร์ฟเวอร์
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### ขั้นตอนที่ 2: เพิ่มเครื่องมืออีกหลายตัว

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### ขั้นตอนที่ 3: รันเซิร์ฟเวอร์

บันทึกโค้ดเป็น `server.py` และรันจากบรรทัดคำสั่ง:

```bash
python server.py
```

เซิร์ฟเวอร์จะเริ่มทำงานและรอข้อมูลจาก stdin สื่อสารโดยใช้ข้อความ JSON-RPC ผ่าน stdio transport

### ขั้นตอนที่ 4: ทดสอบด้วย Inspector

คุณสามารถทดสอบเซิร์ฟเวอร์ของคุณโดยใช้ MCP Inspector:

1. ติดตั้ง Inspector: `npx @modelcontextprotocol/inspector`
2. รัน Inspector และชี้ไปยังเซิร์ฟเวอร์ของคุณ
3. ทดสอบเครื่องมือที่คุณสร้าง

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## ดีบักเซิร์ฟเวอร์ stdio ของคุณ

### ใช้ MCP Inspector

MCP Inspector เป็นเครื่องมือสำคัญสำหรับดีบักและทดสอบเซิร์ฟเวอร์ MCP วิธีใช้งานร่วมกับเซิร์ฟเวอร์ stdio คือ:

1. **ติดตั้ง Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **รัน Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **ทดสอบเซิร์ฟเวอร์ของคุณ**: Inspector มีเว็บอินเตอร์เฟสที่คุณสามารถ:
   - ดูความสามารถของเซิร์ฟเวอร์
   - ทดสอบเครื่องมือด้วยพารามิเตอร์ต่างๆ
   - ตรวจสอบข้อความ JSON-RPC
   - ดีบักปัญหาการเชื่อมต่อ

### ใช้ VS Code

คุณยังสามารถดีบักเซิร์ฟเวอร์ MCP โดยตรงใน VS Code ได้:

1. สร้างการตั้งค่าการเริ่มต้นใน `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. ตั้งจุดหยุดโค้ดในเซิร์ฟเวอร์ของคุณ
3. รันดีบักเกอร์และทดสอบด้วย Inspector

### เคล็ดลับดีบักทั่วไป

- ใช้ `stderr` สำหรับบันทึก — อย่าเขียนไปยัง `stdout` เพราะสงวนไว้สำหรับข้อความ MCP
- ตรวจสอบให้แน่ใจว่าข้อความ JSON-RPC ทั้งหมดแยกด้วยบรรทัดใหม่
- ทดสอบกับเครื่องมือเรียบง่ายก่อนเพิ่มฟังก์ชันซับซ้อน
- ใช้ Inspector เพื่อตรวจสอบรูปแบบข้อความ

## การใช้งานเซิร์ฟเวอร์ stdio ของคุณใน VS Code

เมื่อคุณสร้าง MCP stdio server แล้ว คุณสามารถผนวกรวมกับ VS Code เพื่อใช้กับ Claude หรือไคลเอนต์ MCP อื่นๆ ได้

### การกำหนดค่า

1. **สร้างไฟล์กำหนดค่า MCP** ที่ `%APPDATA%\Claude\claude_desktop_config.json` (Windows) หรือ `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **รีสตาร์ท Claude**: ปิดและเปิดใหม่เพื่อโหลดการกำหนดค่าเซิร์ฟเวอร์ใหม่

3. **ทดสอบการเชื่อมต่อ**: เริ่มบทสนทนากับ Claude และลองใช้เครื่องมือเซิร์ฟเวอร์ของคุณ:
   - "ช่วยทักทายฉันโดยใช้เครื่องมือ greeting ได้ไหม?"
   - "คำนวณผลบวกของ 15 กับ 27"
   - "ข้อมูลเซิร์ฟเวอร์คืออะไร?"

### ตัวอย่างเซิร์ฟเวอร์ stdio ด้วย TypeScript

นี่คือตัวอย่าง TypeScript ฉบับสมบูรณ์เพื่อเป็นแนวทาง:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// เพิ่มเครื่องมือ
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### ตัวอย่างเซิร์ฟเวอร์ stdio ด้วย .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## สรุป

ในบทเรียนที่อัปเดตนี้ คุณได้เรียนรู้วิธี:

- สร้าง MCP servers โดยใช้ **stdio transport** ปัจจุบัน (วิธีแนะนำ)
- เข้าใจว่าทำไมการขนส่ง SSE ถูกเลิกใช้และแทนที่ด้วย stdio และ Streamable HTTP
- สร้างเครื่องมือที่ไคลเอนต์ MCP สามารถเรียกใช้
- ดีบักเซิร์ฟเวอร์ของคุณด้วย MCP Inspector
- ผนวกรวมเซิร์ฟเวอร์ stdio ของคุณกับ VS Code และ Claude

stdio transport เป็นวิธีที่ง่ายกว่า ปลอดภัยกว่า และมีประสิทธิภาพมากกว่าในการสร้าง MCP servers เมื่อเทียบกับวิธี SSE ที่เลิกใช้แล้ว จึงเป็นวิธีที่แนะนำสำหรับการใช้งานเซิร์ฟเวอร์ MCP ส่วนใหญ่ตามข้อกำหนด 2025-06-18

### .NET

1. มาสร้างเครื่องมือกันก่อน โดยสร้างไฟล์ *Tools.cs* ที่มีเนื้อหาดังนี้:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## แบบฝึกหัด: ทดสอบเซิร์ฟเวอร์ stdio ของคุณ

เมื่อคุณสร้างเซิร์ฟเวอร์ stdio แล้ว มาทดสอบเพื่อให้แน่ใจว่ามันทำงานถูกต้อง

### สิ่งที่ต้องเตรียม

1. ตรวจสอบว่าคุณติดตั้ง MCP Inspector แล้ว:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. เซฟโค้ดเซิร์ฟเวอร์ของคุณแล้ว (เช่น `server.py`)

### การทดสอบด้วย Inspector

1. **เริ่ม Inspector พร้อมกับเซิร์ฟเวอร์ของคุณ**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **เปิดอินเตอร์เฟสเว็บ**: Inspector จะเปิดเบราว์เซอร์แสดงความสามารถของเซิร์ฟเวอร์คุณ

3. **ทดสอบเครื่องมือ**:
   - ลองใช้เครื่องมือ `get_greeting` ด้วยชื่อที่ต่างกัน
   - ทดสอบเครื่องมือ `calculate_sum` ด้วยตัวเลขต่างๆ
   - เรียกเครื่องมือ `get_server_info` เพื่อดูเมตาดาต้าเซิร์ฟเวอร์

4. **ตรวจสอบการสื่อสาร**: Inspector จะแสดงข้อความ JSON-RPC ที่แลกเปลี่ยนระหว่างไคลเอนต์และเซิร์ฟเวอร์

### สิ่งที่คุณควรเห็น

เมื่อเซิร์ฟเวอร์เริ่มทำงานถูกต้อง คุณควรเห็น:
- ความสามารถของเซิร์ฟเวอร์ที่แสดงใน Inspector
- เครื่องมือพร้อมใช้งานสำหรับทดสอบ
- การแลกเปลี่ยนข้อความ JSON-RPC สำเร็จ
- ผลลัพธ์ของเครื่องมือที่แสดงในอินเตอร์เฟส

### ปัญหาทั่วไปและวิธีแก้ไข

**เซิร์ฟเวอร์ไม่เริ่ม:**
- ตรวจสอบว่าติดตั้ง dependencies ครบ: `pip install mcp`
- ตรวจสอบไวยากรณ์และการเยื้องใน Python
- ดูข้อความผิดพลาดในคอนโซล

**เครื่องมือไม่แสดง:**
- ตรวจสอบว่ามี `@server.tool()` decorator
- แน่ใจว่าเครื่องมือถูกกำหนดก่อน `main()`
- ยืนยันการตั้งค่าเซิร์ฟเวอร์ถูกต้อง

**ปัญหาการเชื่อมต่อ:**
- ตรวจสอบว่าเซิร์ฟเวอร์ใช้ stdio transport ถูกต้อง
- ตรวจสอบว่าไม่มีโปรเซสอื่นรบกวน
- ตรวจสอบคำสั่งรัน Inspector ถูกต้อง

## งานมอบหมาย

ลองสร้างเซิร์ฟเวอร์ของคุณด้วยความสามารถเพิ่มเติม ดูที่ [หน้านี้](https://api.chucknorris.io/) เพื่อเป็นตัวอย่างเช่น เพิ่มเครื่องมือเรียกใช้งาน API คุณตัดสินใจว่าเซิร์ฟเวอร์ควรหน้าตาอย่างไร ขอให้สนุก :)

## คำตอบ

[คำตอบ](./solution/README.md) นี่คือตัวอย่างที่เป็นไปได้พร้อมโค้ดที่ใช้งานได้

## ประเด็นสำคัญที่ควรจดจำ

ประเด็นสำคัญจากบทนี้คือ:

- stdio transport เป็นกลไกที่แนะนำสำหรับ MCP servers ในเครื่อง
- stdio transport อนุญาตการสื่อสารราบรื่นระหว่าง MCP servers และไคลเอนต์ผ่านสตรีมอินพุตและเอาต์พุตมาตรฐาน
- คุณสามารถใช้ทั้ง Inspector และ Visual Studio Code เพื่อใช้งานเซิร์ฟเวอร์ stdio โดยตรง ทำให้การดีบักและผนวกรวมง่ายขึ้น

## ตัวอย่าง

- [เครื่องคิดเลข Java](../samples/java/calculator/README.md)
- [เครื่องคิดเลข .Net](../../../../03-GettingStarted/samples/csharp)
- [เครื่องคิดเลข JavaScript](../samples/javascript/README.md)
- [เครื่องคิดเลข TypeScript](../samples/typescript/README.md)
- [เครื่องคิดเลข Python](../../../../03-GettingStarted/samples/python) 

## แหล่งข้อมูลเพิ่มเติม

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## อะไรต่อไป

## ขั้นตอนถัดไป

เมื่อคุณเรียนรู้วิธีสร้าง MCP servers ด้วย stdio transport แล้ว คุณสามารถสำรวจหัวข้อขั้นสูงเพิ่มเติมได้:

- **ถัดไป**: [HTTP Streaming กับ MCP (Streamable HTTP)](../06-http-streaming/README.md) - เรียนรู้กลไกการขนส่งที่รองรับอีกตัวสำหรับเซิร์ฟเวอร์ระยะไกล
- **ขั้นสูง**: [แนวปฏิบัติความปลอดภัย MCP](../../02-Security/README.md) - นำแนวทางความปลอดภัยมาใช้ในเซิร์ฟเวอร์ MCP ของคุณ
- **การใช้งานจริง**: [กลยุทธ์การปรับใช้](../09-deployment/README.md) - นำเซิร์ฟเวอร์ไปใช้งานในสภาพแวดล้อมจริง

## แหล่งข้อมูลเพิ่มเติม

- [ข้อกำหนด MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - ข้อกำหนดอย่างเป็นทางการ
- [เอกสาร MCP SDK](https://github.com/modelcontextprotocol/sdk) - เอกสารอ้างอิง SDK สำหรับทุกภาษา
- [ตัวอย่างจากชุมชน](../../06-CommunityContributions/README.md) - ตัวอย่างเซิร์ฟเวอร์เพิ่มเติมจากชุมชน

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->