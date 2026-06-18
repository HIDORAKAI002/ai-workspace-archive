# Tapaus 3: In-editor-dokumentaatio MCP-palvelimen kanssa VS Codessa

## Yleiskatsaus

Tässä tapauksessa opit, miten Microsoft Learn -dokumentaatio tuodaan suoraan Visual Studio Code -ympäristöösi MCP-palvelimen avulla. Sen sijaan, että vaihtaisit jatkuvasti selaimen välilehtiä dokumentaation hakemiseksi, voit hakea, lukea ja viitata virallisiin dokumentteihin suoraan editorissasi. Tämä menetelmä virtaviivaistaa työnkulkua, pitää sinut keskittyneenä ja mahdollistaa saumattoman integraation GitHub Copilotin kaltaisten työkalujen kanssa.

- Hae ja lue dokumentaatiota VS Codessa poistumatta koodausympäristöstäsi.
- Viittaa dokumentaatioon ja lisää linkkejä suoraan README- tai kurssitiedostoihisi.
- Käytä GitHub Copilotia ja MCP:tä yhdessä saumattomaan, tekoälyavusteiseen dokumentaatiotyönkulkuun.

## Oppimistavoitteet

Luvun lopuksi osaat asentaa ja käyttää MCP-palvelinta VS Codessa parantaaksesi dokumentaatiota ja kehitystyönkulkua. Osaat:

- Määrittää työtilasi käyttämään MCP-palvelinta dokumentaation haussa.
- Hakea ja lisätä dokumentaatiota suoraan VS Codesta.
- Yhdistää GitHub Copilotin ja MCP:n voiman tehokkaampaan, tekoälyavusteiseen työnkulkuun.

Nämä taidot auttavat sinua pysymään keskittyneenä, parantamaan dokumentaation laatua ja lisäämään tuottavuuttasi kehittäjänä tai teknisenä kirjoittajana.

## Ratkaisu

Editorin sisäisen dokumentaatiokäytön saavuttamiseksi seuraat sarjaa vaiheita, jotka yhdistävät MCP-palvelimen VS Codeen ja GitHub Copilotiin. Tämä ratkaisu on ihanteellinen kurssien tekijöille, dokumentaation kirjoittajille ja kehittäjille, jotka haluavat säilyttää keskittymisensä editorissa työskennellessään dokumentaation ja Copilotin kanssa.

- Lisää nopeasti viitelinkkejä README-tiedostoon kurssia tai projektidokumentaatiota kirjoittaessasi.
- Käytä Copilotia koodin luomiseen ja MCP:tä löytämään ja viittaamaan nopeasti asiaankuuluvaan dokumentaatioon.
- Pysy keskittyneenä editorissasi ja lisää tuottavuutta.

### Vaiheittainen opas

Aloittaaksesi toimi seuraavasti. Voit lisätä kunkin vaiheen yhteyteen kuvakaappauksen assets-kansiosta havainnollistamaan prosessia.

1. **Lisää MCP:n konfiguraatio:**
   Projektisi juuressa luo `.vscode/mcp.json` -tiedosto ja lisää siihen seuraava kokoonpano:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Tämä määritys kertoo VS Codelle, miten yhdistää [`Microsoft Learn Docs MCP -palvelimeen`](https://github.com/MicrosoftDocs/mcp).
   
   ![Vaihe 1: Lisää mcp.json .vscode-kansioon](../../../../../../translated_images/fi/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Avaa GitHub Copilot Chat -paneeli:**
   Jos GitHub Copilot -laajennus ei ole vielä asennettuna, siirry VS Coden Extensions-näkymään ja asenna se. Voit ladata sen suoraan [Visual Studio Code Marketplacesta](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Avaa sitten Copilot Chat -paneeli sivupalkista.

   ![Vaihe 2: Avaa Copilot Chat -paneeli](../../../../../../translated_images/fi/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Ota agenttitila käyttöön ja tarkista työkalut:**
   Copilot Chat -paneelissa ota agenttitila käyttöön.

   ![Vaihe 3: Ota agenttitila käyttöön ja tarkista työkalut](../../../../../../translated_images/fi/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Agenttitilan ollessa päällä varmista, että MCP-palvelin näkyy käytettävissä olevana työkaluna. Tämä varmistaa, että Copilot-agentti pääsee käsiksi dokumentaatiopalvelimeen hakeakseen relevanttia tietoa.
   
   ![Vaihe 3: Tarkista MCP-palvelintyökalu](../../../../../../translated_images/fi/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Aloita uusi keskustelu ja kysy agentilta:**
   Avaa uusi keskustelu Copilot Chat -paneelissa. Voit nyt esittää agentille dokumentaatioon liittyviä kysymyksiä. Agentti käyttää MCP-palvelinta noutaakseen ja näyttääksesi asiaankuuluvaa Microsoft Learn -dokumentaatiota suoraan editorissasi.

   - *"Yritän laatia opintosuunnitelmaa aiheelle X. Opiskelen sitä 8 viikon ajan, ehdota kutakin viikkoa varten sopivaa sisältöä."*

   ![Vaihe 4: Kysy agentilta chatissa](../../../../../../translated_images/fi/step4-prompt-chat.12187bb001605efc.webp)

5. **Live-kysely:**

   > Otetaan esimerkki live-kyselystä Microsoft Foundry Discordin [#get-help](https://discord.gg/D6cRhjHWSC) -kanavalta ([näytä alkuperäinen viesti](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Etsin vastauksia miten ottaa käyttöön moniagenttiratkaisu, jossa Azure AI Foundrylla kehitetyt AI-agentit. Näen, ettei suoraa käyttöönotto menetelmää ole, kuten Copilot Studio -kanavat. Mitkä ovat eri tavat toteuttaa tämä käyttöönotto, jotta yrityskäyttäjät voivat olla vuorovaikutuksessa ja saada työn tehtyä?
On lukuisia artikkeleita/blogeja, joissa sanotaan, että Azure Bot -palvelua voi käyttää tässä tehtävässä siltana MS Teamsin ja Azure AI Foundryn agenttien välillä. Toimiiko tämä, jos perustan Azure Botin, joka yhdistää Orchestrator-agenttiin Azure AI Foundryssa Azure Functionin avulla orkestrointia varten, vai pitääkö tehdä erillinen Azure Function kullekin AI-agentille moniagenttiratkaisussa Bot Frameworkin orkestroinnin suorittamiseksi? Muita ehdotuksia otetaan mielellään vastaan."*

   ![Vaihe 5: Live-kyselyt](../../../../../../translated_images/fi/step5-live-queries.49db3e4a50bea273.webp)

   Agentti vastaa asiaankuuluvilla dokumentaatio-linkeillä ja yhteenvetoilla, jotka voit sitten lisätä suoraan markdown-tiedostoihisi tai käyttää viitteinä koodissasi.
   
### Esimerkkikyselyt

Tässä on muutama esimerkkikysely, joita voit kokeilla. Nämä kyselyt osoittavat, miten MCP-palvelin ja Copilot voivat toimia yhdessä tarjoten välitöntä, kontekstin mukaista dokumentaatiota ja viitteitä poistumatta VS Codesta:

- "Näytä, miten Azure Functions -triggerit toimivat."
- "Lisää linkki viralliseen dokumentaatioon Azure Key Vaultista."
- "Mitkä ovat parhaat käytännöt Azure-resurssien suojaamiseksi?"
- "Etsi pikaopas Azure AI -palveluihin."

Nämä kyselyt demonstroivat, miten MCP-palvelin ja Copilot toimivat yhdessä tarjoten välitöntä, kontekstin mukaista dokumentaatiota ja viitteitä poistumatta VS Codesta.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->