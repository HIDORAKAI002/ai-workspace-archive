# Changelog: Curriculum MCP pentru Începători

Acest document servește ca o evidență a tuturor schimbărilor semnificative aduse curriculumului Model Context Protocol (MCP) pentru Începători. Schimbările sunt documentate în ordine cronologică inversă (cele mai noi schimbări primele).

## 16 iunie 2026

### Alinierea Specificației MCP & Validarea Exemplului

Curriculumul a fost validat în raport cu actuala **Specificație MCP 2025-11-25** și ultimele SDK-uri oficiale, apoi au fost corectate referințele învechite rămase și confirmat că exemplele de bază încă se compilează și rulează.

#### Corecții Versiune Specificație (2025-06-18 / 2025-03-26 → 2025-11-25)

Conținutul în limba engleză a fost actualizat acolo unde încă afirma că o revizie a specificației mai veche era standardul *curent/ultimul*, iar linkurile au fost redirecționate către căile canonice de pe `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Banner-ul „Standard Curent”, introducerea, titlul principiilor de bază de securitate, titlul cerințelor obligatorii, secțiunea Microsoft Entra ID, linkurile Referețe & Resurse, și notificarea de securitate finală (8 referințe) au fost actualizate la 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Linkul către Resurse Adiționale și banner-ul „Standard Curent” au fost actualizate la 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Link-ul învechit `2025-03-26` spre pagina de securitate și încredere a fost înlocuit cu pagina curentă de cele mai bune practici de securitate 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Linkul oficial către documentația de sampling a fost actualizat la 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Referința la „specificația MCP curentă” în timp prezent și linkul din Resurse Adiționale au fost actualizate la 2025-11-25 (notele istorice despre deprecierea SSE au fost lăsate neatinse pentru acuratețe)

#### Validarea Exemplului în Raport cu SDK-urile Curente

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` a rezolvat `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` a trecut fără erori de tip — API-urile existente `McpServer`/`StdioServerTransport` rămân valide
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validat într-un `.venv` izolat cu `mcp[cli]` (1.27.2); `py_compile` a trecut și `FastMCP.list_tools()` a returnat corect uneltele `add` și `subtract`
- Confirmat că toate intervalele de versiuni din sample `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) se rezolvă curat la actualul `1.29.0` fără schimbări API care să rupă funcționalitatea

#### Alinierea Fixărilor de Dependențe (închiderea golurilor de versiune)

Au fost actualizate dependențele SDK învechite astfel încât fiecare sample să urmărească versiunea curentă MCP, conform convenției din întregul repo:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` a fost crescut de la `^1.8.0` → `>=1.26.0` și descrierea pachetului „updated for MCP 2025-06-18” a fost actualizată în „aligned with MCP Specification 2025-11-25”
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** și **lab4/code/github_mcp_server/pyproject.toml**: Pin-ul exact `mcp==1.23.0` a fost crescut la `mcp>=1.26.0`; ambele fișiere `uv.lock` au fost regenerate (`uv lock`), astfel încât lockfile-urile se rezolvă la `mcp 1.27.2` curent și rămân sincronizate cu manifestele

#### Analiza Golurilor în Curriculum — Acoperirea Funcțiilor din Spec Ultimă

S-a verificat că curriculumul acoperă deja toate primitivele introduse sau extinse în MCP 2025-11-25, deci nu rămân lipsuri de conținut:
- **Sampling**: Lecția 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitare (inclusiv modul URL)**: Documentată în 01-CoreConcepts și 05-AdvancedTopics/mcp-protocol-features
- **Root-uri**: Documentate în 00-Introduction, 01-CoreConcepts, și 05-AdvancedTopics/mcp-root-contexts
- **Task-uri (operațiuni experimentale de durată lungă)**: Documentate în 01-CoreConcepts și 05-AdvancedTopics/mcp-protocol-features
- **Anotări Tool** (`readOnlyHint` / `destructiveHint`): Documentate în 01-CoreConcepts și 05-AdvancedTopics/mcp-protocol-features

### Întărirea Securității & Remedierea Vulnerabilităților de Dependență

A fost efectuată o revizuire completă a securității pe toate manifestele de dependențe și codul sursă al exemplarelor, urmând remedierea tuturor avertizărilor npm raportate și a unui caz la nivel de cod. După remediere, `npm audit` raportează **0 vulnerabilități** în fiecare director auditat.

#### Vulnerabilități npm la Dependențe (tranzitive) — Rezolvate

Au fost auditate toate cele 15 fișiere `package-lock.json` încărcate. Vulnerabilitățile erau limitate la dependențe tranzitive folosite de instrumentul MCP Inspector pentru dezvoltare, clientul OpenAI și SDK MCP; toate au fost rezolvate fără a afecta exemplarele:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** și **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` a fost crescut (`0.16.6` / `0.14.1` → `0.22.0`), ceea ce a eliminat avertizările pentru `ajv`, `brace-expansion`, `diff`, `path-to-regexp` și `ws`. A fost adăugat un entry npm `overrides` pentru a forța versiunea reparată `shell-quote@1.8.4` și a elimina avertizarea critică rămasă purtată de `concurrently`; ambele lockfile-uri au fost regenerate (acum 0 vulnerabilități)
- **03-GettingStarted/samples/typescript**: `npm audit fix` a actualizat dependența tranzitivă `qs` (moderată) la o versiune reparată
- **03-GettingStarted/samples/javascript**: `npm audit fix` a actualizat dependența tranzitivă `hono` (moderată) la o versiune reparată
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` a actualizat dependența tranzitivă `form-data` (ridicată) la o versiune reparată
- **03-GettingStarted/11-simple-auth/solution/typescript**: A generat fișierul lipsă `package-lock.json` astfel încât proiectul este reproductibil și auditat (0 vulnerabilități)

#### Remediere Securitate la Nivel de Cod (OWASP A03: Injecție)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: S-a eliminat `shell=True` din unealta `open_in_vscode`. Apelul anterior `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitea caracterelor meta shell din calea folderului să fie interpretate de `cmd.exe` (vector de injecție de comandă). Acum lansează direct `Code.exe` cu folderul ca argument — fără shell — ceea ce este echivalent funcțional și sigur

#### Audit Dependențe Python

- Au fost auditate toate seturile de cerințe Python cu `pip-audit`. `05-AdvancedTopics` și `03-GettingStarted/samples/python` nu au raportat **vulnerabilități cunoscute** (intervalele lor `mcp` / `httpx` / `pydantic` / `python-dotenv` se rezolvă la versiuni patchuite curente)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` a semnalat dependența tranzitivă **`werkzeug` 3.1.1** cu trei avertizări DoS legate de `safe_join` și numele dispozitivelor Windows — `CVE-2025-66221`, `CVE-2026-21860` și `CVE-2026-27199` (toate remediate în 3.1.6). A fost adăugat un pin explicit de securitate `werkzeug>=3.1.6` pentru a rezolva versiunea patchuită; s-a verificat că restricția se rezolvă curat cu stiva `chainlit` / `mcp` / `semantic-kernel`

### Rebranding Numele Produsului

Au fost actualizate toate conținuturile curriculum la reflectarea rebranding-ului produselor Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Linkul către comunitatea Discord actualizat
- **AGENTS.md**: Referința la serverul Discord actualizată
- **README.md**: Referințele la ecosistemul de tehnologie actualizate
- **study_guide.md**: Referințele la studiile de caz actualizate
- **05-AdvancedTopics/README.md**: Titlul și descrierea modulului 5.13 actualizate
- **05-AdvancedTopics/mcp-integration/README.md**: Titlul secțiunii și descrierea actualizate
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Titlul modulului și conținutul complet actualizate
- **05-AdvancedTopics/mcp-security-entra/README.md**: Linkul de referință încrucișată actualizat
- **07-LessonsfromEarlyAdoption/README.md**: Referințele studiilor de caz actualizate
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Titlul Secțiunii 9, insignele și capabilitățile actualizate
- **08-BestPractices/README.md**: Linkul către comunitatea Discord actualizat
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Referința la canalul Discord actualizată
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Referința la implementarea modelului actualizată
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Tabelul serviciilor AI actualizat
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Referințele la resurse actualizate

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension pentru VS Code
- **README.md**: Referințele principale din curriculum actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Titlul modulului, privire de ansamblu și toate subtitlurile modulului actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Titlul, obiectivele de învățare, instrucțiunile de configurare și resursele actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Titlul, obiectivele de învățare, tabelul gazdelor MCP și referințele încrucișate actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Titlul, insignele, prerechizitele și resursele actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Referințele Agent Builder și linkul de feedback actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Prerechizitele și referințele la extensie actualizate

---

## 11 aprilie 2026

### Lecție Nouă, Corecții Documentație și Actualizări la Dependențe

#### Conținut Nou Adăugat în Curriculum

**Modulul 05 - Subiecte Avansate**
- **Lecția 5.17: Raționament multi-agent adversarial cu MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ghid cuprinzător nou care acoperă modelul de dezbatere adversarială pentru sisteme multi-agent
  - Diagramă de arhitectură Mermaid: doi agenți → server MCP partajat → transcrierea dezbaterii → judecător → verdict
  - Server MCP pentru unelte partajate (`web_search` + `run_python`) implementat în Python și TypeScript
  - Prompturi de sistem opuse (PENTRU / CONTRA / Judecător) cu cerințe explicite de utilizare a uneltelor
  - Orchestrator de dezbatere în Python, TypeScript și C#, care gestionează runde și redirecționează argumente
  - Wiring MCP `ClientSession` pentru orchestrator către apeluri reale de unelte
  - Tabel de cazuri de utilizare (detectarea halucinațiilor, modelarea amenințărilor, revizuirea designului API, verificarea faptelor, selecția tehnologiei)
  - Considerații de securitate: execuție sandbox, validarea apelurilor unorelte, limitarea vitezei, logare auditurilor
  - Exercițiu structurat cu trei scenarii practice (revizuire cod, decizie arhitecturală, moderare conținut)

#### Corecții de Documentație

**Modulul 03 - Început**
- **05-stdio-server/README.md**: Exemplul incomplet TypeScript pentru serverul stdio a fost corectat — instanțierea transportului (`new StdioServerTransport()`) și apelul `server.connect(transport)` au fost adăugate pentru a se potrivi cu exemplele Python și .NET din aceeași secțiune
- **14-sampling/README.md**: Corectat typo — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Actualizări Curriculum

**README.md principal**
- A fost adăugat rândul 5.17 (Raționament multi-agent adversarial cu MCP) în tabelul curriculumului cu link direct către lecția nouă

**05-AdvancedTopics/README.md**
- Adăugat rândul Lecției 5.17 în tabelul lecțiilor

**study_guide.md**
- Adăugat subiectul Raționament multi-agent adversarial în harta mentală și descrierea proză a Subiectelor Avansate

#### Corecții Cod și Securitate

**Modulul 05 - Agenți Adversariali (`mcp-adversarial-agents`)**
- **Corecție securitate — injecție de comandă**: În unealta TypeScript `run_python`, interpolarea shell cu `execSync` a fost înlocuită cu `execFile` + `promisify`, eliminând suprafața de injecție de comandă (codul controlat de LLM este acum transmis ca un element argv literal fără implicare shell)
- **MCP tool loop wiring**: A fost actualizat orchestratorul Python debate pentru a utiliza clientul `AsyncAnthropic` (înlocuind `Anthropic` sincron blocant), pentru a transmite o sesiune live `ClientSession` direct fiecărui agent la fiecare tură, a prelua definițiile de unelte prin `session.list_tools()` la fiecare tură și a trimite blocurile `tool_use` prin `session.call_tool()` într-un ciclu până când modelul emite un răspuns final text

#### Actualizări de dependențe

- A fost actualizat `hono` la versiunea 4.12.12 în mai multe pachete (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- A fost actualizat `@hono/node-server` de la 1.19.11 la 1.19.13 în pachetele TypeScript
- A fost actualizat `cryptography` de la 46.0.5 la 46.0.7 în pachetele Python (10-StreamliningAIWorkflows laboratoare 3 și 4)
- A fost actualizat `lodash` de la 4.17.23 la 4.18.1 în inspectorul 10-StreamliningAIWorkflows

#### Traduceri

- Traducerile pentru peste 48 de limbi au fost sincronizate cu ultimele modificări sursă (actualizare i18n)

---

## 5 februarie 2026

### Îmbunătățiri la nivel de întreg repository pentru validare și navigare

#### Conținut nou de curriculum adăugat

**Modul 03 - Getting Started**  
- **12-mcp-hosts/README.md**: Ghid nou și comprehensiv pentru configurarea gazdelor MCP  
  - Exemple de configurare pentru Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - Șabloane JSON pentru configurarea tuturor gazdelor majore  
  - Tabel comparativ al tipurilor de transport (stdio, SSE/HTTP, WebSocket)  
  - Depanare pentru probleme comune de conexiune  
  - Practici recomandate de securitate pentru configurarea gazdei

- **13-mcp-inspector/README.md**: Ghid nou de depanare pentru MCP Inspector  
  - Metode de instalare (npx, npm global, din sursă)  
  - Conectare la servere prin stdio și HTTP/SSE  
  - Fluxuri de lucru pentru testarea uneltelor, resurselor și prompturilor  
  - Integrare VS Code cu MCP Inspector  
  - Situații comune de depanare cu soluții

**Modul 04 - Practical Implementation**  
- **pagination/README.md**: Ghid nou de implementare a paginării  
  - Modele de paginare bazate pe cursor în Python, TypeScript, Java  
  - Gestionarea paginării pe client  
  - Strategii de proiectare a cursorului (opac vs. structurat)  
  - Recomandări pentru optimizarea performanței

**Modul 05 - Advanced Topics**  
- **mcp-protocol-features/README.md**: Investigație detaliată asupra caracteristicilor protocolului  
  - Implementarea notificărilor de progres  
  - Modele de anulare a cererilor  
  - Șabloane de resurse cu modele URI  
  - Managementul ciclului de viață al serverului  
  - Controlul nivelului de logare  
  - Modele de tratare a erorilor cu coduri JSON-RPC

#### Corecții de navigare (peste 24 de fișiere actualizate)

**READMEs principale ale modulelor**  
 Acum leagă atât la prima lecție, cât și la următorul modul

**Sub-fișiere din 02-Security**  
- Toate cele 5 documente suplimentare de securitate au acum secțiunea „Ce urmează” pentru navigare:

**Fișiere din 09-CaseStudy**  
- Toate fișierele de studii de caz au acum navigare secvențială:

**Laboratoare 10-StreamliningAI**  
A fost adăugată secțiunea „Ce urmează” la prezentarea Modulului 10 și Modulului 11

#### Corecții de cod și conținut

**Actualizări SDK și dependențe**  
A fost fixată versiunea goală openai la `^4.95.0`  
Actualizat SDK de la `^1.8.0` la `>=1.26.0`  
Actualizat pinurile de versiune mcp la `>=1.26.0`

**Corecții de cod**  
Corectat model invalid `gpt-4o-mini` cu `gpt-4.1-mini`

**Corecții conținut**  
Legătura ruptă `READMEmd` → `README.md` a fost reparată, antetul curriculumului corectat din `Module 1-3` în `Module 0-3`, corectat path cu sensibilitate la majuscule  
Eliminat conținut duplicat corupt din Studiul de caz 5

**Îmbunătățiri pentru începători**  
Adăugat o introducere adecvată, obiective de învățare și prerechizite pentru începători

#### Actualizări ale curriculumului

**README principal**  
- Adăugate înregistrări 3.12 (Gazde MCP), 3.13 (MCP Inspector), 4.1 (Paginare), 5.16 (Caracteristici Protocol) în tabelul de curriculum

**READMEs ale modulelor**  
Adăugate lecțiile 12 și 13 în lista lecțiilor  
Adăugată secțiunea Ghiduri practice cu link către paginare  
Adăugate lecțiile 5.15 (Transport personalizat) și 5.16 (Caracteristici Protocol)

**study_guide.md**  
- Hartă mentală actualizată cu toate subiectele noi: Configurare Gazde MCP, MCP Inspector, Strategii de Paginare, Investigație Caracteristici Protocol

## 28 ianuarie 2026

### Revizuirea conformității cu Specificația MCP 2025-11-25

#### Îmbunătățiri în conceptele de bază (01-CoreConcepts/)  
- **Noua primitivă Client - Roots**: Documentație completă adăugată despre primitiva client Roots, care permite serverelor să înțeleagă limitele sistemului de fișiere și permisiunile de acces  
- **Anotații pentru unelte**: Documentație adăugată despre anotațiile comportamentale ale uneltelor (`readOnlyHint`, `destructiveHint`) pentru decizii mai bune asupra execuției uneltelor  
- **Invocarea uneltelor la Sampling**: Documentația Sampling actualizată ca să includă parametrii `tools` și `toolChoice` pentru invocarea uneltelor condusă de model în cererile de sampling  
- **Mod elicitation URL**: Adăugată documentație despre elicitatea prin URL bazată pe interacțiuni externe inițiate de server  
- **Taskuri (Experimental)**: Adăugată o secțiune nouă care documentează caracteristica experimentală Tasks pentru învelitoare de execuție durabilă și recuperare rezultatelor amânate  
- **Suport pentru icoane**: Menționat că uneltele, resursele, șabloanele de resurse și prompturile pot include acum icoane ca metadate suplimentare

#### Actualizări documentație  
- **README.md**: Adăugată referință la versiunea Specificației MCP 2025-11-25 și explicația versionării bazate pe data  
- **study_guide.md**: Hartă curriculum actualizată pentru a include Taskuri și Anotații unelte în secțiunea Concepte de bază; actualizare timestamp document

#### Verificare conformitate specificație  
- **Versiune protocol**: Confirmat că toate documentele se referă la Specificația MCP 2025-11-25 curentă  
- **Aliniere arhitectură**: Confirmată acuratețea documentației pentru arhitectura în două straturi (Stratul de Date + Stratul de Transport)  
- **Documentații pentru primitive**: Validat documentația primitivelor server (Resurse, Prompturi, Unelte) și primitivelor client (Sampling, Elicitation, Logging, Roots)  
- **Mecanisme de transport**: Confirmată acuratețea documentației pentru transport STDIO și HTTP streamabil  
- **Îndrumări de securitate**: Confirmată alinierea cu documentația curentă MCP Best Practices de securitate

#### Caracteristici MCP 2025-11-25 cheie documentate  
- **Descoperire OpenID Connect**: Descoperire server de autentificare prin OIDC  
- **Documente metadata OAuth Client ID**: Mecanism recomandat pentru înregistrarea clientului  
- **JSON Schema 2020-12**: Dialect implicit pentru definițiile schema MCP  
- **Sistem de nivelare SDK**: Formalizarea cerințelor pentru suport și întreținere de caracteristici SDK  
- **Structura de guvernanță**: Formalizarea grupurilor de lucru și grupurilor de interes în guvernanța MCP

### Actualizare majoră documentație securitate (02-Security/)  

#### Integrare MCP Security Summit Workshop (Sherpa)  
- **Resursă nouă practică**: Adăugată integrare completă cu [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) în toată documentația de securitate  
- **Acoperire traseu expediție**: Documentat progresul complet de la tabără de bază la vârf  
- **Aliniere OWASP**: Toate îndrumările de securitate mapate către riscurile OWASP MCP Azure Security Guide

#### Integrare OWASP MCP Top 10  
- **Secțiune nouă**: Adăugat tabel cu riscuri OWASP MCP Top 10 și atenuările Azure în README-ul principal de securitate  
- **Documentație bazată pe riscuri**: Actualizat mcp-security-controls-2025.md cu referințe OWASP MCP pentru fiecare domeniu de securitate  
- **Arhitectură de referință**: Legături către arhitectura de referință și modele de implementare OWASP MCP Azure Security Guide

#### Fișiere de securitate actualizate  
- **README.md**: Adăugat prezentare Sherpa Workshop, tabel traseu expediție, sumar riscuri OWASP MCP Top 10 și secțiune cursuri practice  
- **mcp-security-controls-2025.md**: Header actualizat la februarie 2026, adăugate referințe riscuri OWASP (MCP01-MCP08), corectată discrepanță versiune specificație  
- **mcp-security-best-practices-2025.md**: Adăugat secțiune resurse Sherpa și OWASP, actualizare timestamp  
- **mcp-best-practices.md**: Adăugată secțiune cursuri practice cu legături Sherpa și OWASP  
- **azure-content-safety-implementation.md**: Adăugat referință OWASP MCP06, aliniere Sherpa Camp 3 și secțiune resurse suplimentare

#### Linkuri noi resurse adăugate  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Pagini individuale pentru riscurile OWASP MCP (MCP01-MCP10)

### Alinierea specificației MCP 2025-11-25 la nivel de curriculum

#### Modul 03 - Getting Started  
- **Documentație SDK**: Adăugat Go SDK în lista oficială SDK; actualizate toate referințele SDK pentru a se alinia cu MCP 2025-11-25  
- **Clarificare transport**: Actualizate descrierile transporturilor STDIO și HTTP Streaming cu referințe explicite la specificație

#### Modul 04 - Practical Implementation  
- **Actualizări SDK**: Adăugat Go SDK; lista SDK actualizată cu referință la versiunea specificației  
- **Specificație autorizare**: Link actualizat la specificația MCP Autorizare versiunea curentă 2025-11-25

#### Modul 05 - Advanced Topics  
- **Caracteristici noi**: Adăugat notă privind noile caracteristici MCP 2025-11-25 (Taskuri, Anotații unelte, Mod elicitation URL, Roots)  
- **Resurse de securitate**: Adăugat linkuri către OWASP MCP Top 10 și Sherpa Workshop în referințe suplimentare

#### Modul 06 - Contribuții comunitare  
- **Lista SDK**: Adăugat SDK Swift și Rust; actualizat link specificație MCP la 2025-11-25  
- **Referință specificație**: Actualizat link către URL direct al specificației MCP

#### Modul 07 - Lecții din adopția timpurie  
- **Actualizări resurse**: Adăugat link MCP 2025-11-25 și OWASP MCP Top 10 în resurse suplimentare

#### Modul 08 - Cele mai bune practici  
- **Versiune specificație**: Actualizat la MCP 2025-11-25  
- **Resurse securitate**: Adăugat OWASP MCP Top 10 și Sherpa Workshop în referințe suplimentare

#### Modul 10 - Streamlining AI Workflows  
- **Actualizare badge**: Schimbat badge-ul versiune MCP de la SDK (1.9.3) la versiunea specificației (2025-11-25)  
- **Linkuri resurse**: Actualizat link MCP 2025-11-25; adăugat OWASP MCP Top 10

#### Modul 11 - Laboratoare practice MCP Server  
- **Referință specificație**: Actualizat link MCP la versiunea 2025-11-25  
- **Resurse securitate**: Adăugat OWASP MCP Top 10 în resurse oficiale

## 18 decembrie 2025

### Actualizare documentație securitate - Specificația MCP 2025-11-25

#### Cele mai bune practici MCP Security (02-Security/mcp-best-practices.md) - Actualizare versiune specificație  
- **Actualizare versiune protocol**: Actualizat să se refere la specificația MCP 2025-11-25 (lansată 25 noiembrie 2025)  
  - Actualizate toate referințele versiunii specificației de la 2025-06-18 la 2025-11-25  
  - Actualizate datele documentului de la 18 august 2025 la 18 decembrie 2025  
  - Verificat ca toate URL-urile spre specificație sunt cele curente  
- **Validare conținut**: Validare cuprinzătoare a celor mai bune practici de securitate față de standardele actuale  
  - **Soluții Microsoft Security**: Verificat termenii actuali și linkurile pentru Prompt Shields (anterior „detecție riscuri Jailbreak”), Azure Content Safety, Microsoft Entra ID și Azure Key Vault  
  - **Securitatea OAuth 2.1**: Confirmată alinierea cu cele mai bune practici recente OAuth  
  - **Standarde OWASP**: Validat că referințele OWASP Top 10 pentru LLM-uri rămân actuale  
  - **Servicii Azure**: Verificat toate linkurile documentației Microsoft Azure și bune practici  
- **Aliniere standarde**: Confirmat că toate standardele de securitate menționate sunt curente  
  - Framework-ul NIST AI Risk Management  
  - ISO 27001:2022  
  - Cele mai bune practici OAuth 2.1 Security  
  - Framework-uri de securitate și conformitate Azure  
- **Resurse implementare**: Verificat toate linkurile și resursele îndrumărilor de implementare  
  - Modele autentificare API Management Azure  
  - Ghiduri integrare Microsoft Entra ID  
  - Managementul secretelor Azure Key Vault  
  - Pipeline-uri DevSecOps și soluții monitorizare

### Asigurare calitate documentație  
- **Conformitate specificație**: Confirmat că toate cerințele MCP obligatorii de securitate (MUST/MUST NOT) sunt aliniate cu specificația actuală  
- **Actualizare resurse**: Verificat toate linkurile externe către documentația Microsoft, standarde securitate și ghiduri implementare  
- **Acoperire cele mai bune practici**: Confirmată acoperire completă pentru autentificare, autorizare, amenințări specifice AI, securitatea lanțului de aprovizionare și modele enterprise

## 6 octombrie 2025

### Extinderea secțiunii Getting Started – Utilizare avansată server & autentificare simplă

#### Utilizare avansată server (03-GettingStarted/10-advanced)  
- **Capitol nou adăugat**: Ghid complet pentru utilizarea avansată a serverului MCP, acoperind arhitecturi server obișnuite și low-level.  
  - **Server obișnuit vs. low-level**: Comparație detaliată și exemple de cod în Python și TypeScript pentru ambele abordări.  
  - **Design bazat pe handleri**: Explicație despre gestionarea uneltelor/resurselor/prompturilor prin handleri pentru implementări server scalabile și flexibile.  
  - **Modele practice**: Situații reale în care pattern-urile low-level server oferă avantaje pentru caracteristici și arhitectură avansate.
#### Autentificare Simplă (03-GettingStarted/11-simple-auth)
- **Capitol Nou Adăugat**: Ghid pas cu pas pentru implementarea autentificării simple în serverele MCP.
  - **Concepte de Autentificare**: Explicație clară a autentificării față de autorizare și gestionarea acreditărilor.
  - **Implementare de Autentificare de Bază**: Modele de autentificare bazate pe middleware în Python (Starlette) și TypeScript (Express), cu exemple de cod.
  - **Progresie către Securitate Avansată**: Ghid pentru începerea cu autentificare simplă și avansarea către OAuth 2.1 și RBAC, cu referințe la module de securitate avansate.

Aceste adăugiri oferă un ghid practic pentru construirea unor implementări MCP mai robuste, sigure și flexibile, făcând punte între conceptele fundamentale și modelele avansate pentru producție.

## 29 Septembrie 2025

### Laboratoare de Integrare Bază de Date server MCP - Curs Practic Complet

#### 11-MCPServerHandsOnLabs - Curriculum Complet pentru Integrarea Bazei de Date
- **Parcurs de Învățare Complet cu 13 Laboratoare**: Adăugat curriculum practic cuprinzător pentru construirea serverelor MCP gata pentru producție cu integrare PostgreSQL
  - **Implementare Reală**: Caz de utilizare Zava Retail analytics demonstrând modele de nivel enterprise
  - **Progresie Structurată a Învățării**:
    - **Laboratoarele 00-03: Fundamente** - Introducere, Arhitectură de Bază, Securitate & Multi-Chiriaș, Configurare Mediu
    - **Laboratoarele 04-06: Construirea Serverului MCP** - Design & Schema Bază de Date, Implementare Server MCP, Dezvoltare Unelte  
    - **Laboratoarele 07-09: Funcționalități Avansate** - Integrare Căutare Semantică, Testare & Debugging, Integrare VS Code
    - **Laboratoarele 10-12: Producție & Cele Mai Bune Practici** - Strategii de Deploy, Monitoring & Observabilitate, Cele Mai Bune Practici & Optimizare
  - **Tehnologii Enterprise**: Framework FastMCP, PostgreSQL cu pgvector, încorporări Azure OpenAI, Azure Container Apps, Application Insights
  - **Funcționalități Avansate**: Securitate pe Nivel de Rând (RLS), căutare semantică, acces multi-chiriaș, încorporări vectoriale, monitorizare în timp real

#### Standardizare Terminologie - Conversie Module în Laboratoare
- **Actualizare Comprehensivă a Documentației**: Actualizare sistematică a tuturor fișierelor README din 11-MCPServerHandsOnLabs pentru folosirea terminologiei "Laborator" în loc de "Modul"
  - **Antete de Secțiuni**: Modificat „Ce acoperă acest modul” în „Ce acoperă acest laborator” în toate cele 13 laboratoare
  - **Descrierea Conținutului**: Înlocuit „Acest modul oferă...” cu „Acest laborator oferă...” în toată documentația
  - **Obiective de Învățare**: Modificat „La sfârșitul acestui modul...” în „La sfârșitul acestui laborator...”
  - **Linkuri de Navigare**: Convertit toate referințele „Modul XX:” în „Laborator XX:” în referințe încrucișate și navigare
  - **Urmărirea Finalizării**: Modificat „După finalizarea acestui modul...” în „După finalizarea acestui laborator...”
  - **Referințe Tehnice Păstrate**: Păstrate referințele către module python în fișierele de configurare (ex. `"module": "mcp_server.main"`)

#### Îmbunătățire Ghid de Studiu (study_guide.md)
- **Hartă Vizuală a Curriculumului**: Adăugat noua secțiune „11. Laboratoare de Integrare Bază de Date” cu vizualizare completă a structurii laboratoarelor
- **Structura Repository-ului**: Actualizat de la zece la unsprezece secțiuni principale cu descriere detaliată pentru 11-MCPServerHandsOnLabs
- **Ghidare Parcurs de Învățare**: Îmbunătățite instrucțiunile de navigare pentru acoperirea secțiunilor 00-11
- **Acoperire Tehnologică**: Adăugat detalii despre integrarea FastMCP, PostgreSQL, servicii Azure
- **Rezultate ale Învățării**: S-a pus accent pe dezvoltarea serverelor gata pentru producție, modele integrare baze de date și securitate enterprise

#### Îmbunătățire Structură README Principal
- **Terminologie pe Bază de Laboratoare**: Actualizat README.md principal din 11-MCPServerHandsOnLabs pentru folosire consecventă a structurii „Laborator”
- **Organizare Parcurs Învățare**: Progres clar de la concepte fundamentale la implementări avansate și producție
- **Focalizare pe Cazuri Reale**: Accent pe învățare practică, cu pattern-uri și tehnologii enterprise

### Îmbunătățiri Calitate & Consistență Documentație
- **Accent pe Învățare Practică**: Consolidat abordarea practică bazată pe laboratoare în toată documentația
- **Focalizare pe Modele Enterprise**: Evidențierea implementărilor gata pentru producție și considerente de securitate enterprise
- **Integrare Tehnologică**: Acoperire completă a serviciilor Azure și modelelor de integrare AI  
- **Progresie Clară a Învățării**: Parcurs structurat de la concepte de bază la producție

## 26 Septembrie 2025

### Îmbunătățiri Studii de Caz - Integrare Registru MCP GitHub

#### Studii de Caz (09-CaseStudy/) - Focus Dezvoltare Ecosistem
- **README.md**: Extindere majoră cu studiu de caz detaliat al Registrului MCP GitHub
  - **Studiu de Caz Registru MCP GitHub**: Studiu de caz nou, cuprinzător privind lansarea Registrului MCP GitHub în septembrie 2025
    - **Analiză Problematica**: Examinare detaliată a dificultăților fragmentării descoperirii și deploy-ului serverelor MCP
    - **Arhitectura Soluției**: Abordarea centralizată a registrului GitHub cu instalare cu un singur click în VS Code
    - **Impact de Afaceri**: Îmbunătățiri măsurabile în onboarding-ul și productivitatea dezvoltatorilor
    - **Valoare Strategică**: Accent pe implementarea modulară a agenților și interoperabilitatea între unelte
    - **Dezvoltare Ecosistem**: Poziționare ca platformă fondatoare pentru integrarea agentică
  - **Structurare îmbunătățită a Studiilor de Caz**: Actualizate toate cele șapte studii de caz cu format uniform și descrieri complete
    - Agenți de Călătorie Azure AI: Accent pe orchestrare multi-agent
    - Integrare Azure DevOps: Concentrare pe automatizare workflow
    - Recuperare Documentație în Timp Real: Implementare client consolă Python
    - Generator Plan de Studiu Interactiv: Aplicație web conversațională Chainlit
    - Documentație în Editor: Integrare VS Code și GitHub Copilot
    - Management API Azure: Modele enterprise de integrare API
    - Registrul MCP GitHub: Dezvoltare ecosistem și platformă comunitară
  - **Concluzie Completă**: Rescrisă, evidențiind cele șapte studii de caz ce acoperă multiple dimensiuni ale implementării MCP
    - Integrare Enterprise, Orchestrare Multi-Agent, Productivitate Dezvoltatori
    - Dezvoltare Ecosistem, Aplicații Educaționale categorisire
    - Perspective aprofundate asupra modelelor arhitecturale, strategiilor de implementare și celor mai bune practici
    - Accent pe MCP ca protocol matur, gata pentru producție

#### Actualizări Ghid Studiu (study_guide.md)
- **Hartă Vizuală Curriculum**: Actualizat mindmap-ul pentru includerea Registrului MCP GitHub în secțiunea Studii de Caz
- **Descriere Studii de Caz**: Îmbunătățită de la descrieri generice la detaliere completă a celor șapte studii de caz
- **Structura Repository-ului**: Actualizată secțiunea 10 pentru reflectarea acoperirii complete a studiilor de caz cu detalii specifice implementării
- **Integrare Changelog**: Adăugat înregistrare pentru 26 septembrie 2025 documentând adăugarea Registrului MCP GitHub și îmbunătățirile studiilor de caz
- **Actualizare Data Modificării**: Actualizat timestamp-ul footer-ului pentru ultima revizie (26 septembrie 2025)

### Îmbunătățiri Calitate Documentație
- **Uniformitate**: Standardizare format și structură studii de caz pe toate cele șapte exemple
- **Acoperire Comprehensivă**: Studii de caz ce acoperă scenarii enterprise, productivitate dezvoltatori și dezvoltare ecosistem
- **Poziționare Strategică**: Accent suplimentar pe MCP ca platformă fondatoare pentru implementarea sistemelor agentice
- **Integrare Resurse**: Actualizarea resurselor suplimentare cu link către Registrul MCP GitHub

## 15 Septembrie 2025

### Extindere Subiecte Avansate - Transporturi Personalizate & Ingineria Contextului

#### Transporturi Personalizate MCP (05-AdvancedTopics/mcp-transport/) - Ghid Nou de Implementare Avansată
- **README.md**: Ghid complet de implementare a mecanismelor de transport MCP personalizate
  - **Transport Azure Event Grid**: Implementare completă serverless bazată pe evenimente
    - Exemple în C#, TypeScript și Python cu integrare Azure Functions
    - Modele arhitecturale bazate pe evenimente pentru soluții MCP scalabile
    - Recepție webhook și manipulare push a mesajelor
  - **Transport Azure Event Hubs**: Implementare streaming cu debit mare
    - Capacități streaming în timp real pentru scenarii cu latență redusă
    - Strategii de partiționare și management checkpoint
    - Grupare mesaje și optimizarea performanței
  - **Modele de Integrare Enterprise**: Exemple arhitecturale gata pentru producție
    - Procesare MCP distribuită prin multiple Azure Functions
    - Arhitecturi hibride combinând mai multe tipuri de transport
    - Durabilitate mesaje, fiabilitate și gestionare erori
  - **Securitate & Monitorizare**: Integrare Azure Key Vault și modele de observabilitate
    - Autentificare managed identity și acces cu drepturi minime
    - Telemetrie Application Insights și monitorizare performanță
    - Pattern-uri circuit breaker și toleranță la erori
  - **Framework-uri de Testare**: Strategii de testare cuprinzătoare pentru transporturi personalizate
    - Testare unitară cu mock-uri și dubluri
    - Testare de integrare cu Azure Test Containers
    - Considerații pentru testare de performanță și încărcare

#### Ingineria Contextului (05-AdvancedTopics/mcp-contextengineering/) - Disciplina AI Emergenta
- **README.md**: Explorare completă a ingineriei contextului ca domeniu emergent
  - **Principii De Bază**: Partajare completă a contextului, conștientizare decizii acțiune, management ferestre context
  - **Aliniere cu Protocol MCP**: Cum designul MCP abordează provocările ingineriei contextului
    - Limitări ferestre context și încărcare progresivă
    - Determinarea relevanței și recuperarea dinamică a contextului
    - Manipulare multimodală a contextului și considerente de securitate
  - **Abordări de Implementare**: Arhitecturi single-threaded vs multi-agent
    - Tehnici de fragmentare și prioritizare context
    - Încărcare progresivă și strategii de compresie
    - Abordări stratificate ale contextului și optimizare recuperare
  - **Cadru de Măsurare**: Metrici emergente pentru evaluarea eficienței contextului
    - Eficiență input, performanță, calitate și experiența utilizatorului
    - Abordări experimentale pentru optimizarea contextului
    - Analiza eșecurilor și metodologii de îmbunătățire

#### Actualizări Navigare Curriculum (README.md)
- **Structură Modul Îmbunătățită**: Actualizat tabelul curriculum pentru includerea subiectelor avansate noi
  - Adăugate înregistrări pentru Ingineria Contextului (5.14) și Transport Personalizat (5.15)
  - Format și linkuri de navigare consecvente pentru toate modulele
  - Descrieri actualizate pentru acoperirea conținutului curent

### Îmbunătățiri Structură Director
- **Standardizare Denumiri**: Redenumit „mcp transport” în „mcp-transport” pentru consistență cu celelalte foldere de subiecte avansate
- **Organizare Conținut**: Toate folderele 05-AdvancedTopics urmează acum un model consistent de denumire (mcp-[topic])

### Îmbunătățiri Calitate Documentație
- **Aliniere Specificație MCP**: Toate conținuturile noi referă Specificația MCP 2025-06-18
- **Exemple Multilingv**: Exemple complete de cod în C#, TypeScript și Python
- **Focus Enterprise**: Modele gata pentru producție și integrare cloud Azure pe tot parcursul
- **Documentație Vizuală**: Diagrame Mermaid pentru vizualizarea arhitecturii și fluxurilor

## 18 August 2025

### Actualizare Completă Documentație - Standardele MCP 2025-06-18

#### Best Practices Securitate MCP (02-Security/) - Modernizare Completă
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Rescriere completă aliniată cu Specificația MCP 2025-06-18
  - **Cerințe OBLIGATORII**: Adăugate cerințe MUST/MUST NOT explicite din specificație, cu indicatori vizuali clari
  - **12 Practici Cheie de Securitate**: Restructurare de la lista de 15 puncte la domenii de securitate cuprinzătoare
    - Securitate Token & Autentificare cu integrare furnizor identitate externă
    - Management Sesiuni & Securitate Transport cu cerințe criptografice
    - Protecție Specifică AI cu integrare Microsoft Prompt Shields
    - Control Acces & Permisiuni conform principiului privilegiului minim
    - Siguranță Conținut & Monitorizare cu integrare Azure Content Safety
    - Securitate Lanț Aprovizionare cu verificare completă componente
    - Securitate OAuth & Prevenire Confused Deputy cu implementare PKCE
    - Răspuns și Recuperare Incident cu capabilități automate
    - Conformitate & Guvernanță aliniate reglementărilor
    - Controale de Securitate Avansate cu arhitectură zero trust
    - Integrare Ecosistem de Securitate Microsoft cu soluții complete
    - Evoluție Continuă a Securității cu practici adaptive
  - **Soluții Microsoft de Securitate**: Îndrumări extinse pentru integrarea Prompt Shields, Azure Content Safety, Entra ID și GitHub Advanced Security
  - **Resurse Implementare**: Linkuri categorisite pentru Documentație Oficială MCP, Soluții Microsoft, Standarde Securitate și Ghiduri de Implementare

#### Controale Avansate de Securitate (02-Security/) - Implementare Enterprise
- **MCP-SECURITY-CONTROLS-2025.md**: Overhaul complet cu cadru de securitate de nivel enterprise
  - **9 Domenii Cuprinzătoare de Securitate**: Extindere de la controale de bază la cadru detaliat enterprise
    - Autentificare & Autorizare Avansate cu integrare Microsoft Entra ID
    - Securitate Token & controale anti-passthrough cu validări exhaustive
    - Controale Securitate Sesiune cu prevenire hijacking
    - Controale Securitate Specifică AI cu prevenire injectare prompt și otrăvire unelte
    - Prevenire Atac Confused Deputy cu securitate proxy OAuth
    - Securitate Execuție Unelte cu sandboxing și izolare
    - Controale Securitate Lanț Aprovizionare cu verificare dependențe
    - Controale Monitorizare & Detectare cu integrare SIEM
    - Răspuns și Recuperare Incident cu capabilități automate
  - **Exemple de Implementare**: Adăugate blocuri YAML detaliate și exemple de cod
  - **Integrare Soluții Microsoft**: Acoperire completă a serviciilor Azure de securitate, GitHub Advanced Security și management identitate enterprise

#### Subiecte Avansate Securitate (05-AdvancedTopics/mcp-security/) - Implementare Gata pentru Producție
- **README.md**: Rescriere completă pentru implementare securitate enterprise
  - **Aliniere Specificație Curentă**: Actualizat conform MCP Specification 2025-06-18 cu cerințe obligatorii de securitate
  - **Autentificare Îmbunătățită**: Integrare Microsoft Entra ID cu exemple detaliate .NET și Java Spring Security
  - **Integrare Securitate AI**: Implementare Microsoft Prompt Shields și Azure Content Safety cu exemple Python detaliate
  - **Mitigare Amenințări Avansate**: Exemple complete pentru
    - Prevenire Atac Confused Deputy cu PKCE și validare consimțământ utilizator
    - Prevenire Token Passthrough cu validare audiență și management securizat token
    - Prevenire Hijacking Sesiune cu legare criptografică și analiză comportamentală
  - **Integrare Securitate Enterprise**: Monitorizare Azure Application Insights, pipeline-uri detecție amenințări și securitatea lanțului de aprovizionare
  - **Lista Verificare Implementare**: Controale clare obligatorii vs recomandate și beneficiile ecosistemului de securitate Microsoft

### Calitate Documentație & Aliniere Standard

- **Referințe la specificații**: Actualizate toate referințele la Specificația MCP 2025-06-18 curentă
- **Ecosistemul de securitate Microsoft**: Ghidaj îmbunătățit pentru integrare în toate documentațiile de securitate
- **Implementare practică**: Adăugate exemple detaliate de cod în .NET, Java și Python cu modele de întreprindere
- **Organizarea resurselor**: Categorisire cuprinzătoare a documentației oficiale, standardelor de securitate și ghidurilor de implementare
- **Indicatori vizuali**: Marcarea clară a cerințelor obligatorii vs. practicilor recomandate


#### Concepte de bază (01-CoreConcepts/) - Modernizare completă
- **Actualizare versiune protocol**: Actualizat la referința Specificației MCP 2025-06-18 cu versiune bazată pe dată (formatul YYYY-MM-DD)
- **Rafinare arhitecturală**: Descrieri îmbunătățite ale gazdelor, clienților și serverelor pentru a reflecta modelele arhitecturale MCP actuale
  - Gazdele sunt acum definite clar ca aplicații AI ce coordonează multiple conexiuni client MCP
  - Clienții sunt descriși ca conectori de protocol ce mențin relații unu-la-unu cu serverele
  - Serverele sunt îmbunătățite cu scenarii de implementare locală vs. de la distanță
- **Restructurarea primitivelor**: Revizuire completă a primitivelor pentru server și client
  - Primitivale serverelor: Resurse (surse de date), Cereri (șabloane), Unelte (funcții executabile) cu explicații detaliate și exemple
  - Primitivale clienților: Eșantionare (completări LLM), Elicitare (input utilizator), Logare (debugging/monitorizare)
  - Actualizat cu modele curente de metode pentru descoperire (`*/list`), recuperare (`*/get`) și execuție (`*/call`)
- **Arhitectura protocolului**: Introducerea unui model arhitectural în două straturi
  - Strat de date: bază JSON-RPC 2.0 cu gestionarea ciclului de viață și primitive
  - Strat de transport: STDIO (local) și HTTP Streamabil cu SSE (transport la distanță)
- **Cadru de securitate**: Principii cuprinzătoare de securitate incluzând consimțământ explicit al utilizatorului, protecția confidențialității datelor, siguranța execuției uneltelor și securitatea stratului de transport
- **Modele de comunicare**: Mesaje de protocol actualizate pentru a arăta inițializarea, descoperirea, execuția și fluxurile de notificare
- **Exemple de cod**: Exemple multilingve revizuite (.NET, Java, Python, JavaScript) pentru a reflecta modelele MCP SDK actuale

#### Securitate (02-Security/) - Revizuire completă a securității  
- **Aliniere la standarde**: Aliniere totală cu cerințele de securitate din Specificația MCP 2025-06-18
- **Evoluția autentificării**: Documentat tranziția de la servere OAuth personalizate către delegare prin furnizor extern de identitate (Microsoft Entra ID)
- **Analiză specifică amenințărilor AI**: Acoperire îmbunătățită a vectorilor moderni de atac AI
  - Scenarii detaliate de atac prin injecție de prompt cu exemple din lumea reală
  - Mecanisme de otrăvire a uneltelor și modele de atac „rug pull”
  - Otrăvirea ferestrei de context și atacuri de confuzie a modelului
- **Soluții Microsoft AI Security**: Acoperire cuprinzătoare a ecosistemului de securitate Microsoft
  - Scuturi pentru prompturi AI cu detectare avansată, semnalizare și tehnici delimitatoare
  - Modele de integrare pentru Azure Content Safety
  - GitHub Advanced Security pentru protecția lanțului de aprovizionare
- **Atenuarea avansată a amenințărilor**: Controale detaliate de securitate pentru
  - Preluarea sesiunii cu scenarii specifice MCP și cerințe criptografice pentru ID-uri de sesiune
  - Problemele de tip confused deputy în scenarii proxy MCP cu cerințe explicite de consimțământ
  - Vulnerabilități la trecerea token-urilor cu controale obligatorii de validare
- **Securitatea lanțului de aprovizionare**: Extinderea acoperirii lanțului de aprovizionare AI incluzând modele fundamentale, servicii de embedding, furnizori de context și API-uri terțe
- **Securitate la nivel fundamental**: Integrare îmbunătățită cu modele de securitate enterprise, arhitectură zero trust și ecosistemul de securitate Microsoft
- **Organizarea resurselor**: Links comprehensive categorizate după tip (Documentație oficială, Standardele, Cercetare, Soluții Microsoft, Ghiduri de implementare)

### Îmbunătățiri ale calității documentației
- **Obiective de învățare structurate**: Obiective de învățare îmbunătățite, specifice și acționabile
- **Referințe încrucișate**: Adăugate legături între subiectele de securitate și conceptele de bază
- **Informații actualizate**: Actualizate toate referințele de dată și link-urile de specificație la standardele curente
- **Ghid de implementare**: Adăugate îndrumări specifice și acționabile de implementare în ambele secțiuni

## 16 iulie 2025

### Îmbunătățiri README și navigație
- Redesenare completă a navigației curriculei în README.md
- Înlocuite etichetele `<details>` cu un format mai accesibil pe bază de tabel
- Creați opțiuni alternative de layout în noul folder "alternative_layouts"
- Adăugate exemple de navigare bazate pe carduri, taburi și acordeon
- Actualizată secțiunea structurii repository-ului pentru a include toate fișierele noi
- Îmbunătățită secțiunea „Cum să folosești această curriculă” cu recomandări clare
- Actualizate link-urile către specificația MCP cu URL-uri corecte
- Adăugată secțiunea de Inginerie a Contextului (5.14) în structura curriculei

### Actualizări Ghid de studiu
- Revizuire completă a ghidului de studiu pentru alinierea cu structura repository-ului curentă
- Secțiuni noi pentru clienții MCP și unelte, precum și pentru serverele MCP populare
- Actualizare a Hărții vizuale a curriculei pentru a reflecta corect toate subiectele
- Îmbunătățite descrierile Topic-urilor Avansate pentru acoperirea tuturor domeniilor specializate
- Actualizată secțiunea Studiilor de caz pentru a reflecta exemple reale
- Adăugat acest jurnal complet al modificărilor

### Contribuții comunitare (06-CommunityContributions/)
- Informații detaliate adăugate despre serverele MCP pentru generare de imagini
- Secțiune cuprinzătoare creată pentru utilizarea Claude în VSCode
- Instrucțiuni de configurare și utilizare a clientului terminal Cline
- Secțiunea clienților MCP actualizată pentru a include toate opțiunile populare
- Exemple de contribuții îmbunătățite cu mostre de cod mai precise

### Subiecte avansate (05-AdvancedTopics/)
- Organizarea tuturor dosarelor de subiecte specializate cu denumire consistentă
- Adăugate materiale și exemple pentru ingineria contextului
- Documentație pentru integrarea agentului Foundry
- Documentație îmbunătățită pentru integrarea securității Entra ID

## 11 iunie 2025

### Crearea inițială
- Lansarea primei versiuni a curriculei MCP pentru începători
- Creată structura de bază pentru toate cele 10 secțiuni principale
- Implementată Harta vizuală a curriculei pentru navigație
- Adăugate proiecte prototype inițiale în mai multe limbaje de programare

### Începutul (03-GettingStarted/)
- Primele exemple de implementare a serverului create
- Ghidaj pentru dezvoltarea clientului adăugat
- Instrucțiuni pentru integrarea clientului LLM incluse
- Documentație pentru integrarea în VS Code adăugată
- Exemple pentru servere Server-Sent Events (SSE) implementate

### Concepte de bază (01-CoreConcepts/)
- Adăugată explicație detaliată a arhitecturii client-server
- Documentație pentru componentele cheie ale protocolului create
- Documentate modelele de mesagerie în MCP

## 23 mai 2025

### Structura repository-ului
- Inițializat repository-ul cu structura de dosare de bază
- Fișiere README create pentru fiecare secțiune majoră
- Infrastructură de traducere configurată
- Adăugate active și diagrame

### Documentație
- Creați README.md inițial cu privire de ansamblu a curriculei
- Adăugate fișiere CODE_OF_CONDUCT.md și SECURITY.md
- Configurat SUPPORT.md cu indicații pentru obținerea asistenței
- Creați schiță preliminară a ghidului de studiu

## 15 aprilie 2025

### Planificare și cadru
- Planificarea inițială pentru curicula MCP pentru începători
- Definite obiectivele de învățare și publicul țintă
- Schițată structura celor 10 secțiuni ale curriculei
- Dezvoltat cadrul conceptual pentru exemple și studii de caz
- Creați prototipuri inițiale pentru conceptele cheie

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->