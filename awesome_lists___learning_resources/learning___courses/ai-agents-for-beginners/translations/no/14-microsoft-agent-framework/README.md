# Utforske Microsoft Agent Framework

![Agent Framework](../../../translated_images/no/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Innledning

Denne leksjonen vil gå gjennom:

- Forstå Microsoft Agent Framework: Nøkkelfunksjoner og verdi  
- Utforske kjernebegrepene i Microsoft Agent Framework
- Avanserte MAF-mønstre: Arbeidsflyt, mellomvare og minne

## Læringsmål

Etter å ha fullført denne leksjonen, vil du kunne:

- Bygge produksjonsklare AI-agenter med Microsoft Agent Framework
- Anvende kjernefunksjonene i Microsoft Agent Framework i dine agentiske brukstilfeller
- Bruke avanserte mønstre inkludert arbeidsflyter, mellomvare og observabilitet

## Eksempelkode 

Eksempelkode for [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) finnes i dette depotet under filene `xx-python-agent-framework` og `xx-dotnet-agent-framework`.

## Forstå Microsoft Agent Framework

![Framework Intro](../../../translated_images/no/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) er Microsofts enhetlige rammeverk for å bygge AI-agenter. Det tilbyr fleksibilitet til å håndtere det brede spekteret av agentiske brukstilfeller som finnes i både produksjons- og forskningsmiljøer, inkludert:

- **Sekvensiell agentorkestrering** i scenarier hvor steg-for-steg arbeidsflyter er nødvendig.
- **Samtidig orkestrering** i scenarier hvor agenter må fullføre oppgaver samtidig.
- **Gruppechatsorkestrering** i scenarier hvor agenter kan samarbeide om en oppgave.
- **Overleveringsorkestrering** i scenarier hvor agenter overlater oppgaven til hverandre etter hvert som deloppgaver fullføres.
- **Magnetisk orkestrering** i scenarier hvor en lederagent oppretter og modifiserer en oppgaveliste og håndterer koordineringen av underagenter for å fullføre oppgaven.

For å levere AI-agenter i produksjon inkluderer MAF også funksjoner for:

- **Observabilitet** gjennom bruk av OpenTelemetry hvor hver handling til AI-agenten inkludert verktøykall, orkestreringstrinn, resonnementstrømmer og ytelsesovervåking gjennom Microsoft Foundry dashboards.
- **Sikkerhet** ved å hoste agenter nativt på Microsoft Foundry, som inkluderer sikkerhetskontroller som rollebasert tilgang, håndtering av private data og innebygd innholdssikkerhet.
- **Holdbarhet** ettersom agenttråder og arbeidsflyter kan pause, gjenoppta og komme seg etter feil, noe som muliggjør lengre kjørende prosesser.
- **Kontroll** da arbeidsflyter med menneskelig i sløyfen støttes, hvor oppgaver merkes som krever menneskelig godkjenning.

Microsoft Agent Framework fokuserer også på å være interoperabel ved å:

- **Være skytjeneste-agnostisk** - Agenter kan kjøre i containere, lokalt og på tvers av flere forskjellige skyer.
- **Være leverandør-agnostisk** - Agenter kan opprettes via ditt foretrukne SDK inkludert Azure OpenAI og OpenAI
- **Integrere åpne standarder** - Agenter kan bruke protokoller som Agent-til-Agent (A2A) og Model Context Protocol (MCP) for å oppdage og bruke andre agenter og verktøy.
- **Plugins og tilkoblinger** - Tilkoblinger kan gjøres til data- og minnetjenester som Microsoft Fabric, SharePoint, Pinecone og Qdrant.

La oss se på hvordan disse funksjonene anvendes på noen av kjernebegrepene i Microsoft Agent Framework.

## Kjernebegreper i Microsoft Agent Framework

### Agenter

![Agent Framework](../../../translated_images/no/agent-components.410a06daf87b4fef.webp)

**Opprettelse av agent**

Agentopprettelse gjøres ved å definere inferenstjenesten (LLM-leverandør), et
sett med instruksjoner AI-agenten skal følge, og et tilordnet `name`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Ovenfor brukes `Azure OpenAI`, men agenter kan opprettes ved hjelp av ulike tjenester inkludert `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` API-er

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

eller [MiniMax](https://platform.minimaxi.com/), som tilbyr en OpenAI-kompatibel API med store kontekstvinduer (opptil 204K tokens):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

eller eksterne agenter ved bruk av A2A-protokollen:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Kjøre agenter**

Agenter kjøres med metodene `.run` eller `.run_stream` for henholdsvis ikke-strømmende eller strømmende svar.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Hver agentkjøring kan også ha valg for å tilpasse parametere som `max_tokens` brukt av agenten, `tools` agenten kan kalle, og selv `model` som brukes for agenten.

Dette er nyttig i tilfeller hvor spesifikke modeller eller verktøy er påkrevd for å fullføre brukerens oppgave.

**Verktøy**

Verktøy kan defineres både ved definering av agenten:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Når du oppretter en ChatAgent direkte

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

og også når agenten kjøres:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Verktøy levert kun for denne kjøringen )
```

**Agenttråder**

Agenttråder brukes til å håndtere samtaler med flere turer. Tråder kan opprettes enten ved:

- Bruke `get_new_thread()` som gjør det mulig å lagre tråden over tid
- Opprette en tråd automatisk når en agent kjøres, og kun ha tråden gjeldende under den nåværende kjøringen.

For å opprette en tråd ser koden slik ut:

```python
# Opprett en ny tråd.
thread = agent.get_new_thread() # Kjør agenten med tråden.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Du kan så serialisere tråden for lagring til senere bruk:

```python
# Opprett en ny tråd.
thread = agent.get_new_thread() 

# Kjør agenten med tråden.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serialiser tråden for lagring.

serialized_thread = await thread.serialize() 

# Deserialiser trådtilstanden etter innlasting fra lagring.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agent Mellomvare**

Agenter samhandler med verktøy og LLM-er for å fullføre brukerens oppgaver. I visse scenarier ønsker vi å utføre eller spore mellom disse samhandlingene. Agent mellomvare gjør dette mulig ved:

*Funksjonsmellomvare*

Denne mellomvaren tillater oss å utføre en handling mellom agenten og en funksjon/verktøy som den kaller. Et eksempel på når dette brukes er dersom du vil loggføre funksjonskallet.

I koden under definerer `next` om neste mellomvare eller den faktiske funksjonen skal kalles.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Forbehandling: Logg før funksjonsutførelse
    print(f"[Function] Calling {context.function.name}")

    # Fortsett til neste mellomvare eller funksjonsutførelse
    await next(context)

    # Etterbehandling: Logg etter funksjonsutførelse
    print(f"[Function] {context.function.name} completed")
```

*Chat Mellomvare*

Denne mellomvaren tillater oss å utføre eller loggføre en handling mellom agenten og forespørslene til LLM.

Dette inneholder viktig informasjon som `messages` som sendes til AI-tjenesten.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Forbehandling: Logg før AI-kall
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Fortsett til neste mellomvare eller AI-tjeneste
    await next(context)

    # Etterbehandling: Logg etter AI-svar
    print("[Chat] AI response received")

```

**Agentminne**

Som dekket i leksjonen `Agentic Memory`, er minne et viktig element for å gjøre det mulig for agenten å fungere over forskjellige kontekster. MAF tilbyr flere ulike typer minne:

*Minne i arbeidsminnet*

Dette er minnet som lagres i tråder under applikasjonskjøringen.

```python
# Opprett en ny tråd.
thread = agent.get_new_thread() # Kjør agenten med tråden.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Vedvarende meldinger*

Dette minnet brukes til lagring av samtalehistorikk på tvers av forskjellige økter. Det defineres ved bruk av `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Opprett en tilpasset meldingslager
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynamisk minne*

Dette minnet legges til konteksten før agenter kjøres. Disse minnene kan lagres i eksterne tjenester som mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Bruker Mem0 for avanserte minnefunksjoner
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

Observabilitet er viktig for å bygge pålitelige og vedlikeholdsvennlige agentiske systemer. MAF integreres med OpenTelemetry for å tilby tracing og målinger for bedre observabilitet.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # gjør noe
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Arbeidsflyter

MAF tilbyr arbeidsflyter som er forhåndsdefinerte steg for å fullføre en oppgave og inkluderer AI-agenter som komponenter i stegene.

Arbeidsflyter består av forskjellige komponenter som gir bedre styring av flyten. Arbeidsflyter muliggjør også **multi-agent orkestrering** og **sjekkpunktering** for å lagre arbeidsflytens tilstander.

De viktigste komponentene i en arbeidsflyt er:

**Utførere**

Utførere mottar innkommende meldinger, utfører tildelte oppgaver, og produserer så en utgående melding. Dette driver arbeidsflyten fremover mot å fullføre den større oppgaven. Utførere kan være enten AI-agent eller spesiallogikk.

**Kanter**

Kanter brukes til å definere flyten av meldinger i en arbeidsflyt. Disse kan være:

*Direkte kanter* - Enkle en-til-en koblinger mellom utførere:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Betingede kanter* - Aktiveres når en bestemt betingelse oppfylles. For eksempel, når hotellrom ikke er tilgjengelig, kan en utfører foreslå andre alternativer.

*Switch-case kanter* - Ruter meldinger til ulike utførere basert på definerte betingelser. For eksempel, om en reisekunde har prioritert tilgang og oppgaver håndteres gjennom en annen arbeidsflyt.

*Fan-ut kanter* - Sender én melding til flere mål.

*Fan-inn kanter* - Samler flere meldinger fra forskjellige utførere og sender til ett mål.

**Hendelser**

For å gi bedre observabilitet i arbeidsflyter tilbyr MAF innebygde hendelser for utførelse inkludert:

- `WorkflowStartedEvent`  - Workflow-utførelse begynner
- `WorkflowOutputEvent` - Workflow produserer et resultat
- `WorkflowErrorEvent` - Workflow opplever en feil
- `ExecutorInvokeEvent`  - Utfører starter behandling
- `ExecutorCompleteEvent`  -  Utfører avslutter behandling
- `RequestInfoEvent` - En forespørsel utstedes

## Avanserte MAF-mønstre

Seksjonene over dekker kjernebegrepene i Microsoft Agent Framework. Når du bygger mer komplekse agenter, er det noen avanserte mønstre å vurdere:

- **Sammensetning av mellomvare**: Kjede flere mellomvarehåndterere (logging, autorisasjon, rate-limiting) ved bruk av funksjons- og chatmellomvare for finjustert kontroll over agentens oppførsel.
- **Sjekkpunktering av arbeidsflyt**: Bruk hendelser og serialisering for arbeidsflyt for å lagre og gjenoppta langvarige agentprosesser.
- **Dynamisk verktøyvalg**: Kombiner RAG (Retrieval-Augmented Generation) over verktøybeskrivelser med MAFs verktøyregistrering for å presentere kun relevante verktøy per forespørsel.
- **Multi-agent overlevering**: Bruk arbeidsflytlene og betinget ruting for å orkestrere overlevering mellom spesialiserte agenter.

## Hoste LangChain / LangGraph Agenter på Microsoft Foundry

Microsoft Agent Framework er **rammeverks-interoperabelt** — du er ikke begrenset til agenter skrevet med MAF. Hvis du allerede har en agent bygget med **LangChain** eller **LangGraph**, kan du kjøre den som en **Microsoft Foundry-hostet agent** slik at Foundry håndterer runtime, økter, skalering, identitet, og protokollendepunkter for deg, mens agentlogikken din forblir i LangGraph.

Dette gjøres med `langchain_azure_ai.agents.hosting`-pakken, som eksponerer en kompilert LangGraph-graf over de samme protokollene som Foundry-hostede agenter bruker.

**1. Installer hosting-ekstra:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting`-ekstraen installerer Foundry-protokollbiblioteker: `azure-ai-agentserver-responses` (OpenAI-kompatibelt `/responses` endepunkt) og `azure-ai-agentserver-invocations` (generisk `/invocations` endepunkt).

**2. Velg hosting-protokoll:**

| Protokoll | Host-klasse | Endepunkt | Bruk når |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Du ønsker OpenAI-kompatibel chat, streaming, svargrafikk og samtaletråder — anbefalt standard for samtaleagenter. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Du trenger egendefinert JSON-format, et webhook-lignende endepunkt, eller ikke-samtalebehandling. |

Fordi **Responses API er hoved-API-en for agentstil utvikling i Foundry**, start med `ResponsesHostServer` for de fleste agenter.

**3. Konfigurer miljøvariabler** (`az login` først slik at `DefaultAzureCredential` kan autentisere):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Når agenten senere kjøres som hostet agent i Foundry, injiserer plattformen automatisk `FOUNDRY_PROJECT_ENDPOINT`.

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

    # ChatOpenAI her retter seg mot Foundry-prosjektets OpenAI-kompatible (Responses) endepunkt.
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

Kjør den lokalt med `python main.py`, og send deretter en Responses-forespørsel til `http://localhost:8088/responses`.

**Nøkkeloppførsler:**

- **Samtaler**: Klienter fortsetter en samtale ved å sende `previous_response_id` eller en `conversation` ID. Hvis grafen din er kompilert med en LangGraph sjekkpunktfunksjon, kobler Foundry samtaletilstand til sjekkpunktet (bruk en holdbar sjekkpunktfunksjon i produksjon; `MemorySaver` er greit for lokal testing).
- **Menneske i sløyfen**: Hvis grafen din bruker LangGraph `interrupt()`, eksponerer `ResponsesHostServer` den ventende avbruddet som et Responses `function_call` / `mcp_approval_request` element, og klienter fortsetter med en tilsvarende `function_call_output` / `mcp_approval_response`.
- **Distribuer til Foundry**: Bruk Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (lokalt, krever Docker), deretter `azd provision` og `azd deploy`. Distribusjon av hostede agenter krever **Foundry Project Manager**-rollen.

En kjørbar versjon av dette eksempelet finnes i [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). For full gjennomgang (Invocations-protokoll, egendefinerte forespørsels-skjemaer og feilsøking), se [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Eksempelkode 

Eksempelkode for Microsoft Agent Framework finnes i dette depotet under filene `xx-python-agent-framework` og `xx-dotnet-agent-framework`.

## Har du flere spørsmål om Microsoft Agent Framework?

Bli med i [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) for å møte andre elever, delta på kontortider og få svar på dine spørsmål om AI-agenter.
## Forrige leksjon

[Minne for AI-agenter](../13-agent-memory/README.md)

## Neste leksjon

[Bygge databruksagenter (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->