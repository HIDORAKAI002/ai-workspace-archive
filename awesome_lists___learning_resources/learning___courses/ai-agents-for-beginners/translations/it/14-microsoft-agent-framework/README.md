# Esplorare Microsoft Agent Framework

![Agent Framework](../../../translated_images/it/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Introduzione

Questa lezione tratterà:

- Comprendere Microsoft Agent Framework: caratteristiche chiave e valore  
- Esplorare i concetti chiave di Microsoft Agent Framework
- Pattern avanzati MAF: workflow, middleware e memoria

## Obiettivi di apprendimento

Al termine di questa lezione, saprai come:

- Costruire agenti AI pronti per la produzione utilizzando Microsoft Agent Framework
- Applicare le funzionalità principali di Microsoft Agent Framework ai tuoi casi d'uso agentici
- Utilizzare pattern avanzati inclusi workflow, middleware e osservabilità

## Esempi di codice 

Esempi di codice per [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) si trovano in questo repository sotto i file `xx-python-agent-framework` e `xx-dotnet-agent-framework`.

## Comprendere Microsoft Agent Framework

![Framework Intro](../../../translated_images/it/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) è il framework unificato di Microsoft per costruire agenti AI. Offre la flessibilità per affrontare la vasta gamma di casi d'uso agentici osservati sia in ambienti di produzione che di ricerca, inclusi:

- **Orchestrazione sequenziale degli agenti** in scenari in cui sono necessari workflow passo-passo.
- **Orchestrazione concorrente** in scenari in cui gli agenti devono completare i compiti contemporaneamente.
- **Orchestrazione delle chat di gruppo** in scenari in cui gli agenti possono collaborare insieme su un compito.
- **Orchestrazione di handoff** in scenari in cui gli agenti passano il compito l'un l'altro man mano che i sotto-compiti vengono completati.
- **Orchestrazione magnetica** in scenari in cui un agente manager crea e modifica una lista di compiti e gestisce il coordinamento dei sub-agenti per completare il compito.

Per fornire agenti AI in produzione, MAF include anche funzionalità per:

- **Osservabilità** tramite l'uso di OpenTelemetry dove ogni azione dell'agente AI, inclusa l'invocazione di strumenti, passi di orchestrazione, flussi di ragionamento e monitoraggio delle prestazioni, è tracciata attraverso dashboard Microsoft Foundry.
- **Sicurezza** ospitando gli agenti nativamente su Microsoft Foundry, che include controlli di sicurezza quali accesso basato sui ruoli, gestione dei dati privati e sicurezza integrata dei contenuti.
- **Durabilità** poiché i thread e i workflow degli agenti possono essere messi in pausa, ripresi e recuperati da errori, permettendo processi di esecuzione più lunghi.
- **Controllo** poiché sono supportati workflow con coinvolgimento umano dove i compiti sono contrassegnati come richiedenti approvazione umana.

Microsoft Agent Framework è anche focalizzato sull'interoperabilità mediante:

- **Essere cloud-agnostico** - Gli agenti possono funzionare in container, on-premises e su molteplici cloud differenti.
- **Essere provider-agnostico** - Gli agenti possono essere creati usando il tuo SDK preferito, incluso Azure OpenAI e OpenAI
- **Integrare standard aperti** - Gli agenti possono utilizzare protocolli come Agent-to-Agent (A2A) e Model Context Protocol (MCP) per scoprire e utilizzare altri agenti e strumenti.
- **Plugin e connettori** - Possono essere effettuate connessioni a servizi di dati e memoria come Microsoft Fabric, SharePoint, Pinecone e Qdrant.

Vediamo come queste funzionalità si applicano ad alcuni dei concetti base di Microsoft Agent Framework.

## Concetti chiave di Microsoft Agent Framework

### Agenti

![Agent Framework](../../../translated_images/it/agent-components.410a06daf87b4fef.webp)

**Creazione di agenti**

La creazione dell'agente avviene definendo il servizio di inferenza (Provider LLM), un
insieme di istruzioni che l'agente AI deve seguire, e un `nome` assegnato:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

L'esempio sopra utilizza `Azure OpenAI`, ma gli agenti possono essere creati usando diversi servizi incluso `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

API OpenAI `Responses`, `ChatCompletion`

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

o [MiniMax](https://platform.minimaxi.com/), che fornisce un'API compatibile con OpenAI con grandi finestre di contesto (fino a 204K token):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

o agenti remoti usando il protocollo A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Esecuzione degli agenti**

Gli agenti vengono eseguiti utilizzando i metodi `.run` o `.run_stream` per risposte senza streaming o in streaming.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Ogni esecuzione dell'agente può avere opzioni per personalizzare parametri come `max_tokens` usati dall'agente, `tools` che l'agente è in grado di chiamare e persino il `model` stesso utilizzato per l'agente.

Questo è utile in casi in cui sono necessari modelli o strumenti specifici per completare il compito dell'utente.

**Strumenti**

Gli strumenti possono essere definiti sia alla definizione dell'agente:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Quando si crea un ChatAgent direttamente

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

che durante l'esecuzione dell'agente:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Strumento fornito solo per questa esecuzione )
```

**Thread degli agenti**

I thread degli agenti sono usati per gestire conversazioni a più turni. I thread possono essere creati sia tramite:

- Usando `get_new_thread()` che permette di salvare il thread nel tempo
- Creando un thread automaticamente durante l'esecuzione di un agente e mantenendo il thread attivo solo durante l'esecuzione corrente.

Per creare un thread, il codice è il seguente:

```python
# Crea un nuovo thread.
thread = agent.get_new_thread() # Esegui l'agente con il thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

È quindi possibile serializzare il thread per conservarlo e usarlo successivamente:

```python
# Crea un nuovo thread.
thread = agent.get_new_thread() 

# Esegui l'agente con il thread.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serializza il thread per l'archiviazione.

serialized_thread = await thread.serialize() 

# Deserializza lo stato del thread dopo il caricamento dall'archivio.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Middleware degli agenti**

Gli agenti interagiscono con strumenti e LLM per completare i compiti degli utenti. In alcuni scenari, vogliamo eseguire o tracciare azioni tra queste interazioni. Il middleware degli agenti ci permette di farlo tramite:

*Middleware di funzione*

Questo middleware permette di eseguire un'azione tra l'agente e una funzione/strumento che sta per essere chiamata. Un esempio d'uso può essere effettuare logging sulla chiamata della funzione.

Nel codice seguente `next` definisce se deve essere chiamato il middleware successivo o la funzione effettiva.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Pre-elaborazione: registra prima dell'esecuzione della funzione
    print(f"[Function] Calling {context.function.name}")

    # Continua al middleware successivo o all'esecuzione della funzione
    await next(context)

    # Post-elaborazione: registra dopo l'esecuzione della funzione
    print(f"[Function] {context.function.name} completed")
```

*Middleware chat*

Questo middleware consente di eseguire o loggare un'azione tra l'agente e le richieste tra il LLM.

Questo contiene informazioni importanti come i `messages` inviati al servizio AI.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Pre-elaborazione: Registra prima della chiamata AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Continua al prossimo middleware o servizio AI
    await next(context)

    # Post-elaborazione: Registra dopo la risposta AI
    print("[Chat] AI response received")

```

**Memoria degli agenti**

Come trattato nella lezione `Agentic Memory`, la memoria è un elemento importante per permettere all'agente di operare su contesti diversi. MAF offre diversi tipi di memorie:

*Memoria in-Memory*

Questa è la memoria conservata nei thread durante l'esecuzione dell'applicazione.

```python
# Crea un nuovo thread.
thread = agent.get_new_thread() # Esegui l'agente con il thread.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Messaggi persistenti*

Questa memoria viene usata per conservare la storia della conversazione tra sessioni diverse. È definita usando il `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Crea un archivio messaggi personalizzato
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Memoria dinamica*

Questa memoria viene aggiunta al contesto prima che gli agenti vengano eseguiti. Queste memorie possono essere conservate in servizi esterni come mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Uso di Mem0 per funzionalità avanzate di memoria
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

**Osservabilità degli agenti**

L'osservabilità è importante per costruire sistemi agentici affidabili e manutenibili. MAF si integra con OpenTelemetry per fornire tracing e metriche per una migliore osservabilità.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # fare qualcosa
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Workflow

MAF offre workflow che sono passaggi predefiniti per completare un compito e includono agenti AI come componenti in quei passaggi.

I workflow sono composti da componenti diverse che permettono un miglior controllo del flusso. I workflow abilitano anche **orchestrazione multi-agente** e **checkpointing** per salvare lo stato del workflow.

I componenti principali di un workflow sono:

**Executor**

Gli executor ricevono messaggi in input, eseguono i compiti loro assegnati, e poi producono un messaggio di output. Questo fa avanzare il workflow verso il completamento del compito più grande. Gli executor possono essere agenti AI o logica personalizzata.

**Edges**

Gli edges sono usati per definire il flusso dei messaggi in un workflow. Questi possono essere:

*Edges diretti* - connessioni semplici uno a uno tra executor:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Edges condizionali* - si attivano quando una certa condizione è soddisfatta. Per esempio, quando le camere d'hotel non sono disponibili, un executor può suggerire altre opzioni.

*Edges switch-case* - instradano i messaggi a executor diversi basandosi su condizioni definite. Ad esempio, se un cliente viaggia con accesso prioritario, i suoi compiti saranno gestiti tramite un altro workflow.

*Edges fan-out* - inviano un messaggio a molteplici destinatari.

*Edges fan-in* - raccolgono molteplici messaggi da diversi executor e li inviano a un unico destinatario.

**Eventi**

Per fornire una migliore osservabilità nei workflow, MAF offre eventi integrati per l'esecuzione tra cui:

- `WorkflowStartedEvent`  - Inizio dell'esecuzione del workflow
- `WorkflowOutputEvent` - Il workflow produce un output
- `WorkflowErrorEvent` - Il workflow incontra un errore
- `ExecutorInvokeEvent`  - L'executor inizia l'elaborazione
- `ExecutorCompleteEvent`  -  L'executor termina l'elaborazione
- `RequestInfoEvent` - Una richiesta viene emessa

## Pattern avanzati MAF

Le sezioni sopra coprono i concetti chiave di Microsoft Agent Framework. Man mano che costruisci agenti più complessi, ecco alcuni pattern avanzati da considerare:

- **Composizione Middleware**: concatenare molteplici gestori middleware (logging, autenticazione, limitazione di velocità) usando middleware di funzione e chat per un controllo granulare del comportamento dell'agente.
- **Checkpointing dei workflow**: utilizzare eventi di workflow e serializzazione per salvare e riprendere processi agentici di lunga durata.
- **Selezione dinamica degli strumenti**: combinare RAG sulle descrizioni degli strumenti con la registrazione strumenti di MAF per presentare solo gli strumenti rilevanti per ogni query.
- **Handoff multi-agente**: usare edges di workflow e instradamento condizionale per orchestrare il passaggio tra agenti specializzati.

## Ospitare agenti LangChain / LangGraph su Microsoft Foundry

Microsoft Agent Framework è **framework-interoperabile** — non sei limitato a agenti scritti con MAF. Se hai già un agente costruito con **LangChain** o **LangGraph**, puoi eseguirlo come **agente ospitato su Microsoft Foundry** in modo che Foundry gestisca runtime, sessioni, scalabilità, identità e endpoint di protocollo per te, mentre la logica del tuo agente resta in LangGraph.

Questo avviene con il pacchetto `langchain_azure_ai.agents.hosting`, che espone un grafo LangGraph compilato sugli stessi protocolli usati dagli agenti ospitati Foundry.

**1. Installare l'extra hosting:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

L'extra `hosting` installa le librerie di protocollo Foundry: `azure-ai-agentserver-responses` (endpoint `/responses` compatibile OpenAI) e `azure-ai-agentserver-invocations` (endpoint generico `/invocations`).

**2. Scegliere un protocollo di hosting:**

| Protocollo | Classe host | Endpoint | Quando usarlo |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Vuoi chat compatibile OpenAI, streaming, cronologia delle risposte e threading delle conversazioni — il default raccomandato per agenti conversazionali. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Hai bisogno di una forma JSON personalizzata, un endpoint stile webhook, o elaborazione non conversazionale. |

Poiché l'**API Responses è l'API principale per lo sviluppo di agenti in Foundry**, inizia con `ResponsesHostServer` per la maggior parte degli agenti.

**3. Configura variabili d'ambiente** (`az login` prima affinché `DefaultAzureCredential` possa autenticarsi):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Quando l'agente verrà eseguito in seguito come agente ospitato in Foundry, la piattaforma inietterà automaticamente `FOUNDRY_PROJECT_ENDPOINT`.

**4. Esporre un agente LangGraph sul protocollo Responses:**

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

    # ChatOpenAI qui punta all'endpoint compatibile con OpenAI (Risposte) del progetto Foundry.
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

Eseguilo localmente con `python main.py`, poi invia una richiesta Responses a `http://localhost:8088/responses`.

**Comportamenti chiave:**

- **Conversazioni**: I client continuano una conversazione passando `previous_response_id` o un ID `conversation`. Se il tuo grafo è compilato con un LangGraph checkpointer, Foundry associa lo stato della conversazione al checkpoint (usa un checkpointer durevole in produzione; `MemorySaver` va bene per test locali).
- **Intervento umano nel loop**: Se il tuo grafo usa LangGraph `interrupt()`, `ResponsesHostServer` mostra l'interruzione pendente come un elemento Responses `function_call` / `mcp_approval_request`, e i client riprendono con un `function_call_output` / `mcp_approval_response` corrispondente.
- **Deploy su Foundry**: Usa Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (locale, richiede Docker), poi `azd provision` e `azd deploy`. Il deploy di agenti ospitati richiede il ruolo **Foundry Project Manager**.

Una versione eseguibile di questo esempio è disponibile in [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Per il walkthrough completo (protocollo Invocations, schemi di richiesta personalizzati e risoluzione dei problemi), vedere [Ospitare agenti LangGraph come agenti ospitati Foundry](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Esempi di codice 

Esempi di codice per Microsoft Agent Framework si trovano in questo repository sotto i file `xx-python-agent-framework` e `xx-dotnet-agent-framework`.

## Hai altre domande su Microsoft Agent Framework?

Unisciti al [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) per incontrare altri studenti, partecipare agli office hours e ottenere risposte sulle tue domande sugli agenti AI.
## Lezione precedente

[Memoria per agenti AI](../13-agent-memory/README.md)

## Prossima lezione

[Costruire agenti per l'uso di computer (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->