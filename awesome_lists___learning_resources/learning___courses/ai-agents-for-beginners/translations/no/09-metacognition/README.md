[![Fleragentdesign](../../../translated_images/no/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Klikk på bildet ovenfor for å se video av denne leksjonen)_
# Metakognisjon i AI-agenter

## Introduksjon

Velkommen til leksjonen om metakognisjon i AI-agenter! Dette kapitlet er laget for nybegynnere som er nysgjerrige på hvordan AI-agenter kan reflektere over sine egne tenkeprosesser. Etter endt leksjon vil du forstå nøkkelkonsepter og ha praktiske eksempler for å anvende metakognisjon i design av AI-agenter.

## Læringsmål

Etter å ha fullført denne leksjonen skal du kunne:

1. Forstå implikasjonene av resonnementsløkker i agentdefinisjoner.
2. Bruke planleggings- og evalueringsmetoder for å hjelpe selvkorrigerende agenter.
3. Lage egne agenter som kan manipulere kode for å utføre oppgaver.

## Innføring i metakognisjon

Metakognisjon refererer til høyere ordens kognitive prosesser som innebærer å tenke på eget tenking. For AI-agenter betyr dette å kunne evaluere og justere handlingene sine basert på selvbevissthet og tidligere erfaringer. Metakognisjon, eller "tenking om tenking", er et viktig konsept i utviklingen av agentiske AI-systemer. Det innebærer at AI-systemer er bevisste på sine egne interne prosesser og kan overvåke, regulere og tilpasse atferden deretter. På samme måte som vi gjør når vi leser rommet eller ser på et problem. Denne selvbevisstheten kan hjelpe AI-systemer med å ta bedre beslutninger, identifisere feil og forbedre ytelsen over tid — nok en gang knyttet tilbake til Turing-testen og debatten om hvorvidt AI skal ta over.

I sammenheng med agentiske AI-systemer kan metakognisjon bidra til å løse flere utfordringer, som:
- Transparens: Sikre at AI-systemer kan forklare sin resonnering og beslutninger.
- Resonnering: Forbedre evnen til å syntetisere informasjon og ta gode beslutninger.
- Tilpasning: Gjøre det mulig for AI-systemer å tilpasse seg nye omgivelser og endrede forhold.
- Persepsjon: Forbedre nøyaktigheten til AI-systemer i å gjenkjenne og tolke data fra omgivelsene.

### Hva er metakognisjon?

Metakognisjon, eller "tenking om tenking", er en høyere ordens kognitiv prosess som involverer selvbevissthet og selvregulering av egne kognitive prosesser. Innen AI gir metakognisjon agenter mulighet til å evaluere og tilpasse strategier og handlinger, noe som fører til forbedret problemløsning og beslutningsevne. Ved å forstå metakognisjon kan du designe AI-agenter som ikke bare er mer intelligente, men også mer adaptive og effektive. I ekte metakognisjon vil du se at AI-en eksplisitt resonerer om sin egen resonnering.

Eksempel: “Jeg prioriterte billigere fly fordi… jeg kan gå glipp av direktefly, så la meg sjekke på nytt.”.
Holde oversikt over hvordan eller hvorfor den valgte en bestemt rute.
- Legge merke til at den gjorde feil fordi den overavhengig på brukerens preferanser fra forrige gang, så den endrer sin beslutningsstrategi, ikke bare den endelige anbefalingen.
- Diagnosticere mønstre som: “Hver gang jeg ser brukeren nevne ‘for trangt’, bør jeg ikke bare fjerne visse attraksjoner, men også reflektere over at metoden min for å velge ‘toppattraksjoner’ er feil hvis jeg alltid rangerer etter popularitet.”

### Viktigheten av metakognisjon i AI-agenter

![Viktigheten av metakognisjon](../../../translated_images/no/importance-of-metacognition.b381afe9aae352f7.webp)

- Selvrefleksjon: Agenter kan vurdere egen ytelse og identifisere områder for forbedring.
- Tilpasningsevne: Agenter kan endre strategier basert på tidligere erfaringer og skiftende omgivelser.
- Feilretting: Agenter kan oppdage og korrigere feil autonomt, noe som gir mer nøyaktige resultater.
- Ressursstyring: Agenter kan optimalisere bruk av ressurser, som tid og beregningskraft, ved å planlegge og evaluere handlingene sine.

## Komponenter i en AI-agent

Før vi går inn i metakognitive prosesser, er det viktig å forstå de grunnleggende komponentene i en AI-agent. En AI-agent består typisk av:

- Persona: Agentens personlighet og egenskaper, som definerer hvordan den samhandler med brukere.
- Verktøy: Evnene og funksjonene agenten kan utføre.
- Ferdigheter: Kunnskapen og ekspertisen agenten besitter.

Disse komponentene jobber sammen for å skape en "kompetenseenhet" som kan utføre spesifikke oppgaver.

**Eksempel**:
Tenk på en reisekonsulent, en agenttjeneste som ikke bare planlegger ferien din, men også justerer veien basert på sanntidsdata og tidligere kundereiserfaringer.

### Eksempel: Metakognisjon i en reisebyråtjeneste

Forestill deg at du designer en reisebyråtjeneste drevet av AI. Denne agenten, "Travel Agent," hjelper brukere med å planlegge ferie. For å innlemme metakognisjon må Travel Agent evaluere og justere sine handlinger basert på selvbevissthet og tidligere erfaringer. Slik kan metakognisjon spille en rolle:

#### Nåværende oppgave

Den nåværende oppgaven er å hjelpe en bruker med å planlegge en tur til Paris.

#### Steg for å fullføre oppgaven

1. **Samle brukerpreferanser**: Spør brukeren om reisedatoer, budsjett, interesser (f.eks. museer, mat, shopping) og eventuelle spesifikke krav.
2. **Hente informasjon**: Søk etter flyalternativer, overnattingssteder, attraksjoner og restauranter som matcher brukerens preferanser.
3. **Generere anbefalinger**: Gi en personlig reiserute med flydetaljer, hotellreservasjoner og foreslåtte aktiviteter.
4. **Justere basert på tilbakemelding**: Spør brukeren om tilbakemelding på anbefalingene og gjør nødvendige justeringer.

#### Nødvendige ressurser

- Tilgang til databaser for fly- og hotellbestillinger.
- Informasjon om parisiske attraksjoner og restauranter.
- Brukertilbakemeldingsdata fra tidligere interaksjoner.

#### Erfaring og selvrefleksjon

Travel Agent bruker metakognisjon for å evaluere sin egen ytelse og lære av tidligere erfaringer. For eksempel:

1. **Analysere brukertilbakemeldinger**: Travel Agent gjennomgår brukertilbakemeldinger for å avgjøre hvilke anbefalinger som ble godt mottatt og hvilke som ikke var det. Den justerer fremtidige forslag deretter.
2. **Tilpasningsevne**: Hvis en bruker tidligere har nevnt at de misliker overfylte steder, vil Travel Agent unngå å anbefale populære turiststeder i rushtiden i fremtiden.
3. **Feilretting**: Hvis Travel Agent gjorde en feil i en tidligere bestilling, for eksempel foreslo et hotell som var fullbooket, lærer den å sjekke tilgjengelighet mer grundig før den gir anbefalinger.

#### Praktisk utviklereksempel

Her er et forenklet eksempel på hvordan Travel Agents kode kan se ut når metakognisjon implementeres:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Søk etter flyreiser, hoteller og severdigheter basert på preferanser
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
        # Analyser tilbakemeldinger og tilpass fremtidige anbefalinger
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Eksempel på bruk
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

#### Hvorfor metakognisjon er viktig

- **Selvrefleksjon**: Agenter kan analysere egen ytelse og identifisere forbedringsområder.
- **Tilpasningsevne**: Agenter kan endre strategier basert på tilbakemeldinger og skiftende forhold.
- **Feilretting**: Agenter kan autonomt oppdage og korrigere feil.
- **Ressursstyring**: Agenter kan optimalisere ressursbruk, som tid og beregningskraft.

Ved å innlemme metakognisjon kan Travel Agent gi mer personlige og nøyaktige reiseanbefalinger, noe som forbedrer den totale brukeropplevelsen.

---

## 2. Planlegging i agenter

Planlegging er en kritisk komponent i AI-agenters atferd. Det innebærer å skissere trinnene som trengs for å oppnå et mål, med hensyn til gjeldende tilstand, ressurser og mulige hindringer.

### Elementer i planlegging

- **Nåværende oppgave**: Definer oppgaven tydelig.
- **Steg for å fullføre oppgaven**: Del opp oppgaven i håndterbare trinn.
- **Nødvendige ressurser**: Identifiser nødvendige ressurser.
- **Erfaring**: Bruk tidligere erfaringer for å informere planleggingen.

**Eksempel**:
Her er trinnene Travel Agent må ta for å hjelpe en bruker med å planlegge turen effektivt:

### Trinn for Travel Agent

1. **Samle brukerpreferanser**
   - Spør brukeren om detaljer om reisedatoer, budsjett, interesser og eventuelle spesifikke krav.
   - Eksempler: "Når planlegger du å reise?" "Hva er ditt budsjett?" "Hvilke aktiviteter liker du på ferie?"

2. **Hente informasjon**
   - Søk etter relevante reisealternativer basert på brukerens preferanser.
   - **Fly**: Se etter tilgjengelige fly innen brukerens budsjett og foretrukne reisedatoer.
   - **Overnatting**: Finn hoteller eller utleieboliger som matcher brukerens preferanser for beliggenhet, pris og fasiliteter.
   - **Attraksjoner og restauranter**: Identifiser populære attraksjoner, aktiviteter og spisesteder som samsvarer med brukerens interesser.

3. **Generere anbefalinger**
   - Samle den innhentede informasjonen i en personlig reiserute.
   - Gi detaljer som flyalternativer, hotellreservasjoner og foreslåtte aktiviteter, og sørg for å skreddersy anbefalingene til brukerens preferanser.

4. **Presentere reiseruten til brukeren**
   - Del den foreslåtte reiseruten med brukeren for gjennomgang.
   - Eksempel: "Her er et foreslått reiseopplegg for din tur til Paris. Det inkluderer flydetaljer, hotellbestillinger og en liste over anbefalte aktiviteter og restauranter. Gi meg beskjed hva du synes!"

5. **Innsamle tilbakemelding**
   - Spør brukeren om tilbakemelding på den foreslåtte reiseruten.
   - Eksempler: "Liker du flyalternativene?" "Er hotellet egnet for dine behov?" "Er det noen aktiviteter du vil legge til eller fjerne?"

6. **Justere basert på tilbakemelding**
   - Endre reiseruten basert på brukerens tilbakemelding.
   - Gjør nødvendige endringer i fly-, overnattings- og aktivitetsanbefalingene for å bedre matche brukerens preferanser.

7. **Endelig bekreftelse**
   - Presenter den oppdaterte reiseruten for brukeren for endelig bekreftelse.
   - Eksempel: "Jeg har gjort endringene basert på tilbakemeldingen din. Her er den oppdaterte reiseruten. Ser alt bra ut for deg?"

8. **Bestille og bekrefte reservasjoner**
   - Når brukeren godkjenner reiseruten, fortsett med å bestille fly, overnatting og eventuelle forhåndsplanlagte aktiviteter.
   - Send bekreftelsesdetaljer til brukeren.

9. **Gi løpende støtte**
   - Vær tilgjengelig for å hjelpe brukeren med endringer eller tillegg før og under reisen.
   - Eksempel: "Hvis du trenger mer hjelp under reisen, ta kontakt når som helst!"

### Eksempel på interaksjon

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

# Eksempel på bruk i en forespørsel om buing
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

## 3. Korrigerende RAG-system

La oss først begynne med å forstå forskjellen mellom RAG-verktøyet og forhåndsinnlasting av kontekst

![RAG vs kontekstlasting](../../../translated_images/no/rag-vs-context.9eae588520c00921.webp)

### Retrieval-forsterket generering (RAG)

RAG kombinerer et gjenfinningssystem med en generativ modell. Når en forespørsel gjøres, henter gjenfinningssystemet relevante dokumenter eller data fra en ekstern kilde, og denne innhentede informasjonen brukes til å berike inputen til den generative modellen. Dette hjelper modellen med å generere mer presise og kontekstuelt relevante svar.

I et RAG-system henter agenten relevant informasjon fra en kunnskapsbase og bruker den for å generere passende svar eller handlinger.

### Korrigerende RAG-tilnærming

Den korrigerende RAG-tilnærmingen fokuserer på å bruke RAG-teknikker for å rette opp feil og forbedre nøyaktigheten til AI-agenter. Dette innebærer:

1. **Prompting-teknikk**: Bruke spesifikke prompts for å veilede agenten i å hente relevant informasjon.
2. **Verktøy**: Implementere algoritmer og mekanismer som gjør agenten i stand til å evaluere relevansen av den innhentede informasjonen og generere korrekte svar.
3. **Evaluering**: Kontinuerlig vurdere agentens ytelse og gjøre justeringer for å forbedre nøyaktighet og effektivitet.

#### Eksempel: Korrigerende RAG i en søkeagent

Tenk på en søkeagent som henter informasjon fra nettet for å svare på brukerforespørsler. Den korrigerende RAG-tilnærmingen kan innebære:

1. **Prompting-teknikk**: Formulere søkespørringer basert på brukerens input.
2. **Verktøy**: Bruke naturlig språkbehandling og maskinlæringsalgoritmer for å rangere og filtrere søkeresultater.
3. **Evaluering**: Analysere brukertilbakemeldinger for å identifisere og korrigere unøyaktigheter i den innhentede informasjonen.

### Korrigerende RAG i Travel Agent

Korrigerende RAG (Retrieval-Augmented Generation) forbedrer en AIs evne til å hente og generere informasjon samtidig som den retter opp unøyaktigheter. La oss se hvordan Travel Agent kan bruke den korrigerende RAG-tilnærmingen for å gi mer nøyaktige og relevante reiseanbefalinger.

Dette innebærer:

- **Prompting-teknikk:** Bruke spesifikke prompts for å veilede agenten i å hente relevant informasjon.
- **Verktøy:** Implementere algoritmer og mekanismer som gjør agenten i stand til å evaluere relevansen av den hentede informasjonen og generere nøyaktige svar.
- **Evaluering:** Kontinuerlig vurdere agentens ytelse og gjøre justeringer for å forbedre nøyaktighet og effektivitet.

#### Trinn for å implementere korrigerende RAG i Travel Agent

1. **Innledende brukerinteraksjon**
   - Travel Agent samler inn brukerens innledende preferanser, som destinasjon, reisedatoer, budsjett og interesser.
   - Eksempel:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Innhenting av informasjon**
   - Travel Agent henter informasjon om fly, overnatting, attraksjoner og restauranter basert på brukerpreferansene.
   - Eksempel:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generere innledende anbefalinger**
   - Travel Agent bruker den innhentede informasjonen til å lage en personlig reiserute.
   - Eksempel:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Innhente brukertilbakemelding**
   - Travel Agent spør brukeren om tilbakemelding på de innledende anbefalingene.
   - Eksempel:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Korrigerende RAG-prosess**
   - **Prompting-teknikk**: Travel Agent formulerer nye søkespørringer basert på brukertilbakemeldingen.
     - Eksempel:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Verktøy**: Travel Agent bruker algoritmer for å rangere og filtrere nye søkeresultater, med vekt på relevans basert på brukertilbakemeldingen.
     - Eksempel:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Evaluering**: Travel Agent vurderer kontinuerlig relevansen og nøyaktigheten av anbefalingene ved å analysere brukertilbakemeldinger og gjøre nødvendige justeringer.
     - Eksempel:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktisk eksempel

Her er et forenklet Python-eksempel som integrerer den korrigerende RAG-tilnærmingen i Travel Agent:

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

# Eksempel på bruk
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

### Forhåndsinnlasting av kontekst
Forhåndslastning av kontekst innebærer å laste relevant kontekst eller bakgrunnsinformasjon inn i modellen før en forespørsel behandles. Dette betyr at modellen har tilgang til denne informasjonen fra starten, noe som kan hjelpe den med å generere mer informerte svar uten å måtte hente ekstra data underveis.

Her er et forenklet eksempel på hvordan en forhåndslastning av kontekst kan se ut for en reisebyråapplikasjon i Python:

```python
class TravelAgent:
    def __init__(self):
        # Forhåndslast populære destinasjoner og deres informasjon
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Hent destinasjonsinformasjon fra forhåndslastet kontekst
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Eksempel på bruk
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Forklaring

1. **Initialisering (`__init__`-metode)**: `TravelAgent`-klassen forhåndslaster en ordbok som inneholder informasjon om populære reisemål som Paris, Tokyo, New York og Sydney. Denne ordboken inkluderer detaljer som land, valuta, språk og hovedattraksjoner for hvert reisemål.

2. **Henting av informasjon (`get_destination_info`-metode)**: Når en bruker spør om et bestemt reisemål, henter `get_destination_info`-metoden relevant informasjon fra den forhåndslastede kontekstordboken.

Ved å forhåndslaste konteksten kan reisebyråapplikasjonen raskt svare på brukerforespørsler uten å måtte hente denne informasjonen fra en ekstern kilde i sanntid. Dette gjør applikasjonen mer effektiv og responsiv.

### Starte planen med et mål før iterasjon

Å bootstrappe en plan med et mål innebærer å starte med et klart mål eller ønsket resultat. Ved å definere dette målet på forhånd kan modellen bruke det som et veiledende prinsipp gjennom den iterative prosessen. Dette bidrar til at hver iterasjon kommer nærmere å oppnå ønsket resultat, og gjør prosessen mer effektiv og fokusert.

Her er et eksempel på hvordan du kan bootstrappe en reiseplan med et mål før iterasjon for et reisebyrå i Python:

### Scenario

Et reisebyrå ønsker å planlegge en tilpasset ferie for en klient. Målet er å lage en reiserute som maksimerer klientens tilfredshet basert på deres preferanser og budsjett.

### Trinn

1. Definer klientens preferanser og budsjett.
2. Bootstrap den innledende planen basert på disse preferansene.
3. Iterer for å forbedre planen, og optimaliser for klientens tilfredshet.

#### Python-kode

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

# Eksempel på bruk
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

#### Kodeforklaring

1. **Initialisering (`__init__`-metode)**: `TravelAgent`-klassen initieres med en liste over potensielle reisemål, hver med attributter som navn, kostnad og aktivitetstype.

2. **Bootstrapping av planen (`bootstrap_plan`-metode)**: Denne metoden oppretter en innledende reiseplan basert på klientens preferanser og budsjett. Den itererer gjennom listen over reisemål og legger dem til planen hvis de matcher klientens preferanser og passer innenfor budsjettet.

3. **Matchende preferanser (`match_preferences`-metode)**: Denne metoden sjekker om et reisemål samsvarer med klientens preferanser.

4. **Iterere planen (`iterate_plan`-metode)**: Denne metoden forbedrer den innledende planen ved å forsøke å erstatte hvert reisemål i planen med en bedre match, med hensyn til klientens preferanser og budsjettbegrensninger.

5. **Beregning av kostnad (`calculate_cost`-metode)**: Denne metoden beregner totalkostnaden for den nåværende planen, inkludert et potensielt nytt reisemål.

#### Eksempel på bruk

- **Innledende plan**: Reisebyrået lager en innledende plan basert på klientens preferanser for sightseeing og et budsjett på $2000.
- **Forbedret plan**: Reisebyrået itererer planen og optimaliserer for klientens preferanser og budsjett.

Ved å bootstrappe planen med et klart mål (for eksempel å maksimere klienttilfredshet) og iterere for å forbedre planen, kan reisebyrået lage en tilpasset og optimalisert reiserute for klienten. Denne tilnærmingen sørger for at reiseplanen samsvarer med klientens preferanser og budsjett fra starten av og forbedres for hver iterasjon.

### Dra nytte av LLM for omrangering og poengsetting

Store språkmodeller (LLMs) kan brukes til omrangering og poengsetting ved å evaluere relevansen og kvaliteten på hentede dokumenter eller genererte svar. Slik fungerer det:

**Innhenting:** Det innledende innhentingssteget henter et sett med kandidatdokumenter eller svar basert på forespørselen.

**Omrangering:** LLM-en evaluerer disse kandidatene og omrangerer dem basert på deres relevans og kvalitet. Dette steget sikrer at den mest relevante og høykvalitetsinformasjonen presenteres først.

**Poengsetting:** LLM-en tildeler poeng til hver kandidat som reflekterer deres relevans og kvalitet. Dette hjelper med å velge det beste svaret eller dokumentet for brukeren.

Ved å utnytte LLM-er til omrangering og poengsetting kan systemet gi mer nøyaktig og kontekstuelt relevant informasjon, og forbedre den totale brukeropplevelsen.

Her er et eksempel på hvordan et reisebyrå kan bruke en stor språkmodell (LLM) til å omrangere og poengsette reisemål basert på brukerpreferanser i Python:

#### Scenario - Reise basert på preferanser

Et reisebyrå ønsker å anbefale de beste reisemålene til en klient basert på deres preferanser. LLM-en vil hjelpe med å omrangere og poengsette reisemålene for å sikre at de mest relevante alternativene presenteres.

#### Trinn:

1. Samle brukerpreferanser.
2. Hent en liste over potensielle reisemål.
3. Bruk LLM for å omrangere og poengsette reisemålene basert på brukerens preferanser.

Slik kan du oppdatere det foregående eksempelet for å bruke Azure OpenAI Services:

#### Krav

1. Du må ha et Azure-abonnement.
2. Opprett en Azure OpenAI-ressurs og skaff din API-nøkkel.

#### Eksempel på Python-kode

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Generer en prompt for Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Definer headere og nyttelast for forespørselen
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Kall Azure OpenAI API-en for å hente de omrangerte og poengsatte destinasjonene
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Trekk ut og returner anbefalingene
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

# Eksempel på bruk
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

#### Kodeforklaring - Preference Booker

1. **Initialisering**: `TravelAgent`-klassen initialiseres med en liste over potensielle reisemål, hver med attributter som navn og beskrivelse.

2. **Henter anbefalinger (`get_recommendations`-metode)**: Denne metoden genererer en prompt for Azure OpenAI-tjenesten basert på brukerens preferanser og gjør en HTTP POST-forespørsel til Azure OpenAI API for å få omrangerte og poengsatte reisemål.

3. **Generering av prompt (`generate_prompt`-metode)**: Denne metoden bygger en prompt for Azure OpenAI, inkludert brukerens preferanser og listen over reisemål. Prompten veileder modellen til å omrangere og poengsette reisemålene basert på de oppgitte preferansene.

4. **API-kall**: `requests`-biblioteket brukes til å gjøre en HTTP POST-forespørsel til Azure OpenAI API-endepunktet. Responsen inneholder de omrangerte og poengsatte reisemålene.

5. **Eksempel på bruk**: Reisebyrået samler brukerpreferanser (for eksempel interesse for sightseeing og mangfoldig kultur) og bruker Azure OpenAI-tjenesten for å få omrangerte og poengsatte anbefalinger for reisemål.

Pass på å erstatte `your_azure_openai_api_key` med din faktiske Azure OpenAI API-nøkkel og `https://your-endpoint.com/...` med den faktiske endepunkt-URL-en for din Azure OpenAI-distribusjon.

Ved å bruke LLM for omrangering og poengsetting kan reisebyrået gi mer personaliserte og relevante reiseanbefalinger til klienter, og forbedre deres totale opplevelse.

### RAG: Prompting-teknikk vs. verktøy

Retrieval-Augmented Generation (RAG) kan være både en prompting-teknikk og et verktøy i utviklingen av AI-agenter. Å forstå forskjellen mellom de to kan hjelpe deg å utnytte RAG mer effektivt i prosjektene dine.

#### RAG som en prompting-teknikk

**Hva er det?**

- Som en prompting-teknikk innebærer RAG å formulere spesifikke forespørsler eller prompts for å styre innhentingen av relevant informasjon fra et stort korpus eller en database. Denne informasjonen brukes deretter til å generere svar eller handlinger.

**Hvordan det fungerer:**

1. **Formulere prompts**: Lag velstrukturerte prompts eller forespørsler basert på oppgaven eller brukerens innspill.
2. **Hente informasjon**: Bruk promptene til å søke etter relevante data fra en eksisterende kunnskapsbase eller dataset.
3. **Generere svar**: Kombiner den hentede informasjonen med generative AI-modeller for å produsere et omfattende og sammenhengende svar.

**Eksempel i reisebyrå**:

- Brukerinput: "Jeg vil besøke museer i Paris."
- Prompt: "Finn toppmuseer i Paris."
- Hentet informasjon: Detaljer om Louvre Museum, Musée d'Orsay, osv.
- Generert svar: "Her er noen toppmuseer i Paris: Louvre Museum, Musée d'Orsay og Centre Pompidou."

#### RAG som et verktøy

**Hva er det?**

- Som et verktøy er RAG et integrert system som automatiserer innhentings- og genereringsprosessen, noe som gjør det enklere for utviklere å implementere komplekse AI-funksjonaliteter uten å manuelt lage prompts for hver forespørsel.

**Hvordan det fungerer:**

1. **Integrasjon**: Integrer RAG i AI-agentens arkitektur, slik at den automatisk kan håndtere innhentings- og genereringsoppgavene.
2. **Automatisering**: Verktøyet håndterer hele prosessen, fra mottak av brukerinput til generering av det endelige svaret, uten å kreve eksplisitte prompts for hvert steg.
3. **Effektivitet**: Forbedrer agentens ytelse ved å strømlinjeforme innhentings- og genereringsprosessen, noe som muliggjør raskere og mer nøyaktige svar.

**Eksempel i reisebyrå**:

- Brukerinput: "Jeg vil besøke museer i Paris."
- RAG-verktøy: Henter automatisk informasjon om museer og genererer et svar.
- Generert svar: "Her er noen toppmuseer i Paris: Louvre Museum, Musée d'Orsay og Centre Pompidou."

### Sammenligning

| Aspekt                 | Prompting-teknikk                                        | Verktøy                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Manuell vs Automatisk**| Manuell utforming av prompts for hver forespørsel.               | Automatisert prosess for innhenting og generering.       |
| **Kontroll**            | Gir mer kontroll over innhentingsprosessen.             | Forenkler og automatiserer innhenting og generering.|
| **Fleksibilitet**        | Tillater tilpassede prompts basert på spesifikke behov.      | Mer effektiv for storskala implementeringer.       |
| **Kompleksitet**         | Krever utforming og justering av prompts.                  | Enklere å integrere i en AI-agents arkitektur. |

### Praktiske eksempler

**Eksempel på prompting-teknikk:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Eksempel på verktøy:**

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

### Evaluering av relevans

Evaluering av relevans er et avgjørende aspekt ved ytelsen til AI-agenter. Det sikrer at informasjonen som hentes og genereres av agenten er passende, nøyaktig og nyttig for brukeren. La oss utforske hvordan man kan evaluere relevans i AI-agenter, inkludert praktiske eksempler og teknikker.

#### Nøkkelkonsepter i evaluering av relevans

1. **Kontekstforståelse**:
   - Agenten må forstå konteksten i brukerens forespørsel for å hente og generere relevant informasjon.
   - Eksempel: Hvis en bruker spør om "beste restauranter i Paris", bør agenten vurdere brukerens preferanser, slik som type mat og budsjett.

2. **Nøyaktighet**:
   - Informasjonen som agenten gir bør være faktuelt korrekt og oppdatert.
   - Eksempel: Anbefale restauranter som er åpne og har gode anmeldelser i stedet for utdaterte eller stengte alternativer.

3. **Brukerintensjon**:
   - Agenten bør slutte seg til brukerens intensjon bak forespørselen for å gi det mest relevante resultatet.
   - Eksempel: Hvis en bruker spør om "budsjettvennlige hoteller", bør agenten prioritere rimelige alternativer.

4. **Tilbakemeldingssløyfe**:
   - Kontinuerlig innsamling og analyse av brukerfeedback hjelper agenten å raffinere prosessen for evaluering av relevans.
   - Eksempel: Inkludere brukervurderinger og tilbakemeldinger på tidligere anbefalinger for å forbedre fremtidige svar.

#### Praktiske teknikker for evaluering av relevans

1. **Relevansscore**:
   - Tildel en relevansscore til hvert hentet element basert på hvor godt det matcher brukerens forespørsel og preferanser.
   - Eksempel:

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

2. **Filtrering og rangering**:
   - Filtrer ut irrelevante elementer og ranger de resterende basert på deres relevansscore.
   - Eksempel:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Returner de 10 mest relevante elementene
     ```

3. **Natural Language Processing (NLP)**:
   - Bruk NLP-teknikker for å forstå brukerens forespørsel og hente relevant informasjon.
   - Eksempel:

     ```python
     def process_query(query):
         # Bruk NLP for å hente ut nøkkelinformasjon fra brukerens forespørsel
         processed_query = nlp(query)
         return processed_query
     ```

4. **Integrering av brukertilbakemelding**:
   - Samle brukertilbakemeldinger på de gitte anbefalingene og bruk det til å justere fremtidige evalueringer av relevans.
   - Eksempel:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Eksempel: Evaluering av relevans i reisebyrå

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
        return ranked_items[:10]  # Returner de 10 mest relevante elementene

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

# Eksempel på bruk
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

### Søk med intensjon

Søk med intensjon innebærer å forstå og tolke det underliggende formålet eller målet bak en brukers forespørsel for å hente og generere den mest relevante og nyttige informasjonen. Denne tilnærmingen går utover bare å matche nøkkelord og fokuserer på å gripe brukerens faktiske behov og kontekst.

#### Nøkkelkonsepter i søk med intensjon

1. **Forstå brukerintensjon**:
   - Brukerintensjon kan kategoriseres i tre hovedtyper: informasjons-, navigasjons- og transaksjonsintensjon.
     - **Informasjonsintensjon**: Brukeren søker informasjon om et tema (f.eks. "Hva er de beste museene i Paris?").
     - **Navigasjonsintensjon**: Brukeren ønsker å navigere til et spesifikt nettsted eller en side (f.eks. "Louvre Museum official website").
     - **Transaksjonsintensjon**: Brukeren har som mål å utføre en handling, som å bestille en flyreise eller gjøre et kjøp (f.eks. "Book a flight to Paris").

2. **Kontekstbevissthet**:
   - Å analysere konteksten i brukerens forespørsel hjelper med å identifisere intensjonen nøyaktig. Dette inkluderer å vurdere tidligere interaksjoner, brukerpreferanser og de spesifikke detaljene i den nåværende forespørselen.

3. **Natural Language Processing (NLP)**:
   - NLP-teknikker brukes for å forstå og tolke de naturlige språkforespørslene som brukerne skriver. Dette inkluderer oppgaver som entitetsgjenkjenning, sentimentanalyse og parsing av forespørsler.

4. **Personalisering**:
   - Å personalisere søkeresultatene basert på brukerens historikk, preferanser og tilbakemeldinger øker relevansen av den hentede informasjonen.

#### Praktisk eksempel: Søk med intensjon i reisebyrå

La oss ta reisebyrået som et eksempel for å se hvordan søk med intensjon kan implementeres.

1. **Innsamling av brukerpreferanser**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Forstå brukerintensjon**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Kontekstforståelse**
   ```python
   def analyze_context(query, user_history):
       # Kombiner gjeldende forespørsel med brukerhistorikk for å forstå konteksten
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Søk og tilpass resultater**

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
       # Eksempel på søkelogikk for informasjonsintensjon
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Eksempel på søkelogikk for navigasjonsintensjon
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Eksempel på søkelogikk for transaksjonell intensjon
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Eksempel på personaliseringslogikk
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Returner topp 10 personaliserte resultater
   ```

5. **Eksempel på bruk**

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

## 4. Generering av kode som et verktøy

Kodegenererende agenter bruker AI-modeller til å skrive og kjøre kode, løse komplekse problemer og automatisere oppgaver.

### Kodegenererende agenter

Kodegenererende agenter bruker generative AI-modeller for å skrive og kjøre kode. Disse agentene kan løse komplekse problemer, automatisere oppgaver og gi verdifulle innsikter ved å generere og kjøre kode i ulike programmeringsspråk.

#### Praktiske anvendelser

1. **Automatisert kodegenerering**: Generer kodebiter for spesifikke oppgaver, som dataanalyse, webskraping eller maskinlæring.
2. **SQL som en RAG**: Bruk SQL-spørringer for å hente og manipulere data fra databaser.
3. **Problemløsning**: Opprett og kjør kode for å løse spesifikke problemer, som å optimalisere algoritmer eller analysere data.

#### Eksempel: Kodegenererende agent for dataanalyse

Forestill deg at du designer en kodegenererende agent. Slik kan den fungere:

1. **Oppgave**: Analyser et datasett for å identifisere trender og mønstre.
2. **Trinn**:
   - Last inn datasettet i et dataanalyseverktøy.
   - Generer SQL-spørringer for å filtrere og aggregere dataene.
   - Kjør spørringene og hent resultatene.
   - Bruk resultatene til å generere visualiseringer og innsikter.
3. **Nødvendige ressurser**: Tilgang til datasettet, dataanalyseverktøy og SQL-muligheter.
4. **Erfaring**: Bruk tidligere analyseresultater for å forbedre nøyaktigheten og relevansen i fremtidige analyser.

### Eksempel: Kodegenererende agent for reiseagent

I dette eksempelet vil vi designe en kodegenererende agent, Reiseagent, for å hjelpe brukere med å planlegge sine reiser ved å generere og kjøre kode. Denne agenten kan håndtere oppgaver som å hente reisealternativer, filtrere resultater og sette sammen en reiserute ved hjelp av generativ AI.

#### Oversikt over kodegenererende agent

1. **Innsamling av brukerpreferanser**: Samler brukerinput som destinasjon, reisedatoer, budsjett og interesser.
2. **Generering av kode for å hente data**: Genererer kodebiter for å hente data om fly, hoteller og attraksjoner.
3. **Kjøre generert kode**: Kjører den genererte koden for å hente sanntidsinformasjon.
4. **Generere reiserute**: Kompilerer de innhentede dataene til en personlig reiseplan.
5. **Justere basert på tilbakemelding**: Mottar brukerfeedback og regenererer kode ved behov for å forbedre resultatene.

#### Trinnvis implementering

1. **Innsamling av brukerpreferanser**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generering av kode for å hente data**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Eksempel: Generer kode for å søke etter flyreiser basert på brukerpreferanser
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Eksempel: Generer kode for å søke etter hoteller
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Kjøre generert kode**

   ```python
   def execute_code(code):
       # Kjør den genererte koden med exec
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

4. **Generere reiserute**

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

5. **Justere basert på tilbakemelding**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Juster preferanser basert på brukerens tilbakemeldinger
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Regenerer og kjør kode med oppdaterte preferanser
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Utnyttelse av miljøbevissthet og resonnement

Å basere seg på skjemaet til tabellen kan faktisk forbedre spørringsgenereringsprosessen ved å utnytte miljøbevissthet og resonnement.

Her er et eksempel på hvordan dette kan gjøres:

1. **Forstå skjemaet**: Systemet vil forstå skjemaet til tabellen og bruke denne informasjonen for å forankre spørringsgenereringen.
2. **Justere basert på tilbakemelding**: Systemet vil justere brukerpreferanser basert på tilbakemelding og resonnere om hvilke felt i skjemaet som må oppdateres.
3. **Generere og kjøre spørringer**: Systemet vil generere og kjøre spørringer for å hente oppdatert fly- og hotellinformasjon basert på de nye preferansene.

Her er et oppdatert Python-kodeeksempel som inkorporerer disse konseptene:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Juster preferansene basert på brukerens tilbakemeldinger
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Resonnement basert på skjema for å justere andre relaterte preferanser
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Egendefinert logikk for å justere preferanser basert på skjema og tilbakemeldinger
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Generer kode for å hente flydata basert på oppdaterte preferanser
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Generer kode for å hente hotelldata basert på oppdaterte preferanser
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simuler kjøring av kode og returner fiktive data
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Generer reiserute basert på fly, hoteller og attraksjoner
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Eksempel på skjema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Eksempel på bruk
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Generer på nytt og kjør kode med oppdaterte preferanser
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Forklaring - Booking basert på tilbakemelding

1. **Skjema-bevissthet**: Ordboken `schema` definerer hvordan preferanser skal justeres basert på tilbakemelding. Den inkluderer felt som `favorites` og `avoid`, med tilsvarende justeringer.
2. **Justere preferanser (`adjust_based_on_feedback` method)**: Denne metoden justerer preferanser basert på brukerens tilbakemelding og skjemaet.
3. **Miljøbaserte justeringer (`adjust_based_on_environment` method)**: Denne metoden tilpasser justeringene basert på skjemaet og tilbakemeldingen.
4. **Generere og kjøre spørringer**: Systemet genererer kode for å hente oppdatert fly- og hotellinformasjon basert på de justerte preferansene og simulerer kjøringen av disse spørringene.
5. **Generere reiserute**: Systemet lager en oppdatert reiserute basert på de nye fly-, hotell- og attraksjonsdataene.

Ved å gjøre systemet miljøbevisst og la det resonnere basert på skjemaet, kan det generere mer nøyaktige og relevante spørringer, noe som fører til bedre reiseanbefalinger og en mer personlig brukeropplevelse.

### Bruk av SQL som en Retrieval-Augmented Generation (RAG)-teknikk

SQL (Structured Query Language) er et kraftig verktøy for å samhandle med databaser. Når det brukes som en del av en Retrieval-Augmented Generation (RAG)-tilnærming, kan SQL hente relevant data fra databaser for å informere og generere svar eller handlinger i AI-agenter. La oss utforske hvordan SQL kan brukes som en RAG-teknikk i konteksten til Reiseagent.

#### Nøkkelkonsepter

1. **Databaseinteraksjon**:
   - SQL brukes for å forespørre databaser, hente relevant informasjon og manipulere data.
   - Eksempel: Hente flydetaljer, hotellinformasjon og attraksjoner fra en reisedatabase.

2. **Integrasjon med RAG**:
   - SQL-spørringer genereres basert på brukerinput og preferanser.
   - De hentede dataene brukes deretter for å generere personlige anbefalinger eller handlinger.

3. **Dynamisk spørringsgenerering**:
   - AI-agenten genererer dynamiske SQL-spørringer basert på kontekst og brukerbehov.
   - Eksempel: Tilpasse SQL-spørringer for å filtrere resultater basert på budsjett, datoer og interesser.

#### Anvendelser

- **Automatisert kodegenerering**: Generer kodebiter for spesifikke oppgaver.
- **SQL som en RAG**: Bruk SQL-spørringer for å manipulere data.
- **Problemløsning**: Opprett og kjør kode for å løse problemer.

**Eksempel**:
En dataanalyseagent:

1. **Oppgave**: Analyser et datasett for å finne trender.
2. **Trinn**:
   - Last inn datasettet.
   - Generer SQL-spørringer for å filtrere data.
   - Kjør spørringene og hent resultatene.
   - Generer visualiseringer og innsikter.
3. **Ressurser**: Tilgang til datasett, SQL-muligheter.
4. **Erfaring**: Bruk tidligere resultater for å forbedre fremtidige analyser.

#### Praktisk eksempel: Bruke SQL i Reiseagent

1. **Innsamling av brukerpreferanser**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generering av SQL-spørringer**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Kjøring av SQL-spørringer**

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

4. **Generere anbefalinger**

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

#### Eksempel på SQL-spørringer

1. **Flyspørring**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Hotellspørring**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Attraksjonsspørring**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Ved å bruke SQL som en del av Retrieval-Augmented Generation (RAG)-teknikken, kan AI-agenter som Reiseagent dynamisk hente og utnytte relevant data for å gi nøyaktige og personlige anbefalinger.

### Eksempel på metakognisjon

For å demonstrere en implementering av metakognisjon, la oss lage en enkel agent som reflekterer over sin beslutningsprosess mens den løser et problem. I dette eksempelet bygger vi et system hvor en agent forsøker å optimalisere valget av hotell, men deretter evaluerer sin egen resonnement og justerer strategien når den gjør feil eller suboptimale valg.

Vi vil simulere dette ved å bruke et enkelt eksempel der agenten velger hoteller basert på en kombinasjon av pris og kvalitet, men den vil "reflektere" over sine avgjørelser og justere seg deretter.

#### Hvordan dette illustrerer metakognisjon:

1. **Innledende beslutning**: Agenten vil velge det billigste hotellet, uten å forstå kvalitetsinnvirkningen.
2. **Refleksjon og evaluering**: Etter det innledende valget vil agenten sjekke om hotellet var et "dårlig" valg ved hjelp av brukerfeedback. Hvis den finner at hotellets kvalitet var for lav, reflekterer den over sin resonnement.
3. **Justering av strategi**: Agenten justerer strategien basert på sin refleksjon og bytter fra "cheapest" til "highest_quality", og forbedrer dermed beslutningsprosessen i fremtidige iterasjoner.

Her er et eksempel:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Lagrer hotellene som ble valgt tidligere
        self.corrected_choices = []  # Lagrer de korrigerte valgene
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Tilgjengelige strategier

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
        # La oss anta at vi har noe brukertilbakemelding som forteller oss om det siste valget var bra eller ikke
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Juster strategien hvis det forrige valget var utilfredsstillende
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

# Simuler en liste over hoteller (pris og kvalitet)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Opprett en agent
agent = HotelRecommendationAgent()

# Trinn 1: Agenten anbefaler et hotell ved å bruke strategien "billigst"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Trinn 2: Agenten reflekterer over valget og justerer strategien om nødvendig
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Trinn 3: Agenten anbefaler igjen, denne gangen ved å bruke den justerte strategien
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Agenters metakognitive evner

Det viktigste her er agentens evne til å:
- Evaluere sine tidligere valg og beslutningsprosess.
- Justere sin strategi basert på den refleksjonen, altså metakognisjon i aksjon.

Dette er en enkel form for metakognisjon hvor systemet er i stand til å justere sin resonnementprosess basert på intern feedback.

### Konklusjon

Metakognisjon er et kraftig verktøy som kan forbedre kapabilitetene til AI-agenter betydelig. Ved å inkorporere metakognitive prosesser kan du designe agenter som er mer intelligente, tilpasningsdyktige og effektive. Bruk de ekstra ressursene for å utforske den fascinerende verdenen av metakognisjon i AI-agenter videre.

### Har du flere spørsmål om designmønsteret for metakognisjon?

Bli med i [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) for å møte andre lærende, delta på kontortid og få svar på spørsmål om AI-agenter.

## Forrige leksjon

[Designmønster for flere agenter](../08-multi-agent/README.md)

## Neste leksjon

[AI-agenter i produksjon](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Ansvarsfraskrivelse:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det originale dokumentet på sitt opprinnelige språk bør betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som følge av bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->