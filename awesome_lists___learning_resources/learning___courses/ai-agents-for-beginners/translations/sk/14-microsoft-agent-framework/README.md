# Preskúmanie Microsoft Agent Framework

![Agent Framework](../../../translated_images/sk/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Úvod

Táto lekcia pokryje:

- Pochopenie Microsoft Agent Framework: Kľúčové vlastnosti a hodnota  
- Preskúmanie kľúčových konceptov Microsoft Agent Framework
- Pokročilé vzory MAF: pracovné toky, middleware a pamäť

## Ciele učenia

Po dokončení tejto lekcie budete vedieť:

- Vytvoriť produkčne pripravených AI agentov pomocou Microsoft Agent Framework
- Použiť základné vlastnosti Microsoft Agent Framework na vaše agentové použitia
- Používať pokročilé vzory vrátane pracovných tokov, middleware a pozorovateľnosti

## Ukážky kódu

Ukážky kódu pre [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) nájdete v tomto repozitári v súboroch `xx-python-agent-framework` a `xx-dotnet-agent-framework`.

## Pochopenie Microsoft Agent Framework

![Framework Intro](../../../translated_images/sk/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) je jednotný rámec Microsoftu na tvorbu AI agentov. Ponúka flexibilitu riešiť širokú škálu agentových prípadov použitia, ktoré sa vyskytujú ako v produkcii, tak vo výskumných prostrediach vrátane:

- **Sekvenčná orchestrácia agentov** v scenároch, kde sú potrebné krok za krokom pracovné toky.
- **Súbežná orchestrácia** v scenároch, kde agenti musia dokončiť úlohy súčasne.
- **Orchestrácia skupinového chatu** v scenároch, kde môžu agenti spolupracovať na jednej úlohe.
- **Orchestrácia odovzdania** v scenároch, kde agenti odovzdávajú úlohu jeden druhému po dokončení podúloh.
- **Magnetická orchestrácia** v scenároch, kde správca agent vytvára a modifikuje zoznam úloh a riadi koordináciu podagentov na dokončenie úlohy.

Pre dodanie AI agentov v produkcii MAF tiež obsahuje funkcie pre:

- **Pozorovateľnosť** cez použitie OpenTelemetry, kde každá akcia AI agenta vrátane volania nástrojov, orchestrácie krokov, tokov rozumovania a monitorovania výkonnosti prebieha cez Microsoft Foundry dashboardy.
- **Bezpečnosť** hostovaním agentov natívne na Microsoft Foundry, čo zahŕňa bezpečnostné kontroly ako prístup na základe rolí, spracovanie súkromných údajov a zabudovanú obsahovú bezpečnosť.
- **Trvanlivosť** pretože agentové vlákna a pracovné toky môžu byť pozastavené, obnovené a zotavené z chýb, čo umožňuje dlhšie bežiace procesy.
- **Kontrolu** pretože sú podporované pracovné toky s človekom v slučke, kde sú úlohy označené ako vyžadujúce schválenie človekom.

Microsoft Agent Framework je tiež zameraný na interoperabilitu tým, že:

- **Je nezávislý na cloude** – agenti môžu bežať v kontajneroch, on-premise a naprieč rôznymi cloudmi.
- **Je nezávislý na poskytovateľovi** – agenti môžu byť tvorení cez váš preferovaný SDK vrátane Azure OpenAI a OpenAI.
- **Integruje otvorené štandardy** – agenti môžu využívať protokoly ako Agent-to-Agent (A2A) a Model Context Protocol (MCP) na objavovanie a používanie iných agentov a nástrojov.
- **Pluginy a konektory** – možné pripojenia k dátovým a pamäťovým službám ako Microsoft Fabric, SharePoint, Pinecone a Qdrant.

Pozrime sa na to, ako sú tieto vlastnosti aplikované na niektoré základné koncepty Microsoft Agent Framework.

## Kľúčové koncepty Microsoft Agent Framework

### Agenti

![Agent Framework](../../../translated_images/sk/agent-components.410a06daf87b4fef.webp)

**Tvorba agentov**

Agent sa vytvára definovaním inferenčnej služby (poskytovateľ LLM), sady inštrukcií, ktorým má AI agent nasledovať a prideleným `name`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Vyššie je použitý `Azure OpenAI`, ale agenti môžu byť vytvorení pomocou rôznych služieb vrátane `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI API `Responses`, `ChatCompletion`

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

alebo [MiniMax](https://platform.minimaxi.com/), ktorý poskytuje API kompatibilné s OpenAI s veľkými kontextovými oknami (až do 204K tokenov):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

alebo vzdialených agentov používajúcich protokol A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Spustenie agentov**

Agentov spúšťame pomocou metód `.run` alebo `.run_stream` pre ne-streamované alebo streamované odpovede.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Každé spustenie agenta môže mať aj možnosti na prispôsobenie parametrov, ako napríklad `max_tokens` používané agentom, `tools` ktoré agent môže volať a dokonca aj samotný `model` použitý agentom.

To je užitočné v prípadoch, kde sú potrebné konkrétne modely alebo nástroje na dokončenie úlohy používateľa.

**Nástroje**

Nástroje môžu byť definované pri definovaní agenta:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Pri priamom vytváraní ChatAgenta

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

a tiež pri spustení agenta:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Nástroj poskytnutý iba pre tento beh )
```

**Vlákna agentov**

Vlákna agentov sa používajú na riešenie viackolových konverzácií. Vlákna môžu byť vytvorené buď:

- Použitím `get_new_thread()` čo umožní vlákno uložiť na neskoršie použitie
- Vytvorením vlákna automaticky pri spustení agenta, kde vlákno trvá iba počas aktuálneho spustenia.

Tvorba vlákna vyzerá takto:

```python
# Vytvorte nový vlákno.
thread = agent.get_new_thread() # Spustite agenta s vláknom.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Následne môžete serializovať vlákno na uloženie pre neskoršie použitie:

```python
# Vytvoriť novú vlákno.
thread = agent.get_new_thread() 

# Spustiť agenta s vláknom.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serializovať vlákno na uloženie.

serialized_thread = await thread.serialize() 

# Deserializovať stav vlákna po načítaní z úložiska.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Middleware agentov**

Agenti interagujú s nástrojmi a LLM na dokončenie úloh používateľa. V určitých situáciách chceme vykonať alebo sledovať akcie medzi týmito interakciami. Middleware agentov nám to umožňuje prostredníctvom:

*Funkčného middleware*

Tento middleware umožňuje vykonať akciu medzi agentom a funkciou/nástrojom, ktorý bude volať. Príklad použitia je pri logovaní volaní funkcie.

V kóde nižšie `next` definuje, či sa má zavolať ďalší middleware alebo samotná funkcia.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Predspracovanie: Záznam pred vykonaním funkcie
    print(f"[Function] Calling {context.function.name}")

    # Pokračovať na ďalší middleware alebo vykonanie funkcie
    await next(context)

    # Postspracovanie: Záznam po vykonaní funkcie
    print(f"[Function] {context.function.name} completed")
```

*Chat middleware*

Tento middleware umožňuje vykonať alebo zaznamenať akciu medzi agentom a požiadavkami do LLM.

Obsahuje dôležité informácie ako `messages`, ktoré sú odosielané do AI služby.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Predspracovanie: Záznam pred volaním AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Pokračovať na ďalší middleware alebo AI službu
    await next(context)

    # Postspracovanie: Záznam po odpovedi AI
    print("[Chat] AI response received")

```

**Pamäť agenta**

Ako bolo popísané v lekcii `Agentic Memory`, pamäť je dôležitý prvok umožňujúci agentovi pracovať v rôznych kontextoch. MAF ponúka niekoľko typov pamätí:

*Pamäť v rámci behu*

Pamäť uložená vo vláknach počas behu aplikácie.

```python
# Vytvorte nový vlákno.
thread = agent.get_new_thread() # Spustite agenta s vláknom.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Perzistentné správy*

Táto pamäť sa používa na ukladanie histórie konverzácií cez rôzne relácie. Definuje sa pomocou `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Vytvorte vlastné úložisko správ
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynamická pamäť*

Táto pamäť sa pridáva do kontextu pred spustením agentov. Tieto pamäte môžu byť uložené v externých službách, ako je mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Použitie Mem0 pre pokročilé pamäťové schopnosti
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

**Pozorovateľnosť agentov**

Pozorovateľnosť je dôležitá pre tvorbu spoľahlivých a udržiavateľných agentových systémov. MAF integruje OpenTelemetry na zabezpečenie trasovania a metrík pre lepšiu pozorovateľnosť.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # urobiť niečo
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Pracovné toky

MAF ponúka pracovné toky, ktoré sú preddefinované kroky na dokončenie úlohy a zahŕňajú AI agentov ako komponenty v týchto krokoch.

Pracovné toky pozostávajú z rôznych komponentov, ktoré umožňujú lepšiu kontrolu toku. Pracovné toky tiež umožňujú **multi-agentovú orchestráciu** a **checkpointing** na uloženie stavov pracovného toku.

Základné komponenty pracovného toku sú:

**Executor-y**

Executor-y prijímajú vstupné správy, vykonávajú pridelené úlohy a potom produkujú výstupnú správu. Posúva to pracovný tok smerom k dokončeniu väčšej úlohy. Executor môže byť buď AI agent alebo vlastná logika.

**Hrany**

Hrany sa používajú na definovanie toku správ v pracovnom toku. Môžu byť:

*Priame hrany* - Jednoduché jeden na jedného spojenia medzi executormi:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Podmienené hrany* - Aktivujú sa po splnení určitej podmienky. Napríklad, keď nie sú dostupné hotelové izby, executor môže navrhnúť iné možnosti.

*Switch-case hrany* - Smerujú správy k rôznym executorom podľa definovaných podmienok. Napríklad, ak má zákazník s cestovaním prioritný prístup, jeho úlohy budú riešené cez iný pracovný tok.

*Fan-out hrany* - Posiela jednu správu viacerým cieľom.

*Fan-in hrany* - Zhromažďuje viaceré správy od rôznych executorov a posiela len jednomu cieľu.

**Udalosti**

Na lepšiu pozorovateľnosť pracovných tokov ponúka MAF zabudované udalosti pre vykonávanie vrátane:

- `WorkflowStartedEvent`  - začatie vykonávania pracovného toku
- `WorkflowOutputEvent` - pracovný tok vytvorí výstup
- `WorkflowErrorEvent` - pracovný tok narazil na chybu
- `ExecutorInvokeEvent`  - executor začne spracovanie
- `ExecutorCompleteEvent`  - executor dokončí spracovanie
- `RequestInfoEvent` - bola vydaná požiadavka

## Pokročilé vzory MAF

Vyššie uvedené sekcie pokrývajú kľúčové koncepty Microsoft Agent Framework. Ako budete tvoriť zložitejších agentov, tu sú niektoré pokročilé vzory na zváženie:

- **Kombinácia middleware**: Ťažte viacero middleware obslužných prvkov (logovanie, autentifikácia, limitovanie šírky pásma) použitie funkčného a chat middleware pre jemnozrnnú kontrolu správania agenta.
- **Checkpointing pracovných tokov**: Použite udalosti pracovného toku a serializáciu na uloženie a obnovenie dlhodobých procesov agenta.
- **Dynamický výber nástrojov**: Kombinujte RAG nad popismi nástrojov s registráciou nástrojov v MAF, aby sa zobrazovali relevantné nástroje podľa dotazu.
- **Multi-agentové odovzdávanie**: Použite hrany pracovného toku a podmienené smerovanie na orchestráciu odovzdávania medzi špecializovanými agentmi.

## Ukážky kódu

Ukážky kódu pre Microsoft Agent Framework nájdete v tomto repozitári v súboroch `xx-python-agent-framework` a `xx-dotnet-agent-framework`.

## Máte viac otázok o Microsoft Agent Framework?

Pridajte sa na [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), aby ste sa stretli s inými študentmi, zúčastnili sa konzultačných hodín a získali odpovede na vaše otázky o AI agentoch.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zrieknutie sa zodpovednosti**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, majte prosím na pamäti, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nepochopenia alebo mylné interpretácie vyplývajúce z používania tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->