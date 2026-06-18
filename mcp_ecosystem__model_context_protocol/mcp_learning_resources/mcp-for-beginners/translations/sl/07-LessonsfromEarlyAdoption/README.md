# 🌟 Lekcije zgodnjih uporabnikov

[![Lekcije zgodnjih uporabnikov MCP](../../../translated_images/sl/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Kliknite zgornjo sliko za ogled videa te lekcije)_

## 🎯 Kaj pokriva ta modul

Ta modul raziskuje, kako resnične organizacije in razvijalci uporabljajo Model Context Protocol (MCP) za reševanje dejanskih izzivov in spodbujanje inovacij. S pomočjo podrobnih študij primerov, praktičnih projektov in praktičnih primerov boste odkrili, kako MCP omogoča varno, razširljivo integracijo AI, ki povezuje jezikovne modele, orodja in podatke podjetij.

### 📚 Oglejte si MCP v akciji

Želite videti, kako so ti principi uporabljeni v orodjih, pripravljenih za produkcijo? Oglejte si naš [**10 Microsoft MCP strežnikov, ki spreminjajo produktivnost razvijalcev**](microsoft-mcp-servers.md), ki prikazuje resnične Microsoftove MCP strežnike, ki jih lahko danes uporabljate.

## Pregled

Ta lekcija raziskuje, kako so zgodnji uporabniki izkoristili Model Context Protocol (MCP) za reševanje resničnih izzivov in spodbujanje inovacij v različnih panogah. S podrobnimi študijami primerov in praktičnimi projekti boste videli, kako MCP omogoča standardizirano, varno in razširljivo integracijo AI – povezovanje velikih jezikovnih modelov, orodij in podatkov podjetij v enotno ogrodje. Pridobili boste praktične izkušnje z načrtovanjem in gradnjo rešitev na osnovi MCP, se naučili preverjenih vzorcev implementacije in odkrili najboljše prakse za uvajanje MCP v proizvodna okolja. Lekcija prav tako izpostavlja nastajajoče trende, prihodnje smernice in odprtokodne vire, ki vam pomagajo ostati na vrhu tehnologije MCP in njenega razvijajočega se ekosistema.

## Cilji učenja

- Analizirati resnične implementacije MCP v različnih panogah  
- Oblikovati in zgraditi popolne aplikacije na osnovi MCP  
- Raziščite nastajajoče trende in prihodnje smeri tehnologije MCP  
- Uporabiti najboljše prakse v dejanskih razvojnih scenarijih  

## Resnične implementacije MCP

### Študija primera 1: Avtomatizacija podpore strankam v podjetju

Multinacionalno podjetje je uvedlo rešitev na osnovi MCP za standardizacijo AI interakcij v njihovih sistemih podpore strankam. To jim je omogočilo:

- Ustvariti enotno vmesnik za več ponudnikov LLM  
- Ohranjati dosledno upravljanje pozivov med oddelki  
- Izvajati robustne varnostne in skladnostne kontrole  
- Enostavno preklapljati med različnimi AI modeli glede na specifične potrebe  

**Tehnična implementacija:**

```python
# Implementacija Python MCP strežnika za podporo strankam
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Nastavi beleženje
logging.basicConfig(level=logging.INFO)

async def main():
    # Ustvari konfiguracijo strežnika
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Inicializiraj MCP strežnik
    server = create_server(config)
    
    # Registriraj vire baze znanja
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Registriraj predloge pozivov
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Registriraj orodja za podporo
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Zaženi strežnik s HTTP prenosom
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Rezultati:** Zmanjšanje stroškov modelov za 30 %, izboljšanje konsistence odzivov za 45 % in izboljšana skladnost v globalnih operacijah.

### Študija primera 2: Diagnostični asistent v zdravstvu

Zdravstvena organizacija je razvila infrastrukturo MCP za integracijo več specializiranih medicinskih AI modelov, hkrati pa zagotovila zaščito občutljivih podatkov pacientov:

- Brezšivno prehajanje med splošnimi in specializiranimi medicinskimi modeli  
- Stroge kontrole zasebnosti in revizijske sledi  
- Integracija z obstoječimi sistemi elektronskih zdravstvenih kartonov (EHR)  
- Konsistentno inženirstvo pozivov za medicinsko terminologijo  

**Tehnična implementacija:**

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
  
**Rezultati:** Izboljšani diagnostični predlogi za zdravnike ob popolni skladnosti s HIPAA in pomembno zmanjšanje preklapljanja konteksta med sistemi.

### Študija primera 3: Analiza tveganj v finančnih storitvah

Finančna institucija je implementirala MCP za standardizacijo svojih procesov analize tveganj med različnimi oddelki:

- Ustvarjen enoten vmesnik za modele kreditnega tveganja, zaznavanja prevar in vlagateljskega tveganja  
- Uvedene stroge kontrole dostopa in različic modelov  
- Zagotovljena sledljivost vseh AI priporočil  
- Ohranjanje dosledne oblike podatkov med različnimi sistemi  

**Tehnična implementacija:**

```java
// Java MCP strežnik za ocenjevanje finančnega tveganja
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Ustvari MCP strežnik z značilnostmi finančne skladnosti
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
  
**Rezultati:** Izboljšana skladnost z regulativami, 40 % hitrejši cikli uvajanja modelov in izboljšana doslednost ocene tveganja med oddelki.

### Študija primera 4: Microsoft Playwright MCP strežnik za avtomatizacijo brskalnika

Microsoft je razvil [Playwright MCP strežnik](https://github.com/microsoft/playwright-mcp), ki omogoča varno, standardizirano avtomatizacijo brskalnika prek Model Context Protocol. Ta strežnik, pripravljen za produkcijo, omogoča AI agentom in LLM povezovanje z brskalniki na kontroliran, revidiran in razširljiv način – omogočajo primer uporabe, kot so avtomatizirano testiranje spletnih strani, ekstrakcija podatkov in končni delovni postopki.

> **🎯 Orodje pripravljeno za produkcijo**  
>  
> Ta študija primera prikazuje resnični MCP strežnik, ki ga lahko danes uporabljate! Več o Playwright MCP strežniku in drugih 9 Microsoft MCP strežnikih za produkcijo si preberite v našem [**Vodniku za Microsoft MCP strežnike**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Ključne lastnosti:**  
- Eksponira avtomatizacijo brskalnika (navigacija, izpolnjevanje obrazcev, zajem zaslonskih slik itd.) kot MCP orodja  
- Izvaja stroge kontrole dostopa in peskovnik (sandboxing) za preprečevanje nepooblaščenih dejanj  
- Ponuja podrobne revizijske dnevnike za vse interakcije z brskalnikom  
- Podpira integracijo z Azure OpenAI in drugimi ponudniki LLM za avtomatizacijo z agenti  
- Poganja GitHub Copilot Coding Agenta z zmogljivostmi brskanja po spletu  

**Tehnična implementacija:**

```typescript
// TypeScript: Registracija orodij za avtomatizacijo brskalnika Playwright na MCP strežniku
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Registrirajte orodje za navigacijo do URL-ja in zajem zaslonske slike
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

// Zaženite MCP strežnik
server.listen(8080);
```
  
**Rezultati:**

- Omogočena varna, programska avtomatizacija brskalnika za AI agente in LLM  
- Zmanjšani ročni napori pri testiranju ter izboljšano pokritje testov spletnih aplikacij  
- Ponuja ponovno uporabno, razširljivo ogrodje za integracijo orodij na osnovi brskalnika v korporativnih okoljih  
- Poganja brskalne zmogljivosti GitHub Copilot  

**Reference:**

- [GitHub repozitorij Playwright MCP strežnika](https://github.com/microsoft/playwright-mcp)  
- [Rešitve za AI in avtomatizacijo Microsoft Azure](https://azure.microsoft.com/en-us/products/ai-services/)

### Študija primera 5: Azure MCP – Podjetniški Model Context Protocol kot storitev

Azure MCP strežnik ([https://aka.ms/azmcp](https://aka.ms/azmcp)) je Microsoftova upravljana, podjetniška implementacija Model Context Protocol, zasnovana za zagotavljanje razširljivih, varnih in skladnih MCP strežniških zmogljivosti kot oblačne storitve. Azure MCP omogoča organizacijam hitro uvajanje, upravljanje in integracijo MCP strežnikov z Azure AI, podatki in varnostnimi storitvami, s čimer zmanjšuje operativno obremenitev in pospešuje sprejemanje AI.

> **🎯 Orodje pripravljeno za produkcijo**  
>  
> To je resnični MCP strežnik, ki ga lahko danes uporabljate! Več o Microsoft Foundry MCP strežniku si preberite v našem [**Vodniku za Microsoft MCP strežnike**](microsoft-mcp-servers.md).

- Popolnoma upravljano gostovanje MCP strežnikov z vgrajeno razširljivostjo, nadzorom in varnostjo  
- Nativna integracija z Azure OpenAI, Azure AI Search in drugimi Azure storitvami  
- Podjetniška avtentikacija in avtorizacija prek Microsoft Entra ID  
- Podpora za prilagojena orodja, predloge pozivov in povezovalnike virov  
- Sklenjenost z varnostnimi zahtevami podjetij in regulativnimi standardi  

**Tehnična implementacija:**

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
- Skrajšan čas do vrednosti za AI projekte v podjetjih z zagotavljanjem platforme MCP strežnika, pripravljene za uporabo in skladne  
- Poenostavljena integracija LLM, orodij in virov podatkov podjetij  
- Izboljšana varnost, opaznost in operativna učinkovitost delovnih obremenitev MCP  
- Izboljšana kakovost kode z najboljšimi praksami Azure SDK in sodobnimi vzorci avtentikacije  

**Reference:**  
- [Dokumentacija Azure MCP](https://aka.ms/azmcp)  
- [GitHub repozitorij Azure MCP strežnika](https://github.com/Azure/azure-mcp)  
- [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)

## Študija primera 6: NLWeb  
MCP (Model Context Protocol) je nastajajoč protokol za klepetalne bote in AI asistente za interakcijo z orodji. Vsak primer NLWeb je tudi MCP strežnik, ki podpira eno osnovno metodo, ask, ki se uporablja za zastavljanje vprašanj spletnim mestom v naravnem jeziku. Vrnjeni odgovor uporablja schema.org, široko uporabljeno slovarico za opis spletnih podatkov. Poenostavljeno rečeno, MCP je NLWeb kot Http za HTML. NLWeb združuje protokole, formate Schema.org in vzorčno kodo za hitro ustvarjanje teh končnih točk, kar koristi tako ljudem preko pogovornih vmesnikov kot strojem s naravno interakcijo agent-agent.

NLWeb sestavljata dve različni komponenti.  
- Protokol, zelo enostaven za začetek, za povezavo s spletnim mestom v naravnem jeziku, in format, ki uporablja json in schema.org za vrnjen odgovor. Več podrobnosti najdete v dokumentaciji REST API.  
- Enostavna implementacija (1), ki izkorišča obstoječo označbo, za spletna mesta, ki jih je mogoče predstaviti kot sezname elementov (izdelki, recepti, znamenitosti, ocene itd.). Skupaj z naborom uporabniških vmesnikov lahko mesta enostavno zagotovijo pogovorne vmesnike za svojo vsebino. Več o tem, kako to deluje, najdete v dokumentaciji Življenje poizvedbe klepeta.  

**Reference:**  
- [Dokumentacija Azure MCP](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Študija primera 7: Microsoft Foundry MCP strežnik – integracija AI agentov v podjetjih

Microsoft Foundry MCP strežniki prikazujejo, kako se MCP lahko uporablja za orkestracijo in upravljanje AI agentov ter potekov dela v podjetniških okoljih. Z integracijo MCP z Microsoft Foundry lahko organizacije standardizirajo interakcije agentov, izkoristijo upravljanje potekov dela Foundry in zagotovijo varno, razširljivo uvajanje.

> **🎯 Orodje pripravljeno za produkcijo**  
>  
> To je resnični MCP strežnik, ki ga lahko danes uporabljate! Več o Microsoft Foundry MCP strežniku si preberite v našem [**Vodniku za Microsoft MCP strežnike**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Ključne lastnosti:**  
- Celovit dostop do Azure AI ekosistema, vključno s katalozi modelov in upravljanjem uvajanja  
- Indeksiranje znanja z Azure AI Search za aplikacije RAG  
- Orodja za ocenjevanje zmogljivosti in zagotavljanje kakovosti AI modelov  
- Integracija z Microsoft Foundry Catalog in Labs za najnovejše raziskovalne modele  
- Upravljanje agentov in zmogljivosti ocenjevanja za produkcijske scenarije  

**Rezultati:**  
- Hiter prototip in robustno spremljanje potekov dela AI agentov  
- Brezšivna integracija z Azure AI storitvami za napredne scenarije  
- Enoten vmesnik za izdelavo, uvajanje in spremljanje potokov agentov  
- Izboljšana varnost, skladnost in operativna učinkovitost za podjetja  
- Pospešena implementacija AI ob ohranjanju nadzora nad kompleksnimi procesi, ki jih vodijo agenti  

**Reference:**  
- [GitHub repozitorij Microsoft Foundry MCP strežnika](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Integracija Azure AI Agentov z MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Študija primera 8: Foundry MCP Playground – Eksperimentiranje in prototipiranje

Foundry MCP Playground nudi okolje, pripravljeno za uporabo, za eksperimentiranje z MCP strežniki in integracijami Microsoft Foundry. Razvijalci lahko hitro izdelujejo prototipe, testirajo in ocenjujejo AI modele ter poteke dela agentov z viri iz Microsoft Foundry Catalog in Labs. Playground poenostavlja nastavitev, nudi vzorčne projekte in podpira sodelovalni razvoj, kar omogoča enostavno raziskovanje najboljših praks in novih scenarijev z minimalnimi stroški. Še posebej je koristen za ekipe, ki želijo potrditi ideje, deliti eksperimente in pospešiti učenje brez potrebe po kompleksni infrastrukturi. Z zniževanjem vstopne ovire playground spodbuja inovacije in prispevke skupnosti v ekosistemu MCP in Microsoft Foundry.

**Reference:**

- [GitHub repozitorij Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Študija primera 9: Microsoft Learn Docs MCP strežnik – Dostop do dokumentacije na osnovi AI

Microsoft Learn Docs MCP strežnik je oblačna storitev, ki AI asistentom omogoča dostop v realnem času do uradne Microsoftove dokumentacije prek Model Context Protocol. Ta strežnik, pripravljen za produkcijo, povezuje z obsežnim Microsoft Learn ekosistemom in omogoča semantično iskanje v vseh uradnih Microsoftovih virih.

> **🎯 Orodje pripravljeno za produkcijo**  
>  
> To je resnični MCP strežnik, ki ga lahko danes uporabljate! Več o Microsoft Learn Docs MCP strežniku si preberite v našem [**Vodniku za Microsoft MCP strežnike**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Ključne lastnosti:**  
- Dostop v realnem času do uradne Microsoft dokumentacije, dokumentacije Azure in Microsoft 365  
- Napredne zmogljivosti semantičnega iskanja, ki razumejo kontekst in namen  
- Vedno ažurne informacije, saj se vsebina Microsoft Learn sproti objavlja  
- Obsežno pokritje virov Microsoft Learn, Azure in Microsoft 365  
- Vrne do 10 kakovostnih vsebinskih segmentov z naslovi člankov in URL-ji  

**Zakaj je to kritično:**  
- Rešuje problem "zastarelega znanja AI" za Microsoftove tehnologije  
- Zagotavlja, da imajo AI asistenti dostop do najnovejših funkcij .NET, C#, Azure in Microsoft 365  
- Ponuja avtoritativne, prvotne informacije za natančno generiranje kode  
- Nepogrešljivo za razvijalce, ki delajo z hitro razvijajočimi se Microsoftovimi tehnologijami  

**Rezultati:**  
- Drastično izboljšana natančnost AI generirane kode za Microsoftove tehnologije  
- Zmanjšan čas iskanja aktualne dokumentacije in najboljših praks  
- Izboljšana produktivnost razvijalcev z dokumentacijo, prilagojeno kontekstu  
- Brezhibna integracija v razvojne poteke brez zapuščanja IDE  

**Reference:**  
- [GitHub repozitorij Microsoft Learn Docs MCP strežnika](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn dokumentacija](https://learn.microsoft.com/)

## Praktični projekti

### Projekt 1: Zgradite MCP strežnik z več ponudniki

**Cilj:** Ustvariti MCP strežnik, ki lahko usmerja zahteve do več ponudnikov AI modelov glede na določene kriterije.

**Zahteve:**

- Podpora vsaj trem različnim ponudnikom modelov (npr. OpenAI, Anthropic, lokalni modeli)  
- Implementacija mehanizma usmerjanja na podlagi metapodatkov zahtev  
- Ustvariti konfiguracijski sistem za upravljanje poverilnic ponudnikov  
- Dodati predpomnjenje za optimizacijo zmogljivosti in stroškov  
- Zgraditi preprost nadzorni plošči za spremljanje uporabe  

**Koraki implementacije:**

1. Postaviti osnovno infrastrukturo MCP strežnika  
2. Implementirati adapterje ponudnikov za vsak AI modelni servis  
3. Ustvariti logiko usmerjanja na podlagi atributov zahtev  
4. Dodati mehanizme predpomnjenja za pogoste zahteve  
5. Razviti nadzorno ploščo  
6. Testirati z različnimi vzorci zahtev  

**Tehnologije:** Izberite med Python (.NET/Java/Python glede na vaše preference), Redis za predpomnjenje in preprosto spletno ogrodje za nadzorno ploščo.

### Projekt 2: Podjetniški sistem upravljanja s pozivi

**Cilj:** Razviti sistem na osnovi MCP za upravljanje, verzioniranje in uvajanje predlog pozivov v organizaciji.

**Zahteve:**
- Ustvarite centralizirano skladišče za predloge pozivov
- Implementirajte različice in delovne procese odobritve
- Zgradite zmogljivosti testiranja predlog z vzorčnimi vnosi
- Razvijte dostopne kontrole na osnovi vlog
- Ustvarite API za pridobivanje in namestitev predlog

**Koraki implementacije:**

1. Oblikujte shemo baze podatkov za shranjevanje predlog
2. Ustvarite osnovni API za operacije CRUD s predlogami
3. Implementirajte sistem različic
4. Zgradite delovni proces odobritve
5. Razvijte testno ogrodje
6. Ustvarite preprosto spletno vmesnik za upravljanje
7. Integrirajte z MCP strežnikom

**Tehnologije:** Vaša izbira backend okvira, SQL ali NoSQL baze podatkov in frontend okvira za upravljalski vmesnik.

### Projekt 3: Platforma za generiranje vsebin na osnovi MCP

**Cilj:** Zgraditi platformo za generiranje vsebin, ki uporablja MCP za zagotavljanje doslednih rezultatov preko različnih vrst vsebin.

**Zahteve:**

- Podpora za več vsebinskih formatov (blog objave, družbena omrežja, marketinški besedili)
- Implementacija generiranja na osnovi predlog z možnostmi prilagajanja
- Ustvarjanje sistema pregleda vsebin in povratnih informacij
- Sledenje metričnim kazalcem učinkovitosti vsebin
- Podpora za različice in iteracije vsebine

**Koraki implementacije:**

1. Nastavite infrastrukturo MCP odjemalca
2. Ustvarite predloge za različne vrste vsebin
3. Zgradite cevovod za generiranje vsebin
4. Implementirajte sistem pregleda
5. Razvijte sistem za sledenje metrik
6. Ustvarite uporabniški vmesnik za upravljanje predlog in generiranje vsebin

**Tehnologije:** Vaš izbrani programski jezik, spletni okvir in sistem baze podatkov.

## Prihodnje smernice za MCP tehnologijo

### Nastajajoči trendi

1. **Večmodalni MCP**
   - Razširitev MCP za standardizacijo interakcij z modeli slik, zvoka in videa
   - Razvoj zmožnosti prek-modalnega sklepanja
   - Standardizirani formati pozivov za različne modalitete

2. **Federirana MCP infrastruktura**
   - Porazdeljene MCP mreže, ki lahko delijo vire med organizacijami
   - Standardizirani protokoli za varno deljenje modelov
   - Tehnike računalništva, ki varujejo zasebnost

3. **Tržnice MCP**
   - Ekosistemi za deljenje in monetizacijo MCP predlog in vtičnikov
   - Procesi zagotavljanja kakovosti in certificiranja
   - Integracije s tržnicami modelov

4. **MCP za obrobno računalništvo**
   - Prilagoditev MCP standardov za naprave z omejenimi viri na obrobju
   - Optimizirani protokoli za okolja z nizko pasovno širino
   - Specializirane MCP implementacije za IoT ekosisteme

5. **Regulatorni okviri**
   - Razvoj MCP razširitev za skladnost z regulacijami
   - Standardizirane revizijske sledi in vmesniki za razlaganje
   - Integracija z nastajajočimi okviri upravljanja AI

### Rešitve MCP iz Microsofta

Microsoft in Azure sta razvila več odprtokodnih skladišč za pomoč razvijalcem pri implementaciji MCP v različnih scenarijih:

#### Microsoft organizacija

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Playwright MCP strežnik za avtomatizacijo brskalnika in testiranje
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - Implementacija OneDrive MCP strežnika za lokalno testiranje in prispevke skupnosti
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb je zbirka odprtih protokolov in povezanih odprtokodnih orodij. Njegov glavni fokus je vzpostavitev osnovne plasti za AI splet

#### Azure-Samples organizacija

1. [mcp](https://github.com/Azure-Samples/mcp) - Povezave do vzorcev, orodij in virov za izgradnjo in integracijo MCP strežnikov na Azure s podporo več jezikov
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Referenčni MCP strežniki, ki prikazujejo overjanje s trenutno specifikacijo Model Context Protocol
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Začetna stran za implementacije oddaljenih MCP strežnikov v Azure Functions z jezikovno specifičnimi repozitoriji
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Hitri začetni obrazec za izdelavo in nameščanje prilagojenih oddaljenih MCP strežnikov z Azure Functions in Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Hitri začetni obrazec za izdelavo in nameščanje prilagojenih oddaljenih MCP strežnikov z Azure Functions in .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Hitri začetni obrazec za izdelavo in nameščanje prilagojenih oddaljenih MCP strežnikov z Azure Functions in TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API Management kot AI prehod do oddaljenih MCP strežnikov z uporabo Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI eksperimenti vključno z MCP zmogljivostmi, povezani z Azure OpenAI in AI Foundry

Ta skladišča ponujajo različne implementacije, predloge in vire za delo z Model Context Protocol v različnih programskih jezikih in storitvah Azure. Pokrivajo širok spekter primerov uporabe od osnovnih strežniških implementacij do overjanja, oblačne namestitve in scenarijev integracije v podjetjih.

#### MCP imenik virov

[Direktorij MCP Resources](https://github.com/microsoft/mcp/tree/main/Resources) v uradnem Microsoft MCP repozitoriju ponuja skrbno izbrano zbirko vzorčnih virov, predlog pozivov in definicij orodij za uporabo s strežniki Model Context Protocol. Ta imenik je zasnovan za pomoč razvijalcem, da hitro začnejo z MCP z uporabo ponovno uporabnih gradnikov in najboljših praks za:

- **Predloge pozivov:** Pripravljenih za uporabo predlog za pogoste AI naloge in scenarije, ki jih je mogoče prilagoditi za lastne MCP implementacije strežnikov.
- **Definicije orodij:** Primerne sheme in metapodatki orodij za standardizacijo integracije in poklica orodij skozi različne MCP strežnike.
- **Vzorčni viri:** Primeri definicij virov za povezavo s podatkovnimi viri, API-ji in zunanjimi storitvami znotraj MCP ogrodja.
- **Referenčne implementacije:** Praktični primeri, ki prikazujejo, kako strukturirati in organizirati vire, pozive in orodja v realnih MCP projektih.

Ti viri pohitrijo razvoj, spodbujajo standardizacijo in pomagajo zagotoviti dobre prakse pri izgradnji in namestitvi rešitev na osnovi MCP.

#### MCP imenik virov

- [MCP Resources (Vzorčni pozivi, orodja in definicije virov)](https://github.com/microsoft/mcp/tree/main/Resources)

### Raziskovalne priložnosti

- Učinkovite tehnike optimizacije pozivov v okoljih MCP
- Varnostni modeli za večstanovanjske MCP namestitve
- Merjenje in benchmarking delovanja različnih MCP implementacij
- Formalne metode preverjanja za MCP strežnike

## Zaključek

Model Context Protocol (MCP) hitro oblikuje prihodnost standardizirane, varne in interoperabilne AI integracije v različnih panogah. Skozi študije primerov in praktične projekte v tej lekciji ste videli, kako zgodnji uporabniki – vključno z Microsoftom in Azure – uporabljajo MCP za reševanje resničnih izzivov, pospešitev uvajanja AI in zagotovitev skladnosti, varnosti ter razširljivosti. Modularni pristop MCP omogoča organizacijam povezovanje velikih jezikovnih modelov, orodij in podatkov podjetij v enotnem, preglednem okvirju. Ko se MCP nadalje razvija, bo aktivno sodelovanje v skupnosti, raziskovanje odprtokodnih virov in uporaba najboljših praks ključnega pomena za gradnjo robustnih AI rešitev, pripravljenih na prihodnost.

## Dodatni viri

- [MCP Foundry GitHub repozitorij](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Integracija Azure AI agentov z MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub repozitorij (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources Directory (Vzorčni pozivi, orodja in definicije virov)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP Skupnost in dokumentacija](https://modelcontextprotocol.io/introduction)
- [MCP Specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP dokumentacija](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Najboljše varnostne prakse
- [Playwright MCP Server GitHub repozitorij](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Microsoft AI in avtomatizacijske rešitve](https://azure.microsoft.com/en-us/products/ai-services/)

## Vaje

1. Analizirajte eno izmed študij primerov in predlagajte alternativni pristop implementacije.
2. Izberite eno izmed idej projektov in pripravite podrobno tehnično specifikacijo.
3. Raziskujte panogo, ki ni obravnavana v študijah primerov, in opišite, kako bi MCP lahko naslovil njene specifične izzive.
4. Raziskujte eno izmed prihodnjih smernic in ustvarite koncept nove MCP razširitve za njeno podporo.

## Kaj je naslednje

Raziskujte več: [Microsoft MCP strežniki](./microsoft-mcp-servers.md)

Nadaljujte na: [Modul 8: Najboljše prakse](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->