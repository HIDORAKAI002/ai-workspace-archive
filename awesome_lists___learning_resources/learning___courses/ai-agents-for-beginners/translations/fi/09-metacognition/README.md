[![Multi-agenttisuunnittelu](../../../translated_images/fi/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Napsauta yllä olevaa kuvaa katsoaksesi tämän oppitunnin videon)_
# Metakognitio tekoälyagenteissa

## Johdanto

Tervetuloa oppitunnille tekoälyagenttien metakognitiosta! Tämä luku on suunnattu aloittelijoille, jotka ovat kiinnostuneita siitä, miten tekoälyagentit voivat pohtia omia ajatteluprosessejaan. Oppitunnin lopussa ymmärrät keskeiset käsitteet ja saat käytännön esimerkkejä metakognition soveltamisesta tekoälyagenttien suunnittelussa.

## Oppimistavoitteet

Oppitunnin suorittamisen jälkeen osaat:

1. Ymmärtää päättelysilmukoiden merkityksen agenttien määrittelyissä.
2. Käyttää suunnittelu- ja arviointitekniikoita itsekorjautuvien agenttien tukemiseksi.
3. Luoda omia agenteja, jotka kykenevät manipuloimaan koodia tehtävien suorittamiseksi.

## Johdatus metakognitioon

Metakognitio viittaa korkeamman tason kognitiivisiin prosesseihin, jotka sisältävät ajattelun omasta ajattelusta. Tekoälyagenttien kohdalla tämä tarkoittaa kykyä arvioida ja säätää toimintaansa itseymmärryksen ja aiempien kokemusten perusteella. Metakognitio, eli "ajattelu ajattelusta", on tärkeä käsite agenttiperustaisten tekoälyjärjestelmien kehityksessä. Siihen kuuluu tekoälyjärjestelmien tietoisuus omista sisäisistä prosesseistaan sekä kyky valvoa, säädellä ja mukauttaa käyttäytymistään vastaavasti. Samalla tavalla kuin teemme, kun tulkitsemme tilannetta tai tarkastelemme ongelmaa. Tämä itseymmärrys voi auttaa tekoälyjärjestelmiä tekemään parempia päätöksiä, tunnistamaan virheitä ja parantamaan suoritustaan ajan myötä – jälleen yhdistäen Turingin testiin ja keskusteluun siitä, ottaako tekoäly vallan.

Agenttiperustaisissa tekoälyjärjestelmissä metakognitio voi auttaa ratkaisemaan useita haasteita, kuten:
- Läpinäkyvyys: Varmistaa, että tekoälyjärjestelmät voivat selittää päättelynsä ja päätöksensä.
- Päättely: Parantaa tekoälyjärjestelmien kykyä yhdistää tietoa ja tehdä perusteltuja päätöksiä.
- Sopeutuminen: Mahdollistaa tekoälyjärjestelmien mukautumisen uusiin ympäristöihin ja muuttuviin oloihin.
- Havainto: Parantaa tekoälyjärjestelmien tarkkuutta ympäristöstään kerätyn datan tunnistamisessa ja tulkinnassa.

### Mitä metakognitio on?

Metakognitio, eli "ajattelu ajattelusta", on korkeamman tason kognitiivinen prosessi, joka sisältää itseymmärryksen ja oman kognitioprosessien itseohjauksen. Tekoälyn alalla metakognitio antaa agenteille kyvyn arvioida ja mukauttaa strategioitaan ja toimintaansa, mikä johtaa parempiin ongelmanratkaisu- ja päätöksentekokykyihin. Ymmärtämällä metakognition voit suunnitella tekoälyagentteja, jotka eivät ole ainoastaan älykkäämpiä vaan myös joustavampia ja tehokkaampia. Aidossa metakognitiossa tekoäly perustelee nimenomaan omaa päättelyään.

Esimerkki: ”Priorisoin edullisempia lentoja, koska… Voi olla, että jätän huomiotta suorat lennot, joten tarkistan sen uudelleen.”.
Seuraa kuinka tai miksi se valitsi tietyn reitin.
- Huomaa tehneensä virheitä, koska se luotti liikaa käyttäjän viimekertaisiin mieltymyksiin, ja muokkaa päätöksentekostrategiaansa, ei vain lopullista suositusta.
- Tunnistaa kaavoja kuten: ”Aina kun kuulen käyttäjän mainitsevan ’liian ruuhkaista’, minun ei pitäisi ainoastaan poistaa tiettyjä nähtävyyksiä, vaan myös pohtia, että tapani valita ’parhaat nähtävyydet’ on virheellinen, jos arvotan aina suosituimpien mukaan.”

### Metakognition merkitys tekoälyagenteissa

Metakognitiolla on tärkeä rooli tekoälyagenttien suunnittelussa monesta syystä:

![Metakognition merkitys](../../../translated_images/fi/importance-of-metacognition.b381afe9aae352f7.webp)

- Itsetutkiskelu: Agentit voivat arvioida omaa suoritustaan ja tunnistaa kehityskohteita.
- Sopeutumiskyky: Agentit voivat muuttaa strategioitaan aiempien kokemusten ja muuttuvien olosuhteiden perusteella.
- Virheiden korjaus: Agentit voivat havaita ja korjata virheitä itsenäisesti, mikä johtaa tarkempiin tuloksiin.
- Resurssien hallinta: Agentit voivat optimoida resurssien, kuten ajan ja laskentatehon, käyttöä suunnittelemalla ja arvioimalla toimintaansa.

## Tekoälyagentin osat

Ennen kuin sukelletaan metakognitiivisiin prosesseihin, on tärkeää ymmärtää tekoälyagentin perusosat. Tekoälyagentti koostuu tyypillisesti:

- Persona: Agentin persoonallisuus ja ominaisuudet, jotka määrittävät, miten se kommunikoi käyttäjien kanssa.
- Työkalut: Agentin käytettävissä olevat kyvyt ja toiminnot.
- Taidot: Agentin hallussa oleva tieto ja asiantuntemus.

Nämä osat toimivat yhdessä muodostaen "asiantuntijayksikön", joka pystyy suorittamaan erityisiä tehtäviä.

**Esimerkki**:
Ajatellaan matkanjärjestäjää, agenttipalvelua, joka ei pelkästään suunnittele lomasi, vaan myös mukauttaa reittiään reaaliaikaisten tietojen ja aiempien asiakkaiden matkaelämyksien perusteella.

### Esimerkki: Metakognitio matkanjärjestäjäpalvelussa

Kuvittele, että suunnittelet tekoälyllä toimivaa matkanjärjestäjäpalvelua. Tämä agentti, "Matkanjärjestäjä", auttaa käyttäjiä lomien suunnittelussa. Metakognition ottamiseksi mukaan Matkanjärjestäjän täytyy arvioida ja säätää toimintaansa itseymmärryksen ja aiempien kokemusten pohjalta. Näin metakognitio voisi näkyä:

#### Nykyinen tehtävä

Tehtävänä on auttaa käyttäjää suunnittelemaan matka Pariisiin.

#### Askeleet tehtävän suorittamiseen

1. **Käyttäjän mieltymysten kerääminen**: Kysy käyttäjältä matkustuspäivät, budjetti, kiinnostuksenkohteet (esim. museot, ruoka, shoppailu) ja mahdolliset erityisvaatimukset.
2. **Tietojen hakeminen**: Etsi lentoja, majoituksia, nähtävyyksiä ja ravintoloita, jotka vastaavat käyttäjän mieltymyksiä.
3. **Suositusten luominen**: Tarjoa henkilökohtainen matkasuunnitelma lentotiedoilla, hotellivarauksilla ja ehdotetuilla aktiviteeteilla.
4. **Säädä palautteen perusteella**: Pyydä käyttäjältä palautetta suosituksista ja tee tarvittavat muutokset.

#### Tarvittavat resurssit

- Pääsy lento- ja hotellivaraukset tietokantoihin.
- Tiedot Pariisin nähtävyyksistä ja ravintoloista.
- Käyttäjäpalautteet aiemmista vuorovaikutuksista.

#### Kokemus ja itsetutkiskelu

Matkanjärjestäjä käyttää metakognitiota arvioidakseen suoritustaan ja oppiakseen aiemmista kokemuksista. Esimerkiksi:

1. **Käyttäjäpalautteen analysointi**: Matkanjärjestäjä tarkastelee käyttäjäpalautteita selvittääkseen, mitkä suositukset onnistuivat ja mitkä eivät. Se säätää tulevia ehdotuksiaan niiden perusteella.
2. **Sopeutumiskyky**: Jos käyttäjä on aiemmin maininnut välttelevänsä ruuhkaisia paikkoja, Matkanjärjestäjä välttää suosittelemasta suosittuja turistinähtävyyksiä ruuhka-aikoina jatkossa.
3. **Virheiden korjaus**: Jos Matkanjärjestäjä teki aiemmassa varauksessa virheen, kuten ehdotti täysin varattua hotellia, se oppii tarkistamaan saatavuuden perusteellisemmin ennen suositusten tekemistä.

#### Käytännön kehittäjäesimerkki

Tässä on yksinkertaistettu esimerkki siitä, miltä Matkanjärjestäjän koodi voisi näyttää metakognition sisällyttämisen yhteydessä:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Etsi lentoja, hotelleja ja nähtävyyksiä mieltymysten perusteella
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
        # Analysoi palautetta ja säädä tulevia suosituksia
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Esimerkkikäyttö
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

#### Miksi metakognitio on tärkeää

- **Itsetutkiskelu**: Agentit voivat analysoida suoritustaan ja löytää parannuskohteita.
- **Sopeutumiskyky**: Agentit voivat muuttaa strategioitaan palautteen ja muuttuvien olosuhteiden perusteella.
- **Virheiden korjaus**: Agentit voivat havaita ja korjata virheitä itsenäisesti.
- **Resurssien hallinta**: Agentit voivat optimoida resurssien käyttöä, kuten aikaa ja laskentatehoa.

Metakognition avulla Matkanjärjestäjä pystyy tarjoamaan käyttäjälle entistä henkilökohtaisempia ja täsmällisempiä matkasuosituksia, parantaen näin kokonaiskäyttäjäkokemusta.

---

## 2. Suunnittelu agenteissa

Suunnittelu on keskeinen osa tekoälyagentin käyttäytymistä. Se tarkoittaa tarvittavien askelten hahmottamista tavoitteen saavuttamiseksi ottaen huomioon nykytila, resurssit ja mahdolliset esteet.

### Suunnittelun osat

- **Nykyinen tehtävä**: Määritä tehtävä selkeästi.
- **Tehtävän suorittamisen askeleet**: Pilko tehtävä hallittaviin osiin.
- **Tarvittavat resurssit**: Tunnista vaaditut resurssit.
- **Kokemus**: Hyödynnä aiempia kokemuksia suunnittelun tukena.

**Esimerkki**:
Tässä ovat askeleet, jotka Matkanjärjestäjän täytyy ottaa auttaakseen käyttäjää suunnittelemaan matkansa tehokkaasti:

### Askeleet Matkanjärjestäjälle

1. **Käyttäjän mieltymysten kerääminen**
   - Kysy käyttäjältä tietoja matkustuspäivistä, budjetista, kiinnostuksenkohteista ja mahdollisista erityisvaatimuksista.
   - Esimerkkejä: "Milloin aiot matkustaa?" "Mikä on budjettisi?" "Mitkä aktiviteetit kiinnostavat lomallasi?"

2. **Tietojen hakeminen**
   - Etsi käyttäjän mieltymyksiin sopivia matkavaihtoehtoja.
   - **Lennot**: Etsi käyttäjän budjetin ja aikataulun mukaisia lentoja.
   - **Majoitus**: Löydä hotellit tai vuokra-asunnot, jotka vastaavat käyttäjän toivomia sijainteja, hintoja ja palveluita.
   - **Nähtävyydet ja ravintolat**: Tunnista suosittuja nähtävyyksiä, aktiviteetteja ja ruokailupaikkoja, jotka sopivat käyttäjän kiinnostuksiin.

3. **Suositusten laatiminen**
   - Kokoa haetut tiedot henkilökohtaiseksi matkasuunnitelmaksi.
   - Tarjoa yksityiskohtia lentovaihtoehdoista, hotellivarauksista ja ehdotetuista aktiviteeteista, räätälöiden suositukset käyttäjän mieltymysten mukaan.

4. **Matkasuunnitelman esittely käyttäjälle**
   - Jaa ehdotettu matkasuunnitelma käyttäjän tarkasteltavaksi.
   - Esimerkki: "Tässä on ehdotus matkasuunnitelmaksi Pariisiin. Se sisältää lentotiedot, hotellivaraukset sekä listan suositelluista aktiviteeteista ja ravintoloista. Kerro ajatuksesi!"

5. **Palautteen kerääminen**
   - Kysy käyttäjän mielipidettä ehdotuksesta.
   - Esimerkkejä: "Pidätkö lentovaihtoehdoista?" "Sopiiko hotelli tarpeisiisi?" "Haluatko lisätä tai poistaa aktiviteetteja?"

6. **Suunnitelman säätäminen palautteen perusteella**
   - Muokkaa matkasuunnitelmaa käyttäjän antaman palautteen mukaisesti.
   - Tee tarvittavat muutokset lentoihin, majoitukseen ja aktiviteetteihin käyttäjän mieltymysten paremmaksi vastaamiseksi.

7. **Lopullinen vahvistus**
   - Esitä päivitetty matkasuunnitelma käyttäjälle lopullista vahvistusta varten.
   - Esimerkki: "Olen tehnyt muutokset palautteesi perusteella. Tässä päivitetty suunnitelma. Näyttääkö kaikki hyvältä?"

8. **Varausten tekeminen ja vahvistaminen**
   - Kun käyttäjä hyväksyy suunnitelman, tee varaukset lennoista, majoituksista ja mahdollisista valmiiksi varatuista aktiviteeteista.
   - Lähetä vahvistustiedot käyttäjälle.

9. **Jatkuva tuki**
   - Ole käytettävissä auttamaan käyttäjää muutosten tai lisäpyyntöjen kanssa ennen matkaa ja sen aikana.
   - Esimerkki: "Jos tarvitset lisäapua matkasi aikana, ota rohkeasti yhteyttä milloin tahansa!"

### Esimerkkikeskustelu

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

# Esimerkki käytöstä buukkauksessa pyynnön sisällä
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

## 3. Korjaava RAG-järjestelmä

Aloitetaan ensin ymmärtämällä ero RAG-työkalun ja ennakoivan kontekstin latauksen välillä.

![RAG vs Kontextin lataus](../../../translated_images/fi/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

RAG yhdistää haun ja generatiivisen mallin. Kun pyyntö tehdään, hakujärjestelmä hakee asiaankuuluvia dokumentteja tai tietoja ulkoisesta lähteestä, ja tätä haettua tietoa käytetään generatiivisen mallin syötteen täydentämiseen. Tämä auttaa mallia tuottamaan tarkempia ja kontekstuaalisesti relevantteja vastauksia.

RAG-järjestelmässä agentti hakee relevantteja tietoja tietovarastosta ja käyttää niitä luodakseen sopivia vastauksia tai toimia.

### Korjaava RAG-lähestymistapa

Korjaava RAG-lähestymistapa keskittyy käyttämään RAG-tekniikoita virheiden korjaamiseen ja tekoälyagenttien tarkkuuden parantamiseen. Tämä sisältää:

1. **Kehote-tekniikka**: Käytetään erityisiä kehotteita ohjaamaan agenttia hakemaan olennaista tietoa.
2. **Työkalu**: Toteutetaan algoritmeja ja mekanismeja, jotka mahdollistavat agentin arvioida haetun tiedon olennaisuuden ja luoda tarkkoja vastauksia.
3. **Arviointi**: Jatkuvasti arvioida agentin suoritusta ja tehdä säätöjä tarkan ja tehokkaan toiminnan varmistamiseksi.

#### Esimerkki: Korjaava RAG hakuprosessissa

Harkitaan hakutoimintaista agenttia, joka hakee tietoa verkosta vastatakseen käyttäjän kysymyksiin. Korjaava RAG-lähestymistapa voisi sisältää:

1. **Kehote-tekniikka**: Muodostaa hakukyselyjä käyttäjän antaman syötteen perusteella.
2. **Työkalu**: Käyttää luonnollisen kielen käsittelyä ja koneoppimisen algoritmeja hakutulosten arviointiin ja suodattamiseen.
3. **Arviointi**: Analysoi käyttäjäpalautetta tunnistaakseen ja korjatakseen epätarkkuuksia haetussa tiedossa.

### Korjaava RAG Matkanjärjestäjän tapauksessa

Korjaava RAG (Retrieval-Augmented Generation) parantaa tekoälyn kykyä hakea ja luoda tietoa samalla korjaten epätarkkuuksia. Katsotaan, miten Matkanjärjestäjä voi käyttää korjaavaa RAG-lähestymistapaa antaakseen tarkempia ja osuvampia matkasuosituksia.

Se sisältää:

- **Kehote-tekniikka:** Käytetään erityisiä kehotteita ohjaamaan agenttia hakemaan asiallista tietoa.
- **Työkalu:** Toteutetaan algoritmeja, jotka arvioivat haetun tiedon olennaisuuden ja vastaavat tarkasti.
- **Arviointi:** Jatkuvasti arvioida agentin suoritusta ja tehdä tarvittavia säätöjä parantaakseen tarkkuutta ja tehokkuutta.

#### Vaiheet korjaavan RAG:n toteuttamiseksi Matkanjärjestäjällä

1. **Alkuperäinen käyttäjävuorovaikutus**
   - Matkanjärjestäjä kerää käyttäjän alkuperäiset mieltymykset, kuten kohde, matkustuspäivät, budjetti ja kiinnostuksenkohteet.
   - Esimerkki:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Tietojen haku**
   - Matkanjärjestäjä hakee tietoa lennoista, majoituksista, nähtävyyksistä ja ravintoloista käyttäjän mieltymysten perusteella.
   - Esimerkki:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Alkuperäisten suositusten luominen**
   - Matkanjärjestäjä käyttää haettua tietoa laatiakseen henkilökohtaisen matkasuunnitelman.
   - Esimerkki:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Käyttäjäpalautteen kerääminen**
   - Matkanjärjestäjä pyytää käyttäjältä palautetta alkuperäisistä suosituksista.
   - Esimerkki:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Korjaava RAG-prosessi**
   - **Kehote-tekniikka**: Matkanjärjestäjä muodostaa uusia hakukyselyjä käyttäjäpalautteen perusteella.
     - Esimerkki:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Työkalu**: Matkanjärjestäjä käyttää algoritmeja lajitellakseen ja suodatakseen uusia hakutuloksia, korostaen relevanssia käyttäjäpalautteen pohjalta.
     - Esimerkki:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Arviointi**: Matkanjärjestäjä arvioi jatkuvasti suositustensa relevanssia ja tarkkuutta analysoimalla käyttäjäpalautetta ja tekemällä tarvittavia muutoksia.
     - Esimerkki:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Käytännön esimerkki

Tässä on yksinkertaistettu Python-koodi, joka sisältää korjaavan RAG-lähestymistavan Matkanjärjestäjällä:

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

# Esimerkki käyttö
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

### Ennakoiva kontekstin lataus
Ennakko-ominaisen kontekstin lataaminen tarkoittaa olennaisen kontekstin tai taustatiedon lataamista malliin ennen kyselyn käsittelyä. Tämä tarkoittaa, että malli pääsee käsiksi tähän tietoon alusta alkaen, mikä voi auttaa sitä tuottamaan paremmin informoituja vastauksia ilman, että tietoja tarvitsee hakea lisää prosessin aikana.

Tässä on yksinkertaistettu esimerkki siitä, miltä ennakko-ominaisen kontekstin lataus voisi näyttää matkanjärjestäjän sovelluksessa Pythonilla:

```python
class TravelAgent:
    def __init__(self):
        # Lataa suosittuja matkakohteita ja niiden tiedot etukäteen
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Hae matkakohteen tiedot esiladatuista konteksteista
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Esimerkki käytöstä
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Selitys

1. **Alustus (`__init__`-metodi)**: `TravelAgent`-luokka esilataa sanakirjan, joka sisältää tietoa suosituista matkakohteista kuten Pariisi, Tokio, New York ja Sydney. Tämä sanakirja sisältää yksityiskohtia kuten maan, valuutan, kielen ja tärkeimmät nähtävyydet kullekin kohteelle.

2. **Tiedon hakeminen (`get_destination_info`-metodi)**: Kun käyttäjä kysyy tietoa tietystä matkakohteesta, `get_destination_info`-metodi hakee asiaankuuluvat tiedot ennalta ladatusta kontekstisanakirjasta.

Ennakkoon ladatun kontekstin avulla matkanjärjestäjän sovellus voi vastata nopeasti käyttäjän kyselyihin ilman, että sen tarvitsee hakea tätä tietoa ulkoisesta lähteestä reaaliajassa. Tämä tekee sovelluksesta tehokkaamman ja reagoivamman.

### Suunnitelman aloittaminen tavoitteella ennen iteraatiota

Suunnitelman aloittaminen tavoitteella tarkoittaa aloittamista selkeällä päämäärällä tai halutulla lopputuloksella mielessä. Määrittelemällä tavoite etukäteen, malli voi käyttää sitä ohjenuorana koko iteroivan prosessin ajan. Tämä auttaa varmistamaan, että jokainen iteraatio vie lähemmäs haluttua lopputulosta, mikä tekee prosessista tehokkaamman ja kohdennetumman.

Tässä on esimerkki siitä, miten voit aloittaa matkasuunnitelman tavoitteella ennen iteraatiota matkanjärjestäjälle Pythonilla:

### Tilanne

Matkanjärjestäjä haluaa suunnitella räätälöidyn loman asiakkaalleen. Tavoitteena on luoda matkaohjelma, joka maksimoi asiakkaan tyytyväisyyden ottaen huomioon hänen mieltymyksensä ja budjettinsa.

### Vaiheet

1. Määritä asiakkaan mieltymykset ja budjetti.
2. Aloita alkuperäinen suunnitelma näiden mieltymysten pohjalta.
3. Iteroi suunnitelmaa parantaen sitä asiakkaan tyytyväisyyttä optimoiden.

#### Python-koodi

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

# Esimerkki käyttö
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

#### Koodin selitys

1. **Alustus (`__init__`-metodi)**: `TravelAgent`-luokka alustetaan listalla mahdollisista matkakohteista, joilla on ominaisuuksia kuten nimi, hinta ja aktiviteettityyppi.

2. **Suunnitelman aloittaminen (`bootstrap_plan`-metodi)**: Tämä metodi luo alkuperäisen matkasuunnitelman asiakkaan mieltymysten ja budjetin perusteella. Se käy läpi kohdelistan ja lisää kohteita suunnitelmaan, jos ne vastaavat asiakkaan mieltymyksiä ja mahtuvat budjettiin.

3. **Mieltymysten vertailu (`match_preferences`-metodi)**: Tämä metodi tarkistaa, vastaako kohde asiakkaan mieltymyksiä.

4. **Suunnitelman iterointi (`iterate_plan`-metodi)**: Tämä metodi tarkentaa alkuperäistä suunnitelmaa yrittämällä korvata kunkin kohteen suunnitelmassa paremmalla vaihtoehdolla asiakkaan mieltymykset ja budjettirajoitteet huomioiden.

5. **Kustannusten laskenta (`calculate_cost`-metodi)**: Tämä metodi laskee nykyisen suunnitelman kokonaiskustannukset, mukaan lukien mahdollinen uusi kohde.

#### Esimerkkikäyttö

- **Alkuperäinen suunnitelma**: Matkanjärjestäjä luo alkuperäisen suunnitelman ottaen huomioon asiakkaan kiinnostuksen nähtävyyksiin ja $2000 budjetin.
- **Tarkennettu suunnitelma**: Matkanjärjestäjä iteroi suunnitelmaa optimoiden asiakkaan mieltymyksiä ja budjettia.

Aloittamalla suunnitelma selkeällä tavoitteella (esim. asiakkaan tyytyväisyyden maksimointi) ja iteratiivisesti tarkentamalla sitä, matkanjärjestäjä pystyy luomaan asiakkaalle räätälöidyn ja optimoidun matkaohjelman. Tämä lähestymistapa varmistaa, että suunnitelma vastaa asiakkaan mieltymyksiä ja budjettia alusta alkaen ja paranee jokaisen iteraation myötä.

### LLM:n hyödyntäminen uudelleenjärjestämiseen ja pisteyttämiseen

Suuria kielimalleja (LLM) voidaan käyttää uudelleenjärjestämiseen ja pisteyttämiseen arvioimalla haettujen dokumenttien tai tuotettujen vastausten relevanttiutta ja laatua. Näin se toimii:

**Haku:** Alkuperäinen hakuvaihe noutaa joukon ehdokasdokumentteja tai vastauksia kyselyn perusteella.

**Uudelleenjärjestäminen:** LLM arvioi nämä ehdokkaat ja uudelleenjärjestää ne niiden relevanssin ja laadun perusteella. Tämä vaihe varmistaa, että olennaisin ja laadukkain tieto esitetään ensin.

**Pisteytys:** LLM antaa pisteet jokaiselle ehdokkaalle, jotka heijastavat niiden relevanssia ja laatua. Tämä auttaa valitsemaan parhaan vastauksen tai dokumentin käyttäjälle.

Hyödyntämällä LLM:iä uudelleenjärjestämiseen ja pisteyttämiseen järjestelmä pystyy tarjoamaan tarkempaa ja kontekstuaalisesti relevantimpaa tietoa, mikä parantaa käyttäjäkokemusta.

Tässä on esimerkki siitä, miten matkanjärjestäjä voisi käyttää suurta kielimallia (LLM) matkakohteiden uudelleenjärjestämiseen ja pisteyttämiseen käyttäjän mieltymysten perusteella Pythonissa:

#### Tilanne - Matkailu mieltymysten perusteella

Matkanjärjestäjä haluaa suositella parhaita matkakohteita asiakkaalleen hänen mieltymystensä perusteella. LLM auttaa uudelleenjärjestämään ja pisteyttämään kohteet, jotta esitetään oleellisimmat vaihtoehdot.

#### Vaiheet:

1. Kerää käyttäjän mieltymykset.
2. Hae lista mahdollisista matkakohteista.
3. Käytä LLM:ää uudelleenjärjestämään ja pisteyttämään kohteet käyttäjän mieltymysten mukaan.

Tässä on, miten voit päivittää edellisen esimerkin käyttämään Azure OpenAI -palveluita:

#### Vaatimukset

1. Sinulla tulee olla Azure-tilaus.
2. Luo Azure OpenAI -resurssi ja hanki API-avain.

#### Esimerkki Python-koodi

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Luo kehotus Azure OpenAI:lle
        prompt = self.generate_prompt(preferences)
        
        # Määritä pyynnön otsikot ja sisältö
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Kutsu Azure OpenAI -APIa saadaksesi uudelleenarvioidut ja pisteytetyt kohteet
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Poimi ja palauta suositukset
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

# Esimerkin käyttö
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

#### Koodin selitys - Preference Booker

1. **Alustus**: `TravelAgent`-luokka alustetaan listalla mahdollisia matkakohteita, joilla on ominaisuuksia kuten nimi ja kuvaus.

2. **Suositusten hakeminen (`get_recommendations`-metodi)**: Tämä metodi luo kehotteen Azure OpenAI -palvelua varten käyttäjän mieltymysten perusteella ja tekee HTTP POST -pyynnön Azure OpenAI API:lle saadakseen uudelleenjärjestetyt ja pisteytetyt kohteet.

3. **Kehotteen luominen (`generate_prompt`-metodi)**: Tämä metodi rakentaa kehotteen Azure OpenAI:lle, joka sisältää käyttäjän mieltymykset ja listan kohteista. Kehote ohjaa mallia uudelleenjärjestämään ja pisteyttämään kohteet annettujen mieltymysten mukaisesti.

4. **API-kutsu**: `requests`-kirjastoa käytetään tekemään HTTP POST -pyyntö Azure OpenAI API -päätepisteeseen. Vastauksessa on uudelleenjärjestetyt ja pisteytetyt kohteet.

5. **Esimerkkikäyttö**: Matkanjärjestäjä kerää käyttäjän mieltymyksiä (esim. kiinnostus nähtävyyksiin ja monipuoliseen kulttuuriin) ja käyttää Azure OpenAI -palvelua saadakseen uudelleenjärjestetyt ja pisteytetyt suositukset matkakohteista.

Muista korvata `your_azure_openai_api_key` omalla Azure OpenAI API -avaimellasi ja `https://your-endpoint.com/...` todellisella Azure OpenAI -päätepisteen URL-osoitteella.

Hyödyntämällä LLM:ää uudelleenjärjestämiseen ja pisteyttämiseen matkanjärjestäjä voi tarjota asiakkaille henkilökohtaisempia ja relevantimpia matkasuosituksia, parantaen heidän kokonaiskokemustaan.

### RAG: Kehotekniikka vs Työkalu

Retrieval-Augmented Generation (RAG) voi olla sekä kehotekniikka että työkalu tekoälyagenttien kehityksessä. Erottelun ymmärtäminen voi auttaa sinua hyödyntämään RAG:ia tehokkaammin projekteissasi.

#### RAG kehotekniikkana

**Mikä se on?**

- Kehotekniikkana RAG tarkoittaa erityisten kyselyjen tai kehotteiden muotoilua, jotka ohjaavat oleellisen tiedon hakua suuresta tietoaineistosta tai tietokannasta. Tätä tietoa käytetään sitten vastausten tai toimintojen tuottamiseen.

**Miten se toimii:**

1. **Kehotteen luominen**: Laadi hyvin jäsenneltyjä kehotteita tai kyselyjä tehtävän tai käyttäjän syötteen perusteella.
2. **Tiedon haku**: Käytä kehotteita etsimään olennaista tietoa olemassa olevasta tietokannasta tai aineistosta.
3. **Vasteen tuottaminen**: Yhdistä haettu tieto generatiivisiin tekoälymalleihin kattavan ja johdonmukaisen vastauksen tuottamiseksi.

**Esimerkki matkanjärjestäjässä**:

- Käyttäjän syöte: ”Haluan käydä museoissa Pariisissa.”
- Kehote: ”Löydä Pariisin parhaat museot.”
- Haettu tieto: Tietoa Louvre-museosta, Musée d’Orsaysta jne.
- Tuotettu vastaus: ”Tässä on joitakin Pariisin parhaista museoista: Louvre, Musée d’Orsay ja Centre Pompidou.”

#### RAG työkaluna

**Mikä se on?**

- Työkaluna RAG on integroitunut järjestelmä, joka automatisoi haun ja generoinnin prosessit, helpottaen kehittäjiä toteuttamaan monimutkaisia tekoälytoimintoja ilman, että jokaista kyselyä varten tarvitsee manuaalisesti laatia kehotteita.

**Miten se toimii:**

1. **Integraatio**: Upota RAG tekoälyagentin arkkitehtuuriin, jolloin se hoitaa haun ja generoinnin automaattisesti.
2. **Automaatio**: Työkalu hallinnoi koko prosessia, käyttäjän syötteen vastaanottamisesta loppuvastauksen tuottamiseen ilman erillisiä kehotteita.
3. **Tehokkuus**: Parantaa agentin suorituskykyä virtaviivaistamalla haun ja generoinnin, mahdollistaen nopeammat ja tarkemmat vastaukset.

**Esimerkki matkanjärjestäjässä**:

- Käyttäjän syöte: ”Haluan käydä museoissa Pariisissa.”
- RAG-työkalu: Hakee automaattisesti tietoa museoista ja tuottaa vastauksen.
- Tuotettu vastaus: ”Tässä on joitakin Pariisin parhaista museoista: Louvre, Musée d’Orsay ja Centre Pompidou.”

### Vertailu

| Ominaisuus             | Kehotekniikka                                      | Työkalu                                              |
|------------------------|---------------------------------------------------|-----------------------------------------------------|
| **Manuaalinen vs Automaattinen** | Manuaalinen kehotteiden laatiminen jokaiselle kyselylle. | Automaattinen prosessi haulle ja generoinnille.     |
| **Kontrolli**           | Tarjoaa enemmän kontrollia hakuprosessiin.        | Virtaviivaistaa ja automatisoi haun sekä generoinnin. |
| **Joustavuus**          | Mahdollistaa räätälöidyt kehotteet erityistarpeisiin. | Tehokkaampi suurille toteutuksille.                  |
| **Monimutkaisuus**      | Vaatii kehotteiden laatimista ja hienosäätöä.     | Helppo integroida tekoälyagentin arkkitehtuuriin.   |

### Käytännön esimerkit

**Kehotekniikan esimerkki:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Työkalun esimerkki:**

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

### Relevanttiuden arviointi

Relevanttiuden arviointi on keskeinen osa tekoälyagentin suorituskykyä. Se varmistaa, että agentin hakema ja tuottama tieto on käyttäjälle sopivaa, tarkkaa ja hyödyllistä. Tarkastellaan, miten arvioida relevanttiutta tekoälyagenteissa käytännön esimerkkien ja menetelmien avulla.

#### Keskeiset käsitteet relevanttiuden arvioinnissa

1. **Kontekstitietoisuus**:
   - Agentin täytyy ymmärtää käyttäjän kyselyn konteksti hakiakseen ja tuottaakseen relevanttia tietoa.
   - Esimerkki: Jos käyttäjä kysyy ”parhaat ravintolat Pariisissa”, agentin tulisi ottaa huomioon käyttäjän mieltymykset, kuten ruokalaji ja budjetti.

2. **Tarkkuus**:
   - Agentin antaman tiedon tulee olla faktuaalisesti oikeaa ja ajantasaista.
   - Esimerkki: Suositella tällä hetkellä avoimia ravintoloita, joilla on hyvät arvostelut, ei vanhentuneita tai suljettuja vaihtoehtoja.

3. **Käyttäjän aikomus**:
   - Agentin tulee päätellä käyttäjän tarkoitus kyselyn takana tarjotakseen osuvimman tiedon.
   - Esimerkki: Jos käyttäjä kysyy ”budjettiystävälliset hotellit”, agentin tulee priorisoida edulliset vaihtoehdot.

4. **Palautejärjestelmä**:
   - Jatkuva käyttäjäpalautteen kerääminen ja analysointi auttaa agenttia parantamaan relevanttiuden arviointia.
   - Esimerkki: Käyttäjäarvioiden ja palautteen hyödyntäminen aiemmista suosituksista parantaa tulevia vastauksia.

#### Käytännön menetelmät relevanttiuden arviointiin

1. **Relevanttiuspisteytys**:
   - Annetaaan relevanttiuspiste jokaiselle haetulle kohteelle sen perusteella, kuinka hyvin se vastaa käyttäjän kyselyä ja mieltymyksiä.
   - Esimerkki:

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

2. **Suodatus ja järjestäminen**:
   - Suodatetaan pois epäolennaiset kohteet ja järjestetään jäljelle jääneet relevanttiuspisteiden mukaan.
   - Esimerkki:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Palauta 10 parasta asiaankuuluvaa kohdetta
     ```

3. **Luonnollisen kielen käsittely (NLP)**:
   - Käytetään NLP-tekniikoita käyttäjän kyselyn ymmärtämiseen ja relevantin tiedon hakemiseen.
   - Esimerkki:

     ```python
     def process_query(query):
         # Käytä NLP:tä käyttäjän kyselyn avaintietojen poimimiseen
         processed_query = nlp(query)
         return processed_query
     ```

4. **Käyttäjäpalautteen integrointi**:
   - Kerätään käyttäjäpalautetta annetuista suosituksista ja hyödynnetään sitä tulevissa relevanttiusarvioinneissa.
   - Esimerkki:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Esimerkki: Relevanttiuden arviointi matkanjärjestäjässä

Tässä on käytännön esimerkki siitä, miten Travel Agent arvioi matkasuositusten relevanttiutta:

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
        return ranked_items[:10]  # Palauta 10 parasta asiaankuuluvaa kohdetta

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

# Esimerkkikäyttö
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

### Hakeminen käyttäjän aikomuksen mukaan

Hakeminen käyttäjän aikomuksen mukaan tarkoittaa käyttäjän kyselyn taustalla olevan tarkoituksen tai tavoitteen ymmärtämistä ja tulkitsemista, jotta voidaan löytää ja tuottaa mahdollisimman relevanttia ja hyödyllistä tietoa. Tämä lähestymistapa ylittää pelkän avainsanojen vastaavuuden ja keskittyy käyttäjän todellisten tarpeiden ja kontekstin ymmärtämiseen.

#### Keskeiset käsitteet hakemisessa käyttäjän aikomuksen mukaan

1. **Käyttäjän aikomuksen ymmärtäminen**:
   - Käyttäjän aikomus voidaan jakaa kolmeen päätyyppiin: informatiivinen, navigoiva ja transaktionaalinen.
     - **Informatiivinen aikomus**: Käyttäjä etsii tietoa aiheesta (esim. ”Mitä ovat Pariisin parhaat museot?”).
     - **Navigoiva aikomus**: Käyttäjä haluaa siirtyä tietylle verkkosivulle tai sivulle (esim. ”Louvre-museon virallinen sivusto”).
     - **Transaktionaalinen aikomus**: Käyttäjä aikoo suorittaa toimenpiteen, kuten varata lennon tai tehdä ostoksen (esim. ”Varaa lento Pariisiin”).

2. **Kontekstitietoisuus**:
   - Käyttäjän kyselyn kontekstin analysoiminen auttaa tunnistamaan aikomuksen tarkasti. Tämä sisältää aiemmat vuorovaikutukset, käyttäjän mieltymykset ja nykyisen kyselyn yksityiskohdat.

3. **Luonnollisen kielen käsittely (NLP)**:
   - NLP-tekniikoita käytetään ymmärtämään ja tulkitsemaan käyttäjän luonnolliskielisiä kyselyjä. Tämä sisältää tehtäviä kuten entiteettien tunnistus, sentimenttianalyysi ja kyselyn jäsentäminen.

4. **Personalisointi**:
   - Hakutulosten personointi käyttäjän historian, mieltymysten ja palautteen perusteella parantaa haettujen tietojen relevanttiutta.

#### Käytännön esimerkki: Hakeminen käyttäjän aikomuksen mukaan matkanjärjestäjässä

Otetaan esimerkkinä Travel Agent ja katsotaan, miten hakeminen käyttäjän aikomuksen mukaan voidaan toteuttaa.

1. **Käyttäjän mieltymysten kerääminen**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Käyttäjän aikomuksen ymmärtäminen**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Kontekstitietoisuus**
   ```python
   def analyze_context(query, user_history):
       # Yhdistä nykyinen haku käyttäjän historiaan ymmärtääksesi kontekstin
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Hae ja personoi tuloksia**

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
       # Esimerkkihakulogiikka tiedonhakuun
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Esimerkkihakulogiikka navigointiin
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Esimerkkihakulogiikka kaupalliseen hakuun
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Esimerkki personointilogiikka
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Palauta 10 parasta personoitua tulosta
   ```

5. **Esimerkki käytöstä**

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

## 4. Koodin generointi työkaluna

Koodia generoivat agentit käyttävät tekoälymalleja kirjoittaakseen ja suorittaakseen koodia, ratkaisten monimutkaisia ongelmia ja automatisoiden tehtäviä.

### Koodia generoivat agentit

Koodia generoivat agentit hyödyntävät generatiivisia tekoälymalleja kirjoittaakseen ja suorittaakseen koodia. Nämä agentit voivat ratkaista monimutkaisia ongelmia, automatisoida tehtäviä ja tarjota arvokkaita oivalluksia generoimalla ja suorittamalla koodia monilla ohjelmointikielillä.

#### Käytännön sovellukset

1. **Automaattinen koodin generointi**: Luo koodinpätkiä tiettyihin tehtäviin, kuten data-analyysiin, web-scrapingiin tai koneoppimiseen.
2. **SQL RAG:nä**: Käytä SQL-kyselyjä tietojen hakemiseen ja muokkaamiseen tietokannoista.
3. **Ongelmanratkaisu**: Luo ja suorita koodia ratkaistaksesi erityisiä ongelmia, kuten algoritmien optimointia tai datan analysointia.

#### Esimerkki: Koodia generoiva agentti data-analyysiin

Kuvittele, että suunnittelet koodia generoivaa agenttia. Näin se voisi toimia:

1. **Tehtävä**: Analysoi datasetti tunnistaaksesi trendejä ja malleja.
2. **Vaiheet**:
   - Lataa datasetti data-analyysityökaluun.
   - Generoi SQL-kyselyt datan suodattamiseen ja ryhmittelyyn.
   - Suorita kyselyt ja hae tulokset.
   - Käytä tuloksia visualisointien ja oivallusten luomiseen.
3. **Tarvittavat resurssit**: Pääsy datasettiin, data-analyysityökalut ja SQL-ominaisuudet.
4. **Kokemus**: Käytä aiempia analyysituloksia parantaaksesi tulevien analyysien tarkkuutta ja merkityksellisyyttä.

### Esimerkki: Koodia generoiva agentti matkanjärjestäjälle

Tässä esimerkissä suunnittelemme koodia generoivan agentin, Matkanjärjestäjän, auttamaan käyttäjiä matkasuunnitelmien laatimisessa generoimalla ja suorittamalla koodia. Tämä agentti pystyy hoitamaan tehtäviä, kuten matkaoptioiden hakemista, tulosten suodattamista ja reittisuunnitelman kokoamista generatiivista tekoälyä hyödyntäen.

#### Koodia generoivan agentin yleiskatsaus

1. **Käyttäjän mieltymysten kerääminen**: Kerää käyttäjän syötteet, kuten kohde, matkustuspäivät, budjetti ja kiinnostuksen kohteet.
2. **Koodin generointi tiedon hakemiseksi**: Luo koodinpätkiä lentojen, hotellien ja nähtävyyksien tietojen hakua varten.
3. **Generoidun koodin suoritus**: Käynnistää generoidun koodin hakemaan reaaliaikaisia tietoja.
4. **Matkaohjelman luominen**: Kokoa haetut tiedot henkilökohtaiseksi matkasuunnitelmaksi.
5. **Palautteen perusteella mukauttaminen**: Vastaanottaa käyttäjäpalautetta ja generoi tarvittaessa uuden koodin tulosten parantamiseksi.

#### Vaiheittainen toteutus

1. **Käyttäjän mieltymysten kerääminen**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Koodin generointi tiedon hakemiseksi**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Esimerkki: Luo koodi lentojen etsimiseen käyttäjän mieltymysten perusteella
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Esimerkki: Luo koodi hotellien etsimiseen
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Generoidun koodin suoritus**

   ```python
   def execute_code(code):
       # Suorita generoitu koodi käyttäen exec-funktiota
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

4. **Matkaohjelman luominen**

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

5. **Palautteen perusteella mukauttaminen**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Säädä asetuksia käyttäjien palautteen perusteella
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Luo koodi uudelleen ja suorita se päivitettyjen asetusten kanssa
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Ympäristötietoisuuden ja päättelyn hyödyntäminen

Taulun skeeman hyödyntäminen voi todellakin parantaa kyselyjen generointiprosessia hyödyntämällä ympäristötietoisuutta ja päättelyä.

Tässä esimerkki, miten tämä voidaan tehdä:

1. **Skeeman ymmärtäminen**: Järjestelmä ymmärtää taulun skeeman ja käyttää tätä tietoa kyselyjen jalkauttamiseen.
2. **Palautteen perusteella mukauttaminen**: Järjestelmä mukauttaa käyttäjän mieltymyksiä palautteen perusteella ja päättää, mitkä skeeman kentät tarvitsevat päivitystä.
3. **Kyselyjen generointi ja suoritus**: Järjestelmä generoi ja suorittaa kyselyjä, joilla haetaan päivitettyjä lento- ja hotellitietoja uusien mieltymysten mukaisesti.

Tässä päivitetty Python-esimerkki, joka sisältää nämä käsitteet:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Säädä asetuksia käyttäjäpalautteen perusteella
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Päättely skeeman perusteella muiden liittyvien asetusten säätämiseksi
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Mukautettu logiikka asetusten säätämiseksi skeeman ja palautteen perusteella
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Luo koodi lentotietojen hakemiseen päivitettyjen asetusten perusteella
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Luo koodi hotellitietojen hakemiseen päivitettyjen asetusten perusteella
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simuloi koodin suoritus ja palauta esimerkkitietoja
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Luo matkasuunnitelma lentojen, hotellien ja nähtävyyksien perusteella
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Esimerkkiskeema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Esimerkin käyttö
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Luo uudelleen ja suorita koodi päivitettyjen asetusten kanssa
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Selitys - Varaus palautteen perusteella

1. **Skeematietoisuus**: `schema`-sanakirja määrittelee, miten mieltymyksiä tulee mukauttaa palautteen perusteella. Se sisältää kenttiä kuten `favorites` ja `avoid` vastaavine mukautuksineen.
2. **Mieltymysten mukauttaminen (`adjust_based_on_feedback`-metodi)**: Tämä metodi mukauttaa mieltymyksiä käyttäjäpalautteen ja skeeman perusteella.
3. **Ympäristöperusteiset mukautukset (`adjust_based_on_environment`-metodi)**: Tämä metodi räätälöi mukautuksia skeeman ja palautteen pohjalta.
4. **Kyselyjen generointi ja suoritus**: Järjestelmä generoi koodin päivitettyjen lento- ja hotellitietojen hakemiseksi perustuen mukautettuihin mieltymyksiin ja simuloi näiden kyselyjen suorittamista.
5. **Matkaohjelman generointi**: Järjestelmä luo päivitetyn matkasuunnitelman uusien lento-, hotelli- ja nähtävyystietojen pohjalta.

Tekemällä järjestelmästä ympäristötietoisen ja perustellen skeeman mukaan se pystyy generoimaan tarkempia ja merkityksellisempiä kyselyjä, mikä johtaa parempiin matkasuosituksiin ja henkilökohtaisempaan käyttäjäkokemukseen.

### SQL:n käyttäminen Retrieval-Augmented Generation (RAG) -menetelmänä

SQL (Structured Query Language) on tehokas työkalu tietokantojen käsittelyyn. Kun sitä käytetään osana Retrieval-Augmented Generation (RAG) -lähestymistapaa, SQL voi hakea asiaankuuluvaa dataa tietokannoista tekoälyagenttien vastausten tai toimintojen tueksi. Tutkitaan, miten SQL:ää voi käyttää RAG-tekniikkana Matkanjärjestäjän yhteydessä.

#### Keskeiset käsitteet

1. **Tietokantayhteydet**:
   - SQL:ää käytetään tietokantojen kyselyihin, relevantin tiedon hakemiseen ja datan käsittelyyn.
   - Esimerkki: Lentotietojen, hotellitietojen ja nähtävyyksien hakeminen matkailutietokannasta.

2. **Integraatio RAG:n kanssa**:
   - SQL-kyselyt luodaan käyttäjän syötteen ja mieltymysten pohjalta.
   - Haettuja tietoja hyödynnetään personoitujen suositusten tai toimintojen luomiseen.

3. **Dynaaminen kyselyjen generointi**:
   - Tekoälyagentti luo dynaamisia SQL-kyselyjä kontekstin ja käyttäjän tarpeiden mukaan.
   - Esimerkki: SQL-kyselyjä muokataan suodattaakseen tuloksia budjetin, päivämäärien ja kiinnostuksen kohteiden perusteella.

#### Sovellukset

- **Automaattinen koodin generointi**: Luo koodinpätkiä tiettyihin tehtäviin.
- **SQL RAG:nä**: Käytä SQL-kyselyjä datan käsittelyyn.
- **Ongelmanratkaisu**: Luo ja suorita koodia ongelmien ratkaisemiseksi.

**Esimerkki**:
Data-analyysiin soveltuva agentti:

1. **Tehtävä**: Analysoi datasetti löytääksesi trendejä.
2. **Vaiheet**:
   - Lataa datasetti.
   - Generoi SQL-kyselyjä datan suodattamiseen.
   - Suorita kyselyt ja hae tulokset.
   - Luo visualisointeja ja oivalluksia.
3. **Resurssit**: Datasetin pääsy, SQL-kyvykkyydet.
4. **Kokemus**: Käytä aiempia tuloksia parantaaksesi tulevia analyysejä.

#### Käytännön esimerkki: SQL:n käyttö Matkanjärjestäjässä

1. **Käyttäjän mieltymysten kerääminen**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **SQL-kyselyjen generointi**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **SQL-kyselyjen suoritus**

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

4. **Suositusten luominen**

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

#### Esimerkkejä SQL-kyselyistä

1. **Lentokysely**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Hotellikysely**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Nähtävyyskysely**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Hyödyntämällä SQL:ää osana Retrieval-Augmented Generation (RAG) -tekniikkaa, tekoälyagentit kuten Matkanjärjestäjä voivat dynaamisesti hakea ja käyttää asiaankuuluvaa dataa tarjoten tarkkoja ja yksilöllisiä suosituksia.

### Esimerkki metakognition toteutuksesta

Näytetäänpä metakognition toteutus luomalla yksinkertainen agentti, joka *heijastelee omaa päätöksentekoprosessiaan* ongelman ratkaisemisen aikana. Tässä esimerkissä rakennamme järjestelmän, jossa agentti yrittää optimoida hotellivalintansa, mutta arvioi sitten omaa päättelyään ja säätää strategiaansa virheiden tai heikkolaatuisten valintojen jälkeen.

Simuloimme tätä perusesimerkillä, jossa agentti valitsee hotellit hinnan ja laadun yhdistelmän perusteella, mutta "heijastelee" päätöksiään ja säätää niitä sen mukaan.

#### Miten tämä havainnollistaa metakognitiota:

1. **Alkuperäinen päätös**: Agentti valitsee halvimmman hotellin ymmärtämättä laatutekijän vaikutusta.
2. **Heijastelu ja arviointi**: Ensimmäisen valinnan jälkeen agentti tarkistaa käyttäjäpalautteen avulla, oliko hotelli "huono" valinta. Jos laatu oli liian heikko, agentti heijastelee päättelyään.
3. **Strategian säätö**: Agentti muuttaa strategiaansa heijastelun perusteella vaihtamalla "halvin" vaihtoehtoon "korkein laatu", parantaen päätöksentekoa tulevilla kerroilla.

Tässä esimerkki:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Tallentaa aiemmin valitut hotellit
        self.corrected_choices = []  # Tallentaa korjatut valinnat
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Saatavilla olevat strategiat

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
        # Oletetaan, että meillä on käyttäjäpalautetta, joka kertoo, oliko viimeinen valinta hyvä vai ei
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Säädä strategiaa, jos edellinen valinta oli tyytymätön
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

# Simuloi hotellilista (hinta ja laatu)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Luo agentti
agent = HotelRecommendationAgent()

# Vaihe 1: Agentti suosittelee hotellia "halvin" strategian avulla
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Vaihe 2: Agentti pohtii valintaa ja säätää strategiaa tarvittaessa
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Vaihe 3: Agentti suosittelee uudelleen, tällä kertaa säädetyn strategian avulla
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Agenttien metakognitiiviset kyvyt

Keskeistä tässä on agentin kyky:
- Arvioida aiempia valintojaan ja päätöksentekoprosessiaan.
- Säätää strategiaansa tämän heijastelun perusteella eli metakognitiota käytännössä.

Tämä on yksinkertainen muoto metakognitiosta, jossa järjestelmä pystyy mukauttamaan päättelyään sisäisen palautteen perusteella.

### Yhteenveto

Metakognitio on tehokas työkalu, joka voi merkittävästi parantaa tekoälyagenttien kyvykkyyksiä. Ottamalla mukaan metakognitiiviset prosessit voi suunnitella agentteja, jotka ovat älykkäämpiä, sopeutuvampia ja tehokkaampia. Käytä lisäresursseja tutkiaksesi syvemmin metakognition kiehtovaa maailmaa tekoälyagenteissa.

### Onko sinulla lisää kysymyksiä metakognition suunnittelumallista?

Liity [Microsoft Foundry Discord -kanavalle](https://aka.ms/ai-agents/discord) tavata muita oppijoita, osallistua toimistoaikoihin ja saada vastauksia AI-agentti-kysymyksiisi.

## Edellinen oppitunti

[Moni-agenttisuunnittelumalli](../08-multi-agent/README.md)

## Seuraava oppitunti

[AI-agentit tuotannossa](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, huomioithan, että automaattikäännöksissä voi esiintyä virheitä tai epätarkkuuksia. Alkuperäinen asiakirja omalla kielellään on aina virallinen lähde. Tärkeissä asioissa suositellaan ammattilaisen tekemää ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai virhetulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->