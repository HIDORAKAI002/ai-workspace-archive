# Istraživanje Microsoft Agent Frameworka

![Agent Framework](../../../translated_images/hr/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Uvod

Ova lekcija obuhvaća:

- Razumijevanje Microsoft Agent Frameworka: ključne značajke i vrijednost  
- Istraživanje ključnih koncepata Microsoft Agent Frameworka
- Napredni MAF obrasci: radni tijekovi, middleware i memorija

## Ciljevi učenja

Nakon završetka ove lekcije znat ćete kako:

- Izgraditi AI agente spremne za produkciju koristeći Microsoft Agent Framework
- Primijeniti osnovne značajke Microsoft Agent Frameworka na vaše agentske slučajeve upotrebe
- Koristiti napredne obrasce uključujući radne tijekove, middleware i nadzor

## Primjeri koda

Primjeri koda za [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) mogu se pronaći u ovom spremištu u datotekama `xx-python-agent-framework` i `xx-dotnet-agent-framework`.

## Razumijevanje Microsoft Agent Frameworka

![Framework Intro](../../../translated_images/hr/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) je Microsoftov jedinstveni okvir za izgradnju AI agenata. Nudi fleksibilnost za rješavanje širokog spektra agentskih slučajeva upotrebe viđenih u produkcijskim i istraživačkim okruženjima, uključujući:

- **Sekvencijalnu orkestraciju agenata** u scenarijima gdje su potrebni radni tijekovi korak-po-korak.
- **Istovremenu orkestraciju** u scenarijima gdje agenti trebaju izvršavati zadatke istovremeno.
- **Orkestraciju grupnog chata** u scenarijima gdje agenti mogu surađivati na jednom zadatku.
- **Orkestraciju predaje zadatka** u scenarijima gdje agenti predaju zadatke jedni drugima kako se podzadatci završavaju.
- **Magnetnu orkestraciju** u scenarijima gdje upravljački agent kreira i modificira popis zadataka te koordinira podagente za dovršetak zadatka.

Za isporuku AI agenata u produkciji, MAF također uključuje značajke za:

- **Nadzor** korištenjem OpenTelemetry gdje se prati svaki potez AI agenta uključujući pozivanje alata, korake orkestracije, tokove razmišljanja i nadzor izvedbe putem Microsoft Foundry nadzornih ploča.
- **Sigurnost** hostanjem agenata nativno na Microsoft Foundryu što uključuje sigurnosne kontrole poput pristupa temeljenog na ulogama, upravljanja privatnim podacima i ugrađene sigurnosti sadržaja.
- **Trajnost** budući da agent nickovi i radni tijekovi mogu pauzirati, nastaviti i oporaviti se od pogrešaka omogućavajući dugotrajnije procese.
- **Kontrolu** jer se podržavaju radni tijekovi s ljudskim uplitanjem gdje se zadaci označavaju kao zahtijevajući ljudsku potvrdu.

Microsoft Agent Framework također je usmjeren na interoperabilnost kroz:

- **Neutralnost prema oblaku** - agenti mogu raditi u spremnicima, lokalno i preko različitih oblaka.
- **Neutralnost prema davatelju usluga** - agenti se mogu stvarati koristeći vaš omiljeni SDK uključujući Azure OpenAI i OpenAI
- **Integraciju otvorenih standarda** - agenti mogu koristiti protokole poput Agent-to-Agent (A2A) i Model Context Protocol (MCP) za pronalazak i korištenje drugih agenata i alata.
- **Plugins i konektore** - mogu se uspostaviti veze s uslugama podataka i memorije kao što su Microsoft Fabric, SharePoint, Pinecone i Qdrant.

Pogledajmo kako se ove značajke primjenjuju na neke od osnovnih koncepata Microsoft Agent Frameworka.

## Ključni koncepti Microsoft Agent Frameworka

### Agenti

![Agent Framework](../../../translated_images/hr/agent-components.410a06daf87b4fef.webp)

**Kreiranje agenata**

Kreiranje agenta postiže se definiranjem usluge zaključivanja (LLM pružatelj), skupa uputa koje AI agent treba slijediti, te dodjelom `imena`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Gornji primjer koristi `Azure OpenAI`, ali agenti se mogu stvarati koristeći razne usluge uključujući `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI API-je `Responses` i `ChatCompletion`

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ili [MiniMax](https://platform.minimaxi.com/) koji pruža OpenAI-kompatibilan API s velikim kontekstnim prozorima (do 204K tokena):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ili udaljene agente koristeći A2A protokol:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Pokretanje agenata**

Agenti se pokreću korištenjem metoda `.run` ili `.run_stream` za ne-streaming ili streaming odgovore.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Svako pokretanje agenta također može imati opcije za prilagodbu parametara poput `max_tokens` koje agent koristi, `alate` koje agent može pozvati, pa čak i sam `model` koji se koristi za agenta.

Ovo je korisno u slučajevima kada su potrebni specifični modeli ili alati za dovršetak korisničkog zadatka.

**Alati**

Alati se mogu definirati i prilikom definiranja agenta:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Prilikom izravnog stvaranja ChatAgenta

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

kao i prilikom pokretanja agenta:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Alat osiguran samo za ovo izvođenje )
```

**Agent Threads**

Agent Threads koristite za rukovanje višekratnim razgovorima. Threads se mogu kreirati na sljedeće načine:

- Korištenjem `get_new_thread()` što omogućuje spremanje thread-a tijekom vremena
- Automatskim kreiranjem thread-a prilikom pokretanja agenta gdje thread traje samo za vrijeme tog pokretanja.

Za kreiranje thread-a kod izgleda ovako:

```python
# Kreiraj novi thread.
thread = agent.get_new_thread() # Pokreni agenta s threadom.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Thread se potom može serijalizirati za pohranu i kasniju upotrebu:

```python
# Kreirajte novi thread.
thread = agent.get_new_thread() 

# Pokrenite agenta s threadom.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serijalizirajte thread za pohranu.

serialized_thread = await thread.serialize() 

# Deserijalizirajte stanje threada nakon učitavanja iz pohrane.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agent Middleware**

Agenti komuniciraju s alatima i LLM-ovima za izvršenje korisničkih zadataka. U određenim scenarijima želimo izvršiti ili pratiti radnje između tih interakcija. Agent middleware to omogućava kroz:

*Middleware funkcija*

Ovaj middleware omogućava izvršavanje radnje između agenta i funkcije/alata koju agent poziva. Primjer upotrebe je kad želite obaviti zapisivanje (logiranje) poziva funkcije.

U donjem kodu `next` definira treba li pozvati sljedeći middleware ili stvarnu funkciju.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Predobrada: Započnite zapis prije izvršavanja funkcije
    print(f"[Function] Calling {context.function.name}")

    # Nastavi na sljedeći middleware ili izvršenje funkcije
    await next(context)

    # Postobrada: Započnite zapis nakon izvršavanja funkcije
    print(f"[Function] {context.function.name} completed")
```

*Chat Middleware*

Ovaj middleware omogućuje izvršavanje ili zapisivanje radnje između agenta i zahtjeva prema LLM-u.

Sadrži važne informacije kao što su `poruke` koje se šalju AI usluzi.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Predobrada: Zabilježi prije poziva AI-ja
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Nastavi na sljedeći middleware ili AI uslugu
    await next(context)

    # Naknadna obrada: Zabilježi nakon odgovora AI-ja
    print("[Chat] AI response received")

```

**Agent Memory**

Kao što je objašnjeno u lekciji `Agentic Memory`, memorija je važan element za omogućavanje rada agenta kroz različite kontekste. MAF nudi nekoliko različitih tipova memorije:

*Memorija u memoriji (In-Memory Storage)*

Ova memorija je pohranjena u threadovima tijekom izvođenja aplikacije.

```python
# Kreirajte novu nit.
thread = agent.get_new_thread() # Pokrenite agenta s niti.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Trajne poruke*

Ova memorija se koristi za pohranu povijesti razgovora preko različitih sesija. Definira se pomoću `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Kreirajte prilagođenu pohranu poruka
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dinamička memorija*

Ova memorija dodaje se u kontekst prije pokretanja agenata. Ove memorije mogu se pohraniti u eksternim uslugama kao što je mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Korištenje Mem0 za napredne memorijske mogućnosti
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

Nadzor je važan za izgradnju pouzdanih i održivih agentskih sustava. MAF se integrira s OpenTelemetry za pružanje praćenja i mjernih instrumenata za bolju vidljivost.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # napravi nešto
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Radni tijekovi

MAF nudi radne tijekove koji su unaprijed definirani koraci za dovršetak zadatka i uključuju AI agente kao komponente tih koraka.

Radni tijekovi se sastoje od različitih komponenti koje omogućuju bolju kontrolu toka. Radni tijekovi također omogućuju **multi-agent orkestraciju** i **checkpointing** za spremanje stanja radnog tijeka.

Osnovne komponente radnog tijeka su:

**Izvršitelji**

Izvršitelji primaju ulazne poruke, izvršavaju dodijeljene zadatke i proizvode izlaznu poruku. Time se radni tijek kreće prema dovršetku većeg zadatka. Izvršitelji mogu biti AI agent ili prilagođena logika.

**Veze (Edges)**

Veze se koriste za definiranje toka poruka u radnom tijeku. One mogu biti:

*Izravne veze* - Jednostavne veze jedan-na-jedan između izvršitelja:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Uvjetne veze* - Aktiviraju se nakon ispunjenja određenog uvjeta. Na primjer, kada hotelske sobe nisu dostupne, izvršitelj može predložiti druge opcije.

*Prekidačke veze (switch-case)* - Usmjeravaju poruke različitim izvršiteljima na temelju definiranih uvjeta. Na primjer, ako putnički korisnik ima prioritetni pristup, njihovi će zadaci biti obrađeni kroz drugi radni tijek.

*Dijeljenje veza (fan-out)* - Šalje jednu poruku prema više odredišta.

*Spajanje veza (fan-in)* - Prikuplja više poruka od različitih izvršitelja i šalje ih jednom odredištu.

**Događaji**

Za bolji nadzor radnih tijekova, MAF nudi ugrađene događaje za izvršenje uključujući:

- `WorkflowStartedEvent`  - Početak izvršavanja radnog tijeka
- `WorkflowOutputEvent` - Radni tijek proizvodi izlaz
- `WorkflowErrorEvent` - Radni tijek susreće pogrešku
- `ExecutorInvokeEvent`  - Izvršitelj počinje s obradom
- `ExecutorCompleteEvent`  -  Izvršitelj završava obradu
- `RequestInfoEvent` - Izdan je zahtjev

## Napredni MAF obrasci

Gornji dijelovi opisuju ključne koncepte Microsoft Agent Frameworka. Kako gradite složenije agente, ovdje su neki napredni obrasci koje treba razmotriti:

- **Sastavljanje middleware-a**: Povežite više middleware handlera (logiranje, autentifikacija, ograničenje brzine) koristeći middleware funkcija i chat middleware za finu kontrolu ponašanja agenata.
- **Checkpointing radnog tijeka**: Koristite događaje radnog tijeka i serijalizaciju za spremanje i nastavak dugotrajnih procesa agenata.
- **Dinamički odabir alata**: Kombinirajte RAG preko opisa alata s MAF-ovom registracijom alata za prikazivanje samo relevantnih alata po upitu.
- **Višestruka predaja zadataka između agenata**: Koristite veze radnog tijeka i uvjetno usmjeravanje za orkestraciju predaje između specijaliziranih agenata.

## Primjeri koda

Primjeri koda za Microsoft Agent Framework mogu se pronaći u ovom spremištu u datotekama `xx-python-agent-framework` i `xx-dotnet-agent-framework`.

## Imate dodatnih pitanja o Microsoft Agent Frameworku?

Pridružite se [Microsoft Foundry Discordu](https://aka.ms/ai-agents/discord) za susret s drugim učenicima, sudjelovanje u radnim satima i odgovore na vaša pitanja o AI agentima.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o odricanju odgovornosti**:
Ovaj dokument preveden je korištenjem AI usluge za prevođenje [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, molimo vas da imate na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na njegovom izvornom jeziku treba smatrati autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakve nesporazume ili pogrešna tumačenja koja proizlaze iz upotrebe ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->