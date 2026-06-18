# 🌟 Lærdommer fra Tidlige Brukere

[![Lessons from MCP Early Adopters](../../../translated_images/no/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Klikk på bildet over for å se video av denne leksjonen)_

## 🎯 Hva Denne Modulen Dekker

Denne modulen utforsker hvordan reelle organisasjoner og utviklere benytter Model Context Protocol (MCP) for å løse faktiske utfordringer og drive innovasjon. Gjennom detaljerte casestudier, praktiske prosjekter og konkrete eksempler vil du oppdage hvordan MCP muliggjør sikker, skalerbar AI-integrasjon som kobler sammen språkmodeller, verktøy og bedriftsdata.

### 📚 Se MCP i Praksis

Vil du se disse prinsippene anvendt på produksjonsklare verktøy? Sjekk ut våre [**10 Microsoft MCP-servere som Transformerer Utviklerproduktiviteten**](microsoft-mcp-servers.md), som viser ekte Microsoft MCP-servere du kan bruke i dag.

## Oversikt

Denne leksjonen utforsker hvordan tidlige brukere har utnyttet Model Context Protocol (MCP) for å løse virkelige utfordringer og drive innovasjon på tvers av bransjer. Gjennom detaljerte casestudier og praktiske prosjekter vil du se hvordan MCP muliggjør standardisert, sikker og skalerbar AI-integrasjon – som knytter sammen store språkmodeller, verktøy og bedriftsdata i en enhetlig ramme. Du vil få praktisk erfaring med å designe og bygge MCP-baserte løsninger, lære av velprøvde implementeringsmønstre og oppdage beste praksis for å distribuere MCP i produksjonsmiljøer. Leksjonen fremhever også fremvoksende trender, fremtidige retninger og åpen kildekode-ressurser som hjelper deg å holde deg i front av MCP-teknologi og dens stadig utviklende økosystem.

## Læringsmål

- Analysere virkelige MCP-implementasjoner på tvers av ulike bransjer  
- Designe og bygge komplette MCP-baserte applikasjoner  
- Utforske fremvoksende trender og fremtidige retninger innen MCP-teknologi  
- Anvende beste praksis i faktiske utviklingsscenarioer  

## Virkelige MCP-Implementasjoner

### Casestudie 1: Automatisering av Kundestøtte i Bedrifter

Et multinasjonalt selskap implementerte en MCP-basert løsning for å standardisere AI-interaksjoner på tvers av deres kundestøttesystemer. Dette tillot dem å:

- Lage et samlet grensesnitt for flere LLM-leverandører  
- Opprettholde konsistent prompt-styring på tvers av avdelinger  
- Implementere robuste sikkerhets- og samsvarskontroller  
- Enkelt bytte mellom forskjellige AI-modeller basert på spesifikke behov  

**Teknisk Implementering:**

```python
# Python MCP-serverimplementering for kundesupport
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Konfigurer logging
logging.basicConfig(level=logging.INFO)

async def main():
    # Opprett serverkonfigurasjon
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Initialiser MCP-server
    server = create_server(config)
    
    # Registrer kunnskapsbase ressurser
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Registrer promptmaler
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Registrer støtteverktøy
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
  
**Resultater:** 30 % reduksjon i modellkostnader, 45 % forbedring i responshomogenitet, og forbedret samsvar på tvers av globale operasjoner.

### Casestudie 2: Helsediagnostisk Assistent

En helsetjenesteleverandør utviklet en MCP-infrastruktur for å integrere flere spesialiserte medisinske AI-modeller samtidig som sensitiv pasientdata ble beskyttet:

- Sømløst bytte mellom generelle og spesialiserte medisinske modeller  
- Strenge personvernkontroller og revisjonsspor  
- Integrasjon med eksisterende journalsystemer (EHR)  
- Konsistent prompt-utforming for medisinsk terminologi  

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
  
**Resultater:** Forbedrede diagnostiske forslag til leger samtidig som full HIPAA-samsvar ble opprettholdt, og betydelig reduksjon i kontekstbytte mellom systemer.

### Casestudie 3: Risikovurdering for Finansielle Tjenester

En finansinstitusjon implementerte MCP for å standardisere risikovurderingsprosesser på tvers av ulike avdelinger:

- Laget et samlet grensesnitt for kreditt-, svindel- og investeringsrisikomodeller  
- Implementerte strenge tilgangskontroller og modellversjonering  
- Sikret revisjonsevne for alle AI-anbefalinger  
- Opprettholdt konsistent dataformat på tvers av forskjellige systemer  

**Teknisk Implementering:**

```java
// Java MCP-server for finansiell risikovurdering
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Opprett MCP-server med funksjoner for finansiell samsvarsstyring
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
  
**Resultater:** Forbedret regulatorisk samsvar, 40 % raskere modellutrullingssykluser, og forbedret konsistens i risikovurdering på tvers av avdelinger.

### Casestudie 4: Microsoft Playwright MCP Server for Nettleserautomatisering

Microsoft utviklet [Playwright MCP-serveren](https://github.com/microsoft/playwright-mcp) for å muliggjøre sikker, standardisert nettleserautomatisering via Model Context Protocol. Denne produksjonsklare serveren gjør det mulig for AI-agenter og LLM-er å samhandle med nettlesere på en kontrollert, reviderbar og utvidbar måte – og muliggjør brukstilfeller som automatisert webtesting, datauttrekk og ende-til-ende arbeidsflyter.

> **🎯 Produksjonsklart Verktøy**  
>  
> Denne casestudien viser en ekte MCP-server du kan bruke i dag! Lær mer om Playwright MCP Server og 9 andre produksjonsklare Microsoft MCP-servere i vår [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Nøkkelfunksjoner:**
- Eksponerer nettleserautomatiseringsfunksjoner (navigasjon, skjemautfylling, skjermbildeopptak osv.) som MCP-verktøy  
- Implementerer strenge tilgangskontroller og sandkasse for å forhindre uautoriserte handlinger  
- Gir detaljerte revisjonslogger for alle nettleserinteraksjoner  
- Støtter integrasjon med Azure OpenAI og andre LLM-leverandører for agentdrevet automatisering  
- Driver GitHub Copilots kodeagent med nettleserfunksjonalitet  

**Teknisk Implementering:**

```typescript
// TypeScript: Registrerer Playwright nettleserautomatiseringsverktøy i en MCP-server
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Registrer et verktøy for å navigere til en URL og ta et skjermbilde
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

- Muliggjorde sikker, programmersk nettleserautomatisering for AI-agenter og LLM-er  
- Reduserte manuelt testarbeid og forbedret testdekning for nettapplikasjoner  
- Tilbød en gjenbrukbar, utvidbar ramme for nettleserbasert verktøyintegrasjon i bedriftsmiljøer  
- Driver GitHub Copilots nettleserfunksjoner  

**Referanser:**  

- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)  
- [Microsoft AI og Automatiseringsløsninger](https://azure.microsoft.com/en-us/products/ai-services/)  

### Casestudie 5: Azure MCP – Enterprise-Grade Model Context Protocol som en Tjeneste

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) er Microsofts administrerte, enterprise-grade implementasjon av Model Context Protocol, designet for å tilby skalerbare, sikre og samsvarende MCP-serverkapasiteter som en skytjeneste. Azure MCP gjør det mulig for organisasjoner å raskt distribuere, administrere og integrere MCP-servere med Azure AI, data- og sikkerhetstjenester, redusere driftsbelastning og akselerere AI-adopsjon.

> **🎯 Produksjonsklart Verktøy**  
>  
> Dette er en ekte MCP-server du kan bruke i dag! Lær mer om Microsoft Foundry MCP Server i vår [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md).

- Fullt administrert MCP-serverhosting med innebygd skalering, overvåking og sikkerhet  
- Native integrasjon med Azure OpenAI, Azure AI Search og andre Azure-tjenester  
- Enterprise-autentisering og autorisasjon via Microsoft Entra ID  
- Støtte for tilpassede verktøy, promptmaler og ressurskoblinger  
- Samsvar med bedriftsnivå sikkerhets- og regulatoriske krav  

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
- Redusert tid til verdi for bedrifts-AI-prosjekter ved å tilby en klar-til-bruk, samsvarende MCP-serverplattform  
- Forenklet integrasjon av LLM-er, verktøy og bedriftsdatakilder  
- Forbedret sikkerhet, observabilitet og driftseffektivitet for MCP-arbeidsmengder  
- Forbedret kodekvalitet med Azure SDK beste praksis og moderne autentiseringsmønstre  

**Referanser:**  
- [Azure MCP Dokumentasjon](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)  
- [Azure AI Tjenester](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)  

## Casestudie 6: NLWeb  
MCP (Model Context Protocol) er en fremvoksende protokoll for chatboter og AI-assistenter til å samhandle med verktøy. Hver NLWeb-instans er også en MCP-server, som støtter én kjerne-metode, ask, som brukes for å stille et nettsted et spørsmål på naturlig språk. Det returnerte svaret bruker schema.org, et mye brukt vokabular for beskrivelse av webdata. Løst sagt er MCP for NLWeb hva Http er for HTML. NLWeb kombinerer protokoller, Schema.org-formater og eksempel-kode for å hjelpe nettsteder raskt med å lage disse endepunktene, til nytte for både mennesker gjennom samtalegrensesnitt og maskiner gjennom naturlig agent-til-agent-interaksjon.

Det er to distinkte komponenter i NLWeb.  
- En protokoll, veldig enkel til å begynne med, for å grensesnitt med et nettsted på naturlig språk og et format, som bruker json og schema.org for det returnerte svaret. Se dokumentasjonen på REST API for mer detaljer.  
- En enkel implementering av (1) som utnytter eksisterende markup, for nettsteder som kan abstrakteres som lister over elementer (produkter, oppskrifter, attraksjoner, anmeldelser osv.). Sammen med et sett brukergrensesnitt-widgets kan nettsteder enkelt tilby samtalegrensesnitt til sitt innhold. Se dokumentasjonen på Life of a chat query for mer detaljer om hvordan dette fungerer.

**Referanser:**  
- [Azure MCP Dokumentasjon](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)  

### Casestudie 7: Microsoft Foundry MCP Server – Enterprise AI-Agentintegrasjon

Microsoft Foundry MCP-servere viser hvordan MCP kan brukes til å orkestrere og administrere AI-agenter og arbeidsflyter i bedriftsmiljøer. Ved å integrere MCP med Microsoft Foundry kan organisasjoner standardisere agentinteraksjoner, utnytte Foundrys arbeidsflytstyring og sikre sikre, skalerbare distribusjoner.

> **🎯 Produksjonsklart Verktøy**  
>  
> Dette er en ekte MCP-server du kan bruke i dag! Lær mer om Microsoft Foundry MCP Server i vår [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Nøkkelfunksjoner:**
- Omfattende tilgang til Azures AI-økosystem, inkludert modellkataloger og distribusjonsstyring  
- Kunnskapsindeksering med Azure AI Search for RAG-applikasjoner  
- Evalueringsverktøy for AI-modellers ytelse og kvalitetssikring  
- Integrasjon med Microsoft Foundry Catalog og Labs for banebrytende forskningsmodeller  
- Agentadministrasjon og evalueringsmuligheter for produksjonsscenarier  

**Resultater:**
- Rask prototyping og robust overvåking av AI-agentarbeidsflyter  
- Sømløs integrasjon med Azure AI-tjenester for avanserte scenarioer  
- Enhetlig grensesnitt for bygging, utrulling og overvåking av agent-pipelines  
- Forbedret sikkerhet, samsvar og driftseffektivitet for bedrifter  
- Akselerert AI-adopsjon samtidig som kontroll over komplekse agentdrevne prosesser opprettholdes  

**Referanser:**
- [Microsoft Foundry MCP Server GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Integrering av Azure AI Agents med MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  

### Casestudie 8: Foundry MCP Playground – Eksperimentering og Prototyping

Foundry MCP Playground tilbyr et klart-til-bruk-miljø for eksperimentering med MCP-servere og Microsoft Foundry-integrasjoner. Utviklere kan raskt prototype, teste og evaluere AI-modeller og agentarbeidsflyter ved å bruke ressurser fra Microsoft Foundry Catalog og Labs. Playground forenkler oppsett, tilbyr eksempler på prosjekter og støtter samarbeidende utvikling, noe som gjør det enkelt å utforske beste praksis og nye scenarioer med minimal innsats. Det er spesielt nyttig for team som ønsker å validere ideer, dele eksperimenter og akselerere læring uten behov for kompleks infrastruktur. Ved å senke inngangsbarrieren fremmer playground innovasjon og fellesskapsbidrag i MCP- og Microsoft Foundry-økosystemet.

**Referanser:**

- [Foundry MCP Playground GitHub Repository](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Casestudie 9: Microsoft Learn Docs MCP Server – AI-Drevet Tilgang til Dokumentasjon

Microsoft Learn Docs MCP Server er en skyhostet tjeneste som gir AI-assistenter sanntidstilgang til offisiell Microsoft-dokumentasjon gjennom Model Context Protocol. Denne produksjonsklare serveren kobles til det omfattende Microsoft Learn-økosystemet og muliggjør semantisk søk på tvers av alle offisielle Microsoft-kilder.

> **🎯 Produksjonsklart Verktøy**  
>  
> Dette er en ekte MCP-server du kan bruke i dag! Lær mer om Microsoft Learn Docs MCP Server i vår [**Microsoft MCP Servers Guide**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Nøkkelfunksjoner:**
- Sanntidstilgang til offisiell Microsoft-dokumentasjon, Azure-dokumentasjon og Microsoft 365-dokumentasjon  
- Avanserte semantiske søkefunksjoner som forstår kontekst og intensjon  
- Alltid oppdatert informasjon i takt med publisering av Microsoft Learn-innhold  
- Omfattende dekning på tvers av Microsoft Learn, Azure-dokumentasjon og Microsoft 365-kilder  
- Returnerer opptil 10 innholdsbiter av høy kvalitet med artikeltitler og URL-er  

**Hvorfor Det Er Kritisk:**
- Løser problemet med "utdatert AI-kunnskap" for Microsoft-teknologier  
- Sikrer at AI-assistenter har tilgang til de nyeste .NET-, C#-, Azure- og Microsoft 365-funksjonene  
- Gir autoritativ, førstepartsinformasjon for nøyaktig kodegenerering  
- Essensielt for utviklere som jobber med raskt utviklende Microsoft-teknologier  

**Resultater:**
- Dramatisk forbedret nøyaktighet på AI-generert kode for Microsoft-teknologier  
- Redusert tid brukt på å finne aktuell dokumentasjon og beste praksis  
- Forbedret utviklerproduktivitet med kontekstbevisst dokumentasjonsinnhenting  
- Sømløs integrasjon i utviklingsarbeidsflyter uten å forlate IDE-en  

**Referanser:**
- [Microsoft Learn Docs MCP Server GitHub Repository](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn Dokumentasjon](https://learn.microsoft.com/)  

## Praktiske Prosjekter

### Prosjekt 1: Bygg en MCP-server med Flere Leverandører

**Mål:** Lag en MCP-server som kan rute forespørsler til flere AI-modellleverandører basert på bestemte kriterier.

**Krav:**

- Støtte minst tre forskjellige modellleverandører (f.eks. OpenAI, Anthropic, lokale modeller)  
- Implementere en rutemekanisme basert på metadata i forespørselen  
- Lage et konfigurasjonssystem for å håndtere leverandørlegitimasjon  
- Legge til caching for å optimalisere ytelse og kostnader  
- Bygge et enkelt dashboard for overvåking av bruk  

**Implementeringstrinn:**

1. Sett opp grunnleggende MCP-serverinfrastruktur  
2. Implementer leverandøradaptere for hver AI-modelltjeneste  
3. Lag rutelogikk basert på forespørselsattributter  
4. Legg til cachingmekanismer for hyppige forespørsler  
5. Utvikle overvåkingsdashboard  
6. Test med ulike forespørselsmønstre  

**Teknologier:** Velg blant Python (.NET/Java/Python etter preferanse), Redis for caching, og et enkelt web-rammeverk for dashboardet.

### Prosjekt 2: Bedriftsystem for Promptadministrasjon

**Mål:** Utvikle et MCP-basert system for administrasjon, versjonering og utrulling av promptmaler på tvers av en organisasjon.

**Krav:**
- Opprett et sentralt depot for promptmaler
- Implementer versjonshåndtering og godkjenningsflyter
- Bygg testmuligheter for maler med eksempelinndata
- Utvikle rollebaserte tilgangskontroller
- Lag en API for henting og distribusjon av maler

**Implementeringstrinn:**

1. Design databaseskjema for lagring av maler
2. Opprett kjerne-API for CRUD-operasjoner på maler
3. Implementer versjonshåndteringssystemet
4. Bygg godkjenningsflyt
5. Utvikle testingsrammeverket
6. Lag et enkelt webgrensesnitt for administrasjon
7. Integrer med en MCP-server

**Teknologier:** Valgt backend-rammeverk, SQL eller NoSQL database, og et frontend-rammeverk for administrasjonsgrensesnittet.

### Prosjekt 3: MCP-basert plattform for innholdsgenerering

**Mål:** Bygg en plattform for innholdsgenerering som utnytter MCP for å gi konsistente resultater på tvers av ulike innholdstyper.

**Krav:**

- Støtte flere innholdsformater (blogginnlegg, sosiale medier, markedsføringsinnhold)
- Implementer malbasert generering med tilpasningsmuligheter
- Lag et system for innholdsrevisjon og tilbakemelding
- Spor ytelsesmetrikker for innhold
- Støtt versjonering og iterasjon av innhold

**Implementeringstrinn:**

1. Sett opp MCP-klientinfrastruktur
2. Lag maler for ulike innholdstyper
3. Bygg innholdsgenereringspipeline
4. Implementer revisjonssystem
5. Utvikle system for metrikksporing
6. Lag brukergrensesnitt for maladministrasjon og innholdsgenerering

**Teknologier:** Ønsket programmeringsspråk, webrammeverk og databasesystem.

## Fremtidige retninger for MCP-teknologi

### Fremvoksende trender

1. **Multi-Modalt MCP**
   - Utvidelse av MCP for standardisering av interaksjon med bilde-, lyd- og videomodeller
   - Utvikling av tverrmodale resonnementsevner
   - Standardiserte promptformater for ulike modaliteter

2. **Federert MCP-infrastruktur**
   - Distribuerte MCP-nettverk som kan dele ressurser på tvers av organisasjoner
   - Standardiserte protokoller for sikker deling av modeller
   - Personvernbevarende beregningsteknikker

3. **MCP-markedsplasser**
   - Økosystemer for deling og kommersialisering av MCP-maler og plugins
   - Kvalitetssikring og sertifiseringsprosesser
   - Integrasjon med modellmarkedsplasser

4. **MCP for Edge Computing**
   - Tilpasning av MCP-standarder for ressursbegrensede edge-enheter
   - Optimaliserte protokoller for lavbåndbreddemiljøer
   - Spesialiserte MCP-implementeringer for IoT-økosystemer

5. **Regulatoriske rammeverk**
   - Utvikling av MCP-utvidelser for regulatorisk samsvar
   - Standardiserte revisjonsspor og forklarbarhetsgrensesnitt
   - Integrasjon med kommende AI-styringsrammeverk

### MCP-løsninger fra Microsoft

Microsoft og Azure har utviklet flere open-source repositories for å hjelpe utviklere med å implementere MCP i ulike scenarier:

#### Microsoft-organisasjonen

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - En Playwright MCP-server for nettleserautomatisering og testing
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - En OneDrive MCP-serverimplementering for lokal testing og fellesskapsbidrag
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb er en samling av åpne protokoller og relaterte open source-verktøy. Hovedfokus er å etablere et grunnleggende lag for AI-nett

#### Azure-Samples-organisasjonen

1. [mcp](https://github.com/Azure-Samples/mcp) - Lenker til eksempler, verktøy og ressurser for å bygge og integrere MCP-servere på Azure med flere språk
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Referanse MCP-servere som demonstrerer autentisering med gjeldende Model Context Protocol-spesifikasjon
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Landingsside for Remote MCP-serverimplementeringer i Azure Functions med lenker til språkspesifikke repositories
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Kjappstartmal for å bygge og deployere tilpassede fjern-MCP-servere med Azure Functions og Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Kjappstartmal for å bygge og deployere tilpassede fjern-MCP-servere med Azure Functions og .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Kjappstartmal for å bygge og deployere tilpassede fjern-MCP-servere med Azure Functions og TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API Management som AI-gateway til fjern-MCP-servere ved bruk av Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI-eksperimenter inkludert MCP-funksjonalitet, med integrasjon til Azure OpenAI og AI Foundry

Disse repositories tilbyr ulike implementeringer, maler og ressurser for arbeid med Model Context Protocol på tvers av programmeringsspråk og Azure-tjenester. De dekker et spekter fra grunnleggende serverimplementeringer til autentisering, skyutplassering og bedriftsintegrasjons-scenarier.

#### MCP Resources Directory

[MCP Resources directory](https://github.com/microsoft/mcp/tree/main/Resources) i den offisielle Microsoft MCP-repoen tilbyr en kurert samling av eksempler på ressurser, promptmaler og verktøydefinisjoner for bruk med Model Context Protocol-servere. Denne katalogen er laget for å hjelpe utviklere å komme raskt i gang med MCP ved å tilby gjenbrukbare byggeklosser og beste praksiseksempler for:

- **Promptmaler:** Ferdige promptmaler for vanlige AI-oppgaver og scenarier, som kan tilpasses egne MCP-serverimplementeringer.
- **Verktøydefinisjoner:** Eksempelverktøyskjemaer og metadata for å standardisere verktøyintegrasjon og -kall på tvers av MCP-servere.
- **Ressurseeksempler:** Eksempler på ressursdefinisjoner for tilkobling til datakilder, APIer og eksterne tjenester innen MCP-rammeverket.
- **Referanseimplementeringer:** Praktiske eksempler som demonstrerer hvordan man strukturerer og organiserer ressurser, prompts og verktøy i reelle MCP-prosjekter.

Disse ressursene akselererer utvikling, fremmer standardisering, og bidrar til beste praksis ved bygging og utplassering av MCP-baserte løsninger.

#### MCP Resources Directory

- [MCP Resources (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)

### Forskningsmuligheter

- Effektive teknikker for promptoptimalisering innen MCP-rammeverk
- Sikkerhetsmodeller for multi-leietaker MCP-distribusjoner
- Ytelsesmålinger på tvers av ulike MCP-implementeringer
- Formelle verifikasjonsmetoder for MCP-servere

## Konklusjon

Model Context Protocol (MCP) former raskt fremtiden for standardisert, sikker og interoperabel AI-integrasjon på tvers av bransjer. Gjennom case-studier og praktiske prosjekter i denne leksjonen har du sett hvordan tidlige brukere – inkludert Microsoft og Azure – utnytter MCP for å løse virkelige utfordringer, fremskynde AI-adopsjon, og sikre samsvar, sikkerhet og skalerbarhet. MCPs modulære tilnærming gjør det mulig for organisasjoner å koble sammen store språkmodeller, verktøy og bedriftsdata i en enhetlig, revisjonssikker ramme. Etter hvert som MCP utvikler seg videre, vil det være viktig å holde seg engasjert i fellesskapet, utforske open-source ressurser, og anvende beste praksis for å bygge robuste, fremtidsklare AI-løsninger.

## Flere ressurser

- [MCP Foundry GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Integrating Azure AI Agents with MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub Repository (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources Directory (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP Community & Documentation](https://modelcontextprotocol.io/introduction)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP Documentation](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sikkerhetsbeste praksis
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

## Øvelser

1. Analyser et av case-studiene og foreslå en alternativ implementeringstilnærming.
2. Velg et av prosjektideene og lag en detaljert teknisk spesifikasjon.
3. Undersøk en bransje som ikke dekkes i case-studiene, og skissér hvordan MCP kan møte dens spesifikke utfordringer.
4. Utforsk en av de fremtidige retningene og lag et konsept for en ny MCP-utvidelse for å støtte denne.

## Hva nå

Utforsk mer: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

Fortsett til: [Modul 8: Beste praksis](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->