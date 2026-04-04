# Azure Content Safetyn toteuttaminen MCP:n kanssa

> **OWASP MCP Riskin kohde**: [MCP06 - Kehotteen injektio kontekstuaalisten latausten kautta](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

MCP-tietoturvan vahvistamiseksi kehotteiden injektiota, työkalujen myrkyttämistä ja muita tekoälyyn liittyviä haavoittuvuuksia vastaan suositellaan vahvasti Azure Content Safety -integraatiota. Tämä toteutusopas on linjassa [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3:n: I/O Security:n kanssa.

## Integrointi MCP-palvelimen kanssa

Azure Content Safetyn integroimiseksi MCP-palvelimeesi lisää sisältöturvafiltteri väliohjelmana pyyntöjen käsittelyputkeen:

1. Alusta suodatin palvelimen käynnistyessä
2. Vahvista kaikki saapuvat työkalupyyntöjä ennen käsittelyä
3. Tarkista kaikki lähtevät vastaukset ennen niiden palauttamista asiakkaille
4. Kirjaa ja hälytä turvarikkomuksista
5. Toteuta asianmukainen virheenkäsittely epäonnistuneille sisältöturvatarkistuksille

Tämä tarjoaa vahvan suojan seuraavia vastaan:
- Kehotteen injektiot hyökkäykset
- Työkalujen myrkytyspyynnöt
- Tietojen poisto haitallisten syötteiden kautta
- Haitallisen sisällön luonti

## Parhaat käytännöt Azure Content Safety -integroinnille

1. **Mukautetut estolistat**: Luo mukautettuja estolistoja erityisesti MCP:n injektiokuvioille
2. **Vakavuuden säädöt**: Säädä vakavuuskynnyksiä käyttötarkoituksesi ja riskinsietokykysi mukaan
3. **Laaja kattavuus**: Käytä sisältöturvatekniikoita kaikkiin syötteisiin ja tulosteisiin
4. **Suorituskyvyn optimointi**: Harkitse välimuistin käyttöä toistuvissa sisältöturvatarkistuksissa
5. **Varatoiminnot**: Määrittele selkeät varatoimintatavat, kun sisältöturvapalvelut eivät ole käytettävissä
6. **Käyttäjäpalautteet**: Tarjoa selkeää palautetta käyttäjille, kun sisältö estetään turvasyistä
7. **Jatkuva parantaminen**: Päivitä estolistoja ja kuvioita säännöllisesti uusien uhkien mukaan

## Lisäresurssit

### OWASP MCP Tietoturvaohjeet
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kattava OWASP MCP Top 10 Azure-toteutuksella
- [MCP06 - Kehotteen injektio](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Yksityiskohtaiset kehotteiden injektion torjuntamallit
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Käytännön Camp 3: I/O Security kattaa sisältöturvan

### Azure-dokumentaatio
- [Azure Content Safety Yleiskatsaus](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields Dokumentaatio](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Aloitusopas](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Mitä seuraavaksi

- Palaa kohtaan: [Security Module Overview](./README.md)
- Jatka kohtaan: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty tekoälypohjaisella käännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta ota huomioon, että automaattiset käännökset voivat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä tulee katsoa viralliseksi lähteeksi. Tärkeissä tiedoissa suositellaan ammattimaista ihmiskäännöstä. Emme ota vastuuta käännöksen käytöstä johtuvista väärinymmärryksistä tai virhetulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->