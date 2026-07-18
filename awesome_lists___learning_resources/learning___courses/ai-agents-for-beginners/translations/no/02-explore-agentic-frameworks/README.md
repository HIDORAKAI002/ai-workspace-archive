[![Utforske AI Agent-rammeverk](../../../translated_images/no/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Klikk på bildet ovenfor for å se video av denne leksjonen)_

# Utforsk AI Agent-rammeverk

AI agent-rammeverk er programvareplattformer designet for å forenkle opprettelse, distribusjon og håndtering av AI-agenter. Disse rammeverkene gir utviklere forhåndsbygde komponenter, abstraksjoner og verktøy som effektiviserer utviklingen av komplekse AI-systemer.

Disse rammeverkene hjelper utviklere med å fokusere på de unike aspektene ved sine applikasjoner ved å tilby standardiserte tilnærminger til vanlige utfordringer i AI-agentutvikling. De forbedrer skalerbarhet, tilgjengelighet og effektivitet i bygging av AI-systemer.

## Introduksjon 

Denne leksjonen vil dekke:

- Hva er AI Agent-rammeverk og hva gjør de mulig for utviklere?
- Hvordan kan team bruke disse til raskt å prototype, iterere og forbedre agentens evner?
- Hva er forskjellene mellom rammeverkene og verktøyene laget av Microsoft (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> og <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Kan jeg integrere mine eksisterende Azure økosystemverktøy direkte, eller trenger jeg frittstående løsninger?
- Hva er Microsoft Foundry Agent Service og hvordan hjelper dette meg?

## Læringsmål

Målene med denne leksjonen er å hjelpe deg med å forstå:

- Rollen til AI Agent-rammeverk i AI-utvikling.
- Hvordan utnytte AI Agent-rammeverk for å bygge intelligente agenter.
- Nøkkelfunksjoner som AI Agent-rammeverk muliggjør.
- Forskjellene mellom Microsoft Agent Framework og Microsoft Foundry Agent Service.

## Hva er AI Agent-rammeverk og hva gjør de mulig for utviklere?

Tradisjonelle AI-rammeverk kan hjelpe deg med å integrere AI i appene dine og gjøre disse appene bedre på følgende måter:

- **Personalisering**: AI kan analysere brukeradferd og preferanser for å gi personlige anbefalinger, innhold og opplevelser.
Eksempel: Strømmetjenester som Netflix bruker AI til å foreslå filmer og serier basert på seerhistorikk, noe som øker brukerengasjement og tilfredshet.
- **Automatisering og effektivitet**: AI kan automatisere repeterende oppgaver, effektivisere arbeidsflyter og forbedre operasjonell effektivitet.
Eksempel: Kundeserviceapper bruker AI-drevne chatboter for å håndtere vanlige henvendelser, redusere svartid og frigjøre menneskelige agenter til mer komplekse saker.
- **Forbedret brukeropplevelse**: AI kan forbedre den totale brukeropplevelsen ved å tilby intelligente funksjoner som talegjenkjenning, naturlig språkbehandling og prediktiv tekst.
Eksempel: Virtuelle assistenter som Siri og Google Assistant bruker AI til å forstå og svare på taleinstrukser, noe som gjør det enklere for brukere å interagere med enhetene sine.

### Det høres jo flott ut, så hvorfor trenger vi AI Agent-rammeverket?

AI Agent-rammeverk representerer noe mer enn bare AI-rammeverk. De er designet for å muliggjøre opprettelsen av intelligente agenter som kan samhandle med brukere, andre agenter og miljøet for å oppnå spesifikke mål. Disse agentene kan vise autonom oppførsel, ta beslutninger og tilpasse seg endrende forhold. La oss se på noen nøkkelfunksjoner som AI Agent-rammeverk muliggjør:

- **Agent-samarbeid og koordinering**: Muliggjør opprettelse av flere AI-agenter som kan samarbeide, kommunisere og koordinere for å løse komplekse oppgaver.
- **Oppgaveautomatisering og -styring**: Gir mekanismer for automatisering av flertrinns arbeidsflyter, oppgavefordeling og dynamisk oppgavestyring mellom agenter.
- **Kontekstuell forståelse og tilpasning**: Utstyrer agenter med evnen til å forstå kontekst, tilpasse seg skiftende miljøer og ta beslutninger basert på sanntidsinformasjon.

Oppsummert lar agenter deg gjøre mer, løfte automatisering til neste nivå, skape mer intelligente systemer som kan tilpasse seg og lære av miljøet sitt.

## Hvordan raskt prototype, iterere og forbedre agentens evner?

Dette landskapet utvikler seg raskt, men det er noen ting som er felles for de fleste AI Agent-rammeverk som kan hjelpe deg å raskt prototype og iterere, nemlig modulære komponenter, samarbeidsverktøy og læring i sanntid. La oss dykke inn i disse:

- **Bruk modulære komponenter**: AI SDK-er tilbyr ferdigbygde komponenter som AI- og minnetilkoblinger, funksjonskall med naturlig språk eller kode-plugins, promptmaler og mer.
- **Utnytt samarbeidsverktøy**: Design agenter med spesifikke roller og oppgaver, som gjør det mulig å teste og forbedre samarbeids-arbeidsflyter.
- **Lær i sanntid**: Implementer tilbakemeldingssløyfer der agenter lærer fra interaksjoner og justerer atferd dynamisk.

### Bruk modulære komponenter

SDK-er som Microsoft Agent Framework tilbyr ferdigbygde komponenter som AI-tilkoblinger, verktøydefinisjoner og agentstyring.

**Hvordan team kan bruke disse**: Team kan raskt sette sammen disse komponentene for å lage en funksjonell prototype uten å starte fra bunnen av, noe som muliggjør rask eksperimentering og iterasjon.

**Hvordan det fungerer i praksis**: Du kan bruke en ferdigbygget parser for å hente informasjon fra brukerinput, en minnemodul for lagring og gjenfinning av data, og en promptgenerator for interaksjon med brukere, alt uten å måtte bygge disse komponentene selv.

**Eksempelkode**. La oss se på et eksempel på hvordan du kan bruke Microsoft Agent Framework med `FoundryChatClient` for at modellen skal svare på brukerinput med verktøyskall:

``` python
# Microsoft Agent Framework Python-eksempel

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Definer en prøveverktøyfunksjon for å bestille reise
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # Eksempelsutdata: Din flyreise til New York den 1. januar 2025 er vellykket bestilt. God tur! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Det du kan se i dette eksempelet er hvordan du kan utnytte en ferdigbygget parser for å hente nøkkelinformasjon fra brukerinput, som opprinnelse, destinasjon og dato for en flybestillingsforespørsel. Denne modulære tilnærmingen lar deg fokusere på den høynivå logikken.

### Utnytt samarbeidsverktøy

Rammeverk som Microsoft Agent Framework legger til rette for opprettelse av flere agenter som kan samarbeide.

**Hvordan team kan bruke disse**: Team kan designe agenter med spesifikke roller og oppgaver, som lar dem teste og forbedre samarbeids-arbeidsflyter og øke systemets effektivitet.

**Hvordan det fungerer i praksis**: Du kan opprette et team av agenter hvor hver agent har en spesialisert funksjon, som datainnhenting, analyse eller beslutningstaking. Disse agentene kan kommunisere og dele informasjon for å oppnå et felles mål, som å svare på en brukerforespørsel eller fullføre en oppgave.

**Eksempelkode (Microsoft Agent Framework)**:

```python
# Opprette flere agenter som jobber sammen ved hjelp av Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Datahentingsagent
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Dataanalyseagent
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Kjøre agenter sekvensielt på en oppgave
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Det du ser i forrige kode er hvordan du kan opprette en oppgave som involverer flere agenter som samarbeider om å analysere data. Hver agent utfører en spesifikk funksjon, og oppgaven utføres ved å koordinere agentene for å oppnå ønsket resultat. Ved å opprette dedikerte agenter med spesialiserte roller, kan du forbedre effektiviteten og ytelsen i oppgaven.

### Lær i sanntid

Avanserte rammeverk tilbyr funksjoner for sanntids kontekstforståelse og tilpasning.

**Hvordan team kan bruke disse**: Team kan implementere tilbakemeldingssløyfer hvor agenter lærer av interaksjoner og dynamisk justerer atferd, noe som fører til kontinuerlig forbedring og finjustering av evner.

**Hvordan det fungerer i praksis**: Agenter kan analysere brukertilbakemeldinger, miljødata og oppgaveutfall for å oppdatere kunnskapsbasen, justere beslutningsalgoritmer og forbedre ytelse over tid. Denne iterative læringsprosessen gjør agentene i stand til å tilpasse seg endrende forhold og brukerpreferanser, og forbedrer den totale systemeffektiviteten.

## Hva er forskjellene mellom Microsoft Agent Framework og Microsoft Foundry Agent Service?

Det finnes mange måter å sammenligne disse tilnærmingene på, men la oss se på noen nøkkelforskjeller når det gjelder design, funksjoner og målrettede bruksområder:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework tilbyr en forenklet SDK for bygging av AI-agenter med `FoundryChatClient`. Det gjør det mulig for utviklere å lage agenter som utnytter Azure OpenAI-modeller med innebygd verktøyskall, samtalestyring og sikkerhet på bedriftsnivå gjennom Azure-identitet.

**Bruksområder**: Bygge produksjonsklare AI-agenter med verktøysbruk, flertrinns arbeidsflyter og bedriftsintegrasjon.

Her er noen viktige kjernebegreper i Microsoft Agent Framework:

- **Agenter**. En agent opprettes via `FoundryChatClient` og konfigureres med navn, instruksjoner og verktøy. Agenten kan:
  - **Behandle brukermeldinger** og generere svar ved hjelp av Azure OpenAI-modeller.
  - **Kalle verktøy** automatisk basert på samtalekontekst.
  - **Opprettholde samtalestatus** over flere interaksjoner.

  Her er et kodeeksempel som viser hvordan man oppretter en agent:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **Verktøy**. Rammeverket støtter definering av verktøy som Python-funksjoner som agenten automatisk kan påkalle. Verktøy registreres når agenten opprettes:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **Koordinering av flere agenter**. Du kan opprette flere agenter med ulike spesialiseringer og koordinere deres arbeid:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Azure Identitetsintegrasjon**. Rammeverket bruker `AzureCliCredential` (eller `DefaultAzureCredential`) for sikker, nøkkelfri autentisering, noe som fjerner behovet for direkte håndtering av API-nøkler.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service er et nyere tilskudd, introdusert på Microsoft Ignite 2024. Det tillater utvikling og distribusjon av AI-agenter med mer fleksible modeller, som direkte bruk av open source LLM-er som Llama 3, Mistral og Cohere.

Microsoft Foundry Agent Service gir sterkere sikkerhetsmekanismer for bedrifter og metoder for datalagring, noe som gjør det egnet for bedriftsapplikasjoner. 

Det fungerer sømløst sammen med Microsoft Agent Framework for bygging og distribusjon av agenter.

Tjenesten er for øyeblikket i offentlig forhåndsvisning og støtter Python og C# for å bygge agenter.

Ved bruk av Microsoft Foundry Agent Service Python SDK kan vi lage en agent med et brukerdefinert verktøy:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Definer verktøyfunksjoner
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### Kjernebegreper

Microsoft Foundry Agent Service har følgende kjernebegreper:

- **Agent**. Microsoft Foundry Agent Service integreres med Microsoft Foundry. Innenfor Microsoft Foundry fungerer en AI-agent som en "smart" mikrotjeneste som kan brukes til å svare på spørsmål (RAG), utføre handlinger eller fullstendig automatisere arbeidsflyter. Dette oppnås ved å kombinere kraften til generative AI-modeller med verktøy som gir tilgang til og interaksjon med datakilder fra den virkelige verden. Her er et eksempel på en agent:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    I dette eksempelet opprettes en agent med modellen `gpt-4.1-mini`, et navn `my-agent` og instruksjonene `You are helpful agent`. Agenten er utstyrt med verktøy og ressurser for å utføre kode-tolkningsoppgaver.

- **Tråd og meldinger**. Tråden er et annet viktig begrep. Den representerer en samtale eller interaksjon mellom en agent og en bruker. Tråder kan brukes til å spore fremdriften i en samtale, lagre kontekstinformasjon og administrere tilstanden i interaksjonen. Her er et eksempel på en tråd:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Be agenten utføre arbeid på tråden
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Hent og logg alle meldinger for å se agentens respons
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    I forrige kode opprettes en tråd. Deretter sendes en melding til tråden. Ved å kalle `create_and_process_run` blir agenten bedt om å utføre arbeid på tråden. Til slutt hentes meldingene og logges for å se agentens respons. Meldingene indikerer fremdriften i samtalen mellom bruker og agent. Det er også viktig å forstå at meldingene kan være av forskjellige typer som tekst, bilde eller fil, altså at agentenes arbeid har resultert i for eksempel et bilde eller en tekstrespons. Som utvikler kan du så bruke denne informasjonen til videre behandling av responsen eller presentasjon for brukeren.

- **Integreres med Microsoft Agent Framework**. Microsoft Foundry Agent Service fungerer sømløst med Microsoft Agent Framework, noe som betyr at du kan bygge agenter med `FoundryChatClient` og distribuere dem gjennom Agent Service for produksjonsscenarier.

**Bruksområder**: Microsoft Foundry Agent Service er designet for bedriftsapplikasjoner som krever sikker, skalerbar og fleksibel AI-agentdistribusjon.

## Hva er forskjellen mellom disse tilnærmingene?
 
Det virker som det er overlapp, men det er noen nøkkelforskjeller hva angår design, funksjoner og målrettede bruksområder:
 
- **Microsoft Agent Framework (MAF)**: Er en produksjonsklar SDK for bygging av AI-agenter. Den tilbyr en strømlinjeformet API for å lage agenter med verktøyskall, samtalestyring og Azure identitetsintegrasjon.
- **Microsoft Foundry Agent Service**: Er en plattform- og distribusjonstjeneste i Microsoft Foundry for agenter. Den tilbyr innebygd tilkobling til tjenester som Azure OpenAI, Azure AI Search, Bing Search og kodekjøring.
 
Er du fortsatt usikker på hvilken du skal velge?

### Bruksområder
 
La oss se om vi kan hjelpe ved å gå gjennom noen vanlige brukstilfeller:
 
> Q: Jeg bygger produksjonsklare AI-agentapplikasjoner og vil komme i gang raskt
>

>A: Microsoft Agent Framework er et flott valg. Den tilbyr en enkel, Python-aktig API via `FoundryChatClient` som lar deg definere agenter med verktøy og instruksjoner i bare noen få kodelinjer.

>Q: Jeg trenger distribusjon på bedriftsnivå med Azure-integrasjoner som Search og kodekjøring
>
> A: Microsoft Foundry Agent Service er best egnet. Det er en plattformtjeneste som tilbyr innebygde funksjoner for flere modeller, Azure AI Search, Bing Search og Azure Functions. Det gjør det enkelt å bygge agentene dine i Foundry-portalen og distribuere dem i stor skala.
 
> Q: Jeg er fortsatt forvirret, gi meg bare ett alternativ
>
> A: Start med Microsoft Agent Framework for å bygge agentene dine, og bruk deretter Microsoft Foundry Agent Service når du trenger å distribuere og skalere dem i produksjon. Denne tilnærmingen lar deg iterere raskt på agentlogikken samtidig som du har en klar vei til bedriftsdistribusjon.
 
La oss oppsummere nøkkelforskjellene i en tabell:

| Rammeverk | Fokus | Kjernebegreper | Bruksområder |
| --- | --- | --- | --- |
| Microsoft Agent Framework | Strømlinjeformet agent SDK med verktøyskall | Agenter, Verktøy, Azure Identitet | Bygge AI-agenter, verktøysbruk, flertrinns arbeidsflyter |
| Microsoft Foundry Agent Service | Fleksible modeller, bedriftsikkerhet, kodegenerering, verktøyskall | Modularitet, Samarbeid, Prosessorientering | Sikker, skalerbar og fleksibel AI-agentdistribusjon |

## Kan jeg integrere mine eksisterende Azure-økosystemverktøy direkte, eller trenger jeg frittstående løsninger?


Svaret er ja, du kan integrere dine eksisterende Azure-økosystemverktøy direkte med Microsoft Foundry Agent Service spesielt, siden det er bygd for å fungere sømløst med andre Azure-tjenester. Du kan for eksempel integrere Bing, Azure AI Search og Azure Functions. Det finnes også dyp integrasjon med Microsoft Foundry.

Microsoft Agent Framework integreres også med Azure-tjenester gjennom `FoundryChatClient` og Azure-identitet, slik at du kan kalle Azure-tjenester direkte fra agentverktøyene dine.

## Eksempelkoder

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Har du flere spørsmål om AI Agent Frameworks?

Bli med i [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) for å møte andre som lærer, delta på kontortid og få svar på spørsmål om AI-agenter.

## Referanser

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Forrige leksjon

[Introduksjon til AI-agenter og agentbrukstilfeller](../01-intro-to-ai-agents/README.md)

## Neste leksjon

[Forstå agentiske designmønstre](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->