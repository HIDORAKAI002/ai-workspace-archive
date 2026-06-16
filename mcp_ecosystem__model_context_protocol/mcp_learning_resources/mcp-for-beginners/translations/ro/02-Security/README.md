# Securitatea MCP: Protecție Cuprinzătoare pentru Sistemele AI

[![Cele mai bune practici MCP Security](../../../translated_images/ro/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Faceți clic pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_

Securitatea este fundamentală pentru proiectarea sistemelor AI, motiv pentru care o prioritizăm ca a doua noastră secțiune. Acest lucru se aliniază cu principiul Microsoft **Secure by Design** din [Inițiativa Secure Future](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protocolul Model Context (MCP) aduce capacități noi și puternice aplicațiilor bazate pe AI, introducând în același timp provocări unice de securitate care depășesc riscurile software tradiționale. Sistemele MCP se confruntă atât cu preocupări de securitate consacrate (codare sigură, principiu minimului privilegiu, securitate în lanțul de aprovizionare), cât și cu amenințări specifice AI, inclusiv injectarea de prompturi, otrăvirea uneltelor, deturnarea sesiunii, atacuri de tip confused deputy, vulnerabilități de token passthrough și modificarea dinamică a capabilităților.

Această lecție explorează cele mai critice riscuri de securitate în implementările MCP — acoperind autentificarea, autorizarea, permisiunile excesive, injectarea indirectă a prompturilor, securitatea sesiunii, problemele confused deputy, gestionarea tokenurilor și vulnerabilitățile lanțului de aprovizionare. Veți învăța controale practice și cele mai bune practici pentru a atenua aceste riscuri, folosind soluții Microsoft precum Prompt Shields, Azure Content Safety și GitHub Advanced Security pentru a consolida implementarea MCP.

## Obiectivele De Învățare

La finalul acestei lecții, veți fi capabil să:

- **Identificați Amenințările Specifice MCP**: Recunoașteți riscurile de securitate unice în sistemele MCP, inclusiv injectarea de prompturi, otrăvirea uneltelor, permisiunile excesive, deturnarea sesiunii, problemele confused deputy, vulnerabilitățile token passthrough și riscurile lanțului de aprovizionare
- **Aplicați Controale de Securitate**: Implementați atenuări eficiente, incluzând autentificare robustă, acces cu minimul privilegiu, gestionare sigură a tokenurilor, controale de securitate a sesiunii și verificarea lanțului de aprovizionare
- **Valorificați Soluțiile de Securitate Microsoft**: Înțelegeți și implementați Microsoft Prompt Shields, Azure Content Safety și GitHub Advanced Security pentru protecția sarcinilor de lucru MCP
- **Validați Securitatea Uneltelor**: Recunoașteți importanța validării metadatelor uneltelor, monitorizării pentru modificări dinamice și apărării împotriva atacurilor indirecte de injectare a prompturilor
- **Integrați Cele Mai Bune Practici**: Combinați fundamentele stabilite de securitate (codare sigură, hardening de server, zero trust) cu controale specifice MCP pentru o protecție cuprinzătoare

# Arhitectura și Controalele de Securitate MCP

Implementările moderne MCP necesită abordări de securitate stratificate care abordează atât securitatea software tradițională, cât și amenințările specifice AI. Specificația MCP în continuă evoluție își dezvoltă controlurile de securitate, permițând o mai bună integrare cu arhitecturile de securitate enterprise și cele mai bune practici consacrate.

Cercetările din [Microsoft Digital Defense Report](https://aka.ms/mddr) demonstrează că **98% dintre breșele raportate ar fi prevenite prin igienă robustă de securitate**. Strategia cea mai eficientă de protecție combină practicile fundamentale de securitate cu controalele specifice MCP — măsurile de bază dovedite de securitate rămân cele mai eficiente în reducerea riscului general de securitate.

## Peisajul Actual de Securitate

> **Notă:** Aceste informații reflectă standardele de securitate MCP la data de **5 februarie 2026**, aliniate cu **Specificația MCP 2025-11-25**. Protocolul MCP continuă să evolueze rapid, iar viitoarele implementări pot introduce noi modele de autentificare și controale sporite. Consultați întotdeauna [Specificația MCP](https://spec.modelcontextprotocol.io/), [repository-ul MCP pe GitHub](https://github.com/modelcontextprotocol) și [documentația celor mai bune practici de securitate](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pentru cele mai recente recomandări.

## 🏔️ Atelierul MCP Security Summit (Sherpa)

Pentru **instruire practică în securitate**, recomandăm cu tărie **Atelierul MCP Security Summit** (Sherpa) — o expediție ghidată cuprinzătoare pentru securizarea serverelor MCP în Microsoft Azure.

### Prezentarea Atelierului

[Atelierul MCP Security Summit](https://azure-samples.github.io/sherpa/) oferă instruire practică și acționabilă în securitate printr-o metodologie dovedită „vulnerabil → exploatat → remediat → validat”. Veți:

- **Învăța prin Săpare în Probleme**: Experimentați vulnerabilitățile direct exploatând servere intenționat nesigure
- **Folosirea Securității Native Azure**: Valorificați Azure Entra ID, Key Vault, API Management și AI Content Safety
- **Urmați Apărarea în Profunzime**: Parcurgeți tabere construind straturi cuprinzătoare de securitate
- **Aplicați Standardele OWASP**: Fiecare tehnică este aliniată cu [Ghidul de Securitate MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obțineți Cod pentru Producție**: Plecați cu implementări funcționale și testate

### Traseul Expediției

| Tabără | Focus | Riscuri OWASP Acoperite |
|------|-------|---------------------|
| **Tabăra de Bază** | Fundamente MCP & vulnerabilități de autentificare | MCP01, MCP07 |
| **Tabără 1: Identitate** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tabără 2: Gateway** | API Management, Private Endpoints, guvernanță | MCP02, MCP06, MCP07, MCP09 |
| **Tabără 3: Securitatea I/O** | Injectarea de prompturi, protecția PII, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Tabără 4: Monitorizare** | Log Analytics, dashboarduri, detectarea amenințărilor | MCP04, MCP08 |
| **Vârful** | Test de integrare Red Team / Blue Team | Toate |

**Începeți:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 Riscuri de Securitate OWASP MCP

[Ghidul de Securitate MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) detaliază cele zece riscuri de securitate cele mai critice pentru implementările MCP:

| Risc | Descriere | Atenuare Azure |
|------|-------------|------------------|
| **MCP01** | Gestionarea incorectă a tokenurilor și expunerea secretelor | Azure Key Vault, Managed Identity |
| **MCP02** | Escaladarea privilegiilor prin extinderea domeniului | RBAC, Acces condiționat |
| **MCP03** | Otrăvirea uneltelor | Validarea uneltelor, verificarea integrității |
| **MCP04** | Atacuri asupra lanțului de aprovizionare software și manipularea dependențelor | GitHub Advanced Security, scanarea dependențelor |
| **MCP05** | Injectarea și executarea comenzilor | Validarea inputurilor, sandboxing |
| **MCP06** | Subversiunea fluxului de intenții | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autentificare & autorizare insuficiente | Azure Entra ID, OAuth 2.1 cu PKCE |
| **MCP08** | Lipsa auditului și telemetriei | Azure Monitor, Application Insights |
| **MCP09** | Servere MCP fantomă | Guvernanța API Center, izolare de rețea |
| **MCP10** | Injectarea contextului și supradezvăluirea | Clasificarea datelor, expunere minimă |

### Evoluția Autentificării MCP

Specificația MCP a evoluat semnificativ în abordarea autentificării și autorizării:

- **Abordarea Originală**: Specificațiile timpurii solicitau dezvoltatorilor să implementeze servere de autentificare personalizate, serverele MCP acționând ca servere OAuth 2.0 Authorization care gestionau autentificarea utilizatorilor direct
- **Standardul Actual (2025-11-25)**: Specificația actualizată permite serverelor MCP să delege autentificarea către furnizori externi de identitate (cum ar fi Microsoft Entra ID), îmbunătățind postura de securitate și reducând complexitatea implementării
- **Transport Layer Security**: Suport îmbunătățit pentru mecanisme sigure de transport cu modele corecte de autentificare pentru conexiuni locale (STDIO) și la distanță (Streamable HTTP)

## Securitatea Autentificării și Autorizării

### Provocări Actuale de Securitate

Implementările moderne MCP se confruntă cu mai multe provocări legate de autentificare și autorizare:

### Riscuri și Vectori de Atac

- **Logică de autorizare greșit configurată**: Implementarea defectuoasă a autorizării în serverele MCP poate expune date sensibile și poate aplica incorect controalele de acces
- **Compromiterea tokenului OAuth**: Furtul tokenului pe serverul MCP local permite atacatorilor să se deghizeze în servere și să acceseze serviciile din aval
- **Vulnerabilități de token passthrough**: Gestionarea necorespunzătoare a tokenurilor creează bypass-uri ale controalelor de securitate și lacune de responsabilitate
- **Permisiuni excesive**: Serverele MCP over-privilegiate încalcă principiul minimului privilegiu și extind suprafețele de atac

#### Token Passthrough: Un Anti-Pattern Critic

**Token passthrough este explicit interzis** în specificația actuală de autorizare MCP din cauza implicațiilor grave de securitate:

##### Ocolirea Controalelor de Securitate  
- Serverele MCP și API-urile de downstream implementează controale critice de securitate (limitarea ratei, validarea solicitărilor, monitorizarea traficului) care depind de validarea corectă a tokenurilor  
- Utilizarea directă a tokenurilor client către API ocolește aceste protecții esențiale, subminând arhitectura de securitate  

##### Provocări în Responsabilitate și Audit  
- Serverele MCP nu pot distinge între clienții care folosesc tokenuri emise în upstream, rupând astfel traseele de audit  
- Jurnalele serverelor de resurse downstream arată origini eronate ale solicitărilor, nu intermediarii MCP reali  
- Anchetele incidentelor și auditul de conformitate devin mult mai dificil de realizat  

##### Riscuri de Exfiltrare a Datelor  
- Afirmările nevalidate ale tokenurilor permit actorilor rău intenționați cu tokenuri furate să utilizeze serverele MCP ca proxy-uri pentru exfiltrarea datelor  
- Încălcări ale frontierei de încredere permit modele de acces neautorizate care ocolesc controalele de securitate intenționate  

##### Vectori de Atac Multi-Serviciu  
- Tokenurile compromise acceptate de mai multe servicii permit mișcări laterale între sisteme conectate  
- Asumțiile de încredere între servicii pot fi încălcate când originea tokenurilor nu poate fi verificată  

### Controale de Securitate și Atenuări

**Cerinte Critice de Securitate:**

> **OBLIGATORIU**: Serverele MCP **NU TREBUIE** să accepte niciun token care nu a fost emis explicit pentru serverul MCP

#### Controale de Autentificare și Autorizare

- **Revizuire riguroasă a autorizării**: Efectuați audituri comprehensive ale logicii de autorizare a serverelor MCP pentru a asigura că numai utilizatorii și clienții intenționați pot accesa resurse sensibile  
  - **Ghid de implementare**: [Azure API Management ca Gateway de Autentificare pentru Serverele MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Integrare de identitate**: [Utilizarea Microsoft Entra ID pentru autentificarea serverului MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestionare sigură a tokenurilor**: Implementați [cele mai bune practici Microsoft pentru validarea și ciclul de viață al tokenurilor](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Validați afirmațiile audienței tokenului pentru a corespunde identității serverului MCP  
  - Implementați politici adecvate de rotație și expirare a tokenului  
  - Preveniți atacurile de redare a tokenurilor și utilizarea neautorizată  

- **Stocare protejată a tokenurilor**: Asigurați stocarea tokenurilor cu criptare în repaus și în tranzit  
  - **Cele mai bune practici**: [Ghiduri pentru stocarea sigură și criptarea tokenurilor](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementarea Controlului Accesului

- **Principiul minimului privilegiu**: Acordați serverelor MCP doar permisiunile minime necesare pentru funcționalitatea intenționată  
  - Revizuiri și actualizări regulate ale permisiunilor pentru a preveni escaladarea privilegiilor  
  - **Documentație Microsoft**: [Acces securizat cu privilegii minime](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Controlul accesului bazat pe roluri (RBAC)**: Implementați alocări de roluri detaliate  
  - Limitați rolurile strict la resurse și acțiuni specifice  
  - Evitați permisiunile largi sau inutile care extind suprafețele de atac  

- **Monitorizare continuă a permisiunilor**: Implementați audit și monitorizare permanentă a accesului  
  - Monitorizați modele de utilizare a permisiunilor în căutarea anomaliilor  
  - Remediați prompt privilegiile excesive sau neutilizate  

## Amenințări Specifice AI

### Atacuri de Injectare a Prompturilor și Manipulare a Uneltelor

Implementările moderne MCP se confruntă cu vectori de atac specifici AI sofisticați, pe care măsurile tradiționale de securitate nu îi pot aborda pe deplin:

#### **Injectare Indirectă a Prompturilor (Injectare Cross-Domain a Prompturilor)**

**Injectarea Indirectă a Prompturilor** reprezintă una dintre cele mai critice vulnerabilități în sistemele AI activate MCP. Atacatorii încorporează instrucțiuni malițioase în conținut extern — documente, pagini web, emailuri sau surse de date — pe care sistemele AI le procesează ulterior ca comenzi legitime.

**Scenarii de atac:**  
- **Injectare pe bază de documente**: Instrucțiuni malițioase ascunse în documente procesate ce determină acțiuni AI nedorite  
- **Exploatarea conținutului web**: Pagini web compromise ce conțin prompturi încorporate care manipulează comportamentul AI când sunt preluate  
- **Atacuri prin email**: Prompturi malițioase în emailuri care determină asistenții AI să divulge informații sau să execute acțiuni neautorizate  
- **Contaminarea surselor de date**: Baze de date sau API-uri compromise care servesc conținut corupt către sistemele AI  

**Impact în lumea reală**: Aceste atacuri pot duce la exfiltrarea datelor, încălcarea intimității, generarea de conținut dăunător și manipularea interacțiunilor utilizatorilor. Pentru analize detaliate, consultați [Prompt Injection în MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagramă atac de injectare prompturi](../../../translated_images/ro/prompt-injection.ed9fbfde297ca877.webp)

#### **Atacuri de Otrăvire a Uneltelor**

**Otrăvirea Uneltelor** vizează metadatele care definesc uneltele MCP, exploatând modul în care modelele LLM interpretează descrierile și parametrii uneltelor pentru a lua decizii de execuție.

**Mecanismele atacului:**  
- **Manipularea metadatelor**: Atacatorii injectează instrucțiuni malițioase în descrierile uneltelor, definițiile parametrilor sau exemplele de utilizare  
- **Instrucțiuni invizibile**: Prompturi ascunse în metadatele uneltelor, procesate de modelele AI, dar invizibile utilizatorilor umani  
- **Modificarea dinamica a uneltelor („Rug Pulls”)**: Unelte aprobate de utilizatori sunt ulterior modificate pentru a efectua acțiuni malițioase fără știrea utilizatorilor  
- **Injectarea parametrilor**: Conținut malițios în schemele parametrilor uneltelor care influențează comportamentul modelului  

**Riscuri pe servere găzduite**: Serverele MCP la distanță prezintă riscuri sporite deoarece definițiile uneltelor pot fi actualizate după aprobarea inițială a utilizatorului, creând situații în care unelte anterior sigure devin malițioase. Pentru o analiză cuprinzătoare, consultați [Atacuri de otrăvire a uneltelor (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagramă atac de injectare unelte](../../../translated_images/ro/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vectori Suplimentari de Atac AI**

- **Injectarea cross-domain a prompturilor (XPIA)**: Atacuri sofisticate care valorifică conținut din mai multe domenii pentru a ocoli controalele de securitate
- **Modificarea dinamică a capacităților**: Modificări în timp real ale capacităților uneltelor care scapă evaluărilor inițiale de securitate  
- **Otrăvirea ferestrei de context**: Atacuri care manipulează ferestre mari de context pentru a ascunde instrucțiuni malițioase  
- **Atacuri de confuzie a modelului**: Exploatarea limitărilor modelului pentru a genera comportamente imprevizibile sau nesigure  

### Impactul riscului de securitate AI

**Consecințe cu Impact Major:**  
- **Exfiltrarea datelor**: Acces și furt neautorizat de date sensibile ale întreprinderii sau personale  
- **Încălcări ale confidențialității**: Expunerea informațiilor de identificare personală (PII) și a datelor confidențiale ale afacerii  
- **Manipularea sistemelor**: Modificări neintenționate ale sistemelor și fluxurilor critice de lucru  
- **Furtul de credențiale**: Compromiterea tokenurilor de autentificare și a credențialelor serviciilor  
- **Mișcare laterală**: Utilizarea sistemelor AI compromise ca pivot pentru atacuri extinse asupra rețelei  

### Soluții de securitate AI Microsoft

#### **AI Prompt Shields: Protecție avansată împotriva atacurilor de injecție în prompturi**

Microsoft **AI Prompt Shields** oferă o apărare cuprinzătoare împotriva atacurilor directe și indirecte de injecție în prompturi prin mai multe straturi de securitate:

##### **Mecanisme de protecție de bază:**

1. **Detecție și filtrare avansată**
   - Algoritmi de învățare automată și tehnici NLP detectează instrucțiuni malițioase în conținutul extern  
   - Analiză în timp real a documentelor, paginilor web, emailurilor și surselor de date pentru amenințări încorporate  
   - Înțelegere contextuală a tiparelor legitime vs. malițioase de prompturi  

2. **Tehnici de evidențiere**  
   - Distincția între instrucțiunile de sistem de încredere și intrările externe potențial compromise  
   - Metode de transformare a textului care sporesc relevanța modelului păstrând izolat conținutul malițios  
   - Ajută sistemele AI să mențină ierarhia corectă a instrucțiunilor și să ignore comenzile injectate  

3. **Sisteme de delimitare și marcare a datelor**  
   - Definirea explicită a limitelor între mesajele de sistem de încredere și textul de intrare extern  
   - Marcaje speciale care evidențiază granițele între sursele de date de încredere și cele nesigure  
   - Separare clară care previne confuzia instrucțiunilor și executarea neautorizată a comenzilor  

4. **Informații continue despre amenințări**  
   - Microsoft monitorizează continuu tiparele emergente de atac și actualizează măsurile de apărare  
   - Vânătoare proactivă de amenințări pentru tehnici noi de injecție și vectori de atac  
   - Actualizări regulate ale modelelor de securitate pentru a menține eficacitatea împotriva amenințărilor în evoluție  

5. **Integrare Azure Content Safety**  
   - Parte din suita cuprinzătoare Azure AI Content Safety  
   - Detecție suplimentară pentru încercările de jailbreak, conținut nociv și încălcări de politici de securitate  
   - Controale de securitate unificate pe toate componentele aplicațiilor AI  

**Resurse de implementare**: [Documentația Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ro/prompt-shield.ff5b95be76e9c78c.webp)

## Amenințări avansate de securitate MCP

### Vulnerabilități de deturnare a sesiunii

**Deturnarea de sesiune** reprezintă un vector critic de atac în implementările MCP stateful, unde terțe părți neautorizate obțin și abuzează de identificatori legitimi de sesiune pentru a se da drept clienți și a efectua acțiuni neautorizate.

#### **Scenarii și riscuri ale atacurilor**

- **Injecția de prompt în deturnarea sesiunii**: Atacatorii cu ID-uri de sesiune furate injectează evenimente malițioase în servere care împart starea sesiunii, declanșând potențial acțiuni dăunătoare sau acces la date sensibile  
- **Impersonare directă**: ID-urile furate permit apeluri directe către serverele MCP care evită autentificarea, tratând atacatorii ca utilizatori legitimi  
- **Fluxuri resumabile compromise**: Atacatorii pot termina cererile prematur, determinând clienți legitimi să reia cu conținut potențial malițios  

#### **Controale de securitate pentru gestionarea sesiunii**

**Cerinte critice:**  
- **Verificarea autorizării**: Serverele MCP care implementează autorizare **TREBUIE** să verifice TOATE cererile primite și **NU TREBUIE** să se bazeze pe sesiuni pentru autentificare  
- **Generare securizată a sesiunii**: Folosiți ID-uri de sesiune non-deterministe, criptografic securizate generate cu generatoare sigure de numere aleatoare  
- **Legare specifică utilizatorului**: Asociați ID-urile de sesiune cu informații specifice utilizatorului în formate precum `<user_id>:<session_id>` pentru a preveni abuzul de sesiune între utilizatori  
- **Gestionarea ciclului de viață al sesiunii**: Implementați expirare, rotație și invalidare corespunzătoare pentru a limita ferestrele de vulnerabilitate  
- **Securitatea transportului**: HTTPS obligatoriu pentru toate comunicațiile pentru a preveni interceptarea ID-urilor de sesiune  

### Problema deputatului confuz

Problema deputatului confuz apare când serverele MCP acționează ca proxy-uri de autentificare între clienți și servicii terțe, creând oportunități de ocolire a autorizării prin exploatarea ID-urilor statice ale clientului.

#### **Mecanica și riscurile atacurilor**

- **Ocolirea consimțământului bazată pe cookie-uri**: Autentificarea anterioară a utilizatorului creează cookie-uri de consimțământ pe care atacatorii le exploatează prin cereri de autorizare malițioase cu URI-uri de redirect elaborate  
- **Furtul codului de autorizare**: Cookie-urile de consimțământ existente pot face serverele de autorizare să sară ecranele de consimțământ, redirecționând codurile către puncte controlate de atacatori  
- **Acces API neautorizat**: Codurile furate permit schimbul de tokenuri și impersonarea utilizatorilor fără aprobare explicită  

#### **Strategii de atenuare**

**Controale obligatorii:**  
- **Cereri explicite de consimțământ**: Serverele proxy MCP care folosesc ID-uri statice ale clientului **TREBUIE** să obțină consimțământul utilizatorului pentru fiecare client înregistrat dinamic  
- **Implementarea securității OAuth 2.1**: Urmați cele mai bune practici de securitate OAuth actuale, inclusiv PKCE (Proof Key for Code Exchange) pentru toate cererile de autorizare  
- **Validare strictă a clientului**: Implementați validarea riguroasă a URI-urilor de redirect și identificatorilor clientului pentru a preveni exploatarea  

### Vulnerabilități la trecerea tokenurilor  

**Trecerea tokenurilor** reprezintă un anti-pattern explicit în care serverele MCP acceptă tokenuri client fără validare corespunzătoare și le transmit mai departe către API-uri, încălcând specificațiile de autorizare MCP.

#### **Implicații de securitate**

- **Ocolirea controlului**: Utilizarea directă a tokenurilor client către API ocolește limiterile critice de rată, validare și monitorizare  
- **Corupția traseului de audit**: Tokenurile emise în amonte împiedică identificarea clientului, compromițând capacitatea de investigare a incidentelor  
- **Exfiltrarea datelor prin proxy**: Tokenurile neverificate permit actorilor malițioși să folosească serverele ca proxy-uri pentru acces neautorizat la date  
- **Încălcări ale graniței de încredere**: Serviciile în aval pot avea asumpții de încredere încălcate când originea tokenurilor nu poate fi verificată  
- **Extinderea atacurilor multi-serviciu**: Tokenurile compromise acceptate în mai multe servicii permit mișcarea laterală  

#### **Controale de securitate necesare**

**Cerințe imperioase:**  
- **Validarea tokenului**: Serverele MCP **NU TREBUIE** să accepte tokenuri care nu au fost emise explicit pentru serverul MCP  
- **Verificarea audienței**: Verificați întotdeauna revendicările audienței tokenului să corespundă identității serverului MCP  
- **Ciclul de viață corect al tokenului**: Implementați tokenuri de acces cu durată scurtă și practici sigure de rotație  

## Securitatea lanțului de aprovizionare pentru sistemele AI

Securitatea lanțului de aprovizionare a evoluat dincolo de dependențele software tradiționale pentru a include întregul ecosistem AI. Implementările moderne MCP trebuie să verifice și să monitorizeze riguros toate componentele legate de AI, deoarece fiecare introduce potențiale vulnerabilități ce pot compromite integritatea sistemului.

### Componente extinse ale lanțului de aprovizionare AI

**Dependențe software tradiționale:**  
- Biblioteca și cadre open-source  
- Imagini container și sisteme de bază  
- Unelte de dezvoltare și pipeline-uri de build  
- Componente și servicii de infrastructură  

**Elemente specifice lanțului de aprovizionare AI:**  
- **Modele fundamentale**: Modele pre-antrenate de la diverși furnizori care necesită verificarea provenienței  
- **Servicii de embedding**: Servicii externe de vectorizare și căutare semantică  
- **Furnizori de context**: Surse de date, baze de cunoștințe și depozite de documente  
- **API-uri terțe**: Servicii AI externe, pipeline-uri ML și endpoint-uri de procesare a datelor  
- **Artefacte de model**: Greutăți, configurații și variante de modele finetunate  
- **Surse de date pentru antrenament**: Seturi de date folosite pentru antrenarea și finetuningul modelelor  

### Strategie completă de securitate a lanțului de aprovizionare

#### **Verificarea componentelor și încrederea**
- **Validarea provenienței**: Verificați originea, licențierea și integritatea tuturor componentelor AI înainte de integrare  
- **Evaluarea securității**: Efectuați scanări pentru vulnerabilități și recenzii de securitate pentru modele, surse de date și servicii AI  
- **Analiza reputației**: Evaluați istoricul și practicile de securitate ale furnizorilor de servicii AI  
- **Verificarea conformității**: Asigurați-vă că toate componentele respectă cerințele organizaționale de securitate și reglementări  

#### **Pipeline-uri de implementare securizate**  
- **Securitate CI/CD automatizată**: Integrați scanarea de securitate în toate pipeline-urile automate de implementare  
- **Integritatea artefactelor**: Implementați verificarea criptografică pentru toate artefactele implementate (cod, modele, configurații)  
- **Implementare etapizată**: Folosiți strategii progresive de implementare cu validări de securitate la fiecare etapă  
- **Depozite de artefacte de încredere**: Implementați doar din registre și depozite de artefacte verificate și securizate  

#### **Monitorizare și răspuns continuu**  
- **Scanarea dependențelor**: Monitorizare continuă a vulnerabilităților pentru toate dependențele software și AI  
- **Monitorizarea modelelor**: Evaluare continuă a comportamentului modelului, a deviațiilor de performanță și a anomaliilor de securitate  
- **Monitorizarea sănătății serviciilor**: Supravegherea serviciilor AI externe pentru disponibilitate, incidente de securitate și modificări de politică  
- **Integrarea informațiilor despre amenințări**: Încorporarea feed-urilor de amenințări specifice riscurilor de securitate AI și ML  

#### **Controlul accesului și principiul privilegiului minim**  
- **Permisiuni la nivel de componentă**: Restricționați accesul la modele, date și servicii conform necesității de business  
- **Gestionarea conturilor de serviciu**: Implementați conturi dedicate de serviciu cu permisiuni minime necesare  
- **Segmentarea rețelei**: Izolați componentele AI și limitați accesul în rețea între servicii  
- **Controale API Gateway**: Utilizați gateway-uri API centralizate pentru control și monitorizare acces la serviciile AI externe  

#### **Răspuns la incidente și recuperare**  
- **Proceduri rapide de răspuns**: Procese stabilite pentru patch-uri sau înlocuirea componentelor AI compromise  
- **Rotația credențialelor**: Sisteme automate pentru rotirea secretelor, cheilor API și credențialelor serviciilor  
- **Capacități de rollback**: Posibilitatea de revenire rapidă la versiuni anterioare cunoscute ca fiind sigure ale componentelor AI  
- **Recuperare după breșe în lanțul de aprovizionare**: Proceduri specifice pentru reacția la compromiterea serviciilor AI în amonte  

### Instrumente și integrare Microsoft de securitate

**GitHub Advanced Security** oferă protecție completă a lanțului de aprovizionare, incluzând:  
- **Scanarea secretelor**: Detectare automată a credențialelor, cheilor API și tokenurilor din depozite  
- **Scanarea dependențelor**: Evaluarea vulnerabilităților pentru dependențele și bibliotecile open-source  
- **Analiza CodeQL**: Analiză statică a codului pentru vulnerabilități de securitate și probleme de scriere a codului  
- **Informații despre lanțul de aprovizionare**: Vizibilitate asupra sănătății și statusului de securitate al dependențelor  

**Integrare Azure DevOps & Azure Repos:**  
- Integrare fluentă a scanărilor de securitate pe platformele de dezvoltare Microsoft  
- Verificări automate de securitate în Azure Pipelines pentru sarcinile AI  
- Aplicarea politicilor pentru implementarea securizată a componentelor AI  

**Practici interne Microsoft:**  
Microsoft aplică practici extinse de securitate a lanțului de aprovizionare în toate produsele. Aflați mai multe despre abordările dovedite în [Drumul către securizarea lanțului de aprovizionare software la Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  

## Cele mai bune practici de securitate fundamentale

Implementările MCP moștenesc și construiesc pe baza posturii de securitate existente în organizația dvs. Consolidarea practicilor fundamentale de securitate îmbunătățește considerabil securitatea generală a sistemelor AI și a implementărilor MCP.

### Fundamente cheie de securitate

#### **Practici securizate de dezvoltare**  
- **Conformitate OWASP**: Protecție împotriva vulnerabilităților web listate în [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Protecții specifice AI**: Implementați controale pentru [OWASP Top 10 pentru LLM-uri](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Gestionarea securizată a secretelor**: Utilizați seifuri dedicate pentru tokenuri, chei API și date sensibile de configurare  
- **Criptare end-to-end**: Implementați comunicații securizate în toate componentele aplicației și fluxurile de date  
- **Validarea intrărilor**: Validare riguroasă a tuturor intrărilor utilizatorilor, parametrilor API și surselor de date  

#### **Întărirea infrastructurii**  
- **Autentificare multi-factor**: MFA obligatorie pentru toate conturile administrative și de serviciu  
- **Managementul patch-urilor**: Aplicare automată și punctuală a patch-urilor pentru sisteme de operare, cadre și dependențe  
- **Integrare furnizor identitate**: Management centralizat al identității prin furnizorii enterprise (Microsoft Entra ID, Active Directory)  
- **Segmentarea rețelei**: Izolare logică a componentelor MCP pentru a limita potențialul de mișcare laterală  
- **Principiul privilegiului minim**: Permisiuni minime necesare pentru toate componentele sistemului și conturile  

#### **Monitorizare și detecție de securitate**  
- **Logare detaliată**: Înregistrare detaliată a activităților aplicațiilor AI, inclusiv interacțiunile client-server MCP  
- **Integrare SIEM**: Management centralizat al evenimentelor și informațiilor de securitate pentru detecție anomalii  
- **Analiză comportamentală**: Monitorizare AI pentru detectarea modelelor neobișnuite în comportamentul sistemului și utilizatorilor  
- **Informații despre amenințări**: Integrarea feed-urilor externe de amenințări și indicatori de compromitere (IOC-uri)  
- **Răspuns la incidente**: Proceduri bine definite pentru detectarea, răspunsul și recuperarea după incidente de securitate  

#### **Arhitectură Zero Trust**  
- **Niciodată nu ai încredere, verifică mereu**: Verificare continuă a utilizatorilor, dispozitivelor și conexiunilor de rețea  
- **Micro-segmentare**: Controale granulare ale rețelei care izolează încărcături și servicii individuale  
- **Securitate centrată pe identitate**: Politici de securitate bazate pe identități verificate, nu pe locația în rețea  
- **Evaluare continuă a riscurilor**: Evaluare dinamică a posturii de securitate în funcție de context și comportament curent  
- **Acces condiționat**: Controale de acces care se adaptează în funcție de factori de risc, locație și încrederea dispozitivului  

### Modele de integrare enterprise

#### **Integrarea ecosistemului de securitate Microsoft**  
- **Microsoft Defender for Cloud**: Management complet al posturii de securitate cloud  
- **Azure Sentinel**: Capacități SIEM și SOAR native cloud pentru protecția sarcinilor AI  
- **Microsoft Entra ID**: Gestionarea identității și accesului enterprise cu politici de acces condiționat  
- **Azure Key Vault**: Management centralizat al secretelor cu suport HSM (hardware security module)  
- **Microsoft Purview**: Guvernanță și conformitate a datelor pentru sursele și fluxurile AI  

#### **Conformitate și guvernanță**  
- **Aliniere la reglementări**: Asigurați-vă că implementările MCP respectă cerințele specifice industriei (GDPR, HIPAA, SOC 2)  
- **Clasificarea datelor**: Categorizare și tratament adecvat al datelor sensibile procesate de sistemele AI  
- **Trasee de audit**: Logare cuprinzătoare pentru conformitate reglementară și investigații criminalistice  
- **Controale de confidențialitate**: Implementarea principiilor privacy-by-design în arhitectura sistemelor AI  
- **Managementul schimbărilor**: Procese formale pentru revizuiri de securitate ale modificărilor sistemelor AI  

Aceste practici fundamentale creează o bază robustă de securitate care sporește eficacitatea controalelor specifice MCP și oferă protecție cuprinzătoare pentru aplicațiile AI.

## Concluzii cheie de securitate
- **Abordare de Securitate Stratificată**: Combinați practicile fundamentale de securitate (codare sigură, principiul privilegiului minim, verificarea lanțului de aprovizionare, monitorizare continuă) cu controale specifice AI pentru o protecție cuprinzătoare

- **Peisajul Amenințărilor Specifice AI**: Sistemele MCP se confruntă cu riscuri unice, inclusiv injecție de prompturi, otrăvirea instrumentelor, preluarea sesiunilor, problemele deputy confuz, vulnerabilități de transmitere a tokenurilor și permisiuni excesive care necesită măsuri de evitare specializate

- **Excelență în Autentificare și Autorizare**: Implementați autentificare robustă folosind furnizori de identitate externi (Microsoft Entra ID), aplicați validarea corectă a tokenurilor și nu acceptați niciodată tokenuri care nu sunt emise explicit pentru serverul dvs. MCP

- **Prevenirea Atacurilor AI**: Implementați Microsoft Prompt Shields și Azure Content Safety pentru a vă apăra împotriva injecției indirecte de prompturi și otrăvirii instrumentelor, în timp ce validați metadatele instrumentelor și monitorizați modificările dinamice

- **Securitatea Sesiunii și Transportului**: Folosiți ID-uri de sesiune criptografic sigure, nedeterministe legate de identitatea utilizatorului, implementați gestionarea corectă a ciclului de viață al sesiunii și nu folosiți niciodată sesiunile pentru autentificare

- **Cele Mai Bune Practici de Securitate OAuth**: Preveniți atacurile deputy confuz prin consimțământ explicit al utilizatorului pentru clienții înregistrați dinamic, implementarea corectă OAuth 2.1 cu PKCE, și validarea strictă a URI-ului de redirecționare

- **Principiile de Securitate ale Tokenului**: Evitați anti-modelele de transmitere a tokenurilor, validați declarațiile de audiență ale tokenurilor, implementați tokenuri cu durată scurtă de viață și rotație securizată, și mențineți limite clare de încredere

- **Securitatea Completă a Lanțului de Aprovizionare**: Tratați toate componentele ecosistemului AI (modele, embeddings, furnizori de context, API-uri externe) cu aceeași rigoare de securitate ca și dependențele tradiționale de software

- **Evoluție Continuă**: Fiți la curent cu specificațiile MCP în rapidă evoluție, contribuiți la standardele comunității de securitate și mențineți poziții adaptive de securitate pe măsură ce protocolul se maturizează

- **Integrarea Securității Microsoft**: Profitați de ecosistemul cuprinzător de securitate Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pentru o protecție sporită a implementării MCP

## Resurse Cuprinzătoare

### **Documentație Oficială de Securitate MCP**
- [Specificația MCP (Curent: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Cele Mai Bune Practici de Securitate MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specificația de Autorizare MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Depozitul MCP GitHub](https://github.com/modelcontextprotocol)

### **Resurse OWASP pentru Securitatea MCP**
- [Ghidul OWASP MCP Azure Security](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP cu orientări de implementare Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscurile oficiale de securitate OWASP MCP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Training practic de securitate pentru MCP pe Azure

### **Standarde și Cele Mai Bune Practici de Securitate**
- [Cele Mai Bune Practici OAuth 2.0 Security (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 pentru Securitatea Aplicațiilor Web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 pentru Modele Mari de Limbaj](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Raportul Microsoft Digital Defense](https://aka.ms/mddr)

### **Cercetare și Analiză în Securitatea AI**
- [Injecție de Prompt în MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Atacuri de Otrăvire a Instrumentelor (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing de Cercetare Securitate MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluții de Securitate Microsoft**
- [Documentație Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Serviciul Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Securitatea Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Cele Mai Bune Practici Azure Token Management](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Ghiduri de Implementare și Tutoriale**
- [Azure API Management ca Gateway de Autentificare MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autentificare Microsoft Entra ID cu Servere MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Stocare și criptare securizată a tokenurilor (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps și Securitatea Lanțului de Aprovizionare**
- [Securitatea Azure DevOps](https://azure.microsoft.com/products/devops)
- [Securitatea Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Călătoria Microsoft către Securizarea Lanțului Software Supply](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentație Suplimentară de Securitate**

Pentru orientări de securitate detaliate, consultați aceste documente specializate din această secțiune:

- **[Cele Mai Bune Practici de Securitate MCP 2025](./mcp-security-best-practices-2025.md)** - Cele mai bune practici complete de securitate pentru implementările MCP
- **[Implementarea Azure Content Safety](./azure-content-safety-implementation.md)** - Exemple practice de implementare pentru integrarea Azure Content Safety  
- **[Controale de Securitate MCP 2025](./mcp-security-controls-2025.md)** - Ultimele controale și tehnici de securitate pentru implementările MCP
- **[Referință Rapidă pentru Cele Mai Bune Practici MCP](./mcp-best-practices.md)** - Ghid de referință rapidă pentru practicile esențiale de securitate MCP
- **[BlueHat 2026: Securizarea viitorului AI: Securizarea MCP cu modele de apărare în profunzime](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Modele de apărare în profunzime de la Microsoft Security Response Center (MSRC)

### **Training Practic de Securitate**

- **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop practic cuprinzător pentru securizarea serverelor MCP în Azure, cu tabere progresive de la Base Camp la Summit
- **[Ghidul OWASP MCP Azure Security](https://microsoft.github.io/mcp-azure-security-guide/)** - Arhitectură de referință și orientări de implementare pentru toate riscurile OWASP MCP Top 10

---

## Următorul Pas

Următor: [Capitolul 3: Începem](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->