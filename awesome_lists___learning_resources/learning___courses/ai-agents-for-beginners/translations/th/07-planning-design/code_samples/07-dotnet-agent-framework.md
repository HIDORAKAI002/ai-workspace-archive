# 🎯 การวางแผน & รูปแบบการออกแบบด้วย Azure OpenAI (Responses API) (.NET)

## 📋 วัตถุประสงค์การเรียนรู้

โน้ตบุ๊กนี้แสดงรูปแบบการวางแผนและการออกแบบระดับองค์กรสำหรับการสร้างตัวแทนอัจฉริยะโดยใช้ Microsoft Agent Framework ใน .NET กับ Azure OpenAI (Responses API) คุณจะได้เรียนรู้วิธีสร้างตัวแทนที่สามารถแยกปัญหาที่ซับซ้อน วางแผนการแก้ปัญหาหลายขั้นตอน และดำเนินเวิร์กโฟลว์ที่ซับซ้อนโดยใช้ฟีเจอร์องค์กรของ .NET

## ⚙️ ความต้องการเบื้องต้นและการตั้งค่า

**สภาพแวดล้อมการพัฒนา:**
- .NET 9.0 SDK หรือสูงกว่า
- Visual Studio 2022 หรือ VS Code พร้อมส่วนขยาย C#
- การสมัครใช้งาน Azure ที่มีทรัพยากร Azure OpenAI และการปรับใช้โมเดล
- Azure CLI — ลงชื่อเข้าสู่ระบบด้วย `az login`

**ไลบรารีที่จำเป็น:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**การกำหนดค่าสภาพแวดล้อม (ไฟล์ .env):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## การรันโค้ด

บทเรียนนี้รวมถึงการใช้งานแอป .NET แบบไฟล์เดี่ยว เพื่อรัน:

```bash
# ทำให้ไฟล์สามารถรันได้ (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# รันแอปพลิเคชัน
./07-dotnet-agent-framework.cs
```

หรือใช้คำสั่ง dotnet run:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## การใช้งานโค้ด

การใช้งานครบถ้วนอยู่ใน `07-dotnet-agent-framework.cs` ซึ่งแสดง:

- การโหลดการกำหนดค่าสภาพแวดล้อมด้วย DotNetEnv
- การกำหนดค่าไคลเอนต์ Azure OpenAI และการสร้างตัวแทนอัจฉริยะด้วย `GetChatClient().AsAIAgent()`
- การกำหนดโมเดลข้อมูลที่มีโครงสร้าง (Plan และ TravelPlan) พร้อมการซีเรียลไลซ์ JSON
- การสร้างตัวแทนอัจฉริยะที่มีผลลัพธ์แบบโครงสร้างด้วย JSON schema
- การส่งคำขอการวางแผนด้วยการตอบสนองแบบปลอดภัยตามชนิดข้อมูล

## แนวคิดหลัก

### การวางแผนเชิงโครงสร้างด้วยโมเดลที่ปลอดภัยตามชนิดข้อมูล

ตัวแทนใช้คลาส C# เพื่อกำหนดโครงสร้างของผลลัพธ์การวางแผน:

```csharp
public class Plan
{
    [JsonPropertyName("assigned_agent")]
    public string? Assigned_agent { get; set; }

    [JsonPropertyName("task_details")]
    public string? Task_details { get; set; }
}

public class TravelPlan
{
    [JsonPropertyName("main_task")]
    public string? Main_task { get; set; }

    [JsonPropertyName("subtasks")]
    public IList<Plan> Subtasks { get; set; }
}
```

### JSON Schema สำหรับผลลัพธ์แบบโครงสร้าง

ตัวแทนถูกกำหนดให้ส่งกลับการตอบสนองที่สอดคล้องกับสคีมา TravelPlan:

```csharp
ChatClientAgentOptions agentOptions = new()
{
    Name = AGENT_NAME,
    Description = AGENT_INSTRUCTIONS,
    ChatOptions = new()
    {
        ResponseFormat = ChatResponseFormatJson.ForJsonSchema(
            schema: AIJsonUtilities.CreateJsonSchema(typeof(TravelPlan)),
            schemaName: "TravelPlan",
            schemaDescription: "Travel Plan with main_task and subtasks")
    }
};
```

### คำแนะนำสำหรับตัวแทนวางแผน

ตัวแทนทำหน้าที่เป็นผู้ประสานงาน โดยมอบหมายงานให้กับตัวแทนย่อยเฉพาะทาง:

- FlightBooking: สำหรับจองเที่ยวบินและให้ข้อมูลเที่ยวบิน
- HotelBooking: สำหรับจองโรงแรมและให้ข้อมูลโรงแรม
- CarRental: สำหรับจองรถยนต์และให้ข้อมูลการเช่ารถ
- ActivitiesBooking: สำหรับจองกิจกรรมและให้ข้อมูลกิจกรรม
- DestinationInfo: สำหรับให้ข้อมูลเกี่ยวกับจุดหมายปลายทาง
- DefaultAgent: สำหรับจัดการคำขอทั่วไป

## ผลลัพธ์ที่คาดหวัง

เมื่อคุณรันตัวแทนด้วยคำขอวางแผนการเดินทาง มันจะวิเคราะห์คำขอและสร้างแผนที่มีโครงสร้างพร้อมมอบหมายงานอย่างเหมาะสมให้กับตัวแทนเฉพาะทางต่างๆ โดยจัดรูปแบบเป็น JSON ที่ตรงตามสคีมา TravelPlan

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->