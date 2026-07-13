# Securitatea MCP: Protecție cuprinzătoare pentru sistemele AI

[![MCP Security Best Practices](../../../translated_images/ro/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Faceți clic pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_

Securitatea este fundamentală pentru proiectarea sistemelor AI, motiv pentru care o prioritizăm ca a doua secțiune. Aceasta se aliniază cu principiul Microsoft **Secure by Design** din cadrul [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protocolul Model Context (MCP) aduce capacități puternice noilor aplicații conduse de AI, introducând totodată provocări unice de securitate care depășesc riscurile tradiționale software. Sistemele MCP se confruntă atât cu preocupări securitare stabilite (codare securizată, privilegiul minim, securitatea lanțului de aprovizionare), cât și cu noi amenințări specifice AI, inclusiv injectarea de prompturi, otrăvirea uneltelor, deturnarea sesiunilor, atacuri de tip confuzie de încredere, vulnerabilități în transmiterea token-urilor și modificarea dinamică a capacităților.

Această lecție explorează cele mai critice riscuri de securitate în implementările MCP—acoperind autentificarea, autorizarea, permisiunile excesive, injectarea indirectă de prompturi, securitatea sesiunilor, problemele de tip confuzie de încredere, gestionarea token-urilor și vulnerabilitățile lanțului de aprovizionare. Veți învăța controale acționabile și bune practici pentru a atenua aceste riscuri, folosind soluții Microsoft precum Prompt Shields, Azure Content Safety și GitHub Advanced Security pentru a întări implementarea MCP.

## Obiectivele de Învățare

Până la sfârșitul acestei lecții, veți fi capabili să:

- **Identificați Amenințările Specifice MCP**: Recunoașteți riscurile unice de securitate în sistemele MCP precum injectarea de prompturi, otrăvirea uneltelor, permisiuni excesive, deturnarea sesiunilor, problemele de tip confuzie de încredere, vulnerabilități în transmiterea token-urilor și riscuri în lanțul de aprovizionare
- **Aplicați Controale de Securitate**: Implementați măsuri eficiente precum autentificare robustă, acces cu privilegiu minim, gestionare securizată a token-urilor, controale de securitate a sesiunii și verificarea lanțului de aprovizionare
- **Valorificați Soluțiile de Securitate Microsoft**: Înțelegeți și implementați Microsoft Prompt Shields, Azure Content Safety și GitHub Advanced Security pentru protecția sarcinilor de lucru MCP
- **Validați Securitatea Uneltelor**: Recunoașteți importanța validării metadatelor uneltelor, monitorizării modificărilor dinamice și apărarea împotriva atacurilor indirecte de injectare a prompturilor
- **Integrați Bunele Practici**: Combinați fundamentele stabilite de securitate (codare securizată, întărirea serverului, zero trust) cu controale specifice MCP pentru protecție cuprinzătoare

# Arhitectura și Controale de Securitate MCP

Implementările moderne MCP necesită abordări securitare stratificate care să acopere atât securitatea tradițională a software-ului cât și amenințările specifice AI. Specificația MCP aflată în continuă evoluție își maturizează controalele de securitate, permițând o mai bună integrare cu arhitecturile securității enterprise și cu bunele practici consacrate.

Cercetările din [Microsoft Digital Defense Report](https://aka.ms/mddr) demonstrează că **98% dintre breșele raportate ar fi prevenite printr-o igienă robustă de securitate**. Cea mai eficientă strategie de protecție combină practicile fundamentale de securitate cu controale specifice MCP—măsurile de bază dovedite rămân cele mai eficiente în reducerea riscului general de securitate.

## Peisajul Actual de Securitate

> **Notă:** Aceste informații reflectă standardele de securitate MCP la **5 februarie 2026**, aliniate cu **Specificația MCP 2025-11-25**. Protocolul MCP continuă să evolueze rapid, iar implementările viitoare pot introduce noi modele de autentificare și controale îmbunătățite. Consultați întotdeauna [Specificația MCP](https://spec.modelcontextprotocol.io/), [repository-ul MCP GitHub](https://github.com/modelcontextprotocol) și [documentația celor mai bune practici de securitate](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pentru cele mai recente recomandări.

> **Privind înainte:** candidatul pentru lansarea `2026-07-28` întărește și mai mult autorizarea — clienții trebuie să valideze parametrul `iss` în răspunsurile de autorizare (RFC 9207), să declare un `application_type` OpenID Connect în timpul înregistrării dinamice a clientului și să lege acreditările înregistrate de serverul de autorizare emitent. Consultați [Ce se schimbă în MCP: candidatul pentru lansarea 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pentru lista completă a SEP-urilor de autorizare.

## 🏔️ Atelierul MCP Security Summit (Sherpa)

Pentru **instruire practică în securitate**, recomandăm cu tărie **Atelierul MCP Security Summit** (Sherpa) - o expediție ghidată cuprinzătoare pentru securizarea serverelor MCP în Microsoft Azure.

### Prezentarea Atelierului

[Atelierul MCP Security Summit](https://azure-samples.github.io/sherpa/) oferă instruire practică și aplicabilă în securitate printr-o metodologie dovedită „vulnerabilitate → exploatare → remediere → validare”. Veți:

- **Învățați prin provocarea securității**: Experimentați vulnerabilități pe propria piele exploatând servere intenționat nesigure
- **Folosiți securitatea nativă Azure**: Utilizați Azure Entra ID, Key Vault, API Management și AI Content Safety
- **Urmăriți strategia Defense-in-Depth**: Parcurgeți tabere construind straturi cuprinzătoare de securitate
- **Aplicați standardele OWASP**: Fiecare tehnică se corelează cu [Ghidul de Securitate MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obțineți cod de producție**: Plecați cu implementări funcționale și testate

### Ruta Expediției

| Tabără | Focus | Riscuri OWASP Acoperite |
|------|-------|---------------------|
| **Tabăra de bază** | Fundamente MCP & vulnerabilități de autentificare | MCP01, MCP07 |
| **Tabăra 1: Identitate** | OAuth 2.1, Identitate gestionată Azure, Key Vault | MCP01, MCP02, MCP07 |
| **Tabăra 2: Gateway** | API Management, Endpoints private, guvernanță | MCP02, MCP06, MCP07, MCP09 |
| **Tabăra 3: Securitate I/O** | Injectare de prompturi, protecție PII, siguranța conținutului | MCP03, MCP05, MCP06, MCP10 |
| **Tabăra 4: Monitorizare** | Log Analytics, dashboarduri, detectarea amenințărilor | MCP04, MCP08 |
| **Summitul** | Test de integrare Red Team / Blue Team | Toate |

**Începeți acum**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 Riscuri de Securitate MCP OWASP

[Ghidul de Securitate MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) detaliază cele zece riscuri critice de securitate pentru implementările MCP:

| Risc | Descriere | Măsuri de atenuare în Azure |
|------|-------------|------------------|
| **MCP01** | Gestionarea necorespunzătoare a token-urilor & expunerea secretelor | Azure Key Vault, Identitate Gestionată |
| **MCP02** | Escaladare de privilegii prin extinderea domeniului | RBAC, Acces Condiționat |
| **MCP03** | Otrăvirea uneltelor | Validare unelte, verificarea integrității |
| **MCP04** | Atacuri asupra lanțului de aprovizionare software & manipularea dependențelor | GitHub Advanced Security, scanare a dependențelor |
| **MCP05** | Injectare & executare de comenzi | Validarea intrărilor, sandboxing |
| **MCP06** | Subversiunea fluxului de intenție | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autentificare & autorizare insuficientă | Azure Entra ID, OAuth 2.1 cu PKCE |
| **MCP08** | Lipsa auditurilor și telemetriei | Azure Monitor, Application Insights |
| **MCP09** | Servere MCP fantomă | Guvernanța API Center, izolare de rețea |
| **MCP10** | Injectarea contextului & expunerea excesivă | Clasificarea datelor, expunere minimă |

### Evoluția Autentificării MCP

Specificația MCP a evoluat semnificativ în abordarea autentificării și autorizării:

- **Abordarea inițială**: Specificațiile timpurii cereau dezvoltatorilor să implementeze servere de autentificare personalizate, serverele MCP acționând ca Servere de Autorizare OAuth 2.0 ce gestionează autentificarea utilizatorilor direct
- **Standardul curent (2025-11-25)**: Specificația actualizată permite serverelor MCP să deleagă autentificarea furnizorilor externi de identitate (precum Microsoft Entra ID), îmbunătățind postura de securitate și reducând complexitatea implementării
- **Transport Layer Security**: Suport îmbunătățit pentru mecanisme de transport securizate cu modele corecte de autentificare atât pentru conexiuni locale (STDIO), cât și pentru cele la distanță (HTTP Streamable)

## Securitatea Autentificării și Autorizării

### Provocări Actuale de Securitate

Implementările moderne MCP se confruntă cu mai multe provocări legate de autentificare și autorizare:

### Riscuri și Vectori de Amenințare

- **Logică de autorizare configurată greșit**: Implementarea defectuoasă a autorizării în serverele MCP poate expune date sensibile și poate aplica incorect controalele de acces
- **Compromiterea token-urilor OAuth**: Furtul token-urilor serverului MCP local permite atacatorilor să se deghizeze în servere și să acceseze servicii downstream
- **Vulnerabilități în transmiterea token-urilor**: Gestionearea necorespunzătoare a token-urilor creează ocoliri ale controalelor de securitate și lacune în responsabilitate
- **Permisiuni excesive**: Serverele MCP cu privilegii excesive încalcă principiile privilegiului minim și extind suprafețele de atac

#### Transmiterea Token-urilor: Un Anti-Pattern Critic

**Transmiterea token-urilor este explicit interzisă** în specificația curentă de autorizare MCP din cauza implicațiilor grave de securitate:

##### Ocolirea Controlului de Securitate
- Serverele MCP și API-urile downstream implementează controale critice de securitate (limitarea ratei, validarea cererilor, monitorizarea traficului) care depind de validarea corectă a token-urilor
- Utilizarea directă a token-urilor clientului către API ocolește aceste protecții esențiale, subminând arhitectura de securitate

##### Provocări privind Responsabilitatea și Auditul  
- Serverele MCP nu pot face diferența între clienții care utilizează token-uri emise upstream, perturbând traseele de audit
- Jurnalele serverelor resursă downstream arată origini înșelătoare ale cererilor în loc de intermediarii MCP reali
- Investigațiile incidente și auditurile de conformitate devin mult mai dificile

##### Riscuri de Exfiltrare a Datelor
- Atribuțiile nevalidate ale token-urilor permit actorilor malițioși cu token-urile furate să folosească serverele MCP ca proxy-uri pentru exfiltrarea datelor
- Încălcări ale granițelor de încredere permit modele de acces neautorizat care ocolesc controalele de securitate intenționate

##### Vectori de Atac Multi-Serviciu
- Token-urile compromise acceptate de mai multe servicii permit mișcări laterale între sisteme conectate
- Presupunerile de încredere între servicii pot fi încălcate când originile token-urilor nu pot fi verificate

### Controale și Atenuări de Securitate

**Cerințe Critice de Securitate:**

> **OBLIGATORIU**: Serverele MCP **NU TREBUIE** să accepte token-uri care nu au fost emise explicit pentru serverul MCP

#### Controale de Autentificare și Autorizare

- **Revizuire riguroasă a autorizării**: Efectuați audituri cuprinzătoare ale logicii de autorizare a serverului MCP pentru a asigura că doar utilizatorii și clienții intenționați pot accesa resurse sensibile
  - **Ghid de implementare**: [Azure API Management ca Gateway de Autentificare pentru serverele MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrare de identitate**: [Folosirea Microsoft Entra ID pentru autentificarea serverului MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestionare securizată a token-urilor**: Implementați [cele mai bune practici Microsoft de validare și gestionare a ciclului de viață al token-urilor](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validarea că audiența token-ului corespunde identității serverului MCP
  - Implementați politici adecvate de rotație și expirare a token-urilor
  - Preveniți atacurile de redare a token-urilor și utilizarea neautorizată

- **Stocare protejată a token-urilor**: Asigurați stocarea token-urilor cu criptare atât în repaus, cât și în tranzit
  - **Bune practici**: [Ghiduri pentru stocarea și criptarea securizată a token-urilor](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementarea controlului accesului

- **Principiul privilegiului minim**: Acordați serverelor MCP doar permisiunile minime necesare funcționalității intenționate
  - Revizuiri regulate ale permisiunilor și actualizări pentru prevenirea extinderii privilegiilor
  - **Documentație Microsoft**: [Acces securizat cu privilegiu minim](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Controlul accesului bazat pe roluri (RBAC)**: Implementați atribuiri de roluri detaliate
  - Limitați rolurile strict la resurse și acțiuni specifice
  - Evitați permisiunile largi sau inutile care extind suprafețele de atac

- **Monitorizarea continuă a permisiunilor**: Implementați auditare și monitorizare continuă a accesului
  - Monitorizați tiparele de utilizare a permisiunilor pentru anomalii
  - Remediați prompt privilegiile excesive sau neutilizate

## Amenințări de Securitate Specifice AI

### Atacuri de Injectare a Prompturilor și Manipulare a Uneltelor

Implementările moderne MCP se confruntă cu vectori sofisticați de atac specifici AI pe care măsurile tradiționale de securitate nu le pot aborda pe deplin:

#### **Injectarea Indirectă a Prompturilor (Injectarea Cross-Domain a Prompturilor)**

**Injectarea Indirectă a Prompturilor** reprezintă una dintre cele mai critice vulnerabilități în sistemele AI activate MCP. Atacatorii încorporează instrucțiuni malițioase în conținut extern—documente, pagini web, emailuri sau surse de date—pe care sistemele AI le procesează ulterior ca comenzi legitime.

**Scenarii de atac:**
- **Injectare bazată pe documente**: Instrucțiuni malițioase ascunse în documentele procesate care declanșează acțiuni AI neintenționate
- **Exploatarea conținutului web**: Pagini web compromise conținând prompturi încorporate care manipulează comportamentul AI când sunt extrase
- **Atacuri prin email**: Prompturi malițioase din emailuri care determină asistenții AI să divulge informații sau să efectueze acțiuni neautorizate
- **Contaminarea surselor de date**: Baze de date sau API-uri compromise ce servesc conținut compromis către sistemele AI

**Impact în lumea reală**: Aceste atacuri pot genera exfiltrare de date, breșe de confidențialitate, generare de conținut dăunător și manipularea interacțiunilor utilizatorilor. Pentru o analiză detaliată, vedeți [Prompt Injection în MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/ro/prompt-injection.ed9fbfde297ca877.webp)

#### **Atacuri de Otrăvire a Uneltelor**

**Otrăvirea Uneltelor** vizează metadatele care definesc uneltele MCP, exploatând modul în care LLM-urile interpretează descrierile și parametrii uneltelor pentru a lua decizii de execuție.

**Mecanismele atacului:**
- **Manipularea metadatelor**: Atacatorii introduc instrucțiuni malițioase în descrierile uneltelor, definițiile parametrilor sau exemplele de utilizare
- **Instrucțiuni invizibile**: Prompturi ascunse în metadatele uneltelor care sunt procesate de modelele AI, dar invizibile utilizatorilor umani
- **Modificarea dinamică a uneltelor („Rug Pulls”)**: Uneltele aprobate de utilizatori sunt modificate ulterior pentru a efectua acțiuni malițioase fără știrea utilizatorilor
- **Injectarea parametrilor**: Conținut malițios încorporat în schemele parametrilor uneltelor care influențează comportamentul modelului


**Riscuri ale Serverelor Găzduite**: Serverele MCP la distanță prezintă riscuri ridicate deoarece definițiile instrumentelor pot fi actualizate după aprobarea inițială a utilizatorului, creând scenarii în care instrumentele anterior sigure devin malițioase. Pentru o analiză completă, vedeți [Atacuri de Otravire a Instrumentelor (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagramă Atac de Injecție a Instrumentelor](../../../translated_images/ro/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vectori Suplimentari de Atac AI**

- **Injecție de Prompt Cross-Domain (XPIA)**: Atacuri sofisticate care folosesc conținut din mai multe domenii pentru a ocoli controalele de securitate
- **Modificarea Dinamică a Capacităților**: Schimbări în timp real ale capabilităților instrumentelor care scăpa evaluărilor de securitate inițiale
- **Otravirea Ferestrei de Context**: Atacuri care manipulează ferestre mari de context pentru a ascunde instrucțiuni malițioase
- **Atacuri de Confuzie a Modelului**: Exploatarea limitărilor modelului pentru a crea comportamente imprevizibile sau nesigure


### Impactul Riscurilor de Securitate AI

**Consecințe cu Impact Ridicat:**
- **Exfiltrarea Datelor**: Acces neautorizat și furt de date sensibile ale întreprinderii sau personale
- **Încălcări ale Confidențialității**: Expunerea informațiilor personale identificabile (PII) și a datelor confidențiale de afaceri  
- **Manipularea Sistemului**: Modificări neintenționate ale sistemelor și fluxurilor de lucru critice
- **Furtul de Credențiale**: Compromiterea token-urilor de autentificare și a credențialelor de serviciu
- **Mișcare Laterală**: Utilizarea sistemelor AI compromise ca pivoti pentru atacuri largi pe rețea

### Soluții Microsoft pentru Securitatea AI

#### **AI Prompt Shields: Protecție Avansată Împotriva Atacurilor de Injecție**

Microsoft **AI Prompt Shields** oferă apărare completă împotriva atacurilor directe și indirecte de injecție a prompturilor prin multiple straturi de securitate:

##### **Mecanisme de Protecție de Bază:**

1. **Detectare & Filtrare Avansată**
   - Algoritmi de învățare automată și tehnici NLP detectează instrucțiuni malițioase în conținut extern
   - Analiză în timp real a documentelor, paginilor web, emailurilor și surselor de date pentru amenințări încorporate
   - Înțelegere contextuală a tiparelor legitime față de cele malițioase ale prompturilor

2. **Tehnici de Evidențiere**  
   - Face distincția între instrucțiunile de sistem de încredere și intrările externe potențial compromise
   - Metode de transformare a textului care sporesc relevanța modelului, izolând conținutul malițios
   - Ajută sistemele AI să mențină ierarhia corectă a instrucțiunilor și să ignore comenzile injectate

3. **Sisteme de Delimitare & Marcaj de Date**
   - Definirea explicită a granițelor între mesajele de sistem de încredere și textele de intrare externe
   - Markeri speciali evidențiază limitele dintre sursele de date de încredere și cele neîncredere
   - Separarea clară previne confuzia instrucțiunilor și execuția neautorizată a comenzilor

4. **Informații Dinamice despre Amenințări**
   - Microsoft monitorizează continuu tiparele emergente de atacuri și actualizează apărările
   - Vânătoare proactivă de amenințări pentru tehnici noi de injecție și vectori de atac
   - Actualizări regulate ale modelelor de securitate pentru a menține eficacitatea împotriva amenințărilor în evoluție

5. **Integrare Azure Content Safety**
   - Parte a suitei cuprinzătoare Azure AI Content Safety
   - Detectare suplimentară pentru încercări de jailbreak, conținut dăunător și încălcări ale politicii de securitate
   - Controale de securitate unite pentru toate componentele aplicațiilor AI

**Resurse de Implementare**: [Documentație Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Protecția Microsoft Prompt Shields](../../../translated_images/ro/prompt-shield.ff5b95be76e9c78c.webp)


## Amenințări Avansate de Securitate MCP

### Vulnerabilități de Deturnare a Sesiunii

**Deturnarea sesiunii** reprezintă un vector critic de atac în implementările MCP cu stare, unde părțile neautorizate obțin și abuzează identificatori legitimi de sesiune pentru a se deghiza în clienți și a efectua acțiuni neautorizate.

#### **Scenarii de Atac & Riscuri**

- **Injecție de Prompt în Deturnarea Sesiunii**: Atacatorii cu ID-uri de sesiune furate injectează evenimente malițioase în serverele care partajează starea sesiunii, declanșând potențial acțiuni dăunătoare sau accesând date sensibile
- **Impersonare Directă**: ID-urile de sesiune furate permit apeluri directe către serverul MCP care ocolesc autentificarea, tratând atacatorii ca utilizatori legitimi
- **Fluxuri Reluabile Compromise**: Atacatorii pot termina cererile prematur, cauzând ca clienții legitimi să reia cu conținut potențial malițios

#### **Controale de Securitate pentru Gestionarea Sesiunilor**

**Cerințe Critice:**
- **Verificarea autorizării**: Serverele MCP care implementează autorizarea **TREBUIE** să verifice TOATE cererile primite și **NU TREBUIE** să se bazeze pe sesiuni pentru autentificare
- **Generarea securizată a sesiunilor**: Folosiți ID-uri de sesiune criptografic sigure, nedeterministe generate cu generatoare securizate de numere aleatoare
- **Legare specifică utilizatorului**: Leagați ID-urile de sesiune la informații specifice utilizatorului folosind formate ca `<user_id>:<session_id>` pentru a preveni abuzul sesiunilor între utilizatori
- **Gestionarea ciclului de viață al sesiunii**: Implementați expirare, rotație și invalidare corespunzătoare pentru a limita ferestrele de vulnerabilitate
- **Securitate la transport**: HTTPS obligatoriu pentru toată comunicarea pentru a preveni interceptarea ID-urilor de sesiune

### Problema Deputatului Confuz

**Problema deputatului confuz** apare când serverele MCP acționează ca proxy-uri de autentificare între clienți și servicii terțe, creând oportunități de ocolire a autorizării prin exploatarea ID-urilor statice ale clienților.

#### **Mecanica Atacului & Riscuri**

- **Ocolirea consimțământului bazată pe cookie-uri**: Autentificarea anterioară a utilizatorului creează cookie-uri de consimțământ pe care atacatorii le exploatează prin cereri de autorizare malițioase cu URI-uri de redirecționare create
- **Furtul codului de autorizare**: Cookie-urile de consimțământ existente pot determina serverele de autorizare să sară peste ecranele de consimțământ, redirecționând coduri către capete controlate de atacatori  
- **Acces neautorizat API**: Codurile de autorizare furate permit schimb de tokenuri și impersonare a utilizatorilor fără aprobare explicită

#### **Strategii de Atenuare**

**Controale obligatorii:**
- **Cerințe explicite de consimțământ**: Serverele proxy MCP care folosesc ID-uri statice ale clienților **TREBUIE** să obțină consimțământul utilizatorului pentru fiecare client înregistrat dinamic
- **Implementare securitate OAuth 2.1**: Urmați cele mai bune practici actuale de securitate OAuth, inclusiv PKCE (Proof Key for Code Exchange) pentru toate cererile de autorizare
- **Validare strictă a clientului**: Implementați validarea riguroasă a URI-urilor de redirecționare și a identificatorilor clienților pentru a preveni exploatarea

### Vulnerabilități de Passthrough de Tokenuri  

**Passthrough-ul tokenurilor** reprezintă un anti-pattern explicit unde serverele MCP acceptă tokenuri de la clienți fără validare corespunzătoare și le transmit către API-uri downstream, încălcând specificațiile de autorizare MCP.

#### **Implicații de Securitate**

- **Ocolirea controlului**: Utilizarea directă a tokenurilor de client către API ocolește controalele critice de limitare a ratei, validare și monitorizare
- **Coruperea traseului de audit**: Tokenurile emise upstream fac imposibilă identificarea clientului, întrerupând capacitățile de investigare a incidentelor
- **Exfiltrarea datelor prin proxy**: Tokenurile nevalidate permit actorilor malițioși să folosească serverele ca proxy-uri pentru acces neautorizat la date
- **Încălcări ale limitelor de încredere**: Serviciile downstream pot avea presupuneri de încredere încălcate când originea tokenului nu poate fi verificată
- **Extinderea atacurilor multi-servicii**: Tokenurile compromise acceptate în mai multe servicii permit mișcarea laterală

#### **Controale de Securitate Necesare**

**Cerințe de netrecut cu vederea:**
- **Validarea tokenurilor**: Serverele MCP **NU TREBUIE** să accepte tokenuri neemit spre în mod explicit pentru serverul MCP
- **Verificarea audienței**: Validați întotdeauna afirmațiile de audiență ale tokenurilor să corespundă identității serverului MCP
- **Ciclul de viață corect al tokenurilor**: Implementați tokenuri de acces cu durată scurtă și practici sigure de rotație


## Securitatea Lanțului de Aprovizionare pentru Sistemele AI

Securitatea lanțului de aprovizionare a evoluat dincolo de dependențele tradiționale software pentru a cuprinde întregul ecosistem AI. Implementările moderne MCP trebuie să verifice riguros și să monitorizeze toate componentele legate de AI, deoarece fiecare introduce vulnerabilități potențiale ce pot compromite integritatea sistemului.

### Componente Extinse ale Lanțului de Aprovizionare AI

**Dependențe Software Tradiționale:**
- Biblioteci și framework-uri open-source
- Imagini container și sisteme de bază  
- Instrumente de dezvoltare și pipe-line-uri de build
- Componente și servicii de infrastructură

**Elemente Specifice Lanțului de Aprovizionare AI:**
- **Modele Fundamentale**: Modele pre-antrenate de la diverși furnizori ce necesită verificarea provenienței
- **Servicii de Embedding**: Servicii externe de vectorizare și căutare semantică
- **Furnizori de Context**: Surse de date, baze de cunoștințe și depozite de documente  
- **API-uri terțe**: Servicii AI externe, pipe-line-uri ML și puncte finale de procesare date
- **Artefacte de model**: Greutăți, configurații și variante de modele fine-tunate
- **Surse de date pentru antrenare**: Seturi de date folosite pentru antrenarea și fine-tuning-ul modelelor

### Strategie Cuprinzătoare de Securitate a Lanțului de Aprovizionare

#### **Verificarea Componentei & Încredere**
- **Validarea Provenienței**: Verificați originea, licențierea și integritatea tuturor componentelor AI înainte de integrare
- **Evaluarea Securității**: Efectuați scanări de vulnerabilități și recenzii de securitate pentru modele, surse de date și servicii AI
- **Analiza Reputației**: Evaluați istoricul de securitate și practicile furnizorilor de servicii AI
- **Verificarea Conformității**: Asigurați-vă că toate componentele respectă cerințele organizaționale de securitate și reglementare

#### **Pipe-line-uri de Implementare Sigure**  
- **Securitate CI/CD Automatizată**: Integrați scanarea securității pe tot parcursul pipe-line-urilor de implementare automatizate
- **Integritatea Artefactelor**: Implementați verificarea criptografică pentru toate artefactele implementate (cod, modele, configurații)
- **Implementare pe Etape**: Folosiți strategii progresive de implementare cu validare de securitate la fiecare etapă
- **Depozite de Artefacte de Încredere**: Implementați doar din registre și depozite de artefacte verificate și sigure

#### **Monitorizare Continuă & Răspuns**
- **Scanare de Dependențe**: Monitorizare continuă pentru vulnerabilități la toate dependențele software și componente AI
- **Monitorizarea Modelului**: Evaluare continuă a comportamentului modelului, derivării performanței și anomaliilor de securitate
- **Urmărirea Sănătății Serviciului**: Monitorizați serviciile AI externe pentru disponibilitate, incidente de securitate și schimbări în politici
- **Integrare Informații despre Amenințări**: Încorporați fluxuri de amenințări specifice riscurilor de securitate AI și ML

#### **Controlul Accesului & Principiul Privilegiului Minim**
- **Permisiuni la nivel de componentă**: Restricționați accesul la modele, date și servicii bazat pe necesitatea de afaceri
- **Gestionarea Conturilor de Serviciu**: Implementați conturi dedicate de serviciu cu permisiuni minime necesare
- **Segmentare de Rețea**: Izolați componentele AI și limitați accesul în rețea între servicii
- **Controale API Gateway**: Folosiți gateway-uri API centralizate pentru a controla și monitoriza accesul la servicii AI externe

#### **Răspuns și Recuperare în Caz de Incident**
- **Proceduri de Răspuns Rapid**: Procese stabilite pentru patch-uri sau înlocuirea componentelor AI compromise
- **Rotația Credențialelor**: Sisteme automate pentru rotația secretelor, cheilor API și credențialelor serviciilor
- **Capabilități de Rollback**: Capacitatea de a reveni rapid la versiuni anterioare cunoscute bune ale componentelor AI
- **Recuperarea de pe Breșe în Lanțul de Aprovizionare**: Proceduri specifice pentru răspuns la compromiterea serviciilor AI upstream

### Unelte și Integrare de Securitate Microsoft

**GitHub Advanced Security** oferă protecție cuprinzătoare a lanțului de aprovizionare, inclusiv:
- **Scanare de secrete**: Detectare automată a credențialelor, cheilor API și tokenurilor în depozite
- **Scanare de dependențe**: Evaluarea vulnerabilităților pentru dependențele open-source și biblioteci
- **Analiza CodeQL**: Analiza statică a codului pentru vulnerabilități de securitate și probleme de codare
- **Insight-uri în Lanțul de Aprovizionare**: Vizibilitate asupra sănătății și stării de securitate a dependențelor

**Integrare Azure DevOps & Azure Repos:**
- Integrare fluentă a scanării securității în platformele de dezvoltare Microsoft
- Verificări securizate automate în Azure Pipelines pentru sarcini AI
- Aplicarea politicilor pentru implementarea sigură a componentelor AI

**Practici Interne Microsoft:**
Microsoft implementează practici extinse de securitate a lanțului de aprovizionare în toate produsele. Aflați despre abordările dovedite în [Drumul către Securizarea Lanțului de Aprovizionare Software la Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Cele Mai Bune Practici pentru Securitatea de Bază

Implementările MCP moștenesc și construiesc pe baza poziției existente de securitate a organizației dumneavoastră. Consolidarea practicilor fundamentale de securitate întărește semnificativ securitatea generală a sistemelor AI și a implementărilor MCP.

### Fundamentele de Securitate de Bază

#### **Practici Sigure de Dezvoltare**
- **Conformitate OWASP**: Protejați împotriva vulnerabilităților web de top [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Protecții Specifice AI**: Implementați controale pentru [OWASP Top 10 pentru LLM-uri](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Gestionarea sigură a secretelor**: Folosiți seifuri dedicate pentru tokenuri, chei API și date de configurare sensibile
- **Criptare end-to-end**: Implementați comunicații sigure pe toate componentele aplicațiilor și fluxurile de date
- **Validarea intrărilor**: Validare riguroasă a tuturor intrărilor utilizatorilor, parametrilor API și surselor de date

#### **Întărirea Infrastructurii**
- **Autentificare Multi-Factor**: MFA obligatorie pentru toate conturile administrative și de serviciu
- **Managementul patch-urilor**: Patch-uri automate și la timp pentru sisteme de operare, framework-uri și dependențe  
- **Integrarea furnizorilor de identitate**: Management centralizat al identității prin furnizori enterprise (Microsoft Entra ID, Active Directory)
- **Segmentarea rețelei**: Izolare logică a componentelor MCP pentru a limita potențialul de mișcare laterală
- **Principiul privilegiului minim**: Permisiuni minime necesare pentru toate componentele sistemului și conturile

#### **Monitorizare & Detectare a Securității**
- **Jurnalizare cuprinzătoare**: Jurnalizare detaliată a activităților aplicațiilor AI, inclusiv interacțiunile client-server MCP
- **Integrare SIEM**: Management centralizat al informațiilor de securitate și evenimentelor pentru detectarea anomaliilor
- **Analiză comportamentală**: Monitorizare asistată AI pentru a detecta modele neobișnuite în comportamentul sistemului și al utilizatorilor
- **Informații despre Amenințări**: Integrarea fluxurilor externe de amenințări și indicatori de compromis (IOC-uri)
- **Răspuns la incidente**: Proceduri bine definite pentru detectarea, răspunsul și recuperarea incidentelor de securitate

#### **Arhitectură Zero Trust**
- **Niciodată nu ai încredere, verifică întotdeauna**: Verificare continuă a utilizatorilor, dispozitivelor și conexiunilor de rețea
- **Micro-segmentare**: Controale granulară de rețea care izolează sarcini de lucru și servicii individuale
- **Securitate centrată pe identitate**: Politici de securitate bazate pe identități verificate mai degrabă decât pe locația în rețea
- **Evaluarea continuă a riscului**: Evaluare dinamică a poziției de securitate bazată pe contextul și comportamentul curent
- **Acces condiționat**: Controale de acces care se adaptează în funcție de factori de risc, locație și încrederea dispozitivului

### Tipare de Integrare în Întreprinderi

#### **Integrarea Ecosistemului de Securitate Microsoft**
- **Microsoft Defender for Cloud**: Management cuprinzător al posturii de securitate în cloud
- **Azure Sentinel**: Capacități native cloud SIEM și SOAR pentru protecția sarcinilor AI
- **Microsoft Entra ID**: Management enterprise al identității și accesului cu politici de acces condiționat
- **Azure Key Vault**: Gestionare centralizată a secretelor cu suport hardware security module (HSM)
- **Microsoft Purview**: Guvernanță și conformitate a datelor pentru surse și fluxuri AI

#### **Conformitate & Guvernanță**
- **Aliniere la reglementări**: Asigurați-vă că implementările MCP respectă cerințele de conformitate specifice industriei (GDPR, HIPAA, SOC 2)

- **Clasificarea datelor**: Categorisirea și gestionarea corespunzătoare a datelor sensibile procesate de sistemele AI
- **Istoricul auditului**: Înregistrarea completă pentru conformitatea cu reglementările și investigațiile criminalistice
- **Controale de confidențialitate**: Implementarea principiilor confidențialității prin design în arhitectura sistemelor AI
- **Managementul schimbărilor**: Procese formale pentru revizuirea securității modificărilor sistemelor AI

Aceste practici fundamentale creează o bază solidă de securitate care îmbunătățește eficacitatea controalelor de securitate specifice MCP și oferă o protecție cuprinzătoare pentru aplicațiile conduse de AI.

## Concluzii-cheie privind securitatea

- **Abordare în straturi a securității**: Combinați practicile fundamentale de securitate (programare sigură, drepturi minime, verificarea lanțului de aprovizionare, monitorizare continuă) cu controale specifice AI pentru o protecție cuprinzătoare

- **Peisajul amenințărilor specifice AI**: Sistemele MCP se confruntă cu riscuri unice, inclusiv injecții de prompt, intoxicarea instrumentelor, deturnarea sesiunilor, probleme de tipul „deputat confuz”, vulnerabilități de trecere a token-ului și permisiuni excesive ce necesită atenuări specializate

- **Excelență în autentificare și autorizare**: Implementați autentificare robustă utilizând furnizori externi de identitate (Microsoft Entra ID), aplicați validarea corectă a token-urilor și nu acceptați niciodată token-uri care nu au fost emise explicit pentru serverul dvs. MCP

- **Prevenirea atacurilor AI**: Implementați Microsoft Prompt Shields și Azure Content Safety pentru apărarea împotriva injecțiilor indirecte de prompt și a atacurilor de intoxicare a instrumentelor, în timp ce validați metadatele instrumentelor și monitorizați schimbările dinamice

- **Securitatea sesiunilor și a transportului**: Folosiți ID-uri de sesiune criptografic sigure, nedeterministe, legate de identitatea utilizatorului, implementați gestionarea corectă a ciclului de viață al sesiunii și nu utilizați niciodată sesiunile pentru autentificare

- **Cele mai bune practici OAuth pentru securitate**: Preveniți atacurile de tip „deputat confuz” prin consimțământ explicit al utilizatorului pentru clienții înregistrați dinamic, implementați corect OAuth 2.1 cu PKCE și validați strict URl-urile de redirecționare  

- **Principii de securitate pentru token-uri**: Evitați antipattern-urile de trecere a token-ului, validați revendicările audienței token-ului, implementați token-uri cu durată scurtă de viață și rotație sigură și mențineți limite clare de încredere

- **Securitate cuprinzătoare a lanțului de aprovizionare**: Tratează toate componentele ecosistemului AI (modele, embedding-uri, furnizori de context, API-uri externe) cu aceeași rigoare de securitate ca și pentru dependențele tradiționale de software

- **Evoluție continuă**: Rămâneți la curent cu specificațiile MCP în rapidă evoluție, contribuiți la standardele comunității de securitate și mențineți posturi de securitate adaptative pe măsură ce protocolul maturizează

- **Integrarea securității Microsoft**: Valorificați ecosistemul complet Microsoft de securitate (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pentru o protecție sporită a implementărilor MCP

## Resurse cuprinzătoare

### **Documentația oficială de securitate MCP**
- [Specificarea MCP (Actual: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Cele mai bune practici MCP de securitate](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specificația autorizării MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repository GitHub MCP](https://github.com/modelcontextprotocol)

### **Resurse de securitate OWASP MCP**
- [Ghidul de securitate OWASP MCP pentru Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 complet OWASP MCP cu ghid de implementare Azure
- [Top 10 OWASP MCP](https://owasp.org/www-project-mcp-top-10/) - Riscuri oficiale de securitate OWASP MCP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Training practic de securitate pentru MCP pe Azure

### **Standardele și cele mai bune practici pentru securitate**
- [Cele mai bune practici OAuth 2.0 pentru securitate (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Top 10 OWASP pentru securitatea aplicațiilor web](https://owasp.org/www-project-top-ten/)
- [Top 10 OWASP pentru modele mari de limbaj](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Raportul de Apărare Digitală Microsoft](https://aka.ms/mddr)

### **Cercetare și analiză în securitatea AI**
- [Injecția de prompt în MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Atacuri de intoxicare a instrumentelor (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Informare despre cercetarea securității MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluții de securitate Microsoft**
- [Documentația Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Serviciul Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Securitate Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Cele mai bune practici pentru gestionarea token-urilor Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Ghiduri și tutoriale de implementare**
- [Azure API Management ca poartă de autentificare MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autentificare Microsoft Entra ID cu serverele MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Stocarea și criptarea sigură a token-urilor (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps și securitatea lanțului de aprovizionare**
- [Securitate Azure DevOps](https://azure.microsoft.com/products/devops)
- [Securitate Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Parcursul Microsoft pentru securitatea lanțului de aprovizionare](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentație suplimentară de securitate**

Pentru ghiduri de securitate cuprinzătoare, consultați aceste documente specializate din această secțiune:

- **[Cele mai bune practici MCP 2025](./mcp-security-best-practices-2025.md)** - Cele mai complete bune practici de securitate pentru implementările MCP
- **[Implementarea Azure Content Safety](./azure-content-safety-implementation.md)** - Exemple practice de implementare pentru integrarea Azure Content Safety  
- **[Controale de securitate MCP 2025](./mcp-security-controls-2025.md)** - Ultimele controale și tehnici de securitate pentru implementările MCP
- **[Ghid rapid de bune practici MCP](./mcp-best-practices.md)** - Ghid rapid pentru practicile esențiale de securitate MCP
- **[BlueHat 2026: Asigurarea viitorului AI: Asigurarea MCP cu modele de apărare în profunzime](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Modele de apărare în profunzime de la Microsoft Security Response Center (MSRC)

### **Training practic de securitate**

- **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop practic cuprinzător pentru securizarea serverelor MCP în Azure cu tabere progressive de la Base Camp la Summit
- **[Ghidul de securitate OWASP MCP pentru Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Arhitectură de referință și ghid de implementare pentru toate riscurile din OWASP MCP Top 10

---

## Ce urmează

Următorul: [Capitolul 3: Începutul lucrului](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->