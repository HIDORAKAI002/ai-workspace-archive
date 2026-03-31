# MCP:n tietoturvan parhaat käytännöt 2025

Tämä kattava opas esittelee olennaiset tietoturvan parhaat käytännöt Model Context Protocol (MCP) -järjestelmien toteuttamiseen perustuen uusimpaan **MCP-spesifikaatioon 2025-11-25** ja nykyisiin toimialastandardeihin. Käytännöt käsittelevät sekä perinteisiä tietoturvakysymyksiä että MCP-järjestelmiin liittyviä tekoälykohtaisia uhkia.

## Keskeiset tietoturvavaatimukset

### Pakolliset tietoturvavalvonnat (MUST-vaatimukset)

1. **Tokenin validointi**: MCP-palvelimet **EIVÄT SAA** hyväksyä mitään tokeneita, joita ei ole nimenomaisesti myönnetty kyseiselle MCP-palvelimelle
2. **Valtuutuksen vahvistaminen**: MCP-palvelimet, jotka toteuttavat valtuutuksen, **TÄYTYY** vahvistaa KAIKKI sisään tulevat pyynnöt eikä niiden **TULE** käyttää istuntoja todennukseen  
3. **Käyttäjän suostumus**: MCP-välipalvelimet, jotka käyttävät staattisia asiakastunnuksia, **TÄYTYY** saada käyttäjän nimenomainen suostumus jokaiselle dynaamisesti rekisteröidylle asiakkaalle
4. **Turvalliset istuntotunnukset**: MCP-palvelinten **TÄYTYY** käyttää kryptografisesti turvallisia, ei-deterministisiä istuntotunnuksia, jotka generoidaan turvallisilla satunnaislukugeneraattoreilla

## Perustietoturvan käytännöt

### 1. Syötteen validointi ja puhdistus
- **Kattava syötteen validointi**: Vahvista ja puhdista kaikki syötteet estääksesi injektiohyökkäykset, confused deputy -ongelmat ja kehotteiden injektointiin liittyvät haavoittuvuudet
- **Parametrien kaavan valvonta**: Toteuta tiukka JSON-muotoinen skeeman validointi kaikille työkalujen parametreille ja API-syötteille
- **Sisällön suodatus**: Käytä Microsoft Prompt Shieldsia ja Azure Content Safetyä haitallisen sisällön suodattamiseen kehotteissa ja vastauksissa
- **Tulosteen puhdistus**: Vahvista ja puhdista kaikki mallin tulosteet ennen niiden näyttämistä käyttäjille tai alijärjestelmille

### 2. Erinomainen todennus ja valtuutus  
- **Ulkoiset tunnistuspalvelut**: Delegoi tunnistus vakiintuneille identiteettipalveluntarjoajille (Microsoft Entra ID, OAuth 2.1 -palveluntarjoajat) sen sijaan, että toteuttaisit oman tunnistuksen
- **Hienojakoinen käyttöoikeudet**: Toteuta yksityiskohtaiset, työkalukohtaiset oikeudet vähimmän oikeuden periaatteen mukaisesti
- **Tokenien elinkaaren hallinta**: Käytä lyhytikäisiä pääsytokeneita, joissa on turvallinen kierto ja oikea audienssis-validointi
- **Monivaiheinen tunnistus**: Vaadi MFA kaikessa hallinnollisessa pääsyssä ja arkaluontoisissa toiminnoissa

### 3. Turvalliset viestintäprotokollat
- **Siirtokerroksen turvallisuus**: Käytä HTTPS/TLS 1.3:a kaikessa MCP-viestinnässä asianmukaisella varmennustarkastuksella
- **Loppupään salaus**: Toteuta lisäsalauskerroksia erittäin arkaluontoiselle tiedolle siirron ja tallennuksen aikana
- **Sertifikaattien hallinta**: Huolehdi asianmukaisesta sertifikaattien elinkaaren hallinnasta automaattisilla uusimisprosesseilla
- **Protokollaversion valvonta**: Käytä MCP:n ajantasaista protokollaversiota (2025-11-25) asianmukaisella version neuvottelulla.

### 4. Kehittynyt rajoitus- ja resurssiensuojaus
- **Monikerroksinen kuormituksen rajoitus**: Toteuta käyttörajoitukset käyttäjä-, istunto-, työkalu- ja resurssitasoilla väärinkäytösten estämiseksi
- **Sopeutuva kuormituksen rajoitus**: Käytä koneoppimispohjaista kuormituksen rajoitusta, joka mukautuu käyttökuvioihin ja uhkaindikaattoreihin
- **Resurssikiintiön hallinta**: Määritä sopivat rajat laskentaresursseille, muistin käytölle ja suoritusaikaan
- **DDoS-suojaus**: Ota käyttöön kattava DDoS-suojaus ja liikenteen analysointijärjestelmät

### 5. Kattava lokitus ja valvonta
- **Jäsennelty auditointilokitus**: Toteuta yksityiskohtaiset, haettavat lokit kaikista MCP-toiminnoista, työkalujen suorituksista ja tietoturvatapahtumista
- **Reaaliaikainen tietoturvavalvonta**: Käytä SIEM-järjestelmiä, joissa on tekoälyn tukema poikkeavuuksien havaitseminen MCP-kuormituksille
- **Tietosuojayhteensopiva lokitus**: Kirjaa tietoturvatapahtumat kunnioittaen tietosuoja-asetuksia ja säädöksiä
- **Häiriötilanteiden hallinnan integrointi**: Yhdistä lokitusjärjestelmät automatisoituihin häiriöiden käsittelytyönkulkuihin

### 6. Tehostetut turvalliset tallennustavat
- **Laitteistoturvallisuusmoduulit (HSM)**: Käytä HSM-pohjaista avainten tallennusta (Azure Key Vault, AWS CloudHSM) kriittisiin kryptografisiin toimiin
- **Salausavainten hallinta**: Toteuta asianmukaiset avainten kierto-, eristys- ja käyttöoikeusvalvontamekanismit
- **Salaisuuksien hallinta**: Säilytä kaikki API-avaimet, tokenit ja tunnistetiedot erillisissä salaisuuksien hallintajärjestelmissä
- **Datan luokittelu**: Luokittele tiedot herkkyystasoittain ja sovella asianmukaisia suojaustoimia

### 7. Kehittynyt tokenien hallinta
- **Tokenien läpikulun estäminen**: Kieltää nimenomaisesti tokenien läpikulkumallit, jotka ohittavat tietoturvavalvonnat
- **Audienssis-validointi**: Vahvista aina, että tokenin audienssis-vaatimukset vastaavat kohde-MCP-palvelimen identiteettiä
- **Vaatimuksiin perustuva valtuutus**: Toteuta hienojakoinen valtuutus tokenin vaatimusten ja käyttäjäattribuuttien perusteella
- **Tokenin sitominen**: Sido tokenit tarvittaessa tiettyihin istuntoihin, käyttäjiin tai laitteisiin

### 8. Turvallinen istuntojen hallinta
- **Kryptografiset istuntotunnukset**: Generoi istuntotunnukset käyttäen kryptografisesti turvallisia satunnaislukugeneraattoreita (ei ennustettavia sekvenssejä)
- **Käyttäjäkohtainen sitominen**: Sido istuntotunnukset käyttäjäkohtaisiin tietoihin turvallisissa muodoissa kuten `<user_id>:<session_id>`
- **Istunnon elinkaaren hallinta**: Toteuta asianmukainen istunnon vanhentuminen, kierto ja mitätöinti
- **Istunnon turvallisuusotsikot**: Käytä asianmukaisia HTTP-tietoturvaotsikoita istuntojen suojaamiseksi

### 9. Tekoälykohtaiset tietoturvavalvonnat
- **Kehotteen injektoinnin puolustus**: Ota käyttöön Microsoft Prompt Shields -ratkaisu spotlight-tekniikoilla, rajauksilla ja datamerkintämenetelmillä
- **Työkalujen myrkytyksen estäminen**: Vahvista työkalujen metatiedot, valvo dynaamisia muutoksia ja tarkista työkalujen eheys
- **Mallin tuloksen validointi**: Tarkasta mallin tulosteet mahdollisen datavuodon, haitallisen sisällön tai tietoturvakäytäntöjen rikkomisen varalta
- **Kontekstin ikkunan suojaus**: Toteuta valvontoja kontekstin ikkunan myrkytyksen ja manipulointihyökkäysten estämiseksi

### 10. Työkalusuoritusten turvallisuus
- **Suorituksen hiekkalaatikointi**: Suorita työkalut eristetyissä konttisuorituksissa, joissa on resurssirajoitukset
- **Erottelu käyttöoikeuksissa**: Suorita työkalut vähimmillä tarvittavilla oikeuksilla ja erillisillä palvelutilitunnuksilla
- **Verkkosegmentointi**: Toteuta verkkosegmentointi työkalujen suorituskonteille
- **Suorituksen valvonta**: Valvo työkalujen suorituksia poikkeavan käyttäytymisen, resurssien käytön ja tietoturvaloukkausten varalta

### 11. Jatkuva tietoturvan validointi
- **Automaattinen tietoturvatestaus**: Integroi tietoturvatestaus CI/CD-putkiin työkaluilla kuten GitHub Advanced Security
- **Haavoittuvuuksien hallinta**: Skannaa säännöllisesti kaikki riippuvuudet, mukaan lukien tekoälymallit ja ulkoiset palvelut
- **Haavoittuvuustestaus**: Suorita säännöllisiä tietoturvatarkastuksia erityisesti MCP-toteutuksille
- **Tietoturvakoodin tarkastukset**: Pakolliset tietoturvan tarkastukset kaikille MCP:hen liittyville koodimuutoksille

### 12. Toimitusketjun tietoturva tekoälylle
- **Komponenttien varmistus**: Varmista kaikkien tekoälykomponenttien (mallit, upotukset, API:t) alkuperä, eheys ja tietoturva
- **Riippuvuushallinta**: Pidä ajan tasalla ohjelmisto- ja tekoälyriippuvuuksien inventaariot haavoittuvuuksien seurannan kera
- **Luotettavat arkistot**: Käytä varmennettuja ja luotettavia lähteitä kaikille tekoälymalleille, kirjastoille ja työkaluille
- **Toimitusketjun valvonta**: Valvo jatkuvasti tekoälypalveluntarjoajien ja mallien arkistojen kompromissitilanteita

## Kehittyneet tietoturvakuviot

### Nollaluottamuksen arkkitehtuuri MCP:lle
- **Älä koskaan luota, varmista aina**: Toteuta jatkuva varmennus kaikille MCP-osapuolille
- **Mikrosegmentointi**: Eristä MCP:n komponentit granularisilla verkko- ja identiteettiohjauksilla
- **Ehdollinen pääsy**: Toteuta riskiperusteiset pääsynvalvonnat, jotka mukautuvat kontekstiin ja käyttäytymiseen
- **Jatkuva riskinarviointi**: Arvioi dynaamisesti tietoturvan tila nykyisten uhkaindikaattoreiden perusteella

### Tietosuojaa kunnioittava tekoälyn toteutus
- **Datan minimointi**: Altista vain minimissään vaadittava määrä dataa kullekin MCP-toiminnolle
- **Differential Privacy**: Käytä yksityisyydensuojaa parantavia menetelmiä arkaluontoisessa tietojenkäsittelyssä
- **Homomorfinen salaus**: Hyödynnä edistynyttä salaustekniikkaa suojattuun laskentaan salatussa datassa
- **Hajautettu oppiminen**: Toteuta hajautettuja oppimismenetelmiä, jotka säilyttävät datan paikallisuuden ja yksityisyyden

### Häiriötilanteiden hallinta tekoälyjärjestelmissä
- **Tekoälykohtaiset häiriömenettelyt**: Kehitä häiriötilanneprosessit, jotka on räätälöity tekoäly- ja MCP-uhkille
- **Automaattinen reagointi**: Toteuta automatisoitu sisältörajoitus ja korjaus yleisiin tekoälyn tietoturvauhkiin  
- **Oikeuslääketieteelliset valmiudet**: Ylläpidä oikeuslääketieteellistä valmiutta tekoälyjärjestelmien kompromisseissa ja tietovuodoissa
- **Palautusmenettelyt**: Määrittele toipumisprosessit tekoälymallien myrkytyksestä, kehotteiden injektointihyökkäyksistä ja palveluvammoista

## Toteutusresurssit ja -standardit

### 🏔️ Käytännön tietoturvakoulutukset
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Kattava käytännön työpaja MCP-palvelinten suojaamiseksi Azuren ympäristössä
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Viitearkkitehtuuri ja OWASP MCP Top 10 -toteutusohjeet

### Virallinen MCP-dokumentaatio
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Ajantasainen MCP-protokollan määrittely
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Viralliset tietoturvaohjeet
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Todennus- ja valtuutuskuviot
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Siirtokerroksen tietoturvavaatimukset

### Microsoftin tietoturvaratkaisut
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Edistynyt kehotteen injektoinnin suojaus
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Kattava tekoälyn sisältösuodatus
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Yritysidentiteetin ja pääsynhallinnan ratkaisu
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Turvallinen salaisuuksien ja tunnistetietojen hallinta
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Toimitusketjun ja koodin tietoturvaskannaus

### Tietoturvastandardit ja viitekehykset
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Nykyiset OAuth-tietoturvaohjeet
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Web-sovellusten tietoturvariskit
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Tekoälykohtaiset tietoturvariskit
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Kattava tekoälyn riskienhallinta
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Tietoturvan hallintajärjestelmät

### Toteutusoppaat ja tutoriaalit
- [Azure API Management MCP:n tunnusportaana](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Yritystason tunnistuskuviot
- [Microsoft Entra ID MCP-palvelinten kanssa](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Identiteettipalvelun integraatio
- [Turvallinen tokenien tallennus](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Tokenien hallinnan parhaat käytännöt
- [Loppupään salaus tekoälylle](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Kehittyneet salauskuviot

### Kehittyneet tietoturvaresurssit
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Turvallisen kehityksen parhaat käytännöt
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - Tekoälyn tietoturvatestaus
- [Uhkamallinnus tekoälyjärjestelmille](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Tekoälyuhkien mallinnusmenetelmät
- [Tietosuojatekniikat tekoälylle](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Yksityisyyttä suojaavat tekoälymenetelmät

### Säädösten noudattaminen ja hallinto
- [GDPR-yhteensopivuus tekoälylle](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Tietosuojavaatimukset tekoälyjärjestelmissä
- [Tekoälyn hallintamalli](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Vastuullisen tekoälyn toteutus
- [SOC 2 tekoälypalveluille](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Tietoturvan valvonta tekoälypalveluntarjoajille
- [HIPAA-yhteensopivuus tekoälylle](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Terveydenhuollon tekoälyn vaatimukset

### DevSecOps ja automaatio
- [DevSecOps-putki tekoälylle](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Turvalliset tekoälyn kehityspolut
- [Automaattinen tietoturvatestaus](https://learn.microsoft.com/security/engineering/devsecops) - Jatkuva tietoturvan validointi
- [Infrastruktuurin koodina tietoturva](https://learn.microsoft.com/security/engineering/infrastructure-security) - Turvallinen infra-asennus
- [Konttien tietoturva tekoälykuormille](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Konttipohjainen tekoälykuormien suojaus

### Valvonta ja häiriötilanteiden hallinta  
- [Azure Monitor tekoälykuormille](https://learn.microsoft.com/azure/azure-monitor/overview) - Kattavat valvontaratkaisut
- [Tekoälyn tietoturvahäiriöiden hallinta](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Tekoälykohtaiset häiriömenettelyt
- [SIEM tekoälyjärjestelmille](https://learn.microsoft.com/azure/sentinel/overview) - Tietoturvatiedon ja -tapahtumien hallinta
- [Uhkatiedustelu tekoälylle](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Tekoälyuhkien tiedustelulähteet

## 🔄 Jatkuva parantaminen

### Pysy ajan tasalla kehittyvistä standardeista
- **MCP-spesifikaation päivitykset**: Seuraa virallisia MCP-spesifikaation muutoksia ja tietoturvailmoituksia
- **Uhkatiedustelu**: Tilaa tekoälyn tietoturvauhkaa koskevat tiedotteet ja haavoittuvuustietokannat  
- **Yhteisön sitoutuminen**: Osallistu MCP:n turvallisuusyhteisön keskusteluihin ja työryhmiin
- **Säännöllinen arviointi**: Toteuta neljännesvuosittaiset turvallisuuden tilan arvioinnit ja päivitä käytäntöjä sen mukaisesti

### Osallistuminen MCP-turvallisuuteen
- **Turvallisuustutkimus**: Osallistu MCP:n turvallisuustutkimukseen ja haavoittuvuuksien julkistamisohjelmiin
- **Parhaiden käytäntöjen jakaminen**: Jaa turvallisuusrakenteita ja opittuja kokemuksia yhteisön kanssa
- **Standardien kehitys**: Osallistu MCP-spesifikaation kehittämiseen ja turvallisuusstandardien luomiseen
- **Työkalujen kehitys**: Kehitä ja jaa turvallisuustyökaluja ja kirjastoja MCP-ekosysteemille

---

*Tämä asiakirja heijastaa MCP:n turvallisuuden parhaat käytännöt 18. joulukuuta 2025, perustuen MCP-spesifikaatioon 2025-11-25. Turvallisuuskäytännöt tulisi tarkistaa ja päivittää säännöllisesti protokollan ja uhkakehityksen muuttuessa.*

## Mitä seuraavaksi

- Lue: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Palaa: [Security Module Overview](./README.md)
- Jatka: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:  
Tämä asiakirja on käännetty tekoälypohjaisen käännöspalvelun [Co-op Translator](https://github.com/Azure/co-op-translator) avulla. Pyrimme tarkkuuteen, mutta ole hyvä ja ota huomioon, että automaattiset käännökset voivat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja omalla kielellään on virallinen lähde. Kriittisen tiedon osalta suosittelemme ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä johtuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->