# Case Study: Azure AI Travel Agents – Viiteimplementaatio

## Yleiskatsaus

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) on Microsoftin kehittämä kattava esimerkkiratkaisu, joka osoittaa, kuinka rakentaa monitoiminen, tekoälyllä toimiva matkasuunnittelu\-sovellus Model Context Protocolin (MCP), Azure OpenAI:n ja Azure AI Searchin avulla. Tämä projekti esittelee parhaita käytäntöjä monien tekoälyagenttien orkestroinnissa, yritysdatan integroinnissa ja turvallisen, laajennettavan alustan tarjoamisessa käytännön skenaarioihin.

## Keskeiset ominaisuudet
- **Moniagenttien orkestrointi:** Käyttää MCP:tä koordinoimaan erikoistuneita agenteja (esim. lento-, hotelli- ja matkareittiagentit), jotka tekevät yhteistyötä monimutkaisten matkasuunnittelutehtävien hoitamiseksi.
- **Yritysdataintegraatio:** Yhdistää Azure AI Searchiin ja muihin yritysdatalähteisiin tarjoten ajantasaisia, olennaisia tietoja matkasuosituksia varten.
- **Turvallinen, skaalautuva arkkitehtuuri:** Hyödyntää Azure-palveluita todennukseen, valtuutukseen ja skaalautuvaan käyttöönottoon noudattaen yritysturvallisuuden parhaita käytäntöjä.
- **Laajennettavat työkalut:** Toteuttaa uudelleenkäytettäviä MCP-työkaluja ja kehoteteemoja, mahdollistaen nopean mukautumisen uusiin toimialoihin tai liiketoimintavaatimuksiin.
- **Käyttäjäkokemus:** Tarjoaa keskustelukäyttöliittymän, jonka kautta käyttäjät voivat olla vuorovaikutuksessa matkatoimistojen kanssa, tehostettuna Azure OpenAI:lla ja MCP:llä.

## Arkkitehtuuri
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Arkkitehtuurikaavion kuvaus

Azure AI Travel Agents -ratkaisu on suunniteltu modulaarisuutta, skaalautuvuutta ja turvallista useiden tekoälyagenttien ja yritysdatalähteiden integraatiota varten. Pääkomponentit ja datavirta ovat seuraavat:

- **Käyttöliittymä:** Käyttäjät ovat vuorovaikutuksessa järjestelmän kanssa keskustelukäyttöliittymän (kuten verkkokeskustelu tai Teams-botti) kautta, joka lähettää käyttäjän kyselyt ja vastaanottaa matkasuosituksia.
- **MCP-palvelin:** Toimii keskeisenä orkestroijana, vastaanottaen käyttäjän syötteen, hallinnoiden kontekstia ja koordinoiden erikoistuneiden agenttien toimintaa (esim. FlightAgent, HotelAgent, ItineraryAgent) Model Context Protocolin kautta.
- **Tekoälyagentit:** Kukin agentti vastaa tietystä toimialasta (lennot, hotellit, matkareitit) ja on toteutettu MCP-työkaluna. Agentit käyttävät kehotepohjia ja logiikkaa käsitelläkseen pyyntöjä ja tuottaakseen vastauksia.
- **Azure OpenAI -palvelu:** Tarjoaa kehittynyttä luonnollisen kielen ymmärrystä ja generointia, mahdollistaen agenttien tulkita käyttäjän tarkoitusta ja tuottaa luonnollisen keskustelun vastauksia.
- **Azure AI Search & yritysdata:** Agentit kysyvät Azure AI Searchista ja muista yritysdatalähteistä saadakseen ajantasaisia tietoja lennoista, hotelleista ja matka\-vaihtoehdoista.
- **Tunnistus ja turvallisuus:** Integroituu Microsoft Entra ID:hen turvallista tunnistautumista varten ja soveltaa vähimmän oikeuden periaatetta kaikkiin resursseihin.
- **Käyttöönotto:** Suunniteltu otettavaksi käyttöön Azure Container Apps -ympäristöön varmistamaan skaalautuvuus, seuranta ja operatiivinen tehokkuus.

Tämä arkkitehtuuri mahdollistaa useiden tekoälyagenttien saumattoman orkestroinnin, turvallisen integraation yritysdatan kanssa ja vankan, laajennettavan alustan toimialakohtaisten tekoälyratkaisujen rakentamiseksi.

## Vaiheittainen selitys arkkitehtuurikaaviosta
Kuvittele suunnittelevasi isoa matkaa ja sinulla on joukko asiantuntija-assistentteja auttamassa sinua joka yksityiskohdassa. Azure AI Travel Agents -järjestelmä toimii samalla tavalla, käyttäen eri osia (kuin tiimin jäseniä), joilla jokaisella on oma erikoistehtävänsä. Näin kaikki sopii yhteen:

### Käyttöliittymä (UI):
Ajattele tätä kuin matkatoimiston palvelutiskiä. Siellä sinä (käyttäjä) esität kysymyksiä tai teet pyyntöjä, kuten ”Löydä lento Pariisiin.” Tämä voi olla chat-ikkuna verkkosivulla tai viestisovellus.

### MCP-palvelin (Koordinaattori):
MCP-palvelin on kuin johtaja, joka kuuntelee pyyntöäsi palvelutiskillä ja päättää, minkä erikoisasiantuntijan tulisi hoitaa kukin osa. Se pitää kirjaa keskustelustasi ja varmistaa, että kaikki sujuu sujuvasti.

### Tekoälyagentit (Erikoisavustajat):
Jokainen agentti on asiantuntija tietyllä alueella – yksi tietää kaiken lennoista, toinen hotelleista ja kolmas matkareitin suunnittelusta. Kun pyydät matkaa, MCP-palvelin lähettää pyyntösi oikealle agentille(t). Nämä agentit käyttävät tietämystään ja työkalujaan löytääkseen sinulle parhaat vaihtoehdot.

### Azure OpenAI -palvelu (Kieliasiantuntija):
Tämä on kuin kieliasiantuntija, joka ymmärtää täsmälleen, mitä kysyt, riippumatta siitä, miten muotoilet sen. Se auttaa agenteja ymmärtämään pyyntösi ja vastaamaan luonnollisella, keskustelua muistuttavalla tavalla.

### Azure AI Search & yritysdata (Tietokirjasto):
Kuvittele valtava, ajantasainen kirjasto, jossa on kaikki viimeisimmät matkailutiedot – lentoaikataulut, hotellien saatavuus ja muuta. Agentit etsivät tästä kirjastosta saadakseen tarkimmat vastaukset sinulle.

### Tunnistus ja turvallisuus (Turvamies):
Kuten turvamies tarkastaa, kuka saa mennä tiettyihin alueisiin, tämä osa varmistaa, että vain valtuutetut ihmiset ja agentit pääsevät käsiksi arkaluonteiseen tietoon. Se pitää tietosi turvassa ja yksityisinä.

### Käyttöönotto Azure Container Appsissa (Rakennus):
Kaikki nämä avustajat ja työkalut toimivat yhdessä turvallisessa, skaalautuvassa rakennuksessa (pilvessä). Tämä tarkoittaa, että järjestelmä pystyy käsittelemään monta käyttäjää yhtä aikaa ja on aina saatavilla, kun tarvitset sitä.

## Miten kaikki toimii yhdessä:

Aloitat esittämällä kysymyksen palvelutiskillä (UI).
Johtaja (MCP-palvelin) selvittää, mikä erikoisasiantuntija (agentti) auttaa sinua.
Asiantuntija käyttää kieliasiantuntijaa (OpenAI) ymmärtääkseen pyyntösi ja kirjastoa (AI Search) löytääkseen parhaan vastauksen.
Turvamies (tunnistus) varmistaa, että kaikki on turvallista.
Kaikki tämä tapahtuu luotettavassa, skaalautuvassa rakennuksessa (Azure Container Apps), joten käyttökokemuksesi on sujuva ja turvallinen.
Tämä tiimityö sallii järjestelmän auttaa sinua nopeasti ja turvallisesti suunnittelemaan matkan, aivan kuin joukkue asiantuntijamatkanjärjestäjiä työskentelisi yhdessä modernissa toimistossa!

## Tekninen toteutus
- **MCP-palvelin:** Isännöi keskeistä orkestrointilogiiikkaa, tarjoaa agenttityökaluja ja hallinnoi kontekstia monivaiheisissa matkasuunnittelun työnkuluissa.
- **Agentit:** Kukin agentti (esim. FlightAgent, HotelAgent) on toteutettu MCP-työkaluna omine kehotepohjineen ja logiikkoineen.
- **Azure-integraatio:** Käyttää Azure OpenAI:ta luonnollisen kielen ymmärrykseen ja Azure AI Searchia datan hakemiseen.
- **Turvallisuus:** Integroituu Microsoft Entra ID:hen tunnistautumista varten ja soveltaa vähimmän oikeuden periaatetta kaikkiin resursseihin.
- **Käyttöönotto:** Tukee käyttöönottoa Azure Container Appsissa skaalautuvuuden ja operatiivisen tehokkuuden takaamiseksi.

## Tulokset ja vaikutus
- Näyttää, miten MCP:tä voidaan käyttää monien tekoälyagenttien orkestrointiin todellisessa, tuotantotason skenaariossa.
- Nopeuttaa ratkaisun kehitystä tarjoamalla uudelleenkäytettäviä malleja agenttien koordinointiin, dataintegrointiin ja turvalliseen käyttöönottoon.
- Toimii suunnitelmana toimialakohtaisten, tekoälyllä tehostettujen sovellusten rakentamiseen MCP:n ja Azure-palvelujen avulla.

## Viitteet
- [Azure AI Travel Agents GitHub -varasto](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Mitä seuraavaksi

- Takaisin: [Case Studies Overview](./README.md)
- Seuraava: [Updating ADO Items from YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttäen tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, tulee ottaa huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäisellä kielellä on pidettävä auktoriteettina. Tärkeiden tietojen osalta suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinkäsityksistä tai virhetulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->