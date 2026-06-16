# Edistynyt MCP:n turvallisuus Azure Content Safetyn avulla

> **OWASP MCP -riskin käsittely**: [MCP06 - Tarkoitetun suorituspolun väärinkäyttö](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety tarjoaa useita tehokkaita työkaluja, jotka voivat parantaa MCP-ratkaisujesi turvallisuutta. Käytännön toteutuskokemusta varten katso [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Käskyjen suojukset

Microsoftin AI Prompt Shields tarjoavat vahvan suojan sekä suoria että epäsuoria käskyjen injektiohyökkäyksiä vastaan seuraavasti:

1. **Edistynyt tunnistus**: Käyttää koneoppimista haitallisten ohjeiden tunnistamiseen sisällössä.
2. **Korostus**: Muokkaa syötettyä tekstiä auttaen AI-järjestelmiä erottamaan kelvolliset ohjeet ja ulkopuoliset syötteet.
3. **Erotinmerkit ja tietojen merkitseminen**: Merkitsee rajat luotettujen ja ei-luotettujen tietojen välillä.
4. **Sisällön turvallisuusintegraatio**: Toimii yhdessä Azure AI Content Safetyn kanssa havaitakseen jailbreak-yritykset ja haitallisen sisällön.
5. **Jatkuvat päivitykset**: Microsoft päivittää säännöllisesti suojausmekanismeja nousevia uhkia vastaan.

## Azure Content Safetyn käyttöönotto MCP:n kanssa

Tämä lähestymistapa tarjoaa monikerroksisen suojauksen:
- Syötteiden skannaus ennen käsittelyä
- Tulosten validointi ennen palauttamista
- Estolistojen käyttö tunnetuille haitallisille kaavoille
- Azuresta jatkuvasti päivitettyjen sisällön turvallisuusmallien hyödyntäminen

## Azure Content Safetyn resurssit

Jos haluat oppia lisää Azure Content Safetyn käyttöönotosta MCP-palvelimillasi, katso nämä viralliset resurssit:

1. [Azure AI Content Safety Dokumentaatio](https://learn.microsoft.com/azure/ai-services/content-safety/) - Virallinen dokumentaatio Azure Content Safetystä.
2. [Prompt Shield Dokumentaatio](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Opas käskyjen injektiohyökkäysten estämiseen.
3. [Content Safety API -viite](https://learn.microsoft.com/rest/api/contentsafety/) - Yksityiskohtainen API-viite Content Safetyn toteutukseen.
4. [Pikaopas: Azure Content Safety C#:llä](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Nopean käyttöönoton opas C#:llä.
5. [Content Safety -asiakasohjelmistokirjastot](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Asiakaskirjastot eri ohjelmointikielille.
6. [Jailbreak-yritysten tunnistus](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Erityisohjeet jailbreak-yritysten havaitsemiseen ja estämiseen.
7. [Parhaat käytännöt sisällön turvallisuudessa](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Parhaat käytännöt sisällön turvallisuuden tehokkaaseen toteutukseen.

Syvällisempää toteutusta varten katso [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Mitä seuraavaksi

- Lue: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Palaa: [Security Module Overview](./README.md)
- Jatka: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->