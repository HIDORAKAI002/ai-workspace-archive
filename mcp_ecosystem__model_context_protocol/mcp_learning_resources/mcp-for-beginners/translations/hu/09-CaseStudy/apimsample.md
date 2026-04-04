# Esettanulmány: REST API közzététele API Management-ben MCP szerverként

Az Azure API Management egy olyan szolgáltatás, amely egy átjárót biztosít az API végpontjaid fölött. Az Azure API Management úgy működik, hogy proxyként lép fel az API-jaid előtt, és eldönti, hogy az érkező kérésekkel mit tegyen.

Használatával számos funkciót adhatsz hozzá, mint például:

- **Biztonság**, használhatsz mindent az API kulcsoktól, JWT-től a kezelt identitásig.
- **Hívásszám korlátozás**, nagyszerű funkció, hogy eldöntheted, mennyi hívás engedélyezett egy adott időegység alatt. Ez segít biztosítani, hogy minden felhasználó jó élményt kapjon, és hogy szolgáltatásod ne legyen túlterhelve kérésekkel.
- **Skálázás és terheléselosztás**. Beállíthatsz több végpontot a terhelés kiegyenlítésére, és dönthetsz arról is, hogyan végezze a "terheléselosztást".
- **Mesterséges intelligencia funkciók, mint szemantikus gyorsítótárazás**, tokenlimit és tokenfigyelés, és még sok más. Ezek nagyszerű funkciók, amelyek javítják a válaszkészséget, valamint segítenek kontroll alatt tartani a token költést. [További információk itt](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Miért MCP + Azure API Management?

A Model Context Protocol gyorsan szabvánnyá válik az agentikus AI alkalmazások és az eszközök, adatok következetes módon történő közzétételéhez. Az Azure API Management természetes választás, amikor API-kat kell "kezelni". Az MCP szerverek gyakran integrálódnak más API-kkal, hogy például egy eszköz alól oldják meg a kéréseket. Ezért az Azure API Management és az MCP kombinálása logikus.

## Áttekintés

Ebben az adott esetben megtanuljuk, hogyan tegyük közzé az API végpontokat MCP szerverként. Ezzel egyszerűen részeivé tehetjük azokat egy agentikus alkalmazásnak, miközben kihasználjuk az Azure API Management funkcióit.

## Főbb funkciók

- Kiválaszthatod, mely végpont metódusokat szeretnéd eszközként közzétenni.
- Az egyéb funkciók attól függnek, mit konfigurálsz a policy szekcióban az API-dhoz. Itt megmutatjuk, hogyan adhatsz hozzá hívásszám korlátozást.

## Előlépés: API importálása

Ha már van API-d az Azure API Management-ben, akkor kiváló, ezt a lépést átugorhatod. Ha nincs, nézd meg ezt a linket, [API importálása az Azure API Management-be](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## API végpontok közzététele MCP szerverként

Az API végpontok közzétételéhez kövesd a következő lépéseket:

1. Lépj be az Azure Portálba a következő címen: <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Navigálj az API Management példányodhoz.

1. A bal oldali menüben válaszd az APIs > MCP Servers > + Új MCP Server létrehozása.

1. Az API-ban válassz egy REST API-t, amit MCP szerverként szeretnél közzétenni.

1. Válassz ki egy vagy több API műveletet, amit eszközként szeretnél közzétenni. Kiválaszthatod az összes műveletet vagy csak bizonyos műveleteket.

    ![Válaszd ki a közzétenni kívánt metódusokat](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Kattints a **Létrehozás** gombra.

1. Navigálj az **APIs** és **MCP Servers** menüpontokra, ilyet fogsz látni:

    ![MCP szerver a fő nézetben](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Az MCP szerver létrejött, az API műveletek eszközként közzétéve. Az MCP szerver megjelenik az MCP Servers panelen. Az URL oszlop mutatja az MCP szerver végpontját, amit tesztelésre vagy kliens alkalmazásból hívhatsz.

## Opcionális: Szabályzatok konfigurálása

Az Azure API Management központi eleme a szabályzat (policy), amelyekkel különféle szabályokat állíthatsz be a végpontjaidra, például hívásszám korlátozás vagy szemantikus gyorsítótárazás. Ezeket szabályzatokat XML-ben írjuk.

Így állíthatsz be szabályzatot az MCP szervered hívásszám korlátozásához:

1. A portálon az APIs alatt válaszd ki az **MCP Servers**-t.

1. Válaszd ki a létrehozott MCP szervert.

1. A bal menüben az MCP alatt válaszd a **Policies**-t.

1. A szabályzat szerkesztőben add hozzá vagy szerkeszd a szabályzatokat, amelyeket alkalmazni szeretnél az MCP szerver eszközeire. Ezek XML formátumban vannak megadva. Például hozzáadhatsz egy szabályzatot, amely korlátozza az MCP szerver eszközeire érkező hívásokat (példánkban 5 hívás 30 másodpercenként egy ügyfél IP címenként). Az alábbi XML fogja beállítani a korlátozást:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Íme a szabályzatszerkesztő képe:

    ![Szabályzat szerkesztő](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Próbáld ki!

Győződjünk meg róla, hogy az MCP szerverünk rendeltetésszerűen működik.

Ehhez a Visual Studio Code-ot és a GitHub Copilot Agent módját fogjuk használni. Hozzáadjuk az MCP szervert egy *mcp.json* fájlhoz. Így a Visual Studio Code egy agentikus képességekkel rendelkező kliensként fog működni, és a végfelhasználók parancsot írhatnak, amely interakcióba lép a szerverrel.

Nézzük, hogyan adhatod hozzá az MCP szervert a Visual Studio Code-ban:

1. Használd az MCP: **Add Server parancsát a Command Palette-ből**.

1. Amikor megkérdezi, válaszd ki a szerver típusát: **HTTP (HTTP vagy Server Sent Events)**.

1. Add meg az Azure API Management-ben lévő MCP szerver URL-jét. Példa: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE végponthoz) vagy **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP végponthoz), vedd észre a különbséget a szállítási utak között: `/sse` vagy `/mcp`.

1. Add meg a választott szerver azonosítót. Ez nem egy fontos érték, de segít emlékezni, hogy ez az adott szerver példány melyik.

1. Válaszd ki, hogy a konfigurációt a munkaterület beállításaiban vagy a felhasználói beállításokban mented-e.

  - **Workspace settings** - A szerver konfiguráció egy .vscode/mcp.json fájlba kerül, amely csak az adott munkaterületen elérhető.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    vagy ha streaming HTTP-t választasz szállítási formának, akkor kissé más lesz:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - A szerver konfiguráció globálisan a *settings.json* fájlodba kerül, és minden munkaterületen elérhető. A konfiguráció hasonló ehhez:

    ![Felhasználói beállítás](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Emellett hozzá kell adnod egy konfigurációt, egy fejlécet, hogy megfelelően hitelesítsen az Azure API Management felé. Egy **Ocp-Apim-Subscription-Key** nevű fejlécet használ.

    - Így adhatod hozzá a beállításokhoz:

    ![Hitelesítéshez fejléchez hozzáadás](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), ez egy promptot fog megjeleníteni, amely kéri az API kulcs értékét, amit az Azure Portálban találhatsz az API Management példányodhoz.

   - Ha inkább az *mcp.json*-hoz adod hozzá, így nézhet ki:

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

### Használat agent módban

Most, hogy minden beállítva van akár a beállításokban, akár a *.vscode/mcp.json*-ban, próbáljuk ki.

Egy ilyen Eszközök ikont kell látnod, ahol a szerveredből közzétett eszközök listázva vannak:

![Szerver eszközei](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Kattints az eszköz ikonra, és egy eszközlista fog megjelenni:

    ![Eszközök](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Írj be egy promptot a chatbe az eszköz meghívásához. Például ha kiválasztottál egy eszközt, amivel rendelési információt kérhetsz, megkérdezheted az agenset egy rendelésről. Példa prompt:

    ```text
    get information from order 2
    ```

    Meg fog jelenni egy eszköz ikon, amely megkérdez, hogy folytatod-e az eszköz meghívását. Válaszd a folytatást, és ilyesmi választ fogsz látni:

    ![Válasz a promptból](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **a fent látott eredmény attól függ, milyen eszközöket állítottál be, de az ötlet az, hogy hasonló szöveges választ kapj**


## Hivatkozások

Ezekből tanulhatsz tovább:

- [Útmutató az Azure API Management és MCP használatához](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python példa: Biztonságos távoli MCP szerverek Azure API Management használatával (kísérleti)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP kliens autorizációs labor](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Az Azure API Management bővítmény használata VS Code-ban API-k importálására és kezelésére](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Távoli MCP szerverek regisztrálása és felfedezése az Azure API Centerben](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Nagyszerű tároló, amely sok AI képességet mutat be az Azure API Management segítségével
- [AI Gateway workshopok](https://azure-samples.github.io/AI-Gateway/) Tartalmaz workshopokat Azure Portál használatával, ami nagyszerű mód az AI képességek értékelésének megkezdéséhez.

## Mi következik

- Vissza ide: [Esettanulmányok áttekintése](./README.md)
- Következő: [Azure AI Utazási Ügynökök](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősségkizárás**:
Ez a dokumentum az AI fordító szolgáltatás [Co-op Translator](https://github.com/Azure/co-op-translator) használatával készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum anyanyelvű változata tekintendő hiteles forrásnak. Fontos információk esetén szakmai emberi fordítást javaslunk. Nem vállalunk felelősséget az ebből eredő esetleges félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->