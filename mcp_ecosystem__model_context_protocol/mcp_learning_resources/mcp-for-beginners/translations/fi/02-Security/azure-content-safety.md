# Edistynyt MCP-turvallisuus Azure Content Safetyn avulla

> **OWASP MCP -riski:** [MCP06 - Kehotteen injektointi kontekstuaalisten sisältöjen kautta](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety tarjoaa useita tehokkaita työkaluja, jotka voivat parantaa MCP-ratkaisujesi turvallisuutta. Käytännön toteutuskokemusta varten katso [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Kehotteen suojukset

Microsoftin AI Prompt Shields -suojat tarjoavat vahvan suojan sekä suoria että epäsuoria kehotteen injektointihyökkäyksiä vastaan seuraavien keinojen avulla:

1. **Edistynyt tunnistus**: Hyödyntää koneoppimista haitallisten ohjeiden tunnistamiseen sisällössä.
2. **Korostus**: Muuntaa syötteen tekstiä auttaakseen AI-järjestelmiä erottamaan pätevät ohjeet ulkoisista syötteistä.
3. **Erajat ja datamerkintä**: Merkitsee rajat luotettavan ja epäluotettavan datan välillä.
4. **Content Safety -integraatio**: Yhteistyössä Azure AI Content Safetyn kanssa havaitsee jailbreak-yritykset ja haitallisen sisällön.
5. **Jatkuvat päivitykset**: Microsoft päivittää säännöllisesti suojausmekanismeja nousevia uhkia vastaan.

## Azure Content Safetyn käyttöönotto MCP:n kanssa

Tämä lähestymistapa tarjoaa monikerroksisen suojan:
- Syötteiden skannaus ennen käsittelyä
- Tulosteiden validointi ennen palautusta
- Estolistojen käyttö tunnettujen haitallisten kaavojen torjuntaan
- Azuren jatkuvasti päivittyvien content safety -mallien hyödyntäminen

## Azure Content Safety -resurssit

Lisätietoja Azure Content Safetyn käyttöönotosta MCP-palvelimillasi löydät näistä virallisista lähteistä:

1. [Azure AI Content Safety -dokumentaatio](https://learn.microsoft.com/azure/ai-services/content-safety/) – Virallinen dokumentaatio Azure Content Safetysta.
2. [Prompt Shield -dokumentaatio](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) – Opas kehotteen injektointihyökkäysten ehkäisyyn.
3. [Content Safety API -referenssi](https://learn.microsoft.com/rest/api/contentsafety/) – Yksityiskohtainen API-referenssi Content Safetyn toteuttamiseen.
4. [Pikaopas: Azure Content Safety C#:llä](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) – Nopean käyttöönoton opas C#:llä.
5. [Content Safety -asiakas kirjasto](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) – Asiakaskirjastot eri ohjelmointikielille.
6. [Jailbreak-yritysten tunnistus](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) – Erityinen ohjeistus jailbreak-yritysten havaitsemiseen ja torjuntaan.
7. [Parhaat käytännöt Content Safetyn toteuttamiseen](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) – Parhaat käytännöt tehokkaaseen Content Safety -käyttöönottoon.

Syvällisempää toteutusta varten katso [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Mitä seuraavaksi

- Lue: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Palaa: [Security Module Overview](./README.md)
- Jatka: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty tekoälypohjaisella käännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, automatisoiduissa käännöksissä saattaa esiintyä virheitä tai epätarkkuuksia. Alkuperäinen asiakirja omalla kielellään on pidettävä ensisijaisena lähteenä. Tärkeiden tietojen osalta suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tästä käännöksestä mahdollisesti aiheutuvista väärinymmärryksistä tai virheellisistä tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->