# Záznam zmien: MCP pre začiatočníkov kurz

Tento dokument slúži ako záznam všetkých významných zmien urobených v kurze Model Context Protocol (MCP) pre začiatočníkov. Zmeny sú dokumentované v obrátenom chronologickom poradí (najnovšie zmeny prvé).

## 2. júl 2026

### Nová lekcia: Kandidát na vydanie špecifikácie MCP 2026-07-28

Pridané pokrytie nadchádzajúceho kandidáta na vydanie špecifikácie MCP `2026-07-28` (oznámené 21. mája 2026; oficiálne vydanie plánované na 28. júla 2026), zhrnuté z [oficiálneho blogového príspevku](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Základné východisko kurzu zostáva **MCP špecifikácia 2025-11-25** až do vydania novej verzie, takže tento obsah je prezentovaný ako pohľad do budúcnosti, nie ako prepis existujúcich lekcií.

- **Nové**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — celá lekcia pokrývajúca bezstavový protokol jadra (odstránenie handshake `initialize` a `Mcp-Session-Id`), nové smerovacie hlavičky `Mcp-Method`/`Mcp-Name`, cachovacie metadáta `ttlMs`/`cacheScope`, W3C Trace Context v `_meta`, formálny rámec rozšírení (MCP aplikácie a nové rozšírenie Tasks), šesť SEPs zameraných na zvýšenie autorizácie, ukončenie podpory Roots/Sampling/Logging a prechod na plný JSON Schema 2020-12 pre nástrojové schémy.
- **Aktualizované** s výhľadovými upozorneniami odkazujúcimi na novú lekciu:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): poznámka o verzii protokolu, sekcie Sampling/Roots/Logging/Tasks a "Čo bude ďalej"
  - [02-Security/README.md](./02-Security/README.md): upozornenie na zvýšenie bezpečnosti autorizácie
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): upozornenie na bezstavový prenos
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): upozornenie na ukončenie podpory Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): upozornenie na ukončenie Logging a rozšírenie Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): upozornenie na bezstavové/smerovacie zmeny
  - [README.md](./README.md): poznámka "Pohľad vpred" v sekcii špecifikácie a nová položka `1.1` v tabuľke modulov kurzu
  - [study_guide.md](./study_guide.md): perspektívna bodka v prehľade základných konceptov a datovaný dodatok
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): upozornenie na `mcp-session-id` mapu prenosu pred bezstavovým režimom požiadaviek
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): upozornenie na moduly o Root Contexts/Sampling ukončeniach a rozšírení Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): upozornenie na zvýšenie bezpečnosti autorizácie

## 24. jún 2026

### Nová lekcia: Používanie MCP v aplikácii Copilot

- [Sekcia Nástroje](./12-tooling/README.md) Pridaná sekcia nástrojov.
- [MCP v aplikácii Copilot](./12-tooling/01-copilot-app/README.md)

## 16. jún 2026

### Zarovnanie špecifikácie MCP a validácia ukážok

Overený kurz voči aktuálnej **MCP špecifikácii 2025-11-25** a najnovším oficiálnym SDK, následne opravené zostávajúce zastarané odkazy na špecifikáciu a potvrdené, že základné príklady sa stále kompilujú a spúšťajú.

#### Opravy verzií špecifikácie (2025-06-18 / 2025-03-26 → 2025-11-25)

Aktualizovaný anglický obsah, kde ešte tvrdil, že staršia verzia špecifikácie je *aktuálnym/najnovším* štandardom, a presmerované odkazy na kanonické cesty `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Aktualizované bannery "Súčasný štandard", úvod, hlavička hlavných bezpečnostných princípov, povinné požiadavky, sekcia Microsoft Entra ID, odkazy na Referencie & zdroje a záverečné bezpečnostné upozornenie (8 referencií) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aktualizovaný odkaz na doplnkové zdroje a banner "Súčasný štandard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Nahradený zastaraný odkaz `2025-03-26` na bezpečnostné a dôveryhodné stránky ktorých najnovšia verzia je 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Aktualizovaný oficiálny odkaz na dokumentáciu Sampling na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Aktualizované odkazy na "aktuálnu MCP špecifikáciu" v prítomnom čase a odkaz na doplnkové zdroje na 2025-11-25 (historické poznámky o ukončení SSE ponechané pre presnosť)

#### Validácia ukážok voči aktuálnym SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` vyriešil `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` prešlo bez typových chýb — existujúce API `McpServer`/`StdioServerTransport` zostávajú platné
- **Python (03-GettingStarted/01-first-server/solution/python)**: Overené v izolovanom `.venv` s `mcp[cli]` (1.27.2); `py_compile` prešiel a `FastMCP.list_tools()` správne vrátil nástroje `add` a `subtract`
- Potvrdené, že všetky verzie vzorových `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) sa čistým spôsobom prekladajú na aktuálnu `1.29.0` bez prerušení API

#### Zarovnanie pinu závislostí (uzatváranie verziových medzier)

Aktualizované zastaralé SDK piny tak, aby každá ukážka sledovala aktuálne vydanie MCP, v zhode s konvenciou celého repozitára:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Zvýšený `@modelcontextprotocol/sdk` z `^1.8.0` → `>=1.26.0` a aktualizovaný zastaralý popis balíčka `"updated for MCP 2025-06-18"` na `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** a **lab4/code/github_mcp_server/pyproject.toml**: Zvýšený presný pin `mcp==1.23.0` → `mcp>=1.26.0`; oba súbory `uv.lock` boli znova vygenerované (`uv lock`), takže lockfile sa zväzujú na aktuálny `mcp 1.27.2` a sú synchronizované s manifestami

#### Analýza medzier kurikula — pokrytie funkcií najnovšej špecifikácie

Overené, že kurz už pokrýva všetky primitivy zavedené/rozšírené v MCP 2025-11-25, takže neostávajú žiadne obsahové medzery:
- **Sampling**: Lekcia 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (vrátane režimu URL)**: Zdokumentované v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Zdokumentované v 00-Introduction, 01-CoreConcepts a 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimentálne, dlhodobé operácie)**: Zdokumentované v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features
- **Anotácie nástrojov** (`readOnlyHint` / `destructiveHint`): Zdokumentované v 01-CoreConcepts a 05-AdvancedTopics/mcp-protocol-features

### Zvýšenie bezpečnosti a oprava zraniteľností závislostí

Prebehol kompletný bezpečnostný audit každého súboru závislostí a ukážkového zdrojového kódu, následne boli opravené všetky hlásené npm upozornenia a jedna chyba na úrovni kódu. Po opravách hlásenie `npm audit` vykazuje **0 zraniteľností** vo všetkých auditovaných adresároch.

#### Zraniteľnosti závislostí npm (tranzitívne) — opravené

Skontrolovaných všetkých 15 committed `package-lock.json` súborov. Zraniteľnosti boli obmedzené na tranzitívne závislosti zavlečené vývojárskym nástrojom MCP Inspector, klientom OpenAI a MCP SDK; všetko je teraz vyriešené bez poškodenia vzoriek:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** a **lab3/code/weather_mcp/inspector**: Zvýšený `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), ktoré odstránili balíky `ajv`, `brace-expansion`, `diff`, `path-to-regexp` a `ws` upozornenia. Pridaný npm záznam `overrides` vynucujúci záplatu `shell-quote@1.8.4` na odstránenie kritického upozornenia preneseného cez `concurrently`; obe lockfile znovu vygenerované (teraz 0 zraniteľností)
- **03-GettingStarted/samples/typescript**: `npm audit fix` aktualizoval tranzitívny `qs` (stredná vážnosť) na opravené vydanie
- **03-GettingStarted/samples/javascript**: `npm audit fix` aktualizoval tranzitívny `hono` (stredná vážnosť) na opravené vydanie
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` aktualizoval tranzitívny `form-data` (vysoká vážnosť) na opravené vydanie
- **03-GettingStarted/11-simple-auth/solution/typescript**: Vygenerovaný chýbajúci `package-lock.json`, takže projekt je reprodukovateľný a auditovateľný (0 zraniteľností)

#### Bezpečnostná oprava na úrovni kódu (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Odstránené `shell=True` z nástroja `open_in_vscode`. Predchádzajúce `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` umožňovalo metaznaky shellu v ceste priečinka interpretovať `cmd.exe` (vektor príkazovej injekcie). Teraz priamo spúšťa vyriešený `Code.exe` s priečinkom ako argumentom — bez shellu — čo je funkčne ekvivalentné a bezpečné

#### Audit závislostí Pythonu

- Skontrolované všetky požiadavky Pythonu pomocou `pip-audit`. `05-AdvancedTopics` a `03-GettingStarted/samples/python` nehlásia **žiadne známe zraniteľnosti** (rozsahy ich `mcp` / `httpx` / `pydantic` / `python-dotenv` sa prekladajú na aktuálne záplatované vydania)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` označil tranzitívnu závislosť **`werkzeug` 3.1.1** s troma upozorneniami DoS pomocou `safe_join` na Windows zariadeniach — `CVE-2025-66221`, `CVE-2026-21860` a `CVE-2026-27199` (všetky opravené v 3.1.6). Pridaný explicitný bezpečnostný pin `werkzeug>=3.1.6`, takže sa vyrieši záplatované vydanie; overené, že obmedzenie sa čistým spôsobom vyrieši s balíčkami `chainlit` / `mcp` / `semantic-kernel`

### Rebranding názvu produktu

Aktualizovaný všetok obsah kurzu, aby odrážal rebranding produktov Microsoftu:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Aktualizovaný odkaz na Discord komunitu
- **AGENTS.md**: Aktualizovaná referencia na Discord server
- **README.md**: Aktualizované odkazy na technologický ekosystém
- **study_guide.md**: Aktualizované odkazy v prípadovej štúdii
- **05-AdvancedTopics/README.md**: Aktualizovaný názov a popis modulu 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Aktualizovaná hlavička sekcie a popis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Kompletná aktualizácia názvu modulu a obsahu
- **05-AdvancedTopics/mcp-security-entra/README.md**: Aktualizovaný odkaz na krížovú referenciu
- **07-LessonsfromEarlyAdoption/README.md**: Aktualizované odkazy v prípadovej štúdii
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Aktualizovaná hlavička sekcie 9, odznaky a funkcie
- **08-BestPractices/README.md**: Aktualizovaný odkaz na Discord komunitu
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Aktualizovaná referencia na Discord kanál
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Aktualizovaná referencia na nasadenie modelu
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Aktualizovaná tabuľka AI služieb
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Aktualizované odkazy na zdroje

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension pre VS Code

- **README.md**: Aktualizované hlavné odkazy v osnovách
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Aktualizovaný názov modulu, prehľad a všetky záhlavia modulov
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Aktualizovaný názov, ciele učenia, inštrukcie na nastavenie a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Aktualizovaný názov, ciele učenia, tabuľka MCP hostiteľov a krížové odkazy
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Aktualizovaný názov, odznaky, predpoklady a zdroje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Aktualizované odkazy na Agent Builder a odkaz na spätnú väzbu
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Aktualizované predpoklady a odkazy na rozšírenia

---

## 11. apríla 2026

### Nová lekcia, opravy dokumentácie a aktualizácie závislostí

#### Pridaný nový obsah osnovy

**Modul 05 - Pokročilé témy**
- **Lekcia 5.17: Adversariálne multi-agentné uvažovanie s MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nový komplexný návod pokrývajúci vzor adversariálneho debatu pre multi-agentné systémy
  - Mermaid architektonický diagram: dvaja agenti → zdieľaný MCP server → prepis debaty → sudca → verdikt
  - Zdieľaný MCP nástrojový server (`web_search` + `run_python`) implementovaný v Pythone a TypeScripte
  - Protichodné systémové výzvy (ZA / PROTI / Sudca) s explicitnými požiadavkami na používanie nástrojov
  - Orchestrátor debaty v Pythone, TypeScripte a C#, riadiaci kolá a smerovanie argumentov
  - Zapojenie MCP `ClientSession` pre orchestrátor do skutočných volaní nástrojov
  - Tabuľka prípadov použitia (detekcia halucinácií, modelovanie hrozieb, revízia návrhu API, overovanie faktov, výber technológií)
  - Bezpečnostné úvahy: spúšťanie v sandboxe, validácia volaní nástrojov, limitovanie rýchlosti, auditné záznamy
  - Štruktúrované cvičenie so tromi praktickými scénarami (revízia kódu, rozhodnutia o architektúre, moderovanie obsahu)

#### Opravy dokumentácie

**Modul 03 - Začíname**
- **05-stdio-server/README.md**: Opravený neúplný príklad stdio servera v TypeScripte — pridaná chýbajúca inštanciácia transportu (`new StdioServerTransport()`) a volanie `server.connect(transport)` v súlade s príkladmi v Pythone a .NET v rovnakej sekcii
- **14-sampling/README.md**: Opravená preklep — opravené `"Sampling is an davanced features"` na `"Sampling is an advanced feature"`

#### Aktualizácie osnovy

**Hlavný README.md**
- Pridaný záznam 5.17 (Adversariálne multi-agentné uvažovanie s MCP) do tabuľky osnovy s priamym odkazom na novú lekciu

**05-AdvancedTopics/README.md**
- Pridaný riadok lekcie 5.17 do tabuľky lekcií

**study_guide.md**
- Pridaná téma Adversariálne multi-agentné uvažovanie do myšlienkovej mapy a popisu v časti Pokročilé témy

#### Opravy kódu a bezpečnosti

**Modul 05 - Adversariálni agenti (`mcp-adversarial-agents`)**
- **Bezpečnostná oprava — injekcia príkazov**: Nahradená shell interpolácia `execSync` volaním `execFile` + `promisify` v TypeScript nástroji `run_python`, čím sa odstránila možnosť injekcie príkazov (kód riadený LLM je teraz odovzdávaný ako doslovný prvok argv bez zapojenia shellu)
- **Zapojenie slučky MCP nástrojov**: Aktualizovaný Python orchestrátor debaty používajúci klienta `AsyncAnthropic` (nahradil blokujúci sync `Anthropic`), odovzdávajúci živú `ClientSession` priamo do každého ťahu agenta, získavajúci definície nástrojov cez `session.list_tools()` v každom ťahu a vysielajúci bloky `tool_use` cez `session.call_tool()` v slučke, až model vydá finálnu textovú odpoveď

#### Aktualizácie závislostí

- Zvýšená verzia `hono` na 4.12.12 v niekoľkých balíkoch (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Zvýšená verzia `@hono/node-server` z 1.19.11 na 1.19.13 v TypeScript balíkoch
- Zvýšená verzia `cryptography` z 46.0.5 na 46.0.7 v Python balíkoch (lab 3 a 4 v 10-StreamliningAIWorkflows)
- Zvýšená verzia `lodash` z 4.17.23 na 4.18.1 v inšpektorovi 10-StreamliningAIWorkflows

#### Preklady

- Synchronizované preklady pre 48+ jazykov s najnovšími zmenami zdroja (i18n aktualizácia)

---

## 5. februára 2026

### Úložiskové overovanie a vylepšenia navigácie

#### Pridaný nový obsah osnovy

**Modul 03 - Začíname**
- **12-mcp-hosts/README.md**: Nový komplexný návod na nastavenie MCP hostiteľov
  - Konfiguračné príklady pre Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Šablóny JSON konfigurácií pre všetkých hlavných hostiteľov
  - Porovnávacia tabuľka typov transportu (stdio, SSE/HTTP, WebSocket)
  - Riešenie bežných problémov s pripojením
  - Bezpečnostné najlepšie postupy pre konfiguráciu hostiteľa

- **13-mcp-inspector/README.md**: Nový návod na ladenie MCP Inspectora
  - Spôsoby inštalácie (npx, globálny npm, zo zdroja)
  - Pripojenie k serverom cez stdio a HTTP/SSE
  - Testovacie nástroje, zdroje a pracovné postupy s výzvami
  - Integrácia s VS Code a MCP Inspectorom
  - Bežné scenáre ladenia a ich riešenia

**Modul 04 - Praktická implementácia**
- **pagination/README.md**: Nový návod na implementáciu stránkovania
  - Vzory stránkovania založené na kurzore v Pythone, TypeScripte, Jave
  - Spracovanie stránkovania na strane klienta
  - Stratégie návrhu kurzora (nepriehľadný vs. štruktúrovaný)
  - Odporúčania na optimalizáciu výkonu

**Modul 05 - Pokročilé témy**
- **mcp-protocol-features/README.md**: Hlboký ponor do nových funkcií protokolu
  - Implementácia notifikácií o pokroku
  - Vzory zrušenia požiadaviek
  - Šablóny zdrojov s URI vzormi
  - Riadenie životného cyklu servera
  - Riadenie úrovne logovania
  - Vzory spracovania chýb s JSON-RPC kódmi

#### Opravy navigácie (aktualizovaných viac než 24 súborov)

**Hlavné moduly README**
 Teraz odkazujú na prvú lekciu AJ nasledujúci modul

**Podadresáre 02-Security**
- Všetkých 5 doplnkových bezpečnostných dokumentov má teraz navigáciu "Čo ďalej"

**09-CaseStudy súbory**
- Všetky súbory s prípadovými štúdiami majú teraz sekvenčnú navigáciu

**10-StreamliningAI laboratória**
Pridaná sekcia Čo ďalej do prehľadu modulu 10 a modulu 11

#### Opravy kódu a obsahu

**Aktualizácie SDK a závislostí**
Opravená prázdna verzia openai na `^4.95.0`
Aktualizovaný SDK z `^1.8.0` na `>=1.26.0`
Aktualizované verzie mcp na `>=1.26.0`

**Opravy kódu**
Opravený neplatný model `gpt-4o-mini` na `gpt-4.1-mini`

**Opravy obsahu**
Opravený zlomený odkaz `READMEmd` → `README.md`, opravený hlavičkový názov osnovy `Module 1-3` → `Module 0-3`, opravené veľkosťou písmen citlivé cesty
Odstránený poškodený duplicitný obsah prípadovej štúdie 5

**Zlepšenia pre začiatočníkov**
Pridaný správny úvod, ciele učenia a predpoklady pre začiatočníkov

#### Aktualizácie osnovy

**Hlavný README.md**
- Pridané položky 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Stránkovanie), 5.16 (Funkcie protokolu) do tabuľky osnovy

**README modulov**
Pridané lekcie 12 a 13 do zoznamu lekcií
Pridaná sekcia Praktické návody s odkazom na stránkovanie
Pridané lekcie 5.15 (Vlastný transport) a 5.16 (Funkcie protokolu)

**study_guide.md**
- Aktualizovaná myšlienková mapa o všetky nové témy: Nastavenie MCP Hosts, MCP Inspector, Strategie stránkovania, Hlboký ponor do funkcií protokolu

## 28. januára 2026

### Preskúmanie zhody so špecifikáciou MCP 2025-11-25

#### Vylepšenie základných konceptov (01-CoreConcepts/)
- **Nový klientsky primitív – Roots**: Pridaná komplexná dokumentácia o primitíve Roots, ktorý umožňuje serverom rozumieť hraniciam súborového systému a prístupovým právam
- **Anotácie nástrojov**: Pridaná dokumentácia k behaviorálnym anotáciám nástrojov (`readOnlyHint`, `destructiveHint`) pre lepšie rozhodnutia o vykonaní nástrojov
- **Volanie nástrojov pri Sampling-u**: Aktualizovaná dokumentácia Sampling-u o parametre `tools` a `toolChoice` pre modelom riadené volania nástrojov počas požiadaviek Sampling
- **Elicitácia režimu URL**: Pridaná dokumentácia o URL-alizovanej elicitácii pre externé webové interakcie iniciované serverom
- **Úlohy (experimentálne)**: Pridaná nová sekcia dokumentujúca experimentálnu funkciu Úlohy pre trvalé obaly vykonávania a odložené získavanie výsledkov
- **Podpora ikoniek**: Poznamenané, že nástroje, zdroje, šablóny zdrojov a výzvy môžu teraz obsahovať ikonky ako dodatočné metadáta

#### Aktualizácie dokumentácie
- **README.md**: Pridaný odkaz na verziu MCP Špecifikácie 2025-11-25 a vysvetlenie verziovania na základe dátumu
- **study_guide.md**: Aktualizovaná mapa osnovy s pridaním Úloh a Anotácií nástrojov do sekcie Základné koncepty; aktualizovaný časový údaj dokumentu

#### Overovanie zhody so špecifikáciou
- **Verzia protokolu**: Overené, že celá dokumentácia odkazuje na aktuálnu MCP Špecifikáciu 2025-11-25
- **Zladenie architektúry**: Potvrdená presnosť dokumentácie dvojvrstvovej architektúry (Dátová vrstva + Transportná vrstva)
- **Dokumentácia primitívov**: Overené serverové primitíva (Zdroje, Výzvy, Nástroje) a klientské primitíva (Sampling, Elicitácia, Logovanie, Roots)
- **Transportné mechanizmy**: Overená presnosť dokumentácie STDIO a Streamovateľného HTTP transportu
- **Bezpečnostné odporúčania**: Potvrdené zladenie s aktuálnou dokumentáciou Najlepších bezpečnostných postupov MCP

#### Kľúčové funkcie MCP 2025-11-25 zdokumentované
- **OpenID Connect Discovery**: Objavovanie autentifikačného servera cez OIDC
- **Metadokumenty OAuth Client ID**: Odporúčaný mechanizmus registrácie klienta
- **JSON Schema 2020-12**: Predvolený dialekt pre definície MCP schém
- **SDK Tiering Systém**: Formalizované požiadavky na podporu a údržbu SDK funkcií
- **Štruktúra riadenia**: Formalizované pracovné skupiny a záujmové skupiny v riadení MCP

### Hlavná aktualizácia bezpečnostnej dokumentácie (02-Security/)

#### Integrácia MCP Security Summit Workshop (Sherpa)
- **Nový praktický výcvikový zdroj**: Pridaná komplexná integrácia s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) naprieč všetkou bezpečnostnou dokumentáciou
- **Pokrytie trasy expedície**: Zdokumentovaný kompletný postup z Base Campu na Summit
- **Zladenie s OWASP**: Všetky bezpečnostné odporúčania teraz mapujú na riziká OWASP MCP Azure Security Guide

#### Integrácia OWASP MCP Top 10
- **Nová sekcia**: Pridaná tabuľka OWASP MCP Top 10 bezpečnostných rizík s mitigáciami Azure do hlavného bezpečnostného README
- **Dokumentácia založená na rizikách**: Aktualizovaný mcp-security-controls-2025.md s odkazmi na riziká OWASP MCP pre každú bezpečnostnú doménu
- **Referenčná architektúra**: Odkaz na referenčnú architektúru a vzory implementácie OWASP MCP Azure Security Guide

#### Aktualizované bezpečnostné súbory
- **README.md**: Pridaný prehľad Sherpa Workshop, tabuľka trasy expedície, súhrn OWASP MCP Top 10 rizík a sekcia praktického výcviku
- **mcp-security-controls-2025.md**: Aktualizovaná hlavička na február 2026, pridané odkazy na OWASP riziká (MCP01-MCP08), opravená nejednotnosť verzie špecifikácie
- **mcp-security-best-practices-2025.md**: Pridaná sekcia zdrojov Sherpa a OWASP, aktualizovaný časový údaj
- **mcp-best-practices.md**: Pridaná sekcia praktického výcviku so Sherpa a OWASP odkazmi
- **azure-content-safety-implementation.md**: Pridaný odkaz OWASP MCP06, zosúladenie s Sherpa Camp 3 a dodatočná sekcia zdrojov

#### Pridané nové odkazy na zdroje
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuálne stránky rizík OWASP MCP (MCP01-MCP10)

### Zladenie s MCP Špecifikáciou 2025-11-25 naprieč osnovou

#### Modul 03 - Začíname
- **Dokumentácia SDK**: Pridaný Go SDK do oficiálneho zoznamu SDK; aktualizované všetky odkazy na SDK v súlade so špecifikáciou MCP 2025-11-25
- **Vysvetlenie transportu**: Aktualizované popisy STDIO a HTTP Streaming transportov s explicitnými odkazmi na špecifikáciu

#### Modul 04 - Praktická implementácia
- **Aktualizácie SDK**: Pridaný Go SDK; aktualizovaný zoznam SDK s odkazom na verziu špecifikácie
- **Autorizácia Spec**: Aktualizovaný odkaz na MCP Authorization špecifikáciu na aktuálnu verziu 2025-11-25

#### Modul 05 - Pokročilé témy
- **Nové funkcie**: Pridaná poznámka o nových funkciách MCP Špecifikácie 2025-11-25 (Úlohy, Anotácie nástrojov, Elicitácia režimu URL, Roots)
- **Bezpečnostné zdroje**: Pridané odkazy na OWASP MCP Top 10 a Sherpa workshop do dodatočných referencií

#### Modul 06 - Príspevky komunity
- **Zoznam SDK**: Pridané Swift a Rust SDK; aktualizovaný odkaz na špecifikáciu na 2025-11-25
- **Referenčná špecifikácia**: Aktualizovaný odkaz MCP Špecifikácie na priame URL špecifikácie

#### Modul 07 - Lekcie z ranného prijatia

- **Aktualizácie zdrojov**: Pridaný odkaz na Špecifikáciu MCP 2025-11-25 a OWASP MCP Top 10 do doplnkových zdrojov

#### Modul 08 - Najlepšie postupy
- **Verzia špecifikácie**: Aktualizovaný odkaz na Špecifikáciu MCP na verziu 2025-11-25
- **Bezpečnostné zdroje**: Pridané OWASP MCP Top 10 a Sherpa workshop do doplnkových referencií

#### Modul 10 - Zefektívnenie AI pracovných tokov
- **Aktualizácia odznaku**: Zmena odznaku verzie MCP z verzie SDK (1.9.3) na verziu špecifikácie (2025-11-25)
- **Odkazy na zdroje**: Aktualizovaný odkaz na Špecifikáciu MCP; pridané OWASP MCP Top 10

#### Modul 11 - MCP Server praktické laboratória
- **Odkaz na špecifikáciu**: Aktualizovaný odkaz na Špecifikáciu MCP na verziu 2025-11-25
- **Bezpečnostné zdroje**: Pridané OWASP MCP Top 10 do oficiálnych zdrojov

## 18. december 2025

### Aktualizácia bezpečnostnej dokumentácie - MCP Špecifikácia 2025-11-25

#### Najlepšie bezpečnostné postupy MCP (02-Security/mcp-best-practices.md) - Aktualizácia verzie špecifikácie
- **Aktualizácia verzie protokolu**: Aktualizované na referenciu najnovšej Špecifikácie MCP 2025-11-25 (vydanej 25. novembra 2025)
  - Aktualizované všetky odkazy na verziu špecifikácie z 18.06.2025 na 25.11.2025
  - Aktualizované dátumy dokumentov z 18. augusta 2025 na 18. decembra 2025
  - Overené, že všetky URL odkazujú na aktuálnu dokumentáciu
- **Validácia obsahu**: Komplexná validácia najlepších bezpečnostných postupov podľa najnovších štandardov
  - **Microsoft bezpečnostné riešenia**: Overená aktuálna terminológia a odkazy na Prompt Shields (predtým "detekcia rizika úniku"), Azure Content Safety, Microsoft Entra ID a Azure Key Vault
  - **OAuth 2.1 bezpečnosť**: Potvrdená zhoda s najnovšími bezpečnostnými postupmi OAuth
  - **OWASP štandardy**: Overené, že odkazy na OWASP Top 10 pre LLM zostávajú aktuálne
  - **Azure služby**: Overené všetky odkazy na dokumentáciu Microsoft Azure a najlepšie postupy
- **Zladenie so štandardmi**: Všetky uvedené bezpečnostné štandardy boli potvrdené ako aktuálne
  - NIST rámec riadenia rizík AI
  - ISO 27001:2022
  - Najlepšie praktiky bezpečnosti OAuth 2.1
  - Azure bezpečnostné a dodržiavacie rámce
- **Implementačné zdroje**: Overené všetky odkazy a zdroje k implementačným návodom
  - Overovacie vzory autentifikácie Azure API Management
  - Návody na integráciu Microsoft Entra ID
  - Správa tajomstiev Azure Key Vault
  - DevSecOps pipeline a monitorovacie riešenia

### Kontrola kvality dokumentácie
- **Súlad so špecifikáciou**: Zabezpečené, že všetky povinné bezpečnostné požiadavky MCP (MUST/MUST NOT) zodpovedajú najnovšej špecifikácii
- **Aktualnosť zdrojov**: Overené všetky externé odkazy na Microsoft dokumentáciu, bezpečnostné štandardy a implementačné návody
- **Pokrytie najlepšími postupmi**: Potvrdené komplexné pokrytie autentifikácie, autorizácie, hrozieb špecifických pre AI, bezpečnosti dodávateľského reťazca a podnikových vzorov

## 6. október 2025

### Rozšírenie sekcie Začíname – Pokročilé použitie servera a jednoduchá autentifikácia

#### Pokročilé použitie servera (03-GettingStarted/10-advanced)
- **Pridaná nová kapitola**: Zavedený komplexný návod na pokročilé použitie MCP servera, pokrývajúci bežnú aj nízkou úrovňovú architektúru servera.
  - **Bežný vs. nízkou úrovňový server**: Podrobná komparácia a príklady kódu v Pythone a TypeScripte pre oba prístupy.
  - **Dizajn založený na handleroch**: Vysvetlenie správy nástrojov/zdrojov/výziev prostredníctvom handlerov pre škálovateľné a flexibilné implementácie servera.
  - **praktické vzory**: Reálne scenáre, kde sú nízkou úrovňové vzory serverov výhodné pre pokročilé funkcie a architektúru.

#### Jednoduchá autentifikácia (03-GettingStarted/11-simple-auth)
- **Pridaná nová kapitola**: Postupný návod na implementáciu jednoduchej autentifikácie v MCP serveroch.
  - **Koncepty autentifikácie**: Jasné vysvetlenie rozdielu medzi autentifikáciou a autorizáciou, a správy prihlasovacích údajov.
  - **Implementácia základnej autentifikácie**: Vzory autentifikácie na báze middleware v Pythone (Starlette) a TypeScripte (Express) s príkladmi kódu.
  - **Prechod na pokročilú bezpečnosť**: Rady, ako začať s jednoduchou autentifikáciou a pokročiť k OAuth 2.1 a RBAC, s odkazmi na pokročilé bezpečnostné moduly.

Tieto doplnky poskytujú praktické, praktické pokyny pre vývoj robustnejších, bezpečnejších a flexibilnejších implementácií MCP servera, spájajúc základné koncepty s pokročilými produkčnými vzormi.

## 29. september 2025

### MCP Server databázové integračné laboratóriá - komplexná praktická vzdelávacia cesta

#### 11-MCPServerHandsOnLabs - Nový kompletný kurz databázovej integrácie
- **Kompletná 13-laboratórna vzdelávacia cesta**: Pridaný komplexný praktický kurz na vývoj produkčne pripravených MCP serverov s integráciou databázy PostgreSQL
  - **Praktická implementácia**: Prípad použitia analytiky Zava Retail demonštrujúci podnikové štandardy
  - **Štruktúrovaný učebný postup**:
    - **Laboratóriá 00-03: Základy** - Úvod, základná architektúra, bezpečnosť a multi-tenantnosť, nastavenie prostredia
    - **Laboratóriá 04-06: Budovanie MCP servera** - Návrh databázy a schéma, implementácia MCP servera, vývoj nástrojov
    - **Laboratóriá 07-09: Pokročilé funkcie** - Integrácia semantického vyhľadávania, testovanie a ladenie, integrácia VS Code
    - **Laboratóriá 10-12: Produkcia a najlepšie postupy** - Nasadzovacie stratégie, monitorovanie a pozorovateľnosť, optimalizácia a najlepšie postupy
  - **Podnikové technológie**: Rámec FastMCP, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Pokročilé funkcie**: RLS (riadenie úrovne riadkov), semantické vyhľadávanie, prístup s viacerými tenantmi, vektorové reprezentácie, monitorovanie v reálnom čase

#### Štandardizácia terminológie - konverzia z modulov na laboratóriá
- **Komplexná aktualizácia dokumentácie**: Systematicky aktualizované všetky README súbory v 11-MCPServerHandsOnLabs na používanie terminológie "Laboratórium" namiesto "Modul"
  - **Nadpisy sekcií**: Aktualizované "Čo tento modul pokrýva" na "Čo toto laboratórium pokrýva" vo všetkých 13 laboratóriách
  - **Popis obsahu**: Zmena "Tento modul poskytuje..." na "Toto laboratórium poskytuje..." v celej dokumentácii
  - **Učebné ciele**: Aktualizované "Na konci tohto modulu..." na "Na konci tohto laboratória..."
  - **Navigačné odkazy**: Všetky odkazy "Modul XX:" zmenené na "Laboratórium XX:" v krížových odkazoch a navigácii
  - **Sledovanie dokončenia**: Aktualizované "Po dokončení tohto modulu..." na "Po dokončení tohto laboratória..."
  - **Zachované technické referencie**: Zachované python modulové odkazy v konfiguračných súboroch (napr. `"module": "mcp_server.main"`)

#### Vylepšenie študijného sprievodcu (study_guide.md)
- **Vizualizácia učebnej osnovy**: Pridaná nová sekcia "11. Databázové integračné laboratóriá" s komplexnou štruktúrou laboratórií
- **Štruktúra repozitára**: Aktualizovaná z desiatich na jedenásť hlavných sekcií so detailným popisom 11-MCPServerHandsOnLabs
- **Učebné odporúčania**: Rozšírené navigačné pokyny pokrývajúce sekcie 00-11
- **Technologické pokrytie**: Pridané podrobnosti o FastMCP, PostgreSQL, integrácii Azure služieb
- **Výsledky učenia**: Zdôraznený vývoj produkčne pripravených serverov, vzory integrácie databázy a podniková bezpečnosť

#### Vylepšenie štruktúry hlavného README
- **Terminológia založená na laboratóriách**: Hlavný README.md v 11-MCPServerHandsOnLabs aktualizovaný na konzistentné používanie štruktúry "Laboratórium"
- **Organizácia učebnej cesty**: Jasný postup od základných konceptov cez pokročilú implementáciu až po produkčné nasadenie
- **Zameranie na prax**: Dôraz na praktické, laboratórne učenie s podnikový štandardmi a technológiami

### Zlepšenia kvality a konzistencie dokumentácie
- **Dôraz na praktické vedenie**: Posilnený praktický, laboratórny prístup v celej dokumentácii
- **Zameranie na podnikové vzory**: Zvýraznené produkčne pripravené implementácie a podnikové bezpečnostné aspekty
- **Integrácia technológií**: Komplexné pokrytie moderných služieb Azure a vzorov integrácie AI
- **Postup učenia**: Jasná, štruktúrovaná cesta od základov po produkčné nasadenie

## 26. september 2025

### Rozšírenie prípadových štúdií - integrácia GitHub MCP Registry

#### Prípadové štúdie (09-CaseStudy/) - Zameranie na rozvoj ekosystému
- **README.md**: Rozsiahle rozšírenie s komplexnou prípadovou štúdiou GitHub MCP Registry
  - **Prípadová štúdia GitHub MCP Registry**: Nová rozsiahla štúdia skúmajúca spustenie GitHub MCP Registry v septembri 2025
    - **Analýza problému**: Podrobný rozbor fragmentovaných výziev objavovania a nasadzovania MCP serverov
    - **Architektúra riešenia**: Centralizovaný registračný prístup GitHubu s inštaláciou VS Code jedným kliknutím
    - **Obchodný dopad**: Merateľné zlepšenia onboarding vývojárov a produktivity
    - **Strategická hodnota**: Zameranie na modulárne nasadzovanie agentov a interoperabilitu medzi nástrojmi
    - **Rozvoj ekosystému**: Pozicionovanie ako základná platforma pre agentickú integráciu
  - **Vylepšená štruktúra prípadovej štúdie**: Aktualizované všetky sedem prípadových štúdií s konzistentným formátovaním a komplexnými popismi
    - Azure AI Travel Agents: dôraz na multi-agentnú orchestráciu
    - Azure DevOps integrácia: zameranie na automatizáciu pracovných tokov
    - Reálne časové získavanie dokumentácie: implementácia klienta pre Python konzolu
    - Interaktívny generátor študijných plánov: Chainlit konverzačná webová aplikácia
    - Dokumentácia v editore: integrácia VS Code a GitHub Copilot
    - Azure API Management: podnikové vzory integrácie API
    - GitHub MCP Registry: rozvoj ekosystému a komunitná platforma
  - **Komplexný záver**: Prepracovaná záverečná sekcia poukazujúca na sedem prípadových štúdií pokrývajúcich rôzne dimenzie implementácie MCP
    - Podniková integrácia, multi-agentná orchestrácia, produktivita vývojárov
    - Rozvoj ekosystému, kategorizácia vzdelávacích aplikácií
    - Vylepšené poznatky o architektonických vzoroch, implementačných stratégiách a najlepších praktikách
    - Dôraz na MCP ako zrelý, produkčne pripravený protokol

#### Aktualizácie študijného sprievodcu (study_guide.md)
- **Vizualizácia osnovy učebného plánu**: Aktualizovaná myšlienková mapa so zaradením GitHub MCP Registry do sekcie prípadových štúdií
- **Popis prípadových štúdií**: Vylepšený z všeobecných popisov na detailné rozdelenie siedmich komplexných prípadových štúdií
- **Štruktúra repozitára**: Aktualizovaná sekcia 10 s komplexným pokrytím prípadových štúdií s konkrétnymi implementačnými detailmi
- **Integrácia changelogu**: Pridaný záznam z 26. septembra 2025 dokumentujúci pridanie GitHub MCP Registry a vylepšenia prípadových štúdií
- **Aktualizácie dátumu**: Aktualizovaný časový údaj v pätičke na poslednú revíziu (26. september 2025)

### Zlepšenia kvality dokumentácie
- **Zvýšenie konzistencie**: Štandardizované formátovanie a štruktúra prípadových štúdií vo všetkých siedmich príkladoch
- **Komplexné pokrytie**: Prípadové štúdie teraz pokrývajú podnikové, produktivitu vývojárov a scenáre rozvoja ekosystému
- **Strategické pozicionovanie**: Zvýšený dôraz na MCP ako základnú platformu pre nasadzovanie agentických systémov
- **Integrácia zdrojov**: Doplnkové zdroje aktualizované o odkaz na GitHub MCP Registry

## 15. september 2025

### Rozšírenie pokročilých tém - vlastné transporty a context engineering

#### MCP Vlastné transporty (05-AdvancedTopics/mcp-transport/) - Nový návod na pokročilú implementáciu
- **README.md**: Kompletný návod na implementáciu vlastných MCP transportných mechanizmov
  - **Azure Event Grid Transport**: Komplexná serverless event-driven implementácia transportu
    - Príklady v C#, TypeScript a Pythone s integráciou Azure Functions
    - Event-driven architektúrne vzory pre škálovateľné MCP riešenia
    - Príjemcovia webhookov a push-based spracovanie správ
  - **Azure Event Hubs Transport**: Implementácia vysoko-propustného streamingového transportu
    - Streaming v reálnom čase pre nízku latenciu
    - Stratégiu partícií a manažment checkpointov
    - Batchovanie správ a optimalizácia výkonu
  - **Podnikové integračné vzory**: Produkčne pripravené architektonické príklady
    - Distribuované MCP spracovanie cez viaceré Azure Functions
    - Hybridné transportné architektúry kombinujúce viacero typov transportu
    - Trvácnosť správ, spoľahlivosť a stratégie spracovania chýb
  - **Bezpečnosť a monitorovanie**: Integrácia Azure Key Vault a vzory pozorovateľnosti
    - Autentifikácia spravovanej identity a prístup s najmenšími privilégiami
    - Telemetria Application Insights a monitorovanie výkonu
    - Obvody (circuit breakers) a vzory tolerancie chýb
  - **Testovacie rámce**: Komplexné testovacie stratégie pre vlastné transporty
    - Jednotkové testovanie s testovacími dublami a mocking frameworkami
    - Integračné testovanie pomocou Azure Test Containers
    - Úvahy o výkone a záťaži počas testovania

#### Context engineering (05-AdvancedTopics/mcp-contextengineering/) - Emerging AI Discipline
- **README.md**: Komplexné preskúmanie context engineering ako vznikajúcej disciplíny
  - **Základné princípy**: Kompletné zdieľanie kontextu, povedomie o rozhodnutiach akcií a správa kontextového okna
  - **Zladenie s MCP protokolom**: Ako dizajn MCP rieši výzvy context engineering
    - Obmedzenia kontextového okna a progresívne stratégie načítavania
    - Určovanie relevantnosti a dynamické získavanie kontextu
    - Multimodálne spracovanie kontextu a bezpečnostné úvahy
  - **Implementačné prístupy**: Jednovláknové vs. viaceré agentné architektúry
    - Rozdelenie kontextu a prioritizačné techniky
    - Progresívne načítavanie kontextu a kompresné stratégie
    - Viacvrstvové prístupy ku kontextu a optimalizácia získavania
  - **Meracie rámce**: Vznikajúce metriky na hodnotenie efektivity kontextu
    - Efektivita vstupu, výkon, kvalita a skúsenosť používateľa
    - Experimentálne prístupy k optimalizácii kontextu
    - Analýza zlyhaní a metodiky zlepšovania

#### Aktualizácie navigácie osnovy (README.md)
- **Vylepšená štruktúra modulu**: Aktualizovaná tabuľka osnovy s pridaním nových pokročilých tém
  - Pridané položky Context Engineering (5.14) a Custom Transport (5.15)
  - Konzistentné formátovanie a navigačné odkazy vo všetkých moduloch
  - Aktualizované popisy zodpovedajúce aktuálnemu rozsahu obsahu

### Vylepšenia štruktúry adresárov
- **Štandardizácia pomenovaní**: Premenované "mcp transport" na "mcp-transport" pre konzistenciu s ostatnými zložkami pokročilých tém
- **Organizácia obsahu**: Všetky 05-AdvancedTopics zložky teraz nasledujú konzistentný vzor pomenovania (mcp-[téma])

### Zlepšenia kvality dokumentácie
- **Zladenie so špecifikáciou MCP**: Všetok nový obsah odkazuje na aktuálnu MCP Špecifikáciu 2025-06-18
- **Príklady v viacerých jazykoch**: Komplexné príklady kódu v C#, TypeScript a Pythone

- **Zameranie na podniky**: Vzory pripravené na výrobu a integrácia cloud Azure po celú dobu
- **Vizualizácia dokumentácie**: Mermaid diagramy pre vizualizáciu architektúry a toku

## 18. august 2025

### Komplexná aktualizácia dokumentácie - štandardy MCP 2025-06-18

#### Najlepšie bezpečnostné praktiky MCP (02-Security/) - Kompletná modernizácia
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Kompletné prepísanie v súlade s špecifikáciou MCP 2025-06-18
  - **Povinné požiadavky**: Pridané explicitné požiadavky MUSÍ/NESMIE z oficiálnej špecifikácie s jasnými vizuálnymi indikátormi
  - **12 základných bezpečnostných praktík**: Prepracované z 15-položkového zoznamu na komplexné bezpečnostné domény
    - Bezpečnosť tokenov a autentifikácia s integráciou externého poskytovateľa identity
    - Správa relácií a bezpečnosť prenosu s kryptografickými požiadavkami
    - Ochrana proti hrozbám špecifickým pre AI s integráciou Microsoft Prompt Shields
    - Kontrola prístupu a povolení s princípom minimálnych právomocí
    - Bezpečnosť obsahu a monitorovanie s integráciou Azure Content Safety
    - Bezpečnosť dodávateľského reťazca s komplexnou verifikáciou komponentov
    - Bezpečnosť OAuth a prevencia útoku “confused deputy” s implementáciou PKCE
    - Reakcia na incidenty a obnova s automatizovanými schopnosťami
    - Súlad a správa s regulačnou zhodou
    - Pokročilé bezpečnostné kontroly s architektúrou zero trust
    - Integrácia s bezpečnostným ekosystémom Microsoft s komplexnými riešeniami
    - Neustály vývoj bezpečnosti s adaptívnymi praktikami
  - **Bezpečnostné riešenia Microsoft**: Vylepšené integrácie pre Prompt Shields, Azure Content Safety, Entra ID a GitHub Advanced Security
  - **Implementačné zdroje**: Kategorizované komplexné odkazy na zdroje podľa oficiálnej dokumentácie MCP, riešení Microsoft Security, bezpečnostných štandardov a príručiek implementácie

#### Pokročilé bezpečnostné kontroly (02-Security/) - Implementácia pre podniky
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletná revízia so zabezpečovacím rámcom podnikovej úrovne
  - **9 komplexných bezpečnostných domén**: Rozšírené z jednoduchých kontrol na detailný podnikový rámec
    - Pokročilá autentifikácia a autorizácia s integráciou Microsoft Entra ID
    - Bezpečnosť tokenu a protikontrola passtrough s komplexnou validáciou
    - Kontroly bezpečnosti relácie s prevenciou hijackingu
    - Bezpečnostné kontroly špecifické pre AI s predchádzaním injekciám promptov a otravám nástrojov
    - Prevencia útoku “confused deputy” s bezpečnosťou OAuth proxy
    - Bezpečnosť spustenia nástrojov s pieskoviskami a izoláciou
    - Bezpečnostné kontroly dodávateľského reťazca s overením závislostí
    - Kontroly monitorovania a detekcie s integráciou SIEM
    - Reakcia na incidenty a obnova s automatizovanými schopnosťami
  - **Implementačné príklady**: Pridané detailné YAML konfiguračné bloky a príklady kódu
  - **Integrácia riešení Microsoft**: Komplexné pokrytie služieb bezpečnosti Azure, GitHub Advanced Security a správy identít na podnikovej úrovni

#### Pokročilé bezpečnostné témy (05-AdvancedTopics/mcp-security/) - Implementácia pripravená na výrobu
- **README.md**: Kompletné prepísanie pre implementáciu bezpečnosti pre podnikové prostredie
  - **Zarovnanie s aktuálnou špecifikáciou**: Aktualizované podľa špecifikácie MCP 2025-06-18 s povinnými bezpečnostnými požiadavkami
  - **Vylepšená autentifikácia**: Integrácia Microsoft Entra ID s komplexnými príkladmi pre .NET a Java Spring Security
  - **Integrácia bezpečnosti AI**: Implementácia Microsoft Prompt Shields a Azure Content Safety s detailnými príkladmi v Pythone
  - **Pokročilé zmierňovanie hrozieb**: Komplexné implementačné príklady pre
    - Prevenciu útoku “confused deputy” s PKCE a validáciou súhlasu používateľa
    - Prevenciu passtrough tokenov s validáciou publika a bezpečnou správou tokenov
    - Prevenciu hijackingu relácie s kryptografickým viazaním a behaviorálnou analýzou
  - **Integrácia podnikovej bezpečnosti**: Monitorovanie Azure Application Insights, pipeline detekcie hrozieb a bezpečnosť dodávateľského reťazca
  - **Implementačný kontrolný zoznam**: Jasné oddelenie povinných vs. odporúčaných bezpečnostných kontrol s výhodami Microsoft bezpečnostného ekosystému

### Kvalita dokumentácie a zarovnanie so štandardmi
- **Odkazy na špecifikácie**: Aktualizované všetky odkazy na aktuálnu špecifikáciu MCP 2025-06-18
- **Bezpečnostný ekosystém Microsoft**: Vylepšené smernice integrácie v celej bezpečnostnej dokumentácii
- **Praktická implementácia**: Pridané detailné príklady kódu v .NET, Java a Pythone s podnikateľskými vzormi
- **Organizácia zdrojov**: Komplexná kategorizácia oficiálnej dokumentácie, bezpečnostných štandardov a príručiek implementácie
- **Vizuálne indikátory**: Jasné označenie povinných požiadaviek vs. odporúčaných praktík


#### Základné koncepty (01-CoreConcepts/) - Kompletná modernizácia
- **Aktualizácia verzie protokolu**: Aktualizované na odkazovanie aktuálnej špecifikácie MCP 2025-06-18 s verziou podľa dátumu (formát RRRR-MM-DD)
- **Vyladenie architektúry**: Vylepšené popisy Hostiteľov, Klientov a Serverov, aby reflektovali aktuálne MCP architektonické vzory
  - Hostiteľe sú teraz jasne definovaní ako AI aplikácie koordinujúce viacero MCP klientskych pripojení
  - Klienti sú popísaní ako protokolové konektory udržiavajúce jedno-na-jedno vzťahy so servermi
  - Servery vylepšené s lokálnymi vs vzdialenými scénarmi nasadenia
- **Prepracovanie primitívov**: Kompletná revízia primitívov serverov a klientov
  - Serverové primitívy: Zdroje (dátové zdroje), Prompt šablóny, Nástroje (vykonateľné funkcie) s detailnými vysvetleniami a príkladmi
  - Klientské primitívy: Odbery (LLM odpovede), Zber (vstup používateľa), Logovanie (ladění/monitoring)
  - Aktualizované na aktuálne vzory metód objavovania (`*/list`), získavania (`*/get`) a vykonávania (`*/call`)
- **Architektúra protokolu**: Zavedený model dvojvrstvovej architektúry
  - Vrstva dát: JSON-RPC 2.0 základ s manažmentom životného cyklu a primitívov
  - Vrstva transportu: STDIO (lokálne) a Streamable HTTP s SSE (vzdialený) transportné mechanizmy
- **Bezpečnostný rámec**: Komplexné bezpečnostné princípy vrátane explicitného súhlasu používateľa, ochrany súkromia údajov, bezpečnosti vykonávania nástrojov a bezpečnosti transportnej vrstvy
- **Komunikačné vzory**: Aktualizované správy protokolu ukazujúce inicializáciu, objavovanie, vykonávanie a notifikačné toky
- **Príklady kódu**: Obnovené príklady pre viacero jazykov (.NET, Java, Python, JavaScript) reflektujúce aktuálne vzory MCP SDK

#### Bezpečnosť (02-Security/) - Komplexná revízia bezpečnosti  
- **Zarovnanie so štandardmi**: Úplné zosúladenie s bezpečnostnými požiadavkami MCP špecifikácie 2025-06-18
- **Vývoj autentifikácie**: Zdokumentovaný vývoj od vlastných OAuth serverov k delegácii externého poskytovateľa identity (Microsoft Entra ID)
- **Analýza hrozieb špecifických pre AI**: Rozšírené pokrytie moderných útokov na AI
  - Detailné scenáre útokov injekcií promptov s reálnymi príkladmi
  - Mechanizmy otravy nástrojov a vzory útokov "rug pull"
  - Otrava kontextového okna a útoky spôsobujúce zmätok modelu
- **Bezpečnostné riešenia Microsoft AI**: Komplexné pokrytie bezpečnostného ekosystému Microsoft
  - AI Prompt Shields s pokročilými detekčnými, zvýrazňovacími a ohraničovacími technikami
  - Vzory integrácie Azure Content Safety
  - GitHub Advanced Security pre ochranu dodávateľského reťazca
- **Pokročilé zmierňovanie hrozieb**: Detailné bezpečnostné kontroly pre
  - Hijacking relácie s MCP-špecifickými scenármi útokov a kryptografickými požiadavkami na session ID
  - Problémy confused deputy v MCP proxy scénároch s explicitnými požiadavkami na súhlas
  - Zraniteľnosti token passtrough s povinnými validačnými kontrolami
- **Bezpečnosť dodávateľského reťazca**: Rozšírené pokrytie AI dodávateľského reťazca vrátane foundation modelov, embedding služieb, kontextových poskytovateľov a API tretích strán
- **Základná bezpečnosť**: Vylepšená integrácia s podnikateľskými bezpečnostnými vzormi vrátane architektúry zero trust a ekosystému Microsoft bezpečnosti
- **Organizácia zdrojov**: Kategorizované komplexné odkazy na zdroje podľa typu (Oficiálna dokumentácia, štandardy, výskum, riešenia Microsoft, príručky implementácie)

### Zlepšenia kvality dokumentácie
- **Štruktúrované vzdelávacie ciele**: Vylepšené vzdelávacie ciele so špecifickými, vykonateľnými výsledkami 
- **Krosové odkazy**: Pridané odkazy medzi súvisiacimi bezpečnostnými a základnými konceptmi témami
- **Aktuálne informácie**: Aktualizované všetky dátumové odkazy a odkazy na špecifikácie podľa aktuálnych štandardov
- **Smernice pre implementáciu**: Pridané konkrétne, vykonateľné implementačné usmernenia naprieč oboma sekciami

## 16. júl 2025

### Vylepšenia README a navigácie
- Kompletné prerobenie navigácie kurikula v README.md
- Nahradenie tagov `<details>` prístupnejším formátom založeným na tabuľkách
- Vytvorenie alternatívnych rozložení v novej zložke "alternative_layouts"
- Pridané príklady navigácie založenej na kartách, štýle záložiek a akordeóne
- Aktualizovaná sekcia štruktúry repozitára na zahrnutie všetkých najnovších súborov
- Vylepšená sekcia "Ako používať toto kurikulum" s jasnými odporúčaniami
- Aktualizované odkazy na špecifikácie MCP smerujúce na správne URL
- Pridaná sekcia Kontext Engineering (5.14) do štruktúry kurikula

### Aktualizácie študijného sprievodcu
- Kompletná revízia študijného sprievodcu na zosúladenie so súčasnou štruktúrou repozitára
- Pridané nové sekcie pre MCP klientov a nástroje a populárne MCP servery
- Aktualizovaná vizuálna mapa kurikula na presné zobrazenie všetkých tém
- Vylepšené popisy pokročilých tém na pokrytie všetkých špecializovaných oblastí
- Aktualizovaná sekcia prípadových štúdií na zobrazenie aktuálnych príkladov
- Pridaný tento komplexný changelog

### Príspevky komunity (06-CommunityContributions/)
- Pridané detailné informácie o MCP serveroch pre generovanie obrázkov
- Pridaná komplexná sekcia o používaní Claude vo VSCode
- Pridané inštrukcie na nastavenie a používanie terminálového klienta Cline
- Aktualizovaná sekcia MCP klientov o všetky populárne možnosti klientov
- Vylepšené príklady príspevkov s presnejšími ukážkami kódu

### Pokročilé témy (05-AdvancedTopics/)
- Zorganizované všetky špecializované tematické zložky s konzistentným pomenovaním
- Pridané materiály a príklady kontextového inžinierstva
- Pridaná dokumentácia integrácie agenta Foundry
- Vylepšená dokumentácia integrácie bezpečnosti Entra ID

## 11. jún 2025

### Počiatočné vytvorenie
- Uvoľnená prvá verzia kurikula MCP pre začiatočníkov
- Vytvorená základná štruktúra pre všetkých 10 hlavných sekcií
- Implementovaná vizuálna mapa kurikula pre navigáciu
- Pridané úvodné vzorové projekty vo viacerých programovacích jazykoch

### Začíname (03-GettingStarted/)
- Vytvorené prvé príklady implementácie servera
- Pridané pokyny pre vývoj klienta
- Zaradené inštrukcie integrácie LLM klienta
- Pridaná dokumentácia integrácie VS Code
- Implementované príklady serverov s Server-Sent Events (SSE)

### Základné koncepty (01-CoreConcepts/)
- Pridané detailné vysvetlenie architektúry klient-server
- Vytvorená dokumentácia kľúčových protokolových komponentov
- Zdokumentované vzory správy správ v MCP

## 23. máj 2025

### Štruktúra repozitára
- Inicializovaný repozitár so základnou štruktúrou zložiek
- Vytvorené README súbory pre každú hlavnú sekciu
- Nastavená infraštruktúra pre preklady
- Pridané obrázkové zdroje a diagramy

### Dokumentácia
- Vytvorené počiatočné README.md s prehľadom kurikula
- Pridané súbory CODE_OF_CONDUCT.md a SECURITY.md
- Nastavený SUPPORT.md s pokynmi na získanie pomoci
- Vytvorená predbežná štruktúra študijného sprievodcu

## 15. apríl 2025

### Plánovanie a rámec
- Počiatočné plánovanie kurikula MCP pre začiatočníkov
- Definované vzdelávacie ciele a cieľová skupina
- Nacmarovaná 10-členná štruktúra kurikula
- Vypracovaný konceptuálny rámec pre príklady a prípadové štúdie
- Vytvorené počiatočné prototypové príklady kľúčových konceptov

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->