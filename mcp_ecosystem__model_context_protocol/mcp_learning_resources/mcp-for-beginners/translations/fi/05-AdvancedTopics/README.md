# Edistyneet aiheet MCP:ssä

[![Edistynyt MCP: Turvalliset, skaalautuvat ja multimodaaliset tekoälyagentit](../../../translated_images/fi/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Napsauta yllä olevaa kuvaa nähdäksesi tämän oppitunnin videon)_

Tämä luku käsittelee joukon edistyneitä aiheita Model Context Protocolin (MCP) toteutuksessa, mukaan lukien multimodaalinen integraatio, skaalautuvuus, turvallisuuden parhaat käytännöt ja yritysintegraatio. Nämä aiheet ovat ratkaisevia vahvojen ja tuotantovalmiiden MCP-sovellusten rakentamisessa, jotka voivat vastata nykyaikaisten tekoälyjärjestelmien vaatimuksiin.

## Yleiskatsaus

Tässä oppitunnissa tutkitaan edistyneitä käsitteitä Model Context Protocolin toteutuksessa, keskittyen multimodaaliseen integraatioon, skaalautuvuuteen, turvallisuuden parhaisiin käytäntöihin ja yritysintegraatioon. Nämä aiheet ovat välttämättömiä tuotantotason MCP-sovellusten rakentamisessa, jotka pystyvät käsittelemään monimutkaisia vaatimuksia yritysympäristöissä.

> **Katse eteenpäin:** useampaan alla olevaan aiheeseen vaikuttaa `2026-07-28` MCP-spesifikaation julkaisuehdokas — Juurikontekstit (5.4) ja Otannat (5.6) perustuvat perustoimintoihin, jotka julkaisuehdokas merkitsee vanhentuneiksi, ja kokeellinen Tehtävät-ominaisuus, johon viitataan Protokoilin ominaisuudet (5.16) -osassa, siirtyy omaksi Tehtävät-laajennuksekseen. Lisätietoja löytyy kohdasta [What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Oppimistavoitteet

Tämän oppitunnin jälkeen osaat:

- Toteuttaa multimodaalisia ominaisuuksia MCP-kehyksissä
- Suunnitella skaalautuvia MCP-arkkitehtuureja korkeiden kuormitusvaatimusten tilanteisiin
- Soveltaa turvallisuuden parhaita käytäntöjä MCP:n turvaperiaatteiden mukaisesti
- Integroituja MCP yritysten tekoälyjärjestelmiin ja kehyksiin
- Optimoida suorituskykyä ja luotettavuutta tuotantoympäristöissä

## Oppitunnit ja esimerkkiprojektit

| Linkki | Otsikko | Kuvaus |
|------|-------|-------------|
| [5.1 Integraatio Azureen](./mcp-integration/README.md) | Integrointi Azureen | Opi miten integroida MCP-palvelimesi Azureen |
| [5.2 Multimodaalinen esimerkki](./mcp-multi-modality/README.md) | MCP multimodaaliset esimerkit | Esimerkkejä ääni-, kuva- ja multimodaalisista vastauksista |
| [5.3 MCP OAuth2 esimerkki](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimipään Spring Boot-sovellus, joka näyttää OAuth2:n MCP:n kanssa sekä valtuutus- että resurssipalvelimena. Esittelee turvallisen tunnuksen myöntämisen, suojatut päätepisteet, Azure Container Apps -käytön ja API-hallinnan integraation. |
| [5.4 Juurikontekstit](./mcp-root-contexts/README.md) | Juurikontekstit | Opi lisää juurikontekstista ja sen toteuttamisesta (vanhentunut `2026-07-28` julkaisuehdokkaassa; edelleen voimassa `2025-11-25`) |
| [5.5 Reititys](./mcp-routing/README.md) | Reititys | Opi eri reititystyypeistä |
| [5.6 Otanta](./mcp-sampling/README.md) | Otanta | Opi miten työskennellä otannan kanssa (vanhentunut `2026-07-28` julkaisuehdokkaassa; edelleen voimassa `2025-11-25`) |
| [5.7 Skaalaus](./mcp-scaling/README.md) | Skaalaus | Opi skaalauksesta |
| [5.8 Turvallisuus](./mcp-security/README.md) | Turvallisuus | Turvaa MCP-palvelimesi |
| [5.9 Web-hakuesimerkki](./web-search-mcp/README.md) | Web-haku MCP:llä | Python MCP-palvelin ja -asiakas, jotka integroivat SerpAPI:n reaaliaikaiseen verkko-, uutis-, tuotehakuun ja kysymys-vastaus -toimintoihin. Esittelee monityökalujen yhteistoimintaa, ulkoista API-integraatiota ja vankkaa virheenkäsittelyä. |
| [5.10 Reaaliaikainen suoratoisto](./mcp-realtimestreaming/README.md) | Suoratoisto | Reaaliaikainen datavirtaus on nykymaailmassa olennainen, missä yritykset ja sovellukset tarvitsevat välittömän tiedonsaannin tehdä päätöksiä oikea-aikaisesti.|
| [5.11 Reaaliaikainen web-haku](./mcp-realtimesearch/README.md) | Web-haku | Kuinka MCP muuttaa reaaliaikaista web-hakua tarjoamalla standardoidun lähestymistavan kontekstinhallintaan tekoälymallien, hakukoneiden ja sovellusten välillä.| 
| [5.12 Entra ID -todennus Model Context Protocol -palvelimille](./mcp-security-entra/README.md) | Entra ID -todennus | Microsoft Entra ID tarjoaa vahvan pilvipohjaisen identiteetin ja pääsynhallinnan ratkaisun, joka varmistaa, että vain valtuutetut käyttäjät ja sovellukset voivat olla vuorovaikutuksessa MCP-palvelimesi kanssa.|
| [5.13 Microsoft Foundry Agent -integraatio](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry -integraatio | Opi miten integroida Model Context Protocol -palvelimet Microsoft Foundry -agenttien kanssa, mahdollistaen tehokas työkalujen orkestrointi ja yritystason tekoälyominaisuudet standardoitujen ulkoisten tietolähteiden liitäntöjen avulla.|
| [5.14 Konteksti-insinöörityö](./mcp-contextengineering/README.md) | Konteksti-insinöörityö | Tulevaisuuden mahdollisuudet konteksti-insinöörityötekniikoissa MCP-palvelimille, mukaan lukien kontekstin optimointi, dynaaminen kontekstinhallinta ja tehokkaat prompttien suunnittelustrategiat MCP-kehyksissä.|
| [5.15 MCP mukautettu siirto](./mcp-transport/README.md) | Mukautettu siirto | Opi toteuttamaan mukautettuja siirtomekanismeja erikoistuneisiin MCP-viestintätilanteisiin.|
| [5.16 Protokoilin ominaisuudet perusteellisesti](./mcp-protocol-features/README.md) | Protokoilin ominaisuudet | Hallitse edistyneitä protokollaominaisuuksia kuten etenemishälytykset, pyyntöjen peruutukset, resurssimallit ja virheenkäsittelymallit.|
| [5.17 Vastakkainasetteluun perustuva monitahoajakeskustelu](./mcp-adversarial-agents/README.md) | Vastakkaiset agentit | Käytä kahta vastakkaista agenttia, jotka jakavat yhden MCP-työkalujoukon, havaitsemaan harhoja, nostaen esiin reunatapauksia ja tuottamaan paremmin kalibroitua tulosta rakenteellisen väittelyn avulla.|

> **Uutta MCP-spesifikaatiossa 2025-11-25**: Spesifikaatio sisältää nyt kokeellisen tuen **Tehtäville** (pitkäkestoiset operaatiot etenemisen seurannalla), **Työkalujen merkinnöille** (työkalun käyttäytymisen metatiedot turvallisuutta varten), **URL-tilan kyselylle** (asiakkailta pyydetty tietty URL-sisältö) ja parannetuille **Juurille** (työpajakontekstinhallintaan). Katso täydelliset tiedot [MCP Spesifikaatio muutosloki](https://spec.modelcontextprotocol.io/).

## Lisäviitteet

Ajantasaisimman tiedon edistyneistä MCP-aiheista löydät seuraavista:
- [MCP Dokumentaatio](https://modelcontextprotocol.io/)
- [MCP Spesifikaatio (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repositorio](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turvariskit ja niiden vähentäminen
- [MCP Security Summit työpaja (Sherpa)](https://azure-samples.github.io/sherpa/) - Käytännön turvallisuuskoulutus

## Tärkeimmät opit

- Multimodaaliset MCP-toteutukset laajentavat tekoälykyvykkyyksiä tekstinkäsittelyn ulkopuolelle
- Skaalautuvuus on oleellista yrityskäyttöönotossa ja sen voi saavuttaa vaakasuoran ja pystysuoran skaalaamisen kautta
- Kattavat turvallisuustoimenpiteet suojaavat dataa ja varmistavat asianmukaisen pääsynvalvonnan
- Yritysintegraatio alustoihin kuten Azure OpenAI ja Microsoft AI Foundry parantaa MCP:n kyvykkyyksiä
- Edistyneet MCP-toteutukset hyötyvät optimoiduista arkkitehtuureista ja huolellisesta resurssien hallinnasta

## Harjoitus

Suunnittele yritystason MCP-toteutus tietylle käyttötarkoitukselle:

1. Määrittele multimodaaliset vaatimukset käyttötapauksellesi
2. Laadi turvallisuusvalvontatoimenpiteet arkaluontoisen datan suojaamiseksi
3. Suunnittele skaalautuva arkkitehtuuri, joka pystyy käsittelemään vaihtelevaa kuormitusta
4. Suunnittele integraatiopisteet yritysten tekoälyjärjestelmiin
5. Dokumentoi mahdolliset suorituskyvyn pullonkaulat ja lieventämisstrategiat

## Lisäresurssit

- [Azure OpenAI Dokumentaatio](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Dokumentaatio](https://learn.microsoft.com/en-us/ai-services/)

---

## Mitä seuraavaksi

Tutustu tämän moduulin oppitunteihin aloittaen: [5.1 MCP Integraatio](./mcp-integration/README.md)

Kun olet suorittanut tämän moduulin, jatka: [Moduuli 6: Yhteisöpanokset](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->