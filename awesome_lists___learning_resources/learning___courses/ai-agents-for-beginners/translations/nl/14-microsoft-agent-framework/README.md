# Verkenning van Microsoft Agent Framework

![Agent Framework](../../../translated_images/nl/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Introductie

Deze les behandelt:

- Begrip van Microsoft Agent Framework: Belangrijkste functies en waarde  
- Verkenning van de kernconcepten van Microsoft Agent Framework
- Geavanceerde MAF-patronen: Workflows, Middleware en Geheugen

## Leerdoelen

Na het voltooien van deze les weet je hoe je:

- Productierijpe AI-agenten bouwt met Microsoft Agent Framework
- De kernfuncties van Microsoft Agent Framework toepast op je agent-achtige gebruikssituaties
- Geavanceerde patronen gebruikt, waaronder workflows, middleware en observeerbaarheid

## Codevoorbeelden 

Codevoorbeelden voor [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) zijn te vinden in deze repository onder de bestanden `xx-python-agent-framework` en `xx-dotnet-agent-framework`.

## Begrip van Microsoft Agent Framework

![Framework Intro](../../../translated_images/nl/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) is Microsofts unified framework voor het bouwen van AI-agenten. Het biedt de flexibiliteit om een breed scala aan agent-achtige gebruikssituaties te adresseren die voorkomen in zowel productie- als onderzoekomgevingen, waaronder:

- **Sequentiële agentorkestratie** in scenario’s waarin stapsgewijze workflows nodig zijn.
- **Gelijktijdige orkestratie** in scenario’s waarin agenten taken tegelijkertijd moeten voltooien.
- **Groepschatorkestratie** in scenario’s waarin agenten samen aan één taak kunnen samenwerken.
- **Overdrachtsorkestratie** in scenario’s waarin agenten taken aan elkaar overdragen naarmate subtaken worden voltooid.
- **Magnetische orkestratie** in scenario’s waarin een manager-agent een takenlijst maakt en wijzigt en de coördinatie van subagenten regelt om de taak te voltooien.

Om AI-agenten in productie te leveren, bevat MAF ook functies voor:

- **Observeerbaarheid** via het gebruik van OpenTelemetry, waarbij elke actie van de AI-agent wordt gevolgd, inclusief tool-uitspraken, orkestratiestappen, redeneerstromen en prestatiemonitoring via Microsoft Foundry dashboards.
- **Beveiliging** door agenten native te hosten op Microsoft Foundry, met beveiligingscontroles zoals rolgebaseerde toegang, privacybehandeling en ingebouwde inhoudsveiligheid.
- **Duurzaamheid** doordat agentthreads en workflows kunnen pauzeren, hervatten en herstellen van fouten, waardoor langere processen mogelijk zijn.
- **Controle** doordat human-in-the-loop-workflows worden ondersteund waarbij taken als vereist voor menselijke goedkeuring worden gemarkeerd.

Microsoft Agent Framework is ook gericht op interoperabiliteit door:

- **Cloud-agnostisch te zijn** - Agenten kunnen draaien in containers, on-premises en in meerdere verschillende clouds.
- **Provider-agnostisch te zijn** - Agenten kunnen worden gemaakt via je voorkeurs-SDK, inclusief Azure OpenAI en OpenAI.
- **Open standaarden te integreren** - Agenten kunnen protocollen gebruiken zoals Agent-to-Agent (A2A) en Model Context Protocol (MCP) om andere agenten en tools te ontdekken en te gebruiken.
- **Plugins en connectors** - Verbindingen kunnen worden gemaakt met data- en geheugendiensten zoals Microsoft Fabric, SharePoint, Pinecone en Qdrant.

Laten we eens kijken hoe deze functies worden toegepast op enkele kernconcepten van Microsoft Agent Framework.

## Kernconcepten van Microsoft Agent Framework

### Agenten

![Agent Framework](../../../translated_images/nl/agent-components.410a06daf87b4fef.webp)

**Agenten maken**

Het maken van agenten gebeurt door het definiëren van de inferentieservice (LLM-provider), een
set instructies die de AI-agent moet volgen, en een toegewezen `naam`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Bovenstaand gebruikt `Azure OpenAI`, maar agenten kunnen worden gemaakt met verschillende services, waaronder `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` APIs

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

of [MiniMax](https://platform.minimaxi.com/), dat een OpenAI-compatibele API biedt met grote contextvensters (tot 204K tokens):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

of externe agenten via het A2A-protocol:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Agenten uitvoeren**

Agenten worden uitgevoerd met `.run` of `.run_stream` methoden voor respectievelijk niet-streaming of streaming antwoorden.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Elke agentuitvoering kan ook opties bevatten om parameters aan te passen zoals `max_tokens` gebruikt door de agent, `tools` die de agent kan aanroepen, en zelfs het gebruikte `model` voor de agent.

Dit is nuttig in gevallen waarin specifieke modellen of tools nodig zijn om een taak van een gebruiker te voltooien.

**Tools**

Tools kunnen worden gedefinieerd zowel bij het definiëren van de agent:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Bij het direct aanmaken van een ChatAgent

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

alsook bij het uitvoeren van de agent:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Hulpmiddel alleen voor deze uitvoering geleverd )
```

**Agentthreads**

Agentthreads worden gebruikt om meerdere gespreksronden af te handelen. Threads kunnen worden gemaakt door:

- `get_new_thread()` te gebruiken, waarmee de thread in de loop van de tijd kan worden opgeslagen.
- Automatisch een thread te creëren wanneer een agent wordt uitgevoerd, waarbij de thread alleen tijdens de huidige uitvoering geldt.

De code om een thread te maken ziet er zo uit:

```python
# Maak een nieuwe thread aan.
thread = agent.get_new_thread() # Voer de agent uit met de thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Je kunt de thread daarna serialiseren om hem later op te slaan:

```python
# Maak een nieuwe thread aan.
thread = agent.get_new_thread() 

# Voer de agent uit met de thread.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serialiseer de thread voor opslag.

serialized_thread = await thread.serialize() 

# Deserialiseer de thread status na het laden uit opslag.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agent Middleware**

Agenten communiceren met tools en LLM's om taken van gebruikers te voltooien. In bepaalde scenario's willen we acties uitvoeren of volgen tussen deze interacties. Agent middleware maakt dit mogelijk via:

*Function Middleware*

Deze middleware stelt ons in staat een actie uit te voeren tussen de agent en een functie/tool die wordt aangeroepen. Een voorbeeld van het gebruik hiervan is logging van de functiewaarde.

In de onderstaande code definieert `next` of de volgende middleware of de eigenlijke functie moet worden aangeroepen.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Voorbewerking: Loggen voor functie-uitvoering
    print(f"[Function] Calling {context.function.name}")

    # Ga door naar de volgende middleware of functie-uitvoering
    await next(context)

    # Nabewerking: Loggen na functie-uitvoering
    print(f"[Function] {context.function.name} completed")
```

*Chat Middleware*

Deze middleware stelt ons in staat een actie uit te voeren of te loggen tussen de agent en de verzoeken tussen de LLM.

Dit bevat belangrijke informatie zoals de `messages` die naar de AI-service worden verzonden.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Voorbewerking: Loggen voor AI-aanroep
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Ga verder naar volgende middleware of AI-service
    await next(context)

    # Nabewerking: Loggen na AI-reactie
    print("[Chat] AI response received")

```

**Agentgeheugen**

Zoals behandeld in de les `Agentic Memory`, is geheugen een belangrijk element dat de agent in staat stelt over verschillende contexten te opereren. MAF biedt verschillende soorten geheugen:

*In-Memory Storage*

Dit is het geheugen dat tijdens de uitvoering van het programma in threads wordt opgeslagen.

```python
# Maak een nieuwe thread aan.
thread = agent.get_new_thread() # Voer de agent uit met de thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Persistent Messages*

Dit geheugen wordt gebruikt om de gesprekshistorie over verschillende sessies op te slaan. Het wordt gedefinieerd met behulp van de `chat_message_store_factory` :

```python
from agent_framework import ChatMessageStore

# Maak een aangepaste berichtopslag
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynamisch geheugen*

Dit geheugen wordt aan de context toegevoegd voordat agenten worden uitgevoerd. Deze geheugen kunnen worden opgeslagen in externe services zoals mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Mem0 gebruiken voor geavanceerde geheugenmogelijkheden
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

**Agent Observeerbaarheid**

Observeerbaarheid is belangrijk voor het bouwen van betrouwbare en onderhoudbare agent-achtige systemen. MAF integreert met OpenTelemetry voor tracing en metertjes voor betere observeerbaarheid.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # doe iets
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Workflows

MAF biedt workflows die vooraf gedefinieerde stappen zijn om een taak te voltooien en AI-agenten als componenten in die stappen omvatten.

Workflows bestaan uit verschillende componenten die een betere controle over de stroom mogelijk maken. Workflows maken ook **multi-agent orkestratie** en **checkpointing** mogelijk om workflowtoestanden op te slaan.

De kerncomponenten van een workflow zijn:

**Executors**

Executors ontvangen invoerberichten, voeren hun toegewezen taken uit en produceren vervolgens een uitvoerbericht. Dit brengt de workflow dichter bij het voltooien van de grotere taak. Executors kunnen AI-agenten of aangepaste logica zijn.

**Edges**

Edges worden gebruikt om de stroom van berichten in een workflow te definiëren. Deze kunnen zijn:

*Directe Edges* - Eenvoudige één-op-één verbindingen tussen executors:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Voorwaardelijke Edges* - Geactiveerd nadat aan een bepaalde voorwaarde is voldaan. Bijvoorbeeld wanneer hotelkamers niet beschikbaar zijn, kan een executor alternatieven voorstellen.

*Switch-case Edges* - Routen berichten naar verschillende executors op basis van gedefinieerde voorwaarden. Bijvoorbeeld, als een reisgebruiker prioritaire toegang heeft, worden hun taken via een andere workflow afgehandeld.

*Fan-out Edges* - Sturen één bericht naar meerdere bestemmingen.

*Fan-in Edges* - Verzamelen meerdere berichten van verschillende executors en sturen naar één bestemming.

**Events**

Om betere observeerbaarheid van workflows te bieden, biedt MAF ingebouwde events voor uitvoering, waaronder:

- `WorkflowStartedEvent`  - Workflowuitvoering begint
- `WorkflowOutputEvent` - Workflow genereert uitvoer
- `WorkflowErrorEvent` - Workflow ondervindt een fout
- `ExecutorInvokeEvent`  - Executor begint met verwerken
- `ExecutorCompleteEvent`  - Executor voltooit verwerken
- `RequestInfoEvent` - Een verzoek wordt ingediend

## Geavanceerde MAF-patronen

De bovenstaande secties behandelen de kernconcepten van Microsoft Agent Framework. Naarmate je complexere agenten bouwt, zijn hier enkele geavanceerde patronen om te overwegen:

- **Middlewarecompositie**: Schakel meerdere middlewarehandlers aan elkaar (logging, authenticatie, rate-limiting) met function- en chat-middleware voor fijnmazige controle over agentgedrag.
- **Workflow checkpointing**: Gebruik workflow-events en serialisatie om lange agentprocessen op te slaan en te hervatten.
- **Dynamische toolselectie**: Combineer RAG over toolbeschrijvingen met MAF's toolregistratie om alleen relevante tools per query aan te bieden.
- **Multi-agent overdracht**: Gebruik workflow-edges en conditionele routering om overdrachten tussen gespecialiseerde agenten te orkestreren.

## Codevoorbeelden 

Codevoorbeelden voor Microsoft Agent Framework zijn te vinden in deze repository onder de bestanden `xx-python-agent-framework` en `xx-dotnet-agent-framework`.

## Meer vragen over Microsoft Agent Framework?

Word lid van de [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) om andere leerlingen te ontmoeten, deel te nemen aan office hours en je vragen over AI-agenten beantwoord te krijgen.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel wij streven naar nauwkeurigheid, dient u zich ervan bewust te zijn dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet als de gezaghebbende bron worden beschouwd. Voor cruciale informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->