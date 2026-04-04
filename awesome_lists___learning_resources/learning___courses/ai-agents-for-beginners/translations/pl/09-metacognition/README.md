[![Projekt wieloagentowy](../../../translated_images/pl/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Kliknij obrazek powyżej, aby obejrzeć wideo z tej lekcji)_
# Metapoznanie w agentach AI

## Wprowadzenie

Witamy na lekcji o metapoznaniu w agentach AI! Ten rozdział jest przeznaczony dla początkujących, którzy są ciekawi, w jaki sposób agenci AI mogą rozważać własne procesy myślowe. Po zakończeniu tej lekcji zrozumiesz kluczowe koncepcje i otrzymasz praktyczne przykłady zastosowania metapoznania w projektowaniu agentów AI.

## Cele nauczania

Po ukończeniu tej lekcji będziesz w stanie:

1. Zrozumieć implikacje pętli rozumowania w definicjach agentów.
2. Wykorzystywać techniki planowania i oceny, aby pomóc agentom samokorygującym się.
3. Tworzyć własnych agentów zdolnych do manipulowania kodem w celu wykonania zadań.

## Wprowadzenie do metapoznania

Metapoznanie odnosi się do procesów poznawczych wyższego rzędu, które obejmują myślenie o własnym myśleniu. Dla agentów AI oznacza to zdolność do oceniania i dostosowywania swoich działań na podstawie samoświadomości i doświadczeń z przeszłości. Metapoznanie, czyli „myślenie o myśleniu”, to ważna koncepcja w rozwoju systemów AI o cechach agencyjnych. Obejmuje to to, że systemy AI są świadome własnych wewnętrznych procesów i potrafią monitorować, regulować i dostosowywać swoje zachowanie. Podobnie jak my, gdy „czytamy pokój” lub analizujemy problem. Ta samoświadomość może pomóc systemom AI podejmować lepsze decyzje, identyfikować błędy i poprawiać swoje działanie w czasie — ponownie odnosząc się do testu Turinga i debaty o tym, czy AI przejmie kontrolę.

W kontekście systemów AI o cechach agencyjnych metapoznanie może pomóc rozwiązać kilka wyzwań, takich jak:
- Przejrzystość: Zapewnienie, że systemy AI potrafią wyjaśnić swoje rozumowanie i decyzje.
- Rozumowanie: Zwiększenie zdolności systemów AI do syntezowania informacji i podejmowania uzasadnionych decyzji.
- Adaptacja: Umożliwienie systemom AI dostosowania się do nowych środowisk i zmieniających się warunków.
- Percepcja: Poprawa dokładności systemów AI w rozpoznawaniu i interpretowaniu danych ze środowiska.

### Czym jest metapoznanie?

Metapoznanie, czyli „myślenie o myśleniu”, to proces poznawczy wyższego rzędu obejmujący samoświadomość i samoregulację własnych procesów poznawczych. W obszarze AI metapoznanie umożliwia agentom ocenę i adaptację strategii oraz działań, co prowadzi do poprawy rozwiązywania problemów i zdolności do podejmowania decyzji. Dzięki zrozumieniu metapoznania możesz projektować agentów AI, którzy są nie tylko bardziej inteligentni, ale także bardziej adaptacyjni i wydajni. W prawdziwym metapoznaniu zobaczysz, jak AI explicite rozważa własne rozumowanie.

Przykład: „Priorytetowo potraktowałem tańsze loty, ponieważ… mogę tracić bezpośrednie połączenia, więc sprawdzę jeszcze raz.”.
Śledzenie, jak lub dlaczego wybrał określoną trasę.
- Zauważenie, że popełnił błędy, ponieważ zbytnio polegał na preferencjach użytkownika z poprzedniego razu, więc modyfikuje swoją strategię podejmowania decyzji, a nie tylko końcowe rekomendacje.
- Diagnozowanie wzorców takich jak: „kiedy widzę, że użytkownik mówi 'zbyt tłoczno', powinienem nie tylko usuwać pewne atrakcje, ale także zastanowić się, że moja metoda wybierania 'najlepszych atrakcji' jest wadliwa, jeśli zawsze rankuję według popularności.”

### Znaczenie metapoznania w agentach AI

![Znaczenie metapoznania](../../../translated_images/pl/importance-of-metacognition.b381afe9aae352f7.webp)

- Samorefleksja: Agenci mogą oceniać własne wyniki i identyfikować obszary wymagające poprawy.
- Adaptacyjność: Agenci mogą modyfikować swoje strategie na podstawie doświadczeń i zmieniających się warunków.
- Korekta błędów: Agenci mogą wykrywać i korygować błędy autonomicznie, co prowadzi do dokładniejszych wyników.
- Zarządzanie zasobami: Agenci mogą optymalizować wykorzystanie zasobów, takich jak czas i moc obliczeniowa, poprzez planowanie i ocenę swoich działań.

## Składniki agenta AI

Zanim zagłębimy się w procesy metapoznawcze, warto zrozumieć podstawowe składniki agenta AI. Agent AI zazwyczaj składa się z:

- Persona: Osobowość i cechy agenta, które definiują sposób, w jaki wchodzi w interakcję z użytkownikami.
- Narzędzia: Możliwości i funkcje, które agent może wykonywać.
- Umiejętności: Wiedza i ekspertyza, którą posiada agent.

Te składniki współpracują, tworząc „jednostkę ekspertyzy”, która jest w stanie wykonywać określone zadania.

**Przykład**:
Rozważ agenta podróży — usługę, która nie tylko planuje Twoje wakacje, ale także dostosowuje swoją trasę na podstawie danych w czasie rzeczywistym i doświadczeń z podróży poprzednich klientów.

### Przykład: metapoznanie w usłudze agenta podróży

Wyobraź sobie, że projektujesz usługę agenta podróży napędzaną przez AI. Ten agent, „Agent podróży”, pomaga użytkownikom w planowaniu wakacji. Aby włączyć metapoznanie, Agent podróży musi oceniać i dostosowywać swoje działania na podstawie samoświadomości i doświadczeń z przeszłości. Oto, jak metapoznanie mogłoby odegrać rolę:

#### Bieżące zadanie

Bieżące zadanie polega na pomocy użytkownikowi w zaplanowaniu podróży do Paryża.

#### Kroki do wykonania zadania

1. **Zbieranie preferencji użytkownika**: Zapytaj użytkownika o daty podróży, budżet, zainteresowania (np. muzea, kuchnia, zakupy) oraz wszelkie specyficzne wymagania.
2. **Pozyskiwanie informacji**: Wyszukaj opcje lotów, zakwaterowania, atrakcje i restauracje, które odpowiadają preferencjom użytkownika.
3. **Generowanie rekomendacji**: Zapewnij spersonalizowany plan podróży z informacjami o lotach, rezerwacjach hoteli i proponowanych aktywnościach.
4. **Dostosowanie na podstawie opinii**: Zapytaj użytkownika o opinię na temat rekomendacji i wprowadź niezbędne poprawki.

#### Wymagane zasoby

- Dostęp do baz danych dotyczących lotów i rezerwacji hoteli.
- Informacje o atrakcjach i restauracjach w Paryżu.
- Dane zwrotne od użytkowników z poprzednich interakcji.

#### Doświadczenie i samorefleksja

Agent podróży używa metapoznania do oceny swojej wydajności i uczenia się na podstawie doświadczeń. Na przykład:

1. **Analiza opinii użytkowników**: Agent podróży analizuje opinie użytkowników, aby określić, które rekomendacje zostały dobrze przyjęte, a które nie. Dostosowuje swoje przyszłe sugestie odpowiednio.
2. **Adaptacyjność**: Jeśli użytkownik wcześniej wspomniał, że nie lubi zatłoczonych miejsc, Agent podróży w przyszłości będzie unikać polecania popularnych atrakcji w godzinach szczytu.
3. **Korekta błędów**: Jeśli Agent podróży popełnił błąd przy wcześniejszej rezerwacji, np. zasugerował hotel, który był w pełni zajęty, uczy się dokładniej sprawdzać dostępność przed przedstawieniem rekomendacji.

#### Praktyczny przykład dla deweloperów

Oto uproszczony przykład, jak mógłby wyglądać kod Agenta podróży z elementami metapoznania:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Wyszukiwanie lotów, hoteli i atrakcji na podstawie preferencji
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
        # Analiza opinii i dostosowywanie przyszłych rekomendacji
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Przykładowe użycie
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

#### Dlaczego metapoznanie ma znaczenie

- **Samorefleksja**: Agenci mogą analizować swoją wydajność i wskazywać obszary wymagające poprawy.
- **Adaptacyjność**: Agenci mogą modyfikować strategie na podstawie opinii i zmieniających się warunków.
- **Korekta błędów**: Agenci mogą autonomicznie wykrywać i korygować błędy.
- **Zarządzanie zasobami**: Agenci mogą optymalizować wykorzystanie zasobów, takich jak czas i moc obliczeniowa.

Dzięki włączeniu metapoznania Agent podróży może dostarczać bardziej spersonalizowane i dokładne rekomendacje podróżnicze, poprawiając ogólne doświadczenie użytkownika.

---

## 2. Planowanie w agentach

Planowanie jest kluczowym elementem zachowania agenta AI. Polega na określeniu kroków potrzebnych do osiągnięcia celu, z uwzględnieniem bieżącego stanu, zasobów i możliwych przeszkód.

### Elementy planowania

- **Bieżące zadanie**: Wyraźnie zdefiniuj zadanie.
- **Kroki do wykonania zadania**: Rozbij zadanie na wykonalne etapy.
- **Wymagane zasoby**: Zidentyfikuj niezbędne zasoby.
- **Doświadczenie**: Wykorzystaj przeszłe doświadczenia do planowania.

**Przykład**:
Oto kroki, które Agent podróży musi podjąć, aby skutecznie pomóc użytkownikowi w zaplanowaniu podróży:

### Kroki dla agenta podróży

1. **Zbieranie preferencji użytkownika**
   - Zapytaj użytkownika o szczegóły dotyczące dat podróży, budżetu, zainteresowań i wszelkich specyficznych wymagań.
   - Przykłady: "Kiedy planujesz podróż?" "Jaki masz przedział budżetowy?" "Jakie aktywności lubisz podczas wakacji?"

2. **Pozyskiwanie informacji**
   - Wyszukaj odpowiednie opcje podróży na podstawie preferencji użytkownika.
   - **Loty**: Poszukaj dostępnych lotów mieszczących się w budżecie użytkownika i odpowiadających preferowanym datom podróży.
   - **Zakwaterowanie**: Znajdź hotele lub obiekty do wynajęcia, które pasują do preferencji użytkownika pod względem lokalizacji, ceny i udogodnień.
   - **Atrakcje i restauracje**: Zidentyfikuj popularne atrakcje, aktywności i miejsca gastronomiczne, które odpowiadają zainteresowaniom użytkownika.

3. **Generowanie rekomendacji**
   - Skompiluj pozyskane informacje w spersonalizowany plan podróży.
   - Podaj szczegóły takie jak opcje lotów, rezerwacje hoteli i proponowane aktywności, dopasowując rekomendacje do preferencji użytkownika.

4. **Przedstawienie planu użytkownikowi**
   - Udostępnij zaproponowany plan podróży użytkownikowi do przeglądu.
   - Przykład: "Oto proponowany plan podróży do Paryża. Zawiera szczegóły lotów, rezerwacje hotelu oraz listę polecanych aktywności i restauracji. Daj mi znać, co o tym myślisz!"

5. **Zbieranie opinii**
   - Poproś użytkownika o opinię na temat zaproponowanego planu.
   - Przykłady: "Czy podobają Ci się zaproponowane opcje lotów?" "Czy hotel odpowiada Twoim potrzebom?" "Czy chcesz dodać lub usunąć jakieś aktywności?"

6. **Dostosowanie na podstawie opinii**
   - Zmień plan podróży w oparciu o uwagi użytkownika.
   - Wprowadź niezbędne modyfikacje dotyczące lotów, zakwaterowania i proponowanych aktywności, aby lepiej dopasować się do preferencji użytkownika.

7. **Ostateczne potwierdzenie**
   - Przedstaw zaktualizowany plan użytkownikowi do ostatecznego zatwierdzenia.
   - Przykład: "Wprowadziłem zmiany na podstawie Twojej opinii. Oto zaktualizowany plan podróży. Czy wszystko wygląda dobrze?"

8. **Rezerwacja i potwierdzenie rezerwacji**
   - Po zatwierdzeniu planu przez użytkownika przystąp do rezerwacji lotów, zakwaterowania i ewentualnych zaplanowanych aktywności.
   - Wyślij użytkownikowi szczegóły potwierdzeń.

9. **Zapewnienie bieżącego wsparcia**
   - Pozostań dostępny, aby pomagać użytkownikowi przy zmianach lub dodatkowych prośbach przed i w trakcie podróży.
   - Przykład: "Jeśli potrzebujesz dalszej pomocy podczas podróży, skontaktuj się ze mną w dowolnym momencie!"

### Przykładowa interakcja

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

# Przykładowe użycie w żądaniu wygwizdania
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

## 3. System korygujący RAG

Firstly let's start by understanding the difference between RAG Tool and Pre-emptive Context Load

![RAG kontra ładowanie kontekstu](../../../translated_images/pl/rag-vs-context.9eae588520c00921.webp)

### Generowanie wspomagane wyszukiwaniem (RAG)

RAG łączy system wyszukiwania z modelem generatywnym. Gdy składane jest zapytanie, system wyszukiwania pobiera odpowiednie dokumenty lub dane ze źródła zewnętrznego, a te pobrane informacje są wykorzystywane do wzbogacenia wejścia do modelu generatywnego. Pomaga to modelowi generować dokładniejsze i kontekstowo trafniejsze odpowiedzi.

W systemie RAG agent pobiera istotne informacje z bazy wiedzy i wykorzystuje je do generowania odpowiednich odpowiedzi lub działań.

### Podejście korygujące RAG

Podejście korygujące RAG skupia się na wykorzystaniu technik RAG do korygowania błędów i poprawy dokładności agentów AI. Obejmuje to:

1. **Technika promptowania**: Używanie specyficznych promptów, aby nakierować agenta na pobieranie istotnych informacji.
2. **Narzędzie**: Implementowanie algorytmów i mechanizmów, które umożliwiają agentowi ocenę trafności pobranych informacji i generowanie dokładnych odpowiedzi.
3. **Ocena**: Ciągłe ocenianie wydajności agenta i wprowadzanie poprawek w celu poprawy jego dokładności i efektywności.

#### Przykład: korygujące RAG w agencie wyszukującym

Weź pod uwagę agenta wyszukującego, który pobiera informacje z sieci, aby odpowiadać na zapytania użytkowników. Podejście korygujące RAG może obejmować:

1. **Technika promptowania**: Formułowanie zapytań wyszukiwania na podstawie wejścia od użytkownika.
2. **Narzędzie**: Wykorzystywanie przetwarzania języka naturalnego i algorytmów uczenia maszynowego do oceniania i filtrowania wyników wyszukiwania.
3. **Ocena**: Analizowanie opinii użytkowników w celu identyfikacji i korekty nieścisłości w pobranych informacjach.

### Korygujące RAG w agencie podróży

Korygujące RAG (Retrieval-Augmented Generation) zwiększa zdolność AI do wyszukiwania i generowania informacji przy jednoczesnej korekcie niedokładności. Zobaczmy, jak Agent podróży może używać podejścia korygującego RAG, aby dostarczać bardziej dokładne i trafne rekomendacje podróżnicze.

To obejmuje:

- **Technika promptowania:** Używanie konkretnych promptów, aby nakierować agenta na pobieranie istotnych informacji.
- **Narzędzie:** Implementowanie algorytmów i mechanizmów, które umożliwiają agentowi ocenę trafności pobranych informacji i generowanie dokładnych odpowiedzi.
- **Ocena:** Ciągłe ocenianie wydajności agenta i wprowadzanie poprawek w celu poprawy jego dokładności i efektywności.

#### Kroki wdrożenia korygującego RAG w agencie podróży

1. **Początkowa interakcja z użytkownikiem**
   - Agent podróży zbiera początkowe preferencje użytkownika, takie jak cel podróży, daty podróży, budżet i zainteresowania.
   - Przykład:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Pobieranie informacji**
   - Agent podróży pobiera informacje o lotach, zakwaterowaniu, atrakcjach i restauracjach na podstawie preferencji użytkownika.
   - Przykład:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generowanie początkowych rekomendacji**
   - Agent podróży wykorzystuje pobrane informacje do wygenerowania spersonalizowanego planu podróży.
   - Przykład:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Zbieranie opinii użytkownika**
   - Agent podróży prosi użytkownika o opinie na temat początkowych rekomendacji.
   - Przykład:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Proces korygujący RAG**
   - **Technika promptowania**: Agent podróży formułuje nowe zapytania wyszukiwania na podstawie opinii użytkownika.
     - Przykład:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Narzędzie**: Agent podróży używa algorytmów do oceniania i filtrowania nowych wyników wyszukiwania, kładąc nacisk na trafność zgodnie z opinią użytkownika.
     - Przykład:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Ocena**: Agent podróży ciągle ocenia trafność i dokładność swoich rekomendacji, analizując opinie użytkowników i wprowadzając niezbędne korekty.
     - Przykład:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktyczny przykład

Oto uproszczony przykład kodu w Pythonie wdrażający podejście korygujące RAG w Agencie podróży:

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

# Przykład użycia
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

### Wstępne ładowanie kontekstu
Pre-emptive Context Load polega na załadowaniu istotnego kontekstu lub informacji tła do modelu przed przetworzeniem zapytania. Oznacza to, że model ma dostęp do tych informacji od samego początku, co może pomóc mu generować bardziej poinformowane odpowiedzi bez konieczności pobierania dodatkowych danych w trakcie przetwarzania.

Poniżej znajduje się uproszczony przykład, jak pre-emptive context load może wyglądać dla aplikacji dla agentów turystycznych w Pythonie:

```python
class TravelAgent:
    def __init__(self):
        # Wstępnie załaduj popularne destynacje i ich informacje
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Pobierz informacje o destynacji z wstępnie załadowanego kontekstu
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Przykładowe użycie
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Wyjaśnienie

1. **Inicjalizacja (`__init__` metoda)**: Klasa `TravelAgent` wstępnie ładuje słownik zawierający informacje o popularnych destynacjach takich jak Paryż, Tokio, Nowy Jork i Sydney. Ten słownik zawiera szczegóły takie jak kraj, waluta, język i główne atrakcje dla każdej destynacji.

2. **Pobieranie informacji (`get_destination_info` metoda)**: Gdy użytkownik zapyta o konkretną destynację, metoda `get_destination_info` pobiera odpowiednie informacje ze wstępnie załadowanego słownika kontekstu.

Dzięki wstępnemu załadowaniu kontekstu aplikacja agenta turystycznego może szybko odpowiadać na zapytania użytkowników bez konieczności pobierania tych informacji z zewnętrznego źródła w czasie rzeczywistym. Sprawia to, że aplikacja jest bardziej wydajna i responsywna.

### Rozpoczynanie planu od celu przed iteracją

Bootstrapowanie planu z uwzględnieniem celu polega na zaczęciu od jasnego celu lub oczekiwanego wyniku. Określając cel na wstępie, model może używać go jako zasady przewodniej podczas iteracyjnego procesu. Pomaga to zapewnić, że każda iteracja przybliża do osiągnięcia zamierzonego rezultatu, co sprawia, że proces jest bardziej efektywny i ukierunkowany.

Poniżej znajduje się przykład, jak można zainicjować plan podróży z celem przed iterowaniem dla agenta turystycznego w Pythonie:

### Scenariusz

Agent turystyczny chce zaplanować spersonalizowane wakacje dla klienta. Celem jest stworzenie planu podróży, który maksymalizuje satysfakcję klienta na podstawie jego preferencji i budżetu.

### Kroki

1. Zdefiniuj preferencje klienta i budżet.
2. Zainicjuj początkowy plan na podstawie tych preferencji.
3. Iteruj, aby dopracować plan, optymalizując go pod kątem satysfakcji klienta.

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

# Przykładowe użycie
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

#### Wyjaśnienie kodu

1. **Inicjalizacja (`__init__` metoda)**: Klasa `TravelAgent` jest inicjalizowana listą potencjalnych destynacji, z których każda ma atrybuty takie jak nazwa, koszt i typ aktywności.

2. **Bootstrapowanie planu (`bootstrap_plan` metoda)**: Ta metoda tworzy początkowy plan podróży na podstawie preferencji i budżetu klienta. Iteruje przez listę destynacji i dodaje je do planu, jeśli pasują do preferencji klienta i mieszczą się w budżecie.

3. **Dopasowywanie preferencji (`match_preferences` metoda)**: Ta metoda sprawdza, czy destynacja odpowiada preferencjom klienta.

4. **Iteracja planu (`iterate_plan` metoda)**: Ta metoda dopracowuje początkowy plan, próbując zastąpić każdą destynację w planie lepszym dopasowaniem, biorąc pod uwagę preferencje klienta i ograniczenia budżetowe.

5. **Obliczanie kosztu (`calculate_cost` metoda)**: Ta metoda oblicza całkowity koszt bieżącego planu, wliczając potencjalnie nową destynację.

#### Przykładowe użycie

- **Początkowy plan**: Agent turystyczny tworzy początkowy plan na podstawie preferencji klienta dotyczących zwiedzania oraz budżetu w wysokości 2000 USD.
- **Dopracowany plan**: Agent turystyczny iteruje plan, optymalizując go pod kątem preferencji klienta i budżetu.

Dzięki zainicjowaniu planu od jasnego celu (np. maksymalizacja satysfakcji klienta) i iteracyjnemu dopracowywaniu planu, agent turystyczny może stworzyć spersonalizowany i zoptymalizowany plan podróży dla klienta. Takie podejście zapewnia, że plan podróży od samego początku jest zgodny z preferencjami i budżetem klienta oraz poprawia się z każdą iteracją.

### Wykorzystanie LLM do ponownego rangiowania i oceniania

Duże modele językowe (LLMs) mogą być używane do ponownego rangiowania i oceniania, oceniając trafność i jakość pobranych dokumentów lub wygenerowanych odpowiedzi. Oto jak to działa:

**Pobieranie:** Początkowy etap pobierania pozyskuje zestaw kandydatów dokumentów lub odpowiedzi na podstawie zapytania.

**Ponowne rangiowanie:** LLM ocenia tych kandydatów i ponownie je sortuje na podstawie trafności i jakości. Ten krok zapewnia, że najtrafniejsze i najwyższej jakości informacje są prezentowane jako pierwsze.

**Ocenianie:** LLM przypisuje każdemu kandydatowi oceny, odzwierciedlające ich trafność i jakość. Pomaga to w wyborze najlepszej odpowiedzi lub dokumentu dla użytkownika.

Wykorzystując LLM do ponownego rangiowania i oceniania, system może dostarczać dokładniejsze i kontekstowo bardziej trafne informacje, poprawiając ogólne doświadczenie użytkownika.

Poniżej przykład, jak agent turystyczny może użyć dużego modelu językowego (LLM) do ponownego rangiowania i oceniania destynacji turystycznych na podstawie preferencji użytkownika w Pythonie:

#### Scenariusz - podróż oparta na preferencjach

Agent turystyczny chce polecić najlepsze destynacje podróżnicze klientowi na podstawie jego preferencji. LLM pomoże ponownie uporządkować i ocenić destynacje, aby zapewnić najbardziej trafne opcje.

#### Kroki:

1. Zbierz preferencje użytkownika.
2. Pobierz listę potencjalnych destynacji podróżniczych.
3. Użyj LLM do ponownego rangiowania i oceniania destynacji na podstawie preferencji użytkownika.

Oto jak możesz zaktualizować poprzedni przykład, aby użyć usług Azure OpenAI:

#### Wymagania

1. Musisz mieć subskrypcję Azure.
2. Utwórz zasób Azure OpenAI i zdobądź swój klucz API.

#### Przykładowy kod Python

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Wygeneruj prompt dla Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Zdefiniuj nagłówki i dane żądania
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Wywołaj API Azure OpenAI, aby uzyskać ponownie posortowane i ocenione miejsca docelowe
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Wyodrębnij i zwróć rekomendacje
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

# Przykładowe użycie
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

#### Wyjaśnienie kodu - Preference Booker

1. **Inicjalizacja**: Klasa `TravelAgent` jest inicjalizowana listą potencjalnych destynacji podróżniczych, z których każda ma atrybuty takie jak nazwa i opis.

2. **Uzyskiwanie rekomendacji (`get_recommendations` metoda)**: Ta metoda generuje prompt dla usługi Azure OpenAI na podstawie preferencji użytkownika i wykonuje żądanie HTTP POST do API Azure OpenAI, aby uzyskać ponownie uporządkowane i ocenione destynacje.

3. **Generowanie promptu (`generate_prompt` metoda)**: Ta metoda konstruuje prompt dla Azure OpenAI, uwzględniając preferencje użytkownika i listę destynacji. Prompt instruuje model, aby ponownie uporządkował i ocenił destynacje na podstawie podanych preferencji.

4. **Wywołanie API**: Biblioteka `requests` jest używana do wykonania żądania HTTP POST do punktu końcowego Azure OpenAI. Odpowiedź zawiera ponownie uporządkowane i ocenione destynacje.

5. **Przykładowe użycie**: Agent turystyczny zbiera preferencje użytkownika (np. zainteresowanie zwiedzaniem i różnorodną kulturą) i używa usługi Azure OpenAI, aby uzyskać ponownie uporządkowane i ocenione rekomendacje destynacji.

Upewnij się, że zastąpisz `your_azure_openai_api_key` swoim faktycznym kluczem API usługi Azure OpenAI oraz `https://your-endpoint.com/...` rzeczywistym adresem punktu końcowego wdrożenia Azure OpenAI.

Wykorzystując LLM do ponownego rangiowania i oceniania, agent turystyczny może dostarczać bardziej spersonalizowane i trafne rekomendacje podróżnicze klientom, poprawiając ich ogólne doświadczenie.

### RAG: technika promptowania kontra narzędzie

Retrieval-Augmented Generation (RAG) może być zarówno techniką promptowania, jak i narzędziem w rozwoju agentów AI. Zrozumienie rozróżnienia między nimi może pomóc lepiej wykorzystać RAG w projektach.

#### RAG jako technika promptowania

**Czym to jest?**

- Jako technika promptowania, RAG polega na formułowaniu konkretnych zapytań lub promptów, aby ukierunkować pobieranie odpowiednich informacji z dużego korpusu lub bazy danych. Te informacje są następnie używane do generowania odpowiedzi lub działań.

**Jak to działa:**

1. **Formułowanie promptów**: Twórz dobrze zbudowane prompt'y lub zapytania w oparciu o zadanie lub wejście użytkownika.
2. **Pobieranie informacji**: Użyj promptów do wyszukania odpowiednich danych w istniejącej bazie wiedzy lub zbiorze danych.
3. **Generowanie odpowiedzi**: Połącz pozyskane informacje z modelami generatywnymi AI, aby wygenerować wyczerpującą i spójną odpowiedź.

**Przykład w agencie turystycznym**:

- Wejście użytkownika: "I want to visit museums in Paris."
- Prompt: "Find top museums in Paris."
- Pobranie informacji: Szczegóły o Musée du Louvre, Musée d'Orsay itd.
- Wygenerowana odpowiedź: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

#### RAG jako narzędzie

**Czym to jest?**

- Jako narzędzie, RAG jest zintegrowanym systemem, który automatyzuje proces pobierania i generowania, ułatwiając deweloperom implementację złożonych funkcji AI bez ręcznego tworzenia promptów dla każdego zapytania.

**Jak to działa:**

1. **Integracja**: Osadź RAG w architekturze agenta AI, pozwalając mu automatycznie obsługiwać zadania pobierania i generowania.
2. **Automatyzacja**: Narzędzie zarządza całym procesem, od otrzymania wejścia użytkownika po wygenerowanie końcowej odpowiedzi, bez konieczności ręcznego tworzenia promptów dla każdego kroku.
3. **Wydajność**: Usprawnia działanie agenta poprzez uporządkowanie procesu pobierania i generowania, umożliwiając szybsze i dokładniejsze odpowiedzi.

**Przykład w agencie turystycznym**:

- Wejście użytkownika: "I want to visit museums in Paris."
- Narzędzie RAG: Automatycznie pobiera informacje o muzeach i generuje odpowiedź.
- Wygenerowana odpowiedź: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

### Porównanie

| Aspekt                 | Technika promptowania                                        | Narzędzie                                                  |
|------------------------|-------------------------------------------------------------|------------------------------------------------------------|
| **Ręczne vs Automatyczne**| Ręczne formułowanie promptów dla każdego zapytania.               | Zautomatyzowany proces pobierania i generowania.           |
| **Kontrola**            | Daje większą kontrolę nad procesem wyszukiwania.             | Usprawnia i automatyzuje proces pobierania i generowania.|
| **Elastyczność**        | Pozwala na dostosowane prompty w zależności od potrzeb.      | Bardziej wydajne w implementacjach na dużą skalę.         |
| **Złożoność**           | Wymaga tworzenia i dopracowywania promptów.                  | Łatwiejsze do zintegrowania w architekturze agenta AI.    |

### Praktyczne przykłady

**Przykład techniki tworzenia promptów:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Przykład narzędzia:**

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

### Ocena trafności

Ocena trafności jest kluczowym aspektem wydajności agenta AI. Zapewnia, że informacje pobrane i wygenerowane przez agenta są odpowiednie, dokładne i użyteczne dla użytkownika. Przyjrzyjmy się, jak oceniać trafność w agentach AI, wraz z praktycznymi przykładami i technikami.

#### Kluczowe pojęcia w ocenie trafności

1. **Świadomość kontekstu**:
   - Agent musi rozumieć kontekst zapytania użytkownika, aby pobierać i generować trafne informacje.
   - Przykład: Jeśli użytkownik pyta o "najlepsze restauracje w Paryżu", agent powinien uwzględnić preferencje użytkownika, takie jak rodzaj kuchni i budżet.

2. **Dokładność**:
   - Informacje dostarczane przez agenta powinny być merytorycznie poprawne i aktualne.
   - Przykład: Polecanie aktualnie otwartych restauracji z dobrymi opiniami, zamiast przestarzałych lub zamkniętych opcji.

3. **Intencja użytkownika**:
   - Agent powinien wywnioskować intencję użytkownika stojącą za zapytaniem, aby dostarczyć najbardziej trafne informacje.
   - Przykład: Jeśli użytkownik pyta o "tanie hotele", agent powinien priorytetowo traktować przystępne cenowo opcje.

4. **Pętla feedbacku**:
   - Ciągłe zbieranie i analizowanie opinii użytkowników pomaga agentowi udoskonalić proces oceny trafności.
   - Przykład: Włączanie ocen i opinii użytkowników dotyczących wcześniejszych rekomendacji w celu poprawy przyszłych odpowiedzi.

#### Praktyczne techniki oceny trafności

1. **Ocena trafności (Relevance Scoring)**:
   - Przypisz każdemu pobranemu elementowi wynik trafności na podstawie tego, jak dobrze pasuje do zapytania i preferencji użytkownika.
   - Przykład:

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

2. **Filtrowanie i ranking**:
   - Odfiltruj nietrafne elementy i uporządkuj pozostałe na podstawie ich wyników trafności.
   - Przykład:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Zwróć 10 najbardziej istotnych elementów
     ```

3. **Przetwarzanie języka naturalnego (NLP)**:
   - Użyj technik NLP do zrozumienia zapytania użytkownika i pobrania trafnych informacji.
   - Przykład:

     ```python
     def process_query(query):
         # Użyj NLP, aby wyodrębnić kluczowe informacje z zapytania użytkownika
         processed_query = nlp(query)
         return processed_query
     ```

4. **Integracja opinii użytkowników**:
   - Zbieraj opinie użytkowników na temat przedstawionych rekomendacji i używaj ich do dostosowywania przyszłych ocen trafności.
   - Przykład:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Przykład: ocena trafności w agencie turystycznym

Oto praktyczny przykład, jak agent turystyczny może oceniać trafność rekomendacji podróży:

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
        return ranked_items[:10]  # Zwróć 10 najbardziej istotnych elementów

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

# Przykład użycia
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

### Wyszukiwanie z intencją

Wyszukiwanie z intencją polega na rozumieniu i interpretowaniu ukrytego celu lub zamierzenia stojącego za zapytaniem użytkownika, aby pobrać i wygenerować najbardziej trafne i użyteczne informacje. Podejście to wykracza poza proste dopasowanie słów kluczowych i koncentruje się na uchwyceniu rzeczywistych potrzeb i kontekstu użytkownika.

#### Kluczowe pojęcia w wyszukiwaniu z intencją

1. **Zrozumienie intencji użytkownika**:
   - Intencję użytkownika można sklasyfikować na trzy główne typy: informacyjną, nawigacyjną i transakcyjną.
     - **Intencja informacyjna**: Użytkownik szuka informacji na dany temat (np. "Jakie są najlepsze muzea w Paryżu?").
     - **Intencja nawigacyjna**: Użytkownik chce przejść do konkretnej witryny lub strony (np. "Oficjalna strona internetowa Luwru").
     - **Intencja transakcyjna**: Użytkownik ma na celu wykonanie transakcji, takiej jak rezerwacja lotu lub dokonanie zakupu (np. "Zarezerwuj lot do Paryża").

2. **Świadomość kontekstu**:
   - Analiza kontekstu zapytania użytkownika pomaga dokładnie zidentyfikować jego intencję. Obejmuje to uwzględnienie wcześniejszych interakcji, preferencji użytkownika i szczegółów aktualnego zapytania.

3. **Przetwarzanie języka naturalnego (NLP)**:
   - Techniki NLP są stosowane do zrozumienia i interpretacji zapytań w języku naturalnym zadawanych przez użytkowników. Obejmuje to zadania takie jak rozpoznawanie encji, analiza sentymentu i parsowanie zapytań.

4. **Personalizacja**:
   - Personalizacja wyników wyszukiwania na podstawie historii użytkownika, preferencji i opinii zwiększa trafność pobieranych informacji.

#### Praktyczny przykład: wyszukiwanie z intencją w agencie turystycznym

Weźmy agenta turystycznego jako przykład, aby zobaczyć, jak można zaimplementować wyszukiwanie z intencją.

1. **Zbieranie preferencji użytkownika**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Zrozumienie intencji użytkownika**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Świadomość kontekstu**
   ```python
   def analyze_context(query, user_history):
       # Połącz bieżące zapytanie z historią użytkownika, aby zrozumieć kontekst
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Wyszukiwanie i personalizacja wyników**

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
       # Przykładowa logika wyszukiwania dla intencji informacyjnej
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Przykładowa logika wyszukiwania dla intencji nawigacyjnej
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Przykładowa logika wyszukiwania dla intencji transakcyjnej
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Przykładowa logika personalizacji
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Zwróć 10 najlepszych spersonalizowanych wyników
   ```

5. **Przykładowe użycie**

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

## 4. Generowanie kodu jako narzędzie

Agenci generujący kod używają modeli AI do pisania i wykonywania kodu, rozwiązując złożone problemy i automatyzując zadania.

### Agenci generujący kod

Agenci generujący kod korzystają z generatywnych modeli AI do pisania i wykonywania kodu. Tacy agenci mogą rozwiązywać złożone problemy, automatyzować zadania i dostarczać cennych wniosków poprzez generowanie i uruchamianie kodu w różnych językach programowania.

#### Praktyczne zastosowania

1. **Zautomatyzowane generowanie kodu**: Generowanie fragmentów kodu dla konkretnych zadań, takich jak analiza danych, skrobanie stron internetowych lub uczenie maszynowe.
2. **SQL jako RAG**: Używaj zapytań SQL do pobierania i manipulowania danymi z baz danych.
3. **Rozwiązywanie problemów**: Tworzenie i wykonywanie kodu w celu rozwiązania konkretnych problemów, takich jak optymalizacja algorytmów lub analiza danych.

#### Przykład: Agent generujący kod do analizy danych

Wyobraź sobie, że projektujesz agenta generującego kod. Oto jak może działać:

1. **Zadanie**: Analizować zbiór danych, aby zidentyfikować trendy i wzorce.
2. **Kroki**:
   - Załaduj zbiór danych do narzędzia do analizy danych.
   - Wygeneruj zapytania SQL do filtrowania i agregowania danych.
   - Wykonaj zapytania i pobierz wyniki.
   - Wykorzystaj wyniki do tworzenia wizualizacji i wniosków.
3. **Wymagane zasoby**: Dostęp do zbioru danych, narzędzi do analizy danych oraz możliwości SQL.
4. **Doświadczenie**: Wykorzystuj wyniki poprzednich analiz, aby poprawić dokładność i trafność przyszłych analiz.

### Przykład: Agent generujący kod dla agenta podróży

W tym przykładzie zaprojektujemy agenta generującego kod, Travel Agent, który pomoże użytkownikom w planowaniu podróży poprzez generowanie i wykonywanie kodu. Ten agent może obsługiwać zadania takie jak pobieranie opcji podróży, filtrowanie wyników i kompilowanie planu podróży za pomocą generatywnej AI.

#### Przegląd agenta generującego kod

1. **Zbieranie preferencji użytkownika**: Zbiera dane wejściowe od użytkownika, takie jak miejsce docelowe, daty podróży, budżet i zainteresowania.
2. **Generowanie kodu do pobierania danych**: Generuje fragmenty kodu do pobierania danych o lotach, hotelach i atrakcjach.
3. **Wykonywanie wygenerowanego kodu**: Uruchamia wygenerowany kod, aby pobrać informacje w czasie rzeczywistym.
4. **Generowanie planu podróży**: Kompiluje pobrane dane w spersonalizowany plan podróży.
5. **Dostosowywanie na podstawie opinii**: Otrzymuje opinie użytkownika i w razie potrzeby regeneruje kod, aby dopracować wyniki.

#### Implementacja krok po kroku

1. **Zbieranie preferencji użytkownika**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generowanie kodu do pobierania danych**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Przykład: Wygeneruj kod do wyszukiwania lotów na podstawie preferencji użytkownika
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Przykład: Wygeneruj kod do wyszukiwania hoteli
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Wykonywanie wygenerowanego kodu**

   ```python
   def execute_code(code):
       # Wykonaj wygenerowany kod przy użyciu exec
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

4. **Generowanie planu podróży**

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

5. **Dostosowywanie na podstawie opinii**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Dostosuj preferencje na podstawie opinii użytkownika
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Wygeneruj ponownie i uruchom kod z zaktualizowanymi preferencjami
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Wykorzystywanie świadomości środowiskowej i rozumowania

Wykorzystanie schematu tabeli może rzeczywiście usprawnić proces generowania zapytań poprzez zastosowanie świadomości środowiskowej i rozumowania.

Oto przykład, jak można to zrobić:

1. **Zrozumienie schematu**: System zrozumie schemat tabeli i wykorzysta te informacje do osadzenia procesu generowania zapytań.
2. **Dostosowywanie na podstawie opinii**: System dostosuje preferencje użytkownika na podstawie opinii i przeanalizuje, które pola w schemacie wymagają aktualizacji.
3. **Generowanie i wykonywanie zapytań**: System wygeneruje i wykona zapytania, aby pobrać zaktualizowane dane o lotach i hotelach na podstawie nowych preferencji.

Oto zaktualizowany przykład w Pythonie, który uwzględnia te koncepcje:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Dostosuj preferencje na podstawie opinii użytkownika
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Wnioskowanie na podstawie schematu w celu dostosowania innych powiązanych preferencji
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Niestandardowa logika do dostosowywania preferencji na podstawie schematu i informacji zwrotnej
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Wygeneruj kod do pobierania danych o lotach na podstawie zaktualizowanych preferencji
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Wygeneruj kod do pobierania danych o hotelach na podstawie zaktualizowanych preferencji
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Zasymuluj wykonanie kodu i zwróć dane testowe
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Wygeneruj plan podróży na podstawie lotów, hoteli i atrakcji
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Przykładowy schemat
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Przykładowe użycie
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Wygeneruj ponownie i wykonaj kod z zaktualizowanymi preferencjami
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Wyjaśnienie - Rezerwacja na podstawie opinii

1. **Świadomość schematu**: Słownik `schema` definiuje, jak preferencje powinny być dostosowywane na podstawie opinii. Zawiera pola takie jak `favorites` i `avoid`, wraz z odpowiednimi korektami.
2. **Dostosowywanie preferencji (`adjust_based_on_feedback` method)**: Ta metoda dostosowuje preferencje na podstawie opinii użytkownika i schematu.
3. **Dostosowania oparte na środowisku (`adjust_based_on_environment` method)**: Ta metoda dostosowuje korekty w oparciu o schemat i opinie.
4. **Generowanie i wykonywanie zapytań**: System generuje kod do pobrania zaktualizowanych danych o lotach i hotelach na podstawie dostosowanych preferencji i symuluje wykonanie tych zapytań.
5. **Generowanie planu podróży**: System tworzy zaktualizowany plan podróży na podstawie nowych danych o lotach, hotelach i atrakcjach.

Dzięki uczynieniu systemu świadomym środowiska i stosowaniu rozumowania opartego na schemacie, może on generować bardziej dokładne i trafne zapytania, co prowadzi do lepszych rekomendacji podróżniczych i bardziej spersonalizowanego doświadczenia użytkownika.

### Wykorzystanie SQL jako techniki Retrieval-Augmented Generation (RAG)

SQL (Structured Query Language) jest potężnym narzędziem do komunikacji z bazami danych. Kiedy jest używany jako część podejścia Retrieval-Augmented Generation (RAG), SQL może pobierać istotne dane z baz danych, aby informować oraz generować odpowiedzi lub działania w agentach AI. Przyjrzyjmy się, jak SQL może być używane jako technika RAG w kontekście Travel Agent.

#### Kluczowe koncepcje

1. **Interakcja z bazą danych**:
   - SQL jest używany do zapytywania baz danych, pobierania istotnych informacji i manipulowania danymi.
   - Przykład: Pobieranie informacji o lotach, hotelach i atrakcjach z bazy danych podróży.

2. **Integracja z RAG**:
   - Zapytania SQL są generowane na podstawie danych wejściowych i preferencji użytkownika.
   - Pobranie danych jest następnie wykorzystywane do generowania spersonalizowanych rekomendacji lub działań.

3. **Dynamiczne generowanie zapytań**:
   - Agent AI generuje dynamiczne zapytania SQL w oparciu o kontekst i potrzeby użytkownika.
   - Przykład: Dostosowywanie zapytań SQL w celu filtrowania wyników według budżetu, dat i zainteresowań.

#### Zastosowania

- **Zautomatyzowane generowanie kodu**: Generowanie fragmentów kodu dla konkretnych zadań.
- **SQL jako RAG**: Używanie zapytań SQL do manipulacji danymi.
- **Rozwiązywanie problemów**: Tworzenie i wykonywanie kodu w celu rozwiązywania problemów.

**Przykład**:
Agent analizy danych:

1. **Zadanie**: Analizować zbiór danych, aby znaleźć trendy.
2. **Kroki**:
   - Załaduj zbiór danych.
   - Wygeneruj zapytania SQL do filtrowania danych.
   - Wykonaj zapytania i pobierz wyniki.
   - Wygeneruj wizualizacje i wnioski.
3. **Zasoby**: Dostęp do zbioru danych, możliwości SQL.
4. **Doświadczenie**: Wykorzystuj wcześniejsze wyniki, aby poprawić przyszłe analizy.

#### Praktyczny przykład: Wykorzystanie SQL w Travel Agent

1. **Zbieranie preferencji użytkownika**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generowanie zapytań SQL**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Wykonywanie zapytań SQL**

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

4. **Generowanie rekomendacji**

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

#### Przykładowe zapytania SQL

1. **Zapytanie o loty**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Zapytanie o hotele**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Zapytanie o atrakcje**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Wykorzystując SQL jako część techniki Retrieval-Augmented Generation (RAG), agenci AI tacy jak Travel Agent mogą dynamicznie pobierać i wykorzystywać odpowiednie dane, aby dostarczać dokładne i spersonalizowane rekomendacje.

### Przykład metapoznania

Aby zademonstrować implementację metapoznania, stwórzmy prostego agenta, który *reflektuje nad swoim procesem podejmowania decyzji* podczas rozwiązywania problemu. W tym przykładzie zbudujemy system, w którym agent próbuje zoptymalizować wybór hotelu, ale następnie ocenia swoje rozumowanie i dostosowuje strategię, gdy popełnia błędy lub dokonuje suboptymalnych wyborów.

#### Jak to ilustruje metapoznanie:

1. **Początkowa decyzja**: Agent wybierze najtańszy hotel, nie rozumiejąc wpływu na jakość.
2. **Refleksja i ocena**: Po wstępnym wyborze agent sprawdzi, czy hotel był "złym" wyborem, wykorzystując opinie użytkownika. Jeśli stwierdzi, że jakość hotelu była zbyt niska, zastanowi się nad swoim rozumowaniem.
3. **Dostosowywanie strategii**: Agent dostosowuje swoją strategię na podstawie refleksji, przechodząc z "najtańszy" na "highest_quality", poprawiając w ten sposób proces podejmowania decyzji w przyszłych iteracjach.

Oto przykład:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Przechowuje wcześniej wybrane hotele
        self.corrected_choices = []  # Przechowuje poprawione wybory
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Dostępne strategie

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
        # Załóżmy, że mamy opinię użytkownika, która mówi, czy ostatni wybór był dobry, czy nie
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Dostosuj strategię, jeśli poprzedni wybór był niezadowalający
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

# Symuluj listę hoteli (cena i jakość)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Utwórz agenta
agent = HotelRecommendationAgent()

# Krok 1: Agent rekomenduje hotel, używając strategii "najtańszy"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Krok 2: Agent rozważa wybór i w razie potrzeby dostosowuje strategię
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Krok 3: Agent ponownie rekomenduje, tym razem używając dostosowanej strategii
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Zdolności metapoznawcze agentów

Kluczowe w tym jest zdolność agenta do:
- Oceniać swoje wcześniejsze wybory i proces podejmowania decyzji.
- Dostosowywać swoją strategię na podstawie tej refleksji, czyli metapoznanie w praktyce.

Jest to prosta forma metapoznania, w której system potrafi dostosowywać swój proces rozumowania na podstawie wewnętrznego sprzężenia zwrotnego.

### Wnioski

Metapoznanie jest potężnym narzędziem, które może znacząco zwiększyć możliwości agentów AI. Poprzez włączenie procesów metapoznawczych można projektować agentów, którzy są bardziej inteligentni, elastyczni i wydajni. Skorzystaj z dodatkowych zasobów, aby dalej zgłębiać fascynujący świat metapoznania w agentach AI.

### Masz więcej pytań na temat wzorca projektowego metapoznania?

Dołącz do [serwera Microsoft Foundry na Discordzie](https://aka.ms/ai-agents/discord), aby spotkać się z innymi uczącymi się, uczestniczyć w godzinach konsultacji i uzyskać odpowiedzi na pytania dotyczące agentów AI.

## Poprzednia lekcja

[Wzorzec projektowy wieloagentowy](../08-multi-agent/README.md)

## Następna lekcja

[Agenci AI w produkcji](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Dokument został przetłumaczony przy użyciu usługi tłumaczeń AI [Co-op Translator](https://github.com/Azure/co-op-translator). Chociaż dążymy do dokładności, prosimy pamiętać, że tłumaczenia automatyczne mogą zawierać błędy lub nieścisłości. Oryginalny dokument w języku źródłowym należy traktować jako źródło autorytatywne. W przypadku informacji o krytycznym znaczeniu zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za żadne nieporozumienia ani błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->