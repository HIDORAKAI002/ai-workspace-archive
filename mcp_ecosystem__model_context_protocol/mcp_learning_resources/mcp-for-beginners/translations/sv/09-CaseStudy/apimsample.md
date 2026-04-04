# Fallstudie: Exponera REST API i API Management som en MCP-server

Azure API Management är en tjänst som tillhandahåller en gateway ovanpå dina API-endpunkter. Hur det fungerar är att Azure API Management agerar som en proxy framför dina API:er och kan avgöra vad som ska göras med inkommande förfrågningar.

Genom att använda den får du en mängd funktioner som:

- **Säkerhet**, du kan använda allt från API-nycklar, JWT till managed identity.
- **Begränsning av anrop**, en utmärkt funktion är att kunna bestämma hur många anrop som släpps igenom per viss tidsenhet. Detta hjälper till att säkerställa en bra upplevelse för alla användare och också att din tjänst inte överbelastas med förfrågningar.
- **Skalning & lastbalansering**. Du kan konfigurera flera slutpunkter för att balansera belastningen och du kan också bestämma hur "lastbalansering" ska ske.
- **AI-funktioner som semantisk caching**, tokenbegränsning och tokenövervakning med mera. Dessa är utmärkta funktioner som förbättrar svarstiden samt hjälper dig att ha kontroll över din tokenanvändning. [Läs mer här](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Varför MCP + Azure API Management?

Model Context Protocol håller snabbt på att bli en standard för agent-baserade AI-appar och hur man exponerar verktyg och data på ett konsekvent sätt. Azure API Management är ett naturligt val när du behöver "hantera" API:er. MCP-servrar integreras ofta med andra API:er för att lösa förfrågningar till exempelvis ett verktyg. Därför är det logiskt att kombinera Azure API Management med MCP.

## Översikt

I detta specifika användningsfall ska vi lära oss hur man exponerar API-endpunkter som en MCP-server. Genom att göra detta kan vi enkelt göra dessa endpunkter till en del av en agent-baserad app samtidigt som vi utnyttjar funktionerna från Azure API Management.

## Viktiga funktioner

- Du väljer vilka slutpunktsmetoder du vill exponera som verktyg.
- De ytterligare funktionerna du får beror på vad du konfigurerar i policysektionen för ditt API. Här visar vi hur du kan lägga till begränsning av anrop.

## Förberedande steg: importera ett API

Om du redan har ett API i Azure API Management kan du hoppa över detta steg. Om inte, kika på denna länk, [importera ett API till Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Exponera API som MCP-server

För att exponera API-endpunkterna, följ dessa steg:

1. Navigera till Azure Portal och följande adress <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
Navigera till din API Management-instans.

1. I vänstermenyn, välj APIs > MCP Servers > + Skapa ny MCP-server.

1. I API, välj ett REST API att exponera som en MCP-server.

1. Välj en eller flera API-operationer att exponera som verktyg. Du kan välja alla operationer eller bara specifika operationer.

    ![Välj metoder att exponera](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Välj **Create**.

1. Navigera till menyalternativen **APIs** och **MCP Servers**, du bör se följande:

    ![Se MCP-servern i huvudpanelen](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP-servern är skapad och API-operationerna exponeras som verktyg. MCP-servern listas i panelen MCP Servers. Kolumnen URL visar endpunkten för MCP-servern som du kan anropa för testning eller inom en klientapplikation.

## Valfritt: Konfigurera policies

Azure API Management har det grundläggande konceptet policies där du sätter upp olika regler för dina slutpunkter, som till exempel begränsning av anrop eller semantisk caching. Dessa policies skrives i XML.

Så här kan du konfigurera en policy för att begränsa anrop till din MCP-server:

1. I portalen, under APIs, välj **MCP Servers**.

1. Välj MCP-servern du skapade.

1. I vänstermenyn under MCP, välj **Policies**.

1. I policyeditorn, lägg till eller redigera de policies som du vill applicera på MCP-serverns verktyg. Policies definieras i XML-format. Till exempel kan du lägga till en policy för att begränsa anrop till MCP-serverns verktyg (i detta exempel, 5 anrop per 30 sekunder per klient-IP-adress). Här är XML som orsakar begränsningen:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Här är en bild av policyeditorn:

    ![Policyeditor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)

## Prova det 

Låt oss försäkra oss om att vår MCP-server fungerar som den ska.

För detta använder vi Visual Studio Code och GitHub Copilot med dess agentläge. Vi kommer att lägga till MCP-servern i en *mcp.json*. Genom att göra detta kommer Visual Studio Code att fungera som en klient med agentfunktioner och slutanvändare kan skriva en prompt och interagera med nämnda server.

Så här lägger du till MCP-servern i Visual Studio Code:

1. Använd kommandot MCP: **Add Server från Command Palette**.

1. När du blir ombedd, välj servertyp: **HTTP (HTTP eller Server Sent Events)**.

1. Ange URL för MCP-servern i API Management. Exempel: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (för SSE-endpunkt) eller **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (för MCP-endpoint), notera skillnaden i transport `/sse` eller `/mcp`.

1. Ange ett server-ID som du väljer. Det är inte ett viktigt värde men hjälper dig att minnas vilken serverinstans detta är.

1. Välj om du vill spara konfigurationen i arbetsytans inställningar eller användarinställningar.

  - **Workspace settings** - Serverkonfigurationen sparas i en .vscode/mcp.json-fil som endast finns i den aktuella arbetsytan.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    Eller om du väljer streaming HTTP som transport är det lite annorlunda:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - Serverkonfigurationen läggs till i din globala *settings.json*-fil och är tillgänglig i alla arbetsytor. Konfigurationen ser ut ungefär så här:

    ![Användarinställning](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Du behöver även lägga till konfiguration, en header för att säkerställa korrekt autentisering mot Azure API Management. Det använder en header som heter **Ocp-Apim-Subscription-Key**.

    - Så här kan du lägga till den i inställningarna:

    ![Lägga till header för autentisering](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), detta kommer att visa en prompt för att be dig ange API-nyckelns värde som du kan hitta i Azure-portalen för din Azure API Management-instans.

   - För att lägga till den i *mcp.json* istället, kan du lägga till den så här:

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

### Använd Agent-läge

Nu är vi helt uppsatta antingen i inställningarna eller i *.vscode/mcp.json*. Låt oss prova.

Det bör finnas en Verktyg-ikon som nedan, där de exponerade verktygen från din server listas:

![Verktyg från servern](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klicka på verktyg-ikonen och du bör se en lista med verktyg som nedan:

    ![Verktyg](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Skriv en prompt i chatten för att anropa verktyget. Till exempel, om du valt ett verktyg för att få information om en order kan du fråga agenten om en order. Här är ett exempel på prompt:

    ```text
    get information from order 2
    ```

    Du kommer nu att presenteras med en verktygsikon som frågar om du vill fortsätta anropa ett verktyg. Välj för att fortsätta köra verktyget, du borde nu se ett utdata som nedan:

    ![Resultat från prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **Vad du ser ovan beror på vilka verktyg du har konfigurerat, men idén är att du får ett textbaserat svar som ovan**


## Referenser

Så här kan du lära dig mer:

- [Tutorial om Azure API Management och MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python-exempel: Säker fjärrstyrd MCP-server med Azure API Management (experimentell)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP-klientauktoriserings-labb](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Använd Azure API Management-tillägget för VS Code för att importera och hantera API:er](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registrera och upptäck fjärr MCP-servrar i Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Fantastiskt repo som visar många AI-funktioner med Azure API Management
- [AI Gateway workshops](https://azure-samples.github.io/AI-Gateway/) Innehåller workshops som använder Azure Portal, vilket är ett utmärkt sätt att börja utvärdera AI-funktioner.

## Vad händer härnäst

- Tillbaka till: [Översikt Fallstudier](./README.md)
- Nästa: [Azure AI Resebyråer](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, vänligen beakta att automatiska översättningar kan innehålla fel eller brister. Originaldokumentet på dess ursprungliga språk ska anses vara den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för eventuella missförstånd eller feltolkningar som uppstår till följd av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->