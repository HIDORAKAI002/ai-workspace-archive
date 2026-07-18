[![Hur man designar bra AI-agenter](../../../translated_images/sv/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Klicka på bilden ovan för att se videon till denna lektion)_

# Designmönster för verktygsanvändning

Verktyg är intressanta eftersom de ger AI-agenter en bredare uppsättning förmågor. Istället för att agenten bara har en begränsad uppsättning åtgärder den kan utföra, kan agenten genom att lägga till ett verktyg nu utföra en mängd olika handlingar. I detta kapitel ska vi titta på designmönstret för verktygsanvändning, som beskriver hur AI-agenter kan använda specifika verktyg för att uppnå sina mål.

## Introduktion

I denna lektion ska vi försöka besvara följande frågor:

- Vad är designmönstret för verktygsanvändning?
- Vilka användningsfall kan det tillämpas på?
- Vilka element/byggstenar behövs för att implementera designmönstret?
- Vilka speciella överväganden finns vid användningen av designmönstret för verktygsanvändning för att bygga pålitliga AI-agenter?

## Lärandemål

Efter att ha genomfört denna lektion kommer du att kunna:

- Definiera designmönstret för verktygsanvändning och dess syfte.
- Identifiera användningsfall där designmönstret för verktygsanvändning är tillämpligt.
- Förstå de viktigaste elementen som behövs för att implementera designmönstret.
- Känna igen överväganden för att säkerställa pålitlighet i AI-agenter som använder detta designmönster.

## Vad är designmönstret för verktygsanvändning?

**Designmönstret för verktygsanvändning** fokuserar på att ge LLM:er möjlighet att interagera med externa verktyg för att uppnå specifika mål. Verktyg är kod som kan köras av en agent för att utföra handlingar. Ett verktyg kan vara en enkel funktion som en räknare eller ett API-anrop till en tredjepartstjänst som aktiekurs-uppslagning eller väderprognos. I AI-agenters sammanhang är verktyg designade för att exekveras av agenter som svar på **modellgenererade funktionsanrop**.

## Vilka användningsfall kan det tillämpas på?

AI-agenter kan använda verktyg för att slutföra komplexa uppgifter, hämta information eller fatta beslut. Designmönstret för verktygsanvändning används ofta i scenarier som kräver dynamisk interaktion med externa system, såsom databaser, webbservrar eller kodtolkare. Denna förmåga är användbar för flera olika användningsområden, inklusive:

- **Dynamisk informationshämtning:** Agenter kan fråga externa API:er eller databaser för att hämta uppdaterad data (t.ex. fråga en SQLite-databas för dataanalys, hämta aktiekurser eller väderinformation).
- **Kodkörning och tolkning:** Agenter kan köra kod eller skript för att lösa matematiska problem, generera rapporter eller utföra simuleringar.
- **Automatisering av arbetsflöden:** Automatisering av repetitiva eller flerstegsarbetsflöden genom att integrera verktyg som uppgiftsschemaläggare, e-posttjänster eller datapipelines.
- **Kundsupport:** Agenter kan interagera med CRM-system, biljettplattformar eller kunskapsbaser för att lösa användarfrågor.
- **Innehållsgenerering och redigering:** Agenter kan använda verktyg som grammatikkontroller, textextraktorer eller utvärderare av innehållssäkerhet för att hjälpa till med innehållsskapande.

## Vilka element/byggstenar behövs för att implementera designmönstret för verktygsanvändning?

Dessa byggstenar tillåter AI-agenten att utföra en mängd olika uppgifter. Låt oss titta på de viktigaste elementen som behövs för att implementera designmönstret för verktygsanvändning:

- **Funktions-/Verktygsscheman**: Detaljerade definitioner av tillgängliga verktyg, inklusive funktionsnamn, syfte, nödvändiga parametrar och förväntade utdata. Dessa scheman gör att LLM:n förstår vilka verktyg som finns och hur man konstruerar giltiga förfrågningar.

- **Funktionskörningslogik**: Styr hur och när verktyg anropas baserat på användarens avsikt och konversationskontext. Detta kan inkludera planeringsmoduler, dirigeringsmekanismer eller villkorsstyrda flöden som bestämmer verktygsanvändningen dynamiskt.

- **Meddelandehanteringssystem**: Komponenter som hanterar konversationsflödet mellan användarinput, LLM-svar, verktygsanrop och verktygsutdata.

- **Verktygsintegrationsramverk**: Infrastruktur som kopplar agenten till olika verktyg, oavsett om det är enkla funktioner eller komplexa externa tjänster.

- **Felhändtering och validering**: Mekanismer för att hantera fel i verktygskörning, validera parametrar och hantera oväntade svar.

- **Tillståndshantering**: Spårar konversationskontext, tidigare verktygsinteraktioner och persistenta data för att säkerställa konsistens över flera samtal.

Nästa ska vi titta närmare på funktion-/verktygsanrop.
 
### Funktion-/Verktygsanrop

Funktionsanrop är huvudsättet vi låter stora språkmodeller (LLM:er) interagera med verktyg. Du kommer ofta att se 'funktion' och 'verktyg' använda synonymt eftersom 'funktioner' (block av återanvändbar kod) är de 'verktyg' som agenter använder för att utföra uppgifter. För att ett funktionskod ska kunna anropas måste en LLM jämföra användarens begäran med funktionsbeskrivningen. För detta skickas ett schema som innehåller beskrivningar av alla tillgängliga funktioner till LLM:n. LLM väljer sedan den mest lämpliga funktionen för uppgiften och returnerar dess namn och argument. Den valda funktionen anropas, dess svar skickas tillbaka till LLM, som använder informationen för att svara på användarens begäran.

För utvecklare som vill implementera funktionsanrop för agenter behövs:

1. En LLM-modell som stödjer funktionsanrop
2. Ett schema som innehåller funktionsbeskrivningar
3. Koden för varje beskriven funktion

Låt oss illustrera med exemplet att hämta aktuell tid i en stad:

1. **Initiera en LLM som stödjer funktionsanrop:**

    Inte alla modeller stödjer funktionsanrop, så det är viktigt att kontrollera att den LLM du använder gör det.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> stödjer funktionsanrop. Vi kan börja med att initiera OpenAI-klienten mot Azure OpenAI **Responses API** (det stabila `/openai/v1/`-endpoint — ingen `api_version` behövs). 

    ```python
    # Initiera OpenAI-klienten för Azure OpenAI (Responses API, v1-endpunkt)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Skapa ett Funktionsschema**:

    Nästa steg är att definiera ett JSON-schema som innehåller funktionsnamnet, beskrivning av vad funktionen gör, samt namn och beskrivningar av funktionsparametrarna.
    Vi skickar sedan detta schema till klienten som skapades tidigare, tillsammans med användarens fråga att ta reda på tiden i San Francisco. Det viktiga att notera är att ett **verktygsanrop** är vad som returneras, **inte** det slutgiltiga svaret på frågan. Som nämnts tidigare returnerar LLM:en namnet på funktionen som valdes för uppgiften och argumenten som ska skickas till den.

    ```python
    # Funktionsbeskrivning för modellen att läsa (Responses API platt verktygsformat)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # Initialt användarmeddelande
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Första API-anropet: Be modellen använda funktionen
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API returnerar verktygsanrop som function_call-objekt i response.output.
    # Lägg till dem i konversationen så att modellen har fullständig kontext vid nästa vändning.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Den kod som behövs för att utföra uppgiften:**

    Nu när LLM har valt vilken funktion som måste köras, behöver koden som utför uppgiften implementeras och exekveras.
    Vi kan implementera koden för att hämta aktuell tid i Python. Vi behöver också skriva kod för att extrahera namnet och argumenten från response_message för att få slutresultatet.

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # Hantera funktionsanrop
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Returnera verktygets resultat som ett function_call_output-objekt
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Andra API-anrop: Hämta det slutgiltiga svaret från modellen
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

Funktionsanrop är kärnan i de flesta, om inte alla, design för agenters verktygsanvändning, men att implementera det från grunden kan ibland vara utmanande.
Som vi lärde oss i [Lektion 2](../../../02-explore-agentic-frameworks) ger agentramverk oss färdiga byggstenar för att implementera verktygsanvändning.
 
## Exempel på verktygsanvändning med agentramverk

Här är några exempel på hur du kan implementera designmönstret för verktygsanvändning med olika agentramverk:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> är ett öppet AI-ramverk för att bygga AI-agenter. Det förenklar processen med funktionsanrop genom att tillåta dig definiera verktyg som Python-funktioner med `@tool`-dekoreraren. Ramverket hanterar kommunikationen fram och tillbaka mellan modellen och din kod. Det ger också tillgång till förbyggda verktyg som Fillmarksökning och Kodtolkare genom `FoundryChatClient`.

Följande diagram illustrerar processen för funktionsanrop med Microsoft Agent Framework:

![funktionsanrop](../../../translated_images/sv/functioncalling-diagram.a84006fc287f6014.webp)

I Microsoft Agent Framework definieras verktyg som dekorerade funktioner. Vi kan omvandla funktionen `get_current_time` som vi såg tidigare till ett verktyg genom att använda `@tool`-dekoreraren. Ramverket serialiserar automatiskt funktionen och dess parametrar och skapar schemat som skickas till LLM:n.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Skapa klienten
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Skapa en agent och kör med verktyget
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> är ett nyare agentramverk som är utformat för att ge utvecklare möjlighet att säkert bygga, distribuera och skala högkvalitativa och utbyggbara AI-agenter utan att behöva hantera underliggande beräknings- och lagringsresurser. Det är särskilt användbart för företagsapplikationer eftersom det är en helt hanterad tjänst med säkerhet på företagsnivå.

Jämfört med att utveckla med LLM API:et direkt erbjuder Microsoft Foundry Agent Service flera fördelar, inklusive:

- Automatiskt verktygsanrop – inget behov av att tolka ett verktygsanrop, anropa verktyget och hantera svaret; allt detta görs nu serverbaserat
- Säkert hanterade data – istället för att hantera ditt eget konversationstillstånd kan du förlita dig på trådar för att lagra all information du behöver
- Färdiga verktyg – Verktyg du kan använda för att interagera med dina datakällor, såsom Bing, Azure AI Search och Azure Functions.

Verktygen som finns tillgängliga i Microsoft Foundry Agent Service kan delas in i två kategorier:

1. Kunskapsverktyg:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Grundläggande med Bing Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Fillmarksökning</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Åtgärdsverktyg:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Funktionsanrop</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Kodtolkare</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">Verktyg definierade med OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Agenttjänsten gör det möjligt att använda dessa verktyg tillsammans som en `verktygssats`. Den använder också `trådar` som håller koll på historiken av meddelanden från en särskild konversation.

Föreställ dig att du är en säljagent på ett företag som heter Contoso. Du vill utveckla en samtalsagent som kan svara på frågor om din försäljningsdata.

Följande bild illustrerar hur du kan använda Microsoft Foundry Agent Service för att analysera din försäljningsdata:

![Agenttjänsten i funktion](../../../translated_images/sv/agent-service-in-action.34fb465c9a84659e.webp)

För att använda något av dessa verktyg med tjänsten kan vi skapa en klient och definiera ett verktyg eller en verktygssats. För att implementera detta praktiskt kan vi använda följande Python-kod. LLM:n kommer att kunna titta på verktygssatsen och avgöra om den ska använda den användarskapade funktionen `fetch_sales_data_using_sqlite_query`, eller den förbyggda Kodtolkaren beroende på användarens förfrågan.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query-funktionen som finns i en fil som heter fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Initiera verktygssats
toolset = ToolSet()

# Initiera funktionsanropsagent med funktionen fetch_sales_data_using_sqlite_query och lägga till den i verktygssatsen
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Initiera Code Interpreter-verktyget och lägga till det i verktygssatsen.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Vilka speciella överväganden finns vid användning av designmönstret för verktygsanvändning för att bygga pålitliga AI-agenter?

En vanlig oro med SQL som genereras dynamiskt av LLM:er är säkerhet, särskilt risken för SQL-injektion eller skadliga handlingar, som att ta bort eller manipulera databasen. Även om dessa farhågor är giltiga kan de effektivt hanteras genom att korrekt konfigurera databasens åtkomstbehörigheter. För de flesta databaser innebär detta att konfigurera databasen som skrivskyddad. För databastjänster som PostgreSQL eller Azure SQL bör appen tilldelas en skrivskyddad (SELECT) roll.

Att köra appen i en säker miljö stärker dessutom skyddet. I företagsmiljöer extraheras och transformeras data vanligtvis från operativa system till en skrivskyddad databas eller datalager med ett användarvänligt schema. Detta tillvägagångssätt säkerställer att data är säker, optimerad för prestanda och tillgänglighet, och att appen har begränsad, skrivskyddad åtkomst.

## Exempelkod

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Har du fler frågor om designmönster för verktygsanvändning?

Gå med i [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) för att träffa andra lärande, delta i öppna kontorstider och få svar på dina frågor om AI-agenter.

## Ytterligare resurser

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Workshop för Azure AI Agents Service</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Multi-Agent Workshop</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Översikt Microsoft Agent Framework</a>


## Rök-testning av denna agent (valfritt)

Efter att du har lärt dig att distribuera agenter i [Lektion 16](../16-deploying-scalable-agents/README.md) kan du rök-testa denna lektions `TravelToolAgent` (kallar den fortfarande på sina verktyg och svarar?) med [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Se [`tests/README.md`](../tests/README.md) för hur man kör den.

## Föregående lektion

[Förstå agentiska designmönster](../03-agentic-design-patterns/README.md)

## Nästa lektion

[Agentisk RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->