# 🚀 โมดูล 1: พื้นฐาน Microsoft Foundry Toolkit

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 วัตถุประสงค์การเรียนรู้

เมื่อจบโมดูลนี้ คุณจะสามารถ:
- ✅ ติดตั้งและกำหนดค่า Microsoft Foundry Toolkit Extension สำหรับ VS Code
- ✅ นำทางใน Model Catalog และเข้าใจแหล่งที่มาของโมเดลต่าง ๆ
- ✅ ใช้ Playground สำหรับการทดสอบและทดลองโมเดล
- ✅ สร้างเอเจนต์ AI แบบกำหนดเองโดยใช้ Agent Builder
- ✅ เปรียบเทียบประสิทธิภาพของโมเดลจากผู้ให้บริการต่าง ๆ
- ✅ ใช้แนวทางปฏิบัติที่ดีที่สุดสำหรับการออกแบบ prompt

## 🧠 แนะนำ Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit Extension สำหรับ VS Code** คือส่วนขยายหลักของ Microsoft ที่เปลี่ยน VS Code ให้เป็นสภาพแวดล้อมการพัฒนา AI แบบครบวงจร มันเชื่อมช่องว่างระหว่างการวิจัย AI กับการพัฒนาแอปพลิเคชันจริง ทำให้ AI สร้างสรรค์เป็นสิ่งที่นักพัฒนาทุกระดับความสามารถสามารถเข้าถึงได้

### 🌟 ความสามารถหลัก

| ฟีเจอร์ | คำอธิบาย | กรณีการใช้งาน |
|---------|-------------|----------|
| **🗂️ Model Catalog** | เข้าถึงโมเดลกว่า 100 รายการจาก GitHub, ONNX, OpenAI, Anthropic, Google | ค้นหาและเลือกโมเดล |
| **🔌 BYOM Support** | รวมโมเดลของคุณเอง (แบบโลคัล/ระยะไกล) | ปรับใช้โมเดลแบบกำหนดเอง |
| **🎮 Interactive Playground** | ทดสอบโมเดลแบบเรียลไทม์ผ่านแชทอินเทอร์เฟซ | สร้างต้นแบบและทดสอบอย่างรวดเร็ว |
| **📎 Multi-Modal Support** | รองรับข้อความ, ภาพ, และไฟล์แนบ | แอปพลิเคชัน AI ที่ซับซ้อน |
| **⚡ Batch Processing** | รันหลาย prompt พร้อมกัน | เวิร์กโฟลว์ทดสอบที่มีประสิทธิภาพ |
| **📊 Model Evaluation** | เมตริกในตัว (F1, ความเกี่ยวข้อง, ความคล้ายคลึง, ความสมเหตุสมผล) | ประเมินประสิทธิภาพ |

### 🎯 ทำไม Microsoft Foundry Toolkit ถึงสำคัญ

- **🚀 เร่งการพัฒนา**: จากไอเดียสู่ต้นแบบในไม่กี่นาที
- **🔄 เวิร์กโฟลว์แบบรวมศูนย์**: อินเทอร์เฟซเดียวสำหรับผู้ให้บริการ AI หลายราย
- **🧪 ทดลองง่าย**: เปรียบเทียบโมเดลโดยไม่ต้องตั้งค่าซับซ้อน
- **📈 พร้อมสำหรับการใช้งานจริง**: ย้ายจากต้นแบบสู่การใช้งานจริงอย่างราบรื่น

## 🛠️ เงื่อนไขเบื้องต้น & การตั้งค่า

### 📦 ติดตั้ง Microsoft Foundry Toolkit Extension

**ขั้นตอนที่ 1: เข้า Marketplace ของส่วนขยาย**
1. เปิด Visual Studio Code
2. ไปที่มุมมอง Extensions (`Ctrl+Shift+X` หรือ `Cmd+Shift+X`)
3. ค้นหา "Microsoft Foundry Toolkit"

**ขั้นตอนที่ 2: เลือกเวอร์ชันของคุณ**
- **🟢 Release**: แนะนำสำหรับใช้งานจริง
- **🔶 Pre-release**: เข้าถึงฟีเจอร์ใหม่ก่อนใคร

**ขั้นตอนที่ 3: ติดตั้งและเปิดใช้งาน**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/th/aitkext.d28945a03eed003c.webp)

### ✅ เช็คลิสต์การยืนยัน
- [ ] ไอคอน Microsoft Foundry Toolkit ปรากฏในแถบด้านข้างของ VS Code
- [ ] ส่วนขยายถูกเปิดใช้งานและทำงานแล้ว
- [ ] ไม่มีข้อผิดพลาดในการติดตั้งในแผงผลลัพธ์

## 🧪 การฝึกปฏิบัติที่ 1: สำรวจโมเดล GitHub

**🎯 วัตถุประสงค์**: คุ้นเคยกับ Model Catalog และทดสอบโมเดล AI ตัวแรกของคุณ

### 📊 ขั้นตอนที่ 1: นำทางใน Model Catalog

Model Catalog คือประตูสู่ระบบนิเวศ AI ของคุณ มันรวบรวมโมเดลจากผู้ให้บริการหลายราย ทำให้ง่ายต่อการค้นหาและเปรียบเทียบตัวเลือก

**🔍 คู่มือนำทาง:**

คลิกที่ **MODELS - Catalog** ในแถบด้านข้างของ Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/th/aimodel.263ed2be013d8fb0.webp)

**💡 เคล็ดลับ**: มองหาโมเดลที่มีความสามารถเฉพาะซึ่งสอดคล้องกับกรณีการใช้งานของคุณ (เช่น การสร้างโค้ด, การเขียนเชิงสร้างสรรค์, การวิเคราะห์)

**⚠️ หมายเหตุ**: โมเดลที่โฮสต์บน GitHub (GitHub Models) ใช้งานได้ฟรีแต่มีข้อจำกัดเรื่องอัตราการร้องขอและโทเค็น หากคุณต้องการเข้าถึงโมเดลที่ไม่ใช่ GitHub (เช่น โมเดลภายนอกจาก Azure AI หรือจุดสิ้นสุดอื่น ๆ) คุณต้องเตรียมคีย์ API หรือการยืนยันตัวตนที่เหมาะสม

### 🚀 ขั้นตอนที่ 2: เพิ่มและกำหนดค่าโมเดลตัวแรกของคุณ

**กลยุทธ์การเลือกโมเดล:**
- **GPT-4.1**: ดีที่สุดสำหรับการวิเคราะห์และการให้เหตุผลที่ซับซ้อน
- **Phi-4-mini**: น้ำหนักเบา ตอบสนองรวดเร็วสำหรับงานง่าย ๆ

**🔧 ขั้นตอนการกำหนดค่า:**
1. เลือก **OpenAI GPT-4.1** จากแค็ตตาล็อก
2. คลิก **Add to My Models** – เพื่อบันทึกโมเดลสำหรับใช้งาน
3. เลือก **Try in Playground** เพื่อเปิดสภาพแวดล้อมทดสอบ
4. รอการเริ่มต้นโมเดล (ครั้งแรกอาจใช้เวลาสักครู่)

![Playground Setup](../../../../translated_images/th/playground.dd6f5141344878ca.webp)

**⚙️ ทำความเข้าใจพารามิเตอร์โมเดล:**
- **Temperature**: ควบคุมความสร้างสรรค์ (0 = กำหนดแน่นอน, 1 = สร้างสรรค์)
- **Max Tokens**: ความยาวตอบกลับสูงสุด
- **Top-p**: การสุ่มแบบนิวเคลียสเพื่อความหลากหลายในการตอบกลับ

### 🎯 ขั้นตอนที่ 3: ควบคุมอินเทอร์เฟซ Playground

Playground คือห้องทดลองทดลอง AI ของคุณ นี่คือวิธีใช้ประโยชน์สูงสุด:

**🎨 แนวปฏิบัติที่ดีที่สุดสำหรับการออกแบบ prompt:**
1. **ระบุให้ชัดเจน**: คำสั่งที่ชัดเจนและละเอียดให้ผลลัพธ์ที่ดีกว่า
2. **ให้บริบท**: รวมข้อมูลเบื้องหลังที่เกี่ยวข้อง
3. **ใช้ตัวอย่าง**: แสดงตัวอย่างให้โมเดลเข้าใจสิ่งที่คุณต้องการ
4. **ปรับปรุง**: ปรับแต่ง prompt ตามผลลัพธ์ที่ได้รับ

**🧪 สถานการณ์ทดสอบ:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/th/result.1dfcf211fb359cf6.webp)

### 🏆 การฝึกท้าทาย: เปรียบเทียบประสิทธิภาพโมเดล

**🎯 เป้าหมาย**: เปรียบเทียบโมเดลต่าง ๆ โดยใช้ prompt เดียวกันเพื่อเข้าใจจุดแข็งของแต่ละโมเดล

**📋 คำแนะนำ:**
1. เพิ่ม **Phi-4-mini** ลงในพื้นที่ทำงานของคุณ
2. ใช้ prompt เดียวกันกับ GPT-4.1 และ Phi-4-mini

![set](../../../../translated_images/th/set.88132df189ecde2c.webp)

3. เปรียบเทียบคุณภาพ ความเร็ว และความแม่นยำของคำตอบ
4. จดบันทึกผลการเปรียบเทียบในส่วนผลลัพธ์

![Model Comparison](../../../../translated_images/th/compare.97746cd0f9074955.webp)

**💡 ข้อค้นพบสำคัญที่ควรรู้:**
- เวลาใช้งาน LLM กับ SLM
- การแลกเปลี่ยนระหว่างต้นทุนและประสิทธิภาพ
- ความสามารถเฉพาะตัวของโมเดลแต่ละรุ่น

## 🤖 การฝึกปฏิบัติที่ 2: สร้างเอเจนต์แบบกำหนดเองด้วย Agent Builder

**🎯 วัตถุประสงค์**: สร้างเอเจนต์ AI เฉพาะทางที่เหมาะกับงานและเวิร์กโฟลว์เฉพาะ

### 🏗️ ขั้นตอนที่ 1: ทำความเข้าใจ Agent Builder

Agent Builder คือที่ที่ Microsoft Foundry Toolkit โดดเด่น มันช่วยให้คุณสร้างผู้ช่วย AI ที่ออกแบบมาเฉพาะ โดยรวมพลังของโมเดลภาษาขนาดใหญ่กับคำสั่งเฉพาะ พารามิเตอร์เฉพาะ และความรู้ที่เจาะจง

**🧠 ส่วนประกอบสถาปัตยกรรมของเอเจนต์:**
- **โมเดลหลัก**: LLM พื้นฐาน (GPT-4, Groks, Phi ฯลฯ)
- **System Prompt**: กำหนดบุคลิกภาพและพฤติกรรมของเอเจนต์
- **พารามิเตอร์**: การตั้งค่าปรับแต่งสำหรับประสิทธิภาพสูงสุด
- **การเชื่อมต่อเครื่องมือ**: รวมกับ API ภายนอกและบริการ MCP
- **หน่วยความจำ**: เก็บบริบทการสนทนาและความต่อเนื่องของเซสชัน

![Agent Builder Interface](../../../../translated_images/th/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ ขั้นตอนที่ 2: เจาะลึกการกำหนดค่าเอเจนต์

**🎨 การสร้าง System Prompt ที่มีประสิทธิภาพ:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*แน่นอนว่าคุณยังสามารถใช้ Generate System Prompt เพื่อให้ AI ช่วยสร้างและเพิ่มประสิทธิภาพ prompt ได้*

**🔧 การปรับพารามิเตอร์ให้เหมาะสม:**
| พารามิเตอร์ | ช่วงที่แนะนำ | กรณีใช้งาน |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | คำตอบเชิงเทคนิค/ข้อเท็จจริง |
| **Temperature** | 0.7-0.9 | งานสร้างสรรค์/ระดมสมอง |
| **Max Tokens** | 500-1000 | คำตอบที่กระชับ |
| **Max Tokens** | 2000-4000 | คำอธิบายละเอียด |

### 🐍 ขั้นตอนที่ 3: การฝึกปฏิบัติจริง - เอเจนต์โปรแกรมมิ่ง Python

**🎯 ภารกิจ**: สร้างผู้ช่วยเขียนโค้ด Python เฉพาะทาง

**📋 ขั้นตอนการกำหนดค่า:**

1. **เลือกโมเดล**: เลือก **Claude 3.5 Sonnet** (ดีเยี่ยมสำหรับโค้ด)

2. **ออกแบบ System Prompt**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **การกำหนดค่าพารามิเตอร์**:
   - Temperature: 0.2 (สำหรับโค้ดที่สม่ำเสมอและน่าเชื่อถือ)
   - Max Tokens: 2000 (คำอธิบายละเอียด)
   - Top-p: 0.9 (สมดุลความสร้างสรรค์)

![Python Agent Configuration](../../../../translated_images/th/pythonagent.5e51b406401c165f.webp)

### 🧪 ขั้นตอนที่ 4: ทดสอบเอเจนต์ Python ของคุณ

**สถานการณ์ทดสอบ:**
1. **ฟังก์ชันพื้นฐาน**: "สร้างฟังก์ชันเพื่อค้นหาจำนวนนิพจน์"
2. **อัลกอริทึมซับซ้อน**: "สร้างต้นไม้ค้นหาแบบไบนารี พร้อมเมธอด insert, delete และ search"
3. **ปัญหาในโลกจริง**: "สร้างเว็บสแครปเปอร์ที่จัดการข้อจำกัดอัตราการเรียกและการลองใหม่"
4. **ดีบัก**: "แก้ไขโค้ดนี้ [วางโค้ดที่มีข้อผิดพลาด]"

**🏆 เกณฑ์ความสำเร็จ:**
- ✅ โค้ดทำงานโดยไม่มีข้อผิดพลาด
- ✅ มีเอกสารประกอบอย่างเหมาะสม
- ✅ ปฏิบัติตามแนวทางปฏิบัติที่ดีของ Python
- ✅ ให้คำอธิบายที่ชัดเจน
- ✅ แนะนำการปรับปรุง

## 🎓 สรุปโมดูล 1 & ขั้นตอนต่อไป

### 📊 ตรวจสอบความรู้

ทดสอบความเข้าใจของคุณ:
- [ ] คุณอธิบายความแตกต่างระหว่างโมเดลในแค็ตตาล็อกได้หรือไม่?
- [ ] คุณสร้างและทดสอบเอเจนต์แบบกำหนดเองสำเร็จหรือไม่?
- [ ] คุณเข้าใจวิธีปรับพารามิเตอร์ให้เหมาะสมกับกรณีใช้งานต่าง ๆ หรือไม่?
- [ ] คุณสามารถออกแบบ system prompt ที่มีประสิทธิภาพได้หรือไม่?

### 📚 แหล่งข้อมูลเพิ่มเติม

- **เอกสาร Microsoft Foundry Toolkit**: [Official Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **คู่มือการออกแบบ Prompt**: [Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- **โมเดลใน Microsoft Foundry Toolkit**: [Models in Develpment](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 ยินดีด้วย!** คุณได้เรียนรู้พื้นฐานของ Microsoft Foundry Toolkit อย่างชำนาญและพร้อมที่จะสร้างแอปพลิเคชัน AI ที่ซับซ้อนมากขึ้น!

### 🔜 ไปต่อที่โมดูลถัดไป

พร้อมสำหรับความสามารถขั้นสูงหรือยัง? ไปต่อที่ **[โมดูล 2: MCP กับพื้นฐาน Microsoft Foundry Toolkit](../lab2/README.md)** ที่คุณจะได้เรียนรู้วิธี:
- เชื่อมต่อเอเจนต์ของคุณกับเครื่องมือภายนอกผ่าน Model Context Protocol (MCP)
- สร้างเอเจนต์อัตโนมัติบนบราวเซอร์ด้วย Playwright
- รวม MCP server กับเอเจนต์ Microsoft Foundry Toolkit ของคุณ
- เพิ่มพลังให้เอเจนต์ของคุณด้วยข้อมูลและความสามารถภายนอก

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->