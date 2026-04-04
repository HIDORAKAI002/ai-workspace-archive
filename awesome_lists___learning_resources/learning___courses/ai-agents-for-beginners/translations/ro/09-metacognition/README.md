[![Proiectare Multi-agent](../../../translated_images/ro/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Faceți clic pe imaginea de mai sus pentru a vizualiza videoclipul acestei lecții)_
# Metacogniție în agenții AI

## Introducere

Bine ați venit la lecția despre metacogniție în agenții AI! Acest capitol este conceput pentru începători care sunt curioși despre cum agenții AI își pot reflecta propriile procese de gândire. La sfârșitul acestei lecții, veți înțelege conceptele cheie și veți fi echipați cu exemple practice pentru a aplica metacogniția în proiectarea agenților AI.

## Obiective de învățare

După finalizarea acestei lecții, veți putea:

1. Înțelege implicațiile buclelor de raționament în definițiile agenților.
2. Folosi tehnici de planificare și evaluare pentru a ajuta agenții să se autocorecteze.
3. Crea proprii agenți capabili să manipuleze cod pentru a îndeplini sarcini.

## Introducere în metacogniție

Metacogniția se referă la procesele cognitive de ordin superior care implică gândirea despre propria gândire. Pentru agenții AI, asta înseamnă a putea evalua și ajusta acțiunile pe baza autocunoașterii și a experiențelor trecute. Metacogniția, sau „gândirea despre gândire”, este un concept important în dezvoltarea sistemelor agentice AI. Implică ca sistemele AI să fie conștiente de propriile procese interne și să poată monitoriza, regla și adapta comportamentul în consecință. La fel cum facem și noi atunci când citim atmosfera sau privim o problemă. Această autocunoaștere poate ajuta sistemele AI să ia decizii mai bune, să identifice erori și să își îmbunătățească performanța în timp — reîntorcându-ne din nou la testul Turing și la dezbaterea dacă AI va prelua controlul.

În contextul sistemelor agentice AI, metacogniția poate ajuta la abordarea mai multor provocări, cum ar fi:
- Transparență: Asigurarea faptului că sistemele AI își pot explica raționamentul și deciziile.
- Raționament: Îmbunătățirea capacității sistemelor AI de a sintetiza informații și de a lua decizii solide.
- Adaptare: Permiterea sistemelor AI să se ajusteze la medii noi și la condiții în schimbare.
- Percepție: Îmbunătățirea acurateței sistemelor AI în recunoașterea și interpretarea datelor din mediul lor.

### Ce este metacogniția?

Metacogniția, sau „gândirea despre gândire”, este un proces cognitiv de ordin superior care implică conștientizarea de sine și autoreglarea proceselor cognitive proprii. În domeniul AI, metacogniția îi permite agenților să își evalueze și să își adapteze strategiile și acțiunile, conducând la îmbunătățirea capacităților de rezolvare a problemelor și de luare a deciziilor. Prin înțelegerea metacogniției, puteți proiecta agenți AI care nu sunt doar mai inteligenți, dar și mai adaptabili și eficienți. În metacogniția autentică, ați vedea AI-ul raționând în mod explicit despre propriul său raționament.

Exemplu: „Am prioritizat zboruri mai ieftine pentru că… s-ar putea să ratez zboruri directe, așa că voi verifica din nou.”  
Urmărirea modului sau motivului pentru care a ales o anumită rută.
- Observarea faptului că a făcut greșeli pentru că s-a bazat excesiv pe preferințele utilizatorului din ultima dată, așa că își modifică strategia de luare a deciziilor, nu doar recomandarea finală.
- Diagnosticarea unor tipare precum: „Ori de câte ori văd că utilizatorul menționează «prea aglomerat», nu ar trebui doar să elimin anumite atracții, ci să reflectez asupra faptului că metoda mea de a alege «atracțiile de top» este defectuoasă dacă le ordonez întotdeauna după popularitate.”

### Importanța metacogniției în agenții AI

Metacogniția joacă un rol crucial în proiectarea agenților AI din mai multe motive:

![Importanța metacogniției](../../../translated_images/ro/importance-of-metacognition.b381afe9aae352f7.webp)

- Auto-reflecție: Agenții își pot evalua propria performanță și pot identifica zone pentru îmbunătățire.
- Adaptabilitate: Agenții își pot modifica strategiile pe baza experiențelor trecute și a mediilor în schimbare.
- Corectarea erorilor: Agenții pot detecta și corecta erorile în mod autonom, conducând la rezultate mai precise.
- Managementul resurselor: Agenții pot optimiza utilizarea resurselor, cum ar fi timpul și puterea de calcul, prin planificarea și evaluarea acțiunilor lor.

## Componentele unui agent AI

Înainte de a aprofunda procesele metacognitive, este esențial să înțelegem componentele de bază ale unui agent AI. Un agent AI constă de obicei din:

- Personalitate: Personalitatea și caracteristicile agentului, care definesc modul în care interacționează cu utilizatorii.
- Instrumente: Capabilitățile și funcțiile pe care agentul le poate îndeplini.
- Competențe: Cunoștințele și expertiza pe care agentul le posedă.

Aceste componente lucrează împreună pentru a crea o „unitate de expertiză” care poate îndeplini sarcini specifice.

**Exemplu**:
Luați în considerare un agent de călătorii, servicii de agenție care nu doar îți planifică vacanța, dar își ajustează și traseul pe baza datelor în timp real și a experiențelor anterioare ale clienților.

### Exemplu: Metacogniție într-un serviciu de agenție de călătorii

Imaginați-vă că proiectați un serviciu de agenție de călătorii bazat pe AI. Acest agent, „Agent de călătorii”, îi asistă pe utilizatori în planificarea vacanțelor. Pentru a încorpora metacogniția, Agentul de călătorii trebuie să evalueze și să își ajusteze acțiunile pe baza autocunoașterii și a experiențelor trecute. Iată cum ar putea juca un rol metacogniția:

#### Sarcina curentă

Sarcina curentă este să ajute un utilizator să planifice o călătorie la Paris.

#### Pași pentru finalizarea sarcinii

1. **Colectarea preferințelor utilizatorului**: Întrebați utilizatorul despre datele călătoriei, buget, interese (de ex., muzee, gastronomie, cumpărături) și orice cerințe specifice.
2. **Recuperarea informațiilor**: Căutați opțiuni de zbor, cazări, atracții și restaurante care corespund preferințelor utilizatorului.
3. **Generarea de recomandări**: Oferiți un itinerar personalizat cu detalii despre zboruri, rezervări la hotel și activități sugerate.
4. **Ajustarea pe baza feedback-ului**: Cereți utilizatorului feedback privind recomandările și faceți ajustările necesare.

#### Resurse necesare

- Acces la baze de date pentru rezervări zboruri și hoteluri.
- Informații despre atracțiile și restaurantele pariziene.
- Date de feedback ale utilizatorilor din interacțiunile anterioare.

#### Experiență și auto-reflecție

Agentul de călătorii folosește metacogniția pentru a-și evalua performanța și a învăța din experiențele trecute. De exemplu:

1. **Analiza feedback-ului utilizatorilor**: Agentul de călătorii revizuiește feedback-ul utilizatorilor pentru a determina ce recomandări au fost bine primite și care nu. Își ajustează sugestiile viitoare în consecință.
2. **Adaptabilitate**: Dacă un utilizator a menționat anterior că nu-i plac locurile aglomerate, Agentul de călătorii va evita recomandarea locurilor turistice populare în orele de vârf în viitor.
3. **Corectarea erorilor**: Dacă Agentul de călătorii a făcut o greșeală într-o rezervare anterioară, cum ar fi sugerarea unui hotel complet rezervat, învață să verifice disponibilitatea mai riguros înainte de a face recomandări.

#### Exemplu practic pentru dezvoltatori

Iată un exemplu simplificat despre cum ar putea arăta codul Agentului de călătorii atunci când încorporează metacogniția:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Caută zboruri, hoteluri și atracții în funcție de preferințe
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
        # Analizează feedback-ul și ajustează recomandările viitoare
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Exemplu de utilizare
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

#### De ce contează metacogniția

- **Auto-reflecție**: Agenții își pot analiza performanța și pot identifica zone pentru îmbunătățire.
- **Adaptabilitate**: Agenții își pot modifica strategiile pe baza feedback-ului și a condițiilor în schimbare.
- **Corectarea erorilor**: Agenții pot detecta și corecta greșelile în mod autonom.
- **Managementul resurselor**: Agenții pot optimiza utilizarea resurselor, cum ar fi timpul și puterea de calcul.

Prin încorporarea metacogniției, Agentul de călătorii poate oferi recomandări de călătorie mai personalizate și mai precise, îmbunătățind experiența generală a utilizatorului.

---

## 2. Planificarea agenților

Planificarea este o componentă critică a comportamentului unui agent AI. Aceasta implică conturarea pașilor necesari pentru a atinge un scop, luând în considerare starea curentă, resursele și posibilele obstacole.

### Elemente ale planificării

- **Sarcina curentă**: Definiți clar sarcina.
- **Pași pentru finalizarea sarcinii**: Împărțiți sarcina în pași gestionabili.
- **Resurse necesare**: Identificați resursele necesare.
- **Experiență**: Utilizați experiențele anterioare pentru a informa planificarea.

**Exemplu**:
Iată pașii pe care Agentul de călătorii trebuie să îi urmeze pentru a ajuta un utilizator să își planifice călătoria în mod eficient:

### Pași pentru Agentul de călătorii

1. **Colectarea preferințelor utilizatorului**
   - Întrebați utilizatorul detalii despre datele de călătorie, buget, interese și orice cerințe specifice.
   - Exemple: "Când plănuiți să călătoriți?" "Care este intervalul dumneavoastră de buget?" "Ce activități vă plac în vacanță?"

2. **Recuperarea informațiilor**
   - Căutați opțiuni de călătorie relevante pe baza preferințelor utilizatorului.
   - **Zboruri**: Căutați zboruri disponibile în limita bugetului utilizatorului și în datele preferate.
   - **Cazări**: Găsiți hoteluri sau proprietăți de închiriat care corespund preferințelor utilizatorului privind locația, prețul și facilitățile.
   - **Atracții și restaurante**: Identificați atracții, activități și opțiuni culinare populare care se aliniază intereselor utilizatorului.

3. **Generarea recomandărilor**
   - Compilați informațiile recuperate într-un itinerar personalizat.
   - Furnizați detalii precum opțiuni de zbor, rezervări la hotel și activități sugerate, asigurându-vă că adaptați recomandările la preferințele utilizatorului.

4. **Prezentarea itinerarului utilizatorului**
   - Distribuiți itinerarul propus utilizatorului pentru revizuire.
   - Exemplu: "Iată un itinerar sugerat pentru călătoria dvs. la Paris. Include detalii despre zboruri, rezervări la hotel și o listă de activități și restaurante recomandate. Spuneți-mi ce părere aveți!"

5. **Colectarea feedback-ului**
   - Cereți utilizatorului feedback privind itinerarul propus.
   - Exemple: "Vă plac opțiunile de zbor?" "Hotelul este potrivit pentru nevoile dvs.?" "Există activități pe care doriți să le adăugați sau să le eliminați?"

6. **Ajustarea pe baza feedback-ului**
   - Modificați itinerarul pe baza feedback-ului utilizatorului.
   - Faceți schimbările necesare la recomandările de zbor, cazare și activități pentru a se potrivi mai bine preferințelor utilizatorului.

7. **Confirmarea finală**
   - Prezentați itinerarul actualizat utilizatorului pentru confirmare finală.
   - Exemplu: "Am făcut ajustările pe baza feedback-ului dvs. Iată itinerarul actualizat. Arată totul bine pentru dvs.?"

8. **Rezervarea și confirmarea rezervărilor**
   - Odată ce utilizatorul aprobă itinerarul, procedați la rezervarea zborurilor, cazărilor și a oricăror activități pre-planificate.
   - Trimiteți detalii de confirmare utilizatorului.

9. **Furnizarea suportului continuu**
   - Rămâneți disponibil pentru a asista utilizatorul cu orice modificări sau solicitări adiționale înainte și în timpul călătoriei.
   - Exemplu: "Dacă aveți nevoie de asistență suplimentară în timpul călătoriei, nu ezitați să mă contactați oricând!"

### Exemplu de interacțiune

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

# Exemplu de utilizare într-o cerere de huiduire
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

## 3. Sistem RAG corectiv

În primul rând, să începem prin a înțelege diferența dintre RAG Tool și Încărcarea preemptivă a contextului

![RAG vs Încărcarea contextului](../../../translated_images/ro/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

RAG combină un sistem de recuperare cu un model generativ. Când se face o interogare, sistemul de recuperare aduce documente sau date relevante dintr-o sursă externă, iar aceste informații recuperate sunt folosite pentru a augmenta inputul către modelul generativ. Acest lucru ajută modelul să genereze răspunsuri mai precise și relevante din punct de vedere al contextului.

Într-un sistem RAG, agentul recuperează informații relevante dintr-o bază de cunoștințe și le folosește pentru a genera răspunsuri sau acțiuni adecvate.

### Abordarea RAG corectivă

Abordarea RAG corectivă se concentrează pe utilizarea tehnicilor RAG pentru a corecta erorile și a îmbunătăți acuratețea agenților AI. Aceasta implică:

1. **Tehnică de prompting**: Folosirea de prompturi specifice pentru a ghida agentul în recuperarea informațiilor relevante.
2. **Instrument**: Implementarea de algoritmi și mecanisme care permit agentului să evalueze relevanța informațiilor recuperate și să genereze răspunsuri exacte.
3. **Evaluare**: Evaluarea continuă a performanței agentului și ajustarea pentru a-i îmbunătăți acuratețea și eficiența.

#### Exemplu: RAG corectiv într-un agent de căutare

Luați în considerare un agent de căutare care recuperează informații de pe web pentru a răspunde la interogările utilizatorilor. Abordarea RAG corectivă ar putea implica:

1. **Tehnică de prompting**: Formularea interogărilor de căutare pe baza inputului utilizatorului.
2. **Instrument**: Folosirea procesării limbajului natural și a algoritmilor de învățare automată pentru a ordona și filtra rezultatele căutării.
3. **Evaluare**: Analizarea feedback-ului utilizatorilor pentru a identifica și corecta inexactitățile din informațiile recuperate.

### RAG corectiv în Agentul de călătorii

RAG corectiv (Retrieval-Augmented Generation) îmbunătățește capacitatea unui AI de a recupera și genera informații corecte, corectând orice inexactități. Haideți să vedem cum poate Agentul de călătorii să folosească abordarea RAG corectivă pentru a oferi recomandări de călătorie mai precise și mai relevante.

Aceasta implică:

- **Tehnică de prompting:** Utilizarea de prompturi specifice pentru a ghida agentul în recuperarea informațiilor relevante.
- **Instrument:** Implementarea de algoritmi și mecanisme care permit agentului să evalueze relevanța informațiilor recuperate și să genereze răspunsuri precise.
- **Evaluare:** Evaluarea continuă a performanței agentului și realizarea ajustărilor pentru a-i îmbunătăți acuratețea și eficiența.

#### Pași pentru implementarea RAG corectiv în Agentul de călătorii

1. **Interacțiunea inițială cu utilizatorul**
   - Agentul de călătorii colectează preferințele inițiale ale utilizatorului, cum ar fi destinația, datele de călătorie, bugetul și interesele.
   - Exemplu:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Recuperarea informațiilor**
   - Agentul de călătorii recuperează informații despre zboruri, cazări, atracții și restaurante pe baza preferințelor utilizatorului.
   - Exemplu:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generarea recomandărilor inițiale**
   - Agentul de călătorii folosește informațiile recuperate pentru a genera un itinerar personalizat.
   - Exemplu:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Colectarea feedback-ului utilizatorului**
   - Agentul de călătorii cere utilizatorului feedback asupra recomandărilor inițiale.
   - Exemplu:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Procesul RAG corectiv**
   - **Tehnică de prompting**: Agentul de călătorii formulează noi interogări de căutare pe baza feedback-ului utilizatorului.
     - Exemplu:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Instrument**: Agentul de călătorii folosește algoritmi pentru a ordona și filtra noile rezultate de căutare, punând accent pe relevanța bazată pe feedback-ul utilizatorului.
     - Exemplu:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Evaluare**: Agentul de călătorii evaluează continuu relevanța și acuratețea recomandărilor sale prin analizarea feedback-ului utilizatorilor și efectuarea ajustărilor necesare.
     - Exemplu:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Exemplu practic

Iată un exemplu simplificat de cod Python care încorporează abordarea RAG corectivă în Agentul de călătorii:

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

# Exemplu de utilizare
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

### Încărcare preemptivă a contextului
Pre-emptive Context Load presupune încărcarea contextului relevant sau a informațiilor de fundal în model înainte de procesarea unei interogări. Aceasta înseamnă că modelul are acces la aceste informații încă de la început, ceea ce îl poate ajuta să genereze răspunsuri mai bine informate fără a fi nevoie să recupereze date suplimentare în timpul procesului.

Here's a simplified example of how a pre-emptive context load might look for a travel agent application in Python:

```python
class TravelAgent:
    def __init__(self):
        # Preîncărcați destinațiile populare și informațiile lor
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Obține informațiile despre destinație din contextul preîncărcat
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Exemplu de utilizare
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Explicație

1. **Initialization (`__init__` method)**: Clasa `TravelAgent` preîncarcă un dicționar care conține informații despre destinații populare precum Paris, Tokyo, New York și Sydney. Acest dicționar include detalii precum țara, moneda, limba și atracțiile principale pentru fiecare destinație.

2. **Retrieving Information (`get_destination_info` method)**: Când un utilizator întreabă despre o anumită destinație, metoda `get_destination_info` preia informațiile relevante din dicționarul de context preîncărcat.

Prin preîncărcarea contextului, aplicația pentru agenți de turism poate răspunde rapid la întrebările utilizatorilor fără a trebui să recupereze aceste informații dintr-o sursă externă în timp real. Acest lucru face aplicația mai eficientă și mai receptivă.

### Inițializarea planului cu un obiectiv înainte de iterare

Bootstrapping-ul unui plan cu un obiectiv presupune să începi cu un obiectiv clar sau un rezultat dorit în minte. Prin definirea acestui obiectiv de la început, modelul îl poate folosi ca principiu călăuzitor pe parcursul procesului iterativ. Acest lucru ajută la asigurarea că fiecare iterație se apropie de atingerea rezultatului dorit, făcând procesul mai eficient și mai concentrat.

Here's an example of how you might bootstrap a travel plan with a goal before iterating for a travel agent in Python:

### Scenariu

Un agent de turism dorește să planifice o vacanță personalizată pentru un client. Obiectivul este să creeze un itinerar de călătorie care maximizează satisfacția clientului pe baza preferințelor și bugetului acestuia.

### Pași

1. Definește preferințele și bugetul clientului.
2. Inițializează planul inițial pe baza acestor preferințe.
3. Iterează pentru a rafina planul, optimizând pentru satisfacția clientului.

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

# Exemplu de utilizare
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

#### Explicație a codului

1. **Initialization (`__init__` method)**: Clasa `TravelAgent` este inițializată cu o listă de destinații potențiale, fiecare având atribute precum nume, cost și tip de activitate.

2. **Bootstrapping the Plan (`bootstrap_plan` method)**: Această metodă creează un plan inițial de călătorie pe baza preferințelor și bugetului clientului. Iterează prin lista de destinații și le adaugă în plan dacă se potrivesc cu preferințele clientului și se încadrează în buget.

3. **Matching Preferences (`match_preferences` method)**: Această metodă verifică dacă o destinație se potrivește cu preferințele clientului.

4. **Iterating the Plan (`iterate_plan` method)**: Această metodă rafinează planul inițial încercând să înlocuiască fiecare destinație din plan cu o opțiune mai bună, ținând cont de preferințele clientului și de constrângerile bugetare.

5. **Calculating Cost (`calculate_cost` method)**: Această metodă calculează costul total al planului curent, inclusiv o posibilă destinație nouă.

#### Exemplu de utilizare

- **Initial Plan**: Agentul de turism creează un plan inițial bazat pe preferințele clientului pentru vizitarea obiectivelor turistice și un buget de $2000.
- **Refined Plan**: Agentul de turism iterează planul, optimizând pentru preferințele clientului și pentru buget.

Prin inițializarea planului cu un obiectiv clar (de ex., maximizarea satisfacției clientului) și iterând pentru a rafina planul, agentul de turism poate crea un itinerar personalizat și optimizat pentru client. Această abordare asigură că planul de călătorie se aliniază cu preferințele și bugetul clientului încă de la început și se îmbunătățește la fiecare iterație.

### Folosirea LLM-urilor pentru reordonare și scorare

Modelele Mari de Limbaj (LLMs) pot fi folosite pentru reordonare și scorare prin evaluarea relevanței și calității documentelor recuperate sau a răspunsurilor generate. Iată cum funcționează:

**Retrieval:** Pasul inițial de recuperare extrage un set de documente candidate sau răspunsuri pe baza interogării.

**Re-ranking:** LLM-ul evaluează aceste candidați și le reordonează pe baza relevanței și calității lor. Acest pas asigură că cele mai relevante și de calitate informații sunt prezentate primele.

**Scoring:** LLM-ul atribuie scoruri fiecărui candidat, reflectând relevanța și calitatea acestuia. Acest lucru ajută la selectarea celui mai bun răspuns sau document pentru utilizator.

Prin valorificarea LLM-urilor pentru reordonare și scorare, sistemul poate oferi informații mai precise și contextual relevante, îmbunătățind experiența generală a utilizatorului.

Here's an example of how a travel agent might use a Large Language Model (LLM) for re-ranking and scoring travel destinations based on user preferences in Python:

#### Scenariu - Călătorii în funcție de preferințe

Un agent de turism dorește să recomande cele mai bune destinații de călătorie unui client pe baza preferințelor acestuia. LLM-ul va ajuta la reordonarea și scorarea destinațiilor pentru a se asigura că cele mai relevante opțiuni sunt prezentate.

#### Pași:

1. Colectează preferințele utilizatorului.
2. Recuperează o listă de destinații potențiale.
3. Folosește LLM-ul pentru a reordona și a acorda scoruri destinațiilor pe baza preferințelor utilizatorului.

Here’s how you can update the previous example to use Azure OpenAI Services:

#### Cerințe

1. Trebuie să ai un abonament Azure.
2. Creează o resursă Azure OpenAI și obține cheia API.

#### Exemplu de cod Python

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Generează un prompt pentru Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Definește anteturile și corpul cererii
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Apelează API-ul Azure OpenAI pentru a obține destinațiile reordonate și evaluate
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Extrage și returnează recomandările
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

# Exemplu de utilizare
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

#### Explicație a codului - Preference Booker

1. **Initialization**: Clasa `TravelAgent` este inițializată cu o listă de destinații potențiale de călătorie, fiecare având atribute precum nume și descriere.

2. **Getting Recommendations (`get_recommendations` method)**: Această metodă generează un prompt pentru serviciul Azure OpenAI pe baza preferințelor utilizatorului și face o cerere HTTP POST către API-ul Azure OpenAI pentru a obține destinațiile reordonate și evaluate cu scoruri.

3. **Generating Prompt (`generate_prompt` method)**: Această metodă construiește un prompt pentru Azure OpenAI, incluzând preferințele utilizatorului și lista de destinații. Promptul ghidează modelul să reordoneze și să acorde scoruri destinațiilor pe baza preferințelor furnizate.

4. **API Call**: Biblioteca `requests` este folosită pentru a face o cerere HTTP POST către endpoint-ul API Azure OpenAI. Răspunsul conține destinațiile reordonate și cu scoruri.

5. **Example Usage**: Agentul de turism colectează preferințele utilizatorului (de ex., interes pentru vizitare obiective turistice și cultură diversă) și folosește serviciul Azure OpenAI pentru a obține recomandări reordonate și cu scoruri pentru destinațiile de călătorie.

Asigură-te să înlocuiești `your_azure_openai_api_key` cu cheia ta reală Azure OpenAI API și `https://your-endpoint.com/...` cu URL-ul real al endpoint-ului implementării tale Azure OpenAI.

Prin valorificarea LLM-ului pentru reordonare și scorare, agentul de turism poate oferi recomandări de călătorie mai personalizate și relevante pentru clienți, îmbunătățindu-le experiența generală.

### RAG: Tehnică de prompting vs Instrument

Retrieval-Augmented Generation (RAG) poate fi atât o tehnică de prompting, cât și un instrument în dezvoltarea agenților AI. Înțelegerea distincției dintre cele două te poate ajuta să valorifici RAG mai eficient în proiectele tale.

#### RAG ca tehnică de prompting

**Ce este?**

- Ca tehnică de prompting, RAG implică formularea unor interogări sau prompturi specifice pentru a ghida recuperarea informațiilor relevante dintr-un corpus sau o bază de date mare. Aceste informații sunt apoi folosite pentru a genera răspunsuri sau acțiuni.

**Cum funcționează:**

1. **Formulează prompturi**: Creează prompturi sau interogări bine structurate pe baza sarcinii în cauză sau a inputului utilizatorului.
2. **Recuperează informații**: Folosește prompturile pentru a căuta date relevante dintr-o bază de cunoștințe sau un set de date preexistent.
3. **Generează răspuns**: Combină informațiile recuperate cu modele generative de AI pentru a produce un răspuns cuprinzător și coerent.

**Exemplu în Agentul de turism**:

- Input utilizator: "I want to visit museums in Paris."
- Prompt: "Find top museums in Paris."
- Informații recuperate: Detalii despre Louvre Museum, Musée d'Orsay, etc.
- Răspuns generat: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

#### RAG ca instrument

**Ce este?**

- Ca instrument, RAG este un sistem integrat care automatizează procesul de recuperare și generare, facilitând dezvoltatorilor implementarea funcționalităților AI complexe fără a formula manual prompturi pentru fiecare interogare.

**Cum funcționează:**

1. **Integrare**: Încorporează RAG în arhitectura agentului AI, permițându-i să gestioneze automat sarcinile de recuperare și generare.
2. **Automatizare**: Instrumentul gestionează întregul proces, de la primirea inputului utilizatorului până la generarea răspunsului final, fără a necesita prompturi explicite pentru fiecare pas.
3. **Eficiență**: Îmbunătățește performanța agentului prin simplificarea procesului de recuperare și generare, oferind răspunsuri mai rapide și mai precise.

**Exemplu în Agentul de turism**:

- Input utilizator: "I want to visit museums in Paris."
- Instrument RAG: Recuperează automat informații despre muzee și generează un răspuns.
- Răspuns generat: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

### Comparație

| Aspect                 | Prompting Technique                                        | Tool                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Manual vs Automatic**| Formulare manuală a prompturilor pentru fiecare interogare. | Proces automatizat pentru recuperare și generare.     |
| **Control**            | Oferă mai mult control asupra procesului de recuperare.     | Simplifică și automatizează recuperarea și generarea. |
| **Flexibility**        | Permite prompturi personalizate în funcție de nevoi specifice.| Mai eficient pentru implementări la scară largă.      |
| **Complexity**         | Necesită crearea și ajustarea prompturilor.                 | Mai ușor de integrat în arhitectura unui agent AI.    |

### Exemple practice

**Exemplu de tehnică de prompting:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Exemplu de instrument:**

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

### Evaluarea relevanței

Evaluarea relevanței este un aspect crucial al performanței unui agent AI. Aceasta asigură că informațiile recuperate și generate de agent sunt adecvate, exacte și utile pentru utilizator. Să vedem cum se poate evalua relevanța în agenții AI, inclusiv exemple practice și tehnici.

#### Concepute cheie în evaluarea relevanței

1. **Conștientizarea contextului**:
   - Agentul trebuie să înțeleagă contextul interogării utilizatorului pentru a recupera și genera informații relevante.
   - Exemplu: Dacă un utilizator întreabă pentru "cele mai bune restaurante din Paris", agentul ar trebui să ia în considerare preferințele utilizatorului, precum tipul de bucătărie și bugetul.

2. **Acuratețe**:
   - Informațiile furnizate de agent trebuie să fie corecte din punct de vedere factual și actualizate.
   - Exemplu: Recomandarea restaurantelor care sunt în prezent deschise și au recenzii bune, în loc de opțiuni învechite sau închise.

3. **Intenția utilizatorului**:
   - Agentul ar trebui să deducă intenția utilizatorului din spatele interogării pentru a oferi cele mai relevante informații.
   - Exemplu: Dacă un utilizator cere "hoteluri prietenoase cu buget redus", agentul ar trebui să prioritizeze opțiunile accesibile.

4. **Bucle de feedback**:
   - Colectarea și analiza continuă a feedback-ului utilizatorilor ajută agentul să-și rafineze procesul de evaluare a relevanței.
   - Exemplu: Încorporarea evaluărilor și comentariilor utilizatorilor asupra recomandărilor anterioare pentru a îmbunătăți răspunsurile viitoare.

#### Tehnici practice pentru evaluarea relevanței

1. **Scorarea relevanței**:
   - Atribuie un scor de relevanță fiecărui element recuperat pe baza cât de bine se potrivește cu interogarea și preferințele utilizatorului.
   - Exemplu:

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

2. **Filtrare și clasificare**:
   - Filtrează elementele irelevante și clasifică pe cele rămase pe baza scorurilor lor de relevanță.
   - Exemplu:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Returnează primele 10 elemente relevante
     ```

3. **Procesarea limbajului natural (NLP)**:
   - Folosește tehnici NLP pentru a înțelege interogarea utilizatorului și a recupera informații relevante.
   - Exemplu:

     ```python
     def process_query(query):
         # Folosește NLP pentru a extrage informații cheie din interogarea utilizatorului
         processed_query = nlp(query)
         return processed_query
     ```

4. **Integrarea feedback-ului utilizatorilor**:
   - Colectează feedback de la utilizatori asupra recomandărilor oferite și folosește-l pentru a ajusta evaluările viitoare ale relevanței.
   - Exemplu:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Exemplu: Evaluarea relevanței în Agentul de turism

Iată un exemplu practic despre cum Travel Agent poate evalua relevanța recomandărilor de călătorie:

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
        return ranked_items[:10]  # Returnează primele 10 elemente relevante

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

# Exemplu de utilizare
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

### Căutare cu intenție

Căutarea cu intenție implică înțelegerea și interpretarea scopului sau obiectivului din spatele interogării unui utilizator pentru a recupera și genera cele mai relevante și utile informații. Această abordare depășește simplele potriviri de cuvinte cheie și se concentrează pe înțelegerea nevoilor reale și a contextului utilizatorului.

#### Concepute cheie în căutarea cu intenție

1. **Înțelegerea intenției utilizatorului**:
   - Intenția utilizatorului poate fi clasificată în trei tipuri principale: informațională, de navigare și tranzacțională.
     - **Intenție informațională**: utilizatorul caută informații despre un subiect (de ex., "Care sunt cele mai bune muzee din Paris?").
     - **Intenție de navigare**: utilizatorul dorește să navigheze către un site sau o pagină specifică (de ex., "site-ul oficial al Muzeului Luvru").
     - **Intenție tranzacțională**: utilizatorul urmărește să efectueze o tranzacție, cum ar fi rezervarea unui zbor sau efectuarea unei achiziții (de ex., "Rezervă un zbor spre Paris").

2. **Conștientizarea contextului**:
   - Analiza contextului interogării utilizatorului ajută la identificarea corectă a intenției acestuia. Aceasta include luarea în considerare a interacțiunilor anterioare, a preferințelor utilizatorului și a detaliilor specifice ale interogării curente.

3. **Procesarea limbajului natural (NLP)**:
   - Tehnicile NLP sunt folosite pentru a înțelege și interpreta interogările în limbaj natural furnizate de utilizatori. Acestea includ sarcini precum recunoașterea entităților, analiza sentimentelor și parsarea interogărilor.

4. **Personalizare**:
   - Personalizarea rezultatelor căutării pe baza istoricului, preferințelor și feedback-ului utilizatorului îmbunătățește relevanța informațiilor recuperate.

#### Exemplu practic: Căutarea cu intenție în Agentul de turism

Să luăm Agent de turism ca exemplu pentru a vedea cum poate fi implementată căutarea cu intenție.

1. **Colectarea preferințelor utilizatorului**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Înțelegerea intenției utilizatorului**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Conștientizarea contextului**
   ```python
   def analyze_context(query, user_history):
       # Combină interogarea curentă cu istoricul utilizatorului pentru a înțelege contextul
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Căutare și personalizare a rezultatelor**

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
       # Exemplu de logică de căutare pentru intenție informațională
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Exemplu de logică de căutare pentru intenția de navigare
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Exemplu de logică de căutare pentru intenția tranzacțională
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Exemplu de logică de personalizare
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Returnează primele 10 rezultate personalizate
   ```

5. **Exemplu de utilizare**

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

## 4. Generarea codului ca instrument

Agenții care generează cod folosesc modele AI pentru a scrie și executa cod, rezolvând probleme complexe și automatizând sarcini.

### Agenți care generează cod

Agenții care generează cod folosesc modele generative AI pentru a scrie și executa cod. Acești agenți pot rezolva probleme complexe, automatiza sarcini și oferi perspective valoroase prin generarea și rularea de cod în diverse limbaje de programare.

#### Aplicații practice

1. **Generare automată de cod**: Generați fragmente de cod pentru sarcini specifice, cum ar fi analiza datelor, extragerea de pe web sau machine learning.
2. **SQL ca RAG**: Folosiți interogări SQL pentru a prelua și manipula date din baze de date.
3. **Rezolvare de probleme**: Creați și executați cod pentru a rezolva probleme specifice, cum ar fi optimizarea algoritmilor sau analiza datelor.

#### Exemplu: Agent care generează cod pentru analiza datelor

Imaginați-vă că proiectați un agent care generează cod. Iată cum ar putea funcționa:

1. **Sarcină**: Analizați un set de date pentru a identifica tendințe și modele.
2. **Pași**:
   - Încarcați setul de date într-un instrument de analiză a datelor.
   - Generați interogări SQL pentru a filtra și agrega datele.
   - Executați interogările și preluați rezultatele.
   - Folosiți rezultatele pentru a genera vizualizări și informații.
3. **Resurse necesare**: Acces la setul de date, instrumente de analiză a datelor și capabilități SQL.
4. **Experiență**: Folosiți rezultatele analizelor anterioare pentru a îmbunătăți acuratețea și relevanța analizelor viitoare.

### Exemplu: Agent care generează cod pentru un agent de turism

În acest exemplu, vom proiecta un agent care generează cod, Travel Agent, pentru a ajuta utilizatorii în planificarea călătoriilor, generând și executând cod. Acest agent poate gestiona sarcini precum preluarea opțiunilor de călătorie, filtrarea rezultatelor și compilarea unui itinerariu folosind AI generativ.

#### Prezentare generală a agentului care generează cod

1. **Colectarea preferințelor utilizatorului**: Colectează inputul utilizatorului, cum ar fi destinația, datele de călătorie, bugetul și interesele.
2. **Generarea codului pentru preluarea datelor**: Generează fragmente de cod pentru a obține date despre zboruri, hoteluri și atracții.
3. **Executarea codului generat**: Rulează codul generat pentru a prelua informații în timp real.
4. **Generarea itinerariului**: Compilează datele preluate într-un plan de călătorie personalizat.
5. **Ajustarea pe baza feedback-ului**: Primește feedback de la utilizator și regenerează codul dacă este necesar pentru a rafina rezultatele.

#### Implementare pas cu pas

1. **Colectarea preferințelor utilizatorului**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generarea codului pentru preluarea datelor**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Exemplu: Generează cod pentru a căuta zboruri în funcție de preferințele utilizatorului
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Exemplu: Generează cod pentru a căuta hoteluri
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Executarea codului generat**

   ```python
   def execute_code(code):
       # Execută codul generat folosind exec
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

4. **Generarea itinerariului**

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

5. **Ajustarea pe baza feedback-ului**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Ajustează preferințele în funcție de feedback-ul utilizatorului
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Regenerază și execută codul cu preferințele actualizate
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Folosirea conștientizării mediului și a raționamentului

Bazarea pe schema tabelului poate într-adevăr îmbunătăți procesul de generare a interogărilor prin valorificarea conștientizării mediului și a raționamentului.

Iată un exemplu despre cum se poate realiza acest lucru:

1. **Înțelegerea schemei**: Sistemul va înțelege schema tabelului și va folosi aceste informații pentru a fundamenta generarea interogărilor.
2. **Ajustarea pe baza feedback-ului**: Sistemul va ajusta preferințele utilizatorului pe baza feedback-ului și va raționa asupra câmpurilor din schemă care trebuie actualizate.
3. **Generarea și executarea interogărilor**: Sistemul va genera și executa interogări pentru a prelua date actualizate despre zboruri și hoteluri pe baza noilor preferințe.

Iată un exemplu actualizat de cod Python care încorporează aceste concepte:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Ajustează preferințele pe baza feedback-ului utilizatorului
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Raționament bazat pe schemă pentru a ajusta alte preferințe asociate
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Logică personalizată pentru a ajusta preferințele pe baza schemei și a feedback-ului
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Generează cod pentru a prelua date despre zboruri în funcție de preferințele actualizate
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Generează cod pentru a prelua date despre hoteluri în funcție de preferințele actualizate
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simulează execuția codului și returnează date simulate
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Generează itinerariul pe baza zborurilor, hotelurilor și atracțiilor
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Exemplu de schemă
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Exemplu de utilizare
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Regenerază și execută codul cu preferințele actualizate
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Explicație - Rezervare pe baza feedback-ului

1. **Conștientizarea schemei**: Dicționarul `schema` definește cum ar trebui ajustate preferințele pe baza feedback-ului. Include câmpuri precum `favorites` și `avoid`, cu ajustările corespunzătoare.
2. **Ajustarea preferințelor (metoda `adjust_based_on_feedback`)**: Această metodă ajustează preferințele pe baza feedback-ului utilizatorului și a schemei.
3. **Ajustări bazate pe mediu (metoda `adjust_based_on_environment`)**: Această metodă personalizează ajustările pe baza schemei și a feedback-ului.
4. **Generarea și executarea interogărilor**: Sistemul generează cod pentru a prelua date actualizate despre zboruri și hoteluri pe baza preferințelor ajustate și simulează executarea acestor interogări.
5. **Generarea itinerariului**: Sistemul creează un itinerariu actualizat pe baza noilor date despre zboruri, hoteluri și atracții.

Făcând sistemul conștient de mediul său și raționând pe baza schemei, acesta poate genera interogări mai exacte și relevante, conducând la recomandări de călătorie mai bune și o experiență de utilizator mai personalizată.

### Utilizarea SQL ca tehnică Retrieval-Augmented Generation (RAG)

SQL (Structured Query Language) este un instrument puternic pentru interacțiunea cu bazele de date. Atunci când este folosit ca parte a unei abordări Retrieval-Augmented Generation (RAG), SQL poate prelua date relevante din baze de date pentru a informa și genera răspunsuri sau acțiuni în agenții AI. Să explorăm cum poate fi folosit SQL ca tehnică RAG în contextul unui agent de turism.

#### Concepte cheie

1. **Interacțiunea cu baza de date**:
   - SQL este folosit pentru a interoga baze de date, a prelua informații relevante și a manipula date.
   - Exemplu: preluarea detaliilor despre zboruri, informațiilor despre hoteluri și atracții dintr-o bază de date de călătorii.

2. **Integrarea cu RAG**:
   - Interogările SQL sunt generate pe baza inputului și a preferințelor utilizatorului.
   - Datele preluate sunt apoi folosite pentru a genera recomandări sau acțiuni personalizate.

3. **Generarea dinamică a interogărilor**:
   - Agentul AI generează interogări SQL dinamice pe baza contextului și a nevoilor utilizatorului.
   - Exemplu: personalizarea interogărilor SQL pentru a filtra rezultatele în funcție de buget, date și interese.

#### Aplicații

- **Generare automată de cod**: Generați fragmente de cod pentru sarcini specifice.
- **SQL ca RAG**: Folosiți interogări SQL pentru a manipula date.
- **Rezolvare de probleme**: Creați și executați cod pentru a rezolva probleme.

**Exemplu**:
Un agent de analiză a datelor:

1. **Sarcină**: Analizați un set de date pentru a găsi tendințe.
2. **Pași**:
   - Încărcați setul de date.
   - Generați interogări SQL pentru a filtra datele.
   - Executați interogările și preluați rezultatele.
   - Generați vizualizări și informații.
3. **Resurse**: Acces la setul de date, capabilități SQL.
4. **Experiență**: Folosiți rezultatele anterioare pentru a îmbunătăți analizele viitoare.

#### Exemplu practic: Utilizarea SQL în agentul de turism

1. **Colectarea preferințelor utilizatorului**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generarea interogărilor SQL**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Executarea interogărilor SQL**

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

4. **Generarea recomandărilor**

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

#### Exemple de interogări SQL

1. **Interogare zboruri**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Interogare hoteluri**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Interogare atracții**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Prin valorificarea SQL ca parte a tehnicii Retrieval-Augmented Generation (RAG), agenți AI precum agentul de turism pot prelua și utiliza dinamic date relevante pentru a oferi recomandări exacte și personalizate.

### Exemplu de metacogniție

Pentru a demonstra o implementare a metacogniției, să creăm un agent simplu care *reflectă asupra procesului său de luare a deciziilor* în timp ce rezolvă o problemă. Pentru acest exemplu, vom construi un sistem în care un agent încearcă să optimizeze alegerea unui hotel, dar apoi își evaluează propriul raționament și își ajustează strategia când face erori sau alegeri suboptimale.

Vom simula acest lucru folosind un exemplu de bază în care agentul selectează hoteluri pe baza unei combinații între preț și calitate, dar va "reflecta" asupra deciziilor sale și se va ajusta în consecință.

Iată un exemplu:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Stochează hotelurile alese anterior
        self.corrected_choices = []  # Stochează alegerile corectate
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Strategii disponibile

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
        # Să presupunem că avem feedback de la utilizator care ne spune dacă ultima alegere a fost bună sau nu
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Ajustează strategia dacă alegerea precedentă a fost nesatisfăcătoare
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

# Simulează o listă de hoteluri (preț și calitate)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Creează un agent
agent = HotelRecommendationAgent()

# Pasul 1: Agentul recomandă un hotel folosind strategia "cel mai ieftin"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Pasul 2: Agentul analizează alegerea și ajustează strategia dacă este necesar
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Pasul 3: Agentul recomandă din nou, de data aceasta folosind strategia ajustată
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Abilitățile de metacogniție ale agenților

Elementul cheie aici este capacitatea agentului de a:
- Evalua alegerile anterioare și procesul său de luare a deciziilor.
- Ajusta strategia pe baza acelei reflecții, adică metacogniție în acțiune.

Aceasta este o formă simplă de metacogniție în care sistemul este capabil să își ajusteze procesul de raționament pe baza feedback-ului intern.

### Concluzie

Metacogniția este un instrument puternic care poate îmbunătăți semnificativ capabilitățile agenților AI. Prin încorporarea proceselor metacognitive, puteți proiecta agenți mai inteligenți, adaptabili și eficienți. Folosiți resursele suplimentare pentru a explora mai departe fascinanta lume a metacogniției în agenții AI.

### Aveți mai multe întrebări despre modelul de proiectare pentru metacogniție?

Alăturați-vă [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) pentru a întâlni alți cursanți, a participa la ore de consultanță și a primi răspunsuri la întrebările dvs. despre agenții AI.

## Lecția anterioară

[Modelul de proiectare multi-agent](../08-multi-agent/README.md)

## Următoarea lecție

[Agenți AI în producție](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Declinare de responsabilitate:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși depunem eforturi pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă o traducere profesională realizată de un traducător uman. Nu ne asumăm răspunderea pentru eventuale neînțelegeri sau interpretări eronate care rezultă din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->