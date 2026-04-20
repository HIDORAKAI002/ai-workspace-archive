# Tietokoneen käyttöagenttien (CUA) rakentaminen

Tietokoneen käyttöagentit voivat olla vuorovaikutuksessa verkkosivustojen kanssa samalla tavalla kuin ihminen: avaamalla selaimen, tutkimalla sivua ja valitsemalla seuraavan parhaan toimenpiteen sen perusteella, mitä ne näkevät. Tässä oppitunnissa rakennat selaimen automaatioagentin, joka hakee Airbnb:stä, poimii jäsenneltyjä ilmoitustietoja ja tunnistaa edullisimman majoituksen Tukholmassa.

Oppitunti yhdistää Browser-Use:n AI-ohjattuun navigointiin, Playwrightin ja Chrome DevTools Protocolin (CDP) selaimen ohjaukseen, Azure OpenAI:n näkökykyyn perustuvaan päättelyyn ja Pydanticin rakenteelliseen poimintaan.

## Johdanto

Tässä oppitunnissa käsitellään:

- Milloin tietokoneen käyttöagentit sopivat paremmin kuin pelkkä API-automaatio
- Browser-Use:n yhdistäminen Playwrightiin ja CDP:hen luotettavaa selaimen elinkaaren hallintaa varten
- Azure OpenAI:n näkökyvyn ja rakenteellisen Pydantic-tulosteen käyttö ilmoitustietojen poimimiseen dynaamisilta verkkosivuilta
- Päätöksenteko siitä, milloin käyttää agenttipohjaista, toimijapohjaista tai hybridi-selaimen automaatiotyönkulkua

## Oppimistavoitteet

Oppitunnin suorittamisen jälkeen osaat:

- Määrittää Browser-Use:n Azure OpenAI:n ja Playwrightin kanssa
- Rakentaa selaimen automaatiotyönkulun, joka navigoi todellisella verkkosivustolla ja käsittelee dynaamisia käyttöliittymäelementtejä
- Poimia tyypitetyt tulokset näkyvästä sivusisällöstä ja muuttaa ne myöhempään liiketoimintalogiikkaan
- Valita agentti- ja toimijakuvioiden välillä sen mukaan, kuinka ennustettavissa selaimen tehtävä on

## Koodiesimerkki

Tässä oppitunnissa on yksi muistikirjaopastus:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Käynnistää Chrome-istunnon CDP:n kautta, hakee Airbnb:stä Tukholman ilmoituksia, poimii hinnat Browser-Use:n näkökyvyn avulla ja palauttaa halvimman vaihtoehdon rakenteellisena tietona.

## Ennen aloittamista

- Python 3.12+
- Azure OpenAI -käyttöönotto määritetty ympäristössäsi
- Chrome tai Chromium asennettuna paikallisesti
- Playwright-riippuvuudet asennettuna
- Perustiedot asynkronisesta Pythonista

## Asennus

Asenna muistikirjassa käytetyt paketit:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Aseta muistikirjan käyttämät Azure OpenAI -ympäristömuuttujat:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Valinnainen: oletuksena käytetään uusinta API-versiota, jos jätetään pois
AZURE_OPENAI_API_VERSION=...
```

## Arkkitehtuurin yleiskuva

Muistikirja esittelee hybridi-selaimen automaatiotyönkulun:

1. Chrome käynnistyy CDP käytössä, jotta sekä Playwright että Browser-Use voivat jakaa saman selainistunnon.
2. Browser-Use-agentti käsittelee avoimen navigoinnin tehtäviä, kuten Airbnb:n avaamista, ponnahdusikkunoiden sulkemista ja Tukholman hakua.
3. Aktiivinen sivu tutkitaan rakenteellisen Pydantic-skeeman avulla poimien ilmoitusten otsikot, hintayöt, arvostelut ja URL-osoitteet.
4. Python-logiikka vertailee poimittuja ilmoituksia ja korostaa halvimman tuloksen.

Tämä lähestymistapa säilyttää Browser-Use:n joustavan, näkökykyyn perustuvan päättelyn ja tarjoaa samalla määrityksellisen selaimen hallinnan, kun sitä tarvitaan.

## Tärkeimmät opit ja parhaat käytännöt

### Milloin käyttää agenttia vs. toimijaa

| Tilanne | Käytä agenttia | Käytä toimijaa |
|---------|---------------|---------------|
| Dynaamiset asettelut | Kyllä, tekoäly sopeutuu sivun muutoksiin | Ei, hauraat valitsimet voivat rikkoutua |
| Tunnettu rakenne | Ei, agentti on hitaampi kuin suora ohjaus | Kyllä, nopea ja tarkka |
| Elementtien löytäminen | Kyllä, luonnollinen kieli toimii hyvin | Ei, tarvitaan eksakteja valitsimia |
| Ajanhallinta | Ei, vähemmän ennustettavissa | Kyllä, täysi hallinta odotuksista ja toistoista |
| Monimutkaiset työnkulut | Kyllä, käsittelee odottamattomia käyttöliittymätiloja | Ei, vaatii eksplisiittisiä haaroja |

### Browser-Use:n parhaat käytännöt

1. Aloita agentilla tutkimista ja dynaamista navigointia varten.
2. Vaihda suoraan sivun ohjaukseen, kun vuorovaikutus muuttuu ennustettavaksi.
3. Käytä rakenteellisia tulostemalleja, jotta poimittu data on validoitua ja tyyppiturvallista.
4. Lisää viiveitä strategisesti toimintojen jälkeen, jotka laukaisevat näkyvät käyttöliittymän muutokset.
5. Tallenna kuvakaappauksia iteroinnin aikana, jotta virheiden jäljitys on helpompaa.
6. Varaudu verkkosivustojen muutoksiin ja suunnittele varasuunnitelmat ponnahdusikkunoille ja asettelun muutoksille.
7. Yhdistä agentti- ja toimijakuvioita saadaksesi sekä joustavuutta että tarkkuutta.

### Käytännön sovellukset

- Matkavaraukset ja hintaseuranta
- Verkkokaupan hintavertailu ja saatavuustarkistukset
- Rakenteellinen poiminta dynaamisilta verkkosivuilta
- Näkökykyyn perustuva käyttöliittymän testaus ja varmennus
- Verkkosivuston seuranta ja hälytykset
- Älykäs lomakkeiden täyttö monivaiheisissa työnkuluissa

## Lisäresurssit

- [Browser-Use Playwright -integraatiopohja](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use toimijaparametrit ja sisällön poiminta](https://docs.browser-use.com/customize/actor/all-parameters)
- [Kurssin aloitus](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:  
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, automaattiset käännökset voivat sisältää virheitä tai epätarkkuuksia. Alkuperäistä asiakirjaa sen alkuperäiskielellä tulee pitää auktoritatiivisena lähteenä. Tärkeissä tiedoissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä johtuvista väärinymmärryksistä tai virhetulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->