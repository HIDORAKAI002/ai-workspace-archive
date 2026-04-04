# MCP Biztonsági Intézkedések - 2026 Februári Frissítés

> **Jelenlegi szabvány**: Ez a dokumentum tükrözi az [MCP Specifikáció 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) biztonsági követelményeit és a hivatalos [MCP Biztonsági Legjobb Gyakorlatokat](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

A Model Context Protocol (MCP) jelentősen fejlődött, kibővített biztonsági intézkedésekkel, amely mind a hagyományos szoftverbiztonsági, mind az AI-specifikus fenyegetéseket lefedi. Ez a dokumentum átfogó biztonsági irányelveket nyújt a biztonságos MCP megvalósításokhoz, amelyek összhangban vannak az OWASP MCP Top 10 keretrendszerével.

## 🏔️ Gyakorlati Biztonsági Képzés

Gyakorlati, kézbe vehető biztonsági megvalósítási tapasztalatért javasoljuk a **[MCP Biztonsági Csúcstalálkozó Workshopot (Sherpa)](https://azure-samples.github.io/sherpa/)** – egy átfogó, vezetett expedíciót az MCP szerverek Azure-ban történő biztonságossá tételéhez a "sebezhető → kihasználás → javítás → ellenőrzés" módszertan segítségével.

A dokumentumban szereplő összes biztonsági intézkedés összhangban áll az **[OWASP MCP Azure Biztonsági Útmutatóval](https://microsoft.github.io/mcp-azure-security-guide/)**, amely referenciaarchitektúrákat és Azure-specifikus megvalósítási útmutatást nyújt az OWASP MCP Top 10 kockázatokhoz.

## **KÖTELEZŐ Biztonsági Követelmények**

### **Kritikus Tiltások az MCP Specifikációból:**

> **TILOS**: Az MCP szerverek **NEM FOGADHATNAK EL** olyan tokeneket, amelyeket nem kifejezetten az MCP szerver számára adtak ki  
>
> **TILOS**: Az MCP szerverek **NEM HASZNÁLHATNAK** sessionöket hitelesítésre  
>
> **KÖTELEZŐ**: Az MCP szerverek, amelyek engedélyezést valósítanak meg, **MINDEN** bejövő kérés ellenőrzését el kell végezniük  
>
> **KÖTELEZŐ**: Az MCP proxy szerverek, amelyek statikus kliensazonosítókat használnak, **MINDEN** dinamikusan regisztrált kliens esetén kötelesek megszerezni a felhasználó beleegyezését

---

## 1. **Hitelesítés és Jogosultságkezelés Intézkedések**

### **Külső Identitásszolgáltató Integráció**

**Jelenlegi MCP standard (2025-11-25)** lehetővé teszi az MCP szerverek számára a hitelesítés delegálását külső identitásszolgáltatóknak, ami jelentős biztonsági előrelépés:

**Célzott OWASP MCP kockázat**: [MCP07 - Hiányos hitelesítés és jogosultságkezelés](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Biztonsági előnyök:**
1. **Egyedi hitelesítési kockázatok megszüntetése**: Csökkenti a sebezhetőségi felületet az egyedi hitelesítési megoldások elkerülésével  
2. **Vállalati szintű biztonság**: Bevált identitásszolgáltatók, például a Microsoft Entra ID fejlett biztonsági funkcióival  
3. **Központosított identitáskezelés**: Egyszerűbb felhasználói életciklus-kezelés, hozzáférés-vezérlés és megfelelőségi auditok  
4. **Többfaktoros hitelesítés**: Vállalati identitásszolgáltatóktól örökölt MFA képességek  
5. **Feltételes hozzáférési szabályok**: Kockázatalapú hozzáférés-vezérlés és adaptív hitelesítés előnyei  

**Megvalósítási követelmények:**  
- **Token célközönség ellenőrzése**: Ellenőrizni kell, hogy minden token kifejezetten az MCP szerver számára lett kiadva  
- **Kibocsátó ellenőrzése**: Érvényesíteni kell, hogy a token kibocsátója megfelel a vártnak, azaz az identitásszolgáltatónak  
- **Aláírás ellenőrzése**: Kriptográfiai érvényesítés a token integritásának biztosítására  
- **Lejárati idő betartása**: A token élettartam korlátjainak szigorú betartása  
- **Jogosultsági kör ellenőrzése**: Ellenőrizni kell, hogy a token megfelelő jogosultságokat tartalmaz-e a kért műveletekhez

### **Jogosultságlogika Biztonsága**

**Kritikus intézkedések:**  
- **Átfogó jogosultság auditok**: Rendszeres biztonsági áttekintések az összes jogosultságot eldöntő ponton  
- **Biztonsági alapértelmezések**: Hozzáférés megtagadása, ha a jogosultságlogika nem tud érdemi döntést hozni  
- **Jogosultsági határok**: Egyértelmű elkülönítés a különböző jogosultsági szintek és erőforrás-hozzáférés között  
- **Audit naplózás**: Minden jogosultsági döntés teljes körű naplózása biztonsági megfigyelés céljából  
- **Rendszeres hozzáférés-ellenőrzések**: Periodikus felülvizsgálat a felhasználói jogosultságok és privilégiumok érvényességére

## 2. **Tokenbiztonsági és Anti-Passthrough Intézkedések**

**Célzott OWASP MCP kockázat**: [MCP01 - Tokenkezelési hibák és titok kiszivárgás](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Token Passthrough Megelőzése**

**A token passthrough kifejezetten tiltott** az MCP Engedélyezési Specifikációban a kritikus biztonsági kockázatok miatt:

**Figyelt biztonsági kockázatok:**  
- **Intézkedések kijátszása**: Megkerüli az alapvető biztonsági intézkedéseket, pl. az aránykorlátozást, kérés-ellenőrzést és forgalomfigyelést  
- **Felelősség eltűnése**: Megakadályozza az ügyfél azonosítását, így tönkreteszi az audit nyomvonalakat és az incidensvizsgálatot  
- **Proxy alapú adatlopás**: Lehetővé teszi, hogy rosszindulatú támadók a szervereket proxyként használják jogosulatlan adat-hozzáféréshez  
- **Bizalmi határok megsértése**: Megsérti az alatti szolgáltatások bizalmi feltételezéseit a token eredetéről  
- **Oldalirányú terjeszkedés**: Több szolgáltatás között kompromittált tokenek révén terjedő támadások

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

### **Biztonságos Tokenkezelési Minták**

**Legjobb gyakorlatok:**  
- **Rövid élettartamú tokenek**: Minimalizálják az expozíciós időszakot gyakori tokenforgatással  
- **Éppen időben történő kiadás**: Csak szükség esetén, konkrét műveletekhez adják ki a tokeneket  
- **Biztonságos tárolás**: Hardveres biztonsági modulok (HSM) vagy biztonságos kulcstartók használata  
- **Token kötés**: Tokenek kötése adott klienshez, munkamenethez vagy művelethez, ahol lehetséges  
- **Figyelés és riasztás**: Valós idejű észlelés a token helytelen használatára vagy jogosulatlan hozzáférési mintákra

## 3. **Munkamenet Biztonsági Intézkedések**

### **Munkamenet Felülírás Megelőzése**

**Kezelt támadási vektorok:**  
- **Munkamenet elfogásával történő prompt injektálás**: Rosszindulatú események beszúrása a megosztott munkamenet-állapotba  
- **Munkamenet álcázás**: Jogosulatlan ellopott munkamenet-azonosító használata a hitelesítés megkerülésére  
- **Folyam újraindításos támadások**: Kiszolgáló által küldött esemény folytatása révén történő rosszindulatú tartalom injektálás

**Kötelező munkamenet intézkedések:**  
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

**Adatátviteli biztonság:**  
- **HTTPS érvényesítés**: Minden munkamenet kommunikáció TLS 1.3-on keresztül  
- **Biztonságos süti attribútumok**: HttpOnly, Secure, SameSite=Strict  
- **Tanúsítvány kötés**: Kritikus kapcsolatoknál a MITM támadások megakadályozására

### **Állapotfüggő és Állapotfüggetlen Megfontolások**

**Állapotfüggő megvalósítások esetén:**  
- Megosztott munkamenet állapot extra védelmet igényel az injektálási támadások ellen  
- Sor-alapú munkamenet-kezelés integritás ellenőrzése szükséges  
- Több szerver példány esetén biztonságos munkamenet állapot szinkronizáció  

**Állapotfüggetlen megvalósítások esetén:**  
- JWT vagy hasonló token alapú munkamenet-kezelés  
- Kriptográfiai ellenőrzése a munkamenet állapot integritásának  
- Csökkentett támadási felület, de erős token-ellenőrzést igényel

## 4. **AI-Specifikus Biztonsági Intézkedések**

**Célzott OWASP MCP kockázatok**:  
- [MCP06 - Prompt injektálás kontextusfüggő terhelések révén](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Eszközmérgezés](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Parancs befecskendezés és végrehajtás](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Prompt Injektálás Védelem**

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

**Megvalósítási intézkedések:**  
- **Bemenet tisztítása**: Átfogó validálás és szűrés minden felhasználói bemeneten  
- **Tartalomhatárok meghatározása**: Egyértelmű elkülönítés a rendszerutasítások és a felhasználói tartalom között  
- **Utasítási hierarchia**: Ütköző utasítások megfelelő elsőbbségi szabályai  
- **Kimenet figyelése**: Potenciálisan káros vagy manipulált kimenetek észlelése

### **Eszközmérgezés Megelőzése**

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

**Dinamikus eszközkezelés:**  
- **Jóváhagyási folyamatok**: Kifejezett felhasználói beleegyezés az eszköz módosításokhoz  
- **Visszaállítási képességek**: Lehetőség a korábbi eszközverziókra való visszatérésre  
- **Változásnaplózás**: Az eszközdefiníció módosításainak teljes története  
- **Kockázatértékelés**: Automatizált eszközbiztonsági állapotértékelés

## 5. **Zavaros Ügynök (Confused Deputy) Támadás Megelőzése**

### **OAuth Proxy Biztonság**

**Támadás megelőzési ellenőrzések:**  
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
- **Felhasználói beleegyezés ellenőrzése**: Dinamikus kliensregisztráció során soha ne hagyjuk ki a beleegyezési képernyőket  
- **Átirányítás URI érvényesítése**: Szigorú, fehérlistás átirányítási célok ellenőrzése  
- **Engedély kód védelme**: Rövid élettartamú, egyszer használatos kódok  
- **Kliensazonosság ellenőrzése**: Klienskulcsok és metaadatok alapos validálása

## 6. **Eszközvégrehajtási Biztonság**

### **Sandboxing és Izoláció**

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
- **Külön folyamat kontextusok**: Minden eszköz végrehajtása izolált folyamat térben  
- **Folyamatok közötti kommunikáció**: Biztonságos, validált kommunikációs mechanizmusok  
- **Folyamatfigyelés**: Futásidejű viselkedéselemzés és anomália észlelés  
- **Erőforrás-korlátozások**: CPU, memória és I/O műveletekre szigorú korlátok

### **Legkisebb Jogosultság Elve**

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

**OWASP MCP kockázat kezelve**: [MCP04 - Ellátási lánc támadások](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Függőségellenőrzés**

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

### **Folyamatos Megfigyelés**

**Ellátási lánc fenyegetés észlelése:**  
- **Függőségek állapotának folyamatos figyelése**: Minden függőség biztonsági problémáinak értékelése  
- **Fenyegetésintelligencia integráció**: Valós idejű frissítések az újonnan felmerülő ellátási lánc fenyegetésekről  
- **Viselkedéselemzés**: Szokatlan viselkedés észlelése külső komponensekben  
- **Automatizált reagálás**: Károsodott komponensek azonnali izolálása

## 8. **Megfigyelési és Észlelési Intézkedések**

**OWASP MCP kockázat kezelve**: [MCP08 - Auditálás és telemetria hiánya](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

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

### **Valós idejű Fenyegetés Észlelés**

**Viselkedéselemzés:**  
- **Felhasználói viselkedéselemzés (UBA)**: Szokatlan felhasználói hozzáférési minták felismerése  
- **Entitás viselkedéselemzés (EBA)**: MCP szerver és eszköz viselkedésének monitorozása  
- **Gépi tanulás alapú anomália észlelés**: Mesterséges intelligencia alapú biztonsági fenyegetések felismerése  
- **Fenyegetés-intelligencia korreláció**: Megfigyelt tevékenységek összevetése ismert támadási mintákkal

## 9. **Incidens Válasz és Helyreállítás**

### **Automatizált Válaszlehetőségek**

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

### **Nyomozati képességek**

**Vizsgálati támogatás:**  
- **Audit nyomvonal megőrzése**: Megmásíthatatlan, kriptográfiailag védett naplózás  
- **Bizonyítékgyűjtés**: Automatikus releváns biztonsági artefaktumok gyűjtése  
- **Idővonal rekonstrukció**: Részletes eseménysorozat a biztonsági incidensekhez  
- **Hatásfelmérés**: A kompromittáltság mértékének és az adatkiszivárgás értékelése

## **Kulcsfontosságú Biztonsági Architektúra Elvek**

### **Mélységi Védelem**  
- **Többszörös biztonsági rétegek**: Nincs egyetlen hibapont a biztonsági architektúrában  
- **Tartalék intézkedések**: Átfedő biztonsági megoldások kritikus funkciók számára  
- **Biztonságos alapértelmezések**: Biztonságos alaphelyzet hibák vagy támadások esetén

### **Zero Trust Megvalósítás**  
- **Soha ne bízz meg, mindig ellenőrizz**: Folyamatos érvényesítés minden entitás és kérés esetén  
- **Legkisebb jogosultság elve**: Minimális hozzáférési jogosultság minden komponensnek  
- **Mikro-szegmentáció**: Finomhangolt hálózati és hozzáférési szabályozások

### **Folyamatos Biztonsági Fejlődés**  
- **Fenyegetésképhez való alkalmazkodás**: Rendszeres frissítések az új fenyegetések kezelésére  
- **Biztonsági intézkedések hatékonysága**: Az intézkedések folyamatos értékelése és fejlesztése  
- **Specifikációhoz való igazodás**: Az MCP biztonsági szabványok fejlődésének követése

---

## **Megvalósítási Források**

### **Hivatalos MCP Dokumentáció**  
- [MCP Specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Biztonsági Legjobb Gyakorlatok](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Engedélyezési Specifikáció](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Biztonsági Források**  
- [OWASP MCP Azure Biztonsági Útmutató](https://microsoft.github.io/mcp-azure-security-guide/) – Átfogó OWASP MCP Top 10 Azure megvalósítással  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Hivatalos OWASP MCP biztonsági kockázatok  
- [MCP Biztonsági Csúcstalálkozó Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Gyakorlati biztonsági képzés MCP-hez Azure-on

### **Microsoft Biztonsági Megoldások**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Tartalombiztonság](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Biztonsági Szabványok**  
- [OAuth 2.0 Biztonsági Legjobb Gyakorlatok (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 Nagy Nyelvi Modellekhez](https://genai.owasp.org/)  
- [NIST Kiberbiztonsági Keretrendszer](https://www.nist.gov/cyberframework)

---

> **Fontos**: Ezek a biztonsági intézkedések az aktuális MCP specifikációt (2025-11-25) tükrözik. Mindig ellenőrizze a legfrissebb [hivatalos dokumentációt](https://spec.modelcontextprotocol.io/), mivel a szabványok gyorsan fejlődnek.

## Mi következik

- Vissza a: [Biztonsági Modul Áttekintés](./README.md) oldalra
- Folytatás: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi Nyilatkozat**:
Ez a dokumentum az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár igyekszünk a pontosságra, kérjük, vegye figyelembe, hogy az automatikus fordítások tartalmazhatnak hibákat vagy pontatlanságokat. Az eredeti dokumentum anyanyelvű változatát kell tekinteni a hiteles forrásnak. Kritikus információk esetén ajánlott szakmai emberi fordítást igénybe venni. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->