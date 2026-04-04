# Najbolje prakse sigurnosti MCP-a - Ažuriranje veljače 2026.

> **Važno**: Ovaj dokument odražava najnovije sigurnosne zahtjeve iz [MCP specifikacije 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) i službene [MCP najbolje prakse sigurnosti](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Uvijek se pozivajte na trenutnu specifikaciju za najnovije smjernice.

## 🏔️ Praktična sigurnosna obuka

Za praktično iskustvo implementacije, preporučujemo **[MCP Security Summit radionicu (Sherpa)](https://azure-samples.github.io/sherpa/)** - sveobuhvatnu vođenu ekspediciju za osiguranje MCP poslužitelja u Azureu. Radionica pokriva svih OWASP MCP Top 10 rizika kroz metodologiju "ranjiv → iskoristi → popravi → provjeri".

Sve prakse u ovom dokumentu usklađene su s **[OWASP MCP Azure vodičem za sigurnost](https://microsoft.github.io/mcp-azure-security-guide/)** za upute specifične za implementaciju u Azureu.

## Osnovne sigurnosne prakse za implementacije MCP-a

Model Context Protocol donosi jedinstvene sigurnosne izazove koji nadilaze tradicionalnu sigurnost softvera. Ove prakse adresiraju i temeljne sigurnosne zahtjeve i prijetnje specifične za MCP, uključujući unos prompta, trovanje alata, preuzimanje sesija, probleme "confused deputy" i ranjivosti u prijenosu tokena.

### **OBAVEZNI sigurnosni zahtjevi**

**Kritični zahtjevi iz MCP specifikacije:**

### **OBAVEZNI sigurnosni zahtjevi**

**Kritični zahtjevi iz MCP specifikacije:**

> **NE SMIJU**: MCP poslužitelji **NE SMIJU** prihvatiti bilo kakve tokene koji nisu izričito izdani za MCP poslužitelj  
>  
> **MORAJU**: MCP poslužitelji koji implementiraju autorizaciju **MORAJU** provjeravati SVE dolazne zahtjeve  
>  
> **NE SMIJU**: MCP poslužitelji **NE SMIJU** koristiti sesije za autentikaciju  
>  
> **MORAJU**: MCP proxy poslužitelji koji koriste statičke ID-jeve klijenata **MORAJU** dobiti privolu korisnika za svakog dinamički registriranog klijenta

---

## 1. **Sigurnost tokena i autentikacija**

**Kontrole autentikacije i autorizacije:**  
   - **Detaljna revizija autorizacije**: Provedite opsežne audite logike autorizacije MCP poslužitelja kako biste osigurali pristup samo namijenjenim korisnicima i klijentima  
   - **Integracija s vanjskim pružateljima identiteta**: Koristite etablirane pružatelje identiteta poput Microsoft Entra ID umjesto implementacije prilagođene autentikacije  
   - **Provjera publike tokena**: Uvijek provjeravajte da su tokeni izričito izdani za vaš MCP poslužitelj — nikada ne prihvaćajte tokene s izvora  
   - **Ispravan životni ciklus tokena**: Implementirajte sigurnu rotaciju tokena, politike isteka te spriječite ponovne napade s tokenima

**Zaštićeno pohranjivanje tokena:**  
   - Koristite Azure Key Vault ili slične sigurne skladišta vjerodajnica za sve tajne  
   - Implementirajte enkripciju tokena u mirovanju i u prijenosu  
   - Redovita rotacija vjerodajnica i nadzor neovlaštenog pristupa

## 2. **Upravljanje sesijama i sigurnost prijenosa**

**Sigurne prakse sesija:**  
   - **Kriptografski sigurni ID-ovi sesija**: Koristite sigurne, nedeterminističke ID-ove sesije generirane sigurnim generatorima slučajnih brojeva  
   - **Povezivanje sesije s korisnikom**: Vežite ID-ove sesija za identitete korisnika koristeći formate poput `<user_id>:<session_id>` kako biste spriječili zloupotrebu sesija među korisnicima  
   - **Upravljanje životnim ciklusom sesije**: Implementirajte pravilno istekanje, rotaciju i poništavanje za ograničenje ranjivosti  
   - **Primjena HTTPS/TLS**: Obavezni HTTPS za svu komunikaciju kako bi se spriječilo presretanje ID-ova sesija

**Sigurnost transportnog sloja:**  
   - Konfigurirajte TLS 1.3 gdje je moguće s ispravnim upravljanjem certifikatima  
   - Implementirajte "certificate pinning" za kritične veze  
   - Redovita rotacija certifikata i provjera valjanosti

## 3. **Zaštita od prijetnji specifičnih za AI** 🤖

**Obrana od unošenja prompta:**  
   - **Microsoft AI Prompt Shields**: Primijenite AI Prompt Shields za napredno otkrivanje i filtriranje zlonamjernih uputa  
   - **Sanitizacija unosa**: Provjeravajte i pročišćavajte sve unose kako biste spriječili injekcijske napade i probleme confused deputy  
   - **Granice sadržaja**: Koristite sustave razdjelnika i označavanja podataka kako biste razlikovali pouzdane upute i vanjski sadržaj

**Prevencija trovanja alata:**  
   - **Validacija metapodataka alata**: Provedite provjere integriteta definicija alata i pratite neočekivane promjene  
   - **Dinamički nadzor alata**: Nadzirite ponašanje tijekom izvođenja i postavite upozorenja za nepredviđene obrasce izvršavanja  
   - **Radni tokovi odobrenja**: Zahtijevajte eksplicitne korisničke odobrenja za izmjene alata i promjene mogućnosti

## 4. **Kontrola pristupa i dopuštenja**

**Princip najmanjih ovlasti:**  
   - Dodjeljujte MCP poslužiteljima samo minimalna dopuštenja potrebna za željenu funkcionalnost  
   - Implementirajte kontrolu pristupa temeljenu na ulogama (RBAC) s detaljnim dozvolama  
   - Redoviti pregledi dopuštenja i kontinuirani nadzor za eskalaciju ovlasti

**Kontrole dopuštenja tijekom rada:**  
   - Primijenite ograničenja resursa za sprječavanje napada iscrpljivanja resursa  
   - Koristite izolaciju kontejnera za okruženja izvođenja alata  
   - Implementirajte pristup "just-in-time" za administrativne funkcije

## 5. **Sigurnost i nadzor sadržaja**

**Implementacija sigurnosti sadržaja:**  
   - **Azure Content Safety integracija**: Koristite Azure Content Safety za otkrivanje štetnog sadržaja, pokušaja jailbreaka i kršenja politika  
   - **Analiza ponašanja**: Implementirajte nadzor ponašanja u radu radi otkrivanja anomalija u izvršavanju MCP poslužitelja i alata  
   - **Sveobuhvatno zapisivanje**: Zabilježite sve pokušaje autentikacije, pozive alata i sigurnosne događaje u sigurno, nepromjenjivo spremište

**Kontinuirani nadzor:**  
   - Upozorenja u stvarnom vremenu za sumnjive obrasce i neovlaštene pokušaje pristupa  
   - Integracija sa SIEM sustavima za centralizirano upravljanje sigurnosnim događajima  
   - Redovite sigurnosne revizije i penetracijsko testiranje MCP implementacija

## 6. **Sigurnost lanca opskrbe**

**Verifikacija komponenti:**  
   - **Skener ranjivosti ovisnosti**: Koristite automatizirano skeniranje ranjivosti za sav softver i AI komponente  
   - **Provjera porijekla**: Provjerite podrijetlo, licenciranje i integritet modela, izvora podataka i vanjskih usluga  
   - **Potpisani paketi**: Koristite kriptografski potpisane pakete i provjeravajte potpise prije implementacije

**Siguran razvojni proces:**  
   - **GitHub Advanced Security**: Implementirajte skeniranje tajni, analizu ovisnosti i statičku analizu CodeQL  
   - **Sigurnost CI/CD-a**: Integrirajte provjere sigurnosti kroz automatizirane deployment linije  
   - **Integritet artefakata**: Provedite kriptografsku verifikaciju implementiranih artefakata i konfiguracija

## 7. **Sigurnost OAuth i prevencija confused deputy**

**Implementacija OAuth 2.1:**  
   - **PKCE implementacija**: Koristite Proof Key for Code Exchange (PKCE) za sve zahtjeve autorizacije  
   - **Jasna privola**: Dobijte privolu korisnika za svakog dinamički registriranog klijenta radi sprječavanja confused deputy napada  
   - **Provjera URI preusmjeravanja**: Provedite strogu validaciju URI-ja za preusmjeravanje i identifikatore klijenata

**Sigurnost proxyja:**  
   - Spriječite zaobilaženje autorizacije iskorištavanjem statičkih ID-jeva klijenata  
   - Implementirajte ispravan radni tok za privolu kod pristupa API-jima trećih strana  
   - Nadzirite krađu autorizacijskog koda i neovlašten pristup API-ju

## 8. **Odgovor na incidente i oporavak**

**Brze sposobnosti odgovora:**  
   - **Automatizirani odgovor**: Implementirajte automatizirane sustave za rotaciju vjerodajnica i zadržavanje prijetnji  
   - **Postupci povratka**: Mogućnost brzog vraćanja poznatih dobrih konfiguracija i komponenti  
   - **Forenzičke sposobnosti**: Detaljni audit zapisi i evidencija za istrage incidenata

**Komunikacija i koordinacija:**  
   - Jasni postupci eskalacije za sigurnosne incidente  
   - Integracija s timovima za odgovor na incidente u organizaciji  
   - Redovite simulacije sigurnosnih incidenata i vježbe za stolom

## 9. **Usklađenost i upravljanje**

**Regulatorna usklađenost:**  
   - Osigurajte da implementacije MCP-a zadovoljavaju industrijske zahtjeve (GDPR, HIPAA, SOC 2)  
   - Implementirajte klasifikaciju podataka i kontrole privatnosti za obradu AI podataka  
   - Održavajte potpunu dokumentaciju za reviziju usklađenosti

**Upravljanje promjenama:**  
   - Formalni postupci sigurnosne revizije za sve promjene MCP sustava  
   - Kontrola verzija i radni tokovi odobrenja za promjene konfiguracije  
   - Redovite procjene usklađenosti i analiza nedostataka

## 10. **Napredne sigurnosne kontrole**

**Arhitektura Zero Trust:**  
   - **Nikada ne vjeruj, uvijek provjeri**: Kontinuirana provjera korisnika, uređaja i veza  
   - **Mikrosegreacija**: Detaljne mrežne kontrole koje izoliraju pojedine MCP komponente  
   - **Uvjetni pristup**: Kontrole pristupa temeljene na riziku koje se prilagođavaju trenutnom kontekstu i ponašanju

**Zaštita aplikacija u stvarnom vremenu:**  
   - **Runtime Application Self-Protection (RASP)**: Primjena RASP tehnika za otkrivanje prijetnji u stvarnom vremenu  
   - **Praćenje izvedbe aplikacije**: Nadzirite izvedbene anomalije koje mogu upućivati na napade  
   - **Dinamičke sigurnosne politike**: Implementirajte sigurnosne politike koje se prilagođavaju na temelju trenutnog sigurnosnog okruženja

## 11. **Integracija Microsoft sigurnosnog ekosustava**

**Sveobuhvatna Microsoft sigurnost:**  
   - **Microsoft Defender for Cloud**: Upravljanje sigurnosnim stanjem u oblaku za MCP radne opterećenja  
   - **Azure Sentinel**: Izvorne SIEM i SOAR mogućnosti za napredno otkrivanje prijetnji  
   - **Microsoft Purview**: Upravljanje podacima i usklađenost za AI tijekove rada i izvore podataka

**Upravljanje identitetom i pristupom:**  
   - **Microsoft Entra ID**: Upravljanje identitetima poduzeća s pravilima uvjetnog pristupa  
   - **Privileged Identity Management (PIM)**: Pristup "just-in-time" i radni tokovi odobrenja za administrativne funkcije  
   - **Zaštita identiteta**: Uvjetni pristup temeljeni na riziku i automatizirani odgovor na prijetnje

## 12. **Kontinuirani razvoj sigurnosti**

**Ostati ažuran:**  
   - **Praćenje specifikacija**: Redoviti pregledi ažuriranja MCP specifikacija i promjena sigurnosnih smjernica  
   - **Obavještavanje o prijetnjama**: Integracija AI-specifičnih izvora prijetnji i indikatora kompromisa  
   - **Uključenost u sigurnosnu zajednicu**: Aktivno sudjelovanje u MCP sigurnosnoj zajednici i programima otkrivanja ranjivosti

**Adaptivna sigurnost:**  
   - **Sigurnost temeljena na strojnome učenju**: Korištenje ML za otkrivanje anomalija radi identifikacije novih obrazaca napada  
   - **Prediktivna sigurnosna analitika**: Implementacija prediktivnih modela za proaktivno prepoznavanje prijetnji  
   - **Automatizacija sigurnosti**: Automatska ažuriranja sigurnosnih politika na temelju obavještavanja o prijetnjama i promjena u specifikaciji

---

## **Ključni sigurnosni resursi**

### **Službena MCP dokumentacija**  
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP najbolje prakse sigurnosti](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP specifikacija autorizacije](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **OWASP MCP sigurnosni resursi**  
- [OWASP MCP Azure vodič za sigurnost](https://microsoft.github.io/mcp-azure-security-guide/) - Sveobuhvatni OWASP MCP Top 10 s implementacijom u Azureu  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Službeni OWASP MCP sigurnosni rizici  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična sigurnosna obuka za MCP na Azureu  

### **Microsoft sigurnosna rješenja**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Microsoft Entra ID sigurnost](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  

### **Sigurnosni standardi**  
- [OAuth 2.0 najbolje prakse sigurnosti (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 za velike jezične modele](https://genai.owasp.org/)  
- [NIST okvir upravljanja rizicima za AI](https://www.nist.gov/itl/ai-risk-management-framework)  

### **Vodiči za implementaciju**  
- [Azure API Management MCP Gateway autentikacija](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
- [Microsoft Entra ID s MCP poslužiteljima](https://den.dev/blog/mcp-server-auth-entra-id-session/)  

---

> **Sigurnosna obavijest**: Prakse sigurnosti MCP-a brzo se razvijaju. Uvijek provjerite trenutnu [MCP specifikaciju](https://spec.modelcontextprotocol.io/) i [službenu sigurnosnu dokumentaciju](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) prije implementacije.

## Što slijedi

- Pročitajte: [MCP sigurnosne kontrole 2025](./mcp-security-controls-2025.md)  
- Povratak na: [Pregled sigurnosnog modula](./README.md)  
- Nastavite na: [Modul 3: Početak rada](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj je dokument preveden pomoću AI usluge za prevođenje [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati službenim i autoritativnim izvorom. Za ključne informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakve nesporazume ili pogrešna tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->