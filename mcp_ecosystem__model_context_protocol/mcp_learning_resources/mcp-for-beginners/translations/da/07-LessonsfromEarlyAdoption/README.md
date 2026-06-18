# 🌟 Lærdomme fra de Første Brugere

[![Lessons from MCP Early Adopters](../../../translated_images/da/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Klik på billedet ovenfor for at se video af denne lektion)_

## 🎯 Hvad Denne Modul Dækker

Denne modul udforsker, hvordan rigtige organisationer og udviklere udnytter Model Context Protocol (MCP) til at løse faktiske udfordringer og drive innovation. Gennem detaljerede casestudier, praktiske projekter og konkrete eksempler vil du opdage, hvordan MCP muliggør sikker, skalerbar AI-integration, der forbinder sprogmodeller, værktøjer og virksomheders data.

### 📚 Se MCP i Aktion

Vil du se disse principper anvendt i produktionsklare værktøjer? Se vores [**10 Microsoft MCP Servere, der Transformerer Udviklerproduktivitet**](microsoft-mcp-servers.md), som fremviser ægte Microsoft MCP servere, du kan bruge i dag.

## Oversigt

Denne lektion udforsker, hvordan tidlige brugere har udnyttet Model Context Protocol (MCP) til at løse virkelige udfordringer og drive innovation på tværs af brancher. Gennem detaljerede casestudier og praktiske projekter vil du se, hvordan MCP muliggør standardiseret, sikker og skalerbar AI-integration—der forbinder store sprogmodeller, værktøjer og virksomheders data i en samlet ramme. Du vil opnå praktisk erfaring med at designe og bygge MCP-baserede løsninger, lære fra gennemprøvede implementeringsmønstre og opdage bedste praksis for udrulning af MCP i produktionsmiljøer. Lektionen fremhæver også nye tendenser, fremtidige retninger og open source-ressourcer, som hjælper dig med at holde dig i front inden for MCP-teknologi og dets udviklende økosystem.

## Læringsmål

- Analysere virkelige MCP-implementeringer på tværs af forskellige brancher
- Designe og bygge komplette MCP-baserede applikationer
- Udforske nye tendenser og fremtidige retninger inden for MCP-teknologi
- Anvende bedste praksis i reelle udviklingsscenarier

## Virkelige MCP-Implementeringer

### Casestudie 1: Automatisering af Enterprise Kundesupport

En multinational virksomhed implementerede en MCP-baseret løsning for at standardisere AI-interaktioner på tværs af deres kundesupportsystemer. Dette gjorde det muligt for dem at:

- Oprette et samlet interface til flere LLM-udbydere
- Opretholde konsekvent promptstyring på tværs af afdelinger
- Implementere robuste sikkerheds- og compliancekontroller
- Nemt skifte mellem forskellige AI-modeller baseret på specifikke behov

**Teknisk Implementering:**

```python
# Python MCP serverimplementering for kundesupport
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Konfigurer logning
logging.basicConfig(level=logging.INFO)

async def main():
    # Opret serverkonfiguration
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Initialiser MCP-server
    server = create_server(config)
    
    # Registrer vidensbase ressourcer
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Registrer promptskabeloner
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Registrer supportværktøjer
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Start server med HTTP-transport
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```

**Resultater:** 30 % reduktion i modelomkostninger, 45 % forbedring i svar-konsistens og forbedret compliance på tværs af globale operationer.

### Casestudie 2: Sundhedsdiagnostisk Assistent

En sundhedsudbyder udviklede en MCP-infrastruktur til at integrere flere specialiserede medicinske AI-modeller, samtidig med at følsomme patientdata forblev beskyttet:

- Problemfri skift mellem generalistiske og specialiserede medicinske modeller
- Strenge privatlivsbeskyttelses- og revisionsspor
- Integration med eksisterende Electronic Health Record (EHR)-systemer
- Konsistent prompt-udvikling for medicinsk terminologi

**Teknisk Implementering:**

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

**Resultater:** Forbedrede diagnostiske forslag til læger samtidig med fuld HIPAA-compliance og betydelig reduktion i kontekstskift mellem systemer.

### Casestudie 3: Risikostyring i Finansielle Tjenester

En finansiel institution implementerede MCP for at standardisere deres risikovurderingsprocesser i forskellige afdelinger:

- Skabte et samlet interface til kreditrisiko-, bedrageriopdagelses- og investeringsrisikomodeller
- Implementerede strenge adgangskontroller og modelversionering
- Sikrede revisionsmulighed for alle AI-anbefalinger
- Opretholdt konsekvent dataformatering på tværs af forskellige systemer

**Teknisk Implementering:**

```java
// Java MCP-server til økonomisk risikovurdering
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Opret MCP-server med funktioner til økonomisk overholdelse
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

**Resultater:** Forbedret regulatorisk compliance, 40 % hurtigere modeludrulningscyklusser og bedre risikovurderings-konsistens på tværs af afdelinger.

### Casestudie 4: Microsoft Playwright MCP Server til Browserautomatisering

Microsoft udviklede [Playwright MCP serveren](https://github.com/microsoft/playwright-mcp) for at muliggøre sikker, standardiseret browserautomatisering gennem Model Context Protocol. Denne produktionsklare server gør det muligt for AI-agenter og LLM'er at interagere med webbrowsere på en kontrolleret, reviderbar og udvidelig måde—hvilket muliggør brugstilfælde som automatiseret webtest, dataudtræk og end-to-end arbejdsgange.

> **🎯 Produktionsklart Værktøj**
> 
> Dette casestudie fremviser en ægte MCP-server, du kan bruge i dag! Læs mere om Playwright MCP Server og 9 andre produktionsklare Microsoft MCP-servere i vores [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Nøglefunktioner:**
- Eksponerer browserautomatiseringsfunktioner (navigation, formularudfyldning, skærmbilledeoptagelse osv.) som MCP-værktøjer
- Implementerer strenge adgangskontroller og sandkassemiljø for at forhindre uautoriserede handlinger
- Leverer detaljerede revisionslogger for alle browserinteraktioner
- Understøtter integration med Azure OpenAI og andre LLM-udbydere til agentdrevet automatisering
- Driver GitHub Copilots Coding Agent med web-browsing funktionalitet

**Teknisk Implementering:**

```typescript
// TypeScript: Registrerer Playwright browserautomatiseringsværktøjer i en MCP-server
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Registrer et værktøj til at navigere til en URL og tage et skærmbillede
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

// Start MCP-serveren
server.listen(8080);
```

**Resultater:**

- Muliggjorde sikker, programmerbar browserautomatisering for AI-agenter og LLM'er
- Reducerede manuel testindsats og forbedrede testdækning for webapplikationer
- Leverede en genbrugelig og udvidelig ramme for browserbaseret værktøjsintegration i virksomhedsmiljøer
- Driver GitHub Copilots web-browsing kapaciteter

**Referencer:**

- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)
- [Microsoft AI og Automatiseringsløsninger](https://azure.microsoft.com/en-us/products/ai-services/)

### Casestudie 5: Azure MCP – Enterprise-Grade Model Context Protocol som Service

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) er Microsofts administrerede, enterprise-grade implementering af Model Context Protocol, designet til at levere skalerbare, sikre og compliant MCP-serverfunktioner som en cloud-service. Azure MCP muliggør, at organisationer hurtigt kan udrulle, administrere og integrere MCP-servere med Azure AI, data- og sikkerhedstjenester, hvilket reducerer driftsomkostninger og fremskynder AI-adoption.

> **🎯 Produktionsklart Værktøj**
> 
> Dette er en ægte MCP-server, du kan bruge i dag! Læs mere om Microsoft Foundry MCP Server i vores [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md).

- Fuldt administreret MCP-serverhosting med indbygget skalering, overvågning og sikkerhed
- Naturlig integration med Azure OpenAI, Azure AI Search og andre Azure-tjenester
- Enterprise-autentifikation og autorisation via Microsoft Entra ID
- Understøttelse af brugerdefinerede værktøjer, promptskabeloner og ressourceforbindelser
- Overholder virksomhedens sikkerheds- og regulatoriske krav

**Teknisk Implementering:**

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

**Resultater:**  
- Reduceret time-to-value for enterprise AI-projekter ved at tilbyde en klar-til-brug, compliant MCP-serverplatform  
- Forenklet integration af LLM'er, værktøjer og virksomhedsdatakilder  
- Forbedret sikkerhed, observabilitet og driftsmæssig effektivitet for MCP-arbejdsbelastninger  
- Forbedret kodekvalitet med Azure SDK bedste praksis og aktuelle autentifikationsmønstre  

**Referencer:**  
- [Azure MCP Dokumentation](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)  
- [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)  

## Casestudie 6: NLWeb  
MCP (Model Context Protocol) er en opkommende protokol for chatbots og AI-assistenter til at interagere med værktøjer. Hver NLWeb-instans er også en MCP-server, der understøtter en kernefunktion, ask, som bruges til at stille et website et spørgsmål i naturligt sprog. Det returnerede svar benytter schema.org, et bredt anvendt vokabularium til at beskrive webdata. Løst sagt er MCP for NLWeb, hvad Http er for HTML. NLWeb kombinerer protokoller, Schema.org-formater og eksempel-kode for at hjælpe sites med hurtigt at skabe disse endpoints, hvilket gavner både mennesker via konversationsgrænseflader og maskiner via naturlig agent-til-agent interaktion.

Der er to tydelige komponenter i NLWeb:  
- En protokol, meget simpel til at begynde med, til at interagere med et site i naturligt sprog og et format, der benytter json og schema.org til det returnerede svar. Se dokumentationen om REST API for flere detaljer.  
- En enkel implementering af (1), der benytter eksisterende markup til sites, der kan abstrakteres som lister over elementer (produkter, opskrifter, attraktioner, anmeldelser osv.). Sammen med et sæt brugergrænsefladewidgets kan sites nemt tilbyde konversationsgrænseflader til deres indhold. Se dokumentationen om Life of a chat query for flere detaljer om, hvordan dette virker.

**Referencer:**  
- [Azure MCP Dokumentation](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)  

### Casestudie 7: Microsoft Foundry MCP Server – Enterprise AI Agent Integration

Microsoft Foundry MCP-servere demonstrerer, hvordan MCP kan bruges til at orkestrere og styre AI-agenter og arbejdsgange i virksomhedsmiljøer. Ved at integrere MCP med Microsoft Foundry kan organisationer standardisere agentinteraktioner, udnytte Foundrys workflow management og sikre sikre, skalerbare udrulninger.

> **🎯 Produktionsklart Værktøj**
> 
> Dette er en ægte MCP-server, du kan bruge i dag! Læs mere om Microsoft Foundry MCP Server i vores [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Nøglefunktioner:**
- Omfattende adgang til Azures AI-økosystem, inklusive modelkataloger og udrulningsstyring
- Videnindeksering med Azure AI Search til RAG-applikationer
- Vurderingsværktøjer for AI-modellers ydeevne og kvalitetskontrol
- Integration med Microsoft Foundry Catalog og Labs for banebrydende forskningsmodeller
- Agentstyring og evalueringsmuligheder for produktionsscenarier

**Resultater:**
- Hurtig prototyping og robust overvågning af AI-agentarbejdsgange
- Problemfri integration med Azure AI-tjenester til avancerede scenarier
- Enhedsgrænseflade til at bygge, udrulle og overvåge agent-pipelines
- Forbedret sikkerhed, compliance og driftsmæssig effektivitet for virksomheder
- Accelereret AI-adoption, samtidig med kontrol over komplekse agentdrevne processer

**Referencer:**
- [Microsoft Foundry MCP Server GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)
- [Integration af Azure AI Agents med MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Casestudie 8: Foundry MCP Playground – Eksperimentering og Prototyping

Foundry MCP Playground tilbyder et klar-til-brug miljø til eksperimentering med MCP-servere og Microsoft Foundry-integrationer. Udviklere kan hurtigt prototypere, teste og evaluere AI-modeller og agentarbejdsgange ved hjælp af ressourcer fra Microsoft Foundry Catalog og Labs. Playground forenkler opsætning, leverer eksempelprojekter og understøtter samarbejdsudvikling, hvilket gør det nemt at udforske bedste praksis og nye scenarier med minimal overhead. Det er især nyttigt for teams, der ønsker at validere ideer, dele eksperimenter og accelerere læring uden behov for kompleks infrastruktur. Ved at sænke adgangsbarrieren hjælper playground med at fremme innovation og community-bidrag i MCP og Microsoft Foundry-økosystemet.

**Referencer:**

- [Foundry MCP Playground GitHub Repository](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Casestudie 9: Microsoft Learn Docs MCP Server – AI-Drevet Dokumentationsadgang

Microsoft Learn Docs MCP Server er en cloud-hostet tjeneste, der giver AI-assistenter realtidsadgang til officiel Microsoft-dokumentation via Model Context Protocol. Denne produktionsklare server forbinder til det omfattende Microsoft Learn-økosystem og muliggør semantisk søgning på tværs af alle officielle Microsoft-kilder.

> **🎯 Produktionsklart Værktøj**
> 
> Dette er en ægte MCP-server, du kan bruge i dag! Læs mere om Microsoft Learn Docs MCP Server i vores [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Nøglefunktioner:**
- Realtidsadgang til officiel Microsoft-dokumentation, Azure-docs og Microsoft 365-dokumentation
- Avancerede semantiske søgefunktioner, der forstår kontekst og hensigt
- Altid opdateret information efterhånden som Microsoft Learn-indhold offentliggøres
- Omfattende dækning på tværs af Microsoft Learn, Azure-dokumentation og Microsoft 365-kilder
- Returnerer op til 10 indholdsstykker af høj kvalitet med artikeltitler og URL'er

**Hvorfor det er Kritisk:**
- Løser problemet med "forældet AI-viden" for Microsoft-teknologier
- Sikrer, at AI-assistenter har adgang til de nyeste .NET-, C#-, Azure- og Microsoft 365-funktioner
- Leverer autoritativ, førstepartsinformation til præcis kodegenerering
- Essentielt for udviklere, der arbejder med hurtigt udviklende Microsoft-teknologier

**Resultater:**
- Markant forbedret nøjagtighed af AI-genereret kode til Microsoft-teknologier
- Mindsket tid brugt på at søge efter opdateret dokumentation og bedste praksis
- Forbedret udviklerproduktivitet med kontekstbevidst dokumentationshentning
- Problemfri integration med udviklingsarbejdsgange uden at forlade IDE'en

**Referencer:**
- [Microsoft Learn Docs MCP Server GitHub Repository](https://github.com/MicrosoftDocs/mcp)
- [Microsoft Learn Dokumentation](https://learn.microsoft.com/)

## Praktiske Projekter

### Projekt 1: Byg en Multi-Udbyder MCP Server

**Mål:** Opret en MCP-server, der kan rute forespørgsler til flere AI-modeludbydere baseret på specifikke kriterier.

**Krav:**

- Understøt mindst tre forskellige modeludbydere (f.eks. OpenAI, Anthropic, lokale modeller)
- Implementer en routingsmekanisme baseret på metadata i forespørgslen
- Opret et konfigurationssystem til håndtering af udbyderoplysninger
- Tilføj caching for at optimere ydeevne og omkostninger
- Byg et simpelt dashboard til overvågning af forbrug

**Implementeringstrin:**

1. Opsæt den grundlæggende MCP-serverinfrastruktur
2. Implementer adaptere for hver AI-modelservice
3. Opret routinglogik baseret på forespørgselsattributter
4. Tilføj cachingmekanismer for hyppige forespørgsler
5. Udvikl overvågningsdashboardet
6. Test med forskellige anmodningsmønstre

**Teknologier:** Vælg mellem Python (.NET/Java/Python baseret på din præference), Redis til caching og et enkelt webframework til dashboardet.

### Projekt 2: Enterprise Prompt Management System

**Mål:** Udvikl et MCP-baseret system til styring, versionering og udrulning af promptskabeloner på tværs af en organisation.

**Krav:**
- Opret et centraliseret repository for promptskabeloner  
- Implementer versionsstyring og godkendelsesworkflow  
- Byg testmuligheder for skabeloner med eksempelinput  
- Udvikl rollebaserede adgangskontroller  
- Opret et API til hentning og implementering af skabeloner  

**Implementeringstrin:**  

1. Design databasschemaet til skabelonlagring  
2. Opret kerne-API’en til CRUD-operationer på skabeloner  
3. Implementer versionsstyringssystemet  
4. Byg godkendelsesworkflowet  
5. Udvikl testframeworket  
6. Opret en simpel webgrænseflade til administration  
7. Integrer med en MCP-server  

**Teknologier:** Dit valg af backend-framework, SQL- eller NoSQL-database samt et frontend-framework til administrationsgrænsefladen.  

### Projekt 3: MCP-baseret indholdsgenereringsplatform  

**Formål:** Byg en indholdsgenereringsplatform, der udnytter MCP til at sikre konsistente resultater på tværs af forskellige indholdstyper.  

**Krav:**  

- Understøttelse af flere indholdsformater (blogindlæg, sociale medier, marketingtekst)  
- Implementering af skabelonbaseret generering med tilpasningsmuligheder  
- Opret en indholdsreview- og feedbacksystem  
- Spor indholdspræstationsmetrikker  
- Understøttelse af versionsstyring og iteration af indhold  

**Implementeringstrin:**  

1. Sæt MCP-klientinfrastrukturen op  
2. Opret skabeloner til forskellige indholdstyper  
3. Byg indholdsgenereringspipelinjen  
4. Implementer reviewsystemet  
5. Udvikl systemet til metriksporing  
6. Opret en brugerflade til skabelonadministration og indholdsgenerering  

**Teknologier:** Dit foretrukne programmeringssprog, webframework og databasesystem.  

## Fremtidige retninger for MCP-teknologi  

### Fremvoksende tendenser  

1. **Multimodal MCP**  
   - Udvidelse af MCP til at standardisere interaktioner med billed-, lyd- og videomodeller  
   - Udvikling af tværmodal ræsonneringsevne  
   - Standardiserede promptformater for forskellige modaliteter  

2. **Federeret MCP-infrastruktur**  
   - Distribuerede MCP-netværk, der kan dele ressourcer på tværs af organisationer  
   - Standardiserede protokoller til sikker deling af modeller  
   - Privatlivsbevarende beregningsteknikker  

3. **MCP-markedspladser**  
   - Økosystemer til deling og monetarisering af MCP-skabeloner og plugins  
   - Kvalitetssikring og certificeringsprocesser  
   - Integration med modelmarkedspladser  

4. **MCP til edge computing**  
   - Tilpasning af MCP-standarder til ressourcerestriktioner på edge-enheder  
   - Optimerede protokoller til lav-båndbredde-miljøer  
   - Specialiserede MCP-implementeringer til IoT-økosystemer  

5. **Regulatoriske rammer**  
   - Udvikling af MCP-udvidelser til regulatorisk overholdelse  
   - Standardiserede revisionsstier og forklaringsgrænseflader  
   - Integration med nye AI-styringsrammer  

### MCP-løsninger fra Microsoft  

Microsoft og Azure har udviklet flere open source repositories til at hjælpe udviklere med at implementere MCP i forskellige scenarier:  

#### Microsoft-organisationen  

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - En Playwright MCP-server til browserautomatisering og test  
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - En OneDrive MCP-serverimplementering til lokal test og fællesskabsbidrag  
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb er en samling af åbne protokoller og tilhørende open source-værktøjer. Fokus er på at etablere et fundamentalt lag til AI Web  

#### Azure-Samples-organisationen  

1. [mcp](https://github.com/Azure-Samples/mcp) - Links til eksempler, værktøjer og ressourcer til opbygning og integration af MCP-servere på Azure med flere sprog  
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Reference MCP-servere, der demonstrerer autentificering med den nuværende Model Context Protocol-specifikation  
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Landing page for Remote MCP Server-implementeringer i Azure Functions med links til sprog-specifikke repositories  
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Quickstart-skabelon til opbygning og implementering af brugerdefinerede remote MCP-servere med Azure Functions og Python  
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Quickstart-skabelon til opbygning og implementering af brugerdefinerede remote MCP-servere med Azure Functions og .NET/C#  
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Quickstart-skabelon til opbygning og implementering af brugerdefinerede remote MCP-servere med Azure Functions og TypeScript  
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API Management som AI Gateway til Remote MCP-servere med Python  
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI-eksperimenter inklusive MCP-funktioner, integration med Azure OpenAI og AI Foundry  

Disse repositories tilbyder forskellige implementeringer, skabeloner og ressourcer til arbejde med Model Context Protocol på tværs af forskellige programmeringssprog og Azure-tjenester. De dækker en række brugsscenarier fra grundlæggende serverimplementeringer til autentificering, cloud-udrulning og enterprise-integration.  

#### MCP Resources Directory  

[MCP Resources directory](https://github.com/microsoft/mcp/tree/main/Resources) i det officielle Microsoft MCP-repository giver en kurateret samling af eksempelressourcer, promptskabeloner og værktøjsdefinitioner til brug med Model Context Protocol-servere. Denne mappe er designet til at hjælpe udviklere hurtigt i gang med MCP ved at tilbyde genanvendelige byggesten og bedste praksis-eksempler til:  

- **Promptskabeloner:** Klar-til-brug promptskabeloner til almindelige AI-opgaver og scenarier, som kan tilpasses til egne MCP-serverimplementeringer.  
- **Værktøjsdefinitioner:** Eksempelskemaer og metadata, der standardiserer værktøjsintegration og kald på tværs af forskellige MCP-servere.  
- **Ressourceeksempler:** Eksempeldefinitioner for tilkobling til datakilder, API’er og eksterne tjenester inden for MCP-rammen.  
- **Referenceimplementeringer:** Praktiske eksempler, der demonstrerer, hvordan ressourcer, prompts og værktøjer struktureres og organiseres i virkelige MCP-projekter.  

Disse ressourcer fremskynder udvikling, fremmer standardisering og hjælper med at sikre bedste praksis ved opbygning og implementering af MCP-baserede løsninger.  

#### MCP Resources Directory  

- [MCP Resources (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)  

### Forskningsmuligheder  

- Effektive promptoptimeringsteknikker inden for MCP-frameworks  
- Sikkerhedsmodeller til multi-tenant MCP-udrulninger  
- Ydelsesmåling på tværs af forskellige MCP-implementeringer  
- Formelle verifikationsmetoder til MCP-servere  

## Konklusion  

Model Context Protocol (MCP) former hurtigt fremtiden for standardiseret, sikker og interoperabel AI-integration på tværs af brancher. Gennem casestudierne og hands-on projekterne i denne lektion har du set, hvordan tidlige brugere – inklusive Microsoft og Azure – udnytter MCP til at løse virkelige udfordringer, accelerere AI-adoption og sikre overholdelse, sikkerhed og skalerbarhed. MCP’s modulære tilgang gør det muligt for organisationer at forbinde store sprogmodeller, værktøjer og virksomheders data i en samlet, reviderbar ramme. Som MCP fortsætter udviklingen, vil engagement med fællesskabet, udforskning af open source-ressourcer og anvendelse af bedste praksis være nøglen til at bygge robuste, fremtidssikrede AI-løsninger.  

## Yderligere ressourcer  

- [MCP Foundry GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)  
- [Integration af Azure AI-agenter med MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  
- [MCP GitHub Repository (Microsoft)](https://github.com/microsoft/mcp)  
- [MCP Resources Directory (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)  
- [MCP Community & Dokumentation](https://modelcontextprotocol.io/introduction)  
- [MCP Specifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Azure MCP Dokumentation](https://aka.ms/azmcp)  
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sikkerhedsbedste praksis  
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
- [Microsoft AI og Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)  

## Øvelser  

1. Analyser et af casestudierne og foreslå en alternativ implementeringstilgang.  
2. Vælg et af projektideerne og udarbejd en detaljeret teknisk specifikation.  
3. Undersøg en industri, der ikke er dækket i casestudierne, og skitser hvordan MCP kunne løse dens specifikke udfordringer.  
4. Udforsk en af de fremtidige retninger og skab et koncept for en ny MCP-udvidelse til understøttelse.  

## Hvad er det næste  

Udforsk mere: [Microsoft MCP Servers](./microsoft-mcp-servers.md)  

Fortsæt til: [Modul 8: Bedste praksis](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->