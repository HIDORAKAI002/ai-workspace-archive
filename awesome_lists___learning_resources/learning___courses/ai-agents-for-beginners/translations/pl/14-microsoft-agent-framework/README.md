# Eksploracja Microsoft Agent Framework

![Agent Framework](../../../translated_images/pl/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Wprowadzenie

Ta lekcja obejmie:

- Zrozumienie Microsoft Agent Framework: Kluczowe funkcje i wartość  
- Eksplorację kluczowych koncepcji Microsoft Agent Framework
- Zaawansowane wzorce MAF: przepływy pracy, middleware i pamięć

## Cele nauki

Po ukończeniu tej lekcji będziesz potrafił:

- Budować produkcyjnych agentów AI za pomocą Microsoft Agent Framework
- Stosować podstawowe funkcje Microsoft Agent Framework do swoich przypadków użycia z agentami
- Korzystać z zaawansowanych wzorców, w tym przepływów pracy, middleware i możliwości obserwacji

## Przykłady kodu 

Przykłady kodu dla [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) można znaleźć w tym repozytorium pod plikami `xx-python-agent-framework` oraz `xx-dotnet-agent-framework`.

## Zrozumienie Microsoft Agent Framework

![Framework Intro](../../../translated_images/pl/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) to zunifikowany framework Microsoft do budowania agentów AI. Oferuje elastyczność w adresowaniu różnorodnych przypadków użycia agentów obserwowanych zarówno w środowiskach produkcyjnych, jak i badawczych, w tym:

- **Sekwencyjną orkiestrację agentów** w scenariuszach, gdzie potrzebne są krok po kroku przepływy pracy.
- **Równoległą orkiestrację** w scenariuszach, gdzie agenci muszą wykonywać zadania jednocześnie.
- **Orkiestrację czatu grupowego** w scenariuszach, gdzie agenci mogą współpracować nad jednym zadaniem.
- **Orkiestrację przekazywania zadań** w scenariuszach, gdzie agenci przekazują zadanie między sobą w miarę ukończenia podzadań.
- **Orkiestrację magnetyczną** w scenariuszach, gdzie agent zarządzający tworzy i modyfikuje listę zadań oraz koordynuje podagentów do ukończenia zadania.

Aby dostarczyć agentów AI w środowisku produkcyjnym, MAF zawiera też funkcje takie jak:

- **Obserwowalność** przez użycie OpenTelemetry, gdzie każda akcja agenta AI, w tym wywołanie narzędzi, kroki orkiestracji, przepływy rozumowania i monitorowanie wydajności są dostępne poprzez pulpit Microsoft Foundry.
- **Bezpieczeństwo** poprzez natywne hostowanie agentów na Microsoft Foundry z kontrolami bezpieczeństwa, takimi jak dostęp oparty na rolach, obsługa prywatnych danych i wbudowane bezpieczeństwo treści.
- **Trwałość** ponieważ wątki i przepływy pracy agentów mogą być wstrzymywane, wznawiane i odzyskiwać się po błędach, co umożliwia dłużej działające procesy.
- **Kontrolę** ponieważ obsługiwane są przepływy pracy z udziałem człowieka, gdzie zadania oznacza się jako wymagające zatwierdzenia przez człowieka.

Microsoft Agent Framework jest też nastawiony na interoperacyjność przez:

- **Bycie niezależnym od chmury** - Agenci mogą działać w kontenerach, lokalnie i na wielu różnych chmurach.
- **Bycie niezależnym od dostawcy** - Agenci mogą być tworzeni przez preferowany SDK, w tym Azure OpenAI oraz OpenAI
- **Integrację otwartych standardów** - Agenci mogą korzystać z protokołów takich jak Agent-to-Agent(A2A) oraz Model Context Protocol (MCP) do wykrywania i używania innych agentów oraz narzędzi.
- **Wtyczki i konektory** - Możliwe są połączenia do usług danych i pamięci, takich jak Microsoft Fabric, SharePoint, Pinecone i Qdrant.

Przyjrzyjmy się, jak te funkcje są stosowane do podstawowych koncepcji Microsoft Agent Framework.

## Kluczowe koncepcje Microsoft Agent Framework

### Agenci

![Agent Framework](../../../translated_images/pl/agent-components.410a06daf87b4fef.webp)

**Tworzenie agentów**

Tworzenie agenta odbywa się przez zdefiniowanie usługi inferencyjnej (dostawcy LLM),  
zestawu instrukcji, które agent AI ma wykonywać oraz przypisanej `nazwy`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Powyższy przykład używa `Azure OpenAI`, ale agenci mogą być tworzeni korzystając z różnych usług, w tym `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` API

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

lub [MiniMax](https://platform.minimaxi.com/), który oferuje API kompatybilne z OpenAI z dużymi oknami kontekstowymi (do 204K tokenów):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

lub zdalnymi agentami korzystając z protokołu A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Uruchamianie agentów**

Agenci są uruchamiani za pomocą metod `.run` lub `.run_stream` dla odpowiednio odpowiedzi nie strumieniowych lub strumieniowych.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Każde uruchomienie agenta może mieć opcje dostosowania parametrów, takich jak `max_tokens` używane przez agenta, `tools`, które agent może wywoływać, a nawet sam `model` używany przez agenta.

Jest to użyteczne w przypadkach, gdy do realizacji zadania użytkownika wymagane są konkretne modele lub narzędzia.

**Narzędzia**

Narzędzia mogą być definiowane zarówno podczas definiowania agenta:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Podczas bezpośredniego tworzenia ChatAgent

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

jak i podczas uruchamiania agenta:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Narzędzie dostarczone tylko na to uruchomienie )
```

**Wątki agenta**

Wątki agenta służą do obsługi rozmów wieloetapowych. Wątki mogą być tworzone poprzez:

- Użycie `get_new_thread()`, co pozwala na zachowanie wątku w czasie
- Automatyczne utworzenie wątku podczas uruchamiania agenta, który trwa tylko podczas bieżącego uruchomienia.

Aby utworzyć wątek, kod wygląda następująco:

```python
# Utwórz nowy wątek.
thread = agent.get_new_thread() # Uruchom agenta z wątkiem.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Następnie możesz zserializować wątek, aby przechować go do późniejszego użycia:

```python
# Utwórz nowy wątek.
thread = agent.get_new_thread() 

# Uruchom agenta z wątkiem.

response = await agent.run("Hello, how are you?", thread=thread) 

# Zserializuj wątek do przechowywania.

serialized_thread = await thread.serialize() 

# Deserializuj stan wątku po załadowaniu z przechowywania.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Middleware agenta**

Agenci współdziałają z narzędziami i LLM, aby realizować zadania użytkowników. W niektórych scenariuszach chcemy wykonać lub śledzić akcję między tymi interakcjami. Middleware agenta pozwala na to przez:

*Middleware funkcji*

To middleware pozwala wykonać akcję pomiędzy agentem a wywoływaną funkcją/narzędziem. Przykładem zastosowania może być logowanie wywołania funkcji.

W poniższym kodzie `next` określa, czy należy wywołać kolejne middleware czy faktyczną funkcję.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Przetwarzanie wstępne: Log przed wykonaniem funkcji
    print(f"[Function] Calling {context.function.name}")

    # Kontynuuj do następnego middleware lub wykonania funkcji
    await next(context)

    # Przetwarzanie końcowe: Log po wykonaniu funkcji
    print(f"[Function] {context.function.name} completed")
```

*Middleware czatu*

To middleware pozwala wykonać lub zalogować akcję pomiędzy agentem a żądaniami wysyłanymi do LLM.

Zawiera to ważne informacje, takie jak `messages` wysyłane do usługi AI.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Wstępne przetwarzanie: Log przed wywołaniem AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Kontynuuj do następnego middleware lub usługi AI
    await next(context)

    # Przetwarzanie po wywołaniu: Log po odpowiedzi AI
    print("[Chat] AI response received")

```

**Pamięć agenta**

Jak omówiono w lekcji `Agentic Memory`, pamięć jest ważnym elementem umożliwiającym agentowi działanie na różnych kontekstach. MAF oferuje kilka typów pamięci:

*Pamięć w trakcie działania (In-Memory Storage)*

To pamięć przechowywana w wątkach podczas działania aplikacji.

```python
# Utwórz nowy wątek.
thread = agent.get_new_thread() # Uruchom agenta w wątku.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Wiadomości trwałe (Persistent Messages)*

Ta pamięć jest używana do przechowywania historii rozmów między różnymi sesjami. Definiowana jest przez `chat_message_store_factory`:

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

Ta pamięć jest dodawana do kontekstu przed uruchomieniem agentów. Może być przechowywana w zewnętrznych usługach, takich jak mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Korzystanie z Mem0 dla zaawansowanych możliwości pamięci
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

Obserwowalność jest ważna do budowy niezawodnych i łatwych w utrzymaniu systemów agentycznych. MAF integruje się z OpenTelemetry, by zapewnić śledzenie i pomiary dla lepszej obserwowalności.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # zrób coś
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Przepływy pracy

MAF udostępnia przepływy pracy — predefiniowane kroki do realizacji zadania, w których AI agenci są komponentami tych kroków.

Przepływy pracy składają się z różnych komponentów, które umożliwiają lepszą kontrolę przepływu. Pozwalają też na **orkiestrację wieloagentową** i **checkpointing** do zapisywania stanów przepływu pracy.

Podstawowe komponenty przepływu pracy to:

**Wykonawcy (Executors)**

Wykonawcy otrzymują wiadomości wejściowe, wykonują przypisane zadania, a następnie generują wiadomość wyjściową. Przesuwa to przepływ pracy do przodu w kierunku ukończenia większego zadania. Wykonawcami mogą być AI agenci lub niestandardowa logika.

**Krawędzie (Edges)**

Krawędzie służą do definiowania przepływu wiadomości w przepływie pracy. Mogą to być:

*Krawędzie bezpośrednie* - proste połączenia jeden-do-jednego między wykonawcami:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Krawędzie warunkowe* - aktywowane po spełnieniu określonego warunku. Na przykład gdy pokoje hotelowe są niedostępne, wykonawca może zasugerować inne opcje.

*Krawędzie switch-case* - kierują wiadomości do różnych wykonawców w zależności od zdefiniowanych warunków. Na przykład, jeśli klient podróżniczy ma dostęp priorytetowy, jego zadania będą obsługiwane przez inny przepływ pracy.

*Krawędzie fan-out* - wysyłają jedną wiadomość do wielu odbiorców.

*Krawędzie fan-in* - zbierają wiele wiadomości od różnych wykonawców i wysyłają do jednego odbiorcy.

**Zdarzenia (Events)**

Aby zapewnić lepszą obserwowalność przepływów pracy, MAF oferuje wbudowane zdarzenia wykonania, w tym:

- `WorkflowStartedEvent`  - Rozpoczęcie wykonania przepływu pracy
- `WorkflowOutputEvent` - Przepływ pracy generuje wynik
- `WorkflowErrorEvent` - Przepływ pracy napotyka błąd
- `ExecutorInvokeEvent`  - Wykonawca zaczyna przetwarzanie
- `ExecutorCompleteEvent`  -  Wykonawca kończy przetwarzanie
- `RequestInfoEvent` - Wysłano żądanie

## Zaawansowane wzorce MAF

Powyższe sekcje obejmują kluczowe koncepcje Microsoft Agent Framework. Budując bardziej złożonych agentów, rozważ następujące zaawansowane wzorce:

- **Kompozycja middleware**: Łącz wiele handlerów middleware (logowanie, uwierzytelnianie, ograniczanie szybkości) używając middleware funkcji i czatu dla precyzyjnej kontroli zachowania agenta.
- **Checkpointing przepływu pracy**: Użyj zdarzeń przepływu i serializacji do zapisywania i wznawiania długotrwałych procesów agentów.
- **Dynamiczny wybór narzędzi**: Połącz RAG na opisach narzędzi z rejestracją narzędzi MAF, aby prezentować tylko odpowiednie narzędzia dla zapytania.
- **Przekazywanie między agentami (Multi-Agent Handoff)**: Użyj krawędzi przepływu pracy i routingu warunkowego do orkiestracji przekazywania zadań między wyspecjalizowanymi agentami.

## Hostowanie agentów LangChain / LangGraph na Microsoft Foundry

Microsoft Agent Framework jest **frameworkowo interoperacyjny** — nie ogranicza Cię do agentów napisanych w MAF. Jeśli masz już agenta zbudowanego w **LangChain** lub **LangGraph**, możesz go uruchomić jako **agenta hostowanego w Microsoft Foundry**, dzięki czemu Foundry zarządza środowiskiem uruchomieniowym, sesjami, skalowaniem, tożsamością i punktami końcowymi protokołu, podczas gdy logika agenta pozostaje w LangGraph.

Odbywa się to za pomocą pakietu `langchain_azure_ai.agents.hosting`, który udostępnia skompilowany graf LangGraph przez te same protokoły, które używają agenci hostowani w Foundry.

**1. Zainstaluj hosting extra:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` extra instaluje biblioteki protokołów Foundry: `azure-ai-agentserver-responses` (punkt końcowy kompatybilny z OpenAI `/responses`) oraz `azure-ai-agentserver-invocations` (ogólny punkt `/invocations`).

**2. Wybierz protokół hostingu:**

| Protokół | Klasa hosta | Punkt końcowy | Kiedy używać |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Chcesz czatu kompatybilnego z OpenAI, strumieniowania, historii odpowiedzi i wątkowania rozmów — zalecany domyślny dla agentów konwersacyjnych. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Potrzebujesz niestandardowego kształtu JSON, punktu w stylu webhook lub przetwarzania niekonwersacyjnego. |

Ponieważ **Responses API jest podstawowym API do tworzenia agentów w Foundry**, zacznij od `ResponsesHostServer` dla większości agentów.

**3. Skonfiguruj zmienne środowiskowe** (najpierw `az login`, aby `DefaultAzureCredential` mogło się uwierzytelnić):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Gdy agent później działa jako agent hostowany w Foundry, platforma automatycznie wstrzykuje `FOUNDRY_PROJECT_ENDPOINT`.

**4. Udostępnij agenta LangGraph przez protokół Responses:**

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

    # ChatOpenAI tutaj kieruje zapytania do punktu końcowego kompatybilnego z OpenAI (Responses) projektu Foundry.
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

Uruchom lokalnie za pomocą `python main.py`, a następnie wyślij żądanie Responses na `http://localhost:8088/responses`.

**Kluczowe zachowania:**

- **Rozmowy**: Klienci kontynuują rozmowę, przekazując `previous_response_id` lub identyfikator `conversation`. Jeśli twój graf jest skompilowany z LangGraph checkpointerem, Foundry powiązuje stan rozmowy z checkpointem (w produkcji użyj trwałego checkpointera; `MemorySaver` jest wystarczający do testów lokalnych).
- **Człowiek w pętli (Human-in-the-loop)**: Jeśli graf używa LangGraph `interrupt()`, `ResponsesHostServer` pokazuje oczekujące przerwanie jako element `function_call` / `mcp_approval_request` w Responses, a klienci wznawiają odpowiedzią `function_call_output` / `mcp_approval_response`.
- **Deploy na Foundry**: Użyj Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (lokalnie, wymaga Dockera), potem `azd provision` i `azd deploy`. Wdrażanie agentów hostowanych wymaga roli **Foundry Project Manager**.

Działająca wersja tego przykładu znajduje się w [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Pełny przewodnik (protokół Invocations, niestandardowe schematy żądań i rozwiązywanie problemów) znajdziesz w [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Przykłady kodu 

Przykłady kodu dla Microsoft Agent Framework można znaleźć w tym repozytorium pod plikami `xx-python-agent-framework` i `xx-dotnet-agent-framework`.

## Masz więcej pytań o Microsoft Agent Framework?

Dołącz do [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D), żeby spotkać innych uczących się, uczestniczyć w konsultacjach i uzyskać odpowiedzi na pytania o agentach AI.
## Poprzednia lekcja

[Pamięć dla agentów AI](../13-agent-memory/README.md)

## Następna lekcja

[Budowanie agentów użycia komputera (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->