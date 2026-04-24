# Eksploracja Microsoft Agent Framework

![Agent Framework](../../../translated_images/pl/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Wprowadzenie

W tej lekcji omówimy:

- Zrozumienie Microsoft Agent Framework: Kluczowe funkcje i wartość  
- Eksploracja kluczowych koncepcji Microsoft Agent Framework
- Zaawansowane wzorce MAF: przepływy pracy, middleware i pamięć

## Cele nauki

Po ukończeniu tej lekcji będziesz wiedzieć, jak:

- Budować agenty AI gotowe do produkcji przy użyciu Microsoft Agent Framework
- Zastosować podstawowe funkcje Microsoft Agent Framework do swoich zastosowań agentowych
- Korzystać z zaawansowanych wzorców, w tym przepływów pracy, middleware i obserwowalności

## Przykłady kodu 

Przykłady kodu dla [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) można znaleźć w tym repozytorium w plikach `xx-python-agent-framework` i `xx-dotnet-agent-framework`.

## Zrozumienie Microsoft Agent Framework

![Framework Intro](../../../translated_images/pl/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) to zunifikowany framework Microsoftu do tworzenia agentów AI. Oferuje elastyczność, aby sprostać szerokiemu wachlarzowi zastosowań agentowych spotykanych zarówno w środowiskach produkcyjnych, jak i badawczych, w tym:

- **Sekwencyjna orkiestracja agentów** w scenariuszach, gdzie potrzebne są przepływy pracy krok po kroku.
- **Współbieżna orkiestracja** w scenariuszach, gdzie agenty muszą jednocześnie realizować zadania.
- **Orkiestracja czatu grupowego** w scenariuszach, gdzie agenty mogą współpracować nad jednym zadaniem.
- **Orkiestracja przekazywania** w scenariuszach, gdzie agenty przekazują zadania jeden drugiemu po ukończeniu podzadań.
- **Orkiestracja magnetyczna** w scenariuszach, gdzie agent zarządzający tworzy i modyfikuje listę zadań oraz koordynuje podagentów do ich realizacji.

Aby dostarczać agentów AI w produkcji, MAF zawiera też funkcje takie jak:

- **Obserwowalność** za pomocą OpenTelemetry, gdzie każda akcja agenta AI, w tym wywołania narzędzi, kroki orkiestracji, przepływy rozumowania oraz monitorowanie wydajności poprzez pulpity Microsoft Foundry, jest śledzona.
- **Bezpieczeństwo** dzięki hostowaniu agentów natywnie w Microsoft Foundry, który oferuje takie kontrole bezpieczeństwa jak dostęp oparty na rolach, obsługa danych prywatnych i wbudowane mechanizmy bezpieczeństwa treści.
- **Trwałość** ponieważ wątki i przepływy pracy agentów mogą być wstrzymywane, wznawiane i odzyskiwane po błędach, co umożliwia dłużej działające procesy.
- **Kontrola** dzięki obsłudze przepływów pracy z człowiekiem w pętli, gdzie zadania oznaczane są jako wymagające zatwierdzenia przez człowieka.

Microsoft Agent Framework skupia się także na interoperacyjności poprzez:

- **Bycie niezależnym od chmury** – agenty mogą działać w kontenerach, on-premises oraz w różnych chmurach jednocześnie.
- **Bycie niezależnym od dostawcy** – agenty można tworzyć za pomocą preferowanego SDK, w tym Azure OpenAI i OpenAI.
- **Integrację otwartych standardów** – agenty mogą korzystać z protokołów takich jak Agent-to-Agent (A2A) i Model Context Protocol (MCP) do odnajdywania i wykorzystywania innych agentów i narzędzi.
- **Wtyczki i konektory** – dostęp do danych i usług pamięci jak Microsoft Fabric, SharePoint, Pinecone i Qdrant.

Przyjrzyjmy się, jak te funkcjonalności stosowane są w niektórych kluczowych koncepcjach Microsoft Agent Framework.

## Kluczowe koncepcje Microsoft Agent Framework

### Agenty

![Agent Framework](../../../translated_images/pl/agent-components.410a06daf87b4fef.webp)

**Tworzenie agentów**

Tworzenie agenta polega na zdefiniowaniu usługi inferencyjnej (dostawcy LLM), zestawu instrukcji, które agent AI ma wykonywać, oraz przypisaniu `name`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Powyższy przykład używa `Azure OpenAI`, ale agentów można tworzyć używając różnych usług, w tym `Microsoft Foundry Agent Service`:

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

lub [MiniMax](https://platform.minimaxi.com/), który oferuje kompatybilne z OpenAI API z dużymi oknami kontekstowymi (do 204K tokenów):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

lub agentów zdalnych korzystających z protokołu A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Uruchamianie agentów**

Agenty uruchamia się za pomocą metod `.run` lub `.run_stream` dla odpowiedzi nie-strumieniowych lub strumieniowych.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Dla każdego uruchomienia agenta można też ustawić opcje dostosowujące parametry takie jak `max_tokens` używane przez agenta, `tools` których agent może wywoływać oraz nawet sam `model` używany przez agenta.

Jest to przydatne, gdy do realizacji zadania użytkownika wymagane są konkretne modele lub narzędzia.

**Narzędzia**

Narzędzia mogą być definiowane zarówno podczas definiowania agenta:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Podczas bezpośredniego tworzenia ChatAgent

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

jak i podczas uruchamiania agenta:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Narzędzie udostępnione tylko na ten jeden uruchomienie )
```

**Wątki agenta**

Wątki agenta służą do obsługi rozmów wieloetapowych. Wątki można tworzyć na dwa sposoby:

- Używając `get_new_thread()`, co pozwala zapisywać wątek w czasie  
- Tworząc wątek automatycznie podczas uruchamiania agenta, który istnieje tylko podczas aktualnego uruchomienia.

Kod tworzący wątek wygląda tak:

```python
# Utwórz nowy wątek.
thread = agent.get_new_thread() # Uruchom agenta z wątkiem.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Następnie wątek można zserializować, aby przechować go na później:

```python
# Utwórz nowy wątek.
thread = agent.get_new_thread() 

# Uruchom agenta z tym wątkiem.

response = await agent.run("Hello, how are you?", thread=thread) 

# Zserializuj wątek do przechowywania.

serialized_thread = await thread.serialize() 

# Deserializuj stan wątku po załadowaniu z magazynu.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Middleware agenta**

Agenty współpracują z narzędziami i LLM, aby zrealizować zadania użytkownika. W pewnych scenariuszach chcemy wykonywać akcje lub śledzić je pomiędzy tymi interakcjami. Middleware agenta pozwala to robić poprzez:

*Middleware funkcji*

Ten middleware pozwala wykonać akcję pomiędzy agentem a funkcją/narzędziem, które będzie wywoływane. Przykładem zastosowania jest logowanie wywołań funkcji.

W poniższym kodzie `next` definiuje, czy powinien zostać wywołany następny middleware czy faktyczna funkcja.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Wstępne przetwarzanie: logowanie przed wykonaniem funkcji
    print(f"[Function] Calling {context.function.name}")

    # Kontynuuj do następnego middleware lub wykonania funkcji
    await next(context)

    # Przetwarzanie po wykonaniu: logowanie po wykonaniu funkcji
    print(f"[Function] {context.function.name} completed")
```

*Middleware czatu*

Ten middleware pozwala wykonać lub zalogować akcję pomiędzy agentem a zapytaniami do LLM.

Zawiera ważne informacje takie jak `messages` wysyłane do usługi AI.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Wstępne przetwarzanie: Log przed wywołaniem AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Kontynuuj do następnego oprogramowania pośredniczącego lub usługi AI
    await next(context)

    # Post-przetwarzanie: Log po odpowiedzi AI
    print("[Chat] AI response received")

```

**Pamięć agenta**

Jak omówiono w lekcji `Agentic Memory`, pamięć jest ważnym elementem umożliwiającym agentowi działanie w różnych kontekstach. MAF oferuje kilka typów pamięci:

*Pamięć w pamięci operacyjnej*

To pamięć przechowywana w wątkach podczas działania aplikacji.

```python
# Utwórz nowy wątek.
thread = agent.get_new_thread() # Uruchom agenta z tym wątkiem.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Wiadomości trwałe*

Ta pamięć służy do przechowywania historii konwersacji w różnych sesjach. Definiowana jest za pomocą `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Utwórz niestandardowy magazyn wiadomości
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Pamięć dynamiczna*

Ta pamięć jest dodawana do kontekstu przed uruchomieniem agentów. Może być przechowywana w zewnętrznych usługach jak mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Używanie Mem0 do zaawansowanych możliwości pamięciowych
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

**Obserwowalność agenta**

Obserwowalność jest ważna przy budowaniu niezawodnych i możliwych do utrzymania systemów agentowych. MAF integruje się z OpenTelemetry, aby zapewnić śledzenie i mierniki dla lepszej obserwowalności.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # zrobić coś
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Przepływy pracy

MAF oferuje przepływy pracy, czyli predefiniowane kroki do realizacji zadania, które zawierają agentów AI jako komponenty tych kroków.

Przepływy pracy składają się z różnych elementów umożliwiających lepszą kontrolę przepływu. Pozwalają również na **orkiestrację wielu agentów** i **punktów kontrolnych**, które zapisują stany przepływu pracy.

Podstawowe elementy przepływu pracy to:

**Wykonawcy**

Wykonawcy otrzymują wiadomości wejściowe, wykonują przypisane im zadania, a następnie generują wiadomości wyjściowe. Dzięki temu przepływ pracy postępuje w kierunku ukończenia większego zadania. Wykonawcami mogą być agenty AI lub logika niestandardowa.

**Krawędzie**

Krawędzie służą do definiowania przepływu wiadomości w przepływie pracy. Mogą to być:

*Bezpośrednie krawędzie* – proste połączenia jeden-do-jednego pomiędzy wykonawcami:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Krawędzie warunkowe* – aktywowane po spełnieniu określonego warunku. Na przykład, gdy pokoje hotelowe są niedostępne, wykonawca może zasugerować inne opcje.

*Krawędzie typu switch-case* – kierują wiadomości do różnych wykonawców na podstawie zdefiniowanych warunków. Na przykład, klient podróży z priorytetowym dostępem może mieć swoje zadania obsługiwane innym przepływem.

*Krawędzie rozgałęziające (fan-out)* – wysyłają jedną wiadomość do wielu celów.

*Krawędzie zbierające (fan-in)* – zbierają wiele wiadomości od różnych wykonawców i przesyłają je do jednego celu.

**Zdarzenia**

Aby zapewnić lepszą obserwowalność przepływów pracy, MAF oferuje wbudowane zdarzenia wykonania, takie jak:

- `WorkflowStartedEvent` – rozpoczęcie wykonania przepływu pracy  
- `WorkflowOutputEvent` – przepływ pracy generuje wynik  
- `WorkflowErrorEvent` – wystąpił błąd w przepływie pracy  
- `ExecutorInvokeEvent` – wykonawca rozpoczyna przetwarzanie  
- `ExecutorCompleteEvent` – wykonawca kończy przetwarzanie  
- `RequestInfoEvent` – realizowane jest żądanie

## Zaawansowane wzorce MAF

Powyższe sekcje omawiają kluczowe koncepcje Microsoft Agent Framework. Budując bardziej zaawansowane agenty, warto rozważyć następujące wzorce:

- **Kompozycja middleware**: łańcuchowanie wielu handlerów middleware (logowanie, uwierzytelnianie, ograniczanie szybkości) przy użyciu middleware funkcji i czatu dla precyzyjnej kontroli zachowania agenta.
- **Punkty kontrolne przepływu pracy**: użycie zdarzeń przepływu pracy i serializacji do zapisywania i wznawiania długotrwałych procesów agentowych.
- **Dynamiczny wybór narzędzi**: połączenie RAG bazującego na opisach narzędzi z rejestracją narzędzi w MAF, aby prezentować tylko odpowiednie narzędzia dla zapytania.
- **Przekazywanie pomiędzy wieloma agentami**: wykorzystanie krawędzi przepływu pracy i warunkowego routingu do orkiestracji przekazywania zadań między wyspecjalizowanymi agentami.

## Przykłady kodu 

Przykłady kodu dla Microsoft Agent Framework można znaleźć w tym repozytorium w plikach `xx-python-agent-framework` i `xx-dotnet-agent-framework`.

## Masz więcej pytań dotyczących Microsoft Agent Framework?

Dołącz do [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), aby spotkać się z innymi uczącymi się, uczestniczyć w godzinach konsultacji i uzyskać odpowiedzi na pytania dotyczące agentów AI.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Ten dokument został przetłumaczony za pomocą usługi tłumaczeń AI [Co-op Translator](https://github.com/Azure/co-op-translator). Chociaż dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym powinien być uznawany za autorytatywne źródło. W przypadku kluczowych informacji zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->