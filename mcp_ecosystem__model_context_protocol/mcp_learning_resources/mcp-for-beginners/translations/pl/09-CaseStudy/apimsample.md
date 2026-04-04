# Studium przypadku: Udostępnianie REST API w Azure API Management jako serwer MCP

Azure API Management to usługa, która zapewnia bramę na szczycie punktów końcowych Twojego API. Działa ona jak proxy przed Twoimi API i może decydować, co zrobić z nadchodzącymi żądaniami.

Korzystając z niej, dodajesz szereg funkcji, takich jak:

- **Bezpieczeństwo**, możesz używać wszystkiego, od kluczy API, JWT po zarządzaną tożsamość.
- **Ograniczanie liczby wywołań (rate limiting)**, świetna funkcja pozwalająca zdecydować, ile wywołań może przejść w określonej jednostce czasu. Pomaga to zapewnić wszystkim użytkownikom doskonałe doświadczenia oraz chronić usługę przed przeciążeniem żądaniami.
- **Skalowanie i równoważenie obciążenia**. Możesz skonfigurować wiele punktów końcowych, aby zrównoważyć obciążenie oraz zdecydować, jak przeprowadzać równoważenie obciążenia.
- **Funkcje AI takie jak semantyczne buforowanie**, limit tokenów i monitorowanie tokenów oraz więcej. Te funkcje poprawiają szybkość reakcji oraz pomagają kontrolować wydatki na tokeny. [Przeczytaj więcej tutaj](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Dlaczego MCP + Azure API Management?

Model Context Protocol szybko staje się standardem dla aplikacji AI z agentami oraz sposobem na spójne udostępnianie narzędzi i danych. Azure API Management to naturalny wybór, gdy potrzebujesz „zarządzać” API. Serwery MCP często integrują się z innymi API, by rozwiązywać żądania np. do narzędzi. Dlatego połączenie Azure API Management i MCP ma dużo sensu.

## Przegląd

W tym konkretnym przypadku użycia nauczymy się udostępniać punkty końcowe API jako serwer MCP. Dzięki temu możemy łatwo uczynić te punkty końcowe częścią aplikacji agentowej, jednocześnie korzystając z funkcji Azure API Management.

## Kluczowe funkcje

- Wybierasz metody punktów końcowych, które chcesz udostępnić jako narzędzia.
- Dodatkowe funkcje zależą od tego, co skonfigurujesz w sekcji polityk dla swojego API. Pokażemy tu, jak dodać ograniczanie liczby wywołań.

## Krok wstępny: zaimportuj API

Jeśli masz już API w Azure API Management, świetnie, możesz pominąć ten krok. Jeśli nie, sprawdź ten link, [importowanie API do Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Udostępnianie API jako serwer MCP

Aby udostępnić punkty końcowe API, wykonaj następujące kroki:

1. Przejdź do Azure Portal pod adresem <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>
Przejdź do swojej instancji Azure API Management.

1. W lewym menu wybierz APIs > MCP Servers > + Create new MCP Server.

1. W API wybierz REST API, które chcesz udostępnić jako serwer MCP.

1. Wybierz jedną lub więcej operacji API do udostępnienia jako narzędzia. Możesz wybrać wszystkie operacje lub tylko wybrane.

    ![Wybierz metody do udostępnienia](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Wybierz **Create**.

1. Przejdź do opcji menu **APIs** i **MCP Servers**, powinieneś zobaczyć następujące:

    ![Zobacz serwer MCP w głównym panelu](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Serwer MCP został utworzony, a operacje API zostały udostępnione jako narzędzia. Serwer MCP jest wymieniony w panelu MCP Servers. Kolumna URL pokazuje punkt końcowy serwera MCP, który możesz wywołać do testów lub w aplikacji klienckiej.

## Opcjonalnie: Konfiguracja polityk

Azure API Management posiada podstawową koncepcję polityk, gdzie ustawiasz różne reguły dla swoich punktów końcowych, na przykład ograniczanie liczby wywołań albo semantyczne buforowanie. Polityki są definiowane w XML.

Oto jak skonfigurować politykę ograniczającą liczbę wywołań dla Twojego serwera MCP:

1. W portalu, pod APIs, wybierz **MCP Servers**.

1. Wybierz utworzony serwer MCP.

1. W lewym menu, w sekcji MCP, wybierz **Policies**.

1. W edytorze polityk dodaj lub edytuj polityki, które chcesz zastosować do narzędzi serwera MCP. Polityki są zdefiniowane w formacie XML. Na przykład możesz dodać politykę, która ogranicza wywołania narzędzi serwera MCP (w tym przykładzie 5 wywołań na 30 sekund na adres IP klienta). Oto XML, który ograniczy liczbę wywołań:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Oto obraz edytora polityk:

    ![Edytor polityk](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Wypróbuj

Upewnijmy się, że nasz serwer MCP działa zgodnie z zamierzeniami.

Do tego użyjemy Visual Studio Code oraz GitHub Copilot w trybie agenta. Dodamy serwer MCP do pliku *mcp.json*. Dzięki temu Visual Studio Code będzie działać jako klient z możliwościami agentowymi, a użytkownicy końcowi będą mogli wpisywać polecenia i komunikować się z serwerem.

Zobaczmy, jak dodać serwer MCP w Visual Studio Code:

1. Użyj polecenia MCP: **Add Server command from the Command Palette**.

1. Po wyświetleniu monitu wybierz typ serwera: **HTTP (HTTP lub Server Sent Events)**.

1. Wprowadź URL serwera MCP w Azure API Management. Przykład: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (dla punktu SSE) lub **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (dla punktu MCP), zwróć uwagę na różnicę w protokole `/sse` lub `/mcp`.

1. Wprowadź wybrany przez siebie identyfikator serwera. Nie jest to istotna wartość, ale pomoże Ci zapamiętać, co to jest za instancja serwera.

1. Wybierz, czy zapisać konfigurację w ustawieniach workspace'u czy użytkownika.

  - **Workspace settings** - konfiguracja serwera jest zapisywana w pliku .vscode/mcp.json dostępnym tylko w obecnym workspace.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    lub jeśli wybierzesz streaming HTTP jako protokół, będzie wyglądać to nieco inaczej:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - konfiguracja serwera jest dodawana do globalnego pliku *settings.json* i jest dostępna we wszystkich workspace’ach. Konfiguracja wygląda tak:

    ![Ustawienia użytkownika](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Musisz także dodać konfigurację nagłówka, aby zapewnić właściwą autoryzację w Azure API Management. Używa on nagłówka o nazwie **Ocp-Apim-Subscription-Key**.

    - Oto jak możesz dodać go w ustawieniach:

    ![Dodawanie nagłówka do uwierzytelniania](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), co spowoduje wyświetlenie monitu o wartość klucza API, który znajdziesz w Azure Portal dla Twojej instancji Azure API Management.

   - Aby dodać go do *mcp.json*, zrób to w ten sposób:

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

### Użyj trybu agenta

Teraz wszystko jest gotowe, zarówno w ustawieniach, jak i w *.vscode/mcp.json*. Wypróbujmy to.

Powinieneś zobaczyć ikonę Narzędzia, gdzie widoczne są udostępnione narzędzia z Twojego serwera:

![Narzędzia z serwera](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Kliknij ikonę narzędzi, a zobaczysz listę narzędzi:

    ![Narzędzia](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Wpisz polecenie w czacie, aby wywołać narzędzie. Na przykład, jeśli wybrałeś narzędzie do uzyskiwania informacji o zamówieniu, możesz zapytać agenta o zamówienie. Oto przykładowe polecenie:

    ```text
    get information from order 2
    ```

    Pojawi się ikona narzędzi z pytaniem o kontynuację wywołania narzędzia. Wybierz, aby kontynuować. Powinieneś zobaczyć wynik jak poniżej:

    ![Wynik z prompta](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **to, co widzisz powyżej, zależy od wybranych narzędzi, ale chodzi o to, by otrzymać tekstową odpowiedź, jak powyżej**


## Odnośniki

Oto jak możesz dowiedzieć się więcej:

- [Samouczek: Azure API Management i MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Przykład w Python: Bezpieczne zdalne serwery MCP z użyciem Azure API Management (eksperymentalne)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Laboratorium autoryzacji klienta MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Użyj rozszerzenia Azure API Management dla VS Code do importu i zarządzania API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Rejestruj i odnajduj zdalne serwery MCP w Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Świetne repozytorium pokazujące wiele możliwości AI z Azure API Management
- [Warsztaty AI Gateway](https://azure-samples.github.io/AI-Gateway/) Zawiera warsztaty z użyciem Azure Portal, co jest świetnym sposobem na rozpoczęcie oceny możliwości AI.

## Co dalej

- Powrót do: [Przegląd studiów przypadku](./README.md)
- Dalej: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczeń AI [Co-op Translator](https://github.com/Azure/co-op-translator). Dokładamy wszelkich starań, aby tłumaczenie było jak najdokładniejsze, jednak prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego rodzimej wersji językowej powinien być traktowany jako źródło nadrzędne. W przypadku informacji krytycznych zaleca się skorzystanie z profesjonalnego tłumaczenia wykonywanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->