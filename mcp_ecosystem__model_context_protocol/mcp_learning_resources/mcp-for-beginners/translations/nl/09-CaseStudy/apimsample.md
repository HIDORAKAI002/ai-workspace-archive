# Case Study: REST API blootstellen in API Management als een MCP-server

Azure API Management is een service die een Gateway biedt bovenop je API-eindpunten. Azure API Management fungeert als een proxy voor je API's en kan bepalen wat er met inkomende verzoeken gebeurt.

Door het te gebruiken voeg je een heleboel functies toe zoals:

- **Beveiliging**, je kunt alles gebruiken van API-sleutels, JWT tot managed identity.
- **Rate limiting**, een geweldige functie is dat je kunt bepalen hoeveel oproepen er per tijdseenheid doorkomen. Dit helpt ervoor te zorgen dat alle gebruikers een goede ervaring hebben en dat je service niet wordt overspoeld met verzoeken.
- **Schaalbaarheid & Load balancing**. Je kunt een aantal eindpunten opzetten om de belasting te verdelen en je kunt ook bepalen hoe je wilt "load balancen".
- **AI-functies zoals semantische caching**, tokenlimieten en tokenmonitoring en meer. Dit zijn geweldige functies die de reactietijd verbeteren en helpen je bovenop je tokenuitgaven te blijven. [Lees hier meer](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Waarom MCP + Azure API Management?

Model Context Protocol wordt snel een standaard voor agentachtige AI-apps en hoe tools en data op een consistente manier te ontsluiten. Azure API Management is een natuurlijke keuze wanneer je API's moet "beheren". MCP-servers integreren vaak met andere API's om verzoeken naar een tool te resolven bijvoorbeeld. Daarom is de combinatie van Azure API Management en MCP heel logisch.

## Overzicht

In deze specifieke use case leren we API-eindpunten blootstellen als een MCP-server. Door dit te doen kunnen we deze eindpunten gemakkelijk onderdeel maken van een agentachtige app en tegelijkertijd profiteren van de functies van Azure API Management.

## Belangrijkste functies

- Je selecteert de eindpuntmethodes die je wil blootstellen als tools.
- De extra functies die je krijgt hangen af van wat je configureert in het beleidsgedeelte van je API. Hier laten we zien hoe je rate limiting kunt toevoegen.

## Vooraf: importeer een API

Als je al een API hebt in Azure API Management, top, dan kun je deze stap overslaan. Zo niet, bekijk dan deze link, [een API importeren in Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## API blootstellen als MCP-server

Volg onderstaande stappen om de API-eindpunten bloot te stellen:

1. Navigeer naar de Azure Portal via <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Ga naar je API Management instantie.

1. Selecteer in het linkermenu APIs > MCP Servers > + Create new MCP Server.

1. Kies bij API een REST API om bloot te stellen als MCP-server.

1. Selecteer een of meerdere API-operaties om bloot te stellen als tools. Je kunt alle operaties selecteren of alleen specifieke operaties.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Selecteer **Create**.

1. Ga naar het menu **APIs** en **MCP Servers**, je zou het volgende moeten zien:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    De MCP-server is aangemaakt en de API-operaties zijn blootgesteld als tools. De MCP-server staat in het MCP Servers-paneel. De kolom URL toont het eindpunt van de MCP-server dat je kunt aanroepen voor testen of binnen een clientapplicatie.

## Optioneel: Beleidsregels configureren

Azure API Management heeft het kernconcept van policy's waarin je regels instelt voor je eindpunten zoals rate limiting of semantische caching. Deze policies worden geschreven in XML.

Hier zie je hoe je een policy instelt om rate limiting te configureren voor je MCP-server:

1. Selecteer in de portal onder APIs **MCP Servers**.

1. Selecteer de MCP-server die je hebt gemaakt.

1. Selecteer in het linkermenu onder MCP **Policies**.

1. Voeg in de beleidseditor de gewenste policies toe of bewerk ze voor de tools van de MCP-server. De policies zijn in XML. Bijvoorbeeld, je kunt een policy toevoegen die oproepen naar de MCP-server beperkt (in dit voorbeeld 5 oproepen per 30 seconden per client-IP-adres). Hier is de XML die de rate limiting activeert:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Hier is een afbeelding van de beleidseditor:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Probeer het uit

Laten we zeker weten dat onze MCP-server werkt zoals bedoeld.

Hiervoor gebruiken we Visual Studio Code en GitHub Copilot met de Agent-modus. We voegen de MCP-server toe aan een *mcp.json* bestand. Zo fungeert Visual Studio Code als client met agentcapaciteiten en kunnen eindgebruikers een prompt typen en met de server interactie hebben.

Zo voeg je de MCP-server toe in Visual Studio Code:

1. Gebruik de MCP: **Add Server command from the Command Palette**.

1. Selecteer het server type: **HTTP (HTTP of Server Sent Events)**.

1. Voer de URL van de MCP-server in Azure API Management in. Bijvoorbeeld: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (voor SSE-eindpunt) of **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (voor MCP-eindpunt). Merk het verschil op in het pad: `/sse` of `/mcp`.

1. Geef een server-ID op naar keuze. Dit is niet heel belangrijk maar helpt je herinneren welke server dit is.

1. Kies of je de configuratie opslaat in je workspace settings of user settings.

  - **Workspace settings** - De serverconfiguratie wordt opgeslagen in een .vscode/mcp.json bestand dat alleen beschikbaar is in de huidige workspace.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    of als je streaming HTTP als transport kiest, ziet het er iets anders uit:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - De serverconfiguratie wordt toegevoegd aan je globale *settings.json* bestand en is beschikbaar in alle workspaces. De configuratie ziet er ongeveer zo uit:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Je moet ook een configuratie toevoegen, een header om ervoor te zorgen dat de authenticatie correct werkt met Azure API Management. Het gebruikt een header genaamd **Ocp-Apim-Subscription-Key**.

    - Zo voeg je deze toe aan de settings:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), hierdoor krijg je een prompt om je de API key in te voeren, die je in de Azure Portal kunt vinden bij je Azure API Management instantie.

   - Voeg het anders toe aan *mcp.json* zoals volgt:

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

### Gebruik de Agent-modus

Nu alles is ingesteld in de settings of in *.vscode/mcp.json*, laten we het testen.

Er zou een Tools-icoon moeten zijn zoals hieronder, waar de blootgestelde tools van je server worden getoond:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klik op het tools-icoon en je ziet een lijst met tools zoals hieronder:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Typ een prompt in de chat om de tool aan te roepen. Bijvoorbeeld, als je een tool hebt geselecteerd om informatie te krijgen over een bestelling, kun je de agent daarover vragen. Bijvoorbeeld deze prompt:

    ```text
    get information from order 2
    ```

    Nu krijg je een tools-icoon waarmee je wordt gevraagd door te gaan met het aanroepen van de tool. Selecteer om door te gaan en je ziet een output zoals hieronder:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **Wat je hierboven ziet, hangt af van welke tools je hebt ingesteld, maar het idee is dat je een tekstuele reactie krijgt zoals hierboven**


## Referenties

Zo kun je meer leren:

- [Tutorial over Azure API Management en MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Pythonvoorbeeld: Beveilig remote MCP-servers met Azure API Management (experimenteel)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP-client autorisatie lab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Gebruik de Azure API Management extensie voor VS Code om API's te importeren en beheren](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registreer en ontdek remote MCP-servers in Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Geweldige repo die veel AI-mogelijkheden toont met Azure API Management
- [AI Gateway workshops](https://azure-samples.github.io/AI-Gateway/) Bevat workshops met Azure Portal, een geweldige manier om AI-mogelijkheden te verkennen.

## Wat nu

- Terug naar: [Case Studies Overzicht](./README.md)
- Volgende: [Azure AI Reisagenten](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kennisgeving**:
Dit document is vertaald met behulp van de AI-vertalingsservice [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel wij streven naar nauwkeurigheid, kan het voorkomen dat automatische vertalingen fouten of onnauwkeurigheden bevatten. Het oorspronkelijke document in de originele taal moet als de gezaghebbende bron worden beschouwd. Voor belangrijke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerd geïnterpreteerde informatie voortvloeiend uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->