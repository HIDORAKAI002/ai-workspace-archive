# Case Study: Eksponer REST API i API Management som en MCP-server

Azure API Management er en tjeneste, der leverer en Gateway oven på dine API Endpoints. Den fungerer ved, at Azure API Management fungerer som en proxy foran dine API'er og kan bestemme, hvad der skal ske med indkommende forespørgsler.

Ved at bruge den tilføjer du en hel række funktioner som:

- **Sikkerhed**, du kan bruge alt fra API-nøgler, JWT til administreret identitet.
- **Ratebegrænsning**, en god funktion er at kunne bestemme, hvor mange kald der kommer igennem pr. en bestemt tidsenhed. Dette hjælper med at sikre, at alle brugere får en god oplevelse, og også at din service ikke bliver overbelastet med forespørgsler.
- **Skalering og Load Balancing**. Du kan opsætte et antal endpoints for at fordele belastningen, og du kan også beslutte, hvordan du vil "load balance".
- **AI-funktioner som semantisk caching**, tokenbegrænsning og tokenovervågning og mere. Disse er gode funktioner, der forbedrer svartiden samt hjælper dig med at holde styr på dit tokenforbrug. [Læs mere her](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Hvorfor MCP + Azure API Management?

Model Context Protocol bliver hurtigt en standard for agentbaserede AI-apps og hvordan man eksponerer værktøjer og data på en konsekvent måde. Azure API Management er et naturligt valg, når du har brug for at "administrere" API'er. MCP-servere integrerer ofte med andre API'er for eksempel for at løse forespørgsler til et værktøj. Derfor giver det meget mening at kombinere Azure API Management og MCP.

## Oversigt

I dette specifikke brugstilfælde lærer vi at eksponere API-endpoints som en MCP-server. Ved at gøre dette kan vi nemt gøre disse endpoints til en del af en agentbaseret app og samtidig udnytte funktionerne fra Azure API Management.

## Nøglefunktioner

- Du vælger hvilke endpoint-metoder, du vil eksponere som værktøjer.
- De ekstra funktioner, du får, afhænger af, hvad du konfigurerer i politiksektionen for dit API. Her vil vi dog vise, hvordan du kan tilføje ratebegrænsning.

## Forberedelse: importer en API

Hvis du allerede har en API i Azure API Management, er det godt, så kan du springe dette trin over. Hvis ikke, tjek dette link, [importering af en API til Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Eksponer API som MCP-server

For at eksponere API-endpoints, følg disse trin:

1. Gå til Azure Portal og denne adresse <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Naviger til din API Management instans.

1. I venstremenuen vælger du APIs > MCP Servers > + Create new MCP Server.

1. Under API vælger du en REST API til at eksponere som en MCP-server.

1. Vælg en eller flere API-Operationer, der skal eksponeres som værktøjer. Du kan vælge alle operationer eller kun specifikke operationer.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Vælg **Create**.

1. Gå til menuindstillingen **APIs** og **MCP Servers**, her skulle du se følgende:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP-serveren er oprettet, og API-operationerne er eksponeret som værktøjer. MCP-serveren vises i MCP Servers-panelet. URL-kolonnen viser endpoint af MCP-serveren, som du kan kalde til test eller inden for en klientapplikation.

## Valgfrit: Konfigurer politikker

Azure API Management har det centrale koncept politikker, hvor du kan opsætte forskellige regler for dine endpoints, som for eksempel ratebegrænsning eller semantisk caching. Disse politikker skrives i XML.

Sådan kan du opsætte en politik til ratebegrænsning på din MCP-server:

1. I portalen, under APIs, vælg **MCP Servers**.

1. Vælg den MCP-server, du oprettede.

1. I venstremenuen, under MCP, vælg **Policies**.

1. I politik-editoren tilføjer eller redigerer du de politikker, du vil anvende på MCP-serverens værktøjer. Politikkerne defineres i XML-format. For eksempel kan du tilføje en politik for at begrænse kald til MCP-serverens værktøjer (i dette eksempel 5 kald pr. 30 sekunder pr. client IP-adresse). Her er XML, der forårsager ratebegrænsning:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Her er et billede af politik-editoren:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Prøv det af

Lad os sikre os, at vores MCP-server fungerer som forventet.

Til dette vil vi bruge Visual Studio Code og GitHub Copilot i Agent-tilstand. Vi vil tilføje MCP-serveren til en *mcp.json* fil. På den måde vil Visual Studio Code agere som en klient med agentfunktioner, og slutbrugere vil kunne skrive en prompt og interagere med den nævnte server.

Sådan tilføjer du MCP-serveren i Visual Studio Code:

1. Brug kommandoen MCP: **Add Server** fra Command Palette.

1. Når du bliver spurgt, vælg servertypen: **HTTP (HTTP eller Server Sent Events)**.

1. Indtast URL'en på MCP-serveren i API Management. Eksempel: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (for SSE endpoint) eller **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (for MCP endpoint), bemærk forskellen mellem transporterne er `/sse` eller `/mcp`.

1. Indtast et server-ID efter eget valg. Det er ikke en vigtig værdi, men det vil hjælpe dig med at huske, hvad denne serverinstans er.

1. Vælg, om du vil gemme konfigurationen i workspace-indstillinger eller brugerindstillinger.

  - **Workspace-indstillinger** - Serverkonfigurationen gemmes i en .vscode/mcp.json-fil, som kun er tilgængelig i det aktuelle workspace.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    eller hvis du vælger streaming HTTP som transport, ville det være lidt anderledes:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Brugerindstillinger** - Serverkonfigurationen tilføjes til din globale *settings.json*-fil og er tilgængelig i alle workspaces. Konfigurationen ser sådan ud:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Du skal også tilføje en konfiguration, et header, for at sikre korrekt autentificering mod Azure API Management. Den bruger et header kaldet **Ocp-Apim-Subscription-Key**.

    - Sådan kan du tilføje det til indstillingerne:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), dette vil medføre, at der vises en prompt, der beder om API-nøglens værdi, som du kan finde i Azure Portal for din Azure API Management instans.

   - For at tilføje det til *mcp.json* i stedet kan du tilføje det således:

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

### Brug Agent-tilstand

Nu er vi klar enten i indstillinger eller i *.vscode/mcp.json*. Lad os prøve det.

Der burde være et Værktøjer-ikon som dette, hvor de eksponerede værktøjer fra din server er listet:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klik på værktøjsikonet, og du skulle se en liste over værktøjer som nedenstående:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Indtast en prompt i chatten for at aktivere værktøjet. For eksempel, hvis du valgte et værktøj til at hente information om en ordre, kan du spørge agenten om en ordre. Her er et eksempel på en prompt:

    ```text
    get information from order 2
    ```

    Du vil nu blive præsenteret for et værktøjsikon, der spørger, om du vil fortsætte med at kalde et værktøj. Vælg at fortsætte med at køre værktøjet, og du skulle nu se et output som nedenstående:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **Det, du ser ovenfor, afhænger af, hvilke værktøjer du har opsat, men idéen er, at du får et tekstuelt svar som ovenfor**


## Referencer

Sådan kan du lære mere:

- [Tutorial om Azure API Management og MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python-eksempel: Sikker fjernforbindelse til MCP-servere ved brug af Azure API Management (eksperimentelt)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP klientautorisation lab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Brug Azure API Management-udvidelsen til VS Code til import og administration af API'er](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registrer og find fjern-MCP-servere i Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Fantastisk repo, der viser mange AI-muligheder med Azure API Management
- [AI Gateway workshops](https://azure-samples.github.io/AI-Gateway/) Indeholder workshops ved brug af Azure Portal, som er en god måde at starte med at evaluere AI-funktioner.

## Hvad er det næste

- Tilbage til: [Case Studies Oversigt](./README.md)
- Næste: [Azure AI Rejseagenter](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:  
Dette dokument er oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets modersmål bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->