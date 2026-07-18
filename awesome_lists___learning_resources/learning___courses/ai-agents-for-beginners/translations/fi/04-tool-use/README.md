[![Kuinka suunnitella hyviä tekoälyagentteja](../../../translated_images/fi/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Napsauta yllä olevaa kuvaa nähdäksesi tämän oppitunnin videon)_

# Työkalukäytön suunnittelumalli

Työkalut ovat mielenkiintoisia, koska niiden avulla tekoälyagentit voivat saada laajemman kirjon kykyjä. Sen sijaan, että agentilla olisi rajallinen joukko suoritettavia toimintoja, työkalun lisäämällä agentti voi nyt suorittaa laajan valikoiman toimintoja. Tässä luvussa tarkastelemme työkalukäytön suunnittelumallia, joka kuvaa, kuinka tekoälyagentit voivat käyttää tiettyjä työkaluja saavuttaakseen tavoitteensa.

## Johdanto

Tässä oppitunnissa pyrimme vastaamaan seuraaviin kysymyksiin:

- Mikä on työkalukäytön suunnittelumalli?
- Mihin käyttötapauksiin sitä voidaan soveltaa?
- Mitkä ovat suunnittelumallin toteuttamiseen tarvittavat osat/rakennuspalikat?
- Mitä erityisiä huomioita tulee ottaa huomioon luotettavien tekoälyagenttien rakentamisessa käyttäen työkalukäytön suunnittelumallia?

## Oppimistavoitteet

Tässä oppitunnissa opit:

- Määrittelemään työkalukäytön suunnittelumallin ja sen tarkoituksen.
- Tunnistamaan käyttötapauksia, joissa työkalukäytön suunnittelumalli on sovellettavissa.
- Ymmärtämään keskeiset elementit, joita mallin toteuttamiseen tarvitaan.
- Tunnistamaan luotettavuutta varmistavat seikat tekoälyagenteissa, jotka käyttävät tätä suunnittelumallia.

## Mikä on työkalukäytön suunnittelumalli?

**Työkalukäytön suunnittelumalli** keskittyy antamaan suurille kielimalleille (LLM) kyvyn olla vuorovaikutuksessa ulkoisten työkalujen kanssa saavuttaakseen erityisiä tavoitteita. Työkalut ovat koodia, jota agentti voi suorittaa toimiakseen. Työkalu voi olla yksinkertainen funktio, kuten laskin, tai kolmannen osapuolen palveluun tehtävä API-kutsu, kuten osakekurssin tai sääennusteen haku. Tekoälyagenttien yhteydessä työkalut on suunniteltu suoritettavaksi agenttien toimesta mallin luomien funktiokutsujen vastauksena.

## Mihin käyttötapauksiin sitä voidaan soveltaa?

Tekoälyagentit voivat hyödyntää työkaluja monimutkaisten tehtävien suorittamiseen, tiedon hakemiseen tai päätösten tekemiseen. Työkalukäytön suunnittelumallia käytetään usein tilanteissa, joissa tarvitaan dynaamista vuorovaikutusta ulkoisten järjestelmien, kuten tietokantojen, verkkopalveluiden tai koodintulkitsijoiden kanssa. Tämä kyky on hyödyllinen monissa eri käyttötapauksissa, kuten:

- **Dynaaminen tiedonhaku:** Agentit voivat kyselyttää ulkoisia API-rajapintoja tai tietokantoja hakeakseen ajantasaisia tietoja (esim. SQLite-tietokannasta tiedon analysointi, osakekurssien tai säätilatietojen hakeminen).
- **Koodin suoritus ja tulkinta:** Agentit voivat suorittaa koodia tai skriptejä matemaattisten ongelmien ratkaisemiseksi, raporttien luomiseksi tai simulaatioiden tekemiseksi.
- **Työnkulun automaatio:** Toistuvien tai monivaiheisten työnkulkujen automatisointi integroimalla työkaluja, kuten tehtävien ajastimia, sähköpostipalveluita tai dataputkia.
- **Asiakastuki:** Agentit voivat olla vuorovaikutuksessa CRM-järjestelmien, tukipalvelun lippujärjestelmien tai tietopohjien kanssa käyttäjäkyselyiden ratkaisemiseksi.
- **Sisällön luonti ja muokkaus:** Agentit voivat käyttää työkaluja, kuten kielioppitarkistimia, tekstin tiivistäjiä tai sisällön turvallisuusarvioijia avustamaan sisällöntuotannossa.

## Mitkä ovat työkalukäytön suunnittelumallin toteuttamiseen tarvittavat osat/rakennuspalikat?

Nämä rakennuspalikat mahdollistavat tekoälyagentin suorittaa monenlaisia tehtäviä. Tarkastellaan keskeisiä elementtejä työkalukäytön suunnittelumallin toteuttamiseksi:

- **Funktio-/työkalukaaviot:** Yksityiskohtaiset määrittelyt käytettävissä olevista työkaluista, mukaan lukien funktion nimi, tarkoitus, vaaditut parametrit ja odotetut tulokset. Nämä kaaviot mahdollistavat LLM:lle ymmärtää, mitä työkaluja on käytettävissä ja miten voi muodostaa päteviä pyyntöjä.

- **Funktion suorituslogiikka:** Ohjaa, miten ja milloin työkaluja käytetään käyttäjän tarkoituksen ja keskustelukontekstin perusteella. Tämä voi sisältää suunnittelumoduuleja, reititysmekanismeja tai ehtovirtoja, jotka määrittävät työkalujen käytön dynaamisesti.

- **Viestinkäsittelyjärjestelmä:** Komponentit, jotka hallinnoivat keskustelun kulkua käyttäjän syötteiden, LLM-vastausten, työkalukutsujen ja työkalujen tuottamien vastausten välillä.

- **Työkalujen integraatiokehys:** Infrastruktuuri, joka yhdistää agentin erilaisiin työkaluihin, olivatpa ne yksinkertaisia funktioita tai monimutkaisia ulkoisia palveluita.

- **Virheiden käsittely ja validointi:** Mekanismit työkalujen suorituksen virheiden käsittelemiseen, parametrien validointiin ja odottamattomien vastausten hallintaan.

- **Tilanhallinta:** Seuraa keskustelun kontekstia, aiempia työkalujen vuorovaikutuksia ja pysyvää dataa varmistaakseen johdonmukaisuuden monivaiheisissa vuorovaikutuksissa.

Seuraavaksi tarkastelemme funktioiden/työkalujen kutsumista tarkemmin.
 
### Funktion/työkalun kutsuminen

Funktion kutsuminen on ensisijainen tapa, jolla mahdollistamme suurten kielimallien (LLM) vuorovaikutuksen työkalujen kanssa. Näet usein 'funktion' ja 'työkalun' käytettävän vaihdellen, koska 'funktiot' (uudelleenkäytettävän koodin lohkot) ovat työkaluja, joita agentit käyttävät tehtävien suorittamiseen. Jotta funktion koodia voidaan kutsua, LLM:n täytyy verrata käyttäjän pyyntöä funktion kuvaukseen. Tätä varten kaikki käytettävissä olevat funktiot sisältävä kaavio lähetetään LLM:lle. LLM valitsee tehtävään sopivimman funktion ja palauttaa sen nimen sekä argumentit. Valittu funktio suoritetaan, sen vastaus lähetetään takaisin LLM:lle, joka käyttää tätä tietoa vastatakseen käyttäjän pyyntöön.

Kehittäjien toteuttaessa funktiokutsuja agenteille tarvitsette:

1. LLM-malli, joka tukee funktiokutsuja
2. Kaavio, joka sisältää funktioiden kuvaukset
3. Koodin jokaiselle kuvatulle funktiolle

Käytetään esimerkkinä ajankohdan hakua kaupungissa:

1. **Alusta LLM, joka tukee funktiokutsuja:**

    Kaikki mallit eivät tue funktiokutsuja, joten on tärkeää varmistaa, että käyttämäsi LLM tukee niitä. <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> tukee funktiokutsuja. Voimme aloittaa luomalla OpenAI-asiakkaan Azure OpenAI **Responses API**:a (vakaa `/openai/v1/` -päätepiste — ilman `api_version`-määritystä) vastaan.

    ```python
    # Alusta OpenAI-asiakas Azure OpenAI:lle (Responses API, v1-päätepiste)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Luo funktiokaavio**:

    Määrittelemme seuraavaksi JSON-kaavion, joka sisältää funktion nimen, kuvauksen siitä, mitä funktio tekee, sekä funktioparametrien nimet ja kuvaukset.
    Käytämme sitten tätä kaaviota aiemmin luodulle asiakkaalle yhdessä käyttäjän pyynnön kanssa, joka hakee ajan San Franciscossa. On tärkeää huomata, että **työkalukutsu** on se, mikä palautetaan, **ei** lopullinen vastaus kysymykseen. Kuten aiemmin mainittiin, LLM palauttaa funktion nimen, jonka se valitsi tehtävään, sekä sille annettavat argumentit.

    ```python
    # Funktiokuvailu mallin luettavaksi (Responses API tasainen työkalumuoto)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # Alkuperäinen käyttäjän viesti
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Ensimmäinen API-kutsu: Pyydä mallia käyttämään toimintoa
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Vastaukset API palauttaa työkalukutsut function_call-kohteina response.outputissa.
    # Liitä ne keskusteluun, jotta mallilla on täydellinen konteksti seuraavalla kierroksella.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Toiminnallisen koodin toteutus tehtävän suorittamiseksi:**

    Nyt kun LLM on valinnut, mikä funktio suoritetaan, tehtävän suorittava koodi pitää toteuttaa ja ajaa.
    Voimme toteuttaa Python-koodin ajan hakemiseksi. Meidän täytyy myös kirjoittaa koodi, joka purkaa vastauksesta funktion nimen ja argumentit lopullisen tuloksen saamiseksi.

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # Käsittele funktiokutsut
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Palauta työkalun tulos function_call_output-kohteena
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Toinen API-kutsu: Hae lopullinen vastaus mallilta
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

Funktiokutsut ovat monen, ellei kaikkien agenttien työkalukäytön suunnittelun ytimessä, mutta niiden toteuttaminen alusta asti voi toisinaan olla haastavaa.
Kuten opimme [Oppitunti 2:ssa](../../../02-explore-agentic-frameworks), agenttikehykset tarjoavat valmiita rakennuspalikoita työkalukäytön toteuttamiseen.
 
## Työkalukäytön esimerkkejä agenttikehyksillä

Tässä on joitakin esimerkkejä siitä, miten voit toteuttaa työkalukäytön suunnittelumallin eri agenttikehyksillä:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> on avoimen lähdekoodin tekoälykehys tekoälyagenttien rakentamiseen. Se yksinkertaistaa funktiokutsujen käyttöä sallimalla työkalujen määrittelyn Python-funktioina `@tool`-koristelijan avulla. Kehys hoitaa mallin ja koodisi välisen viestinnän molempiin suuntiin. Se tarjoaa myös pääsyn valmiisiin työkaluihin, kuten Tiedoston hakuun ja Koodin tulkkaukseen `FoundryChatClient`in kautta.

Seuraava kaavio kuvaa funktiokutsuprosessia Microsoft Agent Frameworkin kanssa:

![funktiokutsu](../../../translated_images/fi/functioncalling-diagram.a84006fc287f6014.webp)

Microsoft Agent Frameworkissa työkalut määritellään koristeltuina funktioina. Voimme muuttaa aiemmin näkemämme `get_current_time` -funktion työkaluksi käyttämällä `@tool`-koristelijaa. Kehys sarjallistaa automaattisesti funktion ja sen parametrien tiedot, luoden kaavion, joka lähetetään LLM:lle.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Luo asiakas
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Luo agentti ja suorita työkalulla
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> on uudempi agenttikehys, joka on suunniteltu antamaan kehittäjille mahdollisuus rakentaa, ottaa käyttöön ja skaalata turvallisesti korkealaatuisia ja laajennettavia tekoälyagentteja ilman, että heidän tarvitsee hallita taustalla olevia laskenta- ja tallennusresursseja. Se on erityisen hyödyllinen yrityssovelluksissa, koska se on täysin hallinnoitu palvelu yritystason turvallisuudella.

Verrattuna suoraan LLM-rajapinnan käyttöön Microsoft Foundry Agent Service tarjoaa joitakin etuja, kuten:

- Automaattinen työkalukutsujen käsittely – sinun ei tarvitse enää jäsentää työkalukutsua, kutsua työkalua tai käsitellä vastausta; kaikki tämä tehdään palvelinpuolella
- Turvallisesti hallittu data – sen sijaan, että hallitsisit omaa keskustelutilaa, voit luottaa säikeisiin, jotka tallentavat kaiken tarvittavan tiedon
- Valmiit työkalut – Työkaluja, joilla voit olla vuorovaikutuksessa tietolähteidesi kanssa, kuten Bing, Azure AI Search ja Azure Functions.

Microsoft Foundry Agent Servicen työkalut voidaan jakaa kahteen ryhmään:

1. Tietotyökalut:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing-pohjainen perustaminen</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Tiedoston haku</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Toimintatyökalut:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Funktiokutsut</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Koodin tulkki</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI-määritellyt työkalut</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Agenttipalvelun avulla voimme käyttää näitä työkaluja yhdessä `työkalupakkina`. Se käyttää myös `säikeitä`, jotka seuraavat tietyn keskustelun viestihistoriaa.

Kuvitellaan, että olet myyntiedustaja yrityksessä nimeltä Contoso. Haluat kehittää keskusteluagentin, joka voi vastata kysymyksiin myyntitiedoistasi.

Seuraava kuva havainnollistaa, miten voit käyttää Microsoft Foundry Agent Serviceä myyntitietojesi analysointiin:

![Agenttipalvelu toiminnassa](../../../translated_images/fi/agent-service-in-action.34fb465c9a84659e.webp)

Käyttääksesi mitä tahansa näistä työkaluista palvelun kanssa, voimme luoda asiakkaan ja määritellä työkalun tai työkalupakin. Käytännön toteutukseen voimme käyttää seuraavaa Python-koodia. LLM pystyy katsomaan työkalupakkia ja päättämään, käytetäänkö käyttäjän luomaa funktiota `fetch_sales_data_using_sqlite_query` vai valmista Koodin tulkkia käyttäjän pyynnön mukaan.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query-funktio, joka löytyy fetch_sales_data_functions.py-tiedostosta.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Työkalupaketin alustaminen
toolset = ToolSet()

# Funktiokutsuvälittäjän alustaminen fetch_sales_data_using_sqlite_query-funktiolla ja lisäämällä se työkalupakettiin
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Kooditulkin työkalun alustaminen ja lisääminen työkalupakettiin.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Mitä erityisiä huomioita tulee ottaa huomioon työkalukäytön suunnittelumallin käytössä luotettavien tekoälyagenttien rakentamisessa?

Yleinen huolenaihe LLM:ien dynaamisesti generoiman SQL-koodin suhteen on turvallisuus, erityisesti SQL-injektioiden tai pahantahtoisten toimenpiteiden, kuten tietokannan poistamisen tai manipuloinnin riski. Vaikka nämä huolenaiheet ovat päteviä, ne voidaan tehokkaasti minimoida asianmukaisella tietokantaoikeuksien konfiguroinnilla. Useimpien tietokantojen kohdalla tämä tarkoittaa tietokannan määrittämistä vain luku -tilaan. PostgreSQL:n tai Azure SQL:n kaltaisissa tietokantapalveluissa sovellukselle tulisi määrittää vain luku (SELECT) -rooli.

Sovelluksen ajaminen turvallisessa ympäristössä lisää suojaa edelleen. Yritysskenaarioissa data tyypillisesti erotetaan operatiivisista järjestelmistä ja siirretään muokattuun, vain luku -tilassa olevaan tietokantaan tai tietovarastoon käyttäjäystävällisellä kaaviolla. Tämä lähestymistapa varmistaa, että data on turvallista, optimoitua suorituskyvyn ja saavutettavuuden kannalta sekä että sovelluksella on rajoitetut, vain luku -oikeudet.

## Esimerkkikoodit

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Onko sinulla lisää kysymyksiä työkalukäytön suunnittelumalleista?

Liity [Microsoft Foundry Discordiin](https://discord.com/invite/ATgtXmAS5D) tavata muita oppijoita, osallistua toimistotunteihin ja saada vastauksia tekoälyagenttikysymyksiisi.

## Lisämateriaalit

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service -työpaja</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Moni-agentti-workshop</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework - Yleiskatsaus</a>


## Tämän agentin pikainen testaus (valinnainen)

Kun olet oppinut ottamaan agentit käyttöön [Oppitunti 16:ssa](../16-deploying-scalable-agents/README.md), voit suorittaa tämän oppitunnin `TravelToolAgent`-agentin pikakokeet (kutsuvatko ne edelleen työkalujaan ja vastaavatko?) tiedostolla [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Katso tiedostosta [`tests/README.md`](../tests/README.md) ohjeet testin suorittamiseen.

## Edellinen oppitunti

[Agenttimuotoilumallien ymmärtäminen](../03-agentic-design-patterns/README.md)

## Seuraava oppitunti

[Agenttimuotoinen RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->