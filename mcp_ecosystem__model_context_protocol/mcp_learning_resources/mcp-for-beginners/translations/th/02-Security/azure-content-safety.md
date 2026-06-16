# ความปลอดภัย MCP ขั้นสูงด้วย Azure Content Safety

> **OWASP MCP ความเสี่ยงที่แก้ไข**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety มีเครื่องมือที่ทรงพลังหลายอย่างที่สามารถเสริมความปลอดภัยให้กับการใช้งาน MCP ของคุณ สำหรับประสบการณ์การใช้งานเชิงปฏิบัติ ดูที่ [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ค่าย 3: I/O Security

## Prompt Shields

Prompt Shields ของ Microsoft AI มอบการป้องกันที่แข็งแกร่งต่อการโจมตี prompt injection ทั้งแบบตรงและแบบอ้อมโดย:

1. **การตรวจจับขั้นสูง**: ใช้การเรียนรู้ของเครื่องเพื่อระบุคำสั่งที่เป็นอันตรายที่ซ่อนอยู่ในเนื้อหา
2. **Spotlighting**: แปลงข้อความป้อนเข้าเพื่อช่วยให้ระบบ AI แยกแยะระหว่างคำสั่งที่ถูกต้องกับข้อมูลภายนอก
3. **ตัวแบ่งขอบเขตและการทำเครื่องหมายข้อมูล**: ทำเครื่องหมายขอบเขตระหว่างข้อมูลที่เชื่อถือได้และไม่ได้เชื่อถือ
4. **การรวม Content Safety**: ทำงานร่วมกับ Azure AI Content Safety เพื่อตรวจจับความพยายาม jailbreak และเนื้อหาที่เป็นอันตราย
5. **การอัปเดตอย่างต่อเนื่อง**: Microsoft อัปเดตกลไกป้องกันอย่างสม่ำเสมอเพื่อรับมือกับภัยคุกคามใหม่ ๆ

## การใช้งาน Azure Content Safety กับ MCP

แนวทางนี้ให้การป้องกันหลายชั้น:
- การสแกนข้อมูลป้อนเข้าก่อนประมวลผล
- การตรวจสอบความถูกต้องของผลลัพธ์ก่อนส่งกลับ
- การใช้บล็อกลิสต์สำหรับรูปแบบที่ทราบว่ามีอันตราย
- ใช้โมเดลความปลอดภัยเนื้อหาของ Azure ที่ได้รับการอัปเดตอย่างต่อเนื่อง

## แหล่งข้อมูล Azure Content Safety

เพื่อเรียนรู้เพิ่มเติมเกี่ยวกับการใช้ Azure Content Safety กับเซิร์ฟเวอร์ MCP ของคุณ โปรดดูแหล่งข้อมูลอย่างเป็นทางการเหล่านี้:

1. [เอกสาร Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - เอกสารอย่างเป็นทางการสำหรับ Azure Content Safety
2. [เอกสาร Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - เรียนรู้วิธีป้องกันการโจมตี prompt injection
3. [เอกสารอ้างอิง Content Safety API](https://learn.microsoft.com/rest/api/contentsafety/) - เอกสารอ้างอิง API สำหรับการใช้งาน Content Safety อย่างละเอียด
4. [เริ่มต้นอย่างรวดเร็ว: Azure Content Safety กับ C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - คู่มือการใช้งานอย่างรวดเร็วโดยใช้ C#
5. [ไลบรารีไคลเอนต์ Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - ไลบรารีไคลเอนต์สำหรับภาษาการเขียนโปรแกรมต่าง ๆ
6. [การตรวจจับความพยายาม jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - คำแนะนำเฉพาะสำหรับการตรวจจับและป้องกันความพยายาม jailbreak
7. [แนวทางปฏิบัติที่ดีที่สุดสำหรับ Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - แนวทางปฏิบัติที่ดีที่สุดสำหรับการใช้งานความปลอดภัยของเนื้อหาอย่างมีประสิทธิภาพ

สำหรับการใช้งานที่ลึกขึ้น ดูคู่มือ [Azure Content Safety Implementation](./azure-content-safety-implementation.md)

## สิ่งต่อไป

- อ่าน: [การใช้งาน Azure Content Safety](./azure-content-safety-implementation.md)
- กลับไปที่: [ภาพรวมโมดูลความปลอดภัย](./README.md)
- ดำเนินการต่อที่: [โมดูล 3: เริ่มต้นใช้งาน](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->