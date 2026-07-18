[![Udforskning af AI Agent Frameworks](../../../translated_images/da/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Klik på billedet ovenfor for at se videoen til denne lektion)_

# Udforsk AI Agent Frameworks

AI agent frameworks er softwareplatforme designet til at forenkle oprettelsen, implementeringen og styringen af AI-agenter. Disse frameworks tilbyder udviklere forudbyggede komponenter, abstraktioner og værktøjer, som strømliner udviklingen af komplekse AI-systemer.

Disse frameworks hjælper udviklere med at fokusere på de unikke aspekter af deres applikationer ved at tilbyde standardiserede tilgange til almindelige udfordringer i AI-agentudvikling. De forbedrer skalerbarhed, tilgængelighed og effektivitet i opbygningen af AI-systemer.

## Introduktion 

Denne lektion vil dække:

- Hvad er AI Agent Frameworks, og hvad gør de muligt for udviklere at opnå?
- Hvordan kan teams bruge disse til hurtigt at prototype, iterere og forbedre deres agents kapabiliteter?
- Hvad er forskellene mellem de frameworks og værktøjer, Microsoft har skabt (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> og <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Kan jeg integrere mine eksisterende Azure-økosystemværktøjer direkte, eller har jeg brug for selvstændige løsninger?
- Hvad er Microsoft Foundry Agent Service, og hvordan hjælper det mig?

## Læringsmål

Formålet med denne lektion er at hjælpe dig med at forstå:

- AI Agent Frameworks rolle i AI-udvikling.
- Hvordan man udnytter AI Agent Frameworks til at bygge intelligente agenter.
- Vigtige kapabiliteter, som AI Agent Frameworks gør mulige.
- Forskellene mellem Microsoft Agent Framework og Microsoft Foundry Agent Service.

## Hvad er AI Agent Frameworks, og hvad gør de muligt for udviklere?

Traditionelle AI Frameworks kan hjælpe dig med at integrere AI i dine apps og forbedre disse apps på følgende måder:

- **Personalisering**: AI kan analysere brugeradfærd og præferencer for at give personlige anbefalinger, indhold og oplevelser.
Eksempel: Streamingtjenester som Netflix bruger AI til at foreslå film og shows baseret på seerhistorik, hvilket forbedrer brugerengagement og tilfredshed.
- **Automatisering og effektivitet**: AI kan automatisere gentagne opgaver, strømligne arbejdsgange og forbedre driftsmæssig effektivitet.
Eksempel: Kundeserviceapps bruger AI-drevne chatbots til at håndtere almindelige forespørgsler, hvilket reducerer svartider og frigør menneskelige agenter til mere komplekse problemer.
- **Forbedret brugeroplevelse**: AI kan forbedre den samlede brugeroplevelse ved at tilbyde intelligente funktioner som talegenkendelse, naturlig sprogbehandling og forudsigende tekst.
Eksempel: Virtuelle assistenter som Siri og Google Assistant bruger AI til at forstå og reagere på stemmekommandoer, hvilket gør det nemmere for brugere at interagere med deres enheder.

### Det lyder jo fantastisk, så hvorfor har vi brug for AI Agent Framework?

AI Agent frameworks repræsenterer mere end bare AI-frameworks. De er designet til at muliggøre oprettelsen af intelligente agenter, der kan interagere med brugere, andre agenter og miljøet for at nå specifikke mål. Disse agenter kan udvise autonom adfærd, træffe beslutninger og tilpasse sig ændrede forhold. Lad os kigge på nogle nøglekapabiliteter, som AI Agent Frameworks muliggør:

- **Agent-samarbejde og koordinering**: Muliggør oprettelse af flere AI-agenter, der kan arbejde sammen, kommunikere og koordinere for at løse komplekse opgaver.
- **Automatisering og styring af opgaver**: Tilbyder mekanismer til automatisering af flertrins arbejdsgange, opgavedelegering og dynamisk opgavestyring mellem agenter.
- **Kontextforståelse og tilpasning**: Udruster agenter med evnen til at forstå kontekst, tilpasse sig skiftende miljøer og træffe beslutninger baseret på realtidsinformation.

Så samlet set gør agenter det muligt for dig at gøre mere, at tage automatisering til næste niveau, at skabe mere intelligente systemer, der kan tilpasse sig og lære af deres omgivelser.

## Hvordan kan man hurtigt prototype, iterere og forbedre agentens kapabiliteter?

Dette er et hurtigt udviklende område, men der er nogle ting, som er fælles for de fleste AI Agent Frameworks, der kan hjælpe dig med at prototype og iterere hurtigt, nemlig modulære komponenter, samarbejdsværktøjer og realtidslæring. Lad os dykke ned i disse:

- **Brug modulære komponenter**: AI SDK'er tilbyder forudbyggede komponenter såsom AI- og hukommelsesforbindelser, funktionskald via naturligt sprog eller kode-plugins, promptskabeloner og mere.
- **Udnyt samarbejdsværktøjer**: Design agenter med specifikke roller og opgaver, der gør det muligt at teste og forfine samarbejdende arbejdsgange.
- **Lær i realtid**: Implementer feedback-loops, hvor agenter lærer af interaktioner og dynamisk justerer deres adfærd.

### Brug modulære komponenter

SDK'er som Microsoft Agent Framework tilbyder forudbyggede komponenter såsom AI-forbindelser, værktøjsdefinitioner og agentstyring.

**Hvordan teams kan bruge disse**: Teams kan hurtigt samle disse komponenter for at skabe en funktionel prototype uden at starte fra bunden, hvilket muliggør hurtige eksperimenter og iterationer.

**Hvordan det fungerer i praksis**: Du kan bruge en forudbygget parser til at udtrække information fra brugerinput, en hukommelsesmodul til at gemme og hente data, og en promptgenerator til at interagere med brugere, alt sammen uden at skulle bygge disse komponenter fra bunden.

**Eksempelkode**. Lad os se på et eksempel på, hvordan du kan bruge Microsoft Agent Framework med `FoundryChatClient` til at få modellen til at svare på brugerinput med værktøjskald:

``` python
# Microsoft Agent Framework Python Eksempel

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Definer en eksempel værktøjsfunktion til at booke rejse
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
    # Eksempel output: Din flyvning til New York den 1. januar 2025 er blevet succesfuldt booket. God rejse! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Hvad du kan se fra dette eksempel, er hvordan du kan udnytte en forudbygget parser til at udtrække centrale informationer fra brugerinput, såsom afgangssted, destination og dato for en flybookningsanmodning. Denne modulære tilgang giver dig mulighed for at fokusere på logikken på højt niveau.

### Udnyt samarbejdsværktøjer

Frameworks som Microsoft Agent Framework gør det nemt at skabe flere agenter, der kan arbejde sammen.

**Hvordan teams kan bruge disse**: Teams kan designe agenter med specifikke roller og opgaver, så de kan teste og forbedre samarbejdende arbejdsgange og øge den samlede systemeffektivitet.

**Hvordan det fungerer i praksis**: Du kan oprette et team af agenter, hvor hver agent har en specialiseret funktion, som eksempelvis datainhentning, analyse eller beslutningstagning. Disse agenter kan kommunikere og dele information for at nå et fælles mål, som at besvare en brugerspørgsmål eller udføre en opgave.

**Eksempelkode (Microsoft Agent Framework)**:

```python
# Oprettelse af flere agenter, der arbejder sammen ved hjælp af Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Dataindhentningsagent
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

# Kør agenter i rækkefølge på en opgave
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Det du ser i den tidligere kode, er hvordan du kan skabe en opgave, der involverer flere agenter, som arbejder sammen om at analysere data. Hver agent udfører en specifik funktion, og opgaven udføres ved at koordinere agenterne for at nå det ønskede resultat. Ved at skabe dedikerede agenter med specialiserede roller kan du forbedre opgavens effektivitet og ydeevne.

### Lær i realtid

Avancerede frameworks tilbyder kapabiliteter til kontekstforståelse og tilpasning i realtid.

**Hvordan teams kan bruge disse**: Teams kan implementere feedback-loops, hvor agenter lærer af interaktioner og dynamisk justerer deres adfærd, hvilket fører til kontinuerlig forbedring og finjustering af kapabiliteter.

**Hvordan det fungerer i praksis**: Agenter kan analysere brugerfeedback, miljødata og resultatet af opgaver for at opdatere deres vidensbase, justere beslutningsalgoritmer og forbedre ydeevnen over tid. Denne iterative læringsproces gør, at agenter kan tilpasse sig ændrede forhold og brugernes præferencer, hvilket øger systemets samlede effektivitet.

## Hvad er forskellene mellem Microsoft Agent Framework og Microsoft Foundry Agent Service?

Der findes mange måder at sammenligne disse tilgange på, men lad os kigge på nogle nøgleforskelle hvad angår design, kapabiliteter og målrettede brugsscenarier:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework tilbyder et strømlinet SDK til at bygge AI-agenter ved hjælp af `FoundryChatClient`. Det gør udviklere i stand til at skabe agenter, som udnytter Azure OpenAI-modeller med indbygget værktøjskald, samtalehåndtering og sikkerhed på virksomhedsniveau gennem Azure-identitet.

**Brugsscenarier**: Opbygning af produktionsklare AI-agenter med værktøjsbrug, flertrins-arbejdsgange og virksomhedsintegrationsscenarier.

Her er nogle vigtige kernetemaer i Microsoft Agent Framework:

- **Agenter**. En agent oprettes via `FoundryChatClient` og konfigureres med navn, instruktioner og værktøjer. Agenten kan:
  - **Behandle brugermeddelelser** og generere svar ved brug af Azure OpenAI-modeller.
  - **Automatisk kalde værktøjer** baseret på samtalekonteksten.
  - **Vedligeholde samtalestatus** på tværs af flere interaktioner.

  Her er et kodeudsnit, som viser, hvordan man opretter en agent:

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

- **Værktøjer**. Frameworket understøtter definition af værktøjer som Python-funktioner, som agenten automatisk kan kalde. Værktøjerne registreres ved oprettelsen af agenten:

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

- **Koordinering af flere agenter**. Du kan oprette flere agenter med forskellige specialiseringer og koordinere deres arbejde:

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

- **Azure-identitetsintegration**. Frameworket bruger `AzureCliCredential` (eller `DefaultAzureCredential`) til sikker, nøglefri autentifikation, hvilket eliminerer behovet for at administrere API-nøgler direkte.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service er et nyere tiltag, introduceret ved Microsoft Ignite 2024. Det muliggør udvikling og implementering af AI-agenter med mere fleksible modeller, såsom direkte kald til open source LLM'er som Llama 3, Mistral og Cohere.

Microsoft Foundry Agent Service tilbyder stærkere sikkerhedsmekanismer til virksomheder og metoder til datalagring, hvilket gør det egnet til virksomhedsapplikationer.

Det fungerer problemfrit sammen med Microsoft Agent Framework til opbygning og implementering af agenter.

Tjenesten er i øjeblikket i offentlig preview og understøtter Python og C# til agentudvikling.

Med Microsoft Foundry Agent Service Python SDK kan vi skabe en agent med et brugerdefineret værktøj:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Definer værktøjsfunktioner
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

### Kernetemaer

Microsoft Foundry Agent Service har følgende kernetemaer:

- **Agent**. Microsoft Foundry Agent Service integreres med Microsoft Foundry. Inden for Microsoft Foundry fungerer en AI Agent som en "smart" mikrotjeneste, der kan bruges til at besvare spørgsmål (RAG), udføre handlinger eller fuldstændigt automatisere arbejdsgange. Det opnås ved at kombinere kraften i generative AI-modeller med værktøjer, der tillader adgang til og interaktion med datakilder fra den virkelige verden. Her er et eksempel på en agent:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    I dette eksempel oprettes en agent med modellen `gpt-4.1-mini`, navnet `my-agent` og instruktionen `You are helpful agent`. Agenten er udstyret med værktøjer og ressourcer til at udføre kodefortolkningsopgaver.

- **Tråd og meddelelser**. Tråden er et andet vigtigt koncept. Den repræsenterer en samtale eller interaktion mellem en agent og en bruger. Tråde kan bruges til at spore samtaleforløbet, gemme kontekstinformation og styre tilstanden af interaktionen. Her er et eksempel på en tråd:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Bed agenten om at udføre arbejde på tråden
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Hent og log alle beskeder for at se agentens svar
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    I den tidligere kode oprettes en tråd. Derefter sendes en besked til tråden. Ved at kalde `create_and_process_run` bliver agenten bedt om at arbejde på tråden. Til sidst hentes beskederne og logges for at se agentens svar. Beskederne angiver samtalens forløb mellem brugeren og agenten. Det er også vigtigt at forstå, at beskeder kan være af forskellige typer såsom tekst, billede eller fil, hvilket betyder, at agentens arbejde har resulteret i for eksempel et billede eller et tekstsvar. Som udvikler kan du så bruge denne information til yderligere behandling af svaret eller præsentere det for brugeren.

- **Integreres med Microsoft Agent Framework**. Microsoft Foundry Agent Service fungerer problemfrit sammen med Microsoft Agent Framework, hvilket betyder, at du kan bygge agenter ved brug af `FoundryChatClient` og implementere dem gennem Agent Service til produktionsscenarier.

**Brugsscenarier**: Microsoft Foundry Agent Service er designet til virksomhedsapplikationer, der kræver sikker, skalerbar og fleksibel udrulning af AI-agenter.

## Hvad er forskellen mellem disse tilgange?
 
Det lyder som om, der er overlap, men der er nogle nøgleforskelle i forhold til design, kapabiliteter og målrettede brugsscenarier:
 
- **Microsoft Agent Framework (MAF)**: Er et produktionsklart SDK til at bygge AI-agenter. Det tilbyder et strømlinet API til at skabe agenter med værktøjskald, samtalehåndtering og Azure-identitetsintegration.
- **Microsoft Foundry Agent Service**: Er en platform- og implementeringstjeneste i Microsoft Foundry til agenter. Det tilbyder indbygget forbindelse til tjenester som Azure OpenAI, Azure AI Search, Bing Search og kodeeksekvering.
 
Er du stadig i tvivl om, hvilken du skal vælge?

### Brugsscenarier
 
Lad os se, om vi kan hjælpe dig ved at gennemgå nogle almindelige brugsscenarier:
 
> Q: Jeg bygger produktionsklare AI-agent-applikationer og vil hurtigt i gang
>

>A: Microsoft Agent Framework er et godt valg. Det tilbyder et enkelt, Python-agtigt API via `FoundryChatClient`, som lader dig definere agenter med værktøjer og instruktioner på få linjer kode.

>Q: Jeg har brug for implementering i virksomhedsklasse med Azure-integrationer som Search og kodeeksekvering
>
> A: Microsoft Foundry Agent Service er det bedste valg. Det er en platformtjeneste med indbyggede kapabiliteter for flere modeller, Azure AI Search, Bing Search og Azure Functions. Det gør det nemt at bygge dine agenter i Foundry Portal og udrulle dem i stor skala.
 
> Q: Jeg er stadig forvirret, giv mig bare én mulighed
>
> A: Start med Microsoft Agent Framework til at bygge dine agenter, og brug så Microsoft Foundry Agent Service, når du skal udrulle og skalere dem i produktion. Denne tilgang lader dig iterere hurtigt på agentlogikken samtidig med, at du har en klar vej til implementering i virksomheden.
 
Lad os opsummere nøgleforskellene i en tabel:

| Framework | Fokus | Kernetemaer | Brugsscenarier |
| --- | --- | --- | --- |
| Microsoft Agent Framework | Strømlinet agent-SDK med værktøjskald | Agenter, Værktøjer, Azure Identitet | Opbygning af AI-agenter, værktøjsbrug, flertrins arbejdsgange |
| Microsoft Foundry Agent Service | Fleksible modeller, virksomheds-sikkerhed, kodegenerering, værktøjskald | Modularitet, samarbejde, procesorkestrering | Sikker, skalerbar og fleksibel implementering af AI-agenter |

## Kan jeg integrere mine eksisterende Azure-økosystemværktøjer direkte, eller har jeg brug for selvstændige løsninger?


Svaret er ja, du kan integrere dine eksisterende Azure-økosystemværktøjer direkte med Microsoft Foundry Agent Service, især da det er bygget til at fungere problemfrit med andre Azure-tjenester. Du kan for eksempel integrere Bing, Azure AI Search og Azure Functions. Der er også dyb integration med Microsoft Foundry.

Microsoft Agent Framework integrerer også med Azure-tjenester gennem `FoundryChatClient` og Azure-identitet, hvilket gør det muligt at kalde Azure-tjenester direkte fra dine agentværktøjer.

## Eksempelkoder

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Har du flere spørgsmål om AI-agent-rammeværker?

Deltag i [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) for at møde andre elever, deltage i kontortimer og få svar på dine spørgsmål om AI-agenter.

## Referencer

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Forrige lektion

[Introduktion til AI-agenter og bruger-sager for agenter](../01-intro-to-ai-agents/README.md)

## Næste lektion

[Forståelse af Agentic Design Patterns](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->