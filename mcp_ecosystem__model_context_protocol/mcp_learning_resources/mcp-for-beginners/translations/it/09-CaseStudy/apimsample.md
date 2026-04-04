# Case Study: Esporre REST API in API Management come server MCP

Azure API Management è un servizio che fornisce un Gateway sopra i tuoi endpoint API. Il suo funzionamento consiste nel fatto che Azure API Management agisce come un proxy davanti alle tue API e può decidere cosa fare con le richieste in arrivo.

Utilizzandolo, aggiungi un'intera serie di funzionalità come:

- **Sicurezza**, puoi usare di tutto, dalle chiavi API, JWT all'identità gestita.
- **Limitazione della frequenza**, una funzione fantastica è poter decidere quante chiamate passano in una certa unità temporale. Questo aiuta a garantire a tutti gli utenti una grande esperienza e anche che il tuo servizio non venga sovraccaricato di richieste.
- **Scalabilità e bilanciamento del carico**. Puoi impostare un numero di endpoint per bilanciare il carico e puoi anche decidere come fare il "bilanciamento del carico".
- **Funzionalità AI come caching semantico**, limite di token e monitoraggio dei token e altro. Queste sono ottime funzionalità che migliorano la reattività oltre ad aiutarti a tenere sotto controllo la spesa per i token. [Leggi di più qui](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Perché MCP + Azure API Management?

Il Model Context Protocol sta rapidamente diventando uno standard per le app AI agentiche e per come esporre strumenti e dati in modo coerente. Azure API Management è una scelta naturale quando hai bisogno di "gestire" API. I server MCP spesso si integrano con altre API per risolvere richieste verso uno strumento per esempio. Pertanto combinare Azure API Management e MCP ha molto senso.

## Panoramica

In questo caso d'uso specifico impareremo a esporre endpoint API come un server MCP. Facendo così, possiamo facilmente rendere questi endpoint parte di un'app agentica sfruttando anche le funzionalità di Azure API Management.

## Funzionalità Chiave

- Selezioni i metodi degli endpoint che vuoi esporre come strumenti.
- Le funzionalità aggiuntive che ottieni dipendono da cosa configuri nella sezione policy per la tua API. Qui ti mostreremo come puoi aggiungere la limitazione della frequenza.

## Passo preliminare: importare un'API

Se hai già un'API in Azure API Management ottimo, puoi saltare questo passo. Altrimenti, dai un'occhiata a questo link, [importare un'API in Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Esporre API come server MCP

Per esporre gli endpoint API, seguiamo questi passaggi:

1. Naviga al Portale Azure all'indirizzo <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
Naviga all'istanza di API Management.

1. Nel menu a sinistra, seleziona APIs > MCP Servers > + Crea nuovo MCP Server.

1. In API, seleziona una REST API da esporre come server MCP.

1. Seleziona una o più operazioni API da esporre come strumenti. Puoi selezionare tutte le operazioni o solo operazioni specifiche.

    ![Seleziona metodi da esporre](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Seleziona **Crea**.

1. Naviga al menu opzione **APIs** e **MCP Servers**, dovresti vedere quanto segue:

    ![Vedi il server MCP nel pannello principale](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Il server MCP è creato e le operazioni API sono esposte come strumenti. Il server MCP è elencato nel pannello MCP Servers. La colonna URL mostra l'endpoint del server MCP che puoi chiamare per i test o all'interno di un'applicazione client.

## Opzionale: Configurare le policy

Azure API Management ha il concetto cardine di policy dove imposti diverse regole per i tuoi endpoint come per esempio limitazione della frequenza o caching semantico. Queste policy sono scritte in XML.

Ecco come puoi impostare una policy per limitare la frequenza del tuo server MCP:

1. Nel portale, sotto APIs, seleziona **MCP Servers**.

1. Seleziona il server MCP che hai creato.

1. Nel menu a sinistra, sotto MCP, seleziona **Policies**.

1. Nell'editor della policy, aggiungi o modifica le policy che vuoi applicare agli strumenti del server MCP. Le policy sono definite in formato XML. Per esempio, puoi aggiungere una policy per limitare le chiamate agli strumenti del server MCP (in questo esempio, 5 chiamate ogni 30 secondi per indirizzo IP client). Ecco l'XML che causa questa limitazione di frequenza:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Ecco un'immagine dell'editor della policy:

    ![Editor policy](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Provalo

Assicuriamoci che il nostro server MCP funzioni come previsto.

Per questo, useremo Visual Studio Code e GitHub Copilot e la sua modalità Agent. Aggiungeremo il server MCP in un *mcp.json*. Facendo questo, Visual Studio Code agirà come client con capacità agentiche e gli utenti finali potranno digitare un prompt e interagire con detto server.

Vediamo come aggiungere il server MCP in Visual Studio Code:

1. Usa il comando MCP: **Add Server dal Command Palette**.

1. Quando richiesto, seleziona il tipo di server: **HTTP (HTTP o Server Sent Events)**.

1. Inserisci l'URL del server MCP in API Management. Esempio: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (per l'endpoint SSE) o **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (per l'endpoint MCP), nota come la differenza tra i trasporti sia `/sse` o `/mcp`.

1. Inserisci un ID server a tua scelta. Non è un valore importante ma ti aiuterà a ricordare cos'è questa istanza server.

1. Seleziona se salvare la configurazione nelle impostazioni dello workspace o nelle impostazioni utente.

  - **Impostazioni Workspace** - La configurazione del server viene salvata in un file .vscode/mcp.json disponibile solo nello workspace corrente.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    o se scegli lo streaming HTTP come trasporto sarebbe leggermente diverso:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Impostazioni utente** - La configurazione del server viene aggiunta al tuo file globale *settings.json* ed è disponibile in tutti gli workspace. La configurazione appare simile al seguente:

    ![Impostazione utente](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Devi anche aggiungere la configurazione, un header per assicurarti che si autentichi correttamente verso Azure API Management. Usa un header chiamato **Ocp-Apim-Subscription-Key**.

    - Ecco come puoi aggiungerlo alle impostazioni:

    ![Aggiunta header per autenticazione](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), questo farà comparire un prompt che ti chiederà il valore della chiave API che puoi trovare nel Portale Azure per la tua istanza Azure API Management.

   - Per aggiungerlo a *mcp.json* invece, puoi aggiungerlo così:

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

### Usa la modalità Agent

Ora siamo pronti, sia nelle impostazioni che in *.vscode/mcp.json*. Proviamolo.

Dovrebbe esserci un'icona Strumenti come questa, dove sono elencati gli strumenti esposti dal tuo server:

![Strumenti dal server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Clicca l'icona strumenti e dovresti vedere una lista di strumenti così:

    ![Strumenti](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Inserisci un prompt nella chat per invocare lo strumento. Per esempio, se hai selezionato uno strumento per ottenere informazioni su un ordine, puoi chiedere all'agente informazioni su un ordine. Ecco un prompt di esempio:

    ```text
    get information from order 2
    ```

    Ora ti verrà mostrata un'icona strumenti che chiede di procedere con la chiamata ad uno strumento. Seleziona per continuare a eseguire lo strumento, dovresti vedere ora un output simile:

    ![Risultato dal prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **quello che vedi sopra dipende dagli strumenti che hai configurato, ma l'idea è che tu riceva una risposta testuale come sopra**


## Riferimenti

Ecco come puoi approfondire:

- [Tutorial su Azure API Management e MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Esempio Python: Server MCP remoti sicuri usando Azure API Management (sperimentale)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Laboratorio di autorizzazione client MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Usa l'estensione Azure API Management per VS Code per importare e gestire API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registra e scopri server MCP remoti in Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Ottimo repository che mostra molte capacità AI con Azure API Management
- [Workshop AI Gateway](https://azure-samples.github.io/AI-Gateway/) Contiene workshop usando il Portale Azure, che è un ottimo modo per iniziare a valutare le capacità AI.

## Cosa c'è dopo

- Torna a: [Case Studies Overview](./README.md)
- Successivo: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Pur impegnandoci per garantire accuratezza, si prega di notare che le traduzioni automatiche possono contenere errori o inesattezze. Il documento originale nella sua lingua madre deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda la traduzione professionale umana. Non ci assumiamo alcuna responsabilità per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->