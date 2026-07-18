# Microsoft Agent Frameworkin tutkiminen

![Agent Framework](../../../translated_images/fi/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Johdanto

Tässä oppitunnissa käsitellään:

- Microsoft Agent Frameworkin ymmärtäminen: keskeiset ominaisuudet ja arvo  
- Microsoft Agent Frameworkin keskeisten käsitteiden tutkiminen
- Edistyneet MAF-kuviot: työnkulut, middleware ja muisti

## Oppimistavoitteet

Oppitunnin suorittamisen jälkeen osaat:

- Rakentaa tuotantovalmiita tekoälyagentteja Microsoft Agent Frameworkin avulla
- Soveltaa Microsoft Agent Frameworkin ydintoimintoja agenttikäyttötapauksiisi
- Käyttää edistyneitä kuvioita, mukaan lukien työnkulut, middleware ja havainnointi

## Koodiesimerkit

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) -koodiesimerkkejä löytyy tästä repositoriosta tiedostoista `xx-python-agent-framework` ja `xx-dotnet-agent-framework`.

## Microsoft Agent Frameworkin ymmärtäminen

![Framework Intro](../../../translated_images/fi/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) on Microsoftin yhtenäinen kehys tekoälyagenttien rakentamiseen. Se tarjoaa joustavuutta käsitellä monenlaisia agenttikäyttötapauksia tuotanto- ja tutkimusympäristöissä, mukaan lukien:

- **Järjestyksellinen agenttien orkestrointi** tilanteissa, joissa tarvitaan vaiheittaisia työnkulkuja.
- **Samaan aikaan tapahtuva orkestrointi** tilanteissa, joissa agenttien täytyy suorittaa tehtäviä samanaikaisesti.
- **Ryhmäkeskustelun orkestrointi** tilanteissa, joissa agentit voivat tehdä yhteistyötä yhden tehtävän parissa.
- **Tehtävän siirron orkestrointi** tilanteissa, joissa agentit siirtävät tehtävää toisilleen osatehtävien valmistuessa.
- **Magneettinen orkestrointi** tilanteissa, joissa johtaja-agentti luo ja muokkaa tehtävälistaa ja vastaa ala-agenttien koordinoinnista tehtävän suorittamiseksi.

Tuotantokäyttöön tarkoitetuissa tekoälyagenteissa MAF tarjoaa myös ominaisuuksia:

- **Havainnointi** OpenTelemetryn avulla, jossa jokaista tekoälyagentin toimintoa kuten työkalun kutsua, orkestrointivaiheita, päättelyprosesseja ja suorituskyvyn seurantaa Microsoft Foundryn koontinäytöillä seurataan.
- **Turvallisuus** isännöimällä agentteja natiivisti Microsoft Foundryssä, joka sisältää turvatoimia kuten roolipohjaisen pääsynhallinnan, yksityisen datan käsittelyn ja sisäänrakennetun sisällön turvallisuuden.
- **Kestävyys** sillä agenttien säikeet ja työnkulut voivat pysähtyä, jatkua ja palautua virheistä, mikä mahdollistaa pidempiaikaiset prosessit.
- **Hallinta** ihmisen roolilla työnkuluissa, joissa tehtävät merkitään ihmisen hyväksyntää vaativiksi.

Microsoft Agent Framework keskittyy myös yhteentoimivuuteen:

- **Pilvi-riippumattomuuteen** - Agentit voivat toimia konteissa, paikallisesti ja useissa eri pilvissä.
- **Tarjoajariippumattomuuteen** - Agentteja voidaan luoda mieluisimallasi SDK:lla, mukaan lukien Azure OpenAI ja OpenAI.
- **Avoimien standardien integrointiin** - Agentit voivat hyödyntää agenttien välisten (A2A) ja mallikontekstiprotokollia (MCP) löytääkseen ja käyttäessään muita agentteja ja työkaluja.
- **Lisäosat ja liittimet** - Yhteydet voidaan tehdä data- ja muistipalveluihin kuten Microsoft Fabric, SharePoint, Pinecone ja Qdrant.

Tarkastellaan, miten näitä ominaisuuksia sovelletaan Microsoft Agent Frameworkin ydinkäsitteisiin.

## Microsoft Agent Frameworkin keskeiset käsitteet

### Agentit

![Agent Framework](../../../translated_images/fi/agent-components.410a06daf87b4fef.webp)

**Agenttien luominen**

Agenttien luominen tehdään määrittämällä inferenssipalvelu (LLM-provider), joukko ohjeita, joita tekoälyagentin tulee noudattaa, sekä määritetty `name`:


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Edellä on käytössä `Azure OpenAI`, mutta agentteja voidaan luoda monenlaisilla palveluilla, mukaan lukien `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI:n `Responses`, `ChatCompletion` -APIt

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

tai [MiniMax](https://platform.minimaxi.com/), joka tarjoaa OpenAI-yhteensopivan API:n laajoilla kontekstiaukoilla (jopa 204K tokenia):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

tai etäagentit A2A-protokollan avulla:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Agenttien suorittaminen**

Agentit suoritetaan `.run` tai `.run_stream` -menetelmillä saadakseen joko ei-suoratoistavia tai suoratoistavia vastauksia.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Jokaisella agentin ajolla voi olla myös vaihtoehtoja parametrien, kuten agentin käyttämien `max_tokens`-arvon, kutsuttavien `tools`-työkalujen ja jopa itse käytetyn `model`-mallin mukauttamiseen.

Tämä on hyödyllistä tapauksissa, joissa tiettyjä malleja tai työkaluja tarvitaan käyttäjän tehtävän suorittamiseen.

**Työkalut**

Työkaluja voidaan määritellä sekä agenttia luotaessa:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Kun luot ChatAgentin suoraan

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

ja myös agenttia suoritettaessa:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Työkalu tarjottu vain tätä ajoa varten )
```

**Agenttien säikeet**

Agenttien säikeitä käytetään käsittelemään monivuoropuheluja. Säikeitä voi luoda joko:

- Käyttämällä `get_new_thread()`, jolloin säie voidaan tallentaa ajan yli
- Luomalla säie automaattisesti agenttia ajettaessa, jolloin säie on voimassa vain kyseisen suorituksen ajan.

Säikeen luominen näyttää koodissa tältä:

```python
# Luo uusi säie.
thread = agent.get_new_thread() # Suorita agentti säikeen kanssa.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Voi serialisoida säikeen myöhempää käyttöä varten:

```python
# Luo uusi ketju.
thread = agent.get_new_thread() 

# Aja agentti ketjun kanssa.

response = await agent.run("Hello, how are you?", thread=thread) 

# Sarjoita ketju tallennusta varten.

serialized_thread = await thread.serialize() 

# Purkaa ketjun tila tallennuksen lataamisen jälkeen.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agenttien middleware**

Agentit ovat vuorovaikutuksessa työkalujen ja LLM:ien kanssa käyttäjän tehtävien suorittamiseksi. Tietyissä tilanteissa haluamme suorittaa tai seurata toimintaa näiden vuorovaikutusten välillä. Agent-middleware mahdollistaa tämän seuraavasti:

*Funktioiden middleware*

Tämä middleware antaa meille mahdollisuuden suorittaa toiminto agentin ja kutsuttavan funktion/työkalun välillä. Esimerkkinä voisi olla kutsujen lokitus.

Alla olevassa koodissa `next` määrittää kutsutaanko seuraavaa middlewareä vai varsinaista funktiota.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Esikäsittely: Kirjaa lokiin ennen funktion suorittamista
    print(f"[Function] Calling {context.function.name}")

    # Jatka seuraavaan middlewareen tai funktion suorittamiseen
    await next(context)

    # Jälkikäsittely: Kirjaa lokiin funktion suorittamisen jälkeen
    print(f"[Function] {context.function.name} completed")
```

*Chat-middleware*

Tämä middleware mahdollistaa toiminnon suorittamisen tai lokituksen agentin ja LLM:n välisten pyyntöjen välillä.

Tämä sisältää tärkeää tietoa kuten AI-palvelulle lähetettävät `messages`.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Esikäsittely: Kirjaa lokiin ennen AI-kutsua
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Jatka seuraavaan middlewareen tai AI-palveluun
    await next(context)

    # Jälkikäsittely: Kirjaa lokiin AI-vastauksen jälkeen
    print("[Chat] AI response received")

```

**Agentin muisti**

Kuten `Agentic Memory` -oppitunnissa käsiteltiin, muisti on tärkeä osa-agentin toimintaympäristöjen hallintaa. MAF tarjoaa useita erilaisia muistityyppejä:

*Muisti sovelluksen ajon aikana (In-Memory Storage)*

Tämä on muisti, joka tallennetaan säikeisiin sovelluksen ajon aikana.

```python
# Luo uusi säie.
thread = agent.get_new_thread() # Suorita agentti säikeen kanssa.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Pysyvät viestit*

Tätä muistia käytetään keskusteluhistorian tallentamiseen eri sessioiden välillä. Se määritellään `chat_message_store_factory` -parametrilla:

```python
from agent_framework import ChatMessageStore

# Luo mukautettu viestivarasto
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynaaminen muisti*

Tämä muisti lisätään kontekstiin ennen agenttien ajoa. Näitä muisteja voidaan tallentaa ulkoisiin palveluihin kuten mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Käytetään Mem0:aa edistyneisiin muistikapasiteetteihin
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

**Agenttien havainnointi**


Havainnointikyky on tärkeää luotettavien ja ylläpidettävien agenttijärjestelmien rakentamisessa. MAF integroituu OpenTelemetryyn tarjoten jäljitystä ja mittareita paremman havainnointikyvyn saavuttamiseksi.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # tee jotain
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Työnkulut

MAF tarjoaa työnkulkuja, jotka ovat ennalta määriteltyjä vaiheita tehtävän suorittamiseksi ja sisältävät tekoälyagentteja komponentteina näissä vaiheissa.

Työnkulut koostuvat eri komponenteista, jotka mahdollistavat paremman ohjausvirran. Työnkulut mahdollistavat myös **moni-agentin orkestroinnin** ja **tarkistuspisteet** työnkulun tilan tallentamiseksi.

Työnkulun ydin komponentit ovat:

**Suorittajat**

Suorittajat vastaanottavat syötem viestejä, suorittavat niille määritellyt tehtävät ja tuottavat sitten lähtöviestin. Tämä vie työnkulkua eteenpäin kohti isomman tehtävän loppuunsaattamista. Suorittajat voivat olla joko tekoälyagentteja tai mukautettua logiikkaa.

**Sillat**

Sillat määrittelevät viestien kulun työnkulussa. Nämä voivat olla:

*Suorat sillat* - Yksinkertaisia yksi-yhteen yhteyksiä suorittajien välillä:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Ehdolliset sillat* - Aktivoituvat tietyn ehdon täyttyessä. Esimerkiksi, kun hotellihuoneita ei ole saatavilla, suorittaja voi ehdottaa muita vaihtoehtoja.

*Kytkin-tapaussillat* - Reitittää viestejä eri suorittajille määriteltyjen ehtojen perusteella. Esimerkiksi, jos matkustajalla on prioriteetti pääsy ja heidän tehtävänsä käsitellään toisella työnkululla.

*Haarautuvat sillat* - Lähettää yhden viestin useille kohteille.

*Keräävät sillat* - Kerää useita viestejä eri suorittajilta ja lähettää ne yhdelle kohteelle.

**Tapahtumat**

Tarjotakseen paremman havainnointikyvyn työnkulkuihin, MAF sisältää sisäänrakennetut tapahtumat suoritukseen liittyen, kuten:

- `WorkflowStartedEvent`  - Työnkulun suoritus alkaa
- `WorkflowOutputEvent` - Työnkulku tuottaa lähtödatan
- `WorkflowErrorEvent` - Työnkulku kohtaa virheen
- `ExecutorInvokeEvent`  - Suorittaja aloittaa käsittelyn
- `ExecutorCompleteEvent`  -  Suorittaja lopettaa käsittelyn
- `RequestInfoEvent` - Pyyntö tehdään

## Kehittyneet MAF-kuviot

Edellä käsiteltiin Microsoft Agent Frameworkin keskeiset käsitteet. Rakentaessasi monimutkaisempia agentteja, tässä on joitain kehittyneitä kuvioita harkittavaksi:

- **Väliohjelmien yhdistäminen**: Kytke useita väliohjelma käsittelijöitä (kirjautuminen, todennus, nopeuden rajoitus) käyttäen toiminto- ja chat-väliohjelmia tarkkaan hallintaan agentin käyttäytymisestä.
- **Työnkulun tarkistuspisteet**: Käytä työnkulun tapahtumia ja sarjallistamista tallentaaksesi ja jatkaaksesi pitkäkestoisia agenttiprosesseja.
- **Dynaaminen työkalujen valinta**: Yhdistä RAG työkalukuvausten päälle MAF:n työkalujen rekisteröintiin esitelläksesi vain kyselyyn liittyvät työkalut.
- **Moni-agentin siirto**: Käytä työnkulun siltoja ja ehdollista reititystä orkestroimaan siirtoja erikoistuneiden agenttien välillä.

## LangChain / LangGraph -agenttien isännöinti Microsoft Foundryssa

Microsoft Agent Framework on **kehys-yhteensopiva** — et ole rajattu käyttämään vain MAF:lla kirjoitettuja agentteja. Jos sinulla on jo agentti rakennettuna **LangChain**- tai **LangGraph**-tekniikoilla, voit ajaa sen **Microsoft Foundryn hostaamana agenttina**, jolloin Foundry hallitsee ajonaikaa, sessioita, mittakaavautumista, identiteettiä ja protokollan päätepisteitä puolestasi, samalla kun agentti looginen pysyy LangGraphissa.

Tämä tehdään `langchain_azure_ai.agents.hosting`-paketilla, joka tarjoaa kompiloidun LangGraphin kaavion samojen protokollien yli joita Foundryn hostaamat agentit käyttävät.

**1. Asenna hosting-extra:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting`-extra asentaa Foundryn protokollakirjastot: `azure-ai-agentserver-responses` (OpenAI-yhteensopiva `/responses`-päätepiste) ja `azure-ai-agentserver-invocations` (yleinen `/invocations`-päätepiste).

**2. Valitse hosting-protokolla:**

| Protokolla | Isäntän luokka | Päätepiste | Käyttötilanne |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Halutaan OpenAI-yhteensopiva chat, suoratoisto, vastaushistoria ja keskusteluketjutus — suositeltu oletus konversaatioagentteihin. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Tarvitaan mukautettu JSON-muoto, webhook-tyyppinen päätepiste tai ei-keskustelullinen käsittely. |

Koska **Responses API on Foundryn agenttityyppisen kehityksen ensisijainen API**, aloita useimpien agenttien kanssa `ResponsesHostServer`-palvelimella.

**3. Määritä ympäristömuuttujat** (`az login` ensin, jotta `DefaultAzureCredential` voi todentaa):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Kun agentti myöhemmin ajaa hostattuna Foundryssä, alusta lisää automaattisesti `FOUNDRY_PROJECT_ENDPOINT`-arvon.

**4. Tarjoa LangGraph-agentti Responses-protokollan yli:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # ChatOpenAI tässä kohdistaa Foundry-projektin OpenAI-yhteensopivaan (Responses) päätepisteeseen.
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

Aja se paikallisesti `python main.py`:llä, sitten lähetä Responses-pyyntö osoitteeseen `http://localhost:8088/responses`.

**Keskeiset käyttäytymismallit:**

- **Keskustelut**: Asiakkaat jatkavat keskustelua välittämällä `previous_response_id` tai `conversation` ID:n. Jos kaaviosi on käännetty LangGraph-tarkistuspisteellä, Foundry yhdistää keskustelun tilan tarkistuspisteeseen (käytä kestävää tarkistuspistettä tuotannossa; `MemorySaver` sopii paikalliseen testaukseen).
- **Ihminen prosessissa**: Jos kaaviosi käyttää LangGraphin `interrupt()`-funktiota, `ResponsesHostServer` näyttää odottavan keskeytyksen Responsesin `function_call` / `mcp_approval_request` -kohteena, ja asiakkaat jatkavat vastaavalla `function_call_output` / `mcp_approval_response` -vastauksella.
- **Julkaise Foundryssä**: Käytä Azure Developer CLI:tä — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (paikallinen, vaatii Dockerin), sitten `azd provision` ja `azd deploy`. Hostatun agentin käyttöönotto vaatii **Foundry-projektipäällikön** roolin.

Suoritettava versio tästä esimerkistä löytyy tiedostosta [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Täydellisen oppaan (Invocations-protokolla, mukautetut pyyntöpohjat ja vianetsintä) löydät kohdasta [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Koodiesimerkit

Microsoft Agent Frameworkin koodiesimerkkejä löytyy tästä arkistosta tiedostoista `xx-python-agent-framework` ja `xx-dotnet-agent-framework`.

## Lisää kysymyksiä Microsoft Agent Frameworkista?

Liity [Microsoft Foundry Discordiin](https://discord.com/invite/ATgtXmAS5D) tavataksesi muita oppijoita, osallistuaksesi aukioloihin ja saadaksesi vastauksia AI Agentteihin liittyviin kysymyksiisi.
## Edellinen oppitunti

[Muisti AI-agenteille](../13-agent-memory/README.md)

## Seuraava oppitunti

[Tietokoneen käytön agenttien rakentaminen (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->