# Jurnal de modificări: Curricula MCP pentru Începători

Acest document servește drept înregistrare a tuturor modificărilor semnificative efectuate la curricula Model Context Protocol (MCP) pentru Începători. Modificările sunt documentate în ordine cronologică inversă (cele mai recente modificări primele).

## 2 iulie 2026

### Lecție nouă: Candidatul pentru lansare a specificației MCP din 2026-07-28

Adăugat conținut privind candidatul pentru lansare a specificației MCP din `2026-07-28` (anunțat la 21 mai 2026; lansare finală programată pentru 28 iulie 2026), rezumat din [postarea oficială de blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Baza curricula rămâne **Specificatia MCP 2025-11-25** până la lansarea noii versiuni, astfel încât aceasta este prezentată drept o perspectivă orientată spre viitor, nu o rescriere a lecțiilor existente.

- **Nou**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — o lecție completă ce acoperă nucleul protocolului fără stare (eliminarea 'initialize' handshake și a `Mcp-Session-Id`), noile antete de rutare `Mcp-Method`/`Mcp-Name`, metadatele de caching `ttlMs`/`cacheScope`, W3C Trace Context în `_meta`, cadrul formal Extensions (MCP Apps și noua extensie Tasks), șase SEPs pentru întărirea autorizării, deprecierea Roots/Sampling/Logging, și trecerea la schema JSON Schema 2020-12 completă pentru schemele de unelte.
- **Actualizat** cu mențiuni orientate spre viitor ce leagă lecția nouă:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): notă versiune protocol, secțiunile Sampling/Roots/Logging/Tasks și "Ce urmează"
  - [02-Security/README.md](./02-Security/README.md): mențiune despre întărirea autorizărilor
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): mențiune despre transportul fără stare
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): mențiune despre deprecierea Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): mențiune despre deprecierea Logging și extensia Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): mențiune despre protocoalele fără stare/rutare sesiune
  - [README.md](./README.md): notă „Privind spre viitor” în secțiunea specificației și o nouă intrare `1.1` în tabelul de module ale curricula
  - [study_guide.md](./study_guide.md): punct orientat spre viitor sub prezentarea generală Core Concepts și o notă adăugată datată
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): mențiune despre `mcp-session-id` în transport înaintea modelului fără stare al cererii
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): mențiune privind deprecierea Root Contexts/Sampling și extensia Tasks în prezentarea modulului
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security.md): mențiune despre întărirea autorizărilor

## 24 iunie 2026

### Lecție nouă: Utilizarea MCP în aplicația Copilot

- [Secțiunea Tooling](./12-tooling/README.md) Adăugată secțiunea tooling.
- [MCP în aplicația Copilot](./12-tooling/01-copilot-app/README.md)

## 16 iunie 2026

### Alinierea specificației MCP & Validarea exemplului

Am validat curricula pe baza actualei **Specificatii MCP 2025-11-25** și a celor mai recente SDK-uri oficiale, apoi am corectat referințele învechite la specificație și am confirmat că exemplele principale încă se compilează și rulează.

#### Corectări versiune specificație (2025-06-18 / 2025-03-26 → 2025-11-25)

Am actualizat conținutul în limba engleză unde încă se susținea că o revizie mai veche a specificației este standardul *curent/ultimul*, și am redirecționat linkurile spre căile canonice `modelcontextprotocol.io` ale specificației:
- **05-AdvancedTopics/mcp-security/README.md**: Actualizat bannerul "Standardul Curent", introducerea, titlul principiilor de securitate de bază, cerințele obligatorii, secțiunea Microsoft Entra ID, linkurile Referințe & Resurse și notificarea de securitate finală (8 referințe) la 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Actualizat linkul resurselor suplimentare și bannerul "Standardul Curent" la 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Înlocuit linkul vechi `2025-03-26` despre securitate și încredere cu pagina actuală de bune practici pentru securitate 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Actualizat linkul oficial al documentației privind sampling-ul la 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Actualizat referința prezentă în timp real „specificația curentă MCP” și linkul către resursele suplimentare la 2025-11-25 (notițele istorice despre deprecierea SSE lăsate intacte pentru acuratețe)

#### Validarea exemplului față de SDK-urile curente

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` a rezolvat versiunea `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` a trecut fără erori de tip — API-urile existente `McpServer`/`StdioServerTransport` rămân valide
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validat într-un mediu izolat `.venv` cu `mcp[cli]` (1.27.2); `py_compile` a trecut, iar `FastMCP.list_tools()` a returnat corect uneltele `add` și `subtract`
- Confirmat că toate intervalele de versiuni `@modelcontextprotocol/sdk` din exemple (`>=1.26.0` / `^1.26.0` / `^1.27.0`) rezolvă curat la `1.29.0` curent fără schimbări rupătoare ale API-ului

#### Aliniere fixare dependențe (acoperirea decalajelor de versiuni)

Am ridicat versiunile vechi de pachete SDK astfel încât fiecare exemplu să urmărească lansarea curentă MCP, în conformitate cu convenția din întregul depozit:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Ridicat `@modelcontextprotocol/sdk` de la `^1.8.0` la `>=1.26.0` și actualizat descrierea pachetului invechit `"updated for MCP 2025-06-18"` la `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** și **lab4/code/github_mcp_server/pyproject.toml**: Ridicat pin-ul exact `mcp==1.23.0` la `mcp>=1.26.0`; regenerate ambele fișiere `uv.lock` (`uv lock`) astfel încât lockfile-urile să rezolve la `mcp 1.27.2` curent și să rămână sincronizate cu manifestele

#### Analiza lacunelor în curriculum — Acoperire ultime caracteristici specificație

Am verificat că curricula acoperă deja toate primitivele introduse/extinse în MCP 2025-11-25, deci nu mai există goluri de conținut rămase:
- **Sampling**: Lecția 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (incluzând modul URL)**: Documentat în 01-CoreConcepts și 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Documentat în 00-Introduction, 01-CoreConcepts și 05-AdvancedTopics/mcp-root-contexts
- **Tasks (operațiuni experimentale de lungă durată)**: Documentat în 01-CoreConcepts și 05-AdvancedTopics/mcp-protocol-features
- **Anotări pentru unelte** (`readOnlyHint` / `destructiveHint`): Documentate în 01-CoreConcepts și 05-AdvancedTopics/mcp-protocol-features

### Întărire securitate & Remedierea vulnerabilităților la nivel de dependențe

Am realizat o analiză completă de securitate pentru fiecare manifest de dependențe și codul sursă al exemplului, apoi am remediat toate avertismentele npm raportate și un aspect de securitate la nivel de cod. După remediere, `npm audit` raportează **0 vulnerabilități** în toate directoarele auditate.

#### Vulnerabilități la nivel de dependențe npm (tranzitive) — Remediate

Am auditat toate cele 15 fișiere `package-lock.json` comise. Vulnerabilitățile erau limitate la dependențele tranzitive aduse de instrumentul MCP Inspector pentru dezvoltatori, clientul OpenAI și SDK MCP; toate sunt acum rezolvate fără a afecta exemplele:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** și **lab3/code/weather_mcp/inspector**: Ridicat `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), ceea ce a eliminat avertismentele pentru pachetele incluse `ajv`, `brace-expansion`, `diff`, `path-to-regexp` și `ws`. Adăugat o intrare `overrides` în npm care forțează patch-ul `shell-quote@1.8.4` pentru a elimina avertismentul critic rămas adus de `concurrently`; regenerate ambele lockfile-uri (acum 0 vulnerabilități)
- **03-GettingStarted/samples/typescript**: `npm audit fix` a actualizat `qs` tranzitiv (moderată) la o versiune patch-uită
- **03-GettingStarted/samples/javascript**: `npm audit fix` a actualizat `hono` tranzitiv (moderată) la o versiune patch-uită
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` a actualizat `form-data` tranzitiv (ridicată) la o versiune patch-uită
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generat `package-lock.json` lipsă astfel încât proiectul să fie reproductibil și auditat (0 vulnerabilități)

#### Remediere de securitate la nivel de cod (OWASP A03: Injecție)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Eliminat `shell=True` din unealta `open_in_vscode`. Comanda anterioară `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitea interpretarea de metacaractere shell în calea folderului de către `cmd.exe` (vector de injecție de comandă). Acum se lansează direct `Code.exe` rezolvat cu folderul ca argument — fără shell — ceea ce este echivalent funcțional și sigur

#### Audit dependențe Python

- Auditat toate seturile Python requirements cu `pip-audit`. `05-AdvancedTopics` și `03-GettingStarted/samples/python` au raportat **nici o vulnerabilitate cunoscută** (intervalele lor `mcp` / `httpx` / `pydantic` / `python-dotenv` rezolvă la lansări patch-uite curente)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` a detectat dependența tranzitivă **`werkzeug` 3.1.1** cu trei avertismente de DoS (safe_join) la dispozitive Windows — `CVE-2025-66221`, `CVE-2026-21860` și `CVE-2026-27199` (toate remediate în 3.1.6). Adăugat un pin explicit de securitate `werkzeug>=3.1.6` pentru a se rezolva versiunea patch-uită; verificat că restricția se rezolvă curat cu stiva `chainlit` / `mcp` / `semantic-kernel`

### Rebranding nume produs

Actualizat tot conținutul curriculumului pentru a reflecta rebrandingul produselor Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Actualizat linkul comunității Discord
- **AGENTS.md**: Actualizat referința serverului Discord
- **README.md**: Actualizate referințele la ecosistemul tehnologic
- **study_guide.md**: Actualizate referințele studiului de caz
- **05-AdvancedTopics/README.md**: Actualizat titlul și descrierea Modulului 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Actualizat titlul secțiunii și descrierea
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Actualizare completă a titlului și conținutului modulului
- **05-AdvancedTopics/mcp-security-entra/README.md**: Actualizat linkul de referință încrucișată
- **07-LessonsfromEarlyAdoption/README.md**: Actualizate referințele studiului de caz
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Actualizat titlul Secțiunii 9, insignele și capabilitățile
- **08-BestPractices/README.md**: Actualizat linkul comunității Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Actualizat referința canalului Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Actualizat referința implementării modelului
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Actualizat tabelul Servicii AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Actualizate referințele resurselor

#### AI Toolkit / AITK → Extensia Microsoft Foundry Toolkit pentru VS Code

- **README.md**: Actualizate referințele principale din curriculum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Actualizat titlul modulului, prezentarea generală și toate antetele modulelor
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Actualizat titlul, obiectivele de învățare, instrucțiunile de configurare și resursele
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Actualizat titlul, obiectivele de învățare, tabelul hosturilor MCP și referințele încrucișate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Actualizat titlul, insignele, prerechizitele și resursele
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Actualizate referințele către Agent Builder și link-ul de feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Actualizate prerechizitele și referințele la extensii

---

## 11 aprilie 2026

### Lecție Nouă, Corecții de Documentație și Actualizări de Dependențe

#### Conținut Nou Adăugat în Curriculum

**Modul 05 - Subiecte Avansate**
- **Lecția 5.17: Raționament Adversarial Multi-Agent cu MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ghid nou și detaliat care acoperă modelul de dezbatere adversarială pentru sisteme multi-agent
  - Diagramă arhitecturală Mermaid: doi agenți → server MCP comun → transcriere dezbatere → judecător → verdict
  - Server comun web_search + run_python implementat în Python și TypeScript
  - Prompts sistem opoziție (PENTRU / CONTRA / Judecător) cu cerințe explicite de folosire a instrumentelor
  - Orchestrator de dezbatere în Python, TypeScript și C# care gestionează rundele și direcționarea argumentelor
  - Conectare `ClientSession` MCP pentru orchestrator către apeluri reale de unelte
  - Tabel de cazuri de utilizare (detecție halucinații, modelare amenințări, revizuire design API, verificare factuală, selecție tehnologie)
  - Considerații de securitate: execuție sandbox, validarea apelurilor de unelte, limitare rată, jurnalizare audit
  - Exercițiu structurat cu trei scenarii practice (revizuire cod, decizie arhitecturală, moderare conținut)

#### Corecții de Documentație

**Modul 03 - Începător**
- **05-stdio-server/README.md**: Corectat exemplul incomplet pentru server stdio TypeScript — adăugată instanțierea transportului lipsă (`new StdioServerTransport()`) și apelul `server.connect(transport)` pentru a fi aliniat cu exemplele Python și .NET din aceeași secțiune
- **14-sampling/README.md**: Corectat typo — corectat `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Actualizări Curriculum

**README.md Principal**
- Adăugat intrare 5.17 (Raționament Adversarial Multi-Agent cu MCP) în tabelul curriculumului cu link direct către lecția nouă

**05-AdvancedTopics/README.md**
- Adăugat rândul Lecția 5.17 în tabelul lecțiilor

**study_guide.md**
- Adăugat subiectul Raționament Adversarial Multi-Agent în harta mentală și descrierea în proză a Subiectelor Avansate

#### Corecții de Cod și Securitate

**Modul 05 - Agenți Adversariale (`mcp-adversarial-agents`)**
- **Corecție de securitate — injecție comandă**: Înlocuit interpolarea shell `execSync` cu `execFile` + `promisify` în unealta TypeScript `run_python`, eliminând suprafața de injecție a comenzii (codul controlat de LLM acum este transmis ca element literal argv fără implicare shell)
- **Legarea loop-ului unealtelor MCP**: Actualizat orchestratorul de dezbatere Python să folosească clientul `AsyncAnthropic` (în loc de `Anthropic` sincron blocant), să treacă live `ClientSession` direct fiecărei runde agent, să preia definițiile uneltelor prin `session.list_tools()` la fiecare rundă, și să emită blocuri `tool_use` prin `session.call_tool()` într-un loop până când modelul emite un răspuns text final

#### Actualizări ale Dependențelor

- Actualizat `hono` la 4.12.12 pe mai multe pachete (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Actualizat `@hono/node-server` de la 1.19.11 la 1.19.13 în pachetele TypeScript
- Actualizat `cryptography` de la 46.0.5 la 46.0.7 în pachetele Python (laboratoarele 3 și 4 din 10-StreamliningAIWorkflows)
- Actualizat `lodash` de la 4.17.23 la 4.18.1 în inspectorul 10-StreamliningAIWorkflows

#### Traduceri

- Sincronizat traducerile pentru peste 48 de limbi cu cele mai recente modificări sursă (actualizare i18n)

---

## 5 februarie 2026

### Îmbunătățiri la nivel de Repozitoriu privind Validarea și Navigarea

#### Conținut Nou Adăugat în Curriculum

**Modul 03 - Începător**
- **12-mcp-hosts/README.md**: Ghid nou detaliat pentru configurarea hosturilor MCP
  - Exemple de configurare pentru Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Șabloane JSON de configurare pentru toți hosturile principali
  - Tabel comparativ al tipurilor de transport (stdio, SSE/HTTP, WebSocket)
  - Depanarea problemelor comune de conexiune
  - Best practice-uri de securitate pentru configurarea hosturilor

- **13-mcp-inspector/README.md**: Ghid nou de depanare pentru MCP Inspector
  - Metode de instalare (npx, npm global, din sursă)
  - Conectarea la servere prin stdio și HTTP/SSE
  - Testarea uneltelor, resurselor și fluxurilor de lucru cu prompts
  - Integrare VS Code cu MCP Inspector
  - Scenarii comune de depanare cu soluții

**Modul 04 - Implementare Practică**
- **pagination/README.md**: Ghid nou de implementare pentru paginare
  - Modele de paginare bazate pe cursor în Python, TypeScript, Java
  - Gestionarea paginării pe partea clientului
  - Strategii de design pentru cursor (opac vs. structurat)
  - Recomandări pentru optimizarea performanței

**Modul 05 - Subiecte Avansate**
- **mcp-protocol-features/README.md**: Explorație detaliată a noului protocol
  - Implementarea notificărilor de progres
  - Modele pentru anularea cererilor
  - Șabloane de resurse cu modele URI
  - Gestionarea ciclului de viață al serverului
  - Controlul nivelului de jurnalizare
  - Modele de tratare a erorilor cu coduri JSON-RPC

#### Corecții de Navigare (24+ fișiere actualizate)

**README-urile modulului principal**
 Acum conțin linkuri către prima lecție ȘI modulul următor

**Sub-fișierele 02-Security**
- Toate cele 5 documente suplimentare de securitate au acum secțiunea de navigare „Ce Urmează”:

**Fișiere 09-CaseStudy**
- Toate fișierele studiilor de caz au acum navigare secvențială:

**Laboratoarele 10-StreamliningAI**
Adăugată secțiunea Ce Urmează în prezentarea generală a Modulului 10 și Modulului 11

#### Corecții de Cod și Conținut

**Actualizări SDK și Dependențe**
Corectată versiunea openai goală la `^4.95.0`
Actualizat SDK de la `^1.8.0` la `>=1.26.0`
Actualizate versiuni fixate mcp la `>=1.26.0`

**Corecții de Cod**
Corectat model invalid `gpt-4o-mini` la `gpt-4.1-mini`

**Corecții de Conținut**
Corectat link spart `READMEmd` → `README.md`, corectat antet curriculum `Module 1-3` → `Module 0-3`, corectat calea cu sensibilitate la majuscule
Eliminat conținut duplicat corupt la Studiul de caz 5

**Îmbunătățiri pentru Îndrumarea Începătorilor**
Adăugat introducere adecvată, obiective de învățare și prerechizite pentru începători

#### Actualizări Curriculum

**README.md Principal**
- Adăugate intrări 3.12 (Hosturi MCP), 3.13 (Inspector MCP), 4.1 (Paginare), 5.16 (Caracteristici Protocol) în tabelul curriculumului

**README-urile Modulului**
Adăugate lecțiile 12 și 13 în lista lecțiilor
Adăugată secțiunea Ghiduri Practice cu link către paginare
Adăugate lecțiile 5.15 (Transport Personalizat) și 5.16 (Caracteristici Protocol)

**study_guide.md**
- Actualizată harta mentală cu toate subiectele noi: Configurarea Hosturilor MCP, Inspector MCP, Strategii de Paginare, Explorație Caracteristici Protocol

## 28 ianuarie 2026

### Revizuirea Conformității Specificației MCP 2025-11-25

#### Îmbunătățirea Conceptelor de Bază (01-CoreConcepts/)
- **Noua Primitive Client - Roots**: Adăugată documentație detaliată despre primitiva client Roots, permițând serverelor să înțeleagă limitele sistemului de fișiere și permisiunile de acces
- **Anotări pentru Unelte**: Adăugat documentație privind anotările comportamentale pentru unelte (`readOnlyHint`, `destructiveHint`) pentru decizii mai bune privind execuția uneltelor
- **Apelarea Uneltelor în Sampling**: Actualizată documentația Sampling pentru a include parametrii `tools` și `toolChoice` pentru invocarea uneltelor comandată de model în timpul cererilor de sampling
- **Elicitație Mod URL**: Adăugat documentație pentru elicitația bazată pe URL pentru interacțiuni externe inițiate de server pe web
- **Taskuri (Experimentale)**: Adăugată secțiune nouă documentând funcționalitatea experimentală Tasks pentru înfolieri de execuție durabilă și recuperare amânată a rezultatelor
- **Suport pentru Icoane**: Notat că uneltele, resursele, șabloanele de resurse și prompts pot include acum icoane ca metadate suplimentare

#### Actualizări Documentație
- **README.md**: Adăugată referință la versiunea Specificației MCP 2025-11-25 și explicație asupra versionării bazate pe dată
- **study_guide.md**: Actualizată harta curriculumului pentru a include Taskuri și Anotări pentru Unelte în secțiunea Conceptelor de Bază; actualizat timestamp-ul documentului

#### Verificarea Conformității Specificației
- **Versiunea Protocolului**: Verificat ca toate referințele din documentație să corespundă cu Specificația MCP 2025-11-25
- **Alinierea Arhitecturii**: Confirmată acuratețea documentației pentru arhitectura în două straturi (Stratul de Date + Stratul de Transport)
- **Documentația Primitivelor**: Validat primitivele serverului (Resurse, Prompturi, Unelte) și primitivele clientului (Sampling, Elicitație, Jurnalizare, Roots)
- **Mecanismele de Transport**: Verificată acuratețea documentației pentru transport STDIO și Streaming HTTP
- **Ghid Securitate**: Confirmată alinierea cu cele mai bune practici actuale MCP Security

#### Funcționalități Cheie MCP 2025-11-25 Documentate
- **Descoperire OpenID Connect**: Descoperire server autentificare prin OIDC
- **Documente Metadata Client OAuth ID**: Mecanism recomandat de înregistrare client
- **JSON Schema 2020-12**: Dialect implicit pentru definiții schema MCP
- **Sistem Stratifcare SDK**: Formalizate cerințele pentru suport și întreținere funcționalități SDK
- **Structura Guvernanței**: Formalizate Grupuri de Lucru și Grupuri de Interes în guvernanța MCP

### Actualizare Majoră Documentație Securitate (02-Security/)

#### Integrare MCP Security Summit Workshop (Sherpa)
- **Nouă Resursă de Training Practic**: Adăugat integrare detaliată cu [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) în toate documentele de securitate
- **Acoperire Ruta Expediției**: Documentat progresul complet de la Base Camp la Summit
- **Aliniere OWASP**: Toate ghidurile de securitate mapate acum la riscurile OWASP MCP Azure Security Guide

#### Integrare OWASP MCP Top 10
- **Secțiune Nouă**: Adăugat tabel cu riscurile top 10 OWASP MCP cu mitigări Azure pentru README securitate principal
- **Documentație Bazată-pe-Risc**: Actualizat mcp-security-controls-2025.md cu referințe la riscurile OWASP MCP pentru fiecare domeniu de securitate
- **Arhitectură de Referință**: Link către arhitectura de referință și modele de implementare din OWASP MCP Azure Security Guide

#### Fișiere de Securitate Actualizate
- **README.md**: Adăugat prezentare Sherpa Workshop, tabel rută expediție, sumar riscuri OWASP MCP Top 10, și secțiune training practic
- **mcp-security-controls-2025.md**: Actualizat antet la februarie 2026, adăugat referințe riscuri OWASP (MCP01-MCP08), corectată inconsistență versiune spec
- **mcp-security-best-practices-2025.md**: Adăugată secțiune resurse Sherpa și OWASP, actualizat timestamp
- **mcp-best-practices.md**: Adăugată secțiune training practic cu linkuri Sherpa și OWASP
- **azure-content-safety-implementation.md**: Adăugat referință OWASP MCP06, aliniere Sherpa Camp 3, și secțiune resurse suplimentare

#### Linkuri Noi către Resurse Adăugate
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Pagini individuale OWASP MCP riscuri (MCP01-MCP10)

### Alinierea Specificației MCP 2025-11-25 la Întreg Curriculumul

#### Modul 03 - Începător
- **Documentație SDK**: Adăugat SDK Go în lista oficială SDK; actualizate toate referințele SDK să corespundă cu Specificația MCP 2025-11-25
- **Clarificarea Transportului**: Actualizate descrierile pentru transporturile STDIO și HTTP Streaming cu referințe explicite la specificație

#### Modul 04 - Implementare Practică
- **Actualizări SDK**: Adăugat SDK Go; actualizată lista SDK cu referință la versiunea specificației
- **Specificația Autorizației**: Actualizat link-ul către specificația MCP Autorizație la versiunea curentă 2025-11-25

#### Modul 05 - Subiecte Avansate
- **Funcționalități Noi**: Adăugat notă despre noile funcționalități MCP Specificația 2025-11-25 (Taskuri, Anotări pentru Unelte, Elicitație Mod URL, Roots)
- **Resurse de Securitate**: Adăugat linkuri către OWASP MCP Top 10 și workshop Sherpa ca referințe suplimentare

#### Modul 06 - Contribuții Comunitare
- **Lista SDK**: Adăugate SDK-urile Swift și Rust; actualizat link-ul specificației la 2025-11-25
- **Referință Spec**: Actualizat link-ul specificației MCP la URL-ul direct al specificației

#### Modul 07 - Lecții din Primele Adaptări

- **Actualizări Resurse**: Adăugat link către MCP Specification 2025-11-25 și OWASP MCP Top 10 în resurse suplimentare

#### Modulul 08 - Cele Mai Bune Practici
- **Versiune Spec**: Referința MCP Specification actualizată la 2025-11-25
- **Resurse Securitate**: Adăugat OWASP MCP Top 10 și workshop Sherpa în referințe suplimentare

#### Modulul 10 - Optimizarea Fluxurilor de Lucru AI
- **Actualizare Badge**: Schimbat badge versiune MCP de la versiunea SDK (1.9.3) la versiunea specificației (2025-11-25)
- **Linkuri Resurse**: Actualizat link MCP Specification; adăugat OWASP MCP Top 10

#### Modulul 11 - Laboratoare Practice Server MCP
- **Referință Spec**: Actualizat link MCP Specification la versiunea 2025-11-25
- **Resurse Securitate**: Adăugat OWASP MCP Top 10 în resursele oficiale

## 18 Decembrie 2025

### Actualizare Documentație Securitate - MCP Specification 2025-11-25

#### Cele Mai Bune Practici pentru Securitatea MCP (02-Security/mcp-best-practices.md) - Actualizare Versiune Specificație
- **Actualizare Versiune Protocol**: Actualizat pentru a face referire la cea mai recentă MCP Specification 2025-11-25 (lansată pe 25 Noiembrie 2025)
  - Actualizate toate referințele versiunii specificației de la 2025-06-18 la 2025-11-25
  - Actualizate referințele datelor documentului de la 18 August 2025 la 18 Decembrie 2025
  - Verificate toate URL-urile specificației să indice către documentația curentă
- **Validarea Conținutului**: Validare cuprinzătoare a celor mai bune practici de securitate conform celor mai recente standarde
  - **Soluții Microsoft de Securitate**: Verificat termenii și link-urile actuale pentru Prompt Shields (previamente "detectarea riscului Jailbreak"), Azure Content Safety, Microsoft Entra ID și Azure Key Vault
  - **Securitate OAuth 2.1**: Confirmată alinierea cu cele mai recente bune practici de securitate OAuth
  - **Standardele OWASP**: Validat că referințele OWASP Top 10 pentru LLM-uri sunt actuale
  - **Servicii Azure**: Verificat toate link-urile documentației Microsoft Azure și bune practici
- **Alinierea Standardelor**: Toate standardele de securitate referențiate confirmate ca fiind actuale
  - Cadrul NIST de Gestionare a Riscurilor AI
  - ISO 27001:2022
  - Cele Mai Bune Practici de Securitate OAuth 2.1
  - Cadrele de securitate și conformitate Azure
- **Resurse Implementare**: Verificat toate link-urile și resursele ghidurilor de implementare
  - Pattern-uri de autentificare Azure API Management
  - Ghiduri de integrare Microsoft Entra ID
  - Managementul secretelor Azure Key Vault
  - Pipeline-uri DevSecOps și soluții de monitorizare

### Asigurarea Calității Documentației
- **Conformitate Specificație**: Asigurat conformitatea tuturor cerințelor de securitate MCP obligatorii (TREBUIE/Nu TREBUIE) cu ultima specificație
- **Actualizare Resurse**: Verificat toate link-urile externe către documentația Microsoft, standardele de securitate și ghidurile de implementare
- **Acoperire Cele Mai Bune Practici**: Confirmată acoperirea completă a autentificării, autorizării, amenințărilor specifice AI, securității lanțului de aprovizionare și pattern-urilor enterprise

## 6 Octombrie 2025

### Extinderea Secțiunii Introducere – Utilizarea Avansată a Serverului & Autentificare Simplă

#### Utilizarea Avansată a Serverului (03-GettingStarted/10-advanced)
- **Capitol Nou Adăugat**: Introducere a unui ghid cuprinzător pentru utilizarea avansată a serverului MCP, acoperind atât arhitecturile server normale cât și cele la nivel scăzut.
  - **Server Normal vs. Nivel Scăzut**: Comparație detaliată și exemple de cod în Python și TypeScript pentru ambele abordări.
  - **Design bazat pe Handler**: Explicație a gestionării instrumentelor/resurselor/prompturilor bazate pe handler pentru implementări scalabile și flexibile ale serverului.
  - **Patrone Practice**: Scenarii reale unde pattern-urile server la nivel scăzut sunt benefice pentru funcționalități și arhitecturi avansate.

#### Autentificare Simplă (03-GettingStarted/11-simple-auth)
- **Capitol Nou Adăugat**: Ghid pas cu pas pentru implementarea autentificării simple în serverele MCP.
  - **Concepte de Autentificare**: Explicație clară a diferenței dintre autentificare și autorizare, și managementul credentialelor.
  - **Implementare Autentificare Basic**: Pattern-uri de autentificare bazate pe middleware în Python (Starlette) și TypeScript (Express), cu exemple de cod.
  - **Progresie către Securitate Avansată**: Ghidare pentru începerea cu autentificare simplă și avansarea spre OAuth 2.1 și RBAC, cu referințe la module de securitate avansate.

Aceste adăugiri oferă ghidare practică, hands-on, pentru construirea de implementări MCP server mai robuste, sigure și flexibile, realizând puntea între concepte fundamentale și pattern-uri avansate de producție.

## 29 Septembrie 2025

### Laboratoare Integrare Bază de Date MCP Server - Parcurs Complet Hands-On

#### 11-MCPServerHandsOnLabs - Curriculum complet pentru integrarea bazei de date
- **Parcurs de Învățare Complet cu 13 Laboratoare**: Adăugat curriculum hands-on cuprinzător pentru construirea serverelor MCP gata de producție cu integrare în baza de date PostgreSQL
  - **Implementare din Lumea Reală**: Caz de utilizare Zava Retail analytics demonstrând pattern-uri de nivel enterprise
  - **Progresie Învățare Structurată**:
    - **Laboratoare 00-03: Fundamente** - Introducere, Arhitectură de Bază, Securitate & Multi-Tenancy, Configurare Mediu
    - **Laboratoare 04-06: Construirea Serverului MCP** - Design și Schema Bazei de Date, Implementare MCP Server, Dezvoltare Instrumente  
    - **Laboratoare 07-09: Funcționalități Avansate** - Integrare căutare semantică, Testare & Debugging, Integrare VS Code
    - **Laboratoare 10-12: Producție & Cele Mai Bune Practici** - Strategii de Deploy, Monitorizare & Observabilitate, Optimizare și Best Practices
  - **Tehnologii Enterprise**: Framework FastMCP, PostgreSQL cu pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Funcționalități Avansate**: Securitate la nivel de linie (RLS), căutare semantică, acces multi-chiriaș, vector embeddings, monitorizare în timp real

#### Standardizare Terminologie - Conversie Modul la Laborator
- **Actualizare Cuprinzătoare Documentație**: Actualizate sistematic toate fișierele README în 11-MCPServerHandsOnLabs pentru a folosi terminologia "Laborator" în loc de "Modul"
  - **Antete Secțiuni**: Modificat "Ce Acoperă Acest Modul" în "Ce Acoperă Acest Laborator" în toate cele 13 laboratoare
  - **Descriere Conținut**: Schimbat "Acest modul oferă..." în "Acest laborator oferă..." în toată documentația
  - **Obiective de Învățare**: Modificat "La sfârșitul acestui modul..." în "La sfârșitul acestui laborator..."
  - **Linkuri de Navigare**: Convertit toate referințele "Modul XX:" în "Laborator XX:" în referințele încrucișate și navigare
  - **Urmărire Finalizare**: Modificat "După finalizarea acestui modul..." în "După finalizarea acestui laborator..."
  - **Referințe Tehnice Păstrate**: Menținute referințele modul Python în fișiere de configurare (ex. `"module": "mcp_server.main"`)

#### Îmbunătățiri Ghid de Studiu (study_guide.md)
- **Hartă Vizuală Curriculum**: Adăugat noua secțiune "11. Laboratoare Integrare Bază de Date" cu vizualizare completă a structurii laboratorului
- **Structura Repozitoriu**: Actualizat de la zece la unsprezece secțiuni principale cu descriere detaliată 11-MCPServerHandsOnLabs
- **Ghidare Parcurs Învățare**: Îmbunătățit instrucțiunile de navigare pentru secțiunile 00-11
- **Acoperire Tehnologică**: Adăugat detalii despre FastMCP, PostgreSQL, și integrarea serviciilor Azure
- **Rezultate Învățare**: Subliniat dezvoltarea serverelor gata de producție, pattern-uri integrare bazei de date și securitate enterprise

#### Îmbunătățiri Structură README Principal
- **Terminologie Bazată pe Laboratoare**: Actualizat README.md principal în 11-MCPServerHandsOnLabs să utilizeze constant structura "Laborator"
- **Organizare Parcurs Învățare**: Progresie clară de la concepte fundamentale la implementare avansată și deploy în producție
- **Focalizare În Lumea Reală**: Accent pe învățare practică cu pattern-uri și tehnologii enterprise

### Îmbunătățiri Calitate & Consistență Documentație
- **Accent Pe Învațare Practică**: Consolidat abordarea hands-on bazată pe laboratoare în toată documentația
- **Focalizare Pattern-uri Enterprise**: Evidențiat implementări gata de producție și considerente de securitate enterprise
- **Integrare Tehnologii**: Acoperire completă a serviciilor Azure moderne și pattern-uri integrare AI
- **Progresie Învățare**: Parcurs clar și structurat de la concepte de bază la deploy în producție

## 26 Septembrie 2025

### Îmbunătățiri Studii de Caz - Integrare GitHub MCP Registry

#### Studii de Caz (09-CaseStudy/) - Focalizare Dezvoltare Ecosistem
- **README.md**: Extindere majoră cu studiu de caz cuprinzător asupra GitHub MCP Registry
  - **Studiu de Caz GitHub MCP Registry**: Studii de caz detaliate despre lansarea GitHub MCP Registry în Septembrie 2025
    - **Analiză Problemă**: Examinare detaliată a fragmentării descoperirii și implementării server MCP
    - **Arhitectura Soluției**: Abordarea registrului centralizat GitHub cu instalare cu un singur clic în VS Code
    - **Impact de Afaceri**: Îmbunătățiri măsurabile în onboarding-ul dezvoltatorilor și productivitate
    - **Valoare Strategică**: Accent pe implementarea modulară a agenților și interoperabilitatea între unelte
    - **Dezvoltare Ecosistem**: Poziționarea ca platformă fundamentală pentru integrarea agentică
  - **Structură Îmbunătățită a Studiului de Caz**: Actualizate toate cele șapte studii de caz cu format uniform și descrieri cuprinzătoare
    - Agenți Azure AI Travel: Accent pe orchestrare multi-agent
    - Integrare Azure DevOps: Focalizare pe automatizarea fluxului de lucru
    - Preluare Documentație în Timp Real: Implementare client consolă Python
    - Generator Plan de Studiu Interactiv: Aplicație web conversațională Chainlit
    - Documentație în-editor: Integrare VS Code și GitHub Copilot
    - Azure API Management: Pattern-uri de integrare API enterprise
    - GitHub MCP Registry: Dezvoltarea ecosistemului și platforma comunității
  - **Concluzie Cuprinzătoare**: Secțiunea concluzie rescrisă evidențiind cele șapte studii de caz care acoperă multiple dimensiuni de implementare MCP
    - Integrarea enterprise, Orchestrare Multi-Agent, Productivitate dezvolatorscă
    - Dezvoltare Ecosistem, categorii pentru aplicații educaționale
    - Perspective îmbunătățite privind pattern-uri arhitecturale, strategii implementare și bune practici
    - Accent pe MCP ca protocol matur și gata de producție

#### Actualizări Ghid de Studiu (study_guide.md)
- **Hartă Vizuală Curriculum**: Actualizat mindmap-ul să includă GitHub MCP Registry în secțiunea Studii de Caz
- **Descriere Studii de Caz**: Îmbunătățită de la descrieri generice la defalcări detaliate ale celor șapte studii de caz cuprinzătoare
- **Structura Repozitoriu**: Actualizat secțiunea 10 pentru a reflecta acoperirea completă a studiilor de caz cu detalii specifice implementării
- **Integrare Changelog**: Adăugat intrarea din 26 Septembrie 2025 documentând adăugarea GitHub MCP Registry și îmbunătățirile studiilor de caz
- **Actualizări Date**: Actualizat timestamp-ul din footer pentru a reflecta ultima revizie (26 Septembrie 2025)

### Îmbunătățiri Calitate Documentație
- **Îmbunătățire Consistență**: Standardizat formatul și structura studiilor de caz în toate cele șapte exemple
- **Acoperire Comprehensivă**: Studiile de caz acoperă acum scenarii enterprise, productivitate dezvoltatori și dezvoltare ecosistem
- **Poziționare Strategică**: Accent sporit pe MCP ca platformă fundamentală pentru implementarea sistemelor agentice
- **Integrare Resurse**: Actualizate resurse suplimentare pentru a include link GitHub MCP Registry

## 15 Septembrie 2025

### Extinderea Subiectelor Avansate - Transporturi Personalizate & Ingineria Contextului

#### Transporturi Personalizate MCP (05-AdvancedTopics/mcp-transport/) - Ghid Nou Implementare Avansată
- **README.md**: Ghid complet de implementare pentru mecanisme personalizate de transport MCP
  - **Transport Azure Event Grid**: Implementare completă de transport serverless bazat pe evenimente
    - Exemple în C#, TypeScript și Python cu integrare Azure Functions
    - Pattern-uri arhitecturale bazate pe event-driven pentru soluții MCP scalabile
    - Receptori webhook și gestionarea mesajelor push
  - **Transport Azure Event Hubs**: Implementare transport streaming cu volum mare
    - Capacități streaming în timp real pentru scenarii cu latență redusă
    - Strategii de partiționare și management checkpoint
    - Grupare mesaje și optimizare performanță
  - **Pattern-uri Integrare Enterprise**: Exemple arhitecturale gata de producție
    - Procesare MCP distribuită pe mai multe Azure Functions
    - Arhitecturi hibride de transport combinând mai multe tipuri de transport
    - Durabilitate mesaj, fiabilitate și strategii de gestionare a erorilor
  - **Securitate & Monitorizare**: Integrare Azure Key Vault și pattern-uri de observabilitate
    - Autentificare identitate gestionată și acces cu privilegiu minim
    - Telemetrie Application Insights și monitorizare performanță
    - Pattern-uri circuit breaker și toleranță la defecte
  - **Framework-uri Testare**: Strategii cuprinzătoare de testare pentru transporturi personalizate
    - Testare unitară cu dubluri și mock frameworks
    - Testare integrată cu Azure Test Containers
    - Considerații pentru testare performanță și încărcare

#### Ingineria Contextului (05-AdvancedTopics/mcp-contextengineering/) - Disciplină Emergentă AI
- **README.md**: Explorare cuprinzătoare a ingineriei contextului ca domeniu emergent
  - **Principii de Bază**: Partajarea completă a contextului, conștientizarea deciziei de acțiune și managementul ferestrei de context
  - **Aliniere Protocol MCP**: Cum designul MCP abordează provocările ingineriei contextului
    - Limitări ferestre de context și strategii de încărcare progresivă
    - Determinarea relevanței și preluare dinamică a contextului
    - Gestionare multi-modală a contextului și considerente de securitate
  - **Abordări Implementare**: Arhitecturi single-threaded vs. multi-agent
    - Tehnici de fragmentare și prioritizare a contextului
    - Încărcare progresivă a contextului și strategii de comprimare
    - Abordări stratificate ale contextului și optimizarea preluării
  - **Cadru de Măsurare**: Metrici emergente pentru evaluarea eficacității contextului
    - Eficiența inputului, performanță, calitate și experiență utilizator
    - Abordări experimentale pentru optimizarea contextului
    - Analiză eșec și metodologii îmbunătățire

#### Actualizări Navigare Curriculum (README.md)
- **Structură Modul Îmbunătățită**: Actualizată masa curriculară pentru a include noile subiecte avansate
  - Adăugate intrări pentru Ingineria Contextului (5.14) și Transport Personalizat (5.15)
  - Format consistent și linkuri de navigare în toate modulele
  - Descrieri actualizate reflectând domeniul actual al conținutului

### Îmbunătățiri Structură Director
- **Standardizare Denumiri**: Redenumit "mcp transport" în "mcp-transport" pentru consistență cu celelalte foldere de subiecte avansate
- **Organizare Conținut**: Toate folderele 05-AdvancedTopics urmează acum modelul de denumire consistent (mcp-[topic])

### Îmbunătățiri Calitate Documentație
- **Aliniere MCP Specification**: Toate conținuturile noi fac referire la MCP Specification 2025-06-18 actuală
- **Exemple Multi-Limbaj**: Exemple de cod cuprinzătoare în C#, TypeScript și Python

- **Focalizare pe Întreprindere**: Modele gata pentru producție și integrare cu cloud Azure pe tot parcursul
- **Documentație Vizuală**: Diagrame Mermaid pentru vizualizarea arhitecturii și fluxului

## 18 august 2025

### Actualizare Complexă a Documentației - Standardele MCP 2025-06-18

#### Cele Mai Bune Practici de Securitate MCP (02-Security/) - Modernizare Completă
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Rescriere completă aliniată cu Specificația MCP 2025-06-18
  - **Cerințe Obligatorii**: Adăugate cerințe explicite MUST/MUST NOT din specificația oficială cu indicatori vizuali clari
  - **12 Practici de Securitate de Bază**: Restructurate de la listă de 15 puncte la domenii de securitate cuprinzătoare
    - Securitatea Tokenurilor & Autentificare cu integrare a furnizorului extern de identitate
    - Gestionarea Sesiunilor & Securitate Transport cu cerințe criptografice
    - Protecție Specifică AI cu integrare Microsoft Prompt Shields
    - Controlul Accesului & Permisiuni cu principiul privilegiului minim
    - Siguranța Conținutului & Monitorizare cu integrare Azure Content Safety
    - Securitatea Lanțului de Aprovizionare cu verificare cuprinzătoare a componentelor
    - Securitatea OAuth & Prevenirea Atacului Confused Deputy cu implementare PKCE
    - Răspuns și Recuperare în caz de Incidente cu capacități automatizate
    - Conformitate & Guvernanță cu aliniere la reglementări
    - Controale Avansate de Securitate cu arhitectură zero trust
    - Integrarea Ecosistemului Microsoft Security cu soluții cuprinzătoare
    - Evoluția Continuă a Securității cu practici adaptive
  - **Soluții Microsoft Security**: Ghid de integrare îmbunătățit pentru Prompt Shields, Azure Content Safety, Entra ID și GitHub Advanced Security
  - **Resurse pentru Implementare**: Linkuri categorisite cuprinzător pe Documentație Oficială MCP, Soluții Microsoft Security, Standarde de Securitate și Ghiduri de Implementare

#### Controale Avansate de Securitate (02-Security/) - Implementare Întreprindere
- **MCP-SECURITY-CONTROLS-2025.md**: Revizuire completă cu cadru de securitate la nivel de întreprindere
  - **9 Domenii Cuprinzătoare de Securitate**: Extins de la controale de bază la cadru detaliat enterprise
    - Autentificare & Autorizare Avansată cu integrare Microsoft Entra ID
    - Securitatea Tokenurilor & Controale Anti-Passthrough cu validare cuprinzătoare
    - Controale pentru Securitatea Sesiunii cu prevenirea deturnărilor
    - Controale Specifice pentru Securitatea AI cu prevenirea injecției de prompt și otrăvirii instrumentelor
    - Prevenirea Atacului Confused Deputy cu securitate proxy OAuth
    - Securitatea Execuției Instrumentelor cu sandboxing și izolare
    - Controale pentru Securitatea Lanțului de Aprovizionare cu verificare a dependențelor
    - Controale de Monitorizare & Detectare cu integrare SIEM
    - Răspuns și Recuperare în caz de Incidente cu capacități automatizate
  - **Exemple de Implementare**: Blocuri detaliate YAML de configurare și exemple de cod adăugate
  - **Integrarea Soluțiilor Microsoft**: Acoperire cuprinzătoare a serviciilor de securitate Azure, GitHub Advanced Security și gestionarea identității enterprise

#### Securitatea Temelor Avansate (05-AdvancedTopics/mcp-security/) - Implementare Gata pentru Producție
- **README.md**: Rescriere completă pentru implementarea securității la nivel enterprise
  - **Aliniere la Specificația Curentă**: Actualizat conform Specificației MCP 2025-06-18 cu cerințe obligatorii de securitate
  - **Autentificare Îmbunătățită**: Integrare Microsoft Entra ID cu exemple complete .NET și Java Spring Security
  - **Integrarea Securității AI**: Implementare Microsoft Prompt Shields și Azure Content Safety cu exemple detaliate Python
  - **Mitigare Avansată a Amenințărilor**: Exemple complete de implementare pentru
    - Prevenirea Atacului Confused Deputy cu PKCE și validarea consimțământului utilizatorului
    - Prevenirea Passtrough-ului de Tokenuri cu validare a audienței și gestionare sigură a tokenurilor
    - Prevenirea Deturnării Sesiunii cu legare criptografică și analiză comportamentală
  - **Integrarea Securității Enterprise**: Monitorizarea Azure Application Insights, conducte de detecție a amenințărilor și securitatea lanțului de aprovizionare
  - **Lista de Verificare pentru Implementare**: Control clar al cerințelor obligatorii vs. recomandate cu beneficii ale ecosistemului Microsoft Security

### Calitatea Documentației & Alinierea Standardelor
- **Referințe la Specificații**: Actualizate toate referințele la Specificația MCP curentă 2025-06-18
- **Ecosistemul Microsoft Security**: Ghid de integrare îmbunătățit în toate documentele de securitate
- **Implementare Practică**: Adăugate exemple detaliate de cod în .NET, Java și Python cu modele enterprise
- **Organizarea Resurselor**: Categorisire cuprinzătoare de documentație oficială, standarde de securitate și ghiduri de implementare
- **Indicatori Vizuali**: Marcaj clar al cerințelor obligatorii vs. practicilor recomandate


#### Conceptele de Bază (01-CoreConcepts/) - Modernizare Completă
- **Actualizare Versiune Protocol**: Actualizat să facă referire la Specificația MCP curentă 2025-06-18 cu versiune bazată pe dată (format YYYY-MM-DD)
- **Raționalizare Arhitectură**: Descrieri îmbunătățite ale gazdelor, clienților și serverelor pentru a reflecta modelele arhitecturale MCP curente
  - Gazdele clar definite acum ca aplicații AI care coordonează multiple conexiuni client MCP
  - Clienții descriși ca conectori de protocol menținând relații unu-la-unu cu serverele
  - Serverele îmbunătățite cu scenarii de implementare locală vs. la distanță
- **Restructurarea Primitive-urilor**: Renovare completă a primitive-urilor server și client
  - Primitive Server: Resurse (surse de date), Solicite (șabloane), Instrumente (funcții executabile) cu explicații și exemple detaliate
  - Primitive Client: Eșantionare (completări LLM), Solicitare (input utilizator), Jurnalizare (debugging/monitorizare)
  - Actualizate cu modele curente de metode pentru descoperire (`*/list`), preluare (`*/get`), și execuție (`*/call`)
- **Arhitectura Protocolului**: Model arhitectural cu două straturi introdus
  - Strat de Date: Fundament JSON-RPC 2.0 cu gestionarea ciclului de viață și primitive
  - Strat de Transport: STDIO (local) și HTTP Streamabil cu SSE (remote) ca mecanisme de transport
- **Cadrul de Securitate**: Principii cuprinzătoare de securitate inclusiv consimțământ explicit al utilizatorului, protecția datelor personale, siguranța execuției instrumentelor și securitatea stratului de transport
- **Modele de Comunicare**: Mesaje de protocol actualizate pentru a arăta fluxurile de inițializare, descoperire, execuție și notificare
- **Exemple de Cod**: Exemple multilingve reîmprospătate (.NET, Java, Python, JavaScript) pentru a reflecta modelele MCP SDK curente

#### Securitate (02-Security/) - Renovare Completă a Securității  
- **Aliniere la Standarde**: Aliniere completă cu cerințele de securitate ale Specificației MCP 2025-06-18
- **Evoluție Autentificare**: Documentată evoluția de la servere OAuth personalizate la delegarea furnizorului de identitate extern (Microsoft Entra ID)
- **Analiză Amenințări Specifice AI**: Acoperire îmbunătățită a vectorilor moderni de atac AI
  - Scenarii detaliate de atac prin injecție de prompt cu exemple din lumea reală
  - Mecanisme de otrăvire a instrumentelor și modele de atac "rug pull"
  - Otrăvire a ferestrei de context și atacuri de confuzie a modelului
- **Soluții Microsoft AI Security**: Acoperire cuprinzătoare a ecosistemului de securitate Microsoft
  - AI Prompt Shields cu detectare avansată, evidențiere și tehnici delimitatoare
  - Modele de integrare Azure Content Safety
  - GitHub Advanced Security pentru protecția lanțului de aprovizionare
- **Mitigare Avansată a Amenințărilor**: Controale detaliate de securitate pentru
  - Deturnarea sesiunii cu scenarii de atac specifice MCP și cerințe criptografice pentru ID-ul sesiunii
  - Probleme Confused Deputy în scenarii MCP proxy cu cerințe explicite de consimțământ
  - Vulnerabilități passtrough de token cu controale mandatorii de validare
- **Securitatea Lanțului de Aprovizionare**: Extindere a acoperirii lanțului de aprovizionare AI incluzând modele fundamentale, servicii de embedding, furnizori de context și API-uri terțe
- **Securitatea Fundamentelor**: Integrare îmbunătățită cu modele enterprise de securitate inclusiv arhitectură zero trust și ecosistemul Microsoft Security
- **Organizarea Resurselor**: Linkuri categorisite detaliat după tip (Documentație Oficială, Standarde, Cercetare, Soluții Microsoft, Ghiduri de Implementare)

### Îmbunătățiri ale Calității Documentației
- **Obiective de Învățare Structurate**: Îmbunătățite cu rezultate specifice și aplicabile
- **Referințe încrucișate**: Adăugate linkuri între subiecte conexe de securitate și concepte de bază
- **Informații Curente**: Actualizate toate referințele de dată și legăturile spre specificațiile curente
- **Ghiduri de Implementare**: Adăugate recomandări practice, specifice și aplicabile în ambele secțiuni

## 16 iulie 2025

### Îmbunătățiri README și Navigare
- Remodelare completă a navigării în curriculum în README.md
- Înlocuite etichetele `<details>` cu un format bazat pe tabele mai accesibil
- Creat opțiuni alternative de aspect în noul folder "alternative_layouts"
- Adăugate exemple de navigare de tip card, cu taburi și acordeon
- Actualizată secțiunea structurii depozitului pentru a include toate fișierele cele mai recente
- Îmbunătățită secțiunea "Cum să folosești acest curriculum" cu recomandări clare
- Actualizate linkurile specificațiilor MCP pentru a indica URL-urile corecte
- Adăugată secțiunea Ingineria Contextului (5.14) în structura curriculumului

### Actualizări ale Ghidului de Studiu
- Revizuit complet ghidul de studiu pentru aliniere cu structura depozitului curentă
- Adăugate secțiuni noi pentru Clienți și Instrumente MCP, și Servere MCP populare
- Actualizată Harta Vizuală a Curriculumului pentru a reflecta corect toate subiectele
- Îmbunătățite descrierile Temelor Avansate pentru a acoperi toate domeniile specializate
- Actualizată secțiunea Studiilor de Caz pentru a reflecta exemplele reale
- Adăugat acest jurnal cuprinzător de modificări

### Contribuții Comunitare (06-CommunityContributions/)
- Adăugate informații detaliate despre serverele MCP pentru generare de imagini
- Adăugată secțiune cuprinzătoare despre utilizarea Claude în VSCode
- Adăugate instrucțiuni pentru configurarea și utilizarea clientului terminal Cline
- Actualizată secțiunea clienților MCP pentru a include toate opțiunile populare
- Îmbunătățite exemplele de contribuție cu mostre de cod mai exacte

### Teme Avansate (05-AdvancedTopics/)
- Organizate toate folderele de subiecte specializate cu o denumire consistentă
- Adăugate materiale și exemple de inginerie a contextului
- Adăugată documentația integrării agentului Foundry
- Îmbunătățită documentația integrării securității Entra ID

## 11 iunie 2025

### Creare Inițială
- Lansată prima versiune a curriculumului MCP pentru Începători
- Creată structura de bază pentru toate cele 10 secțiuni principale
- Implementată Harta Vizuală a Curriculumului pentru navigare
- Adăugate proiecte de exemplu inițiale în mai multe limbaje de programare

### Începutul (03-GettingStarted/)
- Create primele exemple de implementare server
- Adăugate îndrumări pentru dezvoltarea clientului
- Incluse instrucțiuni pentru integrarea clientului LLM
- Adăugată documentația de integrare VS Code
- Implementate exemple de servere Server-Sent Events (SSE)

### Conceptele de Bază (01-CoreConcepts/)
- Adăugată explicație detaliată a arhitecturii client-server
- Creată documentația componentelor cheie ale protocolului
- Documentate modelele de mesagerie în MCP

## 23 mai 2025

### Structura Depozitului
- Inițializat depozitul cu structura de foldere de bază
- Create fișiere README pentru fiecare secțiune majoră
- Configurată infrastructura pentru traduceri
- Adăugate resurse de imagini și diagrame

### Documentație
- Creat README.md inițial cu o privire de ansamblu asupra curriculumului
- Adăugat CODE_OF_CONDUCT.md și SECURITY.md
- Configurat SUPPORT.md cu îndrumări pentru obținerea ajutorului
- Creată structura preliminară a ghidului de studiu

## 15 aprilie 2025

### Planificare și Cadrul de Lucru
- Planificare inițială pentru curriculumul MCP pentru Începători
- Definite obiectivele de învățare și audiența țintă
- Schițată structura curriculumului în 10 secțiuni
- Dezvoltat cadrul conceptual pentru exemple și studii de caz
- Creat prototipuri inițiale pentru conceptele cheie

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->