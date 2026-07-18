[![Jak projektować dobre agentów AI](../../../translated_images/pl/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Kliknij powyższy obraz, aby obejrzeć wideo z tej lekcji)_

# Wzorzec projektowy korzystania z narzędzi

Narzędzia są interesujące, ponieważ pozwalają agentom AI posiadać szerszy zakres możliwości. Zamiast agent mieć ograniczony zestaw akcji, które może wykonywać, dodając narzędzie, agent może teraz wykonać szeroką gamę działań. W tym rozdziale przyjrzymy się wzorcowi projektowemu korzystania z narzędzi, który opisuje, jak agenci AI mogą używać konkretnych narzędzi, aby osiągnąć swoje cele.

## Wprowadzenie

W tej lekcji chcemy odpowiedzieć na następujące pytania:

- Czym jest wzorzec projektowy korzystania z narzędzi?
- Do jakich zastosowań można go stosować?
- Jakie elementy/bloki budulcowe są potrzebne do implementacji tego wzorca?
- Jakie są specjalne rozważania dotyczące stosowania wzorca korzystania z narzędzi w celu budowy godnych zaufania agentów AI?

## Cele nauki

Po ukończeniu tej lekcji będziesz potrafił:

- Zdefiniować wzorzec projektowy korzystania z narzędzi i jego cel.
- Zidentyfikować przypadki użycia, w których wzorzec ten jest stosowalny.
- Zrozumieć kluczowe elementy potrzebne do implementacji tego wzorca.
- Rozpoznać kwestie zapewniające zaufanie do agentów AI korzystających z tego wzorca projektowego.

## Czym jest wzorzec projektowy korzystania z narzędzi?

**Wzorzec projektowy korzystania z narzędzi** skupia się na umożliwieniu LLM interakcji z zewnętrznymi narzędziami w celu osiągnięcia konkretnych celów. Narzędzia to kod, który może być wykonywany przez agenta w celu wykonania działań. Narzędzie może być prostą funkcją, taką jak kalkulator, lub wywołaniem API do usługi zewnętrznej, takiej jak wyszukiwanie cen akcji lub prognoza pogody. W kontekście agentów AI, narzędzia są zaprojektowane tak, aby były wywoływane przez agentów w odpowiedzi na **funkcyjne wywołania generowane przez model**.

## Do jakich zastosowań można go stosować?

Agenci AI mogą korzystać z narzędzi, aby wykonać złożone zadania, wyszukiwać informacje lub podejmować decyzje. Wzorzec korzystania z narzędzi jest często stosowany w scenariuszach wymagających dynamicznej interakcji z systemami zewnętrznymi, takimi jak bazy danych, usługi sieciowe lub interpretery kodu. Ta zdolność jest przydatna w wielu różnych zastosowaniach, w tym:

- **Dynamiczne pozyskiwanie informacji:** Agenci mogą zapytywać zewnętrzne API lub bazy danych, aby pobierać aktualne dane (np. zapytania do bazy SQLite w celu analizy danych, pobieranie cen akcji lub informacji o pogodzie).
- **Wykonywanie i interpretacja kodu:** Agenci mogą wykonywać kod lub skrypty, aby rozwiązywać problemy matematyczne, generować raporty lub przeprowadzać symulacje.
- **Automatyzacja procesów:** Automatyzacja powtarzalnych lub wieloetapowych przepływów pracy poprzez integrację narzędzi takich jak harmonogramy zadań, usługi e-mailowe lub potoki danych.
- **Wsparcie klienta:** Agenci mogą współpracować z systemami CRM, platformami zgłoszeń lub bazami wiedzy, aby rozwiązywać zapytania użytkowników.
- **Generowanie i edycja treści:** Agenci mogą korzystać z narzędzi takich jak korektory gramatyczne, streszczacze tekstu lub oceny bezpieczeństwa treści, aby pomagać w tworzeniu treści.

## Jakie elementy/bloki budulcowe są potrzebne do implementacji wzorca korzystania z narzędzi?

Te bloki budulcowe pozwalają agentowi AI wykonywać szeroki zakres zadań. Spójrzmy na kluczowe elementy potrzebne do implementacji wzorca korzystania z narzędzi:

- **Schematy funkcji/narzędzi**: Szczegółowe definicje dostępnych narzędzi, w tym nazwa funkcji, cel, wymagane parametry i oczekiwane wyniki. Schematy te umożliwiają LLM zrozumienie, jakie narzędzia są dostępne i jak konstruować prawidłowe zapytania.

- **Logika wykonywania funkcji**: Określa, kiedy i jak narzędzia są wywoływane na podstawie intencji użytkownika i kontekstu rozmowy. Może obejmować moduły planistyczne, mechanizmy trasowania lub warunkowe przepływy, które dynamicznie decydują o użyciu narzędzia.

- **System obsługi wiadomości**: Komponenty zarządzające przepływem konwersacji między wejściami użytkownika, odpowiedziami LLM, wywołaniami narzędzi i ich wynikami.

- **Ramka integracji narzędzi**: Infrastruktura łącząca agenta z różnymi narzędziami, czy to prostymi funkcjami, czy złożonymi usługami zewnętrznymi.

- **Obsługa błędów i walidacja**: Mechanizmy radzenia sobie z błędami wykonania narzędzi, weryfikacji parametrów i zarządzania nieoczekiwanymi odpowiedziami.

- **Zarządzanie stanem**: Śledzi kontekst rozmowy, poprzednie interakcje z narzędziami i dane trwałe, aby zapewnić spójność podczas wielu tur interakcji.

Następnie przyjrzyjmy się szczegółowo wywoływaniu funkcji/narzędzi.
 
### Wywoływanie funkcji/narzędzi

Wywoływanie funkcji to podstawowy sposób, w jaki umożliwiamy modelom językowym (LLM) interakcję z narzędziami. Często zobaczysz, że "Funkcja" i "Narzędzie" są używane zamiennie, ponieważ "funkcje" (bloki wielokrotnego użytku kodu) są "narzędziami", których agenci używają do wykonywania zadań. Aby kod funkcji został wywołany, LLM musi porównać żądanie użytkownika z opisem funkcji. W tym celu do LLM wysyłany jest schemat zawierający opisy wszystkich dostępnych funkcji. LLM następnie wybiera najbardziej odpowiednią funkcję do zadania i zwraca jej nazwę oraz argumenty. Wybrana funkcja jest wywoływana, a jej odpowiedź jest przesyłana z powrotem do LLM, który używa tych informacji, aby odpowiedzieć na żądanie użytkownika.

Aby programiści mogli zaimplementować wywoływanie funkcji dla agentów, potrzebne będą:

1. Model LLM wspierający wywoływanie funkcji
2. Schemat zawierający opisy funkcji
3. Kod dla każdej opisanej funkcji

Użyjmy przykładu pobrania aktualnego czasu w mieście, aby to zilustrować:

1. **Zainicjalizuj LLM wspierający wywoływanie funkcji:**

    Nie wszystkie modele obsługują wywoływanie funkcji, więc ważne jest, aby sprawdzić, czy używany LLM to robi. <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> obsługuje wywoływanie funkcji. Możemy zacząć od uruchomienia klienta OpenAI korzystającego z API odpowiedzi Azure OpenAI **Responses API** (stabilny endpoint `/openai/v1/` — bez potrzeby podawania `api_version`).

    ```python
    # Inicjalizuj klienta OpenAI dla Azure OpenAI (API odpowiedzi, punkt końcowy v1)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Utwórz schemat funkcji**:

    Następnie zdefiniujemy schemat JSON zawierający nazwę funkcji, opis tego, co funkcja robi, oraz nazwy i opisy parametrów funkcji.
    Przekażemy ten schemat do klienta utworzonego wcześniej, razem z zapytaniem użytkownika o czas w San Francisco. Ważne jest, aby zauważyć, że zwracane jest **wywołanie narzędzia**, a **nie** ostateczna odpowiedź na pytanie. Jak wspomniano wcześniej, LLM zwraca nazwę funkcji wybranej do zadania oraz argumenty, które zostaną do niej przekazane.

    ```python
    # Opis funkcji do odczytu przez model (format narzędzia Responses API flat)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # Początkowa wiadomość użytkownika
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Pierwsze wywołanie API: Poproś model o użycie funkcji
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # API odpowiedzi zwraca wywołania narzędzi jako elementy function_call w response.output.
    # Dołącz je do rozmowy, aby model miał pełny kontekst w następnym kroku.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Kod funkcji wymagany do wykonania zadania:**

    Po tym, jak LLM wybrał funkcję do uruchomienia, trzeba zaimplementować i wykonać kod realizujący zadanie.
    Możemy napisać kod pobierający aktualny czas w Pythonie. Będziemy również musieli napisać kod do wyciągnięcia nazwy i argumentów z response_message, aby otrzymać ostateczny rezultat.

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # Obsłuż wywołania funkcji
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Zwróć wynik narzędzia jako element function_call_output
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Drugie wywołanie API: Pobierz ostateczną odpowiedź z modelu
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

Wywoływanie funkcji jest sercem większości, jeśli nie wszystkich, projektów korzystania z narzędzi w agentach, choć implementacja od podstaw może być czasem wyzwaniem.
Jak nauczyliśmy się w [Lekcji 2](../../../02-explore-agentic-frameworks), frameworki agentów oferują gotowe bloki budulcowe do implementacji korzystania z narzędzi.
 
## Przykłady korzystania z narzędzi z frameworkami agentów

Oto kilka przykładów, jak można zaimplementować wzorzec korzystania z narzędzi używając różnych frameworków agentów:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> to otwartoźródłowy framework AI do budowania agentów AI. Upraszcza proces korzystania z wywoływania funkcji, pozwalając definiować narzędzia jako funkcje Pythona z dekoratorem `@tool`. Framework obsługuje dwukierunkową komunikację między modelem a twoim kodem. Zapewnia także dostęp do gotowych narzędzi, takich jak wyszukiwanie plików i interpreter kodu przez `FoundryChatClient`.

Poniższy diagram ilustruje proces wywoływania funkcji w Microsoft Agent Framework:

![function calling](../../../translated_images/pl/functioncalling-diagram.a84006fc287f6014.webp)

W Microsoft Agent Framework narzędzia definiowane są jako dekorowane funkcje. Możemy przekształcić funkcję `get_current_time`, którą widzieliśmy wcześniej, w narzędzie, używając dekoratora `@tool`. Framework automatycznie zserializuje funkcję i jej parametry, tworząc schemat do wysłania do LLM.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Utwórz klienta
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Utwórz agenta i uruchom narzędzie
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> to nowszy framework agentów zaprojektowany, aby umożliwić programistom bezpieczne budowanie, wdrażanie i skalowanie wysokiej jakości i rozszerzalnych agentów AI bez konieczności zarządzania zasobami obliczeniowymi i pamięciowymi. Jest szczególnie przydatny w zastosowaniach korporacyjnych, ponieważ jest w pełni zarządzaną usługą z bezpieczeństwem na poziomie przedsiębiorstwa.

W porównaniu z bezpośrednim korzystaniem z API LLM, Microsoft Foundry Agent Service oferuje kilka zalet, w tym:

- Automatyczne wywoływanie narzędzi – nie trzeba analizować wywołania narzędzia, wywoływać narzędzia i obsługiwać odpowiedzi; wszystko odbywa się po stronie serwera
- Bezpiecznie zarządzane dane – zamiast zarządzać własnym stanem rozmowy, można polegać na wątkach przechowujących wszystkie potrzebne informacje
- Narzędzia gotowe do użycia – narzędzia do interakcji ze źródłami danych, takie jak Bing, Azure AI Search i Azure Functions.

Narzędzia dostępne w Microsoft Foundry Agent Service można podzielić na dwie kategorie:

1. Narzędzia wiedzy:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Uziemienie za pomocą wyszukiwarki Bing</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Wyszukiwanie plików</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Narzędzia akcji:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Wywoływanie funkcji</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Interpreter kodu</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">Narzędzia definiowane przez OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Funkcje Azure</a>

Usługa Agenta pozwala na używanie tych narzędzi razem jako `zestaw narzędzi`. Wykorzystuje też `wątki`, które śledzą historię wiadomości z danej rozmowy.

Wyobraź sobie, że jesteś agentem sprzedaży w firmie Contoso. Chcesz stworzyć agenta konwersacyjnego, który będzie potrafił odpowiadać na pytania dotyczące danych sprzedażowych.

Poniższy obraz ilustruje, jak można użyć Microsoft Foundry Agent Service do analizy danych sprzedażowych:

![Agentic Service In Action](../../../translated_images/pl/agent-service-in-action.34fb465c9a84659e.webp)

Aby korzystać z tych narzędzi w usłudze, możemy utworzyć klienta i zdefiniować narzędzie lub zestaw narzędzi. Do praktycznej implementacji można użyć następującego kodu Pythona. LLM będzie mógł spojrzeć na zestaw narzędzi i zdecydować, czy użyć stworzonej przez użytkownika funkcji `fetch_sales_data_using_sqlite_query`, czy gotowego interpretera kodu w zależności od żądania użytkownika.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # funkcja fetch_sales_data_using_sqlite_query, którą można znaleźć w pliku fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Inicjalizuj zestaw narzędzi
toolset = ToolSet()

# Inicjalizuj agenta wywołującego funkcje z funkcją fetch_sales_data_using_sqlite_query i dodaj go do zestawu narzędzi
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Inicjalizuj narzędzie interpreter kodu i dodaj je do zestawu narzędzi.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Jakie są specjalne rozważania dotyczące stosowania wzorca korzystania z narzędzi w celu budowy godnych zaufania agentów AI?

Powszechnym problemem przy SQL generowanym dynamicznie przez LLM są kwestie bezpieczeństwa, zwłaszcza ryzyko wstrzyknięcia SQL lub złośliwych działań, takich jak usunięcie albo modyfikacja bazy danych. Chociaż obawy te są uzasadnione, można je skutecznie złagodzić, odpowiednio konfigurując uprawnienia dostępu do bazy danych. Dla większości baz danych oznacza to skonfigurowanie bazy jako tylko do odczytu. W przypadku usług bazodanowych takich jak PostgreSQL czy Azure SQL, aplikacji należy przypisać rolę tylko do odczytu (SELECT).

Uruchamianie aplikacji w bezpiecznym środowisku dodatkowo wzmacnia ochronę. W scenariuszach korporacyjnych dane są zwykle ekstraktowane i przekształcane z systemów operacyjnych do bazy tylko do odczytu lub hurtowni danych z przyjaznym schematem. Podejście to zapewnia, że dane są bezpieczne, zoptymalizowane pod względem wydajności i dostępności, a aplikacja ma ograniczony, tylko do odczytu dostęp.

## Przykładowe kody

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Masz więcej pytań dotyczących wzorów korzystania z narzędzi?

Dołącz do [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D), aby spotkać innych uczących się, brać udział w godzinach konsultacji i uzyskać odpowiedzi na pytania dotyczące agentów AI.

## Dodatkowe zasoby

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Warsztat Azure AI Agents Service</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Warsztat Multi-Agent Contoso Creative Writer</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Przegląd Microsoft Agent Framework</a>


## Wstępne testowanie tego agenta (opcjonalne)

Po nauczeniu się wdrażania agentów w [Lekcji 16](../16-deploying-scalable-agents/README.md), możesz wstępnie przetestować `TravelToolAgent` z tej lekcji (czy nadal wywołuje swoje narzędzia i odpowiada?) za pomocą [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Zobacz [`tests/README.md`](../tests/README.md), aby dowiedzieć się, jak to uruchomić.

## Poprzednia lekcja

[Zrozumienie agentowych wzorców projektowych](../03-agentic-design-patterns/README.md)

## Następna lekcja

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->