# Cele mai bune practici de securitate MCP 2025

Acest ghid cuprinzător descrie cele mai esențiale practici de securitate pentru implementarea sistemelor Model Context Protocol (MCP), bazate pe cea mai recentă **Specificație MCP 2025-11-25** și standardele actuale din industrie. Aceste practici abordează atât preocupările tradiționale de securitate, cât și amenințările specifice AI unice pentru implementările MCP.

## Cerințe critice de securitate

### Controale de securitate obligatorii (cerințe MUST)

1. **Validarea tokenului**: Serverele MCP **NU TREBUIE** să accepte niciun token care nu a fost emis explicit pentru serverul MCP însuși
2. **Verificarea autorizării**: Serverele MCP care implementează autorizare **TREBUIE** să verifice TOATE cererile primite și **NU TREBUIE** să folosească sesiuni pentru autentificare  
3. **Consimțământul utilizatorului**: Serverele proxy MCP ce utilizează ID-uri client statice **TREBUIE** să obțină consimțământ explicit de la utilizator pentru fiecare client înregistrat dinamic
4. **ID-uri de sesiune securizate**: Serverele MCP **TREBUIE** să folosească ID-uri de sesiune criptografic securizate, nedeterminate, generate cu generatoare sigure de numere aleatoare

## Practici de securitate fundamentale

### 1. Validarea și curățarea inputului
- **Validare completă a inputului**: Validați și curățați toate inputurile pentru a preveni atacurile de injectare, probleme de tip „confused deputy” și vulnerabilități de injectare a prompturilor
- **Aplicarea schemei parametrilor**: Implementați validarea strictă a schemei JSON pentru toți parametrii instrumentelor și inputurile API
- **Filtrarea conținutului**: Folosiți Microsoft Prompt Shields și Azure Content Safety pentru a filtra conținutul malițios din prompturi și răspunsuri
- **Curățarea outputului**: Validați și curățați toate outputurile modelului înainte de a le prezenta utilizatorilor sau sistemelor downstream

### 2. Excelență în autentificare și autorizare  
- **Furnizori externi de identitate**: Delegați autentificarea către furnizori de identitate stabiliți (Microsoft Entra ID, furnizori OAuth 2.1) în loc să implementați autentificare personalizată
- **Permisiuni granularizate**: Implementați permisiuni granulare, specifice pentru instrumente, urmând principiul celui mai mic privilegiu
- **Managementul ciclului de viață al tokenurilor**: Folosiți tokenuri de acces cu durată scurtă de viață, cu rotație securizată și validare corectă a audienței
- **Autentificare multi-factor (MFA)**: Solicitați MFA pentru tot accesul administrativ și operațiunile sensibile

### 3. Protocoale sigure de comunicare
- **Securitatea nivelului de transport**: Folosiți HTTPS/TLS 1.3 pentru toate comunicațiile MCP cu validare corectă a certificatelor
- **Criptare end-to-end**: Implementați straturi suplimentare de criptare pentru date foarte sensibile în tranzit și în repaus
- **Managementul certificatelor**: Mențineți un management corect al ciclului de viață al certificatelor cu procese automate de reînnoire
- **Aplicarea versiunii protocolului**: Folosiți versiunea curentă a protocolului MCP (2025-11-25) cu negocierea adecvată a versiunii.

### 4. Limitarea avansată a ratei și protecția resurselor
- **Limitare multi-strat a ratei**: Implementați limitare a ratei la nivel de utilizator, sesiune, instrument și resurse pentru a preveni abuzul
- **Limitare adaptivă a ratei**: Folosiți limitare a ratei bazată pe machine learning care se adaptează la modelele de utilizare și indicatorii de amenințare
- **Managementul cotelor de resurse**: Stabiliți limite adecvate pentru resursele computaționale, utilizarea memoriei și timpul de execuție
- **Protecție DDoS**: Implementați sisteme cuprinzătoare de protecție DDoS și analiză a traficului

### 5. Jurnalizare complexă și monitorizare
- **Jurnal de audit structurat**: Implementați jurnale detaliate, căutabile, pentru toate operațiile MCP, execuțiile uneltelor și evenimentele de securitate
- **Monitorizare în timp real a securității**: Implementați sisteme SIEM cu detecție AI a anomaliilor pentru încărcăturile MCP
- **Jurnalizare conformă cu confidențialitatea**: Înregistrați evenimentele de securitate respectând cerințele și reglementările privind confidențialitatea datelor
- **Integrare răspuns la incidente**: Conectați sistemele de jurnalizare la fluxuri automate de răspuns la incidente

### 6. Practici îmbunătățite de stocare securizată
- **Module hardware de securitate (HSM)**: Utilizați stocare de chei susținută de HSM (Azure Key Vault, AWS CloudHSM) pentru operațiuni criptografice critice
- **Managementul cheilor de criptare**: Implementați rotația, segregarea și controalele de acces corespunzătoare pentru cheile de criptare
- **Gestionarea secretelor**: Stocați toate cheile API, tokenurile și credențialele în sisteme dedicate de management al secretelor
- **Clasificarea datelor**: Clasificați datele în funcție de nivelurile de sensibilitate și aplicați măsuri adecvate de protecție

### 7. Management avansat al tokenurilor
- **Prevenirea trecerii tokenurilor (passthrough)**: Interziceți explicit modelele de trecere a tokenurilor care ocolesc controalele de securitate
- **Validarea audienței**: Verificați întotdeauna că revendicările audienței tokenului corespund identității intenționate a serverului MCP
- **Autorizare bazată pe revendicări**: Implementați autorizare granulară bazată pe revendicările tokenului și atributele utilizatorului
- **Legarea tokenurilor**: Legați tokenurile de sesiuni, utilizatori sau dispozitive specifice unde este cazul

### 8. Management securizat al sesiunii
- **ID-uri criptografice de sesiune**: Generați ID-urile de sesiune folosind generatoare criptografice sigure de numere aleatoare (nu secvențe previzibile)
- **Legare specifică utilizatorului**: Legați ID-urile de sesiune de informații specifice utilizatorului folosind formate sigure precum `<user_id>:<session_id>`
- **Controale asupra ciclului de viață al sesiunii**: Implementați expirarea, rotația și invalidarea corectă a sesiunilor
- **Antete HTTP de securitate pentru sesiune**: Folosiți antete HTTP de securitate corespunzătoare pentru protecția sesiunii

### 9. Controale de securitate specifice AI
- **Apărare împotriva injectării de prompturi**: Implementați Microsoft Prompt Shields cu tehnici de evidențiere, delimitatori și marcare a datelor
- **Prevenirea otrăvirii instrumentelor**: Validați metadatele instrumentelor, monitorizați schimbările dinamice și verificați integritatea instrumentelor
- **Validarea outputului modelului**: Scanați outputurile modelului pentru potențiale scurgeri de date, conținut dăunător sau încălcări ale politicii de securitate
- **Protecția ferestrei de context**: Implementați controale pentru a preveni otrăvirea ferestrei de context și atacurile de manipulare

### 10. Securitatea execuției uneltelor
- **Izolare prin sandboxing**: Rulați execuțiile uneltelor în medii containerizate, izolate, cu limite de resurse
- **Separarea privilegiilor**: Executați instrumentele cu privilegii minime necesare și conturi de serviciu separate
- **Izolare de rețea**: Implementați segmentarea rețelei pentru mediile de execuție ale uneltelor
- **Monitorizarea execuției**: Monitorizați execuția uneltelor pentru comportamente anormale, utilizarea resurselor și încălcări de securitate

### 11. Validare continuă a securității
- **Testare automată de securitate**: Integrați testarea de securitate în pipeline-urile CI/CD cu instrumente precum GitHub Advanced Security
- **Managementul vulnerabilităților**: Scanați regulat toate dependențele, inclusiv modelele AI și serviciile externe
- **Testare de penetrare**: Efectuați evaluări periodice de securitate vizează implementările MCP
- **Revizuiri de cod securizate**: Implementați recenzii obligatorii de securitate pentru toate modificările de cod legate de MCP

### 12. Securitatea lanțului de aprovizionare pentru AI
- **Verificarea componentelor**: Verificați proveniența, integritatea și securitatea tuturor componentelor AI (modele, embeddings, API-uri)
- **Managementul dependențelor**: Mențineți inventare actualizate ale tuturor software-urilor și dependențelor AI cu urmărirea vulnerabilităților
- **Depozite de încredere**: Folosiți surse verificate și de încredere pentru toate modelele AI, bibliotecile și uneltele
- **Monitorizarea lanțului de aprovizionare**: Monitorizați continuu compromiterile furnizorilor de servicii AI și depozitelor de modele

## Modele avansate de securitate

### Arhitectura Zero Trust pentru MCP
- **Niciodată nu aveți încredere, verificați întotdeauna**: Implementați verificare continuă pentru toți participanții MCP
- **Micro-segmentare**: Izolați componentele MCP cu controale granulare de rețea și identitate
- **Acces condiționat**: Implementați controale de acces bazate pe risc care se adaptează la context și comportament
- **Evaluare continuă a riscului**: Evaluați dinamic postura de securitate bazată pe indicatorii actuali de amenințare

### Implementare AI care respectă confidențialitatea
- **Minimizarea datelor**: Expuneți doar datele minime necesare pentru fiecare operațiune MCP
- **Confidențialitate diferențială**: Implementați tehnici de protecție a confidențialității pentru procesarea datelor sensibile
- **Criptare homomorfă**: Folosiți tehnici avansate de criptare pentru calculul securizat pe date criptate
- **Învățare federată**: Implementați abordări distribuite de învățare care păstrează localitatea și confidențialitatea datelor

### Răspuns la incidente pentru sisteme AI
- **Proceduri specifice pentru incidente AI**: Dezvoltați proceduri de răspuns la incidente adaptate amenințărilor specifice AI și MCP
- **Răspuns automatizat**: Implementați conținere și remediere automate pentru incidente comune de securitate AI  
- **Capabilități de investigație**: Mențineți pregătirea pentru investigații în cazuri de compromitere a sistemelor AI și breșe de date
- **Proceduri de recuperare**: Stabiliți proceduri pentru recuperarea după otrăvirea modelelor AI, atacuri de injectare a prompturilor și compromiterea serviciilor

## Resurse și standarde pentru implementare

### 🏔️ Training practic de securitate
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop practic cuprinzător pentru securizarea serverelor MCP în Azure
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Arhitectură de referință și ghid de implementare OWASP MCP Top 10

### Documentație oficială MCP
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Specificația curentă a protocolului MCP
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Ghid oficial de securitate
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Modele de autentificare și autorizare
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Cerințe de securitate pentru nivelul de transport

### Soluții de securitate Microsoft
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Protecție avansată împotriva injectării de prompturi
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Filtrare cuprinzătoare a conținutului AI
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Management enterprise al identității și accesului
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Management securizat al secretelor și credențialelor
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Scanare de securitate pentru lanțul de aprovizionare și cod

### Standardele și cadrele de securitate
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Ghid curent de securitate OAuth
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Riscurile de securitate pentru aplicații web
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Riscuri de securitate specifice AI
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Management cuprinzător al riscurilor AI
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Sisteme de management al securității informației

### Ghiduri de implementare și tutoriale
- [Azure API Management ca MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Modele enterprise de autentificare
- [Microsoft Entra ID cu servere MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integrarea furnizorului de identitate
- [Implementare stocare securizată a tokenurilor](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Cele mai bune practici pentru managementul tokenurilor
- [Criptare end-to-end pentru AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Modele avansate de criptare

### Resurse avansate de securitate
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Practici de dezvoltare securizată
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - Testare de securitate specifică AI
- [Threat Modeling pentru sisteme AI](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodologie de modelare a amenințărilor AI
- [Privacy Engineering pentru AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Tehnici AI care respectă confidențialitatea

### Conformitate și guvernanță
- [Conformitate GDPR pentru AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Conformitatea privacy în sistemele AI
- [Cadru de guvernanță AI](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Implementarea AI responsabil
- [SOC 2 pentru servicii AI](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Controale de securitate pentru furnizorii de servicii AI
- [Conformitate HIPAA pentru AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Cerințe de conformitate pentru AI în sănătate

### DevSecOps și automatizare
- [Pipeline DevSecOps pentru AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Pipeline-uri securizate pentru dezvoltare AI
- [Testare automată de securitate](https://learn.microsoft.com/security/engineering/devsecops) - Validare continuă a securității
- [Securitate pentru infrastructură ca cod](https://learn.microsoft.com/security/engineering/infrastructure-security) - Implementarea securizată a infrastructurii
- [Securitatea containerelor pentru AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Securitatea containerizării pentru workload-uri AI

### Monitorizare și răspuns la incidente  
- [Azure Monitor pentru workload-uri AI](https://learn.microsoft.com/azure/azure-monitor/overview) - Soluții cuprinzătoare de monitorizare
- [Răspuns la incidente de securitate AI](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Proceduri specifice de răspuns AI
- [SIEM pentru sisteme AI](https://learn.microsoft.com/azure/sentinel/overview) - Managementul informațiilor și evenimentelor de securitate
- [Inteligență de amenințare pentru AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Surse de inteligență pentru amenințări AI

## 🔄 Îmbunătățire continuă

### Fiți la curent cu standardele în evoluție
- **Actualizări specificații MCP**: Monitorizați modificările oficiale ale specificației MCP și avertizările de securitate
- **Inteligență de amenințări**: Abonați-vă la feed-uri de amenințări și baze de date de vulnerabilități AI
- **Implicarea comunității**: Participați la discuțiile și grupurile de lucru ale comunității de securitate MCP
- **Evaluare regulată**: Efectuați evaluări trimestriale ale stării de securitate și actualizați practicile în consecință

### Contribuția la securitatea MCP
- **Cercetare în domeniul securității**: Contribuiți la cercetarea securității MCP și la programele de divulgare a vulnerabilităților
- **Împărtășirea celor mai bune practici**: Distribuiți implementări de securitate și lecții învățate cu comunitatea
- **Dezvoltarea standardelor**: Participați la dezvoltarea specificațiilor MCP și la crearea standardelor de securitate
- **Dezvoltarea instrumentelor**: Dezvoltați și partajați instrumente și biblioteci de securitate pentru ecosistemul MCP

---

*Acest document reflectă cele mai bune practici de securitate MCP începând cu 18 decembrie 2025, bazate pe Specificația MCP 2025-11-25. Practicile de securitate trebuie revizuite și actualizate regulat pe măsură ce protocolul și peisajul amenințărilor evoluează.*

## Ce urmează

- Citiți: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Întoarceți-vă la: [Prezentare generală a modulului de securitate](./README.md)
- Continuați către: [Modulul 3: Începutul](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:  
Acest document a fost tradus folosind serviciul de traducere automată [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim să asigurăm acuratețea, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original, în limba sa nativă, trebuie considerat sursa oficială și autoritară. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care pot rezulta din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->