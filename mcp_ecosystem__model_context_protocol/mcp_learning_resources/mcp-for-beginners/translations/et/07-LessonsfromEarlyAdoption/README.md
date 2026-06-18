# 🌟 Õppetunnid varajastelt kasutajatelt

[![Lessons from MCP Early Adopters](../../../translated_images/et/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Klõpsake ülaloleval pildil, et vaadata selle õppetunni videot)_

## 🎯 Mida see moodul hõlmab

See moodul uurib, kuidas päris organisatsioonid ja arendajad kasutavad Model Context Protocol’i (MCP), et lahendada reaalseid väljakutseid ja edendada innovatsiooni. Üksikasjalike juhtumiuuringute, praktiliste projektide ja näidete kaudu avastate, kuidas MCP võimaldab turvalist, skaleeritavat AI integratsiooni, mis ühendab keelemudelid, tööriistad ja ettevõtte andmed.

### 📚 Vaata MCP-d tegevuses

Tahad näha neid põhimõtteid tootmiskõlblikes tööriistades rakendatuna? Vaata meie [**10 Microsofti MCP serverit, mis muudavad arendajate tootlikkust**](microsoft-mcp-servers.md), mis tutvustavad päris Microsofti MCP servereid, mida saad täna kasutada.

## Ülevaade

Selles õppetunnis uuritakse, kuidas varajased kasutajad on kasutanud Model Context Protocol’i (MCP), et lahendada reaalseid probleeme ja edendada innovatsiooni erinevates tööstusharudes. Üksikasjalike juhtumiuuringute ja praktiliste projektide kaudu näed, kuidas MCP võimaldab standardiseeritud, turvalist ja skaleeritavat AI integratsiooni — ühendades suured keelemudelid, tööriistad ja ettevõtte andmed ühtses raamistikus. Saad praktilisi kogemusi MCP-põhiste lahenduste kujundamisel ja ehitamisel, õpid tõestatud rakenduse mustreid ning avastad parimaid tavasid MCP tootmiskeskkondadesse juurutamiseks. Õppetund toob esile ka tekkivaid trende, tuleviku suundi ja avatud lähtekoodiga ressursse, mis aitavad sul MCP tehnoloogia ja selle areneva ökosüsteemi esirinnas püsida.

## Õpieesmärgid

- Analüüsida MCP reaalseid rakendusi erinevates tööstusharudes
- Kujundada ja ehitada täielikke MCP-põhiseid rakendusi
- Uurida MCP tehnoloogia tekkivaid trende ja tuleviku suundi
- Rakendada parimaid praktikaid tegelikes arenduskontekstides

## MCP rakendused reaalses maailmas

### Juhtumiuuring 1: Ettevõtte klienditoe automatiseerimine

Rahvusvaheline korporatsioon rakendas MCP-põhise lahenduse, et standardiseerida AI suhtlust oma klienditoesüsteemides. See võimaldas neil:

- Luua ühtne liides mitme LLM-i pakkuja jaoks
- Säilitada järjepidev promptide haldus osakondade vahel
- Juurutada tugevaid turva- ja vastavuskontrolle
- Lihtsalt vahetada erinevate AI mudelite vahel vastavalt konkreetsetele vajadustele

**Tehniline rakendus:**

```python
# Pythoni MCP serveri rakendus klienditoele
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Logimise seadistamine
logging.basicConfig(level=logging.INFO)

async def main():
    # Serveri konfiguratsiooni loomine
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # MCP serveri initsialiseerimine
    server = create_server(config)
    
    # Teadmistebaasi ressursside registreerimine
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Käsklude mallide registreerimine
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Toetatavate tööriistade registreerimine
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Serveri käivitamine HTTP transpordiga
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Tulemused:** mudelikulude vähenemine 30%, vastuste järjepidevuse paranemine 45% ja paremad vastavusnõuded ülemaailmses tegevuses.

### Juhtumiuuring 2: Tervishoiu diagnostika assistent

Tervishoiuteenuse pakkuja arendas MCP infrastruktuuri, et integreerida mitu spetsialiseeritud meditsiinilist AI mudelit, tagades samal ajal tundlike patsientandmete kaitse:

- Sujuv vahetus üld- ja spetsialiseeritud meditsiiniliste mudelite vahel
- Rangete privaatsuskontrollide ja auditeerimisjälgede rakendamine
- Integratsioon olemasolevate elektrooniliste terviseandmete (EHR) süsteemidega
- Järjepidev promptide loomine meditsiinilise terminoloogia jaoks

**Tehniline rakendus:**

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
  
**Tulemused:** paranenud arstide diagnostilised soovitused, täielik HIPAA vastavus ja kontekstide vahetamise märkimisväärne vähendamine süsteemide vahel.

### Juhtumiuuring 3: Finantsteenuste riskianalüüs

Finantsasutus rakendas MCP, et standardiseerida riskianalüüsi protsessid erinevates osakondades:

- Loodi ühtne liides krediidiriski, pettuse avastamise ja investeeringuriskide mudelite jaoks
- Rakendati ranged juurdepääsukontrollid ja mudeliversioonide haldus
- Tagati kõigi AI soovituste auditeeritavus
- Säilitati järjepidev andmete vormindamine erinevate süsteemide vahel

**Tehniline rakendus:**

```java
// Java MCP server finantsriski hindamiseks
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Loo MCP server finantsnõuetele vastavuse funktsioonidega
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
  
**Tulemused:** parandatud regulatiivne vastavus, mudelite juurutamise tsüklite kiirenemine 40% ja riskihindamise järjepidevuse paranemine osakondade vahel.

### Juhtumiuuring 4: Microsoft Playwright MCP server brauseri automatiseerimiseks

Microsoft arendas [Playwright MCP serveri](https://github.com/microsoft/playwright-mcp), mis võimaldab turvalist, standardiseeritud brauseri automatiseerimist Model Context Protocol’i kaudu. See tootmiskõlblik server võimaldab AI agentidel ja LLM-del suhelda veebibrauseritega kontrollitud, jälgitaval ja laiendataval viisil — toetades kasutusjuhtumeid nagu automatiseeritud veebitestimine, andmete väljavõtmine ja terviklikud töövood.

> **🎯 Tootmiskõlblik tööriist**
> 
> See juhtumiuuring tutvustab tõelist MCP serverit, mida saad täna kasutada! Loe rohkem Playwright MCP Serverist ja 9 teisest tootmiskõlblikust Microsofti MCP serverist meie [**Microsoft MCP serverite juhendist**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Põhijooned:**  
- Avaldab brauseri automatiseerimise võimekused (navigeerimine, vormide täitmine, ekraanipiltide tegemine jne) MCP tööriistadena  
- Rakendab ranged juurdepääsukontrollid ja liivakasti, et takistada volitamata tegevusi  
- Pakub detailseid auditeerimislogisid kõikide brauseri interaktsioonide kohta  
- Toetab integratsiooni Azure OpenAI ja teiste LLM pakkujatega agentide automatiseerimiseks  
- Võimaldab GitHub Copiloti kodeerimisagendil kasutada veebibrauseri võimeid

**Tehniline rakendus:**

```typescript
// TypeScript: Playwrighti brauseri automatiseerimise tööriistade registreerimine MCP serveris
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Registreeri tööriist URL-ile navigeerimiseks ja ekraanipildi tegemiseks
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

// Käivita MCP server
server.listen(8080);
```
  
**Tulemused:**

- Võimaldab turvalist programmipõhist brauseri automatiseerimist AI agentide ja LLM-ide jaoks  
- Vähendab käsitsi testimise pingutust ja parandab veebirakenduste katvust  
- Pakub korduvkasutatavat ja laiendatavat raamistikku brauseripõhiste tööriistade integratsiooniks ettevõtetes  
- Toetab GitHub Copiloti veebibrauseri funktsioone

**Viited:**

- [Playwright MCP Server GitHub’i hoidla](https://github.com/microsoft/playwright-mcp)  
- [Microsofti AI ja automatiseerimise lahendused](https://azure.microsoft.com/en-us/products/ai-services/)

### Juhtumiuuring 5: Azure MCP – Ettevõttele mõeldud Model Context Protocol teenusena

Azure MCP server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) on Microsofti hallatav, ettevõttetasemel rakendus Model Context Protocol’ist, mis on loodud pakkuma skaleeritavaid, turvalisi ja vastavusnõuetele vastavaid MCP serveri võimalusi pilveteenusena. Azure MCP võimaldab organisatsioonidel kiiresti juurutada, hallata ja integreerida MCP servereid Azure AI, andmete ja turvateenustega, vähendada juhtimiskoormust ning kiirendada AI kasutuselevõttu.

> **🎯 Tootmiskõlblik tööriist**
> 
> See on tõeline MCP server, mida saad täna kasutada! Loe rohkem Microsoft Foundry MCP Serveri kohta meie [**Microsoft MCP serverite juhendis**](microsoft-mcp-servers.md).

- Täishaldus MCP serveri majutamiseks, millel on sisseehitatud skaleerimine, järelevalve ja turvalisus  
- Looduslik integratsioon Azure OpenAI, Azure AI Search ja teiste Azure teenustega  
- Ettevõtte autentimine ja autoriseerimine Microsoft Entra ID kaudu  
- Tugi kohandatud tööriistadele, promptide mallidele ja ressurssidega ühendajatele  
- Vastavus ettevõtte turva- ja regulatiivsetele nõuetele

**Tehniline rakendus:**

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
  
**Tulemused:**  
- Vähendas aega väärtuse saavutamiseks ettevõtte AI projektides, pakkudes valmis, nõuetele vastavat MCP serveri platvormi  
- Lihtsustas LLM-ide, tööriistade ja ettevõtte andmeallikate integratsiooni  
- Parandas turvalisust, seiret ja operatiivset tõhusust MCP töökoormuste juhtimisel  
- Parandas koodi kvaliteeti Azure SDK heade tavade ja kaasaegsete autentimismustritega

**Viited:**  
- [Azure MCP dokumentatsioon](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub hoidla](https://github.com/Azure/azure-mcp)  
- [Azure AI teenused](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP keskus](https://mcp.azure.com)

## Juhtumiuuring 6: NLWeb  
MCP (Model Context Protocol) on tekkiv protokoll vestlusrobotite ja AI assistentide tööriistadega suhtlemiseks. Iga NLWeb eksemplar on ka MCP server, mis toetab üht põhimeetodit, küsima, mida kasutatakse veebilehelt loomulikus keeles küsimise jaoks. Tagastatud vastus kasutab schema.org sõnastikku, mis on laialdaselt kasutatav veebandmete kirjeldamiseks. Üldiselt on MCP nagu NLWeb suhtes HTTP-le ja HTML-ile. NLWeb kombineerib protokolle, Schema.org formaate ja näidiskoodi, et aidata saitidel kiiresti luua need lõpp-punktid, kasuks tulevad nii inimestele vestlusliideste kaudu kui ka masinatele loomulikus agentidevahelises suhtluses.

NLWeb koosneb kahest eraldiseisvast komponendist.  
- Protokoll, mis on alguses väga lihtne, et suhelda lehega loomulikus keeles ja formaat, mis kasutab json’i ja schema.org-i tagastatud vastuse jaoks. Vaata REST API dokumentatsiooni rohkemate üksikasjade saamiseks.  
- Lihtne rakendus (1), mis kasutab olemasolevat märgendust saitide jaoks, mida saab abstraktse nimekirjana kirjeldada (tooted, retseptid, vaatamisväärsused, arvustused jne). Koos kasutajaliidese vidinatega saavad saidid hõlpsasti pakkuda vestlusliideseid oma sisule. Vaata dokumentatsiooni „Life of a chat query“ kohta, et saada rohkem teavet, kuidas see töötab.

**Viited:**  
- [Azure MCP dokumentatsioon](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Juhtumiuuring 7: Microsoft Foundry MCP Server – Ettevõtte AI agentide integratsioon

Microsoft Foundry MCP serverid demonstreerivad, kuidas MCP-d saab kasutada AI agentide ja töövoogude orkestreerimiseks ja haldamiseks ettevõttes. MCP integreerimine Microsoft Foundryga võimaldab organisatsioonidel standardiseerida agentide suhtlust, kasutada Foundry töövoohaldust ning tagada turvalised, skaleeritavad juurutused.

> **🎯 Tootmiskõlblik tööriist**
> 
> See on tõeline MCP server, mida saad täna kasutada! Loe rohkem Microsoft Foundry MCP Serveri kohta meie [**Microsoft MCP serverite juhendis**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Põhijooned:**  
- Täielik juurdepääs Azure AI ökosüsteemile, sealhulgas mudelikataloogidele ja juurutuse haldusele  
- Teadmiste indekseerimine Azure AI Search abil RAG rakenduste jaoks  
- AI mudelite sooritusnäitajate ja kvaliteedi hindamise tööriistad  
- Integratsioon Microsoft Foundry kataloogi ja laboritega tipptasemel teadusuuringuteks  
- Agentide haldus- ja hindamisvõimalused tootmisstsenaariumide jaoks

**Tulemused:**  
- Kiire prototüüpimine ja AI agentide töövoogude tugev jälgimine  
- Sujuv integreerimine Azure AI teenustega arenenud stsenaariumide jaoks  
- Ühtne liides agentide torujuhtmete ehitamiseks, juurutamiseks ja jälgimiseks  
- Paranenud turvalisus, vastavus ja operatiivne tõhusus ettevõtetele  
- KI kasutuselevõtu kiirendamine, säilitades kontrolli keerukate agentide protsesside üle

**Viited:**  
- [Microsoft Foundry MCP Server GitHub hoidla](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Azure AI agentide integratsioon MCP-ga (Microsoft Foundry blogi)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Juhtumiuuring 8: Foundry MCP Playground – Katsetamine ja prototüüpimine

Foundry MCP Playground pakub valmis keskkonda MCP serveritega ja Microsoft Foundry integratsioonidega katsetamiseks. Arendajad saavad kiiresti prototüüpida, testida ja hinnata AI mudeleid ja agentide töövooge, kasutades Microsoft Foundry kataloogi ja laborite ressursse. Playground lihtsustab seadistamist, pakub näidiskavasid ja toetab koostööl põhinevat arendust, muutes lihtsaks parimate tavade ja uute stsenaariumide uurimise minimaalse halduskuluga. See sobib eriti hästi meeskondadele, kes soovivad ideid valideerida, katseid jagada ja õppimist kiirendada ilma keeruka infrastruktuurita. Madalam barjäär soodustab innovatsiooni ja kogukonna panustamist MCP ja Microsoft Foundry ökosüsteemis.

**Viited:**

- [Foundry MCP Playground GitHub hoidla](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Juhtumiuuring 9: Microsoft Learn Docs MCP Server – AI-toega dokumentatsioonile juurdepääs

Microsoft Learn Docs MCP Server on pilves majutatud teenus, mis annab AI assistentidele reaalajas juurdepääsu ametlikule Microsofti dokumentatsioonile Model Context Protocol’i kaudu. See tootmiskõlblik server ühendub tervikliku Microsoft Learn ökosüsteemiga ja võimaldab semantilist otsingut kõigi ametlike Microsofti allikate vahel.

> **🎯 Tootmiskõlblik tööriist**
> 
> See on tõeline MCP server, mida saad täna kasutada! Loe rohkem Microsoft Learn Docs MCP Serveri kohta meie [**Microsoft MCP serverite juhendis**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Põhijooned:**  
- Reaalajas juurdepääs ametlikule Microsofti dokumentatsioonile, Azure ja Microsoft 365 dokumentidele  
- Täiustatud semantilised otsinguvõimalused, mis mõistavad konteksti ja eesmärki  
- Alati ajakohane info, kuna Microsoft Learn sisu avaldatakse jooksvalt  
- Ulatuslik katvus Microsoft Learn, Azure dokumentatsiooni ja Microsoft 365 allikate vahel  
- Tagastab kuni 10 kõrgekvaliteedilist sisutükki koos artiklite pealkirjade ja URLidega

**Miks see on oluline:**  
- Lahendab „vananenud AI teadmust“ Microsofti tehnoloogiate puhul  
- Tagab, et AI assistendid pääsevad ligi uusimatele .NET, C#, Azure ja Microsoft 365 funktsioonidele  
- Pakub autoriteetset esmapoolset infot täpseks koodigeneratsiooniks  
- Hädavajalik arendajatele, kes töötavad kiiresti arenevate Microsofti tehnoloogiatega

**Tulemused:**  
- Märkimisväärselt paranenud AI-põhise koodigeneratsiooni täpsus Microsofti tehnoloogiate puhul  
- Vähenenud otsitavate praeguste dokumentide ja parimate tavade leidmise aeg  
- Paranenud arendajate tootlikkus kontekstitundliku dokumentide toomise kaudu  
- Sujuv integreerimine arendustöövoogudesse ilma IDE-st lahkumata

**Viited:**  
- [Microsoft Learn Docs MCP Server GitHub hoidla](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn dokumentatsioon](https://learn.microsoft.com/)

## Praktilised projektid

### Projekt 1: Loo mitme pakkujaga MCP server

**Eesmärk:** Loo MCP server, mis suudab suunata päringud mitmele erinevale AI mudelite pakkujale vastavalt konkreetsetele kriteeriumidele.

**Nõuded:**

- Toeta vähemalt kolme erineva mudelipakkuja kasutamist (nt OpenAI, Anthropic, kohalikud mudelid)  
- Rakenda suunamismehhanism päringu metaandmete põhjal  
- Loo konfiguratsioonisüsteem pakkujate volituste haldamiseks  
- Lisa vahemälustamine, et optimeerida jõudlust ja kulusid  
- Ehita lihtne armatuurlaual põhinev kasutuse jälgimise liides

**Rakendusetapid:**

1. Sea üles põhiline MCP serveri infrastruktuur  
2. Rakenda pakkujate adapterid iga AI mudelite teenuse jaoks  
3. Loo suunamisloogika päringu atribuudi põhjal  
4. Lisa vahemälu mehhanismid sagedaste päringute jaoks  
5. Arenda jälgimisarmatuurlaud  
6. Testi erinevate päringumustritega

**Tehnoloogiad:** Vali Python (.NET/Java/Python vastavalt eelistusele), Redis vahemäluks ja lihtne veebiraamistik armatuurlaudade jaoks.

### Projekt 2: Ettevõtte promptide haldussüsteem

**Eesmärk:** Arenda MCP-põhine süsteem promptide mallide haldamiseks, versioonimiseks ja juurutamiseks organisatsiooni ulatuses.

**Nõuded:**
- Loo tsentraliseeritud mallide teek
- Rakenda versioonihaldus ja kinnituskäigud
- Ehita mallide testimise võimekus koos näidisandmetega
- Arenda rollipõhised juurdepääsu kontrollid
- Loo mallide pärimise ja kasutuselevõtu API

**Rakendamise sammud:**

1. Kujunda andmebaasi skeem mallide salvestamiseks
2. Loo põhikäitlustega API mallide loomiseks, lugemiseks, uuendamiseks ja kustutamiseks
3. Rakenda versioonihaldussüsteem
4. Ehita kinnituskäik
5. Arenda testimisraamistik
6. Loo lihtne veebiliides halduseks
7. Integreeri MCP serveriga

**Tehnoloogiad:** Valitud backend raamistik, SQL või NoSQL andmebaas ja frontend raamistik haldusliidese jaoks.

### Projekt 3: MCP-põhine sisuloome platvorm

**Eesmärk:** Loo sisuloome platvorm, mis kasutab MCP-d, et tagada järjepidevad tulemused erinevates sisutüüpides.

**Nõuded:**

- Toeta mitut sisuvormi (blogipostitused, sotsiaalmeedia, turunduskirjad)
- Rakenda mallipõhist genereerimist kohandamisvõimalustega
- Loo sisukontrolli ja tagasiside süsteem
- Jälgi sisu tulemuslikkuse mõõdikuid
- Toeta sisu versioonimist ja iteratsiooni

**Rakendamise sammud:**

1. Loo MCP kliendi infrastruktuur
2. Koosta mallid erinevate sisutüüpide jaoks
3. Ehita sisuloome torujuhe
4. Rakenda kontrollsüsteem
5. Arenda mõõdikute jälgimise süsteem
6. Loo kasutajaliides mallihalduseks ja sisuloomeks

**Tehnoloogiad:** Valitud programmeerimiskeel, veebiraamistik ja andmebaasisüsteem.

## MCP tehnoloogia tulevased suunad

### Tekkivad trendid

1. **Multi-modaalne MCP**
   - MCP laiendamine, et standardiseerida suhtlus pildi-, heli- ja videomudelitega
   - Ristmodaalsete järeldusvõimete arendamine
   - Standardiseeritud prompti formaadid erinevate modaliteetide jaoks

2. **Federatiivne MCP infrastruktuur**
   - Hajutatud MCP võrgud, mis suudavad jagada ressursse organisatsioonide vahel
   - Standardiseeritud protokollid turvaliseks mudeli jagamiseks
   - Privaatsust kaitsvad arvutustehnikad

3. **MCP turulähedused**
   - Ökosüsteemid MCP mallide ja plugin-de jagamiseks ja monetiseerimiseks
   - Kvaliteedi tagamise ja sertifitseerimise protsessid
   - Integratsioon mudelite turgudega

4. **MCP servarvutuses**
   - MCP standardite kohandamine ressursipiiratud servaseadmetele
   - Võrgu vähese ribalaiusega keskkonna jaoks optimeeritud protokollid
   - Spetsiaalsed MCP rakendused IoT ökosüsteemide jaoks

5. **Regulatiivsed raamistikud**
   - MCP laienduste väljatöötamine regulatiivse vastavuse tagamiseks
   - Standardiseeritud auditeerimise jäljed ja selgitamise liidesed
   - Integreerimine tekkivate tehisintellekti valitsemise raamistikudega

### Microsofti MCP lahendused

Microsoft ja Azure on loonud mitu avatud lähtekoodiga hoidlat, mis aitavad arendajatel MCP rakendada erinevates stsenaariumites:

#### Microsofti organisatsioon

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Playwright MCP server brauseri automatiseerimiseks ja testimiseks
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - OneDrive MCP serveri rakendus kohalikuks testimiseks ja kogukonna panuseks
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb on kogumik avatud protokolle ja kaasasolevaid avatud lähtekoodiga tööriistu. Selle peamine eesmärk on luua AI veebi aluskiht

#### Azure-Samples organisatsioon

1. [mcp](https://github.com/Azure-Samples/mcp) - Näidete, tööriistade ja ressursside kogumik MCP serverite ehitamiseks ja integreerimiseks Azure’is mitme keelega
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Viiteserverid, mis demonstreerivad autentimist praeguse Model Context Protocol spetsifikatsiooni alusel
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Avaleht Remote MCP Serveri rakendustele Azure Functions’is koos keelespetsiifiliste hoidlate linkidega
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Kiirkäivitamise mall kohandatud kaug-MCP serverite loomiseks ja juurutamiseks Azure Functions Pythoniga
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Kiirkäivitamise mall kohandatud kaug-MCP serverite loomiseks ja juurutamiseks Azure Functions .NET/C#-ga
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Kiirkäivitamise mall kohandatud kaug-MCP serverite loomiseks ja juurutamiseks Azure Functions TypeScriptiga
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API haldus AI väravana Remote MCP serveritele Pythonis
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI eksperimendid, sh MCP võimekused, integraatorid Azure OpenAI ja AI Foundry-ga

Need hoidlad pakuvad mitmesuguseid rakendusi, malle ja ressursse, et töötada Model Context Protocoliga eri programmeerimiskeeltes ja Azure teenustes. Need hõlmavad mitmesuguseid kasutusjuhtumeid alates lihtsatest serverirakendustest kuni autentimise, pilverakenduste ja ettevõtte integreerimiseni.

#### MCP ressursside kataloog

[Ametlik Microsofti MCP hoidla MCP Resources kataloog](https://github.com/microsoft/mcp/tree/main/Resources) pakub kureeritud kogumit näidissisenditest, prompt-mallidest ja tööriistade määratluses Model Context Protocol serverite jaoks. See kataloog on loodud, et aidata arendajatel kiiresti MCP-ga alustada, pakkudes ümbertöödeldavaid ehituskive ja parimate tavade näiteid:

- **Prompt Mallid:** Valmis kasutamiseks prompt-mallid tavapäraste AI ülesannete ja stsenaariumide jaoks, mida saab kohandada oma MCP serveri rakendusteks.
- **Tööriistade definitsioonid:** Näidis tööriista skeemidest ja metaandmetest tööriistade integreerimise ja kutsumise standardiseerimiseks eri MCP serverites.
- **Ressursside näited:** Näiteks ressursi definitsioonid andmeallikate, API-de ja väliste teenustega ühendamiseks MCP raamistikus.
- **Viitenäited:** Praktilised näited, mis demonstreerivad, kuidas struktureerida ja organiseerida ressursse, promte ja tööriistu reaalses MCP projektis.

Need ressursid kiirendavad arendust, soodustavad standardimist ja aitavad tagada parimaid praktikaid MCP-põhiste lahenduste ehitamisel ja juurutamisel.

#### MCP ressursside kataloog

- [MCP ressursid (näidis promptid, tööriistad ja ressursimõisted)](https://github.com/microsoft/mcp/tree/main/Resources)

### Uurimisvõimalused

- Tõhusad promptide optimeerimise meetodid MCP raamistikus
- Turvamudelid multitenant MCP deploy’de jaoks
- Tulemuslikkuse võrdlus erinevate MCP rakenduste vahel
- Formaalsed valideerimismeetodid MCP serveritele

## Kokkuvõte

Model Context Protocol (MCP) kujundab kiiresti standardiseeritud, turvalise ja ühilduva tehisintellekti integratsiooni tulevikku eri tööstusharudes. Käesolevas õppetükis vaadatute juhtumiuuringute ja praktiliste projektide kaudu nägite, kuidas varased kasutajad — sealhulgas Microsoft ja Azure — kasutavad MCP-d reaalse maailma probleemide lahendamiseks, AI laialdasema kasutuse kiirendamiseks ning vastavuse, turvalisuse ja skaleeritavuse tagamiseks. MCP modulaarne lähenemine võimaldab organisatsioonidel ühendada suuri keelemudeleid, tööriistu ja ettevõtete andmeid ühtsesse ja auditeeritavasse raamistikku. MCP arenedes on oluline kogukonnaga kursis püsida, uurida avatud lähtekoodi ressursse ning rakendada parimaid praktikaid vastupidavate ja tulevikukindlate AI lahenduste loomiseks.

## Lisaressursid

- [MCP Foundry GitHub hoidla](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP mänguplats](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Azure AI agentide integreerimine MCP-ga (Microsoft Foundry blogi)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub hoidla (Microsoft)](https://github.com/microsoft/mcp)
- [MCP ressursside kataloog (näidis promptid, tööriistad ja ressursimõisted)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP kogukond ja dokumentatsioon](https://modelcontextprotocol.io/introduction)
- [MCP spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP dokumentatsioon](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - turvalisuse parimad tavad
- [Playwright MCP Server GitHub hoidla](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP autentimisserverid (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP funktsioonid (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP funktsioonid Pythonis (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP funktsioonid .NETis (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP funktsioonid TypeScriptis (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM funktsioonid Pythonis (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Microsofti AI ja automaatika lahendused](https://azure.microsoft.com/en-us/products/ai-services/)

## Harjutused

1. Analüüsi ühte juhtumiuuringut ja tee ettepanek alternatiivseks rakenduslahenduseks.
2. Vali üks projektiidee ja koostage põhjalik tehniline spetsifikatsioon.
3. Uuri mõnda tööstusharu, mida juhtumiuuringutes pole käsitletud, ja kirjelda, kuidas MCP võiks selle spetsiifilisi väljakutseid lahendada.
4. Uuri üht tuleviku suundumust ja loo kontseptsioon uue MCP laienduse jaoks selle toetamiseks.

## Mis edasi

Uuri edasi: [Microsoft MCP serverid](./microsoft-mcp-servers.md)

Jätka: [Moodul 8: Parimad tavad](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->