# Verkenning van het Microsoft Agent Framework

![Agent Framework](../../../translated_images/nl/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Introductie

Deze les behandelt:

- Begrijpen van Microsoft Agent Framework: Belangrijke functies en waarde  
- Verkennen van de kernconcepten van Microsoft Agent Framework
- Geavanceerde MAF-patronen: Workflows, middleware en geheugen

## Leerdoelen

Na het voltooien van deze les weet je hoe je:

- Productieklaar AI-agents bouwt met Microsoft Agent Framework
- De kernfuncties van Microsoft Agent Framework toepast op je agent-gerichte gebruiksscenario's
- Geavanceerde patronen gebruikt, waaronder workflows, middleware en observability

## Codevoorbeelden 

Codevoorbeelden voor [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) zijn te vinden in deze repository onder de bestanden `xx-python-agent-framework` en `xx-dotnet-agent-framework`.

## Begrijpen van Microsoft Agent Framework

![Framework Intro](../../../translated_images/nl/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) is Microsofts uniforme framework voor het bouwen van AI-agents. Het biedt de flexibiliteit om een breed scala aan agent-gerichte gebruiksscenario's aan te pakken, zowel in productie- als onderzoeksomgevingen, waaronder:

- **Sequentiële agentorkestratie** in scenario's waar stap-voor-stap workflows nodig zijn.
- **Gelijktijdige orkestratie** in scenario's waar agents taken tegelijk moeten uitvoeren.
- **Groepschat-orkestratie** in scenario's waar agents samen aan één taak kunnen samenwerken.
- **Overdracht-orkestratie** in scenario's waar agents taken aan elkaar overdragen na voltooiing van subtaken.
- **Magnetische orkestratie** in scenario's waar een manager-agent een takenlijst maakt en aanpast en de coördinatie van subagents verzorgt om de taak te voltooien.

Om AI-agents in productie te leveren, bevat MAF ook functies voor:

- **Observability** via het gebruik van OpenTelemetry waarbij elke actie van de AI-agent, inclusief tool-aanroepen, orkestratiestappen, redeneringen en prestatiemonitoring via Microsoft Foundry dashboards, wordt gevolgd.
- **Beveiliging** door agents native te hosten op Microsoft Foundry, inclusief beveiligingscontrole zoals op rollen gebaseerde toegang, privé-gegevensverwerking en ingebouwde contentveiligheid.
- **Duurzaamheid** doordat agent-threads en workflows kunnen pauzeren, hervatten en herstellen van fouten, wat langere processen mogelijk maakt.
- **Controle** doordat human-in-the-loop workflows worden ondersteund waarbij taken als menselijk goedkeuring vereisend worden gemarkeerd.

Microsoft Agent Framework richt zich ook op interoperabiliteit door:

- **Cloud-agnostisch zijn** - Agents kunnen draaien in containers, on-premises en in verschillende clouds.
- **Provider-agnostisch zijn** - Agents kunnen worden gemaakt via je favoriete SDK, waaronder Azure OpenAI en OpenAI.
- **Integratie van open standaarden** - Agents kunnen protocollen gebruiken zoals Agent-to-Agent (A2A) en Model Context Protocol (MCP) om andere agents en tools te ontdekken en gebruiken.
- **Plugins en Connectors** - Verbindingen kunnen worden gemaakt met data- en geheugendiensten zoals Microsoft Fabric, SharePoint, Pinecone en Qdrant.

Laten we kijken hoe deze functies worden toegepast op enkele kernconcepten van Microsoft Agent Framework.

## Kernconcepten van Microsoft Agent Framework

### Agents

![Agent Framework](../../../translated_images/nl/agent-components.410a06daf87b4fef.webp)

**Agents maken**

Het maken van een agent gebeurt door het definiëren van de inferentieservice (LLM-provider), een
set instructies voor de AI-agent om te volgen, en de toegewezen `naam`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Bovenstaand voorbeeld gebruikt `Azure OpenAI`, maar agents kunnen worden gemaakt met verschillende services, waaronder `Microsoft Foundry Agent Service`:

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

of [MiniMax](https://platform.minimaxi.com/), die een OpenAI-compatibele API met grote contextvensters (tot 204K tokens) biedt:

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

of externe agents via het A2A-protocol:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Agents uitvoeren**

Agents worden uitgevoerd met de `.run` of `.run_stream` methoden voor respectievelijk niet-streaming- en streaming-antwoorden.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Elke agentuitvoering kan ook opties bevatten om parameters zoals `max_tokens` die de agent gebruikt, `tools` die de agent kan aanroepen, en zelfs het gebruikte `model` te customizen.

Dit is handig in gevallen waar specifieke modellen of tools nodig zijn om een taak van een gebruiker te voltooien.

**Tools**

Tools kunnen zowel bij het definiëren van de agent worden opgegeven:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Bij het direct aanmaken van een ChatAgent

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

en ook bij het uitvoeren van de agent:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Hulpmiddel alleen voor deze run aangeboden )
```

**Agent Threads**

Agent Threads worden gebruikt om multi-turn gesprekken af te handelen. Threads kunnen worden gemaakt door:

- Gebruik van `get_new_thread()` waardoor de thread over tijd opgeslagen kan worden
- Automatisch een thread aan te maken tijdens het uitvoeren van een agent waarbij de thread slechts gedurende de huidige uitvoering bestaat.

Code om een thread te maken ziet er zo uit:

```python
# Maak een nieuwe thread aan.
thread = agent.get_new_thread() # Voer de agent uit met de thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Vervolgens kun je de thread serialiseren om later te bewaren:

```python
# Maak een nieuwe thread aan.
thread = agent.get_new_thread() 

# Voer de agent uit met de thread.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serialiseer de thread voor opslag.

serialized_thread = await thread.serialize() 

# Deserialiseer de threadstatus na het laden vanuit opslag.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agent Middleware**

Agents communiceren met tools en LLM's om taken van gebruikers te voltooien. In bepaalde scenario's willen we tussen deze interacties acties uitvoeren of bijhouden. Agent middleware maakt dit mogelijk door:

*Function Middleware*

Deze middleware stelt ons in staat een actie uit te voeren tussen de agent en een functie/tool die wordt aangeroepen. Een voorbeeld hiervan is het loggen van een functie-aanroep.

In onderstaande code bepaalt `next` of de volgende middleware of de eigenlijke functie aangeroepen moet worden.

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

Deze middleware stelt ons in staat een actie of log uit te voeren tussen de agent en de verzoeken aan de LLM.

Dit bevat belangrijke informatie zoals de `messages` die naar de AI-service worden verzonden.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Voorverwerking: Loggen vóór AI-aanroep
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Ga verder naar de volgende middleware of AI-service
    await next(context)

    # Naverwerking: Loggen na AI-antwoord
    print("[Chat] AI response received")

```

**Agentgeheugen**

Zoals behandeld in de les `Agentic Memory`, is geheugen een belangrijk element om de agent contextueel te laten opereren. MAF biedt verschillende soorten geheugen:

*In-Memory opslag*

Dit is het geheugen dat wordt opgeslagen in threads tijdens de runtime van de applicatie.

```python
# Maak een nieuwe thread aan.
thread = agent.get_new_thread() # Voer de agent uit met de thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Persistente berichten*

Dit geheugen wordt gebruikt voor het opslaan van gespreksgeschiedenis tussen verschillende sessies en wordt gedefinieerd met de `chat_message_store_factory`:

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

Dit geheugen wordt toegevoegd aan de context voordat agents worden uitgevoerd. Deze geheugen kunnen worden opgeslagen in externe services zoals mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Mem0 gebruiken voor geavanceerde geheugencapaciteiten
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

**Agent observability**

Observability is belangrijk om betrouwbare en onderhoudbare agentische systemen te bouwen. MAF integreert met OpenTelemetry om tracing en meters voor betere observability te bieden.

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

MAF biedt workflows die vooraf gedefinieerde stappen zijn om een taak te voltooien en AI-agents als componenten in die stappen opneemt.

Workflows bestaan uit verschillende componenten die zorgen voor betere controlemogelijkheden. Workflows maken ook **multi-agent orkestratie** en **checkpointing** mogelijk om workflow-statussen op te slaan.

De kerncomponenten van een workflow zijn:

**Executors**

Executors ontvangen invoerberichten, voeren hun toegewezen taken uit en produceren vervolgens een uitvoerbericht. Dit brengt de workflow vooruit richting de voltooiing van de grotere taak. Executors kunnen AI-agent of aangepaste logica zijn.

**Edges**

Edges worden gebruikt om de stroom van berichten in een workflow te definiëren. Dit kan zijn:

*Directe edges* - Eenvoudige één-op-één verbindingen tussen executors:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Voorwaardelijke edges* - Worden geactiveerd nadat aan een bepaalde voorwaarde is voldaan. Bijvoorbeeld als hotelkamers niet beschikbaar zijn, kan een executor andere opties voorstellen.

*Switch-case edges* - Sturen berichten naar verschillende executors op basis van gedefinieerde voorwaarden. Bijvoorbeeld als een reisklant prioritaire toegang heeft, worden hun taken via een andere workflow afgehandeld.

*Fan-out edges* - Eén bericht naar meerdere doelen sturen.

*Fan-in edges* - Meerdere berichten van verschillende executors verzamelen en naar één doel sturen.

**Events**

Om betere observability in workflows te bieden, levert MAF ingebouwde events voor uitvoering, waaronder:

- `WorkflowStartedEvent`  - Workflow-uitvoering begint
- `WorkflowOutputEvent` - Workflow produceert een uitvoer
- `WorkflowErrorEvent` - Workflow ondervindt een fout
- `ExecutorInvokeEvent`  - Executor start verwerking
- `ExecutorCompleteEvent`  - Executor voltooit verwerking
- `RequestInfoEvent` - Een verzoek wordt uitgegeven

## Geavanceerde MAF-patronen

De bovenstaande secties behandelen de kernconcepten van Microsoft Agent Framework. Naarmate je complexere agents bouwt, zijn hier enkele geavanceerde patronen om te overwegen:

- **Middlewarecompositie**: Keten meerdere middleware handlers (logging, authenticatie, rate-limiting) met function- en chat-middleware voor fijnmazige controle over agentgedrag.
- **Workflow checkpointing**: Gebruik workflow-events en serialisatie om lange agentprocessen op te slaan en te hervatten.
- **Dynamische toolselectie**: Combineer RAG over toolbeschrijvingen met MAF's toolregistratie om alleen relevante tools per query te presenteren.
- **Multi-agent overdracht**: Gebruik workflow-edges en voorwaardelijke routering om overdrachten tussen gespecialiseerde agents te orkestreren.

## LangChain / LangGraph Agents hosten op Microsoft Foundry

Microsoft Agent Framework is **framework-interoperabel** — je bent niet beperkt tot met MAF geschreven agents. Als je al een agent hebt gebouwd met **LangChain** of **LangGraph**, kun je deze als een **Microsoft Foundry gehoste agent** draaien zodat Foundry de runtime, sessies, schaal, identiteit en protocolendpoints beheert, terwijl je agentlogica blijft in LangGraph.

Dit werkt met het pakket `langchain_azure_ai.agents.hosting`, dat een gecompileerde LangGraph-grafiek blootstelt via dezelfde protocollen die Foundry gehoste agents gebruiken.

**1. Installeer de hosting extra:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

De `hosting` extra installeert de Foundry protocol bibliotheken: `azure-ai-agentserver-responses` (de OpenAI-compatibele `/responses` endpoint) en `azure-ai-agentserver-invocations` (de generieke `/invocations` endpoint).

**2. Kies een hostingprotocol:**

| Protocol | Hostklasse | Endpoint | Gebruik wanneer |
|----------|------------|----------|--------------|
| **Responses** | `ResponsesHostServer` | `/responses` | Je openAI-compatibele chat, streaming, antwoordgeschiedenis en conversatiedraad wilt – de aanbevolen standaard voor conversatieagents. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Je een aangepaste JSON-structuur, een webhook-stijl endpoint, of niet-conversatieverwerking nodig hebt. |

Omdat de **Responses API de primaire API is voor agent-ontwikkeling in Foundry**, begin je met `ResponsesHostServer` voor de meeste agents.

**3. Configureer omgevingsvariabelen** (`az login` eerst zodat `DefaultAzureCredential` kan authenticeren):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Wanneer de agent later als gehost agent in Foundry draait, injecteert het platform `FOUNDRY_PROJECT_ENDPOINT` automatisch.

**4. Stel een LangGraph-agent bloot via het Responses protocol:**

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

    # ChatOpenAI hier richt zich op de OpenAI-compatibele (Responses) endpoint van het Foundry-project.
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

Draai het lokaal met `python main.py`, en stuur daarna een Responses-verzoek naar `http://localhost:8088/responses`.

**Belangrijke gedragingen:**

- **Conversaties**: Clients vervolgen een gesprek door `previous_response_id` of een `conversation` ID door te geven. Als je grafiek is gecompileerd met een LangGraph-checkpointer, koppelt Foundry de gesprekstoestand aan de checkpoint (gebruik een duurzaam checkpointer in productie; `MemorySaver` is prima voor lokaal testen).
- **Human-in-the-loop**: Als je grafiek LangGraph `interrupt()` gebruikt, toont `ResponsesHostServer` de uitstaande interrupt als een Responses `function_call` / `mcp_approval_request` item, en hervatten clients met een passende `function_call_output` / `mcp_approval_response`.
- **Deploy naar Foundry**: Gebruik de Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (lokaal, vereist Docker), en daarna `azd provision` en `azd deploy`. Gehost agent-implementatie vereist de rol **Foundry Project Manager**.

Een uitvoerbare versie van dit voorbeeld bevindt zich in [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Voor de volledige walkthrough (Invocations protocol, aangepaste aanvraagschemas, en oplossen van problemen), zie [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Codevoorbeelden 

Codevoorbeelden voor Microsoft Agent Framework zijn te vinden in deze repository onder de bestanden `xx-python-agent-framework` en `xx-dotnet-agent-framework`.

## Meer vragen over Microsoft Agent Framework?

Sluit je aan bij de [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) om andere lerenden te ontmoeten, deel te nemen aan inloopuren en je AI Agents-vragen beantwoord te krijgen.
## Vorige les

[Geheugen voor AI Agents](../13-agent-memory/README.md)

## Volgende les

[Computer Use Agents (CUA) bouwen](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->