# MCP:n tietoturvakontrollit – helmikuu 2026 -päivitys

> **Nykyinen standardi**: Tämä asiakirja vastaa [MCP-määritystä 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) tietoturvavaatimusten ja virallisten [MCP:n tietoturvakäytäntöjen](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) mukaisesti.

Model Context Protocol (MCP) on kehittynyt merkittävästi vahvistettujen tietoturvakontrollien myötä, jotka kattavat sekä perinteisen ohjelmistoturvallisuuden että tekoälyyn liittyvät uhkat. Tämä asiakirja tarjoaa kattavat tietoturvakontrollit turvallisille MCP-toteutuksille, jotka noudattavat OWASP MCP Top 10 -kehystä.

## 🏔️ Käytännön tietoturvakoulutus

Käytännön kokemuksen saamiseksi tietoturvaimplementoinnista suosittelemme **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – kattava ohjattu matka MCP-palvelimien suojaamiseen Azuren ympäristössä käyttäen "haavoittuvuus → hyväksikäyttö → korjaus → validointi" -menetelmää.

Kaikki tässä asiakirjassa esitetyt tietoturvakontrollit ovat yhdenmukaisia **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** -ohjeistuksen kanssa, joka tarjoaa viitearkkitehtuureja ja Azure-kohtaisia toteutusohjeita OWASP MCP Top 10 -riskien osalta.

## **VAATIVAT tietoturvavaatimukset**

### **Tärkeät MCP-määrityksen kiellot:**

> **KIELLETTYÄ**: MCP-palvelimet **EIVÄT SAA** hyväksyä mitään tunnuksia, joita ei ole nimenomaisesti myönnetty kyseiselle MCP-palvelimelle  
>  
> **KIELLETTYÄ**: MCP-palvelimet **EIVÄT SAA** käyttää sessioita todennuksessa  
>  
> **VAATIMUS**: MCP-palvelimien, jotka toteuttavat valtuutusta, **ON** tarkistettava KAIKKI sisääntulevat pyynnöt  
>  
> **VELVOITTAVA**: MCP-proxyt, jotka käyttävät staattisia asiakastunnuksia, **ON** hankittava käyttäjien suostumus jokaiselle dynaamisesti rekisteröidylle asiakkaalle

---

## 1. **Todennus- ja valtuutuskontrollit**

### **Ulkoinen identiteetin tarjoajan integraatio**

**Nykyinen MCP-standardi (2025-11-25)** sallii MCP-palvelimien delegoida todennus ulkoisille identiteetin tarjoajille, mikä on merkittävä tietoturvan parannus:

**OWASP MCP -riski, jota käsitellään**: [MCP07 - Puutteellinen todennus ja valtuutus](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Tietoturvaedut:**
1. **Poistaa räätälöintiin liittyvät todennusriskit**: Vähentää haavoittuvuuspintaa välttämällä räätälöityjä todennusratkaisuja  
2. **Yritystason turvallisuus**: Hyödyntää vakiintuneita identiteetin tarjoajia kuten Microsoft Entra ID, jolla on kehittyneet turvaominaisuudet  
3. **Keskitetty identiteetin hallinta**: Yksinkertaistaa käyttäjähallintaa, pääsynvalvontaa ja vaatimustenmukaisuuden tarkastusta  
4. **Monivaiheinen todennus**: Perii MFA-ominaisuudet yrityksen identiteetin tarjoajalta  
5. **Ehdolliset pääsypolitiikat**: Hyödyntää riskipohjaisia pääsynohjauksia ja mukautuvaa todennusta

**Toteutusvaatimukset:**
- **Tunnusten vastaanottajakohteen validointi**: Varmista, että kaikki tunnukset on nimenomaisesti myönnetty MCP-palvelimelle  
- **Myöntäjän varmistus**: Vahvista, että tunnuksen myöntäjä vastaa odotettua identiteetin tarjoajaa  
- **Allekirjoituksen tarkistus**: Kryptografinen vahvistus tunnuksen eheydestä  
- **Aikarajan noudattaminen**: Tiukka tunnusten voimassaoloajan valvonta  
- **Laajuuden validointi**: Varmista, että tunnukset sisältävät asianmukaiset oikeudet pyydettyihin toimintoihin

### **Valtuutuslogiikan turvallisuus**

**Keskeiset kontrollit:**
- **Laajat valtuutustarkastukset**: Säännölliset tietoturvakatselmukset kaikille valtuutuspisteille  
- **Vikasietoiset oletukset**: Estä pääsy, jos valtuutuslogiikka ei pysty tekemään selkeää päätöstä  
- **Oikeusrajat**: Selkeä erottelu eri oikeustasojen ja resurssien käyttöoikeuksien välillä  
- **Auditointiloki**: Kaikkien valtuutuspäätösten täydellinen kirjaus tietoturvaseurantaa varten  
- **Säännölliset käyttöoikeuksien tarkistukset**: Käyttäjien oikeuksien ja valtuutusten aika-ajoin tapahtuva validointi

## 2. **Tunnusten turvallisuus ja anti-passthrough-kontrollit**

**OWASP MCP -riski, jota käsitellään**: [MCP01 - Tunnusten virhehallinta ja salaisuuksien paljastuminen](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Tunnusten läpivientikielto**

**Tunnusten läpivienti on eksplisiittisesti kielletty** MCP-valtuutusmäärittelyssä kriittisten tietoturvariskien vuoksi:

**Käsitellyt tietoturvariskit:**
- **Kontrollien kiertäminen**: Ohittaa olennaiset turvatoimet, kuten nopeusrajoitukset, pyyntöjen validoinnin ja liikenteen valvonnan  
- **Vastuullisuuden heikkeneminen**: Estää asiakkaiden tunnistamisen, mikä heikentää auditointijälkiä ja tapahtumatutkintaa  
- **Välityspalvelinperäinen tiedonmurto**: Mahdollistaa pahantahtoisille toimijoille palvelimien käytön luvattomaan datan hakemiseen  
- **Luottamuksen rajojen rikkominen**: Rikkoo alavirran palveluiden luottamusjärjestelyjä tunnusten alkuperästä  
- **Sivuttaiset liikkeet**: Kaapattujen tunnusten käyttö useilla palveluilla mahdollistaa laajemmat hyökkäykset

**Toteutuskontrollit:**
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

### **Turvallisen tunnusten hallinnan mallit**

**Parhaat käytännöt:**  
- **Lyhytkestoiset tunnukset**: Pienentää altistumisikkunaa nopealla tunnusten kierrätyksellä  
- **Juuri oikeaan aikaan -myöntäminen**: Myönnä tunnukset vain tarpeen mukaan tiettyihin toimiin  
- **Turvallinen tallennus**: Käytä laitteistopohjaisia turvamoduuleja (HSM) tai turvallisia avainholveja  
- **Tunnusten sitominen**: Sido tunnukset tiettyihin asiakkaisiin, sessioihin tai toimintoihin aina kun mahdollista  
- **Valvonta & hälytykset**: Reaaliaikainen tunnusten väärinkäytön tai luvattoman käytön havaitseminen

## 3. **Session tietoturvakontrollit**

### **Sessioiden kaappauksen estäminen**

**Hyökkäysvektorit käsitelty:**
- **Sessioiden kaappauksen kehotteen injektio**: Haitalliset tapahtumat injektoidaan jaettuun sessiotilaan  
- **Sessionsa käyttöoikeuden väärinkäyttö**: Varastettujen session tunnusten luvaton käyttö todennuksen ohittamiseksi  
- **Jatkuvien striimien hyökkäykset**: Palvelimen lähettämien tapahtumien jatkamisen hyväksikäyttö haitallisen sisällön injektioihin

**Pakolliset session kontrollit:**
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

**Siirron turvallisuus:**  
- **HTTPS-vaatimus**: Kaikki sessioviestintä TLS 1.3:n yli  
- **Turvalliset evästeominaisuudet**: HttpOnly, Secure, SameSite=Strict  
- **Sertifikaatin lukitus**: Kriittisille yhteyksille MITM-hyökkäysten estämiseksi

### **Tilallinen vs tilaton huomiointi**

**Tilallisiin toteutuksiin:**  
- Jaettu sessiotila vaatii lisäsuojan injektiohyökkäyksiä vastaan  
- Jonoihin perustuva sessiohallinta vaatii eheyden varmistuksen  
- Useita palvelininstansseja varten tarvitaan turvallinen istuntotilan synkronointi  

**Tilattomiin toteutuksiin:**  
- JWT- tai vastaavan tunnuspohjainen istuntohallinta  
- Kryptografinen varmistus istuntotilan eheydestä  
- Vähentynyt hyökkäyspinta, mutta vaatii vahvan tunnusten validoinnin

## 4. **Tekoälysovelluskohtaiset tietoturvakontrollit**

**OWASP MCP -riskit käsitelty:**  
- [MCP06 - Tarkoitusvirhekäyttö (Prompt Injection)](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Työkalujen myrkyttäminen](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Komentoinjektio ja suoritus](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Tarkoitusvirhekäytön torjunta**

**Microsoft Prompt Shields -integrointi:**  
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

**Toteutuskontrollit:**  
- **Syötteen sanitointi**: Kattava validointi ja suodatus kaikille käyttäjien syötteille  
- **Sisältörajojen määrittely**: Selkeä erottelu järjestelmän ohjeiden ja käyttäjän sisällön välillä  
- **Ohjehierarkia**: Oikeanlainen etuoikeusjärjestys ristiriitaisille ohjeille  
- **Tulosteen valvonta**: Vaarallisten tai manipuloitujen ulostulojen havaitseminen

### **Työkalujen myrkytyksen estäminen**

**Työkalujen suojauskehys:**  
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

**Dynaaminen työkalujen hallinta:**  
- **Hyväksyntäprosessit**: Käyttäjän nimenomainen suostumus työkalumuutoksille  
- **Palautusmahdollisuudet**: Mahdollisuus palauttaa aiempi versio työkalusta  
- **Muutosloki**: Täydellinen historia työkalumääritysten muutoksista  
- **Riskinarviointi**: Automaattinen työkalujen tietoturvan arviointi

## 5. **Häiritsevän osapuolen hyökkäyksen ehkäisy**

### **OAuth-proxyn tietoturva**

**Hyökkäysten torjuntakontrollit:**  
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

**Toteutusvaatimukset:**  
- **Käyttäjän suostumuksen varmistus**: Älä koskaan ohita suostumusnäyttöjä dynaamisen asiakasrekisteröinnin yhteydessä  
- **Uudelleenohjauksen URI:n validointi**: Tiukka valkoinen lista hyväksytyille uudelleenohjauskohteille  
- **Valtuutuskoodin suojaus**: Lyhytaikaiset koodit, käyttö vain kerran  
- **Asiakastunnuksen vahvistus**: Vahva asiakastietojen ja metadatan validointi

## 6. **Työkalujen suoritusympäristön tietoturva**

### **Eristys ja hiekkalaatikkotoiminnot**

**Konttipohjainen eristys:**  
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

**Prosessien eristys:**  
- **Erottellut prosessikontekstit**: Kukin työkalu suoritetaan eristetyssä prosessitilassa  
- **Prosessien välinen kommunikointi**: Turvalliset ja validoidut IPC-mekanismit  
- **Prosessin valvonta**: Suorituksen käytöksen analyysi ja poikkeamien havaitseminen  
- **Resurssien hallinta**: Tiukat rajoitukset CPU:lle, muistille ja I/O-toiminnoille

### **Vähiten oikeuksia -periaatteen toteutus**

**Oikeuksien hallinta:**  
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

## 7. **Toimitusketjun tietoturvakontrollit**

**OWASP MCP -riski käsitelty**: [MCP04 - Ohjelmistotoimitusketjun hyökkäykset ja riippuvuuksien manipulointi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Riippuvuuksien tarkistus**

**Kattava komponenttiturvallisuus:**  
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

### **Jatkuva valvonta**

**Toimitusketjun uhkien tunnistus:**  
- **Riippuvuuksien terveystilan seuranta**: Kaikkien riippuvuuksien jatkuva turvallisuustilanteen arviointi  
- **Uhkatiedon integraatio**: Reaaliaikaiset päivitykset uusista toimitusketjuuhkista  
- **Käyttäytymisanalyysi**: Poikkeavan käytöksen havaitseminen ulkoisissa komponenteissa  
- **Automaattinen reagointi**: Välitön kompromettoitujen komponenttien eristäminen

## 8. **Valvonta- ja havaitsemiskontrollit**

**OWASP MCP -riski käsitelty**: [MCP08 - Auditoinnin ja telemetrian puute](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Tietoturvatiedon ja tapahtumien hallinta (SIEM)**

**Kattava lokitusstrategia:**  
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

### **Reaaliaikainen uhkien havaitseminen**

**Käyttäytymisanalytiikka:**  
- **Käyttäjän käyttäytymisanalyysi (UBA)**: Epätavallisten käyttäjäkäyttökuvioiden tunnistus  
- **Entiteettien käyttäytymisanalyysi (EBA)**: MCP-palvelimen ja työkalujen käytöksen seuranta  
- **Koneoppimisen poikkeamien havaitseminen**: Tekoälypohjainen tietoturvauhkien tunnistus  
- **Uhkatiedon korrelaatio**: Havainnoitujen toimintojen vertailu tunnettuja hyökkäyskuvioita vastaan

## 9. **Onnettomuusvastaus ja palautuminen**

### **Automaattiset reagointikyvyt**

**Välittömät toimenpiteet:**  
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

### **Tutkintamahdollisuudet**

**Tutkinnan tuki:**  
- **Auditointijälkien säilytys**: Muuttumattomat lokit kryptografisella eheydellä  
- **Todisteiden keruu**: Automaattinen asiaankuuluvien tietoturva-artefaktien kerääminen  
- **Aikatapahtumien rekonstruointi**: Yksityiskohtainen tapahtumien aikajärjestys turvallisuustapahtumiin johtaneista tapahtumista  
- **Vaikutusarviointi**: Arvio kompromissin laajuudesta ja datan paljastumisesta

## **Keskeiset tietoturva-arkkitehtuuriperiaatteet**

### **Syvyyspuolustus**
- **Useita tietoturvakerroksia**: Yksi yksittäinen virhekohta ei johda koko järjestelmän kompastumiseen  
- **Redundantit kontrollit**: Päällekkäiset turvatoimet kriittisiin toimintoihin  
- **Vikasietoiset mekanismit**: Turvalliset oletusasetukset virhetilanteissa tai hyökkäyksissä

### **Zero Trust -toteutus**
- **Älä koskaan luota, vahvista aina**: Jatkuva validointi kaikille toimijoille ja pyynnöille  
- **Vähimmän oikeuden periaate**: Minimoi pääsyoikeudet kaikille komponenteille  
- **Mikrosegmentointi**: Hienojakoinen verkko- ja pääsynvalvonta

### **Jatkuva tietoturvan kehitys**
- **Uhkamaiseman mukautuminen**: Säännölliset päivitykset uusien uhkien käsittelyyn  
- **Kontrollien tehokkuuden arviointi**: Jatkuva kontrollien arviointi ja parantaminen  
- **Määritysten noudattaminen**: Yhteneväisyys kehittyvien MCP-tietoturvavaatimusten kanssa

---

## **Toteutusresurssit**

### **Virallinen MCP-dokumentaatio**
- [MCP-määritys (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP:n tietoturvakäytännöt](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP:n valtuutusmäärittely](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP:n tietoturvaresurssit**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Kattava OWASP MCP Top 10 Azuren toteutuksilla  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Viralliset OWASP MCP:n tietoturvariskit  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Käytännön tietoturvakoulutus MCP:lle Azure-ympäristössä

### **Microsoftin tietoturvaratkaisut**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Tietoturvastandardit**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 suurille kielimalleille](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Tärkeää**: Nämä tietoturvakontrollit heijastavat nykyistä MCP-määritystä (2025-11-25). Varmista aina viimeisimmät tiedot [virallisesta dokumentaatiosta](https://spec.modelcontextprotocol.io/), sillä standardit kehittyvät nopeasti.

## Mitä seuraavaksi

- Palaa kohtaan: [Tietoturvaversion yleiskatsaus](./README.md)  
- Jatka kohtaan: [Moduuli 3: Aloittaminen](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->