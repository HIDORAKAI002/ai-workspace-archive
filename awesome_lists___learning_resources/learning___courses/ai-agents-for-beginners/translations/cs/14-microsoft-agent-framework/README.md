# Prozkoumávání Microsoft Agent Framework

![Agent Framework](../../../translated_images/cs/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Úvod

Tato lekce pokryje:

- Porozumění Microsoft Agent Framework: Klíčové funkce a hodnota  
- Prozkoumání klíčových konceptů Microsoft Agent Framework
- Pokročilé vzory MAF: pracovní toky, middleware a paměť

## Cíle učení

Po dokončení této lekce budete vědět, jak:

- Vytvářet AI agenty připravené pro produkci pomocí Microsoft Agent Framework
- Aplikovat základní funkce Microsoft Agent Framework na vaše agentní scénáře použití
- Používat pokročilé vzory včetně workflow, middleware a pozorovatelnosti

## Ukázky kódu 

Ukázky kódu pro [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) lze nalézt v tomto repozitáři pod soubory `xx-python-agent-framework` a `xx-dotnet-agent-framework`.

## Porozumění Microsoft Agent Framework

![Framework Intro](../../../translated_images/cs/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) je jednotné prostředí Microsoftu pro vytváření AI agentů. Nabízí flexibilitu řešit širokou škálu agentních scénářů použití, které se vyskytují jak v produkčních, tak ve výzkumných prostředích, včetně:

- **Sekvenční orchestrace agentů** ve scénářích, kde jsou potřeba krok za krokem pracovní toky.
- **Současná orchestrace** ve scénářích, kde agenti musí úkoly dokončit současně.
- **Orchestrace skupinového chatu** ve scénářích, kde agenti mohou spolupracovat na jednom úkolu.
- **Předávání orchestrace** ve scénářích, kde agenti předávají úkol jeden druhému při dokončování dílčích úkolů.
- **Magnetická orchestrace** ve scénářích, kde manažerský agent vytváří a upravuje seznam úkolů a koordinuje podagenty k jejich dokončení.

Pro dodání AI agentů v produkci má MAF také zahrnuty funkce pro:

- **Pozorovatelnost** pomocí OpenTelemetry, kde každá akce AI agenta včetně volání nástrojů, orchestrálních kroků, toků odůvodnění a sledování výkonu probíhá přes Microsoft Foundry dashboardy.
- **Bezpečnost** hostováním agentů nativně na Microsoft Foundry, které obsahuje bezpečnostní kontroly jako řízení přístupu založené na rolích, zacházení s privátními daty a zabudovanou bezpečnost obsahu.
- **Trvanlivost** jelikož agentní vlákna a workflow mohou pozastavit, obnovit a zotavit se z chyb, což umožňuje dlouhodobé procesy.
- **Kontrolu** podporou pracovních toků s lidským zapojením, kde jsou úkoly označeny jako vyžadující lidské schválení.

Microsoft Agent Framework se také zaměřuje na interoperabilitu tím, že:

- **Je nezávislý na cloudu** - Agent může běžet v kontejnerech, on-premises i napříč různými cloudy.
- **Je nezávislý na poskytovateli** - Agent lze vytvořit pomocí vašeho preferovaného SDK včetně Azure OpenAI a OpenAI
- **Integruje otevřené standardy** - Agent může využívat protokoly jako Agent-to-Agent (A2A) a Model Context Protocol (MCP) k vyhledávání a použití jiných agentů a nástrojů.
- **Pluginy a konektory** - Připojení lze navázat k datovým a paměťovým službám jako Microsoft Fabric, SharePoint, Pinecone a Qdrant.

Podívejme se, jak jsou tyto funkce aplikovány na některé základní koncepty Microsoft Agent Framework.

## Klíčové koncepty Microsoft Agent Framework

### Agenti

![Agent Framework](../../../translated_images/cs/agent-components.410a06daf87b4fef.webp)

**Vytváření agentů**

Vytváření agentů se provádí definováním inference služby (poskytovatele LLM),  
sady instrukcí, kterými se má AI agent řídit, a přiřazeného `jménem`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Výše uvedené používá `Azure OpenAI`, ale agenti mohou být vytvořeni pomocí různých služeb včetně `Microsoft Foundry Agent Service`:

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

nebo [MiniMax](https://platform.minimaxi.com/), který poskytuje OpenAI-kompatibilní API s velkými kontextovými okny (až 204K tokenů):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

nebo vzdálené agenty pomocí protokolu A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Spouštění agentů**

Agenti jsou spouštěni pomocí metod `.run` nebo `.run_stream` pro ne-streamované nebo streamované odpovědi.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Každý běh agenta může mít také volby pro přizpůsobení parametrů jako `max_tokens`, které agent používá, `tools`, které může agent volat, a dokonce i samotný `model`, který agent používá.

To je užitečné v případech, kdy jsou pro dokončení uživatelského úkolu vyžadovány specifické modely nebo nástroje.

**Nástroje**

Nástroje lze definovat jak při definici agenta:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Při přímém vytváření ChatAgenta

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

a také při spuštění agenta:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Nástroj poskytovaný pouze pro tento běh )
```

**Agentní vlákna**

Agentní vlákna se používají k obsluze vícetahových konverzací. Vlákna lze vytvořit buď:

- Použitím `get_new_thread()`, které umožňuje vláknu být uloženo v čase
- Automatickým vytvořením vlákna při spouštění agenta a vláknem trvajícím jen během aktuálního běhu.

K vytvoření vlákna vypadá kód takto:

```python
# Vytvořit nový vlákno.
thread = agent.get_new_thread() # Spustit agenta s vláknem.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Vlákno lze pak serializovat a uložit pro pozdější použití:

```python
# Vytvořit nový vláknový proces.
thread = agent.get_new_thread() 

# Spustit agenta s vláknem.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serializovat vlákno pro uložení.

serialized_thread = await thread.serialize() 

# Deserializovat stav vlákna po načtení z úložiště.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agentní middleware**

Agent interagují s nástroji a LLM, aby dokončili uživatelské úkoly. V některých scénářích chceme vykonat nebo sledovat akce mezi těmito interakcemi. Agent middleware nám to umožňuje prostřednictvím:

*Funkční middleware*

Tento middleware nám umožňuje vykonat akci mezi agentem a funkcí/nástrojem, který volá. Příkladem využití je zaznamenávání volání funkce.

V následujícím kódu `next` určuje, zda se má zavolat další middleware nebo skutečná funkce.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Předzpracování: Záznam před vykonáním funkce
    print(f"[Function] Calling {context.function.name}")

    # Pokračovat na další střední vrstvu nebo vykonání funkce
    await next(context)

    # Pozpracování: Záznam po vykonání funkce
    print(f"[Function] {context.function.name} completed")
```

*Chat middleware*

Tento middleware nám umožňuje vykonat nebo zaznamenat akci mezi agentem a požadavky mezi LLM.

Obsahuje důležité informace jako `messages`, které jsou posílány AI službě.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Předzpracování: Protokolovat před voláním AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Pokračovat na další middleware nebo AI službu
    await next(context)

    # Post-processing: Protokolovat po odpovědi AI
    print("[Chat] AI response received")

```

**Agentní paměť**

Jak bylo pokryto v lekci `Agentic Memory`, paměť je důležitým prvkem pro umožnění agentovi pracovat v různých kontextech. MAF nabízí několik různých typů pamětí:

*Paměť v rámci aplikace (In-Memory Storage)*

Jedná se o paměť uloženou ve vláknech během běhu aplikace.

```python
# Vytvořit nový vlákno.
thread = agent.get_new_thread() # Spustit agenta s vláknem.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Perzistentní zprávy*

Tato paměť se používá při ukládání historie konverzace přes různé relace. Je definována pomocí `chat_message_store_factory` :

```python
from agent_framework import ChatMessageStore

# Vytvořit vlastní úložiště zpráv
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynamická paměť*

Tato paměť se přidává do kontextu před spuštěním agentů. Tyto paměti mohou být uloženy v externích službách jako mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Používání Mem0 pro pokročilé paměťové schopnosti
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

**Pozorovatelnost agenta**


Pozorovatelnost je důležitá pro vytváření spolehlivých a udržitelných agentních systémů. MAF se integruje s OpenTelemetry, aby poskytoval trasování a metry pro lepší pozorovatelnost.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # udělej něco
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Pracovní postupy

MAF nabízí pracovní postupy, což jsou předdefinované kroky k dokončení úkolu, které zahrnují AI agenty jako součást těchto kroků.

Pracovní postupy se skládají z různých komponent, které umožňují lepší řízení toku. Pracovní postupy také umožňují **víceagentní orchestraci** a **checkpointing** pro ukládání stavů pracovního postupu.

Základními komponentami pracovního postupu jsou:

**Prováděče**

Prováděči přijímají vstupní zprávy, vykonávají přidělené úkoly a poté vytvářejí výstupní zprávu. Tím posouvají pracovní postup vpřed k dokončení většího úkolu. Prováděči mohou být buď AI agenti, nebo vlastní logika.

**Hrany**

Hrany se používají k definování toku zpráv v pracovním postupu. Mohou být:

*Přímé hrany* - jednoduché spojení jeden na jednoho mezi prováděči:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Podmíněné hrany* - aktivují se po splnění určité podmínky. Například když nejsou dostupné hotelové pokoje, prováděč může navrhnout jiné možnosti.

*Přepínací hrany (switch-case)* - směrují zprávy k různým prováděčům na základě definovaných podmínek. Například pokud má cestující prioritní přístup, jeho úkoly budou řešeny jiným pracovním postupem.

*Fan-out hrany* - posílají jednu zprávu do více cílů.

*Fan-in hrany* - shromažďují více zpráv od různých prováděčů a posílají je jednomu cíli.

**Události**

Pro lepší pozorovatelnost pracovních postupů MAF nabízí vestavěné události pro jejich vykonávání, zahrnující:

- `WorkflowStartedEvent`  - Spuštění pracovního postupu
- `WorkflowOutputEvent` - Pracovní postup generuje výstup
- `WorkflowErrorEvent` - Pracovní postup narazí na chybu
- `ExecutorInvokeEvent`  - Prováděč začíná zpracovávat
- `ExecutorCompleteEvent`  -  Prováděč dokončil zpracování
- `RequestInfoEvent` - Vydán požadavek

## Pokročilé vzory MAF

Výše uvedené části pokrývají klíčové koncepty Microsoft Agent Frameworku. Při vytváření složitějších agentů zvážte následující pokročilé vzory:

- **Middleware kompozice**: Řetězení více middleware handlerů (logování, autentizace, omezení rychlosti) pomocí funkčního a chat middleware pro jemné řízení chování agenta.
- **Checkpointing pracovních postupů**: Použití událostí pracovních postupů a serializace k ukládání a obnovení dlouhotrvajících agentních procesů.
- **Dynamický výběr nástrojů**: Kombinace RAG nad popisy nástrojů s registrací nástrojů MAF, aby byly prezentovány pouze relevantní nástroje podle dotazu.
- **Víceagentní předání**: Použití hran pracovních postupů a podmíněného směrování k orchestraci předání mezi specializovanými agenty.

## Hostování agentů LangChain / LangGraph na Microsoft Foundry

Microsoft Agent Framework je **kompatibilní s různými frameworky** — nejste omezeni na agenty napsané s MAF. Pokud již máte agenta vytvořeného pomocí **LangChain** nebo **LangGraph**, můžete jej provozovat jako **hostovaného agenta Microsoft Foundry**, takže Foundry spravuje runtime, relace, škálování, identitu a protokolové koncové body za vás, zatímco logika vašeho agenta zůstává v LangGraph.

To se provádí balíčkem `langchain_azure_ai.agents.hosting`, který vystavuje kompilovaný LangGraph graf přes stejné protokoly, jaké používají hostovaní agenti Foundry.

**1. Nainstalujte hostingový doplněk:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

Doplněk `hosting` instaluje knihovny protokolu Foundry: `azure-ai-agentserver-responses` (kompatibilní OpenAI endpoint `/responses`) a `azure-ai-agentserver-invocations` (obecný endpoint `/invocations`).

**2. Vyberte hostingový protokol:**

| Protokol | Třída hostitele | Endpoint | Použití |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Chcete chat kompatibilní s OpenAI, streamování, historii odpovědí a konverzační vlákna — doporučený výchozí režim pro konverzační agenty. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Potřebujete vlastní JSON formát, webhookový styl endpoint nebo ne-konverzační zpracování. |

Protože **Responses API je primární API pro vývoj agentů v Foundry**, začněte s `ResponsesHostServer` u většiny agentů.

**3. Nastavte proměnné prostředí** (`az login` nejdříve, aby se mohl autentizovat `DefaultAzureCredential`):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Když agent později poběží jako hostovaný agent v Foundry, platforma automaticky injektuje `FOUNDRY_PROJECT_ENDPOINT`.

**4. Vystavte LangGraph agenta přes protokol Responses:**

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

    # ChatOpenAI zde cílí na OpenAI-kompatibilní (Responses) endpoint Foundry projektu.
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

Spusťte lokálně pomocí `python main.py`, poté odešlete požadavek přes Responses na `http://localhost:8088/responses`.

**Klíčové chování:**

- **Konverzace**: Klienti pokračují v konverzaci předáním `previous_response_id` nebo ID `conversation`. Pokud je váš graf zkompilovaný s LangGraph checkpointerem, Foundry klíčuje stav konverzace k checkpointu (pro produkci používejte trvalý checkpointer; `MemorySaver` je vhodný pro lokální testování).
- **Člověk v loopu**: Pokud váš graf používá LangGraph `interrupt()`, `ResponsesHostServer` zobrazí čekající přerušení jako položku Responses `function_call` / `mcp_approval_request` a klienti pokračují s odpovídajícím `function_call_output` / `mcp_approval_response`.
- **Deployment do Foundry**: Použijte Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (lokálně, vyžaduje Docker), pak `azd provision` a `azd deploy`. Deployment hostovaného agenta vyžaduje roli **Foundry Project Manager**.

Spustitelná verze tohoto příkladu se nachází v [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Pro kompletní průvodce (protokol Invocations, vlastní schémata požadavků a odstraňování problémů) viz [Hostování agentů LangGraph jako hostovaných agentů Foundry](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Ukázky kódu 

Ukázky kódu pro Microsoft Agent Framework naleznete v tomto repozitáři ve složkách `xx-python-agent-framework` a `xx-dotnet-agent-framework`.

## Máte další otázky o Microsoft Agent Framework?

Připojte se na [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D), kde můžete potkat další studenty, účastnit se konzultačních hodin a dostat odpovědi na své otázky o AI agentech.
## Předchozí lekce

[Paměť pro AI agenty](../13-agent-memory/README.md)

## Následující lekce

[Budování agentů pro používání počítače (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->