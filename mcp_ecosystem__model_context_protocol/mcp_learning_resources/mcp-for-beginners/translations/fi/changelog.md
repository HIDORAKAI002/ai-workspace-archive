# Muutokset: MCP aloittelijoille -oppimäärä

Tämä asiakirja toimii tallenteena kaikista merkittävistä muutoksista, joita on tehty Model Context Protocol (MCP) aloittelijoille -oppimäärään. Muutokset on dokumentoitu käänteisessä kronologisessa järjestyksessä (uusimmat muutokset ensin).

## 5. helmikuuta 2026

### Koko arkiston validointi- ja navigointiparannukset

#### Uutta oppimateriaalisisältöä lisätty

**Moduuli 03 - Aloittaminen**
- **12-mcp-hosts/README.md**: Uusi kattava opas MCP-hostien pystyttämiseen  
  - Claude Desktopin, VS Coden, Cursorin, Clinen, Windsurfin konfiguraatioesimerkkejä  
  - JSON-konfiguraatiopohjat kaikille pääisännille  
  - Kuljetustyyppien vertailutaulukko (stdio, SSE/HTTP, WebSocket)  
  - Yleisten yhteysongelmien vianmääritys  
  - Turvallisuus parhaiden käytäntöjen mukaisesti hostin konfiguroinnissa  

- **13-mcp-inspector/README.md**: Uusi virheenkorjausopas MCP Inspectorille  
  - Asennustavat (npx, npm globaali, lähdekoodi)  
  - Yhteyden muodostus palvelimiin stdio- ja HTTP/SSE-yhteyksin  
  - Testausvälineet, resurssit ja kehotteiden työnkulut  
  - VS Code -integraatio MCP Inspectorin kanssa  
  - Yleisimmät virheenkorjausratkaisut  

**Moduuli 04 - Käytännön toteutus**
- **pagination/README.md**: Uusi sivutuksen toteutusopas  
  - Kursoripohjaiset sivutuskuviot Pythonissa, TypeScriptissä, Javassa  
  - Asiakaspuolen sivutuksen käsittely  
  - Kursorin suunnittelustrategiat (läpinäkymätön vs. jäsennelty)  
  - Suorituskyvyn optimointisuositukset  

**Moduuli 05 - Edistyneet aiheet**
- **mcp-protocol-features/README.md**: Uusi protokollan ominaisuuksien syväluotaus  
  - Edistymisilmoitusten toteutus  
  - Pyyntöjen peruutuskuviot  
  - Resurssipohjat URI-kuvioilla  
  - Palvelimen elinkaaren hallinta  
  - Lokitustasojen ohjaus  
  - Virheenkäsittelykuviot JSON-RPC-koodien kanssa  

#### Navigointikorjaukset (yli 24 tiedostoa päivitetty)

**Päämoduulin README:t**  
 Nykään linkittää sekä ensimmäiseen oppituntiin ETTÄ seuraavaan moduuliin

**02-Security-alatiedostot**  
- Kaikilla viidellä lisäturvasiirrolla on nyt "Mitä seuraavaksi" -navigointi:  

**09-CaseStudy-tiedostot**  
- Kaikilla tapaustutkimustiedostoilla on nyt peräkkäinen navigointi:  

**10-StreamliningAI Labs**  
Lisätty "Mitä seuraavaksi" -osio moduulin 10 yleiskatsaukseen ja moduuli 11:een  

#### Koodin ja sisällön korjaukset

**SDK- ja riippuvuuspäivitykset**  
Korjattu tyhjä openai-versio `^4.95.0`-versioon  
Päivitetty SDK-versio `^1.8.0` → `>=1.26.0`  
Päivitetty mcp-versiovaatimukset `>=1.26.0`  

**Koodikorjaukset**  
Korjattu virheellinen malli `gpt-4o-mini` → `gpt-4.1-mini`  

**Sisältökorjaukset**  
Korjattu rikkinäinen linkki `READMEmd` → `README.md`, korjattu oppimäärän otsikko `Module 1-3` → `Module 0-3`, korjattu kirjainkoolla herkkä polku  
Poistettu vioittunut päällekkäinen Case Study 5 -sisältö  

**Aloittelijaohjeistuksen parannukset**  
Lisätty asianmukainen johdanto, oppimistavoitteet ja edellytykset aloittelijoille  

#### Oppimateriaalipäivitykset

**Pää README.md**  
- Lisätty kohdat 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) oppimäärätaulukkoon  

**Moduulien READMEt**  
Lisätty oppitunnit 12 ja 13 oppituntilistaan  
Lisätty Käytännön oppaat -osio linkillä sivutukseen  
Lisätty oppitunnit 5.15 (Mukautettu kuljetus) ja 5.16 (Protokollan ominaisuudet)  

**study_guide.md**  
- Päivitetty miellekartta kaikkine uusine aiheineen: MCP-hostien asennus, MCP Inspector, sivutusstrategiat, protokollan ominaisuudet syväluotaus  

## 28. tammikuuta 2026

### MCP-spesifikaation 2025-11-25 vaatimustenmukaisuuden tarkistus

#### Keskeisten käsitteiden parannus (01-CoreConcepts/)  
- **Uusi asiakasprimitiivi - Roots**: Lisätty kattava dokumentaatio Roots-asiakasprimitiivistä, joka mahdollistaa palvelimille tiedostojärjestelmän rajojen ja käyttöoikeuksien ymmärtämisen  
- **Työkalumerkinnät**: Lisätty käyttäytymistä kuvaavat merkinnät (`readOnlyHint`, `destructiveHint`) työkalujen parempaa suorituspäätöksentekoa varten  
- **Työkalukutsut näytteistyksessä**: Päivitetty näytteistysdokumentaatio sisältämään `tools`- ja `toolChoice`-parametrit malliohjatun työkalupyyntökutsun tueksi  
- **URL-tilan esiin kutsuminen**: Lisätty dokumentaatio URL-pohjaisesta palvelimen aloittamasta ulkoisesta verkkovaikutuksesta  
- **Tehtävät (kokeellinen)**: Lisätty uusi osio dokumentoimaan kokeelliset Tehtävät-toiminnot, jotka tarjoavat kestävät suorituskääreet ja viivästyneen tuloksen haun  
- **Kuvakkeiden tuki**: Huomioitu, että työkalut, resurssit, resurssipohjat ja kehotteet voivat sisältää kuvakkeita lisämateriaalina  

#### Dokumentointipäivitykset  
- **README.md**: Lisätty MCP-spesifikaation 2025-11-25 versiotieto ja päivämääräpohjainen versionhallinnan selitys  
- **study_guide.md**: Päivitetty oppimääräkartta sisältämään Tehtävät ja Työkalumerkinnät keskeisissä käsitteissä; päivitetty asiakirjan aikaleima  

#### Spesifikaation vaatimustenmukaisuuden varmistus  
- **Protokollaversio**: Varmistettu, että kaikki dokumentaatioviitteet vastaavat MCP-spesifikaatiota 2025-11-25  
- **Arkkitehtuurin vastaavuus**: Vahvistettu kahden kerroksen arkkitehtuurin (Data Layer + Transport Layer) dokumentoinnin oikeellisuus  
- **Primitiivit dokumentaatiossa**: Varmistettu palvelinprimitiivit (Resurssit, Kehotteet, Työkalut) ja asiakasprimitiivit (Näytteistys, Elicitation, Lokitus, Roots)  
- **Kuljetusmekanismit**: Tarkistettu STDIO:n ja Streamable HTTP:n kuljetusdokumentaation oikeellisuus  
- **Turvaohjeistus**: Varmistettu nykyaikainen MCP-turvaohjeistus vastaavuus  

#### Keskeiset MCP 2025-11-25 ominaisuudet dokumentoitu  
- **OpenID Connect -löytäminen**: Tunnistuspalvelimen löydettävyys OIDC:n kautta  
- **OAuth-asiakastunnuksen metatietodokumentit**: Suositeltu asiakasrekisteröintimekanismi  
- **JSON Schema 2020-12**: MCP-skema-määritelmien oletusdialekti  
- **SDK-kerrostamistuki**: Virallinen vaatimus SDK-ominaisuuksien tukemiselle ja ylläpidolle  
- **Hallitsemisrakenne**: MCP-hallintotyöryhmien ja kiinnostusryhmien virallistaminen  

### Turvadokumentaation merkittävä päivitys (02-Security/)

#### MCP Security Summit Workshop (Sherpa) -integraatio  
- **Uusi käytännön harjoitteluresurssi**: Lisätty kattava integraatio [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) -työpajaan kaikkiin turvadokumentteihin  
- **Retkireitti kattavasti dokumentoitu**: Kirjattu koko telttaleiristä leiriin eteneminen Base Campista Summitille  
- **OWASP-vastaavuus**: Kaikki turvaohjeet vastaavat OWASP MCP Azure Security Guide -riskikarttaa  

#### OWASP MCP Top 10 -integraatio  
- **Uusi osio**: Lisätty OWASP MCP Top 10 -turvariskitaulukko Azure-ohjeineen pääturva-README:hen  
- **Riskiperusteinen dokumentaatio**: Päivitetty mcp-security-controls-2025.md sisältämään OWASP MCP -riskiviitteitä kullekin turva-alueelle  
- **Viitearkkitehtuuri**: Linkitetty OWASP MCP Azure Security Guide -viitearkkitehtuuriin ja toteutusmalleihin  

#### Päivitetyt turvatiedostot  
- **README.md**: Lisätty Sherpa-työpajan yleiskatsaus, retkireittitaulukko, OWASP MCP Top 10 -riskien yhteenveto ja käytännön harjoitteluosio  
- **mcp-security-controls-2025.md**: Päivitetty otsikko helmikuuhun 2026, lisätty OWASP-riskiviitteet (MCP01-MCP08), korjattu spesifikaation version epäjohdonmukaisuus  
- **mcp-security-best-practices-2025.md**: Lisätty Sherpa ja OWASP -resurssien osio, päivitetty aikaleima  
- **mcp-best-practices.md**: Lisätty käytännön harjoitteluosio Sherpa- ja OWASP-linkeillä  
- **azure-content-safety-implementation.md**: Lisätty OWASP MCP06-viite, Sherpa Leiri 3:n vastaavuus ja lisäresurssiosio  

#### Uusia resurssilinkkejä lisätty  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Yksittäiset OWASP MCP-risivut (MCP01-MCP10)  

### Oppimäärän laajuinen MCP Specification 2025-11-25 -yhteensopivuus

#### Moduuli 03 - Aloittaminen  
- **SDK-dokumentaatio**: Lisätty Go SDK viralliseen SDK-listaan; päivitetty kaikki SDK-viitteet vastaamaan MCP Specification 2025-11-25  
- **Kuljetusten tarkennus**: Päivitetty STDIO- ja HTTP Streaming -kuljetuskuvauksia eksplisiittisin spesifikaatioviittein  

#### Moduuli 04 - Käytännön toteutus  
- **SDK-päivitykset**: Lisätty Go SDK; päivitetty SDK-lista sisältämään spesifikaatioversion viitteen  
- **Valtuutusspesifikaatio**: Päivitetty MCP Authorization -spesifikaatiolinkki nykyiseen 2025-11-25 -versioon  

#### Moduuli 05 - Edistyneet aiheet  
- **Uudet ominaisuudet**: Lisätty huomautus MCP Specification 2025-11-25:n uusista ominaisuuksista (Tehtävät, Työkalumerkinnät, URL-tilan esiin kutsuminen, Roots)  
- **Turvaresurssit**: Lisätty OWASP MCP Top 10 ja Sherpa-työpajan linkit lisäviitteisiin  

#### Moduuli 06 - Yhteisön panokset  
- **SDK-lista**: Lisätty Swift ja Rust SDK:t; päivitetty spesifikaatiolinkki 2025-11-25 -versioon  
- **Spec-viite**: Päivitetty MCP Specification -linkki suoraan spesifikaatio-URL:iin  

#### Moduuli 07 - Varhaisen käytön opit  
- **Resurssipäivitykset**: Lisätty MCP Specification 2025-11-25 ja OWASP MCP Top 10 lisäresursseihin  

#### Moduuli 08 - Parhaat käytännöt  
- **Spec-versio**: Päivitetty MCP Specification -viite 2025-11-25 -versioon  
- **Turvaresurssit**: Lisätty OWASP MCP Top 10 ja Sherpa-työpaja lisäviitteisiin  

#### Moduuli 10 - AI-työnkulkujen sujuvoittaminen  
- **Tunnistepäivitys**: Vaihdettu MCP-versiotunniste SDK-version (1.9.3) sijaan spesifikaatioversion (2025-11-25) mukaiseksi  
- **Resurssilinkit**: Päivitetty MCP Specification -linkki; lisätty OWASP MCP Top 10  

#### Moduuli 11 - MCP-palvelinten käytännön laboratorio  
- **Spec-viite**: Päivitetty MCP Specification -linkki 2025-11-25 -versioon  
- **Turvaresurssit**: Lisätty OWASP MCP Top 10 virallisiksi resursseiksi  

## 18. joulukuuta 2025

### Turvadokumentaation päivitys - MCP Specification 2025-11-25

#### MCP:n turvallisuusparhaat käytännöt (02-Security/mcp-best-practices.md) - spesifikaation version päivitys  
- **Protokollaversion päivitys**: Päivitetty viittaukset viimeisimpään MCP Specification 2025-11-25 -versioon (julkaistu 25.11.2025)  
  - Päivitetty kaikki spesifikaatioversion viittaukset 2025-06-18:sta 2025-11-25  
  - Päivitetty asiakirjan päivämääräviittaukset 18.8.2025 → 18.12.2025  
  - Tarkistettu, että kaikki spesifikaatiolinkit osoittavat nykyiseen dokumentaatioon  
- **Sisällön validointi**: Kattava turvallisuusparhaiden käytäntöjen oikeellisuuden tarkistus uusimpien standardien mukaisesti  
  - **Microsoftin turvallisuusratkaisut**: Tarkistettu nykyaikaiset termit ja linkit Prompt Shieldsille (ent. "Jailbreak risk detection"), Azure Content Safetylle, Microsoft Entra ID:lle ja Azure Key Vaultille  
  - **OAuth 2.1 -turvallisuus**: Varmistettu linjaus uusimpiin OAuth-turvakäytäntöihin  
  - **OWASP-standardit**: Tarkistettu, että OWASP Top 10 LLM-viitteet ovat ajan tasalla  
  - **Azure-palvelut**: Varmistettu kaikki Microsoft Azuren dokumentaatio- ja parhaat käytännöt linkit  
- **Standardien noudattaminen**: Kaikki viitatut turvallisuusstandardit ovat ajan tasalla  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 Turvallisuusparhaat käytännöt  
  - Azuren turvallisuus- ja vaatimustenmukaisuuskehykset  
- **Toteutusresurssit**: Varmistettu kaikkien toteutusoppaan linkkien ja resurssien toimivuus  
  - Azure API Management -autentikointimallit  
  - Microsoft Entra ID -integrointiohjeet  
  - Azure Key Vault -salaisuuksien hallinta  
  - DevSecOps-putket ja valvontaratkaisut  

### Dokumentaation laadunvarmistus  
- **Spesifikaation noudattaminen**: Varmistettu, että kaikki pakolliset MCP-turvavaatimukset (MUST/MUST NOT) vastaavat viimeisintä spesifikaatiota  
- **Resurssien ajantasaisuus**: Tarkistettu kaikki ulkoiset linkit Microsoftin dokumentaatioihin, turvallisuusstandardeihin ja toteutusoppaisiin  
- **Parhaiden käytäntöjen kattavuus**: Varmistettu kattava kattavuus tunnistautumisesta, valtuutuksesta, tekoälyyn liittyvistä uhilista, toimitusketjun turvallisuudesta ja yritysmallistoista  

## 6. lokakuuta 2025

### Aloittaminen-osion laajennus – Edistynyt palvelimen käyttö ja yksinkertainen autentikointi

#### Edistynyt palvelimen käyttö (03-GettingStarted/10-advanced)  
- **Uusi luku lisätty**: Esitelty kattava opas edistyneeseen MCP-palvelimen käyttöön, kattaen sekä tavallisen että matalamman tason palvelinarkkitehtuurit.  
  - **Tavallinen vs. matalamman tason palvelin**: Yksityiskohtainen vertailu ja koodiesimerkit Pythonissa ja TypeScriptissä molemmista lähestymistavoista.  
  - **Handler-pohjainen suunnittelu**: Selitys handler-pohjaisesta työkalujen/resurssien/kehotteiden hallinnasta skaalautuvien, joustavien palvelinratkaisujen toteutukseen.  
  - **Käytännön kuviot**: Todellisia esimerkkejä, joissa matalamman tason palvelinmallit ovat hyödyllisiä edistyneiden ominaisuuksien ja arkkitehtuurin osalta.  

#### Yksinkertainen autentikointi (03-GettingStarted/11-simple-auth)  
- **Uusi luku lisätty**: Vaihe vaiheelta -opas yksinkertaisen autentikoinnin toteuttamiseen MCP-palvelimissa.  
  - **Autentikoinnin käsitteet**: Selkeä ero autentikoinnin ja valtuutuksen välillä sekä tunnistautumistietojen käsittely.  
  - **Perusautentikoinnin toteutus**: Middleware-pohjaiset autentikointikuviot Pythonissa (Starlette) ja TypeScriptissä (Express), koodiesimerkit mukana.  
  - **Eteneminen kehittyneeseen turvallisuuteen**: Ohjeistus yksinkertaisesta autentikoinnista etenemiseen OAuth 2.1:een ja RBAC:iin, viitteet edistyneisiin turvamoduuleihin.  

Nämä lisäykset tarjoavat käytännönläheistä, kädestä pitäen ohjausta vahvempien, turvallisempien ja joustavampien MCP-palvelinten rakentamiseen yhdistäen peruskäsitteet edistyneisiin tuotantomalleihin.

## 29. syyskuuta 2025

### MCP-palvelimen tietokantaintegraatiolaboratoriot – Kattava käytännön oppimispolku

#### 11-MCPServerHandsOnLabs – Uusi kokonainen tietokantaintegraatio-oppimäärä  

- **Täydellinen 13-labran oppimispolku**: Lisätty kattava käytännön opetussuunnitelma tuotantovalmiiden MCP-palvelimien rakentamiseen PostgreSQL-tietokanta-integraatiolla  
  - **Todellisen maailman toteutus**: Zava Retail -analytiikan käyttötapaus, joka havainnollistaa yritystason malleja  
  - **Rakenteellinen oppimisen eteneminen**:  
    - **Labit 00-03: Perusteet** - Johdanto, ydinarkkitehtuuri, turvallisuus & monivuokraus, ympäristön asetukset  
    - **Labit 04-06: MCP-palvelimen rakentaminen** - Tietokannan suunnittelu & skeema, MCP-palvelimen toteutus, työkalun kehittäminen  
    - **Labit 07-09: Edistyneet ominaisuudet** - Semanttisen haun integrointi, testaus & virheiden korjaus, VS Code -integraatio  
    - **Labit 10-12: Tuotanto & parhaat käytännöt** - Julkaisustrategiat, valvonta & havaittavuus, parhaat käytännöt & optimointi  
  - **Yritysteknologiat**: FastMCP-kehys, PostgreSQL pgvector-laajennuksella, Azure OpenAI -upotukset, Azure Container Apps, Application Insights  
  - **Edistyneet ominaisuudet**: Rivikohtainen turvallisuus (RLS), semanttinen haku, monivuokra-tietojen käyttö, vektoriedustus, reaaliaikainen valvonta  

#### Terminologian yhdenmukaistaminen - Moduulista lab-rakenteeseen  
- **Dokumentaation kattava päivitys**: Kaikissa 11-MCPServerHandsOnLabs-kansion README-tiedostoissa vaihdettu termi "Moduuli" muotoon "Lab"  
  - **Otsikot**: Muutettu "What This Module Covers" muotoon "What This Lab Covers" kaikissa 13 labissa  
  - **Sisällön kuvaus**: Muutettu "This module provides..." muotoon "This lab provides..." koko dokumentaatiossa  
  - **Oppimistavoitteet**: Muutettu "By the end of this module..." muotoon "By the end of this lab..."  
  - **Navigointilinkit**: Kaikki viittaukset "Module XX:" muutettu muotoon "Lab XX:" poikkiviittauksissa ja navigoinnissa  
  - **Valmiin suorittamisen seuranta**: Muutettu "After completing this module..." muotoon "After completing this lab..."  
  - **Tekniset viittaukset säilytetty**: Python-moduuliviittaukset konfiguraatiotiedostoissa (esim. `"module": "mcp_server.main"`) pysyvät ennallaan  

#### Opasoppaan parannukset (study_guide.md)  
- **Visuaalinen opetussuunnitelmakartta**: Lisätty uusi "11. Database Integration Labs" -osio, joka havainnollistaa koko lab-rakennetta  
- **Repositorion rakenne**: Päivitetty kymmenestä yhdelletoista pääosioon sisältäen yksityiskohtaisen kuvauksen 11-MCPServerHandsOnLabsista  
- **Oppimispolun ohjeistus**: Parannettu navigointi ohje kattamaan osiot 00-11  
- **Teknologioiden kattavuus**: Lisätty FastMCP, PostgreSQL sekä Azure-palvelujen integraatiotiedot  
- **Oppimistulokset**: Korostettu tuotantovalmiiden palvelimien kehitys, tietokantaintegraatiomallit ja yritysturvallisuus  

#### Pää-README-rakenteen parannukset  
- **Lab-pohjainen terminologia**: Päivitetty 11-MCPServerHandsOnLabsin pää-README.md käyttämään johdonmukaisesti "Lab"-rakennetta  
- **Oppimispolun järjestys**: Selkeä eteneminen perusteista edistyneisiin toteutuksiin ja tuotantojulkaisuun  
- **Todellisen maailman painotus**: Korostettu käytännönläheistä, laboratorionomaista oppimista yritystason mallien ja teknologioiden avulla  

### Dokumentaation laatu & johdonmukaisuuden parannukset  
- **Käytännönläheinen oppiminen**: Vahvistettu käytännön, labipohjaisen lähestymistavan merkitystä koko dokumentaatiossa  
- **Yritysmallien korostus**: Korostettu tuotantovalmiita toteutuksia ja yritysturvallisuuden huomioimista  
- **Teknologian integrointi**: Kattava nykyaikaisten Azure-palveluiden ja tekoälyintegraatiomallien esittely  
- **Oppimisprogresio**: Selkeä, jäsennelty polku peruskäsitteistä tuotantoon saakka  

## 26. syyskuuta 2025

### Käyttötapausten laajennus - GitHub MCP Registry -integraatio

#### Käyttötapaukset (09-CaseStudy/) - Ekosysteemin kehitykseen keskittyminen  
- **README.md**: Merkittävä laajennus kattavalla GitHub MCP Registry -käyttötapauskatsauksella  
  - **GitHub MCP Registry -käyttötapaus**: Uusi laaja katsaus GitHubin MCP Registry -lansseeraukseen syyskuussa 2025  
    - **Ongelman analyysi**: Yksityiskohtainen tarkastelu hajautettujen MCP-palvelimien löytämisen ja julkaisun haasteista  
    - **Ratkaisun arkkitehtuuri**: GitHubin keskitetyn rekisterin lähestymistapa sekä yhden napsautuksen VS Code -asennus  
    - **Liiketoiminnan vaikutus**: Mitattavat parannukset kehittäjien käyttöönotossa ja tuottavuudessa  
    - **Strateginen arvo**: Painotus modulaariseen agenttien käyttöönottoon ja työkalujen väliseen yhteentoimivuuteen  
    - **Ekosysteemin kehitys**: Sijoittuminen perustaksi agenttipohjaisille integraatioille  
  - **Parannettu tapausrakenteen yhtenäinen muotoilu**: Kaikki seitsemän tapausta päivitetty yhdenmukaisella formaatilla ja kattavilla kuvauksilla  
    - Azure AI Travel Agents: Moniagenttien orkestrointipainotus  
    - Azure DevOps -integraatio: Työnkulun automaatiopainotus  
    - Reaaliaikainen dokumenttien haku: Python-konsoliasiakas toteutus  
    - Vuorovaikutteinen opintosuunnitelman generoija: Chainlit-keskustelusovellus verkossa  
    - Editoriin integroitu dokumentaatio: VS Code ja GitHub Copilot -integraatio  
    - Azure API Management: Yritystason API-integraatiomallit  
    - GitHub MCP Registry: Ekosysteemin kehitys ja yhteisöalusta  
  - **Kattava yhteenveto**: Uudelleenkirjoitettu lopetusosio korostaa kaikkia seitsemää käyttötapausta useilta MCP-toteutusnäkökulmista  
    - Yritysintegraatio, moniagenttien orkestrointi, kehittäjien tuottavuus  
    - Ekosysteemin kehitys, koulutusmahdollisuudet  
    - Laajennettu tieto arkkitehtuurimalleista, toteutusstrategioista ja parhaista käytännöistä  
    - MCP:n korostus kypsänä ja tuotantovalmiina protokollana  

#### Opasoppaan päivitykset (study_guide.md)  
- **Visuaalinen opetussuunnitelmakartta**: Päivitetty miellekartta sisältämään GitHub MCP Registry Käyttötapaukset-osiossa  
- **Käyttötapaukset-kuvaus**: Parannettu geneerisestä selityksestä seitsemän yksityiskohtaisen tapauskatsauksen erittelyyn  
- **Repositorion rakenne**: Päivitetty osio 10 heijastamaan kattavaa käyttötapauskattavuutta ja erityisiä toteutustietoja  
- **Muutospäiväkirjan integrointi**: Lisätty 26.9.2025 merkintä dokumentoimaan GitHub MCP Registry -lisäys ja tapauskertausten parannukset  
- **Päivämääräpäivitykset**: Päivitetty jalan alle uusi viimeisin päivityspäivämäärä (26. syyskuuta 2025)  

### Dokumentaation laadun parannukset  
- **Yhtenäisyyden parannus**: Standardoitu käyttötapauskatsauksien muotoilu ja rakenne kaikissa seitsemässä esimerkissä  
- **Kattava sisältö**: Käyttötapaukset kattavat nyt yritys-, kehittäjien tuottavuuden ja ekosysteemin kehityksen  
- **Strateginen asemoituminen**: Tehostettu MCP:n asemaa perustavana alustana agenttipohjaiselle systeemien käyttöönotolle  
- **Resurssien integrointi**: Päivitetty lisäresurssit sisältämään GitHub MCP Registry -linkki  

## 15. syyskuuta 2025

### Edistyneiden aiheiden laajennus - Mukautetut siirrot & kontekstisuunnittelu

#### MCP Mukautetut siirrot (05-AdvancedTopics/mcp-transport/) - Uusi edistynyt toteutusopas  
- **README.md**: Täydellinen toteutusopas mukautetuille MCP-siirtomekanismeille  
  - **Azure Event Grid -siirto**: Kattava palveluttoman tapahtumapohjaisen siirron toteutus  
    - Esimerkit C#:lla, TypeScriptillä ja Pythonilla Azure Functions -integraatiolla  
    - Tapahtumapohjaiset arkkitehtuurimallit skaalautuville MCP-ratkaisuille  
    - Webhook-vastaanottimet ja puskuripohjainen viestinkäsittely  
  - **Azure Event Hubs -siirto**: Suurivirtainen suoratoistosiirto  
    - Reaaliaikaisen suoratoiston ominaisuudet matalan latenssin tilanteisiin  
    - Osiointistrategiat ja checkpoint-hallinta  
    - Viestimassojen käsittely ja suorituskyvyn optimointi  
  - **Yritysintegraatiomallit**: Tuotantovalmiit arkkitehtuuriesimerkit  
    - Hajautettu MCP-käsittely useissa Azure Functions -instansseissa  
    - Hybridisiirtoarkkitehtuurit, jotka yhdistävät useita siirtotyyppejä  
    - Viestien kestävyys, luotettavuus ja virheiden käsittelystrategiat  
  - **Turvallisuus & valvonta**: Azure Key Vault -integraatio ja havaittavuusmallit  
    - Hallitun identiteetin todennus ja vähimmän oikeuden periaate  
    - Application Insights -telemetria ja suorituskyvyn valvonta  
    - Piirikytkimet ja vikasietomallit  
  - **Testauskehykset**: Kattavat testausstrategiat mukautetuille siirroille  
    - Yksikkötestaus testidublöörein ja mockauskirjastoilla  
    - Integraatiotestaus Azure Test Containers -ympäristössä  
    - Suorituskyky- ja kuormitustestausnäkökohdat  

#### Kontekstisuunnittelu (05-AdvancedTopics/mcp-contextengineering/) - Nouseva tekoälyn ala  
- **README.md**: Laaja katsaus kontekstisuunnitteluun nousevana alana  
  - **Keskeiset periaatteet**: Täydellinen kontekstin jakaminen, toimintapäätösten tietoisuus ja kontekstin hallinta  
  - **MCP-protokollan linjaus**: Miten MCP:n rakenne vastaa kontekstisuunnittelun haasteisiin  
    - Kontekstin ikkuna- ja rajoitukset sekä progressiivinen lataus  
    - Tärkeyden määrittely ja dynaaminen kontekstin haku  
    - Monimodaalinen kontekstinhallinta ja turvallisuusnäkökohdat  
  - **Toteutusmenetelmät**: Yksisäikeiset vs moniagenttiset arkkitehtuurit  
    - Konstekstipalojen erottelu ja etusijajärjestys  
    - Progressiivinen kontekstin lataus ja pakkausstrategiat  
    - Kerroksellinen kontekstilähestymistapa ja haun optimointi  
  - **Mittauskehys**: Kasvavat mittaristot kontekstin tehokkuuden arviointiin  
    - Syötteen tehokkuus, suorituskyky, laatu ja käyttökokemus  
    - Kokeelliset lähestymistavat kontekstin optimointiin  
    - Virheanalyysi ja parannusmenetelmät  

#### Opetussuunnitelman navigointipäivitykset (README.md)  
- **Parannettu moduulirakenne**: Päivitetty opetussuunnitelman taulukko sisältämään uudet edistyneet aiheet  
  - Lisätyt kontekstisuunnittelu (5.14) ja mukautettu siirto (5.15)  
  - Johdonmukainen muotoilu ja linkitys kaikissa moduuleissa  
  - Päivitetyt kuvaukset vastaamaan nykyistä sisältöaluetta  

### Hakemistorakenteen parannukset  
- **Nimikäytännön yhdenmukaistaminen**: "mcp transport" nimetty uudelleen "mcp-transport"-muotoon yhdenmukaisuuden vuoksi muiden edistyneiden aiheiden kansioiden kanssa  
- **Sisällön organisointi**: Kaikki 05-AdvancedTopics-kansiot noudattavat nyt johdonmukaista nimeämismallia (mcp-[aihe])  

### Dokumentaation laatuparannukset  
- **MCP-spesifikaation linjaus**: Kaikki uudet sisällöt viittaavat MCP Specification 2025-06-18 versioon  
- **Monikieliset esimerkit**: Kattavat koodiesimerkit C#:lla, TypeScriptillä ja Pythonilla  
- **Yrityskeskeisyys**: Tuotantovalmiit mallit ja Azure-pilvikokonaisuus koko materiaalissa  
- **Visuaalinen dokumentaatio**: Mermaid-kaaviot arkkitehtuurin ja prosessien havainnollistamiseksi  

## 18. elokuuta 2025

### Dokumentaation kattava päivitys - MCP 2025-06-18 standardit

#### MCP-turvallisuuden parhaat käytännöt (02-Security/) - Täysi modernisointi  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Täydellinen uudelleenkirjoitus MCP Specification 2025-06-18 mukaisesti  
  - **Pakolliset vaatimukset**: Lisätty selkeät PAKOLLINEN/EI SAA -vaatimukset virallisesta spesifikaatiosta selkein visuaalisin merkinnöin  
  - **12 ydinturvallisuusharjoitetta**: Uudelleenjärjestetty 15 kohteen listasta kattaviin turvallisuusalueisiin  
    - Token-turvallisuus & todennus ulkoisen identiteetin tarjoajan integraatiolla  
    - Istunnonhallinta & siirtoturvallisuus kryptografisine vaatimuksineen  
    - Tekoälyspesifinen uhkasuojelu Microsoft Prompt Shields -integraatiolla  
    - Käyttövaltuuksien hallinta & luvat vähimmän oikeuden periaatteella  
    - Sisällön turvallisuus & valvonta Azure Content Safety -integraatiolla  
    - Toimitusketjun turvallisuus kattavalla komponenttien tarkastuksella  
    - OAuth-turvallisuus & Confused Deputy -hyökkäyksen estäminen PKCE:n avulla  
    - Tapahtumavaste & toipuminen automaattisilla toiminnoilla  
    - Säädösvaatimustenmukaisuus & hallinta  
    - Edistyneet turvallisuusvalvontatyökalut zero trust -arkkitehtuurilla  
    - Microsoftin turvaekosysteemin laaja integraatio  
    - Jatkuva turvallisuuden kehitys adaptiivisilla käytännöillä  
  - **Microsoftin turvallisuusratkaisut**: Parannettu integrointiohjeistus Prompt Shields, Azure Content Safety, Entra ID ja GitHub Advanced Security -ratkaisuille  
  - **Toteutusresurssit**: Luokitellut kattavat linkit viralliseen MCP-dokumentaatioon, Microsoftin turvatuotteisiin, turvallisuusstandardeihin ja toteutusoppaisiin  

#### Edistyneet turvallisuusvalvontatyökalut (02-Security/) - Yritystason toteutus  
- **MCP-SECURITY-CONTROLS-2025.md**: Täysi uudistus yritystason turvallisuuskehykseksi  
  - **9 kattavaa turvallisuusaluetta**: Laajennettu perusturvasta yksityiskohtaiseen yrityskehykseen  
    - Kehittynyt todennus & valtuutus Microsoft Entra ID -integraatiolla  
    - Token-turvallisuus & anti-passthrough-valvonta kattavalla validoinnilla  
    - Istuntojen turvallisuus varmistuksineen sieppauksen estämiseksi  
    - AI-spesifiset turvatoimet kehotteiden ruiskutuksen ja työkalumyrkytyksen ehkäisyyn  
    - Confused Deputy -hyökkäyksen esto OAuth-välityksellä  
    - Työkalujen suoritusympäristön turvallisuus hiekkalaatikoinnilla ja eristyksellä  
    - Toimitusketjun turvallisuus riippuvuuksien tarkastuksella  
    - Valvonta & havaitsemisvalvonta SIEM-liitännöin  
    - Tapahtumavaste & toipuminen automatisoiduilla prosesseilla  
  - **Toteutusesimerkit**: Lisätty yksityiskohtaisia YAML-konfiguraatioita ja koodiesimerkkejä  
  - **Microsoft-ratkaisujen integraatio**: Kattava Azure-turvapalvelujen, GitHub Advanced Securityn ja yritysidentiteetin hallinnan kattaus  

#### Edistyneet turvallisuusaiheet (05-AdvancedTopics/mcp-security/) - Tuotantovalmiit toteutukset  
- **README.md**: Täydellinen uudelleenkirjoitus yritystason turvallisuustoteutuksille  
  - **Ajantasainen spesifikaatio**: Päivitetty MCP Specification 2025-06-18 vaatimusten mukaiseksi  
  - **Tehostettu todennus**: Microsoft Entra ID -integraatio monipuolisilla .NET- ja Java Spring Security -esimerkeillä  
  - **AI-turvallisuusintegraatio**: Microsoft Prompt Shields ja Azure Content Safety Python-esimerkeillä  
  - **Edistyneet uhkien torjuntamenetelmät**:  
    - Confused Deputy -hyökkäyksen esto PKCE:llä ja käyttäjän suostumuksen validoinnilla  
    - Tokenien läpiviennin esto vastaanottajavalidoinnilla ja turvallisella hallinnalla  
    - Istunnon kaappauksen esto kryptografisella sidonnalla ja käyttäytymisanalyysilla  
  - **Yritysturvallisuuden integraatio**: Azure Application Insights -valvonta, uhkien tunnistusputket ja toimitusketjun turvallisuus  
  - **Toteutuschecklist**: Selkeä pakollisten ja suositeltujen turvavalvontojen erottelu Microsoftin turvaekosysteemin hyötyjen kera  

### Dokumentaation laatu & standardien noudattaminen  
- **Spesifikaatioviittaukset**: Päivitetty kaikki viittaukset MCP Specification 2025-06-18 -versioon  
- **Microsoftin turvaekosysteemi**: Laajennettu integrointiohjeistus kaikessa turvallisuusdokumentaatiossa  
- **Käytännön toteutukset**: Lisätty yksityiskohtaiset .NET-, Java- ja Python-koodiesimerkit yritysmallien kera  
- **Resurssien organisointi**: Kattava jaottelu viralliseen dokumentaatioon, turvallisuusstandardeihin ja toteutusoppaisiin  
- **Visuaaliset merkinnät**: Selkeä merkitseminen pakollisten vaatimusten ja suositusten välille  

#### Ydinkäsitteet (01-CoreConcepts/) - Täysi uudistaminen  
- **Protokollaversion päivitys**: Päivitetty viittaukset MCP Specification 2025-06-18 versioon käyttäen YYYY-MM-DD -päivämuotoa  
- **Arkkitehtuurin tarkennus**: Parannettu Hostsien, Clienttien ja Serverien kuvaukset vastaamaan nykyisiä MCP-arkkitehtuurimalleja  
  - Isännät määritelty nyt selkeästi tekoälysovelluksiksi, jotka koordinoivat useita MCP-asiakasliitäntöjä
  - Asiakkaat kuvattu protokollaliittiminä, jotka ylläpitävät yksittäisiä palvelinsuhteita
  - Palvelimet laajennettu paikallisen vs. etäkäytön skenaarioilla
- **Alkeiden uudelleenjärjestely**: Täydellinen uudistus palvelin- ja asiakasprimitiiiveissä
  - Palvelinprimitiiivit: Resurssit (tietolähteet), Kehotteet (pohjat), Työkalut (suoritettavat funktiot) yksityiskohtaisilla selityksillä ja esimerkeillä
  - Asiakasprimitiiivit: Otanta (LLM-vastaukset), Tietojen keruu (käyttäjän syöte), Lokitus (debuggaus/valvonta)
  - Päivitetty nykyisiin löytö- (`*/list`), hakemisto- (`*/get`) ja suoritus- (`*/call`) menetelmämalleihin
- **Protokollan arkkitehtuuri**: Otettu käyttöön kaksikerroksinen arkkitehtuurimalli
  - Datakerros: JSON-RPC 2.0 -perusta elinkaaren hallinnalla ja primitiiveillä
  - Siirtokerros: STDIO (paikallinen) ja striimattava HTTP SSE:llä (etä)
- **Turvakehys**: Kattava turvallisuusperiaatteisto, joka sisältää eksplisiittisen käyttäjän suostumuksen, tietosuojan, työkalujen suoritusturvan ja siirtokerroksen turvallisuuden
- **Viestintämallit**: Päivitetyt protokollaviestit osoittamaan alustuksen, löydön, suorituksen ja ilmoitusvirtaukset
- **Koodiesimerkit**: Päivitetyt monikieliesimerkit (.NET, Java, Python, JavaScript) heijastamaan nykyisiä MCP SDK -malleja

#### Turvallisuus (02-Security/) - Kattava turvallisuusuudistus  
- **Standardien yhdenmukaisuus**: Täysi yhdenmukaisuus MCP Specification 2025-06-18 turvallisuusvaatimusten kanssa
- **Todennuksen kehitys**: Dokumentoitu siirtymä mukautetuista OAuth-palvelimista ulkoisen identiteetin tarjoajan delegaatioon (Microsoft Entra ID)
- **Tekoälyyn liittyvien uhkien analyysi**: Laajennettu kattavuus nykyaikaisista tekoälyhyökkäysvektoreista
  - Yksityiskohtaiset kehotteiden sijoittamis- ja injektointihyökkäysskenaarioiden esimerkit
  - Työkalujen myrkytysmekanismit ja "matto vedetään alta" -hyökkäysmallit
  - Kontekstinikkunan myrkytys ja mallin hämmentämishyökkäykset
- **Microsoftin tekoälyturvaratkaisut**: Kattava kuvaus Microsoftin turvallisuus-ekosysteemistä
  - AI-kehotesuojat edistyneillä havaitsemis-, korostus- ja erotinmenetelmillä
  - Azure Content Safety -integraatiomallit
  - GitHub Advanced Security toimitusketjun suojaamiseen
- **Edistyneet uhkien lieventämistoimet**: Yksityiskohtaiset turvavalvontatoimet
  - Istunnon kaappaus MCP-spesifisillä hyökkäysskenaarioilla ja kryptografisilla istunnon tunnisten vaatimuksilla
  - Sekaantuneen välittäjän ongelmat MCP-välityspalvelintilanteissa eksplisiittisine suostumusvaatimuksineen
  - Tokenin läpivientiin liittyvät haavoittuvuudet pakollisella validointivalvonnalla
- **Toimitusketjun turvallisuus**: Laajennettu AI:n toimitusketjun kattavuus sisältäen perustamallit, upotepalvelut, kontekstintuottajat ja kolmannen osapuolen API:t
- **Perusturva**: Parannettu integraatio yritysturvallisuusmalleihin, mukaan lukien zero trust -arkkitehtuuri ja Microsoftin turvallisuusekosysteemi
- **Resurssien organisointi**: Kattavat resurssilinkit ryhmitelty tyypeittäin (Viralliset dokumentit, standardit, tutkimus, Microsoftin ratkaisut, toteutusoppaat)

### Dokumentaation laadun parannukset
- **Rakennekohteiset oppimistavoitteet**: Tehostetut oppimistavoitteet konkreettisilla, toteuttamiskelpoisilla tuloksilla 
- **Ristiinviittaukset**: Lisätty linkkejä liittyvien turvallisuus- ja ydinkäsitteiden aiheiden välillä
- **Ajantasaiset tiedot**: Päivitetty kaikki päivämäärä- ja spesifikaatiolinkit nykyisten standardien mukaisiksi
- **Toteutusohjeistus**: Lisätty konkreettisia ja toimintahakuisia toteutusohjeita molempiin osioihin

## 16. heinäkuuta 2025

### README ja navigaation parannukset
- Täysin uudistettu oppimateriaalin navigaatio README.md:ssä
- Korvattu `<details>`-tagit paremmin saavutettavalla taulukkopohjaisella formaatilla
- Luotu vaihtoehtoisia asetteluvaihtoehtoja uuteen "alternative_layouts"-kansioon
- Lisätty korttipohjaisia, välilehtityylisiä ja harmonikkatyylisiä navigaatioesimerkkejä
- Päivitetty arkistorakenne-osio kattamaan kaikki uusimmat tiedostot
- Parannettu "Kuinka käyttää tätä oppimateriaalia" -osion selkeillä suosituksilla
- Päivitetty MCP-spesifikaatiolinkit osoittamaan oikeisiin URL-osoitteisiin
- Lisätty Context Engineering -osio (5.14) oppimateriaalirakenteeseen

### Oppaan päivitykset
- Koko oppimateriaali uudistettu vastaamaan nykyistä arkistorakennetta
- Lisätty uudet osiot MCP-asiakkaista ja työkaluista sekä suosituista MCP-palvelimista
- Päivitetty Visual Curriculum Map heijastamaan tarkasti kaikkia aiheita
- Parannettu edistyneiden aiheiden kuvauksia kattamaan kaikki erikoisalueet
- Päivitetty tapaustutkimukset vastaamaan todellisia esimerkkejä
- Lisätty tämä kattava muutosloki

### Yhteisön panokset (06-CommunityContributions/)
- Lisätty yksityiskohtainen tieto MCP-palvelimista kuvan generointiin
- Lisätty kattava osio Clauden käytöstä VSCode-ympäristössä
- Lisätty Cline-päätelaitteiden asiakasohjelman asennus- ja käyttöohjeet
- Päivitetty MCP-asiakaskuvaus kattaen kaikki suositut asiakasvaihtoehdot
- Parannettu panos-esimerkit tarkemmilla koodinäytteillä

### Edistyneet aiheet (05-AdvancedTopics/)
- Järjestetty kaikki erikoisteema-kansiot yhtenäisellä nimeämiskäytännöllä
- Lisätty kontekstitekniikan materiaaleja ja esimerkkejä
- Lisätty Foundry-agentin integraatiodokumentaatio
- Parannettu Entra ID -turvaintegraation dokumentaatiota

## 11. kesäkuuta 2025

### Alkuperäinen julkaisu
- Julkaistu MCP for Beginners -oppimateriaalin ensimmäinen versio
- Luotu perusrakenne kaikille 10 pääosiolle
- Otettu käyttöön Visual Curriculum Map navigaatiota varten
- Lisätty alkuperäiset esimerkkiprojektit useissa ohjelmointikielissä

### Aloittaminen (03-GettingStarted/)
- Luotu ensimmäiset palvelintoteutusesimerkit
- Lisätty ohjeita asiakkaiden kehittämiseen
- Sisällytetty LLM-asiakasintegraatio-ohjeet
- Lisätty VS Code -integraatiodokumentaatio
- Toteutettu Server-Sent Events (SSE) -palvelinesimerkit

### Ydinkäsitteet (01-CoreConcepts/)
- Lisätty yksityiskohtainen selitys asiakas-palvelinarkkitehtuurista
- Luotu dokumentaatio keskeisistä protokollakomponenteista
- Dokumentoitu viestintämallit MCP:ssä

## 23. toukokuuta 2025

### Arkistorakenne
- Käynnistetty arkistorakenne peruskansioilla
- Luotu README-tiedostot kuhunkin pääosioon
- Otettu käyttöön käännösinfrastruktuuri
- Lisätty kuvat ja kaaviot

### Dokumentaatio
- Luotu alkuperäinen README.md oppimateriaalin yleiskatsauksella
- Lisätty CODE_OF_CONDUCT.md ja SECURITY.md
- Otettu käyttöön SUPPORT.md ohjeilla avun hakemiseksi
- Luotu alustava oppaan rakenne

## 15. huhtikuuta 2025

### Suunnittelu ja kehys
- MCP for Beginners -oppimateriaalin alkuperäinen suunnitelma
- Määritelty oppimistavoitteet ja kohdeyleisö
- Luotu 10-osainen rakenne oppimateriaalille
- Kehitetty konseptuaalinen kehys esimerkeille ja tapaustutkimuksille
- Luotu alkuperäiset prototyyppiesimerkit keskeisistä käsitteistä

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:  
Tämä asiakirja on käännetty käyttäen tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta ota huomioon, että automaattiset käännökset voivat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja omalla kielellään on ensisijainen ja luotettava lähde. Tärkeissä asioissa suosittelemme ammattimaista, ihmisen tekemää käännöstä. Emme ole vastuussa tästä käännöksestä johtuvista väärinymmärryksistä tai virhetulkinnasta.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->