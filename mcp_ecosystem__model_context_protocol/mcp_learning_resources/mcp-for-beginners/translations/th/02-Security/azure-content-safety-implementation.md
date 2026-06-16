# การใช้งาน Azure Content Safety กับ MCP

> **OWASP MCP ความเสี่ยงที่แก้ไข**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

เพื่อเสริมความปลอดภัยของ MCP จากการโจมตี prompt injection, การปนเปื้อนเครื่องมือ, และช่องโหว่เฉพาะของ AI การผสานรวม Azure Content Safety ถือเป็นสิ่งที่แนะนำอย่างยิ่ง คู่มือการใช้งานนี้สอดคล้องกับ [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security

## การผสานรวมกับ MCP Server

เพื่อผสานรวม Azure Content Safety กับ MCP server ของคุณ ให้เพิ่มตัวกรอง content safety เป็น middleware ในกระบวนการประมวลผลคำขอของคุณ:

1. เริ่มต้นตัวกรองในช่วงการเริ่มต้นของเซิร์ฟเวอร์
2. ตรวจสอบความถูกต้องของคำขอเครื่องมือเข้าทั้งหมดก่อนประมวลผล
3. ตรวจสอบคำตอบที่ส่งออกทั้งหมดก่อนส่งกลับให้กับลูกค้า
4. บันทึกและแจ้งเตือนเมื่อพบการละเมิดความปลอดภัย
5. ดำเนินการจัดการข้อผิดพลาดที่เหมาะสมในกรณีตรวจสอบความปลอดภัยของเนื้อหาล้มเหลว

วิธีนี้ช่วยให้ป้องกันได้อย่างแข็งแกร่งจาก:
- การโจมตี prompt injection
- ความพยายามปนเปื้อนเครื่องมือ
- การดึงข้อมูลออกโดยใช้ข้อมูลป้อนเข้าที่เป็นอันตราย
- การสร้างเนื้อหาที่เป็นอันตราย

## แนวทางปฏิบัติที่ดีที่สุดสำหรับการใช้งาน Azure Content Safety

1. **รายการบล็อกที่กำหนดเอง**: สร้างรายการบล็อกที่กำหนดเองเฉพาะสำหรับแพทเทิร์นการฉีด MCP
2. **ปรับระดับความรุนแรง**: ปรับระดับความรุนแรงตามกรณีการใช้งานและความอดทนความเสี่ยงของคุณ
3. **ครอบคลุมอย่างครบถ้วน**: ใช้การตรวจสอบความปลอดภัยเนื้อหากับข้อมูลป้อนเข้าและส่งออกทั้งหมด
4. **เพิ่มประสิทธิภาพการทำงาน**: พิจารณาการใช้แคชสำหรับการตรวจสอบความปลอดภัยเนื้อหาที่ทำซ้ำ
5. **กลไกสำรอง**: กำหนดพฤติกรรมสำรองที่ชัดเจนเมื่อบริการความปลอดภัยเนื้อหาไม่พร้อมใช้งาน
6. **ข้อเสนอแนะจากผู้ใช้**: ให้ข้อเสนอแนะที่ชัดเจนกับผู้ใช้เมื่อเนื้อหาถูกบล็อกเนื่องจากข้อกังวลด้านความปลอดภัย
7. **ปรับปรุงอย่างต่อเนื่อง**: อัปเดตรายการบล็อกและแพทเทิร์นอย่างสม่ำเสมอตามภัยคุกคามที่เกิดขึ้นใหม่

## แหล่งข้อมูลเพิ่มเติม

### คำแนะนำด้านความปลอดภัย OWASP MCP
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - คำแนะนำ OWASP MCP Top 10 ครบถ้วนพร้อมการใช้งาน Azure
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - แพทเทิร์นการบรรเทาการโจมตี prompt injection อย่างละเอียด
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Hands-on Camp 3: I/O Security ครอบคลุมความปลอดภัยเนื้อหา

### เอกสาร Azure
- [ภาพรวม Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [เอกสาร Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## ตอนต่อไป

- กลับไปที่: [Security Module Overview](./README.md)
- ไปต่อที่: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->