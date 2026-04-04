[![Dizajn više agenata](../../../translated_images/hr/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Kliknite gornju sliku da pogledate video ove lekcije)_
# Metakognicija u AI agentima

## Uvod

Dobrodošli na lekciju o metakogniciji u AI agentima! Ovo poglavlje je namijenjeno početnicima koji su znatiželjni kako AI agenti mogu razmišljati o vlastitim procesima mišljenja. Do kraja ove lekcije razumjet ćete ključne pojmove i bit ćete opremljeni praktičnim primjerima za primjenu metakognicije u dizajnu AI agenata.

## Ciljevi učenja

Nakon završetka ove lekcije moći ćete:

1. Razumjeti implikacije petlji rezoniranja u definicijama agenata.
2. Koristiti tehnike planiranja i evaluacije kako biste pomogli agentima da se samokorigiraju.
3. Kreirati vlastite agente sposobne manipulirati kodom kako bi obavljali zadatke.

## Uvod u metakogniciju

Metakognicija se odnosi na kognitivne procese višeg reda koji uključuju razmišljanje o vlastitom razmišljanju. Za AI agente to znači biti sposoban procijeniti i prilagoditi svoje akcije na temelju samosvijesti i prošlih iskustava. Metakognicija, ili "razmišljanje o razmišljanju", važan je koncept u razvoju agentnih AI sustava. Podrazumijeva da AI sustavi budu svjesni vlastitih unutarnjih procesa i sposobni nadzirati, regulirati i prilagođavati svoje ponašanje u skladu s tim. Baš kao što mi činimo kada čitamo prostoriju ili promatramo problem. Ova samosvijest može pomoći AI sustavima da donose bolje odluke, identificiraju pogreške i poboljšaju svoj učinak tijekom vremena — što opet povezuje s Turingovim testom i raspravom o tome hoće li AI preuzeti kontrolu.

U kontekstu agentnih AI sustava, metakognicija može pomoći u rješavanju nekoliko izazova, kao što su:
- Transparentnost: Osiguravanje da AI sustavi mogu objasniti svoje rezoniranje i odluke.
- Rezoniranje: Unapređenje sposobnosti AI sustava da sintetiziraju informacije i donose ispravne odluke.
- Prilagodba: Omogućavanje AI sustavima da se prilagode novim okruženjima i promjenjivim uvjetima.
- Percepcija: Poboljšanje točnosti AI sustava u prepoznavanju i interpretaciji podataka iz okoline.

### Što je metakognicija?

Metakognicija, ili "razmišljanje o razmišljanju", je kognitivni proces višeg reda koji uključuje samosvijest i samoregulaciju vlastitih kognitivnih procesa. U području AI-a, metakognicija osnažuje agente da procjenjuju i prilagođavaju svoje strategije i akcije, što vodi do poboljšanih sposobnosti rješavanja problema i donošenja odluka. Razumijevanjem metakognicije možete dizajnirati AI agente koji nisu samo inteligentniji nego i prilagodljiviji i učinkovitiji. U pravoj metakogniciji vidjeli biste da AI eksplicitno rezonira o vlastitom rezoniranju.

Primjer: „Prioritizirao sam jeftinije letove jer… Mogao bih propustiti direktne letove, pa ću ponovno provjeriti.“  
Praćenje kako ili zašto je odabrao određenu rutu.  
- Uočavanje da je pogriješio zato što se previše oslanjao na korisničke preferencije iz prethodnog puta, pa mijenja svoju strategiju donošenja odluka, a ne samo konačnu preporuku.  
- Dijagnosticiranje obrazaca poput: „Kad god vidim da korisnik spomene ‘previše gužve’, ne bih samo trebao izbaciti određene atrakcije, već i razmisliti da je moja metoda odabira ‘najboljih atrakcija’ pogrešna ako ih uvijek rangiram prema popularnosti.“

### Važnost metakognicije u AI agentima

![Važnost metakognicije](../../../translated_images/hr/importance-of-metacognition.b381afe9aae352f7.webp)

- Samorefleksija: Agenti mogu procijeniti vlastitu izvedbu i identificirati područja za poboljšanje.
- Prilagodljivost: Agenti mogu mijenjati svoje strategije na temelju prošlih iskustava i promjenjivih okolnosti.
- Ispravljanje pogrešaka: Agenti mogu autonomno otkriti i ispraviti pogreške, što vodi do točnijih ishoda.
- Upravljanje resursima: Agenti mogu optimizirati upotrebu resursa, kao što su vrijeme i računalna snaga, planiranjem i evaluacijom svojih akcija.

## Komponente AI agenta

Prije nego što zaronimo u metakognitivne procese, važno je razumjeti osnovne komponente AI agenta. AI agent obično se sastoji od:

- Persona: Osobnost i karakteristike agenta, koje definiraju kako komunicira s korisnicima.
- Alati: Sposobnosti i funkcije koje agent može izvesti.
- Vještine: Znanje i stručnost koju agent posjeduje.

Ove komponente zajedno stvaraju "jedinicu stručnosti" koja može obavljati specifične zadatke.

**Primjer**:  
Zamislite turističkog agenta, usluge agenta koje ne samo da planiraju vaš odmor nego i prilagođavaju svoj put na temelju podataka u stvarnom vremenu i prošlih iskustava putovanja korisnika.

### Primjer: Metakognicija u usluzi turističkog agenta

Zamislite da dizajnirate uslugu turističkog agenta pokretanu AI-jem. Ovaj agent, "Turistički agent", pomaže korisnicima u planiranju njihovih odmora. Da bi uključio metakogniciju, Turistički agent treba procjenjivati i prilagođavati svoje akcije na temelju samosvijesti i prošlih iskustava. Evo kako metakognicija može igrati ulogu:

#### Trenutni zadatak

Trenutni zadatak je pomoći korisniku planirati putovanje u Pariz.

#### Koraci za dovršetak zadatka

1. **Prikupljanje korisničkih preferencija**: Pitati korisnika o datumima putovanja, proračunu, interesima (npr. muzeji, kuhinja, shopping) i bilo kakvim posebnim zahtjevima.  
2. **Dohvaćanje informacija**: Pretražiti opcije letova, smještaja, atrakcija i restorana koje odgovaraju korisnikovim preferencijama.  
3. **Generiranje preporuka**: Pružiti personalizirani itinerar s detaljima o letovima, rezervacijama hotela i predloženim aktivnostima.  
4. **Prilagodba na temelju povratne informacije**: Pitati korisnika za povratnu informaciju o preporukama i izvršiti potrebne prilagodbe.

#### Potrebni resursi

- Pristup bazama podataka za rezervaciju letova i hotela.  
- Informacije o pariškim atrakcijama i restoranima.  
- Podaci o povratnim informacijama korisnika iz prethodnih interakcija.

#### Iskustvo i samorefleksija

Turistički agent koristi metakogniciju za procjenu svoje izvedbe i učenje iz prošlih iskustava. Na primjer:

1. **Analiza povratnih informacija korisnika**: Turistički agent pregledava povratne informacije kako bi utvrdio koje su preporuke bile dobro prihvaćene, a koje nisu. Na temelju toga prilagođava svoje buduće prijedloge.  
2. **Prilagodljivost**: Ako je korisnik ranije spomenuo da ne voli gužve, Turistički agent će ubuduće izbjegavati preporučivanje popularnih turističkih mjesta tijekom vršnih sati.  
3. **Ispravljanje pogrešaka**: Ako je Turistički agent pogriješio u prošloj rezervaciji, primjerice predloživši hotel koji je bio pun, naučit će temeljitije provjeravati dostupnost prije davanja preporuka.

#### Praktični primjer za programere

Evo pojednostavljenog primjera kako bi kod Turističkog agenta mogao izgledati pri uključivanju metakognicije:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Pretraži letove, hotele i atrakcije prema preferencijama
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
        # Analiziraj povratne informacije i prilagodi buduće preporuke
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Primjer upotrebe
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

#### Zašto je metakognicija važna

- **Samorefleksija**: Agenti mogu analizirati svoje performanse i identificirati područja za poboljšanje.  
- **Prilagodljivost**: Agenti mogu mijenjati strategije na temelju povratnih informacija i promjenjivih uvjeta.  
- **Ispravljanje pogrešaka**: Agenti mogu autonomno otkriti i ispraviti pogreške.  
- **Upravljanje resursima**: Agenti mogu optimizirati korištenje resursa, kao što su vrijeme i računalna snaga.

Uvođenjem metakognicije, Turistički agent može pružiti personaliziranije i točnije preporuke za putovanja, poboljšavajući cjelokupno korisničko iskustvo.

---

## 2. Planiranje kod agenata

Planiranje je kritična komponenta ponašanja AI agenata. Uključuje razrađivanje koraka potrebnih za postizanje cilja, uzimajući u obzir trenutno stanje, resurse i moguće prepreke.

### Elementi planiranja

- **Trenutni zadatak**: Jasno definirati zadatak.  
- **Koraci za dovršetak zadatka**: Razbiti zadatak na upravljive korake.  
- **Potrebni resursi**: Identificirati potrebne resurse.  
- **Iskustvo**: Iskoristiti prethodna iskustva za informiranje planiranja.

**Primjer**:  
Evo koraka koje Turistički agent treba poduzeti kako bi učinkovito pomogao korisniku u planiranju putovanja:

### Koraci za turističkog agenta

1. **Prikupljanje korisničkih preferencija**
   - Pitati korisnika za detalje o datumima putovanja, proračunu, interesima i bilo kakvim posebnim zahtjevima.
   - Primjeri: "Kada planirate putovati?" "Koji je vaš raspon proračuna?" "Koje aktivnosti volite na odmoru?"

2. **Dohvaćanje informacija**
   - Pretražiti relevantne opcije putovanja na temelju korisničkih preferencija.
   - **Letovi**: Potražiti dostupne letove unutar korisnikovog proračuna i preferiranih datuma putovanja.
   - **Smještaj**: Pronaći hotele ili najmove koji odgovaraju korisnikovim preferencijama glede lokacije, cijene i sadržaja.
   - **Atrakcije i restorani**: Identificirati popularne atrakcije, aktivnosti i opcije za objedovanje koje se podudaraju s korisnikovim interesima.

3. **Generiranje preporuka**
   - Sastaviti dohvaćene informacije u personalizirani itinerar.
   - Pružiti detalje poput opcija letova, rezervacija hotela i predloženih aktivnosti, pazeći da preporuke budu prilagođene korisnikovim preferencijama.

4. **Prezentacija itinerara korisniku**
   - Podijeliti predloženi itinerar s korisnikom na pregled.
   - Primjer: "Evo predloženog itinerara za vaše putovanje u Pariz. Uključuje detalje o letovima, rezervacijama hotela i popis preporučenih aktivnosti i restorana. Recite mi vaše mišljenje!"

5. **Prikupljanje povratnih informacija**
   - Pitati korisnika za povratne informacije o predloženom itineraru.
   - Primjeri: "Sviđaju li vam se opcije letova?" "Je li hotel prikladan za vaše potrebe?" "Postoje li aktivnosti koje biste htjeli dodati ili ukloniti?"

6. **Prilagodba na temelju povratnih informacija**
   - Izmijeniti itinerar na temelju korisnikovih povratnih informacija.
   - Napraviti potrebne promjene u preporukama za letove, smještaj i aktivnosti kako bi bolje odgovarale korisnikovim preferencijama.

7. **Konačna potvrda**
   - Predstaviti ažurirani itinerar korisniku za konačnu potvrdu.
   - Primjer: "Napravio sam prilagodbe na temelju vaših povratnih informacija. Evo ažuriranog itinerara. Je li sve u redu?"

8. **Rezervacija i potvrda rezervacija**
   - Nakon što korisnik odobri itinerar, nastaviti s rezervacijom letova, smještaja i bilo kojih unaprijed planiranih aktivnosti.
   - Poslati korisniku detalje potvrde.

9. **Pružanje kontinuirane podrške**
   - Biti dostupan za pomoć korisniku pri bilo kakvim promjenama ili dodatnim zahtjevima prije i tijekom njihovog putovanja.
   - Primjer: "Ako trebate dodatnu pomoć tijekom putovanja, slobodno mi se obratite u bilo kojem trenutku!"

### Primjer interakcije

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

# Primjer upotrebe unutar zahtjeva za izražavanje negodovanja
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

## 3. Korektivni RAG sustav

Prvo, krenimo s razumijevanjem razlike između RAG alata i preemptivnog učitavanja konteksta

![RAG naspram učitavanja konteksta](../../../translated_images/hr/rag-vs-context.9eae588520c00921.webp)

### Generacija potpomognuta dohvatom (RAG)

RAG kombinira sustav dohvaćanja s generativnim modelom. Kada se postavi upit, sustav dohvaćanja pronalazi relevantne dokumente ili podatke iz vanjskog izvora, a ti dohvaćeni podaci koriste se za proširenje ulaza u generativni model. To pomaže modelu da generira točnije i kontekstualno relevantnije odgovore.

U RAG sustavu, agent dohvaća relevantne informacije iz baze znanja i koristi ih za generiranje prikladnih odgovora ili akcija.

### Pristup korektivnog RAG-a

Pristup korektivnog RAG-a usredotočuje se na korištenje RAG tehnika za ispravljanje pogrešaka i poboljšanje točnosti AI agenata. To uključuje:

1. **Tehnika poticanja (prompting)**: Korištenje specifičnih promptova za usmjeravanje agenta u dohvaćanju relevantnih informacija.
2. **Alat**: Implementacija algoritama i mehanizama koji omogućuju agentu da procijeni relevantnost dohvaćenih informacija i generira točne odgovore.
3. **Evaluacija**: Kontinuirano procjenjivanje performansi agenta i izvođenje prilagodbi radi poboljšanja točnosti i učinkovitosti.

#### Primjer: korektivni RAG u agentu za pretraživanje

Uzmimo za primjer agenta za pretraživanje koji dohvaća informacije s weba kako bi odgovorio na korisničke upite. Pristup korektivnog RAG-a mogao bi uključivati:

1. **Tehnika poticanja (prompting)**: Formuliranje pretraživačkih upita na temelju korisnikovog unosa.
2. **Alat**: Korištenje obrade prirodnog jezika i algoritama strojnog učenja za rangiranje i filtriranje rezultata pretraživanja.
3. **Evaluacija**: Analiza povratnih informacija korisnika kako bi se identificirale i ispravile netočnosti u dohvaćenim informacijama.

### Korektivni RAG u turističkom agentu

Korektivni RAG (Retrieval-Augmented Generation) poboljšava sposobnost AI-ja da dohvaća i generira informacije istovremeno ispravljajući netočnosti. Pogledajmo kako Turistički agent može koristiti pristup korektivnog RAG-a za pružanje točnijih i relevantnijih preporuka za putovanja.

To uključuje:

- **Tehnika poticanja:** Korištenje specifičnih promptova za usmjeravanje agenta u dohvaćanju relevantnih informacija.  
- **Alat:** Implementacija algoritama i mehanizama koji omogućuju agentu da procijeni relevantnost dohvaćenih informacija i generira točne odgovore.  
- **Evaluacija:** Kontinuirano procjenjivanje performansi agenta i izvođenje prilagodbi radi poboljšanja točnosti i učinkovitosti.

#### Koraci za implementaciju korektivnog RAG-a u turističkom agentu

1. **Početna interakcija s korisnikom**
   - Turistički agent prikuplja početne preferencije od korisnika, kao što su odredište, datumi putovanja, proračun i interesi.
   - Primjer:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Dohvaćanje informacija**
   - Turistički agent dohvaća informacije o letovima, smještaju, atrakcijama i restoranima na temelju korisničkih preferencija.
   - Primjer:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generiranje početnih preporuka**
   - Turistički agent koristi dohvaćene informacije za generiranje personaliziranog itinerara.
   - Primjer:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Prikupljanje povratnih informacija korisnika**
   - Turistički agent traži od korisnika povratne informacije o početnim preporukama.
   - Primjer:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Proces korektivnog RAG-a**
   - **Tehnika poticanja**: Turistički agent formulira nove pretraživačke upite na temelju povratnih informacija korisnika.
     - Primjer:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Alat**: Turistički agent koristi algoritme za rangiranje i filtriranje novih rezultata pretraživanja, naglašavajući relevantnost na temelju povratnih informacija korisnika.
     - Primjer:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Evaluacija**: Turistički agent kontinuirano procjenjuje relevantnost i točnost svojih preporuka analizom povratnih informacija korisnika i izvođenjem potrebnih prilagodbi.
     - Primjer:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktični primjer

Evo pojednostavljenog Python primjera koda koji uključuje pristup korektivnog RAG-a u Turističkom agentu:

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

# Primjer upotrebe
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

### Preemptivno učitavanje konteksta
Pre-emptive Context Load involves loading relevant context or background information into the model before processing a query. This means the model has access to this information from the start, which can help it generate more informed responses without needing to retrieve additional data during the process.

Here's a simplified example of how a pre-emptive context load might look for a travel agent application in Python:

```python
class TravelAgent:
    def __init__(self):
        # Unaprijed učitaj popularne destinacije i njihove informacije
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Dohvati informacije o destinaciji iz unaprijed učitanog konteksta
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Primjer upotrebe
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Objašnjenje

1. **Inicijalizacija (`__init__` method)**: Klasa `TravelAgent` unaprijed učitava rječnik koji sadrži informacije o popularnim destinacijama kao što su Paris, Tokyo, New York i Sydney. Taj rječnik uključuje pojedinosti poput države, valute, jezika i glavnih atrakcija za svaku destinaciju.

2. **Dohvaćanje informacija (`get_destination_info` method)**: Kada korisnik upita o određenoj destinaciji, metoda `get_destination_info` dohvaća relevantne informacije iz prethodno učitanog rječnika konteksta.

Unaprijed učitavanjem konteksta, aplikacija turističkog agenta može brzo odgovarati na korisničke upite bez potrebe za dohvaćanjem tih informacija iz vanjskog izvora u stvarnom vremenu. To čini aplikaciju učinkovitijom i responzivnijom.

### Inicijalizacija plana s ciljem prije iteracije

Inicijalizacija plana s ciljem podrazumijeva početak s jasnim ciljem ili željenim ishodom na umu. Definiranjem tog cilja unaprijed, model ga može koristiti kao vodilju tijekom iterativnog procesa. To pomaže osigurati da se svaka iteracija približava postizanju željenog ishoda, čime proces postaje učinkovitiji i fokusiraniji.

Evo primjera kako biste mogli inicijalizirati plan putovanja s ciljem prije iteriranja za turističkog agenta u Pythonu:

### Scenarij

Turistički agent želi isplanirati prilagođeni odmor za klijenta. Cilj je stvoriti itinerar putovanja koji maksimizira zadovoljstvo klijenta na temelju njegovih preferencija i budžeta.

### Koraci

1. Definirajte preferencije i budžet klijenta.
2. Inicijalizirajte početni plan na temelju tih preferencija.
3. Iterirajte kako biste poboljšali plan, optimizirajući za zadovoljstvo klijenta.

#### Python kod

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

# Primjer uporabe
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

#### Objašnjenje koda

1. **Inicijalizacija (`__init__` method)**: Klasa `TravelAgent` inicijalizira se s popisom potencijalnih destinacija, od kojih svaka ima atribute poput imena, troška i vrste aktivnosti.

2. **Inicijalizacija plana (`bootstrap_plan` method)**: Ova metoda stvara početni plan putovanja na temelju preferencija i budžeta klijenta. Prolazi kroz popis destinacija i dodaje ih u plan ako se podudaraju s preferencijama klijenta i uklapaju u budžet.

3. **Usklađivanje preferencija (`match_preferences` method)**: Ova metoda provjerava odgovara li destinacija preferencijama klijenta.

4. **Iteriranje plana (`iterate_plan` method)**: Ova metoda poboljšava početni plan pokušavajući zamijeniti svaku destinaciju u planu boljim odgovarajućim izborom, uzimajući u obzir preferencije klijenta i ograničenja budžeta.

5. **Izračun troška (`calculate_cost` method)**: Ova metoda izračunava ukupni trošak trenutnog plana, uključujući potencijalnu novu destinaciju.

#### Primjer upotrebe

- **Početni plan**: Turistički agent stvara početni plan na temelju preferencija klijenta za razgledavanje i budžeta od $2000.
- **Poboljšani plan**: Turistički agent iterira plan, optimizirajući za preferencije i budžet klijenta.

Inicijalizacijom plana s jasnim ciljem (npr. maksimiziranje zadovoljstva klijenta) i iteriranjem radi poboljšanja plana, turistički agent može kreirati prilagođeni i optimizirani itinerar putovanja za klijenta. Ovakav pristup osigurava da plan putovanja od početka bude usklađen s preferencijama i budžetom klijenta i poboljšava se s svakom iteracijom.

### Iskorištavanje LLM-a za prerangiranje i bodovanje

Veliki jezični modeli (LLM-ovi) mogu se koristiti za prerangiranje i bodovanje tako da ocjenjuju relevantnost i kvalitetu dohvaćenih dokumenata ili generiranih odgovora. Evo kako to funkcionira:

**Pretraživanje:** Početni korak pretraživanja dohvaća skup kandidatskih dokumenata ili odgovora na temelju upita.

**Prerangiranje:** LLM ocjenjuje te kandidate i prerangira ih na temelju njihove relevantnosti i kvalitete. Ovaj korak osigurava da se najrelevantnije i najkvalitetnije informacije prikažu prve.

**Bodovanje:** LLM dodjeljuje ocjene svakom kandidatu, što odražava njihovu relevantnost i kvalitetu. To pomaže u odabiru najboljeg odgovora ili dokumenta za korisnika.

Korištenjem LLM-ova za prerangiranje i bodovanje, sustav može pružiti točnije i kontekstualno relevantnije informacije, poboljšavajući cjelokupno korisničko iskustvo.

Evo primjera kako bi turistički agent mogao koristiti veliki jezični model (LLM) za prerangiranje i bodovanje turističkih destinacija na temelju korisničkih preferencija u Pythonu:

#### Scenarij - Putovanje na temelju preferencija

Turistički agent želi preporučiti najbolje destinacije klijentu na temelju njegovih preferencija. LLM će pomoći prerangirati i ocijeniti destinacije kako bi se osiguralo prikazivanje najrelevantnijih opcija.

#### Koraci:

1. Prikupite korisničke preferencije.
2. Dohvatite popis potencijalnih turističkih destinacija.
3. Koristite LLM za prerangiranje i bodovanje destinacija na temelju korisničkih preferencija.

Evo kako možete ažurirati prethodni primjer kako biste koristili Azure OpenAI usluge:

#### Zahtjevi

1. Potrebno je imati Azure pretplatu.
2. Kreirajte Azure OpenAI resurs i nabavite vaš API ključ.

#### Primjer Python koda

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Generiraj prompt za Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Definiraj zaglavlja i tijelo zahtjeva
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Pozovi Azure OpenAI API da dobiješ ponovno rangirane i ocijenjene destinacije
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Izdvoji i vrati preporuke
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

# Primjer uporabe
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

#### Objašnjenje koda - Preference Booker

1. **Inicijalizacija**: Klasa `TravelAgent` inicijalizira se s popisom potencijalnih turističkih destinacija, od kojih svaka ima atribute poput imena i opisa.

2. **Dobivanje preporuka (`get_recommendations` method)**: Ova metoda generira prompt za Azure OpenAI uslugu temeljem korisničkih preferencija i izvršava HTTP POST zahtjev prema Azure OpenAI API-ju kako bi dobila prerangirane i ocijenjene destinacije.

3. **Generiranje prompa (`generate_prompt` method)**: Ova metoda konstruira prompt za Azure OpenAI, uključujući korisničke preferencije i popis destinacija. Prompt usmjerava model da prerangira i ocijeni destinacije na temelju danih preferencija.

4. **Poziv API-ja**: Biblioteka `requests` koristi se za slanje HTTP POST zahtjeva na Azure OpenAI API endpoint. Odgovor sadrži prerangirane i ocijenjene destinacije.

5. **Primjer upotrebe**: Turistički agent prikuplja korisničke preferencije (npr. interes za razgledavanje i raznolikom kulturom) i koristi Azure OpenAI uslugu za dobivanje prerangiranih i ocijenjenih preporuka za turističke destinacije.

Pobrinite se zamijeniti `your_azure_openai_api_key` stvarnim Azure OpenAI API ključem i `https://your-endpoint.com/...` stvarnim URL-om endpointa vaše Azure OpenAI implementacije.

Korištenjem LLM-a za prerangiranje i bodovanje, turistički agent može pružiti personaliziranije i relevantnije preporuke putovanja klijentima, poboljšavajući njihovo ukupno iskustvo.

### RAG: Tehnika promptanja naspram alata

Retrieval-Augmented Generation (RAG) može biti i tehnika promptanja i alat pri razvoju AI agenata. Razumijevanje razlike između ta dva pristupa može vam pomoći učinkovitije iskoristiti RAG u vašim projektima.

#### RAG kao tehnika promptanja

**Što je to?**

- Kao tehnika promptanja, RAG uključuje formuliranje specifičnih upita ili promptova kako bi se vodilo dohvaćanje relevantnih informacija iz velikog korpusa ili baze podataka. Te se informacije zatim koriste za generiranje odgovora ili akcija.

#### Kako to funkcionira:

1. Formulirajte promptove: Kreirajte dobro strukturirane promptove ili upite na temelju zadatka ili korisničkog unosa.
2. Dohvatite informacije: Upotrijebite promptove za pretraživanje relevantnih podataka iz postojeće baze znanja ili skupa podataka.
3. Generirajte odgovor: Kombinirajte dohvaćene informacije s generativnim AI modelima kako biste proizveli sveobuhvatan i koherentan odgovor.

#### Primjer u turističkom agentu

- Korisnički unos: "Želim posjetiti muzeje u Parizu."
- Prompt: "Pronađi najbolje muzeje u Parizu."
- Dohvaćene informacije: Pojedinosti o Louvre Museum, Musée d'Orsay, itd.
- Generirani odgovor: "Evo nekoliko najboljih muzeja u Parizu: Louvre Museum, Musée d'Orsay i Centre Pompidou."

#### RAG kao alat

**Što je to?**

- Kao alat, RAG je integrirani sustav koji automatizira proces dohvaćanja i generiranja, olakšavajući programerima implementaciju složenih AI funkcionalnosti bez ručnog sastavljanja promptova za svaki upit.

#### Kako to radi:

1. Integracija: Ugradite RAG u arhitekturu AI agenta, omogućavajući mu automatsko upravljanje zadacima dohvaćanja i generiranja.
2. Automatizacija: Alat upravlja cijelim procesom, od primanja korisničkog unosa do generiranja konačnog odgovora, bez potrebe za eksplicitnim promptovima za svaki korak.
3. Učinkovitost: Poboljšava performanse agenta pojednostavljujući proces dohvaćanja i generiranja, omogućujući brže i točnije odgovore.

#### Primjer u turističkom agentu

- Korisnički unos: "Želim posjetiti muzeje u Parizu."
- RAG alat: Automatski dohvaća informacije o muzejima i generira odgovor.
- Generirani odgovor: "Evo nekoliko najboljih muzeja u Parizu: Louvre Museum, Musée d'Orsay i Centre Pompidou."

### Usporedba

| Aspekt                 | Tehnika promptanja                                        | Alat                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Ručno naspram automatskog**| Ručno formuliranje promptova za svaki upit.               | Automatizirani proces za dohvaćanje i generiranje.       |
| **Kontrola**            | Pruža veću kontrolu nad procesom dohvaćanja.             | Pojednostavljuje i automatizira dohvaćanje i generiranje.|
| **Fleksibilnost**        | Omogućuje prilagođene promptove prema specifičnim potrebama.      | Učinkovitije za implementacije u velikom opsegu.       |
| **Složenost**         | Zahtijeva sastavljanje i podešavanje promptova.                  | Lakše se integrira u arhitekturu AI agenta. |

### Praktični primjeri

**Primjer tehnike promptanja:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Primjer alata:**

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

### Procjena relevantnosti

Procjena relevantnosti ključan je aspekt performansi AI agenta. Ona osigurava da su informacije koje agent dohvaća i generira prikladne, točne i korisne za korisnika. Istražimo kako procijeniti relevantnost u AI agentima, uključujući praktične primjere i tehnike.

#### Ključni koncepti u procjeni relevantnosti

1. Svjesnost konteksta:
   - Agent mora razumjeti kontekst korisničkog upita kako bi dohvaćao i generirao relevantne informacije.
   - Primjer: Ako korisnik pita za "najbolje restorane u Parizu", agent bi trebao uzeti u obzir korisnikove preferencije, poput vrste kuhinje i budžeta.

2. Točnost:
   - Informacije koje agent pruža trebaju biti činjenično točne i ažurne.
   - Primjer: Preporučivanje trenutno otvorenih restorana s dobrim recenzijama umjesto zastarjelih ili zatvorenih opcija.

3. Namjera korisnika:
   - Agent bi trebao zaključiti namjeru korisnika iza upita kako bi pružio najrelevantnije informacije.
   - Primjer: Ako korisnik pita za "povoljni hoteli", agent bi trebao dati prednost pristupačnim opcijama.

4. Povratna petlja:
   - Kontinuirano prikupljanje i analiziranje povratnih informacija korisnika pomaže agentu da poboljša proces procjene relevantnosti.
   - Primjer: Uključivanje ocjena i povratnih informacija korisnika o prethodnim preporukama za poboljšanje budućih odgovora.

#### Praktične tehnike za procjenu relevantnosti

1. Ocjenjivanje relevantnosti:
   - Dodijelite ocjenu relevantnosti svakom dohvaćenom stavkom na temelju koliko se dobro poklapa s korisničkim upitom i preferencijama.
   - Primjer:

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

2. Filtriranje i rangiranje:
   - Filtrirajte irelevantne stavke i rangirajte preostale na temelju njihovih ocjena relevantnosti.
   - Primjer:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Vrati 10 najrelevantnijih stavki
     ```

3. Obrada prirodnog jezika (NLP):
   - Koristite NLP tehnike za razumijevanje korisničkog upita i dohvaćanje relevantnih informacija.
   - Primjer:

     ```python
     def process_query(query):
         # Koristite NLP za izdvajanje ključnih informacija iz korisničkog upita
         processed_query = nlp(query)
         return processed_query
     ```

4. Integracija povratnih informacija korisnika:
   - Prikupite povratne informacije korisnika o danim preporukama i upotrijebite ih za prilagodbu budućih procjena relevantnosti.
   - Primjer:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Primjer: Procjena relevantnosti u turističkom agentu

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
        return ranked_items[:10]  # Vrati 10 najrelevantnijih stavki

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

# Primjer upotrebe
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

### Pretraživanje s namjerom

Pretraživanje s namjerom uključuje razumijevanje i interpretaciju temeljne svrhe ili cilja iza korisničkog upita radi dohvaćanja i generiranja najrelevantnijih i najkorisnijih informacija. Ovaj pristup nadilazi puko podudaranje ključnih riječi i usredotočuje se na shvaćanje stvarnih potreba i konteksta korisnika.

#### Ključni koncepti u pretraživanju s namjerom

1. Razumijevanje namjere korisnika:
   - Namjera korisnika može se svrstati u tri glavne vrste: informativna, navigacijska i transakcijska.
     - **Informativna namjera**: Korisnik traži informacije o nekoj temi (npr. "Koji su najbolji muzeji u Parizu?").
     - **Navigacijska namjera**: Korisnik želi navigirati na određenu web stranicu ili stranicu (npr. "Službena web stranica Louvre Museum").
     - **Transakcijska namjera**: Korisnik želi izvršiti transakciju, poput rezervacije leta ili kupnje (npr. "Rezerviraj let za Pariz").

2. Svjesnost konteksta:
   - Analiza konteksta korisničkog upita pomaže u točnom identificiranju njihove namjere. To uključuje razmatranje prethodnih interakcija, korisničkih preferencija i specifičnih detalja trenutnog upita.

3. Obrada prirodnog jezika (NLP):
   - NLP tehnike koriste se za razumijevanje i interpretaciju upita u prirodnom jeziku koje korisnici daju. To uključuje zadatke poput prepoznavanja entiteta, analize sentimenta i parsiranja upita.

4. Personalizacija:
   - Personaliziranje rezultata pretraživanja na temelju povijesti, preferencija i povratnih informacija korisnika poboljšava relevantnost dohvaćenih informacija.

#### Praktični primjer: Pretraživanje s namjerom u turističkom agentu

Uzmimo Travel Agent kao primjer da vidimo kako se pretraživanje s namjerom može implementirati.

1. Prikupljanje korisničkih preferencija

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. Razumijevanje namjere korisnika

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. Svjesnost konteksta
   ```python
   def analyze_context(query, user_history):
       # Kombinirajte trenutni upit s poviješću korisnika kako biste razumjeli kontekst
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Pretraži i personaliziraj rezultate**

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
       # Primjer logike pretraživanja za informativnu namjeru
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Primjer logike pretraživanja za navigacijsku namjeru
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Primjer logike pretraživanja za transakcijsku namjeru
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Primjer logike personalizacije
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Vrati 10 najboljih personaliziranih rezultata
   ```

5. **Primjer upotrebe**

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

## 4. Generiranje koda kao alat

Agenti koji generiraju kod koriste AI modele za pisanje i izvršavanje koda, rješavajući složene probleme i automatizirajući zadatke.

### Agenti za generiranje koda

Agenti za generiranje koda koriste generativne AI modele za pisanje i izvršavanje koda. Ti agenti mogu rješavati složene probleme, automatizirati zadatke i pružati vrijedne uvide generiranjem i izvođenjem koda u različitim programskim jezicima.

#### Praktične primjene

1. **Automatizirano generiranje koda**: Generiranje isječaka koda za određene zadatke, poput analize podataka, web scraping-a ili strojnog učenja.
2. **SQL kao RAG**: Korištenje SQL upita za dohvat i manipulaciju podacima iz baza podataka.
3. **Rješavanje problema**: Kreiranje i izvršavanje koda za rješavanje specifičnih problema, poput optimizacije algoritama ili analize podataka.

#### Primjer: agent za generiranje koda za analizu podataka

Zamislite da dizajnirate agenta za generiranje koda. Evo kako bi to moglo funkcionirati:

1. **Zadatak**: Analizirati skup podataka kako bi se identificirali trendovi i obrasci.
2. **Koraci**:
   - Učitajte skup podataka u alat za analizu podataka.
   - Generirajte SQL upite za filtriranje i agregiranje podataka.
   - Izvršite upite i dohvatite rezultate.
   - Koristite rezultate za generiranje vizualizacija i uvida.
3. **Potrebni resursi**: Pristup skupu podataka, alati za analizu podataka i sposobnosti rada sa SQL-om.
4. **Iskustvo**: Koristite ranije rezultate analiza za poboljšanje točnosti i relevantnosti budućih analiza.

### Primjer: agent za generiranje koda za agenta za putovanja

U ovom primjeru, dizajnirat ćemo agenta za generiranje koda, Travel Agent, kako bismo pomogli korisnicima u planiranju putovanja generiranjem i izvršavanjem koda. Ovaj agent može obavljati zadatke poput dohvaćanja opcija putovanja, filtriranja rezultata i sastavljanja itinerera koristeći generativni AI.

#### Pregled agenta za generiranje koda

1. **Prikupljanje korisničkih preferencija**: Prikuplja unos korisnika, poput odredišta, datuma putovanja, budžeta i interesa.
2. **Generiranje koda za dohvaćanje podataka**: Generira isječke koda za dohvaćanje podataka o letovima, hotelima i atrakcijama.
3. **Izvršavanje generiranog koda**: Pokreće generirani kod za dohvaćanje informacija u stvarnom vremenu.
4. **Generiranje itinerera**: Sastavlja dohvaćene podatke u personalizirani plan putovanja.
5. **Prilagodba na temelju povratnih informacija**: Prima povratne informacije korisnika i po potrebi regenerira kod kako bi poboljšao rezultate.

#### Korak-po-korak implementacija

1. **Prikupljanje korisničkih preferencija**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generiranje koda za dohvaćanje podataka**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Primjer: Generiraj kod za pretraživanje letova prema korisničkim preferencijama
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Primjer: Generiraj kod za pretraživanje hotela
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Izvršavanje generiranog koda**

   ```python
   def execute_code(code):
       # Izvršite generirani kod koristeći exec
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

4. **Generiranje itinerera**

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

5. **Prilagodba na temelju povratnih informacija**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Prilagodi postavke na temelju povratnih informacija korisnika
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Regeneriraj i izvrši kod s ažuriranim postavkama
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Korištenje svijesti o okruženju i rezoniranja

Temeljeno na shemi tablice može zaista poboljšati postupak generiranja upita iskorištavanjem svijesti o okruženju i rezoniranja.

Evo primjera kako se to može učiniti:

1. **Razumijevanje sheme**: Sustav će razumjeti shemu tablice i koristiti te informacije kako bi utemeljio generiranje upita.
2. **Prilagodba na temelju povratnih informacija**: Sustav će prilagoditi korisničke preferencije na temelju povratnih informacija i razmisliti o tome koja polja u shemi treba ažurirati.
3. **Generiranje i izvršavanje upita**: Sustav će generirati i izvršavati upite kako bi dohvatili ažurirane podatke o letovima i hotelima na temelju novih preferencija.

Evo ažuriranog primjera Python koda koji uključuje ove koncepte:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Prilagodi postavke na temelju povratnih informacija korisnika
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Zaključivanje na temelju sheme za prilagodbu drugih povezanih postavki
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Prilagođena logika za prilagodbu postavki na temelju sheme i povratnih informacija
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Generiraj kod za dohvat podataka o letovima na temelju ažuriranih postavki
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Generiraj kod za dohvat podataka o hotelima na temelju ažuriranih postavki
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simuliraj izvršavanje koda i vrati lažne podatke
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Generiraj plan putovanja na temelju letova, hotela i atrakcija
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Primjer sheme
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Primjer upotrebe
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Ponovno generiraj i izvrši kod s ažuriranim postavkama
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Objašnjenje - rezervacija na temelju povratnih informacija

1. **Svijest o shemi**: Rječnik `schema` definira kako bi se preferencije trebale prilagoditi na temelju povratnih informacija. Uključuje polja poput `favorites` i `avoid` s odgovarajućim prilagodbama.
2. **Prilagodba preferencija (`adjust_based_on_feedback` metoda)**: Ova metoda prilagođava preferencije na temelju povratnih informacija korisnika i sheme.
3. **Prilagodbe temeljene na okruženju (`adjust_based_on_environment` metoda)**: Ova metoda prilagođava postavke na temelju sheme i povratnih informacija.
4. **Generiranje i izvršavanje upita**: Sustav generira kod za dohvat ažuriranih podataka o letovima i hotelima na temelju prilagođenih preferencija i simulira izvršavanje tih upita.
5. **Generiranje itinerera**: Sustav stvara ažurirani itinerar na temelju novih podataka o letovima, hotelima i atrakcijama.

Uvođenjem svijesti o okruženju i rezoniranja temeljenog na shemi, sustav može generirati preciznije i relevantnije upite, što dovodi do boljih preporuka za putovanja i personaliziranijeg korisničkog iskustva.

### Korištenje SQL-a kao tehnike Retrieval-Augmented Generation (RAG)

SQL (Structured Query Language) je moćan alat za interakciju s bazama podataka. Kada se koristi kao dio pristupa Retrieval-Augmented Generation (RAG), SQL može dohvatiti relevantne podatke iz baza podataka kako bi informirao i generirao odgovore ili radnje u AI agentima. Istražimo kako se SQL može koristiti kao RAG tehnika u kontekstu Travel Agenta.

#### Ključni pojmovi

1. **Interakcija s bazom podataka**:
   - SQL se koristi za upite prema bazama podataka, dohvaćanje relevantnih informacija i manipulaciju podacima.
   - Primjer: Dohvaćanje podataka o letovima, informacijama o hotelima i atrakcijama iz baze podataka za putovanja.

2. **Integracija s RAG-om**:
   - SQL upiti se generiraju na temelju korisničkog unosa i preferencija.
   - Dohvaćeni podaci se potom koriste za generiranje personaliziranih preporuka ili akcija.

3. **Dinamičko generiranje upita**:
   - AI agent generira dinamičke SQL upite na temelju konteksta i potreba korisnika.
   - Primjer: Prilagodba SQL upita za filtriranje rezultata na temelju budžeta, datuma i interesa.

#### Primjene

- **Automatizirano generiranje koda**: Generiranje isječaka koda za specifične zadatke.
- **SQL kao RAG**: Korištenje SQL upita za manipulaciju podacima.
- **Rješavanje problema**: Kreiranje i izvršavanje koda za rješavanje problema.

**Primjer**:
Agent za analizu podataka:

1. **Zadatak**: Analizirati skup podataka kako bi se pronašli trendovi.
2. **Koraci**:
   - Učitajte skup podataka.
   - Generirajte SQL upite za filtriranje podataka.
   - Izvršite upite i dohvatite rezultate.
   - Generirajte vizualizacije i uvide.
3. **Resursi**: Pristup skupu podataka, sposobnosti rada sa SQL-om.
4. **Iskustvo**: Koristite ranije rezultate za poboljšanje budućih analiza.

#### Praktični primjer: korištenje SQL-a u agentu za putovanja

1. **Prikupljanje korisničkih preferencija**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generiranje SQL upita**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Izvršavanje SQL upita**

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

4. **Generiranje preporuka**

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

#### Primjeri SQL upita

1. **Upit za letove**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Upit za hotele**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Upit za atrakcije**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Korištenjem SQL-a kao dijela tehnike Retrieval-Augmented Generation (RAG), AI agenti poput Travel Agenta mogu dinamički dohvaćati i koristiti relevantne podatke kako bi pružili točne i personalizirane preporuke.

### Primjer metakognicije

Dakle, kako bismo demonstrirali implementaciju metakognicije, stvorimo jednostavnog agenta koji *razmatra svoj proces donošenja odluka* dok rješava problem. Za ovaj primjer, izgradit ćemo sustav u kojem agent pokušava optimizirati odabir hotela, ali potom vrednuje vlastito rezoniranje i prilagođava strategiju kada pogriješi ili donese suboptimalne odluke.

Simulirat ćemo to koristeći osnovni primjer gdje agent odabire hotele na temelju kombinacije cijene i kvalitete, ali će "reflect" o svojim odlukama i prema tome se prilagođavati.

#### Kako ovo ilustrira metakogniciju:

1. **Početna odluka**: Agent će odabrati najjeftiniji hotel, bez razumijevanja utjecaja kvalitete.
2. **Refleksija i evaluacija**: Nakon početnog izbora, agent će provjeriti je li hotel 'loš' izbor koristeći povratne informacije korisnika. Ako utvrdi da je kvaliteta hotela bila preniska, promišlja o svom rezoniranju.
3. **Prilagodba strategije**: Agent prilagođava svoju strategiju na temelju refleksije i prebacuje se s "cheapest" na "highest_quality", čime poboljšava svoj proces donošenja odluka u budućim iteracijama.

Evo primjera:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Sprema prethodno odabrane hotele
        self.corrected_choices = []  # Sprema ispravljene odabire
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Dostupne strategije

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
        # Pretpostavimo da imamo povratnu informaciju korisnika koja nam govori je li posljednji odabir bio dobar ili nije
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Prilagodi strategiju ako prethodni odabir nije bio zadovoljavajući
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

# Simuliraj popis hotela (cijena i kvaliteta)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Kreiraj agenta
agent = HotelRecommendationAgent()

# Korak 1: Agent preporučuje hotel koristeći strategiju "najjeftiniji"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Korak 2: Agent preispituje odabir i po potrebi prilagođava strategiju
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Korak 3: Agent ponovno preporučuje, ovog puta koristeći prilagođenu strategiju
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Metakognitivne sposobnosti agenata

Ključ ovdje je sposobnost agenta da:
- Procijeni svoje prethodne izbore i proces donošenja odluka.
- Prilagodi svoju strategiju na temelju te refleksije, tj. metakognicija u akciji.

Ovo je jednostavan oblik metakognicije u kojem je sustav sposoban prilagoditi svoj proces rezoniranja na temelju unutarnjih povratnih informacija.

### Zaključak

Metakognicija je moćan alat koji može značajno poboljšati sposobnosti AI agenata. Uključivanjem metakognitivnih procesa, možete dizajnirati agente koji su inteligentniji, prilagodljiviji i učinkovitiji. Iskoristite dodatne resurse kako biste dalje istražili fascinantni svijet metakognicije u AI agentima.

### Imate li dodatnih pitanja o obrascu dizajna metakognicije?

Pridružite se [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) kako biste se susreli s drugim učenicima, prisustvovali konzultacijama i dobili odgovore na pitanja o AI agentima.

## Prethodna lekcija

[Obrazac dizajna s više agenata](../08-multi-agent/README.md)

## Sljedeća lekcija

[AI agenti u produkciji](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje odgovornosti**:
Ovaj dokument je preveden pomoću AI usluge za prevođenje [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo osigurati točnost, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati mjerodavnim. Za kritične informacije preporučuje se profesionalni prijevod koji obavlja ljudski prevoditelj. Ne snosimo odgovornost za bilo kakve nesporazume ili pogrešna tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->