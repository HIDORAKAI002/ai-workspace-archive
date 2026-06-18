# 🌟 प्रारम्भिक अपनाउनेहरुबाट पाठ

[![Lessons from MCP Early Adopters](../../../translated_images/ne/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(यो पाठको भिडियो हेर्न माथि चित्रमा क्लिक गर्नुहोस्)_

## 🎯 यस मोड्युलले के समेट्छ

यस मोड्युलले कसरी वास्तविक संगठन र विकासकर्ताहरूले मोडल कन्टेक्स्ट प्रोटोकल (MCP) प्रयोग गरी वास्तविक चुनौतीहरू समाधान गर्दै नवप्रवर्तनलाई अगाडि बढाइरहेका छन् भनी अन्वेषण गर्दछ। विस्तृत केस अध्ययनहरू, व्यावहारिक परियोजनाहरू र उदाहरणहरू मार्फत, तपाईंले सिक्नुहुनेछ कि MCP ले कसरी भाषा मोडलहरू, उपकरणहरू र उद्यम डाटा जडान गर्ने सुरक्षित, मापनयोग्य एआई एकीकरण सक्षम गर्दछ।

### 📚 MCP लाई क्रियाशील अवस्थामा हेर्नुहोस्

यी सिद्धान्तहरू उत्पादन-तयार उपकरणहरूमा कसरी लागू थिए भनी हेर्न चाहनुहुन्छ? हाम्रो [**10 Microsoft MCP सर्भरहरू जुन विकासकर्ता उत्पादकतालाई रूपान्तरण गरिरहेका छन्**](microsoft-mcp-servers.md) मा हेर्नुहोस्, जसले तपाईले आज प्रयोग गर्नसक्ने वास्तविक Microsoft MCP सर्भरहरू प्रदर्शन गर्दछ।

## अवलोकन

यस पाठले प्रारम्भिक अपनाउनेहरूले मोडल कन्टेक्स्ट प्रोटोकल (MCP) लाई कसरी प्रयोग गरी वास्तविक विश्वका चुनौतीहरू समाधान गरी उद्योगहरूमा नवप्रवर्तन ल्याइरहेका छन् भन्ने कुरा अन्वेषण गर्दछ। विस्तृत केस अध्ययन र व्यावहारिक परियोजनाहरू मार्फत, तपाईंले MCP कसरी मानकीकृत, सुरक्षित, र मापनयोग्य एआई एकीकरण सक्षम गर्छ — ठूलो भाषा मोडलहरू, उपकरणहरू, र उद्यम डाटालाई एकीकृत रूपरेखा भित्र जडान गराउने — देख्नुहुनेछ। तपाईंले MCP-आधारित समाधानहरू डिजाइन र निर्माण गर्ने व्यावहारिक अनुभव प्राप्त गर्नुहुनेछ, प्रमाणित कार्यान्वयन ढाँचाहरूबाट सिक्नुहुनेछ, र उत्पादन वातावरणमा MCP तैनाथ गर्ने उत्कृष्ट अभ्यासहरू पत्ता लगाउनुहुनेछ। यस पाठले उभरिरहेका प्रवृत्ति, भविष्यका दिशा, र खुला स्रोत स्रोतहरूलाई पनि प्रकाश पार्दछ जसले तपाईंलाई MCP प्राविधिकी र यसको विकासशील पारिस्थितिकीको अग्रभागमा रहन मद्दत गर्दछ।

## सिकाइका उद्देश्यहरू

- विभिन्न उद्योगहरूमा वास्तविक विश्वका MCP कार्यान्वयनहरू विश्लेषण गर्नुहोस्  
- पूर्ण MCP-आधारित अनुप्रयोगहरू डिजाइन र निर्माण गर्नुहोस्  
- MCP प्राविधिकीमा उभरिरहेका प्रवृत्ति र भविष्यका दिशा अन्वेषण गर्नुहोस्  
- वास्तविक विकास परिदृश्यहरूमा उत्कृष्ट अभ्यासहरू लागू गर्नुहोस्  

## वास्तविक विश्वका MCP कार्यान्वयनहरू

### केस अध्ययन १: उद्यम ग्राहक समर्थन स्वचालन

एक बहुराष्ट्रिय कम्पनीले आफ्ना ग्राहक समर्थन प्रणालीहरूमा एआई अन्तरक्रियाहरू मानकीकृत गर्न MCP-आधारित समाधान लागू गर्‍यो। यसले उनीहरूलाई सक्षम पार्‍यो:

- विभिन्न LLM प्रदायकहरूको लागि एकीकृत इन्टरफेस सिर्जना गर्न  
- विभागहरूमा एकसाथ अगिम व्यवस्थापन कायम राख्न  
- मजबूत सुरक्षा र अनुपालन नियन्त्रणहरू लागू गर्न  
- विशिष्ट आवश्यकताका आधारमा विभिन्न एआई मोडलहरू सजिलै परिवर्तन गर्न  

**प्राविधिक कार्यान्वयन:**

```python
# ग्राहक समर्थनको लागि Python MCP सर्भर कार्यान्वयन
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# लगिङ्ग कन्फिगर गर्नुहोस्
logging.basicConfig(level=logging.INFO)

async def main():
    # सर्भर कन्फिगरेसन सिर्जना गर्नुहोस्
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # MCP सर्भर आरम्भ गर्नुहोस्
    server = create_server(config)
    
    # ज्ञान आधार स्रोतहरू दर्ता गर्नुहोस्
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # प्रॉम्प्ट टेम्प्लेटहरू दर्ता गर्नुहोस्
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # समर्थन उपकरणहरू दर्ता गर्नुहोस्
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # HTTP ट्रान्सपोर्टसँग सर्भर सुरु गर्नुहोस्
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**परिणामहरू:** मोडल लागतमा ३०% कटौती, प्रतिक्रियाको स्थिरतामा ४५% सुधार, र विश्वव्यापी सञ्चालनमा अनुपालन विस्तार।

### केस अध्ययन २: स्वास्थ्य सेवा निदान सहायक

एक स्वास्थ्य सेवा प्रदायकले धेरै विशिष्ट मेडिकल एआई मोडलहरूलाई एकीकृत गर्न MCP पूर्वाधार विकास गर्‍यो जबकि संवेदनशील बिरामी डाटा सुरक्षित राख्न सुनिश्चित गर्‍यो:

- सामान्य र विशेषज्ञ मेडिकल मोडलहरू बीच सहज स्विचिङ  
- कडाइका साथ गोपनीयता नियन्त्रण र अडिट ट्रेलहरू  
- विद्यमान इलेक्ट्रोनिक स्वास्थ्य रेकर्ड (EHR) प्रणालीहरूसँग एकीकरण  
- चिकित्सा शब्दावलीको लागि नियमित अगिम इन्जिनियरिङ

**प्राविधिक कार्यान्वयन:**

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
  
**परिणामहरू:** चिकित्सकहरूको लागि निदान सुझावहरूमा सुधार प्राप्त भयो जबकि पूर्ण HIPAA अनुपालन कायम राख्यो र प्रणालीहरू बीच सन्दर्भ-सुइचिङमा उल्लेखनीय कमी।

### केस अध्ययन ३: वित्तीय सेवा जोखिम विश्लेषण

एक वित्तीय संस्थानले विभिन्न विभागहरूमा आफ्नो जोखिम विश्लेषण प्रक्रियाहरू मानकीकृत गर्न MCP लागू गर्‍यो:

- क्रेडिट जोखिम, धोखाधडी पत्ता लगाउने, र लगानी जोखिम मोडलहरूको लागि एकीकृत इन्टरफेस बनायो  
- कडा पहुँच नियन्त्रण र मोडल भर्जिन पद्धति लागू गर्‍यो  
- सबै एआई सिफारिशहरूको अडिटयोग्यता सुनिश्चित गर्‍यो  
- विभिन्न प्रणालीहरूमा एकसमान डाटा ढाँचामा कायम राख्‍यो  

**प्राविधिक कार्यान्वयन:**

```java
// वित्तीय जोखिम मूल्यांकनका लागि जाभा MCP सर्भर
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // वित्तीय अनुपालन सुविधाहरू सहित MCP सर्भर बनाउनुहोस्
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
  
**परिणामहरू:** नियामक अनुपालना सुधारियो, मोडल तैनाथी चक्र ४०% छिटो भयो, र विभागहरूमा जोखिम मूल्याङ्कनमा निरन्तरता आयो।

### केस अध्ययन ४: Microsoft Playwright MCP सर्भर ब्राउजर स्वचालनका लागि

Microsoft ले Playwright MCP सर्भर (https://github.com/microsoft/playwright-mcp) विकास गर्‍यो जसले मोडल कन्टेक्स्ट प्रोटोकल मार्फत सुरक्षित, मानकीकृत ब्राउजर स्वचालन सक्षम बनाउँछ। यो उत्पादन-तयार सर्भरले एआई एजेन्टहरू र LLM हरूलाई वेब ब्राउजरहरूसँग नियन्त्रणयोग्य, अडिटयोग्य, र विस्तारयोग्य तरिकाले अन्तरक्रिया गर्न अनुमति दिन्छ — जस्तै स्वचालित वेब परीक्षण, डेटा निष्कर्षण, र सम्पूर्ण कार्यप्रवाहहरू।

> **🎯 उत्पादन-तयार उपकरण**  
>  
> यो केस अध्ययनले तपाईले आज नै प्रयोग गर्नसक्ने वास्तविक MCP सर्भर प्रदर्शन गर्दछ! Playwright MCP सर्भर र अन्य ९ उत्पादन-तयार Microsoft MCP सर्भरहरूको बारेमा थप जान्न हाम्रो [**Microsoft MCP सर्भर गाइड**](microsoft-mcp-servers.md#8--playwright-mcp-server) हेर्नुहोस्।

**प्रमुख विशेषताहरू:**  
- ब्राउजर स्वचालन क्षमता (नेभिगेसन, फारम भर्नु, स्क्रिनशट लिनु आदि) MCP उपकरणहरूको रूपमा उपलब्ध गराउँछ  
- अनधिकृत क्रियाकलाप रोक्न कडा पहुँच नियन्त्रण र स्यान्डबक्सिङ लागू गर्दछ  
- सबै ब्राउजर अन्तरक्रियाहरूको विस्तृत अडिट लगहरू प्रदान गर्दछ  
- Azure OpenAI र अन्य LLM प्रदायकहरूसँग एकीकरण समर्थन गर्दछ एजेन्ट-चालित स्वचालनका लागि  
- GitHub Copilot कोडिङ एजेन्टलाई वेब ब्राउजिङ क्षमताहरूले शक्ति दिन्छ  

**प्राविधिक कार्यान्वयन:**

```typescript
// TypeScript: MCP सर्भरमा Playwright ब्राउजर स्वचालन उपकरणहरू दर्ता गर्दै
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// URL मा नेभिगेट गर्न र स्क्रिनसट क्याप्चर गर्न उपकरण दर्ता गर्नुहोस्
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

// MCP सर्भर सुरु गर्नुहोस्
server.listen(8080);
```
  
**परिणामहरू:**  

- एआई एजेन्ट र LLM हरूका लागि सुरक्षित र प्रोग्राम्याटिक ब्राउजर स्वचालन सक्षम गरियो  
- म्यानुअल परीक्षण मेहनत घट्यो र वेब अनुप्रयोगहरूको परीक्षण आवरण सुधारियो  
- उद्यम वातावरणमा ब्राउजर-आधारित उपकरण एकीकरणका लागि पुनःप्रयोगयोग्य, विस्तारयोग्य रूपरेखा प्रदान गरियो  
- GitHub Copilot को वेब ब्राउजिङ क्षमताहरूलाई सशक्त बनायो  

**सन्दर्भहरू:**  

- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)  
- [Microsoft AI and Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)  

### केस अध्ययन ५: Azure MCP – उद्यम-ग्रेड मोडल कन्टेक्स्ट प्रोटोकल सेवा रूपमा

Azure MCP सर्भर ([https://aka.ms/azmcp](https://aka.ms/azmcp)) Microsoft को प्रबन्धित, उद्यम-ग्रेड मोडल कन्टेक्स्ट प्रोटोकल कार्यान्वयन हो, जुन स्केलेबल, सुरक्षित, र अनुपालन योग्य MCP सर्भर क्षमता क्लाउड सेवाको रूपमा प्रदान गर्न डिजाइन गरिएको हो। Azure MCP ले संगठनहरूलाई तिव्र रूपमा MCP सर्भरहरू तैनाथ गर्न, व्यवस्थापन गर्न, र Azure AI, डाटा, र सुरक्षा सेवाहरूसँग एकीकरण गर्न सक्षम पार्दछ, ऑपरेशनल भार घटाउँदै र एआई अंगीकारलाई छिटो बनाउँदै।

> **🎯 उत्पादन-तयार उपकरण**  
>  
> यो तपाईंले आजै प्रयोग गर्न सक्ने वास्तविक MCP सर्भर हो! Microsoft Foundry MCP सर्भरको बारेमा थप जान्न हाम्रो [**Microsoft MCP सर्भर गाइड**](microsoft-mcp-servers.md) हेर्नुहोस्।

- पूर्ण प्रबन्धित MCP सर्भर होस्टिंग, बिल्ट-इन स्केलिङ, अनुगमन, र सुरक्षा सहित  
- Azure OpenAI, Azure AI Search, र अन्य Azure सेवासँग देशीय एकीकरण  
- Microsoft Entra ID मार्फत उद्यम प्रमाणीकरण र प्राधिकरण  
- अनुकूलित उपकरणहरू, अगिम ढाँचा, र स्रोत कनेक्टरहरूको समर्थन  
- उद्यम सुरक्षा र नियामक आवश्यकतासँग अनुपालन  

**प्राविधिक कार्यान्वयन:**

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
  
**परिणामहरू:**  
- उद्यम एआई परियोजनाहरूका लागि तयार-प्रयोग, अनुपालन योग्य MCP सर्भर प्लेटफर्म प्रदान गरी मूल्यमा छिटो पहुँच  
- LLM हरू, उपकरणहरू, र उद्यम डेटा स्रोतहरूको सरल एकीकरण  
- MCP कार्यभारका लागि सुरक्षा, अवलोकनयोग्यता, र अपरेशनल दक्षता सुधार  
- Azure SDK सर्वोत्तम अभ्यास र वर्तमान प्रमाणीकरण ढाँचासहित कोड गुणस्तर सुधार  

**सन्दर्भहरू:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)  
- [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)  

## केस अध्ययन ६: NLWeb

MCP (मोडल कन्टेक्स्ट प्रोटोकल) च्याटबोट र एआई सहायकहरूले उपकरणहरूसँग अन्तरक्रिया गर्नको लागि एक उदीयमान प्रोटोकल हो। प्रत्येक NLWeb उदाहरण पनि एक MCP सर्भर हो, जसले मुख्य विधि, ask, समर्थन गर्दछ, जुन प्राकृतिक भाषामा वेबसाइटलाई प्रश्न सोध्न प्रयोग गरिन्छ। फिर्ता आएको प्रतिक्रिया schema.org प्रयोग गर्दछ, जुन वेब डाटालाई वर्णन गर्न व्यापक रूपमा प्रयोग हुने शब्दावली हो। सामान्य रूपमा भनौं भने, MCP हो NLWeb जसरी Http हो HTML को।

NLWeb मा दुई पृथक कम्पोनेन्टहरू छन्।  
- एउटा प्रोटोकल, जसलाई सुरु गर्न धेरै सजिलो छ, जसले प्राकृतिक भाषामा साइटसँग अन्तरक्रिया गर्न र फिर्ता जवाफको लागि json र schema.org फर्म्याट प्रयोग गर्दछ। थप विवरणको लागि REST API सम्बन्धी डकुमेन्टेसन हेर्नुहोस्।  
- (१) को एक सरल कार्यान्वयन जसले विद्यमान मार्कअपको उपयोग गर्दछ, ती साइटहरूको लागि जुन वस्तुहरूको सूचीको रूपमा अमूर्त गर्न सकिन्छ (उत्पादनहरू, रेसिपीहरू, आकर्षणहरू, समीक्षा आदि)। प्रयोगकर्ता इन्टरफेस विजेटहरूसँग मिलेर, साइटहरूले आफ्नो सामग्रीमा सरल वार्तालापात्मक अन्तरफलकहरू प्रदान गर्न सक्छन्। यो कसरी काम गर्छ भन्ने थप विवरणका लागि Life of a chat query सम्बन्धी डकुमेन्टेसन हेर्नुहोस्।

**सन्दर्भहरू:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)  

### केस अध्ययन ७: Microsoft Foundry MCP सर्भर – उद्यम एआई एजेन्ट एकीकरण

Microsoft Foundry MCP सर्भरहरूले देखाउँछन् कि कसरी MCP लाई प्रयोग गरेर एआई एजेन्ट र कार्यप्रवाहहरू उद्यम वातावरणमा समन्वय र व्यवस्थापन गर्न सकिन्छ। Microsoft Foundry सँग MCP एकीकरण गरेर, संगठनहरूले एजेन्ट अन्तरक्रियाहरू मानकीकृत गर्न, Foundry को कार्यप्रवाह व्यवस्थापन लाभ उठाउन र सुरक्षित, मापनयोग्य तैनाथीहरू सुनिश्चित गर्न सक्छन्।

> **🎯 उत्पादन-तयार उपकरण**  
>  
> यो तपाईंले आजै प्रयोग गर्न सक्ने वास्तविक MCP सर्भर हो! Microsoft Foundry MCP सर्भरको बारेमा थप जान्न हाम्रो [**Microsoft MCP सर्भर गाइड**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server) हेर्नुहोस्।

**प्रमुख विशेषताहरू:**  
- Azure को एआई ईकोसिस्टममा व्यापक पहुँच, मडल सूचीहरु र तैनाथी व्यवस्थापन सहित  
- RAG अनुप्रयोगहरूको लागि Azure AI Search संग ज्ञान अनुक्रमणिका  
- एआई मोडल प्रदर्शन र गुणस्तर आश्वासनका लागि मूल्याङ्कन उपकरणहरू  
- Microsoft Foundry Catalog र Labs सँग अनुसन्धान मोडलहरूको एकीकरण  
- उत्पादकता परिदृश्यहरूका लागि एजेन्ट व्यवस्थापन र मूल्याङ्कन क्षमता  

**परिणामहरू:**  
- एआई एजेन्ट कार्यप्रवाहहरूको तिव्र प्रोटोटाइपिङ र दृढ अनुगमन  
- उन्नत परिदृश्यहरूको लागि Azure AI सेवासँग सहज एकीकरण  
- एजेन्ट पाइपलाइन निर्माण, तैनाथी, र अनुगमनका लागि एकीकृत इन्टरफेस  
- सुरक्षा, अनुपालन, र अपरेशनल दक्षता सुधार  
- जटिल एजेन्ट-चालित प्रक्रियाहरूमा नियन्त्रण कायम राख्दै एआई अंगीकार तिव्र बनाउनु  

**सन्दर्भहरू:**  
- [Microsoft Foundry MCP Server GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  

### केस अध्ययन ८: Foundry MCP Playground – प्रयोग र प्रोटोटाइपिङ

Foundry MCP Playground ले MCP सर्भरहरू र Microsoft Foundry एकीकरणहरूका लागि तयार-प्रयोग वातावरण प्रदान गर्दछ। विकासकर्ताहरूले Microsoft Foundry Catalog र Labs का स्रोतहरू प्रयोग गरेर छिटो एआई मोडल र एजेन्ट कार्यप्रवाहहरूको प्रोटोटाइप, परीक्षण र मूल्याङ्कन गर्न सक्छन्। प्लेग्राउण्डले सेटअपलाई सरलीकृत गर्छ, नमूना परियोजनाहरू प्रदान गर्दछ, र सहकारी विकास समर्थन गर्दछ, जसले न्यूनतम व्ययसहित नयाँ प्रविधिहरू र उत्कृष्ट अभ्यासहरूको अन्वेषण सजिलो बनाउँछ। यो विशेष गरी ती टोलीहरूका लागि उपयोगी छ जसले विचारहरू पुष्टि गर्न, परीक्षणहरू साझा गर्न, र सिकाइ छिटो बनाउन चाहन्छन् र जटिल पूर्वाधार आवश्यक पर्दैन। पहुँचको बाधा घटाएर, प्लेग्राउण्डले MCP र Microsoft Foundry पारिस्थितिकीमा नवप्रवर्तन र समुदाय योगदानहरूलाई प्रोत्साहन गर्छ।

**सन्दर्भहरू:**

- [Foundry MCP Playground GitHub Repository](https://github.com/azure-ai-foundry/foundry-mcp-playground)  

### केस अध्ययन ९: Microsoft Learn Docs MCP सर्भर – एआई-संचालित दस्तावेज पहुँच

Microsoft Learn Docs MCP सर्भर एक क्लाउड-होस्टेड सेवा हो जसले एआई सहायकहरूलाई Model Context Protocol मार्फत वास्तविक समयमा आधिकारिक Microsoft दस्तावेजहरूमा पहुँच प्रदान गर्दछ। यो उत्पादन-तयार सर्भरले व्यापक Microsoft Learn ईकोसिस्टमसँग जडान गर्दछ र सबै आधिकारिक Microsoft स्रोतहरूमा अर्थपूर्ण खोज सक्षम गर्छ।

> **🎯 उत्पादन-तयार उपकरण**  
>  
> तपाईंले यो आजै प्रयोग गर्न सक्ने वास्तविक MCP सर्भर हो! Microsoft Learn Docs MCP सर्भरको बारेमा थप जान्न हाम्रो [**Microsoft MCP सर्भर गाइड**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server) हेर्नुहोस्।

**प्रमुख विशेषताहरू:**  
- आधिकारिक Microsoft, Azure कागजातहरू, र Microsoft 365 कागजातहरूमा वास्तविक समय पहुँच  
- सन्दर्भ र अभिप्राय बुझ्ने उन्नत अर्थपूर्ण खोज क्षमता  
- Microsoft Learn सामग्री प्रकाशनसँगै सधैं अद्यावधिक जानकारी  
- Microsoft Learn, Azure कागजातहरू, र Microsoft 365 स्रोतहरूमा व्यापक पहुँच  
- लेख शीर्षक र URL सहित १० सम्मका उच्च-गुणस्तरीय सामग्री खण्डहरू फर्काउँछ  

**किन यो महत्वपूर्ण छ:**  
- Microsoft प्राविधिहरूको लागि "पुरानो एआई ज्ञान" समस्या समाधान गर्दछ  
- एआई सहायकहरूले नवीन .NET, C#, Azure, र Microsoft 365 विशेषताहरूमा पहुँच सुनिश्चित गर्दछ  
- सही कोड उत्पादनका लागि अधिकारिक, पहिलो-पक्ष सूचना प्रदान गर्दछ  
- तीव्र रूपमा विकास भइरहेको Microsoft प्राविधिकहरूसँग काम गर्ने विकासकर्ताहरूका लागि आवश्यक  

**परिणामहरू:**  
- Microsoft प्राविधिकहरूको लागि एआई-उत्पन्न कोडको अत्यधिक सुधारिएको शुद्धता  
- वर्तमान कागजात र उत्कृष्ट अभ्यासहरू खोज्न खर्चिने समय घट्यो  
- सन्दर्भ-समझदार दस्तावेज पुनर्प्राप्ति संग विकासकर्ता उत्पादकता सुधारियो  
- एआईडी छोड्नु नपरी विकास कार्यप्रवाहहरूसँग सहज एकीकरण  

**सन्दर्भहरू:**  
- [Microsoft Learn Docs MCP Server GitHub Repository](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn Documentation](https://learn.microsoft.com/)  

## व्यावहारिक परियोजनाहरू

### परियोजना १: बहु-प्रदायक MCP सर्भर निर्माण गर्नुहोस्

**उद्देश्य:** एक MCP सर्भर बनाउनुहोस् जसले विशिष्ट मापदण्डहरूका आधारमा विभिन्न एआई मोडल प्रदायकहरूलाई अनुरोधहरू मार्गनिर्देशन गर्न सक्षम होस्।

**आवश्यकताहरू:**

- कम्तीमा तीन फरक मोडल प्रदायकहरूलाई समर्थन (जस्तै, OpenAI, Anthropic, स्थानीय मोडलहरू)  
- अनुरोध मेटाडाटा आधारित मार्गनिर्देशन मेकानिज्म लागू गर्नुहोस्  
- प्रदायक प्रमाणीकरण व्यवस्थापनका लागि कन्फिगरेसन प्रणाली सिर्जना गर्नुहोस्  
- प्रदर्शन र लागतलाई अनुकूल बनाउन क्याचिङ थप्नुहोस्  
- प्रयोग अनुगमनको लागि एक सरल ड्यासबोर्ड तयार गर्नुहोस्  

**कार्यान्वयन चरणहरू:**

1. आधारभूत MCP सर्भर पूर्वाधार सेट अप गर्नुहोस्  
2. प्रत्येक एआई मोडल सेवाका लागि प्रदायक एडाप्टरहरू कार्यान्वयन गर्नुहोस्  
3. अनुरोध विशेषताहरूमा आधारित मार्गनिर्देशन तर्क सिर्जना गर्नुहोस्  
4. प्रायः आउने अनुरोधहरूको लागि क्याचिङ मेकानिज्महरू थप्नुहोस्  
5. अनुगमन ड्यासबोर्ड विकास गर्नुहोस्  
6. विभिन्न अनुरोध ढाँचाहरू संग परीक्षण गर्नुहोस्  

**प्रविधिहरू:** तपाईंको रुचि अनुसार Python (.NET/Java/Python) प्रयोग गर्न सक्नुहुन्छ, क्याचिङका लागि Redis, र ड्यासबोर्डका लागि सरल वेब फ्रेमवर्क।

### परियोजना २: उद्यम अगिम व्यवस्थापन प्रणाली

**उद्देश्य:** एक MCP-आधारित प्रणाली विकास गर्नुहोस् जसले संगठनभर अगिम टेम्प्लेटहरू व्यवस्थापन, संस्करण नियन्त्रण, र तैनाथी गर्न सकोस्।

**आवश्यकताहरू:**
- सँग्रहित प्रोम्प्ट टेम्प्लेटहरूको लागि केन्द्रीय रिपोजिटोरी बनाउनुहोस्
- भर्सनिङ र अनुमोदन कार्यप्रवाहहरू कार्यान्वयन गर्नुहोस्
- नमूना इनपुटहरूसँग टेम्प्लेट परीक्षण क्षमताहरू निर्माण गर्नुहोस्
- भूमिका आधारित पहुँच नियन्त्रणहरू विकास गर्नुहोस्
- टेम्प्लेट पुन: प्राप्ति र परिनियोजनको लागि API सिर्जना गर्नुहोस्

**कार्यान्वयन चरणहरू:**

1. टेम्प्लेट भण्डारणको लागि डेटाबेस स्कीमा डिजाइन गर्नुहोस्
2. टेम्प्लेट CRUD अपरेसनहरूका लागि कोर API सिर्जना गर्नुहोस्
3. भर्सनिङ प्रणाली कार्यान्वयन गर्नुहोस्
4. अनुमोदन कार्यप्रवाह निर्माण गर्नुहोस्
5. परीक्षण फ्रेमवर्क विकास गर्नुहोस्
6. व्यवस्थापनका लागि सरल वेब इन्टरफेस सिर्जना गर्नुहोस्
7. MCP सर्भरसँग एकीकरण गर्नुहोस्

**प्रविधिहरू:** ब्याकएन्ड फ्रेमवर्क, SQL वा NoSQL डेटाबेस, र व्यवस्थापन इन्टरफेसका लागि फ्रन्टएन्ड फ्रेमवर्क तपाईंको रोजाइअनुसार।

### प्रोजेक्ट ३: MCP-आधारित सामग्री निर्माण प्लेटफर्म

**उद्देश्य:** विभिन्न सामग्री प्रकारहरूमा निरन्तर नतिजा प्रदान गर्न MCP उपयोग गरेर सामग्री निर्माण प्लेटफर्म बनाउनुहोस्।

**आवश्यकताहरू:**

- बहु सामग्री ढाँचाहरू (ब्लग पोस्टहरू, सामाजिक मिडिया, मार्केटिङ कपी) समर्थन गर्नुहोस्
- अनुकूलन विकल्पहरूसहित टेम्प्लेट-आधारित निर्माण कार्यान्वयन गर्नुहोस्
- सामग्री समीक्षा र प्रतिक्रिया प्रणाली सिर्जना गर्नुहोस्
- सामग्री प्रदर्शन मेट्रिक्स ट्र्याक गर्नुहोस्
- सामग्री भर्सनिङ र पुनरावृत्ति समर्थन गर्नुहोस्

**कार्यान्वयन चरणहरू:**

1. MCP क्लाइेन्ट पूर्वाधार सेटअप गर्नुहोस्
2. विभिन्न सामग्री प्रकारहरूको लागि टेम्प्लेटहरू सिर्जना गर्नुहोस्
3. सामग्री निर्माण पाइपलाइन बनाउनुहोस्
4. समीक्षा प्रणाली कार्यान्वयन गर्नुहोस्
5. मेट्रिक्स ट्र्याकिङ प्रणाली विकास गर्नुहोस्
6. टेम्प्लेट व्यवस्थापन र सामग्री निर्माणका लागि प्रयोगकर्ता इन्टरफेस सिर्जना गर्नुहोस्

**प्रविधिहरू:** तपाईंको रोजाइअनुसार प्रोग्रामिङ भाषा, वेब फ्रेमवर्क, र डेटाबेस प्रणाली।

## MCP प्रविधिका लागि भावी दिशा

### उदाउँदो प्रवृत्तिहरू

1. **बहु-मोडल MCP**
   - छवि, अडियो, र भिडियो मोडेलहरूसँग अन्तरक्रियाहरूलाई मानकीकृत गर्न MCP को विस्तार
   - क्रस-मोडल तर्क क्षमताहरूको विकास
   - विभिन्न मोडालिटीलाइ लक्षित मानकीकृत प्रोम्प्ट ढाँचाहरू

2. **संघीय MCP पूर्वाधार**
   - संगठनहरू बीच स्रोतहरू साझा गर्न सक्ने वितरण गरिएको MCP नेटवर्कहरू
   - सुरक्षित मोडल साझेदारीका लागि मानकीकृत प्रोटोकलहरू
   - गोपनीयता-संरक्षण गणना प्रविधिहरू

3. **MCP बजारहरू**
   - MCP टेम्प्लेटहरू र प्लगइनहरू साझा गर्ने र मुद्रीकरण गर्ने पारिस्थितिकी तन्त्रहरू
   - गुणस्तर सुनिश्चितता र प्रमाणन प्रक्रिया
   - मोडल बजारहरूसँग एकीकरण

4. **एज कम्प्युटिङका लागि MCP**
   - स्रोत सिमित एज उपकरणहरूका लागि MCP मानकहरूको अनुकूलन
   - कम-ब्यान्डविड्थ वातावरणको लागि अनुकूलित प्रोटोकलहरू
   - IoT पारिस्थितिकी तन्त्रका लागि विशेष MCP कार्यान्वयनहरू

5. **बाँधक फ्रेमवर्कहरू**
   - नियामक अनुपालनका लागि MCP विस्तारहरूको विकास
   - मानकीकृत अडिट ट्रेलहरू र स्पष्टता इन्टरफेसहरू
   - उदाउँदो AI शासन फ्रेमवर्कहरूसँग एकीकरण

### Microsoft का MCP समाधानहरू

Microsoft र Azure ले विभिन्न परिदृश्यहरूमा MCP कार्यान्वयन गर्नको लागि थुप्रै खुलेआम स्रोत रिपोजिटोरीहरू विकास गरेका छन्:

#### Microsoft संस्था

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - ब्राउजर स्वतःकरण र परीक्षणको लागि Playwright MCP सर्भर
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - स्थानीय परीक्षण र समुदाय योगदानका लागि OneDrive MCP सर्भर कार्यान्वयन
3. [NLWeb](https://github.com/microsoft/NlWeb) - खुला प्रोटोकलहरू र सम्बद्ध खुला स्रोत उपकरणहरूको संग्रह। यसको मुख्य फोकस AI वेबको लागि आधारभूत तह स्थापित गर्नु हो

#### Azure-Samples संस्था

1. [mcp](https://github.com/Azure-Samples/mcp) - Azure मा बहुभाषिक रूपमा MCP सर्भरहरू निर्माण र एकीकरणका लागि नमुना, उपकरण, र स्रोत सामग्रीहरू
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Model Context Protocol स्पेसिफिकेसनको वर्तमान संस्करणसँग प्रमाणीकरण प्रदर्शन गर्ने संदर्भ MCP सर्भरहरू
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Azure Functions मा Remote MCP Server कार्यान्वयनहरूको लागि सुविधाजनक पृष्ठ, भाषा-विशिष्ट रिपोजहरूका लिंकहरूसहित
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Azure Functions र Python द्वारा कस्टम रिमोट MCP सर्भरहरू बनाउन र परिनियोजन गर्न छिटो सुरु टेम्प्लेट
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Azure Functions र .NET/C# द्वारा कस्टम रिमोट MCP सर्भरहरू बनाउन र परिनियोजन गर्न छिटो सुरु टेम्प्लेट
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Azure Functions र TypeScript द्वारा कस्टम रिमोट MCP सर्भरहरू बनाउन र परिनियोजन गर्न छिटो सुरु टेम्प्लेट
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Python को प्रयोग गरी Azure API Management लाई एआई गेटवेका रूपमा प्रयोग गरेर रिमोट MCP सर्भरहरू
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI प्रयोगहरू जसमा MCP क्षमताहरू छन्, Azure OpenAI र AI Foundry सँग अन्तर्गरित

यी रिपोजिटोरीहरूले विभिन्न प्रोग्रामिङ भाषाहरू र Azure सेवाहरूमा Model Context Protocolसँग काम गर्न विभिन्न कार्यान्वयन, टेम्प्लेटहरू, र स्रोत सामग्रीहरू प्रदान गर्दछन्। यिनीहरू आधारभूत सर्भर कार्यान्वयनदेखि प्रमाणीकरण, क्लाउड परिनियोजन, र उद्यम एकीकरणसमेतको उपयोग केसहरू समेट्छन्।

#### MCP स्रोत सामग्री निर्देशिका

[अधिकृत Microsoft MCP रिपोजिटोरी](https://github.com/microsoft/mcp/tree/main/Resources) मा रहेको MCP Resources निर्देशिका Model Context Protocol सर्भरहरूसँग प्रयोगका लागि नमूना स्रोतहरू, प्रोम्प्ट टेम्प्लेटहरू, र उपकरण परिभाषाहरूको चयन गरिएको संग्रह प्रदान गर्दछ। यो निर्देशिका विकासकर्ताहरूलाई छिटो MCP सँग सुरुवात गर्न सहयोग पुर्‍याउँछ र निम्नका लागि पुन: प्रयोगयोग्य बिल्डिङ ब्लकहरू र उत्कृष्ट अभ्यासका उदाहरणहरू प्रदान गर्दछ:

- **प्रोम्प्ट टेम्प्लेटहरू:** सामान्य AI कार्यहरू र परिदृश्यहरूका लागि तयार-प्रयोग प्रोम्प्ट टेम्प्लेटहरू जुन तपाईं आफ्नै MCP सर्भर कार्यान्वयनहरूका लागि अनुकूलित गर्न सक्नुहुन्छ।
- **उपकरण परिभाषाहरू:** विभिन्न MCP सर्भरहरूको उपकरण एकीकरण र आव्हानलाई मानकीकृत गर्न उदाहरण उपकरण स्कीमा र मेटाडाटा।
- **स्रोत नमूना:** MCP फ्रेमवर्क भित्र डेटा स्रोतहरू, API हरू, र बाह्य सेवाहरूमा जडान गर्न नमूना स्रोत परिभाषाहरू।
- **सन्दर्भ कार्यान्वयनहरू:** वास्तविक विश्व MCP परियोजनाहरूमा स्रोतहरू, प्रोम्प्टहरू, र उपकरणहरू कसरी संरचना र व्यवस्थापन गर्ने तरिका देखाउने व्यवहारिक नमूनाहरू।

यी स्रोतहरूले विकासलाई तिब्र पार्छन्, मानकीकरणलाई प्रोत्साहन गर्छन्, र MCP आधारित समाधानहरू निर्माण र परिनियोजन गर्दा उत्कृष्ट अभ्यासहरू सुनिश्चित गर्न मद्दत गर्दछन्।

#### MCP स्रोत सामग्री निर्देशिका

- [MCP Resources (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)

### अनुसन्धानका अवसरहरू

- MCP फ्रेमवर्क भित्र कुशल प्रोम्प्ट अनुकूलन प्रविधिहरू
- बहु-भाडावाला MCP परिनियोजनहरूको लागि सुरक्षा मोडेलहरू
- विभिन्न MCP कार्यान्वयनहरूमा प्रदर्शन मूल्याङ्कन
- MCP सर्भरहरूको औपचारिक प्रमाणीकरण विधिहरू

## निष्कर्ष

Model Context Protocol (MCP) चाँडो गतिमा उदाउँदो, सुरक्षित, र अन्तरक्रियाशील AI एकीकरणको भविष्यलाई आकार दिइरहेको छ। यस पाठका केस अध्ययनहरू र हात-हात परियोजनाहरू मार्फत तपाईंले देख्नुभयो कि Microsoft र Azure जस्ता प्रारम्भिक प्रयोगकर्ताहरूले कसरी वास्तविक संसारका चुनौतीहरू समाधान गर्न, AI अपनाउने गति बढाउन, र अनुपालन, सुरक्षा, र स्केलेबिलिटी सुनिश्चित गर्न MCP प्रयोग गर्दैछन्। MCP को मोडुलर दृष्टिकोणले संगठनहरूलाई ठूलो भाषा मोडेलहरू, उपकरणहरू, र उद्यम डेटा एकीकृत, अडिटयोग्य फ्रेमवर्कमा जोड्न सक्षम पार्छ। MCP विकास जारी रहँदा, समुदायसँग संलग्न रहनु, खुला स्रोत स्रोतहरू अन्वेषण गर्नु, र उत्कृष्ट अभ्यासहरू लागू गर्नु बलियो, भविष्य-तयार AI समाधानहरू निर्माण गर्ने कुञ्जी हुनेछ।

## थप स्रोतहरू

- [MCP Foundry GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub Repository (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources Directory (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP Community & Documentation](https://modelcontextprotocol.io/introduction)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP Documentation](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - सुरक्षा उत्कृष्ट अभ्यासहरू
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

## अभ्यासहरू

1. कुनै एक केस अध्ययन विश्लेषण गरी वैकल्पिक कार्यान्वयन दृष्टिकोण प्रस्ताव गर्नुहोस्।
2. कुनै एक परियोजना विचार छान्नुहोस् र विस्तृत प्राविधिक स्पेसिफिकेसन तयार गर्नुहोस्।
3. केस अध्ययनहरूमा समेटिएका उद्योग बाहेक कुनै एउटा उद्योग अनुसन्धान गरी MCP कसरी त्यसका विशिष्ट चुनौतीहरू समाधान गर्न सक्छ भनेर रूपरेखा तयार पार्नुहोस्।
4. भावी दिशाहरू मध्ये कुनै एक अन्वेषण गरी त्यसलाई समर्थन गर्न नयाँ MCP विस्तारको अवधारणा सिर्जना गर्नुहोस्।

## के गर्ने अर्को

थप अन्वेषण: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

अगाडि बढ्नुहोस्: [Module 8: Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->