# การรันตัวอย่างนี้

นี่คือโซลูชัน Rust สำหรับตัวอย่างไคลเอนต์ LLM คุณต้องติดตั้ง Rust toolchain; ดูที่ [คู่มือการติดตั้งอย่างเป็นทางการ](https://www.rust-lang.org/tools/install)

ไคลเอนต์เรียกใช้โมเดลผ่านจุดเชื่อมต่อการอนุมาน GitHub Models (`https://models.github.ai/inference/chat`) และอ่าน GitHub personal access token (PAT) ของคุณจากตัวแปรสภาพแวดล้อม `OPENAI_API_KEY`

> [!NOTE]
> โซลูชันอื่นๆ ในรีโปนี้ใช้ `GITHUB_TOKEN` สำหรับ Rust ให้ตั้งค่า `OPENAI_API_KEY` เป็นค่าเดียวกันเพื่อให้ตรงกับการกำหนดค่าไคลเอนต์ OpenAI

## -0- ตั้งค่าโทเค็น GitHub ของคุณ

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- สร้างตัวอย่าง

```bash
cargo build
```

## -2- รันตัวอย่าง

```bash
cargo run
```

ไคลเอนต์จะเริ่มเซิร์ฟเวอร์เครื่องคิดเลข MCP ดึงรายการเครื่องมือ และใช้โมเดล (`openai/gpt-5-mini`) เพื่อเรียกเครื่องมือ `add` คุณควรเห็นเอาต์พุตที่บ่งชี้การเรียกเครื่องมือ (เช่น "Calling tool: add") และผลลัพธ์ของการเรียกนั้น

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->