# Udforskning af Microsoft Agent Framework

![Agent Framework](../../../translated_images/da/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Introduktion

Denne lektion vil dække:

- Forståelse af Microsoft Agent Framework: Nøglefunktioner og værdi  
- Udforskning af nøglebegreber i Microsoft Agent Framework
- Avancerede MAF-mønstre: Arbejdsgange, middleware og hukommelse

## Læringsmål

Efter at have gennemført denne lektion vil du vide, hvordan du:

- Bygger produktionsparate AI-agenter ved brug af Microsoft Agent Framework
- Anvender kernefunktionerne i Microsoft Agent Framework til dine agentiske brugssager
- Bruger avancerede mønstre inklusive arbejdsgange, middleware og observabilitet

## Kodeeksempler 

Kodeeksempler for [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) kan findes i dette repository under filerne `xx-python-agent-framework` og `xx-dotnet-agent-framework`.

## Forståelse af Microsoft Agent Framework

![Framework Intro](../../../translated_images/da/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) er Microsofts unified framework til at bygge AI-agenter. Det tilbyder fleksibilitet til at håndtere det brede udvalg af agentiske brugssager, set i både produktions- og forskningsmiljøer, herunder:

- **Sekventiel agentorkestrering** i scenarier hvor trin-for-trin arbejdsgange er nødvendige.
- **Samtidig orkestrering** i scenarier hvor agenter skal fuldføre opgaver samtidig.
- **Gruppechatorkestrering** i scenarier hvor agenter kan samarbejde om en opgave.
- **Overdragelsesorkestrering** i scenarier hvor agenter overdrager opgaven til hinanden efterhånden som delopgaver færdiggøres.
- **Magnetisk orkestrering** i scenarier hvor en lederagent opretter og ændrer en opgaveliste og håndterer koordineringen af subagenter til at fuldføre opgaven.

For at levere AI-agenter i produktion har MAF også inkluderet funktioner for:

- **Observabilitet** gennem brug af OpenTelemetry hvor hver handling af AI-agenten inklusiv værktøjskald, orkestreringstrin, ræsonneringsflow og performanceovervågning via Microsoft Foundry dashboards.
- **Sikkerhed** ved at hoste agenter natívt på Microsoft Foundry, som inkluderer sikkerhedskontroller såsom rollebaseret adgang, håndtering af private data og indbygget indholdssikkerhed.
- **Holdbarhed** da agenttråde og arbejdsgange kan pause, genoptage og fejlgendannes, hvilket muliggør længerevarende processer.
- **Kontrol** da menneskelig inddragelse i arbejdsgange understøttes, hvor opgaver markereres som krævende menneskelig godkendelse.

Microsoft Agent Framework fokuserer også på interoperabilitet ved:

- **At være cloud-agnostisk** - Agenter kan køre i containere, on-premise og på tværs af forskellige clouds.
- **At være leverandør-agnostisk** - Agenter kan oprettes gennem dit foretrukne SDK inklusiv Azure OpenAI og OpenAI.
- **Integration af åbne standarder** - Agenter kan anvende protokoller som Agent-til-Agent (A2A) og Model Context Protocol (MCP) til at opdage og bruge andre agenter og værktøjer.
- **Plugins og Connectorer** - Forbindelser kan oprettes til data- og hukommelsestjenester såsom Microsoft Fabric, SharePoint, Pinecone og Qdrant.

Lad os se på, hvordan disse funktioner anvendes på nogle af kernbegreberne i Microsoft Agent Framework.

## Nøglebegreber i Microsoft Agent Framework

### Agenter

![Agent Framework](../../../translated_images/da/agent-components.410a06daf87b4fef.webp)

**Oprettelse af agenter**

Agentoprettelse sker ved at definere inferencetjenesten (LLM-udbyder), et
sæt instruktioner for AI-agenten at følge, og et tilknyttet `navn`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Ovenstående bruger `Azure OpenAI`, men agenter kan oprettes ved brug af en række forskellige tjenester inklusive `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` API'er

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

eller [MiniMax](https://platform.minimaxi.com/), som tilbyder en OpenAI-kompatibel API med store kontekstvinduer (op til 204K tokens):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

eller fjernagenter ved brug af A2A-protokollen:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Kørsel af agenter**

Agenter køres ved brug af `.run` eller `.run_stream` metoder for enten ikke-streamende eller streamende svar.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Hver agentkørsel kan også have muligheder for at tilpasse parametre såsom `max_tokens` brugt af agenten, `tools` som agenten kan kalde, og endda `model` selv som bruges til agenten.

Dette er nyttigt i tilfælde, hvor specifikke modeller eller værktøjer er nødvendige for at fuldføre en brugers opgave.

**Værktøjer**

Værktøjer kan defineres både ved oprettelse af agenten:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Når du opretter en ChatAgent direkte

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

og også ved kørsel af agenten:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Værktøj leveret kun til denne kørsel )
```

**Agenttråde**

Agenttråde bruges til at håndtere fler-skridts samtaler. Tråde kan oprettes enten ved:

- Brug af `get_new_thread()` som muliggør at tråden gemmes over tid
- Automatisk oprettelse af en tråd ved kørsel af agenten med tråden kun aktiv under det aktuelle kørsel.

For at oprette en tråd ser koden således ud:

```python
# Opret en ny tråd.
thread = agent.get_new_thread() # Kør agenten med tråden.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Du kan derefter serialisere tråden for at gemme den til senere brug:

```python
# Opret en ny tråd.
thread = agent.get_new_thread() 

# Kør agenten med tråden.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serialiser tråden til lagring.

serialized_thread = await thread.serialize() 

# Deserialiser trådens tilstand efter indlæsning fra lager.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agent Middleware**

Agenter interagerer med værktøjer og LLM'er for at fuldføre brugerens opgaver. I visse scenarier ønsker vi at udføre eller spore handlinger imellem disse interaktioner. Agent middleware gør dette muligt gennem:

*Funktionsmiddleware*

Denne middleware tillader os at udføre en handling mellem agenten og en funktion/værktøj som den kalder. Et eksempel hvor dette bruges, er hvis man ønsker at logge funktionskaldet.

I koden nedenfor definerer `next` om næste middleware eller den faktiske funktion skal kaldes.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Forbehandling: Log før funktionsudførelse
    print(f"[Function] Calling {context.function.name}")

    # Fortsæt til næste middleware eller funktionsudførelse
    await next(context)

    # Efterbehandling: Log efter funktionsudførelse
    print(f"[Function] {context.function.name} completed")
```

*Chatmiddleware*

Denne middleware tillader os at udføre eller logge en handling mellem agenten og anmodningerne mellem LLM'en.

Dette indeholder vigtig information såsom `messages` der sendes til AI-tjenesten.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Forbehandling: Log før AI-opkald
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Fortsæt til næste middleware eller AI-service
    await next(context)

    # Efterbehandling: Log efter AI-svar
    print("[Chat] AI response received")

```

**Agenthukommelse**

Som gennemgået i lektionen `Agentisk hukommelse`, er hukommelse et vigtigt element for at muliggøre agentens aktivitet over forskellige kontekster. MAF tilbyder flere forskellige typer af hukommelser:

*In-Memory Storage*

Dette er hukommelsen lagret i tråde under applikationens kørselstid.

```python
# Opret en ny tråd.
thread = agent.get_new_thread() # Kør agenten med tråden.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Vedvarende beskeder*

Denne hukommelse bruges til at gemme samtalehistorik på tværs af sessioner. Den defineres ved brug af `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Opret en brugerdefineret beskedlager
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynamisk hukommelse*

Denne hukommelse tilføjes til konteksten inden agenter køres. Disse hukommelser kan gemmes i eksterne tjenester såsom mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Brug af Mem0 til avancerede hukommelsesfunktioner
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

**Agentobservabilitet**

Observabilitet er vigtigt for opbygning af pålidelige og vedligeholdbare agentiske systemer. MAF integrerer med OpenTelemetry for at levere sporing og måling for bedre observabilitet.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # gør noget
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Arbejdsgange

MAF tilbyder arbejdsgange, som er foruddefinerede trin til at fuldføre en opgave og inkluderer AI-agenter som komponenter i disse trin.

Arbejdsgange består af forskellige komponenter, som muliggør bedre kontrolflow. Arbejdsgange muliggør også **multi-agent orkestrering** og **checkpointing** for at gemme arbejdsgangstilstande.

Kernekomponenterne i en arbejdsgang er:

**Udførere**

Udførere modtager inputbeskeder, udfører deres tildelte opgaver og producerer derefter en outputbesked. Dette fører arbejdsgangen frem mod at fuldføre den større opgave. Udførere kan være enten AI-agent eller brugerdefineret logik.

**Kanter**

Kanter bruges til at definere meddelelsesflow i en arbejdsgang. Disse kan være:

*Direkte kanter* - Enkle én-til-én forbindelser mellem udførere:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Betingede kanter* - Aktiveres når en bestemt betingelse er opfyldt. For eksempel, når hotelværelser er udsolgt, kan en udfører foreslå andre muligheder.

*Switch-case kanter* - Ruter beskeder til forskellige udførere baseret på definerede betingelser. For eksempel, hvis en rejsekunde har prioriteret adgang, vil deres opgaver blive håndteret via en anden arbejdsgang.

*Fan-out kanter* - Sender en besked til flere mål.

*Fan-in kanter* - Samler flere beskeder fra forskellige udførere og sender til ét mål.

**Hændelser**

For at give bedre observabilitet i arbejdsgange tilbyder MAF indbyggede events for udførelse, inklusive:

- `WorkflowStartedEvent`  - Arbejdsgangsudførelse begynder
- `WorkflowOutputEvent` - Arbejdsgangen producerer output
- `WorkflowErrorEvent` - Arbejdsgangen støder på en fejl
- `ExecutorInvokeEvent`  - Udføreren begynder behandling
- `ExecutorCompleteEvent`  -  Udføreren afslutter behandling
- `RequestInfoEvent` - En forespørgsel afgives

## Avancerede MAF-mønstre

Ovenstående sektioner dækker kernebegreberne i Microsoft Agent Framework. Når du bygger mere komplekse agenter, er her nogle avancerede mønstre at overveje:

- **Middleware Sammensætning**: Kæd flere middleware-handler (logning, autentificering, ratebegrænsning) ved brug af funktions- og chatmiddleware for finmasket kontrol over agentens adfærd.
- **Checkpointing af arbejdsgange**: Brug arbejdsgangs-events og serialisering til at gemme og genoptage langvarige agentprocesser.
- **Dynamisk valg af værktøj**: Kombiner RAG over værktøjsbeskrivelser med MAF's registrering af værktøjer for kun at præsentere relevante værktøjer per forespørgsel.
- **Multi-agent overdragelse**: Brug arbejdsgangs-kanter og betinget routing til at orkestrere overdragelser mellem specialiserede agenter.

## Hosting af LangChain / LangGraph-agenter på Microsoft Foundry

Microsoft Agent Framework er **framework-interoperabel** — du er ikke begrænset til agenter skrevet med MAF. Hvis du allerede har en agent bygget med **LangChain** eller **LangGraph**, kan du køre den som en **Microsoft Foundry hosted agent**, så Foundry håndterer runtime, sessioner, skalering, identitet og protokolendepunkter for dig, mens din agentlogik forbliver i LangGraph.

Dette gøres med `langchain_azure_ai.agents.hosting`-pakken, som eksponerer en kompileret LangGraph-graf over de samme protokoller, som Foundry-hostede agenter bruger.

**1. Installer hosting-ekstratilvalget:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting`-ekstraet installerer Foundry-protokolbibliotekerne: `azure-ai-agentserver-responses` (det OpenAI-kompatible `/responses` endpoint) og `azure-ai-agentserver-invocations` (det generiske `/invocations` endpoint).

**2. Vælg en hosting-protokol:**

| Protokol | Host-klasse | Endpoint | Bruges når |
|----------|-------------|----------|------------|
| **Responses** | `ResponsesHostServer` | `/responses` | Du ønsker OpenAI-kompatibel chat, streaming, svarhistorik og samtaletrådning — det anbefalede standardvalg for konversationsagenter. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Du har brug for en brugerdefineret JSON-form, et webhook-lignende endpoint eller ikke-konversationel behandling. |

Fordi **Responses API er den primære API til agentstil-udvikling i Foundry**, start med `ResponsesHostServer` for de fleste agenter.

**3. Konfigurer miljøvariabler** (`az login` først, så `DefaultAzureCredential` kan autentificere):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Når agenten senere kører som hosted agent i Foundry, injicerer platformen automatisk `FOUNDRY_PROJECT_ENDPOINT`.

**4. Eksponer en LangGraph-agent over Responses-protokollen:**

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

    # ChatOpenAI her retter sig mod Foundry-projektets OpenAI-kompatible (Responses) endpoint.
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

Kør den lokalt med `python main.py`, og send derefter en Responses-forespørgsel til `http://localhost:8088/responses`.

**Nøglefunktioner:**

- **Samtaler**: Klienter fortsætter en samtale ved at sende `previous_response_id` eller en `conversation` ID. Hvis din graf er kompileret med en LangGraph-checkpointer, nøglefinder Foundry samtalens tilstand til checkpointen (brug en holdbar checkpointer i produktion; `MemorySaver` er fint til lokal test).
- **Menneske-i-loopet**: Hvis din graf bruger LangGraph `interrupt()`, overfører `ResponsesHostServer` den ventende afbrydelse som et Responses `function_call` / `mcp_approval_request` element, og klienter genoptager med et matchende `function_call_output` / `mcp_approval_response`.
- **Deploy til Foundry**: Brug Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (lokalt, kræver Docker), og derefter `azd provision` og `azd deploy`. Hosted-agent-udrulning kræver **Foundry Project Manager**-rollen.

En fungerende version af dette eksempel findes i [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). For den fulde gennemgang (Invocations-protokol, brugerdefinerede forespørgsels-skemaer og fejlfinding), se [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Kodeeksempler 

Kodeeksempler for Microsoft Agent Framework kan findes i dette repository under filerne `xx-python-agent-framework` og `xx-dotnet-agent-framework`.

## Har du flere spørgsmål om Microsoft Agent Framework?

Deltag i [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) for at møde andre lærende, deltage i kontortimer og få besvaret dine spørgsmål om AI-agenter.
## Forrige lektion

[Memory for AI Agents](../13-agent-memory/README.md)

## Næste lektion

[Bygning af computerbrugere (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->