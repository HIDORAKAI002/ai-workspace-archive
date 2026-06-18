# Johdanto MCP-tietokantaintegraatioon

## 🎯 Mitä tämä harjoitus kattaa

Tämä johdantoharjoitus tarjoaa kattavan yleiskatsauksen Model Context Protocol (MCP) -palvelinten rakentamisesta tietokantaintegraation kanssa. Ymmärrät liiketoiminnan taustan, teknisen arkkitehtuurin ja käytännön sovellukset Zava Retail -analyyttisen käyttötapauksen kautta osoitteessa https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Yleiskatsaus

**Model Context Protocol (MCP)** mahdollistaa tekoälyavustajien turvallisen pääsyn ja vuorovaikutuksen ulkoisten tietolähteiden kanssa reaaliaikaisesti. Kun tämä yhdistetään tietokantaintegraatioon, MCP avaa tehokkaita mahdollisuuksia datalähtöisille tekoälysovelluksille.

Tämä oppimispolku opettaa rakentamaan tuotantovalmiita MCP-palvelimia, jotka yhdistävät tekoälyavustajat vähittäiskaupan myyntidataan PostgreSQL:n kautta, toteuttaen yritystason malleja kuten rivitason tietoturvan, semanttisen haun ja monivuokraajapohjaisen datan käytön.

## Oppimistavoitteet

Tämän harjoituksen jälkeen osaat:

- **Määritellä** Model Context Protocolin ja sen keskeiset hyödyt tietokantaintegraatiossa  
- **Tunnistaa** MCP-palvelinarkkitehtuurin tärkeimmät osat tietokantojen kanssa  
- **Ymmärtää** Zava Retail -käyttötapauksen ja sen liiketoimintavaatimukset  
- **Tunnistaa** yritystason mallit turvalliseen ja skaalautuvaan tietokantakäyttöön  
- **Luetella** tämän oppimispolun aikana käytetyt työkalut ja teknologiat  

## 🧭 Haaste: Tekoäly kohtaa todelliset tiedot

### Perinteiset tekoälyrajoitukset

Nykyaikaiset tekoälyavustajat ovat uskomattoman tehokkaita, mutta kohtaavat merkittäviä rajoituksia työskennellessään todellisen liiketoimintadatan kanssa:

| **Haaste** | **Kuvaus** | **Liiketoimintavaikutus** |
|------------|------------|---------------------------|
| **Staattinen tieto** | Tekoälymallit on koulutettu kiinteillä aineistoilla, eivät pääse käsiksi ajantasaiseen liiketoimintadataan | Vanhentuneet havainnot, menetetyt mahdollisuudet |
| **Datasaarekkeet** | Tieto on lukittuna tietokantoihin, API-rajapintoihin ja järjestelmiin, joihin tekoäly ei pääse | Epätäydellinen analyysi, sirpaleiset työnkulut |
| **Turvallisuusrajoitteet** | Suora pääsy tietokantaan aiheuttaa turvallisuus- ja vaatimustenmukaisuushuolia | Rajoitettu käyttää, manuaalinen datan valmistelu |
| **Monimutkaiset kyselyt** | Liiketoimintakäyttäjillä vaaditaan teknistä osaamista datan hakemiseen | Heikko käyttöönotto, tehottomat prosessit |

### MCP-ratkaisu

Model Context Protocol vastaa näihin haasteisiin tarjoamalla:

- **Reaaliaikainen datan käyttö**: Tekoälyavustajat voivat kysellä suoria tietokantoja ja API-rajapintoja  
- **Turvallinen integraatio**: Hallittu pääsy autentikoinnin ja käyttöoikeuksien avulla  
- **Luonnollisen kielen rajapinta**: Liiketoimintakäyttäjät voivat esittää kysymyksiä tavallisella englannilla  
- **Standardoitu protokolla**: Toimii eri tekoälyalustojen ja työkalujen kanssa  

## 🏪 Tapaa Zava Retail: Oppimistapauksemme https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Tämän oppimispolun aikana rakennamme MCP-palvelimen **Zava Retailille**, kuvitteelliselle tee-se-itse -vähittäiskauppaketjulle, jolla on useita myymälöitä. Tämä realistinen skenaario havainnollistaa yritystason MCP-toteutusta.

### Liiketoimintaympäristö

**Zava Retaililla** on:
- **8 fyysistä myymälää** Washingtonin osavaltiossa (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 verkkokauppa** verkkokauppamyyntiä varten  
- **Monipuolinen tuotekatalogi**, joka sisältää työkaluja, rautakauppatavaroita, puutarhatarvikkeita ja rakennusmateriaaleja  
- **Monitasoinen johtamisrakenne** mukana myymäläpäälliköt, aluepäälliköt ja johto  

### Liiketoimintavaatimukset

Myymäläpäälliköt ja johto tarvitsevat tekoälypohjaisia analyysejä seuraaviin tarpeisiin:

1. **Myynnin suorituskyvyn analyysi** eri myymälöissä ja ajanjaksoilla  
2. **Varastotasojen seuranta** ja uudelleen täyttötarpeiden tunnistaminen  
3. **Asiakaskäyttäytymisen ja ostotottumusten ymmärtäminen**  
4. **Tuoteinformaation löytäminen** semanttisen haun avulla  
5. **Raporttien luonti** luonnollisen kielen kyselyillä  
6. **Datan turvallisuuden ylläpito** roolipohjaisella pääsynhallinnalla  

### Teknisiä vaatimuksia

MCP-palvelimen on tarjottava:

- **Monivuokraajapohjainen pääsy dataan**, jossa myymäläpäälliköt näkevät vain oman myymälänsä tiedot  
- **Joustava kysely** monimutkaisten SQL-operaatioiden tukemiseksi  
- **Semanttinen haku** tuotteen löytämiseen ja suosituksien tekoon  
- **Reaaliaikainen data** joka heijastaa liiketoiminnan nykytilaa  
- **Turvallinen autentikointi** rivitason tietoturvalla (RLS)  
- **Skaalautuva arkkitehtuuri** useiden yhtäaikaisten käyttäjien tukemiseksi  

## 🏗️ MCP-palvelinarkkitehtuurin yleiskatsaus

MCP-palvelimemme toteuttaa kerrostetun arkkitehtuurin, joka on optimoitu tietokantaintegraatiolle:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Keskeiset komponentit

#### **1. MCP-palvelinkerros**
- **FastMCP Framework**: Nykyaikainen Python-pohjainen MCP-palvelin
- **Työkalujen rekisteröinti**: Deklaratiiviset työkalumäärittelyt ja tyypintarkastus
- **Pyyntöjen konteksti**: Käyttäjätunnistuksen ja istunnon hallinta
- **Virheenkäsittely**: Vankka virheiden hallinta ja lokitus

#### **2. Tietokantaintegraatiokerros**
- **Yhteyspooling**: Tehokas asyncpg-yhteyshallinta
- **Skeemantarjoaja**: Dynaaminen taulujen skeemojen löytäminen
- **Kyselyjen suorittaja**: Turvallinen SQL:n ajaminen RLS-kontekstilla
- **Transaktioiden hallinta**: ACID-vaatimusten noudattaminen ja peruutus

#### **3. Turvallisuuskerros**
- **Rivitason tietoturva**: PostgreSQL:n RLS monivuokraajadatainformaation eristämiseen
- **Käyttäjätunnistus**: Myymäläpäälliköiden autentikointi ja valtuutukset
- **Pääsynhallinta**: Tarkat käyttöoikeudet ja audit-lokit
- **Syötteiden validointi**: SQL-injektioiden ennaltaehkäisy ja kyselyjen tarkastus

#### **4. Tekoälykerros**
- **Semanttinen haku**: Vektoriesitykset tuotteen löytämiseen
- **Azure OpenAI -integraatio**: Tekstiesitysten generointi
- **Samanlaisuusaloritmit**: pgvector-kosinietäisyyshaku
- **Haun optimointi**: Indeksointi ja suorituskyvyn viritys  

## 🔧 Teknologiapino

### Keskeiset teknologiat

| **Komponentti** | **Teknologia** | **Tarkoitus** |
|-----------------|----------------|---------------|
| **MCP Framework** | FastMCP (Python) | Nykyaikainen MCP-palvelin |
| **Tietokanta** | PostgreSQL 17 + pgvector | Relaatiodata ja vektorihaku |
| **Tekoälypalvelut** | Azure OpenAI | Tekstiesitykset ja kielimallit |
| **Konttiteknologia** | Docker + Docker Compose | Kehitysympäristö |
| **Pilvialusta** | Microsoft Azure | Tuotantokäyttöön käyttöönotto |
| **IDE-integraatio** | VS Code | Tekoälychat ja kehitystyöskentely |

### Kehitystyökalut

| **Työkalu** | **Tarkoitus** |
|------------|---------------|
| **asyncpg** | Tehokas PostgreSQL-ajuri |
| **Pydantic** | Datan validointi ja serialisointi |
| **Azure SDK** | Pilvipalvelun integrointi |
| **pytest** | Testauskehys |
| **Docker** | Konttiteknologia ja käyttöönotto |

### Tuotantopino

| **Palvelu** | **Azure-resurssi** | **Tarkoitus** |
|-------------|--------------------|---------------|
| **Tietokanta** | Azure Database for PostgreSQL | Hallittu tietokantapalvelu |
| **Kontti** | Azure Container Apps | Serverless-konttien hostaus |
| **Tekoälypalvelut** | Microsoft Foundry | OpenAI-mallit ja päätepisteet |
| **Valvonta** | Application Insights | Havainnointi ja diagnostiikka |
| **Turvallisuus** | Azure Key Vault | Salaisuudet ja konfiguraation hallinta |

## 🎬 Todelliset käyttötapaukset

Tutkitaan, miten eri käyttäjät käyttävät MCP-palvelintamme:

### Skenaario 1: Myymäläpäällikön suorituskyvyn tarkastelu

**Käyttäjä**: Sarah, Seattlen myymäläpäällikkö  
**Tavoite**: Analysoida viimeisen neljänneksen myyntitilanne

**Luonnollisen kielen kysely**:  
> "Näytä top 10 tuotetta tulojen mukaan minun myymälässäni Q4 2024"

**Mitä tapahtuu**:  
1. VS Code AI Chat lähettää kyselyn MCP-palvelimelle  
2. MCP-palvelin tunnistaa Sarah’n myymäläkontekstin (Seattle)  
3. RLS-politiikat suodattavat datan vain Seattlen myymälää varten  
4. SQL-kysely generoidaan ja suoritetaan  
5. Tulokset muotoillaan ja palautetaan AI Chatille  
6. Tekoäly tarjoaa analyysin ja oivallukset  

### Skenaario 2: Tuotteen löytäminen semanttisen haun avulla

**Käyttäjä**: Mike, varastopäällikkö  
**Tavoite**: Löytää tuotteita, jotka ovat samankaltaisia asiakkaan pyynnön kanssa

**Luonnollisen kielen kysely**:  
> "Mitä tuotteita myymme, jotka ovat samankaltaisia kuin 'vesitiiviit ulkokäyttöön tarkoitetut sähköliittimet'?"

**Mitä tapahtuu**:  
1. Kysely käsitellään semanttisen haun työkalulla  
2. Azure OpenAI generoi tekstin upotuksen vektorin  
3. pgvector suorittaa samanlaisuushaku  
4. Samanlaiset tuotteet lajitellaan merkittävyyden mukaan  
5. Tulokset sisältävät tuotetiedot ja saatavuuden  
6. Tekoäly ehdottaa vaihtoehtoja ja pakettitarjouksia  

### Skenaario 3: Myymälöiden välinen analytiikka

**Käyttäjä**: Jennifer, aluepäällikkö  
**Tavoite**: Verrata suorituskykyä kaikissa myymälöissä

**Luonnollisen kielen kysely**:  
> "Vertaile myyntiä kategorioittain kaikissa myymälöissä viimeisen 6 kuukauden ajalta"

**Mitä tapahtuu**:  
1. RLS-konteksti asetetaan aluepäällikön käyttöön  
2. Monimutkainen usean myymälän kysely generoidaan  
3. Data koottuna eri myymälöiden sijainnin mukaan  
4. Tulokset sisältävät trendejä ja vertailuja  
5. Tekoäly tunnistaa oivallukset ja antaa suosituksia  

## 🔒 Turvallisuus ja monivuokraajamoduulin syväluotaus

Toteutuksemme painottaa yritystason turvallisuutta:

### Rivitason tietoturva (RLS)

PostgreSQL:n RLS varmistaa datan eristämisen:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```
  
### Käyttäjätunnistuksen hallinta

Jokainen MCP-yhteys sisältää:  
- **Myymäläpäällikön tunniste**: Uniikki RLS-kontekstin tunnus  
- **Roolin määrittely**: Käyttöoikeudet ja pääsytasot  
- **Istunnon hallinta**: Turvalliset autentikointitokenit  
- **Auditointilokit**: Täydellinen pääsyloki

### Datan suojaus

Monikerroksinen suojaus:  
- **Yhteyksien salaus**: TLS kaikille tietokantayhteyksille  
- **SQL-injektionsuojaus**: Vain parametrisoituja kyselyitä  
- **Syötteiden validointi**: Kattava pyyntöjen tarkastus  
- **Virheenkäsittely**: Ei arkaluontoista tietoa virheilmoituksissa  

## 🎯 Keskeiset opit

Johdannon jälkeen sinun pitäisi ymmärtää:

✅ **MCP:n arvotarjous**: Miten MCP yhdistää tekoälyavustajat ja todellisen maailman data  
✅ **Liiketoimintaympäristö**: Zava Retailin vaatimukset ja haasteet  
✅ **Arkkitehtuurin yleiskuva**: Keskeiset osat ja niiden vuorovaikutus  
✅ **Teknologiapino**: Oppimispolun työkalut ja kehykset  
✅ **Turvamalli**: Monivuokraajapohjainen datan käyttö ja suojaus  
✅ **Käyttökuviot**: Todelliset kyselytilanteet ja työnkulut  

## 🚀 Mitä seuraavaksi

Valmiina syventymään? Jatka kohteeseen:

**[Harjoitus 01: Arkkitehtuurin ydinkäsitteet](../01-Architecture/README.md)**

Opettele MCP-palvelinarkkitehtuurin mallit, tietokantasunnittelun periaatteet ja yksityiskohtainen tekninen toteutus, joka mahdollistaa vähittäiskaupan analytiikkaratkaisumme.

## 📚 Lisäresurssit

### MCP-dokumentaatio
- [MCP-spesifikaatio](https://modelcontextprotocol.io/docs/) - Virallinen protokolladokumentaatio  
- [MCP aloittelijoille](https://aka.ms/mcp-for-beginners) - Kattava MCP-oppaan  
- [FastMCP-dokumentaatio](https://github.com/modelcontextprotocol/python-sdk) - Python SDK -dokumentaatio  

### Tietokantaintegraatio
- [PostgreSQL-dokumentaatio](https://www.postgresql.org/docs/) - Täydellinen PostgreSQL-viite  
- [pgvector-opas](https://github.com/pgvector/pgvector) - Vektorilaajennuksen dokumentaatio  
- [Rivitason tietoturva](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL:n RLS-opas  

### Azure-palvelut
- [Azure OpenAI -dokumentaatio](https://docs.microsoft.com/azure/cognitive-services/openai/) - Tekoälypalveluiden integraatio  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Hallittu tietokantapalvelu  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverless-kontit

---

**Vastuuvapauslauseke**: Tämä on oppimisharjoitus, jossa käytetään kuvitteellista vähittäiskauppadataa. Noudata aina organisaatiosi datan hallinnan ja turvallisuuspolitiikkoja, kun toteutat vastaavia ratkaisuja tuotantoympäristöissä.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->