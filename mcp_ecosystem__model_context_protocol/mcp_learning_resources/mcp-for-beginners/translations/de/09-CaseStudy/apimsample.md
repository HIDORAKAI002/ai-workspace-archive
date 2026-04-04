# Fallstudie: REST-API in API Management als MCP-Server bereitstellen

Azure API Management ist ein Dienst, der ein Gateway über Ihren API-Endpunkten bereitstellt. So funktioniert es: Azure API Management fungiert als Proxy vor Ihren APIs und kann entscheiden, wie mit eingehenden Anfragen verfahren wird.

Durch die Verwendung erhalten Sie eine Vielzahl von Funktionen wie:

- **Sicherheit**, Sie können alles von API-Schlüsseln, JWT bis zur verwalteten Identität verwenden.
- **Ratenbegrenzung**, eine großartige Funktion, mit der Sie festlegen können, wie viele Aufrufe pro Zeiteinheit zugelassen werden. Dies sorgt dafür, dass alle Benutzer eine großartige Erfahrung machen und dass Ihr Dienst nicht mit Anfragen überlastet wird.
- **Skalierung & Lastverteilung**. Sie können eine Reihe von Endpunkten einrichten, um die Last zu verteilen, und Sie können auch entscheiden, wie die Last verteilt wird.
- **KI-Funktionen wie semantisches Caching**, Token-Grenzen, Token-Überwachung und mehr. Diese großartigen Funktionen verbessern die Reaktionsfähigkeit und helfen Ihnen, Ihre Token-Ausgaben im Blick zu behalten. [Hier mehr lesen](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Warum MCP + Azure API Management?

Das Model Context Protocol wird schnell zum Standard für agentenbasierte KI-Anwendungen und wie man Werkzeuge und Daten konsistent zugänglich macht. Azure API Management ist eine natürliche Wahl, wenn Sie APIs „verwalten“ müssen. MCP-Server integrieren sich oft mit anderen APIs, um beispielsweise Anfragen an ein Tool weiterzuleiten. Daher macht die Kombination von Azure API Management und MCP viel Sinn.

## Überblick

In diesem speziellen Anwendungsfall lernen wir, API-Endpunkte als MCP-Server bereitzustellen. So können wir diese Endpunkte einfach in eine agentenbasierte App einbinden und gleichzeitig die Funktionen von Azure API Management nutzen.

## Hauptmerkmale

- Sie wählen die Endpunktmethoden aus, die als Tools bereitgestellt werden sollen.
- Die zusätzlichen Funktionen hängen davon ab, was Sie im Richtlinienabschnitt für Ihre API konfigurieren. Hier zeigen wir Ihnen jedoch, wie Sie eine Ratenbegrenzung hinzufügen können.

## Vorbereitender Schritt: API importieren

Wenn Sie bereits eine API in Azure API Management haben, können Sie diesen Schritt überspringen. Andernfalls sehen Sie sich [diesen Link zum Import einer API in Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api) an.

## API als MCP-Server bereitstellen

Um die API-Endpunkte bereitzustellen, gehen wir wie folgt vor:

1. Navigieren Sie zum Azure-Portal unter <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Navigieren Sie zu Ihrer API Management-Instanz.

1. Wählen Sie im linken Menü APIs > MCP Servers > + New MCP Server erstellen aus.

1. Wählen Sie unter API eine REST-API aus, die Sie als MCP-Server bereitstellen möchten.

1. Wählen Sie eine oder mehrere API-Operationen aus, die als Tools bereitgestellt werden sollen. Sie können alle Operationen oder nur bestimmte Operationen auswählen.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Wählen Sie **Erstellen**.

1. Navigieren Sie im Menü zu **APIs** und **MCP Servers**, dort sollten Sie Folgendes sehen:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Der MCP-Server wurde erstellt und die API-Operationen sind als Tools zugänglich. Der MCP-Server wird im Bereich MCP Servers gelistet. Die Spalte URL zeigt den Endpunkt des MCP-Servers, den Sie zum Testen oder in einer Clientanwendung aufrufen können.

## Optional: Richtlinien konfigurieren

Azure API Management hat das Kernkonzept von Richtlinien, mit denen Sie verschiedene Regeln für Ihre Endpunkte festlegen können, z. B. Ratenbegrenzung oder semantisches Caching. Diese Richtlinien werden in XML verfasst.

So können Sie eine Richtlinie einrichten, um Ihren MCP-Server in der Aufrufrate zu begrenzen:

1. Wählen Sie im Portal unter APIs **MCP Servers** aus.

1. Wählen Sie den von Ihnen erstellten MCP-Server.

1. Wählen Sie im linken Menü unter MCP **Richtlinien** aus.

1. Fügen Sie im Richtlinien-Editor die Richtlinien hinzu oder bearbeiten Sie diese, die Sie für die Tools des MCP-Servers anwenden möchten. Die Richtlinien sind im XML-Format definiert. Beispielsweise können Sie eine Richtlinie hinzufügen, um Anrufe auf die Tools des MCP-Servers zu begrenzen (hier: 5 Aufrufe pro 30 Sekunden pro Client-IP-Adresse). Hier ist das XML, das die Ratenbegrenzung bewirkt:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```


    Hier ein Bild des Richtlinien-Editors:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Ausprobieren

Stellen wir sicher, dass unser MCP-Server wie vorgesehen funktioniert.

Dafür verwenden wir Visual Studio Code und GitHub Copilot im Agent-Modus. Wir fügen den MCP-Server einer *mcp.json* hinzu. Dadurch agiert Visual Studio Code als Client mit agentenbasierten Funktionen, und Endnutzer können eine Eingabeaufforderung eingeben und mit dem Server interagieren.

So fügen Sie den MCP-Server in Visual Studio Code hinzu:

1. Verwenden Sie den MCP-Befehl: **Add Server from Command Palette**.

1. Wählen Sie den Servertype aus: **HTTP (HTTP oder Server Sent Events)**.

1. Geben Sie die URL des MCP-Servers in API Management ein. Beispiel: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (für den SSE-Endpunkt) oder **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (für den MCP-Endpunkt), beachten Sie den Unterschied der Übertragungen: `/sse` oder `/mcp`.

1. Geben Sie eine Server-ID Ihrer Wahl ein. Dies ist kein wichtiger Wert, hilft aber dabei, sich an diese Serverinstanz zu erinnern.

1. Wählen Sie, ob die Konfiguration in Ihre Arbeitsbereichseinstellungen oder Benutzereinstellungen gespeichert werden soll.

  - **Arbeitsbereichseinstellungen** – Die Serverkonfiguration wird in einer .vscode/mcp.json-Datei gespeichert, die nur im aktuellen Arbeitsbereich verfügbar ist.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```


    Oder bei Streaming HTTP als Übertragung wäre es etwas anders:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```


  - **Benutzereinstellungen** – Die Serverkonfiguration wird in Ihre globale *settings.json*-Datei eingefügt und ist in allen Arbeitsbereichen verfügbar. Die Konfiguration sieht etwa so aus:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Sie müssen außerdem eine Konfiguration hinzufügen, nämlich einen Header, damit die Authentifizierung gegenüber Azure API Management richtig funktioniert. Es wird ein Header namens **Ocp-Apim-Subscription-Key** verwendet.

    - So fügen Sie ihn den Einstellungen hinzu:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)

    Dadurch wird Ihnen eine Eingabeaufforderung angezeigt, die Sie nach dem API-Schlüsselwert fragt, den Sie im Azure-Portal für Ihre Azure API Management-Instanz finden können.

    - Um ihn stattdessen in *mcp.json* hinzuzufügen, können Sie es so machen:

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


### Agent-Modus verwenden

Jetzt sind wir sowohl in den Einstellungen als auch in *.vscode/mcp.json* fertig konfiguriert. Probieren wir es aus.

Es sollte ein Tools-Symbol wie dieses geben, unter dem die vom Server bereitgestellten Tools aufgelistet sind:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klicken Sie auf das Tools-Symbol, und Sie sollten eine Liste von Tools wie diese sehen:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Geben Sie im Chat eine Eingabeaufforderung ein, um das Tool zu starten. Wenn Sie beispielsweise ein Tool ausgewählt haben, das Informationen zu einer Bestellung abruft, können Sie den Agenten nach einer Bestellung fragen. Hier ein Beispiel für eine Eingabeaufforderung:

    ```text
    get information from order 2
    ```


    Nun wird Ihnen ein Tools-Symbol angezeigt, das Sie auffordert, fortzufahren und ein Tool aufzurufen. Wählen Sie fortfahren, und Sie sollten eine Ausgabe wie folgt sehen:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **Was Sie hier sehen, hängt von den eingerichtet Tools ab, aber die Idee ist, dass Sie eine textuelle Antwort wie oben erhalten**


## Verweise

So können Sie mehr lernen:

- [Tutorial zu Azure API Management und MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python-Beispiel: Sichere Remote-MCP-Server mit Azure API Management (experimentell)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP-Client-Autorisierungslabor](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Verwenden der Azure API Management-Erweiterung für VS Code zum Importieren und Verwalten von APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Remote-MCP-Server im Azure API Center registrieren und entdecken](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Tolles Repository, das viele KI-Funktionen mit Azure API Management zeigt
- [AI Gateway Workshops](https://azure-samples.github.io/AI-Gateway/) Enthält Workshops mit dem Azure Portal, eine großartige Möglichkeit, KI-Fähigkeiten zu evaluieren.

## Was kommt als Nächstes

- Zurück zu: [Case Studies Übersicht](./README.md)
- Weiter zu: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mithilfe des KI-Übersetzungsdienstes [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir um Genauigkeit bemüht sind, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache ist als maßgebliche Quelle zu betrachten. Für wichtige Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die durch die Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->