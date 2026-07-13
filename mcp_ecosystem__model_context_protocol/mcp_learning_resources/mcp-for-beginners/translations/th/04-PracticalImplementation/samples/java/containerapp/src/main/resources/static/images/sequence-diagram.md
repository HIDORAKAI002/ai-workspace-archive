```mermaid
sequenceDiagram
    actor User
    participant WebApp as เว็บแอป<br/>(ContentSafetyController)
    participant SafetyService as บริการความปลอดภัยเนื้อหา
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP Client
    participant McpServer as MCP Calculator Server<br/>(พอร์ต 8080)
    participant CalcService as บริการเครื่องคิดเลข

    %% ปฏิสัมพันธ์ผู้ใช้
    User->>WebApp: ป้อนคำสั่งคำนวณ
    WebApp->>WebApp: สร้าง PromptRequest

    %% การตรวจสอบความปลอดภัยเนื้อหา
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: ตรวจสอบว่าเนื้อหาปลอดภัย<br/>(ความรุนแรง < 2 สำหรับทุกหมวดหมู่)

    %% กระบวนการทำงาน - เนื้อหาปลอดภัย
    alt เนื้อหาปลอดภัย
        SafetyService->>LangChain: ส่งต่อคำสั่งไปยัง Bot.chat()
        LangChain->>McpClient: ประมวลผลคำสั่ง
        McpClient->>McpServer: เรียกเครื่องมือคำนวณที่เหมาะสมผ่าน SSE
        McpServer->>CalcService: ดำเนินการคำนวณ<br/>(บวก, ลบ, คูณ, ฯลฯ)
        CalcService-->>McpServer: ผลลัพธ์การคำนวณ
        McpServer-->>McpClient: ผลลัพธ์การทำงานของเครื่องมือ
        McpClient-->>LangChain: ผลลัพธ์เครื่องมือ
        LangChain-->>SafetyService: การตอบกลับของบอท
        SafetyService-->>WebApp: ส่งคืนแผนที่ผลลัพธ์<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: แสดงผลลัพธ์การคำนวณและข้อมูลความปลอดภัย
    else เนื้อหาไม่ปลอดภัย
        SafetyService-->>WebApp: ส่งคืนแผนที่ผลลัพธ์<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: แสดงคำเตือนความปลอดภัย<br/>(ไม่ดำเนินการคำนวณ)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->