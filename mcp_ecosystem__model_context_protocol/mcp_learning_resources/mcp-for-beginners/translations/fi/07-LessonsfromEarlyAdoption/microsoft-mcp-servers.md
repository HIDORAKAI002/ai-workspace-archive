# 🚀 10 Microsoft MCP -palvelinta, jotka muuttavat kehittäjien tuottavuutta

## 🎯 Mitä opit tässä oppaassa

Tässä käytännön oppaassa esitellään kymmenen Microsoftin MCP-palvelinta, jotka muuttavat aktiivisesti kehittäjien työtapoja tekoälyavustajien kanssa. Sen sijaan, että selittäisimme vain, mitä MCP-palvelimet *voivat* tehdä, näytämme palvelimet, jotka jo tekevät todellista eroa päivittäisissä kehitystyön työnkuluissa Microsoftilla ja muualla.

Jokainen tässä oppaassa oleva palvelin on valittu todellisten käyttötapauksien ja kehittäjäpalautteen perusteella. Opit, mitä kukin palvelin tekee, miksi se on tärkeä ja miten saat siitä parhaan hyödyn omissa projekteissasi. Olitpa sitten täysin uusi MCP:n kanssa tai haluat laajentaa nykyistä kokonaisuuttasi, nämä palvelimet edustavat joitakin Microsoft-ekosysteemin käytännöllisimmistä ja vaikuttavimmista työkaluista.

> **💡 Pikavinkki**
> 
> Uusi MCP:ssä? Ei hätää! Tämä opas on suunniteltu aloittelijaystävälliseksi. Selitämme käsitteitä matkan varrella, ja voit aina palata takaisin moduuleihimme [Introduktio MCP:hen](../00-Introduction/README.md) ja [Peruskäsitteet](../01-CoreConcepts/README.md) syvempää taustaa varten.

## Yleiskatsaus

Tämä kattava opas tutkii kymmentä Microsoftin MCP-palvelinta, jotka mullistavat kehittäjien vuorovaikutusta tekoälyavustajien ja ulkoisten työkalujen kanssa. Azure-resurssien hallinnasta dokumenttien käsittelyyn nämä palvelimet osoittavat Model Context Protocolin voiman luoda saumattomia, tuottavia kehitystyön työnkulkuja.

## Oppimistavoitteet

Tämän oppaan loppuun mennessä osaat:
- Ymmärtää, miten MCP-palvelimet lisäävät kehittäjien tuottavuutta
- Oppia Microsoftin tehokkaimmat MCP-palvelinratkaisut
- Löytää käytännön käyttötapauksia jokaiselle palvelimelle
- Tietää, miten asennat ja konfiguroit nämä palvelimet VS Codessa ja Visual Studiossa
- Tutustua laajempaan MCP-ekosysteemiin ja tulevaisuuden suuntiin

## 🔧 MCP-palvelimien ymmärtäminen: Aloittelijan opas

### Mitä MCP-palvelimet ovat?

Jos olet aloittelija Model Context Protocolissa (MCP), saatat miettiä: "Mikä tarkalleen ottaen on MCP-palvelin, ja miksi se on tärkeä?" Aloitetaan yksinkertaisella analogialla.

Ajattele MCP-palvelimia erikoistuneina avustajina, jotka auttavat tekoälykoodauskumppaniasi (kuten GitHub Copilot) yhdistymään ulkoisiin työkaluihin ja palveluihin. Aivan kuten käytät eri sovelluksia puhelimessasi eri tehtäviin — yhtä säähän, toista navigointiin, toista pankkiasioihin — MCP-palvelimet antavat tekoälyavustajallesi kyvyn olla vuorovaikutuksessa eri kehitystyökalujen ja palveluiden kanssa.

### Ongelma, jonka MCP-palvelimet ratkaisevat

Ennen MCP-palvelimia, jos halusit:
- Tarkistaa Azure-resurssisi
- Luoda GitHub-issue-lipun
- Kysellä tietokantaasi
- Etsiä dokumentaatiosta

Sinun piti lopettaa koodaus, avata selain, navigoida oikealle verkkosivustolle ja tehdä nämä tehtävät manuaalisesti. Tämä jatkuva kontekstin vaihto katkaisee työnkulun ja vähentää tuottavuutta.

### Kuinka MCP-palvelimet muuttavat kehityskokemustasi

MCP-palvelimilla voit pysyä kehitysympäristössäsi (VS Code, Visual Studio jne.) ja yksinkertaisesti pyytää tekoälyavustajaasi hoitamaan nämä tehtävät. Esimerkiksi:

**Perinteisen työnkulun sijaan:**
1. Lopeta koodaus
2. Avaa selain
3. Mene Azure-portaaliin
4. Etsi tallennustilin tiedot
5. Palaa VS Codeen
6. Jatka koodaamista

**Voit nyt tehdä näin:**
1. Kysy tekoälyltä: "Mikä on Azure-tallennustilieni tila?"
2. Jatka koodaamista saatujen tietojen kanssa

### Tärkeimmät hyödyt aloittelijoille

#### 1. 🔄 **Pysy virtausmoodissasi**
- Ei enää sovellusten välillä hyppimistä
- Säilytä keskittyminen kirjoittamassasi koodissa
- Vähennä henkistä kuormaa eri työkalujen hallinnasta

#### 2. 🤖 **Käytä luonnollista kieltä monimutkaisten komentojen sijaan**
- Älä opettele SQL-syntaksiä ulkoa, kuvaile mitä tietoa tarvitset
- Älä muista Azure CLI -komentoja, selitä mitä haluat tehdä
- Anna tekoälyn hoitaa tekniset yksityiskohdat, kun keskityt logiikkaan

#### 3. 🔗 **Yhdistä useita työkaluja yhteen**
- Luo tehokkaita työnkulkuja yhdistämällä eri palveluita
- Esimerkki: "Hae kaikki uudet GitHub-issue-liput ja luo niistä vastaavat Azure DevOps -työtehtävät"
- Automatisoi tekemällä monimutkaisia skriptejä kirjoittamatta

#### 4. 🌐 **Pääsy kasvavaan ekosysteemiin**
- Hyödynnä Microsoftin, GitHubin ja muiden yritysten rakentamia palvelimia
- Sekoita ja yhdistä eri toimittajien työkaluja sulavasti
- Liity standardoituihin ekosysteemeihin, jotka toimivat eri tekoälyavustajien kanssa

#### 5. 🛠️ **Opiskele tekemällä**
- Aloita valmiiksi rakennetulla palvelimilla ymmärtääksesi käsitteet
- Rakenna vähitellen omia palvelimia, kun tunnet olosi varmemmaksi
- Käytä saatavilla olevia SDK:ita ja dokumentaatiota oppaana

### Käytännön esimerkki aloittelijoille

Oletetaan, että olet uusi web-kehityksessä ja työskentelet ensimmäisen projektisi parissa. Näin MCP-palvelimet voivat auttaa:

**Perinteinen lähestymistapa:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**MCP-palvelimien kanssa:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### Yritysvakioetu

MCP:stä on kehittymässä alan laajuinen standardi, mikä tarkoittaa:
- **Yhtenäisyys**: Samanlainen kokemus eri työkalujen ja yritysten välillä
- **Yhteensopivuus**: Eri toimittajien palvelimet toimivat yhdessä
- **Tulevaisuuden kestävyys**: Taidot ja asetukset siirtyvät eri tekoälyavustajien välillä
- **Yhteisö**: Suuri ekosysteemi jaettua tietoa ja resursseja

### Aloittaminen: Mitä opit

Tässä oppaassa tutustumme 10 Microsoftin MCP-palvelimeen, jotka ovat erityisen hyödyllisiä kehittäjille kaikilla tasoilla. Jokainen palvelin on suunniteltu:
- Ratkaisemaan yleisiä kehityshaasteita
- Vähentämään toistuvia tehtäviä
- Parantamaan koodin laatua
- Tarjoamaan oppimismahdollisuuksia

> **💡 Oppimisvinkki**
> 
> Jos olet täysin uusi MCP:ssä, aloita moduuleistamme [Introduktio MCP:hen](../00-Introduction/README.md) ja [Peruskäsitteet](../01-CoreConcepts/README.md). Palaa sen jälkeen tänne näkemään nämä käsitteet käytännössä Microsoftin työkalujen kanssa.
>
> MCP:n merkityksen lisäkontekstiksi katso Maria Naggagan postaus: [Yhdistä kerran, integroidu missä tahansa MCP:n avulla](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).

## MCP:n aloittaminen VS Codessa ja Visual Studiossa 🚀

Näiden MCP-palvelimien asennus on suoraviivaista, jos käytät Visual Studio Codea tai Visual Studio 2022:ta GitHub Copilotin kanssa.

### VS Coden asennus

Perusprosessi VS Codessa:

1. **Ota käyttöön Agent-tila**: Vaihda Copilot Chat -ikkunassa Agent-tilaan
2. **Määritä MCP-palvelimet**: Lisää palvelinmääritykset VS Coden settings.json -tiedostoon
3. **Käynnistä palvelimet**: Klikkaa "Start" -painiketta kullekin käyttöönotettavalle palvelimelle
4. **Valitse työkalut**: Valitse, mitkä MCP-palvelimet otetaan käyttöön nykyisessä istunnossa

Yksityiskohtaiset asennusohjeet löytyvät [VS Code MCP -dokumentaatiosta](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 Pro vinkki: Hallitse MCP-palvelimia kuin ammattilainen!**
> 
> VS Coden Extensions-näkymä sisältää nyt [kätevän uuden käyttöliittymän asennettujen MCP-palvelinten hallintaan](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! Saat nopean pääsyn käynnistämään, pysäyttämään ja hallitsemaan asennettuja MCP-palvelimia selkeän ja yksinkertaisen käyttöliittymän kautta. Kokeile ihmeessä!

### Visual Studio 2022:n asennus

Visual Studio 2022:ssa (versio 17.14 tai uudempi):

1. **Ota käyttöön Agent-tila**: Klikkaa "Ask" -alasvetovalikkoa GitHub Copilot Chat -ikkunassa ja valitse "Agent"
2. **Luo määritystiedosto**: Luo ratkaisu-kansioon `.mcp.json` -tiedosto (suositeltu sijainti `<SOLUTIONDIR>\.mcp.json`)
3. **Määritä palvelimet**: Lisää MCP-palvelinmääritykset MCP:n standardimuodossa
4. **Hyväksy työkalut**: Kun pyydetään, hyväksy käytettävät työkalut asianmukaisilla käyttöoikeuksilla

Tarkemmat Visual Studio -asennusohjeet löytyvät [Visual Studio MCP -dokumentaatiosta](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

Jokaisella MCP-palvelimella on omat määritysvaatimuksensa (yhteysmerkkijonot, todennus jne.), mutta asennuskaava on molemmissa IDE:issä yhtenäinen.

## Opittu läksy Microsoft MCP -palvelimista 🛠️

### 1. 📚 Microsoft Learn Docs MCP -palvelin

[![Asenna VS Codeen](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Asenna VS Code Insidersiin](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Mitä se tekee**: Microsoft Learn Docs MCP -palvelin on pilvipalveluna toimiva palvelu, joka tarjoaa tekoälyavustajille reaaliaikaisen pääsyn viralliseen Microsoft-dokumentaatioon Model Context Protocolin kautta. Se yhdistyy osoitteeseen `https://learn.microsoft.com/api/mcp` ja mahdollistaa semanttisen haun Microsoft Learnissa, Azure-dokumentaatiossa, Microsoft 365 -dokumentaatiossa ja muissa virallisissa Microsoft-lähteissä.

**Miksi se on hyödyllinen**: Vaikka se saattaa vaikuttaa "pelkältä dokumentaatiolta", tämä palvelin on ratkaisevan tärkeä jokaiselle Microsoft-teknologioita käyttävälle kehittäjälle. Yksi suurimmista valituksista .NET-kehittäjiltä tekoälykoodausavustajista on, etteivät ne ole ajan tasalla uusimpien .NET- ja C#-julkaisujen kanssa. Microsoft Learn Docs MCP -palvelin ratkaisee tämän tarjoamalla reaaliaikaisen pääsyn ajantasaisimpaan dokumentaatioon, API-viitteisiin ja parhaisiin käytäntöihin. Olitpa sitten työskentelemässä uusimpien Azure SDK:iden kanssa, tutkimassa C# 13:n uusia ominaisuuksia tai toteuttamassa huipputason .NET Aspire -mallipohjia, tämä palvelin varmistaa, että tekoälyavustajallasi on pääsy luotettavaan ja ajan tasalla olevaan tietoon tuottaakseen tarkkaa ja modernia koodia.

**Käytännön käyttö**: "Mitkä ovat az cli -komennot Azure-säilöappin luomiseen virallisen Microsoft Learn -dokumentaation mukaisesti?" tai "Miten konfiguroin Entity Frameworkin riippuvuuden injektoinnilla ASP.NET Coreen?" Tai kuinka olisi "Arvioi tämä koodi varmistaaksesi, että se vastaa Microsoft Learn -dokumentaation suorituskykysuosituksia." Palvelin tarjoaa kattavan haun Microsoft Learnin, Azure-dokumentaation ja Microsoft 365 -dokumentaation yli käyttäen edistynyttä semanttista hakua löytääkseen kontekstiin parhaiten sopivaa tietoa. Se palauttaa jopa 10 korkealaatuista sisältöpalasta artikkelien otsikoiden ja URL-osoitteiden kanssa, aina päästen käsiksi uusimpaan Microsoft-dokumentaatioon heti julkaisun jälkeen.

**Esimerkki käytöstä**: Palvelin tarjoaa `microsoft_docs_search` -työkalun, joka suorittaa semanttista hakua Microsoftin virallista teknistä dokumentaatiota vastaan. Kun palvelin on konfiguroitu, voit kysyä esimerkiksi: "Miten toteutan JWT-todennuksen ASP.NET Coreen?" ja saada yksityiskohtaisia, virallisia vastauksia lähde-linkkeineen. Hakutulos on erinomainen, koska se ymmärtää kontekstin – kysymys "säilöistä" Azure-kontekstissa palauttaa Azure Container Instances -dokumentaation, kun taas sama termi .NET-kontekstissa palauttaa aiheeseen liittyvää C#-kokoelmakäsittelyä.

Tämä on erityisen hyödyllistä nopeasti muuttuville tai äskettäin päivitetyille kirjastoille ja käyttötapauksille. Esimerkiksi eräässä viimeaikaisessa koodausprojektissani halusin hyödyntää uusimpien .NET Aspire- ja Microsoft.Extensions.AI -julkaisujen ominaisuuksia. Sisällyttämällä Microsoft Learn Docs MCP -palvelin sain käyttöönni ei vain API-dokumentaation, vaan myös juuri julkaistut opastukset ja ohjeistukset.

> **💡 Pro vinkki**
> 
> Jopa työkaluystävälliset mallit tarvitsevat kannustusta käyttää MCP-työkaluja! Harkitse järjestelmäkehotteen tai [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) lisäämistä, jossa lukee: "Sinulla on pääsy `microsoft.docs.mcp` -työkaluun – käytä tätä työkalua etsiäksesi Microsoftin uusinta virallista dokumentaatiota, kun käsittelet kysymyksiä Microsoftin teknologioista kuten C#, Azure, ASP.NET Core tai Entity Framework."
>
> Erinomainen käytännön esimerkki löytyy Awesome GitHub Copilot -arkiston [C# .NET Janitor -chat-tilasta](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md). Tämä tila hyödyntää erityisesti Microsoft Learn Docs MCP -palvelinta auttaakseen siistimään ja modernisoimaan C#-koodia uusimpien mallien ja parhaiden käytäntöjen mukaisesti.

### 2. ☁️ Azure MCP -palvelin
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Mitä se tekee**: Azure MCP Server on kattava kokoelma yli 15 erikoistunutta Azure-palveluliitintä, jotka tuovat koko Azure-ekosysteemin AI-työnkulkuusi. Tämä ei ole pelkkä yksittäinen palvelin – se on tehokas kokoelma, joka sisältää resurssien hallinnan, tietokantayhteydet (PostgreSQL, SQL Server), Azure Monitorin lokianalyysin KQL:llä, Cosmos DB -integraation ja paljon muuta.

**Miksi se on hyödyllinen**: Pelkän Azure-resurssien hallinnan lisäksi tämä palvelin parantaa dramaattisesti koodin laatua työskennellessäsi Azure SDK:iden kanssa. Käyttäessäsi Azure MCP:tä Agent-tilassa se ei vain auta sinua kirjoittamaan koodia – se auttaa sinua kirjoittamaan *parempaa* Azure-koodia, joka noudattaa nykyisiä tunnistamiskäytäntöjä, virheenkäsittelyn parhaita käytäntöjä ja hyödyntää uusimpia SDK-ominaisuuksia. Sen sijaan, että saisit geneeristä koodia, joka saattaa toimia, saat koodia, joka noudattaa Azuren suositeltuja käytäntöjä tuotantokuormituksille.

**Keskeiset moduulit sisältävät**:
- **🗄️ Tietokantaliittimet**: Suora luonnollisen kielen pääsy Azure Database for PostgreSQL:ään ja SQL Serveriin
- **📊 Azure Monitor**: KQL-pohjainen lokianalyysi ja operatiiviset näkymät
- **🌐 Resurssien hallinta**: Täysi Azure-resurssien elinkaaren hallinta
- **🔐 Tunnistautuminen**: DefaultAzureCredential- ja hallinnoitu identiteettimallit
- **📦 Tallennuspalvelut**: Blob Storage, Queue Storage ja Table Storage -operaatiot
- **🚀 Konttipalvelut**: Azure Container Apps, Container Instances ja AKS-hallinta
- **Ja monia muita erikoistuneita liittimiä**

**Käytännön esimerkkejä**: "Listaa Azure-tallennustilini tilit", "Kysy Log Analytics -työtilastani virheitä viimeiseltä tunnilta" tai "Auta minua rakentamaan Azure-sovellus Node.js:llä asianmukaisella tunnistautumisella"

**Täydellinen demotilanne**: Tässä on täydellinen läpikäynti, joka näyttää Azure MCP:n ja GitHub Copilot for Azure -laajennuksen yhdistämisen voiman VS Codessa. Kun sinulla on molemmat asennettuna ja annat kehotteen:

> "Luo Python-skripti, joka lataa tiedoston Azure Blob Storageen käyttäen DefaultAzureCredential-tunnistautumista. Skriptin tulee yhdistää Azure-tallennustililleni nimeltä 'mycompanystorage', ladata säiliöön nimeltä 'documents', luoda testitiedosto nykyisellä aikatunnisteella ladattavaksi, käsitellä virheitä sujuvasti ja antaa informatiivista palautetta, noudattaa Azure-parhaita käytäntöjä tunnistautumisessa ja virheenkäsittelyssä, sisältää kommentteja selittäen DefaultAzureCredentialin toiminnan ja tehdä skriptistä hyvin jäsennelty käyttämällä asianmukaisia funktioita ja dokumentaatiota."

Azure MCP Server generoi täydellisen, tuotantovalmiin Python-skriptin, joka:
- Käyttää uusinta Azure Blob Storage SDK:ta asianmukaisilla asynkronisilla malleilla
- Toteuttaa DefaultAzureCredentialin kattavalla varajärjestelmän selityksellä
- Sisältää vankan virheenkäsittelyn erityyppisillä Azure-poikkeuksilla
- Noudattaa Azure SDK:n parhaita käytäntöjä resurssien hallinnassa ja yhteyksien käsittelyssä
- Tarjoaa yksityiskohtaisen lokituksen ja informatiivisen konsolitulosteen
- Luo asianmukaisesti jäsennellyn skriptin funktioilla, dokumentaatiolla ja tyyppihauilla

Merkittäväksi tämän tekee se, että ilman Azure MCP:tä saatat saada geneeristä blob storage -koodia, joka toimii, mutta ei noudata nykyisiä Azure-malleja. Azure MCP:n kanssa saat koodia, joka hyödyntää uusimpia tunnistautumistapoja, käsittelee Azure-spesifisiä virhetapauksia ja noudattaa Microsoftin suosituksia tuotantosovelluksissa.

**Esimerkki**: Olen kamppaillut muistamaan tarkkoja komentoja `az`- ja `azd`-CLI:lle satunnaiseen käyttöön. Minulle se on aina kahden vaiheen prosessi: ensin haen syntaksin, sitten suoritan komennon. Usein menen vain portaalin kautta napsimaan asioita, koska en halua myöntää, että en muista CLI:n syntaksia. Kyky yksinkertaisesti kuvailla mitä haluan on mahtavaa, ja vielä parempaa on, että voin tehdä sen ilman, että joudun jättämään IDE:ni!

Aloittamiseen on erinomainen lista käyttötapauksia [Azure MCP -varastossa](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server). Laajempia asennusoppaita ja edistyneitä kokoonpanoja varten katso [virallinen Azure MCP -dokumentaatio](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**Mitä se tekee**: Virallinen GitHub MCP Server tarjoaa saumattoman integraation GitHubin koko ekosysteemiin, tarjoten sekä isännöidyn etäkäytön että paikallisen Docker-käyttömahdollisuudet. Tämä ei ole pelkästään perustoimintoja arkistojen hallinnassa – se on kattava työkalupakki, joka sisältää GitHub Actionsin hallinnan, vetopyyntötyönkulut, issue-seurannan, tietoturvaskannauksen, ilmoitukset ja edistyneet automaatio-ominaisuudet.

**Miksi se on hyödyllinen**: Tämä palvelin muuttaa tapasi olla vuorovaikutuksessa GitHubin kanssa tuomalla koko alustan kokemuksen suoraan kehitysympäristöösi. Sen sijaan, että vaihtaisit jatkuvasti VS Coden ja GitHub.comin välillä projektinhallintaan, koodikatselmuksiin ja CI/CD-seurantaan, voit käsitellä kaiken luonnollisen kielen komennoilla samalla, kun pysyt keskittyneenä koodiisi.

> **ℹ️ Huom:** Erilaiset 'Agentit'  
>  
> Älä sekoita tätä GitHub MCP Serveriä GitHubin Coding Agenttiin (tekoälyagenttiin, jolle voi osoittaa tehtäviä automatisoiduille koodausprosesseille). GitHub MCP Server toimii VS Coden Agent-tilassa tarjoten GitHub API -integraation, kun taas GitHubin Coding Agent on erillinen ominaisuus, joka luo vetopyyntöjä assigned GitHub issueille.

**Keskeiset ominaisuudet sisältävät**:
- **⚙️ GitHub Actions**: Täysi CI/CD-putken hallinta, työnkulun seuranta ja artikkeleiden käsittely
- **🔀 Vetopyynnöt**: Luo, tarkastele, yhdistä ja hallitse PR:itä kattavalla tilan seurannalla
- **🐛 Kysymykset**: Kysymysten koko elinkaaren hallinta, kommentointi, merkintä ja osoittaminen
- **🔒 Turvallisuus**: Koodin skannauksen hälytykset, salausten havaitseminen ja Dependabot-integraatio
- **🔔 Ilmoitukset**: Älykäs ilmoitusten hallinta ja arkiston tilausasetukset
- **📁 Arkiston hallinta**: Tiedosto-operaatiot, haaranhallinta ja arkiston hallinnointi
- **👥 Yhteistyö**: Käyttäjä- ja organisaatiohaku, tiimien hallinta ja käyttöoikeudet

**Käytännön esimerkki**: "Luo vetopyyntö ominaisuushaarastani", "Näytä kaikki epäonnistuneet CI-ajot tällä viikolla", "Listaa avoimet tietoturvahälytykset arkistoilleni" tai "Etsi kaikki minulle osoitetut kysymykset organisaatioissani"

**Täydellinen demotilanne**: Tässä on tehokas työnkulku, joka demonstroi GitHub MCP Serverin kykyjä:

> "Minun täytyy valmistautua sprinttikatsaukseen. Näytä kaikki vetopyynnöt, jotka olen luonut tällä viikolla, tarkista CI/CD-putkiemme tila, luo yhteenveto käsiteltävistä tietoturvahälytyksistä ja auta minua laatimaan julkaisumuistiinpanot yhdistetyistä PR:istä, joilla on 'feature'-tunniste."

GitHub MCP Server:
- Kysyy viimeisimmät vetopyyntösi yksityiskohtaisilla statustiedoilla
- Analysoi työnkulun suoritukset ja korostaa mahdolliset virheet tai suorituskykyongelmat
- Koostaa tietoturvaskannauksen tulokset ja priorisoi kriittiset hälytykset
- Luo kattavat julkaisumuistiinpanot purkamalla tietoja yhdistetyistä PR:istä
- Tarjoaa käytännöllisiä seuraavia askeleita sprintin suunnitteluun ja julkaisun valmisteluun

**Esimerkki**: Rakastan käyttää tätä koodikatselmuksissa. Sen sijaan, että hyppisin VS Coden, GitHub-ilmoitusten ja vetopyyntösivujen välillä, voin sanoa "Näytä kaikki PR:t, jotka odottavat arvosteluani" ja sitten "Lisää kommentti PR:ään #123 kysyen virheenkäsittelystä tunnistusmenetelmässä." Palvelin hoitaa GitHub API -kutsut, säilyttää keskustelun kontekstin ja auttaa jopa laatimaan rakentavampia katselukommentteja.

**Tunnistautumisvaihtoehdot**: Palvelin tukee sekä OAuth:ta (saumaton kokemus VS Codessa) että Personal Access Token -avaimia, ja voit määrittää työkalut niin, että käytössä ovat vain tarvitsemasi GitHub-toiminnot. Voit ajaa sen etäpalveluna välittömään käyttöönottoon tai paikallisesti Dockerilla täydellistä hallintaa varten.

> **💡 Vinkki**  
>  
> Ota käyttöön vain tarvitsemasi työkalusarjat määrittämällä `--toolsets`-parametri MCP-palvelin asetuksissasi kontekstin koon vähentämiseksi ja tekoälytyökalujen valinnan parantamiseksi. Esimerkiksi lisää `"--toolsets", "repos,issues,pull_requests,actions"` MCP-konfiguraatioargmenteihisi keskeisiin kehitystyönkulkuihin tai käytä `"--toolsets", "notifications, security"` jos haluat pääasiassa GitHubin valvontamahdollisuudet.

### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**Mitä se tekee**: Yhdistää Azure DevOps -palveluihin tarjoten kokonaisvaltaisen projektinhallinnan, työkohtien seurannan, build-putkien hallinnan ja arkistotoiminnot.

**Miksi se on hyödyllinen**: Tiimeille, jotka käyttävät Azure DevOpsia ensisijaisena DevOps-alustanaan, tämä MCP-palvelin poistaa jatkuvan välilehtien vaihtamisen kehitysympäristön ja Azure DevOpsin web-käyttöliittymän välillä. Voit hallita työkohtia, tarkistaa buildien tilat, kysellä arkistoja ja hoitaa projektinhallintatehtäviä suoraan tekoälyavustajaltasi.

**Käytännön esimerkkejä**: "Näytä kaikki aktiiviset työtehtävät tämän sprintin ajalta WebApp-projektille", "Luo virheraportti juuri löytämästäni kirjautumisongelmasta" tai "Tarkista build-putkiemme tila ja näytä mahdolliset viimeisimmät virheet"

**Esimerkki**: Voit helposti tarkistaa tiimisi nykyisen sprintin tilanteen yksinkertaisella kyselyllä kuten "Näytä kaikki aktiiviset työtehtävät tämän sprintin ajalta WebApp-projektille" tai "Luo virheraportti juuri löytämästäni kirjautumisongelmasta" ilman, että joudut poistumaan kehitysympäristöstäsi.

### 5. 📝 MarkItDown MCP Server
[![Asenna VS Codeen](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Asenna VS Code Insidersiin](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**Mitä se tekee**: MarkItDown on kattava dokumenttien muuntopalvelin, joka muuntaa erilaiset tiedostomuodot korkealaatuiseksi Markdowniksi, optimoituna LLM-käyttöön ja tekstianalyysityönkuluihin.

**Miksi se on hyödyllinen**: Välttämätön nykyaikaisiin dokumentaatiotyönkulkuihin! MarkItDown käsittelee vaikuttavan valikoiman tiedostomuotoja säilyttäen samalla tärkeän dokumenttien rakenteen, kuten otsikot, listat, taulukot ja linkit. Toisin kuin yksinkertaiset tekstin poimintatyökalut, se keskittyy säilyttämään semanttisen merkityksen ja muotoilun, joka on arvokasta sekä tekoälyn käsittelyssä että ihmisen luettavuudessa.

**Tuetut tiedostomuodot**:
- **Office-asiakirjat**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **Mediasisällöt**: Kuvat (EXIF-metatietoineen ja OCR), ääni (EXIF-metatietoineen ja puheentunnistuksineen)
- **Verkkosisältö**: HTML, RSS-syötteet, YouTube-URL-osoitteet, Wikipedia-sivut
- **Tietomuodot**: CSV, JSON, XML, ZIP-tiedostot (sisältö käsitellään rekursiivisesti)
- **Julkaisumuodot**: EPub, Jupyter-muistikirjat (.ipynb)
- **Sähköposti**: Outlook-viestit (.msg)
- **Edistyneet**: Azure Document Intelligence -integraatio parannettuun PDF-käsittelyyn

**Edistyneet ominaisuudet**: MarkItDown tukee LLM-pohjaisia kuvauksia kuville (kun käytössä OpenAI-asiakas), Azure Document Intelligenceä parannettuun PDF-käsittelyyn, puheen tekstitystä sekä laajennusjärjestelmää lisätiedostomuotojen tukemiseksi.

**Käytännön esimerkkejä**: "Muunna tämä PowerPoint-esitys Markdowniksi dokumentointisivuillemme", "Poimi teksti tästä PDF:stä oikean otsikkorakenteen kanssa" tai "Muunna tämä Excel-taulukko luettavaan taulukkomuotoon"

**Esimerkkilainaus**: Lainaten [MarkItDown-dokumentaatiosta](https://github.com/microsoft/markitdown#why-markdown):

> Markdown on erittäin lähellä tavallista tekstiä, siinä on vain minimaalinen merkintä tai muotoilu, mutta se tarjoaa silti tavan esittää tärkeä dokumenttien rakenne. Suosituimmat LLM:t, kuten OpenAI:n GPT-4o, "puhuvat" luonnostaan Markdownea ja sisällyttävät usein Markdownia vastauksiinsa ilman kehotusta. Tämä viittaa siihen, että ne on koulutettu valtavilla määrillä Markdown-muotoiltua tekstiä ja ymmärtävät sitä hyvin. Lisäksi Markdown-konventiot ovat erittäin token-tehokkaita.

MarkItDown on todella hyvä dokumenttien rakenteen säilyttämisessä, mikä on tärkeää tekoälyn työnkuluissa. Esimerkiksi PowerPoint-esitystä muuntaessa se säilyttää dian järjestyksen oikeiden otsikoiden kanssa, poimii taulukot Markdown-taulukoiksi, lisää kuvien alt-tekstit ja käsittelee jopa puhujamuistiinpanot. Kaaviot muunnetaan luettaviksi datataulukoiksi, ja lopullinen Markdown pitää esityksen loogisen rakenteen. Tämä tekee siitä täydellisen syötteen esityssisällön jalostamiseen tekoälyjärjestelmiin tai dokumentaation luomiseen olemassa olevista dioista.

### 6. 🗃️ SQL Server MCP Server

[![Asenna VS Codeen](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Asenna VS Code Insidersiin](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Mitä se tekee**: Tarjoaa keskustelupohjaisen pääsyn SQL Server -tietokantoihin (paikalliset, Azure SQL tai Fabric)

**Miksi se on hyödyllinen**: Vastaava kuin PostgreSQL-palvelin mutta Microsoftin SQL-ekosysteemille. Yhdistä yksinkertaisella yhteysmerkkijonolla ja ala tehdä kyselyjä luonnollisella kielellä – ei enää kontekstin vaihtoa!

**Käytännön esimerkki**: "Hae kaikki tilaukset, joita ei ole toimitettu viimeisen 30 päivän aikana" käännetään sopivaksi SQL-kyselyksi ja palauttaa muotoillut tulokset

**Esimerkkitapaus**: Kun tietokantayhteytesi on määritetty, voit heti aloittaa keskustelun tietojesi kanssa. Blogikirjoitus havainnollistaa tätä yksinkertaisella kysymyksellä: "mihin tietokantaan olet yhteydessä?" MCP-palvelin vastaa käynnistämällä oikean tietokantatyökalun, yhdistämällä SQL Server -instanssiin ja palauttamalla tietoja nykyisestä tietokantayhteydestä – ilman yhtäkään SQL-riviä. Palvelin tukee kattavia tietokantaoperaatioita skeeman hallinnasta tietojen käsittelyyn, kaikki luonnollisen kielen kehotteilla. Katso täydelliset asennusohjeet ja VS Code- sekä Claude Desktop -konfiguraatioesimerkit: [Introducing MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).

### 7. 🎭 Playwright MCP Server

[![Asenna VS Codeen](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Asenna VS Code Insidersiin](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**Mitä se tekee**: Mahdollistaa tekoälyagenttien vuorovaikutuksen verkkosivujen kanssa testauksessa ja automaatiossa

> **ℹ️ GitHub Copilotin moottorina**
> 
> Playwright MCP Server toimii GitHub Copilotin Coding Agentin moottorina, tarjoten sille verkkoselaustoimintoja! [Lue lisää tästä ominaisuudesta](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**Miksi se on hyödyllinen**: Täydellinen luonnollisilla kielellä ohjattuun automatisoituun testaukseen. Tekoäly voi selata verkkosivuja, täyttää lomakkeita ja poimia tietoja rakenteellisten saavutettavuuskuvausten kautta – tämä on uskomattoman tehokasta!

**Käytännön esimerkki**: "Testaa kirjautumisprosessi ja varmista, että hallintapaneeli latautuu oikein" tai "Luo testi, joka hakee tuotteita ja validoi tulossivun" – kaikki ilman sovelluksen lähdekoodin tarvetta

**Esimerkki**: Työkaverini Debbie O'Brien on tehnyt upeaa työtä Playwright MCP Serverin kanssa! Esimerkiksi hän näytti hiljattain, kuinka voi luoda täydellisiä Playwright-testejä pelkästään luonnollisella kielellä ilman pääsyä sovelluksen lähdekoodiin. Hänen esimerkissään hän pyysi Copilotia tekemään testin elokuvahakusovellukseen: siirry sivustolle, hae "Garfield" ja varmista, että elokuva näkyy tuloksissa. MCP käynnisti selaussession, tutki sivurakennetta DOM-tilannekuvilla, löysi oikeat selektorit ja loi täysin toimivan TypeScript-testin, joka läpäisi ensimmäisellä ajokerralla.

Mikä tekee tästä todella tehokasta, on se, että se yhdistää luonnollisen kielen ohjeet suoritettavaan testikoodiin. Perinteiset menetelmät vaativat joko manuaalista testin kirjoittamista tai pääsyä koodipohjaan kontekstin saamiseksi. Playwright MCP:n avulla voit testata ulkoisia sivustoja, asiakasohjelmia tai tehdä mustalaatikkotestausta ilman koodin saatavuutta.

### 8. 💻 Dev Box MCP Server

[![Asenna VS Codeen](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Asenna VS Code Insidersiin](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Mitä se tekee**: Hallinnoi Microsoft Dev Box -ympäristöjä luonnollisella kielellä

**Miksi se on hyödyllinen**: Yksinkertaistaa kehitysympäristöjen hallintaa valtavasti! Luo, konfiguroi ja hallinnoi kehitysympäristöjä ilman, että tarvitsee muistaa tiettyjä komentoja.

**Käytännön esimerkkejä**: "Luo uusi Dev Box viimeisimmällä .NET SDK:lla ja konfiguroi se projektiamme varten", "Tarkista kaikkien kehitysympäristöjeni tila" tai "Luo standardoitu demoympäristö tiimiesityksiämme varten"

**Esimerkkitapaus**: Olen suuri Dev Boxin henkilökohtaisen kehityksen fani. Oivallukseni syntyi, kun James Montemagno kertoi, kuinka loistava Dev Box on konferenssidemoihin, koska sillä on supernopea Ethernet-yhteys, riippumatta siitä, millaista wifiä käytän konferenssissa, hotellissa tai lentokoneessa. Itse asiassa harjoittelin hiljattain konferenssidemojen tekemistä, samalla kun kannettava tietokoneeni oli yhteydessä puhelimeni hotspotille bussimatkalla Brugesta Antwerpeniin! Seuraava tavoitteeni on perehtyä tiimien monen kehitysympäristön ja standardoitujen demoympäristöjen hallintaan. Toinen suosittu käyttötapa, jota asiakkaani ja työkaverini ovat maininneet, on Dev Boxin käyttäminen esikonfiguroiduille kehitysympäristöille. Molemmissa tapauksissa MCP:n käyttö Dev Boxien konfigurointiin ja hallintaan mahdollistaa luonnollisen kielen vuorovaikutuksen samalla kun pysyt kehitysympäristössäsi.

### 9. 🤖 Microsoft Foundry MCP Server
[![Asenna VS Codeen](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Asenna VS Code Insidersiin](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**Mitä se tekee**: Microsoft Foundry MCP Server tarjoaa kehittäjille laajan pääsyn Azuren tekoälyekosysteemiin, mukaan lukien malliluettelot, käyttöönoton hallinnan, tietämyksen indeksoinnin Azure AI Searchilla sekä arviointityökalut. Tämä kokeellinen palvelin yhdistää tekoälyn kehityksen ja Azuren tehokkaan tekoälyinfrastruktuurin, helpottaen tekoälysovellusten rakentamista, käyttöönottoa ja arviointia.

**Miksi se on hyödyllinen**: Tämä palvelin muuttaa tapaasi työskennellä Azure AI -palveluiden kanssa tuomalla yritystason tekoälyominaisuudet suoraan kehitystyöhösi. Sen sijaan että vaihtaisit Azuren portaalin, dokumentaation ja IDE:n välillä, voit löytää malleja, ottaa palveluita käyttöön, hallita tietokantoja ja arvioida tekoälyn suorituskykyä luonnollisia kielen komentoja käyttäen. Se on erityisen voimakas kehittäjille, jotka rakentavat RAG (Retrieval-Augmented Generation) -sovelluksia, hallinnoivat moni-mallikäyttöönottoja tai toteuttavat kattavia tekoälyn arviointiputkia.

**Keskeiset kehittäjäominaisuudet**:
- **🔍 Mallien löytäminen & käyttöönotto**: Tutustu Microsoft Foundryn malliluetteloon, saa yksityiskohtaista mallin tietoa koodiesimerkkien kanssa ja ota malleja käyttöön Azure AI -palveluissa
- **📚 Tietämyksen hallinta**: Luo ja hallinnoi Azure AI Search -indeksejä, lisää dokumentteja, määritä indeksoijat ja rakenna monimutkaisia RAG-järjestelmiä
- **⚡ Tekoälyagenttien integrointi**: Yhdistä Azuren tekoälyagentteihin, kysy olemassa olevilta agenteilta ja arvioi agenttien suorituskykyä tuotantotilanteissa
- **📊 Arviointikehys**: Suorita kattavia tekstin ja agenttien arviointeja, tuota markdown-raportteja ja toteuta laadunvarmistusta tekoälysovelluksille
- **🚀 Prototyyppityökalut**: Hanki asennusohjeet GitHub-pohjaiseen prototyyppaukseen ja pääsy Microsoft Foundry Labsin huippututkimusmalleihin

**Todellinen kehittäjän käyttötapaus**: "Ota Phi-4-malli käyttöön Azure AI -palveluissa sovellustani varten", "Luo uusi hakemisto dokumentaation RAG-järjestelmääni varten", "Arvioi agenttini vastaukset laatumittareiden mukaan" tai "Löydä paras päättelymalli monimutkaisiin analyysitehtäviini"

**Täysi demotilanne**: Tässä tehokas tekoälykehityksen työnkulku:

> "Rakennan asiakastukirobottia. Auta minua löytämään hyvä päättelymalli luettelosta, ottamaan se käyttöön Azure AI -palveluissa, luomaan tietokanta dokumentaatiostamme, perustamaan arviointikehys vastausten laadun testaamiseksi ja auttaa prototyypin tekemisessä GitHub-tokenin avulla testaukseen."

Microsoft Foundry MCP Server:
- Kysyy malliluetteloa suosittelemaan optimaalisia päättelymalleja tarpeidesi mukaan
- Tarjoaa käyttöönotto-komennot ja käyttökiintiötiedot haluamallesi Azure-alueelle
- Määrittää Azure AI Search -indeksit oikealla skeemalla dokumentaatiollesi
- Konfiguroi laadunmittaus- ja turvatarkistukset arviointiputkille
- Tuottaa prototyyppikoodin GitHubin tunnistautumisella välittömään testaukseen
- Tarjoaa kattavat asennusohjeet sovelluksesi teknologiapinoon sopivaksi

**Esittelyesimerkki**: Kehittäjänä minulla on ollut vaikeuksia pysyä perillä eri LLM-malleista. Tiedän muutaman päämallin, mutta olen tuntenut jääväni paitsi tuottavuuden ja tehokkuuden parannuksista. Tokeneiden ja kiintiöiden hallinta on stressaavaa ja vaikeaa – en koskaan tiedä, valitsenko oikean mallin oikeaan tehtävään tai kulutan budjettia tehottomasti. Kuulin tästä MCP Serveristä James Montemagnolta, kun kyselin tiimikavereilta suosituksia MCP Servereistä tähän kirjoitukseen, ja olen innoissani päästessäni kokeilemaan sitä! Mallien etsintäominaisuudet näyttävät erityisen vaikuttavilta kaltaiselleni käyttäjälle, joka haluaa tutkia tavallisten mallien ulkopuolelle ja löytää tehtäviin optimoituja malleja. Arviointikehys auttaa varmistamaan, että saan oikeasti parempia tuloksia, en vain kokeile jotain uutta kokeilun vuoksi.

> **ℹ️ Kokeellinen tila**
> 
> Tämä MCP-palvelin on kokeellinen ja aktiivisessa kehityksessä. Ominaisuudet ja rajapinnat voivat muuttua. Erinomainen Azuren tekoälyominaisuuksien tutkimiseen ja prototyyppien rakentamiseen, mutta varmistathan vakausvaatimukset tuotantokäyttöön.

### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![Asenna VS Codeen](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Asenna VS Code Insidersiin](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**Mitä se tekee**: Tarjoaa kehittäjille olennaiset työkalut tekoälyagenttien ja sovellusten rakentamiseen, jotka integroituvat Microsoft 365:een ja Microsoft 365 Copilotiin, mukaan lukien skeeman validoinnin, koodiesimerkkien haun ja vianmäärityksen avun.

**Miksi se on hyödyllinen**: Microsoft 365:lle ja Copilotille kehittäminen sisältää monimutkaisia manifestiskeemoja ja erityisiä kehitysmalleja. Tämä MCP-palvelin tuo keskeiset kehitysresurssit suoraan koodiympäristöösi, auttaen validoimaan skeemoja, löytämään esimerkkikoodia ja ratkaisemaan yleisiä ongelmia ilman jatkuvaa dokumentaation selailua.

**Todellinen käyttötapaus**: "Varmista agenttimanifestini deklaratiivisuus ja korjaa skeemavirheet", "Näytä minulle Microsoft Graph API:n lisäosan esimerkkikoodi" tai "Auta minua ratkaisemaan Teams-sovellukseni tunnistautumisongelmat"

**Esittelyesimerkki**: Otin yhteyttä ystävääni John Milleriin, jonka tapasin Buildissa keskustelemassa M365-agentteihin liittyen, ja hän suositteli tätä MCP:tä. Tämä on erinomainen kehittäjille, jotka ovat uusia M365-agenttien parissa, sillä se tarjoaa malleja, koodiesimerkkejä ja rakennetta ilman, että hukut dokumentaatioon. Skeeman validointiominaisuudet vaikuttavat erityisen hyödyllisiltä, jotta voi välttää manifestin rakenteellisia virheitä, jotka helposti johtavat tunteihin bugien selvittelyä.

> **💡 Vinkki**
> 
> Käytä tätä palvelinta yhdessä Microsoft Learn Docs MCP Serverin kanssa saadaksesi kokonaisvaltaista tukea M365-kehitykseen – toinen tarjoaa virallisen dokumentaation ja tämä käytännön kehitystyökalut ja vianmäärityksen.

## Mitä seuraavaksi? 🔮

## 📋 Yhteenveto

Model Context Protocol (MCP) muuttaa tapaa, jolla kehittäjät käyttävät tekoälyavustajia ja ulkopuolisia työkaluja. Nämä 10 Microsoftin MCP-palvelinta osoittavat standardoidun tekoälyintegraation voiman, mahdollistaen saumattomat työnkulut, jotka pitävät kehittäjät flow-tilassa samalla kun he hyödyntävät tehokkaita ulkoisia ominaisuuksia.

Laajasta Azure-ekosysteemin integraatiosta erikoistuneisiin työkaluihin, kuten Playwright selaimen automaatioon ja MarkItDown dokumenttien käsittelyyn, nämä palvelimet näyttävät, kuinka MCP voi tehostaa tuottavuutta monipuolisissa kehitystilanteissa. Standardoitu protokolla varmistaa työkalujen yhteensopivuuden ja yhtenäisen kehityskokemuksen.

MCP-ekosysteemin kehittyessä yhteisön osallistuminen, uusien palvelimien tutkiminen ja räätälöityjen ratkaisujen rakentaminen ovat avainasemassa kehitystuottavuuden maksimoimiseksi. MCP:n avoimen standardin luonteensa ansiosta voit yhdistellä eri toimittajien työkaluja luodaksesi juuri sinun tarpeisiisi täydellisen työnkulun.

## 🔗 Lisäresurssit

- [Virallinen Microsoft MCP -repositorio](https://github.com/microsoft/mcp)
- [MCP-yhteisö & dokumentaatio](https://modelcontextprotocol.io/introduction)
- [VS Code MCP -dokumentaatio](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP -dokumentaatio](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP -dokumentaatio](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP-tapahtumat](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Mahtavat GitHub Copilot -muokkaukset](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days Live 29./30. heinäkuuta tai katso tallenteena](https://aka.ms/mcpdevdays)

## 🎯 Harjoitukset

1. **Asennus ja konfigurointi**: Asenna joku MCP-palvelin VS Code -ympäristöösi ja testaa perustoiminnot.
2. **Työnkulun integrointi**: Suunnittele kehityksen työnkulku, joka yhdistää vähintään kolme eri MCP-palvelinta.
3. **Oman palvelimen suunnittelu**: Tunnista päivittäisestä kehitystyöstäsi tehtävä, joka hyötyisi räätälöidystä MCP-palvelimesta ja laadi sille määrittely.
4. **Suorituskyvyn analyysi**: Vertaa MCP-palvelinten käyttämisen tehokkuutta perinteisiin kehitystapoihin verrattuna.
5. **Turvallisuustarkastus**: Arvioi MCP-palvelinten käytön turvallisuusvaikutukset kehitysympäristössäsi ja ehdota parhaita käytäntöjä.

Seuraava: [Parhaat käytännöt](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->