# Weather MCP Server

นี่คือตัวอย่าง MCP Server ที่เขียนด้วย Python ซึ่งใช้งานเครื่องมือสภาพอากาศพร้อมกับการตอบกลับแบบจำลอง สามารถใช้เป็นโครงร่างสำหรับ MCP Server ของคุณเองได้ โดยรวมฟีเจอร์ดังนี้:

- **Weather Tool**: เครื่องมือที่ให้ข้อมูลสภาพอากาศจำลองตามตำแหน่งที่ระบุ
- **เชื่อมต่อกับ Agent Builder**: ฟีเจอร์ที่ช่วยให้คุณเชื่อมต่อ MCP Server กับ Agent Builder เพื่อทดสอบและดีบัก
- **ดีบักใน [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ฟีเจอร์ที่ช่วยให้คุณดีบัก MCP Server โดยใช้ MCP Inspector

## เริ่มต้นกับ Weather MCP Server template

> **สิ่งที่ต้องเตรียม**
>
> ในการรัน MCP Server บนเครื่องพัฒนาท้องถิ่นของคุณ คุณจะต้องมี:
>
> - [Python](https://www.python.org/)
> - (*ไม่บังคับ - ถ้าคุณชอบ uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## เตรียมสภาพแวดล้อม

มีสองวิธีการตั้งค่าสภาพแวดล้อมสำหรับโปรเจกต์นี้ คุณสามารถเลือกใช้อย่างใดอย่างหนึ่งตามความชอบของคุณ

> หมายเหตุ: โหลด VSCode หรือเทอร์มินัลใหม่เพื่อให้แน่ใจว่าใช้ python ของสภาพแวดล้อมเสมือนหลังจากสร้างเสร็จแล้ว

| วิธี | ขั้นตอน |
| -------- | ----- |
| ใช้ `uv` | 1. สร้างสภาพแวดล้อมเสมือน: `uv venv` <br>2. รันคำสั่ง VSCode "***Python: Select Interpreter***" และเลือก python จากสภาพแวดล้อมเสมือนที่สร้างขึ้น<br>3. ติดตั้ง dependencies (รวมถึง dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| ใช้ `pip` | 1. สร้างสภาพแวดล้อมเสมือน: `python -m venv .venv` <br>2. รันคำสั่ง VSCode "***Python: Select Interpreter***" และเลือก python จากสภาพแวดล้อมเสมือนที่สร้างขึ้น<br>3. ติดตั้ง dependencies (รวมถึง dev dependencies): `pip install -e .[dev]` |

หลังจากตั้งค่าสภาพแวดล้อมเสร็จแล้ว คุณสามารถรันเซิร์ฟเวอร์บนเครื่องพัฒนาท้องถิ่นของคุณผ่าน Agent Builder ในฐานะ MCP Client เพื่อเริ่มต้นได้:
1. เปิดแผง Debug ของ VS Code เลือก `Debug in Agent Builder` หรือกด `F5` เพื่อเริ่มดีบัก MCP Server
2. ใช้ AI Toolkit Agent Builder เพื่อทดสอบเซิร์ฟเวอร์ด้วย [พรอมต์นี้](../../../../../../../../../../../open_prompt_builder) เซิร์ฟเวอร์จะเชื่อมต่อกับ Agent Builder โดยอัตโนมัติ
3. คลิก `Run` เพื่อทดสอบเซิร์ฟเวอร์ด้วยพรอมต์นั้น

**ยินดีด้วย**! คุณได้รัน Weather MCP Server บนเครื่องพัฒนาท้องถิ่นของคุณผ่าน Agent Builder ในฐานะ MCP Client สำเร็จแล้ว  
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## สิ่งที่รวมมาในเทมเพลตนี้

| โฟลเดอร์ / ไฟล์ | เนื้อหา                                   |
| ------------ | -------------------------------------------- |
| `.vscode`    | ไฟล์สำหรับดีบักใน VSCode                     |
| `.aitk`      | การตั้งค่าสำหรับ AI Toolkit                  |
| `src`        | โค้ดต้นฉบับสำหรับ weather mcp server        |

## วิธีดีบัก Weather MCP Server

> หมายเหตุ:  
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) คือเครื่องมือสำหรับนักพัฒนาที่ใช้ทดสอบและดีบัก MCP servers แบบเห็นภาพ  
> - โหมดดีบักทั้งหมดรองรับ breakpoints ดังนั้นคุณสามารถเพิ่ม breakpoints ในโค้ดส่วน implement เครื่องมือได้

| โหมดดีบัก | คำอธิบาย | ขั้นตอนสำหรับดีบัก |
| ---------- | ----------- | --------------- |
| Agent Builder | ดีบัก MCP server ใน Agent Builder ผ่าน AI Toolkit | 1. เปิดแผง Debug ของ VS Code เลือก `Debug in Agent Builder` และกด `F5` เพื่อเริ่มดีบัก MCP server<br>2. ใช้ AI Toolkit Agent Builder ทดสอบเซิร์ฟเวอร์ด้วย [พรอมต์นี้](../../../../../../../../../../../open_prompt_builder) เซิร์ฟเวอร์จะเชื่อมต่อกับ Agent Builder อัตโนมัติ<br>3. คลิก `Run` เพื่อทดสอบเซิร์ฟเวอร์ด้วยพรอมต์ |
| MCP Inspector | ดีบัก MCP server โดยใช้ MCP Inspector | 1. ติดตั้ง [Node.js](https://nodejs.org/)<br>2. ตั้งค่า Inspector: `cd inspector` && `npm install` <br>3. เปิดแผง Debug ของ VS Code เลือก `Debug SSE in Inspector (Edge)` หรือ `Debug SSE in Inspector (Chrome)` กด F5 เพื่อเริ่มดีบัก<br>4. เมื่อ MCP Inspector เปิดในเบราว์เซอร์ ให้คลิกปุ่ม `Connect` เพื่อเชื่อมต่อ MCP server นี้<br>5. จากนั้นคุณสามารถ `List Tools` เลือกเครื่องมือ ป้อนพารามิเตอร์ และ `Run Tool` เพื่อดีบักโค้ดเซิร์ฟเวอร์ได้<br> |

## พอร์ตเริ่มต้นและการปรับแต่ง

| โหมดดีบัก | พอร์ต | ไฟล์กำหนด | การปรับแต่ง | หมายเหตุ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | แก้ไข [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) เพื่อเปลี่ยนพอร์ตข้างต้น | ไม่มี |
| MCP Inspector | 3001 (Server); 5173 และ 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | แก้ไข [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) เพื่อเปลี่ยนพอร์ตข้างต้น | ไม่มี |

## ข้อเสนอแนะ

ถ้าคุณมีข้อเสนอแนะหรือความคิดเห็นสำหรับเทมเพลตนี้ กรุณาเปิด Issue ใน [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ข้อจำกัดความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) แม้ว่าเราจะพยายามให้ความถูกต้อง โปรดทราบว่าการแปลอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาดั้งเดิมควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ ขอแนะนำให้ใช้บริการแปลโดยนักแปลมืออาชีพ ทางเราจะไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความผิดใดๆ ที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->