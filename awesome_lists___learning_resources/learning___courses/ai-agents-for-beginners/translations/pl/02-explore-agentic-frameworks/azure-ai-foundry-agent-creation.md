# Microsoft Foundry Agent Service Development

W tym ćwiczeniu użyjesz narzędzi Microsoft Foundry Agent Service w [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) do stworzenia agenta do rezerwacji lotów. Agent będzie mógł wchodzić w interakcje z użytkownikami i dostarczać informacje o lotach.

## Wymagania wstępne

Aby ukończyć to ćwiczenie, potrzebujesz:
1. Konto Azure z aktywną subskrypcją. [Utwórz konto za darmo](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Uprawnienia do utworzenia hubu Microsoft Foundry lub posiadanie go utworzonego dla Ciebie.
    - Jeśli Twoją rolą jest Contributor lub Owner, możesz postępować zgodnie z krokami w tym samouczku.

## Utwórz hub Microsoft Foundry

> **Uwaga:** Microsoft Foundry dawniej znany jako Azure AI Studio.

1. Postępuj zgodnie z wytycznymi z wpisu na blogu [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) dotyczącymi tworzenia hubu Microsoft Foundry.
2. Po utworzeniu projektu zamknij wszelkie wyświetlane wskazówki i przejrzyj stronę projektu w portalu Microsoft Foundry, która powinna wyglądać podobnie do poniższego obrazu:

    ![Microsoft Foundry Project](../../../translated_images/pl/azure-ai-foundry.88d0c35298348c2f.webp)

## Wdróż model

1. W panelu po lewej stronie dla swojego projektu, w sekcji **My assets**, wybierz stronę **Models + endpoints**.
2. Na stronie **Models + endpoints**, na karcie **Model deployments**, w menu **+ Deploy model**, wybierz **Deploy base model**.
3. Wyszukaj model `gpt-4.1-mini` na liście, następnie wybierz go i potwierdź.

    > **Uwaga**: Zmniejszenie TPM pomaga unikać nadmiernego wykorzystania dostępnego limitu w subskrypcji, z której korzystasz.

    ![Model Deployed](../../../translated_images/pl/model-deployment.3749c53fb81e18fd.webp)

## Utwórz agenta

Teraz, gdy wdrożyłeś model, możesz utworzyć agenta. Agent to konwersacyjny model AI, który może być używany do interakcji z użytkownikami.

1. W panelu po lewej stronie dla swojego projektu, w sekcji **Build & Customize**, wybierz stronę **Agents**.
2. Kliknij **+ Create agent**, aby utworzyć nowego agenta. W oknie dialogowym **Agent Setup**:
    - Wprowadź nazwę agenta, na przykład `FlightAgent`.
    - Upewnij się, że wybrano wcześniej utworzone wdrożenie modelu `gpt-4.1-mini`.
    - Ustaw **Instructions** zgodnie z poleceniem, które chcesz, aby agent realizował. Oto przykład:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> Dla szczegółowego promptu możesz zobaczyć [to repozytorium](https://github.com/ShivamGoyal03/RoamMind) po więcej informacji.
    
> Ponadto możesz dodać **Knowledge Base** oraz **Actions**, by wzbogacić możliwości agenta o dostarczanie dodatkowych informacji i wykonywanie zautomatyzowanych zadań na podstawie żądań użytkowników. W tym ćwiczeniu możesz pominąć te kroki.
    
![Agent Setup](../../../translated_images/pl/agent-setup.9bbb8755bf5df672.webp)

3. Aby utworzyć nowego agenta multi-AI, wystarczy kliknąć **New Agent**. Nowo utworzony agent zostanie wyświetlony na stronie Agents.


## Przetestuj agenta

Po utworzeniu agenta możesz go przetestować, aby zobaczyć, jak odpowiada na zapytania użytkowników w środowisku Microsoft Foundry portal playground.

1. U góry panelu **Setup** dla Twojego agenta wybierz **Try in playground**.
2. W panelu **Playground** możesz wchodzić w interakcje z agentem, wpisując zapytania w oknie czatu. Na przykład możesz poprosić agenta o wyszukanie lotów z Seattle do Nowego Jorku na 28.

    > **Uwaga**: Agent może nie udzielać precyzyjnych odpowiedzi, ponieważ w tym ćwiczeniu nie używa się danych w czasie rzeczywistym. Celem jest przetestowanie zdolności agenta do rozumienia i odpowiadania na zapytania użytkownika na podstawie udzielonych instrukcji.

    ![Agent Playground](../../../translated_images/pl/agent-playground.dc146586de715010.webp)

3. Po przetestowaniu agenta możesz dalej dostosować go, dodając więcej zamiarów, danych treningowych i akcji, aby zwiększyć jego możliwości.

## Wyczyść zasoby

Po zakończeniu testowania agenta możesz go usunąć, aby uniknąć dodatkowych kosztów.
1. Otwórz [Azure portal](https://portal.azure.com) i wyświetl zawartość grupy zasobów, w której wdrożyłeś zasoby hubu użyte w tym ćwiczeniu.
2. Na pasku narzędzi wybierz **Delete resource group**.
3. Wprowadź nazwę grupy zasobów i potwierdź, że chcesz ją usunąć.

## Zasoby

- [Dokumentacja Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Portal Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Pierwsze kroki z Microsoft Foundry](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Podstawy agentów AI na Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Discord Azure AI](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->