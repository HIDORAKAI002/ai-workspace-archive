# การตั้งค่าคอร์ส

## บทนำ

บทเรียนนี้จะครอบคลุมวิธีการรันตัวอย่างโค้ดของคอร์สนี้

## เข้าร่วมกับผู้เรียนอื่นและขอความช่วยเหลือ

ก่อนที่คุณจะเริ่มโคลน repo ของคุณ ให้เข้าร่วม [ช่องทาง Discord ของ AI Agents For Beginners](https://aka.ms/ai-agents/discord) เพื่อขอความช่วยเหลือในการตั้งค่า คำถามใด ๆ เกี่ยวกับคอร์ส หรือเชื่อมต่อกับผู้เรียนคนอื่น ๆ

## โคลนหรือแยกซอร์สของ repo นี้

ในการเริ่มต้น โปรดโคลนหรือแยกซอร์ส GitHub Repository นี้ เพื่อสร้างเวอร์ชันของคุณเองของเนื้อหาคอร์ส เพื่อที่คุณจะได้รัน ทดสอบ และปรับแต่งโค้ด!

คุณสามารถทำได้โดยคลิกลิงก์ <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">เพื่อแยกซอร์ส repo</a>

ตอนนี้คุณควรมีเวอร์ชันแยกซอร์สของคอร์สนี้ของคุณเองที่ลิงก์ดังต่อไปนี้:

![Repo ที่แยกซอร์สแล้ว](../../../translated_images/th/forked-repo.33f27ca1901baa6a.webp)

### โคลนแบบตื้น (แนะนำสำหรับการทำเวิร์กช็อป / Codespaces)

  >คลังข้อมูลเต็มรูปแบบอาจมีขนาดใหญ่ (~3 GB) เมื่อคุณดาวน์โหลดประวัติทั้งหมดและไฟล์ทั้งหมด หากคุณแค่เข้าร่วมเวิร์กช็อปหรือต้องการเพียงโฟลเดอร์บทเรียนไม่กี่โฟลเดอร์ การโคลนแบบตื้น (หรือ โคลนแบบบางส่วน) จะหลีกเลี่ยงการดาวน์โหลดส่วนใหญ่โดยการตัดประวัติและ/หรือข้าม blob

#### โคลนแบบตื้นอย่างรวดเร็ว — ประวัติน้อยสุด ไฟล์ทั้งหมด

แทนที่ `<your-username>` ในคำสั่งด้านล่างด้วย URL ของ fork คุณ (หรือ URL upstream หากคุณต้องการ)

เพื่อโคลนเพียงประวัติ commit ล่าสุด (ดาวน์โหลดขนาดเล็ก):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

เพื่อโคลน branch เฉพาะ:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### โคลนแบบบางส่วน (sparse) — แทบไม่มี blob + เฉพาะโฟลเดอร์ที่เลือก

วิธีนี้ใช้ partial clone และ sparse-checkout (ต้องใช้ Git 2.25+ และแนะนำให้ใช้ Git รุ่นใหม่ที่รองรับ partial clone):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

เข้าไปในโฟลเดอร์ repo:

```bash|powershell
cd ai-agents-for-beginners
```

แล้วกำหนดว่าโฟลเดอร์ที่คุณต้องการคืออะไร (ตัวอย่างด้านล่างแสดงสองโฟลเดอร์):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

หลังจากโคลนและตรวจสอบไฟล์แล้ว หากคุณต้องการเฉพาะไฟล์และต้องการคืนพื้นที่ว่าง (ไม่มีประวัติ git) โปรดลบเมตาดาต้าของ repository (💀ไม่สามารถย้อนกลับได้ — คุณจะสูญเสียฟังก์ชัน Git ทั้งหมด: ไม่มี commit, pull, push หรือเข้าถึงประวัติ)

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### ใช้ GitHub Codespaces (แนะนำเพื่อหลีกเลี่ยงการดาวน์โหลดขนาดใหญ่ในเครื่อง)

- สร้าง Codespace ใหม่สำหรับ repo นี้ผ่าน [GitHub UI](https://github.com/codespaces)  

- ในเทอร์มินัลของ codespace ที่สร้างขึ้นใหม่ ให้รันหนึ่งในคำสั่งโคลนแบบตื้น/แบบบางส่วนด้านบนเพื่อนำเฉพาะโฟลเดอร์บทเรียนที่คุณต้องการเข้ามาใน workspace ของ Codespace
- ตัวเลือกเสริม: หลังโคลนใน Codespaces ให้ลบ .git เพื่อคืนพื้นที่ว่างเพิ่มเติม (ดูคำสั่งลบด้านบน)
- หมายเหตุ: หากคุณต้องการเปิด repo โดยตรงใน Codespaces (โดยไม่ต้องโคลนเพิ่ม) ให้ทราบว่า Codespaces จะสร้าง environment devcontainer และอาจยังจัดเตรียมมากกว่าที่คุณต้องการ การโคลนแบบตื้นภายใน Codespace ใหม่จะให้การควบคุมการใช้ดิสก์มากขึ้น

#### เคล็ดลับ

- แทนที่ URL โคลนด้วย fork ของคุณเสมอหากต้องการแก้ไข/commit
- หากคุณต้องการประวัติหรือไฟล์เพิ่มในภายหลัง คุณสามารถดึงมาเพิ่มหรือปรับ sparse-checkout ให้รวมโฟลเดอร์เพิ่มได้

## การรันโค้ด

คอร์สนี้มีชุด Jupyter Notebooks ที่คุณสามารถรันเพื่อรับประสบการณ์จริงในการสร้าง AI Agents

ตัวอย่างโค้ดใช้ **Microsoft Agent Framework (MAF)** ร่วมกับ `FoundryChatClient` ซึ่งเชื่อมต่อกับ **Microsoft Foundry Agent Service V2** (Responses API) ผ่าน **Microsoft Foundry**

โน้ตบุ๊ก Python ทั้งหมดมีป้ายกำกับ `*-python-agent-framework.ipynb`

## ความต้องการ

- Python 3.12+
  - **หมายเหตุ**: หากคุณยังไม่มี Python3.12 ติดตั้งอยู่ โปรดติดตั้ง จากนั้นสร้าง venv โดยใช้ python3.12 เพื่อให้แน่ใจว่าติดตั้งเวอร์ชันที่ถูกต้องจากไฟล์ requirements.txt
  
    >ตัวอย่าง

    สร้างไดเรกทอรี Python venv:

    ```bash|powershell
    python -m venv venv
    ```

    แล้วเปิดใช้งานสภาพแวดล้อม venv สำหรับ:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: สำหรับตัวอย่างโค้ดที่ใช้ .NET ให้แน่ใจว่าคุณติดตั้ง [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) หรือใหม่กว่า จากนั้นตรวจสอบเวอร์ชัน SDK ที่ติดตั้ง:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — จำเป็นสำหรับการทำ authentication ติดตั้งได้ที่ [aka.ms/installazurecli](https://aka.ms/installazurecli)
- **Azure Subscription** — สำหรับเข้าถึง Microsoft Foundry และ Microsoft Foundry Agent Service
- **Microsoft Foundry Project** — โครงการที่มีโมเดลใช้งานแล้ว (เช่น `gpt-4.1-mini`) ดู [ขั้นตอนที่ 1](#ขั้นตอนที่-1-สร้างโปรเจกต์-microsoft-foundry) ด้านล่าง

เราได้รวมไฟล์ `requirements.txt` ไว้ที่รูทของ repo นี้ ซึ่งประกอบด้วยแพ็กเกจ Python ที่จำเป็นทั้งหมดสำหรับรันตัวอย่างโค้ด

คุณสามารถติดตั้งโดยรันคำสั่งต่อไปนี้ในเทอร์มินัลที่รูทของ repo:

```bash|powershell
pip install -r requirements.txt
```

เราแนะนำให้สร้างสภาพแวดล้อม Python เสมือนจริงเพื่อหลีกเลี่ยงความขัดแย้งและปัญหาต่าง ๆ

## ตั้งค่า VSCode

ตรวจสอบให้แน่ใจว่าคุณใช้เวอร์ชัน Python ที่ถูกต้องใน VSCode

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## ตั้งค่า Microsoft Foundry และ Microsoft Foundry Agent Service

### ขั้นตอนที่ 1: สร้างโปรเจกต์ Microsoft Foundry

คุณจำเป็นต้องมี Microsoft Foundry **hub** และ **project** ที่มีโมเดลใช้งานเพื่อรันโน้ตบุ๊ก

1. ไปที่ [ai.azure.com](https://ai.azure.com) และเข้าสู่ระบบด้วยบัญชี Azure ของคุณ
2. สร้าง **hub** (หรือใช้ที่มีอยู่แล้ว) ดู: [ภาพรวมทรัพยากร Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)
3. ภายใน hub สร้าง **project**
4. นำโมเดลขึ้นใช้งาน (เช่น `gpt-4.1-mini`) จาก **Models + Endpoints** → **Deploy model**

### ขั้นตอนที่ 2: ดึง Endpoint ของโปรเจกต์และชื่อ Deployment โมเดลของคุณ

จากโปรเจกต์ของคุณในพอร์ทัล Microsoft Foundry:

- **Project Endpoint** — ไปที่หน้า **Overview** และคัดลอก URL ของ endpoint

![Project Connection String](../../../translated_images/th/project-endpoint.8cf04c9975bbfbf1.webp)

- **ชื่อ Deployment โมเดล** — ไปที่ **Models + Endpoints**, เลือกโมเดลที่นำขึ้นใช้ แล้วจดชื่อ **Deployment name** (เช่น `gpt-4.1-mini`)

### ขั้นตอนที่ 3: ลงชื่อเข้าใช้ Azure ด้วย `az login`

โน้ตบุ๊กทั้งหมดใช้ **`AzureCliCredential`** สำหรับการรับรองความถูกต้อง — ไม่มีการจัดการคีย์ API นั่นหมายความว่าคุณต้องลงชื่อเข้าใช้ผ่าน Azure CLI

1. **ติดตั้ง Azure CLI** หากคุณยังไม่ได้ติดตั้ง: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **ลงชื่อเข้าใช้** ด้วยการรัน:

    ```bash|powershell
    az login
    ```

    หรือถ้าคุณอยู่ในสภาพแวดล้อม remote/Codespace ที่ไม่มีเบราว์เซอร์:

    ```bash|powershell
    az login --use-device-code
    ```

3. **เลือก subscription** ของคุณถ้ามีการแจ้ง — ให้เลือกอันที่มีโปรเจกต์ Foundry ของคุณอยู่

4. **ตรวจสอบ** ว่าคุณได้ลงชื่อเข้าใช้แล้ว:

    ```bash|powershell
    az account show
    ```

> **ทำไมต้อง `az login`?** โน้ตบุ๊กใช้การรับรองความถูกต้องผ่าน `AzureCliCredential` จากแพ็กเกจ `azure-identity` นั่นหมายความว่าเซสชันของคุณใน Azure CLI จะให้ข้อมูลรับรอง — ไม่ต้องมีคีย์ API หรือความลับในไฟล์ `.env` ของคุณ นี่เป็น [แนวทางปฏิบัติด้านความปลอดภัยที่ดีที่สุด](https://learn.microsoft.com/azure/developer/ai/keyless-connections)

### ขั้นตอนที่ 4: สร้างไฟล์ `.env`

คัดลอกไฟล์ตัวอย่าง:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

เปิดไฟล์ `.env` และกรอกค่าสองค่าต่อไปนี้:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| ตัวแปร | ที่หาได้จากที่ไหน |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | พอร์ทัล Foundry → โปรเจกต์ของคุณ → หน้า **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | พอร์ทัล Foundry → **Models + Endpoints** → ชื่อโมเดลที่นำขึ้นใช้ |

นี่คือขั้นตอนสำหรับบทเรียนส่วนใหญ่ โน้ตบุ๊กจะรับรองความถูกต้องโดยอัตโนมัติผ่านเซสชัน `az login` ของคุณ

### ขั้นตอนที่ 5: ติดตั้ง Dependencies ของ Python

```bash|powershell
pip install -r requirements.txt
```

เราแนะนำให้รันคำสั่งนี้ภายใน virtual environment ที่คุณสร้างไว้ก่อนหน้านี้

## การตั้งค่าเพิ่มเติมสำหรับบทเรียน 5 (Agentic RAG)

บทเรียน 5 ใช้ **Azure AI Search** สำหรับการสร้างผลลัพธ์ที่เสริมด้วยการค้นหา หากคุณมีแผนจะรันบทเรียนนั้น ให้เพิ่มตัวแปรเหล่านี้ในไฟล์ `.env` ของคุณ:

| ตัวแปร | ที่หาได้จากที่ไหน |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | พอร์ทัล Azure → ทรัพยากร **Azure AI Search** ของคุณ → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | พอร์ทัล Azure → ทรัพยากร **Azure AI Search** ของคุณ → **Settings** → **Keys** → คีย์ผู้ดูแลระบบหลัก |

## การตั้งค่าเพิ่มเติมสำหรับบทเรียนที่เรียกใช้ Azure OpenAI โดยตรง (บทเรียน 6 และ 8)

บางโน้ตบุ๊กในบทเรียน 6 และ 8 เรียกใช้ **Azure OpenAI** โดยตรง (ใช้ **Responses API**) แทนที่จะผ่านโปรเจกต์ Microsoft Foundry ตัวอย่างเหล่านี้เคยใช้ GitHub Models ซึ่งถูกยกเลิกแล้ว (จะเลิกใช้ในเดือนกรกฎาคม 2026) และไม่รองรับ Responses API หากคุณวางแผนจะรันตัวอย่างเหล่านั้น ให้เพิ่มตัวแปรเหล่านี้ในไฟล์ `.env` ของคุณ:

| ตัวแปร | ที่หาได้จากที่ไหน |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | พอร์ทัล Azure → ทรัพยากร **Azure OpenAI** ของคุณ → **Keys and Endpoint** → Endpoint (เช่น `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | ชื่อของโมเดลที่นำขึ้นใช้ (เช่น `gpt-4.1-mini`) ที่รองรับ Responses API |
| `AZURE_OPENAI_API_KEY` | ตัวเลือก — เฉพาะกรณีที่คุณใช้การยืนยันตัวตนด้วยคีย์แทน `az login` / Entra ID |

> Responses API ใช้ endpoint เสถียร `/openai/v1/` ดังนั้นไม่ต้องระบุ `api-version` ลงชื่อเข้าใช้ด้วย `az login` เพื่อใช้การยืนยันตัวตนแบบไม่ใช้คีย์ของ Entra ID

## ผู้ให้บริการทางเลือก: MiniMax (รองรับ OpenAI)

[MiniMax](https://platform.minimaxi.com/) ให้บริการโมเดลสำหรับบริบทขนาดใหญ่ (สูงสุด 204K tokens) ผ่าน API ที่รองรับ OpenAI เนื่องจาก `OpenAIChatClient` ของ Microsoft Agent Framework ทำงานกับ endpoint ที่รองรับ OpenAI ใด ๆ ได้ คุณสามารถใช้ MiniMax เป็นทางเลือกแทน Azure OpenAI หรือ OpenAI ได้โดยตรง

เพิ่มตัวแปรเหล่านี้ในไฟล์ `.env` ของคุณ:

| ตัวแปร | ที่หาได้จากที่ไหน |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | ใช้ `https://api.minimax.io/v1` (ค่าดีฟอลต์) |
| `MINIMAX_MODEL_ID` | ชื่อโมเดลที่ใช้ (เช่น `MiniMax-M3`) |

**โมเดลตัวอย่าง**: `MiniMax-M3` (แนะนำ), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (ตอบสนองเร็วขึ้น) ชื่อและความพร้อมใช้งานของโมเดลอาจเปลี่ยนแปลงได้ตามเวลา และการเข้าถึงโมเดลใดขึ้นอยู่กับบัญชีหรือภูมิภาคของคุณ — ตรวจสอบ [MiniMax Platform](https://platform.minimaxi.com/) สำหรับรายการปัจจุบัน หาก `MiniMax-M3` ไม่มีให้ใช้กับบัญชีของคุณ ให้ตั้งค่า `MINIMAX_MODEL_ID` เป็นโมเดลที่คุณเข้าถึงได้ (เช่น `MiniMax-M2.7`)

ตัวอย่างโค้ดที่ใช้ `OpenAIChatClient` (เช่น บทเรียนที่ 14 การจองโรงแรม) จะตรวจจับและใช้การตั้งค่า MiniMax ของคุณโดยอัตโนมัติเมื่อกำหนด `MINIMAX_API_KEY`

## ผู้ให้บริการทางเลือก: Foundry Local (รันโมเดลบนอุปกรณ์)

[Foundry Local](https://foundrylocal.ai) เป็น runtime เบา ๆ ที่ดาวน์โหลด จัดการ และให้บริการโมเดลภาษา **บนเครื่องของคุณเองทั้งหมด** ผ่าน API ที่รองรับ OpenAI — ไม่มีคลาวด์ ไม่มีการสมัครสมาชิก Azure และไม่มีคีย์ API เหมาะสำหรับการพัฒนาออฟไลน์ ทดลองโดยไม่เสียค่าใช้จ่ายคลาวด์ หรือเก็บข้อมูลไว้ในเครื่อง

เนื่องจาก `OpenAIChatClient` ของ Microsoft Agent Framework ทำงานกับ endpoint ที่รองรับ OpenAI ใด ๆ ได้ Foundry Local จึงเป็นทางเลือกที่รันโมเดลได้ในเครื่องแทน Azure OpenAI

**1. ติดตั้ง Foundry Local**

```bash
# วินโดวส์
winget install Microsoft.FoundryLocal

# แมคโอเอส
brew install foundrylocal
```

**2. ดาวน์โหลดและรันโมเดล** (ซึ่งจะเริ่มบริการในเครื่องด้วย):

```bash
foundry model list          # ดูรุ่นที่มีอยู่
foundry model run phi-4-mini
```

**3. ติดตั้ง Python SDK** ที่ใช้ค้นหา endpoint ในเครื่อง:

```bash
pip install foundry-local-sdk
```

**4. ชี้ Microsoft Agent Framework ไปยังโมเดลในเครื่องของคุณ:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# ดาวน์โหลด (ถ้าจำเป็น) และให้บริการโมเดลในเครื่อง จากนั้นค้นหาจุดเชื่อมต่อ/พอร์ต
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # เช่น http://localhost:<port>/v1
    api_key=manager.api_key,        # เสมอ "ไม่จำเป็น" สำหรับ Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **หมายเหตุ:** Foundry Local เปิดเผย endpoint **Chat Completions** ที่รองรับ OpenAI ใช้สำหรับการพัฒนาในเครื่องและกรณีออฟไลน์ สำหรับฟีเจอร์ครบของ **Responses API** (บทสนทนาที่มีสถานะ, การจัดการเครื่องมือเชิงลึก, และการพัฒนาแบบตัวแทน) ให้ใช้ **Azure OpenAI** หรือโปรเจกต์ **Microsoft Foundry** ตามตัวอย่างในบทเรียน ดูเอกสาร [Foundry Local](https://foundrylocal.ai) สำหรับรายการโมเดลและการรองรับแพลตฟอร์มล่าสุด


## การตั้งค่าเพิ่มเติมสำหรับบทเรียนที่ 8 (Bing Grounding Workflow)

สมุดบันทึก workflow แบบมีเงื่อนไขในบทเรียนที่ 8 ใช้ **Bing grounding** ผ่าน Microsoft Foundry หากคุณวางแผนที่จะรันตัวอย่างนั้น ให้เพิ่มตัวแปรนี้ในไฟล์ `.env` ของคุณ:

| ตัวแปร | ที่ตั้ง |
|----------|-----------------|
| `BING_CONNECTION_ID` | พอร์ทัล Microsoft Foundry → โครงการของคุณ → **การจัดการ** → **ทรัพยากรที่เชื่อมต่อ** → การเชื่อมต่อ Bing ของคุณ → คัดลอก ID การเชื่อมต่อ |

## การแก้ไขปัญหา

### ข้อผิดพลาดการตรวจสอบใบรับรอง SSL บน macOS

หากคุณใช้ macOS และพบข้อผิดพลาดเช่น:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

นี่เป็นปัญหาที่ทราบกันสำหรับ Python บน macOS ซึ่งใบรับรอง SSL ของระบบจะไม่ได้รับความไว้วางใจโดยอัตโนมัติ ลองแก้ไขปัญหาดังต่อไปนี้ตามลำดับ:

**ตัวเลือกที่ 1: รันสคริปต์ติดตั้งใบรับรองของ Python (แนะนำ)**

```bash
# แทนที่ 3.XX ด้วยเวอร์ชัน Python ที่คุณติดตั้ง (เช่น 3.12 หรือ 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**ตัวเลือกที่ 2: ใช้ `connection_verify=False` ในสมุดบันทึกของคุณ (เฉพาะสมุดบันทึก GitHub Models เท่านั้น)**

ในสมุดบันทึกบทเรียนที่ 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) มีการแก้ไขปัญหาที่ถูกคอมเมนต์ไว้แล้ว ให้ยกเลิกคอมเมนต์ `connection_verify=False` เมื่อสร้างไคลเอนต์:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # ปิดการตรวจสอบ SSL หากคุณพบข้อผิดพลาดของใบรับรอง
)
```

> **⚠️ คำเตือน:** การปิดการตรวจสอบ SSL (`connection_verify=False`) จะลดความปลอดภัยโดยการข้ามการตรวจสอบใบรับรอง ใช้เฉพาะเป็นทางแก้ชั่วคราวในสภาพแวดล้อมการพัฒนา หลีกเลี่ยงการใช้ในสภาพแวดล้อมการผลิต

**ตัวเลือกที่ 3: ติดตั้งและใช้ `truststore`**

```bash
pip install truststore
```

จากนั้นเพิ่มสิ่งต่อไปนี้ไว้ที่ด้านบนสุดของสมุดบันทึกหรือสคริปต์ก่อนจะทำการเรียกเครือข่ายใดๆ:

```python
import truststore
truststore.inject_into_ssl()
```

## ติดขัดที่ไหนหรือเปล่า?

หากคุณมีปัญหาใด ๆ ในการรันการตั้งค่านี้ เข้าร่วมได้ที่ <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> หรือ <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">แจ้งปัญหา</a>.

## บทเรียนถัดไป

ตอนนี้คุณพร้อมที่จะรันโค้ดสำหรับหลักสูตรนี้แล้ว สนุกกับการเรียนรู้เพิ่มเติมเกี่ยวกับโลกของ AI Agents!

[บทนำสู่ AI Agents และกรณีการใช้งาน Agent](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->