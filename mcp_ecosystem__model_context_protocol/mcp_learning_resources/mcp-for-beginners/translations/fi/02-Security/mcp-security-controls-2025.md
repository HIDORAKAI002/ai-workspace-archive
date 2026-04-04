# MCP Security Controls - helmikuu 2026 Päivitys

> **Nykyinen standardi**: Tämä asiakirja heijastaa [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) turvallisuusvaatimuksia ja virallisia [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Model Context Protocol (MCP) on kehittynyt merkittävästi parannetuin turvallisuusvalvontatoimin, jotka kattavat sekä perinteisen ohjelmistoturvallisuuden että tekoälykohtaiset uhkat. Tämä asiakirja tarjoaa kattavat turvallisuusvalvontatoimet turvallisten MCP-toteutusten varmistamiseksi, jotka ovat linjassa OWASP MCP Top 10 -viitekehyksen kanssa.

## 🏔️ Käytännön turvallisuuskoulutus

Käytännönläheisen turvallisuustoteutuskokemuksen saamiseksi suosittelemme **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - kattava opastettu retki MCP-palvelinten suojaamiseen Azure-ympäristössä käyttäen "haavoittuvainen → hyväksikäyttö → korjaus → varmennus" -metodologiaa.

Kaikki tämän asiakirjan turvallisuusvalvontatoimet ovat linjassa **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** kanssa, joka tarjoaa viitearkkitehtuureja ja Azure-kohtaisia toteutusohjeita OWASP MCP Top 10 -riskeihin.

## **PAKOLLISET turvallisuusvaatimukset**

### **Kriittiset kiellot MCP-määrityksestä:**

> **KIELLETTY**: MCP-palvelimet **EIVÄT SAA** hyväksyä mitään tunnuksia, joita ei ole nimenomaisesti myönnetty MCP-palvelimelle  
>  
> **KIELLETTY**: MCP-palvelimet **EIVÄT SAA** käyttää istuntoja todennukseen  
>  
> **VAADITTU**: MCP-palvelimet, jotka toteuttavat valtuutuksen, **MUST** tarkistaa KAIKKI saapuvat pyynnöt  
>  
> **VELVOITTEINEN**: MCP-välipalvelimet, jotka käyttävät staattisia asiakastunnuksia, **MUST** hankkia käyttäjän suostumus jokaisesta dynaamisesti rekisteröidystä asiakkaasta

---

## 1. **Todennus- ja valtuutusvalvontatoimet**

### **Ulkoinen identiteetin tarjoajan integrointi**

**Nykyinen MCP-standardi (2025-11-25)** sallii MCP-palvelinten delegoida todennus ulkoisille identiteetin tarjoajille, mikä on merkittävä turvallisuuden parannus:

**OWASP MCP -riski Käsitelty**: [MCP07 - Riittämätön todennus ja valtuutus](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Turvallisuushyödyt:**
1. **Poistaa räätälöidyn todennuksen riskit**: Vähentää haavoittuvuuspintaa välttämällä räätälöityjä todennustoimintoja  
2. **Yritystason turvallisuus**: Hyödyntää vakiintuneita identiteetin tarjoajia, kuten Microsoft Entra ID, kehittyneillä turvaominaisuuksilla  
3. **Keskitetty identiteetin hallinta**: Yksinkertaistaa käyttäjien elinkaaren hallintaa, käyttöoikeuksien valvontaa ja vaatimustenmukaisuuden tarkastuksia  
4. **Monivaiheinen todennus**: Perii MFA-ominaisuudet yritysten identiteetin tarjoajilta  
5. **Ehdolliset pääsypolitiikat**: Hyötyy riskipohjaisista pääsynvalvontamekanismeista ja mukautuvasta todennuksesta

**Toteutusvaatimukset:**
- **Tunnuksen vastaanottajan vahvistus**: Tarkista, että kaikki tunnukset on nimenomaisesti myönnetty MCP-palvelimelle  
- **Myöntäjän varmistus**: Varmista, että tunnuksen myöntäjä vastaa odotettua identiteetin tarjoajaa  
- **Allekirjoituksen tarkastus**: Kryptografinen tunnuksen eheyden varmistus  
- **Vanhenemisajan valvonta**: Tiukka käyttäytyminen tunnuksen elinajan rajoissa  
- **Laajuuden tarkastus**: Varmista, että tunnukset sisältävät asianmukaiset käyttöoikeudet pyydettyihin toimintoihin

### **Valtuutuslogiikan turvallisuus**

**Kriittiset valvontatoimet:**
- **Laajat valtuutustarkastukset**: Säännölliset turvallisuustarkastelut kaikilta valtuutuspäätöspisteiltä  
- **Vikatilavarmistus**: Käytä kieltävää oletusasetusta, kun valtuutuslogiikka ei pysty tekemään lopullista päätöstä  
- **Käyttöoikeuksien rajaus**: Selkeät rajat eritasoisten etuoikeuksien ja resurssien käytön välillä  
- **Tarkastuslokitus**: Täydellinen kaikkien valtuutuspäätösten lokitus turvallisuuden seurannassa  
- **Säännölliset käyttöoikeuksien tarkastukset**: Käyttäjien oikeuksien ja etuoikeuksien ajoittainen varmistus

## 2. **Tunnusten turvallisuus ja passthrough-estot**

**OWASP MCP -riski Käsitelty**: [MCP01 - Tunnusten virhehallinta ja salaisuuksien paljastuminen](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Tunnusten passthrough-estäminen**

**Tunnusten passthrough on nimenomaisesti kielletty** MCP Authorization Specificationissä kriittisistä turvallisuusriskeistä johtuen:

**Käsitellyt turvallisuusuhat:**
- **Kontrollien kiertäminen**: Ohittaa olennaiset turvatoimet kuten nopeusrajoituksen, pyyntöjen validoinnin ja liikenteen seurannan  
- **Vastuuvelvollisuuden puute**: Estää asiakkaiden tunnistamisen, pilaa tarkastuslokit ja tapaustutkimukset  
- **Välittäjäpohjainen tietonpoisto**: Hyökkääjät voivat käyttää palvelinta välittäjänä luvattomaan tiedonsaantiin  
- **Luottamusrikkomukset**: Rikkoo alhaalta tulevien palveluiden luottamusolettamat tokenien alkuperästä  
- **Sivuttaisliike**: Kompromettoidut tunnukset laajentavat hyökkäyksen useisiin palveluihin

**Toteutusvalvonnat:**
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

### **Turvalliset tunnusten hallintamallit**

**Parhaat käytännöt:**
- **Lyhyet elinajat**: Minimoi altistuminen usein toistuvalla tunnusten kiertämisellä  
- **Just-in-time -myöntäminen**: Myönnä tunnukset vain tarvittaessa tiettyihin toimiin  
- **Turvallinen säilytys**: Käytä laitteistopohjaisia turvallisuusmoduuleja (HSM) tai suojattuja avainholveja  
- **Tunnuksen sitominen**: Sitouta tunnukset tiettyihin asiakas-, istunto- tai toimintayhteyksiin mahdollisuuksien mukaan  
- **Valvonta ja hälytykset**: Reaaliaikainen tunnusten väärinkäytön ja luvattomien pääsyjen havaitseminen

## 3. **Istuntoturvallisuusvalvonta**

### **Istunnon kaappauksen estäminen**

**Kohteena olevat hyökkäysvektorit:**
- **Istunnon kaappauksen kehotteet**: Haitalliset tapahtumat injektoituna jaettuun istuntotilaan  
- **Istunnon jäljittely**: Luvaton varastettujen istunnon tunnusten käyttö tunnistuksen kiertämiseksi  
- **Jatkettavissa olevat virtahyökkäykset**: Palvelimen tapahtumien jatkamisen hyväksikäyttö haitallisen sisällön injektoimiseksi

**Pakolliset istuntovalvontatoimet:**
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

**Siirtotien turvallisuus:**
- **HTTPS:n pakollisuus**: Kaikki istuntoviestintä TLS 1.3 -salauksen yli  
- **Turvalliset evästeasetukset**: HttpOnly, Secure, SameSite=Strict  
- **Sertifikaattien pinnaus**: Kriittisille yhteyksille MITM-hyökkäysten estämiseksi

### **Tiloista riippuva vs. tilasta riippumaton**

**Tiloista riippuville toteutuksille:**
- Jaettu istuntotila vaatii lisäsuojaa injektiohyökkäyksiä vastaan  
- Jonoihin perustuva istuntohallinta vaatii eheyden varmistusta  
- Useat palvelininstanssit vaativat turvallisen istuntotilan synkronoinnin

**Tilasta riippumattomille toteutuksille:**
- JWT- tai vastaavan token-pohjainen istuntohallinta  
- Kryptografinen istuntotilan eheyden varmistus  
- Hyökkäyspinnan supistaminen, mutta vaatii vahvaa tokenin validointia

## 4. **Tekoälykohtaiset turvallisuusvalvontatoimet**

**OWASP MCP -riskit käsitelty**:  
- [MCP06 - Kehotteen injektio kontekstuaalisten hyötykuormien kautta](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Työkalun myrkytys](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Komento-injektio ja suoritus](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Kehotteen injektion puolustus**

**Microsoft Prompt Shields -integraatio:**  
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
  
**Toteutusvalvonta:**
- **Syötteen puhdistus**: Kaikkien käyttäjäsisältöjen kattava validointi ja suodatus  
- **Sisällön rajaus**: Selkeä erottelu järjestelmäohjeiden ja käyttäjäsisällön välillä  
- **Ohjehierarkia**: Oikea etusijajärjestys ristiriitaisille ohjeille  
- **Tulosteen seuranta**: Haitallisten tai manipuloitujen tulosteiden havaitseminen

### **Työkalun myrkytyksen esto**

**Työkalujen turvallisuuskehys:**  
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
- **Hyväksyntätyönkulut**: Selkeä käyttäjän suostumus työkalumuutoksille  
- **Takaisinkaatomahdollisuudet**: Mahdollisuus palata aiempiin työkaluversion tiloihin  
- **Muutoksen tarkastus**: Kattava historia työkalumäärittelyjen muutoksista  
- **Riskiarviointi**: Automaattinen arvio työkalun turvallisuusasemasta

## 5. **Confused Deputy -hyökkäyksen esto**

### **OAuth-välipalvelimen turvallisuus**

**Hyökkäyksen estovalvontatoimet:**  
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
- **Käyttäjän suostumuksen varmistus**: Älä koskaan ohita suostumusnäyttöjä dynaamisessa asiakasrekisteröinnissä  
- **Redirect URI:n validointi**: Tiukka valkoinen lista sallittuihin uudelleenohjauksiin  
- **Valtuutuskoodin suojaus**: Lyhytkestoiset koodit, joiden käyttö on rajoitettu yhteen kertaan  
- **Asiakasidentiteetin varmistus**: Vahva asiakastietojen ja metadatan validointi

## 6. **Työkalun suoritusturvallisuus**

### **Sandboxing ja eristäminen**

**Konttipohjainen eristäminen:**  
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
  
**Prosessieristys:**
- **Eri prosessikontekstit**: Jokainen työkalun suoritus omassa eristetyssä prosessitilassaan  
- **Prosessien välinen viestintä**: Turvalliset IPC-mekanismit validoinnilla  
- **Prosessien seuranta**: Käytöksen analysointi suoritusajalla poikkeavuuksien havaitsemiseksi  
- **Resurssien valvonta**: Tiukat rajat CPU:n, muistin ja I/O-toimintojen käytölle

### **Vähimmän oikeuden periaatteen toteutus**

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
  
## 7. **Toimitusketjun turvallisuusvalvonta**

**OWASP MCP -riski käsitelty**: [MCP04 - Toimitusketjun hyökkäykset](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Riippuvuuksien varmistus**

**Kattava komponenttien turvallisuus:**  
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

**Toimitusketjun uhkien havainnointi:**
- **Riippuvuuksien terveystilan seuranta**: Jatkuva arviointi kaikista riippuvuuksista turvallisuusongelmien varalta  
- **Uhkien tiedustelun integrointi**: Reaaliaikaiset päivitykset nousevista toimitusketjuuhista  
- **Käyttäytymisanalyysi**: Epätavallisen toiminnan havaitseminen ulkoisissa komponenteissa  
- **Automaattinen reagointi**: Välitön kompromettoitujen komponenttien eristäminen

## 8. **Valvonta ja havaitseminen**

**OWASP MCP -riski käsitelty**: [MCP08 - Tarkastusten ja telemetrian puute](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Turvallisuusinformaatio- ja tapahtumahallinta (SIEM)**

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
- **Käyttäjän käyttäytymisanalyysi (UBA)**: Epätavallisten käyttäjäpääsykuvioiden havaitseminen  
- **Yksikön käyttäytymisanalyysi (EBA)**: MCP-palvelimen ja työkalujen käytön seuranta  
- **Koneoppimiseen perustuva poikkeavuuksien havaitseminen**: AI-pohjainen uhkien tunnistus  
- **Uhkien tiedustelun korrelaatio**: Havainnoitujen toimien sovittaminen tunnettuihin hyökkäysmalleihin

## 9. **Tapahtumavaste ja toipuminen**

### **Automaattiset vasteominaisuudet**

**Välittömät vasteet:**  
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
  
### **Forensiikkaominaisuudet**

**Tutkinnan tuki:**
- **Tarkastuspolun säilytys**: Muuttumaton lokitus kryptografisella eheydellä  
- **Todisteiden keruu**: Automaattinen relevanttien turvallisuusartifaktien keruu  
- **Aikajanan rekonstruointi**: Tapahtumien yksityiskohtainen järjestys, joka johti turvallisuuspoikkeamiin  
- **Vaikutusarviointi**: Kompromission laajuuden ja tietovuodon arviointi

## **Keskeiset turvallisuusarkkitehtuurin periaatteet**

### **Puojusta syvyyteen**
- **Monikerroksinen turvallisuus**: Ei yksittäisiä vikaantumispisteitä turvallisuusarkkitehtuurissa  
- **Redundantit kontrollit**: Päällekkäiset turvatoimet kriittisiin toimintoihin  
- **Vikatilan turvatoiminnot**: Turvalliset oletusarvot virhe- tai hyökkäystilanteissa

### **Zero Trust -toteutus**
- **Älä koskaan luota, varmista aina**: Jatkuva kaikkien yksiköiden ja pyyntöjen validointi  
- **Vähimmän oikeuden periaate**: Minimoi käyttöoikeudet kaikille komponenteille  
- **Mikrosegmentointi**: Hienojakoiset verkko- ja pääsynvalvonnat

### **Jatkuva turvallisuuden kehitys**
- **Uhkamaiseman mukauttaminen**: Säännölliset päivitykset vastaamaan nousevia uhkia  
- **Turvallisuusvalvontojen tehokkuus**: Valvontojen jatkuva arviointi ja parantaminen  
- **Määrityksen noudattaminen**: Linjaus kehittyvien MCP-turvallisuusstandardien kanssa

---

## **Toteutusresurssit**

### **Virallinen MCP-dokumentaatio**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP -turvallisuusresurssit**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kattava OWASP MCP Top 10 Azure-toteutuksella  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Viralliset OWASP MCP turvallisuusriskit  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Käytännön turvallisuuskoulutus MCP:lle Azure-ympäristössä

### **Microsoftin turvallisuusratkaisut**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Turvallisuusstandardit**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)  
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **Tärkeää**: Nämä turvallisuusvalvontatoimet heijastavat nykyistä MCP-määritystä (2025-11-25). Tarkista aina uusin [virallinen dokumentaatio](https://spec.modelcontextprotocol.io/), sillä standardit kehittyvät nopeasti.

## Mitä seuraavaksi

- Palaa takaisin: [Security Module Overview](./README.md)
- Jatka kohtaan: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttäen tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta ole hyvä huomioimaan, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen omalla kielellä tulisi pitää virallisena lähteenä. Tärkeissä asioissa suosittelemme ammattilaisen tekemää ihmiskäännöstä. Emme ole vastuussa tästä käännöksestä johtuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->