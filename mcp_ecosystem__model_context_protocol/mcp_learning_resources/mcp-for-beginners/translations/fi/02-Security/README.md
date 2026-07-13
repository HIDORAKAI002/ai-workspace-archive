# MCP Security: Kattava suojaus tekoälyjärjestelmille

[![MCP Security Best Practices](../../../translated_images/fi/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Napsauta yllä olevaa kuvaa katsoaksesi videon tästä oppitunnista)_

Turvallisuus on olennainen osa tekoälyjärjestelmien suunnittelua, minkä vuoksi annamme sille korkean prioriteetin toisessa osiossamme. Tämä vastaa Microsoftin **Secure by Design** -periaatetta [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) -ohjelmasta.

Model Context Protocol (MCP) tuo voimakkaita uusia ominaisuuksia tekoälyohjattuihin sovelluksiin samalla kun se asettaa ainutlaatuisia tietoturvahaasteita, jotka ylittävät perinteiset ohjelmistoriskit. MCP-järjestelmät kohtaavat sekä vakiintuneita turvallisuuskysymyksiä (turvallinen koodaus, vähimmän oikeuden periaate, toimitusketjun turvallisuus) että tekoälyyn liittyviä uusia uhkia kuten promptin injektointi, työkalumyrkytys, istunnon kaappaus, confused deputy -hyökkäykset, tokenin läpiviennin haavoittuvuudet ja dynaaminen kyvykkyyksien muokkaus.

Tämä oppitunti tutkii tärkeimpiä tietoturvariskejä MCP-toteutuksissa—käsitellen todennusta, valtuutusta, liiallisia oikeuksia, epäsuoraa promptin injektointia, istuntoturvallisuutta, confused deputy -ongelmia, tokenhallintaa ja toimitusketjun haavoittuvuuksia. Opit käytännön ohjaimia ja parhaita käytäntöjä näiden riskien lieventämiseksi hyödyntäen samalla Microsoftin ratkaisuja, kuten Prompt Shields, Azure Content Safety ja GitHub Advanced Security vahvistaaksesi MCP-käyttöönottoasi.

## Oppimistavoitteet

Oppitunnin lopussa osaat:

- **Tunnistaa MCP-spesifit uhat**: Tunnistaa MCP-järjestelmiin liittyvät ainutlaatuiset tietoturvariskit kuten promptin injektointi, työkalumyrkytys, liialliset oikeudet, istunnon kaappaus, confused deputy -ongelmat, tokenin läpivientihaavoittuvuudet ja toimitusketjun riskit
- **Soveltaa turvaohjaimia**: Toteuttaa tehokkaita lieventäviä toimenpiteitä, kuten vahva todennus, vähimmän oikeuden pääsy, turvallinen tokenhallinta, istuntoturvan kontrollit ja toimitusketjun varmistus
- **Hyödyntää Microsoftin turvaratkaisuja**: Ymmärtää ja ottaa käyttöön Microsoft Prompt Shields, Azure Content Safety ja GitHub Advanced Security MCP-kuorman suojaamiseen
- **Varmistaa työkalujen turvallisuuden**: Tunnistaa työkalujen metatietojen validoinnin merkitys, valvoa dynaamisia muutoksia sekä puolustautua epäsuoria promptin injektiohyökkäyksiä vastaan
- **Integrate Best Practices**: Yhdistää vakiintuneita perusturvakäytäntöjä (turvallinen koodaus, palvelinkovetus, zero trust) MCP-spesifien kontrollien kanssa kattavan suojauksen saavuttamiseksi

# MCP Security Architecture & Controls

Nykyaikaiset MCP-toteutukset vaativat kerroksellisia turvallisuuslähestymistapoja, jotka käsittelevät sekä perinteistä ohjelmistoturvaa että tekoälykohtaisia uhkia. Nopeasti kehittyvä MCP-spesifikaatio kypsyttää jatkuvasti turvakontrollejaan, mahdollistaen paremman integraation yritysturvallisuusarkkitehtuureihin ja vakiintuneisiin parhaisiin käytäntöihin.

[Microsoft Digital Defense Report](https://aka.ms/mddr) -tutkimus osoittaa, että **98 % raportoituja tietomurtoja voitaisiin estää vahvalla turvallisuushygienialla**. Tehokkain suojastrategia yhdistää perusturvakäytännöt MCP-spesifisiin kontrollikäytäntöihin—todistetut perusmittarit pysyvät merkittävimpinä koko tietoturvariskin vähentämisessä.

## Nykyinen tietoturvaympäristö

> **Huom:** Tämä tieto kuvastaa MCP-turvallisuusstandardeja päivämäärällä **5. helmikuuta 2026**, yhteensopien **MCP Specification 2025-11-25** kanssa. MCP-protokolla kehittyy nopeasti, ja tulevat toteutukset voivat tuoda uusia todennusmalleja ja parannettuja kontrollikeinoja. Viittaathan aina ajantasaisiin [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) ja [turvaparamääräysten dokumentaatioihin](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

> **Katse eteenpäin:** `2026-07-28` julkaisuversio vahvistaa valtuutusta edelleen — asiakkaiden tulee validoida `iss` parametri valtuutusvastauksissa (RFC 9207), ilmoittaa OpenID Connect `application_type` Dynamic Client Registrationin aikana ja sitoa rekisteröidyt tunnistetiedot valtuuttavaan palvelimeen. Katso [Mitä MCP:ssä muuttuu: 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) koko lista valtuutuksen SEP-muutoksista.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Käytännön tietoturvakoulutusta varten suosittelemme lämpimästi **MCP Security Summit Workshop** (Sherpa) -kokonaisvaltaista opastettua retkeä MCP-palvelimien suojaamiseksi Microsoft Azuren pilvessä.

### Työpajan yleiskatsaus

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) tarjoaa käytännönläheistä, toteuttamiskelpoista tietoturvakoulutusta kokeillun “haavoittuvuus → hyökkäys → korjaus → validointi” -menetelmän kautta. Opit:

- **Oppia rikkomalla asioita**: Kokea haavoittuvuudet itse hyödyntämällä tahallisesti epävarmoja palvelimia
- **Käyttämään Azure-natiiviturvaa**: Hyödyntämään Azure Entra ID:tä, Key Vaultia, API Managementia ja AI Content Safetyä
- **Puolustautumaan kerrostetusti**: Edetä kurssin leirien läpi rakentamalla kokonaisvaltaisia turvakerroksia
- **Soveltamaan OWASP-standardeja**: Jokainen tekniikka vastaa [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) -ohjeistusta
- **Saamaan tuotantovalmiin koodin**: Saat toimivia ja testattuja toteutuksia mukaasi

### Retken reitti

| Leiri | Keskittymä | Käsitellyt OWASP-riskit |
|-------|------------|-------------------------|
| **Perusleiri** | MCP:n perusteet & todennus-haavoittuvuudet | MCP01, MCP07 |
| **Leiri 1: Identiteetti** | OAuth 2.1, Azure hallittu identiteetti, Key Vault | MCP01, MCP02, MCP07 |
| **Leiri 2: Gateway** | API Management, yksityiset päätepisteet, hallinto | MCP02, MCP06, MCP07, MCP09 |
| **Leiri 3: I/O-turva** | Promptin injektio, PII-suoja, sisällön turvallisuus | MCP03, MCP05, MCP06, MCP10 |
| **Leiri 4: Valvonta** | Lokianalytiikka, kojelaudat, uhkien havaitseminen | MCP04, MCP08 |
| **Kiipeäminen** | Red Team / Blue Team integraatiotesti | Kaikki |

**Aloita tästä**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 turvariskiä

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) kuvaa kymmenen kriittisintä tietoturvariskiä MCP-toteutuksissa:

| Riski | Kuvaus | Azure-lievitys |
|-------|--------|----------------|
| **MCP01** | Tokenien väärä hallinta & salaisuuksien paljastuminen | Azure Key Vault, Managed Identity |
| **MCP02** | Oikeuksien lisääntyminen laajentumisen kautta | RBAC, Conditional Access |
| **MCP03** | Työkalumyrkytys | Työkalujen validointi, eheyden varmennus |
| **MCP04** | Ohjelmiston toimitusketjun hyökkäykset & riippuvuuksien manipulointi | GitHub Advanced Security, riippuvuusskannaus |
| **MCP05** | Komentojen injektio & suoritus | Syötteiden validointi, sandboxing |
| **MCP06** | Tarkoituksen kulun vääristäminen | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Puutteellinen todennus & valtuutus | Azure Entra ID, OAuth 2.1 PKCE:llä |
| **MCP08** | Tarkkailun & telemetrian puute | Azure Monitor, Application Insights |
| **MCP09** | Varjopalvelimet (Shadow MCP Servers) | API Center -hallinta, verkon eristys |
| **MCP10** | Kontekstin injektointi & liiallinen tiedonjako | Datan luokittelu, minimipaljastus |

### MCP-todennuksen kehitys

MCP-spesifikaatio on kehittynyt merkittävästi todennuksen ja valtuutuksen lähestymistavoissa:

- **Alkuperäinen lähestymistapa**: Varhaiset spesifikaatiot vaativat kehittäjiä toteuttamaan omat todennuspalvelimensa, MCP-palvelimien toimiessa OAuth 2.0 -valtuutuspalvelimina, jotka hoitivat käyttäjän todennuksen suoraan
- **Nykyinen standardi (2025-11-25)**: Päivitetty spesifikaatio sallii MCP-palvelimien delegoida todennus ulkopuolisille identiteetin tarjoajille (esim. Microsoft Entra ID), parantaen turvallisuutta ja vähentäen toteutuskompleksisuutta
- **Kuljetuskerroksen turvallisuus**: Parannettu tuki turvallisille siirtomekanismeille asianmukaisine todennusmalleineen niin paikallisille (STDIO) kuin etäyhteyksille (Streamable HTTP)

## Todennus- ja valtuutusturva

### Nykyiset tietoturvahaasteet

Modernit MCP-toteutukset kohtaavat useita todennus- ja valtuutushaasteita:

### Riskit & uhkavektorit

- **Väärin konfiguroitu valtuutuslogiikka**: Virheelliset valtuutusimplementaatiot MCP-palvelimissa voivat paljastaa arkaluontoista tietoa ja soveltaa virheellisesti käyttöoikeuksia
- **OAuth-tokenien kompromissi**: Paikallisen MCP-palvelimen tokenin varastaminen mahdollistaa hyökkääjille servereiden peesailun ja edelleenpalveluiden käytön
- **Tokenin läpivientihaavoittuvuudet**: Virheellinen tokenien käsittely luo tietoturvavalvonnan kiertämisen ja vastuuaukkoja
- **Liialliset oikeudet**: Ylivaltuutetut MCP-palvelimet rikkovat vähimmän oikeuden periaatetta ja laajentavat hyökkäyspintaa

#### Tokenin läpivienti: kriittinen anti-malli

**Tokenin läpivienti on nimenomaisesti kielletty** nykyisessä MCP-valtuutusmäärittelyssä vakavien tietoturvavaikutusten vuoksi:

##### Turvallisuuskontrollien kiertäminen
- MCP-palvelimet ja alemmat API:t toteuttavat kriittisiä turvakontrolleja (kutsujen rajoitus, pyyntövalidointi, liikenteen seuranta), jotka edellyttävät tokenin asianmukaista validointia
- Asiakas-suora-API-tokenin käyttö kiertää nämä olennaiset suojat, heikentäen turva-arkkitehtuuria

##### Vastuu ja tarkastusongelmat
- MCP-palvelimet eivät pysty erottelemaan asiakkaita, jotka käyttävät ylävirran myöntämiä tokeneita, katkaisten tarkastusketjut
- Alempien resurssipalvelinten lokit näyttävät harhaanjohtavia pyyntöjen alkuperäisiä MCP-palvelinten välittäjiä sijaan
- Tapahtumatutkinnat ja säädöstenmukaisuustarkastukset vaikeutuvat merkittävästi

##### Tiedon vuotovaara
- Vahvistamattomat token-väitteet antavat tunkeilijoille mahdollisuuden käyttää varastettuja tokeneita MCP-palvelimien välityspisteinä tiedon vuotamiseen
- Luottamuksen rajojen rikkomukset sallivat valtuuttamattoman pääsyn suunniteltujen turvatoimien ohi

##### Monipalveluhyökkäysvektorit
- Hyväksytyt kompromettoidut tokenit mahdollistavat sivuttaissiirtymisen palvelimien välillä
- Luottamuspalveluiden väliset oletukset voivat rikkoutua, kun tokenin alkuperää ei voida tarkistaa

### Turvatoimet & lievennykset

**Kriittiset tietoturvavaatimukset:**

> **PAKOLLINEN**: MCP-palvelimet **EIVÄT SAA** hyväksyä mitään tokeneita, joita ei ole nimenomaisesti myönnetty kyseiselle MCP-palvelimelle

#### Todennus- ja valtuutuskontrollit

- **Tiukka valtuutuksen tarkastus**: Suorita kattavat auditoinnit MCP-palvelinten valtuutuslogiikasta varmistaaksesi, että vain tarkoitetut käyttäjät ja asiakkaat pääsevät arkaluontoisiin resursseihin
  - **Toteutusopas**: [Azure API Management todennusporttina MCP-palvelimille](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identiteetin integrointi**: [Microsoft Entra ID:n käyttö MCP-palvelimen todennuksessa](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Turvallinen tokenhallinta**: Toteuta [Microsoftin tokenvalidoinnin ja elinkaaren parhaat käytännöt](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Varmista, että tokenin audience-väitteet vastaavat MCP-palvelimen identiteettiä
  - Toteuta asianmukainen tokenin kierto ja vanhentumiskäytännöt
  - Estä tokenien uudelleenkäyttöhyökkäykset ja luvaton käyttö

- **Suoja varastointi tokenille**: Salattu tokenien tallennus sekä levossa että siirron aikana
  - **Parhaat käytännöt**: [Turvallinen tokenien tallennus ja salausohjeistus](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Pääsynhallinnan toteutus

- **Vähimmän oikeuden periaate**: Myönnä MCP-palvelimille ainoastaan ne vähimmäisoikeudet, joita tarvitaan tarkoituksenmukaiseen toimintaan
  - Säännölliset oikeuksien tarkastukset ja päivitykset oikeuksien laajenemisen ehkäisemiseksi
  - **Microsoftin dokumentaatio**: [Turvallinen vähimmän oikeuden käyttö](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Roolipohjainen pääsynhallinta (RBAC)**: Toteuta tarkoin rajatut roolijako-oikeudet
  - Rajaa roolit tarkasti tiettyihin resursseihin ja toimintoihin
  - Vältä laajoja tai tarpeettomia oikeuksia, jotka laajentavat hyökkäyspintaa

- **Jatkuva oikeuksien seuranta**: Toteuta jatkuva käyttöoikeuksien auditointi ja valvonta
  - Valvo oikeuksien käyttöä poikkeavuuksien varalta
  - Korjaa nopeasti liialliset tai käyttämättömät oikeudet

## Tekoälyspesifit tietoturvauhat

### Prompt Injection & työkalujen manipulointihyökkäykset

Nykyaikaiset MCP-toteutukset kohtaavat kehittyneitä tekoälykohtaisia hyökkäysvektoreita, joihin perinteiset turvatoimet eivät täysin pysty vastaamaan:

#### **Epäsuora prompt-injektio (Cross-Domain Prompt Injection)**

**Epäsuora prompt-injektio** on yksi kriittisimmistä haavoittuvuuksista MCP-kykyisissä tekoälyjärjestelmissä. Hyökkääjät upottavat haitallisia ohjeita ulkoiseen sisältöön—asiakirjoihin, verkkosivuihin, sähköposteihin tai datalähteisiin—jotka tekoälyjärjestelmät sitten käsittelevät laillisina käskyinä.

**Hyökkäysskenaariot:**
- **Asiakirjapohjainen injektio**: Haitallisia ohjeita piilotettuna käsiteltäviin asiakirjoihin, jotka laukaisevat ei-toivottuja tekoälytoimia
- **Verkkosisällön hyväksikäyttö**: Haitalle muuttuneet verkkosivut upotettuine promptteineen, jotka manipuloivat tekoälyn käyttäytymistä indeksoinnin aikana
- **Sähköpostipohjaiset hyökkäykset**: Haitalliset promptit sähköposteissa, jotka saavat tekoälyavustajat vuotamaan tietoja tai suorittamaan valtuuttamattomia toimia
- **Datalähde-sairastuttaminen**: Hyväksikäytetyt tietokannat tai API:t tarjoavat saastunutta sisältöä tekoälyjärjestelmille

**Todellinen vaikutus**: Nämä hyökkäykset voivat johtaa tiedon vuotoon, yksityisyydensuojaan kohdistuviin rikkomuksiin, haitallisen sisällön synnyttämiseen ja käyttäjävuorovaikutusten manipulointiin. Tarkempaan analyysiin: [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/fi/prompt-injection.ed9fbfde297ca877.webp)

#### **Työkalumyrkytyshyökkäykset**

**Työkalumyrkytys** kohdistuu MCP-työkalujen metatietoihin, joita LLM:t tulkitsevat tehdäksensä suorituspäätöksiä.

**Hyökkäysmekanismit:**
- **Metatietojen manipulointi**: Hyökkääjät injektoivat haitallisia ohjeita työkalun kuvauksiin, parametrien määritelmiin tai käyttöesimerkkeihin
- **Näkymättömät ohjeet**: Piilotetut promptit työkalun metatiedoissa, joita tekoälymallit käsittelevät mutta ihmiskäyttäjiltä piilossa
- **Dynaaminen työkalun muokkaus ("Rug Pulls")**: Käyttäjien hyväksymät työkalut muutetaan myöhemmin suorittamaan haitallisia toimia ilman käyttäjän tietämystä
- **Parametrien injektointi**: Haitallinen sisältö upotettuna työkalun parametrien skeemoihin, jotka vaikuttavat mallin toimintaan
**Isännöidyt palvelinriskit**: Etä-MCP-palvelimet aiheuttavat suurentuneita riskejä, koska työkalumäärittelyjä voidaan päivittää käyttäjän alkuperäisen hyväksynnän jälkeen, mikä luo tilanteita, joissa aiemmin turvalliset työkalut muuttuvat haitallisiksi. Laajempaan analyysiin tutustu [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/fi/tool-injection.3b0b4a6b24de6bef.webp)

#### **Lisää AI-hyökkäysvektoreita**

- **Ristiinverkkoinen syöte-injektio (XPIA)**: Kehittyneet hyökkäykset, jotka hyödyntävät sisältöä useilta alueilta ohittaakseen turvallisuusvalvontaa  
- **Dynaaminen kyvykkyyden muokkaus**: Työkalujen kyvykkyyksien reaaliaikaiset muutokset, jotka kiertävät alkuperäiset turvallisuusarviot  
- **Kontekstin ikkunan myrkytys**: Hyökkäykset, jotka manipuloivat suuria konteksti-ikkunoita piilottaakseen haitalliset ohjeet  
- **Mallin sekoitushyökkäykset**: Mallin rajoitusten hyväksikäyttö ennalta arvaamattomien tai turvattomien käytösten luomiseksi  


### AI:n turvallisuusriskien vaikutukset

**Suuret vaikutukset:**
- **Tietovuodot**: Luvaton pääsy ja arkaluontoisen yritys- tai henkilötiedon varastaminen  
- **Yksityisyyden loukkaukset**: Henkilökohtaisesti tunnistettavan tiedon (PII) ja luottamuksellisen liiketoimintatiedon paljastuminen  
- **Järjestelmän manipulointi**: Tahattomat muutokset kriittisissä järjestelmissä ja työnkuluissa  
- **Tunnistetietojen varkaus**: Todentamistunnusten ja palvelutunnusten vaarantuminen  
- **Sivuttaisliikkuminen**: Vahingoittuneiden AI-järjestelmien käyttö laajempien verkko-hyökkäysten tukikohtina  

### Microsoftin AI-turvaratkaisut

#### **AI Prompt Shields: Edistynyt suojaus injektiohyökkäyksiä vastaan**

Microsoftin **AI Prompt Shields** tarjoavat kokonaisvaltaisen suojan sekä suoria että epäsuoria prompt-injektiohyökkäyksiä vastaan monikerroksisen turvallisuuden avulla:

##### **Keskeiset suojausmekanismit:**

1. **Edistynyt havaitseminen ja suodatus**  
   - Koneoppimisalgoritmit ja NLP-tekniikat tunnistavat haitalliset ohjeet ulkoisessa sisällössä  
   - Reaaliaikainen analyysi dokumenteista, verkkosivuista, sähköposteista ja tietolähteistä upotettujen uhkien varalta  
   - Kontekstuaalinen ymmärrys laillisista vs. haitallisista prompt-kuvioista  

2. **Valaisevat tekniikat**  
   - Erottele luotetut järjestelmäohjeet mahdollisesti vaarantuneista ulkoisista syötteistä  
   - Tekstinmuunnosmenetelmät, jotka parantavat mallin olennaisuutta samalla eristämällä haitallisen sisällön  
   - Auttaa AI-järjestelmiä ylläpitämään asianmukaista ohjeiden hierarkiaa ja ohittamaan injektoidut komennot  

3. **Erotin- ja datamerkintäjärjestelmät**  
   - Selkeä rajaus luotettujen järjestelmäviestien ja ulkoisten syötteiden välillä  
   - Erityiset merkkaukset korostavat rajoja luotettujen ja epäluotettujen tietolähteiden välillä  
   - Selkeä erottelu estää ohjeiden sekaantumisen ja luvattoman käskyjen suorittamisen  

4. **Jatkuva uhkatiedustelu**  
   - Microsoft valvoo jatkuvasti nousevia hyökkäysmalleja ja päivittää puolustuksia  
   - Proaktiivinen uhkien metsästys uusille injektiotekniikoille ja hyökkäysvektoreille  
   - Säännölliset turvallisuusmallipäivitykset säilyttävät tehokkuuden muuttuvia uhkia vastaan  

5. **Azure Content Safety -integraatio**  
   - Osa kattavaa Azure AI Content Safety -kokonaisuutta  
   - Lisähavainnointia jailbreak-yrityksille, haitalliselle sisällölle ja turvallisuuspolitiikan rikkomuksille  
   - Yhtenäiset turvallisuusvalvonnat AI-sovelluksen komponenteissa  

**Toteutusresurssit**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/fi/prompt-shield.ff5b95be76e9c78c.webp)


## Kehittyneet MCP:n turvallisuusuhkat

### Istunnon kaappaushaavoittuvuudet

**Istunnon kaappaus** on kriittinen hyökkäysvektori tilallisia MCP-toteutuksia vastaan, joissa luvattomat osapuolet saavat haltuunsa ja väärinkäyttävät laillisia istunnon tunnisteita asiakkaiden jäljittelemiseksi ja luvattomien toimien suorittamiseksi.

#### **Hyökkäysskenaariot ja riskit**

- **Istunnon kaappaus -prompt-injektio**: Hyökkääjät, joilla on varastettuja istunnon tunnuksia, syöttävät haitallisia tapahtumia palvelimille, jotka jakavat istuntotilan, mahdollisesti laukaisten haitallisia toimintoja tai pääsyn arkaluontoisiin tietoihin  
- **Suora jäljittely**: Varastetut istuntotunnukset mahdollistavat suorat MCP-palvelinkutsut, jotka ohittavat todennuksen ja kohtelevat hyökkääjiä laillisina käyttäjinä  
- **Vaurioituneet jatkettavat virrat**: Hyökkääjät voivat keskeyttää pyynnöt ennenaikaisesti, aiheuttaen laillisten asiakkaiden jatkavan potentiaalisesti haitallisella sisällöllä  

#### **Turvatoimet istuntojen hallintaan**

**Keskeiset vaatimukset:**
- **Valtuutuksen varmennus**: MCP-palvelimien, jotka toteuttavat valtuutuksen, **TÄYTYY** tarkistaa KAIKKI saapuvat pyynnöt eikä niiden **TULISI** käyttää istuntoja todennukseen  
- **Turvallinen istunnon generointi**: Käytä kryptografisesti turvallisia, ei-deterministisiä istuntotunnuksia, jotka on luotu turvallisilla satunnaislukugeneraattoreilla  
- **Käyttäjäkohtainen sidonta**: Sito istuntotunnukset käyttäjäkohtaisiin tietoihin esimerkiksi muodossa `<user_id>:<session_id>` estääksesi istuntojen väärinkäytön eri käyttäjien välillä  
- **Istunnon elinkaaren hallinta**: Toteuta asianmukainen vanhentuminen, kierto ja mitätöinti rajoittaaksesi haavoittuvuusikkunoita  
- **Siirtoturvallisuus**: HTTPS on pakollinen kaikessa tiedonsiirrossa estämään istuntotunnusten sieppaus  

### Sekava apulainen -ongelma

**Sekava apulainen** syntyy, kun MCP-palvelimet toimivat todennusvälityspalvelimina asiakkaiden ja kolmannen osapuolen palveluiden välillä, mikä luo mahdollisuuksia valtuutuksen ohituksen hyväksikäyttöön staattisten asiakastunnusten avulla.

#### **Hyökkäysmekaniikka ja riskit**

- **Evästeisiin perustuva suostumuksen ohitus**: Aiempi käyttäjän todennus luo suostumusevästeitä, joita hyökkääjät hyödyntävät haitallisilla valtuutuspyynnöillä ja muokatuilla uudelleenohjaus-URI:lla  
- **Valtuutuskoodin varkaus**: Olevat suostumusevästeet voivat saada valtuutuspalvelimet ohittamaan suostumusnäytöt ja ohjaamaan koodit hyökkääjän hallitsemille pisteille  
- **Luvaton API-pääsy**: Varastetut valtuutuskoodit mahdollistavat tokenin vaihdon ja käyttäjien jäljittelyn ilman nimenomaista hyväksyntää  

#### **Vaikutuskeinot**

**Pakolliset hallintatoimet:**
- **Nimenomaiset suostumusvaatimukset**: MCP-proxypalvelimien, jotka käyttävät staattisia asiakastunnuksia, **TÄYTYY** hankkia käyttäjän suostumus jokaiselta dynaamisesti rekisteröidyltä asiakkaalta  
- **OAuth 2.1:n turvallisuuskäytäntöjen noudattaminen**: Noudata nykyisiä OAuth-turvaperiaatteita, mukaan lukien PKCE (Proof Key for Code Exchange) kaikissa valtuutuspyynnöissä  
- **Tiukka asiakastunnistus**: Toteuta jämerä uudelleenohjaus-URI:en ja asiakastunnisteiden validointi estääksesi hyväksikäytön  

### Tokenien läpivienti -haavoittuvuudet  

**Tokenien läpivienti** on suora anti-malli, jossa MCP-palvelimet hyväksyvät asiakastokenit ilman asianmukaista validointia ja välittävät ne API-rajapintoihin, mikä rikkoo MCP:n valtuutusmäärityksiä.

#### **Turvallisuusvaikutukset**

- **Ohitettu valvonta**: Suora asiakas-API-tokenin käyttö kiertää keskeiset nopeusrajoitukset, validoinnit ja valvonnan  
- **Tarkastuspolun eheys rikkoutuu**: Ylävirran myöntämät tokenit estävät asiakkaiden tunnistamisen ja vaikeuttavat tapahtumien tutkimista  
- **Välityspalvelimen kautta tapahtuva tiedonvuoto**: Vahvistamattomat tokenit mahdollistavat haitallisten tahojen käyttävän palvelimia väärin luvattomaan tietojen saantiin  
- **Luottamusrajapinnan rikkominen**: Alavirran palveluiden luottamus oviin voi rikkoutua, kun tokenin alkuperää ei voida varmistaa  
- **Monipalveluhyökkäysten laajentuminen**: Hyväksytyt vahingoittuneet tokenit mahdollistavat sivuttaisliikkumisen useiden palveluiden välillä  

#### **Vaadittavat turvatoimet**

**Kiistattomat vaatimukset:**
- **Tokenien validointi**: MCP-palvelimet **EIVÄT SAA** hyväksyä tokenia, jota ei ole nimenomaisesti myönnetty MCP-palvelimelle  
- **Kohdeyleisön varmistus**: Tarkista aina, että tokenin kohdeyleisövaatimus vastaa MCP-palvelimen tunnistetta  
- **Asianmukainen tokenin elinkaari**: Käytä lyhytikäisiä käyttöoikeustokenia, joissa on turvallinen kiertokäytäntö  


## AI-järjestelmien toimitusketjun turvallisuus

Toimitusketjun turvallisuus on laajentunut perinteisistä ohjelmistoriippuvuuksista kattaa koko AI-ekosysteemi. Nykyiset MCP-toteutukset on tarkasti tarkistettava ja valvottava kaikissa AI-komponenteissa, koska jokainen niistä tuo mahdollisia haavoittuvuuksia, jotka voivat vaarantaa järjestelmän eheyden.

### Laajennetut AI-toimitusketjun komponentit

**Perinteiset ohjelmistoriippuvuudet:**
- Avoimen lähdekoodin kirjastot ja kehykset  
- Säilökuvat ja perusjärjestelmät  
- Kehitystyökalut ja build-putket  
- Infrastruktuurikomponentit ja palvelut  

**AI-spesifiset toimitusketjun osat:**
- **Perusmallit**: Eri tarjoajien esikoulutetut mallit, joiden alkuperä on varmistettava  
- **Upotepalvelut**: Ulkoiset vektorisaatio- ja semanttisen haun palvelut  
- **Kontekstin tarjoajat**: Tietolähteet, tietopohjat ja dokumenttikokoelmat  
- **Kolmannen osapuolen API:t**: Ulkoiset AI-palvelut, ML-putket ja datankäsittelypisteet  
- **Malliarkistot**: Painot, konfiguraatiot ja hienosäädetyt mallivariantit  
- **Koulutusdatat**: Mallien koulutukseen ja hienosäätöön käytetyt aineistot  

### Kattava toimitusketjun turvallisuusstrategia

#### **Komponenttien varmennus ja luottamus**
- **Alkuperän validointi**: Tarkista kaikkien AI-komponenttien alkuperä, lisensointi ja eheys ennen integrointia  
- **Turvallisuusarviointi**: Suorita haavoittuvuusskannaukset ja turvallisuustarkastukset malleille, tietolähteille ja AI-palveluille  
- **Maineanalyysi**: Arvioi AI-palvelutarjoajien turvallisuusrekisteri ja käytännöt  
- **Säädösten noudattaminen**: Varmista, että kaikilla osilla on organisaation turvallisuus- ja sääntelyvaatimusten mukaisuus  

#### **Turvalliset käyttöönotto-putket**  
- **Automaattinen CI/CD-turvallisuus**: Integroi turvallisuustarkastukset automatisoituihin käyttöönottoputkiin  
- **Artefaktien eheys**: Käytä kryptografista varmennusta kaikille käyttöönottokohteille (koodi, mallit, asetukset)  
- **Vaiheittainen käyttöönotto**: Hyödynnä asteittaista käyttöönottoa turvatarkastuksilla jokaisessa vaiheessa  
- **Luotetut artefaktivarastot**: Ota käyttöön vain varmennetuista, turvallisista varastoista  

#### **Jatkuva valvonta ja reagointi**
- **Riippuvuusskannaus**: Jatkuva haavoittuvuusmonitorointi kaikille ohjelmisto- ja AI-riippuvuuksille  
- **Mallien seuranta**: Mallin käytöksen, suorituskyvyn heikkenemisen ja tietoturvahäiriöiden jatkuva arviointi  
- **Palveluiden terveydentilan seuranta**: Ulkoisten AI-palveluiden käytettävyys, turvallisuuspoikkeamat ja politiikkamuutokset  
- **Uhkatiedustelun integrointi**: AI- ja ML-turvariskeihin liittyvien uhkasyötteiden hyödyntäminen  

#### **Pääsynhallinta ja pienimmän etuoikeuden periaate**
- **Komponenttikohtaiset käyttöoikeudet**: Rajoita pääsy malleihin, dataan ja palveluihin liiketoiminnallisen tarpeen mukaan  
- **Palvelutilien hallinta**: Käytä erillisiä palvelutilejä, joilla on vain tarvittavat vähimmäisoikeudet  
- **Verkkosegmentointi**: Erota AI-komponentit ja rajoita verkkoyhteydet palveluiden välillä  
- **API-portaalin hallinta**: Käytä keskitettyjä API-portaaleita hallinnoimaan ja valvomaan pääsyä ulkoisiin AI-palveluihin  

#### **Tapahtumien hallinta ja palautuminen**
- **Nopeat reagointiprosessit**: Määritellyt menettelyt kompromettoitujen AI-komponenttien korjaamiseen tai vaihtamiseen  
- **Tunnistetietojen kierto**: Automaattiset järjestelmät salaisuuksien, API-avainten ja palvelutietojen kiertoon  
- **Palautusmahdollisuudet**: Kyky nopeasti palauttaa aiemmat toimivat AI-komponenttiversiot  
- **Toimitusketjun rikkomusten hallinta**: Erityismenettelyt ylävirran AI-palvelujen kompromissitilanteisiin  

### Microsoftin turvallisuustyökalut ja integrointi

**GitHub Advanced Security** tarjoaa kattavan toimitusketjusten suojauksen sisältäen:  
- **Salaisuuksien skannaus**: Automaattinen tunnistus tunnuksista, API-avaimista ja tokeneista varastoissa  
- **Riippuvuusskannaus**: Haavoittuvuuksien arviointi avoimen lähdekoodin riippuvuuksille ja kirjastoille  
- **CodeQL-analyysi**: Staattinen koodianalyysi turvallisuus- ja koodausvirheiden löytämiseksi  
- **Toimitusketjun näkemys**: Näkyvyys riippuvuuksien terveydestä ja turvallisuustilasta  

**Azure DevOps & Azure Repos -integraatio:**  
- Saumaton turvallisuusskannausten integrointi Microsoftin kehitysalustoilla  
- Automaattiset turvallisuustarkastukset Azure Pipelinesissa AI-kuormille  
- Politiikkojen noudattaminen turvallisessa AI-komponenttien käyttöönotossa  

**Microsoftin sisäiset käytännöt:**  
Microsoft toteuttaa laajoja toimitusketjun turvallisuuskäytäntöjä kaikissa tuotteissaan. Tutustu toimiviksi todettuihin menetelmiin [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Perustason turvallisuuskäytännöt

MCP-toteutukset perivät ja rakentavat organisaation nykyisten turvallisuuskäytäntöjen päälle. Perustason turvallisuuden vahvistaminen parantaa merkittävästi AI-järjestelmien ja MCP-järjestelmien kokonaisturvallisuutta.

### Keskeiset turvallisuuden perusteet

#### **Turvalliset kehityskäytännöt**
- **OWASP-yhteensopivuus**: Suojaa [OWASP Top 10](https://owasp.org/www-project-top-ten/) -verkkosovellushaavoittuvuuksilta  
- **AI-spesifiset suojausmenetelmät**: Toteuta suojaus [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) mukaisesti  
- **Turvallinen salaisuuksien hallinta**: Käytä tarkoitukseen varattuja säilöjä tokenien, API-avainten ja arkaluontoisen konfiguraatiodatan hallintaan  
- **Loppukäyttäjän salaaminen**: Toteuta turvalliset yhteydet ja tiedonsiirrot kaikissa sovelluskomponenteissa ja datavirroissa  
- **Syötteen validointi**: Huolellinen kaikkien käyttäjäsyötteiden, API-parametrien ja tietolähteiden tarkastus  

#### **Infrastruktuurin koventaminen**
- **Monivaiheinen tunnistus**: Pakollinen MFA kaikille hallinnollisille ja palvelutilille  
- **Korjausten hallinta**: Automaattinen ja oikea-aikainen korjaaminen käyttöjärjestelmille, kehyksille ja riippuvuuksille  
- **Identiteettipalveluiden integrointi**: Keskitetty identiteetinhallinta yrityksen identiteettipalveluiden (Microsoft Entra ID, Active Directory) avulla  
- **Verkkosegmentointi**: MCP-komponenttien looginen eristys sivuttaisliikkumisen estämiseksi  
- **Pienimmän etuoikeuden periaate**: Vähimmäisoikeudet kaikkiin järjestelmän komponentteihin ja tileihin  

#### **Turvallisuuden valvonta ja havaitseminen**
- **Laaja lokitus**: Yksityiskohtainen AI-sovelluksen tapahtumalokitus, mukaan lukien MCP-asiakas-palvelin -vuorovaikutus  
- **SIEM-integraatio**: Keskitetty turvallisuustiedon ja tapahtumien hallinta poikkeamien havaitsemiseksi  
- **Käyttäytymisanalytiikka**: AI-pohjainen valvonta epätavallisten järjestelmä- ja käyttäjäkäyttäytymismallien tunnistamiseksi  
- **Uhkatiedustelu**: Ulkoisten uhkasyytesyötteiden ja hyökkäystunnisteiden integrointi  
- **Tapahtumien hallinta**: Selkeät menettelyt turvallisuuspoikkeamien havaitsemiselle, reagoinnille ja toipumiselle  

#### **Zero Trust -arkkitehtuuri**
- **Älä koskaan luota, tarkista aina**: Käyttäjien, laitteiden ja verkon jatkuva varmistaminen  
- **Mikrosegmentointi**: Tarkat verkkokontrollit eristämään yksittäiset työkuormat ja palvelut  
- **Identiteettikeskeinen turvallisuus**: Turvapolitiikat perustuvat varmistettuihin identiteetteihin verkon sijaan  
- **Jatkuva riskinarviointi**: Dynaaminen turvallisuuspostuurin arviointi nykyisen kontekstin ja käyttäytymisen perusteella  
- **Ehdollinen pääsy**: Pääsynvalvonta mukautuu riskitekijöiden, sijainnin ja laitteen luotettavuuden mukaan  

### Yritysintegratiiviset mallit

#### **Microsoftin tietoturvaekosysteemin integrointi**
- **Microsoft Defender for Cloud**: Kattava pilven turvallisuuspostuurinhallinta  
- **Azure Sentinel**: Pilvipohjainen SIEM- ja SOAR-kyvykkyys AI-kuormien suojaamiseen  
- **Microsoft Entra ID**: Yritystason identiteetin ja pääsynhallinta ehdollisilla pääsynvalvontapolitiikoilla  
- **Azure Key Vault**: Keskitetty salaisuuksien hallinta laitteistopohjaisen turvallisuusmoduulin (HSM) tuella  
- **Microsoft Purview**: Datanhallinta ja noudattamisen valvonta AI-datatietolähteille ja työnkuluihin  

#### **Säädösten mukaisuus ja hallinta**
- **Sääntelyn noudattaminen**: Varmista, että MCP-toteutukset täyttävät toimialakohtaiset säädösvaatimukset (GDPR, HIPAA, SOC 2)
- **Tietojen luokittelu**: Herkkien tietojen asianmukainen luokittelu ja käsittely tekoälyjärjestelmissä
- **Tarkastusketjut**: Laaja lokitus sääntelyn noudattamisen ja oikeusjäljityksen tueksi
- **Tietosuojakontrollit**: Tietosuoja suunnittelun lähtökohtana tekoälyjärjestelmän arkkitehtuurissa
- **Muutoshallinta**: Viralliset prosessit tekoälyjärjestelmän muutosten turvallisuusarvioinneille

Nämä perustavaa laatua olevat käytännöt luovat vankan turvallisuuden perustan, joka parantaa MCP-kohtaisten turvallisuuskontrollien tehokkuutta ja tarjoaa kattavan suojan tekoälyä hyödyntäville sovelluksille.

## Keskeiset turvallisuuspäätelmät

- **Kerrostettu turvallisuuslähestymistapa**: Yhdistä perusturvakäytännöt (turvallinen koodaus, vähimmät oikeudet, toimitusketjun varmistus, jatkuva valvonta) tekoälykohtaisiin kontrollimenetelmiin kokonaisvaltaisen suojan varmistamiseksi

- **Tekoälykohtainen uhkakenttä**: MCP-järjestelmä kohtaa ainutlaatuisia riskejä, kuten kehotteen injektointi, työkalumyynnitys, istunnon kaappaus, sekaantuneen edustajan ongelmat, tokenien ohitusaukot ja liialliset oikeudet, jotka vaativat erityisiä lievennystoimia

- **Todennus ja valtuutus huippuluokkaa**: Ota käyttöön vahva todennus ulkoisten identiteettipalveluiden (Microsoft Entra ID) kautta, pakota asianmukainen tokenin validointi ja älä koskaan hyväksy tokeneita, joita ei ole nimenomaisesti myönnetty MCP-palvelimellesi

- **Tekoälyhyökkäysten ehkäisy**: Hyödynnä Microsoft Prompt Shields- ja Azure Content Safety -palveluita epäsuorien kehotteen injektointi- ja työkalumyynnityshyökkäysten torjunnassa, samalla kun validoit työkalujen metatiedot ja valvot dynaamisia muutoksia

- **Istuntojen ja tiedonsiirron turvallisuus**: Käytä kryptografisesti turvallisia, ei-deterministisiä istuntotunnuksia, jotka sidotaan käyttäjäidentiteetteihin, toteuta asianmukainen istunnon elinkaaren hallinta eikä käytä istuntoja todennukseen

- **OAuthin turvallisuusparhaat käytännöt**: Estä sekaantuneen edustajan hyökkäykset eksplisiittisellä käyttäjän suostumuksella dynaamisesti rekisteröidyille asiakkaille, varmista oikea OAuth 2.1 -toteutus PKCE:llä ja tiukka uudelleenohjaus-URI:n validointi

- **Tokenien turvallisuusperiaatteet**: Vältä tokenien ohitusantipattereita, validoi tokenien kohdevaatimukset, toteuta lyhytikäiset tokenit turvallisen kierron kanssa ja ylläpidä selkeät luottamusrajat

- **Kattava toimitusketjun turvallisuus**: Käsittele kaikki tekoälyekosysteemin osat (mallit, upotukset, kontekstipalvelut, ulkoiset API:t) samalla turvallisuuskuriudella kuin perinteiset ohjelmistoriippuvuudet

- **Jatkuva kehittyminen**: Pysy ajan tasalla nopeasti kehittyvistä MCP-määrityksistä, osallistu turvallisuusyhteisön standardien kehittämiseen ja ylläpidä sopeutuvaa turvallisuusasennetta protokollan muuttuessa

- **Microsoftin turvallisuusintegraatio**: Hyödynnä Microsoftin kattavaa turvallisuus-ekosysteemiä (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) MCP-järjestelmän suojausten vahvistamiseen

## Kattavat resurssit

### **Virallinen MCP-turvallisuusdokumentaatio**
- [MCP-määritys (nykyinen: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP-turvallisuuden parhaat käytännöt](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP-valtuutusmäärittely](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub-repositorio](https://github.com/modelcontextprotocol)

### **OWASP MCP-turvallisuusresurssit**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kattava OWASP MCP Top 10 -kartoitus Azure-toteutusohjeilla
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Viralliset OWASP MCP-suojaukselliset riskit
- [MCP Security Summit -työpaja (Sherpa)](https://azure-samples.github.io/sherpa/) - Käytännön turvallisuuskoulutus MCP:lle Azure-ympäristössä

### **Turvallisuusstandardit ja parhaat käytännöt**
- [OAuth 2.0 -turvallisuuden parhaat käytännöt (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 -verkkosovellusten turvallisuus](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 suurille kielimalleille](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Tekoälyturvallisuuden tutkimus ja analyysi**
- [Kehotteen injektointi MCP:ssä (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Työkalumyynnityshyökkäykset (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP-turvallisuustutkimuksen tiedotteet (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoftin turvallisuusratkaisut**
- [Microsoft Prompt Shields -dokumentaatio](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety -palvelu](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID:n turvallisuus](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure-tokenhallinnan parhaat käytännöt](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Toteutusoppaat ja tutoriaalit**
- [Azure API Management MCP-todennusporttina](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID -todennus MCP-palvelimille](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Turvallinen token-tallennus ja salaus (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps ja toimitusketjun turvallisuus**
- [Azure DevOpsin turvallisuus](https://azure.microsoft.com/products/devops)
- [Azure Reposin turvallisuus](https://azure.microsoft.com/products/devops/repos/)
- [Microsoftin toimitusketjun turvallisuusmatka](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Lisäturvallisuusdokumentaatio**

Lisäturvallisuusohjeita saat näistä erikoistuneista dokumenteista tässä osiossa:

- **[MCP:n parhaat turvallisuuskäytännöt 2025](./mcp-security-best-practices-2025.md)** - Täydelliset MCP:n toteutuskohtaiset turvallisuussuositukset
- **[Azure Content Safety -toteutus](./azure-content-safety-implementation.md)** - Käytännön esimerkkejä Azure Content Safetyn integrointiin  
- **[MCP-turvakontrollit 2025](./mcp-security-controls-2025.md)** - Viimeisimmät MCP-turvakontrollit ja menetelmät
- **[MCP:n parhaat käytännöt pikaopas](./mcp-best-practices.md)** - Tiivis opas keskeisiin MCP-turvallisuuskäytäntöihin
- **[BlueHat 2026: Tekoälyn tulevaisuuden suojaaminen – MCP:n syväpuolustuksen mallit](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Syväpuolustuksen mallit Microsoft Security Response Centeriltä (MSRC)

### **Käytännön turvallisuuskoulutukset**

- **[MCP Security Summit -työpaja (Sherpa)](https://azure-samples.github.io/sherpa/)** - Laaja käytännön työpaja MCP-palvelinten suojaamiseksi Azurella, progressiiviset leirit Base Campista Summitille
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Viitearkkitehtuuri ja toteutusohjeet OWASP MCP Top 10:n kaikkiin riskeihin

---

## Mitä seuraavaksi

Seuraava: [Luku 3: Aloittaminen](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->