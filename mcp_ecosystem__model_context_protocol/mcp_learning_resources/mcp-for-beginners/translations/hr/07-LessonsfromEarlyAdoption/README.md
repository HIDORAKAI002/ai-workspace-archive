# 🌟 Lekcije od Ranih Korisnika

[![Lessons from MCP Early Adopters](../../../translated_images/hr/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Kliknite na sliku gore za pregled videa ove lekcije)_

## 🎯 Što ovaj modul pokriva

Ovaj modul istražuje kako stvarne organizacije i developeri koriste Model Context Protocol (MCP) za rješavanje stvarnih izazova i poticanje inovacija. Kroz detaljne studije slučaja, praktične projekte i primjere, otkrit ćete kako MCP omogućuje sigurnu, skalabilnu AI integraciju koja povezuje jezične modele, alate i podatke poduzeća.

### 📚 Pogledajte MCP u akciji

Želite li vidjeti ove principe primijenjene na alate spremne za proizvodnju? Pogledajte naš [**10 Microsoft MCP servera koji transformiraju produktivnost developera**](microsoft-mcp-servers.md), koji prikazuje stvarne Microsoft MCP servere koje danas možete koristiti.

## Pregled

Ova lekcija istražuje kako su rani korisnici iskoristili Model Context Protocol (MCP) za rješavanje stvarnih problema i poticanje inovacija u različitim industrijama. Kroz detaljne studije slučaja i praktične projekte vidjet ćete kako MCP omogućuje standardiziranu, sigurnu i skalabilnu AI integraciju — povezujući velike jezične modele, alate i enterprise podatke u jedinstveni okvir. Steći ćete praktično iskustvo u dizajniranju i izgradnji rješenja temeljenih na MCP-u, naučiti iz provjerenih obrazaca implementacije te otkriti najbolje prakse za postavljanje MCP-a u proizvodnim okruženjima. Lekcija također ističe nove trendove, buduće smjerove i open-source resurse koji vam pomažu ostati na čelu MCP tehnologije i njezinog rastućeg ekosustava.

## Ciljevi učenja

- Analizirati stvarne implementacije MCP-a u različitim industrijama
- Dizajnirati i izgraditi kompletne aplikacije temeljene na MCP-u
- Istražiti nove trendove i buduće smjerove u MCP tehnologiji
- Primijeniti najbolje prakse u stvarnim razvojim scenarijima

## Stvarne implementacije MCP-a

### Studija slučaja 1: Automatizacija korisničke podrške u poduzećima

Multinacionalna korporacija implementirala je rješenje temeljeno na MCP-u kako bi standardizirala AI interakcije unutar svojih sustava korisničke podrške. To im je omogućilo:

- Kreiranje jedinstvenog sučelja za više LLM pružatelja usluga
- Održavanje dosljednog upravljanja promptovima u odjelima
- Implementaciju snažnih sigurnosnih i usklađenosnih kontrola
- Jednostavnu promjenu između različitih AI modela prema specifičnim potrebama

**Tehnička implementacija:**

```python
# Implementacija Python MCP servera za korisničku podršku
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Konfiguriraj zapisivanje događaja
logging.basicConfig(level=logging.INFO)

async def main():
    # Kreiraj konfiguraciju servera
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Inicijaliziraj MCP server
    server = create_server(config)
    
    # Registriraj izvore baze znanja
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Registriraj predloške upita
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Registriraj alate za podršku
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Pokreni server s HTTP prijenosom
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Rezultati:** 30% smanjenje troškova modela, 45% poboljšanje dosljednosti odgovora i poboljšana usklađenost širom globalnih operacija.

### Studija slučaja 2: Zdravstveni dijagnostički asistent

Pružatelj zdravstvenih usluga razvio je MCP infrastrukturu za integraciju više specijaliziranih medicinskih AI modela pritom osiguravajući zaštitu osjetljivih podataka pacijenata:

- Neprimjetna izmjena između općih i specijaliziranih medicinskih modela
- Stroge kontrole privatnosti i audit tragovi
- Integracija sa postojećim sustavima Elektroničkih zdravstvenih kartona (EHR)
- Dosljedno upravljanje promptovima za medicinsku terminologiju

**Tehnička implementacija:**

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
  
**Rezultati:** Poboljšane dijagnostičke sugestije za liječnike uz održavanje potpune HIPAA sukladnosti i značajno smanjenje mijenjanja konteksta između sustava.

### Studija slučaja 3: Analiza rizika u financijskim uslugama

Financijska institucija implementirala je MCP za standardizaciju procesa analize rizika u različitim odjelima:

- Kreirano jedinstveno sučelje za modele kreditnog rizika, detekcije prijevara i investicijskog rizika
- Implementirane stroge kontrole pristupa i verzioniranje modela
- Osigurana auditabilnost svih AI preporuka
- Održavala se dosljedna formacija podataka u različitim sustavima

**Tehnička implementacija:**

```java
// Java MCP poslužitelj za procjenu financijskog rizika
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Kreirajte MCP poslužitelj s značajkama financijskog usklađivanja
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
  
**Rezultati:** Poboljšana regulatorna usklađenost, 40% brži ciklusi implementacije modela i poboljšana dosljednost procjene rizika između odjela.

### Studija slučaja 4: Microsoft Playwright MCP Server za automatizaciju preglednika

Microsoft je razvio [Playwright MCP server](https://github.com/microsoft/playwright-mcp) koji omogućuje sigurnu, standardiziranu automatizaciju preglednika putem Model Context Protocola. Ovaj server spreman za proizvodnju omogućuje AI agentima i LLM-ovima interakciju s web preglednicima na kontroliran, auditan i proširiv način — omogućujući slučajeve korištenja kao što su automatizirano web testiranje, ekstrakcija podataka i end-to-end radni tokovi.

> **🎯 Alat spreman za proizvodnju**  
>  
> Ova studija slučaja prikazuje stvarni MCP server koji danas možete koristiti! Saznajte više o Playwright MCP Serveru i 9 drugih proizvodno spremnih Microsoft MCP servera u našem [**Microsoft MCP Servers vodiču**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Ključne značajke:**
- Izlaže mogućnosti automatizacije preglednika (navigacija, popunjavanje obrazaca, snimanje zaslona itd.) kao MCP alate
- Implementira stroge kontrole pristupa i sandboxing kako bi spriječio neautorizirane akcije
- Omogućuje detaljne audit zapise za sve interakcije preglednika
- Podržava integraciju s Azure OpenAI i drugim LLM pružateljima za agentnu automatizaciju
- Pokreće GitHub Copilot Coding Agenta sa sposobnostima web pregledavanja

**Tehnička implementacija:**

```typescript
// TypeScript: Registracija Playwright alata za automatizaciju preglednika na MCP poslužitelju
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Registrirajte alat za navigaciju do URL-a i snimanje zaslona
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

// Pokrenite MCP poslužitelj
server.listen(8080);
```
  
**Rezultati:**

- Omogućena sigurna, programska automatizacija preglednika za AI agente i LLM-ove  
- Smanjen ručni napor testiranja i poboljšani testni obuhvati web aplikacija  
- Pružena višekratno upotrebljiva, proširiva infrastruktura za integraciju alata temeljenu na pregledniku u poslovnim okruženjima  
- Pokreće mogućnosti web pregledavanja GitHub Copilota

**Reference:**

- [Playwright MCP Server GitHub repozitorij](https://github.com/microsoft/playwright-mcp)  
- [Microsoft AI i rješenja za automatizaciju](https://azure.microsoft.com/en-us/products/ai-services/)

### Studija slučaja 5: Azure MCP – Enterprise razina Model Context Protocola kao usluge

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) je Microsoftova upravljana, enterprise razina implementacije Model Context Protocola, dizajnirana za pružanje skalabilnih, sigurnih i usklađenih MCP server mogućnosti kao cloud usluge. Azure MCP omogućuje organizacijama brzu implementaciju, upravljanje i integraciju MCP servera s Azure AI, podatkovnim i sigurnosnim uslugama, smanjujući operativni trošak i ubrzavajući usvajanje AI-a.

> **🎯 Alat spreman za proizvodnju**  
>  
> Ovo je stvarni MCP server koji danas možete koristiti! Saznajte više o Microsoft Foundry MCP Serveru u našem [**Microsoft MCP Servers vodiču**](microsoft-mcp-servers.md).

- Potpuno upravljano MCP server hostanje s ugrađenim skaliranjem, nadzorom i sigurnošću  
- Nativna integracija sa Azure OpenAI, Azure AI Search i ostalim Azure uslugama  
- Enterprise autentifikacija i autorizacija putem Microsoft Entra ID  
- Podrška za prilagođene alate, predloške promptova i konektore resursa  
- Usklađenost s enterprise sigurnosnim i regulatornim zahtjevima

**Tehnička implementacija:**

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
  
**Rezultati:**  
- Smanjeno vrijeme do vrijednosti za AI projekte u poduzećima pružanjem spremne, usklađene MCP server platforme  
- Pojednostavljena integracija LLM-ova, alata i izvora podataka poduzeća  
- Poboljšana sigurnost, promatranje i operativna učinkovitost za MCP radne opterećenja  
- Poboljšana kvaliteta koda uz najbolje prakse Azure SDK-a i aktualne obrasce autentifikacije

**Reference:**  
- [Azure MCP Dokumentacija](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub repozitorij](https://github.com/Azure/azure-mcp)  
- [Azure AI usluge](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Centar](https://mcp.azure.com)

## Studija slučaja 6: NLWeb  
MCP (Model Context Protocol) je novi protokol za Chatbotove i AI asistente koji omogućuje interakciju s alatima. Svaka NLWeb instanca također je MCP server koji podržava jednu osnovnu metodu, ask, koja se koristi za postavljanje pitanja web stranici na prirodnom jeziku. Vraćeni odgovor koristi schema.org, široko korišteni vokabular za opis web podataka. Moguće je reći da je MCP za NLWeb ono što je Http za HTML. NLWeb kombinira protokole, Schema.org formate i primjerni kod kako bi pomogao web stranicama brzo kreirati ove endpointove, koristeći ih i za korisnike putem razgovornih sučelja i za strojeve kroz prirodnu agent-agent interakciju.

NLWeb se sastoji od dva odvojena komponenta.  
- Protokol, vrlo jednostavan za početak, za interakciju s web stranicom na prirodnom jeziku i format, koristeći json i schema.org za vraćeni odgovor. Više detalja u dokumentaciji o REST API-ju.  
- Jednostavna implementacija (1) koja koristi postojeću označenu strukturu, za stranice koje se mogu apstrahirati kao liste stavki (proizvodi, recepti, atrakcije, recenzije itd.). Zajedno sa skupom widgeta korisničkog sučelja, stranice mogu lako pružiti razgovorna sučelja svojim sadržajima. Više informacija u dokumentaciji o Life of a chat query i načinu rada.

**Reference:**  
- [Azure MCP Dokumentacija](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Studija slučaja 7: Microsoft Foundry MCP Server – Integracija enterprise AI agenata

Microsoft Foundry MCP serveri pokazuju kako se MCP može koristiti za orkestraciju i upravljanje AI agentima i radnim tokovima u poslovnim okruženjima. Integracijom MCP-a s Microsoft Foundryjem, organizacije mogu standardizirati interakcije agenata, iskoristiti upravljanje radnim tokovima Foundryja i osigurati sigurnu, skalabilnu implementaciju.

> **🎯 Alat spreman za proizvodnju**  
>  
> Ovo je stvarni MCP server koji danas možete koristiti! Saznajte više o Microsoft Foundry MCP Serveru u našem [**Microsoft MCP Servers vodiču**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Ključne značajke:**
- Sveobuhvatan pristup Azure AI ekosustavu, uključujući kataloge modela i upravljanje implementacijom  
- Indeksiranje znanja uz Azure AI Search za RAG aplikacije  
- Alati za evaluaciju performansi AI modela i osiguranje kvalitete  
- Integracija s Microsoft Foundry Catalog i Labs za najnovije istraživačke modele  
- Upravljanje agentima i evaluacijske mogućnosti za proizvodna okruženja

**Rezultati:**
- Brzo prototipiranje i robusno praćenje radnih tokova AI agenata  
- Besprijekorna integracija s Azure AI uslugama za napredne scenarije  
- Jedinstveno sučelje za izgradnju, implementaciju i praćenje agentnih cjevovoda  
- Poboljšana sigurnost, usklađenost i operativna učinkovitost za poduzeća  
- Ubrzano usvajanje AI-a uz održavanje kontrole nad složenim procesima vođenim agentima

**Reference:**
- [Microsoft Foundry MCP Server GitHub repozitorij](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Integracija Azure AI agenata s MCP-om (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Studija slučaja 8: Foundry MCP Playground – Eksperimentiranje i prototipiranje

Foundry MCP Playground nudi spremno okruženje za eksperimentiranje s MCP serverima i Microsoft Foundry integracijama. Developeri mogu brzo prototipirati, testirati i evaluirati AI modele i radne tokove agenata koristeći resurse iz Microsoft Foundry Catalog i Labs. Playground pojednostavljuje postavljanje, pruža uzorke projekata i podržava zajednički razvoj, što omogućuje jednostavno istraživanje najboljih praksi i novih scenarija uz minimalan napor. Posebno je koristan timovima koji žele potvrditi ideje, dijeliti eksperimente i ubrzati učenje bez potrebe za složenom infrastrukturom. Smanjujući ulaznu barijeru, playground potiče inovacije i doprinos zajednice u MCP i Microsoft Foundry ekosustavu.

**Reference:**

- [Foundry MCP Playground GitHub repozitorij](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Studija slučaja 9: Microsoft Learn Docs MCP Server – AI-pokretani pristup dokumentaciji

Microsoft Learn Docs MCP Server je cloud-hosted usluga koja AI asistentima pruža pristup službenoj Microsoft dokumentaciji u stvarnom vremenu putem Model Context Protocola. Ovaj proizvodno spremni server povezan je s opsežnim Microsoft Learn ekosustavom i omogućuje semantičko pretraživanje svih službenih Microsoft izvora.

> **🎯 Alat spreman za proizvodnju**  
>  
> Ovo je stvarni MCP server koji danas možete koristiti! Saznajte više o Microsoft Learn Docs MCP Serveru u našem [**Microsoft MCP Servers vodiču**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Ključne značajke:**
- Pristup u stvarnom vremenu službenoj Microsoft dokumentaciji, Azure dokumentima i Microsoft 365 dokumentaciji  
- Napredne semantičke mogućnosti pretraživanja koje razumiju kontekst i namjeru  
- Uvijek ažurirane informacije jer se sadržaj Microsoft Learna stalno objavljuje  
- Opsežna pokrivenost kroz Microsoft Learn, Azure dokumentaciju i Microsoft 365 izvore  
- Vraća do 10 visokokvalitetnih sadržajnih dijelova s naslovima i URL-ovima članaka

**Zašto je ključno:**
- Rješava problem "zastarjelog AI znanja" za Microsoft tehnologije  
- Osigurava AI asistentima pristup najnovijim .NET, C#, Azure i Microsoft 365 funkcionalnostima  
- Pruža autoritativne, prvoklasne informacije za precizno generiranje koda  
- Neophodno za developere koji rade s brzo razvijajućim Microsoft tehnologijama

**Rezultati:**
- Drastično poboljšana preciznost AI-generiranog koda za Microsoft tehnologije  
- Smanjeno vrijeme traženja ažurirane dokumentacije i najboljih praksi  
- Povećana produktivnost developera uz dohvat dokumentacije prilagođene kontekstu  
- Besprijekorna integracija u razvojne tijekove rada bez napuštanja IDE-a

**Reference:**
- [Microsoft Learn Docs MCP Server GitHub repozitorij](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn Dokumentacija](https://learn.microsoft.com/)

## Praktični projekti

### Projekt 1: Izgradnja MCP servera s više pružatelja

**Cilj:** Kreirati MCP server koji može usmjeravati zahtjeve prema različitim pružateljima AI modela temeljem određenih kriterija.

**Zahtjevi:**

- Podrška za najmanje tri različita pružatelja modela (npr. OpenAI, Anthropic, lokalni modeli)  
- Implementacija mehanizma usmjeravanja temeljenog na metapodacima zahtjeva  
- Kreiranje sustava za konfiguraciju za upravljanje vjerodajnicama pružatelja  
- Dodavanje keširanja za optimizaciju performansi i troškova  
- Izgradnja jednostavnog nadzornog panela za praćenje korištenja

**Koraci implementacije:**

1. Postavljanje osnovne MCP server infrastrukture  
2. Implementacija adaptera pružatelja za svaki AI model servis  
3. Kreiranje logike usmjeravanja prema atributima zahtjeva  
4. Dodavanje keš mehanizama za češće zahtjeve  
5. Razvoj nadzornog panela za praćenje  
6. Testiranje s različitim obrascima zahtjeva

**Tehnologije:** Odaberite među Python (.NET/Java/Python prema vašim preferencijama), Redis za keširanje i jednostavnim web frameworkom za nadzorni panel.

### Projekt 2: Enterprise sustav upravljanja promptovima

**Cilj:** Razviti sustav temeljen na MCP-u za upravljanje, verzioniranje i implementaciju predložaka promptova unutar organizacije.

**Zahtjevi:**
- Kreirajte središnje spremište za predloške upita
- Implementirajte verzioniranje i tijekove odobrenja
- Izgradite mogućnosti testiranja predložaka s uzorčnim unosima
- Razvijte kontrole pristupa temeljene na ulogama
- Kreirajte API za dohvat i implementaciju predložaka

**Koraci implementacije:**

1. Dizajnirajte šemu baze podataka za pohranu predložaka
2. Kreirajte osnovni API za CRUD operacije predložaka
3. Implementirajte sustav verzioniranja
4. Izgradite tijek odobrenja
5. Razvijte okruženje za testiranje
6. Kreirajte jednostavno web sučelje za upravljanje
7. Integrirajte s MCP serverom

**Tehnologije:** Vaš izbor backend okvira, SQL ili NoSQL baza podataka te frontend okvir za upravljačko sučelje.

### Projekt 3: Platforma za generiranje sadržaja temeljena na MCP-u

**Cilj:** Izgraditi platformu za generiranje sadržaja koja koristi MCP za dosljedne rezultate u različitim vrstama sadržaja.

**Zahtjevi:**

- Podrška za više formata sadržaja (blogovi, društvene mreže, marketinški tekstovi)
- Implementacija generiranja temeljena na predlošcima s mogućnostima prilagodbe
- Kreiranje sustava za pregled i povratne informacije o sadržaju
- Praćenje metrika izvedbe sadržaja
- Podrška verzioniranja i iteracije sadržaja

**Koraci implementacije:**

1. Postavite infrastrukturu MCP klijenta
2. Kreirajte predloške za različite vrste sadržaja
3. Izgradite cjevovod za generiranje sadržaja
4. Implementirajte sustav pregleda
5. Razvijte sustav praćenja metrika
6. Kreirajte korisničko sučelje za upravljanje predlošcima i generiranje sadržaja

**Tehnologije:** Vaš omiljeni programski jezik, web okvir i sustav baza podataka.

## Budući smjerovi tehnologije MCP-a

### Izlazeći trendovi

1. **Višemodalni MCP**
   - Proširenje MCP-a za standardizaciju interakcija s modelima slike, zvuka i videa
   - Razvoj mogućnosti rezoniranja preko modaliteta
   - Standardizirani formati upita za različite modalitete

2. **Federirana MCP infrastruktura**
   - Distribuirane MCP mreže koje dijele resurse između organizacija
   - Standardizirani protokoli za sigurnu razmjenu modela
   - Tehnike računarstva koje štite privatnost

3. **MCP tržnice**
   - Ekosustavi za dijeljenje i unovčavanje MCP predložaka i dodataka
   - Procesi osiguranja kvalitete i certificiranja
   - Integracija s tržištima modela

4. **MCP za Edge računarstvo**
   - Prilagodba MCP standarda za uređaje s ograničenim resursima
   - Optimizirani protokoli za mreže s malom propusnošću
   - Specijalizirane MCP implementacije za IoT ekosustave

5. **Regulatorni okviri**
   - Razvoj MCP proširenja za usklađenost s propisima
   - Standardizirani zapisi audita i sučelja za objašnjivost
   - Integracija s novim okvirima upravljanja AI-em

### MCP rješenja iz Microsofta

Microsoft i Azure razvili su nekoliko open-source spremišta kako bi pomogli developerima u implementaciji MCP-a u različitim scenarijima:

#### Microsoft Organizacija

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Playwright MCP server za automatizaciju i testiranje preglednika
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - Implementacija MCP servera za OneDrive za lokalno testiranje i doprinos zajednice
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb je skup otvorenih protokola i povezanih alata otvorenog koda. Glavni fokus je uspostava temeljnog sloja za AI web

#### Azure-Samples Organizacija

1. [mcp](https://github.com/Azure-Samples/mcp) - Linkovi na primjere, alate i resurse za izgradnju i integraciju MCP servera na Azureu pomoću različitih jezika
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Referentni MCP serveri koji demonstriraju autentifikaciju prema trenutnoj specifikaciji Model Context Protocol
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Ulazna stranica za implementacije Remote MCP servera u Azure Functions s linkovima na repozitorije za specifične jezike
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Quickstart predložak za izgradnju i deploy prilagođenih remote MCP servera koristeći Azure Functions i Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Quickstart predložak za izgradnju i deploy prilagođenih remote MCP servera koristeći Azure Functions s .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Quickstart predložak za izgradnju i deploy prilagođenih remote MCP servera koristeći Azure Functions i TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API Management kao AI Gateway prema Remote MCP serverima koristeći Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI eksperimenti uključujući MCP mogućnosti, integrirani s Azure OpenAI i AI Foundry

Ova spremišta pružaju različite implementacije, predloške i resurse za rad s Model Context Protocolom na različitim programskim jezicima i Azure servisima. Obuhvaćaju širok raspon scenarija od osnovnih implementacija servera do autentifikacije, implementacije u oblaku i scenarija za integraciju u poduzećima.

#### MCP direktorij resursa

[MCP Resources direktorij](https://github.com/microsoft/mcp/tree/main/Resources) u službenom Microsoft MCP repozitoriju pruža pažljivo odabranu kolekciju uzoraka resursa, predložaka upita i definicija alata za uporabu s Model Context Protocol serverima. Ovaj direktorij dizajniran je za brzi početak rada s MCP-om nudeći višekratno upotrebljive elemente i primjere dobrih praksi za:

- **Predloške upita:** Predlošci spremni za korištenje za uobičajene AI zadatke i scenarije koje možete prilagoditi za vlastite MCP implementacije.
- **Definicije alata:** Primjeri shema alata i metapodataka za standardizaciju integracije i poziva alata preko različitih MCP servera.
- **Primjere resursa:** Definicije resursa za povezivanje s podatkovnim izvorima, API-jima i vanjskim servisima unutar MCP okvira.
- **Referentne implementacije:** Praktični primjeri koji pokazuju kako strukturirati i organizirati resurse, upite i alate u stvarnim MCP projektima.

Ovi resursi ubrzavaju razvoj, promoviraju standardizaciju i pomažu u osiguravanju najboljih praksi pri izgradnji i implementaciji rješenja baziranih na MCP-u.

#### MCP direktorij resursa

- [MCP Resources (Uzorci upita, alati i definicije resursa)](https://github.com/microsoft/mcp/tree/main/Resources)

### Mogućnosti istraživanja

- Učinkovite tehnike optimizacije upita unutar MCP okvira
- Sigurnosni modeli za MCP implementacije s više korisnika
- Benchmarking performansi različitih MCP implementacija
- Formalne metode verifikacije MCP servera

## Zaključak

Model Context Protocol (MCP) brzo oblikuje budućnost standardizirane, sigurne i interoperabilne AI integracije u raznim industrijama. Kroz studije slučaja i praktične projekte u ovom lekciji, vidjeli ste kako rani usvojitelji—uključujući Microsoft i Azure—iskorištavaju MCP za rješavanje stvarnih izazova, ubrzavanje usvajanja AI-a te osiguranje usklađenosti, sigurnosti i skalabilnosti. Modularni pristup MCP-a omogućuje organizacijama povezivanje velikih jezičnih modela, alata i podataka poduzeća u jedinstveni i auditabilni okvir. Kako se MCP dalje razvija, aktivno sudjelovanje u zajednici, istraživanje open-source resursa i primjena najboljih praksi bit će ključni za izgradnju robusnih, spremnih za budućnost AI rješenja.

## Dodatni resursi

- [MCP Foundry GitHub Repozitorij](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Integracija Azure AI agenata s MCP-om (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub Repozitorij (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources direktorij (Uzorci upita, alati i definicije resursa)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP Zajednica & Dokumentacija](https://modelcontextprotocol.io/introduction)
- [MCP Specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP Dokumentacija](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Najbolje sigurnosne prakse
- [Playwright MCP Server GitHub Repozitorij](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Microsoft AI i automatizacijska rješenja](https://azure.microsoft.com/en-us/products/ai-services/)

## Vježbe

1. Analizirajte jednu od studija slučaja i predložite alternativni pristup implementaciji.
2. Odaberite jednu od ideja za projekte i izradite detaljnu tehničku specifikaciju.
3. Istražite industriju koja nije obrađena u studijama slučaja i opišite kako bi MCP mogao riješiti njene specifične izazove.
4. Istražite jedan od budućih smjerova i izradite koncept novog MCP proširenja za njegovu podršku.

## Što dalje

Istražite više: [Microsoft MCP serveri](./microsoft-mcp-servers.md)

Nastavite na: [Modul 8: Najbolje prakse](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->