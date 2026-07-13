# Muutosloki: MCP Aloittelijoille Opetussuunnitelma

Tämä dokumentti toimii rekisterinä kaikista merkittävistä muutoksista, joita on tehty Model Context Protocol (MCP) for Beginners -opetussuunnitelmaan. Muutokset on dokumentoitu käänteisessä kronologisessa järjestyksessä (uusimmat muutokset ensin).

## 2. heinäkuuta 2026

### Uusi Oppitunti: 2026-07-28 MCP Määrittelyn Julkaisuehdokas

Lisätty kattaus tulevasta `2026-07-28` MCP-määrittelyn julkaisuehdokkaasta (julkaistu 21. toukokuuta 2026; lopullinen julkaisu suunniteltu 28. heinäkuuta 2026), tiivistettynä [virallisesta ilmoitusblogipostauksesta](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Opetussuunnitelman perusta pysyy **MCP Specification 2025-11-25** versiolla, kunnes uusi versio julkaistaan, joten tämä esitetään eteenpäin katsovana ohjeistuksena eikä olemassa olevien oppituntien uudelleenkirjoituksena.

- **Uusi**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — täysi oppitunti, joka käsittelee tilattoman protokollaytimen (`initialize`-kättelyn ja `Mcp-Session-Id` poistaminen), uudet `Mcp-Method`/`Mcp-Name` reitityspäät, `ttlMs`/`cacheScope` välimuistimetatiedot, W3C Trace Context `_meta`-kentässä, muodollisen Extensions-kehyksen (MCP Apps ja uusi Tasks-laajennus), kuusi valtuutuksen koventamiseen liittyvää SEP:iä, Roots/Sampling/Logging:n käytöstä poiston ja siirtymisen täyteen JSON Schema 2020-12 työkalukaavioihin.
- **Päivitetty** eteenpäin katsovilla huomautuksilla, jotka linkittävät uuteen oppituntiin:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): protokollaversion huomautus, Sampling/Roots/Logging/Tasks-osiot ja "Mitä seuraavaksi"
  - [02-Security/README.md](./02-Security/README.md): valtuutuksen koventamisen huomautus
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): tilattoman siirron huomautus
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Samplingin käytöstä poiston huomautus
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Loggingin käytöstä poiston ja Tasks-laajennuksen huomautus
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): tilaton/istuntoreitityksen huomautus
  - [README.md](./README.md): "Katse tulevaan" -muistutus määrittely-osiossa ja uusi `1.1` merkintä opetussuunnitelman moduulitaulukossa
  - [study_guide.md](./study_guide.md): eteenpäin katsova kohta Core Concepts -katsauksessa ja päivätty lisäysmuistio
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): huomautus `mcp-session-id` siirtokartasta ennen tilattoman pyynnön mallia
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): moduulin yleiskatsauksen huomautus Root Contexts/Samplingin käytöstä poistosta ja Tasks-laajennuksesta
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): valtuutuksen koventamisen huomautus

## 24. kesäkuuta 2026

### Uusi Oppitunti: MCP:n Käyttö Copilot-sovelluksessa

- [Työkalut-osio](./12-tooling/README.md) Lisätty työkalut-osio.
- [MCP Copilot-sovelluksessa](./12-tooling/01-copilot-app/README.md)

## 16. kesäkuuta 2026

### MCP Määrittelyn Yhdenmukaistus & Mallin Vahvistus

Vahvistettiin opetussuunnitelma nykyisen **MCP Specification 2025-11-25** ja uusimpien virallisten SDK:iden perusteella, korjattiin vanhentuneet määrittelyviittaukset ja varmistettiin että ydinmallit rakentuvat ja toimivat edelleen.

#### Määrittelyversion Korjaukset (2025-06-18 / 2025-03-26 → 2025-11-25)

Päivitettiin englanninkielinen sisältö niiltä osin, joissa vanhempi määrittelyversio väitettiin *nykyiseksi/viimeisimmäksi* standardiksi, ja uudelleenohjattiin linkit kanonisiin `modelcontextprotocol.io` -määrittelypolkuihin:
- **05-AdvancedTopics/mcp-security/README.md**: Päivitettiin "Current Standard" banneri, johdanto, ydinturvaperiaatteet -alaotsikko, pakolliset vaatimukset, Microsoft Entra ID -osio, Viitteet & Resurssit -linkit ja päätösilmoitus (8 viitettä) versioksi 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Päivitettiin Lisäresurssit määrittelylinkki ja "Current Standard" -banneri versioon 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Vaihdettiin vanhentunut `2025-03-26` security-and-trust linkki nykyiseen 2025-11-25 turvatoimitussivuun
- **03-GettingStarted/14-sampling/README.md**: Päivitettiin virallisen Sampling-dokumentaation linkki versioon 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Päivitettiin nykyhetkinen "nykyinen MCP-määrittely" maininta ja Lisäresurssit määrittelylinkki versioon 2025-11-25 (historialliset SSE-poistohaut jätetty tarkkuuden vuoksi)

#### Mallien Vahvistus Nykyisillä SDK:illa

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ratkaisi `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` onnistui ilman tyyppivirheitä — olemassa olevat `McpServer`/`StdioServerTransport` API:t säilyvät voimassa
- **Python (03-GettingStarted/01-first-server/solution/python)**: Vahvistettu eristetyssä `.venv`:ssä `mcp[cli]` (1.27.2) kanssa; `py_compile` onnistui ja `FastMCP.list_tools()` palautti oikein `add` ja `subtract` työkalut
- Varmistettu, että kaikki `@modelcontextprotocol/sdk` versionumerovalikoimat (`>=1.26.0` / `^1.26.0` / `^1.27.0`) ratkeavat siististi nykyiseen `1.29.0` ilman rikkovia API-muutoksia

#### Riippuvuuksien Lukitusversioiden Yhdenmukaistus (version aukkojen paikkaus)

Päivitettiin vanhentuneet SDK-riippuvuudet siten, että jokainen malli seuraa nykyistä MCP-julkaisua, noudattaen koko repossa vallitsevaa käytäntöä:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Korotettiin `@modelcontextprotocol/sdk` versiosta `^1.8.0` → `>=1.26.0` ja päivitettiin vanha kuvaus `"updated for MCP 2025-06-18"` muotoon `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** ja **lab4/code/github_mcp_server/pyproject.toml**: Korotettiin täsmäversio `mcp==1.23.0` → `mcp>=1.26.0`; uudelleenluotiin molemmat `uv.lock` tiedostot (`uv lock`), jotta lukitut versiot vastaavat nykyistä `mcp 1.27.2`:ta ja pysyvät synkronissa manifestien kanssa

#### Opetussuunnitelman Vajean Analyysi — Viimeisimmän Määrittelyn Ominaisuuksien Kattavuus

Varmistettiin, että opetussuunnitelma kattaa jo kaikki MCP 2025-11-25 julkaisussa esitellyt tai laajennetut perusominaisuudet, joten sisältöaukoja ei ole:
- **Sampling**: Oppitunti 03-GettingStarted/14-sampling sekä 05-AdvancedTopics/mcp-sampling
- **Elicitation (ml. URL-tila)**: Dokumentoitu 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumentoitu 00-Introduction, 01-CoreConcepts ja 05-AdvancedTopics/mcp-root-contexts
- **Tasks (kokeellinen, pitkään käynnissä olevat toiminnot)**: Dokumentoitu 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features
- **Työkalujen Annotaatiot** (`readOnlyHint` / `destructiveHint`): Dokumentoitu 01-CoreConcepts ja 05-AdvancedTopics/mcp-protocol-features

### Turvan Koventaminen & Riippuvuuksien Haavoittuvuuksien Korjaaminen

Suoritettiin kattava turvallisuustarkastus kaikista riippuvuuksien manifesteista ja malliesimerkkikoodista, minkä jälkeen korjattiin kaikki raportoitu npm:n haavoittuvuudet sekä yksi kooditasoinen havainto. Korjauksen jälkeen `npm audit` raportoi **0 haavoittuvuutta** kaikissa tarkastetuissa hakemistoissa.

#### npm Riippuvuuksien Haavoittuvuudet (transitiiviset) — Korjattu

Tarkastettiin kaikki 15 tallennettua `package-lock.json` tiedostoa. Haavoittuvuudet rajoittuivat transitiivisiin riippuvuuksiin, joita tuo MCP Inspector kehitystyökalu, OpenAI-asiakas ja MCP SDK; kaikki on nyt korjattu rikkomatta malleja:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** ja **lab3/code/weather_mcp/inspector**: Päivitettiin `@modelcontextprotocol/inspector` versio (`0.16.6` / `0.14.1` → `0.22.0`), mikä poisti mukana tulleet `ajv`, `brace-expansion`, `diff`, `path-to-regexp` ja `ws` -hälytykset. Lisättiin npm `overrides` merkintä, joka pakottaa korjatun `shell-quote@1.8.4`:n poistamaan jäljellä olevan kriittisen hälytyksen, joka kulki mukana `concurrently` -paketissa; lukitustiedostot uudelleengeneroitiin (nyt 0 haavoittuvuutta)
- **03-GettingStarted/samples/typescript**: `npm audit fix` päivitti transitiivisen `qs` (keskitasoinen) korjattuun julkaisuun
- **03-GettingStarted/samples/javascript**: `npm audit fix` päivitti transitiivisen `hono` (keskitasoinen) korjattuun julkaisuun
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` päivitti transitiivisen `form-data` (korkea) korjattuun julkaisuun
- **03-GettingStarted/11-simple-auth/solution/typescript**: Luotiin puuttuva `package-lock.json`, jotta projekti on toistettavissa ja auditoitavissa (0 haavoittuvuutta)

#### Kooditason Turvaparannus (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Poistettu `shell=True` `open_in_vscode` työkalusta. Aiempi `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` salli shellin erikoismerkkien tulkinnan kansiopolussa `cmd.exe` komentokoodin injektoinnin riskinä. Nyt käynnistetään ratkaistu `Code.exe` suoraan kansiopolun argumenttina — ilman shelliä — mikä on toiminnallisesti vastaava ja turvallinen.

#### Python Riippuvuustarkastus

- Tarkastettu kaikki Python-vaatimukset `pip-audit`illa. `05-AdvancedTopics` ja `03-GettingStarted/samples/python` raportoivat **ei tunnettuja haavoittuvuuksia** (heidän `mcp` / `httpx` / `pydantic` / `python-dotenv` versiorajoitukset ratkeavat nykyisiin korjattuihin julkaisuihin)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` havaitsi transitiivisen riippuvuuden **`werkzeug` 3.1.1** kolmella `safe_join` Windows-laitenimen DoS -hälytyksellä — `CVE-2025-66221`, `CVE-2026-21860` ja `CVE-2026-27199` (kaikki korjattu versiossa 3.1.6). Lisättiin eksplisiittinen turvalukitus `werkzeug>=3.1.6` jotta korjattu julkaisu ratkeaa; vahvistettiin että rajoitus ratkeaa puhtaasti `chainlit` / `mcp` / `semantic-kernel` pinossa

### Tuotemerkin Uudelleenbrändäys

Päivitettiin koko opetussuunnitelman sisältö Microsoftin tuotemerkin muutosten mukaiseksi:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Päivitetty Discord-yhteisölinkki
- **AGENTS.md**: Päivitetty Discord-palvelimen maininta
- **README.md**: Päivitetyt teknologiaympäristön viittaukset
- **study_guide.md**: Päivitetyt tapaustutkimuksen viittaukset
- **05-AdvancedTopics/README.md**: Päivitetty Moduuli 5.13 otsikko ja kuvaus
- **05-AdvancedTopics/mcp-integration/README.md**: Päivitetty osion otsikko ja kuvaus
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Koko moduulin otsikko ja sisältö päivitetty
- **05-AdvancedTopics/mcp-security-entra/README.md**: Päivitetty ristiinviittauslinkki
- **07-LessonsfromEarlyAdoption/README.md**: Päivitetyt tapaustutkimuksen viittaukset
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Päivitetty osan 9 otsikko, merkit ja kyvykkyydet
- **08-BestPractices/README.md**: Päivitetty Discord-yhteisölinkki
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Päivitetty Discord-kanavan maininta
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Päivitetty mallin käyttöönoton viittaus
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Päivitetty AI-palvelujen taulukko
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Päivitetyt resurssiviittaukset

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Päivitetyt pääopetussuunnitelman viittaukset  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Päivitetty moduulin otsikko, yleiskuvaus ja kaikki moduulin otsikot  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Päivitetty otsikko, oppimistavoitteet, asennusohjeet ja resurssit  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Päivitetty otsikko, oppimistavoitteet, MCP-hostit-taulukko ja ristiviittaukset  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Päivitetty otsikko, merkit, esivaatimukset ja resurssit  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Päivitetyt Agent Builder -viittaukset ja palautelinkki  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Päivitetyt esivaatimukset ja laajennusviittaukset  

---

## 11. huhtikuuta 2026

### Uusi Oppitunti, Dokumentaation Korjaukset ja Riippuvuuspäivitykset

#### Uutta Opetussisältöä Lisätty

**Moduuli 05 - Edistyneet Aiheet**  
- **Oppitunti 5.17: Vastustava Moni-Agenttijärjestelmän Päättely MCP:n Kanssa** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Uusi kattava opas, joka käsittelee vastustavan debatointimallin moni-agenttijärjestelmissä  
  - Mermaid-arkkitehtuurikaavio: kaksi agenttia → yhteinen MCP-palvelin → debatointiteksti → tuomari → päätös  
  - Jaettu MCP-työkalupalvelin (`web_search` + `run_python`) toteutettu Pythonilla ja TypeScriptilä  
  - Vastakkaiset järjestelmäkehotteet (PUOLESTA / VASTAAN / Tuomari) eksplisiittisillä työkalujen käyttövaatimuksilla  
  - Debatointien järjestäjä Pythonissa, TypeScriptissä ja C#:ssa, joka hallinnoi kierroksia ja reitittää argumentteja  
  - MCP:n `ClientSession` -kytkennät järjestäjälle todellisia työkalukutsuja varten  
  - Käyttötapaustaulukko (harhakohteluentsyymi, uhkamallinnus, API-suunnittelun tarkastus, faktojen tarkistus, teknologian valinta)  
  - Turvallisuusnäkökohtia: hiekkalaatikkoajaminen, työkalukutsujen validointi, käyttörajoitus, auditointilokit  
  - Rakenteellinen harjoitus kolmella käytännön skenaariolla (koodikatselmointi, arkkitehtuuripäätös, sisältövalvonta)  

#### Dokumentaation Korjaukset

**Moduuli 03 - Aloittaminen**  
- **05-stdio-server/README.md**: Korjattu keskeneräinen TypeScript stdio -palvelin-esimerkki — lisätty puuttuva kuljetusinstanssi (`new StdioServerTransport()`) ja `server.connect(transport)`-kutsu vastaamaan Python- ja .NET-esimerkkejä samassa osiossa  
- **14-sampling/README.md**: Korjattu kirjoitusvirhe — korjattu `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`  

#### Opetussuunnitelman Päivitykset

**Pää-README.md**  
- Lisätty merkintä 5.17 (Vastustava moni-agenttijärjestelmän päättely MCP:llä) opetussuunnitelmataulukkoon suorahkolla linkillä uuteen oppituntiin  

**05-AdvancedTopics/README.md**  
- Lisätty oppitunti 5.17 riviksi oppituntitaulukkoon  

**study_guide.md**  
- Lisätty Vastustava moni-agenttijärjestelmän päättely -aihe miellekarttaan ja edistyneiden aiheiden tekstikuvaan  

#### Koodin ja Turvallisuuden Korjaukset

**Moduuli 05 - Vastustavat Agentit (`mcp-adversarial-agents`)**  
- **Turvallisuuskorjaus — komentojen injektoinnin estäminen**: Vaihdettu TypeScriptin `run_python`-työkalussa `execSync`-kuoren interpolaatio `execFile` + `promisify` -käyttöön, mikä poistaa komentojen injektointipinta-alan (LLM-ohjattu koodi lähetetään nyt kirjaimellisena argv-elementtinä ilman kuoren osuutta)  
- **MCP-työkalusilmukan kytkennät**: Päivitetty Pythonin debatointien järjestäjä käyttämään `AsyncAnthropic`-asiakasta (korvaten estävän synkronisen `Anthropic`-asiakkaan), välittämään live-`ClientSession`-objektin suoraan kullekin agenttikierrokselle, hakemaan työkalumäärittelyt `session.list_tools()`-kutsulla kussakin kierroksessa, ja lähettämään `tool_use`-lohkoja `session.call_tool()` -silmukassa kunnes malli palauttaa lopullisen tekstivastauksen  

#### Riippuvuuspäivitykset

- Päivitetty `hono` versioon 4.12.12 useissa paketeissa (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)  
- Päivitetty `@hono/node-server` versiosta 1.19.11 versioon 1.19.13 TypeScript-paketeissa  
- Päivitetty `cryptography` versiosta 46.0.5 versioon 46.0.7 Python-paketeissa (10-StreamliningAIWorkflows laboratorion 3 ja 4 osissa)  
- Päivitetty `lodash` versiosta 4.17.23 versioon 4.18.1 10-StreamliningAIWorkflows inspectorissa  

#### Käännökset

- Synkronoitu yli 48 kielen käännökset uusimpien lähdemuutosten mukaisesti (i18n-päivitys)  

---

## 5. helmikuuta 2026

### Koko Repositorion Validointi ja Navigoinnin Parannukset

#### Uutta Opetussisältöä Lisätty

**Moduuli 03 - Aloittaminen**  
- **12-mcp-hosts/README.md**: Uusi kattava opas MCP-hostien perustamiseen  
  - Claude Desktopin, VS Coden, Cursorin, Clinen, Windsurfin konfigurointiesimerkit  
  - JSON-konfigurointimallit kaikille tärkeimmille hosteille  
  - Kuljetustyyppien vertailutaulukko (stdio, SSE/HTTP, WebSocket)  
  - Useimmin esiintyvien yhdistämisongelmien vianmääritys  
  - Turvallisuuskäytännöt hostin konfiguroinnissa  

- **13-mcp-inspector/README.md**: Uusi vianmääritysopas MCP Inspectorille  
  - Asennustavat (npx, npm globaalisti, lähteestä)  
  - Yhdistäminen palvelimiin stdio- ja HTTP/SSE-kautta  
  - Testityökalut, resurssit ja kehotteiden työnkulut  
  - VS Code -integraatio MCP Inspectorin kanssa  
  - Yleiset vianmääritystilanteet ja ratkaisut  

**Moduuli 04 - Käytännön Toteutus**  
- **pagination/README.md**: Uusi sivutuksen toteutusopas  
  - Cursor-pohjaiset sivutuskuviot Pythonissa, TypeScriptissä ja Javassa  
  - Asiakaspään sivutuksen käsittely  
  - Cursor-suunnittelustrategiat (läpinäkymätön vs. jäsennelty)  
  - Suorituskyvyn optimointisuositukset  

**Moduuli 05 - Edistyneet Aiheet**  
- **mcp-protocol-features/README.md**: Uusi protokollan ominaisuuksien syväluotaus  
  - Edistymisilmoitusten toteutus  
  - Pyyntöjen peruutusmallit  
  - Resurssipohjat URI-kuvioineen  
  - Palvelimen elinkaaren hallinta  
  - Lokitustason kontrolli  
  - Virheenkäsittelymallit JSON-RPC-koodein  

#### Navigointikorjaukset (yli 24 tiedostoa päivitetty)

**Päämoduulin README-tiedostot**  
 Linkittävät nyt sekä ensimmäiseen oppituntiin että seuraavaan moduuliin  

**02-Security-alatiedostot**  
 Kaikissa viidessä täydentävässä turvallisuusasiakirjassa on nyt ”Mitä seuraavaksi” -navigaatio:  

**09-CaseStudy-tiedostot**  
 Kaikissa tapaustutkimustiedostoissa on nyt peräkkäinen navigaatio:  

**10-StreamliningAI Laboratoriot**  
 Lisätty ”Mitä seuraavaksi” -osio moduulin 10 yleiskuvaan ja moduuliin 11  

#### Koodin ja Sisällön Korjaukset

**SDK:n ja Riippuvuuksien Päivitykset**  
 Korjattu tyhjä openai-versio `^4.95.0`  
 Päivitetty SDK versiosta `^1.8.0` versioon `>=1.26.0`  
 Päivitetty mcp-versionuputukset versioon `>=1.26.0`  

**Koodikorjaukset**  
 Korjattu virheellinen malli `gpt-4o-mini` oikeaksi `gpt-4.1-mini`  

**Sisältökorjaukset**  
 Korjattu rikki mennyt linkki `READMEmd` → `README.md`, korjattu opetussuunnitelman otsikko `Module 1-3` → `Module 0-3`, korjattu kirjainkoolla herkkä polku  
 Poistettu vioittunut kaksoiskappale Case Study 5 -sisällöstä  

**Aloittelijan Ohjeistuksen Parannukset**  
 Lisätty asianmukainen johdanto, oppimistavoitteet ja esivaatimukset aloittelijoille  

#### Opetussuunnitelman Päivitykset

**Pää-README.md**  
- Lisätty merkinnät 3.12 (MCP-hostit), 3.13 (MCP Inspector), 4.1 (Sivutus), 5.16 (Protokollan ominaisuudet) opetussuunnitelmataulukkoon  

**Moduulien README-tiedostot**  
 Lisätty oppitunnit 12 ja 13 oppituntilistaan  
 Lisätty Käytännön oppaat -osio, sisältäen sivutuksen linkin  
 Lisätty oppitunnit 5.15 (Muokattu kuljetus) ja 5.16 (Protokollan ominaisuudet)  

**study_guide.md**  
- Päivitetty miellekartta kaikkiin uusiin aiheisiin: MCP-hostien asennus, MCP Inspector, sivutusstrategiat, protokollan ominaisuuksien syväluotaus  

## 28. tammikuuta 2026

### MCP-spesifikaation 2025-11-25 Vaateiden Tarkastus

#### Ydinkäsitteiden Kehitys (01-CoreConcepts/)  
- **Uusi Asiakasprimiitiivi - Roots**: Lisätty kattava dokumentaatio Roots-asiakasprimiitivistä, joka mahdollistaa palvelimille tiedostojärjestelmän rajojen ja käyttöoikeuksien ymmärtämisen  
- **Työkalujen Annotaatiot**: Lisätty dokumentaatio työkalujen käyttäytymistä kuvaavista annotaatioista (`readOnlyHint`, `destructiveHint`) parempaa työkalujen ajopäätöksiä varten  
- **Työkalukutsujen Tuki Samplingissa**: Päivitetty Sampling-dokumentaatiota kattamaan `tools` ja `toolChoice` -parametrit mallin ohjaamaan työkalukutsujen tekemiseen sampling-pyyntöjen aikana  
- **URL-tilan Aktivointi**: Lisätty dokumentaatio palvelimen käynnistämistä ulkoisista verkkoyhteyksistä perustuvasta URL-tilasta  
- **Tehtävät (Kokeellinen)**: Lisätty uusi osio dokumentoimaan kokeellista Tasks-ominaisuutta, joka tarjoaa pysyviä käynnistysmalleja ja tuloksen myöhästettyä noutoa  
- **Kuvakkeiden Tuki**: Huomioitu, että työkalut, resurssit, resurssipohjat ja kehotteet voivat nyt sisältää kuvakkeita lisämetatietona  

#### Dokumentaatio-/Sisältöpäivitykset  
- **README.md**: Lisätty MCP-spesifikaation 2025-11-25 versioviittaus ja päivämääräpohjainen versiointiselostus  
- **study_guide.md**: Päivitetty opetussuunnitelman kartta sisältämään Tehtävät ja Työkalun Annotaatiot ydinkäsitteiden osiossa; päivitetty asiakirjan aikaleima  

#### Spesifikaation Vaateiden Tarkistus  
- **Protokollaversio**: Varmistettu, että kaikki dokumentaatioviittaukset osoittavat MCP-spesifikaation 2025-11-25 uusimpaan versioon  
- **Arkkitehtuurin Vastaavuus**: Vahvistettu kaksikerroksisen arkkitehtuurin (Datalayer + Transport Layer) dokumentaation oikeellisuus  
- **Primiitiivien Dokumentaatio**: Varmistettu palvelinprimiitivien (Resurssit, Kehotteet, Työkalut) sekä asiakasprimiitivien (Sampling, Elicitation, Logging, Roots) kattava dokumentaatio  
- **Kuljetusmekanismit**: Tarkastettu STDIO- ja Streamable HTTP -kuljetusdokumentaation paikkansapitävyys  
- **Turvallisuusohjeistus**: Vahvistettu yhteensopivuus nykyisen MCP:n Turvallisuuden Parhaiden Käytäntöjen dokumentaation kanssa  

#### Keskeiset MCP 2025-11-25 Ominaisuudet Dokumentoitu  
- **OpenID Connect -löytö**: Todennuspalvelimen löytäminen OIDC:n avulla  
- **OAuth Asiakastunnuksen Metadata-asiakirjat**: Suositeltu rekisteröintimekanismi asiakkaille  
- **JSON Schema 2020-12**: MCP:n schemavastaavuuksien oletustulkki  
- **SDK-tasojen Järjestelmä**: Virallistettu SDK-ominaisuuksien tuen ja ylläpidon vaatimukset  
- **Hallintorakenne**: Virallistettu MCP:n hallinnon työryhmät ja intressiryhmät  

### Turvallisuusdokumentaation Suuri Päivitys (02-Security/)  

#### MCP Security Summit Workshop (Sherpa) Integroituminen  
- **Uusi Käytännön Koulutusresurssi**: Lisätty kattava integrointi [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) kaikkien turvallisuusdokumenttien yhteyteen  
- **Retkireitin Dokumentointi**: Kattavasti dokumentoitu koko leiriltä-leirille eteneminen Base Campista Summitille  
- **OWASP-yhteensopivuus**: Kaikki turvallisuusohjeistus on nyt sidottu OWASP MCP Azure Security Guide:n riskeihin  

#### OWASP MCP Top 10 Integraatio  
- **Uusi Osio**: Lisätty OWASP MCP Top 10 -turvallisuusriskitaulukko Azure-hallintatoimenpiteillä pääasialliseen Turvallisuus-README:hin  
- **Riskipohjainen Dokumentaatio**: Päivitetty mcp-security-controls-2025.md sisältämään OWASP MCP riskiviittauksia jokaiselle turvallisuusalueelle  
- **Viitearkkitehtuuri**: Linkitys OWASP MCP Azure Security Guide:n viitearkkitehtuuriin ja toteutusmalleihin  

#### Päivitetyt Turvallisuustiedostot  
- **README.md**: Lisätty Sherpa-työpajan yleiskuvaus, retkireittitaulukko, OWASP MCP Top 10 riskien yhteenveto ja käytännön koulutusosio  
- **mcp-security-controls-2025.md**: Päivitetty otsikko helmikuuhun 2026, lisätty OWASP-risikoviittaukset (MCP01-MCP08), korjattu versio-epäjohdonmukaisuus  
- **mcp-security-best-practices-2025.md**: Lisätty Sherpa- ja OWASP-resurssien osio, päivitetty aikaleima  
- **mcp-best-practices.md**: Lisätty käytännön koulutusosio Sherpa- ja OWASP-linkeillä  
- **azure-content-safety-implementation.md**: Lisätty OWASP MCP06 -viite, Sherpa Camp 3:n mukaisuus ja lisäresurssit  

#### Uudet Resurssilinkit Lisätty  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Yksittäiset OWASP MCP riskisivut (MCP01-MCP10)  

### Opetussuunnitelman Laajuinen MCP Spesifikaation 2025-11-25 Mukautus  

#### Moduuli 03 - Aloittaminen  
- **SDK-Dokumentaatio**: Lisätty Go SDK viralliseksi SDK-listaukseen; päivitetty kaikki SDK-viittaukset vastaamaan MCP Specification 2025-11-25 versiota  
- **Kuljetusten Selvennys**: Päivitetty STDIO- ja HTTP Streaming -kuljetusten kuvaukset eksplisiittisillä spesifikaatioviittauksilla  

#### Moduuli 04 - Käytännön Toteutus  
- **SDK-Päivitykset**: Lisätty Go SDK; päivitetty SDK-lista spesifikaatioversiolla  
- **Valtuutusspesifikaatio**: Päivitetty MCP Authorization -spesifikaatiolinkki nykyiseen 2025-11-25 versioon  

#### Moduuli 05 - Edistyneet Aiheet  
- **Uudet Ominaisuudet**: Lisätty huomautus uusista MCP Specification 2025-11-25 ominaisuuksista (Tasks, Tool Annotations, URL Mode Elicitation, Roots)  
- **Turvallisuusresurssit**: Lisätty OWASP MCP Top 10 ja Sherpa-työpajalinkit lisäviitteisiin  

#### Moduuli 06 - Yhteisön Panokset  
- **SDK-Lista**: Lisätty Swift- ja Rust-SDK:t; päivitetty spesifikaatiolinkki MCP Specification 2025-11-25 versioon  

#### Moduuli 07 - Varhaisen Käytön Opit
- **Resurssipäivitykset**: Lisätty MCP Specification 2025-11-25 -linkki ja OWASP MCP Top 10 lisäresursseihin

#### Moduuli 08 - Parhaat käytännöt
- **Spec-versio**: Päivitetty MCP Specification -viite versioon 2025-11-25
- **Tietoturvaresurssit**: Lisätty OWASP MCP Top 10 ja Sherpa-työpaja lisäviitteisiin

#### Moduuli 10 - AI-työnkulkujen virtaviivaistaminen
- **Merkintäpäivitys**: MCP-version badge muutettu SDK-version (1.9.3) sijaan spesifikaatioversioksi (2025-11-25)
- **Resurssilinkit**: Päivitetty MCP Specification -linkki; lisätty OWASP MCP Top 10

#### Moduuli 11 - MCP Server Hands-On -työpajat
- **Spec-viite**: Päivitetty MCP Specification -linkki versioon 2025-11-25
- **Tietoturvaresurssit**: Lisätty OWASP MCP Top 10 virallisiin resursseihin

## 18. joulukuuta 2025

### Tietoturvaokumentaation päivitys - MCP Specification 2025-11-25

#### MCP-tietoturvan parhaat käytännöt (02-Security/mcp-best-practices.md) - Spesifikaatioversion päivitys
- **Protokollaversion päivitys**: Päivitetty viittaus uusimpaan MCP Specification 2025-11-25 (julkaistu 25. marraskuuta 2025)
  - Kaikki spesifikaatioversion viittaukset päivitetty versiosta 2025-06-18 versioon 2025-11-25
  - Dokumenttipäivämäärät päivitetty 18. elokuuta 2025 -> 18. joulukuuta 2025
  - Kaikkien spesifikaatiourlien oikeellisuus tarkistettu
- **Sisällön validointi**: Laaja tietoturvan parhaiden käytäntöjen validointi uusimpia standardeja vastaan
  - **Microsoft Security Solutions**: Ajantasaiset termit ja linkit tarkistettu Prompt Shieldsille (aiemmin "Jailbreak risk detection"), Azure Content Safetylle, Microsoft Entra ID:lle ja Azure Key Vaultille
  - **OAuth 2.1 Tietoturva**: Varmistettu yhdenmukaisuus uusimpien OAuth-tietoturvakäytäntöjen kanssa
  - **OWASP-standardit**: OWASP Top 10 LLM-malleille tarkistettu ja pidetty ajan tasalla
  - **Azure-palvelut**: Kaikkien Microsoft Azure -dokumentaatio- ja parhaiden käytäntöjen linkkien oikeellisuus varmistettu
- **Standardien yhteensopivuus**: Kaikki viitatut tietoturvastandardit vahvistettu nykyisiksi
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 -tietoturvan parhaat käytännöt
  - Azuren tietoturva- ja vaatimustenmukaisuuskehykset
- **Toteutusresurssit**: Kaikki toteutusoppaiden linkit ja resurssit tarkistettu
  - Azure API Managementin autentikointimallit
  - Microsoft Entra ID:n integraatio-oppaat
  - Azure Key Vaultin salaisuuksien hallinta
  - DevSecOps-putket ja valvontasovellukset

### Dokumentaation laadunvarmistus
- **Spesifikaation noudattaminen**: Varmistettu, että kaikki pakolliset MCP-tietoturvavaatimukset (MUST/MUST NOT) vastaavat uusinta spesifikaatiota
- **Resurssien ajantasaisuus**: Tarkistettu kaikki ulkoiset linkit Microsoft-dokumentaatioon, tietoturvastandardeihin ja toteutusoppaisiin
- **Parhaiden käytäntöjen kattavuus**: Varmistettu kattava sisältö autentikoinnista, valtuutuksesta, AI-spesifisistä uhkista, toimitusketjutietoturvasta ja yritysmallista

## 6. lokakuuta 2025

### Getting Started -osion laajennus – Edistynyt palvelimen käyttö & yksinkertainen autentikointi

#### Edistynyt palvelimen käyttö (03-GettingStarted/10-advanced)
- **Uusi luku lisätty**: Kattava opas edistyneeseen MCP-palvelimen käyttöön, sisältäen sekä tavallisen että matalan tason palvelinarkkitehtuurit
  - **Tavallinen vs. matalan tason palvelin**: Yksityiskohtainen vertailu ja esimerkkikoodit Pythonilla ja TypeScriptillä molemmille lähestymistavoille
  - **Handler-pohjainen suunnittelu**: Selitys työkalujen / resurssien / kehotteiden hallinnasta skaalautuvia ja joustavia palvelinratkaisuja varten
  - **Käytännön mallit**: Käytännön tilanteet, joissa matalan tason palvelinmallit auttavat edistyneissä toiminnoissa ja arkkitehtuurissa

#### Yksinkertainen autentikointi (03-GettingStarted/11-simple-auth)
- **Uusi luku lisätty**: Vaiheittainen opas yksinkertaisen autentikoinnin toteutukseen MCP-palvelimissa
  - **Autentikoinnin käsitteet**: Selkeä ero autentikoinnin ja valtuutuksen välillä sekä tunnistetietojen käsittely
  - **Basic Auth -toteutus**: Middleware-pohjaiset autentikointimallit Pythonilla (Starlette) ja TypeScriptillä (Express), koodinäytteillä
  - **Eteneminen edistyneeseen tietoturvaan**: Ohjeistus yksinkertaisella autentikoinnilla aloittamiseen ja etenemiseen OAuth 2.1:een sekä RBAC:iin, viitteet edistyneisiin tietoturvamuoduleihin

Nämä lisäykset tarjoavat käytännönläheisiä ohjeita vakaampien, turvallisempien ja joustavampien MCP-palvelinratkaisujen rakentamiseen, nivelten perustavanlaatuisten käsitteiden ja edistyneiden tuotantomallien välillä.

## 29. syyskuuta 2025

### MCP Server Database Integration Labs - Kattava käytännön oppimispolku

#### 11-MCPServerHandsOnLabs - Uusi täydellinen tietokantaintegraatiokurssi
- **Täysi 13-luokan oppimispolku**: Laaja käytännönläheinen oppimateriaali tuotantovalmiiden MCP-palvelinten rakentamiseen PostgreSQL-tietokantaintegraatiolla
  - **Käytännön toteutus**: Zava Retailin analytiikkatapaus, joka esittelee yritystason malleja
  - **Rakenne ja eteneminen**:
    - **Labit 00-03: Perusteet** – Johdanto, ydinarkkitehtuuri, tietoturva & moni-vuokralaisuus, ympäristön pystytys
    - **Labit 04-06: MCP-palvelimen rakentaminen** – Tietokantasuunnittelu & skeema, MCP-palvelimen toteutus, työkalujen kehitys  
    - **Labit 07-09: Edistyneet ominaisuudet** – Semanttinen haku, testaus & virheenkorjaus, VS Code -integraatio
    - **Labit 10-12: Tuotanto & parhaat käytännöt** – Käyttöönotto, valvonta & havaittavuus, parhaat käytännöt & optimointi
  - **Yritysteknologiat**: FastMCP-framework, PostgreSQL + pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Edistyneet ominaisuudet**: Rivitason tietoturva (RLS), semanttinen haku, moni-vuokralainen datan käyttöoikeus, vektoriedustukset, reaaliaikainen valvonta

#### Terminologian yhdenmukaistus – moduulista labiksi
- **Dokumentaation laaja päivitys**: Kaikki README-tiedostot 11-MCPServerHandsOnLabs-kansiossa päivitetty käyttämään "Lab"-terminologiaa "Module" sijaan
  - **Otsikot**: "What This Module Covers" -> "What This Lab Covers" kaikissa 13 labissa
  - **Sisältökuvaukset**: "This module provides..." -> "This lab provides..." koko dokumentaatiossa
  - **Oppimistavoitteet**: "By the end of this module..." -> "By the end of this lab..."
  - **Navigointilinkit**: Kaikki viittaukset muodossa "Module XX:" muutettu muotoon "Lab XX:"
  - **Suorituksen seuranta**: "After completing this module..." päivitetty muotoon "After completing this lab..."
  - **Teknisten viittausten säilyttäminen**: Python-moduuliviittaukset säilytetty konfiguraatioissa (esim. `"module": "mcp_server.main"`)

#### Study Guide -parannus (study_guide.md)
- **Visuaalinen opetussisältökartta**: Lisätty uusi osio "11. Database Integration Labs" näyttämään labien rakenne selkeästi
- **Repositorion rakenne**: Päivitetty kymmenestä yksitoista pääosioon sisältäen kuvauksen 11-MCPServerHandsOnLabsista
- **Oppimispolkuohjeistus**: Parannettu navigointiohjeet kattamaan osiot 00-11
- **Teknologiateemat**: Lisätty kuvaukset FastMCP:stä, PostgreSQL:stä, Azure-palveluiden integraatioista
- **Oppimistulokset**: Korostettu tuotantovalmiiden palvelimien kehittämistä, tietokantaintegraation malleja ja yritystason tietoturvaa

#### Pääkansio README-rakenteen täsmennys
- **Lab-pohjainen terminologia**: Päivitetty pää-README.md 11-MCPServerHandsOnLabs-kansiossa johdonmukaisesti "Lab"-rakenteen mukaiseksi
- **Oppimispolun järjestys**: Selkeä eteneminen perusteista edistyneeseen toteutukseen ja tuotantoon
- **Käytännön painotus**: Korostus käytännön, yritystason mallien ja teknologioiden hyödyntämisessä

### Dokumentaation laadun ja yhdenmukaisuuden parannukset
- **Käytännönläheinen opetus**: Käytännön lab-pohjaisen lähestymistavan vahvistaminen koko dokumentaatiossa
- **Yritysmallien painotus**: Tuotantovalmiiden ratkaisujen ja tietoturvan korostaminen
- **Teknologian integraatio**: Modernien Azure-palveluiden ja AI-integraatioiden kattava käsittely
- **Oppimisen eteneminen**: Selkeä ja jäsennelty polku peruskäsitteistä tuotantoon

## 26. syyskuuta 2025

### Case Studies -painotus - GitHub MCP Registry -integraatio

#### Case Studies (09-CaseStudy/) - Ekosysteemikehitys
- **README.md**: Merkittävä laajennus kattavalla GitHub MCP Registry -case studiella
  - **GitHub MCP Registry Case Study**: Uusi laaja tapaustutkimus GitHubin MCP Registryn julkaisemisesta syyskuussa 2025
    - **Ongelman analyysi**: Yksityiskohtainen tarkastelu hajautuneista MCP-palvelinten löytymis- ja käyttöönottohaasteista
    - **Ratkaisun arkkitehtuuri**: GitHubin keskitetty rekisteriratkaisu yhden klikkauksen VS Code -asennuksella
    - **Liiketoimintavaikutus**: Mitattavissa oleva parannus kehittäjien käyttöönotossa ja tuottavuudessa
    - **Strateginen arvo**: Painotus modulaariseen agenttien käyttöönottoon ja työkalujen yhteentoimivuuteen
    - **Ekosysteemikehitys**: Sijoitus perustana agenttijärjestelmien integraatiolle
  - **Case Study -rakenteen laajennus**: Kaikkien seitsemän tapaustutkimuksen päivitys yhdenmukaiseen muotoon ja kattaviin kuvauksiin
    - Azure AI Travel Agents: Moni-agenttiorkestraatio painotus
    - Azure DevOps Integration: Työnkulkujen automaatio
    - Reaaliaikainen dokumentaationhaku: Python-konsoliasiakas
    - Interaktiivinen opiskelusuunnitelman generaattori: Chainlit-keskustelusovellus
    - Editorissa tapahtuva dokumentointi: VS Code ja GitHub Copilot -integraatio
    - Azure API Management: Yritystason API-integraatiomallit
    - GitHub MCP Registry: Ekosysteemikehitys ja yhteisöalusta
  - **Kattava yhteenveto**: Kirjoitettu uudelleen yhteenlaskettu yhteenveto korostamaan seitsemän tapaustutkimuksen MCP:n toteutuksen monimuotoisuutta
    - Yritysintegratio, moni-agenttiorkestraatio, kehittäjätuottavuus
    - Ekosysteemikehitys, koulutussovellukset -luokittelut
    - Syvälliset oivallukset arkkitehtuuri-, toteutus- ja parhaista käytännöistä
    - Painotus MCP:n kypsään, tuotantovalmiiseen protokollaan

#### Study Guide -päivitykset (study_guide.md)
- **Visuaalinen opetussisältökartta**: Päivitetty miellekartta kattamaan GitHub MCP Registry Case Studies -osiossa
- **Case Studies -kuvaukset**: Parannettu geneerisiä kuvauksia laajoiksi seitsemän tapaustutkimuksen määrittelyiksi
- **Repositorion rakenne**: Päivitetty osio 10 vastaamaan kattavaa case study -sisältöä ja toteutustietoja
- **Muutospäiväkirja**: Lisätty 26. syyskuuta 2025 merkintä GitHub MCP Registryn lisäyksestä ja tapaustutkimusten parannuksista
- **Päiväys**: Päivitetty alaosan aikaleima vastaamaan viimeisintä revisiota (26.9.2025)

### Dokumentaation laadun parannukset
- **Yhdenmukaisuuden vahvistus**: Standardoitu tapaustutkimusten muotoilu ja rakenne kaikissa seitsemässä esimerkissä
- **Kattavuuden lisääminen**: Case studies kattavat nyt yritysratkaisut, kehittäjätuottavuuden ja ekosysteemikehityksen
- **Strateginen asemointi**: Korostettu MCP:n asemaa perustana agenttipohjaisten järjestelmien käyttöönotolle
- **Resurssien integrointi**: Lisätty GitHub MCP Registry -linkki lisäresursseihin

## 15. syyskuuta 2025

### Edistyneet aiheet laajennettu - Mukautetut siirrot & kontekstisuunnittelu

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Uusi edistynyt toteutusopas
- **README.md**: Täydellinen opas mukautettujen MCP-siirtojen toteutukseen
  - **Azure Event Grid -siirto**: Kattava palvelimeton tapahtumapohjainen siirtoratkaisu
    - C#, TypeScript ja Python -esimerkit Azure Functions -integraation kanssa
    - Tapahtumapohjaisia arkkitehtuurimalleja skaalautuviin MCP-ratkaisuihin
    - Webhook-vastaanottimet ja push-viestien käsittely
  - **Azure Event Hubs -siirto**: Suurivolyymisen suoratoiston siirtototeutus
    - Reaaliaikainen suoratoistokyky matalan viiveen skenaarioihin
    - Osiointi- ja checkpoint-hallintastrategiat
    - Viestien kehittely ja suorituskyvyn optimointi
  - **Yritysintegratiiviset mallit**: Tuotantovalmiit arkkitehtuuriesimerkit
    - Jaettu MCP-käsittely useaalla Azure Functionilla
    - Hybridisiirtorakenteet, joissa yhdistetään useita siirtotyyppejä
    - Viestien kestävyys, luotettavuus ja virheenkäsittely
  - **Tietoturva & valvonta**: Azure Key Vault -integraatio ja havaittavuusmallit
    - Hallinnoitu identiteetin tunnistus ja vähimmän oikeuden periaate
    - Application Insights -telemetria ja suorituskyvyn valvonta
    - Katkaisijat (circuit breakers) ja vian sietomallit
  - **Testauskehykset**: Mukautettujen siirtojen kattavat testausstrategiat
    - Yksikkötestaus testivakioiden ja mockausten avulla
    - Integraatiotestaus Azure Test Containers -ympäristössä
    - Suorituskyky- ja kuormitustestausnäkökohdat

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Nouseva AI-tieteenala
- **README.md**: Kattava katsaus kontekstisuunnitteluun nousevana alana
  - **Perusperiaatteet**: Täydellinen kontekstin jakaminen, toiminnan päätöksentekotietoisuus ja kontekstin ikkuna -hallinta
  - **MCP-protokollan yhteensopivuus**: Kuinka MCPn suunnittelu vastaa kontekstisuunnittelun haasteisiin
    - Kontekstin ikkunan rajoitukset ja progressiivisen latauksen strategiat
    - Relevanssin määrittely ja dynaaminen kontekstin haun optimointi
    - Monimodaalisen kontekstinkäsittelyn ja tietoturvan näkökohdat
  - **Toteutuslähestymistavat**: Yksisäikeiset vs. moni-agenttiarkkitehtuurit
    - Kontekstinpaloittelutekniikat ja priorisointimenetelmät
    - Progressiivinen kontekstilataus ja pakkausstrategiat
    - Kerrokselliset kontekstimenetelmät ja hakuoptimointi
  - **Mittauskehys**: Nousevat mittarit kontekstin tehokkuuden arvioimiseen
    - Syötteen tehokkuus, suorituskyky, laatu ja käyttäjäkokemus
    - Kokeelliset lähestymistavat kontekstin optimointiin
    - Virheanalyysi ja parannusmenetelmät

#### Opetussuunnitelman navigointipäivitykset (README.md)
- **Laajennettu moduulirakenne**: Päivitetty opetustaulukkoa sisältämään uudet edistyneet aiheet
  - Lisätty Context Engineering (5.14) ja Custom Transport (5.15)
  - Johdonmukainen muotoilu ja navigointilinkit kaikilla moduuleilla
  - Päivitetyt kuvaukset nykyisen sisällön mukaisiksi

### Hakemistorakenteen parannukset
- **Nimikäytännön yhdenmukaistaminen**: Kansio "mcp transport" nimetty uudelleen muotoon "mcp-transport" yhdenmukaisuuden vuoksi muiden edistyneiden aiheiden kansioiden kanssa
- **Sisällön organisointi**: Kaikki 05-AdvancedTopics-kansiot noudattavat nyt samaa nimipolkua (mcp-[topic])

### Dokumentaation laadun parannukset
- **MCP Specification -yhteensopivuus**: Kaikki uudet sisällöt viittaavat MCP Specification 2025-06-18 -versioon
- **Monikieliset esimerkit**: Kattavat koodiesimerkit C#:llä, TypeScriptillä ja Pythonilla
- **Yrityskeskeisyys**: Tuotantovalmiit mallit ja Azure-pilvintegraatio kautta linjan  
- **Visuaalinen dokumentaatio**: Mermaid-kaaviot arkkitehtuurin ja prosessien visualisointiin  

## 18. elokuuta 2025  

### Dokumentaation kattava päivitys - MCP 2025-06-18 Standardit  

#### MCP Turvallisuuden parhaat käytännöt (02-Security/) - Täysi modernisointi  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Täysin uudelleenkirjoitettu MCP Specification 2025-06-18 mukaisesti  
  - **Pakolliset vaatimukset**: Lisätty selkeät MUST/MUST NOT-vaatimukset virallisesta spesifikaatiosta selkein visuaalisin merkinnöin  
  - **12 ydinturvallisuuskäytäntöä**: Rakenne muutettu 15-kohdan listasta kattaviin turvallisuuden osa-alueisiin  
    - Token-turvallisuus ja autentikointi ulkoisen identiteettipalveluntarjoajan integroinnilla  
    - Istunnon hallinta ja siirtoturva kryptografisten vaatimusten kanssa  
    - AI-kohtainen uhkasuojaus Microsoft Prompt Shields -integraatiolla  
    - Käyttöoikeuksien hallinta ja valtuutukset vähimmän oikeuden periaatteella  
    - Sisällön turvallisuus ja valvonta Azure Content Safety -integraatiolla  
    - Toimitusketjun turvallisuus kattavalla komponenttien tarkistuksella  
    - OAuth-turvallisuus ja Confused Deputy -hyökkäyksen ehkäisy PKCE-menetelmällä  
    - Tapahtuma- ja häiriötilanteiden hallinta automaattisilla ominaisuuksilla  
    - Säännösten noudattaminen ja hallinnointi  
    - Kehittyneet turvallisuuskontrollit nollaluottamusarkkitehtuurilla  
    - Microsoftin turvallisuus-ekosysteemin integrointi kattavilla ratkaisulla  
    - Jatkuva turvallisuuden kehitys adaptiivisilla käytännöillä  
  - **Microsoftin turvallisuusratkaisut**: Parannettu ohjeistus Prompt Shieldsin, Azure Content Safetyn, Entra ID:n ja GitHub Advanced Securityn integrointiin  
  - **Toteutusresurssit**: Kattavat resurssilinkit ryhmitelty viralliseen MCP-dokumentaatioon, Microsoftin turvallisuusratkaisuihin, turvallisuusstandardeihin ja toteutusoppaisiin  

#### Kehittyneet turvallisuuskontrollit (02-Security/) - Yritystason toteutus  
- **MCP-SECURITY-CONTROLS-2025.md**: Täysin uudistettu yritystason turvallisuuskehys  
  - **9 kattavaa turvallisuusaluetta**: Laajennettu perustason kontrolleista yksityiskohtaiseen yrityskehykseen  
    - Kehittynyt autentikointi ja valtuutus Microsoft Entra ID -integraatiolla  
    - Token-turvallisuus ja anti-passthrough-kontrollit kattavalla validoinnilla  
    - Istunnon turvallisuuskontrollit kaappauksen estolla  
    - AI-kohtaiset turvallisuuskontrollit kehotepistosten ja työkalujen myrkytyksen estolla  
    - Confused Deputy -hyökkäyksen estäminen OAuth-välityksen turvallisuudella  
    - Työkalujen suoritusympäristön turvallisuus hiekkalaatikoilla ja eristyksellä  
    - Toimitusketjun turvallisuuskontrollit riippuvuuksien tarkistuksella  
    - Valvonta- ja havaitsemiskontrollit SIEM-integraatiolla  
    - Tapahtuma- ja häiriötilanteiden hallinta automaattisilla ominaisuuksilla  
  - **Toteutusesimerkit**: Lisätty yksityiskohtaiset YAML-konfiguraatiot ja koodiesimerkit  
  - **Microsoftin ratkaisujen integrointi**: Kattava käsittely Azure-turvapalveluista, GitHub Advanced Securitystä ja yritystason identiteetinhallinnasta  

#### Kehittyneet aihealueet turvallisuus (05-AdvancedTopics/mcp-security/) - Tuotantovalmiit toteutukset  
- **README.md**: Täysin uudelleenkirjoitettu yritysturvallisuuden toteutusta varten  
  - **Nykyisen spesifikaation mukaisuus**: Päivitetty MCP Specification 2025-06-18 mukaisiin pakollisiin turvallisuusvaatimuksiin  
  - **Parannettu autentikointi**: Microsoft Entra ID -integraatio kattavilla .NET- ja Java Spring Security -esimerkeillä  
  - **AI-turvallisuusintegraatio**: Microsoft Prompt Shieldsin ja Azure Content Safetyn toteutus yksityiskohtaisilla Python-esimerkeillä  
  - **Kehittynyt uhkien lieventäminen**: Kattavat toteutusesimerkit seuraaviin  
    - Confused Deputy -hyökkäyksen esto PKCE:llä ja käyttäjän hyväksynnän validoinnilla  
    - Token-passthrough-estot vastaanottaja- ja turvallisella token-hallinnalla  
    - Istunnon kaappauksen esto kryptografisella sitomisella ja käyttäytymisanalyysillä  
  - **Yritysturvallisuuden integraatio**: Azure Application Insights -valvonta, uhkien havaitsemisen putket ja toimitusketjun turvallisuus  
  - **Toteutuslistaus**: Selkeä pakollisten vs. suositeltujen turvallisuuskontrollien jako Microsoft-turvallisuus-ekosysteemin hyödyillä  

### Dokumentaation laatu ja standardien mukaisuus  
- **Spesifikaatioviitteet**: Päivitetty kaikki viitteet nykyiseen MCP Specification 2025-06-18  
- **Microsoftin turvallisuus-ekosysteemi**: Parannettu integraatio-ohjeistus kaikissa turvallisuusdokumenteissa  
- **Käytännön toteutus**: Lisätty yksityiskohtaiset koodiesimerkit .NET, Java ja Python -kielillä yritysmallien kanssa  
- **Resurssien organisointi**: Kattava virallisen dokumentaation, turvallisuusstandardien ja toteutusoppaiden luokittelu  
- **Visuaaliset indikaattorit**: Selkeä merkintä pakollisten vaatimusten ja suositeltujen käytäntöjen välillä  

#### Ydinkäsitteet (01-CoreConcepts/) - Täysi modernisointi  
- **Protokollaversion päivitys**: Päivitetty viittaukset nykyiseen MCP Specification 2025-06-18, päiväysformaatilla (VVVV-KK-PP)  
- **Arkkitehtuurin tarkennus**: Parannettu kuvaukset Hosts-, Clients- ja Servers-komponenteista vastaamaan nykyisiä MCP-arkkitehtuurimalleja  
  - Hosts nyt selkeästi määritelty AI-sovelluksiksi, jotka koordinoivat useita MCP-asiakasliittymiä  
  - Clients kuvattu protokollan yhdistäjinä, jotka ylläpitävät yksi-yhteen -suhdetta palvelimiin  
  - Servers täydennetty paikallisen ja etäkäytön skenaarioilla  
- **Primitivien uudelleenrakentaminen**: Täysi uudistus palvelin- ja asiakasprimitivien osalta  
  - Server Primitives: Resurssit (datankeruut), Kehot (mallipohjat), Työkalut (suoritettavat funktiot) yksityiskohtaisilla selityksillä ja esimerkeillä  
  - Client Primitives: Otanta (LLM:n suoritteet), Kysely (käyttäjän syöte), Lokitus (virheiden jäljitys/valvonta)  
  - Päivitetty nykyisten discovery- (`*/list`), nouto- (`*/get`) ja suoritustapojen (`*/call`) malleilla  
- **Protokollan arkkitehtuuri**: Esitelty kaksitasoinen arkkitehtuurimalli  
  - Datan taso: JSON-RPC 2.0 perusta elinkaaren hallinnalla ja primitiiveillä  
  - Kuljetustaso: STDIO (paikallinen) ja Streamable HTTP SSE:llä (etäkuljetus)  
- **Turvallisuuskehys**: Kattavat turvallisuusperiaatteet käyttäjän suostumuksen, tietosuojan, työkalujen suoritusturvallisuuden ja kuljetustason suojaamisen osalta  
- **Viestintämallit**: Päivitetyt protokollaviestit alustamiseen, löydön, suorituksen ja ilmoitusten virtoihin  
- **Koodiesimerkit**: Päivitetyt monikieliset esimerkit (.NET, Java, Python, JavaScript) nykyisten MCP SDK -mallien mukaisesti  

#### Turvallisuus (02-Security/) - Kattava turvallisuusuudistus  
- **Standardien mukaisuus**: Täydellinen yhdenmukaistaminen MCP Specification 2025-06-18 turvallisuusvaatimusten kanssa  
- **Autentikoinnin kehitys**: Dokumentoitu siirtymä mukautetuista OAuth-palvelimista ulkoisen identiteettipalveluntarjoajan valtuutukseen (Microsoft Entra ID)  
- **AI-kohtaisen uhan analyysi**: Parannettu kattavuus nykyaikaisista AI-hyökkäysvektoreista  
  - Yksityiskohtaiset kehotepistostilanteet todellisilla esimerkeillä  
  - Työkalujen myrkytysmenetelmät ja "rug pull" -hyökkäyskuviot  
  - Kontekstin myrkytys ja mallin sekoittamishyökkäykset  
- **Microsoftin AI-turvallisuusratkaisut**: Kattava käsittely Microsoftin turvallisuus-ekosysteemistä  
  - AI Prompt Shields kehittyneellä havaitsemisella, kohdentamisella ja rajausmenetelmillä  
  - Azure Content Safety -integraatiomallit  
  - GitHub Advanced Security toimitusketjun suojauksessa  
- **Kehittynyt uhkien lieventäminen**: Yksityiskohtaiset turvallisuuskontrollit  
  - Istunnon kaappaus MCP-spesifisillä hyökkäyksillä ja kryptografiset istuntotunnusvaatimukset  
  - Confused Deputy -ongelmat MCP-välityssovelluksissa selkeine suostumusvaatimuksineen  
  - Token-passthrough-haavoittuvuudet pakollisilla validointikontrolleilla  
- **Toimitusketjun turvallisuus**: Laajennettu AI-toimitusketjun kattavuus sisältäen pohjamallit, upotepalvelut, kontekstin tarjoajat ja kolmannen osapuolen API:t  
- **Perusturvallisuus**: Parannettu integraatio yritysturvamalleihin sisältäen nollaluottamusarkkitehtuurin ja Microsoftin turvallisuus-ekosysteemin  
- **Resurssien organisointi**: Kattava resurssilinkkien luokittelu tyypin mukaan (viralliset dokumentit, standardit, tutkimus, Microsoft-ratkaisut, toteutusoppaat)  

### Dokumentaation laadun parannukset  
- **Jäsennellyt oppimistavoitteet**: Parannetut tavoitteet konkreettisilla, saavutettavilla tuloksilla  
- **Ristiviittaukset**: Lisätty linkit liittyvien turvallisuus- ja ydinkäsitetopikkien välillä  
- **Ajantasainen tieto**: Päivitetty kaikki aikaviitteet ja spesifikaatiolinkit ajantasaisiksi  
- **Toteutusohjeistus**: Lisätty konkreettisia, toimeenpantavia toteutusohjeita molempiin osioihin  

## 16. heinäkuuta 2025  

### README ja navigointiparannukset  
- Täysin uudelleen suunniteltu oppimateriaalien navigaatio README.md -tiedostossa  
- Vaihdettu `<details>`-tagit saavutettavampaan taulukkomuotoon  
- Luotu vaihtoehtoisia asetteluvaihtoehtoja uuteen "alternative_layouts" -kansioon  
- Lisätty korttipohjaisia, välilehtityylisiä ja harmonikkatyylisiä navigointiesimerkkejä  
- Päivitetty repositorion rakenne-osio sisältämään kaikki uusimmat tiedostot  
- Parannettu "How to Use This Curriculum" -osiota selkeillä suosituksilla  
- Päivitetty MCP-spesifikaatiolinkit osoittamaan oikeisiin URL-osoitteisiin  
- Lisätty Context Engineering -osio (5.14) opintorakenteeseen  

### Opasopintojen päivitykset  
- Täysin uudistettu opasopintojen rakenne vastaamaan nykyistä repositorion rakennetta  
- Lisätty uusia osioita MCP-clientteihin ja työkaluihin sekä suosittuihin MCP-palvelimiin  
- Päivitetty Visuaalinen opintokartta näyttämään kaikki aiheet tarkasti  
- Parannettu Advanced Topics -kuvauksia kattamaan kaikki erikoisalat  
- Päivitetty Case Studies -osio todellisten esimerkkien mukaiseksi  
- Lisätty tämä kattava muutosloki  

### Yhteisön kontribuutiot (06-CommunityContributions/)  
- Lisätty yksityiskohtaista tietoa MCP-palvelimista kuvageneraatiota varten  
- Lisätty kattava osio Clauden käytöstä VSCode:ssa  
- Lisätty Cline-terminaaliasiakas asennus- ja käyttöohjeet  
- Päivitetty MCP-client-osion kattamaan kaikki suosituimmat asiakasvaihtoehdot  
- Parannettu kontribuutioesimerkkejä tarkemmilla koodinäytteillä  

### Kehittyneet aiheet (05-AdvancedTopics/)  
- Jäsennelty kaikki erikoisaiheiden kansiot yhdenmukaisin nimeämiskäytännöin  
- Lisätty kontekstiinsinöörimateriaalit ja esimerkit  
- Lisätty Foundry-agentin integraatiodokumentaatio  
- Parannettu Entra ID:n turvallisuusintegraatiodokumentaatiota  

## 11. kesäkuuta 2025  

### Alkuperäinen luominen  
- Julkaistu MCP for Beginners -oppimateriaalin ensimmäinen versio  
- Luotu perusrakenne kaikille 10 pääosiolle  
- Toteutettu Visuaalinen opintokartta navigointia varten  
- Lisätty aloitusnäytteitä eri ohjelmointikielillä  

### Aloittaminen (03-GettingStarted/)  
- Luotu ensimmäiset palvelintoteutusesimerkit  
- Lisätty asiakasohjelmiston kehitysohjeet  
- Sisällytetty LLM-asiakasintegroinnin ohjeet  
- Lisätty VS Code -integraatiodokumentaatio  
- Toteutettu Server-Sent Events (SSE) -palvelin-esimerkit  

### Ydinkäsitteet (01-CoreConcepts/)  
- Lisätty yksityiskohtainen selitys asiakas-palvelin-arkkitehtuurista  
- Luotu dokumentaatio tärkeistä protokollakomponenteista  
- Dokumentoitu viestintämallit MCP:ssä  

## 23. toukokuuta 2025  

### Repositorion rakenne  
- Alustettu repositorion perusrakenne  
- Luotu README-tiedostot jokaiselle pääosalle  
- Otettu käyttöön käännösinfrastruktuuri  
- Lisätty kuvavarastot ja kaaviot  

### Dokumentaatio  
- Luotu alkuperäinen README.md kurssin yleiskatsauksella  
- Lisätty CODE_OF_CONDUCT.md ja SECURITY.md  
- Otettu käyttöön SUPPORT.md tukipyynnön ohjeilla  
- Luotu alustava opasopintojen rakenne  

## 15. huhtikuuta 2025  

### Suunnittelu ja kehys  
- Alustava suunnittelu MCP for Beginners -oppimateriaalille  
- Määritelty oppimistavoitteet ja kohdeyleisö  
- Luotu 10-osioinen rakenne oppimateriaalille  
- Kehitetty konseptuaalinen kehys esimerkeille ja tapaustutkimuksille  
- Luotu ensimmäiset prototyyppiesimerkit ydinkäsitteistä  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->