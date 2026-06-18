# 🌟 Mga Aral mula sa mga Maagang Tagagamit

[![Mga Aral mula sa MCP Maagang Tagagamit](../../../translated_images/tl/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(I-click ang larawan sa itaas para makita ang video ng aral na ito)_

## 🎯 Ano ang Nilalaman ng Modyul na Ito

Tinutuklas ng modyul na ito kung paano ginagamit ng mga totoong organisasyon at developer ang Model Context Protocol (MCP) upang lutasin ang mga aktwal na hamon at itulak ang inobasyon. Sa pamamagitan ng mga detalyadong kaso ng pag-aaral, mga proyekto na may aktwal na aplikasyon, at praktikal na mga halimbawa, matutuklasan mo kung paano pinapagana ng MCP ang ligtas at nasuskalang integrasyon ng AI na nag-uugnay sa mga language model, mga kasangkapan, at datos ng negosyo.

### 📚 Tingnan ang MCP sa Aksyon

Nais mo bang makita ang mga prinsipyo na ito na inilapat sa mga tool na handa na para sa produksyon? Tingnan ang aming [**10 Microsoft MCP Servers Na Nagbabago sa Produktibidad ng Developer**](microsoft-mcp-servers.md), na nagpapakita ng mga tunay na Microsoft MCP server na maaari mong gamitin ngayon.

## Pangkalahatang-ideya

Tinutuklas ng aral na ito kung paano ginamit ng mga maagang tagagamit ang Model Context Protocol (MCP) upang lutasin ang mga totoong suliranin at itulak ang inobasyon sa iba't ibang industriya. Sa pamamagitan ng detalyadong mga kaso ng pag-aaral at aktwal na mga proyekto, makikita mo kung paano pinapagana ng MCP ang standardized, ligtas, at nasuskalang AI integration—nag-uugnay ng malalaking language model, mga kasangkapan, at datos ng negosyo sa isang pinag-isang balangkas. Magkakaroon ka ng praktikal na karanasan sa pagdidisenyo at pagtatayo ng mga solusyong nakabase sa MCP, matututo mula sa mga napatunayang pattern ng implementasyon, at matutuklasan ang mga pinakamahusay na gawi para sa pag-deploy ng MCP sa mga production na kapaligiran. Ipinapakita rin ng aral ang mga umuusbong na trend, mga hinaharap na direksyon, at mga open-source na mapagkukunan upang matulungan kang manatiling nangunguna sa teknolohiya ng MCP at sa umuusbong nitong ekosistema.

## Mga Layunin sa Pagkatuto

- Analisa ang mga totoong implementasyon ng MCP sa iba't ibang industriya
- Magdisenyo at bumuo ng kumpletong aplikasyon na nakabase sa MCP
- Tuklasin ang mga umuusbong na trend at hinaharap na direksyon sa teknolohiya ng MCP
- Ilapat ang pinakamahusay na gawi sa aktwal na mga senaryo ng pag-develop

## Mga Totoong Implementasyon ng MCP

### Kaso ng Pag-aaral 1: Enterprise Customer Support Automation

Isang multinasyunal na korporasyon ang nagpasa ng isang MCP-based na solusyon upang maging standard ang mga AI interaction sa kanilang mga sistema ng customer support. Pinayagan nito silang:

- Lumikha ng pinag-isang interface para sa maraming LLM provider
- Panatilihin ang konsistenteng pamamahala ng prompt sa lahat ng departamento
- Magpatupad ng mahigpit na seguridad at mga kontrol sa pagsunod
- Madaling lumipat sa pagitan ng iba't ibang AI model batay sa partikular na pangangailangan

**Teknikal na Implementasyon:**

```python
# Implementasyon ng Python MCP server para sa suporta sa customer
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# I-configure ang pag-log
logging.basicConfig(level=logging.INFO)

async def main():
    # Gumawa ng konfigurasyon ng server
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # I-initialize ang MCP server
    server = create_server(config)
    
    # Irehistro ang mga resource ng knowledge base
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Irehistro ang mga template ng prompt
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Irehistro ang mga tool ng suporta
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Simulan ang server gamit ang HTTP transport
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Mga Resulta:** 30% pagbawas sa gastos ng model, 45% pagbuti sa konsistensi ng tugon, at pinahusay na pagsunod sa buong global na operasyon.

### Kaso ng Pag-aaral 2: Healthcare Diagnostic Assistant

Isang healthcare provider ang bumuo ng imprastraktura ng MCP upang isama ang maraming specialized na medikal na AI model habang tinitiyak ang proteksyon ng sensitibong datos ng pasyente:

- Walang patid na paglipat sa pagitan ng generalist at specialist na medikal na mga model
- Mahigpit na kontrol sa privacy at mga audit trail
- Integrasyon sa umiiral na Electronic Health Record (EHR) system
- Konsistenteng prompt engineering para sa terminolohiyang medikal

**Teknikal na Implementasyon:**

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
  
**Mga Resulta:** Pinabuting mga mungkahing diagnóstico para sa mga doktor habang pinananatili ang buong pagsunod sa HIPAA at malaking pagbawas sa context-switching sa pagitan ng mga sistema.

### Kaso ng Pag-aaral 3: Financial Services Risk Analysis

Isang institusyong pinansyal ang nagpasa ng MCP upang maging standard ang kanilang proseso ng risk analysis sa iba't ibang departamento:

- Lumikha ng pinag-isang interface para sa credit risk, fraud detection, at investment risk na mga modelo
- Nagpatupad ng mahigpit na access control at model versioning
- Tiniyak ang auditability ng lahat ng rekomendasyon mula sa AI
- Panatilihin ang pare-parehong pag-format ng datos sa iba't ibang sistema

**Teknikal na Implementasyon:**

```java
// Java MCP server para sa pagsusuri ng pinansyal na panganib
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Lumikha ng MCP server na may mga tampok para sa pagsunod sa pinansyal
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
  
**Mga Resulta:** Pinalakas na pagsunod sa regulasyon, 40% mas mabilis na mga cycle ng deployment ng modelo, at pinabuting konsistencia sa pagsusuri ng panganib sa mga departamento.

### Kaso ng Pag-aaral 4: Microsoft Playwright MCP Server para sa Browser Automation

Binuo ng Microsoft ang [Playwright MCP server](https://github.com/microsoft/playwright-mcp) upang payagan ang ligtas, standardized browser automation gamit ang Model Context Protocol. Pinapayagan ng server na ito, na handa na para sa produksyon, ang mga AI agent at LLM na makipag-interact sa mga web browser sa isang kontrolado, auditable, at extensible na paraan—nagpapahintulot sa mga use case tulad ng automated web testing, data extraction, at end-to-end workflows.

> **🎯 Tool na Handa na para sa Produksyon**  
> 
> Ipinapakita ng kaso ng pag-aaral na ito ang isang tunay na MCP server na maaari mong gamitin ngayon! Alamin pa tungkol sa Playwright MCP Server at 9 pang production-ready na Microsoft MCP server sa aming [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Pangunahing Tampok:**
- Nagbibigay ng kakayahan para sa browser automation (navigation, pagpuno ng form, pagkuha ng screenshot, atbp.) bilang mga MCP tool
- Nagpapatupad ng mahigpit na access control at sandboxing para maiwasan ang hindi awtorisadong aksyon
- Nagbibigay ng detalyadong audit logs para sa lahat ng browser interaction
- Sinusuportahan ang integrasyon sa Azure OpenAI at iba pang LLM provider para sa agent-driven automation
- Pinapagana ang GitHub Copilot's Coding Agent gamit ang mga kakayahan sa web browsing

**Teknikal na Implementasyon:**

```typescript
// TypeScript: Nagrerehistro ng mga Playwright na kagamitan para sa pag-automate ng browser sa isang MCP server
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Magrehistro ng isang kagamitan para sa pag-navigate sa isang URL at pagkuha ng screenshot
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

// Simulan ang MCP server
server.listen(8080);
```
  
**Mga Resulta:**

- Pinagana ang ligtas at programmatic browser automation para sa mga AI agent at LLM
- Nabawasan ang manual testing effort at napabuti ang test coverage para sa mga web application
- Nagbigay ng reusable at extensible na balangkas para sa integrasyon ng mga browser-based na tool sa mga kapaligiran ng negosyo
- Pinapagana ang kakayahan sa web browsing ng GitHub Copilot

**Mga Sanggunian:**

- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)
- [Microsoft AI and Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)

### Kaso ng Pag-aaral 5: Azure MCP – Enterprise-Grade Model Context Protocol bilang Serbisyo

Ang Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) ay ang managed, enterprise-grade na implementasyon ng Model Context Protocol ng Microsoft, na idinisenyo upang magbigay ng scalable, secure, at compliant na kakayahan sa MCP server bilang isang cloud service. Pinapahintulutan ng Azure MCP ang mga organisasyon na mabilis na mag-deploy, mag-manage, at magsama ng mga MCP server sa Azure AI, datos, at mga security service, na nagpapababa ng operational overhead at nagpapabilis ng paggamit ng AI.

> **🎯 Tool na Handa na para sa Produksyon**  
> 
> Ito ay isang tunay na MCP server na maaari mong gamitin ngayon! Alamin pa tungkol sa Microsoft Foundry MCP Server sa aming [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md).

- Ganap na managed na MCP server hosting na may built-in na scaling, monitoring, at seguridad
- Native na integrasyon sa Azure OpenAI, Azure AI Search, at iba pang Azure services
- Enterprise authentication at authorization gamit ang Microsoft Entra ID
- Suporta para sa custom tools, prompt templates, at resource connectors
- Pagsunod sa mga pangangailangan sa seguridad at regulasyon ng enterprise

**Teknikal na Implementasyon:**

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
  
**Mga Resulta:**  
- Pinababa ang oras sa pag-abot ng halaga para sa mga proyekto ng enterprise AI sa pamamagitan ng pagbibigay ng handa nang gamitin at compliant na MCP server platform  
- Pinadali ang integrasyon ng LLM, mga tool, at mga pinagkukunan ng datos ng negosyo  
- Pinalakas ang seguridad, obserbabilidad, at kahusayan sa operasyon para sa mga MCP workload  
- Napabuti ang kalidad ng code gamit ang pinakamahusay na kasanayan sa Azure SDK at kasalukuyang mga pattern sa authentication  

**Mga Sanggunian:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)  
- [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)

## Kaso ng Pag-aaral 6: NLWeb  
Ang MCP (Model Context Protocol) ay isang umuusbong na protocol para sa mga Chatbot at AI assistant upang makipag-interact sa mga tool. Bawat NLWeb instance ay isang MCP server din, na sumusuporta sa isang pangunahing metodo, ang ask, na ginagamit upang magtanong sa isang website gamit ang natural na wika. Ang ipinabalik na tugon ay gumagamit ng schema.org, isang malawak na ginagamit na bokabularyo para ilarawan ang web data. Sa madaling salita, ang MCP ay parang NLWeb gaya ng Http ay sa HTML. Pinagsasama ng NLWeb ang mga protocol, mga format ng Schema.org, at sample code upang tulungan ang mga site na mabilis na makalikha ng mga endpoint na ito, na nakikinabang pareho sa mga tao sa pamamagitan ng conversational interfaces at sa mga makina sa pamamagitan ng natural na pakikipag-ugnayan ng agent-to-agent.

May dalawang natatanging bahagi ang NLWeb.  
- Isang protocol, napakasimple simulan, para makipag-interface sa isang site gamit ang natural na wika at isang format, gamit ang json at schema.org para sa ipinabalik na sagot. Tingnan ang dokumentasyon sa REST API para sa karagdagang detalye.  
- Isang diretso na implementasyon ng (1) na gumagamit ng umiiral na markup, para sa mga site na maaaring i-abstract bilang listahan ng mga item (produkto, resipi, atraksyon, review, atbp.). Kasama ng mga widget para sa user interface, madali para sa mga site na magbigay ng conversational interfaces sa kanilang nilalaman. Tingnan ang dokumentasyon sa Life of a chat query para sa karagdagang detalye kung paano ito gumagana.

**Mga Sanggunian:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Kaso ng Pag-aaral 7: Microsoft Foundry MCP Server – Integrasyon ng Enterprise AI Agent

Ipinapakita ng mga Microsoft Foundry MCP servers kung paano maaaring gamitin ang MCP upang i-orchestrate at pamahalaan ang AI agent at workflows sa mga kapaligiran ng negosyo. Sa pamamagitan ng integrasyon ng MCP sa Microsoft Foundry, maaaring gawing standard ang interaksyon ng mga agent, gamitin ang workflow management ng Foundry, at matiyak ang ligtas at nasuskalang deployment.

> **🎯 Tool na Handa na para sa Produksyon**  
> 
> Ito ay isang tunay na MCP server na maaari mong gamitin ngayon! Alamin pa tungkol sa Microsoft Foundry MCP Server sa aming [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Pangunahing Tampok:**
- Komprehensibong access sa Azure AI ecosystem, kabilang ang katalogo ng model at pamamahala ng deployment
- Knowledge indexing gamit ang Azure AI Search para sa RAG application
- Mga evaluation tool para sa performance at kalidad ng AI model
- Integrasyon sa Microsoft Foundry Catalog at Labs para sa makabagong research models
- Kakayahan sa pamamahala at pagsusuri ng mga agent para sa production scenarios

**Mga Resulta:**
- Mabilis na prototyping at matatag na pagmo-monitor ng workflow ng AI agents
- Walang putol na integrasyon sa Azure AI services para sa mga advanced na senaryo
- Pinag-isang interface para bumuo, mag-deploy, at mag-monitor ng mga agent pipeline
- Pinabuting seguridad, pagsunod, at kahusayan sa operasyon para sa mga enterprise
- Pinabilis na paggamit ng AI habang pinapanatili ang kontrol sa mga kumplikadong proseso ng agent

**Mga Sanggunian:**
- [Microsoft Foundry MCP Server GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Kaso ng Pag-aaral 8: Foundry MCP Playground – Eksperimento at Prototyping

Nagbibigay ang Foundry MCP Playground ng handa nang gamitin na kapaligiran para sa pag-eksperimento sa mga MCP server at integrasyon sa Microsoft Foundry. Maaaring mabilis na gumawa ng prototype, subukan, at suriin ng mga developer ang mga AI model at agent workflow gamit ang mga mapagkukunan mula sa Microsoft Foundry Catalog at Labs. Pinapaayos ng playground ang setup, nagbibigay ng mga sample project, at sumusuporta sa kolaboratibong pag-develop, na nagpapadali para tuklasin ang pinakamahusay na mga gawi at bagong senaryo na may kaunting pasanin. Kapaki-pakinabang ito para sa mga koponang nais i-validate ang mga ideya, ibahagi ang eksperimento, at pabilisin ang pagkatuto nang hindi nangangailangan ng kumplikadong imprastraktura. Sa pagpapababa ng hadlang sa pagsisimula, tinutulungan ng playground na palaguin ang inobasyon at kontribusyon ng komunidad sa MCP at Microsoft Foundry ecosystem.

**Mga Sanggunian:**

- [Foundry MCP Playground GitHub Repository](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Kaso ng Pag-aaral 9: Microsoft Learn Docs MCP Server – AI-Powered na Pag-access sa Dokumentasyon

Ang Microsoft Learn Docs MCP Server ay isang cloud-hosted service na nagbibigay sa mga AI assistant ng real-time na access sa opisyal na dokumentasyon ng Microsoft sa pamamagitan ng Model Context Protocol. Ang production-ready server na ito ay konektado sa komprehensibong Microsoft Learn ecosystem at nagpapahintulot sa semantic search sa lahat ng opisyal na pinanggalingan ng Microsoft.

> **🎯 Tool na Handa na para sa Produksyon**  
> 
> Ito ay isang tunay na MCP server na maaari mong gamitin ngayon! Alamin pa tungkol sa Microsoft Learn Docs MCP Server sa aming [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Pangunahing Tampok:**
- Real-time na access sa opisyal na dokumentasyon ng Microsoft, Azure docs, at Microsoft 365 documentation
- Advanced na semantic search na naiintindihan ang konteksto at layunin
- Palaging napapanahong impormasyon dahil ang nilalaman ng Microsoft Learn ay naipapublish ng regular
- Komprehensibong coverage sa Microsoft Learn, Azure documentation, at Microsoft 365 sources
- Nagbabalik ng hanggang 10 mataas na kalidad na piraso ng nilalaman na may mga pamagat ng artikulo at URL

**Bakit Mahalaga Ito:**
- Nilulutas ang problema ng "lipas na kaalaman ng AI" para sa mga teknolohiyang Microsoft
- Tinitiyak na may access ang mga AI assistant sa pinakabagong feature ng .NET, C#, Azure, at Microsoft 365
- Nagbibigay ng awtoridad na impormasyon mula sa unang partido para sa tumpak na pagbuo ng code
- Mahalagang tool para sa mga developer na nagtatrabaho gamit ang mabilis na umuunlad na mga teknolohiya ng Microsoft

**Mga Resulta:**
- Lubhang pinabuting katumpakan ng AI-generated na code para sa mga teknolohiyang Microsoft
- Nabawasan ang oras na ginugol sa paghahanap ng kasalukuyang dokumentasyon at pinakamahusay na praktis
- Pinahusay ang produktibidad ng developer gamit ang context-aware na retrieval ng dokumentasyon
- Walang putol na integrasyon sa mga workflow sa pag-develop nang hindi kinakailangang lumabas ng IDE

**Mga Sanggunian:**
- [Microsoft Learn Docs MCP Server GitHub Repository](https://github.com/MicrosoftDocs/mcp)
- [Microsoft Learn Documentation](https://learn.microsoft.com/)

## Mga Proyektong Hands-on

### Proyekto 1: Bumuo ng Multi-Provider MCP Server

**Layunin:** Gumawa ng MCP server na maaaring mag-ruta ng mga kahilingan sa iba't ibang AI model provider base sa partikular na pamantayan.

**Mga Kinakailangan:**

- Suportahan ang hindi bababa sa tatlong iba't ibang provider ng modelo (hal., OpenAI, Anthropic, lokal na mga modelo)
- Magpatupad ng mekanismo para sa routing base sa metadata ng kahilingan
- Gumawa ng sistema ng konfigurasyon para sa pamamahala ng kredensyal ng provider
- Magdagdag ng caching upang mapahusay ang performance at gastos
- Bumuo ng simpleng dashboard para sa pagmonitor ng paggamit

**Mga Hakbang sa Implementasyon:**

1. I-set up ang batayang imprastruktura ng MCP server  
2. Implement ang mga adapter ng provider para sa bawat serbisyo ng AI model  
3. Gumawa ng routing logic base sa mga attribute ng kahilingan  
4. Magdagdag ng mga mekanismo ng caching para sa madalas na mga kahilingan  
5. Bumuo ng monitoring dashboard  
6. Subukan gamit ang iba't ibang pattern ng kahilingan  

**Mga Teknolohiya:** Pumili mula sa Python (.NET/Java/Python base sa iyong kagustuhan), Redis para sa caching, at simpleng web framework para sa dashboard.

### Proyekto 2: Enterprise Prompt Management System

**Layunin:** Paunlarin ang isang MCP-based na sistema para sa pamamahala, pag-version, at pag-deploy ng mga prompt template sa buong organisasyon.

**Mga Kinakailangan:**
- Gumawa ng sentralisadong imbakan para sa mga template ng prompt
- Ipatupad ang versioning at mga workflow ng pag-apruba
- Bumuo ng mga kakayahan sa pagsubok ng template gamit ang mga sample na input
- Paunlarin ang mga role-based access control
- Gumawa ng API para sa retrieval at deployment ng mga template

**Mga Hakbang sa Pagpapatupad:**

1. Disenyuhin ang schema ng database para sa imbakan ng template
2. Gumawa ng core API para sa mga operasyon ng CRUD ng template
3. Ipatupad ang sistema ng versioning
4. Bumuo ng workflow ng pag-apruba
5. Paunlarin ang framework sa pagsubok
6. Gumawa ng simpleng web interface para sa pamamahala
7. I-integrate sa isang MCP server

**Mga Teknolohiya:** Ang iyong napiling backend framework, SQL o NoSQL na database, at isang frontend framework para sa interface ng pamamahala.

### Proyekto 3: MCP-Based na Plataporma para sa Pagbuo ng Nilalaman

**Layunin:** Bumuo ng plataporma para sa pagbuo ng nilalaman na gumagamit ng MCP upang magbigay ng consistent na resulta sa iba't ibang uri ng nilalaman.

**Mga Kinakailangan:**

- Suportahan ang maraming format ng nilalaman (mga blog post, social media, marketing copy)
- Ipatupad ang generation base sa template na may mga opsyon sa pagkustomisa
- Gumawa ng sistema para sa pagsusuri at feedback ng nilalaman
- Subaybayan ang mga metric ng performance ng nilalaman
- Suportahan ang versioning at iterasyon ng nilalaman

**Mga Hakbang sa Pagpapatupad:**

1. I-set up ang imprastruktura ng MCP client
2. Gumawa ng mga template para sa iba't ibang uri ng nilalaman
3. Bumuo ng content generation pipeline
4. Ipatupad ang sistema ng review
5. Paunlarin ang sistema ng pagsubaybay ng metrics
6. Lumikha ng user interface para sa pamamahala ng template at pagbuo ng nilalaman

**Mga Teknolohiya:** Iyong paboritong programming language, web framework, at sistema ng database.

## Mga Hinaharap na Direksyon para sa Teknolohiyang MCP

### Mga Lumilitaw na Trend

1. **Multi-Modal MCP**
   - Pagpapalawak ng MCP upang i-standardize ang pakikipag-ugnayan sa mga modelo ng larawan, audio, at video
   - Pag-unlad ng cross-modal reasoning na mga kakayahan
   - Standardized na mga format ng prompt para sa iba't ibang modality

2. **Federated MCP Infrastructure**
   - Mga distributed na network ng MCP na maaaring magbahagi ng mga resources sa iba't ibang organisasyon
   - Standardized na mga protocol para sa secure na pagbabahagi ng mga modelo
   - Mga teknik na nagpoprotekta sa privacy sa computation

3. **MCP Marketplaces**
   - Mga ekosistema para sa pagbabahagi at pagmomonetize ng MCP templates at plugins
   - Mga proseso ng quality assurance at sertipikasyon
   - Integrasyon sa mga marketplace ng modelo

4. **MCP para sa Edge Computing**
   - Adaptasyon ng mga standard ng MCP para sa mga device sa edge na may limitadong resources
   - Mga optimized na protocol para sa mga low-bandwidth na kapaligiran
   - Mga espesyal na implementasyon ng MCP para sa mga IoT ecosystem

5. **Mga Regulatory Framework**
   - Pagbuo ng mga extension ng MCP para sa pagsunod sa mga regulasyon
   - Standardized na audit trails at mga interface para sa explainability
   - Integrasyon sa mga umuusbong na framework ng AI governance

### Mga Solusyon ng MCP mula sa Microsoft

Ang Microsoft at Azure ay nakabuo ng ilang open-source na mga repository para tulungan ang mga developer na magpatupad ng MCP sa iba't ibang senaryo:

#### Organisasyon ng Microsoft

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Isang Playwright MCP server para sa browser automation at pagsubok
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - Isang OneDrive MCP server implementation para sa lokal na pagsubok at kontribusyon ng komunidad
3. [NLWeb](https://github.com/microsoft/NlWeb) - Ang NLWeb ay koleksyon ng mga bukas na protocol at kaugnay na open source na mga tool. Pangunahing layunin nito ang pagtatatag ng pundasyon para sa AI Web

#### Organisasyon ng Azure-Samples

1. [mcp](https://github.com/Azure-Samples/mcp) - Mga link sa samples, mga tool, at mga resource para sa pagbuo at integrasyon ng mga MCP server sa Azure gamit ang iba't ibang wika
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Mga reference MCP server na nagpapakita ng authentication gamit ang kasalukuyang Model Context Protocol specification
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Landing page para sa Remote MCP Server implementations sa Azure Functions na may mga link sa language-specific na mga repo
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Quickstart template para sa pagbuo at deployment ng custom remote MCP servers gamit ang Azure Functions at Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Quickstart template para sa pagbuo at deployment ng custom remote MCP servers gamit ang Azure Functions at .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Quickstart template para sa pagbuo at deployment ng custom remote MCP servers gamit ang Azure Functions at TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API Management bilang AI Gateway para sa Remote MCP servers gamit ang Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - Mga eksperimento ng APIM at AI kabilang ang kakayahan ng MCP, integrasyon sa Azure OpenAI at AI Foundry

Nagbibigay ang mga repository na ito ng iba't ibang implementasyon, mga template, at mga resource para sa pagtatrabaho gamit ang Model Context Protocol sa iba't ibang programming languages at Azure services. Saklaw nila ang iba't ibang gamit mula sa basic na implementasyon ng server hanggang sa authentication, deployment sa cloud, at integrasyon sa enterprise na mga senaryo.

#### MCP Resources Directory

Ang [MCP Resources directory](https://github.com/microsoft/mcp/tree/main/Resources) sa opisyal na Microsoft MCP repository ay nagbibigay ng curated na koleksyon ng mga sample na resources, mga prompt template, at mga tool definition para sa paggamit sa mga Model Context Protocol server. Ang direktoryong ito ay idinisenyo para tulungan ang mga developer na mabilis makapagsimula sa MCP sa pamamagitan ng pag-aalok ng mga reusable na building blocks at mga best-practice na halimbawa para sa:

- **Prompt Templates:** Mga handang gamitin na template ng prompt para sa karaniwang mga gawain at senaryo ng AI, na maaaring i-adapt para sa iyong sariling mga MCP server implementation.
- **Tool Definitions:** Mga halimbawa ng schema ng tool at metadata upang i-standardize ang integrasyon at pagtawag ng tool sa iba't ibang MCP server.
- **Resource Samples:** Mga halimbawa ng resource definition para sa pagkonekta sa mga data source, API, at panlabas na serbisyo sa loob ng MCP framework.
- **Reference Implementations:** Mga praktikal na halimbawa na nagpapakita kung paano estrukturahin at ayusin ang mga resource, prompt, at tool sa mga totoong proyekto ng MCP.

Pinapabilis ng mga resource na ito ang pagbuo, nagtataguyod ng standardisasyon, at tumutulong tiyakin ang mga pinakamahusay na kasanayan kapag bumubuo at nagde-deploy ng mga solusyong nakabase sa MCP.

#### MCP Resources Directory

- [MCP Resources (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)

### Mga Oportunidad sa Pananaliksik

- Mga episyenteng teknik sa prompt optimization sa loob ng mga MCP framework
- Modelo ng seguridad para sa multi-tenant na MCP deployment
- Benchmarking ng performance sa iba't ibang implementasyon ng MCP
- Mga pormal na paraan ng veripikasyon para sa mga MCP server

## Konklusyon

Ang Model Context Protocol (MCP) ay mabilis na humuhubog sa hinaharap ng standardized, secure, at interoperable na integrasyon ng AI sa iba't ibang industriya. Sa pamamagitan ng mga case study at hands-on na proyekto sa araling ito, nakita mo kung paano ginagamit ng mga maagang gumagamit—kabilang ang Microsoft at Azure—ang MCP para lutasin ang mga totoong problema, pabilisin ang adoption ng AI, at siguraduhin ang pagsunod, seguridad, at scalability. Ang modular na pamamaraan ng MCP ay nagbibigay-daan sa mga organisasyon na ikonekta ang malalaking wika na modelo, mga tool, at datos ng enterprise sa isang pinag-isang auditable na framework. Habang patuloy na umuunlad ang MCP, ang pananatiling konektado sa komunidad, pagsiyasat sa mga open-source na resource, at paggamit ng mga best practice ay magiging susi sa pagbuo ng matibay at handa para sa hinaharap na mga AI solution.

## Karagdagang mga Resource

- [MCP Foundry GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Pagsasama ng Azure AI Agents sa MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub Repository (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources Directory (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)
- [Komunidad at Dokumentasyon ng MCP](https://modelcontextprotocol.io/introduction)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP Documentation](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Mga pinakamahuhusay na kasanayan sa seguridad
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
- [Microsoft AI at Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)

## Mga Ehersisyo

1. Suriin ang isa sa mga case study at magmungkahi ng alternatibong paraan ng implementasyon.
2. Pumili ng isa sa mga ideya ng proyekto at gumawa ng detalyadong teknikal na espesipikasyon.
3. Mag-research ng isang industriya na hindi sakop sa mga case study at ilarawan kung paano matutugunan ng MCP ang mga partikular nitong hamon.
4. Tuklasin ang isa sa mga hinaharap na direksyon at gumawa ng konsepto para sa bagong MCP extension upang suportahan ito.

## Ano ang Susunod

Mag-explore pa: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

Magpatuloy sa: [Module 8: Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->