# MCP-turvallisuus: Kattava suojaus tekoälyjärjestelmille

[![MCP Security Best Practices](../../../translated_images/fi/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Napsauta yllä olevaa kuvaa katsoaksesi tämän oppitunnin videon)_

Turvallisuus on perustavanlaatuista tekoälyjärjestelmien suunnittelussa, minkä vuoksi se on toisen osion keskeinen painopisteemme. Tämä on linjassa Microsoftin **Secure by Design** -periaatteen kanssa [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) -ohjelmasta.

Model Context Protocol (MCP) tuo tekoälypohjaisiin sovelluksiin voimakkaita uusia ominaisuuksia, mutta se asettaa myös ainutlaatuisia turvallisuushaasteita, jotka ylittävät perinteiset ohjelmistoriskit. MCP-järjestelmät kohtaavat sekä vakiintuneita tietoturvaongelmia (turvallinen koodaus, vähimmän oikeuden periaate, toimitusketjun turvallisuus) että uusia tekoälykohtaisia uhkia, kuten kehotteen injektoinnin, työkalumyrkytyksen, istunnon kaappauksen, sekaantuneen apurin hyökkäykset, tokenin ohjauksen haavoittuvuudet ja dynaamisen toiminnallisuuden muutokset.

Tässä oppitunnissa käsitellään tärkeimpiä turvallisuusriskejä MCP-ratkaisuissa—kattaen todennuksen, valtuutuksen, liiallisen käyttöoikeuden, epäsuoran kehotteen injektoinnin, istuntoturvallisuuden, sekaantuneen apurin ongelmat, tokenien hallinnan ja toimitusketjun haavoittuvuudet. Opit käytännön valvontakeinoja ja parhaita käytäntöjä näiden riskien lieventämiseksi hyödynnettäessä Microsoftin ratkaisuja kuten Prompt Shields, Azure Content Safety ja GitHub Advanced Security, jotka vahvistavat MCP-käyttöönottoasi.

## Oppimistavoitteet

Oppitunnin päätteeksi osaat:

- **Tunnistaa MCP-kohtaiset uhat**: Tunnistaa MCP-järjestelmien ainutlaatuiset tietoturvariskit, mukaan lukien kehotteen injektointi, työkalumyrkytys, liialliset oikeudet, istunnon kaappaus, sekaantuneen apurin ongelmat, tokenin ohjauksen haavoittuvuudet ja toimitusketjuriskit
- **Soveltaa turvavalvontoja**: Toteuttaa tehokkaita lieventäviä toimenpiteitä, kuten vahvaa todennusta, vähimmän oikeuden käyttöä, turvallista tokenien hallintaa, istunnoturvavalvontoja ja toimitusketjun vahvistusta
- **Hyödyntää Microsoftin turvallisuusratkaisuja**: Ymmärtää ja ottaa käyttöön Microsoft Prompt Shieldsit, Azure Content Safetyn ja GitHub Advanced Securityn MCP-kuormituksen suojaamiseksi
- **Varmistaa työkalujen turvallisuus**: Havaita työkalujen metadataan liittyvän validoinnin tärkeys, dynaamisten muutosten valvonta ja puolustautuminen epäsuoria kehotteiden injektointihyökkäyksiä vastaan
- **Yhdistää parhaat käytännöt**: Yhdistää vakiintuneet turvallisuuden perusperiaatteet (turvallinen koodaus, palvelimen koventaminen, zero trust) MCP-spesifeihin valvontoihin kattavaa suojausta varten

# MCP-tietoturva-arkkitehtuuri ja valvonnat

Nykyaikaiset MCP-ratkaisut vaativat kerroksellisia turvallisuuslähestymistapoja, jotka kattavat sekä perinteisen ohjelmistoturvallisuuden että tekoälykohtaiset uhat. MCP-spesifikaatio kehittyy nopeasti ja parantaa jatkuvasti turvallisuusvalvontojaan, mahdollistaen paremman integroinnin yritysturvallisuusarkkitehtuureihin ja vakiintuneisiin parhaisiin käytäntöihin.

Tutkimukset [Microsoft Digital Defense Report](https://aka.ms/mddr) -raportista osoittavat, että **98 % raporteista rikkomuksista voitaisiin estää vahvalla turvallisuuskäytännöllä**. Tehokkain suojausstrategia yhdistää perustason turvallisuuskäytännöt MCP-kohtaisiin valvontoihin—todistetut perusmittarit pysyvät vaikutuksiltaan merkittävimpinä kokonaisriskin vähentämisessä.

## Ajankohtainen turvallisuusympäristö

> **Huom:** Tämä tieto heijastaa MCP-turvallisuusstandardeja tilassa **5. helmikuuta 2026**, linjassa **MCP Specification 2025-11-25** kanssa. MCP-protokolla kehittyy nopeasti, ja tulevat toteutukset saattavat tuoda uusia todennusmalleja ja parannettuja valvontoja. Katso aina ajantasaiset ohjeet [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) ja [security best practices documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

## 🏔️ MCP Security Summit -työpaja (Sherpa)

Käytännön tietoturvakoulutusta varten suosittelemme lämpimästi **MCP Security Summit Workshop** (Sherpa) -kurssia, joka on kattava ohjattu retki MCP-palvelimien suojaamiseen Microsoft Azuren ympäristössä.

### Työpajan yleiskuvaus

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) tarjoaa käytännönläheistä, toimintalähtöistä turvallisuuskoulutusta todennetun "haavoittuva → hyökkää → korjaa → varmista" metodologian mukaisesti. Kurssilla:

- **Opit rikkomalla asioita**: Koet haavoittuvaisuudet käytännössä hyökkäämällä tarkoituksella epävarmoihin palvelimiin
- **Hyödynnät Azure-native -turvallisuutta**: Käytät Azure Entra ID:tä, Key Vaultia, API Managementia ja AI Content Safetya
- **Seuraat Defense-in-Depth -periaatetta**: Edistyt leiristä toiseen rakentamalla kattavia turvakerroksia
- **Sovellat OWASP-standardeja**: Jokainen tekniikka vastaa [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) -suosituksia
- **Saat tuotantovalmiin koodin**: Saat mukaasi toimivia, testattuja toteutuksia

### Retken reitti

| Leiri | Painopiste | Käsitellyt OWASP-riskit |
|------|------------|-------------------------|
| **Base Camp** | MCP:n perusteet ja todennusongelmat | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, hallinta | MCP02, MCP07, MCP09 |
| **Camp 3: I/O Security** | Kehotteen injektointi, PII-suojaus, sisältöturva | MCP03, MCP05, MCP06 |
| **Camp 4: Monitoring** | Log Analytics, dashboardit, uhkien havaitseminen | MCP08 |
| **The Summit** | Red Team / Blue Team -yhdistämistesti | Kaikki |

**Aloita tästä**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 -turvallisuusriskit

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) yksilöi kymmenen kriittisintä turvallisuusriskiä MCP-toteutuksille:

| Riski | Kuvaus | Azure-levitystapa |
|-------|--------|-------------------|
| **MCP01** | Tokenien virheellinen hallinta ja salausten vuotaminen | Azure Key Vault, Managed Identity |
| **MCP02** | Oikeuksien laajeneminen scope creepin kautta | RBAC, Conditional Access |
| **MCP03** | Työkalumyrkytys | Työkalun validointi, eheystarkistus |
| **MCP04** | Toimitusketjun hyökkäykset | GitHub Advanced Security, riippuvuusskannaus |
| **MCP05** | Komentorivin injektointi ja suoritus | Syötteen validointi, sandboxaus |
| **MCP06** | Kehotteen injektointi kontekstuaalisten sisältöjen kautta | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Riittämätön todennus ja valtuutus | Azure Entra ID, OAuth 2.1 PKCE:llä |
| **MCP08** | Puutteellinen auditointi ja telemetria | Azure Monitor, Application Insights |
| **MCP09** | Varjopalvelimet MCP:ssä | API Center -hallinta, verkon eristäminen |
| **MCP10** | Kontekstin injektointi ja liiallinen tietojen jakaminen | Dataluokittelu, minimiaalinen altistaminen |

### MCP-todennuksen kehitys

MCP-spesifikaation todennus- ja valtuutusmallit ovat kehittyneet merkittävästi:

- **Alkuperäinen lähestymistapa**: Varhaiset spesifikaatiot vaativat kehittäjiä rakentamaan omat todennuspalvelimet, joissa MCP-palvelimet toimivat OAuth 2.0 -valtuutuspalvelimina käyttäjien todennusta halliten
- **Nykyinen standardi (2025-11-25)**: Päivitetty spesifikaatio sallii MCP-palvelimien delegoida todennuksen ulkoisille identiteetin tarjoajille (kuten Microsoft Entra ID), parantaen turvallisuutta ja vähentäen toteutuksen monimutkaisuutta
- **Kuljetuskerroksen turvallisuus**: Parannettu tuki turvallisille kuljetusmekanismeille paikallisille (STDIO) ja etäisille (Streamable HTTP) yhteyksille asianmukaisilla todennusmalleilla

## Todennus- ja valtuutusturvallisuus

### Nykyiset turvallisuushaasteet

Nykyaikaiset MCP-toteutukset kohtaavat lukuisia haasteita todennus- ja valtuutusprosessissa:

### Riskit ja uhat

- **Virheellisesti määritetty valtuutuslogiikka**: MCP-palvelinten epäonnistunut valtuutus toteutus voi altistaa arkaluontoisia tietoja ja soveltaa väärin käyttöoikeuksia
- **OAuth-tokenin vaarantuminen**: Paikallisen MCP-palvelimen tokenin varkaus antaa hyökkääjälle mahdollisuuden esiintyä palvelimena ja käyttää alapuolisia palveluita
- **Tokenin ohjauksen haavoittuvuudet**: Väärä tokenien käsittely aiheuttaa turvallisuusvalvontojen ohi pääsyä ja vastuukatoja
- **Liialliset käyttöoikeudet**: Ylimitoitetut MCP-palvelimen oikeudet rikkovat vähimmän oikeuden periaatetta ja lisäävät hyökkäyspintaa

#### Tokenin ohjaus: kriittinen väärinkäytöskaava

**Tokenin ohjaus on eksplisiittisesti kielletty** nykyisessä MCP-valtuutusmäärittelyssä vakavien turvallisuusvaikutusten vuoksi:

##### Turvallisuusvalvonnan kierto
- MCP-palvelimet ja alapuoliset API:t toteuttavat tärkeitä turvallisuusrajoituksia (kyselyrajoitus, pyyntöjen validointi, liikenteen seuranta), jotka perustuvat oikeaan tokenien validointiin
- Suora asiakasta API:lle operoiva tokenien käyttö ohittaa nämä keskeiset suojaukset, heikentäen turvallisuusarkkitehtuuria

##### Vastuullisuus- ja auditointiongelmat  
- MCP-palvelimet eivät voi erottaa asiakkaita, jotka käyttävät ylätason tokenia, mikä katkaisee auditointiketjut
- Alapuolisissa resurssipalvelimissa lokit näyttävät virheellisiä pyynnön lähteitä aitojen MCP-välittäjien sijaan
- Tapaus- ja vaatimustenmukaisuustutkimukset vaikeutuvat huomattavasti

##### Datan poiskuljetuksen riskit
- Validointiin kuulumattomat token-vaatimukset voivat mahdollistaa vaarallisen toiminnan varastetuilla tokeneilla, käyttäen MCP-palvelinta välityspisteenä
- Luottamuksen rikkominen turvallisuusesteissä sallii luvattoman pääsyn toistetulla mallilla

##### Monipalveluhyökkäysvektorit
- Vahingoittuneet tokenit, joita useat palvelut hyväksyvät, mahdollistavat sivuttaisen liikkumisen järjestelmien välillä
- Palveluiden väliset luottamusolettamat saattavat rikkoutua tokenien alkuperää varmentamatta

### Turvavalvonnat ja lieventäjät

**Kriittiset turvallisuusvaatimukset:**

> **VELVOITTAVA:** MCP-palvelimet **EIVÄT SAA** hyväksyä tokenia, joita ei ole eksplisiittisesti myönnetty kyseiselle MCP-palvelimelle

#### Todennus- ja valtuutusvalvonnat

- **Tiukka valtuutuksen tarkistus**: Suorita kattavat auditoinnit MCP-palvelinten valtuutuslogiikasta varmistaaksesi, että vain määritellyt käyttäjät ja asiakkaat pääsevät arkaluontoisiin resursseihin
  - **Toteutusopas**: [Azure API Management MCP-palvelimien todennusporttina](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identiteetin integrointi**: [Microsoft Entra ID:n käyttäminen MCP-palvelimen todennuksessa](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Turvallinen token-hallinta**: Ota käyttöön [Microsoftin tokenien validointi- ja elinkaaren parhaat käytännöt](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Varmista tokenin kohdevaatimusten vastaavuus MCP-palvelimen identiteettiin
  - Käytä asianmukaista tokenien pyöritystä ja vanhentumiskäytäntöjä
  - Estä tokenien uudelleenkäyttöhyökkäykset ja luvaton käyttö

- **Suojattu tokenien tallennus**: Salaa tokenien tallennus sekä levossa että siirrossa
  - **Parhaat käytännöt**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Käyttöoikeuksien hallinta

- **Vähimmän käyttöoikeuden periaate**: Anna MCP-palvelimille vain välttämättömät oikeudet haluttuun toiminnallisuuteen
  - Säännölliset käyttöoikeuksien tarkistukset ja päivitykset oikeuksien kasvun estämiseksi
  - **Microsoftin dokumentaatio**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Roolipohjainen käyttöoikeuksien hallinta (RBAC)**: Toteuta hienojakoiset roolijaot
  - Rajaa roolit tiukasti tiettyihin resursseihin ja toimiin
  - Vältä laajojen tai tarpeettomien oikeuksien antamista, joka laajentaa hyökkäyspintaa

- **Jatkuva käyttöoikeuksien seuranta**: Toteuta jatkuva pääsyn auditointi ja valvonta
  - Valvo käyttöoikeuksien käyttöä poikkeamien varalta
  - Korjaa heti liialliset tai käyttämättömät oikeudet

## Tekoälykohtaiset turvallisuusuhat

### Kehotteen injektointi ja työkalujen manipulointihyökkäykset

Nykyaikaiset MCP-ratkaisut kohtaavat kehittyneitä tekoälykohtaisia hyökkäysvektoreita, joita perinteiset tietoturvakäytännöt eivät täysin ratkaise:

#### **Epäsuora kehotteen injektointi (Cross-Domain Prompt Injection)**

**Epäsuora kehotteen injektointi** on yksi kriittisimmistä haavoittuvuuksista MCP-pohjaisissa tekoälyjärjestelmissä. Hyökkääjät upottavat haitallisia ohjeita ulkopuoliseen sisältöön—kuten asiakirjoihin, verkkosivuihin, sähköposteihin tai tietolähteisiin—jotka tekoälyjärjestelmät käsittelevät myöhemmin laillisina käskyina.

**Hyökkäysskenaariot:**
- **Asiakirjapohjainen injektointi**: Haitalliset ohjeet piilossa käsiteltävissä asiakirjoissa, jotka käynnistävät ei-toivottuja tekoälytoimintoja
- **Verkkosisällön hyväksikäyttö**: Hyväksikäytetyt verkkosivut, joihin on upotettu kehotteita, jotka manipuloivat tekoälyn käyttäytymistä, kun sivuja indeksoidaan
- **Sähköpostipohjaiset hyökkäykset**: Haittalliset kehotteet sähköposteissa, jotka saavat tekoälyavustajat vuotamaan tietoja tai suorittamaan luvattomia toimintoja
- **Tietolähteen saastuttaminen**: Vahingoittuneet tietokannat tai API:t tarjoavat saastunutta sisältöä tekoälyjärjestelmille

**Todellinen vaikutus**: Nämä hyökkäykset voivat johtaa tietojen poistamiseen, yksityisyysloukkauksiin, haitallisen sisällön tuottamiseen ja käyttäjien vuorovaikutusten manipulointiin. Yksityiskohtainen analyysi löytyy osoitteesta [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection -hyökkäyksen kaavio](../../../translated_images/fi/prompt-injection.ed9fbfde297ca877.webp)

#### **Työkalumyrkytyshyökkäykset**

**Työkalumyrkytys** kohdistuu metadataan, joka määrittelee MCP-työkalut, hyväksikäyttäen miten LLM-mallit tulkitsevat työkalujen kuvauksia ja parametreja päätöksenteossa.

**Hyökkäyskeinot:**
- **Metadatan manipulointi**: Hyökkääjät upottavat haitallisia ohjeita työkalukuvausten, parametrien määrittelyjen tai käyttöesimerkkien joukkoon
- **Näkymättömät ohjeet**: Piilotetut kehotteet työkalumetadatassa, joita tekoälymallit käsittelevät, mutta ihmiset eivät näe
- **Dynaaminen työkalun muutos ("Rug Pulls")**: Käyttäjien hyväksymät työkalut muutetaan myöhemmin suorittamaan haitallisia toimintoja ilman käyttäjän tietoisuutta
- **Parametrien injektointi**: Haitallinen sisältö upotetaan työkalun parametriaskeemoihin, mikä vaikuttaa mallin käyttäytymiseen

**Isännöidyt palvelinriskit**: Etäiset MCP-palvelimet ovat suuremmassa riskissä, koska työkalumäärittelyjä voidaan päivittää käyttäjän alkuperäisen hyväksynnän jälkeen, mikä luo tilanteita, joissa aiemmin turvalliset työkalut muuttuvat haitallisiksi. Laaja analyysi löytyy osoitteesta [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Työkalun injektoinnin kaavio](../../../translated_images/fi/tool-injection.3b0b4a6b24de6bef.webp)

#### **Lisää tekoälyhyökkäysvektoreita**

- **Cross-Domain Prompt Injection (XPIA)**: Monimutkaiset hyökkäykset, jotka hyödyntävät useiden verkkotunnusten sisältöjä ohittaakseen turvavalvonnat
- **Dynaaminen kyvykkyyksien muokkaus**: Työkalujen kyvykkyyksien reaaliaikaiset muutokset, jotka ohittavat alkuperäiset turvallisuusarvioinnit
- **Kontekstin ikkunan myrkyttäminen**: Hyökkäykset, jotka manipuloivat laajoja kontekstin ikkunoita piilottaakseen haitallisia ohjeita
- **Mallin hämmentämishyökkäykset**: Mallin rajoitusten hyväksikäyttö arvaamattomien tai turvattomien toimintojen luomiseksi

### AI-turvallisuusriski Vaikutukset

**Korkean vaikutuksen seuraukset:**
- **Tietojen poisto**: Luvaton pääsy ja arkaluonteisten yritys- tai henkilökohtaisten tietojen varastaminen
- **Yksityisyyden rikkomukset**: Henkilökohtaisesti tunnistettavien tietojen (PII) ja luottamuksellisten liiketoimintatietojen paljastuminen  
- **Järjestelmän manipulointi**: Tahattomat muutokset kriittisissä järjestelmissä ja työnkuluissa
- **Tunnistetietojen varastaminen**: Tunnistautumistunnusten ja palvelutunnusten vaarantuminen
- **Sivuttaissiirtyminen**: Vainottujen AI-järjestelmien käyttö laajempien verkon hyökkäysten lähtökohtina

### Microsoftin AI-turvallisuusratkaisut

#### **AI Prompt Shields: Edistynyt suojaus injektiohyökkäyksiä vastaan**

Microsoftin **AI Prompt Shields** tarjoavat kattavan suojan sekä suorilta että epäsuorilta prompt-injektiohyökkäyksiltä monikerroksisen turvallisuuden avulla:

##### **Perussuojausmekanismit:**

1. **Edistynyt havaitseminen ja suodatus**
   - Koneoppimisalgoritmit ja NLP-tekniikat havaitsevat haitalliset ohjeet ulkoisessa sisällössä
   - Reaaliaikainen analyysi dokumenteista, verkkosivuista, sähköposteista ja tietolähteistä upotettujen uhkien varalta
   - Kontekstuaalinen ymmärrys laillisista vs. haitallisista prompt-malleista

2. **Valaisu-tekniikat**  
   - Erottaa luotetut järjestelmäohjeet mahdollisesti vaarantuneista ulkoisista syötteistä
   - Tekstin muunnosmenetelmät, jotka parantavat mallin relevanssia ja eristävät haitallisen sisällön
   - Auttaa AI-järjestelmiä ylläpitämään asianmukaista ohjehierarkiaa ja ohittamaan injektoidut käskyt

3. **Erottelijat ja tietomerkintäjärjestelmät**
   - Selkeä rajaus luotettujen järjestelmäviestien ja ulkopuolisen syötekirjoituksen välillä
   - Erikoismerkit korostavat rajat luotettujen ja epäluotettavien tietolähteiden välillä
   - Selkeä erottelu estää ohjeiden sekaantumista ja luvattomia käskyjen suorittamisia

4. **Jatkuva uhkatiedustelu**
   - Microsoft seuraa jatkuvasti nousevia hyökkäyskuvioita ja päivittää puolustuksia
   - Proaktiivinen uhkien metsästys uusille injektio- ja hyökkäystekniikoille
   - Säännölliset turvallisuusmallipäivitykset vaikuttavuuden ylläpitämiseksi kehittyviä uhkia vastaan

5. **Azure Content Safety -integraatio**
   - Osa kattavaa Azure AI Content Safety -kokonaisuutta
   - Lisähavainnointi jailbreak-yrityksille, haitalliselle sisällölle ja turvallisuuspolitiikkojen rikkomisille
   - Yhtenäiset turvallisuuskontrollit AI-sovellusten komponenteille

**Toteutusresurssit**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/fi/prompt-shield.ff5b95be76e9c78c.webp)


## Edistyneet MCP-turvauhkat

### Istunnon kaappaamisen haavoittuvuudet

**Istunnon kaappaaminen** on kriittinen hyökkäysvektori tilasäilöisissä MCP-toteutuksissa, joissa luvattomat osapuolet saavat ja hyödyntävät laillisia istuntotunnuksia asiakkaiden jäljittelemiseksi ja luvattomien toimintojen suorittamiseksi.

#### **Hyökkäysskenaariot ja riskit**

- **Istunnon kaappaus prompt-injektio**: Hyökkääjät, joilla on varastetut istuntotunnukset, injektoivat haitallisia tapahtumia palvelimille, jotka jakavat istuntotilan, mahdollistaen haitallisten toimintojen laukaisun tai arkaluonteisten tietojen saatavuuden  
- **Suora henkilöllisyyden väärentäminen**: Varastetut istuntotunnukset mahdollistavat suorat MCP-palvelinkutsut, jotka ohittavat tunnistautumisen ja kohtelevat hyökkääjiä laillisina käyttäjinä  
- **Vainotut jatkettavat tietovirrat**: Hyökkääjät voivat keskeyttää pyynnöt ennenaikaisesti, aiheuttaen laillisille asiakkaille jatkamisen mahdollisesti haitallisen sisällön kanssa

#### **Turvakontrollit istunnonhallintaan**

**Kriittiset vaatimukset:**
- **Valtuutuksen tarkastus**: MCP-palvelimien, jotka toteuttavat valtuutuksen, ON tarkistettava KAIKKI saapuvat pyynnöt eikä NIIDEN SAA luottaa istuntoihin tunnistautumisessa  
- **Turvallinen istunnon generointi**: Käytä kryptografisesti turvallisia, ei-deterministisiä istuntotunnuksia, jotka on luotu turvallisilla satunnaislukugeneraattoreilla  
- **Käyttäjäkohtainen sitominen**: Sitota istuntotunnukset käyttäjäkohtaisiin tietoihin käyttämällä muotoa `<user_id>:<session_id>`, jotta estetään käyttäjien välinen istunnon väärinkäyttö  
- **Istunnon elinkaaren hallinta**: Toteuta asianmukainen vanhentuminen, kierto ja mitätöinti haavoittuvuuksien ikkunoiden rajoittamiseksi  
- **Siirtoturvallisuus**: HTTPS on pakollinen kaikessa viestinnässä estämään istuntotunnusten sieppaaminen

### Hämmentynyt palvelunhaltija -ongelma

**Hämmentynyt palvelunhaltija -ongelma** syntyy, kun MCP-palvelimet toimivat tunnistautumisvälityspalvelimina asiakkaiden ja kolmansien osapuolten palveluiden välillä, luoden mahdollisuuksia valtuutuksen ohittamiseen staattisten asiakastunnusten väärinkäytön kautta.

#### **Hyökkäysmekaniikka ja riskit**

- **Evästeisiin perustuva suostumuksen ohitus**: Aiempi käyttäjän tunnistautuminen luo suostumusevästeitä, joita hyökkääjät hyödyntävät haitallisilla valtuutuspyynnöillä, joissa on muokatut uudelleenohjaus-URI:t  
- **Valtuutuskoodin varkaus**: Olemassa olevat suostumusevästeet voivat aiheuttaa valtuutuspalvelimien ohittavan suostumusnäytöt ja ohjaavan koodit hyökkääjän hallinnoimiin päätepisteisiin  
- **Luvaton API-pääsy**: Varastetut valtuutuskoodit mahdollistavat token-vaihdon ja käyttäjien jäljittelemisen ilman nimenomaista hyväksyntää

#### **Ehkäisystrategiat**

**Pakolliset kontrollit:**
- **Nimenomaiset suostumusvaatimukset**: MCP-välityspalvelinten, jotka käyttävät staattisia asiakastunnuksia, ON saatava käyttäjien suostumus jokaiselle dynaamisesti rekisteröidylle asiakkaalle  
- **OAuth 2.1 -turvallisuuden toteutus**: Noudata nykyisiä OAuth-turvallisuuden parhaita käytäntöjä, mukaan lukien PKCE (Proof Key for Code Exchange) kaikissa valtuutuspyynnöissä  
- **Tiukka asiakkaan validointi**: Toteuta tarkka validointi uudelleenohjaus-URI:lle ja asiakastunnuksille estääksesi väärinkäytöt

### Tokenin läpivientihaavoittuvuudet  

**Token-läpivienti** on selkeä anti-malli, jossa MCP-palvelimet hyväksyvät asiakastokenit ilman asianmukaista validointia ja välittävät ne edelleen alaspäin olevalle API:lle, rikkoen MCP-valtuutussäännökset.

#### **Turvallisuusvaikutukset**

- **Kontrollien ohitus**: Suora tokenin käyttö asiakkaalta API:lle ohittaa kriittiset osuusrajoitukset, validoinnit ja valvonnat  
- **Auditointilokien korruptio**: Ylhäältä saadut tokenit estävät asiakkaan tunnistamisen, mikä vaarantaa tapaustutkimusmahdollisuudet  
- **Välityspalvelinperusteinen tietojen poisto**: Validointia vailla olevat tokenit mahdollistavat haitallisten tahojen käyttää palvelimia proxyinä luvattomaan tietojen käyttöön  
- **Luottamusrajaongelmat**: Alaspäin suuntautuvat palvelut voivat menettää luottamuksen, kun tokenien alkuperää ei pystytä varmistamaan  
- **Monipalveluhyökkäysten laajentuminen**: Useilla palveluilla hyväksytyt vaarantuneet tokenit mahdollistavat sivuttaishyökkäykset

#### **Vaaditut turvallisuuskontrollit**

**Ei-neuvoteltavat vaatimukset:**
- **Tokenien validointi**: MCP-palvelimet EIVÄT SAA hyväksyä tokeneita, joita ei ole nimenomaisesti myönnetty MCP-palvelimelle  
- **Kohdeyleisön tarkastus**: Varmista aina, että tokenin kohdeyleisö vastaa MCP-palvelimen identiteettiä  
- **Oikea tokenin elinkaari**: Toteuta lyhytikäiset käyttöoikeustokenit ja turvalliset kiertokäytännöt


## Toimitusketjun turvallisuus AI-järjestelmille

Toimitusketjun turvallisuus on kehittynyt perinteisten ohjelmistoriippuvuuksien ulkopuolelle kattamaan koko AI-ekosysteemin. Nykyaikaisten MCP-toteutusten on tarkasti varmistettava ja valvottava kaikkia AI:hin liittyviä komponentteja, sillä jokainen tuo mukanaan potentiaalisia haavoittuvuuksia, jotka voivat vaarantaa järjestelmän eheyden.

### Laajennetut AI-toimitusketjun komponentit

**Perinteiset ohjelmistoriippuvuudet:**
- Avoimen lähdekoodin kirjastot ja kehykset
- Konttikuvat ja perusjärjestelmät  
- Kehitystyökalut ja rakennusputket
- Infrastruktuurikomponentit ja -palvelut

**AI-spesifiset toimitusketju-elementit:**
- **Perusmallit**: Eri toimittajilta hankitut esikoulutetut mallit, joiden alkuperä on varmistettava
- **Upotepalvelut**: Ulkoiset vektorointiin ja semanttiseen hakuun liittyvät palvelut
- **Kontekstin tarjoajat**: Tietolähteet, tietokannat ja asiakirjasäiliöt  
- **Kolmannen osapuolen API:t**: Ulkoiset AI-palvelut, ML-putket ja datankäsittelypisteet
- **Mallin artefaktit**: Painot, kokoonpanot ja hienosäädetyt mallit
- **Koulutusdata**: Datasetit, joita käytetään mallien koulutukseen ja hienosäätöön

### Kattava toimitusketjun turvallisuusstrategia

#### **Komponenttien todentaminen ja luottamus**
- **Alkuperän varmistus**: Tarkista kaikkien AI-komponenttien alkuperä, lisenssit ja eheyys ennen integrointia  
- **Turvallisuusarviointi**: Suorita haavoittuvuusskannaukset ja turvallisuustarkastukset malleille, tietolähteille ja AI-palveluille  
- **Maineanalyysi**: Arvioi AI-palveluntarjoajien turvallisuushistoria ja käytännöt  
- **Säädöstenmukaisuuden varmistus**: Varmista, että kaikki komponentit täyttävät organisaation turvallisuus- ja säädösvaatimukset

#### **Turvalliset käyttöönotto-putket**  
- **Automaattinen CI/CD-turvallisuus**: Integroi turvallisuusskannaukset koko automatisoituun käyttöönotto-putkeen  
- **Artefaktien eheys**: Ota käyttöön kryptografinen varmistus kaikille käyttöön otettaville artefakteille (koodi, mallit, kokoonpanot)  
- **Vaiheittainen käyttöönotto**: Käytä asteittaisia käyttöönotto-strategioita, joissa turvallisuus validoidaan jokaisessa vaiheessa  
- **Luotetut artefaktivarastot**: Ota käyttöön vain varmennetuista, turvallisista rekistereistä ja varastoista

#### **Jatkuva valvonta ja reagointi**
- **Riippuvuuksien skannaus**: Jatkuva haavoittuvuusseuranta kaikille ohjelmisto- ja AI-komponenttien riippuvuuksille  
- **Mallin valvonta**: Jatkuva mallin käyttäytymisen, suorituskyvyn poikkeamien ja turvallisuuspoikkeamien arviointi  
- **Palveluiden tilan seuranta**: Ulkoisten AI-palveluiden saatavuuden, turvallisuustapahtumien ja politiikkamuutosten valvonta  
- **Uhkajoukkojen integraatio**: AI- ja ML-turvallisuusuhkiin liittyvien uhkatietojen sisällyttäminen

#### **Pääsynhallinta ja vähimmän oikeuden periaate**
- **Komponenttikohtaiset käyttöoikeudet**: Rajoita pääsy malleihin, dataan ja palveluihin vain liiketoiminnan tarpeen mukaan  
- **Palvelutilien hallinta**: Käytä erillisiä palvelutilejä, joilla on vain välttämättömät käyttöoikeudet  
- **Verkkosegmentointi**: Eristä AI-komponentit ja rajoita verkon pääsy palveluiden välillä  
- **API-portaalityökalut**: Hallitse ja valvo pääsyä ulkoisiin AI-palveluihin keskitettyjen API-porttien kautta

#### **Häiriötilannevalmius ja palautus**
- **Nopeat reagointimenettelyt**: Valmiit prosessit korjata tai vaihtaa vaarantuneet AI-komponentit  
- **Tunnistetietojen kierto**: Automaattiset järjestelmät salaisuuksien, API-avainten ja palvelutunnusten kiertoon  
- **Palautusmahdollisuudet**: Nopea palautus tunnetusti hyviin AI-komponenttiversioihin  
- **Toimitusketjun rikkoutumisen palautus**: Erityismenettelyt ylävirran AI-palveluiden vaarantumisiin reagoimiseksi

### Microsoftin turvallisuustyökalut ja integraatiot

**GitHub Advanced Security** tarjoaa kattavan toimitusketjusuojan, mukaan lukien:
- **Salaisuuksien skannaus**: Automaattinen tunnistus tunnuksista, API-avaimista ja tokeneista arkistoissa
- **Riippuvuuksien skannaus**: Haavoittuvuuksien arviointi avoimen lähdekoodin riippuvuuksille ja kirjastoille
- **CodeQL-analyysi**: Staattinen koodin analyysi turvallisuuspuutteiden ja koodin ongelmien löytämiseksi
- **Toimitusketjun näkymät**: Näkyvyys riippuvuuksien tilaan, turvallisuuteen ja kuntoon

**Azure DevOps ja Azure Repos -integraatio:**
- Saumaton turvallisuusskannaukset Microsoftin kehitysalustojen välillä
- Automaattiset turvallisuustarkastukset Azure Pipelinesissa AI-kuormituksille
- Politiikkojen toimeenpano turvallisille AI-komponenttien käyttöönotolle

**Microsoftin sisäiset käytännöt:**
Microsoft toteuttaa laajoja toimitusketjun turvallisuuskäytäntöjä kaikissa tuotteissa. Tutustu todistettuihin menetelmiin [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Perusturvallisuuden parhaat käytännöt

MCP-toteutukset perivät ja rakentavat organisaatiosi olemassa olevaa turvallisuusasemaa. Perusturvallisuuskäytäntöjen vahvistaminen parantaa merkittävästi AI-järjestelmien ja MCP-järjestelyjen kokonaisturvallisuutta.

### Keskeiset turvallisuuden perusteet

#### **Turvalliset kehityskäytännöt**
- **OWASP-vaatimustenmukaisuus**: Suojaa [OWASP Top 10](https://owasp.org/www-project-top-ten/) -web-sovellusten haavoittuvuuksia vastaan  
- **AI-spesifiset suojaukset**: Toteuta kontrollit [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) -listan mukaisesti  
- **Turvallinen salaisuuksien hallinta**: Käytä erillisiä säiliöitä tokeneille, API-avaimille ja arkaluonteisille kokoonpanotiedoille  
- **End-to-End-salaus**: Ota käyttöön turvalliset viestintäkanavat kaikissa sovelluskomponenteissa ja tiedonsiirroissa  
- **Syötteen validointi**: Tiukka validointi kaikille käyttäjäsyötteille, API-parametreille ja tietolähteille

#### **Infrastruktuurin koventaminen**
- **Monivaiheinen tunnistautuminen**: Pakollinen MFA kaikille hallinta- ja palvelutileille  
- **Päivitysten hallinta**: Automaattinen ja ajantasainen korjausten hallinta käyttöjärjestelmille, kehyksille ja riippuvuuksille  
- **Identiteettipalveluntarjoajan integraatio**: Keskitetty identiteetinhallinta yrityksen identiteettipalvelinten kautta (Microsoft Entra ID, Active Directory)  
- **Verkkosegmentointi**: MCP-komponenttien looginen eristäminen sivuttaisliikkeen rajoittamiseksi  
- **Vähimmän oikeuden periaate**: Minimoi kaikki järjestelmäkomponenttien ja tilien käyttöoikeudet

#### **Turvallisuuden valvonta ja havaitseminen**
- **Kattava lokitus**: Yksityiskohtainen lokitus AI-sovellusten toiminnasta mukaan lukien MCP-asiakas-palvelin-vuorovaikutukset  
- **SIEM-integraatio**: Keskitetty turvallisuustietojen ja tapahtumien hallinta poikkeamien havaitsemiseen  
- **Käyttäytymisanalytiikka**: AI-pohjainen valvonta epätavallisten järjestelmän ja käyttäjän toimintamallien havaitsemiseen  
- **Uhkatiedustelu**: Ulkoisten uhkatietovirtojen ja hyökkäysindikaattorien (IOC) integraatio  
- **Tapahtumien hallinta**: Selkeät prosessit turvallisuustapahtumien tunnistukseen, reagointiin ja palautukseen

#### **Zero Trust -arkkitehtuuri**
- **Älä koskaan luota, varmista aina**: Jatkuva käyttäjien, laitteiden ja verkkoyhteyksien varmennus  
- **Mikrosegmentointi**: Tarkat verkon kontrollit eristämään yksittäiset työkuormat ja palvelut  
- **Identiteettikeskeinen turvallisuus**: Turvallisuuspolitiikat perustuvat varmennettuihin identiteetteihin, ei verkkoalueeseen  
- **Jatkuva riskinarviointi**: Dynaaminen turvallisuusaseman arviointi nykyisen kontekstin ja käyttäytymisen perusteella  
- **Ehdollinen pääsy**: Pääsynhallinta sopeutuu riskitekijöiden, sijainnin ja laitteen luottamuksen mukaan

### Yritystason integraatiomallit

#### **Microsoftin turvallisuus-ekosysteemin integraatio**
- **Microsoft Defender for Cloud**: Kattava pilven turvallisuuden tilanhallinta  
- **Azure Sentinel**: Pilvipohjainen SIEM- ja SOAR-ratkaisut AI-kuormitusten suojaamiseen  
- **Microsoft Entra ID**: Yritystason identiteetin ja pääsynhallinta ehdollisilla käyttöoikeuskäytännöillä  
- **Azure Key Vault**: Keskitetty salausten hallinta laitteistopohjaisten HSM-laitteiden tukemana  
- **Microsoft Purview**: Datan hallinta ja säädöstenmukaisuus AI-datalähteille ja työnkulkuihin

#### **Säädöstenmukaisuus ja hallinto**
- **Sääntelyn noudattaminen**: Varmista, että MCP-toteutukset täyttävät toimialakohtaiset vaatimukset (GDPR, HIPAA, SOC 2)  
- **Dataluokittelu**: Arkaluonteisen tiedon asianmukainen luokittelu ja käsittely AI-järjestelmissä  
- **Auditointijäljet**: Kattava lokitus säädöstenmukaisuuden ja oikeustutkimusten tueksi  
- **Yksityisyyskontrollit**: Yksityisyys suunnittelussa -periaatteiden toteutus AI-järjestelmäarkkitehtuurissa  
- **Muutosten hallinta**: Virallinen prosessi AI-järjestelmän muutosten turvallisuustarkastuksille

Nämä perustavanlaatuiset käytännöt luovat vahvan turvallisuusperustan, joka parantaa MCP-spesifisten turvallisuuskontrollien vaikuttavuutta ja tarjoaa laajan suojan AI-pohjaisille sovelluksille.
## Keskeiset turvallisuusopit

- **Kerrostettu turvallisuuslähestymistapa**: Yhdistä perustason turvallisuuskäytännöt (turvallinen koodaus, vähimmän oikeuden periaate, toimitusketjun varmistaminen, jatkuva valvonta) AI-spesifisten kontrollien kanssa kattavaa suojaa varten

- **AI-spesifinen uhkaympäristö**: MCP-järjestelmät kohtaavat ainutlaatuisia riskejä, kuten kehotteen injektointia, työkalujen myrkyttämistä, istunnon kaappausta, sekavien sijaisongelmia, tunnisteiden ohitusherkkyyksiä ja liiallisia käyttöoikeuksia, jotka vaativat erityisiä lieventämiskeinoja

- **Todennus- ja valtuutusosaaminen**: Ota käyttöön vahva todennus ulkoisten identiteettipalveluntarjoajien (Microsoft Entra ID) avulla, pakota asianmukainen tunnisteen validointi, ja älä koskaan hyväksy tunnisteita, joita ei ole nimenomaisesti annettu MCP-palvelimellesi

- **AI-hyökkäysten ehkäisy**: Käytä Microsoft Prompt Shieldseja ja Azure Content Safetya suojautuaksesi epäsuorilta kehotteen injektoinnin ja työkalujen myrkyttämisen hyökkäyksiltä, validoi työkalujen metadata ja valvo dynaamisia muutoksia

- **Istuntojen ja siirtojen turvallisuus**: Käytä kryptografisesti turvallisia, ei-deterministisiä istunto-ID:itä, jotka on sidottu käyttäjätunnuksiin, toteuta asianmukainen istunnon elinkaaren hallinta, äläkä koskaan käytä istuntoja todennukseen

- **OAuth-turvallisuuden parhaat käytännöt**: Ehkäise sekavien sijaishyökkäysten riski eksplisiittisen käyttäjän suostumuksen kautta dynaamisesti rekisteröidyille asiakkaille, toteuta OAuth 2.1 oikein PKCE:n kanssa ja valvo tarkasti uudelleenohjauksen URI:tä

- **Tunnisteiden turvallisuusperiaatteet**: Vältä tunnisteiden ohitusantipatternit, validoi tunnisteiden vastaanottajakohteet (audience), toteuta lyhytikäisiä tunnisteita turvallisella kierrätyksellä, ja ylläpidä selkeät luottamusrajapinnat

- **Kattava toimitusketjun turvallisuus**: Kohtele kaikkia AI-ekosysteemin komponentteja (mallit, upotukset, kontekstipalvelimet, ulkoiset API:t) samalla tiukkuudella kuin perinteisiä ohjelmistoriippuvuuksia

- **Jatkuva kehittyminen**: Pysy ajan tasalla nopeasti kehittyvistä MCP-määrityksistä, osallistu turvallisuusyhteisön standardeihin ja ylläpidä joustavia turvallisuusasentoja protokollan kypsyessä

- **Microsoftin turvallisuusintegraatio**: Hyödynnä Microsoftin kattavaa turvallisuus-ekosysteemiä (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) tehostamaan MCP-järjestelmäsi suojaa

## Kattavat resurssit

### **Virallinen MCP-turvallisuusdokumentaatio**
- [MCP-määritys (Päivitetty: 25.11.2025)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP-turvallisuuden parhaat käytännöt](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP-valtuutusmääritys](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub-repositorio](https://github.com/modelcontextprotocol)

### **OWASP MCP -turvallisuusresurssit**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kattava OWASP MCP Top 10 -lista Azure-toteutusohjeineen
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Virallinen OWASP MCP-turvallisuusuhkat
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Käytännön turvallisuuskoulutus MCP:lle Azuren päällä

### **Turvallisuusstandardit ja parhaat käytännöt**
- [OAuth 2.0:n turvallisuuden parhaat käytännöt (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web-sovellusturva](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 suurille kielimalleille](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI-tietoturvatutkimus ja analyysi**
- [Kehotteen injektio MCP:ssä (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Työkalujen myrkytyshyökkäykset (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP turvallisuustutkimusraportti (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoftin turvallisuusratkaisut**
- [Microsoft Prompt Shields -dokumentaatio](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety -palvelu](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID:n turvallisuus](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management -parhaat käytännöt](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Toteutusoppaat ja opetusohjelmat**
- [Azure API Management MCP-todennusporttina](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID:n todennus MCP-palvelimille](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Turvallinen tunnisteiden tallennus ja salaus (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps- ja toimitusketjun turvallisuus**
- [Azure DevOpsin turvallisuus](https://azure.microsoft.com/products/devops)
- [Azure Reposin turvallisuus](https://azure.microsoft.com/products/devops/repos/)
- [Microsoftin toimitusketjun turvallisuusmatka](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Lisää turvallisuusdokumentaatiota**

Kattavaa turvallisuusohjeistusta varten tutustu seuraaviin erikoistuneisiin dokumentteihin tässä osiossa:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Täydelliset MCP:n turvallisuuden parhaat käytännöt
- **[Azure Content Safety -toteutus](./azure-content-safety-implementation.md)** - Käytännön toteutusesimerkkejä Azure Content Safety -integraatiosta  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Uusimmat turvallisuuskontrollit ja tekniikat MCP-järjestelmiin
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Nopea viiteopas keskeisiin MCP-turvakäytäntöihin

### **Käytännön turvallisuuskoulutus**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Kattava käytännön työpaja MCP-palvelimien suojaamiseen Azure-ympäristössä, edeten Base Campista Summitiin
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Viitearkkitehtuuri ja toteutusohjeet kaikille OWASP MCP Top 10 -riskeille

---

## Mitä seuraavaksi

Seuraava: [Luku 3: Aloittaminen](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta huomioithan, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäisellä kielellä on virallinen lähde. Tärkeissä asioissa suosittelemme ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä johtuvista väärinkäsityksistä tai virhetulkinnasta.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->