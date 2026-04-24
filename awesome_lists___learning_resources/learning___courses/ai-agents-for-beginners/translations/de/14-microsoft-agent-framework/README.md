# Erforschung des Microsoft Agent Frameworks

![Agent Framework](../../../translated_images/de/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Einführung

Diese Lektion deckt ab:

- Verständnis des Microsoft Agent Frameworks: Hauptmerkmale und Wert  
- Erkundung der Schlüsselkonzepte des Microsoft Agent Frameworks
- Fortgeschrittene MAF-Muster: Workflows, Middleware und Speicher

## Lernziele

Nach Abschluss dieser Lektion wissen Sie, wie Sie:

- Produktionsreife KI-Agenten mit dem Microsoft Agent Framework entwickeln
- Die Kernfunktionen des Microsoft Agent Frameworks auf Ihre agentischen Anwendungsfälle anwenden
- Fortgeschrittene Muster wie Workflows, Middleware und Beobachtbarkeit nutzen

## Code-Beispiele

Code-Beispiele für [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) finden Sie in diesem Repository unter den Dateien `xx-python-agent-framework` und `xx-dotnet-agent-framework`.

## Verständnis des Microsoft Agent Frameworks

![Framework Intro](../../../translated_images/de/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) ist Microsofts einheitliches Framework zum Erstellen von KI-Agenten. Es bietet die Flexibilität, die breite Vielfalt agentischer Anwendungsfälle abzudecken, die sowohl in Produktions- als auch Forschungsumgebungen zu finden sind, einschließlich:

- **Sequenzielle Agent-Orchestrierung** in Szenarien, in denen Schritt-für-Schritt-Workflows benötigt werden.
- **Nebenläufige Orchestrierung** in Szenarien, in denen Agenten Aufgaben gleichzeitig erledigen müssen.
- **Gruppenchat-Orchestrierung** in Szenarien, in denen Agenten gemeinsam an einer Aufgabe zusammenarbeiten können.
- **Übergabe-Orchestrierung** in Szenarien, in denen Agenten die Aufgabe aneinander übergeben, wenn Unteraufgaben abgeschlossen sind.
- **Magnetische Orchestrierung** in Szenarien, in denen ein Manager-Agent eine Aufgabenliste erstellt und bearbeitet und die Koordination von Unteragenten zur Erfüllung der Aufgabe übernimmt.

Um KI-Agenten produktionsreif bereitzustellen, enthält MAF auch Funktionen für:

- **Beobachtbarkeit** durch die Verwendung von OpenTelemetry, wobei jede Aktion des KI-Agenten einschließlich Werkzeugaufrufen, Orchestrierungsschritten, Denkprozessen und Leistungsüberwachung über Microsoft Foundry-Dashboards verfolgt wird.
- **Sicherheit** durch das native Hosting von Agenten auf Microsoft Foundry, was Sicherheitskontrollen wie rollenbasierte Zugriffssteuerung, Umgang mit privaten Daten und integrierte Inhaltsicherheit umfasst.
- **Robustheit** da Agent-Threads und Workflows pausieren, fortsetzen und sich von Fehlern erholen können, was längere Prozesse ermöglicht.
- **Kontrolle** da menschliche Eingriffe unterstützt werden, bei denen Aufgaben als genehmigungspflichtig markiert werden können.

Microsoft Agent Framework legt zudem Wert auf Interoperabilität durch:

- **Cloud-Unabhängigkeit** - Agenten können in Containern, lokal und in verschiedenen Clouds ausgeführt werden.
- **Anbieter-Unabhängigkeit** - Agenten können mit dem bevorzugten SDK erstellt werden, einschließlich Azure OpenAI und OpenAI.
- **Integration offener Standards** - Agenten können Protokolle wie Agent-to-Agent (A2A) und Model Context Protocol (MCP) verwenden, um andere Agenten und Werkzeuge zu entdecken und zu nutzen.
- **Plugins und Verbindungen** - Verbindungen zu Daten- und Speicherdiensten wie Microsoft Fabric, SharePoint, Pinecone und Qdrant sind möglich.

Schauen wir uns an, wie diese Funktionen auf einige Kernkonzepte des Microsoft Agent Frameworks angewendet werden.

## Schlüsselkonzepte des Microsoft Agent Frameworks

### Agenten

![Agent Framework](../../../translated_images/de/agent-components.410a06daf87b4fef.webp)

**Agenten erstellen**

Die Erstellung von Agenten erfolgt durch Definition des Inferenzdiensts (LLM-Anbieter), einer  
Reihe von Anweisungen, denen der KI-Agent folgen soll, und einem zugewiesenen `name`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```
  
Oben wird `Azure OpenAI` verwendet, aber Agenten können mit verschiedenen Diensten erstellt werden, einschließlich `Microsoft Foundry Agent Service`:

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
  
oder [MiniMax](https://platform.minimaxi.com/), das eine OpenAI-kompatible API mit großen Kontextfenstern (bis zu 204K Tokens) bereitstellt:

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```
  
oder entfernte Agenten, die das A2A-Protokoll verwenden:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```
  
**Agenten ausführen**

Agenten werden mit den Methoden `.run` oder `.run_stream` ausgeführt, je nachdem ob nicht-streaming oder streaming Antworten benötigt werden.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```
  
```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```
  
Jeder Agentenlauf kann ebenfalls Optionen enthalten, um Parameter wie `max_tokens` festzulegen, `tools`, die der Agent aufrufen kann, und sogar das verwendete `model` selbst.

Dies ist nützlich in Fällen, wo bestimmte Modelle oder Werkzeuge für die Erfüllung der Aufgabe des Nutzers erforderlich sind.

**Werkzeuge**

Werkzeuge können sowohl bei der Definition des Agenten festgelegt werden:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Beim direkten Erstellen eines ChatAgent

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```
  
als auch beim Ausführen des Agenten:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Werkzeug nur für diesen Lauf bereitgestellt )
```
  
**Agenten-Threads**

Agenten-Threads werden für mehrstufige Gespräche verwendet. Threads können erzeugt werden durch:

- Verwendung von `get_new_thread()`, wodurch der Thread über die Zeit gespeichert werden kann
- Automatisches Erstellen eines Threads beim Ausführen eines Agenten, der nur für die aktuelle Ausführung besteht.

Der Code zum Erstellen eines Threads sieht so aus:

```python
# Erstelle einen neuen Thread.
thread = agent.get_new_thread() # Führe den Agenten mit dem Thread aus.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```
  
Der Thread kann dann serialisiert und für die spätere Nutzung gespeichert werden:

```python
# Erstelle einen neuen Thread.
thread = agent.get_new_thread() 

# Führe den Agenten mit dem Thread aus.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serialisiere den Thread für die Speicherung.

serialized_thread = await thread.serialize() 

# Deserialisiere den Thread-Zustand nach dem Laden aus der Speicherung.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```
  
**Agenten-Middleware**

Agenten interagieren mit Werkzeugen und LLMs, um die Aufgaben der Nutzer zu erfüllen. In bestimmten Szenarien wollen wir Aktionen zwischen diesen Interaktionen ausführen oder verfolgen. Agenten-Middleware ermöglicht dies durch:

*Funktions-Middleware*

Diese Middleware erlaubt es, eine Aktion zwischen dem Agenten und einer Funktion/einem Werkzeug, das er aufruft, auszuführen. Ein Anwendungsbeispiel ist das Protokollieren eines Funktionsaufrufs.

Im untenstehenden Code definiert `next`, ob die nächste Middleware oder die eigentliche Funktion aufgerufen wird.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Vorverarbeitung: Protokoll vor der Funktionsausführung
    print(f"[Function] Calling {context.function.name}")

    # Fahren Sie mit der nächsten Middleware oder Funktionsausführung fort
    await next(context)

    # Nachbearbeitung: Protokoll nach der Funktionsausführung
    print(f"[Function] {context.function.name} completed")
```
  
*Chat-Middleware*

Diese Middleware ermöglicht das Ausführen oder Protokollieren einer Aktion zwischen dem Agenten und den Anfragen an das LLM.

Dies enthält wichtige Informationen wie die `messages`, die an den KI-Dienst gesendet werden.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Vorverarbeitung: Protokollierung vor dem KI-Aufruf
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Weiter zum nächsten Middleware oder KI-Dienst
    await next(context)

    # Nachverarbeitung: Protokollierung nach KI-Antwort
    print("[Chat] AI response received")

```
  
**Agenten-Speicher**

Wie in der Lektion `Agentic Memory` erläutert, ist Speicher ein wichtiges Element, das dem Agenten die Arbeit in verschiedenen Kontexten ermöglicht. MAF bietet verschiedene Arten von Speicher:

*In-Memory-Speicher*

Dies ist der Speicher, der während der Laufzeit in Threads abgelegt wird.

```python
# Erstelle einen neuen Thread.
thread = agent.get_new_thread() # Führe den Agenten mit dem Thread aus.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```
  
*Persistente Nachrichten*

Dieser Speicher wird verwendet, um Gesprächsverläufe über verschiedene Sitzungen hinweg zu speichern. Er wird mit der `chat_message_store_factory` definiert:

```python
from agent_framework import ChatMessageStore

# Erstellen Sie einen benutzerdefinierten Nachrichten-Store
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```
  
*Dynamischer Speicher*

Dieser Speicher wird dem Kontext hinzugefügt, bevor Agenten ausgeführt werden. Diese Speicher können in externen Diensten wie mem0 abgelegt werden:

```python
from agent_framework.mem0 import Mem0Provider

# Verwendung von Mem0 für erweiterte Speicherfunktionen
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
  
**Agenten-Beobachtbarkeit**

Beobachtbarkeit ist wichtig, um zuverlässige und wartbare agentische Systeme zu bauen. MAF integriert OpenTelemetry, um Tracing und Messwerte für bessere Beobachtbarkeit bereitzustellen.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # etwas tun
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```
  
### Workflows

MAF bietet Workflows, das sind vordefinierte Schritte zum Abschließen einer Aufgabe, in denen KI-Agenten als Komponenten in diesen Schritten eingebunden sind.

Workflows bestehen aus verschiedenen Komponenten, die einen besseren Kontrollfluss ermöglichen. Workflows unterstützen auch **Multi-Agent-Orchestrierung** und **Zwischenspeicherung**, um den Workflow-Zustand zu speichern.

Die Kernkomponenten eines Workflows sind:

**Ausführende Einheiten (Executors)**

Executors erhalten Eingabenachrichten, führen ihre Aufgaben aus und erzeugen dann eine Ausgabenachricht. Dies bewegt den Workflow voran, um die größere Aufgabe abzuschließen. Executors können KI-Agenten oder kundenspezifische Logik sein.

**Kanten (Edges)**

Edges definieren den Nachrichtenfluss in einem Workflow. Diese können sein:

*Direkte Kanten* - Einfache Eins-zu-eins-Verbindungen zwischen Executors:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```
  
*Bedingte Kanten* - Werden aktiviert, nachdem eine bestimmte Bedingung erfüllt ist. Zum Beispiel kann bei nicht verfügbaren Hotelzimmern ein Executor andere Optionen vorschlagen.

*Switch-Case-Kanten* - Leiten Nachrichten basierend auf definierten Bedingungen an verschiedene Executors weiter. Zum Beispiel, wenn ein Reisekunde Prioritätszugang hat und seine Aufgaben über einen anderen Workflow bearbeitet werden.

*Fan-out-Kanten* - Senden eine Nachricht an mehrere Ziele.

*Fan-in-Kanten* - Sammeln mehrere Nachrichten von verschiedenen Executors und senden sie an ein Ziel.

**Ereignisse**

Um eine bessere Beobachtbarkeit von Workflows zu ermöglichen, bietet MAF integrierte Ereignisse für die Ausführung, darunter:

- `WorkflowStartedEvent`  - Workflow-Ausführung beginnt
- `WorkflowOutputEvent` - Workflow erzeugt eine Ausgabe
- `WorkflowErrorEvent` - Workflow tritt ein Fehler auf
- `ExecutorInvokeEvent`  - Executor beginnt die Verarbeitung
- `ExecutorCompleteEvent`  -  Executor beendet die Verarbeitung
- `RequestInfoEvent` - Eine Anfrage wird gestellt

## Fortgeschrittene MAF-Muster

Die obigen Abschnitte decken die Kernkonzepte des Microsoft Agent Frameworks ab. Wenn Sie komplexere Agenten erstellen, hier einige fortgeschrittene Muster zum Berücksichtigen:

- **Middleware-Komposition**: Verketten Sie mehrere Middleware-Handler (Logging, Authentifizierung, Ratenbegrenzung) mit Funktions- und Chat-Middleware für feinsteuerbare Kontrolle über das Agentenverhalten.
- **Workflow-Zwischenspeicherung**: Nutzen Sie Workflow-Ereignisse und Serialisierung, um lang laufende Agentenprozesse zu speichern und fortzusetzen.
- **Dynamische Werkzeugauswahl**: Kombinieren Sie RAG über Werkzeugbeschreibungen mit MAFs Werkzeugregistrierung, um pro Abfrage nur relevante Werkzeuge anzubieten.
- **Multi-Agenten-Übergabe**: Verwenden Sie Workflow-Kanten und bedingte Weiterleitung, um Übergaben zwischen spezialisierten Agenten zu orchestrieren.

## Code-Beispiele

Code-Beispiele für Microsoft Agent Framework finden Sie in diesem Repository unter den Dateien `xx-python-agent-framework` und `xx-dotnet-agent-framework`.

## Haben Sie weitere Fragen zum Microsoft Agent Framework?

Treten Sie der [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) bei, um andere Lernende zu treffen, an Office Hours teilzunehmen und Antworten auf Ihre Fragen zu KI-Agenten zu erhalten.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mithilfe des KI-Übersetzungsdienstes [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, sollten Sie beachten, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das originale Dokument in seiner ursprünglichen Sprache ist als maßgebliche Quelle zu betrachten. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->