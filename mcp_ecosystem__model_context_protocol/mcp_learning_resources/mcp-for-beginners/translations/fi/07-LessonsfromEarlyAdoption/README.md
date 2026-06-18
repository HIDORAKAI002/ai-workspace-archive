# 🌟 Oppitunnit varhaisilta käyttäjiltä

[![Lessons from MCP Early Adopters](../../../translated_images/fi/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Napsauta yllä olevaa kuvaa nähdäksesi tämän oppitunnin videon)_

## 🎯 Mitä tämä moduuli kattaa

Tämä moduuli tutkii, kuinka todelliset organisaatiot ja kehittäjät hyödyntävät Model Context Protocolia (MCP) ratkaistakseen todellisia haasteita ja edistääkseen innovaatiota. Yksityiskohtaisten tapaustutkimusten, käytännön projektien ja käytännön esimerkkien kautta opit, kuinka MCP mahdollistaa turvallisen, skaalautuvan tekoälyn integroinnin, joka yhdistää kielimallit, työkalut ja yritystiedot.

### 📚 Näe MCP toiminnassa

Haluatko nähdä näiden periaatteiden soveltamisen tuotantovalmiisiin työkaluihin? Tutustu [**10 Microsoft MCP -palvelimeen, jotka mullistavat kehittäjien tuottavuuden**](microsoft-mcp-servers.md), jotka esittelevät todellisia Microsoftin MCP-palvelimia, joita voit käyttää jo tänään.

## Yleiskatsaus

Tämä oppitunti tutkii, miten varhaiset käyttäjät ovat hyödyntäneet Model Context Protocolia (MCP) ratkaistakseen todellisia haasteita ja edistääkseen innovaatioita eri toimialoilla. Yksityiskohtaisten tapaustutkimusten ja käytännön projektien kautta näet, kuinka MCP mahdollistaa standardoidun, turvallisen ja skaalautuvan tekoälyn integraation — yhdistäen suuria kielimalleja, työkaluja ja yrityksen tietoja yhtenäisessä kehitysympäristössä. Saat käytännön kokemusta MCP-pohjaisten ratkaisujen suunnittelusta ja rakentamisesta, opit todistetuista toteutusmalleista ja löydät parhaat käytännöt MCP:n käyttöönottoon tuotantoympäristöissä. Oppitunti korostaa myös nousevia trendejä, tulevia suuntauksia ja avoimen lähdekoodin resursseja, jotka auttavat pysymään MCP-teknologian ja sen kehittyvän ekosysteemin kärjessä.

## Oppimistavoitteet

- Analysoida todellisia MCP-toteutuksia eri toimialoilla  
- Suunnitella ja rakentaa täydellisiä MCP-pohjaisia sovelluksia  
- Tutkia nousevia trendejä ja tulevia suuntauksia MCP-teknologiassa  
- Soveltaa parhaita käytäntöjä todellisissa kehitysskenaarioissa  

## Todelliset MCP-toteutukset

### Tapaustutkimus 1: Yrityksen asiakastuen automaatio

Monikansallinen yritys toteutti MCP-pohjaisen ratkaisun standardoidakseen tekoälyvuorovaikutukset asiakastukijärjestelmissään. Tämä mahdollisti heille:

- Yhdenmukaisen käyttöliittymän useille LLM-palveluntarjoajille  
- Johdonmukaisen kehotehallinnan eri osastoilla  
- Vankat turvallisuus- ja vaatimustenmukaisuuskontrollit  
- Helpon siirtymisen eri tekoälymallien välillä tarpeen mukaan  

**Tekninen toteutus:**

```python
# Python MCP -palvelimen toteutus asiakastukea varten
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Määritä lokitus
logging.basicConfig(level=logging.INFO)

async def main():
    # Luo palvelimen kokoonpano
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Alusta MCP-palvelin
    server = create_server(config)
    
    # Rekisteröi tietopohjan resurssit
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Rekisteröi kehotemallit
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Rekisteröi tukityökalut
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Käynnistä palvelin HTTP-siirrolla
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Tulokset:** Mallikustannukset laskivat 30 %, vastausjohdonmukaisuus parani 45 % ja vaatimustenmukaisuus lisääntyi globaalissa toiminnassa.

### Tapaustutkimus 2: Terveydenhuollon diagnostinen apuri

Terveydenhuollon tarjoaja kehitti MCP-infrastruktuurin integroidakseen useita erikoistuneita lääketieteen tekoälymalleja varmistaen samalla, että arkaluontoiset potilastiedot pysyivät suojattuina:

- Saumaton siirtyminen yleislääketieteen ja erikoisalojen mallien välillä  
- Tiukat yksityisyydensuojakontrollit ja tarkastuspolut  
- Integrointi olemassa oleviin sähköisiin potilastietojärjestelmiin (EHR)  
- Johdonmukainen kehoteinsinöörityö lääketieteellisessä terminologiassa  

**Tekninen toteutus:**

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
  
**Tulokset:** Paransi lääkärien diagnostisia ehdotuksia säilyttäen täydellisen HIPAA-vaatimustenmukaisuuden ja merkittävästi vähensi kontekstin vaihtamista eri järjestelmien välillä.

### Tapaustutkimus 3: Rahoituspalveluiden riskianalyysi

Rahoituslaitos otti MCP:n käyttöön standardoidakseen riskianalyysiprosessinsa eri osastoilla:

- Loivat yhdenmukaisen käyttöliittymän luottoriskin, petosten havainnon ja sijoitusriskimallien hallintaan  
- Toteuttivat tiukat käyttöoikeuskontrollit ja malliversioinnin  
- Varmistivat kaikkien tekoälysuositusten auditoinnin  
- Säilyttivät johdonmukaisen tietojen muotoilun eri järjestelmien välillä  

**Tekninen toteutus:**

```java
// Java MCP -palvelin taloudelliseen riskinarviointiin
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Luo MCP -palvelin taloudellisen vaatimustenmukaisuuden ominaisuuksilla
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
  
**Tulokset:** Parantunut sääntelyvaatimusten noudattaminen, 40 % nopeammat mallien käyttöönottojaksot ja parantunut riskinarvioinnin johdonmukaisuus osastoilla.

### Tapaustutkimus 4: Microsoft Playwright MCP-palvelin selainautomaatioon

Microsoft kehitti [Playwright MCP -palvelimen](https://github.com/microsoft/playwright-mcp) tarjoamaan turvallisen, standardoidun selainautomaation Model Context Protocolin kautta. Tämä tuotantovalmis palvelin mahdollistaa tekoälyagenttien ja LLM:ien vuorovaikutuksen verkkoselaimien kanssa hallitulla, auditoitavalla ja laajennettavalla tavalla — mahdollistaen esimerkiksi automatisoidun verkkotestauksen, tiedon louhinnan ja end-to-end-työnkulut.

> **🎯 Tuotantovalmis työkalu**  
>  
> Tämä tapaustutkimus esittelee todellisen MCP-palvelimen, jota voit käyttää jo tänään! Lue lisää Playwright MCP -palvelimesta ja muista yhdeksästä tuotantovalmiista Microsoft MCP -palvelimesta oppaassamme [**Microsoft MCP -palvelimet**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Keskeiset ominaisuudet:**  
- Tarjoaa selainautomaatiokykyjä (navigointi, lomakkeiden täyttö, kuvakaappauksen ottaminen jne.) MCP-työkaluina  
- Toteuttaa tiukat käyttöoikeuskontrollit ja hiekkalaatikoinnin luvattomien toimintojen estämiseksi  
- Tarjoaa yksityiskohtaiset tarkastuslokit kaikista selainvuorovaikutuksista  
- Tukee integraatiota Azure OpenAI:n ja muiden LLM-palveluntarjoajien kanssa agenttiohjatuksi automaatioksi  
- Voimanlähteenä GitHub Copilotin Coding Agent -selainominaisuuksille  

**Tekninen toteutus:**

```typescript
// TypeScript: Rekisteröidään Playwright-selainautomaatio työkalut MCP-palvelimella
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Rekisteröi työkalu URL-osoitteeseen siirtymiseen ja näytönkuvan ottamiseen
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

// Käynnistä MCP-palvelin
server.listen(8080);
```
  
**Tulokset:**  

- Mahdollisti turvallisen, ohjelmallisen selainautomaation tekoälyagenteille ja LLM:ille  
- Vähensi manuaalisen testauksen työmäärää ja paransi verkkosovellusten testikattavuutta  
- Tarjosi uudelleenkäytettävän, laajennettavan kehityskehyksen selainpohjaisten työkalujen integrointiin yritysympäristöissä  
- Mahdollistaa GitHub Copilotin web-selainominaisuudet  

**Viitteet:**  

- [Playwright MCP Server GitHub -repositorio](https://github.com/microsoft/playwright-mcp)  
- [Microsoftin tekoäly- ja automaatiopalvelut](https://azure.microsoft.com/en-us/products/ai-services/)

### Tapaustutkimus 5: Azure MCP – Yritystason Model Context Protocol -palvelu

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) on Microsoftin hallinnoima, yritystason toteutus Model Context Protocolista, suunniteltu tarjoamaan skaalautuvat, turvalliset ja vaatimustenmukaiset MCP-palvelinominaisuudet pilvipalveluna. Azure MCP mahdollistaa organisaatioille nopean MCP-palvelimien käyttöönoton, hallinnan ja integroinnin Azure AI:n, datan ja turvallisuuspalveluiden kanssa, vähentäen operatiivista kuormaa ja nopeuttaen tekoälyn käyttöönottoa.

> **🎯 Tuotantovalmis työkalu**  
>  
> Tämä on todellinen MCP-palvelin, jota voit käyttää jo tänään! Lue lisää Microsoft Foundry MCP -palvelimesta oppaassamme [**Microsoft MCP -palvelimet**](microsoft-mcp-servers.md).

- Täysin hallinnoitu MCP-palvelimen ylläpito sisäänrakennetulla skaalauksella, valvonnalla ja turvallisuudella  
- Natiivikäyttö Azure OpenAI:n, Azure AI Searchin ja muiden Azuren palveluiden kanssa  
- Yrityksen tunnistautuminen ja valtuutus Microsoft Entra ID:n kautta  
- Tuki räätälöidyille työkaluilla, kehoteideoille ja resurssiliittimille  
- Vaatimustenmukaisuus yritysturvallisuus- ja sääntelyvaatimusten kanssa  

**Tekninen toteutus:**

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
  
**Tulokset:**  
- Vähensi yritysten tekoälyprojektien aika-arvoa tarjoamalla käyttövalmiin, vaatimustenmukaisen MCP-palvelinalustan  
- Yksinkertaisti LLM:ien, työkalujen ja yritystietolähteiden integrointia  
- Paransi MCP-kuormien turvallisuutta, havaittavuutta ja operatiivista tehokkuutta  
- Paransi koodin laatua Azure SDK:n parhaiden käytäntöjen ja nykyaikaisten tunnistautumismallien avulla  

**Viitteet:**  
- [Azure MCP -dokumentaatio](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub -repositorio](https://github.com/Azure/azure-mcp)  
- [Azure AI -palvelut](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)

## Tapaustutkimus 6: NLWeb  
MCP (Model Context Protocol) on nouseva protokolla chatbotien ja tekoälyassistenttien välistä työkalujen vuorovaikutusta varten. Jokainen NLWeb-instanssi on myös MCP-palvelin, joka tukee yhtä ydintoimintoa, ask, jolla verkkosivustolle voidaan esittää kysymys luonnollisella kielellä. Palautettu vastaus hyödyntää schema.orgia, laajasti käytettyä sanastoa verkkotiedon kuvaamiseen. Karkeasti puhuttuna MCP on NLWeb samaan tapaan kuin Http on HTML:lle. NLWeb yhdistää protokollat, Schema.org-muodot ja mallikoodin auttaakseen sivustoja luomaan nämä päätepisteet nopeasti, hyödyttäen sekä ihmisiä keskustelukäyttöliittymien että koneiden luonnollisen agenttien välisen vuorovaikutuksen kautta.

NLWeb koostuu kahdesta erillisestä osasta:  
- Protokoista, joka on hyvin yksinkertainen aloittaa sivuston luonnollisen kielen rajapintana, ja muodosta, joka hyödyntää jsonia ja schema.orgia vastauksen palauttamiseen. Katso REST API -dokumentaatio lisätiedoista.  
- Yksinkertaisesta toteutuksesta (1), joka hyödyntää olemassa olevaa merkkausta, sivustoille, jotka voidaan abstrahoida tuoteluetteloiksi (tuotteet, reseptit, nähtävyydet, arvostelut jne.). Yhdessä käyttöliittymäwidgätien kanssa sivustot voivat helposti tarjota keskustelupohjaisia käyttöliittymiä sisällölleen. Katso dokumentaatio Life of a chat query vaiheista lisätietoja siitä, miten tämä toimii.

**Viitteet:**  
- [Azure MCP -dokumentaatio](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Tapaustutkimus 7: Microsoft Foundry MCP Server – Yritystason tekoälyagenttien integrointi

Microsoft Foundry MCP -palvelimet demonstroivat, kuinka MCP:tä voidaan käyttää tekoälyagenttien ja työnkulkujen orkestrointiin ja hallintaan yritysympäristöissä. Integroimalla MCP Microsoft Foundryn kanssa organisaatiot voivat standardisoida agenttien vuorovaikutuksen, hyödyntää Foundryn työnkulkujen hallintaa ja varmistaa turvalliset, skaalautuvat käyttöönotot.

> **🎯 Tuotantovalmis työkalu**  
>  
> Tämä on todellinen MCP-palvelin, jota voit käyttää jo tänään! Lue lisää Microsoft Foundry MCP -palvelimesta oppaassamme [**Microsoft MCP -palvelimet**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Keskeiset ominaisuudet:**  
- Kattava pääsy Azuren tekoälyekosysteemiin, mukaan lukien malliluettelot ja käyttöönoton hallinta  
- Tietämyksen indeksointi Azure AI Searchilla RAG-sovelluksiin  
- Työkalut tekoälymallien suorituskyvyn arviointiin ja laadunvarmistukseen  
- Integraatio Microsoft Foundry Catalogin ja Labsin huippututkimusmalleihin  
- Agenttien hallinta- ja arviointimahdollisuudet tuotantotilanteissa  

**Tulokset:**  
- Nopea prototypointi ja vankka valvonta tekoälyagenttien työnkuluissa  
- Saumaton integrointi Azure AI -palveluiden kanssa kehittyneissä tilanteissa  
- Yhtenäinen käyttöliittymä agenttiputkien rakentamiseen, käyttöönottoon ja valvontaan  
- Parannettu turvallisuus, vaatimustenmukaisuus ja operatiivinen tehokkuus yrityksissä  
- Tekoälyn käyttöönoton nopeuttaminen hallinnoimalla monimutkaisia agenttivetoisia prosesseja  

**Viitteet:**  
- [Microsoft Foundry MCP Server GitHub -repositorio](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Azure AI -agenttien integrointi MCP:n kanssa (Microsoft Foundry Blogi)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Tapaustutkimus 8: Foundry MCP Playground – Kokeilu ja prototypointi

Foundry MCP Playground tarjoaa käyttövalmiin ympäristön MCP-palvelinten ja Microsoft Foundry -integraatioiden kokeiluun. Kehittäjät voivat nopeasti prototyypittää, testata ja arvioida tekoälymalleja ja agenttien työnkulkuja Microsoft Foundryn Catalogin ja Labsin resurssien avulla. Playground yksinkertaistaa asetuksen, tarjoaa malliprojekteja ja tukee yhteistyökehitystä, tehden parhaiden käytäntöjen ja uusien tilanteiden tutkimisesta helppoa ilman monimutkaista infrastruktuuria. Se on erityisen hyödyllinen tiimeille, jotka haluavat validoida ideoita, jakaa kokeiluja ja nopeuttaa oppimista.

**Viitteet:**  

- [Foundry MCP Playground GitHub -repositorio](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Tapaustutkimus 9: Microsoft Learn Docs MCP Server – Tekoälyllä tehostettu dokumentaatio

Microsoft Learn Docs MCP Server on pilvipalveluna toimiva palvelu, joka tarjoaa tekoälyavustajille reaaliaikaisen pääsyn viralliseen Microsoft-dokumentaatioon Model Context Protocolin kautta. Tämä tuotantovalmis palvelin yhdistyy laajaan Microsoft Learn -ekosysteemiin ja mahdollistaa semanttisen haun kaikista virallisista Microsoftin lähteistä.

> **🎯 Tuotantovalmis työkalu**  
>  
> Tämä on todellinen MCP-palvelin, jota voit käyttää jo tänään! Lue lisää Microsoft Learn Docs MCP Serveristä oppaassamme [**Microsoft MCP -palvelimet**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Keskeiset ominaisuudet:**  
- Reaaliaikainen pääsy viralliseen Microsoft-dokumentaatioon, Azure-dokumentaatioon ja Microsoft 365 -dokumentaatioon  
- Edistyneet semanttiset hakutoiminnot, jotka ymmärtävät kontekstin ja tarkoituksen  
- Aina ajan tasalla oleva tieto Microsoft Learn -sisällön julkaisemisen myötä  
- Kattava sisältö Microsoft Learnista, Azure-dokumentaatiosta ja Microsoft 365 -lähteistä  
- Palauttaa jopa 10 korkealaatuista sisältöpalasta artikkelin otsikoiden ja URL-osoitteiden kanssa  

**Miksi se on kriittinen:**  
- Ratkaisee "vanhentuneen tekoälytiedon" ongelman Microsoft-teknologioissa  
- Varmistaa, että tekoälyavustajilla on pääsy uusimpiin .NET-, C#-, Azure- ja Microsoft 365 -ominaisuuksiin  
- Tarjoaa auktoritatiivista, ensikäden tietoa tarkkaan koodin generointiin  
- Olennaista kehittäjille, jotka työskentelevät nopeasti kehittyvien Microsoft-teknologioiden parissa  

**Tulokset:**  
- Merkittävästi parantunut tekoälyn generoiman koodin tarkkuus Microsoft-teknologioissa  
- Vähentynyt aika ajantasaisen dokumentaation ja parhaiden käytäntöjen etsimiseen  
- Parantunut kehittäjien tuottavuus kontekstia huomioivan dokumentaation haun ansiosta  
- Saumaton integraatio kehitystyönkulkujen kanssa ilman IDE:n vaihtoa  

**Viitteet:**  
- [Microsoft Learn Docs MCP Server GitHub -repositorio](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn -dokumentaatio](https://learn.microsoft.com/)

## Käytännön projektit

### Projekti 1: Rakenna monitoimittajainen MCP-palvelin

**Tavoite:** Luo MCP-palvelin, joka voi ohjata pyynnöt useille tekoälymallipalveluntarjoajille tiettyjen kriteerien perusteella.

**Vaatimukset:**

- Tuki vähintään kolmelle eri mallipalveluntarjoajalle (esim. OpenAI, Anthropic, paikalliset mallit)  
- Toteuta reititysmekanismi pyyntöjen metatietojen perusteella  
- Luo määritysjärjestelmä palveluntarjoajien tunnistetietojen hallintaan  
- Lisää välimuisti suorituskyvyn ja kustannusten optimointiin  
- Rakenna yksinkertainen kojelauta käytön seurantaan  

**Toteutusvaiheet:**

1. Perusta perus MCP-palvelininfrastruktuuri  
2. Toteuta palveluntarjoajien adapterit jokaiselle tekoälymallipalvelulle  
3. Luo reitityslogiikka pyynnön attribuuttien perusteella  
4. Lisää välimuistimekanismit toistuville pyynnöille  
5. Kehitä seurantakojelauta  
6. Testaa eri pyynnönkuvioilla  

**Teknologiat:** Valitse Pythonista (.NET/Java/Python oman mieltymyksesi mukaan), Redis välimuistiksi sekä yksinkertainen web-kehys kojelaudalle.

### Projekti 2: Yrityksen kehotehallintajärjestelmä

**Tavoite:** Kehitä MCP-pohjainen järjestelmä kehoteiden mallipohjien hallintaan, versiointiin ja käyttöönottoon organisaatiossa.

**Vaatimukset:**
- Luo keskitetty repositorio kehotepohjille
- Toteuta versiohallinta ja hyväksymisprosessit
- Rakenna pohjien testausmahdollisuudet esimerkkisyötteillä
- Kehitä roolipohjaiset käyttöoikeudet
- Luo API pohjien hakemiseen ja käyttöönottoon

**Toteutusvaiheet:**

1. Suunnittele tietokantakaavio pohjien tallennusta varten
2. Luo ydintoiminnot pohjien CRUD-toimintoihin API:lle
3. Toteuta versiointijärjestelmä
4. Rakenna hyväksymisprosessi
5. Kehitä testauskehys
6. Luo yksinkertainen web-käyttöliittymä hallintaan
7. Integroi MCP-palvelimeen

**Teknologiat:** Valitsemasi backend-kehys, SQL- tai NoSQL-tietokanta sekä frontend-kehys hallintaliittymälle.

### Projekti 3: MCP-pohjainen sisällöntuotantoalusta

**Tavoite:** Rakenna sisällöntuotantoalusta, joka hyödyntää MCP:tä tarjoten yhtenäisiä tuloksia eri sisältötyypeille.

**Vaatimukset:**

- Tue useita sisältöformaatteja (blogikirjoitukset, sosiaalinen media, markkinointi)
- Toteuta pohjapohjainen generointi räätälöintimahdollisuuksilla
- Luo sisällön arviointi- ja palautteenantojärjestelmä
- Seuraa sisällön suorituskykymittareita
- Tue sisällön versiointia ja iterointia

**Toteutusvaiheet:**

1. Perusta MCP-asiakasrajapinta
2. Luo pohjia eri sisältötyypeille
3. Rakenna sisällöntuotantoputki
4. Toteuta arviointijärjestelmä
5. Kehitä mittariseurantajärjestelmä
6. Luo käyttöliittymä pohjien hallintaan ja sisällöntuotantoon

**Teknologiat:** Valitse ohjelmointikieli, verkkokehys ja tietokantajärjestelmä mieltymyksesi mukaan.

## MCP-teknologian tulevat suunnat

### Nousevat trendit

1. **Monimodaalinen MCP**
   - MCP:n laajentaminen vakioimaan vuorovaikutus kuvan, äänen ja videon mallien kanssa
   - Poikkimodaalisen päättelyn kyvykkyyksien kehittäminen
   - Vakioidut kehotemuodot eri modalityypeille

2. **Federoitu MCP-infrastruktuuri**
   - Hajautetut MCP-verkostot, jotka voivat jakaa resursseja organisaatioiden välillä
   - Vakioidut protokollat turvalliseen mallien jakamiseen
   - Yksityisyydensuojaavat laskentatekniikat

3. **MCP-markkinapaikat**
   - Ekosysteemit MCP-pohjien ja lisäosien jakamiseen ja kaupallistamiseen
   - Laadunvarmistus- ja sertifiointiprosessit
   - Integraatio mallimarkkinapaikkoihin

4. **MCP reunalaskennassa**
   - MCP-standardien sovittaminen resurssirajoitteisille reunalaitteille
   - Optimoidut protokollat matalan kaistanleveyden ympäristöihin
   - Erityissovellukset MCP:lle IoT-ekosysteemeissä

5. **Sääntelykehykset**
   - MCP-laajennusten kehitys säädösten noudattamiseen
   - Vakioidut auditointilokit ja selitettävyyden rajapinnat
   - Integraatio kehittyviin tekoälyn hallintakehyksiin

### Microsoftin MCP-ratkaisut

Microsoft ja Azure ovat kehittäneet useita avoimen lähdekoodin repositorioita tukemaan kehittäjiä MCP:n toteutuksessa eri käyttötapauksiin:

#### Microsoft-organisaatio

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) – Playwright MCP -palvelin selaimen automaatioon ja testaukseen
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) – OneDrive MCP -palvelinsovellus paikalliseen testaukseen ja yhteisöpanokseen
3. [NLWeb](https://github.com/microsoft/NlWeb) – NLWeb on kokoelma avoimia protokollia ja niihin liittyviä avoimen lähdekoodin työkaluja, keskittyen perustason rakentamiseen tekoälyn verkkosovelluksille

#### Azure-Samples -organisaatio

1. [mcp](https://github.com/Azure-Samples/mcp) – Linkkejä esimerkkeihin, työkaluihin ja resursseihin MCP-palvelimien rakentamiseksi ja integroimiseksi Azuren eri kielillä
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) – Referenssipohjaiset MCP-palvelimet autentikoinnin demonstrointiin nykyisen Model Context Protocol -määrityksen mukaisesti
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) – Aloitussivu etä-MCP-palvelinsovelluksille Azure Functions -ympäristössä eri kielirepositoriin linkityksillä
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) – Nopea aloituspohja etä-MCP-palvelinten rakentamiseen ja käyttöönottoon Pythonilla Azure Functions -palvelussa
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) – Nopea aloituspohja etä-MCP-palvelinten rakentamiseen ja käyttöönottoon .NET/C#-ympäristössä Azure Functionsilla
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) – Nopea aloituspohja etä-MCP-palvelinten rakentamiseen ja käyttöönottoon TypeScriptillä Azure Functionsilla
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) – Azure API Management tekoälysillan roolissa etä-MCP-palvelimille Pythonilla
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) – APIM ❤️ AI -kokeiluja MCP-ominaisuuksin, integroitu Azure OpenAI:hin ja AI Foundryyn

Nämä repositoriot tarjoavat monipuolisia toteutuksia, pohjia ja resursseja MCP:n hyödyntämiseen eri ohjelmointikielillä ja Azuren palveluissa kattaen peruspalvelinsovellukset, autentikoinnin, pilvikäytön ja yritysintegroinnin skenaariot.

#### MCP-resurssihakemisto

Virallisessa Microsoftin MCP-respositorissa oleva [MCP Resources -hakemisto](https://github.com/microsoft/mcp/tree/main/Resources) tarjoaa kuratoidun kokoelman esimerkkiresursseja, kehotepohjia ja työkalumäärittelyjä MCP-palvelimien käyttöön. Tämä hakemisto auttaa kehittäjiä pääsemään nopeasti alkuun MCP:n kanssa tarjoamalla uudelleenkäytettäviä rakennuspalikoita ja parhaita käytäntöjä:

- **Kehotepohjat:** Valmiita kehotepohjia yleisiin tekoälytehtäviin ja -skenaarioihin, joita voi muokata omiin MCP-palvelintoteutuksiin
- **Työkalumäärittelyt:** Esimerkkityökalumallit ja metatiedot työkalujen standardoituun integrointiin ja kutsumiseen eri MCP-palvelimilla
- **Resurssiesimerkit:** Esimerkkejä resurssimäärittelyistä, joita käytetään yhteyden muodostamiseen tietolähteisiin, rajapintoihin ja ulkoisiin palveluihin MCP-kehyksessä
- **Referenssitoteutukset:** Käytännön näytteitä siitä, miten resursseja, kehotteita ja työkaluja jäsennellään MCP-projekteissa

Nämä resurssit vauhdittavat kehitystä, edistävät standardisointia ja varmistavat parhaat käytännöt MCP-pohjaisten ratkaisujen rakentamisessa ja käyttöönotossa.

#### MCP-resurssihakemisto

- [MCP-resurssit (esimerkkikehotteet, työkalut ja resurssimääritykset)](https://github.com/microsoft/mcp/tree/main/Resources)

### Tutkimusmahdollisuudet

- Tehokkaat kehotteiden optimointitekniikat MCP-kehyksessä
- Turvallisuusmallit monen asiakkaan MCP-järjestelmiin
- Suorituskyvyn vertailuanalyysit eri MCP-toteutuksissa
- Formaalit varmennusmenetelmät MCP-palvelimille

## Yhteenveto

Model Context Protocol (MCP) muokkaa nopeasti tulevaisuutta vakioidulle, turvalliselle ja yhteentoimivalle tekoälyintegraatiolle eri toimialoilla. Tämä oppitunti on esitellyt käytännön esimerkkejä ja projekteja, joissa Microsoft ja Azure ovat varhaisina omaksujina hyödyntäneet MCP:tä ratkoakseen todellisia haasteita, nopeuttaakseen tekoälyn käyttöönottoa sekä varmistaakseen vaatimustenmukaisuuden, turvallisuuden ja skaalautuvuuden. MCP:n modulaarinen lähestymistapa mahdollistaa organisaatioiden liittää laaja kielimalleja, työkaluja ja yritysdatan yhtenäiseen ja auditoitavaan kehykseen. MCP:n kehittyessä aktiivinen yhteisön osallistuminen, avoimen lähdekoodin resurssien hyödyntäminen ja parhaiden käytäntöjen soveltaminen ovat avainasemassa rakentamaan vankkoja, tulevaisuuden tekoälyratkaisuja.

## Lisäresurssit

- [MCP Foundry GitHub -repositorio](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Azure AI -agenttien integrointi MCP:hen (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub -repositorio (Microsoft)](https://github.com/microsoft/mcp)
- [MCP-resurssihakemisto (esimerkkikehotteet, työkalut ja resurssimääritykset)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP-yhteisö & dokumentaatio](https://modelcontextprotocol.io/introduction)
- [MCP-määritys (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP -dokumentaatio](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Turvallisuuden parhaat käytännöt
- [Playwright MCP Server GitHub reposti](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Microsoftin tekoäly- ja automaatioratkaisut](https://azure.microsoft.com/en-us/products/ai-services/)

## Harjoitukset

1. Analysoi yksi tapaustutkimuksista ja ehdota vaihtoehtoinen toteutuslähestymistapa.
2. Valitse yksi projektiehdotuksista ja laadi yksityiskohtainen tekninen spesifikaatio.
3. Tutki toimiala, jota tapaustutkimuksissa ei käsitelty, ja hahmottele miten MCP voisi ratkaista sen erityisiä haasteita.
4. Tutki yhtä tulevaisuuden suuntaa ja kehitä konsepti uudelle MCP-laajennukselle sen tukemiseksi.

## Seuraavaksi

Tutustu lisää: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

Jatka: [Moduuli 8: Parhaat käytännöt](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->