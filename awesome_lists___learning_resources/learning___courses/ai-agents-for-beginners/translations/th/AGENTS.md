# AGENTS.md

## ภาพรวมโครงการ

ที่เก็บนี้ประกอบด้วย "AI Agents สำหรับผู้เริ่มต้น" - หลักสูตรการศึกษาครอบคลุมที่สอนทุกอย่างที่จำเป็นในการสร้าง AI Agents หลักสูตรประกอบด้วย 18 บทเรียน (หมายเลข 00-18) ครอบคลุมพื้นฐาน รูปแบบการออกแบบ เฟรมเวิร์ก การใช้งานในผลิตภัณฑ์ เอเจนต์ที่รันในเครื่อง/บนอุปกรณ์ และความปลอดภัยของ AI agents

**เทคโนโลยีหลัก:**
- Python 3.12+
- Jupyter Notebooks สำหรับการเรียนรู้อย่างโต้ตอบ
- เฟรมเวิร์ก AI: Microsoft Agent Framework (MAF)
- บริการ Azure AI: Microsoft Foundry, Microsoft Foundry Agent Service V2

**สถาปัตยกรรม:**
- โครงสร้างตามบทเรียน (ไดเรกทอรี 00-15+)
- แต่ละบทเรียนประกอบด้วย: เอกสาร README, ตัวอย่างโค้ด (Jupyter notebooks), และภาพประกอบ
- รองรับหลายภาษาโดยระบบแปลอัตโนมัติ
- โน้ตบุ๊ก Python หนึ่งไฟล์ต่อบทเรียนโดยใช้ Microsoft Agent Framework

## คำสั่งการติดตั้ง

### ความต้องการเบื้องต้น
- Python 3.12 หรือสูงกว่า
- การสมัครใช้งาน Azure (สำหรับ Microsoft Foundry)
- ติดตั้งและยืนยันตัวตน Azure CLI (`az login`)

### การตั้งค่าเริ่มต้น

1. **โคลนหรือฟอร์กที่เก็บนี้:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # หรือ
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **สร้างและเปิดใช้งานสภาพแวดล้อมเสมือน Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # บน Windows: venv\Scripts\activate
   ```

3. **ติดตั้ง dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **ตั้งค่าตัวแปรสภาพแวดล้อม:**
   ```bash
   cp .env.example .env
   # แก้ไข .env ด้วยคีย์ API และจุดสิ้นสุดของคุณ
   ```

### ตัวแปรสภาพแวดล้อมที่จำเป็น

สำหรับ **Microsoft Foundry** (จำเป็น):
- `AZURE_AI_PROJECT_ENDPOINT` - จุดสิ้นสุดโปรเจกต์ Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - ชื่อการสั่งใช้งานโมเดล (เช่น gpt-4.1-mini)

สำหรับ **Azure AI Search** (บทเรียน 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - จุดสิ้นสุด Azure AI Search
- `AZURE_SEARCH_API_KEY` - คีย์ API Azure AI Search

การยืนยันตัวตน: รัน `az login` ก่อนใช้งานโน้ตบุ๊ก (ใช้ `AzureCliCredential`)

## การพัฒนาและเวิร์กโฟลว์

### การรัน Jupyter Notebooks

แต่ละบทเรียนมีหลาย Jupyter notebooks สำหรับเฟรมเวิร์กต่าง ๆ:

1. **เริ่มต้น Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **ไปยังไดเรกทอรีบทเรียน** (เช่น `01-intro-to-ai-agents/code_samples/`)

3. **เปิดและรันโน้ตบุ๊ก:**
   - `*-python-agent-framework.ipynb` - ใช้ Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - ใช้ Microsoft Agent Framework (.NET)

### การทำงานกับ Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- ต้องมีการสมัครใช้งาน Azure
- ใช้ `FoundryChatClient` สำหรับ Agent Service V2 (เอเจนต์จะเห็นได้ในพอร์ทัล Foundry)
- พร้อมสำหรับการผลิตด้วยการตรวจสอบภายในตัว
- รูปแบบไฟล์: `*-python-agent-framework.ipynb`

## คำแนะนำการทดสอบ

นี่คือที่เก็บเพื่อการศึกษา พร้อมตัวอย่างโค้ดแทนโค้ดผลิตภัณฑ์ที่มีการทดสอบอัตโนมัติ สำหรับยืนยันการตั้งค่าและการเปลี่ยนแปลง:

### การทดสอบด้วยตนเอง

1. **ทดสอบสภาพแวดล้อม Python:**
   ```bash
   python --version  # ควรเป็น 3.12 ขึ้นไป
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **ทดสอบการรันโน้ตบุ๊ก:**
   ```bash
   # แปลงโน้ตบุ๊กเป็นสคริปต์และรัน (ทดสอบการนำเข้า)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **ตรวจสอบตัวแปรสภาพแวดล้อม:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### การรันโน้ตบุ๊กแต่ละไฟล์

เปิดโน้ตบุ๊กใน Jupyter และรันเซลล์ตามลำดับ แต่ละโน้ตบุ๊กมีเนื้อหาในตัวและประกอบด้วย:
- คำสั่ง import
- การโหลดการตั้งค่า
- ตัวอย่างการใช้งาน agent
- ผลลัพธ์ที่คาดในเซลล์ markdown

### การทดสอบเบื้องต้นสำหรับเอเจนต์ที่สั่งใช้งาน

สำหรับบทเรียนที่เอเจนต์ถูกสั่งใช้งานเป็นเอเจนต์โฮสต์โดย Microsoft Foundry (01, 04, 05, 16) ที่เก็บนี้มีสมุดรายชื่อทดสอบเบื้องต้นใต้ `tests/` ซึ่งรันโดยเวิร์กโฟลว์ `.github/workflows/smoke-test.yml` ผ่านแอคชัน [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) นี่เป็นเกทหลังการต่อยอดแบบน้ำหนักเบา (เอเจนต์เข้าถึงได้และปฏิบัติตามคำสั่งเบื้องต้นหรือไม่) เสริมกับพายป์ไลน์ประเมินในบทเรียน 10 และ 16 ดู [tests/README.md](./tests/README.md) สำหรับแผนผังสมุดรายชื่อสู่บทเรียนและเอเจนต์ บทเรียน 17 รันในเครื่องกับ Foundry Local และไม่มีจุดสิ้นสุดโฮสต์ จึงตรวจสอบโดยรันโน้ตบุ๊กโดยตรง

## สไตล์โค้ด

### ข้อตกลง Python

- **เวอร์ชัน Python**: 3.12+
- **สไตล์โค้ด**: ปฏิบัติตาม PEP 8 มาตรฐานของ Python
- **โน้ตบุ๊ก**: ใช้เซลล์ markdown อธิบายแนวคิดอย่างชัดเจน
- **Imports**: จัดกลุ่มที่มาตรฐาน ไลบรารีบุคคลที่สาม และนำเข้าในเครื่อง

### ข้อตกลง Jupyter Notebook

- รวมเซลล์ markdown ที่อธิบายก่อนเซลล์โค้ด
- เพิ่มตัวอย่างผลลัพธ์ในโน้ตบุ๊กสำหรับอ้างอิง
- ใช้ชื่อตัวแปรที่ชัดเจนซึ่งตรงกับแนวคิดบทเรียน
- รักษาลำดับการรันโน้ตบุ๊กให้เป็นเส้นตรง (เซลล์ 1 → 2 → 3...)

### การจัดระเบียบไฟล์

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## การสร้างและการจัดส่ง

### การสร้างเอกสาร

ที่เก็บนี้ใช้ Markdown สำหรับเอกสาร:
- ไฟล์ README.md ในโฟลเดอร์แต่ละบทเรียน
- README.md หลักที่รากที่เก็บ
- ระบบแปลอัตโนมัติผ่าน GitHub Actions

### พายป์ไลน์ CI/CD

อยู่ใน `.github/workflows/`:

1. **co-op-translator.yml** - แปลอัตโนมัติเป็นภาษากว่า 50 ภาษา
2. **welcome-issue.yml** - ต้อนรับผู้สร้าง issue ใหม่
3. **welcome-pr.yml** - ต้อนรับผู้ส่ง pull request ใหม่

### การจัดส่ง

นี่คือที่เก็บเพื่อการศึกษา - ไม่มีขั้นตอนการจัดส่ง ผู้ใช้:
1. ฟอร์กหรือโคลนที่เก็บนี้
2. รันโน้ตบุ๊กในเครื่องหรือใน GitHub Codespaces
3. เรียนรู้โดยการแก้ไขและทดลองตัวอย่าง

## แนวทางการส่ง Pull Request

### ก่อนส่ง

1. **ทดสอบการเปลี่ยนแปลงของคุณ:**
   - รันโน้ตบุ๊กทั้งหมดที่เกี่ยวข้องครบถ้วน
   - ยืนยันว่าเซลล์ทั้งหมดรันได้ไม่มีข้อผิดพลาด
   - ตรวจสอบว่าเอาต์พุตเหมาะสม

2. **ปรับปรุงเอกสาร:**
   - อัปเดต README.md หากเพิ่มแนวคิดใหม่
   - เพิ่มคอมเมนต์ในโน้ตบุ๊กสำหรับโค้ดยุ่งยาก
   - ให้แน่ใจว่าเซลล์ markdown อธิบายจุดประสงค์

3. **การเปลี่ยนแปลงไฟล์:**
   - หลีกเลี่ยงการส่งไฟล์ `.env` (ใช้ `.env.example`)
   - ไม่ส่งโฟลเดอร์ `venv/` หรือ `__pycache__/`
   - รักษาเอาต์พุตในโน้ตบุ๊กเมื่อแสดงแนวคิด
   - ลบไฟล์ชั่วคราวและโน้ตบุ๊กสำรอง (`*-backup.ipynb`)

### รูปแบบชื่อ PR

ใช้ชื่อที่อธิบายได้:
- `[Lesson-XX] เพิ่มตัวอย่างใหม่สำหรับ <concept>`
- `[Fix] แก้ไขคำผิดในบทเรียน-XX README`
- `[Update] ปรับปรุงตัวอย่างโค้ดในบทเรียน-XX`
- `[Docs] อัปเดตคำแนะนำการตั้งค่า`

### การตรวจสอบที่จำเป็น

- โน้ตบุ๊กควรรันได้ไม่มีข้อผิดพลาด
- ไฟล์ README ต้องชัดเจนและถูกต้อง
- ปฏิบัติตามรูปแบบโค้ดที่มีในที่เก็บ
- รักษาความสอดคล้องกับบทเรียนอื่น ๆ

## หมายเหตุเพิ่มเติม

### ข้อควรระวังทั่วไป

1. **ความไม่ตรงกันของเวอร์ชัน Python:**
   - ตรวจสอบให้ใช้ Python 3.12+ เท่านั้น
   - บางแพ็กเกจอาจไม่รองรับเวอร์ชันเก่า
   - ใช้ `python3 -m venv` เพื่อระบุเวอร์ชัน Python อย่างชัดเจน

2. **ตัวแปรสภาพแวดล้อม:**
   - สร้าง `.env` จาก `.env.example` เสมอ
   - อย่าส่งไฟล์ `.env` (ถูกละเว้นใน `.gitignore`)
   - ลงชื่อเข้าใช้ด้วย `az login` เพื่อยืนยันตัวตนแบบไม่มีคีย์ Entra ID

3. **ความขัดแย้งของแพ็กเกจ:**
   - ใช้สภาพแวดล้อมเสมือนใหม่
   - ติดตั้งจาก `requirements.txt` แทนติดตั้งแยกแพ็กเกจ
   - บางโน้ตบุ๊กอาจต้องแพ็กเกจเพิ่มเติมซึ่งระบุในเซลล์ markdown

4. **บริการ Azure:**
   - บริการ Azure AI ต้องการการสมัครใช้งานที่ใช้งานอยู่
   - บางฟีเจอร์เฉพาะเขต
   - ตรวจสอบว่าโมเดล Azure OpenAI ของคุณรองรับ Responses API

### เส้นทางการเรียนรู้

เสนอการเรียนตามลำดับบทเรียน:
1. **00-course-setup** - เริ่มต้นที่นี่เพื่อการตั้งค่าสภาพแวดล้อม
2. **01-intro-to-ai-agents** - เข้าใจพื้นฐาน AI agent
3. **02-explore-agentic-frameworks** - เรียนรู้เกี่ยวกับเฟรมเวิร์กต่าง ๆ
4. **03-agentic-design-patterns** - รูปแบบการออกแบบหลัก
5. เรียนต่อผ่านบทเรียนหมายเลขตามลำดับ

### การเลือกเฟรมเวิร์ก

เลือกเฟรมเวิร์กตามเป้าหมายของคุณ:
- **ทุกบทเรียน**: Microsoft Agent Framework (MAF) กับ `FoundryChatClient`
- **เอเจนต์ลงทะเบียนฝั่งเซิร์ฟเวอร์** ใน Microsoft Foundry Agent Service V2 และมองเห็นในพอร์ทัล Foundry

### การขอความช่วยเหลือ

- เข้าร่วม [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- ทบทวนไฟล์ README ของบทเรียนสำหรับคำแนะนำเฉพาะ
- ดูที่ [README.md หลัก](./README.md) สำหรับภาพรวมหลักสูตร
- อ้างอิง [Course Setup](./00-course-setup/README.md) สำหรับคำแนะนำการตั้งค่ารายละเอียด

### การมีส่วนร่วม

นี่คือโครงการการศึกษาแบบเปิด ยินดีต้อนรับการมีส่วนร่วม:
- ปรับปรุงตัวอย่างโค้ด
- แก้ไขคำผิดหรือข้อผิดพลาด
- เพิ่มคอมเมนต์ชี้แจง
- เสนอหัวข้อบทเรียนใหม่
- แปลเป็นภาษาเพิ่มเติม

ดู [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) สำหรับความต้องการปัจจุบัน

## บริบทเฉพาะโครงการ

### การรองรับหลายภาษา

ที่เก็บนี้ใช้ระบบแปลอัตโนมัติ:
- รองรับภาษามากกว่า 50 ภาษา
- การแปลอยู่ในไดเรกทอรี `/translations/<lang-code>/`
- เวิร์กโฟลว์ GitHub Actions ดูแลการอัปเดตการแปล
- ไฟล์ต้นฉบับเป็นภาษาอังกฤษที่รากที่เก็บ

### โครงสร้างบทเรียน

แต่ละบทเรียนทำตามรูปแบบสม่ำเสมอ:
1. รูปขนาดเล็กวิดีโอลิงก์
2. เนื้อหาบทเรียนเป็นลายลักษณ์อักษร (README.md)
3. ตัวอย่างโค้ดในเฟรมเวิร์กหลายตัว
4. วัตถุประสงค์การเรียนรู้และความต้องการเบื้องต้น
5. ลิงก์ไปยังแหล่งเรียนรู้อื่น ๆ

### ชื่อไฟล์ตัวอย่างโค้ด

รูปแบบ: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - บทเรียน 1, MAF Python
- `14-sequential.ipynb` - บทเรียน 14, รูปแบบขั้นสูง MAF
- `16-python-agent-framework.ipynb` - บทเรียน 16, เอเจนต์สนับสนุนลูกค้าผลิตภัณฑ์
- `17-local-agent-foundry-local.ipynb` - บทเรียน 17, เอเจนต์ในเครื่องกับ Foundry Local + Qwen

### ไดเรกทอรีพิเศษ

- `translated_images/` - รูปภาพแปลแล้ว
- `images/` - รูปภาพต้นฉบับสำหรับเนื้อหาอังกฤษ
- `.devcontainer/` - การตั้งค่าคอนเทนเนอร์พัฒนา VS Code
- `.github/` - เวิร์กโฟลว์และเทมเพลต GitHub Actions

### Dependencies

แพ็กเกจหลักจาก `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - การสนับสนุนโปรโตคอล Agent-to-Agent
- `azure-ai-inference`, `azure-ai-projects` - บริการ Azure AI
- `azure-identity` - การยืนยันตัวตน Azure (AzureCliCredential)
- `azure-search-documents` - การเชื่อมต่อ Azure AI Search
- `mcp[cli]` - การสนับสนุน Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->