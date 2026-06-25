# Changelog: Curriculum MCP pentru Începători

Acest document servește ca un registru al tuturor schimbărilor semnificative făcute curriculumului Model Context Protocol (MCP) pentru Începători. Schimbările sunt documentate în ordine cronologică inversă (cele mai noi schimbări primele).

## 24 iunie 2026

### Lecție nouă: Utilizarea MCP în aplicația Copilot

- [Secțiunea Tooling](./12-tooling/README.md) Secțiune tooling adăugată.
- [MCP în aplicația Copilot](./12-tooling/01-copilot-app/README.md)

## 16 iunie 2026

### Alinierea specificației MCP & Validarea mostrelor

Curriculumul a fost validat conform ultimei **MCP Specification 2025-11-25** și celor mai noi SDK-uri oficiale, apoi au fost corectate toate referințele învechite la specificație și s-a confirmat că mostrele principale încă se compilează și rulează.

#### Corecții versiune specificație (2025-06-18 / 2025-03-26 → 2025-11-25)

S-a actualizat conținutul în limba engleză unde încă se pretindea că o versiune mai veche a specificației era standardul *actual/ultimul*, și s-au reorientat linkurile către căile canonice `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: A fost actualizat banner-ul "Current Standard", introducerea, titlul principiilor de securitate de bază, titlul cerințelor obligatorii, secțiunea Microsoft Entra ID, link-urile References & Resources și notificarea finală de securitate (8 referințe) la 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: S-a actualizat linkul către Additional Resources pentru specificație și banner-ul "Current Standard" la 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: A fost înlocuit linkul învechit `2025-03-26` privind securitatea și încrederea cu pagina actuală 2025-11-25 despre cele mai bune practici în securitate
- **03-GettingStarted/14-sampling/README.md**: A fost actualizat linkul oficial către documentele de sampling la 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: S-a actualizat referința la „specificația MCP curentă” în timpul prezent și linkul în Additional Resources către 2025-11-25 (notițele istorice privind deprecarea SSE au fost lăsate intacte pentru acuratețe)

#### Validarea mostrelor față de SDK-urile actuale

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` a rezolvat `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` a trecut fără erori de tip — API-urile existente `McpServer`/`StdioServerTransport` rămân valabile
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validat într-un mediu izolat `.venv` cu `mcp[cli]` (1.27.2); `py_compile` a trecut, iar `FastMCP.list_tools()` a returnat corect uneltele `add` și `subtract`
- Confirmate toate intervalele de versiune `@modelcontextprotocol/sdk` din mostre (`>=1.26.0` / `^1.26.0` / `^1.27.0`) rezolvând clar la versiunea actuală `1.29.0` fără schimbări breaking ale API-ului

#### Alinierea pin-urilor de dependență (închiderea decalajelor de versiune)

Actualizate pin-urile SDK învechite astfel încât fiecare mostră să urmărească versiunea MCP curentă, conform convenției de la nivelul întregului repo:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Pin-ul `@modelcontextprotocol/sdk` fost urcat de la `^1.8.0` la `>=1.26.0` și descrierea pachetului `"updated for MCP 2025-06-18"` a fost schimbată în `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** și **lab4/code/github_mcp_server/pyproject.toml**: Pin-ul exact `mcp==1.23.0` a fost urcat la `mcp>=1.26.0`; ambele fișiere `uv.lock` au fost regenerate (`uv lock`) astfel încât lockfile-urile să rezolve la `mcp 1.27.2` curent și să rămână sincronizate cu manifesturile

#### Analiză lacune curriculum — Acoperirea funcționalităților celei mai recente specificații

S-a verificat că curriculumul acoperă deja toate primitivele introduse/extinse în MCP 2025-11-25, fără lacune de conținut:
- **Sampling**: Lecția 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (incl. mod URL)**: Documentat în 01-CoreConcepts și 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Documentat în 00-Introduction, 01-CoreConcepts și 05-AdvancedTopics/mcp-root-contexts
- **Tasks (operațiuni experimentale, de durată lungă)**: Documentat în 01-CoreConcepts și 05-AdvancedTopics/mcp-protocol-features
- **Anotări de instrumente** (`readOnlyHint` / `destructiveHint`): Documentat în 01-CoreConcepts și 05-AdvancedTopics/mcp-protocol-features

### Întărire securitate & Remedierea vulnerabilităților de dependență

A fost efectuat un audit complet de securitate pentru fiecare manifest de dependențe și codul sursă al mostrelor, apoi s-au rezolvat toate alertările npm raportate și o problemă la nivel de cod. După remediere, `npm audit` raportează **0 vulnerabilități** pentru fiecare director auditat.

#### Vulnerabilități ale dependențelor npm (transitive) — Rezolvate

Auditate toate cele 15 fișiere `package-lock.json` comise. Vulnerabilitățile au fost limitate la dependențele transitive trase de instrumentul MCP Inspector, clientul OpenAI și SDK-ul MCP; toate au fost rezolvate fără a strica mostrele:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** și **lab3/code/weather_mcp/inspector**: Pin-ul `@modelcontextprotocol/inspector` a fost urcat (`0.16.6` / `0.14.1` → `0.22.0`), ceea ce a eliminat alertările pentru `ajv`, `brace-expansion`, `diff`, `path-to-regexp` și `ws` din pachetul bundle; a fost adăugat un override npm care forțează patch-ul `shell-quote@1.8.4` pentru a elimina alerta critică rămasă prin `concurrently`; ambele lockfile-uri au fost regenerate (acum 0 vulnerabilități)
- **03-GettingStarted/samples/typescript**: `npm audit fix` a actualizat dependența tranzitivă `qs` (moderată) la o versiune patch-uită
- **03-GettingStarted/samples/javascript**: `npm audit fix` a actualizat dependența tranzitivă `hono` (moderată) la o versiune patch-uită
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` a actualizat dependența tranzitivă `form-data` (ridicată) la o versiune patch-uită
- **03-GettingStarted/11-simple-auth/solution/typescript**: A fost generat `package-lock.json` lipsă, astfel proiectul este reproducibil și auditabil (0 vulnerabilități)

#### Fix de securitate la nivel de cod (OWASP A03: Injecție)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: A fost eliminat `shell=True` din instrumentul `open_in_vscode`. Comanda anterior `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitea caracterelor speciale din calea folderului să fie interpretate de `cmd.exe` (vector de injecție comenzi). Acum se lansează direct executabilul `Code.exe` cu folderul ca argument — fără shell — ceea ce este echivalent funcțional și sigur

#### Audit de dependențe Python

- Au fost auditate toate seturile de cerințe Python cu `pip-audit`. `05-AdvancedTopics` și `03-GettingStarted/samples/python` nu au raportat **vulnerabilități cunoscute** (range-urile lor pentru `mcp` / `httpx` / `pydantic` / `python-dotenv` rezolvă la versiuni patch-uite curente)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` a marcat dependența tranzitivă **`werkzeug` 3.1.1** cu trei vulnerabilități DoS la Windows device-name în funcția `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, și `CVE-2026-27199` (toate remediate în 3.1.6). Am adăugat un pin explicit de securitate `werkzeug>=3.1.6` pentru a rezolva versiunea patch-uită; s-a verificat că restricția se rezolvă corect cu stiva `chainlit` / `mcp` / `semantic-kernel`

### Rebranding nume produs

Toat conținutul curriculumului a fost actualizat pentru a reflecta rebranding-ul produselor Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: A fost actualizat linkul către comunitatea Discord
- **AGENTS.md**: Referința la serverul Discord a fost actualizată
- **README.md**: Referințele ecostistemului tehnologic au fost actualizate
- **study_guide.md**: Referințele studiilor de caz au fost actualizate
- **05-AdvancedTopics/README.md**: Titlul și descrierea modulului 5.13 au fost actualizate
- **05-AdvancedTopics/mcp-integration/README.md**: Titlul și descrierea secțiunii au fost actualizate
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Titlul complet și conținutul modulului au fost actualizate
- **05-AdvancedTopics/mcp-security-entra/README.md**: Link-ul de referință încrucișată a fost actualizat
- **07-LessonsfromEarlyAdoption/README.md**: Referințele studiilor de caz au fost actualizate
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Titlul Secțiunii 9, badge-urile și capabilitățile au fost actualizate
- **08-BestPractices/README.md**: A fost actualizat linkul comunității Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Referința la canalul Discord a fost actualizată
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Referința implementării modelului a fost actualizată
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Tabelul serviciilor AI a fost actualizat
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Referințele resurselor au fost actualizate

#### AI Toolkit / AITK → Extensia Microsoft Foundry Toolkit pentru VS Code
- **README.md**: Referințele principale din curriculum au fost actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Titlul modulului, overview-ul și toate titlurile secțiunilor din modul au fost actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Titlul, obiectivele de învățare, instrucțiunile de configurare și resursele au fost actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Titlul, obiectivele de învățare, tabelul host-urilor MCP și referințele încrucișate au fost actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Titlul, badge-urile, prerechizitele și resursele au fost actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Referințele Agent Builder și link-ul de feedback au fost actualizate
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Prerechizitele și referințele la extensie au fost actualizate

---

## 11 aprilie 2026

### Lecție nouă, corecturi documentație și actualizări de dependențe

#### Conținut nou adăugat în curriculum

**Modul 05 - Subiecte Avansate**
- **Lecția 5.17: Raționament multi-agent adversarial cu MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ghid complet nou care acoperă modelul de dezbatere adversarială pentru sisteme multi-agent  
  - Diagramă de arhitectură Mermaid: doi agenți → server MCP comun → transcrierea dezbaterii → judecător → verdict  
  - Server MCP comun pentru unelte (`web_search` + `run_python`) implementat în Python și TypeScript  
  - Prompteri opuși de sistem (PENTRU / CONTRA / Judecător) cu cerințe explicite pentru utilizarea uneltelor  
  - Orchestrator pentru dezbatere în Python, TypeScript și C# care gestionează runde și rutarea argumentelor  
  - Legătura MCP `ClientSession` pentru orchestrator la apeluri reale de unelte  
  - Tabel cu cazuri de utilizare (detecția halucinațiilor, modelarea amenințărilor, revizuirea designului API, verificarea faptelor, selecția tehnologiei)  
  - Considerații de securitate: execuție sandboxată, validarea apelului de unelte, limitarea ratei, jurnalizare audit  
  - Exercițiu structurat cu trei scenarii practice (revizuirea codului, decizie de arhitectură, moderarea conținutului)

#### Corecturi documentație

**Modul 03 - Începutul**
- **05-stdio-server/README.md**: Corectat exemplul incomplet de server TypeScript stdio — adăugat instanțierea transportului lipsă (`new StdioServerTransport()`) și apelul `server.connect(transport)` pentru a corespunde exemplelor Python și .NET din aceeași secțiune
- **14-sampling/README.md**: Corectat typo — corectat `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Actualizări curriculum

**README.md principală**
- A fost adăugat rândul 5.17 (Raționament multi-agent adversarial cu MCP) în tabelul curriculumului cu link direct spre lecția nouă

**05-AdvancedTopics/README.md**
- A fost adăugat rândul pentru Lecția 5.17 în tabelul lecțiilor

**study_guide.md**
- A fost adăugat subiectul Raționament multi-agent adversarial în harta mentală și descrierea în proză a Temelor Avansate

#### Corecturi de cod și securitate

**Modul 05 - Agenți adversariali (`mcp-adversarial-agents`)**
- **Fixare de securitate — injecție de comandă**: Înlocuit interpolarea shell `execSync` cu `execFile` + `promisify` în instrumentul TypeScript `run_python`, eliminând suprafața de injecție a comenzilor (codul controlat de LLM este acum transmis ca un element argv literal, fără implicarea shell-ului)
- **Cablare buclă instrument MCP**: Actualizat orchestratorul Python pentru dezbatere pentru a folosi clientul `AsyncAnthropic` (înlocuind `Anthropic` sincron blocant), transmiterea directă a unei sesiuni live `ClientSession` fiecărui agent în turul său, preluarea definițiilor instrumentelor prin `session.list_tools()` la fiecare tur și trimiterea blocurilor `tool_use` prin `session.call_tool()` într-o buclă până când modelul emite un răspuns final în text

#### Actualizări de dependențe

- Actualizat `hono` la 4.12.12 în mai multe pachete (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Actualizat `@hono/node-server` de la 1.19.11 la 1.19.13 în pachetele TypeScript
- Actualizat `cryptography` de la 46.0.5 la 46.0.7 în pachetele Python (10-StreamliningAIWorkflows laboratoarele 3 și 4)
- Actualizat `lodash` de la 4.17.23 la 4.18.1 în inspectorul 10-StreamliningAIWorkflows

#### Traduceri

- Sincronizat traducerile pentru peste 48 de limbi cu cele mai recente schimbări ale sursei (actualizare i18n)

---

## 5 februarie 2026

### Îmbunătățiri generale de validare și navigare în repo

#### Conținut nou adăugat în curriculum

**Modulul 03 - Începutul lucrului**
- **12-mcp-hosts/README.md**: Ghid nou și cuprinzător pentru configurarea gazdelor MCP
  - Exemple de configurare Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Șabloane de configurare JSON pentru toate gazdele majore
  - Tabel comparativ al tipurilor de transport (stdio, SSE/HTTP, WebSocket)
  - Soluționarea problemelor comune de conexiune
  - Cele mai bune practici de securitate pentru configurarea gazdelor

- **13-mcp-inspector/README.md**: Ghid nou pentru depanarea MCP Inspector
  - Metode de instalare (npx, npm global, din sursă)
  - Conectarea la servere prin stdio și HTTP/SSE
  - Instrumente de testare, resurse și fluxuri de lucru cu promturi
  - Integrarea VS Code cu MCP Inspector
  - Scenarii comune de depanare cu soluții

**Modulul 04 - Implementare practică**
- **pagination/README.md**: Ghid nou pentru implementarea paginării
  - Modele de paginare bazate pe cursor în Python, TypeScript, Java
  - Gestionarea paginării pe client
  - Strategii de proiectare a cursorului (opac vs. structurat)
  - Recomandări pentru optimizarea performanței

**Modulul 05 - Subiecte avansate**
- **mcp-protocol-features/README.md**: Explorare aprofundată a noilor caracteristici ale protocolului
  - Implementarea notificărilor de progres
  - Modele de anulare a cererilor
  - Șabloane de resurse cu modele URI
  - Gestionarea ciclului de viață al serverului
  - Controlul nivelului de logare
  - Modele de gestionare a erorilor cu coduri JSON-RPC

#### Corecturi de navigare (peste 24 de fișiere actualizate)

**README-urile modulului principal**  
Acum conțin linkuri atât către prima lecție, cât și către modulul următor

**Sub-fișierele 02-Security**  
Toate cele 5 documente suplimentare de securitate au acum navigare „Ce urmează”:

**Fișierele 09-CaseStudy**  
Toate fișierele studiilor de caz au navigare secvențială acum:

**Laboratoarele 10-StreamliningAI**  
Adăugat secțiunea Ce urmează la prezentarea modulului 10 și în modulul 11

#### Corecturi de cod și conținut

**Actualizări SDK și dependențe**  
Corectat versiunea openai goală la `^4.95.0`  
Actualizat SDK de la `^1.8.0` la `>=1.26.0`  
Actualizate fixările versiunii mcp la `>=1.26.0`

**Corecturi de cod**  
Corectat model invalid `gpt-4o-mini` la `gpt-4.1-mini`

**Corecturi de conținut**  
Corectat link spart `READMEmd` → `README.md`, corectat antet curriculum `Module 1-3` → `Module 0-3`, corectat cale sensibilă la majuscule/minuscule  
Eliminat conținut duplicat corupt pentru Studiul de caz 5

**Îmbunătățiri pentru începători**  
Adăugată o introducere corectă, obiective de învățare și precondiții pentru începători

#### Actualizări curriculum

**README principal.md**  
- Adăugate intrări 3.12 (Gazdele MCP), 3.13 (Inspector MCP), 4.1 (Paginare), 5.16 (Caracteristici Protocol) în tabelul curriculumului

**README-urile modulelor**  
Adăugate lecțiile 12 și 13 în lista lecțiilor  
Adăugată secțiunea Ghiduri practice cu link către paginare  
Adăugate lecțiile 5.15 (Transport personalizat) și 5.16 (Caracteristici Protocol)

**study_guide.md**  
- Actualizat mindmap cu toate topicurile noi: Configurare gazde MCP, Inspector MCP, Strategii de paginare, Explorare detaliată a caracteristicilor protocolului

## 28 ianuarie 2026

### Revizuire conformitate specificație MCP 2025-11-25

#### Îmbunătățiri conceptuale de bază (01-CoreConcepts/)
- **Client primitiv nou - Roots**: Documentație completă adăugată privind primitivul client Roots, care permite serverelor să înțeleagă limitele sistemului de fișiere și permisiunile de acces  
- **Anotări pentru instrumente**: Documentație adăugată despre anotările comportamentale ale instrumentelor (`readOnlyHint`, `destructiveHint`) pentru decizii mai bune de executare a instrumentelor  
- **Apelarea instrumentelor în Sampling**: Documentația Sampling actualizată pentru a include parametrii `tools` și `toolChoice` pentru invocarea instrumentelor conduse de model în timpul cererilor de sampling  
- **Elicitare în mod URL**: Documentație adăugată pentru elicitarea bazată pe URL pentru interacțiuni externe inițiate de server  
- **Task-uri (Experimental)**: Secțiune nouă adăugată pentru documentarea caracteristicii experimentale Task pentru execuții durabile și extragerea rezultatelor deferate  
- **Suport icoane**: Menționat că instrumentele, resursele, șabloanele de resurse și promturile pot include acum icoane ca metadate suplimentare

#### Actualizări documentație  
- **README.md**: Referință la versiunea MCP Specification 2025-11-25 și explicație despre versionarea bazată pe dată  
- **study_guide.md**: Hartă curriculum actualizată pentru a include Task-uri și Anotări Instrumente în secțiunea Core Concepts; actualizat timestamp document

#### Verificare conformitate specificație  
- **Versiune protocol**: Confirmat că toate documentațiile fac referire la MCP Specification 2025-11-25  
- **Aliniere arhitecturală**: Confirmată precizia documentației arhitecturii în două straturi (Strat Date + Strat Transport)  
- **Documentație primitive**: Validare pentru primitivele server (Resurse, Promturi, Instrumente) și primitive client (Sampling, Elicitare, Logare, Roots)  
- **Mecanisme de transport**: Confirmată exactitatea documentației pentru transportul STDIO și HTTP Streamable  
- **Ghid de securitate**: Confirmată alinierea cu documentația actuală MCP Security Best Practices

#### Caracteristici cheie MCP 2025-11-25 documentate  
- **Descoperire OpenID Connect**: Descoperire server de autentificare prin OIDC  
- **Documente metadate OAuth Client ID**: Mecanism recomandat de înregistrare client  
- **JSON Schema 2020-12**: Dialect implicit pentru definițiile schemei MCP  
- **Sistem de clasificare SDK**: Cerințe formale pentru suportul caracteristicilor și mentenanța SDK  
- **Structura de guvernare**: Grupuri de lucru și grupuri de interes formalizate în guvernarea MCP

### Actualizare majoră documentație securitate (02-Security/)

#### Integrare MCP Security Summit Workshop (Sherpa)  
- **Resursă nouă de training hands-on**: Integrare completă cu [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) pe tot parcursul documentației de securitate  
- **Acoperire traseu expediție**: Documentat progresul complet de la Base Camp până la Summit  
- **Aliniere OWASP**: Toate ghidurile de securitate mapate acum pe riscurile OWASP MCP Azure Security Guide

#### Integrarea OWASP MCP Top 10  
- **Secțiune nouă**: Tabel cu riscuri OWASP MCP Top 10 și măsuri de atenuare Azure în README principal de securitate  
- **Documentație bazată pe riscuri**: Actualizat mcp-security-controls-2025.md cu referințe la riscurile OWASP MCP pentru fiecare domeniu de securitate  
- **Arhitectură de referință**: Legături către arhitectura de referință și modele de implementare OWASP MCP Azure Security Guide

#### Fișiere de securitate actualizate  
- **README.md**: Adăugat prezentare generală a Sherpa Workshop, tabel traseu expediție, sumar riscuri OWASP MCP Top 10 și secțiune training hands-on  
- **mcp-security-controls-2025.md**: Header actualizat la februarie 2026, adăugate referințe riscuri OWASP MCP (MCP01-MCP08), corectată neconcordanță versiune specificație  
- **mcp-security-best-practices-2025.md**: Adăugat secțiune resurse Sherpa și OWASP, timestamp actualizat  
- **mcp-best-practices.md**: Adăugată secțiune training hands-on cu linkuri Sherpa și OWASP  
- **azure-content-safety-implementation.md**: Adăugat referință OWASP MCP06, aliniere Sherpa Camp 3 și secțiune resurse suplimentare

#### Link-uri noi către resurse adăugate  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Pagini individuale ale riscurilor OWASP MCP (MCP01-MCP10)

### Aliniere MCP Specification 2025-11-25 în întreg curriculumul

#### Modul 03 - Începutul lucrului  
- **Documentație SDK**: Adăugat Go SDK în lista oficială de SDK-uri; actualizate toate referințele SDK pentru a se alinia MCP Specification 2025-11-25  
- **Clarificare transport**: Actualizate descrierile transportului STDIO și HTTP Streaming cu referințe explicite la specificație

#### Modul 04 - Implementare practică  
- **Actualizări SDK**: Adăugat Go SDK; lista SDK actualizată cu referință la versiunea specificației  
- **Specificație autorizare**: Linkul la MCP Authorization actualizat la versiunea curentă 2025-11-25

#### Modul 05 - Subiecte avansate  
- **Caracteristici noi**: Adăugată notă despre noile caracteristici MCP Specification 2025-11-25 (Task-uri, Anotări instrumente, Elicitare mod URL, Roots)  
- **Resurse securitate**: Adăugat linkuri OWASP MCP Top 10 și Sherpa workshop la referințele suplimentare

#### Modul 06 - Contribuții comunitare  
- **Listă SDK**: Adăugate Swift și Rust SDK-uri; link specificație actualizat la 2025-11-25  
- **Referință specificație**: Linkul MCP Specification actualizat la URL-ul direct al specificației

#### Modul 07 - Lecții din adopția timpurie  
- **Actualizări resurse**: Adăugat link MCP Specification 2025-11-25 și OWASP MCP Top 10 la resurse suplimentare

#### Modul 08 - Cele mai bune practici  
- **Versiune specificație**: Actualizată referința MCP Specification la 2025-11-25  
- **Resurse securitate**: Adăugat OWASP MCP Top 10 și Sherpa workshop la referințele suplimentare

#### Modul 10 - Optimizarea fluxurilor de lucru AI  
- **Actualizare insignă**: Modificat insigna versiune MCP de la versiunea SDK (1.9.3) la versiunea specificației (2025-11-25)  
- **Linkuri resurse**: Actualizat link MCP Specification; adăugat OWASP MCP Top 10

#### Modul 11 - Laboratoare practice MCP Server  
- **Referință specificație**: Link MCP Specification actualizat la versiunea 2025-11-25  
- **Resurse securitate**: Adăugat OWASP MCP Top 10 la resursele oficiale

## 18 decembrie 2025

### Actualizare documentație securitate - MCP Specification 2025-11-25

#### Cele mai bune practici de securitate MCP (02-Security/mcp-best-practices.md) - Actualizare versiune specificație  
- **Actualizare versiune protocol**: Actualizat să facă referire la cea mai recentă MCP Specification 2025-11-25 (lansată pe 25 noiembrie 2025)  
  - Modificate toate referințele de versiune ale specificației de la 2025-06-18 la 2025-11-25  
  - Actualizate referințele de dată din document de la 18 august 2025 la 18 decembrie 2025  
  - Verificat ca toate URL-urile specificației să indice documentația curentă  
- **Validare conținut**: Validare completă a celor mai bune practici de securitate conform celor mai recente standarde  
  - **Soluții Microsoft Security**: Verificat terminologia și linkurile curente pentru Prompt Shields (anterior "Detecție risc jailbreak"), Azure Content Safety, Microsoft Entra ID și Azure Key Vault  
  - **Securitate OAuth 2.1**: Confirmată alinierea cu cele mai bune practici de securitate OAuth recente  
  - **Standardele OWASP**: Validat că referințele OWASP Top 10 pentru LLM-uri sunt actuale  
  - **Servicii Azure**: Verificat toate linkurile documentației Microsoft Azure și cele mai bune practici  
- **Aliniere la standarde**: Confirmate toate standardele de securitate referențiate  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - Cele mai bune practici OAuth 2.1 Security  
  - Cadre de securitate și conformitate Azure  
- **Resurse implementare**: Verificate toate linkurile ghidurilor de implementare și resurselor  
  - Modele de autentificare Azure API Management  
  - Ghiduri integrare Microsoft Entra ID  
  - Gestionarea secretelor Azure Key Vault  
  - Soluții DevSecOps pentru pipeline-uri și monitorizare

### Asigurarea calității documentației  
- **Conformitate specificație**: Asigurat că toate cerințele obligatorii MCP privind securitatea (TREBUIE/TREBUIE SĂ NU) sunt aliniate cu specificația actuală  
- **Actualitate resurse**: Verificat toate linkurile externe către documentația Microsoft, standardele de securitate și ghidurile de implementare  
- **Acoperire bune practici**: Confirmată acoperirea completă a autentificării, autorizării, amenințărilor specifice AI, securității lanțului de aprovizionare și modelelor enterprise

## 6 octombrie 2025

### Extinderea secțiunii Început – Utilizare avansată server & Autentificare simplă

#### Utilizare avansată server (03-GettingStarted/10-advanced)  
- **Capitol nou adăugat**: Introducere a unui ghid complet pentru utilizarea avansată a serverului MCP, acoperind atât arhitectura serverului regulat, cât și cea la nivel scăzut.
  - **Server obișnuit vs. server la nivel jos**: Comparație detaliată și exemple de cod în Python și TypeScript pentru ambele abordări.
  - **Design bazat pe handler**: Explicație a gestionării instrumentelor/resurselor/prompturilor bazate pe handler pentru implementări scalabile și flexibile ale serverului.
  - **Tipare practice**: Scenarii din lumea reală în care tiparele serverelor la nivel jos sunt benefice pentru caracteristici și arhitecturi avansate.

#### Autentificare simplă (03-GettingStarted/11-simple-auth)
- **Capitol nou adăugat**: Ghid pas cu pas pentru implementarea autentificării simple în serverele MCP.
  - **Concepte autentificare**: Explicație clară a autentificării vs. autorizării și manipulării acreditărilor.
  - **Implementare bazică a autentificării**: Tipare de autentificare bazate pe middleware în Python (Starlette) și TypeScript (Express), cu mostre de cod.
  - **Progresie către securitate avansată**: Îndrumări pentru a începe cu autentificarea simplă și a avansa către OAuth 2.1 și RBAC, cu referințe către module avansate de securitate.

Aceste completări oferă îndrumări practice, aplicate pentru construirea unor implementări MCP mai robuste, securizate și flexibile, realizând o punte între conceptele fundamentale și tiparele avansate de producție.

## 29 Septembrie 2025

### Laboratoare de integrare a bazei de date MCP Server - Parcurs complet practic de învățare

#### 11-MCPServerHandsOnLabs - Curriculum complet nou de integrare a bazei de date
- **Parcurs complet cu 13 laboratoare**: Curriculum practic complet pentru construirea serverelor MCP gata de producție cu integrare PostgreSQL
  - **Implementare din lumea reală**: Caz de utilizare Zava Retail analytics demonstrând tipare de nivel enterprise
  - **Progresie de învățare structurată**:
    - **Laboratoarele 00-03: Bazele** - Introducere, arhitectură de bază, securitate și multi-tenancy, configurarea mediului
    - **Laboratoarele 04-06: Construirea serverului MCP** - Proiectarea bazei de date și schema, implementarea serverului MCP, dezvoltarea instrumentelor  
    - **Laboratoarele 07-09: Funcționalități avansate** - Integrare căutare semantică, testare & depanare, integrare VS Code
    - **Laboratoarele 10-12: Producție și bune practici** - Strategii de implementare, monitorizare & observabilitate, bune practici & optimizare
  - **Tehnologii enterprise**: Framework FastMCP, PostgreSQL cu pgvector, embeddinguri Azure OpenAI, Azure Container Apps, Application Insights
  - **Funcționalități avansate**: Securitate la nivel de rând (RLS), căutare semantică, acces multi-tenant la date, embeddinguri vectoriale, monitorizare în timp real

#### Standardizarea terminologiei - Conversie modul → laborator
- **Actualizare completă documentație**: Toate fișierele README din 11-MCPServerHandsOnLabs au fost actualizate sistematic să folosească terminologia „Laborator” în loc de „Modul”
  - **Antete secțiuni**: Schimbat „Ce acoperă acest modul” în „Ce acoperă acest laborator” în toate cele 13 laboratoare
  - **Descrierea conținutului**: Modificat „Acest modul oferă...” în „Acest laborator oferă...” în toată documentația
  - **Obiective de învățare**: Modificat „Până la sfârșitul acestui modul...” în „Până la sfârșitul acestui laborator...”
  - **Legături de navigare**: Toate referințele „Modul XX:” convertite în „Laborator XX:” în legăturile și referințele transversale
  - **Urmărirea finalizării**: Modificat „După finalizarea acestui modul...” în „După finalizarea acestui laborator...”
  - **Referințe tehnice păstrate**: Referințe către module Python menținute în fișierele de configurare (de ex., `"module": "mcp_server.main"`)

#### Îmbunătățirea ghidului de studiu (study_guide.md)
- **Hartă vizuală a curricumului**: Secțiune nouă „11. Laboratoare de integrare a bazei de date” adăugată cu vizualizarea structurii laboratoarelor
- **Structura depozitului**: Actualizată de la zece la unsprezece secțiuni principale, descriere detaliată 11-MCPServerHandsOnLabs
- **Îndrumare traseu de învățare**: Instrucțiuni de navigare extinse să acopere secțiunile 00-11
- **Acoperire tehnologică**: Adăugate detalii despre FastMCP, PostgreSQL, integrarea serviciilor Azure
- **Rezultate de învățare**: Accent pe dezvoltarea serverelor gata pentru producție, tipare de integrare a bazei de date și securitate enterprise

#### Îmbunătățirea structurii README principal
- **Terminologie bazată pe laboratoare**: README.md principal din 11-MCPServerHandsOnLabs actualizat să folosească consecvent structura „Laborator”
- **Organizarea traseului de învățare**: Progresie clară de la concepte fundamentale la implementări avansate și implementare în producție
- **Focalizare pe lumea reală**: Accent pe învățare practică, aplicată cu tipare și tehnologii la nivel enterprise

### Îmbunătățiri calitate și consistență documentație
- **Accent pe învățare practică**: Abordare consolidată, bazată pe laboratoare în întreaga documentație
- **Focus pe tipare enterprise**: Evidențierea implementărilor gata de producție și considerații de securitate enterprise
- **Integrarea tehnologică**: Acoperire completă a serviciilor moderne Azure și a tiparelor de integrare AI
- **Progresia învățării**: Parcurs clar, structurat de la concepte de bază la implementare în producție

## 26 Septembrie 2025

### Îmbunătățirea studiilor de caz - Integrare GitHub MCP Registry

#### Studii de caz (09-CaseStudy/) - Focus dezvoltare ecosistem
- **README.md**: Extindere majoră cu studiu de caz cuprinzător despre GitHub MCP Registry
  - **Studiu de caz GitHub MCP Registry**: Studiu de caz complet privind lansarea GitHub MCP Registry în septembrie 2025
    - **Analiza problemei**: Examinare detaliată a fragmentării descoperirii și implementării serverelor MCP
    - **Arhitectura soluției**: Abordarea registrului centralizat GitHub cu instalare VS Code cu un singur clic
    - **Impact de afaceri**: Îmbunătățiri măsurabile în onboarding-ul dezvoltatorilor și productivitate
    - **Valoare strategică**: Focus pe implementarea modulară de agenți și interoperabilitatea între unelte
    - **Dezvoltare ecosistem**: Poziționare ca platformă fundamentală pentru integrarea agentică
  - **Structură îmbunătățită studii de caz**: Toate cele șapte studii de caz actualizate cu formatare consistentă și descrieri cuprinzătoare
    - Azure AI Travel Agents: Accent pe orchestrarea multi-agent
    - Integrare Azure DevOps: Focus pe automatizarea fluxurilor de lucru
    - Recuperare documentație în timp real: Implementare client consolă Python
    - Generator plan de studiu interactiv: Aplicație web conversațională Chainlit
    - Documentație în editor: Integrare VS Code și GitHub Copilot
    - Azure API Management: Tipare pentru integrarea API enterprise
    - GitHub MCP Registry: Dezvoltare ecosistem și platformă comunitară
  - **Concluzie cuprinzătoare**: Secțiune rescrisă evidențiind cele șapte studii de caz ce acoperă multiple dimensiuni de implementare MCP
    - Integrare enterprise, orchestrare multi-agent, productivitate dezvoltatori
    - Dezvoltare ecosistem, categorii de aplicații educaționale
    - Perspective extinse asupra tiparelor arhitecturale, strategiilor de implementare și bunelor practici
    - Accent pe MCP ca protocol matur, gata de producție

#### Actualizări ghid de studiu (study_guide.md)
- **Hartă vizuală a curricumului**: Mindmap actualizat să includă GitHub MCP Registry în secțiunea Studii de caz
- **Descriere studii de caz**: Îmbunătățită de la descrieri generice la defalcări detaliate pentru cele șapte studii de caz cuprinzătoare
- **Structura depozitului**: Secțiunea 10 actualizată pentru a reflecta acoperirea completă a studiilor de caz cu detalii specifice de implementare
- **Integrare changelog**: Intrare din 26 septembrie 2025 documentând adăugarea GitHub MCP Registry și îmbunătățiri studiilor de caz
- **Actualizare dată**: Timestamp-ul din footeri actualizat pentru ultima revizie (26 septembrie 2025)

### Îmbunătățiri calitate documentație
- **Îmbunătățirea consistenței**: Formatare și structurare standardizată pentru toate cele șapte studii de caz
- **Acoperire cuprinzătoare**: Studii de caz acoperind scenarii enterprise, productivitate dezvoltatori și dezvoltare ecosistem
- **Poziționare strategică**: Accent consolidat pe MCP ca platformă fundamentală pentru implementarea sistemelor agentice
- **Integrare resurse**: Actualizare resurse adiționale pentru a include link către GitHub MCP Registry

## 15 Septembrie 2025

### Extindere subiecte avansate - Transporturi personalizate & ingineria contextului

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Ghid complet implementare avansată
- **README.md**: Ghid complet pentru implementarea mecanismelor personalizate de transport MCP
  - **Transport Azure Event Grid**: Implementare completă serverless, bazată pe evenimente
    - Exemple C#, TypeScript și Python cu integrare Azure Functions
    - Tipare arhitecturale bazate pe evenimente pentru soluții MCP scalabile
    - Receptori webhook și gestionarea mesajelor prin push
  - **Transport Azure Event Hubs**: Implementare streaming cu throughput ridicat
    - Capabilități de streaming în timp real pentru scenarii cu latență scăzută
    - Strategii de partiționare și gestionare checkpoint
    - Batching de mesaje și optimizare performanță
  - **Tipare integrare enterprise**: Exemple arhitecturale gata de producție
    - Procesare MCP distribuită pe multiple Azure Functions
    - Arhitecturi hibride de transport combinând mai multe tipuri
    - Durabilitate, fiabilitate și strategii de tratare a erorilor pentru mesaje
  - **Securitate & monitorizare**: Integrare Azure Key Vault și tipare de observabilitate
    - Autentificare cu identitate gestionată și acces cu cel mai mic privilegiu
    - Telemetrie Application Insights și monitorizare performanță
    - Circuit breakers și tipare de toleranță la defecte
  - **Framework-uri de testare**: Strategii complete de testare pentru transporturi personalizate
    - Testare unitară cu dubluri și mock-uri
    - Testare integrată cu Azure Test Containers
    - Considerații pentru testare performanță și încărcare

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Disciplină AI emergentă
- **README.md**: Explorare cuprinzătoare a ingineriei contextului ca domeniu emergent
  - **Principii de bază**: Partajare completă a contextului, conștientizare decizii acțiune, gestionarea ferestrei context
  - **Aliniere cu protocol MCP**: Cum designul MCP abordează provocările ingineriei contextului
    - Limitări ferestre context și strategii de încărcare progresivă
    - Determinare relevanță și recuperare dinamică context
    - Gestionare multimodală a contextului și considerații securitate
  - **Abordări implementare**: Arhitecturi single-thread vs multi-agent
    - Tehnici de împărțire (chunking) și prioritizare context
    - Încărcare progresivă și compresie
    - Abordări stratificate și optimizare recuperare context
  - **Cadru de măsurare**: Metode emergente pentru evaluarea eficienței contextului
    - Eficiență input, performanță, calitate, experiență utilizator
    - Abordări experimentale pentru optimizare
    - Analiza defectelor și metodologii de îmbunătățire

#### Actualizări navigare curriculum (README.md)
- **Structură modul îmbunătățită**: Tabelul curriculum actualizat pentru a include subiecte avansate noi
  - Adăugate intrări Context Engineering (5.14) și Custom Transport (5.15)
  - Formatări și linkuri de navigare consecvente în toate modulele
  - Descrieri actualizate reflectând conținutul actual

### Îmbunătățiri structură directoare
- **Standardizare denumiri**: „mcp transport” redenumit în „mcp-transport” pentru consistență cu celelalte foldere subiecte avansate
- **Organizare conținut**: Toate folderele 05-AdvancedTopics urmează acum modelul de denumire consecvent (mcp-[subiect])

### Îmbunătățiri calitate documentație
- **Aliniere specificație MCP**: Toate conținuturile noi se referă la MCP Specification 2025-06-18
- **Exemple multi-limbaj**: Cod complet în C#, TypeScript și Python
- **Focus enterprise**: Tipare gata de producție și integrare Azure cloud
- **Documentație vizuală**: Diagrame Mermaid pentru arhitectură și vizualizare flux

## 18 August 2025

### Actualizare completă documentație - Standardele MCP 2025-06-18

#### Bune practici securitate MCP (02-Security/) - Modernizare completă
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Rescriere completă aliniată cu MCP Specification 2025-06-18
  - **Cerinte obligatorii**: Adăugate cerințe explicite MUST/MUST NOT din specificația oficială cu indicatori vizuali clari
  - **12 practici principale de securitate**: Restructurat din listă de 15 puncte în domenii securitate cuprinzătoare
    - Securitate token & autentificare cu integrare furnizor identitate extern
    - Management sesiune & securitate transport cu cerințe criptografice
    - Protecție amenințări specifice AI cu integrare Microsoft Prompt Shields
    - Control acces & permisiuni cu principiul privilegiului minim
    - Siguranță conținut & monitorizare cu integrare Azure Content Safety
    - Securitate lanț aprovizionare cu verificare completă componente
    - Securitate OAuth & prevenire confused deputy cu implementare PKCE
    - Răspuns la incidente & recuperare cu capabilități automatizate
    - Conformitate & guvernanță cu aliniere reglementări
    - Controale avansate securitate cu arhitectură zero trust
    - Integrare ecosistem securitate Microsoft cu soluții cuprinzătoare
    - Evoluție continuă securitate cu practici adaptive
  - **Soluții Microsoft Security**: Îndrumări consolidate privind integrarea Prompt Shields, Azure Content Safety, Entra ID și GitHub Advanced Security
  - **Resurse implementare**: Linkuri cuprinzătoare organizate după Documentație oficială MCP, Soluții securitate Microsoft, Standarde securitate și Ghiduri de implementare

#### Controale securitate avansate (02-Security/) - Implementare enterprise
- **MCP-SECURITY-CONTROLS-2025.md**: Restructurare completă cu cadru de securitate enterprise
  - **9 domenii securitate cuprinzătoare**: Extinse de la controale de bază la cadru de securitate detaliat enterprise
    - Autentificare & autorizare avansată cu integrare Microsoft Entra ID
    - Securitate token & controale anti-passthrough cu validare cuprinzătoare
    - Controale de securitate sesiune cu prevenire hijacking
    - Controale securitate specifice AI cu prevenire prompt injection și intoxicare instrumente
    - Prevenirea atacurilor confused deputy cu securitate proxy OAuth
    - Securitate execuție unelte cu sandboxing și izolare
    - Controale securitate lanț aprovizionare cu verificare dependențe
    - Controale monitorizare & detecție cu integrare SIEM
    - Răspuns la incidente & recuperare cu capabilități automatizate
  - **Exemple implementare**: Blocuri YAML detaliate și exemple de cod adăugate
  - **Integrare soluții Microsoft**: Acoperire completă servicii securitate Azure, GitHub Advanced Security și management identitate enterprise

#### Subiecte avansate securitate (05-AdvancedTopics/mcp-security/) - Implementare gata de producție
- **README.md**: Rescriere completă pentru implementare securitate enterprise
  - **Aliniere specificație curentă**: Actualizat la MCP Specification 2025-06-18 cu cerințe obligatorii securitate
  - **Autentificare îmbunătățită**: Integrare Microsoft Entra ID cu exemple complete .NET și Java Spring Security
  - **Integrare securitate AI**: Implementare Microsoft Prompt Shields și Azure Content Safety cu exemple detaliate Python
  - **Mitigare amenințări avansate**: Exemple complete implementare pentru
    - Prevenirea atacurilor confused deputy cu PKCE și validare consimțământ utilizator
    - Prevenirea passthrough token cu validare audiență și gestionare securizată token
    - Prevenirea deturnării sesiunii prin legare criptografică și analiză comportamentală
  - **Integrare de Securitate pentru Întreprinderi**: Monitorizare Azure Application Insights, fluxuri de detectare a amenințărilor și securitatea lanțului de aprovizionare
  - **Listă de Verificare pentru Implementare**: Controale de securitate clare obligatorii vs. recomandate cu beneficii din ecosistemul de securitate Microsoft

### Calitatea Documentației & Alinierea la Standardele
- **Referințe la Specificații**: Actualizate toate referințele la Specificația MCP 2025-06-18 curentă
- **Ecosistemul de Securitate Microsoft**: Ghiduri de integrare îmbunătățite în întreaga documentație de securitate
- **Implementare Practică**: Adăugate exemple detaliate de cod în .NET, Java și Python cu tipare enterprise
- **Organizarea Resurselor**: Categorii cuprinzătoare de documentație oficială, standarde de securitate și ghiduri de implementare
- **Indicatori Vizuali**: Marcarea clară a cerințelor obligatorii vs. practicilor recomandate


#### Concepte de Bază (01-CoreConcepts/) - Modernizare Completă
- **Actualizare Versiune Protocol**: Actualizat pentru a face referire la Specificația MCP 2025-06-18 curentă cu versionare bazată pe dată (format YYYY-MM-DD)
- **Rafinament de Arhitectură**: Descrieri îmbunătățite ale gazdelor, clienților și serverelor pentru a reflecta tiparele actuale de arhitectură MCP
  - Gazdele acum definite clar ca aplicații AI care coordonează multiple conexiuni MCP către client
  - Clienții descriși ca conectori de protocol menținând relații unu-la-unu cu serverele
  - Serverele îmbunătățite cu scenarii de implementare locală vs. la distanță
- **Restructurare Primitive**: Revizuire completă a primitivelor server și client
  - Primitive Server: Resurse (surse de date), Prompturi (șabloane), Unelte (funcții executabile) cu explicații și exemple detaliate
  - Primitive Client: Sampling (completări LLM), Elicitation (input utilizator), Logging (depanare/monitorizare)
  - Actualizat cu tipare actuale pentru metodele de descoperire (`*/list`), preluare (`*/get`) și execuție (`*/call`)
- **Arhitectura Protocolului**: Introducerea unui model de arhitectură pe două niveluri
  - Nivel Date: bazat pe JSON-RPC 2.0 cu gestionarea ciclului de viață și primitive
  - Nivel Transport: mecanisme de transport STDIO (local) și HTTP Streamable cu SSE (remot)
- **Cadru de Securitate**: Principii de securitate cuprinzătoare inclusiv consimțământ explicit al utilizatorului, protecția confidențialității datelor, siguranța execuției uneltelor și securitatea nivelului de transport
- **Tipare de Comunicare**: Actualizate mesajele protocol pentru a arăta fluxurile de inițializare, descoperire, execuție și notificare
- **Exemple de Cod**: Reîmprospătate exemple multi-limbaj (.NET, Java, Python, JavaScript) pentru a reflecta tiparele MCP SDK curente

#### Securitate (02-Security/) - Revizuire Completă a Securității  
- **Aliniere la Standarde**: Aliniere completă la cerințele de securitate din Specificația MCP 2025-06-18
- **Evoluția Autentificării**: Documentată evoluția de la servere OAuth personalizate la delegarea furnizorului de identitate extern (Microsoft Entra ID)
- **Analiză de Amenințări Specifice AI**: Acoperire extinsă asupra vectorilor moderni de atac AI
  - Scenarii detaliate de atac prin injecție de prompturi cu exemple din lumea reală
  - Mecanisme de otrăvire a uneltelor și modele de atac "rug pull"
  - Otrăvirea ferestrei de context și atacuri de confuzie a modelului
- **Soluții Microsoft AI pentru Securitate**: Acoperire cuprinzătoare a ecosistemului de securitate Microsoft
  - Scuturi AI Prompt cu detecție avansată, evidențiere și tehnici delimitatoare
  - Modele de integrare Azure Content Safety
  - GitHub Advanced Security pentru protecția lanțului de aprovizionare
- **Atenuarea Avansată a Amenințărilor**: Controale de securitate detaliate pentru
  - deturnarea sesiunii cu scenarii specifice MCP și cerințe criptografice pentru ID-ul sesiunii
  - problemele deputy-ului confuz în scenarii de proxy MCP cu cerințe explicite de consimțământ
  - vulnerabilități la trecerea token-ului cu controale obligatorii de validare
- **Securitatea Lanțului de Aprovizionare**: Acoperire extinsă a lanțului de aprovizionare AI incluzând modele de bază, servicii embedding, furnizori de context și API-uri terțe
- **Securitatea de Bază**: Integrare îmbunătățită cu tiparele de securitate enterprise inclusiv arhitectura zero trust și ecosistemul de securitate Microsoft
- **Organizarea Resurselor**: Linkuri de resurse categorisite după tip (Documentație Oficială, Standarde, Cercetare, Soluții Microsoft, Ghiduri de Implementare)

### Îmbunătățiri ale Calității Documentației
- **Obiective de Învățare Structurate**: Obiective de învățare îmbunătățite cu rezultate specifice și acționabile
- **Referințe Înapoi**: Adăugate linkuri între subiectele conexe de securitate și concepte de bază
- **Informații Actuale**: Actualizate toate referințele la date și linkurile de specificații la standardele curente
- **Ghid de Implementare**: Adăugate instrucțiuni specifice și acționabile pentru implementare în ambele secțiuni

## 16 iulie 2025

### Îmbunătățiri README și Navigare
- Refacut complet navigarea curriculumului în README.md
- Înlocuit tagurile `<details>` cu format tabelar mai accesibil
- Creat opțiuni alternative de layout în noul dosar "alternative_layouts"
- Adăugat exemple de navigare bazate pe carduri, taburi și acordeon
- Actualizat secțiunea structurii depozitului pentru a include toate fișierele recente
- Îmbunătățită secțiunea „Cum să folosești acest curriculum” cu recomandări clare
- Actualizate linkurile de specifcație MCP să indice URL-urile corecte
- Adăugată secțiunea Inginerie Context (5.14) în structura curriculumului

### Actualizări Ghid de Studiu
- Revizuit complet ghidul de studiu pentru a se alinia cu structura curentă a depozitului
- Adăugate secțiuni noi pentru Clienți și Unelte MCP, și Servere MCP populare
- Actualizat Harta Vizuală a Curriculumului pentru a reflecta toate subiectele cu exactitate
- Îmbunătățit descrierile Temelor Avansate pentru a acoperi toate domeniile specializate
- Actualizată secțiunea Studiilor de Caz pentru a reflecta exemple reale
- Adăugat acest changelog cuprinzător

### Contribuții Comunitare (06-CommunityContributions/)
- Adăugate informații detaliate despre serverele MCP pentru generarea de imagini
- Adăugată secțiune cuprinzătoare despre utilizarea Claude în VSCode
- Adăugate instrucțiuni pentru configurarea și utilizarea clientului terminal Cline
- Actualizată secțiunea client MCP pentru a include toate opțiunile populare
- Îmbunătățite exemplele de contribuții cu mostre de cod mai precise

### Tematici Avansate (05-AdvancedTopics/)
- Organizate toate dosarele de subiecte specializate cu denumiri consecvente
- Adăugat materiale și exemple de inginerie a contextului
- Adăugată documentație pentru integrarea agentului Foundry
- Îmbunătățită documentația integrării securității Entra ID

## 11 iunie 2025

### Creare Inițială
- Lansată prima versiune a curriculumului MCP pentru Începători
- Creată structura de bază pentru toate cele 10 secțiuni principale
- Implementată Harta Vizuală a Curriculumului pentru navigare
- Adăugate proiecte de exemplu inițiale în multiple limbaje de programare

### Început (03-GettingStarted/)
- Create primele exemple de implementare server
- Adăugat ghid pentru dezvoltarea clientului
- Incluse instrucțiuni pentru integrarea client LLM
- Adăugată documentația integrării VS Code
- Implementate exemple server Server-Sent Events (SSE)

### Concepte de Bază (01-CoreConcepts/)
- Adăugat explicații detaliate despre arhitectura client-server
- Creată documentația componentelor cheie ale protocolului
- Documentate tiparele de mesagerie în MCP

## 23 mai 2025

### Structura Depozitului
- Inițializată structura depozitului cu foldere de bază
- Create fișiere README pentru fiecare secțiune majoră
- Configurată infrastructura de traducere
- Adăugate resurse și diagrame

### Documentație
- Creat README.md inițial cu prezentarea curriculumului
- Adăugat CODE_OF_CONDUCT.md și SECURITY.md
- Configurat SUPPORT.md cu ghid pentru solicitarea ajutorului
- Creată structura preliminară a ghidului de studiu

## 15 aprilie 2025

### Planificare și Cadrul Proiectului
- Planificare inițială pentru curriculumul MCP pentru Începători
- Definit obiectivele de învățare și publicul țintă
- Structura cu 10 secțiuni a fost schițată
- Dezvoltat cadrul conceptual pentru exemple și studii de caz
- Creat prototip inițial de exemple pentru conceptele cheie

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->