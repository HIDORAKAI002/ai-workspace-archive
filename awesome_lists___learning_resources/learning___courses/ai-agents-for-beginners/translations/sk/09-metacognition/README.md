[![Multi-Agent Design](../../../translated_images/sk/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Kliknite na obrázok vyššie pre zobrazenie videa tejto lekcie)_
# Metakognícia u AI agentov

## Úvod

Vitajte v lekcii o metakognícii u AI agentov! Táto kapitola je určená pre začiatočníkov, ktorí sa zaujímajú o to, ako môžu AI agenti premýšľať o vlastných procesoch myslenia. Na konci tejto lekcie budete rozumieť kľúčovým pojmom a budete vybavení praktickými príkladmi na aplikovanie metakognície pri návrhu AI agentov.

## Ciele učenia

Po dokončení tejto lekcie budete schopní:

1. Pochopiť dôsledky slučiek uvažovania v definíciách agentov.
2. Použiť techniky plánovania a hodnotenia na pomoc sebe-korigujúcim agentom.
3. Vytvoriť vlastných agentov schopných manipulovať kódom na vykonávanie úloh.

## Úvod do metakognície

Metakognícia označuje kognitívne procesy vyššieho rádu, ktoré zahŕňajú premýšľanie o vlastnom myslení. Pre AI agentov to znamená schopnosť hodnotiť a upravovať svoje akcie na základe sebauvedomenia a minulých skúseností. Metakognícia, alebo „premýšľanie o premýšľaní“, je dôležitý koncept pri vývoji agentických AI systémov. Zahŕňa vedomie AI systémov o ich vlastných vnútorných procesoch a schopnosť monitorovať, regulovať a prispôsobovať svoje správanie podľa toho. Rovnako ako keď my čítame náladu miestnosti alebo sa pozeráme na problém. Toto sebauvedomenie môže AI systémom pomôcť robiť lepšie rozhodnutia, identifikovať chyby a zlepšovať ich výkon v čase – opäť odkazujúc na Turingov test a debatu o tom, či AI prevezme kontrolu.

V kontexte agentických AI systémov môže metakognícia pomôcť riešiť niekoľko výziev, ako napríklad:
- Transparentnosť: Zabezpečiť, aby AI systémy vedeli vysvetliť svoje uvažovanie a rozhodnutia.
- Uvažovanie: Zvýšiť schopnosť AI systémov syntetizovať informácie a robiť podložené rozhodnutia.
- Adaptácia: Umožniť AI systémom prispôsobiť sa novému prostrediu a meniacim sa podmienkam.
- Vnímanie: Zlepšiť presnosť AI systémov pri rozpoznávaní a interpretácii dát z okolia.

### Čo je metakognícia?

Metakognícia, alebo „premýšľanie o premýšľaní“, je kognitívny proces vyššieho rádu, ktorý zahŕňa sebauvedomenie a sebareguláciu vlastných kognitívnych procesov. V oblasti AI metakognícia zmocňuje agentov, aby hodnotili a prispôsobovali svoje stratégie a akcie, čo vedie k lepším schopnostiam riešiť problémy a robiť rozhodnutia. Pochopením metakognície môžete navrhnúť AI agentov, ktorí nie sú len inteligentnejší, ale aj prispôsobivejší a efektívnejší. V pravdivej metakognícii by ste videli AI explicitne uvažujúce o svojom vlastnom uvažovaní.

Príklad: „Uprednostnil som lacnejšie lety, pretože... možno prichádzam o priame lety, tak si to skontrolujem znova.“
Sledovanie toho, ako alebo prečo zvolil určitú trasu.
- Poznanie, že urobil chyby, pretože príliš spolahal na používateľské preferencie z minulosti, takže mení svoju stratégiu rozhodovania, nielen konečné odporúčanie.
- Diagnostikovanie vzorov ako: „Kedykoľvek vidím používateľa povedať ‚príliš preplnené,‘ nemal by som len odstrániť niektoré atrakcie, ale tiež zamyslieť sa nad tým, že moja metóda výberu ‚top atrakcií‘ je chybná, ak vždy zoradím podľa popularity.“

### Význam metakognície u AI agentov

Metakognícia zohráva kľúčovú úlohu pri návrhu AI agentov z niekoľkých dôvodov:

![Dôležitosť metakognície](../../../translated_images/sk/importance-of-metacognition.b381afe9aae352f7.webp)

- Sebareflexia: Agenti môžu hodnotiť vlastný výkon a identifikovať oblasti na zlepšenie.
- Prispôsobivosť: Agenti môžu meniť svoje stratégie na základe minulých skúseností a meniacich sa podmienok.
- Korekcia chýb: Agenti dokážu autonómne zistiť a opraviť chyby, čo vedie k presnejším výsledkom.
- Správa zdrojov: Agenti môžu optimalizovať využitie zdrojov, ako je čas a výpočtový výkon, plánovaním a hodnotením svojich aktivít.

## Komponenty AI agenta

Predtým, než sa pustíme do metakognitívnych procesov, je nevyhnutné pochopiť základné komponenty AI agenta. AI agent zvyčajne pozostáva z:

- Persona: Osobnosť a charakteristiky agenta, ktoré definujú, ako komunikuje s používateľmi.
- Nástroje: Schopnosti a funkcie, ktoré agent môže vykonávať.
- Zručnosti: Vedomosti a odbornosť, ktorou agent disponuje.

Tieto komponenty spolupracujú na vytvorení „jednotky odbornosti“, ktorá vie vykonávať konkrétne úlohy.

**Príklad**:
Predstavte si cestovného agenta, ktorý nielen plánuje vašu dovolenku, ale tiež upravuje svoju trasu na základe dát v reálnom čase a minulých skúseností zákazníkov.

### Príklad: Metakognícia v cestovateľskej agentúre

Predstavte si, že navrhujete cestovnú agentúru poháňanú AI. Tento agent „Travel Agent“ pomáha používateľom plánovať dovolenky. Na začlenenie metakognície potrebuje Travel Agent hodnotiť a upravovať svoje akcie na základe sebauvedomenia a minulých skúseností. Tu je, ako by mohla metakognícia hrať rolu:

#### Aktuálna úloha

Aktuálnou úlohou je pomôcť používateľovi naplánovať výlet do Paríža.

#### Kroky na vykonanie úlohy

1. **Získať preferencie používateľa**: Opýtať sa používateľa na dátumy cestovania, rozpočet, záujmy (napríklad múzeá, kuchyňa, nakupovanie) a akékoľvek špecifické požiadavky.
2. **Získať informácie**: Vyhľadať možnosti letov, ubytovania, atrakcií a reštaurácií, ktoré zodpovedajú preferenciám používateľa.
3. **Vytvoriť odporúčania**: Ponúknuť personalizovaný itinerár s detailmi o letoch, rezerváciách hotelov a navrhovaných aktivitách.
4. **Upraviť na základe spätnej väzby**: Požiadať používateľa o spätnú väzbu k odporúčaniam a vykonať potrebné úpravy.

#### Potrebné zdroje

- Prístup k databázam leteniek a hotelových rezervácií.
- Informácie o parížskych atrakciách a reštauráciách.
- Dáta o spätnej väzbe od používateľov z predchádzajúcich interakcií.

#### Skúsenosti a sebareflexia

Travel Agent využíva metakogníciu na hodnotenie svojho výkonu a učenie sa z minulých skúseností. Napríklad:

1. **Analýza spätnej väzby používateľov**: Travel Agent prehodnocuje spätne väzbu na zistenie, ktoré odporúčania boli pozitívne prijaté a ktoré nie, a upravuje svoje budúce návrhy.
2. **Prispôsobivosť**: Ak používateľ predtým vyjadril nechuť k preplneným miestam, Travel Agent sa v budúcnosti vyhne odporúčaniu populárnych turistických lokalít počas špičky.
3. **Korekcia chýb**: Ak Travel Agent urobil chybu pri rezervácii, napríklad navrhol hotel, ktorý bol plne obsadený, učí sa dôkladnejšie kontrolovať dostupnosť pred odporúčaním.

#### Praktický príklad pre vývojára

Tu je zjednodušený príklad kódu Travel Agent, ktorý integruje metakogníciu:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Vyhľadať lety, hotely a atrakcie podľa preferencií
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
        # Analyzovať spätnú väzbu a upraviť budúce odporúčania
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Príklad použitia
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

#### Prečo je metakognícia dôležitá

- **Sebareflexia**: Agenti dokážu analyzovať svoj výkon a nájsť oblasti na zlepšenie.
- **Prispôsobivosť**: Agenti môžu meniť stratégie na základe spätnej väzby a meniacich sa podmienok.
- **Korekcia chýb**: Agenti môžu autonómne zistiť a opraviť chyby.
- **Správa zdrojov**: Agenti môžu optimalizovať využitie zdrojov, ako je čas a výpočtový výkon.

Vďaka integrácii metakognície môže Travel Agent poskytovať personalizovanejšie a presnejšie cestovné odporúčania, čím zlepšuje celkový používateľský zážitok.

---

## 2. Plánovanie u agentov

Plánovanie je kľúčovou zložkou správania AI agenta. Zahŕňa načrtnutie krokov potrebných na dosiahnutie cieľa, pričom zohľadňuje aktuálny stav, zdroje a možné prekážky.

### Prvky plánovania

- **Aktuálna úloha**: Jasné definovanie úlohy.
- **Kroky na dokončenie úlohy**: Rozdelenie úlohy na zvládnuteľné kroky.
- **Potrebné zdroje**: Identifikácia nevyhnutných zdrojov.
- **Skúsenosti**: Využitie minulých skúseností na informovanie plánovania.

**Príklad**:
Tu sú kroky, ktoré musí Travel Agent urobiť, aby efektívne pomohol používateľovi s plánovaním výletu:

### Kroky pre Travel Agent

1. **Získať preferencie používateľa**
   - Spýtať sa používateľa na detaily o dátumoch cestovania, rozpočte, záujmoch a špecifických požiadavkách.
   - Príklady: „Kedy plánujete cestovať?“ „Aký máte rozpočtový rozsah?“ „Aké aktivity máte na dovolenke radi?“

2. **Získať informácie**
   - Vyhľadať relevantné cestovné možnosti podľa preferencií používateľa.
   - **Lety**: Hľadať dostupné lety podľa rozpočtu a preferovaných dátumov cestovania.
   - **Ubytovanie**: Nájsť hotely alebo prenájmy, ktoré vyhovujú používateľovým preferenciám z hľadiska lokality, ceny a vybavenia.
   - **Atrakcie a reštaurácie**: Identifikovať populárne atrakcie, aktivity a miesta na stravovanie, ktoré zodpovedajú záujmom používateľa.

3. **Vytvoriť odporúčania**
   - Zostaviť získané informácie do personalizovaného itinerára.
   - Poskytnúť detaily ako možnosti letov, rezervácie hotelov a odporúčané aktivity, pričom odporúčania budú prispôsobené preferenciám používateľa.

4. **Prezentovať itinerár používateľovi**
   - Zdieľať navrhovaný itinerár s používateľom na jeho posúdenie.
   - Príklad: „Tu je navrhovaný itinerár pre váš výlet do Paríža. Obsahuje detaily o letoch, rezerváciách hotelov a zoznam odporúčaných aktivít a reštaurácií. Dajte mi vedieť, čo si o tom myslíte!“

5. **Získať spätnú väzbu**
   - Požiadať používateľa o spätnú väzbu k navrhovanému itineráru.
   - Príklady: „Páčia sa vám možnosti letov?“ „Je hotel vhodný pre vaše potreby?“ „Chceli by ste pridať alebo odstrániť nejaké aktivity?“

6. **Upraviť na základe spätnej väzby**
   - Urobiť zmeny v itinerári podľa používateľovej spätnej väzby.
   - Vykonať potrebné úpravy odporúčaní na let, ubytovanie a aktivity tak, aby lepšie vyhovovali preferenciám používateľa.

7. **Konečné potvrdenie**
   - Predložiť aktualizovaný itinerár používateľovi na finálne schválenie.
   - Príklad: „Urobil som úpravy na základe vašej spätnej väzby. Tu je aktualizovaný itinerár. Vyzerá pre vás všetko dobre?“

8. **Rezervovať a potvrdiť rezervácie**
   - Po schválení používateľom vykonať rezervácie letov, ubytovania a plánovaných aktivít.
   - Poslať používateľovi detaily o potvrdení.

9. **Poskytnúť priebežnú podporu**
   - Byť k dispozícii na pomoc používateľovi pri akýchkoľvek zmenách alebo ďalších požiadavkách pred a počas výletu.
   - Príklad: „Ak budete počas výletu potrebovať akúkoľvek ďalšiu pomoc, kedykoľvek ma kontaktujte!“

### Príklad interakcie

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

# Príklad použitia v rámci požiadavky na booing
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

## 3. Korekčný RAG systém

Najprv si poďme vysvetliť rozdiel medzi RAG nástrojom a prednostným načítaním kontextu.

![RAG vs Context Loading](../../../translated_images/sk/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

RAG kombinuje vyhľadávací systém s generatívnym modelom. Keď je zadaný dotaz, vyhľadávací systém získava relevantné dokumenty alebo údaje z vonkajšieho zdroja a tieto získané informácie slúžia na doplnenie vstupu do generatívneho modelu. To pomáha modelu generovať presnejšie a kontextovo relevantné odpovede.

V RAG systéme agent získava relevantné informácie z databázy znalostí a používa ich na generovanie vhodných odpovedí alebo akcií.

### Korekčný RAG prístup

Korekčný RAG prístup sa zameriava na využitie techník RAG na korekciu chýb a zlepšenie presnosti AI agentov. Zahŕňa to:

1. **Technika podnetov**: Použitie konkrétnych podnetov na nasmerovanie agenta k získaniu relevantných informácií.
2. **Nástroj**: Implementácia algoritmov a mechanizmov, ktoré agentovi umožňujú hodnotiť relevanciu získaných informácií a generovať presné odpovede.
3. **Hodnotenie**: Neustále hodnotenie výkonu agenta a robienie úprav na zlepšenie jeho presnosti a efektivity.

#### Príklad: Korekčný RAG v agentovi na vyhľadávanie

Predstavte si agenta na vyhľadávanie, ktorý získava informácie z internetu, aby odpovedal na používateľské dotazy. Korekčný RAG prístup môže zahŕňať:

1. **Technika podnetov**: Formulovanie vyhľadávacích dotazov na základe vstupu používateľa.
2. **Nástroj**: Použitie algoritmov spracovania prirodzeného jazyka a strojového učenia na zoradenie a filtrovanie výsledkov vyhľadávania.
3. **Hodnotenie**: Analýzu spätnej väzby používateľa na identifikáciu a korekciu nepresností v získaných informáciách.

### Korekčný RAG v Travel Agentovi

Korekčný RAG (Retrieval-Augmented Generation) zvyšuje schopnosť AI získavať a generovať informácie pri súčasnej korekcii akýchkoľvek nepresností. Pozrime sa, ako môže Travel Agent použiť korekčný RAG prístup na poskytovanie presnejších a relevantnejších cestovných odporúčaní.

To zahŕňa:

- **Technika podnetov:** Používanie špecifických podnetov na nasmerovanie agenta pri získavaní relevantných informácií.
- **Nástroj:** Implementáciu algoritmov a mechanizmov, ktoré umožňujú agentovi hodnotiť relevanciu získaných informácií a generovať presné odpovede.
- **Hodnotenie:** Neustále hodnotenie výkonu agenta a vykonávanie úprav na zlepšenie jeho presnosti a efektivity.

#### Kroky implementácie korekčného RAG v Travel Agentovi

1. **Počiatočná interakcia s používateľom**
   - Travel Agent získava základné preferencie od používateľa, ako sú cieľ, dátumy cestovania, rozpočet a záujmy.
   - Príklad:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Získavanie informácií**
   - Travel Agent získava informácie o letoch, ubytovaní, atrakciách a reštauráciách podľa preferencií používateľa.
   - Príklad:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generovanie počiatočných odporúčaní**
   - Travel Agent využíva získané informácie na vytvorenie personalizovaného itinerára.
   - Príklad:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Zbieranie spätnej väzby od používateľa**
   - Travel Agent požiada používateľa o spätnú väzbu k počiatočným odporúčaniam.
   - Príklad:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Korekčný RAG proces**
   - **Technika podnetov**: Travel Agent formuluje nové vyhľadávacie dotazy na základe spätnej väzby používateľa.
     - Príklad:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Nástroj**: Travel Agent používa algoritmy na zoradenie a filtrovanie nových výsledkov vyhľadávania so zameraním na relevantnosť podľa spätnej väzby.
     - Príklad:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Hodnotenie**: Travel Agent neustále vyhodnocuje relevanciu a presnosť svojich odporúčaní analýzou spätnej väzby a vykonáva potrebné úpravy.
     - Príklad:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktický príklad

Tu je zjednodušený príklad Python kódu začleňujúceho korekčný RAG prístup v Travel Agentovi:

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

# Príklad použitia
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

### Prednostné načítanie kontextu
Pre-emptívne načítanie kontextu znamená načítanie relevantného kontextu alebo základných informácií do modelu pred spracovaním dotazu. To znamená, že model má prístup k týmto informáciám od začiatku, čo mu umožňuje vytvárať informovanejšie odpovede bez potreby získavania ďalších údajov počas procesu.

Tu je zjednodušený príklad, ako by mohlo vyzerať pre-emptívne načítanie kontextu pre aplikáciu cestovného agenta v Pythone:

```python
class TravelAgent:
    def __init__(self):
        # Prednačítanie populárnych destinácií a ich informácií
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Získavanie informácií o destinácii z prednačítaného kontextu
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Príklad použitia
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Vysvetlenie

1. **Inicializácia (`__init__` metóda)**: Trieda `TravelAgent` prednačíta slovník obsahujúci informácie o populárnych destináciách ako Paríž, Tokio, New York a Sydney. Tento slovník zahŕňa podrobnosti ako krajina, mena, jazyk a hlavné atrakcie pre každú destináciu.

2. **Získavanie informácií (`get_destination_info` metóda)**: Keď používateľ položí otázku o určitej destinácii, metóda `get_destination_info` vyhľadá relevantné informácie zo slovníka prednačítaného kontextu.

Vďaka prednačítanému kontextu môže aplikácia cestovného agenta rýchlo odpovedať na používateľské otázky bez nutnosti získavania informácií z externých zdrojov v reálnom čase. To robí aplikáciu efektívnejšou a responzívnejšou.

### Bootstrapping plánu s cieľom pred iteráciou

Bootstrapping plánu s cieľom znamená začať s jasným cieľom alebo požadovaným výsledkom na mysli. Definovaním tohto cieľa vopred môže model použiť tento cieľ ako vodítko počas celého iteratívneho procesu. To pomáha zabezpečiť, že každá iterácia sa priblíži k dosiahnutiu požadovaného výsledku, čím sa proces stáva efektívnejším a sústredenejším.

Tu je príklad, ako by ste mohli pripraviť cestovný plán s cieľom pred iteráciou pre cestovného agenta v Pythone:

### Scenár

Cestovný agent chce naplánovať prispôsobenú dovolenku pre klienta. Cieľom je vytvoriť cestovný itinerár, ktorý maximalizuje spokojnosť klienta na základe jeho preferencií a rozpočtu.

### Kroky

1. Definovať preferencie klienta a rozpočet.
2. Inicializovať počiatočný plán na základe týchto preferencií.
3. Iterovať pre doladenie plánu, optimalizujúc pre spokojnosť klienta.

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

# Príklad použitia
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

#### Vysvetlenie kódu

1. **Inicializácia (`__init__` metóda)**: Trieda `TravelAgent` je inicializovaná so zoznamom potenciálnych destinácií, každá so svojimi atribútmi ako názov, cena a typ aktivity.

2. **Bootstrapping plánu (`bootstrap_plan` metóda)**: Táto metóda vytvára počiatočný cestovný plán na základe preferencií klienta a rozpočtu. Prechádza zoznam destinácií a pridáva ich do plánu, ak zodpovedajú preferenciám klienta a sú v rámci rozpočtu.

3. **Zladenie preferencií (`match_preferences` metóda)**: Táto metóda overuje, či destinácia zodpovedá preferenciám klienta.

4. **Iterovanie plánu (`iterate_plan` metóda)**: Metóda vylepšuje počiatočný plán tým, že sa snaží nahradiť každú destináciu v pláne lepšou alternatívou, berúc do úvahy preferencie klienta a rozpočtové obmedzenia.

5. **Výpočet nákladov (`calculate_cost` metóda)**: Metóda vypočíta celkové náklady aktuálneho plánu vrátane potenciálnej novej destinácie.

#### Príklad použitia

- **Počiatočný plán**: Cestovný agent vytvorí počiatočný plán na základe klientových preferencií pre turistiku a rozpočtu 2000 $.
- **Vylepšený plán**: Agent iteruje plán, optimalizujúc ho podľa preferencií klienta a rozpočtu.

Vďaka bootstrappingu plánu s jasným cieľom (napr. maximalizácia spokojnosti klienta) a iteratívnemu doladeniu môže cestovný agent vytvoriť prispôsobený a optimalizovaný cestovný itinerár pre klienta. Tento prístup zabezpečuje, že plán zodpovedá klientovým preferenciám a rozpočtu od začiatku a s každou iteráciou sa zlepšuje.

### Využitie LLM na re-poradie a hodnotenie

Veľké jazykové modely (LLM) môžu byť použité na re-poradie a hodnotenie tým, že vyhodnocujú relevantnosť a kvalitu získaných dokumentov alebo generovaných odpovedí. Takto to funguje:

**Získavanie:** Počiatočný krok načíta sadu kandidátskych dokumentov alebo odpovedí na základe dotazu.

**Re-poradie:** LLM vyhodnotí tieto kandidátov a re-zoradí ich podľa relevantnosti a kvality. Tento krok zabezpečuje, že na prvom mieste sa zobrazia najvhodnejšie a najkvalitnejšie informácie.

**Hodnotenie:** LLM priraďuje skóre každému kandidátovi, ktoré odráža ich relevantnosť a kvalitu. To pomáha vybrať najlepšiu odpoveď alebo dokument pre používateľa.

Využitím LLM na re-poradie a hodnotenie môže systém poskytovať presnejšie a kontextovo relevantnejšie informácie, čím sa zlepší celková používateľská skúsenosť.

Tu je príklad, ako by cestovný agent mohol použiť veľký jazykový model (LLM) na re-poradie a hodnotenie destinácií na základe preferencií používateľa v Pythone:

#### Scenár - Cestovanie na základe preferencií

Cestovný agent chce odporučiť najlepšie cestovné destinácie klientovi na základe jeho preferencií. LLM pomôže re-zoradiť a ohodnotiť destinácie tak, aby boli prezentované tie najrelevantnejšie možnosti.

#### Kroky:

1. Získať používateľské preferencie.
2. Načítať zoznam potenciálnych cestovných destinácií.
3. Použiť LLM na re-poradie a ohodnotenie destinácií podľa preferencií používateľa.

Tu je ukážka, ako môžete aktualizovať predchádzajúci príklad pre použitie služieb Azure OpenAI:

#### Požiadavky

1. Potrebujete mať predplatné Azure.
2. Vytvorte zdroj Azure OpenAI a získajte svoj API kľúč.

#### Príklad Python kódu

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Vygenerovať prompt pre Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Definovať hlavičky a obsah požiadavky
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Zavolať Azure OpenAI API na získanie pretriedených a ohodnotených destinácií
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Extrahovať a vrátiť odporúčania
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

# Príklad použitia
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

#### Vysvetlenie kódu - Preference Booker

1. **Inicializácia**: Trieda `TravelAgent` je inicializovaná so zoznamom potenciálnych cestovných destinácií, každá s atribútmi ako názov a popis.

2. **Získavanie odporúčaní (`get_recommendations` metóda)**: Táto metóda generuje prompt pre službu Azure OpenAI na základe používateľských preferencií a vykoná HTTP POST požiadavku na Azure OpenAI API, aby získala re-zoradené a ohodnotené destinácie.

3. **Generovanie promptu (`generate_prompt` metóda)**: Metóda konštruuje prompt pre Azure OpenAI, ktorý obsahuje používateľove preferencie a zoznam destinácií. Prompt navádza model, aby re-zoradil a ohodnotil destinácie podľa zadaných preferencií.

4. **API volanie**: Knižnica `requests` sa používa na vykonanie HTTP POST požiadavky na endpoint Azure OpenAI API. Odpoveď obsahuje re-zoradené a ohodnotené destinácie.

5. **Príklad použitia**: Cestovný agent získa používateľské preferencie (napr. záujem o turistiku a rozmanitú kultúru) a použije službu Azure OpenAI na získanie re-zoradených a ohodnotených odporúčaní pre cestovné destinácie.

Nezabudnite nahradiť `your_azure_openai_api_key` vaším skutočným Azure OpenAI API kľúčom a `https://your-endpoint.com/...` skutočnou URL adresou vášho Azure OpenAI nasadenia.

Vďaka využitiu LLM na re-poradie a hodnotenie môže cestovný agent poskytnúť prispôsobenejšie a relevantnejšie cestovné odporúčania klientom, čím sa zlepší ich celková skúsenosť.

### RAG: Technika promptovania vs Nástroj

Retrieval-Augmented Generation (RAG) môže byť použitý ako technika promptovania aj ako nástroj vo vývoji AI agentov. Pochopenie rozdielu medzi týmito dvoma prístupmi vám môže pomôcť efektívnejšie využiť RAG vo vašich projektoch.

#### RAG ako technika promptovania

**Čo to je?**

- Ako technika promptovania RAG zahŕňa formulovanie konkrétnych dotazov alebo promptov na usmernenie získavania relevantných informácií z veľkého korpusu alebo databázy. Tieto informácie sa potom používajú na generovanie odpovedí alebo akcií.

**Ako to funguje:**

1. **Formulácia promptov**: Vytvorte dobre štruktúrované prompty alebo dotazy na základe úlohy alebo vstupu používateľa.
2. **Získavanie informácií**: Pomocou promptov vyhľadajte relevantné údaje z existujúcej znalostnej databázy alebo súboru dát.
3. **Generovanie odpovede**: Kombinujte získané informácie s generatívnymi AI modelmi na vytvorenie komplexnej a koherentnej odpovede.

**Príklad v cestovnom agentovi**:

- Vstup používateľa: „Chcem navštíviť múzeá v Paríži.“
- Prompt: „Nájdi top múzeá v Paríži.“
- Získané informácie: Detaily o Louvri, Musée d'Orsay a pod.
- Generovaná odpoveď: „Tu sú niektoré z najlepších múzeí v Paríži: Louvre, Musée d'Orsay a Centre Pompidou.“

#### RAG ako nástroj

**Čo to je?**

- Ako nástroj je RAG integrovaný systém, ktorý automatizuje proces získavania a generovania, čo vývojárom uľahčuje implementáciu komplexných AI funkcií bez manuálneho tvorenia promptov pre každý dotaz.

**Ako to funguje:**

1. **Integrácia**: RAG sa vloží do architektúry AI agenta, ktorý automaticky spracováva získavanie a generovanie.
2. **Automatizácia**: Nástroj riadi celý proces od prijatia vstupu používateľa po vytvorenie finálnej odpovede bez potreby explicitných promptov pre každý krok.
3. **Efektivita**: Zlepšuje výkon agenta tým, že zjednodušuje proces získavania a generovania, umožňujúc rýchlejšie a presnejšie odpovede.

**Príklad v cestovnom agentovi**:

- Vstup používateľa: „Chcem navštíviť múzeá v Paríži.“
- Nástroj RAG: Automaticky načíta informácie o múzeách a vygeneruje odpoveď.
- Generovaná odpoveď: „Tu sú niektoré z najlepších múzeí v Paríži: Louvre, Musée d'Orsay a Centre Pompidou.“

### Porovnanie

| Aspekt                | Technika promptovania                                | Nástroj                                      |
|-----------------------|-----------------------------------------------------|----------------------------------------------|
| **Manuálne vs Automatické** | Manuálne formulovanie promptov pre každý dotaz     | Automatizovaný proces získavania a generovania |
| **Kontrola**           | Väčšia kontrola nad procesom získavania             | Zjednodušuje a automatizuje získavanie a generovanie |
| **Flexibilita**        | Umožňuje prispôsobené prompty podľa konkrétnych potrieb | Efektívnejšie pre veľkosériové implementácie |
| **Zložitosť**          | Vyžaduje tvorbu a ladnenie promptov                  | Ľahšie sa integruje do architektúry AI agenta |

### Praktické príklady

**Príklad techniky promptovania:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Príklad nástroja:**

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

### Hodnotenie relevantnosti

Hodnotenie relevantnosti je kľúčovým aspektom výkonnosti AI agenta. Zabezpečuje, že informácie získané a generované agentom sú vhodné, presné a užitočné pre používateľa. Pozrime sa, ako hodnotiť relevantnosť v AI agentoch vrátane praktických príkladov a techník.

#### Kľúčové koncepty hodnotenia relevantnosti

1. **Povedomie o kontexte**:
   - Agent musí rozumieť kontextu používateľovho dopytu, aby získal a generoval relevantné informácie.
   - Príklad: Ak používateľ pýta „najlepšie reštaurácie v Paríži“, agent by mal zohľadniť používateľove preferencie, ako typ kuchyne a rozpočet.

2. **Presnosť**:
   - Informácie poskytnuté agentom by mali byť fakticky správne a aktuálne.
   - Príklad: Odporúčanie reštaurácií, ktoré sú momentálne otvorené a majú dobré recenzie, namiesto zastaraných alebo zatvorených možností.

3. **Úmysel používateľa**:
   - Agent by mal odvodiť úmysel používateľa za dotazom, aby poskytol najrelevantnejšie informácie.
   - Príklad: Ak používateľ požaduje „lacné hotely“, agent by mal uprednostniť cenovo dostupné možnosti.

4. **Spätná väzba**:
   - Neustále zbieranie a analyzovanie spätnej väzby od používateľov pomáha agentovi zlepšovať proces hodnotenia relevantnosti.
   - Príklad: Zahrnutie hodnotení a spätnej väzby k predchádzajúcim odporúčaniam pre lepšie budúce odpovede.

#### Praktické techniky hodnotenia relevantnosti

1. **Skórovanie relevantnosti**:
   - Priraďte každej získanej položke skóre relevantnosti podľa toho, ako dobre zodpovedá používateľovmu dopytu a preferenciám.
   - Príklad:

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

2. **Filtrovanie a zoradenie**:
   - Odstráňte nerelevantné položky a zoradte zostávajúce podľa skóre relevantnosti.
   - Príklad:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Vrátiť top 10 relevantných položiek
     ```

3. **Spracovanie prirodzeného jazyka (NLP)**:
   - Použite NLP techniky na pochopenie používateľovho dotazu a získanie relevantných informácií.
   - Príklad:

     ```python
     def process_query(query):
         # Použite NLP na extrahovanie kľúčových informácií z dotazu používateľa
         processed_query = nlp(query)
         return processed_query
     ```

4. **Integrácia spätnej väzby od používateľa**:
   - Zbierajte spätnú väzbu na poskytnuté odporúčania a používajte ju na úpravu budúceho hodnotenia relevantnosti.
   - Príklad:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Príklad: Hodnotenie relevantnosti v Cestovnom agente

Tu je praktický príklad, ako môže Travel Agent hodnotiť relevantnosť cestovných odporúčaní:

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
        return ranked_items[:10]  # Vrátiť top 10 relevantných položiek

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

# Príklad použitia
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

### Vyhľadávanie s úmyslom

Vyhľadávanie s úmyslom zahŕňa pochopenie a interpretáciu skrytého účelu alebo cieľa za používateľovým dotazom, aby sa získali a generovali čo najrelevantnejšie a najužitočnejšie informácie. Tento prístup prekračuje jednoduché zhodovanie kľúčových slov a sústreďuje sa na pochopenie skutočných potrieb a kontextu používateľa.

#### Kľúčové koncepty vyhľadávania s úmyslom

1. **Pochopenie úmyslu používateľa**:
   - Úmysel používateľa možno rozdeliť do troch hlavných typov: informačný, navigačný a transakčný.
     - **Informačný úmysel**: Používateľ hľadá informácie o téme (napr. „Aké sú najlepšie múzeá v Paríži?“).
     - **Navigačný úmysel**: Používateľ chce nájsť konkrétnu webovú stránku alebo stránku (napr. „Oficiálna stránka Louvru“).
     - **Transakčný úmysel**: Používateľ chce uskutočniť transakciu, ako rezervovať let alebo uskutočniť nákup (napr. „Rezervuj let do Paríža“).

2. **Povedomie o kontexte**:
   - Analýza kontextu používateľovho dotazu pomáha presne identifikovať jeho úmysel. To zahŕňa zváženie predchádzajúcich interakcií, preferencií používateľa a konkrétnych údajov aktuálneho dotazu.

3. **Spracovanie prirodzeného jazyka (NLP)**:
   - NLP techniky slúžia na pochopenie a interpretáciu prirodzeného jazyka, ktorý používatelia používajú v dotazoch. Zahrňuje úlohy ako rozpoznávanie entít, analýza sentimentu a rozklad dotazu.

4. **Personalizácia**:
   - Personalizácia výsledkov vyhľadávania na základe histórie používateľa, preferencií a spätnej väzby zvyšuje relevantnosť získaných informácií.

#### Praktický príklad: Vyhľadávanie s úmyslom v Cestovnom agentovi

Pozrime sa na Travel Agent ako príklad realizácie vyhľadávania s úmyslom.

1. **Zber používateľských preferencií**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Pochopenie úmyslu používateľa**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Povedomie o kontexte**
   ```python
   def analyze_context(query, user_history):
       # Skombinujte aktuálny dotaz s históriou používateľa na pochopenie kontextu
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Vyhľadávanie a personalizácia výsledkov**

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
       # Príklad vyhľadávacej logiky pre informatívny zámer
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Príklad vyhľadávacej logiky pre navigačný zámer
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Príklad vyhľadávacej logiky pre transakčný zámer
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Príklad personalizačnej logiky
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Vrátiť top 10 personalizovaných výsledkov
   ```

5. **Príklad použitia**

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

## 4. Generovanie kódu ako nástroj

Agent generujúci kód používa modely AI na písanie a vykonávanie kódu, rieši zložité problémy a automatizuje úlohy.

### Agenti generujúci kód

Agenti generujúci kód používajú generatívne AI modely na písanie a vykonávanie kódu. Títo agenti môžu riešiť zložité problémy, automatizovať úlohy a poskytovať cenné poznatky generovaním a spúšťaním kódu v rôznych programovacích jazykoch.

#### Praktické využitia

1. **Automatizovaná generácia kódu**: Generovať útržky kódu pre konkrétne úlohy, ako je analýza dát, scraping webu alebo strojové učenie.
2. **SQL ako RAG**: Používať SQL dotazy na získavanie a manipuláciu s dátami z databáz.
3. **Riešenie problémov**: Vytvárať a vykonávať kód na riešenie konkrétnych problémov, napríklad optimalizáciu algoritmov alebo analýzu dát.

#### Príklad: Agent generujúci kód pre analýzu dát

Predstavte si, že navrhujete agenta generujúceho kód. Takto by mohol fungovať:

1. **Úloha**: Analyzovať dataset a identifikovať trendy a vzory.
2. **Kroky**:
   - Načítať dataset do nástroja na analýzu dát.
   - Generovať SQL dotazy na filtrovanie a agregáciu dát.
   - Spustiť dotazy a získať výsledky.
   - Použiť výsledky na generovanie vizualizácií a poznatkov.
3. **Potrebné zdroje**: Prístup k datasetu, nástroje na analýzu dát a schopnosti SQL.
4. **Skúsenosti**: Použiť minulé výsledky analýz na zlepšenie presnosti a relevantnosti budúcich analýz.

### Príklad: Agent generujúci kód pre cestovného agenta

V tomto príklade navrhneme agenta generujúceho kód, Cestovný agent, ktorý pomáha používateľom plánovať svoje cesty generovaním a vykonávaním kódu. Tento agent zvládne úlohy ako získavanie možností cestovania, filtrovanie výsledkov a zostavenie itinerára pomocou generatívnej AI.

#### Prehľad agenta generujúceho kód

1. **Zber preferencií používateľa**: Zhromažďuje vstupy používateľa, ako je cieľová destinácia, termíny cesty, rozpočet a záujmy.
2. **Generovanie kódu na zber dát**: Generuje útržky kódu na získavanie dát o letoch, hoteloch a atrakciách.
3. **Vykonanie vygenerovaného kódu**: Spúšťa vygenerovaný kód na získavanie aktuálnych informácií.
4. **Generovanie itinerára**: Zostaví získané dáta do personalizovaného cestovného plánu.
5. **Úpravy na základe spätnej väzby**: Prijíma spätnú väzbu od používateľa a ak je potrebné, znovu generuje kód na vylepšenie výsledkov.

#### Krok za krokom implementácia

1. **Zber preferencií používateľa**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generovanie kódu na zber dát**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Príklad: Vygenerujte kód na vyhľadávanie letov na základe preferencií používateľa
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Príklad: Vygenerujte kód na vyhľadávanie hotelov
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Vykonanie vygenerovaného kódu**

   ```python
   def execute_code(code):
       # Spustiť vygenerovaný kód pomocou exec
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

4. **Generovanie itinerára**

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

5. **Úpravy na základe spätnej väzby**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Upravte nastavenia na základe spätnej väzby používateľa
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Znovu vygenerujte a spustite kód s aktualizovanými nastaveniami
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Využitie povedomia o prostredí a uvažovania

Na základe schémy tabuľky možno skutočne vylepšiť proces generovania dopytov využitím povedomia o prostredí a uvažovania.

Tu je príklad, ako sa to dá realizovať:

1. **Pochopenie schémy**: Systém pochopí schému tabuľky a použije tieto informácie na zakotvenie generovania dopytov.
2. **Úpravy na základe spätnej väzby**: Systém upraví používateľské preferencie na základe spätnej väzby a zváži, ktoré polia v schéme je potrebné aktualizovať.
3. **Generovanie a vykonávanie dopytov**: Systém vygeneruje a spustí dotazy na získanie aktualizovaných údajov o letoch a hoteloch na základe nových preferencií.

Tu je aktualizovaný príklad Python kódu, ktorý zahŕňa tieto koncepty:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Upravte preferencie na základe spätnej väzby používateľa
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Odôvodnenie na základe schémy na úpravu ďalších súvisiacich preferencií
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Vlastná logika na úpravu preferencií na základe schémy a spätnej väzby
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Vytvorte kód na získanie údajov o letoch na základe aktualizovaných preferencií
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Vytvorte kód na získanie údajov o hoteloch na základe aktualizovaných preferencií
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simulujte vykonanie kódu a vráťte simulované údaje
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Vygenerujte itinerár na základe letov, hotelov a atrakcií
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Príklad schémy
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Príklad použitia
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Znovu vygenerujte a vykonajte kód s aktualizovanými preferenciami
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Vysvetlenie – rezervácia na základe spätnej väzby

1. **Povedomie o schéme**: Slovník `schema` definuje, ako by sa mali upraviť preferencie na základe spätnej väzby. Zahrňuje polia ako `favorites` a `avoid` s príslušnými úpravami.
2. **Úprava preferencií (metóda `adjust_based_on_feedback`)**: Táto metóda upravuje preferencie podľa spätnej väzby používateľa a schémy.
3. **Úpravy na základe prostredia (metóda `adjust_based_on_environment`)**: Táto metóda prispôsobuje úpravy podľa schémy a spätnej väzby.
4. **Generovanie a vykonávanie dopytov**: Systém generuje kód na získanie aktualizovaných dát o letoch a hoteloch na základe upravených preferencií a simuluje vykonanie týchto dopytov.
5. **Generovanie itinerára**: Systém vytvorí aktualizovaný itinerár na základe nových údajov o letoch, hoteloch a atrakciách.

Vďaka environmentálnemu povedomiu a uvažovaniu založenému na schéme vie systém generovať presnejšie a relevantnejšie dopyty, čo vedie k lepším odporúčaniam na cestovanie a personalizovanejšiemu užívateľskému zážitku.

### Použitie SQL ako techniky Retrieval-Augmented Generation (RAG)

SQL (Structured Query Language) je silný nástroj na interakciu s databázami. Keď sa používa ako súčasť prístupu Retrieval-Augmented Generation (RAG), SQL môže získavať relevantné dáta z databáz na informovanie a generovanie odpovedí alebo akcií v AI agentoch. Pozrime sa, ako môže byť SQL použité ako RAG technika v kontexte Cestovného agenta.

#### Kľúčové koncepty

1. **Interakcia s databázou**:
   - SQL sa používa na dotazovanie sa do databáz, získavanie relevantných informácií a manipuláciu s dátami.
   - Príklad: Získavanie údajov o letoch, hoteloch a atrakciách z cestovnej databázy.

2. **Integrácia s RAG**:
   - SQL dotazy sa generujú na základe vstupov a preferencií používateľa.
   - Získané dáta sa následne používajú na generovanie personalizovaných odporúčaní alebo akcií.

3. **Dynamické generovanie dotazov**:
   - AI agent generuje dynamické SQL dotazy podľa kontextu a potrieb používateľa.
   - Príklad: Prispôsobovanie SQL dotazov na filtrovanie výsledkov podľa rozpočtu, dátumov a záujmov.

#### Použitia

- **Automatizovaná generácia kódu**: Generovať útržky kódu pre konkrétne úlohy.
- **SQL ako RAG**: Používať SQL dotazy na manipuláciu s dátami.
- **Riešenie problémov**: Vytvárať a vykonávať kód na riešenie problémov.

**Príklad**:
Agent na analýzu dát:

1. **Úloha**: Analyzovať dataset a nájsť trendy.
2. **Kroky**:
   - Načítať dataset.
   - Generovať SQL dotazy na filtrovanie dát.
   - Spustiť dotazy a získať výsledky.
   - Vygenerovať vizualizácie a poznatky.
3. **Zdroje**: Prístup k datasetu, schopnosti SQL.
4. **Skúsenosti**: Použiť minulé výsledky na zlepšenie budúcich analýz.

#### Praktický príklad: Použitie SQL v Cestovnom agentovi

1. **Zber preferencií používateľa**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generovanie SQL dotazov**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Vykonanie SQL dotazov**

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

4. **Generovanie odporúčaní**

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

#### Príklad SQL dotazov

1. **Dotaz na lety**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Dotaz na hotely**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Dotaz na atrakcie**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Využitím SQL ako súčasti techniky Retrieval-Augmented Generation (RAG) môžu AI agenti ako Cestovný agent dynamicky získavať a využívať relevantné dáta na poskytovanie presných a personalizovaných odporúčaní.

### Príklad Metakognície

Ak chceme demonštrovať implementáciu metakognície, vytvorme jednoduchého agenta, ktorý *reflektuje nad svojim rozhodovacím procesom* pri riešení problému. V tomto príklade postavíme systém, kde agent optimalizuje výber hotela, ale potom hodnotí svoje uvažovanie a upravuje stratégiu, keď urobí chyby alebo suboptimálne rozhodnutia.

Simulujeme to na jednoduchom príklade, kde agent vyberá hotely na základe kombinácie ceny a kvality, no „reflektuje“ svoje rozhodnutia a podľa toho sa prispôsobuje.

#### Ako toto ilustruje metakogníciu:

1. **Počiatočné rozhodnutie**: Agent vyberie najlacnejší hotel bez ohľadu na kvalitu.
2. **Reflexia a hodnotenie**: Po počiatočnom výbere agent skontroluje, či bol hotel „zlou“ voľbou podľa spätnej väzby používateľa. Ak zistí, že kvalita bola príliš nízka, reflektuje nad svojim uvažovaním.
3. **Úprava stratégie**: Agent upraví stratégiu na základe reflexie a prestaví sa z „najlacnejší“ na „najvyššia_kvalita“, čím zlepší svoje rozhodovanie v budúcich iteráciách.

Tu je príklad:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Ukladá predtým vybrané hotely
        self.corrected_choices = []  # Ukladá opravené výbery
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Dostupné stratégie

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
        # Predpokladajme, že máme spätnú väzbu od používateľa, ktorá nám hovorí, či bola posledná voľba dobrá alebo nie
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Uprav stratégiu, ak bola predchádzajúca voľba neuspokojivá
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

# Simuluj zoznam hotelov (cena a kvalita)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Vytvor agenta
agent = HotelRecommendationAgent()

# Krok 1: Agent odporučí hotel pomocou stratégie "najlacnejší"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Krok 2: Agent zváži voľbu a podľa potreby upraví stratégiu
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Krok 3: Agent opäť odporučí, tentokrát použitím upravenej stratégie
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Schopnosti metakognície agenta

Kľúčové je schopnosť agenta:
- Hodnotiť svoje predchádzajúce voľby a rozhodovací proces.
- Upraviť stratégiu na základe tejto reflexie, teda metakognícia v praxi.

Ide o jednoduchú formu metakognície, kde systém dokáže upraviť svoj uvažovací proces podľa internej spätnej väzby.

### Záver

Metakognícia je silný nástroj, ktorý môže významne zvýšiť schopnosti AI agentov. Včlenením metakognitívnych procesov môžete navrhovať agentov, ktorí sú inteligentnejší, prispôsobivejší a efektívnejší. Využite doplnkové zdroje na ďalšie skúmanie fascinujúceho sveta metakognície v AI agentoch.

### Máte ďalšie otázky ohľadom vzoru navrhovania metakognície?

Pridajte sa k [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), aby ste sa stretli s ďalšími študentmi, zúčastnili sa konzultačných hodín a získali odpovede na svoje otázky týkajúce sa AI agentov.

## Predchádzajúca lekcia

[Multi-agentný vzor navrhovania](../08-multi-agent/README.md)

## Nasledujúca lekcia

[AI agenti v produkcii](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, vezmite prosím na vedomie, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nedorozumenia alebo nesprávne výklady vyplývajúce z používania tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->