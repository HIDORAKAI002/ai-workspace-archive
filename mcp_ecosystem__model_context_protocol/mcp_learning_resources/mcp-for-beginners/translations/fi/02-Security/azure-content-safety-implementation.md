# Azure Content Safetyn toteuttaminen MCP:llä

> **OWASP MCP -riski käsitelty**: [MCP06 - Aikomuksen virheohjaus](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Vahvistaaksesi MCP:n suojausta kehotteiden manipulointia, työkalumyrkytyksiä ja muita tekoälykohtaisia haavoittuvuuksia vastaan, Azure Content Safetyn integrointi on erittäin suositeltavaa. Tämä toteutusopas mukailee [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Leiri 3: I/O-suojaus -työpajan ohjeita.

## Integrointi MCP-palvelimeen

Azure Content Safetyn integroimiseksi MCP-palvelimellesi lisää sisältöturvafiltteri väliohjelmistona pyyntöjen käsittelyputkeen:

1. Alusta suodatin palvelimen käynnistyksen yhteydessä
2. Vahvista kaikki saapuvat työkalupyynnöt ennen käsittelyä
3. Tarkista kaikki lähtevät vastaukset ennen niiden palauttamista asiakkaille
4. Kirjaa ja hälytä turvarikkomuksista
5. Toteuta asianmukainen virheenkäsittely epäonnistuneille sisältöturvatarkistuksille

Tämä tarjoaa vahvan suojan seuraavia vastaan:
- Kehotteen manipulointihyökkäykset
- Työkalumyrkytyspyynnöt
- Haitallisten syötteiden kautta tapahtuva tietovuoto
- Haitallisen sisällön luominen

## Parhaat käytännöt Azure Content Safetyn integrointiin

1. **Omat estolistat**: Luo MCP:n injektiokuvioita varten räätälöidyt estolistat
2. **Vakavuustason säätö**: Säädä vakavuuskynnykset tarpeidesi ja riskinsietokykysi mukaan
3. **Laaja kattavuus**: Käytä sisältöturvatarkistuksia kaikissa syötteissä ja lähtötiedoissa
4. **Suorituskyvyn optimointi**: Harkitse välimuistin käyttöä toistuviin sisältöturvatarkistuksiin
5. **Varajärjestelmät**: Määrittele selkeät varakäytännöt, kun sisältöturvapalvelut eivät ole saatavilla
6. **Käyttäjäpalautteen tarjoaminen**: Anna selkeää palautetta käyttäjille, kun sisältö estetään turvasyistä
7. **Jatkuva parantaminen**: Päivitä säännöllisesti estolistoja ja kuvioita nousevien uhkien mukaan

## Lisäresurssit

### OWASP MCP:n suojausohjeet
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kattava OWASP MCP Top 10 Azure-toteutuksella
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Yksityiskohtaiset kehotteen manipuloinnin torjuntamallit
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Käytännön Leiri 3: I/O-suojaus kattaa sisältöturvan

### Azure-dokumentaatio
- [Azure Content Safety - Yleiskatsaus](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields - Dokumentaatio](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety - Aloitusopas](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Seuraavat vaiheet

- Palaa kohtaan: [Security Module Overview](./README.md)
- Jatka: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->