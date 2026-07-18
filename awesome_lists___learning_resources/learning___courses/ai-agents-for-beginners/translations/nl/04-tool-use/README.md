[![Hoe Ontwerp je Goede AI Agents](../../../translated_images/nl/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

# Ontwerppatroon voor Hulpmiddelengebruik

Hulpmiddelen zijn interessant omdat ze AI-agenten in staat stellen een breder scala aan mogelijkheden te hebben. In plaats van dat de agent een beperkte set acties heeft die hij kan uitvoeren, kan de agent door een hulpmiddel toe te voegen nu een breed scala aan acties uitvoeren. In dit hoofdstuk bekijken we het Ontwerppatroon voor Hulpmiddelengebruik, dat beschrijft hoe AI-agenten specifieke hulpmiddelen kunnen gebruiken om hun doelen te bereiken.

## Introductie

In deze les proberen we de volgende vragen te beantwoorden:

- Wat is het ontwerppatroon voor hulpmiddelengebruik?
- Voor welke use cases kan het worden toegepast?
- Wat zijn de elementen/bouwstenen die nodig zijn om het ontwerppatroon te implementeren?
- Wat zijn de speciale overwegingen voor het gebruik van het Ontwerppatroon voor Hulpmiddelengebruik om betrouwbare AI-agenten te bouwen?

## Leerdoelen

Na het voltooien van deze les zul je in staat zijn om:

- Het Ontwerppatroon voor Hulpmiddelengebruik en het doel ervan te definiëren.
- Use cases te identificeren waar het Ontwerppatroon voor Hulpmiddelengebruik van toepassing is.
- De belangrijkste elementen te begrijpen die nodig zijn om het ontwerppatroon te implementeren.
- Overwegingen te herkennen om betrouwbaarheid te waarborgen in AI-agenten die dit ontwerppatroon gebruiken.

## Wat is het Ontwerppatroon voor Hulpmiddelengebruik?

Het **Ontwerppatroon voor Hulpmiddelengebruik** richt zich op het geven van LLM's de mogelijkheid om met externe hulpmiddelen te interacteren om specifieke doelen te bereiken. Hulpmiddelen zijn code die door een agent kunnen worden uitgevoerd om acties te verrichten. Een hulpmiddel kan een eenvoudige functie zijn zoals een rekenmachine, of een API-aanroep naar een externe dienst zoals het opzoeken van aandelenkoersen of weersvoorspellingen. In de context van AI-agenten zijn hulpmiddelen ontworpen om door agenten te worden uitgevoerd als reactie op **door modellen gegenereerde functietoepen**.

## Voor welke use cases kan het worden toegepast?

AI-agenten kunnen hulpmiddelen gebruiken om complexe taken te voltooien, informatie op te halen of beslissingen te nemen. Het ontwerppatroon voor hulpmiddelengebruik wordt vaak gebruikt in scenario's die dynamische interactie met externe systemen vereisen, zoals databases, webservices of code-interpreters. Deze mogelijkheid is nuttig voor verschillende use cases, waaronder:

- **Dynamische Informatieopvraging:** Agenten kunnen externe API's of databases queryen om actuele gegevens op te halen (bijv. een SQLite-database queryen voor data-analyse, het ophalen van aandelenkoersen of weerinformatie).
- **Code-uitvoering en -interpretatie:** Agenten kunnen code of scripts uitvoeren om wiskundige problemen op te lossen, rapporten te genereren of simulaties uit te voeren.
- **Automatisering van Workflows:** Herhalende of meervoudige stappen automatiseren door tools te integreren zoals taakplanners, e-maildiensten of datastromen.
- **Klantenondersteuning:** Agenten kunnen interageren met CRM-systemen, ticketplatforms of kennisbanken om gebruikersvragen op te lossen.
- **Contentgeneratie en -bewerking:** Agenten kunnen hulpmiddelen zoals grammaticacontroleurs, tekstsamenvatters of beoordelaars van contentveiligheid inzetten om te helpen bij contentcreatietaken.

## Welke elementen/bouwstenen zijn nodig om het ontwerppatroon voor hulpmiddelengebruik te implementeren?

Deze bouwstenen maken het mogelijk voor de AI-agent om een breed scala aan taken uit te voeren. Laten we kijken naar de belangrijkste elementen die nodig zijn om het Ontwerppatroon voor Hulpmiddelengebruik te implementeren:

- **Functie-/Hulpmiddelenschema's**: Gedetailleerde definities van beschikbare hulpmiddelen, inclusief functienaam, doel, benodigde parameters en verwachte outputs. Deze schema's stellen de LLM in staat te begrijpen welke hulpmiddelen beschikbaar zijn en hoe geldige verzoeken opgebouwd moeten worden.

- **Functie-UItvoeringslogica**: Bepaalt hoe en wanneer hulpmiddelen worden aangeroepen op basis van de intentie van de gebruiker en de gesprekcontext. Dit kan planner-modules, routeringsmechanismen of conditionele flows bevatten die het gebruik van hulpmiddelen dynamisch bepalen.

- **Berichtenafhandelingssysteem**: Componenten die de conversatiestroom beheren tussen gebruikersinvoer, LLM-responsen, hulpprogramma-aanroepen en hulpprogramma-uitvoer.

- **Hulpmiddelenintegratiekader**: Infrastructuur die de agent verbindt met verschillende hulpmiddelen, of het nu eenvoudige functies zijn of complexe externe diensten.

- **Foutafhandeling & Validatie**: Mechanismen om fouten bij het uitvoeren van hulpmiddelen af te handelen, parameters te valideren en onverwachte reacties te beheren.

- **Statusbeheer**: Volgt de gesprekcontext, eerdere interacties met hulpmiddelen en persistente data om consistentie over meerdere beurten heen te waarborgen.

Vervolgens gaan we dieper in op Functie-/Hulpmiddelenaanroepen.
 
### Functie-/Hulpmiddelenaanroepen

Functieaanroepen is de primaire manier waarmee we Large Language Models (LLM's) in staat stellen om met hulpmiddelen te interacteren. Je ziet vaak 'Functie' en 'Hulpmiddel' door elkaar gebruikt worden, omdat 'functies' (herbruikbare codeblokken) de 'hulpmiddelen' zijn die agenten gebruiken om taken uit te voeren. Om de code van een functie aan te roepen, moet een LLM het verzoek van de gebruiker afwegen tegen de functiebeschrijving. Hiervoor wordt een schema met de beschrijvingen van alle beschikbare functies naar de LLM gestuurd. De LLM selecteert vervolgens de meest geschikte functie voor de taak en retourneert de naam en argumenten ervan. De geselecteerde functie wordt uitgevoerd, het antwoord wordt teruggestuurd naar de LLM, die deze informatie gebruikt om te reageren op het verzoek van de gebruiker.

Voor ontwikkelaars die functieaanroepen voor agenten willen implementeren, heb je nodig:

1. Een LLM-model dat functieaanroepen ondersteunt
2. Een schema met functiebeschrijvingen
3. De code voor elke beschreven functie

Laten we het voorbeeld gebruiken van het verkrijgen van de huidige tijd in een stad om te illustreren:

1. **Initialiseer een LLM die functieaanroepen ondersteunt:**

    Niet alle modellen ondersteunen functieaanroepen, dus het is belangrijk te controleren of de LLM die je gebruikt dat doet.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> ondersteunt functieaanroepen. We kunnen beginnen met het initiëren van de OpenAI-client via de Azure OpenAI **Responses API** (de stabiele `/openai/v1/` endpoint — geen `api_version` nodig).

    ```python
    # Initialiseer de OpenAI-client voor Azure OpenAI (Responses API, v1 eindpunt)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Maak een Functieschema**:

    Vervolgens definiëren we een JSON-schema dat de functienaam, de beschrijving van wat de functie doet, en de namen en beschrijvingen van de functieparameters bevat.
    We nemen dit schema en geven het door aan de eerder gemaakte client, samen met het gebruikersverzoek om de tijd in San Francisco te vinden. Wat belangrijk is om te noteren, is dat een **hulpprogramma-aanroep** wordt geretourneerd, **niet** het uiteindelijke antwoord op de vraag. Zoals eerder vermeld geeft de LLM de naam van de functie terug die hij voor de taak heeft geselecteerd, en de argumenten die eraan worden doorgegeven.

    ```python
    # Functiebeschrijving voor het model om te lezen (Reacties API vlakke hulpmiddelindeling)
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
  
    # Initiële gebruikersboodschap
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Eerste API-aanroep: Vraag het model om de functie te gebruiken
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # De Responses API retourneert toolaanroepen als function_call-items in response.output.
    # Voeg ze toe aan het gesprek zodat het model volledige context heeft bij de volgende beurt.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **De functicode die nodig is om de taak uit te voeren:**

    Nu de LLM heeft gekozen welke functie uitgevoerd moet worden, moet de code die de taak uitvoert geïmplementeerd en uitgevoerd worden.
    We kunnen de code om de huidige tijd te krijgen in Python implementeren. We moeten ook code schrijven om de naam en argumenten uit het response_message te halen om het uiteindelijke resultaat te krijgen.

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
    # Verwerk functieverzoeken
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Geef het gereedschapsresultaat terug als een function_call_output-item
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Tweede API-aanroep: Verkrijg de definitieve reactie van het model
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

Functieaanroepen vormt het hart van de meeste, zo niet alle, agenthulpmiddelen-ontwerpen, hoewel het soms uitdagend kan zijn om het helemaal vanaf nul te implementeren.
Zoals we leerden in [Les 2](../../../02-explore-agentic-frameworks) bieden agentic frameworks ons kant-en-klare bouwstenen om hulpmiddelengebruik te implementeren.
 
## Voorbeelden van Hulpmiddelengebruik met Agentic Frameworks

Hier zijn enkele voorbeelden van hoe je het Ontwerppatroon voor Hulpmiddelengebruik kunt implementeren met verschillende agentic frameworks:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> is een open-source AI-framework voor het bouwen van AI-agenten. Het vereenvoudigt het gebruik van functieaanroepen door je in staat te stellen hulpmiddelen te definiëren als Python-functies met de `@tool` decorator. Het framework regelt de communicatie heen en weer tussen het model en je code. Het biedt ook toegang tot kant-en-klare hulpmiddelen zoals Bestandzoeken en Code-interpreter via `FoundryChatClient`.

Het volgende diagram illustreert het proces van functieaanroepen met het Microsoft Agent Framework:

![functieaanroepen](../../../translated_images/nl/functioncalling-diagram.a84006fc287f6014.webp)

In het Microsoft Agent Framework worden hulpmiddelen gedefinieerd als gedecoreerde functies. We kunnen de eerder bekeken `get_current_time` functie omzetten naar een hulpmiddel met behulp van de `@tool` decorator. Het framework zal automatisch de functie en de parameters serialiseren en het schema creëren om naar de LLM te sturen.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Maak de client aan
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Maak een agent aan en voer uit met het hulpmiddel
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> is een nieuwere agentic framework die is ontworpen om ontwikkelaars in staat te stellen veilig hoogwaardige, uitbreidbare AI-agenten te bouwen, te implementeren en op te schalen zonder de onderliggende compute- en opslagresources te hoeven beheren. Het is bijzonder nuttig voor zakelijke toepassingen doordat het een volledig beheerde service met security van enterprise niveau is.

In vergelijking met directe ontwikkeling met de LLM API biedt Microsoft Foundry Agent Service enkele voordelen, waaronder:

- Automatisch hulpmiddelen aanroepen – geen noodzaak om een hulpprogramma-aanroep te parseren, het hulpprogramma aan te roepen en het antwoord af te handelen; dit wordt nu server-side afgehandeld
- Veilig beheerde data – in plaats van je eigen gesprekstatus te beheren, kun je vertrouwen op threads om alle benodigde informatie te bewaren
- Kant-en-klare hulpmiddelen – Hulpmiddelen die je kunt gebruiken om interactie te hebben met je databronnen, zoals Bing, Azure AI Search, en Azure Functions.

De hulpmiddelen in Microsoft Foundry Agent Service kunnen worden onderverdeeld in twee categorieën:

1. Kennisgereedschappen:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Verankering met Bing Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Bestandzoeken</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Actiehulpmiddelen:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Functieaanroepen</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Code-interpreter</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI-gedefinieerde hulpmiddelen</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

De Agent Service stelt ons in staat deze hulpmiddelen samen als een `toolset` te gebruiken. Het maakt ook gebruik van `threads` die de geschiedenis van berichten uit een bepaald gesprek bijhouden.

Stel je voor dat je een verkoopagent bent bij een bedrijf genaamd Contoso. Je wilt een conversatieagent ontwikkelen die vragen over je verkoopgegevens kan beantwoorden.

De volgende afbeelding illustreert hoe je Microsoft Foundry Agent Service zou kunnen gebruiken om je verkoopgegevens te analyseren:

![Agentic Service In Actie](../../../translated_images/nl/agent-service-in-action.34fb465c9a84659e.webp)

Om een van deze hulpmiddelen met de service te gebruiken kunnen we een client maken en een hulpmiddel of toolset definiëren. Om dit praktisch te implementeren kunnen we de volgende Python-code gebruiken. De LLM kan naar de toolset kijken en beslissen of de gebruikersgemaakte functie `fetch_sales_data_using_sqlite_query` wordt gebruikt, of de kant-en-klare Code-interpreter, afhankelijk van het gebruikersverzoek.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query functie die te vinden is in een fetch_sales_data_functions.py bestand.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Initialiseer toolset
toolset = ToolSet()

# Initialiseer function calling agent met de fetch_sales_data_using_sqlite_query functie en voeg deze toe aan de toolset
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Initialiseer Code Interpreter-tool en voeg deze toe aan de toolset.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Wat zijn de speciale overwegingen bij het gebruik van het Ontwerppatroon voor Hulpmiddelengebruik om betrouwbare AI-agenten te bouwen?

Een veelvoorkomende zorg bij dynamisch door LLM's gegenereerde SQL is veiligheid, met name het risico op SQL injectie of kwaadaardige acties, zoals het verwijderen of manipuleren van de database. Hoewel deze zorgen terecht zijn, kunnen ze effectief worden verminderd door database-toegangsrechten correct te configureren. Voor de meeste databases houdt dit in dat de database als alleen-lezen wordt geconfigureerd. Voor databaseservices zoals PostgreSQL of Azure SQL moet de app een alleen-lezen (SELECT) rol krijgen toegewezen.

Het draaien van de app in een veilige omgeving verhoogt de bescherming verder. In bedrijfsscenario’s wordt data meestal geëxtraheerd en getransformeerd uit operationele systemen naar een alleen-lezen database of datawarehouse met een gebruiksvriendelijk schema. Deze aanpak zorgt ervoor dat de data veilig is, geoptimaliseerd voor prestaties en toegankelijkheid, en dat de app beperkte, alleen-lezen toegang heeft.

## Voorbeeldcodes

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Meer vragen over het Ontwerppatroon voor Hulpmiddelengebruik?

Neem deel aan de [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) om andere leerlingen te ontmoeten, office hours bij te wonen en je vragen over AI Agents beantwoord te krijgen.

## Aanvullende bronnen

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service Workshop</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Multi-Agent Workshop</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework Overzicht</a>


## Smoke-Testen van Deze Agent (Optioneel)

Nadat je hebt geleerd om agents te implementeren in [Les 16](../16-deploying-scalable-agents/README.md), kun je de `TravelToolAgent` van deze les smoke-testen (roept hij nog steeds zijn tools aan en antwoordt hij?) met [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Zie [`tests/README.md`](../tests/README.md) voor hoe je dit uitvoert.

## Vorige Les

[Begrijpen van Agentische Ontwerppatronen](../03-agentic-design-patterns/README.md)

## Volgende Les

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->