[![Hvordan designe gode AI-agenter](../../../translated_images/no/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Klikk på bildet over for å se videoen til denne leksjonen)_

# Designmønster for verktøybruk

Verktøy er interessante fordi de gir AI-agenter et bredere spekter av muligheter. I stedet for at agenten har et begrenset sett av handlinger den kan utføre, kan agenten nå utføre et bredt spekter av handlinger ved å legge til et verktøy. I dette kapitlet skal vi se på Designmønsteret for verktøybruk, som beskriver hvordan AI-agenter kan bruke spesifikke verktøy for å oppnå sine mål.

## Introduksjon

I denne leksjonen ønsker vi å besvare følgende spørsmål:

- Hva er designmønsteret for verktøybruk?
- Hvilke bruksområder kan det brukes til?
- Hva er elementene/byggeblokkene som trengs for å implementere designmønsteret?
- Hvilke spesielle hensyn må tas når man bruker Designmønsteret for verktøybruk for å bygge pålitelige AI-agenter?

## Læringsmål

Etter å ha fullført denne leksjonen vil du kunne:

- Definere Designmønsteret for verktøybruk og dets formål.
- Identifisere bruksområder hvor Designmønsteret for verktøybruk er anvendelig.
- Forstå de viktige elementene som trengs for å implementere designmønsteret.
- Gjenkjenne hensyn for å sikre pålitelighet i AI-agenter som bruker dette designmønsteret.

## Hva er Designmønsteret for verktøybruk?

**Designmønsteret for verktøybruk** fokuserer på å gi LLM-er muligheten til å samhandle med eksterne verktøy for å oppnå spesifikke mål. Verktøy er kode som kan utføres av en agent for å utføre handlinger. Et verktøy kan være en enkel funksjon som en kalkulator, eller et API-kall til en tredjepartstjeneste som aksjekursoppslag eller værmelding. I sammenheng med AI-agenter er verktøy designet for å bli kjørt av agenter som svar på **modellgenererte funksjonskall**.

## Hvilke bruksområder kan det brukes til?

AI-agenter kan bruke verktøy til å fullføre komplekse oppgaver, hente informasjon eller ta beslutninger. Designmønsteret for verktøybruk brukes ofte i scenarier som krever dynamisk interaksjon med eksterne systemer, som databaser, nettjenester eller kodefortolkere. Denne evnen er nyttig for en rekke forskjellige bruksområder, inkludert:

- **Dynamisk informasjonsinnhenting:** Agenter kan spørre eksterne API-er eller databaser for å hente oppdatert data (f.eks. forespørsel i en SQLite-database for dataanalyse, hente aksjekurser eller værinformasjon).
- **Kodekjøring og -tolkning:** Agenter kan kjøre kode eller skript for å løse matematiske problemer, generere rapporter eller utføre simuleringer.
- **Automatisering av arbeidsflyt:** Automatisere repetitive eller flerstegs arbeidsflyter ved å integrere verktøy som oppgaveplanleggere, e-posttjenester eller datapipelines.
- **Kundesupport:** Agenter kan samhandle med CRM-systemer, billettplattformer eller kunnskapsbaser for å løse brukerhenvendelser.
- **Innholdsgenerering og redigering:** Agenter kan bruke verktøy som grammatikkontroll, tekstoppsummering eller verktøy for innholdssikkerhet for å hjelpe med innholdsproduksjon.

## Hva er elementene/byggeblokkene som trengs for å implementere designmønsteret for verktøybruk?

Disse byggeblokkene gjør det mulig for AI-agenten å utføre et bredt spekter av oppgaver. La oss se på de viktigste elementene som trengs for å implementere Designmønsteret for verktøybruk:

- **Funksjon-/verktøyskjemaer**: Detaljerte definisjoner av tilgjengelige verktøy, inkludert funksjonsnavn, formål, nødvendige parametere og forventede utdata. Disse skjemaene gjør at LLM kan forstå hvilke verktøy som er tilgjengelige og hvordan man konstruerer gyldige forespørsler.

- **Logikk for funksjonsutførelse**: Styrer hvordan og når verktøy blir kalt basert på brukerens hensikt og samtalekontekst. Dette kan inkludere planleggingsmoduler, rutingsmekanismer eller betingede flyter som dynamisk bestemmer verktøybruk.

- **Meldingshåndteringssystem**: Komponenter som håndterer samtaleflyten mellom brukerinput, LLM-svar, verktøyskall og verktøyutdata.

- **Verktøyintegrasjonsrammeverk**: Infrastruktur som kobler agenten til ulike verktøy, enten de er enkle funksjoner eller komplekse eksterne tjenester.

- **Feilhåndtering og validering**: Mekanismer for å håndtere feil i verktøyutførelsen, validere parametere og håndtere uventede svar.

- **Statushåndtering**: Sporer samtalekontekst, tidligere verktøyinteraksjoner og vedvarende data for å sikre konsistens over flere samtalerunder.

Neste skal vi se nærmere på funksjons-/verktøyskall.
 
### Funksjons-/verktøyskall

Funksjonskall er hovedmåten vi gjør det mulig for store språkmodeller (LLM-er) å samhandle med verktøy på. Du vil ofte se at 'Funksjon' og 'Verktøy' brukes om hverandre fordi 'funksjoner' (blokker med gjenbrukbar kode) er 'verktøyene' agenter bruker for å utføre oppgaver. For at en funksjons kode skal kunne kjøres, må en LLM sammenligne brukerens forespørsel mot funksjonens beskrivelse. For å gjøre dette sendes et skjema som inneholder beskrivelser av alle tilgjengelige funksjoner til LLM-en. LLM-en velger deretter den mest passende funksjonen for oppgaven og returnerer navnet og argumentene. Den valgte funksjonen kalles, svaret sendes tilbake til LLM, som bruker informasjonen for å svare på brukerens forespørsel.

For utviklere som skal implementere funksjonskall for agenter, trenger man:

1. En LLM-modell som støtter funksjonskall
2. Et skjema som inneholder funksjonsbeskrivelser
3. Koden for hver av de beskrevne funksjonene

La oss bruke eksempelet med å hente gjeldende tid i en by for å illustrere:

1. **Initialiser en LLM som støtter funksjonskall:**

    Ikke alle modeller støtter funksjonskall, så det er viktig å sjekke at LLM-en du bruker gjør det.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> støtter funksjonskall. Vi kan starte med å initiere OpenAI-klienten mot Azure OpenAI **Responses API** (den stabile `/openai/v1/` endepunktet — ingen `api_version` nødvendig).

    ```python
    # Initialiser OpenAI-klienten for Azure OpenAI (Responses API, v1-endepunkt)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Lag et funksjonsskjema**:

    Deretter definerer vi et JSON-skjema som inneholder funksjonsnavn, beskrivelse av hva funksjonen gjør, og navn og beskrivelser av funksjonsparametrene.
    Vi sender så dette skjemaet til klienten vi opprettet tidligere, sammen med brukerens forespørsel om å finne tiden i San Francisco. Det viktige å merke seg er at et **verktøyskall** er det som returneres, **ikke** det endelige svaret på spørsmålet. Som nevnt tidligere returnerer LLM navnet på funksjonen den valgte for oppgaven, og argumentene som skal sendes til den.

    ```python
    # Funksjonsbeskrivelse for modellen å lese (Responses API flat verktøyformat)
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
  
    # Innledende brukermelding
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Første API-kall: Be modellen om å bruke funksjonen
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API returnerer verktøysanrop som function_call-elementer i response.output.
    # Legg dem til i samtalen slik at modellen har full kontekst i neste runde.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Funksjonskoden som kreves for å utføre oppgaven:**

    Nå som LLM har valgt hvilken funksjon som må kjøres, må koden som utfører oppgaven implementeres og kjøres.
    Vi kan implementere koden for å hente gjeldende tid i Python. Vi må også skrive koden for å hente navnet og argumentene fra response_message for å få det endelige resultatet.

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
    # Håndter funksjonskall
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Returner verktøyresultatet som et function_call_output-element
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Andre API-kall: Hent det endelige svaret fra modellen
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

Funksjonskall er kjernen i de fleste, om ikke alle, design for agentverktøybruk, men det kan noen ganger være utfordrende å implementere det fra bunnen av.
Som vi lærte i [Leksjon 2](../../../02-explore-agentic-frameworks) gir agentrammeverk oss forhåndsbygde byggeblokker for å implementere verktøybruk.
 
## Eksempler på verktøybruk med agentrammeverk

Her er noen eksempler på hvordan du kan implementere Designmønsteret for verktøybruk ved hjelp av forskjellige agentrammeverk:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> er et open-source AI-rammeverk for å bygge AI-agenter. Det forenkler prosessen med å bruke funksjonskall ved å la deg definere verktøy som Python-funksjoner med `@tool` dekoratøren. Rammeverket håndterer kommunikasjonen frem og tilbake mellom modellen og koden din. Det gir også tilgang til forhåndsbygde verktøy som Fil-søk og Kodefortolker via `FoundryChatClient`.

Følgende diagram illustrerer prosessen for funksjonskall med Microsoft Agent Framework:

![funktion calling](../../../translated_images/no/functioncalling-diagram.a84006fc287f6014.webp)

I Microsoft Agent Framework defineres verktøy som dekorerte funksjoner. Vi kan konvertere funksjonen `get_current_time` som vi så tidligere til et verktøy ved å bruke `@tool` dekoratøren. Rammeverket vil automatisk serialisere funksjonen og dens parametere, og opprette skjemaet som sendes til LLM.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Opprett klienten
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Opprett en agent og kjør med verktøyet
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> er et nyere agentrammeverk som er designet for å gi utviklere muligheten til å sikkert bygge, distribuere og skalere høykvalitets og utvidbare AI-agenter uten å måtte håndtere underliggende ressurser for databehandling og lagring. Det er spesielt nyttig for bedriftsapplikasjoner siden det er en fullt administrert tjeneste med bedriftsnivå sikkerhet.

Sammenlignet med å utvikle direkte med LLM API, gir Microsoft Foundry Agent Service noen fordeler, blant annet:

- Automatisk verktøyskall – ingen behov for å analysere et verktøyskall, kalle verktøyet og håndtere svaret; alt dette gjøres nå serverside
- Sikkert administrerte data – i stedet for å styre din egen samtalestatus, kan du stole på threads for å lagre all informasjon du trenger
- Ferdige verktøy – verktøy du kan bruke for å samhandle med datakilder som Bing, Azure AI Search og Azure Functions.

Verktøyene som er tilgjengelige i Microsoft Foundry Agent Service kan deles inn i to kategorier:

1. Kunnskapsverktøy:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Forankring med Bing Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Fil-søk</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Aksjonsverktøy:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Funksjonskall</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Kodefortolker</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI-definerte verktøy</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Agenttjenesten lar oss bruke disse verktøyene sammen som et `toolset`. Den bruker også `threads` som holder oversikt over meldingshistorikken fra en bestemt samtale.

Forestill deg at du er en salgagent i et selskap som heter Contoso. Du vil utvikle en samtaleagent som kan svare på spørsmål om salgstallene dine.

Følgende bilde illustrerer hvordan du kan bruke Microsoft Foundry Agent Service til å analysere salgstallene dine:

![Agenttjeneste i aksjon](../../../translated_images/no/agent-service-in-action.34fb465c9a84659e.webp)

For å bruke noen av disse verktøyene med tjenesten kan vi opprette en klient og definere et verktøy eller verktøysett. Praktisk implementering kan gjøres ved hjelp av følgende Python-kode. LLM-en vil kunne se på verktøysettet og bestemme seg for om den skal bruke brukeropprettet funksjon, `fetch_sales_data_using_sqlite_query`, eller forhåndsbygde Kodefortolker, avhengig av brukerens forespørsel.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query-funksjon som kan finnes i en fil som heter fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Initialiser verktøyssett
toolset = ToolSet()

# Initialiser funksjonsanropsagent med fetch_sales_data_using_sqlite_query-funksjonen og legg den til i verktøyssettet
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Initialiser kodefortolkerverktøy og legg det til i verktøyssettet.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Hva er de spesielle hensynene ved bruk av Designmønsteret for verktøybruk for å bygge pålitelige AI-agenter?

En vanlig bekymring med SQL som genereres dynamisk av LLM-er er sikkerhet, spesielt risikoen for SQL-injeksjon eller skadelige handlinger, som å slette eller tukle med databasen. Selv om disse bekymringene er gyldige, kan de effektivt avbøtes ved riktig konfigurasjon av databasetilgangstillatelser. For de fleste databaser innebærer dette å konfigurere databasen som skrivebeskyttet. For databaseservicer som PostgreSQL eller Azure SQL bør appen tildeles en lese- (SELECT) rolle.

Å kjøre appen i et sikkert miljø forbedrer også beskyttelsen ytterligere. I bedriftsmiljøer blir data vanligvis hentet og transformert fra operative systemer til en skrivebeskyttet database eller datalager med et brukervennlig skjema. Denne tilnærmingen sikrer at dataene er sikre, optimalisert for ytelse og tilgjengelighet, og at appen har begrenset, skrivebeskyttet tilgang.

## Eksempelkoder

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Har du flere spørsmål om Designmønsteret for verktøybruk?

Bli med i [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) for å møte andre lærende, delta på kontortid og få svar på dine spørsmål om AI-agenter.

## Ytterligere ressurser

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service Workshop</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Multi-Agent Workshop</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Oversikt Microsoft Agent Framework</a>


## Røyk-testing av denne agenten (valgfritt)

Etter at du har lært å distribuere agenter i [Leksjon 16](../16-deploying-scalable-agents/README.md), kan du røyk-teste `TravelToolAgent` fra denne leksjonen (kaller den fortsatt verktøyene sine og svarer?) med [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Se [`tests/README.md`](../tests/README.md) for hvordan du kjører den.

## Forrige leksjon

[Forstå agentiske designmønstre](../03-agentic-design-patterns/README.md)

## Neste leksjon

[Agentisk RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->