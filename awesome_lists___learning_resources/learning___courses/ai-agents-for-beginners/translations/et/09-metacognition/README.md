[![Mitmeagendi kujundus](../../../translated_images/et/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Klõpsake ülaloleval pildil, et vaadata selle õppetunni videot)_
# Metakognitsioon tehisintellekti agentides

## Sissejuhatus

Tere tulemast õppetundi metakognitsioonist AI agentides! See peatükk on mõeldud algajatele, kes on uudishimulikud, kuidas AI agendid saavad mõelda oma mõtlemisprotsesside üle. Selle õppetunni lõpuks mõistate peamisi mõisteid ja teil on praktilised näited, et rakendada metakognitsiooni AI agendi disainis.

## Õpieesmärgid

Pärast selle õppetunni läbimist suudad:

1. Mõista arutluse tsüklite mõju agendi definitsioonides.
2. Kasutada planeerimis- ja hindamistehnikaid enesekorrektsiooni võimaldavate agentide toetamiseks.
3. Luua oma agendid, kes suudavad koodi manipuleerida ülesannete täitmiseks.

## Metakognitsiooni sissejuhatus

Metakognitsioon viitab kõrgema taseme kognitiivsetele protsessidele, mis hõlmavad mõtlemist omaenda mõtlemise üle. AI agentide jaoks tähendab see suutlikkust hinnata ja korrigeerida oma tegevusi, tuginedes eneseteadlikkusele ja varasematele kogemustele. Metakognitsioon ehk "mõtlemine mõtlemise kohta" on oluline mõiste agentiliste AI süsteemide arendamisel. See hõlmab AI süsteemide teadlikkust oma sisemistest protsessidest ning suutlikkust neid jälgida, reguleerida ja oma käitumist vastavalt kohandada. Nii nagu meie loeme olukorda või vaatame probleemi. See eneseteadlikkus aitab AI süsteemidel teha paremaid otsuseid, tuvastada vigu ja parandada oma sooritust aja jooksul — taaslüheledes Turingi testi ja arutelu juurde selle üle, kas tehisintellekt vallutab maailma.

Agentiliste AI süsteemide kontekstis võib metakognitsioon aidata lahendada mitmeid väljakutseid, nagu:
- Läbipaistvus: Tagada, et AI süsteemid suudavad selgitada oma arutluskäiku ja otsuseid.
- Arutlus: Suurendada AI süsteemide võimet sünteesida informatsiooni ja teha põhjendatud otsuseid.
- Kohanemine: Lubada AI süsteemidel kohanduda uute keskkondade ja muutuvate tingimustega.
- Taju: Parandada AI süsteemide täpsust andmete äratundmisel ja tõlgendamisel nende keskkonnast.

### Mis on metakognitsioon?

Metakognitsioon ehk "mõtlemine mõtlemise kohta" on kõrgema taseme kognitiivne protsess, mis hõlmab eneseteadlikkust ja oma kognitiivsete protsesside eneseregulatsiooni. AI valdkonnas annab metakognitsioon agentidele võimaluse hinnata ja kohandada oma strateegiaid ja tegevusi, viies parema probleemilahenduse ja otsustamisvõimekuseni. Metakognitsiooni mõistmise abil saate disainida AI agente, kes on mitte ainult intelligentsed, vaid ka kohanemisvõimelisemad ja tõhusamad. Tõelises metakognitsioonis näeksite, et AI põhjendab selgelt oma arutluse kohta.

Example: “Ma eelistasin odavamaid lende, sest… Võib-olla jään otselendudest ilma, nii et las ma kontrollin uuesti.”.
Keeping track of how or why it chose a certain route.
- Märgata, et see tegi vigu, sest ta tuginemis liigselt kasutaja eelnevatele eelistustele, seega muudab see oma otsustamisstrateegiat, mitte ainult lõplikku soovitust.
- Diagnoosida mustreid nagu: “Iga kord, kui ma näen, et kasutaja mainib 'liiga rahvarohke', ei peaks ma mitte ainult eemaldama teatud atraktsioone, vaid ka mõtlema, et minu meetod 'parimate atraktsioonide' valimiseks on vigane, kui ma alati järjestan populaarsuse järgi.”

### Metakognitsiooni tähtsus AI agentides

Metakognitsioon mängib AI agendi disainis olulist rolli mitmel põhjusel:

![Metakognitsiooni tähtsus](../../../translated_images/et/importance-of-metacognition.b381afe9aae352f7.webp)

- Enesepeegeldu s: Agendid saavad hinnata oma sooritust ja tuvastada parendusvaldkondi.
- Kohanemisvõime: Agendid saavad muuta oma strateegiaid varasemate kogemuste ja muutuvate tingimuste põhjal.
- Vigade parandamine: Agendid suudavad iseseisvalt tuvastada ja parandada vigu, mis viib täpsemate tulemusteni.
- Ressursside haldamine: Agendid saavad optimeerida ressursikasutust, nagu aeg ja arvutusvõimsus, planeerides ja hinnates oma tegevusi.

## AI agendi komponendid

Enne metakognitiivsete protsesside süvenemist on oluline mõista AI agendi põhikomponente. AI agent koosneb tavaliselt järgmistest osadest:

- Persona: Agendi isiksus ja omadused, mis määravad, kuidas see kasutajatega suhtleb.
- Tools: Võimed ja funktsioonid, mida agent suudab täita.
- Oskused: Teadmised ja pädevus, mida agent omab.

Need komponendid töötavad koos, luues "ekspertüksuse", mis suudab täita konkreetseid ülesandeid.

**Näide**:
Mõelge reisibüroole — agenditeenusele, mis mitte ainult ei planeeri teie puhkust, vaid kohandab oma marsruuti reaalajas andmete ja varasemate kliendikogemuste põhjal.

### Näide: metakognitsioon reisibürooteenuses

Kujutage ette, et disainite tehisintellektil põhinevat reisibürooteenust. See agent, "Travel Agent", aitab kasutajaid nende puhkuste planeerimisel. Metakognitsiooni rakendamiseks peab Travel Agent hindama ja kohandama oma tegevusi, tuginedes eneseteadlikkusele ja varasematele kogemustele. Siin on, kuidas metakognitsioon võiks rolli mängida:

#### Praegune ülesanne

Praegune ülesanne on aidata kasutajal planeerida reisi Pariisi.

#### Sammud ülesande täitmiseks

1. **Koguge kasutaja eelistused**: Küsige kasutajalt nende reisikuupäevade, eelarve, huvide (nt muuseumid, köök, ostlemine) ja konkreetsete nõuded kohta.
2. **Hankige teavet**: Otsige lennuvalikuid, majutust, vaatamisväärsusi ja restorane, mis vastavad kasutaja eelistustele.
3. **Koostage soovitused**: Pakkuge isikupärastatud marsruuti koos lennuandmete, hotelli broneeringute ja soovitatud tegevustega.
4. **Kohandage tagasiside alusel**: Küsige kasutajalt tagasisidet soovituste kohta ja tehke vajalikud muudatused.

#### Nõutavad ressursid

- Ligipääs lennu- ja hotellibroneeringute andmebaasidele.
- Teave Pariisi vaatamisväärsuste ja restoranide kohta.
- Kasutaja tagasiside andmed varasematest suhtlustest.

#### Kogemus ja enesepeegeldus

Travel Agent kasutab metakognitsiooni oma soorituse hindamiseks ja varasematest kogemustest õppimiseks. Näiteks:

1. **Kasutaja tagasiside analüüs**: Travel Agent vaatab läbi kasutaja tagasisidet, et määrata, millised soovitused olid hästi vastu võetud ja millised mitte. Selle põhjal kohandab ta tulevasi soovitusi.
2. **Kohanemisvõime**: Kui kasutaja on varem maininud, et talle ei meeldi rahvarohked kohad, väldib Travel Agent tulevikus populaarseid turismikohti tipptundidel.
3. **Vigade parandamine**: Kui Travel Agent tegi varem broneerimisel vea, näiteks soovitas täiesti broneeritud hotelli, õpib ta enne soovituste tegemist saadavust rangemalt kontrollima.

#### Praktiline arendaja näide

Siin on lihtsustatud näide sellest, kuidas Travel Agenti kood võiks välja näha, kui sinna on lisatud metakognitsioon:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Otsi lende, hotelle ja vaatamisväärsusi vastavalt eelistustele
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
        # Analüüsi tagasisidet ja kohanda tulevasi soovitusi
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Kasutamise näide
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

#### Miks metakognitsioon on oluline

- **Enesepeegeldus**: Agendid saavad analüüsida oma sooritust ja tuvastada parendusvaldkondi.
- **Kohanemisvõime**: Agendid saavad muuta strateegiaid vastavalt tagasisidele ja muutuvatele tingimustele.
- **Vigade parandamine**: Agendid suudavad iseseisvalt vigu tuvastada ja parandada.
- **Ressursside haldamine**: Agendid saavad optimeerida ressursikasutust, nagu aeg ja arvutusvõimsus.

Metakognitsiooni kaasates suudab Travel Agent pakkuda personaalsemaid ja täpsemaid reisisoovitusi, parandades üldist kasutajakogemust.

---

## 2. Planeerimine agentides

Planeerimine on AI agendi käitumise kriitiline komponent. See hõlmab sammude ettepanekut eesmärgi saavutamiseks, võttes arvesse praegust olekut, ressursse ja võimalikke takistusi.

### Planeerimise elemendid

- **Praegune ülesanne**: Määratle ülesanne selgelt.
- **Sammud ülesande täitmiseks**: Jaga ülesanne hallatavateks sammudeks.
- **Nõutavad ressursid**: Tuvasta vajalikud ressursid.
- **Kogemus**: Kasuta planeerimisel varasemaid kogemusi.

**Näide**:
Siin on sammud, mida Travel Agent peab tegema, et efektiivselt aidata kasutajal oma reis planeerida:

### Sammud Travel Agendi jaoks

1. **Koguge kasutaja eelistused**
   - Küsige kasutajalt detaile nende reisikuupäevade, eelarve, huvide ja konkreetsete nõuete kohta.
   - Näited: "Millal te plaanite reisida?" "Mis on teie eelarve?" "Milliseid tegevusi te puhkusel naudite?"

2. **Hankige teavet**
   - Otsige sobivaid reisivõimalusi vastavalt kasutaja eelistustele.
   - **Lennud**: Otsige saadavalolevaid lende vastavalt kasutaja eelarvele ja eelistatud reisikuupäevadele.
   - **Majutus**: Leidke hotellid või rendipinnad, mis vastavad kasutaja eelistustele asukoha, hinna ja mugavuste osas.
   - **Atraktsioonid ja restoranid**: Tuvastage populaarsed vaatamisväärsused, tegevused ja söögikohad, mis vastavad kasutaja huvidele.

3. **Koostage soovitused**
   - Koondage hangitud info isikupäraseks marsruudiks.
   - Esitage üksikasju nagu lennuvalikud, hotellibroneeringud ja soovitatud tegevused, kohandades soovitusi vastavalt kasutaja eelistustele.

4. **Esitle marsruuti kasutajale**
   - Jagage ettepanekut kasutajale ülevaatamiseks.
   - Näide: "Siin on soovitatud marsruut teie Pariisi reisiks. See sisaldab lennuandmeid, hotelli broneeringuid ja nimekirja soovitatud tegevustest ja restoranidest. Andke teada oma arvamus!"

5. **Koguge tagasisidet**
   - Küsige kasutajalt tagasisidet ettepanekule.
   - Näited: "Kas teile meeldivad lennuvalikud?" "Kas hotell vastab teie vajadustele?" "Kas on mingeid tegevusi, mida soovite lisada või eemaldada?"

6. **Kohandage tagasiside alusel**
   - Muutke marsruuti vastavalt kasutaja tagasisidele.
   - Tehke vajalikud muudatused lennu-, majutuse- ja tegevuso-ssoovitustes, et need vastaksid paremini kasutaja eelistustele.

7. **Lõplik kinnitus**
   - Esitage uuendatud marsruut kasutajale lõplikuks kinnituseks.
   - Näide: "Olen teinud teie tagasiside põhjal muudatused. Siin on uuendatud marsruut. Kas kõik tundub korras?"

8. **Broneerige ja kinnitage reservatsioonid**
   - Kui kasutaja heaks kiidab marsruudi, jätkake lennu-, majutuse ja ette planeeritud tegevuste broneerimisega.
   - Saatke kasutajale kinnituste üksikasjad.

9. **Pakkuge pidevat tuge**
   - Olge saadaval, et aidata kasutajat muudatuste või täiendavate taotlustega enne reisi ja selle ajal.
   - Näide: "Kui teil on reisi jooksul veel abi vaja, võtke minuga igal ajal ühendust!"

### Näide suhtlusest

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

# Example usage within a booing request
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

## 3. Paranduslik RAG süsteem

Esmalt alustame, mõistes erinevust RAG-tööriista ja ennetava konteksti laadimise vahel

![RAG vs konteksti laadimine](../../../translated_images/et/rag-vs-context.9eae588520c00921.webp)

### Otsinguga täiendatud genereerimine (RAG)

RAG kombineerib otsingusüsteemi generatiivse mudeliga. Kui esitatakse päring, otsib retrieval-süsteem asjakohaseid dokumente või andmeid välisest allikast ning see hangitud informatsioon kasutatakse generatiivse mudeli sisendit täiustama. See aitab mudelil genereerida täpsemaid ja kontekstipõhisemaid vastuseid.

RAG süsteemis hangib agent asjakohast teavet teadmistebaasist ja kasutab seda sobivate vastuste või tegevuste genereerimiseks.

### Paranduslik RAG lähenemine

Paranduslik RAG lähenemine keskendub RAG tehnikate kasutamisele vigade parandamiseks ja AI agentide täpsuse parandamiseks. See hõlmab:

1. **Põhimõtet promptimise kohta**: Spetsiifiliste promptide kasutamine agendi suunamiseks sobiva informatsiooni hankimisel.
2. **Tööriist**: Algoritmide ja mehhanismide rakendamine, mis võimaldavad agendil hinnata hangitud informatsiooni asjakohasust ja genereerida täpseid vastuseid.
3. **Hindamine**: Agendi soorituse pidev hindamine ja kohanduste tegemine selle täpsuse ja efektiivsuse parandamiseks.

#### Näide: paranduslik RAG otsinguagendis

Mõelge otsinguagendile, mis hangib veebi kaudu informatsiooni kasutaja päringute vastamiseks. Paranduslik RAG lähenemine võib hõlmata:

1. **Promptimise tehnika**: Otsingupäringute sõnastamine kasutaja sisendi põhjal.
2. **Tööriist**: Loomuliku keele töötluse ja masinõppe algoritmide kasutamine otsingutulemuste järjestamiseks ja filtreerimiseks.
3. **Hindamine**: Kasutaja tagasiside analüüsimine, et tuvastada ja parandada hangitud informatsiooni ebatäpsusi.

### Paranduslik RAG Travel Agentis

Paranduslik RAG (Retrieval-Augmented Generation) parandab AI võimet hankida ja genereerida informatsiooni ning korrigeerida võimalikke ebatäpsusi. Vaatame, kuidas Travel Agent saab paranduslikku RAG lähenemist kasutada täpsemate ja asjakohasemate reisisoovituste pakkumiseks.

See hõlmab:

- **Promptimise tehnika:** Spetsiifiliste küsimuste kasutamine agendi suunamiseks asjakohase informatsiooni hankimisel.
- **Tööriist:** Algoritmide ja mehhanismide rakendamine, mis võimaldavad agendil hinnata hangitud informatsiooni asjakohasust ja genereerida täpseid vastuseid.
- **Hindamine:** Agendi soorituse pidev hindamine ja kohandamine täpsuse ja efektiivsuse parandamiseks.

#### Sammud parandusliku RAG rakendamiseks Travel Agentis

1. **Algne kasutajasuhtlus**
   - Travel Agent kogub kasutajalt esialgseid eelistusi, nagu sihtkoht, reisikuupäevad, eelarve ja huvid.
   - Näide:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Informatsiooni hankimine**
   - Travel Agent hangib teavet lendude, majutuse, vaatamisväärsuste ja restoranide kohta vastavalt kasutaja eelistustele.
   - Näide:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Esialgsete soovituste genereerimine**
   - Travel Agent kasutab hangitud informatsiooni isikupärase marsruudi genereerimiseks.
   - Näide:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Kasutaja tagasiside kogumine**
   - Travel Agent küsib kasutajalt tagasisidet esialgsete soovituste kohta.
   - Näide:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Paranduslik RAG protsess**
   - **Promptimise tehnika**: Travel Agent formuleerib uued otsingupäringud kasutaja tagasiside põhjal.
     - Näide:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Tööriist**: Travel Agent kasutab algoritme, et järjestada ja filtreerida uusi otsingutulemusi, pannes rõhku asjakohasusele vastavalt kasutaja tagasisidele.
     - Näide:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Hindamine**: Travel Agent hindab pidevalt oma soovituste asjakohasust ja täpsust, analüüsides kasutaja tagasisidet ja tehes vajalikud kohandused.
     - Näide:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktiline näide

Siin on lihtsustatud Python-koodi näide, mis sisaldab paranduslikku RAG lähenemist Travel Agentis:

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

# Näide kasutamisest
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

### Ennetav konteksti laadimine
Ettelõikav konteksti laadimine hõlmab asjakohase konteksti või taustainfo laadimist mudelisse enne päringu töötlemist. See tähendab, et mudelil on sellest infost algusest peale juurdepääs, mis aitab tal genereerida paremini informeeritud vastuseid ilma protsessi käigus täiendavaid andmeid pärimata.

Here's a simplified example of how a pre-emptive context load might look for a travel agent application in Python:

```python
class TravelAgent:
    def __init__(self):
        # Eellaadige populaarsed sihtkohad ja nende teavet
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Hankige sihtkoha teavet eellaetud kontekstist
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Kasutamise näide
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Selgitus

1. **Initialization (`__init__` method)**: The `TravelAgent` class pre-loads a dictionary containing information about popular destinations such as Paris, Tokyo, New York, and Sydney. This dictionary includes details like the country, currency, language, and major attractions for each destination.

2. **Retrieving Information (`get_destination_info` method)**: When a user queries about a specific destination, the `get_destination_info` method fetches the relevant information from the pre-loaded context dictionary.

By pre-loading the context, the travel agent application can quickly respond to user queries without having to retrieve this information from an external source in real-time. This makes the application more efficient and responsive.

### Plaani algseadistamine eesmärgiga enne iteratsiooni

Plaani algseadistamine eesmärgiga hõlmab selge eesmärgi või soovitud tulemuse määratlemist juba alguses. Selle eesmärgi ette määratlemisel saab mudel seda kasutada juhise põhimõttena kogu iteratiivse protsessi vältel. See aitab tagada, et iga iteratsioon viib lähemale soovitud tulemuse saavutamisele, muutes protsessi tõhusamaks ja fokuseeritumaks.

Here's an example of how you might bootstrap a travel plan with a goal before iterating for a travel agent in Python:

### Stsenaarium

A travel agent wants to plan a customized vacation for a client. The goal is to create a travel itinerary that maximizes the client's satisfaction based on their preferences and budget.

### Sammud

1. Define the client's preferences and budget.
2. Bootstrap the initial plan based on these preferences.
3. Iterate to refine the plan, optimizing for the client's satisfaction.

#### Pythoni kood

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

# Kasutamise näide
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

#### Koodi selgitus

1. **Initialization (`__init__` method)**: The `TravelAgent` class is initialized with a list of potential destinations, each having attributes like name, cost, and activity type.

2. **Bootstrapping the Plan (`bootstrap_plan` method)**: This method creates an initial travel plan based on the client's preferences and budget. It iterates through the list of destinations and adds them to the plan if they match the client's preferences and fit within the budget.

3. **Matching Preferences (`match_preferences` method)**: This method checks if a destination matches the client's preferences.

4. **Iterating the Plan (`iterate_plan` method)**: This method refines the initial plan by trying to replace each destination in the plan with a better match, considering the client's preferences and budget constraints.

5. **Calculating Cost (`calculate_cost` method)**: This method calculates the total cost of the current plan, including a potential new destination.

#### Näide kasutamisest

- **Initial Plan**: The travel agent creates an initial plan based on the client's preferences for sightseeing and a budget of $2000.
- **Refined Plan**: The travel agent iterates the plan, optimizing for the client's preferences and budget.

By bootstrapping the plan with a clear goal (e.g., maximizing client satisfaction) and iterating to refine the plan, the travel agent can create a customized and optimized travel itinerary for the client. This approach ensures that the travel plan aligns with the client's preferences and budget from the start and improves with each iteration.

### LLM-i kasutamine ümberjärjestamiseks ja hindamiseks

Large Language Models (LLMs) can be used for re-ranking and scoring by evaluating the relevance and quality of retrieved documents or generated responses. Here's how it works:

**Retrieval:** The initial retrieval step fetches a set of candidate documents or responses based on the query.

**Re-ranking:** The LLM evaluates these candidates and re-ranks them based on their relevance and quality. This step ensures that the most relevant and high-quality information is presented first.

**Scoring:** The LLM assigns scores to each candidate, reflecting their relevance and quality. This helps in selecting the best response or document for the user.

By leveraging LLMs for re-ranking and scoring, the system can provide more accurate and contextually relevant information, improving the overall user experience.

Here's an example of how a travel agent might use a Large Language Model (LLM) for re-ranking and scoring travel destinations based on user preferences in Python:

#### Stsenaarium - reisimine eelistuste alusel

A travel agent wants to recommend the best travel destinations to a client based on their preferences. The LLM will help re-rank and score the destinations to ensure the most relevant options are presented.

#### Sammud:

1. Collect user preferences.
2. Retrieve a list of potential travel destinations.
3. Use the LLM to re-rank and score the destinations based on user preferences.

Here’s how you can update the previous example to use Azure OpenAI Services:

#### Nõuded

1. You need to have an Azure subscription.
2. Create an Azure OpenAI resource and get your API key.

#### Näide Python-koodist

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Loo Azure OpenAI jaoks päring
        prompt = self.generate_prompt(preferences)
        
        # Määra päringu päised ja sisu
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Kutsu Azure OpenAI API-d, et saada ümberjärjestatud ja hinnatud sihtkohad
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Võta välja ja tagasta soovitused
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

# Kasutamise näide
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

#### Koodi selgitus - eelistuste broneerija

1. **Initialization**: The `TravelAgent` class is initialized with a list of potential travel destinations, each having attributes like name and description.

2. **Getting Recommendations (`get_recommendations` method)**: This method generates a prompt for the Azure OpenAI service based on the user's preferences and makes an HTTP POST request to the Azure OpenAI API to get re-ranked and scored destinations.

3. **Generating Prompt (`generate_prompt` method)**: This method constructs a prompt for the Azure OpenAI, including the user's preferences and the list of destinations. The prompt guides the model to re-rank and score the destinations based on the provided preferences.

4. **API Call**: The `requests` library is used to make an HTTP POST request to the Azure OpenAI API endpoint. The response contains the re-ranked and scored destinations.

5. **Example Usage**: The travel agent collects user preferences (e.g., interest in sightseeing and diverse culture) and uses the Azure OpenAI service to get re-ranked and scored recommendations for travel destinations.

Make sure to replace `your_azure_openai_api_key` with your actual Azure OpenAI API key and `https://your-endpoint.com/...` with the actual endpoint URL of your Azure OpenAI deployment.

By leveraging the LLM for re-ranking and scoring, the travel agent can provide more personalized and relevant travel recommendations to clients, enhancing their overall experience.

### RAG: promptimistehnika vs tööriist

Retrieval-Augmented Generation (RAG) can be both a prompting technique and a tool in the development of AI agents. Understanding the distinction between the two can help you leverage RAG more effectively in your projects.

#### RAG as a Prompting Technique

**What is it?**

- As a prompting technique, RAG involves formulating specific queries or prompts to guide the retrieval of relevant information from a large corpus or database. This information is then used to generate responses or actions.

**How it works:**

1. **Formulate Prompts**: Create well-structured prompts or queries based on the task at hand or the user's input.
2. **Retrieve Information**: Use the prompts to search for relevant data from a pre-existing knowledge base or dataset.
3. **Generate Response**: Combine the retrieved information with generative AI models to produce a comprehensive and coherent response.

**Example in Travel Agent**:

- User Input: "I want to visit museums in Paris."
- Prompt: "Find top museums in Paris."
- Retrieved Information: Details about Louvre Museum, Musée d'Orsay, etc.
- Generated Response: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

#### RAG as a Tool

**What is it?**

- As a tool, RAG is an integrated system that automates the retrieval and generation process, making it easier for developers to implement complex AI functionalities without manually crafting prompts for each query.

**How it works:**

1. **Integration**: Embed RAG within the AI agent's architecture, allowing it to automatically handle the retrieval and generation tasks.
2. **Automation**: The tool manages the entire process, from receiving user input to generating the final response, without requiring explicit prompts for each step.
3. **Efficiency**: Enhances the agent's performance by streamlining the retrieval and generation process, enabling quicker and more accurate responses.

**Example in Travel Agent**:

- User Input: "I want to visit museums in Paris."
- RAG Tool: Automatically retrieves information about museums and generates a response.
- Generated Response: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

### Comparison

| Aspekt                 | Promptimistehnika                                        | Tööriist                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Manuaalne vs automaatne**| Promptide käsitsi koostamine iga päringu jaoks.               | Automatiseeritud protsess pärimiseks ja genereerimiseks.       |
| **Kontroll**            | Pakub rohkem kontrolli pärimisprotsessi üle.             | Sujuvamaks teeb pärimise ja genereerimise automatiseerimise.|
| **Paindlikkus**        | Võimaldab kohandatud prompte konkreetsete vajaduste põhjal.      | Tõhusam suuremahuliste rakenduste puhul.       |
| **Kompleksus**         | Nõuab promptide koostamist ja häälestamist.                  | Lihtsam integreerida AI-agendi arhitektuuri. |

### Praktilised näited

**Promptimistehnika näide:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Tööriista näide:**

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

### Relevantsuse hindamine

Relevantsuse hindamine on AI-agendi jõudluse oluline aspekt. See tagab, et agendi poolt leitud ja genereeritud info on asjakohane, täpne ja kasulik kasutajale. Vaatleme, kuidas relevantsust hinnata AI-agentides, sealhulgas praktilisi näiteid ja tehnikaid.

#### Olulised mõisted relevantsuse hindamisel

1. **Kontekstitundlikkus**:
   - Agent peab mõistma kasutaja päringu konteksti, et leida ja genereerida asjakohast teavet.
   - Näide: Kui kasutaja küsib "parimad restoranid Pariisis", peaks agent arvestama kasutaja eelistusi, nagu köögitüüp ja eelarve.

2. **Täpsus**:
   - Agendi antud info peaks olema faktuaalselt õige ja ajakohane.
   - Näide: Soovitada praegu avatud ja hea tagasisidega restorane, mitte aegunud või suletud valikuid.

3. **Kasutaja kavatsus**:
   - Agent peaks tuvastama kasutaja kavatsuse päringu taga, et pakkuda kõige asjakohasemat teavet.
   - Näide: Kui kasutaja küsib "soodsad hotellid", peaks agent prioriseerima taskukohaseid valikuid.

4. **Tagasiside ahel**:
   - Kasutajate tagasiside kogumine ja analüüsimine aitab agendil oma relevantsuse hindamise protsessi täiustada.
   - Näide: Varasemate soovituste kohta saadud hinnangute ja tagasiside integreerimine tulemustesse.

#### Praktilised tehnikad relevantsuse hindamiseks

1. **Relevantsuse skoorimine**:
   - Assign a relevance score to each retrieved item based on how well it matches the user's query and preferences.
   - Näide:

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

2. **Filtreerimine ja järjestamine**:
   - Filter out irrelevant items and rank the remaining ones based on their relevance scores.
   - Näide:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Tagasta 10 kõige asjakohasemat üksust
     ```

3. **Loodusliku keele töötlemine (NLP)**:
   - Use NLP techniques to understand the user's query and retrieve relevant information.
   - Näide:

     ```python
     def process_query(query):
         # Kasuta NLP-d, et eraldada kasutaja päringust võtmetähtsusega teave
         processed_query = nlp(query)
         return processed_query
     ```

4. **Kasutaja tagasiside integreerimine**:
   - Collect user feedback on the provided recommendations and use it to adjust future relevance evaluations.
   - Näide:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Näide: relevantsuse hindamine reisiagendis

Here's a practical example of how Travel Agent can evaluate the relevancy of travel recommendations:

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
        return ranked_items[:10]  # Tagasta 10 kõige asjakohasemat üksust

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

# Kasutuse näide
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

### Otsing kavatsuse alusel

Otsimine kavatsuse alusel tähendab kasutaja päringu taga oleva eesmärgi või sihi mõistmist ja tõlgendamist, et leida ja genereerida kõige asjakohasemat ja kasulikumat infot. See lähenemine läheb kaugemale pelgalt märksõnade sobitamisest ja keskendub kasutaja tegelike vajaduste ja konteksti haaramisele.

#### Olulised mõisted otsingus kavatsuse alusel

1. **Kasutaja kavatsuse mõistmine**:
   - Kasutaja kavatsusi võib jagada kolmeks peamiseks tüübiks: informatiivne, navigeerimis- ja tehinguline.
     - **Informatiivne kavatsus**: Kasutaja otsib teavet teema kohta (nt "Millised on Pariisi parimad muuseumid?").
     - **Navigeerimis-kavatsus**: Kasutaja tahab jõuda konkreetsele veebisaidile või lehele (nt "Louvre'i muuseumi ametlik veebileht").
     - **Tehinguline kavatsus**: Kasutaja soovib teha tehingut, näiteks broneerida lendu või sooritada ostu (nt "Broneeri lend Pariisi").

2. **Konteksti teadlikkus**:
   - Kasutaja päringu konteksti analüüsimine aitab täpselt tuvastada nende kavatsust. See hõlmab varasemaid interaktsioone, kasutaja eelistusi ja konkreetseid päringu detaile.

3. **Loodusliku keele töötlemine (NLP)**:
   - NLP-tehnikaid kasutatakse kasutaja naturaalse keele päringute mõistmiseks ja tõlgendamiseks. See hõlmab näiteks entiteetide tuvastamist, sentimentide analüüsi ja päringu parsimist.

4. **Isikupärastamine**:
   - Otsingutulemuste isikupärastamine kasutaja ajaloo, eelistuste ja tagasiside alusel suurendab leitud info relevantsust.

#### Praktiline näide: otsing kavatsuse alusel reisiagendis

Vaatame Travel Agentit näitena, et näha, kuidas otsing kavatsuse alusel võiks olla rakendatud.

1. **Kasutaja eelistuste kogumine**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Kasutaja kavatsuse mõistmine**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Konteksti teadlikkus**
   ```python
   def analyze_context(query, user_history):
       # Ühenda praegune päring kasutaja ajalooga, et mõista konteksti
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Otsi ja isikupärasta tulemusi**

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
       # Näidisotsingu loogika informatiivse kavatsuse jaoks
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Näidisotsingu loogika navigatsioonilise kavatsuse jaoks
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Näidisotsingu loogika tehingulise kavatsuse jaoks
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Näidis isikupärastamise loogika
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Tagasta 10 parimat isikupärastatud tulemust
   ```

5. **Kasutamise näide**

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

## 4. Koodi genereerimine tööriistana

Koodi genereerivad agendid kasutavad AI-mudeleid koodi kirjutamiseks ja täitmiseks, lahendades keerukaid probleeme ning automatiseerides ülesandeid.

### Koodi genereerivad agendid

Koodi genereerivad agendid kasutavad generatiivseid AI-mudeleid koodi kirjutamiseks ja täitmiseks. Need agendid suudavad lahendada keerukaid probleeme, automatiseerida ülesandeid ja pakkuda väärtuslikke teadmisi, genereerides ning käivitades koodi erinevates programmeerimiskeeltes.

#### Praktilised rakendused

1. **Automatiseeritud koodi genereerimine**: Genereerida koodilõike konkreetsete ülesannete jaoks, nagu andmeanalüüs, veebikraapimine või masinõpe.
2. **SQL kui RAG**: Kasutada SQL-päringuid andmete pärimiseks ja manipuleerimiseks andmebaasidest.
3. **Probleemide lahendamine**: Luua ja käivitada koodi konkreetsete probleemide lahendamiseks, nagu algoritmide optimeerimine või andmete analüüs.

#### Näide: koodi genereeriv agent andmeanalüüsi jaoks

Kujuta ette, et kavandad koodi genereerivat agenti. Siin on, kuidas see võiks toimida:

1. **Ülesanne**: Analüüsida andmestikku, et tuvastada trende ja mustreid.
2. **Sammud**:
   - Laadi andmestik andmeanalüüsi tööriista.
   - Genereeri SQL-päringud andmete filtreerimiseks ja agregatsiooniks.
   - Täida päringud ja too tulemused.
   - Kasuta tulemusi visualiseerimiste ja järelduste genereerimiseks.
3. **Vajalikud ressursid**: Juurdepääs andmestikule, andmeanalüüsi tööriistadele ja SQL-võimalustele.
4. **Kogemus**: Kasuta varasemaid analüüside tulemusi tulevaste analüüside täpsuse ja asjakohasuse parandamiseks.

### Näide: koodi genereeriv agent reisiabiks

Selles näites kavandame koodi genereeriva agendi, Travel Agent, et aidata kasutajaid reisi planeerimisel, genereerides ja käivitades koodi. See agent suudab toime tulla ülesannetega nagu reisioptsioonide toomine, tulemuste filtreerimine ja marsruudi koostamine, kasutades generatiivset AI-d.

#### Koodi genereeriva agendi ülevaade

1. **Kasutaja eelistuste kogumine**: Kogub kasutaja sisendi nagu sihtkoht, reisi kuupäevad, eelarve ja huvid.
2. **Andmete toomiseks koodi genereerimine**: Genereerib koodilõike, et hankida andmeid lendude, hotellide ja atraktsioonide kohta.
3. **Genereeritud koodi täitmine**: Käivitab genereeritud koodi, et tuua reaalajas infot.
4. **Marsruudi genereerimine**: Koondab toodud andmed isikupäraseks reisiplaaniks.
5. **Tagasiside põhjal kohandamine**: Saab kasutajalt tagasisidet ja genereerib vajadusel koodi uuesti, et tulemusi täiustada.

#### Samm-sammult rakendamine

1. **Kasutaja eelistuste kogumine**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Andmete toomiseks koodi genereerimine**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Näide: genereeri kood lendude otsimiseks vastavalt kasutaja eelistustele
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Näide: genereeri kood hotellide otsimiseks
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Genereeritud koodi täitmine**

   ```python
   def execute_code(code):
       # Käivita genereeritud kood, kasutades funktsiooni exec.
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

4. **Marsruudi genereerimine**

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

5. **Tagasiside põhjal kohandamine**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Kohanda eelistusi kasutaja tagasiside põhjal
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Genereeri uuesti ja käivita kood uuendatud eelistustega
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Keskkonnateadlikkuse ja järeldusvõime kasutamine

Tabeli skeemi põhjal saab tõepoolest parandada päringute genereerimise protsessi, kasutades keskkonnateadlikkust ja järeldusvõimet.

Siin on näide, kuidas seda saab teha:

1. **Skeemi mõistmine**: Süsteem mõistab tabeli skeemi ja kasutab seda teavet päringute genereerimise aluseks.
2. **Tagasiside põhjal kohandamine**: Süsteem kohandab kasutaja eelistusi vastavalt tagasisidele ja järeldab, milliseid välju skeemis tuleb uuendada.
3. **Päringute genereerimine ja täitmine**: Süsteem genereerib ja täidab päringuid, et tuua uuendatud lennu- ja hotelliandmeid vastavalt uutele eelistustele.

Siin on värskendatud Pythoni koodi näide, mis hõlmab neid kontseptsioone:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Kohanda eelistusi vastavalt kasutaja tagasisidele
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Skeemi alusel järeldamine teiste seotud eelistuste kohandamiseks
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Kohandatud loogika eelistuste kohandamiseks skeemi ja tagasiside põhjal
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Genereeri kood lennuandmete hankimiseks vastavalt uuendatud eelistustele
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Genereeri kood hotelliandmete hankimiseks vastavalt uuendatud eelistustele
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simuleeri koodi täitmist ja tagasta võltsandmed
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Genereeri reisiplaan lennude, hotellide ja vaatamisväärsuste põhjal
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Näidis-skeem
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Kasutamise näide
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Genereeri uuesti ja käivita kood uuendatud eelistustega
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Selgitus - broneerimine tagasiside põhjal

1. **Skeemi teadlikkus**: `schema` sõnastik määratleb, kuidas eelistusi tuleks tagasiside põhjal kohandada. See sisaldab välju nagu `favorites` ja `avoid` vastavate kohandustega.
2. **Eelistuste kohandamine (`adjust_based_on_feedback` meetod)**: See meetod kohandab eelistusi kasutaja tagasiside ja skeemi põhjal.
3. **Keskkonnapõhised kohandused (`adjust_based_on_environment` meetod)**: See meetod kohandab kohandusi skeemi ja tagasiside põhjal.
4. **Päringute genereerimine ja täitmine**: Süsteem genereerib koodi, et tuua uuendatud lennu- ja hotelliandmeid kohandatud eelistuste alusel, ning simuleerib nende päringute täitmist.
5. **Marsruudi genereerimine**: Süsteem loob uuendatud marsruudi uute lennu-, hotelli- ja atraktsioonide andmete põhjal.

Tehes süsteemi keskkonnateadlikuks ja rakendades järeldusvõimet skeemi alusel, suudab see genereerida täpsemaid ja asjakohasemaid päringuid, mis viib paremate reisisoovitusteni ja isikupärasema kasutajakogemuseni.

### SQL-i kasutamine Retrieval-Augmented Generation (RAG) tehnikana

SQL (Structured Query Language) on võimas vahend andmebaasidega suhtlemiseks. Kui seda kasutatakse osana Retrieval-Augmented Generation (RAG) lähenemisest, saab SQL pärida asjakohaseid andmeid andmebaasidest, et teavitada ja genereerida vastuseid või toiminguid AI-agentides. Vaatleme, kuidas SQL-i saab RAG-tehnikana kasutada Travel Agent näites.

#### Olulised mõisted

1. **Andmebaasiga suhtlemine**:
   - SQL-i kasutatakse andmebaaside pärimiseks, asjakohase info toomiseks ja andmete manipuleerimiseks.
   - Näide: lennuandmete, hotelliinfo ja atraktsioonide toomine reisiandmebaasist.

2. **Integreerimine RAG-iga**:
   - SQL-päringud genereeritakse kasutaja sisendi ja eelistuste põhjal.
   - Toositud andmeid kasutatakse seejärel isikupärastatud soovituste või toimingute genereerimiseks.

3. **Dünaamiline päringute genereerimine**:
   - AI-agent genereerib dünaamilisi SQL-päringuid konteksti ja kasutaja vajaduste põhjal.
   - Näide: SQL-päringute kohandamine tulemuste filtreerimiseks eelarve, kuupäevade ja huvide põhjal.

#### Rakendused

- **Automatiseeritud koodi genereerimine**: Genereerida koodilõike konkreetsete ülesannete jaoks.
- **SQL kui RAG**: Kasutada SQL-päringuid andmete manipuleerimiseks.
- **Probleemide lahendamine**: Luua ja käivitada koodi probleemide lahendamiseks.

**Näide**:
Andmeanalüüsi agent:

1. **Ülesanne**: Analüüsida andmestikku trendide leidmiseks.
2. **Sammud**:
   - Laadi andmestik.
   - Genereeri SQL-päringud andmete filtreerimiseks.
   - Täida päringud ja too tulemused.
   - Genereeri visualiseeringud ja järeldused.
3. **Ressursid**: Juurdepääs andmestikule, SQL-võimalused.
4. **Kogemus**: Kasuta varasemaid tulemusi tulevaste analüüside parandamiseks.

#### Praktiline näide: SQL-i kasutamine Travel Agentis

1. **Kasutaja eelistuste kogumine**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **SQL-päringute genereerimine**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **SQL-päringute täitmine**

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

4. **Soovituste genereerimine**

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

#### Näidispäringud SQL-is

1. **Lennu päring**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Hotelli päring**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Atraktsiooni päring**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Kasutades SQL-i osana Retrieval-Augmented Generation (RAG) tehnikast, saavad AI-agendid nagu Travel Agent dünaamiliselt pärida ja kasutada asjakohaseid andmeid, et pakkuda täpseid ja isikupäraseid soovitusi.

### Metakognitsiooni näide

Selleks, et demonstreerida metakognitsiooni rakendust, loome lihtsa agendi, mis peegeldab oma otsustusprotsessi probleemi lahendamise ajal. Selle näite puhul ehitame süsteemi, kus agent püüab optimeerida hotelli valikut, seejärel hindab oma mõtlemist ja kohandab strateegiat, kui teeb vigu või subopimaalseid valikuid.

Simuleerime seda lihtsa näitega, kus agent valib hotellid hinnakombinatsiooni ja kvaliteedi põhjal, kuid "peegeldab" oma otsuseid ja kohandab vastavalt.

#### Kuidas see illustreerib metakognitsiooni:

1. **Esialgne otsus**: Agent valib kõige odavama hotelli, mõistmata kvaliteedi mõju.
2. **Reflektsioon ja hindamine**: Pärast esialgset valikut kontrollib agent, kas hotell oli "halb" valik, kasutades kasutaja tagasisidet. Kui leitakse, et hotelli kvaliteet oli liiga madal, peegeldab agent oma mõtlemist.
3. **Strateegia kohandamine**: Agent kohandab oma strateegiat, liikudes "kõige odavamalt" kuni "kõrgeima kvaliteedini", parandades seeläbi oma otsustusprotsessi tulevikus.

Siin on näide:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Salvestab varem valitud hotellid
        self.corrected_choices = []  # Salvestab parandatud valikud
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Saadaval olevad strateegiad

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
        # Oletame, et meil on kasutajalt tagasisidet, mis ütleb, kas viimane valik oli hea või mitte
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Muuda strateegiat, kui eelmine valik oli rahuldamatu
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

# Simuleeri hotellide nimekiri (hind ja kvaliteet)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Loo agent
agent = HotelRecommendationAgent()

# Samm 1: Agent soovitab hotelli, kasutades "odavaimat" strateegiat
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Samm 2: Agent mõtleb valiku üle ja kohandab strateegiat vajadusel
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Samm 3: Agent soovitab uuesti, seekord kasutades kohandatud strateegiat
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Agentide metakognitsiooni võimed

Oluline on agendi võime:
- Hinnata oma varasemaid valikuid ja otsustusprotsessi.
- Kohandada oma strateegiat selle peegelduse põhjal, st metakognitsioon töötab.

See on lihtne metakognitsiooni vorm, kus süsteem suudab kohandada oma järeldusprotsessi sisemise tagasiside põhjal.

### Kokkuvõte

Metakognitsioon on võimas tööriist, mis võib oluliselt parandada AI-agentide võimekust. Metakognitiivsete protsesside lisamisega saab luua agente, kes on intelligentsemad, kohanemisvõimelisemad ja tõhusamad. Kasuta täiendavaid ressursse, et edasi uurida metakognitsiooni põnevat maailma AI-agentides.

### Kas sul on rohkem küsimusi metakognitsiooni disainimustri kohta?

Liitu [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), et kohtuda teiste õppijatega, osaleda konsultatsioonitundides ja saada vastused oma AI Agentide küsimustele.

## Eelmine õppetund

[Mitmeagendi disainimuster](../08-multi-agent/README.md)

## Järgmine õppetund

[AI agentide tootmises](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Lahtiütlus:
See dokument on tõlgitud tehisintellekti tõlketeenuse Co-op Translator (https://github.com/Azure/co-op-translator) abil. Kuigi püüame tagada täpsust, võivad automaatsed tõlked sisaldada vigu või ebatäpsusi. Originaaldokumenti selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta mis tahes arusaamatuste või valesti tõlgendamise eest, mis tulenevad selle tõlke kasutamisest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->