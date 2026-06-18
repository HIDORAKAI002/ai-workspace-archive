# Muutosloki: MCP aloittelijoille -oppimateriaali

Tämä asiakirja toimii tallenteena kaikista merkittävistä muutoksista, jotka on tehty Model Context Protocol (MCP) aloittelijoille -oppimateriaaliin. Muutokset on dokumentoitu käänteisessä kronologisessa järjestyksessä (uusimmat muutokset ensin).

## 16. kesäkuuta 2026

### MCP-spesifikaation yhdenmukaistus ja esimerkkien validointi

Varmistettiin oppimateriaalin vastaavuus nykyisen **MCP Specification 2025-11-25** -version ja uusimpien virallisten SDK:iden kanssa, korjattiin jäljellä olevat vanhentuneet spesifikaatio-viittaukset ja varmistettiin, että ydinesimerkit edelleen kääntyvät ja toimivat.

#### Spesifikaatioversion korjaukset (2025-06-18 / 2025-03-26 → 2025-11-25)

Päivitettiin englanninkielistä sisältöä, jossa edelleen väitettiin vanhemman spesifikaation olevan *nykyinen/viimeisin* standardi, ja ohjattiin linkit kanonisiin `modelcontextprotocol.io` -spesifikaatiopolkuun:
- **05-AdvancedTopics/mcp-security/README.md**: Päivitettiin "Nykyinen standardi" -banneri, johdanto, ydinturvaperiaatteiden otsikko, pakollisten vaatimusten otsikko, Microsoft Entra ID -osio, Viittaukset & Resurssit -linkit ja loppute turvailmoitus (8 viittausta) versioon 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Päivitettiin Lisäresurssien spesifikaatiolinkki ja "Nykyinen standardi" -banneri versioon 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Korvattiin vanhentunut `2025-03-26` security-and-trust -linkki nykyisellä 2025-11-25 turvakäytännöt -sivulla
- **03-GettingStarted/14-sampling/README.md**: Päivitettiin viralliset näytteenottodokumentaation linkit versioon 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Päivitettiin nykyhetkinen "nykyinen MCP spesifikaatio" -viite ja Lisäresurssien spesifikaatiolinkki versioon 2025-11-25 (historian SSE-poistomerkinnät jätettiin tarkkuuden vuoksi ennalleen)

#### Esimerkkien validointi nykyisillä SDK:illa

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ratkaisi `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` läpäisi ilman tyyppivirheitä — olemassa olevat `McpServer`/`StdioServerTransport` API:t ovat edelleen voimassa
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validointi eristetyssä `.venv`:ssä `mcp[cli]` (1.27.2) kanssa; `py_compile` onnistui ja `FastMCP.list_tools()` palautti oikein `add` ja `subtract` työkalut
- Varmistettiin, että kaikki esimerkkien `@modelcontextprotocol/sdk` versioalueet (`>=1.26.0` / `^1.26.0` / `^1.27.0`) ratkeavat siististi nykyiseen `1.29.0` versioon ilman API-murtavia muutoksia

#### Riippuvuuksien versiotarkennus (suljetaan versiovälit)

Päivitettiin vanhentuneita SDK-pinnit vastaamaan aina nykyistä MCP-julkaisua, vastaamaan koko repoksi hyväksyttyä käytäntöä:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Korotettiin `@modelcontextprotocol/sdk` versiosta `^1.8.0` → `>=1.26.0` ja päivitettiin vanhentunut `"updated for MCP 2025-06-18"` paketin kuvaus muotoon `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ja **lab4/code/github_mcp_server/pyproject.toml**: Korotettiin tarkka pinni `mcp==1.23.0` → `mcp>=1.26.0`; generoitiin molempien `uv.lock` -tiedostot uudelleen (`uv lock`), jolloin lukitustiedostot ratkeavat nykyiseen `mcp 1.27.2` ja pysyvät synkronissa manifestien kanssa

#### Oppimateriaalin aukkoanalyysi — uusimman spesifikaation ominaisuuksien kattavuus

Varmistettiin, että oppimateriaali kattaa jo kaikki MCP 2025-11-25 -spesifikaation uudet ja laajennetut primitiivit, joten sisällön aukkoja ei ole:
- **Näytteenotto**: Oppitunti 03-GettingStarted/14-sampling sekä 05-AdvancedTopics/mcp-sampling
- **Elicitaatio (ml. URL-tila)**: Dokumentoitu kohdissa 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features
- **Juuret**: Dokumentoitu kohdissa 00-Introduction, 01-CoreConcepts ja 05-AdvancedTopics/mcp-root-contexts
- **Tehtävät (kokeelliset, pitkään toimivat operaatiot)**: Dokumentoitu kohdissa 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features
- **Työkalujen annotaatiot** (`readOnlyHint` / `destructiveHint`): Dokumentoitu kohdissa 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features

### Turvallisuuden vahvistaminen ja riippuvuuksien haavoittuvuuksien korjaus

Suoritettiin täydellinen turvallisuusarviointi jokaisen riippuvuusmanifestin ja esimerkkilähdekoodin yli, minkä jälkeen korjattiin kaikki ilmoitetut npm-turva-aukot ja yksi kooditason löydös. Korjausten jälkeen `npm audit` raportoi **0 haavoittuvuutta** kaikissa tarkastetuissa hakemistoissa.

#### npm-riippuvuuksien haavoittuvuudet (transitiiviset) — Korjattu

Auditoitiin kaikki 15 sitoutettua `package-lock.json` -tiedostoa. Haavoittuvuudet rajoittuivat MCP Inspector -kehitystyökalun, OpenAI-asiakkaan ja MCP SDK:n kautta vedettyihin siirtymäriippuvuuksiin; kaikki on nyt ratkaistu rikkomatta esimerkkejä:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ja **lab3/code/weather_mcp/inspector**: Korotettiin `@modelcontextprotocol/inspector` versiosta (`0.16.6` / `0.14.1` → `0.22.0`), mikä poisti mukana tulleiden `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ja `ws` -varoitukset. Lisättiin npm `overrides` -merkintä, joka pakottaa korjatun `shell-quote@1.8.4` käytön poistamaan `concurrently`-kirjaston kriittisen varoituksen; generoitiin molemmat lukitustiedostot uudelleen (nyt 0 haavoittuvuutta)
- **03-GettingStarted/samples/typescript**: `npm audit fix` päivitti siirtymäriippuvuuden `qs` (keskitaso) korjattuun julkaisuun
- **03-GettingStarted/samples/javascript**: `npm audit fix` päivitti siirtymäriippuvuuden `hono` (keskitaso) korjattuun julkaisuun
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` päivitti siirtymäriippuvuuden `form-data` (korkea) korjattuun julkaisuun
- **03-GettingStarted/11-simple-auth/solution/typescript**: Luotiin puuttuva `package-lock.json` -tiedosto, jotta projekti on toistettavissa ja auditoitavissa (0 haavoittuvuutta)

#### Kooditason turvallisuuskorjaus (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Poistettiin `shell=True` `open_in_vscode` työkalusta. Aiempi `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` sallii komentosarjan metamerkkien tulkinnan `cmd.exe`:ssa (komentoinjektion riski). Nyt käynnistetään suoraan ratkaistu `Code.exe` kansiopolun kanssa argumenttina — ilman shellia — mikä on toiminnallisesti vastaavaa ja turvallista

#### Python-riippuvuuksien auditointi

- Auditoitiin jokainen Python-ehdotustiedosto `pip-audit`-työkalulla. `05-AdvancedTopics` ja `03-GettingStarted/samples/python` raportoivat **ei tiedossa olevia haavoittuvuuksia** (niiden `mcp` / `httpx` / `pydantic` / `python-dotenv` versiot ratkeavat nykyisiin korjattuihin julkaisuihin)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` havaitsi siirtymäriippuvuus **`werkzeug` 3.1.1**:ssä kolme Windows-laitenimeen liittyvää safe_join -palvelunestohyökkäysvaroitusta — `CVE-2025-66221`, `CVE-2026-21860` ja `CVE-2026-27199` (kaikki korjattu versiossa 3.1.6). Lisättiin eksplisiittinen turvallisuusrajoite `werkzeug>=3.1.6` niin että korjattu julkaisu ratkeaa; vahvistettiin rajoitteen ratkeaminen oikein `chainlit` / `mcp` / `semantic-kernel` pinoissa

### Tuotteen nimen uudelleenbrändäys

Päivitettiin kaikki oppimateriaalin sisällöt vastaamaan Microsoftin tuotemerkin uudelleenbrändäystä:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Päivitettiin Discord-yhteisölinkki
- **AGENTS.md**: Päivitettiin Discord-palvelimen viittaus
- **README.md**: Päivitettiin teknologiaympäristön viittauksia
- **study_guide.md**: Päivitettiin case study -viittauksia
- **05-AdvancedTopics/README.md**: Päivitettiin moduulin 5.13 otsikko ja kuvaus
- **05-AdvancedTopics/mcp-integration/README.md**: Päivitettiin osion otsikko ja kuvaus
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Kokonaan päivitetty moduulin otsikko ja sisältö
- **05-AdvancedTopics/mcp-security-entra/README.md**: Päivitettiin ristiviittauslinkki
- **07-LessonsfromEarlyAdoption/README.md**: Päivitettiin case study -viittauksia
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Päivitettiin kohdan 9 otsikko, merkit ja kyvyt
- **08-BestPractices/README.md**: Päivitettiin Discord-yhteisölinkki
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Päivitettiin Discord-kanavan viittaus
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Päivitettiin mallin käyttöönoton viittaus
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Päivitettiin AI-palvelutaulukko
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Päivitettiin resurssiviittauksia

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Päivitettiin pääoppimateriaalin viittauksia
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Päivitettiin moduulin otsikko, yleiskatsaus ja kaikki moduulin otsikot
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Päivitettiin otsikko, oppimistavoitteet, asennusohjeet ja resurssit
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Päivitettiin otsikko, oppimistavoitteet, MCP-hostitaulukko ja ristiviittaukset
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Päivitettiin otsikko, merkit, edellytykset ja resurssit
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Päivitettiin Agent Builder -viittauksia ja palautelinkkiä
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Päivitettiin edellytyksiä ja laajennusviittauksia

---

## 11. huhtikuuta 2026

### Uusi oppitunti, dokumentaation korjaukset ja riippuvuuspäivitykset

#### Uusi oppimateriaalin sisältö lisätty

**Moduuli 05 – Kehittyneet aiheet**
- **Oppitunti 5.17: Vastakkainen moniagenttinen päättely MCP:llä** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Uusi kattava opas, joka käsittelee vastakkaisen väittelyn mallia moniagenttijärjestelmissä
  - Mermaid-arkkitehtuurikaavio: kaksi agenttia → yhteinen MCP-palvelin → väittelyteksti → tuomari → päätös
  - Jaettu MCP-työkalupalvelin (`web_search` + `run_python`) toteutettuna Pythonilla ja TypeScriptillä
  - Vastakkaiset systeemikehotteet (PUOLLA / VASTAAN / Tuomari) eksplisiittisillä työkalujen käyttötarpeilla
  - Väittelyjen orkestroija Pythonilla, TypeScriptillä ja C#:lla, halliten kierroksia ja ohjaten argumentteja
  - MCP `ClientSession` -liitäntä orkestroijalle oikeiden työkalukutsujen tekemiseksi
  - Käyttötapataulukko (hallusinaatioiden tunnistus, uhkamallinnus, API-suunnittelun arviointi, faktatarkastus, teknologian valinta)
  - Turvallisuuskysymykset: suojattu suoritus, työkalukutsujen validointi, nopeusrajoitus, auditointilokitus
  - Rakenteellinen harjoitus kolmen käytännön skenaarion (koodikatselmointi, arkkitehtuuripäätös, sisällön valvonta) kanssa

#### Dokumentaation korjaukset

**Moduuli 03 – Aloittaminen**
- **05-stdio-server/README.md**: Korjattu keskeneräinen TypeScript stdio -palvelin-esimerkki — lisätty puuttuva transport-instansointi (`new StdioServerTransport()`) ja `server.connect(transport)` -kutsu vastaamaan Python- ja .NET-esimerkkejä samassa osiossa
- **14-sampling/README.md**: Korjattu kirjoitusvirhe — korjattu `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Oppimateriaalin päivitykset

**Pää-README.md**
- Lisätty oppitunti 5.17 (Vastakkainen moniagenttinen päättely MCP:llä) oppimäärätaulukkoon, suoralla linkillä uuteen oppituntiin

**05-AdvancedTopics/README.md**
- Lisätty Oppitunti 5.17 rivi oppituntitaulukkoon

**study_guide.md**
- Lisätty Vastakkainen moniagenttinen päättely -aihe miellekarttaan ja kehittyneiden aiheiden tekstikuvaustekstiin

#### Koodin ja turvallisuuden korjaukset

**Moduuli 05 – Vastakkaiset agentit (`mcp-adversarial-agents`)**
- **Turvallisuuskorjaus — komentoinjektio**: Korvattu TypeScriptin `run_python` työkalun `execSync` kuorivälikkeet `execFile` + `promisify` -tyylillä, poistamalla komentoinjektion mahdollisuus (LLM-ohjattu koodi välitetään nyt kirjaimellisena argv-elementtinä ilman kuorta)
- **MCP-työkalusilmukan kytkentä**: Päivitetty Pythonin debatointiorkestraattori käyttämään `AsyncAnthropic`-asiakasta (korvaten estävän synkronisen `Anthropic`), välittämään elävä `ClientSession` suoraan jokaiselle agentin kierrokselle, hakemaan työkalumääritelmät `session.list_tools()`-kutsulla jokaisella kierroksella ja suorittamaan `tool_use`-lohkoja `session.call_tool()`-kutsun avulla silmukassa, kunnes malli antaa lopullisen tekstivasteen

#### Riippuvuuspäivitykset

- Korotettu `hono` versioon 4.12.12 useissa paketeissa (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Korotettu `@hono/node-server` versiosta 1.19.11 versioon 1.19.13 TypeScript-paketeissa
- Korotettu `cryptography` versiosta 46.0.5 versioon 46.0.7 Python-paketeissa (10-StreamliningAIWorkflows laboratoriot 3 ja 4)
- Korotettu `lodash` versiosta 4.17.23 versioon 4.18.1 10-StreamliningAIWorkflows inspectorissa

#### Käännökset

- Synkronoitu käännökset 48+ kielille uusimpien lähdemuutosten mukaisesti (i18n-päivitys)

---

## 5.helmikuuta 2026

### Koko repositorion validointi- ja navigointiparannukset

#### Uutta opetussisältöä lisätty

**Moduuli 03 - Aloittaminen**
- **12-mcp-hosts/README.md**: Uusi kattava ohje MCP-hostien pystyttämiseen
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf -konfiguraatioesimerkkejä
  - JSON-konfiguraatiomallipohjat kaikille pääasiakkaille
  - Lähetysprotokollien vertailutaulukko (stdio, SSE/HTTP, WebSocket)
  - Yleisimpiä yhteysongelmia ja niiden vianmääritys
  - Turvallisuuden parhaat käytännöt hostin konfigurointiin

- **13-mcp-inspector/README.md**: Uusi vianetsintäopas MCP Inspectorille
  - Asennustavat (npx, npm globaali, lähdekoodi)
  - Yhteydet palvelimiin stdio- ja HTTP/SSE-yhteyksillä
  - Työkalujen, resurssien ja kehotteiden testausprosessit
  - VS Code -integraatio MCP Inspectorin kanssa
  - Yleisiä vianetsintätilanteita ratkaisuineen

**Moduuli 04 - Käytännön toteutus**
- **pagination/README.md**: Uusi sivutustoiminnon toteutusopas
  - Pythonin, TypeScriptin ja Javan kursori-pohjaiset sivutuskuviot
  - Asiakaspuolen sivutuksen käsittely
  - Kursori-suunnittelustrategiat (läpinäkymätön vs. rakenteellinen)
  - Suorituskyvyn optimointisuositukset

**Moduuli 05 - Edistyneet aiheet**
- **mcp-protocol-features/README.md**: Uusi syväluotaus protokollan ominaisuuksiin
  - Edistymisilmoitusten toteutus
  - Pyyntöjen peruutuskuviot
  - Resurssimallit URI-kuvioineen
  - Palvelimen elinkaaren hallinta
  - Lokitustason ohjaus
  - Virheenkäsittelykuviot JSON-RPC-koodeilla

#### Navigointikorjauksia (päivitetty 24+ tiedostoa)

**Päämoduulin README:t**
 Nyt sisältää linkit sekä ensimmäiseen oppituntiin ETTÄ seuraavaan moduuliin

**02-Security-alatiedostot**
- Kaikissa viidessä lisäturvallisuusasiakirjassa on nyt "Mitä seuraavaksi" -navigointi:

**09-CaseStudy-tiedostot**
- Kaikissa case study -tiedostoissa on nyt peräkkäinen navigointi:

**10-StreamliningAI-laboratoriot**
Lisätty "Mitä seuraavaksi" -osio moduulin 10 yleiskatsaukseen ja moduuliin 11

#### Koodin ja sisällön korjaukset

**SDK- ja riippuvuuspäivitykset**
Korjattu tyhjä openai-versio osoittamaan `^4.95.0`
Päivitetty SDK versiosta `^1.8.0` versioon `>=1.26.0`
Päivitetty mcp-version pins `>=1.26.0`

**Koodikorjaukset**
Korjattu virheellinen malli `gpt-4o-mini` muotoon `gpt-4.1-mini`

**Sisältökorjaukset**
Korjattu rikkinäinen linkki `READMEmd` → `README.md`, korjattu opetussuunnitelman otsikko `Module 1-3` → `Module 0-3`, korjattu kirjainkoolla erotteleva polku
Poistettu vioittunut kopio Case Study 5 -sisällöstä

**Aloittelijoiden opastusparannukset**
Lisätty asianmukainen esittely, oppimistavoitteet ja edellytykset aloittelijoille

#### Opetussuunnitelman päivitykset

**Pää-README.md**
- Lisätty opetustaulukkoon kohdat 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Sivutus), 5.16 (Protokollan ominaisuudet)

**Moduulien README:t**
Lisätty oppitunnit 12 ja 13 oppituntilistaan
Lisätty Käytännön oppaat -osio sivutuksen linkillä
Lisätty oppitunnit 5.15 (Mukautettu siirto) ja 5.16 (Protokollan ominaisuudet)

**study_guide.md**
- Päivitetty miellekartta sisältämään kaikki uudet aiheet: MCP Hosts -asennus, MCP Inspector, Sivutusstrategiat, Protokollan ominaisuudet -syväluotaus

## 28. tammikuuta 2026

### MCP:n spesifikaation 2025-11-25 vaatimustenmukaisuuden tarkastus

#### Keskeisten käsitteiden parannukset (01-CoreConcepts/)
- **Uusi asiakasprimitiivi - Roots**: Lisätty kattava dokumentaatio Roots-asiakasprimiitivistä, jonka avulla palvelimet ymmärtävät tiedostojärjestelmän rajat ja käyttöoikeudet
- **Työkalujen annotaatiot**: Lisätty dokumentaatio työkalujen käyttäytymiseen liittyvistä annotaatioista (`readOnlyHint`, `destructiveHint`) paremman työkalun suorituspäätöksen tueksi
- **Työkalujen kutsuminen näytteistämisessä**: Päivitetty Näytteistämis-dokumentaatiota sisältämään `tools` ja `toolChoice` -parametrit mallin ohjaamaan työkalukutsuun näytteistämispyyntöjen aikana
- **URL-tilan aktivointi**: Lisätty dokumentaatio serverin käynnistämälle ulkoiselle web-interaktiolle URL-pohjaisesti
- **Tehtävät (kokeellinen)**: Lisätty uusi osio, joka dokumentoi kokeellisen Tehtävät-ominaisuuden kestävien suoritusrimojen ja tulosten viivehakuun liittyen
- **Ikonituki**: Merkitty, että työkalut, resurssit, resurssimallit ja kehotteet voivat sisältää nyt ikoneja lisämateriaalina

#### Dokumentaatiopäivitykset
- **README.md**: Lisätty MCP Specification 2025-11-25 versio-osoitus ja päivämääräpohjainen versiointi selitys
- **study_guide.md**: Päivitetty opetussuunnitelmakartta sisältämään Tehtävät ja Työkalujen annotaatiot Core Concepts -osiossa; päivitetty dokumentin aikaleima

#### Spesifikaation vaatimustenmukaisuuden tarkastus
- **Protokollaversio**: Vahvistettu, että kaikki dokumentaatioviitteet koskevat nykyistä MCP Specification 2025-11-25 versiota
- **Arkkitehtuurin yhdenmukaisuus**: Varmistettu kaksikerroksisen arkkitehtuurin (Data Layer + Transport Layer) dokumentaation täsmällisyys
- **Primitiivien dokumentaatio**: Tarkastettu palvelinprimitiivit (Resurssit, Kehotteet, Työkalut) ja asiakasprimitiivit (Näytteistäminen, Aktivointi, Lokitus, Roots)
- **Siirtomekanismit**: Vahvistettu STDIO:n ja Streamable HTTP:n siirtodokumentaation oikeellisuus
- **Turvallisuusohjeistus**: Varmistettu yhdenmukaisuus MCP:n nykyisten turvallisuuden parhaiden käytäntöjen dokumentaation kanssa

#### MCP 2025-11-25 keskeiset ominaisuudet dokumentoitu
- **OpenID Connect -löytäminen**: Tunnistautumispalvelimen löytäminen OIDC:n kautta
- **OAuth-asiakas-ID:n metadokumentit**: Suositeltu asiakasrekisteröintimekanismi
- **JSON Schema 2020-12**: MCP-skeemamääritelmien oletuskieli
- **SDK-tasojärjestelmä**: Viralliset vaatimukset SDK:n ominaisuustuen ja ylläpidon osalta
- **Hallinnointirakenne**: MCP:n hallintomallin virallistaminen työryhmiksi ja intressiryhmiksi

### Turvallisuusdokumentaation merkittävä päivitys (02-Security/)

#### MCP Security Summit Workshop (Sherpa) -integraatio
- **Uusi käytännön koulutusmateriaali**: Lisätty kattava integraatio [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)-materiaalin kanssa koko turvallisuusdokumentaatioon
- **Retkireitin kattavuus**: Dokumentoitu täydellinen leiriltä leirille eteneminen Base Campista Summitiin
- **OWASP-yhdenmukaisuus**: Kaikki turvallisuusohjeistukset kartoittuvat OWASP MCP Azure Security Guide -riskien kanssa

#### OWASP MCP Top 10 -integraatio
- **Uusi osio**: Lisätty OWASP MCP Top 10 -turvallisuusriskejä sisältävä taulukko Azure-mitigaatioineen pääsecurity-README:hin
- **Riskipohjainen dokumentaatio**: Päivitetty mcp-security-controls-2025.md sisältämään OWASP MCP riskiviitteet jokaisesta turvallisuusalueesta
- **Viitearkkitehtuuri**: Linkitetty OWASP MCP Azure Security Guide -viitearkkitehtuuriin ja toteutuskuvioihin

#### Päivitetyt turvallisuustiedostot
- **README.md**: Lisätty Sherpa Workshop -yleiskatsaus, retkireittitaulukko, OWASP MCP Top 10 -riskikooste ja käytännön harjoitusosio
- **mcp-security-controls-2025.md**: Päivitetty otsikko helmikuulle 2026, lisätty OWASP-riskiviitteet (MCP01-MCP08), korjattu spesifikaatioversion epäjohdonmukaisuus
- **mcp-security-best-practices-2025.md**: Lisätty Sherpa- ja OWASP-resurssiosio, päivitetty aikaleima
- **mcp-best-practices.md**: Lisätty käytännön harjoitusosio Sherpa- ja OWASP-linkeillä
- **azure-content-safety-implementation.md**: Lisätty OWASP MCP06-viite, Sherpa Camp 3 -yhtenäistäminen ja lisäresurssiosio

#### Uusia resurssilinkkejä lisätty
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Yksittäiset OWASP MCP riski-sivut (MCP01-MCP10)

### Opetussuunnitelman laajamittainen MCP Specification 2025-11-25 -kohdistus

#### Moduuli 03 - Aloittaminen
- **SDK-dokumentaatio**: Lisätty Go SDK viralliseen SDK-listaan; päivitetty kaikki SDK-viitteet vastaamaan MCP Specification 2025-11-25 versiota
- **Siirtojen tarkennus**: Päivitetty STDIO- ja HTTP Streaming -siirtoja koskevat kuvaukset eksplisiittisillä spesifikaatioviitteillä

#### Moduuli 04 - Käytännön toteutus
- **SDK-päivitykset**: Lisätty Go SDK; päivitetty SDK-lista versio-osoituksella
- **Valtuutusspesifikaatio**: Päivitetty MCP Authorization -spesifikaatiolinkki nykyiseen 2025-11-25 versioon

#### Moduuli 05 - Edistyneet aiheet
- **Uudet ominaisuudet**: Lisätty huomautus MCP Specification 2025-11-25 uusista ominaisuuksista (Tehtävät, Työkalujen annotaatiot, URL-tilan aktivointi, Roots)
- **Turvallisuusresurssit**: Lisätty OWASP MCP Top 10 ja Sherpa workshop -linkit lisäresurssiosioon

#### Moduuli 06 - Yhteisön panokset
- **SDK-lista**: Lisätty Swift ja Rust SDK:t; päivitetty spesifikaatiolinkki 2025-11-25 versioon
- **Spesifikaatioviite**: Päivitetty MCP Specification linkki suoraan spesifikaatiotiedostoon

#### Moduuli 07 - Varhaiskäytön opit
- **Resurssipäivitykset**: Lisätty MCP Specification 2025-11-25 -linkki ja OWASP MCP Top 10 lisäresursseihin

#### Moduuli 08 - Parhaat käytännöt
- **Spesifikaatioversio**: Päivitetty MCP Specification -viite versioon 2025-11-25
- **Turvallisuusresurssit**: Lisätty OWASP MCP Top 10 ja Sherpa workshop lisäresursseihin

#### Moduuli 10 - AI-prosessien tehostaminen
- **Merkintäpäivitys**: Vaihdettu MCP-version badge SDK-version (1.9.3) sijaan spesifikaatioversioon (2025-11-25)
- **Resurssilinkit**: Päivitetty MCP Specification -linkki; lisätty OWASP MCP Top 10

#### Moduuli 11 - MCP Server Hands-On -laboratoriot
- **Spesifikaatioviite**: Päivitetty MCP Specification linkki versioon 2025-11-25
- **Turvallisuusresurssit**: Lisätty OWASP MCP Top 10 virallisiin resursseihin

## 18. joulukuuta 2025

### Turvallisuusdokumentaation päivitys - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Spesifikaatioversion päivitys
- **Protokollaversion päivitys**: Päivitetty viittaamaan uusimpaan MCP Specification 2025-11-25 (julkaistu 25. marraskuuta 2025)
  - Päivitetty kaikki spesifikaation versio-osoitukset versiosta 2025-06-18 versioon 2025-11-25
  - Päivitetty asiakirjan päivämääräosoitukset 18.8.2025 → 18.12.2025
  - Varmistettu kaikkien spesifikaatiourlien osoite nykyiseen dokumentaatioon
- **Sisällön validointi**: Laaja turvallisuuden parhaiden käytäntöjen tarkistus uusimpia standardeja vastaan
  - **Microsoftin turvallisuusratkaisut**: Varmistettu nykyiset termit ja linkit Prompt Shieldseille (entinen "Jailbreak risk detection"), Azure Content Safetylle, Microsoft Entra ID:lle ja Azure Key Vaultille
  - **OAuth 2.1 -turvallisuus**: Vahvistettu yhteensopivuus uusimpien OAuth-turvakäytäntöjen kanssa
  - **OWASP-standardit**: Tarkastettu OWASP Top 10 LLM:ille pysyvän ajantasaisena
  - **Azure-palvelut**: Tarkistettu kaikki Microsoft Azuren dokumentaatio-, ohje- ja parhaiden käytäntöjen linkit
- **Standardien yhdenmukaisuus**: Kaikki viitellut turvallisuusstandardit ovat ajan tasalla
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 -turvallisuuden parhaat käytännöt
  - Azure-turva- ja vaatimustenmukaisuuden viitekehykset
- **Toteutusresurssit**: Tarkastettu kaikki toteutusopaslinkit ja resurssit
  - Azure API Management -todennuskuviot
  - Microsoft Entra ID -integraatio-oppaat
  - Azure Key Vaultin salaisuudenhallinta
  - DevSecOps-putket ja valvontaratkaisut

### Dokumentaation laadunvarmistus
- **Spesifikaation noudattaminen**: Varmistettu kaikkien pakollisten MCP-turvavaatimusten (MUST/MUST NOT) vastaavuus uusimpaan spesifikaatioon
- **Resurssien ajantasaisuus**: Tarkistettu kaikki ulkopuoliset linkit Microsoftin dokumentaatioihin, turvallisuusstandardeihin ja toteutusoppaisiin
- **Parhaiden käytäntöjen kattavuus**: Vahvistettu kattava näkökulma todennukseen, valtuutukseen, tekoälyn erityisuhkiin, toimitusketjun turvaan ja yrityskuvioihin

## 6. lokakuuta 2025

### Aloitusosion laajennus – Edistynyt palvelimen käyttö & yksinkertainen todennus

#### Edistynyt palvelimen käyttö (03-GettingStarted/10-advanced)
- **Uusi luku lisätty**: Esitelty kattava opas edistyneestä MCP-palvelimen käytöstä, joka kattaa sekä tavallisen että matalan tason palvelinarkkitehtuurit.
  - **Tavallinen vs. matalan tason palvelin**: Yksityiskohtainen vertailu ja koodiesimerkit Pythonilla ja TypeScriptilä molemmille lähestymistavoille.
  - **Handler-pohjainen suunnittelu**: Selitys handler-pohjaisesta työkalujen/resurssien/kehotteiden hallinnasta skaalautuvien ja joustavien palvelintoteutusten tarpeisiin.
  - **Käytännön kuviot**: Todelliset tilanteet, joissa matalan tason palvelinmallit ovat hyödyllisiä edistyneissä ominaisuuksissa ja arkkitehtuurissa.
#### Yksinkertainen autentikointi (03-GettingStarted/11-simple-auth)
- **Uusi luku lisätty**: Vaiheittainen opas yksinkertaisen autentikoinnin toteuttamiseen MCP-palvelimissa.
  - **Autentikointikäsitteet**: Selkeä selitys autentikoinnin ja valtuutuksen eroista sekä tunnistetietojen käsittelystä.
  - **Perusautentikoinnin toteutus**: Middleware-pohjaiset autentikointimallit Pythonissa (Starlette) ja TypeScriptissä (Express) koodiesimerkkien kera.
  - **Eteneminen kehittyneempään turvallisuuteen**: Ohjeet yksinkertaisesta autentikoinnista aloittamiseen ja etenemiseen OAuth 2.1- ja RBAC-malleihin, sekä viittaukset edistyneisiin turvallisuusmoduuleihin.

Nämä lisäykset tarjoavat käytännönläheistä, käsillä tehtävää opastusta vahvempien, turvallisempien ja joustavampien MCP-palvelintoteutusten rakentamiseen, yhdistäen peruskäsitteet kehittyneisiin tuotantomalleihin.

## 29. syyskuuta 2025

### MCP-palvelimen tietokantaintegraation laboratoriot – Kattava käytännön oppimispolku

#### 11-MCPServerHandsOnLabs – Uusi täydellinen tietokantaintegraatiokurssi
- **Täysi 13-laboratoriopolku**: Lisätty kattava käytännön opetusohjelma tuotantovalmiiden MCP-palvelimien rakentamiseen PostgreSQL-tietokantaintegraatiolla
  - **Todellisen maailman toteutus**: Zava Retail -analytiikkatapaus, joka esittelee yritysluokan malleja
  - **Rakenteellinen oppiminen**:
    - **Labit 00–03: Perusteet** – Johdanto, ydinkirjasto, turvallisuus ja monivuokraaja, ympäristön asennus
    - **Labit 04–06: MCP-palvelimen rakentaminen** – Tietokantasuunnittelu ja skeema, MCP-palvelimen toteutus, työkalujen kehitys 
    - **Labit 07–09: Kehittyneet ominaisuudet** – Semanttisen haun integraatio, testaus ja virheenkorjaus, VS Code -integraatio
    - **Labit 10–12: Tuotanto ja parhaat käytännöt** – Julkaisustrategiat, valvonta ja havaittavuus, parhaat käytännöt ja optimointi
  - **Yritysteknologiat**: FastMCP-kehys, PostgreSQL pgvectorillä, Azure OpenAI -upotukset, Azure Container Apps, Application Insights
  - **Kehittyneet ominaisuudet**: Rivitason turvallisuus (RLS), semanttinen haku, monivuokraajamuotoinen datan käyttöoikeus, vektorikohdistukset, reaaliaikainen valvonta

#### Termistöstandardisointi – moduulista labiksi muutos
- **Kattava dokumentaatiopäivitys**: Kaikki 11-MCPServerHandsOnLabs -hakemiston README:t päivitetty käyttämään "Lab"-termiä moduulin sijaan
  - **Otsikot**: "What This Module Covers" päivitetty muotoon "What This Lab Covers" kaikissa 13 labissa
  - **Sisällön kuvaus**: "This module provides..." muutettu muotoon "This lab provides..." dokumentaatiossa
  - **Oppimistavoitteet**: "By the end of this module..." päivitetty muotoon "By the end of this lab..."
  - **Navigointilinkit**: Kaikki "Module XX:"-viittaukset muunnettu "Lab XX:" -muotoon linkeissä ja viittauksissa
  - **Suorituksen seuranta**: "After completing this module..." päivitetty muotoon "After completing this lab..."
  - **Tekniset viitteet säilytetty**: Python-moduuliviitteet konfigurointitiedostoissa (esim. `"module": "mcp_server.main"`) säilytetty ennallaan

#### Opasoppaiden parannus (study_guide.md)
- **Visuaalinen opetussuunnitelmakartta**: Lisätty uusi "11. Database Integration Labs" -osio, jossa koko labirakenne havainnollistettuna
- **Repositorion rakenne**: Päivitetty kymmenestä yhdentoista pääosioon sisältäen tarkan 11-MCPServerHandsOnLabs-kuvauksen
- **Oppimispolun ohjeistus**: Paranneltu navigointiohjeita kattamaan osiot 00–11
- **Teknologian kattavuus**: Lisätty FastMCP, PostgreSQL ja Azure-palveluiden integraatiotiedot
- **Oppimistulokset**: Korostettu tuotantovalmiin palvelimen kehitystä, tietokantaintegraation malleja ja yritystason turvallisuutta

#### Pää-README-rakenteen parannus
- **Labipohjainen terminologia**: Päivitetty 11-MCPServerHandsOnLabsin pää-README.md käyttämään johdonmukaisesti "Lab"-rakennetta
- **Oppimispolun organisointi**: Selkeä eteneminen peruskäsitteistä edistyneeseen toteutukseen ja tuotantoon vievään vaiheeseen
- **Todellisen maailman painotus**: Käytännönläheinen, laboratoriopohjainen oppiminen yritysluokkaisten mallien ja teknologioiden kera

### Dokumentaation laadun ja yhdenmukaisuuden parannukset
- **Käytännönläheinen oppiminen**: Vahvistettu käytännön laboratoriopohjaista lähestymistapaa dokumentaatiossa
- **Yritysmallien korostus**: Esitelty tuotantovalmiita toteutuksia ja yritysturvallisuuskysymyksiä
- **Teknologiaintegraatio**: Kattava modernien Azure-palveluiden ja tekoälyintegraation kuvaus
- **Oppimisen eteneminen**: Selkeä, strukturoitu polku perustason käsitteistä tuotantojulkaisuun

## 26. syyskuuta 2025

### Tapaustutkimusten päivitys – GitHub MCP Registry -integraatio

#### Tapaustutkimukset (09-CaseStudy/) – Ekosysteemin kehitykselle painotusta
- **README.md**: Merkittävä laajennus kattavalla GitHub MCP Registry -tapaustutkimuksella
  - **GitHub MCP Registry -tapaustutkimus**: Uusi kattava tutkimus GitHubin MCP Registryn julkaisusta syyskuussa 2025
    - **Ongelman analyysi**: Yksityiskohtainen tarkastelu hajanaisesta MCP-palvelinten löytämisestä ja käyttöönotosta
    - **Ratkaisun arkkitehtuuri**: GitHubin keskitetty rekisterimalli ja yhden klikkauksen VS Code -asennus
    - **Liiketoimintavaikutus**: Mitattavat parannukset kehittäjien perehdytyksessä ja tuottavuudessa
    - **Strateginen arvo**: Moduulien agenttien käyttöönotto ja työkalujen yhteentoimivuus
    - **Ekosysteemikehitys**: Sijoittuminen perustaksi agenttipohjaiselle integraatiolle
  - **Parannettu tapaustutkimusrakenne**: Kaikki seitsemän tapaustutkimusta päivitetty johdonmukaisella muotoilulla ja yksityiskohtaisilla kuvauksilla
    - Azure AI Travel Agents: Moni-agenttien orkestrointi
    - Azure DevOps Integration: Työnkulun automaatio
    - Reaaliaikainen dokumentaation haku: Python-konsoliasiakas
    - Interaktiivinen opintosuunnitelman generaattori: Chainlit-keskustelusovellus
    - In-editor-dokumentaatio: VS Code ja GitHub Copilot -integraatio
    - Azure API Management: Yritystason API-integraatiomallit
    - GitHub MCP Registry: Ekosysteemin kehitys ja yhteisöalusta
  - **Kattava yhteenveto**: Kirjoitettu uudelleen yhteenvetosivu, korostaen seitsemää tapaustutkimusta MCP-toteutuksen eri ulottuvuuksilta
    - Yritysintegrointi, moni-agenttien orkestrointi, kehittäjien tuottavuus
    - Ekosysteemin kehitys, koulutussovellukset
    - Syvällisiä näkemyksiä arkkitehtuurimalleista, toteutusstrategioista ja parhaista käytännöistä
    - MCP-protokollan kypsänä, tuotantovalmiina ratkaisuna

#### Opasoppaiden päivitykset (study_guide.md)
- **Visuaalinen opetussuunnitelmakartta**: Päivitetty miellekartta sisältämään GitHub MCP Registry tapaustutkimusosioon
- **Tapaustutkimusten kuvaus**: Paranneltu geneerisistä kuvauksista yksityiskohtaisiin seitsemän tapaustutkimuksen erittelyihin
- **Repositorion rakenne**: Päivitetty osio 10 vastaamaan kattavaa tapaustutkimusten sisältöä ja erityisiä toteutusyksityiskohtia
- **Muutospäiväkirja**: Lisätty 26. syyskuuta 2025 merkintä dokumentoimaan GitHub MCP Registryn lisäys ja tapaustutkimusten parannukset
- **Päivämääräpäivitykset**: Alatunnisteen aikaleima päivitetty viimeisimpään versioon (26. syyskuuta 2025)

### Dokumentaation laadun parannukset
- **Yhdenmukaisuuden parantaminen**: Tapaustutkimusten muotoilu ja rakenne vakioitu kaikissa seitsemässä esimerkissä
- **Kattava sisältö**: Tapaustutkimukset kattavat nyt yritystoiminnan, kehittäjien tuottavuuden ja ekosysteemin kehityksen skenaariot
- **Strateginen asema**: Korostettu MCP:n asemaa perustavana alustana agenttipohjaisten järjestelmien käyttöönotossa
- **Resurssien integrointi**: Päivitetyt lisäresurssit sisältävät linkin GitHub MCP Registryyn

## 15. syyskuuta 2025

### Edistyneet aiheet laajennus – Räätälöidyt kuljetusprotokollat & kontekstisuunnittelu

#### MCP räätälöidyt kuljetukset (05-AdvancedTopics/mcp-transport/) – Uusi kehittynyt toteutusopas
- **README.md**: Täydellinen toteutusopas räätälöityihin MCP-kuljetusmekanismeihin
  - **Azure Event Grid -kuljetus**: Kattava palvelimettoman tapahtumapohjaisen kuljetuksen toteutus
    - C#, TypeScript ja Python-esimerkit Azure Functions -integraatiolla
    - Tapahtumapohjaiset arkkitehtuurimallit skaalautuviin MCP-ratkaisuihin
    - Webhook-vastaanottajat ja push-viestien käsittely
  - **Azure Event Hubs -kuljetus**: Suurinopeuksinen suoratoistokuljetuksen toteutus
    - Reaaliaikaiset suoratoistomahdollisuudet alhaisen latenssin tilanteisiin
    - Jakopolitiikat ja tilan hallinta
    - Viestien ryhmittely ja suorituskyvyn optimointi
  - **Yritysintegraatiomallit**: Tuotantovalmiita arkkitehtuuriesimerkkejä
    - Jakautunut MCP-käsittely useiden Azure Functions -instanssien kesken
    - Hybridikuljetusarkkitehtuurit yhdistäen useita kuljetustyyppejä
    - Viestien pysyvyys, luotettavuus ja virheenkäsittelystrategiat
  - **Turvallisuus ja valvonta**: Azure Key Vault -integraatio ja havaittavuusmallit
    - Hallitut identiteetit ja vähimmän oikeuden käyttöoikeudet
    - Application Insights -telemetria ja suorituskyvyn monitorointi
    - Piirikytkimet ja vikansietomallit
  - **Testauskehykset**: Kattavat testausstrategiat räätälöidyille kuljetuksille
    - Yksikkötestaus testidubletteineen ja mockaustyökaluineen
    - Integraatiotestaus Azure Test Containers -ympäristössä
    - Suorituskyky- ja kuormitustestausnäkökohdat

#### Kontekstisuunnittelu (05-AdvancedTopics/mcp-contextengineering/) – Nouseva tekoälyala
- **README.md**: Kattava selvitys kontekstisuunnittelusta nousevana tutkimuskenttänä
  - **Keskeiset periaatteet**: Täydellinen kontekstin jakaminen, toimintapäätöksen tietoisuus ja kontekstin ikkunanhallinta
  - **MCP-protokollan yhteensopivuus**: Kuinka MCP-design vastaa kontekstisuunnittelun haasteisiin
    - Kontekstin ikkunan rajoitukset ja progressiivisen latauksen strategiat
    - Relevanssin määrittäminen ja dynaaminen kontekstin haku
    - Monimodaalinen kontekstin käsittely ja turvallisuuskysymykset
  - **Toteutusmenetelmät**: Yksi- vs. moniagenttinen arkkitehtuuri
    - Kontekstipalasten jakaminen ja priorisointi
    - Progressiivinen kontekstin lataus ja pakkausstrategiat
    - Kerrostetut kontekstimenetelmät ja hakujen optimointi
  - **Mittauskehys**: Nousevia mittareita kontekstin toimivuuden arviointiin
    - Syötteen tehokkuus, suorituskyky, laatu ja käyttökokemus
    - Kokeelliset menetelmät kontekstin optimointiin
    - Virheanalyysi ja parannusmenetelmät

#### Opetussuunnitelman navigointipäivitykset (README.md)
- **Laajennettu moduurirakenne**: Päivitetty opetussuunnitelman taulukko sisältämään uudet edistyneet aiheet
  - Lisätty Kontekstisuunnittelu (5.14) ja Räätälöity kuljetus (5.15)
  - Johdonmukainen muotoilu ja navigointilinkit kaikissa moduuleissa
  - Päivitetyt kuvaukset vastaamaan nykyistä sisältöaluetta

### Hakemistorakenteen parannukset
- **Nimistön yhdenmukaistus**: "mcp transport" nimetty uudelleen muotoon "mcp-transport" yhdenmukaisuuden vuoksi muiden kehittyneiden aiheiden kansioiden kanssa
- **Sisällön organisointi**: Kaikki 05-AdvancedTopics -kansiot noudattavat johdonmukaista nimeämiskäytäntöä (mcp-[aihe])

### Dokumentaation laadun parannukset
- **MCP-spesifikaation mukaistaminen**: Kaikki uusi sisältö viittaa MCP Specification 2025-06-18 -versioon
- **Monikieliset esimerkit**: Kattavat koodiesimerkit C#:ssa, TypeScriptissä ja Pythonissa
- **Yrityslähtöisyys**: Tuotantovalmiit mallit ja Azure-pilvi-integraatio läpi dokumentaation
- **Visuaalinen dokumentaatio**: Mermaid-kaaviot arkkitehtuurin ja työnkulun havainnollistamiseen

## 18. elokuuta 2025

### Dokumentaation kattava päivitys – MCP 2025-06-18 -standardit

#### MCP-turvallisuuden parhaat käytännöt (02-Security/) – Täydellinen modernisointi
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Kokonaan uudelleenkirjoitettu MCP Specification 2025-06-18:n mukaisesti
  - **Pakolliset vaatimukset**: Virallisen spesifikaation selkeät PAKOTA/PÄÄTÄÄ EI-säännöt visuaalisin indikaattorein
  - **12 ydinturvallisuuskäytäntöä**: Rakenteellinen uudistus 15-kohdan listasta kattavaan toimialuerakenteeseen
    - Tokenin turvallisuus ja autentikointi ulkoisen identiteetintarjoajan integroinnilla
    - Istunnon hallinta ja kuljetuksen turvallisuus kryptografisine vaatimuksineen
    - Tekoälyyn liittyvät uhkasuojaukset Microsoft Prompt Shieldsin kanssa
    - Käyttöoikeuksien hallinta ja vähimmän oikeuden periaate
    - Sisällön turvallisuus ja valvonta Azure Content Safetyn kanssa
    - Toimitusketjun turvallisuus kattavalla komponenttien varmistuksella
    - OAuth-turvallisuus ja Confused Deputy -hyökkäysten esto PKCE:tä hyödyntäen
    - Incident Response & Recovery automaatiokyvyillä
    - Säädösvaatimustenmukaisuus ja hallintomallit
    - Edistyneet turvallisuusohjaimet nollaluottamuksen arkkitehtuurilla
    - Microsoftin turvallisuusympäristön integrointi kattavasti
    - Jatkuva turvallisuuden kehitys adaptiivisin käytännöin
  - **Microsoftin turvallisuusratkaisut**: Parannettu integraatio-ohjeistus Prompt Shieldsille, Azure Content Safetylle, Entra ID:lle ja GitHub Advanced Securitylle
  - **Toteutusresurssit**: Rikkaita linkkiluokkia virallisesta MCP-dokumentaatiosta, Microsoftin turvaratkaisuista, turvastandardeista ja toteutusoppaista

#### Edistyneet turvallisuusohjaimet (02-Security/) – Yritys-tasoinen toteutus
- **MCP-SECURITY-CONTROLS-2025.md**: Kokonaan uudistettu yritysluokan turvallisuuskehys
  - **9 laajaa turvallisuusaluetta**: Laajennus peruskontrolleista yksityiskohtaisiin yritysratkaisuihin
    - Edistynyt autentikointi ja valtuutus Microsoft Entra ID -integroinnilla
    - Tokenin turvallisuus ja läpivientisuoja (anti-passthrough) kattavin validointeihin
    - Istuntojen turvallisuussäännöt sieppauksen estolla
    - Tekoälyyn liittyvät turvakontrollit kehotteiden injektiota ja työkalumyrkytysestoa vastaan
    - Confused Deputy -hyökkäysesuoja OAuth-välityspalvelulla
    - Työkalujen suoritusturvallisuus hiekkalaatikoinnilla ja eristyksellä
    - Toimitusketjun turvakontrollit riippuvuuksien varmistuksella
    - Valvontakontrollit SIEM-integraatiolla
    - Incident Response & Recovery automatisoiduilla kyvyillä
  - **Toteutusesimerkit**: Yksityiskohtaiset YAML-konfiguraatiolohkot ja koodiesimerkit
  - **Microsoft-turvaratkaisujen integraatio**: Kattava kuvauksen Azure-turvapalveluista, GitHub Advanced Securitystä ja yritysidentiteetin hallinnasta

#### Edistyneet aiheet turvallisuus (05-AdvancedTopics/mcp-security/) – Tuotantovalmiit toteutukset
- **README.md**: Täysin uudelleenkirjoitettu yritysturvallisuuden toteutusopas
  - **Ajantasainen spesifikaation mukaisuus**: Päivitetty MCP Specification 2025-06-18 mukaiseksi pakollisine turvallisuusvaatimuksineen
  - **Parannettu autentikointi**: Microsoft Entra ID -integraatio yksityiskohtaisilla .NET- ja Java Spring Security -esimerkeillä
  - **AI-turvallisuusintegraatio**: Microsoft Prompt Shields ja Azure Content Safety toteutukset yksityiskohtaisilla Python-esimerkeillä
  - **Edistyneet uhkien torjuntamenetelmät**: Kokonaisvaltaiset toteutusesimerkit
    - Confused Deputy -hyökkäyksen esto PKCE:llä ja käyttäjähyväksynnän vahvistuksella
    - Tokenien läpipääsyn estäminen kohdeyleisön validoinnilla ja turvallisella tokenien hallinnalla
    - Istuntojen sieppauksen estäminen kryptografisella sitomisella ja käyttäytymisanalyysilla
  - **Yritysturvallisuuden integraatio**: Azure Application Insights -valvonta, uhkien havaitsemisen pipelinet ja toimitusketjun turvallisuus
  - **Toteutuschecklist**: Selkeä pakolliset vs. suositellut turvallisuussäädöt Microsoftin turvallisuusympäristön hyödyillä

### Dokumentaation laadun ja standardienmukaisuuden parannukset
- **Määrittelyviitteet**: Päivitetty kaikki viittaukset nykyiseen MCP-määrittelyyn 2025-06-18
- **Microsoftin turvallisuus-ekosysteemi**: Parannettu integraatio-ohjeita kaikessa turvallisuusdokumentaatiossa
- **Käytännön toteutus**: Lisätty yksityiskohtaisia koodiesimerkkejä .NET:ssä, Javassa ja Pythonissa yrityskuvioilla
- **Resurssien järjestely**: Laaja virallisen dokumentaation, turvallisuusstandardien ja toteutusoppaitten luokittelu
- **Visuaaliset indikaattorit**: Selkeä merkintä pakollisista vaatimuksista vs. suositelluista käytännöistä


#### Ydinkäsitteet (01-CoreConcepts/) - Täydellinen modernisointi
- **Protokollaversion päivitys**: Päivitetty viittamaan nykyiseen MCP-määrittelyyn 2025-06-18 päivämääräpohjaisella versionumeroilla (VVVV-KK-PP-muoto)
- **Arkkitehtuurin hienosäätö**: Parannettu kuvausta Hosts-, Clients- ja Servers-komponenteista vastaamaan nykyisiä MCP-arkkitehtuurimalleja
  - Hosts on nyt selkeästi määritelty AI-sovelluksina, jotka koordinoivat useita MCP-asiakasliitäntöjä
  - Clients kuvattu protokollaliittiminä, jotka ylläpitävät yksi-yhteen-palvelinsuhteita
  - Servers on parannettu sisältämään paikallisen vs. etäkäyttöönoton skenaariot
- **Primitiivien uudelleenjärjestely**: Täydellinen uudistus palvelimen ja asiakkaan primitiiveihin
  - Palvelimen primitiivit: Resurssit (tietolähteet), Kehotteet (pohjat), Työkalut (suoritettavat funktiot) yksityiskohtaisine selityksineen ja esimerkkeineen
  - Asiakkaan primitiivit: Näytteistys (LLM:n suoritus), Elicitation (käyttäjän syöte), Lokitus (virheenjäljitys/valvonta)
  - Päivitetty nykyisillä löydön (`*/list`), haun (`*/get`) ja suoritusmenetelmäkuvioilla (`*/call`)
- **Protokollan arkkitehtuuri**: Esitelty kaksikerroksinen arkkitehtuurimalli
  - Datalayer: JSON-RPC 2.0 -perusta elinkaaren hallinnalla ja primitiiveillä
  - Kuljetuskerros: STDIO (paikallinen) ja Streamable HTTP SSE:n kanssa (etäkuljetusmekanismit)
- **Turvarunko**: Kattavat turvallisuusperiaatteet, mukaan lukien eksplisiittinen käyttäjän suostumus, tietosuojan suojaus, työkalujen suorituksen turvallisuus ja kuljetuskerroksen turvallisuus
- **Viestintäkuviot**: Päivitetyt protokollaviestit, jotka kuvastavat aloitus-, löydön, suorituksen ja ilmoitusten kulkuja
- **Koodiesimerkit**: Päivitetyt monikieliset esimerkit (.NET, Java, Python, JavaScript) vastaamaan nykyisiä MCP SDK -kuvioita

#### Turvallisuus (02-Security/) - Kattava turvallisuuden uudistus  
- **Standardien mukautuminen**: Täysi yhteensopivuus MCP-määrittelyn 2025-06-18 turvallisuusvaatimusten kanssa
- **Todentamisen kehitys**: Dokumentoitu kehitys mukautetuista OAuth-palvelimista ulkoiseen identiteetin tarjoajan delegointiin (Microsoft Entra ID)
- **AI-spesifiset uhka-analyysit**: Parannettu kattavuus nykyaikaisista AI-hyökkäysvektoreista
  - Yksityiskohtaiset kehotteen injektointihyökkäystilanteet todellisilla esimerkeillä
  - Työkalujen myrkytysmekanismit ja "rug pull" -hyökkäyskuviot
  - Kontekstin ikkunan myrkytys ja mallin sekaannushyökkäykset
- **Microsoftin AI-turvaratkaisut**: Kattava kuvaus Microsoftin turvallisuus-ekosysteemistä
  - AI-kehote-suojat kehittyneellä tunnistuksella, valaisutekniikoilla ja erottelumenetelmillä
  - Azure Content Safety -integraatiomallit
  - GitHub Advanced Security toimitusketjun suojaamiseen
- **Kehittynyt uhkien torjunta**: Yksityiskohtaiset turvallisuusohjaimet
  - Istunnon kaappaaminen MCP-spesifisillä hyökkäysskenaarioilla ja kryptografisilla istunnon tunnistevaatimuksilla
  - Sekavien edustajien ongelmat MCP-välityskuvioissa eksplisiittisillä suostumusvaatimuksilla
  - Tokenin läpipääsyturvallisuus ja pakolliset validointiohjaimet
- **Toimitusketjun turvallisuus**: Laajennettu AI-toimitusketjun kattavuus mukaan lukien perustamismallit, upotetut palvelut, kontekstin tarjoajat ja kolmannen osapuolen API:t
- **Perusturvallisuus**: Parannettu integraatio yritysturvallisuuskuvioihin mukaan lukien Zero Trust -arkkitehtuuri ja Microsoftin turvallisuus-ekosysteemi
- **Resurssien järjestely**: Luokittelu laajoista resurssilinkeistä tyypin mukaan (Viralliset dokumentit, Standardit, Tutkimus, Microsoft-ratkaisut, Toteutusoppaat)

### Dokumentaation laadun parannukset
- **Rakenteelliset oppimistavoitteet**: Parannettu oppimistavoitteita erityisillä, toteuttamiskelpoisilla tuloksilla
- **Ristiviittaukset**: Lisätty linkkejä turvallisuus- ja ydinkäsitteisiin liittyvien aiheiden välillä
- **Ajantasainen tieto**: Päivitetty kaikki päivämääräviitteet ja määrittelylinkit nykyisiin standardeihin
- **Toteutusohjeet**: Lisätty erityisiä ja toteuttamiskelpoisia toteutusohjeita molempiin osioihin

## 16. heinäkuuta 2025

### README ja navigoinnin parannukset
- Täysin uudistettu oppimateriaalin navigointi README.md -tiedostossa
- Vaihdettu `<details>`-tagit paremmin saavutettavaan taulukkomuotoon
- Luotu vaihtoehtoisia asetteluversioita uuteen "alternative_layouts" -kansioon
- Lisätty korttipohjaisia, välilehtityylisiä ja harmonikkatyylisiä navigointiesimerkkejä
- Päivitetty repositorion rakenneosio kattamaan kaikki uusimmat tiedostot
- Parannettu "Kuinka käyttää tätä oppimateriaalia" -osio selkeillä suosituksilla
- Päivitetty MCP-määrittelylinkit osoittamaan oikeisiin URL-osoitteisiin
- Lisätty konteksti-insinöörityksen osio (5.14) oppimateriaalin rakenteeseen

### Opasopintojen päivitykset
- Täysin uudistettu opasopintoja vastaamaan nykyistä repositorion rakennetta
- Lisätty uudet osiot MCP-asiakkaista ja -työkaluista sekä suosituista MCP-palvelimista
- Päivitetty visuaalinen oppimateriaalikartta kaikilta osin tarkaksi
- Parannettu erikoisaiheiden kuvauksia kattamaan kaikki erikoisalat
- Päivitetty tapaustutkimukset vastaamaan todellisia esimerkkejä
- Lisätty tämä kattava muutosloki

### Yhteisön kontribuutiot (06-CommunityContributions/)
- Lisätty yksityiskohtaiset tiedot MCP-palvelimista kuvantuotantoon
- Lisätty kattava osio Clauden käytöstä VSCode:ssa
- Lisätty Cline-päätteenasettelu ja käyttöohjeet
- Päivitetty MCP-asiakaskohtaiset osiot sisältämään kaikki suosituimmat asiakasvaihtoehdot
- Parannettu kontribuutioesimerkkejä tarkemmilla koodinäytteillä

### Edistyneet aiheet (05-AdvancedTopics/)
- Järjestetty kaikki erikoisaiheiset kansiot johdonmukaisilla nimeämiskäytännöillä
- Lisätty konteksti-insinööri-materiaaleja ja esimerkkejä
- Lisätty Foundry-agentin integraatiodokumentaatio
- Parannettu Entra ID:n turvallisuusintegraatiodokumentaatiota

## 11. kesäkuuta 2025

### Alkuperäinen luonti
- Julkaistu MCP for Beginners -oppimateriaalin ensimmäinen versio
- Luotu perusrakenne kaikille 10 pääosiolle
- Toteutettu visuaalinen oppimateriaalikartta navigointia varten
- Lisätty alkuprojektiesimerkkejä useilla ohjelmointikielillä

### Aloittaminen (03-GettingStarted/)
- Luotu ensimmäiset palvelimen toteutusesimerkit
- Lisätty asiakasohjeet kehittämiseen
- Sisällytetty LLM-asiakkaan integraatio-ohjeet
- Lisätty VS Code -integraatiodokumentaatio
- Toteutettu Server-Sent Events (SSE) -palvelinesimerkit

### Ydinkäsitteet (01-CoreConcepts/)
- Lisätty yksityiskohtainen kuvaus asiakas-palvelin-arkkitehtuurista
- Luotu dokumentaatio tärkeimmistä protokollakomponenteista
- Dokumentoitu viestintäkuviot MCP:ssä

## 23. toukokuuta 2025

### Repositorion rakenne
- Initoitu repositorio perustiedostorakenteella
- Luotu README-tiedostot jokaiselle pääosalle
- Pystyytetty kääntämisinfrastruktuuri
- Lisätty kuvat ja kaaviot

### Dokumentaatio
- Luotu alkuperäinen README.md oppimateriaalin yleiskatsauksella
- Lisätty CODE_OF_CONDUCT.md ja SECURITY.md
- Pystyytetty SUPPORT.md ohjeilla avun saamiseksi
- Luotu alustava opasoppimateriaalin rakenne

## 15. huhtikuuta 2025

### Suunnittelu ja kehys
- MCP for Beginners -oppimateriaalin alkuperäinen suunnittelu
- Määritelty oppimistavoitteet ja kohdeyleisö
- Luotu oppimateriaalin 10-osioinen rakenne
- Kehitetty konseptuaalinen kehys esimerkeille ja tapaustutkimuksille
- Luotu alkuperäiset esimerkkiprojektit keskeisistä käsitteistä

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->