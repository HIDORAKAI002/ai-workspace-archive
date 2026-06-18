# 🌟 บทเรียนจากผู้ใช้งานรายแรก

[![บทเรียนจาก MCP Early Adopters](../../../translated_images/th/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(คลิกที่ภาพด้านบนเพื่อดูวิดีโอบทเรียนนี้)_

## 🎯 โมดูลนี้ครอบคลุมอะไร

โมดูลนี้สำรวจว่าองค์กรและนักพัฒนาจริง ๆ ใช้ประโยชน์จาก Model Context Protocol (MCP) อย่างไรในการแก้ปัญหาที่เกิดขึ้นจริงและขับเคลื่อนนวัตกรรม ผ่านกรณีศึกษาละเอียด โครงการลงมือทำ และตัวอย่างใช้งานจริง คุณจะได้ค้นพบว่า MCP ช่วยให้การเชื่อมต่อ AI อย่างปลอดภัยและขยายขนาดได้ง่าย ซึ่งเชื่อมโยงโมเดลภาษา เครื่องมือ และข้อมูลขององค์กรเข้าด้วยกัน

### 📚 ดู MCP ในการปฏิบัติ

ต้องการดูหลักการเหล่านี้ประยุกต์ใช้กับเครื่องมือที่พร้อมใช้งานจริงหรือไม่? ชม [**10 เซิร์ฟเวอร์ MCP ของ Microsoft ที่เปลี่ยนโฉมประสิทธิภาพนักพัฒนา**](microsoft-mcp-servers.md) ซึ่งแสดงเซิร์ฟเวอร์ MCP ของ Microsoft จริงที่คุณสามารถใช้ได้วันนี้

## ภาพรวม

บทเรียนนี้สำรวจว่า ผู้ใช้งานรายแรกได้นำ Model Context Protocol (MCP) ไปใช้แก้ไขปัญหาจริงและขับเคลื่อนนวัตกรรมในอุตสาหกรรมต่างๆ อย่างไร ผ่านกรณีศึกษาละเอียดและโครงการลงมือทำ คุณจะได้เห็นว่าการใช้ MCP ช่วยให้การรวม AI แบบมาตรฐาน ปลอดภัย และสามารถขยายได้ เชื่อมต่อโมเดลภาษาใหญ่ เครื่องมือ และข้อมูลขององค์กรในกรอบงานที่เป็นเอกภาพ คุณจะได้รับประสบการณ์ปฏิบัติในการออกแบบและสร้างโซลูชันที่ใช้ MCP เรียนรู้รูปแบบการใช้งานที่พิสูจน์แล้ว และค้นพบแนวทางปฏิบัติที่ดีที่สุดสำหรับการนำ MCP ไปใช้ในสภาพแวดล้อมการผลิต บทเรียนยังเน้นแนวโน้มที่กำลังเกิดขึ้น ทิศทางอนาคต และทรัพยากรโอเพนซอร์ส เพื่อช่วยให้คุณก้าวนำเทคโนโลยี MCP และระบบนิเวศที่กำลังพัฒนา

## วัตถุประสงค์การเรียนรู้

- วิเคราะห์การใช้งาน MCP ในโลกจริงในอุตสาหกรรมต่างๆ  
- ออกแบบและสร้างแอปพลิเคชันครบวงจรที่ใช้ MCP  
- สำรวจแนวโน้มที่เกิดขึ้นและทิศทางในอนาคตของเทคโนโลยี MCP  
- นำแนวปฏิบัติที่ดีที่สุดไปใช้ในสถานการณ์พัฒนาจริง

## การใช้งาน MCP ในโลกจริง

### กรณีศึกษา 1: ระบบอัตโนมัติช่วยเหลือลูกค้าขององค์กรขนาดใหญ่

บริษัทข้ามชาติได้นำโซลูชันที่ใช้ MCP ไปใช้เพื่อมาตรฐานการติดต่อ AI ในระบบช่วยเหลือลูกค้าของตน ซึ่งทำให้พวกเขา:

- สร้างอินเตอร์เฟซแบบรวมศูนย์สำหรับผู้ให้บริการ LLM หลายราย  
- รักษาการจัดการ prompt ที่สอดคล้องกันในหลายแผนก  
- นำการรักษาความปลอดภัยและการปฏิบัติตามกฎระเบียบที่เข้มงวดมาใช้  
- เปลี่ยนโมเดล AI ได้อย่างง่ายดายตามความต้องการเฉพาะ

**การใช้งานทางเทคนิค:**

```python
# การติดตั้งเซิร์ฟเวอร์ MCP ของ Python สำหรับการสนับสนุนลูกค้า
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# กำหนดค่าการบันทึกข้อมูล
logging.basicConfig(level=logging.INFO)

async def main():
    # สร้างการกำหนดค่าเซิร์ฟเวอร์
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # เริ่มต้นเซิร์ฟเวอร์ MCP
    server = create_server(config)
    
    # ลงทะเบียนทรัพยากรฐานความรู้
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # ลงทะเบียนแม่แบบคำสั่ง
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # ลงทะเบียนเครื่องมือสนับสนุน
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # เริ่มเซิร์ฟเวอร์ด้วยการขนส่ง HTTP
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```

**ผลลัพธ์:** ลดค่าใช้จ่ายโมเดลลง 30% ปรับปรุงความสม่ำเสมอของการตอบกลับ 45% และเสริมความปลอดภัยการปฏิบัติตามกฎระเบียบทั่วโลก

### กรณีศึกษา 2: ผู้ช่วยวินิจฉัยในระบบสุขภาพ

ผู้ให้บริการด้านสุขภาพได้พัฒนาโครงสร้างพื้นฐาน MCP เพื่อรวมโมเดล AI ทางการแพทย์เฉพาะทางหลายโมเดล ในขณะที่ยังคงปกป้องข้อมูลผู้ป่วยที่ละเอียดอ่อน:

- สลับใช้งานโมเดลแพทย์ทั่วไปและเฉพาะทางได้อย่างราบรื่น  
- ควบคุมความเป็นส่วนตัวอย่างเข้มงวดและมีการตรวจสอบย้อนหลัง  
- รวมเข้ากับระบบบันทึกสุขภาพอิเล็กทรอนิกส์(EHR) ที่มีอยู่  
- การออกแบบ prompt ที่สอดคล้องกับศัพท์ทางการแพทย์

**การใช้งานทางเทคนิค:**

```csharp
// C# MCP host application implementation in healthcare application
using Microsoft.Extensions.DependencyInjection;
using ModelContextProtocol.SDK.Client;
using ModelContextProtocol.SDK.Security;
using ModelContextProtocol.SDK.Resources;

public class DiagnosticAssistant
{
    private readonly MCPHostClient _mcpClient;
    private readonly PatientContext _patientContext;
    
    public DiagnosticAssistant(PatientContext patientContext)
    {
        _patientContext = patientContext;
        
        // Configure MCP client with healthcare-specific settings
        var clientOptions = new ClientOptions
        {
            Name = "Healthcare Diagnostic Assistant",
            Version = "1.0.0",
            Security = new SecurityOptions
            {
                Encryption = EncryptionLevel.Medical,
                AuditEnabled = true
            }
        };
        
        _mcpClient = new MCPHostClientBuilder()
            .WithOptions(clientOptions)
            .WithTransport(new HttpTransport("https://healthcare-mcp.example.org"))
            .WithAuthentication(new HIPAACompliantAuthProvider())
            .Build();
    }
    
    public async Task<DiagnosticSuggestion> GetDiagnosticAssistance(
        string symptoms, string patientHistory)
    {
        // Create request with appropriate resources and tool access
        var resourceRequest = new ResourceRequest
        {
            Name = "patient_records",
            Parameters = new Dictionary<string, object>
            {
                ["patientId"] = _patientContext.PatientId,
                ["requestingProvider"] = _patientContext.ProviderId
            }
        };
        
        // Request diagnostic assistance using appropriate prompt
        var response = await _mcpClient.SendPromptRequestAsync(
            promptName: "diagnostic_assistance",
            parameters: new Dictionary<string, object>
            {
                ["symptoms"] = symptoms,
                patientHistory = patientHistory,
                relevantGuidelines = _patientContext.GetRelevantGuidelines()
            });
            
        return DiagnosticSuggestion.FromMCPResponse(response);
    }
}
```

**ผลลัพธ์:** เสนอคำแนะนำวินิจฉัยที่ดีขึ้นสำหรับแพทย์ พร้อมการปฏิบัติตาม HIPAA เต็มรูปแบบ และลดความจำเป็นในการสลับบริบทระหว่างระบบอย่างมาก

### กรณีศึกษา 3: การวิเคราะห์ความเสี่ยงในบริการทางการเงิน

สถาบันการเงินได้นำ MCP ไปใช้เพื่อมาตรฐานกระบวนการวิเคราะห์ความเสี่ยงในหลายแผนก:

- สร้างอินเตอร์เฟซแบบรวมสำหรับโมเดลความเสี่ยงเครดิต การตรวจจับการฉ้อโกง และความเสี่ยงการลงทุน  
- นำมาตรการควบคุมการเข้าถึงและสำเนียงเวอร์ชันของโมเดลใช้งานจริง  
- ยืนยันการตรวจสอบย้อนหลังทุกคำแนะนำของ AI  
- รักษามาตรฐานข้อมูลสอดคล้องกันในระบบที่หลากหลาย

**การใช้งานทางเทคนิค:**

```java
// เซิร์ฟเวอร์ MCP ของ Java สำหรับการประเมินความเสี่ยงทางการเงิน
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // สร้างเซิร์ฟเวอร์ MCP พร้อมฟีเจอร์การปฏิบัติตามข้อกำหนดทางการเงิน
        MCPServer server = new MCPServerBuilder()
            .withModelProviders(
                new ModelProvider("risk-assessment-primary", new AzureOpenAIProvider()),
                new ModelProvider("risk-assessment-audit", new LocalLlamaProvider())
            )
            .withPromptTemplateDirectory("./compliance/templates")
            .withAccessControls(new SOCCompliantAccessControl())
            .withDataEncryption(EncryptionStandard.FINANCIAL_GRADE)
            .withVersionControl(true)
            .withAuditLogging(new DatabaseAuditLogger())
            .build();
            
        server.addRequestValidator(new FinancialDataValidator());
        server.addResponseFilter(new PII_RedactionFilter());
        
        server.start(9000);
        
        System.out.println("Financial Risk MCP Server running on port 9000");
    }
}
```

**ผลลัพธ์:** ปฏิบัติตามกฎระเบียบดีขึ้น เร็วขึ้น 40% ในรอบการปรับใช้โมเดล และปรับปรุงความสม่ำเสมอของการประเมินความเสี่ยงในทุกแผนก

### กรณีศึกษา 4: Microsoft Playwright MCP Server สำหรับการอัตโนมัติเบราว์เซอร์

Microsoft พัฒนา [Playwright MCP server](https://github.com/microsoft/playwright-mcp) เพื่อเปิดใช้งานการอัตโนมัติเว็บเบราว์เซอร์ที่ปลอดภัยและมาตรฐานผ่าน Model Context Protocol เซิร์ฟเวอร์พร้อมใช้งานนี้ช่วยให้เอเยนต์ AI และ LLM โต้ตอบกับเบราว์เซอร์เว็บได้อย่างควบคุม ตรวจสอบ และขยายขีดความสามารถ — รองรับกรณีการใช้งานเช่นการทดสอบเว็บอัตโนมัติ การดึงข้อมูล และเวิร์กโฟลว์ตั้งแต่ต้นจนจบ

> **🎯 เครื่องมือพร้อมใช้งานจริง**  
> 
> กรณีศึกษานี้แสดงเซิร์ฟเวอร์ MCP จริงที่คุณใช้ได้วันนี้! เรียนรู้เพิ่มเติมเกี่ยวกับ Playwright MCP Server และเซิร์ฟเวอร์ MCP ของ Microsoft อีก 9 ตัวใน [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#8--playwright-mcp-server)

**คุณสมบัติหลัก:**  
- เปิดเผยความสามารถการอัตโนมัติเว็บเบราว์เซอร์ (เช่น การนำทาง กรอกฟอร์ม ถ่ายภาพหน้าจอ ฯลฯ) ในรูปแบบเครื่องมือ MCP  
- นำมาตรการควบคุมการเข้าถึงและการแยกโซนความปลอดภัยอย่างเข้มงวดเพื่อป้องกันการกระทำที่ไม่ได้รับอนุญาต  
- จัดเก็บบันทึกการตรวจสอบฉบับละเอียดสำหรับการโต้ตอบเบราว์เซอร์ทั้งหมด  
- รองรับการรวมกับ Azure OpenAI และผู้ให้บริการ LLM อื่น ๆ สำหรับการอัตโนมัติที่ขับเคลื่อนด้วยเอเยนต์  
- สนับสนุน GitHub Copilot Coding Agent ด้วยความสามารถท่องเว็บ

**การใช้งานทางเทคนิค:**

```typescript
// TypeScript: การลงทะเบียนเครื่องมืออัตโนมัติเบราว์เซอร์ Playwright ในเซิร์ฟเวอร์ MCP
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// ลงทะเบียนเครื่องมือสำหรับการนำทางไปยัง URL และจับภาพหน้าจอ
server.tools.register(
  new ToolDefinition({
    name: 'navigate_and_screenshot',
    description: 'Navigate to a URL and capture a screenshot',
    parameters: {
      url: { type: 'string', description: 'The URL to visit' }
    }
  }),
  async ({ url }) => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    return { screenshot };
  }
);

// เริ่มเซิร์ฟเวอร์ MCP
server.listen(8080);
```

**ผลลัพธ์:**

- เปิดใช้งานการอัตโนมัติเว็บเบราว์เซอร์แบบโปรแกรมที่ปลอดภัยสำหรับเอเยนต์ AI และ LLM  
- ลดความพยายามในการทดสอบด้วยมือและปรับปรุงความครอบคลุมการทดสอบสำหรับแอปพลิเคชันเว็บ  
- ให้กรอบงานที่นำกลับมาใช้ซ้ำและขยายได้สำหรับการรวมเครื่องมือเว็บเบสในสภาพแวดล้อมองค์กร  
- ขับเคลื่อนความสามารถการท่องเว็บของ GitHub Copilot

**เอกสารอ้างอิง:**

- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)  
- [Microsoft AI and Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)

### กรณีศึกษา 5: Azure MCP – Model Context Protocol ระดับองค์กรในรูปแบบบริการ

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) คือการใช้งาน Model Context Protocol ระดับองค์กรที่ Microsoft ดูแลและบริหารจัดการแบบครบวงจร ออกแบบมาเพื่อให้เซิร์ฟเวอร์ MCP ที่ขยายและปลอดภัยในรูปแบบบริการคลาวด์ Azure MCP ช่วยให้องค์กรสามารถปรับใช้ จัดการ และรวมเซิร์ฟเวอร์ MCP กับบริการ AI ข้อมูล และความปลอดภัยของ Azure ได้อย่างรวดเร็ว ลดภาระการดำเนินงานและเร่งการนำ AI ไปใช้

> **🎯 เครื่องมือพร้อมใช้งานจริง**  
> 
> นี่คือเซิร์ฟเวอร์ MCP จริงที่คุณใช้ได้วันนี้! เรียนรู้เพิ่มเติมเกี่ยวกับ Microsoft Foundry MCP Server ใน [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md).

- โฮสต์เซิร์ฟเวอร์ MCP ที่มีการจัดการเต็มรูปแบบพร้อมการสเกล การตรวจสอบ และความปลอดภัยในตัว  
- รวมระบบกับ Azure OpenAI, Azure AI Search และบริการ Azure อื่น ๆ อย่างเนทีฟ  
- การรับรองและการอนุญาตระดับองค์กรผ่าน Microsoft Entra ID  
- รองรับเครื่องมือที่กำหนดเอง, เทมเพลต prompt, และตัวเชื่อมต่อทรัพยากร  
- ปฏิบัติตามข้อกำหนดความปลอดภัยและกฎระเบียบสำหรับองค์กร

**การใช้งานทางเทคนิค:**

```yaml
# Example: Azure MCP server deployment configuration (YAML)
apiVersion: mcp.microsoft.com/v1
kind: McpServer
metadata:
  name: enterprise-mcp-server
spec:
  modelProviders:
    - name: azure-openai
      type: AzureOpenAI
      endpoint: https://<your-openai-resource>.openai.azure.com/
      apiKeySecret: <your-azure-keyvault-secret>
  tools:
    - name: document_search
      type: AzureAISearch
      endpoint: https://<your-search-resource>.search.windows.net/
      apiKeySecret: <your-azure-keyvault-secret>
  authentication:
    type: EntraID
    tenantId: <your-tenant-id>
  monitoring:
    enabled: true
    logAnalyticsWorkspace: <your-log-analytics-id>
```

**ผลลัพธ์:**  
- ลดเวลาสู่คุณค่าของโครงการ AI ระดับองค์กรโดยการเสนอแพลตฟอร์มเซิร์ฟเวอร์ MCP ที่พร้อมใช้งานและมีการปฏิบัติตามมาตรฐาน  
- ทำให้ง่ายขึ้นในการรวม LLM เครื่องมือ และแหล่งข้อมูลขององค์กร  
- ปรับปรุงความปลอดภัย การสังเกต และประสิทธิภาพการดำเนินงานสำหรับงาน MCP  
- ปรับปรุงคุณภาพโค้ดด้วยแนวปฏิบัติที่ดีที่สุดของ Azure SDK และรูปแบบการรับรองความถูกต้องปัจจุบัน

**เอกสารอ้างอิง:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)  
- [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)

## กรณีศึกษา 6: NLWeb  
MCP (Model Context Protocol) คือโพรโตคอลที่กำลังเติบโตสำหรับ Chatbots และผู้ช่วย AI ในการโต้ตอบกับเครื่องมือ ทุกอินสแตนซ์ของ NLWeb ยังเป็นเซิร์ฟเวอร์ MCP ซึ่งรองรับเมธอดหลักหนึ่งเดียวคือ ask ซึ่งใช้ถามคำถามกับเว็บไซต์ในภาษาแบบธรรมชาติ คำตอบที่ส่งกลับจะใช้ schema.org ซึ่งเป็นพจนานุกรมที่ใช้กันอย่างแพร่หลายสำหรับการอธิบายข้อมูลบนเว็บ กล่าวโดยง่าย MCP เป็น NLWeb ในลักษณะเดียวกับที่ Http เป็นกับ HTML NLWeb รวมโพรโตคอล รูปแบบ Schema.org และโค้ดตัวอย่างเพื่อช่วยให้เว็บไซต์สร้างเอ็นด์พอยต์เหล่านี้อย่างรวดเร็ว ประโยชน์ทั้งกับมนุษย์ผ่านอินเตอร์เฟซการสนทนา และกับเครื่องจักรผ่านการโต้ตอบแบบเอเยนต์ต่อเอเยนต์แบบธรรมชาติ

มีส่วนประกอบสองส่วนที่แยกกันใน NLWeb  
- โพรโตคอลที่เริ่มต้นง่ายมาก สำหรับการเชื่อมต่อกับไซต์ในภาษาธรรมชาติ และรูปแบบที่ใช้ json และ schema.org สำหรับคำตอบที่ส่งกลับ ดูเอกสาร API REST สำหรับรายละเอียดเพิ่มเติม  
- การใช้งานที่ตรงไปตรงมาในข้อ (1) ที่ใช้ประโยชน์จากมาร์กอัปที่มีอยู่ สำหรับเว็บไซต์ที่สามารถสรุปเป็นรายการรายการต่าง ๆ (สินค้า, สูตรอาหาร, สถานที่ท่องเที่ยว, รีวิว ฯลฯ) พร้อมกับชุดวิดเจ็ตอินเตอร์เฟซผู้ใช้ เว็บไซต์สามารถให้บริการอินเตอร์เฟซสนทนาแก่เนื้อหาของพวกเขาได้อย่างง่ายดาย ดูเอกสาร Life of a chat query สำหรับรายละเอียดว่าทำงานอย่างไร

**เอกสารอ้างอิง:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### กรณีศึกษา 7: Microsoft Foundry MCP Server – การรวมเอเจนต์ AI ระดับองค์กร

เซิร์ฟเวอร์ Microsoft Foundry MCP แสดงให้เห็นว่า MCP สามารถใช้สำหรับจัดการและประสานงานเอเจนต์ AI และเวิร์กโฟลว์ในสภาพแวดล้อมองค์กรอย่างไร โดยที่ผู้ใช้งานผสาน MCP กับ Microsoft Foundry องค์กรต่าง ๆ สามารถมาตรฐานการโต้ตอบของเอเจนต์ ใช้ประโยชน์จากการจัดการเวิร์กโฟลว์ของ Foundry และมั่นใจได้ว่าการนำเข้าจัดการที่ปลอดภัยและสามารถขยายได้

> **🎯 เครื่องมือพร้อมใช้งานจริง**  
> 
> นี่คือเซิร์ฟเวอร์ MCP จริงที่คุณใช้ได้วันนี้! เรียนรู้เพิ่มเติมเกี่ยวกับ Microsoft Foundry MCP Server ใน [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server)

**คุณสมบัติหลัก:**  
- การเข้าถึงอย่างครอบคลุมสู่ระบบนิเวศ AI ของ Azure รวมถึงแคตตาล็อกโมเดลและการจัดการการปรับใช้  
- การจัดทำดัชนีความรู้ด้วย Azure AI Search สำหรับแอปพลิเคชัน RAG  
- เครื่องมือประเมินประสิทธิภาพและความน่าเชื่อถือของโมเดล AI  
- รวมเข้าด้วยกันกับ Microsoft Foundry Catalog และ Labs สำหรับโมเดลวิจัยล้ำสมัย  
- ความสามารถในการจัดการและประเมินเอเจนต์สำหรับสถานการณ์การผลิต

**ผลลัพธ์:**  
- การสร้างต้นแบบอย่างรวดเร็วและการตรวจสอบการทำงานของเวิร์กโฟลว์เอเจนต์อย่างเข้มงวด  
- การรวมอย่างไร้รอยต่อกับบริการ AI ของ Azure สำหรับสถานการณ์ขั้นสูง  
- อินเตอร์เฟซแบบรวมสำหรับสร้าง ปรับใช้ และตรวจสอบสายงานเอเจนต์  
- ปรับปรุงความปลอดภัย การปฏิบัติตามกฎ และประสิทธิภาพการดำเนินงานสำหรับองค์กร  
- เร่งการนำ AI ไปใช้ในขณะที่ควบคุมกระบวนการที่ซับซ้อนที่ขับเคลื่อนด้วยเอเจนต์

**เอกสารอ้างอิง:**  
- [Microsoft Foundry MCP Server GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### กรณีศึกษา 8: Foundry MCP Playground – การทดลองและต้นแบบ

Foundry MCP Playground มีสภาพแวดล้อมพร้อมใช้งานสำหรับทดลองเซิร์ฟเวอร์ MCP และการรวม Microsoft Foundry นักพัฒนาสามารถสร้างต้นแบบ ทดสอบ และประเมินโมเดล AI และเวิร์กโฟลว์เอเจนต์ได้อย่างรวดเร็วโดยใช้ทรัพยากรจาก Microsoft Foundry Catalog และ Labs สนามเล่นนี้ช่วยลดขั้นตอนการตั้งค่า มีตัวอย่างโครงการ และสนับสนุนการพัฒนาร่วมกัน ทำให้ง่ายต่อการสำรวจแนวปฏิบัติที่ดีที่สุดและสถานการณ์ใหม่โดยมีภาระงานต่ำ เหมาะอย่างยิ่งสำหรับทีมที่ต้องการตรวจสอบไอเดีย แบ่งปันการทดลอง และเร่งการเรียนรู้โดยไม่ต้องใช้โครงสร้างพื้นฐานซับซ้อน สนามเล่นนี้ช่วยส่งเสริมนวัตกรรมและการมีส่วนร่วมของชุมชนในระบบนิเวศ MCP และ Microsoft Foundry

**เอกสารอ้างอิง:**

- [Foundry MCP Playground GitHub Repository](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### กรณีศึกษา 9: Microsoft Learn Docs MCP Server – การเข้าถึงเอกสารด้วย AI

Microsoft Learn Docs MCP Server คือบริการโฮสต์บนคลาวด์ที่ช่วยให้ผู้ช่วย AI เข้าถึงเอกสารทางการของ Microsoft ได้แบบเรียลไทม์ผ่าน Model Context Protocol เซิร์ฟเวอร์พร้อมใช้งานนี้เชื่อมต่อกับระบบนิเวศ Microsoft Learn อย่างกว้างขวางและเปิดใช้งานการค้นหาเชิงความหมายข้ามแหล่งข้อมูลทางการของ Microsoft ทั้งหมด

> **🎯 เครื่องมือพร้อมใช้งานจริง**  
> 
> นี่คือเซิร์ฟเวอร์ MCP จริงที่คุณใช้ได้วันนี้! เรียนรู้เพิ่มเติมเกี่ยวกับ Microsoft Learn Docs MCP Server ใน [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server)

**คุณสมบัติหลัก:**  
- เข้าถึงเอกสารทางการของ Microsoft, เอกสาร Azure, และเอกสาร Microsoft 365 แบบเรียลไทม์  
- ความสามารถค้นหาเชิงความหมายขั้นสูงที่เข้าใจบริบทและเจตนา  
- ข้อมูลอัปเดตล่าสุดเสมอเนื่องจากเนื้อหา Microsoft Learn มีการเผยแพร่ต่อเนื่อง  
- ครอบคลุมทั่ว Microsoft Learn, เอกสาร Azure และแหล่งข้อมูล Microsoft 365  
- คืนข้อมูลสูงสุด 10 ชิ้นเนื้อหาคุณภาพสูงพร้อมชื่อบทความและ URL

**เหตุผลที่สำคัญ:**  
- แก้ปัญหาความรู้ AI ที่ล้าสมัยสำหรับเทคโนโลยี Microsoft  
- ทำให้ผู้ช่วย AI เข้าถึงฟีเจอร์ล่าสุดของ .NET, C#, Azure และ Microsoft 365  
- ให้ข้อมูลที่น่าเชื่อถือและเป็นแหล่งแรกสำหรับการสร้างโค้ดที่ถูกต้อง  
- จำเป็นสำหรับนักพัฒนาที่ทำงานกับเทคโนโลยี Microsoft ที่เปลี่ยนแปลงรวดเร็ว

**ผลลัพธ์:**  
- ปรับปรุงความแม่นยำของโค้ด AI ที่สร้างสำหรับเทคโนโลยี Microsoft อย่างมาก  
- ลดเวลาการค้นหาเอกสารปัจจุบันและแนวปฏิบัติที่ดีที่สุด  
- เสริมประสิทธิภาพการทำงานของนักพัฒนาด้วยการดึงเอกสารที่เข้าใจบริบท  
- รวมเข้ากับเวิร์กโฟลว์การพัฒนาได้อย่างไร้รอยต่อโดยไม่ต้องออกจาก IDE

**เอกสารอ้างอิง:**  
- [Microsoft Learn Docs MCP Server GitHub Repository](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn Documentation](https://learn.microsoft.com/)

## โครงการลงมือทำ

### โครงการ 1: สร้างเซิร์ฟเวอร์ MCP หลายผู้ให้บริการ

**วัตถุประสงค์:** สร้างเซิร์ฟเวอร์ MCP ที่สามารถส่งคำร้องขอไปยังผู้ให้บริการโมเดล AI หลายรายตามเกณฑ์ที่กำหนด

**ข้อกำหนด:**

- รองรับผู้ให้บริการโมเดลอย่างน้อยสามราย (เช่น OpenAI, Anthropic, โมเดลภายในองค์กร)  
- นำกลไกการกำหนดเส้นทางตามเมตาดาต้าของคำร้องขอ  
- สร้างระบบการจัดการคอนฟิกสำหรับจัดการข้อมูลประจำตัวผู้ให้บริการ  
- เพิ่มแคชเพื่อเพิ่มประสิทธิภาพและลดค่าใช้จ่าย  
- สร้างแดชบอร์ดง่าย ๆ สำหรับตรวจสอบการใช้งาน

**ขั้นตอนการใช้งาน:**

1. ตั้งค่าโครงสร้างพื้นฐานเซิร์ฟเวอร์ MCP เบื้องต้น  
2. พัฒนาตัวแปลงผู้ให้บริการสำหรับแต่ละบริการโมเดล AI  
3. สร้างตรรกะกำหนดเส้นทางตามแอตทริบิวต์ของคำร้อง  
4. เพิ่มกลไกแคชสำหรับคำร้องที่พบบ่อย  
5. พัฒนาแดชบอร์ดตรวจสอบ  
6. ทดสอบด้วยรูปแบบคำร้องหลากหลาย

**เทคโนโลยี:** เลือกใช้ Python (.NET/Java/Python ตามความชอบ), Redis สำหรับแคช, และเว็บเฟรมเวิร์กง่าย ๆ สำหรับแดชบอร์ด

### โครงการ 2: ระบบจัดการ Prompt สำหรับองค์กร

**วัตถุประสงค์:** พัฒนาระบบที่ใช้ MCP สำหรับจัดการ เวอร์ชัน และปรับใช้เทมเพลต prompt ทั่วทั้งองค์กร

**ข้อกำหนด:**
- สร้างคลังกลางสำหรับแม่แบบพรอมต์
- นำระบบจัดการเวอร์ชันและเวิร์กโฟลว์อนุมัติ
- สร้างความสามารถในการทดสอบแม่แบบด้วยอินพุตตัวอย่าง
- พัฒนาการควบคุมการเข้าถึงตามบทบาท
- สร้าง API สำหรับดึงข้อมูลและนำแม่แบบไปใช้งาน

**ขั้นตอนการดำเนินการ:**

1. ออกแบบโครงสร้างฐานข้อมูลสำหรับเก็บแม่แบบ
2. สร้าง API หลักสำหรับการดำเนินการ CRUD กับแม่แบบ
3. นำระบบจัดการเวอร์ชันไปใช้
4. สร้างเวิร์กโฟลว์อนุมัติ
5. พัฒนากรอบการทดสอบ
6. สร้างอินเทอร์เฟซเว็บง่าย ๆ สำหรับการจัดการ
7. ผสานรวมกับเซิร์ฟเวอร์ MCP

**เทคโนโลยี:** เลือกใช้เฟรมเวิร์ก backend, ฐานข้อมูล SQL หรือ NoSQL และเฟรมเวิร์ก frontend สำหรับอินเทอร์เฟซการจัดการตามที่คุณต้องการ

### โครงการที่ 3: แพลตฟอร์มสร้างเนื้อหาบนพื้นฐาน MCP

**วัตถุประสงค์:** สร้างแพลตฟอร์มสร้างเนื้อหาที่ใช้ MCP เพื่อให้ผลลัพธ์ที่สอดคล้องกันในหลากหลายรูปแบบเนื้อหา

**ข้อกำหนด:**

- รองรับหลายรูปแบบเนื้อหา (โพสต์บล็อก โซเชียลมีเดีย ข้อความการตลาด)
- นำการสร้างเนื้อหาบนพื้นฐานแม่แบบพร้อมตัวเลือกการปรับแต่ง
- สร้างระบบตรวจสอบและให้ข้อเสนอแนะเนื้อหา
- ติดตามตัวชี้วัดประสิทธิภาพของเนื้อหา
- รองรับการจัดการเวอร์ชันและการพัฒนาเนื้อหา

**ขั้นตอนการดำเนินการ:**

1. ตั้งค่าระบบโครงสร้างพื้นฐานไคลเอนต์ MCP
2. สร้างแม่แบบสำหรับรูปแบบเนื้อหาต่าง ๆ
3. สร้างสายงานการสร้างเนื้อหา
4. นำระบบตรวจสอบมาใช้
5. พัฒนาระบบติดตามตัวชี้วัด
6. สร้างอินเทอร์เฟซผู้ใช้สำหรับการจัดการแม่แบบและการสร้างเนื้อหา

**เทคโนโลยี:** เลือกภาษาโปรแกรม เฟรมเวิร์กเว็บ และระบบฐานข้อมูลที่คุณถนัด

## ทิศทางอนาคตของเทคโนโลยี MCP

### แนวโน้มที่เกิดขึ้น

1. **MCP หลายรูปแบบ**
   - ขยาย MCP เพื่อมาตรฐานการโต้ตอบกับโมเดลรูปภาพ เสียง และวิดีโอ
   - พัฒนาความสามารถในการให้เหตุผลข้ามรูปแบบ
   - รูปแบบพรอมต์มาตรฐานสำหรับหลายสื่อ

2. **โครงสร้างพื้นฐาน MCP แบบสหกรณ์**
   - เครือข่าย MCP แบบกระจายที่สามารถแชร์ทรัพยากรข้ามองค์กร
   - โปรโตคอลมาตรฐานสำหรับการแชร์โมเดลอย่างปลอดภัย
   - เทคนิคการประมวลผลที่คำนึงถึงความเป็นส่วนตัว

3. **ตลาด MCP**
   - ระบบนิเวศสำหรับแชร์และสร้างรายได้จากแม่แบบและปลั๊กอิน MCP
   - กระบวนการตรวจสอบคุณภาพและการรับรอง
   - การผสานรวมกับตลาดโมเดล

4. **MCP สำหรับ Edge Computing**
   - ปรับมาตรฐาน MCP สำหรับอุปกรณ์ Edge ที่มีทรัพยากรจำกัด
   - โปรโตคอลที่ถูกปรับแต่งสำหรับสภาพแวดล้อมแบนด์วิดท์ต่ำ
   - การใช้งาน MCP เฉพาะทางสำหรับระบบนิเวศ IoT

5. **กรอบการกำกับดูแล**
   - พัฒนา MCP ขยายเพื่อให้สอดคล้องกับข้อกำหนดของกฎหมาย
   - เส้นทางตรวจสอบและอินเทอร์เฟซอธิบายผลที่เป็นมาตรฐาน
   - ผสานกับกรอบการกำกับดูแล AI ที่เกิดขึ้นใหม่

### โซลูชัน MCP จากไมโครซอฟท์

ไมโครซอฟท์และ Azure ได้พัฒนาคลังโค้ดโอเพนซอร์สหลายรายการเพื่อช่วยนักพัฒนาในการใช้งาน MCP ในสถานการณ์ต่าง ๆ:

#### องค์กร Microsoft

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - เซิร์ฟเวอร์ Playwright MCP สำหรับการทดสอบและอัตโนมัติบนเบราว์เซอร์
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - การใช้งานเซิร์ฟเวอร์ MCP บน OneDrive สำหรับการทดสอบในเครื่องและชุมชน
3. [NLWeb](https://github.com/microsoft/NlWeb) - ชุดโปรโตคอลเปิดและเครื่องมือโอเพนซอร์สที่เน้นการสร้างฐานสำหรับ AI Web

#### องค์กร Azure-Samples

1. [mcp](https://github.com/Azure-Samples/mcp) - ลิงก์ไปยังตัวอย่าง เครื่องมือ และทรัพยากรสำหรับสร้างและผสานรวม MCP เซิร์ฟเวอร์บน Azure ด้วยหลายภาษา
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - เซิร์ฟเวอร์ MCP ตัวอย่างที่แสดงการยืนยันตัวตนตามข้อกำหนด Model Context Protocol ปัจจุบัน
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - หน้าเริ่มต้นสำหรับการใช้งาน Remote MCP Server บน Azure Functions พร้อมลิงก์ไปยังรีโปภาษาเฉพาะ
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - เทมเพลตเริ่มต้นอย่างรวดเร็วสำหรับการสร้างและใช้งาน Remote MCP Server โดยใช้ Azure Functions กับ Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - เทมเพลตเริ่มต้นอย่างรวดเร็วสำหรับการสร้างและใช้งาน Remote MCP Server โดยใช้ Azure Functions กับ .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - เทมเพลตเริ่มต้นอย่างรวดเร็วสำหรับการสร้างและใช้งาน Remote MCP Server โดยใช้ Azure Functions กับ TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - การจัดการ API Azure ในฐานะประตูทางเข้า AI ไปยัง Remote MCP servers โดยใช้ Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - การทดลอง APIM ❤️ AI รวมถึงความสามารถของ MCP รวมกับ Azure OpenAI และ AI Foundry

คลังโค้ดเหล่านี้ให้การใช้งานต่าง ๆ แม่แบบ และทรัพยากรสำหรับการทำงานกับ Model Context Protocol ในหลายภาษาโปรแกรมและบริการของ Azure ครอบคลุมตั้งแต่การใช้งานเซิร์ฟเวอร์พื้นฐานถึงการยืนยันตัวตน การใช้งานบนคลาวด์ และการผสานรวมองค์กร

#### ไดเรกทอรีทรัพยากร MCP

[ไดเรกทอรี MCP Resources](https://github.com/microsoft/mcp/tree/main/Resources) ในรีโพ Microsoft MCP อย่างเป็นทางการมีการรวบรวมตัวอย่างทรัพยากร แม่แบบพรอมต์ และคำจำกัดความเครื่องมือที่ผ่านการคัดสรรเพื่อใช้กับเซิร์ฟเวอร์ Model Context Protocol โดยไดเรกทอรีนี้ถูกออกแบบมาเพื่อช่วยให้นักพัฒนาสามารถเริ่มต้นใช้งาน MCP ได้อย่างรวดเร็วโดยนำเสนอก้อนส่วนประกอบที่ใช้ซ้ำได้และตัวอย่างแนวทางปฏิบัติที่ดีที่สุดสำหรับ:

- **แม่แบบพรอมต์:** แม่แบบพรอมต์ใช้งานได้ทันทีสำหรับงาน AI ทั่วไปและสถานการณ์ต่าง ๆ สามารถปรับใช้สำหรับใช้งานกับเซิร์ฟเวอร์ MCP ของคุณเอง
- **คำจำกัดความเครื่องมือ:** ตัวอย่างสกีมาและเมทาดาทาของเครื่องมือเพื่อมาตรฐานการผสานรวมและเรียกใช้งานเครื่องมือใน MCP เซิร์ฟเวอร์ต่าง ๆ
- **ตัวอย่างทรัพยากร:** คำจำกัดความทรัพยากรตัวอย่างสำหรับการเชื่อมต่อไปยังแหล่งข้อมูล API และบริการภายนอกในกรอบ MCP
- **ตัวอย่างการใช้งานอ้างอิง:** ตัวอย่างการใช้งานจริงที่แสดงวิธีการจัดโครงสร้างและจัดเรียงทรัพยากร พรอมต์ และเครื่องมือในโปรเจกต์ MCP จากโลกความเป็นจริง

ทรัพยากรเหล่านี้ช่วยเร่งการพัฒนาส่งเสริมมาตรฐาน และช่วยรับประกันแนวทางปฏิบัติที่ดีที่สุดเมื่อสร้างและนำโซลูชันพื้นฐาน MCP ไปใช้งาน

#### ไดเรกทอรีทรัพยากร MCP

- [ทรัพยากร MCP (ตัวอย่างพรอมต์ เครื่องมือ และคำจำกัดความทรัพยากร)](https://github.com/microsoft/mcp/tree/main/Resources)

### โอกาสด้านการวิจัย

- เทคนิคที่มีประสิทธิภาพในการเพิ่มประสิทธิภาพพรอมต์ในกรอบ MCP
- แบบจำลองความปลอดภัยสำหรับการใช้งาน MCP แบบผู้หลายราย
- การวัดประสิทธิภาพเปรียบเทียบระหว่างการใช้งาน MCP ต่าง ๆ
- วิธีการตรวจสอบทางการของเซิร์ฟเวอร์ MCP

## สรุป

Model Context Protocol (MCP) กำลังเป็นตัวกำหนดอนาคตของการบูรณาการ AI ที่เป็นมาตรฐาน ปลอดภัย และสามารถทำงานร่วมกันได้อย่างกว้างขวางในหลายอุตสาหกรรม จากกรณีศึกษาและโครงการในบทเรียนนี้ คุณได้เห็นว่าผู้ใช้งานในช่วงแรก—รวมถึง Microsoft และ Azure—กำลังใช้ MCP เพื่อแก้ปัญหาโลกจริง เร่งการนำ AI ไปใช้ และรับประกันความสอดคล้อง ความปลอดภัย และความสามารถในการขยาย ระบบแบบโมดูลของ MCP ช่วยให้องค์กรเชื่อมต่อโมเดลภาษาใหญ่ เครื่องมือ และข้อมูลองค์กรในกรอบงานที่รวมศูนย์และตรวจสอบได้ เมื่อ MCP ยังคงพัฒนา การมีส่วนร่วมกับชุมชน สำรวจทรัพยากรโอเพนซอร์ส และนำแนวทางปฏิบัติที่ดีที่สุดไปใช้จะเป็นกุญแจสำคัญในการสร้างโซลูชัน AI ที่แข็งแกร่งและพร้อมสำหรับอนาคต

## แหล่งข้อมูลเพิ่มเติม

- [MCP Foundry GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [รวม Azure AI Agents กับ MCP (บล็อก Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub Repository (Microsoft)](https://github.com/microsoft/mcp)
- [ไดเรกทอรีทรัพยากร MCP (ตัวอย่างพรอมต์ เครื่องมือ และคำจำกัดความทรัพยากร)](https://github.com/microsoft/mcp/tree/main/Resources)
- [ชุมชนและเอกสาร MCP](https://modelcontextprotocol.io/introduction)
- [สเปค MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [เอกสาร Azure MCP](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - แนวทางปฏิบัติด้านความปลอดภัยที่ดีที่สุด
- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [โซลูชัน AI และ Automation ของ Microsoft](https://azure.microsoft.com/en-us/products/ai-services/)

## แบบฝึกหัด

1. วิเคราะห์หนึ่งในกรณีศึกษาและเสนอแนวทางการดำเนินการแบบทางเลือก
2. เลือกหนึ่งในไอเดียโครงการและสร้างข้อกำหนดทางเทคนิคอย่างละเอียด
3. วิจัยอุตสาหกรรมที่ไม่ได้ถูกกล่าวถึงในกรณีศึกษาและสรุปว่าทำไม MCP จะช่วยแก้ปัญหาเฉพาะได้อย่างไร
4. สำรวจหนึ่งในทิศทางอนาคตและสร้างแนวคิดสำหรับการขยาย MCP ใหม่เพื่อรองรับทิศทางนั้น

## ต่อไป

สำรวจเพิ่มเติม: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

ดำเนินการต่อ: [โมดูล 8: แนวปฏิบัติที่ดีที่สุด](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->