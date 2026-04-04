# Case Study: Paljasta REST-rajapinta API Managementissa MCP-palvelimena

Azure API Management on palvelu, joka tarjoaa portaalin API-päätteidesi päälle. Sen toimintaperiaate on, että Azure API Management toimii välityspalvelimena API:idesi edessä ja voi päättää, mitä saapuville pyynnöille tehdään.

Sen avulla lisäät joukon ominaisuuksia, kuten:

- **Tietoturva**, voit käyttää kaikkea API-avaimista, JWT:stä hallittuihin identiteetteihin.
- **Kutsujen rajoitus**, erinomainen ominaisuus on pystyä määrittämään, kuinka monta kutsua läpäisee tietyn ajan yksikköä kohden. Tämä auttaa varmistamaan, että kaikilla käyttäjillä on hyvä kokemus ja että palvelusi ei kuormitu liikaa.
- **Skaalaus ja kuormantasaus**. Voit määrittää useita päätteitä tasapainottamaan kuormaa, ja voit päättää, miten "kuormantasaat".
- **AI-ominaisuuksia, kuten semanttinen välimuisti**, token-rajoitus ja token-seuranta sekä enemmän. Nämä ovat erinomaisia ominaisuuksia, jotka parantavat reagointinopeutta sekä auttavat sinua hallitsemaan token-kulutusta. [Lue lisää tästä](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Miksi MCP + Azure API Management?

Model Context Protocol (MCP) on nopeasti muodostumassa standardiksi agenttipohjaisissa AI-sovelluksissa sekä työkalujen ja datan yhdenmukaistettuun paljastamiseen. Azure API Management on luonnollinen valinta, kun sinun täytyy "hallita" API:ita. MCP-palvelimet integroituvat usein muihin API:ihin ratkaistakseen pyynnöt esim. työkaluun. Siksi Azure API Managementin ja MCP:n yhdistäminen on järkevää.

## Yleiskatsaus

Tässä erityisessä käyttötapauksessa opettelemme paljastamaan API-päätteitä MCP-palvelimena. Näin voimme helposti tehdä nämä päätteen osaksi agenttikäyttöistä sovellusta ja samalla hyödyntää Azure API Managementin ominaisuuksia.

## Tärkeimmät ominaisuudet

- Valitset päätteen metodit, jotka haluat paljastaa työkaluina.
- Lisäominaisuudet riippuvat siitä, mitä konfiguroit API:si käytäntöosiossa. Tässä näytämme, miten lisäät kutsujen rajoituksen.

## Ennen aloitusta: tuo API

Jos sinulla on jo API Azure API Managementissa, hienoa, voit hypätä tämän vaiheen yli. Muussa tapauksessa tutustu tähän linkkiin, [API:n tuonti Azure API Managementiin](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Paljasta API MCP-palvelimena

Paljastaaksesi API-päätteet, noudata näitä vaiheita:

1. Siirry Azure-portaaliin ja osoitteeseen <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Siirry API Management -instanssiisi.

1. Vasemmasta valikosta valitse APIs > MCP Servers > + Luo uusi MCP Server.

1. Valitse API-kohdasta REST API, jonka haluat paljastaa MCP-palvelimena.

1. Valitse yksi tai useampi API-operaatio, jotka haluat paljastaa työkaluina. Voit valita kaikki operaatiot tai vain tietyt.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Valitse **Luo**.

1. Siirry valikkovaihtoehtoon **APIs** ja **MCP Servers**, sinun pitäisi nähdä seuraava:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP-palvelin on luotu ja API-operaatiot on paljastettu työkaluina. MCP-palvelin näkyy MCP Servers -paneelissa. URL-sarake näyttää MCP-palvelimen päätteen, jota voit kutsua testausta tai asiakassovelluksessa.

## Valinnainen: Määrittele käytännöt

Azure API Managementin peruskäsite ovat käytännöt, joilla määrität erilaisia sääntöjä päätteillesi, kuten kutsujen rajoitus tai semanttinen välimuisti. Nämä käytännöt kirjoitetaan XML-muodossa.

Näin määrittelet käytännön, joka rajoittaa kutsujen määrää MCP-palvelimessasi:

1. Portaalissa, under APIs, valitse **MCP Servers**.

1. Valitse luomasi MCP-palvelin.

1. Vasemmasta valikosta MCP:n alta valitse **Policies**.

1. Lisää tai muokkaa käytäntöjä, jotka haluat ottaa käyttöön MCP-palvelimen työkaluissa. Käytännöt määritellään XML-muodossa. Esimerkiksi voit lisätä käytännön, joka rajoittaa kutsuja MCP-palvelimen työkaluihin (tässä esimerkissä 5 kutsua 30 sekunnissa per asiakas-IP-osoite). Tässä on XML-konfiguraatio, joka rajoittaa kutsuja:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Tässä kuva käytäntöeditorista:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Kokeile

Varmistetaan, että MCP-palvelimemme toimii tarkoituksenmukaisesti.

Tätä varten käytämme Visual Studio Codea ja GitHub Copilotia agenttitilassa. Lisäämme MCP-palvelimen *mcp.json* -tiedostoon. Näin Visual Studio Code toimii agenttiosaavana asiakkaana, ja loppukäyttäjät voivat kirjoittaa kehotteen ja olla vuorovaikutuksessa palvelimen kanssa.

Näin lisäät MCP-palvelimen Visual Studio Codeen:

1. Käytä MCP-komentoa **Add Server** Komentopaletti-valikosta.

1. Kun sinulta kysytään, valitse palvelintyyppi: **HTTP (HTTP tai Server Sent Events)**.

1. Anna MCP-palvelimen URL API Managementissa. Esimerkiksi: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE-pääte) tai **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP-pääte), huomaa miten siirtoero on `/sse` tai `/mcp`.

1. Anna palvelimelle valitsemasi ID. Tämä ei ole tärkeä arvo mutta auttaa muistamaan kyseisen palvelininstanssin.

1. Valitse, tallennetaanko asetukset työtilan asetuksiin vai käyttäjäasetuksiin.

  - **Työtilan asetukset** - Palvelinasetukset tallentuvat vain nykyisen työtilan .vscode/mcp.json -tiedostoon.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    tai jos valitset streamin HTTP-siirtona, se näyttää hieman erilaiselta:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Käyttäjäasetukset** - Palvelinasetukset lisätään globaaliin *settings.json*-tiedostoon ja ne ovat käytettävissä kaikissa työtiloissa. Asetus näyttää tältä:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Sinun täytyy myös lisätä asetus, header varmistaaksesi, että todennus Azure API Managementiin toimii kunnolla. Käytetään otsikkoa nimeltä **Ocp-Apim-Subscription-Key**.

    - Näin lisäät sen asetuksiin:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), mikä aiheuttaa kehotteen syöttää API-avain, jonka löydät Azure-portaalista Azure API Management -instanssillesi.

   - Voit lisätä sen myös *mcp.json*-tiedostoon näin:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Käytä agenttitilaa

Nyt asetukset on tehty joko asetuksissa tai *.vscode/mcp.json*-tiedostossa. Kokeillaan.

Pitäisi olla Työkalut-kuvake, jossa paljastetut palvelintyökalut näkyvät:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klikkaa Työkalut-kuvaketta, ja näet työkalulistan:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Kirjoita kehotus keskusteluun aktivoidaksesi työkalun. Esimerkiksi, jos valitsit työkalun tilauksen tiedoille, voit kysyä agentilta tilausta koskevan kysymyksen. Tässä esimerkkikehotus:

    ```text
    get information from order 2
    ```

    Nyt sinulle esitetään työkalukuvake, joka pyytää jatkamaan työkalun kutsumista. Valitse jatkaaksesi työkalun käyttöä, jolloin näet tulosteen:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **näkyvä tulos riippuu valitsemistasi työkaluista, mutta ideana on saada tekstimuotoinen vastaus kuten yllä**


## Viitteet

Näin voit oppia lisää:

- [Opastus Azure API Managementista ja MCP:stä](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python-esimerkki: Suojaa etäiset MCP-palvelimet Azure API Managementilla (kokeellinen)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP-asiakkaan valtuutuslaboratorio](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Käytä Azure API Management -laajennusta VS Code:ssa API:en tuontiin ja hallintaan](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Rekisteröi ja löydä etäiset MCP-palvelimet Azure API Centerissä](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Erinomainen arkisto, joka näyttää monia AI-ominaisuuksia Azure API Managementin kanssa
- [AI Gateway -työpajat](https://azure-samples.github.io/AI-Gateway/) Sisältää työpajoja Azure-portaalilla, erinomainen tapa aloittaa AI-toimintojen arviointi.

## Mitä Seuraavaksi

- Takaisin: [Case Studies Overview](./README.md)
- Seuraava: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:  
Tämä asiakirja on käännetty tekoälykäännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, huomioithan, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen omalla kielellä tulisi katsoa viralliseksi lähteeksi. Tärkeää tietoa varten suositellaan ammattilaisen ihmiskääntäjän käyttöä. Emme ole vastuussa tämän käännöksen käytöstä johtuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->