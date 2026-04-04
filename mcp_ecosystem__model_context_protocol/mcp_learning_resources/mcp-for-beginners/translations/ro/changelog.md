# Changelog: Curriculum MCP pentru Începători

Acest document servește drept evidență pentru toate modificările semnificative aduse curriculumului Model Context Protocol (MCP) pentru Începători. Modificările sunt documentate în ordine cronologică inversă (cele mai recente modificări primele).

## 5 februarie 2026

### Îmbunătățiri privind validarea și navigarea în întreg depozitul

#### Conținut nou adăugat în curriculum

**Modul 03 - Introducere**
- **12-mcp-hosts/README.md**: Ghid nou și cuprinzător pentru configurarea host-urilor MCP
  - Exemple de configurare pentru Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Șabloane JSON pentru configurații pentru toate host-urile majore
  - Tabel comparativ al tipurilor de transport (stdio, SSE/HTTP, WebSocket)
  - Soluționarea problemelor comune de conexiune
  - Cele mai bune practici de securitate pentru configurarea host-ului

- **13-mcp-inspector/README.md**: Ghid nou pentru depanarea MCP Inspector
  - Metode de instalare (npx, npm global, din sursă)
  - Conectarea la servere prin stdio și HTTP/SSE
  - Instrumente de testare, resurse și fluxuri de lucru cu prompturi
  - Integrarea MCP Inspector cu VS Code
  - Scenarii comune de depanare cu soluții

**Modul 04 - Implementare Practică**
- **pagination/README.md**: Ghid nou pentru implementarea paginării
  - Modele de paginare bazate pe cursor în Python, TypeScript, Java
  - Gestionarea paginării pe partea clientului
  - Strategii de proiectare a cursorului (opac vs. structurat)
  - Recomandări pentru optimizarea performanței

**Modul 05 - Subiecte Avansate**
- **mcp-protocol-features/README.md**: Analiză aprofundată a caracteristicilor protocolului
  - Implementarea notificărilor de progres
  - Modele de anulare a cererilor
  - Șabloane de resurse cu pattern-uri URI
  - Managementul ciclului de viață al serverului
  - Controlul nivelului de logare
  - Modele de tratare a erorilor cu coduri JSON-RPC

#### Corecții de navigare (peste 24 fișiere actualizate)

**README-urile principalului modul**  
Acum leagă atât de prima lecție, cât și de următorul modul

**Sub-fișiere în 02-Security**  
Toate cele 5 documente suplimentare de securitate au acum secțiunea „Ce urmează” pentru navigare:

**Fișierele din 09-CaseStudy**  
Toate fișierele studiilor de caz au acum navigare secvențială:

**Laboratoarele 10-StreamliningAI**  
Adăugat secțiunea Ce urmează în prezentarea generală a Modulului 10 și Modulului 11

#### Corecții de cod și conținut

**Actualizări SDK și dependențe**  
Corectată versiunea openai goală la `^4.95.0`  
Actualizat SDK de la `^1.8.0` la `>=1.26.0`  
Actualizate fixările versiunii mcp la `>=1.26.0`

**Corecții de cod**  
Corectat model invalid `gpt-4o-mini` în `gpt-4.1-mini`

**Corecții de conținut**  
Corectat link spart `READMEmd` → `README.md`, corectat antetul curriculumului `Module 1-3` → `Module 0-3`, corectat calea sensibilă la majuscule/minuscule  
Eliminat conținut duplicat corupt al Studiului de caz 5

**Îmbunătățiri pentru începutători**  
Adăugat o introducere adecvată, obiective de învățare și cerințe prealabile pentru începători

#### Actualizări ale curriculumului

**README.md principal**  
- Adăugate intrări 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) în tabelul curriculumului

**README-urile modulelor**  
Adăugate lecțiile 12 și 13 în lista de lecții  
Adăugată secțiunea Ghiduri Practice cu link către paginare  
Adăugate lecțiile 5.15 (Custom Transport) și 5.16 (Protocol Features)

**study_guide.md**  
- Actualizat mindmap cu toate subiectele noi: Configurarea MCP Hosts, MCP Inspector, Strategii de Paginare, Analiză aprofundată a Caracteristicilor Protocolului

## 28 ianuarie 2026

### Revizuire conformitate Specificație MCP 2025-11-25

#### Îmbunătățiri concepte de bază (01-CoreConcepts/)
- **Nou primitiv client - Roots**: Documentație completă adăugată pentru primitivul client Roots, permițând serverelor să înțeleagă limitele sistemului de fișiere și permisiunile de acces  
- **Anotații pentru unelte**: Documentație adăugată pentru anotațiile comportamentale ale uneltelor (`readOnlyHint`, `destructiveHint`) pentru decizii mai bune privind execuția uneltelor  
- **Apelarea uneltelor în Sampling**: Actualizat documentația de Sampling pentru a include parametrii `tools` și `toolChoice` pentru invocarea uneltelor controlate de model în cererile de sampling  
- **Mod elicitation URL**: Documentat modul de elicitation bazat pe URL pentru interacțiuni web externe inițiate de server  
- **Tasks (experimental)**: Adăugat secțiune nouă care documentează caracteristica experimentală Tasks pentru execuție durabilă cu înfășurări și preluare amânată a rezultatelor  
- **Suport pentru icoane**: Notat că uneltele, resursele, șabloanele de resurse și prompturile pot conține acum icoane ca metadate suplimentare

#### Actualizări documentație  
- **README.md**: Adăugată referință la versiunea Specificației MCP 2025-11-25 și explicație despre versiunea bazată pe dată  
- **study_guide.md**: Actualizat harta curriculumului pentru a include Tasks și Anotații unelte în secțiunea Concepte de bază; actualizat timestamp-ul

#### Verificare conformitate specificație  
- **Versiune protocol**: Verificat ca întreaga documentație face referire la Specificația MCP 2025-11-25 actuală  
- **Aliniere arhitecturală**: Confirmată acuratețea documentației arhitecturii în două straturi (Date + Transport)  
- **Documentație primitive**: Validat primitivele serverului (Resurse, Prompturi, Unelte) și cele ale clientului (Sampling, Elicitation, Logging, Roots)  
- **Mecanisme transport**: Confirmată acuratețea documentației transporturilor STDIO și Streamable HTTP  
- **Orientări securitate**: Confirmată alinierea cu cele mai bune practici de securitate MCP actuale

#### Caracteristici-cheie MCP 2025-11-25 documentate  
- **OpenID Connect Discovery**: Descoperirea serverului de autentificare prin OIDC  
- **Documente metadata OAuth Client ID**: Recomandare mecanism de înregistrare client  
- **JSON Schema 2020-12**: Dialect implicit pentru definițiile schema MCP  
- **Sistem ierarhizare SDK**: Formalizarea cerințelor pentru suport caracteristici SDK și mentenanță  
- **Structură guvernanță**: Formalizarea Grupurilor de Lucru și Grupurilor de Interes în guvernanța MCP

### Actualizare majoră documentație securitate (02-Security/)

#### Integrare MCP Security Summit Workshop (Sherpa)  
- **Resursă nouă de training practic**: Adăugată integrare cuprinzătoare cu [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) în toată documentația de securitate  
- **Acoperire traseu expediție**: Documentată progresia completă de la Base Camp la Summit  
- **Aliniere OWASP**: Toate ghidurile de securitate sunt acum mapate la riscurile din OWASP MCP Azure Security Guide

#### Integrarea OWASP MCP Top 10  
- **Secțiune nouă**: Adăugat tabel cu riscuri de securitate OWASP MCP Top 10 și mitigări Azure în README-ul principal de securitate  
- **Documentație bazată pe risc**: Actualizat mcp-security-controls-2025.md cu referințe OWASP MCP pentru fiecare domeniu de securitate  
- **Arhitectură de referință**: Legat la arhitectura de referință și modele de implementare din OWASP MCP Azure Security Guide

#### Fișiere de securitate actualizate  
- **README.md**: Adăugat prezentare generală Sherpa Workshop, tabel traseu expediție, sumar riscuri OWASP MCP Top 10 și secțiune training valoric  
- **mcp-security-controls-2025.md**: Actualizat antet la februarie 2026, adăugate referințe riscuri OWASP (MCP01-MCP08), corectată inconsecvență versiune specificație  
- **mcp-security-best-practices-2025.md**: Adăugat secțiune resurse Sherpa și OWASP, actualizat timestamp  
- **mcp-best-practices.md**: Adăugată secțiune training valoric cu linkuri Sherpa și OWASP  
- **azure-content-safety-implementation.md**: Adăugat referință OWASP MCP06, aliniere Sherpa Camp 3 și secțiune de resurse suplimentare

#### Linkuri resurse noi adăugate  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Pagini individuale de risc OWASP MCP (MCP01-MCP10)

### Aliniere în întreg curriculum a Specificației MCP 2025-11-25

#### Modul 03 - Introducere  
- **Documentație SDK**: Adăugat Go SDK în lista oficială SDK; actualizate toate referințele SDK pentru conformitate cu Specificația MCP 2025-11-25  
- **Clarificare transport**: Actualizate descrierile transportului STDIO și HTTP Streaming cu referințe explicite la specificație

#### Modul 04 - Implementare Practică  
- **Actualizări SDK**: Adăugat Go SDK; actualizată lista SDK cu referință la versiunea specificației  
- **Specificație autorizare**: Actualizat link spre specificația MCP Authorization la versiunea curentă 2025-11-25

#### Modul 05 - Subiecte Avansate  
- **Funcționalități noi**: Adăugat notă privind funcționalitățile noi MCP Specification 2025-11-25 (Tasks, Anotații unelte, Mod elicitation URL, Roots)  
- **Resurse securitate**: Adăugate linkuri OWASP MCP Top 10 și Sherpa workshop în referințe suplimentare

#### Modul 06 - Contribuții Comunitare  
- **Lista SDK**: Adăugate SDK-urile Swift și Rust; actualizat link specificație la 2025-11-25  
- **Referință specificație**: Actualizat linkul Specificației MCP la URL-ul direct al specificației

#### Modul 07 - Lecții din adopție timpurie  
- **Actualizări resurse**: Adăugat link Specificație MCP 2025-11-25 și OWASP MCP Top 10 în resurse suplimentare

#### Modul 08 - Cele Mai Bune Practici  
- **Versiune specificație**: Actualizat referința Specificației MCP la 2025-11-25  
- **Resurse securitate**: Adăugate OWASP MCP Top 10 și Sherpa Workshop în referințe suplimentare

#### Modul 10 - Optimizarea fluxurilor AI  
- **Actualizare insignă**: Schimbat insigna versiune MCP din versiunea SDK (1.9.3) în versiunea specificației (2025-11-25)  
- **Linkuri resurse**: Actualizat linkul Specificației MCP; adăugat OWASP MCP Top 10

#### Modul 11 - Laboratoare practice MCP Server  
- **Referință specificație**: Actualizat linkul Specificației MCP la versiunea 2025-11-25  
- **Resurse securitate**: Adăugat OWASP MCP Top 10 în resursele oficiale

## 18 decembrie 2025

### Actualizare documentație securitate - Specificația MCP 2025-11-25

#### Cele mai bune practici securitate MCP (02-Security/mcp-best-practices.md) - Actualizare versiune specificație  
- **Actualizare versiune protocol**: Actualizat să facă referire la ultima Specificație MCP 2025-11-25 (lansată 25 noiembrie 2025)  
  - Actualizate toate referințele versiunii specificației de la 2025-06-18 la 2025-11-25  
  - Actualizate datele documentului de la 18 august 2025 la 18 decembrie 2025  
  - Verificat ca toate URL-urile către specificație indică documentația curentă  
- **Validare conținut**: Validare cuprinzătoare a celor mai bune practici de securitate conform standardelor actuale  
  - **Soluții Microsoft de securitate**: Verificat terminologia și link-urile curente pentru Prompt Shields (anterior „detecția risc jailbreak”), Azure Content Safety, Microsoft Entra ID, și Azure Key Vault  
  - **Securitate OAuth 2.1**: Confirmată alinierea cu cele mai bune practici actuale OAuth  
  - **Standardele OWASP**: Validat faptul că referințele OWASP Top 10 pentru LLM-uri sunt actuale  
  - **Servicii Azure**: Verificat toate linkurile către documentația Microsoft Azure și cele mai bune practici  
- **Aliniere standarde**: Toate standardele de securitate referențiate confirmate actuale  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - Cele mai bune practici de securitate OAuth 2.1  
  - Framework-uri de securitate și conformitate Azure  
- **Resurse implementare**: Validat toate linkurile de ghiduri de implementare și resurse  
  - Modele de autentificare API Management Azure  
  - Ghiduri integrare Microsoft Entra ID  
  - Managementul secretelor Azure Key Vault  
  - Pipeline-uri DevSecOps și soluții de monitorizare

### Asigurarea calității documentației  
- **Conformitate specificație**: Confirmat că toate cerințele obligatorii MCP de securitate (MUST/MUST NOT) sunt conforme cu cea mai recentă specificație  
- **Actualitate resurse**: Verificat toate legăturile externe către documentația Microsoft, standarde de securitate și ghiduri de implementare  
- **Acoperire bune practici**: Confirmată acoperirea completă pentru autentificare, autorizare, amenințări specifice AI, securitate lanț de aprovizionare și modele enterprise

## 6 octombrie 2025

### Extinderea secțiunii Introducere – Utilizare avansată server & Autentificare simplă

#### Utilizare avansată server (03-GettingStarted/10-advanced)  
- **Capitol nou adăugat**: Introducere ghid cuprinzător pentru utilizarea avansată a serverelor MCP, acoperind atât arhitectura serverelor regulate, cât și cea la nivel jos.  
  - **Server regulat vs. server nivel jos**: Comparatie detaliată și exemple de cod în Python și TypeScript pentru ambele abordări.  
  - **Design bazat pe handleri**: Explicație privind gestionarea uneltelor/resurselor/prompturilor prin handleri pentru implementări server scalabile și flexibile.  
  - **Modele practice**: Scenarii reale în care modelele server la nivel jos sunt benefice pentru funcționalități și arhitectură avansată.

#### Autentificare simplă (03-GettingStarted/11-simple-auth)  
- **Capitol nou adăugat**: Ghid pas cu pas pentru implementarea autentificării simple în serverele MCP.  
  - **Concepte de autentificare**: Explicație clară a diferențelor dintre autentificare și autorizare și gestionarea credențialelor.  
  - **Implementare autentificare basic**: Modele de autentificare bazate pe middleware în Python (Starlette) și TypeScript (Express), cu exemple de cod.  
  - **Progresie spre securitate avansată**: Îndrumare pentru început cu autentificare simplă și evoluție spre OAuth 2.1 și RBAC, cu referințe la module avansate de securitate.

Aceste adăugiri oferă ghidaj practic și hands-on pentru construirea implementărilor MCP server mai robuste, sigure și flexibile, făcând puntea între conceptele fundamentale și modelele avansate de producție.

## 29 septembrie 2025

### Laboratoare de integrare baze de date MCP Server - Parcurs complet hands-on

#### 11-MCPServerHandsOnLabs - Curriculum complet nou pentru integrare bază de date  

- **Traseu complet de învățare cu 13 laboratoare**: Adăugat curriculum practic cuprinzător pentru construirea serverelor MCP pregătite pentru producție cu integrare a bazei de date PostgreSQL  
  - **Implementare în lumea reală**: Studiu de caz Zava Retail analytics demonstrând modele la nivel enterprise  
  - **Progresie structurată a învățării**:  
    - **Laboratoarele 00-03: Baze fundamentale** – Introducere, Arhitectură de bază, Securitate & Multi-chiriaș, Configurare mediu  
    - **Laboratoarele 04-06: Construirea serverului MCP** – Design bază de date & Schema, Implementare server MCP, Dezvoltare instrumente  
    - **Laboratoarele 07-09: Funcționalități avansate** – Integrare căutare semantică, Testare & depanare, Integrare VS Code  
    - **Laboratoarele 10-12: Producție & cele mai bune practici** – Strategii de implementare, Monitorizare & observabilitate, Cele mai bune practici & optimizare  
  - **Tehnologii enterprise**: Framework FastMCP, PostgreSQL cu pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights  
  - **Funcționalități avansate**: Securitate la nivel de rând (RLS), căutare semantică, acces multi-chiriaș la date, vector embeddings, monitorizare în timp real  

#### Standardizarea terminologiei - Conversie modului în laborator  
- **Actualizare cuprinzătoare a documentației**: Actualizat sistematic toate fișierele README din 11-MCPServerHandsOnLabs pentru utilizarea termenului „Laborator” în loc de „Modul”  
  - **Antete de secțiuni**: Modificat „Ce acoperă acest modul” în „Ce acoperă acest laborator” în toate cele 13 laboratoare  
  - **Descriere conținut**: Schimbat „Acest modul oferă...” în „Acest laborator oferă...” în toată documentația  
  - **Obiective de învățare**: Actualizat „La sfârșitul acestui modul...” în „La sfârșitul acestui laborator...”  
  - **Linkuri de navigare**: Convertit toate referințele „Modul XX:” în „Laborator XX:” în referințele și navigarea încrucișată  
  - **Urmărirea finalizării**: Actualizat „După finalizarea acestui modul...” în „După finalizarea acestui laborator...”  
  - **Referințe tehnice păstrate**: Menținute referințele la module Python în fișierele de configurare (ex. `"module": "mcp_server.main"`)  

#### Îmbunătățiri ghid de studiu (study_guide.md)  
- **Hartă vizuală a curriculumului**: Adăugat noua secțiune „11. Laboratoare Integrare Bază de Date” cu vizualizarea structurii laboratoarelor  
- **Structura depozitului**: Actualizat de la zece la unsprezece secțiuni principale cu descriere detaliată a 11-MCPServerHandsOnLabs  
- **Indicații traseu de învățare**: Îmbunătățite instrucțiunile de navigare pentru acoperirea secțiunilor 00-11  
- **Acoperirea tehnologică**: Adăugat detalii despre FastMCP, PostgreSQL, integrarea serviciilor Azure  
- **Rezultate de învățare**: Accent pe dezvoltarea serverelor pregătite pentru producție, modele de integrare bază de date și securitate enterprise  

#### Îmbunătățiri structură README principală  
- **Terminologie bazată pe laboratoare**: Actualizat README.md principal din 11-MCPServerHandsOnLabs pentru utilizarea consecventă a structurii „Laborator”  
- **Organizarea traseului de învățare**: Progresie clară de la concepte fundamentale către implementare avansată și implementare în producție  
- **Focalizare pe lumea reală**: Accent pe învățare practică, aplicată, cu modele și tehnologii la nivel enterprise  

### Îmbunătățirea calității și coerenței documentației  
- **Accent pe învățarea practică**: Consolidat abordarea practică, bazată pe laboratoare în întreaga documentație  
- **Focus pe modele enterprise**: Evidențierea implementărilor pregătite pentru producție și considerentele de securitate enterprise  
- **Integrarea tehnologiilor**: Acoperire amplă a serviciilor moderne Azure și a modelelor de integrare AI  
- **Progresie de învățare**: Parcurs clar, structurat de la concepte de bază la implementare în producție  

## 26 septembrie 2025

### Îmbunătățirea studiilor de caz - Integrarea GitHub MCP Registry

#### Studii de caz (09-CaseStudy/) - Focus dezvoltare ecosistem  
- **README.md**: Extindere majoră cu studiu de caz cuprinzător pentru GitHub MCP Registry  
  - **Studiu de caz GitHub MCP Registry**: Studiu nou care examinează lansarea GitHub MCP Registry în septembrie 2025  
    - **Analiza problemei**: Examinare detaliată a fragmentării descoperirii și implementării serverelor MCP  
    - **Arhitectura soluției**: Abordarea centralizată a registrului GitHub cu instalare printr-un click în VS Code  
    - **Impact business**: Îmbunătățiri măsurabile în onboarding și productivitatea dezvoltatorilor  
    - **Valoare strategică**: Focus pe implementarea modulară a agenților și interoperabilitatea între unelte  
    - **Dezvoltare ecosistem**: Poziționare ca platformă fundamentală pentru integrarea sistemelor agentice  
  - **Structură îmbunătățită studii de caz**: Actualizate toate cele șapte studii de caz pentru formatare consecventă și descrieri cuprinzătoare  
    - Agenți Azure AI pentru călătorii: Accent pe orchestrarea multi-agent  
    - Integrare Azure DevOps: Automatizare fluxuri de lucru  
    - Recuperare documentație în timp real: Implementare client consolă Python  
    - Generator interactiv de planuri de studiu: Aplicație web conversațională Chainlit  
    - Documentație în editor: Integrare VS Code și GitHub Copilot  
    - Gestionare API Azure: Modelele enterprise de integrare API  
    - GitHub MCP Registry: Dezvoltarea ecosistemului și platformă comunitară  
  - **Concluzie cuprinzătoare**: Rescrisă secțiunea de concluzie evidențiind cele șapte studii acoperind multiple dimensiuni MCP  
    - Integrare enterprise, orchestrare multi-agent, productivitate dezvoltatori  
    - Dezvoltare ecosistem, aplicații educaționale categorisire  
    - Perspective îmbunătățite asupra modelelor arhitecturale, strategiilor de implementare și celor mai bune practici  
    - Accent pe MCP ca protocol matur și pregătit pentru producție  

#### Actualizări ghid de studiu (study_guide.md)  
- **Hartă vizuală curriculum**: Actualizat mindmap pentru includerea GitHub MCP Registry în secțiunea Studii de caz  
- **Descriere studii de caz**: Îmbunătățită de la descrieri generice la o defalcare detaliată a celor șapte studii cuprinzătoare  
- **Structura depozit**: Actualizată secțiunea 10 pentru a reflecta acoperirea completă a studiilor de caz cu detalii specifice de implementare  
- **Integrare changelog**: Adăugat intrarea 26 septembrie 2025 documentând adăugarea GitHub MCP Registry și îmbunătățiri ale studiilor de caz  
- **Actualizare dată**: Modificat marcajul temporal în footer pentru a reflecta ultima revizie (26 septembrie 2025)  

### Îmbunătățiri calitate documentație  
- **Consecvență**: Format și structură standardizate pentru toate cele șapte studii de caz  
- **Acoperire cuprinzătoare**: Studii de caz care acoperă scenarii enterprise, productivitate dezvoltatori și dezvoltare ecosistem  
- **Poziționare strategică**: Accent extins pe MCP ca platformă fundamentală pentru implementarea sistemelor agentice  
- **Integrare resurse**: Actualizat resurse adiționale pentru a include link-ul GitHub MCP Registry  

## 15 septembrie 2025

### Extindere subiecte avansate - Transporturi personalizate & Inginerie context

#### Transporturi personalizate MCP (05-AdvancedTopics/mcp-transport/) - Ghid nou de implementare avansată  
- **README.md**: Ghid complet pentru implementarea mecanismelor de transport MCP personalizate  
  - **Transport Azure Event Grid**: Implementare completă serverless bazată pe evenimente  
    - Exemple în C#, TypeScript și Python cu integrare Azure Functions  
    - Modele arhitecturale bazate pe evenimente pentru soluții MCP scalabile  
    - Receptoare webhook și manipulare push a mesajelor  
  - **Transport Azure Event Hubs**: Implementare streaming cu throughput ridicat  
    - Capacități streaming în timp real pentru scenarii cu latență scăzută  
    - Strategii de partiționare și gestionare checkpoint  
    - Grupare mesaje și optimizări de performanță  
  - **Modele integrare enterprise**: Exemple arhitecturale pregătite pentru producție  
    - Procesare MCP distribuită prin Azure Functions multiple  
    - Arhitecturi hibride ce combină mai multe tipuri de transport  
    - Durabilitate, fiabilitate și strategii de tratare a erorilor pentru mesaje  
  - **Securitate & monitorizare**: Integrare Azure Key Vault și modele de observabilitate  
    - Autentificare identitate gestionată și acces cu privilegiu minim  
    - Telemmetrie Application Insights și monitorizare performanță  
    - Circuit breakers și modele de toleranță la erori  
  - **Framework-uri de testare**: Strategii complete pentru testarea transporturilor personalizate  
    - Testare unitară cu dubluri de test și mocking  
    - Testare de integrare cu Azure Test Containers  
    - Considerații pentru testare performanță și încărcare  

#### Inginerie de context (05-AdvancedTopics/mcp-contextengineering/) - Disciplină emergentă AI  
- **README.md**: Explorare amplă a ingineriei de context ca domeniu emergent  
  - **Principii de bază**: Partajarea completă a contextului, conștientizarea deciziilor de acțiune, gestionarea ferestrei contextuale  
  - **Aliniere la protocol MCP**: Cum designul MCP abordează provocările ingineriei de context  
    - Limitări ale ferestrei contextuale și strategii de încărcare progresivă  
    - Determinare relevanță și recuperare dinamică a contextului  
    - Tratarea contextului multimodal și considerente de securitate  
  - **Abordări de implementare**: Arhitecturi single-thread vs multi-agent  
    - Tehnici de fragmentare și prioritizare a contextului  
    - Încărcare progresivă și compresie a contextului  
    - Abordări stratificate și optimizare a recuperării contextului  
  - **Cadru de măsurare**: Metode emergente pentru evaluarea eficacității contextului  
    - Eficiența inputului, performanță, calitate și experiența utilizatorului  
    - Abordări experimentale de optimizare a contextului  
    - Analiză a eșecurilor și metodologii de îmbunătățire  

#### Actualizări navigare curriculum (README.md)  
- **Structură modul îmbunătățită**: Tabel curriculum actualizat pentru includerea subiectelor avansate noi  
  - Adăugate intrările Inginerie Context (5.14) și Transport Personalizat (5.15)  
  - Format și linkuri navigare consistente pentru toate modulele  
  - Descrieri actualizate pentru a reflecta conținutul curent  

### Îmbunătățiri structură directoare  
- **Standardizare denumiri**: Redenumit „mcp transport” în „mcp-transport” pentru consistență cu celelalte foldere de subiecte avansate  
- **Organizare conținut**: Toate folderele din 05-AdvancedTopics urmează acum modelul de denumire consistent (mcp-[subiect])  

### Îmbunătățiri calitate documentație  
- **Aliniere specificație MCP**: Toate conținuturile noi referențiază specificația MCP 2025-06-18  
- **Exemple multi-limbaj**: Exemple cuprinzătoare în C#, TypeScript și Python  
- **Focus enterprise**: Modele pregătite pentru producție și integrare Azure cloud pe tot parcursul  
- **Documentație vizuală**: Diagrame Mermaid pentru arhitectură și vizualizarea fluxurilor  

## 18 august 2025

### Actualizare cuprinzătoare documentație - Standarde MCP 2025-06-18

#### Cele mai bune practici securitate MCP (02-Security/) - Modernizare completă  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Rescris complet aliniat la Specificația MCP 2025-06-18  
  - **Cereri obligatorii**: Adăugate cerințe explicite MUST/MUST NOT din specificația oficială cu indicatori vizuali clari  
  - **12 practici securitate de bază**: Restructurat de la listă de 15 puncte la domenii de securitate cuprinzătoare  
    - Securitatea tokenurilor & autentificare cu integrare furnizor identitate extern  
    - Management sesiuni & securitate transport cu cerințe criptografice  
    - Protecția împotriva amenințărilor AI cu integrare Microsoft Prompt Shields  
    - Control acces & permisiuni cu principiul privilegiului minim  
    - Siguranța conținutului & monitorizare cu integrare Azure Content Safety  
    - Securitate lanț aprovizionare cu verificare completă componente  
    - Securitate OAuth & prevenirea atacului deputy confusion cu implementare PKCE  
    - Răspuns incidente & recuperare cu capabilități automate  
    - Conformitate & guvernanță aliniată reglementărilor  
    - Controale de securitate avansate cu arhitectură zero trust  
    - Integrare ecosistem securitate Microsoft cu soluții cuprinzătoare  
    - Evoluție continuă a securității cu practici adaptive  
  - **Soluții Microsoft de securitate**: Ghid de integrare îmbunătățit pentru Prompt Shields, Azure Content Safety, Entra ID și GitHub Advanced Security  
  - **Resurse implementare**: Linkuri categorisite detaliat după Documentație MCP Oficială, Soluții Microsoft, Standarde securitate și Ghiduri implementare  

#### Controale avansate de securitate (02-Security/) - Implementare enterprise  
- **MCP-SECURITY-CONTROLS-2025.md**: Revizuire completă cu cadru de securitate enterprise  
  - **9 domenii de securitate cuprinzătoare**: Extins de la controale de bază la cadru detaliat enterprise  
    - Autentificare & autorizare avansată cu integrare Microsoft Entra ID  
    - Securitatea tokenurilor & controale anti-passthrough cu validare exhaustivă  
    - Controale securitate sesiune cu prevenirea hijacking-ului  
    - Controale securitate AI specifice cu prevenirea injecției prompt și otrăvire unelte  
    - Prevenirea atacului deputy confusion cu securitate proxy OAuth  
    - Securitatea execuției uneltelor cu sandboxing și izolare  
    - Controale securitate lanț aprovizionare cu verificare dependențe  
    - Controale de monitorizare & detectare cu integrare SIEM  
    - Răspuns incidente & recuperare cu capabilități automate  
  - **Exemple implementare**: Blocuri YAML detaliate și exemple de cod  
  - **Integrare soluții Microsoft**: Acoperire completă a serviciilor securitate Azure, GitHub Advanced Security și management identitate enterprise  

#### Subiecte avansate securitate (05-AdvancedTopics/mcp-security/) - Implementare pregătită pentru producție  
- **README.md**: Rescris complet pentru implementare securitate enterprise  
  - **Aliniere la specificația curentă**: Actualizat la Specificația MCP 2025-06-18 cu cerințe obligatorii de securitate  
  - **Autentificare avansată**: Integrare Microsoft Entra ID cu exemple detaliate .NET și Java Spring Security  
  - **Integrare securitate AI**: Implementarea Microsoft Prompt Shields și Azure Content Safety cu exemple detaliate Python  
  - **Mitigare amenințări avansată**: Exemple complete pentru  
    - Prevenirea atacului deputy confusion cu PKCE și validare consimțământ utilizator  
    - Prevenirea token passthrough cu validare audiență și management token securizat  
    - Prevenirea hijacking sesiunii cu legare criptografică și analiză comportamentală  
  - **Integrare securitate enterprise**: Monitorizare Azure Application Insights, fluxuri de detectare amenințări și securitate lanț aprovizionare  
  - **Listă verificare implementare**: Controale clare obligatorii vs recomandate cu beneficii ecosistem securitate Microsoft  

### Calitate documentație & aliniere la standarde  
- **Referințe specificație**: Actualizate toate referințele la MCP Specification 2025-06-18  
- **Ecosistem securitate Microsoft**: Ghiduri integrate extinse în toată documentația de securitate  
- **Implementare practică**: Exemple detaliate cod în .NET, Java și Python cu modele enterprise  
- **Organizare resurse**: Categoriat complet documentația oficială, standardele de securitate și ghidurile de implementare  
- **Indicatori vizuali**: Marcaje clare ale cerințelor obligatorii față de practicile recomandate  

#### Concepte de bază (01-CoreConcepts/) - Modernizare completă  
- **Actualizare versiune protocol**: Referință actualizată la Specificația MCP 2025-06-18 cu versiune bazată pe dată (format YYYY-MM-DD)  
- **Rafinare arhitectură**: Descrieri îmbunătățite pentru Hosts, Clients și Servers pentru a reflecta modelele curente de arhitectură MCP
  - Gazdele sunt acum clar definite ca aplicații AI care coordonează conexiuni multiple ale clienților MCP
  - Clienții sunt descrişi ca conectori de protocoale care mențin relații unu-la-unu cu serverele
  - Serverele sunt îmbunătățite cu scenarii de implementare locală versus la distanță
- **Restructurare primitivă**: Revizuire completă a primitivelor server și client
  - Primitive Server: Resurse (surse de date), Prompturi (șabloane), Unelte (funcții executabile) cu explicații detaliate și exemple
  - Primitive Client: Eșantionare (completări LLM), Elicitare (input utilizator), Jurnalizare (debugging/monitorizare)
  - Actualizat cu modele curente de metode pentru descoperire (`*/list`), recuperare (`*/get`) și execuție (`*/call`)
- **Arhitectura Protocolului**: Introducerea modelului arhitectural pe două niveluri
  - Strat de Date: fundament JSON-RPC 2.0 cu managementul ciclului de viață și primitive
  - Strat de Transport: STDIO (local) și HTTP transmisibil cu SSE (la distanță) ca mecanisme de transport
- **Cadrul de Securitate**: Principii comprensive de securitate inclusiv consimțământ explicit al utilizatorului, protecția confidențialității datelor, siguranța execuției uneltelor și securitatea stratului de transport
- **Modele de Comunicare**: Actualizare a mesajelor de protocol pentru a arăta fluxurile de inițializare, descoperire, execuție și notificare
- **Exemple de Cod**: Reîmprospătare a exemplarelor multi-limbaj (.NET, Java, Python, JavaScript) pentru a reflecta modelele curente MCP SDK

#### Securitate (02-Security/) - Revizuire Completă a Securității  
- **Aliniere la Standardele**: Aliniere totală cu cerințele de securitate MCP Spec 2025-06-18
- **Evoluția Autentificării**: Documentată evoluția de la servere OAuth personalizate la delegarea furnizorului de identitate extern (Microsoft Entra ID)
- **Analiză de Amenințări Specifice AI**: Extindere a acoperirii vectorilor moderni de atac AI
  - Scenarii detaliate de atacuri prin injectare de prompturi cu exemple din lumea reală
  - Mecanisme de otrăvire a uneltelor și modele de atac „rug pull”
  - Otrăvirea ferestrei de context și atacuri de confuzie a modelului
- **Soluții Microsoft AI de Securitate**: Acoperire completă a ecosistemului de securitate Microsoft
  - Scuturi AI Prompt cu tehnici avansate de detecție, evidențiere și delimitare
  - Modele de integrare Azure Content Safety
  - GitHub Advanced Security pentru protecția lanțului de aprovizionare
- **Mitigare Avansată a Amenințărilor**: Controale de securitate detaliate pentru
  - Preluarea sesiunilor cu scenarii de atac specifice MCP și cerințe criptografice pentru ID-ul sesiunii
  - Probleme de tip confuzie a procurorului în scenarii proxy MCP cu cerințe explicite de consimțământ
  - Vulnerabilități de pasare a tokenului cu controale obligatorii de validare
- **Securitate în Lanțul de Aprovizionare**: Extinderea acoperirii lanțului de aprovizionare AI incluzând modele fundamentale, servicii de embeddings, furnizori de context și API-uri terțe
- **Securitatea Fundamentelor**: Integrare îmbunătățită cu modelele de securitate enterprise inclusiv arhitectura zero trust și ecosistemul Microsoft
- **Organizarea Resurselor**: Resurse categorisite comprehensiv după tip (Documentații Oficiale, Standardele, Cercetare, Soluții Microsoft, Ghiduri de Implementare)

### Îmbunătățiri ale Calității Documentației
- **Obiective de învățare structurate**: Obiective îmbunătățite cu rezultate specifice și acționabile
- **Referințe încrucișate**: Legături adăugate între securitate și conceptele de bază conexe
- **Informații actualizate**: Actualizate toate referințele de date și link-urile la specificații pentru standardele curente
- **Ghid de implementare**: Ghiduri specifice și acționabile pentru implementare adăugate pe tot parcursul secțiunilor

## 16 Iulie 2025

### Îmbunătățiri README și Navigație
- Redesign complet al navigării curriculumului în README.md
- Înlocuirea tagurilor `<details>` cu un format tabelar mai accesibil
- Crearea opțiunilor alternative de layout în noul dosar "alternative_layouts"
- Adăugat exemple de navigație bazată pe carduri, taburi și accordioane
- Actualizată secțiunea de structură a depozitului pentru a include toate cele mai noi fișiere
- Îmbunătățită secțiunea "Cum să folosești acest Curriculum" cu recomandări clare
- Actualizate linkurile la specificația MCP pentru a indica URL-urile corecte
- Adăugată secțiunea de Inginerie Contextuală (5.14) în structura curriculumului

### Actualizări Ghid de Studiu
- Revizuit complet ghidul de studiu pentru a se alinia la structura actuală a depozitului
- Adăugate secțiuni noi pentru MCP Clients și Tools, și Servere MCP populare
- Actualizată Harta Vizuală a Curriculumului pentru a reflecta toate subiectele
- Îmbunătățite descrierile Temelor Avansate pentru a acoperi toate ariile specializate
- Actualizată secțiunea Studii de Caz pentru a reflecta exemple reale
- Adăugat acest jurnal complet de modificări

### Contribuții Comunitare (06-CommunityContributions/)
- Adăugate informații detaliate despre servere MCP pentru generare de imagini
- Adăugată secțiune cuprinzătoare despre folosirea Claude în VSCode
- Includerea setărilor și instrucțiunilor de utilizare pentru clientul de terminal Cline
- Actualizată secțiunea client MCP pentru a include toate opțiunile populare de client
- Îmbunătățite exemplele de contribuții cu mostre de cod mai precise

### Tematici Avansate (05-AdvancedTopics/)
- Organizate toate dosarele tematice specializate cu denumiri consistente
- Adăugate materiale și exemple de inginerie a contextului
- Documentație pentru integrarea agentului Foundry
- Documentație îmbunătățită pentru integrarea de securitate Entra ID

## 11 Iunie 2025

### Creare Inițială
- Lansarea primei versiuni a curriculumului MCP pentru Începători
- Creată structura de bază pentru toate cele 10 secțiuni principale
- Implementată Harta Vizuală a Curriculumului pentru navigare
- Adăugate proiecte exemplu inițiale în multiple limbaje de programare

### Început (03-GettingStarted/)
- Exemple inițiale pentru implementare server
- Ghid pentru dezvoltarea clientului
- Instrucțiuni pentru integrarea client LLM
- Documentație pentru integrarea VS Code
- Exemple de servere bazate pe Server-Sent Events (SSE)

### Concepte de Bază (01-CoreConcepts/)
- Explicații detaliate privind arhitectura client-server
- Documentat componentele cheie ale protocolului
- Documentate modelele de mesagerie în MCP

## 23 Mai 2025

### Structura Depozitului
- Inițializat depozitul cu structura de bază
- Creat fișiere README pentru fiecare secțiune majoră
- Configurat infrastructura de traducere
- Adăugate resurse grafice și diagrame

### Documentație
- Creat README.md inițial cu prezentarea curriculumului
- Adăugat CODE_OF_CONDUCT.md și SECURITY.md
- Configurat SUPPORT.md cu indicații pentru ajutor
- Creat structură preliminară pentru ghidul de studiu

## 15 Aprilie 2025

### Planificare și Cadrul de Lucru
- Planificarea inițială a curriculumului MCP pentru Începători
- Definite obiectivele de învățare și publicul țintă
- Schițarea structurii curriculumului în 10 secțiuni
- Dezvoltarea cadrului conceptual pentru exemple și studii de caz
- Crearea prototipurilor inițiale de exemple pentru conceptele cheie

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:  
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să țineți cont că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autoritară. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->