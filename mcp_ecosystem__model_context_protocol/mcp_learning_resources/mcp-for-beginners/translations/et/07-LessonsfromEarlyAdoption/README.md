# 🌟 Õppetunnid varajastelt kasutajatelt

[![Lessons from MCP Early Adopters](../../../translated_images/et/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Klõpsa ülaloleval pildil, et vaadata selle õppetunni videot)_

## 🎯 Mida see moodul käsitleb

See moodul uurib, kuidas tõelised organisatsioonid ja arendajad kasutavad Model Context Protocol’it (MCP) reaalsemate probleemide lahendamiseks ja innovatsiooni edendamiseks. Detailsete juhtumiuuringute, praktiliste projektide ja näidete kaudu avastad, kuidas MCP võimaldab turvalist, skaleeritavat AI integreerimist, mis ühendab keelemudelid, tööriistad ja ettevõtte andmed.

### 📚 Vaata MCP’d praktikas

Tahad näha, kuidas neid põhimõtteid rakendatakse tootmiseks valmis tööriistades? Vaata meie [**10 Microsoft MCP serverit, mis muudavad arendaja produktiivsust**](microsoft-mcp-servers.md), mis tutvustab tegelikke Microsofti MCP servereid, mida saad täna kasutada.

## Ülevaade

See õppetund uurib, kuidas varajased kasutajad on kasutanud Model Context Protocol’it (MCP) reaalse maailma väljakutsete lahendamiseks ja innovatsiooni edendamiseks eri tööstusharudes. Läbi detailsete juhtumiuuringute ja praktiliste projektide näed, kuidas MCP võimaldab standardiseeritud, turvalist ja skaleeritavat AI integreerimist—ühendades suuri keelemudeleid, tööriistu ja ettevõtte andmeid ühtses raamistikus. Saad praktilise kogemuse MCP-põhiste lahenduste kavandamisel ja ehitamisel, õpid tõestatud rakendusmustreid ning avastad parimaid praktikaid MCP kasutuselevõtuks tootmiskeskkondades. Õppetund tõstab esile ka tekkivaid trende, tuleviku suundi ja avatud lähtekoodiga ressursse, mis aitavad sul MCP tehnoloogia ja selle areneva ökosüsteemi esirinnas püsida.

## Õpieesmärgid

- Analüüsida MCP tegelikke rakendusi eri tööstusharudes  
- Kavandada ja ehitada täielikke MCP-põhiseid rakendusi  
- Uurida tekkivaid trende ja tuleviku suundi MCP tehnoloogias  
- Rakendada parimaid praktikaid tegelikes arenduskeskkondades  

## MCP tegelikud rakendused

### Juhtumiuuring 1: Ettevõtte klienditoe automatiseerimine

Rahvusvaheline korporatsioon rakendas MCP-põhise lahenduse, et standardiseerida AI suhtlust oma klienditoesüsteemides. See võimaldas neil:

- Luua ühtne liides mitme LLM-teenusepakkuja jaoks  
- Säilitada ühtlast promptide haldust osakondade vahel  
- Rakendada tugevaid turva- ja vastavuskontrolle  
- Lihtsalt vahetada erinevate AI mudelite vahel vastavalt konkreetsetele vajadustele  

**Tehniline rakendus:**

```python
# Python MCP serveri rakendus klienditoeks
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
    
    # Teadmusbaasi ressursside registreerimine
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Käsusammude mallide registreerimine
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Tugivahendite registreerimine
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Serveri käivitamine HTTP transporti abil
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Tulemused:** mudelikulude vähenemine 30%, vastuste järjekindluse paranemine 45% ja suurenenud vastavus ülemaailmse tegevuse ulatuses.

### Juhtumiuuring 2: Tervishoiu diagnostikaabiline

Tervishoiuteenuse pakkuja arendas MCP infrastruktuuri, et integreerida mitmeid spetsialiseeritud meditsiinilisi AI-mudeleid, tagades samal ajal tundlike patsiendiandmete kaitse:  

- Sujuv vahetamine üldist ja spetsialistide meditsiinimudelide vahel  
- Range privaatsuse kontroll ja auditeerimise jälg  
- Integreerimine olemasolevate elektrooniliste terviseandmete süsteemidega (EHR)  
- Järjekindel promptide kavandamine meditsiiniterminoloogia jaoks  

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
  
**Tulemused:** paranenud diagnostikaettepanekud arstidele, täielik HIPAA vastavus ning märkimisväärne kontekstivahetuste vähendamine süsteemide vahel.

### Juhtumiuuring 3: Finantsteenuste riskianalüüs

Finantsasutus rakendas MCP, et standardiseerida riskianalüüsi protsesse eri osakondades:  

- Loodi ühtne liides krediidiriski, pettuse tuvastamise ja investeerimisriski mudelitele  
- Rakendati rangeid juurdepääsukontrolle ja mudeli versioonimist  
- Tagati kõikide AI soovituste auditeeritavus  
- Säilitatud ühtlane andmevorming eri süsteemide vahel  

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
  
**Tulemused:** paranenud regulatiivne vastavus, 40% kiirem mudelite juurutamise tsükkel ning riskihindamise järjekindluse paranemine osakondade vahel.

### Juhtumiuuring 4: Microsoft Playwright MCP server brauseri automatiseerimiseks

Microsoft arendas [Playwright MCP serveri](https://github.com/microsoft/playwright-mcp) turvalise ja standardiseeritud brauseri automatiseerimise võimaldamiseks Model Context Protocol’i kaudu. See tootmiseks valmis server lubab AI agentidel ja LLMidel suhelda veebi brauseritega kontrollitud, auditeeritaval ja laiendataval viisil — võimaldades kasutusjuhtumeid nagu automatiseeritud veebitestimine, andmeekstraktsioon ja lõpp-lõpuni töövood.

> **🎯 Tootmiseks valmis tööriist**  
>  
> See juhtumiuuring tutvustab tõelist MCP serverit, mida saad täna kasutada! Saad rohkem teada Playwright MCP Serveri ja veel 9 muu tootmiseks valmis Microsofti MCP serveri kohta meie [**Microsoft MCP Serverite juhendis**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Põhijooned:**
- Avaldab brauseri automatiseerimise funktsionaalsused (navigeerimine, vormide täitmine, ekraanipiltide tegemine jne) MCP tööriistadena  
- Rakendab rangeid juurdepääsu- ja liivaruutu kontolle volitamata tegevuste vältimiseks  
- Pakub üksikasjalikke auditeerimispäevikuid kõigi brauseri interaktsioonide jaoks  
- Toetab integreerimist Azure OpenAI ja teiste LLM pakkujatega agendi juhitud automatiseerimiseks  
- Toidab GitHub Copiloti kodeerimisagentuuri veebisirvimisvõimeid  

**Tehniline rakendus:**

```typescript
// TypeScript: Playwrighti brauseri automatiseerimistööriistade registreerimine MCP serveris
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

- Võimaldas turvalise, programmeeritava brauseri automatiseerimise AI agentidele ja LLMidele  
- Vähendas käsitsi testimise koormust ning parandas veebirakenduste katvust  
- Pakkus taaskasutatavat ja laiendatavat raamistiku brauseripõhiseks tööriistade integreerimiseks ettevõtte keskkondades  
- Toidab GitHub Copiloti veebisirvimisvõimeid  

**Viited:**

- [Playwright MCP Serveri GitHubi hoidla](https://github.com/microsoft/playwright-mcp)  
- [Microsofti AI ja automatiseerimise lahendused](https://azure.microsoft.com/en-us/products/ai-services/)

### Juhtumiuuring 5: Azure MCP – Ettevõtte klassi Model Context Protocol pilveteenusena

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) on Microsofti hallatav, ettevõtte tasemel Model Context Protocol’i rakendus, mis pakub MCP serveri võimeid kui pilveteenust, mis on skaleeritav, turvaline ja vastavusnõuetele vastav. Azure MCP võimaldab organisatsioonidel kiiresti juurutada, hallata ja integreerida MCP servereid Azure AI, andmete ja turvateenustega, vähendades operatiivset koormust ja kiirendades AI kasutuselevõttu.

> **🎯 Tootmiseks valmis tööriist**  
>  
> See on tõeline MCP server, mida saad täna kasutada! Saad rohkem teada Azure AI Foundry MCP serveri kohta meie [**Microsoft MCP Serverite juhendis**](microsoft-mcp-servers.md).

- Täisautomaatne MCP serveri majutus koos sisseehitatud skaleerimise, jälgimise ja turvafunktsioonidega  
- Loomulik integratsioon Azure OpenAI, Azure AI Otsingu ja teiste Azure teenustega  
- Ettevõtte autentimine ja autoriseerimine Microsoft Entra ID kaudu  
- Tugi kohandatud tööriistadele, prompti mallidele ja ressursi kontrolleritele  
- Vastavus ettevõtte turbe- ja regulatiivsetele nõuetele  

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
- Vähendas ajakulu ettevõtte AI projektide väärtuse realiseerimiseks, pakkudes valmisolekul olevaid ja vastavusseviidud MCP serveri platvorme  
- Lihtsustas LLMide, tööriistade ja ettevõtte andmeallikate integreerimist  
- Parandas MCP töökoormuste turvalisust, jälgitavust ja operatiivset tõhusust  
- Tõstis koodi kvaliteeti Azure SDK parimate tavade ja kaasaegsete autentimismustrite kaudu  

**Viited:**  
- [Azure MCP dokumentatsioon](https://aka.ms/azmcp)  
- [Azure MCP Serveri GitHubi hoidla](https://github.com/Azure/azure-mcp)  
- [Azure AI teenused](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Keskus](https://mcp.azure.com)

## Juhtumiuuring 6: NLWeb   
MCP (Model Context Protocol) on tekkiv protokoll, mis võimaldab vestlusrobotitel ja AI abilistel suhelda tööriistadega. Iga NLWeb eksemplar on ka MCP server, mis toetab üht põhimeetodit, ask, mis võimaldab esitada veebisaidile küsimusi loomulikus keeles. Tagastatud vastus kasutab schema.org’i, laialdaselt kasutatavat sõnavara veebandmete kirjeldamiseks. Üldiselt võib öelda, et MCP on NLWeb sama mis Http on HTML’ile. NLWeb ühendab protokollid, Schema.org formaadid ja näitekoodi, et aidata saitidel kiiresti luua selliseid lõpp-punkte, mis on kasulikud nii inimestele vestlusliideste kaudu kui ka masinatele loomuliku agendi-agendi suhtluse võimaldamiseks.

NLWebil on kaks erinevat komponenti.  
- Protokoll, mis on alguses väga lihtne, saidiga loomulikus keeles suhtlemiseks ja formaat, mis kasutab json’it ja schema.org’i tagastatud vastuse jaoks. Täpsemat dokumentatsiooni REST API kohta näed mahtus.  
- Lihtne (1) rakendus, mis kasutab olemasolevat märgendust saitidel, mida saab abstraktsemalt esitada kirjetena (tooted, retseptid, vaatamisväärsused, arvustused jne). Üheskoos kasutajaliidese vidinatega saavad saidid hõlpsasti pakkuda vestlusliideseid oma sisule. Täpsemalt vaata dokumentatsiooni vestluspäringu elutsükli kohta, kuidas see töötab.

**Viited:**  
- [Azure MCP dokumentatsioon](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Juhtumiuuring 7: Azure AI Foundry MCP Server – Ettevõtte AI agendi integratsioon

Azure AI Foundry MCP serverid demonstreerivad, kuidas MCP abil saab orkestreerida ja hallata AI agente ja töövooge ettevõtte keskkondades. Integreerides MCP Azure AI Foundryga saavad organisatsioonid standardiseerida agendi suhtluseid, kasutada Foundry töövoo haldust ja tagada turvalised, skaleeritavad juurutused.

> **🎯 Tootmiseks valmis tööriist**  
>  
> See on tõeline MCP server, mida saad täna kasutada! Saad rohkem teada Azure AI Foundry MCP serveri kohta meie [**Microsoft MCP Serverite juhendis**](microsoft-mcp-servers.md#9--azure-ai-foundry-mcp-server).

**Põhijooned:**  
- Ulatuslik ligipääs Azure AI ökosüsteemile, sealhulgas mudelikatlogid ja juurutushaldus  
- Teadmiste indekseerimine Azure AI Otsinguga RAG rakendustele  
- AI mudelite jõudluse ja kvaliteedi hindamise tööriistad  
- Integratsioon Azure AI Foundry Katallogide ja Laboritega tipptasemel uurimusmudelite jaoks  
- Agendi haldus ja hindamisvõimalused tootmiskeskkondades  

**Tulemused:**  
- Kiire prototüüpimine ja usaldusväärne AI agendi töövoogude jälgimine  
- Sujuv integratsioon Azure AI teenustega keerukate stsenaariumite jaoks  
- Ühtne liides agendi torujuhtmete loomiseks, juurutamiseks ja jälgimiseks  
- Paranenud turvalisus, vastavus ja operatiivne tõhusus ettevõtetes  
- AI kasutuselevõtu kiirendamine, säilitades samal ajal kontrolli keerukate agendi juhitud protsesside üle  

**Viited:**  
- [Azure AI Foundry MCP Server GitHubi hoidla](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Azure AI agentide integreerimine MCP-ga (Microsoft Foundry blogi)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Juhtumiuuring 8: Foundry MCP Playground – Eksperimentaalne testimine ja prototüüpimine

Foundry MCP Playground pakub valmis keskkonda, kus saab katsetada MCP servereid ja Azure AI Foundry integratsioone. Arendajad saavad kiiresti prototüüpida, testida ja hinnata AI mudeleid ning agendi töövooge, kasutades Azure AI Foundry Katallogi ja Laborite ressursse. Playground lihtsustab seadistust, pakub näidistööprojekte ja toetab koostööpõhist arendust, muutes uute stsenaariumite ja parimate tavade uurimise lihtsaks ilma keeruka infrastruktuurita. See on eriti kasulik meeskondadele, kes soovivad ideid valideerida, jagada katsetusi ja õpinguid kiirendada. Madaldades sisenemistõkkeid, aitab playground soodustada innovatsiooni ja kogukonna panust MCP-l ja Azure AI Foundryl.

**Viited:**

- [Foundry MCP Playground GitHubi hoidla](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Juhtumiuuring 9: Microsoft Learn Docs MCP Server – AI-põhine dokumentatsiooni juurdepääs

Microsoft Learn Docs MCP Server on pilves majutatud teenus, mis annab AI abilistele reaalajas ligipääsu ametlikele Microsofti dokumentidele Model Context Protocol’i kaudu. See tootmiseks valmis server ühendub laiaga Microsoft Learn ökosüsteemiga ja võimaldab semantilist otsingut kõigi ametlike Microsofti allikate vahel.

> **🎯 Tootmiseks valmis tööriist**  
>  
> See on tõeline MCP server, mida saad täna kasutada! Saad rohkem teada Microsoft Learn Docs MCP serveri kohta meie [**Microsoft MCP Serverite juhendis**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Põhijooned:**  
- Reaalaja ligipääs ametlikele Microsofti dokumentidele, Azure dokumentatsioonile ja Microsoft 365 materjalidele  
- Täiustatud semantilise otsingu võimalused, mis mõistavad konteksti ja kavatsust  
- Alati värske teave Microsoft Learn sisu avaldamisel  
- Ulatuslik katvus Microsoft Learn, Azure dokumentatsiooni ja Microsoft 365 allikate vahel  
- Tagastab kuni 10 kvaliteetset sisutükki koos artiklite pealkirjade ja URLidega  

**Miks see oluline on:**  
- Lahendab „aegunud AI teadmise“ probleemi Microsofti tehnoloogiate puhul  
- Tagab AI abilistele ligipääsu uusimatele .NET, C#, Azure ja Microsoft 365 funktsioonidele  
- Pakub autoriteetset, esmast teavet täpseks koodi genereerimiseks  
- Hädavajalik arendajatele, kes töötavad kiiresti arenevate Microsofti tehnoloogiatega  

**Tulemused:**  
- Märkimisväärselt paranenud AI genereeritud koodi täpsus Microsofti tehnoloogiate jaoks  
- Vähenenud otsingu aeg ajakohast dokumentatsiooni ja parimate praktiliste jaoks  
- Suurenenud arendaja produktiivsus kontekstitundliku dokumentatsiooni tagasitoomise kaudu  
- Sujuv integreerimine arendusprotsessidesse ilma IDEst lahkumata  

**Viited:**  
- [Microsoft Learn Docs MCP Serveri GitHubi hoidla](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn dokumentatsioon](https://learn.microsoft.com/)

## Praktilised projektid

### Projekt 1: Ehita mitme pakkujaga MCP server

**Eesmärk:** Loo MCP server, mis suudab päringuid suunata mitme AI mudelipakkuja vahel konkreetsete kriteeriumide alusel.

**Nõuded:**

- Toeta vähemalt kolme erinevat mudelipakkujat (nt OpenAI, Anthropic, kohalikud mudelid)  
- Rakenda päringumeetod, mis põhineb päringu metaandmetel  
- Loo konfiguratsioonisüsteem pakkujate volituste haldamiseks  
- Lisa vahemällu salvestuse tugi jõudluse ja kulude optimeerimiseks  
- Ehita lihtne armatuurlaud kasutamise jälgimiseks  

**Rakendusetapid:**

1. Pane püsti põhiline MCP serveri infrastruktuur  
2. Rakenda pakkujate adapterid iga AI mudelite teenuse jaoks  
3. Loo päringute suunamise loogika päringu omaduste põhjal  
4. Lisa vahemälu mehhanismid korduvate päringute jaoks  
5. Arenda jälgimisarmatuurlaud  
6. Testi erinevate päringumustritega  

**Tehnoloogiad:** Vali Pythonist (.NET/Java/Python vastavalt eelistusele), Redis vahemällu salvestuseks ja lihtne veebi raamistik armatuurlauale.

### Projekt 2: Ettevõtte promptide haldussüsteem
**Eesmärk:** Arendada MCP-põhine süsteem, mis haldab, versioonib ja juurutab küsimusmallide malle kogu organisatsioonis.

**Nõuded:**

- Luua tsentraliseeritud küsimusmallide hoidla
- Rakendada versioonihaldus ja kinnituse protsessid
- Ehita mallide testimise võimekus näidissisestustega
- Arendada rollipõhised juurdepääsukontrollid
- Luua API mallide pärimiseks ja juurutamiseks

**Teostusjärjekord:**

1. Kujundada andmebaasi skeem mallide salvestamiseks
2. Luua põhiosa API mallide CRUD-operatsioonide jaoks
3. Rakendada versioonihaldussüsteem
4. Ehita kinnituse töövoog
5. Arendada testimisraamistik
6. Luua lihtne veebiliides haldamiseks
7. Integreerida MCP serveriga

**Tehnoloogiad:** Valitud tagapõhja raamistik, SQL või NoSQL andmebaas ja esiplaaniraamistik haldusliidese jaoks.

### Projekt 3: MCP-põhine sisuloome platvorm

**Eesmärk:** Luua sisuloome platvorm, mis kasutab MCP-d, et pakkuda järjekindlaid tulemusi erinevate sisutüüpide vahel.

**Nõuded:**

- Tugi mitmele sisuvormingule (blogipostitused, sotsiaalmeedia, turunduskirjad)
- Mallipõhine genereerimine kohandamisvõimalustega
- Luua sisu ülevaatuse ja tagasiside süsteem
- Jälgida sisu tulemuslikkuse mõõdikuid
- Toetada sisu versioonihaldust ja iteratsiooni

**Teostusjärjekord:**

1. Seadistada MCP kliendi taristu
2. Luua mallid eri sisutüüpide jaoks
3. Ehitada sisuloome torujuhe
4. Rakendada ülevaatussüsteem
5. Arendada mõõdikute jälgimissüsteem
6. Luua kasutajaliides mallide halduseks ja sisuloomeks

**Tehnoloogiad:** Eelistatud programmeerimiskeel, veebiraamistik ja andmebaasisüsteem.

## Tuleviku suunad MCP tehnoloogias

### Tekkivad trendid

1. **Mitmeplaaniline MCP**
   - MCP laiendamine pildi-, heli- ja video mudelite standardiseeritud suhtluseks
   - Mitmeplaanilise mõtlemise võimekuste arendamine
   - Standardiseeritud küsimusmallide vormingud erinevatele modaliteetidele

2. **Federeeritud MCP taristu**
   - Hajutatud MCP võrgustikud, mis saavad organisatsioonide vahel ressursse jagada
   - Standardiseeritud protokollid turvaliseks mudelite jagamiseks
   - Privaatsust säilitavad arvutusmeetodid

3. **MCP turud**
   - Ökosüsteemid MCP mallide ja lisandmoodulite jagamiseks ja rahastamiseks
   - Kvaliteedi tagamise ja sertifitseerimise protsessid
   - Integratsioon mudeliturgudega

4. **MCP servarvutuses**
   - MCP standardite kohandamine ressursipiirangutega servaseadmetele
   - Madala ribalaiusega keskkondadele optimeeritud protokollid
   - Spetsialiseeritud MCP lahendused IoT ökosüsteemidele

5. **Regulatiivsed raamistikud**
   - MCP laienduste loomine regulatiivse nõuetele vastavuse jaoks
   - Standardiseeritud auditeeritavus ja selgitavuse liidesed
   - Integratsioon tekkivate tehisintellekti juhtimise raamistikudega

### Microsofti MCP lahendused

Microsoft ja Azure on loonud mitu avatud lähtekoodiga hoidlat, mis aitavad arendajatel MCP-t erinevates stsenaariumites rakendada:

#### Microsofti organisatsioon

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Playwright MCP server brauseri automatiseerimiseks ja testimiseks
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - OneDrive MCP serveri rakendus kohalikuks testimiseks ja kogukonna panustamiseks
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb on avatud protokollide ja seotud avatud lähtekoodiga tööriistade kogumik. Peamine fookus on AI veebile põhipõhja loomine

#### Azure-Samples organisatsioon

1. [mcp](https://github.com/Azure-Samples/mcp) - Näidised, tööriistad ja ressursid MCP serverite ehitamiseks ja integreerimiseks Azure’is mitmes keeles
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Näidis MCP serverid, mis demonstreerivad autentimist vastavalt Model Context Protocoli spetsifikatsioonile
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Avaleht nende jaoks, kes kasutavad Azure Functionsi kaug-MCP serverite rakendusteks, koos keelespetsiifiliste linkidega
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Kiiralgusmall kohandatud kaug-MCP serverite loomiseks ja juurutamiseks Azure Functionsi ja Pythoniga
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Kiiralgusmall kohandatud kaug-MCP serverite loomiseks ja juurutamiseks Azure Functionsi ja .NET/C# abil
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Kiiralgusmall kohandatud kaug-MCP serverite loomiseks ja juurutamiseks Azure Functionsi ja TypeScriptiga
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API haldus kui tehisintellekti värav kaug-MCP serveritele Pythoniga
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI katsed, sealhulgas MCP võimekused, integreerides Azure OpenAI ja AI Foundry’ga

Need hoidlad pakuvad erinevaid rakendusi, malle ja ressursse Model Context Protocoliga töötamiseks eri programmeerimiskeeltes ja Azure teenustes. Need katavad kasutusjuhtumeid alates lihtsatest serverirakendustest kuni autentimise, pilve juurutamise ja ettevõttesiseste integratsioonideni.

#### MCP ressursside kataloog

[Ametlikus Microsofti MCP hoidlas asuv MCP Resources kataloog](https://github.com/microsoft/mcp/tree/main/Resources) sisaldab kureeritud valikut näidisressursse, küsimusmallide malle ja tööriistade definitsioone, mida saab kasutada Model Context Protocoli serveritega. See kataloog aitab arendajatel MCP-ga kiiresti alustada, pakkudes taaskasutatavaid ehitusplokke ja parimaid näiteid:

- **Küsimusmallid:** Valmis kasutada küsimusmallid tavaliste AI ülesannete ja stsenaariumide jaoks, mida saab kohandada oma MCP serverite rakendamiseks.
- **Tööriistade definitsioonid:** Näidisskeemid ja metaandmed tööriistade integreerimise ja kutsumise standardiseerimiseks MCP serverite vahel.
- **Ressursinäidised:** Näidised, kuidas MCP raamistikus ühendada andmeallikaid, API-sid ja väliseid teenuseid.
- **Viitenäidised:** Praktilised näited, kuidas struktureerida ja korraldada ressursse, küsimusi ja tööriistu reaalse MCP projekti raames.

Need ressursid kiirendavad arendust, soodustavad standardiseerimist ja aitavad järgida parimaid tavasid MCP-põhiste lahenduste ehitamisel ja juurutamisel.

#### MCP ressursside kataloog

- [MCP Resources (näidis küsimusmallid, tööriistad ja ressursi definitsioonid)](https://github.com/microsoft/mcp/tree/main/Resources)

### Uurimisvõimalused

- Tõhusad küsimuste optimeerimise tehnikad MCP raamistikus
- Turvamudelid mitmeklientide MCP juurutustes
- Jõudluse võrdlus erinevate MCP rakenduste vahel
- Formaalne verifitseerimine MCP serveritele

## Kokkuvõte

Model Context Protocol (MCP) kujundab kiiresti tulevikku, pakkudes standardiseeritud, turvalist ja omavahel toimivat AI integratsiooni eri tööstusharudes. Selle õppetunni juhtumiuuringutest ja praktilistest projektidest nägid, kuidas esimesed kasutajad, sealhulgas Microsoft ja Azure, kasutavad MCP-d reaalsete probleemide lahendamiseks, AI kasutuselevõtu kiirendamiseks ning vastavuse, turvalisuse ja mastaapsuse tagamiseks. MCP modulaarne lähenemine lubab organisatsioonidel ühendada suured keelemudelid, tööriistad ja ettevõtte andmed ühtsesse, auditeeritavasse raamistikku. MCP jätkuva arengu juures on kogukonnaga kaasas käimine, avatud lähtekoodi ressursside uurimine ja parimate tavade rakendamine võtmetähtsusega tugevate, tulevikukindlate AI lahenduste loomisel.

## Lisamaterjalid

- [MCP Foundry GitHub hoidla](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Azure AI Agentide integreerimine MCP-ga (Microsoft Foundry blogi)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub hoidla (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources Directory (näidis küsimused, tööriistad ja ressursid)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP kogukond ja dokumentatsioon](https://modelcontextprotocol.io/introduction)
- [MCP spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP dokumentatsioon](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turvalisuse parimad praktikad
- [Playwright MCP serveri GitHub hoidla](https://github.com/microsoft/playwright-mcp)
- [Files MCP server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Microsoft AI ja automatiseerimise lahendused](https://azure.microsoft.com/en-us/products/ai-services/)

## Harjutused

1. Analüüsi üht juhtumiuuringut ja paku alternatiivne teostuslähenemine.
2. Vali üks projektidee ja koosta detailne tehniline spetsifikatsioon.
3. Uuri mõnda valdkonda, mida juhtumiuuringutes ei käsitleta, ning sõnasta, kuidas MCP võiks sealsetele probleemidele lahendusi pakkuda.
4. Uuri üht tulevikusuunda ja loo uus MCP laiendus, mis seda toetab.

## Järgmine samm

Uuri edasi: [Microsoft MCP serverid](./microsoft-mcp-servers.md)

Jätka: [Moodul 8: Parimad tavad](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutühendus**:
See dokument on tõlgitud tehisintellektil põhineva tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi püüame tagada täpsust, palun arvestage, et automaatsed tõlked võivad sisaldada vigu või ebatäpsusi. Algne dokument selle emakeeles tuleb lugeda autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tekkida võivate arusaamatuste ega valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->