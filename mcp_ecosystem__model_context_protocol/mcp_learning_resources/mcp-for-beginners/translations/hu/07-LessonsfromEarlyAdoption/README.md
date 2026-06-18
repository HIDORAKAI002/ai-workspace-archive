# 🌟 Korai Felhasználók Tapasztalatai

[![Lessons from MCP Early Adopters](../../../translated_images/hu/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Kattints a fenti képre a tananyag videójának megtekintéséhez)_

## 🎯 Mit Fed Le Ez a Modul

Ez a modul bemutatja, hogyan használják valós szervezetek és fejlesztők a Model Context Protocolt (MCP) valós kihívások megoldására és az innováció előmozdítására. Részletes esettanulmányokon, gyakorlati projekteken és példákon keresztül megtudhatod, hogyan teszi lehetővé az MCP a biztonságos, skálázható AI integrációt, amely összekapcsolja a nagy nyelvi modelleket, eszközöket és vállalati adatokat.

### 📚 Nézd meg az MCP működés közben

Szeretnéd látni, hogyan alkalmazzák ezeket az elveket gyártásra kész eszközökben? Nézd meg [**10 Microsoft MCP Szerver, amelyek átalakítják a fejlesztők termelékenységét**](microsoft-mcp-servers.md) című anyagunkat, amely valós Microsoft MCP szervereket mutat be, amelyeket ma is használhatsz.

## Áttekintés

Ez a tananyag azt vizsgálja, hogyan használták fel a korai felhasználók a Model Context Protocolt (MCP) valós problémák megoldására és innovációra az iparágak széles skáláján. Részletes esettanulmányokon és kézzelfogható projekteken keresztül megismerheted, hogyan teszi lehetővé az MCP a szabványosított, biztonságos és skálázható AI integrációt – összekapcsolva a nagy nyelvi modelleket, eszközöket és vállalati adatokat egy egységes keretrendszerben. Gyakorlati tapasztalatokat szerezhetsz MCP-alapú megoldások tervezésében és építésében, tanulhatsz bevált megvalósítási mintákból, és felfedezhetsz legjobb gyakorlatokat az MCP éles környezetben történő bevezetéséhez. A tananyag kitér a felmerülő trendekre, a jövőbeli irányokra és a nyílt forráskódú forrásokra is, hogy naprakész maradj az MCP technológiában és annak fejlődő ökoszisztémájában.

## Tanulási célok

- Valós MCP megvalósítások elemzése különböző iparágakban
- Teljes MCP-alapú alkalmazások tervezése és fejlesztése
- Az MCP technológia felmerülő trendjeinek és jövőbeli irányainak felfedezése
- Legjobb gyakorlatok alkalmazása valós fejlesztési helyzetekben

## Valós MCP megvalósítások

### Esettanulmány 1: Vállalati Ügyfélszolgálat Automatizálása

Egy multinacionális vállalat MCP-alapú megoldást vezetett be az ügyfélszolgálati rendszerek AI interakcióinak egységesítésére. Ennek eredményeként:

- Egységes felületet hoztak létre több LLM szolgáltatóhoz
- Folyamatos prompt-kezelést tartottak fenn az osztályok között
- Robusztus biztonsági és megfelelőségi ellenőrzéseket valósítottak meg
- Könnyen váltottak az egyes igények szerint különböző AI modellek között

**Technikai megvalósítás:**

```python
# Python MCP szerver megvalósítás ügyféltámogatáshoz
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Naplózás konfigurálása
logging.basicConfig(level=logging.INFO)

async def main():
    # Szerver konfiguráció létrehozása
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # MCP szerver inicializálása
    server = create_server(config)
    
    # Tudásbázis erőforrásainak regisztrálása
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Prompt sablonok regisztrálása
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Támogató eszközök regisztrálása
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Szerver indítása HTTP átvitellel
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```

**Eredmények:** 30%-os költségcsökkenés a modelleknél, 45%-os javulás a válaszkonzisztenciában, valamint fokozott megfelelőség a globális működés során.

### Esettanulmány 2: Egészségügyi Diagnosztikai Asszisztens

Egy egészségügyi szolgáltató MCP infrastruktúrát fejlesztett ki, hogy több speciális orvosi AI modellt integráljon, miközben garantálta az érzékeny betegek adatainak védelmét:

- Zökkenőmentes váltás általános és specialistai orvosi modellek között
- Szigorú adatvédelmi szabályozás és auditálási nyomvonalak
- Integráció meglévő Elektronikus Egészségügyi Nyilvántartó (EHR) rendszerekkel
- Következetes prompt tervezés orvosi terminológia szerint

**Technikai megvalósítás:**

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

**Eredmények:** Javultak a diagnosztikai javaslatok az orvosok számára, miközben teljes HIPAA-megfelelőség fennmaradt, és jelentősen csökkent a rendszerközi váltások száma.

### Esettanulmány 3: Pénzügyi Szolgáltatások Kockázatelemzése

Egy pénzügyi intézmény MCP-t vezetett be, hogy egységesítse kockázatelemzési folyamatait különböző osztályokon:

- Egységes felületet hoztak létre hitelkockázat, csalásfelderítés és befektetési kockázat modellekhez
- Szigorú hozzáférés-kezelést és modell verziókezelést valósítottak meg
- Biztosították az AI ajánlások auditálhatóságát
- Következetes adatformátumot tartottak fenn a sokféle rendszer között

**Technikai megvalósítás:**

```java
// Java MCP szerver pénzügyi kockázatértékeléshez
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // MCP szerver létrehozása pénzügyi megfelelőségi funkciókkal
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

**Eredmények:** Javított szabályozási megfelelőség, 40%-kal gyorsabb modell bevezetési ciklusok, és egységesebb kockázatértékelés az osztályok között.

### Esettanulmány 4: Microsoft Playwright MCP Szerver Böngészőautomatizáláshoz

A Microsoft kifejlesztette a [Playwright MCP szervert](https://github.com/microsoft/playwright-mcp), amely biztonságos, szabványosított böngészőautomatizálást tesz lehetővé a Model Context Protocol segítségével. Ez a gyártásra kész szerver AI ügynökök és LLM-ek számára teszi lehetővé a web böngészőkkel történő interakciót ellenőrzött, auditálható és bővíthető módon – megvalósítva olyan eseteket, mint az automatizált webes tesztelés, adatkinyerés és end-to-end munkafolyamatok.

> **🎯 Gyártásra Kész Eszköz**
> 
> Ez az esettanulmány egy valós MCP szervert mutat be, amelyet ma is használhatsz! Tudj meg többet a Playwright MCP Szerverről és 9 másik, gyártásra kész Microsoft MCP szerverről a [**Microsoft MCP Szerver Útmutatóban**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Főbb jellemzők:**
- A böngészőautomatizálási funkciók (navigáció, űrlapkitöltés, képernyőkép készítés stb.) MCP eszközként való elérése
- Szigorú hozzáférés-ellenőrzések és homokozó mechanizmusok jogosulatlan műveletek megakadályozására
- Részletes audit naplók minden böngészőműveletről
- Integráció Azure OpenAI és más LLM szolgáltatókkal ügynökalapú automatizálás érdekében
- A GitHub Copilot Coding Agent web böngészési képességeinek működtetése

**Technikai megvalósítás:**

```typescript
// TypeScript: Playwright böngésző automatizálási eszközök regisztrálása egy MCP szerveren
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Regisztráljon egy eszközt URL-re navigáláshoz és képernyőkép készítéséhez
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

// Indítsa el az MCP szervert
server.listen(8080);
```

**Eredmények:**

- Biztonságos, programozott böngészőautomatizálás AI ügynökök és LLM-ek számára
- Csökkentette a manuális tesztelési erőfeszítéseket és javította a webalkalmazások tesztlefedettségét
- Újrahasznosítható, bővíthető keretrendszert biztosít a böngésző alapú eszközintegrációhoz vállalati környezetben
- A GitHub Copilot webes böngészési képességeinek biztosítása

**Hivatkozások:**

- [Playwright MCP Server GitHub tárhely](https://github.com/microsoft/playwright-mcp)
- [Microsoft AI és automatizációs megoldások](https://azure.microsoft.com/en-us/products/ai-services/)

### Esettanulmány 5: Azure MCP – Vállalati Szintű Model Context Protocol Szolgáltatásként

Az Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) a Microsoft által kezelt, vállalati szintű Model Context Protocol megvalósítás, amely skálázható, biztonságos és szabálykövető MCP szerver szolgáltatást nyújt felhőben. Az Azure MCP lehetővé teszi a szervezetek számára az MCP szerverek gyors telepítését, kezelését és integrálását az Azure AI, adat- és biztonsági szolgáltatásaival, csökkentve az üzemeltetési terheket és felgyorsítva az AI bevezetését.

> **🎯 Gyártásra Kész Eszköz**
> 
> Ez egy valós MCP szerver, amit ma is használhatsz! Tudj meg többet a Microsoft Foundry MCP Szerverről a [**Microsoft MCP Szerver Útmutatóban**](microsoft-mcp-servers.md).

- Teljes körűen kezelt MCP szerver hosztolás beépített skálázással, monitorozással és biztonsággal
- Natív integráció az Azure OpenAI, Azure AI Search és egyéb Azure szolgáltatásokkal
- Vállalati hitelesítés és jogosultságkezelés Microsoft Entra ID-n keresztül
- Egyedi eszközök, prompt sablonok és erőforrás csatlakozók támogatása
- Megfelelés vállalati biztonsági és szabályozási előírásoknak

**Technikai megvalósítás:**

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

**Eredmények:**  
- Csökkentette a vállalati AI projektek értékteremtési idejét egy kész, megfelelőségi szempontból ellenőrzött MCP szerver platform biztosításával  
- Egyszerűsítette az LLM-ek, eszközök és vállalati adatforrások integrációját  
- Javította a biztonságot, megfigyelhetőséget és üzemeltetési hatékonyságot MCP terheléseknél  
- Növelte a kód minőségét az Azure SDK legjobb gyakorlataival és naprakész hitelesítési mintákkal  

**Hivatkozások:**  
- [Azure MCP Dokumentáció](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub tárhely](https://github.com/Azure/azure-mcp)  
- [Azure AI Szolgáltatások](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Központ](https://mcp.azure.com)

## Esettanulmány 6: NLWeb  
Az MCP (Model Context Protocol) egy felbukkanó protokoll chatbotok és AI asszisztensek számára az eszközökkel való interakcióra. Minden NLWeb példány egyben MCP szerver is, amely egyetlen fő módszert támogat, az ask-et, amely lehetővé teszi, hogy természetes nyelven kérdést tegyen fel egy webhelynek. A visszakapott válasz a schema.org-t használja, amely egy széles körben használt szókincs webadatok leírására. Laza értelemben az MCP az NLWeb-hez hasonló úgy, mint az Http a HTML-hez. Az NLWeb kombinálja a protokollokat, Schema.org formátumokat és mintakódokat, hogy segítsen weboldalaknak gyorsan létrehozni ezeket a végpontokat, előnyös mind az emberek számára a beszélgetős felületeken, mind a gépek számára a természetes ügynök-ügynök interakcióban.

Az NLWeb-nek két elkülöníthető komponense van:  
- Egy protokoll, amely nagyon egyszerű az induláshoz, hogy természetes nyelven interfészeljen egy webhelyhez, és egy formátum, amely json-t és schema.org-t használ a visszakapott válaszhoz. Részletek a REST API dokumentációban.  
- Egy egyszerű megvalósítás az (1)-re alapozva, amely meglévő jelöléseket használ, olyan oldalakhoz, amelyek absztrahálhatók tételek listájaként (termékek, receptek, látnivalók, vélemények stb.). Egy sor felhasználói felület widgettel az oldalak könnyen biztosíthatnak beszélgetős felületeket a tartalmaikhoz. Részletek a Life of a chat query dokumentációban arról, hogyan működik ez.

**Hivatkozások:**  
- [Azure MCP Dokumentáció](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Esettanulmány 7: Microsoft Foundry MCP Szerver – Vállalati AI Ügynök Integráció

A Microsoft Foundry MCP szerverek bemutatják, hogyan használható az MCP AI ügynökök és munkafolyamatok kezelése és koordinálása céljából vállalati környezetekben. Az MCP és a Microsoft Foundry integrációjával a szervezetek szabványosíthatják az ügynöki interakciókat, kihasználhatják a Foundry munkafolyamat-kezelését, és biztonságos, skálázható telepítéseket biztosíthatnak.

> **🎯 Gyártásra Kész Eszköz**
> 
> Ez egy valós MCP szerver, amelyet ma is használhatsz! Tudj meg többet a Microsoft Foundry MCP szerverről a [**Microsoft MCP Szerver Útmutatóban**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Főbb jellemzők:**
- Teljes hozzáférés az Azure AI ökoszisztémához, beleértve a modellkatalógusokat és telepítéskezelést
- Tudás indexelés Azure AI Search segítségével RAG alkalmazásokhoz
- Értékelő eszközök AI modell teljesítmény és minőségbiztosítás céljából
- Integráció a Microsoft Foundry katalógussal és laborokkal a csúcskutatási modellekhez
- Ügynökkezelési és értékelési lehetőségek éles környezetekhez

**Eredmények:**
- Gyors prototípus készítés és alapos AI ügynök munkafolyamat monitorozás  
- Zökkenőmentes integráció az Azure AI szolgáltatásokkal fejlett forgatókönyvekhez  
- Egységes felület az ügynök pipeline-ok építéséhez, telepítéséhez és monitorozásához  
- Javított biztonság, megfelelőség és üzemeltetési hatékonyság vállalatok számára  
- Gyorsított AI bevezetés összetett ügynökalapú folyamatok kontrollja mellett

**Hivatkozások:**
- [Microsoft Foundry MCP Server GitHub tárhely](https://github.com/azure-ai-foundry/mcp-foundry)
- [Azure AI Ügynökök MCP integrációja (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Esettanulmány 8: Foundry MCP Playground – Kísérletezés és Prototípus Készítés

A Foundry MCP Playground egy készen álló környezet MCP szerverek és Microsoft Foundry integrációk kipróbálására. A fejlesztők gyorsan készíthetnek prototípusokat, tesztelhetnek és értékelhetnek AI modelleket és ügynökmunkafolyamatokat a Microsoft Foundry katalógus és laborok erőforrásaival. A playground egyszerűsíti a beállítást, mintapéldákat és támogatást nyújt az együttműködő fejlesztéshez, így könnyen felfedezhetők a legjobb gyakorlatok és új forgatókönyvek minimális ráfordítással. Különösen hasznos a csapatok számára ötletek validálására, kísérletek megosztására és a tanulás gyorsítására bonyolult infrastruktúra nélkül. Belépési küszöb csökkentésével elősegíti az innovációt és a közösségi hozzájárulásokat az MCP és Microsoft Foundry ökoszisztémában.

**Hivatkozások:**

- [Foundry MCP Playground GitHub tárhely](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Esettanulmány 9: Microsoft Learn Docs MCP Szerver – AI-alapú dokumentáció elérés

A Microsoft Learn Docs MCP szerver egy felhőalapú szolgáltatás, amely AI asszisztensek számára valós idejű hozzáférést biztosít a hivatalos Microsoft dokumentációhoz a Model Context Protocolon keresztül. Ez a gyártásra kész szerver kapcsolódik a kiterjedt Microsoft Learn ökoszisztémához és lehetővé teszi a szemantikus keresést minden hivatalos Microsoft forrásban.

> **🎯 Gyártásra Kész Eszköz**
> 
> Ez egy valós MCP szerver, amelyet ma is használhatsz! Tudj meg többet a Microsoft Learn Docs MCP szerverről a [**Microsoft MCP Szerver Útmutatóban**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Főbb jellemzők:**
- Valós idejű hozzáférés hivatalos Microsoft dokumentációkhoz, Azure dokumentációhoz és Microsoft 365 anyagokhoz  
- Fejlett szemantikus kereső képességek, amelyek értik a kontextust és a szándékot  
- Mindig naprakész információ, ahogy a Microsoft Learn tartalom megjelenik  
- Kiterjedt lefedettség Microsoft Learn, Azure dokumentáció és Microsoft 365 források között  
- Visszaad akár 10 magas minőségű tartalmi egységet cikkcímekkel és URL-ekkel

**Miért létfontosságú:**
- Megoldja a „elavult AI tudás” problémát Microsoft technológiák esetén  
- Biztosítja, hogy az AI asszisztensek hozzáférjenek a legfrissebb .NET, C#, Azure és Microsoft 365 funkciókhoz  
- Elsődleges, hiteles forrásokat nyújt a pontos kód generáláshoz  
- Elengedhetetlen a gyorsan változó Microsoft technológiákon dolgozó fejlesztők számára

**Eredmények:**
- Drámai javulás az AI által generált kód pontosságában Microsoft technológiákhoz  
- Csökkentett idő a naprakész dokumentáció és legjobb gyakorlatok keresésére  
- Fejlesztői termelékenység javítása kontextus-érzékeny dokumentáció visszakereséssel  
- Zökkenőmentes integráció a fejlesztői munkafolyamatokba anélkül, hogy el kellene hagyni az IDE-t

**Hivatkozások:**
- [Microsoft Learn Docs MCP Server GitHub tárhely](https://github.com/MicrosoftDocs/mcp)
- [Microsoft Learn Dokumentáció](https://learn.microsoft.com/)

## Gyakorlati Projektek

### Projekt 1: Többszolgáltatós MCP Szerver készítése

**Cél:** Hozz létre egy MCP szervert, amely képes kérésirányítást végezni több AI modell szolgáltató felé adott feltételek alapján.

**Követelmények:**

- Ismertesse legalább három különböző modell szolgáltatót (pl. OpenAI, Anthropic, helyi modellek)
- Valósíts meg egy irányító mechanizmust a kérés metaadatai alapján
- Készíts egy konfigurációs rendszert a szolgáltató hitelesítő adatok kezelésére
- Adj hozzá gyorsítótárazást a teljesítmény és költségek optimalizálásához
- Készíts egy egyszerű irányítópultot a használat monitorozására

**Megvalósítási lépések:**

1. Állítsd be az alap MCP szerver infrastruktúrát  
2. Készíts szolgáltató adaptereket minden AI modell szolgáltatóhoz  
3. Alakítsd ki az irányítási logikát kéréstulajdonságok alapján  
4. Adj hozzá gyorsítótárazási mechanizmusokat gyakori kérésekhez  
5. Fejleszd ki az irányítópultot  
6. Teszteld különböző kérésmintákkal  

**Technológiák:** Válassz Python, (.NET/Java/Python preferencia szerint), Redis a gyorsítótárazáshoz és egy egyszerű webes keretrendszer az irányítópulthoz.

### Projekt 2: Vállalati Promptkezelő Rendszer

**Cél:** Fejlessz MCP-alapú rendszert prompt sablonok kezelésére, verziózására és bevezetésére egy szervezeten belül.

**Követelmények:**
- Hozzon létre egy központosított tárolót a prompt sablonok számára
- Valósítson meg verziókövetést és jóváhagyási munkafolyamatokat
- Építsen be sablontesztelési képességeket mintabemenetekkel
- Fejlesszen ki szerepkör-alapú hozzáférés-vezérlést
- Hozzon létre egy API-t a sablonok lekéréséhez és telepítéséhez

**Megvalósítási lépések:**

1. Tervezze meg az adatbázis-sémát a sablonok tárolásához
2. Hozza létre a sablon CRUD műveletek alap API-ját
3. Valósítsa meg a verziókövető rendszert
4. Építse ki a jóváhagyási munkafolyamatot
5. Fejlessze ki a tesztelési keretrendszert
6. Készítsen egy egyszerű webes felületet a kezeléshez
7. Integrálja egy MCP szerverrel

**Technológiák:** A backend keretrendszer, az SQL vagy NoSQL adatbázis, valamint a kezelőfelület frontend keretrendszere a választása szerint.

### 3. projekt: MCP alapú tartalomgeneráló platform

**Cél:** Egy olyan tartalomgeneráló platform létrehozása, amely az MCP-t kihasználva konzisztens eredményeket biztosít különböző tartalomtípusok esetén.

**Követelmények:**

- Több tartalomformátum támogatása (blogbejegyzések, közösségi média, marketing szövegek)
- Sablonalapú generálás testreszabási lehetőségekkel
- Tartalomellenőrzési és visszajelzési rendszer létrehozása
- A tartalom teljesítménymutatóinak nyomon követése
- Tartalom verziókövetés és iteráció támogatása

**Megvalósítási lépések:**

1. Állítsa be az MCP kliens infrastruktúrát
2. Készítsen sablonokat különböző tartalomtípusokhoz
3. Építse fel a tartalomgeneráló folyamatot
4. Valósítsa meg az ellenőrzési rendszert
5. Fejlessze a mérőszám-követő rendszert
6. Hozzon létre felhasználói felületet a sablonkezeléshez és tartalom generáláshoz

**Technológiák:** Az Ön által preferált programozási nyelv, webes keretrendszer és adatbázis rendszer.

## Az MCP technológia jövőbeli irányai

### Felmerülő trendek

1. **Multi-Modális MCP**
   - Az MCP bővítése az image, hang és videó modellekkel való szabványosított interakciókra
   - Keresztmodális érvelési képességek fejlesztése
   - Különböző modalitásokhoz szabványosított prompt formátumok

2. **Federált MCP infrastruktúra**
   - Elosztott MCP hálózatok, amelyek erőforrásokat oszthatnak meg szervezetek között
   - Szabványosított protokollok biztonságos modellmegosztáshoz
   - Adatvédelmet biztosító számítási technikák

3. **MCP piacterek**
   - Ökoszisztémák MCP sablonok és pluginek megosztására és monetizálására
   - Minőségbiztosítási és tanúsítási folyamatok
   - Integráció modellpiacokkal

4. **MCP az él-számítástechnikához (Edge Computing)**
   - Az MCP szabványok adaptálása erőforrás-korlátozott él eszközökre
   - Optimalizált protokollok alacsony sávszélességű környezetekhez
   - Speciális MCP implementációk IoT ökoszisztémákhoz

5. **Szabályozói keretrendszerek**
   - MCP kiterjesztések fejlesztése a szabályozási megfeleléshez
   - Szabványosított audit nyomvonalak és értelmezhetőségi felületek
   - Integráció a kibontakozó AI irányítási keretrendszerekkel

### Microsoft MCP megoldások

A Microsoft és az Azure számos nyílt forráskódú tárolót fejlesztett ki, hogy segítsék a fejlesztőket az MCP különféle eseteinek megvalósításában:

#### Microsoft szervezet

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Playwright MCP szerver böngésző automatizálásra és tesztelésre
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - OneDrive MCP szerver implementáció helyi teszteléshez és közösségi hozzájáruláshoz
3. [NLWeb](https://github.com/microsoft/NlWeb) - Nyílt protokollok és kapcsolódó nyílt forráskódú eszközkészletek gyűjteménye, amely az AI Web alaprétegének megteremtésére fókuszál

#### Azure-Samples szervezet

1. [mcp](https://github.com/Azure-Samples/mcp) - Kapcsolók mintákhoz, eszközökhöz és forrásokhoz MCP szerverek Azure-ban több nyelven történő összeállításához és integrációjához
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Referencia MCP szerverek a hitelesítés megvalósításához az aktuális Model Context Protocol specifikációval
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Induló oldal távoli MCP szerver implementációkhoz Azure Functions-ben, nyelvspecifikus tárolók linkjeivel
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Gyorsindító sablon egyedi távoli MCP szerverek építéséhez és telepítéséhez Azure Functions-ben Python használatával
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Gyorsindító sablon egyedi távoli MCP szerverekhez Azure Functions-ben .NET/C# használatával
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Gyorsindító sablon egyedi távoli MCP szerverekhez Azure Functions-ben TypeScript használatával
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API Management mint AI átjáró távoli MCP szerverekhez Python használatával
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI kísérletek MCP képességekkel, integrálva Azure OpenAI-val és AI Foundry-val

Ezek a tárolók különböző implementációkat, sablonokat és eszközöket kínálnak a Model Context Protocol különböző programozási nyelveken és Azure szolgáltatásokkal való használatához. Lefedik az egyszerű szerver implementációktól a hitelesítésen, felhőalapú telepítésen és vállalati integráción át számos használati esetet.

#### MCP Resources könyvtár

A hivatalos Microsoft MCP tároló [MCP Resources könyvtára](https://github.com/microsoft/mcp/tree/main/Resources) egy összeállított gyűjtemény mintaforrásokból, prompt sablonokból és eszközdefiníciókból, amelyeket a Model Context Protocol szerverekhez lehet használni. Ez a könyvtár segíti a fejlesztőket a gyors kezdésben újrahasznosítható építőelemekkel és bevált gyakorlat példákkal:

- **Prompt sablonok:** Kész, használatra kész prompt sablonok gyakori AI feladatokhoz és forgatókönyvekhez, melyek az Ön MCP szerver implementációihoz is adaptálhatók.
- **Eszközdefiníciók:** Példa eszköz sémák és metaadatok az eszköz integráció és hívás standardizálására különböző MCP szerverek között.
- **Erőforrás minták:** Példa erőforrás definíciók adatforrásokhoz, API-khoz és külső szolgáltatásokhoz való csatlakozáshoz az MCP keretrendszeren belül.
- **Referencia implementációk:** Gyakorlati minták a források, promptok és eszközök strukturálására és szervezésére valós MCP projekteken belül.

Ezek az erőforrások felgyorsítják a fejlesztést, elősegítik a szabványosítást, és támogatják a legjobb gyakorlatokat az MCP alapú megoldások építésénél és üzemeltetésénél.

#### MCP Resources könyvtár

- [MCP Resources (minta promptok, eszközök és erőforrás definíciók)](https://github.com/microsoft/mcp/tree/main/Resources)

### Kutatási lehetőségek

- Hatékony prompt optimalizálási technikák MCP keretrendszerekben
- Biztonsági modellek multi-bérlős MCP telepítésekhez
- Teljesítmény-összehasonlító vizsgálatok különböző MCP implementációk között
- Formális verifikációs módszerek MCP szerverekhez

## Összegzés

A Model Context Protocol (MCP) gyorsan formálja a szabványosított, biztonságos és interoperábilis AI integráció jövőjét az iparágakban. A leckében bemutatott esettanulmányokon és projektmunkákon keresztül láthattuk, hogy a korai befogadók – köztük a Microsoft és az Azure – miként használják az MCP-t valós kihívások megoldására, az AI elfogadásának felgyorsítására, valamint a megfelelőség, biztonság és skálázhatóság biztosítására. Az MCP moduláris megközelítése lehetővé teszi, hogy a szervezetek egyesítsék a nagy nyelvi modelleket, eszközöket és vállalati adatokat egy egységes, auditálható keretrendszerben. Ahogy az MCP fejlődik, a közösséggel való aktív részvétel, a nyílt forráskódú erőforrások felfedezése és a bevált gyakorlatok alkalmazása kulcsfontosságú lesz a megbízható, a jövőre kész AI megoldások építésében.

## További erőforrások

- [MCP Foundry GitHub tároló](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Azure AI agentek MCP-vel integrálása (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub tároló (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources könyvtár (minta promptok, eszközök és erőforrás definíciók)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP közösség & dokumentáció](https://modelcontextprotocol.io/introduction)
- [MCP specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP dokumentáció](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Biztonsági legjobb gyakorlatok
- [Playwright MCP Server GitHub](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Microsoft AI és automatizálási megoldások](https://azure.microsoft.com/en-us/products/ai-services/)

## Gyakorlatok

1. Elemezzen ki egy esettanulmányt, és javasoljon alternatív megvalósítási megközelítést.
2. Válasszon ki egy projektötletet és készítsen részletes műszaki specifikációt.
3. Kutasson egy iparágat, amely nincs lefedve az esettanulmányok között, és vázolja fel, hogyan oldhatná meg az MCP annak specifikus kihívásait.
4. Fedezzen fel egy jövőbeli irányt, és dolgozzon ki egy koncepciót egy új MCP kiterjesztés támogatására.

## Mi következik

Fedezze fel tovább: [Microsoft MCP szerverek](./microsoft-mcp-servers.md)

Folytassa a következővel: [8. modul: Legjobb gyakorlatok](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->