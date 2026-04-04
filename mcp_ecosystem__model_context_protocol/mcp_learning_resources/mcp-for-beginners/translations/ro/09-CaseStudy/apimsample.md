# Studiu de caz: Expunerea REST API în API Management ca server MCP

Azure API Management este un serviciu care oferă un Gateway peste punctele finale API. Modul său de funcționare este că Azure API Management acționează ca un proxy în fața API-urilor tale și poate decide ce să facă cu cererile primite.

Utilizându-l, adaugi o serie întreagă de funcționalități precum:

- **Securitate**, poți folosi orice, de la chei API, JWT până la identitate gestionată.
- **Limitarea ratei**, o caracteristică excelentă este capacitatea de a decide câte apeluri trec într-o anumită unitate de timp. Aceasta ajută să asiguri o experiență bună tuturor utilizatorilor, precum și să eviți supraîncărcarea serviciului tău cu cereri.
- **Scalare și echilibrare a încărcării**. Poți configura mai multe puncte finale pentru a echilibra încărcarea și, de asemenea, poți decide cum să "echilibrezi încărcarea".
- **Funcții AI precum caching semantic**, limitare și monitorizare de token-uri și altele. Acestea sunt caracteristici excelente care îmbunătățesc capacitatea de răspuns și te ajută să fii la curent cu consumul de token-uri. [Citește mai mult aici](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## De ce MCP + Azure API Management?

Model Context Protocol devine rapid un standard pentru aplicațiile AI agentice și modul de expunere a instrumentelor și datelor într-un mod consecvent. Azure API Management este o alegere naturală când ai nevoie să "gestionezi" API-uri. Serverele MCP se integrează adesea cu alte API-uri pentru a rezolva cereri către un instrument, de exemplu. Prin urmare, combinarea Azure API Management și MCP are mult sens.

## Prezentare generală

În acest caz specific de utilizare vom învăța cum să expunem punctele finale API ca un server MCP. Astfel, putem face cu ușurință aceste puncte finale parte dintr-o aplicație agentică, beneficiind și de funcționalitățile Azure API Management.

## Caracteristici cheie

- Selectezi metodele endpoint pe care dorești să le expui ca instrumente.
- Funcționalitățile suplimentare depind de configurarea politicilor pentru API-ul tău. Aici îți vom arăta cum să adaugi limitarea ratei.

## Pas preliminar: importă un API

Dacă ai deja un API în Azure API Management, perfect, poți sări peste acest pas. Dacă nu, consultă acest link, [importarea unui API în Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Expunerea API-ului ca server MCP

Pentru a expune punctele finale API, urmează acești pași:

1. Navighează în Azure Portal la adresa <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Navighează la instanța ta de API Management.

1. În meniul din stânga, selectează APIs > MCP Servers > + Create new MCP Server.

1. La API, selectează un API REST de expus ca server MCP.

1. Selectează una sau mai multe operațiuni API pentru a le expune ca instrumente. Poți selecta toate operațiunile sau doar unele specifice.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Selectează **Create**.

1. Navighează la opțiunea din meniu **APIs** și **MCP Servers**, ar trebui să vezi următoarele:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Serverul MCP este creat și operațiunile API sunt expuse ca instrumente. Serverul MCP este listat în panoul MCP Servers. Coloana URL afișează endpoint-ul serverului MCP pe care îl poți apela pentru testare sau în cadrul unei aplicații client.

## Opțional: Configurarea politicilor

Azure API Management are conceptul de politici în care configurezi reguli diferite pentru punctele tale finale, de exemplu limitarea ratei sau caching semantic. Aceste politici sunt scrise în XML.

Iată cum poți configura o politică pentru a limita rata pe serverul tău MCP:

1. În portal, sub APIs, selectează **MCP Servers**.

1. Selectează serverul MCP creat.

1. În meniul din stânga, sub MCP, selectează **Policies**.

1. În editorul de politici, adaugă sau editează politicile pe care dorești să le aplici instrumentelor serverului MCP. Politicile sunt definite în format XML. De exemplu, poți adăuga o politică pentru a limita apelurile către instrumentele serverului MCP (în acest exemplu, 5 apeluri la 30 de secunde per adresă IP client). Iată XML-ul care va determina această limitare de rată:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Iată o imagine cu editorul de politici:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Încearcă-l

Să ne asigurăm că serverul MCP funcționează așa cum intenționăm.

Pentru acest lucru vom folosi Visual Studio Code și GitHub Copilot cu modul Agent. Vom adăuga serverul MCP într-un *mcp.json*. Astfel, Visual Studio Code va acționa ca un client cu capabilități agentice iar utilizatorii finali vor putea introduce un prompt și interacționa cu serverul.

Iată cum, pentru a adăuga serverul MCP în Visual Studio Code:

1. Folosește comanda MCP: **Add Server din Command Palette**.

1. Când ți se cere, selectează tipul serverului: **HTTP (HTTP or Server Sent Events)**.

1. Introdu URL-ul serverului MCP în API Management. Exemplu: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (pentru endpoint SSE) sau **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (pentru endpoint MCP), observă diferența între transporturile `/sse` și `/mcp`.

1. Introdu un ID pentru server după preferință. Nu este o valoare importantă, dar te va ajuta să reții ce instanță de server este.

1. Selectează dacă să salvezi configurația în setările workspace-ului sau în setările utilizatorului.

  - **Setări Workspace** - Configurația serverului se salvează într-un fișier .vscode/mcp.json disponibil doar în workspace-ul curent.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    sau dacă alegi streaming HTTP ca transport, va arăta puțin diferit:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Setări Utilizator** - Configurația serverului este adăugată în fișierul global *settings.json* și este disponibilă în toate workspace-urile. Configurația arată asemănător cu următorul exemplu:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. De asemenea trebuie să adaugi o configurație, un header pentru autentificare corectă către Azure API Management. Se folosește un header numit **Ocp-Apim-Subscription-Key**. 

    - Iată cum îl poți adăuga în setări:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), asta va genera o solicitare pentru a introduce valoarea cheii API pe care o poți găsi în Azure Portal pentru instanța ta Azure API Management.

   - Pentru a-l adăuga în *mcp.json* în schimb, îl poți adăuga astfel:

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

### Folosește modul Agent

Acum suntem pregătiți fie în setări, fie în *.vscode/mcp.json*. Hai să încercăm.

Ar trebui să existe o pictogramă Tools ca aceasta, unde sunt listate instrumentele expuse de server:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Apasă pe pictograma de instrumente și ar trebui să vezi o listă de instrumente ca aceasta:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Introdu un prompt în chat pentru a apela un instrument. De exemplu, dacă ai selectat un instrument pentru a obține informații despre o comandă, poți întreba agentul despre o comandă. Iată un exemplu de prompt:

    ```text
    get information from order 2
    ```

    Vei vedea acum o pictogramă cu instrumente care te întreabă dacă dorești să continui apelând un instrument. Selectează pentru a continua rularea instrumentului, ar trebui să vezi acum un rezultat ca acesta:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **ce vezi mai sus depinde de instrumentele pe care le-ai configurat, dar ideea este că primești un răspuns textual ca mai sus**


## Referințe

Iată cum poți afla mai multe:

- [Tutorial despre Azure API Management și MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Exemplu Python: Servere MCP la distanță securizate folosind Azure API Management (experimental)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Laborator autorizare client MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Folosește extensia Azure API Management pentru VS Code pentru a importa și gestiona API-uri](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Înregistrează și descoperă servere MCP la distanță în Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Repozitoriu excelent care arată multe capabilități AI cu Azure API Management
- [Workshop-uri AI Gateway](https://azure-samples.github.io/AI-Gateway/) Conține workshop-uri folosind Azure Portal, o metodă excelentă de a începe evaluarea capabilităților AI.

## Ce urmează

- Înapoi la: [Prezentare generală studii de caz](./README.md)
- Următorul: [Agentii Azure AI pentru călătorii](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinarea responsabilității**:  
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să aveți în vedere că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->