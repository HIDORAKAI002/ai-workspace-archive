# 🚀 MCP-palvelin PostgreSQL:llä – Kattava oppimisopas

## 🧠 Yleiskatsaus MCP-tietokantaintegraation oppimispolkuun

Tämä kattava oppimisopas opettaa, kuinka rakennat tuotantovalmiita **Model Context Protocol (MCP)** -palvelimia, jotka integroituvat tietokantoihin käytännön vähittäiskaupan analytiikkatoteutuksen kautta. Opit yrityskäyttöön soveltuvia malleja, mukaan lukien **Row Level Security (RLS)**, **semanttinen haku**, **Azure AI -integraatio** ja **monivuokrattujen tietojen käyttöoikeudet**.

Oletpa sitten backend-kehittäjä, tekoälyinsinööri tai data-arkkitehti, tämä opas tarjoaa strukturoitua oppimista todellisten esimerkkien ja käytännön harjoitusten avulla, jotka ohjaavat sinut seuraavan MCP-palvelinprojektin läpi https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Viralliset MCP-resurssit

- 📘 [MCP-dokumentaatio](https://modelcontextprotocol.io/) – Yksityiskohtaiset opetusohjelmat ja käyttäjäoppaat
- 📜 [MCP-määritys (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Protokollan arkkitehtuuri ja tekniset viitteet
- 🧑‍💻 [MCP GitHub-repositorio](https://github.com/modelcontextprotocol) – Avoimen lähdekoodin SDK:t, työkalut ja koodiesimerkit
- 🌐 [MCP-yhteisö](https://github.com/orgs/modelcontextprotocol/discussions) – Osallistu keskusteluihin ja yhteisön kehitykseen
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Turvallisuuden parhaat käytännöt ja riskienhallinta

## 🧭 MCP-tietokantaintegraation oppimispolku

### 📚 Kattava oppimisrakenne https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Laboraatio | Aihe | Kuvaus | Linkki |
|--------|-------|-------------|------|
| **Lab 1-3: Perusteet** | | | |
| 00 | [Johdanto MCP-tietokantaintegraatioon](./00-Introduction/README.md) | Yleiskatsaus MCP:hen tietokantaintegraation ja vähittäiskaupan analytiikan käyttöesimerkin kautta | [Aloita täältä](./00-Introduction/README.md) |
| 01 | [Perusarkkitehtuurin käsitteet](./01-Architecture/README.md) | MCP-palvelimen arkkitehtuurin, tietokantakerrosten ja turvallisuusmallien ymmärtäminen | [Opiskele](./01-Architecture/README.md) |
| 02 | [Turvallisuus ja monivuokrattavuus](./02-Security/README.md) | Row Level Security, todennus ja monivuokrattujen tietojen käyttöoikeudet | [Opiskele](./02-Security/README.md) |
| 03 | [Ympäristön pystytys](./03-Setup/README.md) | Kehitysympäristön, Dockerin ja Azuren resurssien perustaminen | [Pystytä](./03-Setup/README.md) |
| **Lab 4-6: MCP-palvelimen rakentaminen** | | | |
| 04 | [Tietokannan suunnittelu ja skeema](./04-Database/README.md) | PostgreSQL-pystytys, vähittäiskaupan skeeman suunnittelu ja esimerkkidata | [Rakenna](./04-Database/README.md) |
| 05 | [MCP-palvelimen toteutus](./05-MCP-Server/README.md) | FastMCP-palvelimen rakentaminen tietokantaintegraatiolla | [Rakenna](./05-MCP-Server/README.md) |
| 06 | [Työkalujen kehitys](./06-Tools/README.md) | Tietokantakyselytyökalujen ja skeeman introspektio-ominaisuuksien luominen | [Rakenna](./06-Tools/README.md) |
| **Lab 7-9: Edistyneet ominaisuudet** | | | |
| 07 | [Semanttisen haun integraatio](./07-Semantic-Search/README.md) | Vektoriesitysten toteutus Azure OpenAI:lla ja pgvectorilla | [Kehitä](./07-Semantic-Search/README.md) |
| 08 | [Testaus ja virheenkorjaus](./08-Testing/README.md) | Testausstrategiat, virheenkorjaustyökalut ja validointimenetelmät | [Testaa](./08-Testing/README.md) |
| 09 | [VS Code -integraatio](./09-VS-Code/README.md) | VS Code MCP-integraation ja tekoälychatin konfigurointi | [Integroi](./09-VS-Code/README.md) |
| **Lab 10-12: Tuotanto ja parhaat käytännöt** | | | |
| 10 | [Julkaisustrategiat](./10-Deployment/README.md) | Dockerin julkaisu, Azure Container Apps ja skaalausnäkökohdat | [Julkaise](./10-Deployment/README.md) |
| 11 | [Valvonta ja havaittavuus](./11-Monitoring/README.md) | Application Insights, lokitus, suorituskyvyn valvonta | [Valvo](./11-Monitoring/README.md) |
| 12 | [Parhaat käytännöt ja optimointi](./12-Best-Practices/README.md) | Suorituskyvyn optimointi, tietoturvan vahvistaminen ja tuotantovinkit | [Optimoi](./12-Best-Practices/README.md) |

### 💻 Mitä rakennat

Oppimispolun lopussa olet rakentanut täydellisen **Zava Retail Analytics MCP -palvelimen**, joka sisältää:

- **Monitauluisen vähittäiskaupan tietokannan** asiakastilauksineen, tuotteineen ja varastotietoineen
- **Row Level Security** myymäläkohtaiseen tiedon eristämiseen
- **Semanttinen tuotteen haku** Azure OpenAI -upotuksilla
- **VS Code AI Chat -integraation** luonnollisen kielen kyselyjä varten
- **Tuotantovalmiin julkaisun** Dockerilla ja Azurella
- **Kattavan valvonnan** Application Insightsilla

## 🎯 Oppimisen edellytykset

Jotta saat parhaan hyödyn tästä oppimispolusta, sinulla tulisi olla:

- **Ohjelmointikokemus**: Tuntemus Pythonista (suositeltu) tai vastaavista kielistä
- **Tietokantatieto**: Peruskäsitys SQL:stä ja relaatiotietokannoista
- **API-käsitteet**: REST API:en ja HTTP:n ymmärrys
- **Kehitystyökalut**: Kokemusta komentorivistä, Gitistä ja koodieditoreista
- **Pilvipalveluiden perusteet**: (Valinnainen) Perustiedot Azuresta tai vastaavista pilvialustoista
- **Docker-tuntemus**: (Valinnainen) Säilötekniikan perustietämys

### Tarvittavat työkalut

- **Docker Desktop** – PostgreSQL:n ja MCP-palvelimen ajamiseen
- **Azure CLI** – Pilviresurssien julkaisua varten
- **VS Code** – Kehitykseen ja MCP-integraatioon
- **Git** – Versionhallintaan
- **Python 3.8+** – MCP-palvelimen kehittämiseen

## 📚 Opas ja resurssit

Tähän oppimispolkuun sisältyy kattavia resursseja, jotka auttavat sinua etenemään tehokkaasti:

### Opas

Jokainen laboraatio sisältää:
- **Selkeät oppimistavoitteet** – Mitä saavutetaan
- **Askeltaiset ohjeet** – Yksityiskohtaiset toteutusoppaat
- **Koodiesimerkit** – Toimivia näytteitä selityksineen
- **Harjoitukset** – Käytännön harjoittelumahdollisuudet
- **Vianetsintäoppaat** – Yleisimmät ongelmat ja ratkaisut
- **Lisäresurssit** – Jatko-opiskelu ja laajempaan tutustumiseen

### Edellytysten tarkastelu

Ennen jokaisen laboratorion aloittamista löydät:
- **Tarvittavat tiedot** – Mitä tulisi osata ennakkoon
- **Ympäristön vahvistus** – Kuinka varmistaa ympäristön toimivuus
- **Aika-arviot** – Arvioitu suorituskausi
- **Oppimistulokset** – Mitä osaat koulutuksen jälkeen

### Suositellut oppimispolut

Valitse polkusi kokemustasosi mukaan:

#### 🟢 **Aloittelijan polku** (Uusi MCP:llä)
1. Varmista, että olet suorittanut aiemmin 0-10 kohdan [MCP for Beginners](https://aka.ms/mcp-for-beginners)
2. Suorita labit 00-03 kertaaksesi perusteet
3. Seuraa labit 04-06 käytännön rakentamista varten
4. Kokeile labit 07-09 käytännön käyttöä varten

#### 🟡 **Keskitaso** (Jonkin verran MCP-kokemusta)
1. Kertaa labit 00-01 tietokantakäsitteitä varten
2. Keskitä huomiosi labien 02-06 toteutukseen
3. Sukella syvemmälle labien 07-12 edistyneisiin ominaisuuksiin

#### 🔴 **Edistynyt** (Kokenut MCP:n käyttäjä)
1. Lue nopeasti labit 00-03 kontekstia varten
2. Keskity labien 04-09 tietokantaintegraatioon
3. Paneudu labien 10-12 tuotantojulkaisuun

## 🛠️ Näin hyödynnät oppimispolkua tehokkaasti

### Sarjallinen oppiminen (suositeltu)

Työskentele labien läpi järjestyksessä kattavan ymmärryksen saavuttamiseksi:

1. **Lue yleiskatsaus** – Ymmärrä, mitä opit
2. **Tarkista edellytykset** – Varmista, että tiedot ovat hallussa
3. **Seuraa askel askeleelta opastusta** – Toteuta oppiessasi
4. **Suorita harjoitukset** – Vahvista oppimista
5. **Kertaa pääkohdat** – Vahvista oppimistuloksia

### Kohdennettu oppiminen

Jos tarvitset tiettyjä taitoja:

- **Tietokantaintegraatio**: Keskity labihin 04-06
- **Turvallisuuden toteutus**: Paneudu labiin 02, 08, 12
- **AI/Semanttinen haku**: Syvenny labiin 07
- **Tuotantojulkaisu**: Opiskele labit 10-12

### Käytännön harjoittelu

Jokainen lab sisältää:
- **Toimivia koodiesimerkkejä** – Kopioi, muokkaa ja kokeile
- **Todellisia tilanteita** – Käytännön vähittäiskaupan analytiikkatapauksia
- **Vähittäinen vaikeusaste** – Rakenna yksinkertaisesta edistyneeseen
- **Validointivaiheet** – Varmista, että toteutus toimii

## 🌟 Yhteisö ja tuki

### Hanki apua

- **Azure AI Discord**: [Liity asiantuntijatukeen](https://discord.com/invite/ByRwuEEgH4)
- **GitHub-repo ja toteutusesimerkki**: [Julkaisu- ja resurssinäyte](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **MCP-yhteisö**: [Liity laajempaan MCP-keskusteluun](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Valmis aloittamaan?

Aloita matkasi **[Lab 00: Johdanto MCP-tietokantaintegraatioon](./00-Introduction/README.md)**

---

*Hallinnoi tuotantovalmiiden MCP-palvelimien rakentamista tietokantaintegraation avulla tämän kattavan, käytännönläheisen oppimiskokemuksen myötä.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:  
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, on hyvä huomioida, että automaattikäännöksissä saattaa olla virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen omalla kielellä on aina ensisijainen ja virallinen lähde. Tärkeissä asioissa suositellaan ammattilaisten tekemää ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->