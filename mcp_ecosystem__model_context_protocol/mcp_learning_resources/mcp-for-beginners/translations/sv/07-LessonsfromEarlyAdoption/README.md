# 🌟 Lärdomar från tidiga användare

[![Lessons from MCP Early Adopters](../../../translated_images/sv/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Klicka på bilden ovan för att se videon för denna lektion)_

## 🎯 Vad den här modulen täcker

Den här modulen utforskar hur verkliga organisationer och utvecklare använder Model Context Protocol (MCP) för att lösa faktiska utmaningar och driva innovation. Genom detaljerade fallstudier, praktiska projekt och exempel får du upptäcka hur MCP möjliggör säker, skalbar AI-integration som kopplar samman språkmodeller, verktyg och företagsdata.

### 📚 Se MCP i praktiken

Vill du se dessa principer tillämpade i produktionsfärdiga verktyg? Kolla in våra [**10 Microsoft MCP-servrar som förvandlar utvecklares produktivitet**](microsoft-mcp-servers.md), som visar riktiga Microsoft MCP-servrar du kan använda redan idag.

## Översikt

Den här lektionen utforskar hur tidiga användare har använt Model Context Protocol (MCP) för att lösa verkliga problem och driva innovation inom olika branscher. Genom detaljerade fallstudier och praktiska projekt får du se hur MCP möjliggör standardiserad, säker och skalbar AI-integration – som kopplar samman stora språkmodeller, verktyg och företagsdata i en enhetlig ram. Du får praktisk erfarenhet av att designa och bygga MCP-baserade lösningar, lära dig beprövade implementeringsmönster och upptäcka bästa praxis för att driftsätta MCP i produktionsmiljöer. Lektionen lyfter också fram framväxande trender, framtida riktningar och open-source-resurser för att hjälpa dig hålla dig i framkant inom MCP-teknologi och dess utvecklande ekosystem.

## Lärandemål

- Analysera verkliga MCP-implementationer inom olika branscher  
- Designa och bygg kompletta MCP-baserade applikationer  
- Utforska framväxande trender och framtida riktningar inom MCP-teknologi  
- Tillämpa bästa praxis i faktiska utvecklingsscenarier  

## Verkliga MCP-implementationer

### Fallstudie 1: Automatisering av företags kundsupport

Ett multinationellt företag implementerade en MCP-baserad lösning för att standardisera AI-interaktioner över deras kundsupportsystem. Detta gjorde det möjligt att:

- Skapa ett enhetligt gränssnitt för flera LLM-leverantörer  
- Bibehålla konsekvent prompt-hantering mellan avdelningar  
- Implementera robusta säkerhets- och efterlevnadskontroller  
- Enkelt växla mellan olika AI-modeller baserat på specifika behov  

**Teknisk implementation:**

```python
# Python MCP-serverimplementation för kundsupport
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Konfigurera loggning
logging.basicConfig(level=logging.INFO)

async def main():
    # Skapa serverkonfiguration
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Initiera MCP-server
    server = create_server(config)
    
    # Registrera kunskapsbasresurser
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Registrera promptmallar
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Registrera supportverktyg
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Starta server med HTTP-transport
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Resultat:** 30 % minskning i modellkostnader, 45 % förbättring i svarskonsistens samt förbättrad efterlevnad över globala operationer.

### Fallstudie 2: Diagnostisk assistent inom vården

En vårdgivare utvecklade en MCP-infrastruktur för att integrera flera specialiserade medicinska AI-modeller samtidigt som känslig patientdata skyddades:

- Sömlöst växlande mellan generalist- och specialistmodeller inom medicin  
- Strikta integritetskontroller och revisionsspår  
- Integration med befintliga Elektroniska Journaler (EHR)  
- Konsekvent promptdesign för medicinsk terminologi  

**Teknisk implementation:**

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
  
**Resultat:** Förbättrade diagnostiska förslag för läkare samtidigt som full HIPAA-efterlevnad upprätthölls och betydande minskning av kontextväxling mellan system.

### Fallstudie 3: Riskanalys inom finanssektorn

En finansinstitution implementerade MCP för att standardisera sina riskanalysprocesser över olika avdelningar:

- Skapade ett enhetligt gränssnitt för kreditrisk, bedrägeribekämpning och investeringsriskmodeller  
- Införde strikta åtkomstkontroller och versionshantering av modeller  
- Säkerställde granskningsbarhet av alla AI-rekommendationer  
- Bibehöll konsekvent dataformat över olika system  

**Teknisk implementation:**

```java
// Java MCP-server för finansiell riskbedömning
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Skapa MCP-server med funktioner för finansiell efterlevnad
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
  
**Resultat:** Förbättrad regulatorisk efterlevnad, 40 % snabbare driftsättningscykler för modeller och ökad konsekvens i riskbedömning över avdelningar.

### Fallstudie 4: Microsoft Playwright MCP-server för webbläsarautomatisering

Microsoft utvecklade [Playwright MCP-servern](https://github.com/microsoft/playwright-mcp) för att möjliggöra säker, standardiserad webbläsarautomatisering genom Model Context Protocol. Denna produktionsklara server tillåter AI-agenter och LLM:er att interagera med webbläsare på ett kontrollerat, granskningsbart och utbyggbart sätt – vilket möjliggör användningsfall som automatiserad webbtestning, datautvinning och end-to-end arbetsflöden.

> **🎯 Produktionsfärdigt verktyg**
> 
> Denna fallstudie visar en riktig MCP-server du kan använda idag! Läs mer om Playwright MCP Server och 9 andra produktionsklara Microsoft MCP-servrar i vår [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Nyckelfunktioner:**  
- Exponerar webbläsarautomatiseringsfunktioner (navigering, formulärifyllning, skärmdumpskapande m.m.) som MCP-verktyg  
- Implementerar strikta åtkomstkontroller och sandlådemiljö för att förhindra obehöriga åtgärder  
- Tillhandahåller detaljerade revisionsloggar för alla webbläsarinteraktioner  
- Stöder integration med Azure OpenAI och andra LLM-leverantörer för agentbaserad automatisering  
- Driver GitHub Copilots kodningsagent med webbläsarfunktioner  

**Teknisk implementation:**

```typescript
// TypeScript: Registrerar Playwright-webbläsarautomatiseringsverktyg i en MCP-server
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Registrera ett verktyg för att navigera till en URL och ta en skärmbild
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

// Starta MCP-servern
server.listen(8080);
```
  
**Resultat:**  
- Möjliggjorde säker, programmerbar webbläsarautomatisering för AI-agenter och LLM:er  
- Minskade manuellt testarbete och förbättrade testtäckningen för webbapplikationer  
- Tillhandahöll en återanvändbar, utbyggbar ram för webbläsarbaserad verktygsintegration i företagsmiljöer  
- Driver GitHub Copilots webbläsarfunktioner  

**Referenser:**  
- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)  
- [Microsoft AI and Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)

### Fallstudie 5: Azure MCP – Företagsklassad Model Context Protocol som tjänst

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) är Microsofts hanterade, företagsklassade implementation av Model Context Protocol, utformad för att erbjuda skalbara, säkra och efterlevnadssäkra MCP-serverfunktioner som molntjänst. Azure MCP gör det möjligt för organisationer att snabbt driftsätta, hantera och integrera MCP-servrar med Azure AI, data- och säkerhetstjänster, vilket minskar driftskostnader och påskyndar AI-antagandet.

> **🎯 Produktionsfärdigt verktyg**
> 
> Detta är en riktig MCP-server du kan använda redan idag! Läs mer om Microsoft Foundry MCP Server i vår [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md).

- Fullt hanterad MCP-serverhosting med inbyggd skalning, övervakning och säkerhet  
- Naturlig integration med Azure OpenAI, Azure AI Search och andra Azure-tjänster  
- Företagsautentisering och auktorisering via Microsoft Entra ID  
- Stöd för anpassade verktyg, prompt-mallar och resurskopplingar  
- Efterlevnad av företags säkerhets- och regulatoriska krav  

**Teknisk implementation:**

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
  
**Resultat:**  
- Minskat time-to-value för företags AI-projekt genom att erbjuda en redo att använda och efterlevnadssäker MCP-serverplattform  
- Förenklad integration av LLM:er, verktyg och företagsdatakällor  
- Förbättrad säkerhet, observabilitet och driftseffektivitet för MCP-arbetsbelastningar  
- Förbättrad kodkvalitet med Azure SDK bästa praxis och aktuella autentiseringsmönster  

**Referenser:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)  
- [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)

## Fallstudie 6: NLWeb  
MCP (Model Context Protocol) är ett framväxande protokoll för chatbots och AI-assistenter att interagera med verktyg. Varje NLWeb-instans är också en MCP-server som stöder en kärnmetod, ask, som används för att ställa en fråga till en webbplats i naturligt språk. Det returnerade svaret använder schema.org, ett mycket använt vokabulär för att beskriva webdata. Lösryckt kan man säga att MCP är för NLWeb vad Http är för HTML. NLWeb kombinerar protokoll, Schema.org-format och exempel på kod för att hjälpa webbplatser att snabbt skapa dessa endpoints, vilket gynnar både människor genom konversationsgränssnitt och maskiner genom naturlig agent-till-agent interaktion.

Det finns två distinkta komponenter i NLWeb.  
- Ett protokoll, mycket enkelt till en början, för att interagera med en webbplats i naturligt språk samt ett format som använder json och schema.org för det returnerade svaret. Se dokumentationen om REST API för mer detaljer.  
- En enkel implementation av (1) som utnyttjar befintlig märkning, för webbplatser som kan abstraheras som listor med objekt (produkter, recept, sevärdheter, recensioner, etc.). Tillsammans med ett set av användargränssnittskomponenter kan webbplatser enkelt erbjuda konversationsgränssnitt till sitt innehåll. Se dokumentationen om Life of a chat query för mer detaljer om hur detta fungerar.

**Referenser:**  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Fallstudie 7: Microsoft Foundry MCP Server – Enterprise AI-agentintegration

Microsoft Foundry MCP-servrar demonstrerar hur MCP kan användas för att orkestrera och hantera AI-agenter och arbetsflöden i företagsmiljöer. Genom att integrera MCP med Microsoft Foundry kan organisationer standardisera agentinteraktioner, utnyttja Foundrys arbetsflödeshantering och säkerställa säkra, skalbara driftsättningar.

> **🎯 Produktionsfärdigt verktyg**
> 
> Detta är en riktig MCP-server du kan använda idag! Läs mer om Microsoft Foundry MCP Server i vår [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Nyckelfunktioner:**  
- Omfattande åtkomst till Azures AI-ekosystem, inklusive modellkataloger och driftsättningshantering  
- Kunskapsindexering med Azure AI Search för RAG-applikationer  
- Utvärderingsverktyg för AI-modellprestanda och kvalitetskontroll  
- Integration med Microsoft Foundry Catalog och Labs för banbrytande forskningsmodeller  
- Agenthantering och utvärderingsmöjligheter för produktionsscenarier  

**Resultat:**  
- Snabb prototypframtagning och robust övervakning av AI-agentarbetsflöden  
- Sömlös integration med Azure AI-tjänster för avancerade scenarier  
- Enhetligt gränssnitt för att bygga, driftsätta och övervaka agentpipeliner  
- Förbättrad säkerhet, efterlevnad och driftseffektivitet för företag  
- Påskyndat AI-antagande samtidigt som kontroll behålls över komplexa agentstyrda processer  

**Referenser:**  
- [Microsoft Foundry MCP Server GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Fallstudie 8: Foundry MCP Playground – Experimentering och prototypframtagning

Foundry MCP Playground erbjuder en färdig att använda miljö för att experimentera med MCP-servrar och Microsoft Foundry-integrationer. Utvecklare kan snabbt prototypa, testa och utvärdera AI-modeller och agentarbetsflöden med resurser från Microsoft Foundry Catalog och Labs. Playground förenklar uppsättningen, tillhandahåller exempelprojekt och stöder samarbetsutveckling, vilket gör det enkelt att utforska bästa praxis och nya scenarier med minimal arbetsinsats. Det är särskilt användbart för team som vill validera idéer, dela experiment och snabba på lärande utan behov av komplex infrastruktur. Genom att sänka tröskeln bidrar playground till innovation och gemenskapsbidrag i MCP- och Microsoft Foundry-ekosystemet.

**Referenser:**

- [Foundry MCP Playground GitHub Repository](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Fallstudie 9: Microsoft Learn Docs MCP Server – AI-driven dokumentationsåtkomst

Microsoft Learn Docs MCP Server är en molnbaserad tjänst som ger AI-assistenter realtidsåtkomst till officiell Microsoft-dokumentation via Model Context Protocol. Denna produktionsklara server är kopplad till det omfattande Microsoft Learn-ekosystemet och möjliggör semantisk sökning över alla officiella Microsoft-källor.

> **🎯 Produktionsfärdigt verktyg**
> 
> Detta är en riktig MCP-server du kan använda idag! Läs mer om Microsoft Learn Docs MCP Server i vår [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Nyckelfunktioner:**  
- Realtidsåtkomst till officiell Microsoft-dokumentation, Azure-docs och Microsoft 365-dokumentation  
- Avancerade semantiska sökfunktioner som förstår kontext och avsikt  
- Alltid uppdaterad information när Microsoft Learn-innehåll publiceras  
- Omfattande täckning över Microsoft Learn, Azure-dokumentation och Microsoft 365-källor  
- Returnerar upp till 10 högkvalitativa innehållsbitar med artikeltitlar och URL:er  

**Varför det är kritiskt:**  
- Löser problemet med "föråldrad AI-kunskap" för Microsoft-teknologier  
- Säkerställer att AI-assistenter har tillgång till de senaste funktionerna i .NET, C#, Azure och Microsoft 365  
- Tillhandahåller auktoritativ förstahandsinformation för korrekt kodgenerering  
- Nödvändigt för utvecklare som arbetar med snabbt utvecklande Microsoft-teknologier  

**Resultat:**  
- Markant förbättrad noggrannhet i AI-genererad kod för Microsoft-teknologier  
- Minskat tidsspill för att söka aktuell dokumentation och bästa praxis  
- Förbättrad utvecklarproduktivitet med kontextmedveten dokumentationshämtning  
- Sömlös integration med utvecklingsarbetsflöden utan att lämna IDE:n  

**Referenser:**  
- [Microsoft Learn Docs MCP Server GitHub Repository](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn Documentation](https://learn.microsoft.com/)

## Praktiska projekt

### Projekt 1: Bygg en MCP-server med flera leverantörer

**Mål:** Skapa en MCP-server som kan dirigera förfrågningar till flera AI-modellleverantörer baserat på specifika kriterier.

**Krav:**

- Stöd för minst tre olika modellleverantörer (t.ex. OpenAI, Anthropic, lokala modeller)  
- Implementera en dirigeringsmekanism baserad på metadata i förfrågan  
- Skapa ett konfigurationssystem för hantering av leverantörsuppgifter  
- Lägg till caching för att optimera prestanda och kostnader  
- Bygg en enkel dashboard för att övervaka användning  

**Implementeringssteg:**

1. Sätt upp grundläggande MCP-serverinfrastruktur  
2. Implementera adapter för varje AI-modelltjänst  
3. Skapa dirigeringslogik baserat på förfrågeattribut  
4. Lägg till cachningsmekanismer för frekventa förfrågningar  
5. Utveckla övervakningsdashboard  
6. Testa med olika förfrågemönster  

**Teknologier:** Välj mellan Python (.NET/Java/Python beroende på preferens), Redis för caching och ett enkelt webbframework för dashboarden.

### Projekt 2: Företagsövergripande system för prompt-hantering

**Mål:** Utveckla ett MCP-baserat system för att hantera, versionshantera och driftsätta prompt-mallar i en organisation.

**Krav:**
- Skapa ett centraliserat repository för promptmallar  
- Implementera versionshantering och godkännandeflöden  
- Bygg testfunktioner för mallar med exempelinput  
- Utveckla rollbaserade åtkomstkontroller  
- Skapa ett API för hämtning och distribution av mallar  

**Implementeringssteg:**  

1. Designa databasschema för malllagring  
2. Skapa kärn-API för CRUD-operationer på mallar  
3. Implementera versionshanteringssystemet  
4. Bygg godkännandeflödet  
5. Utveckla testningsramverket  
6. Skapa ett enkelt webbgränssnitt för hantering  
7. Integrera med en MCP-server  

**Teknologier:** Valfritt backendramverk, SQL- eller NoSQL-databas, och ett frontend-ramverk för hanteringsgränssnittet.  

### Projekt 3: MCP-baserad plattform för innehållsgenerering  

**Mål:** Bygg en plattform för innehållsgenerering som utnyttjar MCP för att leverera konsekventa resultat över olika innehållstyper.  

**Krav:**  

- Stöd för flera innehållsformat (blogginlägg, sociala medier, marknadsföringstexter)  
- Implementera mallbaserad generering med anpassningsmöjligheter  
- Skapa ett system för innehållsgranskning och återkoppling  
- Spåra innehållsprestationsmätningar  
- Stöd för versionshantering och iteration av innehåll  

**Implementeringssteg:**  

1. Sätt upp MCP-klientinfrastrukturen  
2. Skapa mallar för olika innehållstyper  
3. Bygg innehållsgenereringspipeline  
4. Implementera granskningssystemet  
5. Utveckla system för mätvärdesspårning  
6. Skapa ett användargränssnitt för mallhantering och innehållsgenerering  

**Teknologier:** Valfritt programmeringsspråk, webb-ramverk och databassystem.  

## Framtida riktningar för MCP-teknologi  

### Framväxande trender  

1. **Multi-modal MCP**  
   - Expansion av MCP för att standardisera interaktioner med bild-, ljud- och videomodeller  
   - Utveckling av tvärmodal resoneringsförmåga  
   - Standardiserade promptformat för olika modaliteter  

2. **Federerad MCP-infrastruktur**  
   - Distribuerade MCP-nätverk som kan dela resurser över organisationer  
   - Standardiserade protokoll för säker delning av modeller  
   - Sekretessbevarande beräkningstekniker  

3. **MCP-marknadsplatser**  
   - Ekosystem för att dela och tjäna pengar på MCP-mallar och plugins  
   - Kvalitetssäkring och certifieringsprocesser  
   - Integration med modellmarknadsplatser  

4. **MCP för edge computing**  
   - Anpassning av MCP-standarder för resursbegränsade edge-enheter  
   - Optimerade protokoll för miljöer med låg bandbredd  
   - Specialiserade MCP-implementationer för IoT-ekosystem  

5. **Regulatoriska ramverk**  
   - Utveckling av MCP-tillägg för regulatorisk efterlevnad  
   - Standardiserade revisionsspår och förklaringsgränssnitt  
   - Integration med framväxande AI-styrningsramverk  

### MCP-lösningar från Microsoft  

Microsoft och Azure har utvecklat flera open source-repositorier för att hjälpa utvecklare att implementera MCP i olika scenarier:  

#### Microsoft-organisationen  

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) – En Playwright MCP-server för webbläsarautomatisering och testning  
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) – En OneDrive MCP-server-implementation för lokal testning och community-bidrag  
3. [NLWeb](https://github.com/microsoft/NlWeb) – NLWeb är en samling öppna protokoll och relaterade open source-verktyg. Huvudfokus är att etablera ett grundläggande lager för AI-Webben  

#### Azure-Samples-organisationen  

1. [mcp](https://github.com/Azure-Samples/mcp) – Länkar till exempel, verktyg och resurser för att bygga och integrera MCP-servrar på Azure med flera språk  
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) – Referensservrar som demonstrerar autentisering med aktuell Model Context Protocol-specifikation  
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) – Landningssida för Remote MCP-servers i Azure Functions med länkar till språksspecifika repos  
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) – Snabbstartsmall för att bygga och driftsätta anpassade remote MCP-servrar med Azure Functions och Python  
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) – Snabbstartsmall för att bygga och driftsätta anpassade remote MCP-servrar med Azure Functions och .NET/C#  
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) – Snabbstartsmall för att bygga och driftsätta anpassade remote MCP-servrar med Azure Functions och TypeScript  
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) – Azure API Management som AI-gateway till Remote MCP-servrar med Python  
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) – APIM ❤️ AI-experiment med MCP-funktioner, integrerat med Azure OpenAI och AI Foundry  

Dessa repositorier erbjuder olika implementationer, mallar och resurser för arbete med Model Context Protocol över olika programmeringsspråk och Azure-tjänster. De täcker användningsfall från grundläggande serverimplementationer till autentisering, molndrift och företagsintegration.  

#### MCP Resources Directory  

[MCP Resources directory](https://github.com/microsoft/mcp/tree/main/Resources) i den officiella Microsoft MCP-repot innehåller en noggrant utvald samling av exempelresurser, promptmallar och verktygsdefinitioner för användning med Model Context Protocol-servrar. Denna katalog är designad för att hjälpa utvecklare att snabbt komma igång med MCP genom att erbjuda återanvändbara byggstenar och bästa praxis-exempel för:  

- **Promptmallar:** Färdiga promptmallar för vanliga AI-uppgifter och scenarier, som kan anpassas för dina egna MCP-serverimplementationer.  
- **Verktygsdefinitioner:** Exempel på verktygsscheman och metadata för att standardisera verktygsintegration och anrop över olika MCP-servrar.  
- **Resursprover:** Exempel på resursdefinitioner för anslutning till datakällor, API:er och externa tjänster inom MCP-ramverket.  
- **Referensimplementationer:** Praktiska exempel som visar hur man strukturerar och organiserar resurser, prompts och verktyg i verkliga MCP-projekt.  

Dessa resurser påskyndar utveckling, främjar standardisering och hjälper till att säkerställa bästa praxis vid byggande och driftsättning av MCP-baserade lösningar.  

#### MCP Resources Directory  

- [MCP Resources (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)  

### Forskningsmöjligheter  

- Effektiva tekniker för promptoptimering inom MCP-ramverk  
- Säkerhetsmodeller för flerkunds-MCP-utplaceringar  
- Prestandamätningar över olika MCP-implementationer  
- Formella verifieringsmetoder för MCP-servrar  

## Slutsats  

Model Context Protocol (MCP) formar snabbt framtiden för standardiserad, säker och interoperabel AI-integration över branscher. Genom fallstudier och praktiska projekt i denna lektion har du sett hur tidiga användare – inklusive Microsoft och Azure – utnyttjar MCP för att lösa verkliga utmaningar, accelerera AI-antagande och säkerställa efterlevnad, säkerhet och skalbarhet. MCP:s modulära tillvägagångssätt gör det möjligt för organisationer att koppla ihop stora språkmodeller, verktyg och företagsdata i en enhetlig, revisionsbar ram. Allteftersom MCP fortsätter att utvecklas, kommer engagemang i communityt, utforskande av open source-resurser och tillämpning av bästa praxis vara nyckeln till att bygga robusta, framtidssäkra AI-lösningar.  

## Ytterligare resurser  

- [MCP Foundry GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)  
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  
- [MCP GitHub Repository (Microsoft)](https://github.com/microsoft/mcp)  
- [MCP Resources Directory (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)  
- [MCP Community & Documentation](https://modelcontextprotocol.io/introduction)  
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Azure MCP Documentation](https://aka.ms/azmcp)  
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Säkerhetsbästa praxis  
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

## Övningar  

1. Analysera en av fallstudierna och föreslå ett alternativt implementationssätt.  
2. Välj ett av projektidéerna och skapa en detaljerad teknisk specifikation.  
3. Undersök en bransch som inte täcks av fallstudierna och beskriv hur MCP skulle kunna adressera dess specifika utmaningar.  
4. Utforska en av framtida riktningarna och skapa ett koncept för en ny MCP-förlängning som stödjer den.  

## Vad händer härnäst  

Utforska mer: [Microsoft MCP Servers](./microsoft-mcp-servers.md)  

Fortsätt till: [Modul 8: Bästa praxis](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->