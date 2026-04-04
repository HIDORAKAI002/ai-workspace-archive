# Weather MCP Server

นี่คือตัวอย่าง MCP Server ในภาษา Python ที่ใช้งานเครื่องมือสภาพอากาศพร้อมการตอบกลับจำลอง สามารถใช้เป็นโครงร่างสำหรับ MCP Server ของคุณเอง ฟีเจอร์ที่รวมอยู่มีดังนี้:

- **Weather Tool**: เครื่องมือที่ให้ข้อมูลสภาพอากาศจำลองตามสถานที่ที่กำหนด
- **Git Clone Tool**: เครื่องมือที่โคลนรีโพสิตอรี git ไปยังโฟลเดอร์ที่ระบุ
- **VS Code Open Tool**: เครื่องมือที่เปิดโฟลเดอร์ใน VS Code หรือ VS Code Insiders
- **เชื่อมต่อกับ Agent Builder**: ฟีเจอร์ที่อนุญาตให้เชื่อมต่อ MCP server กับ Agent Builder เพื่อทดสอบและแก้จุดบกพร่อง
- **Debug ใน [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ฟีเจอร์ที่อนุญาตให้ดีบัก MCP Server โดยใช้ MCP Inspector

## เริ่มต้นใช้งาน Weather MCP Server เทมเพลต

> **สิ่งที่ต้องเตรียม**
>
> เพื่อรัน MCP Server บนเครื่องพัฒนาของคุณ คุณจะต้องมี:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (จำเป็นสำหรับเครื่องมือ git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) หรือ [VS Code Insiders](https://code.visualstudio.com/insiders/) (จำเป็นสำหรับเครื่องมือ open_in_vscode)
> - (*ไม่บังคับ - หากคุณชอบใช้ uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## เตรียมสภาพแวดล้อม

มีสองวิธีในการตั้งค่าสภาพแวดล้อมสำหรับโปรเจกต์นี้ คุณสามารถเลือกทำตามวิธีใดก็ได้ตามความสะดวกของคุณ

> หมายเหตุ: รีโหลด VSCode หรือเทอร์มินัลเพื่อให้แน่ใจว่ามีการใช้ python จาก virtual environment หลังจากสร้าง virtual environment แล้ว

| วิธี | ขั้นตอน |
| -------- | ----- |
| ใช้ `uv` | 1. สร้าง virtual environment: `uv venv` <br>2. รันคำสั่งใน VSCode "***Python: Select Interpreter***" และเลือก python จาก virtual environment ที่สร้าง <br>3. ติดตั้ง dependencies (รวมถึง dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| ใช้ `pip` | 1. สร้าง virtual environment: `python -m venv .venv` <br>2. รันคำสั่งใน VSCode "***Python: Select Interpreter***" และเลือก python จาก virtual environment ที่สร้าง<br>3. ติดตั้ง dependencies (รวมถึง dev dependencies): `pip install -e .[dev]` |

หลังจากตั้งค่าสภาพแวดล้อมเสร็จแล้ว คุณสามารถรันเซิร์ฟเวอร์บนเครื่องพัฒนาของคุณผ่าน Agent Builder ในฐานะ MCP Client เพื่อเริ่มต้นดังนี้:
1. เปิดแผง Debug ของ VS Code เลือก `Debug in Agent Builder` หรือกด `F5` เพื่อเริ่มดีบัก MCP server
2. ใช้ AI Toolkit Agent Builder เพื่อทดสอบเซิร์ฟเวอร์ด้วย [พรอมต์นี้](../../../../../../../../../../../open_prompt_builder) เซิร์ฟเวอร์จะเชื่อมต่อกับ Agent Builder โดยอัตโนมัติ
3. คลิก `Run` เพื่อทดสอบเซิร์ฟเวอร์ด้วยพรอมต์

**ยินดีด้วย!** คุณได้รัน Weather MCP Server บนเครื่องพัฒนาของคุณผ่าน Agent Builder ในฐานะ MCP Client สำเร็จแล้ว  
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## สิ่งที่รวมอยู่ในเทมเพลต

| โฟลเดอร์ / ไฟล์ | เนื้อหา                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | ไฟล์ VSCode สำหรับดีบัก                     |
| `.aitk`      | การตั้งค่าต่าง ๆ สำหรับ AI Toolkit             |
| `src`        | ซอร์สโค้ดสำหรับ weather mcp server           |

## วิธีดีบัก Weather MCP Server

> หมายเหตุ:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) เป็นเครื่องมือสำหรับนักพัฒนาที่มีอินเทอร์เฟซกราฟิกสำหรับทดสอบและดีบัก MCP servers
> - โหมดดีบักทุกโหมดสนับสนุนจุดพัก (breakpoints) คุณสามารถเพิ่มจุดพักในโค้ดสำหรับเครื่องมือได้

## เครื่องมือที่มีอยู่

### Weather Tool
เครื่องมือ `get_weather` ให้ข้อมูลสภาพอากาศจำลองสำหรับสถานที่ที่ระบุ

| พารามิเตอร์ | ประเภท | คำอธิบาย |
| --------- | ---- | ----------- |
| `location` | string | สถานที่ต้องการสอบถามสภาพอากาศ (เช่น ชื่อเมือง รัฐ หรือพิกัด) |

### Git Clone Tool
เครื่องมือ `git_clone_repo` โคลนรีโพสิตอรี git ไปยังโฟลเดอร์ที่ระบุ

| พารามิเตอร์ | ประเภท | คำอธิบาย |
| --------- | ---- | ----------- |
| `repo_url` | string | URL ของรีโพสิตอรี git ที่ต้องการโคลน |
| `target_folder` | string | เส้นทางของโฟลเดอร์ที่ต้องการเก็บรีโพสิตอรีโคลน |

เครื่องมือจะคืนค่า JSON ที่ประกอบด้วย:
- `success`: Boolean ระบุว่าการดำเนินการสำเร็จหรือไม่
- `target_folder` หรือ `error`: เส้นทางของรีโพสิตอรีที่โคลนแล้ว หรือข้อความแสดงข้อผิดพลาด

### VS Code Open Tool
เครื่องมือ `open_in_vscode` เปิดโฟลเดอร์ในแอป VS Code หรือ VS Code Insiders

| พารามิเตอร์ | ประเภท | คำอธิบาย |
| --------- | ---- | ----------- |
| `folder_path` | string | เส้นทางของโฟลเดอร์ที่ต้องการเปิด |
| `use_insiders` | boolean (ไม่บังคับ) | ใช้งาน VS Code Insiders แทน VS Code ปกติหรือไม่ |

เครื่องมือจะคืนค่า JSON ที่ประกอบด้วย:
- `success`: Boolean ระบุว่าการดำเนินการสำเร็จหรือไม่
- `message` หรือ `error`: ข้อความยืนยันหรือข้อความแสดงข้อผิดพลาด

| โหมดดีบัก | คำอธิบาย | ขั้นตอนการดีบัก |
| ---------- | ----------- | --------------- |
| Agent Builder | ดีบัก MCP server ใน Agent Builder ผ่าน AI Toolkit | 1. เปิดแผง Debug ของ VS Code เลือก `Debug in Agent Builder` และกด `F5` เพื่อเริ่มดีบัก MCP server<br>2. ใช้ AI Toolkit Agent Builder ทดสอบเซิร์ฟเวอร์ด้วย [พรอมต์นี้](../../../../../../../../../../../open_prompt_builder) เซิร์ฟเวอร์จะเชื่อมต่อกับ Agent Builder โดยอัตโนมัติ<br>3. คลิก `Run` เพื่อทดสอบเซิร์ฟเวอร์ด้วยพรอมต์ |
| MCP Inspector | ดีบัก MCP server โดยใช้ MCP Inspector | 1. ติดตั้ง [Node.js](https://nodejs.org/)<br> 2. ตั้งค่า Inspector: `cd inspector` && `npm install` <br> 3. เปิดแผง Debug ของ VS Code เลือก `Debug SSE in Inspector (Edge)` หรือ `Debug SSE in Inspector (Chrome)` และกด F5 เพื่อเริ่มดีบัก<br> 4. เมื่อ MCP Inspector เปิดในเบราว์เซอร์ คลิกปุ่ม `Connect` เพื่อเชื่อมต่อ MCP server นี้<br> 5. จากนั้นคุณสามารถ `List Tools` เลือกเครื่องมือ ป้อนพารามิเตอร์ และ `Run Tool` เพื่อดีบักโค้ดเซิร์ฟเวอร์ของคุณ<br> |

## พอร์ตเริ่มต้นและการปรับแต่ง

| โหมดดีบัก | พอร์ต | คำอธิบาย | การปรับแต่ง | หมายเหตุ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | แก้ไข [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) เพื่อเปลี่ยนพอร์ตข้างต้น | ไม่มี |
| MCP Inspector | 3001 (Server); 5173 และ 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | แก้ไข [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) เพื่อเปลี่ยนพอร์ตข้างต้น| ไม่มี |

## ข้อเสนอแนะ

หากคุณมีข้อเสนอแนะหรือความคิดเห็นเกี่ยวกับเทมเพลตนี้ กรุณาเปิด issue ใน [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**คำปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษาอัตโนมัติ [Co-op Translator](https://github.com/Azure/co-op-translator) แม้เราจะพยายามให้ความถูกต้องสูงสุด โปรดทราบว่าการแปลอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่แม่นยำ เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลหลัก สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่มีความรับผิดชอบต่อความเข้าใจผิดหรือการตีความผิดใด ๆ ที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->