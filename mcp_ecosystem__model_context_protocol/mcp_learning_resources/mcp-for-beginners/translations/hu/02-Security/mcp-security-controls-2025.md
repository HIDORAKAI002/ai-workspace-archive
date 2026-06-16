# MCP Biztonsági Intézkedések – 2026 Februári Frissítés

> **Jelenlegi szabvány**: Ez a dokumentum tükrözi a [MCP specifikáció 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) biztonsági követelményeit és a hivatalos [MCP Biztonsági Legjobb Gyakorlatok](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) dokumentumot.

A Model Context Protocol (MCP) jelentősen fejlődött a hagyományos szoftverbiztonsági és az AI-specifikus fenyegetéseket is kezelő kibővített biztonsági ellenőrzésekkel. Ez a dokumentum átfogó biztonsági intézkedéseket nyújt a biztonságos MCP implementációkhoz, amelyek megfelelnek az OWASP MCP Top 10 keretrendszernek.

## 🏔️ Gyakorlati Biztonsági Képzés

A gyakorlati, kézzel fogható biztonsági megvalósítási tapasztalatokhoz ajánljuk az **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** -t, egy átfogó, vezetett expedíciót az MCP szerverek Azure-ban történő biztonságossá tételéhez a „sebezhető → kihasználás → javítás → validálás” módszertan segítségével.

A dokumentumban szereplő összes biztonsági intézkedés összhangban van az **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** irányelveivel, amely referencia-architektúrákat és Azure-specifikus megvalósítási útmutatást ad az OWASP MCP Top 10 kockázataihoz.

## **KÖTELEZŐ Biztonsági Követelmények**

### **Kritikus Tiltások az MCP Specifikációból:**

> **TILOS**: Az MCP szerverek **NEM FOGLADHATNAK EL** olyan tokeneket, amelyeket nem kifejezetten az MCP szervernek adtak ki  
>
> **TILOS**: Az MCP szerverek **NEM HASZNÁLHATNAK** munkameneteket azonosításra  
>
> **KÖTELEZŐ**: Az engedélyezést megvalósító MCP szerverek **MINDEN** bejövő kérést ellenőrizniük kell  
>
> **KÖTELEZŐ**: Az MCP proxy szerverek, amelyek statikus kliensazonosítókat használnak, **MINDIG** kötelesek minden dinamikusan regisztrált kliens esetén felhasználói beleegyezést kérni

---

## 1. **Azonosítás és Jogosultságkezelési Intézkedések**

### **Külső Identitásszolgáltató Integráció**

A **jelenlegi MCP szabvány (2025-11-25)** lehetővé teszi, hogy az MCP szerverek azonosítást külső identitásszolgáltatókra bízzanak, ami jelentős biztonsági fejlődést jelent:

**Az OWASP MCP kockázat, amelyet kezel**: [MCP07 - Nem megfelelő azonosítás és jogosultságkezelés](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Biztonsági előnyök:**
1. **Megszünteti a saját azonosítási kockázatokat**: Csökkenti a sebezhetőséget az egyéni azonosítási megoldások elkerülésével  
2. **Vállalati szintű biztonság**: Kihasználja az ismert identitásszolgáltatókat, mint a Microsoft Entra ID fejlett biztonsági funkcióival  
3. **Központosított identitáskezelés**: Egyszerűsíti a felhasználói életciklus kezelését, hozzáférés-ellenőrzést és megfelelőségi auditot  
4. **Többfaktoros azonosítás**: Az MFA lehetőségeket az identitásszolgáltatóktól örökli  
5. **Feltételes hozzáférési szabályok**: Használja a kockázat-alapú hozzáférési és adaptív azonosítási politikákat  

**Megvalósítási követelmények:**
- **Token közönség ellenőrzése**: Minden tokent ellenőrizni kell, hogy kifejezetten az MCP szervernek legyen kiadva  
- **Kibocsátó validálása**: Eltérés nélküli azonosító szolgáltató ellenőrzése  
- **Aláírás ellenőrzése**: Kriptográfiai ellenőrzés a token integritásához  
- **Lejárat érvényesítése**: Szigorú végrehajtás a token élettartamára vonatkozóan  
- **Jogosultságok ellenőrzése**: Biztosítani kell, hogy a tokenek megfelelő jogosultságokat tartalmazzanak a kért műveletekhez

### **Jogosultság logika biztonsága**

**Kritikus ellenőrzések:**
- **Átfogó jogosultság auditok**: Rendszeres biztonsági felülvizsgálata a jogosultsági döntési pontoknak  
- **Biztonságos alapértelmezett állapotok**: Hozzáférés megtagadása, ha a jogosultsági logika nem tud egyértelmű döntést hozni  
- **Jogosultsági határok**: Világos elkülönítés különböző jogosultsági szintek és erőforrás-hozzáférések között  
- **Audit naplózás**: Az összes jogosultsági döntés teljes naplózása a biztonsági megfigyeléshez  
- **Rendszeres hozzáférés-felülvizsgálatok**: Időszakos felülvizsgálata a felhasználói jogosultságoknak és privilégiumoknak

## 2. **Token Biztonság és Anti-Továbbítási Intézkedések**

**Az OWASP MCP kockázat, amelyet kezel**: [MCP01 - Token kezelési hibák és titkok kiszivárgása](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Token továbbításának megakadályozása**

A **token továbbítás egyértelműen tilos** az MCP Engedélyezési Specifikációban kritikus biztonsági kockázatok miatt:

**Kezelt biztonsági kockázatok:**
- **Ellenőrzés megkerülése**: Megkerüli az alapvető biztonsági intézkedéseket, mint a sebességkorlátozás, kérés ellenőrzése és forgalom megfigyelése  
- **Elszámoltathatóság hiánya**: Lehetetlenné teszi az kliensazonosítást, rontva az auditnaplókat és eseményvizsgálatot  
- **Proxy alapú adatlopás**: Lehetővé teszi rosszindulatú szereplők számára, hogy szervereket proxyként használjanak jogosulatlan adat hozzáférésre  
- **Bizalmi határ megsértése**: Megsérti a downstream szolgáltatások token eredetére vonatkozó bizalmi feltételezéseit  
- **Oldalirányú mozgás**: Kompromittált tokenek több szolgáltatás között szélesebb körű támadást tesznek lehetővé

**Megvalósítási ellenőrzések:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **Biztonságos tokenkezelési minták**

**Legjobb gyakorlatok:**
- **Rövid életű tokenek**: Minimalizálja az expozíciós időt gyakori token forgatással  
- **Just-in-Time kiadás**: Tokeneket csak adott műveletekhez szükség szerint ad ki  
- **Biztonságos tárolás**: Hardveres biztonsági modulok (HSM) vagy biztonságos kulcstárolók használata  
- **Token kötés**: Tokeneket kapcsoljon specifikus klienshez, munkamenethez vagy művelethez, ahol lehetséges  
- **Megfigyelés és riasztás**: Valós idejű észlelés a tokenek esetleges visszaéléseire vagy jogosulatlan hozzáférési mintákra

## 3. **Munkamenet Biztonsági Intézkedések**

### **Munkamenet eltérítés megelőzése**

**Kezelt támadási vektorok:**
- **Munkamenet eltérítés – prompt befecskendezés**: Rosszindulatú események befecskendezése megosztott munkamenet állapotba  
- **Munkamenet megszemélyesítés**: Jogosulatlan használat ellopott munkamenetazonosítókkal az azonosítás megkerüléséhez  
- **Folytatható stream támadások**: Szerver által küldött eseményfolyamok kihasználása rosszindulatú tartalom befecskendezéshez

**Kötelező munkamenet-intézkedések:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**Szállítási biztonság:**
- **HTTPS kötelező érvényű használata**: Minden munkamenet kommunikáció TLS 1.3-on keresztül  
- **Biztonságos cookie attribútumok**: HttpOnly, Secure, SameSite=Strict  
- **Tanúsítvány pinning**: Kritikus kapcsolatokhoz a Man-In-The-Middle támadások ellen

### **Állapotfüggő vs. állapotfüggetlen megfontolások**

**Állapotfüggő implementációk esetén:**
- Megosztott munkamenet állapot további védelemre szorul injekciós támadások ellen  
- Sor alapú munkamenet-kezelés integritás ellenőrzést igényel  
- Több szerveres példányok biztonságos munkamenetállapot szinkronizációt igényelnek

**Állapotfüggetlen implementációk esetén:**
- JWT vagy hasonló token-alapú munkamenet-kezelés  
- Kriptográfiai ellenőrzése a munkamenet állapot integritásának  
- Csökkentett támadási felület, de erős token-validáció szükséges

## 4. **AI-Specifikus Biztonsági Intézkedések**

**Az OWASP MCP kockázatok, amelyeket kezel:**
- [MCP06 - Prompt befecskendezés](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Eszközmegmérgezés](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Parancs befecskendezés és végrehajtás](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Prompt befecskendezés elleni védelem**

**Microsoft Prompt Shields integráció:**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**Megvalósítási ellenőrzések:**
- **Bemenet tisztítás**: Teljes körű validáció és szűrés az összes felhasználói bemenetre  
- **Tartalom határ meghatározása**: Világos szétválasztás a rendszerutasítások és a felhasználói tartalom között  
- **Utasítás hierarchia**: Korrekt prioritási szabályok az ellentmondó utasítások kezelésére  
- **Kimenet megfigyelése**: Potenciálisan káros vagy manipulált kimenetek észlelése

### **Eszközmegmérgezés megelőzése**

**Eszközbiztonsági keretrendszer:**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**Dinamikus eszközmenedzsment:**
- **Jóváhagyási folyamatok**: Kifejezett felhasználói hozzájárulás az eszköz módosításokhoz  
- **Visszaállítási lehetőségek**: Képesség a korábbi eszközverziókra való visszatéréshez  
- **Változás naplózás**: Teljes az eszközdefiníciós módosítások története  
- **Kockázatértékelés**: Automatikus eszközbiztonsági pozíció értékelés

## 5. **Confused Deputy Támadás Megelőzés**

### **OAuth Proxy Biztonság**

**Támadásmegelőzési intézkedések:**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**Megvalósítási követelmények:**
- **Felhasználói beleegyezés ellenőrzése**: Soha ne hagyja ki a beleegyezés képernyőket dinamikus kliensregisztráció esetén  
- **Redirect URI validálás**: Szigorú fehérlista-alapú ellenőrzés az átirányítás célpontra  
- **Engedélyezési kód védelme**: Rövid életű, egyszer használatos kódok érvényesítése  
- **Kliensazonosító ellenőrzés**: Robosztus hitelesítés klienskredenciálokra és metaadatokra

## 6. **Eszköz Végrehajtás Biztonság**

### **Sandbox és izoláció**

**Konténer alapú izoláció:**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**Folyamat izoláció:**
- **Külön folyamatkörnyezetek**: Minden eszköz végrehajtása külön izolált folyamatban  
- **Folyamat közti kommunikáció**: Biztonságos, validált IPC mechanizmusok  
- **Folyamat monitorozás**: Futásidejű viselkedés elemzés és anomália észlelés  
- **Erőforrás korlátozások**: CPU, memória és I/O műveletek szigorú korlátozása

### **Minimalizált jogosultság megvalósítás**

**Jogosultságkezelés:**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. **Ellátási Lánc Biztonsági Intézkedések**

**Az OWASP MCP kockázat, amelyet kezel**: [MCP04 - Szoftver ellátási lánc támadások és függőség manipuláció](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Függőség ellenőrzés**

**Átfogó komponensbiztonság:**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **Folyamatos megfigyelés**

**Ellátási lánc fenyegetések észlelése:**
- **Függőség egészségfigyelése**: Folyamatos értékelés minden függőségnél biztonsági problémák szempontjából  
- **Fenyegetés hírszerzés integrációja**: Valós idejű frissítések az újonnan felmerülő ellátási lánc fenyegetésekről  
- **Viselkedéselemzés**: Szokatlan viselkedés észlelése külső komponensekben  
- **Automatizált reagálás**: Kompromittált komponensek azonnali elkülönítése

## 8. **Megfigyelési és Észlelési Intézkedések**

**Az OWASP MCP kockázat, amelyet kezel**: [MCP08 - Audit- és telemetria hiánya](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Biztonsági Információ- és Eseménykezelés (SIEM)**

**Átfogó naplózási stratégia:**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **Valós idejű fenyegetésészlelés**

**Viselkedéselemzés:**
- **Felhasználói viselkedéselemzés (UBA)**: Szokatlan felhasználói hozzáférések észlelése  
- **Entitás viselkedéselemzés (EBA)**: MCP szerver és eszköz viselkedésének megfigyelése  
- **Gépi tanulás alapú anomália észlelés**: Mesterséges intelligencia által támogatott biztonsági fenyegetések azonosítása  
- **Fenyegetés hírszerzés összefüggés**: Megfigyelt tevékenységek összevetése ismert támadási mintákkal

## 9. **Eseménykezelés és Helyreállítás**

### **Automatizált válaszadási képességek**

**Azonnali válaszlépések:**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **Számítógépes nyomozás támogatása**

**Vizsgálati segítség:**
- **Audit nyomvonal megőrzése**: Módosíthatatlan naplózás kriptográfiai integritással  
- **Bizonyítékgyűjtés**: Automatikus releváns biztonsági artefaktumok gyűjtése  
- **Eseménysorozat rekonstrukciója**: Részletes események sorrendje a biztonsági incidensekhez  
- **Hatásfelmérés**: Kompromittálás kiterjedésének és adatkiszivárgás értékelése

## **Kulcsfontosságú Biztonsági Architektúra Elvek**

### **Mélységi védelem**
- **Többrétegű biztonság**: Nincs egyetlen hibapont a biztonsági architektúrában  
- **Redundáns szabályozások**: Átfedő biztonsági intézkedések kritikus funkciókra  
- **Biztonságos alapértelmezés**: Biztonságos alaphelyzetek hibák vagy támadások esetén

### **Zero Trust megvalósítás**
- **Soha ne bízz, mindig ellenőrizz**: Folyamatos érvényesítés minden entitásnál és kérésnél  
- **Minimális szükséges jogosultság elve**: Minimális hozzáférési jog minden komponensnek  
- **Mikro-szegmentálás**: Finomhangolt hálózati és hozzáférési szabályozás

### **Folyamatos biztonsági fejlődés**
- **Fenntartott fenyegetésfigyelés**: Rendszeres frissítések az új fenyegetések kezelése érdekében  
- **Biztonsági kontrollok hatékonysága**: Folyamatos értékelés és fejlesztés az intézkedéseken  
- **Specifikációs megfelelés**: Összhang a fejlődő MCP biztonsági szabványokkal

---

## **Megvalósítási Források**

### **Hivatalos MCP dokumentáció**
- [MCP Specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Biztonsági Legjobb Gyakorlatok](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Engedélyezési Specifikáció](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Biztonsági Források**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Átfogó OWASP MCP Top 10 Azure implementációval  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Hivatalos OWASP MCP biztonsági kockázatok  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Gyakorlati biztonsági képzés MCP-re Azure-ban  

### **Microsoft Biztonsági Megoldások**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Haladó Biztonság](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Biztonsági Szabványok**
- [OAuth 2.0 Biztonsági Legjobb Gyakorlatok (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 Nagy Nyelvi Modellekhez](https://genai.owasp.org/)  
- [NIST Kiberbiztonsági Keretrendszer](https://www.nist.gov/cyberframework)

---

> **Fontos**: Ezek a biztonsági intézkedések a jelenlegi MCP specifikációt (2025-11-25) tükrözik. Mindig ellenőrizze a legfrissebb [hivatalos dokumentációt](https://spec.modelcontextprotocol.io/), mivel a szabványok gyorsan fejlődnek.

## Mi következik

- Vissza: [Biztonsági modul áttekintése](./README.md)  
- Folytatás: [3. modul: Első lépések](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->