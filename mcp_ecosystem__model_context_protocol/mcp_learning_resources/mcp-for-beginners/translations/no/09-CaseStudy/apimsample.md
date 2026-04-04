# Case Study: Eksponer REST API i API Management som en MCP-server

Azure API Management er en tjeneste som gir en Gateway på toppen av API-endepunktene dine. Måten det fungerer på er at Azure API Management fungerer som en proxy foran API-ene dine og kan avgjøre hva som skal gjøres med innkommende forespørsler.

Ved å bruke det legger du til en rekke funksjoner som:

- **Sikkerhet**, du kan bruke alt fra API-nøkler, JWT til administrert identitet.
- **Ratebegrensning**, en flott funksjon er å kunne bestemme hvor mange kall som kommer gjennom per en bestemt tidsenhet. Dette hjelper med å sikre at alle brukere får en god opplevelse og at tjenesten din ikke blir overbelastet med forespørsler.
- **Skalering og lastbalansering**. Du kan sette opp flere endepunkter for å balansere belastningen, og du kan også bestemme hvordan du vil «lastbalansere».
- **AI-funksjoner som semantisk caching**, token-grense og token-overvåking og mer. Disse er flotte funksjoner som forbedrer responsiviteten og hjelper deg med å holde oversikt over token-forbruket ditt. [Les mer her](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Hvorfor MCP + Azure API Management?

Model Context Protocol blir raskt en standard for agentiske AI-apper og for hvordan man eksponerer verktøy og data på en konsistent måte. Azure API Management er et naturlig valg når du trenger å «administrere» API-er. MCP-servere integreres ofte med andre API-er for å løse forespørsler til et verktøy for eksempel. Derfor gir det mye mening å kombinere Azure API Management og MCP.

## Oversikt

I dette spesifikke brukstilfellet skal vi lære å eksponere API-endepunkter som en MCP-server. Ved å gjøre dette kan vi enkelt gjøre disse endepunktene til en del av en agentisk app samtidig som vi utnytter funksjonene i Azure API Management.

## Nøkkelfunksjoner

- Du velger hvilke endepunktmetoder du vil eksponere som verktøy.
- Ytterligere funksjoner du får, avhenger av hva du konfigurerer i policy-delen for API-en din. Her vil vi vise hvordan du kan legge til ratebegrensning.

## Forhåndstrinn: importer en API

Hvis du allerede har en API i Azure API Management, flott, da kan du hoppe over dette steget. Hvis ikke, sjekk ut denne lenken, [importering av en API til Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Eksponer API som MCP-server

For å eksponere API-endepunktene, følg disse trinnene:

1. Naviger til Azure Portal og følgende adresse <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
Naviger til API Management-forekomsten din.

1. I venstremenyen, velg APIs > MCP Servers > + Create new MCP Server.

1. Under API, velg en REST API som skal eksponeres som en MCP-server.

1. Velg en eller flere API-operasjoner som skal eksponeres som verktøy. Du kan velge alle operasjoner eller bare spesifikke operasjoner.

    ![Velg metoder å eksponere](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Velg **Create**.

1. Naviger til menyvalget **APIs** og **MCP Servers**, du skal se følgende:

    ![Se MCP-serveren i hovedpanelet](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP-serveren er opprettet, og API-operasjonene er eksponert som verktøy. MCP-serveren vises i MCP Servers-panelet. URL-kolonnen viser endepunktet for MCP-serveren som du kan kalle for testing eller i et klientprogram.

## Valgfritt: Konfigurer policyer

Azure API Management har kjernkonseptet med policyer hvor du setter opp forskjellige regler for endepunktene dine som for eksempel ratebegrensning eller semantisk caching. Disse policyene skrives i XML.

Slik kan du sette opp en policy for ratebegrensning av MCP-serveren din:

1. I portalen, under APIs, velg **MCP Servers**.

1. Velg MCP-serveren du opprettet.

1. I venstremenyen, under MCP, velg **Policies**.

1. I policy-editoren, legg til eller rediger policyene du vil bruke på MCP-serverens verktøy. Policyene defineres i XML-format. For eksempel kan du legge til en policy for å begrense kall til MCP-serverens verktøy (i dette eksempelet 5 kall per 30 sekunder per klient-IP-adresse). Her er XML som vil forårsake ratebegrensning:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Her er et bilde av policyeditoren:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)

## Prøv det ut

La oss forsikre oss om at MCP-serveren vår fungerer som forventet.

For dette vil vi bruke Visual Studio Code og GitHub Copilot med Agent-modus. Vi vil legge til MCP-serveren i en *mcp.json*-fil. Ved å gjøre dette vil Visual Studio Code fungere som en klient med agentiske evner, og sluttbrukere vil kunne skrive en prompt og interagere med den aktuelle serveren.

Slik legger du til MCP-serveren i Visual Studio Code:

1. Bruk MCP: **Add Server command fra Command Palette**.

1. Når du blir bedt om det, velg servertype: **HTTP (HTTP eller Server Sent Events)**.

1. Skriv inn URL-en til MCP-serveren i API Management. Eksempel: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (for SSE-endepunkt) eller **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (for MCP-endepunkt), merk forskjellen mellom transportene er `/sse` eller `/mcp`.

1. Skriv inn en server-ID etter eget valg. Dette er ikke en viktig verdi, men det hjelper deg å huske hva denne serverinstansen er.

1. Velg om du vil lagre konfigurasjonen i arbeidsområdets innstillinger eller brukerinformasjonen.

  - **Workspace settings** - Serverkonfigurasjonen lagres i en .vscode/mcp.json-fil som kun er tilgjengelig i gjeldende arbeidsområde.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    eller om du velger streaming HTTP som transport, vil det være litt annerledes:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - Serverkonfigurasjonen legges til i din globale *settings.json*-fil og er tilgjengelig i alle arbeidsområder. Konfigurasjonen ser omtrent slik ut:

    ![Brukerinnstilling](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Du må også legge til konfigurasjon, en header for å sikre at autentiseringen mot Azure API Management fungerer som den skal. Den bruker en header kalt **Ocp-Apim-Subscription-Key**.

    - Slik kan du legge den til i innstillingene:

    ![Legge til header for autentisering](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), dette vil få opp en prompt som ber om API-nøkkelverdien, som du finner i Azure-portalen for din Azure API Management-forekomst.

   - For å legge den til i *mcp.json* i stedet, kan du legge den til slik:

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

### Bruk Agent-modus

Nå er vi klare enten i innstillingene eller i *.vscode/mcp.json*. La oss prøve det ut.

Det skal være et verktøyikon som dette, hvor de eksponerte verktøyene fra serveren din listes opp:

![Verktøy fra serveren](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klikk på verktøy-ikonet, og du skal se en liste over verktøy som dette:

    ![Verktøy](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Skriv inn en prompt i chatten for å aktivere verktøyet. For eksempel, hvis du valgte et verktøy for å hente informasjon om en ordre, kan du spørre agenten om en ordre. Her er et eksempelprompt:

    ```text
    get information from order 2
    ```

    Du får nå opp et verktøyikon som spør om du vil fortsette med å kalle et verktøy. Velg å fortsette med å kjøre verktøyet, du skal nå se et resultat som dette:

    ![Resultat fra prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **Det du ser ovenfor avhenger av hvilke verktøy du har satt opp, men tanken er at du får et tekstbasert svar som vist over**

## Referanser

Slik kan du lære mer:

- [Veiledning om Azure API Management og MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python-eksempel: Sikre fjernstyrte MCP-servere ved bruk av Azure API Management (eksperimentelt)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP-klient autorisasjonslab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Bruk Azure API Management-utvidelsen for VS Code for å importere og administrere API-er](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registrer og oppdag fjernstyrte MCP-servere i Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Flott repo som viser mange AI-funksjoner med Azure API Management
- [AI Gateway workshops](https://azure-samples.github.io/AI-Gateway/) Inneholder workshops ved bruk av Azure Portal, som er en flott måte å starte evaluering av AI-funksjoner på.

## Hva nå

- Tilbake til: [Case Studies Overview](./README.md)
- Neste: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal anses som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->