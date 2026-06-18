# Edistyneet aiheet MCP:ssä

[![Edistynyt MCP: Turvalliset, skaalautuvat ja monimodaaliset tekoälyagentit](../../../translated_images/fi/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Napsauta yllä olevaa kuvaa katsellaksesi tämän oppitunnin videon)_

Tässä luvussa käsitellään sarjaa edistyneitä aiheita Model Context Protocol (MCP) -implementaatiossa, mukaan lukien monimodaalinen integrointi, skaalautuvuus, parhaat turvallisuuskäytännöt ja yritysten integrointi. Nämä aiheet ovat ratkaisevan tärkeitä kestävien ja tuotantovalmiiden MCP-sovellusten rakentamiseksi, jotka pystyvät vastaamaan nykyaikaisten tekoälyjärjestelmien vaatimuksiin.

## Yhteenveto

Tässä oppitunnissa tutkitaan edistyneitä käsitteitä Model Context Protocol -implementaatiossa, keskittyen monimodaaliseen integrointiin, skaalautuvuuteen, parhaisiin turvallisuuskäytäntöihin ja yritysten integrointiin. Nämä aiheet ovat oleellisia tuotantotason MCP-sovellusten rakentamiseksi, jotka pystyvät käsittelemään monimutkaisia vaatimuksia yritysympäristöissä.

## Oppimistavoitteet

Oppitunnin lopussa osaat:

- Toteuttaa monimodaaliset ominaisuudet MCP-kehyksissä
- Suunnitella skaalautuvia MCP-arkkitehtuureja korkean kysynnän tilanteisiin
- Soveltaa MCP:n turvallisuusperiaatteiden mukaisia parhaita turvallisuuskäytäntöjä
- Integroida MCP:n yritysten tekoälyjärjestelmiin ja kehyksiin
- Optimoida suorituskykyä ja luotettavuutta tuotantoympäristöissä

## Oppitunnit ja esimerkkiprojektit

| Linkki | Otsikko | Kuvaus |
|------|-------|-------------|
| [5.1 Integrointi Azuren kanssa](./mcp-integration/README.md) | Azure-integrointi | Opi, kuinka integroida MCP-palvelimesi Azureen |
| [5.2 Monimodaalinen esimerkki](./mcp-multi-modality/README.md) | MCP Monimodaaliset esimerkit | Esimerkkejä ääni-, kuva- ja monimodaalisista vastauksista |
| [5.3 MCP OAuth2 esimerkki](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimipainoinen Spring Boot -sovellus, joka näyttää OAuth2:n käytön MCP:n kanssa sekä valtuutus- että resurssipalvelimena. Demonstroi suojattua tokenin myöntämistä, suojattuja päätepisteitä, Azure Container Apps -käyttöönottoa ja API-hallinnan integraatiota. |
| [5.4 Juuri-kontekstit](./mcp-root-contexts/README.md) | Juuri-kontekstit | Lisätietoa juuri-kontekstista ja sen toteuttamisesta |
| [5.5 Reititys](./mcp-routing/README.md) | Reititys | Opi erilaisista reititystyypeistä |
| [5.6 Otanta](./mcp-sampling/README.md) | Otanta | Opi työskentelemään otannan kanssa |
| [5.7 Skaalaus](./mcp-scaling/README.md) | Skaalaus | Opi skaalaamisesta |
| [5.8 Turvallisuus](./mcp-security/README.md) | Turvallisuus | Suojaa MCP-palvelimesi |
| [5.9 Web-haun esimerkki](./web-search-mcp/README.md) | Web-haku MCP | Python MCP -palvelin ja asiakas, jotka integroivat SerpAPI:n reaaliaikaiseen web-, uutis-, tuotehakuun ja kysymys-vastaus -toimintoihin. Demonstroi moni-työkalun orkestrointia, ulkoisen API:n integraatiota ja kestävää virheiden käsittelyä. |
| [5.10 Reaaliaikainen suoratoisto](./mcp-realtimestreaming/README.md) | Suoratoisto | Reaaliaikainen tiedon suoratoisto on nykypäivän dataohjatussa maailmassa välttämätöntä, jossa yritykset ja sovellukset tarvitsevat välitöntä pääsyä tietoihin tehdäkseen oikea-aikaisia päätöksiä. |
| [5.11 Reaaliaikainen web-haku](./mcp-realtimesearch/README.md) | Web-haku | Miten MCP muuttaa reaaliaikaista web-hakua tarjoamalla standardoidun lähestymistavan kontekstinhallintaan tekoälymallien, hakukoneiden ja sovellusten välillä. | 
| [5.12 Entra ID -todennus Model Context Protocol -palvelimille](./mcp-security-entra/README.md) | Entra ID -todennus | Microsoft Entra ID tarjoaa vahvan pilvipohjaisen identiteetin ja pääsynhallinnan ratkaisun, joka auttaa varmistamaan, että vain valtuutetut käyttäjät ja sovellukset voivat olla vuorovaikutuksessa MCP-palvelimesi kanssa. |
| [5.13 Microsoft Foundryn agenttien integrointi](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry -integrointi | Opi integroimaan Model Context Protocol -palvelimet Microsoft Foundryn agenteihin, mahdollistaen tehokkaan työkalujen orkestroinnin ja yritysten tekoälyominaisuudet standardoitujen ulkoisten tietolähteiden liitäntöjen avulla. |
| [5.14 Kontekstitekniikka](./mcp-contextengineering/README.md) | Kontekstitekniikka | MCP-palvelimien tulevaisuuden mahdollisuudet kontekstitekniikoissa, mukaan lukien kontekstin optimointi, dynaaminen kontekstinhallinta ja tehokkaan kehotteiden suunnittelun strategiat MCP-kehyksissä. |
| [5.15 MCP:n mukautettu tiedonsiirto](./mcp-transport/README.md) | Mukautettu tiedonsiirto | Opi toteuttamaan mukautettuja tiedonsiirtomekanismeja erityisiin MCP-viestintätilanteisiin. |
| [5.16 Protokollan ominaisuudet syvällisesti](./mcp-protocol-features/README.md) | Protokollan ominaisuudet | Hallitse edistyneitä protokollan ominaisuuksia, kuten etenemisilmoituksia, pyyntöjen peruutusta, resurssimallipohjia ja virheiden käsittelymalleja. |
| [5.17 Vastakkaisten monien agenttien päättely](./mcp-adversarial-agents/README.md) | Vastakkaiset agentit | Käytä kahta vastakkaista näkemystä omaavaa agenttia, jotka jakavat yhden MCP-työkalupaketin, paljastaakseen harhoja, pintauttaakseen reunatapauksia ja tuottaakseen paremmin kalibroituja tuloksia rakenteellisen väittelyn avulla. |

> **Uutta MCP-määrityksessä 2025-11-25**: Määritys sisältää nyt kokeellisen tuen **Tehtäville** (pitkäkestoiset toiminnot etenemisen seurannalla), **Työkalujen annotaatioille** (metadataa työkalun käyttäytymisestä turvallisuutta varten), **URL-tilan esille kutsumiselle** (pyynnöt tietystä URL-sisällöstä asiakkailta) sekä parannelluille **Juuri-konteksteille** (työtila-kontekstinhallinnassa). Katso [MCP-määrityksen muutospäiväkirja](https://spec.modelcontextprotocol.io/) täydellisiä tietoja varten.

## Lisälähteet

Ajantasaisinta tietoa edistyneistä MCP-aiheista saat:
- [MCP-dokumentaatio](https://modelcontextprotocol.io/)
- [MCP-määritys (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub-repositorio](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turvallisuusriskit ja lieventämiskeinot
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Käytännön turvallisuuskoulutus

## Keskeiset opit

- Monimodaaliset MCP-toteutukset laajentavat tekoälyn kyvykkyyksiä tekstinkäsittelyn ulkopuolelle
- Skaalautuvuus on välttämätöntä yritystason käyttöönotossa ja sen voi toteuttaa vaakasuoran ja pystysuoran skaalaamisen avulla
- Kattavat turvallisuustoimenpiteet suojaavat dataa ja varmistavat asianmukaisen käyttöoikeuksien hallinnan
- Yritysten integraatio alustoilla kuten Azure OpenAI ja Microsoft AI Foundry parantaa MCP:n kyvykkyyksiä
- Edistyneet MCP-toteutukset hyötyvät optimoiduista arkkitehtuureista ja huolellisesta resurssien hallinnasta

## Harjoitus

Suunnittele yritystason MCP-toteutus tiettyä käyttötarkoitusta varten:

1. Määrittele käyttötapauksesi monimodaaliset vaatimukset
2. Laadi suojausmekanismit arkaluontoisten tietojen suojaamiseksi
3. Suunnittele skaalautuva arkkitehtuuri, joka käsittelee vaihtelevaa kuormitusta
4. Suunnittele integrointipisteet yrityksen tekoälyjärjestelmiin
5. Dokumentoi mahdolliset suorituskyvyn pullonkaulat ja lieventämisstrategiat

## Lisäresurssit

- [Azure OpenAI -dokumentaatio](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry -dokumentaatio](https://learn.microsoft.com/en-us/ai-services/)

---

## Mitä seuraavaksi

Tutustu tämän moduulin oppitunteihin aloittaen: [5.1 MCP-integrointi](./mcp-integration/README.md)

Kun olet suorittanut tämän moduulin, jatka: [Moduuli 6: Yhteisön kontribuutiot](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->