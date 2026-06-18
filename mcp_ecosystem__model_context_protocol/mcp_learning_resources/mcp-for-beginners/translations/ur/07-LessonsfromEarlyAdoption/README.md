# 🌟 ابتدائی صارفین سے سبق

[![ابتدائی MCP صارفین سے سبق](../../../translated_images/ur/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(اس سبق کی ویڈیو دیکھنے کے لیے اوپر تصویر پر کلک کریں)_

## 🎯 اس ماڈیول میں کیا شامل ہے

یہ ماڈیول دکھاتا ہے کہ کس طرح حقیقی تنظیمیں اور ڈویلپرز ماڈل کانٹیکسٹ پروٹوکول (MCP) کو استعمال کرتے ہوئے حقیقی چیلنجز کو حل کر رہے ہیں اور جدت کو بڑھا رہے ہیں۔ تفصیلی کیس اسٹڈیز، عملی منصوبوں، اور عملی مثالوں کے ذریعے، آپ دریافت کریں گے کہ MCP کس طرح محفوظ، توسیع پذیر AI انضمام کو ممکن بناتا ہے جو زبان کے ماڈلز، ٹولز، اور انٹرپرائز ڈیٹا کو مربوط کرتا ہے۔

### 📚 MCP کو عملی طور پر دیکھیں

کیا آپ یہ اصول تیار شدہ آلات میں دیکھنا چاہتے ہیں؟ ہمارے [**10 مائیکروسافٹ MCP سرورز جو ڈویلپر کی کارکردگی بدل رہے ہیں**](microsoft-mcp-servers.md) دیکھیں، جو حقیقی مائیکروسافٹ MCP سرورز پیش کرتے ہیں جنہیں آپ آج استعمال کر سکتے ہیں۔

## خلاصہ

یہ سبق بتاتا ہے کہ ابتدائی صارفین نے کس طرح ماڈل کانٹیکسٹ پروٹوکول (MCP) کو استعمال کر کے حقیقی دنیا کے مسائل حل کیے اور صنعتوں میں جدت کو تقویت دی۔ تفصیلی کیس اسٹڈیز اور عملی منصوبوں کے ذریعے، آپ دیکھیں گے کہ MCP کس طرح معیاری، محفوظ، اور توسیع پذیر AI انضمام کو ممکن بناتا ہے — بڑے زبان ماڈلز، ٹولز، اور انٹرپرائز ڈیٹا کو ایک متحد فریم ورک میں جوڑتا ہے۔ آپ کو MCP کی بنیاد پر حل ڈیزائن اور تعمیر کرنے کا عملی تجربہ حاصل ہوگا، تجربہ شدہ عمل درآمد کے نمونوں سے سیکھیں گے، اور MCP کو پروڈکشن ماحول میں نافذ کرنے کے بہترین طریقے دریافت کریں گے۔ سبق میں ابھرتے ہوئے رجحانات، مستقبل کی راہیں، اور اوپن سورس وسائل بھی شامل ہیں تاکہ آپ MCP ٹیکنالوجی اور اس کے بڑھتے ہوئے ایکو سسٹم کے سامنے رہ سکیں۔

## سیکھنے کے مقاصد

- مختلف صنعتوں میں حقیقی دنیا کے MCP نفاذ کا تجزیہ کرنا
- مکمل MCP پر مبنی ایپلیکیشنز ڈیزائن اور تعمیر کرنا
- MCP ٹیکنالوجی میں ابھرتے ہوئے رجحانات اور مستقبل کی سمتوں کو دریافت کرنا
- حقیقی ترقیاتی صورتوں میں بہترین عمل کو نافذ کرنا

## حقیقی دنیا کے MCP نفاذ

### کیس اسٹڈی 1: انٹرپرائز کسٹمر سپورٹ خودکار نظام

ایک کثیرالقومی کارپوریشن نے MCP پر مبنی حل نافذ کیا تاکہ اپنے کسٹمر سپورٹ سسٹمز میں AI انٹریکشن کو معیاری بنایا جا سکے۔ اس سے انہیں یہ سہولت ملی:

- متعدد LLM فراہم کنندگان کے لیے متحد انٹرفیس تیار کرنا
- محکموں میں مستقل پرامپٹ مینجمنٹ کو برقرار رکھنا
- مضبوط سیکیورٹی اور تعمیل کنٹرول نافذ کرنا
- مخصوص ضروریات کی بنیاد پر مختلف AI ماڈلز کے درمیان آسانی سے تبدیلی کرنا

**تکنیکی نفاذ:**

```python
# کسٹمر سپورٹ کے لیے پائتھن ایم سی پی سرور کی عملی تشکیل
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# لاگنگ کی ترتیب کریں
logging.basicConfig(level=logging.INFO)

async def main():
    # سرور کی ترتیب بنائیں
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # ایم سی پی سرور کا آغاز کریں
    server = create_server(config)
    
    # علم کے ذخیرے کے ذرائع رجسٹر کریں
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # پرامپٹ ٹیمپلیٹس رجسٹر کریں
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # سپورٹ ٹولز رجسٹر کریں
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # HTTP ٹرانسپورٹ کے ساتھ سرور شروع کریں
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```

**نتائج:** ماڈل کی لاگت میں 30% کمی، جواب کی مطابقت میں 45% بہتری، اور عالمی آپریشنز میں تعمیل کی بہتر صورتحال۔

### کیس اسٹڈی 2: ہیلتھ کیئر تشخیصی معاون

ایک ہیلتھ کیئر فراہم کرنے والے نے متعدد خصوصی میڈیکل AI ماڈلز کو مربوط کرنے کے لیے MCP انفراسٹرکچر بنایا، جبکہ مریض کے حساس ڈیٹا کو محفوظ رکھا:

- جنرل اور اسپیشلسٹ میڈیکل ماڈلز کے درمیان بغیر رکاوٹ کی تبدیلی
- سخت پرائیویسی کنٹرول اور آڈیٹ ٹریلز
- موجودہ الیکٹرانک ہیلتھ ریکارڈ (EHR) سسٹمز کے ساتھ انضمام
- طبی اصطلاحات کے لیے مستقل پرامپٹ انجنئرنگ

**تکنیکی نفاذ:**

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

**نتائج:** ڈاکٹروں کے لیے بہتر تشخیصی تجاویز، مکمل HIPAA تعمیل، اور سسٹمز کے درمیان سیاق و سباق کی تبدیلی میں نمایاں کمی۔

### کیس اسٹڈی 3: مالی خدمات رسک تجزیہ

ایک مالیاتی ادارے نے MCP کو مختلف محکموں میں اپنے رسک تجزیہ کے عمل کو معیاری بنانے کے لیے نافذ کیا:

- کریڈٹ رسک، فراڈ کی شناخت، اور سرمایہ کاری کے رسک ماڈلز کے لیے متحد انٹرفیس تیار کیا
- سخت ایکسیس کنٹرولز اور ماڈل ورژنگ نافذ کی
- تمام AI سفارشات کی آڈٹ ایبلٹی کو یقینی بنایا
- مختلف سسٹمز میں مستقل ڈیٹا فارمیٹنگ برقرار رکھی

**تکنیکی نفاذ:**

```java
// مالیاتی خطرے کے جائزے کے لیے جاوا ایم سی پی سرور
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // مالیاتی تعمیل کی خصوصیات کے ساتھ ایم سی پی سرور بنائیں
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

**نتائج:** تعلیمی تعمیل میں بہتری، ماڈل کے تعیناتی چکروں میں 40% تیزی، اور محکموں میں رسک کے جائزے کی مستقل مزاجی میں بہتری۔

### کیس اسٹڈی 4: مائیکروسافٹ پلے رائٹ MCP سرور براؤزر آٹومیشن کے لیے

مائیکروسافٹ نے [پلے رائٹ MCP سرور](https://github.com/microsoft/playwright-mcp) تیار کیا تاکہ ماڈل کانٹیکسٹ پروٹوکول کے ذریعے محفوظ، معیاری براؤزر آٹومیشن ممکن بنائی جا سکے۔ یہ تیار شدہ سرور AI ایجنٹس اور LLMs کو ویب براؤزرز کے ساتھ ایک قابل کنٹرول، قابل آڈٹ اور قابل توسیع انداز میں انٹریکٹ کرنے کی اجازت دیتا ہے — جیسے خودکار ویب ٹیسٹنگ، ڈیٹا استخراج، اور مکمل ورک فلو کی سہولت فراہم کرنا۔

> **🎯 تیار شدہ پروڈکشن ٹول**
> 
> یہ کیس اسٹڈی ایک حقیقی MCP سرور پیش کرتی ہے جسے آپ آج استعمال کر سکتے ہیں! پلے رائٹ MCP سرور اور دیگر 9 مائیکروسافٹ MCP سرورز کے بارے میں مزید جاننے کے لیے ہمارے [**مائیکروسافٹ MCP سرورز گائیڈ**](microsoft-mcp-servers.md#8--playwright-mcp-server) کو دیکھیں۔

**اہم خصوصیات:**  
- براؤزر آٹومیشن فیچرز (نیویگیشن، فارم بھرنا، اسکرین شاٹ، وغیرہ) MCP ٹولز کے طور پر پیش کرتا ہے  
- غیر مجاز کارروائیوں کو روکنے کے لیے سخت ایکسیس کنٹرولز اور سینڈ باکسنگ نافذ کرتا ہے  
- تمام براؤزر تعاملات کے لیے تفصیلی آڈٹ لوگ فراہم کرتا ہے  
- Azure OpenAI اور دیگر LLM فراہم کنندگان کے ساتھ انضمام کی حمایت کرتا ہے تاکہ ایجنٹ پر مبنی آٹومیشن ممکن ہو  
- GitHub کوپائلٹ کے کوڈنگ ایجنٹ کو ویب براؤزنگ کی صلاحیتیں فراہم کرتا ہے  

**تکنیکی نفاذ:**

```typescript
// ٹائپ اسکرپٹ: MCP سرور میں پلے رائٹ براؤزر آٹومیشن ٹولز کو رجسٹر کرنا
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// یو آر ایل پر نیویگیٹ کرنے اور اسکرین شاٹ لینے کے لیے ایک ٹول رجسٹر کریں
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

// MCP سرور شروع کریں
server.listen(8080);
```

**نتائج:**

- AI ایجنٹس اور LLMs کے لیے محفوظ، پروگراماتی براؤزر آٹومیشن کو فعال کیا  
- دستی ٹیسٹنگ کی محنت کو کم کیا اور ویب ایپلیکیشنز کے لیے ٹیسٹ کوریج میں بہتری لائی  
- انٹرپرائز ماحولیات میں براؤزر پر مبنی ٹول انضمام کے لیے ایک قابل استعمال اور توسیع پذیر فریم ورک مہیا کیا  
- GitHub کوپائلٹ کی ویب براؤزنگ صلاحیتوں کو طاقت دی  

**حوالہ جات:**

- [Playwright MCP Server GitHub ذخیرہ](https://github.com/microsoft/playwright-mcp)  
- [مائیکروسافٹ AI اور آٹومیشن حل](https://azure.microsoft.com/en-us/products/ai-services/)  

### کیس اسٹڈی 5: Azure MCP – انٹرپرائز گریڈ ماڈل کانٹیکسٹ پروٹوکول بطور خدمت

Azure MCP سرور ([https://aka.ms/azmcp](https://aka.ms/azmcp)) ماڈل کانٹیکسٹ پروٹوکول کا مائیکروسافٹ کا مکمل، انٹرپرائز گریڈ نافذ ہے، جو ایک کلاؤڈ سروس کے طور پر قابل توسیع، محفوظ، اور تعمیل شدہ MCP سرور صلاحیتیں فراہم کرتا ہے۔ Azure MCP تنظیموں کو تیزی سے MCP سرور تعینات، انتظام کرنے، اور Azure AI، ڈیٹا، اور سیکیورٹی خدمات کے ساتھ مربوط کرنے کی سہولت دیتا ہے، آپریشنل بوجھ کو کم کرتا ہے اور AI کے اپنانے کی رفتار بڑھاتا ہے۔

> **🎯 تیار شدہ پروڈکشن ٹول**  
> 
> یہ ایک حقیقی MCP سرور ہے جسے آپ آج استعمال کر سکتے ہیں! مائیکروسافٹ فاؤنڈری MCP سرور کے بارے میں مزید جاننے کے لیے ہمارے [**مائیکروسافٹ MCP سرورز گائیڈ**](microsoft-mcp-servers.md) کو دیکھیں۔

- مکمل منظم MCP سرور ہوسٹنگ، جس میں بلٹ ان اسکیلنگ، مانیٹرنگ، اور سیکیورٹی شامل ہے  
- Azure OpenAI، Azure AI سرچ، اور دیگر Azure خدمات کے ساتھ مقامی انضمام  
- Microsoft Entra ID کے ذریعے انٹرپرائز تصدیق اور اجازت  
- حسب ضرورت ٹولز، پرامپٹ ٹیمپلیٹس، اور ریسورس کنیکٹرز کی حمایت  
- انٹرپرائز سیکیورٹی اور ضوابط کے ساتھ تعمیل  

**تکنیکی نفاذ:**

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

**نتائج:**  
- انٹرپرائز AI منصوبوں کے لیے ویلیو ٹو ٹائم کو کم کیا، ایک تیار شدہ، تعمیل شدہ MCP سرور پلیٹ فارم فراہم کر کے  
- LLMs، ٹولز، اور انٹرپرائز ڈیٹا ذرائع کو آسانی سے مربوط کیا  
- MCP کام کاج کی سیکیورٹی، مشاہدے، اور آپریشنل کارکردگی کو بہتر بنایا  
- Azure SDK کے بہترین طریقوں اور موجودہ تصدیقی طریقوں سے کوڈ کی کوالٹی کو بہتر بنایا  

**حوالہ جات:**  
- [Azure MCP دستاویزات](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub ذخیرہ](https://github.com/Azure/azure-mcp)  
- [Azure AI خدمات](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP سینٹر](https://mcp.azure.com)  

## کیس اسٹڈی 6: NLWeb  
MCP (ماڈل کانٹیکسٹ پروٹوکول) چیٹ بوٹس اور AI اسسٹنٹس کے لیے اوزار کے ساتھ بات چیت کرنے کا ایک ابھرتا ہوا پروٹوکول ہے۔ ہر NLWeb مثال بھی ایک MCP سرور ہے، جو ایک بنیادی طریقہ ask کو سپورٹ کرتا ہے، جو کسی ویب سائٹ سے قدرتی زبان میں سوال کرنے کے لیے استعمال ہوتا ہے۔ واپسی جواب schema.org کا استعمال کرتا ہے، جو ویب ڈیٹا کو بیان کرنے کے لیے وسیع پیمانے پر استعمال ہونے والا لغوی نظام ہے۔ بنیادی طور پر، MCP NLWeb کی طرح ہے جس طرح Http HTML ہے۔ NLWeb پروٹوکولز، Schema.org فارمیٹس، اور نمونہ کوڈ کو یکجا کرتا ہے تاکہ سائٹس تیزی سے ان اینڈپوائنٹس بنا سکیں، جو بات چیت کے ماحول کے ذریعے انسانوں اور ایجنٹ سے ایجنٹ قدرتی تعامل کے ذریعے مشینوں دونوں کے لیے فائدہ مند ہے۔

NLWeb کے دو مختلف اجزاء ہیں:  
- ایک پروٹوکول، جو تاریخ کے لحاظ سے بہت آسان ہے، جو قدرتی زبان میں سائٹ کے ساتھ انٹرفیس کے لیے ہے اور ایک فارمیٹ، جو جواب کے لیے json اور schema.org کا استعمال کرتا ہے۔ REST API پر مزید معلومات کے لیے دستاویزات دیکھیں۔  
- (1) کا ایک سیدھا سادا نفاذ جو موجودہ مارک اپ کو استعمال کرتا ہے، ان سائٹس کے لیے جو مصنوعات، ترکیبیں، سیاحتی مقامات، جائزے، وغیرہ کی فہرست کے طور پر خلاصہ کی جا سکتی ہیں۔ یوزر انٹرفیس ویجٹس کے ساتھ مل کر، سائٹس آسانی سے اپنے مواد کے لیے بات چیت کے انٹرفیس مہیا کر سکتی ہیں۔ Life of a chat query کی دستاویزات میں تفصیل سے وضاحت موجود ہے کہ یہ کیسے کام کرتا ہے۔  

**حوالہ جات:**  
- [Azure MCP دستاویزات](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)  

### کیس اسٹڈی 7: مائیکروسافٹ فاؤنڈری MCP سرور – انٹرپرائز AI ایجنٹ انضمام

مائیکروسافٹ فاؤنڈری MCP سرورز دکھاتے ہیں کہ MCP کو کیسے AI ایجنٹس اور ورک فلو کو انٹرپرائز ماحولیات میں مربوط اور منظم کرنے کے لیے استعمال کیا جا سکتا ہے۔ MCP کو مائیکروسافٹ فاؤنڈری کے ساتھ انٹیگریٹ کر کے، تنظیمیں ایجنٹ انٹریکشن کو معیاری بنا سکتی ہیں، فاؤنڈری کے ورک فلو مینجمنٹ کا فائدہ اٹھا سکتی ہیں، اور محفوظ، توسیع پذیر تعیناتی کو یقینی بنا سکتی ہیں۔

> **🎯 تیار شدہ پروڈکشن ٹول**  
> 
> یہ ایک حقیقی MCP سرور ہے جسے آپ آج استعمال کر سکتے ہیں! مائیکروسافٹ فاؤنڈری MCP سرور کے بارے میں مزید جاننے کے لیے ہمارے [**مائیکروسافٹ MCP سرورز گائیڈ**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server) کو دیکھیں۔

**اہم خصوصیات:**  
- Azure کے AI ایکوسسٹم تک جامع رسائی، جس میں ماڈل کیٹلاگز اور تعیناتی کا انتظام شامل ہے  
- RAG ایپلیکیشنز کے لیے Azure AI سرچ کے ساتھ نالج انڈیکسنگ  
- AI ماڈلز کی کارکردگی اور معیار کی جانچ کے اوزار  
- مائیکروسافٹ فاؤنڈری کیٹلاگ اور لیبارٹریز کے ساتھ اعلیٰ تحقیقی ماڈلز کا انضمام  
- پروڈکشن منظرناموں کے لیے ایجنٹ مینجمنٹ اور جانچ کی صلاحیتیں  

**نتائج:**  
- AI ایجنٹ ورک فلو کی تیز پروٹوٹائپنگ اور مضبوط مانیٹرنگ  
- جدید منظرناموں کے لیے Azure AI خدمات کے ساتھ بے جوڑ انضمام  
- ایجنٹ پائپ لائنز کی تعمیر، تعیناتی، اور مانیٹرنگ کے لیے متحد انٹرفیس  
- انٹرپرائز کے لیے بہتر سیکیورٹی، تعمیل، اور آپریشنل کارکردگی  
- پیچیدہ ایجنٹ پر مبنی عمل کی نگرانی کے ساتھ AI اپنانے میں تیزی  

**حوالہ جات:**  
- [Microsoft Foundry MCP Server GitHub ذخیرہ](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Azure AI Agents کو MCP کے ساتھ ضم کرنا (Microsoft Foundry بلاگ)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  

### کیس اسٹڈی 8: فاؤنڈری MCP پلے گراؤنڈ – تجربات اور پروٹوٹائپنگ

فاؤنڈری MCP پلے گراؤنڈ MCP سرورز اور مائیکروسافٹ فاؤنڈری انضمامات کے تجربے کے لیے تیار شدہ ماحول فراہم کرتا ہے۔ ڈویلپرز تیزی سے AI ماڈلز اور ایجنٹ ورک فلو کا پروٹوٹائپ بنا سکتے ہیں، ٹیسٹ کر سکتے ہیں، اور وہ Microsoft Foundry کیٹلاگ اور لیبارٹریز سے وسائل استعمال کر کے جانچ سکتے ہیں۔ یہ پلیٹ فارم سیٹ اپ کو آسان بناتا ہے، نمونہ پروجیکٹس مہیا کرتا ہے، اور مشترکہ ترقی کی حمایت کرتا ہے، جس سے کم سے کم پیچیدگی کے ساتھ بہترین طریقوں اور نئے منظرناموں کو دریافت کرنا آسان ہوتا ہے۔ یہ ٹیموں کے لیے خاص طور پر مفید ہے جو خیالات کی جانچ، تجربات کا اشتراک، اور سیکھنے کی رفتار تیز کرنا چاہتی ہیں، بغیر پیچیدہ انفراسٹرکچر کی ضرورت کے۔ یہ رکاوٹ کو کم کر کے MCP اور مائیکروسافٹ فاؤنڈری ایکوسسٹم میں جدت اور کمیونٹی شراکت کو فروغ دیتا ہے۔

**حوالہ جات:**

- [Foundry MCP Playground GitHub ذخیرہ](https://github.com/azure-ai-foundry/foundry-mcp-playground)  

### کیس اسٹڈی 9: Microsoft Learn Docs MCP Server – AI کی مدد سے دستاویزات تک رسائی

Microsoft Learn Docs MCP Server ایک کلاؤڈ میزبان سروس ہے جو AI اسسٹنٹس کو Model Context Protocol کے ذریعے آفیشل Microsoft دستاویزات تک حقیقی وقت میں رسائی فراہم کرتی ہے۔ یہ تیار شدہ سرور Microsoft Learn کے جامع ایکوسسٹم سے جڑتا ہے اور تمام آفیشل Microsoft ذرائع میں معنوی تلاش ممکن بناتا ہے۔

> **🎯 تیار شدہ پروڈکشن ٹول**  
> 
> یہ ایک حقیقی MCP سرور ہے جسے آپ آج استعمال کر سکتے ہیں! Microsoft Learn Docs MCP Server کے بارے میں مزید جاننے کے لیے ہمارے [**مائیکروسافٹ MCP سرورز گائیڈ**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server) کو دیکھیں۔

**اہم خصوصیات:**  
- آفیشل Microsoft دستاویزات، Azure ڈاکس، اور Microsoft 365 دستاویزات تک حقیقی وقت کی رسائی  
- اعلیٰ معنوی تلاش کی صلاحیتیں جو سیاق و سباق اور ارادے کو سمجھتی ہیں  
- Microsoft Learn مواد کی اشاعت کے ساتھ ہمیشہ تازہ ترین معلومات  
- Microsoft Learn، Azure دستاویزات، اور Microsoft 365 ذرائع کی جامع کوریج  
- مضامین کے عنوانات اور URLs کے ساتھ 10 اعلیٰ معیار کے مواد کے ٹکڑے فراہم کرتا ہے  

**کیوں اہم ہے:**  
- Microsoft ٹیکنالوجیز کے لئے "پرانی AI معلومات" کا مسئلہ حل کرتا ہے  
- AI اسسٹنٹس کو تازہ ترین .NET، C#، Azure، اور Microsoft 365 خصوصیات تک رسائی دیتا ہے  
- درست کوڈ جنریشن کے لیے معتبر، پہلے فریق کی معلومات فراہم کرتا ہے  
- تیزی سے ترقی کرنے والی Microsoft ٹیکنالوجیز پر کام کرنے والے ڈویلپرز کے لیے ضروری ہے  

**نتائج:**  
- Microsoft ٹیکنالوجیز کے لیے AI جنریٹ کردہ کوڈ کی درستگی میں نمایاں بہتری  
- موجودہ دستاویزات اور بہترین طریقوں کی تلاش میں کم وقت  
- سیاق و سباق سے آگاہ دستاویزات کی بازیابی کے ساتھ ڈویلپر کی پیداواری صلاحیت میں اضافہ  
- IDE چھوڑے بغیر ترقیاتی ورک فلو کے ساتھ بے جوڑ انضمام  

**حوالہ جات:**  
- [Microsoft Learn Docs MCP Server GitHub ذخیرہ](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn دستاویزات](https://learn.microsoft.com/)  

## عملی منصوبے

### منصوبہ 1: ملٹی-پرووائیڈر MCP سرور بنائیں

**مقصد:** ایک MCP سرور تیار کریں جو مخصوص معیار کی بنیاد پر درخواستوں کو متعدد AI ماڈل فراہم کنندگان کی جانب بھیج سکے۔

**ضروریات:**

- تین یا زیادہ مختلف ماڈل فراہم کنندگان کی حمایت (مثلاً OpenAI، Anthropic، مقامی ماڈل)  
- درخواست کے میٹا ڈیٹا کی بنیاد پر روٹنگ کا نظام نافذ کریں  
- فراہم کنندہ کے اسناد کے انتظام کے لیے ترتیب نظام بنائیں  
- کارکردگی اور لاگت کو بہتر بنانے کے لیے کیشنگ شامل کریں  
- استعمال کی نگرانی کے لیے ایک آسان ڈیش بورڈ تیار کریں  

**نفاذ کے مراحل:**

1. بنیادی MCP سرور انفراسٹرکچر قائم کریں  
2. ہر AI ماڈل سروس کے لیے فراہم کنندہ اڈاپٹرز نافذ کریں  
3. درخواست کی خصوصیات کی بنیاد پر روٹنگ لاجک تیار کریں  
4. بار بار آنے والی درخواستوں کے لیے کیشنگ کے نظام شامل کریں  
5. مانیٹرنگ ڈیش بورڈ تیار کریں  
6. مختلف درخواست کے نمونوں کے ساتھ ٹیسٹ کریں  

**ٹیکنالوجیز:** Python (.NET/Java/Python حسب پسند)، کیشنگ کے لیے Redis، اور ڈیش بورڈ کے لیے ایک آسان ویب فریم ورک منتخب کریں۔  

### منصوبہ 2: انٹرپرائز پرامپٹ مینجمنٹ سسٹم

**مقصد:** ایک MCP پر مبنی نظام تیار کریں جو تنظیم بھر میں پرامپٹ ٹیمپلیٹس کو منظم، ورژن کنٹرول، اور تعینات کرے۔
- پرامپٹ ٹیمپلیٹ کے لیے ایک مرکزی ذخیرہ بنائیں  
- ورژننگ اور منظوری کے ورک فلو کو نافذ کریں  
- نمونہ ان پٹس کے ساتھ ٹیمپلیٹ ٹیسٹنگ کی صلاحیتیں بنائیں  
- کردار کی بنیاد پر رسائی کنٹرول تیار کریں  
- ٹیمپلیٹ بازیافت اور تعیناتی کے لیے ایک API بنائیں  

**نفاذ کے مراحل:**  

1. ٹیمپلیٹ ذخیرہ کے لیے ڈیٹا بیس اسکیمہ ڈیزائن کریں  
2. ٹیمپلیٹ CRUD آپریشنز کے لیے بنیادی API بنائیں  
3. ورژننگ سسٹم کو نافذ کریں  
4. منظوری کے ورک فلو کو بنائیں  
5. ٹیسٹنگ فریم ورک تیار کریں  
6. انتظام کے لیے ایک سادہ ویب انٹرفیس بنائیں  
7. MCP سرور کے ساتھ انٹگریٹ کریں  

**ٹیکنالوجیز:** آپ کا منتخب کردہ بیک اینڈ فریم ورک، SQL یا NoSQL ڈیٹابیس، اور انتظامی انٹرفیس کے لیے فرنٹ اینڈ فریم ورک۔  

### پروجیکٹ 3: MCP پر مبنی مواد سازی کا پلیٹ فارم  

**مقصد:** ایک ایسا مواد سازی کا پلیٹ فارم بنانا جو MCP کا استعمال کرتے ہوئے مختلف مواد کی اقسام میں مستقل نتائج فراہم کرے۔  

**ضروریات:**  

- متعدد مواد کے فارمیٹس کی حمایت (بلاگ پوسٹس، سوشل میڈیا، مارکیٹنگ کاپی)  
- ٹیمپلیٹ پر مبنی تیاری اور تخصیص کے اختیارات نافذ کریں  
- مواد کا جائزہ اور رائے کا نظام بنائیں  
- مواد کی کارکردگی کے میٹرکس کو ٹریک کریں  
- مواد کے ورژننگ اور تکرار کی حمایت کریں  

**نفاذ کے مراحل:**  

1. MCP کلائنٹ انفراسٹرکچر قائم کریں  
2. مختلف مواد کی اقسام کے لیے ٹیمپلیٹس بنائیں  
3. مواد کی تیاری کا پائپ لائن تیار کریں  
4. جائزہ کا نظام نافذ کریں  
5. میٹرکس ٹریکنگ سسٹم تیار کریں  
6. ٹیمپلیٹ منیجمنٹ اور مواد سازی کے لیے یوزر انٹرفیس بنائیں  

**ٹیکنالوجیز:** آپ کی پسندیدہ پروگرامنگ زبان، ویب فریم ورک، اور ڈیٹابیس سسٹم۔  

## MCP ٹیکنالوجی کے لیے مستقبل کے رجحانات  

### ابھرتے ہوئے رجحانات  

1. **کثیر الوضعی MCP**  
   - تصاویر، آڈیو اور ویڈیو ماڈلز کے ساتھ MCP کے تعاملات کو معیاری بنانا  
   - کراس-موڈل استدلال کی صلاحیتوں کی ترقی  
   - مختلف حالتوں کے لیے معیاری پرامپٹ فارمیٹس  

2. **وفاقی MCP انفراسٹرکچر**  
   - ایسے تقسیم شدہ MCP نیٹ ورکس جو تنظیموں کے درمیان وسائل کا اشتراک کر سکیں  
   - محفوظ ماڈل شیئرنگ کے لیے معیاری پروٹوکولز  
   - رازداری کا تحفظ کرنے والی کمپیوٹیشنل تکنیکیں  

3. **MCP مارکیٹ پلیسز**  
   - MCP ٹیمپلیٹس اور پلگ انز کے اشتراک اور منیٹائزیشن کے ماحولیاتی نظام  
   - کوالٹی ایشورنس اور سرٹیفیکیشن کے عمل  
   - ماڈل مارکیٹ پلیسز کے ساتھ انضمام  

4. **ایج کمپیوٹنگ کے لئے MCP**  
   - وسائل محدود ایج ڈیوائسز کے لیے MCP معیارات کا انطباق  
   - کم بینڈوڈتھ ماحولیات کے لیے بہتر شدہ پروٹوکولز  
   - IoT ماحولیاتی نظام کے لیے خصوصی MCP نفاذات  

5. **ریگولیٹری فریم ورکس**  
   - ریگولیٹری تعمیل کے لیے MCP توسیعات کی ترقی  
   - معیاری آڈٹ ٹریلز اور وضاحت کے انٹرفیس  
   - ابھرتے ہوئے AI گورننس فریم ورکس کے ساتھ انضمام  

### مائیکروسافٹ کی MCP حل  

مائیکروسافٹ اور ایزور نے کئی اوپن سورس ریپوزٹریز تیار کی ہیں جو ڈیولپرز کو مختلف حالات میں MCP نافذ کرنے میں مدد دیتی ہیں:  

#### Microsoft تنظیم  

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - براؤزر آٹومیشن اور ٹیسٹنگ کے لیے Playwright MCP سرور  
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - OneDrive MCP سرور کا نفاذ، مقامی ٹیسٹنگ اور کمیونٹی تعاون کے لیے  
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb اوپن پروٹوکولز اور متعلقہ اوپن سورس ٹولز کا مجموعہ ہے، جس کا مرکزی مقصد AI ویب کے لیے بنیادی پرت قائم کرنا ہے  

#### Azure-Samples تنظیم  

1. [mcp](https://github.com/Azure-Samples/mcp) - ایزور پر MCP سرورز بنانے اور مربوط کرنے کے لیے نمونے، ٹولز اور وسائل کے لنکس  
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - موجودہ ماڈل کانٹیکسٹ پروٹوکول کی تصریح کے ساتھ توثیق دکھانے والے حوالہ MCP سرورز  
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - ایزور فنکشنز میں ریموٹ MCP سرورز کے نفاذ کے لیے لینڈنگ پیج، زبان مخصوص ریپوز کے لنکس کے ساتھ  
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - ایزور فنکشنز اور پائتھن کا استعمال کرتے ہوئے کسٹم ریموٹ MCP سرورز بنانے اور تعینات کرنے کا کوئیک اسٹارٹ ٹیمپلیٹ  
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - ایزور فنکشنز اور .NET/C# کا استعمال کرتے ہوئے کسٹم ریموٹ MCP سرورز کے لیے کوئیک اسٹارٹ ٹیمپلیٹ  
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - ایزور فنکشنز اور ٹائپ اسکرپٹ کے ذریعے ریموٹ MCP سرورز کے لیے کوئیک اسٹارٹ ٹیمپلیٹ  
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Python استعمال کرتے ہوئے ریموٹ MCP سرورز کے لیے Azure API مینجمنٹ بطور AI گیٹ وے  
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI تجربات جن میں MCP صلاحیتیں شامل ہیں، Azure OpenAI اور AI Foundry کے ساتھ انضمام  

یہ ریپوز مختلف پروگرامنگ زبانوں اور ایزور سروسز کے لیے Model Context Protocol کے ساتھ کام کرنے کے لیے کئی اقسام کی نفاذات، ٹیمپلیٹس، اور وسائل فراہم کرتے ہیں۔ یہ بنیادی سرور نفاذ سے لے کر توثیق، کلاؤڈ تعیناتی، اور انٹرپرائز انضمام کے منظرناموں تک کے مختلف استعمالات کا احاطہ کرتے ہیں۔  

#### MCP وسائل ڈائریکٹری  

سرکاری مائیکروسافٹ MCP ریپوزٹری میں موجود [MCP Resources directory](https://github.com/microsoft/mcp/tree/main/Resources) ایک منتخب مجموعہ ہے جو کہ ماڈل کانٹیکسٹ پروٹوکول سرورز کے لیے نمونہ وسائل، پرامپٹ ٹیمپلیٹس، اور ٹول کی تعریفیں فراہم کرتا ہے۔ یہ ڈائریکٹری ڈیولپرز کو جلدی شروع کرنے میں مدد دینے کے لیے تیار کی گئی ہے، اور MCP پر مبنی حل تیار کرتے وقت بہترین عمل کی پیروی میں معاون ہے، بشمول:  

- **پرامپٹ ٹیمپلیٹس:** عام AI کاموں اور منظرناموں کے لیے تیار استعمال پرامپٹ ٹیمپلیٹس، جو آپ کے MCP سرور نفاذات کے مطابق ڈھالے جا سکتے ہیں۔  
- **ٹول کی تعریفیں:** مختلف MCP سرورز کے درمیان ٹول انضمام اور کال کو معیاری بنانے کے لیے مثالیں اور میٹا ڈیٹا۔  
- **وسائل کے نمونے:** MCP فریم ورک کے اندر ڈیٹا ذرائع، APIs، اور بیرونی خدمات سے کنیکٹ کرنے کے لیے وسائل کی مثالیں۔  
- **حوالہ نفاذات:** عملی نمونے جو دکھاتے ہیں کہ حقیقی دنیا کے MCP پروجیکٹس میں وسائل، پرامپٹس، اور ٹولز کو کیسے منظم اور منظم کیا جائے۔  

یہ وسائل ترقی کو تیز کرتے ہیں، معیاری بنانے کو فروغ دیتے ہیں، اور MCP پر مبنی حل تعمیر اور تعینات کرتے وقت بہترین طریقوں کو یقینی بنانے میں مدد کرتے ہیں۔  

#### MCP وسائل ڈائریکٹری  

- [MCP Resources (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)  

### تحقیقی مواقع  

- MCP فریم ورکس میں موثر پرامپٹ آپٹیمائزیشن تکنیکیں  
- ملٹی ٹینیٹ MCP تعیناتیوں کے لیے سیکیورٹی ماڈلز  
- مختلف MCP نفاذات میں کارکردگی کا بینچ مارکنگ  
- MCP سرورز کے لیے رسمی توثیق کے طریقے  

## نتیجہ  

ماڈل کانٹیکسٹ پروٹوکول (MCP) تیزی سے معیاری، محفوظ، اور انٹر آپریبل AI انضمام کے مستقبل کی شکل دے رہا ہے۔ اس سبق میں کیس اسٹڈیز اور عملی پروجیکٹس کے ذریعے، آپ نے دیکھا کہ ابتدائی اپنانے والے — بشمول مائیکروسافٹ اور ایزور — MCP کا استعمال کر کے حقیقی دنیا کے چیلنجز کو کیسے حل کر رہے ہیں، AI اپنانے کو تیز کر رہے ہیں، اور تعمیل، سیکیورٹی، اور توسیع پذیری یقینی بنا رہے ہیں۔ MCP کا ماڈیولر طریقہ کار تنظیموں کو بڑے لینگویج ماڈلز، ٹولز، اور انٹرپرائز ڈیٹا کو ایک متحد، قابلِ جانچ فریم ورک میں جوڑنے کے قابل بناتا ہے۔ جیسے جیسے MCP ترقی کرتا رہے گا، کمیونٹی میں شامل رہنا، اوپن سورس وسائل کو دریافت کرنا، اور بہترین طریقے اپنانا مضبوط اور مستقبل آموز AI حل بنانے کی کلید ہوگا۔  

## اضافی وسائل  

- [MCP Foundry GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)  
- [Azure AI Agents کو MCP کے ساتھ مربوط کرنا (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  
- [MCP GitHub Repository (Microsoft)](https://github.com/microsoft/mcp)  
- [MCP Resources Directory (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)  
- [MCP Community & Documentation](https://modelcontextprotocol.io/introduction)  
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - سیکیورٹی کے بہترین طریقے  
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
- [Microsoft AI and Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)  

## مشقیں  

1. کیس اسٹڈی میں سے کسی ایک کا تجزیہ کریں اور ایک متبادل نفاذ کا طریقہ تجویز کریں۔  
2. پروجیکٹ کے کسی ایک آئیڈیا کو منتخب کریں اور تفصیلی تکنیکی وضاحت تیار کریں۔  
3. کسی ایسے صنعت کا تحقیق کریں جو کیس اسٹڈی میں شامل نہ ہو اور بیان کریں کہ MCP اس کی مخصوص چیلنجز کو کیسے حل کر سکتا ہے۔  
4. مستقبل کے رجحان میں سے کسی ایک کی تحقیق کریں اور اسے سپورٹ کرنے کے لیے MCP توسیع کا ایک تصور بنائیں۔  

## اگلا کیا ہے  

مزید دریافت کریں: [Microsoft MCP Servers](./microsoft-mcp-servers.md)  

جاری رکھیں: [ماڈیول 8: بہترین طریقے](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->