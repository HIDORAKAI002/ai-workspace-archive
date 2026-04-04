# Securitatea MCP: Protecție cuprinzătoare pentru sistemele AI

[![Cele mai bune practici MCP Security](../../../translated_images/ro/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Faceți clic pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_

Securitatea este fundamentală în proiectarea sistemelor AI, motiv pentru care o prioritizăm ca a doua secțiune. Acest lucru se aliniază cu principiul Microsoft **Secure by Design** din [Inițiativa pentru un viitor securizat](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) aduce capabilități puternice noilor aplicații conduse de AI, în același timp introducând provocări unice de securitate care depășesc riscurile software tradiționale. Sistemele MCP se confruntă atât cu preocupări de securitate bine cunoscute (codare sigură, privilegiu minim, securitatea lanțului de aprovizionare), cât și cu amenințări specifice AI, inclusiv injecția de prompturi, otrăvirea uneltelor, deturnarea sesiunii, atacurile de tip deputy confuz, vulnerabilități în token passthrough și modificarea dinamică a capabilităților.

Această lecție explorează cele mai critice riscuri de securitate în implementările MCP—acoperind autentificarea, autorizarea, permisiunile excesive, injecția indirectă de prompturi, securitatea sesiunii, problemele deputy confuz, gestionarea token-urilor și vulnerabilitățile lanțului de aprovizionare. Veți învăța controale acționabile și cele mai bune practici pentru a atenua aceste riscuri, folosind soluții Microsoft precum Prompt Shields, Azure Content Safety și GitHub Advanced Security pentru a întări implementarea MCP.

## Obiectivele de învățare

La sfârșitul acestei lecții veți putea:

- **Identifica amenințările specifice MCP**: Recunoaște riscurile unice de securitate în sistemele MCP, inclusiv injecția de prompt, otrăvirea uneltei, permisiunile excesive, deturnarea sesiunii, problemele deputy confuz, vulnerabilitățile token passthrough și riscurile lanțului de aprovizionare
- **Aplica controale de securitate**: Implementa atenuări eficiente, inclusiv autentificare robustă, acces cu privilegiul minim, gestionarea sigură a token-urilor, controale de securitate a sesiunii și verificarea lanțului de aprovizionare
- **Valorifica soluțiile de securitate Microsoft**: Înțelege și implementa Microsoft Prompt Shields, Azure Content Safety și GitHub Advanced Security pentru protecția încărcăturii de lucru MCP
- **Valida securitatea uneltelor**: Recunoaște importanța validării metadatelor uneltelor, monitorizarea modificărilor dinamice și apărarea împotriva atacurilor de injecție indirectă de prompturi
- **Integra cele mai bune practici**: Combina fundamentele securității consacrate (codare sigură, hardening al serverului, zero trust) cu controale specifice MCP pentru protecție cuprinzătoare

# Arhitectura & Controalele de Securitate MCP

Implementările moderne MCP necesită abordări de securitate stratificată care abordează atât securitatea software tradițională, cât și amenințările specifice AI. Specificația MCP se dezvoltă rapid, maturizând controalele de securitate, permițând integrarea mai bună cu arhitecturile de securitate ale întreprinderilor și cele mai bune practici consacrate.

Cercetările din [Raportul Microsoft de Apărare Digitală](https://aka.ms/mddr) arată că **98% din breșele raportate ar fi prevenite printr-o igienă robustă de securitate**. Strategia de protecție cea mai eficientă combină practicile fundamentale de securitate cu controale specifice MCP—măsurile de securitate de bază rămân cele mai impactante în reducerea riscului general.

## Peisajul actual al securității

> **Notă:** Aceste informații reflectă standardele de securitate MCP la data de **5 februarie 2026**, aliniate cu **Specificația MCP 2025-11-25**. Protocolul MCP continuă să evolueze rapid, iar implementările viitoare pot introduce noi modele de autentificare și controale îmbunătățite. Consultați întotdeauna [Specificația MCP](https://spec.modelcontextprotocol.io/), [depozitul GitHub MCP](https://github.com/modelcontextprotocol) și [documentația celor mai bune practici de securitate](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pentru cele mai recente ghiduri.

## 🏔️ Atelierul MCP Security Summit (Sherpa)

Pentru **exerciții practice de securitate**, vă recomandăm cu căldură **Atelierul MCP Security Summit** (Sherpa) – o expediție ghidată cuprinzătoare pentru securizarea serverelor MCP în Microsoft Azure.

### Prezentarea atelierului

[Atelierul MCP Security Summit](https://azure-samples.github.io/sherpa/) oferă instruire practică, cu acțiuni aplicabile, printr-o metodologie dovedită de tip „vulnerabilitate → exploatare → remediere → validare”. Veți:

- **Învăța distrugând lucruri**: Experimenta vulnerabilitățile direct exploatând servere intenționat nesigure
- **Utiliza securitatea nativă Azure**: Folosiți Azure Entra ID, Key Vault, API Management și AI Content Safety
- **Urmări apărarea în profunzime**: Progresați prin tabere construind straturi complexe de securitate
- **Aplica standardele OWASP**: Fiecare tehnică corespunde [Ghidului OWASP MCP Azure Security](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obține cod de producție**: Plecați cu implementări funcționale și testate

### Traseul expediției

| Tabără | Focus | Riscuri OWASP acoperite |
|------|-------|---------------------|
| **Tabăra de bază** | Fundamente MCP & vulnerabilități autentificare | MCP01, MCP07 |
| **Tabăra 1: Identitate** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tabăra 2: Gateway** | API Management, Private Endpoints, guvernanță | MCP02, MCP07, MCP09 |
| **Tabăra 3: Securitate I/O** | Injecție de prompt, protecția PII, siguranță conținut | MCP03, MCP05, MCP06 |
| **Tabăra 4: Monitorizare** | Log Analytics, tablouri de bord, detecția amenințărilor | MCP08 |
| **Vârf** | Test de integrare Red Team / Blue Team | Toate |

**Începeți aici**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 riscuri de securitate

[Ghidul OWASP MCP Azure Security](https://microsoft.github.io/mcp-azure-security-guide/) detaliază cele zece riscuri de securitate cele mai critice pentru implementările MCP:

| Risc | Descriere | Atenuare Azure |
|------|-------------|------------------|
| **MCP01** | Gestionarea greșită a token-urilor & expunerea secretelor | Azure Key Vault, Managed Identity |
| **MCP02** | Escaladare de privilegii prin creșterea domeniului | RBAC, Conditional Access |
| **MCP03** | Otrăvirea uneltelor | Validarea uneltelor, verificarea integrității |
| **MCP04** | Atacuri în lanțul de aprovizionare | GitHub Advanced Security, scanare dependențe |
| **MCP05** | Injecție și execuție de comenzi | Validarea input-ului, sandboxing |
| **MCP06** | Injecția de prompt prin încărcături contextuale | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autentificare și autorizare insuficiente | Azure Entra ID, OAuth 2.1 cu PKCE |
| **MCP08** | Lipsa auditului și telemetriei | Azure Monitor, Application Insights |
| **MCP09** | Servere MCP fantomă | Guvernanța API Center, izolarea rețelei |
| **MCP10** | Injecția de context & expunere excesivă | Clasificarea datelor, expunere minimă |

### Evoluția autentificării MCP

Specificația MCP a evoluat semnificativ în abordarea autentificării și autorizării:

- **Abordarea inițială**: Specificațiile timpurii cereau dezvoltatorilor să implementeze servere de autentificare personalizate, serverele MCP acționând ca servere OAuth 2.0 pentru autentificarea directă a utilizatorilor
- **Standardul curent (2025-11-25)**: Specificația actualizată permite serverelor MCP să delegheze autentificarea către furnizori externi de identitate (cum ar fi Microsoft Entra ID), îmbunătățind poziția de securitate și reducând complexitatea implementării
- **Securitatea stratului de transport**: Suport îmbunătățit pentru mecanisme de transport securizate cu modele adecvate de autentificare pentru conexiuni locale (STDIO) și remote (Streamable HTTP)

## Securitatea autentificării & autorizării

### Provocările curente de securitate

Implementările moderne MCP se confruntă cu provocări semnificative la nivelul autentificării și autorizării:

### Riscuri & vectori de atac

- **Logică de autorizare configurată greșit**: Implementarea defectuoasă a autorizării în serverele MCP poate expune date sensibile și poate aplica incorect controalele de acces
- **Compromiterea token-urilor OAuth**: Furtul token-ului serverului MCP local permite atacatorilor să se deghizeze ca servere și să acceseze servicii downstream
- **Vulnerabilități token passthrough**: Gestionarea necorespunzătoare a token-urilor creează ocoliri ale controalelor de securitate și lacune în responsabilitate
- **Permisiuni excesive**: Serverele MCP cu privilegii prea mari încalcă principiul privilegiului minim și extind suprafețele de atac

#### Token passthrough: un anti-pattern critic

**Token passthrough este explicit interzis** în specificația actuală MCP pentru autorizare datorită implicațiilor grave de securitate:

##### Ocolirea controalelor de securitate
- Serverele MCP și API-urile downstream implementează controale de securitate critice (limitarea ratei, validarea cererilor, monitorizarea traficului) ce depind de validarea corectă a token-ului
- Utilizarea directă a token-urilor clientului către API ocolește aceste protecții esențiale, subminând arhitectura de securitate

##### Provocări de responsabilitate și audit  
- Serverele MCP nu pot distinge între clienții care folosesc token-uri emise în upstream, ruptând traseele de audit
- Jurnalele serverelor de resurse downstream afișează origini eronate ale cererilor, nu intermediarii reali MCP
- Investigarea incidentelor și auditul conformității devin mult mai dificile

##### Riscurile exfiltrării datelor
- Declarațiile token-urilor nevalidate permit actorilor rău intenționați cu token-uri furate să folosească serverele MCP ca proxy pentru exfiltrarea datelor
- Încălcarea granițelor de încredere permite modele de acces neautorizat care ocolesc controalele de securitate intenționate

##### Vectori de atac multi-serviciu
- Token-urile compromise acceptate de mai multe servicii permit mișcări laterale între sisteme conectate
- Asumările de încredere între servicii pot fi încălcate când originea token-ului nu poate fi verificată

### Controale de securitate & atenuări

**Cerinte critice de securitate:**

> **OBLIGATORIU**: Serverele MCP **NU TREBUIE SĂ accepte** niciun token care nu a fost emis explicit pentru serverul MCP

#### Controale autentificare & autorizare

- **Revizuire riguroasă a autorizării**: Efectuați audituri cuprinzătoare ale logicii de autorizare a serverului MCP pentru a asigura că doar utilizatorii și clienții intenționați pot accesa resurse sensibile
  - **Ghid de implementare**: [Azure API Management ca gateway de autentificare pentru serverele MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrare identitate**: [Folosirea Microsoft Entra ID pentru autentificarea serverului MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestionare sigură a token-urilor**: Implementați [cele mai bune practici Microsoft pentru validarea și ciclul de viață al token-urilor](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validați că afirmațiile destinației tokenului corespund identității serverului MCP
  - Implementați politici corecte de rotație și expirare a token-urilor
  - Preveniți atacurile de tip replay și utilizarea neautorizată

- **Stocare protejată a token-urilor**: Asigurați stocarea token-urilor cu criptare atât în repaus, cât și în tranzit
  - **Cele mai bune practici**: [Ghid pentru stocarea și criptarea sigură a token-urilor](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementarea controlului accesului

- **Principiul privilegiului minim**: Acordați serverelor MCP doar permisiunile minime necesare pentru funcționalitatea dorită
  - Revizuiri și actualizări regulate ale permisiunilor pentru a preveni creșterea privilegiilor
  - **Documentație Microsoft**: [Acces sigur cu privilegii minime](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Controlul accesului bazat pe roluri (RBAC)**: Implementați atribuiri de roluri granulari
  - Limitați rolurile strict la resurse și acțiuni specifice
  - Evitați permisiunile largi sau inutile care extind suprafețele de atac

- **Monitorizarea continuă a permisiunilor**: Implementați audit și monitorizare permanentă a accesului
  - Monitorizați modelele de utilizare a permisiunilor pentru anomalii
  - Remediați prompt permisiunile excesive sau neutilizate

## Amenințări de securitate specifice AI

### Atacuri cu injecție de prompt & manipulare de unelte

Implementările moderne MCP se confruntă cu vectori de atac sofisticați specifici AI pe care măsurile tradiționale de securitate nu-i pot acoperi complet:

#### **Injecție indirectă de prompt (Injecție de prompt cross-domain)**

**Injecția indirectă de prompt** reprezintă una dintre cele mai critice vulnerabilități în sistemele AI dotate cu MCP. Atacatorii încorporează instrucțiuni malițioase în conținut extern — documente, pagini web, emailuri sau surse de date — care sunt apoi procesate de sistemele AI ca și comenzi legitime.

**Scenarii de atac:**
- **Injecție bazată pe documente**: Instrucțiuni malițioase ascunse în documente procesate care declanșează acțiuni AI nedorite
- **Exploatarea conținutului web**: Pagini web compromise conținând prompturi încorporate care manipulează comportamentul AI atunci când sunt extrase
- **Atacuri prin email**: Prompturi malițioase în emailuri care determină asistenții AI să divulge informații sau să execute acțiuni neautorizate
- **Contaminarea surselor de date**: Baze de date sau API-uri compromise care servesc conținut contaminat către sistemele AI

**Impact în lumea reală**: Aceste atacuri pot duce la exfiltrarea datelor, încălcări ale confidențialității, generarea de conținut dăunător și manipularea interacțiunilor cu utilizatorii. Pentru o analiză detaliată, consultați [Injecția de prompt în MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagramă atac injecție de prompt](../../../translated_images/ro/prompt-injection.ed9fbfde297ca877.webp)

#### **Atacuri de otrăvire a uneltelor**

**Otrăvirea uneltelor** vizează metadatele care definesc uneltele MCP, exploatând modul în care LLM-urile interpretează descrierile și parametrii uneltelor pentru a lua decizii de execuție.

**Mecanisme de atac:**
- **Manipularea metadatelor**: Atacatorii injectează instrucțiuni malițioase în descrierile uneltelor, definițiile parametrilor sau exemplele de utilizare
- **Instrucțiuni invizibile**: Prompturi ascunse în metadatele uneltelor, procesate de modelele AI, dar invizibile utilizatorilor umani
- **Modificări dinamice ale uneltelor ("Rug Pulls")**: Uneltele aprobate de utilizatori sunt ulterior modificate pentru a executa acțiuni malițioase fără știrea acestora
- **Injecția parametrilor**: Conținut malițios încorporat în schemele parametrilor uneltelor care influențează comportamentul modelului

**Riscuri pentru servere găzduite**: Serverele MCP la distanță prezintă riscuri crescute deoarece definițiile uneltelor pot fi actualizate după aprobarea inițială a utilizatorului, creând scenarii în care uneltele anterior sigure devin malițioase. Pentru o analiză detaliată, consultați [Atacuri de otrăvire a uneltelor (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagramă atac injecție unelte](../../../translated_images/ro/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vectori suplimentari de atac AI**

- **Injecția de prompt cross-domain (XPIA)**: Atacuri sofisticate care folosesc conținut din mai multe domenii pentru a ocoli controalele de securitate
- **Modificare Dinamică a Capacităților**: Schimbări în timp real ale capacităților uneltelor care scapă evaluărilor inițiale de securitate
- **Otrăvirea Ferestrei de Context**: Atacuri care manipulează ferestre mari de context pentru a ascunde instrucțiuni malițioase
- **Atacuri de Confuzie a Modelului**: Exploatarea limitărilor modelului pentru a crea comportamente imprevizibile sau nesigure


### Impactul Riscurilor de Securitate AI

**Consecințe cu Impact Ridicat:**
- **Exfiltrarea Datelor**: Acces neautorizat și furt de date sensibile ale întreprinderii sau personale
- **Încălcări ale Confidențialității**: Expunerea informațiilor cu caracter personal identificabile (PII) și a datelor de afaceri confidențiale  
- **Manipularea Sistemelor**: Modificări neintenționate ale sistemelor critice și fluxurilor de lucru
- **Furt de Credențiale**: Compromiterea token-urilor de autentificare și a acreditărilor serviciilor
- **Mișcare Laterală**: Utilizarea sistemelor AI compromise ca pivoturi pentru atacuri extinse la nivel de rețea

### Soluții Microsoft pentru Securitatea AI

#### **Scuturi AI Prompt: Protecție Avansată Împotriva Atacurilor de Injectare**

Microsoft **AI Prompt Shields** oferă o apărare cuprinzătoare împotriva atacurilor de injectare a comenzilor directe și indirecte prin mai multe straturi de securitate:

##### **Mecanisme de Protecție de Bază:**

1. **Detectare Avansată & Filtrare**
   - Algoritmi de machine learning și tehnici NLP detectează instrucțiuni malițioase în conținutul extern
   - Analiză în timp real a documentelor, paginilor web, emailurilor și surselor de date pentru amenințări încorporate
   - Înțelegere contextuală a modelelor legitime versus malițioase de prompturi

2. **Tehnici de Evidențiere**  
   - Distingerea între instrucțiuni de sistem de încredere și intrări externe potențial compromise
   - Metode de transformare a textului care sporesc relevanța pentru model, izolând conținutul malițios
   - Ajută sistemele AI să mențină o ierarhie corectă a instrucțiunilor și să ignore comenzile injectate

3. **Sisteme de Delimitare & Marcare a Datelor**
   - Definirea explicită a limitelor între mesajele de sistem de încredere și textul de intrare extern
   - Marcatori speciali evidențiază granițele dintre sursele de date de încredere și cele neîncredere
   - Separare clară previne confuzia instrucțiunilor și executarea neautorizată a comenzilor

4. **Informații Continue despre Amenințări**
   - Microsoft monitorizează continuu modelele emergente de atac și actualizează metodele de apărare
   - Vânătoare proactivă de amenințări pentru tehnici noi de injectare și vectori de atac
   - Actualizări regulate ale modelelor de securitate pentru a menține eficacitatea împotriva amenințărilor în evoluție

5. **Integrare Azure Content Safety**
   - Parte din suita Azure AI Content Safety completă
   - Detectare suplimentară pentru încercări de jailbreak, conținut dăunător și încălcări ale politicilor de securitate
   - Control unificat al securității pe componentele aplicațiilor AI

**Resurse de Implementare**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ro/prompt-shield.ff5b95be76e9c78c.webp)


## Amenințări Avansate de Securitate MCP

### Vulnerabilități de Preluare a Sesunii

**Preluarea sesiunii** reprezintă un vector critic de atac în implementările stateful MCP, unde părți neautorizate obțin și abuzează identificatori legitimi de sesiuni pentru a se da drept clienți și a efectua acțiuni neautorizate.

#### **Scenarii de Atac & Riscuri**

- **Injectare Prompt la Preluarea Sesunii**: Atacatorii cu ID-uri de sesiune furate injectează evenimente malițioase în servere care partajează starea sesiunii, declanșând potențial acțiuni dăunătoare sau acces la date sensibile
- **Impersonare Directă**: ID-urile de sesiune furate permit apeluri directe către serverul MCP care ocolesc autentificarea, tratând atacatorii ca utilizatori legitimi
- **Fluxuri reînnoibile compromise**: Atacatorii pot întrerupe cererile înainte de termen, determinând clienții legitimi să reia cu conținut potențial malițios

#### **Controale de Securitate pentru Gestionarea Sesiunilor**

**Cerințe Critice:**
- **Verificarea Autorizării**: Serverele MCP care implementează autorizarea **TREBUIE** să verifice TOATE cererile primite și **NU TREBUIE** să se bazeze pe sesiuni pentru autentificare
- **Generare Sesiuni Sigure**: Utilizarea de ID-uri de sesiune criptografic sigure, nedeterministe, generate cu generatoare securizate de numere aleatoare
- **Legare Specifică Utilizatorului**: Legarea ID-urilor de sesiune la informații specifice utilizatorului utilizând formate precum `<user_id>:<session_id>` pentru a preveni abuzul sesiunilor între utilizatori
- **Gestionarea Ciclu de Viață al Sesiunii**: Implementarea expirării, rotației și invalidării corecte pentru a limita ferestrele vulnerabile
- **Securitate Transport**: HTTPS obligatoriu pentru toate comunicările pentru a preveni interceptarea ID-urilor de sesiune

### Problema Deputatului Confuz

**Problema deputatului confuz** apare când serverele MCP acționează ca proxy-uri de autentificare între clienți și servicii terțe, creând oportunități de ocolire a autorizării prin exploatarea ID-ului client static.

#### **Mecanica Atacului & Riscuri**

- **Ocolire a consimțământului bazată pe cookie-uri**: Autentificarea anterioară a utilizatorului creează cookie-uri de consimțământ pe care atacatorii le exploatează prin cereri de autorizare malițioase cu URI-uri de redirect personalizate
- **Furt de coduri de autorizare**: Cookie-urile de consimțământ existente pot determina serverele de autorizare să sară ecranele de consimțământ, redirecționând codurile către endpoint-uri controlate de atacator  
- **Acces neautorizat la API-uri**: Codurile de autorizare furate permit schimbul de token-uri și impersonarea utilizatorilor fără aprobări explicite

#### **Strategii de Atenuare**

**Controale Obligatorii:**
- **Cereri explicite de consimțământ**: Serverele proxy MCP care utilizează ID-uri client statice **TREBUIE** să obțină consimțământul utilizatorului pentru fiecare client înregistrat dinamic
- **Implementare securitate OAuth 2.1**: Urmarea celor mai bune practici de securitate OAuth curente, inclusiv PKCE (Proof Key for Code Exchange) pentru toate cererile de autorizare
- **Validare strictă a clientului**: Implementarea validării riguroase a URI-urilor de redirect și a identificatorilor clientului pentru a preveni exploatarea

### Vulnerabilități de Pasare a Token-urilor  

**Pasarea token-urilor** reprezintă un anti-pattern explicit unde serverele MCP acceptă token-uri client fără validare corespunzătoare și le redirecționează către API-urile downstream, încălcând specificațiile de autorizare MCP.

#### **Implicatii de securitate**

- **Ocolirea controlului**: Utilizarea directă a token-urilor client către API ocolește controalele critice de limitare a ratei, validare și monitorizare
- **Coruperea traseului de audit**: Token-urile emise upstream fac imposibilă identificarea clientului, compromițând capacitatea de investigare a incidentelor
- **Exfiltrare de date prin proxy**: Token-urile nevalidate permit actorilor malițioși să folosească serverele ca proxy pentru acces neautorizat la date
- **Încălcarea limitelor de încredere**: Presupunerile de încredere ale serviciilor downstream pot fi încălcate când originea token-urilor nu poate fi verificată
- **Extinderea atacului multi-serviciu**: Token-urile compromise acceptate pe mai multe servicii permit mișcare laterală

#### **Controale de securitate necesare**

**Cerințe imperative:**
- **Validarea token-urilor**: Serverele MCP **NU TREBUIE** să accepte token-uri care nu sunt emise explicit pentru serverul MCP
- **Verificarea publicului token-ului**: Întotdeauna validați revendicările audienței token-ului să confirme identitatea serverului MCP
- **Ciclul de viață corect al token-ului**: Implementați token-uri de acces cu durată scurtă și practici sigure de rotație


## Securitatea Lanțului de Aprovizionare pentru Sisteme AI

Securitatea lanțului de aprovizionare a evoluat dincolo de dependențele software tradiționale pentru a cuprinde întregul ecosistem AI. Implementările moderne MCP trebuie să verifice riguros și să monitorizeze toate componentele legate de AI, deoarece fiecare introduce vulnerabilități potențiale care pot compromite integritatea sistemului.

### Componente Extinse ale Lanțului de Aprovizionare AI

**Dependențe software tradiționale:**
- Biblioteci și cadre open-source
- Imagini de containere și sisteme de bază  
- Instrumente de dezvoltare și pipeline-uri de build
- Componente infrastructurale și servicii

**Elemente specifice lanțului de aprovizionare AI:**
- **Modele de bază**: Modele pre-antrenate de la diferiți furnizori, necesită verificarea provenienței
- **Servicii de embedding**: Servicii externe de vectorizare și căutare semantică
- **Furnizori de context**: Surse de date, baze de cunoștințe și depozite de documente  
- **API-uri terțe**: Servicii AI externe, pipeline-uri ML și endpoint-uri de procesare a datelor
- **Artefacte model**: Greutăți, configurații și variante de modele ajustate fin
- **Surse de date pentru antrenament**: Seturi de date folosite pentru antrenarea și ajustarea modelelor

### Strategie Cuprinzătoare de Securitate a Lanțului de Aprovizionare

#### **Verificarea și Încrederea Componentelor**
- **Validarea provenienței**: Verificați originea, licența și integritatea tuturor componentelor AI înainte de integrare
- **Evaluare de securitate**: Efectuați scanări de vulnerabilitate și recenzii de securitate pentru modele, surse de date și servicii AI
- **Analiza reputației**: Evaluați istoricul securității și practicile furnizorilor de servicii AI
- **Verificarea conformității**: Asigurați-vă că toate componentele respectă cerințele organizaționale de securitate și reglementare

#### **Pipeline-uri de implementare securizate**  
- **Securitate CI/CD automatizată**: Integrați scanarea de securitate de-a lungul pipeline-urilor automate de implementare
- **Integritatea artefactelor**: Implementați verificări criptografice pentru toate artefactele implementate (cod, modele, configurații)
- **Implementare etapizată**: Folosiți strategii progresive de implementare cu validare de securitate la fiecare etapă
- **Depozite sigure de artefacte**: Implementați doar din registre și depozite de artefacte verificate și securizate

#### **Monitorizare continuă și răspuns**
- **Scanarea dependențelor**: Monitorizarea continuă a vulnerabilităților pentru toate dependențele software și AI
- **Monitorizarea modelelor**: Evaluare continuă a comportamentului modelului, deriva performanței și anomalii de securitate
- **Urmărirea sănătății serviciilor**: Monitorizați serviciile AI externe pentru disponibilitate, incidente de securitate și schimbări de politici
- **Integrarea informațiilor despre amenințări**: Includeți fluxuri de informații specifice riscurilor de securitate AI și ML

#### **Controlul Accesului și Principiul Privilegiului Minim**
- **Permisiuni la nivel de componentă**: Restricționați accesul la modele, date și servicii în funcție de necesitatea de afaceri
- **Gestionarea conturilor de servicii**: Implementați conturi de servicii dedicate cu permisiuni minime necesare
- **Segmentarea rețelei**: Izolați componentele AI și limitați accesul de rețea între servicii
- **Controale API Gateway**: Utilizați gateway-uri API centralizate pentru a controla și monitoriza accesul la serviciile AI externe

#### **Răspuns la incidente și recuperare**
- **Proceduri rapide de răspuns**: Procese stabilite pentru patch-uri sau înlocuirea componentelor AI compromise
- **Rotația credențialelor**: Sisteme automate pentru rotația secretelor, cheilor API și acreditărilor serviciilor
- **Capabilități de rollback**: Posibilitatea de a reveni rapid la versiuni anterioare cunoscute ca bune ale componentelor AI
- **Recuperare după breșe în lanțul de aprovizionare**: Proceduri specifice pentru răspuns la compromiterea serviciilor AI upstream

### Instrumente Microsoft de Securitate și Integrare

**GitHub Advanced Security** oferă protecție cuprinzătoare a lanțului de aprovizionare, inclusiv:
- **Scanare de secrete**: Detectare automată a acreditărilor, cheilor API și token-urilor în depozite
- **Scanare dependențe**: Evaluarea vulnerabilităților pentru dependențele și bibliotecile open-source
- **Analiză CodeQL**: Analiză statică a codului pentru vulnerabilități de securitate și probleme de codificare
- **Insight-uri lanț aprovizionare**: Vizibilitate asupra sănătății și statutului de securitate al dependențelor

**Integrare Azure DevOps & Azure Repos:**
- Integrare completă a scanărilor de securitate în platformele de dezvoltare Microsoft
- Verificări automate de securitate în Azure Pipelines pentru sarcini AI
- Aplicare de politici pentru implementarea securizată a componentelor AI

**Practici interne Microsoft:**
Microsoft implementează practici extinse de securitate a lanțului de aprovizionare pentru toate produsele. Aflați despre abordările dovedite în [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Cele Mai Bune Practici pentru Securitatea de Bază

Implementările MCP moștenesc și construiesc pe baza posturii de securitate existente a organizației dvs. Consolidarea practicilor fundamentale de securitate îmbunătățește semnificativ securitatea generală a sistemelor AI și implementărilor MCP.

### Fundamente de Securitate de Bază

#### **Practici Sigure de Dezvoltare**
- **Conformitate OWASP**: Protecție împotriva vulnerabilităților [OWASP Top 10](https://owasp.org/www-project-top-ten/) pentru aplicații web
- **Protecții specifice AI**: Implementarea controalelor pentru [OWASP Top 10 pentru LLM-uri](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Gestionarea sigură a secretelor**: Utilizarea depozitelor dedicate pentru token-uri, chei API și date sensibile de configurare
- **Criptare end-to-end**: Implementarea comunicațiilor sigure în toate componentele aplicației și fluxurile de date
- **Validarea inputurilor**: Validare riguroasă a tuturor intrărilor utilizatorilor, parametrilor API și surselor de date

#### **Hardening-Infrastructural**
- **Autentificare multifactor**: MFA obligatoriu pentru toate conturile administrative și de servicii
- **Gestionarea patch-urilor**: Aplicare automată și la timp a patch-urilor pentru sisteme de operare, cadre și dependențe  
- **Integrarea furnizorului de identitate**: Gestionare centralizată a identității prin furnizori enterprise (Microsoft Entra ID, Active Directory)
- **Segmentarea rețelei**: Izolare logică a componentelor MCP pentru a limita potențialul de mișcare laterală
- **Principiul privilegiului minim**: Permisiunile minime necesare pentru toate componentele și conturile sistemului

#### **Monitorizare & Detectare de Securitate**
- **Jurnalizare cuprinzătoare**: Înregistrarea detaliată a activităților aplicațiilor AI, inclusiv interacțiunile client-server MCP
- **Integrare SIEM**: Management centralizat al informațiilor și evenimentelor de securitate pentru detectarea anomaliilor
- **Analiză comportamentală**: Monitorizare alimentată de AI pentru detectarea tiparelor neobișnuite în sistem și comportamentul utilizatorilor
- **Informații despre amenințări**: Integrarea fluxurilor externe de informații despre amenințări și indicatori de compromitere (IOC)
- **Răspuns la incidente**: Proceduri bine definite pentru detectarea incidentelor de securitate, răspuns și recuperare

#### **Arhitectură Zero Trust**
- **Niciodată nu ai încredere, verifică întotdeauna**: Verificare continuă a utilizatorilor, dispozitivelor și conexiunilor de rețea
- **Micro-segmentare**: Controale granulară de rețea care izolează fiecare încărcare și serviciu
- **Securitate centrată pe identitate**: Politici de securitate bazate pe identități verificate în loc de locația rețelei
- **Evaluare continuă a riscurilor**: Evaluare dinamică a posturii de securitate bazată pe context și comportament actual
- **Acces condiționat**: Controale de acces care se adaptează în baza factorilor de risc, locației și încrederii în dispozitiv

### Modele de Integrare Enterprise

#### **Integrare Ecosistem Microsoft Security**
- **Microsoft Defender for Cloud**: Gestionare cuprinzătoare a posturii de securitate la nivel cloud
- **Azure Sentinel**: Capacități native cloud SIEM și SOAR pentru protecția sarcinilor AI
- **Microsoft Entra ID**: Gestionare identity și acces enterprise cu politici de acces condiționat
- **Azure Key Vault**: Gestionare centralizată a secretelor cu suport hardware security module (HSM)
- **Microsoft Purview**: Guvernanța datelor și conformitatea pentru sursele de date și fluxurile AI

#### **Conformitate și Guvernanță**
- **Aliniere la reglementări**: Asigurarea conformității implementărilor MCP cu cerințele specifice industriei (GDPR, HIPAA, SOC 2)
- **Clasificarea datelor**: Categorizarea și gestionarea adecvată a datelor sensibile procesate de sistemele AI
- **Trasee de audit**: Înregistrare completă pentru conformitate reglementară și investigații forensic
- **Controale de confidențialitate**: Implementarea principiilor privacy-by-design în arhitectura sistemelor AI
- **Managementul schimbării**: Procese formale pentru revizii de securitate ale modificărilor sistemelor AI

Aceste practici fundamentale creează o bază solidă de securitate care sporește eficiența controalelor specifice MCP și oferă protecție cuprinzătoare pentru aplicațiile bazate pe AI.
## Aspecte cheie privind securitatea

- **Abordare stratificată a securității**: Combinați practici fundamentale de securitate (programare sigură, privilegiu minim, verificarea lanțului de aprovizionare, monitorizare continuă) cu controale specifice AI pentru o protecție completă

- **Peisajul amenințărilor specifice AI**: Sistemele MCP se confruntă cu riscuri unice, inclusiv injecția de prompturi, otrăvirea uneltelor, deturnarea sesiunilor, problemele de tipul „adjunct confuz”, vulnerabilitățile de tip token passthrough și permisiunile excesive, care necesită măsuri specializate

- **Excelență în autentificare și autorizare**: Implementați o autentificare robustă folosind furnizori externi de identitate (Microsoft Entra ID), impuneți validarea corectă a tokenurilor și nu acceptați niciodată tokenuri care nu sunt emise explicit pentru serverul dvs. MCP

- **Prevenirea atacurilor AI**: Implementați Microsoft Prompt Shields și Azure Content Safety pentru a apăra împotriva injecției indirecte de prompturi și otrăvirii uneltelor, validând metadatele uneltelor și monitorizând modificările dinamice

- **Securizarea sesiunilor și transportului**: Folosiți ID-uri de sesiune criptografic sigure, nedeterministe, legate de identitățile utilizatorilor, implementați gestionarea adecvată a ciclului de viață al sesiunilor și nu folosiți niciodată sesiunile pentru autentificare

- **Cele mai bune practici de securitate OAuth**: Preveniți atacurile tip „adjunct confuz” prin consimțământ explicit al utilizatorului pentru clienți înregistrați dinamic, implementați corect OAuth 2.1 cu PKCE și validați strict redirect URI-urile 

- **Principii de securitate pentru tokenuri**: Evitați anti-modelele token passthrough, validați revendicările audienței tokenurilor, implementați tokenuri cu durată scurtă de viață și rotație sigură și mențineți limite clare de încredere

- **Securitate completă a lanțului de aprovizionare**: Tratați toate componentele ecosistemului AI (modele, embeddings, furnizori de context, API-uri externe) cu același rigorism de securitate ca și dependențele software tradiționale

- **Evoluție continuă**: Rămâneți la curent cu specificațiile MCP care evoluează rapid, contribuiți la standardele comunității de securitate și mențineți poziții adaptive de securitate pe măsură ce protocolul se maturizează

- **Integrare în securitatea Microsoft**: Valorificați ecosistemul cuprinzător de securitate Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pentru o protecție sporită a implementării MCP

## Resurse complete

### **Documentație oficială MCP pentru securitate**
- [Specificația MCP (Curent: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Cele mai bune practici MCP pentru securitate](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specificația MCP pentru autorizare](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Depozitul GitHub MCP](https://github.com/modelcontextprotocol)

### **Resurse OWASP pentru securitatea MCP**
- [Ghidul OWASP MCP Azure Security](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP cu ghid de implementare pe Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscuri oficiale de securitate MCP OWASP
- [Atelierul MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Training practic de securitate MCP pe Azure

### **Standardele de securitate & cele mai bune practici**
- [Cele mai bune practici OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 pentru securitatea aplicațiilor web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 pentru modele mari de limbaj](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Raportul Microsoft Digital Defense](https://aka.ms/mddr)

### **Cercetare și analiză în securitatea AI**
- [Injecția de prompturi în MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Atacuri de otrăvire a uneltelor (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Prezentare de cercetare securitate MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluții Microsoft de securitate**
- [Documentația Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Serviciul Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Securitatea Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Cele mai bune practici Azure Token Management](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Ghiduri și tutoriale de implementare**
- [Azure API Management ca poartă de autentificare MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autentificare Microsoft Entra ID cu serverele MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Stocare și criptare securizată a tokenurilor (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Securitatea lanțului de aprovizionare**
- [Securitate Azure DevOps](https://azure.microsoft.com/products/devops)
- [Securitate Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Parcursul Microsoft în securitatea lanțului de aprovizionare](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentație suplimentară de securitate**

Pentru ghiduri complete de securitate, consultați aceste documente specializate din această secțiune:

- **[Cele mai bune practici MCP pentru securitate 2025](./mcp-security-best-practices-2025.md)** - Cele mai complete practici de securitate pentru implementările MCP
- **[Implementare Azure Content Safety](./azure-content-safety-implementation.md)** - Exemple practice de integrare Azure Content Safety  
- **[Controale de securitate MCP 2025](./mcp-security-controls-2025.md)** - Cele mai noi controale și tehnici de securitate pentru implementările MCP
- **[Referință rapidă pentru cele mai bune practici MCP](./mcp-best-practices.md)** - Ghid rapid pentru cele mai esențiale practici de securitate MCP

### **Training practic de securitate**

- **[Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Atelier complet practic pentru securizarea serverelor MCP în Azure, cu tabere progresive de la Base Camp la Summit
- **[Ghid OWASP MCP Azure Security](https://microsoft.github.io/mcp-azure-security-guide/)** - Arhitectură de referință și ghid de implementare pentru toate riscurile OWASP MCP Top 10

---

## Următorul pas

Următor: [Capitolul 3: Începutul](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:  
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă o traducere profesională realizată de un specialist uman. Nu ne asumăm răspunderea pentru orice neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->