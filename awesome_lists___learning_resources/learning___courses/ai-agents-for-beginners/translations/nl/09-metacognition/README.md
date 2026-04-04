[![Multi-Agent Ontwerp](../../../translated_images/nl/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Klik op de afbeelding hierboven om de video van deze les te bekijken)_
# Metacognitie in AI Agents

## Inleiding

Welkom bij de les over metacognitie in AI-agents! Dit hoofdstuk is bedoeld voor beginners die benieuwd zijn naar hoe AI-agents kunnen nadenken over hun eigen denkprocessen. Aan het einde van deze les begrijp je belangrijke concepten en heb je praktische voorbeelden om metacognitie toe te passen in het ontwerp van AI-agents.

## Leerdoelen

Na het voltooien van deze les kun je:

1. De implicaties van redeneer-lussen in agentdefinities begrijpen.
2. Plannings- en evaluatietechnieken gebruiken om zelfcorrigerende agents te ondersteunen.
3. Je eigen agents creëren die code kunnen manipuleren om taken uit te voeren.

## Introductie tot Metacognitie

Metacognitie verwijst naar hogere-orde cognitieve processen waarbij men nadenkt over het eigen denken. Voor AI-agents betekent dit in staat zijn hun acties te evalueren en aan te passen op basis van zelfbewustzijn en eerdere ervaringen. Metacognitie, of "nadenken over nadenken," is een belangrijk concept bij de ontwikkeling van agentische AI-systemen. Het houdt in dat AI-systemen zich bewust zijn van hun eigen interne processen en in staat zijn om hun gedrag te monitoren, reguleren en aan te passen. Net zoals wij doen wanneer we de sfeer peilen of naar een probleem kijken. Dit zelfbewustzijn kan AI-systemen helpen betere beslissingen te nemen, fouten te identificeren en hun prestaties in de loop van de tijd te verbeteren — weer terugkoppeling met de Turing-test en het debat of AI de macht gaat overnemen.

In de context van agentische AI-systemen kan metacognitie verschillende uitdagingen helpen aanpakken, zoals:
- Transparantie: Zorgen dat AI-systemen hun redeneringen en beslissingen kunnen uitleggen.
- Redeneren: Het verbeteren van het vermogen van AI-systemen om informatie te synthetiseren en goede beslissingen te nemen.
- Adaptatie: Het mogelijk maken voor AI-systemen om zich aan te passen aan nieuwe omgevingen en veranderende omstandigheden.
- Waarneming: Het verbeteren van de nauwkeurigheid van AI-systemen bij het herkennen en interpreteren van data uit hun omgeving.

### Wat is Metacognitie?

Metacognitie, of "nadenken over nadenken," is een hogere-orde cognitief proces dat zelfbewustzijn en zelfregulatie van iemands cognitieve processen omvat. In de wereld van AI stelt metacognitie agents in staat hun strategieën en acties te evalueren en aan te passen, wat leidt tot verbeterde probleemoplossing en besluitvormingsvaardigheden. Door metacognitie te begrijpen, kun je AI-agents ontwerpen die niet alleen intelligenter, maar ook adaptiever en efficiënter zijn. In echte metacognitie zou je zien dat de AI expliciet redeneert over zijn eigen redeneringen.

Voorbeeld: “Ik gaf prioriteit aan goedkopere vluchten omdat… misschien mis ik directe vluchten, dus laat ik het opnieuw controleren.”.
Bijhouden hoe of waarom het een bepaalde route koos.
- Opmerken dat het fouten maakte omdat het te veel vertrouwde op gebruikersvoorkeuren van eerder, dus het past zijn beslissingsstrategie aan en niet alleen de uiteindelijke aanbeveling.
- Patronen diagnosticeren zoals: “Wanneer ik de gebruiker ‘te druk’ hoor zeggen, zou ik niet alleen bepaalde attracties verwijderen maar ook reflecteren dat mijn methode om de ‘topattracties’ te kiezen gebrekkig is als ik ze altijd rangschik op populariteit.”

### Belang van Metacognitie in AI Agents

Metacognitie speelt een cruciale rol in het ontwerp van AI-agents om verschillende redenen:

![Belang van Metacognitie](../../../translated_images/nl/importance-of-metacognition.b381afe9aae352f7.webp)

- Zelfreflectie: Agents kunnen hun eigen prestaties beoordelen en verbeterpunten identificeren.
- Aanpassingsvermogen: Agents kunnen hun strategieën aanpassen op basis van eerdere ervaringen en veranderende omgevingen.
- Foutcorrectie: Agents kunnen fouten zelfstandig detecteren en corrigeren, wat leidt tot nauwkeuriger uitkomsten.
- Hulpbronnenbeheer: Agents kunnen het gebruik van hulpbronnen, zoals tijd en rekenkracht, optimaliseren door hun acties te plannen en te evalueren.

## Componenten van een AI Agent

Voordat we ons verdiepen in metacognitieve processen, is het essentieel om de basiscomponenten van een AI-agent te begrijpen. Een AI-agent bestaat doorgaans uit:

- Persona: De persoonlijkheid en kenmerken van de agent, die bepalen hoe deze met gebruikers omgaat.
- Hulpmiddelen: De mogelijkheden en functies die de agent kan uitvoeren.
- Vaardigheden: De kennis en expertise die de agent bezit.

Deze componenten werken samen om een "expertiseenheid" te vormen die specifieke taken kan uitvoeren.

**Voorbeeld**:
Denk aan een reisagent, agentdiensten die niet alleen je vakantie plannen maar ook hun route aanpassen op basis van realtime data en eerdere klantreizen.

### Voorbeeld: Metacognitie in een Reisagent Service

Stel je voor dat je een reisagentservice ontwerpt die wordt aangedreven door AI. Deze agent, "Reisagent," helpt gebruikers bij het plannen van hun vakanties. Om metacognitie te integreren, moet de Reisagent zijn acties evalueren en aanpassen op basis van zelfbewustzijn en eerdere ervaringen. Hier is hoe metacognitie een rol kan spelen:

#### Huidige Taak

De huidige taak is een gebruiker helpen een reis naar Parijs te plannen.

#### Stappen om de Taak te Voltooien

1. **Verzamel Gebruikersvoorkeuren**: Vraag de gebruiker naar reisdata, budget, interesses (bijv. musea, keuken, winkelen) en specifieke wensen.
2. **Informatie Opvragen**: Zoek naar vluchtopties, accommodaties, attracties en restaurants die passen bij de voorkeuren van de gebruiker.
3. **Genereer Aanbevelingen**: Bied een gepersonaliseerd reisschema met vluchtgegevens, hotelreserveringen en voorgestelde activiteiten.
4. **Aanpassen op Feedback**: Vraag de gebruiker om feedback op de aanbevelingen en maak de benodigde aanpassingen.

#### Benodigde Hulpbronnen

- Toegang tot databases voor vlucht- en hotelboekingen.
- Informatie over Parijse attracties en restaurants.
- Gebruikersfeedback uit eerdere interacties.

#### Ervaring en Zelfreflectie

Reisagent gebruikt metacognitie om zijn prestaties te evalueren en te leren van eerdere ervaringen. Bijvoorbeeld:

1. **Analyseren van Gebruikersfeedback**: Reisagent bekijkt de feedback om te bepalen welke aanbevelingen goed ontvangen werden en welke niet. Hij past zijn volgende suggesties daarop aan.
2. **Aanpassingsvermogen**: Als een gebruiker eerder aangaf een hekel te hebben aan drukke plekken, zal Reisagent in de toekomst populaire toeristische plaatsen tijdens piekuren vermijden.
3. **Foutcorrectie**: Als Reisagent in het verleden een fout maakte, zoals het aanraden van een volgeboekt hotel, leert hij om beschikbaarheid beter te controleren voor het aanbevelingen doet.

#### Praktisch Voorbeeld voor Ontwikkelaars

Hier is een vereenvoudigd voorbeeld van hoe de code van Reisagent eruit kan zien wanneer metacognitie wordt geïntegreerd:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Zoek naar vluchten, hotels en attracties op basis van voorkeuren
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        # Analyseer feedback en pas toekomstige aanbevelingen aan
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Voorbeeldgebruik
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

#### Waarom Metacognitie Belangrijk Is

- **Zelfreflectie**: Agents kunnen hun prestaties analyseren en verbeterpunten identificeren.
- **Aanpassingsvermogen**: Agents kunnen strategieën aanpassen op basis van feedback en veranderende omstandigheden.
- **Foutcorrectie**: Agents kunnen zelfstandig fouten detecteren en corrigeren.
- **Hulpbronnenbeheer**: Agents kunnen het gebruik van middelen optimaliseren, zoals tijd en rekenkracht.

Door metacognitie te integreren kan Reisagent meer gepersonaliseerde en nauwkeurige reisaanbevelingen geven, wat de algehele gebruikerservaring verbetert.

---

## 2. Planning in Agents

Planning is een cruciaal onderdeel van het gedrag van AI-agents. Het houdt in dat je de stappen uitstippelt die nodig zijn om een doel te bereiken, rekening houdend met de huidige staat, hulpbronnen en mogelijke obstakels.

### Elementen van Planning

- **Huidige Taak**: Definieer de taak duidelijk.
- **Stappen om de Taak te Voltooien**: Verdeel de taak in beheersbare stappen.
- **Benodigde Hulpbronnen**: Identificeer benodigde hulpbronnen.
- **Ervaring**: Gebruik eerdere ervaringen om de planning te informeren.

**Voorbeeld**:
Hier zijn de stappen die Reisagent moet nemen om een gebruiker effectief te helpen met het plannen van hun reis:

### Stappen voor Reisagent

1. **Verzamel Gebruikersvoorkeuren**
   - Vraag de gebruiker om details over reisdata, budget, interesses en specifieke wensen.
   - Voorbeelden: "Wanneer wil je reizen?" "Wat is je budget?" "Welke activiteiten vind je leuk tijdens je vakantie?"

2. **Informatie Opvragen**
   - Zoek naar relevante reismogelijkheden op basis van de voorkeuren van de gebruiker.
   - **Vluchten**: Zoek vluchten binnen het budget en de gewenste reisdata.
   - **Accommodaties**: Vind hotels of huurwoningen die passen bij locatie, prijs en voorzieningen.
   - **Attracties en Restaurants**: Identificeer populaire attracties, activiteiten en eetgelegenheden die aansluiten bij de interesses van de gebruiker.

3. **Genereer Aanbevelingen**
   - Stel de opgehaalde informatie samen in een gepersonaliseerd reisschema.
   - Geef details zoals vluchtopties, hotelreserveringen en voorgestelde activiteiten, afgestemd op de voorkeuren van de gebruiker.

4. **Presenteer Reisschema aan Gebruiker**
   - Deel het voorgestelde schema met de gebruiker voor review.
   - Voorbeeld: "Hier is een voorgesteld reisschema voor je trip naar Parijs. Inclusief vluchtgegevens, hotelboekingen, en een lijst met aanbevolen activiteiten en restaurants. Wat vind je ervan?"

5. **Verzamel Feedback**
   - Vraag de gebruiker om feedback over het voorgestelde schema.
   - Voorbeelden: "Vind je de vluchtopties goed?" "Is het hotel geschikt voor je wensen?" "Zijn er activiteiten die je wilt toevoegen of verwijderen?"

6. **Pas Aan Op Basis van Feedback**
   - Wijzig het schema op basis van de feedback van de gebruiker.
   - Maak noodzakelijke aanpassingen aan vlucht-, accommodatie- en activiteitsaanbevelingen om beter aan te sluiten bij de voorkeuren.

7. **Definitieve Bevestiging**
   - Presenteer het bijgewerkte schema ter definitieve bevestiging.
   - Voorbeeld: "Ik heb de aanpassingen doorgevoerd op basis van je feedback. Hier is het bijgewerkte schema. Ziet alles er goed uit?"

8. **Boek en Bevestig Reserveringen**
   - Zodra de gebruiker het schema goedkeurt, boek vluchten, accommodaties en alle vooraf geplande activiteiten.
   - Stuur bevestigingsgegevens naar de gebruiker.

9. **Bied Doorlopende Ondersteuning**
   - Blijf beschikbaar om de gebruiker te helpen met wijzigingen of aanvullende verzoeken voor en tijdens hun reis.
   - Voorbeeld: "Als je tijdens je reis nog hulp nodig hebt, kun je mij altijd bereiken!"

### Voorbeeld Interactie

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Voorbeeld gebruik binnen een boekerverzoek
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

## 3. Correctieve RAG Systeem

Laten we eerst het verschil begrijpen tussen de RAG Tool en Pre-emptive Context Load

![RAG vs Context Loading](../../../translated_images/nl/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

RAG combineert een retrieval-systeem met een generatief model. Wanneer er een query wordt gedaan, haalt het retrieval-systeem relevante documenten of data op uit een externe bron, en deze opgehaalde informatie wordt gebruikt om de input voor het generatieve model te versterken. Dit helpt het model om meer accurate en contextueel relevante antwoorden te genereren.

In een RAG-systeem haalt de agent relevante informatie op uit een kennisbank en gebruikt deze om passende antwoorden of acties te genereren.

### Correctieve RAG Aanpak

De correctieve RAG-aanpak richt zich op het gebruik van RAG-technieken om fouten te corrigeren en de nauwkeurigheid van AI-agents te verbeteren. Dit omvat:

1. **Prompting-techniek**: Gebruikmaken van specifieke prompts om de agent te begeleiden bij het ophalen van relevante informatie.
2. **Tool**: Implementeren van algoritmen en mechanismen waarmee de agent de relevantie van opgehaalde informatie kan evalueren en nauwkeurige antwoorden kan genereren.
3. **Evaluatie**: Voortdurend beoordelen van de prestaties van de agent en aanpassen om de nauwkeurigheid en efficiëntie te verbeteren.

#### Voorbeeld: Correctieve RAG in een Zoekagent

Denk aan een zoekagent die informatie van het web haalt om gebruikersvragen te beantwoorden. De correctieve RAG-aanpak zou kunnen bestaan uit:

1. **Prompting-techniek**: Formuleren van zoekopdrachten op basis van de invoer van de gebruiker.
2. **Tool**: Gebruik van natural language processing en machine learning-algoritmen om zoekresultaten te rangschikken en filteren.
3. **Evaluatie**: Analyseren van gebruikersfeedback om onnauwkeurigheden in de opgehaalde informatie te identificeren en te corrigeren.

### Correctieve RAG in Reisagent

Correctieve RAG (Retrieval-Augmented Generation) verbetert het vermogen van AI om informatie op te halen en te genereren terwijl fouten worden gecorrigeerd. Laten we bekijken hoe Reisagent de Correctieve RAG-aanpak kan gebruiken om nauwkeurigere en relevantere reisaanbevelingen te doen.

Dit omvat:

- **Prompting-techniek:** Gebruik maken van specifieke prompts om de agent te begeleiden bij het ophalen van relevante informatie.
- **Tool:** Implementatie van algoritmen en mechanismen die de agent helpen de relevantie van opgehaalde informatie te beoordelen en nauwkeurige antwoorden te genereren.
- **Evaluatie:** Continu beoordelen van de prestaties van de agent en aanpassen om de nauwkeurigheid en efficiëntie te verbeteren.

#### Stappen voor het Implementeren van Correctieve RAG in Reisagent

1. **Eerste Gebruikersinteractie**
   - Reisagent verzamelt initiële voorkeuren van de gebruiker, zoals bestemming, reisdata, budget en interesses.
   - Voorbeeld:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Informatie Ophalen**
   - Reisagent haalt informatie op over vluchten, accommodaties, attracties en restaurants op basis van de gebruikersvoorkeuren.
   - Voorbeeld:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Genereren van Initiële Aanbevelingen**
   - Reisagent gebruikt de opgehaalde informatie om een gepersonaliseerd reisschema te genereren.
   - Voorbeeld:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Verzamelen van Gebruikersfeedback**
   - Reisagent vraagt de gebruiker om feedback over de initiële aanbevelingen.
   - Voorbeeld:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Correctieve RAG Proces**
   - **Prompting-techniek**: Reisagent formuleert nieuwe zoekopdrachten op basis van de gebruikersfeedback.
     - Voorbeeld:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Tool**: Reisagent gebruikt algoritmen om nieuwe zoekresultaten te rangschikken en te filteren, waarbij de nadruk ligt op relevantie gebaseerd op de feedback.
     - Voorbeeld:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Evaluatie**: Reisagent beoordeelt continu de relevantie en nauwkeurigheid van zijn aanbevelingen door gebruikersfeedback te analyseren en maakt waar nodig aanpassingen.
     - Voorbeeld:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktisch Voorbeeld

Hier is een vereenvoudigd Python-codevoorbeeld dat de Correctieve RAG-aanpak integreert in Reisagent:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)
        new_itinerary = self.generate_recommendations()
        return new_itinerary

# Voorbeeld gebruik
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
new_itinerary = travel_agent.adjust_based_on_feedback(feedback)
print("Updated Itinerary:", new_itinerary)
```

### Pre-emptive Context Load
Pre-emptive Context Load houdt in dat relevante context of achtergrondinformatie in het model wordt geladen voordat een vraag wordt verwerkt. Dit betekent dat het model vanaf het begin toegang heeft tot deze informatie, wat kan helpen om beter geïnformeerde antwoorden te genereren zonder tijdens het proces extra gegevens te hoeven opzoeken.

Hier is een vereenvoudigd voorbeeld van hoe een pre-emptive context load eruit zou kunnen zien voor een reisagent-applicatie in Python:

```python
class TravelAgent:
    def __init__(self):
        # Populaire bestemmingen en hun informatie vooraf laden
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Haal bestemmingsinformatie op uit vooraf geladen context
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Voorbeeldgebruik
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Verklaring

1. **Initialisatie (`__init__` methode)**: De `TravelAgent` klasse laadt vooraf een woordenboek met informatie over populaire bestemmingen zoals Parijs, Tokio, New York en Sydney. Dit woordenboek bevat details zoals het land, de valuta, taal en belangrijke attracties voor elke bestemming.

2. **Informatie opvragen (`get_destination_info` methode)**: Wanneer een gebruiker een specifieke bestemming opvraagt, haalt de `get_destination_info` methode de relevante informatie op uit het vooraf geladen contextwoordenboek.

Door de context vooraf te laden, kan de reisagent-applicatie snel reageren op gebruikersvragen zonder deze informatie in real-time uit een externe bron te hoeven ophalen. Dit maakt de applicatie efficiënter en responsiever.

### Het Plan Bootstrappen met een Doel voordat je Itereert

Het bootstrappen van een plan met een doel betekent dat je start met een duidelijk doel of beoogde uitkomst voor ogen. Door dit doel vooraf te definiëren, kan het model het als leidraad gebruiken tijdens het iteratieve proces. Dit helpt ervoor te zorgen dat elke iteratie dichter bij het gewenste resultaat komt, waardoor het proces efficiënter en gerichter wordt.

Hier is een voorbeeld van hoe je een reisplan zou kunnen bootstrappen met een doel voordat je gaat itereren voor een reisagent in Python:

### Scenario

Een reisagent wil een op maat gemaakte vakantie plannen voor een klant. Het doel is om een reisroute te creëren die de tevredenheid van de klant maximaliseert op basis van hun voorkeuren en budget.

### Stappen

1. Definieer de voorkeuren en het budget van de klant.  
2. Bootstrap het eerste plan op basis van deze voorkeuren.  
3. Itereer om het plan te verfijnen, optimaliserend voor de tevredenheid van de klant.

#### Python Code

```python
class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def bootstrap_plan(self, preferences, budget):
        plan = []
        total_cost = 0

        for destination in self.destinations:
            if total_cost + destination['cost'] <= budget and self.match_preferences(destination, preferences):
                plan.append(destination)
                total_cost += destination['cost']

        return plan

    def match_preferences(self, destination, preferences):
        for key, value in preferences.items():
            if destination.get(key) != value:
                return False
        return True

    def iterate_plan(self, plan, preferences, budget):
        for i in range(len(plan)):
            for destination in self.destinations:
                if destination not in plan and self.match_preferences(destination, preferences) and self.calculate_cost(plan, destination) <= budget:
                    plan[i] = destination
                    break
        return plan

    def calculate_cost(self, plan, new_destination):
        return sum(destination['cost'] for destination in plan) + new_destination['cost']

# Voorbeeldgebruik
destinations = [
    {"name": "Paris", "cost": 1000, "activity": "sightseeing"},
    {"name": "Tokyo", "cost": 1200, "activity": "shopping"},
    {"name": "New York", "cost": 900, "activity": "sightseeing"},
    {"name": "Sydney", "cost": 1100, "activity": "beach"},
]

preferences = {"activity": "sightseeing"}
budget = 2000

travel_agent = TravelAgent(destinations)
initial_plan = travel_agent.bootstrap_plan(preferences, budget)
print("Initial Plan:", initial_plan)

refined_plan = travel_agent.iterate_plan(initial_plan, preferences, budget)
print("Refined Plan:", refined_plan)
```

#### Code Verklaring

1. **Initialisatie (`__init__` methode)**: De `TravelAgent` klasse wordt geïnitialiseerd met een lijst van potentiële bestemmingen, elk met attributen zoals naam, kosten en type activiteit.

2. **Bootstrappen van het Plan (`bootstrap_plan` methode)**: Deze methode maakt een eerste reisplan op basis van de voorkeuren en het budget van de klant. Het iterereert door de lijst van bestemmingen en voegt ze toe aan het plan als ze overeenkomen met de voorkeuren van de klant en binnen het budget passen.

3. **Voorkeuren Matchen (`match_preferences` methode)**: Deze methode controleert of een bestemming overeenkomt met de voorkeuren van de klant.

4. **Plan Itereren (`iterate_plan` methode)**: Deze methode verfijnt het eerste plan door te proberen elke bestemming in het plan te vervangen door een betere match, rekening houdend met de voorkeuren en het budget van de klant.

5. **Kosten Berekenen (`calculate_cost` methode)**: Deze methode berekent de totale kosten van het huidige plan, inclusief een potentiële nieuwe bestemming.

#### Voorbeeldgebruik

- **Initieel Plan**: De reisagent maakt een eerste plan op basis van de voorkeuren van de klant voor sightseeing en een budget van $2000.  
- **Verfijnd Plan**: De reisagent iterereert het plan en optimaliseert voor de voorkeuren van de klant en het budget.

Door het plan te bootstrappen met een duidelijk doel (bijvoorbeeld het maximaliseren van klanttevredenheid) en te itereren om het plan te verfijnen, kan de reisagent een gepersonaliseerde en geoptimaliseerde reisroute voor de klant creëren. Deze aanpak zorgt ervoor dat het reisplan vanaf het begin aansluit bij de voorkeuren en het budget van de klant en verbetert met elke iteratie.

### Gebruikmaken van LLM voor Re-ranking en Scoring

Grote taalmodellen (LLM’s) kunnen worden gebruikt voor re-ranking en scoring door de relevantie en kwaliteit van opgehaalde documenten of gegenereerde antwoorden te evalueren. Zo werkt het:

**Ophalen:** De initiële ophaalfase haalt een set kandidaat-documenten of antwoorden op basis van de vraag.

**Re-ranking:** Het LLM beoordeelt deze kandidaten en herschikt ze op basis van relevantie en kwaliteit. Deze stap zorgt ervoor dat de meest relevante en kwalitatieve informatie als eerste wordt getoond.

**Scoring:** Het LLM kent scores toe aan elke kandidaat, die hun relevantie en kwaliteit weerspiegelen. Dit helpt bij het selecteren van het beste antwoord of document voor de gebruiker.

Door LLM's te benutten voor re-ranking en scoring kan het systeem nauwkeurigere en contextueel relevantere informatie bieden, wat de gebruikerservaring aanzienlijk verbetert.

Hier is een voorbeeld van hoe een reisagent een groot taalmodel zou kunnen gebruiken voor re-ranking en scoring van reisbestemmingen op basis van voorkeuren in Python:

#### Scenario – Reizen op basis van Voorkeuren

Een reisagent wil de beste reisbestemmingen aan een klant aanbevelen op basis van hun voorkeuren. Het LLM helpt bij het herschikken en scoren van de bestemmingen om te zorgen dat de meest relevante opties worden getoond.

#### Stappen:

1. Verzamel gebruikersvoorkeuren.  
2. Haal een lijst van potentiële reisbestemmingen op.  
3. Gebruik het LLM om de bestemmingen te herschikken en te scoren op basis van gebruikersvoorkeuren.

Hier volgt hoe je het vorige voorbeeld kunt aanpassen om Azure OpenAI Services te gebruiken:

#### Vereisten

1. Je moet een Azure-abonnement hebben.  
2. Maak een Azure OpenAI resource aan en verkrijg je API-sleutel.

#### Voorbeeld Python Code

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Genereer een prompt voor de Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Definieer headers en payload voor het verzoek
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Roep de Azure OpenAI API aan om de hergerangschikte en gescoorde bestemmingen te krijgen
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Extraheer en retourneer de aanbevelingen
        recommendations = response_data['choices'][0]['text'].strip().split('\n')
        return recommendations

    def generate_prompt(self, preferences):
        prompt = "Here are the travel destinations ranked and scored based on the following user preferences:\n"
        for key, value in preferences.items():
            prompt += f"{key}: {value}\n"
        prompt += "\nDestinations:\n"
        for destination in self.destinations:
            prompt += f"- {destination['name']}: {destination['description']}\n"
        return prompt

# Voorbeeld van gebruik
destinations = [
    {"name": "Paris", "description": "City of lights, known for its art, fashion, and culture."},
    {"name": "Tokyo", "description": "Vibrant city, famous for its modernity and traditional temples."},
    {"name": "New York", "description": "The city that never sleeps, with iconic landmarks and diverse culture."},
    {"name": "Sydney", "description": "Beautiful harbour city, known for its opera house and stunning beaches."},
]

preferences = {"activity": "sightseeing", "culture": "diverse"}
api_key = 'your_azure_openai_api_key'
endpoint = 'https://your-endpoint.com/openai/deployments/your-deployment-name/completions?api-version=2022-12-01'

travel_agent = TravelAgent(destinations)
recommendations = travel_agent.get_recommendations(preferences, api_key, endpoint)
print("Recommended Destinations:")
for rec in recommendations:
    print(rec)
```

#### Code Verklaring – Preference Booker

1. **Initialisatie**: De `TravelAgent` klasse wordt geïnitialiseerd met een lijst van potentiële reisbestemmingen, elk met attributen zoals naam en beschrijving.

2. **Aanbevelingen Ophalen (`get_recommendations` methode)**: Deze methode genereert een prompt voor de Azure OpenAI-service op basis van de voorkeuren van de gebruiker en maakt een HTTP POST-verzoek naar de Azure OpenAI API om herschikte en gescoorde bestemmingen te krijgen.

3. **Prompt Genereren (`generate_prompt` methode)**: Deze methode stelt een prompt samen voor de Azure OpenAI, inclusief de voorkeuren van de gebruiker en de lijst met bestemmingen. De prompt stuurt het model om de bestemmingen te herschikken en te scoren op basis van de opgegeven voorkeuren.

4. **API-aanroep**: De `requests` bibliotheek wordt gebruikt om een HTTP POST-verzoek te doen naar de Azure OpenAI API endpoint. De respons bevat de herschikte en gescoorde bestemmingen.

5. **Voorbeeldgebruik**: De reisagent verzamelt gebruikersvoorkeuren (bijv. interesse in sightseeing en diverse cultuur) en gebruikt de Azure OpenAI-service om herschikte en gescoorde aanbevelingen voor reisbestemmingen te krijgen.

Zorg ervoor dat je `your_azure_openai_api_key` vervangt door je eigen Azure OpenAI API-sleutel en `https://your-endpoint.com/...` met de daadwerkelijke URL van je Azure OpenAI implementatie.

Door gebruik te maken van het LLM voor re-ranking en scoring kan de reisagent persoonlijkere en relevantere reisaanbevelingen aan klanten bieden en zo hun totale ervaring verbeteren.

### RAG: Prompting Techniek vs. Tool

Retrieval-Augmented Generation (RAG) kan zowel een prompting techniek als een tool zijn in de ontwikkeling van AI-agenten. Het begrijpen van het verschil tussen beiden kan je helpen om RAG effectiever te benutten in je projecten.

#### RAG als Prompting Techniek

**Wat is het?**

- Als prompting techniek houdt RAG in dat je specifieke vragen of prompts formuleert om relevante informatie op te halen uit een grote verzameling of database. Deze informatie wordt vervolgens gebruikt om antwoorden of acties te genereren.

**Hoe het werkt:**

1. **Prompts Formuleren**: Maak goed gestructureerde prompts of queries op basis van de taak of de invoer van de gebruiker.  
2. **Informatie Ophalen**: Gebruik de prompts om relevante data te zoeken in een vooraf bestaande kennisbasis of dataset.  
3. **Antwoord Genereren**: Combineer de opgehaalde informatie met generatieve AI-modellen om een coherent en compleet antwoord te produceren.

**Voorbeeld in Reisagent:**

- Gebruikersinvoer: "Ik wil musea bezoeken in Parijs."  
- Prompt: "Vind de beste musea in Parijs."  
- Opgehaalde Info: Details over Louvre Museum, Musée d'Orsay, etc.  
- Gegeneerd Antwoord: "Hier zijn enkele topmusea in Parijs: Louvre Museum, Musée d'Orsay en Centre Pompidou."

#### RAG als Tool

**Wat is het?**

- Als tool is RAG een geïntegreerd systeem dat het ophalen en genereren automatiseert, waardoor het eenvoudiger wordt voor ontwikkelaars om complexe AI-functionaliteiten te implementeren zonder elke vraag handmatig van prompts te voorzien.

**Hoe het werkt:**

1. **Integratie**: Implementeer RAG binnen de architectuur van de AI-agent, zodat het automatisch het ophalen en genereren afhandelt.  
2. **Automatisering**: De tool regelt het hele proces, van het ontvangen van gebruikersinvoer tot het genereren van het uiteindelijke antwoord, zonder expliciete prompts voor elke stap.  
3. **Efficiëntie**: Verbetert de prestaties van de agent door het ophalen en genereren te stroomlijnen, wat snellere en nauwkeurigere antwoorden mogelijk maakt.

**Voorbeeld in Reisagent:**

- Gebruikersinvoer: "Ik wil musea bezoeken in Parijs."  
- RAG Tool: Haalt automatisch informatie over musea op en genereert een antwoord.  
- Gegeneerd Antwoord: "Hier zijn enkele topmusea in Parijs: Louvre Museum, Musée d'Orsay en Centre Pompidou."

### Vergelijking

| Aspect                   | Prompting Techniek                                   | Tool                                                    |
|--------------------------|-----------------------------------------------------|---------------------------------------------------------|
| **Handmatig vs Automatisch** | Handmatig formuleren van prompts voor elke query.    | Geautomatiseerd proces voor ophalen en genereren.        |
| **Controle**             | Biedt meer controle over het ophalen.               | Stroomlijnt en automatiseert het ophalen en genereren.   |
| **Flexibiliteit**        | Laat aangepaste prompts toe op basis van specifieke behoeften. | Efficiënter voor grootschalige implementaties.           |
| **Complexiteit**         | Vereist het opstellen en bijstellen van prompts.    | Makkelijker te integreren binnen de architectuur van een AI-agent. |

### Praktische Voorbeelden

**Prompting Techniek Voorbeeld:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```
  
**Tool Voorbeeld:**

```python
class Travel_Agent:
    def __init__(self):
        self.rag_tool = RAGTool()

    def get_museums_in_paris(self):
        user_input = "I want to visit museums in Paris."
        response = self.rag_tool.retrieve_and_generate(user_input)
        return response

travel_agent = Travel_Agent()
museums = travel_agent.get_museums_in_paris()
print("Top Museums in Paris:", museums)
```
  
### Relevantie Evalueren

Het evalueren van relevantie is een cruciaal aspect van de prestatie van AI-agenten. Het zorgt ervoor dat de informatie die door de agent wordt opgehaald en gegenereerd passend, accuraat en nuttig is voor de gebruiker. Laten we bekijken hoe relevantie geëvalueerd kan worden bij AI-agenten, inclusief praktische voorbeelden en technieken.

#### Belangrijke Concepten bij het Evalueren van Relevantie

1. **Context Bewustzijn**:  
   - De agent moet de context van de vraag van de gebruiker begrijpen om relevante informatie op te halen en te genereren.  
   - Voorbeeld: Als een gebruiker vraagt om "beste restaurants in Parijs", moet de agent rekening houden met de voorkeuren van de gebruiker, zoals type keuken en budget.

2. **Nauwkeurigheid**:  
   - De informatie die de agent geeft moet feitelijk correct en up-to-date zijn.  
   - Voorbeeld: Aanbevelen van restaurants die momenteel open zijn met goede recensies, in plaats van verouderde of gesloten opties.

3. **Gebruikersintentie**:  
   - De agent moet de intentie van de gebruiker achter de vraag afleiden om de meest relevante informatie te bieden.  
   - Voorbeeld: Bij de vraag "budgetvriendelijke hotels" moet de agent betaalbare opties prioriteren.

4. **Feedback Loop**:  
   - Continu verzamelen en analyseren van gebruikersfeedback helpt de agent om het evaluatieproces van relevantie te verbeteren.  
   - Voorbeeld: Het opnemen van gebruikersbeoordelingen en feedback op eerdere aanbevelingen om toekomstige antwoorden te verbeteren.

#### Praktische Technieken voor het Evalueren van Relevantie

1. **Relevantie Score Toekennen**:  
   - Ken aan elk opgehaald item een relevantiescore toe gebaseerd op hoe goed het aansluit bij de vraag en voorkeuren van de gebruiker.  
   - Voorbeeld:

     ```python
     def relevance_score(item, query):
         score = 0
         if item['category'] in query['interests']:
             score += 1
         if item['price'] <= query['budget']:
             score += 1
         if item['location'] == query['destination']:
             score += 1
         return score
     ```
  
2. **Filteren en Rangschikken**:  
   - Filter irrelevante items eruit en rangschik de overgebleven items op basis van hun relevantiescores.  
   - Voorbeeld:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Geef de top 10 relevante items terug
     ```
  
3. **Natuurlijke Taalverwerking (NLP)**:  
   - Gebruik NLP-technieken om de vraag van de gebruiker te begrijpen en relevante informatie op te halen.  
   - Voorbeeld:

     ```python
     def process_query(query):
         # Gebruik NLP om belangrijke informatie uit de query van de gebruiker te extraheren
         processed_query = nlp(query)
         return processed_query
     ```
  
4. **Integratie van Gebruikersfeedback**:  
   - Verzamel feedback op de verstrekte aanbevelingen en gebruik die om toekomstige relevantiebeoordelingen aan te passen.  
   - Voorbeeld:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```
  
#### Voorbeeld: Relevantiebepaling in Travel Agent

Hier is een praktisch voorbeeld van hoe Travel Agent de relevantie van reisaanbevelingen kan evalueren:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        ranked_hotels = self.filter_and_rank(hotels, self.user_preferences)
        itinerary = create_itinerary(flights, ranked_hotels, attractions)
        return itinerary

    def filter_and_rank(self, items, query):
        ranked_items = sorted(items, key=lambda item: self.relevance_score(item, query), reverse=True)
        return ranked_items[:10]  # Retourneer top 10 relevante items

    def relevance_score(self, item, query):
        score = 0
        if item['category'] in query['interests']:
            score += 1
        if item['price'] <= query['budget']:
            score += 1
        if item['location'] == query['destination']:
            score += 1
        return score

    def adjust_based_on_feedback(self, feedback, items):
        for item in items:
            if item['name'] in feedback['liked']:
                item['relevance'] += 1
            if item['name'] in feedback['disliked']:
                item['relevance'] -= 1
        return items

# Voorbeeld gebruik
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_items = travel_agent.adjust_based_on_feedback(feedback, itinerary['hotels'])
print("Updated Itinerary with Feedback:", updated_items)
```
  
### Zoeken met Intentie

Zoeken met intentie betekent dat je de achterliggende bedoeling of het doel van een gebruikersvraag begrijpt en interpreteert om de meest relevante en bruikbare informatie op te halen en te genereren. Deze benadering gaat verder dan alleen trefwoorden matchen en richt zich op het begrijpen van de daadwerkelijke behoefte en context van de gebruiker.

#### Belangrijke Concepten bij Zoeken met Intentie

1. **Begrip van Gebruikersintentie**:  
   - Gebruikersintentie kan worden onderverdeeld in drie hoofdtypen: informatief, navigerend en transactioneel.  
     - **Informatieve Intentie**: De gebruiker zoekt informatie over een onderwerp (bijv. "Wat zijn de beste musea in Parijs?").  
     - **Navigerende Intentie**: De gebruiker wil naar een specifieke website of pagina navigeren (bijv. "Officiële website Louvre Museum").  
     - **Transactionele Intentie**: De gebruiker wil een transactie uitvoeren, zoals een vlucht boeken of een aankoop doen (bijv. "Boek een vlucht naar Parijs").

2. **Context Bewustzijn**:  
   - Het analyseren van de context van de vraag van de gebruiker helpt om hun intentie nauwkeurig te identificeren. Dit omvat het meenemen van eerdere interacties, voorkeuren van de gebruiker en specifieke details van de huidige vraag.

3. **Natuurlijke Taalverwerking (NLP)**:  
   - NLP-technieken worden ingezet om de natuurlijke taalvraag te begrijpen en interpreteren. Dit omvat taken zoals entiteitsherkenning, sentimentanalyse en query parsing.

4. **Personalisatie**:  
   - Het personaliseren van de zoekresultaten op basis van de geschiedenis, voorkeuren en feedback van de gebruiker verbetert de relevantie van de opgehaalde informatie.

#### Praktisch Voorbeeld: Zoeken met Intentie in Travel Agent

Laten we Travel Agent als voorbeeld nemen om te zien hoe zoeken met intentie geïmplementeerd kan worden.

1. **Verzamelen van Gebruikersvoorkeuren**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```
  
2. **Begrip van Gebruikersintentie**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```
  
3. **Context Bewustzijn**
   ```python
   def analyze_context(query, user_history):
       # Combineer huidige vraag met gebruikersgeschiedenis om de context te begrijpen
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Zoeken en Resultaten Personaliseren**

   ```python
   def search_with_intent(query, preferences, user_history):
       intent = identify_intent(query)
       context = analyze_context(query, user_history)
       if intent == "informational":
           search_results = search_information(query, preferences)
       elif intent == "navigational":
           search_results = search_navigation(query)
       elif intent == "transactional":
           search_results = search_transaction(query, preferences)
       personalized_results = personalize_results(search_results, user_history)
       return personalized_results

   def search_information(query, preferences):
       # Voorbeeld zoeklogica voor informatieve intentie
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Voorbeeld zoeklogica voor navigatie-intentie
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Voorbeeld zoeklogica voor transactionele intentie
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Voorbeeld personalisatielogica
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Geef de top 10 gepersonaliseerde resultaten terug
   ```

5. **Voorbeeld van Gebruik**

   ```python
   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   user_history = ["Louvre Museum website", "Book flight to Paris"]
   query = "best museums in Paris"
   results = search_with_intent(query, preferences, user_history)
   print("Search Results:", results)
   ```

---

## 4. Code Genereren als een Tool

Code-genererende agenten gebruiken AI-modellen om code te schrijven en uit te voeren, waarmee ze complexe problemen oplossen en taken automatiseren.

### Code-Genererende Agenten

Code-genererende agenten gebruiken generatieve AI-modellen om code te schrijven en uit te voeren. Deze agenten kunnen complexe problemen oplossen, taken automatiseren en waardevolle inzichten bieden door code te genereren en uit te voeren in verschillende programmeertalen.

#### Praktische Toepassingen

1. **Geautomatiseerde Codegeneratie**: Genereer codefragmenten voor specifieke taken, zoals data-analyse, webscraping of machine learning.
2. **SQL als een RAG**: Gebruik SQL-query's om gegevens uit databases op te halen en te manipuleren.
3. **Probleemoplossing**: Maak en voer code uit om specifieke problemen op te lossen, zoals het optimaliseren van algoritmes of het analyseren van data.

#### Voorbeeld: Code-genererende Agent voor Data-analyse

Stel je voor dat je een code-genererende agent ontwerpt. Zo zou het kunnen werken:

1. **Taak**: Analyseer een dataset om trends en patronen te identificeren.
2. **Stappen**:
   - Laad de dataset in een data-analysetool.
   - Genereer SQL-query's om de data te filteren en samen te vatten.
   - Voer de query's uit en haal de resultaten op.
   - Gebruik de resultaten om visualisaties en inzichten te genereren.
3. **Vereiste Middelen**: Toegang tot de dataset, data-analysetools en SQL-mogelijkheden.
4. **Ervaring**: Gebruik vorige analyse-resultaten om de nauwkeurigheid en relevantie van toekomstige analyses te verbeteren.

### Voorbeeld: Code-Genererende Agent voor Reisagent

In dit voorbeeld ontwerpen we een code-genererende agent, Reisagent, die gebruikers helpt bij het plannen van reizen door code te genereren en uit te voeren. Deze agent kan taken afhandelen zoals het ophalen van reismogelijkheden, filteren van resultaten en het samenstellen van een reisplan met generatieve AI.

#### Overzicht van de Code-Genererende Agent

1. **Verzamelen van Gebruikersvoorkeuren**: Verzamelt gebruikersinvoer zoals bestemming, reisdata, budget en interesses.
2. **Genereren van Code om Gegevens op te halen**: Genereert codefragmenten om data over vluchten, hotels en attracties op te halen.
3. **Uitvoeren van de Gegeneerde Code**: Voert de gegenereerde code uit om realtime informatie op te halen.
4. **Genereren van Reisschema**: Stelt de opgehaalde data samen tot een gepersonaliseerd reisplan.
5. **Aanpassen op Basis van Feedback**: Ontvangt gebruikersfeedback en genereert zo nodig nieuwe code om de resultaten te verfijnen.

#### Stapsgewijze Implementatie

1. **Verzamelen van Gebruikersvoorkeuren**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Genereren van Code om Gegevens op te halen**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Voorbeeld: Genereer code om te zoeken naar vluchten op basis van gebruikersvoorkeuren
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Voorbeeld: Genereer code om te zoeken naar hotels
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Uitvoeren van Gegeneerde Code**

   ```python
   def execute_code(code):
       # Voer de gegenereerde code uit met exec
       exec(code)
       result = locals()
       return result

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   
   flight_code = generate_code_to_fetch_data(preferences)
   hotel_code = generate_code_to_fetch_hotels(preferences)
   
   flights = execute_code(flight_code)
   hotels = execute_code(hotel_code)

   print("Flight Options:", flights)
   print("Hotel Options:", hotels)
   ```

4. **Genereren van Reisschema**

   ```python
   def generate_itinerary(flights, hotels, attractions):
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   attractions = search_attractions(preferences)
   itinerary = generate_itinerary(flights, hotels, attractions)
   print("Suggested Itinerary:", itinerary)
   ```

5. **Aanpassen op Basis van Feedback**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Pas voorkeuren aan op basis van gebruikersfeedback
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Genereer opnieuw en voer code uit met bijgewerkte voorkeuren
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Gebruik maken van omgevingsbewustzijn en redeneren

Het gebruik van de tabelschema kan het proces van querygeneratie inderdaad verbeteren door omgevingsbewustzijn en redeneren toe te passen.

Hier is een voorbeeld van hoe dit gedaan kan worden:

1. **Begrijpen van het Schema**: Het systeem begrijpt het schema van de tabel en gebruikt deze informatie om de querygeneratie te baseren.
2. **Aanpassen op Basis van Feedback**: Het systeem past gebruikersvoorkeuren aan op basis van feedback en analyseert welke velden in het schema bijgewerkt moeten worden.
3. **Genereren en Uitvoeren van Query's**: Het systeem genereert en voert query's uit om bijgewerkte vlucht- en hotelgegevens op te halen op basis van nieuwe voorkeuren.

Hier is een bijgewerkt Python-codevoorbeeld waarin deze concepten zijn verwerkt:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Pas voorkeuren aan op basis van gebruikersfeedback
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Redeneren op basis van schema om andere gerelateerde voorkeuren aan te passen
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Aangepaste logica om voorkeuren aan te passen op basis van schema en feedback
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Genereer code om vluchtgegevens op te halen op basis van bijgewerkte voorkeuren
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Genereer code om hotelgegevens op te halen op basis van bijgewerkte voorkeuren
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simuleer uitvoering van code en retourneer voorbeeldgegevens
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Genereer reisplan op basis van vluchten, hotels en attracties
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Voorbeeldschema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Voorbeeldgebruik
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Genereer opnieuw en voer code uit met bijgewerkte voorkeuren
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Toelichting - Boeken op Basis van Feedback

1. **Schema Bewustzijn**: De `schema` dictionary definieert hoe voorkeuren moeten worden aangepast op basis van feedback. Het omvat velden zoals `favorites` en `avoid`, met bijbehorende aanpassingen.
2. **Voorkeuren Aanpassen (`adjust_based_on_feedback` methode)**: Deze methode past voorkeuren aan op basis van gebruikersfeedback en het schema.
3. **Omgevingsafhankelijke Aanpassingen (`adjust_based_on_environment` methode)**: Deze methode personaliseert de aanpassingen op basis van het schema en feedback.
4. **Genereren en Uitvoeren van Query's**: Het systeem genereert code om bijgewerkte vlucht- en hotelgegevens op te halen op basis van aangepaste voorkeuren en simuleert de uitvoering van deze query's.
5. **Genereren van Reisschema**: Het systeem maakt een bijgewerkt reisschema op basis van de nieuwe vlucht-, hotel- en attractiegegevens.

Door het systeem omgevingsbewust te maken en te laten redeneren op basis van het schema, kan het nauwkeurigere en relevantere query's genereren, wat leidt tot betere reisaanbevelingen en een meer gepersonaliseerde gebruikerservaring.

### SQL gebruiken als Retrieval-Augmented Generation (RAG) techniek

SQL (Structured Query Language) is een krachtig hulpmiddel voor interactie met databases. Wanneer het wordt gebruikt als onderdeel van een Retrieval-Augmented Generation (RAG)-benadering, kan SQL relevante data ophalen uit databases om AI-agenten te informeren en te laten reageren of handelen. Laten we onderzoeken hoe SQL als RAG-techniek gebruikt kan worden in de context van Reisagent.

#### Kernconcepten

1. **Interactie met Databases**:
   - SQL wordt gebruikt om databases te bevragen, relevante informatie op te halen en data te manipuleren.
   - Voorbeeld: Het ophalen van vluchtgegevens, hotelinformatie en attracties uit een reisdatabase.

2. **Integratie met RAG**:
   - SQL-query's worden gegenereerd op basis van gebruikersinvoer en voorkeuren.
   - De opgehaalde data wordt vervolgens gebruikt om gepersonaliseerde aanbevelingen of acties te genereren.

3. **Dynamische Querygeneratie**:
   - De AI-agent genereert dynamische SQL-query's op basis van de context en gebruikersbehoeften.
   - Voorbeeld: SQL-query's aanpassen om resultaten te filteren op budget, data en interesses.

#### Toepassingen

- **Geautomatiseerde Codegeneratie**: Genereer codefragmenten voor specifieke taken.
- **SQL als een RAG**: Gebruik SQL-query's om data te manipuleren.
- **Probleemoplossing**: Maak en voer code uit om problemen op te lossen.

**Voorbeeld**:
Een data-analyse agent:

1. **Taak**: Analyseer een dataset om trends te vinden.
2. **Stappen**:
   - Laad de dataset.
   - Genereer SQL-query's om data te filteren.
   - Voer query's uit en haal resultaten op.
   - Genereer visualisaties en inzichten.
3. **Middelen**: Toegang tot dataset, SQL-mogelijkheden.
4. **Ervaring**: Gebruik eerdere resultaten om toekomstig analyses te verbeteren.

#### Praktisch Voorbeeld: SQL gebruiken in Reisagent

1. **Verzamelen van Gebruikersvoorkeuren**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Genereren van SQL-query's**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Uitvoeren van SQL-query's**

   ```python
   import sqlite3

   def execute_sql_query(query, database="travel.db"):
       connection = sqlite3.connect(database)
       cursor = connection.cursor()
       cursor.execute(query)
       results = cursor.fetchall()
       connection.close()
       return results
   ```

4. **Genereren van Aanbevelingen**

   ```python
   def generate_recommendations(preferences):
       flight_query = generate_sql_query("flights", preferences)
       hotel_query = generate_sql_query("hotels", preferences)
       attraction_query = generate_sql_query("attractions", preferences)
       
       flights = execute_sql_query(flight_query)
       hotels = execute_sql_query(hotel_query)
       attractions = execute_sql_query(attraction_query)
       
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   itinerary = generate_recommendations(preferences)
   print("Suggested Itinerary:", itinerary)
   ```

#### Voorbeeld SQL-query's

1. **Vluchtquery**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Hotelquery**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Attractiequery**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Door SQL te gebruiken als onderdeel van de Retrieval-Augmented Generation (RAG) techniek kunnen AI-agenten zoals Reisagent dynamisch relevante data ophalen en gebruiken om nauwkeurige en gepersonaliseerde aanbevelingen te doen.

### Voorbeeld van Metacognitie

Om een implementatie van metacognitie te demonstreren, laten we een eenvoudige agent maken die *reflecteert op zijn besluitvormingsproces* terwijl hij een probleem oplost. In dit voorbeeld bouwen we een systeem waarbij een agent probeert de keuze van een hotel te optimaliseren, maar daarna zijn eigen redenering evalueert en zijn strategie aanpast wanneer hij fouten of suboptimale keuzes maakt.

We simuleren dit met een eenvoudig voorbeeld waarbij de agent hotels selecteert op basis van een combinatie van prijs en kwaliteit, maar "reflecteert" op zijn beslissingen en daaraan aanpast.

#### Hoe dit metacognitie illustreert:

1. **Initiële Beslissing**: De agent kiest het goedkoopste hotel, zonder het kwaliteitsaspect mee te wegen.
2. **Reflectie en Evaluatie**: Na de eerste keuze controleert de agent aan de hand van gebruikersfeedback of het hotel een "slechte" keuze was. Als blijkt dat de kwaliteit te laag was, reflecteert hij op zijn redenering.
3. **Strategie Aanpassen**: De agent past zijn strategie aan op basis van zijn reflectie en schakelt van "goedkoopste" naar "hoogste_kwaliteit", waardoor de besluitvorming in toekomstige rondes verbetert.

Hier is een voorbeeld:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Slaat de eerder gekozen hotels op
        self.corrected_choices = []  # Slaat de gecorrigeerde keuzes op
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Beschikbare strategieën

    def recommend_hotel(self, hotels, strategy):
        """
        Recommend a hotel based on the chosen strategy.
        The strategy can either be 'cheapest' or 'highest_quality'.
        """
        if strategy == 'cheapest':
            recommended = min(hotels, key=lambda x: x['price'])
        elif strategy == 'highest_quality':
            recommended = max(hotels, key=lambda x: x['quality'])
        else:
            recommended = None
        self.previous_choices.append((strategy, recommended))
        return recommended

    def reflect_on_choice(self):
        """
        Reflect on the last choice made and decide if the agent should adjust its strategy.
        The agent considers if the previous choice led to a poor outcome.
        """
        if not self.previous_choices:
            return "No choices made yet."

        last_choice_strategy, last_choice = self.previous_choices[-1]
        # Laten we aannemen dat we wat gebruikersfeedback hebben die ons vertelt of de laatste keuze goed was of niet
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Pas de strategie aan als de vorige keuze onbevredigend was
            new_strategy = 'highest_quality' if last_choice_strategy == 'cheapest' else 'cheapest'
            self.corrected_choices.append((new_strategy, last_choice))
            return f"Reflecting on choice. Adjusting strategy to {new_strategy}."
        else:
            return "The choice was good. No need to adjust."

    def get_user_feedback(self, hotel):
        """
        Simulate user feedback based on hotel attributes.
        For simplicity, assume if the hotel is too cheap, the feedback is "bad".
        If the hotel has quality less than 7, feedback is "bad".
        """
        if hotel['price'] < 100 or hotel['quality'] < 7:
            return "bad"
        return "good"

# Simuleer een lijst van hotels (prijs en kwaliteit)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Maak een agent aan
agent = HotelRecommendationAgent()

# Stap 1: De agent raadt een hotel aan met de "goedkoopste" strategie
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Stap 2: De agent reflecteert op de keuze en past de strategie aan indien nodig
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Stap 3: De agent raadt opnieuw aan, dit keer met de aangepaste strategie
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Metacognitieve Vermogens van Agenten

Het belangrijkste hier is het vermogen van de agent om:
- Zijn eerdere keuzes en besluitvormingsproces te evalueren.
- Zijn strategie aan te passen op basis van die reflectie, oftewel metacognitie in actie.

Dit is een eenvoudige vorm van metacognitie waarbij het systeem zijn redeneringsproces kan aanpassen op basis van interne feedback.

### Conclusie

Metacognitie is een krachtig hulpmiddel dat de mogelijkheden van AI-agenten aanzienlijk kan verbeteren. Door metacognitieve processen te integreren, kun je agenten ontwerpen die intelligenter, aanpasbaarder en efficiënter zijn. Gebruik de aanvullende bronnen om de fascinerende wereld van metacognitie in AI-agenten verder te verkennen.

### Meer Vragen over het Metacognitie Ontwerppatroon?

Word lid van de [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) om andere leerlingen te ontmoeten, spreekuren bij te wonen en je AI-agenten vragen beantwoord te krijgen.

## Vorige Les

[Multi-Agent Ontwerppatroon](../08-multi-agent/README.md)

## Volgende Les

[AI-Agenten in Productie](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet als de gezaghebbende bron worden beschouwd. Voor cruciale informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor enige misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->