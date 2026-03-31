# MCP Sigurnosne Najbolje Prakse 2025

Ovaj sveobuhvatni vodič opisuje ključne sigurnosne najbolje prakse za implementaciju Model Context Protocol (MCP) sustava temeljenih na najnovijoj **MCP Specifikaciji 2025-11-25** i trenutnim industrijskim standardima. Ove prakse obrađuju tradicionalne sigurnosne zabrinutosti kao i AI-specifične prijetnje jedinstvene za MCP implementacije.

## Kritični Sigurnosni Zahtjevi

### Obvezne Sigurnosne Kontrole (MUST Zahtjevi)

1. **Validacija Tokena**: MCP serveri **NE SMIJU** prihvaćati bilo kakve tokene koji nisu izričito izdani za sam MCP server
2. **Verifikacija Autorizacije**: MCP serveri koji implementiraju autorizaciju **MORAJU** verificirati SVE dolazne zahtjeve i **NE SMIJU** koristiti sesije za autentikaciju  
3. **Sukladnost Korisnika**: MCP proxy serveri koji koriste statične klijentske ID-eve **MORAJU** dobiti izričit pristanak korisnika za svakog dinamički registriranog klijenta
4. **Sigurni ID-evi Sesija**: MCP serveri **MORAJU** koristiti kriptografski sigurne, nedeterminističke ID-eve sesija generirane sigurnim generatorima slučajnih brojeva

## Temeljne Sigurnosne Prakse

### 1. Validacija i Sanitizacija Unosa
- **Sveobuhvatna Validacija Unosa**: Validirati i očistiti sve ulaze kako bi se spriječili napadi ubrizgavanja, problemi s konfuznim punomoćnicima i ranjivosti na ubrizgavanje prompta
- **Primjena Sheme Parametara**: Implementirati strogu validaciju JSON shema za sve parametre alata i API ulaze
- **Filtriranje Sadržaja**: Koristiti Microsoft Prompt Shields i Azure Content Safety za filtriranje zlonamjernog sadržaja u promptovima i odgovorima
- **Sanitizacija Izlaza**: Validirati i očistiti sve izlaze modela prije prezentacije korisnicima ili sustavima nizvodno

### 2. Izvrsnost Autentikacije i Autorizacije  
- **Vanjski Provideri Identiteta**: Delegirati autentikaciju etabliranim providerima identiteta (Microsoft Entra ID, OAuth 2.1 provideri) umjesto implementacije vlastite autentikacije
- **Detaljne Dozvole**: Implementirati granularne, alat-specifične dozvole slijedeći princip najmanjeg privilegija
- **Upravljanje Životnim Ciklusom Tokena**: Koristiti kratkotrajne pristupne tokene s sigurnom rotacijom i ispravnom validacijom publike
- **Višefaktorska Autentikacija**: Zahtijevati MFA za sav administratorski pristup i osjetljive operacije

### 3. Sigurni Protokoli Komunikacije
- **Transport Layer Security**: Koristiti HTTPS/TLS 1.3 za svu MCP komunikaciju s ispravnom validacijom certifikata
- **End-to-End Enkripcija**: Implementirati dodatne slojeve enkripcije za izrazito osjetljive podatke u prijenosu i u mirovanju
- **Upravljanje Certifikatima**: Održavati pravilno upravljanje životnim ciklusom certifikata s automatiziranim procesima obnove
- **Primjena Verzije Protokola**: Koristiti trenutačnu MCP verziju protokola (2025-11-25) s ispravnim pregovaranjem verzije

### 4. Napredno Ograničavanje Stope i Zaštita Resursa
- **Višeslojno Ograničavanje Stope**: Implementirati ograničenje stope na korisničkoj, sesijskoj, alatnoj i razini resursa kako bi se spriječila zloupotreba
- **Adaptivno Ograničavanje Stope**: Koristiti ograničavanje stope temeljeno na strojnom učenju koje se prilagođava obrascima korištenja i pokazateljima prijetnji
- **Upravljanje Kvotama Resursa**: Postaviti odgovarajuće limite za računalne resurse, korištenje memorije i vrijeme izvršavanja
- **Zaštita od DDoS Napada**: Implementirati sveobuhvatne sustave za zaštitu od DDoS-a i analizu prometa

### 5. Sveobuhvatno Logiranje i Nadzor
- **Strukturirano Audit Logiranje**: Implementirati detaljne, pretražive zapise za sve MCP operacije, izvršenja alata i sigurnosne događaje
- **Nadzor Sigurnosti u Realnom Vremenu**: Primijeniti SIEM sustave s AI-potpomognutom detekcijom anomalija za MCP radna opterećenja
- **Logiranje u Sukladu s Privatnošću**: Bilježiti sigurnosne događaje uz poštivanje zahtjeva i propisa o privatnosti podataka
- **Integracija za Odgovor na Incidente**: Povezati sustave logiranja s automatiziranim tijekovima rada za odgovor na incidente

### 6. Poboljšane Sigurne Prakse Pohrane
- **Hardverski Sigurnosni Moduli**: Koristiti pohranu ključeva potpomognutu HSM-om (Azure Key Vault, AWS CloudHSM) za kritične kriptografske operacije
- **Upravljanje Ključevima za Enkripciju**: Implementirati pravilnu rotaciju ključeva, segregaciju i kontrole pristupa za enkripcijske ključeve
- **Upravljanje Tajnama**: Pohranjivati sve API ključeve, tokene i vjerodajnice u posvećene sustave za upravljanje tajnama
- **Klasifikacija Podataka**: Klasificirati podatke prema razini osjetljivosti i primijeniti odgovarajuće mjere zaštite

### 7. Napredno Upravljanje Tokenima
- **Sprečavanje Propuštanja Tokena**: Izričito zabraniti obrasce propuštanja tokena koji zaobilaze sigurnosne kontrole
- **Validacija Publike Tokena**: Uvijek verificirati da tvrdnje o publici tokena odgovaraju namijenjenom MCP server identitetu
- **Autorizacija Temeljena na Tvrdnjama**: Implementirati detaljnu autorizaciju temeljenu na tvrdnjama tokena i atributima korisnika
- **Povezivanje Tokena**: Povezati tokene s određenim sesijama, korisnicima ili uređajima gdje je prikladno

### 8. Sigurno Upravljanje Sesijama
- **Kriptografski Sigurni ID-evi Sesija**: Generirati ID-eve sesija pomoću kriptografski sigurnih generatora slučajnih brojeva (nepredvidive sekvence)
- **Povezivanje Sa Specifičnim Korisnikom**: Vezu ID-eve sesija s informacijama specifičnima za korisnika koristeći sigurne formate poput `<user_id>:<session_id>`
- **Kontrole Životnog Ciklusa Sesija**: Implementirati pravilno isteka, rotaciju i poništavanje sesija
- **Sigurnosni Zaglavlja Sesije**: Koristiti odgovarajuća HTTP sigurnosna zaglavlja za zaštitu sesija

### 9. AI-specifične Sigurnosne Kontrole
- **Obrana od Ubrizgavanja Promptova**: Implementirati Microsoft Prompt Shields sa spotlightingom, delimiterima i tehnikama označavanja podataka
- **Sprječavanje Trovanja Alata**: Validirati metapodatke alata, nadzirati dinamičke promjene i provjeravati integritet alata
- **Validacija Izlaza Modela**: Pregledavati izlaze modela za moguće curenje podataka, štetan sadržaj ili kršenja sigurnosnih politika
- **Zaštita Kontekstualnog Prozora**: Implementirati kontrole za sprječavanje trovanja i manipulacije kontekstualnog prozora

### 10. Sigurnost Izvršenja Alata
- **Izolacija Izvršenja**: Izvršavati alate u kontejneriziranim, izoliranim okruženjima s ograničenjima resursa
- **Razdvajanje Privilegija**: Izvršavati alate s minimalnim potrebnim privilegijama i odvojenim korisničkim računima usluge
- **Mrežna Izolacija**: Implementirati mrežnu segmentaciju za okruženja izvršenja alata
- **Nadziranje Izvršenja**: Nadzirati izvršenje alata zbog anomalnog ponašanja, korištenja resursa i sigurnosnih kršenja

### 11. Kontinuirana Sigurnosna Validacija
- **Automatizirano Sigurnosno Testiranje**: Integrirati sigurnosno testiranje u CI/CD pipelineove koristeći alate poput GitHub Advanced Security
- **Upravljanje Ranljivostima**: Redovito skenirati sve ovisnosti, uključujući AI modele i vanjske servise
- **Penetracijsko Testiranje**: Provoditi redovne sigurnosne procjene specifično usmjerene na MCP implementacije
- **Sigurnosne Revizije Koda**: Implementirati obavezne sigurnosne preglede za sve MCP povezane promjene koda

### 12. Sigurnost Lanca Opskrbe za AI
- **Verifikacija Komponenti**: Verificirati podrijetlo, integritet i sigurnost svih AI komponenti (modeli, embeddings, API-jevi)
- **Upravljanje Ovisnostima**: Održavati ažurne popise svih softverskih i AI ovisnosti s praćenjem ranjivosti
- **Pouzdani Repozitoriji**: Koristiti verificirane, pouzdane izvore za sve AI modele, biblioteke i alate
- **Nadzor Lanca Opskrbe**: Kontinuirano pratiti kompromitacije u AI pružateljima usluga i repozitorijima modela

## Napredni Sigurnosni Obrasci

### Arhitektura Zero Trust za MCP
- **Nikada Ne Vjeruj, Uvijek Provjeri**: Implementirati kontinuiranu validaciju za sve MCP sudionike
- **Mikrosegmentacija**: Izolirati MCP komponente granuliranim mrežnim i identitetnim kontrolama
- **Uvjetni Pristup**: Implementirati kontrole pristupa temeljene na riziku koje se prilagođavaju kontekstu i ponašanju
- **Kontinuirana Procjena Rizika**: Dinamički procjenjivati sigurnosni položaj na temelju trenutnih pokazatelja prijetnji

### Privatnost-zadržavajuća Implementacija AI
- **Minimizacija Podataka**: Izlagati samo minimalne potrebne podatke za svaku MCP operaciju
- **Diferencijalna Privatnost**: Implementirati tehnike očuvanja privatnosti za obradu osjetljivih podataka
- **Homomorfna Enkripcija**: Koristiti napredne enkripcijske tehnike za sigurne proračune nad šifriranim podacima
- **Federirano Učenje**: Implementirati distribuirane pristupe učenju koji čuvaju lokalitet podataka i privatnost

### Odgovor na Incidente za AI Sustave
- **AI-specifične Procedure za Odgovor na Incidente**: Razviti procedure odgovora na incidente prilagođene AI i MCP specifičnim prijetnjama
- **Automatizirani Odgovor**: Implementirati automatizirano zadržavanje i sanaciju za česte AI sigurnosne incidente  
- **Forenzičke Mogućnosti**: Održavati forenzičku spremnost za kompromite AI sustava i curenje podataka
- **Procedure Oporavka**: Uspostaviti procedure za oporavak od trovanja AI modela, napada ubrizgavanja prompta i kompromitacija usluga

## Resursi i Standardi za Implementaciju

### 🏔️ Praktična Sigurnosna Obuka
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Sveobuhvatan praktični radionica za osiguranje MCP servera u Azureu
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referentna arhitektura i smjernice za implementaciju OWASP MCP Top 10

### Službena MCP Dokumentacija
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Trenutna MCP specifikacija protokola
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Službene sigurnosne smjernice
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Obrasci autentikacije i autorizacije
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Zahtjevi za sigurnost transportnog sloja

### Microsoft Sigurnosna Rješenja
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Napredna zaštita od ubrizgavanja prompta
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Sveobuhvatno filtriranje sadržaja za AI
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Upravljanje identitetom i pristupom u poduzećima
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Sigurno upravljanje tajnama i vjerodajnicama
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Skeniranje sigurnosti lanca opskrbe i koda

### Sigurnosni Standardi i Okviri
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Trenutne sigurnosne smjernice za OAuth
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Sigurnosni rizici web aplikacija
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI-specifični sigurnosni rizici
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Sveobuhvatno upravljanje AI rizicima
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Sustavi upravljanja informacijskom sigurnošću

### Vodiči za Implementaciju i Tutorijali
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Obrasci autentikacije za poduzeća
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integracija pružatelja identiteta
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Najbolje prakse upravljanja tokenima
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Napredni obrasci enkripcije

### Napredni Sigurnosni Resursi
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Prakse sigurnog razvoja
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI-specifično sigurnosno testiranje
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodologija modeliranja prijetnji za AI
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Tehnike očuvanja privatnosti u AI

### Usklađenost i Upravljanje
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Usklađenost privatnosti u AI sustavima
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Odgovorna implementacija AI
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Sigurnosne kontrole za pružatelje AI usluga
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Uvjeti usklađenosti za AI u zdravstvu

### DevSecOps i Automatizacija
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Sigurni pipelineovi za razvoj AI
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Kontinuirana sigurnosna validacija
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Sigurno postavljanje infrastrukture
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Sigurnost kontejnera za AI radna opterećenja

### Nadzor i Odgovor na Incidente  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Sveobuhvatna rješenja za nadzor
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI-specifične procedure za odgovor na incidente
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Upravljanje sigurnosnim informacijama i događajima
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Izvori obavještajnih informacija o AI prijetnjama

## 🔄 Kontinuirano Unapređenje

### Ostanite Ažurni s Promjenjivim Standardima
- **Ažuriranja MCP Specifikacije**: Pratite službene promjene MCP specifikacije i sigurnosna priopćenja
- **Obavještajni Podaci o Prijetnjama**: Pretplatite se na feedove prijetnji AI sigurnosti i baze ranjivosti  
- **Zajedničko sudjelovanje**: Sudjelujte u raspravama i radnim skupinama MCP sigurnosne zajednice
- **Redovita procjena**: Provodite tromjesečne procjene sigurnosnog stanja i sukladno tome ažurirajte prakse

### Doprinos MCP sigurnosti
- **Sigurnosna istraživanja**: Doprinosite MCP sigurnosnim istraživanjima i programima otkrivanja ranjivosti
- **Dijeljenje najboljih praksi**: Dijelite sigurnosne implementacije i naučene lekcije sa zajednicom
- **Razvoj standarda**: Sudjelujte u razvoju MCP specifikacija i izradi sigurnosnih standarda
- **Razvoj alata**: Razvijajte i dijelite sigurnosne alate i biblioteke za MCP ekosustav

---

*Ovaj dokument odražava najbolje MCP sigurnosne prakse od 18. prosinca 2025., temeljem MCP specifikacije 2025-11-25. Sigurnosne prakse trebaju se redovito pregledavati i ažurirati kako protokol i prijetnje napreduju.*

## Što slijedi

- Pročitajte: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Vratite se na: [Pregled sigurnosnog modula](./README.md)
- Nastavite na: [Modul 3: Početak rada](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument preveden je korištenjem AI usluge za prijevod [Co-op Translator](https://github.com/Azure/co-op-translator). Iako se trudimo postići točnost, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na njegovom izvornom jeziku treba smatrati autoritativnim izvorom. Za kritične informacije preporučujemo profesionalni prevod ljudskog stručnjaka. Ne snosimo odgovornost za bilo kakva nesporazuma ili kriva tumačenja proizašla iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->