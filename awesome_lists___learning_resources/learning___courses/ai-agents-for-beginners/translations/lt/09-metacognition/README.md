[![Daugiaprogrammės agentų dizainas](../../../translated_images/lt/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Spustelėkite viršuje esantį paveikslėlį, kad peržiūrėtumėte šios pamokos vaizdo įrašą)_
# Metakognicija DI agentuose

## Įvadas

Sveiki atvykę į pamoką apie metakogniciją DI agentuose! Šis skyrius skirtas pradedantiesiems, kurie domisi, kaip DI agentai gali mąstyti apie savo minties procesus. Pamokos pabaigoje suprasite pagrindines sąvokas ir turėsite praktinių pavyzdžių, kaip taikyti metakogniciją DI agentų dizainui.

## Mokymosi tikslai

Baigę šią pamoką galėsite:

1. Suprasti priežastinius ciklus agentų apibrėžimuose.
2. Naudoti planavimo ir vertinimo technikas, padedančias savikoreguojantiems agentams.
3. Kurti savo agentus, gebančius manipuliuoti kodu, kad atliktų užduotis.

## Įvadas į metakogniciją

Metakognicija reiškia aukštesniojo lygio pažinimo procesus, susijusius su mąstymu apie savo paties mąstymą. DI agentams tai reiškia gebėjimą įvertinti ir koreguoti savo veiksmus, remiantis savimonėmis ir ankstesne patirtimi. Metakognicija arba „mąstymas apie mąstymą“ yra svarbi sąvoka kuriant agentinius DI sistemas. Tai apima DI sistemų gebėjimą suvokti savo vidinius procesus ir gebėjimą stebėti, reguliuoti bei pritaikyti savo elgesį atitinkamai. Kaip mes darome, kai skaitome situaciją ar žiūrime į problemą. Ši savimonė padeda DI sistemoms priimti geresnius sprendimus, nustatyti klaidas ir laikui bėgant gerinti savo našumą – vėlgi grįžtant prie Turingo testo ir diskusijų, ar DI perims kontrolę.

Agentinių DI sistemų kontekste metakognicija gali padėti spręsti kelis iššūkius, tokius kaip:
- Skaidrumas: užtikrinti, kad DI sistemos galėtų paaiškinti savo samprotavimus ir sprendimus.
- Samprotavimas: stiprinti DI sistemų gebėjimą sintezuoti informaciją ir priimti pagrįstus sprendimus.
- Adaptacija: leisti DI sistemoms prisitaikyti prie naujos aplinkos ir besikeičiančių sąlygų.
- Perceptija: gerinti DI sistemų tikslumą atpažįstant ir interpretuojant duomenis iš aplinkos.

### Kas yra metakognicija?

Metakognicija arba „mąstymas apie mąstymą“ yra aukštesniojo lygio pažinimo procesas, apimantis savimonę ir pažinimo procesų savireguliaciją. DI srityje metakognicija suteikia agentams galimybę įvertinti ir pritaikyti savo strategijas bei veiksmus, taip pagerindama problemų sprendimo ir sprendimų priėmimo gebėjimus. Suprasdami metakogniciją, galite kurti DI agentus, kurie ne tik protingesni, bet ir prisitaikantys bei efektyvūs. Tikroje metakognicijoje DI aiškiai samprotauja apie savo pačio samprotavimus.

Pavyzdys: „Aš prioritetą teikiau pigesniems skrydžiams, nes... Gali būti, kad praleidžiu tiesioginius skrydžius, todėl dar kartą patikrinsiu.“
Sekimas, kaip ar kodėl pasirinko tam tikrą maršrutą.
- Pastebėjimas, kad padarė klaidų, nes per daug pasikliaudamas vartotojo preferencijomis iš praėjusio karto, todėl keičia ne tik galutinį rekomendavimą, bet ir sprendimų priėmimo strategiją.
- Diagnostika, pavyzdžiui: „Kiekvieną kartą, kai vartotojas mini 'per daug žmonių', turėčiau ne tik pašalinti tam tikrus objektus, bet ir atkreipti dėmesį, kad mano metodas rinkti 'geriausias atrakcijas' yra klaidingas, jei visada reitinguoju pagal populiarumą.“

### Metakognicijos svarba DI agentams

Metakognicija atlieka svarbų vaidmenį DI agentų dizainui dėl kelių priežasčių:

![Metakognicijos svarba](../../../translated_images/lt/importance-of-metacognition.b381afe9aae352f7.webp)

- Savianalizė: agentai gali įvertinti savo veiklą ir nustatyti tobulintinas sritis.
- Prisitaikymas: agentai gali keisti strategijas remdamiesi ankstesne patirtimi ir besikeičiančiomis aplinkybėmis.
- Klaidų taisymas: agentai gali savarankiškai aptikti ir taisyti klaidas, suteikdami tikslesnius rezultatus.
- Išteklių valdymas: agentai gali optimizuoti išteklių, tokių kaip laikas ir skaičiavimo galia, naudojimą planuodami ir vertindami savo veiksmus.

## DI agente esminiai komponentai

Prieš pradedant metakognityvinius procesus, svarbu suprasti pagrindinius DI agento komponentus. DI agentas paprastai susideda iš:

- Persona: agento asmenybė ir charakteristikos, apibrėžiančios, kaip jis bendrauja su naudotojais.
- Įrankiai: agento galimybės ir funkcijos atlikti užduotis.
- Įgūdžiai: žinios ir ekspertizė, kuriomis agentas disponuoja.

Šie komponentai kartu sukuria „ekspertizės vienetą“, galintį atlikti specifines užduotis.

**Pavyzdys**:
Įsivaizduokite kelionių agentą, kuris ne tik planuoja jūsų atostogas, bet ir keičia savo veiksmus remdamasis realaus laiko duomenimis bei ankstesne klientų kelionių patirtimi.

### Pavyzdys: metakognicija kelionių agentūroje

Įsivaizduokite, kad kuriate DI pagrindu veikiančią kelionių agentūrą. Šis agentas „Travel Agent“ padeda vartotojams planuoti atostogas. Norint įtraukti metakogniciją, agentas turi įvertinti ir koreguoti savo veiksmus remdamasis savimonėmis ir ankstesne patirtimi. Štai kaip metakognicija galėtų veikti:

#### Dabartinė užduotis

Pagelbėti vartotojui suorganizuoti kelionę į Paryžių.

#### Užduoties atlikimo žingsniai

1. **Surinkti vartotojo pageidavimus**: paklausti apie kelionės datas, biudžetą, pomėgius (pvz., muziejai, virtuvė, apsipirkimas) ir specifinius reikalavimus.
2. **Surinkti informaciją**: ieškoti skrydžių, apgyvendinimo, lankytinų vietų ir restoranų pagal vartotojo pageidavimus.
3. **Sukurti rekomendacijas**: pateikti asmeninį kelionės planą su skrydžių duomenimis, viešbučių rezervacijomis ir siūlomomis veiklomis.
4. **Pakoreguoti remiantis grįžtamuoju ryšiu**: gauti vartotojo atsiliepimus apie rekomendacijas ir atlikti reikiamus pakeitimus.

#### Reikalingi ištekliai

- Prieiga prie skrydžių ir viešbučių rezervavimo duomenų bazių.
- Informacija apie Paryžiaus lankytinas vietas ir restoranus.
- Vartotojų atsiliepimų duomenys iš ankstesnių sąveikų.

#### Patirtis ir savianalizė

„Travel Agent“ naudoja metakogniciją vertindamas savo veiklą ir mokydamasis iš ankstesnės patirties. Pavyzdžiui:

1. **Vartotojų atsiliepimų analizė**: agentas peržiūri vartotojų atsiliepimus, kad nustatytų, kurios rekomendacijos buvo sėkmingos, o kurios ne. Ateities pasiūlymus koreguoja atitinkamai.
2. **Prisitaikymas**: jei vartotojas anksčiau minėjo, kad nemėgsta perpildytų vietų, agentas ateityje vengs siūlyti populiarias turistų vietas piko valandomis.
3. **Klaidų taisymas**: jei agentas padarė klaidą ankstesnėje rezervacijoje, pavyzdžiui, pasiūlė viešbutį, kuris buvo užimtas, jis išmoksta kruopščiau tikrinti prieinamumą prieš pateikdamas rekomendacijas.

#### Praktinis kūrėjo pavyzdys

Štai supaprastintas pavyzdys, kaip „Travel Agent“ kodas galėtų atrodyti įtraukiant metakogniciją:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Ieškokite skrydžių, viešbučių ir lankytinų vietų pagal pageidavimus
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
        # Analizuokite atsiliepimus ir pritaikykite būsimus rekomendacijas
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Pavyzdinis naudojimas
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

#### Kodėl svarbi metakognicija

- **Savianalizė**: agentai gali analizuoti savo veiklą ir nustatyti tobulintinas sritis.
- **Prisitaikymas**: agentai gali keisti strategijas remdamiesi grįžtamuoju ryšiu ir besikeičiančiomis sąlygomis.
- **Klaidų taisymas**: agentai gali autonomiškai aptikti ir taisyti klaidas.
- **Išteklių valdymas**: agentai gali optimizuoti išteklių, tokių kaip laikas ir skaičiavimo galia, naudojimą.

Įtraukdami metakogniciją, „Travel Agent“ gali teikti labiau personalizuotas ir tikslesnes kelionių rekomendacijas, gerindamas vartotojo patirtį.

---

## 2. Planavimas agentuose

Planavimas yra esminė DI agentų elgesio dalis. Tai apima žingsnių plano sudarymą, reikalingą tikslui pasiekti, atsižvelgiant į esamą būseną, išteklius ir galimas kliūtis.

### Planavimo elementai

- **Dabartinė užduotis**: aiškiai apibrėžkite užduotį.
- **Žingsniai užduočiai atlikti**: suskaidykite užduotį į valdomus žingsnius.
- **Reikalingi ištekliai**: nustatykite reikalingus išteklius.
- **Patirtis**: naudokite ankstesnę patirtį planavimui grįsti.

**Pavyzdys**:
Štai žingsniai, kuriuos „Travel Agent“ turi atlikti, kad efektyviai padėtų vartotojui planuoti kelionę:

### „Travel Agent“ žingsniai

1. **Surinkti vartotojo pageidavimus**
   - Paklauskite apie kelionės datas, biudžetą, pomėgius ir specifinius reikalavimus.
   - Pavyzdžiai: „Kada planuojate keliauti?“ „Koks jūsų biudžeto diapazonas?“ „Kokios veiklos jums patinka atostogų metu?“

2. **Surinkti informaciją**
   - Ieškokite tinkamų kelionės variantų pagal vartotojo pageidavimus.
   - **Skrydžiai**: ieškokite skrydžių pagal biudžetą ir pageidaujamas kelionės datas.
   - **Apgyvendinimas**: raskite viešbučius ar nuomos objektus, atitinkančius vietos, kainos ir patogumų pageidavimus.
   - **Lankytinos vietos ir restoranai**: identifikuokite populiarias lankytinas vietas, veiklas ir maitinimo įstaigas, atitinkančias vartotojo pomėgius.

3. **Sukurti rekomendacijas**
   - Sudarykite asmeninį kelionės maršrutą.
   - Pateikite duomenis apie skrydžių galimybes, viešbučių rezervacijas ir siūlomas veiklas, pritaikytas vartotojo pageidavimams.

4. **Pateikti maršrutą vartotojui**
   - Pasidalykite siūlomu maršrutu vartotojui peržiūrėti.
   - Pavyzdys: „Štai siūlomas jūsų kelionės į Paryžių maršrutas. Jame yra skrydžių duomenys, viešbučių rezervacijos ir rekomenduojamų veiklų bei restoranų sąrašas. Pasidalykite savo nuomone!“

5. **Surinkti atsiliepimus**
   - Paprašykite vartotojo atsiliepimų apie siūlomą maršrutą.
   - Pavyzdžiai: „Ar jus tenkina skrydžių pasirinkimai?“ „Ar viešbutis tinka jūsų poreikiams?“ „Ar yra veiklų, kurias norėtumėte pridėti arba pašalinti?“

6. **Pakoreguoti remiantis atsiliepimais**
   - Pakeiskite maršrutą pagal vartotojo pastabas.
   - Prireikus koreguokite skrydžių, apgyvendinimo ir veiklos rekomendacijas, kad geriau atitiktų vartotojo poreikius.

7. **Galutinis patvirtinimas**
   - Pateikite vartotojui patikslintą maršrutą galutiniam patvirtinimui.
   - Pavyzdys: „Atlikau pakeitimus pagal jūsų pastabas. Štai atnaujintas maršrutas. Ar viskas atrodo tinkamai?“

8. **Rezervacijų užbaigimas ir patvirtinimas**
   - Kai vartotojas patvirtina maršrutą, vykdykite skrydžių, apgyvendinimo ir suplanuotų veiklų rezervacijas.
   - Išsiųskite patvirtinimo duomenis vartotojui.

9. **Teikti nuolatinę pagalbą**
   - Būkite pasirengę padėti vartotojui dėl bet kokių pakeitimų ar papildomų prašymų prieš kelionę ir jos metu.
   - Pavyzdys: „Jei kelionės metu reikės papildomos pagalbos, drąsiai kreipkitės bet kuriuo metu!“

### Pavyzdinė sąveika

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

# Pavyzdinis naudojimas apeinant užklausą
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

## 3. Koreguojanti RAG sistema

Pirmiausia pradėkime suprasdami skirtumą tarp RAG įrankio ir išankstinio konteksto užkrovimo.

![RAG prieš Konteksto įkėlimą](../../../translated_images/lt/rag-vs-context.9eae588520c00921.webp)

### Paieškos papildoma generacija (RAG)

RAG jungia paieškos sistemą su generatyviniu modeliu. Kai pateikiama užklausa, paieškos sistema surenka aktualius dokumentus ar duomenis iš išorinės duomenų bazės, o ši surinkta informacija papildomai suteikia įėjimą generuojančiam modeliui. Tai padeda modeliui generuoti tikslesnius ir kontekstuališkai aktualius atsakymus.

RAG sistemoje agentas surenka aktualią informaciją iš žinių bazės ir naudoja ją tinkamiems atsakymams ar veiksmams generuoti.

### Koreguojantis RAG požiūris

Koreguojantis RAG požiūris sutelktas į RAG technikų naudojimą klaidoms taisyti ir DI agentų tikslumo gerinimui. Tai apima:

1. **Skatinimo technika**: naudojant specifinius užklausimus, kad agentas surinktų aktualią informaciją.
2. **Įrankį**: taikančius algoritmus ir mechanizmus, leidžiančius agentui įvertinti gautos informacijos aktualumą ir generuoti tikslius atsakymus.
3. **Vertinimą**: nuolatinį agento veiklos stebėjimą ir koregavimą, siekiant pagerinti tikslumą ir efektyvumą.

#### Pavyzdys: koreguojantis RAG paieškos agente

Įsivaizduokite paieškos agentą, kuris surenka informaciją iš interneto, kad atsakytų į vartotojų užklausas. Koreguojantis RAG požiūris gali apimti:

1. **Skatinimo techniką**: formuluoti paieškos užklausas pagal vartotojo pateiktą informaciją.
2. **Įrankį**: naudoti natūralios kalbos apdorojimo ir mašininio mokymosi algoritmus rezultatų reitingavimui ir filtravimui.
3. **Vertinimą**: analizuoti vartotojų atsiliepimus, kad nustatyti ir ištaisyti netikslius duomenis.

### Koreguojantis RAG kelionių agento pavyzdyje

Koreguojantis RAG (Retrieval-Augmented Generation) pagerina DI gebėjimą rinkti ir generuoti informaciją, tuo pačiu taisant netikslumus. Pažiūrėkime, kaip „Travel Agent“ gali naudoti koreguojantį RAG metodą teikti tikslesnes ir aktualias kelionių rekomendacijas.

Tai apima:

- **Skatinimo techniką:** naudoti specifinius užklausimus, kad agentas surinktų aktualią informaciją.
- **Įrankį:** įgyvendinti algoritmus ir mechanizmus, kad agentas įvertintų informacijos aktualumą ir generuotų tikslius atsakymus.
- **Vertinimą:** nuolatos vertinti agento veiklą ir koreguoti veikimą, siekiant aukštesnio tikslumo ir efektyvumo.

#### Žingsniai koreguojančio RAG įgyvendinimui „Travel Agent“

1. **Pradinis vartotojo sąveikos etapas**
   - „Travel Agent“ surenka pagrindinius vartotojo pageidavimus, tokius kaip kelionės tikslas, datos, biudžetas ir pomėgiai.
   - Pavyzdys:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Informacijos rinkimas**
   - Agentas surenka duomenis apie skrydžius, apgyvendinimą, lankytinas vietas ir restoranus pagal vartotojo pageidavimus.
   - Pavyzdys:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Pradinių rekomendacijų kūrimas**
   - Agentas naudoja surinktą informaciją asmeniniam maršruto sudarymui.
   - Pavyzdys:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Vartotojo atsiliepimų rinkimas**
   - Agentas klausia vartotojo nuomonės apie pradines rekomendacijas.
   - Pavyzdys:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Koreguojantis RAG procesas**
   - **Skatinimo technika**: agentas formuluoja naujas paieškos užklausas pagal vartotojo atsiliepimus.
     - Pavyzdys:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Įrankis**: agentas naudoja algoritmus naujų paieškos rezultatų reitingavimui ir filtravimui, akcentuodamas aktualumą pagal vartotojo grįžtamąjį ryšį.
     - Pavyzdys:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Vertinimas**: agentas nuolat vertina savo rekomendacijų aktualumą ir tikslumą, analizuodamas vartotojo atsiliepimus ir atlikdamas reikiamus pakeitimus.
     - Pavyzdys:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktinis pavyzdys

Štai supaprastintas Python kodo pavyzdys, kuriame „Travel Agent“ integruoja koreguojantį RAG požiūrį:

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

# Pavyzdinis naudojimas
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

### Išankstinis konteksto užkrovimas
Pre-emptive Context Load reiškia aktualios konteksto ar foninės informacijos įkėlimą į modelį prieš apdorojant užklausą. Tai reiškia, kad modelis nuo pat pradžių turi prieigą prie šios informacijos, kas gali padėti jam generuoti labiau informuotus atsakymus, nereikalaujant papildomų duomenų paieškos proceso metu.

Štai paprastas pavyzdys, kaip gali atrodyti pre-emptive context load kelionių agento programoje Python kalba:

```python
class TravelAgent:
    def __init__(self):
        # Iš anksto įkelti populiarius tikslus ir jų informaciją
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Gauti tikslo informaciją iš iš anksto įkelto konteksto
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Pavyzdinis naudojimas
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Paaiškinimas

1. **Inicializacija (`__init__` metodas)**: `TravelAgent` klasė iš anksto įkelia žodyną, kuriame yra informacija apie populiarias kelionės kryptis, tokias kaip Paryžius, Tokijas, Niujorkas ir Sidnėjus. Šiame žodyne pateikiama informacija apie šalį, valiutą, kalbą ir pagrindines lankytinas vietas.

2. **Informacijos gavimas (`get_destination_info` metodas)**: Kai vartotojas užduoda klausimą apie konkretų kelionės tikslą, `get_destination_info` metodas paima svarbią informaciją iš iš anksto įkelto konteksto žodyno.

Iš anksto įkrovus kontekstą, kelionių agento programa gali greitai atsakyti į vartotojo užklausas, nereikalaujant realiu laiku ieškoti informacijos iš išorinio šaltinio. Tai padaro programą efektyvesnę ir greičiau reaguojančią.

### Plano sukūrimas su tikslu prieš iteravimą

Plano sukūrimas su tikslu reiškia aiškaus tikslo arba norimo rezultato apibrėžimą iš anksto. Apibrėžus šį tikslą, modelis gali jį naudoti kaip vadovaujančią taisyklę viso iteracinio proceso metu. Tai padeda užtikrinti, kad kiekviena iteracija artėtų prie norimo rezultato, todėl procesas tampa efektyvesnis ir labiau koncentruotas.

Štai pavyzdys, kaip galite sukurti kelionės planą su tikslu prieš iteravimą kelionių agento programoje Python kalba:

### Scenarijus

Kelionių agentas nori suplanuoti pritaikytą atostogų kelionę klientui. Tikslas yra sukurti kelionės maršrutą, kuris maksimaliai atitiktų kliento pageidavimus ir biudžetą.

### Žingsniai

1. Apibrėžti kliento pageidavimus ir biudžetą.
2. Pradėti pradinį planą remiantis šiomis nuostatomis.
3. Atliekant iteracijas tobulinti planą, optimizuojant kliento pasitenkinimą.

#### Python kodas

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

# Pavyzdinis naudojimas
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

#### Kodo paaiškinimas

1. **Inicializacija (`__init__` metodas)**: `TravelAgent` klasė inicijuojama su galimų kelionės tikslų sąrašu, kurių kiekvienas turi pavadinimą, kainą ir veiklos tipą.

2. **Plano sukūrimas (`bootstrap_plan` metodas)**: Šis metodas sukuria pradinį kelionės planą pagal kliento pageidavimus ir biudžetą. Jis iteruoja per kelionės tikslų sąrašą ir prideda juos prie plano, jei atitinka kliento pageidavimus ir telpa į biudžetą.

3. **Pageidavimų atitikimas (`match_preferences` metodas)**: Šis metodas tikrina, ar kelionės tikslas atitinka kliento pageidavimus.

4. **Plano iteracija (`iterate_plan` metodas)**: Šis metodas tobulina pradinį planą, bandydamas kiekvieną kelionės tikslą pakeisti geresniu atitikmeniu, atsižvelgiant į kliento pageidavimus ir biudžeto ribas.

5. **Kainos apskaičiavimas (`calculate_cost` metodas)**: Šis metodas apskaičiuoja esamo plano bendrą kainą, įskaitant galimą naują kelionės tikslą.

#### Pavyzdinis naudojimas

- **Pradinis planas**: Kelionių agentas sukuria pradinį planą pagal kliento pageidavimus aplankyti lankytinas vietas ir biudžetą 2000 USD.
- **Patobulintas planas**: Kelionių agentas iteruoja planą, optimizuodamas kliento pageidavimus ir biudžetą.

Toks plano kūrimas su aiškiu tikslu (pvz., maksimizuoti kliento pasitenkinimą) ir tobulinimas iteracijomis leidžia kelionių agentui sukurti pritaikytą ir optimizuotą kelionės maršrutą klientui. Šis požiūris užtikrina, kad kelionės planas nuo pradžios atitinka kliento pageidavimus ir biudžetą bei tobulėja su kiekviena iteracija.

### LLM pranašumo panaudojimas perskirstymui ir įvertinimui

Dideli kalbos modeliai (LLM) gali būti naudojami perskirstymui ir įvertinimui, vertinant gautų dokumentų ar sugeneruotų atsakymų aktualumą ir kokybę. Štai kaip tai veikia:

**Paieška:** Pradinė paieškos fazė surenka kandidatų dokumentus arba atsakymus pagal užklausą.

**Perskirstymas:** LLM įvertina šiuos kandidatus ir juos perskirsto pagal aktualumą ir kokybę. Šis žingsnis užtikrina, kad pirmiausia būtų pateikta tik aktualiausia ir aukščiausios kokybės informacija.

**Įvertinimas:** LLM priskiria rezultatams balus, atspindinčius jų aktualumą ir kokybę. Tai padeda pasirinkti geriausią atsakymą arba dokumentą vartotojui.

Naudojant LLM perskirstymui ir įvertinimui, sistema gali pateikti tikslesnę ir kontekstualiai aktualią informaciją, gerindama bendrą vartotojo patirtį.

Štai pavyzdys, kaip kelionių agentas gali naudoti Didelį Kalbos Modelį (LLM) perskirstymui ir įvertinimui pagal vartotojo pageidavimus Python kalba:

#### Scenarijus – kelionė pagal pageidavimus

Kelionių agentas nori rekomenduoti geriausias kelionės kryptis klientui, remdamasis jo pageidavimais. LLM padės perskirstyti ir įvertinti kryptis, kad būtų pateikti atitinkamiausi pasiūlymai.

#### Žingsniai:

1. Surinkti vartotojo pageidavimus.
2. Gauti galimų kelionių krypčių sąrašą.
3. Naudoti LLM perskirstymui ir įvertinimui pagal vartotojo pageidavimus.

Čia parodyta, kaip atnaujinti ankstesnį pavyzdį, kad būtų naudojamos Azure OpenAI paslaugos:

#### Reikalavimai

1. Turėti Azure prenumeratą.
2. Sukurti Azure OpenAI išteklių ir gauti API rakto.

#### Pavyzdinis Python kodas

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Sugeneruoti užklausą Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Apibrėžti antraštes ir užklausos duomenis
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Iškviesti Azure OpenAI API, kad gauti iš naujo įvertintas ir įvertintas paskirties vietas
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Ištraukti ir grąžinti rekomendacijas
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

# Naudojimo pavyzdys
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

#### Kodo paaiškinimas – pageidavimų tvarkytojas

1. **Inicializacija**: `TravelAgent` klasė inicializuojama su galimų kelionės krypčių sąrašu, kur kiekvienas turi pavadinimą ir aprašymą.

2. **Rekomendacijų gavimas (`get_recommendations` metodas)**: Šis metodas generuoja užklausą (prompt) Azure OpenAI paslaugai pagal vartotojo pageidavimus ir atlieka HTTP POST užklausą Azure OpenAI API, kad gautų perskirstytas ir įvertintas kryptis.

3. **Užklausos generavimas (`generate_prompt` metodas)**: Šis metodas sukuria užklausą Azure OpenAI, įtraukiant vartotojo pageidavimus ir kelionių krypčių sąrašą. Užklausa nurodo modeliui perskirti ir įvertinti kryptis pagal pateiktus pageidavimus.

4. **API kvietimas**: Naudojama biblioteka `requests` HTTP POST užklausai Azure OpenAI API pabaigos tašku. Atsakyme pateikiamos perskirstytos ir įvertintos kelionių kryptys.

5. **Pavyzdinis naudojimas**: Kelionių agentas renka vartotojo pageidavimus (pvz., susidomėjimą lankytinomis vietomis ir įvairialype kultūra) ir naudoja Azure OpenAI paslaugą, kad gautų perskirstytas ir įvertintas rekomendacijas kelionių kryptims.

Nepamirškite pakeisti `your_azure_openai_api_key` savo tikru Azure OpenAI API raktu ir `https://your-endpoint.com/...` tikru Azure OpenAI diegimo pabaigos tašku.

Naudojant LLM perskirstymui ir įvertinimui, kelionių agentas gali pateikti labiau personalizuotas ir aktualias kelionės rekomendacijas klientams, gerindamas jų bendrą patirtį.

### RAG: užklausimo technika vs įrankis

Retrieval-Augmented Generation (RAG) gali būti tiek užklausimo technika, tiek įrankis AI agentų kūrime. Supratimas apie šių skirtumą padės jums efektyviau naudoti RAG savo projektuose.

#### RAG kaip užklausimo technika

**Kas tai?**

- Kaip užklausimo technika, RAG apima specifinių užklausų ar promptų sudarymą, siekiant nukreipti aktualios informacijos paiešką dideliuose korpusuose ar duomenų bazėse. Ši informacija naudojama atsakymams ar veiksmams generuoti.

**Kaip tai veikia:**

1. **Promptų sudarymas**: Kuriami gerai struktūruoti promptai ar užklausos pagal užduotį ar vartotojo įvestį.
2. **Informacijos gavimas**: Naudojant promptus ieškoma aktualių duomenų iš jau egzistuojančios žinių bazės ar duomenų rinkinių.
3. **Atsakymo generavimas**: Gauta informacija derinama su generatyviais AI modeliais, kad sukurtų išsamų ir nuoseklų atsakymą.

**Pavyzdys kelionių agentui:**

- Vartotojo užklausa: „Noriu aplankyti muziejus Paryžiuje.“
- Promptas: „Surask geriausius muziejus Paryžiuje.“
- Gauta informacija: Detalės apie Luvro muziejų, Orsė muziejų ir kt.
- Sugeneruotas atsakymas: „Štai keli geriausi muziejai Paryžiuje: Luvro muziejus, Orsė muziejus ir Pompidu centre.“

#### RAG kaip įrankis

**Kas tai?**

- Kaip įrankis, RAG yra integruota sistema, kuri automatiškai atlieka informacijos gavimo ir atsakymų generavimo procesus, palengvinanti kūrėjų darbą kuriant sudėtingas AI funkcijas, nereikalaujant rankiniu būdu kurti promptų kiekvienai užklausai.

**Kaip tai veikia:**

1. **Integracija**: RAG įterpiamas į AI agento architektūrą, leidžiant jam automatiškai apdoroti informacijos gavimą ir generavimą.
2. **Automatizavimas**: Įrankis valdo visą procesą, nuo vartotojo įvesties gavimo iki galutinio atsakymo generavimo, nereikalaujant specifinių promptų kiekvienam žingsniui.
3. **Efektyvumas**: Pagerina agento veikimą, optimizuodamas informacijos gavimo ir generavimo procesus, leidžiant greičiau ir tiksliau atsakyti.

**Pavyzdys kelionių agentui:**

- Vartotojo užklausa: „Noriu aplankyti muziejus Paryžiuje.“
- RAG įrankis: Automatiškai surenka informaciją apie muziejus ir sugeneruoja atsakymą.
- Sugeneruotas atsakymas: „Štai keli geriausi muziejai Paryžiuje: Luvro muziejus, Orsė muziejus ir Pompidu centre.“

### Palyginimas

| Aspektas               | Užklausimo technika                                       | Įrankis                                               |
|------------------------|---------------------------------------------------------|-------------------------------------------------------|
| **Rankinis vs automatizuotas**| Rankinis promptų kūrimas kiekvienai užklausai.          | Automatizuotas paieškos ir generavimo procesas.       |
| **Kontrolė**            | Didesnė kontrolė paieškos procese.                       | Supaprastina ir automatizuoja paieškos ir generavimo procesą. |
| **Lankstumas**          | Leidžia pritaikyti promptus pagal specifinius poreikius.| Efektyvesnis didelio masto diegimams.                 |
| **Sudėtingumas**        | Reikalauja promptų kūrimo ir tobulinimo.                  | Lengviau integruoti į AI agentų architektūrą.         |

### Praktiniai pavyzdžiai

**Užklausimo technikos pavyzdys:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Įrankio pavyzdys:**

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

### Aktualumo vertinimas

Aktualumo vertinimas yra svarbi AI agentų veikimo dalis. Jis užtikrina, kad agento gauta ir sugeneruota informacija būtų tinkama, tiksli ir naudinga vartotojui. Panagrinėkime, kaip įvertinti aktualumą AI agentams, įskaitant praktinius pavyzdžius ir metodus.

#### Pagrindinės aktualumo vertinimo sąvokos

1. **Konteksto suvokimas**:
   - Agentas turi suvokti vartotojo užklausos kontekstą, kad galėtų gauti ir sugeneruoti aktualią informaciją.
   - Pavyzdys: Jei vartotojas klausia „geriausios restoranai Paryžiuje“, agentas turėtų atsižvelgti į vartotojo pageidavimus, tokius kaip virtuvės tipas ir biudžetas.

2. **Tikslumas**:
   - Agentas turi pateikti faktinę, teisingą ir atnaujintą informaciją.
   - Pavyzdys: Rekomenduoti šiuo metu atvirus restoranus su geromis apžvalgomis, o ne pasenusias ar uždarytas vietas.

3. **Vartotojo ketinimas**:
   - Agentas turi numatyti vartotojo ketinimus užklausos pagrindu, kad pateiktų tinkamiausią informaciją.
   - Pavyzdys: Jei vartotojas prašo „biudžetinių viešbučių“, prioritetas turi būti nebrangioms galimybėms.

4. **Grįžtamojo ryšio ciklas**:
   - Nuolatinis vartotojų atsiliepimų rinkimas ir analizė padeda agentui tobulinti aktualumo vertinimą.
   - Pavyzdys: Įtraukti vartotojų įvertinimus ir atsiliepimus apie ankstesnes rekomendacijas, kad pagerintų būsimus atsakymus.

#### Praktiniai aktualumo vertinimo metodai

1. **Aktualumo balų skyrimas**:
   - Priskirkite kiekvienam gautam elementui aktualumo balą, atsižvelgiant į tai, kiek gerai jis atitinka vartotojo užklausą ir pageidavimus.
   - Pavyzdys:

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

2. **Filtravimas ir reitingavimas**:
   - Pašalinkite nereikšmingus elementus ir surūšiuokite likusius pagal aktualumo balus.
   - Pavyzdys:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Grąžinkite 10 geriausių atitinkančių elementų
     ```

3. **Natūralios kalbos apdorojimas (NLP)**:
   - Naudokite NLP metodus vartotojo užklausai analizuoti ir aktualiai informacijai gauti.
   - Pavyzdys:

     ```python
     def process_query(query):
         # Naudokite NLP, kad išgautumėte pagrindinę informaciją iš vartotojo užklausos
         processed_query = nlp(query)
         return processed_query
     ```

4. **Vartotojo atsiliepimų integracija**:
   - Rinkite vartotojo atsiliepimus apie pateiktas rekomendacijas ir naudokite juos ateities aktualumo vertinimui koreguoti.
   - Pavyzdys:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Pavyzdys: aktualumo vertinimas kelionių agento programoje

Štai praktinis pavyzdys, kaip kelionių agentas gali įvertinti kelionių rekomendacijų aktualumą:

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
        return ranked_items[:10]  # Grąžinti 10 svarbiausių elementų

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

# Pavyzdžio naudojimas
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

### Paieška su ketinimu

Paieška su ketinimu reiškia vartotojo užklausos tikslų ar siekiamo rezultato supratimą ir interpretavimą, siekiant gauti ir sugeneruoti pačią aktualiausią ir naudingiausią informaciją. Šis požiūris neapsiriboja vien raktinių žodžių atitikimu, bet orientuojasi į tikrųjų vartotojo poreikių ir konteksto suvokimą.

#### Pagrindinės paieškos su ketinimu sąvokos

1. **Vartotojo ketinimo supratimas**:
   - Vartotojo ketinimas gali būti suskirstytas į tris pagrindines rūšis: informacinis, navigacinis ir tranzakcinis.
     - **Informacinis ketinimas**: vartotojas ieško informacijos apie temą (pvz., „Kokie yra geriausi muziejai Paryžiuje?“).
     - **Navigacinis ketinimas**: vartotojas nori nukeliauti į tam tikrą svetainę ar puslapį (pvz., „Luvro muziejaus oficiali svetainė“).
     - **Tranzakcinis ketinimas**: vartotojas ketina atlikti veiksmą, tokią kaip skrydžio bilieto užsakymas ar pirkimas (pvz., „Užsakyti bilietą į Paryžių“).

2. **Konteksto suvokimas**:
   - Analizuojant vartotojo užklausos kontekstą galima tiksliau nustatyti jo ketinimą. Tai apima ankstesnes sąveikas, vartotojo pageidavimus ir dabartinės užklausos detales.

3. **Natūralios kalbos apdorojimas (NLP)**:
   - NLP metodai naudojami suprasti ir interpretuoti natūralų vartotojo kalbą. Tai apima subjektų atpažinimą, nuotaikos analizę ir užklausų parsinimą.

4. **Personalizavimas**:
   - Paieškos rezultatų pritaikymas vartotojo istorijai, pageidavimams ir grįžtamajam ryšiui pagerina paieškos aktualumą.

#### Praktinis pavyzdys: paieška su ketinimu kelionių agento programoje

Pažvelkime, kaip kelionių agento programa gali įgyvendinti paiešką su ketinimu.

1. **Vartotojo pageidavimų surinkimas**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Vartotojo ketinimo supratimas**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Konteksto suvokimas**
   ```python
   def analyze_context(query, user_history):
       # Sujunkite esamą užklausą su naudotojo istorija, kad suprastumėte kontekstą
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Rezultatų paieška ir pritaikymas**

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
       # Pavyzdinė paieškos logika informaciniam ketinimui
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Pavyzdinė paieškos logika navigaciniam ketinimui
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Pavyzdinė paieškos logika transakciniam ketinimui
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Pavyzdinė personalizavimo logika
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Grąžinti 10 geriausių personalizuotų rezultatų
   ```

5. **Naudojimo pavyzdys**

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

## 4. Kodo generavimas kaip įrankis

Kodo generavimo agentai naudoja DI modelius, kad rašytų ir vykdytų kodą, spręstų sudėtingas problemas ir automatizuotų užduotis.

### Kodo generavimo agentai

Kodo generavimo agentai naudoja generatyvius DI modelius, kad rašytų ir vykdytų kodą. Šie agentai gali spręsti sudėtingas problemas, automatizuoti užduotis ir suteikti vertingų įžvalgų generuodami bei vykdydami kodą įvairiomis programavimo kalbomis.

#### Praktiniai panaudojimai

1. **Automatinis kodo generavimas**: Generuoti kodo fragmentus specifinėms užduotims, tokioms kaip duomenų analizė, tinklalapių nuskaitymas ar mašininis mokymasis.
2. **SQL kaip RAG**: Naudoti SQL užklausas duomenims paieškai ir manipuliavimui iš duomenų bazių.
3. **Problemų sprendimas**: Kurti ir vykdyti kodą konkrečių problemų sprendimui, pavyzdžiui, optimizuoti algoritmus ar analizuoti duomenis.

#### Pavyzdys: Kodo generavimo agentas duomenų analizei

Įsivaizduokite, kad kuriate kodo generavimo agentą. Štai kaip jis gali veikti:

1. **Užduotis**: Analizuoti duomenų rinkinį, kad nustatytų tendencijas ir modelius.
2. **Veiksmai**:
   - Įkelti duomenų rinkinį į duomenų analizės įrankį.
   - Generuoti SQL užklausas duomenų filtravimui ir agregavimui.
   - Vykdyti užklausas ir gauti rezultatus.
   - Naudoti rezultatus vizualizacijoms ir įžvalgoms generuoti.
3. **Reikalaujami ištekliai**: Prieiga prie duomenų rinkinio, duomenų analizės įrankiai ir SQL galimybės.
4. **Patirtis**: Naudoti ankstesnių analizės rezultatų duomenis tikslumui ir aktualumui gerinti ateities analizės metu.

### Pavyzdys: Kodo generavimo agentas kelionių agentui

Šiame pavyzdyje kursime kodo generavimo agentą „Kelionių agentą“, kuris padės vartotojams planuoti keliones generuodamas ir vykdydamas kodą. Šis agentas gali tvarkyti užduotis, tokias kaip kelionių galimybių paieška, rezultatų filtravimas ir kelionės plano sudarymas naudojant generatyvią DI.

#### Kodo generavimo agento apžvalga

1. **Vartotojo pageidavimų rinkimas**: Surenka vartotojo įvestį, tokią kaip kelionės tikslas, datos, biudžetas ir pomėgiai.
2. **Kodo generavimas duomenų paieškai**: Generuoja kodo fragmentus informacijai apie skrydžius, viešbučius ir lankytinas vietas gauti.
3. **Generuoto kodo vykdymas**: Vykdo sugeneruotą kodą, kad gautų realaus laiko informaciją.
4. **Kelionės plano generavimas**: Apibendrina gautą informaciją į suasmenintą kelionės planą.
5. **Koregavimas pagal atsiliepimus**: Gaukia vartotojo atsiliepimus ir prireikus generuoja kodą iš naujo, kad patobulintų rezultatus.

#### Žingsnis po žingsnio įgyvendinimas

1. **Vartotojo pageidavimų rinkimas**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Kodo generavimas duomenų paieškai**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Pavyzdys: sugeneruoti kodą skrydžių paieškai pagal vartotojo pageidavimus
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Pavyzdys: sugeneruoti kodą viešbučių paieškai
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Generuoto kodo vykdymas**

   ```python
   def execute_code(code):
       # Vykdykite sugeneruotą kodą naudojant exec
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

4. **Kelionės plano generavimas**

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

5. **Koregavimas pagal atsiliepimus**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Koreguokite nuostatas pagal vartotojo atsiliepimus
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Atkurkite ir vykdykite kodą su atnaujintomis nuostatomis
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Aplinkos suvokimo ir samprotavimo panaudojimas

Remiantis lentelės schema, galima pagerinti užklausų generavimo procesą, įtraukiant aplinkos suvokimą ir samprotavimą.

Štai pavyzdys, kaip tai galima atlikti:

1. **Schemos supratimas**: Sistema supras lentelės schemą ir naudos šią informaciją užklausų generavimui pagrįsti.
2. **Koregavimas pagal atsiliepimus**: Sistema koreguos vartotojo pageidavimus pagal atsiliepimus ir spręs, kurie schemos laukai turi būti atnaujinti.
3. **Užklausų generavimas ir vykdymas**: Sistema generuos ir vykdys užklausas, kad gautų atnaujintus skrydžių ir viešbučių duomenis pagal naujus pageidavimus.

Čia yra atnaujinto Python kodo pavyzdys, kuriame įgyvendintos šios koncepcijos:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Pritaikyti nuostatas pagal vartotojo atsiliepimus
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Logika pagrįsta schema, skirta koreguoti kitas susijusias nuostatas
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Pasirinktinis logikos kodas, skirtas koreguoti nuostatas pagal schemą ir atsiliepimus
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Generuoti kodą skrydžių duomenims gauti pagal atnaujintas nuostatas
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Generuoti kodą viešbučių duomenims gauti pagal atnaujintas nuostatas
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simuliuoti kodo vykdymą ir grąžinti imituotus duomenis
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Generuoti kelionės maršrutą pagal skrydžius, viešbučius ir lankytinas vietas
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Schemos pavyzdys
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Naudojimo pavyzdys
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Iš naujo sugeneruoti ir vykdyti kodą su atnaujintomis nuostatomis
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Paaiškinimas – Rezervavimas pagal atsiliepimus

1. **Schemos suvokimas**: Žodynas `schema` apibrėžia, kaip reikia koreguoti pageidavimus pagal atsiliepimus. Jame yra laukeliai kaip `favorites` ir `avoid` su atitinkamais koregavimais.
2. **Pageidavimų koregavimas (`adjust_based_on_feedback` metodas)**: Šis metodas koreguoja pageidavimus pagal vartotojo atsiliepimus ir schemą.
3. **Koregavimas pagal aplinką (`adjust_based_on_environment` metodas)**: Šis metodas pritaiko koregavimus pagal schemą ir atsiliepimus.
4. **Užklausų generavimas ir vykdymas**: Sistema generuoja kodą atnaujintiems skrydžių ir viešbučių duomenims gauti pagal pakoreguotus pageidavimus ir simuliuoja šių užklausų vykdymą.
5. **Kelionės plano generavimas**: Sistema kuria atnaujintą kelionės planą pagal naujus skrydžių, viešbučių ir lankytinų vietų duomenis.

Padarius sistemą aplinkos suprantančią ir samprotuojančią remiantis schema, galima generuoti tikslesnes ir aktualias užklausas, kas lemia geresnes kelionių rekomendacijas ir suasmenintą vartotojo patirtį.

### SQL naudojimas kaip Retrieval-Augmented Generation (RAG) technika

SQL (Structured Query Language) yra galingas įrankis duomenų bazių sąveikai. Naudojamas kaip RAG dalis, SQL leidžia gauti aktualius duomenis iš duomenų bazių, kurie naudojami informuoti ir generuoti atsakymus ar veiksmus DI agentams. Pažiūrėkime, kaip SQL gali būti pritaikytas kaip RAG kelionių agento kontekste.

#### Pagrindinės sąvokos

1. **Duomenų bazės sąveika**:
   - SQL naudojamas duomenų bazių užklausoms, informacijai gauti ir duomenų manipuliavimui.
   - Pavyzdys: gauti skrydžių duomenis, viešbučių informaciją ir lankytinas vietas iš kelionių duomenų bazės.

2. **Integracija su RAG**:
   - SQL užklausos generuojamos pagal vartotojo įvestį ir pageidavimus.
   - Gautas duomenis naudojama suasmenintų rekomendacijų ar veiksmų kūrimui.

3. **Dinaminis užklausų generavimas**:
   - DI agentas generuoja dinamiškas SQL užklausas pagal kontekstą ir vartotojo poreikius.
   - Pavyzdys: pritaikyti SQL užklausas rezultatų filtravimui pagal biudžetą, datas ir pomėgius.

#### Panaudojimai

- **Automatinis kodo generavimas**: Kurti kodo fragmentus specifinėms užduotims.
- **SQL kaip RAG**: Naudoti SQL užklausas duomenų manipuliavimui.
- **Problemų sprendimas**: Kurti ir vykdyti kodą problemų sprendimui.

**Pavyzdys**:
duomenų analizės agentas:

1. **Užduotis**: Analizuoti duomenų rinkinį tendencijoms rasti.
2. **Žingsniai**:
   - Įkelti duomenų rinkinį.
   - Generuoti SQL užklausas duomenų filtravimui.
   - Vykdyti užklausas ir gauti rezultatus.
   - Generuoti vizualizacijas ir įžvalgas.
3. **Ištekliai**: Prieiga prie duomenų rinkinio, SQL gebėjimai.
4. **Patirtis**: Naudoti ankstesnius rezultatus ateities analizės gerinimui.

#### Praktinis pavyzdys: SQL naudojimas kelionių agento kontekste

1. **Vartotojo pageidavimų rinkimas**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **SQL užklausų generavimas**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **SQL užklausų vykdymas**

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

4. **Rekomendacijų generavimas**

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

#### Pavyzdinės SQL užklausos

1. **Skrydžių užklausa**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Viešbučių užklausa**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Lankytinų vietų užklausa**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Naudodami SQL kaip Retrieval-Augmented Generation (RAG) technikos dalį, DI agentai kaip „Kelionių agentas“ gali dinamiškai gauti ir naudoti aktualius duomenis, kad pateiktų tikslias ir suasmenintas rekomendacijas.

### Metakognicijos pavyzdys

Norėdami parodyti metakognicijos įgyvendinimą, sukursime paprastą agentą, kuris *atsispindi savo sprendimų priėmimo procese* spręsdamas problemą. Šiame pavyzdyje sukūrime sistemą, kur agentas bando optimizuoti viešbučio pasirinkimą, bet vėliau įvertina savo samprotavimą ir koreguoja strategiją, jei padaro klaidų ar pasirenka mažiau tinkamus variantus.

Tai simuliuosime paprastu pavyzdžiu, kai agentas vykdo viešbučių atranką pagal kainos ir kokybės derinį, bet jis „atsižvelgia“ į savo sprendimus ir atitinkamai juos koreguoja.

#### Kaip tai iliustruoja metakogniciją:

1. **Pradinis sprendimas**: Agentas pasirinkti pigiausią viešbutį, nesuprasdamas kokybės įtakos.
2. **Refleksija ir vertinimas**: Po pradinio pasirinkimo agentas patikrins, ar viešbutis buvo „blogas“ pasirinkimas pagal vartotojo atsiliepimus. Jei kokybė pasirodo per žema, agentas atsižvelgia į savo samprotavimą.
3. **Strategijos koregavimas**: Agentas keičia strategiją remdamasis refleksija ir pereina nuo „pigiausio“ prie „aukščiausios kokybės“, taip gerindamas sprendimų priėmimą ateityje.

Štai pavyzdys:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Saugo anksčiau pasirinktas viešnagės vietas
        self.corrected_choices = []  # Saugo patikslintus pasirinkimus
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Galimos strategijos

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
        # Tarkime, kad turime vartotojo atsiliepimą, kuris nurodo, ar paskutinis pasirinkimas buvo geras ar ne
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Koreguoja strategiją, jei ankstesnis pasirinkimas buvo nepasitenkinimą keliantis
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

# Simuliuoja viešbučių sąrašą (kaina ir kokybė)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Sukuria agentą
agent = HotelRecommendationAgent()

# 1 žingsnis: Agentas rekomenduoja viešbutį naudodamas „pigiausios“ strategiją
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# 2 žingsnis: Agentas apmąsto pasirinkimą ir prireikus koreguoja strategiją
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# 3 žingsnis: Agentas vėl rekomenduoja, šį kartą naudodamas pakoreguotą strategiją
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Agentų metakognicijos gebėjimai

Svarbiausia yra agento gebėjimas:
- Vertinti ankstesnius sprendimus ir sprendimų priėmimo procesą.
- Koreguoti strategiją remdamasis šia refleksija, tai yra metakognicijos veikimas.

Tai yra paprasta metakognicijos forma, kai sistema gali koreguoti savo samprotavimo procesą remdamasi vidiniu grįžtamuoju ryšiu.

### Išvados

Metakognicija yra galingas įrankis, galintis žymiai pagerinti DI agentų galimybes. Įtraukdami metakognityvinius procesus galite kurti agentus, kurie yra išmanesni, prisitaikantys ir efektyvūs. Naudokitės papildomais ištekliais, kad gilintumėtės į įdomų metakognicijos pasaulį DI agentų kontekste.

### Turite daugiau klausimų apie metakognicijos dizaino modelį?

Prisijunkite prie [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), susitikite su kitais mokiniais, dalyvaukite biuro valandose ir gaukite atsakymus į savo klausimus apie DI agentus.

## Ankstesnė pamoka

[Multi-Agent Design Pattern](../08-multi-agent/README.md)

## Kitoji pamoka

[AI Agents in Production](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsisakymas nuo atsakomybės**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatizuotos vertimo priemonės gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Kritinei informacijai rekomenduojame pasitelkti profesionalų žmogaus vertimą. Neatsakome už bet kokius nesusipratimus ar neteisingą interpretavimą, kilusius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->