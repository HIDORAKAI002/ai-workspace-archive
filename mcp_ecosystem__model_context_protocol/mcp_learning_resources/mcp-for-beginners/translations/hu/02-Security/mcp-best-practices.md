# MCP Biztonsági Legjobb Gyakorlatai 2025

Ez az átfogó útmutató ismerteti az alapvető biztonsági legjobb gyakorlatokat a Model Context Protocol (MCP) rendszerek megvalósításához a legfrissebb **MCP Specifikáció 2025-11-25** és a jelenlegi iparági szabványok alapján. Ezek a gyakorlatok mind a hagyományos biztonsági kérdéseket, mind az MCP telepítésekre jellemző, AI-specifikus fenyegetéseket kezelik.

## Kritikus Biztonsági Követelmények

### Kötelező Biztonsági Intézkedések (KÖTELEZŐ Követelmények)

1. **Token Érvényesítés**: Az MCP szerverek **NEM FOGADHATJÁK EL** azokat a tokeneket, amelyeket nem kifejezetten az MCP szerver számára bocsátottak ki  
2. **Jogosultság Ellenőrzés**: Az engedélyezést végrehajtó MCP szervereknek **MINDEN** bejövő kérést ellenőrizniük kell, és **NEM HASZNÁLHATNAK** munkameneteket hitelesítéshez  
3. **Felhasználói Hozzájárulás**: Az MCP proxy szerverek, amelyek statikus kliens-azonosítókat használnak, **MINDEN** dinamikusan regisztrált klienshez kifejezett felhasználói hozzájárulást kell, hogy szerezzenek  
4. **Biztonságos Munkamenet ID-k**: Az MCP szervereknek kriptográfiailag biztonságos, nem determinisztikus munkamenetazonosítókat kell használniuk, amelyeket biztonságos véletlenszám-generátorokkal hoznak létre

## Alapvető Biztonsági Gyakorlatok

### 1. Bemenet Érvényesítés és Tisztítás
- **Átfogó Bemenet Érvényesítés**: Minden bemenetet ellenőrizni és tisztítani kell, hogy megelőzzük az injektálási támadásokat, a félrevezetett megbízott problémákat és a prompt injekciós sérülékenységeket  
- **Paraméter Sémák Betartatása**: Minden eszközparaméterhez és API-bemenethez szigorú JSON séma érvényesítést kell alkalmazni  
- **Tartalomszűrés**: Microsoft Prompt Shields és Azure Content Safety használata a rosszindulatú tartalmak szűrésére a promptokban és válaszokban  
- **Kimenet Tisztítása**: Minden modellkimenetet ellenőrizni és tisztítani kell, mielőtt felhasználóknak vagy további rendszereknek bemutatnák  

### 2. Hitelesítés és Jogosultság Kezelés Kiválósága  
- **Külső Identitásszolgáltatók**: A hitelesítést megbízható identitásszolgáltatókra (Microsoft Entra ID, OAuth 2.1 szolgáltatók) kell delegálni, ahelyett, hogy egyedi megvalósítást használnánk  
- **Finomhangolt Engedélyek**: Eszközspecifikus, részletes jogosultságokat kell megvalósítani a legkisebb jogosultság elve alapján  
- **Token Életciklus Kezelés**: Rövid élettartamú hozzáférési tokeneket kell használni biztonságos forgatással és megfelelő célközönség-ellenőrzéssel  
- **Többtényezős Hitelesítés**: Többtényezős hitelesítést kell követelni minden adminisztratív hozzáféréshez és érzékeny művelethez  

### 3. Biztonságos Kommunikációs Protokollok
- **Szállítási Réteg Biztonság**: Az összes MCP kommunikáció HTTPS/TLS 1.3 protokollt kell használjon megfelelő tanúsítványellenőrzéssel  
- **Végpontok Közötti Titkosítás**: További titkosítási rétegeket kell alkalmazni a rendkívül érzékeny adatok átvitelére és tárolására  
- **Tanúsítványkezelés**: Megfelelő tanúsítvány-életciklus kezelést kell fenntartani automatizált megújítási folyamatokkal  
- **Protokoll Verzió Betartása**: Az aktuális MCP protokollverziót (2025-11-25) kell használni megfelelő verzióegyeztetéssel  

### 4. Fejlett Hívásszám Korlátozás és Erőforrásvédelem
- **Többrétegű Hívásszám Korlátozás**: Felhasználói, munkameneti, eszköz- és erőforrás szintű hívásszám korlátozásokat kell alkalmazni az visszaélések megakadályozására  
- **Adaptív Hívásszám Korlátozás**: Gépi tanuláson alapuló hívásszám-korlátozást kell alkalmazni, amely alkalmazkodik a használati mintákhoz és fenyegetettségi mutatókhoz  
- **Erőforrás Kvóta Kezelés**: Megfelelő korlátokat kell beállítani a számítási erőforrásokra, memóriahasználatra és végrehajtási időre  
- **DDoS Védelem**: Átfogó DDoS védelmi és forgalomelemző rendszereket kell telepíteni  

### 5. Átfogó Naplózás és Megfigyelés
- **Strukturált Audit Naplózás**: Részletes, kereshető naplókat kell megvalósítani az összes MCP művelethez, eszközvégrehajtáshoz és biztonsági eseményhez  
- **Valós Idejű Biztonsági Megfigyelés**: AI-alapú anomáliaészlelési képességekkel ellátott SIEM rendszereket kell telepíteni az MCP terhelésekhez  
- **Adatvédelmi Megfelelőséggel Történő Naplózás**: A biztonsági eseményeket adatvédelmi követelmények és szabályozások tiszteletben tartásával kell naplózni  
- **Incidenskezelés Integráció**: A naplózó rendszereket automatikus incidenskezelési munkafolyamatokhoz kell csatlakoztatni  

### 6. Megerősített Biztonságos Tárolási Gyakorlatok
- **Hardveres Biztonsági Modulok**: Kritikus kriptográfiai műveletekhez HSM-alapú kulcstárolást kell használni (Azure Key Vault, AWS CloudHSM)  
- **Titkosítási Kulcsok Kezelése**: Megfelelő kulcsforgatást, szeparációt és hozzáférés-ellenőrzést kell megvalósítani a titkosítási kulcsokhoz  
- **Titkok Kezelése**: Minden API kulcsot, tokent és hitelesítőt dedikált titokkezelő rendszerekben kell tárolni  
- **Adatok Osztályozása**: Az adatokat érzékenységi szintek alapján kell osztályozni és megfelelő védelmi intézkedéseket kell alkalmazni  

### 7. Fejlett Token Kezelés
- **Token Átadás Megakadályozása**: Kifejezetten tilos az olyan token-átadási sémák alkalmazása, amelyek kikerülik a biztonsági kontrollokat  
- **Célközönség Ellenőrzés**: Mindig ellenőrizni kell a token célközönség igényeit, hogy megfeleljenek a szándékolt MCP szerver identitásának  
- **Jogosultság Alapú Engedélyezés**: Finoman beállított engedélyezést kell alkalmazni a token igények és felhasználói attribútumok alapján  
- **Token Kötés**: A tokeneket adott munkamenetekhez, felhasználókhoz vagy eszközökhöz kell kötni, ahol ez megfelelő  

### 8. Biztonságos Munkamenet-kezelés
- **Kriptográfiai Munkamenet ID-k**: Kriptográfiailag biztonságos véletlenszám-generátorokkal generált munkamenetazonosítókat kell használni (nem előre jelezhető sorozatok)  
- **Felhasználó-specifikus Kötés**: A munkamenetazonosítókat felhasználó-specifikus adatokhoz kell kötni biztonságos formátumokkal, például `<user_id>:<session_id>`  
- **Munkamenet Életciklus Kezelés**: Megfelelő munkamenet lejárati, forgatási és érvénytelenítési mechanizmusokat kell alkalmazni  
- **Munkamenet Biztonsági Fejlécek**: Megfelelő HTTP biztonsági fejléceket kell alkalmazni a munkamenetek védelméhez  

### 9. AI-specifikus Biztonsági Intézkedések
- **Prompt Injektálás Védelem**: Microsoft Prompt Shields telepítése spotlámpázási, elválasztó és adatjelölési technikákkal  
- **Eszközmérgezés Megelőzése**: Validálni kell az eszköz metaadatait, figyelni a dinamikus változásokat és ellenőrizni az eszköz integritását  
- **Modell Kimenet Érvényesítés**: A modell kimeneteket szkennelni kell az esetleges adattitok szivárgás, káros tartalom vagy biztonsági irányelv megsértése miatt  
- **Kontextus Ablak Védelem**: Ellenőrzéseket kell bevezetni a kontextusablak mérgezés és manipuláció elleni védelemre  

### 10. Eszköz Végrehajtás Biztonsága
- **Végrehajtási Sandboxing**: Az eszközvégrehajtást konténerizált, izolált környezetben kell futtatni erőforrás-korlátokkal  
- **Jogosultság Szétválasztás**: Az eszközök futtatása minimális szükséges jogosultságokkal és elkülönített szolgáltatói fiókokkal  
- **Hálózati Izoláció**: Hálózati szegmentációt kell megvalósítani az eszközvégrehajtási környezetek számára  
- **Végrehajtás Megfigyelés**: Figyelni kell az eszközvégrehajtást anomáliák, erőforrás-használat és biztonsági szabálysértések szempontjából  

### 11. Folyamatos Biztonsági Érvényesítés
- **Automatizált Biztonsági Tesztelés**: A biztonsági tesztelést integrálni kell a CI/CD pipeline-okba GitHub Advanced Security-hez hasonló eszközökkel  
- **Sérülékenység Kezelés**: Rendszeresen vizsgálni kell az összes függőséget, beleértve az AI modelleket és külső szolgáltatásokat is  
- **Penetrációs Tesztek**: Rendszeresen kell biztonsági értékeléseket végezni, kifejezetten az MCP megvalósításokra fókuszálva  
- **Biztonsági Kódfelülvizsgálatok**: Kötelező biztonsági felülvizsgálatokat kell vezetni minden MCP-hez kapcsolódó kódváltoztatás során  

### 12. Ellátási Lánc Biztonság az AI számára
- **Komponens Ellenőrzés**: Az AI komponensek (modellek, beágyazások, API-k) eredetét, integritását és biztonságát ellenőrizni kell  
- **Függőségkezelés**: Naprakész nyilvántartást kell vezetni a szoftver és AI függőségekről sérülékenység-kezeléssel  
- **Meglátogatott Tárolók**: Megbízható, ellenőrzött forrásokat kell használni az AI modellekhez, könyvtárakhoz és eszközökhöz  
- **Ellátási Lánc Megfigyelés**: Folyamatosan monitorozni kell az AI szolgáltatók és modell-tárolók kompromittálódását  

## Fejlett Biztonsági Minták

### Zero Trust Architektúra az MCP-hez
- **Sose Bízz Meg, Mindig Ellenőrizz**: Folyamatos ellenőrzést kell megvalósítani az összes MCP résztvevőre  
- **Mikro-szegmentáció**: Elkülöníteni az MCP komponenseket finom hálózati és identitásvezérlés mellett  
- **Feltételes Hozzáférés**: Kockázat alapú hozzáférés-vezérlések megvalósítása, amelyek alkalmazkodnak a kontextushoz és viselkedéshez  
- **Folyamatos Kockázatértékelés**: Dinamikusan értékelni kell a biztonsági helyzetet a jelenlegi fenyegetés-mutató alapján  

### Adatvédelmet Tisztelő AI Megvalósítás
- **Adatminimalizáció**: Csak a szükséges minimális adatokat kell megosztani minden MCP művelethez  
- **Differenciális Adatvédelem**: Adatvédelmi technikák alkalmazása az érzékeny adatok feldolgozásához  
- **Homomorf Titkosítás**: Fejlett titkosítási technikák használata titkosított adatokon végzett biztonságos számításokhoz  
- **Federált Tanulás**: Elosztott tanulási módszerek alkalmazása, amelyek megőrzik az adat lokalitását és adatvédelmét  

### Incidenskezelés AI Rendszerekhez
- **AI-specifikus Incidens Eljárások**: Incidenskezelési eljárások kidolgozása AI és MCP-specifikus fenyegetésekhez  
- **Automatizált Válasz**: Automatizált izolálást és helyreállítást kell megvalósítani az AI biztonsági eseményeihez  
- **Forenzikai Képességek**: Forenzikai készenlét fenntartása AI rendszer sérülések és adatvesztések esetére  
- **Helyreállítási Eljárások**: Eljárások kidolgozása AI modellmérgezés, prompt injekciós támadások és szolgáltatás-kompromittálás esetére  

## Megvalósítási Források és Szabványok

### 🏔️ Gyakorlati Biztonsági Képzések
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – Átfogó gyakorlati workshop MCP szerverek biztonságához Azure környezetben  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** – Referencia architektúra és az OWASP MCP Top 10 megvalósítási útmutató  

### Hivatalos MCP Dokumentáció
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Aktuális MCP protokoll specifikáció  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) – Hivatalos biztonsági iránymutatás  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) – Hitelesítési és engedélyezési minták  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) – Szállítási réteg biztonsági követelmények  

### Microsoft Biztonsági Megoldások
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) – Fejlett prompt injekció elleni védelem  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) – Átfogó AI tartalomszűrés  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) – Vállalati identitás- és hozzáférés-kezelés  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) – Biztonságos titkok és hitelesítő adatok kezelése  
- [GitHub Advanced Security](https://github.com/security/advanced-security) – Ellátási lánc és kódbiztonsági szkennelés  

### Biztonsági Szabványok és Keretrendszerek
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) – Jelenlegi OAuth biztonsági iránymutatás  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) – Webalkalmazás biztonsági kockázatok  
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) – AI-specifikus biztonsági kockázatok  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) – Átfogó AI kockázatkezelés  
- [ISO 27001:2022](https://www.iso.org/standard/27001) – Információbiztonsági irányítási rendszerek  

### Megvalósítási Útmutatók és Oktatóanyagok
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) – Vállalati hitelesítési minták  
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) – Identitásszolgáltató integráció  
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) – Tokenkezelési legjobb gyakorlatok  
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) – Fejlett titkosítási minták  

### Fejlett Biztonsági Források
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) – Biztonságos fejlesztési gyakorlatok  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) – AI specifikus biztonsági tesztelés  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) – AI fenyegetéstervezési módszertan  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) – Adatvédő AI technikák  

### Megfelelőség és Irányítás
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) – Adatvédelmi megfelelés AI rendszerekben  
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) – Felelős AI megvalósítás  
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) – Biztonsági kontrollok AI szolgáltatók számára  
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) – Egészségügyi AI megfelelőségi követelmények  

### DevSecOps és Automatizálás
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) – Biztonságos AI fejlesztési pipeline-ok  
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) – Folyamatos biztonsági ellenőrzés  
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) – Biztonságos infrastruktúra kiépítés  
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) – AI terhelések konténerizált biztonsága  

### Megfigyelés és Incidenskezelés  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) – Átfogó megfigyelési megoldások  
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) – AI-specifikus incidenskezelési eljárások  
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) – Biztonsági információ- és eseménykezelés  
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) – AI fenyegetettségi hírszerzés források  

## 🔄 Folyamatos Fejlesztés

### Kövesd Nyomon a Változó Szabványokat
- **MCP Specifikáció Frissítések**: Kövesd az MCP hivatalos specifikációváltozásait és biztonsági értesítéseit  
- **Fenyegetettségi Hírszerzés**: Iratkozz fel AI biztonsági fenyegetettségi hírekre és sérülékenységi adatbázisokra  
- **Közösségi részvétel**: Vegyen részt az MCP biztonsági közösségi beszélgetéseiben és munkacsoportjaiban
- **Rendszeres értékelés**: Végezzen negyedéves biztonsági állapotfelméréseket, és ennek megfelelően frissítse a gyakorlatokat

### Hozzájárulás az MCP biztonsághoz
- **Biztonsági kutatás**: Vegyen részt az MCP biztonsági kutatásában és sebezhetőség-bejelentési programjaiban
- **Legjobb gyakorlatok megosztása**: Ossza meg a biztonsági megvalósításokat és a tanulságokat a közösséggel
- **Szabványfejlesztés**: Vegyen részt az MCP specifikáció fejlesztésében és a biztonsági szabványok kidolgozásában
- **Eszközfejlesztés**: Fejlesszen és osszon meg biztonsági eszközöket és könyvtárakat az MCP ökoszisztéma számára

---

*Ez a dokumentum az MCP biztonsági legjobb gyakorlatait tükrözi 2025. december 18-i állapot szerint, az MCP Specifikáció 2025-11-25 alapján. A biztonsági gyakorlatokat rendszeresen felül kell vizsgálni és frissíteni a protokoll és a fenyegetettségi környezet változásával.*

## Mi következik

- Olvassa el: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Térjen vissza ide: [Security Module Overview](./README.md)
- Folytassa a következővel: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősségkizárás**:
Ezt a dokumentumot az AI fordítószolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével fordítottuk. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum anyanyelvű változata tekintendő hiteles forrásnak. Kritikus információk esetén professzionális emberi fordítást javaslunk. Nem vállalunk felelősséget az ezen fordítás használatából eredő félreértésekért vagy félreértelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->