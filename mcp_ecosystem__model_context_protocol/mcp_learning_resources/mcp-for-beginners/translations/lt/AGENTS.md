# AGENTS.md

## Projekto apžvalga

**MCP pradedantiesiems** yra atvirojo kodo mokymo programa, skirta Model Context Protocol (MCP) - standartizuotos sistemos sąveikoms tarp DI modelių ir klientų programų - mokymuisi. Šiame saugykloje pateikiamos išsamios mokymosi medžiagos su praktiškais kodo pavyzdžiais keliomis programavimo kalbomis.

### Pagrindinės technologijos

- **Programavimo kalbos**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Sistemos ir SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Duomenų bazės**: PostgreSQL su pgvector plėtiniu
- **Debesų platformos**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Kūrimo įrankiai**: npm, Maven, pip, Cargo
- **Dokumentacija**: Markdown su automatiniu daugiakalbiu vertimu (48+ kalbos)

### Architektūra

- **11 pagrindinių modulių (00-11)**: Nuoseklus mokymosi kelias nuo pagrindų iki pažangesnių temų
- **Praktinės laboratorijos**: Praktikos užduotys su pilnais sprendimų kodais keliomis kalbomis
- **Pavyzdinės programos**: Veikiančios MCP serverio ir kliento įgyvendinimo versijos
- **Vertimų sistema**: Automatizuotas GitHub Actions darbas daugiakalbiam palaikymui
- **Vaizdų ištekliai**: Centralizuota vaizdų direktorija su išverstomis versijomis

## Įdiegimo komandos

Tai daugiausia dokumentacijai skirta saugykla. Dauguma konfigūracijos vykdoma pavieniuose pavyzdiniuose projektuose ir laboratorijose.

### Saugyklos įdiegimas

```bash
# Nuklonuokite saugyklą
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Darbas su pavyzdiniais projektais

Pavyzdiniai projektai yra šiose vietose:
- `03-GettingStarted/samples/` - kalbai būdingi pavyzdžiai
- `03-GettingStarted/01-first-server/solution/` - pirmojo serverio įgyvendinimai
- `03-GettingStarted/02-client/solution/` - kliento įgyvendinimai
- `11-MCPServerHandsOnLabs/` - išsamios duomenų bazių integracijos laboratorijos

Kiekvienas pavyzdinis projektas turi savo įdiegimo instrukcijas:

#### TypeScript/JavaScript projektai
```bash
cd <project-directory>
npm install
npm start
```

#### Python projektai
```bash
cd <project-directory>
pip install -r requirements.txt
# arba
pip install -e .
python main.py
```

#### Java projektai
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Kūrimo procesas

### Dokumentacijos struktūra

- **Moduliai 00-11**: Pagrindinė mokymo medžiaga sekama nuosekliai
- **translations/**: Kalbai būdingos versijos (automatiškai generuojamos, nea redaguokite tiesiogiai)
- **translated_images/**: Lokalizuotos vaizdų versijos (automatiškai generuojamos)
- **images/**: Šaltinių vaizdai ir diagramos

### Dokumentacijos keitimai

1. Redaguokite tik anglų kalbos markdown failus pagrindiniuose modulio direktorijose (00-11)
2. Reikia - atnaujinkite vaizdus `images/` direktorijoje
3. GitHub veikla co-op-translator automatiškai sugeneruos vertimus
4. Vertimai atnaujinami įkėlus pakeitimus į pagrindinę šaką

### Darbas su vertimais

- **Automatinis vertimas**: GitHub Actions užtikrina automatinį visų vertimų tvarkymą
- **Ne redaguokite rankiniu būdu** failus `translations/` direktorijoje
- Vertimų metaduomenys yra įterpti kiekviename išverstame faile
- Palaikomos 48+ kalbos įskaitant arabų, kinų, prancūzų, vokiečių, hindi, japonų, korėjiečių, portugalų, rusų, ispanų ir daugelį kitų

## Testavimo instrukcijos

### Dokumentacijos patikra

Kadangi tai daugiausia dokumentacijos saugykla, testavimas apima:

1. **Nuorodų patikrą**: Įsitikinkite, kad visos vidinės nuorodos veikia
```bash
# Patikrinti sulaužytas markdown nuorodas
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Kodo pavyzdžių patikra**: Patikrinkite, ar kodo pavyzdžiai kompiliuojasi/veikia
```bash
# Eikite į konkretų pavyzdį ir vykdykite jo testus
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown linting**: Patikrinkite formatavimo nuoseklumą
```bash
# Naudokite markdownlint, jei reikia
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Pavyzdinių projektų testavimas

Kiekvienas konkrečiai kalbai skirtas pavyzdys turi savo testavimo metodiką:

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

## Kodo stiliaus gairės

### Dokumentacijos stilius

- Naudokite aiškią, pradedantiesiems suprantamą kalbą
- Pateikite kodo pavyzdžius keliose kalbose, jei įmanoma
- Laikykitės markdown geriausių praktikų:
  - Naudokite ATX stiliaus antraštes (`#` sintaksė)
  - Naudokite uždarytus kodo blokus su kalbos žymomis
  - Įtraukite aprašomąjį alt tekstą vaizdams
  - Laikykite eilučių ilgį protingą (nėra griežtos ribos, tačiau būkite saikingi)

### Kodo pavyzdžių stilius

#### TypeScript/JavaScript
- Naudokite ES modulius (`import`/`export`)
- Vadovaukitės TypeScript griežto režimo konvencijomis
- Pateikite tipų anotacijas
- Tikslinė platforma ES2022

#### Python
- Vadovaukitės PEP 8 stiliaus gairėmis
- Naudokite tipų užuominas, kur tinka
- Įtraukite docstring'us funkcijoms ir klasėms
- Naudokite modernias Python savybes (3.8+)

#### Java
- Vadovaukitės Spring Boot konvencijomis
- Naudokite Java 21 funkcijas
- Laikykitės standartinės Maven projekto struktūros
- Įtraukite Javadoc komentarus

### Failų organizavimas

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

## Kūrimas ir diegimas

### Dokumentacijos diegimas

Ši saugykla naudoja GitHub Pages ar panašią sistemą dokumentacijos talpinimui (jei taikoma). Pakeitimai pagrindinėje šakoje suaktyvina:

1. Vertimo darbo eigą (`.github/workflows/co-op-translator.yml`)
2. Automatinį visų anglų kalbos markdown failų vertimą
3. Vaizdų lokalizaciją pagal poreikį

### Diegimo procesas nereikalingas

Šioje saugykloje daugiausia yra markdown dokumentacija. Pagrindinei mokymo medžiagai nereikia kompiliacijos ar sudarymo žingsnių.

### Pavyzdinių projektų diegimas

Pavieniai pavyzdiniai projektai gali turėti diegimo instrukcijas:
- Žr. `03-GettingStarted/09-deployment/` MCP serverio diegimo gaires
- Azure Container Apps diegimo pavyzdžiai `11-MCPServerHandsOnLabs/`

## Bendradarbiavimo gairės

### Pull Request procesas

1. **Fork'as ir klonavimas**: Atšakinkite saugyklą ir klonuokite savo fork'ą vietoje
2. **Sukurti šaką**: Naudokite apibūdinančius šakos pavadinimus (pvz., `fix/typo-module-3`, `add/python-example`)
3. **Atlikti pakeitimus**: Redaguokite tik anglų kalbos markdown failus (ne vertimus)
4. **Testuoti vietoje**: Patikrinkite, ar markdown tinkamai atvaizduojamas
5. **Pateikti PR**: Naudokite aiškius PR pavadinimus ir aprašymus
6. **CLA**: Pasirašykite Microsoft Prisidėjimo Licencijos Sutartį, kai bus paprašyta

### PR pavadinimų formatas

Naudokite aiškius, apibūdinančius pavadinimus:
- `[Modulis XX] Trumpas aprašymas` moduliams skirtų pakeitimų atveju
- `[Pavyzdžiai] Aprašymas` pavyzdžių kodo pakeitimams
- `[Docs] Aprašymas` bendriems dokumentacijos atnaujinimams

### Ką prisidėti

- Klaidos taisymai dokumentacijoje ar kodo pavyzdžiuose
- Nauji kodo pavyzdžiai papildomomis kalbomis
- Paaiškinimai ir patobulinimai esamai medžiagai
- Nauji atvejų tyrimai ar praktiniai pavyzdžiai
- Problemų pranešimai dėl neaiškios ar klaidingos informacijos

### Ko nedaryti

- Neredaguoti tiesiogiai failų `translations/` direktorijoje
- Neredaguoti `translated_images/` direktorijos turinio
- Neišsiųsti didelių dvejetainių failų be aptarimo
- Nekoreguoti vertimo darbo eigos failų be koordinacijos

## Papildomos pastabos

### Saugyklos priežiūra

- **Pakeitimų žurnalas**: Visi svarbūs pakeitimai dokumentuojami `changelog.md`
- **Studijų vadovas**: Naudokite `study_guide.md` mokymo programos navigacijai
- **Klaidų pranešimų šablonai**: Github problemų šablonai klaidoms ir funkcijų prašymams
- **Elgesio kodeksas**: Visi prisidėjai privalo laikytis Microsoft atvirojo kodo elgesio kodekso

### Mokymosi kelias

Laikykitės modulių nuoseklumo (00-11) maksimaliam mokymuisi:
1. **00-02**: Pagrindai (Įvadas, Pagrindinės sąvokos, Saugumas)
2. **03**: Pradžia su praktišku įgyvendinimu
3. **04-05**: Praktinis įgyvendinimas ir pažangios temos
4. **06-10**: Bendruomenė, geriausios praktikos ir realios programos
5. **11**: Išsamios duomenų bazių integracijos laboratorijos (13 nuoseklių laboratorijų)

### Pagalbos ištekliai

- **Dokumentacija**: https://modelcontextprotocol.io/
- **Specifikacija**: https://spec.modelcontextprotocol.io/
- **Bendruomenė**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord serveris
- **Susijusios kursai**: Žr. README.md kitoms Microsoft mokymosi programoms

### Dažnos problemos

**K: Mano PR neišlaiko vertimo patikros**
A: Įsitikinkite, kad redagavote tik anglų kalbos markdown failus pagrindiniuose modulių direktorijose, ne išverstus.

**K: Kaip pridėti naują kalbą?**
A: Kalbų palaikymą tvarko co-op-translator darbo eiga. Atidarykite problemą pasiūlymui pridėti naują kalbą.

**K: Kodo pavyzdžiai neveikia**
A: Įsitikinkite, kad sekėte įdiegimo instrukcijas konkretaus pavyzdžio README faile. Patikrinkite, ar įdiegta tinkama priklausomybių versija.

**K: Vaizdai nerodomi**
A: Patikrinkite, kad vaizdų keliai yra santykiniai su teisingais pasviraisiais brūkšniais. Vaizdai turi būti `images/` arba `translated_images/` direktorijoje lokalizuotoms versijoms.

### Veikimo ypatumai

- Vertimo darbo eiga gali užtrukti kelias minutes
- Didelius vaizdus optimizuokite prieš įkeldami
- Laikykite atskirus markdown failus fokusuotus ir tinkamo dydžio
- Naudokite santykines nuorodas geresniam perkeliamumui

### Projekto valdymas

Šis projektas laikosi Microsoft atvirojo kodo praktikų:
- MIT licencija kodui ir dokumentacijai
- Microsoft atvirojo kodo elgesio kodeksas
- CLA reikalaujama prisidėjams
- Saugumo klausimai: laikykitės SECURITY.md gairių
- Pagalba: žr. SUPPORT.md su ištekliais pagalbai

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->