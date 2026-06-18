# 🐙 Module 4: การพัฒนา MCP เชิงปฏิบัติ - เซิร์ฟเวอร์โคลน GitHub แบบกำหนดเอง

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ เริ่มต้นอย่างรวดเร็ว:** สร้างเซิร์ฟเวอร์ MCP พร้อมใช้งานจริงที่ช่วยอัตโนมัติการโคลนที่เก็บ GitHub และการรวม VS Code ได้ภายใน 30 นาที!

## 🎯 วัตถุประสงค์การเรียนรู้

เมื่อจบห้องปฏิบัติการนี้ คุณจะสามารถ:

- ✅ สร้างเซิร์ฟเวอร์ MCP กำหนดเองสำหรับเวิร์กโฟลว์การพัฒนาในโลกความจริง
- ✅ นำฟังก์ชันการโคลนที่เก็บ GitHub ผ่าน MCP ไปใช้
- ✅ รวมเซิร์ฟเวอร์ MCP กำหนดเองกับ VS Code และ Agent Builder
- ✅ ใช้โหมด Agent ของ GitHub Copilot กับเครื่องมือ MCP กำหนดเอง
- ✅ ทดสอบและปรับใช้เซิร์ฟเวอร์ MCP กำหนดเองในสภาพแวดล้อมการผลิต

## 📋 ความต้องการเบื้องต้น

- ผ่านห้องปฏิบัติการ 1-3 แล้ว (พื้นฐาน MCP และการพัฒนาขั้นสูง)
- สมัครสมาชิก GitHub Copilot ([สมัครฟรีได้ที่นี่](https://github.com/github-copilot/signup))
- VS Code ที่ติดตั้ง Microsoft Foundry Toolkit และส่วนเสริม GitHub Copilot
- ติดตั้งและตั้งค่า Git CLI แล้ว

## 🏗️ ภาพรวมโครงการ

### **ความท้าทายในการพัฒนาโลกความจริง**
ในฐานะนักพัฒนา เรามักใช้ GitHub เพื่อโคลนที่เก็บและเปิดใน VS Code หรือ VS Code Insiders ขั้นตอนด้วยตนเองนี้ประกอบด้วย:
1. เปิดเทอร์มินัล/คอมมานด์พรอมต์
2. ไปยังไดเรกทอรีที่ต้องการ
3. รันคำสั่ง `git clone`
4. เปิด VS Code ในไดเรกทอรีที่โคลนมา

**โซลูชัน MCP ของเราทำให้ขั้นตอนนี้เหลือเพียงคำสั่งอัจฉริยะเดียว!**

### **สิ่งที่คุณจะสร้าง**
**เซิร์ฟเวอร์ GitHub Clone MCP** (`git_mcp_server`) ซึ่งมีคุณสมบัติดังนี้:

| คุณสมบัติ | คำอธิบาย | ประโยชน์ |
|---------|-------------|---------|
| 🔄 **การโคลนที่เก็บแบบอัจฉริยะ** | โคลนที่เก็บ GitHub พร้อมการตรวจสอบความถูกต้อง | ตรวจสอบข้อผิดพลาดโดยอัตโนมัติ |
| 📁 **การจัดการไดเรกทอรีอย่างชาญฉลาด** | ตรวจสอบและสร้างไดเรกทอรีอย่างปลอดภัย | ป้องกันการเขียนทับข้อมูล |
| 🚀 **การรวม VS Code ข้ามแพลตฟอร์ม** | เปิดโปรเจกต์ใน VS Code/Insiders | ย้ายเวิร์กโฟลว์ได้อย่างราบรื่น |
| 🛡️ **การจัดการข้อผิดพลาดที่แข็งแกร่ง** | จัดการปัญหาเครือข่าย, สิทธิ์ และเส้นทาง | ความน่าเชื่อถือพร้อมใช้งานจริง |

---

## 📖 การดำเนินการทีละขั้นตอน

### ขั้นตอนที่ 1: สร้าง GitHub Agent ใน Agent Builder

1. **เปิด Agent Builder** ผ่านส่วนขยาย Microsoft Foundry Toolkit
2. **สร้าง agent ใหม่** ด้วยการตั้งค่าดังนี้:
   ```
   Agent Name: GitHubAgent
   ```

3. **เริ่มต้นเซิร์ฟเวอร์ MCP กำหนดเอง:**
   - ไปที่ **Tools** → **Add Tool** → **MCP Server**
   - เลือก **"Create A new MCP Server"**
   - เลือก **เทมเพลต Python** เพื่อความยืดหยุ่นสูงสุด
   - **ชื่อเซิร์ฟเวอร์:** `git_mcp_server`

### ขั้นตอนที่ 2: ตั้งค่าโหมด GitHub Copilot Agent

1. **เปิด GitHub Copilot** ใน VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **เลือก Agent Model** ในอินเทอร์เฟซ Copilot
3. **เลือกโมเดล Claude 3.7** เพื่อความสามารถในการวิเคราะห์และเหตุผลที่ดียิ่งขึ้น
4. **เปิดใช้งานการรวม MCP** เพื่อเข้าถึงเครื่องมือ

> **💡 เคล็ดลับมือโปร:** Claude 3.7 มีความเข้าใจเวิร์กโฟลว์การพัฒนาและรูปแบบการจัดการข้อผิดพลาดที่เหนือกว่า

### ขั้นตอนที่ 3: นำฟังก์ชันหลักของ MCP Server ไปใช้งาน

**ใช้คำแนะนำขั้นตอนละเอียดนี้กับโหมด GitHub Copilot Agent:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### ขั้นตอนที่ 4: ทดสอบเซิร์ฟเวอร์ MCP ของคุณ

#### 4a. ทดสอบใน Agent Builder

1. **เปิดการตั้งค่าสำหรับดีบัก** ใน Agent Builder
2. **ตั้งค่า agent ของคุณด้วย system prompt นี้:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **ทดสอบกับสถานการณ์ผู้ใช้จริง:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/th/DebugAgent.81d152370c503241.webp)

**ผลลัพธ์ที่คาดหวัง:**
- ✅ โคลนสำเร็จพร้อมยืนยันเส้นทาง
- ✅ เปิด VS Code อัตโนมัติ
- ✅ แสดงข้อความข้อผิดพลาดที่ชัดเจนสำหรับสถานการณ์ไม่ถูกต้อง
- ✅ จัดการกรณีขอบเขตอย่างเหมาะสม

#### 4b. ทดสอบใน MCP Inspector


![MCP Inspector Testing](../../../../translated_images/th/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 ยินดีด้วย!** คุณได้สร้างเซิร์ฟเวอร์ MCP พร้อมใช้จริงที่แก้ไขปัญหาเวิร์กโฟลว์การพัฒนาในโลกความจริง เซิร์ฟเวอร์โคลน GitHub แบบกำหนดเองของคุณแสดงให้เห็นพลังของ MCP ในการอัตโนมัติและเพิ่มประสิทธิภาพการทำงานของนักพัฒนา

### 🏆 ความสำเร็จที่ได้รับ:
- ✅ **MCP Developer** - สร้างเซิร์ฟเวอร์ MCP กำหนดเอง
- ✅ **Workflow Automator** - ปรับปรุงกระบวนการพัฒนา  
- ✅ **Integration Expert** - เชื่อมต่อเครื่องมือพัฒนาหลายตัว
- ✅ **Production Ready** - สร้างโซลูชันพร้อมใช้งานจริง

---

## 🎓 การจบเวิร์กช็อป: การเดินทางกับ Model Context Protocol

**เรียน ผู้เข้าร่วมเวิร์กช็อป,**

ขอแสดงความยินดีที่จบโมดูลทั้งสี่ของเวิร์กช็อป Model Context Protocol! คุณได้ผ่านจากการเข้าใจพื้นฐาน Microsoft Foundry Toolkit ไปจนถึงการสร้างเซิร์ฟเวอร์ MCP พร้อมใช้จริงที่แก้ไขปัญหาการพัฒนาในโลกความจริง

### 🚀 สรุปเส้นทางการเรียนรู้ของคุณ:

**[Module 1](../lab1/README.md)**: คุณเริ่มต้นด้วยการสำรวจพื้นฐาน Microsoft Foundry Toolkit, การทดสอบโมเดล และการสร้าง AI agent ตัวแรก

**[Module 2](../lab2/README.md)**: คุณได้เรียนรู้สถาปัตยกรรม MCP, การรวม Playwright MCP และสร้าง agent อัตโนมัติการใช้งานเว็บเบราว์เซอร์ตัวแรก

**[Module 3](../lab3/README.md)**: คุณก้าวไปสู่การพัฒนาเซิร์ฟเวอร์ MCP กำหนดเองด้วย Weather MCP server และชำนาญเครื่องมือดีบัก

**[Module 4](../lab4/README.md)**: ตอนนี้คุณได้นำทุกอย่างมาสร้างเครื่องมืออัตโนมัติการทำงานกับที่เก็บ GitHub ที่ใช้งานได้จริง

### 🌟 สิ่งที่คุณเชี่ยวชาญ:

- ✅ **ระบบนิเวศ Microsoft Foundry Toolkit**: โมเดล, agent และรูปแบบการรวม
- ✅ **สถาปัตยกรรม MCP**: ดีไซน์ client-server, โปรโตคอลการส่งข้อมูล และความปลอดภัย
- ✅ **เครื่องมือสำหรับนักพัฒนา**: ตั้งแต่ Playground ถึง Inspector จนถึงการปรับใช้การผลิต
- ✅ **การพัฒนากำหนดเอง**: การสร้าง ทดสอบ และปรับใช้เซิร์ฟเวอร์ MCP ของคุณเอง
- ✅ **การใช้งานเชิงปฏิบัติ**: แก้ไขปัญหาเวิร์กโฟลว์ในโลกความจริงด้วย AI

### 🔮 ก้าวต่อไปของคุณ:

1. **สร้างเซิร์ฟเวอร์ MCP ของคุณเอง**: ใช้ทักษะเหล่านี้เพื่ออัตโนมัติเวิร์กโฟลว์เฉพาะตัวคุณ
2. **เข้าร่วมชุมชน MCP**: แบ่งปันผลงานและเรียนรู้จากผู้อื่น
3. **สำรวจการรวมขั้นสูง**: เชื่อมต่อเซิร์ฟเวอร์ MCP กับระบบองค์กร
4. **มีส่วนร่วมในโอเพ่นซอร์ส**: ช่วยพัฒนาเครื่องมือและเอกสาร MCP

โปรดจำไว้ว่าเวิร์กช็อปนี้เป็นเพียงจุดเริ่มต้น เทคโนโลยี Model Context Protocol กำลังพัฒนาอย่างรวดเร็ว และคุณพร้อมอยู่แถวหน้าของเครื่องมือพัฒนา AI

**ขอขอบคุณสำหรับการเข้าร่วมและความทุ่มเทในการเรียนรู้!**

เราหวังว่าเวิร์กช็อปนี้จะจุดประกายไอเดียที่จะเปลี่ยนแปลงวิถีการสร้างและใช้งานเครื่องมือ AI ในการพัฒนาของคุณ

**ขอให้สนุกกับการเขียนโค้ด!**

---

## ต่อไปคืออะไร

ขอแสดงความยินดีที่ทำห้องปฏิบัติการทั้งหมดใน Module 10 เสร็จแล้ว!

- กลับไปที่: [ภาพรวม Module 10](../README.md)
- ไปต่อที่: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->