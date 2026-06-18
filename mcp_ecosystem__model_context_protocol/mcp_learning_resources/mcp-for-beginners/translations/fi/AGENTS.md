# AGENTS.md

## Projektin yleiskatsaus

**MCP aloittelijoille** on avoimen lähdekoodin koulutusohjelma Model Context Protocolin (MCP) oppimiseen - standardoitu kehys tekoälymallien ja asiakasohjelmien vuorovaikutukseen. Tämä repositorio tarjoaa kattavat oppimateriaalit ja käytännön koodiesimerkkejä useilla ohjelmointikielillä.

### Keskeiset teknologiat

- **Ohjelmointikielet**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Kehykset ja SDK:t**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Tietokannat**: PostgreSQL pgvector-laajennuksella
- **Pilvialustat**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Build-työkalut**: npm, Maven, pip, Cargo
- **Dokumentaatio**: Markdown automatisoidulla monikielisellä käännöksellä (yli 48 kieltä)

### Arkkitehtuuri

- **11 ydinohjelmaa (00-11)**: Järjestyksessä etenevä oppimispolku perusteista edistyneisiin aiheisiin
- **Käytännön tehtävät**: Harjoituksia täydellisillä ratkaisukoodiesimerkeillä eri kielillä
- **Esimerkkiprojektit**: Toimivat MCP-palvelin- ja asiakasohjelman toteutukset
- **Käännösjärjestelmä**: Automaattinen GitHub Actions -työnkulku monikieliseen tukeen
- **Kuvavarastot**: Kuvakansio käännettyine versioineen

## Asennuskomennot

Tämä on dokumentaatioon keskittyvä repositorio. Suurin osa asennuksista tehdään yksittäisissä esimerkkiprojekteissa ja harjoituksissa.

### Repositorion asennus

```bash
# Kloonaa repositorio
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Työskentely esimerkkiprojektien kanssa

Esimerkkiprojektit sijaitsevat kansioissa:
- `03-GettingStarted/samples/` - kielikohtaiset esimerkit
- `03-GettingStarted/01-first-server/solution/` - ensimmäisen palvelimen toteutukset
- `03-GettingStarted/02-client/solution/` - asiakasohjelman toteutukset
- `11-MCPServerHandsOnLabs/` - laajat tietokantaintegraatioharjoitukset

Jokaisessa esimerkkiprojektissa on omat asennusohjeensa:

#### TypeScript/JavaScript-projektit
```bash
cd <project-directory>
npm install
npm start
```

#### Python-projektit
```bash
cd <project-directory>
pip install -r requirements.txt
# tai
pip install -e .
python main.py
```

#### Java-projektit
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Kehitysprosessi

### Dokumentaation rakenne

- **Moduulit 00-11**: Kurssin ydinmateriaali järjestyksessä
- **translations/**: Kieli- ja moduulikohtaiset käännetyt versiot (automaattisesti tuotettu, ei muokattavaksi)
- **translated_images/**: Lokalisoidut kuvat (automaattisesti tuotettu)
- **images/**: Lähdekuvat ja kaaviot

### Dokumentaatiomuutosten tekeminen

1. Muokkaa vain englanninkielisiä markdown-tiedostoja moduulihakemistoissa (00-11)
2. Päivitä kuvia `images/`-kansiossa tarvittaessa
3. co-op-translator GitHub Action generoi käännökset automaattisesti
4. Käännökset uudelleen luodaan työn muuttuessa main-haaraan

### Työskentely käännösten kanssa

- **Automaattinen käännös**: GitHub Actions hoitaa kaikki käännökset
- ÄLÄ muokkaa tiedostoja `translations/` kansiossa manuaalisesti
- Käännösten metatiedot sisältyvät jokaiseen käännettyyn tiedostoon
- Tuetut kielet: yli 48 kieltä, mm. arabia, kiina, ranska, saksa, hindi, japani, korea, portugali, venäjä, espanja jne.

## Testausohjeet

### Dokumentaation validointi

Koska kyseessä on ensisijaisesti dokumentaatiorepositorio, testaus keskittyy:

1. **Linkkien validointi**: Varmista, että kaikki sisäiset linkit toimivat
```bash
# Tarkista rikkoutuneet markdown-linkit
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Koodiesimerkkien testaus**: Varmista, että koodiesimerkit kääntyvät/ajavat
```bash
# Siirry tiettyyn näytteeseen ja suorita sen testit
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdownin tarkistus**: Muotoilun johdonmukaisuuden tarkastus
```bash
# Käytä markdownlintiä tarvittaessa
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Esimerkkiprojektien testaus

Jokaisessa kielikohtaisessa esimerkissä on oma testausmenetelmänsä:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Koodityyliohjeet

### Dokumentaation tyyli

- Käytä selkeää, aloittelijaystävällistä kieltä
- Sisällytä koodiesimerkkejä useilla kielillä tarvittaessa
- Noudata markdownin parhaimpia käytäntöjä:
  - Käytä ATX-tyyppisiä otsikoita (`#`-syntaksi)
  - Käytä koodilohkoja kielitunnisteilla
  - Lisää kuviin kuvailevat alt-tekstit
  - Pidä rivipituudet järkevinä (ei tiukkaa rajaa, mutta maltillisesti)

### Koodiesimerkkien tyyli

#### TypeScript/JavaScript
- Käytä ES-moduuleja (`import`/`export`)
- Noudata TypeScriptin tiukkaa tilaa
- Sisällytä tyyppimerkinnät
- Kohdista ES2022-tasolle

#### Python
- Noudata PEP 8 -tyyliohjeita
- Käytä tarvittaessa tyyppivihjeitä
- Sisällytä docstringit funktioihin ja luokkiin
- Käytä moderneja Python-ominaisuuksia (3.8+)

#### Java
- Noudata Spring Bootin käytäntöjä
- Käytä Java 21 -ominaisuuksia
- Noudata Mavenin vakiokansiopohjaa
- Sisällytä Javadoc-kommentit

### Tiedostojen järjestely

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Rakentaminen ja julkaisuprosessi

### Dokumentaation julkaisuprosessi

Repositorio käyttää GitHub Pages -julkaisua tai vastaavaa dokumentaation isännöintiin (tarvittaessa). Muutokset main-haaraan käynnistävät:

1. Käännöstyönkulun (`.github/workflows/co-op-translator.yml`)
2. Kaikkien englanninkielisten markdown-tiedostojen automaattisen käännöksen
3. Kuvien lokalisaation tarvittaessa

### Rakennusprosessia ei tarvita

Repositoriosta löytyy pääosin markdown-dokumentaatiota. Ydinmateriaalin kääntö- tai build-vaiheita ei tarvita.

### Esimerkkiprojektien julkaisu

Yksittäisillä esimerkkiprojekteilla voi olla julkaisuojehjeita:
- Katso `03-GettingStarted/09-deployment/` MCP-palvelimen julkaisun ohjeet
- Azure Container Apps -julkaisuesimerkit kansiossa `11-MCPServerHandsOnLabs/`

## Osallistumisohjeet

### Pull request -prosessi

1. **Forkkaa ja kloonaa**: Forkkaa repositorio ja kloonaa oma fork paikallisesti
2. **Luo haara**: Käytä kuvaavia haaranimiä (esim. `fix/typo-module-3`, `add/python-example`)
3. **Tee muutokset**: Muokkaa vain englanninkielisiä markdown-tiedostoja (ei käännöksiä)
4. **Testaa paikallisesti**: Varmista, että markdown näyttää oikein
5. **Lähetä PR**: Käytä selkeitä PR-otsikoita ja kuvauksia
6. **CLA**: Allekirjoita Microsoft Contributor License Agreement tarvittaessa

### PR-otsikon muoto

Käytä selkeitä, kuvaavia otsikoita:
- `[Module XX] Lyhyt kuvaus` moduulikohtaisille muutoksille
- `[Samples] Kuvaus` esimerkkikoodimuutoksille
- `[Docs] Kuvaus` yleisille dokumentaatiomuutoksille

### Mihin osallistua

- Virheenkorjaukset dokumentaatiossa tai esimerkeissä
- Uudet koodiesimerkit lisäkielillä
- Sisällön selvennykset ja parannukset
- Uudet tapaustutkimukset tai käytännön esimerkit
- Virheraportit epäselvästä tai väärästä sisällöstä

### Mitä EI tehdä

- Älä muokkaa tiedostoja suoraan `translations/`-kansiossa
- Älä muokkaa `translated_images/`-kansiota
- Älä lisää suuria binääritiedostoja ilman keskustelua
- Älä muuta käännöstyönkulun tiedostoja ilman koordinointia

## Lisätiedot

### Repositorion ylläpito

- **Muutokset**: Kaikki merkittävät muutokset dokumentoidaan tiedostossa `changelog.md`
- **Opas**: Käytä `study_guide.md` kurssin navigaatioon
- **Ongelmien mallipohjat**: Käytä GitHub-ongelmalomakkeita bugiraporteissa ja ominaisuuspyynnöissä
- **Käyttäytymisohjeet**: Kaikkien osallistujien tulee noudattaa Microsoft Open Source Code of Conduct -käyttäytymissääntöjä

### Oppimispolku

Seuraa moduuleita järjestyksessä (00-11) parhaan oppimistuloksen saavuttamiseksi:
1. **00-02**: Perusteet (Johdanto, ydinkäsitteet, turvallisuus)
2. **03**: Käytännön aloitus
3. **04-05**: Käytännön toteutus ja edistyneet aiheet
4. **06-10**: Yhteisö, parhaat käytännöt ja käytännön sovellukset
5. **11**: Laajat tietokantaintegraatioharjoitukset (13 peräkkäistä harjoitusta)

### Tukiresurssit

- **Dokumentaatio**: https://modelcontextprotocol.io/
- **Määrittelyt**: https://spec.modelcontextprotocol.io/
- **Yhteisö**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord -palvelin
- **Aiheeseen liittyvät kurssit**: Katso README.md muista Microsoftin oppimispoluista

### Yleisiä vianetsintävinkkejä

**K: PR:ni ei läpäise käännöspistettä**  
V: Varmista, että muokkasit vain englanninkielisiä markdown-tiedostoja moduulien juurihakemistoissa, et käännettyjä versioita.

**K: Miten lisään uuden kielen?**  
V: Kielituen hallinnointi tapahtuu co-op-translator-työnkulun kautta. Avaa issue keskustelua varten uusien kielten lisäämisestä.

**K: Koodiesimerkit eivät toimi**  
V: Varmista, että olet seurannut kunkin esimerkin README-ohjeita. Tarkista, että riippuvuuksien versiot ovat oikein asennettuina.

**K: Kuvat eivät näy**  
V: Varmista, että kuvat polut ovat suhteellisia ja käyttävät eteenpäin osoittavia kauttaviivoja. Kuvien tulee olla `images/`-tai tarvittaessa `translated_images/`-kansiossa.

### Suorituskykyyn liittyviä huomioita

- Käännöstyö vie yleensä useita minuutteja
- Suuret kuvat on suositeltu optimoida ennen tallennusta
- Pidä yksittäiset markdown-tiedostot ytimekkäinä ja kohtuullisina
- Käytä suhteellisia linkkejä paremman siirrettävyyden takaamiseksi

### Projektin hallinto

Tämä projekti noudattaa Microsoftin avoimen lähdekoodin käytäntöjä:  
- MIT-lisenssi koodille ja dokumentaatiolle  
- Microsoft Open Source Code of Conduct -käyttäytymissäännöt  
- CLA vaaditaan kontribuutioihin  
- Turvallisuusongelmat: noudata SECURITY.md ohjeita  
- Tuki: katso SUPPORT.md apuresurssit

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->