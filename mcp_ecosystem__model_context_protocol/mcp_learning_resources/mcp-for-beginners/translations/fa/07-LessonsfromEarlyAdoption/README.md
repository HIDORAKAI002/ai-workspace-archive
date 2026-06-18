# 🌟 درس‌هایی از پیش‌گامان اولیه

[![درس‌هایی از پیش‌گامان اولیه MCP](../../../translated_images/fa/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(برای مشاهده ویدئو این درس روی تصویر بالا کلیک کنید)_

## 🎯 موضوعات تحت پوشش این ماژول

این ماژول بررسی می‌کند که چگونه سازمان‌ها و توسعه‌دهندگان واقعی از پروتکل مدل کانتکست (MCP) برای حل چالش‌های واقعی و پیشبرد نوآوری استفاده می‌کنند. از طریق مطالعات موردی دقیق، پروژه‌های عملی و مثال‌های کاربردی، خواهید آموخت که چگونه MCP امکان ادغام ایمن و مقیاس‌پذیر هوش مصنوعی که مدل‌های زبان، ابزارها و داده‌های سازمانی را به هم متصل می‌کند، فراهم می‌آورد.

### 📚 مشاهده MCP در عمل

می‌خواهید این اصول را در ابزارهای آماده تولید ببینید؟ به [**۱۰ سرور MCP مایکروسافت که بهره‌وری توسعه‌دهندگان را متحول می‌کنند**](microsoft-mcp-servers.md) نگاهی بیندازید که سرورهای واقعی MCP مایکروسافت را که می‌توانید امروز از آنها استفاده کنید، نمایش می‌دهد.

## مرور کلی

این درس بررسی می‌کند که پیش‌گامان اولیه چگونه از پروتکل مدل کانتکست (MCP) برای حل چالش‌های دنیای واقعی و پیشبرد نوآوری در صنایع مختلف استفاده کرده‌اند. از طریق مطالعات موردی دقیق و پروژه‌های عملی، خواهید دید که MCP چگونه ادغام یکپارچه، امن و مقیاس‌پذیر هوش مصنوعی را ممکن می‌سازد — اتصال مدل‌های بزرگ زبانی، ابزارها و داده‌های سازمانی در یک چارچوب یکپارچه. شما تجربه عملی در طراحی و ساخت راه‌حل‌های مبتنی بر MCP کسب خواهید کرد، از الگوهای اثبات‌شده پیاده‌سازی خواهید آموخت و بهترین روش‌ها برای استقرار MCP در محیط‌های تولید را کشف خواهید کرد. این درس همچنین روندهای نوظهور، جهت‌گیری‌های آینده و منابع متن‌باز را برای کمک به پیشروی شما در فناوری MCP و اکوسیستم در حال تحول آن برجسته می‌کند.

## اهداف یادگیری

- تحلیل پیاده‌سازی‌های واقعی MCP در صنایع مختلف
- طراحی و ساخت کامل برنامه‌های مبتنی بر MCP
- بررسی روندهای نوظهور و جهت‌گیری‌های آینده در فناوری MCP
- اعمال بهترین شیوه‌ها در سناریوهای واقعی توسعه

## پیاده‌سازی‌های واقعی MCP

### مطالعه موردی ۱: خودکارسازی پشتیبانی مشتری سازمانی

یک شرکت چندملیتی راه‌حلی مبتنی بر MCP برای استانداردسازی تعاملات هوش مصنوعی در سراسر سیستم‌های پشتیبانی مشتری خود پیاده‌سازی کرد. این امکان را برای آنها فراهم کرد تا:

- یک رابط یکپارچه برای چندین ارائه‌دهنده مدل زبان بزرگ ایجاد کنند
- مدیریت درخواست‌ها را در بخش‌ها به طور یکنواخت حفظ کنند
- کنترل‌های امنیتی و انطباق قوی برقرار کنند
- به آسانی بین مدل‌های مختلف هوش مصنوعی بر اساس نیازهای خاص جابجا شوند

**پیاده‌سازی فنی:**

```python
# پیاده‌سازی سرور MCP پایتون برای پشتیبانی مشتری
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# پیکربندی لاگ‌ها
logging.basicConfig(level=logging.INFO)

async def main():
    # ایجاد پیکربندی سرور
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # مقداردهی اولیه سرور MCP
    server = create_server(config)
    
    # ثبت منابع پایگاه دانش
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # ثبت قالب‌های پرسش
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # ثبت ابزارهای پشتیبانی
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # شروع سرور با انتقال HTTP
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**نتایج:** کاهش ۳۰٪ در هزینه‌های مدل، بهبود ۴۵٪ در ثبات پاسخ و افزایش انطباق در عملیات جهانی.

### مطالعه موردی ۲: دستیار تشخیص سلامت

یک ارائه‌دهنده خدمات سلامت زیرساخت MCP را توسعه داد تا چندین مدل تخصصی هوش مصنوعی پزشکی را به هم ادغام کند و در عین حال داده‌های حساس بیماران را محافظت نماید:

- جابجایی بی‌وقفه بین مدل‌های پزشکی عمومی و تخصصی  
- کنترل‌های شدید حفظ حریم خصوصی و ردگیری حسابرسی  
- ادغام با سیستم‌های پرونده الکترونیکی سلامت (EHR) موجود  
- مهندسی درخواست یکنواخت برای اصطلاحات پزشکی  

**پیاده‌سازی فنی:**

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
  
**نتایج:** بهبود پیشنهادات تشخیصی برای پزشکان در حالی که کامل با الزامات HIPAA مطابقت داشت و کاهش قابل توجه جابجایی بین سیستم‌ها.

### مطالعه موردی ۳: تحلیل ریسک خدمات مالی

یک موسسه مالی MCP را برای استانداردسازی فرآیندهای تحلیل ریسک خود در بخش‌های مختلف پیاده‌سازی کرد:

- ایجاد یک رابط یکپارچه برای مدل‌های ریسک اعتباری، تشخیص تقلب و ریسک سرمایه‌گذاری  
- اعمال کنترل‌های دسترسی دقیق و نسخه‌بندی مدل  
- تضمین قابلیت حسابرسی تمامی توصیه‌های هوش مصنوعی  
- حفظ قالب‌دهی داده‌ها به طور یکنواخت در سیستم‌های متنوع  

**پیاده‌سازی فنی:**

```java
// سرور MCP جاوا برای ارزیابی ریسک مالی
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // ایجاد سرور MCP با ویژگی‌های تطابق مالی
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
  
**نتایج:** ارتقاء انطباق با مقررات، ۴۰٪ سرعت بیشتر در چرخه‌های استقرار مدل و بهبود ثبات ارزیابی ریسک در بخش‌ها.

### مطالعه موردی ۴: سرور MCP مایکروسافت Playwright برای اتوماسیون مرورگر

مایکروسافت سرور [Playwright MCP](https://github.com/microsoft/playwright-mcp) را برای امکان‌پذیر ساختن اتوماسیون مرورگر امن و استاندارد شده از طریق پروتکل مدل کانتکست توسعه داد. این سرور آماده تولید به عوامل هوش مصنوعی و مدل‌های زبان بزرگ امکان می‌دهد تا با مرورگرهای وب به صورت کنترل‌شده، قابل حسابرسی و قابل گسترش تعامل کنند — کاربردهایی مانند آزمون وب اتوماتیک، استخراج داده و جریان‌های کاری انتها به انتها را ممکن می‌سازد.

> **🎯 ابزار آماده تولید**  
>  
> این مطالعه موردی یک سرور واقعی MCP را که می‌توانید امروز استفاده کنید، نشان می‌دهد! برای اطلاعات بیشتر درباره سرور Playwright MCP و ۹ سرور MCP آماده تولید مایکروسافت دیگر به [**راهنمای سرورهای MCP مایکروسافت**](microsoft-mcp-servers.md#8--playwright-mcp-server) مراجعه کنید.

**ویژگی‌های کلیدی:**  
- ارائه قابلیت‌های اتوماسیون مرورگر (ناوبری، پر کردن فرم، گرفتن اسکرین‌شات و غیره) به عنوان ابزارهای MCP  
- اجرای کنترل‌های سختگیرانه دسترسی و ایزولاسیون برای جلوگیری از اقدامات غیرمجاز  
- ارائه لاگ‌های حسابرسی دقیق برای تمامی تعاملات مرورگر  
- پشتیبانی از ادغام با Azure OpenAI و سایر ارائه‌دهندگان مدل زبان برای اتوماسیون مبتنی بر عامل  
- فراهم‌آوردن توانایی وب‌گردی برای عامل کدنویسی GitHub Copilot  

**پیاده‌سازی فنی:**

```typescript
// تایپ‌اسکریپت: ثبت ابزارهای اتوماسیون مرورگر Playwright در سرور MCP
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// ثبت یک ابزار برای ناوبری به URL و گرفتن عکس صفحه
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

// شروع سرور MCP
server.listen(8080);
```
  
**نتایج:**  
- امکان اتوماسیون برنامه‌ریزی شده و امن مرورگر برای عوامل هوش مصنوعی و مدل‌های زبان بزرگ  
- کاهش تلاش آزمون دستی و بهبود پوشش آزمون برای برنامه‌های وب  
- ارائه چارچوب قابل استفاده مجدد و گسترش‌پذیر برای ادغام ابزارهای مبتنی بر مرورگر در محیط‌های سازمانی  
- قدرت‌بخشیدن به قابلیت‌های وب‌گردی GitHub Copilot  

**مراجع:**  
- [مخزن GitHub سرور Playwright MCP](https://github.com/microsoft/playwright-mcp)  
- [راهکارهای هوش مصنوعی و اتوماسیون مایکروسافت](https://azure.microsoft.com/en-us/products/ai-services/)

### مطالعه موردی ۵: Azure MCP – پروتکل مدل کانتکست سطح سازمانی به عنوان سرویس

سرور Azure MCP ([https://aka.ms/azmcp](https://aka.ms/azmcp)) پیاده‌سازی مدیریت‌شده و سطح سازمانی مایکروسافت از پروتکل مدل کانتکست است که برای ارائه قابلیت‌های سرور MCP مقیاس‌پذیر، امن و منطبق به صورت سرویس ابری طراحی شده است. Azure MCP به سازمان‌ها امکان می‌دهد سرورهای MCP را به سرعت مستقر، مدیریت و با خدمات Azure AI، داده و امنیت ادغام کنند، که موجب کاهش بار عملیات و تسریع پذیرش هوش مصنوعی می‌شود.

> **🎯 ابزار آماده تولید**  
>  
> این یک سرور MCP واقعی است که می‌توانید امروز استفاده کنید! اطلاعات بیشتر راجع به سرور Microsoft Foundry MCP را در [**راهنمای سرورهای MCP مایکروسافت**](microsoft-mcp-servers.md) بیابید.

- میزبانی سرور MCP کاملاً مدیریت‌شده همراه با مقیاس‌بندی، نظارت و امنیت تعبیه‌شده  
- ادغام بومی با Azure OpenAI، Azure AI Search و سایر خدمات Azure  
- احراز هویت و مجوزدهی سازمانی از طریق Microsoft Entra ID  
- پشتیبانی از ابزارهای سفارشی، قالب‌های پرسش و اتصالات منابع  
- انطباق با الزامات امنیتی و مقررات سازمانی  

**پیاده‌سازی فنی:**

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
  
**نتایج:**  
- کاهش زمان رسیدن به ارزش در پروژه‌های هوش مصنوعی سازمانی با فراهم کردن پلتفرم سرور MCP آماده استفاده و مطمئن  
- ساده‌سازی ادغام مدل‌های زبان، ابزارها و منابع داده سازمانی  
- ارتقاء امنیت، مشاهده‌پذیری و کارایی عملیاتی برای بارهای کاری MCP  
- بهبود کیفیت کد با بهترین شیوه‌های SDK Azure و الگوهای احراز هویت فعلی  

**مراجع:**  
- [مستندات Azure MCP](https://aka.ms/azmcp)  
- [مخزن GitHub سرور Azure MCP](https://github.com/Azure/azure-mcp)  
- [خدمات هوش مصنوعی Azure](https://azure.microsoft.com/en-us/products/ai-services/)  
- [مرکز MCP مایکروسافت](https://mcp.azure.com)

## مطالعه موردی ۶: NLWeb  
MCP (پروتکل مدل کانتکست) پروتکلی نوپا برای تعامل چت‌بات‌ها و دستیاران هوش مصنوعی با ابزارهاست. هر نمونه از NLWeb نیز یک سرور MCP است که از یک روش اصلی، ask، پشتیبانی می‌کند که برای طرح سوال به یک وب‌سایت به زبان طبیعی استفاده می‌شود. پاسخ بازگشتی از schema.org بهره می‌برد، یک واژگان پرکاربرد برای توصیف داده‌های وب. به طور کلی، MCP مانند رابطه Http با HTML است. NLWeb پروتکل‌ها، فرمت‌های Schema.org و کد نمونه را ترکیب می‌کند تا به سایت‌ها کمک کند به سرعت این نقاط انتهایی را ایجاد کنند و به هر دو انسان از طریق رابط‌های گفتگویی و ماشین‌ها از طریق تعامل عامل به عامل طبیعی سود برسانند.

دو جزء مجزای NLWeb وجود دارد.  
- یک پروتکل که در ابتدا بسیار ساده است، برای واسط با سایت به زبان طبیعی و یک فرمت که از json و schema.org برای پاسخ استفاده می‌کند. مستندات API REST برای جزییات بیشتر را ببینید.  
- پیاده‌سازی ساده‌ای از (1) که از مارکوپ‌های موجود بهره می‌برد، برای سایت‌هایی که می‌توان آن‌ها را به صورت فهرستی از آیتم‌ها (محصولات، دستور غذاها، جاذبه‌ها، نقدها و غیره) انتزاع کرد. همراه با مجموعه‌ای از ویجت‌های رابط کاربری، سایت‌ها می‌توانند به آسانی رابط‌های گفتگو برای محتواشان فراهم کنند. مستندات «زندگی یک پرسش چت» برای جزییات بیشتر در مورد نحوه کار این موضوع را ببینید.

**مراجع:**  
- [مستندات Azure MCP](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### مطالعه موردی ۷: سرور Microsoft Foundry MCP – ادغام عوامل هوش مصنوعی سازمانی

سرورهای Microsoft Foundry MCP نحوه استفاده از MCP برای هماهنگی و مدیریت عوامل هوش مصنوعی و جریان‌های کاری در محیط‌های سازمانی را نشان می‌دهند. با ادغام MCP با Microsoft Foundry، سازمان‌ها می‌توانند تعامل عوامل را استاندارد کنند، از مدیریت جریان کاری Foundry بهره ببرند و استقرارهای امن و مقیاس‌پذیر را تضمین کنند.

> **🎯 ابزار آماده تولید**  
>  
> این یک سرور MCP واقعی است که می‌توانید امروز استفاده کنید! برای اطلاعات بیشتر درباره سرور Microsoft Foundry MCP به [**راهنمای سرورهای MCP مایکروسافت**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server) مراجعه کنید.

**ویژگی‌های کلیدی:**  
- دسترسی کامل به اکوسیستم هوش مصنوعی Azure، شامل کاتالوگ مدل‌ها و مدیریت استقرار  
- نمایه‌سازی دانش با Azure AI Search برای برنامه‌های RAG  
- ابزارهای ارزیابی عملکرد مدل هوش مصنوعی و تضمین کیفیت  
- ادغام با Microsoft Foundry Catalog و Labs برای مدل‌های تحقیقات پیشرفته  
- قابلیت‌های مدیریت و ارزیابی عوامل برای سناریوهای تولید  

**نتایج:**  
- نمونه‌سازی سریع و نظارت قوی بر جریان‌های کاری عامل هوش مصنوعی  
- ادغام بدون درز با خدمات Azure AI برای سناریوهای پیشرفته  
- رابط یکپارچه برای ساخت، استقرار و نظارت بر خطوط لوله عوامل  
- بهبود امنیت، انطباق و کارایی عملیاتی برای سازمان‌ها  
- تسریع پذیرش هوش مصنوعی با حفظ کنترل بر فرآیندهای پیچیده مبتنی بر عامل  

**مراجع:**  
- [مخزن GitHub سرور Microsoft Foundry MCP](https://github.com/azure-ai-foundry/mcp-foundry)  
- [ادغام عوامل Azure AI با MCP (وبلاگ Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### مطالعه موردی ۸: زمین بازی Foundry MCP – آزمایش و نمونه‌سازی

زمین بازی Foundry MCP محیطی آماده برای آزمایش سرورهای MCP و ادغام‌های Microsoft Foundry ارائه می‌دهد. توسعه‌دهندگان می‌توانند به سرعت مدل‌های هوش مصنوعی و جریان‌های کاری عوامل را نمونه‌سازی، آزمایش و ارزیابی کنند با استفاده از منابع کاتالوگ و آزمایشگاه‌های Microsoft Foundry. این زمین بازی راه‌اندازی را ساده می‌کند، پروژه‌های نمونه ارائه می‌دهد و از توسعه مشارکتی پشتیبانی می‌نماید و به راحتی امکان بررسی بهترین شیوه‌ها و سناریوهای جدید را با حداقل سربار فراهم می‌کند. این محیط برای تیم‌هایی که به دنبال اعتبارسنجی ایده‌ها، اشتراک آزمایش‌ها و تسریع یادگیری بدون نیاز به زیرساخت پیچیده هستند، بسیار مفید است. با کاهش موانع ورود، این زمین بازی به ترویج نوآوری و مشارکت جامعه در اکوسیستم MCP و Microsoft Foundry کمک می‌کند.

**مراجع:**

- [مخزن GitHub زمین بازی Foundry MCP](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### مطالعه موردی ۹: سرور مستندات Microsoft Learn MCP – دسترسی به مستندات مبتنی بر هوش مصنوعی

سرور Microsoft Learn Docs MCP، سرویسی میزبانی‌شده در فضای ابری است که به دستیاران هوش مصنوعی امکان دسترسی بلادرنگ به مستندات رسمی مایکروسافت از طریق پروتکل مدل کانتکست را می‌دهد. این سرور آماده تولید به اکوسیستم گسترده Microsoft Learn متصل است و جستجوی معنایی در تمام منابع رسمی مایکروسافت را ممکن می‌سازد.

> **🎯 ابزار آماده تولید**  
>  
> این یک سرور MCP واقعی است که می‌توانید امروز استفاده کنید! برای اطلاعات بیشتر درباره سرور Microsoft Learn Docs MCP به [**راهنمای سرورهای MCP مایکروسافت**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server) مراجعه کنید.

**ویژگی‌های کلیدی:**  
- دسترسی بلادرنگ به مستندات رسمی مایکروسافت، مستندات Azure و مستندات Microsoft 365  
- قابلیت‌های جستجوی معنایی پیشرفته که زمینه و قصد را درک می‌کند  
- اطلاعات همیشه به‌روز با انتشار محتوای Microsoft Learn  
- پوشش جامع در سراسر Microsoft Learn، مستندات Azure و منابع Microsoft 365  
- بازگرداندن حداکثر ۱۰ بخش محتوای باکیفیت همراه با عناوین مقالات و URLها  

**دلیل اهمیت:**  
- حل مشکل "دانش قدیمی هوش مصنوعی" برای فناوری‌های مایکروسافت  
- تضمین دسترسی دستیاران هوش مصنوعی به جدیدترین ویژگی‌های .NET، C#، Azure و Microsoft 365  
- ارائه اطلاعات معتبر و رسمی برای تولید دقیق کد  
- ضروری برای توسعه‌دهندگانی که با فناوری‌های سریع‌التغییر مایکروسافت کار می‌کنند  

**نتایج:**  
- بهبود چشمگیر دقت کد تولید شده توسط هوش مصنوعی برای فناوری‌های مایکروسافت  
- کاهش زمان صرف شده برای جستجوی مستندات و بهترین شیوه‌های بروز  
- افزایش بهره‌وری توسعه‌دهنده با بازیابی مستندات آگاه به زمینه  
- ادغام بدون درز با گردش‌های کاری توسعه بدون ترک IDE  

**مراجع:**  
- [مخزن GitHub سرور Microsoft Learn Docs MCP](https://github.com/MicrosoftDocs/mcp)  
- [مستندات Microsoft Learn](https://learn.microsoft.com/)

## پروژه‌های عملی

### پروژه ۱: ساخت یک سرور MCP چند ارائه‌دهنده

**هدف:** ایجاد یک سرور MCP که بتواند درخواست‌ها را بر اساس معیارهای مشخص به چند ارائه‌دهنده مدل هوش مصنوعی مسیردهی کند.

**نیازمندی‌ها:**

- پشتیبانی از حداقل سه ارائه‌دهنده مدل مختلف (مثلاً OpenAI، Anthropic، مدل‌های محلی)  
- پیاده‌سازی مکانیزم مسیردهی بر اساس متادیتای درخواست  
- ایجاد یک سیستم پیکربندی برای مدیریت اعتبارنامه‌های ارائه‌دهنده  
- افزودن حافظه پنهان برای بهینه‌سازی عملکرد و هزینه‌ها  
- ساخت داشبورد ساده برای نظارت بر استفاده  

**مراحل پیاده‌سازی:**

1. راه‌اندازی زیرساخت اولیه سرور MCP  
2. پیاده‌سازی آداپتورهای ارائه‌دهنده برای هر سرویس مدل هوش مصنوعی  
3. ایجاد منطق مسیردهی بر اساس ویژگی‌های درخواست  
4. افزودن مکانیزم‌های کش برای درخواست‌های مکرر  
5. توسعه داشبورد مانیتورینگ  
6. تست با الگوهای مختلف درخواست  

**تکنولوژی‌ها:** انتخاب از میان Python (.NET/Java/Python بر اساس ترجیح شما)، Redis برای کش و یک فریم‌ورک وب ساده برای داشبورد.

### پروژه ۲: سیستم مدیریت درخواست سازمانی

**هدف:** توسعه سیستمی مبتنی بر MCP برای مدیریت، نسخه‌بندی و استقرار قالب‌های درخواست در سراسر سازمان.

**نیازمندی‌ها:**
- ایجاد یک مخزن متمرکز برای قالب‌های درخواست  
- پیاده‌سازی ورژن‌بندی و گردش‌های کاری تأیید  
- ساخت قابلیت‌های تست قالب با ورودی‌های نمونه  
- توسعه کنترل‌های دسترسی مبتنی بر نقش  
- ایجاد API برای بازیابی و استقرار قالب‌ها  

**مراحل پیاده‌سازی:**  

1. طراحی اسکیمای پایگاه داده برای ذخیره قالب‌ها  
2. ایجاد API اصلی برای عملیات CRUD قالب‌ها  
3. پیاده‌سازی سیستم ورژن‌بندی  
4. ساخت گردش کاری تأیید  
5. توسعه چارچوب تست  
6. ساخت رابط کاربری وب ساده برای مدیریت  
7. ادغام با سرور MCP  

**تکنولوژی‌ها:** انتخاب شما برای فریم‌ورک بک‌اند، پایگاه داده SQL یا NoSQL و فریم‌ورک فرانت‌اند برای رابط مدیریت.  

### پروژه ۳: پلتفرم تولید محتوا مبتنی بر MCP  

**هدف:** ساخت پلتفرم تولید محتوا که با بهره‌گیری از MCP نتایج یکپارچه در انواع مختلف محتوا ارائه دهد.  

**نیازمندی‌ها:**  

- پشتیبانی از فرمت‌های محتوایی متعدد (مطالب بلاگ، شبکه‌های اجتماعی، متن‌های تبلیغاتی)  
- پیاده‌سازی تولید مبتنی بر قالب با گزینه‌های سفارشی‌سازی  
- ایجاد سیستم بازبینی و بازخورد محتوا  
- ردیابی معیارهای عملکرد محتوا  
- پشتیبانی از ورژن‌بندی و تکرار محتوا  

**مراحل پیاده‌سازی:**  

1. راه‌اندازی زیرساخت کلاینت MCP  
2. ایجاد قالب‌ها برای انواع مختلف محتوا  
3. ساخت خط تولید تولید محتوا  
4. پیاده‌سازی سیستم بازبینی  
5. توسعه سیستم ردیابی معیارها  
6. ایجاد رابط کاربری برای مدیریت قالب‌ها و تولید محتوا  

**تکنولوژی‌ها:** زبان برنامه‌نویسی، فریم‌ورک وب و سیستم پایگاه داده مورد علاقه شما.  

## جهت‌گیری‌های آینده برای فناوری MCP  

### روندهای نوظهور  

1. **MCP چندرسانه‌ای**  
   - گسترش MCP برای استانداردسازی تعامل با مدل‌های تصویر، صدا و ویدئو  
   - توسعه قابلیت‌های استدلال بین‌مدلی  
   - فرمت‌های استاندارد درخواست برای مدالیته‌های مختلف  

2. **زیرساخت MCP فدرال**  
   - شبکه‌های توزیع‌شده MCP که امکان اشتراک منابع بین سازمان‌ها را فراهم می‌کنند  
   - پروتکل‌های استاندارد شده برای به اشتراک‌گذاری ایمن مدل‌ها  
   - تکنیک‌های محاسبات حفظ حریم خصوصی  

3. **بازارهای MCP**  
   - اکوسیستم‌هایی برای اشتراک و کسب درآمد از قالب‌ها و پلاگین‌های MCP  
   - فرایندهای تضمین کیفیت و صدور گواهی  
   - ادغام با بازارهای مدل  

4. **MCP برای محاسبات لبه**  
   - سازگارسازی استانداردهای MCP برای دستگاه‌های دارای منابع محدود در لبه  
   - پروتکل‌های بهینه برای محیط‌های کم‌پهنای باند  
   - پیاده‌سازی‌های تخصصی MCP برای اکوسیستم‌های IoT  

5. **چارچوب‌های نظارتی**  
   - توسعه افزونه‌های MCP برای انطباق با مقررات  
   - ردپاهای حسابرسی استاندارد و رابط‌های توضیح‌پذیری  
   - ادغام با چارچوب‌های حاکمیت هوش مصنوعی نوظهور  

### راهکارهای MCP از مایکروسافت  

مایکروسافت و آزور چندین مخزن متن‌باز را برای کمک به توسعه‌دهندگان در پیاده‌سازی MCP در سناریوهای مختلف توسعه داده‌اند:  

#### سازمان Microsoft  

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - سرور MCP پلی‌رایت برای خودکارسازی و تست مرورگر  
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - پیاده‌سازی سرور MCP وان‌درایو برای تست محلی و مشارکت جامعه  
3. [NLWeb](https://github.com/microsoft/NlWeb) - مجموعه‌ای از پروتکل‌های باز و ابزارهای متن‌باز مرتبط که لایه‌ای بنیادی برای وب هوش مصنوعی ایجاد می‌کند  

#### سازمان Azure-Samples  

1. [mcp](https://github.com/Azure-Samples/mcp) - لینک به نمونه‌ها، ابزارها و منابع برای ساخت و ادغام سرورهای MCP در آزور با زبان‌های مختلف  
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - سرورهای مرجع MCP برای احراز هویت با مشخصات کنونی Model Context Protocol  
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - صفحه فرود برای پیاده‌سازی سرورهای از راه دور MCP در Azure Functions به همراه لینک مخازن زبان‌های مختلف  
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - قالب شروع سریع برای ساخت و استقرار سرورهای از راه دور MCP سفارشی با Azure Functions و پایتون  
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - قالب شروع سریع برای ساخت و استقرار سرورهای از راه دور MCP سفارشی با Azure Functions و .NET/C#  
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - قالب شروع سریع برای ساخت و استقرار سرورهای از راه دور MCP سفارشی با Azure Functions و TypeScript  
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - مدیریت API آزور به عنوان دروازه هوش مصنوعی به سرورهای از راه دور MCP با استفاده از پایتون  
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - آزمایش‌های APIM ❤️ AI شامل قابلیت‌های MCP، ادغام با Azure OpenAI و AI Foundry  

این مخازن پیاده‌سازی‌ها، قالب‌ها و منابع متنوعی برای کار با Model Context Protocol در زبان‌های برنامه‌نویسی مختلف و سرویس‌های آزور فراهم می‌کنند. آن‌ها طیف گسترده‌ای از موارد استفاده را از پیاده‌سازی‌های پایه سرور گرفته تا احراز هویت، استقرار در فضای ابری و سناریوهای ادغام سازمانی پوشش می‌دهند.  

#### دایرکتوری منابع MCP  

[دایرکتوری منابع MCP](https://github.com/microsoft/mcp/tree/main/Resources) در مخزن رسمی MCP مایکروسافت مجموعه‌ای انتخاب‌شده از منابع نمونه، قالب‌های درخواست و تعاریف ابزار برای استفاده با سرورهای Model Context Protocol فراهم می‌آورد. این دایرکتوری برای کمک به توسعه‌دهندگان جهت شروع سریع با MCP طراحی شده است و بلوک‌های ساخت قابل استفاده مجدد و بهترین نمونه‌های عملی را ارائه می‌دهد برای:  

- **قالب‌های درخواست:** قالب‌های آماده برای کارهای رایج هوش مصنوعی و سناریوها که می‌توان آن‌ها را برای پیاده‌سازی‌های سرور MCP خود تطبیق داد.  
- **تعاریف ابزار:** نمونه اسکیمای ابزار و متادیتا برای استانداردسازی ادغام و فراخوانی ابزار در سرورهای مختلف MCP.  
- **نمونه منابع:** تعاریف نمونه منابع برای اتصال به منابع داده، APIها و سرویس‌های خارجی در چارچوب MCP.  
- **پیاده‌سازی‌های مرجع:** نمونه‌های عملی که نشان می‌دهند چگونه منابع، درخواست‌ها و ابزارها را در پروژه‌های واقعی MCP ساختاردهی و سازماندهی کنیم.  

این منابع توسعه را تسریع، استانداردسازی را ترویج و کمک می‌کنند بهترین شیوه‌ها را هنگام ساخت و استقرار راهکارهای مبتنی بر MCP رعایت کرد.  

#### دایرکتوری منابع MCP  

- [منابع MCP (قالب‌های نمونه، ابزارها و تعاریف منابع)](https://github.com/microsoft/mcp/tree/main/Resources)  

### فرصت‌های پژوهشی  

- تکنیک‌های بهینه‌سازی مؤثر درخواست‌ها در چارچوب‌های MCP  
- مدل‌های امنیتی برای استقرارهای چندمستاجری MCP  
- ارزیابی عملکرد در پیاده‌سازی‌های مختلف MCP  
- روش‌های تأیید رسمی برای سرورهای MCP  

## نتیجه‌گیری  

پروتکل زمینه مدل (MCP) به سرعت آینده ادغام استاندارد، امن و قابل همکاری هوش مصنوعی را در صنایع شکل می‌دهد. از طریق مطالعات موردی و پروژه‌های عملی این درس، مشاهده کردید که پیشگامان اولیه از جمله مایکروسافت و آزور چگونه از MCP برای حل چالش‌های واقعی، تسریع پذیرش هوش مصنوعی و تضمین انطباق، امنیت و مقیاس‌پذیری بهره می‌برند. رویکرد ماژولار MCP به سازمان‌ها امکان می‌دهد مدل‌های زبان بزرگ، ابزارها و داده‌های سازمانی را در چارچوبی یکپارچه و قابل رسیدگی به هم متصل کنند. همزمان با تکامل MCP، تعامل با جامعه، بررسی منابع متن‌باز و به‌کارگیری بهترین شیوه‌ها کلید ساخت راهکارهای هوش مصنوعی مقاوم و آماده برای آینده خواهد بود.  

## منابع تکمیلی  

- [مخزن گیت‌هاب MCP Foundry](https://github.com/azure-ai-foundry/mcp-foundry)  
- [محیط بازی MCP Foundry](https://github.com/azure-ai-foundry/foundry-mcp-playground)  
- [ادغام عامل‌های AI آزور با MCP (وبلاگ Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  
- [مخزن گیت‌هاب MCP (مایکروسافت)](https://github.com/microsoft/mcp)  
- [دایرکتوری منابع MCP (قالب‌های نمونه، ابزارها و تعاریف منابع)](https://github.com/microsoft/mcp/tree/main/Resources)  
- [جامعه و مستندات MCP](https://modelcontextprotocol.io/introduction)  
- [مشخصات MCP (۲۰۲۵-۱۱-۲۵)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [مستندات Azure MCP](https://aka.ms/azmcp)  
- [راهنمای امنیت MCP در OWASP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - بهترین شیوه‌های امنیتی  
- [مخزن گیت‌هاب سرور Playwright MCP](https://github.com/microsoft/playwright-mcp)  
- [سرور Files MCP (OneDrive)](https://github.com/microsoft/files-mcp-server)  
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)  
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)  
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)  
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)  
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)  
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)  
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)  
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)  
- [راهکارهای هوش مصنوعی و اتوماسیون مایکروسافت](https://azure.microsoft.com/en-us/products/ai-services/)  

## تمرین‌ها  

1. یکی از مطالعات موردی را تحلیل کرده و رویکرد پیاده‌سازی جایگزینی پیشنهاد دهید.  
2. یکی از ایده‌های پروژه را انتخاب کرده و مشخصات فنی دقیقی ایجاد کنید.  
3. تحقیق درباره صنعتی که در مطالعات موردی پوشش داده نشده و بیان کنید چگونه MCP می‌تواند چالش‌های خاص آن را رفع کند.  
4. یکی از جهت‌گیری‌های آینده را بررسی کرده و یک مفهوم برای افزونه جدید MCP جهت پشتیبانی از آن تهیه کنید.  

## مرحله بعد  

بیشتر کاوش کنید: [سرورهای MCP مایکروسافت](./microsoft-mcp-servers.md)  

ادامه به: [ماژول ۸: بهترین شیوه‌ها](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->