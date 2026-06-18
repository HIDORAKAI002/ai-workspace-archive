# 🌟 शुरुआती उपयोगकर्ताओं से शिक्षाएं

[![Lessons from MCP Early Adopters](../../../translated_images/hi/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(इस पाठ का वीडियो देखने के लिए ऊपर चित्र पर क्लिक करें)_

## 🎯 यह मॉड्यूल क्या कवर करता है

यह मॉड्यूल दर्शाता है कि कैसे वास्तविक संगठन और डेवलपर्स मॉडल कंटेक्स्ट प्रोटोकॉल (MCP) का उपयोग करके वास्तविक चुनौतियों को हल कर रहे हैं और नवाचार को आगे बढ़ा रहे हैं। विस्तृत केस स्टडी, व्यावहारिक प्रोजेक्ट, और उपयोगी उदाहरणों के माध्यम से, आप पाएंगे कि MCP सुरक्षित, स्केलेबल AI इंटीग्रेशन कैसे सक्षम करता है जो भाषा मॉडल, उपकरण, और एंटरप्राइज डेटा को जोड़ता है।

### 📚 MCP को क्रियान्वित होते देखें

क्या आप इन सिद्धांतों को प्रोडक्शन-तैयार टूल्स पर लागू होते देखना चाहते हैं? हमारे [**10 माइक्रोसॉफ्ट MCP सर्वर जो डेवलपर उत्पादकता को बदल रहे हैं**](microsoft-mcp-servers.md) देखें, जिसमें असली माइक्रोसॉफ्ट MCP सर्वर्स दिखाए गए हैं जिन्हें आप आज उपयोग कर सकते हैं।

## अवलोकन

यह पाठ बताता है कि कैसे शुरुआती उपयोगकर्ताओं ने मॉडल कंटेक्स्ट प्रोटोकॉल (MCP) का उपयोग करके वास्तविक दुनिया की समस्याओं को हल किया और उद्योगों में नवाचार को बढ़ावा दिया। विस्तृत केस स्टडीज और व्यावहारिक प्रोजेक्ट के माध्यम से, आप देखेंगे कि MCP एक मानकीकृत, सुरक्षित, और स्केलेबल AI इंटीग्रेशन कैसे सक्षम करता है — जो बड़े भाषा मॉडल, उपकरणों, और एंटरप्राइज डेटा को एकीकृत फ्रेमवर्क में जोड़ता है। आप MCP-आधारित समाधान डिजाइन और बनाने का व्यावहारिक अनुभव पाएंगे, सिद्ध अमल पैटर्न से सीखेंगे, और उत्पादन पर्यावरणों में MCP को तैनात करने के सर्वोत्तम अभ्यास जानेंगे। यह पाठ उभरते रुझानों, भविष्य के दिशा-निर्देशों, और ओपन-सोर्स संसाधनों को भी उजागर करता है ताकि आप MCP तकनीक और इसके विकसित होते इकोसिस्टम के अग्रिम पंक्ति में बने रहें।

## सीखने के उद्देश्य

- विभिन्न उद्योगों में वास्तविक दुनिया के MCP कार्यान्वयन का विश्लेषण करें
- पूर्ण MCP-आधारित एप्लिकेशन डिज़ाइन और बनाएं
- MCP तकनीक में उभरते रुझानों और भविष्य के दिशानिर्देशों का अन्वेषण करें
- वास्तविक विकास परिदृश्यों में सर्वोत्तम अभ्यास लागू करें

## वास्तविक-महान MCP कार्यान्वयन

### केस स्टडी 1: एंटरप्राइज ग्राहक सहायता ऑटोमेशन

एक बहुराष्ट्रीय निगम ने अपने ग्राहक सहायता प्रणालियों में AI इंटरैक्शन को मानकीकृत करने के लिए MCP-आधारित समाधान लागू किया। इससे वे सक्षम हुए:

- कई LLM प्रदाताओं के लिए एक एकीकृत इंटरफ़ेस बनाना
- विभागों में लगातार प्रॉम्प्ट प्रबंधन बनाए रखना
- मजबूत सुरक्षा और अनुपालन नियंत्रण लागू करना
- विशिष्ट आवश्यकताओं के आधार पर विभिन्न AI मॉडलों के बीच आसानी से स्विच करना

**तकनीकी कार्यान्वयन:**

```python
# ग्राहक सपोर्ट के लिए Python MCP सर्वर कार्यान्वयन
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# लॉगिंग कॉन्फ़िगर करें
logging.basicConfig(level=logging.INFO)

async def main():
    # सर्वर कॉन्फ़िगरेशन बनाएं
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # MCP सर्वर आरंभ करें
    server = create_server(config)
    
    # नॉलेज बेस संसाधन पंजीकृत करें
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # प्रॉम्प्ट टेम्पलेट पंजीकृत करें
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # सपोर्ट टूल पंजीकृत करें
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # HTTP ट्रांसपोर्ट के साथ सर्वर शुरू करें
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**परिणाम:** मॉडल लागत में 30% कमी, प्रतिक्रिया स्थिरता में 45% सुधार, और वैश्विक संचालन में अनुपालन बढ़ाना।

### केस स्टडी 2: हेल्थकेयर डायग्नोस्टिक सहायक

एक स्वास्थ्य सेवा प्रदाता ने कई विशेषीकृत चिकित्सा AI मॉडल को एकीकृत करने के लिए MCP अवसंरचना विकसित की, जबकि संवेदनशील रोगी डेटा की सुरक्षा सुनिश्चित की:

- सामान्य और विशेषज्ञ चिकित्सा मॉडल के बीच निर्बाध स्विचिंग
- सख्त गोपनीयता नियंत्रण और ऑडिट ट्रेल्स
- मौजूदा इलेक्ट्रॉनिक हेल्थ रिकॉर्ड (EHR) प्रणालियों के साथ एकीकरण
- चिकित्सा शब्दावली के लिए स्थिर प्रॉम्प्ट इंजीनियरिंग

**तकनीकी कार्यान्वयन:**

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
  
**परिणाम:** चिकित्सकों के लिए बेहतर निदान सुझाव, पूर्ण HIPAA अनुपालन बनाए रखते हुए, और प्रणालियों के बीच कॉन्टेक्स्ट-स्विचिंग में महत्वपूर्ण कमी।

### केस स्टडी 3: वित्तीय सेवा जोखिम विश्लेषण

एक वित्तीय संस्था ने विभिन्न विभागों में जोखिम विश्लेषण प्रक्रियाओं को मानकीकृत करने के लिए MCP लागू किया:

- क्रेडिट जोखिम, धोखाधड़ी पहचान, और निवेश जोखिम मॉडलों के लिए एक समेकित इंटरफ़ेस बनाया
- सख्त पहुंच नियंत्रण और मॉडल संस्करण प्रबंधन लागू किया
- सभी AI सिफारिशों की ऑडिट योग्यता सुनिश्चित की
- विविध प्रणालियों में डेटा स्वरूपण को संगति में रखा

**तकनीकी कार्यान्वयन:**

```java
// वित्तीय जोखिम मूल्यांकन के लिए जावा MCP सर्वर
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // वित्तीय अनुपालन सुविधाओं के साथ MCP सर्वर बनाएँ
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
  
**परिणाम:** नियामक अनुपालन में सुधार, 40% तेज़ मॉडल तैनाती चक्र, और विभागों में जोखिम मूल्यांकन स्थिरता में वृद्धि।

### केस स्टडी 4: माइक्रोसॉफ्ट Playwright MCP सर्वर ब्राउज़र ऑटोमेशन के लिए

माइक्रोसॉफ्ट ने [Playwright MCP सर्वर](https://github.com/microsoft/playwright-mcp) विकसित किया जो मॉडल कंटेक्स्ट प्रोटोकॉल के माध्यम से सुरक्षित, मानकीकृत ब्राउज़र ऑटोमेशन सक्षम करता है। यह प्रोडक्शन-तैयार सर्वर AI एजेंट और LLMs को नियंत्रित, ऑडिटेबल, और विस्तार योग्य तरीके से वेब ब्राउज़रों के साथ इंटरैक्ट करने की अनुमति देता है — जिससे स्वचालित वेब परीक्षण, डेटा निष्कर्षण, और एंड-टू-एंड वर्कफ़्लोज़ जैसे उपयोग मामले सक्षम होते हैं।

> **🎯 प्रोडक्शन रेडी टूल**  
> इस केस स्टडी में आप एक वास्तविक MCP सर्वर देख सकते हैं जिसे आप आज उपयोग कर सकते हैं! Playwright MCP सर्वर और अन्य 9 प्रोडक्शन-रेडी माइक्रोसॉफ्ट MCP सर्वर्स के बारे में जानने के लिए हमारे [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#8--playwright-mcp-server) देखें।

**मुख्य विशेषताएं:**  
- MCP टूल्स के रूप में ब्राउज़र ऑटोमेशन क्षमताएँ (नेविगेशन, फॉर्म भराई, स्क्रीनशॉट कैप्चर आदि) प्रदान करता है  
- अनधिकृत क्रियाओं को रोकने के लिए सख्त पहुंच नियंत्रण और सैंडबॉक्सिंग लागू करता है  
- सभी ब्राउज़र इंटरैक्शन के लिए विस्तृत ऑडिट लॉग प्रदान करता है  
- एजेंट संचालित ऑटोमेशन के लिए Azure OpenAI और अन्य LLM प्रदाताओं के साथ एकीकरण का समर्थन करता है  
- GitHub Copilot के कोडिंग एजेंट को वेब ब्राउज़िंग क्षमताओं से सशक्त करता है  

**तकनीकी कार्यान्वयन:**

```typescript
// TypeScript: MCP सर्वर में Playwright ब्राउज़र ऑटोमेशन टूल्स को रजिस्टर करना
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// एक टूल रजिस्टर करें जो URL पर नेविगेट करे और स्क्रीनशॉट कैप्चर करे
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

// MCP सर्वर शुरू करें
server.listen(8080);
```
  
**परिणाम:**  

- AI एजेंट और LLMs के लिए सुरक्षित, प्रोग्रामेटिक ब्राउज़र ऑटोमेशन सक्षम किया  
- मैनुअल परीक्षण प्रयास को कम किया और वेब अनुप्रयोगों के लिए परीक्षण कवर बढ़ाया  
- एंटरप्राइज वातावरणों में ब्राउज़र-आधारित टूल इंटीग्रेशन के लिए पुन: प्रयोज्य, विस्तार योग्य फ्रेमवर्क प्रदान किया  
- GitHub Copilot की वेब ब्राउज़िंग क्षमताओं को शक्ति प्रदान की  

**सन्दर्भ:**  

- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)  
- [Microsoft AI and Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)  

### केस स्टडी 5: Azure MCP – एंटरप्राइज-ग्रेड मॉडल कंटेक्स्ट प्रोटोकॉल सेवा के रूप में

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) माइक्रोसॉफ्ट का प्रबंधित, एंटरप्राइज-ग्रेड मॉडल कंटेक्स्ट प्रोटोकॉल कार्यान्वयन है, जो स्केलेबल, सुरक्षित, और अनुपालन वाले MCP सर्वर क्षमताएं क्लाउड सेवा के रूप में प्रदान करता है। Azure MCP संगठनों को MCP सर्वर को Azure AI, डेटा, और सुरक्षा सेवाओं के साथ तेजी से तैनात, प्रबंधित, और एकीकृत करने में सक्षम बनाता है, जिससे परिचालन भार कम होता है और AI अपनाने में तेजी आती है।

> **🎯 प्रोडक्शन रेडी टूल**  
> यह एक वास्तविक MCP सर्वर है जिसे आप आज उपयोग कर सकते हैं! माइक्रोसॉफ्ट फाउंड्री MCP सर्वर के बारे में अधिक जानने के लिए हमारे [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md) को देखें।

- पूर्ण प्रबंधित MCP सर्वर होस्टिंग के साथ अंतर्निहित स्केलिंग, निगरानी, और सुरक्षा  
- Azure OpenAI, Azure AI Search, और अन्य Azure सेवाओं के साथ देशज एकीकरण  
- Microsoft Entra ID के माध्यम से एंटरप्राइज प्रमाणीकरण और प्राधिकरण  
- कस्टम टूल्स, प्रॉम्प्ट टेम्प्लेट, और संसाधन कनेक्टर का समर्थन  
- एंटरप्राइज सुरक्षा और नियामक आवश्यकताओं के साथ अनुपालन

**तकनीकी कार्यान्वयन:**

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
  
**परिणाम:**  
- एंटरप्राइज AI परियोजनाओं के लिए तैयार-से-उपयोग, अनुपालनशील MCP सर्वर प्लेटफ़ॉर्म प्रदान करके मूल्य-संपादन का समय कम किया  
- LLMs, टूल्स, और एंटरप्राइज डेटा स्रोतों के एकीकरण को सरल बनाया  
- MCP कार्यभार के लिए सुरक्षा, प्रेक्षणक्षमता, और परिचालन कुशलता बढ़ाई  
- Azure SDK बेस्ट प्रैक्टिस और वर्तमान प्रमाणीकरण पैटर्न के साथ कोड गुणवत्ता में सुधार किया

**सन्दर्भ:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)  
- [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)  

## केस स्टडी 6: NLWeb  
MCP (मॉडल कंटेक्स्ट प्रोटोकॉल) चैटबॉट्स और AI सहायकों के उपकरणों के साथ इंटरैक्ट करने के लिए उभरता हुआ प्रोटोकॉल है। प्रत्येक NLWeb इंस्टेंस भी एक MCP सर्वर होता है, जो एक मुख्य विधि, ask, का समर्थन करता है, जिसका उपयोग प्राकृतिक भाषा में किसी वेबसाइट से प्रश्न पूछने के लिए किया जाता है। लौटाई गई प्रतिक्रिया schema.org का लाभ उठाती है, जो वेब डेटा का वर्णन करने के लिए व्यापक रूप से उपयोग की जाने वाली शब्दावली है। ढील से कहा जाए तो, MCP वही है जो HTTP है HTML के लिए। NLWeb प्रोटोकॉल, Schema.org स्वरूपों, और नमूना कोड को मिलाता है ताकि साइटें तेज़ी से ये एंडपॉइंट बना सकें, जिससे व्यक्ति वार्तालापात्मक इंटरफेस द्वारा और मशीनें स्वाभाविक एजेंट-से-एजेंट इंटरैक्शन द्वारा लाभान्वित होती हैं।

NLWeb के दो अलग घटक हैं।  
- एक प्रोटोकॉल, जो बहुत सरल है, एक साइट के साथ प्राकृतिक भाषा में संवाद करने के लिए और एक स्वरूप जो json और schema.org का लाभ उठाता है लौटे हुए उत्तर के लिए। REST API दस्तावेज़ देखें अधिक जानकारी के लिए।  
- (1) का एक सरल कार्यान्वयन जो मौजूदा मार्कअप का उपयोग करता है, उन साइटों के लिए जिन्हें वस्तुओं की सूची के तौर पर रूपांतरित किया जा सकता है (उत्पाद, व्यंजन, आकर्षण, समीक्षाएं, आदि)। यूजर इंटरफेस विजेट्स के सेट के साथ, साइटें अपने कंटेंट के लिए वार्तालापात्मक इंटरफेस आसानी से प्रदान कर सकती हैं। इसके काम करने के तरीके के बारे में अधिक विवरण के लिए Life of a chat query दस्तावेज़ देखें।  

**सन्दर्भ:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)  

### केस स्टडी 7: माइक्रोसॉफ्ट फाउंड्री MCP सर्वर – एंटरप्राइज AI एजेंट इंटीग्रेशन

माइक्रोसॉफ्ट फाउंड्री MCP सर्वर्स दिखाते हैं कि MCP का उपयोग एंटरप्राइज वातावरण में AI एजेंटों और वर्कफ़्लोज़ को समन्वित और प्रबंधित करने के लिए कैसे किया जा सकता है। MCP को माइक्रोसॉफ्ट फाउंड्री के साथ एकीकृत करके, संगठन एजेंट इंटरैक्शन्स को मानकीकृत कर सकते हैं, फाउंड्री के वर्कफ़्लो प्रबंधन का लाभ उठा सकते हैं, और सुरक्षित, स्केलेबल तैनाती सुनिश्चित कर सकते हैं।

> **🎯 प्रोडक्शन रेडी टूल**  
> यह एक वास्तविक MCP सर्वर है जिसे आप आज उपयोग कर सकते हैं! माइक्रोसॉफ्ट फाउंड्री MCP सर्वर के बारे में अधिक जानने के लिए हमारे [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server) देखें।

**मुख्य विशेषताएं:**  
- Azure के AI पारिस्थितिकी तंत्र तक व्यापक पहुँच, जिसमें मॉडल कैटलॉग और तैनाती प्रबंधन शामिल हैं  
- RAG अनुप्रयोगों के लिए Azure AI Search के साथ ज्ञान अनुक्रमण  
- AI मॉडल प्रदर्शन और गुणवत्ता आश्वासन के लिए मूल्यांकन उपकरण  
- Microsoft Foundry कैटलॉग और लैब्स के साथ कटिंग-एज शोध मॉडलों का एकीकरण  
- उत्पादन परिदृश्यों के लिए एजेंट प्रबंधन और मूल्यांकन क्षमताएं  

**परिणाम:**  
- AI एजेंट वर्कफ़्लोज़ के लिए तेज़ प्रोटोटाइपिंग और मजबूत निगरानी  
- उन्नत परिदृश्यों के लिए Azure AI सेवाओं के साथ सहज एकीकरण  
- एजेंट पाइपलाइनों के निर्माण, तैनाती, और निगरानी के लिए एकीकृत इंटरफ़ेस  
- एंटरप्राइज के लिए बेहतर सुरक्षा, अनुपालन, और परिचालन दक्षता  
- जटिल एजेंट-चालित प्रक्रियाओं पर नियंत्रण बनाए रखते हुए AI अपनाने को तेज़ किया  

**सन्दर्भ:**  
- [Microsoft Foundry MCP Server GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  

### केस स्टडी 8: Foundry MCP Playground – प्रयोग और प्रोटोटाइपिंग

Foundry MCP Playground MCP सर्वर्स और माइक्रोसॉफ्ट फाउंड्री एकीकरण के साथ प्रयोग करने के लिए एक तैयार-से-उपयोग पर्यावरण प्रदान करता है। डेवलपर्स तेजी से AI मॉडल और एजेंट वर्कफ़्लोज़ का प्रोटोटाइप, परीक्षण, और मूल्यांकन कर सकते हैं माइक्रोसॉफ्ट फाउंड्री कैटलॉग और लैब्स से संसाधनों का उपयोग करते हुए। यह प्लेग्राउंड सेटअप को सरल बनाता है, नमूना प्रोजेक्ट प्रदान करता है, और सहयोगी विकास का समर्थन करता है, जिससे न्यूनतम प्रयास के साथ सर्वोत्तम अभ्यास और नए परिदृश्य का अन्वेषण करना आसान हो जाता है। यह उन टीमों के लिए विशेष रूप से उपयोगी है जो विचारों को मान्य करना चाहते हैं, प्रयोग साझा करना चाहते हैं, और जटिल अवसंरचना की आवश्यकता के बिना सीखने को तेज़ करना चाहते हैं। प्रवेश की बाधा को कम करके, यह प्लेग्राउंड MCP और माइक्रोसॉफ्ट फाउंड्री इकोसिस्टम में नवाचार और सामुदायिक योगदान को बढ़ावा देता है।

**सन्दर्भ:**  

- [Foundry MCP Playground GitHub Repository](https://github.com/azure-ai-foundry/foundry-mcp-playground)  

### केस स्टडी 9: Microsoft Learn Docs MCP Server – AI-समर्थित दस्तावेज़ एक्सेस

Microsoft Learn Docs MCP Server एक क्लाउड-होस्टेड सेवा है जो मॉडल कंटेक्स्ट प्रोटोकॉल के माध्यम से AI सहायकों को आधिकारिक माइक्रोसॉफ्ट दस्तावेज़ों तक वास्तविक समय में पहुँच प्रदान करती है। यह प्रोडक्शन-तैयार सर्वर व्यापक Microsoft Learn इकोसिस्टम से जुड़ता है और सभी आधिकारिक माइक्रोसॉफ्ट स्रोतों में अर्थपूर्ण खोज सक्षम करता है।

> **🎯 प्रोडक्शन रेडी टूल**  
> यह एक वास्तविक MCP सर्वर है जिसे आप आज उपयोग कर सकते हैं! Microsoft Learn Docs MCP Server के बारे में अधिक जानने के लिए हमारे [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server) देखें।

**मुख्य विशेषताएं:**  
- आधिकारिक माइक्रोसॉफ्ट दस्तावेज़, Azure डॉक्यूमेंटेशन, और Microsoft 365 दस्तावेज़ों तक वास्तविक-समय पहुँच  
- संदर्भ और आशय को समझने वाली उन्नत अर्थपूर्ण खोज क्षमताएं  
- Microsoft Learn सामग्री प्रकाशित होते ही हमेशा ताज़ा जानकारी  
- Microsoft Learn, Azure दस्तावेज़, और Microsoft 365 स्रोतों में व्यापक कवरेज  
- 10 उच्च-गुणवत्ता वाली सामग्री खंडों के साथ लेख शीर्षक और URL प्रदान करता है  

**यह क्यों महत्वपूर्ण है:**  
- माइक्रोसॉफ्ट टेक्नोलॉजीज के लिए "पुरानी AI जानकारी" की समस्या को हल करता है  
- AI सहायकों को नवीनतम .NET, C#, Azure, और Microsoft 365 फ़ीचर्स तक पहुँच सुनिश्चित करता है  
- सटीक कोड उत्पादन के लिए प्राधिकृत, प्रथम-पक्षीय जानकारी प्रदान करता है  
- तेजी से विकसित हो रही माइक्रोसॉफ्ट टेक्नोलॉजीज के साथ काम करने वाले डेवलपर्स के लिए आवश्यक  

**परिणाम:**  
- माइक्रोसॉफ्ट तकनीकों के लिए AI-जेनरेटेड कोड की सटीकता में भारी सुधार  
- वर्तमान दस्तावेज़ और सर्वोत्तम प्रथाओं की खोज में लगने वाला समय कम किया  
- संदर्भ-सचेत दस्तावेज़ पुनर्प्राप्ति के साथ डेवलपर उत्पादकता बढ़ाई  
- विकास वर्कफ़्लोज़ के साथ सहज एकीकरण, IDE छोड़ने की ज़रूरत नहीं  

**सन्दर्भ:**  
- [Microsoft Learn Docs MCP Server GitHub Repository](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn Documentation](https://learn.microsoft.com/)  

## व्यावहारिक प्रोजेक्ट्स

### प्रोजेक्ट 1: मल्टी-प्रोवाइडर MCP सर्वर बनाएं

**उद्देश्य:** एक MCP सर्वर बनाएं जो विशिष्ट मापदंडों के आधार पर कई AI मॉडल प्रदाताओं को अनुरोध रूट कर सके।

**आवश्यकताएं:**

- कम से कम तीन अलग-अलग मॉडल प्रदाताओं का समर्थन करें (जैसे OpenAI, Anthropic, लोकल मॉडल्स)  
- अनुरोध मेटाडेटा के आधार पर रूटिंग तंत्र लागू करें  
- प्रदाता प्रमाणपत्र प्रबंधन के लिए विन्यास प्रणाली बनाएं  
- प्रदर्शन और लागतों को अनुकूलित करने के लिए कैशिंग जोड़ें  
- उपयोग की निगरानी के लिए सरल डैशबोर्ड बनाएं  

**कार्यान्वयन चरण:**

1. बुनियादी MCP सर्वर अवसंरचना सेटअप करें  
2. प्रत्येक AI मॉडल सेवा के लिए प्रदाता एडाप्टर लागू करें  
3. अनुरोध गुणों के आधार पर रूटिंग लॉजिक बनाएँ  
4. बार-बार अनुरोधों के लिए कैशिंग तंत्र जोड़ें  
5. निगरानी डैशबोर्ड विकसित करें  
6. विभिन्न अनुरोध पैटर्न के साथ परीक्षण करें  

**प्रौद्योगिकियां:** पसंद के अनुसार Python (.NET/Java/Python आधारित), कैशिंग के लिए Redis, और डैशबोर्ड के लिए एक सरल वेब फ्रेमवर्क चुनें।

### प्रोजेक्ट 2: एंटरप्राइज प्रॉम्प्ट प्रबंधन प्रणाली

**उद्देश्य:** एक MCP-आधारित प्रणाली विकसित करें जो संगठन भर में प्रॉम्प्ट टेम्प्लेट का प्रबंधन, संस्करण नियंत्रण, और तैनाती कर सके।

**आवश्यकताएं:**
- प्रांप्ट टेम्पलेट्स के लिए एक केंद्रीयकृत भंडार बनाएं
- संस्करण नियंत्रण और अनुमोदन वर्कफ़्लोज़ लागू करें
- नमूना इनपुट के साथ टेम्पलेट परीक्षण क्षमताएं बनाएं
- भूमिका-आधारित पहुंच नियंत्रण विकसित करें
- टेम्पलेट पुनःप्राप्ति और तैनाती के लिए एक API बनाएं

**कार्यान्वयन चरण:**

1. टेम्पलेट भंडारण के लिए डेटाबेस स्कीमा डिज़ाइन करें
2. टेम्पलेट CRUD ऑपरेशन्स के लिए कोर API बनाएं
3. संस्करण नियंत्रण प्रणाली लागू करें
4. अनुमोदन वर्कफ़्लो बनाएं
5. परीक्षण फ्रेमवर्क विकसित करें
6. प्रबंधन के लिए एक सरल वेब इंटरफ़ेस बनाएं
7. MCP सर्वर के साथ एकीकरण करें

**प्रौद्योगिकियां:** आपका पसंदीदा बैकएंड फ्रेमवर्क, SQL या NoSQL डेटाबेस, और प्रबंधन इंटरफ़ेस के लिए एक फ्रंटएंड फ्रेमवर्क।

### प्रोजेक्ट 3: MCP-आधारित कंटेंट निर्माण प्लेटफ़ॉर्म

**उद्देश्य:** एक कंटेंट निर्माण प्लेटफ़ॉर्म बनाएं जो MCP का उपयोग करके विभिन्न कंटेंट प्रकारों में सुसंगत परिणाम प्रदान करता है।

**आवश्यकताएँ:**

- कई कंटेंट स्वरूपों का समर्थन (ब्लॉग पोस्ट, सोशल मीडिया, मार्केटिंग कॉपी)
- अनुकूलन विकल्पों के साथ टेम्पलेट-आधारित निर्माण लागू करें
- कंटेंट समीक्षा और फीडबैक सिस्टम बनाएं
- कंटेंट प्रदर्शन मेट्रिक्स को ट्रैक करें
- कंटेंट संस्करण नियंत्रण और पुनरावृत्ति का समर्थन करें

**कार्यान्वयन चरण:**

1. MCP क्लाइंट इन्फ्रास्ट्रक्चर सेटअप करें
2. विभिन्न कंटेंट प्रकारों के लिए टेम्पलेट बनाएं
3. कंटेंट जनरेशन पाइपलाइन बनाएं
4. समीक्षा प्रणाली लागू करें
5. मेट्रिक्स ट्रैकिंग सिस्टम विकसित करें
6. टेम्पलेट प्रबंधन और कंटेंट निर्माण के लिए एक उपयोगकर्ता इंटरफ़ेस बनाएं

**प्रौद्योगिकियां:** आपकी पसंदीदा प्रोग्रामिंग भाषा, वेब फ्रेमवर्क, और डेटाबेस सिस्टम।

## MCP तकनीक के लिए भविष्य के दिशा-निर्देशन

### उभरते रुझान

1. **मल्टी-मोडल MCP**
   - इमेज, ऑडियो, और वीडियो मॉडल के साथ इंटरैक्शन को मानकीकृत करने के लिए MCP का विस्तार
   - क्रॉस-मोडल तर्क क्षमताओं का विकास
   - विभिन्न अभिरूपों के लिए मानकीकृत प्रांप्ट प्रारूप

2. **संघीय MCP इन्फ्रास्ट्रक्चर**
   - एक संगठन में संसाधनों को साझा कर सकने वाले वितरित MCP नेटवर्क
   - सुरक्षित मॉडल साझाकरण के लिए मानकीकृत प्रोटोकॉल
   - गोपनीयता-संरक्षित कंप्यूटेशन तकनीकें

3. **MCP मार्केटप्लेस**
   - MCP टेम्पलेट्स और प्लगइन्स को साझा करने और मुद्रीकृत करने के लिए इकोसिस्टम
   - गुणवत्ता आश्वासन और प्रमाणन प्रक्रियाएं
   - मॉडल मार्केटप्लेस के साथ एकीकरण

4. **एज कंप्यूटिंग के लिए MCP**
   - संसाधन-सीमित एज डिवाइसों के लिए MCP मानकों का अनुकूलन
   - निम्न-बैंडविड्थ परिवेशों के लिए ऑप्टिमाइज़्ड प्रोटोकॉल
   - IoT इकोसिस्टम के लिए विशेष MCP कार्यान्वयन

5. **नियामक ढांचे**
   - नियामक अनुपालन के लिए MCP एक्सटेंशंस का विकास
   - मानकीकृत ऑडिट ट्रेल्स और व्याख्यात्मक इंटरफ़ेस
   - उभरते AI शासन ढांचों के साथ एकीकरण

### Microsoft से MCP समाधान

Microsoft और Azure ने विभिन्न परिदृश्यों में MCP लागू करने में डेवलपर्स की मदद करने के लिए कई ओपन-सोर्स रिपॉजिटरी विकसित की हैं:

#### Microsoft संगठन

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - ब्राउज़र ऑटोमेशन और परीक्षण के लिए एक Playwright MCP सर्वर
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - स्थानीय परीक्षण और सामुदायिक योगदान के लिए OneDrive MCP सर्वर कार्यान्वयन
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb प्रोटोकॉल का संग्रह और संबद्ध ओपन सोर्स टूल्स, जिसका मुख्य फोकस AI वेब के लिए एक आधारभूत परत स्थापित करना है

#### Azure-Samples संगठन

1. [mcp](https://github.com/Azure-Samples/mcp) - Azure पर विभिन्न भाषाओं का उपयोग करके MCP सर्वर बनाने और एकीकृत करने के लिए सैंपल, टूल्स और संसाधन लिंक
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - वर्तमान मॉडल संदर्भ प्रोटोकॉल स्पेसिफिकेशन के साथ प्रमाणीकरण दिखाने वाले संदर्भ MCP सर्वर
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Azure Functions में रिमोट MCP सर्वर कार्यान्वयन के लिए लैंडिंग पेज, भाषा-विशिष्ट रिपोज़ लिंक के साथ
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Azure Functions के साथ Python का उपयोग करके कस्टम रिमोट MCP सर्वर बनाने और तैनात करने के लिए त्वरित शुरुआत टेम्पलेट
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Azure Functions के साथ .NET/C# का उपयोग करके कस्टम रिमोट MCP सर्वर बनाने और तैनात करने के लिए त्वरित शुरुआत टेम्पलेट
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Azure Functions के साथ TypeScript का उपयोग करके कस्टम रिमोट MCP सर्वर बनाने और तैनात करने के लिए त्वरित शुरुआत टेम्पलेट
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Python का उपयोग करते हुए AI गेटवे के रूप में Azure API प्रबंधन से रिमोट MCP सर्वरों तक
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI प्रयोग जिसमें MCP क्षमताएं शामिल हैं, Azure OpenAI और AI Foundry के साथ एकीकरण

ये रिपॉजिटरीज़ विभिन्न प्रोग्रामिंग भाषाओं और Azure सेवाओं में Model Context Protocol के साथ काम करने के लिए विभिन्न कार्यान्वयन, टेम्पलेट और संसाधन प्रदान करती हैं। ये बुनियादी सर्वर कार्यान्वयन, प्रमाणीकरण, क्लाउड तैनाती और एंटरप्राइज एकीकरण परिदृश्यों तक उपयोग के कई केस कवर करती हैं।

#### MCP संसाधन निर्देशिका

[Microsoft MCP मुख्य रिपॉजिटरी में MCP Resources directory](https://github.com/microsoft/mcp/tree/main/Resources) एक क्यूरेटेड संग्रह प्रदान करती है जो Model Context Protocol सर्वरों के साथ उपयोग के लिए सैंपल संसाधन, प्रांप्ट टेम्पलेट्स, और टूल परिभाषाएं शामिल हैं। यह निर्देशिका विकासकर्ताओं को MCP के साथ जल्दी शुरूआत करने में मदद करने के लिए पुन: उपयोग योग्य बिल्डिंग ब्लॉक्स और सर्वश्रेष्ठ प्रथाओं के उदाहरण प्रदान करती है, जैसे:

- **प्रांप्ट टेम्पलेट्स:** सामान्य AI कार्यों और परिदृश्यों के लिए तैयार-से-उपयोग प्रांप्ट टेम्पलेट्स, जिन्हें आपके अपने MCP सर्वर कार्यान्वयन के लिए अनुकूलित किया जा सकता है।
- **टूल परिभाषाएं:** टूल एकीकरण और विभिन्न MCP सर्वरों में कॉल को मानकीकृत करने के लिए उदाहरण टूल स्कीमा और मेटाडेटा।
- **संसाधन सैंपल्स:** MCP फ्रेमवर्क के भीतर डेटा स्रोतों, API, और बाहरी सेवाओं से कनेक्ट करने के लिए उदाहरण संसाधन परिभाषाएं।
- **संदर्भ कार्यान्वयन:** व्यावहारिक उदाहरण जो दिखाते हैं कि वास्तविक दुनिया के MCP प्रोजेक्ट्स में संसाधनों, प्रांप्ट्स, और टूल्स को कैसे संरचित और व्यवस्थित किया जाए।

ये संसाधन विकास को तेज़ करते हैं, मानकीकरण को बढ़ावा देते हैं, और MCP-आधारित समाधान बनाने और तैनात करने में सर्वोत्तम प्रथाओं को सुनिश्चित करने में मदद करते हैं।

#### MCP संसाधन निर्देशिका

- [MCP Resources (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)

### अनुसंधान अवसर

- MCP फ्रेमवर्क के भीतर कुशल प्रांप्ट अनुकूलन तकनीकें
- मल्टी-टेनेंट MCP तैनातियों के लिए सुरक्षा मॉडल
- विभिन्न MCP कार्यान्वयनों में प्रदर्शन मापन
- MCP सर्वरों के लिए औपचारिक सत्यापन विधियां

## निष्कर्ष

Model Context Protocol (MCP) तेजी से उद्योगों में मानकीकृत, सुरक्षित, और इंटरऑपरेबल AI एकीकरण के भविष्य को आकार दे रहा है। इस पाठ में केस स्टडीज़ और हैंड्स-ऑन प्रोजेक्ट्स के माध्यम से, आपने देखा कि शुरुआती अपनाने वाले—जिनमें Microsoft और Azure शामिल हैं—MCP का उपयोग वास्तविक-विश्व चुनौतियों को हल करने, AI को तेज़ी से अपनाने, और अनुपालन, सुरक्षा, और स्केलबिलिटी सुनिश्चित करने के लिए कैसे कर रहे हैं। MCP का मॉड्यूलर दृष्टिकोण संगठनों को बड़ी भाषा मॉडल, टूल्स, और एंटरप्राइज डेटा को एक एकीकृत, ऑडिटेबल फ्रेमवर्क में जोड़ने में सक्षम बनाता है। जैसे-जैसे MCP विकसित होता रहेगा, समुदाय के साथ जुड़ा रहना, ओपन-सोर्स संसाधनों की खोज करना, और सर्वोत्तम प्रथाओं को लागू करना मजबूत और भविष्य-तैयार AI समाधान बनाने की कुंजी होगी।

## अतिरिक्त संसाधन

- [MCP Foundry GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub Repository (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources Directory (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP Community & Documentation](https://modelcontextprotocol.io/introduction)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP Documentation](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - सुरक्षा सर्वोत्तम प्रथाएं
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

## अभ्यास

1. एक केस स्टडी का विश्लेषण करें और एक विकल्प कार्यान्वयन दृष्टिकोण प्रस्तावित करें।
2. परियोजना विचारों में से एक चुनें और एक विस्तृत तकनीकी विनिर्देश बनाएं।
3. एक ऐसा उद्योग खोजें जो केस स्टडीज़ में कवर न हो और बताएं कि MCP उसके विशिष्ट चुनौतियों को कैसे संबोधित कर सकता है।
4. भविष्य के दिशा-निर्देशों में से एक का अन्वेषण करें और उसे समर्थन देने के लिए एक नया MCP एक्सटेंशन अवधारणा बनाएं।

## आगे क्या

और खोजें: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

जारी रखें: [मॉड्यूल 8: सर्वोत्तम प्रथाएं](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->