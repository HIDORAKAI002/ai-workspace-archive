[![Verkenning van AI Agent Frameworks](../../../translated_images/nl/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

# Verken AI Agent Frameworks

AI agent frameworks zijn softwareplatforms die zijn ontworpen om het creëren, implementeren en beheren van AI-agents te vereenvoudigen. Deze frameworks bieden ontwikkelaars kant-en-klare componenten, abstracties en hulpmiddelen die het ontwikkelen van complexe AI-systemen stroomlijnen.

Deze frameworks helpen ontwikkelaars zich te richten op de unieke aspecten van hun toepassingen door gestandaardiseerde benaderingen te bieden voor veelvoorkomende uitdagingen bij de ontwikkeling van AI-agents. Ze verbeteren schaalbaarheid, toegankelijkheid en efficiëntie bij het bouwen van AI-systemen.

## Introductie

Deze les behandelt:

- Wat zijn AI Agent Frameworks en wat stellen ze ontwikkelaars in staat te bereiken?
- Hoe kunnen teams deze gebruiken om snel te prototypen, itereren en de mogelijkheden van hun agent te verbeteren?
- Wat zijn de verschillen tussen de frameworks en tools gemaakt door Microsoft (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> en het <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Kan ik mijn bestaande Azure-ecosysteemtools rechtstreeks integreren, of heb ik standalone oplossingen nodig?
- Wat is Microsoft Foundry Agent Service en hoe helpt dit mij?

## Leerdoelen

De doelen van deze les zijn om je te helpen begrijpen:

- De rol van AI Agent Frameworks bij AI-ontwikkeling.
- Hoe AI Agent Frameworks te benutten om intelligente agents te bouwen.
- Belangrijke mogelijkheden die mogelijk worden gemaakt door AI Agent Frameworks.
- De verschillen tussen het Microsoft Agent Framework en Microsoft Foundry Agent Service.

## Wat zijn AI Agent Frameworks en wat stellen zij ontwikkelaars in staat te doen?

Traditionele AI Frameworks kunnen je helpen AI in je apps te integreren en deze apps op de volgende manieren te verbeteren:

- **Personalisatie**: AI kan gebruikersgedrag en voorkeuren analyseren om gepersonaliseerde aanbevelingen, content en ervaringen te bieden.
Voorbeeld: Streamingdiensten zoals Netflix gebruiken AI om films en series voor te stellen op basis van kijkgeschiedenis, wat de gebruikersbetrokkenheid en tevredenheid verhoogt.
- **Automatisering en efficiëntie**: AI kan repetitieve taken automatiseren, workflows stroomlijnen en operationele efficiëntie verbeteren.
Voorbeeld: Klantenservice-apps gebruiken AI-aangedreven chatbots om veelvoorkomende vragen af te handelen, wat reactietijden verkort en menselijke agenten vrijmaakt voor complexere kwesties.
- **Verbeterde gebruikerservaring**: AI kan de algehele gebruikerservaring verbeteren door intelligente functies te bieden zoals spraakherkenning, natuurlijke taalverwerking en voorspellende tekst.
Voorbeeld: Virtuele assistenten zoals Siri en Google Assistant gebruiken AI om spraakopdrachten te begrijpen en erop te reageren, waardoor het voor gebruikers gemakkelijker wordt om met hun apparaten te communiceren.

### Dat klinkt allemaal geweldig, toch? Waarom hebben we dan het AI Agent Framework nodig?

AI Agent frameworks vertegenwoordigen meer dan alleen AI frameworks. Ze zijn ontworpen om de creatie van intelligente agents mogelijk te maken die kunnen interageren met gebruikers, andere agents en de omgeving om specifieke doelen te bereiken. Deze agents kunnen autonoom gedrag vertonen, beslissingen nemen en zich aanpassen aan veranderende omstandigheden. Laten we enkele belangrijke mogelijkheden bekijken die AI Agent Frameworks mogelijk maken:

- **Samenwerking en coördinatie tussen agents**: Mogelijkheid om meerdere AI agents te creëren die samenwerken, communiceren en taken coördineren om complexe problemen op te lossen.
- **Taakautomatisering en -beheer**: Bieden mechanismen om meerstaps-workflows te automatiseren, taken te delegeren en dynamisch taakbeheer tussen agents.
- **Contextueel begrip en aanpassing**: Agents uitrusten met het vermogen om context te begrijpen, zich aan te passen aan veranderende omgevingen en beslissingen te nemen op basis van realtime informatie.

Samengevat, agents stellen je in staat meer te doen, automatisering naar een hoger niveau te tillen en intelligentere systemen te creëren die zich kunnen aanpassen en leren van hun omgeving.

## Hoe snel prototypen, itereren en de mogelijkheden van de agent verbeteren?

Dit is een snel veranderend landschap, maar er zijn enkele gemeenschappelijke elementen in de meeste AI Agent Frameworks die je kunnen helpen snel te prototypen en itereren, namelijk modulaire componenten, samenwerkingshulpmiddelen en realtime leren. Laten we deze nader bekijken:

- **Gebruik modulaire componenten**: AI SDK's bieden kant-en-klare componenten zoals AI- en geheugenconnectors, functieoproepen met natuurlijke taal of code-plugins, prompt-sjablonen en meer.
- **Benut samenwerkingshulpmiddelen**: Ontwerp agents met specifieke rollen en taken, zodat ze samenwerkingsflows kunnen testen en verfijnen.
- **Leer in realtime**: Implementeer feedbackloops waarin agents leren van interacties en hun gedrag dynamisch aanpassen.

### Gebruik modulaire componenten

SDK's zoals het Microsoft Agent Framework bieden kant-en-klare componenten zoals AI-connectors, tooldefinities en agentbeheer.

**Hoe teams deze kunnen gebruiken**: Teams kunnen deze componenten snel samenstellen om een functioneel prototype te maken zonder vanaf nul te beginnen, wat snelle experimentatie en iteratie mogelijk maakt.

**Hoe het in de praktijk werkt**: Je kunt een kant-en-klare parser gebruiken om informatie uit gebruikersinvoer te extraheren, een geheugenmodule om gegevens op te slaan en op te halen, en een promptgenerator om met gebruikers te communiceren, allemaal zonder deze componenten zelf te hoeven bouwen.

**Voorbeeldcode**. Laten we een voorbeeld bekijken van hoe je het Microsoft Agent Framework met `FoundryChatClient` kunt gebruiken om het model te laten reageren op gebruikersinvoer met tool-oproepen:

``` python
# Microsoft Agent Framework Python Voorbeeld

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Definieer een voorbeeldhulpmiddel functie om reizen te boeken
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
    # Voorbeelduitvoer: Uw vlucht naar New York op 1 januari 2025 is succesvol geboekt. Goede reis! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Wat je in dit voorbeeld ziet, is hoe je een kant-en-klare parser kunt gebruiken om sleutelgegevens uit gebruikersinvoer te halen, zoals de herkomst, bestemming en datum van een vluchtboekingsverzoek. Deze modulaire benadering stelt je in staat je te richten op de logica op hoog niveau.

### Benut samenwerkingshulpmiddelen

Frameworks zoals het Microsoft Agent Framework maken het mogelijk meerdere agents te creëren die samenwerken.

**Hoe teams deze kunnen gebruiken**: Teams kunnen agents ontwerpen met specifieke rollen en taken, waardoor ze samenwerkingsworkflows kunnen testen en verfijnen en de algehele systeemefficiëntie kunnen verbeteren.

**Hoe het in de praktijk werkt**: Je kunt een team van agents creëren waarbij elke agent een gespecialiseerde functie heeft, zoals gegevensophaling, analyse of besluitvorming. Deze agents kunnen communiceren en informatie delen om een gemeenschappelijk doel te bereiken, zoals het beantwoorden van een gebruikersvraag of het voltooien van een taak.

**Voorbeeldcode (Microsoft Agent Framework)**:

```python
# Meerdere agenten creëren die samenwerken met behulp van het Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Gegevensophaalagent
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Gegevensanalyse-agent
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Agenten achtereenvolgens uitvoeren voor een taak
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Wat je in de vorige code ziet, is hoe je een taak kunt creëren die meerdere agents samen laat werken om data te analyseren. Elke agent vervult een specifieke functie en de taak wordt uitgevoerd door het coördineren van de agents om het gewenste resultaat te bereiken. Door toegewijde agents met gespecialiseerde rollen te creëren, kun je de taakefficiëntie en prestaties verbeteren.

### Leer in realtime

Geavanceerde frameworks bieden mogelijkheden voor realtime contextbegrip en aanpassing.

**Hoe teams deze kunnen gebruiken**: Teams kunnen feedbackloops implementeren waarin agents leren van interacties en hun gedrag dynamisch aanpassen, wat leidt tot voortdurende verbetering en verfijning van mogelijkheden.

**Hoe het in de praktijk werkt**: Agents kunnen gebruikersfeedback, omgevingsgegevens en taakresultaten analyseren om hun kennisbasis bij te werken, besluitvormingsalgoritmen aan te passen en prestaties in de tijd te verbeteren. Dit iteratieve leerproces stelt agents in staat zich aan te passen aan veranderende omstandigheden en gebruikersvoorkeuren, wat de algehele systeemeffectiviteit verhoogt.

## Wat zijn de verschillen tussen het Microsoft Agent Framework en Microsoft Foundry Agent Service?

Er zijn veel manieren om deze benaderingen te vergelijken, maar laten we enkele belangrijke verschillen bekijken op het gebied van ontwerp, mogelijkheden en beoogde gebruikssituaties:

## Microsoft Agent Framework (MAF)

Het Microsoft Agent Framework biedt een gestroomlijnde SDK voor het bouwen van AI agents met `FoundryChatClient`. Het stelt ontwikkelaars in staat agents te creëren die Azure OpenAI-modellen gebruiken met ingebouwde tool-oproepen, gesprekbeheer en beveiliging van ondernemingsniveau via Azure-identiteit.

**Gebruikssituaties**: Productierijpe AI agents bouwen met toolgebruik, meerstaps-workflows en integratiescenario's voor ondernemingen.

Hier zijn enkele belangrijke kernconcepten van het Microsoft Agent Framework:

- **Agents**. Een agent wordt gemaakt via `FoundryChatClient` en geconfigureerd met een naam, instructies en tools. De agent kan:
  - **Gebruikersberichten verwerken** en reacties genereren met Azure OpenAI-modellen.
  - **Automatisch tools aanroepen** op basis van de gesprekcontext.
  - **Gesprekstoestand behouden** over meerdere interacties heen.

  Hier is een codefragment dat laat zien hoe een agent wordt gemaakt:

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

- **Tools**. Het framework ondersteunt het definiëren van tools als Python-functies die de agent automatisch kan aanroepen. Tools worden geregistreerd bij het aanmaken van de agent:

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

- **Multi-Agent-coördinatie**. Je kunt meerdere agents creëren met verschillende specialisaties en hun werk coördineren:

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

- **Integratie met Azure Identity**. Het framework gebruikt `AzureCliCredential` (of `DefaultAzureCredential`) voor veilige authenticatie zonder sleutels, zodat je API-sleutels niet direct hoeft te beheren.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service is een nieuwere toevoeging, geïntroduceerd op Microsoft Ignite 2024. Het maakt de ontwikkeling en implementatie van AI agents mogelijk met flexibelere modellen, zoals directe oproepen naar open-source LLM's zoals Llama 3, Mistral en Cohere.

Microsoft Foundry Agent Service biedt sterkere beveiligingsmechanismen voor ondernemingen en methoden voor gegevensopslag, waardoor het geschikt is voor zakelijke toepassingen.

Het werkt direct samen met het Microsoft Agent Framework voor het bouwen en implementeren van agents.

Deze service is momenteel in openbare preview en ondersteunt Python en C# voor het bouwen van agents.

Met de Microsoft Foundry Agent Service Python SDK kunnen we een agent creëren met een door gebruiker gedefinieerde tool:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Definieer gereedschapsfuncties
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

### Kernconcepten

Microsoft Foundry Agent Service heeft de volgende kernconcepten:

- **Agent**. Microsoft Foundry Agent Service integreert met Microsoft Foundry. Binnen Microsoft Foundry fungeert een AI Agent als een "slimme" microservice die kan worden gebruikt om vragen te beantwoorden (RAG), acties uit te voeren of workflows volledig te automatiseren. Dit bereikt het door de kracht van generatieve AI-modellen te combineren met tools die toegang geven tot en interactie met real-world databronnen mogelijk maken. Hier is een voorbeeld van een agent:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    In dit voorbeeld wordt een agent aangemaakt met het model `gpt-4.1-mini`, een naam `my-agent`, en instructies `You are helpful agent`. De agent is uitgerust met tools en middelen om taken rondom code-interpretatie uit te voeren.

- **Thread en berichten**. De thread is een ander belangrijk concept. Het vertegenwoordigt een gesprek of interactie tussen een agent en een gebruiker. Threads kunnen gebruikt worden om de voortgang van een gesprek te volgen, contextinformatie op te slaan en de status van de interactie te beheren. Hier is een voorbeeld van een thread:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Vraag de agent om werk uit te voeren op de thread
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Haal alle berichten op en log ze om de reactie van de agent te zien
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    In de vorige code wordt een thread aangemaakt. Daarna wordt een bericht naar de thread gestuurd. Door `create_and_process_run` aan te roepen, wordt de agent gevraagd werk uit te voeren op de thread. Tot slot worden de berichten opgehaald en gelogd om de reactie van de agent te zien. De berichten geven de voortgang van het gesprek tussen gebruiker en agent aan. Het is ook belangrijk te begrijpen dat de berichten verschillende types kunnen hebben zoals tekst, afbeelding of bestand, wat betekent dat het werk van de agent heeft geleid tot bijvoorbeeld een afbeelding of een tekstreactie. Als ontwikkelaar kun je deze informatie vervolgens gebruiken om de reactie verder te verwerken of aan de gebruiker te tonen.

- **Integreert met het Microsoft Agent Framework**. Microsoft Foundry Agent Service werkt naadloos samen met het Microsoft Agent Framework, wat betekent dat je agents kunt bouwen met `FoundryChatClient` en deze kunt implementeren via de Agent Service voor productiescenario's.

**Gebruikssituaties**: Microsoft Foundry Agent Service is ontworpen voor zakelijke toepassingen die veilige, schaalbare en flexibele AI agent-implementatie vereisen.

## Wat is het verschil tussen deze benaderingen?
 
Er lijkt overlap te zijn, maar er zijn enkele belangrijke verschillen op het gebied van ontwerp, mogelijkheden en doelgebruik:
 
- **Microsoft Agent Framework (MAF)**: Is een productierijpe SDK voor het bouwen van AI agents. Het biedt een gestroomlijnde API voor het creëren van agents met tool-oproepen, gesprekbeheer en integratie met Azure-identiteit.
- **Microsoft Foundry Agent Service**: Is een platform- en implementatieservice binnen Microsoft Foundry voor agents. Het biedt ingebouwde connectiviteit met services zoals Azure OpenAI, Azure AI Search, Bing Search en code-uitvoering.
 
Weet je nog niet welke je moet kiezen?

### Gebruikssituaties
 
Laten we eens kijken of we je kunnen helpen door enkele veelvoorkomende gebruikssituaties te bekijken:
 
> V: Ik bouw productierijpe AI agent-toepassingen en wil snel starten
>

>A: Het Microsoft Agent Framework is een uitstekende keuze. Het biedt een eenvoudige, python-achtige API via `FoundryChatClient` waarmee je agents kunt definiëren met tools en instructies in slechts een paar regels code.

>V: Ik heb implementatie met ondernemingsniveau beveiliging nodig met Azure-integraties zoals Search en code-uitvoering
>
> A: Microsoft Foundry Agent Service is het beste. Het is een platformservice die ingebouwde mogelijkheden biedt voor meerdere modellen, Azure AI Search, Bing Search en Azure Functions. Het maakt het gemakkelijk om je agents te bouwen in het Foundry Portal en ze op schaal te implementeren.
 
> V: Ik ben nog steeds in de war, geef me gewoon één optie
>
> A: Begin met het Microsoft Agent Framework om je agents te bouwen, en gebruik vervolgens Microsoft Foundry Agent Service wanneer je ze in productie moet implementeren en schalen. Deze aanpak stelt je in staat snel te itereren op je agentlogica met een duidelijk pad naar ondernemingsimplementatie.
 
Laten we de belangrijkste verschillen samenvatten in een tabel:

| Framework | Focus | Kernconcepten | Gebruikssituaties |
| --- | --- | --- | --- |
| Microsoft Agent Framework | Gestroomlijnde agent SDK met tool-oproepen | Agents, Tools, Azure Identity | Bouwen van AI agents, toolgebruik, meerstaps-workflows |
| Microsoft Foundry Agent Service | Flexibele modellen, enterprise-beveiliging, codegeneratie, tool-oproepen | Modulariteit, samenwerking, procesorchestratie | Veilige, schaalbare en flexibele AI agent-implementatie |

## Kan ik mijn bestaande Azure-ecosysteemtools rechtstreeks integreren, of heb ik standalone oplossingen nodig?


Het antwoord is ja, je kunt je bestaande Azure-ecosysteemtools direct integreren met Microsoft Foundry Agent Service, vooral omdat deze is gebouwd om naadloos samen te werken met andere Azure-diensten. Je zou bijvoorbeeld Bing, Azure AI Search en Azure Functions kunnen integreren. Er is ook diepe integratie met Microsoft Foundry.

Het Microsoft Agent Framework integreert ook met Azure-diensten via `FoundryChatClient` en Azure-identiteit, waardoor je Azure-diensten direct kunt aanroepen vanuit je agenttools.

## Voorbeeldcodes

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Meer vragen over AI Agent Frameworks?

Word lid van de [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) om andere leerlingen te ontmoeten, deel te nemen aan office hours en je vragen over AI Agents beantwoord te krijgen.

## Referenties

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Vorige les

[Introductie tot AI Agents en Agent Use Cases](../01-intro-to-ai-agents/README.md)

## Volgende les

[Begrijpen van Agentic Design Patterns](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->