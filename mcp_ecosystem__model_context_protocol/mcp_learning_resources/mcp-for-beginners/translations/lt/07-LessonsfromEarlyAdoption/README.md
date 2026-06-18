# 🌟 Pamokos iš ankstyvųjų vartotojų

[![Lessons from MCP Early Adopters](../../../translated_images/lt/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Spustelėkite aukščiau esantį paveikslėlį, norėdami peržiūrėti šios pamokos vaizdo įrašą)_

## 🎯 Ką apžvelgia šis modulis

Šis modulis nagrinėja, kaip tikros organizacijos ir programuotojai naudoja Model Context Protocol (MCP), spręsdami tikras problemas ir skatindami inovacijas. Per išsamius atvejų tyrimus, praktinius projektus ir realius pavyzdžius atrasite, kaip MCP leidžia saugiai ir mastelį keičiant integruoti dirbtinį intelektą, jungiant kalbos modelius, įrankius ir įmonių duomenis.

### 📚 Pažiūrėkite MCP veikiant

Norite pamatyti, kaip šios principai taikomi gamybai paruoštuose įrankiuose? Peržiūrėkite mūsų [**10 Microsoft MCP serverių, kurie transformuoja programuotojų produktyvumą**](microsoft-mcp-servers.md), kuriuose pristatomi realūs Microsoft MCP serveriai, kuriuos galite naudoti šiandien.

## Apžvalga

Ši pamoka nagrinėja, kaip ankstyvieji vartotojai pasinaudojo Model Context Protocol (MCP), spręsdami realaus pasaulio iššūkius ir skatindami inovacijas įvairiose pramonės šakose. Per išsamius atvejų tyrimus ir praktinius projektus pamatysite, kaip MCP leidžia standartizuoti, saugiai ir mastelio keičiamai integruoti dirbtinį intelektą — sujungiant didelius kalbos modelius, įrankius ir įmonių duomenis į vieningą sistemą. Įgysite praktinės patirties projektuojant ir kuriant MCP pagrindu veikiančius sprendimus, sužinosite patikrintus įgyvendinimo modelius ir atraskite geriausias praktikas MCP diegimui gamybos aplinkose. Pamoka taip pat apžvelgia kylančias tendencijas, ateities kryptis ir atvirojo kodo išteklius, kurie padės jums išlikti priekyje MCP technologijų ir evoliucinės ekosistemos.

## Mokymosi tikslai

- Išanalizuoti realaus pasaulio MCP įgyvendinimus įvairiose pramonės šakose
- Projektuoti ir kurti pilnas MCP pagrindu veikiančias programas
- Išnagrinėti kylančias tendencijas ir ateities kryptis MCP technologijoje
- Taikyti geriausias praktikas tikrose programavimo situacijose

## Realiojo pasaulio MCP įgyvendinimai

### Atvejo studija 1: Įmonių klientų aptarnavimo automatizavimas

Tarptautinė korporacija įdiegė MCP pagrindu veikiančią sistemą, kad standartizuotų dirbtinio intelekto sąveikas savo klientų aptarnavimo sistemose. Tai leido jiems:

- Sukurti vieningą sąsają keliems LLM tiekėjams
- Išlaikyti nuoseklų prašymų valdymą tarp skyrių
- Įdiegti patikimas saugumo ir atitikties kontrolės sistemas
- Lengvai perjungti skirtingus AI modelius pagal specifinius poreikius

**Techninis įgyvendinimas:**

```python
# Python MCP serverio įgyvendinimas klientų aptarnavimui
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Konfigūruoti žurnalus
logging.basicConfig(level=logging.INFO)

async def main():
    # Sukurti serverio konfigūraciją
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Inicializuoti MCP serverį
    server = create_server(config)
    
    # Užregistruoti žinių bazės išteklius
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Užregistruoti užklausų šablonus
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Užregistruoti palaikymo įrankius
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Paleisti serverį su HTTP transportu
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Rezultatai:** 30% sumažintos modelių sąnaudos, 45% pagerintas atsakymų nuoseklumas ir sustiprinta atitiktis visoje pasaulinėje veikloje.

### Atvejo studija 2: Sveikatos priežiūros diagnostikos asistentas

Sveikatos priežiūros paslaugų teikėjas sukūrė MCP infrastruktūrą, integruojančią kelis specializuotus medicininius AI modelius, užtikrindamas, kad jautri pacientų informacija būtų apsaugota:

- Sklandus perjungimas tarp bendrųjų ir specialistų medicinos modelių
- Griežtos privatumo kontrolės ir audito pėdsakai
- Integracija su esamomis Elektroninių sveikatos įrašų (EHR) sistemomis
- Nuosekli prašymų kūrimo praktika medicininės terminologijos atžvilgiu

**Techninis įgyvendinimas:**

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
  
**Rezultatai:** Pagerinti gydytojų diagnostikos pasiūlymai, išlaikant visišką HIPAA atitiktį ir ženkliai sumažinant konteksto keitimąsi tarp sistemų.

### Atvejo studija 3: Finansinių paslaugų rizikos analizė

Finansų institucija įdiegė MCP, kad standartizuotų rizikos analizės procesus skirtinguose skyriuose:

- Sukurtas vieningas sąsajos sluoksnis kredito rizikos, sukčiavimo aptikimo ir investicijų rizikos modeliams
- Įdiegta griežta prieigos kontrolė ir modelių versijų valdymas
- Užtikrintas visų AI rekomendacijų audituojamumas
- Išlaikytas nuoseklus duomenų formatavimas įvairiose sistemose

**Techninis įgyvendinimas:**

```java
// Java MCP serveris finansinių rizikų vertinimui
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Sukurti MCP serverį su finansinio atitikimo funkcijomis
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
  
**Rezultatai:** Pagerinta reguliavimo atitiktis, 40% greitesnis modelių diegimo ciklas ir pagerinta rizikos vertinimo nuoseklumas tarp skyrių.

### Atvejo studija 4: Microsoft Playwright MCP serveris naršyklės automatizavimui

Microsoft sukūrė [Playwright MCP serverį](https://github.com/microsoft/playwright-mcp), leidžiantį saugią, standartizuotą naršyklės automatizavimą naudojant Model Context Protocol. Šis gamybai paruoštas serveris leidžia AI agentams ir LLM sąveikauti su interneto naršyklėmis kontroliuojamu, audituojamu ir išplėstiniu būdu – tai leidžia naudoti automatinį tinklalapių testavimą, duomenų išgavimą ir end-to-end darbo eigas.

> **🎯 Gamybai paruoštas įrankis**  
>  
> Ši atvejo studija pristato tikrą MCP serverį, kurį galite naudoti šiandien! Sužinokite daugiau apie Playwright MCP serverį ir dar 9 kitus gamybai paruoštus Microsoft MCP serverius mūsų [**Microsoft MCP serverių vadove**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Pagrindinės savybės:**  
- Atveria naršyklės automatikos galimybes (navigaciją, formų pildymą, ekrano nuotraukų fiksavimą ir kt.) kaip MCP įrankius  
- Įgyvendina griežtas prieigos kontrolės ir izoliuotas aplinkas (sandboxing), kad būtų užkirstas kelias neteisėtoms operacijoms  
- Teikia detalizuotas audito žurnalo įrašus visoms naršyklės sąveikoms  
- Palaiko integraciją su Azure OpenAI ir kitais LLM tiekėjais agentais pagrįstai automatizacijai  
- Maitina GitHub Copilot programavimo agentą su naršyklės galimybėmis  

**Techninis įgyvendinimas:**

```typescript
// TypeScript: Playwright naršyklės automatizavimo įrankių registravimas MCP serveryje
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Užregistruokite įrankį URL naršymui ir ekrano nuotraukos fiksavimui
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

// Paleisti MCP serverį
server.listen(8080);
```
  
**Rezultatai:**

- Leidžia saugią, programiškai valdoma naršyklės automatizaciją AI agentams ir LLM  
- Sumažina rankinio testavimo pastangas ir pagerina interneto programų testavimo aprėptį  
- Suteikia pakartotinai naudojamą, išplėstą naršyklės įrankių integracijos sistemą įmonių aplinkose  
- Maitina GitHub Copilot naršyklės galimybes  

**Nuorodos:**  

- [Playwright MCP serverio GitHub saugykla](https://github.com/microsoft/playwright-mcp)  
- [Microsoft AI ir automatizavimo sprendimai](https://azure.microsoft.com/en-us/products/ai-services/)  

### Atvejo studija 5: Azure MCP – įmonių klasės Model Context Protocol kaip paslauga

Azure MCP serveris ([https://aka.ms/azmcp](https://aka.ms/azmcp)) yra Microsoft valdomas, įmonių klasės Model Context Protocol įgyvendinimas, sukurtas suteikti mastelio keičiamas, saugias ir atitikties reikalavimus atitinkančias MCP serverio galimybes kaip debesijos paslaugą. Azure MCP leidžia organizacijoms greitai diegti, valdyti bei integruoti MCP serverius su Azure AI, duomenų ir saugumo paslaugomis, mažinant operacijų naštą ir spartinant DI diegimą.

> **🎯 Gamybai paruoštas įrankis**  
>  
> Tai tikras MCP serveris, kurį galite naudoti šiandien! Sužinokite daugiau apie Microsoft Foundry MCP serverį mūsų [**Microsoft MCP serverių vadove**](microsoft-mcp-servers.md).

- Visapusiškai valdoma MCP serverio talpinimo paslauga su įmontuotomis mastelio keitimo, stebėjimo ir saugumo funkcijomis  
- Gili integracija su Azure OpenAI, Azure AI Search ir kitomis Azure paslaugomis  
- Įmonių autentifikacija ir autorizacija per Microsoft Entra ID  
- Palaikymas pasirinktiniams įrankiams, prašymų šablonams ir išteklių jungtims  
- Atitiktis įmonių saugumo ir reguliavimo reikalavimams  

**Techninis įgyvendinimas:**

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
  
**Rezultatai:**  
- Sutrumpintas laikas iki vertės įgyvendinimo įmonių DI projektuose teikiant paruoštą, atitinkantį MCP serverio platformą  
- Supaprastinta LLM, įrankių ir įmonių duomenų šaltinių integracija  
- Pagerintas saugumas, stebėsena ir operatyvinis efektyvumas MCP darbiniams krūviams  
- Pagerinta kodo kokybė naudojant Azure SDK geriausias praktikas ir naujausius autentifikavimo modelius  

**Nuorodos:**  
- [Azure MCP dokumentacija](https://aka.ms/azmcp)  
- [Azure MCP serverio GitHub saugykla](https://github.com/Azure/azure-mcp)  
- [Azure AI paslaugos](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP centras](https://mcp.azure.com)  

## Atvejo studija 6: NLWeb  
MCP (Model Context Protocol) yra kylančioji protokolo versija, skirta pokalbių robotams ir DI asistentams sąveikauti su įrankiais. Kiekviena NLWeb instancija taip pat yra MCP serveris, palaikantis vieną pagrindinį metodą – ask, kuris naudojamas užduoti klausimus svetainei natūralia kalba. Grąžinamas atsakymas naudoja schema.org – plačiai naudojamą žodyną interneto duomenims aprašyti. Kalbant paprastai, MCP yra NLWeb taip, kaip Http yra HTML. NLWeb jungia protokolus, Schema.org formatą ir pavyzdinį kodą, kad padėtų svetainėms greitai kurti šiuos galinius taškus, naudingus tiek žmonėms per pokalbių sąsajas, tiek mašinoms per natūralią agentų tarpusavio sąveiką.

Yra dvi aiškios NLWeb komponentų dalys:  
- Protokolas, labai paprastas pradėti, skirtas sąveikai su svetaine natūralia kalba ir formatas, naudodamas json ir schema.org grąžintam atsakymui. Plačiau žr. REST API dokumentacijoje.  
- Paprasta (1) įgyvendinimo versija, kuri naudoja esamus žymėjimus svetainėms, kurias galima abstrahuoti kaip prekių, receptų, lankytinų vietų, atsiliepimų sąrašus. Kartu su valdymo elementų rinkiniu svetainės gali lengvai pasiūlyti pokalbių sąsajas savo turiniui. Plačiau apie šio veikimo principus žr. Life of a chat query dokumentacijoje.

**Nuorodos:**  
- [Azure MCP dokumentacija](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)  

### Atvejo studija 7: Microsoft Foundry MCP serveris – įmonių DI agentų integracija

Microsoft Foundry MCP serveriai demonstruoja, kaip MCP gali būti naudojamas DI agentų ir darbo eigų valdymui įmonės aplinkose. Integruojant MCP su Microsoft Foundry, organizacijos gali standartizuoti agentų sąveikas, pasinaudoti Foundry darbo eigos valdymo galimybėmis ir užtikrinti saugų, mastelio keičiamos diegimą.

> **🎯 Gamybai paruoštas įrankis**  
>  
> Tai tikras MCP serveris, kurį galite naudoti šiandien! Sužinokite daugiau apie Microsoft Foundry MCP serverį mūsų [**Microsoft MCP serverių vadove**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Pagrindinės savybės:**  
- Pilnas priėjimas prie Azure DI ekosistemos, įskaitant modelių katalogus ir diegimo valdymą  
- Žinių indeksavimas su Azure AI Search RAG programoms  
- Vertinimo įrankiai DI modelių veikimui ir kokybės kontrolei  
- Integracija su Microsoft Foundry katalogu ir laboratorijomis pažangiems tyrimų modeliams  
- Agentų valdymo ir vertinimo galimybės gamybos scenarijuose  

**Rezultatai:**  
- Greitas DI agentų darbo eigų prototipavimas ir patikima stebėsena  
- Sklandi integracija su Azure DI paslaugomis pažangiems scenarijams  
- Vieninga sąsaja agentų srautų kūrimui, diegimui ir stebėjimui  
- Pagerintas saugumas, atitiktis ir operatyvinis veiksmingumas įmonėms  
- Spartina DI diegimą išlaikant kontrolę sudėtingiems agentų procesams  

**Nuorodos:**  
- [Microsoft Foundry MCP serverio GitHub saugykla](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Integracija Azure DI agentų su MCP (Microsoft Foundry tinklaraštis)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  

### Atvejo studija 8: Foundry MCP Playground – eksperimentavimas ir prototipavimas

Foundry MCP Playground suteikia paruoštą aplinką MCP serverių ir Microsoft Foundry integracijų eksperimentavimui. Kūrėjai gali greitai prototipuoti, testuoti ir vertinti DI modelius bei agentų darbo eigas, naudodami Microsoft Foundry katalogo ir laboratorijų išteklius. Playground supaprastina įrangos parengimą, pateikia pavyzdinius projektus bei palaiko bendradarbiavimą, todėl lengva tyrinėti gerąsias praktikas ir naujus scenarijus su minimalia našta. Tai ypač naudinga komandoms, norinčioms patvirtinti idėjas, dalintis eksperimentais ir spartinti mokymąsi be sudėtingos infrastruktūros. Mažindamas pradžios kliūtis, playground skatina inovacijas ir bendruomenės indėlius MCP ir Microsoft Foundry ekosistemoje.

**Nuorodos:**  

- [Foundry MCP Playground GitHub saugykla](https://github.com/azure-ai-foundry/foundry-mcp-playground)  

### Atvejo studija 9: Microsoft Learn Docs MCP serveris – DI varomas dokumentacijos prieinamumas

Microsoft Learn Docs MCP serveris yra debesyje talpinama paslauga, leidžianti DI asistentams gauti realaus laiko prieigą prie oficialių Microsoft dokumentų per Model Context Protocol. Šis gamybai paruoštas serveris jungiasi prie išsamaus Microsoft Learn ekosistemos ir leidžia semantinę paiešką visuose oficialiuose Microsoft šaltiniuose.

> **🎯 Gamybai paruoštas įrankis**  
>  
> Tai tikras MCP serveris, kurį galite naudoti šiandien! Sužinokite daugiau apie Microsoft Learn Docs MCP serverį mūsų [**Microsoft MCP serverių vadove**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Pagrindinės savybės:**  
- Realaus laiko prieiga prie oficialios Microsoft dokumentacijos, Azure dokumentų bei Microsoft 365 dokumentų  
- Pažangios semantinės paieškos galimybės, suprantančios kontekstą ir ketinimus  
- Visada atnaujinta informacija, kai pasirodo Microsoft Learn turinys  
- Išsamus visų Microsoft Learn, Azure ir Microsoft 365 šaltinių aprėptis  
- Grąžina iki 10 aukštos kokybės turinio fragmentų su straipsnių pavadinimais ir URL  

**Kodėl tai svarbu:**  
- Sprendžia „pasenusių DI žinių“ problemą Microsoft technologijoms  
- Užtikrina, kad DI asistentai turi prieigą prie naujausių .NET, C#, Azure ir Microsoft 365 funkcijų  
- Teikia autoritetingą, pirmojo šaltinio informaciją tiksliam kodo generavimui  
- Esminis įrankis programuotojams, dirbantiems su sparčiai besivystančiomis Microsoft technologijomis  

**Rezultatai:**  
- Drastiškai pagerinta DI generuojamo kodo tikslumas Microsoft technologijų srityje  
- Sumažintas laikas, praleidžiamas ieškant naujausios dokumentacijos ir geriausių praktikų  
- Pagerintas programuotojų produktyvumas su kontekstiniu dokumentacijos gavimu  
- Sklandi integracija su kūrimo darbo eigomis nepaliekant IDE  

**Nuorodos:**  
- [Microsoft Learn Docs MCP serverio GitHub saugykla](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn dokumentacija](https://learn.microsoft.com/)  

## Praktiniai projektai

### Projektas 1: Sukurkite daugiatiekį MCP serverį

**Tikslas:** Sukurti MCP serverį, galintį nukreipti užklausas keliems AI modelių tiekėjams pagal specifinius kriterijus.

**Reikalavimai:**

- Palaikyti bent tris skirtingus modelių tiekėjus (pvz., OpenAI, Anthropic, vietiniai modeliai)  
- Įgyvendinti užklausų maršrutizavimo mechanizmą, remiantis užklausų metaduomenimis  
- Sukurti konfigūracijos sistemą tiekėjų kredencialiams valdyti  
- Pridėti talpyklą našumo ir sąnaudų optimizavimui  
- Sukurti paprastą informacijos panelę naudojimui stebimui  

**Įgyvendinimo žingsniai:**

1. Paruošti pagrindinę MCP serverio infrastruktūrą  
2. Įdiegti tiekėjų adapterius kiekvienai AI modeliui teikiančiai paslaugai  
3. Sukurti maršrutizavimo logiką pagal užklausų atributus  
4. Įgyvendinti talpyklos mechanizmus dažnoms užklausoms  
5. Sukurti stebėjimo informacijos panelę  
6. Išbandyti su įvairiomis užklausų schemomis  

**Technologijos:** Pasirinkite Python (.NET/Java/Python pagal jūsų pageidavimą), Redis talpyklai ir paprastą žiniatinklio karkasą informacijos panelės kūrimui.

### Projektas 2: Įmonių prašymų valdymo sistema

**Tikslas:** Sukurti MCP pagrindu veikiančią sistemą, skirtą prašymų šablonų valdymui, versijavimui ir diegimui visoje organizacijoje.

**Reikalavimai:**
- Sukurti centralizuotą šablonų saugyklą
- Įgyvendinti versijų valdymo ir patvirtinimo darbo eigas
- Sukurti šablonų testavimo galimybes su pavyzdiniais įvesties duomenimis
- Sukurti vaidmenimis pagrįstą prieigos valdymą
- Sukurti API šablonų gavimui ir diegimui

**Įgyvendinimo veiksmai:**

1. Suprojektuoti duomenų bazės schemą šablonų saugojimui
2. Sukurti pagrindinį API šablonų CRUD operacijoms
3. Įgyvendinti versijų valdymo sistemą
4. Sukurti patvirtinimo darbo eigą
5. Sukurti testavimo sistemą
6. Sukurti paprastą žiniatinklio sąsają valdymui
7. Integruotis su MCP serveriu

**Technologijos:** Pasirinktas backend karkasas, SQL arba NoSQL duomenų bazė ir frontend karkasas valdymo sąsajai.

### Projektas 3: MCP pagrindu veikianti turinio kūrimo platforma

**Tikslas:** Sukurti turinio kūrimo platformą, kuri panaudoja MCP, siekiant užtikrinti nuoseklius rezultatus įvairiuose turinio tipuose.

**Reikalavimai:**

- Palaikyti kelis turinio formatus (tinklaraščio įrašai, socialinė žiniasklaida, rinkodaros tekstai)
- Įgyvendinti šablonais pagrįstą generavimą su pritaikymo galimybėmis
- Sukurti turinio peržiūros ir atsiliepimų sistemą
- Stebėti turinio našumo metrikas
- Palaikyti turinio versijavimą ir iteravimą

**Įgyvendinimo veiksmai:**

1. Paruošti MCP kliento infrastruktūrą
2. Sukurti šablonus skirtingiems turinio tipams
3. Sukurti turinio generavimo procesą
4. Įgyvendinti peržiūros sistemą
5. Kurti metrikų sekimo sistemą
6. Sukurti vartotojo sąsają šablonų valdymui ir turinio generavimui

**Technologijos:** Jūsų pageidaujama programavimo kalba, žiniatinklio karkasas ir duomenų bazių sistema.

## Tolimesnės MCP technologijos kryptys

### Kylančios tendencijos

1. **Daugiaplanis MCP**
   - MCP plėtra, skirta standartizuoti sąveikas su vaizdo, garso ir vaizdo modeliais
   - Kryžminio modalumo mąstymo galimybių vystymas
   - Standartizuotos užklausų formos skirtingoms modalumams

2. **Federuota MCP infrastruktūra**
   - Paskirstytos MCP tinklo sistemos, galinčios dalytis ištekliais tarp organizacijų
   - Standartizuoti protokolai saugiam modelių dalijimuisi
   - Privatumo saugojimo skaičiavimo technikos

3. **MCP turgavietės**
   - Ekosistemos MCP šablonų ir papildinių dalijimuisi ir pelnui
   - Kokybės užtikrinimo ir sertifikavimo procesai
   - Integracija su modelių turgavietėmis

4. **MCP krašto kompiuterijai**
   - MCP standartų pritaikymas resursų ribojimuose esančioms krašto įrenginiams
   - Optimizuoti protokolai mažu pralaidumu pasižyminčioms aplinkoms
   - Specializuoti MCP sprendimai IoT ekosistemoms

5. **Reguliavimo sistemos**
   - MCP plėtiniai reguliavimo atitikties užtikrinimui
   - Standartizuotos audito sekos ir aiškinamumo sąsajos
   - Integracija su naujomis AI valdymo sistemomis

### MCP sprendimai iš Microsoft

Microsoft ir Azure sukūrė keletą atvirojo kodo saugyklų, kad padėtų kūrėjams įgyvendinti MCP įvairiose situacijose:

#### Microsoft organizacija

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Playwright MCP serveris naršyklių automatizavimui ir testavimui
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - OneDrive MCP serverio įgyvendinimas vietiniam testavimui ir bendruomenės prisidėjimui
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb yra atvirų protokolų ir susijusių įrankių rinkinys, orientuotas į pamatinį sluoksnį AI žiniatinkliui

#### Azure-Samples organizacija

1. [mcp](https://github.com/Azure-Samples/mcp) - Nuorodos į pavyzdžius, įrankius ir resursus MCP serverių kūrimui ir integracijai Azure naudojant įvairias kalbas
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - MCP serverių pavyzdžiai, demonstruojantys autentifikaciją pagal Model Context Protocol specifikaciją
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Nukreipimo puslapis nuotolinėms MCP serverių įgyvendinimo Azure Functions su kalbinių saugyklų nuorodomis
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Greito starto šablonas kuriant ir diegiant pasirinktinius nuotolinius MCP serverius naudojant Azure Functions su Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Greito starto šablonas kuriant ir diegiant pasirinktinius nuotolinius MCP serverius naudojant Azure Functions su .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Greito starto šablonas kuriant ir diegiant pasirinktinius nuotolinius MCP serverius naudojant Azure Functions su TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API valdymas kaip AI vartai nuotoliniams MCP serveriams naudojant Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI eksperimentai įskaitant MCP galimybes, integruojami su Azure OpenAI ir AI Foundry

Šios saugyklos teikia įvairius įgyvendinimus, šablonus ir resursus darbui su Model Context Protocol įvairiomis programavimo kalbomis ir Azure paslaugomis. Jos aprėpia nuo pagrindinių serverių įgyvendinimų iki autentifikacijos, debesų diegimo ir įmonių integracijos scenarijų.

#### MCP Resursų katalogas

[Oficialios Microsoft MCP saugyklos MCP Resources katalogas](https://github.com/microsoft/mcp/tree/main/Resources) suteikia atrinktų pavyzdinių resursų, užklausų šablonų ir įrankių apibrėžimų kolekciją Model Context Protocol serverių naudojimui. Šis katalogas skirtas padėti kūrėjams greitai pradėti darbą su MCP, siūlant pakartotinai naudojamus elementus ir gerosios praktikos pavyzdžius:

- **Užklausų šablonai:** Paruošti naudoti šablonai dažniausioms AI užduotims ir scenarijams, kuriuos galima pritaikyti savo MCP serverių įgyvendinimams.
- **Įrankių apibrėžimai:** Pavyzdinės įrankių schemos ir metaduomenys įrankių integracijai ir kvietimui standartizuoti įvairiuose MCP serveriuose.
- **Išteklių pavyzdžiai:** Pavyzdiniai išteklių apibrėžimai duomenų šaltiniams, API ir išorinėms paslaugoms jungti MCP sistemoje.
- **Nuorodiniai įgyvendinimai:** Praktiniai pavyzdžiai, demonstruojantys, kaip struktūruoti ir organizuoti išteklius, užklausas ir įrankius realiuose MCP projektuose.

Šie resursai pagreitina vystymą, skatina standartizaciją ir padeda užtikrinti gerąsias praktikas kuriant ir diegiant MCP pagrindu veikiančius sprendimus.

#### MCP Resursų katalogas

- [MCP Resursai (pavyzdinės užklausos, įrankiai ir išteklių apibrėžimai)](https://github.com/microsoft/mcp/tree/main/Resources)

### Tyrimų galimybės

- Efektyvios užklausų optimizavimo technikos MCP sistemose
- Saugumo modeliai daugianuominėms MCP diegimams
- Veikimo našumo testavimas skirtinguose MCP įgyvendinimuose
- Formalūs patikrinimo metodai MCP serveriams

## Išvados

Model Context Protocol (MCP) sparčiai formuoja ateitį standartizuotos, saugios ir tarpusavyje suderinamos AI integracijos srityje pramonėje. Per šios pamokos atvejų analizę ir praktinius projektus matėte, kaip ankstyvieji naudotojai – įskaitant Microsoft ir Azure – panaudoja MCP realių iššūkių sprendimui, AI įsisavinimo spartinimui bei atitikties, saugumo ir mastelio užtikrinimui. MCP modulinis pobūdis leidžia organizacijoms sujungti didelius kalbos modelius, įrankius ir verslo duomenis į vieningą, patikrintiną sistemą. Kadangi MCP nuolat vystosi, aktyvus bendruomenės dalyvavimas, atviro kodo išteklių tyrinėjimas ir geriausių praktikų taikymas bus raktas kuriant tvirtus, ateičiai pritaikytus AI sprendimus.

## Papildomi ištekliai

- [MCP Foundry GitHub saugykla](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Azure AI agentų integracija su MCP (Microsoft Foundry tinklaraštis)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub saugykla (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resursų katalogas (pavyzdinės užklausos, įrankiai ir išteklių apibrėžimai)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP bendruomenė ir dokumentacija](https://modelcontextprotocol.io/introduction)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP dokumentacija](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Saugumo gerosios praktikos
- [Playwright MCP serverio GitHub saugykla](https://github.com/microsoft/playwright-mcp)
- [Files MCP serveris (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth serveriai (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Microsoft AI ir automatizavimo sprendimai](https://azure.microsoft.com/en-us/products/ai-services/)

## Užduotys

1. Išanalizuokite vieną iš atvejų ir pasiūlykite alternatyvų įgyvendinimo metodą.
2. Pasirinkite vieną projekto idėją ir sukurkite detalią techninę specifikaciją.
3. Ištirkite pramonės šaką, kurios aprašyme nėra, ir aprašykite, kaip MCP galėtų spręsti jos specifinius iššūkius.
4. Išnagrinėkite vieną iš ateities krypčių ir sukurkite konceptą naujam MCP plėtimui ją palaikyti.

## Kas toliau

Tęskite: [Microsoft MCP serveriai](./microsoft-mcp-servers.md)

Toliau: [8 modulis: Geriausios praktikos](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->