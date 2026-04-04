# MCP:n turvallisuuden parhaat käytännöt – päivitys helmikuu 2026

> **Tärkeää**: Tämä asiakirja heijastaa uusimpia [MCP-määrityksen 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) turvallisuusvaatimuksia sekä virallisia [MCP:n turvallisuuden parhaita käytäntöjä](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Viittaa aina ajantasaiseen määritykseen saadaksesi uusimmat ohjeet.

## 🏔️ Käytännön turvallisuuskoulutus

Käytännön toteutuskokemuksen saamiseksi suosittelemme **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** -työpajaa, joka on kattava opastettu retki MCP-palvelimien suojaamisesta Azuren ympäristössä. Työpajassa käydään läpi kaikki OWASP MCP Top 10 -riskit "haavoittuvaisesta → hyväksikäyttöön → korjaukseen → validointiin" menetelmällä.

Kaikki tässä asiakirjassa esitetyt käytännöt ovat linjassa **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** -oppaan kanssa, joka käsittelee Azure-spesifisiä käyttöönotto-ohjeita.

## MCP-toteutusten oleelliset turvallisuuskäytännöt

Model Context Protocol tuo mukanaan ainutlaatuisia turvallisuushaasteita, jotka ylittävät perinteisen ohjelmistoturvallisuuden rajat. Nämä käytännöt käsittelevät sekä perustavanlaatuisia turvallisuusvaatimuksia että MCP-spesifisiä uhkia, kuten prompt-injektioita, työkalun myrkyttämistä, istunnon kaappausta, confused deputy -ongelmia ja tokenien läpivientivaihteluja.

### **VELVOITTAVAT turvallisuusvaatimukset**

**Kriittiset vaatimukset MCP-määrityksestä:**

### **VELVOITTAVAT turvallisuusvaatimukset**

**Kriittiset vaatimukset MCP-määrityksestä:**

> **EI SAA:** MCP-palvelimet **EIVÄT SAA** hyväksyä mitään tokeneita, joita ei nimenomaisesti ole myönnetty tälle MCP-palvelimelle
> 
> **SAA:** MCP-palvelinten, jotka toteuttavat valtuutuksen, **ON VARRMISTETTAVA** KAIKKI saapuvat pyynnöt
>  
> **EI SAA:** MCP-palvelimet **EIVÄT SAA** käyttää istuntoja todennukseen
>
> **SAA:** MCP-välityspalvelimien, jotka käyttävät staattisia asiakastunnuksia, **ON SAADUTTAVA** käyttäjän suostumus jokaiselle dynaamisesti rekisteröidylle asiakkaalle

---

## 1. **Token-turvallisuus & todennus**

**Todennus- ja valtuutuskontrollit:**
   - **Tiukka valtuutuksen tarkistus**: Toteuta kattavat auditoinnit MCP-palvelimen valtuutuslogiikasta varmistaaksesi, että vain tarkoitetut käyttäjät ja asiakkaat voivat käyttää resursseja
   - **Ulkopuolinen identiteetin tarjoaja**: Käytä vakiintuneita identiteetin tarjoajia kuten Microsoft Entra ID:tä sen sijaan, että toteuttaisit oman todennuksen
   - **Tokenin vastaanottajavarmistus**: Varmista aina, että tokenit on nimenomaisesti myönnetty sinun MCP-palvelimellesi – älä koskaan hyväksy ylimmän tason tokeneita
   - **Oikea tokenin elinkaaren hallinta**: Toteuta turvallinen tokenin kierto, vanhentumiskäytännöt ja estä tokenin uudelleenkäytöt

**Suojattu tokenin tallennus:**
   - Käytä Azure Key Vaultia tai vastaavia turvallisia salasanojen säilytyspaikkoja kaikille salaisuuksille
   - Toteuta tokenien salaus sekä levossa että siirrossa
   - Säännöllinen tunnistetietojen kierto ja valvonta luvattoman pääsyn estämiseksi

## 2. **Istunnon hallinta & siirtoturvallisuus**

**Turvalliset istuntokäytännöt:**
   - **Kryptografisesti turvalliset istuntotunnukset**: Käytä turvallisia, ei-deterministisiä istuntotunnuksia, jotka on luotu turvallisilla satunnaislukugeneraattoreilla
   - **Käyttäjäkohtainen sidonta**: Sido istuntotunnukset käyttäjätunnuksiin käyttämällä muotoja kuten `<user_id>:<session_id>`, jotta estetään istunnon väärinkäytöt eri käyttäjillä
   - **Istunnon elinkaaren hallinta**: Toteuta oikea-aikainen istuntojen vanheneminen, kierto ja mitätöinti haavoittuvuusikkunoiden rajoittamiseksi
   - **HTTPS/TLS-vaatimus**: Pakollinen HTTPS kaikessa viestinnässä estämään istuntotunnusten sieppaus

**Siirtokerroksen turvallisuus:**
   - Konfiguroi TLS 1.3 aina kun mahdollista, mukaan lukien asianmukainen sertifikaattien hallinta
   - Toteuta sertifikaatin kiinnitys (certificate pinning) kriittisissä yhteyksissä
   - Säännöllinen sertifikaattien kierto ja voimassaolon varmistus

## 3. **AI-spesifinen uhkasuojaus** 🤖

**Prompt-injektion suojaus:**
   - **Microsoft Prompt Shields**: Käytä AI Prompt Shields -ratkaisuja haitallisten käskyjen kehittyneeseen tunnistukseen ja suodatukseen
   - **Syötteen puhdistus**: Varmista ja puhdista kaikki syötteet estääksesi injektiohyökkäykset ja confused deputy -ongelmat
   - **Sisällön rajapinnat**: Käytä erottimia ja datamerkintäjärjestelmiä erottaaksesi luotetut ohjeet muusta sisällöstä

**Työkalujen myrkytyksen estäminen:**
   - **Työkalumetadatan varmistus**: Toteuta eheystarkastuksia työkalumäärittelyille ja valvo odottamattomia muutoksia
   - **Dynaaminen työkalujen valvonta**: Valvo käyttöaikaisia toimintamalleja ja ota käyttöön hälytykset odottamattomasta suorituksesta
   - **Hyväksyntäprosessit**: Vaadi käyttäjän nimenomainen hyväksyntä työkalujen muutos- ja ominaisuuspäivityksille

## 4. **Pääsynhallinta & käyttöoikeudet**

**Vähimmän oikeuden periaate:**
   - Myönnä MCP-palvelimille vain ne vähimmäisoikeudet, joita tarvitaan tarkoitettuun toiminnallisuuteen
   - Käytä roolipohjaista pääsynhallintaa (RBAC) hienojakoisilla oikeuksilla
   - Säännölliset oikeuksien tarkistukset ja jatkuva valvonta oikeuksien eskalaation estämiseksi

**Suoritusajan käyttöoikeuskontrollit:**
   - Aseta resurssirajoituksia estämään resurssien loppumiseen tähtäävät hyökkäykset
   - Käytä konttien eristystä työkalujen suoritusyhteyksissä  
   - Toteuta just-in-time -pääsy hallintatoimintoihin

## 5. **Sisällön turvallisuus & valvonta**

**Sisällön turvallisuuden toteutus:**
   - **Azure Content Safety -integraatio**: Käytä Azure Content Safetyä haitallisen sisällön, jailbreak-yritysten ja politiikkarikkomusten havaitsemiseen
   - **Käyttäytymisanalyysi**: Toteuta ajoittainen käyttäytymisen valvonta MCP-palvelimen ja työkalujen toiminnan anomalioiden havaitsemiseksi
   - **Kattava lokitus**: Kirjaa kaikki todennusyritykset, työkalujen käytöt ja turvallisuustapahtumat turvalliseen ja korruptoitumattomaan tallennukseen

**Jatkuva valvonta:**
   - Reaaliaikaiset hälytykset epäilyttävistä malleista ja luvattomista käyttöyrityksistä  
   - Integraatio SIEM-järjestelmiin keskitettyä turvallisuustapahtumien hallintaa varten
   - Säännölliset turvallisuusauditoinnit ja tunkeutumistestaukset MCP-toteutuksille

## 6. **Toimitusketjun turvallisuus**

**Komponenttien varmistus:**
   - **Riippuvuuksien skannaus**: Käytä automatisoituja haavoittuvuusskannauksia kaikille ohjelmisto- ja AI-riippuvuuksille
   - **Alkuperän validointi**: Varmista mallien, tietolähteiden ja ulkoisten palveluiden alkuperä, lisenssit ja eheys
   - **Allekirjoitetut paketit**: Käytä kryptografisesti allekirjoitettuja paketteja ja varmista allekirjoitukset ennen käyttöönottoa

**Turvallinen kehityspipeline:**
   - **GitHub Advanced Security**: Toteuta salaisuuksien skannaus, riippuvuusanalyysi ja CodeQL staattinen analyysi
   - **CI/CD-turvallisuus**: Integroi turvallisuustarkastukset koko automatisoidun käyttöönoton prosessiin
   - **Artefaktien eheys**: Toteuta kryptografinen varmennus käyttöönotetuille artefakteille ja konfiguraatioille

## 7. **OAuth-turvallisuus & confused deputy -ongelman estäminen**

**OAuth 2.1 -toteutus:**
   - **PKCE-menetelmä**: Käytä Proof Key for Code Exchange (PKCE) kaikissa valtuutuspyynnöissä
   - **Nimenomainen suostumus**: Varmista käyttäjän suostumus jokaiselle dynaamisesti rekisteröidylle asiakkaalle confused deputy -hyökkäysten estämiseksi
   - **Uudelleenohjaus-URI:n validointi**: Toteuta tiukka uudelleenohjaus-URI:n ja asiakastunnusten validointi

**Välimiespalvelimen turvallisuus:**
   - Estä valtuutuksen ohitus staattisten asiakastunnusten hyväksikäytöllä
   - Toteuta hyväksymisprosessit kolmansien osapuolien API-käytölle
   - Valvo valtuutuskoodin varkauksia ja luvattomia API-käyttöjä

## 8. **Häiriötilanteisiin varautuminen & toipuminen**

**Nopeat reagointimahdollisuudet:**
   - **Automaattinen reagointi**: Toteuta automaattiset järjestelmät tunnistetietojen kiertoon ja uhkien rajoittamiseen
   - **Palautusmenettelyt**: Mahdollisuus nopeasti palauttaa tunnettu hyvä konfiguraatio ja komponentit
   - **Forensiset kyvyt**: Yksityiskohtaiset tarkastuspolut ja lokit tutkimuksia varten

**Viestintä & koordinointi:**
   - Selkeät eskalointimenettelyt turvallisuustapahtumille
   - Integraatio organisaation häiriötilanteiden reagointitiimien kanssa
   - Säännölliset turvallisuusharjoitukset ja pöytäroolipelit

## 9. **Säännöstenmukaisuus & hallinto**

**Säädöstenmukaisuus:**
   - Varmista, että MCP-toteutukset täyttävät toimialakohtaiset vaatimukset (GDPR, HIPAA, SOC 2)
   - Toteuta tiedonluokittelu ja tietosuojakontrollit AI:n tietojenkäsittelylle
   - Pidä kattava dokumentaatio vaatimustenmukaisuuden auditointeja varten

**Muutosten hallinta:**
   - Viralliset turvallisuustarkastukset kaikille MCP-järjestelmän muutoksille
   - Versiohallinta ja hyväksymisprosessit konfiguraatiomuutoksille
   - Säännölliset vaatimustenmukaisuuden arvioinnit ja aukkoanalyysit

## 10. **Edistyneet turvallisuuskontrollit**

**Zero Trust -arkkitehtuuri:**
   - **Älä koskaan luota, varmista aina**: Jatkuva käyttäjien, laitteiden ja yhteyksien vahvistaminen
   - **Mikrosegmentointi**: Yksityiskohtaiset verkon hallintakeinot erottavat yksittäiset MCP-komponentit
   - **Ehdollinen pääsy**: Riskipohjaiset pääsynhallinnat, jotka mukautuvat nykytilanteeseen ja käyttäytymiseen

**Suoritusajan sovellussuojaus:**
   - **Runtime Application Self-Protection (RASP)**: Ota käyttöön RASP-tekniikoita reaaliaikaiseen uhkien havaitsemiseen
   - **Sovelluksen suorituskyvyn valvonta**: Seuraa suorituskyvyn poikkeavuuksia hyökkäysten havaitsemiseksi
   - **Dynaamiset turvallisuuspolitiikat**: Toteuta politiikat, jotka mukautuvat nykyisen uhkakentän mukaan

## 11. **Microsoftin turvallisuus-ekosysteemin integraatio**

**Kattava Microsoft-turvallisuus:**
   - **Microsoft Defender for Cloud**: Pilven turvallisuusasemanhallinta MCP-kuormille
   - **Azure Sentinel**: Pilvipohjainen SIEM ja SOAR kehittyneeseen uhkien havaitsemiseen
   - **Microsoft Purview**: Tiedonhallinta ja vaatimustenmukaisuus AI-työnkuluille ja tietolähteille

**Identiteetin & pääsynhallinta:**
   - **Microsoft Entra ID**: Yritysidentiteetin hallinta ehdollisilla pääsynhallintapolitiikoilla
   - **Privileged Identity Management (PIM)**: Just-in-time -pääsy ja hyväksymisprosessit hallintatoimintoihin
   - **Identiteettisuojaus**: Riskipohjaiset ehdolliset pääsykäytännöt ja automatisoitu uhkien reagointi

## 12. **Jatkuva turvallisuuden kehitys**

**Ajantasalla pysyminen:**
   - **Määritysten seuranta**: Säännöllinen MCP-määritysten ja turvallisuusohjeiden muutosten tarkastelu
   - **Uhatietous**: AI-spesifisten uhkasyötteiden ja kompromissiohjaimien integrointi
   - **Turvallisuusyhteisön osallistuminen**: Aktiivinen osallistuminen MCP:n turvallisuusyhteisöön ja haavoittuvuusilmoitusohjelmiin

**Mukautuva turvallisuus:**
   - **Koneoppimisen turvallisuus**: Hyödynnä ML-pohjaista poikkeavuuksien havaitsemista uusien hyökkäyskuvioiden tunnistamiseksi
   - **Ennakoiva turvallisuusanalytiikka**: Toteuta ennustavia malleja proaktiiviseen uhkien tunnistamiseen
   - **Turvallisuuden automaatio**: Automaattiset turvallisuuskäytäntöjen päivitykset uhkatiedon ja määritysmuutosten pohjalta

---

## **Kriittiset turvallisuusresurssit**

### **Virallinen MCP-dokumentaatio**
- [MCP-määritys (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP:n turvallisuuden parhaat käytännöt](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP-valtuutusmääritys](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP turvallisuusresurssit**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Kattava OWASP MCP Top 10 Azure-toteutuksin
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Viralliset OWASP MCP-turvallisuusriskit
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Käytännön turvallisuuskoulutus MCP:lle Azurella

### **Microsoftin turvallisuusratkaisut**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Turvallisuusstandardit**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 suurille kielimalleille](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Toteutusoppaat**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID MCP-palvelimilla](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Turvallisuushälytys**: MCP:n turvallisuuskäytännöt kehittyvät nopeasti. Tarkista aina ajantasainen [MCP-määritys](https://spec.modelcontextprotocol.io/) ja [virallinen turvallisuusdokumentaatio](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) ennen käyttöönottoa.

## Mitä seuraavaksi

- Lue: [MCP Security Controls 2025](./mcp-security-controls-2025.md)
- Palaa: [Security Module Overview](./README.md)
- Jatka: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty tekoälypohjaisella käännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta huomioithan, että automaattikäännöksissä saattaa esiintyä virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on ensisijainen lähde. Tärkeissä asioissa suositellaan ammattilaisten tekemää käännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->