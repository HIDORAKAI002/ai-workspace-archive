# Prípadová štúdia: Exponovanie REST API v API Management ako MCP server

Azure API Management je služba, ktorá poskytuje bránu nad vašimi API koncovými bodmi. Funguje tak, že Azure API Management pôsobí ako proxy pred vašimi API a môže rozhodovať o tom, čo sa má robiť s prichádzajúcimi požiadavkami.

Použitím tejto služby získate množstvo funkcií ako napríklad:

- **Bezpečnosť**, môžete použiť všetko od API kľúčov, JWT až po spravovanú identitu.
- **Obmedzovanie rýchlosti** (rate limiting), skvelá funkcia umožňujúca rozhodnúť, koľko volaní prejde za určitú časovú jednotku. To pomáha zabezpečiť, aby všetci používatelia mali skvelý zážitok a zároveň aby vaša služba nebola preťažená požiadavkami.
- **Škálovanie a vyvažovanie záťaže**. Môžete nastaviť viacero koncových bodov na vyváženie záťaže a tiež rozhodnúť, ako chcete „vyvažovať záťaž“.
- **AI funkcie ako sémantické cachovanie**, limit tokenov a monitorovanie tokenov a ďalšie. Tieto skvelé funkcie zlepšujú odozvu a pomáhajú vám mať prehľad o vašej spotrebe tokenov. [Viac informácií tu](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities). 

## Prečo MCP + Azure API Management?

Model Context Protocol sa rýchlo stáva štandardom pre agentové AI aplikácie a spôsob, ako exponovať nástroje a dáta konzistentným spôsobom. Azure API Management je prirodzenou voľbou, keď potrebujete „spravovať“ API. MCP servery sa často integrujú s inými API, aby napríklad riešili požiadavky na nejaký nástroj. Preto kombinácia Azure API Management a MCP dáva veľký zmysel.

## Prehľad

V tomto konkrétnom prípade použitia sa naučíme, ako exponovať API koncové body ako MCP server. Týmto spôsobom môžeme jednoducho spraviť tieto koncové body súčasťou agentovej appky, pričom zároveň využívame funkcie Azure API Management.

## Kľúčové funkcie

- Vyberiete metódy koncových bodov, ktoré chcete exponovať ako nástroje.
- Dodatočné funkcie závisia od toho, čo nakonfigurujete v sekcii politík pre vaše API. Tu vám ukážeme, ako môžete pridať obmedzenie rýchlosti (rate limiting).

## Predkrok: import API

Ak už máte API v Azure API Management, skvelé, môžete tento krok preskočiť. Ak nie, pozrite si tento odkaz, [importovanie API do Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Exponovanie API ako MCP server

Postupujte podľa týchto krokov:

1. Prejdite na Azure Portal a na túto adresu <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
Prejdite do vašej inštancie API Management.

1. V ľavom menu vyberte APIs > MCP Servers > + Create new MCP Server.

1. V sekcii API vyberte REST API, ktoré chcete vystaviť ako MCP server.

1. Vyberte jednu alebo viac API operácií, ktoré chcete exponovať ako nástroje. Môžete vybrať všetky operácie alebo iba konkrétne.

    ![Vyberte metódy na exponovanie](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Kliknite na **Create**.

1. Prejdite do menu **APIs** a **MCP Servers**, mali by ste vidieť nasledovné:

    ![Zobrazenie MCP Servera v hlavnom paneli](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP server je vytvorený a API operácie sú exponované ako nástroje. MCP server je uvedený v paneli MCP Servers. Stĺpec URL zobrazuje koncový bod MCP servera, ktorý môžete volať pre testovanie alebo vo vašej klientovej aplikácii.

## Voliteľné: Konfigurácia politík

Azure API Management má základný koncept politík, kde nastavujete rôzne pravidlá pre vaše koncové body, napríklad obmedzenie rýchlosti alebo sémantické cachovanie. Tieto politiky sa píšu v XML.

Tu je postup, ako nastaviť politiku obmedzujúcu rýchlosť pre váš MCP Server:

1. V portáli, pod APIs, vyberte **MCP Servers**.

1. Vyberte váš vytvorený MCP server.

1. V ľavom menu pod MCP vyberte **Policies**.

1. V editore politík pridajte alebo upravte politiky, ktoré chcete aplikovať na nástroje MCP servera. Politiky sú definované v XML formáte. Napríklad môžete pridať politiku na obmedzenie počtu volaní nástrojov MCP servera (v tomto príklade 5 volaní za 30 sekúnd pre jedno IP klienta). Tu je XML, ktoré spôsobí obmedzenie rýchlosti:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Tu je obrázok editora politík:

    ![Editor politík](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Vyskúšajte to

Uistime sa, že náš MCP server funguje podľa očakávania.

Použijeme Visual Studio Code a GitHub Copilot v jeho Agent režime. Pridáme MCP server do *mcp.json* súboru. Tým Visual Studio Code bude pôsobiť ako klient s agentovými schopnosťami a koncoví používatelia budú môcť zadať požiadavku a interagovať s daným serverom.

Ako na to, pridáme MCP server do Visual Studio Code:

1. Použite príkaz MCP: **Add Server z Command Palette**.

1. Keď budete vyzvaní, vyberte typ servera: **HTTP (HTTP alebo Server Sent Events)**.

1. Zadajte URL MCP servera v API Management. Napríklad: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (pre SSE koncový bod) alebo **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (pre MCP koncový bod), všimnite si, že rozdiel medzi transportami je `/sse` alebo `/mcp`.

1. Zadajte ID servera podľa vášho výberu. Nie je to dôležitá hodnota, ale pomôže vám zapamätať si, čo táto inštancia servera je.

1. Vyberte, či chcete uložiť konfiguráciu do nastavení pracovného priestoru alebo používateľských nastavení.

  - **Nastavenia pracovného priestoru** - konfigurácia servera sa uloží do súboru .vscode/mcp.json, ktorý je dostupný iba v aktuálnom pracovnom priestore.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    alebo ak zvolíte streaming HTTP ako transport, bude to mierne odlišné:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Používateľské nastavenia** - konfigurácia servera sa pridá do globálneho súboru *settings.json* a je dostupná vo všetkých pracovných priestoroch. Konfigurácia vyzerá približne takto:

    ![Používateľské nastavenie](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Tiež je potrebné pridať konfiguráciu hlavičky na správnu autentifikáciu voči Azure API Management. Používa sa hlavička nazvaná **Ocp-Apim-Subscription-Key**. 

    - Tu je spôsob, ako ju môžete pridať do nastavení:

    ![Pridanie hlavičky pre autentifikáciu](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), čo spôsobí zobrazenie výzvy na zadanie hodnoty API kľúča, ktorý nájdete v Azure Portáli pre vašu inštanciu Azure API Management.

   - Ak chcete namiesto toho pridať do *mcp.json*, môžete ho pridať takto:

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

### Použitie Agent režimu

Teraz sme pripravení – či už v nastaveniach alebo v *.vscode/mcp.json*. Skúsme to.

Mali by ste vidieť ikonu Nástrojov takto, kde sú vypísané exponované nástroje z vášho servera:

![Nástroje zo servera](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Kliknite na ikonu nástrojov a mali by ste vidieť zoznam nástrojov:

    ![Nástroje](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Zadajte prompt do chatu na vyvolanie nástroja. Napríklad, ak ste vybrali nástroj na získanie informácie o objednávke, môžete agenta opýtať o objednávku. Tu je príklad požiadavky:

    ```text
    get information from order 2
    ```

    Teraz by sa vám mala zobraziť ikona nástrojov vyzývajúca vás pokračovať vo volaní nástroja. Vyberte pokračovanie spustenia nástroja, mali by ste vidieť výstup napríklad takto:

    ![Výsledok z promptu](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **čo vidíte vyššie závisí na tom, aké nástroje ste nastavili, ale podstata je, že dostanete textovú odpoveď ako vyššie**


## Referencie

Tu je, kde sa môžete dozvedieť viac:

- [Návod na Azure API Management a MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python príklad: Bezpečné vzdialené MCP servery s použitím Azure API Management (experimentálne)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Laboratórium autorizácie MCP klienta](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Používanie rozšírenia Azure API Management pre VS Code na import a správu API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registrácia a objavovanie vzdialených MCP serverov v Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Skvelé repozitár, ktorý ukazuje množstvo AI schopností s Azure API Management
- [AI Gateway workshopy](https://azure-samples.github.io/AI-Gateway/) Obsahuje workshopy používajúce Azure Portal, čo je skvelý spôsob, ako začať skúmať AI schopnosti.

## Čo nasleduje

- Späť na: [Prehľad prípadových štúdií](./README.md)
- Ďalej: [Azure AI travel agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Výhrada**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, uvedomte si, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nezodpovedáme za žiadne nedorozumenia alebo nesprávne výklady vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->