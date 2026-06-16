# MCP:n tietoturva: Kattava suojaus tekoälyjärjestelmille

[![MCP Security Best Practices](../../../translated_images/fi/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Napsauta yllä olevaa kuvaa nähdäksesi tämän oppitunnin videon)_

Tietoturva on keskeinen osa tekoälyjärjestelmien suunnittelua, minkä vuoksi se on toisen osamme prioriteetti. Tämä vastaa Microsoftin **Secure by Design** -periaatetta [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) -aloitteesta.

Model Context Protocol (MCP) tuo tekoälyä hyödyntäviin sovelluksiin voimakkaita uusia ominaisuuksia, mutta samalla se tuo mukanaan ainutlaatuisia tietoturvahaasteita, jotka ylittävät perinteiset ohjelmistoriskit. MCP-järjestelmät kohtaavat sekä vakiintuneita tietoturvahuolet (turvallinen koodaus, vähimmän oikeuden periaate, toimitusketjun turvallisuus) että uudet tekoälyyn liittyvät uhat kuten promptin injektio, työkalun myrkyttäminen, istunnonkaappaus, confused deputy -hyökkäykset, tokenin läpivienti -heikkoudet ja dynaaminen kyvykkyyksien muokkaus.

Tässä oppitunnissa käsitellään MCP:n toteutusten kriittisimpiä tietoturvariskejä — koskien todennusta, valtuutusta, liiallisia käyttöoikeuksia, epäsuoraa promptin injektiota, istuntoturvaa, confused deputy -ongelmia, tokeninhallintaa ja toimitusketjun haavoittuvuuksia. Opit käytännöllisiä ohjaustoimia ja parhaita käytäntöjä näiden riskien lieventämiseksi Microsoftin ratkaisujen kuten Prompt Shields, Azure Content Safety ja GitHub Advanced Security hyödyntämiseksi MCP-ympäristössäsi.

## Oppimistavoitteet

Oppitunnin päätteeksi osaat:

- **Tunnistaa MCP-spesifit uhat**: Tunnistaa MCP-järjestelmien ainutlaatuiset tietoturvariskit, kuten promptin injektio, työkalun myrkyttäminen, liialliset oikeudet, istunnonkaappaus, confused deputy -ongelmat, tokenin läpivienti -heikkoudet ja toimitusketjuriskit
- **Soveltaa tietoturvakontrolleja**: Toteuttaa tehokkaita lieventäviä toimenpiteitä, kuten vahvaa todennusta, vähimmän oikeuden periaatteen käyttöä, turvallista tokeninhallintaa, istuntoturvatoimia ja toimitusketjun varmennusta
- **Hyödyntää Microsoftin tietoturvaratkaisuja**: Ymmärtää ja ottaa käyttöön Microsoft Prompt Shields, Azure Content Safety ja GitHub Advanced Security MCP-kuormitusten suojaamiseen
- **Varmistaa työkalujen tietoturva**: Tunnistaa työkalun metadataan kohdistuvan validoinnin tärkeys, dynaamisten muutosten seuranta ja puolustautuminen epäsuoria promptin injektiohyökkäyksiä vastaan
- **Yhdistää parhaat käytännöt**: Yhdistää vakiintuneet tietoturvan perusteet (turvallinen koodaus, palvelimen koventaminen, zero trust) MCP-spesifien kontrollien kanssa kattavaa suojausta varten

# MCP:n tietoturva-arkkitehtuuri ja kontrollit

Nykyaikaiset MCP-toteutukset vaativat kerroksellisia tietoturvalähestymistapoja, jotka kattavat sekä perinteisen ohjelmistoturvallisuuden että tekoälyympäristöön liittyvät uhat. MCP-spesifikaatio kehittyy nopeasti ja sen tietoturvakontrollit paranevat, mahdollistaen paremman integraation yritysten tietoturva-arkkitehtuureihin ja vakiintuneisiin parhaisiin käytäntöihin.

[Microsoft Digital Defense Report](https://aka.ms/mddr) -tutkimus osoittaa, että **98 % raportoiduista tietomurroista estettäisiin vahvalla tietoturvahygienialla**. Tehokkain suojausstrategia yhdistää perustason tietoturvakäytännöt MCP-spesifisiin kontrollitoimiin — todistetut perusmittarit ovat edelleen merkittävimpiä kokonaisriskin vähentämisessä.

## Nykyinen tietoturvatilanne

> **Huomautus:** Tämä tieto vastaa MCP:n tietoturvastandardeja päivältä **5. helmikuuta 2026**, yhteensopiva **MCP Specification 2025-11-25**:n kanssa. MCP-protokolla kehittyy edelleen nopeasti, ja tulevat toteutukset saattavat tuoda uusia todennusmalleja ja parannettuja kontrollimenetelmiä. Tarkista aina ajantasaisin [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) ja [parhaat käytännöt -dokumentaatio](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) uusimmat ohjeet.

## 🏔️ MCP Security Summit -työpaja (Sherpa)

Käytännön tietoturvakoulutusta varten suosittelemme lämpimästi **MCP Security Summit Workshop** (Sherpa) -kokonaisvaltaista ohjattua vaellusta MCP-palvelinten suojaamiseen Microsoft Azure -ympäristössä.

### Työpajan yleiskuvaus

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) tarjoaa käytännönläheistä, konkreettista tietoturvakoulutusta kokeiltuun "haavoittuvuus → hyväksikäyttö → korjaus → validointi" -menetelmään perustuen. Pääset:

- **Oppimaan murtamalla järjestelmiä**: Koet haavoittuvuuksia suoraan hyväksikäyttämällä tarkoituksella suojaamattomia palvelimia
- **Käyttämään Azure-native tietoturvaa**: Hyödynnät Azure Entra ID:tä, Key Vaultia, API Managementia ja AI Content Safetyä
- **Noudattamaan puolustautumista monitason menetelmällä**: Edistyt leirien kautta rakentaen kattavia tietoturvakerroksia
- **Soveltamaan OWASP-standardeja**: Jokainen tekniikka linkittyy [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) -ohjeistukseen
- **Saamaan toimivaa tuotantokoodia**: Saat käsiisi toimivia ja testattuja toteutuksia

### Vaelluksen reitti

| Leiri | Keskittyminen | Käsitellyt OWASP-riskit |
|-------|---------------|-------------------------|
| **Perusleiri** | MCP:n perusteet & todennushäiriöt | MCP01, MCP07 |
| **Leiri 1: Identiteetti** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Leiri 2: Portti** | API Management, yksityiset päätelaitteet, hallinto | MCP02, MCP06, MCP07, MCP09 |
| **Leiri 3: I/O-turva** | Prompt-injektio, henkilötietosuoja, sisältöturva | MCP03, MCP05, MCP06, MCP10 |
| **Leiri 4: Valvonta** | Lokianalytiikka, hallintapaneelit, uhkien tunnistus | MCP04, MCP08 |
| **Huippukohta** | Red Team / Blue Team -integraatiotesti | Kaikki |

**Aloita tästä**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 tietoturvariskiä

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) kuvaa kymmenen kriittisintä tietoturvariskiä MCP-toteutuksissa:

| Riski | Kuvaus | Azure-muistutus |
|-------|--------|-----------------|
| **MCP01** | Tokenin vääränlainen hallinta ja salaisuuden paljastuminen | Azure Key Vault, Managed Identity |
| **MCP02** | Oikeuksien eskalointi scope creepin kautta | RBAC, ehtopohjainen käyttöoikeus |
| **MCP03** | Työkalun myrkyttäminen | Työkalun validointi, eheyden varmistus |
| **MCP04** | Ohjelmiston toimitusketjun hyökkäykset ja riippuvuuksien manipulointi | GitHub Advanced Security, riippuvuusskannaus |
| **MCP05** | Komentorivin injektio ja suoritus | Syötteen validointi, hiekkalaatikkoratkaisut |
| **MCP06** | Tarkoitusvirran vääristäminen | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Puutteellinen todennus ja valtuutus | Azure Entra ID, OAuth 2.1 PKCE:llä |
| **MCP08** | Auditoinnin ja telemetrian puute | Azure Monitor, Application Insights |
| **MCP09** | Varjopalvelimet MCP:lle | API Center governance, verkkoeristys |
| **MCP10** | Kontekstin injektio ja ylijakaminen | Datan luokittelu, minimipaljastus |

### MCP-todennuksen kehitys

MCP-spesifikaatio on kehittynyt merkittävästi todennuksen ja valtuutuksen osalta:

- **Alkuperäinen lähestymistapa**: Varhaiset spesifikaatiot vaativat kehittäjiltä omien todennuspalvelinten toteutusta, MCP-palvelinten toimiessa OAuth 2.0 -valtuutuspalvelimina, jotka hallitsivat käyttäjäntodennusta suoraan
- **Nykyinen standardi (2025-11-25)**: Päivitetty spesifikaatio sallii MCP-palvelinten delegoida todennus ulkoisille identiteetin tarjoajille (esim. Microsoft Entra ID), parantaen tietoturvaa ja vähentäen toteutusten monimutkaisuutta
- **Kuljetuskerroksen suojaus**: Parannettu tuki suojatuille kuljetusmekanismeille oikeilla todennusmalleilla sekä paikallisissa (STDIO) että etäyhteyksissä (Streamable HTTP)

## Todennus- ja valtuutusturva

### Nykyiset tietoturvahaasteet

Nykyaikaiset MCP-toteutukset kohtaavat useita haasteita todennuksen ja valtuutuksen osalta:

### Riskit ja uhkavektorit

- **Väärin konfiguroitu valtuutuslogiikka**: MCP-palvelimien epätäydellinen valtuutus voi paljastaa arkaluonteisia tietoja ja soveltaa käyttöoikeuksia virheellisesti
- **OAuth-tokenin hyväksikäyttö**: Paikallisen MCP-palvelimen tokenin varastaminen mahdollistaa hyökkääjien esiintymisen palvelimina ja pääsyn alijärjestelmiin
- **Tokenin läpivienti -heikkoudet**: Virheellinen tokenin käsittely aiheuttaa tietoturvakontrollien kiertämisen ja vastuullisuusaukkoja
- **Liialliset käyttöoikeudet**: MCP-palvelinten yli-oikeutus rikkoo vähimmän oikeuden periaatetta ja lisää hyökkäyspintaa

#### Tokenin läpivienti: kriittinen huono käytäntö

**Tokenin läpivienti on eksplisiittisesti kielletty** nykyisessä MCP-valtuutuksen spesifikaatiossa vakavien tietoturvakonsekvenssien vuoksi:

##### Tietoturvakontrollien kiertäminen
- MCP-palvelimet ja takaisinjärjestelmät (downstream API:t) toteuttavat kriittisiä tietoturvakontrolleja (kuten nopeusrajoitukset, pyyntöjen validoinnin, liikenteen seurannan), jotka edellyttävät tokenin oikeellista validointia
- Suora asiakas-API-tokenin käyttö ohittaa nämä olennaiset suojaimet ja murentaa tietoturva-arkkitehtuurin

##### Vastuullisuus- ja auditointiongelmat  
- MCP-palvelimet eivät pysty erottamaan asiakkaita, jotka käyttävät upstreamin myöntämiä tokeneita, katkaisten audittrailin
- Takaisin käyttötietojen lokit näyttävät harhaanjohtavia pyyntöjen lähteitä MCP-palvelinten sijaan
- Tapaustutkinta ja vaatimustenmukaisuuden auditointi vaikeutuvat merkittävästi

##### Datan poisvuotoon liittyvät riskit
- Validointiavun puute sallii hyökkääjien käyttää varastettuja tokeneita MCP-palvelinten välityspalvelimina datan siirtämiseen
- Luottamuksen rajojen rikkominen sallii valtuuttamattomia käyttökuvioita ja kiertää aiotut tietoturvakontrollit

##### Monipalveluriskit
- Kompromissoidut tokenit, joita hyväksytään useissa palveluissa, mahdollistavat sivuttaisliikkeen yhdistetyissä järjestelmissä
- Luottamuksen oletukset palveluiden välillä voivat vaarantua, kun tokenien alkuperää ei voida varmistaa

### Tietoturvakontrollit ja riskien lieventäminen

**Kriittiset tietoturvavaatimukset:**

> **VELVOITTEINEN**: MCP-palvelimet **EIVÄT SAA** hyväksyä tokeneita, joita ei ole eksplisiittisesti myönnetty kyseiselle MCP-palvelimelle

#### Todennus- ja valtuutuskontrollit

- **Tiukka valtuutuksen tarkastus**: Suorita kattavat auditoinnit MCP-palvelimen valtuutuslogiikasta varmistaaksesi, että vain aiotut käyttäjät ja asiakkaat pääsevät arkaluonteisiin resursseihin
  - **Toteutusopas**: [Azure API Management MCP-palvelimien todennusporttina](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identiteetin integrointi**: [Microsoft Entra ID:n käyttö MCP-palvelimien todennuksessa](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Turvallinen tokeninhallinta**: Toteuta [Microsoftin tokenin validointi- ja elinkaaren parhaat käytännöt](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Varmista tokenin vastaanottajan vaatimusten vastaavuus MCP-palvelimen identiteettiin
  - Toteuta oikea tokenin kierto- ja vanhenemiskäytännöt
  - Estä tokenin uudelleenkäyttöhyökkäykset ja luvatonta käyttöä

- **Suojaus tokenien tallennuksessa**: Salaa tokenit sekä levossa että siirrossa
  - **Parhaat käytännöt**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Käyttöoikeuksien hallinta

- **Vähimmän oikeuden periaate**: Myönnä MCP-palvelimille vain vähimmäisoikeudet, jotka ovat toiminnallisuuden kannalta tarpeellisia
  - Säännölliset käyttöoikeuksien tarkistukset ja päivitykset estämään oikeuksien laajentuminen
  - **Microsoft-dokumentaatio**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Roolipohjainen käyttöoikeuksien hallinta (RBAC)**: Ota käyttöön tarkat roolimääritykset
  - Rajaa roolit tiukasti tiettyihin resursseihin ja toimintoihin
  - Vältä laajoja tai tarpeettomia oikeuksia, jotka laajentavat hyökkäyspintaa

- **Jatkuva käyttöoikeuksien seuranta**: Toteuta jatkuva auditointi ja valvonta
  - Seuraa käyttöoikeuksien käyttökuvioita poikkeamien havaitsemiseksi
  - Korjaa ylimääräiset tai käyttämättömät oikeudet nopeasti

## Tekoälyyn liittyvät erityiset tietoturvauhat

### Promptin injektio- ja työkalun manipulointihyökkäykset

Nykyaikaiset MCP-toteutukset kohtaavat monimutkaisia tekoälyyn liittyviä hyökkäysvektoreita, joita perinteiset tietoturvatoimet eivät täysin kata:

#### **Epäsuora promptin injektio (Cross-Domain Prompt Injection)**

**Epäsuora promptin injektio** on yksi kriittisimmistä haavoittuvuuksista MCP:n käyttöönottamissa tekoälyjärjestelmissä. Hyökkääjät upottavat haitallisia ohjeita ulkoiseen sisältöön — dokumentteihin, verkkosivuihin, sähköposteihin tai tietolähteisiin — joita tekoälyjärjestelmät myöhemmin käsittelevät laillisina käskyinä.

**Hyökkäysskenaariot:**
- **Dokumenttipohjainen injektio**: Haitalliset ohjeet piilotettuina käsiteltäviin dokumentteihin, jotka käynnistävät ei-toivottuja tekoälyn toimintoja
- **Verkkosisällön hyväksikäyttö**: Kaapattuja verkkosivuja, joissa on upotettuja kehotteita, jotka manipuloivat tekoälyn käyttäytymistä kun se indeksoi sisältöä
- **Sähköpostipohjaiset hyökkäykset**: Haitalliset kehotteet sähköposteissa, jotka saavat tekoälyavustajat vuodattamaan tietoa tai suorittamaan luvatonta toimintaa
- **Tietolähteen saastutus**: Kompromissoidut tietokannat tai API:t, jotka toimittavat saastunutta sisältöä tekoälyjärjestelmille

**Todellinen vaikutus**: Nämä hyökkäykset voivat johtaa datan vuotoon, yksityisyydensuojaan, haitallisen sisällön tuottamiseen ja käyttäjävuorovaikutuksen manipulointiin. Tarkemman analyysin löydät [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/fi/prompt-injection.ed9fbfde297ca877.webp)

#### **Työkalun myrkyttämishyökkäykset**

**Työkalun myrkytys** kohdistuu metatietoihin, jotka määrittävät MCP-työkalut, hyödyntäen sitä, miten suurikielimallit (LLM) tulkitsevat työkalukuvaustekstejä ja parametreja päätöksenteossa.

**Hyökkäysmekanismit:**
- **Metatiedon manipulointi**: Hyökkääjät upottavat haitallisia ohjeita työkaluiden kuvauksiin, parametrien määrittelyihin tai käyttöesimerkkeihin
- **Näkymättömät ohjeet**: Työkalun metadatassa piilotetut kehotteet, joita tekoälymallit käsittelevät, mutta ihmiskäyttäjät eivät näe
- **Dynaaminen työkalumuokkaus ("Rug Pulls")**: Käyttäjien hyväksymät työkalut muutetaan myöhemmin suorittamaan haitallisia toimintoja ilman käyttäjän tietoisuutta
- **Parametrien injektio**: Haitallista sisältöä upotettu työkalun parametrikaavioihin, jotka vaikuttavat mallin käyttäytymiseen

**Isännöidyn palvelimen riskit**: Etäpalvelimilla on kohonnut riski, koska työkaluja voidaan päivittää käyttäjän alkuperäisen hyväksynnän jälkeen, jolloin aikaisemmin turvalliset työkalut voivat muuttua haitallisiksi. Laajemman analyysin löydät [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/fi/tool-injection.3b0b4a6b24de6bef.webp)

#### **Lisää tekoälyyn kohdistuvia hyökkäysvektoreita**

- **Cross-Domain Prompt Injection (XPIA)**: Kehittyneet hyökkäykset, jotka hyödyntävät sisältöä useilta eri aloilta kiertääkseen tietoturvakontrolleja
- **Dynaaminen kyvykkyyksien muokkaus**: Työkalujen kyvykkyyksien reaaliaikaiset muutokset, jotka ohittavat alkuperäiset turvallisuusarvioinnit  
- **Kontekstin ikkunan myrkytys**: Hyökkäykset, jotka manipuloivat suuria kontekstikenttiä piilottaakseen haitallisia ohjeita  
- **Mallin hämmentämishyökkäykset**: Mallin rajoitusten hyödyntäminen ennakoimattomien tai turvattomien käytösten luomiseksi  

### AI:n turvallisuusriskien vaikutus

**Korkean vaikutuksen seuraukset:**  
- **Datan poisvientiyritykset**: Luvaton pääsy ja arkaluonteisen yritys- tai henkilötiedon varastaminen  
- **Yksityisyyden loukkaukset**: Henkilökohtaisesti tunnistettavien tietojen (PII) ja luottamuksellisen liiketoimintadatan paljastuminen  
- **Järjestelmän manipulointi**: Tahattomat muutokset kriittisiin järjestelmiin ja työprosesseihin  
- **Tunnistetietojen varkaus**: Todennustunnisteiden ja palvelutunnusten vaarantuminen  
- **Lateral-liikkuminen**: Hyökättyjen AI-järjestelmien käyttö pivot-pisteinä laajempaan verkon hyökkäykseen  

### Microsoftin AI-turvaratkaisut

#### **AI Prompt Shields: Kehittynyt suojaus injektiohyökkäyksiä vastaan**

Microsoftin **AI Prompt Shields** tarjoavat kattavan suojan sekä suorilta että epäsuorilta kehotteiden injektiohyökkäyksiltä monikerroksisen suojausarkkitehtuurin kautta:

##### **Keskeiset suojamekanismit:**

1. **Kehittynyt tunnistus ja suodatus**  
   - Koneoppimisalgoritmit ja luonnollisen kielen prosessointitekniikat tunnistavat haitalliset ohjeet ulkoisissa sisällöissä  
   - Reaaliaikainen analyysi dokumenteista, verkkosivuista, sähköposteista ja tietolähteistä upotettujen uhkien varalta  
   - Kontekstiymmärrys laillisten ja haitallisten kehotteiden erottamiseksi  

2. **Valokeilatekniikat**  
   - Erottelee luotettavat järjestelmäohjeet mahdollisesti vaarantuneista ulkoisista syötteistä  
   - Tekstin muunnosmenetelmät, jotka parantavat mallin merkityksellisyyttä samalla eristäen haitallisen sisällön  
   - Auttaa AI-järjestelmiä ylläpitämään oikeaa ohjehierarkiaa ja sivuuttamaan injektoidut komennot  

3. **Rajain- ja tietomerkintäjärjestelmät**  
   - Selkeä rajaus luotettujen järjestelmäviestien ja ulkoisen syöttötekstin välillä  
   - Erityismerkit korostavat rajapintoja luotettujen ja luottamattomien tietolähteiden välillä  
   - Selkeä erottelu estää ohjeiden sekoittumisen ja luvattoman käskyn suorittamisen  

4. **Jatkuva uhkatiedustelu**  
   - Microsoft seuraa jatkuvasti uusia hyökkäysmalleja ja päivittää puolustuksia  
   - Proaktiivinen uhkien etsintä uusien injektiotekniikoiden ja hyökkäysvektoreiden varalta  
   - Säännölliset turvallisuusmallipäivitykset tehokkuuden ylläpitämiseksi kehittyviä uhkia vastaan  

5. **Azure Content Safety -integraatio**  
   - Osa kattavaa Azure AI Content Safety -kokonaisuutta  
   - Lisätunnistus jailbreak-yrityksille, haitalliselle sisällölle ja turvallisuuspolitiikan rikkomuksille  
   - Yhtenäiset turvavalvonnat AI-sovelluksen komponenteissa  

**Toteutusresurssit**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/fi/prompt-shield.ff5b95be76e9c78c.webp)  

## Kehittyneet MCP-turvauhat  

### Istunnonkaappaushaavoittuvuudet  

**Istunnonkaappaus** on kriittinen hyökkäysvektori tilallisten MCP-toteutusten yhteydessä, jossa luvattomat osapuolet saavat haltuunsa ja väärinkäyttävät laillisia istuntotunnisteita asiakkaiden jäljittelemiseksi ja luvattomien toimintojen suorittamiseksi.  

#### **Hyökkäysskenaariot & riskit**  

- **Istunnonkaappauksen kehotteiden injektio**: Hyökkääjät, joilla on varastettuja istuntotunnuksia, injektoivat haitallisia tapahtumia palvelimille, jotka jakavat istuntotilaa, mahdollistaen haitallisten toimintojen käynnistämisen tai arkaluontoiseen dataan pääsyn  
- **Suora jäljittely**: Varastetut istuntotunnukset mahdollistavat suorat MCP-palvelinpuhelut, jotka ohittavat todennuksen ja kohtelevat hyökkääjiä laillisina käyttäjinä  
- **Vaarantuneet keskeytettävät virtaukset**: Hyökkääjät voivat keskeyttää pyynnöt ennen aikojaan, aiheuttaen laillisten asiakkaiden jatkavan mahdollisesti haitallisen sisällön kanssa  

#### **Turvavalvontatoimet istuntojen hallintaan**  

**Kriittiset vaatimukset:**  
- **Valtuutuksen tarkistus**: MCP-palvelinten, jotka toteuttavat valtuutuksen, **TÄYTYY** tarkistaa KAIKKI saapuvat pyynnöt eikä **SAA** luottaa istuntoihin todennuksessa  
- **Turvallinen istunnon luonti**: Käytä kryptografisesti turvallisia, ei-deterministisiä istuntotunnuksia, jotka on generoitu turvallisilla satunnaislukugeneraattoreilla  
- **Käyttäjäkohtainen sitominen**: Sidontaistunnontunnukset käyttäjäkohtaisiin tietoihin, esim. muodossa `<user_id>:<session_id>`, estäen istuntojen väärinkäytön käyttäjien välillä  
- **Istunnon elinkaaren hallinta**: Toteuta asianmukainen vanheneminen, kierto ja mitätöinti haavoittuvuusaikojen rajaamiseksi  
- **Siirtoturva**: Kaikessa kommunikoinnissa pakollinen HTTPS istuntotunnusten sieppauksen estämiseksi  

### Confused Deputy -ongelma  

**Confused deputy -ongelma** ilmenee, kun MCP-palvelimet toimivat todennusproksina asiakkaiden ja kolmansien osapuolten palvelujen välillä, luoden mahdollisuuksia valtuutuksen kiertoon staattisten asiakastunnusten hyväksikäytön kautta.  

#### **Hyökkäysmekaniikka & riskit**  

- **Evästeisiin perustuva hyväksyntäkierto**: Aiempi käyttäjän todennus luo hyväksyntäevästeitä, joita hyökkääjät käyttävät haitallisten valtuutuspyyntöjen kautta, joissa on räätälöityjä uudelleenohjaus-URI:a  
- **Valtuutuskoodin varkaus**: Olemassa olevat evästeet voivat saada valtuutuspalvelimet ohittamaan hyväksyntänäytön ja ohjaamaan koodit hyökkääjän hallinnoimalle päätepisteelle  
- **Luvaton API-pääsy**: Varastetut valtuutuskoodit mahdollistavat token-vaihdon ja käyttäjän jäljittelyn ilman nimenomaista hyväksyntää  

#### **Haittojen lieventämisstrategiat**  

**Pakolliset kontrollit:**  
- **Nimenomaiset hyväksyntävaatimukset**: Staattisia asiakastunnuksia käyttävien MCP-proksipalvelimien **TÄYTYY** saada käyttäjän hyväksyntä jokaiselle dynaamisesti rekisteröidylle asiakkaalle  
- **OAuth 2.1 -turvallisuuden toteutus**: Noudata voimassa olevia OAuth-turvaparhaita käytäntöjä, mukaan lukien PKCE kaikissa valtuutuspyynnöissä  
- **Tiukka asiakastunnusten validointi**: Toteuta tiukka uudelleenohjauksen URI:en ja asiakastunnusten validointi hyväksikäytön estämiseksi  

### Tokenien läpäisyhaavoittuvuudet  

**Tokenien läpäisy** on yksiselitteinen huono käytäntö, jossa MCP-palvelimet hyväksyvät asiakastokenit ilman asianmukaista validointia ja välittävät ne edelleen API-palveluille, rikkoen MCP-valtuutusmäärittelyjä.  

#### **Turvavaikutukset**  

- **Kontrollien kierto**: Suora tokenien käyttö asiakkaalta API:ille ohittaa keskeiset nopeusrajoitukset, validointi ja valvontamekanismit  
- **Auditointilokien vääristyminen**: Ylätason tokenit estävät asiakkaan tunnistamisen, mikä heikentää tapaustutkintamahdollisuuksia  
- **Proksipohjainen datan poisvienti**: Vahvistamattomat tokenit mahdollistavat haitallisten toimijoiden käyttää palvelimia prokseina luvattomaan tiedonlähteeseen pääsyyn  
- **Luottamusrajat rikkoutuvat**: Alempien palvelujen luottamus oletuksiin voi rikkoutua, kun tokenin alkuperää ei voida varmistaa  
- **Monipalveluhyökkäyksen laajentuminen**: Useilla palveluilla hyväksytyt vaarantuneet tokenit mahdollistavat sivuttaisliikkumisen  

#### **Pakolliset turvakontrollit**  

**Neuvottelemattomat vaatimukset:**  
- **Tokenien validointi**: MCP-palvelimet **EIVÄT SAA** hyväksyä tokeneita, joita ei ole nimenomaisesti myönnetty MCP-palvelimelle  
- **Kohdeyleisön tarkistus**: Vahvista aina, että tokenin kohdeyleisön väitteet vastaavat MCP-palvelimen identiteettiä  
- **Tokenin elinkaaren hallinta**: Toteuta lyhytikäiset pääsytokenit ja turvalliset kiertokäytännöt  

## AI-järjestelmien toimitusketjun turvallisuus  

Toimitusketjun turvallisuus on kehittynyt perinteisistä ohjelmistoriippuvuuksista kattamaan koko AI-ekosysteemin. Nykyaikaisten MCP-toteutusten on tiukasti varmistettava ja valvottava kaikkia AI:n komponentteja, sillä jokainen niistä voi tuoda mukanaan haavoittuvuuksia, jotka vaarantavat järjestelmän eheyden.  

### Laajennetut AI-toimitusketjun komponentit  

**Perinteiset ohjelmistoriippuvuudet:**  
- Avoimen lähdekoodin kirjastot ja kehykset  
- Konttikuvat ja käyttöjärjestelmät  
- Kehitystyökalut ja build-putket  
- Infrastruktuurikomponentit ja palvelut  

**AI-spesifiset toimitusketjun elementit:**  
- **Perusmallit**: Eri tarjoajien esikoulutetut mallit, joiden alkuperä on varmennettava  
- **Upotuspalvelut**: Ulkoiset vektorointi- ja semanttisen haun palvelut  
- **Kontekstin tarjoajat**: Tietolähteet, tietopankit ja dokumenttivarastot  
- **Kolmannen osapuolen API:t**: Ulkoiset AI-palvelut, ML-putket ja datankäsittelypisteet  
- **Mallin artefaktit**: Painot, konfiguraatiot ja hienosäädetyt mallivariantit  
- **Koulutusdatalähteet**: Mallikoulutuksessa ja hienosäädössä käytetyt tietojoukot  

### Kattava toimitusketjun turvallisuusstrategia  

#### **Komponenttien varmennus & luottamus**  
- **Alkuperän validointi**: Tarkista kaikkien AI-komponenttien alkuperä, lisensointi ja eheys ennen integrointia  
- **Turvallisuusarviointi**: Suorita haavoittuvuusskannaukset ja turvallisuuskatselmukset malleille, tietolähteille ja AI-palveluille  
- **Maineen analyysi**: Arvioi AI-palveluntarjoajien turvallisuushistoria ja käytännöt  
- **Säädösten noudattaminen**: Varmista, että kaikki komponentit täyttävät organisaation turvallisuus- ja sääntelyvaatimukset  

#### **Turvalliset käyttöönotto-putket**  
- **Automaattinen CI/CD-turvallisuus**: Integroidut turvallisuusskannaukset automatisoiduissa käyttöönotto-putkissa  
- **Artefaktien eheys**: Käytä kryptografista varmistusta kaikille käyttöön otetuille artefakteille (koodi, mallit, konfiguraatiot)  
- **Vaiheittainen käyttöönotto**: Käytä asteittaista käyttöönottoa turvallisuustarkistuksilla jokaisessa vaiheessa  
- **Luotetut artefaktivarastot**: Ota käyttöön vain varmennetuista, turvallisista artefaktirekistereistä  

#### **Jatkuva valvonta & reagointi**  
- **Riippuvuuksien skannaus**: Jatkuva haavoittuvuuksien monitorointi kaikille ohjelmisto- ja AI-komponenttiriippuvuuksille  
- **Mallin valvonta**: Jatkuva arviointi mallin käytöksestä, suorituskyvyn vaihteluista ja turvallisuushäiriöistä  
- **Palveluiden tilaseuranta**: Seuraa ulkoisten AI-palveluiden saatavuutta, turvallisuuspoikkeamia ja politiikkamuutoksia  
- **Uhkatiedustelun integraatio**: Sisällytä AI:n ja koneoppimisen turvallisuusuhkiin liittyvät uhka- ja hälytysvirrat  

#### **Pääsynvalvonta & vähimmän oikeuden periaate**  
- **Komponenttitason käyttöoikeudet**: Rajoita pääsy malleihin, dataan ja palveluihin liiketoiminnan tarpeen mukaan  
- **Palvelutilitilin hallinta**: Toteuta omistetut palvelutilit, joilla on vain välttämättömät oikeudet  
- **Verkon segmentointi**: Eristä AI-komponentit ja rajoita verkkoyhteyksiä palveluiden välillä  
- **API-portaalin kontrollit**: Käytä keskitettyjä API-portaaleja ulkoisten AI-palveluiden pääsyn valvontaan ja kontrollointiin  

#### **Häiriötilanteisiin reagointi & toipuminen**  
- **Nopeat reagointimenettelyt**: Vakiintuneet prosessit vaarantuneiden AI-komponenttien korjaukselle tai vaihdolle  
- **Tunnistetietojen kierto**: Automaattiset järjestelmät salaisuuksien, API-avainten ja palvelutunnusten kiertoon  
- **Palautusmahdollisuudet**: Mahdollisuus palata nopeasti aiempaan luotetusti toimivaan AI-komponenttiversioon  
- **Toimitusketjun rikkomusten toipuminen**: Erityisprosessit ylävirran AI-palveluiden vaarantumistilanteissa  

### Microsoftin turvallisuustyökalut & integraatio  

**GitHub Advanced Security** tarjoaa kattavan toimitusketjusuojan sisältäen:  
- **Salaisuuksien skannaus**: Automaattinen tunnistus tunnistetiedoille, API-avaimille ja tokeneille repoissa  
- **Riippuvuuksien skannaus**: Haavoittuvuuksien arviointi avoimen lähdekoodin riippuvuuksille ja kirjastoille  
- **CodeQL-analyysi**: Staattinen koodianalyysi turvallisuuspuutteiden ja koodausvirheiden löytämiseksi  
- **Toimitusketjun näkymät**: Näkymä riippuvuuksien terveydestä ja turvallisuustilasta  

**Azure DevOps & Azure Repos -integraatio:**  
- Saumaton turvallisuusskannaus Microsoftin kehitysalustoilla  
- Automaattiset turvallisuustarkistukset Azure-putkissa AI-kuormille  
- Politiikkojen valvonta AI-komponenttien turvalliselle käyttöönotolle  

**Microsoftin sisäiset käytännöt:**  
Microsoft toteuttaa laajoja toimitusketjun turvallisuuskäytäntöjä kaikissa tuotteissaan. Lue todetuista toimintamalleista [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  

## Perusturvallisuuden parhaat käytännöt  

MCP-toteutukset perivät ja kehittävät organisaatiosi nykyistä turvallisuusasemaa. Perusturvallisuuskäytäntöjen vahvistaminen parantaa merkittävästi AI-järjestelmien ja MCP-käyttöönottojen kokonaisvaltaista turvallisuutta.  

### Keskeiset turvallisuuden perusteet  

#### **Turvalliset kehityskäytännöt**  
- **OWASP-vaatimustenmukaisuus**: Suojautuminen [OWASP Top 10](https://owasp.org/www-project-top-ten/) -verkkosovellusten haavoittuvuuksia vastaan  
- **AI-spesifiset suojaukset**: Kontrollien toteutus [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) mukaisesti  
- **Turvallinen salaisuuksien hallinta**: Käytä erityisiä säilöjä tokeneille, API-avaimille ja arkaluonteisille konfiguraatiotiedoille  
- **Päätepisteiden salaaminen**: Päätä - päähän-salaus kaikkien sovelluskomponenttien ja datavirtojen kesken  
- **Syötteiden validointi**: Kattava validointi kaikille käyttäjäsyötteille, API-parametreille ja tietolähteille  

#### **Infrastruktuurin kovettaminen**  
- **Monivaiheinen tunnistautuminen**: Pakollinen MFA kaikille ylläpitotileille ja palvelutilille  
- **Päivitysten hallinta**: Automaattinen, aikainen korjauspäivitysten toimeenpano käyttöjärjestelmissä, kehyksissä ja riippuvuuksissa  
- **Identiteetin tarjoajan integrointi**: Keskitetty identiteetin hallinta yritystason identiteettipalveluilla (Microsoft Entra ID, Active Directory)  
- **Verkon segmentointi**: MCP-komponenttien looginen eristäminen sivuttaisliikkumisen rajoittamiseksi  
- **Vähimmän etuoikeuden periaate**: Vain välttämättömät oikeudet kaikissa järjestelmän osissa ja tileissä  

#### **Turvallisuuden valvonta & havaitseminen**  
- **Kattava lokitus**: Yksityiskohtainen lokitus AI-sovellusten toiminnasta, mukaan lukien MCP-asiakas-palvelin-vuorovaikutukset  
- **SIEM-integraatio**: Keskitetty turvallisuustiedon ja tapahtumien hallinta poikkeamien tunnistamiseksi  
- **Käyttäytymisanalytiikka**: AI-pohjainen monitorointi poikkeuksellisten järjestelmä- ja käyttäytymismallien havaitsemiseksi  
- **Uhkatiedustelu**: Ulkoisten uhkayritysten ja kompromissimerkkejä sisältävien tietovirtojen integrointi  
- **Häiriötilanteiden reagointi**: Selkeästi määritellyt toimintamenettelyt turvallisuustapahtumien havaitsemiseen, käsittelyyn ja korjaukseen  

#### **Zero Trust -arkkitehtuuri**  
- **Älä koskaan luota, varmista aina**: Käyttäjien, laitteiden ja verkkoyhteyksien jatkuva vahvistaminen  
- **Mikrosementointi**: Tarkat verkkokontrollit, jotka eristävät yksittäiset työkuormat ja palvelut  
- **Identiteettikeskeinen turvallisuus**: Turvapolitiikat perustuvat varmistettuihin identiteetteihin eivät sijaintiin verkossa  
- **Jatkuva riskinarviointi**: Dynaaminen turvallisuusasema arvioidaan nykykontekstin ja käyttäytymisen perusteella  
- **Ehdollinen pääsy**: Pääsynvalvonta mukautuu riskitekijöiden, sijainnin ja laitteen luottamuksen mukaan  

### Yrityksen integrointimallit  

#### **Microsoftin turvallisuus-ekosysteemin integraatio**  
- **Microsoft Defender for Cloud**: Kattava pilven turvallisuusvalvonta- ja hallintaratkaisu  
- **Azure Sentinel**: Pilvipohjainen SIEM ja SOAR AI-kuormien suojaamiseen  
- **Microsoft Entra ID**: Yritystason identiteetin ja pääsynhallinta ehdollisilla käyttöoikeuspolitiikoilla  
- **Azure Key Vault**: Keskitetty salaisuuksien hallinta laitteistoturvallisen moduulin (HSM) tuella  
- **Microsoft Purview**: Datan hallinta ja säädösten noudattaminen AI-datalähteille ja työnkuluille  

#### **Säädösten ja hallinnon vaatimukset**  
- **Sääntelyn noudattaminen**: Varmista MCP-toteutusten täyttävän alakohtaiset vaatimukset (GDPR, HIPAA, SOC 2)  
- **Dataluokittelu**: Arkaluonteisen datan asianmukainen luokittelu ja käsittely AI-järjestelmissä  
- **Auditointilokit**: Kattava lokitus säädösten noudattamiseksi ja tutkintaan  
- **Yksityisyyden suojaus**: Tietosuojan huomioiminen suunnitteluperiaatteena AI-arkkitehtuurissa  
- **Muutoshallinta**: Viralliset prosessit AI-järjestelmämuutosten turvallisuustarkastuksille  

Nämä perustavat käytännöt luovat vahvan turvallisuuspohjan, joka tehostaa MCP-spesifisten turvakontrollien vaikutusta ja tarjoaa kokonaisvaltaisen suojan AI-perustaisille sovelluksille.  

## Keskeiset turvallisuustiivistelmät  

- **Kerrostettu tietoturvalähestymistapa**: Yhdistä perustason tietoturvakäytännöt (turvallinen koodaus, vähimmän oikeuden periaate, toimitusketjun tarkastus, jatkuva valvonta) AI-kohtaisiin kontrollitoimiin kattavan suojan takaamiseksi

- **AI-kohtainen uhkakenttä**: MCP-järjestelmät kohtaavat ainutlaatuisia riskejä, kuten kehotteen injektoinnin, työkalujen myrkytyksen, istunnon kaappauksen, confused deputy -ongelmat, tunnusten välityksen haavoittuvuudet ja liialliset käyttöoikeudet, jotka vaativat erityisiä lievennystoimia

- **Todennus- ja valtuutusosaaminen**: Ota käyttöön vahva todennus ulkoisten identiteettipalveluntarjoajien (Microsoft Entra ID) avulla, varmista asianmukainen tunnuksen validointi, äläkä koskaan hyväksy tunnuksia, joita ei ole eksplisiittisesti annettu MCP-palvelimellesi

- **AI-hyökkäysten estäminen**: Käytä Microsoft Prompt Shields- ja Azure Content Safety -ratkaisuja puolustaaksesi epäsuoria kehotteen injektointi- ja työkalujen myrkytyshyökkäyksiä vastaan, validoi työkalujen metadata ja valvo dynaamisia muutoksia

- **Istunto- ja siirtoturvallisuus**: Käytä kryptografisesti turvallisia, ei-deterministisiä istuntotunnuksia, jotka on sidottu käyttäjätunnuksiin, toteuta asianmukainen istunnon elinkaaren hallinta, äläkä koskaan käytä istuntoja todennukseen

- **OAuth-tietoturvan parhaat käytännöt**: Estä confused deputy -hyökkäykset eksplisiittisellä käyttäjän suostumuksella dynaamisesti rekisteröidyille asiakkaille, toteuta oikea OAuth 2.1 PKCE:llä ja tiukka uudelleenohjaus-URI:n validointi  

- **Tunnusten tietoturvaperiaatteet**: Vältä tunnusten välitystä vastaanottavia haitallisia malleja, validoi tunnusten vastaanottajien väitteet, ota käyttöön lyhytaikaiset tunnukset turvallisella kierrätyksellä ja ylläpidä selkeitä luottamusrakenteita

- **Kattava toimitusketjun tietoturva**: Käsittele kaikkia AI-ekosysteemin osia (mallit, upotukset, kontekstin tarjoajat, ulkoiset API:t) samalla tiukkuudella kuin perinteisiä ohjelmistoriippuvuuksia

- **Jatkuva kehittyminen**: Pysy ajan tasalla nopeasti kehittyvien MCP-määritysten kanssa, osallistu tietoturvayhteisön standardeihin ja ylläpidä mukautuvia tietoturvalähtöjä protokollan kehittyessä

- **Microsoftin tietoturvaintegraatio**: Hyödynnä Microsoftin kattavaa tietoturvaekosysteemiä (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) MCP-käyttöönoton suojaamisen vahvistamiseksi

## Kattavat resurssit

### **Virallinen MCP-tietoturvadokumentaatio**
- [MCP-määritys (Ajantasalla: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP:n parhaat tietoturvakäytännöt](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP:n valtuutusmäärittely](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP:n GitHub-repositorio](https://github.com/modelcontextprotocol)

### **OWASP MCP:n tietoturvaresurssit**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kattava OWASP MCP Top 10 Azure-toteutusohjeineen
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Virallinen OWASP MCP:n tietoturvariskit
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Käytännön tietoturvakoulutus MCP:lle Azure-ympäristössä

### **Tietoturvastandardit ja parhaat käytännöt**
- [OAuth 2.0:n parhaat tietoturvakäytännöt (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web-sovellusten tietoturva](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 suurille kielimalleille](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI-tietoturvan tutkimus ja analyysi**
- [Keinotekoinen kehotteen injektio MCP:ssä (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Työkalujen myrkytyshyökkäykset (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP-tietoturvatutkimuksen yhteenveto (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoftin tietoturvaratkaisut**
- [Microsoft Prompt Shields -dokumentaatio](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety -palvelu](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID:n tietoturva](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure-tunnusten hallinnan parhaat käytännöt](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Toteutusoppaat ja opetusohjelmat**
- [Azure API Management MCP:n todennuksen porttina](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID:n todennus MCP-palvelimille](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Tunnusten turvallinen säilytys ja salaaminen (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps- ja toimitusketjun tietoturva**
- [Azure DevOpsin tietoturva](https://azure.microsoft.com/products/devops)
- [Azure Reposin tietoturva](https://azure.microsoft.com/products/devops/repos/)
- [Microsoftin matka kohti toimitusketjun turvallisuutta](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Lisätietoturvadokumentaatio**

Kattavaa tietoturvaohjeistusta varten tutustu tähän osioon sisältyviin erikoistuneisiin dokumentteihin:

- **[MCP:n parhaat tietoturvakäytännöt 2025](./mcp-security-best-practices-2025.md)** - Täydelliset tietoturvan parhaat käytännöt MCP-toteutuksille
- **[Azure Content Safety -toteutus](./azure-content-safety-implementation.md)** - Käytännön esimerkit Azure Content Safetyn integroimiseksi  
- **[MCP:n tietoturvakontrollit 2025](./mcp-security-controls-2025.md)** - Viimeisimmät tietoturvakontrollit ja -tekniikat MCP-käyttöönottoihin
- **[MCP:n parhaat käytännöt pikaopas](./mcp-best-practices.md)** - Nopea viite MCP:n keskeisiin tietoturvakäytäntöihin
- **[BlueHat 2026: Tulevaisuuden AI:n turvaaminen: MCP:n puolustuskerrosmallit](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Microsoft Security Response Centerin (MSRC) puolustuskerrosmallit

### **Käytännön tietoturvakoulutus**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Kattava käytännön työpaja MCP-palvelinten turvaamiseen Azure-ympäristössä, alkaen Base Campista Summit-tasolle
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Viitearkkitehtuuri ja toteutusohjeet kaikille OWASP MCP Top 10 -riskeille

---

## Mitä seuraavaksi

Seuraava: [Luku 3: Aloittaminen](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->