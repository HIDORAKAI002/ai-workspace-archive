# A Microsoft Agent Framework felfedezése

![Agent Framework](../../../translated_images/hu/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Bevezetés

Ebben az órában a következőkről lesz szó:

- A Microsoft Agent Framework megértése: kulcsfontosságú jellemzők és értékek  
- A Microsoft Agent Framework kulcsfogalmainak felfedezése
- Fejlett MAF minták: munkafolyamatok, middleware és memória

## Tanulási célok

Az óra elvégzése után tudni fogod, hogyan:

- Gyártásra kész AI ügynököket építhetsz a Microsoft Agent Framework segítségével
- A Microsoft Agent Framework alapvető funkcióit alkalmazhatod az ügynöki használati eseteidhez
- Fejlett mintákat használhatsz, beleértve a munkafolyamatokat, middleware-t és megfigyelhetőséget

## Kódpéldák

A [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) kódpéldái ebben a tárban találhatók a `xx-python-agent-framework` és `xx-dotnet-agent-framework` fájlok alatt.

## A Microsoft Agent Framework megértése

![Framework Intro](../../../translated_images/hu/framework-intro.077af16617cf130c.webp)

A [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) a Microsoft egységes keretrendszere AI ügynökök építéséhez. Rugalmasságot kínál, hogy kezelje a termelési és kutatási környezetekben előforduló sokféle ügynöki használati esetet, például:

- **Szekvenciális ügynök-orchestration** olyan esetekben, ahol lépésről lépésre haladó munkafolyamatokra van szükség.
- **Párhuzamos orchestration** olyan esetekben, ahol az ügynököknek egyszerre kell elvégezniük feladatokat.
- **Csoportos csevegés orchestration** olyan esetekben, ahol az ügynökök egy feladaton közösen dolgozhatnak.
- **Átadás orchestration** olyan esetekben, ahol az ügynökök egymásnak adják át a feladatot a részfeladatok befejezésekor.
- **Mágneses orchestration** olyan esetekben, ahol egy menedzser ügynök hoz létre és módosít egy feladatlistát, koordinálva az alügyönök munkáját a feladat teljesítéséhez.

A termelési AI ügynökök szállításához a MAF tartalmazza a következő jellemzőket is:

- **Megfigyelhetőség** az OpenTelemetry használatával, ahol az AI ügynök minden tevékenysége, beleértve az eszközhívásokat, orchestration lépéseket, következtetési folyamatokat és teljesítménymonitorozást a Microsoft Foundry műszerfalak révén, látható.
- **Biztonság** mivel az ügynökök natív módon futnak a Microsoft Foundry-n, amely biztonsági ellenőrzéseket tartalmaz, mint például szerepalapú hozzáférés, privát adatkezelés és beépített tartalombiztonság.
- **Tartósság** mivel az ügynök szálak és munkafolyamatok szüneteltethetők, folytathatók és hibákból helyreállíthatók, így lehetővé téve hosszabb ideig futó folyamatokat.
- **Szabályozás** mivel támogatottak az emberi beavatkozást igénylő munkafolyamatok, ahol a feladatokat emberi jóváhagyás szükségesként jelölik meg.

A Microsoft Agent Framework interoperabilitásra is fókuszál azáltal, hogy:

- **Felügyelet-független** - Az ügynökök futhatnak konténerekben, helyben és több különböző felhőben is.
- **Szolgáltató-független** - Az ügynökök létrehozhatók a preferált SDK-val, beleértve az Azure OpenAI-t és OpenAI-t.
- **Nyílt szabványok integrációja** - Az ügynökök képesek használni olyan protokollokat, mint az Agent-to-Agent (A2A) és Model Context Protocol (MCP), más ügynökök és eszközök felfedezésére és alkalmazására.
- **Bővítmények és csatlakoztatók** - Kapcsolatok létesíthetők adat- és memória-szolgáltatásokhoz, mint pl. Microsoft Fabric, SharePoint, Pinecone és Qdrant.

Nézzük meg, hogyan alkalmazzák ezeket a funkciókat a Microsoft Agent Framework néhány kulcsfogalmánál.

## A Microsoft Agent Framework kulcsfogalmai

### Ügynökök

![Agent Framework](../../../translated_images/hu/agent-components.410a06daf87b4fef.webp)

**Ügynökök létrehozása**

Ügynököt úgy hozhatunk létre, hogy definiáljuk az inferencia szolgáltatást (LLM Szolgáltató),  
az AI ügynök által követendő utasítások készletét és egy hozzárendelt `nevet`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

A fenti példa az `Azure OpenAI`-t használja, de az ügynökök különféle szolgáltatásokkal, köztük a `Microsoft Foundry Agent Service`-szel is létrehozhatók:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` API-k

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

vagy [MiniMax](https://platform.minimaxi.com/), amely egy OpenAI-kompatibilis API-t kínál nagy kontextusablakokkal (akár 204K tokenig):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

vagy távoli ügynökök az A2A protokollal:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Ügynökök futtatása**

Az ügynökök a `.run` vagy `.run_stream` metódusokkal futtathatók, nem streamelő vagy streamelő válaszok esetén.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Minden egyes ügynök futtatásnál lehetőség van paraméterek testreszabására, például a használt `max_tokens`, az ügynök által hívható `tools`, vagy akár az ügynök által használt `model` kiválasztására.

Ez hasznos olyan esetekben, amikor egy adott modell vagy eszköz szükséges a felhasználói feladat teljesítéséhez.

**Eszközök**

Az eszközök mind az ügynök definiálásakor megadhatók:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Amikor közvetlenül ChatAgent-et hozunk létre

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

és futtatáskor is:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Csak ehhez a futtatáshoz biztosított eszköz )
```

**Ügynök szálak**

Az ügynök szálak több fordulós beszélgetések kezelésére szolgálnak. A szálak létrehozhatók:

- A `get_new_thread()` használatával, amely lehetővé teszi a szál mentését az idő múlásával
- vagy a szál automatikus létrehozásával az ügynök futtatásakor, amely csak a jelen futtatás idejéig tart.

Szál létrehozásához a kód így néz ki:

```python
# Hozzon létre egy új szálat.
thread = agent.get_new_thread() # Futtassa az ügynököt a szállal.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Majd a szál sorosítható későbbi tárolás céljából:

```python
# Hozzon létre egy új szálat.
thread = agent.get_new_thread() 

# Futtassa az ügynököt a szállal.

response = await agent.run("Hello, how are you?", thread=thread) 

# Sorosítsa a szálat tároláshoz.

serialized_thread = await thread.serialize() 

# Deszerializálja a szál állapotát a betöltés után.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Ügynök Middleware**

Az ügynökök az eszközökkel és LLM-mel működnek együtt a felhasználói feladatok elvégzése érdekében. Bizonyos helyzetekben köztes műveleteket vagy nyomon követést akarunk végrehajtani. Az ügynök middleware lehetővé teszi ezt a következők révén:

*Funkció Middleware*

Ez a middleware lehetővé teszi egy művelet végrehajtását az ügynök és a hívandó funkció/eszköz között. Például naplózást végezhetünk a funkcióhívás során.

Az alábbi kódban a `next` határozza meg, hogy a következő middleware vagy maga a funkció legyen hívva.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Előfeldolgozás: Naplózás a függvény végrehajtása előtt
    print(f"[Function] Calling {context.function.name}")

    # Folytatás a következő köztes szoftver vagy függvény végrehajtásához
    await next(context)

    # Utófeldolgozás: Naplózás a függvény végrehajtása után
    print(f"[Function] {context.function.name} completed")
```

*Chat Middleware*

Ez a middleware lehetővé teszi egy művelet végrehajtását vagy naplózását az ügynök és az LLM közti kérések között.

Ez tartalmazza a küldött `messages` fontos információit az AI szolgáltatás felé.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Előfeldolgozás: Naplózás az AI hívás előtt
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Folytatás a következő köztes réteghez vagy AI szolgáltatáshoz
    await next(context)

    # Utófeldolgozás: Naplózás az AI válasz után
    print("[Chat] AI response received")

```

**Ügynök memória**

Ahogy az `Agentic Memory` leckében is tárgyaltuk, a memória lényeges az ügynök működésének támogatásához különböző kontextusokban. A MAF többféle memóriatípust kínál:

*Memória tárolás*

Ez a memória a szálakban tárolódik az alkalmazás futása alatt.

```python
# Hozzon létre egy új szálat.
thread = agent.get_new_thread() # Futtassa az ügynököt a szál segítségével.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Tartós üzenetek*

Ez a memória a beszélgetési előzmények tárolásához szolgál különböző munkamenetek között. A `chat_message_store_factory`-val definiálható:

```python
from agent_framework import ChatMessageStore

# Egyéni üzenettároló létrehozása
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dinamikus memória*

Ez a memória az ügynökök futtatása előtt kerül hozzáadásra a kontextushoz. Ezek a memóriák külső szolgáltatásokban is tárolhatók, például a mem0-ban:

```python
from agent_framework.mem0 import Mem0Provider

# Mem0 használata fejlett memória funkciókhoz
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

**Ügynök megfigyelhetőség**

A megfigyelhetőség fontos a megbízható és karbantartható ügynöki rendszerek építéséhez. A MAF integrálja az OpenTelemetry-t nyomkövetésre és mérőszámokra a jobb megfigyelhetőség érdekében.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # csinálj valamit
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Munkafolyamatok

A MAF munkafolyamatokat kínál, amelyek előre definiált lépések a feladatok elvégzéséhez, beleértve az AI ügynököket összetevőkként ezekben a lépésekben.

A munkafolyamatok különböző összetevőkből állnak, amelyek jobb vezérlést tesznek lehetővé. A munkafolyamatok támogatják a **többügynökös orchestrációt** és a **pontmentést** a munkafolyamat állapotának mentéséhez.

A munkafolyamat alapvető összetevői:

**Végrehajtók**

A végrehajtók fogadják a bemeneti üzeneteket, elvégzik a rájuk bízott feladatokat, majd egy kimeneti üzenetet állítanak elő. Ez mozgatja a munkafolyamatot a nagyobb feladat teljesítése felé. A végrehajtók lehetnek AI ügynökök vagy egyedi logikák.

**Élek**

Az élek szabályozzák az üzenetáramlást a munkafolyamatban. Ezek lehetnek:

*Közvetlen élek* - Egyszerű egy az egyhez kapcsolatok a végrehajtók között:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Feltételes élek* - Egy bizonyos feltétel teljesülése után aktiválódnak. Például ha hotel szobák nem elérhetők, egy végrehajtó más lehetőségeket javasolhat.

*Választó eset élek* - Az üzeneteket különböző végrehajtókhoz irányítják feltételek alapján. Például, ha egy utazó ügyfél prioritási hozzáféréssel rendelkezik, az ő feladatait egy másik munkafolyamat kezeli.

*Szétszóró élek* - Egy üzenetet több célhoz küld.

*Összegyűjtő élek* - Több üzenetet gyűjtenek össze különböző végrehajtóktól és egyetlen célhoz küldenek.

**Események**

A jobb megfigyelhetőség érdekében a MAF beépített eseményeket kínál a végrehajtáshoz, többek között:

- `WorkflowStartedEvent`  - A munkafolyamat végrehajtása megkezdődik
- `WorkflowOutputEvent` - A munkafolyamat kimenetet ad
- `WorkflowErrorEvent` - A munkafolyamat hibába ütközik
- `ExecutorInvokeEvent`  - A végrehajtó megkezdi a feldolgozást
- `ExecutorCompleteEvent`  - A végrehajtó befejezi a feldolgozást
- `RequestInfoEvent` - Egy kérés kiadásra kerül

## Fejlett MAF minták

A fentiekben ismertetett kulcsfogalmak mellett, összetettebb ügynökök építésekor érdemes megfontolni a következő fejlett mintákat:

- **Middleware összefűzés**: Több middleware kezelő láncolása (naplózás, hitelesítés, sebességkorlátozás) funkció- és chat middleware segítségével, hogy finomhangolt irányítást biztosítsunk az ügynök viselkedésére.
- **Munkafolyamat pontmentés**: Munkafolyamat események és sorosítás segítségével hosszú ideig futó ügynök folyamatok mentése és folytatása.
- **Dinamikus eszközválasztás**: RAG eszközleírások felett kombinálja a MAF eszközregisztrációját, hogy csak a releváns eszközöket kínálja fel lekérdezésenként.
- **Többügynökös átadás**: Munkafolyamat élek és feltételes irányítás segítségével koordinálja az átadásokat szakosodott ügynökök között.

## LangChain / LangGraph ügynökök hosztolása Microsoft Foundry-n

A Microsoft Agent Framework **keretrendszer interoperábilis** — nem vagy korlátozva csak MAF-szal írt ügynökökre. Ha már van egy ügynököd, amely **LangChain** vagy **LangGraph** alapú, futtathatod azt **Microsoft Foundry hosztolt ügynökként**, így a Foundry kezeli a futtatókörnyezetet, munkameneteket, skálázást, azonosítást és protokoll végpontokat, miközben az ügynök logikája LangGraph-on marad.

Ezt a `langchain_azure_ai.agents.hosting` csomaggal valósítják meg, amely egy összeállított LangGraph gráfot tesz elérhetővé a Foundry hosztolt ügynökök által használt protokollokon keresztül.

**1. Telepítsd a hosztolási extrát:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

A `hosting` extra telepíti a Foundry protokoll könyvtárakat: `azure-ai-agentserver-responses` (az OpenAI-kompatibilis `/responses` végpont) és `azure-ai-agentserver-invocations` (az általános `/invocations` végpont).

**2. Válassz egy hosztolási protokollt:**

| Protokoll | Host osztály | Végpont | Mikor használd |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Ha OpenAI-kompatibilis chat, streaming, válasz előzmények és beszélgetés szálazás szükséges — ajánlott alapértelmezett konverzációs ügynököknek. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Egyedi JSON alakzatot, webhook-jellegű végpontot vagy nem konverzációs feldolgozást igényelsz. |

Mivel a **Responses API az elsődleges API az ügynök jellegű fejlesztéshez Foundry-n**, a legtöbb ügynöknél érdemes a `ResponsesHostServer`-rel kezdeni.

**3. Állítsd be a környezeti változókat** (`az login` előtte, hogy a `DefaultAzureCredential` hitelesíteni tudjon):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Amikor később az ügynök Foundry hosztolt ügynökként fut, a platform automatikusan befecskendezi a `FOUNDRY_PROJECT_ENDPOINT` változót.

**4. Tegyél elérhetővé egy LangGraph ügynököt a Responses protokoll felett:**

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

    # A ChatOpenAI itt a Foundry projekt OpenAI-kompatibilis (Válaszok) végpontját célozza meg.
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

Lokálisan futtathatod `python main.py`-vel, majd a `http://localhost:8088/responses` végpontra küldhetsz Responses kérést.

**Kulcsviselkedések:**

- **Beszélgetések**: Az ügyfelek a `previous_response_id` vagy `conversation` azonosító átadásával folytathatják a beszélgetést. Ha a gráf LangGraph pontmentővel van összeállítva, a Foundry a beszélgetési állapotot a pontmentőhöz rendeli (produkcióban tartós pontmentőt használj; a `MemorySaver` helyi tesztekhez megfelelő).
- **Ember a hurokban**: Ha a gráf használja a LangGraph `interrupt()`-ját, a `ResponsesHostServer` a függőben lévő megszakítást Responses `function_call` / `mcp_approval_request` elemként jeleníti meg, az ügyfelek pedig a megfelelő `function_call_output` / `mcp_approval_response` válasszal folytatják.
- **Telepítés Foundry-ba**: Használd az Azure Developer CLI-t — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (lokálisan, Docker szükséges), majd `azd provision` és `azd deploy`. A hosztolt ügynök telepítéséhez a **Foundry Project Manager** szerepkör szükséges.

Ennek a példának egy futtatható változata megtalálható a [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) fájlban. A teljes ismertetőért (Invocations protokoll, egyedi kérés séma és hibakeresés) lásd a [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) dokumentációt.

## Kódpéldák 

A Microsoft Agent Framework kódpéldái megtalálhatók ebben a tárban a `xx-python-agent-framework` és `xx-dotnet-agent-framework` fájlok alatt.

## Több kérdésed van a Microsoft Agent Frameworkről?

Csatlakozz a [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) közösséghez, hogy találkozhass más tanulókkal, részt vehess ügyfélfogadási órákon és megválaszolhassák az AI ügynökökkel kapcsolatos kérdéseidet.
## Előző lecke

[Memória AI ügynököknek](../13-agent-memory/README.md)

## Következő lecke

[Számítógéphez kapcsolódó ügynökök építése (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->