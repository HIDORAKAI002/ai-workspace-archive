[![Multi-agentno oblikovanje](../../../translated_images/sl/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Kliknite na zgornjo sliko za ogled videoposnetka te lekcije)_
# Metakognicija v AI agentih

## Uvod

Dobrodošli v lekciji o metakogniciji v AI agentih! Ta poglavje je namenjeno začetnikom, ki jih zanima, kako lahko AI agenti razmišljajo o svojih lastnih miselnih procesih. Ob koncu te lekcije boste razumeli ključne koncepte in imeli praktične primere za uporabo metakognicije pri oblikovanju AI agentov.

## Cilji učenja

Po zaključku te lekcije boste lahko:

1. Razumeli posledice svetov v razmišljanju v definicijah agentov.
2. Uporabljali tehnike načrtovanja in vrednotenja za pomoč agentom, ki se sami popravljajo.
3. Ustvarili lastne agente, sposobne manipulirati kodo za doseganje nalog.

## Uvod v metakognicijo

Metakognicija se nanaša na višje kognitivne procese, ki vključujejo razmišljanje o lastnem razmišljanju. Za AI agente to pomeni sposobnost ocenjevanja in prilagajanja svojih dejanj na podlagi samospoznanja in preteklih izkušenj. Metakognicija ali "razmišljanje o razmišljanju" je pomemben koncept pri razvoju agentnih AI sistemov. Vključuje, da so AI sistemi seznanjeni s svojimi notranjimi procesi ter zmožni nadzorovati, regulirati in prilagajati svoje vedenje ustrezno. Tako kot mi, ko "preberemo sobo" ali pogledamo na problem. Ta samospoznanja pomagajo AI sistemom sprejemati boljše odločitve, prepoznati napake in izboljšati svojo učinkovitost skozi čas - znova povezujejoče se s Turingovim testom in razpravo, ali bo AI prevzel nadzor.

V kontekstu agentnih AI sistemov lahko metakognicija pomaga rešiti več izzivov, kot so:
- Preglednost: Zagotavljanje, da AI sistemi lahko pojasnijo svoje razloge in odločitve.
- Razmišljanje: Izboljšanje zmožnosti AI sistemov za sintezo informacij in sprejemanje preudarnih odločitev.
- Prilagajanje: Omogočanje AI sistemom prilagajati se novim okoljem in spreminjajočim se pogojem.
- Percepcija: Izboljšanje natančnosti AI sistemov pri prepoznavanju in interpretaciji podatkov iz okolja.

### Kaj je metakognicija?

Metakognicija ali "razmišljanje o razmišljanju" je višji kognitivni proces, ki vključuje samospoznanje in samoregulacijo lastnih kognitivnih procesov. Na področju AI metakognicija omogoča agentom, da ocenijo in prilagajajo svoje strategije in dejanja, kar vodi k izboljšanim sposobnostim reševanja problemov in sprejemanja odločitev. Z razumevanjem metakognicije lahko oblikujete AI agente, ki niso le bolj inteligentni, ampak tudi bolj prilagodljivi in učinkoviti. V pravi metakogniciji bi AI viden jasno razmišljal o lastnem razmišljanju.

Primer: "Prednostno sem izbral cenejše lete, ker... morda zamujam na neposredne lete, zato bom ponovno preveril."
Spremljanje, kako ali zakaj je izbral določeno pot.
- Opazovanje, da je storil napake, ker se je preveč zanikal na uporabniške preference iz zadnjega časa, zato spreminja svojo strategijo odločanja, ne le končne priporočila.
- Diagnosticiranje vzorcev, kot je: "Kadar koli slišim uporabnika omenjati 'preveč gneče', ne smem samo odstraniti določenih znamenitosti, ampak tudi razmisliti, da je moja metoda izbire 'najboljših znamenitosti' napačna, če jih vedno urejam po priljubljenosti."

### Pomen metakognicije v AI agentih

Metakognicija igra ključno vlogo pri oblikovanju AI agentov iz več razlogov:

![Pomen metakognicije](../../../translated_images/sl/importance-of-metacognition.b381afe9aae352f7.webp)

- Samorefleksija: Agenti lahko ocenijo svoje delovanje in identificirajo področja za izboljšave.
- Prilagodljivost: Agenti lahko prilagajajo svoje strategije glede na pretekle izkušnje in spreminjajoča se okolja.
- Popravljanje napak: Agenti lahko samostojno zaznavajo in popravljajo napake, kar vodi k natančnejšim rezultatom.
- Upravljanje virov: Agenti lahko optimizirajo uporabo virov, kot sta čas in računalniška moč, z načrtovanjem in vrednotenjem svojih dejanj.

## Komponente AI agenta

Preden se potopimo v metakognitivne procese, je bistveno razumeti osnovne sestavine AI agenta. AI agent običajno sestavljajo:

- Persona: Osebnost in značilnosti agenta, ki določajo, kako sodeluje z uporabniki.
- Orodja: Zmožnosti in funkcije, ki jih agent lahko izvaja.
- Sposobnosti: Znanje in strokovnost, ki jih agent premore.

Te komponente skupaj tvorijo "enoto strokovnosti", ki lahko izvaja specifične naloge.

**Primer**:
Predstavljajte si potovalnega agenta, storitev agentov, ki ne samo načrtuje vaše počitnice, ampak prilagaja svojo pot na podlagi podatkov v realnem času in preteklih izkušenj uporabnikov.

### Primer: Metakognicija v storitvi potovalnega agenta

Predstavljajte si, da oblikujete storitev potovalnega agenta, ki jo poganja AI. Ta agent, "Potovalni agent", pomaga uporabnikom načrtovati njihove počitnice. Za vključitev metakognicije mora Potovalni agent ocenjevat in prilagajati svoja dejanja na podlagi samospoznanja in preteklih izkušenj. Tako bi metakognicija lahko igrala vlogo:

#### Trenutna naloga

Trenutna naloga je pomagati uporabniku pri načrtovanju potovanja v Pariz.

#### Koraki za dokončanje naloge

1. **Zbiranje uporabniških preferenc**: Vprašajte uporabnika o njihovih datumih potovanja, proračunu, interesih (npr. muzeji, kulinarika, nakupovanje) in morebitnih posebnih zahtevah.
2. **Pridobivanje informacij**: Iskanje letalskih možnosti, nastanitve, znamenitosti in restavracij, ki ustrezajo uporabnikovim preferencam.
3. **Generiranje priporočil**: Ponudba personaliziranega načrta potovanja z informacijami o letih, hotelskih rezervacijah in predlaganih aktivnostih.
4. **Prilagoditev na povratne informacije**: Vprašajte uporabnika za povratne informacije o priporočilih in naredite potrebne prilagoditve.

#### Potrebni viri

- Dostop do baz podatkov o letalskih in hotelskih rezervacijah.
- Informacije o pariških znamenitostih in restavracijah.
- Podatki povratnih informacij uporabnikov iz prejšnjih interakcij.

#### Izkušnje in samorefleksija

Potovalni agent uporablja metakognicijo za ocenjevanje svojega delovanja in učenje iz preteklih izkušenj. Na primer:

1. **Analiza povratnih informacij uporabnika**: Potovalni agent pregleda povratne informacije za ugotavljanje, katera priporočila so bila dobro sprejeta in katera ne. Na podlagi tega prilagodi svoje prihodnje predloge.
2. **Prilagodljivost**: Če je uporabnik v preteklosti omenil nestrinjanje z gnečo, se bo Potovalni agent v prihodnje izogibal priporočanju priljubljenih turističnih krajev v najbolj zasedenih urah.
3. **Popravljanje napak**: Če je Potovalni agent naredil napako pri prejšnji rezervaciji, npr. predlagal hotel, ki je bil že polno zaseden, se nauči bolj temeljito preverjati razpoložljivost pred podajanjem priporočil.

#### Praktični primer za razvijalce

Tukaj je poenostavljen primer kode, kako bi lahko koda Potovalnega agenta izgledala pri vključitvi metakognicije:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Iskanje letov, hotelov in turističnih znamenitosti glede na preference
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
        # Analiza povratnih informacij in prilagoditev prihodnjih priporočil
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Primer uporabe
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

#### Zakaj je metakognicija pomembna

- **Samorefleksija**: Agenti lahko analizirajo svojo uspešnost in prepoznajo področja za izboljšavo.
- **Prilagodljivost**: Agenti lahko spreminjajo strategije na podlagi povratnih informacij in spreminjajočih se pogojev.
- **Popravljanje napak**: Agenti lahko samostojno zaznavajo in popravljajo napake.
- **Upravljanje virov**: Agenti lahko optimizirajo uporabo virov, kot sta čas in računalniška moč.

Z vključitvijo metakognicije lahko Potovalni agent ponuja bolj personalizirana in natančna priporočila za potovanje, kar izboljšuje celotno uporabniško izkušnjo.

---

## 2. Načrtovanje pri agentih

Načrtovanje je ključni sestavni del obnašanja AI agenta. Pomeni opredelitev korakov, potrebnih za dosego cilja, ob upoštevanju trenutnega stanja, virov in možnih ovir.

### Elementi načrtovanja

- **Trenutna naloga**: Jasno definirajte nalogo.
- **Koraki za dokončanje naloge**: Razdelite nalogo na obvladljive korake.
- **Potrebni viri**: Določite potrebne vire.
- **Izkušnje**: Uporabite pretekle izkušnje za informiranje načrtovanja.

**Primer**:
Tukaj so koraki, ki jih mora Potovalni agent izvesti, da učinkovito pomaga uporabniku pri načrtovanju potovanja:

### Koraki za Potovalni agent

1. **Zbiranje uporabniških preferenc**
   - Vprašajte uporabnika za podrobnosti o datumih potovanja, proračunu, interesih in posebnih zahtevah.
   - Primeri: "Kdaj načrtujete potovanje?" "Kakšen je vaš proračun?" "Katere aktivnosti vam je všeč izvajati na počitnicah?"

2. **Pridobitev informacij**
   - Iskanje ustreznih potovalnih možnosti na podlagi uporabniških preferenc.
   - **Leti**: Iskanje razpoložljivih letov znotraj uporabnikovega proračuna in izbranih datumov.
   - **Nastanitve**: Iskanje hotelov ali najemnih enot, ki ustrezajo lokaciji, ceni in udobju glede na preference.
   - **Znamenitosti in restavracije**: Določanje priljubljenih znamenitosti, aktivnosti in gostinskih možnosti, ki so skladne z interesi uporabnika.

3. **Generiranje priporočil**
   - Združite pridobljene informacije v personaliziran načrt potovanja.
   - Predstavite podrobnosti, kot so možnosti poletov, hotelske rezervacije in priporočene aktivnosti, prilagojene uporabnikovim željam.

4. **Predstavitev načrta uporabniku**
   - Delite predlagani načrt potovanja za uporabnikov pregled.
   - Primer: "Tukaj je predlagani načrt za vaše potovanje v Pariz. Vključuje podrobnosti o letih, hotelskih rezervacijah in seznam priporočil za aktivnosti ter restavracije. Povejte, kaj menite!"

5. **Zbiranje povratnih informacij**
   - Vprašajte uporabnika za povratne informacije o predlaganem načrtu.
   - Primeri: "So vam všeč predlagane letalske možnosti?" "Ali je hotel primeren za vaše potrebe?" "Bi radi kaj dodali ali odstranili iz aktivnosti?"

6. **Prilagoditev na podlagi povratnih informacij**
   - Spremenite načrt glede na uporabnikove povratne informacije.
   - Naredite potrebne spremembe pri letih, nastanitvi in aktivnostih, da bolje ustrezajo uporabnikovim preferencam.

7. **Končno potrdilo**
   - Predstavite posodobljen načrt potovanja za končno potrditev uporabniku.
   - Primer: "Naredil sem spremembe glede na vaše povratne informacije. Tukaj je posodobljen načrt. Je vse po vaših željah?"

8. **Rezervacija in potrditev**
   - Ko uporabnik potrdi načrt, izvedite rezervacije letov, nastanitve in predhodno načrtovanih aktivnosti.
   - Pošljite potrdila uporabniku.

9. **Nadaljnja podpora**
   - Bodite na voljo za pomoč pri spremembah ali dodatnih zahtevah pred in med potovanjem.
   - Primer: "Če potrebujete kakršnokoli dodatno pomoč med potovanjem, mi kadarkoli sporočite!"

### Primer interakcije

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

# Primer uporabe znotraj zahteve za rezervacijo
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

## 3. Korektivni RAG sistem

Najprej začnimo z razumevanjem razlike med RAG orodjem in predhodnim nalaganjem konteksta

![RAG vs nalaganje konteksta](../../../translated_images/sl/rag-vs-context.9eae588520c00921.webp)

### Pridobivanje-podprta generacija (RAG)

RAG združuje pridobitveni sistem z generativnim modelom. Ko je podano vprašanje, pridobitveni sistem poišče relevantne dokumente ali podatke iz zunanjega vira, te podatke pa se uporabijo za bogatenje vhodnih informacij generativnemu modelu. To pomaga modelu ustvariti bolj natančne in kontekstualno ustrezne odgovore.

V RAG sistemu agent pridobiva relevantne informacije iz baze znanja in jih uporablja za generiranje ustreznih odgovorov ali dejanj.

### Korektivni RAG pristop

Korektivni RAG pristop se osredotoča na uporabo RAG tehnik za popravljanje napak in izboljšanje natančnosti AI agentov. To vključuje:

1. **Tehniko sprožitve**: Uporaba specifičnih sprožilcev, ki usmerjajo agenta pri pridobivanju relevantnih informacij.
2. **Orodje**: Uvedba algoritmov in mehanizmov, ki omogočajo agentu ocenjevanje relevantnosti pridobljenih informacij in generiranje natančnih odgovorov.
3. **Vrednotenje**: Stalno ocenjevanje uspešnosti agenta in prilagajanje za izboljšanje natančnosti in učinkovitosti.

#### Primer: Korektivni RAG v iskalnem agentu

Predstavljajte si iskalnega agenta, ki pridobiva informacije iz spleta za odgovarjanje na uporabniška vprašanja. Korektivni RAG pristop lahko vključuje:

1. **Tehniko sprožitve**: Oblikovanje iskalnih poizvedb na podlagi uporabnikovega vnosa.
2. **Orodje**: Uporaba naravnega jezikovnega procesiranja in algoritmov strojnoga učenja za razvrščanje in filtriranje rezultatov iskanja.
3. **Vrednotenje**: Analiza povratnih informacij uporabnikov za prepoznavanje in izboljšanje nepravilnosti v pridobljenih informacijah.

### Korektivni RAG v Potovalnem agentu

Korektivni RAG (Pridobivanje-podprta generacija) izboljšuje sposobnost AI za pridobivanje in generiranje informacij, hkrati pa popravi morebitne netočnosti. Poglejmo, kako lahko Potovalni agent uporabi pristop Korektivnega RAG za zagotavljanje bolj natančnih in relevantnih priporočil za potovanja.

To vključuje:

- **Tehniko sprožitve:** Uporaba specifičnih sprožilcev za usmerjanje agenta pri pridobivanju relevantnih informacij.
- **Orodje:** Uvedba algoritmov in mehanizmov, ki agentu omogočajo ocenjevanje relevantnosti pridobljenih informacij in ustvarjanje natančnih odgovorov.
- **Vrednotenje:** Stalno ocenjevanje uspešnosti agenta in prilagajanje za izboljšanje natančnosti in učinkovitosti.

#### Koraki za izvedbo Korektivnega RAG v Potovalnem agentu

1. **Prva interakcija z uporabnikom**
   - Potovalni agent zbere začetne preference uporabnika, kot so cilj, datumi potovanja, proračun in interesi.
   - Primer:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Pridobivanje informacij**
   - Potovalni agent pridobi informacije o letih, nastanitvah, znamenitostih in restavracijah na podlagi uporabnikovih preferenc.
   - Primer:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generiranje začetnih priporočil**
   - Potovalni agent uporabi pridobljene informacije za ustvarjanje personaliziranega načrta potovanja.
   - Primer:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Zbiranje povratnih informacij uporabnika**
   - Potovalni agent vpraša uporabnika za povratne informacije o začetnih priporočilih.
   - Primer:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Proces Korektivnega RAG**
   - **Tehnika sprožitve**: Potovalni agent oblikuje nove iskalne poizvedbe na podlagi uporabnikovih povratnih informacij.
     - Primer:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Orodje**: Potovalni agent uporablja algoritme za razvrščanje in filtriranje novih rezultatov iskanja, pri čemer poudarja relevantnost na podlagi povratnih informacij uporabnika.
     - Primer:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Vrednotenje**: Potovalni agent stalno ocenjuje relevantnost in natančnost svojih priporočil z analizo povratnih informacij uporabnika in izvaja potrebne prilagoditve.
     - Primer:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktičen primer

Tukaj je poenostavljen primer kode v Pythonu, ki vključuje pristop Korektivnega RAG v Potovalnem agentu:

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

# Primer uporabe
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

### Predhodno nalaganje konteksta
Predhodno naložen kontekst vključuje nalaganje ustreznega konteksta ali osnovnih informacij v model pred obdelavo poizvedbe. To pomeni, da ima model od začetka dostop do teh informacij, kar mu lahko pomaga generirati bolj informirane odgovore, brez potrebe po dodatnem iskanju podatkov med procesom.

Tukaj je poenostavljen primer, kako bi lahko izgledalo predhodno nalaganje konteksta za aplikacijo potovalnega agenta v Pythonu:

```python
class TravelAgent:
    def __init__(self):
        # Prednaloži priljubljene destinacije in njihove informacije
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Pridobi informacije o destinaciji iz prednaloženega konteksta
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Primer uporabe
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Pojasnilo

1. **Inicializacija (`__init__` metoda)**: Razred `TravelAgent` predhodno naloži slovar z informacijami o priljubljenih destinacijah, kot so Pariz, Tokio, New York in Sydney. Ta slovar vključuje podrobnosti, kot so država, valuta, jezik in glavne atrakcije za vsako destinacijo.

2. **Pridobivanje informacij (`get_destination_info` metoda)**: Ko uporabnik vpraša za določeno destinacijo, metoda `get_destination_info` pridobi ustrezne informacije iz predhodno naloženega slovarja konteksta.

S predhodnim nalaganjem konteksta lahko aplikacija potovalnega agenta hitro odgovori na uporabnikove poizvedbe, brez potrebe po iskanju teh informacij iz zunanjega vira v realnem času. To naredi aplikacijo učinkovitejšo in odzivnejšo.

### Zagon načrta z namenom pred iteracijo

Zaganjanje načrta z določenim ciljem pomeni začeti z jasnim ciljem ali pričakovanim izidom v mislih. Z določitvijo tega cilja na začetku lahko model uporablja ta cilj kot vodilo skozi iterativni proces. To zagotavlja, da se vsaka iteracija približuje doseganju želenega rezultata, s čimer je postopek bolj učinkovit in fokusiran.

Tukaj je primer, kako lahko za potovalnega agenta v Pythonu zaženete načrt s ciljem pred iteracijo:

### Scenarij

Potovalni agent želi načrtovati prilagojene počitnice za stranko. Cilj je ustvariti potovalni načrt, ki maksimalno poveča zadovoljstvo stranke glede na njene preference in proračun.

### Koraki

1. Določite preference in proračun stranke.  
2. Zaženite začetni načrt na podlagi teh preferenc.  
3. Iterirajte za izboljšanje načrta, optimizirano za zadovoljstvo stranke.

#### Python koda

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

# Primer uporabe
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

#### Pojasnilo kode

1. **Inicializacija (`__init__` metoda)**: Razred `TravelAgent` je inicializiran s seznamom potencialnih destinacij, vsaka s atributi, kot so ime, stroški in vrsta aktivnosti.

2. **Zagon načrta (`bootstrap_plan` metoda)**: Ta metoda ustvari začetni potovalni načrt glede na preference in proračun stranke. Pregleda seznam destinacij in jih doda v načrt, če ustrezajo preferencam stranke in se prilegajo proračunu.

3. **Ujemanje preferenc (`match_preferences` metoda)**: Ta metoda preveri, ali destinacija ustreza preferencam stranke.

4. **Iteracija načrta (`iterate_plan` metoda)**: Ta metoda izboljša začetni načrt tako, da poskuša zamenjati vsako destinacijo v načrtu z boljšo izbiro, ob spoštovanju preferenc stranke in omejitev proračuna.

5. **Izračun stroškov (`calculate_cost` metoda)**: Ta metoda izračuna skupne stroške trenutnega načrta, vključno z morebitno novo destinacijo.

#### Primer uporabe

- **Začetni načrt**: Potovalni agent ustvari začetni načrt na podlagi preference stranke za oglede in proračuna 2000 $.
- **Izboljšan načrt**: Potovalni agent iterira načrt in optimizira glede na preference in proračun stranke.

S časovnim zagonom načrta z jasnim ciljem (npr. maksimalno zadovoljstvo stranke) in iteracijo za izboljšanje načrta lahko potovalni agent ustvari prilagojen in optimiziran potovalni načrt za stranko. Ta pristop zagotavlja, da potovalni načrt že od začetka ustreza željam in proračunu ter se z vsako iteracijo izboljšuje.

### Izkoriščanje LLM za ponovno rangiranje in ocenjevanje

Veliki jezikovni modeli (LLM) se lahko uporabijo za ponovno rangiranje in ocenjevanje z analizo relevantnosti in kakovosti pridobljenih dokumentov ali generiranih odgovorov. Tako deluje:

**Pridobivanje:** Začetni korak pridobi niz kandidatnih dokumentov ali odgovorov na podlagi poizvedbe.

**Ponovno rangiranje:** LLM oceni te kandidate in jih ponovno razvrsti glede na relevantnost in kakovost. Ta korak zagotavlja, da so najpomembnejše in najkakovostnejše informacije prikazane prve.

**Ocenjevanje:** LLM dodeli ocene vsakemu kandidatu, ki odražajo njihovo relevantnost in kakovost. To pomaga pri izbiri najboljšega odgovora ali dokumenta za uporabnika.

Z uporabo LLM za ponovno rangiranje in ocenjevanje lahko sistem zagotovi bolj natančne in kontekstualno ustrezne informacije ter izboljša splošno uporabniško izkušnjo.

Tukaj je primer, kako bi lahko potovalni agent uporabil velik jezikovni model (LLM) za ponovno rangiranje in ocenjevanje potovalnih destinacij glede na uporabniške preference v Pythonu:

#### Scenarij - Potovanje glede na preference

Potovalni agent želi priporočiti najboljše potovalne destinacije stranki glede na njene preference. LLM bo pomagal ponovno razvrstiti in oceniti destinacije, da zagotovimo najbolj ustrezne možnosti.

#### Koraki:

1. Zberite uporabniške preference.  
2. Pridobite seznam potencialnih potovalnih destinacij.  
3. Uporabite LLM za ponovno razvrstitev in ocenjevanje destinacij na podlagi uporabnikovih preferenc.

Tukaj je, kako lahko posodobite prejšnji primer za uporabo storitev Azure OpenAI:

#### Zahteve

1. Potrebujete Azure naročnino.  
2. Ustvarite Azure OpenAI vir in pridobite svoj API ključ.

#### Primer Python kode

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Generiraj poziv za Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Določi glave in vsebino zahteve
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Pokliči Azure OpenAI API za pridobitev ponovno razvrščenih in ocenjenih destinacij
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Izlušči in vrni priporočila
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

# Primer uporabe
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

#### Pojasnilo kode – Preference Booker

1. **Inicializacija**: Razred `TravelAgent` je inicializiran s seznamom potencialnih potovalnih destinacij, vsaka z atributi, kot so ime in opis.

2. **Pridobivanje priporočil (`get_recommendations` metoda)**: Ta metoda generira poziv za Azure OpenAI storitev na podlagi uporabnikovih preferenc in pošlje HTTP POST zahtevek na Azure OpenAI API za pridobitev ponovno razvrščenih in ocenjenih destinacij.

3. **Generiranje poziva (`generate_prompt` metoda)**: Ta metoda sestavi poziv za Azure OpenAI, ki vključuje uporabnikove preference in seznam destinacij. Poziv usmerja model, da ponovno razvrsti in oceni destinacije glede na podane preference.

4. **Klic API-ja**: Knjižnica `requests` se uporablja za pošiljanje HTTP POST zahtevka na Azure OpenAI API končno točko. Odgovor vsebuje ponovno razvrščene in ocenjene destinacije.

5. **Primer uporabe**: Potovalni agent zbere uporabnikove preference (npr. zanimanje za oglede in raznoliko kulturo) ter uporabi Azure OpenAI storitev za pridobitev ponovno razvrščenih in ocenjenih priporočil za potovalne destinacije.

Poskrbite, da boste `your_azure_openai_api_key` zamenjali z vašim dejanskim Azure OpenAI API ključem in `https://your-endpoint.com/...` z dejansko URL končno točko vaše Azure OpenAI implementacije.

Z uporabo LLM za ponovno rangiranje in ocenjevanje lahko potovalni agent strankam zagotovi bolj personalizirana in ustrezna potovalna priporočila, s čimer izboljša njihovo celostno izkušnjo.

### RAG: Tehnika pozivanja vs. Orodje

Retrieval-Augmented Generation (RAG) je lahko tako tehnika pozivanja kot tudi orodje pri razvoju AI agentov. Razumevanje razlike med obema vam lahko pomaga bolj učinkovito izkoristiti RAG v vaših projektih.

#### RAG kot tehnika pozivanja

**Kaj je to?**

- Kot tehnika pozivanja RAG vključuje oblikovanje specifičnih poizvedb ali pozivov za usmerjanje iskanja relevantnih informacij iz velike zbirke ali baze podatkov. Te informacije se nato uporabijo za generiranje odgovorov ali ukrepov.

**Kako deluje:**

1. **Oblikovanje pozivov**: Ustvarite dobro strukturirane pozive ali poizvedbe glede na nalogo ali uporabnikov vnos.  
2. **Iskanje informacij**: Uporabite pozive za iskanje relevantnih podatkov iz obstoječe baze znanja ali podatkovne zbirke.  
3. **Generiranje odgovora**: Združite pridobljene informacije z generativnimi AI modeli za izdelavo celovitega in koherentnega odgovora.

**Primer pri potovalnem agentu**:

- Vnos uporabnika: "Rad bi obiskal muzeje v Parizu."  
- Poziv: "Poišči glavne muzeje v Parizu."  
- Pridobljene informacije: Podrobnosti o muzeju Louvre, Musée d'Orsay itd.  
- Generirani odgovor: "Tukaj so nekateri glavni muzeji v Parizu: muzej Louvre, Musée d'Orsay in Centre Pompidou."

#### RAG kot orodje

**Kaj je to?**

- Kot orodje je RAG integriran sistem, ki avtomatizira postopek pridobivanja in generiranja, zaradi česar je za razvijalce lažje implementirati kompleksne AI funkcionalnosti brez ročnega oblikovanja pozivov za vsako poizvedbo.

**Kako deluje:**

1. **Integracija**: Vgradite RAG v arhitekturo AI agenta, ki samodejno upravlja pridobivanje in generiranje.  
2. **Avtomatizacija**: Orodje upravlja celoten postopek, od prejema uporabnikovega vnosa do generiranja končnega odgovora, brez potrebe po eksplicitnih pozivih za vsak korak.  
3. **Učinkovitost**: Izboljša zmogljivost agenta s poenostavitvijo postopka pridobivanja in generiranja, omogoča hitrejše in natančnejše odgovore.

**Primer pri potovalnem agentu**:

- Vnos uporabnika: "Rad bi obiskal muzeje v Parizu."  
- Orodje RAG: Samodejno pridobi informacije o muzejih in ustvari odgovor.  
- Generirani odgovor: "Tukaj so nekateri glavni muzeji v Parizu: muzej Louvre, Musée d'Orsay in Centre Pompidou."

### Primerjava

| Vidik                   | Tehnika pozivanja                                         | Orodje                                                |
|-------------------------|-----------------------------------------------------------|-------------------------------------------------------|
| **Ročno vs Avtomatsko** | Ročno oblikovanje pozivov za vsako poizvedbo.             | Avtomatiziran proces za pridobivanje in generiranje.  |
| **Nadzor**              | Omogoča večji nadzor nad postopkom pridobivanja.          | Poenostavi in avtomatizira pridobivanje in generiranje.|
| **Fleksibilnost**       | Omogoča prilagojene pozive glede na specifične potrebe.   | Bolj učinkovito za obsežne implementacije.            |
| **Kompleksnost**        | Zahteva oblikovanje in prilagajanje pozivov.               | Lažje za integracijo v arhitekturo AI agenta.          |

### Praktični primeri

**Primer tehnike pozivanja:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Primer orodja:**

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

### Vrednotenje relevantnosti

Vrednotenje relevantnosti je ključni vidik zmogljivosti AI agenta. Zagotavlja, da so informacije, pridobljene in ustvarjene s strani agenta, ustrezne, natančne in uporabne za uporabnika. Raziščimo, kako vrednotiti relevantnost v AI agentih, vključno s praktičnimi primeri in tehnikami.

#### Ključni pojmi pri vrednotenju relevantnosti

1. **Zavedanje konteksta**:  
   - Agent mora razumeti kontekst uporabnikove poizvedbe, da pridobi in ustvari ustrezne informacije.  
   - Primer: Če uporabnik vpraša za "najboljše restavracije v Parizu", mora agent upoštevati uporabnikove preference, kot so vrsta kuhinje in proračun.

2. **Natančnost**:  
   - Informacije, ki jih agent poda, morajo biti dejansko pravilne in ažurne.  
   - Primer: Priporočanje restavracij, ki so trenutno odprte in imajo dobre ocene, namesto zastarelih ali zaprtih opcij.

3. **Uporabnikov namen**:  
   - Agent mora razbrati uporabnikov namen za poizvedbo, da zagotovi najbolj relevantne informacije.  
   - Primer: Če uporabnik vpraša za "cene hotele," mora agent dati prednost dostopnim možnostim.

4. **Povratne informacije**:  
   - Neprestano zbiranje in analiza uporabniških povratnih informacij pomaga agentu izboljšati postopek vrednotenja relevantnosti.  
   - Primer: Vključevanje ocen uporabnikov in povratnih informacij o prejšnjih priporočilih za izboljšanje prihodnjih odgovorov.

#### Praktične tehnike za vrednotenje relevantnosti

1. **Ocena relevantnosti**:  
   - Vsakemu pridobljenemu elementu dodelite oceno relevantnosti glede na to, kako dobro ustreza uporabnikovi poizvedbi in preferencam.  
   - Primer:

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

2. **Filtriranje in razvrščanje**:  
   - Odstranite nerelevantne elemente in preostale razvrstite glede na njihove ocene relevantnosti.  
   - Primer:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Vrni prvih 10 relevantnih elementov
     ```

3. **Obdelava naravnega jezika (NLP)**:  
   - Uporabite tehnike NLP, da razumete uporabnikovo poizvedbo in pridobite ustrezne informacije.  
   - Primer:

     ```python
     def process_query(query):
         # Uporabite NLP za izvleček ključnih informacij iz poizvedbe uporabnika
         processed_query = nlp(query)
         return processed_query
     ```

4. **Integracija povratnih informacij uporabnikov**:  
   - Zbirajte povratne informacije o podanih priporočilih in jih uporabite za prilagoditev prihodnjih ocen relevantnosti.  
   - Primer:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Primer: Vrednotenje relevantnosti pri potovalnem agentu

Tukaj je praktičen primer, kako potovalni agent lahko oceni relevantnost potovalnih priporočil:

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
        return ranked_items[:10]  # Vrni top 10 relevantnih elementov

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

# Primer uporabe
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

### Iskanje z namenom

Iskanje z namenom vključuje razumevanje in interpretacijo osnovnega cilja ali razloga za uporabnikovo poizvedbo, da pridobi in ustvari najbolj relevantne in uporabne informacije. Ta pristop presega zgolj ujemanje ključnih besed in se osredotoča na resnične potrebe in kontekst uporabnika.

#### Ključni pojmi pri iskanju z namenom

1. **Razumevanje uporabnikovega namena**:  
   - Namen uporabnika lahko razdelimo v tri glavne tipe: informacijski, navigacijski in transakcijski.  
     - **Informacijski namen**: uporabnik išče informacije o določeni temi (npr. "Kateri so najboljši muzeji v Parizu?").  
     - **Navigacijski namen**: uporabnik želi poiskati določeno spletno stran ali stran (npr. "Uradna spletna stran muzeja Louvre").  
     - **Transakcijski namen**: uporabnik želi izvesti transakcijo, kot je rezervacija leta ali nakup (npr. "Rezerviraj let v Pariz").  

2. **Zavedanje konteksta**:  
   - Analiza konteksta uporabnikove poizvedbe pomaga natančno ugotoviti njegov namen. To vključuje pretekle interakcije, uporabniške preference in podrobnosti trenutne poizvedbe.

3. **Obdelava naravnega jezika (NLP)**:  
   - Tehnike NLP se uporabljajo za razumevanje in interpretacijo naravnih jezikovnih poizvedb uporabnikov. Vključujejo naloge kot so prepoznavanje entitet, analiza sentimenta in razčlenjevanje poizvedb.

4. **Personalizacija**:  
   - Personalizacija rezultatov iskanja glede na uporabnikovo zgodovino, preference in povratne informacije izboljša relevantnost pridobljenih informacij.

#### Praktičen primer: Iskanje z namenom pri potovalnem agentu

Vzemimo potovalnega agenta kot primer, kako lahko izvedemo iskanje z namenom.

1. **Zbiranje uporabnikovih preferenc**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Razumevanje uporabnikovega namena**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Zavedanje konteksta**
   ```python
   def analyze_context(query, user_history):
       # Združite trenutno poizvedbo z zgodovino uporabnika za razumevanje konteksta
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Iskanje in personalizacija rezultatov**

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
       # Primer logike iskanja za informacijski namen
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Primer logike iskanja za navigacijski namen
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Primer logike iskanja za transakcijski namen
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Primer logike personalizacije
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Vrni 10 najboljših personaliziranih rezultatov
   ```

5. **Primer uporabe**

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

## 4. Generiranje kode kot orodje

Agenti za generiranje kode uporabljajo AI modele za pisanje in izvajanje kode, reševanje zahtevnih problemov in avtomatizacijo nalog.

### Agenti za generiranje kode

Agenti za generiranje kode uporabljajo generativne AI modele za pisanje in izvajanje kode. Ti agenti lahko rešujejo zahtevne probleme, avtomatizirajo naloge in nudijo dragocene vpoglede z generiranjem in izvajanjem kode v različnih programskih jezikih.

#### Praktične uporabe

1. **Avtomatizirano generiranje kode**: Generiranje odlomkov kode za specifične naloge, kot so analiza podatkov, spletno strganje ali strojno učenje.
2. **SQL kot RAG**: Uporaba SQL poizvedb za pridobivanje in manipulacijo podatkov iz baz.
3. **Reševanje problemov**: Ustvarjanje in izvajanje kode za reševanje določenih problemov, kot so optimizacija algoritmov ali analiza podatkov.

#### Primer: Agent za generiranje kode za analizo podatkov

Predstavljajte si, da oblikujete agenta za generiranje kode. Tako bi lahko deloval:

1. **Naloga**: Analizirati nabor podatkov za prepoznavanje trendov in vzorcev.
2. **Koraki**:
   - Naložiti nabor podatkov v orodje za analizo podatkov.
   - Generirati SQL poizvedbe za filtriranje in združevanje podatkov.
   - Izvesti poizvedbe in pridobiti rezultate.
   - Uporabiti rezultate za ustvarjanje vizualizacij in vpogledov.
3. **Potrebni viri**: Dostop do nabora podatkov, orodja za analizo podatkov in SQL sposobnosti.
4. **Izkušnje**: Uporaba prejšnjih rezultatov analiz za izboljšanje natančnosti in relevantnosti prihodnjih analiz.

### Primer: Agent za generiranje kode za turističnega agenta

V tem primeru bomo oblikovali agenta za generiranje kode, Turistični agent, ki bo uporabnikom pomagal pri načrtovanju potovanj z generiranjem in izvajanjem kode. Ta agent lahko opravlja naloge, kot so iskanje možnosti potovanja, filtriranje rezultatov in sestavljanje itinerarja z uporabo generativne AI.

#### Pregled agenta za generiranje kode

1. **Zbiranje uporabniških preferenc**: Zbira uporabniške vnose, kot so destinacija, datumi potovanja, proračun in interesi.
2. **Generiranje kode za pridobivanje podatkov**: Generira odlomke kode za pridobivanje podatkov o letih, hotelih in zanimivostih.
3. **Izvajanje generirane kode**: Izvede generirano kodo za pridobivanje informacij v realnem času.
4. **Generiranje itinerarja**: Združi pridobljene podatke v personaliziran načrt potovanja.
5. **Prilagajanje na podlagi povratnih informacij**: Sprejema uporabniške povratne informacije in po potrebi ponovno generira kodo za izpopolnjevanje rezultatov.

#### Korak-po-korak implementacija

1. **Zbiranje uporabniških preferenc**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generiranje kode za pridobivanje podatkov**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Primer: Ustvari kodo za iskanje letov glede na uporabniške preference
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Primer: Ustvari kodo za iskanje hotelov
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Izvajanje generirane kode**

   ```python
   def execute_code(code):
       # Zaženi generirano kodo z ukazom exec
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

4. **Generiranje itinerarja**

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

5. **Prilagajanje na podlagi povratnih informacij**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Prilagodite nastavitve glede na povratne informacije uporabnika
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Ponovno ustvarite in izvedite kodo z posodobljenimi nastavitvami
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Izkoriščanje okoljske zavesti in sklepanja

Glede na shemo tabele lahko dejansko izboljšate postopek generiranja poizvedb z uporabo okoljske zavesti in sklepanja.

Tukaj je primer, kako se to lahko naredi:

1. **Razumevanje sheme**: Sistem bo razumel shemo tabele in uporabil te informacije za utemeljitev generiranja poizvedb.
2. **Prilagajanje na podlagi povratnih informacij**: Sistem bo prilagodil uporabniške preference na podlagi povratnih informacij in sklepal, katera polja v shemi je treba posodobiti.
3. **Generiranje in izvajanje poizvedb**: Sistem bo generiral in izvajal poizvedbe za pridobivanje posodobljenih podatkov o letih in hotelih glede na nove preference.

Tukaj je posodobljen primer kode v Pythonu, ki vključuje te koncepte:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Prilagodi nastavitve glede na povratne informacije uporabnika
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Utemeljitev na podlagi sheme za prilagoditev drugih povezanih nastavitev
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Prilagojena logika za prilagoditev nastavitev na podlagi sheme in povratnih informacij
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Ustvari kodo za pridobivanje podatkov o letih glede na posodobljene nastavitve
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Ustvari kodo za pridobivanje podatkov o hotelih glede na posodobljene nastavitve
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simuliraj izvajanje kode in vrni lažne podatke
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Ustvari načrt poti na podlagi letov, hotelov in znamenitosti
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Primer sheme
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Primer uporabe
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Ponovno ustvari in zaženi kodo s posodobljenimi nastavitvami
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Pojasnilo - Rezervacija na podlagi povratnih informacij

1. **Zavedanje sheme**: Slovar `schema` določa, kako naj se preference prilagodijo na podlagi povratnih informacij. Vključuje polja, kot so `favorites` in `avoid`, z ustreznimi prilagoditvami.
2. **Prilagajanje preferenc (`adjust_based_on_feedback` metoda)**: Ta metoda prilagodi preference na podlagi uporabniških povratnih informacij in sheme.
3. **Okoljske prilagoditve (`adjust_based_on_environment` metoda)**: Ta metoda prilagaja prilagoditve na podlagi sheme in povratnih informacij.
4. **Generiranje in izvajanje poizvedb**: Sistem generira kodo za pridobivanje posodobljenih podatkov o letih in hotelih glede na prilagojene preference ter simulira izvajanje teh poizvedb.
5. **Generiranje itinerarja**: Sistem ustvari posodobljen načrt potovanja na podlagi novih podatkov o letih, hotelih in znamenitostih.

Z vključitvijo okoljske zavesti in sklepanja na podlagi sheme lahko sistem generira bolj natančne in relevantne poizvedbe, kar vodi do boljših potovalnih priporočil in bolj personalizirane uporabniške izkušnje.

### Uporaba SQL kot Retrieval-Augmented Generation (RAG) tehnike

SQL (Strukturiran jezik za poizvedbe) je zmogljivo orodje za interakcijo z bazami podatkov. Ko se uporablja kot del pristopa Retrieval-Augmented Generation (RAG), lahko SQL pridobiva relevantne podatke iz baz za informiranje in generiranje odgovorov ali dejanj v AI agentih. Raziščimo, kako se SQL lahko uporablja kot tehnika RAG v kontekstu Turističnega agenta.

#### Ključni koncepti

1. **Interakcija z bazo podatkov**:
   - SQL se uporablja za poizvedovanje baz, pridobivanje relevantnih podatkov in manipulacijo z njimi.
   - Primer: Pridobivanje podatkov o letih, hotelih in znamenitostih iz potovalne baze.

2. **Integracija z RAG**:
   - SQL poizvedbe se generirajo na podlagi uporabniškega vnosa in preferenc.
   - Pridobljeni podatki se nato uporabijo za generiranje personaliziranih priporočil ali dejanj.

3. **Dinamično generiranje poizvedb**:
   - AI agent generira dinamične SQL poizvedbe glede na kontekst in potrebe uporabnika.
   - Primer: Prilagajanje SQL poizvedb za filtriranje rezultatov glede na proračun, datume in interese.

#### Uporabe

- **Avtomatizirano generiranje kode**: Generiranje odlomkov kode za specifične naloge.
- **SQL kot RAG**: Uporaba SQL poizvedb za manipulacijo podatkov.
- **Reševanje problemov**: Ustvarjanje in izvajanje kode za reševanje problemov.

**Primer**:
Agent za analizo podatkov:

1. **Naloga**: Analizirati nabor podatkov za iskanje trendov.
2. **Koraki**:
   - Naložiti nabor podatkov.
   - Generirati SQL poizvedbe za filtriranje podatkov.
   - Izvesti poizvedbe in pridobiti rezultate.
   - Generirati vizualizacije in vpoglede.
3. **Viri**: Dostop do nabora podatkov, SQL sposobnosti.
4. **Izkušnje**: Uporaba prejšnjih rezultatov za izboljšanje prihodnjih analiz.

#### Praktičen primer: Uporaba SQL v Turističnem agentu

1. **Zbiranje uporabniških preferenc**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generiranje SQL poizvedb**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Izvajanje SQL poizvedb**

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

4. **Generiranje priporočil**

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

#### Primeri SQL poizvedb

1. **Poizvedba za let**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Poizvedba za hotel**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Poizvedba za znamenitost**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Z uporabo SQL kot dela tehnike Retrieval-Augmented Generation (RAG) lahko AI agenti, kot je Turistični agent, dinamično pridobivajo in uporabljajo relevantne podatke za natančna in personalizirana priporočila.

### Primer metapoznavanja

Da pokažemo implementacijo metapoznavanja, ustvarimo preprostega agenta, ki *premišlja o svojem postopku odločanja* med reševanjem problema. Za ta primer bomo zgradili sistem, kjer agent poskuša optimizirati izbiro hotela, nato pa ovrednoti lastno razsodnost in prilagodi svojo strategijo, ko naredi napake ali manj optimalne izbire.

To bomo simulirali s preprostim primerom, kjer agent izbira hotele na podlagi kombinacije cene in kakovosti, vendar "premišljuje" o svojih odločitvah in se temu ustrezno prilagaja.

#### Kako to ilustrira metapoznavanje:

1. **Začetna odločitev**: Agent bo izbral najcenejši hotel, brez razumevanja vpliva kakovosti.
2. **Premišljevanje in ocena**: Po začetni izbiri bo agent preveril, ali je hotel "slaba" izbira z uporabo uporabniških povratnih informacij. Če ugotovi, da je bila kakovost hotela prenizka, premisli o svoji razsodnosti.
3. **Prilagajanje strategije**: Agent prilagodi svojo strategijo na podlagi premišljevanja in preklopi z "najcenejšega" na "najkakovostnejšega", s čimer izboljša postopek odločanja v prihodnjih iteracijah.

Tukaj je primer:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Shrani prej izbrane hotele
        self.corrected_choices = []  # Shrani popravljene izbire
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Razpoložljive strategije

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
        # Predpostavimo, da imamo povratne informacije uporabnika, ki nam povedo, ali je bila zadnja izbira dobra ali ne
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Prilagodi strategijo, če je bila prejšnja izbira nezadovoljiva
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

# Simuliraj seznam hotelov (cena in kakovost)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Ustvari agenta
agent = HotelRecommendationAgent()

# Korak 1: Agent priporoči hotel z uporabo strategije "najcenejši"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Korak 2: Agent razmisli o izbiri in po potrebi prilagodi strategijo
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Korak 3: Agent znova priporoči, tokrat z uporabo prilagojene strategije
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Metapoznavne sposobnosti agentov

Ključ je v agentovi sposobnosti, da:
- Ocenjuje svoje prejšnje izbire in postopek odločanja.
- Prilagodi svojo strategijo na podlagi tega premišljevanja, tj. metapoznavanje v akciji.

To je enostavna oblika metapoznavanja, kjer je sistem sposoben prilagajati svoj postopek razsodnosti na podlagi notranjih povratnih informacij.

### Zaključek

Metapoznavanje je močno orodje, ki lahko bistveno izboljša zmožnosti AI agentov. Z vključitvijo metapoznavnih procesov lahko oblikujete agente, ki so bolj inteligentni, prilagodljivi in učinkoviti. Uporabite dodatne vire za nadaljnje raziskovanje fascinantnega sveta metapoznavanja v AI agentih.

### Imate več vprašanj o vzorcu oblikovanja metapoznavanja?

Pridružite se [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), da se srečate z drugimi učenci, udeležite pisarnstkih ur in dobite odgovore na vprašanja o AI agentih.

## Prejšnja lekcija

[Multi-Agent Design Pattern](../08-multi-agent/README.md)

## Naslednja lekcija

[AI Agents in Production](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas opozarjamo, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba smatrati kot avtoritativni vir. Za ključne informacije priporočamo strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->