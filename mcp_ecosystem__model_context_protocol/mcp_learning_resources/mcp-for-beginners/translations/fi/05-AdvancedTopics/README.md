# Kehittyneet aiheet MCP:ssä

[![Kehittynyt MCP: turvalliset, skaalautuvat ja multimodaaliset AI-agentit](../../../translated_images/fi/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klikkaa yllä olevaa kuvaa nähdäksesi tämän oppitunnin videon)_

Tässä luvussa käsitellään sarjaa kehittyneitä aiheita Model Context Protocolin (MCP) toteutuksessa, mukaan lukien multimodaalinen integraatio, skaalautuvuus, turvallisuuden parhaat käytännöt ja yritysintegraatio. Nämä aiheet ovat ratkaisevan tärkeitä vankkojen ja tuotantovalmiiden MCP-sovellusten rakentamisessa, jotka voivat täyttää nykyaikaisten AI-järjestelmien vaatimukset.

## Yleiskatsaus

Tämä oppitunti tutkii kehittyneitä käsitteitä Model Context Protocolin toteutuksessa keskittyen multimodaaliseen integraatioon, skaalautuvuuteen, turvallisuuden parhaisiin käytäntöihin ja yritysintegraatioon. Nämä aiheet ovat olennaisia tuotantotason MCP-sovellusten rakentamisessa, jotka pystyvät käsittelemään monimutkaisia vaatimuksia yritysympäristöissä.

> **Kurkistus tulevaan:** useat alla olevat aiheet vaikuttuvat `2026-07-28` MCP-spesifikaation julkaisuversiosta — Root Contexts (5.4) ja Sampling (5.6) rakentuvat primitiiveille, jotka julkaisuversio merkitsee vanhentuneiksi, ja kokeellinen Tasks-ominaisuus, joka mainitaan Protocol Features (5.16) -osassa, siirtyy omaan Tasks-laajennukseensa. Katso [Mitä MCP:ssä muuttuu: 2026-07-28 julkaisuversio](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) lisätietoja varten.

## Oppimistavoitteet

Tämän oppitunnin lopussa osaat:

- Toteuttaa multimodaaliset ominaisuudet MCP-kehyksissä
- Suunnitella skaalautuvia MCP-arkkitehtuureja korkean kysynnän skenaarioille
- Soveltaa turvallisuuden parhaita käytäntöjä MCP:n turvallisuusperiaatteiden mukaisesti
- Integroida MCP yrityksen AI-järjestelmiin ja kehyksiin
- Optimoida suorituskykyä ja luotettavuutta tuotantoympäristöissä

## Oppitunnit ja esimerkkiprojektit

| Linkki | Otsikko | Kuvaus |
|------|-------|-------------|
| [5.1 Integraatio Azuren kanssa](./mcp-integration/README.md) | Integraatio Azuren kanssa | Opettele integroimaan MCP-palvelimesi Azureen |
| [5.2 Monimodaalinen esimerkki](./mcp-multi-modality/README.md) | MCP monimodaaliset esimerkit | Esimerkkejä ääni-, kuva- ja monimodaalisista vastauksista |
| [5.3 MCP OAuth2 -esimerkki](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimiaalinen Spring Boot -sovellus, joka näyttää OAuth2:n MCP:n kanssa sekä valtuutus- että resurssipalvelimena. Demonstroi suojattua tokenin myöntämistä, suojattuja päätepisteitä, Azure Container Apps -käyttöönottoa ja API-hallinnan integraatiota. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Juurikontekstit | Lisätietoa juurikonteksteista ja niiden toteutuksesta |
| [5.5 Reititys](./mcp-routing/README.md) | Reititys | Opettele eri reititystyypit |
| [5.6 Otanta](./mcp-sampling/README.md) | Otanta | Opettele työskentelemään otannan kanssa |
| [5.7 Skaalaus](./mcp-scaling/README.md) | Skaalaus | Opettele skaalauksesta |
| [5.8 Turvallisuus](./mcp-security/README.md) | Turvallisuus | Suojaa MCP-palvelimesi |
| [5.9 Verkkohaku MCP](./web-search-mcp/README.md) | Verkkohaku MCP | Python MCP -palvelin ja asiakas, jotka integroivat SerpAPI:n reaaliaikaiseen verkkohakuun, uutisiin, tuotteiden hakuun ja Q&A:han. Demonstroi monityökalujen orkestrointia, ulkoisten API:en integraatiota ja vankkaa virheenkäsittelyä. |
| [5.10 Reaaliaikainen streamaus](./mcp-realtimestreaming/README.md) | Streamaus | Reaaliaikainen datan streamaus on nykymaailmassa välttämätöntä, kun liiketoiminnat ja sovellukset tarvitsevat välitöntä pääsyä tietoihin tehdäksensä oikea-aikaisia päätöksiä. |
| [5.11 Reaaliaikainen verkkohaku](./mcp-realtimesearch/README.md) | Verkkohaku | Kuinka MCP muuttaa reaaliaikaista verkkohakua tarjoamalla standardoidun lähestymistavan kontekstinhallintaan AI-mallien, hakukoneiden ja sovellusten välillä. | 
| [5.12 Entra ID -todennus Model Context Protocol -palvelimille](./mcp-security-entra/README.md) | Entra ID -todennus | Microsoft Entra ID tarjoaa vankan pilvipohjaisen identiteetin ja pääsynhallinnan ratkaisun, joka auttaa varmistamaan, että vain valtuutetut käyttäjät ja sovellukset voivat olla vuorovaikutuksessa MCP-palvelimesi kanssa. |
| [5.13 Microsoft Foundry Agent -integraatio](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry -integraatio | Opettele integroimaan Model Context Protocol -palvelimet Microsoft Foundry -agenttien kanssa, mahdollistaen tehokkaan työkalujen orkestroinnin ja yrityksen AI-ominaisuudet standardoitujen ulkoisten tietolähdeyhteyksien avulla. |
| [5.14 Kontextitekniikka](./mcp-contextengineering/README.md) | Kontextitekniikka | Kontextitekniikoiden tulevaisuuden mahdollisuudet MCP-palvelimille, mukaan lukien kontekstin optimointi, dynaaminen kontekstinhallinta ja tehokkaiden kehotteiden suunnittelustrategiat MCP-kehyksissä. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Mukautettu siirtotapa | Opettele toteuttamaan mukautettuja siirtomekanismeja erikoistuneisiin MCP-viestintätilanteisiin. |
| [5.16 Protokollan ominaisuudet syväsukellus](./mcp-protocol-features/README.md) | Protokollan ominaisuudet | Hallitse kehittyneitä protokollaominaisuuksia, kuten etenemisilmoitukset, pyyntöjen peruutus, resurssipohjat ja virheenkäsittelymallit. |
| [5.17 Vihamielinen moni-agenttien päättely](./mcp-adversarial-agents/README.md) | Vihamieliset agentit | Käytä kahta toisiaan vastaan olevaa agenttia jakamassa sama MCP-työkalusetti väärien havaintojen havaitsemiseen, äärimmäisten tapausten esiin tuomiseen ja paremmin kalibroitujen vastausten tuottamiseen strukturoidun väittelyn kautta. |

> **Uutta MCP-spesifikaatiossa 2025-11-25**: Spesifikaatio sisältää nyt kokeellista tukea **Tasks**-ominaisuudelle (pitkäkestoiset toiminnot etenemisen seurannalla), **Työkalujen merkinnöille** (metadata työkalun käyttäytymisestä turvallisuuden varmistamiseksi), **URL-tilan kyselylle** (pyytää tiettyä URL-sisältöä asiakkailta) ja parannuksille **Roots**-toiminnossa (työtilakontextin hallintaan). Katso [MCP Spec -muutosloki](https://spec.modelcontextprotocol.io/) täydellisiä tietoja varten.

## Lisäviitteet

Ajantasaisimpaan tietoon kehittyneistä MCP-aiheista viittaa:
- [MCP-dokumentaatio](https://modelcontextprotocol.io/)
- [MCP-spesifikaatio (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub-repositorio](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turvallisuusriskit ja niiden lieventäminen
- [MCP Security Summit -workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Käytännön turvallisuuskoulutus

## Tärkeimmät opit

- Monimodaaliset MCP-toteutukset laajentavat AI:n kykyjä pelkän tekstinkäsittelyn ulkopuolelle
- Skaalautuvuus on välttämätöntä yrityskäyttöön ja sen voi toteuttaa vaakasuunnassa ja pystysuunnassa skaalaten
- Kattavat turvallisuustoimet suojaavat dataa ja varmistavat oikean pääsynhallinnan
- Yritysintegraatio alustojen, kuten Azure OpenAI:n ja Microsoft AI Foundryn, kanssa tehostaa MCP:n kyvykkyyksiä
- Kehittyneet MCP-toteutukset hyötyvät optimoiduista arkkitehtuureista ja huolellisesta resurssinhallinnasta

## Harjoitus

Suunnittele yritystason MCP-toteutus tietylle käyttötapaukselle:

1. Määrittele käyttötapauksen monimodaaliset vaatimukset
2. Laadi suojausmekanismit arkaluonteisen datan suojaamiseksi
3. Suunnittele skaalautuva arkkitehtuuri vaihtelevan kuormituksen käsittelyyn
4. Suunnittele integraatiopisteet yrityksen AI-järjestelmien kanssa
5. Dokumentoi mahdolliset suorituskyvyn pullonkaulat ja niiden lieventämisstrategiat

## Lisäresurssit

- [Azure OpenAI -dokumentaatio](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry -dokumentaatio](https://learn.microsoft.com/en-us/ai-services/)

---

## Mitä seuraavaksi

Tutustu tämän moduulin oppitunteihin alkaen: [5.1 MCP-integraatio](./mcp-integration/README.md)

Kun olet suorittanut tämän moduulin, jatka: [Moduuli 6: Yhteisön kontribuutiot](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->