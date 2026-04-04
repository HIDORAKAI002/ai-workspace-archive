# Juhtumiuuring: REST API avalikustamine API halduses MCP serverina

Azure API Management on teenus, mis pakub teie API lõpp-punktide kohale väravat. Selle toimimine seisneb selles, et Azure API Management toimib nagu proxy teie API-de ees ning otsustab, mida saabuvate päringutega teha.

Selle kasutamisega lisate hulgaliselt funktsioone, näiteks:

- **Turvalisus**, saate kasutada kõike alates API võtmetest, JWT-st kuni hallatud identiteedini.
- **Kiirusepiiramine**, suurepärane funktsioon on otsustada, mitu kõnet lubatakse teatud ajaperioodi jooksul. See aitab tagada kõigile kasutajatele hea kogemuse ja takistab teenuse ülekoormamist päringutega.
- **Skaalumine ja koormuse tasakaalustamine**. Võite seadistada mitu lõpp-punkti, et koormust jaotada, ning samuti valida, kuidas "koormust tasakaalustada".
- **Tehisintellekti funktsioonid nagu semantiline vahemällu salvestamine**, tokenite piirang ja jälgimine ning palju muud. Need on suurepärased funktsioonid, mis parandavad reageerimiskiirust ja aitavad teil tokenikulu kontrolli all hoida. [Loe täpsemalt siit](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Miks MCP + Azure API Management?

Model Context Protocol muutub kiiresti standardiks agentsete tehisintellekti rakenduste jaoks ja selleks, kuidas tööriistu ja andmeid ühtlaselt avaldada. Azure API Management on loomulik valik, kui on vaja "haldada" API-sid. MCP serverid integreeruvad sageli teiste API-dega, et lahendada päringuid näiteks mõne tööriista jaoks. Seetõttu on Azure API Managementu ja MCP ühendamine mõistlik.

## Ülevaade

Selles konkreetses juhtumis õpime, kuidas avalikustada API lõpp-punkte MCP serverina. Selle abil saame neid lõpp-punkte hõlpsasti agentse rakenduse osana kasutada, samal ajal kasutades Azure API Managementu funktsionaalsust.

## Peamised funktsioonid

- Valite lõpp-punktide meetodid, mida soovite tööriistadena avaldada.
- Lisafunktsioonid sõltuvad sellest, mida seadistate oma API poliitika sectionis. Siin näitame, kuidas lisada kiirusepiirang.

## Eelnev samm: API importimine

Kui teil on Azure API Managementus juba API olemas, siis saate selle sammu vahele jätta. Kui mitte, vaadake seda linki: [API importimine Azure API Managementusse](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## API avalikustamine MCP serverina

API lõpp-punktide avalikustamiseks järgige neid samme:

1. Minge Azure Portalile aadressil <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> ja avage oma API Managementu eksemplar.

1. Vasakpoolses menüüs valige APIs > MCP Servers > + Create new MCP Server.

1. API valikus valige REST API, mida soovite MCP serverina avaldada.

1. Valige üks või mitu API operatsiooni, mida soovite tööriistadena avaldada. Võite valida kõik operatsioonid või ainult kindlad.

    ![Valige meetodid avalikustamiseks](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Valige **Create**.

1. Minge menüüsse **APIs** ja **MCP Servers**, seal näete järgmist:

    ![Vaadake MCP serverit põhivaates](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP server on loodud ja API operatsioonid on avalikustatud tööriistadena. MCP server on loetletud MCP Servers paneelis. Veeru URL all kuvatakse MCP serveri lõpp-punkti aadress, mida saate kasutada testimiseks või kliendi rakenduses.

## Valikuline: poliitikate seadistamine

Azure API Managementu tuumikmõiste on poliitikad, kus saate seadistada erinevaid reegleid oma lõpp-punktide jaoks, näiteks kiirusepiirang või semantiline vahemälu. Need poliitikad on kirjeldatud XML-is.

Siin on, kuidas seadistada poliitika MCP serveri kiirusepiirangu jaoks:

1. Portaalis valige APIs alt **MCP Servers**.

1. Valige loodud MCP server.

1. Vasakpoolses menüüs MCP alt valige **Policies**.

1. Poliitika redaktoris lisage või muutke poliitikaid, mida soovite MCP serveri tööriistadele rakendada. Poliitikad on määratletud XML formaadis. Näiteks võite lisada poliitika, mis piirab MCP serveri tööriistadele tehtud kõnede arvu (selles näites 5 kõnet 30 sekundi jooksul kliendi IP-aadressi kohta). Siin on XML, mis määrab kiirusepiirangu:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Siin on pilt poliitika redaktorist:

    ![Poliitika redaktor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Proovi järgi

Veendume, et meie MCP server töötab ootuspäraselt.

Selleks kasutame Visual Studio Code’i ja GitHub Copiloti Agendi režiimi. Lisame MCP serveri *mcp.json* faili. Sel viisil toimib Visual Studio Code kliendina agentsete võimetega ning lõppkasutajad saavad tekstipäringuga pöörduda selle serveri poole.

Kuidas lisada MCP server Visual Studio Code’is:

1. Kasutage käsuribal käsku MCP: **Add Server command**.

1. Kui küsitakse, valige serveri tüübiks: **HTTP (HTTP või Server Sent Events)**.

1. Sisestage Azure API Managementu MCP serveri URL. Näide: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE lõpp-punkti jaoks) või **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP lõpp-punkti jaoks). Vahe transportide vahel on `/sse` või `/mcp`.

1. Sisestage serveri ID oma valikul. See pole oluline väärtus, kuid aitab teil meeles pidada, mis serveri instants see on.

1. Valige, kas salvestada konfiguratsioon tööruumi seadistustesse või kasutaja seadistustesse.

  - **Tööruumi seadistused** - serveri konfiguratsioon salvestatakse .vscode/mcp.json faili, mis on saadaval ainult praeguses tööruumis.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    või kui valite voogedastuse HTTP transpordina, on see veidi erinev:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Kasutaja seadistused** - serveri konfiguratsioon lisatakse teie globaalsetesse *settings.json* failidesse ning on saadaval kõikides tööruumides. Konfiguratsioon näeb välja umbes selline:

    ![Kasutaja seadistus](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Samuti peate lisama konfiguratsiooni, päise, mis tagab toetava autentimise Azure API Managementu suunas. See kasutab päist nimega **Ocp-Apim-Subscription-Key*.

    - Siin on, kuidas saate selle lisada seadistustesse:

    ![Autentimise päise lisamine](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), see põhjustab, et kuvatakse päring API võtme kohta, mille leiate Azure portalist oma Azure API Managementu eksemplari jaoks.

   - Kui soovite lisada selle *mcp.json* faili, saate lisada selle järgmiselt:

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

### Kasuta Agendi režiimi

Nüüd oleme kõik seadistanud kas seadistustes või *.vscode/mcp.json* failis. Proovime järgi.

Peaks ilmnema selline Tööriistade ikoon, kus kuvatakse teie serveri avalikustatud tööriistad:

![Serveri tööriistad](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klõpsake tööriistade ikooni ja peaksite nägema tööriistade nimekirja:

    ![Tööriistad](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Sisestage vestluses päring tööriista kutsumiseks. Näiteks, kui valisite tööriista, mis tagastab teavet tellimuse kohta, võite agentilt tellimuse kohta küsida. Näide päringust:

    ```text
    get information from order 2
    ```

    Teile ilmub nüüd tööriistade ikoon, mis palub serveri tööriista käivitamist kinnitada. Valige, et jätkata tööriista kasutamist, ja näete tulemusi selliselt:

    ![Päringu tulemus](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **mida näete sõltub teie seadistatud tööriistadest, kuid idee on, et saate tekstilise vastuse nagu eespool**


## Viited

Siit saate rohkem teada:

- [Õpetus Azure API Managementu ja MCP kohta](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python näidis: Kaug-MCP serverite turvaline töötlemine Azure API Managementu abil (katsetusfaas)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP kliendi autoriseerimislabor](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Kasuta Azure API Managementu laiendust VS Code’is API-de importimiseks ja haldamiseks](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registreeri ja avasta kaug-MCP servereid Azure API Centeris](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Suurepärane hoidla, mis demonstreerib palju tehisintellekti võimekusi Azure API Managementuga
- [AI Gateway töötoad](https://azure-samples.github.io/AI-Gateway/) Sisaldab töötoad, kasutades Azure Portali, mis on suurepärane viis AI võimekuse hindamiseks.

## Mis järgmiseks

- Tagasi: [Juhtumiuuringute ülevaade](./README.md)
- Järgmine: [Azure AI reisibürood](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud kasutades tehisintellekti tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüame täpsust, palun arvestage, et automaatsed tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument oma emakeeles tuleks pidada autoriteetseks allikaks. Olulise info puhul on soovitatav kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tingitud arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->