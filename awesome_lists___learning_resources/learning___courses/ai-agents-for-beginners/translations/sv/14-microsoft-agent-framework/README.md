# Utforska Microsoft Agent Framework

![Agent Framework](../../../translated_images/sv/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Introduktion

Denna lektion kommer att täcka:

- Förstå Microsoft Agent Framework: Nyckelfunktioner och värde  
- Utforska nyckelkoncepten i Microsoft Agent Framework
- Avancerade MAF-mönster: Arbetsflöden, middleware och minne

## Lärandemål

Efter att ha genomfört denna lektion kommer du att veta hur du:

- Bygger produktionsklara AI-agenter med Microsoft Agent Framework
- Tillämpa kärnfunktionerna i Microsoft Agent Framework på dina agentdrivna användningsfall
- Använder avancerade mönster inklusive arbetsflöden, middleware och observabilitet

## Kodexempel

Kodexempel för [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) finns i detta repository under filerna `xx-python-agent-framework` och `xx-dotnet-agent-framework`.

## Förstå Microsoft Agent Framework

![Framework Intro](../../../translated_images/sv/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) är Microsofts enhetliga ramverk för att bygga AI-agenter. Det erbjuder flexibilitet att hantera en mängd olika agentdrivna användningsfall som ses i både produktions- och forskningsmiljöer inklusive:

- **Sekventiell agentorkestrering** i scenarier där steg-för-steg-arbetsflöden behövs.
- **Parallell orkestrering** i scenarier där agenter behöver utföra uppgifter samtidigt.
- **Grupchattorkestrering** i scenarier där agenter kan samarbeta kring en uppgift.
- **Överlämningsorkestrering** i scenarier där agenter överlämnar uppgiften till varandra allteftersom deluppgifter slutförs.
- **Magnetisk orkestrering** i scenarier där en chef-agent skapar och ändrar en uppgiftslista och hanterar koordineringen av subagenter för att slutföra uppgiften.

För att leverera AI-agenter i produktion har MAF även inkluderat funktioner för:

- **Observabilitet** genom användning av OpenTelemetry där varje handling av AI-agenten inklusive verktygsanrop, orkestreringssteg, resonemangsflöden och prestationsövervakning sker via Microsoft Foundry-instrumentpaneler.
- **Säkerhet** genom att värda agenter inbyggt på Microsoft Foundry som inkluderar säkerhetskontroller som rollbaserad åtkomst, hantering av privat data och inbyggd innehållssäkerhet.
- **Tålighet** eftersom agent-trådar och arbetsflöden kan pausa, återuppta och återhämta sig från fel vilket möjliggör långvariga processer.
- **Kontroll** eftersom arbetsflöden med mänsklig inblandning stöds där uppgifter markeras som kräver mänskligt godkännande.

Microsoft Agent Framework är också fokuserat på att vara interoperabelt genom att:

- **Vara molnagnostiskt** - Agenter kan köras i containrar, lokalt och över flera olika moln.
- **Vara leverantörsagnostiskt** - Agenter kan skapas via ditt föredragna SDK inklusive Azure OpenAI och OpenAI
- **Integrera öppna standarder** - Agenter kan använda protokoll såsom Agent-till-Agent (A2A) och Model Context Protocol (MCP) för att upptäcka och använda andra agenter och verktyg.
- **Plugins och kontakter** - Anslutningar kan göras till data- och minnestjänster som Microsoft Fabric, SharePoint, Pinecone och Qdrant.

Låt oss titta på hur dessa funktioner tillämpas på några av kärnkoncepten i Microsoft Agent Framework.

## Nyckelkoncept i Microsoft Agent Framework

### Agenter

![Agent Framework](../../../translated_images/sv/agent-components.410a06daf87b4fef.webp)

**Skapa agenter**

Agentskapande görs genom att definiera inferenstjänsten (LLM-leverantör), en uppsättning instruktioner som AI-agenten ska följa, och ett tilldelat `name`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Ovan används `Azure OpenAI` men agenter kan skapas med en mängd olika tjänster inklusive `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` API:er

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

eller [MiniMax](https://platform.minimaxi.com/), som erbjuder en OpenAI-kompatibel API med stora kontextfönster (upp till 204K tokens):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

eller fjärragenter som använder A2A-protokollet:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Köra agenter**

Agenter körs med `.run` eller `.run_stream` metoder för antingen icke-strömmade eller strömmade svar.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Varje agentkörning kan också ha alternativ för att anpassa parametrar som `max_tokens` som används av agenten, `tools` som agenten kan anropa, och till och med själva `model` som används för agenten.

Detta är användbart i fall där specifika modeller eller verktyg krävs för att slutföra en användares uppgift.

**Verktyg**

Verktyg kan defineras både vid definition av agenten:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# När du skapar en ChatAgent direkt

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

och också vid körning av agenten:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Verktyg tillhandahållet endast för denna körning )
```

**Agenttrådar**

Agenttrådar används för att hantera samtal över flera vändor. Trådar kan skapas antingen genom:

- Att använda `get_new_thread()` som möjliggör att tråden sparas över tid
- Att automatisk skapa en tråd när en agent körs och bara ha tråden under den aktuella körningen.

För att skapa en tråd ser koden ut så här:

```python
# Skapa en ny tråd.
thread = agent.get_new_thread() # Kör agenten med tråden.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Du kan sedan serialisera tråden för att lagras för senare användning:

```python
# Skapa en ny tråd.
thread = agent.get_new_thread() 

# Kör agenten med tråden.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serialisera tråden för lagring.

serialized_thread = await thread.serialize() 

# Avserialisera trådens tillstånd efter inläsning från lagring.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Agent Middleware**

Agenter interagerar med verktyg och LLM:er för att slutföra användarens uppgifter. I vissa scenarier vill vi utföra eller spåra mellan dessa interaktioner. Agent middleware möjliggör detta genom:

*Funktionsmiddleware*

Denna middleware tillåter oss att utföra en åtgärd mellan agenten och en funktion/verktyg som den kommer att anropa. Ett exempel på när detta kan användas är om du vill logga anropen till funktionen.

I koden nedan definierar `next` om nästa middleware eller den faktiska funktionen ska anropas.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Förbehandling: Logga före funktionskörning
    print(f"[Function] Calling {context.function.name}")

    # Fortsätt till nästa middleware eller funktionskörning
    await next(context)

    # Efterbehandling: Logga efter funktionskörning
    print(f"[Function] {context.function.name} completed")
```

*Chattmiddleware*

Denna middleware tillåter oss att utföra eller logga en åtgärd mellan agenten och förfrågningarna mellan LLM.

Detta innehåller viktig information såsom `messages` som skickas till AI-tjänsten.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Förbehandling: Logga innan AI-anrop
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Fortsätt till nästa mellanprogram eller AI-tjänst
    await next(context)

    # Efterbearbetning: Logga efter AI-svar
    print("[Chat] AI response received")

```

**Agentminne**

Som behandlats i lektionen `Agentic Memory` är minne en viktig komponent för att tillåta agenten att operera över olika kontexter. MAF erbjuder flera olika typer av minnen:

*Minneslagring i minnet*

Detta är minnet som lagras i trådar under applikationens körningstid.

```python
# Skapa en ny tråd.
thread = agent.get_new_thread() # Kör agenten med tråden.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Persistenta meddelanden*

Detta minne används för att lagra konversationshistorik över olika sessioner. Det definieras med `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Skapa en anpassad meddelandelagring
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dynamiskt minne*

Detta minne läggs till i kontexten innan agenter körs. Dessa minnen kan lagras i externa tjänster såsom mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Använder Mem0 för avancerade minnesfunktioner
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

**Agentobservabilitet**

Observabilitet är viktigt för att bygga tillförlitliga och underhållbara agentdrivna system. MAF integreras med OpenTelemetry för att tillhandahålla spårning och mätare för bättre observabilitet.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # gör något
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Arbetsflöden

MAF erbjuder arbetsflöden som är fördefinierade steg för att slutföra en uppgift och inkluderar AI-agenter som komponenter i dessa steg.

Arbetsflöden består av olika komponenter som möjliggör bättre kontrollflöde. Arbetsflöden möjliggör också **multi-agent orkestrering** och **checkpointing** för att spara arbetsflödets tillstånd.

Kärnkomponenterna i ett arbetsflöde är:

**Exekutörer**

Exekutörer tar emot ingångsmeddelanden, utför sina tilldelade uppgifter och producerar sedan ett utgångsmeddelande. Detta driver arbetsflödet framåt mot att slutföra den större uppgiften. Exekutörer kan vara antingen AI-agent eller anpassad logik.

**Kanter**

Kanter används för att definiera flödet av meddelanden i ett arbetsflöde. Dessa kan vara:

*Direkta kanter* - Enkla en-till-en-anslutningar mellan exekutörer:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Villkorade kanter* - Aktiveras efter att ett visst villkor uppfyllts. Till exempel, när hotellrum inte är tillgängliga kan en exekutör föreslå andra alternativ.

*Switch-case kanter* - Dirigerar meddelanden till olika exekutörer baserat på definierade villkor. Till exempel om en reskund har prioriterad åtkomst och deras uppgifter hanteras via ett annat arbetsflöde.

*Fan-out kanter* - Skicka ett meddelande till flera mål.

*Fan-in kanter* - Samla flera meddelanden från olika exekutörer och skicka till ett mål.

**Händelser**

För att erbjuda bättre observabilitet i arbetsflöden erbjuder MAF inbyggda händelser för exekvering inklusive:

- `WorkflowStartedEvent`  - Arbetsflödesexekvering startar
- `WorkflowOutputEvent` - Arbetsflödet producerar en utdata
- `WorkflowErrorEvent` - Arbetsflödet stöter på ett fel
- `ExecutorInvokeEvent`  - Exekutör börjar bearbetning
- `ExecutorCompleteEvent`  -  Exekutör slutför bearbetning
- `RequestInfoEvent` - En förfrågan utfärdas

## Avancerade MAF-mönster

Sektionerna ovan täcker de centrala koncepten i Microsoft Agent Framework. När du bygger mer komplexa agenter, här är några avancerade mönster att överväga:

- **Middlewarekomposition**: Kedja ihop flera middlewarehanterare (loggning, autentisering, takbegränsning) med funktions- och chattmiddleware för finjusterad kontroll över agentens beteende.
- **Checkpointing i arbetsflöden**: Använd arbetsflödesevenemang och serialisering för att spara och återuppta långvariga agentprocesser.
- **Dynamiskt verktygsval**: Kombinera RAG över verktygsbeskrivningar med MAF:s verktygsregistrering för att presentera endast relevanta verktyg per förfrågan.
- **Överlämning mellan flera agenter**: Använd arbetsflödets kanter och villkorlig dirigering för att orkestrera överlämningar mellan specialiserade agenter.

## Kodexempel

Kodexempel för Microsoft Agent Framework finns i detta repository under filerna `xx-python-agent-framework` och `xx-dotnet-agent-framework`.

## Fler frågor om Microsoft Agent Framework?

Gå med i [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) för att möta andra elever, delta i kontorstimmar och få svar på dina frågor om AI-agenter.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, vänligen notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål ska betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår från användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->