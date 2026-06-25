# Muutokset: MCP for Beginners -oppimateriaali

Tämä asiakirja toimii tallenteena kaikista merkittävistä muutoksista Model Context Protocol (MCP) for Beginners -oppimateriaaliin. Muutokset on kirjattu käänteisessä kronologisessa järjestyksessä (uusimmat muutokset ensin).

## 24. kesäkuuta 2026

### Uusi oppitunti: MCP:n käyttö Copilot-sovelluksessa

- [Työkalut-osio](./12-tooling/README.md) Lisätty työkalut-osio.
- [MCP Copilot-sovelluksessa](./12-tooling/01-copilot-app/README.md)

## 16. kesäkuuta 2026

### MCP-määrityksen yhdenmukaistus ja esimerkkien validointi

Varmistettiin oppimateriaali nykyisellä **MCP Specification 2025-11-25** -määrityksellä sekä uusimmilla virallisilla SDK:illa, korjattiin vanhentuneet määritystilviitteet ja vahvistettiin ydinesimerkkien edelleen toimivuus ja käännös.

#### Määritysversion korjaukset (2025-06-18 / 2025-03-26 → 2025-11-25)

Päivitettiin englanninkielistä sisältöä, jossa vanhempaa määritysversion versiota oli virheellisesti pidetty *voimassaolevana/viimeisimpänä* standardina ja suunnattiin linkit kanonisiin `modelcontextprotocol.io` -määrityspolkuihin:
- **05-AdvancedTopics/mcp-security/README.md**: Päivitettiin "Current Standard" -banneri, johdanto, ydinturvakäytännöt-otsikko, pakollisten vaatimusten otsikko, Microsoft Entra ID -osio, Viitteet & Resurssit -linkit ja päätösilmoitus (8 viitettä) versioon 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Päivitettiin Lisäresurssit -määritysversion linkki ja "Current Standard" -banneri versioon 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Korvattiin vanhentunut `2025-03-26` security-and-trust -linkki nykyisellä 2025-11-25 tietoturvaparhaiden käytäntöjen sivulla
- **03-GettingStarted/14-sampling/README.md**: Päivitettiin virallisen otanta-dokumentaation linkki versioon 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Päivitettiin nykyhetkisen MCP-määrityksen viittaus nykyhetkeen ja Lisäresurssit -määritysversion linkki versioon 2025-11-25 (historialliset SSE-poistomerkinnät jätettiin ennalleen tarkkuuden vuoksi)

#### Esimerkkien validointi nykyisillä SDK:illa

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ratkaisi `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` hyväksyttiin ilman tyyppivirheitä — olemassa olevat `McpServer`/`StdioServerTransport` API:t ovat edelleen käyttökelpoisia
- **Python (03-GettingStarted/01-first-server/solution/python)**: Testattiin eristetyssä `.venv`-ympäristössä `mcp[cli]` (1.27.2); `py_compile` onnistui ja `FastMCP.list_tools()` palautti oikein `add`- ja `subtract`-työkalut
- Vahvistettiin, että kaikki versioalueet `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) ratkaistaan siististi nykyiseen versioon `1.29.0` ilman rikkovia API-muutoksia

#### Riippuvuuksiin liittyvien määritteiden yhdenmukaistus (versiokuilujen sulkeminen)

Päivitettiin vanhentuneita SDK-riippuvuuksia siten, että jokainen esimerkki seuraa nykyistä MCP-julkaisua, vastaamaan koko repositorion käytäntöä:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Korotettiin `@modelcontextprotocol/sdk` versiosta `^1.8.0` → `>=1.26.0` ja päivitettiin vanhentunut `"updated for MCP 2025-06-18"` pakkauskuvaus muotoon `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ja **lab4/code/github_mcp_server/pyproject.toml**: Vaihdettiin täsmäversio `mcp==1.23.0` → `mcp>=1.26.0`; generoitiin molemmat `uv.lock` -tiedostot uudelleen (`uv lock`), jolloin lukitustiedostot osoittavat nykyiseen versioon `mcp 1.27.2` ja pysyvät synkronissa määritteiden kanssa

#### Oppimateriaalin aukkoanalyysi — Uusimman määrityksen ominaisuuksien kattavuus

Varmistettiin, että oppimateriaali kattaa jo kaikki MCP 2025-11-25:ssa esitellyt tai laajennetut perusominaisuudet, joten sisältöaukkoja ei ole:
- **Otanta (Sampling)**: Oppitunti 03-GettingStarted/14-sampling sekä 05-AdvancedTopics/mcp-sampling
- **Elicitation (mukaan lukien URL-tila)**: Dokumentoitu 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features
- **Roots (juuret)**: Dokumentoitu 00-Introduction, 01-CoreConcepts sekä 05-AdvancedTopics/mcp-root-contexts
- **Tehtävät (experimentaaliset, pitkään käynnissä olevat operaatiot)**: Dokumentoitu 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features
- **Työkalujen annotaatiot** (`readOnlyHint` / `destructiveHint`): Dokumentoitu 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features

### Turvallisuusparannukset ja riippuvuuksien haavoittuvuuksien korjaukset

Suoritettiin kattava turvallisuustarkastus kaikille riippuvuustiedostoille ja esimerkkikoodille, korjattiin kaikki raportoidut npm-varoitukset ja yksi kooditasoinen havainto. Korjauksien jälkeen `npm audit` ilmoittaa **0 haavoittuvuutta** kaikissa tarkastetuissa hakemistoissa.

#### npm-riippuvuuksien haavoittuvuudet (epäsuorat) — Korjattu

Tarkastettiin kaikki 15 tallennettua `package-lock.json` -tiedostoa. Haavoittuvuudet liittyivät epäsuoriin riippuvuuksiin, joita MCP Inspector -kehitystyökalu, OpenAI client ja MCP SDK käyttävät; kaikki on nyt ratkaistu rikkoutumatta esimerkkien toimivuutta:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ja **lab3/code/weather_mcp/inspector**: Korotettiin `@modelcontextprotocol/inspector` versiosta (`0.16.6` / `0.14.1` → `0.22.0`), joka poisti bundlatut ajurit `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ja `ws` varoitukset. Lisättiin npm:n `overrides`, joka pakottaa korjatun `shell-quote@1.8.4` -version poistamaan jäljellä olevan kriittisen varoituksen, jonka `concurrently` kantoi; uudelleengeneroitiin molemmat lukitustiedostot (nyt 0 haavoittuvuutta)
- **03-GettingStarted/samples/typescript**: `npm audit fix` päivitti epäsuoran `qs`- (kohtalainen) riippuvuuden korjatuksi versioksi
- **03-GettingStarted/samples/javascript**: `npm audit fix` päivitti epäsuoran `hono`- (kohtalainen) riippuvuuden korjatuksi versioksi
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` päivitti epäsuoran `form-data`- (korkea) riippuvuuden korjatuksi versioksi
- **03-GettingStarted/11-simple-auth/solution/typescript**: Luotiin puuttuva `package-lock.json` -tiedosto, jotta projekti on toistettavissa ja tarkastettavissa (0 haavoittuvuutta)

#### Kooditasoinen turvallisuuskorjaus (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Poistettiin `shell=True` `open_in_vscode` -työkalusta. Aiempi `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` salli shellin metamerkkien tulkitsemisen kansiopolussa `cmd.exe`:n kautta (komentoinjektion vektori). Tämä suorittaa nyt suoraan ratkaistun `Code.exe`:n kansiopolun kanssa argumenttina — ilman shelliä — mikä on toiminnallisesti vastaava ja turvallinen

#### Python-riippuvuuksien auditointi

- Tarkastettiin kaikki Python-vaatimukset `pip-audit` -työkalulla. `05-AdvancedTopics` ja `03-GettingStarted/samples/python` ilmoittivat **ei tunnettuja haavoittuvuuksia** (heidän `mcp` / `httpx` / `pydantic` / `python-dotenv` riippuvuudet johtavat nykyisiin korjattuihin versioihin)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` havaitsi epäsuoran riippuvuuden **`werkzeug` 3.1.1** kolmella `safe_join` Windowsin laitenimen palvelunestohyökkäysvaroituksella — `CVE-2025-66221`, `CVE-2026-21860` ja `CVE-2026-27199` (kaikki korjattu versiossa 3.1.6). Lisättiin selkeä turvallisuusrajoitus `werkzeug>=3.1.6`, jotta korjattu julkaisu valitaan; varmistettiin, että riippuvuus ratkeaa siististi `chainlit` / `mcp` / `semantic-kernel` pinon kanssa

### Tuotenimen uudelleenbrändäys

Päivitettiin kaikki oppimateriaalin sisällöt heijastamaan Microsoftin tuotemerkkiuudistusta:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Päivitettiin Discord-yhteisölinkki
- **AGENTS.md**: Päivitettiin Discord-palvelinviittaus
- **README.md**: Päivitettiin teknologiaympäristön viittaukset
- **study_guide.md**: Päivitettiin tapaustutkimusviittaukset
- **05-AdvancedTopics/README.md**: Päivitettiin Moduuli 5.13 otsikko ja kuvaus
- **05-AdvancedTopics/mcp-integration/README.md**: Päivitettiin osiootsikko ja kuvaus
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Päivitettiin koko moduulin otsikko ja sisältö
- **05-AdvancedTopics/mcp-security-entra/README.md**: Päivitettiin poikkiviittauslinkki
- **07-LessonsfromEarlyAdoption/README.md**: Päivitettiin tapaustutkimusviittaukset
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Päivitettiin kohdassa 9 otsikko, merkit ja ominaisuudet
- **08-BestPractices/README.md**: Päivitettiin Discord-yhteisölinkki
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Päivitettiin Discord-kanavaviittaus
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Päivitettiin mallin käyttöönoton viittaus
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Päivitettiin AI-palveluiden taulukko
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Päivitettiin resurssiviittaukset

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Päivitettiin pääoppimateriaalin viittaukset
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Päivitettiin moduulin nimi, yleiskatsaus ja kaikki moduulin otsikot
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Päivitettiin otsikko, oppimistavoitteet, asennusohjeet ja resurssit
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Päivitettiin otsikko, oppimistavoitteet, MCP-palvelinlista ja poikkiviittaukset
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Päivitettiin otsikko, merkit, esivaatimukset ja resurssit
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Päivitettiin Agent Builderin viittauksia ja palautelinkkiä
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Päivitettiin esivaatimuksia ja laajennusviittauksia

---

## 11. huhtikuuta 2026

### Uusi oppitunti, dokumentaation korjaukset ja riippuvuuspäivitykset

#### Uutta oppimateriaalisisältöä lisätty

**Moduuli 05 - Edistyneet aiheet**
- **Oppitunti 5.17: Vastakkainen moniagenttinen päättely MCP:llä** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Uusi kattava opas vastakkaisen väittelyn mallista moniagenttijärjestelmissä
  - Mermaid-arkkitehtuurikaavio: kaksi agenttia → jaettu MCP-palvelin → väittelyn tallenne → tuomari → tuomio
  - Jaettu MCP-työkalupalvelin (`web_search` + `run_python`) toteutettu Pythonilla ja TypeScriptillä
  - Vastakkaiset järjestelmäkehotukset (PUOLESTA / VASTAAN / Tuomari) eksplisiittisillä työkalun käyttövaatimuksilla
  - Väittelyn orkestroija Pythonilla, TypeScriptillä ja C#:lla, joka hallitsee kierrokset ja reitittää argumentit
  - MCP `ClientSession`-kaapelointi orkestroijalle todellisiin työkalukutsuihin
  - Käyttötapataulukko (harhojen havaitseminen, uhkamallinnus, API-suunnittelun tarkistus, tosiasiatarkistus, teknologian valinta)
  - Turvallisuusnäkökohdat: hiekkalaatikkoajo, työkalukutsujen hyväksymisen validointi, nopeusrajoitus, audit-lokit
  - Rakenteellinen harjoitus kolmella käytännön skenaariolla (koodikatselmointi, arkkitehtuuripäätös, sisällönvalvonta)

#### Dokumentaation korjaukset

**Moduuli 03 - Aloittaminen**
- **05-stdio-server/README.md**: Korjattiin keskeneräinen TypeScriptin stdio-palvelin-esimerkki — lisättiin puuttuvat kuljetinluonti (`new StdioServerTransport()`) ja `server.connect(transport)` -kutsu vastaamaan Python- ja .NET-esimerkkejä samassa osiossa
- **14-sampling/README.md**: Korjattiin kirjoitusvirhe — korjattu `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Oppimateriaalin päivitykset

**Pää-README.md**
- Lisättiin oppimateriaalutaulukkoon kohta 5.17 (Vastakkainen moniagenttinen päättely MCP:llä) suoraan linkillä uuteen oppituntiin

**05-AdvancedTopics/README.md**
- Lisättiin oppitunti 5.17 oppituntien taulukkoon

**study_guide.md**
- Lisättiin Vastakkainen moniagenttinen päättely -aihe miellekarttaan ja edistyneiden aiheiden kuvaustekstiin

#### Koodin ja turvallisuuden korjaukset

**Moduuli 05 - Vastakkaiset agentit (`mcp-adversarial-agents`)**
- **Turvapäivitys — komentoinjektion korjaus**: Korvattiin TypeScript-työkalussa `run_python` `execSync`-kuoren interpolointi `execFile` + `promisify` -käytöllä, mikä poistaa komentoinjektion riskin (LLM-ohjattu koodi välitetään nyt kirjaimellisena argv-elementtinä ilman kuoren väliintuloa)
- **MCP-työkalusilmukan kytkentä**: Päivitettiin Python-väittelyä orkestroiva komponentti käyttämään `AsyncAnthropic`-asiakasta (korvaten synkronisen esto-ominaisuuden `Anthropic`), välittämään live-`ClientSession` jokaiselle agenttikierrokselle, hakemaan työkalumääritelmät `session.list_tools()`-kutsulla jokaisella kierroksella, ja lähettämään `tool_use`-lohkoja `session.call_tool()`-kutsulla silmukassa, kunnes malli antaa lopullisen tekstivasteen

#### Riippuvuuspäivitykset

- Päivitetty `hono` versioon 4.12.12 useissa paketeissa (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Päivitetty `@hono/node-server` versiosta 1.19.11 versioon 1.19.13 TypeScript-paketeissa
- Päivitetty `cryptography` versiosta 46.0.5 versioon 46.0.7 Python-paketeissa (10-StreamliningAIWorkflows laboratoriot 3 ja 4)
- Päivitetty `lodash` versiosta 4.17.23 versioon 4.18.1 10-StreamliningAIWorkflows inspectorissa

#### Käännöksiä

- Synkronoitu yli 48 kielen käännökset uusimpien lähdemuutosten mukaisesti (i18n-päivitys)

---

## 5. helmikuuta 2026

### Koko repositorion validointi- ja navigointiparannukset

#### Uutta opetussisältöä lisätty

**Moduuli 03 - Aloittaminen**
- **12-mcp-hosts/README.md**: Uusi kattava opas MCP-isäntien pystytykseen
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf -konfiguraatioesimerkit
  - JSON-konfiguraatiomallit kaikille tärkeimmille isännille
  - Kuljetustyyppien vertailutaulukko (stdio, SSE/HTTP, WebSocket)
  - Yleisten yhteysongelmien vianmääritys
  - Turvallisuuskäytännöt isäntien konfigurointiin

- **13-mcp-inspector/README.md**: Uusi vianetsintäopas MCP Inspectorille
  - Asennustavat (npx, npm global, lähdekoodista)
  - Yhteyden muodostus palvelimiin stdio- ja HTTP/SSE-yhteyksillä
  - Työkalujen, resurssien ja kehoteprosessien testaaminen
  - VS Code -integraatio MCP Inspectoriin
  - Yleisiä vianetsintätapauksia ratkaisujen kanssa

**Moduuli 04 - Käytännön toteutus**
- **pagination/README.md**: Uusi ohje sivutuksen toteuttamiseen
  - Kursoripohjaiset sivutusmallit Pythonissa, TypeScriptissä, Javassa
  - Asiakaspuolen sivutuksen hallinta
  - Kursorin suunnittelustrategiat (läpinäkymätön vs. rakenteinen)
  - Suorituskyvyn optimointisuositukset

**Moduuli 05 - Edistyneet aiheet**
- **mcp-protocol-features/README.md**: Uusi protokollan ominaisuuksien syväluotaus
  - Edistymisilmoitusten toteutus
  - Pyyntöjen peruutusmallit
  - Resurssipohjat URI-kuvioilla
  - Palvelimen elinkaaren hallinta
  - Lokitustason säätö
  - Virheenkäsittelymallit JSON-RPC-koodeilla

#### Navigointikorjaukset (yli 24 tiedostoa päivitetty)

**Päämoduulin README:t**
 Linkittävät nyt sekä ensimmäiselle oppitunnille ETTÄ seuraavalle moduulille

**02-Security-alitiedostot**
- Kaikissa 5 lisätyssä turvallisuusasiakirjassa on nyt "Mikä seuraavaksi" -navigointi:

**09-CaseStudy-tiedostot**
- Kaikissa tapaustutkimustiedostoissa on nyt peräkkäinen navigointi:

**10-StreamliningAI-laboratoriot**
Lisätty Mikä seuraavaksi -osio moduulin 10 yleiskatsaukseen ja moduuliin 11

#### Koodin ja sisällön korjaukset

**SDK- ja riippuvuuspäivitykset**
Korjattu tyhjä openai-versio `^4.95.0` versioon
Päivitetty SDK versiosta `^1.8.0` versioon `>=1.26.0`
Päivitetty mcp-versiokiinnikkeet versioon `>=1.26.0`

**Koodikorjaukset**
Korjattu virheellinen malli `gpt-4o-mini` muotoon `gpt-4.1-mini`

**Sisällön korjaukset**
Korjattu rikkinäinen linkki `READMEmd` → `README.md`, korjattu opetussuunnitelman otsikko `Module 1-3` → `Module 0-3`, korjattu kirjainkoolla eroteltu polku
Poistettu vioittunut kopio tapaustutkimuksesta 5

**Aloittelijan opastusparannukset**
Lisätty asianmukainen johdanto, oppimistavoitteet ja ennakkovaatimukset aloittelijoille

#### Opetussuunnitelman päivitykset

**Pää-README.md**
- Lisätty merkinnät 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) opetussuunnitelman taulukkoon

**Moduulien README:t**
Lisätty oppitunnit 12 ja 13 oppituntilistaan
Lisätty Käytännön oppaat -osio sivutuslinkillä
Lisätty oppitunnit 5.15 (Custom Transport) ja 5.16 (Protocol Features)

**study_guide.md**
- Päivitetty miellekartta kaikilla uusilla aiheilla: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## 28. tammikuuta 2026

### MCP-määrityksen 2025-11-25 noudattavuuden tarkastus

#### Ydinkäsitteiden parannukset (01-CoreConcepts/)
- **Uusi asiakkaan primitiivi - Roots**: Lisätty kattava dokumentaatio Roots-asiakasprimitiivistä, joka mahdollistaa palvelimille tiedostojärjestelmän rajojen ja käyttöoikeuksien ymmärtämisen
- **Työkalujen annotaatiot**: Lisätty dokumentaatio työkalujen käyttäytymisen annotaatioista (`readOnlyHint`, `destructiveHint`) parempiin työkalun suorituspäätöksiin
- **Työkalujen kutsuminen otannassa**: Päivitetty Otanta-dokumentaatiota sisältämään `tools` ja `toolChoice`-parametrit mallipohjaiseen työkalun kutsumiseen otantapyyntöjen aikana
- **URL-tilan kutsuminen**: Lisätty dokumentaatio URL-pohjaisesta ulkoisten web-interaktioiden käynnistämisestä palvelimen toimesta
- **Tehtävät (kokeellinen)**: Lisätty uusi osio, joka dokumentoi kokeellisen Tasks-ominaisuuden kestävien suorituskelmuun ja tuloksen viivästettyyn hakuun
- **Kuvakkeiden tuki**: Merkattu, että työkalut, resurssit, resurssipohjat ja kehotteet voivat nyt sisältää kuvakkeita lisätietona

#### Dokumentaation päivitykset
- **README.md**: Lisätty MCP-määrityksen 2025-11-25 versioviite ja päivämääräperusteinen versiointi selitys
- **study_guide.md**: Päivitetty opetussuunnitelmakarttaa sisältämään Tehtävät ja Työkalujen annotaatiot ydinajatusosiossa; päivitetty dokumentin aikaleima

#### Määrityksen noudattavuuden tarkistus
- **Protokollaversion tarkistus**: Varmistettu, että kaikki dokumentaatiot viittaavat nykyiseen MCP-määritykseen 2025-11-25
- **Arkkitehtuurin yhteensopivuus**: Varmistettu kaksi-kerroksisen arkkitehtuurin (Data Layer + Transport Layer) dokumentoinnin oikeellisuus
- **Primitiivien dokumentaatio**: Tarkistettu palvelinprimitiivit (Resources, Prompts, Tools) ja asiakasprimitiivit (Sampling, Elicitation, Logging, Roots)
- **Kuljetusmekanismit**: Tarkistettu STDIO- ja Streamable HTTP -kuljetuksen dokumentaation oikeellisuus
- **Turvaohjeistus**: Varmentuettu nykyisten MCP-turvakäytäntöjen mukaista dokumentaatiota

#### Tärkeitä MCP 2025-11-25 ominaisuuksia dokumentoitu
- **OpenID Connect Discovery**: Tunnistettu autentikointipalvelimen löytäminen OIDC:n kautta
- **OAuth-asiakkaan tunnisten metadata-dokumentit**: Suositeltu asiakasrekisteröintimekanismi
- **JSON Schema 2020-12**: MCP-skeemojen oletusdialekti
- **SDK-tasojärjestelmä**: Muodollistettu vaatimus SDK-ominaisuustuen ja ylläpidon tasoille
- **Governance-rakenne**: Virallistettu MCP:n työ- ja intressiryhmät hallinnossa

### Turvadokumentaation suuri päivitys (02-Security/)

#### MCP Security Summit Workshop (Sherpa) -integraatio
- **Uusi käytännön koulutusmateriaali**: Lisätty kokonaisvaltainen integraatio [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) -koulutukseen kaikkien turvadokumenttien yhteyteen
- **Retkireitin kattavuus**: Dokumentoitu täydellinen leiristä toiseen eteneminen Base Campista Summitille
- **OWASP-yhteensopivuus**: Kaikki turvaohjeistukset vastaavat OWASP MCP Azure Security Guide -riskiluokitusta

#### OWASP MCP Top 10 -integraatio
- **Uusi osio**: Lisätty OWASP MCP Top 10 -turvariskitaulukko ja Azure-suojaustoimenpiteet pääturvadokumenttiin
- **Riskipohjainen dokumentaatio**: Päivitetty mcp-security-controls-2025.md sisällyttämään OWASP MCP -riskiviittaukset kutakin turva-aluetta varten
- **Viitearkkitehtuuri**: Linkitetty OWASP MCP Azure Security Guide -viitearkkitehtuuriin ja toteutusmalleihin

#### Päivitetyt turvatiedostot
- **README.md**: Lisätty Sherpa-työpajan yleiskatsaus, retkireittitaulukko, OWASP MCP Top 10 -riskien yhteenveto ja käytännön koulutusosio
- **mcp-security-controls-2025.md**: Päivitetty helmikuuhun 2026, lisätty OWASP-riskiviittaukset (MCP01-MCP08), korjattu määrityksen version epäjohdonmukaisuus
- **mcp-security-best-practices-2025.md**: Lisätty Sherpa- ja OWASP-resurssi-osio, päivitetty aikaleima
- **mcp-best-practices.md**: Lisätty käytännön koulutusosio Sherpa- ja OWASP-linkkeineen
- **azure-content-safety-implementation.md**: Lisätty OWASP MCP06 -viittaus, Sherpa Leiri 3 -yhteensopivuus, ja lisäresurssiosio

#### Uudet resurssilinkit
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Yksittäiset OWASP MCP riskisivut (MCP01-MCP10)

### Kokonaistoiminto opetussuunnitelmassa MCP-määrityksen 2025-11-25 mukaisesti

#### Moduuli 03 - Aloittaminen
- **SDK-dokumentaatio**: Lisätty Go SDK viralliseen SDK-listaan; päivitetty kaikki SDK-viittaukset vastaamaan MCP Specification 2025-11-25 -määritelmää
- **Kuljetuksen selvennys**: Päivitetty STDIO- ja HTTP Stream -kuljetuksen kuvaukset sisältämään selkeät määritysviitteet

#### Moduuli 04 - Käytännön toteutus
- **SDK-päivitykset**: Lisätty Go SDK; päivitetty SDK-lista määrityksen version viiteellä
- **Valtuutusmäärittely**: Päivitetty MCP Authorization -määrityksen linkki nykyiseen 2025-11-25 versioon

#### Moduuli 05 - Edistyneet aiheet
- **Uudet ominaisuudet**: Lisätty huomautus uusista MCP-määrityksen 2025-11-25 ominaisuuksista (Tehtävät, Työkalujen annotaatiot, URL-tilan kutsuminen, Roots)
- **Turvaresurssit**: Lisätty OWASP MCP Top 10 ja Sherpa-työpaja lisäresurssien linkkeihin

#### Moduuli 06 - Yhteisön panokset
- **SDK-lista**: Lisätty Swift ja Rust SDK:t; päivitetty määrityslinkki 2025-11-25 versioon
- **Määrityksen linkki**: Päivitetty MCP Specification -linkki suoraan määrityksen URL-osoitteeseen

#### Moduuli 07 - Varhaisen omaksumisen opit
- **Resurssipäivitykset**: Lisätty MCP Specification 2025-11-25 ja OWASP MCP Top 10 lisäresursseihin

#### Moduuli 08 - Hyvät käytännöt
- **Määritysversio**: Päivitetty MCP Specification -viittaus 2025-11-25 versioon
- **Turvaresurssit**: Lisätty OWASP MCP Top 10 ja Sherpa-työpaja lisäresurssilinkkeihin

#### Moduuli 10 - AI-työnkulkujen virtaviivaistaminen
- **Merkinnän päivitys**: Vaihdettu MCP-version merkki SDK-versiosta (1.9.3) määritysversioon (2025-11-25)
- **Resurssilinkit**: Päivitetty MCP Specification -linkki; lisätty OWASP MCP Top 10

#### Moduuli 11 - MCP-palvelimen käytännön laboratoriot
- **Määrityksen viite**: Päivitetty MCP Specification -linkki 2025-11-25 versioon
- **Turvaresurssit**: Lisätty OWASP MCP Top 10 virallisiin resursseihin

## 18. joulukuuta 2025

### Turvadokumentaation päivitys - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Määritysversiopäivitys
- **Protokollaversion päivitys**: Päivitetty viittaamaan uusimpaan MCP Specification 2025-11-25 (julkaistu 25. marraskuuta 2025)
  - Päivitetty kaikki määritysversioviittaukset 2025-06-18 → 2025-11-25
  - Päivitetty dokumentin päivämääräviitteet 18. elokuuta 2025 → 18. joulukuuta 2025
  - Varmistettu, että kaikki määritys-URL-osoitteet osoittavat nykyiseen dokumentaatioon
- **Sisällön validointi**: Kattava varmennus turvaparhaiden käytäntöjen ajantasaisuudesta
  - **Microsoft Security Solutions**: Tarkistettu nykyiset termit ja linkit Prompt Shieldsille (aiemmin "Jailbreak risk detection"), Azure Content Safetylle, Microsoft Entra ID:lle ja Azure Key Vaultille
  - **OAuth 2.1 -turvallisuus**: Varmistettu yhdenmukaisuus uusimpiin OAuth-turvakäytäntöihin
  - **OWASP-standardit**: Tarkistettu että OWASP Top 10 -viitteet LLM:ille ovat edelleen ajantasaiset
  - **Azure-palvelut**: Tarkistettu kaikki Microsoft Azure -dokumentaatioiden ja parhaiden käytäntöjen linkit ja sisältö
- **Standardien noudattavuus**: Kaikki viitatut turvastandardit ovat ajan tasalla
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure turvallisuus- ja vaatimustenmukaisuuskehykset
- **Toteutusresurssit**: Tarkistettu kaikki toteutusopaslinkit ja materiaalit
  - Azure API Managementin todennusmallit
  - Microsoft Entra ID -integraatio-oppaat
  - Azure Key Vaultin salaisuuksien hallinta
  - DevSecOps-pipelinejen ja valvonnan ratkaisut

### Dokumentaation laadunvarmistus
- **Määrityksen noudattavuus**: Varmistettu, että kaikki pakolliset MCP-turvavaatimukset (MUST/MUST NOT) vastaavat uusinta määritystä
- **Resurssien ajantasaisuus**: Tarkistettu kaikki ulkoiset linkit Microsoftin dokumentaatioon, turvastandardeihin ja toteutusoppaisiin
- **Parhaiden käytäntöjen kattavuus**: Varmistettu kattava käsittely autentikaatiosta, valtuutuksesta, tekoälykohtaisista uhkista, toimitusketjun turvallisuudesta ja yritysmallien hyödyntämisestä

## 6. lokakuuta 2025

### Aloittelijan osion laajennus – Edistynyt palvelimen käyttö ja yksinkertainen autentikointi

#### Edistynyt palvelimen käyttö (03-GettingStarted/10-advanced)
- **Uusi luku lisätty**: Lisätty kattava opas edistyneestä MCP-palvelimen käytöstä, joka kattaa sekä tavallisen että matalamman tason palvelinarkkitehtuurit.
  - **Tavallinen vs. matalan tason palvelin**: Yksityiskohtainen vertailu ja koodiesimerkkejä Pythonilla ja TypeScriptilä molemmille lähestymistavoille.
  - **Handler-pohjainen suunnittelu**: Selitys handler-pohjaisesta työkalujen/resurssien/kehotteiden hallinnasta skaalautuvissa, joustavissa palvelinratkaisuissa.
  - **Käytännön mallit**: Todellisia käyttötapauksia, joissa matalan tason palvelinmallit ovat hyödyllisiä edistyneisiin ominaisuuksiin ja arkkitehtuuriin.

#### Yksinkertainen todennus (03-GettingStarted/11-simple-auth)
- **Uusi luku lisätty**: Askelsarjan ohje yksinkertaisen todennuksen toteuttamiseen MCP-palvelimissa.
  - **Todennuksen käsitteet**: Selkeä selitys todennuksen ja valtuutuksen eroista sekä tunnistetietojen käsittelystä.
  - **Perustason todennuksen toteutus**: Middleware-pohjaiset todennuskäytännöt Pythonilla (Starlette) ja TypeScriptillä (Express), koodiesimerkeillä.
  - **Edistyneempään tietoturvaan eteneminen**: Opastus yksinkertaisesta todennuksesta OAuth 2.1:een ja RBAC:iin, viitteillä edistyneisiin tietoturvakennoihin.

Nämä lisäykset tarjoavat käytännönläheistä ohjausta vankempien, turvallisempien ja joustavampien MCP-palvelintoteutusten rakentamiseen, yhdistäen perustavaa laatua olevat käsitteet edistyneisiin tuotantokäytäntöihin.

## 29. syyskuuta 2025

### MCP-palvelimen tietokannaintegraatiolaboratoriot – Kattava käytännön oppimispolku

#### 11-MCPServerHandsOnLabs – Uusi täydellinen tietokannan integrointikoulutus
- **Täydellinen 13-laboratoriokurssi**: Lisätty kattava käytännön kurssi tuotantovalmiiden MCP-palvelimien rakentamiseen PostgreSQL-tietokantaintegraatiolla
  - **Todellinen käyttötapaus**: Zava Retail -analytiikan käyttötapaus, jossa esitellään yritystason malleja
  - **Rakenneoppimisen eteneminen**:
    - **Laboratoriot 00–03: Perusteet** – Johdanto, ydinararkkitehtuuri, tietoturva ja monivuokraus sekä ympäristön asennus
    - **Laboratoriot 04–06: MCP-palvelimen rakentaminen** – Tietokannan suunnittelu ja skeema, MCP-palvelintoteutus, työkalujen kehitys
    - **Laboratoriot 07–09: Edistyneet ominaisuudet** – Semanttisen haun integrointi, testaus ja virheenkorjaus, VS Coden integrointi
    - **Laboratoriot 10–12: Tuotanto ja parhaat käytännöt** – Julkaisustrategiat, valvonta ja havaittavuus, parhaat käytännöt ja optimointi
  - **Yritysteknologiat**: FastMCP-kehys, PostgreSQL pgvectorillä, Azure OpenAI -upotukset, Azure Container Apps, Application Insights
  - **Edistyneet ominaisuudet**: Rivitason turvallisuus (RLS), semanttinen haku, monivuokrajuurisyys, vektorituetut upotukset, reaaliaikainen valvonta

#### Terminologian yhdenmukaistaminen – moduulista laboratorioksi
- **Kattava dokumentaatiopäivitys**: Kaikkien 11-MCPServerHandsOnLabs -kansion README-tiedostojen järjestelmällinen päivitys "Lab"-terminologian käyttöön "Module"-termin sijaan
  - **Osioiden otsikot**: Muutettu "What This Module Covers" muotoon "What This Lab Covers" kaikissa 13 laboratoriossa
  - **Sisällön kuvaus**: Korvattu "This module provides..." muotoon "This lab provides..." koko dokumentaatiossa
  - **Oppimistavoitteet**: Päivitetty "By the end of this module..." muotoon "By the end of this lab..."
  - **Navigointilinkit**: Muunnettu kaikki "Module XX:"-viittaukset muotoon "Lab XX:" ristiviittausten ja navigoinnin yhteydessä
  - **Suorituksen seuranta**: Päivitetty "After completing this module..." muotoon "After completing this lab..."
  - **Tekniset viittaukset säilytetty**: Python-moduuliviittaukset säilytetty konfiguraatiotiedostoissa (esim. `"module": "mcp_server.main"`)

#### Opasoppaan parannus (study_guide.md)
- **Visuaalinen opetussuunnitelmakartta**: Lisätty uusi "11. Database Integration Labs" -osio, joka esittää kattavasti laboratoriorakenteen
- **Repositorion rakenne**: Päivitetty kymmenestä yksikköosasta yhdentoista pääosaan, sisältää yksityiskohtaisen 11-MCPServerHandsOnLabs -kuvauksen
- **Oppimispolkuneuvonta**: Parannettu navigointiohjeet kattamaan osiot 00–11
- **Teknologiakattavuus**: Lisätty FastMCP, PostgreSQL ja Azure-palvelujen integrointitiedot
- **Oppimistulokset**: Korostettu tuotantovalmiiden palvelinten kehitystä, tietokantaintegraatiomalleja ja yritystason tietoturvaa

#### Pää-README-rakenteen parannus
- **Lab-pohjainen terminologia**: Päivitetty 11-MCPServerHandsOnLabs -kansion pää-README.md käyttämään yhdenmukaista "Lab"-rakennetta
- **Oppimispolun järjestys**: Selkeä eteneminen perustakäsitteistä edistyneisiin toteutuksiin ja tuotantojulkaisuun
- **Käytännön painotus**: Korostettu käytännönläheistä oppimista yritystason mallien ja teknologioiden kanssa

### Dokumentaation laadun ja yhdenmukaisuuden parannukset
- **Käytännön oppimisen painotus**: Vahvistettu käytännön laboratoriopohjaista lähestymistapaa koko dokumentaatiossa
- **Yritysratkaisuissa käytetyt mallit**: Korostettu tuotantovalmiita toteutuksia ja yritystason tietoturvakysymyksiä
- **Teknologian integrointi**: Kattava kuvaus moderneista Azure-palveluista ja tekoälyintegraatiomalleista
- **Oppimisen eteneminen**: Selkeä, jäsennelty polku peruskäsitteistä tuotantoon

## 26. syyskuuta 2025

### Tapaustutkimusten laajennus – GitHub MCP Registry -integraatio

#### Tapaustutkimukset (09-CaseStudy/) – Ekosysteemin kehityksen painopiste
- **README.md**: Merkittävä laajennus kattavalla GitHub MCP Registry -tapaustutkimuksella
  - **GitHub MCP Registry -tapaustutkimus**: Uusi kattava tapaustutkimus GitHubin MCP Registry -lanseerauksesta syyskuussa 2025
    - **Ongelman analyysi**: Yksityiskohtainen analyysi hajanaisesta MCP-palvelintunnistuksesta ja käyttöönoton haasteista
    - **Ratkaisuarkkitehtuuri**: GitHubin keskitetty rekisteröintimalli yhden klikkauksen VS Code -asennuksella
    - **Liiketoiminnan vaikutus**: Mitattavissa olevat parannukset kehittäjien perehdytyksessä ja tuottavuudessa
    - **Strateginen arvo**: Painotus modulaarisessa agenttien käyttöönotossa ja ristyökalujen yhteensopivuudessa
    - **Ekosysteemin kehitys**: Asemoitu perustavaksi alustaksi agenttipohjaisille integraatioille
  - **Parannettu tapaustutkimusten rakenne**: Päivitetty kaikki seitsemän tapaustutkimusta yhdenmukaisella muotoilulla ja kattavilla kuvauksilla
    - Azure AI -matkailuagentit: Moniagenttien orkestroinnin painotus
    - Azure DevOps -integraatio: Työnkulkujen automaation keskittyminen
    - Reaaliaikainen dokumentaation hakeminen: Python-konsoliasiakkaan toteutus
    - Interaktiivinen opintosuunnitelman generaattori: Chainlit-keskusteluverkkosovellus
    - Muokkaimen sisäinen dokumentaatio: VS Code ja GitHub Copilot -integraatio
    - Azure API Management: Yritys-API-integraatiomallit
    - GitHub MCP Registry: Ekosysteemin kehitys ja yhteisöalusta
  - **Kattava loppuyhteenveto**: Uudelleenkirjoitettu loppuosio, joka korostaa seitsemää tapaustutkimusta eri MCP-toteutuksen osa-alueilla
    - Yritysintegraatio, moniagenttien orkestrointi, kehittäjätuottavuus
    - Ekosysteemin kehitys, koulutussovellukset -luokittelut
    - Parannetut näkemykset arkkitehtuurimalleista, toteutusstrategioista ja parhaista käytännöistä
    - Korostus MCP:n kypsyydestä tuotantovalmiina protokollana

#### Opasoppaan päivitykset (study_guide.md)
- **Visuaalinen opetussuunnitelmakartta**: Päivitetty miellekartta sisältämään GitHub MCP Registry tapaustutkimusten osiossa
- **Tapaustutkimusten kuvaus**: Parannettu geneerisistä kuvauksista seitsemän kattavan tapaustutkimuksen yksityiskohtaiseen erittelyyn
- **Repositorion rakenne**: Päivitetty osio 10 kattamaan kattavat tapaustutkimukset yksityiskohtaisilla toteutustiedoilla
- **Muutoslokin integrointi**: Lisätty 26. syyskuuta 2025 -merkintä dokumentoimaan GitHub MCP Registryn lisääminen ja tapaustutkimusten parannukset
- **Päivämääräpäivitykset**: Päivitetty alatunnisteen aikaleima vastaamaan uusinta versiota (26. syyskuuta 2025)

### Dokumentaation laadun parannukset
- **Yhdenmukaisuuden vahvistaminen**: Standarditoitu tapaustutkimusten muotoilu ja rakenne kaikissa seitsemässä esimerkissä
- **Kattava laajuus**: Tapaustutkimukset kattavat nyt yritys-, kehittäjä- ja ekosysteemikehityksen skenaariot
- **Strateginen asemoituminen**: Parempi painotus MCP:hen perustavana agenttipohjaisten järjestelmien alustana
- **Resurssien integrointi**: Päivitetyt lisäresurssit sisältävät GitHub MCP Registry -linkin

## 15. syyskuuta 2025

### Edistyneet aiheet – Räätälöidyt siirrot ja kontekstisuunnittelu

#### MCP räätälöidyt siirrot (05-AdvancedTopics/mcp-transport/) – Uusi edistyneen toteutuksen opas
- **README.md**: Täydellinen opas räätälöityjen MCP-siirtomekanismien toteutukseen
  - **Azure Event Grid -siirto**: Kattava palvelimettoman tapahtumapohjaisen siirron toteutus
    - C#, TypeScript ja Python-esimerkkejä Azure Functions -integraatiolla
    - Tapahtumaohjatun arkkitehtuurin mallit skaalautuviin MCP-ratkaisuihin
    - Webhookin vastaanottajat ja push-pohjainen viestinkäsittely
  - **Azure Event Hubs -siirto**: Suurikapasiteettinen suoratoistosiirron toteutus
    - Reaaliaikaiset suoratoistomahdollisuudet alhaisen viiveen skenaarioihin
    - Osiointi- ja checkpoint-hallintastrategiat
    - Viestipakkaus ja suorituskyvyn optimointi
  - **Yritysintegraatiomallit**: Tuotantovalmiit arkkitehtuuriesimerkit
    - Hajautettu MCP-käsittely useiden Azure Functionien välillä
    - Hybridisiirtoarkkitehtuurit, joissa on useita siirtotyyppejä
    - Viestien kestävyyden, luotettavuuden ja virheenkäsittelyn strategiat
  - **Tietoturva ja valvonta**: Azure Key Vault -integraatio ja havaittavuusmallit
    - Hallinnoitu identiteetti -todennus ja vähimmän etuoikeuden käyttö
    - Application Insights -telemetria ja suorituskyvyn valvonta
    - Kytkinpiirit ja vikansietomallit
  - **Testauskehykset**: Kattavat testausstrategiat räätälöidyille siirroille
    - Yksikkötestaus testidubbleilla ja mokkauskehyksillä
    - Integraatiotestaus Azure Test Containers -ympäristössä
    - Suorituskyky- ja kuormitustestaus

#### Kontekstisuunnittelu (05-AdvancedTopics/mcp-contextengineering/) – Uusi nouseva tekoälyala
- **README.md**: Kattava tutkimus kontekstisuunnittelusta nousevana alana
  - **Keskeiset periaatteet**: Täydellinen kontekstijako, toiminnan päätöksenteko ja kontekstin ikkunanhallinta
  - **MCP-protokollan yhdenmukaisuus**: Miten MCP-suunnittelu käsittelee kontekstisuunnittelun haasteita
    - Kontekstin ikkunarajoitukset ja progressiivisen latauksen strategiat
    - Merkityksen määritys ja dynaaminen kontekstinhakutekniikka
    - Monimuotoisen kontekstin käsittely ja turvallisuusnäkökulmat
  - **Toteutuslähestymistavat**: Yksisäikeinen vs. moniagenttinen arkkitehtuuri
    - Kontekstin paloittelu ja priorisointitekniikat
    - Progressiivinen kontekstin lataus ja pakkausmenetelmät
    - Kerrostetut konstekstitavat ja hakukäytännön optimointi
  - **Mittauskehys**: Nousevat mittarit kontekstin toimivuuden arviointiin
    - Syötteen tehokkuus, suorituskyky, laatu ja käyttäjäkokemus
    - Kokeelliset lähestymistavat kontekstin optimointiin
    - Virheanalyysit ja parantamismetodit

#### Opetussuunnitelman navigointipäivitykset (README.md)
- **Parannettu moduulirakenne**: Päivitetty opetussuunnitelman taulukko sisältämään uudet edistyneet aiheet
  - Lisätty Kontekstisuunnittelu (5.14) ja Räätälöity siirto (5.15) -kohdat
  - Yhdenmukainen muotoilu ja navigointilinkit kaikissa moduuleissa
  - Päivitetyt kuvaukset nykyisen sisältölaajuuden mukaisiksi

### Hakemistorakenteen parannukset
- **Nimien yhdenmukaistaminen**: "mcp transport" muutettu muotoon "mcp-transport" yhdenmukaisuuden vuoksi muiden edistyneiden aiheiden kansioiden kanssa
- **Sisällön järjestely**: Kaikki 05-AdvancedTopics -kansiot noudattavat nyt yhdenmukaista nimikäytäntöä (mcp-[aihe])

### Dokumentaation laadun parannukset
- **MCP-määritysten yhdenmukaisuus**: Kaikki uusi sisältö viittaa MCP Specification 2025-06-18 -versioon
- **Monikieliset esimerkit**: Kattavat koodiesimerkit C#:llä, TypeScriptilä ja Pythonilla
- **Yrityspainotus**: Tuotantovalmiit mallit ja Azure-pilvijärjestelmien integrointi kauttaaltaan
- **Visuaalinen dokumentaatio**: Mermaid-kaaviot arkkitehtuurin ja toimintavirtojen havainnollistamiseksi

## 18. elokuuta 2025

### Dokumentaation kattava päivitys – MCP 2025-06-18 -standardit

#### MCP-tietoturvan parhaat käytännöt (02-Security/) – Täydellinen modernisointi
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Täydellinen uudelleenkirjoitus MCP Specification 2025-06-18 mukaisesti
  - **Pakolliset vaatimukset**: Lisätty selkeät PAKOLLISET / EI SAA -vaatimukset virallisesta määritelmästä näkyvin merkinnöin
  - **12 ydinturvakäytäntöä**: Rakenteen muutos 15 kohdan listasta kattaviin turva-alueisiin
    - Tunnistetietoturva ja todennus ulkoisen identiteetin tarjoajan integroinnilla
    - Istunnon hallinta ja siirtoturva salausvaatimuksin
    - Tekoälyyn liittyvät uhkaympäristöt Microsoft Prompt Shields -integraation avulla
    - Käyttöoikeuksien hallinta vähimmän etuoikeuden periaatteella
    - Sisällön turvallisuus ja valvonta Azure Content Safetyn avulla
    - Toimitusketjun turvallisuus komponenttivarmennuksin
    - OAuth-turva ja "Confused Deputy" -hyökkäysten esto PKCE-menetelmällä
    - Tapahtumien hallinta ja palautuminen automaattisilla ominaisuuksilla
    - Säännösten noudattaminen ja hallintakehykset
    - Edistyneet turvallisuussäännöt ja zero trust -arkkitehtuuri
    - Microsoftin tietoturvaekosysteemin integrointi (Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security)
    - Jatkuva tietoturvan kehitys adaptiivisilla käytännöillä
  - **Microsoftin tietoturvaratkaisut**: Parannettua ohjeistusta Prompt Shieldsin, Azure Content Safetyn, Entra ID:n ja GitHub Advanced Securityn integrointiin
  - **Toteutusresurssit**: Luokiteltu linkkikokoelma virallisesta MCP-dokumentaatiosta, Microsoftin tietoturvaratkaisuista, turvastandardeista ja oppaista

#### Edistyneet tietoturvakontrollit (02-Security/) – Yritystason toteutus
- **MCP-SECURITY-CONTROLS-2025.md**: Täydellinen uudistaminen kattavalla yritystason tietoturvakehyksellä
  - **9 kattavaa turva-aluetta**: Laajennettu perusohjaimista yksityiskohtaiseen yrityskehykseen
    - Edistynyt todennus ja valtuutus Microsoft Entra ID -integraatiolla
    - Tunnistetietoturva ja anti-passthrough-kontrollit kattavilla validoinneilla
    - Istuntoturvakontrollit kaappausten estoon
    - Tekoälyyn kohdistuvat turvakontrollit, esim. kehotteiden injektoinnin ja työkalumyrkytyksen esto
    - "Confused Deputy" -hyökkäyksen estäminen OAuth-välitysturvalla
    - Työkalujen suorittamisen turvaaminen hiekkalaatikoilla ja eristämisellä
    - Toimitusketjun turvakontrollit riippuvuuksien tarkistuksin
    - Valvonta- ja havaitsemiskontrollit SIEM-integraatiolla
    - Tapahtumien hallinta ja palautuminen automatisoiduilla ominaisuuksilla
  - **Toteutusesimerkit**: Lisätty yksityiskohtaiset YAML-konfiguraatio- ja koodiesimerkit
  - **Microsoft-ratkaisujen integraatio**: Kattava kattaus Azure-tietoturvapalveluista, GitHub Advanced Securitystä ja yritystason identiteetin hallinnasta

#### Edistyneiden aiheiden tietoturva (05-AdvancedTopics/mcp-security/) – Tuotantovalmiit toteutukset
- **README.md**: Täydellinen uudelleenkirjoitus yritystason tietoturvatoteutukselle
  - **Nykyisen spesifikaation mukaisuus**: Päivitetty MCP Specification 2025-06-18 mukaisesti pakollisine tietoturvavaatimuksineen
  - **Parannettu todennus**: Microsoft Entra ID -integraatio kattavilla .NET- ja Java Spring Security -esimerkeillä
  - **AI-tietoturvaintegraatio**: Microsoft Prompt Shieldsin ja Azure Content Safetyn käyttöönotto yksityiskohtaisilla Python-esimerkeillä
  - **Edistyneet uhkien torjunta**: Kattavat toteutusesimerkit
    - "Confused Deputy" -hyökkäyksen estoon PKCE:llä ja käyttäjän suostumuksen validoinnilla
    - Tunnistetietojen läpiviennin esto kohderyhmävalidoinnilla ja turvallisella tunnistetietojen hallinnalla
    - Istunnon kaappauksen estäminen kryptografisella sitomisella ja käyttäytymisanalyysillä
  - **Yritysturvallisuuden integrointi**: Azure Application Insights -valvonta, uhkien tunnistusputket ja toimitusketjun suojaus
  - **Toteutuslista**: Selkeä pakollisten ja suositeltujen suojausohjausten erottelu Microsoftin turvallisuus-ekosysteemin hyödyillä

### Dokumentaation laatu ja standardien noudattaminen
- **Määrittelyviitteet**: Kaikkien viitteiden päivittäminen nykyiseen MCP-määrittelyyn 2025-06-18
- **Microsoftin turvallisuus-ekosysteemi**: Parannettu integrointi kaikissa turvaohjeissa
- **Käytännön toteutus**: Yksityiskohtaiset koodiesimerkit .NET:ssä, Javassa ja Pythonissa yrityskuvioilla
- **Resurssien organisointi**: Laaja virallisen dokumentaation, turvallisuusstandardien ja toteutusoppaiden luokitus
- **Visuaaliset ilmaisimet**: Selkeä merkintä pakollisille vaatimuksille vs. suositelluille käytännöille


#### Ydinkäsitteet (01-CoreConcepts/) - Täydellinen uudistus
- **Protokollaversion päivitys**: Viittaus päivitetty nykyiseen MCP-määrittelyyn 2025-06-18 päivämääräpohjaisella versioinnilla (VVVV-KK-PP-muoto)
- **Arkkitehtuurin tarkennus**: Parannetut kuvaukset Hosteista, Klienteistä ja Palvelimista nykyisen MCP-arkkitehtuurin mukaisesti
  - Hostit määritelty selkeästi AI-sovelluksiksi, jotka koordinoivat useita MCP-asiakasliitäntöjä
  - Klientit kuvattu protokollayhteyksinä, jotka ylläpitävät yksi-yhteen palvelinsuhteita
  - Palvelimet parannettu paikallisen ja etäkäyttöön perustuvilla käyttöskenaarioilla
- **Perusrakenteiden uudelleenjärjestely**: Palvelin- ja asiakasperusrakenteiden täydellinen uudistus
  - Palvelinperusrakenteet: Resurssit (tietolähteet), Kehotteet (mallit), Työkalut (ajettavat funktiot) yksityiskohtaisilla selityksillä ja esimerkeillä
  - Asiakasperusrakenteet: Näytteistys (LLM-täydentymät), Elicitaatio (käyttäjäsyöte), Kirjaaminen (debug/valvonta)
  - Päivitetty nykyisillä löydä (`*/list`), haetun (`*/get`) ja suorituksen (`*/call`) metodimallinnuksilla
- **Protokollan arkkitehtuuri**: Esitelty kaksikerroksinen arkkitehtuurimalli
  - Datakerros: JSON-RPC 2.0 -perusta elinkaaren hallinnalla ja perusrakenteilla
  - Siirtokerros: STDIO (paikallinen) ja streamattava HTTP SSE:n kanssa (etäyhteydet)
- **Turvarunko**: Kattavat turvallisuusperiaatteet käyttäjän nimenomaisesta suostumuksesta, tietosuojasta, työkalujen suoritusvarmuudesta ja siirtokerroksen suojauksesta
- **Viestintämallit**: Protokollaviestien päivitys näyttämään alustamis-, löytö-, suoritus- ja ilmoitusvirrat
- **Koodiesimerkit**: Päivitetyt monikieliset esimerkit (.NET, Java, Python, JavaScript) nykyisten MCP SDK -mallien mukaan

#### Turvallisuus (02-Security/) - Kattava turvallisuuden uudistus  
- **Standardien noudattaminen**: Täysi yhdenmukaistaminen MCP-määrittelyn 2025-06-18 turvallisuusvaatimuksien kanssa
- **Todentamisen kehitys**: Dokumentoitu kehitys räätälöidyistä OAuth-palvelimista ulkoisen identiteetin tarjoajan delegointiin (Microsoft Entra ID)
- **AI-spesifiset uhat**: Parannettu kattavuus nykyaikaisista AI-hyökkäysvektoreista
  - Yksityiskohtaiset kehotteiden injektointihyökkäystilanteet todellisilla esimerkeillä
  - Työkalujen myrkytysmenetelmät ja "rug pull" -hyökkäysmallit
  - Kontekstin ikkuna- ja mallin sekoittamishyökkäykset
- **Microsoftin AI-turvaratkaisut**: Kattava Microsoft-turvaekosysteemin esittely
  - AI-kehotesuojat kehittyneine tunnistus-, korostus- ja erottelutekniikoineen
  - Azure Content Safety -integrointimallit
  - GitHub Advanced Security toimitusketjun suojaukseen
- **Edistynyt uhkien lieventäminen**: Yksityiskohtaiset turvatoimet
  - Istunnon kaappaus MCP-spesifisillä hyökkäysesimerkeillä ja kryptografisilla istunnon tunnistevaatimuksilla
  - Sekoittuneen edustajan ongelmat MCP-välityspalvelimissa nimenomaisilla suostumusvaatimuksilla
  - Tokenin läpivientihaavoittuvuudet pakollisilla validointiohjaimilla
- **Toimitusketjun suojaus**: Laajennettu AI-toimitusketjun kattavuus mukaan lukien perusmallit, upotuspalvelut, kontekstin tarjoajat ja kolmannen osapuolen API:t
- **Perusturva**: Parannettu integrointi yritysturvallisuuskuvioihin, kuten zero trust -arkkitehtuuriin ja Microsoftin turvallisuus-ekosysteemiin
- **Resurssien organisointi**: Laaja resurssilinkkien luokittelu tyypeittäin (Viralliset dokumentit, standardit, tutkimukset, Microsoft-ratkaisut, toteutusoppaat)

### Dokumentaation laadun parannukset
- **Rakenteelliset oppimistavoitteet**: Paransi oppimistavoitteita konkreettisilla, toimenpiteitä ohjaavilla tuloksilla
- **Ristiinviittaukset**: Lisäsi linkkejä liittyvien turvallisuus- ja ydinkonseptiaiheiden välillä
- **Ajantasainen tieto**: Päivitetyt kaikki päivämääräviittaukset ja määrittelylinkit nykyisiin standardeihin
- **Toteutusohjeet**: Lisäsi yksityiskohtaisia ja konkreettisia toteutusohjeita molempiin osioihin

## 16. heinäkuuta 2025

### README ja navigoinnin parannukset
- Koko opetussuunnitelman navigointi uudistettu README.md:ssä
- Vaihtoi `<details>`-tagit saavutettavampaan taulukkomuotoon
- Luo vaihtoehtoisia asetteluvaihtoehtoja uuteen "alternative_layouts" -kansioon
- Lisäsi korttipohjaisia, välilehtityylisiä ja harmoonikkamaisia navigointiesimerkkejä
- Päivitti repositorion rakennetta kattamaan kaikki uusimmat tiedostot
- Puhdisti "Kuinka käyttää tätä opetussuunnitelmaa" -osion selkeillä suosituksilla
- Päivitti MCP-määrittelylinkit osoittamaan oikeisiin URL-osoitteisiin
- Lisäsi kontekstisuunnittelun osion (5.14) opetussuunnitelman rakenteeseen

### Opasoppaan päivitykset
- Täysin uudistettu opasopas nykyisen repositoriorakenteen mukaiseen muotoon
- Lisäsi uudet osiot MCP-klientit ja työkalut sekä suosituimmat MCP-palvelimet
- Päivitti visuaalisen opetussuunnitelmakartan kattamaan kaikki aiheet tarkasti
- Paransi edistyneiden aiheiden kuvauksia kaikkia erikoistuneita osa-alueita varten
- Päivitti tapaustutkimusten osion kuvaamaan todellisia esimerkkejä
- Sisällytti tämän kattavan muutospäiväkirjan

### Yhteisön kontribuutiot (06-CommunityContributions/)
- Lisäsi yksityiskohtaista tietoa MCP-kuvageneraatiopalvelimista
- Lisäsi kattavan osuuden Clauden käytöstä VSCodessa
- Lisäsi Cline-terminaaliklientin asennus- ja käyttöohjeet
- Päivitti MCP-klienttiosion kattamaan kaikki suosituimmat klienttivaihtoehdot
- Paransi kontribuuttoriesimerkkejä tarkemmilla koodinäytteillä

### Edistyneet aiheet (05-AdvancedTopics/)
- Järjestänyt kaikki erikoistuneet aihealuekansiot yhtenäisesti nimettyinä
- Lisäsi kontekstisuunnittelun materiaaleja ja esimerkkejä
- Lisäsi Foundry-agentin integraatiodokumentaation
- Paransi Entra ID:n turvallisuusintegraatiodokumentaatiota

## 11. kesäkuuta 2025

### Alkuperäinen luonti
- Julkaistiin ensin versio MCP for Beginners -opetussuunnitelmasta
- Luotiin perusrakenne kaikille 10 päätason osiolle
- Toteutettiin visuaalinen opetussuunnitelmakartta navigointia varten
- Lisättiin alkuperäisiä esimerkkiprojekteja monilla ohjelmointikielillä

### Aloittaminen (03-GettingStarted/)
- Luotiin ensimmäiset palvelintoteutusesimerkit
- Lisättiin klienttikehityksen ohjeistus
- Sisällytettiin LLM-klienttien integraatio-ohjeita
- Lisättiin VS Coden integraatiodokumentaatio
- Toteutettiin Server-Sent Events (SSE) -palvelinesimerkit

### Ydinkäsitteet (01-CoreConcepts/)
- Lisättiin yksityiskohtainen selitys asiakas-palvelin -arkkitehtuurista
- Luotiin dokumentaatio tärkeistä protokollakomponenteista
- Dokumentoitiin MCP:n viestintämallit

## 23. toukokuuta 2025

### Repositorion rakenne
- Alustettu repositorio perustason kansiorakenteella
- Luotu README-tiedostot jokaiselle pääosalle
- Määritetty käännösinfrastruktuuri
- Lisätty kuvavarannot ja kaaviot

### Dokumentaatio
- Luotu alkuperäinen README.md opetussuunnitelman yleiskatsauksella
- Lisätty CODE_OF_CONDUCT.md ja SECURITY.md
- Luotu SUPPORT.md ohjein avun saamiseksi
- Luotu alustava opasoppaan rakenne

## 15. huhtikuuta 2025

### Suunnittelu ja kehys
- MCP for Beginners -opetussuunnitelman alkuperäinen suunnittelu
- Määritelty oppimistavoitteet ja kohdeyleisö
- Luotu opetussuunnitelman 10-osainen rakenne
- Kehitetty käsitekehys esimerkeille ja tapaustutkimuksille
- Luotu alkuprotoesimerkit keskeisistä konsepteista

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->