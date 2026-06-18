# Weather MCP Server

นี่คือตัวอย่าง MCP Server ในภาษา Python ที่ใช้งานเครื่องมือตรวจสภาพอากาศพร้อมการตอบกลับแบบจำลอง สามารถใช้เป็นโครงร่างสำหรับ MCP Server ของคุณเอง โดยมีฟีเจอร์ดังต่อไปนี้:

- **เครื่องมือตรวจสภาพอากาศ**: เครื่องมือที่ให้ข้อมูลสภาพอากาศแบบจำลองตามตำแหน่งที่ระบุ
- **เชื่อมต่อกับ Agent Builder**: ฟีเจอร์ที่ช่วยให้คุณเชื่อมต่อ MCP server กับ Agent Builder สำหรับการทดสอบและดีบัก
- **ดีบักใน [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ฟีเจอร์ที่ช่วยให้คุณดีบัก MCP Server โดยใช้ MCP Inspector

## เริ่มต้นด้วยแม่แบบ Weather MCP Server

> **สิ่งที่ต้องมี**
>
> เพื่อรัน MCP Server ในเครื่องพัฒนาโลคัลของคุณ คุณจำเป็นต้องมี:
>
> - [Python](https://www.python.org/)
> - (*ตัวเลือก - หากคุณชอบ uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## เตรียมสภาพแวดล้อม

มีสองวิธีในการตั้งค่าสภาพแวดล้อมสำหรับโปรเจกต์นี้ คุณสามารถเลือกใช้วิธีใดวิธีหนึ่งตามที่ต้องการ

> หมายเหตุ: รีโหลด VSCode หรือเทอร์มินัลเพื่อให้แน่ใจว่าใช้ python จาก virtual environment หลังสร้าง virtual environment เสร็จ

| วิธี | ขั้นตอน |
| -------- | ----- |
| ใช้ `uv` | 1. สร้าง virtual environment: `uv venv` <br>2. ใช้คำสั่งใน VSCode "***Python: Select Interpreter***" และเลือก python จาก virtual environment ที่สร้าง <br>3. ติดตั้ง dependencies (รวมถึง dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| ใช้ `pip` | 1. สร้าง virtual environment: `python -m venv .venv` <br>2. ใช้คำสั่งใน VSCode "***Python: Select Interpreter***" และเลือก python จาก virtual environment ที่สร้าง <br>3. ติดตั้ง dependencies (รวมถึง dev dependencies): `pip install -e .[dev]` | 

หลังตั้งค่าสภาพแวดล้อมเรียบร้อยแล้ว คุณสามารถรันเซิร์ฟเวอร์ในเครื่องพัฒนาโลคัลโดยผ่าน Agent Builder ในฐานะ MCP Client เพื่อเริ่มใช้งาน:
1. เปิดแผง Debug ใน VS Code เลือก `Debug in Agent Builder` หรือกด `F5` เพื่อเริ่มดีบัก MCP server
2. ใช้ Microsoft Foundry Toolkit Agent Builder ทดสอบเซิร์ฟเวอร์ด้วย [คำสั่งนี้](../../../../../../../../../../../open_prompt_builder) เซิร์ฟเวอร์จะเชื่อมต่ออัตโนมัติกับ Agent Builder
3. คลิก `Run` เพื่อทดสอบเซิร์ฟเวอร์ด้วยคำสั่งนั้น

**ขอแสดงความยินดี!** คุณได้รัน Weather MCP Server ในเครื่องพัฒนาโลคัลโดยผ่าน Agent Builder ในฐานะ MCP Client สำเร็จแล้ว
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## สิ่งที่รวมในแม่แบบนี้

| โฟลเดอร์ / ไฟล์| เนื้อหา |
| ------------ | -------------------------------------------- |
| `.vscode`    | ไฟล์ VSCode สำหรับดีบัก                   |
| `.aitk`      | การกำหนดค่าสำหรับ Microsoft Foundry Toolkit                |
| `src`        | โค้ดซอร์สสำหรับ Weather MCP Server   |

## วิธีการดีบัก Weather MCP Server

> หมายเหตุ:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) คือเครื่องมือสำหรับนักพัฒนาที่มีอินเทอร์เฟซสำหรับทดสอบและดีบัก MCP servers
> - โหมดดีบักทุกโหมดรองรับ breakpoints เพื่อที่คุณจะเพิ่ม breakpoint ในโค้ดการใช้งานเครื่องมือได้

| โหมดดีบัก | คำอธิบาย | ขั้นตอนการดีบัก |
| ---------- | ----------- | --------------- |
| Agent Builder | ดีบัก MCP server ใน Agent Builder โดย Microsoft Foundry Toolkit | 1. เปิดแผง Debug ใน VS Code เลือก `Debug in Agent Builder` และกด `F5` เพื่อเริ่มดีบัก MCP server<br>2. ใช้ Microsoft Foundry Toolkit Agent Builder ทดสอบเซิร์ฟเวอร์ด้วย [คำสั่งนี้](../../../../../../../../../../../open_prompt_builder) เซิร์ฟเวอร์จะเชื่อมต่ออัตโนมัติกับ Agent Builder<br>3. คลิก `Run` เพื่อทดสอบเซิร์ฟเวอร์ด้วยคำสั่งนั้น |
| MCP Inspector | ดีบัก MCP server โดยใช้ MCP Inspector | 1. ติดตั้ง [Node.js](https://nodejs.org/)<br> 2. ตั้งค่า Inspector: `cd inspector` && `npm install` <br> 3. เปิดแผง Debug ใน VS Code เลือก `Debug SSE in Inspector (Edge)` หรือ `Debug SSE in Inspector (Chrome)` กด F5 เพื่อเริ่มดีบัก<br> 4. เมื่อ MCP Inspector เปิดในเบราว์เซอร์ ให้คลิกปุ่ม `Connect` เพื่อเชื่อมต่อ MCP server นี้<br> 5. จากนั้นคุณสามารถ `List Tools` เลือกเครื่องมือ, ป้อนพารามิเตอร์ และ `Run Tool` เพื่อดีบักโค้ดเซิร์ฟเวอร์ของคุณได้<br> |

## พอร์ตค่าเริ่มต้นและการปรับแต่ง

| โหมดดีบัก | พอร์ต | คำจำกัดความ | การปรับแต่ง | หมายเหตุ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | แก้ไข [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) เพื่อเปลี่ยนพอร์ตข้างต้น | N/A |
| MCP Inspector | 3001 (Server); 5173 และ 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | แก้ไข [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) เพื่อเปลี่ยนพอร์ตข้างต้น | N/A |

## ข้อเสนอแนะ

หากคุณมีข้อเสนอแนะหรือคำแนะนำสำหรับแม่แบบนี้ กรุณาเปิด issue ใน [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->