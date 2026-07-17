> [HÄVITETTY: 2026-07-28 RELEASE CANDIDATE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Otanta Model Context Protocolissa

> **Poistumisilmoitus:** `2026-07-28` MCP-spesifikaation julkaisuversio merkitsee otannan vanhentuneeksi suoran integraation hyväksi LLM-palveluntarjoajien APIen kanssa. Otanta toimii edelleen `2025-11-25` -versiossa ja ainakin vuoden ajan muodollisen poistamisen jälkeen, joten tämän oppitunnin sisältö on edelleen pätevää – mutta uusien palvelinsuunnittelujen tulisi arvioida korvaavaa mallia. Katso [Mitä MCP:ssä muuttuu: 2026-07-28 release candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Otanta on tehokas MCP-ominaisuus, joka antaa palvelimille mahdollisuuden pyytää LLM-valmiuksia asiakkaan kautta, mahdollistaen monimutkaisia itsenäisiä toimintoja samalla kun säilytetään turvallisuus ja yksityisyys. Oikea otanta-asetus voi parantaa merkittävästi vasteen laatua ja suorituskykyä. MCP tarjoaa standardoidun tavan hallita, miten mallit generoivat tekstiä tiettyjen parametrien avulla, jotka vaikuttavat satunnaisuuteen, luovuuteen ja johdonmukaisuuteen.

## Johdanto

Tässä oppitunnissa tutkimme, miten otantaparametreja konfiguroidaan MCP-pyynnöissä sekä ymmärrämme otannan taustalla olevan protokollan toimintamekanismit.

## Oppimistavoitteet

Oppitunnin lopussa osaat:

- Ymmärtää keskeiset MCP:ssä käytettävät otantaparametrit.
- Määrittää otantaparametrit eri käyttötapauksiin.
- Toteuttaa deterministisen otannan toistettavia tuloksia varten.
- Säädellä otantaparametreja dynaamisesti kontekstin ja käyttäjän mieltymysten mukaan.
- Soveltaa otantastrategioita mallin suorituskyvyn parantamiseksi eri tilanteissa.
- Ymmärtää, miten otanta toimii MCP:n asiakas-palvelin-välitteisessä toimintavirrassa.

## Miten otanta toimii MCP:ssä

Otantaprosessi MCP:ssä etenee seuraavasti:

1. Palvelin lähettää `sampling/createMessage` -pyynnön asiakkaalle
2. Asiakas tarkistaa pyynnön ja voi muokata sitä
3. Asiakas ottaa otannan LLM:stä
4. Asiakas tarkistaa valmiin tuloksen
5. Asiakas palauttaa tuloksen palvelimelle

Tämä ihmisen osallistama malli varmistaa, että käyttäjät hallitsevat sitä, mitä LLM näkee ja tuottaa.

## Otantaparametrien yleiskatsaus

MCP määrittelee seuraavat otantaparametrit, jotka voidaan asettaa asiakaspyynnöissä:

| Parametri | Kuvaus | Tyypillinen arvoalue |
|-----------|-------------|---------------|
| `temperature` | Hallitsee satunnaisuutta token-valinnassa | 0.0 - 1.0 |
| `maxTokens` | Maksimi tokenien määrä generoitavaksi | Kokonaisluku |
| `stopSequences` | Mukautetut sekvenssit, jotka lopettavat generoinnin kohdatessaan | Merkkijonotaulukko |
| `metadata` | Lisäparametrit palveluntarjoajakohtaisesti | JSON-objekti |

Monet LLM-palveluntarjoajat tukevat lisäparametreja `metadata`-kentän kautta, jotka voivat sisältää:

| Yleinen laajennusparametri | Kuvaus | Tyypillinen arvoalue |
|-----------|-------------|---------------|
| `top_p` | Nucleus-otanta – rajoittaa valinnan todennäköisimpien tokenien joukkoon | 0.0 - 1.0 |
| `top_k` | Rajoittaa token-valinnan korkeimman K vaihtoehtoon | 1 - 100 |
| `presence_penalty` | Rankaiseminen tokenien esiintymisen perusteella tekstissä | -2.0 - 2.0 |
| `frequency_penalty` | Rankaiseminen tokenien esiintymistiheyden mukaan tekstissä | -2.0 - 2.0 |
| `seed` | Kiinteä satunnaissiementä toistettaville tuloksille | Kokonaisluku |

## Esimerkkipyyntömalli

Tässä esimerkki otantapyynnöstä asiakaskohdassa MCP:ssä:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## Vastausmuoto

Asiakas palauttaa valmiin vastauksen:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## Ihmisen kontrolli mukana

MCP-otanta on suunniteltu ihmisen valvonnalla:

- **Kehoteissa**:
  - Asiakkaiden tulisi näyttää käyttäjille ehdotettu kehote
  - Käyttäjien tulisi voida muokata tai hylätä kehotteita
  - Järjestelmäkehote voidaan suodattaa tai muuttaa
  - Asiakas hallitsee kontekstin sisällyttämistä

- **Valmiissa vastauksissa**:
  - Asiakkaiden tulisi näyttää käyttäjille valmis vastaus
  - Käyttäjien tulisi voida muokata tai hylätä vastauksia
  - Asiakkaat voivat suodattaa tai muokata vastauksia
  - Käyttäjät valitsevat käytettävän mallin

Näillä periaatteilla katsotaan, miten otanta toteutetaan eri ohjelmointikielillä keskittyen yleisesti tuettuihin parametreihin LLM-palveluntarjoajien kesken.

## Turvallisuusnäkökohdat

Otantaa toteuttaessa MCP:ssä huomioi seuraavat parhaat turvallisuuskäytännöt:

- **Varmista viestisisällön validiteetti** ennen sen lähettämistä asiakkaalle
- **Puhdista arkaluontoiset tiedot** kehotteista ja valmiista vastauksista
- **Ota käyttöön rajoituksia** estämään väärinkäyttöä
- **Valvo otannan käyttöä** epäilyttävien mallien varalta
- **Salaa tiedot siirron aikana** turvallisilla protokollilla
- **Käsittele käyttäjätietojen yksityisyys** sovellettavien säädösten mukaisesti
- **Tarkasta otantapyynnöt** sääntöjen ja turvallisuuden varmistamiseksi
- **Hallitse kustannusvaikutuksia** sopivilla rajoituksilla
- **Käytä aikakatkaisuja** otantapyyntöihin
- **Käsittele mallivirheitä tyylikkäästi** asianmukaisten varajärjestelyjen avulla

Otannan parametrit mahdollistavat kielimallin käyttäytymisen hienosäädön halutun deterministisen ja luovan vasteen tasapainon saavuttamiseksi.

Katsotaan, miten näitä parametreja konfiguroidaan eri ohjelmointikielissä.

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

Edellä olevassa koodissa olemme:

- Luoneet MCP-asiakkaan tietylle palvelimen URL-osoitteelle.
- Määrittäneet pyynnön, jossa on otantaparametreja kuten `temperature`, `top_p` ja `top_k`.
- Lähettäneet pyynnön ja tulostaneet generoidun tekstin.
- Käyttäneet:
    - `allowedTools` määrittämään mitkä työkalut malli voi käyttää generoinnin aikana. Tässä sallitimme `ideaGenerator`- ja `marketAnalyzer`-työkalut auttamaan luovien sovellusideoiden luomisessa.
    - `frequencyPenalty` ja `presencePenalty` kontrolloimaan toistoa ja monimuotoisuutta tuotoksessa.
    - `temperature` hallitsemaan tuotoksen satunnaisuutta, missä korkeammat arvot johtavat luovempiin vastauksiin.
    - `top_p` rajoittamaan token-valintaa niihin, jotka muodostavat suurimman kumulatiivisen todennäköisyyden massan, parantaen tekstin laatua.
    - `top_k` rajoittamaan mallin valitsemaan todennäköisimmät K tokenia, mikä voi auttaa johdonmukaisempien vastausten tuottamisessa.
    - `frequencyPenalty` ja `presencePenalty` vähentämään toistoa ja edistämään monimuotoisuutta generoidussa tekstissä.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript-esimerkki: Lämpötila- ja Top-P-näytteenottokonfiguraatio
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Alusta MCP-asiakas
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Määritä pyyntö eri näytteenottoparametreilla
  const creativeSampling = {
    temperature: 0.9,    // Korkeampi lämpötila = enemmän satunnaisuutta/luovuutta
    topP: 0.92,          // Ota huomioon tokenit, joilla on 92 % todennäköisyysmassa
    frequencyPenalty: 0.6, // Vähennä token-jaksojen toistoa
    presencePenalty: 0.4   // Rangaista tokeneita, jotka ovat jo esiintyneet tekstissä
  };
  
  const factualSampling = {
    temperature: 0.2,    // Matala lämpötila = deterministisempi/tosiasiallisempi
    topP: 0.85,          // Hieman kohdennetumpi token-valinta
    frequencyPenalty: 0.2, // Minimaalinen toistotakuu
    presencePenalty: 0.1   // Minimaalinen esiintymisrangaistus
  };
  
  try {
    // Lähetä kaksi pyyntöä eri näytteenottokonfiguraatioilla
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

Edellä olevassa koodissa olemme:

- Alustaneet MCP-asiakkaan palvelimen URL-osoitteella ja API-avaimella.
- Määrittäneet kaksi otantaparametrien asetusta: yhden luoviin tehtäviin ja toisen faktuaalisiin tehtäviin.
- Lähettäneet pyynnöt näillä asetuksilla antaen mallin käyttää tiettyjä työkaluja kussakin tehtävässä.
- Tulostaneet generoituja vastauksia havainnollistaaksemme eri otantaparametrien vaikutuksia.
- Käyttäneet `allowedTools` määrittämään, mitkä työkalut malli voi käyttää generoinnissa. Tässä sallitimme `ideaGenerator`- ja `environmentalImpactTool`-työkalut luoviin tehtäviin sekä `factChecker`- ja `dataAnalysisTool`-työkalut faktuaalisiin tehtäviin.
- Käyttäneet `temperature` hallitsemaan tuotoksen satunnaisuutta, jossa korkeammat arvot johtavat luovempiin vastauksiin.
- Käyttäneet `top_p` rajoittamaan token-valintaa niihin, jotka muodostavat suurimman kumulatiivisen todennäköisyysmassan parantaen generoidun tekstin laatua.
- Käyttäneet `frequencyPenalty` ja `presencePenalty` vähentämään toistoa ja edistämään monimuotoisuutta tuotoksessa.
- Käyttäneet `top_k` rajoittamaan mallin valinta korkeimman todennäköisyyden omaaviin K tokeneihin, mikä voi auttaa johdonmukaisten vastausten generoinnissa.

---

## Deterministinen otanta

Sovelluksissa, jotka vaativat johdonmukaisia tuloksia, deterministinen otanta varmistaa toistettavat lopputulokset. Tämä saavutetaan käyttämällä kiinteää satunnaissiementä ja asettamalla lämpötila nollaksi.

Tarkastellaan alle esimerkkitoteutusta deterministisen otannan havainnollistamiseksi eri ohjelmointikielillä.

# [Java](#tab/java)

```java
// Java-esimerkki: Deterministiset vastaukset kiinteällä siemenellä
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Kiinteän siemenen käyttö determinististen tulosten saamiseksi
        
        // Ensimmäinen pyyntö kiinteällä siemenellä
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Nolla lämpötila maksimaalista determinismiä varten
            .build();
            
        // Toinen pyyntö samalla siemenellä
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Suorita molemmat pyynnöt
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Vastauksien tulisi olla identtiset saman siemenen ja lämpötilan 0 vuoksi
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Edellä olevassa koodissa olemme:

- Luoneet MCP-asiakkaan tietylle palvelimen URL-osoitteelle.
- Määrittäneet kaksi pyyntöä samalla kehotteella, kiinteällä siemenellä ja nollalämpötilalla.
- Lähettäneet molemmat pyynnöt ja tulostaneet generoidun tekstin.
- Havainnollistaneet, että vastaukset ovat identtisiä otannan deterministisen luonteen vuoksi (sama siemen ja lämpötila).
- Käyttäneet `setSeed` määrittämään kiinteän satunnaissiementä varmistaen, että malli tuottaa saman tuloksen joka kerta samalle syötteelle.
- Asetettu `temperature` arvoon nolla maksimaalisen determinismin saavuttamiseksi, jolloin malli valitsee aina todennäköisimmän seuraavan tokenin ilman satunnaisuutta.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript-esimerkki: Määritelmälliset vastaukset siemenen hallinnalla
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Ensimmäinen pyyntö kiinteällä siemenellä
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Nolla lämpötila maksimaaliseen määrämukaisuuteen
    });
    
    // Toinen pyyntö samalla siemenellä ja lämpötilalla
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Kolmas pyyntö eri siemenellä mutta samalla lämpötilalla
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

Edellä olevassa koodissa olemme:

- Alustaneet MCP-asiakkaan palvelimen URL-osoitteella.
- Määrittäneet kaksi pyyntöä samalla kehotteella, kiinteällä siemenellä ja nollalämpötilalla.
- Lähettäneet molemmat pyynnöt ja tulostaneet generoidun tekstin.
- Havainnollistaneet, että vastaukset ovat identtisiä otannan deterministisen luonteen vuoksi (sama siemen ja lämpötila).
- Käyttäneet `seed` määrittämään kiinteän satunnaissiementä, varmistaen saman tuloksen tuottamisen jokaisella samalle syötteelle.
- Asetettu `temperature` arvoon nolla maksimaalisen determinismin varmistamiseksi, jossa malli valitsee aina todennäköisimmän seuraavan tokenin ilman satunnaisuutta.
- Käytetty eri siementä kolmannessa pyynnössä osoittaakseen, että siemenen vaihtaminen johtaa erilaisiin vastauksiin, vaikka kehotteet ja lämpötila olisivat samat.

---

## Dynaaminen otantakonfiguraatio

Älykäs otanta mukauttaa parametreja kontekstin ja pyynnön vaatimusten mukaan. Tämä tarkoittaa, että parametreja kuten lämpötila, top_p ja rangaistukset säädetään dynaamisesti tehtävätyypin, käyttäjän mieltymysten tai historiallisen suorituskyvyn perusteella.

Katsotaan, miten dynaaminen otanta toteutetaan eri ohjelmointikielillä.

# [Python](#tab/python)

```python
# Python-esimerkki: Dynaaminen näytteenotto pyyntöyhteyden perusteella
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Määritä näytteenottopresettit eri tehtävätyypeille
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Valitse peruspresetti
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Säädä käyttäjän mieltymysten perusteella, jos niitä on annettu
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Skaalaa lämpötila luovuusmieltymyksen (1-10) perusteella
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Säädä top_p halutun vastausvaihtelun mukaan
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Luo ja lähetä pyyntö mukautetuilla näytteenottoparametreilla
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Palauta vastaus näytteenottometatietojen kanssa läpinäkyvyyden vuoksi
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Edellä olevassa koodissa olemme:

- Luoneet `DynamicSamplingService`-luokan, joka hallitsee adaptiivista otantaa.
- Määritelleet otantaesiasetukset eri tehtävätyypeille (luova, faktuaalinen, koodi, analyyttinen).
- Valinneet perusotanta-asetuksen tehtävän tyypin perusteella.
- Säädelleet otantaparametreja käyttäjän mieltymysten mukaan kuten luovuustaso ja monimuotoisuus.
- Lähetetty pyyntö dynaamisesti määritellyillä otantaparametreilla.
- Palautettu generoitua tekstiä soveltuvien otantaparametrien ja tehtävätyypin kanssa läpinäkyvyyden takaamiseksi.
- Käytetty `temperature` hallitsemaan satunnaisuutta, jossa korkeammat arvot johtavat luovempiin vastauksiin.
- Käytetty `top_p` rajoittamaan token-valintaa niihin, jotka muodostavat suurimman kumulatiivisen todennäköisyyksien massan, parantaen tekstin laatua.
- Käytetty `frequency_penalty` vähentämään toistoa ja kannustamaan monimuotoisuuteen tuotoksessa.
- Käytetty `user_preferences` mahdollistaen otantaparametrien mukautuksen käyttäjän määrittelemien luovuuden ja monimuotoisuuden tasojen mukaan.
- Käytetty `task_type` määrittämään sopiva otantastrategia pyynnölle, mahdollistaen räätälöidymmät vastaukset tehtävän luonteen perusteella.
- Käytetty `send_request` -metodia kehotteen lähettämiseen määriteltyjen otantaparametrien kanssa, varmistaen mallin tekstin generoinnin vaatimusten mukaisesti.
- Käytetty `generated_text` mallin vastauksen hakemiseen, joka palautetaan sovellettujen parametrien ja tehtävätyypin kanssa jatkoanalyysiä tai näyttöä varten.
- Käytetty `min` ja `max` -funktioita varmistamaan, että käyttäjän mieltymykset pysyvät sallituissa rajoissa, estäen virheelliset otantakonfiguraatiot.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript-esimerkki: Dynaaminen otantakonfiguraatio käyttäjäkontekstin perusteella
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Määrittele perustason otantaprofiilit
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Seuraa historiallista suorituskykyä
    this.performanceHistory = [];
  }
  
  // Tunnista tehtävätyyppi kehotteesta
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Yksinkertainen heuristinen tunnistus - voidaan parantaa koneoppimisen luokituksella
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // Oletusarvoisesti keskustelu, jos tyyppiä ei selkeästi tunnisteta
    return 'conversational';
  }
  
  // Laske otannan parametrit kontekstin ja käyttäjäasetusten perusteella
  getSamplingParameters(prompt, context = {}) {
    // Tunnista tehtävän tyyppi
    const taskType = this.detectTaskType(prompt, context);
    
    // Hae perusprofiili
    let params = {...this.samplingProfiles[taskType]};
    
    // Säädä käyttäjäasetusten mukaan
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Skaalaa 1-10 sopivaksi lämpötila-alueeksi
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Korkeampi tarkkuus tarkoittaa pienempää topP-arvoa (tarkempi valinta)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Korkeampi johdonmukaisuus tarkoittaa pienempiä rangaistuksia
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Käytä suoritushistorian opittuja säätöjä
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Yksinkertainen adaptiivinen logiikka - voidaan parantaa kehittyneemmillä algoritmeilla
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Huomioi vain viimeaikainen historia
    
    if (relevantHistory.length > 0) {
      // Laske suorituskyvyn keskiarvopisteet
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Jos suorituskyky on kynnysarvon alapuolella, säädä parametreja
      if (avgScore < 0.7) {
        // Hieman säädä turvallisempiin arvoihin
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Tallenna suorituskyky tulevia säätöjä varten
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 arvio vastauksen laadusta
    });
    
    // Rajoita historian kokoa
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Hae optimoidut otannan parametrit
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Lähetä pyyntö optimoiduilla parametreilla
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Jos käyttäjä antaa palautetta, tallenna se tulevaa optimointia varten
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// Esimerkkikäyttö
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Luova tehtävä, jossa omat käyttäjäasetukset
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Korkea luovuus (1-10)
          consistency: 3  // Matala johdonmukaisuus (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Koodin generointitehtävä
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Matala luovuus
          precision: 8,   // Korkea tarkkuus
          consistency: 9  // Korkea johdonmukaisuus
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

Edellä olevassa koodissa olemme:

- Luoneet `AdaptiveSamplingManager`-luokan hallitsemaan dynaamista otantaa tehtävätyypin ja käyttäjän mieltymysten pohjalta.
- Määritelleet otantaprofiilit eri tehtävätyypeille (luova, faktuaalinen, koodi, keskustelu).
- Toteuttaneet metodin, joka havaitsee tehtävätyypin kehotteesta yksinkertaisin heuristiikoin.
- Laskeneet otantaparametreja havaittuun tehtävätyyppiin ja käyttäjän mieltymyksiin perustuen.
- Soveltaneet historialliseen suorituskykyyn perustuvia opittuja säätöjä optimoidakseen otantaparametrit.
- Kirjanneet suoritustiedot tulevia säätöjä varten, mahdollistaen järjestelmän oppimisen aiemmista vuorovaikutuksista.
- Lähettäneet pyynnöt dynaamisesti määritellyillä otantaparametreilla ja palauttaneet generoidun tekstin sovellettujen parametrien ja tunnistetun tehtävätyypin kera.
- Käyttäneet:
    - `userPreferences` mahdollistaakseni otantaparametrien mukauttamisen käyttäjän määrittelemän luovuuden, tarkkuuden ja johdonmukaisuuden tason mukaan.
    - `detectTaskType` määrittämään tehtävän luonteen kehotteen perusteella, mahdollistaen räätälöidympiä vastauksia.
    - `recordPerformance` kirjaamaan generoituja vastauksia suorituskyvyn seuraamiseksi, antaen järjestelmän sopeutua ja kehittyä ajan myötä.
    - `applyLearnedAdjustments` muokkaamaan otantaparametreja historiallisen suorituskyvyn perusteella, parantaen mallin kykyä tuottaa laadukkaita vastauksia.
    - `generateResponse` kapseloimaan koko prosessin adaptiivisella otannalla, helpottaen kutsua eri kehotteilla ja konteksteissa.
    - `allowedTools` määrittämään, mitä työkaluja malli voi käyttää generoinnin aikana, mahdollistaen kontekstisensitiivisempiä vastauksia.
    - `feedbackScore` mahdollistamaan käyttäjille palautteen antamisen generoidun vastauksen laadusta, jota voidaan käyttää mallin suorituskyvyn parantamiseen ajan myötä.
    - `performanceHistory` ylläpitämään aiempien vuorovaikutusten tietoja, antaen järjestelmän oppia menneistä onnistumisista ja epäonnistumisista.
    - `getSamplingParameters` dynaamisesti muokkaamaan otantaparametreja pyynnön kontekstin perusteella, mahdollistaen joustavamman ja reaktiivisemman mallin käyttäytymisen.
    - `detectTaskType` luokittelemaan tehtävä kehotteen perusteella, mahdollistaen järjestelmän soveltaa sopivia otantastrategioita eri pyyntölajeihin.
    - `samplingProfiles` määrittelemään perustason otantakonfiguraatiot eri tehtävätyypeille, mahdollistaen nopean säädön pyynnön luonteen mukaan.

---

## Mitä seuraavaksi

- [5.7 Skaalaus](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->