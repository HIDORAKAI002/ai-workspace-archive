# Udforskning af Microsoft Agent Framework

![Agent Framework](../../../translated_images/da/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Introduktion

Denne lektion vil dække:

- Forstå Microsoft Agent Framework: Nøglefunktioner og værdi  
- Udforskning af nøglebegreberne i Microsoft Agent Framework
- Avancerede MAF-mønstre: Workflows, Middleware og Hukommelse

## Læringsmål

Efter at have gennemført denne lektion vil du vide, hvordan du:

- Bygger produktionsklare AI-agenter ved hjælp af Microsoft Agent Framework
- Anvender kernefunktionerne i Microsoft Agent Framework på dine agentbaserede use cases
- Bruger avancerede mønstre, herunder workflows, middleware og observabilitet

## Kodeeksempler 

Kodeeksempler for [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) kan findes i dette repository under filerne `xx-python-agent-framework` og `xx-dotnet-agent-framework`.

## Forstå Microsoft Agent Framework

![Framework Intro](../../../translated_images/da/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) er Microsofts samlede framework til at bygge AI-agenter. Det tilbyder fleksibiliteten til at håndtere en bred vifte af agentbaserede use cases, som ses både i produktions- og forskningsmiljøer, herunder:

- **Sekventiel Agent-orkestrering** i scenarier, hvor trin for trin workflows er nødvendige.
- **Samtidig orkestrering** i scenarier, hvor agenter skal udføre opgaver samtidigt.
- **Gruppechat-orkestrering** i scenarier, hvor agenter kan samarbejde om én opgave.
- **Handoff-orkestrering** i scenarier, hvor agenter overlader opgaven til hinanden, efterhånden som delopgaverne bliver færdige.
- **Magnetisk orkestrering** i scenarier, hvor en manager-agent opretter og ændrer en opgaveliste og håndterer koordineringen af subagenter til at fuldføre opgaven.

For at levere AI-agenter i produktion inkluderer MAF også funktioner til:

- **Observabilitet** gennem brug af OpenTelemetry, hvor hver handling fra AI-agenten, inklusive værktøjskald, orkestreringstrin, ræsonnementstrømme og ydelsesovervågning via Microsoft Foundry dashboards, spores.
- **Sikkerhed** ved at være hostet nativt på Microsoft Foundry, hvilket inkluderer sikkerhedskontroller som rollebaseret adgang, håndtering af privat data og indbygget indholdssikkerhed.
- **Holdbarhed** da agenttråde og workflows kan pause, genoptage og genoprette fra fejl, hvilket muliggør længerevarende processer.
- **Kontrol** da menneskelig involvering understøttes, hvor opgaver markeres som krævende menneskelig godkendelse.

Microsoft Agent Framework fokuserer også på interoperabilitet ved at:

- **Være Cloud-agnostisk** - agenter kan køre i containere, on-premise og på tværs af flere forskellige clouds.
- **Være leverandøruafhængig** - agenter kan oprettes gennem dit foretrukne SDK, inklusive Azure OpenAI og OpenAI.
- **Integrere åbne standarder** - agenter kan bruge protokoller som Agent-to-Agent (A2A) og Model Context Protocol (MCP) til at opdage og bruge andre agenter og værktøjer.
- **Plugins og Connectors** - forbindelser kan laves til data- og hukommelsestjenester som Microsoft Fabric, SharePoint, Pinecone og Qdrant.

Lad os se på, hvordan disse funktioner anvendes på nogle af kernebegreberne i Microsoft Agent Framework.

## Nøglebegreber i Microsoft Agent Framework

### Agenter

![Agent Framework](../../../translated_images/da/agent-components.410a06daf87b4fef.webp)

**Oprettelse af agenter**

Agentoprettelse sker ved at definere inferenstjenesten (LLM-udbyder), et sæt instruktioner for AI-agenten at følge, og et tildelt `name`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Ovenstående bruger `Azure OpenAI`, men agenter kan oprettes ved hjælp af en række tjenester, herunder `Microsoft Foundry Agent Service`:

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
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

eller fjernagenter ved brug af A2A-protokollen:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Kørsel af agenter**

Agenter køres ved hjælp af `.run` eller `.run_stream` metoderne for henholdsvis ikke-streamende eller streamende svar.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Hver kørselsinstans af en agent kan også have muligheder for at tilpasse parametre som `max_tokens` brugt af agenten, `tools` som agenten må kalde, og endda den `model` selv, som bruges for agenten.

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

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Værktøj kun tilgængeligt for denne kørsel )
```

**Agenttråde**

Agenttråde bruges til at håndtere samtaler med flere omgange. Tråde kan oprettes enten ved:

- Brug af `get_new_thread()`, som gør det muligt at gemme tråden over tid
- Automatisk oprettelse af en tråd, når en agent køres, og hvor tråden kun varer under den aktuelle kørsel.

For at oprette en tråd ser koden sådan ud:

```python
# Opret en ny tråd.
thread = agent.get_new_thread() # Kør agenten med tråden.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Du kan herefter serialisere tråden for at gemme den til senere brug:

```python
# Opret en ny tråd.
thread = agent.get_new_thread() 

# Kør agenten med tråden.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serialiser tråden til opbevaring.

serialized_thread = await thread.serialize() 

# Deserialiser trådtilstanden efter indlæsning fra opbevaring.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agent Middleware**

Agenter interagerer med værktøjer og LLM'er for at fuldføre brugeropgaver. I visse scenarier ønsker vi at udføre eller spore handlinger imellem disse interaktioner. Agent middleware gør det muligt gennem:

*Funktion Middleware*

Denne middleware lader os udføre en handling mellem agenten og en funktion/værktøj, som den vil kalde. Et eksempel på brug er, når du ønsker at logge funktionen kald.

I koden nedenfor definerer `next`, om den næste middleware eller den faktiske funktion skal kaldes.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Forbehandling: Log før funktionskørsel
    print(f"[Function] Calling {context.function.name}")

    # Fortsæt til næste middleware eller funktionskørsel
    await next(context)

    # Efterbehandling: Log efter funktionskørsel
    print(f"[Function] {context.function.name} completed")
```

*Chat Middleware*

Denne middleware lader os udføre eller logge en handling mellem agenten og anmodningerne mellem LLM.

Dette indeholder vigtig information som `messages` der sendes til AI-tjenesten.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Forbehandling: Log før AI-opkald
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Fortsæt til næste middleware eller AI-tjeneste
    await next(context)

    # Efterbehandling: Log efter AI-svar
    print("[Chat] AI response received")

```

**Agenthukommelse**

Som dækket i lektionen `Agentic Memory`, er hukommelse et vigtigt element for at gøre agenten i stand til at operere over forskellige kontekster. MAF tilbyder flere forskellige typer hukommelser:

*In-Memory Storage*

Dette er hukommelsen, der opbevares i tråde under applikationskørslen.

```python
# Opret en ny tråd.
thread = agent.get_new_thread() # Kør agenten med tråden.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Persistent Messages*

Denne hukommelse bruges ved opbevaring af samtalehistorik på tværs af forskellige sessioner. Den defineres ved hjælp af `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Opret en brugerdefineret meddelelseslager
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynamisk hukommelse*

Denne hukommelse tilføjes til konteksten, før agenter køres. Disse hukommelser kan opbevares i eksterne tjenester som mem0:

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

**Agent Observability**

Observabilitet er vigtigt for at bygge pålidelige og vedligeholdbare agentbaserede systemer. MAF integrerer med OpenTelemetry for at tilbyde sporing og måling for bedre observabilitet.

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

### Workflows

MAF tilbyder workflows, som er foruddefinerede trin til at fuldføre en opgave og inkluderer AI-agenter som komponenter i disse trin.

Workflows består af forskellige komponenter, der tillader bedre kontrol over flowet. Workflows muliggør også **multi-agent orkestrering** og **checkpointing** til at gemme workflow-tilstande.

De kernekomponenter i et workflow er:

**Executors**

Executors modtager inputbeskeder, udfører deres tildelte opgaver og producerer derefter en outputbesked. Dette flytter workflowet frem mod at fuldføre den større opgave. Executors kan være enten AI-agenter eller brugerdefineret logik.

**Edges**

Edges bruges til at definere flowet af beskeder i et workflow. Disse kan være:

*Direkte Edges* - Enkle en-til-en forbindelser mellem executors:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Betingede Edges* - Aktiveres efter en bestemt betingelse er opfyldt. F.eks. hvis hotelværelser ikke er tilgængelige, kan en executor foreslå andre muligheder.

*Switch-case Edges* - Dirigerer beskeder til forskellige executors afhængigt af definerede betingelser. For eksempel, hvis en rejsende kunde har prioriteret adgang, håndteres deres opgaver gennem et andet workflow.

*Fan-out Edges* - Sender én besked til flere mål.

*Fan-in Edges* - Samler flere beskeder fra forskellige executors og sender til ét mål.

**Events**

For at give bedre observabilitet over workflows tilbyder MAF indbyggede events for eksekvering, herunder:

- `WorkflowStartedEvent`  - Workflow-eksekvering begynder
- `WorkflowOutputEvent` - Workflow producerer en output
- `WorkflowErrorEvent` - Workflow støder på en fejl
- `ExecutorInvokeEvent`  - Executor begynder behandling
- `ExecutorCompleteEvent`  -  Executor afslutter behandling
- `RequestInfoEvent` - En anmodning udstedes

## Avancerede MAF-mønstre

Ovenstående sektioner dækker nøglebegreberne i Microsoft Agent Framework. Når du bygger mere komplekse agenter, er her nogle avancerede mønstre at overveje:

- **Middleware-komposition**: Kæd flere middleware-behandlere (logging, auth, rate-limiting) ved hjælp af funktion- og chat-middleware for finmasket kontrol over agentens adfærd.
- **Workflow-checkpointing**: Brug workflow-events og serialisering til at gemme og genoptage langvarige agentprocesser.
- **Dynamisk værktøjsvalg**: Kombiner RAG over værktøjsbeskrivelser med MAF’s værktøjsregistrering for kun at præsentere relevante værktøjer pr. forespørgsel.
- **Multi-agent handoff**: Brug workflow-edges og betinget routing til at orkestrere overlevering mellem specialiserede agenter.

## Kodeeksempler 

Kodeeksempler for Microsoft Agent Framework kan findes i dette repository under filerne `xx-python-agent-framework` og `xx-dotnet-agent-framework`.

## Flere spørgsmål om Microsoft Agent Framework?

Deltag i [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) for at møde andre lærende, deltage i kontortid og få svar på dine spørgsmål om AI-agenter.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:  
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi stræber efter nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for eventuelle misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->