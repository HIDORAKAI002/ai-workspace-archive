# Zmeny: Kurikulum MCP pre Začiatočníkov

Tento dokument slúži ako záznam všetkých významných zmien v kurikule Model Context Protocol (MCP) pre Začiatočníkov. Zmeny sú zdokumentované v obrátenom chronologickom poradí (najnovšie zmeny prvé).

## 16. jún 2026

### Zladenie špecifikácie MCP a validácia príkladov

Overili sme kurikulum podľa súčasnej **MCP Specifikácie 2025-11-25** a najnovších oficiálnych SDK, následne sme upravili zostávajúce zastaralé referencie na špecifikáciu a potvrdili, že základné vzorové príklady sa stále dajú zostaviť a spustiť.

#### Opravy verzie špecifikácie (2025-06-18 / 2025-03-26 → 2025-11-25)

Aktualizovali sme anglický obsah tam, kde ešte uvádzal staršiu revíziu špecifikácie ako *aktuálny/najnovší* štandard, a preadresovali odkazy na kanonické cesty špecifikácie na `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Aktualizovaný banner "Aktuálny štandard", úvod, nadpisy o základných bezpečnostných princípoch, povinných požiadavkách, sekcia Microsoft Entra ID, odkazy na Referencie & Zdroje a záverečné bezpečnostné oznámenie (8 referencií) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aktualizovaný odkaz na doplnkové zdroje špecifikácie a banner "Aktuálny štandard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Nahradil zastaraný odkaz `2025-03-26` na stránku o bezpečnosti a dôvere aktuálnou stránkou o najlepších bezpečnostných praktikách 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Aktualizovaný odkaz na oficiálnu dokumentáciu vzorkovania na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Aktualizovaný odkaz na prítomný čas "aktualná špecifikácia MCP" a odkaz na doplnkové zdroje špecifikácie na 2025-11-25 (historické poznámky o zrušení SSE ponechané pre presnosť)

#### Validácia príkladov podľa aktuálnych SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolvoval `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` prešiel bez chýb typu — existujúce API `McpServer`/`StdioServerTransport` zostávajú platné
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validované v izolovanom `.venv` s `mcp[cli]` (1.27.2); `py_compile` prešiel a `FastMCP.list_tools()` správne vrátil nástroje `add` a `subtract`
- Potvrdili sme, že všetky rozsahy verzií `@modelcontextprotocol/sdk` použitých v príkladoch (`>=1.26.0` / `^1.26.0` / `^1.27.0`) sa čistým spôsobom resolvujú na aktuálnu verziu `1.29.0` bez zlomenia API

#### Vyrovnanie pripnutí závislostí (uzavretie verziových medzier)

Zvýšili sme zastarané pripnutia SDK tak, aby každý príklad sledoval aktuálne vydanie MCP, podľa konvencie celého repozitára:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Zvýšený `@modelcontextprotocol/sdk` z `^1.8.0` na `>=1.26.0` a aktualizovaný zastaraný popis balíka `"updated for MCP 2025-06-18"` na `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** a **lab4/code/github_mcp_server/pyproject.toml**: Zvýšené presné pripnutie `mcp==1.23.0` na `mcp>=1.26.0`; znovu vygenerované obe `uv.lock` súbory (`uv lock`), aby lockfile-y resolvovali na aktuálnu `mcp 1.27.2` a zostali synchronizované s manifestami

#### Analýza medzier v kurikule — pokrytie najnovších funkcií špecifikácie

Overili sme, že kurikulum už pokrýva všetky primitívne prvky zavedené alebo rozšírené v MCP 2025-11-25, takže žiadne obsahové medzery neostávajú:
- **Sampling**: Lekcia 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitácia (vrátane režimu URL)**: Zdokumentované v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Zdokumentované v 00-Introduction, 01-CoreConcepts a 05-AdvancedTopics/mcp-root-contexts
- **Úlohy (experimentálne, dlhodobé operácie)**: Zdokumentované v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Anotácie nástrojov** (`readOnlyHint` / `destructiveHint`): Zdokumentované v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features

### Zosilnenie bezpečnosti a oprava zraniteľností závislostí

Prebehol úplný bezpečnostný audit všetkých manifestov závislostí a zdrojového kódu príkladov, následne sme vyriešili všetky hlásené npm upozornenia a jedno nájdené zranenie v kóde. Po oprave hlásenie `npm audit` uvádza **0 zraniteľností** vo všetkých auditovaných adresároch.

#### Zraniteľnosti závislostí npm (tranzitívne) — Opravené

Auditovali sme všetkých 15 zakomponovaných súborov `package-lock.json`. Zraniteľnosti boli obmedzené na tranzitívne závislosti ťahané dev nástrojom MCP Inspector, klientom OpenAI a MCP SDK; všetky boli vyriešené bez zlomenia príkladov:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** a **lab3/code/weather_mcp/inspector**: Zvýšený `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), čo odstránilo upozornenia na zabalené `ajv`, `brace-expansion`, `diff`, `path-to-regexp` a `ws`. Pridaný záznam npm `overrides` nútiaci záplatovaný `shell-quote@1.8.4` na elimináciu zostávajúceho kritického upozornenia viazaného na `concurrently`; znovu vygenerované lockfile-y (teraz s 0 zraniteľnosťami)
- **03-GettingStarted/samples/typescript**: `npm audit fix` aktualizoval tranzitívny balík `qs` (stredný stupeň) na záplatovanú verziu
- **03-GettingStarted/samples/javascript**: `npm audit fix` aktualizoval tranzitívny balík `hono` (stredný stupeň) na záplatovanú verziu
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` aktualizoval tranzitívny balík `form-data` (vysoký stupeň) na záplatovanú verziu
- **03-GettingStarted/11-simple-auth/solution/typescript**: Vygenerovaný chýbajúci `package-lock.json`, aby bol projekt reprodukovateľný a auditovateľný (0 zraniteľností)

#### Bezpečnostná oprava na úrovni kódu (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Odstránený parameter `shell=True` v nástroji `open_in_vscode`. Predchádzajúce spustenie pomocou `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` umožňovalo interpretáciu shellových metaznakov v ceste ku priečinku prostredníctvom `cmd.exe` (vektor príkazovej injekcie). Teraz sa priamo spúšťa vyriešený `Code.exe` s priečinkom ako argumentom — bez shellu — čo je funkčne ekvivalentné a bezpečné.

#### Audit závislostí Pythonu

- Audítovali sme všetky súbory požiadaviek Pythonu pomocou `pip-audit`. **05-AdvancedTopics** a **03-GettingStarted/samples/python** nehlásili žiadne známe zraniteľnosti (ich rozsahy `mcp` / `httpx` / `pydantic` / `python-dotenv` resolvujú na aktuálne záplatované vydania)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` označil tranzitívnu závislosť **`werkzeug` 3.1.1** s tromi upozorneniami na DoS prostredníctvom `safe_join` na zariadeniach Windows — `CVE-2025-66221`, `CVE-2026-21860` a `CVE-2026-27199` (všetky opravené vo verzii 3.1.6). Pridané explicitné bezpečnostné pripnutie `werkzeug>=3.1.6`, aby sa resolvovalo záplatované vydanie; overené, že obmedzenie sa čistým spôsobom resolvuje so stackom `chainlit` / `mcp` / `semantic-kernel`

### Prebranding produktov

Aktualizovaný celý obsah kurikula na reflektovanie rebrandingu produktov Microsoftu:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Aktualizovaný odkaz na Discord komunitu
- **AGENTS.md**: Aktualizovaná referencia na Discord server
- **README.md**: Aktualizované odkazy na technologický ekosystém
- **study_guide.md**: Aktualizované odkazy v prípadovej štúdii
- **05-AdvancedTopics/README.md**: Aktualizovaný názov a popis modulu 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Aktualizovaný nadpis sekcie a popis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Kompletná aktualizácia názvu modulu a obsahu
- **05-AdvancedTopics/mcp-security-entra/README.md**: Aktualizovaný krížový odkaz
- **07-LessonsfromEarlyAdoption/README.md**: Aktualizované odkazy v prípadovej štúdii
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Aktualizovaný nadpis Sekcie 9, odznaky a schopnosti
- **08-BestPractices/README.md**: Aktualizovaný odkaz na Discord komunitu
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Aktualizovaná referencia na Discord kanál
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Aktualizovaná referencia nasadenia modelu
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Aktualizovaná tabuľka AI služieb
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Aktualizované odkazy na zdroje

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Aktualizované hlavné odkazy v kurikule
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aktualizovaný názov modulu, prehľad a všetky nadpisy modulov
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aktualizovaný názov, vzdelávacie ciele, inštrukcie na nastavenie a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aktualizovaný názov, vzdelávacie ciele, tabuľka MCP hostiteľov a krížové odkazy
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aktualizovaný názov, odznaky, predpoklady a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aktualizované odkazy na Agent Builder a spätná väzba
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aktualizované predpoklady a odkazy na rozšírenie

---

## 11. apríl 2026

### Nová lekcia, opravy dokumentácie a aktualizácie závislostí

#### Pridaný nový obsah kurikula

**Modul 05 - Pokročilé témy**
- **Lekcia 5.17: Adversárne multiagentné uvažovanie s MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nový rozsiahly sprievodca pokrývajúci vzor adversárnej debate pre multiagentné systémy
  - Mermaid diagram architektúry: dvaja agenti → zdieľaný MCP server → zápisník debaty → sudca → verdikt
  - Zdieľaný MCP server pre nástroje (`web_search` + `run_python`) implementovaný v Pythone a TypeScripte
  - Protichodné systémové prompt-y (ZA / PROTI / Sudca) s explicitnými požiadavkami na použitie nástroja
  - Orchestrátor debaty v Pythone, TypeScripte a C#, ktorý riadi kolá a trasuje argumenty
  - Prepojenie MCP `ClientSession` pre orchestrátor na reálne volania nástrojov
  - Používateľská tabuľka (detekcia halucinácií, hrozbové modelovanie, revízia návrhu API, overovanie faktov, výber technológií)
  - Bezpečnostné úvahy: sandboxovanie vykonávania, validácia volania nástrojov, limitovanie rýchlosti, auditné protokolovanie
  - Štruktúrované cvičenie s tromi praktickými scenármi (kontrola kódu, rozhodnutie o architektúre, obsahová moderácia)

#### Opravy dokumentácie

**Modul 03 - Začíname**
- **05-stdio-server/README.md**: Opravený neúplný príklad TypeScript stdio servera — pridaná chýbajúca inštancia transportu (`new StdioServerTransport()`) a volanie `server.connect(transport)` tak, aby zodpovedalo príkladom v Pythone a .NET v rovnakej sekcii
- **14-sampling/README.md**: Oprava preklepu — opravené `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Aktualizácie kurikula

**Hlavný README.md**
- Pridaný záznam 5.17 (Adversárne multiagentné uvažovanie s MCP) do tabuľky kurikula s priamym odkazom na novú lekciu

**05-AdvancedTopics/README.md**
- Pridaný riadok lekcie 5.17 do tabuľky lekcií

**study_guide.md**
- Pridaná téma Adversárne multiagentné uvažovanie do myšlienkovej mapy a slovného popisu Pokročilých tém

#### Opravy kódu a bezpečnosti

**Modul 05 - Adversárni agenti (`mcp-adversarial-agents`)**
- **Bezpečnostná oprava — príkazová injekcia**: Nahradené `execSync` shellové interpolácie volaním `execFile` + `promisify` v TypeScript nástroji `run_python`, čím sa odstránila plocha pre príkazovú injekciu (kód kontrolovaný LLM je teraz odovzdaný ako literálny prvok argv bez akéhokoľvek zapojenia shellu)
- **Zapojenie slučky nástroja MCP**: Aktualizovaný orchestrátor debaty v Pythone používa klienta `AsyncAnthropic` (nahrádza blokujúci synchronný `Anthropic`), odovzdáva živú `ClientSession` priamo každému kroku agenta, získava definície nástrojov cez `session.list_tools()` v každom kroku a odosiela bloky `tool_use` cez `session.call_tool()` v slučke, až kým model nevygeneruje finálnu textovú odpoveď.

#### Aktualizácie závislostí

- Zvýšená verzia `hono` na 4.12.12 v viacerých balíčkoch (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Zvýšená verzia `@hono/node-server` z 1.19.11 na 1.19.13 v balíčkoch TypeScriptu
- Zvýšená verzia `cryptography` z 46.0.5 na 46.0.7 v Pythone (10-StreamliningAIWorkflows laboratóriá 3 a 4)
- Zvýšená verzia `lodash` z 4.17.23 na 4.18.1 v inspektore 10-StreamliningAIWorkflows

#### Preklady

- Synchronizované preklady pre 48+ jazykov s najnovšími zmenami zdroja (aktualizácia i18n)

---

## 5. februára 2026

### Zlepšenia všeobecnej validácie a navigácie v repozitári

#### Pridaný nový obsah kurikula

**Modul 03 - Začíname**
- **12-mcp-hosts/README.md**: Nový komplexný sprievodca nastavením MCP hostiteľov
  - Príklady konfigurácie Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Šablóny JSON konfigurácií pre všetky hlavné hostiteľské platformy
  - Porovnávacia tabuľka typov transportu (stdio, SSE/HTTP, WebSocket)
  - Riešenie bežných problémov s pripojením
  - Najlepšie bezpečnostné postupy pri konfigurácii hostiteľa

- **13-mcp-inspector/README.md**: Nový sprievodca ladením pre MCP Inspector
  - Metódy inštalácie (npx, globálne npm, zo zdroja)
  - Pripojenie k serverom cez stdio a HTTP/SSE
  - Testovanie nástrojov, zdrojov a tokov výziev
  - Integrácia MCP Inspectora do VS Code
  - Bežné ladenie a riešenia problémov

**Modul 04 - Praktická implementácia**
- **pagination/README.md**: Nový sprievodca implementáciou stránkovania
  - Vzory stránkovania s kurzorom v Pythone, TypeScripte, Jave
  - Spracovanie stránkovania na strane klienta
  - Návrhové stratégie kurzorov (nepriehľadné vs. štruktúrované)
  - Odporúčania na optimalizáciu výkonu

**Modul 05 - Pokročilé témy**
- **mcp-protocol-features/README.md**: Hĺbkový pohľad na nové funkcie protokolu
  - Implementácia notifikácií o pokroku
  - Vzory zrušenia požiadaviek
  - Šablóny zdrojov s URI vzormi
  - Správa životného cyklu servera
  - Riadenie úrovne logovania
  - Vzory spracovania chýb s kódmi JSON-RPC

#### Opravy navigácie (aktualizovaných 24+ súborov)

**Hlavné README v moduloch**
 Teraz odkazujú na prvú lekciu A tiež na ďalší modul

**Pod-súbory 02-Security**
- Všetkých 5 doplnkových bezpečnostných dokumentov teraz obsahuje sekciu „Čo ďalej“ s navigáciou

**Súbory 09-CaseStudy**
- Všetky súbory prípadových štúdií teraz majú postupnú navigáciu

**Laboratóriá 10-StreamliningAI**
Pridaná sekcia Čo ďalej do prehľadu modulu 10 a modulu 11

#### Opravy kódu a obsahu

**Aktualizácie SDK a závislostí**
Opravená prázdna verzia openai na `^4.95.0`
Aktualizované SDK z `^1.8.0` na `>=1.26.0`
Aktualizované verzie mcp na `>=1.26.0`

**Opravy kódu**
Opravený neplatný model `gpt-4o-mini` na `gpt-4.1-mini`

**Opravy obsahu**
Opravený zlomený odkaz `READMEmd` → `README.md`, opravený názov sekcie kurikula `Module 1-3` → `Module 0-3`, opravená cesta rozlišujúca malé a veľké písmená
Odstránený poškodený duplicitný obsah Prípadovej štúdie 5

**Zlepšenia v sprievode pre začiatočníkov**
Pridaný správny úvod, učebné ciele a predpoklady pre začiatočníkov

#### Aktualizácie kurikula

**Hlavný README.md**
- Pridané položky 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Stránkovanie), 5.16 (Funkcie protokolu) do tabuľky kurikula

**Modulové README**
Pridané lekcie 12 a 13 do zoznamu lekcií
Pridaná sekcia Praktické príručky so stránkovaním
Pridané lekcie 5.15 (Vlastný transport) a 5.16 (Funkcie protokolu)

**study_guide.md**
- Aktualizovaná myšlienková mapa so všetkými novými témami: Nastavenie MCP Hosts, MCP Inspector, stratégie stránkovania, hĺbkový prehľad funkcií protokolu

## 28. januára 2026

### Preskúmanie súladu so špecifikáciou MCP 2025-11-25

#### Vylepšenia základných konceptov (01-CoreConcepts/)
- **Nový klientský primitív – Roots**: Pridaná komplexná dokumentácia klientského primitívu Roots umožňujúceho serverom chápať hranice súborového systému a prístupové oprávnenia
- **Anotácie nástrojov**: Pridaná dokumentácia o behaviorálnych anotáciách nástrojov (`readOnlyHint`, `destructiveHint`) pre lepšie rozhodovanie o vykonaní nástrojov
- **Volanie nástrojov pri vzorkovaní**: Aktualizovaná dokumentácia Sampling o parametre `tools` a `toolChoice` pre volanie nástrojov riadené modelom počas vzorkovania
- **Elikácia režimu URL**: Pridaná dokumentácia o elikácii založenej na URL na externé webové interakcie iniciované serverom
- **Úlohy (experimentálne)**: Pridaná nová sekcia dokumentujúca experimentálnu funkciu Úloh pre trvalé obaly vykonávania a odložené získavanie výsledkov
- **Podpora ikoniek**: Uvedené, že nástroje, zdroje, šablóny zdrojov a výzvy môžu obsahovať ikonky ako doplnkové metadáta

#### Aktualizácie dokumentácie
- **README.md**: Pridaná referencia verzie MCP Specification 2025-11-25 a vysvetlenie verziovania podľa dátumu
- **study_guide.md**: Aktualizovaná mapa kurikula o Úlohy a Anotácie nástrojov v časti základných konceptov; aktualizovaný časový údaj dokumentu

#### Overenie súladu špecifikácie
- **Verzia protokolu**: Overené, že všetky dokumenty odkazujú na aktuálnu MCP Specification 2025-11-25
- **Zladenie architektúry**: Potvrdená presnosť dokumentácie o dvojvrstvovej architektúre (vrstva dát + vrstva transportu)
- **Dokumentácia primitívov**: Validované klientské a serverové primitíva (Zdroje, Výzvy, Nástroje / Sampling, Elicitation, Logging, Roots)
- **Mechanizmy transportu**: Overená správnosť dokumentácie STDIO a streamovateľného HTTP transportu
- **Bezpečnostné odporúčania**: Potvrdenie zhody s aktuálnymi bezpečnostnými postupmi MCP

#### Kľúčové funkcie MCP 2025-11-25 zdokumentované
- **Objavovanie OpenID Connect**: Discovery autentifikačných serverov cez OIDC
- **Metadata dokumenty OAuth Client ID**: Odporúčané mechanizmy registrácie klientov
- **JSON Schema 2020-12**: Predvolený dialekt definícií MCP schém
- **Systém vrstiev SDK**: Formalizované požiadavky na podporu a údržbu SDK funkcií
- **Štruktúra správy**: Formalizované pracovné a záujmové skupiny v správe MCP

### Hlavná aktualizácia bezpečnostnej dokumentácie (02-Security/)

#### Integrácia MCP Security Summit Workshop (Sherpa)
- **Nový praktický tréningový zdroj**: Pridaná komplexná integrácia s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) vo všetkých bezpečnostných dokumentoch
- **Pokrytie expedície od tábora k táboru**: Zdokumentovaný kompletný postup z Base Camp po Summit
- **Zladenie s OWASP**: Všetky bezpečnostné odporúčania teraz mapované na OWASP MCP Azure Security Guide riziká

#### Integrácia OWASP MCP Top 10
- **Nová sekcia**: Pridaná tabuľka s 10 najväčšími bezpečnostnými rizikami OWASP MCP vrátane mitigácií pre Azure do hlavného bezpečnostného README
- **Dokumentácia podľa rizika**: Aktualizovaný mcp-security-controls-2025.md so štandardizovanými odkazmi na riziká OWASP MCP pre každú bezpečnostnú doménu
- **Referenčná architektúra**: Odkaz na OWASP MCP Azure Security Guide referenčnú architektúru a implementačné vzory

#### Aktualizované bezpečnostné súbory
- **README.md**: Pridaný prehľad Sherpa workshopu, tabuľka trasy expedície, súhrn rizík OWASP MCP Top 10 a sekcia praktického tréningu
- **mcp-security-controls-2025.md**: Aktualizovaný nadpis na február 2026, pridané odkazy na riziká OWASP MCP (MCP01-MCP08), opravený nesúlad verzie špecifikácie
- **mcp-security-best-practices-2025.md**: Pridaná sekcia Sherpa a OWASP zdrojov, aktualizovaný časový údaj
- **mcp-best-practices.md**: Pridaná sekcia praktického tréningu so Sherpa a OWASP odkazmi
- **azure-content-safety-implementation.md**: Pridaná referencia OWASP MCP06, zarovnanie s táborom 3 Sherpa, a sekcia ďalších zdrojov

#### Nové odkazy na zdroje
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Jednotlivé stránky OWASP MCP rizík (MCP01-MCP10)

### Zladenie celého kurikula so špecifikáciou MCP 2025-11-25

#### Modul 03 - Začíname
- **Dokumentácia SDK**: Pridané Go SDK do oficiálneho zoznamu SDK; aktualizované všetky odkazy na SDK podľa MCP Specification 2025-11-25
- **Objasnenie transportu**: Aktualizované popisy STDIO a HTTP streaming transportu s explicitnými odkazmi na špecifikáciu

#### Modul 04 - Praktická implementácia
- **Aktualizácie SDK**: Pridané Go SDK; aktualizovaný zoznam SDK s odkazom na verziu špecifikácie
- **Špecifikácia autorizácie**: Aktualizovaný odkaz na MCP Authorization špecifikáciu s verziou 2025-11-25

#### Modul 05 - Pokročilé témy
- **Nové funkcie**: Pridaná poznámka o nových funkciách MCP Specification 2025-11-25 (Úlohy, Anotácie nástrojov, Režim URL elikácie, Roots)
- **Bezpečnostné zdroje**: Pridané odkazy na OWASP MCP Top 10 a Sherpa workshop do doplnkových zdrojov

#### Modul 06 - Príspevky komunity
- **Zoznam SDK**: Pridané Swift a Rust SDK; aktualizovaný odkaz na špecifikáciu 2025-11-25
- **Referencia špecifikácie**: Aktualizovaný odkaz na priamu URL MCP Specification

#### Modul 07 - Lekcie z raného nasadenia
- **Aktualizácia zdrojov**: Pridanie MCP Specification 2025-11-25 a OWASP MCP Top 10 do doplnkových zdrojov

#### Modul 08 - Najlepšie praktiky
- **Verzia špecifikácie**: Aktualizovaná referencia MCP Specification na 2025-11-25
- **Bezpečnostné zdroje**: Pridané OWASP MCP Top 10 a Sherpa workshop do doplnkových zdrojov

#### Modul 10 - Zefektívnenie AI pracovných tokov
- **Aktualizácia odznaku**: Zmena verzie MCP badge z verzie SDK (1.9.3) na verziu špecifikácie (2025-11-25)
- **Odkazy na zdroje**: Aktualizované odkazy na MCP Specification; pridané OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Odkaz na špecifikáciu**: Aktualizovaný odkaz na MCP Specification verzie 2025-11-25
- **Bezpečnostné zdroje**: Pridané OWASP MCP Top 10 do oficiálnych zdrojov

## 18. decembra 2025

### Aktualizácia bezpečnostnej dokumentácie - MCP Specification 2025-11-25

#### MCP Bezpečnostné najlepšie praktiky (02-Security/mcp-best-practices.md) - Aktualizácia verzie špecifikácie
- **Aktualizácia verzie protokolu**: Aktualizované na najnovšiu verziu MCP Specification 2025-11-25 (vydaná 25. novembra 2025)
  - Aktualizované všetky odkazy na verziu špecifikácie z 2025-06-18 na 2025-11-25
  - Aktualizované dátumy dokumentov z 18. augusta 2025 na 18. decembra 2025
  - Overené, že všetky URL so špecifikáciou vedú na aktuálnu dokumentáciu
- **Validácia obsahu**: Komplexná validácia najlepších bezpečnostných praktík podľa najnovších štandardov
  - **Bezpečnostné riešenia Microsoftu**: Overená aktuálna terminológia a odkazy na Prompt Shields (predtým „detekcia jailbreak rizika“), Azure Content Safety, Microsoft Entra ID a Azure Key Vault
  - **OAuth 2.1 bezpečnosť**: Potvrdené zladenie s najnovšími bezpečnostnými praktikami OAuth
  - **Štandardy OWASP**: Validované, že odkazy na OWASP Top 10 pre LLM zostávajú aktuálne
  - **Azure služby**: Overené všetky odkazy na dokumentáciu Microsoft Azure a najlepšie praktiky
- **Zladenie so štandardmi**: Všetky referencované bezpečnostné štandardy sú aktuálne
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Najlepšie bezpečnostné praktiky OAuth 2.1
  - Azure bezpečnostné a súladové rámce
- **Implementačné zdroje**: Overené všetky odkazy na sprievodcov implementáciou a zdroje
  - OAuth vzory autentifikácie API Management
  - Integrácia Microsoft Entra ID
  - Správa tajomstiev Azure Key Vault
  - DevSecOps pipeline a monitorovacie riešenia

### Overovanie kvality dokumentácie
- **Súlad so špecifikáciou**: Zabezpečené, že všetky povinné bezpečnostné požiadavky MCP (MUST/MUST NOT) sú v zhode s najnovšou špecifikáciou
- **Aktualnosť zdrojov**: Overené, že všetky externé odkazy na Microsoft dokumentáciu, bezpečnostné štandardy a implementačné sprievodcovia sú platné
- **Pokrytie najlepších praktík**: Potvrdené komplexné pokrytie autentifikácie, autorizácie, hrozieb špecifických pre AI, bezpečnosti dodávateľského reťazca a podnikových vzorov

## 6. októbra 2025

### Rozšírenie sekcie Začíname – Pokročilé použitie servera a jednoduchá autentifikácia

#### Pokročilé použitie servera (03-GettingStarted/10-advanced)
- **Pridaná nová kapitola**: Predstavený komplexný sprievodca pokročilým používaním MCP servera, pokrývajúci bežné aj nízkoúrovňové architektúry servera.
  - **Bežný vs. nízkoúrovňový server**: Podrobná komparácia a príklady kódu v Pythone a TypeScripte pre oba prístupy.
  - **Návrh na báze handlerov**: Vysvetlenie správy nástrojov/zdrojov/výziev založené na handleroch pre škálovateľné a flexibilné implementácie servera.
  - **Praktické vzory**: Reálne scenáre, kde sú nízkoúrovňové serverové vzory výhodné pre pokročilé funkcie a architektúru.
#### Jednoduchá autentifikácia (03-GettingStarted/11-simple-auth)
- **Pridaná nová kapitola**: Krok za krokom sprievodca implementáciou jednoduchej autentifikácie v MCP serveroch.
  - **Koncepty autentifikácie**: Jasné vysvetlenie rozdielu medzi autentifikáciou a autorizáciou, a správy poverení.
  - **Základná implementácia autentifikácie**: Vzory autentifikácie založené na middleware v Pythone (Starlette) a TypeScripte (Express) s ukážkami kódu.
  - **Postup k pokročilej bezpečnosti**: Návod, ako začať s jednoduchou autentifikáciou a pokračovať na OAuth 2.1 a RBAC s odkazmi na pokročilé bezpečnostné moduly.

Tieto doplnky poskytujú praktické, prakticky orientované návody na tvorbu robustnejších, bezpečnejších a flexibilnejších implementácií MCP serverov, ktoré prepájajú základné koncepty s pokročilými produkčnými vzormi.

## 29. september 2025

### Laboratóriá integrácie databázy MCP servera – komplexná praktická cesta učenia

#### 11-MCPServerHandsOnLabs – Nový kompletný kurz integrácie databázy  
- **Kompletná 13-laboratórna učebná cesta**: Pridaný komplexný praktický kurz na tvorbu produkčných MCP serverov s integráciou PostgreSQL databázy  
  - **Reálne implementácie**: Prípad použitia Zava Retail analytics demonštrujúci podnikové vzory  
  - **Štruktúrovaný postup učenia**:  
    - **Laboratóriá 00–03: Základy** – Úvod, jadrová architektúra, bezpečnosť a multi-tenantnosť, nastavenie prostredia  
    - **Laboratóriá 04–06: Tvorba MCP servera** – Návrh databázy a schémy, implementácia MCP servera, vývoj nástrojov  
    - **Laboratóriá 07–09: Pokročilé funkcie** – Integrácia sémantického vyhľadávania, testovanie a ladenie, integrácia s VS Code  
    - **Laboratóriá 10–12: Produkcia a osvedčené postupy** – Strategie nasadenia, monitorovanie a observabilita, osvedčené postupy a optimalizácie  
  - **Podnikové technológie**: Framework FastMCP, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights  
  - **Pokročilé funkcie**: RLS (Row Level Security), sémantické vyhľadávanie, multi-tenantný prístup k dátam, vektorové reprezentácie, monitorovanie v reálnom čase  

#### Štandardizácia terminológie – konverzia modulu na laboratórium  
- **Komplexná aktualizácia dokumentácie**: Systematická aktualizácia všetkých README súborov v 11-MCPServerHandsOnLabs na používanie terminológie „Laboratórium“ namiesto „Modul“  
  - **Hlavičky sekcií**: Preformulované „Čo tento modul pokrýva“ na „Čo toto laboratórium pokrýva“ vo všetkých 13 laboratóriách  
  - **Popis obsahu**: Nahradené „Tento modul poskytuje...“ za „Toto laboratórium poskytuje...“ v celej dokumentácii  
  - **Ciele učenia**: Preformulované „Na konci tohto modulu...“ na „Na konci tohto laboratória...“  
  - **Navigačné odkazy**: Všetky odkazy „Modul XX:“ prevedené na „Laboratórium XX:“ v krížových odkazoch a navigácii  
  - **Sledovanie dokončenia**: Aktualizované „Po dokončení tohto modulu...“ na „Po dokončení tohto laboratória...“  
  - **Zachované technické odkazy**: Zachované odkazy na Python moduly v konfiguračných súboroch (napr. `"module": "mcp_server.main"`)  

#### Vylepšenie študijného sprievodcu (study_guide.md)  
- **Vizualizácia učebného plánu**: Pridaná nová sekcia „11. Laboratóriá integrácie databázy“ s komplexnou štruktúrou laboratórií  
- **Štruktúra repozitára**: Aktualizovaná z desiatich na jedenásť hlavných sekcií s detailným popisom 11-MCPServerHandsOnLabs  
- **Pokyny pre učenie**: Vylepšená navigácia pokrývajúca sekcie 00–11  
- **Technologické pokrytie**: Pridané detaily o FastMCP, PostgreSQL a integrácii Azure služieb  
- **Výsledky učenia**: Zdôraznený vývoj produkčne pripraveného servera, vzory integrácie databázy a podniková bezpečnosť  

#### Vylepšenie hlavnej README štruktúry  
- **Terminológia založená na laboratóriách**: Aktualizovaný hlavný README.md v 11-MCPServerHandsOnLabs na konzistentné používanie štruktúry „Laboratórium“  
- **Organizácia učebnej cesty**: Jasný postup od základných konceptov cez pokročilú implementáciu až po nasadenie do produkcie  
- **Zameranie na prax**: Dôraz na praktické, laboratórne učenie s podnikové vzory a technológie  

### Vylepšenia kvality a konzistencie dokumentácie  
- **Dôraz na praktické učenie**: Posilnený praktický, laboratórny prístup v celej dokumentácii  
- **Zameranie na podnikové vzory**: Zvýraznené produkčné implementácie a podniková bezpečnosť  
- **Integrácia technológií**: Komplexné pokrytie moderných služieb Azure a vzorov AI integrácie  
- **Postup učenia**: Jasná, štruktúrovaná cesta od základov po produkčné nasadenie  

## 26. september 2025

### Vylepšenie prípadových štúdií – Integrácia GitHub MCP Registry

#### Prípadové štúdie (09-CaseStudy/) – Zameranie na rozvoj ekosystému  
- **README.md**: Výrazné rozšírenie s rozsiahlym prípadovým štúdiom GitHub MCP Registry  
  - **Prípadová štúdia GitHub MCP Registry**: Nová komplexná štúdia skúmajúca spustenie GitHub MCP Registry v septembri 2025  
    - **Analýza problémov**: Podrobná analýza fragmentovaného objavovania a nasadzovania MCP serverov  
    - **Architektúra riešenia**: Centralizovaný prístup GitHubu so spustením inštalácie VS Code jedným kliknutím  
    - **Obchodný dopad**: Merateľné zlepšenia onboardingu vývojárov a produktivity  
    - **Strategická hodnota**: Zameranie na modulárne nasadenie agentov a interoperabilitu nástrojov  
    - **Rozvoj ekosystému**: Pozicionovanie ako základná platforma pre agentnú integráciu  
  - **Vylepšená štruktúra prípadových štúdií**: Aktualizovaných všetkých sedem prípadových štúdií so zjednoteným formátovaním a komplexnými opismi  
    - Azure AI Travel Agents: Dôraz na viacagentovú orchestráciu  
    - Azure DevOps Integration: Fokus na automatizáciu workflow  
    - Real-Time Documentation Retrieval: Implementácia Python konzolového klienta  
    - Interactive Study Plan Generator: Konverzačná webová aplikácia Chainlit  
    - In-Editor Documentation: Integrácia VS Code a GitHub Copilot  
    - Azure API Management: Vzory podnikovej API integrácie  
    - GitHub MCP Registry: Vývoj ekosystému a komunitná platforma  
  - **Komplexný záver**: Prepracovaná záverečná časť so siedmimi štúdiami pokrývajúcimi rôzne MCP implementačné dimenzie  
    - Podniková integrácia, viacagentová orchestrácia, produktivita vývojárov  
    - Rozvoj ekosystému, kategorizácia vzdelávacích aplikácií  
    - Prehľad architektonických vzorov, implementačných stratégií a osvedčených praktík  
    - Dôraz na MCP ako zrelý, produkčne pripravený protokol  

#### Aktualizácie študijného sprievodcu (study_guide.md)  
- **Vizualizácia študijného plánu**: Aktualizovaná myšlienková mapa dopĺňajúca GitHub MCP Registry v sekcii Prípadové štúdie  
- **Popisy prípadových štúdií**: Vylepšené z všeobecných na podrobné rozbory siedmich komplexných prípadových štúdií  
- **Štruktúra repozitára**: Aktualizovaná sekcia 10, aby odrážala komplexné pokrytie prípadových štúdií s konkrétnymi implementačnými detailmi  
- **Integrácia changelogu**: Pridaný záznam zo 26. septembra 2025 dokumentujúci pridanie GitHub MCP Registry a vylepšenia prípadových štúdií  
- **Aktualizácia dátumu**: Aktualizovaný čas v päte na poslednú revíziu (26. september 2025)  

### Vylepšenia kvality dokumentácie  
- **Zvýšenie konzistencie**: Štandardizované formátovanie a štruktúra prípadových štúdií vo všetkých siedmich príkladoch  
- **Komplexné pokrytie**: Prípadové štúdie pokrývajú podnikové, produktivitu vývojárov a rozvoj ekosystému  
- **Strategické pozicionovanie**: Zvýraznený dôraz na MCP ako základnú platformu pre agentové systémy  
- **Integrácia zdrojov**: Aktualizované doplnkové zdroje vrátane odkazu na GitHub MCP Registry  

## 15. september 2025

### Rozšírenie pokročilých tém – Vlastné transporty a inžinierstvo kontextu

#### Vlastné MCP transporty (05-AdvancedTopics/mcp-transport/) – nový pokročilý implementačný sprievodca  
- **README.md**: Kompletný sprievodca implementáciou vlastných MCP transportných mechanizmov  
  - **Azure Event Grid Transport**: Komplexná implementácia serverless event-driven transportu  
    - Príklady v C#, TypeScript a Pythone s integráciou Azure Functions  
    - Vzory event-driven architektúry pre škálovateľné MCP riešenia  
    - Príjemcovia webhookov a spracovanie push správ  
  - **Azure Event Hubs Transport**: Implementácia vysoko priepustného streamingového transportu  
    - Streaming v reálnom čase pre nízku latenciu  
    - Strategické delenie na partitiony a správa checkpointov  
    - Šaržovanie správ a optimalizácia výkonu  
  - **Podnikové integračné vzory**: Produkčne pripravené architektonické príklady  
    - Distribuované MCP spracovanie naprieč Azure Functions  
    - Hybridné architektúry transportov kombinujúce rôzne typy  
    - Trvanlivosť správ, spoľahlivosť a stratégie správy chýb  
  - **Bezpečnosť a monitorovanie**: Integrácia Azure Key Vault a vzory observability  
    - Autentifikácia pomocou managed identity a prístup na princípe najmenej privilégií  
    - Telemetria Application Insights a monitoring výkonu  
    - Circuit breakers a vzory odolnosti voči chybám  
  - **Testovacie rámce**: Komplexné stratégie testovania vlastných transportov  
    - Jednotkové testovanie s testovacími pomôckami a mocking frameworkami  
    - Integračné testovanie s Azure Test Containers  
    - Zohľadnenie výkonového a záťažového testovania  

#### Inžinierstvo kontextu (05-AdvancedTopics/mcp-contextengineering/) – vznikajúca disciplína AI  
- **README.md**: Komplexný prieskum inžinierstva kontextu ako vznikajúcej oblasti  
  - **Základné princípy**: Úplné zdieľanie kontextu, povedomie o rozhodovaní akcií a správa okien kontextu  
  - **Zladenie s MCP protokolom**: Ako dizajn MCP rieši výzvy inžinierstva kontextu  
    - Obmedzenia okien kontextu a postupné načítavanie  
    - Určovanie relevantnosti a dynamické získavanie kontextu  
    - Viacmodálny kontext a bezpečnostné aspekty  
  - **Prístupy k implementácii**: Jednobodové vs. viacagentové architektúry  
    - Techniky delenia kontextu na časti a priorizácia  
    - Postupné načítavanie a kompresné stratégie  
    - Viacvrstvové prístupy ku kontextu a optimalizácia načítania  
  - **Metrický rámec**: Nové metriky na hodnotenie efektivity kontextu  
    - Účinnosť vstupu, výkon, kvalita a užívateľský zážitok  
    - Experimentálne prístupy k optimalizácii kontextu  
    - Analýza zlyhaní a metódy zlepšenia  

#### Aktualizácie navigácie kurikula (README.md)  
- **Vylepšená štruktúra modulu**: Aktualizovaná tabuľka kurikula s pridaním pokročilých tém  
  - Pridané položky Context Engineering (5.14) a Custom Transport (5.15)  
  - Konzistentné formátovanie a navigačné odkazy naprieč všetkými modulmi  
  - Aktualizované popisy odrážajúce súčasný rozsah obsahu  

### Vylepšenia adresárovej štruktúry  
- **Štandardizácia názvov**: Premenovaný „mcp transport“ na „mcp-transport“ v súlade s ostatnými zložkami pokročilých tém  
- **Organizácia obsahu**: Všetky adresáre 05-AdvancedTopics majú jednotný názvový vzor (mcp-[téma])  

### Vylepšenia kvality dokumentácie  
- **Zladenie s MCP špecifikáciou**: Všetky nové materiály odkazujú na aktuálnu MCP špecifikáciu 2025-06-18  
- **Príklady v rôznych jazykoch**: Komplexné príklady kódu v C#, TypeScript a Pythone  
- **Podnikové zameranie**: Produkčne pripravené vzory a integrácia s Azure cloudom  
- **Vizualizácia dokumentácie**: Mermaid diagramy pre architektúru a vizualizáciu tokov  

## 18. august 2025

### Komplexná aktualizácia dokumentácie – Štandardy MCP 2025-06-18

#### Najlepšie praktiky bezpečnosti MCP (02-Security/) – úplná modernizácia  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Kompletné prepracovanie podľa MCP špecifikácie 2025-06-18  
  - **Povinné požiadavky**: Pridané explicitné MUST/MUST NOT požiadavky podľa oficiálnej špecifikácie s jasnými vizuálnymi indikátormi  
  - **12 základných bezpečnostných praktík**: Preformátované z 15-položkového zoznamu na komplexné bezpečnostné domény  
    - Token Security a autentifikácia s integráciou externých identitných poskytovateľov  
    - Správa session a zabezpečenie transportu s kryptografickými požiadavkami  
    - Ochrana špecifická pre AI s integráciou Microsoft Prompt Shields  
    - Kontrola prístupov a oprávnení podľa princípu najmenej privilégií  
    - Bezpečnosť obsahu a monitorovanie s integráciou Azure Content Safety  
    - Bezpečnosť dodávateľského reťazca s komplexnou verifikáciou komponentov  
    - OAuth bezpečnosť a prevencia útokov Confused Deputy s implementáciou PKCE  
    - Reakcia na incidenty a zotavenie s automatickými mechanizmami  
    - Súlad s predpismi a správa podľa regulačných požiadaviek  
    - Pokročilé bezpečnostné kontroly so zero trust architektúrou  
    - Integrácia Microsoft bezpečnostného ekosystému s komplexnými riešeniami  
    - Neustály vývoj bezpečnosti s adaptívnymi praktikami  
  - **Microsoft bezpečnostné riešenia**: Vylepšené návody na integráciu Prompt Shields, Azure Content Safety, Entra ID a GitHub Advanced Security  
  - **Implementačné zdroje**: Kategorizované rozsiahle odkazy na oficiálnu MCP dokumentáciu, Microsoft bezpečnostné riešenia, štandardy bezpečnosti a implementačné príručky  

#### Pokročilé bezpečnostné kontroly (02-Security/) – podnikovú implementáciu  
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletné prepracovanie s podnikovým bezpečnostným rámcom  
  - **9 komplexných bezpečnostných domén**: Rozšírené z základných kontrol na detailný podnikový rámec  
    - Pokročilá autentifikácia a autorizácia s integráciou Microsoft Entra ID  
    - Token Security a kontroly proti passthrough s komplexnou validáciou  
    - Kontroly bezpečnosti session s prevenciou hijackingu  
    - Ochrana AI špecifických hrozieb s prevenciou prompt injection a tool poisoning  
    - Prevencia útokov Confused Deputy s OAuth proxy bezpečnosťou  
    - Bezpečnosť vykonávania nástrojov so sandboxingom a izoláciou  
    - Bezpečnosť dodávateľského reťazca s verifikáciou závislostí  
    - Monitorovanie a detekcia s integráciou SIEM  
    - Reakcia na incidenty a zotavenie s automatickými mechanizmami  
  - **Implementačné príklady**: Pridané detailné YAML konfiguračné bloky a príklady kódu  
  - **Integrácia Microsoft riešení**: Kompletné pokrytie Azure bezpečnostných služieb, GitHub Advanced Security a podnikového manažmentu identity  

#### Bezpečnosť pokročilých tém (05-AdvancedTopics/mcp-security/) – produkčne pripravená implementácia  
- **README.md**: Kompletné prepracovanie pre podnikové bezpečnostné implementácie  
  - **Aktuálne zladenie so špecifikáciou**: Aktualizované podľa MCP špecifikácie 2025-06-18 so všetkými povinnými bezpečnostnými požiadavkami  
  - **Vylepšená autentifikácia**: Integrácia Microsoft Entra ID s komplexnými príkladmi pre .NET a Java Spring Security  
  - **Integrácia AI bezpečnosti**: Implementácia Microsoft Prompt Shields a Azure Content Safety s detailnými príkladmi v Pythone  
  - **Pokročilé mitigácie hrozieb**: Kompletné príklady implementácie  
    - Prevencia útokov Confused Deputy s PKCE a validáciou používateľského súhlasu  
    - Prevencia token passthrough s validáciou cieľového publika a bezpečnou správou tokenov  
    - Prevencia hijackingu session s kryptografickým viazaním a behaviorálnou analýzou  
  - **Podniková bezpečnostná integrácia**: Monitorovanie Azure Application Insights, pipelines pre detekciu hrozieb a bezpečnosť dodávateľského reťazca  
  - **Implementačný kontrolný zoznam**: Jasné rozlíšenie povinných a odporúčaných bezpečnostných kontrol s výhodami Microsoft bezpečnostného ekosystému  

### Kvalita dokumentácie a zladenie so štandardmi
- **Odkazy na špecifikácie**: Aktualizované všetky odkazy na aktuálnu MCP špecifikáciu 2025-06-18  
- **Microsoft bezpečnostný ekosystém**: Vylepšené usmernenia o integrácii v celej bezpečnostnej dokumentácii  
- **Praktická implementácia**: Pridané podrobné príklady kódu v .NET, Jave a Pythone s podnikateľskými vzormi  
- **Organizácia zdrojov**: Komplexná kategorizácia oficiálnej dokumentácie, bezpečnostných štandardov a implementačných príručiek  
- **Vizuálne indikátory**: Jasné označenie povinných požiadaviek vs. odporúčaných postupov  


#### Základné koncepty (01-CoreConcepts/) - Kompletná modernizácia  
- **Aktualizácia verzie protokolu**: Aktualizované na odkazovanie na aktuálnu MCP špecifikáciu 2025-06-18 s verziou založenou na dátume (formát RRRR-MM-DD)  
- **Zlepšenie architektúry**: Vylepšené popisy Hostiteľov, Klientov a Serverov reflektujúce aktuálne MCP architektonické vzory  
  - Hostitelia teraz jasne definovaní ako AI aplikácie koordinujúce viaceré MCP klientské pripojenia  
  - Klienti popísaní ako protokolové konektory udržiavajúce vzťahy jeden na jedného so servermi  
  - Servery vylepšené s lokálnymi a vzdialenými scenármi nasadenia  
- **Reorganizácia primitív**: Kompletná prepracovanie primitív servera a klienta  
  - Serverové primitivá: Zdroje (dátové zdroje), Výzvy (šablóny), Nástroje (vykonávateľné funkcie) s podrobným vysvetlením a príkladmi  
  - Klientské primitivá: Vzorkovanie (LLM dokončenia), Získavanie informácií (vstup používateľa), Logovanie (ladenie/monitorovanie)  
  - Aktualizované s aktuálnymi vzormi metód pre zisťovanie (`*/list`), získavanie (`*/get`) a vykonávanie (`*/call`)  
- **Architektúra protokolu**: Zavedený dvojvrstvový architektonický model  
  - Dátová vrstva: Základ JSON-RPC 2.0 so správou životného cyklu a primitívami  
  - Transportná vrstva: STDIO (lokálne) a Streamovateľný HTTP s SSE (vzdialené) transportné mechanizmy  
- **Bezpečnostný rámec**: Komplexné bezpečnostné zásady vrátane explicitného súhlasu používateľa, ochrany súkromia dát, bezpečnosti vykonávania nástrojov a bezpečnosti transportnej vrstvy  
- **Komunikačné vzory**: Aktualizované protokolové správy zobrazujúce inicializáciu, zisťovanie, vykonávanie a tok notifikácií  
- **Príklady kódu**: Obnovené viacjazyčné príklady (.NET, Java, Python, JavaScript) reflektujúce aktuálne MCP SDK vzory  

#### Bezpečnosť (02-Security/) - Komplexná bezpečnostná revízia  
- **Zladenie so štandardmi**: Úplné zladenie s bezpečnostnými požiadavkami MCP špecifikácie 2025-06-18  
- **Vývoj autentifikácie**: Zdokumentovaný vývoj od vlastných OAuth serverov po delegovanie na externého poskytovateľa identity (Microsoft Entra ID)  
- **Analýza hrozieb špecifických pre AI**: Rozšírené pokrytie moderných útokov na AI  
  - Podrobné scenáre útokov injektáže výziev s reálnymi príkladmi  
  - Mechanizmy otravy nástrojov a vzory útokov "rug pull"  
  - Otrava kontextového okna a útoky na zmätok modelu  
- **Microsoft AI bezpečnostné riešenia**: Komplexné pokrytie Microsoft bezpečnostného ekosystému  
  - AI Prompt Shields s pokročilou detekciou, zvýrazňovaním a technikami delimiterov  
  - Vzory integrácie Azure Content Safety  
  - GitHub Advanced Security na ochranu dodávateľského reťazca  
- **Pokročilé zmierňovanie hrozieb**: Podrobné bezpečnostné kontroly pre  
  - Únik relácie s MCP-špecifickými scénarmi útokov a kryptografickými požiadavkami na relácie  
  - Problémy "zmätkom zastupiteľa" v MCP proxy scenároch s explicitnými požiadavkami na súhlas  
  - Zraniteľnosti token passthrough s povinnými validačnými kontrolami  
- **Bezpečnosť dodávateľského reťazca**: Rozšírené pokrytie AI dodávateľského reťazca vrátane zakladajúcich modelov, embeddings služieb, poskytovateľov kontextu a API tretích strán  
- **Základná bezpečnosť**: Vylepšená integrácia s podnikateľskými bezpečnostnými vzormi vrátane architektúry zero trust a Microsoft bezpečnostného ekosystému  
- **Organizácia zdrojov**: Kategorizované komplexné odkazy na zdroje podľa typu (Oficiálna dokumentácia, Štandardy, Výskum, Microsoft riešenia, Implementačné príručky)  

### Zlepšenia kvality dokumentácie  
- **Štruktúrované vzdelávacie ciele**: Vylepšené vzdelávacie ciele so špecifickými, vykonateľnými výsledkami  
- **Krížové odkazy**: Pridané odkazy medzi súvisiacimi témami bezpečnosti a základných konceptov  
- **Aktuálne informácie**: Aktualizované všetky dátumy a odkazy na špecifikácie na aktuálne štandardy  
- **Usmernenie k implementácii**: Pridané konkrétne, vykonateľné usmernenia k implementácii v oboch sekciách  

## 16. júla 2025  

### Vylepšenia README a navigácie  
- Úplne prepracovaná navigácia sylába v README.md  
- Nahradené značky `<details>` prístupnejším formátom založeným na tabuľkách  
- Vytvorené alternatívne rozloženia v novej zložke "alternative_layouts"  
- Pridané príklady navigácie založenej na kartách, záložkách a akordeónoch  
- Aktualizovaná sekcia štruktúry repozitára na zahrnutie všetkých najnovších súborov  
- Vylepšená sekcia "Ako používať tento syláb" s jasnými odporúčaniami  
- Aktualizované odkazy na MCP špecifikáciu tak, aby smerovali na správne URL  
- Pridaná sekcia Kontextového inžinierstva (5.14) do štruktúry sylába  

### Aktualizácie študijného sprievodcu  
- Kompletné prepracovanie študijného sprievodcu pre zladenie s aktuálnou štruktúrou repozitára  
- Pridané nové sekcie pre MCP klientov a nástroje a populárne MCP servery  
- Aktualizovaná vizuálna mapa sylába presne zobrazujúc všetky témy  
- Vylepšené popisy pokročilých tém pokrývajúce všetky špecializované oblasti  
- Aktualizovaná sekcia prípadových štúdií reflektujúca skutočné príklady  
- Pridaný tento komplexný zoznam zmien  

### Príspevky komunity (06-CommunityContributions/)  
- Pridané podrobné informácie o MCP serveroch na generovanie obrázkov  
- Pridaná komplexná sekcia o používaní Claude vo VSCode  
- Pridané inštrukcie k nastaveniu a používaniu terminálového klienta Cline  
- Aktualizovaná sekcia MCP klientov na zahrnutie všetkých populárnych klientskych možností  
- Vylepšené príklady príspevkov s presnejšími vzormi kódu  

### Pokročilé témy (05-AdvancedTopics/)  
- Zorganizované všetky špecializované tématické zložky s konzistentným pomenovaním  
- Pridané materiály a príklady kontextového inžinierstva  
- Pridaná dokumentácia integrácie agenta Foundry  
- Vylepšená dokumentácia integrácie bezpečnosti Entra ID  

## 11. júna 2025  

### Počiatočné vytvorenie  
- Uvedená prvá verzia sylába MCP pre začiatočníkov  
- Vytvorená základná štruktúra pre všetkých 10 hlavných sekcií  
- Implementovaná vizuálna mapa sylába pre navigáciu  
- Pridané úvodné ukážkové projekty v niekoľkých programovacích jazykoch  

### Začíname (03-GettingStarted/)  
- Vytvorené prvé príklady implementácie servera  
- Pridané usmernenia pre vývoj klientov  
- Zahŕňajúce inštrukcie na integráciu LLM klienta  
- Pridaná dokumentácia integrácie VS Code  
- Implementované príklady serverov s Server-Sent Events (SSE)  

### Základné koncepty (01-CoreConcepts/)  
- Pridané podrobné vysvetlenie klient-server architektúry  
- Vytvorená dokumentácia k hlavným protokolovým komponentom  
- Zdokumentované vzory odosielania správ v MCP  

## 23. mája 2025  

### Štruktúra repozitára  
- Inicializovaný repozitár so základnou štruktúrou zložiek  
- Vytvorené README súbory pre každú hlavnú sekciu  
- Nastavená infraštruktúra pre preklady  
- Pridané obrazové zdroje a diagramy  

### Dokumentácia  
- Vytvorený počiatočný README.md so súhrnom sylába  
- Pridané súbory CODE_OF_CONDUCT.md a SECURITY.md  
- Nastavený SUPPORT.md s usmerneniami pre získanie pomoci  
- Vytvorená predbežná štruktúra študijného sprievodcu  

## 15. apríla 2025  

### Plánovanie a rámec  
- Počiatočné plánovanie sylába MCP pre začiatočníkov  
- Definované vzdelávacie ciele a cieľové publikum  
- Opísaná 10-sekčná štruktúra sylába  
- Vyvinutý koncepčný rámec pre príklady a prípadové štúdie  
- Vytvorené počiatočné prototypové príklady kľúčových konceptov

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->