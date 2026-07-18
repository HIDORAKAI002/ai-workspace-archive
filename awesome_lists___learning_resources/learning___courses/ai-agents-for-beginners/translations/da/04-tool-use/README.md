[![Hvordan man designer gode AI-agenter](../../../translated_images/da/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Klik på billedet ovenfor for at se videoen af denne lektion)_

# Designmønster for brug af værktøjer

Værktøjer er interessante, fordi de giver AI-agenter en bredere række af kapaciteter. I stedet for at agenten kun har et begrænset sæt handlinger, den kan udføre, kan agenten nu ved at tilføje et værktøj udføre en bred vifte af handlinger. I dette kapitel vil vi se på designmønsteret for brug af værktøjer, som beskriver, hvordan AI-agenter kan bruge specifikke værktøjer til at opnå deres mål.

## Introduktion

I denne lektion søger vi at besvare følgende spørgsmål:

- Hvad er designmønsteret for brug af værktøjer?
- Hvad er anvendelsestilfælde, det kan anvendes på?
- Hvad er elementerne/opbygningsblokke, der er nødvendige for at implementere designmønsteret?
- Hvilke særlige overvejelser er der ved brug af designmønsteret for brug af værktøjer til at bygge troværdige AI-agenter?

## Læringsmål

Efter at have gennemført denne lektion vil du kunne:

- Definere designmønsteret for brug af værktøjer og dets formål.
- Identificere anvendelsestilfælde, hvor designmønsteret for brug af værktøjer er anvendeligt.
- Forstå de nøgleelementer, der er nødvendige for at implementere designmønsteret.
- Genkende overvejelser for at sikre troværdighed i AI-agenter, der bruger dette designmønster.

## Hvad er designmønsteret for brug af værktøjer?

**Designmønsteret for brug af værktøjer** fokuserer på at give LLM'er evnen til at interagere med eksterne værktøjer for at nå specifikke mål. Værktøjer er kode, der kan udføres af en agent for at foretage handlinger. Et værktøj kan være en simpel funktion som en lommeregner eller et API-opkald til en tredjepartstjeneste som aktiekursopsøgning eller vejrudsigt. I konteksten af AI-agenter er værktøjer designet til at blive udført af agenter som svar på **funktionsopkald genereret af modellen**.

## Hvad er anvendelsestilfældene, det kan anvendes på?

AI-agenter kan udnytte værktøjer til at fuldføre komplekse opgaver, hente oplysninger eller træffe beslutninger. Designmønsteret for brug af værktøjer anvendes ofte i scenarier, der kræver dynamisk interaktion med eksterne systemer som databaser, webservices eller kodefortolkere. Denne evne er nyttig til en række forskellige anvendelsestilfælde, herunder:

- **Dynamisk informationsindsamling:** Agenter kan forespørge eksterne API'er eller databaser for at hente opdaterede data (f.eks. forespørgsel til en SQLite-database for dataanalyse, hente aktiekurser eller vejrdata).
- **Kodeeksekvering og fortolkning:** Agenter kan køre kode eller scripts for at løse matematiske problemer, generere rapporter eller udføre simuleringer.
- **Automatisering af workflow:** Automatisering af gentagne eller flerstegs workflow ved integration af værktøjer som opgaveplanlæggere, e-mail-tjenester eller datapipelines.
- **Kundesupport:** Agenter kan interagere med CRM-systemer, billetsystemer eller vidensdatabaser for at løse brugerhenvendelser.
- **Indholdsgenerering og redigering:** Agenter kan bruge værktøjer som grammatikkontrol, tekstopsummering eller evaluering af indholdssikkerhed til at hjælpe med opgaver inden for indholdsskabelse.

## Hvad er elementerne/opbygningsblokkene, der er nødvendige for at implementere designmønsteret for brug af værktøjer?

Disse opbygningsblokke tillader AI-agenten at udføre en bred vifte af opgaver. Lad os se på nøgleelementerne, der er nødvendige for at implementere designmønsteret for brug af værktøjer:

- **Funktions-/værktøjsskemaer**: Detaljerede definitioner af tilgængelige værktøjer, inklusive funktionsnavn, formål, nødvendige parametre og forventede output. Disse skemaer gør det muligt for LLM at forstå, hvilke værktøjer der er tilgængelige, og hvordan man konstruerer gyldige anmodninger.

- **Logik for funktionsudførelse**: Styrer hvordan og hvornår værktøjer bliver kaldt baseret på brugerens hensigt og samtalekontekst. Dette kan inkludere planlægningsmoduler, rute-mekanismer eller betingede flows, der dynamisk bestemmer brugen af værktøjer.

- **Beskedhåndteringssystem**: Komponenter, der styrer den konverserende strøm mellem brugerinput, LLM-svar, værktøjskald og værktøjsoutput.

- **Værktøjsintegrationsrammeværk**: Infrastruktur, der forbinder agenten med forskellige værktøjer, uanset om de er simple funktioner eller komplekse eksterne tjenester.

- **Fejlhåndtering og validering**: Mekanismer til at håndtere fejl i værktøjsudførelse, validere parametre og håndtere uventede svar.

- **Statusstyring**: Holder styr på samtalekontekst, tidligere værktøjsinteraktioner og vedvarende data for at sikre konsistens på tværs af flere runder af interaktion.

Lad os nu se nærmere på funktions-/værktøjskald.
 
### Funktions-/værktøjskald

Funktionskald er den primære måde, vi gør det muligt for store sprogmodeller (LLM'er) at interagere med værktøjer på. Du vil ofte se 'funktion' og 'værktøj' brugt i flæng, fordi 'funktioner' (blokke af genbrugelig kode) er de 'værktøjer', agenter bruger til at udføre opgaver. For at en funktions kode kan blive kaldt, skal en LLM sammenligne brugerens anmodning med funktionens beskrivelse. For at gøre dette sendes et skema, der indeholder beskrivelser af alle tilgængelige funktioner, til LLM. Derefter vælger LLM den mest passende funktion til opgaven og returnerer dens navn og argumenter. Den valgte funktion kaldes, dens svar sendes tilbage til LLM, som bruger informationen til at svare på brugerens anmodning.

For udviklere, der vil implementere funktionskald for agenter, skal du bruge:

1. En LLM-model, der understøtter funktionskald
2. Et skema, der indeholder funktionsbeskrivelser
3. Koden til hver beskrevet funktion

Lad os bruge eksemplet med at få den aktuelle tid i en by til at illustrere:

1. **Initialiser en LLM, der understøtter funktionskald:**

    Ikke alle modeller understøtter funktionskald, så det er vigtigt at tjekke, at den LLM, du bruger, gør det.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> understøtter funktionskald. Vi kan starte med at initialisere OpenAI-klienten mod Azure OpenAI **Responses API** (det stabile `/openai/v1/` endpoint — ingen `api_version` nødvendig). 

    ```python
    # Initialiser OpenAI-klienten til Azure OpenAI (Responses API, v1-endpoint)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Opret et funktionsskema**:

    Dernæst definerer vi et JSON-skema, som indeholder funktionsnavn, beskrivelse af hvad funktionen gør, og navnene og beskrivelserne af funktionsparametrene.
    Vi sender så dette skema til klienten, der tidligere blev oprettet sammen med brugerens anmodning om at finde tiden i San Francisco. Det, der er vigtigt at bemærke, er, at et **værktøjskald** er det, der returneres, **ikke** det endelige svar på spørgsmålet. Som nævnt tidligere returnerer LLM navnet på den funktion, den valgte til opgaven, og argumenterne, der skal videregives til den.

    ```python
    # Funktionsbeskrivelse for modellen at læse (Responses API fladt værktøjsformat)
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
  
    # Initial brugerbesked
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Første API-kald: Bed modellen om at bruge funktionen
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API returnerer værktøjskald som function_call elementer i response.output.
    # Tilføj dem til samtalen, så modellen har fuld kontekst ved næste runde.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Den funktionskode, der skal udføre opgaven:**

    Nu, hvor LLM har valgt hvilken funktion, der skal køres, skal koden, der udfører opgaven, implementeres og eksekveres.
    Vi kan implementere koden til at hente den aktuelle tid i Python. Vi skal også skrive koden for at udtrække navnet og argumenterne fra response_message for at få det endelige resultat.

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
    # Håndter funktionskald
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Returner værktøjets resultat som et function_call_output-element
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Andet API-kald: Hent det endelige svar fra modellen
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

Funktionskald er kernen i de fleste, hvis ikke alle, designmønstre for brug af værktøjer til agenter, men det kan nogle gange være udfordrende at implementere fra bunden.
Som vi lærte i [Lektion 2](../../../02-explore-agentic-frameworks) giver agentiske rammer os færdigbyggede byggeklodser til at implementere brug af værktøjer.
 
## Eksempler på brug af værktøjer med agentiske rammer

Her er nogle eksempler på, hvordan du kan implementere designmønsteret for brug af værktøjer ved hjælp af forskellige agentiske rammer:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> er en open source AI-ramme til at bygge AI-agenter. Den forenkler processen med funktionskald ved at lade dig definere værktøjer som Python-funktioner med `@tool`-dekorationen. Rammen håndterer kommunikationen frem og tilbage mellem modellen og din kode. Den giver også adgang til færdigbyggede værktøjer som Fil-søgning og Kodefortolker via `FoundryChatClient`.

Følgende diagram illustrerer processen med funktionskald i Microsoft Agent Framework:

![funktionskald](../../../translated_images/da/functioncalling-diagram.a84006fc287f6014.webp)

I Microsoft Agent Framework defineres værktøjer som dekorerede funktioner. Vi kan konvertere den `get_current_time` funktion, vi så tidligere, til et værktøj ved at bruge `@tool` dekoratøren. Rammen vil automatisk serialisere funktionen og dens parametre og skabe skemaet, der sendes til LLM.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Opret klienten
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Opret en agent og kør med værktøjet
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> er en nyere agentisk ramme, designet til at give udviklere mulighed for sikkert at bygge, udrulle og skalere AI-agenter af høj kvalitet og med mulighed for udvidelse uden at skulle håndtere de underliggende compute- og lagerressourcer. Det er særligt nyttigt til virksomhedsapplikationer, da det er en fuldt administreret service med sikkerhed på virksomhedsniveau.

Sammenlignet med at udvikle direkte med LLM API'en tilbyder Microsoft Foundry Agent Service nogle fordele, herunder:

- Automatisk værktøjskald – ingen behov for at analysere et værktøjskald, kalde værktøjet og håndtere svaret; alt dette sker nu server-side
- Sikkert administrerede data – i stedet for at håndtere din egen samtalestatus kan du stole på threads til at lagre alle de oplysninger, du har brug for
- Værktøjer klar til brug – værktøjer, som du kan bruge til at interagere med dine datakilder, såsom Bing, Azure AI Search og Azure Functions.

Værktøjerne tilgængelige i Microsoft Foundry Agent Service kan opdeles i to kategorier:

1. Videnværktøjer:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Grounding med Bing Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Fil-søgning</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Handlingsværktøjer:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Funktionskald</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Kodefortolker</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI-definerede værktøjer</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Agent Servicen giver os mulighed for at kunne bruge disse værktøjer samlet som et `toolset`. Den bruger også `threads`, som holder styr på beskedhistorikken fra en bestemt samtale.

Forestil dig, at du er salgsagent i et firma kaldet Contoso. Du vil udvikle en samtaleagent, der kan besvare spørgsmål om dine salgsdata.

Følgende billede illustrerer, hvordan du kunne bruge Microsoft Foundry Agent Service til at analysere dine salgsdata:

![Agent Service i aktion](../../../translated_images/da/agent-service-in-action.34fb465c9a84659e.webp)

For at bruge nogle af disse værktøjer med servicen kan vi oprette en klient og definere et værktøj eller toolset. For at implementere dette praktisk kan vi bruge følgende Python-kode. LLM vil kunne se på toolsettet og beslutte, om den vil bruge den brugerdefinerede funktion, `fetch_sales_data_using_sqlite_query`, eller den færdigbyggede Kodefortolker afhængigt af brugerens anmodning.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query funktion som kan findes i filen fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Initialiser værktøjssæt
toolset = ToolSet()

# Initialiser funktion kaldende agent med funktionen fetch_sales_data_using_sqlite_query og tilføj den til værktøjssættet
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Initialiser kodefortolker værktøj og tilføj det til værktøjssættet.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Hvilke særlige overvejelser er der ved brug af designmønsteret for brug af værktøjer til at bygge troværdige AI-agenter?

En almindelig bekymring ved dynamisk genereret SQL fra LLM'er er sikkerhed, især risikoen for SQL-injektion eller skadelig handling som at slette eller manipulere databasen. Selvom disse bekymringer er legitime, kan de effektivt afbødes ved korrekt konfiguration af databaseadgangstilladelser. For de fleste databaser indebærer dette at konfigurere databasen som skrivebeskyttet. For database services som PostgreSQL eller Azure SQL bør appen tildeles en skrivebeskyttet (SELECT) rolle.

At køre appen i et sikkert miljø øger beskyttelsen yderligere. I virksomhedsscenarier ekstraheres og transformeres data typisk fra operationelle systemer til en skrivebeskyttet database eller datalager med et brugervenligt skema. Denne tilgang sikrer, at data er sikre, optimeret til ydeevne og tilgængelighed, og at appen har begrænset, skrivebeskyttet adgang.

## Eksempelkoder

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Har du flere spørgsmål om designmønstre for brug af værktøjer?

Deltag i [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) for at møde andre lærende, deltage i kontortimer og få svar på dine spørgsmål om AI-agenter.

## Yderligere ressourcer

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service Workshop</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Multi-Agent Workshop</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework Oversigt</a>


## Røgtest af denne Agent (valgfrit)

Efter du har lært at implementere agenter i [Lesson 16](../16-deploying-scalable-agents/README.md), kan du røgteste denne lektions `TravelToolAgent` (kalder den stadig sine værktøjer og svarer?) med [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Se [`tests/README.md`](../tests/README.md) for hvordan du kører den.

## Forrige lektion

[Forståelse af agentiske designmønstre](../03-agentic-design-patterns/README.md)

## Næste lektion

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->