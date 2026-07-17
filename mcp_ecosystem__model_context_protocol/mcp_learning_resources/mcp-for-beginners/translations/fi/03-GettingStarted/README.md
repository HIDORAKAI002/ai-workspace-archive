## Aloittaminen  

[![Rakennetaan ensimmäinen MCP-palvelimesi](../../../translated_images/fi/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Napsauta yllä olevaa kuvaa nähdäksesi tämän oppitunnin videon)_

Tämä osio koostuu useista oppitunneista:

- **1 Ensimmäinen palvelimesi**, tässä ensimmäisessä oppitunnissa opit luomaan ensimmäisen palvelimesi ja tarkastelemaan sitä inspector-työkalulla, arvokas tapa testata ja virheenkorjata palvelin, [oppitunnille](01-first-server/README.md)

- **2 Client**, tässä oppitunnissa opit kirjoittamaan clientin, joka voi yhdistää palvelimeesi, [oppitunnille](02-client/README.md)

- **3 Client LLM:llä**, vielä parempi tapa kirjoittaa client on lisätä siihen LLM, jotta se voi "neuvotella" palvelimesi kanssa siitä, mitä tehdä, [oppitunnille](03-llm-client/README.md)

- **4 GitHub Copilot Agent -tilan hyödyntäminen Visual Studio Codessa**. Tässä tarkastelemme MCP-palvelimen ajamista Visual Studio Coden sisällä, [oppitunnille](04-vscode/README.md)

- **5 stdio-siirtopalvelin** stdio-siirto on suositeltu standardi paikalliseen MCP-palvelin-client -kommunikointiin, tarjoten turvallisen aliohjelmaprosessipohjaisen tiedonsiirron sisäänrakennetulla prosessieristyksellä [oppitunnille](05-stdio-server/README.md)

- **6 HTTP-suoratoisto MCP:llä (Streamable HTTP)**. Opi modernista HTTP-suoratoistosiirrosta (suositeltu lähestymistapa etä-MCP-palvelimille [MCP-spesifikaation 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http) mukaisesti), etenemisilmoituksista ja siitä, miten toteuttaa skaalautuvia, reaaliaikaisia MCP-palvelimia ja clienttejä Streamable HTTP:n avulla. [oppitunnille](06-http-streaming/README.md)

- **7 AI Toolkitin käyttö VSCode:lle** MCP-clienttien ja palvelimien kulutukseen ja testaamiseen [oppitunnille](07-aitk/README.md)

- **8 Testaus**. Tässä keskitymme erityisesti siihen, miten voimme testata palvelintamme ja clienttiämme eri tavoin, [oppitunnille](08-testing/README.md)

- **9 Käyttöönotto**. Tässä luvussa tarkastelemme erilaisia tapoja ottaa käyttöön MCP-ratkaisuja, [oppitunnille](09-deployment/README.md)

- **10 Edistynyt palvelimen käyttö**. Tämä luku kattaa edistyneen palvelimen käytön, [oppitunnille](./10-advanced/README.md)

- **11 Auth**. Tämä luku käsittelee yksinkertaisen todennuksen lisäämistä, Basic Authista JWT:n ja RBAC:n käyttöön. Sinua suositellaan aloittamaan tästä ja sitten katsomaan Edistyneet aiheet luvussa 5 sekä suorittamaan lisäturvavahvistuksia luvun 2 suositusten mukaisesti, [oppitunnille](./11-simple-auth/README.md)

- **12 MCP Hosts**. Määritä ja käytä suosittuja MCP-isäntäclienttejä kuten Claude Desktop, Cursor, Cline ja Windsurf. Opi siirtotyyppejä ja vianmääritystä, [oppitunnille](./12-mcp-hosts/README.md)

- **13 MCP Inspector**. Virheenkorjaa ja testaa MCP-palvelimiasi vuorovaikutteisesti MCP Inspector -työkalulla. Opi vianmääritys-työkaluista, resursseista ja protokollaviesteistä, [oppitunnille](./13-mcp-inspector/README.md)

- **14 Sampling**. Luo MCP-palvelimia, jotka tekevät yhteistyötä MCP-clienttien kanssa LLM-tehtävissä (vanhentunut julkaisuehdokkaana `2026-07-28`; vielä voimassa `2025-11-25`). [oppitunnille](./14-sampling/README.md)

- **15 MCP Apps**. Rakenna MCP-palvelimia, jotka myös vastaavat käyttöliittymäohjeilla, [oppitunnille](./15-mcp-apps/README.md)

Model Context Protocol (MCP) on avoin protokolla, joka standardisoi, miten sovellukset tarjoavat kontekstia LLM-malleille. Ajattele MCP:tä kuin AI-sovellusten USB-C-porttina – se tarjoaa standardoidun tavan yhdistää AI-mallit eri datalähteisiin ja työkaluihin.

## Oppimistavoitteet

Tämän oppitunnin jälkeen osaat:

- Määrittää kehitysympäristöt MCP:lle C#:ssa, Javassa, Pythonissa, TypeScriptissä ja JavaScriptissä
- Rakentaa ja ottaa käyttöön perus MCP-palvelimia mukautetuilla ominaisuuksilla (resurssit, kehotteet ja työkalut)
- Luoda isäntäsovelluksia, jotka yhdistävät MCP-palvelimiin
- Testata ja virheenkorjata MCP-toteutuksia
- Ymmärtää yleisimmät käyttöönottohaasteet ja niiden ratkaisut
- Yhdistää MCP-toteutuksesi suosittuihin LLM-palveluihin

## MCP-ympäristösi määrittäminen

Ennen kuin aloitat työskentelyn MCP:n kanssa, on tärkeää valmistella kehitysympäristösi ja ymmärtää perus työnkulku. Tämä osio opastaa sinua alkuasetuksissa, jotta MCP:n kanssa aloitus sujuu hyvin.

### Esivaatimukset

Ennen MCP-kehitykseen sukeltamista varmista, että sinulla on:

- **Kehitysympäristö**: Valitut kielet (C#, Java, Python, TypeScript tai JavaScript)
- **IDE/editori**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm tai jokin moderni koodieditori
- **Paketinhallintaohjelmat**: NuGet, Maven/Gradle, pip tai npm/yarn
- **API-avaimet**: Kaikille AI-palveluille, joita aiot käyttää isäntäsovelluksissasi


### Viralliset SDK:t

Tulevissa luvuissa näet ratkaisuja, jotka on rakennettu Pythonilla, TypeScriptillä, Javalla ja .NET:llä. Tässä kaikki virallisesti tuetut SDK:t.

MCP tarjoaa viralliset SDK:t useille kielille (yhteensopiva [MCP-spesifikaation 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) kanssa):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Ylläpidetään yhteistyössä Microsoftin kanssa
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Ylläpidetään yhteistyössä Spring AI:n kanssa
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Virallinen TypeScript-toteutus
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Virallinen Python-toteutus (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Virallinen Kotlin-toteutus
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Ylläpidetään yhteistyössä Loopwork AI:n kanssa
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Virallinen Rust-toteutus
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Virallinen Go-toteutus

## Tärkeimmät johtopäätökset

- MCP-kehitysympäristön määrittäminen on suoraviivaista kielikohtaisilla SDK:illa
- MCP-palvelimien rakentamiseen kuuluu työkalujen luominen ja rekisteröinti selkein skeemoin
- MCP-clientit yhdistävät palvelimiin ja malleihin hyödyntääkseen laajennettuja ominaisuuksia
- Testaus ja virheenkorjaus ovat olennaisia luotettaville MCP-toteutuksille
- Käyttöönotto-vaihtoehdot vaihtelevat paikallisesta kehityksestä pilvipohjaisiin ratkaisuihin

## Harjoittelu

Meillä on joukko esimerkkejä, jotka täydentävät kunkin luvun harjoituksia tässä osiossa. Lisäksi jokaisessa luvussa on omat harjoitukset ja tehtävät.

- [Java-laskin](./samples/java/calculator/README.md)
- [.Net-laskin](../../../03-GettingStarted/samples/csharp)
- [JavaScript-laskin](./samples/javascript/README.md)
- [TypeScript-laskin](./samples/typescript/README.md)
- [Python-laskin](../../../03-GettingStarted/samples/python)

## Lisäresurssit

- [Agenttien rakentaminen Model Context Protocolilla Azuren avulla](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Etä-MCP Azure Container Appsilla (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Mitä seuraavaksi

Aloita ensimmäisestä oppitunnista: [Luodaan ensimmäinen MCP-palvelimesi](01-first-server/README.md)

Kun olet suorittanut tämän moduulin, jatka: [Moduuli 4: Käytännön toteutus](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->