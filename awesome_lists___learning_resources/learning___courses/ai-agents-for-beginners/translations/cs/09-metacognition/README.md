[![Multi-Agent Design](../../../translated_images/cs/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Klikněte na obrázek výše pro zhlédnutí videa této lekce)_
# Metakognice u AI agentů

## Úvod

Vítejte v lekci o metakognici u AI agentů! Tato kapitola je určena pro začátečníky, kteří se zajímají o to, jak mohou AI agenti uvažovat o svých vlastních myšlenkových procesech. Na konci této lekce porozumíte klíčovým konceptům a budete vybaveni praktickými příklady, jak metakognici využít při návrhu AI agentů.

## Cíle učení

Po dokončení této lekce budete schopni:

1. Porozumět důsledkům smyček uvažování ve definicích agentů.
2. Používat techniky plánování a vyhodnocování k podpoře samoopravujících se agentů.
3. Vytvořit vlastní agenty schopné manipulovat s kódem k dosažení úkolů.

## Úvod do metakognice

Metakognice označuje kognitivní procesy vyššího řádu, které zahrnují uvažování o vlastním myšlení. Pro AI agenty to znamená schopnost hodnotit a upravovat své činy na základě sebeuvědomění a minulých zkušeností. Metakognice, tedy „uvažování o uvažování“, je důležitý koncept ve vývoji agenních AI systémů. Znamená, že AI systémy jsou si vědomy svých vlastních vnitřních procesů a jsou schopny monitorovat, regulovat a přizpůsobovat své chování. Podobně jako když my čteme situaci v místnosti nebo se díváme na problém. Toto sebeuvědomění může AI systémům pomoci dělat lepší rozhodnutí, identifikovat chyby a dlouhodobě zlepšovat jejich výkon – znovu se vracíme k Turingovu testu a debatě o tom, zda AI převezme kontrolu.

V kontextu agenních AI systémů může metakognice pomoci řešit několik výzev, jako jsou:
- Transparentnost: Zajištění, že AI systémy dokážou vysvětlit své uvažování a rozhodnutí.
- Uvažování: Zlepšení schopnosti AI systémů syntetizovat informace a dělat rozumná rozhodnutí.
- Adaptace: Umožnění AI systémům přizpůsobit se novému prostředí a měnícím se podmínkám.
- Vnímání: Zvýšení přesnosti AI systémů v rozpoznávání a interpretaci dat z prostředí.

### Co je metakognice?

Metakognice, tedy „uvažování o uvažování“, je kognitivní proces vyššího řádu, který zahrnuje sebeuvědomění a seberegulaci vlastních kognitivních procesů. V oblasti AI umožňuje metakognice agentům hodnotit a přizpůsobovat své strategie a činnosti, což vede ke zlepšenému řešení problémů a rozhodovacím schopnostem. Pochopením metakognice můžete navrhovat AI agenty, kteří nejsou jen inteligentnější, ale také adaptabilnější a efektivnější. Ve skutečné metakognici by AI výslovně uvažovala o svém vlastním uvažování.

Příklad: „Upřednostnil(a) jsem levnější lety, protože… Mohl(a) bych však přijít o přímé lety, tak se znovu podívám.“  
Sledování, jak a proč si vybral(a) určitou trasu.  
- Poznání, že udělal(a) chyby kvůli nadměrnému spoléhání se na preference uživatele z poslední doby, a proto modifikuje svůj rozhodovací proces, nejen konečné doporučení.  
- Diagnostika vzorců, jako je: „Kdykoliv uživatel zmíní ‚příliš přeplněné‘, neměl(a) bych jen odstraňovat některé atrakce, ale také přehodnotit svou metodu výběru ‚nejlepších atrakcí‘, pokud vždy hodnotím podle popularity.“

### Důležitost metakognice u AI agentů

Metakognice hraje klíčovou roli při návrhu AI agentů z několika důvodů:

![Importance of Metacognition](../../../translated_images/cs/importance-of-metacognition.b381afe9aae352f7.webp)

- Sebereflexe: Agenti mohou hodnotit svůj vlastní výkon a identifikovat oblasti pro zlepšení.
- Adaptabilita: Agenti mohou upravovat své strategie na základě minulých zkušeností a měnícího se prostředí.
- Oprava chyb: Agenti mohou autonomně detekovat a opravovat chyby, což vede k přesnějším výsledkům.
- Správa zdrojů: Agenti mohou optimalizovat využití zdrojů, jako je čas a výpočetní výkon, plánováním a vyhodnocováním svých akcí.

## Složky AI agenta

Než se pustíme do metakognitivních procesů, je nutné pochopit základní složky AI agenta. AI agent obvykle obsahuje:

- Persona: Osobnost a charakteristiky agenta, které určují, jak komunikuje s uživateli.
- Nástroje: Schopnosti a funkce, které agent může vykonávat.
- Dovednosti: Znalosti a odborné schopnosti, které agent má.

Tyto složky společně tvoří „expertní jednotku“, která může vykonávat specifické úkoly.

**Příklad**:  
Představte si cestovního agenta, agentní služby, která nejen plánuje vaši dovolenou, ale také upravuje trasu na základě dat v reálném čase a zkušeností z cest minulých zákazníků.

### Příklad: Metakognice v cestovní agentuře

Představte si, že navrhujete cestovní agenturu poháněnou AI. Tento agent „Travel Agent“ pomáhá uživatelům plánovat dovolené. Aby byla metakognice začleněna, musí Travel Agent hodnotit a upravovat své činy na základě sebeuvědomění a minulých zkušeností. Zde je, jak může metakognice hrát roli:

#### Aktuální úkol

Aktuálním úkolem je pomoci uživateli naplánovat výlet do Paříže.

#### Kroky k dokončení úkolu

1. **Shromáždit preference uživatele**: Zeptejte se uživatele na cestovní data, rozpočet, zájmy (např. muzea, kuchyně, nakupování) a specifické požadavky.
2. **Získat informace**: Vyhledat možnosti letů, ubytování, atrakcí a restaurací, které odpovídají preferencím uživatele.
3. **Vytvořit doporučení**: Poskytnout personalizovaný itinerář s detaily letů, rezervací hotelů a doporučenými aktivitami.
4. **Upravit dle zpětné vazby**: Požádat uživatele o zpětnou vazbu k doporučením a provést potřebné úpravy.

#### Potřebné zdroje

- Přístup do databází letenek a hotelových rezervací.
- Informace o pařížských atrakcích a restauracích.
- Data o zpětné vazbě uživatelů z předchozích interakcí.

#### Zkušenosti a sebereflexe

Travel Agent používá metakognici k hodnocení svého výkonu a učení se z minulých zkušeností. Například:

1. **Analýza zpětné vazby uživatelů**: Travel Agent hodnotí zpětnou vazbu, aby zjistil, která doporučení byla přijata pozitivně a která ne, a podle toho upravuje své budoucí návrhy.
2. **Adaptabilita**: Pokud uživatel dříve zmínil, že nemá rád(a) přeplněná místa, Travel Agent v budoucnu vynechá doporučení populárních turistických lokalit během špičky.
3. **Oprava chyb**: Pokud Travel Agent udělal v minulosti chybu, například doporučil hotel, který byl plně obsazen, naučí se důkladněji kontrolovat dostupnost před doporučením.

#### Praktický příklad pro vývojáře

Zde je zjednodušený příklad kódu Travel Agent začleňujícího metakognici:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Hledejte lety, hotely a atrakce podle preferencí
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
        # Analyzujte zpětnou vazbu a upravte budoucí doporučení
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Příklad použití
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

#### Proč je metakognice důležitá

- **Sebereflexe**: Agenti mohou analyzovat svůj výkon a nacházet oblasti ke zlepšení.
- **Adaptabilita**: Agenti mohou upravovat strategie podle zpětné vazby a měnících se podmínek.
- **Oprava chyb**: Agenti mohou autonomně detekovat a opravovat chyby.
- **Správa zdrojů**: Agenti mohou optimalizovat využívání zdrojů, jako je čas a výpočetní výkon.

Začleněním metakognice může Travel Agent poskytovat personalizovanější a přesnější cestovní doporučení, což zlepšuje celkový uživatelský zážitek.

---

## 2. Plánování u agentů

Plánování je klíčovou složkou chování AI agenta. Zahrnuje rozvržení kroků nezbytných k dosažení cíle s ohledem na současný stav, zdroje a možné překážky.

### Prvky plánování

- **Aktuální úkol**: Jasně definovat úkol.
- **Kroky k dokončení úkolu**: Rozdělit úkol na zvládnutelné kroky.
- **Potřebné zdroje**: Určit nezbytné zdroje.
- **Zkušenosti**: Využít minulé zkušenosti k informovanému plánování.

**Příklad**:  
Zde jsou kroky, které Travel Agent musí podniknout, aby efektivně asistoval uživateli při plánování cesty:

### Kroky pro Travel Agent

1. **Shromáždit preference uživatele**
   - Zeptejte se uživatele na datum cesty, rozpočet, zájmy a specifické požadavky.
   - Příklady: „Kdy plánujete cestovat?“ „Jaký je váš rozpočet?“ „Jaké aktivity preferujete na dovolené?“

2. **Získat informace**
   - Vyhledat relevantní cestovní možnosti podle preferencí uživatele.
   - **Lety**: Najít dostupné lety v rámci rozpočtu a preferovaných termínů.
   - **Ubytování**: Najít hotely nebo pronájmy odpovídající preferencím uživatele co do lokality, ceny a vybavení.
   - **Atrakce a restaurace**: Identifikovat populární atrakce, aktivity a stravovací možnosti odpovídající zájmům uživatele.

3. **Vytvořit doporučení**
   - Sestavit získané informace do personalizovaného itineráře.
   - Poskytnout detaily jako možnosti letů, rezervace hotelů a navrhované aktivity, s přizpůsobením na uživatelovy preference.

4. **Předložit itinerář uživateli**
   - Sdílet navržený itinerář k revizi.
   - Příklad: „Zde je navržený itinerář vaší cesty do Paříže. Obsahuje detaily o letech, rezervacích hotelů a seznam doporučených aktivit a restaurací. Co na to říkáte?“

5. **Získat zpětnou vazbu**
   - Požádat uživatele o názor na navržený itinerář.
   - Příklady: „Líbí se vám nabídky letů?“ „Vyhovuje vám hotel?“ „Chtěli byste přidat nebo odebrat nějaké aktivity?“

6. **Upravit podle zpětné vazby**
   - Modifikovat itinerář podle připomínek uživatele.
   - Proveďte potřebné změny v letech, ubytování a aktivitách tak, aby lépe odpovídaly preferencím uživatele.

7. **Konečné potvrzení**
   - Předložit upravený itinerář uživateli ke konečnému schválení.
   - Příklad: „Provedl jsem úpravy podle vaší zpětné vazby. Zde je aktualizovaný itinerář. Vypadá to dobře?“

8. **Rezervace a potvrzení**
   - Po schválení itineráře pokračovat v rezervaci letů, ubytování a předem naplánovaných aktivit.
   - Poslat uživateli potvrzovací informace.

9. **Poskytnout průběžnou podporu**
   - Být k dispozici pro pomoc uživateli s případnými změnami nebo dalšími požadavky před cestou i během ní.
   - Příklad: „Pokud budete potřebovat další pomoc během cesty, neváhejte mě kdykoliv kontaktovat!“

### Příklad interakce

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

# Ukázka použití uvnitř žádosti o booing
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

## 3. Korektivní RAG systém

Nejprve si pojďme objasnit rozdíl mezi RAG nástrojem a předběžným načítáním kontextu.

![RAG vs Context Loading](../../../translated_images/cs/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

RAG kombinuje systém vyhledávání s generativním modelem. Když je položena otázka, vyhledávací systém získá relevantní dokumenty nebo data z externího zdroje a tyto získané informace se použijí k doplnění vstupu pro generativní model. To pomáhá modelu generovat přesnější a kontextuálně relevantní odpovědi.

V RAG systému agent vyhledává relevantní informace v databázi znalostí a používá je k vytváření vhodných odpovědí nebo akcí.

### Korektivní RAG přístup

Korektivní RAG přístup se zaměřuje na použití RAG technik k opravě chyb a zlepšení přesnosti AI agentů. Zahrnuje:

1. **Techniku promptování**: Používání specifických promptů k vedení agenta při vyhledávání relevantních informací.
2. **Nástroj**: Implementace algoritmů a mechanismů, které umožňují agentovi hodnotit relevanci získaných informací a generovat přesné odpovědi.
3. **Vyhodnocování**: Neustálé hodnocení výkonu agenta a úpravy za účelem zlepšení přesnosti a efektivity.

#### Příklad: Korektivní RAG u vyhledávacího agenta

Představte si vyhledávacího agenta, který získává informace z webu pro odpovědi na uživatelské dotazy. Korektivní RAG přístup může zahrnovat:

1. **Techniku promptování**: Formulování vyhledávacích dotazů na základě uživatelského vstupu.
2. **Nástroj**: Použití algoritmů zpracování přirozeného jazyka a strojového učení k řazení a filtrování výsledků.
3. **Vyhodnocování**: Analýzu zpětné vazby uživatelů pro identifikaci a opravu nepřesností v získaných informacích.

### Korektivní RAG v Travel Agentovi

Korektivní RAG (Retrieval-Augmented Generation) zlepšuje schopnost AI vyhledávat a generovat informace a zároveň korigovat chyby. Podívejme se, jak Travel Agent může použít korektivní RAG přístup k poskytování přesnějších a relevantnějších cestovních doporučení.

To zahrnuje:

- **Techniku promptování:** Používání specifických promptů pro vedení agenta při vyhledávání relevantních informací.
- **Nástroj:** Implementaci algoritmů a mechanismů, které umožní agentovi hodnotit relevanci informací a generovat přesné odpovědi.
- **Vyhodnocování:** Neustálé posuzování výkonu agenta a úpravy za účelem zlepšení jeho přesnosti a efektivity.

#### Kroky k implementaci korektivního RAG v Travel Agentovi

1. **Počáteční interakce s uživatelem**
   - Travel Agent získává počáteční preference uživatele, jako je destinace, data cesty, rozpočet a zájmy.
   - Příklad:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Získání informací**
   - Travel Agent získává informace o letech, ubytování, atrakcích a restauracích podle uživatelských preferencí.
   - Příklad:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generování počátečních doporučení**
   - Travel Agent používá získané informace k vytvoření personalizovaného itineráře.
   - Příklad:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Sbírání zpětné vazby uživatele**
   - Travel Agent žádá uživatele o zpětnou vazbu k počátečním doporučením.
   - Příklad:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Korektivní RAG proces**
   - **Technika promptování**: Travel Agent formuluje nové vyhledávací dotazy na základě zpětné vazby uživatele.
     - Příklad:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Nástroj**: Travel Agent používá algoritmy k řazení a filtrování nových výsledků hledání, kladoucí důraz na relevanci podle zpětné vazby.
     - Příklad:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Vyhodnocování**: Travel Agent neustále hodnotí relevanci a přesnost svých doporučení analýzou zpětné vazby uživatele a provádí potřebné úpravy.
     - Příklad:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktický příklad

Zde je zjednodušený příklad Python kódu začleňujícího korektivní RAG přístup v Travel Agentovi:

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

# Příklad použití
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

### Předběžné načítání kontextu
Předběžné načtení kontextu zahrnuje nahrání relevantního kontextu nebo základních informací do modelu před zpracováním dotazu. To znamená, že model má k těmto informacím přístup od začátku, což mu může pomoci generovat informovanější odpovědi, aniž by musel během procesu načítat další data.

Zde je zjednodušený příklad, jak by mohlo vypadat předběžné načtení kontextu pro aplikaci cestovního agenta v Pythonu:

```python
class TravelAgent:
    def __init__(self):
        # Přednačíst populární destinace a jejich informace
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Získat informace o destinaci z přednačteného kontextu
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Příklad použití
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Vysvětlení

1. **Inicializace (metoda `__init__`)**: Třída `TravelAgent` přednačte slovník obsahující informace o populárních destinacích, jako jsou Paříž, Tokio, New York a Sydney. Tento slovník zahrnuje detaily jako země, měna, jazyk a hlavní atrakce pro každou destinaci.

2. **Získání informací (metoda `get_destination_info`)**: Když uživatel položí dotaz ohledně konkrétní destinace, metoda `get_destination_info` načte relevantní informace ze slovníku přednačteného kontextu.

Předběžným načtením kontextu může aplikace cestovního agenta rychle reagovat na dotazy uživatelů, aniž by musela v reálném čase získávat informace z externího zdroje. To činí aplikaci efektivnější a rychlejší.

### Inicializace plánu s cílem před iterací

Inicializace plánu s cílem znamená začít s jasným záměrem nebo požadovaným výsledkem. Definováním tohoto cíle na začátku může model používat tento cíl jako vodítko během celého iterativního procesu. To pomáhá zajistit, že každá iterace se blíží k dosažení požadovaného výsledku, čímž je proces efektivnější a cílenější.

Zde je příklad, jak můžete inicializovat cestovní plán s cílem před iterací pro cestovního agenta v Pythonu:

### Scénář

Cestovní agent chce naplánovat přizpůsobenou dovolenou pro klienta. Cílem je vytvořit cestovní itinerář, který maximalizuje spokojenost klienta na základě jeho preferencí a rozpočtu.

### Kroky

1. Definovat preference klienta a rozpočet.
2. Inicializovat počáteční plán na základě těchto preferencí.
3. Iterovat pro zdokonalení plánu s ohledem na spokojenost klienta.

#### Python kód

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

# Příklad použití
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

#### Vysvětlení kódu

1. **Inicializace (metoda `__init__`)**: Třída `TravelAgent` je inicializována s seznamem možných destinací, z nichž každá má atributy jako jméno, cena a typ aktivity.

2. **Inicializace plánu (metoda `bootstrap_plan`)**: Tato metoda vytváří počáteční cestovní plán na základě klientových preferencí a rozpočtu. Prochází seznam destinací a přidává je do plánu, pokud odpovídají preferencím klienta a vejdou se do rozpočtu.

3. **Kontrola shody preferencí (metoda `match_preferences`)**: Tato metoda kontroluje, zda destinace odpovídá klientovým preferencím.

4. **Iterace plánu (metoda `iterate_plan`)**: Tato metoda zdokonaluje počáteční plán tím, že se snaží nahradit každou destinaci v plánu lepší shodou, s ohledem na preference klienta a omezení rozpočtu.

5. **Výpočet nákladů (metoda `calculate_cost`)**: Tato metoda vypočítává celkové náklady aktuálního plánu včetně potenciální nové destinace.

#### Příklad použití

- **Počáteční plán**: Cestovní agent vytvoří počáteční plán na základě klientových preferencí pro prohlídku památek a rozpočtu 2000 USD.
- **Zlepšený plán**: Cestovní agent iteruje plán s optimalizací podle preferencí a rozpočtu klienta.

Inicializací plánu s jasným cílem (například maximalizací spokojenosti klienta) a iterací pro zdokonalení plánu může cestovní agent vytvořit přizpůsobený a optimalizovaný cestovní itinerář pro klienta. Tento přístup zajistí, že cestovní plán odpovídá klientovým preferencím a rozpočtu od začátku a vylepšuje se s každou iterací.

### Využití LLM pro přeřazování a hodnocení

Velké jazykové modely (LLM) lze použít pro přeřazování a hodnocení tím, že vyhodnocují relevantnost a kvalitu získaných dokumentů nebo generovaných odpovědí. Zde je, jak to funguje:

**Získávání:** Počáteční krok získává sadu kandidátních dokumentů nebo odpovědí na základě dotazu.

**Přeřazování:** LLM tyto kandidáty vyhodnotí a přeřadí je podle jejich relevance a kvality. Tento krok zajišťuje, že nejrelevantnější a nejkvalitnější informace jsou zobrazeny jako první.

**Hodnocení:** LLM každému kandidátovi přidělí skóre, které odráží jejich relevanci a kvalitu. To pomáhá při výběru nejlepší odpovědi nebo dokumentu pro uživatele.

Využitím LLM pro přeřazování a hodnocení může systém poskytovat přesnější a kontextuálně relevantní informace, což zlepšuje celkovou uživatelskou zkušenost.

Zde je příklad, jak by cestovní agent mohl použít Velký jazykový model (LLM) pro přeřazování a hodnocení cestovních destinací na základě uživatelských preferencí v Pythonu:

#### Scénář – Cestování na základě preferencí

Cestovní agent chce doporučit nejlepší cestovní destinace klientovi na základě jeho preferencí. LLM pomůže přeřadit a ohodnotit destinace, aby byly prezentovány nejrelevantnější možnosti.

#### Kroky:

1. Shromáždit uživatelské preference.
2. Získat seznam potenciálních cestovních destinací.
3. Použít LLM k přeřazení a ohodnocení destinací na základě uživatelských preferencí.

Zde je způsob, jak můžete aktualizovat předchozí příklad pro použití Azure OpenAI služeb:

#### Požadavky

1. Musíte mít předplatné Azure.
2. Vytvořit Azure OpenAI resource a získat svůj API klíč.

#### Příklad Pythonového kódu

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Vygenerujte prompt pro Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Definujte hlavičky a obsah požadavku
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Zavolejte Azure OpenAI API pro získání přeřazených a ohodnocených destinací
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Extrahujte a vraťte doporučení
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

# Příklad použití
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

#### Vysvětlení kódu – Preference Booker

1. **Inicializace**: Třída `TravelAgent` je inicializována se seznamem potenciálních cestovních destinací, z nichž každá má atributy jako jméno a popis.

2. **Získání doporučení (metoda `get_recommendations`)**: Tato metoda generuje prompt pro službu Azure OpenAI na základě uživatelských preferencí a odesílá HTTP POST požadavek na Azure OpenAI API pro získání přeřazených a ohodnocených destinací.

3. **Generování promptu (metoda `generate_prompt`)**: Tato metoda sestavuje prompt pro Azure OpenAI, který obsahuje uživatelské preference a seznam destinací. Prompt vede model k přeřazení a ohodnocení destinací podle zadaných preferencí.

4. **Volání API**: Knihovna `requests` se používá pro odeslání HTTP POST požadavku na koncový bod Azure OpenAI API. Odpověď obsahuje přeřazené a ohodnocené destinace.

5. **Příklad použití**: Cestovní agent sbírá uživatelské preference (například zájem o prohlídky památek a různorodou kulturu) a využívá službu Azure OpenAI k získání přeřazených a ohodnocených doporučení na cestovní destinace.

Nezapomeňte nahradit `your_azure_openai_api_key` skutečným Azure OpenAI API klíčem a `https://your-endpoint.com/...` skutečnou URL adresou koncového bodu nasazení Azure OpenAI.

Využitím LLM pro přeřazování a hodnocení může cestovní agent klientům poskytnout personalizovanější a relevantnější cestovní doporučení, čímž zlepšuje jejich celkovou zkušenost.

### RAG: technika promptování vs nástroj

Retrieval-Augmented Generation (RAG) může být jak technika promptování, tak nástroj při vývoji AI agentů. Porozumění rozdílu mezi nimi vám pomůže efektivněji využít RAG ve vašich projektech.

#### RAG jako technika promptování

**Co to je?**

- Jako technika promptování RAG zahrnuje formulaci specifických dotazů nebo promptů k získání relevantních informací z rozsáhlého korpusu nebo databáze. Tyto informace se pak používají k generování odpovědí nebo akcí.

**Jak to funguje:**

1. **Formulace promptů**: Vytvořit dobře strukturované prompty nebo dotazy na základě úkolu nebo uživatelského vstupu.
2. **Získání informací**: Použít prompty pro vyhledávání relevantních dat z existující znalostní základny nebo datasetu.
3. **Generování odpovědi**: Kombinovat získané informace s generativními AI modely pro vytvoření komplexní a koherentní odpovědi.

**Příklad v cestovním agentu**:

- Vstup uživatele: „Chci navštívit muzea v Paříži.“
- Prompt: „Najděte nejlepší muzea v Paříži.“
- Získané informace: Detaily o Louvru, Musée d'Orsay atd.
- Generovaná odpověď: „Zde jsou některá nejlepší muzea v Paříži: Louvre, Musée d'Orsay a Centre Pompidou.“

#### RAG jako nástroj

**Co to je?**

- Jako nástroj je RAG integrovaný systém, který automatizuje proces získávání a generování, což usnadňuje vývojářům implementovat složité AI funkce bez nutnosti ručně vytvářet prompty pro každý dotaz.

**Jak to funguje:**

1. **Integrace**: Vložit RAG do architektury AI agenta, což umožní automaticky zpracovávat získávání a generování.
2. **Automatizace**: Nástroj spravuje celý proces, od příjmu vstupu uživatele až po vytvoření konečné odpovědi, bez potřeby explicitních promptů v každém kroku.
3. **Efektivita**: Zlepšuje výkon agenta tím, že zjednodušuje proces získávání a generování, umožňující rychlejší a přesnější odpovědi.

**Příklad v cestovním agentu**:

- Vstup uživatele: „Chci navštívit muzea v Paříži.“
- Nástroj RAG: Automaticky vyhledá informace o muzeích a vytvoří odpověď.
- Generovaná odpověď: „Zde jsou některá nejlepší muzea v Paříži: Louvre, Musée d'Orsay a Centre Pompidou.“

### Porovnání

| Aspekt                  | Technika promptování                                  | Nástroj                                                |
|-------------------------|-------------------------------------------------------|--------------------------------------------------------|
| **Ruční vs Automatické**| Ruční tvorba promptů pro každý dotaz                  | Automatizovaný proces získávání a generování            |
| **Kontrola**            | Nabízí větší kontrolu nad procesem získávání           | Zjednodušuje a automatizuje získávání a generování      |
| **Flexibilita**         | Umožňuje přizpůsobené prompty podle konkrétních potřeb| Efektivnější pro rozsáhlé implementace                  |
| **Složitost**           | Vyžaduje vytváření a ladění promptů                      | Snazší integrace do architektury AI agenta               |

### Praktické příklady

**Příklad techniky promptování:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Příklad nástroje:**

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

### Hodnocení relevance

Hodnocení relevance je zásadní aspekt výkonu AI agenta. Zajišťuje, že informace získané a generované agentem jsou vhodné, přesné a užitečné pro uživatele. Podívejme se, jak hodnotit relevanci u AI agentů včetně praktických příkladů a technik.

#### Klíčové koncepty hodnocení relevance

1. **Povědomí o kontextu**:
   - Agent musí rozumět kontextu uživatelova dotazu, aby získal a generoval relevantní informace.
   - Příklad: Pokud uživatel hledá „nejlepší restaurace v Paříži“, agent by měl zohlednit uživatelovy preference, jako je typ kuchyně a rozpočet.

2. **Přesnost**:
   - Informace poskytnuté agentem by měly být fakticky správné a aktuální.
   - Příklad: Doporučit aktuálně otevřené restaurace s dobrými recenzemi místo zastaralých nebo zavřených.

3. **Záměr uživatele**:
   - Agent by měl vyvodit uživatelův záměr za dotazem, aby poskytl nejrelevantnější informace.
   - Příklad: Pokud uživatel hledá „hotely s nízkým rozpočtem“, agent by měl upřednostnit dostupné levné možnosti.

4. **Smyčka zpětné vazby**:
   - Neustálé sbírání a analýza uživatelské zpětné vazby pomáhá agentovi zdokonalovat hodnocení relevance.
   - Příklad: Zahrnutí uživatelských hodnocení a zpětné vazby na předchozí doporučení k vylepšení budoucích odpovědí.

#### Praktické techniky hodnocení relevance

1. **Skórování relevance**:
   - Přidělte každému získanému položce skóre relevance na základě shody s dotazem a preferencemi uživatele.
   - Příklad:

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

2. **Filtrování a řazení**:
   - Odstraňte nerelevantní položky a seřaďte zbývající podle skóre relevance.
   - Příklad:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Vrátit top 10 relevantních položek
     ```

3. **Zpracování přirozeného jazyka (NLP)**:
   - Použijte NLP techniky k porozumění uživatelskému dotazu a vyhledání relevantních informací.
   - Příklad:

     ```python
     def process_query(query):
         # Použijte NLP k extrakci klíčových informací z dotazu uživatele
         processed_query = nlp(query)
         return processed_query
     ```

4. **Integrace uživatelské zpětné vazby**:
   - Sbírejte zpětnou vazbu k poskytnutým doporučením a použijte ji ke zlepšení budoucího hodnocení relevance.
   - Příklad:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Příklad: Hodnocení relevance u cestovního agenta

Zde je praktický příklad, jak může Travel Agent hodnotit relevanci cestovních doporučení:

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
        return ranked_items[:10]  # Vrátit 10 nejrelevantnějších položek

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

# Příklad použití
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

### Hledání s úmyslem

Hledání s úmyslem zahrnuje pochopení a interpretaci základního účelu nebo cíle uživatelova dotazu, aby se získaly a generovaly co nejrelevantnější a nejužitečnější informace. Tento přístup jde nad rámec pouhého hledání klíčových slov a zaměřuje se na skutečné potřeby a kontext uživatele.

#### Klíčové koncepty hledání s úmyslem

1. **Porozumění úmyslu uživatele**:
   - Úmysl uživatele lze rozdělit do tří hlavních kategorií: informační, navigační a transakční.
     - **Informační úmysl**: Uživatel hledá informace o tématu (např. „Jaká jsou nejlepší muzea v Paříži?“).
     - **Navigační úmysl**: Uživatel chce navigovat na konkrétní webovou stránku nebo stránku (např. „Oficiální web Louvru“).
     - **Transakční úmysl**: Uživatel chce provést transakci, jako je rezervace letu nebo nákup (např. „Rezervovat let do Paříže“).

2. **Povědomí o kontextu**:
   - Analýza kontextu uživatelského dotazu pomáhá přesně určit jeho úmysl. Zahrnuje zohlednění předchozích interakcí, uživatelských preferencí a konkrétních detailů aktuálního dotazu.

3. **Zpracování přirozeného jazyka (NLP)**:
   - Techniky NLP se používají k pochopení a interpretaci přirozených jazykových dotazů uživatelů. Patří sem úlohy jako rozpoznávání entit, analýza sentimentu a parsování dotazu.

4. **Personalizace**:
   - Personalizace výsledků vyhledávání na základě historie uživatele, preferencí a zpětné vazby zlepšuje relevanci získaných informací.

#### Praktický příklad: Hledání s úmyslem v cestovním agentu

Pojďme si ukázat Travel Agent jako příklad, jak může být implementováno hledání s úmyslem.

1. **Shromáždění uživatelských preferencí**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Porozumění úmyslu uživatele**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Povědomí o kontextu**
   ```python
   def analyze_context(query, user_history):
       # Kombinujte aktuální dotaz s historií uživatele pro pochopení kontextu
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Vyhledávání a personalizace výsledků**

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
       # Příklad vyhledávací logiky pro informativní úmysl
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Příklad vyhledávací logiky pro navigační úmysl
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Příklad vyhledávací logiky pro transakční úmysl
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Příklad personalizační logiky
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Vrátit 10 nejlepších personalizovaných výsledků
   ```

5. **Příklad použití**

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

## 4. Generování kódu jako nástroj

Agenti generující kód používají AI modely k psaní a vykonávání kódu, řešení složitých problémů a automatizaci úkolů.

### Agenti generující kód

Agenti generující kód využívají generativní AI modely k psaní a vykonávání kódu. Tito agenti mohou řešit složité problémy, automatizovat úkoly a poskytovat cenné poznatky generováním a spouštěním kódu v různých programovacích jazycích.

#### Praktické aplikace

1. **Automatizovaná generace kódu**: Generování kódových útržků pro konkrétní úkoly, jako je analýza dat, web scraping nebo strojové učení.
2. **SQL jako RAG**: Použití SQL dotazů k získávání a manipulaci s daty z databází.
3. **Řešení problémů**: Vytváření a vykonávání kódu k řešení specifických problémů, jako je optimalizace algoritmů nebo analýza dat.

#### Příklad: Agent generující kód pro analýzu dat

Představte si, že navrhujete agenta generujícího kód. Takto by mohl fungovat:

1. **Úkol**: Analyzovat dataset k identifikaci trendů a vzorců.
2. **Kroky**:
   - Načíst dataset do nástroje pro analýzu dat.
   - Generovat SQL dotazy k filtrování a agregaci dat.
   - Vykonat dotazy a získat výsledky.
   - Použít výsledky k vytvoření vizualizací a poznatků.
3. **Potřebné zdroje**: Přístup k datasetu, nástroje pro analýzu dat a schopnosti SQL.
4. **Zkušenosti**: Využít minulé výsledky analýz k vylepšení přesnosti a relevance budoucích analýz.

### Příklad: Agent generující kód pro cestovní kancelář

V tomto příkladu navrhneme agenta generujícího kód, Travel Agent, který pomáhá uživatelům plánovat cestování generováním a vykonáváním kódu. Tento agent dokáže řešit úkoly jako získávání možností cestování, filtrování výsledků a sestavování itineráře pomocí generativní AI.

#### Přehled agenta generujícího kód

1. **Sbírání preferencí uživatele**: Sbírá vstup uživatele jako je destinace, data cesty, rozpočet a zájmy.
2. **Generování kódu pro získání dat**: Generuje útržky kódu pro získání dat o letech, hotelech a atrakcích.
3. **Vykonávání generovaného kódu**: Spouští generovaný kód pro získání aktuálních informací.
4. **Generování itineráře**: Kompiluje získaná data do personalizovaného cestovního plánu.
5. **Úpravy na základě zpětné vazby**: Přijímá zpětnou vazbu uživatele a při potřeby znovu generuje kód pro vylepšení výsledků.

#### Implementace krok za krokem

1. **Sbírání preferencí uživatele**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generování kódu pro získávání dat**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Příklad: Vygenerujte kód pro hledání letů na základě uživatelských preferencí
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Příklad: Vygenerujte kód pro hledání hotelů
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Vykonávání generovaného kódu**

   ```python
   def execute_code(code):
       # Spusťte vygenerovaný kód pomocí exec
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

4. **Generování itineráře**

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

5. **Úpravy na základě zpětné vazby**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Upravte předvolby na základě zpětné vazby uživatele
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Znovu vygenerujte a spusťte kód s aktualizovanými předvolbami
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Využití povědomí o prostředí a uvažování

Na základě schématu tabulky lze skutečně vylepšit proces generování dotazů využitím povědomí o prostředí a schopnosti uvažování.

Zde je příklad, jak lze toto provést:

1. **Porozumění schématu**: Systém pochopí schéma tabulky a použije tyto informace k zafixování generování dotazu.
2. **Úpravy na základě zpětné vazby**: Systém upraví uživatelské preference na základě zpětné vazby a rozváží, která pole ve schématu je třeba aktualizovat.
3. **Generování a vykonávání dotazů**: Systém generuje a vykonává dotazy ke stažení aktualizovaných dat o letech a hotelech na základě nových preferencí.

Zde je aktualizovaný příklad kódu v Pythonu, který tyto koncepce obsahuje:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Upravte preference na základě zpětné vazby uživatele
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Odůvodnění založené na schématu pro úpravu dalších souvisejících preferencí
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Vlastní logika pro úpravu preferencí na základě schématu a zpětné vazby
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Generovat kód pro získání dat o letech na základě aktualizovaných preferencí
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Generovat kód pro získání dat o hotelech na základě aktualizovaných preferencí
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simulovat provedení kódu a vrátit ukázková data
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Vygenerovat itinerář na základě letů, hotelů a atrakcí
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Ukázkové schéma
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Ukázkové použití
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Znovu vygenerovat a spustit kód s aktualizovanými preferencemi
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Vysvětlení - Rezervace na základě zpětné vazby

1. **Povědomí o schématu**: Slovník `schema` definuje, jak by měly být preference upraveny podle zpětné vazby. Zahrnuje pole jako `favorites` a `avoid` s odpovídajícími úpravami.
2. **Úprava preferencí (`adjust_based_on_feedback` metoda)**: Tato metoda upravuje preference na základě zpětné vazby uživatele a schématu.
3. **Úpravy založené na prostředí (`adjust_based_on_environment` metoda)**: Tato metoda přizpůsobuje úpravy podle schématu a zpětné vazby.
4. **Generování a vykonávání dotazů**: Systém generuje kód pro získání aktualizovaných dat o letech a hotelech na základě upravených preferencí a simuluje vykonání těchto dotazů.
5. **Generování itineráře**: Systém vytváří aktualizovaný itinerář založený na nových datech o letech, hotelech a atrakcích.

Díky tomu, že je systém povědomý o prostředí a uvažuje podle schématu, dokáže generovat přesnější a relevantnější dotazy, což vede k lepším cestovním doporučením a personalizovanému uživatelskému zážitku.

### Použití SQL jako techniky Retrieval-Augmented Generation (RAG)

SQL (Structured Query Language) je mocný nástroj pro práci s databázemi. Použitý jako součást přístupu Retrieval-Augmented Generation (RAG) může SQL načítat relevantní data z databází a pomáhat tak generovat odpovědi nebo akce v AI agentech. Prozkoumejme, jak lze SQL použít jako RAG techniku v kontextu Travel Agenta.

#### Klíčové koncepty

1. **Interakce s databází**:
   - SQL se používá k dotazování databází, získávání relevantních informací a manipulaci s daty.
   - Příklad: Získání detailů o letech, informací o hotelech a atrakcích z cestovní databáze.

2. **Integrace s RAG**:
   - SQL dotazy jsou generovány na základě uživatelského vstupu a preferencí.
   - Získaná data se pak používají k generování personalizovaných doporučení či akcí.

3. **Dynamická generace dotazů**:
   - AI agent generuje dynamické SQL dotazy podle kontextu a potřeb uživatele.
   - Příklad: Přizpůsobení SQL dotazů pro filtrování výsledků podle rozpočtu, dat a zájmů.

#### Aplikace

- **Automatizovaná generace kódu**: Generování kódových útržků pro specifické úkoly.
- **SQL jako RAG**: Použití SQL dotazů k manipulaci s daty.
- **Řešení problémů**: Vytváření a vykonávání kódu k řešení problémů.

**Příklad**: agent pro analýzu dat:

1. **Úkol**: Analyzovat dataset k nalezení trendů.
2. **Kroky**:
   - Načíst dataset.
   - Generovat SQL dotazy pro filtrování dat.
   - Vykonat dotazy a získat výsledky.
   - Generovat vizualizace a poznatky.
3. **Zdroje**: Přístup k datasetu, schopnosti SQL.
4. **Zkušenosti**: Využít minulé výsledky k vylepšení budoucích analýz.

#### Praktický příklad: Použití SQL v Travel Agentovi

1. **Sbírání preferencí uživatele**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generování SQL dotazů**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Vykonávání SQL dotazů**

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

4. **Generování doporučení**

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

#### Příklad SQL dotazů

1. **Dotaz na lety**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Dotaz na hotely**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Dotaz na atrakce**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Využitím SQL jako součást techniky Retrieval-Augmented Generation (RAG) mohou AI agenti jako Travel Agent dynamicky získávat a využívat relevantní data k poskytování přesných a personalizovaných doporučení.

### Příklad metakognice

Pro demonstraci implementace metakognice vytvoříme jednoduchého agenta, který *reflektuje svůj proces rozhodování* při řešení problému. V tomto příkladu postavíme systém, kde agent zkouší optimalizovat výběr hotelu, ale poté zhodnotí své vlastní uvažování a přizpůsobí svou strategii, když dělá chyby nebo suboptimální volby.

Simulujeme to na jednoduchém příkladu, kde agent vybírá hotely na základě kombinace ceny a kvality, ale "reflektuje" svá rozhodnutí a podle toho se přizpůsobuje.

#### Jak to ilustruje metakognici:

1. **Počáteční rozhodnutí**: Agent vybere nejlevnější hotel, aniž by chápal dopad kvality.
2. **Reflexe a hodnocení**: Po prvním výběru agent zkontroluje, zda hotel nebyl "špatnou" volbou pomocí uživatelské zpětné vazby. Pokud zjistí, že kvalita hotelu byla příliš nízká, reflektuje své uvažování.
3. **Úprava strategie**: Agent upraví svou strategii na základě reflexe a přepne z "nejlevnější" na "nejkvalitnější", čímž zlepšuje proces rozhodování v budoucích iteracích.

Zde je příklad:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Uchovává dříve vybrané hotely
        self.corrected_choices = []  # Uchovává opravené volby
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Dostupné strategie

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
        # Předpokládejme, že máme zpětnou vazbu od uživatele, která nám říká, zda byla poslední volba dobrá nebo ne
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Upraví strategii, pokud byla předchozí volba neuspokojivá
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

# Simulujte seznam hotelů (cena a kvalita)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Vytvořit agenta
agent = HotelRecommendationAgent()

# Krok 1: Agent doporučí hotel pomocí strategie „nejlevnější“
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Krok 2: Agent zhodnotí výběr a v případě potřeby upraví strategii
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Krok 3: Agent znovu doporučí, tentokrát s upravenou strategií
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Schopnosti metakognice agentů

Klíčové je zde, že agent umí:
- Zhodnotit svá předchozí rozhodnutí a proces rozhodování.
- Upravit svou strategii na základě této reflexe, což je metakognice v praxi.

Toto je jednoduchá forma metakognice, kde systém dokáže upravit své uvažování na základě interní zpětné vazby.

### Závěr

Metakognice je mocný nástroj, který může významně zvýšit schopnosti AI agentů. Začleněním metakognitivních procesů lze navrhnout agenty, kteří jsou inteligentnější, přizpůsobivější a efektivnější. Využijte další zdroje k podrobnějšímu prozkoumání fascinujícího světa metakognice v AI agentech.

### Máte další otázky ohledně vzoru metakognice?

Připojte se k [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), kde se můžete setkat s dalšími studenty, zúčastnit se konzultací a získat odpovědi na své dotazy ohledně AI agentů.

## Předchozí lekce

[Multi-Agent Design Pattern](../08-multi-agent/README.md)

## Další lekce

[AI Agents in Production](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho původním jazyce by měl být považován za autoritativní zdroj. Pro důležité informace se doporučuje profesionální lidský překlad. Nejsme odpovědni za jakékoli nedorozumění nebo chybné výklady vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->