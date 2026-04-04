# ความปลอดภัย MCP ขั้นสูงด้วย Azure Content Safety

> **OWASP MCP ความเสี่ยงที่จัดการ**: [MCP06 - การฉีดคำสั่งผ่านน้ำหนักบริบท](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety มีเครื่องมือทรงพลังหลายอย่างที่ช่วยเพิ่มความปลอดภัยให้กับการใช้งาน MCP ของคุณ สำหรับการฝึกปฏิบัติจริง ดูที่ [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ค่าย 3: ความปลอดภัย I/O

## Prompt Shields

Microsoft AI Prompt Shields ให้การป้องกันที่แข็งแกร่งต่อการโจมตีการฉีดคำสั่งโดยตรงและทางอ้อมผ่าน:

1. **การตรวจจับขั้นสูง**: ใช้การเรียนรู้ของเครื่องในการระบุคำสั่งที่เป็นอันตรายที่ฝังอยู่ในเนื้อหา
2. **การเน้นจุด**: แปลงข้อความนำเข้าสำหรับช่วยระบบ AI แยกแยะระหว่างคำสั่งที่ถูกต้องกับข้อมูลภายนอก
3. **ตัวคั่นและการทำเครื่องหมายข้อมูล**: ทำเครื่องหมายขอบเขตระหว่างข้อมูลที่เชื่อถือได้และไม่เชื่อถือได้
4. **การผสานกับ Content Safety**: ทำงานร่วมกับ Azure AI Content Safety เพื่อตรวจจับความพยายามเจลเบรกและเนื้อหาที่เป็นอันตราย
5. **การอัปเดตอย่างต่อเนื่อง**: Microsoft อัปเดตกลไกการป้องกันอย่างสม่ำเสมอเพื่อตอบสนองภัยคุกคามใหม่ๆ

## การใช้งาน Azure Content Safety กับ MCP

แนวทางนี้ให้การป้องกันหลายชั้น:
- สแกนข้อมูลนำเข้าก่อนจัดการ
- ตรวจสอบข้อมูลส่งออกก่อนส่งกลับ
- ใช้บล็อกลิสต์สำหรับรูปแบบที่ทราบว่ามีอันตราย
- ใช้โมเดลความปลอดภัยของ Azure ที่อัปเดตอย่างต่อเนื่อง

## แหล่งข้อมูล Azure Content Safety

เพื่อเรียนรู้เพิ่มเติมเกี่ยวกับการใช้งาน Azure Content Safety กับเซิร์ฟเวอร์ MCP ของคุณ ให้ศึกษาจากแหล่งข้อมูลอย่างเป็นทางการเหล่านี้:

1. [เอกสาร Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - เอกสารทางการสำหรับ Azure Content Safety
2. [เอกสาร Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - เรียนรู้วิธีป้องกันโจมตีการฉีดคำสั่ง
3. [เอกสาร API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - เอกสาร API รายละเอียดสำหรับการใช้งาน Content Safety
4. [เริ่มต้นอย่างรวดเร็ว: Azure Content Safety ด้วย C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - คู่มือการใช้งานอย่างรวดเร็วด้วย C#
5. [ไลบรารีไคลเอนต์ Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - ไลบรารีไคลเอนต์สำหรับภาษาโปรแกรมต่างๆ
6. [การตรวจจับความพยายามเจลเบรก](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - คำแนะนำเฉพาะสำหรับการตรวจจับและป้องกันความพยายามเจลเบรก
7. [แนวทางปฏิบัติที่ดีที่สุดสำหรับ Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - แนวทางปฏิบัติที่ดีที่สุดสำหรับการใช้งาน content safety อย่างมีประสิทธิภาพ

สำหรับแนวทางการใช้งานที่ลึกซึ้งขึ้น ดูที่ [คู่มือการใช้งาน Azure Content Safety](./azure-content-safety-implementation.md)

## ต่อไปนี้คืออะไร

- อ่าน: [การใช้งาน Azure Content Safety](./azure-content-safety-implementation.md)
- กลับไปที่: [ภาพรวมโมดูลความปลอดภัย](./README.md)
- ต่อไปที่: [โมดูล 3: เริ่มต้นใช้งาน](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ข้อจำกัดความรับผิดชอบ**:  
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษาด้วย AI [Co-op Translator](https://github.com/Azure/co-op-translator) ถึงแม้เราจะพยายามให้การแปลถูกต้อง แต่โปรดทราบว่าการแปลอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่แม่นยำ เอกสารต้นฉบับในภาษาดั้งเดิมควรถือเป็นแหล่งข้อมูลที่น่าเชื่อถือที่สุด สำหรับข้อมูลที่สำคัญ ควรใช้บริการแปลโดยมืออาชีพที่เป็นมนุษย์ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการแปลความหมายผิดใด ๆ ที่เกิดจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->