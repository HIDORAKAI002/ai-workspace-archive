[![Tutustu AI-agenttikehyksiin](../../../translated_images/fi/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Napsauta yllä olevaa kuvaa nähdäksesi tämän oppitunnin videon)_

# Tutustu AI-agenttikehyksiin

AI-agenttikehykset ovat ohjelmistoalustoja, jotka on suunniteltu helpottamaan AI-agenttien luomista, käyttöönottoa ja hallintaa. Nämä kehykset tarjoavat kehittäjille valmiiksi rakennettuja komponentteja, abstraktioita ja työkaluja, jotka tehostavat monimutkaisten AI-järjestelmien kehitystä.

Nämä kehykset auttavat kehittäjiä keskittymään sovellustensa ainutlaatuisiin osa-alueisiin tarjoamalla standardoituja lähestymistapoja yleisiin AI-agenttien kehittämisen haasteisiin. Ne parantavat skaalautuvuutta, saavutettavuutta ja tehokkuutta AI-järjestelmien rakentamisessa.

## Johdanto

Tässä oppitunnissa käsitellään:

- Mitä AI-agenttikehykset ovat ja mitä ne mahdollistavat kehittäjille?
- Kuinka tiimit voivat käyttää näitä nopeasti prototyypin tekemiseen, iterointiin ja agenttinsa kyvykkyyksien parantamiseen?
- Mitkä ovat Microsoftin luomien kehysten ja työkalujen erot (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> ja <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>) välillä?
- Voinko integroida olemassa olevat Azure-ekosysteemini työkalut suoraan, vai tarvitseeko minun käyttää itsenäisiä ratkaisuja?
- Mikä on Microsoft Foundry Agent Service ja miten se auttaa minua?

## Oppimistavoitteet

Tämän oppitunnin tavoitteena on auttaa sinua ymmärtämään:

- AI-agenttikehysten rooli AI-kehityksessä.
- Kuinka hyödyntää AI-agenttikehyksiä älykkäiden agenttien rakentamisessa.
- Tärkeimmät AI-agenttikehysten mahdollistamat kyvykkyydet.
- Erot Microsoft Agent Frameworkin ja Microsoft Foundry Agent Servicen välillä.

## Mitä AI-agenttikehykset ovat ja mitä ne mahdollistavat kehittäjille?

Perinteiset AI-kehykset voivat auttaa sinua integroimaan AI:n sovelluksiisi ja tekemään näistä sovelluksista parempia seuraavilla tavoilla:

- **Personalisointi**: AI voi analysoida käyttäjän käyttäytymistä ja mieltymyksiä tarjotakseen henkilökohtaisia suosituksia, sisältöä ja kokemuksia.
Esimerkki: Netflixin kaltaiset suoratoistopalvelut käyttävät AI:ta ehdottamaan elokuvia ja sarjoja katseluhistorian perusteella, mikä parantaa käyttäjien sitoutumista ja tyytyväisyyttä.
- **Automaatio ja tehokkuus**: AI voi automatisoida toistuvia tehtäviä, virtaviivaistaa työnkulkuja ja parantaa toiminnan tehokkuutta.
Esimerkki: Asiakaspalvelusovellukset käyttävät AI-pohjaisia chatbotteja käsittelemään yleisiä kyselyjä, mikä lyhentää vastausaikoja ja vapauttaa ihmiskonsultit hoitamaan monimutkaisempia asioita.
- **Parannettu käyttökokemus**: AI voi parantaa kokonaisvaltaista käyttökokemusta tarjoamalla älykkäitä ominaisuuksia, kuten puheentunnistusta, luonnollisen kielen käsittelyä ja ennakoivaa kirjoitusta.
Esimerkki: Virtuaaliassistentit kuten Siri ja Google Assistant käyttävät AI:ta ymmärtääkseen ja vastatakseen puhekäskyihin, helpottaen käyttäjien laitteiden käyttöä.

### Tämä kaikki kuulostaa erinomaiselta, mutta miksi tarvitsemme AI-agenttikehystä?

AI-agenttikehykset ovat enemmän kuin pelkkiä AI-kehyksiä. Ne on suunniteltu mahdollistamaan älykkäiden agenttien luominen, jotka voivat olla vuorovaikutuksessa käyttäjien, muiden agenttien ja ympäristön kanssa saavuttaakseen tiettyjä tavoitteita. Nämä agentit voivat ilmaista itseohjautuvaa käyttäytymistä, tehdä päätöksiä ja sopeutua muuttuviin olosuhteisiin. Tarkastellaanpa joitakin AI-agenttikehysten mahdollistamia keskeisiä kyvykkyyksiä:

- **Agenttien yhteistyö ja koordinointi**: Mahdollistaa useiden AI-agenttien luomisen, jotka voivat työskennellä yhdessä, kommunikoida ja koordinoida ratkaistakseen monimutkaisia tehtäviä.
- **Tehtävien automaatio ja hallinta**: Tarjoaa mekanismeja monivaiheisten työnkulkujen automatisointiin, tehtävien delegointiin ja dynaamiseen tehtävähallintaan agenttien kesken.
- **Kontekstuaalinen ymmärrys ja sopeutuminen**: Varustaa agentit kyvyllä ymmärtää konteksti, sopeutua muuttuviin ympäristöihin ja tehdä päätöksiä reaaliaikaisen tiedon perusteella.

Yhteenvetona agentit antavat sinulle mahdollisuuden tehdä enemmän, viedä automaation uudelle tasolle ja luoda älykkäämpiä järjestelmiä, jotka voivat sopeutua ja oppia ympäristöstään.

## Kuinka nopeasti prototypoida, iteratiivisesti kehittää ja parantaa agentin kyvykkyyksiä?

Tämä ala kehittyy nopeasti, mutta useimmissa AI-agenttikehyksissä on yhteisiä piirteitä, jotka auttavat nopeassa prototypoinnissa ja iteroinnissa, nimittäin modulaariset komponentit, yhteistyötyökalut ja reaaliaikainen oppiminen. Sukelletaan näihin!

- **Käytä modulaarisia komponentteja**: AI SDK:t tarjoavat valmiiksi rakennettuja komponentteja kuten AI- ja muistikytkimiä, toiminnon kutsumista luonnollisen kielen tai koodin laajennusten avulla, kehotepohjia ja muuta.
- **Hyödynnä yhteistyötyökaluja**: Suunnittele agentteja, joilla on erityisiä rooleja ja tehtäviä, mahdollistaen heidän testata ja kehittää yhteistyön työnkulkuja.
- **Opiskele reaaliajassa**: Toteuta palautesilmukoita, joissa agentit oppivat vuorovaikutuksista ja mukauttavat käyttäytymistään dynaamisesti.

### Käytä modulaarisia komponentteja

SDK:t kuten Microsoft Agent Framework tarjoavat valmiiksi rakennettuja komponentteja, kuten AI-kytkimiä, työkalumääritelmiä ja agenttien hallintaa.

**Kuinka tiimit voivat hyödyntää näitä**: Tiimit voivat nopeasti koota nämä komponentit toimivaksi prototyypiksi ilman, että aloittavat tyhjästä, mikä mahdollistaa nopean kokeilun ja iteroinnin.

**Käytännössä**: Voit käyttää valmista jäsentä tietojen poimimiseen käyttäjän syötteestä, muistimoduulia tietojen tallentamiseen ja hakemiseen sekä kehotegeneraattoria käyttäjän kanssa vuorovaikuttamiseen – kaikki tämä ilman, että sinun tarvitsee rakentaa komponentteja alusta alkaen.

**Esimerkkikoodi**. Katsotaan esimerkkiä, jossa Microsoft Agent Frameworkia käytetään `FoundryChatClient`-luokan kanssa, jotta malli vastaa käyttäjän syötteeseen työkalun kutsumisen avulla:

``` python
# Microsoft Agent Framework Python -esimerkki

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Määritä esimerkkityökalufunktio matkavarauksen tekemiseen
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # Esimerkkituloste: Lentosi New Yorkiin 1. tammikuuta 2025 on varattu onnistuneesti. Hyvää matkaa! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Tässä esimerkissä näet, miten voit hyödyntää valmista jäsentä poimiaksesi tärkeitä tietoja käyttäjän syötteestä, kuten lennon varauksen lähtöpaikan, määränpään ja päivämäärän. Tämä modulaarinen lähestymistapa antaa sinun keskittyä ylintason logiikkaan.

### Hyödynnä yhteistyötyökaluja

Kehykset kuten Microsoft Agent Framework helpottavat useiden agenttien luomista, jotka voivat työskennellä yhdessä.

**Kuinka tiimit voivat hyödyntää näitä**: Tiimit voivat suunnitella agentteja, joilla on erityiset roolit ja tehtävät, mahdollistaen heille yhteistyön työnkulkujen testaamisen ja parantamisen sekä yleisen järjestelmän tehokkuuden kasvattamisen.

**Käytännössä**: Voit luoda agenttitiimin, jossa jokaisella agentilla on erikoistunut tehtävä, kuten datan haku, analyysi tai päätöksenteko. Nämä agentit voivat kommunikoida ja jakaa tietoa saavuttaakseen yhteisen tavoitteen, kuten käyttäjän kysymyksen vastaamisen tai tehtävän suorittamisen.

**Esimerkkikoodi (Microsoft Agent Framework)**:

```python
# Useiden agenttien luominen, jotka työskentelevät yhdessä Microsoft Agent Frameworkin avulla

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Tietojenhankinta-agentti
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Tietojen analysointiin tarkoitettu agentti
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Ajeta agentit tehtävän suorittamiseksi peräkkäin
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Edellisessä koodissa näet, kuinka voit luoda tehtävän, joka sisältää useiden agenttien yhteistyön datan analysoimiseksi. Jokainen agentti suorittaa tietyn tehtävän, ja tehtävä toteutetaan koordinoimalla agenttien toimintaa halutun lopputuloksen saavuttamiseksi. Erikoistuneiden agenttien luominen parantaa tehtävien tehokkuutta ja suorituskykyä.

### Opiskele reaaliajassa

Kehittyneet kehykset tarjoavat kyvykkyyksiä reaaliaikaisen kontekstin ymmärtämiseen ja sopeutumiseen.

**Kuinka tiimit voivat hyödyntää näitä**: Tiimit voivat toteuttaa palautesilmukoita, joissa agentit oppivat vuorovaikutuksista ja sopeuttavat käyttäytymistään dynaamisesti, mikä johtaa kyvykkyyksien jatkuvaan parantamiseen ja hienosäätöön.

**Käytännössä**: Agentit voivat analysoida käyttäjäpalautetta, ympäristötietoja ja tehtävän tuloksia päivittääkseen tietopohjaansa, mukauttaakseen päätöksentekoalgoritmejaan ja parantaakseen suorituskykyään ajan myötä. Tämä iteratiivinen oppimisprosessi mahdollistaa agenttien sopeutumisen muuttuviin olosuhteisiin ja käyttäjän mieltymyksiin, parantaen järjestelmän kokonaistoimivuutta.

## Mitä ovat erot Microsoft Agent Frameworkin ja Microsoft Foundry Agent Servicen välillä?

Näitä lähestymistapoja voi vertailla monin tavoin, mutta katsotaanpa joitakin keskeisiä eroja suunnittelun, kyvykkyyksien ja kohdekäyttötapausten osalta:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework tarjoaa virtaviivaisen SDK:n AI-agenttien rakentamiseen `FoundryChatClient`-luokan avulla. Se mahdollistaa kehittäjien luoda agentteja, jotka hyödyntävät Azure OpenAI -malleja sisäänrakennetulla työkalukutsulla, keskustelun hallinnalla ja yritystason turvallisuudella Azure-identiteetin kautta.

**Käyttötapaukset**: Tuotantovalmiiden AI-agenttien rakentaminen, joissa on työkalujen käyttö, monivaiheiset työnkulut ja yritysintegrointiskenaariot.

Tässä joitakin Microsoft Agent Frameworkin keskeisiä käsitteitä:

- **Agentit**. Agentti luodaan `FoundryChatClient`-luokalla ja konfiguroidaan nimellä, ohjeistuksilla ja työkaluilla. Agentti voi:
  - **Käsitellä käyttäjän viestejä** ja tuottaa vastauksia Azure OpenAI -mallien avulla.
  - **Kutsua työkaluja** automaattisesti keskustelun kontekstin perusteella.
  - **Ylläpitää keskustelun tilaa** useiden vuorovaikutusten ajan.

  Tässä on koodikatkelma, joka näyttää, miten agentti luodaan:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **Työkalut**. Kehys tukee työkalujen määrittelyä Python-funktioina, joita agentti voi kutsua automaattisesti. Työkalut rekisteröidään agentin luomisvaiheessa:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **Moniagenttikoordinointi**. Voit luoda useita agentteja eri erikoistumisilla ja koordinoida heidän työtään:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Azure-identiteetin integraatio**. Kehys käyttää `AzureCliCredential`- tai `DefaultAzureCredential`-tunnistautumista turvalliseen, avaimettomaan autentikointiin, jolloin API-avaimien hallintaa ei tarvita.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service on uudempi lisäys, joka esiteltiin Microsoft Ignite 2024 -tapahtumassa. Se mahdollistaa AI-agenttien kehityksen ja käyttöönoton joustavammilla malleilla, kuten avoimen lähdekoodin LLM:ien (esim. Llama 3, Mistral ja Cohere) suoran kutsumisen avulla.

Microsoft Foundry Agent Service tarjoaa vahvempia yritystason turvallisuusmekanismeja ja tietojen tallennusmenetelmiä, joten se soveltuu hyvin yrityskäyttöön.

Se toimii suoraan yhdessä Microsoft Agent Frameworkin kanssa agenttien rakentamiseksi ja käyttöönottoon.

Palvelu on tällä hetkellä julkisessa esikatseluvaiheessa ja tukee Pythonia ja C#:tä agenttien luomisessa.

Käyttämällä Microsoft Foundry Agent Servicen Python SDK:ta voimme luoda agentin käyttäjän määrittämällä työkalulla:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Määrittele työkalufunktiot
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### Keskeiset käsitteet

Microsoft Foundry Agent Servicellä on seuraavat keskeiset käsitteet:

- **Agentti**. Microsoft Foundry Agent Service integroituu Microsoft Foundryn kanssa. Microsoft Foundryn sisällä AI-agentti toimii "älykkäänä" mikropalveluna, jota voidaan käyttää kysymysten vastaamiseen (RAG), toimien suorittamiseen tai työnkulkujen täydelliseen automatisointiin. Tämä saavutetaan yhdistämällä generatiivisten AI-mallien voima työkaluihin, jotka antavat agentille pääsyn ja vuorovaikutuksen todellisten datalähteiden kanssa. Tässä on esimerkki agentista:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    Tässä esimerkissä agentti on luotu mallilla `gpt-4.1-mini`, nimellä `my-agent` ja ohjeistuksella `You are helpful agent`. Agentilla on käytettävissään työkaluja ja resursseja koodin tulkintatehtäviin.

- **Keskusteluketju ja viestit**. Keskusteluketju on toinen tärkeä käsite. Se edustaa vuorovaikutusta agentin ja käyttäjän välillä. Ketjuja voidaan käyttää keskustelun etenemisen seuraamiseen, kontekstin tallentamiseen ja vuorovaikutuksen tilan hallintaan. Tässä on esimerkki keskusteluketjusta:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Pyydä agenttia tekemään työtä ketjussa
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Hae ja kirjaa kaikki viestit nähdäksesi agentin vastauksen
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    Edellisessä koodissa ketju luodaan. Sen jälkeen ketjuun lähetetään viesti. Kutsumalla `create_and_process_run` pyydetään agenttia suorittamaan tehtävä ketjussa. Lopuksi viestit haetaan ja kirjataan, jotta nähdään agentin vastaus. Viestit osoittavat käyttäjän ja agentin välisen keskustelun etenemisen. On myös tärkeää ymmärtää, että viestit voivat olla eri tyyppejä, kuten tekstiä, kuvaa tai tiedostoa, eli agentin työ on saattanut tuottaa esimerkiksi kuvan tai tekstivastauksen. Kehittäjänä voit käyttää tätä tietoa jatkokäsittelyyn tai esittää vastauksen käyttäjälle.

- **Integroituu Microsoft Agent Frameworkin kanssa**. Microsoft Foundry Agent Service toimii saumattomasti Microsoft Agent Frameworkin kanssa, mikä tarkoittaa, että voit rakentaa agentteja käyttäen `FoundryChatClient`-luokkaa ja ottaa ne tuotantoon Agent Servicen kautta.

**Käyttötapaukset**: Microsoft Foundry Agent Service on suunniteltu yrityssovelluksiin, jotka vaativat turvallista, skaalautuvaa ja joustavaa AI-agenttien käyttöönottoa.

## Mikä on ero näiden lähestymistapojen välillä?
 
Vaikka ne kuulostavatkin päällekkäisiltä, on olemassa joitakin keskeisiä eroja suunnittelun, kyvykkyyksien ja kohdekäyttötapausten osalta:
 
- **Microsoft Agent Framework (MAF)**: Tuotantovalmis SDK AI-agenttien rakentamiseen. Tarjoaa yksinkertaisen API:n agenttien luontiin työkalukutsulla, keskustelun hallinnalla ja Azure-identiteetin integraatiolla.
- **Microsoft Foundry Agent Service**: Alusta ja käyttöönotto Microsoft Foundryssa agenttien rakentamiseen. Tarjoaa sisäänrakennetun yhteyden palveluihin kuten Azure OpenAI, Azure AI Search, Bing Search ja koodin suoritus.
 
Et ole varma kumpaa valita?

### Käyttötapaukset
 
Käydään läpi joitakin yleisiä käyttötapauksia, jotka voivat auttaa sinua:
 
> K: Rakennan tuotantoon AI-agenttisovelluksia ja haluan päästä nopeasti alkuun
>

>V: Microsoft Agent Framework on erinomainen valinta. Se tarjoaa yksinkertaisen, Python-tyylisen API:n `FoundryChatClient`in kautta, jolla voit määritellä agentteja työkaluilla ja ohjeilla muutamassa koodirivissä.

>K: Tarvitsen yritystason käyttöönoton Azuren integraatioilla, kuten Search ja koodin suoritus
>
> V: Microsoft Foundry Agent Service sopii parhaiten. Se on alusta-palvelu, joka tarjoaa valmiit ominaisuudet monille malleille, Azure AI Searchille, Bing Searchille ja Azure Functionsille. Sen avulla agentit on helppo rakentaa Foundry-portaalissa ja ottaa käyttöön suuressa mittakaavassa.
 
> K: Olen edelleen epävarma, anna minulle vain yksi vaihtoehto
>
> V: Aloita Microsoft Agent Frameworkillä agenttien rakentamiseksi ja käytä sitten Microsoft Foundry Agent Serviceä, kun tarvitset käyttöönottoa ja skaalausta tuotannossa. Tämä lähestymistapa mahdollistaa nopean kehityksen agenttilogiikalle ja tarjoaa selkeän polun yritystason käyttöönottoon.
 
Yhteenvetona keskeiset erot taulukkona:

| Kehys | Painopiste | Keskeiset käsitteet | Käyttötapaukset |
| --- | --- | --- | --- |
| Microsoft Agent Framework | Virtaviivainen agentti-SDK työkalukutsuin | Agentit, Työkalut, Azure-identiteetti | AI-agenttien rakentaminen, työkalujen käyttö, monivaiheiset työnkulut |
| Microsoft Foundry Agent Service | Joustavat mallit, yritystason turvallisuus, Koodin generointi, Työkalukutsu | Modulaarisuus, Yhteistyö, Prosessien orkestrointi | Turvallinen, skaalautuva ja joustava AI-agenttien käyttöönotto |

## Voinko integroida olemassa olevat Azure-ekosysteemini työkalut suoraan, vai tarvitseeko minun käyttää itsenäisiä ratkaisuja?


Vastaus on kyllä, voit integroida olemassa olevat Azure-ekosysteemisi työkalut suoraan Microsoft Foundry Agent Serviceen erityisesti, koska se on rakennettu toimimaan saumattomasti muiden Azure-palveluiden kanssa. Voisit esimerkiksi integroida Bingin, Azure AI Searchin ja Azure Functionit. Microsoft Foundryn kanssa on myös syvä integrointi.

Microsoft Agent Framework integroituu myös Azure-palveluihin `FoundryChatClient`- ja Azure-tunnistautumisen kautta, jolloin voit kutsua Azure-palveluita suoraan agenttityökaluistasi.

## Esimerkkikoodit

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Lisää kysymyksiä AI Agent Frameworkeista?

Liity [Microsoft Foundry Discordiin](https://discord.com/invite/ATgtXmAS5D) tapaamaan muita oppijoita, osallistumaan toimistoaikoihin ja saamaan AI Agentteihisi liittyvät kysymykset vastatuiksi.

## Viitteet

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Vastaukset</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Edellinen Oppitunti

[Johdatus AI Agentteihin ja Agenttien Käyttötapauksiin](../01-intro-to-ai-agents/README.md)

## Seuraava Oppitunti

[Agenttisuunnittelumallien Ymmärtäminen](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->