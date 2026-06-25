# Changelog: MCP pre začiatočníkov kurikulum

Tento dokument slúži ako záznam všetkých významných zmien vykonaných v kurikulu Model Context Protocol (MCP) pre začiatočníkov. Zmeny sú zdokumentované v obrátenom chronologickom poradí (najnovšie zmeny sú prvé).

## 24. júna 2026

### Nová lekcia: Použitie MCP v aplikácii Copilot

- [Sekcia nástrojov](./12-tooling/README.md) Pridaná sekcia o nástrojoch.
- [MCP v aplikácii Copilot](./12-tooling/01-copilot-app/README.md)

## 16. júna 2026

### Zladenie so špecifikáciou MCP a validácia príkladov

Kurikulum bolo overené voči aktuálnej **MCP špecifikácii 2025-11-25** a najnovším oficiálnym SDK, potom boli opravené zostávajúce zastaralé odkazy na špecifikáciu a potvrdené, že základné príklady sa stále správne kompilujú a bežia.

#### Opravy verzie špecifikácie (2025-06-18 / 2025-03-26 → 2025-11-25)

Aktualizovaný anglický obsah, kde sa stále uvádzalo, že staršia revízia špecifikácie je *aktuálny/najnovší* štandard, a odkazy boli nasmerované na kanonické cesty špecifikácie na `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Aktualizovaný banner "Aktuálny štandard", úvod, hlavný nadpis zásad bezpečnosti, nadpis povinných požiadaviek, sekcia Microsoft Entra ID, odkazy na Referencie a zdroje a záverečné bezpečnostné upozornenie (8 referencií) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aktualizovaný odkaz na špecifikáciu v sekcii ďalších zdrojov a banner "Aktuálny štandard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Nahradený zastaralý odkaz `2025-03-26` o bezpečnosti a dôvere aktuálnou stránkou o najlepších bezpečnostných praktikách 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Aktualizovaný odkaz na oficiálnu dokumentáciu vzorkovania na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Aktualizovaná referencia prítomného času "aktuálna MCP špecifikácia" a odkaz na špecifikáciu v sekcii ďalších zdrojov na 2025-11-25 (historické poznámky o ukončení SSE ponechané pre presnosť)

#### Validácia príkladov voči aktuálnym SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` vyriešil `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` prešiel bez typových chýb — existujúce API `McpServer`/`StdioServerTransport` zostávajú platné
- **Python (03-GettingStarted/01-first-server/solution/python)**: Overené v izolovanej `.venv` s `mcp[cli]` (1.27.2); `py_compile` prešiel a `FastMCP.list_tools()` správne vrátil nástroje `add` a `subtract`
- Potvrdené, že všetky rozsahy verzií `@modelcontextprotocol/sdk` v príkladoch (`>=1.26.0` / `^1.26.0` / `^1.27.0`) sa čistým spôsobom vyriešia na aktuálnu `1.29.0` bez zlomových zmien API

#### Zladenie verzií závislostí (zavretie verziových medzier)

Aktualizované zastaralé SDK verzovania tak, aby každý príklad sledoval aktuálne vydanie MCP, v súlade so štandardom v celom repozitári:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Zvýšený `@modelcontextprotocol/sdk` z `^1.8.0` → `>=1.26.0` a aktualizovaný popis balíka zo `"updated for MCP 2025-06-18"` na `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** a **lab4/code/github_mcp_server/pyproject.toml**: Zvýšený presný pin `mcp==1.23.0` → `mcp>=1.26.0`; obidva súbory `uv.lock` boli znovu vytvorené (`uv lock`), aby sa závislosti vyriešili na aktuálnu verziu `mcp 1.27.2` a ostali synchronizované s manifestami

#### Analýza medzier v kurikulu — Pokrytie najnovších funkcií špecifikácie

Overené, že kurikulum už pokrýva všetky primitíva zavedené alebo rozšírené v MCP 2025-11-25, takže nezostávajú žiadne obsahové medzery:
- **Vzorkovanie**: Lekcie 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Získavanie (vrátane režimu URL)**: Dokumentované v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Koreňové kontexty (Roots)**: Dokumentované v 00-Introduction, 01-CoreConcepts a 05-AdvancedTopics/mcp-root-contexts
- **Úlohy (experimentálne, dlhodobé operácie)**: Dokumentované v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Anotácie nástrojov** (`readOnlyHint` / `destructiveHint`): Dokumentované v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features

### Posilnenie bezpečnosti a oprava zraniteľností závislostí

Prebehol kompletný bezpečnostný audit všetkých manifestov závislostí a zdrojového kódu príkladov a všetky nahlásené npm varovania a jedna chyba na úrovni kódu boli odstránené. Po oprave hlásenie `npm audit` uvádza **0 zraniteľností** v každom auditovanom adresári.

#### zraniteľnosti v npm závislostiach (prechodné) — Opravené

Audítovaných všetkých 15 commitnutých súborov `package-lock.json`. Zraniteľnosti sa obmedzovali na prechodné závislosti, ktoré boli závislosťami MCP Inspector nástroja, klienta OpenAI a SDK MCP; všetky sú teraz vyriešené bez prerušenia príkladov:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** a **lab3/code/weather_mcp/inspector**: Zvýšený `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), čo vyriešilo upozornenia týkajúce sa `ajv`, `brace-expansion`, `diff`, `path-to-regexp` a `ws`. Pridaný záznam npm `overrides` vynucujúci opravený `shell-quote@1.8.4`, čím sa odstránilo zostávajúce kritické upozornenie spôsobené `concurrently`; lockfile bol opätovne vygenerovaný (teraz 0 zraniteľností)
- **03-GettingStarted/samples/typescript**: `npm audit fix` aktualizoval prechodnú závislosť `qs` (stredná závažnosť) na opravenú verziu
- **03-GettingStarted/samples/javascript**: `npm audit fix` aktualizoval prechodnú závislosť `hono` (stredná závažnosť) na opravenú verziu
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` aktualizoval prechodnú závislosť `form-data` (vysoká závažnosť) na opravenú verziu
- **03-GettingStarted/11-simple-auth/solution/typescript**: Vygenerovaný chýbajúci `package-lock.json`, aby bol projekt reprodukovateľný a auditovateľný (0 zraniteľností)

#### Oprava bezpečnostnej chyby na úrovni kódu (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Odstránený parameter `shell=True` z nástroja `open_in_vscode`. Pôvodný `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` umožňoval interpretovať znaky špeciálne pre shell v ceste k adresáru pomocou `cmd.exe` (vektor príkazovej injekcie). Teraz spúšťa priamo vyriešený `Code.exe` s adresárom ako argumentom — bez shellu — čo je funkčne ekvivalentné a bezpečné.

#### Audit python závislostí

- Overené všetky sady požiadaviek Pythonu pomocou `pip-audit`. `05-AdvancedTopics` a `03-GettingStarted/samples/python` nehlásili **žiadne známe zraniteľnosti** (ich rozsahy `mcp` / `httpx` / `pydantic` / `python-dotenv` sa vyriešia na aktuálne opravené verzie)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` upozornil na prechodnú závislosť **`werkzeug` 3.1.1** s tromi upozorneniami týkajúcimi sa DoS cez Windows device-názvy funkcie `safe_join` — `CVE-2025-66221`, `CVE-2026-21860` a `CVE-2026-27199` (všetky opravené vo verzii 3.1.6). Pridaný explicitný bezpečnostný fix `werkzeug>=3.1.6`, aby sa vyriešila opravená verzia; overené, že obmedzenie sa vyrieši čisto s balíčkom `chainlit` / `mcp` / `semantic-kernel`

### Rebranding názvu produktu

Aktualizovaný celý obsah kurikula, aby odrážal rebranding produktov Microsoftu:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Aktualizovaný odkaz na Discord komunitu
- **AGENTS.md**: Aktualizovaný odkaz na Discord server
- **README.md**: Aktualizované odkazy na technologický ekosystém
- **study_guide.md**: Aktualizované odkazy v prípadovej štúdii
- **05-AdvancedTopics/README.md**: Aktualizovaný názov a popis modulu 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Aktualizovaný záhlavie sekcie a popis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Kompletná aktualizácia názvu modulu a obsahu
- **05-AdvancedTopics/mcp-security-entra/README.md**: Aktualizovaný krížový odkaz
- **07-LessonsfromEarlyAdoption/README.md**: Aktualizované odkazy v prípadovej štúdii
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Aktualizovaný nadpis sekcie 9, odznaky a schopnosti
- **08-BestPractices/README.md**: Aktualizovaný odkaz na Discord komunitu
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Aktualizovaný odkaz na Discord kanál
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Aktualizovaný odkaz na nasadenie modelu
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Aktualizovaná tabuľka AI služieb
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Aktualizované odkazy na zdroje

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension pre VS Code
- **README.md**: Aktualizované hlavné odkazy v kurikulu
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aktualizovaný názov modulu, úvod a všetky záhlavia modulov
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aktualizovaný názov, ciele učenia, inštrukcie na nastavenie a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aktualizovaný názov, ciele učenia, tabuľka MCP hostiteľov a krížové odkazy
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aktualizovaný názov, odznaky, predpoklady a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aktualizované odkazy na Agent Builder a spätnú väzbu
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aktualizované požiadavky a odkazy na rozšírenia

---

## 11. apríla 2026

### Nová lekcia, opravy dokumentácie a aktualizácie závislostí

#### Pridaný nový obsah kurikula

**Modul 05 - Pokročilé témy**
- **Lekcia 5.17: Adversariálne multi-agentné uvažovanie s MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nový komplexný sprievodca pokrývajúci vzor adversariálneho debatujúceho pre multiagentné systémy
  - Mermaid diagram architektúry: dvaja agenti → zdieľaný MCP server → prepis debaty → rozhodca → verdikt
  - Zdieľaný MCP nástrojový server (`web_search` + `run_python`) implementovaný v Pythone a TypeScripte
  - Protikladné systémové výzvy (ZA / PROTI / Rozhodca) s explicitnými požiadavkami na použitie nástrojov
  - Orchestrátor debaty v Pythone, TypeScripte a C# riadiaci kolá a smerovanie argumentov
  - Prepojenie MCP `ClientSession` na orchestrátor pre volania skutočných nástrojov
  - Tabuľka prípadov použitia (detekcia halucinácií, modelovanie hrozieb, revízia dizajnu API, overovanie faktov, výber technológií)
  - Bezpečnostné úvahy: sandboxované spustenie, validácia volaní nástrojov, limitovanie rýchlosti, audit logovanie
  - Štruktúrované cvičenie s troma praktickými scénármi (kontrola kódu, rozhodnutia v architektúre, moderovanie obsahu)

#### Opravy dokumentácie

**Modul 03 - Začíname**
- **05-stdio-server/README.md**: Opravený neúplný TypeScript stdio server príklad — pridaná chýbajúca inštancia transportu (`new StdioServerTransport()`) a volanie `server.connect(transport)`, aby korešpondoval s príkladmi v Pythone a .NET v tej istej sekcii
- **14-sampling/README.md**: Opravená preklep — opravené `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Aktualizácie kurikula

**Hlavný README.md**
- Pridaný záznam 5.17 (Adversariálne multi-agentné uvažovanie s MCP) do tabuľky kurikula s priamym odkazom na novú lekciu

**05-AdvancedTopics/README.md**
- Pridaný riadok lekcie 5.17 do tabuľky lekcií

**study_guide.md**
- Pridaná téma Adversariálne multi-agentné uvažovanie do myšlienkovej mapy a opis v texte o Pokročilých témach

#### Opravy kódu a bezpečnosti

**Modul 05 - Adversariálne agenti (`mcp-adversarial-agents`)**
- **Oprava bezpečnosti — injekcia príkazov**: Nahradený shell interpolácia `execSync` s `execFile` + `promisify` v TypeScript nástroji `run_python`, čím sa odstránila plocha zraniteľnosti pre injekciu príkazov (kód riadený LLM je teraz odovzdaný ako doslovný prvok argv bez zapojenia shellu)
- **Zapojenie slučky nástroja MCP**: Aktualizovaný Python orchestrátor debaty na použitie klienta `AsyncAnthropic` (nahrádzajúceho blokujúci synchronný `Anthropic`), priame odovzdanie živej `ClientSession` každej agentovej krôčiky, načítanie definícií nástrojov cez `session.list_tools()` pri každom kroku a odosielanie blokov `tool_use` cez `session.call_tool()` v slučke, kým model nevydá finálnu textovú odpoveď

#### Aktualizácie závislostí

- Zvýšená verzia `hono` na 4.12.12 v rôznych balíčkoch (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Zvýšená verzia `@hono/node-server` z 1.19.11 na 1.19.13 v balíčkoch TypeScript
- Zvýšená verzia `cryptography` z 46.0.5 na 46.0.7 v Python balíčkoch (10-StreamliningAIWorkflows laboratóriá 3 a 4)
- Zvýšená verzia `lodash` z 4.17.23 na 4.18.1 v inspektore 10-StreamliningAIWorkflows

#### Preklady

- Synchronizované preklady pre viac ako 48 jazykov s najnovšími zmenami zdroja (aktualizácia i18n)

---

## 5. februára 2026

### Vylepšenia validácie a navigácie v celom repozitári

#### Pridaný nový obsah kurikula

**Modul 03 - Začíname**
- **12-mcp-hosts/README.md**: Nový komplexný sprievodca nastavením hostiteľov MCP
  - Konfiguračné príklady pre Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Šablóny konfigurácie JSON pre všetky hlavné hosty
  - Porovnávacia tabuľka typov transportu (stdio, SSE/HTTP, WebSocket)
  - Riešenie bežných problémov s pripojením
  - Najlepšie bezpečnostné postupy pre konfiguráciu hostiteľa

- **13-mcp-inspector/README.md**: Nový sprievodca ladeniam MCP Inspektora
  - Inštalačné metódy (npx, globálny npm, zo zdroja)
  - Pripojenie k serverom cez stdio a HTTP/SSE
  - Testovacie nástroje, zdroje a pracovné postupy výziev
  - Integrácia s VS Code a MCP Inspectorom
  - Bežné scenáre ladenia a ich riešenia

**Modul 04 - Praktická implementácia**
- **pagination/README.md**: Nový sprievodca implementáciou stránkovania
  - Vzory stránkovania založené na kurzore v Pythone, TypeScripte, Jave
  - Spracovanie stránkovania na strane klienta
  - Návrhové stratégie kurzorov (nepriehľadný vs. štruktúrovaný)
  - Odporúčania na optimalizáciu výkonu

**Modul 05 - Pokročilé témy**
- **mcp-protocol-features/README.md**: Hlbší pohľad na nové vlastnosti protokolu
  - Implementácia notifikácií o pokroku
  - Vzory rušenia požiadaviek
  - Šablóny zdrojov s URI vzormi
  - Správa životného cyklu servera
  - Ovládanie úrovne logovania
  - Vzory spracovania chýb s JSON-RPC kódmi

#### Opravy navigácie (aktualizovaných viac ako 24 súborov)

**Hlavné README modulov**
 Teraz odkazujú na prvú lekciu aj na nasledujúci modul

**Podadresáre 02-Security**
- Všetkých 5 doplnkových bezpečnostných dokumentov má teraz navigáciu „Čo ďalej“:

**Súbory 09-CaseStudy**
- Všetky súbory prípadových štúdií majú teraz postupnú navigáciu:

**Laboratória 10-StreamliningAI**
Pridaná sekcia Čo ďalej v prehľade modulu 10 a v module 11

#### Opravy kódu a obsahu

**SDK a aktualizácie závislostí**
Opravená prázdna verzia openai na `^4.95.0`
Aktualizované SDK z `^1.8.0` na `>=1.26.0`
Aktualizované pripnutia verzií mcp na `>=1.26.0`

**Opravy kódu**
Opravený neplatný model `gpt-4o-mini` na `gpt-4.1-mini`

**Opravy obsahu**
Opravený zlomený odkaz `READMEmd` → `README.md`, opravený hlavičkový názov kurikula `Module 1-3` → `Module 0-3`, opravená citlivosť na malé a veľké písmená v ceste
Odstránený poškodený duplicitný obsah prípadovej štúdie 5

**Vylepšenia pre začiatočníkov**
Pridaný správny úvod, cieľové učebné ciele a požiadavky pre začiatočníkov

#### Aktualizácie kurikula

**Hlavné README.md**
- Pridané položky 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Stránkovanie), 5.16 (Funkcie protokolu) do tabuľky kurikula

**README modulov**
Pridané lekcie 12 a 13 do zoznamu lekcií
Pridaná sekcia Praktické príručky s odkazom na stránkovanie
Pridané lekcie 5.15 (Vlastný transport) a 5.16 (Funkcie protokolu)

**study_guide.md**
- Aktualizovaná myšlienková mapa so všetkými novými témami: Nastavenie MCP hostiteľov, MCP Inspector, stratégie stránkovania, detailný pohľad na funkcie protokolu

## 28. januára 2026

### Preskúmanie súladu so špecifikáciou MCP 2025-11-25

#### Vylepšenie základných konceptov (01-CoreConcepts/)
- **Nová klientská primitiva – Roots**: Pridaná komplexná dokumentácia klientského primitiva Roots umožňujúca serverom chápať hranice súborového systému a prístupové práva
- **Anotácie nástrojov**: Pridaná dokumentácia o behaviorálnych anotáciách nástrojov (`readOnlyHint`, `destructiveHint`) pre lepšie rozhodovanie pri vykonávaní nástrojov
- **Volanie nástrojov pri sampling-u**: Aktualizovaná dokumentácia Sampling o parametre `tools` a `toolChoice` pre vyvolávanie nástrojov riadené modelom počas sampling požiadaviek
- **URL mód vyvolávania**: Pridaná dokumentácia o vyvolávaní na základe URL pre webové interakcie iniciované serverom
- **Úlohy (experimentálne)**: Pridaná nová sekcia dokumentujúca experimentálnu funkciu Úloh pre trvalé výkonné zásuvky a odložené získavanie výsledkov
- **Podpora ikon**: Uvedené, že nástroje, zdroje, šablóny zdrojov a výzvy môžu teraz obsahovať ikony ako doplnkové metadata

#### Aktualizácie dokumentácie
- **README.md**: Pridaná referencia na verziu špecifikácie MCP 2025-11-25 a vysvetlenie číslovania verzií podľa dátumu
- **study_guide.md**: Aktualizovaná mapa kurikula s pridaním Úloh a anotácií nástrojov v sekcii základných konceptov; aktualizovaná časová známka dokumentu

#### Overenie súladu s špecifikáciou
- **Verzia protokolu**: Overené, že všetka dokumentácia odkazuje na aktuálnu verziu MCP Specification 2025-11-25
- **Zladenie architektúry**: Overená presnosť dokumentácie dvojvrstvovej architektúry (Dátová vrstva + Transportná vrstva)
- **Dokumentácia primitív**: Overené serverové primitiva (Zdroje, Výzvy, Nástroje) a klientské primitiva (Sampling, Vyvolávanie, Logovanie, Roots)
- **Mechanizmy transportu**: Overená presnosť dokumentácie STDIO a Streamable HTTP transportov
- **Bezpečnostné usmernenia**: Potvrdené zladenie so súčasnými MCP bezpečnostnými najlepšími praktikami

#### Kľúčové funkcie MCP 2025-11-25 zdokumentované
- **OpenID Connect Discovery**: Objavovanie autorizačného servera cez OIDC
- **Metadata dokumenty OAuth Client ID**: Odporúčaný mechanizmus registrácie klienta
- **JSON Schema 2020-12**: Predvolený dialekt pre definície MCP schém
- **SDK tiering systém**: Formalizované požiadavky na podporu funkcií SDK a údržbu
- **Štruktúra riadenia**: Formalizované pracovné a záujmové skupiny v správe MCP

### Hlavná aktualizácia bezpečnostnej dokumentácie (02-Security/)

#### Integrácia MCP Security Summit Workshop (Sherpa)
- **Nový praktický tréningový zdroj**: Pridaná komplexná integrácia s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) vo všetkej bezpečnostnej dokumentácii
- **Pokrytie trasy expedície**: Zdokumentovaný kompletný postup z tábora do tábora od Základného tábora po Summit
- **Zladenie s OWASP**: Všetky bezpečnostné usmernenia teraz mapované podľa OWASP MCP Azure Security Guide rizík

#### Integrácia OWASP MCP Top 10
- **Nová sekcia**: Pridaná tabuľka OWASP MCP Top 10 bezpečnostných rizík s Azure mitigáciami do hlavného bezpečnostného README
- **Dokumentácia založená na rizikách**: Aktualizovaný súbor mcp-security-controls-2025.md s odkazmi na OWASP MCP riziká pre každú bezpečnostnú doménu
- **Referenčná architektúra**: Prepojené s referenčnou architektúrou a vzormi implementácie OWASP MCP Azure Security Guide

#### Aktualizované bezpečnostné súbory
- **README.md**: Pridaný prehľad Sherpa Workshopu, tabuľka trasy expedície, súhrn rizík OWASP MCP Top 10 a sekcia praktického tréningu
- **mcp-security-controls-2025.md**: Aktualizovaná hlavička na február 2026, pridané odkazy na OWASP riziká (MCP01-MCP08), opravené nezhody verzie špecifikácie
- **mcp-security-best-practices-2025.md**: Pridaná sekcia zdrojov Sherpa a OWASP, aktualizovaná časová známka
- **mcp-best-practices.md**: Pridaná sekcia praktického tréningu so Sherpa a OWASP odkazmi
- **azure-content-safety-implementation.md**: Pridaný odkaz na OWASP MCP06, zosúladenie s Sherpa Camp 3 a ďalšia sekcia zdrojov

#### Pridané nové odkazy na zdroje
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuálne stránky rizík OWASP MCP (MCP01-MCP10)

### Celokurikulárne zosúladenie so špecifikáciou MCP 2025-11-25

#### Modul 03 - Začíname
- **Dokumentácia SDK**: Pridané Go SDK do oficiálneho zoznamu SDK; aktualizované všetky odkazy na SDK tak, aby sa zhodovali so špecifikáciou MCP 2025-11-25
- **Vysvetlenie transportu**: Aktualizované popisy transportu STDIO a HTTP Streaming s explicitnými odkazmi na špecifikáciu

#### Modul 04 - Praktická implementácia
- **Aktualizácie SDK**: Pridané Go SDK; aktualizovaný zoznam SDK s referenciou na verziu špecifikácie
- **Špecifikácia autorizácie**: Aktualizovaný odkaz na MCP Authorization špecifikáciu na aktuálnu verziu 2025-11-25

#### Modul 05 - Pokročilé témy
- **Nové funkcie**: Pridaná poznámka o nových funkciách MCP Specification 2025-11-25 (Úlohy, Anotácie nástrojov, URL mód vyvolávania, Roots)
- **Bezpečnostné zdroje**: Pridané odkazy OWASP MCP Top 10 a Sherpa workshop medzi doplnkové zdroje

#### Modul 06 - Príspevky komunity
- **Zoznam SDK**: Pridané Swift a Rust SDK; aktualizovaný odkaz na špecifikáciu na 2025-11-25
- **Referencia špecifikácie**: Aktualizovaný link na priamu špecifikáciu MCP

#### Modul 07 - Lekcie z predbežnej adopcie
- **Aktualizácie zdrojov**: Pridaný odkaz na MCP Specification 2025-11-25 a OWASP MCP Top 10 medzi doplnkové zdroje

#### Modul 08 - Najlepšie praktiky
- **Verzia špecifikácie**: Aktualizovaný odkaz na MCP Specification 2025-11-25
- **Bezpečnostné zdroje**: Pridané OWASP MCP Top 10 a Sherpa workshop medzi doplnkové zdroje

#### Modul 10 - Zefektívnenie AI pracovných tokov
- **Aktualizácia odznaku**: Zmena MCP verzie z verzie SDK (1.9.3) na verziu špecifikácie (2025-11-25)
- **Odkazy na zdroje**: Aktualizovaný odkaz na MCP Specification; pridaný OWASP MCP Top 10

#### Modul 11 - Praktické laboratóriá MCP servera
- **Referencia špecifikácie**: Aktualizovaný odkaz na verziu špecifikácie MCP 2025-11-25
- **Bezpečnostné zdroje**: Pridaný OWASP MCP Top 10 medzi oficiálne zdroje

## 18. decembra 2025

### Aktualizácia bezpečnostnej dokumentácie - MCP Specification 2025-11-25

#### Najlepšie bezpečnostné praktiky MCP (02-Security/mcp-best-practices.md) - aktualizácia verzie špecifikácie
- **Aktualizácia verzie protokolu**: Aktualizované odkazy na najnovšiu MCP Specification 2025-11-25 (publikované 25. novembra 2025)
  - Aktualizované všetky odkazy na verziu špecifikácie z 2025-06-18 na 2025-11-25
  - Aktualizované dátumy v dokumente z 18. augusta 2025 na 18. decembra 2025
  - Overené, že všetky URL špecifikácií smerujú na aktuálnu dokumentáciu
- **Validácia obsahu**: Komplexné vyhodnotenie najlepších bezpečnostných praktík podľa najnovších štandardov
  - **Microsoft bezpečnostné riešenia**: Overená aktuálna terminológia a odkazy na Prompt Shields (predtým „detekcia rizika jailbreaku“), Azure Content Safety, Microsoft Entra ID a Azure Key Vault
  - **OAuth 2.1 bezpečnosť**: Potvrdené zladenie s najnovšími bezpečnostnými praktikami OAuth
  - **OWASP štandardy**: Overené aktuálne odkazy na OWASP Top 10 pre LLM
  - **Azure služby**: Overené všetky odkazy na Microsoft Azure dokumentáciu a najlepšie postupy
- **Zladenie so štandardmi**: Potvrdené, že všetky referencované bezpečnostné štandardy sú aktuálne
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Najlepšie bezpečnostné praktiky OAuth 2.1
  - Azure bezpečnostné a súladové rámce
- **Implementačné zdroje**: Overené všetky odkazy na implementačné príručky a zdroje
  - Autentifikačné vzory Azure API Management
  - Príručky integrácie Microsoft Entra ID
  - Správa tajomstiev Azure Key Vault
  - DevSecOps pipeline a monitorovacie riešenia

### Kontrola kvality dokumentácie
- **Súlad so špecifikáciou**: Zabezpečené, že všetky povinné MCP bezpečnostné požiadavky (MUST/MUST NOT) sú v súlade s najnovšou špecifikáciou
- **Aktualizovanosť zdrojov**: Overené všetky externé odkazy na Microsoft dokumentáciu, bezpečnostné štandardy a implementačné príručky
- **Pokrytie najlepších praktík**: Potvrdené komplexné pokrytie autentifikácie, autorizácie, špecifických hrozieb AI, bezpečnosti dodávateľského reťazca a firemných vzorov

## 6. októbra 2025

### Rozšírenie sekcie Začíname – Pokročilé použitie servera a jednoduchá autentifikácia

#### Pokročilé použitie servera (03-GettingStarted/10-advanced)
- **Pridaná nová kapitola**: Zavedený komplexný sprievodca pokročilým používaním servera MCP, pokrývajúci bežnú aj nízkoúrovňovú serverovú architektúru.
  - **Bežný vs. nízkoúrovňový server**: Podrobná komparácia a príklady kódu v Pythone a TypeScripte pre oba prístupy.
  - **Dizajn založený na handleroch**: Vysvetlenie správy nástrojov/zdrojov/promptov založenej na handleroch pre škálovateľné, flexibilné implementácie serverov.
  - **Praktické vzory**: Reálne scenáre, kde sú nízkoúrovňové vzory serverov prospešné pre pokročilé funkcie a architektúru.

#### Jednoduchá autentifikácia (03-GettingStarted/11-simple-auth)
- **Pridaná nová kapitola**: Krok za krokom sprievodca implementáciou jednoduchej autentifikácie v MCP serveroch.
  - **Koncepty autentifikácie**: Jasné vysvetlenie rozdielu medzi autentifikáciou a autorizáciou a správy prihlasovacích údajov.
  - **Implementácia základnej autentifikácie**: Middleware založené vzory autentifikácie v Pythone (Starlette) a TypeScripte (Express) s ukážkami kódu.
  - **Pokrok k pokročilej bezpečnosti**: Návod, ako začať s jednoduchou autentifikáciou a postupovať k OAuth 2.1 a RBAC, s odkazmi na pokročilé bezpečnostné moduly.

Tieto doplnky poskytujú praktické, priame návody na vytváranie robustnejších, bezpečnejších a flexibilnejších MCP serverových implementácií, ktoré spájajú základné koncepty s pokročilými produkčnými vzormi.

## 29. septembra 2025

### Laboratóriá integrácie databázy MCP servera – komplexná praktická učebná cesta

#### 11-MCPServerHandsOnLabs – Nový kompletný učebný plán integrácie databázy  
- **Kompletná 13-laboratórna učebná cesta**: Pridaný komplexný praktický kurz na tvorbu MCP serverov pripravených na produkciu s integráciou databázy PostgreSQL  
  - **Reálna implementácia**: Prípad použitia Zava Retail analytics demonštrujúci podnikové vzory  
  - **Štruktúrovaný učebný progres**:
    - **Laboratóriá 00-03: Základy** – Úvod, jadrová architektúra, bezpečnosť a multi-tenancy, nastavenie prostredia
    - **Laboratóriá 04-06: Výstavba MCP servera** – Návrh databázy a schéma, implementácia MCP servera, vývoj nástrojov  
    - **Laboratóriá 07-09: Pokročilé funkcie** – Integrácia semantického vyhľadávania, testovanie a ladenie, integrácia VS Code
    - **Laboratóriá 10-12: Produkcia a osvedčené postupy** – Strategie nasadenia, monitorovanie a observabilita, osvedčené postupy a optimalizácia
  - **Podnikové technológie**: Framework FastMCP, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights  
  - **Pokročilé funkcie**: Row Level Security (RLS), semantické vyhľadávanie, multi-tenant prístup k dátam, vektorové embeddingy, monitorovanie v reálnom čase

#### Štandardizácia terminológie – prechod z modulu na laboratórium  
- **Komplexná aktualizácia dokumentácie**: Systematicky aktualizované všetky README súbory v 11-MCPServerHandsOnLabs, aby používali terminológiu „Laboratórium“ namiesto „Modul“
  - **Nadpisy sekcií**: Aktualizované „Čo tento modul obsahuje“ na „Čo toto laboratórium obsahuje“ vo všetkých 13 laboratóriách
  - **Popisy obsahu**: Zmena frázy „Tento modul poskytuje…“ na „Toto laboratórium poskytuje…“ v celej dokumentácii
  - **Vzdelávacie ciele**: Aktualizované „Na konci tohto modulu…“ na „Na konci tohto laboratória…“
  - **Navigačné odkazy**: Prevedené všetky odkazy „Modul XX:“ na „Laboratórium XX:“ v krížových referenciách a navigácii
  - **Sledovanie dokončenia**: Aktualizované „Po dokončení tohto modulu…“ na „Po dokončení tohto laboratória…“
  - **Zachované technické odkazy**: Zachované odvolania na Python moduly v konfiguračných súboroch (napr. `"module": "mcp_server.main"`)

#### Vylepšenie študijného sprievodcu (study_guide.md)
- **Vizualizovaná mapa kurikula**: Pridaná nová sekcia „11. Laboratóriá integrácie databázy“ s kompletnou štruktúrou laboratórií
- **Štruktúra repozitára**: Aktualizované z desiatich na jedenásť hlavných sekcií s podrobným popisom 11-MCPServerHandsOnLabs
- **Pokyny k učebnej ceste**: Vylepšené navigačné inštrukcie pokrývajúce sekcie 00-11
- **Pokrytie technológií**: Pridané detaily integrácie FastMCP, PostgreSQL a Azure služieb
- **Výsledky učenia**: Zvýraznený vývoj serverov pripravených na produkciu, vzory integrácie databázy a podniková bezpečnosť

#### Vylepšenie štruktúry hlavného README
- **Terminológia založená na laboratóriách**: Aktualizované hlavné README.md v 11-MCPServerHandsOnLabs na konzistentné používanie štruktúry „Laboratórium“
- **Organizácia učebnej cesty**: Jasný postup od základných konceptov cez pokročilú implementáciu až po produkčné nasadenie
- **Zameranie na reálny svet**: Dôraz na praktické, praktické učenie s podnikových vzorov a technológií

### Vylepšenia kvality a konzistencie dokumentácie
- **Dôraz na praktické učenie založené na laboratóriách**: Posilnený praktický prístup v celej dokumentácii
- **Zameranie na podnikové vzory**: Zvýraznené produkčne pripravené implementácie a podniková bezpečnosť
- **Integrácia technológií**: Komplexné pokrytie moderných Azure služieb a vzorov AI integrácie
- **Postup učenia**: Jasná, štruktúrovaná cesta od základov k produkčnému nasadeniu

## 26. septembra 2025

### Vylepšenie prípadových štúdií – Integrácia GitHub MCP Registry

#### Prípadové štúdie (09-CaseStudy/) – Zameranie na rozvoj ekosystému
- **README.md**: Rozsiahle rozšírenie s komplexnou prípadovou štúdiou GitHub MCP Registry  
  - **Prípadová štúdia GitHub MCP Registry**: Nová komplexná štúdia skúmajúca spustenie GitHub MCP Registry v septembri 2025  
    - **Analýza problému**: Podrobná analýza fragmentovaných výziev MCP server discovery a nasadenia  
    - **Architektúra riešenia**: Centralizovaný prístup registru GitHub s jedným kliknutím inštalácie vo VS Code  
    - **Obchodný dopad**: Merateľné zlepšenie onboardingu a produktivity vývojárov  
    - **Strategická hodnota**: Zameranie na modulárne nasadenie agentov a interoperabilitu medzi nástrojmi  
    - **Vývoj ekosystému**: Pozicionovanie ako základná platforma pre agentnú integráciu  
  - **Vylepšená štruktúra prípadovej štúdie**: Aktualizované všetkých sedem prípadových štúdií s konzistentným formátovaním a komplexnými popismi  
    - Azure AI Travel Agents: Zameranie na multi-agent orchestráciu  
    - Integrácia Azure DevOps: Fokus na automatizáciu workflow  
    - Získavanie dokumentácie v reálnom čase: Implementácia Python konzolového klienta  
    - Generátor interaktívneho študijného plánu: Webová aplikácia Chainlit  
    - Dokumentácia v editore: VS Code a GitHub Copilot integrácia  
    - Správa API v Azure: Podnikové vzory integrácie API  
    - GitHub MCP Registry: Vývoj ekosystému a komunitná platforma  
  - **Komplexný záver**: Prepracovaná záverečná sekcia zdôrazňujúca sedem prípadových štúdií pokrývajúcich viaceré MCP implementačné dimenzie  
    - Podniková integrácia, orchestrácia multi-agentov, produktivita vývojárov  
    - Vývoj ekosystému, kategorizácia vzdelávacích aplikácií  
    - Rozšírené poznatky o architektonických vzoroch, implementačných stratégiách a osvedčených postupoch  
    - Dôraz na MCP ako zrelý, produkčne pripravený protokol

#### Aktualizácie študijného sprievodcu (study_guide.md)
- **Vizualizovaná mapa kurikula**: Aktualizovaná mentálna mapa zahŕňa GitHub MCP Registry v sekcii Prípadové štúdie  
- **Popis prípadových štúdií**: Vylepšené z generických popisov na detailný rozpis siedmich komplexných prípadových štúdií  
- **Štruktúra repozitára**: Aktualizovaná sekcia 10 odrážajúca komplexné pokrytie prípadových štúdií s konkrétnymi detailmi implementácie  
- **Integrácia changelogu**: Pridaný zápis z 26. septembra 2025 dokumentujúci pridanie GitHub MCP Registry a vylepšenia prípadových štúdií  
- **Aktualizácia dátumov**: Aktualizovaný časový údaj päty na najnovší dátum revízie (26. september 2025)

### Vylepšenia kvality dokumentácie
- **Zvýšená konzistencia**: Štandardizované formátovanie a štruktúra prípadových štúdií vo všetkých siedmich príkladoch  
- **Komplexné pokrytie**: Prípadové štúdie teraz pokrývajú podnikové, produktivitu vývojárov a scenáre rozvoja ekosystému  
- **Strategické postavenie**: Zvýraznený dôraz na MCP ako základnú platformu pre agentový systém  
- **Integrácia zdrojov**: Aktualizované doplnkové zdroje o odkaz na GitHub MCP Registry

## 15. septembra 2025

### Rozšírenie pokročilých tém – Vlastné transporty a kontextové inžinierstvo

#### Vlastné transporty MCP (05-AdvancedTopics/mcp-transport/) – Nový pokročilý implementačný sprievodca  
- **README.md**: Kompletný sprievodca implementáciou vlastných transportných mechanizmov MCP  
  - **Transport Azure Event Grid**: Komplexná implementácia serverless event-driven transportu  
    - Príklady v C#, TypeScript a Pythone s integráciou Azure Functions  
    - Vzory architektúry event-driven pre škálovateľné MCP riešenia  
    - Príjemcovia webhookov a push-based spracovanie správ  
  - **Transport Azure Event Hubs**: Implementácia vysokorýchlostného streamovania transportu  
    - Možnosti streamovania v reálnom čase pre nízku latenciu  
    - Stratégií delenia na partície a správa checkpointov  
    - Batching správ a optimalizácia výkonu  
  - **Podnikové integračné vzory**: Produkčne pripravené architektonické príklady  
    - Distribuované spracovanie MCP cez viaceré Azure Functions  
    - Hybridné transportné architektúry kombinujúce viaceré typy transportov  
    - Stratégie trvácnosti správ, spoľahlivosti a správy chýb  
  - **Bezpečnosť a monitorovanie**: Integrácia Azure Key Vault a vzory observability  
    - Autentifikácia s managed identity a prístup s najmenšími právomocami  
    - Telemetria Application Insights a monitorovanie výkonu  
    - Circuit breakers a vzory odolnosti voči poruchám  
  - **Testovacie frameworky**: Komplexné testovacie stratégie pre vlastné transporty  
    - Unit testovanie s testovacími dvojníkmi a mockovacie frameworky  
    - Integračné testovanie s Azure Test Containers  
    - Úvahy o výkonnostnom a záťažovom testovaní

#### Kontextové inžinierstvo (05-AdvancedTopics/mcp-contextengineering/) – Vznikajúca disciplína AI  
- **README.md**: Komplexný prieskum kontextového inžinierstva ako vznikajúceho odboru  
  - **Jadrové princípy**: Kompletné zdieľanie kontextu, uvedomelosť o rozhodovaní akcií, správa kontextového okna  
  - **Zladenie s protokolom MCP**: Ako dizajn MCP rieši problémy kontextového inžinierstva  
    - Limity kontextových okien a progresívne načítavanie  
    - Určovanie relevantnosti a dynamické získavanie kontextu  
    - Manažment multimodálneho kontextu a bezpečnostné požiadavky  
  - **Prístupy k implementácii**: Jednovláknové vs. multi-agent architektúry  
    - Chunkovanie kontextu a techniky prioritizácie  
    - Progresívne načítavanie a kompresné stratégie  
    - Viacvrstvové prístupy ku kontextu a optimalizácia získavania  
  - **Merací rámec**: Vznikajúce metriky pre hodnotenie efektívnosti kontextu  
    - Efektivita vstupu, výkon, kvalita a užívateľská skúsenosť  
    - Experimentálne prístupy k optimalizácii kontextu  
    - Analýza chýb a metodiky zlepšenia

#### Aktualizácie navigácie kurikula (README.md)  
- **Vylepšená štruktúra modulu**: Aktualizovaná tabuľka kurikula o nové pokročilé témy  
  - Pridané položky Kontextové inžinierstvo (5.14) a Vlastný transport (5.15)  
  - Konzistentné formátovanie a navigačné odkazy vo všetkých moduloch  
  - Aktualizované popisy pre reflektovanie aktuálneho obsahu

### Vylepšenia štruktúry adresárov  
- **Štandardizácia názvov**: Premenovanie „mcp transport“ na „mcp-transport“ pre konzistentnosť s ostatnými zložkami pokročilých tém  
- **Organizácia obsahu**: Všetky priečinky 05-AdvancedTopics teraz nasledujú konzistentný názvový vzor (mcp-[téma])

### Vylepšenia kvality dokumentácie  
- **Zladenie s MCP špecifikáciou**: Všetok nový obsah odkazuje na aktuálnu MCP Špecifikáciu 2025-06-18  
- **Príklady vo viacerých jazykoch**: Komplexné ukážky kódu v C#, TypeScript a Pythone  
- **Zameranie na podnikanie**: Produkčne pripravené vzory a integrácia Azure cloudu po celej dokumentácii  
- **Vizualizácie dokumentácie**: Mermaid diagramy pre architektúru a vizualizáciu tokov

## 18. augusta 2025

### Komplexná aktualizácia dokumentácie – Štandardy MCP 2025-06-18

#### Najlepšie bezpečnostné praktiky MCP (02-Security/) – Kompletná modernizácia  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Kompletné prepisanie zosúladené s MCP Špecifikáciou 2025-06-18  
  - **Povinné požiadavky**: Pridané explicitné požiadavky MUSÍ/MUSÍ NIE z oficiálnej špecifikácie s jasnými vizuálnymi indikátormi  
  - **12 základných bezpečnostných praktík**: Preusporiadané z 15-položkového zoznamu na komplexné bezpečnostné domény  
    - Bezpečnosť tokenov a autentifikácia s integráciou externého poskytovateľa identity  
    - Správa relácií a bezpečnosť transportu s kryptografickými požiadavkami  
    - Ochrana pred hrozbami špecifickými pre AI s integráciou Microsoft Prompt Shields  
    - Kontrola prístupu a oprávnení s princípom najmenších právomocí  
    - Bezpečnosť obsahu a monitorovanie s integráciou Azure Content Safety  
    - Bezpečnosť dodávateľského reťazca s komplexnou verifikáciou komponentov  
    - Bezpečnosť OAuth a prevencia Confused Deputy útokov s implementáciou PKCE  
    - Reakcia na incidenty a obnova s automatizovanými schopnosťami  
    - Dodržiavanie predpisov a riadenie so zosúladením s reguláciami  
    - Pokročilé bezpečnostné kontroly s architektúrou zero trust  
    - Integrácia Microsoft bezpečnostného ekosystému s komplexnými riešeniami  
    - Neustály vývoj bezpečnosti s adaptívnymi praktikami  
  - **Microsoft bezpečnostné riešenia**: Vylepšený návod na integráciu Prompt Shields, Azure Content Safety, Entra ID a GitHub Advanced Security  
  - **Implementačné zdroje**: Kategorizované komplexné odkazy na zdroje podľa Oficiálnej MCP dokumentácie, Microsoft bezpečnostných riešení, bezpečnostných štandardov a implementačných príručiek

#### Pokročilé bezpečnostné kontroly (02-Security/) – Podniková implementácia  
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletný prekop so zabezpečením podnikovej úrovne  
  - **9 komplexných bezpečnostných domén**: Rozšírené z základných kontrol na detailný podnikový rámec  
    - Pokročilá autentifikácia a autorizácia s integráciou Microsoft Entra ID  
    - Bezpečnosť tokenov a anti-passthrough kontroly s komplexnou validáciou  
    - Kontroly bezpečnosti relácií s prevenciou prevzatia relácie  
    - Bezpečnostné kontroly špecifické pre AI s prevenciou injekcie promptu a otravovania nástrojov  
    - Prevencia Confused Deputy útokov s OAuth proxy bezpečnosťou  
    - Bezpečnosť vykonávania nástrojov so sandboxovaním a izoláciou  
    - Kontroly bezpečnosti dodávateľského reťazca s verifikáciou závislostí  
    - Monitorovanie a detekčné kontroly s integráciou SIEM  
    - Reakcia na incidenty a obnova s automatizovanými schopnosťami  
  - **Implementačné príklady**: Pridané detailné YAML konfiguračné bloky a ukážky kódu  
  - **Integrácia Microsoft riešení**: Komplexné pokrytie Azure bezpečnostných služieb, GitHub Advanced Security a podnikovej správy identity

#### Bezpečnosť pokročilých tém (05-AdvancedTopics/mcp-security/) – Produkčne pripravená implementácia  
- **README.md**: Kompletný prepis pre podnikové bezpečnostné implementácie  
  - **Zladenie s aktuálnou špecifikáciou**: Aktualizované na MCP Špecifikáciu 2025-06-18 s povinnými bezpečnostnými požiadavkami  
  - **Vylepšená autentifikácia**: Integrácia Microsoft Entra ID s komplexnými príkladmi .NET a Java Spring Security  
  - **Integrácia AI bezpečnosti**: Implementácia Microsoft Prompt Shields a Azure Content Safety s detailnými príkladmi v Pythone  
  - **Pokročilé mitigácie hrozieb**: Komplexné implementačné príklady pre  
    - Prevenciu Confused Deputy útokov pomocou PKCE a validácie súhlasu používateľa  
    - Prevenciu passthrough tokenov s validáciou audiencie a bezpečnou správou tokenov
    - Prevencia unesenia relácie s kryptografickým väznením a behaviorálnou analýzou
  - **Integrácia firemnej bezpečnosti**: Monitorovanie Azure Application Insights, pipeliny detekcie hrozieb a bezpečnosť dodávateľského reťazca
  - **Implementačný kontrolný zoznam**: Jasné povinné vs. odporúčané bezpečnostné opatrenia s výhodami bezpečnostného ekosystému Microsoftu

### Kvalita dokumentácie a súlad so štandardmi
- **Odkazy na špecifikácie**: Aktualizované všetky odkazy na aktuálnu špecifikáciu MCP 2025-06-18
- **Ekosystém bezpečnosti Microsoft**: Vylepšené pokyny o integrácii naprieč celou bezpečnostnou dokumentáciou
- **Praktická implementácia**: Pridané podrobné príklady kódu v .NET, Jave a Pythone s podnikateľskými vzormi
- **Organizácia zdrojov**: Komplexná kategorizácia oficiálnej dokumentácie, bezpečnostných štandardov a sprievodcov implementáciou
- **Vizualizácia indikátorov**: Jasné označenie povinných požiadaviek vs. odporúčaných postupov


#### Základné koncepty (01-CoreConcepts/) – Kompletná modernizácia
- **Aktualizácia verzie protokolu**: Aktualizované odkazy na aktuálnu špecifikáciu MCP 2025-06-18 s verziou založenou na dátume (formát RRRR-MM-DD)
- **Zdokonalenie architektúry**: Vylepšené popisy Hostiteľov, Klientov a Serverov, aby odrážali aktuálne architektonické vzory MCP
  - Hostitelia teraz jasne definovaní ako AI aplikácie koordinujúce viacero pripojení MCP klientov
  - Klienti popísaní ako konektory protokolu udržiavajúce vzťahy jeden na jedného so serverom
  - Servery doplnené o scenáre lokálneho a vzdialeného nasadenia
- **Reštrukturalizácia primitív**: Kompletná revízia serverových a klientske primitív
  - Serverové primitíva: Zdroje (dátové zdroje), Výzvy (šablóny), Nástroje (spustiteľné funkcie) s podrobným vysvetlením a príkladmi
  - Klientské primitíva: Vzorkovanie (dokoncovanie LLM), Vyvolávanie (vstup používateľa), Logovanie (debugovanie/monitorovanie)
  - Aktualizované so súčasnými vzormi objavovania (`*/list`), načítania (`*/get`) a vykonávania (`*/call`)
- **Architektúra protokolu**: Zavedený dvojvrstvový model architektúry
  - Dátová vrstva: Základ JSON-RPC 2.0 s riadením životného cyklu a primitívami
  - Prenosová vrstva: STDIO (lokálne) a prenosné HTTP so SSE (vzdialené) prenosové mechanizmy
- **Bezpečnostný rámec**: Komplexné bezpečnostné princípy vrátane explicitného súhlasu používateľa, ochrany súkromia dát, bezpečnosti vykonávania nástrojov a bezpečnosti prenosovej vrstvy
- **Komunikačné vzory**: Aktualizované protokolové správy zobrazujúce inicializáciu, objavovanie, vykonávanie a tok oznámení
- **Príklady kódu**: Obnovené príklady v mnohých jazykoch (.NET, Java, Python, JavaScript) tak, aby odrážali aktuálne vzory MCP SDK

#### Bezpečnosť (02-Security/) – Komplexná revízia bezpečnosti  
- **Súlad so štandardmi**: Plný súlad s bezpečnostnými požiadavkami MCP špecifikácie 2025-06-18
- **Vývoj autentifikácie**: Dokumentovaný vývoj od vlastných OAuth serverov po delegáciu externých poskytovateľov identity (Microsoft Entra ID)
- **Analýza hrozieb špecifická pre AI**: Rozšírené pokrytie moderných útočných vektorov AI
  - Podrobné scenáre útokov na injekciu výzvy s reálnymi príkladmi
  - Mechanizmy otrávenia nástrojov a vzory útokov „rug pull“
  - Otrava kontextového okna a útoky na zmätok modelu
- **Microsoft riešenia bezpečnosti AI**: Komplexné pokrytie ekosystému bezpečnosti Microsoftu
  - AI Prompt Shields s pokročilými technikami detekcie, zvýrazňovania a oddeľovania
  - Vzory integrácie Azure Content Safety
  - GitHub Advanced Security na ochranu dodávateľského reťazca
- **Pokročilá mitigácia hrozieb**: Podrobné bezpečnostné opatrenia pre
  - unesenie relácie s MCP-špecifickými scenármi útokov a kryptografickými požiadavkami na ID relácie
  - problémy s „confused deputy“ v MCP proxy scenároch s explicitnými požiadavkami na súhlas
  - zraniteľnosti pri preposielaní tokenov s povinnými validačnými kontrolami
- **Bezpečnosť dodávateľského reťazca**: Rozšírené pokrytie AI dodávateľského reťazca vrátane základných modelov, služieb vkladania, poskytovateľov kontextu a API tretích strán
- **Základná bezpečnosť**: Vylepšená integrácia s podnikateľskými bezpečnostnými vzormi vrátane architektúry zero trust a ekosystému bezpečnosti Microsoftu
- **Organizácia zdrojov**: Kategorizované komplexné odkazy na zdroje podľa typu (Oficiálne dokumenty, Štandardy, Výskum, Microsoft riešenia, Sprievodcovia implementáciou)

### Vylepšenia kvality dokumentácie
- **Štruktúrované vzdelávacie ciele**: Vylepšené vzdelávacie ciele so špecifickými, činnosťami riadenými výsledkami 
- **Krížové odkazy**: Pridané odkazy medzi súvisiacimi témami bezpečnosti a základných konceptov
- **Aktuálne informácie**: Aktualizované všetky dátumové odkazy a odkazy na špecifikácie podľa súčasných štandardov
- **Pokyny k implementácii**: Pridané špecifické, činnosťami riadené pokyny k implementácii v oboch častiach

## 16. júl 2025

### README a vylepšenia navigácie
- Kompletná redizajn navigácie kurikula v README.md
- Nahradenie značiek `<details>` prístupnejším formátom založeným na tabuľke
- Vytvorenie alternatívnych rozložení v novom priečinku "alternative_layouts"
- Pridané príklady navigácie založenej na kartách, štýle záložiek a akordeóne
- Aktualizovaná sekcia štruktúry repozitára o všetky najnovšie súbory
- Vylepšená sekcia "Ako použiť toto kurikulum" s jasnými odporúčaniami
- Aktualizované odkazy na špecifikáciu MCP na správne URL
- Pridaná sekcia Context Engineering (5.14) do štruktúry kurikula

### Aktualizácie študijného sprievodcu
- Kompletná revízia študijného sprievodcu na zosúladenie so súčasnou štruktúrou repozitára
- Pridané nové sekcie pre MCP klientov a nástroje, a populárne MCP servery
- Aktualizovaná vizuálna mapa kurikula presne zobrazujúca všetky témy
- Vylepšené popisy pokročilých tém pokrývajúcich všetky špecializované oblasti
- Aktualizovaná sekcia prípadových štúdií odrážajúca reálne príklady
- Pridaný tento komplexný changelog

### Príspevky komunity (06-CommunityContributions/)
- Pridané detailné informácie o MCP serveroch pre generovanie obrázkov
- Pridaná komplexná sekcia o použití Claude vo VSCode
- Pridané pokyny pre nastavenie a používanie terminálového klienta Cline
- Aktualizovaná sekcia MCP klientov s všetkými populárnymi možnosťami klientov
- Vylepšené príklady príspevkov s presnejšími vzorkami kódu

### Pokročilé témy (05-AdvancedTopics/)
- Usporiadané všetky špecializované témy priečinkov s jednotným pomenovaním
- Pridané materiály a príklady kontextového inžinierstva
- Pridaná dokumentácia integrácie agenta Foundry
- Vylepšená dokumentácia integrácie bezpečnosti Entra ID

## 11. jún 2025

### Počiatočné vytvorenie
- Uvoľnená prvá verzia kurikula MCP pre začiatočníkov
- Vytvorená základná štruktúra pre všetkých 10 hlavných sekcií
- Implementovaná vizuálna mapa kurikula pre navigáciu
- Pridané úvodné ukážkové projekty vo viacerých programovacích jazykoch

### Začíname (03-GettingStarted/)
- Vytvorené prvé príklady implementácie servera
- Pridané pokyny pre vývoj klienta
- Zahrnuté návodné pokyny pre integráciu LLM klienta
- Pridaná dokumentácia integrácie pre VS Code
- Implementované príklady serverov Server-Sent Events (SSE)

### Základné koncepty (01-CoreConcepts/)
- Pridané podrobné vysvetlenie architektúry klient-server
- Vytvorená dokumentácia k hlavným komponentom protokolu
- Zdokumentované vzory zasielania správ v MCP

## 23. máj 2025

### Štruktúra repozitára
- Inicializovaný repozitár so základnou štruktúrou priečinkov
- Vytvorené README súbory pre každú hlavnú sekciu
- Nastavená infraštruktúra pre preklady
- Pridané obrázkové zdroje a diagramy

### Dokumentácia
- Vytvorený počiatočný README.md s prehľadom kurikula
- Pridané súbory CODE_OF_CONDUCT.md a SECURITY.md
- Nastavený SUPPORT.md s pokynmi na získanie pomoci
- Vytvorená predbežná štruktúra študijného sprievodcu

## 15. apríl 2025

### Plánovanie a rámec
- Počiatočné plánovanie kurikula MCP pre začiatočníkov
- Definované vzdelávacie ciele a cieľová skupina
- Nástin 10-člennej štruktúry kurikula
- Vyvinutý konceptuálny rámec pre príklady a prípadové štúdie
- Vytvorené počiatočné prototypy príkladov kľúčových konceptov

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->