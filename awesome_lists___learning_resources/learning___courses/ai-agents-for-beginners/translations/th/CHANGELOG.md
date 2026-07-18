# บันทึกการเปลี่ยนแปลง

การเปลี่ยนแปลงที่สำคัญทั้งหมดของหลักสูตร **AI Agents for Beginners** ถูกบันทึกไว้ในไฟล์นี้

## [เผยแพร่แล้ว] — 2026-07-13

การเปิดตัวนี้เพิ่มบทเรียนใหม่สองบทที่เสร็จสมบูรณ์ในส่วนการปรับใช้ — การปรับขนาดตัวแทนไปยัง Microsoft Foundry และกลับมายังเครื่องเวิร์กสเตชันเดียว — พร้อมด้วย pipeline สำหรับทดสอบเบื้องต้น การนำทางหลักสูตรที่ปรับปรุงใหม่ ทักษะผู้เรียนใหม่ และปรับปรุงการสร้างตราสินค้า

### เพิ่มเติม

- **บทเรียน 16 — การปรับใช้ตัวแทนที่ปรับขนาดได้กับ Microsoft Foundry.** บทเรียนใหม่ [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) และโน้ตบุ๊กที่รันได้ [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) สร้างตัวแทนสนับสนุนลูกค้าที่ใช้งานจริง (เครื่องมือ, RAG, memory, การสลับโมเดล, การแคชมอบหมายตอบกลับ, การอนุมัติแบบมนุษย์, ประตูประเมินผล และ OpenTelemetry tracing) พร้อมไดอะแกรม Mermaid สำหรับการพัฒนา/ปรับใช้/รันไทม์ แบบทดสอบความรู้ งานมอบหมาย และความท้าทาย
- **บทเรียน 17 — การสร้างตัวแทน AI ในเครื่องด้วย Foundry Local และ Qwen.** บทเรียนใหม่ [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) และโน้ตบุ๊ก [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) สร้างผู้ช่วยวิศวกรรมบนอุปกรณ์อย่างเต็มรูปแบบ (การเรียกฟังก์ชัน Qwen ผ่าน Foundry Local, เครื่องมือไฟล์แบบSandbox, RAG ในเครื่องด้วย Chroma, MCP ในเครื่องแบบเลือกได้) พร้อมไดอะแกรมสำหรับการใช้ในเครื่อง / RAG ในเครื่อง / การเรียกเครื่องมือ แบบทดสอบความรู้ งานมอบหมาย และความท้าทาย
- **Pipeline ทดสอบเบื้องต้น.** workflow ใหม่ [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) รวมถึงแคตตาล็อกต่อบทเรียนใน [tests/](./tests/README.md) สำหรับตัวแทนที่ปรับใช้ได้ในบทเรียน 01, 04, 05, และ 16 พร้อม README ดัชนีที่เชื่อมโยงแต่ละแคตตาล็อกกับบทเรียนและชื่อโฮสต์ตัวแทน บทเรียน 16 ได้ส่วน "การตรวจสอบตัวแทนที่ปรับใช้ด้วยการทดสอบเบื้องต้น"; บทเรียน 01/04/05 มีตัวชี้สำหรับทดสอบเบื้องต้นแบบเลือกใช้ได้
- **ทักษะผู้เรียน.** ทักษะตัวแทนใหม่ภายใต้ `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (รวบรวมคำแนะนำบทเรียน 16 และ 17), และ [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (วิธีตรวจสอบตัวอย่างโน้ตบุ๊กกับการตั้งค่า Microsoft Foundry / Azure OpenAI แบบสด)
- **ตัวรันตรวจสอบโน้ตบุ๊ก.** ใหม่ [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) ที่เรียกใช้งานทุกโน้ตบุ๊ก Python แบบไม่มีหัวหน้าจอด้วย `nbconvert` และพิมพ์เมทริกซ์ PASS/FAIL (พร้อม `results.json`) ตรวจจับ root ของ repo และ Python อัตโนมัติ ยกเว้นโน้ตบุ๊กที่ไม่ใช่ของหลักสูตร (`.venv`, `site-packages`, การแปล, ทรัพย์สินแม่แบบทักษะ) และโน้ตบุ๊ก `.NET` โดยปริยาย รองรับ `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` และ `-Python`
- **การนำทางหลักสูตร.** เพิ่มลิงก์บทเรียนก่อนหน้า/ถัดไปในบทเรียน 11–15 (ก่อนหน้านี้ไม่มี) ทำให้หลักสูตรทั้งหมดเชื่อมโยง 00 → 18 ในทั้งสองทิศทาง
- **ภาพขนาดย่อใหม่.** ภาพขนาดย่อสำหรับบทเรียน 16 และ 17 พร้อมด้วยภาพโซเชียลของ repo ที่ปรับปรุงใหม่ [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (ตอนนี้โฆษณาสองบทเรียนใหม่และ URL `aka.ms/ai-agents-beginners`)
- **dependencies** ([requirements.txt](../../requirements.txt)): เพิ่ม `foundry-local-sdk` และ `chromadb` สำหรับบทเรียน 17

### เปลี่ยนแปลง

- **ตารางบทเรียนในไฟล์ [README.md](./README.md) หลัก:** ตอนนี้บทเรียน 16 และ 17 ลิงก์ไปยังเนื้อหาของพวกเขา (ก่อนหน้านี้ระบุว่า "กำลังจะมา"); ภาพของ repository เปลี่ยนเป็น `repo-thumbnailv3.png`
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md):** เพิ่มบทเรียน 16 และ 17 ลงในคู่มือบทเรียนและเส้นทางการเรียนรู้ต่อบทเรียน และเพิ่มส่วน "การตรวจสอบตัวแทนที่ปรับใช้ด้วยการทดสอบเบื้องต้น"
- **[AGENTS.md](./AGENTS.md):** อัปเดตจำนวนและคำอธิบายบทเรียน (00–18), เพิ่มส่วนการตรวจสอบการทดสอบเบื้องต้น, และเพิ่มตัวอย่างชื่อนิยามของบทเรียน 16/17
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md):** "บทเรียนก่อนหน้า" เปลี่ยนไปชี้ที่บทเรียน 17 (จากเดิมที่บทเรียน 15) ปิดลูป
- **การอ้างอิงโมเดลมาตรฐานในโมเดลที่ไม่ถูกเลิกใช้.** แทนที่การอ้างอิง `gpt-4o` / `gpt-4o-mini` ทั้งหมดในหลักสูตร (เอกสาร, `.env.example`, โน้ตบุ๊ก Python/.NET และตัวอย่าง) ด้วย `gpt-4.1-mini` — `gpt-4o` (ทุกรุ่น) จะเลิกใช้งานในปี 2026 ตัวอย่างการสลับโมเดลของบทเรียน 16 ยังคงใช้ความแตกต่างเล็ก/ใหญ่โดยใช้ `gpt-4.1-mini` (เล็ก) และ `gpt-4.1` (ใหญ่) โน้ตบุ๊ก Python ตอนนี้เลือกโมเดลจากตัวแปรแวดล้อม (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) แทนการเขียนชื่อโมเดลที่กำหนดไว้ล่วงหน้า

### หมายเหตุและข้อจำกัดที่ทราบ

- **ไม่ได้รันกับ Azure แบบสด.** โน้ตบุ๊กของบทเรียนใหม่เป็นตัวอย่างการศึกษา; รันและตรวจสอบพวกมันกับการตั้งค่า Microsoft Foundry / Foundry Local ของคุณเอง workflow การทดสอบเบื้องต้นต้องให้คุณปรับใช้ตัวแทนของบทเรียนและกำหนดค่า Azure OIDC secrets (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) ด้วยบทบาท **Azure AI User** ที่ขอบเขตโครงการ Foundry
- **บทเรียน 17 เป็นแบบในเครื่องเท่านั้น.** ไม่มี endpoint Foundry Responses ดังนั้นการทดสอบเบื้องต้นจึงไม่สามารถใช้ได้; ให้ตรวจสอบโดยการรันโน้ตบุ๊กบนเครื่องของคุณ

## [เผยแพร่แล้ว] — 2026-07-06

การเปิดตัวนี้ย้ายหลักสูตรไปยัง **Azure OpenAI Responses API**, มาตรฐานชื่อผลิตภัณฑ์บน **Microsoft Foundry** และ **Microsoft Agent Framework (MAF)**, เลิกใช้ GitHub Models, อัปเดตเวอร์ชัน SDK, และเพิ่มเนื้อหาใหม่เกี่ยวกับโมเดลในเครื่องและการโฮสต์ Framework อื่นบน Foundry

### เพิ่มเติม

- **ทักษะการย้ายระบบ** — ติดตั้ง Agent Skill [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (จาก [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) ภายใต้ `.agents/skills/` รวมถึงการอ้างอิงและสคริปต์สแกนเนอร์ของมัน
- **Foundry Local (รันโมเดลบนอุปกรณ์)** — ส่วนใหม่ "ผู้ให้บริการทางเลือก: Foundry Local" ใน [00-course-setup/README.md](./00-course-setup/README.md) ครอบคลุมการติดตั้ง (`winget` / `brew`), `foundry model run`, `foundry-local-sdk` และการเชื่อมต่อ `FoundryLocalManager` กับ Microsoft Agent Framework ผ่าน `OpenAIChatClient`
- **โฮสต์ตัวแทน LangChain / LangGraph บน Microsoft Foundry** — ส่วนใหม่ใน [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) พร้อมตัวอย่างรันได้ [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) ใช้ `langchain-azure-ai[hosting]` และ `ResponsesHostServer` (โปรโตคอล `/responses`), อ้างอิงจาก [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)
- **Microsoft Project Opal** — ส่วนใหม่ "ตัวอย่างจริง: Microsoft Project Opal" ใน [15-browser-use/README.md](./15-browser-use/README.md) นำเสนอ Opal เป็นตัวแทนใช้งานคอมพิวเตอร์องค์กรและเชื่อมต่อกับแนวคิดหลักสูตร (มนุษย์ในวงจร, ความน่าเชื่อถือ/ความปลอดภัย, การวางแผน, ทักษะ)
- **ตัวอย่าง Python บทเรียน 02 ตัวที่สอง** — เพิ่ม [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (ดู "เปลี่ยนแปลง" — ย้ายมาจากโน้ตบุ๊ก Semantic Kernel เดิม) และลิงก์ใน README ของบทเรียน
- เพิ่มส่วน Models and Providers ใน [STUDY_GUIDE.md](./STUDY_GUIDE.md)

### เปลี่ยนแปลง

- **Chat Completions → Responses API (Python).** ตัวอย่างที่เรียกโมเดลโดยตรงถูกย้ายจาก Chat Completions ไปยัง Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`) โดยใช้ไคลเอนต์ `OpenAI` กับ endpoint เสถียรของ Azure OpenAI `/openai/v1/` (ไม่มี `api_version`) ตัวอย่างที่ได้รับผลกระทบได้แก่:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — การเดินผ่านฟังก์ชันเรียกครบถ้วน (โครงสร้างเครื่องมือเรียบแบนเป็นฟอร์แมต Responses, ผลลัพธ์เครื่องมือคืนเป็น `function_call_output`, `max_output_tokens` เป็นต้น)
- **GitHub Models → Azure OpenAI.** GitHub Models ถูกเลิกใช้ (จะเลิกใช้งาน **กรกฎาคม 2026**) และไม่รองรับ Responses API เส้นทางโค้ด GitHub Models ทั้งหมดถูกแปลงเป็น Azure OpenAI / Microsoft Foundry ทั้งในตัวอย่าง Python และ .NET:
  - Python: โน้ตบุ๊ก workflow บทเรียน 08 (`01`–`03`), บทเรียน 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`)
  - .NET: `01`–`04`, `07`, `08` ไฟล์ `*-dotnet-agent-framework.cs` และเอกสาร `.md` ประกอบ, โน้ตบุ๊ก workflow บทเรียน 08 dotNET/`.md` (`01`–`03`) ตอนนี้ใช้ `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` พร้อม `AzureCliCredential`
- **Semantic Kernel → Microsoft Agent Framework.** โน้ตบุ๊ก `02-semantic-kernel.ipynb` เดิมถูกเขียนใหม่เพื่อใช้ Microsoft Agent Framework กับ Azure OpenAI (Responses API) และเปลี่ยนชื่อเป็น `02-python-agent-framework-azure-openai.ipynb`
- **ทำมาตรฐานบน `FoundryChatClient` + `as_agent`.** README และโค้ดในโน้ตบุ๊กที่อ้างอิง `AzureAIProjectAgentProvider` ถูกทำมาตรฐานตามรูปแบบที่ใช้ในบทเรียน 01 และตัวอย่างในเฟรมเวิร์กเอง: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` พร้อม `provider.as_agent(...)` อัปเดตครอบคลุม README และโน้ตบุ๊กบทเรียน 02–14 (เช่น ความจำบทเรียน 13, โน้ตบุ๊กบทเรียน 14 ทั้งหมด, `11-agentic-protocols/code_samples/github-mcp/app.py`)
- **การตั้งชื่อผลิตภัณฑ์.** เปลี่ยนชื่อทั่วเนื้อหาอังกฤษ:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (ไม่เปลี่ยนแปลง: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", และชื่อตัวแปรแวดล้อม)
- **dependencies** ([requirements.txt](../../requirements.txt)):
  - กำหนด `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`
  - กำหนด `openai>=1.108.1` (ขั้นต่ำสำหรับ Responses API)
  - ลบ `azure-ai-inference` (ใช้เฉพาะในตัวอย่าง GitHub Models ที่ย้ายมา)
- **การตั้งค่าสภาพแวดล้อม** ([.env.example](../../.env.example)): ลบตัวแปร GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); เพิ่ม `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` และตัวเลือก `AZURE_OPENAI_API_KEY`; อัปเดตชื่อเป็น Microsoft Foundry
- **เอกสาร** — อัปเดต [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), และ [STUDY_GUIDE.md](./STUDY_GUIDE.md) สำหรับการเปลี่ยนแปลงข้างต้น (ตั้งค่าตัวแปรแวดล้อม, ชิ้นโค้ดยืนยัน, คำแนะนำผู้ให้บริการ, การตั้งชื่อ)

### ลบออก

- ขั้นตอนเริ่มต้นและตัวแปรแวดล้อม GitHub Models จากเอกสารการตั้งค่า (ถูกแทนที่ด้วย Azure OpenAI / Microsoft Foundry)

### ความปลอดภัย / ความเป็นส่วนตัว (ทำความสะอาดการแชร์สาธารณะ)

- ลบผลลัพธ์การรัน Jupyter notebook ที่รั่วไหล **รหัสการสมัครใช้ Azure จริง**, ชื่อกลุ่มทรัพยากร/ทรัพยากร, ID การเชื่อมต่อ Bing รวมถึงเส้นทางไฟล์และชื่อผู้ใช้ของนักพัฒนา ใน:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- ตรวจสอบแล้วว่าไม่มีคีย์ API, โทเค็น, รหัสการสมัครสมาชิก หรือเส้นทางส่วนตัวเหลืออยู่ในเนื้อหาภาษาอังกฤษที่ติดตามไว้ (การอ้างอิง `GITHUB_TOKEN` ที่เหลืออยู่เป็นโทเค็น GitHub Actions ใน workflows และ PAT ในเซิร์ฟเวอร์ GitHub MCP ในการตั้งค่า Lesson 11 — ซึ่งถูกต้องและไม่เกี่ยวข้องกับ GitHub Models)

### หมายเหตุและข้อจำกัดที่ทราบ

- **ไม่ได้ดำเนินการ/คอมไพล์.** ตัวอย่างเหล่านี้เป็นตัวอย่างเพื่อการศึกษาอัปเดตเพื่อความถูกต้องของ API/ชื่อเท่านั้น; ไม่ได้รันกับทรัพยากร Azure จริง และตัวอย่าง .NET ไม่ได้คอมไพล์ในสภาพแวดล้อมนี้ โปรดยืนยันกับการติดตั้ง Microsoft Foundry / Azure OpenAI ของคุณเอง
- **การปรับใช้โมเดลต้องรองรับ Responses API.** ใช้การปรับใช้เช่น `gpt-4.1-mini`, `gpt-4.1`, หรือโมเดล `gpt-5.x` โมเดลเก่ารองรับฟังก์ชัน Responses หลัก แต่ไม่ครอบคลุมทุกฟีเจอร์
- **เวอร์ชัน agent-framework.** ตัวอย่างจะใช้ MAF ล่าสุด (`>=1.10.0`) การเรียกสร้างเอเจนต์หลักคือ `client.as_agent(...)`; API ได้รับการตรวจสอบกับเอกสารที่เผยแพร่ของเฟรมเวิร์กและบิลด์ที่ติดตั้งแล้ว หากใช้เวอร์ชันอื่น โปรดยืนยันการมีอยู่ของเมธอด (`as_agent` กับ `create_agent`)
- **โน้ตบุ๊ก workflow บทเรียน 08 แผ่นที่ 04** เจาะจงเก็บ `AzureAIAgentClient` (จาก `agent-framework-azure-ai`) เพราะใช้เครื่องมือของ Microsoft Foundry Agent Service (การตั้งค่า Bing grounding, ตัวแปลความหมายโค้ด); ซึ่งเป็นบนฐาน Responses อยู่แล้ว
- **การปรับใช้เริ่มต้นของ .NET.** ตัวอย่าง workflow dotNET บทเรียน 08 สองตัวอย่างเคยระบุโมเดลเจาะจงไว้ตอนแรก; ตอนนี้ใช้ค่าเริ่มต้นเป็น `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`) หากตัวอย่างต้องการ multimodal/vision input ให้ตั้งค่า `AZURE_OPENAI_DEPLOYMENT` เป็นโมเดลที่เหมาะสม
- **Foundry Local** เปิดเผย endpoint แบบ OpenAI-compatible **Chat Completions** และตั้งใจสำหรับการพัฒนาท้องถิ่น; ใช้ Azure OpenAI / Microsoft Foundry สำหรับฟีเจอร์ชุด Responses API เต็มรูปแบบ

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->